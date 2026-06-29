/* =============================================================
 *  学习中心 · 公共层 (StudyHub)
 * -------------------------------------------------------------
 *  提供给首页 / 检测页共用的两件事：
 *   1) 当前「学习空间」(track) 的判定（URL > 域名 > 记忆 > 第一个）
 *   2) localStorage 读写（按 track 命名空间隔离）
 *
 *  纯前端、离线可用。将来若上 SQLite，只需把 load/save 换成
 *  请求后端接口即可，调用方不用改 —— 这就是预留的升级口。
 * ============================================================= */
window.StudyHub = (function () {
  const TRACKS = window.STUDY_TRACKS || {};
  const LS_TRACK = "studyhub.track";
  const keys = () => Object.keys(TRACKS);

  // 上报用的写 token（公开值，仅用于写入；读取记录要另一把密钥，不在前端）
  const API_WRITE_TOKEN = "d85e481b481f378817ba5fc33de9a6b0";

  /* 判定当前学习空间 */
  function resolveTrack() {
    // 1) URL ?track= 显式指定
    try {
      const u = new URLSearchParams(location.search).get("track");
      if (u && TRACKS[u]) return u;
    } catch (e) {}
    // 2) 域名匹配（Jiahuan打开自己的子域名 → 落到他的空间）
    const host = (location.hostname || "").toLowerCase();
    if (host) {
      for (const k of keys()) {
        const hs = TRACKS[k].hosts || [];
        if (hs.some(h => host === h || host.startsWith(h + ".") || host.startsWith(h))) return k;
      }
    }
    // 3) 上次手动选择
    try {
      const saved = localStorage.getItem(LS_TRACK);
      if (saved && TRACKS[saved]) return saved;
    } catch (e) {}
    // 4) 兜底：第一个空间
    return keys()[0];
  }

  function rememberTrack(k) {
    try { if (TRACKS[k]) localStorage.setItem(LS_TRACK, k); } catch (e) {}
  }

  /* ---- 按 track 命名空间的本地存储 ---- */
  const nsKey = (track, name) => `studyhub.${track}.${name}`;
  function load(track, name, fallback) {
    try {
      const raw = localStorage.getItem(nsKey(track, name));
      return raw == null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function save(track, name, value) {
    try { localStorage.setItem(nsKey(track, name), JSON.stringify(value)); } catch (e) {}
  }

  /* ---- 中心化上报：把一次练习记录写进服务器 SQLite（fire-and-forget） ---- */
  function logEvent(track, ev) {
    try {
      const body = JSON.stringify(Object.assign({ track: track, ts: Date.now() }, ev));
      return fetch("/api/event", {
        method: "POST", keepalive: true,
        headers: { "Content-Type": "application/json", "X-Write-Token": API_WRITE_TOKEN },
        body: body
      }).then(r => r.ok).catch(() => false);
    } catch (e) { return Promise.resolve(false); }
  }

  /* ---- 首次把本机已有成绩补传到服务器（迁移旧的本地记录，成功才置标记） ---- */
  function migrateOnce(track) {
    try {
      if (localStorage.getItem(nsKey(track, "migrated")) === "1") return;
      const scores = load(track, "scores", []);
      if (!scores.length) { localStorage.setItem(nsKey(track, "migrated"), "1"); return; }
      Promise.all(scores.map(s => logEvent(track, {
        kind: s.type || "quiz", label: s.label || "", correct: s.correct || 0, total: s.total || 0, ts: s.ts
      }))).then(res => {
        if (res.every(Boolean)) localStorage.setItem(nsKey(track, "migrated"), "1");
      });
    } catch (e) {}
  }

  /* ---- 「我的学科」：用户从知识库加入自己空间的学科(存本地) ---- */
  function myDiscs(profile) { return load(profile, "disc", []); }
  function hasDisc(profile, id) { return myDiscs(profile).indexOf(id) >= 0; }
  function addDisc(profile, id) {
    const a = myDiscs(profile);
    if (a.indexOf(id) < 0) { a.push(id); save(profile, "disc", a); }
    return a;
  }
  function removeDisc(profile, id) {
    save(profile, "disc", myDiscs(profile).filter(x => x !== id));
  }

  return {
    TRACKS, resolveTrack, rememberTrack, load, save, nsKey, logEvent, migrateOnce,
    myDiscs, hasDisc, addDisc, removeDisc
  };
})();
