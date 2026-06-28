#!/usr/bin/env python3
# =============================================================
#  学习中心 · 同源服务器（静态站 + 学习记录 API）
# -------------------------------------------------------------
#  作用：在一个端口上同时提供
#    1) 静态网站（和原来的 http.server 完全一样）
#    2) /api 学习记录接口，数据存 SQLite（中心化、可跟踪）
#
#  接口：
#    GET  /api/health                      健康检查（无需鉴权）
#    POST /api/event   头 X-Write-Token     上报一次练习记录（嘉欢的页面用）
#    GET  /api/report?track=&key=&days=     读取记录+统计（哥哥跟踪面板用，要读密钥）
#
#  只用 Python 标准库（http.server + sqlite3），无第三方依赖。
#  配置/数据库都在仓库之外：~/.studyhub/
# =============================================================
import json, os, sqlite3, time, threading
from collections import deque, defaultdict
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

SITE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.expanduser("~/.studyhub/config.json")
PORT = int(os.environ.get("STUDYHUB_PORT", "8790"))
BIND = os.environ.get("STUDYHUB_BIND", "127.0.0.1")
MAX_BODY = 64 * 1024
ALLOWED_TRACKS = {"siyu", "ma-huan", "mahuan", "albert", "gaokao"}  # profile ids（含兼容旧值）

with open(CONFIG_PATH, encoding="utf-8") as f:
    CFG = json.load(f)
DB_PATH = CFG.get("db_path", os.path.expanduser("~/.studyhub/studyhub.db"))
WRITE_TOKEN = CFG["write_token"]
READ_KEY = CFG["read_key"]

_db_lock = threading.Lock()

# ---- 写接口限流（防恶意脚本乱刷），按真实客户端 IP + 全局两层 ----
_rl_lock = threading.Lock()
_rl_ip = defaultdict(deque)   # ip -> 最近写入时间戳
_rl_global = deque()          # 全局最近写入时间戳
RL_IP_MAX, RL_IP_WIN = 30, 300     # 单 IP：5 分钟内最多 30 次
RL_G_MAX, RL_G_WIN = 120, 60       # 全局：1 分钟内最多 120 次

def rate_ok(ip):
    now = time.time()
    with _rl_lock:
        while _rl_global and now - _rl_global[0] > RL_G_WIN:
            _rl_global.popleft()
        if len(_rl_global) >= RL_G_MAX:
            return False
        dq = _rl_ip[ip]
        while dq and now - dq[0] > RL_IP_WIN:
            dq.popleft()
        if len(dq) >= RL_IP_MAX:
            return False
        dq.append(now); _rl_global.append(now)
        if len(_rl_ip) > 5000:
            for k in [k for k, v in list(_rl_ip.items()) if not v]:
                del _rl_ip[k]
        return True

def db():
    conn = sqlite3.connect(DB_PATH, timeout=5)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with db() as conn:
        conn.execute("PRAGMA journal_mode=WAL;")
        conn.execute("""
            CREATE TABLE IF NOT EXISTS events(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                track   TEXT NOT NULL,
                ts      INTEGER NOT NULL,
                kind    TEXT,
                label   TEXT,
                correct INTEGER,
                total   INTEGER,
                detail  TEXT
            );""")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_events_track_ts ON events(track, ts);")
        conn.commit()

def local_date(ms):
    return time.strftime("%Y-%m-%d", time.localtime((ms or 0) / 1000))

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=SITE_DIR, **kw)

    # 安静一点的日志
    def log_message(self, fmt, *args):
        pass

    # ---------- 工具 ----------
    def _json(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _read_json(self):
        n = int(self.headers.get("Content-Length") or 0)
        if n <= 0 or n > MAX_BODY:
            return None
        try:
            return json.loads(self.rfile.read(n).decode("utf-8"))
        except Exception:
            return None

    def client_ip(self):
        # cloudflared 会转发真实客户端 IP（Cf-Connecting-Ip）；本地直连则用 socket 地址
        return (self.headers.get("Cf-Connecting-Ip")
                or (self.headers.get("X-Forwarded-For", "").split(",")[0].strip())
                or self.client_address[0])

    # ---------- 路由 ----------
    def do_GET(self):
        p = urlparse(self.path)
        if p.path == "/api/health":
            return self._json(200, {"ok": True, "ts": int(time.time() * 1000)})
        if p.path == "/api/report":
            return self.api_report(parse_qs(p.query))
        if p.path.startswith("/api/"):
            return self._json(404, {"ok": False, "error": "not found"})
        return super().do_GET()

    def do_POST(self):
        p = urlparse(self.path)
        if p.path == "/api/event":
            return self.api_event()
        return self._json(404, {"ok": False, "error": "not found"})

    # ---------- /api/event （写） ----------
    def api_event(self):
        if self.headers.get("X-Write-Token") != WRITE_TOKEN:
            return self._json(401, {"ok": False, "error": "bad token"})
        if not rate_ok(self.client_ip()):
            return self._json(429, {"ok": False, "error": "请求过于频繁，稍后再试"})
        data = self._read_json()
        if not isinstance(data, dict):
            return self._json(400, {"ok": False, "error": "bad body"})
        track = str(data.get("track") or "")
        if track not in ALLOWED_TRACKS:
            return self._json(400, {"ok": False, "error": "bad track"})
        ts = int(data.get("ts") or time.time() * 1000)
        kind = str(data.get("kind") or "")[:32]
        label = str(data.get("label") or "")[:120]
        correct = int(data.get("correct") or 0)
        total = int(data.get("total") or 0)
        detail = data.get("detail")
        detail_s = json.dumps(detail, ensure_ascii=False)[:8000] if detail is not None else None
        with _db_lock, db() as conn:
            cur = conn.execute(
                "INSERT INTO events(track,ts,kind,label,correct,total,detail) VALUES(?,?,?,?,?,?,?)",
                (track, ts, kind, label, correct, total, detail_s))
            conn.commit()
            new_id = cur.lastrowid
        return self._json(200, {"ok": True, "id": new_id})

    # ---------- /api/report （读，要密钥；建议再用 Cloudflare Access 邮箱保护） ----------
    def api_report(self, q):
        key = (q.get("key") or [""])[0]
        if key != READ_KEY:
            return self._json(401, {"ok": False, "error": "需要正确的读取密钥 key"})
        track = (q.get("track") or ["mahuan"])[0]
        if track not in ALLOWED_TRACKS:
            return self._json(400, {"ok": False, "error": "bad track"})
        days = int((q.get("days") or ["60"])[0])
        since = int((time.time() - days * 86400) * 1000)
        with db() as conn:
            rows = [dict(r) for r in conn.execute(
                "SELECT id,ts,kind,label,correct,total,detail FROM events "
                "WHERE track=? AND ts>=? ORDER BY ts DESC LIMIT 1000", (track, since))]
        for r in rows:
            if r.get("detail"):
                try: r["detail"] = json.loads(r["detail"])
                except Exception: pass
            r["date"] = local_date(r["ts"])
        # 统计
        today = time.strftime("%Y-%m-%d")
        week_since = int((time.time() - 7 * 86400) * 1000)
        total_sessions = len(rows)
        today_n = sum(1 for r in rows if r["date"] == today)
        week_n = sum(1 for r in rows if r["ts"] >= week_since)
        scored = [r for r in rows if r["total"]]
        avg = round(sum(r["correct"] / r["total"] for r in scored) / len(scored) * 100) if scored else None
        # 最近一次摸底的考点掌握度
        latest_diag = next((r for r in rows if r["kind"] == "diag" and isinstance(r.get("detail"), dict)), None)
        # 跨摸底的弱考点聚合
        point_agg = {}
        for r in rows:
            d = r.get("detail")
            if r["kind"] == "diag" and isinstance(d, dict):
                for pt in d.get("points", []):
                    a = point_agg.setdefault(pt["p"], {"c": 0, "t": 0})
                    a["c"] += pt.get("c", 0); a["t"] += pt.get("t", 0)
        summary = {
            "total_sessions": total_sessions, "today": today_n, "week": week_n, "avg": avg,
            "latest_diag": latest_diag, "points": point_agg,
        }
        return self._json(200, {"ok": True, "track": track, "events": rows, "summary": summary})

def main():
    init_db()
    httpd = ThreadingHTTPServer((BIND, PORT), Handler)
    print(f"studyhub server on http://{BIND}:{PORT}  (db={DB_PATH})")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.shutdown()

if __name__ == "__main__":
    main()
