/* =============================================================
 *  知识卡片 · 英语(规格见 docs/card-system.md)
 *  「考点已有讲解页」的金标准样例:kp = catalog id,卡片在讲解页上方
 *  以「⚡ 一分钟版」出现,SRS 复习也用它。
 * ============================================================= */
window.STUDY_CARDS = (window.STUDY_CARDS || []).concat([
  {
    kp: "mh-en-alphabet",
    title: "26个字母与自然拼读入门",
    subject: "english", scope: "jijiao-6b",
    mode: "drill",
    hook: "认字母用名字,拼单词用声音;讲解页里每个字母都能点着听",
    body: [
      { t: "字母名与字母音", p: "每个字母有两个身份:**字母名**(读字母表时的名字,如 A 读 /eɪ/)和**字母音**(在单词里发的音,如 apple 里的 a 发 /æ/)。拼读单词靠**字母音**,读缩写才用字母名:`CD` 逐个读字母名,`cat` 要拼字母音。" },
      { t: "五个元音的短音", p: "a e i o u 五个元音最常见的短音:**a /æ/**(cat)、**e /e/**(bed)、**i /ɪ/**(sit)、**o /ɒ/**(box)、**u /ʌ/**(cup)。把这五个短音听熟,大部分三字母单词就能自己拼出来。" },
      { t: "常见字母组合", p: "两个字母搭伙只发一个音:**sh /ʃ/**(fish)、**ch /tʃ/**(chair)、**th**(this / thank 的咬舌音)、**-ck /k/**(duck)。看到这些组合别拆开一个一个读。" },
      { t: "拼读三步法", p: "碰到生词:① 从左到右给每个字母(或组合)配上**字母音**;② 把音**连**起来:`c-a-t → cat`;③ 连出来读一读,对不对得上意思。拼不出来的怪词(如 said)就是**视觉词**,直接整个记。" }
    ],
    example: "拼 dog:d /d/ + o /ɒ/ + g /g/ → 连读 /dɒg/。注意用的是字母音,不是字母名 dee-oh-gee。",
    pitfall: "用**字母名**去拼单词是最常见错误:把 cat 读成 see-ay-tee 永远拼不出来 —— 单词里用**字母音**。",
    mnemonic: "认字母用名字,拼单词用声音;五个短元音:cat bed sit box cup。",
    minutes: 3, difficulty: 1,
    date: "2026-07-03", by: "claude"
  },
  {
    kp: "mh-en-past-tense",
    title: "一般过去时（动词过去式）",
    subject: "english", scope: "xiaoxue",
    mode: "drill",
    hook: "看到 yesterday / last… / ago,动词就要变过去式",
    body: [
      { t: "什么时候用", p: "一般过去时表示**过去发生、已经结束**的事。信号词:yesterday、last night / last week、two days ago、just now。" },
      { t: "规则变化四条", p: "直接 +ed(play → played);以 e 结尾只 +d(like → liked);辅音字母+y 结尾变 y 为 i 再 +ed(study → studied);重读闭音节双写末尾字母(stop → stopped)。" },
      { t: "不规则动词", p: "只能一个个记:go → went、have → had、see → saw、eat → ate、read → read(拼写不变,读音变 /red/)。" },
      { t: "did 的用法", p: "否定和疑问交给 did:didn't + **动词原形**;Did you…? 里动词也用原形 —— did 已经替你表示「过去」了,动词不用再变。" }
    ],
    example: "Did you went to school? ❌ → Did you **go** to school? ✔ did 一出场,动词就变回原形。",
    pitfall: "did 和动词过去式同时出现是最高频错误:She didn't went ❌ → She didn't go ✔。",
    mnemonic: "did 在场,动词还原;did 不在,动词变身。",
    minutes: 3, difficulty: 1,
    date: "2026-07-02", by: "claude"
  },
  {
    kp: "mh-en-comparatives",
    title: "形容词比较级（taller / bigger / more …）",
    subject: "english", scope: "jijiao-6b",
    mode: "drill",
    hook: "两者比,加 than;单音节 +er,长词用 more,不能两个一起加",
    body: [
      { t: "句型与变形四规则", p: "比较级用来比**两个**人或物,句型是 A + be/动词 + 比较级 + **than** + B。四条变形规则:一般 `+er`(tall→taller);以 e 结尾只 `+r`(nice→nicer);辅音字母+y 结尾变 y 为 i 再 `+ier`(happy→happier);重读闭音节双写尾字母再 `+er`(big→bigger、hot→hotter)。" },
      { t: "长词用 more", p: "音节多、比较长的形容词不加 er,前面直接放 **more**:difficult→more difficult、interesting→more interesting、beautiful→more beautiful。" },
      { t: "不规则比较级", p: "没有规律,只能硬记:good/well→better,bad→worse,many/much→more,little→less,far→farther/further。" },
      { t: "最爱挖的坑", p: "more 和 er 不能同时出现(more taller ❌);双写字母别漏(bigger 不是 biger);比较两者 than 千万别丢;想加强语气用 much/a lot/even + 比较级,不能用 very。" }
    ],
    example: "Tom is more tall than Jim. ❌ → Tom is **taller** than Jim. ✔ tall 是单音节词,直接 +er,不能再加 more。",
    pitfall: "more 和 er 从不同台:more taller ❌,只能留一个说法。双写字母也常漏,big 要写成 bigger,不是 biger。",
    mnemonic: "一个音节加 er,音节多了用 more;e 结尾加 r,辅音+y 变 ier,闭音节要双写。",
    minutes: 3, difficulty: 2,
    date: "2026-07-02", by: "sonnet"
  },
  {
    kp: "mh-en-be-verb",
    title: "be 动词：am / is / are / was / were",
    subject: "english", scope: "jijiao-6b",
    mode: "drill",
    hook: "我用 am,你用 are,is 跟着他她它;有 be 就别再叠别的动词",
    body: [
      { t: "主语配 be", p: "be 动词就是 **am / is / are**(现在)和 **was / were**(过去),接近“是”的意思,必须跟主语一致:I 用 am;he / she / it / 单数名词用 is;you / we / they / 复数名词用 are。" },
      { t: "过去式·否定·疑问", p: "变过去式:am、is → was;are → were。否定句在 be 后面直接加 not(isn't / aren't / wasn't / weren't);一般疑问句把 be 动词提到句首,比如 You are… → Are you…?" },
      { t: "there be 句型", p: "there be(有……)句型里,be 的单复数看**后面紧跟的名词**:There is a cat…、There are two cats…、There is some water…(不可数名词按单数算)。" },
      { t: "别叠加动词", p: "一句话里已经有 be 动词,后面就不能再加实义动词的第三人称形式:She is likes music ❌,要写成 She likes music ✔ 或 She is a music fan ✔。" }
    ],
    example: "There ___ some books on the desk. 空格该填 are,因为 books 是复数,不是 is。",
    pitfall: "be 动词和实义动词同时做谓语是最高频错误:She is likes cats ❌ → She likes cats ✔ / She is a cat lover ✔,二选一,别叠加。",
    mnemonic: "我用 am,你用 are,is 跟着他她它;有 be 就别加别的动词一起顶谓语。",
    minutes: 3, difficulty: 1,
    date: "2026-07-02", by: "sonnet"
  },
  {
    kp: "可数与不可数名词",
    title: "可数与不可数名词",
    subject: "english", scope: "jijiao-6b",
    mode: "drill",
    hook: "能数用 a/an 加 s;不能数别加 a 别加 s,数量找量词借“容器”",
    body: [
      { t: "怎么区分", p: "可数名词能一个一个数,前面能加 **a/an**(a book、an apple),变多个要加 **s/es**(books、boxes)。不可数名词数不清(水、米饭、知识、天气这些),**没有复数形式**,前面不能加 a/an,也不能直接加 s。" },
      { t: "常见不可数词", p: "water(水)、rice(米饭)、milk(牛奶)、bread(面包)、money(钱)、homework(作业)、weather(天气)、news(新闻)。它们默认当**单数**看待,be 动词用 is/was。" },
      { t: "量词短语表数量", p: "想表达不可数名词的数量,要靠**量词短语**:a glass of water(一杯水)、a piece of bread(一片面包)、two bowls of rice(两碗米饭)——变多的是量词本身(glasses、pieces、bowls),不是后面的名词。" },
      { t: "分情况的词", p: "有些词看着不可数其实要分情况:fruit 通常不可数(some fruit),但具体一种水果 an apple / a banana 是可数的;paper 做“纸”不可数,做“试卷/论文”时可数(a paper)。" }
    ],
    example: "How much rice do we have? 问不可数名词的数量用 how much,不能说 how many rice。",
    pitfall: "给不可数名词加 s 或前面加 a/an 是最常见错误:a rice ❌、two moneys ❌ —— 不可数名词永远不加 s,数量要靠 a piece of / a bowl of 这种量词短语。",
    mnemonic: "能数用 a/an 加 s,不能数别加 a 别加 s,数量找量词借个“容器”。",
    minutes: 3, difficulty: 2,
    date: "2026-07-02", by: "sonnet"
  },
  {
    kp: "人称代词与物主代词",
    title: "人称代词与物主代词",
    subject: "english", scope: "jijiao-6b",
    mode: "drill",
    hook: "主格站主语位,宾格站宾语位;物主代词后面有名词用 my 类,没名词用 mine 类",
    body: [
      { t: "主格与宾格", p: "人称代词分**主格**(做主语)和**宾格**(做宾语):I/you/he/she/it/we/they 是主格,me/you/him/her/it/us/them 是宾格。做主语用主格,动词后、介词后用宾格:She likes **him**,不能说 She likes he。" },
      { t: "两种物主代词", p: "**形容词性**(my/your/his/her/its/our/their)后面必须**跟名词**,相当于形容词,比如 my book;**名词性**(mine/yours/his/hers/its/ours/theirs)后面**不跟名词**,单独顶替“名词”,比如 This book is mine。" },
      { t: "对照表", p: "I—me—my—mine;you—you—your—yours;he—him—his—his;she—her—her—hers;we—us—our—ours;they—them—their—theirs。he 和 she 的形容词性物主代词长得像宾格(his、her),最容易搞混。" },
      { t: "常见考法", p: "填空选 my 还是 mine 看后面**有没有名词跟着**——有名词选 my book,没名词选 mine。介词 to/with/for 后面的代词一律用宾格:give it **to me**,不是 to I。" }
    ],
    example: "This is not my pen. ___ is on the desk. 空格该填 **Mine**(名词性物主代词,后面不跟名词,单独代替“我的笔”)。",
    pitfall: "形容词性和名词性物主代词混用是最常见错误:This is mine book ❌(mine 后面不能跟名词)→ This is **my** book ✔ 或 This book is **mine** ✔。",
    mnemonic: "主格站主语位,宾格站宾语位;物主代词后面有名词用 my 类,没名词用 mine 类。",
    minutes: 3, difficulty: 1,
    date: "2026-07-02", by: "sonnet"
  },
  {
    kp: "mh-en-future-tense",
    title: "一般将来时（will + 动词原形）",
    subject: "english", scope: "jijiao-6b",
    mode: "drill",
    hook: "tomorrow/next…一出现,will + 动词原形,别忘否定是 won't",
    body: [
      { t: "什么时候用 will", p: "句子里出现 tomorrow、next week / next year、this summer、soon、in the future 这些**将来时间词**,就用 **will + 动词原形**。will 不随人称变化,I / you / he / she / we / they 后面都用 will。" },
      { t: "否定与疑问句", p: "否定:will 后加 not,缩写成 **won't** + 动词原形,I won't go。一般疑问句把 **Will** 提到句首:Will you come? — Yes, I will. / No, I won't。" },
      { t: "缩写与 be 将来式", p: "常见缩写:I will→I'll、he will→he'll、will not→won't。be 动词的将来式是 **will be**,不能写成 will is / will am:I will be 11 next year。" },
      { t: "will 与 going to", p: "两个都能说将来,小升初先记住:will 常用来说临时决定或预测(I think it will rain);**be going to** 常用来说事先计划好的事(We are going to visit grandma)。能认出 be going to 就够了,重点还是 will + 动词原形。" }
    ],
    example: "Tomorrow I will goes to the zoo. ❌ → Tomorrow I will **go** to the zoo. ✔ will 后面一定接动词原形,不能加 s。",
    pitfall: "will 后面加了三单 s 或改成过去式是最高频错误:He will goes ❌ / He will went ❌ → He will **go** ✔,will 已经表示将来,动词永远用原形。",
    mnemonic: "will 一出场,动词就原形;tomorrow、next 一出现,先想到 will。",
    minutes: 3, difficulty: 2,
    date: "2026-07-02", by: "sonnet"
  },
  {
    kp: "mh-en-present-continuous",
    title: "现在进行时（be + 动词-ing）",
    subject: "english", scope: "jijiao-6b",
    mode: "drill",
    hook: "Look!/Listen!/now 一出现,be + 动词-ing,别漏了 be",
    body: [
      { t: "be + doing 结构", p: "现在进行时 = **am / is / are + 动词-ing**,表示此刻正在做的事。主语配 be:I 用 am,he / she / it 用 is,you / we / they 用 are。She **is running**。" },
      { t: "信号词", p: "看到 **Look!、Listen!、now、right now、at the moment** 这些词,就要想到现在进行时,句子里常常没有别的提示。" },
      { t: "-ing 拼写四规则", p: "一般直接 +ing(play→playing);不发音的 e 结尾去 e 再 +ing(make→making);重读闭音节双写尾字母再 +ing(run→running、sit→sitting);ie 结尾变 y 再 +ing(lie→lying)。" },
      { t: "和一般现在时的区分", p: "一般现在时说**习惯或事实**(I go to school every day);现在进行时说**此刻正在做**(I am going to school now)。like / know / want 这类状态动词一般不用进行时:I am liking it ❌ → I like it ✔。" }
    ],
    example: "The cat sleeping on the sofa. ❌ → The cat **is** sleeping on the sofa. ✔ 动词 -ing 前面的 be 动词不能丢。",
    pitfall: "-ing 前漏掉 be 动词是最高频错误:She dancing ❌ → She **is** dancing ✔;重读闭音节忘记双写也常见:runing ❌ → running ✔。",
    mnemonic: "看见 Look!/Listen!/now,be + doing 别偷懒;双写规则记牢,run 要变 running 不是 runing。",
    minutes: 3, difficulty: 2,
    date: "2026-07-02", by: "sonnet"
  }
]);
