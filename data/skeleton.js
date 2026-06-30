/* =============================================================
 *  学习中心 · 考点大纲骨架 (skeleton)  —— 懒加载的"知识地图"
 * -------------------------------------------------------------
 *  各学科的"目录骨架"：列出考点，内容慢慢填。
 *    title  考点名
 *    ref    若已有讲解页，写 catalog 里的 id（自动判为"完成"并可点进）
 *    status 没写 ref 时：todo 待填 / partial 部分（默认 todo）
 *  首页"覆盖度 %"口径（前端 core.js coverage）：一个考点算"已覆盖" ⟺ 有 ref 且能在
 *    catalog 找到，或 status==="done"。⚠️ partial 不计入覆盖度（只是给人看的中间态）。
 *  来源：① agent 生成讲解 ② 用户喂书拆解 ③ 少量真题做例题。
 *  按 { profile, subject, scope } 归类；新增考点直接往 topics 里加。
 * ============================================================= */
window.STUDY_SKELETON = [

  /* ========== Siyu（siyu）· 高考 · 物化生方向 ========== */
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
        { title: "三角函数定义与诱导公式", ref: "math-trig-functions" }, { title: "正弦余弦定理", ref: "math-trig-functions" } ] },
      { title: "数列", points: [ { title: "等差数列", ref: "math-sequences" }, { title: "等比数列", ref: "math-sequences" } ] },
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

  /* ========== Ma Huan（ma-huan）· 终身学习 ========== */
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

  /* ---- 交互设计 · 知识点大纲（自学路线,配 design 课程资料 + 总纲页） ---- */
  {
    profile: "ma-huan", subject: "design", discipline: "design", scope: "general",
    topics: [
      { title: "UX / HCI 基础", points: [
        { title: "用户中心设计与认知负荷", status: "todo" },
        { title: "可见性·映射·反馈·约束(诺曼五要素)", status: "todo" },
        { title: "NN/g 十大可用性原则", status: "todo" },
        { title: "错误预防与错误恢复", status: "todo" }
      ] },
      { title: "用户研究与需求", points: [
        { title: "访谈与观察", status: "todo" },
        { title: "任务分析(用户到底要完成什么)", status: "todo" },
        { title: "Persona 与 Journey Map", status: "todo" },
        { title: "可用性测试基础", status: "todo" }
      ] },
      { title: "信息架构与流程", points: [
        { title: "导航·分类·层级", status: "todo" },
        { title: "搜索与筛选", status: "todo" },
        { title: "表单设计(顺序/默认值/即时校验)", status: "todo" },
        { title: "列表·详情·工作流", status: "todo" },
        { title: "空状态·加载·错误·成功 四态", status: "todo" }
      ] },
      { title: "界面模式与组件", points: [
        { title: "表格与批量操作", status: "todo" },
        { title: "向导·弹窗·抽屉", status: "todo" },
        { title: "仪表盘与设置页", status: "todo" },
        { title: "模式复用(别从零发明交互)", status: "todo" }
      ] },
      { title: "原型·评审·迭代", points: [
        { title: "低保真 wireframe", status: "todo" },
        { title: "高保真 prototype", status: "todo" },
        { title: "设计走查与 critique", status: "todo" },
        { title: "后台界面自查清单(每周拆解练习)", status: "todo" }
      ] }
    ]
  },

  /* ========== Jiahuan（mahuan）· 英语（已填语法点 + 待填） ========== */
  {
    profile: "mahuan", subject: "english", scope: "jijiao-6b",
    topics: [
      { title: "语法 · 时态", points: [
        { title: "一般过去时", ref: "mh-en-past-tense" },
        { title: "一般将来时(will)", ref: "mh-en-future-tense" },
        { title: "现在进行时", ref: "mh-en-present-continuous" } ] },
      { title: "语法 · 其他", points: [
        { title: "形容词比较级", ref: "mh-en-comparatives" },
        { title: "be 动词与主谓一致", ref: "mh-en-be-verb" },
        { title: "可数与不可数名词", status: "todo" }, { title: "人称代词与物主代词", status: "todo" } ] }
    ]
  }
];
