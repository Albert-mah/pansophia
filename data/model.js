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
 *  （或把该学科加进这里的 subjects）。下面是示例档案(演示数据，部署后可在用户管理里改成自己的)。
 */
window.STUDY_PROFILES = {
  siyu: {
    name: "Siyu", short: "Siyu", icon: "SY", color: "#6b4fd8",
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
    name: "Ma Huan", short: "Ma Huan", icon: "MH", color: "#e07b39",
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
    name: "Jiahuan", short: "Jiahuan", icon: "JH", color: "#16a085",
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

/* =============================================================
 *  六大门类 + 现实学科 —— 「学科探索」知识体系树的顶层(万象学院框架)
 * -------------------------------------------------------------
 *  不另存一份学科数据:每个门类用 `from` 指向已有 disciplines 数据里的
 *  组(国际 disciplines.intl.js 的 t1 / 国内 disciplines.js 的 t1 / 现实
 *  custom 组),渲染时按 id 去重合并真实学科。课程/方向计数全部由真实
 *  数据现算,不写死。色板取万象学院调色。
 *  resolver:assets/app.js 的 catDisciplines() / catCount()。
 * ============================================================= */
window.STUDY_CATEGORIES = [
  { key: "natural",   name: "自然科学", en: "Natural Sciences", color: "#C8852E", icon: "🔬",
    from: { intl: ["Natural Sciences"], cn: ["07 理学"] } },
  { key: "formal",    name: "形式科学", en: "Formal Sciences", color: "#6E7A4F", icon: "📐",
    from: { intl: ["Formal Sciences"], cnIds: ["math", "statistics", "cs", "systems-sci"] } },
  { key: "social",    name: "社会科学", en: "Social Sciences", color: "#B6532F", icon: "⚖️",
    from: { intl: ["Social Sciences"], cn: ["02 经济学", "03 法学"] } },
  { key: "humanities", name: "人文学科", en: "Humanities", color: "#9c7a3d", icon: "📜",
    from: { intl: ["Humanities"], cn: ["01 哲学", "05 文学", "06 历史学"] } },
  { key: "applied",   name: "应用科学", en: "Applied Sciences", color: "#5e6b6e", icon: "⚙️",
    from: { intl: ["Engineering & Technology", "Professions & Applied"], cn: ["08 工学", "10 医学", "12 管理学", "04 教育学", "14 交叉学科"] } },
  { key: "arts",      name: "艺术",     en: "The Arts", color: "#C8852E", icon: "🎨",
    from: { cn: ["13 艺术学"] } },
  { key: "realworld", name: "现实 · 社会大学", en: "Real-World", color: "#B6532F", icon: "💼",
    from: { custom: true } }
];

/* ---------- 学习者(用户)种子 ----------
 *  多用户:轻量「选用户」无密码。这里是开箱档案;新用户由 app 写入
 *  localStorage(Phase1)/ PostgreSQL(Phase2),与此合并。
 *  字段对齐 PROFILES,额外可加 blurb;key 供 ?user= 与数据命名空间。
 */
window.STUDY_USERS = Object.keys(window.STUDY_PROFILES).map(function (k) {
  var p = window.STUDY_PROFILES[k];
  return { key: k, name: p.name, icon: p.icon, color: p.color, blurb: p.desc,
           subjects: p.subjects, showQuiz: p.showQuiz, seed: true };
});
