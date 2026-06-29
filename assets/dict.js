/* =============================================================
 *  万象学院 · 词典(选中查词)
 * -------------------------------------------------------------
 *  Dict.ensure(cb):像 vocab.js 那样 append <script> 懒加载
 *    data/dict.cedict.js(CC-CEDICT,中→英 + 英→中反查 mini),只加载一次。
 *  Dict.lookup(term) → [{term, reading?, defs:[...]}](中英都能查,查不到返回 [])。
 * ============================================================= */
(function () {
  var VER = "20260630f";
  var loading = false, queue = [];

  function loaded() { return !!window.DICT_CEDICT; }
  function flush() { var q = queue.slice(); queue.length = 0; q.forEach(function (f) { try { f(); } catch (e) {} }); }
  function ensure(cb) {
    if (loaded()) { if (cb) cb(); return; }
    if (cb) queue.push(cb);
    if (loading) return;
    loading = true;
    var s = document.createElement("script");
    s.src = "data/dict.cedict.js?v=" + VER;
    s.onload = function () { loading = false; flush(); };
    s.onerror = function () { loading = false; flush(); };
    document.head.appendChild(s);
  }

  function hasCJK(s) { return /[㐀-鿿豈-﫿]/.test(s); }

  function lookup(term) {
    term = String(term || "").trim();
    if (!term) return [];
    var D = window.DICT_CEDICT || {}, E = window.DICT_EN || {};
    if (hasCJK(term)) {
      var hit = D[term];
      if (hit) return hit.map(function (e) { return { term: term, reading: e.pinyin, defs: e.defs }; });
      // 短语未收录 → 逐字兜底
      var chars = Array.from(term), out = [];
      if (chars.length > 1) {
        chars.forEach(function (c) { var h = D[c]; if (h && h[0]) out.push({ term: c, reading: h[0].pinyin, defs: h[0].defs }); });
      }
      return out;
    }
    var key = term.toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g, "");
    var le = E[key];
    if (le && le.length) return [{ term: key, defs: le }];
    return [];
  }

  window.Dict = { ensure: ensure, lookup: lookup, loaded: loaded };
})();
