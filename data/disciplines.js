/* =============================================================
 *  学习中心 · 学科总目录 (DISCIPLINES) —— 可浏览的"知识库一/二阶索引"
 * -------------------------------------------------------------
 *  一阶 = 门类(t1)，二阶 = 一级学科(items)。是 AI 生成内容的"地基/校准"，
 *  所以力求**正确、完整**：
 *   · 国内：国务院学位委员会/教育部《研究生教育学科专业目录(2022)》
 *           14 门类 + 全部一级学科（自 2023 起实施）。
 *   · 国际：Wikipedia「Outline of academic disciplines」对齐英文名/补充常见学科。
 *  再加「现实学科 · 社会大学」（非传统但真实有用的知识，自定义可加）。
 *
 *  浏览(library.html) → 「＋加入我的空间」(localStorage) → 首页「我的学科」
 *  空的标 🌱待补充并提示和 AI 导师讨论补全学习计划，边学边填（懒加载）。
 *
 *  item: { id 唯一, name 中文名, en 英文名, subject?(对上 STUDY_SUBJECTS 才挂内容), note? }
 * ============================================================= */
window.STUDY_DISCIPLINES = [
  { t1: "01 哲学", icon: "🧠", items: [
    { id: "philosophy", name: "哲学", en: "Philosophy" }
  ] },
  { t1: "02 经济学", icon: "💰", items: [
    { id: "econ-theory", name: "理论经济学", en: "Theoretical Economics" },
    { id: "econ-applied", name: "应用经济学", en: "Applied Economics", note: "含金融、国贸、财政" }
  ] },
  { t1: "03 法学", icon: "⚖️", items: [
    { id: "law", name: "法学", en: "Law" },
    { id: "politics-sci", name: "政治学", en: "Political Science" },
    { id: "sociology", name: "社会学", en: "Sociology" },
    { id: "ethnology", name: "民族学", en: "Ethnology" },
    { id: "marxism", name: "马克思主义理论", en: "Marxist Theory" },
    { id: "public-security-st", name: "公安学", en: "Public Security Studies" },
    { id: "cpc-history", name: "中共党史党建学", en: "CPC History & Party Building" },
    { id: "discipline-insp", name: "纪检监察学", en: "Discipline Inspection & Supervision" }
  ] },
  { t1: "04 教育学", icon: "🎓", items: [
    { id: "education", name: "教育学", en: "Education" },
    { id: "psychology", name: "心理学", en: "Psychology", subject: "psychology" },
    { id: "pe", name: "体育学", en: "Sport Science" }
  ] },
  { t1: "05 文学 / 语言", icon: "📖", items: [
    { id: "chinese-lit", name: "中国语言文学", en: "Chinese Language & Literature", subject: "chinese" },
    { id: "foreign-lit", name: "外国语言文学", en: "Foreign Languages & Literatures", note: "含英语、日语等" },
    { id: "journalism", name: "新闻传播学", en: "Journalism & Communication" }
  ] },
  { t1: "06 历史学", icon: "📜", items: [
    { id: "archaeology", name: "考古学", en: "Archaeology" },
    { id: "china-history", name: "中国史", en: "Chinese History" },
    { id: "world-history", name: "世界史", en: "World History" }
  ] },
  { t1: "07 理学", icon: "🔬", items: [
    { id: "math", name: "数学", en: "Mathematics", subject: "math" },
    { id: "physics", name: "物理学", en: "Physics", subject: "physics" },
    { id: "chemistry", name: "化学", en: "Chemistry", subject: "chemistry" },
    { id: "astronomy", name: "天文学", en: "Astronomy" },
    { id: "geography-sci", name: "地理学", en: "Geography" },
    { id: "atmospheric-sci", name: "大气科学", en: "Atmospheric Science" },
    { id: "ocean-sci", name: "海洋科学", en: "Oceanography" },
    { id: "geophysics", name: "地球物理学", en: "Geophysics" },
    { id: "geology", name: "地质学", en: "Geology" },
    { id: "biology", name: "生物学", en: "Biology", subject: "biology" },
    { id: "systems-sci", name: "系统科学", en: "Systems Science" },
    { id: "hist-sci-tech", name: "科学技术史", en: "History of Science & Technology" },
    { id: "ecology", name: "生态学", en: "Ecology" },
    { id: "statistics", name: "统计学", en: "Statistics" }
  ] },
  { t1: "08 工学", icon: "⚙️", items: [
    { id: "mechanics", name: "力学", en: "Mechanics" },
    { id: "mechanical", name: "机械工程", en: "Mechanical Engineering" },
    { id: "optical-eng", name: "光学工程", en: "Optical Engineering" },
    { id: "instrument", name: "仪器科学与技术", en: "Instrument Science & Technology" },
    { id: "materials", name: "材料科学与工程", en: "Materials Science & Engineering" },
    { id: "metallurgy", name: "冶金工程", en: "Metallurgical Engineering" },
    { id: "power-eng", name: "动力工程及工程热物理", en: "Power Engineering & Thermophysics" },
    { id: "electrical", name: "电气工程", en: "Electrical Engineering" },
    { id: "eecs", name: "电子科学与技术", en: "Electronic Science & Technology", subject: "eecs" },
    { id: "ict", name: "信息与通信工程", en: "Information & Communication Engineering" },
    { id: "control", name: "控制科学与工程", en: "Control Science & Engineering" },
    { id: "cs", name: "计算机科学与技术", en: "Computer Science & Technology", note: "编程/算法/系统/AI" },
    { id: "architecture", name: "建筑学", en: "Architecture" },
    { id: "civil", name: "土木工程", en: "Civil Engineering" },
    { id: "hydraulic", name: "水利工程", en: "Hydraulic Engineering" },
    { id: "surveying", name: "测绘科学与技术", en: "Surveying & Mapping" },
    { id: "chem-eng", name: "化学工程与技术", en: "Chemical Engineering & Technology" },
    { id: "geo-resources", name: "地质资源与地质工程", en: "Geological Resources & Engineering" },
    { id: "mining", name: "矿业工程", en: "Mining Engineering" },
    { id: "petroleum", name: "石油与天然气工程", en: "Oil & Gas Engineering" },
    { id: "textile", name: "纺织科学与工程", en: "Textile Science & Engineering" },
    { id: "light-industry", name: "轻工技术与工程", en: "Light Industry Technology" },
    { id: "transport-eng", name: "交通运输工程", en: "Transportation Engineering" },
    { id: "naval", name: "船舶与海洋工程", en: "Naval Architecture & Ocean Engineering" },
    { id: "aerospace", name: "航空宇航科学与技术", en: "Aeronautics & Astronautics" },
    { id: "ordnance", name: "兵器科学与技术", en: "Armament Science & Technology" },
    { id: "nuclear", name: "核科学与技术", en: "Nuclear Science & Technology" },
    { id: "agri-eng", name: "农业工程", en: "Agricultural Engineering" },
    { id: "forestry-eng", name: "林业工程", en: "Forestry Engineering" },
    { id: "environ-eng", name: "环境科学与工程", en: "Environmental Science & Engineering" },
    { id: "biomed-eng", name: "生物医学工程", en: "Biomedical Engineering" },
    { id: "food-eng", name: "食品科学与工程", en: "Food Science & Engineering" },
    { id: "urban-planning", name: "城乡规划学", en: "Urban & Rural Planning" },
    { id: "software", name: "软件工程", en: "Software Engineering" },
    { id: "bioeng", name: "生物工程", en: "Bioengineering" },
    { id: "safety-eng", name: "安全科学与工程", en: "Safety Science & Engineering" },
    { id: "security-tech", name: "公安技术", en: "Public Security Technology" },
    { id: "cybersec", name: "网络空间安全", en: "Cyberspace Security" }
  ] },
  { t1: "09 农学", icon: "🌾", items: [
    { id: "crop-sci", name: "作物学", en: "Crop Science" },
    { id: "horticulture", name: "园艺学", en: "Horticulture" },
    { id: "agri-resources", name: "农业资源与环境", en: "Agricultural Resources & Environment" },
    { id: "plant-protection", name: "植物保护", en: "Plant Protection" },
    { id: "animal-husbandry", name: "畜牧学", en: "Animal Science" },
    { id: "veterinary", name: "兽医学", en: "Veterinary Medicine" },
    { id: "forestry", name: "林学", en: "Forestry" },
    { id: "fishery", name: "水产", en: "Fisheries" },
    { id: "grassland", name: "草学", en: "Grassland Science" },
    { id: "soil-water", name: "水土保持与荒漠化防治学", en: "Soil & Water Conservation" }
  ] },
  { t1: "10 医学", icon: "🩺", items: [
    { id: "basic-med", name: "基础医学", en: "Basic Medicine" },
    { id: "clinical-med", name: "临床医学", en: "Clinical Medicine" },
    { id: "stomatology", name: "口腔医学", en: "Stomatology" },
    { id: "public-health", name: "公共卫生与预防医学", en: "Public Health & Preventive Medicine" },
    { id: "tcm", name: "中医学", en: "Traditional Chinese Medicine" },
    { id: "integrated-med", name: "中西医结合", en: "Integrated TCM & Western Medicine" },
    { id: "pharmacy", name: "药学", en: "Pharmacy" },
    { id: "tcm-pharmacy", name: "中药学", en: "Chinese Materia Medica" },
    { id: "special-med", name: "特种医学", en: "Special Medicine" },
    { id: "nursing", name: "护理学", en: "Nursing" },
    { id: "forensic-med", name: "法医学", en: "Forensic Medicine" }
  ] },
  { t1: "11 军事学", icon: "🎖️", items: [
    { id: "military-thought", name: "军事思想与军事历史", en: "Military Thought & History" },
    { id: "strategy", name: "战略学", en: "Strategy" },
    { id: "joint-ops", name: "联合作战学", en: "Joint Operations" },
    { id: "service-ops", name: "军兵种作战学", en: "Service & Arms Operations" },
    { id: "command", name: "军队指挥学", en: "Military Command" },
    { id: "political-work", name: "军队政治工作学", en: "Military Political Work" },
    { id: "mil-logistics", name: "军事后勤学", en: "Military Logistics" },
    { id: "mil-equipment", name: "军事装备学", en: "Military Equipment" },
    { id: "mil-mgmt", name: "军事管理学", en: "Military Management" },
    { id: "mil-training", name: "军事训练学", en: "Military Training" },
    { id: "mil-intelligence", name: "军事智能", en: "Military Intelligence (AI)" }
  ] },
  { t1: "12 管理学", icon: "📊", items: [
    { id: "mgmt-sci", name: "管理科学与工程", en: "Management Science & Engineering" },
    { id: "business", name: "工商管理学", en: "Business Administration" },
    { id: "agri-econ-mgmt", name: "农林经济管理", en: "Agricultural & Forestry Economics & Management" },
    { id: "public-admin", name: "公共管理学", en: "Public Administration" },
    { id: "info-resource-mgmt", name: "信息资源管理", en: "Information Resource Management" }
  ] },
  { t1: "13 艺术学", icon: "🎨", items: [
    { id: "art-studies", name: "艺术学", en: "Art Studies (general)" },
    { id: "music", name: "音乐", en: "Music" },
    { id: "fine-arts", name: "美术", en: "Fine Arts" },
    { id: "film-tv", name: "戏剧与影视", en: "Drama, Film & Television" },
    { id: "dance", name: "舞蹈", en: "Dance" }
  ] },
  { t1: "14 交叉学科", icon: "🧬", items: [
    { id: "ic", name: "集成电路科学与工程", en: "Integrated Circuit Science & Engineering" },
    { id: "national-security", name: "国家安全学", en: "National Security Studies" },
    { id: "design", name: "设计学", en: "Design" },
    { id: "remote-sensing", name: "遥感科学与技术", en: "Remote Sensing Science & Technology" },
    { id: "intelligent-sci", name: "智能科学与技术", en: "Intelligent Science & Technology", note: "AI / 认知" },
    { id: "nano", name: "纳米科学与工程", en: "Nano Science & Engineering" },
    { id: "area-studies", name: "区域国别学", en: "Area Studies" }
  ] },

  /* ===== 现实学科 · 社会大学（非传统但真实有用，自定义可加） ===== */
  { t1: "现实学科 · 社会大学", icon: "🌍", custom: true, items: [
    { id: "career", name: "职业发展", en: "Career", note: "求职/简历/面试/晋升" },
    { id: "entrepreneur", name: "创业与副业", en: "Entrepreneurship", note: "兼职/做项目/变现" },
    { id: "personal-finance", name: "个人理财", en: "Personal Finance", note: "记账/投资/保险" },
    { id: "productivity", name: "时间与效率", en: "Productivity", note: "GTD/精力管理" },
    { id: "communication", name: "沟通与表达", en: "Communication", note: "写作/演讲/谈判" },
    { id: "ai-tools", name: "AI 工具实操", en: "AI Tools", note: "用 AI 干活的方法" },
    { id: "health", name: "身心健康", en: "Health & Wellbeing", note: "运动/营养/睡眠/情绪" },
    { id: "life-skills", name: "生活技能", en: "Life Skills", note: "做饭/维修/办事" },
    { id: "learning-how", name: "学习方法论", en: "Learning How to Learn", note: "怎么学得更快" }
  ] }
];
