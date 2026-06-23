/* =============================================================
 *  学习中心 · 知识点清单 (catalog)
 * -------------------------------------------------------------
 *  这是整个网站的"数据库"。首页和每个知识点页面都读取它。
 *
 *  ▶ 每当新增一个知识点，只需：
 *    1) 在 subjects/<科目>/ 下新建一个 .html 页面
 *    2) 在下面的 STUDY_CATALOG 数组里加一条记录
 *  首页会自动把它归类、统计、生成搜索和关联链接。
 *
 *  字段说明见文件末尾。
 * ============================================================= */

/* ---------- 科目定义（决定首页分区、颜色、图标） ---------- */
window.STUDY_SUBJECTS = {
  chinese:   { name: "语文",   color: "#e2524a", icon: "📖" },
  math:      { name: "数学",   color: "#3b6fe0", icon: "📐" },
  english:   { name: "英语",   color: "#16a085", icon: "🔤" },
  physics:   { name: "物理",   color: "#8e44ad", icon: "⚛️" },
  chemistry: { name: "化学",   color: "#e67e22", icon: "🧪" },
  biology:   { name: "生物",   color: "#27ae60", icon: "🧬" },
  politics:  { name: "政治",   color: "#c0392b", icon: "⚖️" },
  history:   { name: "历史",   color: "#a0522d", icon: "📜" },
  geography: { name: "地理",   color: "#2980b9", icon: "🌏" },
  methods:   { name: "学习方法", color: "#607d8b", icon: "🧠" }
};

/* ---------- 知识点清单 ---------- */
window.STUDY_CATALOG = [
  {
    id: "math-quadratic-functions",
    subject: "math",
    category: "函数",
    title: "二次函数与图象",
    path: "subjects/math/quadratic-functions.html",
    summary: "用滑块实时改变 a、b、c，观察抛物线的开口、顶点、对称轴与零点；配方法、顶点式与图象平移一次讲清。",
    tags: ["函数", "抛物线", "配方法", "顶点", "最值", "可交互"],
    date: "2026-06-23",
    difficulty: 2,
    type: "交互",
    related: []
  },
  {
    id: "methods-how-to-use",
    subject: "methods",
    category: "使用指南",
    title: "如何使用这个学习中心",
    path: "subjects/methods/how-to-use.html",
    summary: "本站怎么组织、怎么复习、提问后会生成什么样的内容，以及如何长期积累成自己的知识库。",
    tags: ["指南", "复习方法", "知识管理"],
    date: "2026-06-23",
    difficulty: 1,
    type: "文档",
    related: []
  }
];

/* =============================================================
 *  字段说明（给以后维护看的）
 * -------------------------------------------------------------
 *  id        唯一标识，建议 "<科目>-<英文短名>"，用于关联引用 related
 *  subject   科目 key，必须是 STUDY_SUBJECTS 里的键
 *  category  二级分类（中文），同科目下相同 category 会归到一组
 *  title     标题（中文）
 *  path      相对站点根目录的 HTML 路径
 *  summary   一句话简介，显示在卡片上、也用于搜索
 *  tags      标签数组，用于搜索和归纳
 *  date      创建/更新日期 YYYY-MM-DD，用于"最近更新"排序
 *  difficulty 难度 1~3（1 基础 / 2 进阶 / 3 拔高）
 *  type      类型："交互" / "文档" / "例题" / "网页" / "笔记"
 *  related   关联知识点的 id 数组，会在页面底部自动生成互链
 * ============================================================= */
