/* =============================================================
 *  检测中心 · 检测/习题引擎 (QuizApp)
 * -------------------------------------------------------------
 *  能力：
 *   - 单词检测：中→英拼写 / 英→中选择 / 🔊听写
 *   - 习题检测：单选 / 填空，即时判分 + 解析
 *   - 错题本 / 生词本：做错自动收集，可一键重练；练对自动移除
 *   - 成绩历史：每次练习存一条，首页/检测中心可看
 *  全部本地存储（localStorage，按 track 隔离），离线可用。
 *
 *  页面用法：
 *   检测中心  quiz/index.html → QuizApp.renderIndex("#hub")
 *   运行器    quiz/run.html   → QuizApp.runFromURL("#app")
 * ============================================================= */
(function () {
  const SH = window.StudyHub;
  const WORDS = (window.WORD_BANK || []).concat(window.WORD_BANK_JA || [], window.WORD_BANK_EN || []);
  const QUIZZES = window.QUIZ_BANK || [];
  const profileOf = (x) => x.profile || x.track;

  /* ---------------- 工具 ---------------- */
  function el(tag, attrs, html) {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === "class") n.className = attrs[k];
      else if (k === "style") n.style.cssText = attrs[k];
      else if (k.startsWith("on") && typeof attrs[k] === "function") n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    }
    if (html != null) n.innerHTML = html;
    return n;
  }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function norm(s) {
    return String(s == null ? "" : s).trim().toLowerCase()
      .replace(/\s+/g, " ").replace(/[.。!！?？,，;；'']+$/g, "");
  }
  function localDate(d) { d = d || new Date(); const z = n => String(n).padStart(2, "0"); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  function track() { return SH.resolveTrack(); }
  const TP = () => "&track=" + encodeURIComponent(track());      // 追加到已有 ? 的链接
  const TP1 = () => "?track=" + encodeURIComponent(track());     // 链接的第一个参数

  function speak(text, lang) {
    try {
      if (!("speechSynthesis" in window)) return false;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang || "en-US"; u.rate = 0.85;
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }

  /* ---------------- 存储：错题 / 生词 / 成绩 ---------------- */
  const store = {
    wrong: () => SH.load(track(), "wrong", []),
    setWrong: (a) => SH.save(track(), "wrong", a),
    addWrong(rec) {
      const a = store.wrong();
      if (!a.some(x => x.sig === rec.sig)) { rec.ts = Date.now(); a.push(rec); store.setWrong(a); }
    },
    removeWrong(sig) { store.setWrong(store.wrong().filter(x => x.sig !== sig)); },

    vocab: () => SH.load(track(), "vocab", []),
    setVocab: (a) => SH.save(track(), "vocab", a),
    inVocab: (term) => store.vocab().some(w => (w.term || w.en) === term),
    toggleVocab(word) {
      const a = store.vocab();
      const i = a.findIndex(w => (w.term || w.en) === word.term);
      if (i >= 0) { a.splice(i, 1); store.setVocab(a); return false; }
      a.push({ term: word.term, gloss: word.gloss || "", reading: word.reading || "", tip: word.tip || "", ts: Date.now() }); store.setVocab(a); return true;
    },

    scores: () => SH.load(track(), "scores", []),
    addScore(rec) {
      const a = store.scores(); rec.ts = Date.now(); a.push(rec);
      if (a.length > 200) a.splice(0, a.length - 200);
      SH.save(track(), "scores", a);
      // 中心化上报（哥哥的跟踪面板用），失败不影响本地
      try { SH.logEvent(track(), { kind: rec.type, label: rec.label, correct: rec.correct, total: rec.total, detail: rec.detail }); } catch (e) {}
    },
    todayCount() {
      const d = localDate();
      return store.scores().filter(s => localDate(new Date(s.ts)) === d).reduce((n, s) => n + (s.total || 0), 0);
    }
  };

  /* ---------------- 把数据变成「标准化题目」 ---------------- */
  // 标准题目 shape: { prompt, sub, kind:'choice'|'input', options, answerIndex, accept[], display, explain, meta }
  // 把任意词条规整成 {term, gloss, reading, tip}（兼容旧的 {en, cn}）
  function normWord(w) {
    return {
      term: w.term != null ? w.term : w.en,
      gloss: w.gloss != null ? w.gloss : (w.cn || ""),
      reading: w.reading || "", tip: w.tip || ""
    };
  }
  // mode: gloss2term(看义拼词) / term2gloss(看词选义) / term2reading(看词写读音) / dictation(听写)
  function wordToQuestion(word, group, mode) {
    const nw = normWord(word);
    const base = { meta: { kind: "word", term: nw.term, gloss: nw.gloss, reading: nw.reading, tip: nw.tip, group: group.id, groupTitle: group.title } };
    if (mode === "term2gloss") {
      const pool = (group.words || []).map(normWord).filter(w => w.gloss && w.gloss !== nw.gloss);
      const distractors = shuffle(pool).slice(0, 3).map(w => w.gloss);
      const options = shuffle([nw.gloss, ...distractors]);
      if (options.length >= 2) return Object.assign(base, {
        prompt: nw.term, sub: "选出正确的意思", kind: "choice",
        options, answerIndex: options.indexOf(nw.gloss), display: nw.gloss,
        explain: nw.tip ? "提示：" + nw.tip : ""
      });
      return Object.assign(base, { prompt: nw.term, sub: "写出意思", kind: "input", accept: [nw.gloss], display: nw.gloss });
    }
    if (mode === "term2reading") {
      return Object.assign(base, {
        prompt: nw.term, sub: "写出读音（假名）", kind: "input",
        accept: [nw.reading], display: nw.reading,
        hint: nw.reading ? nw.reading[0] + " …（" + nw.reading.length + " 假名）" : "",
        explain: nw.gloss ? "义：" + nw.gloss : ""
      });
    }
    if (mode === "dictation") {
      return Object.assign(base, {
        prompt: "🔊 听写", sub: "听发音，拼出这个单词", kind: "input",
        tts: nw.term, ttsLang: group.lang === "ja" ? "ja-JP" : "en-US",
        accept: [nw.term], display: nw.term,
        explain: (nw.gloss || "") + (nw.tip ? "（" + nw.tip + "）" : "")
      });
    }
    // 默认 gloss2term：看义拼词（英语＝看中文拼英文）
    return Object.assign(base, {
      prompt: nw.gloss || nw.reading, sub: "拼出对应的单词", kind: "input",
      accept: [nw.term], display: nw.term,
      hint: nw.term ? nw.term[0] + " …（" + nw.term.length + " 字母）" : "",
      explain: nw.tip ? "提示：" + nw.tip : ""
    });
  }

  function quizToQuestion(qq, set) {
    const meta = { kind: "quiz", set: set.id, setTitle: set.title, q: qq, sig: "q:" + set.id + ":" + qq.q };
    if (qq.type === "choice") {
      return {
        prompt: qq.q, sub: "选择正确答案", kind: "choice",
        options: qq.options, answerIndex: qq.answer, display: qq.options[qq.answer],
        explain: qq.explain || "", meta
      };
    }
    // fill
    return {
      prompt: qq.q, sub: "填空（忽略大小写）", kind: "input",
      accept: qq.answer, display: qq.answer[0], explain: qq.explain || "", meta
    };
  }

  /* ---------------- 构建一次「检测会话」 ---------------- */
  function buildSession(params) {
    const type = params.type;
    if (type === "word") {
      const g = WORDS.find(w => w.id === params.id);
      if (!g) return null;
      const mode = params.mode || g.mode || (g.lang === "ja" ? "term2reading" : "gloss2term");
      const qs = shuffle(g.words).map(w => wordToQuestion(w, g, mode));
      const modeName = { gloss2term: "看义→拼词", term2gloss: "看词→选义", term2reading: "看词→读音", dictation: "听写" }[mode] || mode;
      return { title: g.title, subtitle: g.unit + " · " + modeName, sessionType: "word", allowVocab: true, questions: qs };
    }
    if (type === "quiz") {
      const s = QUIZZES.find(q => q.id === params.id);
      if (!s) return null;
      const qs = s.questions.map(qq => quizToQuestion(qq, s));
      return { title: s.title, subtitle: s.desc || "习题检测", sessionType: "quiz", questions: qs };
    }
    if (type === "wrong") {
      const items = store.wrong();
      const qs = items.map(it => {
        let q;
        if (it.kind === "word") {
          const w = { term: it.term != null ? it.term : it.en, gloss: it.gloss != null ? it.gloss : it.cn, reading: it.reading, tip: it.tip };
          q = wordToQuestion(w, { id: it.group, title: it.groupTitle, words: [] }, w.reading ? "term2reading" : "gloss2term");
        } else q = quizToQuestion(it.q, { id: it.setId, title: it.setTitle });
        q.meta = q.meta || {}; q.meta.sig = it.sig; q.meta.fromWrong = true;
        return q;
      });
      return { title: "错题重练", subtitle: "练对的会自动从错题本移除", sessionType: "wrong", questions: qs };
    }
    if (type === "vocab") {
      const items = store.vocab().map(normWord);
      const qs = items.map(w => {
        const q = wordToQuestion(w, { id: "vocab", title: "生词本", words: items }, w.reading ? "term2reading" : "gloss2term");
        q.meta.fromVocab = true;
        return q;
      });
      return { title: "生词本复习", subtitle: "看义/看词复习", sessionType: "vocab", allowVocab: true, questions: qs };
    }
    return null;
  }

  /* ---------------- 运行器 UI ---------------- */
  function runSession(session, hostSel) {
    const host = document.querySelector(hostSel);
    host.innerHTML = "";
    if (!session || !session.questions.length) {
      host.appendChild(el("div", { class: "quiz-empty" },
        "这里还没有题目。<br><a href='index.html'>← 回检测中心</a>"));
      return;
    }
    const Q = session.questions;
    let idx = 0, correct = 0, answered = false;
    const started = Date.now();

    const head = el("div", { class: "quiz-head" });
    const card = el("div", { class: "quiz-card" });
    host.appendChild(head); host.appendChild(card);

    function renderHead() {
      head.innerHTML =
        `<a class="quiz-back" href="index.html${TP1()}">← 检测中心</a>
         <div class="quiz-title">${session.title}<span>${session.subtitle || ""}</span></div>
         <div class="quiz-progress"><b>${idx + 1}</b> / ${Q.length} · ✅ ${correct}</div>`;
      const bar = el("div", { class: "quiz-bar" });
      bar.appendChild(el("i", { style: `width:${(idx) / Q.length * 100}%` }));
      head.appendChild(bar);
    }

    function next() {
      idx++; answered = false;
      if (idx >= Q.length) return finish();
      renderHead(); renderQuestion();
    }

    function judgeAndShow(q, userVal, chosenIndex, feedbackHost, submitBtn) {
      if (answered) return;
      answered = true;
      let ok;
      if (q.kind === "choice") ok = chosenIndex === q.answerIndex;
      else ok = (q.accept || []).some(a => norm(a) === norm(userVal));
      if (ok) correct++;

      // 错题本：做错收集；在「错题重练」里做对则移除
      if (!ok && session.sessionType !== "wrong" && q.meta) {
        if (q.meta.kind === "word")
          store.addWrong({ sig: "w:" + q.meta.group + ":" + q.meta.term, kind: "word", term: q.meta.term, gloss: q.meta.gloss, reading: q.meta.reading, tip: q.meta.tip, group: q.meta.group, groupTitle: q.meta.groupTitle });
        else if (q.meta.kind === "quiz")
          store.addWrong({ sig: q.meta.sig, kind: "quiz", q: q.meta.q, setId: q.meta.set, setTitle: q.meta.setTitle });
      }
      if (session.sessionType === "wrong" && ok && q.meta && q.meta.sig) store.removeWrong(q.meta.sig);

      // 视觉反馈
      if (q.kind === "choice") {
        const btns = feedbackHost.querySelectorAll(".opt");
        btns.forEach((b, i) => {
          b.classList.add("locked");
          if (i === q.answerIndex) b.classList.add("right");
          if (i === chosenIndex && i !== q.answerIndex) b.classList.add("wrong");
        });
      } else if (submitBtn) {
        submitBtn.disabled = true;
        const inp = feedbackHost.querySelector(".quiz-input");
        if (inp) { inp.disabled = true; inp.classList.add(ok ? "right" : "wrong"); }
      }

      const fb = el("div", { class: "quiz-feedback " + (ok ? "ok" : "no") });
      fb.innerHTML = ok
        ? `<div class="r">✅ 答对了！</div>`
        : `<div class="r">❌ ${q.kind === "input" && userVal ? "你写的：<s>" + escapeHtml(userVal) + "</s> · " : ""}正确答案：<b>${escapeHtml(q.display)}</b></div>`;
      if (q.explain) fb.appendChild(el("div", { class: "ex" }, "💡 " + escapeHtml(q.explain)));
      card.appendChild(fb);

      // 生词本（单词检测/生词复习时给个收藏开关）
      if (session.allowVocab && q.meta && q.meta.kind === "word") {
        const inV = store.inVocab(q.meta.term);
        const vb = el("button", { class: "vocab-toggle" + (inV ? " on" : "") },
          inV ? "★ 已在生词本" : "☆ 加入生词本");
        vb.addEventListener("click", () => {
          const now = store.toggleVocab({ term: q.meta.term, gloss: q.meta.gloss, reading: q.meta.reading, tip: q.meta.tip });
          vb.classList.toggle("on", now);
          vb.textContent = now ? "★ 已在生词本" : "☆ 加入生词本";
        });
        fb.appendChild(vb);
      }

      const nb = el("button", { class: "quiz-next" }, idx + 1 >= Q.length ? "查看结果 →" : "下一题 →");
      nb.addEventListener("click", next);
      card.appendChild(nb);
      nb.focus();
    }

    function renderQuestion() {
      const q = Q[idx];
      card.innerHTML = "";
      card.appendChild(el("div", { class: "quiz-sub" }, q.sub || ""));
      const prompt = el("div", { class: "quiz-prompt" }, escapeHtml(q.prompt));
      card.appendChild(prompt);

      if (q.tts) { speak(q.tts, q.ttsLang); const rb = el("button", { class: "quiz-replay" }, "🔊 再听一遍"); rb.addEventListener("click", () => speak(q.tts, q.ttsLang)); card.appendChild(rb); }

      if (q.kind === "choice") {
        const wrap = el("div", { class: "quiz-opts" });
        q.options.forEach((opt, i) => {
          const b = el("button", { class: "opt" }, `<span class="k">${String.fromCharCode(65 + i)}</span>${escapeHtml(opt)}`);
          b.addEventListener("click", () => judgeAndShow(q, null, i, card, null));
          wrap.appendChild(b);
        });
        card.appendChild(wrap);
      } else {
        const row = el("div", { class: "quiz-inputrow" });
        const inp = el("input", { class: "quiz-input", type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false", placeholder: "在这里输入答案…" });
        const sb = el("button", { class: "quiz-submit" }, "提交");
        const go = () => { if (!answered) judgeAndShow(q, inp.value, null, card, sb); };
        sb.addEventListener("click", go);
        inp.addEventListener("keydown", e => { if (e.key === "Enter") go(); });
        row.appendChild(inp); row.appendChild(sb);
        card.appendChild(row);
        if (q.hint) {
          const hb = el("button", { class: "quiz-hint" }, "看提示");
          hb.addEventListener("click", () => { hb.outerHTML = `<span class="quiz-hinted">提示：${escapeHtml(q.hint)}</span>`; });
          card.appendChild(hb);
        }
        setTimeout(() => inp.focus(), 30);
      }
    }

    function finish() {
      const secs = Math.round((Date.now() - started) / 1000);
      const pct = Math.round(correct / Q.length * 100);
      store.addScore({ label: session.title, type: session.sessionType, correct, total: Q.length });
      head.innerHTML = "";
      card.className = "quiz-card result";
      const grade = pct >= 90 ? "🏆 太棒了！" : pct >= 75 ? "👍 不错，继续保持" : pct >= 60 ? "🙂 及格了，错题再过一遍" : "💪 别灰心，错题重练几遍就上来了";
      const wrongNow = store.wrong().length, vocabNow = store.vocab().length;
      card.innerHTML =
        `<div class="result-score" style="--p:${pct}">
           <b>${correct}/${Q.length}</b><span>${pct} 分</span>
         </div>
         <div class="result-grade">${grade}</div>
         <div class="result-meta">用时 ${secs}s · 错题本 ${wrongNow} · 生词本 ${vocabNow}</div>
         <div class="result-actions"></div>`;
      const acts = card.querySelector(".result-actions");
      // 再做一次（同一套，重新打乱）
      const again = el("button", { class: "btn primary" }, "↻ 再练一遍");
      again.addEventListener("click", () => location.reload());
      acts.appendChild(again);
      if (wrongNow) {
        const w = el("a", { class: "btn", href: "run.html?type=wrong" + TP() }, "✍️ 重练错题");
        acts.appendChild(w);
      }
      acts.appendChild(el("a", { class: "btn", href: "index.html" + TP1() }, "← 检测中心"));
    }

    renderHead(); renderQuestion();
  }

  function escapeHtml(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  /* ---------------- 入口：运行器页面 ---------------- */
  function runFromURL(hostSel) {
    try { SH.migrateOnce(track()); } catch (e) {}
    const p = new URLSearchParams(location.search);
    const session = buildSession({ type: p.get("type"), id: p.get("id"), mode: p.get("mode") });
    runSession(session, hostSel);
  }

  /* ---------------- 入口：知识点摸底 ---------------- */
  function runDiagnostic(hostSel) {
    const host = document.querySelector(hostSel);
    const tk = track();
    try { SH.migrateOnce(tk); } catch (e) {}
    const TESTS = window.DIAG_TEST || [];
    const test = TESTS.find(d => d.track === tk) || TESTS[0];
    host.innerHTML = "";
    if (!test || !test.questions.length) {
      host.appendChild(el("div", { class: "quiz-empty" }, "暂无摸底题。<br><a href='index.html" + TP1() + "'>← 回检测中心</a>"));
      return;
    }
    const Q = test.questions;
    let idx = 0;
    const ans = new Array(Q.length).fill(null);
    const started = Date.now();
    const head = el("div", { class: "quiz-head" });
    const card = el("div", { class: "quiz-card" });
    host.appendChild(head); host.appendChild(card);

    function renderHead() {
      head.innerHTML =
        `<a class="quiz-back" href="index.html${TP1()}">← 检测中心</a>
         <div class="quiz-title">🧭 ${test.title}<span>${test.desc || ""} · 共 ${Q.length} 题，测完看强弱项</span></div>
         <div class="quiz-progress"><b>${idx + 1}</b> / ${Q.length}</div>`;
      const bar = el("div", { class: "quiz-bar" });
      bar.appendChild(el("i", { style: `width:${idx / Q.length * 100}%` }));
      head.appendChild(bar);
    }

    function record(val, chosenIndex) {
      const q = Q[idx];
      const ok = q.type === "choice" ? (chosenIndex === q.answer) : (q.answer || []).some(a => norm(a) === norm(val));
      ans[idx] = { ok, point: q.point };
      if (!ok) store.addWrong({
        sig: "diag:" + idx + ":" + q.q, kind: "quiz",
        q: { type: q.type, q: q.q, options: q.options, answer: q.answer, explain: q.explain },
        setId: "diag", setTitle: "知识点摸底"
      });
      idx++;
      if (idx >= Q.length) finish(); else { renderHead(); renderQ(); }
    }

    function renderQ() {
      const q = Q[idx];
      card.className = "quiz-card";
      card.innerHTML = "";
      card.appendChild(el("div", { class: "quiz-sub" }, "考点：" + q.point));
      card.appendChild(el("div", { class: "quiz-prompt" }, escapeHtml(q.q)));
      if (q.type === "choice") {
        const wrap = el("div", { class: "quiz-opts" });
        q.options.forEach((opt, i) => {
          const b = el("button", { class: "opt" }, `<span class="k">${String.fromCharCode(65 + i)}</span>${escapeHtml(opt)}`);
          b.addEventListener("click", () => record(null, i));
          wrap.appendChild(b);
        });
        card.appendChild(wrap);
      } else {
        const row = el("div", { class: "quiz-inputrow" });
        const inp = el("input", { class: "quiz-input", type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false", placeholder: "输入答案…" });
        const sb = el("button", { class: "quiz-submit" }, "下一题");
        const go = () => record(inp.value, null);
        sb.addEventListener("click", go);
        inp.addEventListener("keydown", e => { if (e.key === "Enter") go(); });
        row.appendChild(inp); row.appendChild(sb);
        card.appendChild(row);
        setTimeout(() => inp.focus(), 30);
      }
      const skip = el("button", { class: "quiz-hint" }, "不会，跳过");
      skip.addEventListener("click", () => record("__skip__", -99));
      card.appendChild(skip);
    }

    function finish() {
      const secs = Math.round((Date.now() - started) / 1000);
      const correct = ans.filter(a => a && a.ok).length;
      const pct = Math.round(correct / Q.length * 100);

      const byPoint = {};
      ans.forEach(a => { if (!a) return; (byPoint[a.point] ||= { c: 0, t: 0 }); byPoint[a.point].t++; if (a.ok) byPoint[a.point].c++; });
      const rows = Object.keys(byPoint).map(p => ({ p, c: byPoint[p].c, t: byPoint[p].t, pct: Math.round(byPoint[p].c / byPoint[p].t * 100) }))
        .sort((x, y) => x.pct - y.pct);
      const weak = rows.filter(r => r.pct < 75);
      const info = window.DIAG_POINTS || {};

      // 记录本次摸底（带各考点掌握度，供哥哥的跟踪面板）
      store.addScore({ label: "知识点摸底", type: "diag", correct, total: Q.length,
        detail: { points: rows.map(r => ({ p: r.p, c: r.c, t: r.t })), weak: weak.map(r => r.p) } });

      head.innerHTML = "";
      card.className = "quiz-card";
      card.innerHTML = "";
      const grade = pct >= 85 ? "基础不错！查漏补缺即可" : pct >= 60 ? "有薄弱点，按下面顺序补" : "别慌，照下面清单一项项过，提分很快";
      const top = el("div", { class: "diag-top" });
      top.innerHTML =
        `<div class="result-score" style="--p:${pct}"><b>${correct}/${Q.length}</b><span>${pct}分</span></div>
         <div><div class="diag-grade">${grade}</div><div class="result-meta">用时 ${secs}s · 错题已存入本机错题本（只在这台手机，可点下方重练）</div></div>`;
      card.appendChild(top);

      card.appendChild(el("h3", { class: "diag-h" }, "📊 各知识点掌握度（弱的排在前）"));
      const bars = el("div", { class: "diag-bars" });
      rows.forEach(r => {
        const lv = r.pct >= 75 ? "good" : r.pct >= 50 ? "mid" : "bad";
        bars.appendChild(el("div", { class: "diag-bar " + lv },
          `<span class="lbl">${escapeHtml(r.p)}</span><span class="track"><i style="width:${r.pct}%"></i></span><span class="num">${r.c}/${r.t}</span>`));
      });
      card.appendChild(bars);

      if (weak.length) {
        card.appendChild(el("h3", { class: "diag-h" }, "🎯 建议先补这些"));
        const recs = el("div", { class: "diag-recs" });
        weak.forEach(r => {
          const meta = info[r.p] || {};
          const c = el("div", { class: "diag-rec" });
          c.innerHTML = `<h4>${escapeHtml(r.p)} <span>${r.c}/${r.t}</span></h4><p>${escapeHtml(meta.advice || "")}</p>`;
          const row = el("div", { class: "qi-actions" });
          (meta.links || []).forEach(lk => row.appendChild(el("a", { class: "qi-btn", href: lk.href }, lk.label)));
          c.appendChild(row);
          recs.appendChild(c);
        });
        card.appendChild(recs);
      } else {
        card.appendChild(el("div", { class: "box tip", style: "margin-top:14px" }, "🎉 各知识点都过线了！去『单词检测』继续巩固，或重测看稳定性。"));
      }

      const acts = el("div", { class: "result-actions", style: "margin-top:20px" });
      acts.appendChild(el("a", { class: "btn", href: "run.html?type=wrong" + TP() }, "✍️ 重练错题"));
      const re = el("button", { class: "btn" }, "↻ 重测");
      re.addEventListener("click", () => location.reload());
      acts.appendChild(re);
      acts.appendChild(el("a", { class: "btn primary", href: "index.html" + TP1() }, "← 检测中心"));
      card.appendChild(acts);
      try { window.scrollTo(0, 0); } catch (e) {}
    }

    renderHead(); renderQ();
  }

  /* ---------------- 入口：检测中心页面 ---------------- */
  function renderIndex(hostSel) {
    const host = document.querySelector(hostSel);
    const tk = track();
    try { SH.migrateOnce(tk); } catch (e) {}
    const groups = WORDS.filter(w => profileOf(w) === tk);
    const sets = QUIZZES.filter(q => profileOf(q) === tk);
    const hasDiag = (window.DIAG_TEST || []).some(d => profileOf(d) === tk);
    host.innerHTML = "";

    // 摸底入口（醒目横幅）
    if (hasDiag) {
      const cta = el("a", { class: "diag-cta", href: "diagnostic.html" + TP1() },
        `<div class="diag-cta-emoji">🧭</div>
         <div class="diag-cta-text"><b>知识点摸底测试</b><span>16 题快速测出你哪块弱，按强弱项给复习清单</span></div>
         <div class="diag-cta-go">开始 →</div>`);
      host.appendChild(cta);
    }

    // 统计条
    const stat = el("div", { class: "qi-stats" });
    stat.innerHTML =
      `<div class="qi-stat"><b>${store.todayCount()}</b><span>今日已练（题）</span></div>
       <div class="qi-stat"><b>${store.wrong().length}</b><span>错题本</span></div>
       <div class="qi-stat"><b>${store.vocab().length}</b><span>生词本</span></div>
       <div class="qi-stat"><b>${groups.length + sets.length}</b><span>可练项目</span></div>`;
    host.appendChild(stat);

    // 单词检测（按学科分组；不同语言给不同模式）
    const SUBJ = window.STUDY_SUBJECTS || {};
    function wordModes(g) {
      if (g.lang === "ja" && g.mode === "term2gloss") return [["term2gloss", "看字→义"]];
      if (g.lang === "ja") return [["term2reading", "看词→读音"]];
      return [["gloss2term", "中→英"], ["term2gloss", "英→中"], ["dictation", "🔊 听写"]];
    }
    const SCOPES = window.STUDY_SCOPES || {};
    const scopeKey = (g) => g.scope || (g.scopes || [])[0] || "general";
    function gcard(g) {
      const c = el("div", { class: "qi-card" });
      c.innerHTML = `<h3>${g.title}</h3><p>${g.desc || ""}</p><div class="qi-sub">${g.unit} · ${g.words.length} 词</div>`;
      const row = el("div", { class: "qi-actions" });
      wordModes(g).forEach(([m, label]) =>
        row.appendChild(el("a", { class: "qi-btn", href: `run.html?type=word&id=${g.id}&mode=${m}${TP()}` }, label)));
      c.appendChild(row);
      return c;
    }
    if (groups.length) {
      host.appendChild(el("h2", { class: "qi-h" }, "🔤 单词检测"));
      const bySubj = {};
      groups.forEach(g => (bySubj[g.subject] || (bySubj[g.subject] = [])).push(g));
      Object.keys(bySubj).forEach(subj => {
        const s = SUBJ[subj] || { name: subj, icon: "" };
        host.appendChild(el("h3", { class: "qi-subh" }, `${s.icon} ${s.name}`));
        // 按 scope 再分组，每个 scope 一个可折叠区
        const byScope = {};
        bySubj[subj].forEach(g => (byScope[scopeKey(g)] || (byScope[scopeKey(g)] = [])).push(g));
        Object.keys(byScope).sort((a, b) => ((SCOPES[a] || {}).order || 9) - ((SCOPES[b] || {}).order || 9)).forEach(sk => {
          const gs = byScope[sk];
          const scopeName = (SCOPES[sk] || {}).name || sk;
          const nWords = gs.reduce((n, g) => n + g.words.length, 0);
          const open = gs.length <= 6;
          const grid = el("div", { class: "qi-grid", style: open ? "" : "display:none" });
          gs.forEach(g => grid.appendChild(gcard(g)));
          if (gs.length > 1 || subj === "japanese" || subj === "english") {
            const tog = el("button", { class: "qi-scope-toggle" },
              `<span class="caret">${open ? "▾" : "▸"}</span> ${scopeName} · ${gs.length} 组 / ${nWords} 词`);
            tog.addEventListener("click", () => {
              const vis = grid.style.display !== "none";
              grid.style.display = vis ? "none" : "grid";
              tog.querySelector(".caret").textContent = vis ? "▸" : "▾";
            });
            host.appendChild(tog);
          }
          host.appendChild(grid);
        });
      });
    }

    // 习题检测
    if (sets.length) {
      host.appendChild(el("h2", { class: "qi-h" }, "📝 习题检测"));
      const grid = el("div", { class: "qi-grid" });
      sets.forEach(s => {
        const c = el("div", { class: "qi-card" });
        c.innerHTML = `<h3>${s.title}</h3><p>${s.desc || ""}</p><div class="qi-sub">${s.questions.length} 题</div>`;
        const row = el("div", { class: "qi-actions" });
        row.appendChild(el("a", { class: "qi-btn primary", href: `run.html?type=quiz&id=${s.id}${TP()}` }, "开始练习 →"));
        c.appendChild(row);
        grid.appendChild(c);
      });
      host.appendChild(grid);
    }

    // 我的复习
    host.appendChild(el("h2", { class: "qi-h" }, "🗂️ 我的复习"));
    const rev = el("div", { class: "qi-grid" });
    const wc = el("div", { class: "qi-card review" });
    wc.innerHTML = `<h3>✍️ 错题本</h3><p>做错的题会自动收集到这里，练对自动移除。</p><div class="qi-sub">${store.wrong().length} 道错题</div>`;
    const wrow = el("div", { class: "qi-actions" });
    wrow.appendChild(el("a", { class: "qi-btn primary", href: "run.html?type=wrong" + TP() }, "重练错题 →"));
    const wclr = el("button", { class: "qi-btn ghost" }, "清空");
    wclr.addEventListener("click", () => { if (confirm("清空错题本？")) { store.setWrong([]); renderIndex(hostSel); } });
    wrow.appendChild(wclr); wc.appendChild(wrow); rev.appendChild(wc);

    const vc = el("div", { class: "qi-card review" });
    vc.innerHTML = `<h3>★ 生词本</h3><p>检测时点「加入生词本」收藏的单词，可专门复习。</p><div class="qi-sub">${store.vocab().length} 个生词</div>`;
    const vrow = el("div", { class: "qi-actions" });
    vrow.appendChild(el("a", { class: "qi-btn primary", href: "run.html?type=vocab" + TP() }, "复习生词 →"));
    const vclr = el("button", { class: "qi-btn ghost" }, "清空");
    vclr.addEventListener("click", () => { if (confirm("清空生词本？")) { store.setVocab([]); renderIndex(hostSel); } });
    vrow.appendChild(vclr); vc.appendChild(vrow); rev.appendChild(vc);
    host.appendChild(rev);

    // 成绩历史
    const scores = store.scores().slice(-8).reverse();
    if (scores.length) {
      host.appendChild(el("h2", { class: "qi-h" }, "📈 最近成绩"));
      const list = el("div", { class: "qi-scores" });
      scores.forEach(s => {
        const pct = Math.round((s.correct || 0) / (s.total || 1) * 100);
        const d = new Date(s.ts);
        list.appendChild(el("div", { class: "qi-score" },
          `<span class="t">${escapeHtml(s.label || "")}</span>
           <span class="n">${s.correct}/${s.total}</span>
           <span class="p ${pct >= 75 ? "good" : pct >= 60 ? "mid" : "bad"}">${pct}分</span>
           <span class="d">${localDate(d)}</span>`));
      });
      host.appendChild(list);
    }
  }

  /* 暴露 */
  window.QuizApp = { renderIndex, runFromURL, runSession, buildSession, runDiagnostic, store, speak };
})();
