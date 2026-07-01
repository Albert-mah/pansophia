/* =============================================================
 *  万象学院 Pansophia · React 根(htm,零构建)
 * -------------------------------------------------------------
 *  html = htm.bind(React.createElement);组件用 html`` 标签模板,
 *  免 JSX/Babel/打包。逻辑全在 Core(core.js)。屏组件在 screens.js
 *  注册到 window.Screens;通过 window.AppCtx(React Context)拿 app.go/
 *  app.refresh/导航状态。
 * ============================================================= */
(function () {
  var React = window.React, ReactDOM = window.ReactDOM, C = window.Core;
  // 让 htm 模板能用 class= / for= / 字符串 style=(自动转 React 期望的形态)
  function cssToObj(css) {
    var o = {};
    String(css).split(";").forEach(function (d) {
      var i = d.indexOf(":"); if (i < 0) return;
      var k = d.slice(0, i).trim(), v = d.slice(i + 1).trim(); if (!k) return;
      if (k.charAt(0) !== "-") k = k.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); });
      o[k] = v;
    });
    return o;
  }
  function h(type, props) {
    if (props) {
      if (props.class != null) { props.className = props.class; delete props.class; }
      if (props["for"] != null) { props.htmlFor = props["for"]; delete props["for"]; }
      if (typeof props.style === "string") props.style = cssToObj(props.style);
    }
    return React.createElement.apply(null, arguments);
  }
  var html = window.htm.bind(h);
  window.h = h;
  var useState = React.useState, useContext = React.useContext, useEffect = React.useEffect, useRef = React.useRef;

  var Ctx = React.createContext(null);
  window.AppCtx = Ctx;
  window.html = html; // 供 screens.js 共用

  var SCREENS = ["home", "explore", "discipline", "plan", "course", "library", "quiz", "vocab", "notes", "wishlist", "points", "analytics", "users", "messages", "practice", "wrongbook", "reviews"];
  var SUBLABELS = { library: "课本库", reviews: "导师点评", notes: "笔记 · 收藏", analytics: "数据中心", messages: "给导师留言", users: "用户管理" };
  var NAV = [
    { key: "home", label: "首页" },
    { key: "explore", label: "学科探索", caret: true },
    { key: "course", label: "我的课程" },
    { key: "plan", label: "学习计划" },
    { key: "quiz", label: "习题测试" },
    { key: "more", label: "更多", caret: true, sub: ["library", "reviews", "notes", "analytics", "messages", "users"] }
  ];

  function qsGet(k) { try { return new URLSearchParams(location.search).get(k); } catch (e) { return null; } }
  function setUrl(patch) {
    try { var u = new URL(location.href); Object.keys(patch).forEach(function (k) { if (patch[k] == null) u.searchParams.delete(k); else u.searchParams.set(k, patch[k]); }); history.replaceState(null, "", u); } catch (e) {}
  }

  /* ---------------- 顶栏 ---------------- */
  function TopBar() {
    var app = useContext(Ctx);
    var u = C.user(), pts = (C.points().balance || 0), st = C.stats();
    var navActive = function (key) {
      if (app.screen === key) return true;
      if (key === "explore" && (app.screen === "explore" || app.screen === "discipline" || app.menuOpen)) return true;
      if (key === "course" && app.screen === "course") return true;
      return false;
    };
    return html`
      <div class="pan-topbar-wrap">
        <div class="pan-topbar">
          <div class="pan-brand" onClick=${function () { app.go("home"); }}>
            <div class="pan-logo">万</div>
            <div style=${{ lineHeight: 1 }}><div class="bt">Pansophia</div><div class="bs">万象学院</div></div>
          </div>
          <div class=${"pan-burger" + (app.navOpen ? " on" : "")} title="菜单" onClick=${function () { app.toggleNav(); }}>${app.navOpen ? "✕" : "☰"}</div>
          <nav class="pan-nav-row">
            ${NAV.map(function (n) {
              var active = navActive(n.key) || (n.key === "more" && ((n.sub && n.sub.indexOf(app.screen) >= 0) || app.moreOpen));
              return html`<span key=${n.key} class=${"pan-nav" + (active ? " active" : "")} style=${n.key === "more" ? { position: "relative" } : null}
                onClick=${function () { n.key === "explore" ? app.toggleMenu() : n.key === "more" ? app.toggleMore() : app.go(n.key); }}>
                ${n.label}${n.caret ? html`<span style=${{ fontSize: "10px" }}> ▾</span>` : null}
                ${n.key === "more" && app.moreOpen ? html`<${MorePop} />` : null}</span>`;
            })}
          </nav>
          <div style=${{ flex: 1 }}></div>
          <div class="pan-search pan-hide-sm" onClick=${function () { app.go("explore"); }}><span>⌕</span> 搜索任何主题…</div>
          <div class="pan-btn ink pill" style=${{ fontWeight: 700 }} onClick=${function () { app.go("points"); }}><span style=${{ color: "#C8852E", fontSize: "14px" }}>⬡</span> ${pts.toLocaleString()}</div>
          <div class="pan-offline pan-hide-sm">🔥 ${st.streak || 0} 天</div>
          <div class="pan-avatar" title=${u.name + " · 切换用户"} onClick=${function () { app.toggleUser(); }}
            style=${{ background: "linear-gradient(135deg," + (u.color || "#C8852E") + ",#B6532F)", fontSize: /^[A-Za-z]{1,3}$/.test(u.icon || "") ? "15px" : "20px", fontWeight: 700, letterSpacing: ".5px" }}>${u.icon || C.initials(u.name)}</div>
        </div>
        ${app.menuOpen ? html`<${MegaMenu} />` : null}
        ${app.userPop ? html`<${UserPop} />` : null}
        ${app.navOpen ? html`<${NavDrawer} />` : null}
      </div>`;
  }

  function MorePop() {
    var app = useContext(Ctx);
    var sub = (NAV.filter(function (n) { return n.key === "more"; })[0] || {}).sub || [];
    return html`<div class="pan-morepop">
      ${sub.map(function (k) { return html`<div key=${k} class=${"u" + (app.screen === k ? " on" : "")} onClick=${function (e) { e.stopPropagation(); app.go(k); }}>${SUBLABELS[k] || k}</div>`; })}
    </div>`;
  }

  // 移动端:整条导航折叠成 ☰,点开抽屉列出全部入口(含「更多」子项)
  function NavDrawer() {
    var app = useContext(Ctx);
    var items = [];
    NAV.forEach(function (n) {
      if (n.key === "more") (n.sub || []).forEach(function (s) { items.push({ key: s, label: SUBLABELS[s] || s, sub: true }); });
      else items.push({ key: n.key, label: n.label });
    });
    return html`<div class="pan-navdrawer">
      ${items.map(function (it) {
        var active = app.screen === it.key;
        return html`<div key=${it.key} class=${"pan-navdrawer-item" + (active ? " active" : "") + (it.sub ? " sub" : "")} onClick=${function () { app.go(it.key); }}>${it.label}</div>`;
      })}
    </div>`;
  }

  function MegaMenu() {
    var app = useContext(Ctx);
    return html`
      <div class="pan-mega">
        <div class="pan-mega-grid">
          ${C.CATS.map(function (c) {
            var st = C.catStats(c);
            var sample = C.catDisciplines(c).slice(0, 5);
            return html`<div key=${c.key} class="pan-mega-col pan-row" onClick=${function () { app.go("explore", { cat: c.key }); }}>
              <div class="dot" style=${{ background: c.color }}></div>
              <div class="nm">${c.name}</div>
              <div class="en">${c.en} · ${st.disc}</div>
              <div class="ls">${sample.map(function (d, i) { return html`<span key=${i}>${d.name}<br/></span>`; })}</div>
            </div>`;
          })}
        </div>
        <div class="pan-mega-foot" onClick=${function () { app.go("explore"); }}>展开完整知识体系树 · The Tree of Knowledge →</div>
      </div>`;
  }

  function UserPop() {
    var app = useContext(Ctx);
    var cur = C.userKey();
    return html`
      <div class="pan-userpop">
        ${C.users().map(function (u) {
          return html`<div key=${u.key} class=${"u" + (u.key === cur ? " on" : "")} onClick=${function () { app.switchUser(u.key); }}>
            <div class="av" style=${{ background: "linear-gradient(135deg," + (u.color || "#C8852E") + ",#B6532F)", fontSize: /^[A-Za-z]{1,3}$/.test(u.icon || "") ? "13px" : "", fontWeight: 700, letterSpacing: ".5px" }}>${u.icon || C.initials(u.name)}</div>
            <div style=${{ flex: 1 }}><div style=${{ fontWeight: 600, fontSize: "14px" }}>${u.name}</div>
            <div style=${{ fontSize: "11.5px", color: "#9a8a6f" }}>${u.blurb || ""}</div></div>
            ${u.key === cur ? html`<span style=${{ color: "#6E7A4F" }}>✓</span>` : null}</div>`;
        })}
        <div class="add"><div class="u" onClick=${function () { var n = window.prompt("添加学习者(名字):"); if (n) { C.addUser(n).then(function (k) { if (k) app.switchUser(k); }); } }}>
          <div class="av" style=${{ background: "#EBDEC8", color: "#7A6E5E" }}>＋</div>
          <div style=${{ fontWeight: 600, fontSize: "14px" }}>添加学习者…</div></div>
        <div class="u" onClick=${function () { app.go("users"); }}>
          <div class="av" style=${{ background: "#33291E", color: "#E8DCC4" }}>⚙</div>
          <div style=${{ fontWeight: 600, fontSize: "14px" }}>用户管理 · 改头像/信息</div></div></div>
      </div>`;
  }

  /* ---------------- 全局:咨询助教(AI 对话 + 查词标签)+ 给导师留言(次要) ---------------- */
  function AssistantWindow(props) {
    var asst = props.asst, setAsst = props.setAsst;
    function setTab(t) { setAsst(function (p) { return p ? Object.assign({}, p, { tab: t }) : p; }); }
    return html`<div class="pan-asst" onMouseDown=${function (e) { e.stopPropagation(); }}>
      <div class="pan-asst-head"><div>🎓 咨询助教 <span style=${{ fontSize: "11px", color: "#9a8a6f", fontWeight: 400 }}>AI · 陪你聊几轮</span></div>
        <span style=${{ cursor: "pointer", color: "#9a8a6f", fontSize: "20px", lineHeight: 1 }} onClick=${props.onClose}>×</span></div>
      <div class="pan-asst-tabs">
        <span class=${"t" + (asst.tab === "chat" ? " on" : "")} onClick=${function () { setTab("chat"); }}>💬 对话</span>
        <span class=${"t" + (asst.tab === "dict" ? " on" : "")} onClick=${function () { setTab("dict"); }}>📖 查词</span>
      </div>
      ${asst.tab === "chat" ? html`<div class="pan-asst-body">
        ${asst.quote ? html`<div class="pan-asst-quote">正在看:${asst.quote.slice(0, 90)}</div>` : null}
        ${!asst.messages.length && !asst.loading ? html`<div style=${{ color: "#9a8a6f", fontSize: "13px", padding: "8px 2px", lineHeight: 1.8 }}>问我任何学习上的问题吧~ 概念、例子、思路都行。我只陪你聊几轮,觉得有用的回答记得点 ⭐ 收藏成知识卡片。</div>` : null}
        ${asst.messages.map(function (m, i) {
          return m.role === "user"
            ? html`<div key=${i} class="pan-asst-msg u">${m.content}</div>`
            : html`<div key=${i} class="pan-asst-msg a"><div>${m.content}</div><span class="fav" onClick=${function () { props.fav(i); }}>${m.saved ? "✓ 已收藏到卡片" : "⭐ 收藏到知识卡片"}</span></div>`;
        })}
        ${asst.loading ? html`<div class="pan-asst-msg a" style=${{ color: "#9a8a6f" }}>助教思考中…</div>` : null}
      </div>
      <div class="pan-asst-foot">
        ${props.capped ? html`<div style=${{ fontSize: "12px", color: "#b6532f", marginBottom: "8px", lineHeight: 1.6 }}>这轮先聊到这啦~ 把要点收藏成卡片;想深入就 <span class="lnk" style=${{ color: "#B6532F", cursor: "pointer", fontWeight: 600 }} onClick=${props.onMessages}>给导师留言 →</span></div>` : null}
        <div style=${{ display: "flex", gap: "6px" }}>
          <input value=${asst.input} disabled=${props.capped} placeholder=${props.capped ? "本轮已结束" : "问助教…(回车发送)"} onInput=${function (e) { var v = e.target.value; setAsst(function (p) { return p ? Object.assign({}, p, { input: v }) : p; }); }} onKeyDown=${function (e) { if (e.key === "Enter") props.send(); }} style=${{ flex: 1, border: "1px solid #EBDEC8", borderRadius: "9px", padding: "9px 11px", fontSize: "13.5px", outline: "none", background: props.capped ? "#f3ece0" : "#fff" }} />
          <span class="pan-btn ink" style=${{ opacity: (props.capped || asst.loading) ? .5 : 1, cursor: props.capped ? "default" : "pointer" }} onClick=${props.send}>发送</span>
        </div>
        <div style=${{ fontSize: "11px", color: "#bbab8c", marginTop: "7px", display: "flex", justifyContent: "space-between" }}><span>${props.userTurns}/6 轮</span><span class="lnk" style=${{ cursor: "pointer" }} onClick=${props.onMessages}>✉️ 给导师留言</span></div>
      </div>` : html`<div class="pan-asst-body">
        <div style=${{ display: "flex", gap: "6px", marginBottom: "12px" }}>
          <input value=${asst.dictInput || ""} placeholder="查个词 / 字…(回车)" onInput=${function (e) { var v = e.target.value; setAsst(function (p) { return p ? Object.assign({}, p, { dictInput: v }) : p; }); }} onKeyDown=${function (e) { if (e.key === "Enter") { var t = (asst.dictInput || "").trim(); if (t) { setAsst(function (p) { return p ? Object.assign({}, p, { dictLoading: true, term: t }) : p; }); props.lookup(t, { term: t }); } } }} style=${{ flex: 1, border: "1px solid #EBDEC8", borderRadius: "9px", padding: "9px 11px", fontSize: "13.5px", outline: "none" }} />
        </div>
        ${asst.dictLoading ? html`<div style=${{ color: "#9a8a6f", fontSize: "13px" }}>查词中…</div>`
          : (asst.dict && asst.dict.length ? html`<div style=${{ display: "flex", flexDirection: "column", gap: "12px" }}>${asst.dict.map(function (it, i) {
              return html`<div key=${i}><div style=${{ fontSize: "14px", fontWeight: 600 }}>${it.term}${it.reading ? html`<span style=${{ color: "#B6532F", fontWeight: 400, marginLeft: "8px", fontSize: "13px" }}>${it.reading}</span>` : null}</div><div style=${{ fontSize: "13px", color: "#3a3023", marginTop: "3px", lineHeight: 1.7 }}>${it.defs.join("；")}</div></div>`;
            })}</div>` : html`<div style=${{ color: "#9a8a6f", fontSize: "13px", lineHeight: 1.8 }}>${asst.term ? "词典里没收录「" + asst.term + "」。切到「💬 对话」直接问助教吧~" : "输入一个词查释义;或切到「💬 对话」问助教任何问题。"}</div>`)}
      </div>`}
    </div>`;
  }

  function Dispatcher() {
    var app = useContext(Ctx);
    var s0 = useState(null); var sel = s0[0], setSel = s0[1];   // 选中文字工具条 {text,x,y}
    var a0 = useState(null); var asst = a0[0], setAsst = a0[1]; // 助教窗口状态 / null
    useEffect(function () {
      function onUp() {
        try {
          var s = window.getSelection(); var t = s ? String(s).trim() : "";
          if (t.length >= 1 && t.length <= 300 && s.rangeCount) {
            var r = s.getRangeAt(0).getBoundingClientRect();
            if (r && (r.width || r.height)) { setSel({ text: t, x: Math.max(70, Math.min(r.left + r.width / 2, window.innerWidth - 70)), y: r.top }); return; }
          }
          setSel(null);
        } catch (e) { setSel(null); }
      }
      document.addEventListener("mouseup", onUp);
      document.addEventListener("touchend", onUp);
      return function () { document.removeEventListener("mouseup", onUp); document.removeEventListener("touchend", onUp); };
    }, []);
    function lookup(term, patch) { window.Dict.ensure(function () { setAsst(function (p) { return p ? Object.assign({}, p, Object.assign({ dict: window.Dict.lookup(term), dictLoading: false }, patch || {})) : p; }); }); }
    function openAssistant(opts) {
      opts = opts || {};
      var term = (opts.term || "").trim();
      setAsst({ tab: opts.tab || (term ? "dict" : "chat"), term: term, dictInput: term, quote: opts.quote || "", messages: [], input: opts.seed || "", loading: false, dict: null, dictLoading: !!term });
      if (term) lookup(term);
    }
    function fromSelection() {
      var t = sel.text; setSel(null); try { window.getSelection().removeAllRanges(); } catch (e) {}
      var isWord = t.length <= 8 && !/[\s，。,.;:!?、]/.test(t);   // 像个词 → 默认查词标签;否则进对话
      openAssistant({ quote: t, term: isWord ? t : "", tab: isWord ? "dict" : "chat", seed: isWord ? "" : ("关于「" + t + "」,") });
    }
    function toMessages() { var t = sel ? sel.text : ""; setSel(null); try { window.getSelection().removeAllRanges(); } catch (e) {} app.go("messages", t ? { prefill: "关于「" + t + "」:", ctx: { quote: t, screen: app.screen } } : undefined); }

    var userTurns = asst ? asst.messages.filter(function (m) { return m.role === "user"; }).length : 0;
    var capped = userTurns >= 6;
    function send() {
      if (!asst || asst.loading || capped) return;
      var txt = (asst.input || "").trim(); if (!txt) return;
      var msgs = asst.messages.concat([{ role: "user", content: txt }]);
      setAsst(function (p) { return p ? Object.assign({}, p, { messages: msgs, input: "", loading: true }) : p; });
      C.assistantChat(msgs, asst.quote ? { quote: asst.quote } : null).then(function (r) {
        var reply = (r && r.reply) || "助教没回应,稍后再试,或去「给导师留言」。";
        setAsst(function (p) { return p ? Object.assign({}, p, { messages: p.messages.concat([{ role: "assistant", content: reply, saved: false }]), loading: false }) : p; });
      });
    }
    function fav(i) {
      if (!asst) return; var m = asst.messages[i]; if (!m || m.role !== "assistant") return;
      C.addCard(m.content, { subject: "助教", title: (asst.quote || m.content).slice(0, 24) }); app.checkAch && app.checkAch();
      setAsst(function (p) { if (!p) return p; var mm = p.messages.slice(); mm[i] = Object.assign({}, mm[i], { saved: true }); return Object.assign({}, p, { messages: mm }); });
    }

    return html`<div>
      <div class="pan-fab" title="咨询助教(AI)" onClick=${function () { asst ? setAsst(null) : openAssistant({}); }}>🎓</div>
      ${sel ? html`<div style=${{ position: "fixed", left: sel.x + "px", top: (sel.y > 60 ? sel.y - 42 : sel.y + 26) + "px", transform: "translateX(-50%)", display: "flex", gap: "6px", zIndex: 70 }} onMouseDown=${function (e) { e.preventDefault(); }}>
        <span class="pan-selsend" style=${{ position: "static", transform: "none", boxShadow: "none" }} onClick=${fromSelection}>🎓 问助教</span>
        <span class="pan-selsend" style=${{ position: "static", transform: "none", boxShadow: "none", background: "#fff", color: "#8a7a62", fontWeight: 500 }} onClick=${toMessages}>✉️ 留言</span>
      </div>` : null}
      ${asst ? html`<${AssistantWindow} asst=${asst} setAsst=${setAsst} send=${send} fav=${fav} lookup=${lookup} capped=${capped} userTurns=${userTurns} onClose=${function () { setAsst(null); }} onMessages=${function () { setAsst(null); app.go("messages"); }} />` : null}
    </div>`;
  }

  /* ---------------- 右下角:课程数 + 进度,点开展开列表 ---------------- */
  function CourseHud() {
    var app = useContext(Ctx);
    var e0 = useState(false); var open = e0[0], setOpen = e0[1];
    var courses = C.coursesForUser();
    if (!courses.length) return null;
    var tm = 0, tt = 0; courses.forEach(function (c) { tm += c.mastered; tt += c.total; });
    var pct = tt ? Math.round(tm / tt * 100) : 0;
    return html`<div>
      ${open ? html`<div class="pan-hud-panel">
        <div style=${{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}><b style=${{ fontSize: "13px" }}>我的课程 · ${courses.length} 门</b><span class="lnk" style=${{ fontSize: "12px", color: "#B6532F", cursor: "pointer" }} onClick=${function () { setOpen(false); app.go("course"); }}>全部 →</span></div>
        <div style=${{ maxHeight: "46vh", overflow: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>${courses.map(function (c, i) {
          return html`<div key=${i} style=${{ cursor: "pointer" }} onClick=${function () { setOpen(false); app.go("course", c.scope ? { disc: c.discId, scope: c.scope } : { disc: c.discId }); }}>
            <div style=${{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", marginBottom: "3px" }}><span>${c.discName}${c.scopeName ? "·" + c.scopeName : ""}${c.textbook ? "" : " · 未选课本"}</span><span style=${{ color: "#9a8a6f" }}>${c.pct}%</span></div>
            <div style=${{ height: "6px", borderRadius: "3px", background: "#EEE3CF", overflow: "hidden" }}><div style=${{ height: "100%", width: c.pct + "%", background: c.color }}></div></div></div>`;
        })}</div></div>` : null}
      <div class="pan-hud" onClick=${function () { setOpen(!open); }} title="我的课程进度">📚 ${courses.length} · ${pct}%</div>
    </div>`;
  }

  /* ---------------- 讲解正文:同文档注入(原生,无 iframe) ---------------- */
  var _lessonCache = {};
  function fetchLessonDoc(path) {
    if (_lessonCache[path]) return Promise.resolve(_lessonCache[path]);
    return fetch(path).then(function (r) { return r.text(); }).then(function (txt) {
      var doc = new DOMParser().parseFromString(txt, "text/html");
      var article = doc.querySelector("article.page");
      var markup = article ? article.outerHTML : (doc.body ? doc.body.innerHTML : "");
      var scripts = [], styles = [];
      doc.querySelectorAll("style").forEach(function (s) { if (s.textContent) styles.push(s.textContent); });
      doc.querySelectorAll("script").forEach(function (s) {
        if (s.src) return;
        var t = (s.textContent || "").trim(); if (!t) return;
        if (/data-page-id|STUDY_CATALOG|window\.MathJax\s*=/.test(t)) return;   // 跳过引导/配置脚本,只留组件脚本
        scripts.push(s.textContent);
      });
      var needsMath = /\\\(|\\\[|\$\$/.test(txt) || !!doc.querySelector("[data-mathjax]");
      return (_lessonCache[path] = { markup: markup, scripts: scripts, styles: styles, needsMath: needsMath });
    });
  }
  function typesetMath(container) {
    if (window.MathJax && window.MathJax.typesetPromise) { try { window.MathJax.typesetPromise([container]); } catch (e) {} return; }
    if (document.getElementById("mj-embed")) return;
    window.MathJax = { tex: { inlineMath: [["\\(", "\\)"]], displayMath: [["\\[", "\\]"]] }, svg: { fontCache: "global" } };
    var s = document.createElement("script"); s.id = "mj-embed"; s.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
    s.onload = function () { try { if (window.MathJax.typesetPromise) window.MathJax.typesetPromise([container]); } catch (e) {} };
    document.head.appendChild(s);
  }
  // 把讲解正文注入容器 + 重新执行其组件脚本(innerHTML 不会自动跑 <script>)。一次只挂一篇,id 不冲突。
  function mountLesson(container, path) {
    if (!container) return;
    container.innerHTML = '<div class="pan-lesson-loading">载入讲解…</div>';
    fetchLessonDoc(path).then(function (L) {
      container.innerHTML = L.markup;
      L.styles.forEach(function (css) { try { var st = document.createElement("style"); st.textContent = css; container.appendChild(st); } catch (e) {} });
      L.scripts.forEach(function (code) { try { var sc = document.createElement("script"); sc.textContent = code; container.appendChild(sc); } catch (e) {} });
      if (L.needsMath) typesetMath(container);
    }).catch(function () {
      container.innerHTML = '<div class="pan-lesson-loading">讲解载入失败,<a href="' + path + '" target="_blank" rel="noopener">在新标签打开 ↗</a></div>';
    });
  }
  // 内嵌讲解容器(课程中间栏 + 全屏浮层复用);expose 给 screens.js
  function LessonEmbed(props) {
    var ref = useRef(null);
    useEffect(function () { if (props.path && ref.current) mountLesson(ref.current, props.path); }, [props.path]);
    return html`<div class="pan-lesson-embed" ref=${ref}></div>`;
  }
  window.LessonEmbed = LessonEmbed;
  window.mountLesson = mountLesson;

  /* ---------------- 讲解 全屏浮层(注入正文,可交互) ---------------- */
  function LessonOverlay(props) {
    var L = props.lesson;
    var winRef = useRef(null);
    function full() {
      var el = winRef.current; if (!el) return;
      var fn = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
      if (fn) { try { fn.call(el); } catch (e) {} }
    }
    useEffect(function () {
      function onKey(e) { if (e.key === "Escape") props.onClose(); }
      window.addEventListener("keydown", onKey);
      return function () { window.removeEventListener("keydown", onKey); };
    }, []);
    return html`<div class="pan-lesson-mask" onClick=${function (e) { if (e.target.classList.contains("pan-lesson-mask")) props.onClose(); }}>
      <div class="pan-lesson-win" ref=${winRef}>
        <div class="pan-lesson-bar">
          <div class="pan-lesson-title">📖 ${L.title}</div>
          <div style="display:flex;gap:8px;align-items:center;">
            <span class="pan-btn ghost sm" onClick=${full}>⛶ 全屏</span>
            <a class="pan-btn ghost sm" href=${L.path} target="_blank" rel="noopener" title="新标签打开 / 分享">新标签 ↗</a>
            <span class="pan-lesson-x" onClick=${props.onClose} title="关闭 (Esc)">✕</span>
          </div>
        </div>
        <div class="pan-lesson-scroll">${html`<${LessonEmbed} path=${L.path} />`}</div>
      </div>
    </div>`;
  }

  /* ---------------- 根组件 ---------------- */
  function App() {
    var initScreen = qsGet("screen"); if (SCREENS.indexOf(initScreen) < 0) initScreen = "home";
    var s0 = useState({ screen: initScreen, params: { disc: qsGet("disc") || null, cat: qsGet("cat") || null }, menuOpen: false, userPop: false, moreOpen: false, navOpen: false, ready: false, tick: 0, toast: null, lesson: null });
    var st = s0[0], setSt = s0[1];

    // 启动:从数据库水合当前用户全部状态,完成后检测成就(基于已有进度回溯解锁),再渲染
    useEffect(function () { C.hydrate().then(function () { var fresh = C.checkAchievements(); setSt(function (p) { return Object.assign({}, p, { ready: true, tick: p.tick + 1, toast: (fresh && fresh.length) ? fresh : p.toast }); }); }); }, []);
    // 成就 toast 自动消失
    useEffect(function () { if (!st.toast) return; var t = setTimeout(function () { setSt(function (p) { return Object.assign({}, p, { toast: null }); }); }, 5200); return function () { clearTimeout(t); }; }, [st.toast]);

    var api = {
      screen: st.screen, params: st.params, menuOpen: st.menuOpen, userPop: st.userPop, moreOpen: st.moreOpen, navOpen: st.navOpen, lessonOpen: !!st.lesson,
      go: function (screen, params) {
        if (SCREENS.indexOf(screen) < 0) screen = "home";
        setUrl({ screen: screen, disc: (params && params.disc) || null });
        try { window.scrollTo(0, 0); } catch (e) {}
        setSt(function (p) { return Object.assign({}, p, { screen: screen, params: params || {}, menuOpen: false, userPop: false, moreOpen: false, navOpen: false, tick: p.tick + 1 }); });
      },
      refresh: function () { setSt(function (p) { return Object.assign({}, p, { tick: p.tick + 1 }); }); },
      toggleMenu: function () { setSt(function (p) { return Object.assign({}, p, { menuOpen: !p.menuOpen, userPop: false, moreOpen: false, navOpen: false }); }); },
      toggleUser: function () { setSt(function (p) { return Object.assign({}, p, { userPop: !p.userPop, menuOpen: false, moreOpen: false, navOpen: false }); }); },
      toggleMore: function () { setSt(function (p) { return Object.assign({}, p, { moreOpen: !p.moreOpen, menuOpen: false, userPop: false, navOpen: false }); }); },
      toggleNav: function () { setSt(function (p) { return Object.assign({}, p, { navOpen: !p.navOpen, menuOpen: false, userPop: false, moreOpen: false }); }); },
      switchUser: function (k) {
        C.switchUser(k);
        setSt(function (p) {
          var np = Object.assign({}, p, { userPop: false, menuOpen: false, ready: false, tick: p.tick + 1 });
          // 切换用户后,带「课程上下文」的页面(课程详情 / 练习 / 测验)回到课程表 —— 新用户未必选了上一个用户那门课,
          // 不重置会停在别人的课上(disc 参数是 URL 残留)。hydrate 完成后 CourseList 会显示新用户自己的课。
          if (p.screen === "course" || p.screen === "practice" || p.screen === "quiz") { np.screen = "course"; np.params = {}; }
          return np;
        });
        C.hydrate().then(function () { var fresh = C.checkAchievements(); setSt(function (p) { return Object.assign({}, p, { ready: true, tick: p.tick + 1, toast: (fresh && fresh.length) ? fresh : null }); }); });
      },
      // 动作后检测成就:刷新 + 若有新解锁则弹 toast
      checkAch: function () { var fresh = C.checkAchievements(); setSt(function (p) { return Object.assign({}, p, { tick: p.tick + 1, toast: (fresh && fresh.length) ? fresh : p.toast }); }); },
      // 讲解页在系统内打开(iframe 覆盖层),保留交互;可全屏 / 新标签分享
      openLesson: function (path, title) {
        C.logEvent({ kind: "lesson", path: path, label: title || "讲解" });
        var fresh = C.checkAchievements();
        setSt(function (p) { return Object.assign({}, p, { lesson: { path: path, title: title || "讲解" }, tick: p.tick + 1, toast: (fresh && fresh.length) ? fresh : p.toast }); });
      },
      closeLesson: function () { setSt(function (p) { return Object.assign({}, p, { lesson: null }); }); }
    };

    var Screens = window.Screens || {};
    var Body = Screens[st.screen] || Screens.home || function () { return html`<div class="pan-screen">加载中…</div>`; };
    var loader = html`<div class="pan-screen" style="min-height:60vh;display:flex;align-items:center;justify-content:center;color:#9a8a6f;">正在从云端同步学习数据…</div>`;

    return html`<${Ctx.Provider} value=${api}>
      <div class=${"pan-app screen-" + st.screen} onClick=${function (e) {
        if ((st.menuOpen || st.userPop || st.moreOpen) && !e.target.closest(".pan-mega") && !e.target.closest(".pan-userpop") && !e.target.closest(".pan-morepop") && !e.target.closest(".pan-nav") && !e.target.closest(".pan-avatar")) {
          setSt(function (p) { return Object.assign({}, p, { menuOpen: false, userPop: false, moreOpen: false }); });
        }
      }}>
        <${TopBar} />
        <div id="pan-body" key=${st.screen + ":" + C.userKey() + ":" + st.tick}>${st.ready ? html`<${Body} />` : loader}</div>
        ${st.toast ? html`<div class="pan-toast">${st.toast.map(function (a, i) {
          return html`<div key=${i} class="pan-toast-item"><div class="ico">${a.icon}</div><div><div class="t">🏅 成就解锁 · ${a.name}</div><div class="d">${a.desc}${a.pts ? " · +" + a.pts + " ⬡" : ""}</div></div></div>`;
        })}</div>` : null}
        ${st.ready ? html`<${Dispatcher} />` : null}
        ${st.ready ? html`<${CourseHud} />` : null}
        ${st.lesson ? html`<${LessonOverlay} lesson=${st.lesson} onClose=${api.closeLesson} />` : null}
      </div>
    </${Ctx.Provider}>`;
  }

  function boot() {
    var root = document.getElementById("app");
    if (!root) { root = document.createElement("div"); root.id = "app"; document.body.appendChild(root); }
    if (ReactDOM.createRoot) ReactDOM.createRoot(root).render(html`<${App} />`);
    else ReactDOM.render(html`<${App} />`, root);
  }
  // 讲解正文里选中英文 → 冒出「🔊 朗读」浮动按钮(注入后正文在同一 DOM,全局初始化一次;只在讲解容器内生效)
  function initLessonSpeak() {
    var btn = null;
    function hide() { if (btn) { btn.remove(); btn = null; } }
    function place() {
      var sel = window.getSelection && window.getSelection();
      var text = sel ? String(sel).trim() : "";
      if (!text || text.length > 240 || !/[a-zA-Z]/.test(text)) { hide(); return; }
      var n = sel.anchorNode, el = n && (n.nodeType === 1 ? n : n.parentElement);
      if (!el || !el.closest || !el.closest(".pan-lesson-embed")) { hide(); return; }
      var rect; try { rect = sel.getRangeAt(0).getBoundingClientRect(); } catch (e) { return; }
      if (!rect || (!rect.width && !rect.height)) { hide(); return; }
      if (!btn) {
        btn = document.createElement("button"); btn.type = "button"; btn.textContent = "🔊 朗读";
        btn.style.cssText = "position:fixed;z-index:99999;border:0;border-radius:999px;background:#B6532F;color:#fff;font-size:13px;font-weight:700;padding:7px 14px;box-shadow:0 4px 14px rgba(60,40,20,.35);cursor:pointer;";
        btn.addEventListener("mousedown", function (e) { e.preventDefault(); });
        btn.addEventListener("click", function (e) { e.stopPropagation(); var s = window.getSelection && String(window.getSelection()).trim(); if (s) C.speak(s, "en"); });
        document.body.appendChild(btn);
      }
      btn.style.top = Math.max(6, rect.top - 42) + "px";
      btn.style.left = Math.max(6, rect.left + rect.width / 2 - 38) + "px";
    }
    document.addEventListener("mouseup", function () { setTimeout(place, 10); });
    document.addEventListener("touchend", function () { setTimeout(place, 10); });
    document.addEventListener("selectionchange", function () { var s = window.getSelection && String(window.getSelection()).trim(); if (!s) hide(); });
    document.addEventListener("scroll", hide, true);
  }
  if (document.readyState !== "loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);
  initLessonSpeak();
})();
