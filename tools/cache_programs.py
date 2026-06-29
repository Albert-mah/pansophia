#!/usr/bin/env python3
# 批量抓取 名校培养方案 链接 → 正文快照存入 PG library 表。复用 server.py 的 fetch_readable/pg。
import re, json, sys, time
from concurrent.futures import ThreadPoolExecutor
ROOT="/home/albert/prj/vscodes/study-for-kids"
sys.path.insert(0, ROOT)
import server

src=open(ROOT+"/data/programs.js",encoding="utf-8").read()
i=src.index("{", src.index("=", src.index("STUDY_PROGRAMS")))
txt=re.sub(r",(\s*[}\]])", r"\1", src[i:src.rindex("}")+1])   # 去尾逗号→合法 JSON
data=json.loads(txt)
tasks=[]
for disc,arr in data.items():
    for e in arr:
        u=(e.get("url") or "").strip()
        if u.startswith(("http://","https://")):
            tasks.append((disc, e.get("school",""), e.get("program",""), u))
uniq=sorted({t[3] for t in tasks})
print(f"条目 {len(tasks)} · 唯一URL {len(uniq)}",flush=True)

fetched={}
done=[0]
def f1(u):
    res=server.fetch_readable(u)
    done[0]+=1
    if done[0]%25==0: print(f"  …{done[0]}/{len(uniq)}",flush=True)
    return (u,res)
with ThreadPoolExecutor(max_workers=12) as ex:
    for u,res in ex.map(f1,uniq):
        fetched[u]=res

conn=server.pg(); cur=conn.cursor(); now=int(time.time()*1000)
ok=empty=err=0
for disc,school,program,u in tasks:
    title,text,status=fetched.get(u,("","","error"))
    cur.execute("""INSERT INTO library(disc_id,school,program,url,title,text,chars,status,fetched_at)
      VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s)
      ON CONFLICT (disc_id,url) DO UPDATE SET school=EXCLUDED.school,program=EXCLUDED.program,
        title=EXCLUDED.title,text=EXCLUDED.text,chars=EXCLUDED.chars,status=EXCLUDED.status,fetched_at=EXCLUDED.fetched_at""",
      (disc,school,program,u,title,text,len(text),status,now))
    if status=="ok": ok+=1
    elif status=="empty": empty+=1
    else: err+=1
conn.commit(); cur.close(); conn.close()
print(f"完成 ok={ok} empty={empty} error={err} / 共{len(tasks)} 条 (唯一URL {len(uniq)})",flush=True)
