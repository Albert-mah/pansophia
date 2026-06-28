#!/usr/bin/env python3
# =============================================================
#  导入器：开源 JLPT 数据 → data/words.ja.js（N5→N1 全套）
# -------------------------------------------------------------
#  源（tools/sources/，MIT，见 SOURCES.md）：
#    jlpt_n{5..1}_vocab.csv  各级词（漢字, 読み）  — Bluskyo/JLPT_Vocabulary
#    jlpt_kanji.json         各级汉字（含义/频度）  — AnchorI/jlpt-kanji-dictionary
#  输出：data/words.ja.js → window.WORD_BANK_JA（profile=ma-huan, subject=japanese）
#    汉字组：term=汉字 → gloss=英文义（term2gloss）
#    词汇组：term=漢字词 → reading=假名（term2reading），释义待补
#  组大小封顶 CHUNK，便于一次练完。
# =============================================================
import csv, json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "sources")
OUT = os.path.join(HERE, "..", "data", "words.ja.js")
CHUNK = 60
LEVELS = ["N5", "N4", "N3", "N2", "N1"]   # 由易到难
CIRC = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵"

def chunks(seq, n):
    return [seq[i:i + n] for i in range(0, len(seq), n)] or [[]]

def num(i):
    return CIRC[i] if i < len(CIRC) else "(" + str(i + 1) + ")"

def js_str(s):
    return '"' + str(s).replace('\\', '\\\\').replace('"', '\\"') + '"'

def load_vocab(level):
    path = os.path.join(SRC, "jlpt_%s_vocab.csv" % level.lower())
    rows = []
    if not os.path.exists(path):
        return rows
    with open(path, encoding="utf-8") as f:
        for r in csv.DictReader(f):
            t = (r.get("Kanji") or "").strip()
            rd = (r.get("Reading") or "").strip()
            if t and rd:
                rows.append((t, rd))
    return rows

def load_kanji():
    by = {lv: [] for lv in LEVELS}
    data = json.load(open(os.path.join(SRC, "jlpt_kanji.json"), encoding="utf-8"))
    for k in data:
        lv = k.get("jlpt")
        if lv not in by:
            continue
        m = re.search(r"means (.+?)\.", k.get("description", ""))
        if k.get("kanji") and m:
            by[lv].append((k["kanji"], m.group(1).strip(), k.get("frequency") or 9999))
    for lv in by:
        by[lv].sort(key=lambda x: x[2])
    return by

def main():
    groups = []
    kanji = load_kanji()
    for lv in LEVELS:
        scope = "jlpt-" + lv.lower()
        # 汉字
        ks = kanji.get(lv, [])
        for i, ch in enumerate(chunks(ks, CHUNK)):
            if not ch: continue
            groups.append({
                "id": "ja-%s-kanji-%d" % (lv.lower(), i + 1),
                "scope": scope, "mode": "term2gloss",
                "unit": "%s 汉字 %s" % (lv, num(i)), "title": "JLPT %s 汉字·字义 %s" % (lv, num(i)),
                "desc": "看汉字想字义（英文释义），%d 字。" % len(ch),
                "words": [{"term": c, "gloss": g} for c, g, _ in ch],
            })
        # 词汇
        vs = load_vocab(lv)
        for i, ch in enumerate(chunks(vs, CHUNK)):
            if not ch: continue
            groups.append({
                "id": "ja-%s-vocab-%d" % (lv.lower(), i + 1),
                "scope": scope, "mode": "term2reading",
                "unit": "%s 词汇 %s" % (lv, num(i)), "title": "JLPT %s 词汇·读音 %s" % (lv, num(i)),
                "desc": "看词写读音（假名），%d 词。释义待补。" % len(ch),
                "words": [{"term": t, "reading": r} for t, r in ch],
            })

    lines = [
        "/* =============================================================",
        " *  检测中心 · 日语词库（JLPT N5→N1 全套）— tools/import_jlpt.py 生成",
        " *  数据来源(MIT)：Bluskyo/JLPT_Vocabulary、AnchorI/jlpt-kanji-dictionary",
        " *  ⚠️ 生成产物，勿手改；改源/导入器后重跑脚本。",
        " * ============================================================= */",
        "window.WORD_BANK_JA = [",
    ]
    for g in groups:
        lines.append("  {")
        lines.append('    id: %s, profile: "ma-huan", subject: "japanese", scope: %s, lang: "ja", mode: %s,'
                     % (js_str(g["id"]), js_str(g["scope"]), js_str(g["mode"])))
        lines.append("    unit: %s, title: %s, desc: %s," % (js_str(g["unit"]), js_str(g["title"]), js_str(g["desc"])))
        lines.append("    words: [")
        for w in g["words"]:
            parts = ["term: " + js_str(w["term"])]
            if w.get("reading"): parts.append("reading: " + js_str(w["reading"]))
            if w.get("gloss"): parts.append("gloss: " + js_str(w["gloss"]))
            lines.append("      { " + ", ".join(parts) + " },")
        lines.append("    ]")
        lines.append("  },")
    lines.append("];")
    open(OUT, "w", encoding="utf-8").write("\n".join(lines) + "\n")
    print("wrote words.ja.js — %d groups, %d entries, %.0f KB"
          % (len(groups), sum(len(g["words"]) for g in groups), os.path.getsize(OUT) / 1024))

if __name__ == "__main__":
    main()
