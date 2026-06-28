/* =============================================================
 *  学习中心 · 学科总目录 (DISCIPLINES) —— 可浏览的"知识库索引"
 * -------------------------------------------------------------
 *  三级：门类(t1) → 一级学科(items) → 二级方向(item.sub)。
 *  是 AI 生成内容的"地基/校准"，力求正确：
 *   · 门类 + 一级学科：国务院学位委员会/教育部《研究生教育学科专业目录(2022)》14 门类。
 *   · 二级方向(sub)：参考 1997 版研究生目录的二级学科 + 学科通行结构整理
 *     （2011/2022 已取消中央统一二级学科，改由各校自设；GB/T 13745 二级共676但顶层为5门类、
 *      与教育部14门类对不齐）。故 sub 为"主要二级方向"，主流学科较全、冷门从略，**可扩**。
 *   · 国际：Wikipedia「Outline of academic disciplines」对齐英文名(en)。
 *
 *  浏览(library.html) → 「＋加入我的空间」(localStorage) → 首页「我的学科」/「考点大纲」
 *  空的标 🌱待补充并提示和 AI 导师讨论补全，边学边填（懒加载）。
 *
 *  item: { id, name 中文, en 英文, sub?[二级方向], subject?(对上学科才挂内容), note? }
 * ============================================================= */
window.STUDY_DISCIPLINES = [
  { t1: "01 哲学", icon: "🧠", items: [
    { id: "philosophy", name: "哲学", en: "Philosophy", sub: ["马克思主义哲学", "中国哲学", "外国哲学", "逻辑学", "伦理学", "美学", "宗教学", "科学技术哲学"] }
  ] },
  { t1: "02 经济学", icon: "💰", items: [
    { id: "econ-theory", name: "理论经济学", en: "Theoretical Economics", sub: ["政治经济学", "西方经济学", "经济史", "经济思想史", "世界经济", "人口资源与环境经济学"] },
    { id: "econ-applied", name: "应用经济学", en: "Applied Economics", sub: ["金融学", "国际贸易学", "财政学", "产业经济学", "数量经济学", "区域经济学", "劳动经济学", "统计学"] }
  ] },
  { t1: "03 法学", icon: "⚖️", items: [
    { id: "law", name: "法学", en: "Law", sub: ["法理学", "宪法与行政法学", "刑法学", "民商法学", "经济法学", "诉讼法学", "国际法学", "环境与资源保护法学"] },
    { id: "politics-sci", name: "政治学", en: "Political Science", sub: ["政治学理论", "中外政治制度", "国际政治", "国际关系", "外交学"] },
    { id: "sociology", name: "社会学", en: "Sociology", sub: ["社会学", "人口学", "人类学", "民俗学", "社会工作"] },
    { id: "ethnology", name: "民族学", en: "Ethnology", sub: ["民族学", "马克思主义民族理论与政策", "中国少数民族史", "中国少数民族经济"] },
    { id: "marxism", name: "马克思主义理论", en: "Marxist Theory", sub: ["马克思主义基本原理", "马克思主义发展史", "马克思主义中国化", "思想政治教育", "中国近现代史基本问题"] },
    { id: "public-security-st", name: "公安学", en: "Public Security Studies", sub: ["治安学", "侦查学", "公安情报学", "边防管理"] },
    { id: "cpc-history", name: "中共党史党建学", en: "CPC History & Party Building", sub: ["中共党史", "党的建设"] },
    { id: "discipline-insp", name: "纪检监察学", en: "Discipline Inspection & Supervision" }
  ] },
  { t1: "04 教育学", icon: "🎓", items: [
    { id: "education", name: "教育学", en: "Education", sub: ["教育学原理", "课程与教学论", "教育史", "比较教育学", "学前教育学", "高等教育学", "职业技术教育学", "教育技术学"] },
    { id: "psychology", name: "心理学", en: "Psychology", subject: "psychology", sub: ["普通心理学", "认知心理学", "发展心理学", "社会心理学", "人格心理学", "生理/认知神经科学", "临床与咨询心理学", "教育心理学", "工业与组织(I-O)", "健康心理学", "心理测量与统计"] },
    { id: "pe", name: "体育学", en: "Sport Science", sub: ["体育教育训练学", "运动人体科学", "体育人文社会学", "民族传统体育学"] }
  ] },
  { t1: "05 文学 / 语言", icon: "📖", items: [
    { id: "chinese-lit", name: "中国语言文学", en: "Chinese Language & Literature", subject: "chinese", sub: ["文艺学", "语言学及应用语言学", "汉语言文字学", "中国古典文献学", "中国古代文学", "中国现当代文学", "比较文学与世界文学"] },
    { id: "foreign-lit", name: "外国语言文学", en: "Foreign Languages & Literatures", sub: ["英语语言文学", "日语语言文学", "俄语", "法语", "德语", "外国语言学及应用语言学", "翻译学"] },
    { id: "journalism", name: "新闻传播学", en: "Journalism & Communication", sub: ["新闻学", "传播学", "广播电视", "广告学"] }
  ] },
  { t1: "06 历史学", icon: "📜", items: [
    { id: "archaeology", name: "考古学", en: "Archaeology", sub: ["考古学", "博物馆学", "文物保护"] },
    { id: "china-history", name: "中国史", en: "Chinese History", sub: ["中国古代史", "中国近现代史", "史学理论及史学史", "历史地理学", "专门史"] },
    { id: "world-history", name: "世界史", en: "World History", sub: ["世界古代史", "世界近现代史", "地区国别史"] }
  ] },
  { t1: "07 理学", icon: "🔬", items: [
    { id: "math", name: "数学", en: "Mathematics", subject: "math", sub: ["基础数学", "计算数学", "概率论与数理统计", "应用数学", "运筹学与控制论"] },
    { id: "physics", name: "物理学", en: "Physics", subject: "physics", sub: ["理论物理", "粒子物理与原子核物理", "凝聚态物理", "光学", "声学", "原子分子物理", "等离子体物理"] },
    { id: "chemistry", name: "化学", en: "Chemistry", subject: "chemistry", sub: ["无机化学", "分析化学", "有机化学", "物理化学", "高分子化学与物理"] },
    { id: "astronomy", name: "天文学", en: "Astronomy", sub: ["天体物理", "天体测量与天体力学"] },
    { id: "geography-sci", name: "地理学", en: "Geography", sub: ["自然地理学", "人文地理学", "地图学与地理信息系统(GIS)"] },
    { id: "atmospheric-sci", name: "大气科学", en: "Atmospheric Science", sub: ["气象学", "大气物理学与大气环境"] },
    { id: "ocean-sci", name: "海洋科学", en: "Oceanography", sub: ["物理海洋学", "海洋化学", "海洋生物学", "海洋地质学"] },
    { id: "geophysics", name: "地球物理学", en: "Geophysics", sub: ["固体地球物理学", "空间物理学"] },
    { id: "geology", name: "地质学", en: "Geology", sub: ["矿物岩石矿床学", "地球化学", "古生物学与地层学", "构造地质学", "第四纪地质学"] },
    { id: "biology", name: "生物学", en: "Biology", subject: "biology", sub: ["植物学", "动物学", "微生物学", "生理学", "遗传学", "细胞生物学", "生物化学与分子生物学", "神经生物学", "生态学"] },
    { id: "systems-sci", name: "系统科学", en: "Systems Science", sub: ["系统理论", "系统分析与集成"] },
    { id: "hist-sci-tech", name: "科学技术史", en: "History of Science & Technology", sub: ["科学史", "技术史"] },
    { id: "ecology", name: "生态学", en: "Ecology" },
    { id: "statistics", name: "统计学", en: "Statistics", sub: ["数理统计", "应用统计"] }
  ] },
  { t1: "08 工学", icon: "⚙️", items: [
    { id: "mechanics", name: "力学", en: "Mechanics", sub: ["一般力学与力学基础", "固体力学", "流体力学", "工程力学"] },
    { id: "mechanical", name: "机械工程", en: "Mechanical Engineering", sub: ["机械制造及其自动化", "机械电子工程", "机械设计及理论", "车辆工程"] },
    { id: "optical-eng", name: "光学工程", en: "Optical Engineering" },
    { id: "instrument", name: "仪器科学与技术", en: "Instrument Science & Technology", sub: ["精密仪器及机械", "测试计量技术及仪器"] },
    { id: "materials", name: "材料科学与工程", en: "Materials Science & Engineering", sub: ["材料物理与化学", "材料学", "材料加工工程"] },
    { id: "metallurgy", name: "冶金工程", en: "Metallurgical Engineering", sub: ["冶金物理化学", "钢铁冶金", "有色金属冶金"] },
    { id: "power-eng", name: "动力工程及工程热物理", en: "Power Engineering & Thermophysics", sub: ["工程热物理", "热能工程", "动力机械及工程", "流体机械", "制冷及低温工程"] },
    { id: "electrical", name: "电气工程", en: "Electrical Engineering", sub: ["电机与电器", "电力系统及其自动化", "高电压与绝缘技术", "电力电子与电力传动", "电工理论与新技术"] },
    { id: "eecs", name: "电子科学与技术", en: "Electronic Science & Technology", subject: "eecs", sub: ["物理电子学", "电路与系统", "微电子学与固体电子学", "电磁场与微波技术"] },
    { id: "ict", name: "信息与通信工程", en: "Information & Communication Engineering", sub: ["通信与信息系统", "信号与信息处理"] },
    { id: "control", name: "控制科学与工程", en: "Control Science & Engineering", sub: ["控制理论与控制工程", "检测技术与自动化装置", "系统工程", "模式识别与智能系统", "导航制导与控制"] },
    { id: "cs", name: "计算机科学与技术", en: "Computer Science & Technology", sub: ["计算机系统结构", "计算机软件与理论", "计算机应用技术", "数据科学", "人工智能"] },
    { id: "architecture", name: "建筑学", en: "Architecture", sub: ["建筑历史与理论", "建筑设计及其理论", "建筑技术科学", "城市设计"] },
    { id: "civil", name: "土木工程", en: "Civil Engineering", sub: ["岩土工程", "结构工程", "市政工程", "供热供燃气通风及空调工程", "防灾减灾工程", "桥梁与隧道工程"] },
    { id: "hydraulic", name: "水利工程", en: "Hydraulic Engineering", sub: ["水文学及水资源", "水力学及河流动力学", "水工结构工程", "水利水电工程", "港口海岸及近海工程"] },
    { id: "surveying", name: "测绘科学与技术", en: "Surveying & Mapping", sub: ["大地测量学", "摄影测量与遥感", "地图制图学与地理信息工程"] },
    { id: "chem-eng", name: "化学工程与技术", en: "Chemical Engineering & Technology", sub: ["化学工程", "化学工艺", "生物化工", "应用化学", "工业催化"] },
    { id: "geo-resources", name: "地质资源与地质工程", en: "Geological Resources & Engineering", sub: ["矿产普查与勘探", "地球探测与信息技术", "地质工程"] },
    { id: "mining", name: "矿业工程", en: "Mining Engineering", sub: ["采矿工程", "矿物加工工程", "安全技术及工程"] },
    { id: "petroleum", name: "石油与天然气工程", en: "Oil & Gas Engineering", sub: ["油气井工程", "油气田开发工程", "油气储运工程"] },
    { id: "textile", name: "纺织科学与工程", en: "Textile Science & Engineering", sub: ["纺织工程", "纺织材料与纺织品设计", "纺织化学与染整工程", "服装设计与工程"] },
    { id: "light-industry", name: "轻工技术与工程", en: "Light Industry Technology", sub: ["制浆造纸工程", "制糖工程", "发酵工程", "皮革化学与工程"] },
    { id: "transport-eng", name: "交通运输工程", en: "Transportation Engineering", sub: ["道路与铁道工程", "交通信息工程及控制", "交通运输规划与管理", "载运工具运用工程"] },
    { id: "naval", name: "船舶与海洋工程", en: "Naval Architecture & Ocean Engineering", sub: ["船舶与海洋结构物设计制造", "轮机工程", "水声工程"] },
    { id: "aerospace", name: "航空宇航科学与技术", en: "Aeronautics & Astronautics", sub: ["飞行器设计", "航空宇航推进理论与工程", "航空宇航制造工程", "人机与环境工程"] },
    { id: "ordnance", name: "兵器科学与技术", en: "Armament Science & Technology", sub: ["武器系统与运用工程", "兵器发射理论与技术", "火炮自动武器与弹药工程"] },
    { id: "nuclear", name: "核科学与技术", en: "Nuclear Science & Technology", sub: ["核能科学与工程", "核燃料循环与材料", "核技术及应用", "辐射防护及环境保护"] },
    { id: "agri-eng", name: "农业工程", en: "Agricultural Engineering", sub: ["农业机械化工程", "农业水土工程", "农业生物环境与能源工程", "农业电气化与自动化"] },
    { id: "forestry-eng", name: "林业工程", en: "Forestry Engineering", sub: ["森林工程", "木材科学与技术", "林产化学加工工程"] },
    { id: "environ-eng", name: "环境科学与工程", en: "Environmental Science & Engineering", sub: ["环境科学", "环境工程"] },
    { id: "biomed-eng", name: "生物医学工程", en: "Biomedical Engineering" },
    { id: "food-eng", name: "食品科学与工程", en: "Food Science & Engineering", sub: ["食品科学", "粮食油脂及植物蛋白工程", "农产品加工及贮藏工程", "水产品加工及贮藏工程"] },
    { id: "urban-planning", name: "城乡规划学", en: "Urban & Rural Planning" },
    { id: "software", name: "软件工程", en: "Software Engineering", sub: ["软件工程理论与方法", "软件服务工程", "数据工程"] },
    { id: "bioeng", name: "生物工程", en: "Bioengineering" },
    { id: "safety-eng", name: "安全科学与工程", en: "Safety Science & Engineering" },
    { id: "security-tech", name: "公安技术", en: "Public Security Technology", sub: ["刑事科学技术", "安全防范工程"] },
    { id: "cybersec", name: "网络空间安全", en: "Cyberspace Security", sub: ["密码学", "网络安全", "系统安全", "数据安全"] }
  ] },
  { t1: "09 农学", icon: "🌾", items: [
    { id: "crop-sci", name: "作物学", en: "Crop Science", sub: ["作物栽培学与耕作学", "作物遗传育种"] },
    { id: "horticulture", name: "园艺学", en: "Horticulture", sub: ["果树学", "蔬菜学", "茶学"] },
    { id: "agri-resources", name: "农业资源与环境", en: "Agricultural Resources & Environment", sub: ["土壤学", "植物营养学"] },
    { id: "plant-protection", name: "植物保护", en: "Plant Protection", sub: ["植物病理学", "农业昆虫与害虫防治", "农药学"] },
    { id: "animal-husbandry", name: "畜牧学", en: "Animal Science", sub: ["动物遗传育种与繁殖", "动物营养与饲料科学", "草业科学"] },
    { id: "veterinary", name: "兽医学", en: "Veterinary Medicine", sub: ["基础兽医学", "预防兽医学", "临床兽医学"] },
    { id: "forestry", name: "林学", en: "Forestry", sub: ["林木遗传育种", "森林培育", "森林保护学", "园林植物与观赏园艺"] },
    { id: "fishery", name: "水产", en: "Fisheries", sub: ["水产养殖", "捕捞学", "渔业资源"] },
    { id: "grassland", name: "草学", en: "Grassland Science" },
    { id: "soil-water", name: "水土保持与荒漠化防治学", en: "Soil & Water Conservation" }
  ] },
  { t1: "10 医学", icon: "🩺", items: [
    { id: "basic-med", name: "基础医学", en: "Basic Medicine", sub: ["人体解剖与组织胚胎学", "免疫学", "病原生物学", "病理学与病理生理学", "生理学", "药理学"] },
    { id: "clinical-med", name: "临床医学", en: "Clinical Medicine", sub: ["内科学", "外科学", "儿科学", "妇产科学", "神经病学", "精神病与精神卫生学", "影像医学与核医学", "麻醉学", "急诊医学", "肿瘤学"] },
    { id: "stomatology", name: "口腔医学", en: "Stomatology", sub: ["口腔基础医学", "口腔临床医学"] },
    { id: "public-health", name: "公共卫生与预防医学", en: "Public Health & Preventive Medicine", sub: ["流行病与卫生统计学", "劳动卫生与环境卫生学", "营养与食品卫生学", "卫生毒理学", "儿少卫生与妇幼保健学"] },
    { id: "tcm", name: "中医学", en: "Traditional Chinese Medicine", sub: ["中医基础理论", "中医临床基础", "方剂学", "中医内科学", "针灸推拿学"] },
    { id: "integrated-med", name: "中西医结合", en: "Integrated TCM & Western Medicine", sub: ["中西医结合基础", "中西医结合临床"] },
    { id: "pharmacy", name: "药学", en: "Pharmacy", sub: ["药物化学", "药剂学", "生药学", "药物分析学", "药理学"] },
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
    { id: "mil-intelligence", name: "军事智能", en: "Military Intelligence" }
  ] },
  { t1: "12 管理学", icon: "📊", items: [
    { id: "mgmt-sci", name: "管理科学与工程", en: "Management Science & Engineering", sub: ["运筹与优化", "决策分析", "信息系统", "项目管理", "供应链管理"] },
    { id: "business", name: "工商管理学", en: "Business Administration", sub: ["会计学", "企业管理", "财务管理", "市场营销", "人力资源管理", "技术经济及管理", "旅游管理"] },
    { id: "agri-econ-mgmt", name: "农林经济管理", en: "Agri-Forestry Economics & Management", sub: ["农业经济管理", "林业经济管理"] },
    { id: "public-admin", name: "公共管理学", en: "Public Administration", sub: ["行政管理", "社会保障", "教育经济与管理", "土地资源管理", "社会医学与卫生事业管理"] },
    { id: "info-resource-mgmt", name: "信息资源管理", en: "Information Resource Management", sub: ["图书馆学", "情报学", "档案学", "数据管理"] }
  ] },
  { t1: "13 艺术学", icon: "🎨", items: [
    { id: "art-studies", name: "艺术学", en: "Art Studies (general)", sub: ["艺术学理论", "艺术史", "艺术管理"] },
    { id: "music", name: "音乐", en: "Music", sub: ["作曲", "表演", "音乐学", "音乐教育"] },
    { id: "fine-arts", name: "美术", en: "Fine Arts", sub: ["中国画", "油画", "版画", "雕塑", "美术史论"] },
    { id: "film-tv", name: "戏剧与影视", en: "Drama, Film & Television", sub: ["戏剧戏曲学", "电影学", "广播电视艺术学"] },
    { id: "dance", name: "舞蹈", en: "Dance", sub: ["舞蹈表演", "舞蹈编导", "舞蹈学"] }
  ] },
  { t1: "14 交叉学科", icon: "🧬", items: [
    { id: "ic", name: "集成电路科学与工程", en: "Integrated Circuit Science & Engineering", sub: ["集成电路设计", "集成电路制造与工艺", "EDA"] },
    { id: "national-security", name: "国家安全学", en: "National Security Studies" },
    { id: "design", name: "设计学", en: "Design", sub: ["工业设计", "视觉传达设计", "环境设计", "数字媒体设计", "服装与服饰设计"] },
    { id: "remote-sensing", name: "遥感科学与技术", en: "Remote Sensing Science & Technology" },
    { id: "intelligent-sci", name: "智能科学与技术", en: "Intelligent Science & Technology", sub: ["机器学习", "计算机视觉", "自然语言处理", "智能机器人", "知识工程"] },
    { id: "nano", name: "纳米科学与工程", en: "Nano Science & Engineering", sub: ["纳米材料", "纳米器件"] },
    { id: "area-studies", name: "区域国别学", en: "Area Studies" }
  ] },

  /* ===== 现实学科 · 社会大学（非传统但真实有用，自定义可加） ===== */
  { t1: "现实学科 · 社会大学", icon: "🌍", custom: true, items: [
    { id: "career", name: "职业发展", en: "Career", sub: ["简历", "面试", "职业规划", "晋升", "跳槽谈薪"] },
    { id: "entrepreneur", name: "创业与副业", en: "Entrepreneurship", sub: ["商业模式", "获客与增长", "产品", "财务", "法务"] },
    { id: "personal-finance", name: "个人理财", en: "Personal Finance", sub: ["记账与预算", "储蓄", "投资", "保险", "税务"] },
    { id: "productivity", name: "时间与效率", en: "Productivity", sub: ["GTD", "番茄钟", "精力管理", "笔记系统"] },
    { id: "communication", name: "沟通与表达", en: "Communication", sub: ["写作", "演讲", "谈判", "向上沟通", "反馈"] },
    { id: "ai-tools", name: "AI 工具实操", en: "AI Tools", sub: ["提示工程", "工作流自动化", "AI 编程", "AI 做文档/PPT"] },
    { id: "health", name: "身心健康", en: "Health & Wellbeing", sub: ["运动", "营养", "睡眠", "压力管理", "情绪调节"] },
    { id: "life-skills", name: "生活技能", en: "Life Skills", sub: ["烹饪", "家居维修", "办事流程", "驾驶"] },
    { id: "learning-how", name: "学习方法论", en: "Learning How to Learn", sub: ["主动回忆", "间隔重复", "费曼技巧", "思维导图"] }
  ] }
];
