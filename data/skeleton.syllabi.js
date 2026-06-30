/* =============================================================
 *  初高中 / 高考 各科考点大纲(共享,无 profile)— 批次③ 生成 2026-06-28
 * -------------------------------------------------------------
 *  按用户默认科目+范围 或 已加入学科 显示(core.js skeletonForUser/Discipline)。
 *  18 份:初中9科 + 陕西新高考(3+1+2)9科。点 ref 与 catalog 标题匹配则自动回链。
 * ============================================================= */
window.STUDY_SKELETON = (window.STUDY_SKELETON || []).concat([
  { subject: "chinese", scope: "chuzhong", discipline: "chinese-lit", dir: "阅读与写作", topics: [
    { title: "阅读方法", points: [
      { title: "怎样精读一篇文章", ref: "mh-cn-close-reading" },
      { title: "抓中心与概括段意", status: "todo" },
      { title: "联系上下文猜词义", status: "todo" },
      { title: "边读边提问与批注", status: "todo" } ] },
    { title: "整本书阅读", points: [
      { title: "给自己排一个读书计划", status: "todo" },
      { title: "读后感怎么写", status: "todo" },
      { title: "画一张人物关系图", status: "todo" } ] },
    { title: "写作基础", points: [
      { title: "把一件事写清楚(六要素)", ref: "mh-cn-narrative-event" },
      { title: "观察与细节描写", ref: "mh-cn-observation" },
      { title: "开头和结尾的几种写法", status: "todo" } ] },
    { title: "文体小练", points: [
      { title: "记叙文:写一件难忘的事", status: "todo" },
      { title: "说明文:介绍一样东西", status: "todo" },
      { title: "想象作文:编一个小故事", status: "todo" } ] },
    { title: "语言积累", points: [
      { title: "好词好句摘抄与运用", status: "todo" },
      { title: "标点与分段", status: "todo" },
      { title: "修改自己的作文", status: "todo" } ] }
  ] },
  { subject: "math", scope: "chuzhong", discipline: "math", topics: [
    { title: "数与式", points: [
      {"title":"有理数及其运算","status":"todo"},
      {"title":"数轴、相反数、绝对值","status":"todo"},
      {"title":"实数与无理数、平方根与立方根","status":"todo"},
      {"title":"科学记数法与近似数","status":"todo"},
      {"title":"整式及其加减运算","status":"todo"},
      {"title":"幂的运算与整式乘法","status":"todo"},
      {"title":"乘法公式(平方差、完全平方)","status":"todo"},
      {"title":"因式分解","status":"todo"},
      {"title":"分式及其运算","status":"todo"},
      {"title":"二次根式及其运算","status":"todo"}
    ] },
    { title: "方程与不等式", points: [
      {"title":"一元一次方程及其应用","status":"todo"},
      {"title":"二元一次方程组及其应用","status":"todo"},
      {"title":"一元一次不等式与不等式组","status":"todo"},
      {"title":"分式方程及其应用","status":"todo"},
      {"title":"一元二次方程的解法","status":"todo"},
      {"title":"一元二次方程根的判别式与根与系数关系","status":"todo"},
      {"title":"方程与不等式的实际问题建模","status":"todo"}
    ] },
    { title: "函数", points: [
      {"title":"变量与函数的概念、表示法","status":"todo"},
      {"title":"平面直角坐标系","status":"todo"},
      {"title":"一次函数的图象与性质","ref":"math-linear-functions"},
      {"title":"正比例函数","ref":"math-linear-functions"},
      {"title":"反比例函数的图象与性质","status":"todo"},
      {"title":"二次函数的图象与性质","ref":"math-quadratic-functions"},
      {"title":"二次函数与一元二次方程的关系","ref":"math-quadratic-functions"},
      {"title":"函数的实际应用与最优化","status":"todo"}
    ] },
    { title: "相交线与平行线", points: [
      {"title":"角、余角与补角","status":"todo"},
      {"title":"相交线与对顶角","status":"todo"},
      {"title":"垂线与点到直线的距离","status":"todo"},
      {"title":"平行线的判定","status":"todo"},
      {"title":"平行线的性质","status":"todo"},
      {"title":"命题、定理与证明","status":"todo"}
    ] },
    { title: "三角形", points: [
      {"title":"三角形的边角关系与内角和","status":"todo"},
      {"title":"全等三角形的判定与性质","status":"todo"},
      {"title":"等腰三角形与等边三角形","status":"todo"},
      {"title":"直角三角形与勾股定理","status":"todo"},
      {"title":"线段垂直平分线与角平分线","status":"todo"},
      {"title":"相似三角形的判定与性质","status":"todo"},
      {"title":"锐角三角函数(正弦、余弦、正切)","status":"todo"},
      {"title":"解直角三角形及其应用","status":"todo"}
    ] },
    { title: "四边形", points: [
      {"title":"多边形的内角和与外角和","status":"todo"},
      {"title":"平行四边形的判定与性质","status":"todo"},
      {"title":"矩形、菱形、正方形","status":"todo"},
      {"title":"梯形","status":"todo"},
      {"title":"中位线定理","status":"todo"}
    ] },
    { title: "圆", points: [
      {"title":"圆的有关概念与性质","status":"todo"},
      {"title":"垂径定理","status":"todo"},
      {"title":"圆心角、圆周角及其关系","status":"todo"},
      {"title":"点与圆、直线与圆的位置关系","status":"todo"},
      {"title":"切线的判定与性质","status":"todo"},
      {"title":"正多边形与圆","status":"todo"},
      {"title":"弧长与扇形面积、圆锥侧面积","status":"todo"}
    ] },
    { title: "图形的变化", points: [
      {"title":"轴对称与轴对称图形","status":"todo"},
      {"title":"平移","status":"todo"},
      {"title":"旋转与中心对称","status":"todo"},
      {"title":"图形的相似与位似","status":"todo"},
      {"title":"投影与三视图","status":"todo"},
      {"title":"展开图与几何体表面积、体积","status":"todo"}
    ] },
    { title: "统计", points: [
      {"title":"数据的收集与抽样调查","status":"todo"},
      {"title":"统计图表(条形、折线、扇形、频数分布)","status":"todo"},
      {"title":"平均数、中位数与众数","status":"todo"},
      {"title":"极差与方差","status":"todo"},
      {"title":"用样本估计总体","status":"todo"}
    ] },
    { title: "概率", points: [
      {"title":"随机事件与必然、不可能事件","status":"todo"},
      {"title":"概率的意义与简单事件概率计算","status":"todo"},
      {"title":"用列举法(列表、树状图)求概率","status":"todo"},
      {"title":"用频率估计概率","status":"todo"}
    ] }
  ] },
  { subject: "english", scope: "chuzhong", discipline: "foreign-lit", dir: "新概念英语", topics: [
    { title: "词汇 · 入门", points: [
      { title: "26个字母与音标拼读", status: "todo" },
      { title: "问候与课堂用语", status: "todo" },
      { title: "生活高频词:家庭·学校·食物", status: "todo" } ] },
    { title: "语法 · 基础句型", points: [
      { title: "be 动词 am/is/are", ref: "mh-en-be-verb" },
      { title: "this/that/these/those", ref: "mh-en-this-that" },
      { title: "名词单复数", ref: "mh-en-nouns-plural" },
      { title: "人称代词与物主代词", status: "todo" } ] },
    { title: "语法 · 时态", points: [
      { title: "一般现在时", ref: "mh-en-present-simple" },
      { title: "现在进行时", ref: "mh-en-present-continuous" },
      { title: "一般过去时", ref: "mh-en-past-tense" },
      { title: "一般将来时 will", ref: "mh-en-future-tense" },
      { title: "形容词比较级", ref: "mh-en-comparatives" } ] },
    { title: "句子与文章", points: [
      { title: "简单句结构(主谓宾)", status: "todo" },
      { title: "一般疑问句与简答", ref: "mh-en-questions" },
      { title: "短文阅读:看图理解", status: "todo" } ] },
    { title: "习题与运用", points: [
      { title: "看图说话 / 三句话小作文", status: "todo" },
      { title: "配套练习与自测", status: "todo" } ] }
  ] },
  { subject: "physics", scope: "chuzhong", discipline: "physics", topics: [
    { title: "声现象", points: [
      {"title":"声音的产生与传播","status":"todo"},
      {"title":"声速及其影响因素","status":"todo"},
      {"title":"乐音的三要素（音调、响度、音色）","status":"todo"},
      {"title":"超声波与次声波及其应用","status":"todo"},
      {"title":"噪声的来源、危害与控制","status":"todo"}
    ] },
    { title: "光现象", points: [
      {"title":"光的直线传播（小孔成像、影、日月食）","status":"todo"},
      {"title":"光的反射定律","status":"todo"},
      {"title":"平面镜成像特点与作图","status":"todo"},
      {"title":"光的折射规律","status":"todo"},
      {"title":"光的色散与物体的颜色","status":"todo"},
      {"title":"红外线与紫外线","status":"todo"}
    ] },
    { title: "透镜及其应用", points: [
      {"title":"凸透镜与凹透镜对光的作用","status":"todo"},
      {"title":"凸透镜成像规律","status":"todo"},
      {"title":"眼睛与视力的矫正（近视、远视）","status":"todo"},
      {"title":"照相机、投影仪、放大镜成像原理","status":"todo"},
      {"title":"焦点、焦距与三条特殊光线作图","status":"todo"}
    ] },
    { title: "物态变化", points: [
      {"title":"温度与温度计的使用","status":"todo"},
      {"title":"熔化与凝固（晶体与非晶体）","status":"todo"},
      {"title":"汽化与液化（蒸发与沸腾）","status":"todo"},
      {"title":"升华与凝华","status":"todo"},
      {"title":"水循环与自然界的物态变化","status":"todo"}
    ] },
    { title: "质量与密度", points: [
      {"title":"质量及其测量（天平的使用）","status":"todo"},
      {"title":"密度的概念与公式","status":"todo"},
      {"title":"密度的测量（量筒法）","status":"todo"},
      {"title":"密度与物质鉴别","status":"todo"},
      {"title":"密度与温度、物态变化的关系","status":"todo"}
    ] },
    { title: "机械运动", points: [
      {"title":"长度和时间的测量及误差","status":"todo"},
      {"title":"参照物与运动的相对性","status":"todo"},
      {"title":"速度的概念与计算","status":"todo"},
      {"title":"匀速直线运动与变速运动","status":"todo"},
      {"title":"平均速度的测量","status":"todo"}
    ] },
    { title: "力与运动", points: [
      {"title":"力的概念、三要素与示意图","status":"todo"},
      {"title":"重力、弹力与摩擦力","status":"todo"},
      {"title":"牛顿第一定律与惯性","status":"todo"},
      {"title":"二力平衡的条件","status":"todo"},
      {"title":"力的合成（同一直线上）","status":"todo"}
    ] },
    { title: "压强", points: [
      {"title":"压强的概念与计算","status":"todo"},
      {"title":"增大与减小压强的方法","status":"todo"},
      {"title":"液体压强及其特点","status":"todo"},
      {"title":"连通器与帕斯卡原理","status":"todo"},
      {"title":"大气压强与托里拆利实验","status":"todo"},
      {"title":"流体压强与流速的关系","status":"todo"}
    ] },
    { title: "浮力", points: [
      {"title":"浮力的产生原因与测量","status":"todo"},
      {"title":"阿基米德原理","status":"todo"},
      {"title":"物体的浮沉条件","status":"todo"},
      {"title":"浮力的应用（轮船、潜水艇、密度计、气球）","status":"todo"}
    ] },
    { title: "功和机械能", points: [
      {"title":"功的概念与计算","status":"todo"},
      {"title":"功率的概念与计算","status":"todo"},
      {"title":"动能、势能及其影响因素","status":"todo"},
      {"title":"机械能及其转化","status":"todo"},
      {"title":"杠杆及其平衡条件","status":"todo"},
      {"title":"滑轮、滑轮组与机械效率","status":"todo"}
    ] },
    { title: "内能与热学", points: [
      {"title":"分子热运动与内能","status":"todo"},
      {"title":"温度、热量与内能的关系","status":"todo"},
      {"title":"比热容与热量计算","status":"todo"},
      {"title":"内能的改变（做功与热传递）","status":"todo"},
      {"title":"热机与能量转化（汽油机、柴油机）","status":"todo"},
      {"title":"燃料的热值与能量守恒","status":"todo"}
    ] },
    { title: "电流和电路", points: [
      {"title":"两种电荷与电荷间相互作用","status":"todo"},
      {"title":"电流的形成与方向","status":"todo"},
      {"title":"电路的组成与三种状态","status":"todo"},
      {"title":"串联与并联电路的识别与连接","status":"todo"},
      {"title":"电流表的使用与电流规律","status":"todo"},
      {"title":"电路图的绘制","status":"todo"}
    ] },
    { title: "电压与电阻", points: [
      {"title":"电压的概念与电压表的使用","status":"todo"},
      {"title":"串、并联电路电压规律","status":"todo"},
      {"title":"电阻及其影响因素","status":"todo"},
      {"title":"变阻器的原理与使用","status":"todo"},
      {"title":"导体与绝缘体","status":"todo"}
    ] },
    { title: "欧姆定律", points: [
      {"title":"探究电流与电压、电阻的关系","status":"todo"},
      {"title":"欧姆定律及其应用","status":"todo"},
      {"title":"串、并联电路电阻的计算","status":"todo"},
      {"title":"伏安法测电阻","status":"todo"},
      {"title":"欧姆定律在电路分析中的应用","status":"todo"}
    ] },
    { title: "电功率", points: [
      {"title":"电能与电能表","status":"todo"},
      {"title":"电功的概念与计算","status":"todo"},
      {"title":"电功率的概念与计算","status":"todo"},
      {"title":"测量小灯泡的电功率","status":"todo"},
      {"title":"焦耳定律与电流的热效应","status":"todo"},
      {"title":"额定功率与实际功率","status":"todo"}
    ] },
    { title: "生活用电", points: [
      {"title":"家庭电路的组成","status":"todo"},
      {"title":"三线插头与漏电保护","status":"todo"},
      {"title":"保险丝与空气开关","status":"todo"},
      {"title":"触电的原因与安全用电常识","status":"todo"}
    ] },
    { title: "电与磁", points: [
      {"title":"磁现象与磁场","status":"todo"},
      {"title":"奥斯特实验与电流的磁效应","status":"todo"},
      {"title":"通电螺线管与电磁铁","status":"todo"},
      {"title":"磁场对通电导线的作用与电动机","status":"todo"},
      {"title":"电磁感应与发电机","status":"todo"}
    ] },
    { title: "信息、能源与可持续发展", points: [
      {"title":"电磁波及其传播","status":"todo"},
      {"title":"现代通信（电话、广播、电视、移动通信）","status":"todo"},
      {"title":"能源家族与核能","status":"todo"},
      {"title":"能量的转化与守恒定律","status":"todo"},
      {"title":"能源与可持续发展","status":"todo"}
    ] }
  ] },
  { subject: "chemistry", scope: "chuzhong", discipline: "chemistry", topics: [
    { title: "走进化学世界(科学探究与实验基础)", points: [
      {"title":"物质的变化:物理变化与化学变化的判别","status":"todo"},
      {"title":"物质的性质:物理性质与化学性质","status":"todo"},
      {"title":"化学是研究物质的科学(化学研究对象)","status":"todo"},
      {"title":"常用仪器的名称、用途与使用","status":"todo"},
      {"title":"药品的取用规则(固体、液体)","status":"todo"},
      {"title":"物质的加热与酒精灯的使用","status":"todo"},
      {"title":"仪器的连接与洗涤","status":"todo"},
      {"title":"科学探究的基本环节与方法","status":"todo"}
    ] },
    { title: "我们周围的空气", points: [
      {"title":"空气的成分及各成分的体积分数","status":"todo"},
      {"title":"测定空气中氧气含量的实验","status":"todo"},
      {"title":"纯净物与混合物的区别","status":"todo"},
      {"title":"氧气的物理性质与化学性质(助燃性、氧化性)","status":"todo"},
      {"title":"氧气的实验室制法(分解过氧化氢、加热高锰酸钾)","status":"todo"},
      {"title":"催化剂与催化作用","status":"todo"},
      {"title":"氧气的工业制法与用途","status":"todo"},
      {"title":"空气污染及防治、保护大气环境","status":"todo"}
    ] },
    { title: "物质构成的奥秘", points: [
      {"title":"分子、原子的概念与性质","status":"todo"},
      {"title":"用微粒观点解释常见现象","status":"todo"},
      {"title":"原子的构成(质子、中子、电子)","status":"todo"},
      {"title":"原子核外电子的排布与离子的形成","status":"todo"},
      {"title":"相对原子质量","status":"todo"},
      {"title":"元素的概念与元素符号","status":"todo"},
      {"title":"元素周期表的简单认识","status":"todo"},
      {"title":"离子及离子符号","status":"todo"}
    ] },
    { title: "自然界的水", points: [
      {"title":"水的组成(电解水实验)","status":"todo"},
      {"title":"氢气的性质与检验","status":"todo"},
      {"title":"纯水与自然水、硬水与软水","status":"todo"},
      {"title":"水的净化(沉淀、过滤、吸附、蒸馏)","status":"todo"},
      {"title":"过滤操作的方法与要点","status":"todo"},
      {"title":"爱护水资源与防治水污染","status":"todo"},
      {"title":"化学式的意义与书写","status":"todo"},
      {"title":"化合价及根据化合价写化学式","status":"todo"},
      {"title":"有关相对分子质量与元素质量分数的计算","status":"todo"}
    ] },
    { title: "化学方程式与质量守恒", points: [
      {"title":"质量守恒定律及其微观解释","status":"todo"},
      {"title":"化学方程式的意义","status":"todo"},
      {"title":"化学方程式的书写与配平","status":"todo"},
      {"title":"根据化学方程式的简单计算","status":"todo"},
      {"title":"化学反应的基本类型(化合、分解、置换、复分解)","status":"todo"}
    ] },
    { title: "碳和碳的氧化物", points: [
      {"title":"碳单质的多样性(金刚石、石墨、C60、活性炭)","status":"todo"},
      {"title":"碳的化学性质(稳定性、还原性、可燃性)","status":"todo"},
      {"title":"二氧化碳的实验室制法","status":"todo"},
      {"title":"二氧化碳的性质(物理性质、与水及石灰水反应)","status":"todo"},
      {"title":"二氧化碳的用途与对环境的影响(温室效应)","status":"todo"},
      {"title":"一氧化碳的性质(可燃性、还原性、毒性)","status":"todo"},
      {"title":"低碳生活与碳循环","status":"todo"}
    ] },
    { title: "燃烧与能源利用", points: [
      {"title":"燃烧的条件","status":"todo"},
      {"title":"灭火的原理与方法","status":"todo"},
      {"title":"易燃易爆物的安全知识","status":"todo"},
      {"title":"完全燃烧与不完全燃烧","status":"todo"},
      {"title":"化石燃料(煤、石油、天然气)及其综合利用","status":"todo"},
      {"title":"使用燃料对环境的影响与防治","status":"todo"},
      {"title":"清洁能源与新能源的开发利用","status":"todo"}
    ] },
    { title: "金属和金属材料", points: [
      {"title":"金属的物理性质与合金","status":"todo"},
      {"title":"金属与氧气、酸的反应","status":"todo"},
      {"title":"金属活动性顺序及其应用","status":"todo"},
      {"title":"金属与盐溶液的置换反应","status":"todo"},
      {"title":"铁的冶炼原理","status":"todo"},
      {"title":"金属的锈蚀与防护","status":"todo"},
      {"title":"金属资源的保护与利用","status":"todo"}
    ] },
    { title: "溶液", points: [
      {"title":"溶液的概念、组成与特征","status":"todo"},
      {"title":"溶解过程中的吸热与放热现象","status":"todo"},
      {"title":"乳化现象与乳化剂","status":"todo"},
      {"title":"饱和溶液与不饱和溶液","status":"todo"},
      {"title":"溶解度及溶解度曲线","status":"todo"},
      {"title":"结晶的方法(蒸发结晶、降温结晶)","status":"todo"},
      {"title":"溶质质量分数及其计算","status":"todo"},
      {"title":"一定溶质质量分数溶液的配制","status":"todo"}
    ] },
    { title: "酸和碱", points: [
      {"title":"常见的酸(盐酸、硫酸)的性质与用途","status":"todo"},
      {"title":"酸的通性","status":"todo"},
      {"title":"常见的碱(氢氧化钠、氢氧化钙)的性质与用途","status":"todo"},
      {"title":"碱的通性","status":"todo"},
      {"title":"酸碱指示剂及其变色","status":"todo"},
      {"title":"溶液的酸碱性与pH","status":"todo"},
      {"title":"中和反应及其应用","status":"todo"},
      {"title":"浓硫酸的腐蚀性与稀释操作安全","status":"todo"}
    ] },
    { title: "盐和化肥", points: [
      {"title":"常见的盐(氯化钠、碳酸钠、碳酸钙等)及用途","status":"todo"},
      {"title":"复分解反应发生的条件","status":"todo"},
      {"title":"盐的化学性质","status":"todo"},
      {"title":"碳酸根、铵根等常见离子的检验","status":"todo"},
      {"title":"粗盐的提纯","status":"todo"},
      {"title":"化学肥料(氮肥、磷肥、钾肥、复合肥)","status":"todo"},
      {"title":"化肥的合理使用与简单鉴别","status":"todo"}
    ] },
    { title: "化学与社会发展", points: [
      {"title":"有机化合物与有机合成材料(塑料、合成纤维、合成橡胶)","status":"todo"},
      {"title":"白色污染及防治","status":"todo"},
      {"title":"人体所需的营养物质与微量元素","status":"todo"},
      {"title":"金属材料、无机非金属材料与复合材料","status":"todo"},
      {"title":"化学物质与健康、安全用药与有害物质","status":"todo"},
      {"title":"化学与能源、资源、环境保护","status":"todo"},
      {"title":"绿色化学与可持续发展","status":"todo"}
    ] }
  ] },
  { subject: "biology", scope: "chuzhong", discipline: "biology", dir: "素质探索", topics: [
    { title: "身边的生命", points: [
      { title: "逛植物园 · 海洋馆 · 博物馆:出门看自然", ref: "mh-bio-campus-observe" },
      { title: "养一盆植物的观察记录", status: "todo" },
      { title: "显微镜下的小世界", status: "todo" } ] },
    { title: "看纪录片学科学", points: [
      { title: "《地球脉动》看什么", ref: "mh-bio-documentary" },
      { title: "动物的生存策略", status: "todo" },
      { title: "海洋里的奇妙生物", status: "todo" } ] },
    { title: "人体与健康", points: [
      { title: "我们怎么呼吸和消化", status: "todo" },
      { title: "睡眠与运动的科学", status: "todo" },
      { title: "细菌、病毒与免疫", status: "todo" } ] },
    { title: "自然与生态", points: [
      { title: "食物链与食物网", ref: "mh-bio-food-chain" },
      { title: "四季与候鸟迁徙", status: "todo" },
      { title: "保护环境我能做什么", status: "todo" } ] },
    { title: "动手探索", points: [
      { title: "做一次简单的小实验", status: "todo" },
      { title: "写一份自然观察笔记", status: "todo" },
      { title: "提一个好问题并查资料", status: "todo" } ] }
  ] },
  { subject: "politics", scope: "chuzhong", discipline: "politics-sci", topics: [
    { title: "成长中的我:自我认识与青春期", points: [
      {"title":"正确认识自我:生理自我、心理自我与社会自我","status":"todo"},
      {"title":"接纳和欣赏自己,做更好的自己","status":"todo"},
      {"title":"青春期的生理变化与心理矛盾","status":"todo"},
      {"title":"青春期的情绪特点与情绪管理","status":"todo"},
      {"title":"男生女生的性别角色与正常交往","status":"todo"},
      {"title":"自尊自信与自立自强","status":"todo"},
      {"title":"培养批判精神与开发创造潜力","status":"todo"},
      {"title":"止于至善与慎独的修身追求","status":"todo"}
    ] },
    { title: "做情绪情感的主人", points: [
      {"title":"情绪的多样性与复杂性","status":"todo"},
      {"title":"情绪的合理调节方法(转移、宣泄、放松)","status":"todo"},
      {"title":"情感的内涵与作用","status":"todo"},
      {"title":"传递情感正能量,体味美好情感","status":"todo"},
      {"title":"在生活中磨砺意志、培养积极心态","status":"todo"},
      {"title":"应对挫折,提升心理韧性","status":"todo"}
    ] },
    { title: "生命的思考与珍爱生命", points: [
      {"title":"生命的特点:独特、不可逆、有限与延续","status":"todo"},
      {"title":"敬畏生命:珍爱自己的生命也尊重他人的生命","status":"todo"},
      {"title":"守护生命:养成健康的生活方式与防范风险","status":"todo"},
      {"title":"增强自我保护意识与安全自救能力","status":"todo"},
      {"title":"探问生命的意义,活出生命的精彩","status":"todo"},
      {"title":"生命至上与人的精神生命的传承","status":"todo"}
    ] },
    { title: "交往与友谊:同伴、师长与家庭", points: [
      {"title":"友谊的特质与建立真挚友谊","status":"todo"},
      {"title":"呵护友谊,正确处理交友中的问题","status":"todo"},
      {"title":"网络交往的两面性与理性上网","status":"todo"},
      {"title":"尊师重教,建立良好师生关系","status":"todo"},
      {"title":"孝亲敬长,体味亲情与家的意味","status":"todo"},
      {"title":"化解亲子冲突,营造和谐家庭","status":"todo"},
      {"title":"学会换位思考、平等待人与诚信交往","status":"todo"}
    ] },
    { title: "在集体中成长", points: [
      {"title":"集体的温暖与个人成长的关系","status":"todo"},
      {"title":"集体生活成就自我,涵养品格","status":"todo"},
      {"title":"个人意愿与集体规则的协调","status":"todo"},
      {"title":"处理小群体与集体的关系","status":"todo"},
      {"title":"在共建美好集体中承担责任与担当","status":"todo"},
      {"title":"团结合作与集体荣誉感","status":"todo"}
    ] },
    { title: "走进社会生活与亲社会行为", points: [
      {"title":"个人与社会的关系,人的社会性","status":"todo"},
      {"title":"养成亲社会行为,服务和奉献社会","status":"todo"},
      {"title":"合理利用网络,理性参与网络生活","status":"todo"},
      {"title":"传播网络正能量,遵守网络道德与法律","status":"todo"},
      {"title":"社会规则的意义:维护秩序、保障自由","status":"todo"},
      {"title":"自觉遵守规则与维护、改进规则","status":"todo"}
    ] },
    { title: "遵守社会规则:道德与文明", points: [
      {"title":"尊重他人是交往的起码要求","status":"todo"},
      {"title":"以礼待人,做文明有礼的人","status":"todo"},
      {"title":"诚实守信是中华民族传统美德与立身之本","status":"todo"},
      {"title":"践行社会主义核心价值观(三个层面)","status":"todo"},
      {"title":"弘扬中华传统美德与中华人文精神","status":"todo"},
      {"title":"服务社会、奉献社会,实现人生价值","status":"todo"}
    ] },
    { title: "法律与我们同行:法治观念", points: [
      {"title":"法律的特征与作用(规范、保护)","status":"todo"},
      {"title":"法律保障生活,法治是治国理政的基本方式","status":"todo"},
      {"title":"全面依法治国与建设社会主义法治国家","status":"todo"},
      {"title":"未成年人受法律特殊保护(家庭、学校、社会、网络、政府、司法)","status":"todo"},
      {"title":"善用法律,依法维护自身合法权益","status":"todo"},
      {"title":"违法行为的类别与刑事责任","status":"todo"},
      {"title":"加强自我防范,预防未成年人犯罪","status":"todo"},
      {"title":"法不可违,远离犯罪,做守法公民","status":"todo"}
    ] },
    { title: "宪法至上与公民权利义务", points: [
      {"title":"宪法是国家的根本法,具有最高法律效力","status":"todo"},
      {"title":"国家权力属于人民,人权受宪法和法律保护","status":"todo"},
      {"title":"国家机构:人大、行政、监察、审判、检察机关","status":"todo"},
      {"title":"权力的行使需要监督,坚持权由法定","status":"todo"},
      {"title":"公民基本权利(政治、人身、财产、社会经济、文化教育等)","status":"todo"},
      {"title":"公民基本义务及权利义务相统一","status":"todo"},
      {"title":"依法行使权利、依法履行义务","status":"todo"},
      {"title":"增强宪法意识,坚持宪法至上","status":"todo"}
    ] },
    { title: "崇尚法治精神与建设法治中国", points: [
      {"title":"自由与法治的关系,法治标定自由界限","status":"todo"},
      {"title":"平等的真谛与践行平等","status":"todo"},
      {"title":"公平的内涵与守护社会公平","status":"todo"},
      {"title":"正义的力量与守护社会正义","status":"todo"},
      {"title":"科学立法、严格执法、公正司法、全民守法","status":"todo"},
      {"title":"厉行法治,坚持依法治国与以德治国相结合","status":"todo"}
    ] },
    { title: "我们的政治生活与民主", points: [
      {"title":"中国共产党的领导是中国特色社会主义最本质特征","status":"todo"},
      {"title":"人民代表大会制度是根本政治制度","status":"todo"},
      {"title":"基本政治制度:政党制度、民族区域自治、基层群众自治","status":"todo"},
      {"title":"社会主义民主是新型的真实民主(全过程人民民主)","status":"todo"},
      {"title":"公民参与民主的途径:民主选举、决策、监督","status":"todo"},
      {"title":"增强民主意识,提高民主参与能力","status":"todo"}
    ] },
    { title: "我们的经济社会发展", points: [
      {"title":"改革开放是决定当代中国命运的关键一招","status":"todo"},
      {"title":"坚持以人民为中心,坚持共同富裕","status":"todo"},
      {"title":"创新驱动发展,建设创新型国家","status":"todo"},
      {"title":"基本经济制度与社会主义市场经济","status":"todo"},
      {"title":"五位一体总体布局与高质量发展","status":"todo"},
      {"title":"人口、资源、环境国情与可持续发展战略","status":"todo"},
      {"title":"坚持绿色发展,建设生态文明与美丽中国","status":"todo"}
    ] },
    { title: "中华文化与民族精神", points: [
      {"title":"中华文化源远流长、博大精深及其价值","status":"todo"},
      {"title":"坚定文化自信,推动中华优秀传统文化创造性转化","status":"todo"},
      {"title":"中华民族精神的内涵(以爱国主义为核心)","status":"todo"},
      {"title":"弘扬和培育民族精神,弘扬时代精神","status":"todo"},
      {"title":"民族团结:平等团结互助和谐的民族关系","status":"todo"},
      {"title":"维护国家统一,反对分裂,实现祖国完全统一","status":"todo"}
    ] },
    { title: "和谐与梦想:国情与复兴", points: [
      {"title":"我国仍处于社会主义初级阶段的基本国情","status":"todo"},
      {"title":"中国共产党的初心使命与社会主要矛盾","status":"todo"},
      {"title":"中国梦的内涵:国家富强、民族振兴、人民幸福","status":"todo"},
      {"title":"\"两步走\"战略安排与全面建成社会主义现代化强国","status":"todo"},
      {"title":"维护国家安全,树立总体国家安全观","status":"todo"},
      {"title":"坚持\"一国两制\",推进祖国统一大业","status":"todo"}
    ] },
    { title: "世界舞台上的中国与人类命运共同体", points: [
      {"title":"经济全球化与世界相互联系、相互依存","status":"todo"},
      {"title":"中国是世界和平的建设者、发展的贡献者、秩序的维护者","status":"todo"},
      {"title":"中国的国际地位、责任与担当","status":"todo"},
      {"title":"构建人类命运共同体,共建美好世界","status":"todo"},
      {"title":"开放、合作、共赢的发展理念与共建\"一带一路\"","status":"todo"},
      {"title":"应对全球性问题,共同促进人类可持续发展","status":"todo"}
    ] },
    { title: "走向未来的少年:理想、责任与选择", points: [
      {"title":"角色与责任,我对谁负责、谁对我负责","status":"todo"},
      {"title":"做负责任的人,承担责任不言代价与回报","status":"todo"},
      {"title":"树立远大理想,把个人梦融入中国梦","status":"todo"},
      {"title":"少年当自强,担当民族复兴大任","status":"todo"},
      {"title":"面对升学与职业的多种选择,规划生涯","status":"todo"},
      {"title":"立志成为德智体美劳全面发展的时代新人","status":"todo"}
    ] }
  ] },
  { subject: "history", scope: "chuzhong", discipline: "china-history", topics: [
    { title: "史前时期与中国早期国家的产生(中国古代史一)", points: [
      {"title":"元谋人、北京人与山顶洞人等远古人类","status":"todo"},
      {"title":"河姆渡与半坡遗址：原始农耕文明","status":"todo"},
      {"title":"炎帝、黄帝与华夏族的形成、尧舜禹禅让","status":"todo"},
      {"title":"夏朝建立与世袭制取代禅让制","status":"todo"},
      {"title":"商朝青铜文明与甲骨文","status":"todo"},
      {"title":"西周分封制与宗法制","status":"todo"},
      {"title":"春秋争霸与战国七雄","status":"todo"},
      {"title":"百家争鸣：孔子、老子与诸子学说","status":"todo"}
    ] },
    { title: "统一多民族国家的建立与巩固(中国古代史二:秦汉)", points: [
      {"title":"秦灭六国统一全国","status":"todo"},
      {"title":"秦朝中央集权制度：皇帝制、郡县制","status":"todo"},
      {"title":"秦朝巩固统一的措施:统一文字、货币、度量衡","status":"todo"},
      {"title":"秦末农民起义与秦朝灭亡","status":"todo"},
      {"title":"西汉建立与文景之治","status":"todo"},
      {"title":"汉武帝大一统:罢黜百家、推恩令、盐铁专卖","status":"todo"},
      {"title":"丝绸之路与张骞通西域","status":"todo"},
      {"title":"两汉科技与文化:造纸术、《史记》、佛教传入","status":"todo"}
    ] },
    { title: "政权分立与民族交融(中国古代史三:三国两晋南北朝)", points: [
      {"title":"官渡之战、赤壁之战与三国鼎立","status":"todo"},
      {"title":"西晋的统一与短暂、八王之乱","status":"todo"},
      {"title":"东晋南朝与江南地区的开发","status":"todo"},
      {"title":"北魏孝文帝改革与民族交融","status":"todo"},
      {"title":"魏晋南北朝的科技与文化:祖冲之、书法、石窟艺术","status":"todo"}
    ] },
    { title: "繁荣与开放的时代(中国古代史四:隋唐)", points: [
      {"title":"隋朝统一、大运河的开凿","status":"todo"},
      {"title":"科举制的创立与发展","status":"todo"},
      {"title":"唐朝建立与贞观之治、开元盛世","status":"todo"},
      {"title":"唐与周边民族的关系:文成公主入藏","status":"todo"},
      {"title":"唐朝中外交流:遣唐使、玄奘西行、鉴真东渡","status":"todo"},
      {"title":"安史之乱与唐朝衰亡","status":"todo"},
      {"title":"隋唐的文化:唐诗、雕版印刷术","status":"todo"}
    ] },
    { title: "民族关系发展与社会变化(中国古代史五:辽宋夏金元)", points: [
      {"title":"北宋的建立与中央集权的加强","status":"todo"},
      {"title":"辽、西夏、金与两宋的并立与和战","status":"todo"},
      {"title":"宋代经济重心南移与商业繁荣","status":"todo"},
      {"title":"宋元时期的科技:活字印刷术、指南针、火药","status":"todo"},
      {"title":"宋代社会生活与宋词、元曲","status":"todo"},
      {"title":"成吉思汗统一蒙古与元朝建立","status":"todo"},
      {"title":"元朝行省制度与对边疆的管辖","status":"todo"},
      {"title":"宋元海外贸易与对外交往","status":"todo"}
    ] },
    { title: "统一多民族国家的巩固与发展(中国古代史六:明清)", points: [
      {"title":"明朝建立与君主专制强化:废丞相、设厂卫","status":"todo"},
      {"title":"郑和下西洋与海上丝绸之路","status":"todo"},
      {"title":"明朝抗倭与戚继光","status":"todo"},
      {"title":"清朝统治的建立与君主专制顶峰:军机处、文字狱","status":"todo"},
      {"title":"清朝对边疆的治理:平定叛乱、设驻藏大臣、统一台湾","status":"todo"},
      {"title":"明清的闭关锁国政策","status":"todo"},
      {"title":"明清经济:农业、手工业与商帮","status":"todo"},
      {"title":"明清科技与文化:四大名著、《本草纲目》《天工开物》","status":"todo"}
    ] },
    { title: "中国开始沦为半殖民地半封建社会(中国近代史一)", points: [
      {"title":"鸦片战争与《南京条约》","status":"todo"},
      {"title":"第二次鸦片战争与火烧圆明园","status":"todo"},
      {"title":"太平天国运动","status":"todo"},
      {"title":"洋务运动:自强求富与近代工业兴起","status":"todo"},
      {"title":"甲午中日战争与《马关条约》","status":"todo"},
      {"title":"戊戌变法(百日维新)","status":"todo"},
      {"title":"八国联军侵华与《辛丑条约》","status":"todo"}
    ] },
    { title: "资产阶级民主革命与新民主主义革命兴起(中国近代史二)", points: [
      {"title":"孙中山与三民主义、辛亥革命","status":"todo"},
      {"title":"中华民国建立与《中华民国临时约法》","status":"todo"},
      {"title":"新文化运动与民主科学思潮","status":"todo"},
      {"title":"五四运动与马克思主义的传播","status":"todo"},
      {"title":"中国共产党的成立","status":"todo"},
      {"title":"第一次国共合作与北伐战争","status":"todo"},
      {"title":"南昌起义、井冈山道路与红军长征","status":"todo"}
    ] },
    { title: "中华民族的抗日战争与人民解放战争(中国近代史三)", points: [
      {"title":"九一八事变与局部抗战","status":"todo"},
      {"title":"西安事变与抗日民族统一战线初步形成","status":"todo"},
      {"title":"七七事变与全面抗战爆发、南京大屠杀","status":"todo"},
      {"title":"正面战场与敌后战场的抗战","status":"todo"},
      {"title":"中共七大与抗日战争的胜利及意义","status":"todo"},
      {"title":"重庆谈判与全面内战爆发","status":"todo"},
      {"title":"三大战役与渡江战役、国民党统治覆灭","status":"todo"}
    ] },
    { title: "中华人民共和国的成立与社会主义建设(中国现代史)", points: [
      {"title":"新中国成立与西藏和平解放","status":"todo"},
      {"title":"抗美援朝与土地改革","status":"todo"},
      {"title":"第一个五年计划与社会主义工业化起步","status":"todo"},
      {"title":"三大改造与社会主义制度的建立","status":"todo"},
      {"title":"探索建设社会主义的曲折:大跃进、人民公社、文化大革命","status":"todo"},
      {"title":"中共十一届三中全会与改革开放","status":"todo"},
      {"title":"家庭联产承包责任制与经济特区、社会主义市场经济","status":"todo"},
      {"title":"民族区域自治、一国两制与港澳回归","status":"todo"},
      {"title":"现代科技、外交成就与中国特色社会主义新时代","status":"todo"}
    ] },
    { title: "世界古代史与近代社会的产生(世界史一)", points: [
      {"title":"古埃及、古巴比伦与《汉谟拉比法典》","status":"todo"},
      {"title":"古印度种姓制度与佛教的产生","status":"todo"},
      {"title":"古希腊雅典民主与古罗马的兴衰","status":"todo"},
      {"title":"西欧封建社会与基督教、阿拉伯帝国","status":"todo"},
      {"title":"文艺复兴运动","status":"todo"},
      {"title":"新航路开辟与早期殖民掠夺","status":"todo"}
    ] },
    { title: "资本主义制度的确立与殖民地人民的反抗(世界史二)", points: [
      {"title":"英国资产阶级革命与《权利法案》","status":"todo"},
      {"title":"美国独立战争与《独立宣言》、1787年宪法","status":"todo"},
      {"title":"法国大革命与《人权宣言》、拿破仑","status":"todo"},
      {"title":"第一次工业革命与蒸汽时代","status":"todo"},
      {"title":"马克思主义的诞生与《共产党宣言》","status":"todo"},
      {"title":"美国南北战争与俄国农奴制改革、日本明治维新","status":"todo"},
      {"title":"第二次工业革命与电气时代","status":"todo"}
    ] },
    { title: "两次世界大战、社会主义运动与当代世界(世界史三)", points: [
      {"title":"第一次世界大战与凡尔赛—华盛顿体系","status":"todo"},
      {"title":"俄国十月革命与苏联社会主义建设","status":"todo"},
      {"title":"1929—1933年经济大危机与罗斯福新政","status":"todo"},
      {"title":"法西斯势力与第二次世界大战","status":"todo"},
      {"title":"冷战、两极格局与美苏争霸","status":"todo"},
      {"title":"战后资本主义发展、欧洲联合与日本崛起","status":"todo"},
      {"title":"亚非拉国家的独立与振兴","status":"todo"},
      {"title":"世界多极化趋势、经济全球化与第三次科技革命","status":"todo"}
    ] }
  ] },
  { subject: "geography", scope: "chuzhong", discipline: "geography-sci", topics: [
    { title: "地球与地球仪", points: [
      {"title":"地球的形状和大小","status":"todo"},
      {"title":"地球仪与经线、纬线","status":"todo"},
      {"title":"经度和纬度的划分","status":"todo"},
      {"title":"利用经纬网确定地理位置","status":"todo"},
      {"title":"东西半球与南北半球的划分","status":"todo"},
      {"title":"地球的自转及其地理意义(昼夜更替、时差)","status":"todo"},
      {"title":"地球的公转及其地理意义(四季更替、五带划分)","status":"todo"}
    ] },
    { title: "地图", points: [
      {"title":"地图的三要素(比例尺、方向、图例)","status":"todo"},
      {"title":"比例尺的表示方法与大小比较","status":"todo"},
      {"title":"在地图上判别方向","status":"todo"},
      {"title":"等高线地形图的判读","status":"todo"},
      {"title":"陆地五种基本地形(山地、丘陵、高原、平原、盆地)","status":"todo"},
      {"title":"根据需要选择合适的地图","status":"todo"}
    ] },
    { title: "陆地和海洋", points: [
      {"title":"海陆分布概况(七分海洋三分陆地)","status":"todo"},
      {"title":"七大洲的名称、分布与轮廓","status":"todo"},
      {"title":"四大洋的名称与分布","status":"todo"},
      {"title":"大洲的分界线","status":"todo"},
      {"title":"海陆变迁与证据","status":"todo"},
      {"title":"大陆漂移假说与板块构造学说","status":"todo"},
      {"title":"世界主要火山、地震带的分布","status":"todo"}
    ] },
    { title: "天气与气候", points: [
      {"title":"天气与气候的区别","status":"todo"},
      {"title":"常用天气符号与天气预报","status":"todo"},
      {"title":"气温的分布与等温线判读","status":"todo"},
      {"title":"世界气温的分布规律","status":"todo"},
      {"title":"降水的分布与等降水量线","status":"todo"},
      {"title":"影响气候的主要因素(纬度、海陆、地形)","status":"todo"},
      {"title":"世界主要气候类型及其分布","status":"todo"},
      {"title":"气候对生产生活的影响","status":"todo"}
    ] },
    { title: "居民与聚落", points: [
      {"title":"世界人口的增长与分布","status":"todo"},
      {"title":"人口问题及其影响","status":"todo"},
      {"title":"世界三大人种及其分布","status":"todo"},
      {"title":"世界主要语言与宗教","status":"todo"},
      {"title":"乡村聚落与城市聚落","status":"todo"},
      {"title":"聚落的形成、发展与保护","status":"todo"}
    ] },
    { title: "发展与合作", points: [
      {"title":"国家和地区概况","status":"todo"},
      {"title":"发达国家与发展中国家的差异","status":"todo"},
      {"title":"南北对话与南南合作","status":"todo"},
      {"title":"国际经济合作的意义","status":"todo"},
      {"title":"联合国等主要国际组织","status":"todo"}
    ] },
    { title: "认识大洲(以亚洲为例)", points: [
      {"title":"亚洲的地理位置与范围","status":"todo"},
      {"title":"亚洲的地形特征与河流分布","status":"todo"},
      {"title":"亚洲的气候特征及其复杂性","status":"todo"},
      {"title":"亚洲的人口与人文环境","status":"todo"},
      {"title":"分析大洲自然环境的一般方法","status":"todo"}
    ] },
    { title: "认识地区", points: [
      {"title":"东南亚的位置、地形与物产","status":"todo"},
      {"title":"中东地区的石油资源与地缘特征","status":"todo"},
      {"title":"欧洲西部的工业与旅游业","status":"todo"},
      {"title":"撒哈拉以南非洲的自然与经济特征","status":"todo"},
      {"title":"极地地区(南极、北极)的环境与科考","status":"todo"},
      {"title":"区域自然环境对人类活动的影响","status":"todo"}
    ] },
    { title: "认识国家", points: [
      {"title":"日本的自然环境与经济特点","status":"todo"},
      {"title":"印度的人口、农业与工业","status":"todo"},
      {"title":"俄罗斯的资源与工业分布","status":"todo"},
      {"title":"美国的农业地区专业化与高新技术产业","status":"todo"},
      {"title":"巴西的热带雨林与开发保护","status":"todo"},
      {"title":"澳大利亚的特有生物与矿产农牧业","status":"todo"}
    ] },
    { title: "中国的疆域与人口", points: [
      {"title":"中国的地理位置和疆域","status":"todo"},
      {"title":"34个省级行政区及其简称、行政中心","status":"todo"},
      {"title":"中国的人口数量、分布与人口政策","status":"todo"},
      {"title":"中国的民族构成与分布特点","status":"todo"},
      {"title":"中国的陆上邻国与隔海相望国家","status":"todo"}
    ] },
    { title: "中国的自然环境", points: [
      {"title":"中国地势三级阶梯及主要地形区","status":"todo"},
      {"title":"中国主要山脉的走向与分布","status":"todo"},
      {"title":"中国气温与温度带的划分","status":"todo"},
      {"title":"中国降水分布与干湿地区","status":"todo"},
      {"title":"季风气候及其影响","status":"todo"},
      {"title":"长江的水文特征与开发利用","status":"todo"},
      {"title":"黄河的水文特征与治理","status":"todo"},
      {"title":"主要自然灾害及其防治","status":"todo"}
    ] },
    { title: "中国的自然资源", points: [
      {"title":"自然资源的总量与人均特点","status":"todo"},
      {"title":"土地资源的类型、分布与利用","status":"todo"},
      {"title":"水资源的时空分布与跨流域调水","status":"todo"},
      {"title":"水资源的合理利用与节约","status":"todo"},
      {"title":"海洋资源与矿产资源概况","status":"todo"}
    ] },
    { title: "中国的经济发展", points: [
      {"title":"交通运输方式的选择与铁路干线分布","status":"todo"},
      {"title":"农业的地区分布及其差异","status":"todo"},
      {"title":"因地制宜发展农业","status":"todo"},
      {"title":"工业的分布与主要工业基地","status":"todo"},
      {"title":"高新技术产业的发展","status":"todo"},
      {"title":"经济发展与区域协调","status":"todo"}
    ] },
    { title: "中国的地理差异与区域地理", points: [
      {"title":"四大地理区域的划分及界线","status":"todo"},
      {"title":"北方地区的自然特征与农业","status":"todo"},
      {"title":"南方地区的自然特征与农业","status":"todo"},
      {"title":"西北地区的干旱环境与农牧业","status":"todo"},
      {"title":"青藏地区的高寒环境与特色农牧业","status":"todo"},
      {"title":"北京、香港和澳门、台湾省的区域特征","status":"todo"},
      {"title":"黄土高原的水土流失与治理","status":"todo"},
      {"title":"长江三角洲、珠江三角洲的区域发展","status":"todo"}
    ] }
  ] },
  { subject: "chinese", scope: "gaokao", discipline: "chinese-lit", topics: [
    { title: "现代文阅读I·信息类文本阅读", points: [
      {"title":"论述类与实用类文本的文体特征辨识","status":"todo"},
      {"title":"筛选并整合文中关键信息","status":"todo"},
      {"title":"概括论点、分论点与作者观点态度","status":"todo"},
      {"title":"分析论证结构、论证思路与行文脉络","status":"todo"},
      {"title":"辨析论证方法及其作用(举例、引用、对比、类比)","status":"todo"},
      {"title":"理解重要概念与重要句子的含义","status":"todo"},
      {"title":"依据文本进行合理推断与判断正误","status":"todo"},
      {"title":"多则材料的比较、整合与综合探究","status":"todo"},
      {"title":"分析材料的论证语言与逻辑严密性","status":"todo"}
    ] },
    { title: "现代文阅读II·文学类文本阅读", points: [
      {"title":"小说情节的概括、结构安排与作用分析","status":"todo"},
      {"title":"人物形象的概括与塑造手法分析","status":"todo"},
      {"title":"环境描写(自然/社会)的特点与作用","status":"todo"},
      {"title":"小说叙事视角、叙述人称与叙事节奏","status":"todo"},
      {"title":"散文的形散神聚与行文线索梳理","status":"todo"},
      {"title":"散文的意境、意象与情感主旨把握","status":"todo"},
      {"title":"重要语句、标题的含义与表达效果","status":"todo"},
      {"title":"表现手法、修辞手法及艺术特色赏析","status":"todo"},
      {"title":"作品主题意蕴与作者创作意图探究","status":"todo"},
      {"title":"文本的个性化阅读与审美体验表达","status":"todo"}
    ] },
    { title: "文言文阅读", points: [
      {"title":"常见文言实词的一词多义与古今异义","status":"todo"},
      {"title":"常见文言虚词(之、其、而、以、于、为等)的用法","status":"todo"},
      {"title":"词类活用(名作动、使动、意动、形作名等)","status":"todo"},
      {"title":"通假字的识别与本字推断","status":"todo"},
      {"title":"文言特殊句式(判断、被动、省略、倒装)","status":"todo"},
      {"title":"文言文断句(标点与语意停顿)","status":"todo"},
      {"title":"文言语句的准确翻译(信达雅)","status":"todo"},
      {"title":"古代文化常识(官职、礼仪、历法、称谓)","status":"todo"},
      {"title":"文本内容要点的概括与分析","status":"todo"},
      {"title":"主观简答题:筛选概括与原因分析","status":"todo"}
    ] },
    { title: "古代诗歌阅读", points: [
      {"title":"诗歌题材类型辨识(咏史、边塞、山水田园、送别、咏物等)","status":"todo"},
      {"title":"意象内涵与意境营造的赏析","status":"todo"},
      {"title":"思想情感与作者观点态度把握","status":"todo"},
      {"title":"表达技巧(借景抒情、托物言志、用典、虚实等)","status":"todo"},
      {"title":"修辞手法与炼字炼句的表达效果","status":"todo"},
      {"title":"诗歌语言风格的鉴赏","status":"todo"},
      {"title":"比较阅读(同题材、同作者、不同作品对比)","status":"todo"},
      {"title":"结合背景与注释理解诗歌","status":"todo"}
    ] },
    { title: "名篇名句默写", points: [
      {"title":"新课标必背篇目古诗文的准确识记","status":"todo"},
      {"title":"情境式默写(语境理解性填空)","status":"todo"},
      {"title":"易错字、形近字的正确书写","status":"todo"},
      {"title":"高中必修与选择性必修背诵篇目","status":"todo"},
      {"title":"初中阶段经典篇目的回顾巩固","status":"todo"}
    ] },
    { title: "语言文字运用", points: [
      {"title":"正确使用词语(实词、虚词、成语、熟语)","status":"todo"},
      {"title":"辨析并修改病句(语序、搭配、成分、逻辑)","status":"todo"},
      {"title":"语句衔接、连贯、得体与排序","status":"todo"},
      {"title":"补写句子与情境补全","status":"todo"},
      {"title":"压缩语段与提取关键信息","status":"todo"},
      {"title":"标点符号的正确使用与作用分析","status":"todo"},
      {"title":"修辞手法的判断、效果分析与表达运用","status":"todo"},
      {"title":"句式变换、仿写与语言表达准确鲜明生动","status":"todo"},
      {"title":"语段综合运用题(读写结合的真实语境)","status":"todo"}
    ] },
    { title: "写作", points: [
      {"title":"审题立意与材料作文的核心把握","status":"todo"},
      {"title":"议论文的论点提炼与思辨逻辑","status":"todo"},
      {"title":"议论文的论据选取、运用与论证方法","status":"todo"},
      {"title":"记叙文与抒情类文章的构思表达","status":"todo"},
      {"title":"文章结构布局与层次安排","status":"todo"},
      {"title":"任务驱动型作文的情境与文体要求","status":"todo"},
      {"title":"语言表达的准确、文采与个性","status":"todo"},
      {"title":"联系时代、传统文化与价值观的立意提升","status":"todo"}
    ] },
    { title: "整本书阅读与语文核心素养", points: [
      {"title":"《乡土中国》学术著作的概念与论证把握","status":"todo"},
      {"title":"《红楼梦》人物、情节与主题的整体理解","status":"todo"},
      {"title":"整本书阅读的方法(批注、梳理、专题探究)","status":"todo"},
      {"title":"语言建构与运用素养","status":"todo"},
      {"title":"思维发展与提升(逻辑、辩证、批判性思维)","status":"todo"},
      {"title":"审美鉴赏与创造","status":"todo"},
      {"title":"文化传承与理解(中华优秀传统文化)","status":"todo"}
    ] }
  ] },
  { subject: "math", scope: "gaokao", discipline: "math", topics: [
    { title: "集合与常用逻辑用语", points: [
      {"title":"集合的概念与表示","status":"todo"},
      {"title":"集合间的基本关系(子集、真子集)","status":"todo"},
      {"title":"集合的基本运算(交集、并集、补集)","status":"todo"},
      {"title":"充分条件与必要条件、充要条件","status":"todo"},
      {"title":"全称量词与存在量词","status":"todo"},
      {"title":"全称命题与特称命题的否定","status":"todo"}
    ] },
    { title: "函数概念与基本初等函数", points: [
      {"title":"函数的概念、定义域与值域","status":"todo"},
      {"title":"函数的单调性与最值","status":"todo"},
      {"title":"函数的奇偶性与对称性","status":"todo"},
      {"title":"函数的周期性","status":"todo"},
      {"title":"指数与指数函数","status":"todo"},
      {"title":"对数与对数函数","status":"todo"},
      {"title":"幂函数","status":"todo"},
      {"title":"函数的零点与方程的根、零点存在定理","status":"todo"},
      {"title":"函数模型及其应用","status":"todo"}
    ] },
    { title: "导数及其应用", points: [
      {"title":"导数的概念与几何意义","ref":"math-derivatives"},
      {"title":"基本初等函数的导数公式与运算法则","ref":"math-derivatives"},
      {"title":"复合函数的导数","ref":"math-derivatives"},
      {"title":"利用导数研究函数的单调性","ref":"math-derivatives"},
      {"title":"利用导数求函数的极值与最值","ref":"math-derivatives"},
      {"title":"导数在不等式证明中的应用","ref":"math-derivatives"},
      {"title":"导数在函数零点(方程根)问题中的应用","ref":"math-derivatives"}
    ] },
    { title: "三角函数与解三角形", points: [
      {"title":"任意角、弧度制与三角函数定义","status":"todo"},
      {"title":"同角三角函数关系与诱导公式","status":"todo"},
      {"title":"三角函数的图象与性质","status":"todo"},
      {"title":"函数y=Asin(ωx+φ)的图象与变换","status":"todo"},
      {"title":"两角和与差及二倍角公式","status":"todo"},
      {"title":"正弦定理与余弦定理","status":"todo"},
      {"title":"解三角形及其实际应用(面积、测量)","status":"todo"}
    ] },
    { title: "平面向量与复数", points: [
      {"title":"平面向量的概念与线性运算","status":"todo"},
      {"title":"平面向量基本定理与坐标表示","status":"todo"},
      {"title":"平面向量的数量积","status":"todo"},
      {"title":"向量的夹角、模与垂直平行的判定","status":"todo"},
      {"title":"平面向量的应用(几何与物理)","status":"todo"},
      {"title":"复数的概念与几何意义","status":"todo"},
      {"title":"复数的四则运算","status":"todo"}
    ] },
    { title: "数列", points: [
      {"title":"数列的概念与通项公式","status":"todo"},
      {"title":"等差数列及其前n项和","status":"todo"},
      {"title":"等比数列及其前n项和","status":"todo"},
      {"title":"由递推关系求通项公式","status":"todo"},
      {"title":"数列求和的常用方法(错位相减、裂项相消、分组求和)","status":"todo"},
      {"title":"数列的综合应用与不等式","status":"todo"}
    ] },
    { title: "不等式", points: [
      {"title":"等式与不等式的性质","status":"todo"},
      {"title":"一元二次不等式及其解法","status":"todo"},
      {"title":"基本不等式及其应用","status":"todo"},
      {"title":"含参数不等式与恒成立问题","status":"todo"}
    ] },
    { title: "立体几何", points: [
      {"title":"空间几何体的结构、表面积与体积","status":"todo"},
      {"title":"空间点、线、面的位置关系","status":"todo"},
      {"title":"直线、平面平行的判定与性质","status":"todo"},
      {"title":"直线、平面垂直的判定与性质","status":"todo"},
      {"title":"空间向量及其运算","status":"todo"},
      {"title":"利用空间向量求空间角(线线角、线面角、二面角)","status":"todo"},
      {"title":"利用空间向量求空间距离","status":"todo"}
    ] },
    { title: "平面解析几何", points: [
      {"title":"直线的方程与两直线位置关系","status":"todo"},
      {"title":"距离公式与对称问题","status":"todo"},
      {"title":"圆的方程与直线、圆的位置关系","status":"todo"},
      {"title":"椭圆的定义、标准方程与几何性质","status":"todo"},
      {"title":"双曲线的定义、标准方程与几何性质","status":"todo"},
      {"title":"抛物线的定义、标准方程与几何性质","status":"todo"},
      {"title":"直线与圆锥曲线的位置关系及综合问题","status":"todo"}
    ] },
    { title: "计数原理、排列组合与二项式定理", points: [
      {"title":"分类加法与分步乘法计数原理","status":"todo"},
      {"title":"排列与排列数","status":"todo"},
      {"title":"组合与组合数","status":"todo"},
      {"title":"二项式定理与通项公式","status":"todo"},
      {"title":"二项式系数的性质","status":"todo"}
    ] },
    { title: "概率", points: [
      {"title":"随机事件与古典概型","status":"todo"},
      {"title":"事件的关系、运算与概率基本性质","status":"todo"},
      {"title":"事件的相互独立性与条件概率","status":"todo"},
      {"title":"全概率公式与贝叶斯公式","status":"todo"},
      {"title":"离散型随机变量及其分布列","status":"todo"},
      {"title":"二项分布与超几何分布","status":"todo"},
      {"title":"随机变量的均值与方差","status":"todo"},
      {"title":"正态分布","status":"todo"}
    ] },
    { title: "统计与成对数据分析", points: [
      {"title":"抽样方法(分层随机抽样)","status":"todo"},
      {"title":"统计图表与样本数字特征","status":"todo"},
      {"title":"用样本估计总体(百分位数、方差)","status":"todo"},
      {"title":"成对数据的相关关系与相关系数","status":"todo"},
      {"title":"一元线性回归模型及最小二乘法","status":"todo"},
      {"title":"列联表与独立性检验","status":"todo"}
    ] }
  ] },
  { subject: "english", scope: "gaokao", discipline: "foreign-lit", topics: [
    { title: "词汇与构词", points: [
      {"title":"课标3000核心词汇的音、形、义掌握","status":"todo"},
      {"title":"一词多义与熟词生义","status":"todo"},
      {"title":"词性转换(名词、动词、形容词、副词互转)","status":"todo"},
      {"title":"前缀与后缀构词法(un-, dis-, re-, -tion, -able 等)","status":"todo"},
      {"title":"合成词与派生词","status":"todo"},
      {"title":"近义词、反义词辨析","status":"todo"},
      {"title":"高频短语动词与固定搭配","status":"todo"},
      {"title":"语境中的词义猜测","status":"todo"}
    ] },
    { title: "语法:词法基础", points: [
      {"title":"名词的数、所有格与可数不可数","status":"todo"},
      {"title":"冠词(a/an/the)与零冠词的用法","status":"todo"},
      {"title":"代词(人称、物主、反身、指示、不定代词)","status":"todo"},
      {"title":"数词、形容词与副词的比较等级","status":"todo"},
      {"title":"介词与介词短语","status":"todo"},
      {"title":"连词与并列结构","status":"todo"}
    ] },
    { title: "语法:动词与时态语态", points: [
      {"title":"一般、进行、完成各时态的构成与用法","status":"todo"},
      {"title":"过去将来时与完成进行时","status":"todo"},
      {"title":"主动语态与被动语态的转换","status":"todo"},
      {"title":"情态动词及其推测用法","status":"todo"},
      {"title":"虚拟语气(条件句、wish、suggest 等)","status":"todo"},
      {"title":"主谓一致","status":"todo"},
      {"title":"系动词与连系结构","status":"todo"}
    ] },
    { title: "语法:非谓语动词", points: [
      {"title":"动词不定式作各种成分","status":"todo"},
      {"title":"动名词作主语、宾语、定语","status":"todo"},
      {"title":"现在分词与过去分词的区别与用法","status":"todo"},
      {"title":"非谓语动词作状语与独立主格结构","status":"todo"},
      {"title":"非谓语动词的逻辑主语与时态语态","status":"todo"}
    ] },
    { title: "语法:句子与从句", points: [
      {"title":"陈述、疑问、祈使、感叹四种句类","status":"todo"},
      {"title":"简单句的五种基本句型","status":"todo"},
      {"title":"并列句与复合句","status":"todo"},
      {"title":"定语从句(关系代词、关系副词、非限制性)","status":"todo"},
      {"title":"名词性从句(主语、宾语、表语、同位语从句)","status":"todo"},
      {"title":"状语从句(时间、原因、条件、让步、目的、结果)","status":"todo"},
      {"title":"强调句与倒装句","status":"todo"},
      {"title":"省略、插入与it的用法","status":"todo"}
    ] },
    { title: "听力理解", points: [
      {"title":"捕捉时间、地点、数字、价格等具体信息","status":"todo"},
      {"title":"理解对话主旨与说话者意图","status":"todo"},
      {"title":"推断说话者关系、身份与态度","status":"todo"},
      {"title":"根据语调与语境判断隐含含义","status":"todo"},
      {"title":"长对话与独白的整体把握与笔记技巧","status":"todo"}
    ] },
    { title: "阅读理解", points: [
      {"title":"把握文章主旨大意与标题概括","status":"todo"},
      {"title":"查找与理解细节信息","status":"todo"},
      {"title":"根据上下文推理判断","status":"todo"},
      {"title":"理解作者观点、态度与写作意图","status":"todo"},
      {"title":"理解文章结构与段落逻辑关系","status":"todo"},
      {"title":"七选五:把握篇章衔接与连贯","status":"todo"},
      {"title":"记叙文、说明文、议论文、应用文体裁特征","status":"todo"},
      {"title":"长难句的分析与理解","status":"todo"}
    ] },
    { title: "完形填空", points: [
      {"title":"通读全文把握语篇主线与情感基调","status":"todo"},
      {"title":"依据上下文逻辑选词","status":"todo"},
      {"title":"动词、名词、形容词、副词的语境辨析","status":"todo"},
      {"title":"固定搭配与习惯用法","status":"todo"},
      {"title":"上下文呼应与复现线索","status":"todo"}
    ] },
    { title: "语法填空", points: [
      {"title":"给词提示:动词时态、语态与非谓语形式","status":"todo"},
      {"title":"给词提示:词性转换与构词","status":"todo"},
      {"title":"给词提示:形容词副词比较级与名词数","status":"todo"},
      {"title":"无提示词:冠词、介词的填空","status":"todo"},
      {"title":"无提示词:连词与关系词的填空","status":"todo"},
      {"title":"无提示词:代词的填空","status":"todo"}
    ] },
    { title: "书面表达:应用文写作", points: [
      {"title":"书信、邮件的格式与礼貌用语","status":"todo"},
      {"title":"通知、海报、招募启事的写作","status":"todo"},
      {"title":"演讲稿与发言稿的结构","status":"todo"},
      {"title":"审题:把握目的、对象与要点","status":"todo"},
      {"title":"连接词与过渡句的使用","status":"todo"},
      {"title":"高级词汇与句式的恰当运用","status":"todo"}
    ] },
    { title: "书面表达:读后续写", points: [
      {"title":"理解原文情节、人物与情感基调","status":"todo"},
      {"title":"根据段首句确定续写方向","status":"todo"},
      {"title":"情节的合理构思与逻辑衔接","status":"todo"},
      {"title":"人物心理、动作与环境的细节描写","status":"todo"},
      {"title":"与原文风格、人称、时态保持一致","status":"todo"},
      {"title":"首尾呼应与主题升华","status":"todo"}
    ] }
  ] },
  { subject: "physics", scope: "gaokao", discipline: "physics", topics: [
    { title: "运动的描述与匀变速直线运动", points: [
      {"title":"质点、参考系与坐标系","status":"todo"},
      {"title":"位移、速度与加速度","status":"todo"},
      {"title":"匀变速直线运动的规律及公式","status":"todo"},
      {"title":"自由落体运动与竖直上抛运动","status":"todo"},
      {"title":"v-t图像与x-t图像的分析与应用","status":"todo"},
      {"title":"纸带法测速度与加速度(实验)","status":"todo"}
    ] },
    { title: "相互作用与力", points: [
      {"title":"重力、弹力与胡克定律","status":"todo"},
      {"title":"滑动摩擦力与静摩擦力","status":"todo"},
      {"title":"力的合成与分解、平行四边形定则","status":"todo"},
      {"title":"共点力的平衡条件","status":"todo"},
      {"title":"探究弹簧弹力与形变量的关系(实验)","status":"todo"},
      {"title":"验证力的平行四边形定则(实验)","status":"todo"}
    ] },
    { title: "牛顿运动定律", points: [
      {"title":"牛顿第一定律与惯性","status":"todo"},
      {"title":"牛顿第二定律及其应用","status":"todo"},
      {"title":"牛顿第三定律","status":"todo"},
      {"title":"超重与失重","status":"todo"},
      {"title":"连接体问题与整体隔离法","status":"todo"},
      {"title":"探究加速度与力、质量的关系(实验)","status":"todo"}
    ] },
    { title: "曲线运动与万有引力", points: [
      {"title":"曲线运动的速度方向与条件","status":"todo"},
      {"title":"平抛运动的规律与分解","status":"todo"},
      {"title":"匀速圆周运动与向心力、向心加速度","status":"todo"},
      {"title":"生活中的圆周运动(火车转弯、竖直圆周等)","status":"todo"},
      {"title":"开普勒行星运动定律","status":"todo"},
      {"title":"万有引力定律及天体质量、密度的计算","status":"todo"},
      {"title":"宇宙速度与人造卫星、同步卫星","status":"todo"},
      {"title":"探究平抛运动的特点(实验)","status":"todo"}
    ] },
    { title: "机械能与功能关系", points: [
      {"title":"功与功率(平均功率与瞬时功率)","status":"todo"},
      {"title":"重力势能与弹性势能","status":"todo"},
      {"title":"动能与动能定理","status":"todo"},
      {"title":"机械能守恒定律及其条件","status":"todo"},
      {"title":"功能关系与能量守恒定律","status":"todo"},
      {"title":"验证机械能守恒定律(实验)","status":"todo"},
      {"title":"探究功与速度变化的关系(实验)","status":"todo"}
    ] },
    { title: "动量与碰撞", points: [
      {"title":"动量与冲量","status":"todo"},
      {"title":"动量定理","status":"todo"},
      {"title":"动量守恒定律及其条件","status":"todo"},
      {"title":"弹性碰撞与非弹性碰撞","status":"todo"},
      {"title":"反冲运动与火箭","status":"todo"},
      {"title":"验证动量守恒定律(实验)","status":"todo"}
    ] },
    { title: "机械振动与机械波", points: [
      {"title":"简谐运动及其描述(振幅、周期、频率)","status":"todo"},
      {"title":"简谐运动的回复力与能量","status":"todo"},
      {"title":"单摆及其周期公式","status":"todo"},
      {"title":"受迫振动与共振","status":"todo"},
      {"title":"机械波的形成与传播、横波与纵波","status":"todo"},
      {"title":"波长、频率与波速的关系、波的图像","status":"todo"},
      {"title":"波的干涉、衍射与多普勒效应","status":"todo"},
      {"title":"用单摆测量重力加速度(实验)","status":"todo"}
    ] },
    { title: "静电场", points: [
      {"title":"电荷守恒与库仑定律","status":"todo"},
      {"title":"电场强度与电场线","status":"todo"},
      {"title":"电势能、电势与电势差","status":"todo"},
      {"title":"匀强电场中电势差与电场强度的关系","status":"todo"},
      {"title":"带电粒子在电场中的加速与偏转","status":"todo"},
      {"title":"电容器与电容、平行板电容器","status":"todo"}
    ] },
    { title: "恒定电流", points: [
      {"title":"电流、电阻与欧姆定律","status":"todo"},
      {"title":"电阻定律与电阻率","status":"todo"},
      {"title":"串联与并联电路的特点","status":"todo"},
      {"title":"电功、电功率与焦耳定律","status":"todo"},
      {"title":"闭合电路欧姆定律与电源电动势、内阻","status":"todo"},
      {"title":"测量金属丝电阻率(实验)","status":"todo"},
      {"title":"测量电源电动势和内阻(实验)","status":"todo"},
      {"title":"练习使用多用电表(实验)","status":"todo"}
    ] },
    { title: "磁场与带电粒子在磁场中的运动", points: [
      {"title":"磁场、磁感应强度与磁感线","status":"todo"},
      {"title":"安培力及左手定则","status":"todo"},
      {"title":"通电导线在磁场中受力与磁电式电表原理","status":"todo"},
      {"title":"洛伦兹力与带电粒子的圆周运动","status":"todo"},
      {"title":"回旋加速器与速度选择器","status":"todo"},
      {"title":"复合场中带电粒子的运动","status":"todo"}
    ] },
    { title: "电磁感应", points: [
      {"title":"磁通量与法拉第电磁感应定律","status":"todo"},
      {"title":"楞次定律与感应电流方向","status":"todo"},
      {"title":"导体棒切割磁感线的电动势","status":"todo"},
      {"title":"自感与互感、涡流","status":"todo"},
      {"title":"电磁感应中的力学与能量问题","status":"todo"},
      {"title":"探究影响感应电流方向的因素(实验)","status":"todo"}
    ] },
    { title: "交变电流与电磁场", points: [
      {"title":"交变电流的产生与变化规律","status":"todo"},
      {"title":"交流电的峰值、有效值、周期与频率","status":"todo"},
      {"title":"理想变压器原理与电压电流关系","status":"todo"},
      {"title":"远距离输电","status":"todo"},
      {"title":"电磁场与电磁波、麦克斯韦电磁理论简介","status":"todo"}
    ] },
    { title: "热学(分子动理论、气体与热力学)", points: [
      {"title":"分子动理论、阿伏伽德罗常数与油膜法估测分子大小","status":"todo"},
      {"title":"分子间的作用力与分子热运动、布朗运动","status":"todo"},
      {"title":"温度、内能与分子平均动能","status":"todo"},
      {"title":"气体实验定律(玻意耳、查理、盖-吕萨克定律)","status":"todo"},
      {"title":"理想气体状态方程","status":"todo"},
      {"title":"热力学第一定律与能量守恒","status":"todo"},
      {"title":"热力学第二定律与熵增、能量耗散","status":"todo"},
      {"title":"固体、液体与液晶、饱和汽与湿度","status":"todo"}
    ] },
    { title: "光学", points: [
      {"title":"光的折射定律与折射率","status":"todo"},
      {"title":"全反射与光导纤维","status":"todo"},
      {"title":"光的干涉(双缝干涉)与薄膜干涉","status":"todo"},
      {"title":"光的衍射与偏振","status":"todo"},
      {"title":"测量玻璃的折射率(实验)","status":"todo"},
      {"title":"用双缝干涉测量光的波长(实验)","status":"todo"}
    ] },
    { title: "近代物理", points: [
      {"title":"光电效应与光子说、爱因斯坦光电效应方程","status":"todo"},
      {"title":"波粒二象性与物质波","status":"todo"},
      {"title":"氢原子光谱与玻尔的原子模型","status":"todo"},
      {"title":"原子核的组成、天然放射现象与衰变","status":"todo"},
      {"title":"核反应、核能、质能方程与裂变聚变","status":"todo"},
      {"title":"半衰期与放射性的应用及防护","status":"todo"}
    ] }
  ] },
  { subject: "chemistry", scope: "gaokao", discipline: "chemistry", topics: [
    { title: "物质的组成、分类与化学用语", points: [
      {"title":"物质的分类(混合物、纯净物、单质、化合物、电解质与非电解质)","status":"todo"},
      {"title":"分散系、胶体及其性质(丁达尔效应)","status":"todo"},
      {"title":"元素、原子、分子、离子等基本概念","status":"todo"},
      {"title":"化学式、化合价与化学方程式的书写","status":"todo"},
      {"title":"电子式、结构式、结构简式的表示","status":"todo"},
      {"title":"物理变化与化学变化、物理性质与化学性质","status":"todo"}
    ] },
    { title: "物质的量及其在化学计算中的应用", points: [
      {"title":"物质的量、摩尔与阿伏加德罗常数","status":"todo"},
      {"title":"摩尔质量与气体摩尔体积","status":"todo"},
      {"title":"阿伏加德罗定律及其推论","status":"todo"},
      {"title":"物质的量浓度及其计算","status":"todo"},
      {"title":"一定物质的量浓度溶液的配制","status":"todo"},
      {"title":"以物质的量为中心的综合计算与NA判断","status":"todo"}
    ] },
    { title: "离子反应与氧化还原反应", points: [
      {"title":"电解质的电离与电离方程式","status":"todo"},
      {"title":"离子方程式的书写与正误判断","status":"todo"},
      {"title":"离子共存问题","status":"todo"},
      {"title":"氧化还原反应的本质与基本概念","status":"todo"},
      {"title":"氧化性、还原性强弱的比较","status":"todo"},
      {"title":"电子守恒在氧化还原计算中的应用","status":"todo"},
      {"title":"氧化还原方程式的配平","status":"todo"}
    ] },
    { title: "化学反应与能量", points: [
      {"title":"化学反应中的能量变化(吸热与放热)","status":"todo"},
      {"title":"反应热与焓变(ΔH)","status":"todo"},
      {"title":"热化学方程式的书写","status":"todo"},
      {"title":"盖斯定律及其应用","status":"todo"},
      {"title":"键能与反应热的计算","status":"todo"},
      {"title":"燃烧热与中和热","status":"todo"}
    ] },
    { title: "化学反应速率与化学平衡", points: [
      {"title":"化学反应速率的概念与计算","status":"todo"},
      {"title":"影响化学反应速率的因素(浓度、温度、压强、催化剂)","status":"todo"},
      {"title":"活化能与有效碰撞理论","status":"todo"},
      {"title":"化学平衡状态的特征与标志","status":"todo"},
      {"title":"化学平衡的移动与勒夏特列原理","status":"todo"},
      {"title":"化学平衡常数K及其计算","status":"todo"},
      {"title":"转化率与平衡的图像分析","status":"todo"},
      {"title":"化学反应的方向(熵变、自由能判据)","status":"todo"}
    ] },
    { title: "水溶液中的离子平衡", points: [
      {"title":"弱电解质的电离平衡与电离常数Ka、Kb","status":"todo"},
      {"title":"水的电离与离子积Kw","status":"todo"},
      {"title":"溶液的酸碱性与pH的计算","status":"todo"},
      {"title":"酸碱中和滴定及其误差分析","status":"todo"},
      {"title":"盐类的水解及其规律与应用","status":"todo"},
      {"title":"电荷守恒、物料守恒与质子守恒","status":"todo"},
      {"title":"溶液中粒子浓度大小的比较","status":"todo"},
      {"title":"沉淀溶解平衡与溶度积Ksp","status":"todo"}
    ] },
    { title: "电化学基础", points: [
      {"title":"原电池的工作原理与电极反应","status":"todo"},
      {"title":"常见化学电源(干电池、燃料电池、二次电池)","status":"todo"},
      {"title":"电解池的工作原理与电极反应","status":"todo"},
      {"title":"电解原理的应用(电解饱和食盐水、电镀、精炼)","status":"todo"},
      {"title":"金属的电化学腐蚀与防护","status":"todo"},
      {"title":"电化学中的定量计算(电子守恒)","status":"todo"}
    ] },
    { title: "物质结构与性质", points: [
      {"title":"原子结构与核外电子排布(能级、电子排布式、轨道表示式)","status":"todo"},
      {"title":"元素周期律与元素周期表","status":"todo"},
      {"title":"微粒半径、电离能、电负性的递变规律","status":"todo"},
      {"title":"化学键(离子键、共价键、金属键)与键参数","status":"todo"},
      {"title":"分子的空间构型与杂化轨道理论、价层电子对互斥理论","status":"todo"},
      {"title":"分子的极性、范德华力与氢键","status":"todo"},
      {"title":"晶体类型(离子晶体、分子晶体、共价晶体、金属晶体)及性质","status":"todo"},
      {"title":"晶胞结构与相关计算","status":"todo"},
      {"title":"配合物及其成键特点","status":"todo"}
    ] },
    { title: "金属及其化合物", points: [
      {"title":"钠及其重要化合物(过氧化钠、碳酸钠与碳酸氢钠)","status":"todo"},
      {"title":"镁、铝及其化合物的两性","status":"todo"},
      {"title":"铁及其化合物(Fe²⁺与Fe³⁺的转化与检验)","status":"todo"},
      {"title":"铜及其化合物","status":"todo"},
      {"title":"金属的冶炼方法","status":"todo"},
      {"title":"焰色反应与金属离子的检验","status":"todo"}
    ] },
    { title: "非金属及其化合物", points: [
      {"title":"氯及其化合物(氯气、次氯酸、漂白粉)","status":"todo"},
      {"title":"硫及其化合物(二氧化硫、硫酸及其性质)","status":"todo"},
      {"title":"氮及其化合物(氨、铵盐、硝酸的性质)","status":"todo"},
      {"title":"硅及其化合物、无机非金属材料","status":"todo"},
      {"title":"碳及其化合物","status":"todo"},
      {"title":"常见非金属及其化合物的环境保护问题(酸雨、雾霾、温室效应)","status":"todo"}
    ] },
    { title: "有机化学基础", points: [
      {"title":"有机物的结构特点、同系物与同分异构体","status":"todo"},
      {"title":"有机物的命名与官能团","status":"todo"},
      {"title":"烷烃、烯烃、炔烃与芳香烃的结构与性质","status":"todo"},
      {"title":"卤代烃的性质与水解、消去反应","status":"todo"},
      {"title":"醇、酚的结构与性质","status":"todo"},
      {"title":"醛、羧酸、酯的结构与性质","status":"todo"},
      {"title":"糖类、油脂、蛋白质等基本营养物质","status":"todo"},
      {"title":"有机合成与有机推断","status":"todo"},
      {"title":"高分子化合物与合成材料(加聚与缩聚)","status":"todo"}
    ] },
    { title: "化学实验基础与综合实验探究", points: [
      {"title":"常见仪器的使用与基本操作","status":"todo"},
      {"title":"物质的分离与提纯(过滤、蒸馏、萃取、结晶等)","status":"todo"},
      {"title":"常见气体的实验室制备、净化与收集","status":"todo"},
      {"title":"常见离子的检验与物质的鉴别","status":"todo"},
      {"title":"实验安全与药品的存放、事故处理","status":"todo"},
      {"title":"定量实验与误差分析","status":"todo"},
      {"title":"化学实验方案的设计与评价","status":"todo"},
      {"title":"工业流程题的分析与计算","status":"todo"}
    ] }
  ] },
  { subject: "biology", scope: "gaokao", discipline: "biology", topics: [
    { title: "细胞的分子组成与结构基础", points: [
      {"title":"细胞学说的建立与内容","status":"todo"},
      {"title":"组成细胞的元素与化合物（大量元素、微量元素）","status":"todo"},
      {"title":"水和无机盐的存在形式与功能","status":"todo"},
      {"title":"糖类的种类与功能","status":"todo"},
      {"title":"脂质的种类与功能（脂肪、磷脂、固醇）","status":"todo"},
      {"title":"蛋白质的结构（氨基酸、肽键、脱水缩合）与功能","status":"todo"},
      {"title":"核酸的种类、结构与功能（DNA与RNA）","status":"todo"},
      {"title":"检测生物组织中糖类、脂肪和蛋白质的实验","status":"todo"}
    ] },
    { title: "细胞的结构与物质运输", points: [
      {"title":"原核细胞与真核细胞的区别","status":"todo"},
      {"title":"细胞膜的成分、结构（流动镶嵌模型）与功能","status":"todo"},
      {"title":"细胞器的种类、结构与功能（线粒体、叶绿体、内质网、高尔基体、核糖体、溶酶体、液泡）","status":"todo"},
      {"title":"生物膜系统的组成与协调配合（分泌蛋白的合成与运输）","status":"todo"},
      {"title":"细胞核的结构与功能","status":"todo"},
      {"title":"被动运输（自由扩散与协助扩散）","status":"todo"},
      {"title":"主动运输与胞吞、胞吐","status":"todo"},
      {"title":"渗透作用与植物细胞的质壁分离及复原实验","status":"todo"},
      {"title":"用高倍显微镜观察细胞的多样性","status":"todo"}
    ] },
    { title: "细胞的代谢（酶、ATP、呼吸作用与光合作用）", points: [
      {"title":"酶的本质、特性（高效性、专一性）及影响酶活性的因素","status":"todo"},
      {"title":"ATP的结构与ATP和ADP的相互转化","status":"todo"},
      {"title":"细胞呼吸的方式、过程与场所（有氧呼吸与无氧呼吸）","status":"todo"},
      {"title":"影响细胞呼吸的因素及其应用","status":"todo"},
      {"title":"光合色素的种类及提取与分离实验","status":"todo"},
      {"title":"光合作用的过程（光反应与暗反应）与场所","status":"todo"},
      {"title":"影响光合作用的环境因素及其应用","status":"todo"},
      {"title":"光合作用与细胞呼吸的关系（净光合与总光合）","status":"todo"},
      {"title":"探究酶活性、影响光合速率因素的实验设计","status":"todo"}
    ] },
    { title: "细胞的生命历程", points: [
      {"title":"细胞增殖与细胞周期","status":"todo"},
      {"title":"有丝分裂的过程与各时期特征","status":"todo"},
      {"title":"观察根尖分生区细胞有丝分裂实验","status":"todo"},
      {"title":"细胞的分化与细胞全能性","status":"todo"},
      {"title":"细胞的衰老与死亡（细胞凋亡与细胞坏死）","status":"todo"},
      {"title":"细胞的癌变（原癌基因、抑癌基因与癌细胞特征）","status":"todo"}
    ] },
    { title: "遗传的细胞基础与分子基础", points: [
      {"title":"减数分裂与受精作用的过程及意义","status":"todo"},
      {"title":"观察蝗虫精母细胞减数分裂固定装片","status":"todo"},
      {"title":"DNA是主要的遗传物质（肺炎链球菌转化实验、噬菌体侵染细菌实验）","status":"todo"},
      {"title":"DNA分子的结构（双螺旋结构与碱基互补配对）","status":"todo"},
      {"title":"DNA分子的复制（半保留复制）","status":"todo"},
      {"title":"基因的概念与基因的表达（转录与翻译）","status":"todo"},
      {"title":"中心法则及其发展","status":"todo"},
      {"title":"基因对性状的控制（直接与间接途径）","status":"todo"}
    ] },
    { title: "遗传的基本规律", points: [
      {"title":"孟德尔豌豆杂交实验与分离定律","status":"todo"},
      {"title":"自由组合定律及其实质","status":"todo"},
      {"title":"基因与染色体的关系（萨顿假说与摩尔根实验）","status":"todo"},
      {"title":"伴性遗传的特点（X、Y染色体遗传）","status":"todo"},
      {"title":"遗传系谱图的分析与判断","status":"todo"},
      {"title":"概率计算与遗传规律的综合应用","status":"todo"},
      {"title":"性别决定方式","status":"todo"},
      {"title":"假说—演绎法的科学方法","status":"todo"}
    ] },
    { title: "变异、育种与进化", points: [
      {"title":"基因突变的概念、特点与意义","status":"todo"},
      {"title":"基因重组的类型","status":"todo"},
      {"title":"染色体变异（结构变异与数目变异、染色体组）","status":"todo"},
      {"title":"低温诱导植物细胞染色体数目变化实验","status":"todo"},
      {"title":"人类遗传病的类型、监测与预防","status":"todo"},
      {"title":"诱变育种、杂交育种、单倍体育种与多倍体育种","status":"todo"},
      {"title":"现代生物进化理论（种群、基因库、基因频率）","status":"todo"},
      {"title":"自然选择与隔离、物种形成、协同进化与生物多样性","status":"todo"},
      {"title":"基因频率的计算（哈代—温伯格平衡）","status":"todo"}
    ] },
    { title: "人体的内环境与稳态", points: [
      {"title":"内环境的组成与理化性质","status":"todo"},
      {"title":"内环境的稳态及其调节机制（反馈调节）","status":"todo"},
      {"title":"内环境作为细胞与外界环境物质交换的媒介","status":"todo"},
      {"title":"稳态的生理意义","status":"todo"}
    ] },
    { title: "神经调节与体液调节", points: [
      {"title":"神经系统的组成与神经元的结构","status":"todo"},
      {"title":"神经调节的结构基础——反射与反射弧","status":"todo"},
      {"title":"兴奋的产生与传导（静息电位与动作电位）","status":"todo"},
      {"title":"兴奋在神经元之间的传递（突触结构与突触传递）","status":"todo"},
      {"title":"神经系统的分级调节与人脑的高级功能","status":"todo"},
      {"title":"激素的种类、来源与生理作用","status":"todo"},
      {"title":"激素分泌的分级调节与反馈调节","status":"todo"},
      {"title":"血糖平衡的调节","status":"todo"},
      {"title":"体温调节与水盐平衡调节","status":"todo"},
      {"title":"神经调节与体液调节的关系","status":"todo"}
    ] },
    { title: "免疫调节", points: [
      {"title":"免疫系统的组成（免疫器官、免疫细胞、免疫活性物质）","status":"todo"},
      {"title":"免疫系统的功能（防御、监视、自稳）","status":"todo"},
      {"title":"特异性免疫——体液免疫的过程","status":"todo"},
      {"title":"特异性免疫——细胞免疫的过程","status":"todo"},
      {"title":"免疫失调（过敏反应、自身免疫病、免疫缺陷病）","status":"todo"},
      {"title":"免疫学的应用（疫苗、抗体与器官移植）","status":"todo"}
    ] },
    { title: "植物的激素调节与环境因素", points: [
      {"title":"生长素的发现过程与产生、运输、分布","status":"todo"},
      {"title":"生长素的生理作用（两重性）与应用","status":"todo"},
      {"title":"其他植物激素的种类与作用（赤霉素、细胞分裂素、脱落酸、乙烯）","status":"todo"},
      {"title":"植物激素间的协调作用与植物生长调节剂的应用","status":"todo"},
      {"title":"环境因素（光、重力、温度）对植物生命活动的调节","status":"todo"},
      {"title":"探究生长素类调节剂促进插条生根的最适浓度实验","status":"todo"}
    ] },
    { title: "种群、群落与生态系统", points: [
      {"title":"种群的数量特征与种群密度的调查方法","status":"todo"},
      {"title":"种群数量的变化（J形增长与S形增长、K值）","status":"todo"},
      {"title":"影响种群数量变化的因素","status":"todo"},
      {"title":"群落的结构（物种组成、种间关系、空间结构）","status":"todo"},
      {"title":"群落的主要类型与演替（初生演替与次生演替）","status":"todo"},
      {"title":"生态系统的结构（成分与营养结构）","status":"todo"},
      {"title":"生态系统的能量流动（特点与计算）","status":"todo"},
      {"title":"生态系统的物质循环（碳循环）与生物富集","status":"todo"},
      {"title":"生态系统的信息传递与稳定性（抵抗力与恢复力）","status":"todo"}
    ] },
    { title: "人与环境", points: [
      {"title":"人口增长对生态环境的影响","status":"todo"},
      {"title":"全球性生态环境问题（温室效应、水体污染、生物多样性丧失等）","status":"todo"},
      {"title":"生物多样性的价值与保护措施","status":"todo"},
      {"title":"生态足迹与生态承载力","status":"todo"},
      {"title":"可持续发展与生态工程的基本原理","status":"todo"}
    ] },
    { title: "发酵工程与传统生物技术", points: [
      {"title":"传统发酵技术的应用（果酒、果醋、泡菜的制作）","status":"todo"},
      {"title":"微生物的纯培养与培养基的配制","status":"todo"},
      {"title":"微生物的接种与分离纯化（平板划线法、稀释涂布平板法）","status":"todo"},
      {"title":"微生物的选择培养与计数","status":"todo"},
      {"title":"发酵工程的基本环节及其应用","status":"todo"}
    ] },
    { title: "细胞工程", points: [
      {"title":"植物组织培养技术的原理与过程","status":"todo"},
      {"title":"植物体细胞杂交技术","status":"todo"},
      {"title":"动物细胞培养的条件与过程","status":"todo"},
      {"title":"动物体细胞核移植技术与克隆动物","status":"todo"},
      {"title":"细胞融合与单克隆抗体的制备及应用","status":"todo"},
      {"title":"干细胞的特点与应用","status":"todo"}
    ] },
    { title: "基因工程与生物技术的安全与伦理", points: [
      {"title":"基因工程的基本工具（限制酶、DNA连接酶、载体）","status":"todo"},
      {"title":"基因工程的基本操作程序（四步骤）","status":"todo"},
      {"title":"PCR技术扩增目的基因的原理与过程","status":"todo"},
      {"title":"基因工程的应用（转基因生物与转基因产品）","status":"todo"},
      {"title":"蛋白质工程的原理","status":"todo"},
      {"title":"胚胎工程（体外受精、胚胎移植、胚胎分割）","status":"todo"},
      {"title":"生物技术的安全性与伦理问题","status":"todo"}
    ] }
  ] },
  { subject: "politics", scope: "gaokao", discipline: "politics-sci", topics: [
    { title: "必修1 中国特色社会主义", points: [
      {"title":"原始社会的解体和阶级社会的演进","status":"todo"},
      {"title":"科学社会主义产生的历史条件与诞生标志(《共产党宣言》)","status":"todo"},
      {"title":"新民主主义革命的胜利与社会主义制度在中国的确立","status":"todo"},
      {"title":"伟大的改革开放及其历史意义","status":"todo"},
      {"title":"中国特色社会主义的开创、坚持与发展","status":"todo"},
      {"title":"习近平新时代中国特色社会主义思想的核心内容","status":"todo"},
      {"title":"中国梦与\"两个一百年\"奋斗目标","status":"todo"},
      {"title":"新时代我国社会主要矛盾的转化","status":"todo"}
    ] },
    { title: "必修2 经济与社会:基本经济制度", points: [
      {"title":"公有制为主体、多种所有制经济共同发展","status":"todo"},
      {"title":"国有经济、国有企业的地位与改革","status":"todo"},
      {"title":"坚持\"两个毫不动摇\"与民营经济发展","status":"todo"},
      {"title":"按劳分配为主体、多种分配方式并存","status":"todo"},
      {"title":"初次分配、再分配与第三次分配","status":"todo"},
      {"title":"完善个人收入分配、实现共同富裕","status":"todo"},
      {"title":"社会主义市场经济体制及其基本特征","status":"todo"}
    ] },
    { title: "必修2 经济与社会:经济发展与社会建设", points: [
      {"title":"使市场在资源配置中起决定性作用、更好发挥政府作用","status":"todo"},
      {"title":"科学的宏观调控与财政政策、货币政策","status":"todo"},
      {"title":"贯彻新发展理念(创新、协调、绿色、开放、共享)","status":"todo"},
      {"title":"推动高质量发展与建设现代化经济体系","status":"todo"},
      {"title":"构建新发展格局、推进供给侧结构性改革","status":"todo"},
      {"title":"完善社会保障体系、实施乡村振兴战略","status":"todo"}
    ] },
    { title: "必修3 政治与法治:中国共产党的领导", points: [
      {"title":"中国共产党领导人民站起来、富起来、强起来","status":"todo"},
      {"title":"始终坚持以人民为中心的执政理念","status":"todo"},
      {"title":"党的领导是最高政治领导力量(总揽全局、协调各方)","status":"todo"},
      {"title":"中国共产党的指导思想、先进性与纯洁性","status":"todo"},
      {"title":"全面从严治党与党的自我革命","status":"todo"},
      {"title":"坚持和加强党的全面领导","status":"todo"}
    ] },
    { title: "必修3 政治与法治:人民当家作主", points: [
      {"title":"我国的国体——人民民主专政","status":"todo"},
      {"title":"人民代表大会制度(根本政治制度)","status":"todo"},
      {"title":"中国共产党领导的多党合作和政治协商制度","status":"todo"},
      {"title":"民族区域自治制度与基层群众自治制度","status":"todo"},
      {"title":"我国的国家机构(人大、政府、监察委、法院、检察院)","status":"todo"},
      {"title":"全过程人民民主","status":"todo"},
      {"title":"国家利益、国家安全与总体国家安全观","status":"todo"}
    ] },
    { title: "必修3 政治与法治:全面依法治国", points: [
      {"title":"中国特色社会主义法治道路与法治体系","status":"todo"},
      {"title":"全面依法治国的总目标、原则与基本要求","status":"todo"},
      {"title":"科学立法、严格执法、公正司法、全民守法","status":"todo"},
      {"title":"建设法治国家、法治政府、法治社会","status":"todo"},
      {"title":"坚持党的领导、人民当家作主、依法治国有机统一","status":"todo"},
      {"title":"全面依法治国与全面深化改革的关系","status":"todo"}
    ] },
    { title: "必修4 哲学与文化:辩证唯物论与认识论", points: [
      {"title":"哲学的基本问题与基本派别(唯物主义与唯心主义)","status":"todo"},
      {"title":"马克思主义哲学的产生与基本特征","status":"todo"},
      {"title":"世界的物质性、运动的规律性及规律的客观性","status":"todo"},
      {"title":"意识的能动作用与一切从实际出发、实事求是","status":"todo"},
      {"title":"实践是认识的基础","status":"todo"},
      {"title":"真理的客观性、具体性与认识的反复性、无限性","status":"todo"}
    ] },
    { title: "必修4 哲学与文化:唯物辩证法", points: [
      {"title":"联系的普遍性、客观性、多样性与整体和部分","status":"todo"},
      {"title":"系统优化的方法","status":"todo"},
      {"title":"发展的普遍性、实质与前进性和曲折性的统一","status":"todo"},
      {"title":"量变与质变的辩证关系","status":"todo"},
      {"title":"矛盾的对立统一、普遍性与特殊性","status":"todo"},
      {"title":"主次矛盾与矛盾的主次方面、两点论与重点论","status":"todo"},
      {"title":"辩证否定观与创新意识","status":"todo"}
    ] },
    { title: "必修4 哲学与文化:历史唯物主义与价值观", points: [
      {"title":"社会存在与社会意识的辩证关系","status":"todo"},
      {"title":"社会基本矛盾运动与社会历史发展规律","status":"todo"},
      {"title":"人民群众是历史的创造者、群众观点和群众路线","status":"todo"},
      {"title":"价值观的导向作用","status":"todo"},
      {"title":"正确的价值判断与价值选择","status":"todo"},
      {"title":"在劳动和奉献中创造价值、实现人生价值","status":"todo"}
    ] },
    { title: "必修4 哲学与文化:文化传承与发展", points: [
      {"title":"文化的内涵、功能与文化的民族性和多样性","status":"todo"},
      {"title":"文化交流交融与文化交流互鉴","status":"todo"},
      {"title":"正确对待外来文化、坚守中华文化立场","status":"todo"},
      {"title":"中华优秀传统文化的主要内容与当代价值","status":"todo"},
      {"title":"弘扬中华民族精神与中华文化的创造性转化、创新性发展","status":"todo"},
      {"title":"发展中国特色社会主义文化、坚定文化自信","status":"todo"},
      {"title":"培育和践行社会主义核心价值观","status":"todo"}
    ] },
    { title: "选择性必修1 当代国际政治与经济", points: [
      {"title":"主权国家与国际组织(联合国及其作用)","status":"todo"},
      {"title":"国际关系的决定性因素——国家利益","status":"todo"},
      {"title":"和平与发展是当今时代主题","status":"todo"},
      {"title":"世界多极化与国际关系民主化","status":"todo"},
      {"title":"经济全球化的表现、影响与中国应对","status":"todo"},
      {"title":"中国特色大国外交与独立自主的和平外交政策","status":"todo"},
      {"title":"构建人类命运共同体与共建\"一带一路\"","status":"todo"}
    ] },
    { title: "选择性必修2 法律与生活", points: [
      {"title":"民事权利与民事责任、民法基本原则","status":"todo"},
      {"title":"物权、合同与侵权责任","status":"todo"},
      {"title":"婚姻家庭与继承中的法律规定","status":"todo"},
      {"title":"劳动者的权利保护与就业、社会保险","status":"todo"},
      {"title":"消费者权益的法律保护","status":"todo"},
      {"title":"诉讼的基本程序与证据规则、依法维权","status":"todo"}
    ] },
    { title: "选择性必修3 逻辑与思维", points: [
      {"title":"思维的特征与逻辑思维的基本要求(同一律、矛盾律、排中律)","status":"todo"},
      {"title":"概念的内涵与外延、明确概念的方法","status":"todo"},
      {"title":"判断的种类与正确运用判断","status":"todo"},
      {"title":"演绎推理、归纳推理与类比推理","status":"todo"},
      {"title":"辩证思维的整体性与动态性","status":"todo"},
      {"title":"创新思维的特征与方法(发散思维、聚合思维、逆向思维)","status":"todo"}
    ] }
  ] },
  { subject: "history", scope: "gaokao", discipline: "china-history", topics: [
    { title: "中国古代史（一）：从中华文明起源到秦汉大一统", points: [
      {"title":"中华文明的起源与早期国家（旧石器、新石器、夏商西周）","status":"todo"},
      {"title":"分封制与宗法制","status":"todo"},
      {"title":"春秋战国的政治变动与社会转型","status":"todo"},
      {"title":"百家争鸣与早期儒家、法家、道家思想","status":"todo"},
      {"title":"商鞅变法与战国时期改革","status":"todo"},
      {"title":"秦统一多民族封建国家的建立与中央集权制度","status":"todo"},
      {"title":"两汉的统治与汉武帝加强中央集权的措施","status":"todo"},
      {"title":"两汉的经济、丝绸之路与对外交往","status":"todo"},
      {"title":"两汉的思想（罢黜百家、独尊儒术）与科技文化","status":"todo"}
    ] },
    { title: "中国古代史（二）：三国至隋唐的民族交融与繁荣", points: [
      {"title":"三国两晋南北朝的政权更迭与江南开发","status":"todo"},
      {"title":"北魏孝文帝改革与民族交融","status":"todo"},
      {"title":"隋朝的统一与大运河","status":"todo"},
      {"title":"唐朝的盛世（贞观之治、开元盛世）与由盛转衰","status":"todo"},
      {"title":"三省六部制、科举制与租庸调制、两税法","status":"todo"},
      {"title":"隋唐的民族关系与对外交流","status":"todo"},
      {"title":"魏晋至隋唐的思想（儒释道并行）、科技与文学艺术","status":"todo"}
    ] },
    { title: "中国古代史（三）：宋元的发展与统一多民族国家巩固", points: [
      {"title":"北宋加强中央集权与王安石变法","status":"todo"},
      {"title":"辽夏金元政权及与两宋的并立关系","status":"todo"},
      {"title":"元朝的统一、行省制度与边疆治理","status":"todo"},
      {"title":"宋元商品经济发展与经济重心南移","status":"todo"},
      {"title":"宋明理学（程朱理学）","status":"todo"},
      {"title":"宋元的科技（三大发明外传）、文学与艺术","status":"todo"},
      {"title":"宋元的民族交融与对外交往","status":"todo"}
    ] },
    { title: "中国古代史（四）：明清（鸦片战争前）的鼎盛与危机", points: [
      {"title":"明朝政治制度的变化（废丞相、设内阁、宦官专权）","status":"todo"},
      {"title":"清朝君主专制的强化（军机处、奏折制度）","status":"todo"},
      {"title":"明清统一多民族国家的巩固与疆域奠定","status":"todo"},
      {"title":"明清的经济发展与资本主义萌芽、白银货币化","status":"todo"},
      {"title":"明清的海上交往、郑和下西洋与闭关自守","status":"todo"},
      {"title":"陆王心学与明清之际的进步思想（黄宗羲、顾炎武、王夫之）","status":"todo"},
      {"title":"明清的科技、小说戏曲与文化总结","status":"todo"}
    ] },
    { title: "中国近代史（一）：晚清的危机与救亡探索", points: [
      {"title":"两次鸦片战争与不平等条约、社会性质变化","status":"todo"},
      {"title":"太平天国运动","status":"todo"},
      {"title":"洋务运动与早期近代化","status":"todo"},
      {"title":"甲午中日战争与民族危机加深","status":"todo"},
      {"title":"戊戌维新运动","status":"todo"},
      {"title":"义和团运动与八国联军侵华、《辛丑条约》","status":"todo"},
      {"title":"晚清经济结构变动与民族资本主义的产生","status":"todo"},
      {"title":"辛亥革命与中华民国的建立","status":"todo"}
    ] },
    { title: "中国近代史（二）：北洋至新民主主义革命的兴起", points: [
      {"title":"北洋军阀统治与民国初年的政治","status":"todo"},
      {"title":"新文化运动与马克思主义的传播","status":"todo"},
      {"title":"五四运动与中国共产党的成立","status":"todo"},
      {"title":"国共第一次合作与国民革命（北伐）","status":"todo"},
      {"title":"国共十年对立与土地革命、红军长征","status":"todo"},
      {"title":"民族资本主义的曲折发展与社会生活变迁","status":"todo"}
    ] },
    { title: "中国近代史（三）：抗日战争与人民解放战争", points: [
      {"title":"局部抗战与全国抗战的开始（九一八、七七事变）","status":"todo"},
      {"title":"正面战场与敌后战场、抗日民族统一战线","status":"todo"},
      {"title":"中国共产党的中流砥柱作用与抗战胜利的意义","status":"todo"},
      {"title":"重庆谈判与全面内战的爆发","status":"todo"},
      {"title":"解放战争的进程（三大战役、渡江战役）与新民主主义革命的胜利","status":"todo"}
    ] },
    { title: "中华人民共和国史：社会主义建设与改革开放", points: [
      {"title":"新中国成立与向社会主义过渡（一五计划、三大改造）","status":"todo"},
      {"title":"社会主义制度的确立与全面建设的探索及曲折","status":"todo"},
      {"title":"新中国的外交成就（和平共处五项原则、恢复联合国席位、中美建交）","status":"todo"},
      {"title":"十一届三中全会与改革开放的进程","status":"todo"},
      {"title":"中国特色社会主义理论体系的形成与发展","status":"todo"},
      {"title":"改革开放以来的综合国力提升与社会生活变化","status":"todo"},
      {"title":"中国特色社会主义进入新时代","status":"todo"}
    ] },
    { title: "世界古代与近代史（一）：文明起源到资本主义制度确立", points: [
      {"title":"古代文明的产生（西亚、埃及、印度、希腊罗马）与早期文明多元特点","status":"todo"},
      {"title":"古代世界帝国与区域文明的交流","status":"todo"},
      {"title":"中古时期的欧洲（封建制、庄园、城市）与拜占庭、阿拉伯帝国","status":"todo"},
      {"title":"中古时期的亚洲、非洲与美洲文明","status":"todo"},
      {"title":"新航路开辟与早期殖民扩张、全球联系的建立","status":"todo"},
      {"title":"文艺复兴、宗教改革与近代科学的兴起","status":"todo"},
      {"title":"启蒙运动","status":"todo"},
      {"title":"英、美、法资产阶级革命与资本主义制度的确立","status":"todo"}
    ] },
    { title: "世界近现代史（二）：工业革命到当代世界", points: [
      {"title":"两次工业革命与资本主义世界市场的形成","status":"todo"},
      {"title":"马克思主义的诞生与国际工人运动、巴黎公社","status":"todo"},
      {"title":"资本主义殖民扩张与亚非拉民族解放运动","status":"todo"},
      {"title":"第一次世界大战与十月革命、苏联社会主义建设","status":"todo"},
      {"title":"1929—1933年经济大危机与罗斯福新政","status":"todo"},
      {"title":"第二次世界大战与战后国际秩序（雅尔塔体系、联合国）","status":"todo"},
      {"title":"冷战、两极格局与世界殖民体系的瓦解","status":"todo"},
      {"title":"世界多极化、经济全球化与当代人类面临的挑战","status":"todo"}
    ] },
    { title: "国家制度与社会治理（选择性必修一）", points: [
      {"title":"中国古代政治制度的形成与演变、君主专制中央集权","status":"todo"},
      {"title":"西方政治制度的演变与近代代议制","status":"todo"},
      {"title":"中外官员的选拔与管理（科举制、文官制度）","status":"todo"},
      {"title":"中国历代变法改革与法律、教化（礼法结合）","status":"todo"},
      {"title":"近代西方的法律与教化、当代中国的法治建设","status":"todo"},
      {"title":"中外民族关系与国家关系、近代外交制度","status":"todo"},
      {"title":"中外货币、赋税制度与基层治理、社会保障","status":"todo"}
    ] },
    { title: "经济与社会生活、文化交流与传播（选择性必修二、三）", points: [
      {"title":"食物生产、农业起源与现代农业的发展","status":"todo"},
      {"title":"手工业、工业革命与近现代生产工具及劳作方式的变化","status":"todo"},
      {"title":"商业贸易、货币、世界市场与商业组织的演变","status":"todo"},
      {"title":"村落、集镇、城市发展与居住环境、近代以来的城市化","status":"todo"},
      {"title":"交通、医疗卫生与现代社会生活的变迁","status":"todo"},
      {"title":"中华优秀传统文化的内涵与世界各地的文化多样性","status":"todo"},
      {"title":"人口迁徙、商路（丝绸之路）与文化交流、传播","status":"todo"},
      {"title":"战争、殖民与文化重构、近现代文化的传承与保护","status":"todo"}
    ] }
  ] },
  { subject: "geography", scope: "gaokao", discipline: "geography-sci", topics: [
    { title: "地球与地图基础", points: [
      {"title":"经纬网与地理坐标的判读","status":"todo"},
      {"title":"地图三要素(比例尺、方向、图例)","status":"todo"},
      {"title":"等高线地形图的判读与地形剖面图绘制","status":"todo"},
      {"title":"等值线图(等温线、等压线、等降水量线)判读方法","status":"todo"},
      {"title":"地球的形状、大小与圈层结构","status":"todo"},
      {"title":"时区与区时、地方时的计算","status":"todo"},
      {"title":"日期变更线与日界线","status":"todo"}
    ] },
    { title: "宇宙中的地球与地球运动", points: [
      {"title":"天体系统与地球在宇宙中的位置","status":"todo"},
      {"title":"太阳辐射对地球的影响","status":"todo"},
      {"title":"太阳活动对地球的影响","status":"todo"},
      {"title":"地球自转的方向、周期与速度","status":"todo"},
      {"title":"昼夜交替与晨昏线的判读","status":"todo"},
      {"title":"地转偏向力及其地理意义","status":"todo"},
      {"title":"地球公转与黄赤交角","status":"todo"},
      {"title":"正午太阳高度角的变化与计算","status":"todo"},
      {"title":"昼夜长短的变化规律","status":"todo"},
      {"title":"四季更替与五带的划分","status":"todo"}
    ] },
    { title: "岩石圈与地表形态", points: [
      {"title":"地球内部圈层结构与岩石圈","status":"todo"},
      {"title":"三大类岩石与岩石圈物质循环","status":"todo"},
      {"title":"板块构造学说与板块运动","status":"todo"},
      {"title":"地质构造(褶皱、断层)及其实践意义","status":"todo"},
      {"title":"内力作用与地表形态","status":"todo"},
      {"title":"外力作用(风化、侵蚀、搬运、堆积)","status":"todo"},
      {"title":"流水地貌(河流侵蚀与堆积地貌)","status":"todo"},
      {"title":"风沙地貌与黄土地貌","status":"todo"},
      {"title":"喀斯特地貌与海岸地貌","status":"todo"},
      {"title":"土壤的形成与影响因素","status":"todo"}
    ] },
    { title: "大气运动与气候", points: [
      {"title":"大气的组成与垂直分层","status":"todo"},
      {"title":"大气受热过程与逆温现象","status":"todo"},
      {"title":"热力环流原理及应用","status":"todo"},
      {"title":"大气的水平运动(风的形成与风向判读)","status":"todo"},
      {"title":"气压带和风带的分布与季节移动","status":"todo"},
      {"title":"海陆分布对气压带风带的影响与季风环流","status":"todo"},
      {"title":"常见天气系统(锋面、气旋与反气旋)","status":"todo"},
      {"title":"世界主要气候类型的分布、特征与成因","status":"todo"},
      {"title":"气候的判读与气候对自然环境的影响","status":"todo"},
      {"title":"全球气候变化及其影响与对策","status":"todo"}
    ] },
    { title: "水圈与水循环", points: [
      {"title":"水循环的过程、类型与地理意义","status":"todo"},
      {"title":"陆地水体及其相互补给关系","status":"todo"},
      {"title":"河流的水文特征与水系特征","status":"todo"},
      {"title":"洋流的分布规律与成因","status":"todo"},
      {"title":"洋流对地理环境的影响","status":"todo"},
      {"title":"海水的温度、盐度与密度","status":"todo"},
      {"title":"海气相互作用与厄尔尼诺、拉尼娜现象","status":"todo"}
    ] },
    { title: "自然环境的整体性与差异性", points: [
      {"title":"自然地理环境的组成要素与物质能量交换","status":"todo"},
      {"title":"自然环境的整体性及其表现","status":"todo"},
      {"title":"陆地自然带的分布","status":"todo"},
      {"title":"由赤道到两极的地域分异规律(纬度地带性)","status":"todo"},
      {"title":"从沿海向内陆的地域分异规律(经度地带性)","status":"todo"},
      {"title":"山地垂直地域分异规律(垂直地带性)","status":"todo"},
      {"title":"地方性分异规律与非地带性现象","status":"todo"}
    ] },
    { title: "自然灾害与地理信息技术", points: [
      {"title":"气象灾害(台风、洪涝、干旱、寒潮)","status":"todo"},
      {"title":"地质灾害(地震、滑坡、泥石流)","status":"todo"},
      {"title":"自然灾害的防避与减灾措施","status":"todo"},
      {"title":"遥感(RS)的工作原理与应用","status":"todo"},
      {"title":"全球卫星导航系统(GNSS/北斗)的应用","status":"todo"},
      {"title":"地理信息系统(GIS)的功能与应用","status":"todo"},
      {"title":"地理信息技术在防灾减灾与区域管理中的综合应用","status":"todo"}
    ] },
    { title: "人口与城镇", points: [
      {"title":"人口分布与人口密度的影响因素","status":"todo"},
      {"title":"人口迁移的类型、原因与影响","status":"todo"},
      {"title":"人口容量与资源环境承载力","status":"todo"},
      {"title":"人口增长模式及其转变","status":"todo"},
      {"title":"乡村与城镇的空间结构","status":"todo"},
      {"title":"城镇化的过程、特点与地区差异","status":"todo"},
      {"title":"城镇化对地理环境的影响及问题","status":"todo"},
      {"title":"地域文化与城乡景观","status":"todo"}
    ] },
    { title: "产业区位与区域联系", points: [
      {"title":"农业区位因素及其变化","status":"todo"},
      {"title":"主要农业地域类型及其特征","status":"todo"},
      {"title":"工业区位因素及其变化","status":"todo"},
      {"title":"工业地域的形成与工业集聚、扩散","status":"todo"},
      {"title":"服务业的区位因素","status":"todo"},
      {"title":"交通运输方式与布局的影响因素","status":"todo"},
      {"title":"交通运输布局对区域发展的影响","status":"todo"},
      {"title":"产业转移的规律与影响","status":"todo"},
      {"title":"资源跨区域调配及其影响","status":"todo"}
    ] },
    { title: "环境与发展", points: [
      {"title":"人类面临的主要环境问题","status":"todo"},
      {"title":"走可持续发展之路与可持续发展内涵","status":"todo"},
      {"title":"中国国家发展战略举例(主体功能区、区域协调)","status":"todo"},
      {"title":"海洋权益与海洋发展战略","status":"todo"},
      {"title":"环境承载力与人地协调观","status":"todo"}
    ] },
    { title: "区域发展与区域差异", points: [
      {"title":"区域的含义、类型与特征","status":"todo"},
      {"title":"区域整体性、差异性与关联性","status":"todo"},
      {"title":"不同发展阶段地理环境对人类活动的影响","status":"todo"},
      {"title":"生态脆弱区(荒漠化、水土流失)的综合治理","status":"todo"},
      {"title":"资源枯竭型地区与产业结构转型","status":"todo"},
      {"title":"流域开发与综合治理(如黄河、长江)","status":"todo"},
      {"title":"区域生态环境建设与农业可持续发展","status":"todo"},
      {"title":"城市辐射功能与区域协调发展","status":"todo"}
    ] },
    { title: "资源、环境与国家安全", points: [
      {"title":"自然资源的数量、质量与时空分布特征","status":"todo"},
      {"title":"耕地资源与粮食安全","status":"todo"},
      {"title":"水资源、矿产资源安全与可持续利用","status":"todo"},
      {"title":"环境污染与国家安全","status":"todo"},
      {"title":"生态保护与国家生态安全屏障","status":"todo"},
      {"title":"全球气候变化与国家安全","status":"todo"},
      {"title":"碳达峰、碳中和与中国的应对","status":"todo"},
      {"title":"国家战略与生态文明建设","status":"todo"}
    ] }
  ] }
]);
