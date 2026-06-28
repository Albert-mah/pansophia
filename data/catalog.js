/* =============================================================
 *  学习中心 · 知识点清单 (catalog)
 * -------------------------------------------------------------
 *  这是"讲解类"知识点的清单。学科/范围/档案的定义见 data/model.js。
 *  每条带 { profile, subject, scopes[], status }，首页按维度过滤、
 *  并统计大纲覆盖度（status: done 完成 / partial 部分 / todo 待填）。
 *
 *  新增知识点：复制 templates/_template.html，在此加一条记录。
 *  字段说明见文件末尾。
 * ============================================================= */
window.STUDY_CATALOG = [

  /* ===== 档案：思雨（siyu · 高考） ===== */
  {
    id: "math-quadratic-functions",
    profile: "siyu", subject: "math", discipline: "math", scopes: ["gaokao"], status: "done",
    category: "函数",
    title: "二次函数与图象",
    path: "subjects/math/quadratic-functions.html",
    summary: "用滑块实时改变 a、b、c，观察抛物线的开口、顶点、对称轴与零点；配方法、顶点式与图象平移一次讲清。",
    tags: ["函数", "抛物线", "配方法", "顶点", "最值", "可交互"],
    date: "2026-06-23", difficulty: 2, type: "交互",
    related: ["math-derivatives"]
  },
  {
    id: "math-derivatives",
    profile: "siyu", subject: "math", discipline: "math", scopes: ["gaokao"], status: "done",
    category: "函数与导数",
    title: "导数：瞬时变化率与切线斜率",
    path: "subjects/math/derivatives.html",
    summary: "用滑块移动切点和 h，观察割线如何逼近切线，理解导数的极限定义、几何意义、符号含义与常见求导公式。",
    tags: ["导数", "切线", "斜率", "极限", "变化率", "可交互"],
    date: "2026-06-23", difficulty: 2, type: "交互",
    related: ["math-quadratic-functions"]
  },
  {
    id: "methods-how-to-use",
    profile: "siyu", subject: "methods", scopes: ["general"], status: "done",
    category: "使用指南",
    title: "如何使用这个学习中心",
    path: "subjects/methods/how-to-use.html",
    summary: "本站怎么组织、怎么复习、提问后会生成什么样的内容，以及如何长期积累成自己的知识库。",
    tags: ["指南", "复习方法", "知识管理"],
    date: "2026-06-23", difficulty: 1, type: "文档",
    related: []
  },

  /* ===== 档案：ma-huan（马欢 · 终身学习） ===== */
  {
    id: "mh-psych-intro",
    profile: "ma-huan", subject: "psychology", discipline: "psychology", scopes: ["general"], status: "done",
    category: "导论与方法",
    title: "心理学是什么 · 分支地图",
    path: "subjects/psychology/intro.html",
    summary: "用一张图看懂心理学研究什么、有哪些分支（基础/应用）、五大流派视角、几个地基概念（相关≠因果），以及成人自学的推荐路线。",
    tags: ["心理学", "导论", "分支", "流派", "自学路线", "Psychology"],
    date: "2026-06-28", difficulty: 1, type: "文档",
    related: []
  },

  /* ===== 档案：mahuan（嘉欢 · 六年级英语） ===== */
  {
    id: "mh-en-past-tense",
    profile: "mahuan", subject: "english", scopes: ["jijiao-6b", "xiaoxue"], status: "done",
    category: "语法 · 时态",
    title: "一般过去时（动词过去式）",
    path: "subjects/english/mh-past-tense.html",
    summary: "什么时候用过去时、动词怎么变过去式（+ed 规则 + 高频不规则表）、否定和疑问怎么改，配可点开的自测。",
    tags: ["一般过去时", "过去式", "ed", "不规则动词", "yesterday", "小升初"],
    date: "2026-06-25", difficulty: 2, type: "文档",
    related: ["mh-en-future-tense", "mh-en-comparatives", "mh-en-be-verb"]
  },
  {
    id: "mh-en-future-tense",
    profile: "mahuan", subject: "english", scopes: ["jijiao-6b", "xiaoxue"], status: "done",
    category: "语法 · 时态",
    title: "一般将来时（will + 动词原形）",
    path: "subjects/english/mh-future-tense.html",
    summary: "六下 Unit 3 核心：tomorrow / next… / this summer 用 will + 原形；否定 won't、疑问 Will 提前，will 不随人称变。",
    tags: ["一般将来时", "will", "won't", "Unit3", "暑假", "小升初"],
    date: "2026-06-25", difficulty: 2, type: "文档",
    related: ["mh-en-past-tense", "mh-en-be-verb"]
  },
  {
    id: "mh-en-comparatives",
    profile: "mahuan", subject: "english", scopes: ["jijiao-6b", "xiaoxue"], status: "done",
    category: "语法 · 形容词",
    title: "形容词比较级（taller / bigger / more …）",
    path: "subjects/english/mh-comparatives.html",
    summary: "比较级的四条变化规则（直接 +er / 去 e+r / 双写 +er / more）、than 的用法和最常考的易错点。",
    tags: ["比较级", "than", "er", "more", "形容词", "小升初"],
    date: "2026-06-25", difficulty: 2, type: "文档",
    related: ["mh-en-past-tense"]
  },
  {
    id: "mh-en-be-verb",
    profile: "mahuan", subject: "english", scopes: ["jijiao-6b", "xiaoxue"], status: "done",
    category: "语法 · 基础",
    title: "be 动词：am / is / are / was / were",
    path: "subjects/english/mh-be-verb.html",
    summary: "be 动词怎么和主语搭配、现在与过去（is→was, are→were）、口诀「我用 am，你用 are，is 跟着他她它」。",
    tags: ["be动词", "am", "is", "are", "was", "were", "主谓一致"],
    date: "2026-06-25", difficulty: 1, type: "文档",
    related: ["mh-en-past-tense", "mh-en-comparatives"]
  }
];

/* =============================================================
 *  字段说明
 *   id        唯一标识
 *   profile   学习者档案 key（见 STUDY_PROFILES：siyu / ma-huan / mahuan）
 *   subject   学科 key（见 STUDY_SUBJECTS）
 *   discipline 可选：所属"学科索引"id（见 disciplines.js）。把讲解页显式挂到
 *             知识库某学科上——尤其当它对应的 discipline 没有 subject 时（如个人理财）
 *   scopes    范围标签数组（见 STUDY_SCOPES），用于"圈出"
 *   status    done 完成 / partial 部分 / todo 待填
 *             ⚠️ 覆盖度只数 done（或被 skeleton 有效 ref 命中）；partial / todo 都不计入
 *   category  二级分类；title/path/summary/tags/date/difficulty/type/related 同前
 * ============================================================= */
