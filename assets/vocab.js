/* =============================================================
 *  万象学院 · 单词专项训练(SRS 记忆曲线)
 * -------------------------------------------------------------
 *  知米式任务队列:每词拆 3 关(看义选词 → 拼写/读音 → 终审看词选义),
 *  队列按「词×关」穿插打乱(同词只有一关在队,顺序天然保序);答完自动
 *  流转,答错该关追加到队尾直到答对;三关全过才「通过」→ Leitner 盒子。
 *  单词本:任意词可收藏,可作为词库选学。词库(words.ja/en.js)按需懒加载。
 *  答对/通过得积分;一次训练结束记 vocab 事件(喂活跃度/成就)。
 *  通用化:对任意词库(日语/英语/单词本)同一套流程。screen = vocab。
 * ============================================================= */
(function () {
  var React = window.React, html = window.html, C = window.Core;
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
  function useApp() { return React.useContext(window.AppCtx); }

  var BOX_DAYS = [0, 1, 2, 4, 8, 16, 30];     // Leitner 记忆曲线(天)
  var GRAD_BOX = 4;   // 「完全掌握」线:熬过 1/2/4 天三轮复习、第四次仍全对(进 8 天档)才算毕业
  var SESSION_N = 20;                          // 一组上限(复习优先,新词受每日配额约束)
  var VER = "20260703c";

  /* ---------- 词库懒加载 ---------- */
  function banksLoaded() { return !!(window.WORD_BANK_JA && window.WORD_BANK_EN && window.WORD_BANK_EN_SCHOOL); }
  function ensureBanks(cb) {
    if (banksLoaded()) { cb(); return; }
    var need = [];
    if (!window.WORD_BANK_JA) need.push("data/words.ja.js");
    if (!window.WORD_BANK_EN) need.push("data/words.en.js");
    if (!window.WORD_BANK_EN_SCHOOL) need.push("data/words.en.school.js");
    var n = need.length; if (!n) { cb(); return; }
    need.forEach(function (src) {
      var s = document.createElement("script"); s.src = src + "?v=" + VER;
      s.onload = function () { if (--n === 0) cb(); };
      s.onerror = function () { if (--n === 0) cb(); };
      document.head.appendChild(s);
    });
  }

  /* ---------- 词库列表(按 scope 归并 + 单词本) ---------- */
  var SCOPE_NAME = { "jlpt-n5": "日语 JLPT N5", "jlpt-n4": "日语 JLPT N4", "jlpt-n3": "日语 JLPT N3", "jlpt-n2": "日语 JLPT N2", "jlpt-n1": "日语 JLPT N1", "toefl": "英语 TOEFL", "chuzhong": "英语 · 初中(中考)", "gaozhong": "英语 · 高中(高考)" };
  function bankList() {
    var out = [];
    function collect(arr, lang) {
      var byScope = {};
      (arr || []).forEach(function (u) {
        var sc = u.scope || "其他"; (byScope[sc] || (byScope[sc] = [])).push.apply(byScope[sc], (u.words || []).map(function (w) { return { term: w.term, gloss: w.gloss, reading: w.reading || "", lang: lang }; }));
      });
      Object.keys(byScope).forEach(function (sc) { out.push({ id: lang + ":" + sc, name: SCOPE_NAME[sc] || (lang + " " + sc), lang: lang, words: byScope[sc] }); });
    }
    collect(window.WORD_BANK_JA, "ja");
    collect(window.WORD_BANK_EN, "en");
    collect(window.WORD_BANK_EN_SCHOOL, "en");
    return out;
  }
  /* ---------- 每日新词配额 + 今日计数 ---------- */
  function vocabCfg() { return Object.assign({ daily: 20, rd: 0 }, C.store("vocabcfg", {})); }
  function saveCfg(patch) { C.save("vocabcfg", Object.assign(vocabCfg(), patch)); }
  function todayStr() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function newToday() { var t = C.store("vocabday", {}) || {}; return t.d === todayStr() ? (t.n || 0) : 0; }
  function bumpNewToday() { C.save("vocabday", { d: todayStr(), n: newToday() + 1 }); }
  function wordbook() { return C.store("wordbook", []); }
  function inWordbook(w) { return wordbook().some(function (x) { return x.lang === w.lang && x.term === w.term; }); }
  function toggleWordbook(w) {
    var wb = wordbook().slice(); var i = wb.findIndex(function (x) { return x.lang === w.lang && x.term === w.term; });
    if (i >= 0) wb.splice(i, 1); else wb.push({ term: w.term, gloss: w.gloss, reading: w.reading || "", lang: w.lang });
    C.save("wordbook", wb); return i < 0;
  }

  /* ---------- SRS ---------- */
  function vocabState() { return C.store("vocab", {}); }
  function keyOf(w) { return w.lang + "|" + w.term; }
  // 词库三池:due(到期复习,永远优先)/ fresh(没学过)/ passed(已会,可重刷)
  function bankPools(bank) {
    var v = vocabState(), now = Date.now(), due = [], fresh = [], passed = [];
    bank.words.forEach(function (w) {
      var st = v[keyOf(w)];
      if (!st) fresh.push(w);
      else if ((st.due || 0) <= now) due.push({ w: w, due: st.due || 0 });
      else if (st.passed) passed.push(w);
    });
    due.sort(function (a, b) { return a.due - b.due; });
    return { due: due.map(function (x) { return x.w; }), fresh: fresh, passed: passed };
  }
  // 常规组:到期复习优先 + 新词(受今日剩余配额约束);extra=追加新词数;redrill=重刷已会
  function sessN() { var n = vocabCfg().sess; return (n >= 5 && n <= 50) ? n : SESSION_N; }
  function buildQueue(bank, mode, n) {
    var p = bankPools(bank);
    if (mode === "extra") return shuffle(p.fresh).slice(0, Math.max(1, n || 0));
    if (mode === "redrill") return shuffle(p.passed).slice(0, Math.max(1, n || 0));
    var left = Math.max(0, vocabCfg().daily - newToday());
    return p.due.concat(shuffle(p.fresh).slice(0, left)).slice(0, sessN());
  }
  // 断点续训:把队列快照存 KV(词只存 key,恢复时从词库重建;done/空队列时清掉)
  function saveSessSnap(s) {
    if (!s || s.step === "done" || !s.items || !s.items.length) { C.save("vocabsess", null); return; }
    C.save("vocabsess", { bankId: s.bankId, bankName: s.bankName, mode: s.mode, lang: s.lang,
      passed: s.passed, total: s.total, earned: s.earned, doneN: s.doneN || 0, ts: Date.now(),
      items: s.items.map(function (it) { return { k: keyOf(it.w), g: it.stage, e: it.err ? 1 : 0, s: it.seen ? 1 : 0 }; }) });
  }
  var FAM_STEP = [40, 70, 100];   // 各阶段答对后的熟悉度上限值(通过=100)
  function touchWord(w, ok, stage) {   // 每答一题实时更新词的熟悉度(只动 fam,不动记忆曲线)
    var v = Object.assign({}, vocabState()), k = keyOf(w), st = v[k] || { box: 0, correct: 0, fam: 0 };
    if (!st.newCounted) { st.newCounted = 1; if (!st.ts) bumpNewToday(); }   // 首次接触才消耗今日新词额度(老记录有 ts,不重复计)
    st.fam = ok ? Math.max(st.fam || 0, FAM_STEP[Math.min(2, stage || 0)]) : Math.max(0, (st.fam || 0) - 20);
    st.term = w.term; st.gloss = w.gloss; st.reading = w.reading || ""; st.lang = w.lang; st.ts = Date.now();
    v[k] = st; C.save("vocab", v);
  }
  function gradeWord(w, passed, redrill, hadErr) {
    var v = Object.assign({}, vocabState()), k = keyOf(w), st = v[k] || { box: 0, correct: 0 };
    if (!st.newCounted) { st.newCounted = 1; if (!st.ts) bumpNewToday(); }
    if (passed) st.fam = 100;
    if (redrill && passed && !hadErr) return;   // 重刷干净通过:不动记忆曲线(到期节奏不被打乱)
    if (passed && !hadErr) {
      st.box = Math.min(BOX_DAYS.length - 1, (st.box || 0) + 1); st.passed = true; st.correct = (st.correct || 0) + 1;
      if (st.box >= GRAD_BOX && !st.grad) { st.grad = 1; C.award(10, "完全掌握 · " + w.term, "vocab-grad"); }   // 毕业奖励一次性
    }
    else if (passed) {   // 通过但中途错过:盒不前进(重刷则降盒),很快再见面
      if (redrill) st.box = Math.max(0, (st.box || 0) - 1);
      st.passed = true; st.correct = (st.correct || 0) + 1;
    }
    else { st.box = Math.max(0, (st.box || 0) - 1); }
    st.due = Date.now() + BOX_DAYS[st.box] * 864e5;
    st.term = w.term; st.gloss = w.gloss; st.reading = w.reading || ""; st.lang = w.lang; st.ts = Date.now();
    v[k] = st; C.save("vocab", v);
  }

  /* ---------- 习题生成 ---------- */
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function sample(pool, n, excludeTerm, key) {
    var out = [], seen = {}; seen[excludeTerm] = 1; var p = shuffle(pool);
    for (var i = 0; i < p.length && out.length < n; i++) { var val = key ? p[i][key] : p[i]; var t = p[i].term; if (!seen[t] && val) { seen[t] = 1; out.push(p[i]); } }
    return out;
  }
  function makeExercise(w, pool, round) {
    if (round === 0) {
      var d = sample(pool, 3, w.term);
      return { type: "看词选义", prompt: w.term + (w.reading ? "  （" + w.reading + "）" : ""), q: "它的意思是?", options: shuffle([w].concat(d)).map(function (x) { return { label: x.gloss, ok: x.term === w.term }; }) };
    }
    if (round === 1) {
      var d2 = sample(pool, 3, w.term);
      return { type: "看义选词", prompt: w.gloss, q: "哪个词是这个意思?", options: shuffle([w].concat(d2)).map(function (x) { return { label: x.term, ok: x.term === w.term }; }) };
    }
    // round 2 最难
    if (w.lang === "ja" && w.reading) {
      var dr = sample(pool.filter(function (x) { return x.reading && x.reading !== w.reading; }), 3, w.term, "reading");
      var rs = shuffle([w].concat(dr)).map(function (x) { return { label: x.reading, ok: x.reading === w.reading }; });
      return { type: "看词选读音", prompt: w.term + "  →  " + w.gloss, q: "正确读音(假名)是?", options: rs };
    }
    return { type: "拼写", prompt: w.gloss + (w.reading ? "  （" + w.reading + "）" : ""), q: "拼出这个词:", spell: w.term };
  }

  /* =========================================================
   *  屏幕
   * ========================================================= */
  function VocabScreen() {
    var app = useApp();
    var r0 = useState(banksLoaded()); var ready = r0[0], setReady = r0[1];
    var s0 = useState(null); var sess = s0[0], setSess = s0[1];
    var pk0 = useState(null); var pick = pk0[0], setPick = pk0[1];      // 选中展开操作面板的词库
    var ex0 = useState("10"); var exN = ex0[0], setExN = ex0[1];        // 追加新词数量输入
    var rr0 = useState("10"); var rdN = rr0[0], setRdN = rr0[1];        // 重刷数量输入
    var spellRef = useRef(null);
    var sessRef = useRef(null); sessRef.current = sess;
    useEffect(function () { if (!ready) ensureBanks(function () { setReady(true); }); }, []);

    if (!ready) return html`<div class="pan-screen narrow"><div class="pan-empty">正在加载词库(约 1MB,仅首次)…</div></div>`;

    /* ----- 选词库 ----- */
    if (!sess) {
      var banks = bankList(), wb = wordbook(), v = vocabState();
      var cfg = vocabCfg(), usedToday = newToday(), leftToday = Math.max(0, cfg.daily - usedToday);
      function progressOf(b) { var p = 0, dueN = 0, learn = 0, now = Date.now(); b.words.forEach(function (w) { var st = v[keyOf(w)]; if (st && (st.grad || (st.box || 0) >= GRAD_BOX)) p++; else if (st && (st.passed || (st.fam || 0) > 0)) learn++; if (st && (st.due || 0) <= now) dueN++; }); return { passed: p, due: dueN, learning: learn, total: b.words.length }; }
      function start(b, mode, n) { var q = buildQueue(b, mode || "normal", n); if (!q.length) return; var ns = newSession(b, mode || "normal", q); setSess(ns); saveSessSnap(ns); }
      var savedS = C.store("vocabsess", null), resumeBank = null;
      if (savedS && savedS.items && savedS.items.length) {
        resumeBank = savedS.bankId === "wb" ? { id: "wb", name: "我的单词本", lang: "mix", words: wb }
          : banks.filter(function (b) { return b.id === savedS.bankId; })[0] || null;
        if (resumeBank && !resumeBank.words.length) resumeBank = null;
      }
      function resumeSaved() {
        var byK = {}; resumeBank.words.forEach(function (w) { byK[keyOf(w)] = w; });
        var its = savedS.items.map(function (r) { var w = byK[r.k]; return w ? { w: w, stage: r.g || 0, err: !!r.e, seen: !!r.s } : null; }).filter(Boolean);
        if (!its.length) { C.save("vocabsess", null); setPick(null); return; }
        var ns = { bankId: savedS.bankId, bankName: savedS.bankName || resumeBank.name, mode: savedS.mode || "normal", lang: savedS.lang || resumeBank.lang, pool: resumeBank.words,
          items: its, total: savedS.total || its.length, step: "card", revealed: false, conf: null, exes: null, round: 0, picked: null, answered: false, lastOk: false, spellVal: "",
          passed: savedS.passed || 0, earned: savedS.earned || 0, doneN: savedS.doneN || 0 };
        if (its[0].seen) { ns.step = "ex"; ns.exes = [makeExercise(its[0].w, ns.pool, STAGE_EX[its[0].stage])]; }
        setSess(ns);
      }
      function clampN(val, max) { var n = parseInt(val, 10); if (!(n > 0)) n = 1; return Math.min(n, max); }
      function numIn(val, setVal) { return html`<input type="number" min="1" value=${val} onClick=${function (e) { e.stopPropagation(); }} onInput=${function (e) { setVal(e.target.value); }} style="width:58px;border:1.5px solid #D8C9A8;border-radius:8px;padding:4px 8px;font-size:13px;background:#FFFDF8;" />`; }
      return html`<div class="pan-screen narrow">
        ${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "习题测试", go: "quiz" }, { t: "单词专项" }]} />`}
        <h1 class="pan-page-h">单词专项训练 <span class="en">/ Vocabulary</span></h1>
        <p class="pan-page-sub">单词卡 + 三关习题,按记忆曲线安排复习。点词库卡片选模式:常规(复习+今日新词)、追加新词、重刷已会。</p>
        <div class="pan-panel" style="padding:13px 18px;margin-bottom:16px;display:flex;gap:8px 18px;align-items:center;flex-wrap:wrap;font-size:13.5px;">
          <span>📅 今日新词 <b style="color:${leftToday ? "#B6532F" : "#6E7A4F"};">${usedToday}</b> / ${cfg.daily}</span>
          <span style="display:flex;align-items:center;gap:6px;">每日配额 ${numIn(String(cfg.daily), function (val) { var n = parseInt(val, 10); if (n >= 5 && n <= 100) saveCfg({ daily: n }); })} <span style="color:#9a8a6f;font-size:12px;">(5-100,复习不占额)</span></span>
          <span style="display:flex;align-items:center;gap:6px;">每组词数 ${numIn(String(cfg.sess || 20), function (val) { var n = parseInt(val, 10); if (n >= 5 && n <= 50) saveCfg({ sess: n }); })} <span style="color:#9a8a6f;font-size:12px;">(5-50)</span></span>
        </div>
        ${resumeBank ? html`<div class="pan-panel" style="padding:13px 18px;margin-bottom:16px;display:flex;gap:12px;align-items:center;flex-wrap:wrap;border-left:4px solid #C8852E;">
          <span style="font-size:13.5px;">⏸ 上次「${savedS.bankName || resumeBank.name}」还剩 <b>${savedS.items.length}</b> 题没刷完(已通过 ${savedS.passed || 0}/${savedS.total || "?"})</span>
          <span class="pan-btn terra sm" onClick=${resumeSaved}>▶ 继续</span>
          <span class="pan-btn ghost sm" onClick=${function () { C.save("vocabsess", null); setPick(pick ? null : "_r"); }}>✕ 放弃</span></div>` : null}
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;">
          ${html`<div class="pan-card pan-panel" style=${"cursor:pointer;border-left:4px solid #C8852E;" + (wb.length ? "" : "opacity:.6;")} onClick=${function () { if (wb.length) start({ id: "wb", name: "我的单词本", lang: "mix", words: wb }); }}>
            <div style="font-family:var(--serif);font-size:17px;font-weight:600;margin-bottom:6px;">📒 我的单词本</div>
            <div style="font-size:13px;color:#7A6E5E;margin-bottom:8px;">收藏的词,集中突破</div>
            <div style="font-size:12px;color:#9a8a6f;">${wb.length} 个词${wb.length ? "" : " · 训练中点♡收藏"}</div></div>`}
          ${banks.map(function (b) {
            var pr = progressOf(b), on = pick === b.id;
            return html`<div key=${b.id} class="pan-card pan-panel" style=${"cursor:pointer;" + (on ? "box-shadow:0 0 0 2px #C8852E;" : "")} onClick=${function () { setPick(on ? null : b.id); }}>
              <div style="font-family:var(--serif);font-size:17px;font-weight:600;margin-bottom:6px;">${b.name}</div>
              <div style="font-size:12px;color:#9a8a6f;margin-bottom:8px;">${b.total} 词 · 完全掌握 ${pr.passed}${pr.learning ? " · 在学 " + pr.learning : ""}${pr.due ? " · 待复习 " + pr.due : ""}</div>
              ${html`<${BarW} pct=${Math.round(pr.passed / b.total * 100)} />`}
              ${on ? (function () {
                var pl = bankPools(b);
                var normalNew = Math.min(leftToday, pl.fresh.length);
                return html`<div style="margin-top:12px;padding-top:12px;border-top:1px dashed #EBDEC8;display:flex;flex-direction:column;gap:9px;" onClick=${function (e) { e.stopPropagation(); }}>
                  <span class="pan-btn terra sm" onClick=${function () { start(b, "normal"); }}>▸ 开始:复习 ${Math.min(pl.due.length, cfg.sess || 20)}${normalNew ? " + 新词 " + normalNew : ""}${(!pl.due.length && !normalNew) ? "(今天没任务了)" : ""}</span>
                  <div style="display:flex;align-items:center;gap:7px;font-size:12.5px;color:#5a4e3c;flex-wrap:wrap;">＋ 追加新词 ${numIn(exN, setExN)} <span class="pan-btn ghost sm" onClick=${function () { if (pl.fresh.length) start(b, "extra", clampN(exN, pl.fresh.length)); }}>练 →</span><span style="color:#bbab8c;font-size:11.5px;">上限 ${pl.fresh.length}(题库封顶)</span></div>
                  <div style="display:flex;align-items:center;gap:7px;font-size:12.5px;color:#5a4e3c;flex-wrap:wrap;">🔁 重刷已会 ${numIn(rdN, setRdN)} <span class="pan-btn ghost sm" onClick=${function () { if (pl.passed.length) start(b, "redrill", clampN(rdN, pl.passed.length)); }}>刷 →</span><span style="color:#bbab8c;font-size:11.5px;">上限 ${pl.passed.length} · 每过 3 个 +1 分</span></div>
                </div>`;
              })() : null}</div>`;
          })}
        </div></div>`;
    }

    /* ----- 训练中 ----- */
    var it = sess.items[0], w = it && it.w;
    var doneN = sess.doneN || 0;
    var pct = Math.round(doneN / Math.max(1, doneN + sess.items.length) * 100);
    if (sess.step === "done") {
      return html`<div class="pan-screen narrow"><div class="pan-panel" style="text-align:center;padding:40px;">
        <div style="font-size:40px;margin-bottom:10px;">${sess.passed >= sess.total * 0.7 ? "🎉" : "💪"}</div>
        <h1 style="font-family:var(--serif);font-size:26px;margin:0 0 6px;">通过 ${sess.passed} / ${sess.total} 个词</h1>
        <div style="color:#9a8a6f;margin-bottom:6px;">本组获得 ⬡ ${sess.earned} 积分</div>
        <div style="color:#9a8a6f;font-size:13px;margin-bottom:22px;">${sess.mode === "redrill" ? "重刷模式:每通过 3 个 +1 分(有答错的会提前复习)" : "通过 ≠ 记住:明天、后天、第 4/8/16/30 天它还会回来考你,每次都要全对;熬过前四轮全对才算「完全掌握」,中途答错就原地踏步"}</div>
        <div style="display:flex;gap:10px;justify-content:center;"><span class="pan-btn ink" onClick=${function () { setSess(null); }}>再选一组</span><span class="pan-btn ghost" onClick=${function () { app.go("quiz"); }}>回习题</span></div></div></div>`;
    }

    var fav = inWordbook(w);
    function favBtn() { return html`<span class="pan-btn ghost sm pill" onClick=${function () { toggleWordbook(w); setSess(Object.assign({}, sess)); }}>${fav ? "★ 已在单词本" : "♡ 收藏到单词本"}</span>`; }
    function canSay(word) { return word && (word.lang === "en" || word.lang === "ja"); }
    function sayBtn(word, label) { if (!canSay(word)) return null; return html`<span class="pan-btn ghost sm pill" title="朗读发音" onClick=${function () { C.speak(word.term, word.lang); }}>🔊${label ? " " + label : ""}</span>`; }

    var body;
    if (sess.step === "card") {
      body = html`<div class="pan-panel" style="padding:40px 36px;text-align:center;">
        <div style="font-family:var(--serif);font-size:${w.term.length > 6 ? "30" : "44"}px;font-weight:700;margin-bottom:${canSay(w) ? "8" : "10"}px;">${w.term}</div>
        ${canSay(w) ? html`<div style="margin-bottom:12px;">${sayBtn(w, "朗读")}</div>` : null}
        ${sess.revealed ? html`<div><div style="font-size:16px;color:#B6532F;margin-bottom:4px;">${w.reading || ""}</div><div style="font-size:16px;color:#3a3023;">${w.gloss}</div></div>` : html`<div style="font-size:13px;color:#9a8a6f;">先想一想,再选下面 ——</div>`}
        <div style="display:flex;gap:10px;justify-content:center;margin-top:26px;flex-wrap:wrap;">
          ${sess.revealed
            ? html`<span class="pan-btn ink" onClick=${function () { toEx(sess, setSess); }}>开始练习 →</span>`
            : html`<span class="pan-btn ghost" onClick=${function () { onConf("known"); }}>认识</span><span class="pan-btn ghost" onClick=${function () { onConf("fuzzy"); }}>不熟悉</span><span class="pan-btn ghost" onClick=${function () { onConf("unknown"); }}>不认识</span>`}
        </div>
        <div style="margin-top:18px;">${favBtn()}</div></div>`;
    } else { // ex
      var ex = sess.exes[sess.round], ans = sess.answered;
      var head = html`<div style="display:flex;gap:8px;margin-bottom:16px;align-items:center;"><span class="pan-pill" style="color:#B6532F;background:#FAE9E2;">${ex.type} · 本词第 ${sess.items[0].stage + 1}/3 关</span><span style="font-size:12px;color:#9a8a6f;">熟悉度 ${(vocabState()[keyOf(w)] || {}).fam || 0}%</span><span style="margin-left:auto;display:flex;gap:8px;align-items:center;">${ex.spell && canSay(w) ? html`<span class="pan-btn ghost sm pill" title="听写:点这里听单词" onClick=${function () { C.speak(w.term, w.lang); }}>🔊 听写</span>` : sayBtn(w)}${favBtn()}</span></div>`;
      var prompt = html`<div style="font-size:12.5px;color:#9a8a6f;margin-bottom:6px;">${ex.q}</div><h1 style="font-family:var(--serif);font-size:${ex.prompt.length > 14 ? "20" : "30"}px;font-weight:600;line-height:1.4;margin:0 0 22px;">${ex.prompt}</h1>`;
      var input;
      if (ex.spell) {
        var ok = ans && sess.lastOk;
        input = html`<div><div style="display:flex;gap:10px;"><input ref=${spellRef} disabled=${ans} value=${sess.spellVal} onInput=${function (e) { setSess(Object.assign({}, sess, { spellVal: e.target.value })); }} onKeyDown=${function (e) { if (e.key === "Enter") submitSpell(); }} placeholder="输入答案…" style=${"flex:1;border:1.5px solid " + (ans ? (ok ? "#6E7A4F" : "#B6532F") : "#EBDEC8") + ";border-radius:12px;padding:13px 16px;font-size:18px;outline:none;background:" + (ans ? (ok ? "#F2F4E8" : "#FAE9E2") : "#FFFDF8") + ";"} />${ans ? null : html`<span class="pan-btn ink" onClick=${submitSpell}>提交</span>`}</div>${ans && !ok ? html`<div style="margin-top:10px;font-size:15px;color:#B6532F;">正确:<b>${w.term}</b>${w.reading ? "（" + w.reading + "）" : ""}</div>` : null}</div>`;
      } else {
        input = html`<div style="display:flex;flex-direction:column;gap:12px;">${ex.options.map(function (o, i) {
          var cls = "pan-opt", mark = "";
          if (ans) { if (o.ok) { cls += " right"; mark = "✓"; } else if (i === sess.picked) { cls += " wrong"; mark = "✕"; } }
          return html`<div key=${i} class=${cls} onClick=${ans ? null : function () { onPick(i, o.ok); }}><div class="k">${String.fromCharCode(65 + i)}</div><div class="tx">${o.label}</div><div style="font-size:18px;">${mark}</div></div>`;
        })}</div>`;
      }
      body = html`<div class="pan-panel" style="padding:30px 32px;">${head}${prompt}${input}
        ${ans ? html`<div style="display:flex;justify-content:space-between;align-items:center;margin-top:22px;">
          <span style="font-size:13px;font-weight:700;color:${sess.lastOk ? "#6E7A4F" : "#B6532F"};">${sess.lastOk ? (sess.mode === "redrill" ? "✓ 答对" : (sess.items[0].stage >= 2 ? "✓ 答对 ⬡ +2 · 🎉 这个词通过,再 +8" : "✓ 答对 ⬡ +2")) : "✗ 答错 —— 记住正确答案,这题稍后再来"}</span>
          ${sess.lastOk ? html`<span style="font-size:12px;color:#bbab8c;">自动继续…</span>` : html`<span class="pan-btn ink" onClick=${function () { nextStep(sess); }}>看清了,继续 →</span>`}</div>` : null}</div>`;
    }

    return html`<div class="pan-screen narrow">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <div class="pan-crumb" style="margin:0;"><span class="lnk" onClick=${function () { setSess(null); }}>单词专项</span> › ${sess.bankName}</div>
        <div style="font-size:13px;color:#9a8a6f;">已答 <b style="color:#33291E;">${doneN}</b> 题 · 通过 ${sess.passed}/${sess.total} 词 · 队列剩 ${sess.items.length} 题 · 本组 <b style="color:#a86a00;">⬡ ${sess.earned}</b></div></div>
      <div class="pan-bar" style="height:7px;margin-bottom:22px;"><i style=${"width:" + pct + "%;background:#C8852E;"}></i></div>${body}</div>`;

    /* ----- 会话逻辑 ----- */
    function onConf(conf) {
      var s = Object.assign({}, sess, { conf: conf });
      if (conf === "known") { toEx(s, setSess); }   // 认识 → 直接做题验证
      else { s.revealed = true; setSess(s); }        // 不熟悉/不认识 → 先揭示记一记
    }
    function onPick(i, ok) {
      var s = Object.assign({}, sess, { picked: i, answered: true, lastOk: ok });
      settle(s, ok); setSess(s); if (ok) schedule(s);
    }
    function submitSpell() {
      if (sess.answered) return;
      var val = (spellRef.current ? spellRef.current.value : sess.spellVal || "").trim().toLowerCase();
      var ok = val === String(w.term).trim().toLowerCase();
      var s = Object.assign({}, sess, { answered: true, lastOk: ok, spellVal: spellRef.current ? spellRef.current.value : sess.spellVal });
      settle(s, ok); setSess(s); if (ok) schedule(s);
    }
    function schedule(s) {   // 答对短停 0.7s,答错停 2s 看清正确答案,然后自动下一题
      setTimeout(function () {
        var cur = sessRef.current;   // 不比对象身份(收藏等操作会克隆 state),比状态特征:仍停在已答的题上才推进
        if (cur && cur.step === "ex" && cur.answered) nextStep(cur);
      }, s.lastOk ? 700 : 2000);
    }
    function settle(s, ok) {
      s.doneN = (s.doneN || 0) + 1;
      if (ok && s.mode !== "redrill") { s.earned += 2; C.award(2, "单词答对 · " + w.term, "vocab"); }   // 重刷不给答对分(防刷)
      touchWord(w, ok, s.items[0].stage);   // 词库熟悉程度实时更新
    }
    function insertNear(arr, it) {   // 插到 2-4 题之后:同词不相邻,但一个词的三关在小窗口内完成
      var at = Math.min(arr.length, 2 + Math.floor(Math.random() * 3));
      arr.splice(at, 0, it);
    }
    function nextStep(prev) {
      var s = Object.assign({}, prev);
      var cur = s.items[0], cw = cur.w;
      s.items = s.items.slice(); s.items.shift();
      if (s.lastOk) {
        if (cur.stage >= 2) {                   // 终审过 → 真通过
          gradeWord(cw, true, s.mode === "redrill", cur.err);
          s.passed++;
          if (s.mode === "redrill") {           // 重刷:每通过 3 个 +1 分(累计计数跨场次)
            var rd = (vocabCfg().rd || 0) + 1; saveCfg({ rd: rd });
            if (rd % 3 === 0) { s.earned += 1; C.award(1, "重刷单词 ×3 · " + cw.term, "vocab-rd"); }
          } else { s.earned += 8; C.award(8, "通过单词 · " + cw.term, "vocab:" + keyOf(cw)); }
        } else {
          insertNear(s.items, { w: cur.w, stage: cur.stage + 1, err: cur.err, seen: true });   // 下一关 2-4 题后回来
        }
      } else {
        cur.err = true;                         // 答错:2-4 题后重来,趁纠错记忆还热,答对为止
        insertNear(s.items, cur);
      }
      if (!s.items.length) {
        C.logEvent({ kind: "vocab", subject: cw.lang === "ja" ? "japanese" : "english", label: s.bankName, correct: s.passed, total: s.total });
        app.checkAch();
        s.step = "done"; saveSessSnap(s); setSess(s); return;
      }
      saveSessSnap(s);
      // 下一题:没见过的词先看卡;其余直接进题
      var nx = s.items[0];
      s.round = 0; s.answered = false; s.picked = null; s.lastOk = false; s.spellVal = ""; s.exes = null; s.revealed = false; s.conf = null;
      if (!nx.seen) { s.step = "card"; setSess(s); }
      else { toEx(s, setSess); }
    }
  }

  function BarW(p) { return html`<div class="pan-bar" style="height:6px;"><i style=${"width:" + Math.max(2, p.pct) + "%;background:#6E7A4F;"}></i></div>`; }
  function newSession(b, mode, queue) {
    var q = queue || buildQueue(b, mode || "normal");
    var suffix = mode === "extra" ? " · 追加新词" : mode === "redrill" ? " · 重刷" : "";
    // 任务队列:一个元素 = 词的一关(stage 0 看义选词 / 1 拼写读音 / 2 终审看词选义)。
    // 同一词同时只有一关在队里 → 不同词自然穿插;答错本关追加队尾,答对下一关追加队尾。
    return { bankId: b.id, bankName: b.name + suffix, mode: mode || "normal", lang: b.lang, pool: b.words,
      items: q.map(function (x) { return { w: x, stage: 0, err: false, seen: false }; }), total: q.length,
      step: "card", revealed: false, conf: null, exes: null, round: 0, picked: null, answered: false, lastOk: false, spellVal: "", passed: 0, earned: 0, doneN: 0 };
  }
  var STAGE_EX = [1, 2, 0];   // stage → makeExercise round:看义选词 / 拼写读音 / 终审看词选义
  function toEx(s, setSess) {
    var it = s.items[0], w = it.w;
    it.seen = true;
    s = Object.assign({}, s, { step: "ex", round: 0, answered: false, picked: null, lastOk: false, spellVal: "", revealed: false });
    s.exes = [makeExercise(w, s.pool, STAGE_EX[it.stage])];
    setSess(s);
  }

  // Crumb 复用 screens.js 里的(同一作用域不可见),这里内联一个轻量版
  function Crumb(p) {
    var app = useApp();
    return html`<div class="pan-crumb">${p.parts.map(function (x, i) { return html`<span key=${i}>${i ? " › " : ""}${x.go ? html`<span class="lnk" onClick=${function () { app.go(x.go, x.params); }}>${x.t}</span>` : x.t}</span>`; })}</div>`;
  }

  window.Screens = window.Screens || {};
  window.Screens.vocab = VocabScreen;
})();
