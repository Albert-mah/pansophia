/* =============================================================
 *  学习中心 · 统一数据模型 (model)
 * -------------------------------------------------------------
 *  通用化后的三个维度（正交）：
 *    PROFILE 学习者（人）  —— 谁在学，决定进度跟踪、默认落地
 *    SUBJECT 学科          —— 语文/数学/英语/日语…（kind: language|academic|meta）
 *    SCOPE   范围/等级      —— 小学/初中/高考 / CEFR / JLPT / CET…（"圈出"知识点的标签）
 *
 *  内容（知识点 / 单词 / 题）都带 { profile, subject, scopes[] }，
 *  首页按 profile→subject→scope 过滤；同一份内容可被多个 scope 复用。
 *
 *  这是重构后的总入口；旧的 STUDY_TRACKS 作为别名保留以兼容。
 * ============================================================= */

/* ---------- 学习者档案 ----------
 *  ★通用原则：内容池对所有档案开放，没有"谁只能学什么"的硬限制。
 *  下面每个 profile 的 `subjects: { 学科: [默认scope] }` 只是它的**默认选修/视角**，
 *  不是围栏——任何档案都能学任何 学科×范围，只要把内容标上对应的 subject/scopes 即可
 *  （或把该学科加进这里的 subjects）。思雨先选了高考、嘉欢先选了六年级，仅此而已。
 */
window.STUDY_PROFILES = {
  siyu: {
    name: "思雨", short: "思雨", icon: "🎯", color: "#6b4fd8",
    desc: "高考备考（物化生方向）",
    hosts: ["study", "localhost", "127.0.0.1"],
    showQuiz: true,
    // 该档案涉及的「学科 → 默认范围(scope)」
    subjects: {
      chinese: ["gaokao"], math: ["gaokao"], english: ["gaokao"],
      physics: ["gaokao"], chemistry: ["gaokao"], biology: ["gaokao"],
      methods: ["general"]
    }
  },
  "ma-huan": {
    name: "马欢", short: "马欢", icon: "🧭", color: "#e07b39",
    desc: "终身学习 · 日语体系 + 英语(托福) + 各科高阶",
    hosts: ["mahuanx"],
    showQuiz: true,
    subjects: {
      japanese: ["jlpt-n5", "jlpt-n4", "jlpt-n3", "jlpt-n2", "jlpt-n1"],
      english: ["toefl"],
      math: ["undergrad", "grad"], physics: ["undergrad", "grad"], eecs: ["undergrad", "grad"],
      chemistry: ["advanced"], biology: ["advanced"], methods: ["general"]
    }
  },
  mahuan: {
    name: "嘉欢", short: "嘉欢", icon: "🚀", color: "#16a085",
    desc: "六年级 · 小升初 · 英语为主",
    hosts: ["mahuan", "jiahuan"],
    showQuiz: true,
    subjects: {
      english: ["jijiao-6b", "xiaoxue", "chuzhong"], chinese: ["xiaoxue"],
      math: ["xiaoxue"], methods: ["general"]
    }
  }
};
window.STUDY_TRACKS = window.STUDY_PROFILES;  // 兼容旧引用

/* ---------- 学科 ---------- */
window.STUDY_SUBJECTS = {
  chinese:   { name: "语文", color: "#e2524a", icon: "📖", kind: "academic" },
  math:      { name: "数学", color: "#3b6fe0", icon: "📐", kind: "academic" },
  english:   { name: "英语", color: "#16a085", icon: "🔤", kind: "language" },
  japanese:  { name: "日语", color: "#d6455d", icon: "🗾", kind: "language" },
  physics:   { name: "物理", color: "#8e44ad", icon: "⚛️", kind: "academic" },
  chemistry: { name: "化学", color: "#e67e22", icon: "🧪", kind: "academic" },
  biology:   { name: "生物", color: "#27ae60", icon: "🧬", kind: "academic" },
  eecs:      { name: "电子信息", color: "#0e7490", icon: "📡", kind: "academic" },
  psychology:{ name: "心理学", color: "#9b59b6", icon: "🧠", kind: "academic" },
  politics:  { name: "政治", color: "#c0392b", icon: "⚖️", kind: "academic" },
  history:   { name: "历史", color: "#a0522d", icon: "📜", kind: "academic" },
  geography: { name: "地理", color: "#2980b9", icon: "🌏", kind: "academic" },
  methods:   { name: "学习方法", color: "#607d8b", icon: "🧠", kind: "meta" }
};

/* ---------- 范围 / 等级（scope）---------- */
window.STUDY_SCOPES = {
  // 学段
  xiaoxue:     { name: "小学", group: "学段", order: 1 },
  chuzhong:    { name: "初中", group: "学段", order: 2 },
  gaozhong:    { name: "高中", group: "学段", order: 3 },
  gaokao:      { name: "高考", group: "学段", order: 4 },
  advanced:    { name: "高阶/进阶", group: "学段", order: 5 },
  undergrad:   { name: "本科", group: "学段", order: 6 },
  grad:        { name: "研究生", group: "学段", order: 7 },
  "jijiao-6b": { name: "冀教·六下", group: "教材", order: 1 },
  // 英语考试
  cet4:  { name: "CET-4", group: "英语考试", order: 1 },
  cet6:  { name: "CET-6", group: "英语考试", order: 2 },
  ielts: { name: "雅思",  group: "英语考试", order: 3 },
  toefl: { name: "托福",  group: "英语考试", order: 4 },
  // 日语 JLPT
  "jlpt-n5": { name: "JLPT N5", group: "日语", order: 5 },
  "jlpt-n4": { name: "JLPT N4", group: "日语", order: 4 },
  "jlpt-n3": { name: "JLPT N3", group: "日语", order: 3 },
  "jlpt-n2": { name: "JLPT N2", group: "日语", order: 2 },
  "jlpt-n1": { name: "JLPT N1", group: "日语", order: 1 },
  general: { name: "通用", group: "其他", order: 9 }
};
