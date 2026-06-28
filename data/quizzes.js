/* =============================================================
 *  检测中心 · 习题/检测题库 (QUIZ_BANK)
 * -------------------------------------------------------------
 *  给「习题检测」用的题库，每个对象 = 一套练习。
 *  题型：
 *    choice  单选题  → options[]，answer 是正确项的下标(从0数)
 *    fill    填空题  → answer 是「可接受答案」数组（判分忽略大小写/首尾空格/句末句号）
 *
 *  ▶ 新增一套题：在 QUIZ_BANK 数组里加一个对象（见末尾字段说明）。
 *
 *  目前是「六年级 / 小升初」高频考点，跨教材版本通用；
 *  等确定教材版本和期末范围后，再按单元补成真正的考试题。
 * ============================================================= */

window.QUIZ_BANK = [
  {
    id: "mh-en-quiz-irregular",
    profile: "mahuan", subject: "english", scopes: ["jijiao-6b", "xiaoxue"],
    title: "不规则动词 · 过去式默写",
    desc: "看原形写过去式，小升初最爱考。读三遍再写。",
    tags: ["过去式", "不规则动词", "默写"],
    questions: [
      { type: "fill", q: "go（写出过去式）",    answer: ["went"] },
      { type: "fill", q: "come（写出过去式）",  answer: ["came"] },
      { type: "fill", q: "get（写出过去式）",   answer: ["got"] },
      { type: "fill", q: "make（写出过去式）",  answer: ["made"] },
      { type: "fill", q: "take（写出过去式）",  answer: ["took"] },
      { type: "fill", q: "see（写出过去式）",   answer: ["saw"] },
      { type: "fill", q: "eat（写出过去式）",   answer: ["ate"] },
      { type: "fill", q: "run（写出过去式）",   answer: ["ran"] },
      { type: "fill", q: "swim（写出过去式）",  answer: ["swam"] },
      { type: "fill", q: "read（写出过去式）",  answer: ["read"], explain: "拼写不变，但读音变 /red/" },
      { type: "fill", q: "write（写出过去式）", answer: ["wrote"] },
      { type: "fill", q: "buy（写出过去式）",   answer: ["bought"] },
      { type: "fill", q: "do（写出过去式）",    answer: ["did"] },
      { type: "fill", q: "have（写出过去式）",  answer: ["had"] },
      { type: "fill", q: "give（写出过去式）",  answer: ["gave"] },
      { type: "fill", q: "sing（写出过去式）",  answer: ["sang"] },
      { type: "fill", q: "find（写出过去式）",  answer: ["found"] },
      { type: "fill", q: "say（写出过去式）",   answer: ["said"] },
      { type: "fill", q: "tell（写出过去式）",  answer: ["told"] },
      { type: "fill", q: "think（写出过去式）", answer: ["thought"] }
    ]
  },
  {
    id: "mh-en-quiz-past",
    profile: "mahuan", subject: "english", scopes: ["jijiao-6b", "xiaoxue"],
    title: "一般过去时 · 句子练习",
    desc: "看到 yesterday / last … / ago 就用过去式。",
    tags: ["一般过去时", "时态", "句子"],
    questions: [
      { type: "choice", q: "I ___ to the zoo last Sunday.", options: ["go", "went", "goes", "going"], answer: 1, explain: "last Sunday 是过去时间，go 的过去式是 went。" },
      { type: "choice", q: "Did you ___ your homework yesterday?", options: ["do", "did", "done", "doing"], answer: 0, explain: "Did 后面动词一律用原形 do。" },
      { type: "fill",   q: "She ___ (watch) TV last night.", answer: ["watched"], explain: "规则动词直接 +ed。" },
      { type: "fill",   q: "He ___ (clean) his room yesterday.", answer: ["cleaned"], explain: "clean → cleaned。" },
      { type: "fill",   q: "They ___ (play) football last Friday.", answer: ["played"], explain: "play 以「元音+y」结尾，直接 +ed。" },
      { type: "choice", q: "We ___ to school yesterday because it was Sunday.", options: ["don't go", "didn't go", "doesn't go", "not go"], answer: 1, explain: "过去时否定：didn't + 动词原形。" },
      { type: "choice", q: "What ___ you do last weekend?", options: ["do", "did", "does", "are"], answer: 1, explain: "过去时间提问，助动词用 did。" },
      { type: "choice", q: "___ she happy yesterday?", options: ["Is", "Was", "Did", "Were"], answer: 1, explain: "she 是单数，be 动词过去式用 was。" },
      { type: "fill",   q: "I ___ (have) a good time at the party.", answer: ["had"], explain: "have 的过去式是 had（不规则）。" },
      { type: "choice", q: "My father ___ a new car last month.", options: ["buy", "buys", "bought", "buying"], answer: 2, explain: "last month 过去时间，buy → bought。" }
    ]
  },
  {
    id: "mh-en-quiz-comparative",
    profile: "mahuan", subject: "english", scopes: ["jijiao-6b", "xiaoxue"],
    title: "形容词比较级 · 练习",
    desc: "两者比较 + than；记牢 +er / 去e+r / 双写 / more 四种变法。",
    tags: ["比较级", "than", "形容词"],
    questions: [
      { type: "fill",   q: "Tom is ___ (tall) than Jim.", answer: ["taller"], explain: "直接 +er。" },
      { type: "choice", q: "An elephant is ___ than a dog.", options: ["big", "bigger", "biggest", "more big"], answer: 1, explain: "比较两者用比较级；big 双写 g → bigger。" },
      { type: "choice", q: "Math is ___ than English for me.", options: ["difficult", "more difficult", "difficulter", "most difficult"], answer: 1, explain: "多音节形容词用 more + 原级。" },
      { type: "fill",   q: "She runs ___ (fast) than me.", answer: ["faster"], explain: "fast → faster。" },
      { type: "fill",   q: "My schoolbag is ___ (heavy) than yours.", answer: ["heavier"], explain: "辅音字母 + y → 去 y 加 ier。" },
      { type: "choice", q: "Which is ___, a car or a bike?", options: ["fast", "faster", "fastest", "more fast"], answer: 1, explain: "两者比较用比较级 faster。" },
      { type: "fill",   q: "He is two years ___ (old) than me.", answer: ["older"], explain: "old → older。" },
      { type: "choice", q: "The Yangtze River is ___ than the Yellow River.", options: ["long", "longer", "longest", "more long"], answer: 1, explain: "long → longer。" },
      { type: "fill",   q: "I am ___ (thin) than my brother.", answer: ["thinner"], explain: "重读闭音节双写 n → thinner。" },
      { type: "choice", q: "This story is ___ than that one.", options: ["interesting", "interestinger", "more interesting", "most interesting"], answer: 2, explain: "interesting 是多音节，用 more。" }
    ]
  },
  {
    id: "mh-en-quiz-mixed",
    profile: "mahuan", subject: "english", scopes: ["jijiao-6b", "xiaoxue"],
    title: "小升初综合 · 选择题",
    desc: "be 动词、三单、冠词、介词、代词、可数名词，最常考的混在一起。",
    tags: ["综合", "语法", "小升初"],
    questions: [
      { type: "choice", q: "There ___ some milk in the cup.", options: ["is", "are", "am", "be"], answer: 0, explain: "milk 不可数，谓语用 is。" },
      { type: "choice", q: "She ___ to school by bus every day.", options: ["go", "goes", "going", "went"], answer: 1, explain: "every day + 第三人称单数，go → goes。" },
      { type: "choice", q: "I have ___ apple and ___ banana.", options: ["a / a", "an / a", "a / an", "an / an"], answer: 1, explain: "apple 以元音音素开头用 an；banana 用 a。" },
      { type: "choice", q: "Look! The children ___ playing on the playground.", options: ["is", "am", "are", "be"], answer: 2, explain: "children 是复数，be 用 are（现在进行时）。" },
      { type: "choice", q: "This is ___ pencil. (我的)", options: ["I", "my", "me", "mine"], answer: 1, explain: "名词前用形容词性物主代词 my。" },
      { type: "choice", q: "These books are ___. (她的)", options: ["she", "her", "hers", "she's"], answer: 2, explain: "名词后单独用名词性物主代词 hers。" },
      { type: "choice", q: "He is good ___ English.", options: ["at", "in", "on", "for"], answer: 0, explain: "固定搭配 be good at 擅长。" },
      { type: "choice", q: "There are many ___ in the basket.", options: ["tomato", "tomatos", "tomatoes", "tomatoer"], answer: 2, explain: "以辅音 + o 结尾，复数加 es → tomatoes。" },
      { type: "choice", q: "___ you like some juice?", options: ["Do", "Would", "Are", "Did"], answer: 1, explain: "礼貌提议固定句型 Would you like…？" },
      { type: "choice", q: "How ___ water do you want?", options: ["much", "many", "old", "long"], answer: 0, explain: "water 不可数，用 how much。" }
    ]
  }
];

/* =============================================================
 *  字段说明
 * -------------------------------------------------------------
 *  id        唯一标识（建议 "mh-en-quiz-<主题>"）
 *  track     学习空间 key（"mahuan"）
 *  subject   科目 key（"english"）
 *  title     这套练习的标题
 *  desc      一句话说明
 *  tags      标签数组（搜索用，可选）
 *  questions 题目数组，每题：
 *              type     "choice" 或 "fill"
 *              q        题干（填空用 ___ 表示空，或括号给提示词）
 *              options  选项数组（仅 choice）
 *              answer   choice→正确项下标(数字)；fill→可接受答案数组(字符串)
 *              explain  解析（可选，做错时显示）
 * ============================================================= */
