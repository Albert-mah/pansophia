/* =============================================================
 *  学习中心 · 首页逻辑
 *  读取 STUDY_TRACKS / STUDY_SUBJECTS / STUDY_CATALOG，
 *  按「学习空间」(track) 渲染：空间切换、突击检测入口、目录、搜索、筛选。
 * ============================================================= */
(function () {
  const TRACKS   = window.STUDY_TRACKS || {};
  const SUBJECTS = window.STUDY_SUBJECTS || {};
  const CATALOG  = window.STUDY_CATALOG || [];
  const SH = window.StudyHub;

  const TYPE_ICON = { "交互": "🎮", "文档": "📄", "例题": "✏️", "网页": "🌐", "笔记": "🗒️" };

  let currentTrack = SH ? SH.resolveTrack() : Object.keys(TRACKS)[0];
  let activeSubject = null;
  let query = "";

  const el = (sel) => document.querySelector(sel);
  const profileOf = (k) => k.profile || k.track || Object.keys(TRACKS)[0];
  const subjectOrder = (t) => Array.isArray(t.subjects) ? t.subjects
    : (t.subjects ? Object.keys(t.subjects) : Object.keys(SUBJECTS));
  const trackItems = () => CATALOG.filter(k => profileOf(k) === currentTrack);

  /* ---------- 学习空间切换 ---------- */
  function renderTrackSwitch() {
    const host = el("#track-switch");
    if (!host) return;
    const ks = Object.keys(TRACKS);
    if (ks.length < 2) { host.style.display = "none"; return; }
    host.innerHTML = "";
    ks.forEach(k => {
      const t = TRACKS[k];
      const pill = document.createElement("button");
      pill.className = "track-pill" + (k === currentTrack ? " active" : "");
      pill.innerHTML = `${t.icon} ${t.name}`;
      pill.onclick = () => switchTrack(k);
      host.appendChild(pill);
    });
  }

  function switchTrack(k) {
    if (!TRACKS[k]) return;
    currentTrack = k;
    activeSubject = null; query = "";
    if (SH) SH.rememberTrack(k);
    try { const u = new URL(location.href); u.searchParams.set("track", k); history.replaceState(null, "", u); } catch (e) {}
    const search = el("#search"); if (search) search.value = "";
    renderAll();
  }

  /* ---------- 顶部标题 / 统计 ---------- */
  function renderHero() {
    const t = TRACKS[currentTrack] || {};
    const title = el("#hero-title"), sub = el("#hero-sub");
    if (title) title.textContent = `${t.icon || "📚"} ${t.name || "学习中心"}`;
    if (sub) sub.textContent = t.desc || "按科目分类整理 · 文档 + 交互 + 检测，方便随时复习";
    if (t.color) document.documentElement.style.setProperty("--accent", t.color);
  }

  function renderStats() {
    const items = trackItems();
    el("#stat-total").textContent = items.length;
    el("#stat-subjects").textContent = new Set(items.map(k => k.subject)).size;
    el("#stat-updated").textContent = items.map(k => k.date).sort().slice(-1)[0] || "—";
  }

  /* ---------- 突击检测入口（仅 showQuiz 的空间） ---------- */
  function renderDashboard() {
    const host = el("#dashboard");
    if (!host) return;
    const t = TRACKS[currentTrack] || {};
    if (!t.showQuiz || !window.QuizApp) { host.innerHTML = ""; return; }
    const s = window.QuizApp.store;
    host.innerHTML =
      `<a class="dash" href="quiz/index.html${qs()}">
         <div class="dash-main">
           <div class="dash-emoji">📝</div>
           <div class="dash-text">
             <b>检测中心 · 期末突击</b>
             <span>单词检测 · 习题练习 · 错题本 / 生词本，做错自动收集、可反复重练</span>
           </div>
           <div class="dash-go">进入 →</div>
         </div>
         <div class="dash-stats">
           <div><b>${s.todayCount()}</b><span>今日已练</span></div>
           <div><b>${s.wrong().length}</b><span>错题</span></div>
           <div><b>${s.vocab().length}</b><span>生词</span></div>
         </div>
       </a>`;
  }
  function qs() { return "?track=" + encodeURIComponent(currentTrack); }

  /* ---------- 科目筛选卡片 ---------- */
  function renderSubjectCards() {
    const t = TRACKS[currentTrack] || {};
    const order = subjectOrder(t);
    const counts = {};
    trackItems().forEach(k => counts[k.subject] = (counts[k.subject] || 0) + 1);
    // 把"有单词检测但无讲解页"的学科也算上（避免日语等被当空）
    const WB = (window.WORD_BANK || []).concat(window.WORD_BANK_JA || []);
    WB.filter(g => (g.profile || g.track) === currentTrack).forEach(g => {
      if (!counts[g.subject]) counts[g.subject] = 0;
    });

    const host = el("#subject-grid");
    host.innerHTML = "";
    order.forEach(key => {
      const s = SUBJECTS[key]; if (!s) return;
      const n = counts[key] || 0;
      const card = document.createElement("div");
      card.className = "subject-card" + (n === 0 ? " dim" : "");
      card.style.setProperty("--sc", s.color);
      if (activeSubject === key) card.classList.add("active");
      card.innerHTML = `<div class="emoji">${s.icon}</div>
        <div class="meta"><b>${s.name}</b><span>${n} 个知识点</span></div>`;
      card.onclick = () => { activeSubject = (activeSubject === key) ? null : key; render(); };
      host.appendChild(card);
    });
  }

  /* ---------- 单个知识点卡片 ---------- */
  function kpCard(k) {
    const s = SUBJECTS[k.subject] || { color: "#888" };
    const a = document.createElement("a");
    a.className = "kp-card"; a.href = k.path;
    a.style.setProperty("--sc", s.color);
    const dots = [1, 2, 3].map(i => `<i class="${i <= (k.difficulty || 1) ? "on" : ""}"></i>`).join("");
    const tags = (k.tags || []).slice(0, 4).map(t => `<span class="tag">${t}</span>`).join("");
    a.innerHTML = `
      <div class="kp-head">
        <h4>${k.title}</h4>
        <span class="type-badge" style="--sc:${s.color}">${TYPE_ICON[k.type] || ""} ${k.type || ""}</span>
      </div>
      <p class="summary">${k.summary || ""}</p>
      <div class="tags">${tags}</div>
      <div class="diff" title="难度">${dots}</div>`;
    return a;
  }

  function matches(k) {
    if (activeSubject && k.subject !== activeSubject) return false;
    if (!query) return true;
    const hay = [k.title, k.summary, k.category, (k.tags || []).join(" "),
                 (SUBJECTS[k.subject] || {}).name].join(" ").toLowerCase();
    return hay.includes(query);
  }

  function renderCatalog() {
    const t = TRACKS[currentTrack] || {};
    const order = subjectOrder(t);
    const host = el("#catalog");
    host.innerHTML = "";
    const items = trackItems().filter(matches);

    if (items.length === 0) {
      host.innerHTML = `<div class="empty">这个空间还没有匹配的知识点。<br>换个关键词，或清除筛选。</div>`;
      return;
    }
    order.forEach(subjKey => {
      const subjItems = items.filter(k => k.subject === subjKey);
      if (subjItems.length === 0) return;
      const s = SUBJECTS[subjKey];
      const block = document.createElement("section");
      block.className = "subject-block";
      block.style.setProperty("--sc", s.color);
      block.innerHTML = `<h2>${s.icon} ${s.name}<span class="badge-count">${subjItems.length}</span></h2>`;
      const cats = {};
      subjItems.forEach(k => (cats[k.category || "其他"] ||= []).push(k));
      Object.keys(cats).forEach(cat => {
        const g = document.createElement("div");
        g.className = "category-group";
        g.innerHTML = `<h3>${cat}</h3>`;
        const grid = document.createElement("div");
        grid.className = "card-grid";
        cats[cat].forEach(k => grid.appendChild(kpCard(k)));
        g.appendChild(grid);
        block.appendChild(g);
      });
      host.appendChild(block);
    });
  }

  function renderRecent() {
    const host = el("#recent");
    const recent = [...trackItems()].sort((a, b) => (b.date || "").localeCompare(a.date || "")).slice(0, 5);
    host.innerHTML = "";
    if (!recent.length) { host.innerHTML = `<div class="empty">还没有内容，提个问题就会出现在这里。</div>`; return; }
    recent.forEach(k => {
      const s = SUBJECTS[k.subject] || { color: "#888", name: "" };
      const a = document.createElement("a");
      a.className = "recent-item"; a.href = k.path;
      a.style.setProperty("--sc", s.color);
      a.innerHTML = `<span class="dot"></span>
        <div><div class="t">${k.title}</div>
        <div class="s">${s.name} · ${k.category || ""}</div></div>
        <div class="d">${k.date || ""}</div>`;
      host.appendChild(a);
    });
  }

  /* ---------- 考点大纲 / 覆盖度（懒加载知识地图） ---------- */
  function renderOutline() {
    const host = el("#outline");
    if (!host) return;
    host.innerHTML = "";
    const SK = (window.STUDY_SKELETON || []).filter(e => (e.profile || e.track) === currentTrack);
    if (!SK.length) return;
    const SCOPES = window.STUDY_SCOPES || {};
    const byId = {}; CATALOG.forEach(k => byId[k.id] = k);

    const h = document.createElement("h2");
    h.className = "section-title";
    h.innerHTML = `📚 考点大纲 <span style="font-weight:400;color:var(--text-faint);font-size:.85rem">（懒加载 · ✅ 已填可点 / ⬜ 待填）</span>`;
    host.appendChild(h);

    SK.forEach(e => {
      const s = SUBJECTS[e.subject] || { name: e.subject, icon: "", color: "#888" };
      const scope = SCOPES[e.scope] || {};
      let done = 0, total = 0;
      e.topics.forEach(t => t.points.forEach(p => { total++; if (p.ref ? byId[p.ref] : p.status === "done") done++; }));
      const pct = total ? Math.round(done / total * 100) : 0;

      const block = document.createElement("section");
      block.className = "outline-block";
      block.style.setProperty("--sc", s.color);
      block.innerHTML = `<h3>${s.icon} ${s.name}<span class="scope">${scope.name || e.scope}</span>
        <span class="cov"><i style="width:${pct}%"></i></span><span class="covn">${done}/${total} · ${pct}%</span></h3>`;
      e.topics.forEach(t => {
        const tp = document.createElement("div");
        tp.className = "outline-topic";
        tp.innerHTML = `<div class="ot-title">${t.title}</div>`;
        const chips = document.createElement("div");
        chips.className = "ot-points";
        t.points.forEach(p => {
          const kp = p.ref ? byId[p.ref] : null;
          if (kp) {
            const a = document.createElement("a");
            a.className = "ot-chip done"; a.href = kp.path; a.textContent = "✅ " + p.title;
            chips.appendChild(a);
          } else {
            const sp = document.createElement("span");
            sp.className = "ot-chip todo"; sp.textContent = "⬜ " + p.title;
            chips.appendChild(sp);
          }
        });
        tp.appendChild(chips);
        block.appendChild(tp);
      });
      host.appendChild(block);
    });
  }

  function render() { renderSubjectCards(); renderCatalog(); }
  function renderAll() {
    renderTrackSwitch(); renderHero(); renderStats(); renderDashboard(); renderOutline(); renderRecent(); render();
  }

  function init() {
    renderAll();
    const input = el("#search");
    input.addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); renderCatalog(); });
  }
  document.addEventListener("DOMContentLoaded", init);
})();
