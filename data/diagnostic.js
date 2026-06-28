/* =============================================================
 *  检测中心 · 知识点摸底 (DIAG_TEST + DIAG_POINTS)
 * -------------------------------------------------------------
 *  「摸底」= 突击前先测出哪个知识点弱，再针对性补。
 *  做法：一套覆盖六下核心考点的混合题，每题打一个 point（考点）标签；
 *  测完按考点统计掌握度，弱项给出复习建议 + 直达链接。
 *
 *  DIAG_TEST   每个 track 一套摸底题；question 比普通题多一个 point 字段。
 *  DIAG_POINTS 考点 → { advice 建议, links[] 复习/练习入口 }
 *
 *  题目对应：冀教版《英语·六年级下册》四个单元的核心语法与词汇。
 * ============================================================= */

window.DIAG_TEST = [
  {
    id: "mh-en-diag",
    profile: "mahuan", subject: "english", scopes: ["jijiao-6b", "xiaoxue"],
    title: "知识点摸底",
    desc: "冀教版六下 · 8 大考点",
    questions: [
      // —— 比较级 ——
      { point: "比较级", type: "choice", q: "An elephant is ___ than a dog.", options: ["big", "bigger", "biggest", "more big"], answer: 1, explain: "比较两者用比较级；big 双写 g → bigger。" },
      { point: "比较级", type: "fill", q: "Your pencil is ___ (short) than mine.", answer: ["shorter"], explain: "short → shorter，直接 +er。" },
      // —— 一般过去时 ——
      { point: "一般过去时", type: "choice", q: "I ___ to the lake last Sunday.", options: ["go", "went", "will go", "goes"], answer: 1, explain: "last Sunday 是过去时间 → went。" },
      { point: "一般过去时", type: "fill", q: "We ___ (swim) in the lake yesterday.", answer: ["swam"], explain: "swim 的过去式是 swam（不规则）。" },
      { point: "一般过去时", type: "choice", q: "___ you at the party yesterday?", options: ["Do", "Did", "Were", "Was"], answer: 2, explain: "you 用 were；yesterday 表过去。" },
      // —— 一般将来时 will ——
      { point: "一般将来时(will)", type: "choice", q: "What will you do this summer? — I ___ visit my grandparents.", options: ["will", "am", "did", "do"], answer: 0, explain: "will + 动词原形表示将来。" },
      { point: "一般将来时(will)", type: "choice", q: "Tomorrow I ___ get up at 6:30.", options: ["will", "was", "am", "did"], answer: 0, explain: "Tomorrow 表将来 → will get up。" },
      // —— be 动词 / 主谓一致 ——
      { point: "be动词/主谓一致", type: "choice", q: "There ___ some milk in the cup.", options: ["is", "are", "am", "be"], answer: 0, explain: "milk 不可数 → is。" },
      { point: "be动词/主谓一致", type: "choice", q: "Look! The children ___ playing football.", options: ["is", "am", "are", "be"], answer: 2, explain: "children 复数 → are（现在进行时）。" },
      // —— how 特殊疑问 ——
      { point: "how特殊疑问", type: "choice", q: "— ___ is the blue hat? — Fifty yuan.", options: ["How much", "How many", "How long", "How old"], answer: 0, explain: "问价格用 How much。" },
      { point: "how特殊疑问", type: "choice", q: "— ___ did he stay there? — About a week.", options: ["How far", "How long", "How many", "How often"], answer: 1, explain: "问时间长短用 How long。" },
      // —— 介词 ——
      { point: "介词", type: "choice", q: "My birthday is ___ October.", options: ["in", "on", "at", "to"], answer: 0, explain: "月份前用 in。" },
      { point: "介词", type: "choice", q: "We will go to Beijing ___ plane.", options: ["by", "on", "in", "with"], answer: 0, explain: "by + 交通工具：by plane。" },
      // —— 词汇 ——
      { point: "词汇", type: "choice", q: "Which word means “警察”?", options: ["policeman", "postman", "farmer", "doctor"], answer: 0, explain: "policeman = 警察。" },
      { point: "词汇", type: "choice", q: "“健康的” is ___.", options: ["healthy", "heavy", "happy", "hungry"], answer: 0, explain: "healthy = 健康的。" },
      // —— 一般现在时 三单 ——
      { point: "一般现在时(三单)", type: "choice", q: "She ___ to school by bus every day.", options: ["go", "goes", "going", "went"], answer: 1, explain: "every day + 第三人称单数 → goes。" }
    ]
  }
];

/* 各考点的复习建议 + 直达入口（链接相对于 quiz/diagnostic.html） */
window.DIAG_POINTS = {
  "比较级": {
    advice: "两者比较用「比较级 + than」；记牢 +er / 去e加r / 双写 / more 四种变法。",
    links: [
      { label: "讲解：比较级", href: "../subjects/english/mh-comparatives.html?track=mahuan" },
      { label: "练习", href: "run.html?type=quiz&id=mh-en-quiz-comparative&track=mahuan" }
    ]
  },
  "一般过去时": {
    advice: "看到 yesterday / last… / ago 就用过去式；先背不规则动词，didn't / Did 后面用原形。",
    links: [
      { label: "讲解：一般过去时", href: "../subjects/english/mh-past-tense.html?track=mahuan" },
      { label: "不规则动词默写", href: "run.html?type=quiz&id=mh-en-quiz-irregular&track=mahuan" },
      { label: "过去时句子练习", href: "run.html?type=quiz&id=mh-en-quiz-past&track=mahuan" }
    ]
  },
  "一般将来时(will)": {
    advice: "表示将来（tomorrow / next… / this summer）用「will + 动词原形」，will 不随人称变。",
    links: [
      { label: "讲解：一般将来时", href: "../subjects/english/mh-future-tense.html?track=mahuan" },
      { label: "Unit 3 单词", href: "run.html?type=word&id=mh-en-u3-summer&mode=cn2en&track=mahuan" }
    ]
  },
  "be动词/主谓一致": {
    advice: "「我用 am，你用 are，is 跟着他她它；单数 is，复数 are」；不可数名词当单数。",
    links: [
      { label: "讲解：be 动词", href: "../subjects/english/mh-be-verb.html?track=mahuan" },
      { label: "综合练习", href: "run.html?type=quiz&id=mh-en-quiz-mixed&track=mahuan" }
    ]
  },
  "how特殊疑问": {
    advice: "How much 问价格/不可数量；How many 问可数数量；How long 问时间长短；How often 问频率；How far 问距离。",
    links: [
      { label: "综合练习", href: "run.html?type=quiz&id=mh-en-quiz-mixed&track=mahuan" }
    ]
  },
  "介词": {
    advice: "时间：in 月份/年份、on 具体某天、at 几点；交通：by + 工具（by bus / by plane）。",
    links: [
      { label: "综合练习", href: "run.html?type=quiz&id=mh-en-quiz-mixed&track=mahuan" }
    ]
  },
  "词汇": {
    advice: "把四个单元的核心词过一遍，先中→英拼写，错的进生词本反复记。",
    links: [
      { label: "去单词检测", href: "index.html?track=mahuan" }
    ]
  },
  "一般现在时(三单)": {
    advice: "主语是 he/she/it 或单数时，动词加 -s/-es（go→goes, watch→watches）。",
    links: [
      { label: "综合练习", href: "run.html?type=quiz&id=mh-en-quiz-mixed&track=mahuan" }
    ]
  }
};
