/* =============================================================
 *  学习中心 · 考点大纲骨架 (skeleton)  —— 懒加载的"知识地图"
 * -------------------------------------------------------------
 *  各学科的"目录骨架"：列出考点，内容慢慢填。
 *    title  考点名
 *    ref    若已有讲解页，写 catalog 里的 id（自动判为"完成"并可点进）
 *    status 没写 ref 时：todo 待填 / partial 部分（默认 todo）
 *  首页"覆盖度 %"口径（见 assets/hub.js）：一个考点算"已覆盖" ⟺ 有 ref 且能在
 *    catalog 找到，或 status==="done"。⚠️ partial 不计入覆盖度（只是给人看的中间态）。
 *  来源：① agent 生成讲解 ② 用户喂书拆解 ③ 少量真题做例题。
 *  按 { profile, subject, scope } 归类；新增考点直接往 topics 里加。
 * ============================================================= */
window.STUDY_SKELETON = [

  /* ========== 思雨（siyu）· 高考 · 物化生方向 ========== */
  {
    profile: "siyu", subject: "math", discipline: "math", scope: "gaokao",
    topics: [
      { title: "函数", points: [
        { title: "二次函数与图象", ref: "math-quadratic-functions" },
        { title: "指数函数与对数函数", status: "todo" },
        { title: "函数的单调性与奇偶性", status: "todo" }
      ] },
      { title: "导数", points: [
        { title: "导数：瞬时变化率与切线斜率", ref: "math-derivatives" },
        { title: "导数与单调性、极值最值", status: "todo" }
      ] },
      { title: "三角函数", points: [
        { title: "三角函数定义与诱导公式", status: "todo" }, { title: "正弦余弦定理", status: "todo" } ] },
      { title: "数列", points: [ { title: "等差数列", status: "todo" }, { title: "等比数列", status: "todo" } ] },
      { title: "概率统计", points: [ { title: "古典概型", status: "todo" }, { title: "正态分布", status: "todo" } ] }
    ]
  },
  {
    profile: "siyu", subject: "physics", discipline: "physics", scope: "gaokao",
    topics: [
      { title: "力学", points: [
        { title: "匀变速直线运动", status: "todo" }, { title: "牛顿运动定律", status: "todo" },
        { title: "曲线运动与万有引力", status: "todo" }, { title: "功和能", status: "todo" } ] },
      { title: "电磁学", points: [
        { title: "电场与电势", status: "todo" }, { title: "恒定电流", status: "todo" },
        { title: "磁场与安培力", status: "todo" }, { title: "电磁感应", status: "todo" } ] },
      { title: "热学与近代物理", points: [ { title: "分子动理论", status: "todo" }, { title: "光电效应", status: "todo" } ] }
    ]
  },
  {
    profile: "siyu", subject: "chemistry", discipline: "chemistry", scope: "gaokao",
    topics: [
      { title: "物质结构", points: [ { title: "原子结构与元素周期律", status: "todo" }, { title: "化学键", status: "todo" } ] },
      { title: "化学反应原理", points: [
        { title: "化学反应速率与平衡", status: "todo" }, { title: "电离平衡与盐类水解", status: "todo" }, { title: "原电池与电解池", status: "todo" } ] },
      { title: "有机化学", points: [ { title: "烃及其衍生物", status: "todo" }, { title: "同分异构体", status: "todo" } ] }
    ]
  },
  {
    profile: "siyu", subject: "biology", discipline: "biology", scope: "gaokao",
    topics: [
      { title: "分子与细胞", points: [ { title: "细胞的结构与功能", status: "todo" }, { title: "酶与ATP", status: "todo" }, { title: "光合作用与呼吸作用", status: "todo" } ] },
      { title: "遗传与进化", points: [ { title: "孟德尔遗传定律", status: "todo" }, { title: "基因的表达", status: "todo" } ] },
      { title: "稳态与环境", points: [ { title: "内环境与稳态", status: "todo" }, { title: "种群与群落", status: "todo" } ] }
    ]
  },

  /* ========== 马欢（ma-huan）· 终身学习 ========== */
  /* 日语整套体系（从 N5 起步，词库已导入开源 JLPT） */
  {
    profile: "ma-huan", subject: "japanese", scope: "jlpt-n5",
    topics: [
      { title: "语法 N5", points: [
        { title: "です・ます 与名词句", status: "todo" }, { title: "助词 は/が/を/に/で/へ", status: "todo" },
        { title: "形容词（い形 / な形）", status: "todo" }, { title: "动词分类与ます形", status: "todo" },
        { title: "て形・ない形・た形", status: "todo" } ] },
      { title: "假名与发音", points: [ { title: "平假名・片假名", status: "todo" }, { title: "长音・促音・拗音", status: "todo" } ] }
    ]
  },
  /* 英语 · 托福（听说读写四项） */
  {
    profile: "ma-huan", subject: "english", scope: "toefl",
    topics: [
      { title: "Listening 听力", points: [ { title: "讲座笔记法", status: "todo" }, { title: "校园对话题型", status: "todo" } ] },
      { title: "Speaking 口语", points: [ { title: "独立口语模板", status: "todo" }, { title: "综合口语（读+听+说）", status: "todo" } ] },
      { title: "Writing 写作", points: [ { title: "综合写作结构", status: "todo" }, { title: "学术讨论写作", status: "todo" } ] },
      { title: "Reading 阅读", points: [ { title: "句子简化题", status: "todo" }, { title: "篇章总结题", status: "todo" } ] },
      { title: "核心词汇", points: [ { title: "学科高频词", status: "todo" } ] }
    ]
  },
  /* ---- 数学：大学 → 研究生知识体系 ---- */
  {
    profile: "ma-huan", subject: "math", discipline: "math", scope: "undergrad",
    topics: [
      { title: "分析", points: [ { title: "数学分析（极限/微分/积分/级数）", status: "todo" }, { title: "多元微积分与场论", status: "todo" }, { title: "常微分方程", status: "todo" }, { title: "复变函数", status: "todo" } ] },
      { title: "代数", points: [ { title: "高等代数 / 线性代数", status: "todo" }, { title: "抽象代数（群环域）", status: "todo" }, { title: "数论初步", status: "todo" } ] },
      { title: "几何与拓扑", points: [ { title: "解析几何", status: "todo" }, { title: "点集拓扑入门", status: "todo" }, { title: "微分几何初步", status: "todo" } ] },
      { title: "概率与应用", points: [ { title: "概率论与数理统计", status: "todo" }, { title: "数值分析", status: "todo" }, { title: "最优化方法", status: "todo" } ] }
    ]
  },
  {
    profile: "ma-huan", subject: "math", discipline: "math", scope: "grad",
    topics: [
      { title: "分析方向", points: [ { title: "实分析 / 测度论", status: "todo" }, { title: "泛函分析", status: "todo" }, { title: "偏微分方程", status: "todo" }, { title: "调和分析", status: "todo" } ] },
      { title: "代数与几何", points: [ { title: "交换代数 / 代数几何", status: "todo" }, { title: "微分流形", status: "todo" }, { title: "代数拓扑", status: "todo" } ] },
      { title: "概率与离散", points: [ { title: "随机过程", status: "todo" }, { title: "测度论概率", status: "todo" }, { title: "图论与组合", status: "todo" } ] }
    ]
  },

  /* ---- 物理：大学 → 研究生知识体系 ---- */
  {
    profile: "ma-huan", subject: "physics", discipline: "physics", scope: "undergrad",
    topics: [
      { title: "普通物理", points: [ { title: "力学", status: "todo" }, { title: "电磁学", status: "todo" }, { title: "热学", status: "todo" }, { title: "光学", status: "todo" }, { title: "原子物理", status: "todo" } ] },
      { title: "四大力学", points: [ { title: "理论力学（拉格朗日/哈密顿）", status: "todo" }, { title: "电动力学（麦克斯韦方程）", status: "todo" }, { title: "热力学与统计物理", status: "todo" }, { title: "量子力学", status: "todo" } ] },
      { title: "专业基础", points: [ { title: "数学物理方法", status: "todo" }, { title: "固体物理", status: "todo" }, { title: "狭义相对论", status: "todo" } ] }
    ]
  },
  {
    profile: "ma-huan", subject: "physics", discipline: "physics", scope: "grad",
    topics: [
      { title: "场论与粒子", points: [ { title: "高等量子力学", status: "todo" }, { title: "量子场论", status: "todo" }, { title: "粒子物理与标准模型", status: "todo" } ] },
      { title: "凝聚态与统计", points: [ { title: "高等统计力学", status: "todo" }, { title: "凝聚态物理（多体理论）", status: "todo" }, { title: "非线性与混沌", status: "todo" } ] },
      { title: "引力与宇宙", points: [ { title: "广义相对论", status: "todo" }, { title: "宇宙学", status: "todo" } ] }
    ]
  },

  /* ---- 电子信息：大学 → 研究生知识体系 ---- */
  {
    profile: "ma-huan", subject: "eecs", discipline: "eecs", scope: "undergrad",
    topics: [
      { title: "电路与电子", points: [ { title: "电路分析", status: "todo" }, { title: "模拟电子技术", status: "todo" }, { title: "数字电子技术", status: "todo" } ] },
      { title: "信号与系统", points: [ { title: "信号与系统", status: "todo" }, { title: "数字信号处理(DSP)", status: "todo" }, { title: "通信原理", status: "todo" } ] },
      { title: "电磁与器件", points: [ { title: "电磁场与电磁波", status: "todo" }, { title: "半导体物理与器件", status: "todo" }, { title: "微波技术", status: "todo" } ] },
      { title: "计算与控制", points: [ { title: "数据结构与算法", status: "todo" }, { title: "微机原理与接口", status: "todo" }, { title: "自动控制原理", status: "todo" }, { title: "计算机网络", status: "todo" } ] }
    ]
  },
  {
    profile: "ma-huan", subject: "eecs", discipline: "eecs", scope: "grad",
    topics: [
      { title: "通信与信息", points: [ { title: "信息论与编码", status: "todo" }, { title: "现代/无线通信", status: "todo" }, { title: "统计信号处理", status: "todo" } ] },
      { title: "信号处理应用", points: [ { title: "数字图像处理", status: "todo" }, { title: "语音/阵列信号", status: "todo" }, { title: "机器学习与模式识别", status: "todo" } ] },
      { title: "微电子与系统", points: [ { title: "VLSI / 集成电路设计", status: "todo" }, { title: "射频电路", status: "todo" }, { title: "嵌入式系统", status: "todo" } ] }
    ]
  },

  /* ---- 心理学（A 示范：浏览→加入→填充。二级方向大纲 + 导论已填） ---- */
  {
    profile: "ma-huan", subject: "psychology", discipline: "psychology", scope: "general",
    topics: [
      { title: "导论与方法", points: [
        { title: "心理学是什么 · 分支地图", ref: "mh-psych-intro" },
        { title: "研究方法（实验/相关/观察）", status: "todo" },
        { title: "心理统计与测量", status: "todo" },
        { title: "五大流派/视角", status: "todo" }
      ] },
      { title: "基础分支", points: [
        { title: "普通心理学", status: "todo" }, { title: "认知心理学", status: "todo" },
        { title: "发展心理学", status: "todo" }, { title: "社会心理学", status: "todo" },
        { title: "人格心理学", status: "todo" }, { title: "生理/认知神经科学", status: "todo" }
      ] },
      { title: "应用分支", points: [
        { title: "临床与咨询心理学", status: "todo" }, { title: "教育心理学", status: "todo" },
        { title: "工业与组织心理学(I/O)", status: "todo" }, { title: "健康心理学", status: "todo" }
      ] }
    ]
  },

  /* ---- 化学/生物 · 高阶（兴趣，慢慢填） ---- */
  {
    profile: "ma-huan", subject: "chemistry", discipline: "chemistry", scope: "advanced",
    topics: [ { title: "物理化学", points: [ { title: "热力学三定律", status: "todo" }, { title: "化学动力学", status: "todo" } ] } ]
  },
  {
    profile: "ma-huan", subject: "biology", discipline: "biology", scope: "advanced",
    topics: [ { title: "分子生物学", points: [ { title: "中心法则", status: "todo" }, { title: "基因调控", status: "todo" } ] } ]
  },

  /* ========== 嘉欢（mahuan）· 英语（已填语法点 + 待填） ========== */
  {
    profile: "mahuan", subject: "english", scope: "jijiao-6b",
    topics: [
      { title: "语法 · 时态", points: [
        { title: "一般过去时", ref: "mh-en-past-tense" },
        { title: "一般将来时(will)", ref: "mh-en-future-tense" },
        { title: "现在进行时", status: "todo" } ] },
      { title: "语法 · 其他", points: [
        { title: "形容词比较级", ref: "mh-en-comparatives" },
        { title: "be 动词与主谓一致", ref: "mh-en-be-verb" },
        { title: "可数与不可数名词", status: "todo" }, { title: "人称代词与物主代词", status: "todo" } ] }
    ]
  }
];
