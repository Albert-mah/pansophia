/* =============================================================
 *  学习中心 · 学科总目录 (DISCIPLINES) —— 可浏览的"知识库一/二阶索引"
 * -------------------------------------------------------------
 *  一阶 = 门类(t1)，二阶 = 学科(items)。用户在「知识库」里浏览，
 *  点「＋加入我的空间」把学科加进自己的档案(存 localStorage)，
 *  加进来多半是空的 → 首页显示「🌱 待补充」并提示和 AI 导师讨论补全学习计划，
 *  之后边学边把考点/讲解慢慢填上(懒加载)。
 *
 *  骨架参考：中国《研究生教育学科专业目录》14 门类 + 主要一级学科，
 *  外加「现实学科·社会大学」(非传统但真实有用的知识)。**不求穷尽，可扩**。
 *
 *  item: { id 唯一(能对上 STUDY_SUBJECTS 的就复用其 key 以便挂内容),
 *          name 名称, subject?(对应已有学科,用于挂检测/大纲), note?(一句话) }
 * ============================================================= */
window.STUDY_DISCIPLINES = [
  { t1: "理学", icon: "🔬", items: [
    { id: "math", name: "数学", subject: "math" },
    { id: "physics", name: "物理学", subject: "physics" },
    { id: "chemistry", name: "化学", subject: "chemistry" },
    { id: "biology", name: "生物学", subject: "biology" },
    { id: "astronomy", name: "天文学" }, { id: "geography-sci", name: "地理学" },
    { id: "geology", name: "地质学" }, { id: "statistics", name: "统计学" },
    { id: "ecology", name: "生态学" }, { id: "systems-sci", name: "系统科学" }
  ] },
  { t1: "工学", icon: "⚙️", items: [
    { id: "cs", name: "计算机科学与技术", note: "编程/算法/系统" },
    { id: "software", name: "软件工程" },
    { id: "eecs", name: "电子科学与技术", subject: "eecs" },
    { id: "ict", name: "信息与通信工程" }, { id: "control", name: "控制科学与工程" },
    { id: "ai", name: "人工智能" }, { id: "cybersec", name: "网络空间安全" },
    { id: "ee-power", name: "电气工程" }, { id: "mechanical", name: "机械工程" },
    { id: "materials", name: "材料科学与工程" }, { id: "civil", name: "土木工程" },
    { id: "architecture", name: "建筑学" }, { id: "aerospace", name: "航空航天" },
    { id: "chem-eng", name: "化学工程" }, { id: "environ", name: "环境科学与工程" },
    { id: "biomed-eng", name: "生物医学工程" }, { id: "ic", name: "集成电路" }
  ] },
  { t1: "哲学", icon: "🧠", items: [
    { id: "philosophy", name: "哲学" }, { id: "logic", name: "逻辑学" },
    { id: "ethics", name: "伦理学" }, { id: "aesthetics", name: "美学" }, { id: "religion", name: "宗教学" }
  ] },
  { t1: "经济学", icon: "💰", items: [
    { id: "econ-theory", name: "理论经济学" }, { id: "econ-applied", name: "应用经济学" },
    { id: "finance", name: "金融学" }, { id: "accounting", name: "会计学" }
  ] },
  { t1: "法学 / 社科", icon: "⚖️", items: [
    { id: "law", name: "法学" }, { id: "politics-sci", name: "政治学" },
    { id: "sociology", name: "社会学" }, { id: "marxism", name: "马克思主义理论" }, { id: "ir", name: "国际关系" }
  ] },
  { t1: "教育学 / 心理", icon: "🎓", items: [
    { id: "education", name: "教育学" }, { id: "psychology", name: "心理学" }, { id: "pe", name: "体育学" }
  ] },
  { t1: "文学 / 语言", icon: "📖", items: [
    { id: "chinese-lit", name: "中国语言文学", subject: "chinese" },
    { id: "english", name: "英语", subject: "english" },
    { id: "japanese", name: "日语", subject: "japanese" },
    { id: "linguistics", name: "语言学" }, { id: "journalism", name: "新闻传播学" }
  ] },
  { t1: "历史学", icon: "📜", items: [
    { id: "archaeology", name: "考古学" }, { id: "china-history", name: "中国史" }, { id: "world-history", name: "世界史" }
  ] },
  { t1: "医学 / 农学", icon: "🩺", items: [
    { id: "clinical-med", name: "临床医学" }, { id: "basic-med", name: "基础医学" },
    { id: "tcm", name: "中医学" }, { id: "pharmacy", name: "药学" },
    { id: "public-health", name: "公共卫生" }, { id: "agronomy", name: "农学" }
  ] },
  { t1: "管理学", icon: "📊", items: [
    { id: "mgmt-sci", name: "管理科学与工程" }, { id: "business", name: "工商管理" },
    { id: "public-admin", name: "公共管理" }, { id: "lib-info", name: "图书情报与数据管理" }
  ] },
  { t1: "艺术学", icon: "🎨", items: [
    { id: "music", name: "音乐" }, { id: "fine-arts", name: "美术" }, { id: "design", name: "设计学" },
    { id: "film-tv", name: "戏剧与影视" }, { id: "dance", name: "舞蹈" }
  ] },
  { t1: "交叉学科", icon: "🧬", items: [
    { id: "data-sci", name: "数据科学" }, { id: "cog-sci", name: "认知科学" },
    { id: "intelligent-sci", name: "智能科学与技术" }, { id: "area-studies", name: "区域国别学" }
  ] },

  /* ===== 现实学科 · 社会大学（非传统但真实有用，自定义可加） ===== */
  { t1: "现实学科 · 社会大学", icon: "🌍", custom: true, items: [
    { id: "career", name: "职业发展", note: "求职/简历/面试/晋升" },
    { id: "entrepreneur", name: "创业与副业", note: "兼职、做项目、变现" },
    { id: "personal-finance", name: "个人理财", note: "记账/投资/保险" },
    { id: "productivity", name: "时间与效率", note: "GTD/精力管理" },
    { id: "communication", name: "沟通与表达", note: "写作/演讲/谈判" },
    { id: "ai-tools", name: "AI 工具实操", note: "用 AI 干活的方法" },
    { id: "health", name: "身心健康", note: "运动/营养/睡眠/情绪" },
    { id: "life-skills", name: "生活技能", note: "做饭/维修/办事" },
    { id: "learning-how", name: "学习方法论", note: "怎么学得更快" }
  ] }
];
