/* =============================================================
 *  学习中心 · 知识点页面通用脚本
 * -------------------------------------------------------------
 *  自动完成：
 *   - 根据 data-page-id 在 catalog 中查到本页元数据
 *   - 生成面包屑（首页 / 科目 / 分类 / 标题）+ 返回首页按钮
 *   - 生成"相关知识点"（related 指定的 + 同分类的兄弟知识点）
 *   - 注入 MathJax 渲染 $...$ / $$...$$ 数学公式
 *   - 给页面注入科目主题色
 *
 *  用法：在 <head> 里按顺序引入
 *    <link rel="stylesheet" href="../../assets/style.css">
 *    <script src="../../data/catalog.js"></script>
 *    <script defer src="../../assets/page.js" data-page-id="科目-名字"></script>
 * ============================================================= */
(function () {
  const me = document.currentScript ||
    [...document.scripts].find(s => /page\.js/.test(s.src));
  const ROOT = me.src.replace(/assets\/page\.js.*$/, "");   // 站点根目录相对路径
  const PAGE_ID = me.getAttribute("data-page-id");

  const SUBJECTS = window.STUDY_SUBJECTS || {};
  const CATALOG  = window.STUDY_CATALOG || [];
  const TYPE_ICON = { "交互": "🎮", "文档": "📄", "例题": "✏️", "网页": "🌐", "笔记": "🗒️" };

  function build() {
    const me_kp = CATALOG.find(k => k.id === PAGE_ID);
    const subj = me_kp ? SUBJECTS[me_kp.subject] : null;
    const _pf = me_kp && (me_kp.profile || me_kp.track);
    const tparam = _pf ? ("?track=" + encodeURIComponent(_pf)) : "";

    if (subj) document.documentElement.style.setProperty("--accent-page", subj.color);

    /* ---- 面包屑 ---- */
    const bc = document.querySelector("[data-breadcrumb]");
    if (bc && me_kp) {
      bc.innerHTML =
        `<a href="${ROOT}index.html${tparam}">🏠 学习中心</a>` +
        `<span class="sep">›</span>` +
        `<a href="${ROOT}index.html${tparam}">${subj ? subj.icon + " " + subj.name : ""}</a>` +
        `<span class="sep">›</span><span>${me_kp.category || ""}</span>` +
        `<span class="sep">›</span><span class="cur">${me_kp.title}</span>`;
    }

    /* ---- 头部 meta（若页面留了占位） ---- */
    const kicker = document.querySelector("[data-kicker]");
    if (kicker && me_kp) kicker.textContent =
      `${subj ? subj.name : ""} · ${me_kp.category || ""}`;
    const metaRow = document.querySelector("[data-meta]");
    if (metaRow && me_kp) {
      const dots = "●".repeat(me_kp.difficulty || 1) + "○".repeat(3 - (me_kp.difficulty || 1));
      metaRow.innerHTML =
        `<span>${TYPE_ICON[me_kp.type] || ""} ${me_kp.type || ""}</span> · ` +
        `<span>难度 ${dots}</span> · <span>更新于 ${me_kp.date || ""}</span>`;
    }

    /* ---- 相关知识点 ---- */
    const rel = document.querySelector("[data-related]");
    if (rel && me_kp) {
      const ids = new Set();
      (me_kp.related || []).forEach(id => ids.add(id));
      // 自动补充同科目同分类的兄弟
      CATALOG.filter(k => k.id !== PAGE_ID && k.subject === me_kp.subject &&
                          k.category === me_kp.category)
             .forEach(k => ids.add(k.id));
      const list = [...ids].map(id => CATALOG.find(k => k.id === id)).filter(Boolean).slice(0, 6);

      if (list.length === 0) {
        rel.closest(".related")?.remove();
      } else {
        rel.innerHTML = "";
        list.forEach(k => {
          const s = SUBJECTS[k.subject] || { color: "#888", name: "" };
          const a = document.createElement("a");
          a.href = ROOT + k.path;
          a.style.setProperty("--rc", s.color);
          a.innerHTML = `<b>${k.title}</b><span>${s.name} · ${k.category || ""}</span>`;
          rel.appendChild(a);
        });
      }
    }

    /* ---- 返回首页按钮路径修正（带上当前学习空间） ---- */
    document.querySelectorAll("[data-home]").forEach(a => a.href = ROOT + "index.html" + tparam);
  }

  /* ---- MathJax 注入（公式渲染，需联网；离线则显示原文） ---- */
  function loadMathJax() {
    if (document.querySelector('script[data-mathjax]')) return;
    window.MathJax = {
      tex: { inlineMath: [["$", "$"], ["\\(", "\\)"]],
             displayMath: [["$$", "$$"], ["\\[", "\\]"]] },
      svg: { fontCache: "global" },
      options: { skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"] }
    };
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
    s.async = true; s.setAttribute("data-mathjax", "1");
    document.head.appendChild(s);
  }

  function start() { build(); loadMathJax(); }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", start);
  else start();
})();
