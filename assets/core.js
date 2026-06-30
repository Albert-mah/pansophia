/* =============================================================
 *  万象学院 Pansophia · 核心逻辑(框架无关)
 * -------------------------------------------------------------
 *  纯逻辑 + 数据访问,不碰 DOM/React。被 React 组件(app.js/screens.js)
 *  调用。数据源 = 静态全局(data/*.js) + StudyHub(common.js,localStorage,
 *  Phase2 接 /api)。计划引擎 autoSchedule 也在这。
 * ============================================================= */
window.Core = (function () {
  var SH = window.StudyHub;
  var SUBJECTS = window.STUDY_SUBJECTS || {};
  var SCOPES = window.STUDY_SCOPES || {};
  var CATS = window.STUDY_CATEGORIES || [];
  var DISC_CN = window.STUDY_DISCIPLINES || [];
  var DISC_INTL = window.STUDY_DISCIPLINES_INTL || [];
  var PROGRAMS = window.STUDY_PROGRAMS || {};
  var SKELETON = window.STUDY_SKELETON || [];
  var CATALOG = window.STUDY_CATALOG || [];
  var HEAT_COLORS = ["#F1E7D4", "#E7C99B", "#D29A4E", "#B6532F"];
  var SLOTS = ["上午", "下午", "晚上"];
  var DIFF_MIN = { 1: 25, 2: 40, 3: 60 };   // 难度→预估分钟

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function qsGet(k) { try { return new URLSearchParams(location.search).get(k); } catch (e) { return null; } }
  function setUrl(patch) {
    try {
      var u = new URL(location.href);
      Object.keys(patch).forEach(function (k) { if (patch[k] == null) u.searchParams.delete(k); else u.searchParams.set(k, patch[k]); });
      history.replaceState(null, "", u);
    } catch (e) {}
  }
  function uniqBy(arr, keyFn) { var seen = {}, out = []; arr.forEach(function (x) { var k = keyFn(x); if (!seen[k]) { seen[k] = 1; out.push(x); } }); return out; }

  /* ---------------- 用户 ---------------- */
  // 数据库是唯一真源:启动 hydrate 拉全量到 _cache,读走缓存(同步),写直达 /api。
  var WRITE_TOKEN = "d85e481b481f378817ba5fc33de9a6b0";   // 公开写 token(仅写)
  var _cache = {};       // 当前用户状态缓存(从 DB 水合)
  var _users = null;     // 用户列表缓存(从 DB)
  var _curKey = null;    // 已水合的用户 key
  var _materials = [];   // 全部课本/教材(从 DB,供"自动默认课本")

  function apiGet(path) { return fetch(path, { headers: { "Accept": "application/json" } }).then(function (r) { return r.json(); }); }
  function postState(user, name, value) {
    return fetch("/api/state", { method: "POST", keepalive: true, headers: { "Content-Type": "application/json", "X-Write-Token": WRITE_TOKEN }, body: JSON.stringify({ user: user, name: name, value: value }) }).catch(function () { });
  }
  function uploadFile(name, mime, dataB64) {
    return fetch("/api/upload", { method: "POST", headers: { "Content-Type": "application/json", "X-Write-Token": WRITE_TOKEN }, body: JSON.stringify({ user: _curKey || userKey(), name: name, mime: mime, data: dataB64 }) }).then(function (r) { return r.json(); }).catch(function () { return { ok: false }; });
  }
  function fileUrl(id) { return "/api/file?id=" + encodeURIComponent(id); }
  function apiPost(path, body) { return fetch(path, { method: "POST", headers: { "Content-Type": "application/json", "X-Write-Token": WRITE_TOKEN }, body: JSON.stringify(body) }).then(function (r) { return r.json(); }).catch(function () { return { ok: false }; }); }
  // 本地资料库(名校培养方案正文快照)
  function libList(discId) { return apiGet("/api/lib?disc=" + encodeURIComponent(discId)).then(function (r) { return (r && r.items) || []; }).catch(function () { return []; }); }
  function libItem(id) { return apiGet("/api/lib?id=" + encodeURIComponent(id)).then(function (r) { return (r && r.item) || null; }).catch(function () { return null; }); }
  function cacheUrl(o) { return apiPost("/api/cache", o); }
  function rememberKey(k) { try { localStorage.setItem("studyhub.track", k); } catch (e) {} }
  function rememberedKey() { try { return localStorage.getItem("studyhub.track"); } catch (e) { return null; } }

  function seedUsers() { return (window.STUDY_USERS || []).slice(); }
  function users() { return (_users && _users.length) ? _users : seedUsers(); }
  function userKey() {
    var us = users(), has = function (k) { return us.some(function (u) { return u.key === k; }); };
    var q = qsGet("user") || qsGet("track"); if (q && has(q)) return q;
    var s = rememberedKey(); if (s && has(s)) return s;
    var host = (location.hostname || "").toLowerCase();
    var hit = us.filter(function (u) { return (u.hosts || []).some(function (h) { return host === h || host.indexOf(h) === 0; }); })[0];
    if (hit) return hit.key;
    return us[0] ? us[0].key : "siyu";
  }
  function user() { var k = userKey(); return users().filter(function (u) { return u.key === k; })[0] || { key: k, name: k, icon: "🙂", color: "#B6532F" }; }
  // 姓名 → 头像首字母(两词取首字母 / 单拉丁词取前两位 / 中文取前两字)
  function initials(name) {
    name = String(name || "").trim(); if (!name) return "?";
    var w = name.split(/\s+/);
    if (w.length >= 2) return (w[0].charAt(0) + w[1].charAt(0)).toUpperCase();
    return /^[A-Za-z]/.test(name) ? name.slice(0, 2).toUpperCase() : name.slice(0, 2);
  }

  // 水合:拉用户列表 + 当前用户全部状态。app 在启动/切换用户时 await。
  function hydrate() {
    return apiGet("/api/users").then(function (r) { if (r && r.ok && r.users && r.users.length) _users = r.users; }).catch(function () {})
      .then(function () { var k = userKey(); _curKey = k; return apiGet("/api/state?user=" + encodeURIComponent(k)); })
      .then(function (r) { _cache = (r && r.ok && r.state) ? r.state : {}; })
      .then(function () { return apiGet("/api/materials").then(function (r) { _materials = (r && r.items) || []; }).catch(function () {}); })
      .then(function () { try { migrateCourses(); } catch (e) {} })   // 旧 disc[] → mycourses 一次性迁移
      .catch(function () { _cache = {}; });
  }
  function switchUser(k) { rememberKey(k); setUrl({ user: k }); }   // app 切换后会再 hydrate
  // 新增用户:先建 DB 行,成功后回 key(app 再 switch+hydrate)
  function addUser(name) {
    name = (name || "").trim(); if (!name) return Promise.resolve(null);
    var palette = ["#B6532F", "#C8852E", "#6E7A4F", "#9c7a3d", "#5e6b6e"];
    var body = { name: name, icon: initials(name), color: palette[(users().length) % palette.length], blurb: "新学习者" };
    return fetch("/api/users", { method: "POST", headers: { "Content-Type": "application/json", "X-Write-Token": WRITE_TOKEN }, body: JSON.stringify(body) })
      .then(function (r) { return r.json(); })
      .then(function (r) { if (r && r.ok && r.key) { if (_users) _users.push(Object.assign({ key: r.key }, body)); return r.key; } return null; })
      .catch(function () { return null; });
  }

  function refreshUsers() { return apiGet("/api/users").then(function (r) { if (r && r.ok && r.users) _users = r.users; return _users; }).catch(function () { return _users; }); }
  function saveUser(u) { return apiPost("/api/users", { key: u.key, name: u.name, icon: u.icon, color: u.color, blurb: u.blurb }).then(function (r) { return refreshUsers().then(function () { return r; }); }); }
  function deleteUser(key) { return apiPost("/api/users/delete", { key: key }).then(function (r) { return refreshUsers().then(function () { return r; }); }); }

  // 给 AI 导师的异步留言箱(只写库,CLI agent 自行轮询处理;不直连 CLI)
  function fetchMessages() { return apiGet("/api/messages?user=" + encodeURIComponent(userKey())).then(function (r) { return (r && r.messages) || []; }).catch(function () { return []; }); }
  function sendMessage(o) { return apiPost("/api/messages", { user: _curKey || userKey(), kind: (o && o.kind) || "note", text: (o && o.text) || "", context: (o && o.context) || {} }); }
  function messageUpdate(id, patch) { return apiPost("/api/messages/update", Object.assign({ id: id }, patch || {})); }
  // 咨询助教(实时 AI 对话,几轮)+ 收藏回复到知识卡片(= 加星笔记)
  function assistantChat(messages, context) { return apiPost("/api/assistant", { messages: messages || [], context: context || null }); }
  function addCard(body, meta) { body = (body || "").trim(); if (!body) return; var nt = (store("notes", []) || []).slice(); nt.unshift({ title: (meta && meta.title) || body.slice(0, 24), body: body, subject: (meta && meta.subject) || "助教", starred: true, ts: Date.now() }); save("notes", nt); }

  // 题库 / 答题 / 错题本(PG)
  function questionsFor(o) {
    o = o || {}; var qs = [];
    if (o.kp && o.kp.length) qs.push("kp=" + encodeURIComponent(o.kp.slice(0, 80).join(",")));
    if (o.subject) qs.push("subject=" + encodeURIComponent(o.subject));
    if (o.scope) qs.push("scope=" + encodeURIComponent(o.scope));
    if (o.edition) qs.push("edition=" + encodeURIComponent(o.edition));
    qs.push("limit=" + (o.limit || 30));
    return apiGet("/api/questions?" + qs.join("&")).then(function (r) { return (r && r.questions) || []; }).catch(function () { return []; });
  }
  function recordAnswer(o) { return apiPost("/api/answer", { user: _curKey || userKey(), questionId: o.questionId, kp: o.kp || null, correct: !!o.correct, examId: o.examId || null }); }
  // 习题点评:答完每题状态已落库(对/错),学生可「申请 AI 导师点评」→ 待点评 → AI 批改 → 已点评
  function requestReview(o) {
    return apiPost("/api/review", { user: _curKey || userKey(), questionId: o.questionId, kp: o.kp || null, subject: o.subject || null,
      stem: o.stem || "", options: o.options || [], answer: o.answer, chosen: o.chosen == null ? "" : String(o.chosen), correct: !!o.correct, explain: o.explain || "" });
  }
  function reviewsFetch(o) { o = o || {}; var qs = ["user=" + encodeURIComponent(userKey())]; if (o.status) qs.push("status=" + encodeURIComponent(o.status)); return apiGet("/api/reviews?" + qs.join("&")).then(function (r) { return (r && r.reviews) || []; }).catch(function () { return []; }); }
  function runReviews(o) { o = o || {}; return apiPost("/api/review/run", { user: _curKey || userKey(), id: o.id || null, limit: o.limit || 8 }); }
  function wrongbookFetch(o) {
    o = o || {}; var qs = ["user=" + encodeURIComponent(userKey())];
    if (o.subject) qs.push("subject=" + encodeURIComponent(o.subject));
    qs.push("limit=" + (o.limit || 100));
    return apiGet("/api/wrongbook?" + qs.join("&")).then(function (r) { return (r && r.questions) || []; }).catch(function () { return []; });
  }
  // 课程教材 / 课本库
  function materialsFor(disc, scope, edition) {
    var qs = []; if (disc) qs.push("disc=" + encodeURIComponent(disc)); if (scope) qs.push("scope=" + encodeURIComponent(scope)); if (edition) qs.push("edition=" + encodeURIComponent(edition));
    return apiGet("/api/materials?" + qs.join("&")).then(function (r) { return (r && r.items) || []; }).catch(function () { return []; });
  }
  function saveMaterial(o) { return apiPost("/api/materials", o); }
  function deleteMaterial(id) { return apiPost("/api/materials/delete", { id: id }); }
  function cachePdf(id) { return apiPost("/api/material/cachepdf", { id: id }); }   // 下载直链 PDF 进库
  // 课程资料库 / 文件柜(每门课 disc×scope 一组文件)
  function courseFiles(disc, scope) { return apiGet("/api/coursefiles?disc=" + encodeURIComponent(disc) + (scope ? "&scope=" + encodeURIComponent(scope) : "")).then(function (r) { return (r && r.items) || []; }).catch(function () { return []; }); }
  function addCourseFile(o) { return apiPost("/api/coursefiles", o); }
  function cacheCourseFile(id) { return apiPost("/api/coursefiles/cache", { id: id }); }
  function deleteCourseFile(id) { return apiPost("/api/coursefiles/delete", { id: id }); }
  // 自动默认课本:从全部教材里按 学科 + 范围 匹配,挑最权威的一本(官方>权威>AI生成)
  function defaultTextbook(discId, scope) {
    var c = _materials.filter(function (m) { return m.disc_id === discId; });
    if (!c.length) return null;
    var rank = { official: 0, authoritative: 1, generated: 2 };
    var open = function (m) { return m.url || m.file_id; };
    var scoped = c.filter(function (m) { return m.scope === scope; }), gen = c.filter(function (m) { return !m.scope; });
    var scopedOpen = scoped.filter(open), allOpen = c.filter(open);
    // 优先级:本学段+可打开 > 任意可打开 > 本学段 > 无学段 > 全部(尽量让默认课本是能点开的)
    var pool = (scopedOpen.length ? scopedOpen : (allOpen.length ? allOpen : (scoped.length ? scoped : (gen.length ? gen : c)))).slice();
    pool.sort(function (a, b) { return (rank[a.authority] == null ? 3 : rank[a.authority]) - (rank[b.authority] == null ? 3 : rank[b.authority]); });
    var m = pool[0];
    return m ? { materialId: m.id, title: m.title, edition: m.edition || "", authority: m.authority, url: m.url || null, fileId: m.file_id || m.fileId || null, note: m.note || "", auto: true } : null;
  }
  // 每门课的课本:用户选定的优先(user_state.textbooks),否则自动默认
  function courseTextbook(discId, scope) { return ((store("textbooks", {}) || {})[discId + "|" + (scope || "")]) || defaultTextbook(discId, scope); }
  function setCourseTextbook(discId, scope, m) {
    var t = Object.assign({}, store("textbooks", {})), k = discId + "|" + (scope || "");
    if (m) t[k] = { materialId: m.id, edition: m.edition || "", title: m.title, authority: m.authority }; else delete t[k];
    save("textbooks", t);
  }

  /* ---------------- 用户态存储(读缓存 / 写直达 DB) ---------------- */
  function store(name, fallback) { return (_cache && name in _cache && _cache[name] != null) ? _cache[name] : fallback; }
  function save(name, val) { _cache[name] = val; postState(_curKey || userKey(), name, val); }
  /* ---------------- 领取 / 管理:基本单位 = 课程(学科 × 范围) ----------------
     mycourses 存一组 "discId|scope" 键(scope 空串=该学科无大纲的单门课)。
     这是「我的空间」唯一真源;myDiscs/hasDisc 都由它派生。旧版按学科领取(disc[])
     + hiddenc 在 hydrate 里一次性迁移过来。学习记录(掌握/课本/校验)按 discId|scope
     另存,卸载不删,重新领取即恢复。 */
  function courseKey(d, s) { return d + "|" + (s || ""); }
  function myCourses() { return store("mycourses", []) || []; }
  function hasCourse(d, s) { return myCourses().indexOf(courseKey(d, s)) >= 0; }
  function enrollCourse(d, s) { var a = myCourses().slice(), k = courseKey(d, s); if (a.indexOf(k) < 0) { a.push(k); save("mycourses", a); } }
  function unenrollCourse(d, s) { save("mycourses", myCourses().filter(function (x) { return x !== courseKey(d, s); })); }
  function toggleCourse(d, s) { hasCourse(d, s) ? unenrollCourse(d, s) : enrollCourse(d, s); }
  var uninstallCourse = unenrollCourse;   // 卸载 = 退掉这一门(其它范围不受影响)
  // 一个学科可领取的范围:来自考点大纲的 scope 去重;无大纲学科 = 单门(scope=null)
  function courseScopesOf(id) {
    var sk = skeletonForDiscipline(id); if (!sk.length) return [null];
    var seen = {}, out = []; sk.forEach(function (e) { var s = e.scope || null, k = s || ""; if (!(k in seen)) { seen[k] = 1; out.push(s); } });
    return out;
  }
  // 学科级别派生(很多统计/计划按学科聚合):有 ≥1 门课即视为已领取该学科
  function myDiscs() { var seen = {}, out = []; myCourses().forEach(function (k) { var d = k.split("|")[0]; if (d && !(d in seen)) { seen[d] = 1; out.push(d); } }); return out; }
  function hasDisc(id) { return myCourses().some(function (k) { return k.indexOf(id + "|") === 0; }); }
  // 学科级开关(便捷):加 = 领取该学科全部范围;退 = 退掉该学科全部课程
  function toggleDisc(id) {
    if (hasDisc(id)) { save("mycourses", myCourses().filter(function (k) { return k.indexOf(id + "|") !== 0; })); }
    else { var a = myCourses().slice(); courseScopesOf(id).forEach(function (s) { var k = courseKey(id, s); if (a.indexOf(k) < 0) a.push(k); }); save("mycourses", a); }
  }
  // 旧 disc[] + hiddenc → mycourses 一次性迁移(保持迁移前的可见课程不变)
  function migrateCourses() {
    if (store("mycourses", null) != null) return;
    var hid = store("hiddenc", []) || [], out = [];
    (store("disc", []) || []).forEach(function (id) {
      var sk = skeletonForDiscipline(id).filter(courseScopeOK);
      if (!sk.length) { var k0 = courseKey(id, null); if (hid.indexOf(k0) < 0) out.push(k0); return; }
      sk.forEach(function (e) { var k = courseKey(id, e.scope || null); if (hid.indexOf(k) < 0 && out.indexOf(k) < 0) out.push(k); });
    });
    save("mycourses", out);
  }
  // 选课不自动发消息(可能加错/撤回);要导师排课,用户在学科页/留言箱主动发。导师也可直接读 disc 列表聚合。
  function points() { return store("points", { balance: 0, ledger: [] }); }
  function wishlist() { return store("wishlist", []); }
  function notes() { return store("notes", []); }
  function events() { return store("events", []); }
  function progress() { return store("progress", {}); }
  function plan() { return store("plan", null); }              // 首页"今日计划"小清单
  function schedule() { return store("schedule", null); }      // 学习计划(完整日程)
  function goals() { return store("goals", []); }

  function logEvent(ev) {
    var list = events().slice();
    list.push(Object.assign({ ts: Date.now() }, ev));
    if (list.length > 2000) list = list.slice(-2000);
    save("events", list);
  }
  function award(delta, reason, ref) {
    var p = Object.assign({ balance: 0, ledger: [] }, points());
    p.balance = (p.balance || 0) + delta;
    p.ledger = (p.ledger || []).slice();
    p.ledger.unshift({ delta: delta, reason: reason, ref: ref || null, ts: Date.now() });
    if (p.ledger.length > 200) p.ledger = p.ledger.slice(0, 200);
    save("points", p);
  }

  /* =========================================================
   *  等级 + 成就
   * ========================================================= */
  // 学者之路(累计积分进阶,每级带权益)
  var LEVELS = [
    { min: 0,    name: "旁听生", perk: "开启学习之旅" },
    { min: 200,  name: "新学徒", perk: "解锁错题本与生词本" },
    { min: 600,  name: "学子",   perk: "解锁学习计划徽章" },
    { min: 1200, name: "学者",   perk: "解锁大师课试听" },
    { min: 2200, name: "探索者", perk: "点亮学识勋章墙" },
    { min: 3600, name: "学士",   perk: "解锁专题深读" },
    { min: 5500, name: "硕士",   perk: "AI 导师优先备课" },
    { min: 8000, name: "博士",   perk: "万象学院荣誉席" }
  ];
  function levelOf(balance) {
    balance = balance || 0;
    var i = 0; for (var k = 0; k < LEVELS.length; k++) if (balance >= LEVELS[k].min) i = k;
    var cur = LEVELS[i], nx = LEVELS[i + 1] || null;
    return { lvl: i + 1, name: cur.name, perk: cur.perk, cur: cur, next: nx,
      need: nx ? nx.min - balance : 0, pct: nx ? Math.round((balance - cur.min) / (nx.min - cur.min) * 100) : 100 };
  }

  // 难度→倍数 / 深度→倍数(树层级) / 稀缺度(掌握人数,客户端暂置 1,服务端/agent 精修)
  function knowledgeValue(opts) {
    var dm = { 1: 1, 2: 2.5, 3: 5 }[opts.difficulty || 2] || 2.5;
    var depth = opts.depth || 1;        // 1.0–2.0
    var scarce = opts.scarcity || 1;    // 1.0–3.0
    return Math.round(dm * depth * scarce * 4);
  }

  // 成就快照:把当前用户状态汇成一组可判定的数值
  function achStats() {
    var ev = events(), quiz = ev.filter(function (e) { return e.kind === "quiz"; });
    var st = stats(), pts = points(), bal = pts.balance || 0;
    var cats = {}; myDiscs().forEach(function (id) { var d = disciplineById(id); if (d) cats[d.catKey] = 1; });
    var sch = schedule(), sp = sch ? scheduleProgress(sch) : null;
    function hr(ts) { return new Date(ts).getHours(); }
    return {
      bal: bal, streak: st.streak, activeDays: st.activeDays, accuracy: st.accuracy,
      answered: st.answered, cards: st.cards, enrolled: st.enrolled,
      mastered: Object.keys(progress()).length, cats: Object.keys(cats).length,
      quizDone: quiz.length,
      allCorrect: quiz.filter(function (e) { return e.total && e.correct === e.total; }).length,
      totalCorrect: quiz.reduce(function (a, e) { return a + (e.correct || 0); }, 0),
      hasPlan: sch ? 1 : 0, planPct: sp ? sp.pct : 0, planDone: sp ? sp.done : 0,
      wishlist: wishlist().length,
      night: ev.some(function (e) { var h = hr(e.ts); return h >= 23 || h < 5; }) ? 1 : 0,
      early: ev.some(function (e) { var h = hr(e.ts); return h >= 5 && h < 7; }) ? 1 : 0
    };
  }
  // 成就定义:val(s) 取当前值,target 达标即解锁;pts 解锁奖励分
  var ACHIEVEMENTS = [
    { id: "first-step",  icon: "🌱", name: "第一步",   desc: "加入第一门学科",        tier: "bronze", pts: 10,  target: 1,   val: function (s) { return s.enrolled; } },
    { id: "explorer",    icon: "🧭", name: "博览者",   desc: "加入 5 门学科",         tier: "silver", pts: 30,  target: 5,   val: function (s) { return s.enrolled; } },
    { id: "polymath",    icon: "🌐", name: "通才",     desc: "涉猎 4 大门类",         tier: "gold",   pts: 60,  target: 4,   val: function (s) { return s.cats; } },
    { id: "first-quiz",  icon: "✏️", name: "小试牛刀", desc: "完成第一套测验",        tier: "bronze", pts: 10,  target: 1,   val: function (s) { return s.quizDone; } },
    { id: "sharp",       icon: "🎯", name: "百发百中", desc: "一套测验全部答对",      tier: "silver", pts: 25,  target: 1,   val: function (s) { return s.allCorrect; } },
    { id: "q100",        icon: "📚", name: "题海初渡", desc: "累计答对 100 题",       tier: "gold",   pts: 50,  target: 100, val: function (s) { return s.totalCorrect; } },
    { id: "streak3",     icon: "🔥", name: "小火苗",   desc: "连续学习 3 天",         tier: "bronze", pts: 15,  target: 3,   val: function (s) { return s.streak; } },
    { id: "streak7",     icon: "🔥", name: "七日之约", desc: "连续学习 7 天",         tier: "silver", pts: 40,  target: 7,   val: function (s) { return s.streak; } },
    { id: "streak30",    icon: "🏔️", name: "铁人",     desc: "连续学习 30 天",        tier: "gold",   pts: 120, target: 30,  val: function (s) { return s.streak; } },
    { id: "first-master",icon: "💎", name: "融会贯通", desc: "掌握第一个知识点",      tier: "bronze", pts: 15,  target: 1,   val: function (s) { return s.mastered; } },
    { id: "master20",    icon: "🧠", name: "积少成多", desc: "掌握 20 个知识点",      tier: "silver", pts: 50,  target: 20,  val: function (s) { return s.mastered; } },
    { id: "master60",    icon: "🎓", name: "学贯古今", desc: "掌握 60 个知识点",      tier: "gold",   pts: 120, target: 60,  val: function (s) { return s.mastered; } },
    { id: "planner",     icon: "🗺️", name: "运筹帷幄", desc: "制定一份学习计划",      tier: "bronze", pts: 15,  target: 1,   val: function (s) { return s.hasPlan; } },
    { id: "plan-half",   icon: "⛳", name: "渐入佳境", desc: "学习计划完成过半",      tier: "silver", pts: 35,  target: 50,  val: function (s) { return s.planPct; } },
    { id: "note10",      icon: "🗂️", name: "集卡人",   desc: "收藏 10 张知识卡",      tier: "silver", pts: 25,  target: 10,  val: function (s) { return s.cards; } },
    { id: "pts1000",     icon: "⬡", name: "千分学者", desc: "积分达到 1000",         tier: "gold",   pts: 0,   target: 1000,val: function (s) { return s.bal; } },
    { id: "wish3",       icon: "✦", name: "求知若渴", desc: "许下 3 个学习愿望",     tier: "bronze", pts: 10,  target: 3,   val: function (s) { return s.wishlist; } },
    { id: "night-owl",   icon: "🦉", name: "夜猫子",   desc: "深夜(23–5 点)学习一次", tier: "bronze", pts: 10,  target: 1,   val: function (s) { return s.night; } },
    { id: "early-bird",  icon: "🐦", name: "早起鸟",   desc: "清晨(5–7 点)学习一次", tier: "bronze", pts: 10,  target: 1,   val: function (s) { return s.early; } }
  ];
  function evalAchievements() {
    var s = achStats(), map = store("achievements", {});
    return ACHIEVEMENTS.map(function (a) {
      var cur = a.val(s) || 0;
      return Object.assign({}, a, { cur: Math.min(cur, a.target), raw: cur, unlocked: cur >= a.target, at: map[a.id] || null });
    });
  }
  // 找新解锁的:记录时间戳 + 发奖励分,返回新解锁数组(用于弹窗)
  function checkAchievements() {
    var s = achStats(), map = Object.assign({}, store("achievements", {})), fresh = [];
    ACHIEVEMENTS.forEach(function (a) {
      var cur = a.val(s) || 0;
      if (cur >= a.target && !map[a.id]) { map[a.id] = Date.now(); fresh.push(a); }
    });
    if (fresh.length) { save("achievements", map); fresh.forEach(function (a) { if (a.pts) award(a.pts, "成就解锁 · " + a.name, "ach:" + a.id); }); }
    return fresh;
  }

  // 掌握/取消掌握一个知识点(效果驱动:这是"掌握了哪些知识"的记录)。首次掌握发价值分。
  function isMastered(ref) { return !!progress()[ref]; }
  function setMastery(ref, on, meta) {
    meta = meta || {};
    var pr = Object.assign({}, progress());
    if (on) {
      if (!pr[ref]) {
        pr[ref] = { ts: Date.now(), mastery: 1, title: meta.title || "", subject: meta.subject || "", disc: meta.disc || "" };
        save("progress", pr);
        logEvent({ kind: "master", subject: meta.subject || "", label: meta.title || ref });
        var val = knowledgeValue({ difficulty: meta.difficulty || 2, depth: meta.depth || 1, scarcity: 1 });
        award(val, "掌握知识点 · " + (meta.title || ref), "kp:" + ref);
        return { mastered: true, value: val };
      }
    } else if (pr[ref]) { delete pr[ref]; save("progress", pr); return { mastered: false }; }
    return { mastered: !!pr[ref] };
  }

  /* ---------------- 知识体系树 ---------------- */
  function groupItems(groups, t1list, idlist, customOnly) {
    var out = [];
    groups.forEach(function (g) {
      var match = customOnly ? !!g.custom : (t1list ? t1list.some(function (t) { return (g.t1 || "").indexOf(t) >= 0; }) : false);
      (g.items || []).forEach(function (it) {
        if (match || (idlist && idlist.indexOf(it.id) >= 0)) {
          var item = Object.assign({ t1: g.t1, _icon: g.icon }, it);
          var ov = (window.STUDY_SUB_OVERRIDES || {})[it.id];   // 批次④ 去重校订
          if (ov && ov.length) item.sub = ov;
          out.push(item);
        }
      });
    });
    return out;
  }
  function catDisciplines(cat) {
    var from = cat.from || {}, items = [];
    if (from.intl) items = items.concat(groupItems(DISC_INTL, from.intl, null, false));
    if (from.cn) items = items.concat(groupItems(DISC_CN, from.cn, null, false));
    if (from.cnIds) items = items.concat(groupItems(DISC_CN, null, from.cnIds, false));
    if (from.custom) items = items.concat(groupItems(DISC_CN, null, null, true));
    return uniqBy(items, function (x) { return x.id; });
  }
  function catStats(cat) { var ds = catDisciplines(cat), subs = 0; ds.forEach(function (d) { subs += (d.sub || []).length; }); return { disc: ds.length, subs: subs }; }
  function allDisciplines() {
    var all = [];
    CATS.forEach(function (c) { catDisciplines(c).forEach(function (d) { all.push(Object.assign({ catKey: c.key, catColor: c.color, catName: c.name }, d)); }); });
    return uniqBy(all, function (x) { return x.id; });
  }
  function disciplineById(id) { return allDisciplines().filter(function (d) { return d.id === id; })[0] || null; }
  function categoryOf(id) { var d = disciplineById(id); if (!d) return null; return CATS.filter(function (c) { return c.key === d.catKey; })[0] || null; }
  function programsFor(id) { return PROGRAMS[id] || []; }
  function resourcesFor(id) { return (window.STUDY_DISC_RESOURCES || {})[id] || []; }   // 批次⑤ 现实学科书目/课程

  /* ---------------- skeleton / catalog / 覆盖度 ---------------- */
  function catalogById(id) { return CATALOG.filter(function (k) { return k.id === id; })[0] || null; }
  // 合并同 (subject|scope) 的大纲:topic 按标题并集、point 按标题并集(有 ref 的优先)。
  // 让"无 profile 的共享大纲(初高中/高考各科)"与旧的 profile 大纲(带已填 ref)自然融合。
  function mergeSkeletons(list) {
    var groups = {}, order = [];
    list.forEach(function (e) {
      var key = (e.subject || "") + "|" + (e.scope || "");
      if (!groups[key]) { groups[key] = { profile: e.profile, subject: e.subject, discipline: e.discipline, scope: e.scope, topics: [] }; order.push(key); }
      var g = groups[key];
      if (!g.discipline && e.discipline) g.discipline = e.discipline;
      (e.topics || []).forEach(function (t) {
        var tg = g.topics.filter(function (x) { return x.title === t.title; })[0];
        if (!tg) { tg = { title: t.title, points: [] }; g.topics.push(tg); }
        (t.points || []).forEach(function (p) {
          var pg = tg.points.filter(function (x) { return x.title === p.title; })[0];
          if (!pg) tg.points.push(Object.assign({}, p));
          else if (p.ref && !pg.ref) { pg.ref = p.ref; delete pg.status; }
        });
      });
    });
    return order.map(function (k) { return groups[k]; });
  }
  function skeletonForUser() {
    var k = userKey(), u = user(), subs = (u && u.subjects) || {}, mine = myDiscs();
    var list = SKELETON.filter(function (e) {
      if ((e.profile || e.track) === k) return true;
      if (e.profile || e.track) return false;                                 // 别人的 profile 大纲
      if (e.discipline && mine.indexOf(e.discipline) >= 0) return true;        // 已加入的学科
      if (e.subject && subs[e.subject] && (!e.scope || subs[e.subject].indexOf(e.scope) >= 0)) return true; // 默认科目+范围
      return false;
    });
    return mergeSkeletons(list);
  }
  function skeletonForDiscipline(id) {
    var d = disciplineById(id), subj = d && d.subject, k = userKey();
    var list = SKELETON.filter(function (e) {
      if (e.discipline === id) return true;
      if (subj && e.subject === subj && ((e.profile || e.track) === k || !(e.profile || e.track))) return true;
      return false;
    });
    return mergeSkeletons(list);
  }
  function coverage(entry) {
    var done = 0, total = 0;
    (entry.topics || []).forEach(function (t) { (t.points || []).forEach(function (p) { total++; if (p.ref ? catalogById(p.ref) : p.status === "done") done++; }); });
    return { done: done, total: total, pct: total ? Math.round(done / total * 100) : 0 };
  }
  function categoryProgress() {
    var sk = skeletonForUser(), agg = {};
    sk.forEach(function (e) {
      var cv = coverage(e);
      var ck = (e.discipline && (function () { var d = disciplineById(e.discipline); return d ? d.catKey : null; })()) ||
        (function () { var d = allDisciplines().filter(function (x) { return x.subject === e.subject; })[0]; return d ? d.catKey : null; })();
      if (!ck) return;
      agg[ck] = agg[ck] || { done: 0, total: 0 };
      agg[ck].done += cv.done; agg[ck].total += cv.total;
    });
    return CATS.filter(function (c) { return agg[c.key] && agg[c.key].total; }).map(function (c) {
      var a = agg[c.key];
      return { key: c.key, name: c.name, color: c.color, pct: Math.round(a.done / a.total * 100) };
    });
  }

  /* ---------------- 统计 / 热力图 ---------------- */
  function dayKey(ts) { var d = new Date(ts); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function stats() {
    var ev = events();
    var quiz = ev.filter(function (e) { return e.kind === "quiz" || e.kind === "diagnostic"; });
    var correct = 0, total = 0;
    quiz.forEach(function (e) { correct += (e.correct || 0); total += (e.total || 0); });
    var days = {}; ev.forEach(function (e) { if (e.ts) days[dayKey(e.ts)] = 1; });
    var streak = 0, cur = new Date();
    for (var i = 0; i < 400; i++) {
      var dk = cur.getFullYear() + "-" + (cur.getMonth() + 1) + "-" + cur.getDate();
      if (days[dk]) { streak++; cur.setDate(cur.getDate() - 1); }
      else if (i === 0) { cur.setDate(cur.getDate() - 1); }
      else break;
    }
    return { accuracy: total ? Math.round(correct / total * 100) : null, answered: total, activeDays: Object.keys(days).length, streak: streak, cards: notes().length, enrolled: myDiscs().length };
  }
  function heatmap() {
    var ev = events(), perDay = {};
    ev.forEach(function (e) { if (e.ts) { var k = dayKey(e.ts); perDay[k] = (perDay[k] || 0) + 1; } });
    var out = [], d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - 181);
    for (var i = 0; i < 182; i++) {
      var k = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      var n = perDay[k] || 0, lvl = n === 0 ? 0 : n === 1 ? 1 : n <= 3 ? 2 : 3;
      out.push({ color: HEAT_COLORS[lvl], n: n, day: k });
      d.setDate(d.getDate() + 1);
    }
    return out;
  }

  /* ---------------- 数据分析助手(多维汇总) ---------------- */
  function masteryBySubject() {
    var pr = progress(), m = {};
    Object.keys(pr).forEach(function (k) { var s = pr[k].subject || "其他"; m[s] = (m[s] || 0) + 1; });
    return Object.keys(m).map(function (s) { return { subject: s, count: m[s] }; }).sort(function (a, b) { return b.count - a.count; });
  }
  function recentMastered(n) {
    var pr = progress();
    return Object.keys(pr).map(function (k) { return Object.assign({ ref: k }, pr[k]); })
      .sort(function (a, b) { return (b.ts || 0) - (a.ts || 0); }).slice(0, n || 8);
  }
  function accuracyBySubject() {
    var ev = events().filter(function (e) { return e.kind === "quiz" && e.total; }), m = {};
    ev.forEach(function (e) { var s = (SUBJECTS[e.subject] || {}).name || e.subject || "综合"; var x = m[s] || (m[s] = { c: 0, t: 0 }); x.c += e.correct || 0; x.t += e.total || 0; });
    return Object.keys(m).map(function (s) { return { subject: s, pct: Math.round(m[s].c / m[s].t * 100), total: m[s].t }; }).sort(function (a, b) { return b.total - a.total; });
  }
  function pointsBySource() {
    var lg = (points().ledger) || [], cls = { "知识点": 0, "习题": 0, "成就": 0, "里程碑": 0, "其他": 0 };
    lg.forEach(function (l) {
      if (!(l.delta > 0)) return;
      var r = l.reason || "";
      var k = r.indexOf("掌握") >= 0 ? "知识点" : (r.indexOf("答对") >= 0 || r.indexOf("测验") >= 0) ? "习题" : r.indexOf("成就") >= 0 ? "成就" : (r.indexOf("里程碑") >= 0 || r.indexOf("连续") >= 0) ? "里程碑" : "其他";
      cls[k] += l.delta;
    });
    return cls;
  }
  function eventsByKind() { var ev = events(), m = {}; ev.forEach(function (e) { m[e.kind || "其他"] = (m[e.kind || "其他"] || 0) + 1; }); return m; }
  function fetchOverview() { return apiGet("/api/overview").then(function (r) { return (r && r.ok && r.overview) ? r.overview : []; }).catch(function () { return []; }); }

  /* =========================================================
   *  学习计划引擎
   * ========================================================= */
  function ymd(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function parseYmd(s) { var p = String(s).split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function todayYmd() { var d = new Date(); d.setHours(0, 0, 0, 0); return ymd(d); }
  function addDaysYmd(s, n) { var d = parseYmd(s); d.setDate(d.getDate() + n); return ymd(d); }
  function dateRange(start, end) {
    var out = [], d = parseYmd(start), e = parseYmd(end), guard = 0;
    while (d <= e && guard < 400) { out.push(ymd(d)); d.setDate(d.getDate() + 1); guard++; }
    return out;
  }
  function weekdayCn(s) { return "日一二三四五六"[parseYmd(s).getDay()]; }

  // 从所选学科收集"可学习项"(考点优先,无则用二级方向)
  function buildPlanItems(discIds) {
    var out = [];
    (discIds || []).forEach(function (id) {
      var d = disciplineById(id) || { name: id };
      var sk = skeletonForDiscipline(id);
      if (sk.length) {
        sk.forEach(function (e) {
          var subj = SUBJECTS[e.subject] || {};
          (e.topics || []).forEach(function (t) {
            (t.points || []).forEach(function (p) {
              var kp = p.ref ? catalogById(p.ref) : null;
              var diff = (kp && kp.difficulty) || 2;
              out.push({ title: p.title, topic: t.title, discId: id, discName: d.name, subject: subj.name || e.subject, subjectColor: subj.color || d.catColor || "#9c7a3d", ref: p.ref || null, difficulty: diff, min: DIFF_MIN[diff] || 40, done: !!(p.ref && kp) });
            });
          });
        });
      } else {
        (d.sub || [d.name]).forEach(function (s) {
          out.push({ title: s, topic: d.name, discId: id, discName: d.name, subject: d.catName || "", subjectColor: d.catColor || "#9c7a3d", ref: null, difficulty: 2, min: DIFF_MIN[2], done: false });
        });
      }
    });
    return out;
  }

  // 自动排程:把 items 在 [start,end] 内按每日 dailyMinutes 摊到各天的时间块
  function autoSchedule(opts) {
    var slots = (opts.slots && opts.slots.length) ? opts.slots : SLOTS;
    var dailyMin = opts.dailyMinutes || 90;
    var days = dateRange(opts.start, opts.end);
    var items = buildPlanItems(opts.discIds).filter(function (it) { return !it.done; }); // 已完成的不再排
    var dayObjs = days.map(function (d) { return { date: d, blocks: [], used: 0 }; });
    var unscheduled = [];
    if (dayObjs.length) {
      var di = 0;
      items.forEach(function (it) {
        var placed = false, tries = 0;
        while (tries < dayObjs.length) {
          var day = dayObjs[di];
          if (day.used + it.min <= dailyMin || day.blocks.length === 0) {
            var slot = slots[day.blocks.length % slots.length];
            day.blocks.push({ id: day.date + "#" + day.blocks.length + "#" + Math.floor(it.min) + it.title.length, slot: slot, title: it.title, subject: it.subject, subjectColor: it.subjectColor, discId: it.discId, ref: it.ref, min: it.min, done: false });
            day.used += it.min;
            di = (di + 1) % dayObjs.length;
            placed = true; break;
          } else { di = (di + 1) % dayObjs.length; tries++; }
        }
        if (!placed) unscheduled.push(it);
      });
    } else { unscheduled = items; }
    return {
      goal: opts.goal || "", discIds: opts.discIds || [], start: opts.start, end: opts.end,
      dailyMinutes: dailyMin, slots: slots, createdAt: Date.now(),
      days: dayObjs.map(function (d) { return { date: d.date, blocks: d.blocks }; }),
      unscheduled: unscheduled
    };
  }

  function scheduleProgress(sch) {
    if (!sch) return { total: 0, done: 0, pct: 0, week: 0, behind: 0 };
    var total = 0, done = 0, week = 0, behind = 0, today = todayYmd();
    var weekEnd = addDaysYmd(today, 6);
    (sch.days || []).forEach(function (day) {
      (day.blocks || []).forEach(function (b) {
        total++;
        if (b.done) done++;
        if (day.date >= today && day.date <= weekEnd) week++;
        if (day.date < today && !b.done) behind++;
      });
    });
    return { total: total, done: done, pct: total ? Math.round(done / total * 100) : 0, week: week, behind: behind };
  }

  function saveSchedule(sch) { save("schedule", sch); }
  // 拖拽:把某 block 移动到 (date, slot)
  function moveBlock(sch, blockId, toDate, toSlot) {
    var moving = null;
    sch.days.forEach(function (day) {
      day.blocks = day.blocks.filter(function (b) { if (b.id === blockId) { moving = b; return false; } return true; });
    });
    if (!moving) return sch;
    moving.slot = toSlot;
    var target = sch.days.filter(function (d) { return d.date === toDate; })[0];
    if (!target) { target = { date: toDate, blocks: [] }; sch.days.push(target); sch.days.sort(function (a, b) { return a.date < b.date ? -1 : 1; }); }
    target.blocks.push(moving);
    return sch;
  }
  function toggleBlock(sch, blockId) {
    sch.days.forEach(function (day) { day.blocks.forEach(function (b) { if (b.id === blockId) b.done = !b.done; }); });
    return sch;
  }
  function removeBlock(sch, blockId) {
    sch.days.forEach(function (day) { day.blocks = day.blocks.filter(function (b) { return b.id !== blockId; }); });
    return sch;
  }
  // 任务(完整日历模型:带时间/笔记/子项/附件)—— plan.js(FullCalendar)用
  function tasks() { return store("tasks", []); }
  function saveTasks(a) { save("tasks", a); }
  // 统一待办:今天的任务(有时间的 + 当天无时间 todo;排除循环时间表块)
  function todayTasks() {
    var today = todayYmd();
    return tasks().filter(function (x) { return !x.recur && (x.start || "").slice(0, 10) === today; })
      .sort(function (a, b) { var aa = a.allDay ? 1 : 0, bb = b.allDay ? 1 : 0; if (aa !== bb) return aa - bb; return (a.start || "") < (b.start || "") ? -1 : 1; });
  }
  function addTodo(title, opts) {
    opts = opts || {}; var a = tasks().slice();
    a.push({ id: "t" + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36), title: String(title || "待办").slice(0, 200), subject: opts.subject || "待办", color: opts.color || "#6E7A4F", start: opts.date || todayYmd(), allDay: true, done: false, ref: opts.ref || null, discId: opts.discId || null, notes: "", subItems: [], attachments: [] });
    saveTasks(a);
  }
  // 勾选完成:首次完成给分(挂考点则联动掌握),供主页/计划/详情统一调用
  function toggleTaskDone(id) {
    var a = tasks().slice(), t = a.filter(function (x) { return x.id === id; })[0]; if (!t) return;
    t.done = !t.done;
    if (t.done && !t.awarded) {
      if (t.ref) setMastery(t.ref, true, { title: t.title, subject: t.subject, disc: t.discId });
      else { award(5, "完成待办 · " + (t.title || ""), "task:" + id + ":" + Date.now()); logEvent({ kind: "task", subject: t.subject || "", label: t.title || "" }); }
      t.awarded = true;
    }
    saveTasks(a);
  }
  function planProgress() {
    var t = tasks(), done = 0, today = todayYmd(), week = 0, behind = 0;
    var wkEnd = addDaysYmd(today, 6);
    t.forEach(function (x) {
      if (x.done) done++;
      var d = (x.start || "").slice(0, 10);
      if (d >= today && d <= wkEnd) week++;
      if (d && d < today && !x.done) behind++;
    });
    return { total: t.length, done: done, pct: t.length ? Math.round(done / t.length * 100) : 0, week: week, behind: behind };
  }

  // 本周一 + 一张空白计划(进入计划页默认就有,直接往格子里加任务)
  function mondayYmd() { var d = new Date(); d.setHours(0, 0, 0, 0); var w = d.getDay(); d.setDate(d.getDate() + (w === 0 ? -6 : 1 - w)); return ymd(d); }
  function blankSchedule(weeks) { var s = mondayYmd(); return { goal: "我的学习计划", start: s, end: addDaysYmd(s, (weeks || 4) * 7 - 1), dailyMinutes: 0, slots: SLOTS, createdAt: Date.now(), days: [], unscheduled: [] }; }
  function addBlock(sch, date, slot, block) {
    var day = (sch.days || []).filter(function (d) { return d.date === date; })[0];
    if (!day) { day = { date: date, blocks: [] }; sch.days.push(day); sch.days.sort(function (a, b) { return a.date < b.date ? -1 : 1; }); }
    block.slot = slot; block.id = block.id || (date + "#m" + slot + day.blocks.length + "#" + Date.now());
    day.blocks.push(block); return sch;
  }

  /* =========================================================
   *  进度推荐(百分比节奏)—— 不锁死每日日历,给"最低进度推荐",自己掌握节奏
   * ========================================================= */
  function hms(min) { return pad(Math.floor(min / 60) % 24) + ":" + pad(min % 60) + ":00"; }
  function kpKey(p) { return (p && (p.ref || p.title)) || ""; }   // 与课程页标记掌握同键
  // 某学科在某范围(gaokao/chuzhong/无)的全部考点(共享大纲,去重)
  function disciplinePoints(discId, scope) {
    var d = disciplineById(discId), subj = d && d.subject;
    var list = SKELETON.filter(function (e) {
      if (e.profile || e.track) return false;                 // 仅无 profile 的共享大纲
      if (scope && e.scope && e.scope !== scope) return false;
      return e.discipline === discId || (subj && e.subject === subj);
    });
    var pts = [];
    mergeSkeletons(list).forEach(function (e) {
      (e.topics || []).forEach(function (t) { (t.points || []).forEach(function (p) { pts.push({ title: p.title, ref: p.ref || null, topic: t.title }); }); });
    });
    return pts;
  }
  function subjectMastery(discId, scope) {
    var pts = disciplinePoints(discId, scope), pr = progress(), m = 0;
    pts.forEach(function (p) { if (pr[kpKey(p)]) m++; });
    return { total: pts.length, mastered: m, pct: pts.length ? Math.round(m / pts.length * 100) : 0 };
  }
  // 给定 checkpoints([{date,pct}]),插值出某天的"最低推荐 %"(start 处为 0)
  function recommendedPct(sch, cps, dateYmd) {
    var pts = [{ date: sch.start, pct: 0 }].concat((cps || []).slice());
    pts.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    if (dateYmd <= pts[0].date) return 0;
    if (dateYmd >= pts[pts.length - 1].date) return pts[pts.length - 1].pct;
    for (var i = 0; i < pts.length - 1; i++) {
      if (dateYmd >= pts[i].date && dateYmd <= pts[i + 1].date) {
        var a = pts[i], b = pts[i + 1], span = (parseYmd(b.date) - parseYmd(a.date)) || 1;
        return Math.round(a.pct + (b.pct - a.pct) * ((parseYmd(dateYmd) - parseYmd(a.date)) / span));
      }
    }
    return pts[pts.length - 1].pct;
  }
  // 面板用:每科 实时掌握% vs 今天推荐%,判 领先/按计划/落后
  function paceRows(sch) {
    if (!sch || !sch.pace) return [];
    var today = todayYmd();
    return sch.pace.map(function (e) {
      var d = disciplineById(e.discId) || { name: e.title || e.discId };
      var name = e.title || d.name, color = e.color || d.catColor || "#9c7a3d";
      if (e.track === false) return { discId: e.discId, name: name, track: false, note: e.note || "", color: color };
      var sm = subjectMastery(e.discId, e.scope);
      var rec = (sch.auto !== false) ? recommendedPct(sch, e.checkpoints, today) : null;
      var status = rec == null ? null : (sm.pct >= rec + 5 ? "ahead" : (sm.pct < rec - 5 ? "behind" : "on"));
      return { discId: e.discId, name: name, track: true, total: sm.total, mastered: sm.mastered, pct: sm.pct, recPct: rec, status: status, color: color, scope: e.scope || null };
    });
  }
  // 自动百分比:按周期长度均匀生成"最低进度" checkpoints(单科,供循环事件「推荐进度」用)
  function paceCheckpoints(start, end) {
    var curve = [0.25, 0.5, 0.75, 1], top = [25, 50, 75, 90];
    var spanDays = Math.max(1, Math.round((parseYmd(end) - parseYmd(start)) / 86400000));
    return curve.map(function (f, i) { return { date: addDaysYmd(start, Math.round(spanDays * f)), pct: top[i] }; });
  }
  // 自动百分比:按周期长度均匀生成"最低进度" checkpoints
  function buildPace(opts) {
    var start = opts.start, end = opts.end;
    var curve = opts.curve || [0.25, 0.5, 0.75, 1], topPct = opts.topPct || [25, 50, 75, 90];
    var spanDays = Math.max(1, Math.round((parseYmd(end) - parseYmd(start)) / 86400000));
    function ckp() { return curve.map(function (f, i) { return { date: addDaysYmd(start, Math.round(spanDays * f)), pct: topPct[i] }; }); }
    var maintain = opts.maintainIds || [], notes = opts.notes || {}, pace = [];
    (opts.discIds || []).forEach(function (id) {
      if (maintain.indexOf(id) >= 0) return;
      var d = disciplineById(id) || { name: id };
      pace.push({ discId: id, title: d.name, scope: opts.scope || null, track: true, checkpoints: ckp() });
    });
    maintain.forEach(function (id) {
      var d = disciplineById(id) || { name: id };
      pace.push({ discId: id, title: d.name, track: false, note: notes[id] || "日拱一卒,每天稳定推进。" });
    });
    return pace;
  }
  // 每日固定时间表(按科目排时段,不锁考点)—— 生成"循环事件"任务铺满整段周期
  function buildTimetable(opts) {
    var ids = opts.discIds || []; if (!ids.length) return [];
    var budget = (opts.hours || 4) * 60, n = ids.length;
    var per = Math.max(30, Math.min(90, Math.round(budget / n)));
    var caps = [Math.round(budget * 0.4), Math.round(budget * 0.75), budget];   // 上午/到下午/到晚上 累计上限
    var starts = [9 * 60, 14 * 60, 19 * 60], dow = opts.daysOfWeek || [0, 1, 2, 3, 4, 5, 6];
    var out = [], pi = 0, used = 0, acc = 0;
    ids.forEach(function (id, i) {
      var d = disciplineById(id) || { name: id };
      if (pi < 2 && acc + per > caps[pi]) { pi++; used = 0; }
      var s = starts[pi] + used; used += per; acc += per;
      out.push({ id: "tt" + Date.now().toString(36) + i.toString(36), title: d.name, subject: d.name, color: d.catColor || "#9c7a3d", timetable: true, discId: id,
        recur: { daysOfWeek: dow, startTime: hms(s), endTime: hms(s + per), startRecur: opts.start, endRecur: opts.end }, notes: "", subItems: [], attachments: [] });
    });
    return out;
  }
  // "按落后科目填今天":落后优先,各科轮取下一个未掌握考点,铺成今天的任务(可拖)
  function fillTodayFromPace(sch, opts) {
    opts = opts || {}; var today = todayYmd();
    var budget = (opts.hours || sch.dailyHours || 6) * 60, per = 45;
    var rank = { behind: 0, on: 1, ahead: 2 };
    var rows = paceRows(sch).filter(function (r) { return r.track; })
      .sort(function (a, b) { return (rank[a.status] == null ? 1 : rank[a.status]) - (rank[b.status] == null ? 1 : rank[b.status]); });
    var existing = {}; tasks().forEach(function (t) { if ((t.start || "").slice(0, 10) === today) existing[t.title] = 1; });
    var pr = progress();
    var pools = rows.map(function (r) {
      return { row: r, pts: disciplinePoints(r.discId, r.scope).filter(function (p) { return !pr[kpKey(p)] && !existing[p.title]; }), i: 0 };
    }).filter(function (x) { return x.pts.length; });
    if (!pools.length) return 0;
    var picks = [], di = 0, guard = 0;
    while (budget >= per && pools.length && guard < 200) {
      guard++;
      var pool = pools[di % pools.length];
      if (pool.i < pool.pts.length) { picks.push({ row: pool.row, p: pool.pts[pool.i++] }); budget -= per; }
      pools = pools.filter(function (x) { return x.i < x.pts.length; });
      di++;
    }
    if (!picks.length) return 0;
    function slotTime(i) { return i < 3 ? 9 * 60 + i * per : i < 6 ? 14 * 60 + (i - 3) * per : 19 * 60 + (i - 6) * per; }
    var add = picks.map(function (pk, i) {
      var s = slotTime(i);
      return { id: "t" + Date.now().toString(36) + i.toString(36), title: pk.p.title, subject: pk.row.name, color: pk.row.color,
        start: today + "T" + hms(s), end: today + "T" + hms(s + per), done: false, ref: pk.p.ref || pk.p.title, discId: pk.row.discId, notes: "", subItems: [], attachments: [] };
    });
    saveTasks(tasks().concat(add));
    return add.length;
  }

  /* ---------------- 课程枚举(学科×范围,按学习者学段过滤)+ 课本/阶段 ---------------- */
  function userPrefScopes() {
    var set = {}, any = false, sc = schedule();
    if (sc) { if (sc.scope) { set[sc.scope] = 1; any = true; } (sc.pace || []).forEach(function (p) { if (p.scope) { set[p.scope] = 1; any = true; } }); }
    var u = user() || {}, subs = u.subjects || ((window.STUDY_PROFILES || {})[userKey()] || {}).subjects || {};
    Object.keys(subs).forEach(function (s) { (subs[s] || []).forEach(function (x) { set[x] = 1; any = true; }); });
    return any ? set : null;
  }
  function courseScopeOK(e) {
    var pref = userPrefScopes();
    if (!pref) return true;
    if (e.profile && e.profile === userKey()) return true;     // 本人 profile 大纲
    if (!e.scope) return true;
    return !!pref[e.scope];
  }
  // "我的课程" = 显式领取的课程集(mycourses,学科×范围)。HUD/课程表共用,口径一致。
  function coursesForUser() {
    return myCourses().map(function (k) {
      var i = k.indexOf("|"), id = i < 0 ? k : k.slice(0, i), scope = i < 0 ? null : (k.slice(i + 1) || null);
      var dd = disciplineById(id) || { name: id }, cat = categoryOf(id) || {};
      var sk = skeletonForDiscipline(id), entry = null;
      sk.forEach(function (e) { if ((e.scope || null) === scope) entry = e; });
      var pts = 0, mas = 0, les = 0;
      if (entry) (entry.topics || []).forEach(function (t) { (t.points || []).forEach(function (p) { pts++; if (isMastered(p.ref || p.title)) mas++; if (p.ref && catalogById(p.ref)) les++; }); });
      // 二级方向(如 外国语言文学 → 英语 / 新概念英语):大纲显式 dir 优先,否则取 subject 名(仅当与一级学科名明显不同才标)
      var _dn = dd.name || "", _sj = (entry && entry.subject && SUBJECTS[entry.subject]) ? SUBJECTS[entry.subject].name : "";
      var dir = (entry && entry.dir) ? entry.dir : ((_sj && _sj !== _dn && _dn.indexOf(_sj) < 0 && _sj.indexOf(_dn) < 0) ? _sj : "");
      return { discId: id, discName: dd.name, dir: dir, scope: scope, scopeName: (SCOPES[scope] || {}).name || scope || "", color: cat.color || "#C8852E", total: pts, mastered: mas, pct: pts ? Math.round(mas / pts * 100) : 0, lessons: les, textbook: courseTextbook(id, scope), verified: courseVerified(id, scope) };
    });
  }
  // 最终试卷校验过的记录(user_state.verified,键 discId|scope)
  function courseVerified(discId, scope) { return (store("verified", {}) || {})[discId + "|" + (scope || "")] || null; }
  function setCourseVerified(discId, scope, rec) { var v = Object.assign({}, store("verified", {})); v[discId + "|" + (scope || "")] = rec; save("verified", v); }
  // 一门课的阶段:待选课本 → 待规划(有课本无考点) → 学习中 → 待最终校验(考点全过) → 已补上(试卷校验过)
  function coursePhase(c) {
    if (!c.textbook) return "no-book";
    if (!c.total) return "planning";
    if (c.verified) return "done";
    if (c.pct >= 100) return "verify";
    return "learning";
  }

  return {
    esc: esc, uniqBy: uniqBy, SLOTS: SLOTS, HEAT_COLORS: HEAT_COLORS, CATS: CATS, SUBJECTS: SUBJECTS, SCOPES: SCOPES,
    coursesForUser: coursesForUser, courseScopeOK: courseScopeOK, userPrefScopes: userPrefScopes, coursePhase: coursePhase,
    courseVerified: courseVerified, setCourseVerified: setCourseVerified,
    hydrate: hydrate, users: users, user: user, userKey: userKey, switchUser: switchUser, addUser: addUser,
    refreshUsers: refreshUsers, saveUser: saveUser, deleteUser: deleteUser, initials: initials,
    fetchMessages: fetchMessages, sendMessage: sendMessage, messageUpdate: messageUpdate,
    assistantChat: assistantChat, addCard: addCard,
    questionsFor: questionsFor, recordAnswer: recordAnswer, wrongbookFetch: wrongbookFetch,
    requestReview: requestReview, reviewsFetch: reviewsFetch, runReviews: runReviews,
    materialsFor: materialsFor, saveMaterial: saveMaterial, deleteMaterial: deleteMaterial, cachePdf: cachePdf, courseTextbook: courseTextbook, setCourseTextbook: setCourseTextbook,
    courseFiles: courseFiles, addCourseFile: addCourseFile, cacheCourseFile: cacheCourseFile, deleteCourseFile: deleteCourseFile,
    uploadFile: uploadFile, fileUrl: fileUrl,
    libList: libList, libItem: libItem, cacheUrl: cacheUrl,
    store: store, save: save, myDiscs: myDiscs, hasDisc: hasDisc, toggleDisc: toggleDisc, uninstallCourse: uninstallCourse,
    myCourses: myCourses, hasCourse: hasCourse, enrollCourse: enrollCourse, unenrollCourse: unenrollCourse, toggleCourse: toggleCourse, courseScopesOf: courseScopesOf, courseKey: courseKey,
    points: points, wishlist: wishlist, notes: notes, events: events, progress: progress, plan: plan, schedule: schedule, goals: goals,
    logEvent: logEvent, award: award,
    LEVELS: LEVELS, levelOf: levelOf, knowledgeValue: knowledgeValue,
    ACHIEVEMENTS: ACHIEVEMENTS, evalAchievements: evalAchievements, checkAchievements: checkAchievements,
    setMastery: setMastery, isMastered: isMastered,
    catDisciplines: catDisciplines, catStats: catStats, allDisciplines: allDisciplines,
    disciplineById: disciplineById, categoryOf: categoryOf, programsFor: programsFor, resourcesFor: resourcesFor,
    catalogById: catalogById, skeletonForUser: skeletonForUser, skeletonForDiscipline: skeletonForDiscipline,
    coverage: coverage, categoryProgress: categoryProgress, stats: stats, heatmap: heatmap,
    masteryBySubject: masteryBySubject, recentMastered: recentMastered, accuracyBySubject: accuracyBySubject,
    pointsBySource: pointsBySource, eventsByKind: eventsByKind, fetchOverview: fetchOverview,
    // 计划
    ymd: ymd, parseYmd: parseYmd, todayYmd: todayYmd, addDaysYmd: addDaysYmd, dateRange: dateRange, weekdayCn: weekdayCn,
    buildPlanItems: buildPlanItems, autoSchedule: autoSchedule, scheduleProgress: scheduleProgress,
    saveSchedule: saveSchedule, moveBlock: moveBlock, toggleBlock: toggleBlock, removeBlock: removeBlock,
    mondayYmd: mondayYmd, blankSchedule: blankSchedule, addBlock: addBlock,
    tasks: tasks, saveTasks: saveTasks, planProgress: planProgress, todayTasks: todayTasks, addTodo: addTodo, toggleTaskDone: toggleTaskDone,
    // 进度推荐(百分比节奏)
    kpKey: kpKey, disciplinePoints: disciplinePoints, subjectMastery: subjectMastery,
    recommendedPct: recommendedPct, paceCheckpoints: paceCheckpoints, paceRows: paceRows, buildPace: buildPace, buildTimetable: buildTimetable, fillTodayFromPace: fillTodayFromPace
  };
})();
