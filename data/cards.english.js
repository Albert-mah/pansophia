/* =============================================================
 *  知识卡片 · 英语(规格见 docs/card-system.md)
 *  「考点已有讲解页」的金标准样例:kp = catalog id,卡片在讲解页上方
 *  以「⚡ 一分钟版」出现,SRS 复习也用它。
 * ============================================================= */
window.STUDY_CARDS = (window.STUDY_CARDS || []).concat([
  {
    kp: "mh-en-alphabet",
    title: "26个字母与自然拼读入门",
    subject: "english", scope: "chuzhong",
    mode: "drill",
    hook: "看到生词只会念字母名、拼不出整个词?字母音才是拼单词的钥匙",
    body: [
      { t: "为什么先学它", p: "看到 dog、fish 这种没背过的词,你想读出来,却只会一个一个念字母名 dee-oh-gee,怎么也连不成一个词——因为字母在单词里发的是**另一套音**。不先分清字母名和字母音,拼读这第一步就迈不出去。" },
      { t: "字母名与字母音", p: "每个字母有两个身份:**字母名**(读字母表时的名字,A 读 /eɪ/)和**字母音**(在单词里发的音,apple 里 a 发 /æ/)。拼单词靠**字母音**,读缩写才用字母名:`CD` 念字母名,`cat` 拼字母音。五个元音短音记熟:a /æ/(cat)、e /e/(bed)、i /ɪ/(sit)、o /ɒ/(box)、u /ʌ/(cup)。" },
      { t: "字母组合与拼读", p: "两个字母搭伙只发一个音:**sh**(fish)、**ch**(chair)、**th**(this)、**-ck**(duck),看到别拆开。拼读三步:① 从左到右每个字母(或组合)配上字母音;② 把音连起来 `c-a-t → cat`;③ 读出来对意思。拼不出来的怪词(said)是**视觉词**,整个记。" },
      { t: "通往哪里", p: "拼读练熟,你就能自己**认读生词**,把课本里的**问候与课堂用语**、家庭·学校·食物这些**高频词**自己读出来,不用每个都问老师、等人教。它是后面所有单词和句子的地基。" }
    ],
    example: "拼 dog:d /d/ + o /ɒ/ + g /g/ → 连读 /dɒg/。注意用的是字母音,不是字母名 dee-oh-gee。",
    pitfall: "用**字母名**去拼单词是最常见错误:把 cat 读成 see-ay-tee 永远拼不出来 —— 单词里用**字母音**。",
    mnemonic: "认字母用名字,拼单词用声音;五个短元音:cat bed sit box cup。",
    minutes: 3, difficulty: 1,
    date: "2026-07-11", by: "claude"
  },
  {
    kp: "mh-en-past-tense",
    title: "一般过去时（动词过去式）",
    subject: "english", scope: "chuzhong",
    mode: "drill",
    hook: "想讲昨天的事,说出来全是今天的样子?动词得先变过去式",
    body: [
      { t: "为什么需要它", p: "你想跟同学讲**昨天**发生的事——昨天我去了公园、看了电影,可嘴里全是 I go、I see 这种今天的说法,听起来像天天都在做,没讲清是过去。想把“已经做过、结束了”说明白,动词就得先变**过去式**。" },
      { t: "什么时候用+规则变化", p: "表示**过去发生、已经结束**的事,信号词:yesterday、last night / last week、two days ago、just now。规则变化四条:直接 +ed(play → played);e 结尾只 +d(like → liked);辅音字母+y 变 y 为 i 再 +ed(study → studied);重读闭音节双写末尾再 +ed(stop → stopped)。" },
      { t: "不规则动词与 did", p: "一批动词只能一个个记:go → went、have → had、see → saw、eat → ate、read → read(读音变 /red/)。否定和疑问交给 **did**:didn't + **动词原形**,Did you…? 里动词也用原形——did 已经替你表示过去了,动词不用再变。" },
      { t: "通往哪里", p: "过去时是时态四件套的一环。会了它,再和**现在进行时**(此刻正在)、**一般将来时 will**(明天要做)对照着用,你就能分清一件事到底发生在过去、现在还是将来,讲故事、写日记都拎得清。" }
    ],
    example: "Did you went to school? ❌ → Did you **go** to school? ✔ did 一出场,动词就变回原形。",
    pitfall: "did 和动词过去式同时出现是最高频错误:She didn't went ❌ → She didn't go ✔。",
    mnemonic: "did 在场,动词还原;did 不在,动词变身。",
    minutes: 3, difficulty: 1,
    date: "2026-07-11", by: "claude"
  },
  {
    kp: "mh-en-comparatives",
    title: "形容词比较级（taller / bigger / more …）",
    subject: "english", scope: "chuzhong",
    mode: "drill",
    hook: "想说“我比你高”却卡在 taller 还是 more tall?两者一比就加 than",
    body: [
      { t: "为什么需要它", p: "你想说**我比你高**、这个更难,张口却是 I tall than you 或 more taller,被同学一笑——原来一比**两个**东西,形容词得换成**比较级**、后面还要配 **than**。不会变比较级,连最常用的“谁比谁怎么样”都说不利索。" },
      { t: "句型与四条变形", p: "句型:A + be/动词 + 比较级 + **than** + B。四条变形:一般 `+er`(tall→taller);e 结尾 `+r`(nice→nicer);辅音+y 变 y 为 i 再 `+ier`(happy→happier);重读闭音节双写尾字母 `+er`(big→bigger)。" },
      { t: "长词 more + 不规则", p: "音节多的长词不加 er,前面放 **more**:more difficult、more beautiful。几个不规则硬记:good/well→better、bad→worse、many/much→more、little→less、far→farther。**more 和 er 绝不同时用**(more taller ❌)。" },
      { t: "通往哪里", p: "比较级把你的句子从“是什么”升级到“比一比”。有了它,再学**一般疑问句**(Who is taller?)、写**看图说话小作文**时,你就能描述、能对比,句子一下子丰富起来。" }
    ],
    example: "Tom is more tall than Jim. ❌ → Tom is **taller** than Jim. ✔ tall 是单音节词,直接 +er,不能再加 more。",
    pitfall: "more 和 er 从不同台:more taller ❌,只能留一个说法。双写字母也常漏,big 要写成 bigger,不是 biger。",
    mnemonic: "一个音节加 er,音节多了用 more;e 结尾加 r,辅音+y 变 ier,闭音节要双写。",
    minutes: 3, difficulty: 2,
    date: "2026-07-11", by: "sonnet"
  },
  {
    kp: "mh-en-be-verb",
    title: "be 动词：am / is / are / was / were",
    subject: "english", scope: "chuzhong",
    mode: "drill",
    hook: "想说“我是学生”写成 I student?句子缺了 be 这根梁",
    body: [
      { t: "为什么需要它", p: "你想说**我是学生**、他很高,写出来却是 I student、He tall——句子塌了,因为缺了根梁 **be 动词**。英语里表示“是、在”得靠 am / is / are 撑着,少了它,最简单的自我介绍都立不起来。" },
      { t: "主语配 be", p: "be 动词是 **am / is / are**(现在)、**was / were**(过去),意思接近“是”,必须跟主语一致:I 用 am;he / she / it / 单数名词用 is;you / we / they / 复数名词用 are。过去式:am、is → was;are → were。" },
      { t: "否定·疑问·there be", p: "否定在 be 后加 not(isn't / aren't / wasn't / weren't);一般疑问句把 be 提到句首:You are… → Are you…?。**there be**(有…)看紧跟的名词定单复数:There **is** a cat…、There **are** two cats…。" },
      { t: "通往哪里", p: "be 动词是所有基础句型的地基。撑住它,你才能接着学**一般疑问句**(Are you…? Is this…?)、**名词单复数**(决定用 is 还是 are)、**人称代词**,一步步把简单句搭完整。" }
    ],
    example: "There ___ some books on the desk. 空格该填 are,因为 books 是复数,不是 is。",
    pitfall: "be 动词和实义动词同时做谓语是最高频错误:She is likes cats ❌ → She likes cats ✔ / She is a cat lover ✔,二选一,别叠加。",
    mnemonic: "我用 am,你用 are,is 跟着他她它;有 be 就别加别的动词一起顶谓语。",
    minutes: 3, difficulty: 1,
    date: "2026-07-11", by: "sonnet"
  },
  {
    kp: "mh-en-nouns-plural",
    title: "可数与不可数名词",
    subject: "english", scope: "chuzhong",
    mode: "drill",
    hook: "two apple 被老师圈了红?能数的名词多了就得加 s",
    body: [
      { t: "为什么需要它", p: "你想说**两个苹果**,写成 two apple,作业本上被老师圈了红——能数的东西一多,名词后面就得加 **s**。可有些词(水、米饭)又永远不加 s,分不清哪种能加,复数和量词就全乱。" },
      { t: "可数与不可数", p: "**可数名词**能一个个数,前面能加 **a/an**(a book),变多加 **s/es**(books、boxes)。**不可数名词**数不清(water、rice、milk、bread、money、homework、weather),**没有复数**、不加 a/an、不加 s,默认当**单数**看,be 用 is/was。" },
      { t: "量词表数量", p: "想说不可数名词的数量,靠**量词短语**:a glass of water、a piece of bread、two bowls of rice——变复数的是量词(glasses、pieces、bowls),不是后面的名词。问数量:可数用 how many,不可数用 how much。" },
      { t: "通往哪里", p: "分清单复数,你才能决定 be 动词用 **is 还是 are**(主谓一致)、代词用 it 还是 they,也为后面**人称代词**和各种时态里的第三人称打底。数得清,句子才配得对。" }
    ],
    example: "How much rice do we have? 问不可数名词的数量用 how much,不能说 how many rice。",
    pitfall: "给不可数名词加 s 或前面加 a/an 是最常见错误:a rice ❌、two moneys ❌ —— 不可数名词永远不加 s,数量要靠 a piece of / a bowl of 这种量词短语。",
    mnemonic: "能数用 a/an 加 s,不能数别加 a 别加 s,数量找量词借个“容器”。",
    minutes: 3, difficulty: 2,
    date: "2026-07-11", by: "sonnet"
  },
  {
    kp: "mh-en-pronouns",
    title: "人称代词与物主代词",
    subject: "english", scope: "chuzhong",
    mode: "drill",
    hook: "“她喜欢他”说成 She likes he?代词站错位子就出错",
    body: [
      { t: "为什么需要它", p: "你想说**她喜欢他**,说成 She likes he;想说**这本书是我的**,说成 This is mine book——都是代词站错了位子。英语里代词做主语、做宾语长得不一样,后面跟不跟名词也有讲究,放错就别扭。" },
      { t: "主格与宾格", p: "人称代词分**主格**(做主语)I/you/he/she/it/we/they 和**宾格**(动词后、介词后)me/you/him/her/it/us/them。She likes **him**(不是 he);介词后也用宾格:give it **to me**(不是 to I)。" },
      { t: "两种物主代词", p: "**形容词性**(my/your/his/her/our/their)后面**必须跟名词**:my book;**名词性**(mine/yours/hers/ours/theirs)后面**不跟名词**,单独代替“我的东西”:This book is **mine**。对照:I—me—my—mine、she—her—her—hers,最容易搞混。" },
      { t: "通往哪里", p: "代词是句子的“替身演员”,用顺了句子才不啰嗦。它和 be 动词、名词单复数一起把**基础句型**搭稳,你接着就能进**时态**——一般现在、进行、过去,主语换成代词也不慌。" }
    ],
    example: "This is not my pen. ___ is on the desk. 空格该填 **Mine**(名词性物主代词,后面不跟名词,单独代替“我的笔”)。",
    pitfall: "形容词性和名词性物主代词混用是最常见错误:This is mine book ❌(mine 后面不能跟名词)→ This is **my** book ✔ 或 This book is **mine** ✔。",
    mnemonic: "主格站主语位,宾格站宾语位;物主代词后面有名词用 my 类,没名词用 mine 类。",
    minutes: 3, difficulty: 1,
    date: "2026-07-11", by: "sonnet"
  },
  {
    kp: "mh-en-future-tense",
    title: "一般将来时（will + 动词原形）",
    subject: "english", scope: "chuzhong",
    mode: "drill",
    hook: "想讲“明天要做的事”却不会说?will + 动词原形专管将来",
    body: [
      { t: "为什么需要它", p: "你想说**明天我要去动物园**、下周考试,张口却是 Tomorrow I go(听着像今天)或 I will goes(多了个 s)——讲将来的事得用 **will + 动词原形**。不会它,一切还没发生的计划都说不清楚。" },
      { t: "will + 动词原形", p: "句中出现 tomorrow、next week / next year、soon、in the future 这些将来时间词,就用 **will + 动词原形**。will 不随人称变,I / you / he / she 后面都用 will。be 的将来式是 **will be**:I will be 11 next year(不是 will is)。" },
      { t: "否定与疑问", p: "否定:will 后加 not,缩写 **won't** + 原形(I won't go)。疑问:把 **Will** 提到句首:Will you come? — Yes, I will. / No, I won't。常见缩写 I'll、he'll、won't。想说事先计划好的事也可用 be going to,先认得出就够。" },
      { t: "通往哪里", p: "将来时一学会,你的**时态四件套**就凑齐了:一般现在、现在进行、一般过去、一般将来。四种一对照,任何一件事发生在什么时候你都能说准,写日记、讲计划再不会串味。" }
    ],
    example: "Tomorrow I will goes to the zoo. ❌ → Tomorrow I will **go** to the zoo. ✔ will 后面一定接动词原形,不能加 s。",
    pitfall: "will 后面加了三单 s 或改成过去式是最高频错误:He will goes ❌ / He will went ❌ → He will **go** ✔,will 已经表示将来,动词永远用原形。",
    mnemonic: "will 一出场,动词就原形;tomorrow、next 一出现,先想到 will。",
    minutes: 3, difficulty: 2,
    date: "2026-07-11", by: "sonnet"
  },
  {
    kp: "mh-en-present-continuous",
    title: "现在进行时（be + 动词-ing）",
    subject: "english", scope: "chuzhong",
    mode: "drill",
    hook: "想说“我正在吃饭”说成 I eat?此刻正在要用 be + 动词-ing",
    body: [
      { t: "为什么需要它", p: "妈妈问你在干嘛,你想说**我正在吃饭**、他正在跑步,说成 I eat、He run——听着像天天做的习惯,没讲出**此刻正在**。表示眼下正发生的事,得用 **be + 动词-ing**,漏了 be 就塌。" },
      { t: "结构与信号词", p: "现在进行时 = **am / is / are + 动词-ing**,主语配 be:I 用 am,he / she / it 用 is,you / we / they 用 are:She **is running**。看到 **Look!、Listen!、now、at the moment**,就要想到它。" },
      { t: "-ing 拼写四规则", p: "一般直接 +ing(play→playing);不发音的 e 结尾去 e 再 +ing(make→making);重读闭音节双写尾字母(run→running、sit→sitting);ie 结尾变 y 再 +ing(lie→lying)。like / know / want 这类状态动词一般不用进行时。" },
      { t: "通往哪里", p: "进行时管“此刻正在”,是时态链的第二环。把它和**一般过去时**(昨天做过)、**一般将来时 will**(明天要做)接上,一件事的现在、过去、将来你就都能说,讲得有画面。" }
    ],
    example: "The cat sleeping on the sofa. ❌ → The cat **is** sleeping on the sofa. ✔ 动词 -ing 前面的 be 动词不能丢。",
    pitfall: "-ing 前漏掉 be 动词是最高频错误:She dancing ❌ → She **is** dancing ✔;重读闭音节忘记双写也常见:runing ❌ → running ✔。",
    mnemonic: "看见 Look!/Listen!/now,be + doing 别偷懒;双写规则记牢,run 要变 running 不是 runing。",
    minutes: 3, difficulty: 2,
    date: "2026-07-11", by: "sonnet"
  }
]);
