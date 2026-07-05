#!/usr/bin/env python3
# =============================================================
#  高考数学真题导入管线(GAOKAO-Bench → 我们的题库 seed)
# -------------------------------------------------------------
#  源:tools/sources/gaokao_math{1,2}_mcq.json(OpenLMLab/GAOKAO-Bench,
#      2010-2022 高考数学选择题,LaTeX 格式,含答案+解析)
#  流程:LaTeX→Unicode 纯文本 → 质量过滤(残留反斜杠即跳过)→
#        关键词映射到考点 kp(只映射已建卡的章节,映射不上跳过)→
#        生成 seed(tools/seeds/questions-<date>-gk-real-math.json)
#  之后走正规 python3 tools/import_questions.py <seed> 入库。
#  真题标注:source = "真题·<年份><卷型>",variant_of 空,point 空。
# =============================================================
import json, os, re, hashlib, sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "seeds", "questions-20260705-gk-real-math.json")

# ---------- LaTeX → Unicode ----------
SUP = {"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","n":"ⁿ","x":"ˣ","-":"⁻","+":"⁺"}
def sup(s):
    return "".join(SUP.get(c, None) or ("^" + c) for c in s) if all(c in SUP for c in s) else "^(" + s + ")"

REPL = [
    (r"\\left", ""), (r"\\right", ""), (r"\\!", ""), (r"\\,", " "), (r"\\;", " "), (r"\\quad", " "), (r"\\qquad", " "),
    (r"\\leqslant", "≤"), (r"\\leq", "≤"), (r"\\geqslant", "≥"), (r"\\geq", "≥"), (r"\\neq", "≠"), (r"\\ne\b", "≠"),
    (r"\\in\b", "∈"), (r"\\notin", "∉"), (r"\\subseteq", "⊆"), (r"\\subsetneqq?", "⊊"), (r"\\subset", "⊂"), (r"\\supseteq", "⊇"),
    (r"\\cap", "∩"), (r"\\cup", "∪"), (r"\\complement", "∁"), (r"\\varnothing", "∅"), (r"\\emptyset", "∅"),
    (r"\\mid", "|"), (r"\\vee", "∨"), (r"\\wedge", "∧"), (r"\\forall", "∀"), (r"\\exists", "∃"), (r"\\neg", "¬"),
    (r"\\pi", "π"), (r"\\alpha", "α"), (r"\\beta", "β"), (r"\\theta", "θ"), (r"\\varphi", "φ"), (r"\\phi", "φ"),
    (r"\\omega", "ω"), (r"\\lambda", "λ"), (r"\\Delta", "Δ"), (r"\\mu", "μ"),
    (r"\\sin", "sin"), (r"\\cos", "cos"), (r"\\tan", "tan"), (r"\\ln", "ln"), (r"\\lg", "lg"), (r"\\log", "log"),
    (r"\\infty", "∞"), (r"\\rightarrow", "→"), (r"\\Rightarrow", "⇒"), (r"\\Leftrightarrow", "⇔"),
    (r"\\cdot", "·"), (r"\\triangle", "△"), (r"\\times", "×"), (r"\\div", "÷"), (r"\\pm", "±"),
    (r"\\%", "%"), (r"\\\$", "$"), (r"\\&", "&"), (r"\\_", "_"), (r"\\#", "#"),
    (r"\\mathrm\{([^{}]*)\}", r"\1"), (r"\\mathbf\{([^{}]*)\}", r"\1"), (r"\\text\{([^{}]*)\}", r"\1"),
    (r"\\overline\{([^{}]*)\}", r"\1̄"), (r"\\bar\{([^{}]*)\}", r"\1̄"),
    (r"\\sqrt\{([^{}]*)\}", r"√(\1)"), (r"\\sqrt (\w)", r"√\1"),
    (r"\\frac\{([^{}]*)\}\{([^{}]*)\}", r"(\1)/(\2)"), (r"\\dfrac\{([^{}]*)\}\{([^{}]*)\}", r"(\1)/(\2)"),
]

def unlatex(s):
    if not s: return ""
    t = str(s)
    t = t.replace("$$", "$")
    for pat, rep in REPL:
        prev = None
        while prev != t:   # \frac 可能嵌套,迭代到不动点
            prev = t
            t = re.sub(pat, rep, t)
    # 上下标
    t = re.sub(r"\^\{([^{}]*)\}", lambda m: sup(m.group(1)), t)
    t = re.sub(r"\^(\w)", lambda m: sup(m.group(1)), t)
    t = re.sub(r"_\{([^{}]*)\}", r"_\1", t)
    t = t.replace("$", "")
    t = re.sub(r"\\\\", " ", t)
    t = re.sub(r"[{}]", "", t)
    t = re.sub(r"[ \t]+", " ", t)
    t = re.sub(r"\n{2,}", "\n", t)
    return t.strip()

# ---------- 考点映射(只映射已建/在建章节;顺序=优先级) ----------
KP_RULES = [
    ("充分条件与必要条件、充要条件", ["充分", "必要", "充要"]),
    ("全称命题与特称命题的否定", ["的否定"]),
    ("全称量词与存在量词", ["∀", "∃", "对任意", "存在"]),
    ("集合的基本运算(交集、并集、补集)", ["∩", "∪", "∁", "补集", "交集", "并集"]),
    ("集合间的基本关系(子集、真子集)", ["子集", "⊆", "⊊", "⊂"]),
    ("集合的概念与表示", ["集合", "元素"]),
    ("函数的零点与方程的根、零点存在定理", ["零点"]),
    ("函数的奇偶性与对称性", ["奇函数", "偶函数", "奇偶"]),
    ("函数的周期性", ["周期"]),
    ("函数的单调性与最值", ["单调"]),
    ("对数与对数函数", ["log", "ln", "lg", "对数"]),
    ("指数与指数函数", ["指数函数"]),
    ("幂函数", ["幂函数"]),
    ("函数的概念、定义域与值域", ["定义域", "值域"]),
    # 第三、四章(卡片在建,先挂上)
    ("导数的概念与几何意义", ["切线"]),
    ("利用导数求函数的极值与最值", ["极值", "极大值", "极小值"]),
    ("正弦定理与余弦定理", ["解三角形", "正弦定理", "余弦定理", "△", "三角形ABC", "三角形 ABC"]),
    ("三角函数的图象与性质", ["sin", "cos", "tan", "三角函数"]),
]
# 出现这些词直接跳过(章节还没做,或题型不适合)
SKIP_WORDS = ["复数", "虚数", " i ", "向量", "数列", "等差", "等比", "抛物线", "双曲线", "椭圆", "圆锥曲线",
              "直线与圆", "圆 (x", "圆(x", "圆 x", "圆心", "立体", "三视图", "棱锥", "棱柱", "球", "圆柱", "圆锥", "概率", "分布", "统计",
              "抽样", "回归", "排列", "组合", "二项式", "程序框图", "算法", "framework", "积分"]

def map_kp(text):
    for w in SKIP_WORDS:
        if w in text: return None
    for kp, words in KP_RULES:
        for w in words:
            if w in text: return kp
    return None

# ---------- 主流程 ----------
def parse_file(fp):
    d = json.load(open(fp))
    return d.get("example") or []

def split_options(qtext):
    # 题干里内联 A. … B. … C. … D. …(可能有 \n 或空格分隔)
    m = re.search(r"(.*?)\bA[.、]\s*(.*?)\s*B[.、]\s*(.*?)\s*C[.、]\s*(.*?)\s*D[.、]\s*(.*)$", qtext, re.S)
    if not m: return None
    stem = re.sub(r"^\s*\d+\s*[.、]?\s*(（\s*\d+\s*分\s*[)）])?", "", m.group(1)).strip()
    opts = [re.sub(r"\s+", " ", m.group(i)).strip().rstrip("。") for i in range(2, 6)]
    if not stem or any(not o for o in opts): return None
    return stem, opts

def main():
    seen, out, stats = set(), [], {}
    skipped_latex = skipped_kp = skipped_parse = 0
    for f in ("gaokao_math1_mcq.json", "gaokao_math2_mcq.json"):
        for q in parse_file(os.path.join(HERE, "sources", f)):
            raw = q.get("question") or ""
            ans = q.get("answer")
            if not isinstance(ans, list) or len(ans) != 1 or ans[0] not in "ABCD": continue
            text = unlatex(raw)
            if "\\" in text: skipped_latex += 1; continue   # 转不干净的放弃
            sp = split_options(text)
            if not sp: skipped_parse += 1; continue
            stem, opts = sp
            if len(stem) < 8 or len(stem) > 300: skipped_parse += 1; continue
            kp = map_kp(stem)
            if not kp: skipped_kp += 1; continue
            h = hashlib.md5(re.sub(r"\s", "", stem).encode()).hexdigest()
            if h in seen: continue
            seen.add(h)
            analysis = unlatex(q.get("analysis") or "")
            if "\\" in analysis or len(analysis) < 10: analysis = "略(真题解析转换失败,以答案为准)。"
            out.append({
                "kp": kp, "subject": "math", "scope": "gaokao", "type": "choice", "difficulty": 3,
                "stem": stem, "options": opts, "answer": "ABCD".index(ans[0]),
                "explain": analysis[:600],
                "source": "真题·%s%s" % (q.get("year", "?"), (q.get("category") or "").strip()),
            })
            stats[kp] = stats.get(kp, 0) + 1
    with open(OUT, "w", encoding="utf-8") as fo:
        json.dump(out, fo, ensure_ascii=False, indent=1)
    print("入选 %d 题 → %s" % (len(out), os.path.relpath(OUT, HERE + "/..")))
    print("跳过:LaTeX 残留 %d / 选项解析失败 %d / 考点映射不上(超纲章节等) %d" % (skipped_latex, skipped_parse, skipped_kp))
    for kp, n in sorted(stats.items(), key=lambda x: -x[1]): print("  %-28s %d" % (kp, n))

if __name__ == "__main__":
    main()
