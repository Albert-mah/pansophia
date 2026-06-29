#!/usr/bin/env python3
# =============================================================
#  万象学院 Pansophia · 同源服务器(静态站 + 用户态 API)
# -------------------------------------------------------------
#  数据库是唯一真源(PostgreSQL,复用 Fleet 容器的独立子库 pansophia)。
#  服务器上的 CLI agent(AI 导师)读写同一套 PG → 能看到进度/学习情况并反馈。
#  前端全程走 /api,不再用 localStorage 兜底。
#
#  接口:
#    GET  /api/health                       健康检查(含 db 连通)
#    GET  /api/users                        可切换学习者列表
#    POST /api/users        X-Write-Token   新增/更新自定义学习者
#    GET  /api/state?user=KEY               拉该用户全部状态(水合)
#    POST /api/state        X-Write-Token   {user,name,value} 写一项(直达 DB)
#    POST /api/event        X-Write-Token   追加一条学习事件(兼容旧页面)
#    GET  /api/report?user=&key=READKEY     家长看板(要读密钥)
#
#  依赖:psycopg2(host 的 python3=miniconda 已装)。配置在 ~/.studyhub/config.json。
# =============================================================
import base64, json, os, re, time, threading, ssl, urllib.request
from collections import deque, defaultdict
from datetime import datetime, timedelta
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs, quote
import psycopg2
import psycopg2.extras

SITE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.expanduser("~/.studyhub/config.json")
PORT = int(os.environ.get("STUDYHUB_PORT", "8790"))
BIND = os.environ.get("STUDYHUB_BIND", "127.0.0.1")
MAX_BODY = 512 * 1024
UPLOAD_MAX = 13 * 1024 * 1024          # 上传请求体上限(含 base64 膨胀,约对应 9MB 文件)
FILE_MAX = 9 * 1024 * 1024
FILE_ID_RE = re.compile(r"^[0-9a-f]{8,40}$")
USER_RE = re.compile(r"^[A-Za-z0-9_-]{1,64}$")

with open(CONFIG_PATH, encoding="utf-8") as f:
    CFG = json.load(f)
WRITE_TOKEN = CFG["write_token"]
READ_KEY = CFG["read_key"]
PG = CFG.get("pg", {"host": "127.0.0.1", "port": 5601, "user": "nocobase", "password": "nocobase", "dbname": "pansophia"})

NO_STORE_EXT = (".html", ".js", ".css", ".json")

# ---- 写接口限流(按真实客户端 IP + 全局两层) ----
_rl_lock = threading.Lock()
_rl_ip = defaultdict(deque)
_rl_global = deque()
RL_IP_MAX, RL_IP_WIN = 120, 300
RL_G_MAX, RL_G_WIN = 600, 60

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

# ---- 网页正文抓取(名校培养方案 → 本地资料库快照) ----
LIB_FETCH_MAX = 3 * 1024 * 1024
LIB_UA = "Mozilla/5.0 (compatible; PansophiaCache/1.0; +study.albertma.site)"
_ssl_ctx = ssl.create_default_context()
_ssl_ctx.check_hostname = False
_ssl_ctx.verify_mode = ssl.CERT_NONE

def fetch_readable(url):
    """抓网页 → (title, text, status)。status: ok | empty | error。只取可读正文,保留段落换行。"""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": LIB_UA, "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"})
        r = urllib.request.urlopen(req, timeout=15, context=_ssl_ctx)
        raw = r.read(LIB_FETCH_MAX)
        enc = r.headers.get_content_charset() or "utf-8"
        html = raw.decode(enc, "replace")
    except Exception:
        return ("", "", "error")
    m = re.search(r"(?is)<title[^>]*>(.*?)</title>", html)
    title = re.sub(r"\s+", " ", re.sub(r"(?s)<[^>]+>", "", m.group(1))).strip()[:200] if m else ""
    t = re.sub(r"(?is)<(script|style|noscript|svg|head)[^>]*>.*?</\1>", " ", html)
    t = re.sub(r"(?i)<(br|/p|/div|/li|/tr|/h[1-6]|/section)\s*>", "\n", t)
    t = re.sub(r"(?s)<[^>]+>", " ", t)
    for a, b in (("&nbsp;", " "), ("&amp;", "&"), ("&lt;", "<"), ("&gt;", ">"), ("&#39;", "'"), ("&quot;", '"'), ("&#160;", " ")):
        t = t.replace(a, b)
    t = re.sub(r"[ \t\xa0]+", " ", t)
    lines = [ln.strip() for ln in t.split("\n")]
    text = re.sub(r"\n{3,}", "\n\n", "\n".join(ln for ln in lines if ln)).strip()[:200000]
    text = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", text)   # 去 NUL/控制符(PG text 不收)
    title = re.sub(r"[\x00-\x1f]", " ", title).strip()
    status = "ok" if len(text) >= 200 else "empty"
    return (title, text, status)

def pg():
    return psycopg2.connect(host=PG["host"], port=PG["port"], user=PG["user"],
                            password=PG["password"], dbname=PG["dbname"], connect_timeout=5)

def init_db():
    conn = pg()
    try:
        with conn, conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS users(
                    key text PRIMARY KEY, name text NOT NULL, icon text, color text, blurb text,
                    settings jsonb NOT NULL DEFAULT '{}', pin_hash text,
                    seed boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now());""")
            cur.execute("""
                CREATE TABLE IF NOT EXISTS user_state(
                    user_key text NOT NULL, name text NOT NULL, value jsonb,
                    updated_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(user_key,name));""")
            cur.execute("CREATE INDEX IF NOT EXISTS idx_user_state_user ON user_state(user_key);")
            cur.execute("""
                CREATE TABLE IF NOT EXISTS files(
                    id text PRIMARY KEY, user_key text, name text, mime text,
                    data bytea, size int, created_at timestamptz NOT NULL DEFAULT now());""")
            cur.execute("""
                CREATE TABLE IF NOT EXISTS library(
                    id serial PRIMARY KEY, disc_id text, school text, program text,
                    url text, title text, text text, chars int DEFAULT 0, status text,
                    fetched_at bigint, UNIQUE(disc_id, url));""")
            cur.execute("CREATE INDEX IF NOT EXISTS idx_library_disc ON library(disc_id);")
            cur.execute("""INSERT INTO users(key,name,icon,color,blurb,seed) VALUES
                ('siyu','Siyu','🎯','#6b4fd8','高考备考(物化生方向)',true),
                ('ma-huan','Ma Huan','🧭','#e07b39','终身学习 · 日语+托福+各科高阶',true),
                ('mahuan','Jiahuan','🚀','#16a085','六年级 · 小升初 · 英语为主',true)
                ON CONFLICT (key) DO NOTHING;""")
    finally:
        conn.close()

def user_exists(cur, key):
    cur.execute("SELECT 1 FROM users WHERE key=%s", (key,))
    return cur.fetchone() is not None

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=SITE_DIR, **kw)

    def log_message(self, fmt, *args):
        pass

    # 静态资源默认 no-store(避免浏览器拿旧版);_json 自行设过则不重复
    _cache_set = False
    def end_headers(self):
        if not self._cache_set:
            self.send_header("Cache-Control", "no-store")
            self._cache_set = True
        super().end_headers()

    def _json(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self._cache_set = True
        self.end_headers()
        self.wfile.write(body)

    def _read_json(self, limit=None):
        n = int(self.headers.get("Content-Length") or 0)
        if n <= 0 or n > (limit or MAX_BODY):
            return None
        try:
            return json.loads(self.rfile.read(n).decode("utf-8"))
        except Exception:
            return None

    def client_ip(self):
        return (self.headers.get("Cf-Connecting-Ip")
                or (self.headers.get("X-Forwarded-For", "").split(",")[0].strip())
                or self.client_address[0])

    def _auth_write(self):
        return self.headers.get("X-Write-Token") == WRITE_TOKEN

    # ---------- 路由 ----------
    def do_GET(self):
        self._cache_set = False
        p = urlparse(self.path)
        if p.path == "/api/health":
            return self.api_health()
        if p.path == "/api/users":
            return self.api_users_get()
        if p.path == "/api/overview":
            return self.api_overview()
        if p.path == "/api/state":
            return self.api_state_get(parse_qs(p.query))
        if p.path == "/api/report":
            return self.api_report(parse_qs(p.query))
        if p.path == "/api/file":
            return self.api_file(parse_qs(p.query))
        if p.path == "/api/lib":
            return self.api_lib(parse_qs(p.query))
        if p.path.startswith("/api/"):
            return self._json(404, {"ok": False, "error": "not found"})
        return super().do_GET()

    def do_POST(self):
        self._cache_set = False
        p = urlparse(self.path)
        if p.path == "/api/state":
            return self.api_state_set()
        if p.path == "/api/users":
            return self.api_users_post()
        if p.path == "/api/event":
            return self.api_event()
        if p.path == "/api/upload":
            return self.api_upload()
        if p.path == "/api/cache":
            return self.api_cache()
        return self._json(404, {"ok": False, "error": "not found"})

    # ---------- health ----------
    def api_health(self):
        db_ok = True
        try:
            conn = pg()
            with conn.cursor() as cur:
                cur.execute("SELECT 1")
            conn.close()
        except Exception:
            db_ok = False
        return self._json(200, {"ok": True, "db": db_ok, "ts": int(time.time() * 1000)})

    # ---------- users ----------
    def api_users_get(self):
        try:
            conn = pg()
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                cur.execute("SELECT key,name,icon,color,blurb,seed FROM users ORDER BY seed DESC, created_at")
                rows = cur.fetchall()
            conn.close()
            return self._json(200, {"ok": True, "users": rows})
        except Exception as e:
            return self._json(500, {"ok": False, "error": str(e)})

    def api_users_post(self):
        if not self._auth_write():
            return self._json(401, {"ok": False, "error": "bad token"})
        if not rate_ok(self.client_ip()):
            return self._json(429, {"ok": False, "error": "too many requests"})
        d = self._read_json()
        if not isinstance(d, dict) or not d.get("name"):
            return self._json(400, {"ok": False, "error": "bad body"})
        key = str(d.get("key") or ("u-" + format(int(time.time() * 1000), "x")))
        if not USER_RE.match(key):
            return self._json(400, {"ok": False, "error": "bad key"})
        name = str(d["name"])[:40]
        icon = str(d.get("icon") or name[:1])[:8]
        color = str(d.get("color") or "#B6532F")[:16]
        blurb = str(d.get("blurb") or "")[:120]
        try:
            conn = pg()
            with conn, conn.cursor() as cur:
                cur.execute("""INSERT INTO users(key,name,icon,color,blurb) VALUES(%s,%s,%s,%s,%s)
                    ON CONFLICT(key) DO UPDATE SET name=EXCLUDED.name, icon=EXCLUDED.icon, color=EXCLUDED.color, blurb=EXCLUDED.blurb""",
                    (key, name, icon, color, blurb))
            conn.close()
            return self._json(200, {"ok": True, "key": key})
        except Exception as e:
            return self._json(500, {"ok": False, "error": str(e)})

    # ---------- overview(各学习者汇总,平等视角,只读公开) ----------
    def api_overview(self):
        try:
            conn = pg()
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                cur.execute("SELECT key,name,icon,color,blurb FROM users ORDER BY seed DESC, created_at")
                users = cur.fetchall()
                cur.execute("SELECT user_key,name,value FROM user_state WHERE name IN ('points','progress','events','notes','wishlist','schedule','tasks')")
                rows = cur.fetchall()
            conn.close()
        except Exception as e:
            return self._json(500, {"ok": False, "error": str(e)})
        st = {}
        for r in rows:
            st.setdefault(r["user_key"], {})[r["name"]] = r["value"]
        out = []
        for u in users:
            s = st.get(u["key"], {})
            pts = s.get("points") if isinstance(s.get("points"), dict) else {}
            bal = pts.get("balance", 0) or 0
            prog = s.get("progress") if isinstance(s.get("progress"), dict) else {}
            mastered = len(prog)
            ev = s.get("events") if isinstance(s.get("events"), list) else []
            quiz = [e for e in ev if isinstance(e, dict) and e.get("kind") == "quiz" and e.get("total")]
            correct = sum(e.get("correct", 0) for e in quiz)
            tot = sum(e.get("total", 0) for e in quiz)
            acc = round(correct / tot * 100) if tot else None
            days = set()
            for e in ev:
                if isinstance(e, dict) and e.get("ts"):
                    days.add(datetime.fromtimestamp(e["ts"] / 1000).strftime("%Y-%m-%d"))
            streak = 0
            cur_d = datetime.now()
            for i in range(400):
                dk = cur_d.strftime("%Y-%m-%d")
                if dk in days:
                    streak += 1; cur_d -= timedelta(days=1)
                elif i == 0:
                    cur_d -= timedelta(days=1)
                else:
                    break
            tk = s.get("tasks") if isinstance(s.get("tasks"), list) else []
            sch = s.get("schedule") if isinstance(s.get("schedule"), dict) else None
            plan_pct = 0
            if tk:
                done = sum(1 for x in tk if isinstance(x, dict) and x.get("done"))
                plan_pct = round(done / len(tk) * 100) if tk else 0
            elif sch:
                blocks = [b for day in sch.get("days", []) for b in day.get("blocks", [])]
                done = sum(1 for b in blocks if b.get("done"))
                plan_pct = round(done / len(blocks) * 100) if blocks else 0
            out.append({
                "key": u["key"], "name": u["name"], "icon": u["icon"], "color": u["color"], "blurb": u.get("blurb"),
                "points": bal, "mastered": mastered, "events": len(ev), "accuracy": acc,
                "answered": tot, "notes": len(s.get("notes") or []), "wishlist": len(s.get("wishlist") or []),
                "streak": streak, "planPct": plan_pct, "hasPlan": bool(tk) or bool(sch), "activeDays": len(days)
            })
        return self._json(200, {"ok": True, "overview": out})

    # ---------- state(用户全部数据) ----------
    def api_state_get(self, q):
        user = (q.get("user") or [""])[0]
        if not USER_RE.match(user):
            return self._json(400, {"ok": False, "error": "bad user"})
        try:
            conn = pg()
            with conn.cursor() as cur:
                cur.execute("SELECT name,value FROM user_state WHERE user_key=%s", (user,))
                state = {name: value for name, value in cur.fetchall()}
            conn.close()
            return self._json(200, {"ok": True, "user": user, "state": state})
        except Exception as e:
            return self._json(500, {"ok": False, "error": str(e)})

    def api_state_set(self):
        if not self._auth_write():
            return self._json(401, {"ok": False, "error": "bad token"})
        if not rate_ok(self.client_ip()):
            return self._json(429, {"ok": False, "error": "too many requests"})
        d = self._read_json()
        if not isinstance(d, dict):
            return self._json(400, {"ok": False, "error": "bad body"})
        user = str(d.get("user") or "")
        name = str(d.get("name") or "")
        if not USER_RE.match(user) or not name or len(name) > 64:
            return self._json(400, {"ok": False, "error": "bad user/name"})
        value = d.get("value")
        try:
            conn = pg()
            with conn, conn.cursor() as cur:
                if not user_exists(cur, user):
                    return self._json(404, {"ok": False, "error": "no such user"})
                cur.execute("""INSERT INTO user_state(user_key,name,value) VALUES(%s,%s,%s)
                    ON CONFLICT(user_key,name) DO UPDATE SET value=EXCLUDED.value, updated_at=now()""",
                    (user, name, psycopg2.extras.Json(value)))
            conn.close()
            return self._json(200, {"ok": True})
        except Exception as e:
            return self._json(500, {"ok": False, "error": str(e)})

    # ---------- event(兼容:追加到 events 数组) ----------
    def api_event(self):
        if not self._auth_write():
            return self._json(401, {"ok": False, "error": "bad token"})
        if not rate_ok(self.client_ip()):
            return self._json(429, {"ok": False, "error": "too many requests"})
        d = self._read_json()
        if not isinstance(d, dict):
            return self._json(400, {"ok": False, "error": "bad body"})
        user = str(d.get("user") or d.get("track") or "")
        if not USER_RE.match(user):
            return self._json(400, {"ok": False, "error": "bad user"})
        ev = {k: d[k] for k in ("kind", "label", "subject", "scope", "correct", "total", "detail", "ts") if k in d}
        ev.setdefault("ts", int(time.time() * 1000))
        try:
            conn = pg()
            with conn, conn.cursor() as cur:
                if not user_exists(cur, user):
                    return self._json(404, {"ok": False, "error": "no such user"})
                cur.execute("""INSERT INTO user_state(user_key,name,value) VALUES(%s,'events',%s)
                    ON CONFLICT(user_key,name) DO UPDATE
                      SET value = (COALESCE(user_state.value,'[]'::jsonb) || EXCLUDED.value), updated_at=now()""",
                    (user, psycopg2.extras.Json([ev])))
            conn.close()
            return self._json(200, {"ok": True})
        except Exception as e:
            return self._json(500, {"ok": False, "error": str(e)})

    # ---------- 附件上传 / 取文件(存 PG bytea;base64 JSON 上传) ----------
    def api_upload(self):
        if not self._auth_write():
            return self._json(401, {"ok": False, "error": "bad token"})
        if not rate_ok(self.client_ip()):
            return self._json(429, {"ok": False, "error": "too many requests"})
        d = self._read_json(UPLOAD_MAX)
        if not isinstance(d, dict) or not d.get("data") or not d.get("name"):
            return self._json(400, {"ok": False, "error": "bad body"})
        user = str(d.get("user") or "")
        if not USER_RE.match(user):
            return self._json(400, {"ok": False, "error": "bad user"})
        try:
            raw = base64.b64decode(d["data"])
        except Exception:
            return self._json(400, {"ok": False, "error": "bad data"})
        if len(raw) > FILE_MAX:
            return self._json(413, {"ok": False, "error": "file too large"})
        fid = os.urandom(16).hex()
        name = str(d["name"])[:200]
        mime = str(d.get("mime") or "application/octet-stream")[:100]
        try:
            conn = pg()
            with conn, conn.cursor() as cur:
                cur.execute("INSERT INTO files(id,user_key,name,mime,data,size) VALUES(%s,%s,%s,%s,%s,%s)",
                            (fid, user, name, mime, psycopg2.Binary(raw), len(raw)))
            conn.close()
            return self._json(200, {"ok": True, "id": fid, "name": name})
        except Exception as e:
            return self._json(500, {"ok": False, "error": str(e)})

    def api_file(self, q):
        fid = (q.get("id") or [""])[0]
        if not FILE_ID_RE.match(fid):
            return self._json(400, {"ok": False, "error": "bad id"})
        try:
            conn = pg()
            with conn.cursor() as cur:
                cur.execute("SELECT name,mime,data FROM files WHERE id=%s", (fid,))
                row = cur.fetchone()
            conn.close()
        except Exception as e:
            return self._json(500, {"ok": False, "error": str(e)})
        if not row:
            return self._json(404, {"ok": False, "error": "not found"})
        name, mime, data = row[0], row[1] or "application/octet-stream", bytes(row[2])
        self.send_response(200)
        self.send_header("Content-Type", mime)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Content-Disposition", "inline; filename*=UTF-8''" + quote(name or "file"))
        self.send_header("Cache-Control", "private, max-age=86400")
        self._cache_set = True
        self.end_headers()
        self.wfile.write(data)

    # ---------- 本地资料库(名校培养方案正文快照) ----------
    def api_lib(self, q):
        iid = (q.get("id") or [""])[0]
        disc = (q.get("disc") or [""])[0]
        try:
            conn = pg()
            if iid.isdigit():
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    cur.execute("SELECT id,disc_id,school,program,url,title,text,chars,status,fetched_at FROM library WHERE id=%s", (int(iid),))
                    row = cur.fetchone()
                conn.close()
                return self._json(404, {"ok": False, "error": "not found"}) if not row else self._json(200, {"ok": True, "item": row})
            if disc:
                if not USER_RE.match(disc):
                    conn.close(); return self._json(400, {"ok": False, "error": "bad disc"})
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    cur.execute("SELECT id,disc_id,school,program,url,title,chars,status,fetched_at FROM library WHERE disc_id=%s ORDER BY id", (disc,))
                    rows = cur.fetchall()
                conn.close()
                return self._json(200, {"ok": True, "items": rows})
            with conn.cursor() as cur:
                cur.execute("SELECT count(*), coalesce(sum(chars),0) FROM library WHERE status='ok'")
                c = cur.fetchone()
            conn.close()
            return self._json(200, {"ok": True, "count": c[0], "chars": int(c[1])})
        except Exception as e:
            return self._json(500, {"ok": False, "error": str(e)})

    def api_cache(self):
        if not self._auth_write():
            return self._json(401, {"ok": False, "error": "bad token"})
        if not rate_ok(self.client_ip()):
            return self._json(429, {"ok": False, "error": "too many requests"})
        d = self._read_json()
        if not isinstance(d, dict) or not d.get("url"):
            return self._json(400, {"ok": False, "error": "bad body"})
        url = str(d["url"])[:1000]
        if not url.startswith(("http://", "https://")):
            return self._json(400, {"ok": False, "error": "bad url"})
        disc = str(d.get("discId") or "")[:64]
        school = str(d.get("school") or "")[:200]
        program = str(d.get("program") or "")[:300]
        title, text, status = fetch_readable(url)
        try:
            conn = pg()
            with conn, conn.cursor() as cur:
                cur.execute("""INSERT INTO library(disc_id,school,program,url,title,text,chars,status,fetched_at)
                    VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s)
                    ON CONFLICT (disc_id,url) DO UPDATE SET school=EXCLUDED.school,program=EXCLUDED.program,
                      title=EXCLUDED.title,text=EXCLUDED.text,chars=EXCLUDED.chars,status=EXCLUDED.status,fetched_at=EXCLUDED.fetched_at
                    RETURNING id""", (disc, school, program, url, title, text, len(text), status, int(time.time() * 1000)))
                rid = cur.fetchone()[0]
            conn.close()
            return self._json(200, {"ok": True, "id": rid, "chars": len(text), "status": status, "title": title})
        except Exception as e:
            return self._json(500, {"ok": False, "error": str(e)})

    # ---------- report(本人/自带学习者 数据汇总,读密钥) ----------
    def api_report(self, q):
        if (q.get("key") or [""])[0] != READ_KEY:
            return self._json(401, {"ok": False, "error": "需要正确的读取密钥 key"})
        user = (q.get("user") or ["mahuan"])[0]
        if not USER_RE.match(user):
            return self._json(400, {"ok": False, "error": "bad user"})
        try:
            conn = pg()
            with conn.cursor() as cur:
                cur.execute("SELECT name,value FROM user_state WHERE user_key=%s", (user,))
                state = {name: value for name, value in cur.fetchall()}
            conn.close()
        except Exception as e:
            return self._json(500, {"ok": False, "error": str(e)})
        events = state.get("events") or []
        points = state.get("points") or {}
        now = time.time() * 1000
        week = sum(1 for e in events if isinstance(e, dict) and now - (e.get("ts") or 0) < 7 * 864e5)
        scored = [e for e in events if isinstance(e, dict) and e.get("total")]
        avg = round(sum(e["correct"] / e["total"] for e in scored) / len(scored) * 100) if scored else None
        summary = {"events_total": len(events), "week": week, "accuracy": avg,
                   "points": points.get("balance", 0) if isinstance(points, dict) else 0,
                   "wishlist": len(state.get("wishlist") or []), "notes": len(state.get("notes") or []),
                   "schedule": bool(state.get("schedule"))}
        return self._json(200, {"ok": True, "user": user, "summary": summary, "state": state})

def main():
    init_db()
    httpd = ThreadingHTTPServer((BIND, PORT), Handler)
    print(f"pansophia server on http://{BIND}:{PORT}  (pg={PG['dbname']}@{PG['host']}:{PG['port']})")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.shutdown()

if __name__ == "__main__":
    main()
