/* =============================================================
 *  知识卡片 · 英语(规格见 docs/card-system.md)
 *  「考点已有讲解页」的金标准样例:kp = catalog id,卡片在讲解页上方
 *  以「⚡ 一分钟版」出现,SRS 复习也用它。
 * ============================================================= */
window.STUDY_CARDS = (window.STUDY_CARDS || []).concat([
  {
    kp: "mh-en-past-tense",
    title: "一般过去时（动词过去式）",
    subject: "english", scope: "xiaoxue",
    mode: "drill",
    hook: "看到 yesterday / last… / ago,动词就要变过去式",
    body: [
      "一般过去时表示**过去发生、已经结束**的事。信号词:yesterday、last night / last week、two days ago、just now。",
      "规则变化四条:直接 +ed(play → played);以 e 结尾只 +d(like → liked);辅音字母+y 结尾变 y 为 i 再 +ed(study → studied);重读闭音节双写末尾字母(stop → stopped)。",
      "不规则动词只能一个个记:go → went、have → had、see → saw、eat → ate、read → read(拼写不变,读音变 /red/)。",
      "否定和疑问交给 did:didn't + **动词原形**;Did you…? 里动词也用原形 —— did 已经替你表示「过去」了,动词不用再变。"
    ],
    example: "Did you went to school? ❌ → Did you **go** to school? ✔ did 一出场,动词就变回原形。",
    pitfall: "did 和动词过去式同时出现是最高频错误:She didn't went ❌ → She didn't go ✔。",
    mnemonic: "did 在场,动词还原;did 不在,动词变身。",
    minutes: 3, difficulty: 1,
    date: "2026-07-02", by: "claude"
  }
]);
