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

  /* ===== 档案：Siyu（siyu · 高考） ===== */
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

  /* ===== 档案：ma-huan（Ma Huan · 终身学习） ===== */
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

  /* ===== 档案：mahuan（Jiahuan · 六年级英语） ===== */
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
  },
  { id: "math-trig-functions", profile: "siyu", subject: "math", discipline: "math", scopes: ["gaokao"], status: "done", category: "三角函数", title: "三角函数：定义与图象", path: "subjects/math/trig-functions.html", summary: "单位圆定义三角函数，诱导公式化简，含正弦曲线与正余弦定理", tags: ["三角函数", "诱导公式", "正弦定理", "余弦定理", "单位圆", "图象变换"], date: "2026-06-29", difficulty: 2, type: "交互", related: ["math-quadratic-functions"] },
  { id: "math-sequences", profile: "siyu", subject: "math", discipline: "math", scopes: ["gaokao"], status: "done", category: "数列", title: "数列:等差与等比", path: "subjects/math/sequences.html", summary: "等差/等比数列通项与求和公式推导，含交互柱状图实验", tags: ["数列", "等差数列", "等比数列", "求和公式", "高考"], date: "2026-06-29", difficulty: 2, type: "交互", related: [] },
  { id: "math-linear-functions", profile: "mahuan", subject: "math", discipline: "math", scopes: ["chuzhong"], status: "done", category: "函数", title: "一次函数与正比例", path: "subjects/math/linear-functions.html", summary: "图解 y=kx+b:k 控制斜率增减性，b 控制截距，含正比例函数对比实验", tags: ["一次函数", "正比例函数", "斜率", "截距", "图象", "初中"], date: "2026-06-29", difficulty: 1, type: "交互", related: [] },
  { id: "mh-en-present-continuous", profile: "mahuan", subject: "english", scopes: ["jijiao-6b", "xiaoxue"], status: "done", category: "语法 · 时态", title: "现在进行时 Present Continuous", path: "subjects/english/mh-present-continuous.html", summary: "be(am/is/are)+动词ing，拼写四规则，否定疑问句型，信号词与状态动词禁用提醒", tags: ["现在进行时", "be动词", "ing", "进行时", "am is are", "小升初"], date: "2026-06-29", difficulty: 1, type: "文档", related: ["mh-en-past-tense", "mh-en-future-tense", "mh-en-be-verb"] },
  { id: "mh-en-this-that", profile: "mahuan", subject: "english", scopes: ["chuzhong"], status: "done", category: "语法 · 基础", title: "this / that / these / those：指示代词", path: "subjects/english/mh-this-that.html", summary: "近用 this/these，远用 that/those；单数配 is、复数配 are；What's this 的问答。", tags: ["指示代词", "this", "that", "these", "those", "单复数"], date: "2026-06-30", difficulty: 1, type: "文档", related: ["mh-en-be-verb", "mh-en-nouns-plural"] },
  { id: "mh-en-nouns-plural", profile: "mahuan", subject: "english", scopes: ["chuzhong"], status: "done", category: "语法 · 基础", title: "名词单复数：怎么把一个变成很多个", path: "subjects/english/mh-nouns-plural.html", summary: "规则复数(+s/+es、y→ies、f→ves)、不规则复数(man→men)、不可数名词。", tags: ["名词", "复数", "单复数", "不可数名词"], date: "2026-06-30", difficulty: 1, type: "文档", related: ["mh-en-this-that", "mh-en-present-simple"] },
  { id: "mh-en-present-simple", profile: "mahuan", subject: "english", scopes: ["chuzhong"], status: "done", category: "语法 · 时态", title: "一般现在时：习惯和事实", path: "subjects/english/mh-present-simple.html", summary: "表习惯与事实；第三人称单数 +s/es；do/does 否定与疑问；与现在进行时对比。", tags: ["一般现在时", "第三人称单数", "do", "does", "时态"], date: "2026-06-30", difficulty: 1, type: "文档", related: ["mh-en-present-continuous", "mh-en-questions"] },
  { id: "mh-en-questions", profile: "mahuan", subject: "english", scopes: ["chuzhong"], status: "done", category: "句子与文章", title: "一般疑问句与简答：怎么问 Yes/No 问题", path: "subjects/english/mh-questions.html", summary: "be 动词提前、Do/Does 加原形、简答用对应助动词、升调。", tags: ["一般疑问句", "简答", "Do", "Does", "Yes No"], date: "2026-06-30", difficulty: 1, type: "文档", related: ["mh-en-be-verb", "mh-en-present-simple"] },
  { id: "mh-cn-close-reading", profile: "mahuan", subject: "chinese", scopes: ["chuzhong"], status: "done", category: "阅读与写作", title: "怎样精读一篇文章", path: "subjects/chinese/mh-close-reading.html", summary: "精读六步法:通读→分段→找中心→圈词猜义→提问批注→复述。", tags: ["精读", "阅读方法", "批注", "段意", "中心句"], date: "2026-06-30", difficulty: 1, type: "文档", related: ["mh-cn-narrative-event", "mh-cn-observation"] },
  { id: "mh-cn-narrative-event", profile: "mahuan", subject: "chinese", scopes: ["chuzhong"], status: "done", category: "阅读与写作", title: "把一件事写清楚：记叙文六要素", path: "subjects/chinese/mh-narrative-event.html", summary: "时间地点人物起因经过结果;经过详写、详略得当;两版对比与写作步骤。", tags: ["记叙文", "六要素", "写作", "详略得当"], date: "2026-06-30", difficulty: 1, type: "文档", related: ["mh-cn-observation", "mh-cn-close-reading"] },
  { id: "mh-cn-observation", profile: "mahuan", subject: "chinese", scopes: ["chuzhong"], status: "done", category: "阅读与写作", title: "观察与细节描写：让文字活起来", path: "subjects/chinese/mh-observation.html", summary: "五感观察法;把笼统词换成具体细节;动作分解。", tags: ["观察", "细节描写", "五感", "写作"], date: "2026-06-30", difficulty: 1, type: "文档", related: ["mh-cn-narrative-event", "mh-cn-close-reading"] },
  { id: "mh-bio-campus-observe", profile: "mahuan", subject: "biology", scopes: ["chuzhong"], status: "done", category: "素质探索", title: "出门看自然：植物园·海洋馆·博物馆怎么逛", path: "subjects/biology/mh-campus-observe.html", summary: "暑假出行版:去前定目标、馆内挑重点读铭牌、随身记录表、回家收尾;植物园/海洋馆/博物馆各怎么看。", tags: ["植物园", "海洋馆", "博物馆", "自然观察", "素质探索"], date: "2026-06-30", difficulty: 1, type: "文档", related: ["mh-bio-food-chain", "mh-bio-documentary"] },
  { id: "mh-bio-documentary", profile: "mahuan", subject: "biology", scopes: ["chuzhong"], status: "done", category: "素质探索", title: "看纪录片学科学：以《地球脉动》为例", path: "subjects/biology/mh-documentary.html", summary: "带着问题看(是什么/怎么活/什么环境)、边看边记、看完三步、合法免费途径。", tags: ["纪录片", "科普", "地球脉动", "素质探索"], date: "2026-06-30", difficulty: 1, type: "文档", related: ["mh-bio-campus-observe", "mh-bio-food-chain"] },
  { id: "mh-bio-food-chain", profile: "mahuan", subject: "biology", scopes: ["chuzhong"], status: "done", category: "素质探索", title: "食物链与食物网：谁吃谁", path: "subjects/biology/mh-food-chain.html", summary: "生产者/消费者/分解者;箭头表能量流动;食物网;某一环消失的连锁反应。", tags: ["食物链", "食物网", "生态", "能量流动", "素质探索"], date: "2026-06-30", difficulty: 1, type: "文档", related: ["mh-bio-campus-observe", "mh-bio-documentary"] },
  { id: "mh-en-alphabet", profile: "mahuan", subject: "english", scopes: ["chuzhong"], status: "done", category: "词汇 · 入门", title: "26个字母与自然拼读入门", path: "subjects/english/mh-alphabet.html", summary: "字母名 vs 字母发音、5 元音短音、sh/ch/th/-ck 组合、翻卡 + 挑音小测。", tags: ["字母", "音标", "拼读", "phonics", "发音"], date: "2026-06-30", difficulty: 1, type: "交互", related: ["mh-en-greetings", "mh-en-nouns-plural"] },
  { id: "mh-en-greetings", profile: "mahuan", subject: "english", scopes: ["chuzhong"], status: "done", category: "词汇 · 入门", title: "问候、自我介绍与课堂用语", path: "subjects/english/mh-greetings.html", summary: "问候/自我介绍/告别/课堂常用语 + 情景对话点选练习(判对错、计分)。", tags: ["问候", "自我介绍", "课堂用语", "对话"], date: "2026-06-30", difficulty: 1, type: "交互", related: ["mh-en-alphabet", "mh-en-be-verb"] },
  { id: "mh-en-pronouns", profile: "mahuan", subject: "english", scopes: ["chuzhong"], status: "done", category: "语法 · 基础", title: "人称代词与物主代词", path: "subjects/english/mh-pronouns.html", summary: "主格/宾格/形容词性物主/名词性物主四类对照 + 代词变形器(实时换词)。", tags: ["人称代词", "物主代词", "主格", "宾格", "mine"], date: "2026-06-30", difficulty: 1, type: "交互", related: ["mh-en-be-verb", "mh-en-sentence-svo"] },
  { id: "mh-en-sentence-svo", profile: "mahuan", subject: "english", scopes: ["chuzhong"], status: "done", category: "句子与文章", title: "简单句:主语 + 谓语 + 宾语", path: "subjects/english/mh-sentence-svo.html", summary: "英语句子骨架 SVO、三种小骨架、中英语序对比 + 句子搭积木(换词实时重组)。", tags: ["简单句", "主谓宾", "SVO", "句子结构", "语序"], date: "2026-06-30", difficulty: 1, type: "交互", related: ["mh-en-pronouns", "mh-en-present-simple"] },

  /* ===== 档案:ma-huan · 交互设计课(scope general)===== */
  { id: "design-ucd-cognitive-load", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "UX / HCI 基础", title: "用户中心设计与认知负荷", path: "subjects/design/design-ucd-cognitive-load.html", summary: "从功能清单转向用户任务+情境;认知负荷三类(核心=砍外在);米勒 7±2 与识别优于回忆;含「认知负荷计量器」选项数→负荷条实时变色。", tags: ["用户中心设计", "认知负荷", "米勒法则", "7±2", "UCD", "后台"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-norman-principles", "design-nng-heuristics"] },
  { id: "design-norman-principles", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "UX / HCI 基础", title: "诺曼五要素:可见性·映射·反馈·约束·示能", path: "subjects/design/design-norman-principles.html", summary: "逐条讲可见性/映射/反馈/约束/示能,每条配后台坏例好例;含「好设计/坏设计切换台」点控件看反馈差异、五要素实时亮红绿。", tags: ["诺曼", "可见性", "映射", "反馈", "约束", "示能", "affordance"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-nng-heuristics", "design-error-prevention"] },
  { id: "design-nng-heuristics", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "UX / HCI 基础", title: "尼尔森十大可用性原则", path: "subjects/design/design-nng-heuristics.html", summary: "NN/g 十大原则逐条+后台正反例;含「十原则巡检卡+找茬小测」点选违反了哪条,实时判对错、计分。", tags: ["NN/g", "尼尔森", "可用性原则", "启发式评估", "heuristics"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-norman-principles", "design-error-prevention"] },
  { id: "design-error-prevention", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "UX / HCI 基础", title: "错误预防与错误恢复", path: "subjects/design/design-error-prevention.html", summary: "预防胜于治疗;失误vs错误;约束/默认值/确认/即时校验/撤销;含「删除三策略实验台」(无保护/二次确认/可撤销带5秒倒计时)+邮箱即时校验。", tags: ["错误预防", "错误恢复", "撤销", "二次确认", "即时校验"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-nng-heuristics", "design-form-design"] },
  { id: "design-form-design", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "信息架构与流程", title: "表单设计:顺序 · 默认值 · 即时校验", path: "subjects/design/design-form-design.html", summary: "能不问就不问;字段顺序与单列;顶部标签;默认值;即时校验;含「坏表单/好表单对照实验」边输入边校验、必填没填禁用提交。", tags: ["表单设计", "即时校验", "默认值", "字段顺序", "表单可用性"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-error-prevention", "design-four-states"] },
  { id: "design-four-states", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "信息架构与流程", title: "界面四态:空 · 加载 · 错误 · 成功", path: "subjects/design/design-four-states.html", summary: "四态都要设计;骨架屏优于转圈;空状态给引导;含「四态切换器」点按钮组件实时换样、重试走加载→成功。", tags: ["空状态", "加载态", "错误态", "骨架屏", "四态"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-search-filter", "design-form-design"] },
  { id: "design-search-filter", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "信息架构与流程", title: "搜索与筛选", path: "subjects/design/design-search-filter.html", summary: "搜索/筛选/排序分工;search-as-you-type;filter chips 可见可清除;实时结果数;含「实时筛选实验台」14条数据搜索+chips即时收窄。", tags: ["搜索", "筛选", "filter chips", "search-as-you-type", "列表"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-nav-ia", "design-four-states"] },
  { id: "design-nav-ia", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "信息架构与流程", title: "信息架构:导航 · 分类 · 层级", path: "subjects/design/design-nav-ia.html", summary: "IA 让人找得到;按心智模型分类(卡片分类法);广度vs深度;导航模式与面包屑;含「菜单结构实验台」扁平/深/平衡切换看到达代价。", tags: ["信息架构", "导航", "分类", "层级", "卡片分类", "IA"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-search-filter", "design-nng-heuristics"] },

  /* ===== 设计课第二波:用户研究 / 界面模式 / 原型评审 ===== */
  { id: "design-interview-observe", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "用户研究与需求", title: "用户访谈与观察", path: "subjects/design/design-interview-observe.html", summary: "说的≠做的;开放式 vs 诱导/封闭问题;现场观察>听描述;含「问题改造器」把坏问题实时改成开放式 + 好坏判断计分。", tags: ["用户研究", "访谈", "观察", "开放式问题", "需求"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-task-analysis", "design-persona-journey"] },
  { id: "design-task-analysis", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "用户研究与需求", title: "任务分析:用户到底要完成什么", path: "subjects/design/design-task-analysis.html", summary: "用户要完成任务不是要功能;任务分解=目标→步骤→操作,找卡点;含「任务拆解树」逐步标顺/卡、实时高亮最该优化的步骤。", tags: ["任务分析", "HTA", "用户任务", "痛点", "需求"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-interview-observe", "design-usability-test"] },
  { id: "design-persona-journey", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "用户研究与需求", title: "Persona 与 Journey Map", path: "subjects/design/design-persona-journey.html", summary: "Persona 把目标用户具体成一个人;旅程地图按阶段排行为/情绪/痛点;含「旅程情绪曲线」拖滑块画情绪线、谷底自动标痛点。", tags: ["Persona", "用户画像", "旅程地图", "Journey", "情绪曲线"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-task-analysis", "design-usability-test"] },
  { id: "design-usability-test", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "用户研究与需求", title: "可用性测试基础", path: "subjects/design/design-usability-test.html", summary: "5 人发现~85%问题;给任务不给提示、出声思考、看能不能做到;含「迷你可用性测试」点候选入口、记完成率与误点、给设计启示。", tags: ["可用性测试", "用户测试", "完成率", "出声思考"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-task-analysis", "design-critique"] },
  { id: "design-list-detail-flow", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "信息架构与流程", title: "列表 · 详情 · 工作流", path: "subjects/design/design-list-detail-flow.html", summary: "后台骨架:列表(找+筛+批量)→详情(看+改)→工作流(状态流转);含「列表→详情→流程」点行进详情、推进状态机、看操作日志增长。", tags: ["列表", "详情", "工作流", "状态机", "主从布局"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-table-batch", "design-four-states"] },
  { id: "design-table-batch", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "界面模式与组件", title: "表格与批量操作", path: "subjects/design/design-table-batch.html", summary: "列优先级/对齐/固定表头;勾选→浮出批量条→显示已选N项→危险操作可撤销;含「可勾选表格」全选半选联动 + 批量删除带5秒撤销。", tags: ["表格", "批量操作", "全选", "撤销", "数据"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-list-detail-flow", "design-error-prevention"] },
  { id: "design-wizard-modal-drawer", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "界面模式与组件", title: "向导 · 弹窗 · 抽屉", path: "subjects/design/design-wizard-modal-drawer.html", summary: "向导(多步线性)/弹窗(短聚焦打断)/抽屉(侧滑保留上下文)何时用;含「容器切换台」同一新建任务三种容器实时演示 + 何时用它。", tags: ["向导", "弹窗", "抽屉", "Modal", "Drawer", "Wizard"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-form-design", "design-pattern-reuse"] },
  { id: "design-dashboard-settings", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "界面模式与组件", title: "仪表盘与设置页", path: "subjects/design/design-dashboard-settings.html", summary: "仪表盘先问看了要做什么决定、少而准;设置页分组/搜索/危险隔离;含「仪表盘信息优先级」标重要度实时重排(全都重要=没有重要)。", tags: ["仪表盘", "设置页", "信息优先级", "数据看板"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-table-batch", "design-pattern-reuse"] },
  { id: "design-pattern-reuse", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "界面模式与组件", title: "模式复用:别从零发明交互", path: "subjects/design/design-pattern-reuse.html", summary: "成熟模式用户已会用,自创=逼人重学;一致性>创意;含「模式匹配器」给交互需求实时匹配标准模式 + 别自创的理由。", tags: ["模式复用", "一致性", "交互模式", "组件库"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-wizard-modal-drawer", "design-nng-heuristics"] },
  { id: "design-wireframe", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "原型 · 评审 · 迭代", title: "低保真线框图", path: "subjects/design/design-wireframe.html", summary: "线框只定结构层次、不碰颜色字体;快、敢推翻、聚焦布局;含「线框搭建器」点按钮往画布加灰阶占位块拼后台页面。", tags: ["线框图", "wireframe", "低保真", "原型", "布局"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-hifi-prototype", "design-critique"] },
  { id: "design-hifi-prototype", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "原型 · 评审 · 迭代", title: "高保真原型", path: "subjects/design/design-hifi-prototype.html", summary: "高保真验证细节、用真实/边界数据;别在结构没定时就上;含「保真度滑块」同一卡片从线框→视觉→真实数据→可交互逐档进化。", tags: ["高保真", "原型", "prototype", "保真度", "真实数据"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-wireframe", "design-usability-test"] },
  { id: "design-backend-checklist", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "原型 · 评审 · 迭代", title: "后台界面自查清单", path: "subjects/design/design-backend-checklist.html", summary: "把全课要点浓缩成每周可用的自查清单(四态/表单/反馈/一致性/批量/危险操作/导航/认知负荷);含「交互式自查清单」逐条勾算健康分。", tags: ["自查清单", "走查", "复盘", "后台", "checklist"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-critique", "design-four-states"] },
  { id: "design-critique", profile: "ma-huan", subject: "design", discipline: "design", scopes: ["general"], status: "done", category: "原型 · 评审 · 迭代", title: "设计走查与 critique", path: "subjects/design/design-critique.html", summary: "用十原则逐条走查挑问题;critique 对事不对人(问题+影响+建议);含「界面找茬走查」点出后台界面的问题、即时判对错并给违反原则+计分。", tags: ["走查", "critique", "评审", "启发式评估", "反馈"], date: "2026-06-30", difficulty: 2, type: "交互", related: ["design-usability-test", "design-backend-checklist"] }
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
