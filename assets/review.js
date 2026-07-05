/* =============================================================
 *  万象学院 · 知识卡片 + SRS 复习(screen = review)
 * -------------------------------------------------------------
 *  卡片规格:docs/card-system.md(data/cards.*.js,主键 kp = kpKey)。
 *  复习流:到期知识点 → 卡片正面(标题+hook 想一想)→ 翻面看卡片正文
 *  → 自评 记得/模糊/忘了(Leitner 升降盒,core.js srsGrade)。
 *  drill 卡翻面后可「抽一题」:从 PG 题库按 kp 取 1 题,答题走既有
 *  recordAnswer/recordQuiz 路径(错题自动进错题本)。
 *  CardArticle 供课程屏「学」tab 共用(window.CardArticle)。
 * ============================================================= */
(function () {
  var React = window.React, html = window.html, C = window.Core;
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
  function useApp() { return React.useContext(window.AppCtx); }

  var SESSION_N = 20;   // 一次复习最多张数(几分钟一场,碎片时间友好)

  /* ---------- 极简行内标记:**加粗** 与 `代码`;en=true 时英文词句可点读 ---------- */
  function mdSpan(s, en) {
    var parts = String(s == null ? "" : s).split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map(function (p, i) {
      if (/^\*\*[^*]+\*\*$/.test(p)) return html`<b key=${i}>${en ? html`<${SpeakableText} text=${p.slice(2, -2)} />` : p.slice(2, -2)}</b>`;
      if (/^`[^`]+`$/.test(p)) return html`<code key=${i} style="background:#F4EAD8;border-radius:5px;padding:1px 6px;font-size:.92em;">${p.slice(1, -1)}</code>`;
      return en ? html`<${SpeakableText} key=${i} text=${p} />` : p;
    });
  }

  /* ---------- 卡片正文(课程屏 + 复习屏共用) ---------- */
  var MODE_LB = { learn: ["🌿 认识", "#2c5fb3", "#eaf1fb"], drill: ["✍️ 精练", "#B6532F", "#f9ece5"], task: ["🛠 实践", "#a86a00", "#FBF4E6"] };
  function boxRow(icon, label, text, bg, bd, en) {
    if (!text) return null;
    return html`<div style=${"margin-top:12px;border:1px solid " + bd + ";border-left:4px solid " + bd + ";border-radius:11px;padding:12px 15px;background:" + bg + ";"}>
      <div style="font-size:11px;font-weight:700;letter-spacing:.05em;color:#8a7a62;margin-bottom:4px;">${icon} ${label}</div>
      <div style="font-size:13.5px;line-height:1.75;color:#3a3023;">${mdSpan(text, en)}</div></div>`;
  }
  // 卡片正文 v2:body 支持「小点」({t:标题, p:段落};纯字符串兼容为无题小点)。
  // 顶部进度点条:每个小点一个圆点(懂了→实心)+ 每道配套题一个圆点(对✓/错✗/未做○);
  // 划过出预览(标题+摘要),点小点圆点滚到对应段落,点题圆点走 props.onDrill(如课程页切「练」)。
  function CardArticle(props) {
    var card = props.card; if (!card) return null;
    var m = MODE_LB[card.mode] || MODE_LB.learn;
    var kp = card.kp;
    var en = card.subject === "english";   // 英语卡:正文英文词句点一下就发音
    var pts = (card.body || []).map(function (b, i) { return (typeof b === "string") ? { t: "要点 " + (i + 1), p: b } : b; });
    var sn0 = useState(C.cardPtSeen(kp)); var seen = sn0[0], setSeen = sn0[1];
    var hv0 = useState(null); var hov = hv0[0], setHov = hv0[1];      // {kind:'pt'|'q', i}
    var q0 = useState(null); var qs = q0[0], setQs = q0[1];           // 配套题(懒取,只为点条与预览)
    var op0 = useState(!props.collapsible); var open = op0[0], setOpen = op0[1];   // collapsible:点条/hook 常驻,正文可折叠
    var refs = useRef({});
    useEffect(function () {
      setSeen(C.cardPtSeen(kp)); setHov(null); setQs(null); setOpen(!props.collapsible);
      if (props.noDots) { setQs([]); return; }   // 刷题内嵌等场景:不要点条,也不用拉题
      var dead = false;
      C.questionsFor({ kp: [kp], limit: 12 }).then(function (rows) { if (!dead) setQs((rows || []).filter(function (r) { return r.scope !== "extra"; })); });
      return function () { dead = true; };
    }, [kp]);
    var gotN = pts.filter(function (_, i) { return seen[i]; }).length;
    var qstat = C.quizStat();
    function togglePt(i) {
      var m = C.toggleCardPt(kp, i);
      if (m[i]) C.awardOnce("pt:" + kp + "#" + i, 1, "学到 · " + ((pts[i] && pts[i].t) || "小点"), kp);   // 基本分:每个小点首次「懂了」+1
      setSeen(Object.assign({}, m));
    }
    function jumpPt(i) {
      if (!open) { setOpen(true); setTimeout(function () { var el = refs.current["p" + i]; if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 150); return; }
      var el = refs.current["p" + i]; if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    function dotStyle(fill, color, border) {
      return "width:13px;height:13px;border-radius:50%;cursor:pointer;flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;font-size:8.5px;font-weight:800;line-height:1;" +
        (fill ? "background:" + color + ";color:#fff;border:1.5px solid " + color + ";" : "background:transparent;color:" + color + ";border:1.5px solid " + (border || color) + ";");
    }
    var preview = null;
    if (hov && hov.kind === "pt" && pts[hov.i]) {
      var hp = pts[hov.i];
      preview = { title: (seen[hov.i] ? "● " : "○ ") + hp.t, text: hp.p.replace(/\*\*|`/g, "").slice(0, 84) + (hp.p.length > 84 ? "…" : ""), hint: "点圆点跳到这一小节" };
    } else if (hov && hov.kind === "q" && qs && qs[hov.i]) {
      var hq = qs[hov.i], hst = qstat[String(hq.id)];
      preview = { title: (hst ? (hst.ok ? "✓ 已答对" : "✗ 上次答错") : "○ 还没做") + " · 配套题 " + (hov.i + 1),
        text: String(hq.stem || "").slice(0, 84), hint: props.onDrill ? "点圆点去练这题" : "在课程页「练」里可做" };
    }
    return html`<div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px;">
        <span class="pan-pill" style=${"color:" + m[1] + ";background:" + m[2] + ";font-weight:700;"}>${m[0]}</span>
        ${card.minutes ? html`<span class="pan-pill" style="color:#8a7a62;background:#F4EAD8;">⏱ 约 ${card.minutes} 分钟</span>` : null}
        <span class="pan-pill" style="color:#6E7A4F;background:#EFF1E0;">小点 ${gotN}/${pts.length}</span>
        ${props.chips || null}
      </div>
      ${props.noDots ? null : html`<div style="margin:0 0 14px;" onMouseLeave=${function () { setHov(null); }}>
        <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;">
          <span style="font-size:10.5px;font-weight:700;color:#bbab8c;letter-spacing:.04em;">知识点</span>
          ${pts.map(function (pt, i) {
            var on = !!seen[i];
            return html`<span key=${"p" + i} title=${pt.t} style=${dotStyle(on, "#6E7A4F", "#b8c49a")}
              onMouseEnter=${function () { setHov({ kind: "pt", i: i }); }}
              onClick=${function () { setHov({ kind: "pt", i: i }); jumpPt(i); }}>${on ? "✓" : ""}</span>`;
          })}
          ${qs && qs.length ? html`<span style="width:1px;height:12px;background:#EBDEC8;margin:0 2px;"></span>
          <span style="font-size:10.5px;font-weight:700;color:#bbab8c;letter-spacing:.04em;">习题</span>
          ${qs.map(function (q, i) {
            var st = qstat[String(q.id)];
            var color = st ? (st.ok ? "#6E7A4F" : "#B6532F") : "#C8852E";
            return html`<span key=${"q" + i} style=${dotStyle(!!st, color, "#dcc9a4")}
              onMouseEnter=${function () { setHov({ kind: "q", i: i }); }}
              onClick=${function () { setHov({ kind: "q", i: i }); if (props.onDrill) props.onDrill(); }}>${st ? (st.ok ? "✓" : "✗") : ""}</span>`;
          })}` : null}
        </div>
        ${preview ? html`<div style="margin-top:8px;background:#FBF6EC;border:1px solid #EEE3CF;border-radius:10px;padding:9px 13px;font-size:12.5px;line-height:1.6;">
          <b style="color:#5a4e3c;">${preview.title}</b><span style="color:#7A6E5E;"> — ${preview.text}</span>
          <span style="color:#bbab8c;margin-left:6px;">(${preview.hint})</span></div>` : null}
      </div>`}
      ${card.hook ? html`<div style="font-family:var(--serif);font-size:16px;font-weight:700;color:#B6532F;line-height:1.5;margin-bottom:12px;">${mdSpan(card.hook, en)}</div>` : null}
      ${!open ? html`<div onClick=${function () { setOpen(true); }} style="cursor:pointer;text-align:center;border:1.5px dashed #E4C29B;border-radius:10px;padding:9px;font-size:12.5px;font-weight:700;color:#a86a00;background:rgba(255,255,255,.5);">▾ 展开一分钟版全文(${pts.length} 个小点${gotN ? " · 已懂 " + gotN : ""})</div>` : null}
      ${open ? pts.map(function (pt, i) {
        var got = !!seen[i];
        return html`<div key=${i} ref=${function (el) { refs.current["p" + i] = el; }} style="margin:0 0 14px;">
          <div style="display:flex;align-items:baseline;gap:9px;flex-wrap:wrap;margin-bottom:3px;">
            <span style=${"font-size:12.5px;font-weight:800;letter-spacing:.02em;color:" + (got ? "#6E7A4F" : "#a86a00") + ";"}>${got ? "●" : "○"} ${pt.t}</span>
            <span onClick=${function () { togglePt(i); }} style=${"cursor:pointer;font-size:10.5px;font-weight:700;border-radius:999px;padding:2px 10px;" + (got ? "background:#EFF1E0;color:#6E7A4F;" : "background:#F4EAD8;color:#9a8a6f;")}>${got ? "✓ 懂了" : "懂了就点"}</span>
          </div>
          <p style="font-size:14px;line-height:1.85;color:#3a3023;margin:0;">${mdSpan(pt.p, en)}</p>
        </div>`;
      }) : null}
      ${open ? boxRow("🧪", "举个例子", card.example, "#F4F6EC", "#C9D2A8", en) : null}
      ${open ? boxRow("⚠️", "最容易踩的坑", card.pitfall, "#FBF0E6", "#E4C29B", en) : null}
      ${open ? boxRow("💡", "一句话记住", card.mnemonic, "#FBF6EC", "#D8C9A8", en) : null}
      ${open && card.mode === "task" ? boxRow("🛠", "动手做(完成了就来标掌握)", card.task, "#FBF4E6", "#E0C084", en) : null}
      ${open && props.collapsible ? html`<div onClick=${function () { setOpen(false); }} style="cursor:pointer;text-align:center;margin-top:12px;font-size:12px;font-weight:700;color:#bbab8c;">▴ 收起一分钟版</div>` : null}
    </div>`;
  }
  window.CardArticle = CardArticle;

  /* ---------- 英文点读:文本里的英文词/短语,点一下就发音(有道真人音→TTS 兜底) ---------- */
  function SpeakableText(props) {
    var parts = String(props.text == null ? "" : props.text).split(/([A-Za-z][A-Za-z'’-]*(?:[ ][A-Za-z][A-Za-z'’-]*)*)/g);
    return parts.map(function (p, i) {
      if (i % 2 === 1) return html`<span key=${i} title="点一下听发音" onClick=${function (e) { e.stopPropagation(); C.speak(p, "en"); }} style="cursor:pointer;border-bottom:1.5px dotted #C8852E;">${p}</span>`;
      return p;
    });
  }
  window.SpeakableText = SpeakableText;
  // 纯英文单词/短语才配整体喇叭(音标符号 /k/ 之类不配,读出来是字母名会误导)
  function speakableWord(s) { return /^[A-Za-z][A-Za-z '’.,!?-]*$/.test(String(s || "").trim()); }
  window.speakableWord = speakableWord;
  // 日文短语(含假名/汉字,无中文标点长句)可整体朗读
  function speakableJa(s) { s = String(s || "").trim(); return s.length <= 40 && /[぀-ヿ]/.test(s); }
  window.speakableJa = speakableJa;

  /* ---------- 抽一题(复习屏内嵌小练,单题) ---------- */
  function MiniDrill(p) {
    var q0 = useState(null); var q = q0[0], setQ = q0[1];       // null 加载中 / false 无题
    useEffect(function () {
      setQ(null);
      C.questionsFor({ kp: [p.kp], limit: 20 }).then(function (rows) {
        rows = (rows || []).filter(function (r) { return r.scope !== "extra"; });   // 复习抽题不抽课外题
        if (!rows.length) { setQ(false); return; }
        setQ(rows[Math.floor(Math.random() * rows.length)]);
      });
    }, [p.kp]);
    if (q == null) return html`<div style="font-size:12.5px;color:#9a8a6f;padding:8px 0;">出题中…</div>`;
    if (q === false) return html`<div style="font-size:12.5px;color:#9a8a6f;padding:8px 0;">这个考点还没配题。</div>`;
    return html`<${MiniDrillQ} q=${q} key=${q.id} />`;
  }
  // 单题渲染:复习屏抽题 + 课文交互复习题内嵌复用;q 由外部给定,答对走同一套一次性积分
  function MiniDrillQ(p) {
    var q = p.q;
    var a0 = useState(null); var ans = a0[0], setAns = a0[1];   // {chosen, ok}
    var f0 = useState(""); var fill = f0[0], setFill = f0[1];
    function settle(chosen, ok) {
      C.recordAnswer({ questionId: q.id, kp: q.kp, correct: ok });
      C.recordQuiz({ qid: q.id, kp: q.kp, correct: ok });
      if (ok) C.awardOnce("q:" + q.id, 2 + (q.difficulty || 2), (p.why || "复习答对") + " · " + String(q.stem || "").slice(0, 16), q.kp || null);   // 每题一生只给一次分
      setAns({ chosen: chosen, ok: ok });
    }
    var right = q.type === "fill" ? (q.answer || []).join(" / ") : (q.options || [])[q.answer];
    return html`<div style="margin-top:14px;border:1px solid #EEE3CF;border-radius:12px;padding:14px 16px;background:#fff;">
      <div style="font-size:11.5px;font-weight:700;color:#9a8a6f;margin-bottom:8px;">${p.tag || (q.type === "listen" ? "🎧 听音练一题" : "✍️ 顺手练一题")}</div>
      <div style="font-size:14px;font-weight:600;line-height:1.6;margin-bottom:10px;">${q.type !== "listen" && q.subject === "english" ? html`<${SpeakableText} text=${q.stem} />` : q.stem}</div>
      ${q.type === "listen" ? html`<div style="margin-bottom:10px;"><span class="pan-btn terra sm" onClick=${function () { C.speak(q.audio || (q.options || [])[q.answer] || "", q.subject === "japanese" ? "ja" : "en"); }}>▶ 播放音频</span></div>` : null}
      ${q.type === "fill"
        ? (ans ? null : html`<div style="display:flex;gap:8px;flex-wrap:wrap;">
            <input value=${fill} onInput=${function (e) { setFill(e.target.value); }} placeholder="填答案…" style="flex:1;min-width:120px;border:1.5px solid #D8C9A8;border-radius:9px;padding:8px 12px;font-size:14px;background:#FBF9F3;"
              onKeyDown=${function (e) { if (e.key === "Enter") { var v = fill.trim().toLowerCase().replace(/[。.]$/, ""); settle(fill, (q.answer || []).some(function (a) { return String(a).trim().toLowerCase() === v; })); } }} />
            <span class="pan-btn ink sm" onClick=${function () { var v = fill.trim().toLowerCase().replace(/[。.]$/, ""); settle(fill, (q.answer || []).some(function (a) { return String(a).trim().toLowerCase() === v; })); }}>提交</span></div>`)
        : html`<div style="display:flex;flex-direction:column;gap:7px;">${(q.options || []).map(function (op, i) {
            var st = "border:1.5px solid #EBDEC8;background:#fff;";
            if (ans) { if (i === q.answer) st = "border:1.5px solid #6E7A4F;background:#EFF1E0;"; else if (i === ans.chosen && !ans.ok) st = "border:1.5px solid #B6532F;background:#f9ece5;"; }
            var spkL = (q.subject === "english" && speakableWord(op)) ? "en" : (q.subject === "japanese" && speakableJa(op)) ? "ja" : null;
            if (q.type === "listen" && !ans) spkL = null;   // 听音题作答前不给逐项试听
            var spk = spkL ? html`<span title="听发音" onClick=${function (e) { e.stopPropagation(); C.speak(op, spkL); }} style="cursor:pointer;font-size:14px;margin-left:8px;opacity:.75;">🔊</span>` : null;
            return html`<div key=${i} onClick=${function () { if (!ans) settle(i, i === q.answer); }} style=${"display:flex;align-items:center;justify-content:space-between;border-radius:10px;padding:9px 13px;font-size:13.5px;cursor:pointer;" + st}><span>${op}</span>${spk}</div>`;
          })}</div>`}
      ${ans ? html`<div style="margin-top:10px;font-size:13px;line-height:1.7;">
        <div style=${"font-weight:700;color:" + (ans.ok ? "#6E7A4F" : "#B6532F") + ";"}>${ans.ok ? "✓ 答对了" : "✗ 不对"}${ans.ok ? "" : html`<span style="color:#3f8a52;font-weight:600;"> · 正确答案:${right}</span>`}</div>
        ${q.explain ? html`<div style="color:#7A6E5E;margin-top:6px;background:#FBF4E6;border-radius:9px;padding:8px 12px;">${q.subject === "english" ? html`<${SpeakableText} text=${q.explain} />` : q.explain}</div>` : null}</div>` : null}
    </div>`;
  }
  window.MiniDrillQ = MiniDrillQ;

  /* ---------- 复习屏 ---------- */
  function ReviewScreen() {
    var app = useApp();
    var s0 = useState(null); var sess = s0[0], setSess = s0[1];   // null=入口 / {queue,i,flipped,earned,got:[g...]}
    var counts = C.srsCounts(), vDue = C.vocabDueCount();
    var due = C.dueKps();
    var backlogN = Object.keys(C.progress()).filter(function (k) { return !C.kpSrs()[k]; }).length;

    function start() {
      var q = due.slice(0, SESSION_N);
      if (q.length) setSess({ queue: q, i: 0, flipped: false, earned: 0, got: [] });
    }
    function grade(g) {
      var it = sess.queue[sess.i];
      C.srsGrade(it.kp, g);
      C.logEvent({ kind: "srs", subject: it.subject || "", label: it.title, grade: g });
      var got = sess.got.concat([{ it: it, g: g }]);
      if (sess.i + 1 >= sess.queue.length) { setSess(Object.assign({}, sess, { got: got, i: sess.i + 1 })); app.checkAch(); }
      else setSess(Object.assign({}, sess, { got: got, i: sess.i + 1, flipped: false }));
    }
    function openSource(it) {
      if (it.cat && it.cat.path) { app.openLesson(it.cat.path, it.cat.title); return; }
      var did = (it.cat && it.cat.discipline) || null;
      if (did) app.go("course", { disc: did }); else app.go("course");
    }

    /* --- 入口页 --- */
    if (!sess) {
      return html`<div class="pan-screen" style="max-width:860px;">
        <div class="pan-head" style="margin-bottom:22px;"><h1 style="font-family:var(--serif);font-size:30px;font-weight:700;margin:0 0 5px;">今日复习</h1>
        <p style="font-size:14px;color:#8a7a62;margin:0;">几分钟刷掉到期卡片,知识才不会悄悄溜走 · Spaced Repetition</p></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px;">
          <div class="pan-panel" style="padding:22px 24px;">
            <div style="font-size:12px;color:#9a8a6f;font-weight:700;margin-bottom:6px;">🃏 知识卡</div>
            <div style="font-family:var(--serif);font-size:34px;font-weight:700;color:${due.length ? "#B6532F" : "#6E7A4F"};">${due.length}<span style="font-size:14px;color:#9a8a6f;font-weight:600;"> / ${counts.all} 张到期</span></div>
            ${due.length ? html`<span class="pan-btn terra" style="margin-top:14px;" onClick=${start}>▸ 开始复习(${Math.min(due.length, SESSION_N)} 张)</span>`
              : html`<div style="font-size:13px;color:#6E7A4F;margin-top:12px;">✓ 都复习完了,明天再来</div>`}
          </div>
          <div class="pan-panel" style="padding:22px 24px;">
            <div style="font-size:12px;color:#9a8a6f;font-weight:700;margin-bottom:6px;">📚 单词</div>
            <div style="font-family:var(--serif);font-size:34px;font-weight:700;color:${vDue ? "#C8852E" : "#6E7A4F"};">${vDue}<span style="font-size:14px;color:#9a8a6f;font-weight:600;"> 个待复习</span></div>
            <span class="pan-btn ${vDue ? "ink" : "ghost"}" style="margin-top:14px;" onClick=${function () { app.go("vocab"); }}>去单词训练 →</span>
          </div>
        </div>
        ${backlogN ? html`<div class="pan-panel" style="padding:16px 20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
          <div style="flex:1;min-width:200px;font-size:13.5px;line-height:1.6;color:#5a4e3c;">你之前掌握的 <b>${backlogN}</b> 个考点还没进复习循环。加进来,按记忆曲线安排复习(错开在近 3 天)。</div>
          <span class="pan-btn ghost" onClick=${function () { C.srsBackfill(); app.refresh(); }}>＋ 全部加入复习循环</span></div>` : null}
        <div style="margin-top:18px;font-size:12.5px;color:#9a8a6f;line-height:1.7;">怎么进复习循环?在课程里「✓ 标记掌握」的考点会自动进来:第 1 天 → 第 2 天 → 4 → 8 → 16 → 30 天,记得就拉长、忘了就重来。</div>
      </div>`;
    }

    /* --- 完成页 --- */
    if (sess.i >= sess.queue.length) {
      var forgot = sess.got.filter(function (x) { return x.g === 0; });
      var okN = sess.got.filter(function (x) { return x.g === 2; }).length;
      return html`<div class="pan-screen" style="max-width:720px;text-align:center;padding-top:40px;">
        <div style="font-size:44px;margin-bottom:10px;">${okN >= sess.got.length * 0.7 ? "🎉" : "💪"}</div>
        <h1 style="font-family:var(--serif);font-size:26px;margin:0 0 6px;">复习完成:记得 ${okN} / ${sess.got.length}</h1>
        <div style="font-size:13.5px;color:#8a7a62;margin-bottom:22px;">记得的卡片下次间隔更长;忘了的今天还会再见面。</div>
        ${forgot.length ? html`<div class="pan-panel" style="padding:18px 22px;text-align:left;margin-bottom:18px;">
          <div style="font-size:12px;font-weight:700;color:#B6532F;margin-bottom:10px;">😵 忘了的 ${forgot.length} 个 · 建议回去重学</div>
          ${forgot.map(function (x, i) { return html`<div key=${i} class="pan-row" style="display:flex;align-items:center;gap:10px;padding:9px 6px;cursor:pointer;" onClick=${function () { openSource(x.it); }}>
            <span style="flex:1;font-size:13.5px;font-weight:600;">${x.it.title}</span><span style="font-size:12px;color:#2c5fb3;">重学 →</span></div>`; })}</div>` : null}
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
          ${C.dueKps().length ? html`<span class="pan-btn terra" onClick=${function () { setSess(null); }}>还有到期的,再来一轮 →</span>` : null}
          <span class="pan-btn ink" onClick=${function () { app.go("home"); }}>回首页</span>
        </div></div>`;
    }

    /* --- 复习卡 --- */
    var it = sess.queue[sess.i], card = it.card;
    var subjName = (C.SUBJECTS[it.subject] || {}).name || it.subject || "";
    return html`<div class="pan-screen" style="max-width:760px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
        <span class="t-back" style="cursor:pointer;font-size:20px;color:#9a8a6f;" onClick=${function () { setSess(null); }}>‹</span>
        <div style="flex:1;height:6px;background:#F0E6D2;border-radius:999px;overflow:hidden;"><div style=${"height:100%;background:linear-gradient(90deg,#B6532F,#C8852E);width:" + Math.round(sess.i / sess.queue.length * 100) + "%;"}></div></div>
        <span style="font-size:12.5px;color:#9a8a6f;">${sess.i + 1} / ${sess.queue.length}</span>
      </div>
      <div class="pan-panel" style="padding:26px 28px;">
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
          ${subjName ? html`<span class="pan-pill" style="color:#2c5fb3;background:#eaf1fb;font-weight:700;">${subjName}</span>` : null}
          <span class="pan-pill" style="color:#8a7a62;background:#F4EAD8;">第 ${it.box} 盒</span>
        </div>
        <div style="font-family:var(--serif);font-size:22px;font-weight:700;line-height:1.4;margin-bottom:10px;">${it.title}</div>
        ${!sess.flipped ? html`<div>
          ${card && card.hook ? html`<div style="font-size:14px;color:#8a7a62;line-height:1.7;margin-bottom:6px;">💭 提示:${mdSpan(card.hook)}</div>` : null}
          <div style="font-size:13px;color:#9a8a6f;margin-bottom:22px;">先在脑子里回忆一遍:它讲什么?怎么用?有什么坑?</div>
          <span class="pan-btn ink" onClick=${function () { setSess(Object.assign({}, sess, { flipped: true })); C.logEvent({ kind: "lesson", path: "card:" + it.kp, label: it.title }); }}>🔄 翻面对答案</span>
        </div>` : html`<div>
          ${card ? html`<${CardArticle} card=${card} />`
            : it.cat ? html`<div><div style="font-size:13.5px;line-height:1.8;color:#3a3023;margin-bottom:12px;">${it.cat.summary || ""}</div>
                <span class="pan-btn ghost sm" onClick=${function () { app.openLesson(it.cat.path, it.cat.title); }}>📖 打开讲解回顾 →</span></div>`
            : html`<div style="font-size:13px;color:#9a8a6f;line-height:1.7;">这个考点还没有卡片内容 —— 凭记忆自评;想重学点下方标题回课程。</div>`}
          ${card && card.mode === "drill" ? html`<${MiniDrill} kp=${it.kp} />` : null}
          <div style="margin-top:22px;padding-top:16px;border-top:1px dashed #EBDEC8;">
            <div style="font-size:12px;color:#9a8a6f;font-weight:700;margin-bottom:10px;">回忆得怎么样?</div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
              <span class="pan-btn pill terra" onClick=${function () { grade(2); }}>😄 记得(下次 ${["当天", "1 天", "2 天", "4 天", "8 天", "16 天", "30 天"][Math.min(6, it.box + 1)]}后)</span>
              <span class="pan-btn pill ghost" onClick=${function () { grade(1); }}>🤔 模糊</span>
              <span class="pan-btn pill ghost" style="color:#B6532F;" onClick=${function () { grade(0); }}>😵 忘了</span>
            </div></div>
        </div>`}
      </div>
      <div style="margin-top:12px;font-size:12px;color:#9a8a6f;text-align:center;"><span class="lnk" style="cursor:pointer;" onClick=${function () { openSource(it); }}>去这个考点的课程页 →</span></div>
    </div>`;
  }

  window.Screens = window.Screens || {};
  window.Screens.review = ReviewScreen;
})();
