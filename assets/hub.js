/* =============================================================
 *  学习中心 · 首页逻辑
 *  读取 STUDY_CATALOG / STUDY_SUBJECTS，渲染目录、搜索、筛选。
 * ============================================================= */
(function () {
  const SUBJECTS = window.STUDY_SUBJECTS || {};
  const CATALOG  = window.STUDY_CATALOG || [];

  const TYPE_ICON = { "交互": "🎮", "文档": "📄", "例题": "✏️", "网页": "🌐", "笔记": "🗒️" };

  let activeSubject = null;   // 选中的科目筛选
  let query = "";

  const el = (sel) => document.querySelector(sel);

  /* ---------- 统计条 ---------- */
  function renderStats() {
    el("#stat-total").textContent = CATALOG.length;
    const subjUsed = new Set(CATALOG.map(k => k.subject)).size;
    el("#stat-subjects").textContent = subjUsed;
    const latest = CATALOG.map(k => k.date).sort().slice(-1)[0] || "—";
    el("#stat-updated").textContent = latest;
  }

  /* ---------- 科目筛选卡片 ---------- */
  function renderSubjectCards() {
    const counts = {};
    CATALOG.forEach(k => counts[k.subject] = (counts[k.subject] || 0) + 1);

    const host = el("#subject-grid");
    host.innerHTML = "";
    Object.keys(SUBJECTS).forEach(key => {
      const s = SUBJECTS[key];
      const n = counts[key] || 0;
      const card = document.createElement("div");
      card.className = "subject-card" + (n === 0 ? " dim" : "");
      card.style.setProperty("--sc", s.color);
      if (activeSubject === key) card.classList.add("active");
      card.innerHTML = `<div class="emoji">${s.icon}</div>
        <div class="meta"><b>${s.name}</b><span>${n} 个知识点</span></div>`;
      card.onclick = () => {
        activeSubject = (activeSubject === key) ? null : key;
        render();
      };
      host.appendChild(card);
    });
  }

  /* ---------- 单个知识点卡片 ---------- */
  function kpCard(k) {
    const s = SUBJECTS[k.subject] || { color: "#888" };
    const a = document.createElement("a");
    a.className = "kp-card";
    a.href = k.path;
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

  /* ---------- 过滤 ---------- */
  function matches(k) {
    if (activeSubject && k.subject !== activeSubject) return false;
    if (!query) return true;
    const hay = [k.title, k.summary, k.category, (k.tags || []).join(" "),
                 (SUBJECTS[k.subject] || {}).name].join(" ").toLowerCase();
    return hay.includes(query);
  }

  /* ---------- 主目录（按科目→分类） ---------- */
  function renderCatalog() {
    const host = el("#catalog");
    host.innerHTML = "";
    const items = CATALOG.filter(matches);

    if (items.length === 0) {
      host.innerHTML = `<div class="empty">没有找到匹配的知识点。<br>试试别的关键词，或清除筛选。</div>`;
      return;
    }

    // 按科目顺序分组
    Object.keys(SUBJECTS).forEach(subjKey => {
      const subjItems = items.filter(k => k.subject === subjKey);
      if (subjItems.length === 0) return;
      const s = SUBJECTS[subjKey];

      const block = document.createElement("section");
      block.className = "subject-block";
      block.style.setProperty("--sc", s.color);
      block.innerHTML = `<h2>${s.icon} ${s.name}
        <span class="badge-count">${subjItems.length}</span></h2>`;

      // 二级分类
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

  /* ---------- 最近更新 ---------- */
  function renderRecent() {
    const host = el("#recent");
    const recent = [...CATALOG].sort((a, b) => (b.date || "").localeCompare(a.date || "")).slice(0, 5);
    host.innerHTML = "";
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

  function render() {
    renderSubjectCards();
    renderCatalog();
  }

  /* ---------- 初始化 ---------- */
  function init() {
    renderStats();
    renderRecent();
    render();
    const input = el("#search");
    input.addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); renderCatalog(); });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
