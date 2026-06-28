/* =============================================================
 *  检测中心 · 单词库 (WORD_BANK)
 * -------------------------------------------------------------
 *  给「单词检测」用的词表，按单元/主题分组。
 *  检测页会用它生成：中→英拼写、英→中选择、看词义听写 等模式。
 *
 *  ▶ 新增一组词：在 WORD_BANK 数组里加一个对象即可（见末尾字段说明）。
 *
 *  当前内容 = 冀教版《英语（三年级起点）六年级下册》「Words in Each Unit」
 *  里要求"听懂·会说·认读·书写"的核心词（即期末要默写的词），按 4 个单元分组。
 *  来源教材：河北教育出版社 六年级下册。
 * ============================================================= */

window.WORD_BANK = [
  {
    id: "mh-en-u1-sports",
    profile: "mahuan", subject: "english", scopes: ["jijiao-6b", "xiaoxue"],
    unit: "六下 Unit 1", title: "Unit 1 Sports（运动）",
    desc: "球类、比赛、形容词比较：sport / football / heavy / difficult …",
    words: [
      { en: "sport", cn: "运动" },
      { en: "football", cn: "足球" },
      { en: "any", cn: "任一；一些" },
      { en: "some", cn: "一些" },
      { en: "wear", cn: "穿" },
      { en: "or", cn: "或者；还是" },
      { en: "basketball", cn: "篮球" },
      { en: "try", cn: "试；尝试" },
      { en: "heavy", cn: "重的" },
      { en: "difficult", cn: "困难的；费力的" },
      { en: "easy", cn: "容易的" },
      { en: "hand", cn: "手" },
      { en: "game", cn: "比赛；游戏" },
      { en: "ask", cn: "问" },
      { en: "very", cn: "很；非常" },
      { en: "answer", cn: "回答；答案" },
      { en: "policeman", cn: "警察" },
    ]
  },
  {
    id: "mh-en-u2-health",
    profile: "mahuan", subject: "english", scopes: ["jijiao-6b", "xiaoxue"],
    unit: "六下 Unit 2", title: "Unit 2 Good Health to You!（健康）",
    desc: "健康习惯、锻炼、时间频率：healthy / exercise / often / minute …",
    words: [
      { en: "strong", cn: "强壮的；有力的" },
      { en: "healthy", cn: "健康的" },
      { en: "before", cn: "在……之前" },
      { en: "after", cn: "在……之后" },
      { en: "bad", cn: "有害的；糟糕的" },
      { en: "next", cn: "紧接着；下一个的" },
      { en: "often", cn: "常常；经常" },
      { en: "exercise", cn: "锻炼；练习" },
      { en: "minute", cn: "分钟" },
      { en: "hour", cn: "小时" },
      { en: "high", cn: "高；高的；在高处" },
    ]
  },
  {
    id: "mh-en-u3-summer",
    profile: "mahuan", subject: "english", scopes: ["jijiao-6b", "xiaoxue"],
    unit: "六下 Unit 3", title: "Unit 3 What Will You Do This Summer?（暑假）",
    desc: "暑假活动、地点：swim / lake / ship / visit …",
    words: [
      { en: "fan", cn: "风扇；扇子；扇" },
      { en: "close", cn: "关；关闭；合上" },
      { en: "angry", cn: "发怒的；生气的" },
      { en: "lake", cn: "湖" },
      { en: "swim", cn: "游泳", tip: "过去式 swam" },
      { en: "ship", cn: "船；舰" },
      { en: "visit", cn: "拜访；参观" },
      { en: "clever", cn: "聪明的" },
    ]
  },
  {
    id: "mh-en-u4-home",
    profile: "mahuan", subject: "english", scopes: ["jijiao-6b", "xiaoxue"],
    unit: "六下 Unit 4", title: "Unit 4 Li Ming Comes Home（送别）",
    desc: "聚会、告别、过去式：party / get / tell / good-bye …",
    words: [
      { en: "get", cn: "开始；得到", tip: "过去式 got" },
      { en: "late", cn: "晚的；迟到的" },
      { en: "early", cn: "早的；早到的" },
      { en: "party", cn: "聚会；晚会" },
      { en: "tell", cn: "告诉；讲述" },
      { en: "begin", cn: "开始" },
      { en: "cake", cn: "蛋糕" },
      { en: "every", cn: "每个(人或物)" },
      { en: "all", cn: "全部；所有的" },
      { en: "good-bye", cn: "再见" },
      { en: "hear", cn: "听见；听到" },
    ]
  },
];

/* =============================================================
 *  字段说明
 *   id/track/subject/unit/title/desc 见首页与检测中心
 *   words[]: { en 英文, cn 中文, ps 音标(可选), tip 提示/用法(可选) }
 *  ▶ 想加"认读词"或其他单元，照格式在数组里加一组即可。
 * ============================================================= */
