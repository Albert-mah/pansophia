#!/usr/bin/env python3
# =============================================================
#  导入器：ECDICT(托福标签) → data/words.en.js
# -------------------------------------------------------------
#  源：tools/sources/ecdict_toefl.csv（从 skywind3000/ECDICT 的 ecdict.csv
#      过滤 tag 含 'toefl' 得到，列：word,phonetic,translation）
#  输出：data/words.en.js → window.WORD_BANK_EN
#    profile=ma-huan, subject=english, scope=toefl
#    词条 term=英文, gloss=中文(取首义), ps=音标；模式 gloss2term/term2gloss/dictation
#  按词频分组（高频在前），每组 CHUNK 词。
# =============================================================
import csv, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "sources", "ecdict_toefl.csv")
OUT = os.path.join(HERE, "..", "data", "words.en.js")
CHUNK = 60
CIRC = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚"

def num(i):
    return CIRC[i] if i < len(CIRC) else "(" + str(i + 1) + ")"

def js_str(s):
    return '"' + str(s).replace('\\', '\\\\').replace('"', '\\"') + '"'

def short_gloss(translation):
    # ECDICT translation 形如 "vt. 放弃, 抛弃\\nn. 放任" —— 取首行、压短
    g = (translation or "").replace("\\n", "\n").split("\n")[0].strip()
    g = re.sub(r"^(\[[^\]]*\]\s*)+", "", g)   # 去掉开头的 [机]/[计]/[医] 等领域标记
    g = re.sub(r"\s+", " ", g).strip()
    return g[:40]

def main():
    rows = []
    with open(SRC, encoding="utf-8") as f:
        for r in csv.DictReader(f):
            w = (r.get("word") or "").strip()
            g = short_gloss(r.get("translation"))
            if not w or not g or " " in w:   # 跳过词组，只留单词
                continue
            try:
                frq = int(r.get("frq") or 0)
            except ValueError:
                frq = 0
            rows.append({"term": w, "gloss": g, "ps": (r.get("phonetic") or "").strip(), "frq": frq})
    # 高频在前（frq 越大越常用；0 排最后）
    rows.sort(key=lambda x: (-(x["frq"] or 0), x["term"]))

    groups = []
    for i in range(0, len(rows), CHUNK):
        ch = rows[i:i + CHUNK]
        gi = i // CHUNK
        groups.append({
            "id": "en-toefl-%d" % (gi + 1),
            "unit": "托福核心词 %s" % num(gi), "title": "TOEFL 核心词 %s（按词频）" % num(gi),
            "desc": "%d 词 · 中→英拼写 / 英→中 / 🔊听写。" % len(ch),
            "words": ch,
        })

    lines = [
        "/* =============================================================",
        " *  检测中心 · 英语词库（TOEFL）— tools/import_ecdict_toefl.py 生成",
        " *  数据来源：skywind3000/ECDICT（tag 含 toefl 的词），仅取单词、首义。",
        " *  ⚠️ 生成产物，勿手改。",
        " * ============================================================= */",
        "window.WORD_BANK_EN = [",
    ]
    for g in groups:
        lines.append("  {")
        lines.append('    id: %s, profile: "ma-huan", subject: "english", scope: "toefl", mode: "gloss2term",'
                     % js_str(g["id"]))
        lines.append("    unit: %s, title: %s, desc: %s," % (js_str(g["unit"]), js_str(g["title"]), js_str(g["desc"])))
        lines.append("    words: [")
        for w in g["words"]:
            parts = ["term: " + js_str(w["term"]), "gloss: " + js_str(w["gloss"])]
            if w.get("ps"): parts.append("ps: " + js_str(w["ps"]))
            lines.append("      { " + ", ".join(parts) + " },")
        lines.append("    ]")
        lines.append("  },")
    lines.append("];")
    open(OUT, "w", encoding="utf-8").write("\n".join(lines) + "\n")
    print("wrote words.en.js — %d groups, %d words, %.0f KB"
          % (len(groups), sum(len(g["words"]) for g in groups), os.path.getsize(OUT) / 1024))

if __name__ == "__main__":
    main()
