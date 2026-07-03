#!/usr/bin/env python3
# =============================================================
#  导入器:初中(中考)/高中 英语词表 → data/words.en.school.js
# -------------------------------------------------------------
#  源(tools/sources/):
#    zhongkao_words.txt  mahavivo/english-wordlists 中考英语词汇表
#                        行:word [音标] 词性. 释义
#    gaozhong_words.txt  KyleBing/english-vocabulary 高中词汇(乱序)
#                        行:word\t释义
#  输出:window.WORD_BANK_EN_SCHOOL = [{scope:"chuzhong"|,"gaozhong",words:[...]}]
#  SRS 键 = lang|term,与 TOEFL 库同键:同一个词学过一处,另一处自动算掌握。
# =============================================================
import os, re

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "data", "words.en.school.js")

def js(s):
    return '"' + str(s).replace("\\", "\\\\").replace('"', '\\"') + '"'

def clean_gloss(g):
    g = re.sub(r"\s+", " ", g or "").strip()
    return g[:80]

def parse_zhongkao(fp):
    words, seen = [], set()
    pat = re.compile(r"^([A-Za-z][A-Za-z'’.\- ]*?)\s*(?:\(([^)]*)\))?\s*\[([^\]]+)\]\s*(.+)$")
    for line in open(fp, encoding="utf-8-sig"):
        line = line.strip()
        if not line or len(line) <= 2: continue
        m = pat.match(line)
        if not m: continue
        term = m.group(1).strip()
        if not re.match(r"^[A-Za-z][A-Za-z'’\-]*$", term): term = term.split()[0]
        key = term.lower()
        if key in seen: continue
        seen.add(key)
        words.append({"term": term, "reading": "[" + m.group(3).strip() + "]", "gloss": clean_gloss(m.group(4))})
    return words

def parse_gaozhong(fp):
    words, seen = [], set()
    for line in open(fp, encoding="utf-8-sig"):
        parts = line.rstrip("\n").split("\t", 1)
        if len(parts) != 2: continue
        term, gloss = parts[0].strip(), clean_gloss(parts[1])
        if not re.match(r"^[A-Za-z][A-Za-z'’\- ]*$", term) or not gloss: continue
        key = term.lower()
        if key in seen: continue
        seen.add(key)
        words.append({"term": term, "reading": "", "gloss": gloss})
    return words

zk = parse_zhongkao(os.path.join(HERE, "sources", "zhongkao_words.txt"))
gz = parse_gaozhong(os.path.join(HERE, "sources", "gaozhong_words.txt"))

with open(OUT, "w", encoding="utf-8") as f:
    f.write("/* 初中(中考)/高中 英语词库 —— tools/import_school_words.py 生成,勿手改。\n")
    f.write(" * 源:mahavivo/english-wordlists 中考表(带音标) + KyleBing/english-vocabulary 高中乱序表。 */\n")
    f.write("window.WORD_BANK_EN_SCHOOL = [\n")
    for scope, words in (("chuzhong", zk), ("gaozhong", gz)):
        f.write('  { scope: "%s", words: [\n' % scope)
        for w in words:
            f.write("    {term:%s,reading:%s,gloss:%s},\n" % (js(w["term"]), js(w["reading"]), js(w["gloss"])))
        f.write("  ] },\n")
    f.write("];\n")

print("中考 %d 词 / 高中 %d 词 → %s" % (len(zk), len(gz), os.path.relpath(OUT, HERE + "/..")))
