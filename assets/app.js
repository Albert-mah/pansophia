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
  var useState = React.useState, useContext = React.useContext, useEffect = React.useEffect;

  var Ctx = React.createContext(null);
  window.AppCtx = Ctx;
  window.html = html; // 供 screens.js 共用

  var SCREENS = ["home", "explore", "discipline", "plan", "course", "library", "quiz", "vocab", "notes", "wishlist", "points", "analytics", "users", "messages", "practice", "wrongbook"];
  var NAV = [
    { key: "home", label: "首页" },
    { key: "explore", label: "学科探索", caret: true },
    { key: "plan", label: "学习计划" },
    { key: "course", label: "我的课程" },
    { key: "library", label: "课本库" },
    { key: "quiz", label: "习题测试" },
    { key: "notes", label: "笔记 · 收藏" },
    { key: "analytics", label: "数据中心" }
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
          <nav class="pan-nav-row">
            ${NAV.map(function (n) {
              return html`<span key=${n.key} class=${"pan-nav" + (navActive(n.key) ? " active" : "")}
                onClick=${function () { n.key === "explore" ? app.toggleMenu() : app.go(n.key); }}>
                ${n.label}${n.caret ? html`<span style=${{ fontSize: "10px" }}> ▾</span>` : null}</span>`;
            })}
          </nav>
          <div style=${{ flex: 1 }}></div>
          <div class="pan-search pan-hide-sm" onClick=${function () { app.go("explore"); }}><span>⌕</span> 搜索任何主题…</div>
          <div class="pan-btn grad pill" onClick=${function () { app.go("wishlist"); }}><span>✦</span> 愿望清单</div>
          <div class="pan-btn ink pill" style=${{ fontWeight: 700 }} onClick=${function () { app.go("points"); }}><span style=${{ color: "#C8852E", fontSize: "14px" }}>⬡</span> ${pts.toLocaleString()}</div>
          <div class="pan-offline pan-hide-sm">🔥 ${st.streak || 0} 天</div>
          <div class="pan-avatar" title=${u.name + " · 切换用户"} onClick=${function () { app.toggleUser(); }}
            style=${{ background: "linear-gradient(135deg," + (u.color || "#C8852E") + ",#B6532F)", fontSize: /^[A-Za-z]{1,3}$/.test(u.icon || "") ? "15px" : "20px", fontWeight: 700, letterSpacing: ".5px" }}>${u.icon || C.initials(u.name)}</div>
        </div>
        ${app.menuOpen ? html`<${MegaMenu} />` : null}
        ${app.userPop ? html`<${UserPop} />` : null}
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

  /* ---------------- 全局派发:给导师的浮动入口 + 选中文本快捷留言 ---------------- */
  function Dispatcher() {
    var app = useContext(Ctx);
    var s0 = useState(null); var sel = s0[0], setSel = s0[1];   // {text,x,y}
    useEffect(function () {
      function onUp() {
        try {
          var s = window.getSelection(); var t = s ? String(s).trim() : "";
          if (t.length >= 2 && t.length <= 300 && s.rangeCount) {
            var r = s.getRangeAt(0).getBoundingClientRect();
            if (r && (r.width || r.height)) { setSel({ text: t, x: Math.max(60, Math.min(r.left + r.width / 2, window.innerWidth - 60)), y: r.top }); return; }
          }
          setSel(null);
        } catch (e) { setSel(null); }
      }
      document.addEventListener("mouseup", onUp);
      document.addEventListener("touchend", onUp);
      return function () { document.removeEventListener("mouseup", onUp); document.removeEventListener("touchend", onUp); };
    }, []);
    function ask() { var t = sel.text; setSel(null); try { window.getSelection().removeAllRanges(); } catch (e) {} app.go("messages", { prefill: "关于「" + t + "」:", ctx: { quote: t, screen: app.screen } }); }
    return html`<div>
      <div class="pan-fab" title="给 AI 导师留言" onClick=${function () { app.go("messages"); }}>✉️</div>
      ${sel ? html`<div class="pan-selsend" style=${{ left: sel.x + "px", top: (sel.y > 56 ? sel.y - 40 : sel.y + 26) + "px" }} onMouseDown=${function (e) { e.preventDefault(); }} onClick=${ask}>✉️ 发给导师</div>` : null}
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

  /* ---------------- 根组件 ---------------- */
  function App() {
    var initScreen = qsGet("screen"); if (SCREENS.indexOf(initScreen) < 0) initScreen = "home";
    var s0 = useState({ screen: initScreen, params: { disc: qsGet("disc") || null, cat: qsGet("cat") || null }, menuOpen: false, userPop: false, ready: false, tick: 0, toast: null });
    var st = s0[0], setSt = s0[1];

    // 启动:从数据库水合当前用户全部状态,完成后检测成就(基于已有进度回溯解锁),再渲染
    useEffect(function () { C.hydrate().then(function () { var fresh = C.checkAchievements(); setSt(function (p) { return Object.assign({}, p, { ready: true, tick: p.tick + 1, toast: (fresh && fresh.length) ? fresh : p.toast }); }); }); }, []);
    // 成就 toast 自动消失
    useEffect(function () { if (!st.toast) return; var t = setTimeout(function () { setSt(function (p) { return Object.assign({}, p, { toast: null }); }); }, 5200); return function () { clearTimeout(t); }; }, [st.toast]);

    var api = {
      screen: st.screen, params: st.params, menuOpen: st.menuOpen, userPop: st.userPop,
      go: function (screen, params) {
        if (SCREENS.indexOf(screen) < 0) screen = "home";
        setUrl({ screen: screen, disc: (params && params.disc) || null });
        try { window.scrollTo(0, 0); } catch (e) {}
        setSt(function (p) { return Object.assign({}, p, { screen: screen, params: params || {}, menuOpen: false, userPop: false, tick: p.tick + 1 }); });
      },
      refresh: function () { setSt(function (p) { return Object.assign({}, p, { tick: p.tick + 1 }); }); },
      toggleMenu: function () { setSt(function (p) { return Object.assign({}, p, { menuOpen: !p.menuOpen, userPop: false }); }); },
      toggleUser: function () { setSt(function (p) { return Object.assign({}, p, { userPop: !p.userPop, menuOpen: false }); }); },
      switchUser: function (k) {
        C.switchUser(k);
        setSt(function (p) { return Object.assign({}, p, { userPop: false, menuOpen: false, ready: false, tick: p.tick + 1 }); });
        C.hydrate().then(function () { var fresh = C.checkAchievements(); setSt(function (p) { return Object.assign({}, p, { ready: true, tick: p.tick + 1, toast: (fresh && fresh.length) ? fresh : null }); }); });
      },
      // 动作后检测成就:刷新 + 若有新解锁则弹 toast
      checkAch: function () { var fresh = C.checkAchievements(); setSt(function (p) { return Object.assign({}, p, { tick: p.tick + 1, toast: (fresh && fresh.length) ? fresh : p.toast }); }); }
    };

    var Screens = window.Screens || {};
    var Body = Screens[st.screen] || Screens.home || function () { return html`<div class="pan-screen">加载中…</div>`; };
    var loader = html`<div class="pan-screen" style="min-height:60vh;display:flex;align-items:center;justify-content:center;color:#9a8a6f;">正在从云端同步学习数据…</div>`;

    return html`<${Ctx.Provider} value=${api}>
      <div class="pan-app" onClick=${function (e) {
        if ((st.menuOpen || st.userPop) && !e.target.closest(".pan-mega") && !e.target.closest(".pan-userpop") && !e.target.closest(".pan-nav") && !e.target.closest(".pan-avatar")) {
          setSt(function (p) { return Object.assign({}, p, { menuOpen: false, userPop: false }); });
        }
      }}>
        <${TopBar} />
        <div id="pan-body" key=${st.screen + ":" + C.userKey() + ":" + st.tick}>${st.ready ? html`<${Body} />` : loader}</div>
        ${st.toast ? html`<div class="pan-toast">${st.toast.map(function (a, i) {
          return html`<div key=${i} class="pan-toast-item"><div class="ico">${a.icon}</div><div><div class="t">🏅 成就解锁 · ${a.name}</div><div class="d">${a.desc}${a.pts ? " · +" + a.pts + " ⬡" : ""}</div></div></div>`;
        })}</div>` : null}
        ${st.ready ? html`<${Dispatcher} />` : null}
        ${st.ready ? html`<${CourseHud} />` : null}
      </div>
    </${Ctx.Provider}>`;
  }

  function boot() {
    var root = document.getElementById("app");
    if (!root) { root = document.createElement("div"); root.id = "app"; document.body.appendChild(root); }
    if (ReactDOM.createRoot) ReactDOM.createRoot(root).render(html`<${App} />`);
    else ReactDOM.render(html`<${App} />`, root);
  }
  if (document.readyState !== "loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
