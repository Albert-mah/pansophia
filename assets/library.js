/* =============================================================
 *  知识库 · 学科总目录浏览 (library)
 *  渲染 STUDY_DISCIPLINES（门类→学科），可搜索、可「＋加入我的空间」。
 *  加入后回首页「我的学科」，空的会提示和 AI 导师讨论补全学习计划。
 * ============================================================= */
(function () {
  const SH = window.StudyHub;
  const DISC = window.STUDY_DISCIPLINES || [];
  const profile = SH ? SH.resolveTrack() : "";
  const PROFILES = window.STUDY_PROFILES || {};
  const pName = (PROFILES[profile] || {}).name || profile;
  let query = "";

  const host = document.querySelector("#lib");
  const el = (t, a, h) => { const n = document.createElement(t); if (a) for (const k in a) { if (k === "class") n.className = a[k]; else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), a[k]); else n.setAttribute(k, a[k]); } if (h != null) n.innerHTML = h; return n; };

  function match(it) {
    if (!query) return true;
    return (it.name + " " + (it.note || "") + " " + it.id).toLowerCase().includes(query);
  }

  function render() {
    host.innerHTML = "";
    DISC.forEach(group => {
      const items = group.items.filter(match);
      if (!items.length) return;
      const sec = el("section", { class: "lib-group" + (group.custom ? " custom" : "") });
      sec.appendChild(el("h2", null, `${group.icon || ""} ${group.t1}`));
      const grid = el("div", { class: "lib-grid" });
      items.forEach(it => {
        const added = SH && SH.hasDisc(profile, it.id);
        const card = el("div", { class: "lib-card" + (added ? " added" : "") });
        card.appendChild(el("div", { class: "lib-name" }, it.name + (it.note ? ` <span class="lib-note">· ${it.note}</span>` : "")));
        const btn = el("button", { class: "lib-add" + (added ? " on" : "") }, added ? "✓ 已加入" : "＋ 加入");
        btn.addEventListener("click", () => {
          if (SH.hasDisc(profile, it.id)) { SH.removeDisc(profile, it.id); }
          else { SH.addDisc(profile, it.id); }
          render();
        });
        card.appendChild(btn);
        grid.appendChild(card);
      });
      sec.appendChild(grid);
      host.appendChild(sec);
    });
    if (!host.children.length) host.appendChild(el("div", { class: "empty" }, "没找到匹配的学科，换个词试试。"));
  }

  function init() {
    const who = document.querySelector("#lib-who");
    if (who) who.textContent = pName;
    const home = document.querySelector("#lib-home");
    if (home) home.href = "index.html?track=" + encodeURIComponent(profile);
    const input = document.querySelector("#lib-search");
    if (input) input.addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); render(); });
    render();
  }
  document.addEventListener("DOMContentLoaded", init);
})();
