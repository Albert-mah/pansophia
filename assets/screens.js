/* =============================================================
 *  万象学院 Pansophia · 八屏(React + htm)
 * -------------------------------------------------------------
 *  组件用 window.html(已支持 class= / 字符串 style=)。逻辑全走 Core。
 *  导航/刷新走 window.AppCtx。诚实空态,不塞 mock。
 *  注册到 window.Screens = { home, explore, discipline, plan, course,
 *  quiz, notes, wishlist, points }。
 * ============================================================= */
(function () {
  var React = window.React, html = window.html, C = window.Core;
  var useState = React.useState, useContext = React.useContext, useEffect = React.useEffect, useRef = React.useRef;
  function useApp() { return useContext(window.AppCtx); }
  var SUBJECTS = C.SUBJECTS, CATS = C.CATS;

  /* ---------- 共用小组件 ---------- */
  function Pill(p) { return html`<span class="pan-pill" style=${"color:" + p.color + ";background:" + p.color + "1f;" + (p.strong ? "font-weight:700;" : "")}>${p.text}</span>`; }
  function Bar(p) { return html`<div class="pan-bar"><i style=${"width:" + p.pct + "%;background:" + (p.color || "#C8852E") + ";"}></i></div>`; }
  function subjColor(s) { return (SUBJECTS[s] || {}).color || "#9c7a3d"; }
  function greet() { var h = new Date().getHours(); return h < 6 ? "凌晨好" : h < 11 ? "早上好" : h < 13 ? "中午好" : h < 18 ? "下午好" : "晚上好"; }
  function relTime(ts) { if (!ts) return ""; var d = Date.now() - ts; if (d < 6e4) return "刚刚"; if (d < 36e5) return Math.floor(d / 6e4) + " 分钟前"; if (d < 864e5) return Math.floor(d / 36e5) + " 小时前"; return Math.floor(d / 864e5) + " 天前"; }
  function Ring(p) {
    return html`<div class="pan-ring" style=${"width:102px;height:102px;background:conic-gradient(#fff 0 " + p.pct + "%, rgba(255,255,255,.26) " + p.pct + "% 100%);"}>
      <div style="width:78px;height:78px;border-radius:50%;background:#B6532F;display:flex;align-items:center;justify-content:center;color:#fff;">
      <span style="font-size:22px;font-weight:700;">${p.label}</span></div></div>`;
  }
  function Crumb(p) {
    var app = useApp();
    return html`<div class="pan-crumb">${p.parts.map(function (x, i) {
      return html`<span key=${i}>${i ? " › " : ""}${x.go ? html`<span class="lnk" onClick=${function () { app.go(x.go, x.params); }}>${x.t}</span>` : x.t}</span>`;
    })}</div>`;
  }

  /* =========================================================
   *  HOME
   * ========================================================= */
  function HomeScreen() {
    var app = useApp();
    var u = C.user(), st = C.stats(), heat = C.heatmap();
    var weekCount = C.events().filter(function (e) { return Date.now() - (e.ts || 0) < 7 * 864e5; }).length;
    var skel = C.skeletonForUser();
    var cont = null;
    for (var i = 0; i < skel.length; i++) { var cv = C.coverage(skel[i]); if (cv.total && cv.pct < 100) { cont = { e: skel[i], cv: cv }; break; } }

    // 今日计划(本地小清单)
    var pl = C.plan(), today = new Date().toDateString();
    if (!pl || pl.date !== today) {
      var todos = [];
      skel.forEach(function (e) { (e.topics || []).forEach(function (t) { (t.points || []).forEach(function (p) { if (todos.length < 4 && !(p.ref && C.catalogById(p.ref)) && p.status !== "done") todos.push({ id: e.subject + ":" + p.title, text: p.title, subj: e.subject, done: false }); }); }); });
      pl = { date: today, items: todos }; C.save("plan", pl);
    }
    var doneN = pl.items.filter(function (x) { return x.done; }).length;
    function togglePlan(id) { pl.items.forEach(function (x) { if (x.id === id) x.done = !x.done; }); C.save("plan", pl); app.refresh(); }

    var mine = C.myDiscs(), recs = C.allDisciplines().filter(function (d) { return mine.indexOf(d.id) < 0; }).slice(0, 3);
    var wl = C.wishlist(), cp = C.categoryProgress(), nt = C.notes();

    return html`<div class="pan-screen">
      <div class="pan-head" style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:24px;">
        <div><h1 style="font-family:var(--serif);font-size:32px;font-weight:700;margin:0 0 5px;">${greet()},${u.name} 👋</h1>
        <p style="font-size:14.5px;color:#8a7a62;margin:0;">今天也离"无所不知"更近一步 · One step closer to knowing everything</p></div>
        <div style="display:flex;gap:10px;"><span class="pan-btn ghost" onClick=${function () { app.go("explore"); }}>＋ 探索新学科</span>
        <span class="pan-btn ink" onClick=${function () { app.go("plan"); }}>规划学习 →</span></div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-bottom:22px;">
        ${StatCard("连续学习", st.streak, "天", "活跃 " + st.activeDays + " 天", true)}
        ${StatCard("我的学科", st.enrolled, "门", "已加入我的空间")}
        ${StatCard("习题正确率", st.accuracy == null ? "—" : st.accuracy, st.accuracy == null ? "" : "%", st.answered ? "近 " + st.answered + " 题" : "去测验解锁", false, "#6E7A4F")}
        ${StatCard("收藏知识卡", st.cards, "", st.cards ? "持续积累" : "做题时收藏")}
        ${StatCard("本周练习", weekCount, "次", "近 7 天活动")}
      </div>

      <div style="display:grid;grid-template-columns:1.62fr 1fr;gap:22px;">
        <div style="display:flex;flex-direction:column;gap:22px;">
          ${cont ? html`<div style="background:linear-gradient(118deg,#B6532F,#C8852E);color:#fff;border-radius:20px;padding:26px 28px;display:flex;align-items:center;gap:26px;">
            ${html`<${Ring} pct=${cont.cv.pct} label=${cont.cv.pct + "%"} />`}
            <div style="flex:1;"><div style="font-size:11.5px;letter-spacing:.14em;opacity:.85;margin-bottom:8px;">继续学习 · CONTINUE LEARNING</div>
            <div style="font-family:var(--serif);font-size:23px;font-weight:600;margin-bottom:6px;">${(SUBJECTS[cont.e.subject] || {}).name || cont.e.subject}</div>
            <div style="font-size:13px;opacity:.85;margin-bottom:18px;">${(C.SCOPES[cont.e.scope] || {}).name || cont.e.scope} · 已完成 ${cont.cv.done}/${cont.cv.total} 个考点</div>
            <div style="display:flex;gap:10px;"><span class="pan-btn pill" style="background:#fff;color:#B6532F;" onClick=${function () { app.go("course", { disc: cont.e.discipline }); }}>▸ 继续学习</span>
            <span class="pan-btn pill" style="background:rgba(255,255,255,.18);color:#fff;" onClick=${function () { app.go("plan"); }}>排进计划</span></div></div></div>`
          : html`<div style="background:linear-gradient(118deg,#B6532F,#C8852E);color:#fff;border-radius:20px;padding:30px 28px;">
            <div style="font-size:11.5px;letter-spacing:.14em;opacity:.85;margin-bottom:8px;">开始你的第一门 · GET STARTED</div>
            <div style="font-family:var(--serif);font-size:23px;font-weight:600;margin-bottom:10px;">还没有进行中的课程</div>
            <div style="font-size:13.5px;opacity:.9;margin-bottom:18px;">去「学科探索」挑一门加入我的空间,或直接「学习计划」排一段日程。</div>
            <div style="display:flex;gap:10px;"><span class="pan-btn pill" style="background:#fff;color:#B6532F;" onClick=${function () { app.go("explore"); }}>＋ 探索学科</span>
            <span class="pan-btn pill" style="background:rgba(255,255,255,.18);color:#fff;" onClick=${function () { app.go("plan"); }}>制定计划 →</span></div></div>`}

          <div class="pan-panel"><div class="pan-sec-h"><h2>今日学习计划</h2><span style="font-size:12.5px;color:#9a8a6f;">完成 ${doneN} / ${pl.items.length} · Today's Plan</span></div>
          <div style="display:flex;flex-direction:column;gap:2px;">
            ${pl.items.length ? pl.items.map(function (it) {
              var sc = SUBJECTS[it.subj] || { name: "" };
              return html`<div key=${it.id} class="pan-row" onClick=${function () { togglePlan(it.id); }} style="display:flex;align-items:center;gap:14px;padding:12px 10px;cursor:pointer;">
                <div style=${"width:22px;height:22px;border-radius:7px;" + (it.done ? "background:#6E7A4F;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;" : "border:2px solid #C8852E;")}>${it.done ? "✓" : ""}</div>
                <div style="flex:1;"><div style=${"font-size:14.5px;font-weight:" + (it.done ? "500" : "600") + ";" + (it.done ? "text-decoration:line-through;color:#a8987c;" : "")}>${it.text}</div></div>
                <span style="font-size:12px;color:#9a8a6f;">${sc.name}</span></div>`;
            }) : html`<div style="font-size:13.5px;color:#9a8a6f;padding:8px 4px;">今天还没有计划。去「学习计划」排一段,或在考点大纲点开一个 ⬜ 待填。</div>`}
          </div></div>

          <div class="pan-panel"><div class="pan-sec-h"><h2>学习活跃度</h2><span style="font-size:12.5px;color:#9a8a6f;">近 26 周 · Activity</span></div>
          <div style="display:grid;grid-template-columns:repeat(26,1fr);gap:4px;">
            ${heat.map(function (c, i) { return html`<div key=${i} class="pan-cell" title=${c.day + (c.n ? " · " + c.n + " 次" : "")} style=${"aspect-ratio:1;border-radius:3px;background:" + c.color + ";"}></div>`; })}
          </div>
          <div style="display:flex;align-items:center;justify-content:flex-end;gap:7px;margin-top:14px;font-size:11.5px;color:#9a8a6f;">少 <span style="width:12px;height:12px;border-radius:3px;background:#F1E7D4;"></span><span style="width:12px;height:12px;border-radius:3px;background:#E7C99B;"></span><span style="width:12px;height:12px;border-radius:3px;background:#D29A4E;"></span><span style="width:12px;height:12px;border-radius:3px;background:#B6532F;"></span> 多</div></div>

          <div><div class="pan-sec-h"><h2>为你推荐</h2><span class="more" onClick=${function () { app.go("explore"); }}>更多 →</span></div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;">
            ${recs.length ? recs.map(function (d) {
              var c = d.catColor || "#C8852E";
              return html`<div key=${d.id} class="pan-card" onClick=${function () { app.go("discipline", { disc: d.id }); }} style="background:#fff;border:1px solid #F0E6D2;border-radius:16px;overflow:hidden;cursor:pointer;">
                <div style=${"height:84px;background:repeating-linear-gradient(45deg," + c + "22," + c + "22 9px," + c + "11 9px," + c + "11 18px);"}></div>
                <div style="padding:14px 16px;"><div style=${"font-size:11px;color:" + c + ";font-weight:600;margin-bottom:6px;"}>${d.catName || ""}</div>
                <div style="font-family:var(--serif);font-size:15px;font-weight:600;line-height:1.35;margin-bottom:9px;">${d.name}</div>
                <div style="font-size:11.5px;color:#9a8a6f;">${(d.sub || []).length} 个方向 · ${C.programsFor(d.id).length ? "🎓 有培养方案" : "可加入"}</div></div></div>`;
            }) : html`<div class="pan-empty" style="grid-column:1/-1;">已把推荐都加入啦 🎉</div>`}
          </div></div>
        </div>

        <div style="display:flex;flex-direction:column;gap:22px;">
          <div class="pan-card" onClick=${function () { app.go("wishlist"); }} style="background:#221A12;color:#E8DCC4;border-radius:20px;padding:22px 24px;cursor:pointer;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;"><div style="font-size:11.5px;letter-spacing:.12em;color:#E0A85B;">✦ AI 导师 · 动态</div></div>
            <div style="font-family:var(--mono);font-size:12px;line-height:1.85;">
              ${wl.length ? wl.slice(0, 3).map(function (w, i) {
                var m = w.status === "ready" ? "✓" : w.status === "cooking" ? "⟳" : "○";
                var col = w.status === "ready" ? "#9FB07A" : w.status === "cooking" ? "#E0A85B" : "#8a7a62";
                return html`<div key=${i} style="color:#C9BBA0;"><span style=${"color:" + col + ";"}>${m}</span> ${w.title}${w.status === "ready" ? " · 已就绪" : w.status === "cooking" ? " · 备课中" : " · 排队中"}</div>`;
              }) : html`<div style="color:#9a8783;">还没有愿望 · 去加几个想学的主题</div>`}
            </div>
            <div style="margin-top:14px;font-size:12.5px;font-weight:600;color:#E8B06A;">查看愿望清单 →</div></div>

          <div class="pan-panel"><h2 style="font-family:var(--serif);font-size:18px;font-weight:700;margin:0 0 18px;">各学科进度</h2>
          <div style="display:flex;flex-direction:column;gap:15px;">
            ${cp.length ? cp.map(function (c, i) { return html`<div key=${i}><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:7px;"><span>${c.name}</span><span style="color:#9a8a6f;">${c.pct}%</span></div>${html`<${Bar} pct=${c.pct} color=${c.color} />`}</div>`; }) : html`<div style="font-size:13px;color:#9a8a6f;">学起来后这里会显示各门类进度。</div>`}
          </div></div>

          <div class="pan-panel"><div class="pan-sec-h"><h2 style="font-size:18px;">最近笔记</h2><span class="more" onClick=${function () { app.go("notes"); }}>全部 →</span></div>
          ${nt.length ? nt.slice(0, 3).map(function (n, i) { return html`<div key=${i} class="pan-row" onClick=${function () { app.go("notes"); }} style=${"padding:11px 8px;cursor:pointer;" + (i < 2 ? "border-bottom:1px solid #F4ECDC;" : "")}><div style="font-size:14px;font-weight:600;">${n.title}</div><div style="font-size:11.5px;color:#9a8a6f;margin-top:3px;">${n.subject || ""}</div></div>`; }) : html`<div style="font-size:13px;color:#9a8a6f;padding:6px 2px;">学习时收藏的卡片会出现在这里。</div>`}</div>

          <div class="pan-card" onClick=${function () { app.go("quiz"); }} style="background:linear-gradient(135deg,#6E7A4F,#566041);color:#fff;border-radius:20px;padding:24px 26px;cursor:pointer;">
            <div style="font-size:11.5px;letter-spacing:.14em;opacity:.85;margin-bottom:12px;">今日测验 · DAILY QUIZ</div>
            <div style="font-family:var(--serif);font-size:19px;font-weight:600;line-height:1.4;margin-bottom:8px;">检验本周所学</div>
            <div style="font-size:12.5px;opacity:.82;margin-bottom:16px;">即时判分 + 解析</div>
            <div style="display:inline-block;background:#fff;color:#566041;padding:9px 20px;border-radius:999px;font-weight:600;font-size:13.5px;">开始测验 →</div></div>
        </div>
      </div>
    </div>`;
  }
  function StatCard(lbl, num, unit, sub, grad, numColor) {
    return html`<div class=${"pan-stat" + (grad ? " grad" : "")}><div class="lbl">${lbl}</div>
      <div class="num" style=${numColor ? "color:" + numColor + ";" : ""}>${num}${unit ? html`<small>${unit}</small>` : null}</div>
      <div class="sub">${sub}</div></div>`;
  }

  /* =========================================================
   *  EXPLORE
   * ========================================================= */
  function ExploreScreen() {
    var app = useApp();
    var NOTES = window.STUDY_DISC_NOTES || {};
    var catKey = app.params && app.params.cat;
    var cat = catKey ? CATS.filter(function (c) { return c.key === catKey; })[0] : null;

    // ——— 单门类:完整学科目录 ———
    if (cat) {
      var ds = C.catDisciplines(cat), st = C.catStats(cat);
      return html`<div class="pan-screen">
        ${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "学科探索", go: "explore" }, { t: cat.name }]} />`}
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:6px;flex-wrap:wrap;">
          <div style=${"width:46px;height:46px;border-radius:13px;background:" + cat.color + ";display:flex;align-items:center;justify-content:center;font-size:22px;"}>${cat.icon || ""}</div>
          <div><h1 class="pan-page-h" style="margin:0;">${cat.name} <span class="en">/ ${cat.en || ""}</span></h1>
          <div style="font-size:12.5px;color:#9a8a6f;">${st.disc} 个学科 · ${st.subs} 个方向</div></div>
          <span class="pan-btn ghost sm" style="margin-left:auto;" onClick=${function () { app.go("explore"); }}>← 全部门类</span>
        </div>
        <p class="pan-page-sub">点任意学科进入详情:二级方向、名校培养方案、考点大纲、学习资源。</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px;">
          ${ds.map(function (d) {
            var nt = d.note || NOTES[d.id] || "";
            return html`<div key=${d.id} class="pan-row bordered" onClick=${function () { app.go("discipline", { disc: d.id }); }} style="padding:12px 14px;border-radius:11px;cursor:pointer;display:block;">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><span style="font-weight:600;font-size:14px;">${d.name}</span><span style="color:#bbab8c;font-size:11.5px;white-space:nowrap;">${(d.sub || []).length} 方向</span></div>
              ${nt ? html`<div style="font-size:11.5px;color:#9a8a6f;margin-top:5px;line-height:1.55;">${nt}</div>` : null}
            </div>`;
          })}
        </div></div>`;
    }

    // ——— 总览:六大门类 + 现实学科 ———
    return html`<div class="pan-screen">
      ${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "学科探索" }]} />`}
      <h1 class="pan-page-h">知识体系树 <span class="en">/ The Tree of Knowledge</span></h1>
      <p class="pan-page-sub">全人类的知识被组织为六大门类 + 现实学科。点「查看全部」展开该门类完整学科目录,或点任意学科深入二级方向、名校培养方案与考点。</p>
      <div class="pan-explore-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;">
        ${CATS.map(function (c) {
          var ds = C.catDisciplines(c), st = C.catStats(c), show = ds.slice(0, 6);
          return html`<div key=${c.key} class="pan-panel"><div style="display:flex;align-items:center;gap:14px;margin-bottom:18px;cursor:pointer;" onClick=${function () { app.go("explore", { cat: c.key }); }}>
            <div style=${"width:46px;height:46px;border-radius:13px;background:" + c.color + ";display:flex;align-items:center;justify-content:center;font-size:22px;"}>${c.icon || ""}</div>
            <div><div style="font-family:var(--serif);font-size:20px;font-weight:700;">${c.name}</div>
            <div style="font-size:12px;color:#9a8a6f;">${c.en} · ${st.disc} 个学科 · ${st.subs} 个方向</div></div></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;">
              ${show.map(function (d) { return html`<div key=${d.id} class="pan-row bordered" onClick=${function () { app.go("discipline", { disc: d.id }); }} style="padding:10px 12px;border-radius:10px;font-size:13.5px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;"><span>${d.name}</span><span style="color:#bbab8c;font-size:11.5px;">${(d.sub || []).length}</span></div>`; })}
            </div>
            <div style=${"margin-top:12px;font-size:12.5px;color:" + c.color + ";font-weight:600;cursor:pointer;"} onClick=${function () { app.go("explore", { cat: c.key }); }}>查看全部 ${ds.length} 个学科 →</div></div>`;
        })}
      </div></div>`;
  }

  /* =========================================================
   *  DISCIPLINE
   * ========================================================= */
  /* 教材管理:挂课本/考纲/链接、上传 PDF、开源快捷引用、删除 */
  function MaterialsManager(p) {
    var l0 = useState(null); var list = l0[0], setList = l0[1];
    var f0 = useState({ kind: "textbook", title: "", edition: "", authority: "official", url: "", note: "" });
    var f = f0[0], setF = f0[1];
    var b0 = useState(false); var busy = b0[0], setBusy = b0[1];
    function load() { C.materialsFor(p.disc).then(function (x) { setList(x); }); }
    useEffect(function () { load(); }, []);
    function set(k, v) { setF(function (o) { var n = Object.assign({}, o); n[k] = v; return n; }); }
    var PRESETS = [
      { label: "国家中小学智慧教育平台(官方)", url: "https://basic.smartedu.cn/tchMaterial", authority: "official", kind: "textbook", note: "官方电子课本,可在线看 / 下载 PDF" },
      { label: "ChinaTextbook(开源教材PDF)", url: "https://github.com/TapXWorld/ChinaTextbook", authority: "authoritative", kind: "repo", note: "GitHub 开源教材合集,免费无水印、可下载" },
      { label: "tchMaterial-parser(下载工具)", url: "https://github.com/happycola233/tchMaterial-parser", authority: "authoritative", kind: "tool", note: "从智慧教育平台批量下载电子课本 PDF" },
      { label: "ce_ebook(义务教育)", url: "https://github.com/lihugang/ce_ebook", authority: "authoritative", kind: "repo", note: "义务教育阶段教科书整理收集" }
    ];
    function applyPreset(ps) { setF(function (o) { return Object.assign({}, o, { title: o.title || ps.label, url: ps.url, authority: ps.authority, kind: ps.kind, note: o.note || ps.note }); }); }
    function add() {
      if (!f.title.trim() || busy) return; setBusy(true);
      C.saveMaterial({ discId: p.disc, scope: p.scope || null, edition: f.edition || null, kind: f.kind, title: f.title.trim(), url: f.url || null, note: f.note || "", authority: f.authority, refs: f.url ? [{ name: f.title.trim(), url: f.url }] : [] }).then(function () {
        setBusy(false); setF(Object.assign({}, f, { title: "", url: "", note: "", edition: "" })); load(); if (p.onChanged) p.onChanged();
      });
    }
    function upload(e) {
      var file = e.target.files && e.target.files[0]; if (!file) return;
      if (file.size > 8 * 1024 * 1024) { window.alert("文件请小于 8MB"); e.target.value = ""; return; }
      var rd = new FileReader();
      rd.onload = function () {
        var b64 = String(rd.result).split(",")[1] || "";
        C.uploadFile(file.name, file.type || "application/pdf", b64).then(function (r) {
          if (r && r.ok && r.id) C.saveMaterial({ discId: p.disc, scope: p.scope || null, edition: f.edition || null, kind: "pdf", title: file.name, fileId: r.id, authority: f.authority, note: "上传的文件" }).then(function () { load(); if (p.onChanged) p.onChanged(); });
          else window.alert("上传失败");
        });
      };
      rd.readAsDataURL(file); e.target.value = "";
    }
    function del(id) { if (!window.confirm("删除这条教材?")) return; C.deleteMaterial(id).then(function () { load(); if (p.onChanged) p.onChanged(); }); }
    function cache(id) { C.cachePdf(id).then(function (r) { if (r && r.ok) { window.alert("已缓存到库(" + Math.round((r.size || 0) / 1024) + " KB)"); load(); if (p.onChanged) p.onChanged(); } else window.alert((r && r.error) || "缓存失败"); }); }
    var AUTH = [["official", "官方"], ["authoritative", "权威参考"], ["generated", "AI生成"]];
    var KINDS = [["textbook", "课本"], ["syllabus", "考纲"], ["repo", "仓库"], ["tool", "工具"], ["link", "链接"], ["pdf", "PDF"]];
    return html`<div class="pan-modal-mask" onClick=${function (e) { if (e.target.classList.contains("pan-modal-mask")) p.onClose(); }}>
      <div class="pan-modal" style="max-width:680px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><h2 style="font-family:var(--serif);margin:0;font-size:19px;">教材管理 · ${p.discName || ""}</h2><span onClick=${p.onClose} style="cursor:pointer;color:#9a8a6f;font-size:20px;">×</span></div>
        <p style="font-size:12.5px;color:#8a7a62;margin:0 0 14px;">挂课本 / 考纲 / 链接,或上传 PDF。官方 / 权威优先;AI 排课、出题会读这些。</p>
        <div class="pan-eyebrow" style="margin-bottom:8px;">开源 / 官方 快捷引用</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">${PRESETS.map(function (ps, i) { return html`<span key=${i} class="pan-tag" style="cursor:pointer;" onClick=${function () { applyPreset(ps); }}>+ ${ps.label}</span>`; })}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
          <input value=${f.title} onInput=${function (e) { set("title", e.target.value); }} placeholder="标题(如 人教版数学必修一)" style="grid-column:1/3;border:1px solid #EBDEC8;border-radius:9px;padding:9px 11px;font-family:var(--sans);" />
          <input value=${f.edition} onInput=${function (e) { set("edition", e.target.value); }} placeholder="版本(人教版/苏教版,可空)" style="border:1px solid #EBDEC8;border-radius:9px;padding:9px 11px;font-family:var(--sans);" />
          <input value=${f.url} onInput=${function (e) { set("url", e.target.value); }} placeholder="链接 URL(可空)" style="border:1px solid #EBDEC8;border-radius:9px;padding:9px 11px;font-family:var(--sans);" />
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;align-items:center;"><span style="font-size:12.5px;color:#7A6E5E;">类型</span>${KINDS.map(function (k) { return html`<span key=${k[0]} class=${"pan-tag" + (f.kind === k[0] ? " on" : "")} onClick=${function () { set("kind", k[0]); }}>${k[1]}</span>`; })}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;align-items:center;"><span style="font-size:12.5px;color:#7A6E5E;">可信度</span>${AUTH.map(function (a) { return html`<span key=${a[0]} class=${"pan-tag" + (f.authority === a[0] ? " on" : "")} onClick=${function () { set("authority", a[0]); }}>${a[1]}</span>`; })}</div>
        <input value=${f.note} onInput=${function (e) { set("note", e.target.value); }} placeholder="说明 / 来源备注(可空)" style="width:100%;border:1px solid #EBDEC8;border-radius:9px;padding:9px 11px;margin-bottom:12px;font-family:var(--sans);font-size:13px;" />
        <div style="display:flex;gap:10px;align-items:center;margin-bottom:18px;flex-wrap:wrap;">
          <span class=${"pan-btn " + (f.title.trim() ? "grad" : "ghost")} onClick=${add}>${busy ? "保存中…" : "＋ 添加"}</span>
          <label class="pan-btn ghost sm" style="cursor:pointer;">⬆ 上传 PDF<input type="file" accept="application/pdf,image/*" onChange=${upload} style="display:none;" /></label>
        </div>
        <div class="pan-eyebrow" style="margin-bottom:8px;">已挂教材</div>
        ${list == null ? html`<div class="pan-empty">加载中…</div>` : !list.length ? html`<div style="font-size:13px;color:#9a8a6f;">还没有教材。</div>`
          : html`<div style="display:flex;flex-direction:column;gap:8px;max-height:32vh;overflow:auto;">${list.map(function (m) {
            var href = m.file_id ? C.fileUrl(m.file_id) : m.url;
            return html`<div key=${m.id} style="display:flex;gap:8px;align-items:flex-start;padding:9px 0;border-bottom:1px solid #F4ECDC;">
              <div style="flex:1;min-width:0;"><div style="font-size:13.5px;font-weight:600;">${href ? html`<a href=${href} target="_blank" rel="noopener">${m.title} ↗</a>` : m.title}</div>
              <div style="font-size:11.5px;color:#9a8a6f;">${m.authority || ""}${m.edition ? " · " + m.edition : ""}${m.kind ? " · " + m.kind : ""}${m.file_id ? " · 📄已缓存" : ""}</div></div>
              ${m.url && !m.file_id ? html`<span class="lnk" style="color:#6E7A4F;cursor:pointer;font-size:12px;white-space:nowrap;" onClick=${function () { cache(m.id); }}>缓存PDF</span>` : null}
              <span class="lnk" style="color:#B6532F;cursor:pointer;font-size:12px;" onClick=${function () { del(m.id); }}>删除</span></div>`;
          })}</div>`}
      </div></div>`;
  }

  function DisciplineScreen() {
    var app = useApp();
    var id = app.params.disc;
    var lib0 = useState({}); var libMap = lib0[0], setLibMap = lib0[1];   // url -> {id,status,chars}
    var rd0 = useState(null); var reader = rd0[0], setReader = rd0[1];
    var bz0 = useState({}); var busy = bz0[0], setBusy = bz0[1];
    var mt0 = useState(null); var mats = mt0[0], setMats = mt0[1];   // 课本/教材库
    var mg0 = useState(false); var mgr = mg0[0], setMgr = mg0[1];
    function reloadMats() { C.materialsFor(id).then(setMats); }
    useEffect(function () {
      if (!id) return; var alive = true;
      C.libList(id).then(function (items) { if (!alive) return; var m = {}; items.forEach(function (it) { m[it.url] = it; }); setLibMap(m); });
      C.materialsFor(id).then(function (items) { if (alive) setMats(items); });
      return function () { alive = false; };
    }, [id]);
    function openReader(itId) { setReader({ loading: true }); C.libItem(itId).then(function (it) { setReader(it || { error: true }); }); }
    function refreshLib() { C.libList(id).then(function (items) { var m = {}; items.forEach(function (it) { m[it.url] = it; }); setLibMap(m); }); }
    function recache(p) { setBusy(function (b) { var n = Object.assign({}, b); n[p.url] = 1; return n; }); C.cacheUrl({ discId: id, url: p.url, school: p.school, program: p.program }).then(function () { refreshLib(); setBusy(function (b) { var n = Object.assign({}, b); delete n[p.url]; return n; }); }); }
    var d = id && C.disciplineById(id);
    if (!d) return html`<div class="pan-screen"><div class="pan-empty">没找到该学科。<br/><span class="pan-btn ghost" style="margin-top:12px;" onClick=${function () { app.go("explore"); }}>← 回学科探索</span></div></div>`;
    var cat = C.categoryOf(id) || { name: d.catName || "", color: d.catColor || "#C8852E", key: "" };
    var added = C.hasDisc(id), subs = d.sub || [], progs = C.programsFor(id), skel = C.skeletonForDiscipline(id);
    var tagLabel = { top: "顶尖", strong: "很强", solid: "可参考" };
    var note = d.note || (window.STUDY_DISC_NOTES || {})[id] || "";
    var resources = C.resourcesFor(id);
    return html`<div class="pan-screen">
      ${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "学科探索", go: "explore" }, { t: cat.name, go: "explore", params: { cat: cat.key } }, { t: d.name }]} />`}
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-bottom:8px;">
        <div><h1 class="pan-page-h" style="margin-bottom:4px;">${d.name}${d.en ? html` <span class="en">/ ${d.en}</span>` : null}</h1>
        <div style="font-size:13px;color:#9a8a6f;">${cat.name} · ${subs.length} 个二级方向${progs.length ? " · 🎓 " + progs.length + " 个培养方案" : ""}</div></div>
        <span class=${"pan-btn pill " + (added ? "ghost" : "grad")} onClick=${function () { C.toggleDisc(id); app.checkAch(); }}>${added ? "✓ 已在我的空间" : "＋ 加入我的空间"}</span></div>
      ${note ? html`<p class="pan-page-sub" style="margin-top:10px;">${note}</p>` : html`<div style="height:18px;"></div>`}

      <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:22px;align-items:start;">
        <div style="display:flex;flex-direction:column;gap:22px;">
          <div class="pan-panel"><div class="pan-sec-h"><h2>🧭 二级方向 <span style="font-weight:400;color:#9a8a6f;font-size:13px;">${subs.length}</span></h2></div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            ${subs.length ? subs.map(function (s, i) { return html`<span key=${i} class="pan-tag" style="cursor:default;">${s}</span>`; }) : html`<span style="color:#9a8a6f;font-size:13px;">(二级方向待补充)</span>`}
          </div>
          ${(d.sources || []).length ? html`<div style="font-size:12px;color:#9a8a6f;margin-top:14px;">来源:${(d.sources || []).join(" · ")}</div>` : null}</div>

          ${skel.length ? html`<div class="pan-panel"><div class="pan-sec-h"><h2>📚 考点大纲</h2><span class="more" onClick=${function () { app.go("course", { disc: id }); }}>进入学习 →</span></div>
            ${skel.map(function (e, ei) {
              var cv = C.coverage(e), sc = SUBJECTS[e.subject] || { name: e.subject };
              return html`<div key=${ei} style="margin-bottom:16px;"><div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;"><b style="font-size:14.5px;">${sc.name} · ${(C.SCOPES[e.scope] || {}).name || e.scope}</b>
                <span style="flex:1;max-width:160px;">${html`<${Bar} pct=${cv.pct} color=${cat.color} />`}</span><span style="font-size:12px;color:#9a8a6f;">${cv.done}/${cv.total} · ${cv.pct}%</span></div>
                ${(e.topics || []).map(function (t, ti) {
                  return html`<div key=${ti} style="margin:10px 0;"><div style="font-size:13px;font-weight:700;color:#7A6E5E;margin-bottom:7px;">${t.title}</div><div style="display:flex;flex-wrap:wrap;gap:7px;">
                    ${(t.points || []).map(function (p, pi) { var kp = p.ref ? C.catalogById(p.ref) : null; return kp ? html`<a key=${pi} class="pan-tag" href=${kp.path} style="background:#F1FAF3;border-color:#cdeed7;color:#1f7a44;">✅ ${p.title}</a>` : html`<span key=${pi} class="pan-tag" style="background:#F4EAD8;color:#9a8a6f;">⬜ ${p.title}</span>`; })}
                  </div></div>`;
                })}</div>`;
            })}</div>` : null}
        </div>

        <div style="display:flex;flex-direction:column;gap:22px;">
          ${mats == null ? null : mats.length ? html`<div class="pan-panel"><h2 style="font-family:var(--serif);font-size:18px;font-weight:700;margin:0 0 4px;">📕 课本 / 教材</h2>
            <div style="font-size:12px;color:#9a8a6f;margin-bottom:10px;">这门课以什么为主。官方 / 权威优先;AI 生成的会标注并附来源。</div>
            ${mats.map(function (m, i) {
              var au = m.authority === "official" ? ["官方", "#3f8a52", "#eef7f0"] : m.authority === "authoritative" ? ["权威参考", "#2c5fb3", "#eaf1fb"] : ["AI生成", "#a86a00", "#FBF4E6"];
              return html`<div key=${i} style="padding:9px 0;border-bottom:1px solid #F4ECDC;">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;"><span class="pan-pill" style=${"color:" + au[1] + ";background:" + au[2] + ";"}>${au[0]}</span>${m.edition ? html`<span style="font-size:11.5px;color:#9a8a6f;">${m.edition}</span>` : null}</div>
                <div style="font-size:13.5px;font-weight:600;margin-top:4px;">${m.url ? html`<a href=${m.url} target="_blank" rel="noopener">${m.title} ↗</a>` : m.title}</div>
                ${m.note ? html`<div style="font-size:12px;color:#9a8a6f;margin-top:2px;">${m.note}</div>` : null}
                ${(m.refs && m.refs.length) ? html`<div style="font-size:11.5px;color:#bbab8c;margin-top:3px;">来源:${m.refs.map(function (rf, j) { return html`<span key=${j}>${j ? "、" : ""}${rf.url ? html`<a href=${rf.url} target="_blank" rel="noopener">${rf.name || rf.url}</a>` : (rf.name || "")}</span>`; })}</div>` : null}
              </div>`;
            })}
            <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;"><span class="pan-btn ghost sm" onClick=${function () { setMgr(true); }}>⚙ 管理教材</span><span class="pan-btn ghost sm" onClick=${function () { C.sendMessage({ kind: "ask", text: "请帮「" + d.name + "」选定或生成课本(优先官方 / 权威,注明来源)。", context: { discId: id, disc: d.name } }).then(function () { app.go("messages"); }); }}>✉️ 请导师选 / 生成</span></div>
          </div>` : html`<div class="pan-panel"><h2 style="font-family:var(--serif);font-size:18px;font-weight:700;margin:0 0 6px;">📕 课本 / 教材</h2>
            <div style="font-size:12.5px;color:#9a8a6f;margin-bottom:10px;">还没挂课本。自己挂一本(开源/官方有快捷引用),或让 AI 按权威资料生成一版,都会注明来源。</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;"><span class="pan-btn ink sm" onClick=${function () { setMgr(true); }}>⚙ 管理 / 添加教材</span><span class="pan-btn grad sm" onClick=${function () { C.sendMessage({ kind: "ask", text: "请帮「" + d.name + "」选定或生成课本(优先官方 / 权威,注明来源)。", context: { discId: id, disc: d.name } }).then(function () { app.go("messages"); }); }}>✉️ 请导师选 / 生成</span></div></div>`}
          ${progs.length ? html`<div class="pan-panel"><h2 style="font-family:var(--serif);font-size:18px;font-weight:700;margin:0 0 6px;">🎓 名校培养方案</h2><div style="font-size:12px;color:#9a8a6f;margin-bottom:8px;">质量标:顶尖 / 很强 / 可参考</div>
            ${progs.map(function (p, i) {
              var lit = p.url ? libMap[p.url] : null;
              return html`<div key=${i} style="display:flex;gap:10px;align-items:flex-start;padding:11px 0;border-bottom:1px solid #F4ECDC;">
                <span class="pan-pill" style="color:#a86a00;background:#FBF4E6;flex-shrink:0;">${tagLabel[p.tag] || "方案"}</span>
                <div style="flex:1;min-width:0;"><div style="font-size:14px;font-weight:600;">${p.url ? html`<a href=${p.url} target="_blank" rel="noopener">${p.school}${p.program ? " · " + p.program : ""}${p.year ? "（" + p.year + "）" : ""} ↗</a>` : (p.school + (p.program ? " · " + p.program : "") + (p.year ? "（" + p.year + "）" : ""))}</div>
                ${p.note ? html`<div style="font-size:12.5px;color:#9a8a6f;margin-top:2px;">${p.note}</div>` : null}
                ${p.url ? html`<div style="margin-top:6px;font-size:12px;display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
                  ${lit && lit.status === "ok" ? html`<span class="lnk" style="color:#1f7a44;cursor:pointer;font-weight:600;" onClick=${function () { openReader(lit.id); }}>📄 本地副本(${lit.chars}字)</span>`
                    : lit ? html`<span style="color:#b6532f;">⚠ 未抓到正文</span>` : html`<span style="color:#bbab8c;">未缓存</span>`}
                  <span class="lnk" style="color:#9a8a6f;cursor:pointer;" onClick=${function () { if (!busy[p.url]) recache(p); }}>${busy[p.url] ? "抓取中…" : (lit ? "重新抓取" : "📥 缓存到本地")}</span>
                </div>` : null}</div></div>`;
            })}</div>` : null}
          ${resources.length ? html`<div class="pan-panel"><h2 style="font-family:var(--serif);font-size:18px;font-weight:700;margin:0 0 10px;">📚 学习资源</h2>
          ${resources.map(function (r, i) {
            var ic = { book: "📖", course: "🎬", site: "🌐", tool: "🛠" }[r.type] || "•";
            var head = r.title + (r.author ? " · " + r.author : "");
            return html`<div key=${i} style="display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-bottom:1px solid #F4ECDC;"><span style="font-size:16px;flex-shrink:0;">${ic}</span>
              <div><div style="font-size:13.5px;font-weight:600;">${r.url ? html`<a href=${r.url} target="_blank" rel="noopener">${head} ↗</a>` : head}</div>${r.note ? html`<div style="font-size:12px;color:#9a8a6f;margin-top:2px;">${r.note}</div>` : ""}</div></div>`;
          })}</div>` : null}
          <div class="pan-ink-panel"><div class="pan-kicker">✦ 和 AI 导师一起学</div>
          <div style="font-size:14px;line-height:1.7;color:#E8DCC4;">把这门加进我的空间,然后对 AI 导师说:<br/><code style="display:inline-block;margin-top:8px;background:#2c2114;border-radius:8px;padding:6px 10px;color:#E8B06A;font-size:12.5px;">帮我补全「${d.name}」的学习计划和考点</code></div>
          <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap;"><span class="pan-btn grad pill" onClick=${function () { if (!added) C.toggleDisc(id); app.go("plan"); }}>排进学习计划 →</span>
          ${added ? html`<span class="pan-btn ghost pill" onClick=${function () { app.go("course", { disc: id }); }}>去学习</span>` : null}
          <span class="pan-btn ghost pill" onClick=${function () { C.sendMessage({ kind: "ask", text: "请帮我安排「" + d.name + "」这门课的考点大纲、讲解和习题。", context: { discId: id, disc: d.name } }).then(function () { app.go("messages"); }); }}>✉️ 请导师排课</span></div></div>
        </div>
      </div>
      ${reader ? html`<div class="pan-modal-mask" onClick=${function (e) { if (e.target.classList.contains("pan-modal-mask")) setReader(null); }}>
        <div class="pan-modal" style="max-width:760px;">
          ${reader.loading ? html`<div class="pan-empty">读取中…</div>`
            : (reader.error || (!reader.title && !reader.text)) ? html`<div class="pan-empty">读取失败。<br/><span class="pan-btn ghost sm" style="margin-top:10px;" onClick=${function () { setReader(null); }}>关闭</span></div>`
            : html`<div>
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:6px;">
              <div style="font-family:var(--serif);font-size:18px;font-weight:700;line-height:1.4;">${reader.title || reader.school || "本地副本"}</div>
              <span onClick=${function () { setReader(null); }} style="cursor:pointer;color:#9a8a6f;font-size:20px;line-height:1;">×</span></div>
            <div style="font-size:12px;color:#9a8a6f;margin-bottom:12px;">${reader.school || ""}${reader.program ? " · " + reader.program : ""} · ${reader.chars || (reader.text || "").length} 字 · 本地缓存 · ${reader.url ? html`<a href=${reader.url} target="_blank" rel="noopener">原页面 ↗</a>` : ""}</div>
            <div style="max-height:62vh;overflow:auto;font-size:13.5px;line-height:1.75;color:#3a3023;white-space:pre-wrap;border-top:1px solid #EEE3CF;padding-top:14px;">${reader.text || "(无正文)"}</div>
          </div>`}
        </div></div>` : null}
      ${mgr ? html`<${MaterialsManager} disc=${id} discName=${d.name} onClose=${function () { setMgr(false); }} onChanged=${reloadMats} />` : null}
      </div>`;
  }

  /* =========================================================
   *  PLAN · 学习计划(目标自动排 + 周日历拖拽 + 总览)
   * ========================================================= */
  var PRESETS = [
    { key: "week", label: "未来一周", days: 6 },
    { key: "2week", label: "未来两周", days: 13 },
    { key: "summer", label: "暑假(约2月)", days: 59 },
    { key: "custom", label: "自定义", days: 0 }
  ];
  function defaultForm() {
    var mine = C.myDiscs();
    return { title: "", discIds: mine.slice(0, 3), preset: "week", start: C.todayYmd(), end: C.addDaysYmd(C.todayYmd(), 6), daily: 90, slots: { "上午": true, "下午": true, "晚上": true } };
  }
  function PlanScreen() {
    var app = useApp();
    var sch = C.schedule();
    var f0 = useState(defaultForm()); var form = f0[0], setForm = f0[1];
    var w0 = useState(0); var weekOff = w0[0], setWeekOff = w0[1];
    var mine = C.myDiscs();

    function setPreset(p) {
      var patch = { preset: p.key };
      if (p.key !== "custom") { patch.start = C.todayYmd(); patch.end = C.addDaysYmd(C.todayYmd(), p.days); }
      setForm(Object.assign({}, form, patch));
    }
    function toggleDisc(id) {
      var has = form.discIds.indexOf(id) >= 0;
      setForm(Object.assign({}, form, { discIds: has ? form.discIds.filter(function (x) { return x !== id; }) : form.discIds.concat([id]) }));
    }
    function toggleSlot(s) { var sl = Object.assign({}, form.slots); sl[s] = !sl[s]; setForm(Object.assign({}, form, { slots: sl })); }
    function generate() {
      var slots = C.SLOTS.filter(function (s) { return form.slots[s]; });
      if (!slots.length) slots = C.SLOTS;
      var s = C.autoSchedule({ goal: form.title || "我的学习计划", discIds: form.discIds, start: form.start, end: form.end, dailyMinutes: +form.daily || 90, slots: slots });
      C.saveSchedule(s); setWeekOff(0); app.checkAch();
    }

    /* ----- 没有计划:目标设置 ----- */
    if (!sch) {
      return html`<div class="pan-screen">
        ${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "学习计划" }]} />`}
        <h1 class="pan-page-h">学习计划 <span class="en">/ Study Plan</span></h1>
        <p class="pan-page-sub">设个目标(学哪几门、什么周期、每天多久)→ 自动摊到每天 → 再到日历里拖拽微调。比如"暑假两个月学完日语N5+英语",或"未来一周快速过完某门"。</p>
        <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:22px;align-items:start;">
          <div class="pan-panel">
            <div class="pan-eyebrow" style="margin-bottom:10px;">① 目标</div>
            <input value=${form.title} onInput=${function (e) { setForm(Object.assign({}, form, { title: e.target.value })); }} placeholder="给这个计划起个名(如:暑假冲刺)" style="width:100%;border:1px solid #EBDEC8;border-radius:11px;padding:12px 14px;font-size:14.5px;font-family:var(--sans);outline:none;background:#FFFDF8;margin-bottom:18px;" />

            <div class="pan-eyebrow" style="margin-bottom:10px;">② 学哪几门 <span style="font-weight:400;text-transform:none;color:#9a8a6f;">(来自「我的空间」)</span></div>
            ${mine.length ? html`<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;">
              ${mine.map(function (id) { var d = C.disciplineById(id) || { name: id }; var on = form.discIds.indexOf(id) >= 0; return html`<span key=${id} class=${"pan-tag" + (on ? " on" : "")} onClick=${function () { toggleDisc(id); }}>${on ? "✓ " : ""}${d.name}</span>`; })}
            </div>` : html`<div style="font-size:13.5px;color:#9a8a6f;margin-bottom:18px;">「我的空间」还没有学科。<span class="lnk" style="color:#B6532F;cursor:pointer;" onClick=${function () { app.go("explore"); }}>去学科探索加几门 →</span></div>`}

            <div class="pan-eyebrow" style="margin-bottom:10px;">③ 周期</div>
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
              ${PRESETS.map(function (p) { return html`<span key=${p.key} class=${"pan-tag" + (form.preset === p.key ? " on" : "")} onClick=${function () { setPreset(p); }}>${p.label}</span>`; })}
            </div>
            <div style="display:flex;gap:10px;align-items:center;margin-bottom:18px;font-size:13.5px;color:#7A6E5E;">
              <input type="date" value=${form.start} onInput=${function (e) { setForm(Object.assign({}, form, { start: e.target.value, preset: "custom" })); }} style="border:1px solid #EBDEC8;border-radius:9px;padding:8px 10px;font-family:var(--sans);" />
              <span>至</span>
              <input type="date" value=${form.end} onInput=${function (e) { setForm(Object.assign({}, form, { end: e.target.value, preset: "custom" })); }} style="border:1px solid #EBDEC8;border-radius:9px;padding:8px 10px;font-family:var(--sans);" />
              <span style="color:#9a8a6f;">共 ${C.dateRange(form.start, form.end).length} 天</span>
            </div>

            <div class="pan-eyebrow" style="margin-bottom:10px;">④ 每天学多久 · 时段</div>
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;">
              ${[60, 90, 120, 150].map(function (m) { return html`<span key=${m} class=${"pan-tag" + (+form.daily === m ? " on" : "")} onClick=${function () { setForm(Object.assign({}, form, { daily: m })); }}>${m}分钟</span>`; })}
            </div>
            <div style="display:flex;gap:8px;margin-bottom:22px;">
              ${C.SLOTS.map(function (s) { return html`<span key=${s} class=${"pan-tag" + (form.slots[s] ? " on" : "")} onClick=${function () { toggleSlot(s); }}>${form.slots[s] ? "✓ " : ""}${s}</span>`; })}
            </div>

            <span class=${"pan-btn pill " + (form.discIds.length ? "grad" : "ghost")} onClick=${function () { if (form.discIds.length) generate(); }}>✦ 自动生成计划 →</span>
            ${!form.discIds.length ? html`<span style="font-size:12.5px;color:#9a8a6f;margin-left:10px;">先选至少一门</span>` : null}
          </div>

          <div class="pan-ink-panel">
            <div class="pan-kicker">怎么排的?</div>
            <div style="font-size:13.5px;line-height:1.8;color:#E8DCC4;">
              · 把所选学科的<b style="color:#E8B06A;">考点</b>(没有就用<b style="color:#E8B06A;">二级方向</b>)按难度估时,在你的周期内、每天的时长上限里,均匀摊到各天的时段。<br/>
              · 生成后到<b style="color:#E8B06A;">周/日历</b>里:拖动调整哪天学什么、改时段、标完成或删除。<br/>
              · 内容偏多排不下会提示,可延长周期或加大每日时长。
            </div>
            <div style="margin-top:16px;font-size:12.5px;color:#b3a283;">两个孩子各自切换头像、各排各的,互不干扰。</div>
          </div>
        </div>
      </div>`;
    }

    /* ----- 有计划:日历 + 总览 ----- */
    var prog = C.scheduleProgress(sch);
    var days = C.dateRange(sch.start, sch.end);
    var totalWeeks = Math.max(1, Math.ceil(days.length / 7));
    var winDays = days.slice(weekOff * 7, weekOff * 7 + 7);
    var today = C.todayYmd();
    var slots = sch.slots && sch.slots.length ? sch.slots : C.SLOTS;
    function dayObj(date) { return (sch.days || []).filter(function (d) { return d.date === date; })[0] || { date: date, blocks: [] }; }
    function blocksAt(date, slot) { return dayObj(date).blocks.filter(function (b) { return b.slot === slot; }); }
    function onDrop(e, date, slot) { e.preventDefault(); var id = e.dataTransfer.getData("text/plain"); if (!id) return; var s = C.schedule(); C.moveBlock(s, id, date, slot); C.saveSchedule(s); app.refresh(); }
    function toggleBlk(id) { var s = C.schedule(); C.toggleBlock(s, id); C.saveSchedule(s); app.refresh(); }
    function removeBlk(id) { var s = C.schedule(); C.removeBlock(s, id); C.saveSchedule(s); app.refresh(); }
    function clearPlan() { if (window.confirm("清空当前学习计划?")) { C.save("schedule", null); app.refresh(); } }

    return html`<div class="pan-screen">
      ${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "学习计划" }]} />`}
      <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:18px;">
        <div><h1 class="pan-page-h" style="margin:0 0 4px;">${sch.goal || "我的学习计划"}</h1>
        <div style="font-size:13px;color:#9a8a6f;">${sch.start} ~ ${sch.end} · ${days.length} 天 · 每天 ${sch.dailyMinutes} 分钟</div></div>
        <div style="display:flex;gap:10px;"><span class="pan-btn ghost" onClick=${clearPlan}>清空</span><span class="pan-btn ink" onClick=${function () { C.save("schedule", null); setForm(defaultForm()); app.refresh(); }}>重新规划</span></div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px;">
        ${StatCard("总进度", prog.pct, "%", prog.done + " / " + prog.total + " 项", true)}
        ${StatCard("本周待学", prog.week, "项", "近 7 天")}
        ${StatCard("已完成", prog.done, "项", "继续保持")}
        ${StatCard("落后", prog.behind, "项", prog.behind ? "需补上" : "节奏不错", false, prog.behind ? "#B6532F" : "#6E7A4F")}
      </div>

      ${sch.unscheduled && sch.unscheduled.length ? html`<div style="background:#FBF4E6;border:1px dashed #D8C9A8;border-radius:14px;padding:14px 18px;margin-bottom:18px;font-size:13px;color:#8a7a62;">⚠️ 有 <b>${sch.unscheduled.length}</b> 项没排下(内容偏多)。可「重新规划」延长周期或加大每日时长。</div>` : null}

      ${sch.overview ? html`<div class="pan-panel" style="margin-bottom:18px;">
        <div style="font-size:14.5px;line-height:1.8;color:#3a3023;">${sch.overview}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:14px;">
          <div><div class="pan-eyebrow" style="margin-bottom:8px;">阶段里程碑</div>${(sch.milestones || []).map(function (m, i) { return html`<div key=${i} style="font-size:12.5px;color:#7A6E5E;line-height:1.65;margin-bottom:7px;">📍 ${m}</div>`; })}</div>
          <div><div class="pan-eyebrow" style="margin-bottom:8px;">学习建议</div>${(sch.tips || []).map(function (m, i) { return html`<div key=${i} style="font-size:12.5px;color:#7A6E5E;line-height:1.65;margin-bottom:7px;">💡 ${m}</div>`; })}</div>
        </div></div>` : null}

      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:10px;"><span class=${"pan-btn ghost sm" + (weekOff <= 0 ? "" : "")} style=${weekOff <= 0 ? "opacity:.4;pointer-events:none;" : ""} onClick=${function () { setWeekOff(Math.max(0, weekOff - 1)); }}>← 上一周</span>
        <b style="font-size:14px;">第 ${weekOff + 1} / ${totalWeeks} 周</b>
        <span class="pan-btn ghost sm" style=${(weekOff + 1) >= totalWeeks ? "opacity:.4;pointer-events:none;" : ""} onClick=${function () { setWeekOff(Math.min(totalWeeks - 1, weekOff + 1)); }}>下一周 →</span></div>
        <span style="font-size:12.5px;color:#9a8a6f;">拖动卡片可改天/改时段 · 点卡片标完成 · ✕ 删除</span>
      </div>

      <div style="overflow-x:auto;"><div style=${"display:grid;grid-template-columns:62px repeat(" + winDays.length + ",1fr);gap:8px;min-width:" + (62 + winDays.length * 130) + "px;"}>
        <div></div>
        ${winDays.map(function (date) {
          var isToday = date === today;
          return html`<div key=${date} style=${"text-align:center;padding:8px 4px;border-radius:10px;" + (isToday ? "background:#33291E;color:#F2E8D6;" : "background:#FBF6EC;")}>
            <div style="font-size:12px;font-weight:700;">周${C.weekdayCn(date)}</div><div style=${"font-size:11px;" + (isToday ? "color:#E8B06A;" : "color:#9a8a6f;")}>${date.slice(5)}</div></div>`;
        })}
        ${slots.map(function (slot) {
          return [
            html`<div key=${"l" + slot} style="display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#bbab8c;">${slot}</div>`
          ].concat(winDays.map(function (date) {
            var blks = blocksAt(date, slot);
            return html`<div key=${date + slot} onDragOver=${function (e) { e.preventDefault(); }} onDrop=${function (e) { onDrop(e, date, slot); }}
              style="min-height:64px;background:#fff;border:1px solid #F0E6D2;border-radius:12px;padding:7px;display:flex;flex-direction:column;gap:6px;">
              ${blks.map(function (b) {
                return html`<div key=${b.id} draggable=${true} onDragStart=${function (e) { e.dataTransfer.setData("text/plain", b.id); }}
                  style=${"border-radius:9px;padding:7px 9px;cursor:grab;border-left:3px solid " + (b.subjectColor || "#C8852E") + ";" + (b.done ? "background:#EFF1E0;opacity:.7;" : "background:#FBF6EC;")}>
                  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px;">
                    <div onClick=${function () { toggleBlk(b.id); }} style=${"font-size:12.5px;font-weight:600;line-height:1.3;cursor:pointer;" + (b.done ? "text-decoration:line-through;color:#9a8a6f;" : "")}>${b.done ? "✓ " : ""}${b.title}</div>
                    <span onClick=${function () { removeBlk(b.id); }} style="color:#cbb9a0;cursor:pointer;font-size:13px;line-height:1;">✕</span>
                  </div>
                  <div style="font-size:10.5px;color:#9a8a6f;margin-top:3px;">${b.subject || ""} · ${b.min}min</div></div>`;
              })}
            </div>`;
          }));
        })}
      </div></div>
    </div>`;
  }

  /* =========================================================
   *  COURSE
   * ========================================================= */
  // userPrefScopes / courseScopeOK / coursesForUser 已统一到 core.js(HUD 与课程表共用同一口径)
  var PHASE = { "no-book": ["待选课本", "#b6532f", "#FBF4E6"], planning: ["待规划", "#a86a00", "#FBF4E6"], learning: ["学习中", "#2c5fb3", "#eaf1fb"], verify: ["待最终校验", "#8e6a00", "#FBF4E6"], done: ["✅ 已补上", "#3f8a52", "#eef7f0"] };

  // 课程表:把"学科×范围"平铺成课程卡(只显示与"在学范围"匹配的),可按学科筛选
  function CourseList() {
    var app = useApp();
    var ff = useState(""); var filt = ff[0], setFilt = ff[1];   // 选中学科 id,"" = 全部
    var courses = C.coursesForUser();
    var discMeta = [], seen = {};
    courses.forEach(function (c) { if (!seen[c.discId]) { seen[c.discId] = { id: c.discId, name: c.discName, n: 0 }; discMeta.push(seen[c.discId]); } seen[c.discId].n++; });
    var shown = filt ? courses.filter(function (c) { return c.discId === filt; }) : courses;
    function card(c, i) {
      var ph = C.coursePhase(c), pi = PHASE[ph] || PHASE.learning;
      return html`<div key=${i} class="pan-card pan-panel" style="cursor:pointer;" onClick=${function () { app.go("course", c.scope ? { disc: c.discId, scope: c.scope } : { disc: c.discId }); }}>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <div style=${"width:38px;height:38px;border-radius:11px;flex-shrink:0;background:" + c.color + ";display:flex;align-items:center;justify-content:center;font-size:17px;color:#fff;font-family:var(--serif);"}>${(c.discName || "?").slice(0, 1)}</div>
          <div style="min-width:0;flex:1;"><div style="font-family:var(--serif);font-size:16px;font-weight:700;">${c.discName}${c.scopeName ? html` <span style="font-size:12px;font-weight:600;color:#9a8a6f;">· ${c.scopeName}</span>` : ""}</div>
          <div style="font-size:11.5px;color:#9a8a6f;">${c.total ? c.total + " 个考点" : "待排课"}</div></div>
          <span class="pan-pill" style=${"color:" + pi[1] + ";background:" + pi[2] + ";white-space:nowrap;"}>${pi[0]}</span></div>
        ${c.total ? html`<div>${html`<${Bar} pct=${c.pct} color=${c.color} />`}<div style="font-size:12px;color:#9a8a6f;margin-top:6px;">掌握 ${c.mastered}/${c.total} · ${c.pct}%${c.lessons ? " · " + c.lessons + " 讲解" : ""}</div></div>`
          : html`<div style="font-size:12.5px;color:#bbab8c;">待 AI 导师排课</div>`}
        <div style="font-size:12px;color:#7A6E5E;margin-top:8px;display:flex;align-items:center;gap:6px;">📕 ${c.textbook ? html`<b style="color:#5a4e3c;">${c.textbook.title}</b>` : html`<span style="color:#b6532f;">未选课本</span>`}</div>
      </div>`;
    }
    return html`<div class="pan-screen">
      ${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "我的课程" }]} />`}
      <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;">
        <h1 class="pan-page-h" style="margin:0;">我的课程 <span class="en">/ My Courses</span></h1>
        <span class="pan-btn ink" onClick=${function () { app.go("explore"); }}>＋ 选课 / 加学科</span>
      </div>
      <p class="pan-page-sub">你在学的所有课程(同一学科可有多门,如 数学·高考、数学·初中)。点进去看 AI 导师排的考点大纲与讲解,逐个标记掌握。要加新课:点右上「选课」去学科探索,把学科「加入我的空间」。</p>
      ${courses.length ? html`<div>
        ${discMeta.length > 1 ? html`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;">
          <span class=${"pan-tag" + (filt ? "" : " on")} onClick=${function () { setFilt(""); }}>全部 ${courses.length}</span>
          ${discMeta.map(function (m) { return html`<span key=${m.id} class=${"pan-tag" + (filt === m.id ? " on" : "")} onClick=${function () { setFilt(m.id); }}>${m.name} ${m.n}</span>`; })}
        </div>` : null}
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px;">${shown.map(card)}</div>
      </div>` : html`<div class="pan-empty">你的「我的空间」还没有学科。<br/>先去学科探索加入几门,AI 导师就能为你排课。<br/>
        <span class="pan-btn grad" style="margin-top:14px;" onClick=${function () { app.go("explore"); }}>去学科探索 →</span></div>`}
    </div>`;
  }

  function CourseScreen() {
    var app = useApp();
    var did = app.params.disc;
    var selState = useState(null); var selRef = selState[0], setSel = selState[1];
    var tb0 = useState(false); var pickTb = tb0[0], setPickTb = tb0[1];
    var mt0 = useState(null); var mats = mt0[0], setMats = mt0[1];
    useEffect(function () { if (did) C.materialsFor(did).then(setMats); }, [did]);
    if (!did) return html`<${CourseList} />`;               // 先进课程表
    var skelAll = C.skeletonForDiscipline(did);
    var skelList = skelAll.filter(C.courseScopeOK); if (!skelList.length) skelList = skelAll;
    var entry = (app.params.scope && skelList.filter(function (e) { return e.scope === app.params.scope; })[0]) || skelList[0];
    var d = C.disciplineById(did);
    if (!entry) {
      return html`<div class="pan-screen">${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "我的课程", go: "course" }, { t: (d && d.name) || "课程" }]} />`}
        <div class="pan-empty">${d ? "「" + d.name + "」" : "这门"}还没有考点大纲。<br/>去学科详情页对 AI 导师说"帮我补全学习计划",我来生成。<br/>
        <span class="pan-btn ghost" style="margin-top:12px;" onClick=${function () { app.go("discipline", { disc: did }); }}>← 学科详情</span> <span class="pan-btn ghost" style="margin-top:12px;" onClick=${function () { app.go("course"); }}>← 课程表</span></div></div>`;
    }
    var sc = SUBJECTS[entry.subject] || { name: entry.subject };
    var cv = C.coverage(entry);
    var allPts = [];
    (entry.topics || []).forEach(function (t) { (t.points || []).forEach(function (p) { allPts.push({ t: t.title, p: p, kp: p.ref ? C.catalogById(p.ref) : null }); }); });
    var sel = null;
    if (selRef) sel = allPts.filter(function (x) { return (x.p.ref || x.p.title) === selRef; })[0];
    if (!sel) sel = allPts.filter(function (x) { return x.kp; })[0] || allPts[0];

    var mref = sel ? (sel.p.ref || sel.p.title) : null;
    var mMastered = mref ? C.isMastered(mref) : false;
    function masterBtn() {
      return html`<span class=${"pan-btn pill " + (mMastered ? "ghost" : "terra")} onClick=${function () { C.setMastery(mref, !mMastered, { title: sel.p.title, subject: sc.name, disc: did, difficulty: (sel.kp && sel.kp.difficulty) || 2 }); app.checkAch(); }}>${mMastered ? "✓ 已掌握" : "✓ 标记掌握 · 得分"}</span>`;
    }

    var center;
    if (sel && sel.kp) {
      center = html`<div class="pan-article"><div style="aspect-ratio:16/9;border-radius:16px;background:linear-gradient(135deg,#33291E,#5a4632);display:flex;align-items:center;justify-content:center;margin-bottom:24px;color:rgba(255,255,255,.7);font-size:13px;">${sel.kp.type || "讲解页"}</div>
        <h1>${sel.kp.title}</h1>
        <div style="display:flex;gap:14px;align-items:center;font-size:13px;color:#9a8a6f;margin-bottom:24px;"><span>${sel.t}</span><span>·</span><span>${sc.name}</span></div>
        <p>${sel.kp.summary || ""}</p>
        <div class="pan-callout"><strong>打开完整讲解</strong><br/>这一节已有交互讲解页,点开看可调参数的可视化与例题。</div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:30px;padding-top:24px;border-top:1px solid #EEE3CF;"><a class="pan-btn ink" href=${sel.kp.path}>打开讲解页 →</a><span class="pan-btn ghost" onClick=${function () { app.go("practice", { disc: did, scope: entry.scope }); }}>做练习</span>${masterBtn()}</div></div>`;
    } else if (sel) {
      center = html`<div class="pan-article"><div style="font-size:12.5px;color:#9a8a6f;margin-bottom:8px;">${sel.t} · ${sc.name}</div>
        <h1>${sel.p.title}</h1>
        <div class="pan-callout" style="background:#FBF6EC;border-color:#D8C9A8;"><strong>这个考点还没填 🌱</strong><br/>对 AI 导师说 <code>帮我补全「${sel.p.title}」的考点和讲解</code>,我就生成讲解页接到这里。</div>
        <div style="margin-top:24px;display:flex;gap:10px;flex-wrap:wrap;">${masterBtn()}<span class="pan-btn grad" onClick=${function () { app.go("wishlist"); }}>加入愿望清单 →</span></div></div>`;
    } else center = html`<div class="pan-empty">这门暂无考点。</div>`;

    var noteList = C.notes().filter(function (n) { return n.subject && n.subject.indexOf(sc.name) >= 0; }).slice(0, 3);
    function saveCourseNote(v) { v = (v || "").trim(); if (!v) return; var nt = C.notes(); nt.unshift({ title: v.slice(0, 24), body: v, subject: "随堂笔记", ts: Date.now() }); C.save("notes", nt); app.refresh(); }

    return html`<div class="pan-course">
      <div class="pan-pane pan-scroll side">
        <div style="font-size:12px;color:#9a8a6f;margin-bottom:6px;"><span class="lnk" style="cursor:pointer;" onClick=${function () { app.go("course"); }}>我的课程</span> › ${(d && d.name) || sc.name}</div>
        <h2 style="font-family:var(--serif);font-size:20px;font-weight:700;margin:0 0 4px;">${(d && d.name) || sc.name}${entry.scope ? html` <span style="font-size:13px;font-weight:600;color:#9a8a6f;">· ${(C.SCOPES[entry.scope] || {}).name || entry.scope}</span>` : ""}</h2>
        <div style="font-size:12.5px;color:#9a8a6f;margin-bottom:14px;">${allPts.length} 个考点 · 已填 ${cv.done}</div>
        ${html`<${Bar} pct=${cv.pct} color="#C8852E" />`}<div style="font-size:11.5px;color:#9a8a6f;margin:6px 0 12px;">已完成 ${cv.pct}%</div>
        ${(function () { var tb = C.courseTextbook(did, entry.scope); return html`<div style="font-size:12px;color:#9a8a6f;margin-bottom:14px;padding:8px 10px;background:#FBF6EC;border-radius:8px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;">📕 课本:${tb ? html`<b style="color:#5a4e3c;">${tb.title}</b>` : html`<span style="color:#bbab8c;">未选</span>`}<span class="lnk" style="color:#B6532F;cursor:pointer;margin-left:auto;" onClick=${function () { setPickTb(true); }}>${tb ? "换" : "选 / 生成"} →</span></div>`; })()}
        ${(entry.topics || []).map(function (t, ti) {
          return html`<div key=${ti}><div style="font-size:11px;font-weight:700;letter-spacing:.1em;color:#bbab8c;text-transform:uppercase;margin:14px 0 8px;">${t.title}</div>
            ${(t.points || []).map(function (p, pi) {
              var kp = p.ref ? C.catalogById(p.ref) : null; var isSel = sel && sel.p === p;
              if (isSel) return html`<div key=${pi} style="display:flex;gap:10px;padding:11px 9px;border-radius:8px;font-size:13.5px;font-weight:600;background:#33291E;color:#F2E8D6;"><span>▸</span> ${p.title}</div>`;
              return html`<div key=${pi} class="pan-row" onClick=${function () { setSel(p.ref || p.title); }} style=${"display:flex;gap:10px;padding:9px 8px;font-size:13px;cursor:pointer;" + (kp ? "" : "color:#7A6E5E;")}>${kp ? html`<span style="color:#6E7A4F;">✓</span>` : html`<span style="color:#d8cbb3;">○</span>`} ${p.title}</div>`;
            })}</div>`;
        })}
      </div>
      <div class="pan-pane pan-scroll main">
        <div style="font-size:12.5px;color:#9a8a6f;margin-bottom:14px;"><span class="lnk" onClick=${function () { app.go("home"); }}>首页</span> › 我的课程 › ${(d && d.name) || sc.name}</div>
        ${center}
      </div>
      <div class="pan-pane pan-scroll res">
        <div class="pan-eyebrow" style="margin-bottom:14px;">本节资料 · Resources</div>
        ${ResRow("📄", "考点速查", "整理中")}${ResRow("🔗", "公开课/视频", "AI 检索")}${ResRow("✎", "随堂练习", "习题测试")}
        <div class="pan-eyebrow" style="margin:24px 0 12px;">我的笔记 · My Notes</div>
        ${noteList.length ? noteList.map(function (n, i) { return html`<div key=${i} style="background:#fff;border:1px solid #F0E6D2;border-radius:12px;padding:14px;margin-bottom:10px;"><div style="font-size:13px;line-height:1.65;color:#3a3023;">${n.body || n.title}</div></div>`; }) : html`<div style="font-size:12.5px;color:#9a8a6f;">还没有笔记。</div>`}
        <textarea class="pan-note-input" placeholder="在这里随手记…(回车保存)" style="margin-top:10px;" onKeyDown=${function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); saveCourseNote(e.target.value); e.target.value = ""; } }}></textarea>
      </div>
      ${pickTb ? html`<div class="pan-modal-mask" onClick=${function (e) { if (e.target.classList.contains("pan-modal-mask")) setPickTb(false); }}>
        <div class="pan-modal">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><h2 style="font-family:var(--serif);margin:0;font-size:19px;">选课本 · ${(d && d.name) || ""}${entry.scope ? " · " + ((C.SCOPES[entry.scope] || {}).name || entry.scope) : ""}</h2><span onClick=${function () { setPickTb(false); }} style="cursor:pointer;color:#9a8a6f;font-size:20px;">×</span></div>
          <p style="font-size:12.5px;color:#8a7a62;margin:0 0 14px;">选一本作为这门课的主用课本(官方 / 权威优先);AI 排课、出题以它为准。</p>
          ${mats == null ? html`<div class="pan-empty">加载中…</div>`
            : !mats.length ? html`<div class="pan-empty" style="padding:24px;">还没有可选课本。<br/><span class="pan-btn grad" style="margin-top:12px;" onClick=${function () { setPickTb(false); C.sendMessage({ kind: "ask", text: "请帮「" + ((d && d.name) || "") + "」选定或生成课本(优先官方 / 权威,注明来源)。", context: { discId: did, scope: entry.scope } }).then(function () { app.go("messages"); }); }}>✉️ 请导师选 / 生成课本</span></div>`
            : html`<div><div style="display:flex;flex-direction:column;gap:10px;max-height:50vh;overflow:auto;">${mats.map(function (m, i) {
                var au = m.authority === "official" ? ["官方", "#3f8a52", "#eef7f0"] : m.authority === "authoritative" ? ["权威参考", "#2c5fb3", "#eaf1fb"] : ["AI生成", "#a86a00", "#FBF4E6"];
                var curtb = C.courseTextbook(did, entry.scope); var on = curtb && curtb.materialId === m.id;
                return html`<div key=${i} class="pan-row bordered" style=${"padding:11px 13px;border-radius:11px;cursor:pointer;" + (on ? "box-shadow:0 0 0 2px #6E7A4F;" : "")} onClick=${function () { C.setCourseTextbook(did, entry.scope, m); setPickTb(false); app.refresh(); }}>
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;"><span class="pan-pill" style=${"color:" + au[1] + ";background:" + au[2] + ";"}>${au[0]}</span>${m.edition ? html`<span style="font-size:11.5px;color:#9a8a6f;">${m.edition}</span>` : null}${on ? html`<span style="font-size:11.5px;color:#6E7A4F;margin-left:auto;">✓ 当前</span>` : null}</div>
                  <div style="font-size:13.5px;font-weight:600;margin-top:4px;">${m.title}</div>
                  ${m.note ? html`<div style="font-size:12px;color:#9a8a6f;margin-top:2px;">${m.note}</div>` : null}</div>`;
              })}</div>
              <div style="margin-top:14px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
                ${C.courseTextbook(did, entry.scope) ? html`<span class="lnk" style="font-size:12px;color:#b09a7a;cursor:pointer;" onClick=${function () { C.setCourseTextbook(did, entry.scope, null); setPickTb(false); app.refresh(); }}>清除选择</span>` : html`<span></span>`}
                <span class="pan-btn ghost sm" onClick=${function () { setPickTb(false); C.sendMessage({ kind: "ask", text: "请帮「" + ((d && d.name) || "") + "」再选 / 生成一版课本(优先官方 / 权威,注明来源)。", context: { discId: did, scope: entry.scope } }).then(function () { app.go("messages"); }); }}>✉️ 让导师选 / 生成另一版</span>
              </div></div>`}
        </div></div>` : null}
    </div>`;
  }
  function ResRow(ic, t, sub) {
    return html`<div class="pan-row bordered" style="display:flex;gap:11px;align-items:center;padding:11px 10px;margin-bottom:8px;"><div style="width:30px;height:30px;border-radius:8px;background:#F4EAD8;display:flex;align-items:center;justify-content:center;font-size:13px;">${ic}</div><div style="flex:1;"><div style="font-size:13px;font-weight:600;">${t}</div><div style="font-size:11px;color:#9a8a6f;">${sub}</div></div></div>`;
  }

  /* =========================================================
   *  QUIZ
   * ========================================================= */
  function qValue(q) { return q.type === "fill" ? 15 : 10; }
  function QuizScreen() {
    var app = useApp();
    var r0 = useState(null); var run = r0[0], setRun = r0[1];
    var qq = useState(""); var quizQ = qq[0], setQuizQ = qq[1];
    var qs = useState(""); var quizSubj = qs[0], setQuizSubj = qs[1];
    var fillRef = useRef(null);
    var sets = (window.QUIZ_BANK || []).filter(function (q) { return (q.profile || q.track) === C.userKey(); });

    function start(setId) { var set = (window.QUIZ_BANK || []).filter(function (q) { return q.id === setId; })[0]; if (!set) return; setRun({ set: set, qIndex: 0, answered: null, correct: 0, earned: 0, wrong: [], fillVal: "", fillOk: false, lastOk: false }); }
    function answerChoice(i) { if (run.answered != null) return; var q = run.set.questions[run.qIndex]; var ok = i === q.answer; settle(q, ok); setRun(Object.assign({}, run, { answered: i, lastOk: ok })); }
    function submitFill() { if (run.answered != null) return; var q = run.set.questions[run.qIndex]; var val = (run.fillVal || "").trim().toLowerCase().replace(/[.。]$/, ""); var ok = (q.answer || []).some(function (a) { return String(a).trim().toLowerCase() === val; }); settle(q, ok); setRun(Object.assign({}, run, { answered: 1, fillOk: ok, lastOk: ok })); }
    function settle(q, ok) { if (ok) { run.correct++; run.earned += qValue(q); C.award(qValue(q), "答对「" + run.set.title + "」第 " + (run.qIndex + 1) + " 题", run.set.id); app.refresh(); } else { run.wrong.push({ set: run.set.id, q: q.q }); } }
    function next() {
      var ni = run.qIndex + 1;
      if (ni >= run.set.questions.length) {
        C.logEvent({ kind: "quiz", subject: run.set.subject, label: run.set.title, correct: run.correct, total: run.set.questions.length });
        if (run.correct === run.set.questions.length) C.award(25, "测验「" + run.set.title + "」全对", run.set.id);
        if (run.wrong.length) { var nt = C.notes(); run.wrong.forEach(function (w) { nt.unshift({ title: "错题:" + w.q.slice(0, 20), body: w.q, subject: "★ 错题本", ts: Date.now() }); }); C.save("notes", nt); }
        app.checkAch();
      }
      setRun(Object.assign({}, run, { qIndex: ni, answered: null, fillVal: "", fillOk: false, lastOk: false }));
    }

    if (!run) {
      var all = sets;
      var subjOrder = [], subjCount = {};
      all.forEach(function (s) { var k = s.subject || "其他"; if (subjCount[k] == null) { subjCount[k] = 0; subjOrder.push(k); } subjCount[k]++; });
      var evs = C.events().filter(function (e) { return e.kind === "quiz"; });
      function statFor(s) { var es = evs.filter(function (e) { return e.label === s.title; }); if (!es.length) return null; var best = 0; es.forEach(function (e) { if (e.total) { var p = Math.round(e.correct / e.total * 100); if (p > best) best = p; } }); return { n: es.length, best: best }; }
      var query = (quizQ || "").trim().toLowerCase();
      function match(s) { return !query || (s.title || "").toLowerCase().indexOf(query) >= 0 || (s.desc || "").toLowerCase().indexOf(query) >= 0; }
      function card(s) {
        var st = statFor(s);
        return html`<div key=${s.id} class="pan-card pan-panel" style="cursor:pointer;position:relative;" onClick=${function () { start(s.id); }}>
          ${st ? html`<span style=${"position:absolute;top:12px;right:14px;font-size:11px;font-weight:700;color:" + (st.best >= 80 ? "#3f8a52" : st.best >= 60 ? "#C8852E" : "#b6532f") + ";"}>${st.best >= 80 ? "✓ " : ""}最好 ${st.best}%</span>` : null}
          <div style="font-family:var(--serif);font-size:16px;font-weight:600;margin-bottom:6px;padding-right:64px;">${s.title}</div>
          <div style="font-size:12.5px;color:#7A6E5E;margin-bottom:10px;min-height:17px;">${s.desc || ""}</div>
          <div style="font-size:12px;color:#9a8a6f;">${s.questions.length} 题 · ${(SUBJECTS[s.subject] || {}).name || s.subject}${st ? " · 做过 " + st.n + " 次" : ""}</div></div>`;
      }
      var grid = function (arr) { return html`<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;">${arr.map(card)}</div>`; };
      var listBody;
      if (query) {
        var hit = all.filter(match);
        listBody = hit.length ? grid(hit) : html`<div class="pan-empty">没找到「${quizQ}」相关的练习。</div>`;
      } else if (quizSubj && subjCount[quizSubj]) {
        listBody = grid(all.filter(function (s) { return (s.subject || "其他") === quizSubj; }));
      } else {
        listBody = html`<div>${subjOrder.map(function (k) {
          var fs = all.filter(function (s) { return (s.subject || "其他") === k; });
          return html`<div key=${k} style="margin-bottom:26px;">
            <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:12px;"><h2 style="font-family:var(--serif);font-size:18px;margin:0;">${(SUBJECTS[k] || {}).name || k}</h2><span style="font-size:12px;color:#9a8a6f;">${fs.length} 套</span></div>
            ${grid(fs.slice(0, 6))}
            ${fs.length > 6 ? html`<div style="margin-top:10px;font-size:13px;color:#B6532F;font-weight:600;cursor:pointer;" onClick=${function () { setQuizSubj(k); }}>查看该科全部 ${fs.length} 套 →</div>` : null}
          </div>`;
        })}</div>`;
      }
      return html`<div class="pan-screen">${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "习题测试" }]} />`}
        <h1 class="pan-page-h">习题测试 <span class="en">/ Quiz</span></h1>
        <p class="pan-page-sub">选一套练习。即时判分、解析,答对按知识点价值得积分,错题自动进错题本。</p>
        <div class="pan-card" onClick=${function () { app.go("vocab"); }} style="background:linear-gradient(135deg,#C8852E,#B6532F);color:#fff;border-radius:18px;padding:22px 24px;cursor:pointer;margin-bottom:22px;display:flex;align-items:center;gap:18px;">
          <div style="font-size:34px;">📒</div>
          <div style="flex:1;"><div style="font-family:var(--serif);font-size:19px;font-weight:700;">单词专项训练</div><div style="font-size:13px;opacity:.92;margin-top:3px;">日语 JLPT · 英语 TOEFL · 我的单词本 —— 记忆曲线 + 单词卡 + 三关闯过才算掌握,答对得积分</div></div>
          <div style="font-weight:700;white-space:nowrap;">进入 →</div></div>
        <div class="pan-row bordered" onClick=${function () { app.go("wrongbook"); }} style="display:flex;align-items:center;gap:14px;padding:14px 18px;border-radius:14px;cursor:pointer;margin-bottom:22px;">
          <div style="font-size:24px;">📕</div>
          <div style="flex:1;"><div style="font-weight:700;font-size:15px;">错题本</div><div style="font-size:12.5px;color:#9a8a6f;">做错的题自动收进来,可一键重做;做对就移出</div></div>
          <div style="color:#B6532F;font-weight:600;white-space:nowrap;">打开 →</div></div>
        ${all.length ? html`<div>
          <input value=${quizQ} onInput=${function (e) { setQuizQ(e.target.value); }} placeholder="🔍 搜练习标题、描述…" style="width:100%;border:1px solid #EBDEC8;border-radius:10px;padding:10px 13px;font-family:var(--sans);font-size:13.5px;margin-bottom:14px;outline:none;background:#FFFDF8;" />
          ${!query ? html`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px;">
            <span class=${"pan-tag" + (quizSubj ? "" : " on")} onClick=${function () { setQuizSubj(""); }}>全部 ${all.length}</span>
            ${subjOrder.map(function (k) { return html`<span key=${k} class=${"pan-tag" + (quizSubj === k ? " on" : "")} onClick=${function () { setQuizSubj(k); }}>${(SUBJECTS[k] || {}).name || k} ${subjCount[k]}</span>`; })}
          </div>` : null}
          ${listBody}
        </div>` : html`<div class="pan-empty">这个学习者还没有题库。<br/>做完讲解后,对 AI 导师说"出一套随堂练习",我来生成。</div>`}
      </div>`;
    }

    var set = run.set, q = set.questions[run.qIndex], pct = Math.round(run.qIndex / set.questions.length * 100), sc = SUBJECTS[set.subject] || { name: set.subject };
    var body;
    if (run.qIndex >= set.questions.length) {
      var acc = Math.round(run.correct / set.questions.length * 100);
      body = html`<div class="pan-panel" style="text-align:center;padding:40px;"><div style="font-size:40px;margin-bottom:10px;">${acc >= 80 ? "🎉" : acc >= 60 ? "👍" : "💪"}</div>
        <h1 style="font-family:var(--serif);font-size:26px;margin:0 0 6px;">${run.correct} / ${set.questions.length} 正确</h1>
        <div style="color:#9a8a6f;margin-bottom:6px;">正确率 ${acc}% · 获得 ⬡ ${run.earned} 积分</div>
        <div style="color:#9a8a6f;font-size:13px;margin-bottom:22px;">${run.wrong.length ? "错题已加入错题本 " + run.wrong.length + " 题" : "全部答对,完美!"}</div>
        <div style="display:flex;gap:10px;justify-content:center;"><span class="pan-btn ink" onClick=${function () { setRun(null); }}>再来一套</span><span class="pan-btn ghost" onClick=${function () { app.go("home"); }}>回首页</span></div></div>`;
    } else {
      var optsEl;
      if (q.type === "choice") {
        optsEl = q.options.map(function (o, i) {
          var cls = "pan-opt", mark = "", markColor = "#6E7A4F";
          if (run.answered != null) { if (i === q.answer) { cls += " right"; mark = "✓"; } else if (i === run.answered) { cls += " wrong"; mark = "✕"; markColor = "#B6532F"; } }
          return html`<div key=${i} class=${cls} onClick=${run.answered == null ? function () { answerChoice(i); } : null}><div class="k">${String.fromCharCode(65 + i)}</div><div class="tx">${o}</div><div style=${"font-size:18px;color:" + markColor + ";"}>${mark}</div></div>`;
        });
      } else {
        var fb = run.answered != null;
        optsEl = html`<div><div style="display:flex;gap:10px;"><input ref=${fillRef} disabled=${fb} value=${run.fillVal} onInput=${function (e) { setRun(Object.assign({}, run, { fillVal: e.target.value })); }} onKeyDown=${function (e) { if (e.key === "Enter") submitFill(); }} placeholder="输入答案…" style=${"flex:1;border:1.5px solid " + (fb ? (run.fillOk ? "#6E7A4F" : "#B6532F") : "#EBDEC8") + ";border-radius:12px;padding:13px 16px;font-size:16px;outline:none;background:" + (fb ? (run.fillOk ? "#F2F4E8" : "#FAE9E2") : "#FFFDF8") + ";"} />${fb ? null : html`<span class="pan-btn ink" onClick=${submitFill}>提交</span>`}</div>${fb && !run.fillOk ? html`<div style="margin-top:10px;font-size:14px;color:#B6532F;">正确答案:<b>${(q.answer || []).join(" / ")}</b></div>` : null}</div>`;
      }
      body = html`<div class="pan-panel" style="padding:34px 36px;">
        <div style="display:flex;gap:10px;margin-bottom:18px;align-items:center;">${html`<${Pill} text=${sc.name} color=${subjColor(set.subject)} />`}${html`<${Pill} text=${q.type === "fill" ? "填空题" : "单选题"} color="#6E7A4F" />`}<span class="pan-pill" style="color:#C8852E;background:#FBF4E6;font-weight:700;margin-left:auto;">本题价值 ⬡ ${qValue(q)}</span></div>
        <h1 style="font-family:var(--serif);font-size:24px;font-weight:600;line-height:1.45;margin:0 0 26px;">${q.q}</h1>
        <div style="display:flex;flex-direction:column;gap:13px;">${optsEl}</div>
        ${run.answered != null && q.explain ? html`<div style="background:#FBF4E6;border-radius:14px;padding:20px 22px;margin-top:24px;"><div style="font-size:13px;font-weight:700;color:#6E7A4F;margin-bottom:8px;">${run.lastOk ? "✓ 答对了" : "✗ 解析"}</div><div style="font-size:14.5px;line-height:1.7;color:#3a3023;">${q.explain}</div></div>` : null}
        ${run.answered != null ? html`<div style="display:flex;justify-content:flex-end;margin-top:24px;"><span class="pan-btn ink" onClick=${next}>${run.qIndex + 1 >= set.questions.length ? "查看结果 →" : "下一题 →"}</span></div>` : null}
      </div>`;
    }
    return html`<div class="pan-screen narrow"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
      <div class="pan-crumb" style="margin:0;"><span class="lnk" onClick=${function () { app.go("home"); }}>首页</span> › ${set.title}</div>
      <div style="font-size:13px;color:#9a8a6f;">第 <b style="color:#33291E;">${Math.min(run.qIndex + 1, set.questions.length)}</b> / ${set.questions.length} 题</div></div>
      <div class="pan-bar" style="height:7px;margin-bottom:26px;"><i style=${"width:" + pct + "%;background:#C8852E;"}></i></div>${body}</div>`;
  }

  /* =========================================================
   *  NOTES
   * ========================================================= */
  function NotesScreen() {
    var app = useApp();
    var nt = C.notes();
    function newNote() { var ti = window.prompt("卡片标题:"); if (!ti) return; var bo = window.prompt("内容(可空):") || ""; var list = C.notes(); list.unshift({ title: ti, body: bo, subject: "我的笔记", ts: Date.now() }); C.save("notes", list); app.checkAch(); }
    return html`<div class="pan-screen"><div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:8px;">
      <div>${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "笔记 · 收藏" }]} />`}
      <h1 class="pan-page-h" style="margin:0;">知识卡片库 <span class="en">/ My Cards</span></h1></div>
      <span class="pan-btn ink" onClick=${newNote}>＋ 新建卡片</span></div>
      <div style="margin:22px 0 24px;font-size:13px;color:#9a8a6f;">共 ${nt.length} 张</div>
      ${nt.length ? html`<div style="columns:4;column-gap:16px;">
        ${nt.map(function (n, i) {
          var dark = i % 5 === 1, col = n.color || subjColor(n.subjectKey);
          return html`<div key=${i} class="pan-card" style=${"break-inside:avoid;margin-bottom:16px;border-radius:16px;padding:20px;" + (dark ? "background:#33291E;color:#F2E8D6;" : "background:#fff;border:1px solid #F0E6D2;")}>
            <div style=${"font-size:11px;color:" + (dark ? "#C8852E" : col) + ";font-weight:600;margin-bottom:9px;"}>${n.subject || "笔记"}</div>
            <div style="font-family:var(--serif);font-size:16px;font-weight:600;margin-bottom:9px;">${n.title}</div>
            ${n.body ? html`<div style=${"font-size:13px;line-height:1.6;color:" + (dark ? "#cbbd9f" : "#6b5d49") + ";"}>${n.body}</div>` : null}
            <div style="font-size:11px;color:#9a8a6f;margin-top:12px;">${relTime(n.ts)}</div></div>`;
        })}
      </div>` : html`<div class="pan-empty">还没有知识卡片。<br/>做题、学习时收藏,或点右上「新建卡片」。</div>`}
    </div>`;
  }

  /* =========================================================
   *  WISHLIST
   * ========================================================= */
  function WishlistScreen() {
    var app = useApp();
    var inputRef = useRef(null);
    var wl = C.wishlist();
    var pending = wl.filter(function (w) { return w.status !== "ready"; });
    var ready = wl.filter(function (w) { return w.status === "ready"; });
    function add(topic) {
      topic = (topic || "").trim(); if (!topic) return;
      var list = C.wishlist().slice(); var id = Date.now();
      list.unshift({ id: id, title: topic, subject: "AI 将归类", subjectColor: "#bbab8c", status: "pending", info: "" });
      C.save("wishlist", list); app.checkAch();
      // 真备课由服务器上的 CLI agent 完成:它读 DB 里 status=pending 的项,
      // 检索/生成内容并把状态改成 cooking→ready(见 Phase3)。前端只负责入列。
    }
    function card(w, isReady) {
      var sty = w.status === "ready" ? { l: "✓ 已就绪", c: "#5b6b3e", bg: "#EFF1E0", card: "background:#fff;border:1px solid #F0E6D2;cursor:pointer;" }
        : w.status === "cooking" ? { l: "◐ AI 备课中", c: "#9a6a1e", bg: "#F8EAD2", card: "background:#fff;border:1px solid #ECD9B4;" }
        : { l: "○ 未备课", c: "#9a8a6f", bg: "#F1E7D4", card: "background:#FBF6EC;border:1.5px dashed #D8C9A8;" };
      var meta = w.status === "ready" ? (w.info || "可学习") + " · 去学习 →" : w.status === "cooking" ? "AI 备课中 · " + (w.info || "生成中…") : "排队中 · 待 AI 备课";
      return html`<div key=${w.id} class=${isReady ? "pan-card" : ""} onClick=${isReady ? function () { app.go("course"); } : null} style=${"border-radius:16px;padding:20px 22px;" + sty.card}>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;"><span style=${"font-size:11.5px;font-weight:600;color:" + (w.subjectColor || "#bbab8c") + ";"}>${w.subject || "AI 将归类"}</span>
        <span style=${"font-size:11px;font-weight:600;color:" + sty.c + ";background:" + sty.bg + ";padding:4px 11px;border-radius:999px;"}>${sty.l}</span></div>
        <div style="font-family:var(--serif);font-size:16.5px;font-weight:600;line-height:1.35;margin-bottom:11px;">${w.title}</div>
        <div style=${"font-size:12.5px;color:" + (w.status === "ready" ? "#B6532F;font-weight:600" : "#9a8a6f") + ";"}>${meta}</div>
        ${w.status === "cooking" ? html`<div class="pan-bar" style="margin-top:13px;height:5px;"><i style="width:58%;background:linear-gradient(90deg,#C8852E,#B6532F);"></i></div>` : null}</div>`;
    }
    return html`<div class="pan-screen">${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "愿望清单" }]} />`}
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:6px;"><h1 class="pan-page-h" style="margin:0;">愿望清单 <span class="en">/ Wishlist</span></h1>
      <div style="font-size:12.5px;color:#9a8a6f;">共 ${wl.length} 项 · 已就绪 ${ready.length}</div></div>
      <p class="pan-page-sub">把想学的加进来。还没备好的标「未备课」—— 后台 AI 导师会检索资料、生成内容并推送,到时变「已就绪」即可开学。</p>
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:14px;"><div style="flex:1;display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #EBDEC8;border-radius:13px;padding:13px 18px;"><span style="color:#C8852E;font-size:17px;">＋</span>
      <input ref=${inputRef} placeholder="想学什么?加一个课程或知识点…(回车)" onKeyDown=${function (e) { if (e.key === "Enter") { add(e.target.value); e.target.value = ""; } }} style="flex:1;border:0;background:transparent;outline:none;font-family:var(--sans);font-size:14.5px;color:#33291E;" /></div>
      <span class="pan-btn ink" onClick=${function () { if (inputRef.current) { add(inputRef.current.value); inputRef.current.value = ""; } }}>加入清单</span></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:32px;"><span style="font-size:12px;color:#9a8a6f;">常被加入 ——</span>
      ${["量子力学入门", "宏观经济学", "拜占庭帝国史", "钢琴乐理"].map(function (t) { return html`<span key=${t} class="pan-btn ghost pill sm" onClick=${function () { add(t); }}>${t}</span>`; })}</div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;"><h2 style="font-family:var(--serif);font-size:19px;font-weight:700;margin:0;">待备课 · 未生成</h2><span style="font-size:12px;color:#9a8a6f;background:#F1E7D4;padding:3px 11px;border-radius:999px;">${pending.length}</span><span style="font-size:12.5px;color:#9a8a6f;margin-left:auto;">✦ AI 导师将自动备课并推送</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:36px;">${pending.length ? pending.map(function (w) { return card(w, false); }) : html`<div class="pan-empty" style="grid-column:1/-1;">没有待备课的项目。</div>`}</div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;"><h2 style="font-family:var(--serif);font-size:19px;font-weight:700;margin:0;">已就绪 · 可学习</h2><span style="font-size:12px;color:#5b6b3e;background:#EFF1E0;padding:3px 11px;border-radius:999px;">${ready.length}</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">${ready.length ? ready.map(function (w) { return card(w, true); }) : html`<div class="pan-empty" style="grid-column:1/-1;">还没有就绪的课程。</div>`}</div>
    </div>`;
  }

  /* =========================================================
   *  POINTS
   * ========================================================= */
  function PointsScreen() {
    var app = useApp();
    var p = C.points(), bal = p.balance || 0, ledger = p.ledger || [];
    var weekEarn = ledger.filter(function (l) { return l.delta > 0 && Date.now() - l.ts < 7 * 864e5; }).reduce(function (a, l) { return a + l.delta; }, 0);
    var lv = C.levelOf(bal);
    var mastered = Object.keys(C.progress()).length;
    var achs = C.evalAchievements();
    var unlockedN = achs.filter(function (a) { return a.unlocked; }).length;
    return html`<div class="pan-screen">${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "积分中心" }]} />`}
      <h1 class="pan-page-h">积分 · 等级 · 成就 <span class="en">/ Points & Achievements</span></h1>
      <p class="pan-page-sub">学习以<strong>掌握了哪些知识</strong>计:掌握一个知识点、答对题目,就按其<strong>价值</strong>(越难、越深、越少人掌握越高)生成积分 <span style="color:#C8852E;">⬡</span>,累积升级、解锁成就。</p>
      <div style="display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:16px;margin-bottom:24px;">
        <div style="background:linear-gradient(135deg,#33291E,#54422F);color:#F2E8D6;border-radius:20px;padding:24px 28px;display:flex;align-items:center;gap:22px;"><div style="font-size:46px;">⬡</div>
        <div><div style="font-size:12px;letter-spacing:.14em;color:#C8852E;margin-bottom:6px;">我的总积分 · BALANCE</div><div style="font-size:38px;font-weight:700;line-height:1;">${bal.toLocaleString()}</div><div style="font-size:12.5px;color:#b3a283;margin-top:6px;">本周 <span style="color:#9fb07a;">+${weekEarn}</span></div></div></div>
        <div class="pan-panel"><div style="font-size:12px;color:#9a8a6f;margin-bottom:10px;">学者等级 · LEVEL</div>
        <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:12px;"><span style="font-size:26px;font-weight:700;">Lv.${lv.lvl}</span><span style="font-family:var(--serif);font-size:17px;font-weight:600;color:#B6532F;">${lv.name}</span></div>
        <div class="pan-bar" style="height:7px;"><i style=${"width:" + lv.pct + "%;background:linear-gradient(90deg,#C8852E,#B6532F);"}></i></div>
        <div style="font-size:11.5px;color:#9a8a6f;margin-top:7px;">${lv.next ? "距 Lv." + (lv.lvl + 1) + " " + lv.next.name + " 还差 " + lv.need + " 积分" : "已达最高等级 🎉"}</div></div>
        <div class="pan-panel"><div style="font-size:12px;color:#9a8a6f;margin-bottom:10px;">已掌握知识点</div><div style="font-size:26px;font-weight:700;margin-bottom:8px;">${mastered} <span style="font-size:13px;font-weight:500;color:#9a8a6f;">个</span></div><div style="font-size:11.5px;color:#9a8a6f;">成就 ${unlockedN}/${achs.length} 已解锁</div></div>
      </div>

      <div class="pan-panel" style="margin-bottom:22px;"><div class="pan-sec-h"><h2>🏅 成就墙 <span style="font-weight:400;color:#9a8a6f;font-size:13px;">${unlockedN}/${achs.length}</span></h2><span style="font-size:12.5px;color:#9a8a6f;">掌握知识、坚持学习即可点亮</span></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px;">${achs.map(function (a) { return AchBadge(a); })}</div></div>

      <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:22px;">
        <div style="display:flex;flex-direction:column;gap:22px;">
          <div class="pan-panel"><h2 style="font-family:var(--serif);font-size:20px;font-weight:700;margin:0 0 4px;">积分如何产生</h2><p style="font-size:13px;color:#9a8a6f;margin:0 0 20px;">按掌握的知识计,不按学习时长</p>
          <div style="background:#FBF4E6;border-radius:14px;padding:20px 22px;margin-bottom:20px;text-align:center;"><div style="font-size:17px;font-weight:600;margin-bottom:10px;">积分 <span style="color:#C8852E;">＝</span> 知识点价值 <span style="color:#C8852E;">×</span> 掌握度</div><div style="font-size:14px;color:#7A6E5E;">知识点价值 <span style="color:#C8852E;">＝</span> 难度 <span style="color:#C8852E;">×</span> 深度 <span style="color:#C8852E;">×</span> 稀缺度</div></div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">${ValBox("📈", "难度", "入门 ×1 / 进阶 ×2.5 / 精通 ×5")}${ValBox("🌳", "深度", "体系树越深 ×1.0–2.0")}${ValBox("💎", "稀缺度", "掌握人数越少 ×1.0–3.0")}</div></div>
          <div class="pan-panel"><h2 style="font-family:var(--serif);font-size:18px;font-weight:700;margin:0 0 16px;">最近积分明细</h2>
          ${ledger.length ? ledger.slice(0, 8).map(function (l, i) { return html`<div key=${i} style="display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid #F4ECDC;"><div style=${"width:30px;height:30px;border-radius:8px;background:" + (l.delta >= 0 ? "#EFF1E0" : "#FAE9E2") + ";display:flex;align-items:center;justify-content:center;font-size:13px;"}>${l.delta >= 0 ? "✓" : "▸"}</div><div style="flex:1;"><div style="font-size:13.5px;font-weight:600;">${l.reason}</div><div style="font-size:11px;color:#9a8a6f;">${relTime(l.ts)}</div></div><span style="font-size:13.5px;font-weight:700;color:#6E7A4F;">${l.delta >= 0 ? "+" : ""}${l.delta}</span></div>`; }) : html`<div style="font-size:13px;color:#9a8a6f;padding:8px 2px;">掌握知识点、做对题会在这里生成积分明细。</div>`}</div>
        </div>
        <div class="pan-ink-panel"><div class="pan-kicker">学者之路 · ACADEMIC PATH</div>
          ${C.LEVELS.map(function (L, i) {
            var reached = bal >= L.min, isCur = (i + 1) === lv.lvl;
            return html`<div key=${i} style=${"display:flex;gap:12px;align-items:center;padding:11px 0;" + (i < C.LEVELS.length - 1 ? "border-bottom:1px solid #4a3b2c;" : "")}>
              <div style=${"width:30px;height:30px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;" + (isCur ? "background:#C8852E;color:#2a2114;" : reached ? "background:#6E7A4F;color:#fff;" : "background:#544535;color:#b3a283;")}>${reached && !isCur ? "✓" : (i + 1)}</div>
              <div style="flex:1;"><div style=${"font-size:13.5px;font-weight:600;" + (reached ? "" : "color:#cbbd9f;")}>Lv.${i + 1} · ${L.name}</div><div style="font-size:11px;color:#9a8783;">${L.perk}</div></div>
              <div style=${"font-size:11px;" + (isCur ? "color:#E8B06A;" : "color:#9a8783;")}>${isCur ? "当前" : (L.min + "⬡")}</div></div>`;
          })}
        </div>
      </div>
    </div>`;
  }
  function AchBadge(a) {
    var tier = { bronze: "#9c7a3d", silver: "#7d8a93", gold: "#C8852E" }[a.tier] || "#9c7a3d";
    return html`<div class=${"pan-ach " + (a.unlocked ? "on" : "off")} style=${a.unlocked ? "border-color:" + tier + ";" : ""}>
      <div class="ico" style=${a.unlocked ? "background:" + tier + "22;" : ""}>${a.icon}</div>
      <div style="flex:1;min-width:0;"><div style="font-size:14px;font-weight:700;">${a.name}${a.unlocked ? html` <span style="color:#6E7A4F;">✓</span>` : ""}</div>
      <div style="font-size:11.5px;color:#9a8a6f;margin:2px 0 6px;">${a.desc}</div>
      ${a.unlocked
        ? html`<div style="font-size:11px;color:${tier};font-weight:600;">已解锁${a.pts ? " · +" + a.pts + " ⬡" : ""}</div>`
        : html`<div style="display:flex;align-items:center;gap:7px;"><div class="pan-bar" style="flex:1;height:5px;"><i style=${"width:" + Math.round(a.cur / a.target * 100) + "%;background:#C8852E;"}></i></div><span style="font-size:10.5px;color:#9a8a6f;white-space:nowrap;">${a.cur}/${a.target}</span></div>`}
      </div></div>`;
  }
  function ValBox(ic, t, d) { return html`<div style="border:1px solid #F0E6D2;border-radius:13px;padding:15px;"><div style="width:32px;height:32px;border-radius:9px;background:#F4EAD8;display:flex;align-items:center;justify-content:center;margin-bottom:11px;">${ic}</div><div style="font-size:14px;font-weight:600;margin-bottom:4px;">${t}</div><div style="font-size:11.5px;color:#9a8a6f;line-height:1.6;">${d}</div></div>`; }
  function Reward(ic, t, d) { return html`<div class="pan-card" style="background:#fff;border:1px solid #F0E6D2;border-radius:16px;padding:20px;cursor:pointer;"><div style="font-size:26px;margin-bottom:12px;">${ic}</div><div style="font-family:var(--serif);font-size:15.5px;font-weight:600;margin-bottom:6px;">${t}</div><div style="font-size:12.5px;color:#9a8a6f;line-height:1.6;">${d}</div></div>`; }

  /* =========================================================
   *  ANALYTICS · 数据分析中心(多维汇总,平等视角)
   * ========================================================= */
  function BarRow(label, pct, color, right) {
    return html`<div style="margin-bottom:11px;"><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;"><span>${label}</span><span style="color:#9a8a6f;">${right != null ? right : pct + "%"}</span></div>${html`<${Bar} pct=${Math.max(2, pct)} color=${color || "#C8852E"} />`}</div>`;
  }
  function AnalyticsScreen() {
    var app = useApp();
    var ov0 = useState(null); var overview = ov0[0], setOv = ov0[1];
    useEffect(function () { var live = true; C.fetchOverview().then(function (o) { if (live) setOv(o); }); return function () { live = false; }; }, []);
    var u = C.user(), st = C.stats(), pts = C.points(), bal = pts.balance || 0, lv = C.levelOf(bal);
    var achs = C.evalAchievements(), unlocked = achs.filter(function (a) { return a.unlocked; }).length;
    var cp = C.categoryProgress(), mbs = C.masteryBySubject(), abs = C.accuracyBySubject();
    var psrc = C.pointsBySource(), psrcTotal = Object.keys(psrc).reduce(function (a, k) { return a + psrc[k]; }, 0);
    var ek = C.eventsByKind(), heat = C.heatmap(), sp = C.planProgress();
    var wrong = C.notes().filter(function (n) { return n.subject && n.subject.indexOf("错题") >= 0; }).length;
    var maxM = Math.max.apply(null, mbs.map(function (x) { return x.count; }).concat([1]));
    var srcColor = { "知识点": "#6E7A4F", "习题": "#C8852E", "成就": "#B6532F", "里程碑": "#9c7a3d", "其他": "#bbab8c" };

    function statCard6(lbl, num, unit, sub, grad, col) { return StatCard(lbl, num, unit, sub, grad, col); }

    return html`<div class="pan-screen">
      ${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "数据中心" }]} />`}
      <h1 class="pan-page-h">数据分析中心 <span class="en">/ Analytics</span></h1>
      <p class="pan-page-sub">把学习<strong>效果</strong>多维度汇总:掌握了哪些、各科表现、积分来源、活跃度、计划进度。当前看的是「${u.name}」,下方可切到任意学习者。</p>

      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:22px;">
        ${statCard6("掌握知识点", st.enrolled != null ? Object.keys(C.progress()).length : 0, "", "效果核心", true)}
        ${statCard6("总积分", bal.toLocaleString(), "", "Lv." + lv.lvl + " " + lv.name)}
        ${statCard6("习题正确率", st.accuracy == null ? "—" : st.accuracy, st.accuracy == null ? "" : "%", st.answered ? "近 " + st.answered + " 题" : "去测验", false, "#6E7A4F")}
        ${statCard6("连续学习", st.streak, "天", "活跃 " + st.activeDays + " 天")}
        ${statCard6("成就", unlocked, "", "共 " + achs.length + " 枚")}
        ${statCard6("学习计划", sp.total ? sp.pct : 0, "%", sp.total ? "完成 " + sp.done + "/" + sp.total : "未制定", false, "#B6532F")}
      </div>

      <div class="pan-panel" style="margin-bottom:22px;"><div class="pan-sec-h"><h2>👥 全部学习者总览</h2><span style="font-size:12.5px;color:#9a8a6f;">点击切换 · 大家平等</span></div>
      ${overview === null ? html`<div style="font-size:13px;color:#9a8a6f;padding:6px 2px;">加载中…</div>`
        : html`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;">
          ${overview.map(function (o) {
            var olv = C.levelOf(o.points || 0), cur = o.key === C.userKey();
            return html`<div key=${o.key} class="pan-card" onClick=${function () { app.switchUser(o.key); }} style=${"border-radius:14px;padding:16px;cursor:pointer;border:1px solid " + (cur ? o.color : "#F0E6D2") + ";background:" + (cur ? "#FFFDF8" : "#fff") + ";"}>
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;"><div style=${"width:38px;height:38px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;background:linear-gradient(135deg," + (o.color || "#C8852E") + ",#B6532F);"}>${o.icon || o.name[0]}</div>
              <div style="min-width:0;"><div style="font-weight:700;font-size:14.5px;">${o.name}${cur ? " ·当前" : ""}</div><div style="font-size:11px;color:#9a8a6f;">Lv.${olv.lvl} ${olv.name}</div></div></div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 10px;font-size:12px;">
                <div><b style="font-size:15px;">${(o.points || 0).toLocaleString()}</b><div style="color:#9a8a6f;">积分</div></div>
                <div><b style="font-size:15px;">${o.mastered || 0}</b><div style="color:#9a8a6f;">掌握</div></div>
                <div><b style="font-size:15px;">${o.streak || 0}</b><div style="color:#9a8a6f;">连续天</div></div>
                <div><b style="font-size:15px;">${o.accuracy == null ? "—" : o.accuracy + "%"}</b><div style="color:#9a8a6f;">正确率</div></div>
              </div>
              ${o.hasPlan ? html`<div style="margin-top:10px;">${html`<${Bar} pct=${Math.max(2, o.planPct || 0)} color=${o.color} />`}<div style="font-size:11px;color:#9a8a6f;margin-top:4px;">计划完成 ${o.planPct || 0}%</div></div>` : html`<div style="margin-top:10px;font-size:11.5px;color:#bbab8c;">暂无学习计划</div>`}
            </div>`;
          })}
        </div>`}
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-bottom:22px;">
        <div class="pan-panel"><h2 style="font-family:var(--serif);font-size:18px;font-weight:700;margin:0 0 16px;">各门类进度</h2>
          ${cp.length ? cp.map(function (c, i) { return html`<div key=${i}>${BarRow(c.name, c.pct, c.color)}</div>`; }) : html`<div style="font-size:13px;color:#9a8a6f;">学起来后显示各门类覆盖进度。</div>`}</div>
        <div class="pan-panel"><h2 style="font-family:var(--serif);font-size:18px;font-weight:700;margin:0 0 16px;">各科掌握分布</h2>
          ${mbs.length ? mbs.map(function (m, i) { return html`<div key=${i}>${BarRow(m.subject, Math.round(m.count / maxM * 100), "#6E7A4F", m.count + " 个")}</div>`; }) : html`<div style="font-size:13px;color:#9a8a6f;">在课程页点「标记掌握」后,这里按科目统计。</div>`}</div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-bottom:22px;">
        <div class="pan-panel"><div class="pan-sec-h"><h2>习题表现</h2><span style="font-size:12.5px;color:#9a8a6f;">错题本 ${wrong} 题</span></div>
          ${abs.length ? abs.map(function (a, i) { return html`<div key=${i}>${BarRow(a.subject, a.pct, a.pct >= 80 ? "#6E7A4F" : a.pct >= 60 ? "#C8852E" : "#B6532F", a.pct + "% · " + a.total + "题")}</div>`; }) : html`<div style="font-size:13px;color:#9a8a6f;">做几套习题测试,这里按科目看正确率。</div>`}</div>
        <div class="pan-panel"><h2 style="font-family:var(--serif);font-size:18px;font-weight:700;margin:0 0 16px;">积分来源构成</h2>
          ${psrcTotal ? Object.keys(psrc).filter(function (k) { return psrc[k] > 0; }).map(function (k, i) { return html`<div key=${i}>${BarRow(k, Math.round(psrc[k] / psrcTotal * 100), srcColor[k], psrc[k] + " ⬡")}</div>`; }) : html`<div style="font-size:13px;color:#9a8a6f;">掌握知识点、做题、解锁成就都会累积积分,这里看来源占比。</div>`}</div>
      </div>

      <div class="pan-panel"><div class="pan-sec-h"><h2>学习活跃度</h2><span style="font-size:12.5px;color:#9a8a6f;">近 26 周 · 掌握 ${ek.master || 0} · 测验 ${ek.quiz || 0}</span></div>
        <div style="display:grid;grid-template-columns:repeat(26,1fr);gap:4px;">${heat.map(function (c, i) { return html`<div key=${i} class="pan-cell" title=${c.day + (c.n ? " · " + c.n + " 次" : "")} style=${"aspect-ratio:1;border-radius:3px;background:" + c.color + ";"}></div>`; })}</div>
        <div style="display:flex;align-items:center;justify-content:flex-end;gap:7px;margin-top:12px;font-size:11.5px;color:#9a8a6f;">少 <span style="width:12px;height:12px;border-radius:3px;background:#F1E7D4;"></span><span style="width:12px;height:12px;border-radius:3px;background:#E7C99B;"></span><span style="width:12px;height:12px;border-radius:3px;background:#D29A4E;"></span><span style="width:12px;height:12px;border-radius:3px;background:#B6532F;"></span> 多</div></div>
    </div>`;
  }

  /* =========================================================
   *  USERS · 用户管理(自定义信息 + 头像)
   * ========================================================= */
  var AVATAR_EMOJI = ["🧑‍🎓", "👩‍🎓", "👨‍🎓", "🧒", "👦", "👧", "🧑", "👩", "👨", "👵", "👴", "🧑‍💻", "🧑‍🔬", "🧑‍🏫", "🧑‍🚀", "🦊", "🐱", "🐰", "🐼", "🦉", "🐯", "🐨", "🐸", "🦁", "🐵", "🐶", "🌟", "🚀", "🎯", "📚", "🎨", "⚽"];
  var AVATAR_COLOR = ["#B6532F", "#C8852E", "#6E7A4F", "#3b6fe0", "#8e44ad", "#16a085", "#e2524a", "#e67e22", "#27ae60", "#6b4fd8", "#0e7490", "#c0392b"];
  function Avatar(p) {
    var size = p.size || 44;
    var ic = p.icon || C.initials(p.name);
    var isText = /^[A-Za-z]{1,3}$/.test(ic);
    var fs = isText ? Math.round(size * 0.4) : Math.round(size * 0.5);
    return html`<div style=${"width:" + size + "px;height:" + size + "px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-weight:700;text-transform:uppercase;letter-spacing:" + (isText ? ".5px" : "0") + ";font-size:" + fs + "px;background:linear-gradient(135deg," + (p.color || "#C8852E") + ",#B6532F);color:#fff;box-shadow:inset 0 -2px 6px rgba(0,0,0,.12);"}>${ic}</div>`;
  }
  function UsersScreen() {
    var app = useApp();
    var ed0 = useState(null); var edit = ed0[0], setEdit = ed0[1];
    var bz0 = useState(false); var busy = bz0[0], setBusy = bz0[1];
    var cur = C.userKey(), us = C.users();
    function openNew() { setEdit({ name: "", icon: "", color: AVATAR_COLOR[us.length % AVATAR_COLOR.length], blurb: "" }); }
    function openEdit(u) { setEdit({ key: u.key, name: u.name, icon: u.icon || "🧑", color: u.color || "#C8852E", blurb: u.blurb || "" }); }
    function set(k, v) { setEdit(function (e) { var o = Object.assign({}, e); o[k] = v; return o; }); }
    function save() {
      if (!edit.name.trim()) { window.alert("请填名字"); return; }
      setBusy(true);
      C.saveUser({ key: edit.key, name: edit.name.trim(), icon: edit.icon || C.initials(edit.name), color: edit.color, blurb: edit.blurb.trim() }).then(function (r) {
        setBusy(false);
        if (r && r.ok) { var wasNew = !edit.key; setEdit(null); if (wasNew && r.key) app.switchUser(r.key); else app.refresh(); }
        else window.alert("保存失败");
      });
    }
    function del(u) {
      if (!window.confirm("删除「" + u.name + "」?其学习数据(进度/积分/计划等)也会一并删除,不可恢复。")) return;
      C.deleteUser(u.key).then(function (r) {
        if (r && r.ok) { if (u.key === cur) { var other = C.users().filter(function (x) { return x.key !== u.key; })[0]; other ? app.switchUser(other.key) : app.refresh(); } else app.refresh(); }
        else window.alert((r && r.error) || "删除失败");
      });
    }
    return html`<div class="pan-screen">
      ${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "用户管理" }]} />`}
      <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:16px;">
        <div><h1 class="pan-page-h" style="margin:0 0 4px;">用户管理 <span class="en">/ Profiles</span></h1>
        <div style="font-size:13px;color:#9a8a6f;">改名字、头像、一句话简介;新增 / 删除学习者。部署后把示例账号改成你自己的。</div></div>
        <span class="pan-btn ink" onClick=${openNew}>＋ 新建用户</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">
        ${us.map(function (u) {
          return html`<div key=${u.key} class="pan-panel" style="display:flex;flex-direction:column;gap:12px;">
            <div style="display:flex;align-items:center;gap:12px;">
              ${html`<${Avatar} icon=${u.icon} color=${u.color} name=${u.name} size=${52} />`}
              <div style="min-width:0;flex:1;"><div style="font-family:var(--serif);font-size:17px;font-weight:700;">${u.name}${u.key === cur ? html` <span style="font-size:11px;color:#6E7A4F;font-weight:600;">· 当前</span>` : ""}</div>
              <div style="font-size:12px;color:#9a8a6f;">${u.blurb || ""}</div></div></div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              ${u.key === cur ? null : html`<span class="pan-btn ghost sm" onClick=${function () { app.switchUser(u.key); }}>切到 TA</span>`}
              <span class="pan-btn ghost sm" onClick=${function () { openEdit(u); }}>编辑</span>
              ${us.length > 1 ? html`<span class="pan-btn ghost sm" style="color:#B6532F;" onClick=${function () { del(u); }}>删除</span>` : null}
            </div></div>`;
        })}
      </div>
      ${edit ? html`<div class="pan-modal-mask" onClick=${function (e) { if (e.target.classList.contains("pan-modal-mask")) setEdit(null); }}>
        <div class="pan-modal">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;"><h2 style="font-family:var(--serif);margin:0;font-size:19px;">${edit.key ? "编辑用户" : "新建用户"}</h2><span onClick=${function () { setEdit(null); }} style="cursor:pointer;color:#9a8a6f;font-size:20px;">×</span></div>
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">${html`<${Avatar} icon=${edit.icon} color=${edit.color} name=${edit.name} size=${60} />`}
            <input value=${edit.name} onInput=${function (e) { set("name", e.target.value); }} placeholder="名字" style="flex:1;border:1px solid #EBDEC8;border-radius:9px;padding:10px;font-family:var(--sans);font-size:15px;" /></div>
          <input value=${edit.blurb} onInput=${function (e) { set("blurb", e.target.value); }} placeholder="一句话简介(如:高三冲刺 / 三年级)" style="width:100%;border:1px solid #EBDEC8;border-radius:9px;padding:9px 10px;margin-bottom:16px;font-family:var(--sans);font-size:13.5px;" />
          <div class="pan-eyebrow" style="margin-bottom:8px;">头像 — 首字母(留空默认取名字)或选一个图标</div>
          <input value=${/^[A-Za-z]{1,3}$/.test(edit.icon) ? edit.icon : ""} onInput=${function (e) { set("icon", e.target.value.toUpperCase().slice(0, 3)); }} placeholder=${"首字母,如 " + (C.initials(edit.name) || "SY")} maxlength="3" style="width:140px;border:1px solid #EBDEC8;border-radius:8px;padding:8px 10px;margin-bottom:10px;font-family:var(--sans);font-size:14px;text-transform:uppercase;letter-spacing:1px;" />
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;max-height:148px;overflow:auto;">${AVATAR_EMOJI.map(function (em) { return html`<span key=${em} onClick=${function () { set("icon", em); }} style=${"width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;background:" + (edit.icon === em ? "#F4EAD8" : "#FBF6EC") + ";box-shadow:" + (edit.icon === em ? "0 0 0 2px " + edit.color : "inset 0 0 0 1px #EEE3CF") + ";"}>${em}</span>`; })}</div>
          <div class="pan-eyebrow" style="margin-bottom:8px;">颜色</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;">${AVATAR_COLOR.map(function (c) { return html`<span key=${c} onClick=${function () { set("color", c); }} style=${"width:26px;height:26px;border-radius:50%;cursor:pointer;background:" + c + ";box-shadow:" + (edit.color === c ? "0 0 0 2px #fff,0 0 0 4px " + c : "none") + ";"}></span>`; })}</div>
          <div style="display:flex;justify-content:flex-end;gap:10px;"><span class="pan-btn ghost" onClick=${function () { setEdit(null); }}>取消</span><span class=${"pan-btn " + (busy ? "ghost" : "grad")} onClick=${busy ? null : save}>${busy ? "保存中…" : "保存"}</span></div>
        </div>
      </div>` : null}
    </div>`;
  }

  /* =========================================================
   *  MESSAGES · 给 AI 导师的异步留言箱(进库,CLI agent 自取)
   * ========================================================= */
  var MSG_KIND = { enroll: "选课", wish: "愿望", ask: "提问", note: "留言", quiz: "习题", wrong: "错题", done: "完成" };
  var MSG_STATUS = { "new": ["待处理", "#a86a00", "#FBF4E6"], seen: ["已查看", "#6E7A4F", "#F1F4E8"], doing: ["处理中", "#2c5fb3", "#eaf1fb"], done: ["已处理", "#3f8a52", "#eef7f0"] };
  function MessagesScreen() {
    var app = useApp();
    var ms0 = useState(null); var msgs = ms0[0], setMsgs = ms0[1];
    var tx0 = useState((app.params && app.params.prefill) || ""); var txt = tx0[0], setTxt = tx0[1];
    var cx0 = useState((app.params && app.params.ctx) || null); var ctx = cx0[0], setCtx = cx0[1];
    var bz0 = useState(false); var busy = bz0[0], setBusy = bz0[1];
    function load() { C.fetchMessages().then(function (m) { setMsgs(m); }); }
    useEffect(function () { load(); }, []);
    function send() {
      var t = txt.trim(); if (!t || busy) return; setBusy(true);
      C.sendMessage({ kind: ctx ? "ask" : "note", text: t, context: ctx || {} }).then(function () { setBusy(false); setTxt(""); setCtx(null); load(); });
    }
    function done(id) { C.messageUpdate(id, { status: "done" }).then(load); }
    function fmt(ts) { if (!ts) return ""; var d = new Date(ts); function p(n) { return (n < 10 ? "0" : "") + n; } return (d.getMonth() + 1) + "/" + d.getDate() + " " + p(d.getHours()) + ":" + p(d.getMinutes()); }
    return html`<div class="pan-screen narrow">
      ${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "给导师留言" }]} />`}
      <h1 class="pan-page-h">给 AI 导师留言 <span class="en">/ Messages</span></h1>
      <p class="pan-page-sub">异步留言箱:你写的需求进队列,本地 AI 导师有空就来处理、逐条标状态并回复。选课/完成等也会自动留一条。</p>
      <div class="pan-panel" style="margin-bottom:18px;">
        ${ctx && ctx.quote ? html`<div style="font-size:12.5px;color:#7A6E5E;background:#FBF6EC;border-left:3px solid #C8852E;border-radius:0 8px 8px 0;padding:8px 12px;margin-bottom:10px;">关于:"${ctx.quote}" <span class="lnk" style="color:#b09a7a;cursor:pointer;margin-left:6px;" onClick=${function () { setCtx(null); }}>× 清除</span></div>` : null}
        <textarea value=${txt} onInput=${function (e) { setTxt(e.target.value); }} placeholder="想让导师做什么?(出一套练习 / 讲讲这个考点 / 把这题加错题本…)" style="width:100%;min-height:74px;border:1px solid #EBDEC8;border-radius:10px;padding:11px;font-family:var(--sans);font-size:14px;resize:vertical;outline:none;background:#FFFDF8;"></textarea>
        <div style="display:flex;justify-content:flex-end;margin-top:10px;"><span class=${"pan-btn " + (txt.trim() && !busy ? "grad" : "ghost")} onClick=${send}>${busy ? "发送中…" : "✉️ 发给导师"}</span></div>
      </div>
      ${msgs == null ? html`<div class="pan-empty">加载中…</div>`
        : !msgs.length ? html`<div class="pan-empty">还没有留言。上面写一条,或在学习时随手发给导师。</div>`
        : html`<div style="display:flex;flex-direction:column;gap:12px;">${msgs.map(function (m) {
          var stt = MSG_STATUS[m.status] || MSG_STATUS["new"];
          return html`<div key=${m.id} class="pan-panel" style="padding:14px 16px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap;">
              <span class="pan-pill" style=${"color:" + stt[1] + ";background:" + stt[2] + ";"}>${stt[0]}</span>
              <span style="font-size:11.5px;color:#9a8a6f;">${MSG_KIND[m.kind] || m.kind}</span>
              <span style="font-size:11.5px;color:#bbab8c;margin-left:auto;">${fmt(m.created_at)}</span></div>
            <div style="font-size:14px;color:#3a3023;line-height:1.6;">${m.text}</div>
            ${m.context && m.context.quote ? html`<div style="font-size:12px;color:#9a8a6f;margin-top:5px;border-left:2px solid #EBDEC8;padding-left:8px;">"${m.context.quote}"</div>` : null}
            ${m.reply ? html`<div style="margin-top:10px;background:#F1F4E8;border-radius:10px;padding:10px 12px;font-size:13px;color:#3a3023;"><b style="color:#6E7A4F;">导师回复:</b> ${m.reply}</div>` : null}
            ${m.status !== "done" ? html`<div style="margin-top:8px;text-align:right;"><span class="lnk" style="font-size:12px;color:#b09a7a;cursor:pointer;" onClick=${function () { done(m.id); }}>标记已处理</span></div>` : null}
          </div>`;
        })}</div>`}
    </div>`;
  }

  /* =========================================================
   *  刷题闭环:知识点练习(PG 题库)+ 错题本(答题写库,错题自动收集)
   * ========================================================= */
  function normQ(r) { return { qid: r.id, kp: r.kp, type: r.type || "choice", q: r.stem, options: r.options || [], answer: r.answer, explain: r.explain, subject: r.subject, difficulty: r.difficulty || 2 }; }

  function QuizRun(p) {
    var app = useApp();
    var r0 = useState({ i: 0, answered: null, fill: "", fillOk: false, lastOk: false, correct: 0, earned: 0, wrong: 0 });
    var run = r0[0], setRun = r0[1];
    var qs = p.questions || [], q = qs[run.i];
    function val(qq) { return 2 + (qq.difficulty || 2); }
    function settle(qq, ok) { C.recordAnswer({ questionId: qq.qid, kp: qq.kp, correct: ok, examId: p.examId }); if (ok) C.award(val(qq), "答对练习 · " + String(qq.q || "").slice(0, 16), "q:" + qq.qid + ":" + Date.now()); }
    function choose(idx) { if (run.answered != null) return; var ok = idx === q.answer; settle(q, ok); setRun(Object.assign({}, run, { answered: idx, lastOk: ok, correct: run.correct + (ok ? 1 : 0), earned: run.earned + (ok ? val(q) : 0), wrong: run.wrong + (ok ? 0 : 1) })); }
    function submitFill() { if (run.answered != null) return; var v = (run.fill || "").trim().toLowerCase().replace(/[.。]$/, ""); var ok = (q.answer || []).some(function (a) { return String(a).trim().toLowerCase() === v; }); settle(q, ok); setRun(Object.assign({}, run, { answered: 1, fillOk: ok, lastOk: ok, correct: run.correct + (ok ? 1 : 0), earned: run.earned + (ok ? val(q) : 0), wrong: run.wrong + (ok ? 0 : 1) })); }
    function next() { if (run.i + 1 >= qs.length) { C.logEvent({ kind: "quiz", subject: p.subject || "", label: p.title || "练习", correct: run.correct, total: qs.length }); app.checkAch(); } setRun(Object.assign({}, run, { i: run.i + 1, answered: null, fill: "", fillOk: false, lastOk: false })); }
    if (!qs.length) return html`<div class="pan-empty">没有题目。</div>`;
    if (run.i >= qs.length) {
      var acc = Math.round(run.correct / qs.length * 100);
      return html`<div class="pan-panel" style="text-align:center;padding:40px;"><div style="font-size:40px;margin-bottom:10px;">${acc >= 80 ? "🎉" : acc >= 60 ? "👍" : "💪"}</div>
        <h1 style="font-family:var(--serif);font-size:26px;margin:0 0 6px;">${run.correct} / ${qs.length} 正确</h1>
        <div style="color:#9a8a6f;margin-bottom:6px;">正确率 ${acc}% · 获得 ⬡ ${run.earned}</div>
        <div style="color:#9a8a6f;font-size:13px;margin-bottom:22px;">${run.wrong ? "错 " + run.wrong + " 题,已进错题本" : "全对,漂亮!"}</div>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;"><span class="pan-btn ink" onClick=${p.onClose || function () { app.go("home"); }}>完成</span><span class="pan-btn ghost" onClick=${function () { app.go("wrongbook"); }}>错题本</span></div></div>`;
    }
    var optsEl;
    if (q.type === "fill") {
      var fb = run.answered != null;
      optsEl = html`<div><div style="display:flex;gap:10px;"><input disabled=${fb} value=${run.fill} onInput=${function (e) { setRun(Object.assign({}, run, { fill: e.target.value })); }} onKeyDown=${function (e) { if (e.key === "Enter") submitFill(); }} placeholder="输入答案…" style=${"flex:1;border:1.5px solid " + (fb ? (run.fillOk ? "#6E7A4F" : "#B6532F") : "#EBDEC8") + ";border-radius:12px;padding:13px 16px;font-size:16px;outline:none;background:" + (fb ? (run.fillOk ? "#F2F4E8" : "#FAE9E2") : "#FFFDF8") + ";"} />${fb ? null : html`<span class="pan-btn ink" onClick=${submitFill}>提交</span>`}</div>${fb && !run.fillOk ? html`<div style="margin-top:10px;font-size:14px;color:#B6532F;">正确答案:<b>${(q.answer || []).join(" / ")}</b></div>` : null}</div>`;
    } else {
      optsEl = (q.options || []).map(function (o, i) {
        var cls = "pan-opt", mark = "", mc = "#6E7A4F";
        if (run.answered != null) { if (i === q.answer) { cls += " right"; mark = "✓"; } else if (i === run.answered) { cls += " wrong"; mark = "✕"; mc = "#B6532F"; } }
        return html`<div key=${i} class=${cls} onClick=${run.answered == null ? function () { choose(i); } : null}><div class="k">${String.fromCharCode(65 + i)}</div><div class="tx">${o}</div><div style=${"font-size:18px;color:" + mc + ";"}>${mark}</div></div>`;
      });
    }
    var scn = (SUBJECTS[q.subject] || {}).name || q.subject || "";
    return html`<div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;"><div style="font-size:13px;color:#9a8a6f;">${p.title || "练习"} · ${scn}</div><div style="font-size:13px;color:#9a8a6f;">第 <b style="color:#33291E;">${run.i + 1}</b> / ${qs.length} 题</div></div>
      <div class="pan-bar" style="height:7px;margin-bottom:20px;"><i style=${"width:" + Math.round(run.i / qs.length * 100) + "%;background:#C8852E;"}></i></div>
      <div class="pan-panel" style="padding:30px 32px;">
        <div style="display:flex;gap:10px;margin-bottom:16px;align-items:center;">${html`<${Pill} text=${q.type === "fill" ? "填空" : "单选"} color="#6E7A4F" />`}<span class="pan-pill" style="color:#C8852E;background:#FBF4E6;font-weight:700;margin-left:auto;">⬡ ${val(q)}</span></div>
        <h1 style="font-family:var(--serif);font-size:22px;font-weight:600;line-height:1.45;margin:0 0 22px;">${q.q}</h1>
        <div style="display:flex;flex-direction:column;gap:12px;">${optsEl}</div>
        ${run.answered != null && q.explain ? html`<div style="background:#FBF4E6;border-radius:14px;padding:18px 20px;margin-top:22px;"><div style="font-size:13px;font-weight:700;color:#6E7A4F;margin-bottom:6px;">${run.lastOk ? "✓ 答对了" : "✗ 解析"}</div><div style="font-size:14px;line-height:1.7;color:#3a3023;">${q.explain}</div></div>` : null}
        ${run.answered != null ? html`<div style="display:flex;justify-content:flex-end;margin-top:22px;"><span class="pan-btn ink" onClick=${next}>${run.i + 1 >= qs.length ? "查看结果 →" : "下一题 →"}</span></div>` : null}
      </div></div>`;
  }

  function PracticeScreen() {
    var app = useApp();
    var did = app.params.disc, scope = app.params.scope;
    var d = did && C.disciplineById(did);
    var q0 = useState(null); var qs = q0[0], setQs = q0[1];
    useEffect(function () {
      if (!d) { setQs([]); return; }
      C.questionsFor({ subject: d.subject, scope: scope || null, limit: 20 }).then(function (rows) { setQs(rows.map(normQ)); });
    }, [did, scope]);
    return html`<div class="pan-screen narrow">
      ${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "我的课程", go: "course" }, { t: (d && d.name) || "练习" }]} />`}
      <h1 class="pan-page-h">${(d && d.name) || ""} 练习 <span class="en">/ Practice</span></h1>
      ${qs == null ? html`<div class="pan-empty">加载题目中…</div>`
        : !qs.length ? html`<div class="pan-empty">这门课还没有题目。<br/>让 AI 导师出一套(挂知识点),或在留言箱发给导师。<br/>
          <span class="pan-btn grad" style="margin-top:14px;" onClick=${function () { C.sendMessage({ kind: "ask", text: "请给「" + ((d && d.name) || "") + "」出一套随堂练习题(挂知识点)。", context: { discId: did, scope: scope } }).then(function () { app.go("messages"); }); }}>✉️ 请导师出题</span></div>`
        : html`<${QuizRun} questions=${qs} title=${((d && d.name) || "") + " 练习"} subject=${d.subject} onClose=${function () { app.go("course", scope ? { disc: did, scope: scope } : { disc: did }); }} />`}
    </div>`;
  }

  function WrongbookScreen() {
    var app = useApp();
    var w0 = useState(null); var rows = w0[0], setRows = w0[1];
    var rd0 = useState(false); var redo = rd0[0], setRedo = rd0[1];
    function load() { C.wrongbookFetch({}).then(setRows); }
    useEffect(function () { load(); }, []);
    if (redo && rows && rows.length) {
      return html`<div class="pan-screen narrow">${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "错题本", go: "wrongbook" }, { t: "重做" }]} />`}
        <${QuizRun} questions=${rows.map(normQ)} title="错题重做" onClose=${function () { setRedo(false); load(); }} /></div>`;
    }
    return html`<div class="pan-screen narrow">
      ${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "错题本" }]} />`}
      <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px;">
        <div><h1 class="pan-page-h" style="margin:0 0 4px;">错题本 <span class="en">/ Wrong Answers</span></h1>
        <div style="font-size:13px;color:#9a8a6f;">最近答错、还没再做对的题;做对后自动移出。</div></div>
        ${rows && rows.length ? html`<span class="pan-btn ink" onClick=${function () { setRedo(true); }}>重做这 ${rows.length} 题 →</span>` : null}
      </div>
      ${rows == null ? html`<div class="pan-empty">加载中…</div>`
        : !rows.length ? html`<div class="pan-empty">还没有错题。去课程里做练习,错的会自动收进来。</div>`
        : html`<div style="display:flex;flex-direction:column;gap:12px;">${rows.map(function (r) {
          var ans = r.type === "fill" ? (r.answer || []).join(" / ") : ((r.options || [])[r.answer] || "");
          return html`<div key=${r.id} class="pan-panel" style="padding:14px 16px;">
            <div style="font-size:11.5px;color:#9a8a6f;margin-bottom:5px;">${(SUBJECTS[r.subject] || {}).name || r.subject || ""}${r.kp ? " · " + r.kp : ""}</div>
            <div style="font-size:14px;color:#3a3023;line-height:1.55;margin-bottom:6px;">${r.stem}</div>
            <div style="font-size:13px;color:#3f8a52;">正确答案:${ans}</div>
            ${r.explain ? html`<div style="font-size:12.5px;color:#9a8a6f;margin-top:4px;">${r.explain}</div>` : null}
          </div>`;
        })}</div>`}
    </div>`;
  }

  /* =========================================================
   *  LIBRARY · 课本库(全局画廊:所有课本/考纲/资料,缓存/上传/加链接)
   * ========================================================= */
  function LibraryScreen() {
    var app = useApp();
    var l0 = useState(null); var list = l0[0], setList = l0[1];
    var ad0 = useState(false); var adding = ad0[0], setAdding = ad0[1];
    var f0 = useState({ kind: "textbook", title: "", discId: "", edition: "", authority: "authoritative", url: "", note: "" });
    var f = f0[0], setF = f0[1];
    var bz = useState(false); var busy = bz[0], setBusy = bz[1];
    function load() { C.materialsFor().then(function (x) { setList(x); }); }
    useEffect(function () { load(); }, []);
    function set(k, v) { setF(function (o) { var n = Object.assign({}, o); n[k] = v; return n; }); }
    var mine = C.myDiscs();
    var PRESETS = [
      { label: "国家中小学智慧教育平台(官方)", url: "https://basic.smartedu.cn/tchMaterial", authority: "official", kind: "textbook", note: "官方电子课本,可在线看 / 下载 PDF" },
      { label: "ChinaTextbook(开源教材PDF)", url: "https://github.com/TapXWorld/ChinaTextbook", authority: "authoritative", kind: "repo", note: "GitHub 开源教材合集,免费无水印、可下载" },
      { label: "MIT OCW(公开课/讲义)", url: "https://ocw.mit.edu/", authority: "authoritative", kind: "course", note: "MIT 公开课全套讲义/作业/考试" }
    ];
    function applyPreset(ps) { setF(function (o) { return Object.assign({}, o, { title: o.title || ps.label, url: ps.url, authority: ps.authority, kind: ps.kind, note: o.note || ps.note }); }); }
    function add() {
      if (!f.title.trim() || busy) return; setBusy(true);
      C.saveMaterial({ discId: f.discId || null, edition: f.edition || null, kind: f.kind, title: f.title.trim(), url: f.url || null, note: f.note || "", authority: f.authority, refs: f.url ? [{ name: f.title.trim(), url: f.url }] : [] }).then(function () { setBusy(false); setF(Object.assign({}, f, { title: "", url: "", note: "", edition: "" })); setAdding(false); load(); });
    }
    function upload(e) {
      var file = e.target.files && e.target.files[0]; if (!file) return;
      if (file.size > 8 * 1024 * 1024) { window.alert("文件请小于 8MB(大书建议放直链后缓存)"); e.target.value = ""; return; }
      var rd = new FileReader();
      rd.onload = function () { var b64 = String(rd.result).split(",")[1] || ""; C.uploadFile(file.name, file.type || "application/pdf", b64).then(function (r) { if (r && r.ok && r.id) C.saveMaterial({ discId: f.discId || null, kind: "pdf", title: file.name, fileId: r.id, authority: "authoritative", note: "上传" }).then(load); else window.alert("上传失败"); }); };
      rd.readAsDataURL(file); e.target.value = "";
    }
    function cache(id) { C.cachePdf(id).then(function (r) { if (r && r.ok) { window.alert("已缓存(" + Math.round((r.size || 0) / 1024) + " KB)"); load(); } else window.alert((r && r.error) || "缓存失败"); }); }
    function del(id) { if (!window.confirm("从课本库删除?")) return; C.deleteMaterial(id).then(load); }
    function discName(id) { var d = id && C.disciplineById(id); return d ? d.name : "通用"; }
    function AU(a) { return a === "official" ? ["官方", "#3f8a52", "#eef7f0"] : a === "authoritative" ? ["权威", "#2c5fb3", "#eaf1fb"] : ["AI生成", "#a86a00", "#FBF4E6"]; }
    var KINDS = [["textbook", "课本"], ["syllabus", "考纲"], ["repo", "仓库"], ["course", "课程"], ["tool", "工具"], ["link", "链接"]];
    var AUTH = [["official", "官方"], ["authoritative", "权威"], ["generated", "AI生成"]];
    function card(m) {
      var href = m.file_id ? C.fileUrl(m.file_id) : m.url, au = AU(m.authority), cached = !!m.file_id;
      var col = m.authority === "official" ? "#3f8a52" : m.authority === "authoritative" ? "#2c5fb3" : "#C8852E";
      return html`<div key=${m.id} class="pan-panel" style="padding:0;overflow:hidden;display:flex;flex-direction:column;">
        <div style=${"height:78px;background:linear-gradient(135deg," + col + ",#33291E);display:flex;align-items:center;justify-content:center;font-size:30px;position:relative;"}>📕
          <span style=${"position:absolute;top:8px;right:8px;font-size:10.5px;font-weight:700;padding:2px 8px;border-radius:10px;background:rgba(255,255,255,.9);color:" + (cached ? "#3f8a52" : "#9a8a6f") + ";"}>${cached ? "已缓存" : "未缓存"}</span></div>
        <div style="padding:11px 13px;flex:1;display:flex;flex-direction:column;gap:6px;">
          <div style="font-size:13px;font-weight:600;line-height:1.4;">${href ? html`<a href=${href} target="_blank" rel="noopener">${m.title}</a>` : m.title}</div>
          <div style="font-size:11px;color:#9a8a6f;display:flex;align-items:center;gap:6px;flex-wrap:wrap;"><span class="pan-pill" style=${"color:" + au[1] + ";background:" + au[2] + ";"}>${au[0]}</span>${discName(m.disc_id)}${m.edition ? " · " + m.edition : ""}</div>
          <div style="margin-top:auto;display:flex;gap:10px;font-size:12px;align-items:center;padding-top:4px;">
            ${m.url && !m.file_id ? html`<span class="lnk" style="color:#6E7A4F;cursor:pointer;" onClick=${function () { cache(m.id); }}>缓存PDF</span>` : null}
            ${href ? html`<a href=${href} target="_blank" rel="noopener" style="color:#2c5fb3;">打开↗</a>` : null}
            <span class="lnk" style="color:#B6532F;cursor:pointer;margin-left:auto;" onClick=${function () { del(m.id); }}>删除</span></div>
        </div></div>`;
    }
    return html`<div class="pan-screen">
      ${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "课本库" }]} />`}
      <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:6px;">
        <div><h1 class="pan-page-h" style="margin:0 0 4px;">课本库 <span class="en">/ Library</span></h1>
        <div style="font-size:13px;color:#9a8a6f;">所有课本 / 考纲 / 资料的总库。未缓存的可一键缓存 PDF 到本地;也能上传自己的课本 / 书。</div></div>
        <div style="display:flex;gap:8px;"><label class="pan-btn ghost" style="cursor:pointer;">⬆ 上传课本/书<input type="file" accept="application/pdf,image/*" onChange=${upload} style="display:none;" /></label><span class="pan-btn ink" onClick=${function () { setAdding(!adding); }}>${adding ? "收起" : "＋ 加链接"}</span></div>
      </div>
      ${adding ? html`<div class="pan-panel" style="margin:10px 0 18px;">
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">${PRESETS.map(function (ps, i) { return html`<span key=${i} class="pan-tag" style="cursor:pointer;" onClick=${function () { applyPreset(ps); }}>+ ${ps.label}</span>`; })}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
          <input value=${f.title} onInput=${function (e) { set("title", e.target.value); }} placeholder="书名/标题" style="grid-column:1/3;border:1px solid #EBDEC8;border-radius:9px;padding:9px 11px;font-family:var(--sans);" />
          <select value=${f.discId} onChange=${function (e) { set("discId", e.target.value); }} style="border:1px solid #EBDEC8;border-radius:9px;padding:9px;font-family:var(--sans);"><option value="">通用(不绑学科)</option>${mine.map(function (id) { var d = C.disciplineById(id) || { name: id }; return html`<option key=${id} value=${id}>${d.name}</option>`; })}</select>
          <input value=${f.edition} onInput=${function (e) { set("edition", e.target.value); }} placeholder="版本(可空)" style="border:1px solid #EBDEC8;border-radius:9px;padding:9px 11px;font-family:var(--sans);" />
          <input value=${f.url} onInput=${function (e) { set("url", e.target.value); }} placeholder="链接 URL(可空)" style="grid-column:1/3;border:1px solid #EBDEC8;border-radius:9px;padding:9px 11px;font-family:var(--sans);" />
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;align-items:center;"><span style="font-size:12px;color:#7A6E5E;">类型</span>${KINDS.map(function (k) { return html`<span key=${k[0]} class=${"pan-tag" + (f.kind === k[0] ? " on" : "")} onClick=${function () { set("kind", k[0]); }}>${k[1]}</span>`; })}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;align-items:center;"><span style="font-size:12px;color:#7A6E5E;">可信度</span>${AUTH.map(function (a) { return html`<span key=${a[0]} class=${"pan-tag" + (f.authority === a[0] ? " on" : "")} onClick=${function () { set("authority", a[0]); }}>${a[1]}</span>`; })}</div>
        <div style="display:flex;justify-content:flex-end;"><span class=${"pan-btn " + (f.title.trim() ? "grad" : "ghost")} onClick=${add}>${busy ? "保存中…" : "＋ 添加"}</span></div>
      </div>` : null}
      ${list == null ? html`<div class="pan-empty">加载中…</div>`
        : !list.length ? html`<div class="pan-empty">课本库还空着。点右上「上传课本/书」或「加链接」,或去学科页「管理教材」挂课本。</div>`
        : html`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;">${list.map(card)}</div>`}
    </div>`;
  }

  window.Screens = { home: HomeScreen, explore: ExploreScreen, discipline: DisciplineScreen, plan: PlanScreen, course: CourseScreen, library: LibraryScreen, quiz: QuizScreen, notes: NotesScreen, wishlist: WishlistScreen, points: PointsScreen, analytics: AnalyticsScreen, users: UsersScreen, messages: MessagesScreen, practice: PracticeScreen, wrongbook: WrongbookScreen };
})();
