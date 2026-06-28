#!/usr/bin/env python3
# =============================================================
#  导入器：开源 JLPT 数据 → data/words.ja.js
# -------------------------------------------------------------
#  输入（tools/sources/，均 MIT 许可，见 SOURCES.md）：
#    jlpt_n5_vocab.csv   N5 词（漢字, 読み）           — Bluskyo/JLPT_Vocabulary
#    jlpt_kanji.json     各级汉字（含义/笔画/频度）     — AnchorI/jlpt-kanji-dictionary
#  输出：data/words.ja.js  → window.WORD_BANK_JA
#
#  生成两类检测组：
#    ① N5 汉字·字义   term=汉字 → gloss=英文义（mode: term→gloss）
#    ② N5 词汇·读音   term=漢字词 → reading=假名（mode: term→reading，按五十音分组）
#  释义留待懒加载补充（词汇暂以"读音"为测点，最忠于开源数据、零手编）。
# =============================================================
import csv, json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "sources")
OUT = os.path.join(HERE, "..", "data", "words.ja.js")

ROWS = [
    ("あ行", "あいうえおぁぃぅぇぉ"),
    ("か行", "かきくけこがぎぐげご"),
    ("さ行", "さしすせそざじずぜぞ"),
    ("た行", "たちつてとだぢづでどっ"),
    ("な行", "なにぬねの"),
    ("は行", "はひふへほばびぶべぼぱぴぷぺぽ"),
    ("ま行", "まみむめも"),
    ("や行", "やゆよゃゅょ"),
    ("ら行", "らりるれろ"),
    ("わ行", "わをんゔ"),
]

def row_of(reading):
    c = reading[0] if reading else ""
    for name, chars in ROWS:
        if c in chars:
            return name
    return "その他"

def load_vocab():
    rows = []
    with open(os.path.join(SRC, "jlpt_n5_vocab.csv"), encoding="utf-8") as f:
        for r in csv.DictReader(f):
            term = (r.get("Kanji") or "").strip()
            reading = (r.get("Reading") or "").strip()
            if term and reading:
                rows.append((term, reading))
    return rows

def load_kanji_n5():
    data = json.load(open(os.path.join(SRC, "jlpt_kanji.json"), encoding="utf-8"))
    out = []
    for k in data:
        if k.get("jlpt") != "N5":
            continue
        ch = k.get("kanji")
        m = re.search(r"means (.+?)\.", k.get("description", ""))
        gloss = m.group(1).strip() if m else ""
        if ch and gloss:
            out.append((ch, gloss, k.get("frequency") or 9999))
    out.sort(key=lambda x: x[2])  # 按频度，常用在前
    return out

def js_str(s):
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'

def main():
    groups = []

    # ① N5 汉字·字义
    kanji = load_kanji_n5()
    groups.append({
        "id": "ja-n5-kanji", "profile": "ma-huan", "subject": "japanese",
        "scope": "jlpt-n5", "lang": "ja", "mode": "term2gloss",
        "unit": "N5 汉字", "title": "JLPT N5 汉字·字义",
        "desc": "看汉字想字义（英文释义），%d 个 N5 常用字。" % len(kanji),
        "words": [{"term": ch, "gloss": g} for ch, g, _ in kanji],
    })

    # ② N5 词汇·读音（按五十音分组）
    vocab = load_vocab()
    buckets = {}
    for term, reading in vocab:
        buckets.setdefault(row_of(reading), []).append((term, reading))
    for name, _chars in ROWS:
        items = buckets.get(name)
        if not items:
            continue
        groups.append({
            "id": "ja-n5-vocab-" + name, "profile": "ma-huan", "subject": "japanese",
            "scope": "jlpt-n5", "lang": "ja", "mode": "term2reading",
            "unit": "N5 词汇 · " + name, "title": "JLPT N5 词汇·读音（%s）" % name,
            "desc": "看汉字写读音（假名），%d 词。释义待补。" % len(items),
            "words": [{"term": t, "reading": r} for t, r in items],
        })

    # 输出 JS
    lines = []
    lines.append("/* =============================================================")
    lines.append(" *  检测中心 · 日语单词库（JLPT N5）— 由 tools/import_jlpt.py 生成")
    lines.append(" *  数据来源(MIT)：Bluskyo/JLPT_Vocabulary、AnchorI/jlpt-kanji-dictionary")
    lines.append(" *  词条：{ term 词/字, reading 读音(可选), gloss 释义(可选), tip 提示(可选) }")
    lines.append(" *  ⚠️ 本文件是生成产物，别手改；改导入器或源数据后重跑脚本。")
    lines.append(" * ============================================================= */")
    lines.append("window.WORD_BANK_JA = [")
    for g in groups:
        lines.append("  {")
        lines.append("    id: %s, profile: %s, subject: %s, scope: %s, lang: %s, mode: %s," % (
            js_str(g["id"]), js_str(g["profile"]), js_str(g["subject"]),
            js_str(g["scope"]), js_str(g["lang"]), js_str(g["mode"])))
        lines.append("    unit: %s, title: %s," % (js_str(g["unit"]), js_str(g["title"])))
        lines.append("    desc: %s," % js_str(g["desc"]))
        lines.append("    words: [")
        for w in g["words"]:
            parts = ["term: " + js_str(w["term"])]
            if w.get("reading"):
                parts.append("reading: " + js_str(w["reading"]))
            if w.get("gloss"):
                parts.append("gloss: " + js_str(w["gloss"]))
            lines.append("      { " + ", ".join(parts) + " },")
        lines.append("    ]")
        lines.append("  },")
    lines.append("];")
    out = "\n".join(lines) + "\n"
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(out)
    print("wrote", os.path.relpath(OUT, HERE), "—", len(groups), "groups,",
          sum(len(g["words"]) for g in groups), "entries")

if __name__ == "__main__":
    main()
