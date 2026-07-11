#!/usr/bin/env python3
# =============================================================
#  题目导入工具(规格见 docs/card-system.md §四)
# -------------------------------------------------------------
#  用法:
#    python3 tools/import_questions.py <file.json> [--dry-run] [--base URL]
#    python3 tools/import_questions.py --coverage [--min 3] [--base URL]
#
#  <file.json> 形状:题目对象数组(见 docs/card-system.md)。
#    · 每题必填:kp / subject / type(choice|fill) / stem / answer / explain
#    · choice:options 3-5 项,answer 为正确项下标(int)
#    · fill:answer 为可接受答案的字符串数组
#    · 变体组:同组题写相同的 "group": "任意标签"。导入时组内第一题
#      variant_of=null,其余 variant_of=第一题的数据库 id(自动回填)。
#  --dry-run 只做 schema 校验不入库;有任何错误退出码 1。
#  --coverage 扫 data/cards.*.js 的 drill 卡,逐 kp 查 /api/questions,
#      配题少于 --min(默认 3)的列出来,存在缺口退出码 1。
#  写入走 POST /api/questions(X-Write-Token 从 ~/.studyhub/config.json 读),
#  agent 不需要 PG 凭证,本地起着 server.py 即可。
# =============================================================
import json, sys, os, subprocess, urllib.request

BASE = "http://127.0.0.1:8790"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def die(msg):
    print("❌ " + msg); sys.exit(1)

def write_token():
    p = os.path.expanduser("~/.studyhub/config.json")
    try:
        with open(p) as f: return json.load(f).get("write_token") or ""
    except Exception:
        die("读不到 %s 的 write_token(导入需要;--dry-run 不需要)" % p)

def api(path, body=None, token=None):
    req = urllib.request.Request(BASE + path)
    req.add_header("Accept", "application/json")
    data = None
    if body is not None:
        data = json.dumps(body, ensure_ascii=False).encode("utf-8")
        req.add_header("Content-Type", "application/json")
        if token: req.add_header("X-Write-Token", token)
    with urllib.request.urlopen(req, data, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))

# ---------- schema 校验 ----------
def check(items):
    errs = []
    if not isinstance(items, list) or not items:
        return ["顶层应为非空数组"]
    for i, q in enumerate(items):
        w = "第 %d 题" % (i + 1)
        if not isinstance(q, dict): errs.append(w + ": 应为对象"); continue
        for f in ("kp", "subject", "type", "stem", "answer", "explain"):
            if not q.get(f) and q.get(f) != 0: errs.append("%s: 缺必填字段 %s" % (w, f))
        t = q.get("type")
        if t not in ("choice", "fill", "listen"): errs.append("%s: type 应为 choice|fill|listen(现在是 %r)" % (w, t))
        if t in ("choice", "listen"):
            ops = q.get("options")
            if not isinstance(ops, list) or not (3 <= len(ops) <= 5):
                errs.append(w + ": %s 的 options 应为 3-5 项数组" % t)
            elif not isinstance(q.get("answer"), int) or not (0 <= q["answer"] < len(ops)):
                errs.append(w + ": %s 的 answer 应为 options 下标(int)" % t)
        if t == "listen":
            if q.get("subject") not in ("english", "japanese"):
                errs.append(w + ": listen 题型只支持 english/japanese")
            if q.get("audio") is not None and not isinstance(q.get("audio"), str):
                errs.append(w + ": audio 应为字符串(要朗读的文本,缺省=正确选项)")
        if t == "fill":
            a = q.get("answer")
            if not isinstance(a, list) or not a or not all(isinstance(x, str) and x.strip() for x in a):
                errs.append(w + ": fill 的 answer 应为非空字符串数组")
        if q.get("lab") is not None and (not isinstance(q.get("lab"), str) or not q["lab"].strip()):
            errs.append(w + ": lab 应为非空字符串(课文交互 .lab-title 原文)")
        d = q.get("difficulty", 2)
        if d not in (1, 2, 3): errs.append(w + ": difficulty 应为 1/2/3")
        if len(str(q.get("stem") or "")) > 2000: errs.append(w + ": stem 过长")
    return errs

# ---------- 导入(按 group 回填 variant_of) ----------
def do_import(fp, dry):
    with open(fp) as f: items = json.load(f)
    errs = check(items)
    if errs:
        print("❌ schema 校验 %d 个问题:" % len(errs))
        for e in errs: print("   - " + e)
        sys.exit(1)
    print("✓ schema 校验通过:%d 题" % len(items))
    if dry:
        print("(--dry-run,未入库)"); return
    token = write_token()
    hb = api("/api/health")
    if not (hb.get("ok") and hb.get("db")): die("服务不健康:%s(先起 server.py)" % hb)
    # 按出现顺序分组:无 group 的自成一组
    groups, order = {}, []
    for q in items:
        g = q.get("group") or ("__solo_%d" % id(q))
        if g not in groups: groups[g] = []; order.append(g)
        groups[g].append(q)
    n = 0
    for g in order:
        qs = groups[g]
        head = dict(qs[0]); head.pop("group", None); head["variant_of"] = None
        r = api("/api/questions", {"questions": [head]}, token)
        if not r.get("ok"): die("入库失败:%s" % r)
        head_id = r["ids"][0]; n += 1
        rest = []
        for q in qs[1:]:
            q = dict(q); q.pop("group", None); q["variant_of"] = str(head_id); rest.append(q)
        if rest:
            r = api("/api/questions", {"questions": rest}, token)
            if not r.get("ok"): die("入库失败:%s" % r)
            n += len(rest)
    print("✓ 已入库 %d 题(变体组 %d 个)" % (n, sum(1 for g in order if len(groups[g]) > 1)))

# ---------- drill 卡配题覆盖 ----------
def do_coverage(min_n):
    js = ("global.window={};const fs=require('fs'),p=require('path');"
          "const D=p.join(%r,'data');"
          "fs.readdirSync(D).filter(n=>/^cards\\.[a-z0-9._-]+\\.js$/.test(n)).forEach(n=>require(p.join(D,n)));"
          "console.log(JSON.stringify((global.window.STUDY_CARDS||[]).filter(c=>c.mode==='drill').map(c=>c.kp)));" % ROOT)
    kps = json.loads(subprocess.check_output(["node", "-e", js]).decode("utf-8"))
    if not kps: print("没有 drill 卡。"); return
    gaps = []
    for kp in kps:
        r = api("/api/questions?kp=%s&limit=50" % urllib.request.quote(kp))
        cnt = len([q for q in (r.get("questions") or []) if q.get("scope") != "extra"])   # 课外题不算配题达标
        mark = "✓" if cnt >= min_n else "✗"
        print(" %s %-40s %d 题" % (mark, kp, cnt))
        if cnt < min_n: gaps.append(kp)
    if gaps:
        print("\n❌ %d 张 drill 卡配题不足 %d 道:%s" % (len(gaps), min_n, ", ".join(gaps)))
        sys.exit(1)
    print("\n✓ 全部 drill 卡配题达标(≥%d)" % min_n)

if __name__ == "__main__":
    args = sys.argv[1:]
    if "--base" in args:
        i = args.index("--base"); BASE = args[i + 1]; del args[i:i + 2]
    if "--coverage" in args:
        m = 3
        if "--min" in args:
            i = args.index("--min"); m = int(args[i + 1])
        do_coverage(m)
    else:
        files = [a for a in args if not a.startswith("--")]
        if not files: die("用法:import_questions.py <file.json> [--dry-run] | --coverage")
        do_import(files[0], "--dry-run" in args)
