/* =============================================================
 *  万象学院 · 单词专项训练(SRS 记忆曲线)
 * -------------------------------------------------------------
 *  知米式:单词卡(认识/不熟悉/不认识)→ 3 轮习题(看词选义 / 看义选词 /
 *  看词选读音 或 拼写),三次全对才「通过」→ Leitner 盒子安排下次复习。
 *  单词本:任意词可收藏,可作为词库选学。词库(words.ja/en.js)按需懒加载。
 *  答对/通过得积分;一次训练结束记 vocab 事件(喂活跃度/成就)。
 *  通用化:对任意词库(日语/英语/单词本)同一套流程。screen = vocab。
 * ============================================================= */
(function () {
  var React = window.React, html = window.html, C = window.Core;
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
  function useApp() { return React.useContext(window.AppCtx); }

  var BOX_DAYS = [0, 1, 2, 4, 8, 16, 30];     // Leitner 记忆曲线(天)
  var SESSION_N = 12;
  var VER = "20260629i";

  /* ---------- 词库懒加载 ---------- */
  function banksLoaded() { return !!(window.WORD_BANK_JA && window.WORD_BANK_EN); }
  function ensureBanks(cb) {
    if (banksLoaded()) { cb(); return; }
    var need = [];
    if (!window.WORD_BANK_JA) need.push("data/words.ja.js");
    if (!window.WORD_BANK_EN) need.push("data/words.en.js");
    var n = need.length; if (!n) { cb(); return; }
    need.forEach(function (src) {
      var s = document.createElement("script"); s.src = src + "?v=" + VER;
      s.onload = function () { if (--n === 0) cb(); };
      s.onerror = function () { if (--n === 0) cb(); };
      document.head.appendChild(s);
    });
  }

  /* ---------- 词库列表(按 scope 归并 + 单词本) ---------- */
  var SCOPE_NAME = { "jlpt-n5": "日语 JLPT N5", "jlpt-n4": "日语 JLPT N4", "jlpt-n3": "日语 JLPT N3", "jlpt-n2": "日语 JLPT N2", "jlpt-n1": "日语 JLPT N1", "toefl": "英语 TOEFL" };
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
    return out;
  }
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
  function buildQueue(bank) {
    var v = vocabState(), now = Date.now(), due = [], fresh = [];
    bank.words.forEach(function (w) { var st = v[keyOf(w)]; if (!st) fresh.push(w); else if ((st.due || 0) <= now) due.push({ w: w, due: st.due || 0 }); });
    due.sort(function (a, b) { return a.due - b.due; });
    var q = due.map(function (x) { return x.w; }).concat(shuffle(fresh));
    return q.slice(0, SESSION_N);
  }
  function gradeWord(w, passed) {
    var v = Object.assign({}, vocabState()), k = keyOf(w), st = v[k] || { box: 0, correct: 0 };
    if (passed) { st.box = Math.min(BOX_DAYS.length - 1, (st.box || 0) + 1); st.passed = true; st.correct = (st.correct || 0) + 1; }
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
    var spellRef = useRef(null);
    useEffect(function () { if (!ready) ensureBanks(function () { setReady(true); }); }, []);

    if (!ready) return html`<div class="pan-screen narrow"><div class="pan-empty">正在加载词库(约 1MB,仅首次)…</div></div>`;

    /* ----- 选词库 ----- */
    if (!sess) {
      var banks = bankList(), wb = wordbook(), v = vocabState();
      function progressOf(b) { var p = 0, dueN = 0, now = Date.now(); b.words.forEach(function (w) { var st = v[keyOf(w)]; if (st && st.passed) p++; if (st && (st.due || 0) <= now) dueN++; }); return { passed: p, due: dueN, total: b.words.length }; }
      function start(b) { if (!b.words.length) return; setSess(newSession(b)); }
      return html`<div class="pan-screen narrow">
        ${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "习题测试", go: "quiz" }, { t: "单词专项" }]} />`}
        <h1 class="pan-page-h">单词专项训练 <span class="en">/ Vocabulary</span></h1>
        <p class="pan-page-sub">单词卡 + 配套习题,按记忆曲线安排复习。每个词要连过<strong>看词选义 → 看义选词 → 读音/拼写</strong>三关才算掌握,答对得积分。任意词可收进单词本反复练。</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;">
          ${html`<div class="pan-card pan-panel" style=${"cursor:pointer;border-left:4px solid #C8852E;" + (wb.length ? "" : "opacity:.6;")} onClick=${function () { if (wb.length) start({ id: "wb", name: "我的单词本", lang: "mix", words: wb }); }}>
            <div style="font-family:var(--serif);font-size:17px;font-weight:600;margin-bottom:6px;">📒 我的单词本</div>
            <div style="font-size:13px;color:#7A6E5E;margin-bottom:8px;">收藏的词,集中突破</div>
            <div style="font-size:12px;color:#9a8a6f;">${wb.length} 个词${wb.length ? "" : " · 训练中点♡收藏"}</div></div>`}
          ${banks.map(function (b) {
            var pr = progressOf(b);
            return html`<div key=${b.id} class="pan-card pan-panel" style="cursor:pointer;" onClick=${function () { start(b); }}>
              <div style="font-family:var(--serif);font-size:17px;font-weight:600;margin-bottom:6px;">${b.name}</div>
              <div style="font-size:12px;color:#9a8a6f;margin-bottom:8px;">${b.total} 词 · 已掌握 ${pr.passed}${pr.due ? " · 待复习 " + pr.due : ""}</div>
              ${html`<${BarW} pct=${Math.round(pr.passed / b.total * 100)} />`}</div>`;
          })}
        </div></div>`;
    }

    /* ----- 训练中 ----- */
    var w = sess.queue[sess.i];
    var pct = Math.round(sess.i / sess.queue.length * 100);
    if (sess.step === "done") {
      return html`<div class="pan-screen narrow"><div class="pan-panel" style="text-align:center;padding:40px;">
        <div style="font-size:40px;margin-bottom:10px;">${sess.passed >= sess.queue.length * 0.7 ? "🎉" : "💪"}</div>
        <h1 style="font-family:var(--serif);font-size:26px;margin:0 0 6px;">通过 ${sess.passed} / ${sess.queue.length} 个词</h1>
        <div style="color:#9a8a6f;margin-bottom:6px;">本组获得 ⬡ ${sess.earned} 积分</div>
        <div style="color:#9a8a6f;font-size:13px;margin-bottom:22px;">没过的词已排进记忆曲线,过几天再练更牢</div>
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
      var head = html`<div style="display:flex;gap:8px;margin-bottom:16px;align-items:center;"><span class="pan-pill" style="color:#B6532F;background:#FAE9E2;">第 ${sess.round + 1}/3 关 · ${ex.type}</span><span style="font-size:12px;color:#9a8a6f;">${sess.wordCorrect} 关已过</span><span style="margin-left:auto;display:flex;gap:8px;align-items:center;">${ex.spell && canSay(w) ? html`<span class="pan-btn ghost sm pill" title="听写:点这里听单词" onClick=${function () { C.speak(w.term, w.lang); }}>🔊 听写</span>` : sayBtn(w)}${favBtn()}</span></div>`;
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
          <span style="font-size:13px;font-weight:700;color:${sess.lastOk ? "#6E7A4F" : "#B6532F"};">${sess.lastOk ? "✓ 答对" : "✗ 答错,这个词稍后再练"}</span>
          <span class="pan-btn ink" onClick=${nextStep}>${sess.i + 1 >= sess.queue.length && (!sess.lastOk || sess.round >= 2) ? "完成 →" : (sess.lastOk && sess.round < 2 ? "下一关 →" : "下一个 →")}</span></div>` : null}</div>`;
    }

    return html`<div class="pan-screen narrow">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <div class="pan-crumb" style="margin:0;"><span class="lnk" onClick=${function () { setSess(null); }}>单词专项</span> › ${sess.bankName}</div>
        <div style="font-size:13px;color:#9a8a6f;">第 <b style="color:#33291E;">${sess.i + 1}</b> / ${sess.queue.length} 词 · 通过 ${sess.passed}</div></div>
      <div class="pan-bar" style="height:7px;margin-bottom:22px;"><i style=${"width:" + pct + "%;background:#C8852E;"}></i></div>${body}</div>`;

    /* ----- 会话逻辑 ----- */
    function onConf(conf) {
      var s = Object.assign({}, sess, { conf: conf });
      if (conf === "known") { toEx(s, setSess); }   // 认识 → 直接做题验证
      else { s.revealed = true; setSess(s); }        // 不熟悉/不认识 → 先揭示记一记
    }
    function onPick(i, ok) {
      var s = Object.assign({}, sess, { picked: i, answered: true, lastOk: ok });
      settle(s, ok); setSess(s);
    }
    function submitSpell() {
      var val = (spellRef.current ? spellRef.current.value : sess.spellVal || "").trim().toLowerCase();
      var ok = val === String(w.term).trim().toLowerCase();
      var s = Object.assign({}, sess, { answered: true, lastOk: ok, spellVal: spellRef.current ? spellRef.current.value : sess.spellVal });
      settle(s, ok); setSess(s);
    }
    function settle(s, ok) {
      if (ok) { s.wordCorrect = (s.wordCorrect || 0) + 1; s.earned += 2; C.award(2, "单词答对 · " + w.term, "vocab"); }
    }
    function nextStep() {
      var s = Object.assign({}, sess);
      if (s.lastOk && s.round < 2) {          // 过关,进下一关
        s.round++; s.answered = false; s.picked = null; s.lastOk = false; s.spellVal = "";
        setSess(s); return;
      }
      // 本词结束:三关全过=通过
      var passed = s.lastOk && s.round >= 2 && s.wordCorrect >= 3;
      gradeWord(w, passed);
      if (passed) { s.passed++; s.earned += 8; C.award(8, "通过单词 · " + w.term, "vocab:" + keyOf(w)); }
      advance(s);
    }
    function advance(s) {
      if (s.i + 1 >= s.queue.length) {
        C.logEvent({ kind: "vocab", subject: w.lang === "ja" ? "japanese" : "english", label: s.bankName, correct: s.passed, total: s.queue.length });
        app.checkAch();
        s.step = "done"; setSess(s); return;
      }
      s.i++; s.step = "card"; s.revealed = false; s.conf = null; s.round = 0; s.answered = false; s.picked = null; s.lastOk = false; s.spellVal = ""; s.wordCorrect = 0; s.exes = null;
      setSess(s);
    }
  }

  function BarW(p) { return html`<div class="pan-bar" style="height:6px;"><i style=${"width:" + Math.max(2, p.pct) + "%;background:#6E7A4F;"}></i></div>`; }
  function newSession(b) {
    var q = buildQueue(b);
    return { bankId: b.id, bankName: b.name, lang: b.lang, pool: b.words, queue: q, i: 0, step: "card", revealed: false, conf: null, exes: null, round: 0, picked: null, answered: false, lastOk: false, spellVal: "", wordCorrect: 0, passed: 0, earned: 0 };
  }
  function toEx(s, setSess) {
    var w = s.queue[s.i];
    s = Object.assign({}, s, { step: "ex", round: 0, answered: false, picked: null, lastOk: false, spellVal: "", revealed: false });
    s.exes = [makeExercise(w, s.pool, 0), makeExercise(w, s.pool, 1), makeExercise(w, s.pool, 2)];
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
