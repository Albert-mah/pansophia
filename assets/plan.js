/* =============================================================
 *  万象学院 · 学习计划(完整任务/活动管理,基于 FullCalendar)
 * -------------------------------------------------------------
 *  月/周/日视图 · 点空白处建任务 · 拖拽/缩放改时间 · 同时段多事项并排
 *  点事件开「任务详情」:改时间、笔记、子任务清单、附件链接、标完成、删除。
 *  任务存 PG(store "tasks");可「✦ 目标自动排」把各科考点自动铺成任务。
 *  FullCalendar 本地内置、进本页才懒加载。覆盖 screens.js 的简版 plan。
 * ============================================================= */
(function () {
  var React = window.React, html = window.html, C = window.Core;
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
  function useApp() { return React.useContext(window.AppCtx); }
  var FC_SRC = "assets/vendor/fullcalendar.global.min.js?v=20260629k";
  var SLOT_TIME = { "上午": 9 * 60, "下午": 14 * 60, "晚上": 19 * 60 };

  function fcLoaded() { return !!(window.FullCalendar && window.FullCalendar.Calendar); }
  function ensureFC(cb) { if (fcLoaded()) return cb(); var s = document.createElement("script"); s.src = FC_SRC; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }

  /* ---------- 任务存储 ---------- */
  function tasks() { return C.tasks(); }
  function saveTasks(a) { C.saveTasks(a); }
  function genId() { return "t" + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36); }
  function addTask(t) { var a = tasks().slice(); t.id = t.id || genId(); a.push(t); saveTasks(a); return t; }
  function updateTask(id, patch) { var a = tasks().map(function (x) { return x.id === id ? Object.assign({}, x, patch) : x; }); saveTasks(a); }
  function removeTask(id) { saveTasks(tasks().filter(function (x) { return x.id !== id; })); }
  function getTask(id) { return tasks().filter(function (x) { return x.id === id; })[0]; }

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function hhmmss(min) { return pad(Math.floor(min / 60) % 24) + ":" + pad(min % 60) + ":00"; }

  function toMin(hhmm) { var p = String(hhmm || "0:0").split(":"); return (+p[0]) * 60 + (+p[1] || 0); }
  function hhmm(min) { return pad(Math.floor(min / 60) % 24) + ":" + pad(min % 60); }

  // 迁移:旧 schedule(slot 块)→ tasks(带时间),仅当 tasks 为空且有 days(进度推荐模型 pace 不迁移)
  function ensureMigrated() {
    if (tasks().length) return;
    var sch = C.schedule(); if (!sch || sch.model === "pace" || !sch.days) return;
    var out = [];
    (sch.days || []).forEach(function (day) {
      var acc = {};
      (day.blocks || []).forEach(function (b) {
        var slot = b.slot || "上午", base = SLOT_TIME[slot] != null ? SLOT_TIME[slot] : 540;
        var s = base + (acc[slot] || 0), dur = b.min || 40; acc[slot] = (acc[slot] || 0) + dur;
        out.push({ id: genId(), title: b.title, subject: b.subject || "", color: b.subjectColor || "#C8852E", start: day.date + "T" + hhmmss(s), end: day.date + "T" + hhmmss(s + dur), done: !!b.done, ref: b.ref || null, discId: b.discId || null, notes: "", subItems: [], attachments: [] });
      });
    });
    if (out.length) saveTasks(out);
  }

  function toEvents() {
    return tasks().map(function (t) {
      var color = t.done ? "#9aa886" : (t.color || "#C8852E");
      if (t.recur) {   // 每天循环事件:FullCalendar 原生 daysOfWeek 重复(无需 rrule 插件)
        return { id: t.id, title: t.title, daysOfWeek: t.recur.daysOfWeek, startTime: t.recur.startTime, endTime: t.recur.endTime,
          startRecur: t.recur.startRecur, endRecur: t.recur.endRecur, backgroundColor: color, borderColor: color, editable: false,
          extendedProps: { recur: true, pace: t.pace || null, discId: t.discId || null } };
      }
      return { id: t.id, title: t.title, start: t.start, end: t.end, allDay: !!t.allDay,
        backgroundColor: color, borderColor: color, classNames: t.done ? ["pan-fc-done"] : [] };
    });
  }

  /* =========================================================
   *  屏幕
   * ========================================================= */
  /* ---------- 今日待办面板(与主页/日历同源 tasks) ---------- */
  function TodayPanel(p) {
    var app = p.app;
    var v0 = useState(""); var val = v0[0], setVal = v0[1];
    var todos = C.todayTasks();
    var done = todos.filter(function (t) { return t.done; }).length;
    function add() { var t = val.trim(); if (!t) return; C.addTodo(t); setVal(""); if (p.onChange) p.onChange(); app.refresh(); }
    function toggle(id) { C.toggleTaskDone(id); if (p.onChange) p.onChange(); app.checkAch(); app.refresh(); }
    return html`<div class="pan-panel" style="position:sticky;top:80px;">
      <div class="pan-sec-h"><h2 style="font-size:16px;">今日待办</h2><span style="font-size:12px;color:#9a8a6f;">${done}/${todos.length}</span></div>
      <div style="display:flex;gap:8px;margin-bottom:10px;">
        <input value=${val} onInput=${function (e) { setVal(e.target.value); }} onKeyDown=${function (e) { if (e.key === "Enter") add(); }} placeholder="加今日待办…" style="flex:1;border:1px solid #EBDEC8;border-radius:8px;padding:8px 10px;font-family:var(--sans);font-size:13px;" />
        <span class="pan-btn ghost sm" onClick=${add}>＋</span></div>
      <div style="display:flex;flex-direction:column;gap:2px;max-height:62vh;overflow:auto;">
        ${todos.length ? todos.map(function (it) {
          var tm = it.allDay ? "待办" : (it.start || "").slice(11, 16);
          return html`<div key=${it.id} class="pan-row" style="display:flex;align-items:center;gap:10px;padding:9px 6px;">
            <div onClick=${function () { toggle(it.id); }} style=${"width:20px;height:20px;border-radius:6px;cursor:pointer;flex-shrink:0;" + (it.done ? "background:#6E7A4F;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;" : "border:2px solid #C8852E;")}>${it.done ? "✓" : ""}</div>
            <div style="flex:1;min-width:0;cursor:pointer;" onClick=${function () { if (p.onOpen) p.onOpen(it); }}><div style=${"font-size:13.5px;font-weight:600;" + (it.done ? "text-decoration:line-through;color:#a8987c;" : "")}>${it.title}</div></div>
            <span style="font-size:11px;color:#9a8a6f;white-space:nowrap;">${tm}</span></div>`;
        }) : html`<div style="font-size:12.5px;color:#9a8a6f;padding:6px 4px;">今天没待办。上面加一条,或在日历拖一段(无时间就成全天待办)。</div>`}
      </div></div>`;
  }

  function PlanScreen() {
    var app = useApp();
    var r0 = useState(fcLoaded()); var ready = r0[0], setReady = r0[1];
    var elRef = useRef(null), calRef = useRef(null);
    var d0 = useState(null); var detail = d0[0], setDetail = d0[1];
    var f0 = useState(false); var showForm = f0[0], setShowForm = f0[1];

    useEffect(function () { if (!ready) ensureFC(function () { setReady(true); }); }, []);
    useEffect(function () {
      if (!ready || !elRef.current || calRef.current) return;
      try { ensureMigrated(); } catch (e) { console.error(e); }
      var cal;
      var _sch = C.schedule(), _t = C.todayYmd();
      var initDate = (_sch && _sch.start && _t < _sch.start) ? _sch.start : _t;   // 计划在未来 → 日历开在计划首周
      try { cal = new window.FullCalendar.Calendar(elRef.current, {
        initialView: "timeGridWeek", initialDate: initDate,
        headerToolbar: { left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay" },
        buttonText: { today: "今天", month: "月", week: "周", day: "日" },
        firstDay: 1, allDaySlot: true, nowIndicator: true, slotMinTime: "06:00:00", slotMaxTime: "24:00:00",
        height: "auto", expandRows: true, slotEventOverlap: true, editable: true, eventResizableFromStart: true,
        selectable: true, selectMirror: true, dayMaxEvents: true,
        events: function (info, success) { success(toEvents()); },
        select: function (info) {
          var title = window.prompt("新建任务(如:复习 牛顿第二定律 / 数学卷 第3题):");
          title = (title || "").trim();
          if (title) { addTask({ title: title, subject: "自定", color: "#9c7a3d", start: info.startStr, end: info.endStr, allDay: info.allDay, done: false, notes: "", subItems: [], attachments: [] }); cal.refetchEvents(); }
          cal.unselect();
        },
        eventDidMount: function (info) {   // 推荐进度的循环事件:在格子里标出"那天最起码 ≥Y% · 你现在 X%"
          var ep = info.event.extendedProps || {};
          if (!ep.pace || !ep.discId) return;
          try {
            var dateY = (info.event.startStr || "").slice(0, 10);
            var rec = C.recommendedPct({ start: ep.pace.start }, ep.pace.checkpoints, dateY);
            var sm = C.subjectMastery(ep.discId, ep.pace.scope);
            var b = info.el.ownerDocument.createElement("div");
            b.className = "pan-fc-pace";
            b.textContent = "最起码≥" + rec + "% · 你" + sm.pct + "%";
            info.el.appendChild(b);
          } catch (e) {}
        },
        eventClick: function (info) { var t = getTask(info.event.id); if (t) setDetail(t); },
        eventDrop: function (info) { updateTask(info.event.id, { start: info.event.startStr, end: info.event.endStr, allDay: info.event.allDay }); },
        eventResize: function (info) { updateTask(info.event.id, { start: info.event.startStr, end: info.event.endStr }); }
      });
      cal.render(); calRef.current = cal;
      } catch (e) { console.error("FullCalendar 初始化失败", e); }
      return function () { try { if (calRef.current) calRef.current.destroy(); } catch (e) {} calRef.current = null; };
    }, [ready]);

    function refetch() { if (calRef.current) calRef.current.refetchEvents(); }
    function onSaveDetail(id, patch) {
      var t = getTask(id) || {};
      var awarded = t.awarded;
      if (patch.done && !t.done && !t.awarded) {     // 首次完成 → 给分 / 联动掌握
        if (t.ref) { C.setMastery(t.ref, true, { title: t.title, subject: t.subject, disc: t.discId }); }
        else { C.award(5, "完成任务 · " + (patch.title || t.title), "task:" + id); C.logEvent({ kind: "task", subject: t.subject || "", label: patch.title || t.title }); }
        awarded = true;
      }
      updateTask(id, Object.assign({}, patch, { awarded: awarded }));
      refetch(); app.checkAch(); setDetail(null);
    }
    function onDeleteDetail(id) { removeTask(id); refetch(); setDetail(null); }
    function onAutoDone() { setShowForm(false); refetch(); app.refresh(); }
    function clearAll() { if (window.confirm("清空全部计划任务?(进度推荐保留)")) { saveTasks([]); refetch(); } }
    function onCourse() { app.go("course"); }
    function onResetPlan() { if (window.confirm("清除当前进度推荐(含每日时间表)?")) { C.save("schedule", null); saveTasks(tasks().filter(function (t) { return !t.timetable; })); refetch(); app.refresh(); } }

    var pp = C.planProgress();
    var sch = C.schedule();

    return html`<div class="pan-screen">
      ${html`<${Crumb} parts=${[{ t: "首页", go: "home" }, { t: "学习计划" }]} />`}
      <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:14px;">
        <div><h1 class="pan-page-h" style="margin:0 0 4px;">学习计划 <span class="en">/ Planner</span></h1>
        <div style="font-size:13px;color:#9a8a6f;">共 ${pp.total} 个任务 · 已完成 ${pp.done}(${pp.pct}%)${pp.behind ? " · 落后 " + pp.behind : ""} · 日历空白处拖选即可建任务</div></div>
        <div style="display:flex;gap:10px;"><span class="pan-btn ghost" onClick=${clearAll}>清空任务</span><span class="pan-btn ink" onClick=${function () { setShowForm(true); }}>✦ 新建计划</span></div>
      </div>

      ${(sch || C.tasks().some(function (t) { return t.pace; })) ? html`<${PacePanel} sch=${sch} onCourse=${onCourse} onReset=${onResetPlan} />` : null}

      <div class="pan-plan-grid" style="display:grid;grid-template-columns:1fr 320px;gap:16px;align-items:start;">
        ${ready ? html`<div class="pan-panel" style="padding:14px 16px;min-width:0;"><div ref=${elRef} class="pan-cal"></div></div>` : html`<div class="pan-empty">正在加载日历组件…</div>`}
        ${html`<${TodayPanel} app=${app} onChange=${function () { refetch(); }} onOpen=${function (t) { setDetail(t); }} />`}
      </div>

      ${detail ? (detail.recur
        ? html`<${RecurDetail} task=${detail} onDelete=${onDeleteDetail} onClose=${function () { setDetail(null); }} />`
        : html`<${TaskDetail} task=${detail} onSave=${onSaveDetail} onDelete=${onDeleteDetail} onClose=${function () { setDetail(null); }} />`) : null}
      ${showForm ? html`<${PlanForm} app=${app} onDone=${onAutoDone} onClose=${function () { setShowForm(false); }} />` : null}
    </div>`;
  }

  /* ---------- 进度推荐面板(最低节奏 + 实时% + 填今天) ---------- */
  function statusChip(st) {
    if (st === "ahead") return html`<span style="color:#3f8a52;font-weight:600;white-space:nowrap;">✓ 领先</span>`;
    if (st === "behind") return html`<span style="color:#b6532f;font-weight:600;white-space:nowrap;">⚠ 落后</span>`;
    if (st === "on") return html`<span style="color:#8a7a62;white-space:nowrap;">· 按计划</span>`;
    return null;
  }
  function PacePanel(p) {
    var sch = p.sch || {}, isPace = sch.model === "pace";
    var rows = isPace ? C.paceRows(sch) : [];
    // 循环事件上勾了「推荐进度」的也并入(按 discId 去重,schedule.pace 优先)
    var have = {}; rows.forEach(function (r) { if (r.discId) have[r.discId] = 1; });
    var today = C.todayYmd();
    C.tasks().forEach(function (t) {
      if (!t.pace || !t.discId || have[t.discId]) return;
      have[t.discId] = 1;
      var sm = C.subjectMastery(t.discId, t.pace.scope);
      var rec = C.recommendedPct({ start: t.pace.start }, t.pace.checkpoints, today);
      rows.push({ discId: t.discId, name: t.title, track: true, total: sm.total, mastered: sm.mastered, pct: sm.pct, recPct: rec, status: (sm.pct >= rec + 5 ? "ahead" : sm.pct < rec - 5 ? "behind" : "on"), color: t.color });
    });
    var hasRows = rows.length > 0;
    if (!hasRows && !sch.overview) return null;
    var behind = rows.filter(function (r) { return r.track && r.status === "behind"; }).map(function (r) { return r.name; });
    return html`<div class="pan-panel" style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;">
        <div style="flex:1;min-width:240px;">
          <div style="font-size:13.5px;color:#9a8a6f;margin-bottom:2px;">${sch.goal || "学习计划"}${sch.start ? " · " + sch.start + " 至 " + sch.end : ""}</div>
          ${sch.overview ? html`<div style="font-size:14px;line-height:1.8;color:#3a3023;">${sch.overview}</div>` : null}
          ${sch.rhythm ? html`<div style="font-size:12.5px;color:#7A6E5E;margin-top:8px;">🕐 ${sch.rhythm}</div>` : null}
        </div>
        ${isPace ? html`<span class="lnk" style="font-size:12px;color:#b09a7a;cursor:pointer;white-space:nowrap;" onClick=${p.onReset}>重设计划</span>` : null}
      </div>
      ${hasRows ? html`<div style="margin-top:14px;">
        <div class="pan-eyebrow" style="margin-bottom:8px;">最低进度推荐 · 每天按时间表上课,考点自己定;达到推荐即可,简单的会了就跳过</div>
        <div style="display:grid;gap:9px;">${rows.map(function (r, i) {
          if (!r.track) return html`<div key=${i} style="display:flex;gap:10px;font-size:13px;color:#7A6E5E;align-items:center;"><span style=${"min-width:52px;color:" + r.color + ";font-weight:600;"}>${r.name}</span><span>${r.note}</span></div>`;
          return html`<div key=${i} style="display:flex;gap:10px;align-items:center;font-size:12.5px;">
            <span style=${"min-width:52px;color:" + r.color + ";font-weight:600;"}>${r.name}</span>
            <div style="flex:1;height:10px;border-radius:5px;background:#EEE3CF;position:relative;overflow:hidden;min-width:80px;">
              <div style=${"position:absolute;left:0;top:0;bottom:0;width:" + r.pct + "%;background:" + r.color + ";border-radius:5px;"}></div>
              ${r.recPct != null ? html`<div style=${"position:absolute;top:-1px;bottom:-1px;width:2px;background:#33291E;left:calc(" + r.recPct + "% - 1px);"} title=${"推荐≥" + r.recPct + "%"}></div>` : null}
            </div>
            <span style="white-space:nowrap;color:#5a4e3c;">你 ${r.pct}%${r.recPct != null ? " · 荐≥" + r.recPct + "%" : ""}<span style="color:#b09a7a;"> (${r.mastered}/${r.total})</span></span>
            ${statusChip(r.status)}
          </div>`;
        })}</div>
        ${behind.length ? html`<div style="margin-top:10px;font-size:12.5px;color:#b6532f;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">⚠ 今天优先补:${behind.join("、")}<span class="lnk" style="color:#B6532F;cursor:pointer;text-decoration:underline;" onClick=${p.onCourse}>去课程页标记掌握 →</span></div>` : null}
      </div>` : null}
      ${(sch.milestones && sch.milestones.length) || (sch.tips && sch.tips.length) ? html`<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:14px;">
        <div>${(sch.milestones && sch.milestones.length) ? html`<div class="pan-eyebrow" style="margin-bottom:6px;">阶段里程碑</div>` : null}${(sch.milestones || []).map(function (m, i) { return html`<div key=${i} style="font-size:12px;color:#7A6E5E;line-height:1.6;margin-bottom:6px;">📍 ${m}</div>`; })}</div>
        <div>${(sch.tips && sch.tips.length) ? html`<div class="pan-eyebrow" style="margin-bottom:6px;">学习建议</div>` : null}${(sch.tips || []).map(function (m, i) { return html`<div key=${i} style="font-size:12px;color:#7A6E5E;line-height:1.6;margin-bottom:6px;">💡 ${m}</div>`; })}</div>
      </div>` : null}
    </div>`;
  }

  /* ---------- 任务详情(笔记 / 子任务 / 附件) ---------- */
  function TaskDetail(p) {
    var t = p.task;
    var s0 = useState({ title: t.title || "", subject: t.subject || "", notes: t.notes || "", start: (t.start || "").slice(0, 16), end: (t.end || "").slice(0, 16), done: !!t.done, subItems: (t.subItems || []).slice(), attachments: (t.attachments || []).slice() });
    var f = s0[0], setF = s0[1];
    var si = useState(""); var siVal = si[0], setSiVal = si[1];
    function set(k, v) { setF(Object.assign({}, f, k === null ? v : (function () { var o = {}; o[k] = v; return o; })())); }
    function addSub() { var v = siVal.trim(); if (!v) return; setF(Object.assign({}, f, { subItems: f.subItems.concat([{ title: v, done: false }]) })); setSiVal(""); }
    function toggleSub(i) { var arr = f.subItems.slice(); arr[i] = Object.assign({}, arr[i], { done: !arr[i].done }); setF(Object.assign({}, f, { subItems: arr })); }
    function rmSub(i) { var arr = f.subItems.slice(); arr.splice(i, 1); setF(Object.assign({}, f, { subItems: arr })); }
    function addAtt() { var name = window.prompt("附件/链接 名称:"); if (!name) return; var url = window.prompt("链接 URL(可空):") || ""; setF(Object.assign({}, f, { attachments: f.attachments.concat([{ name: name, url: url }]) })); }
    function rmAtt(i) { var arr = f.attachments.slice(); arr.splice(i, 1); setF(Object.assign({}, f, { attachments: arr })); }
    function addFile(e) {
      var file = e.target.files && e.target.files[0]; if (!file) return;
      if (file.size > 8 * 1024 * 1024) { window.alert("文件请小于 8MB"); e.target.value = ""; return; }
      var rd = new FileReader();
      rd.onload = function () {
        var b64 = String(rd.result).split(",")[1] || "";
        C.uploadFile(file.name, file.type || "application/octet-stream", b64).then(function (r) {
          if (r && r.ok && r.id) setF(function (prev) { return Object.assign({}, prev, { attachments: prev.attachments.concat([{ name: file.name, fileId: r.id, mime: file.type }]) }); });
          else window.alert("上传失败");
        });
      };
      rd.readAsDataURL(file); e.target.value = "";
    }
    function save() {
      p.onSave(t.id, { title: f.title.trim() || t.title, subject: f.subject, notes: f.notes, start: f.start ? f.start + ":00" : t.start, end: f.end ? f.end + ":00" : t.end, done: f.done, subItems: f.subItems, attachments: f.attachments });
    }
    return html`<div class="pan-modal-mask" onClick=${function (e) { if (e.target.classList.contains("pan-modal-mask")) p.onClose(); }}>
      <div class="pan-modal">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
          <div style=${"width:8px;height:28px;border-radius:4px;background:" + (t.color || "#C8852E") + ";"}></div>
          <input value=${f.title} onInput=${function (e) { set("title", e.target.value); }} style="flex:1;border:none;border-bottom:1.5px solid #EBDEC8;font-size:19px;font-weight:700;font-family:var(--serif);outline:none;padding:4px 2px;background:transparent;" />
          <span onClick=${p.onClose} style="cursor:pointer;color:#9a8a6f;font-size:20px;line-height:1;">×</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
          <label style="font-size:12px;color:#9a8a6f;">开始<input type="datetime-local" value=${f.start} onInput=${function (e) { set("start", e.target.value); }} style="display:block;width:100%;margin-top:4px;border:1px solid #EBDEC8;border-radius:8px;padding:7px;font-family:var(--sans);" /></label>
          <label style="font-size:12px;color:#9a8a6f;">结束<input type="datetime-local" value=${f.end} onInput=${function (e) { set("end", e.target.value); }} style="display:block;width:100%;margin-top:4px;border:1px solid #EBDEC8;border-radius:8px;padding:7px;font-family:var(--sans);" /></label>
        </div>
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:14px;">
          <input value=${f.subject} onInput=${function (e) { set("subject", e.target.value); }} placeholder="科目/标签" style="flex:1;border:1px solid #EBDEC8;border-radius:8px;padding:8px 10px;font-family:var(--sans);font-size:13px;" />
          <label style="display:flex;align-items:center;gap:6px;font-size:13.5px;cursor:pointer;white-space:nowrap;"><input type="checkbox" checked=${f.done} onChange=${function (e) { set("done", e.target.checked); }} /> 已完成</label>
        </div>

        <div class="pan-eyebrow" style="margin-bottom:6px;">📝 学习笔记</div>
        <textarea value=${f.notes} onInput=${function (e) { set("notes", e.target.value); }} placeholder="这次学了什么、卡在哪、要点…" style="width:100%;min-height:80px;border:1px solid #EBDEC8;border-radius:10px;padding:10px;font-family:var(--sans);font-size:13.5px;resize:vertical;outline:none;margin-bottom:14px;background:#FFFDF8;"></textarea>

        <div class="pan-eyebrow" style="margin-bottom:6px;">☑ 子任务</div>
        <div style="margin-bottom:8px;">${f.subItems.length ? f.subItems.map(function (s, i) {
          return html`<div key=${i} style="display:flex;align-items:center;gap:8px;padding:5px 0;"><input type="checkbox" checked=${s.done} onChange=${function () { toggleSub(i); }} /><span style=${"flex:1;font-size:13.5px;" + (s.done ? "text-decoration:line-through;color:#9a8a6f;" : "")}>${s.title}</span><span onClick=${function () { rmSub(i); }} style="cursor:pointer;color:#cbb9a0;">✕</span></div>`;
        }) : html`<div style="font-size:12.5px;color:#9a8a6f;">把任务拆成小步骤,逐个打勾。</div>`}</div>
        <div style="display:flex;gap:8px;margin-bottom:16px;"><input value=${siVal} onInput=${function (e) { setSiVal(e.target.value); }} onKeyDown=${function (e) { if (e.key === "Enter") addSub(); }} placeholder="加一个子任务…" style="flex:1;border:1px solid #EBDEC8;border-radius:8px;padding:7px 10px;font-family:var(--sans);font-size:13px;" /><span class="pan-btn ghost sm" onClick=${addSub}>＋</span></div>

        <div class="pan-eyebrow" style="margin-bottom:6px;">📎 附件 / 链接</div>
        <div style="margin-bottom:8px;">${f.attachments.length ? f.attachments.map(function (a, i) {
          var href = a.fileId ? C.fileUrl(a.fileId) : a.url;
          return html`<div key=${i} style="display:flex;align-items:center;gap:8px;padding:5px 0;font-size:13px;"><span>${a.fileId ? "📄" : "📎"}</span>${href ? html`<a href=${href} target="_blank" rel="noopener" style="flex:1;">${a.name} ↗</a>` : html`<span style="flex:1;">${a.name}</span>`}<span onClick=${function () { rmAtt(i); }} style="cursor:pointer;color:#cbb9a0;">✕</span></div>`;
        }) : html`<div style="font-size:12.5px;color:#9a8a6f;">上传讲义/资料,或挂参考链接。</div>`}</div>
        <div style="margin-bottom:18px;display:flex;gap:8px;align-items:center;">
          <label class="pan-btn ghost sm" style="cursor:pointer;">＋ 上传文件<input type="file" onChange=${addFile} style="display:none;" /></label>
          <span class="pan-btn ghost sm" onClick=${addAtt}>＋ 链接</span></div>

        <div style="display:flex;gap:10px;justify-content:space-between;">
          <span class="pan-btn ghost" style="color:#B6532F;" onClick=${function () { p.onDelete(t.id); }}>删除任务</span>
          <span class="pan-btn ink" onClick=${save}>保存</span>
        </div>
      </div>
    </div>`;
  }

  /* ---------- 每天循环事件 · 详情 ---------- */
  function RecurDetail(p) {
    var t = p.task, r = t.recur || {}, dn = ["日", "一", "二", "三", "四", "五", "六"];
    var days = (r.daysOfWeek || []).slice().sort().map(function (d) { return "周" + dn[d]; }).join("、");
    return html`<div class="pan-modal-mask" onClick=${function (e) { if (e.target.classList.contains("pan-modal-mask")) p.onClose(); }}>
      <div class="pan-modal">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
          <div style=${"width:8px;height:28px;border-radius:4px;background:" + (t.color || "#6E7A4F") + ";"}></div>
          <div style="flex:1;font-size:19px;font-weight:700;font-family:var(--serif);">${t.title}</div>
          <span onClick=${p.onClose} style="cursor:pointer;color:#9a8a6f;font-size:20px;line-height:1;">×</span>
        </div>
        <div style="font-size:13.5px;color:#5a4e3c;line-height:2;margin-bottom:14px;">
          🔁 每天循环事件<br/>时间:${r.startTime}–${r.endTime}<br/>重复:${days || "每天"}<br/>周期:${r.startRecur || "今天"} 起${r.endRecur ? " 至 " + r.endRecur : ""}${t.pace ? html`<br/>📈 推荐进度:今天最起码 ≥${C.recommendedPct({ start: t.pace.start }, t.pace.checkpoints, C.todayYmd())}% · 你已 ${C.subjectMastery(t.discId, t.pace.scope).pct}%` : ""}
        </div>
        <div style="font-size:12.5px;color:#9a8a6f;margin-bottom:16px;">循环事件用来固定习惯(背单词、晨读、错题…),不计入完成度。要改时间请删除后重建。</div>
        <div style="display:flex;justify-content:space-between;">
          <span class="pan-btn ghost" style="color:#B6532F;" onClick=${function () { p.onDelete(t.id); }}>删除循环</span>
          <span class="pan-btn ink" onClick=${p.onClose}>关闭</span>
        </div>
      </div>
    </div>`;
  }

  /* ---------- 新建计划(① 一定周期内 + 自动百分比  ② 每天循环事件) ---------- */
  function PlanForm(p) {
    var mine = C.myDiscs();
    var f0 = useState({
      type: "period", title: "", auto: true, timetable: true, discIds: mine.slice(0, 5), scope: "gaokao",
      start: C.todayYmd(), end: C.addDaysYmd(C.todayYmd(), 30), hours: 4,
      rTitle: "", rColor: "#6E7A4F", rDays: [1, 2, 3, 4, 5, 6, 0], rStart: "19:00", rMin: 30, rFrom: C.todayYmd(), rTo: C.addDaysYmd(C.todayYmd(), 60),
      rDisc: "", rPace: false
    });
    var f = f0[0], setF = f0[1];
    function up(k, v) { var o = {}; o[k] = v; setF(Object.assign({}, f, o)); }
    function toggleDisc(id) { var has = f.discIds.indexOf(id) >= 0; up("discIds", has ? f.discIds.filter(function (x) { return x !== id; }) : f.discIds.concat([id])); }
    function toggleDay(d) { var has = f.rDays.indexOf(d) >= 0; up("rDays", has ? f.rDays.filter(function (x) { return x !== d; }) : f.rDays.concat([d])); }
    function genPeriod() {
      if (!f.discIds.length) return;
      var pace = C.buildPace({ discIds: f.discIds, start: f.start, end: f.end, scope: f.scope || null });
      C.saveSchedule({
        goal: f.title || "学习计划", start: f.start, end: f.end, model: "pace", auto: !!f.auto,
        dailyHours: +f.hours || 4, discIds: f.discIds, scope: f.scope || null, pace: pace, days: [], createdAt: Date.now(),
        overview: (f.title ? f.title + ":" : "") + "每天按固定时间表上课(考点自己定),按下面的最低进度推进——简单的会了就跳过,难的多花时间。",
        rhythm: "每天约 " + (+f.hours || 4) + " 小时,上午攻最难的、下午第二梯队、晚上轻松巩固,中间休息够。",
        milestones: [], tips: ["难的多投入、简单的果断跳过", "每周留半天只做错题与复盘", "状态差就减量,别硬撑"]
      });
      if (f.timetable) {   // 生成每日固定时间表(按科目排时段,循环铺满整段周期)
        var tt = C.buildTimetable({ discIds: f.discIds, hours: +f.hours || 4, start: f.start, end: f.end });
        C.saveTasks(C.tasks().filter(function (t) { return !t.timetable; }).concat(tt));
      }
      p.onDone();
    }
    function genRecur() {
      if (!f.rTitle.trim() || !f.rDays.length) return;
      var end = toMin(f.rStart) + (+f.rMin || 30);
      var task = { title: f.rTitle.trim(), subject: "每日", color: f.rColor, recur: { daysOfWeek: f.rDays.slice().sort(), startTime: f.rStart, endTime: hhmm(end), startRecur: f.rFrom, endRecur: f.rTo }, notes: "", subItems: [], attachments: [] };
      if (f.rDisc) { task.discId = f.rDisc; if (f.rPace) task.pace = { scope: f.scope || null, start: f.rFrom, end: f.rTo, checkpoints: C.paceCheckpoints(f.rFrom, f.rTo) }; }
      addTask(task);
      p.onDone();
    }
    var dn = ["日", "一", "二", "三", "四", "五", "六"];
    var colors = ["#6E7A4F", "#B6532F", "#C8852E", "#3b6fe0", "#8e44ad", "#16a085"];
    var scopes = [["gaokao", "高考"], ["chuzhong", "初中"], ["", "全部"]];
    return html`<div class="pan-modal-mask" onClick=${function (e) { if (e.target.classList.contains("pan-modal-mask")) p.onClose(); }}>
      <div class="pan-modal">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;"><h2 style="font-family:var(--serif);margin:0;font-size:19px;">✦ 新建计划</h2><span onClick=${p.onClose} style="cursor:pointer;color:#9a8a6f;font-size:20px;">×</span></div>
        <div style="display:flex;gap:8px;margin-bottom:16px;">
          <span class=${"pan-tag" + (f.type === "period" ? " on" : "")} onClick=${function () { up("type", "period"); }}>📈 一定周期内</span>
          <span class=${"pan-tag" + (f.type === "recur" ? " on" : "")} onClick=${function () { up("type", "recur"); }}>🔁 每天循环事件</span>
        </div>
        ${f.type === "period" ? html`<div>
          <p style="font-size:12.5px;color:#8a7a62;margin:0 0 12px;">选学科 + 周期,生成「最低进度推荐」。不锁死每天,自己往日历拖,或点「填今天」。</p>
          <input value=${f.title} onInput=${function (e) { up("title", e.target.value); }} placeholder="计划名(如:暑假理科冲刺)" style="width:100%;border:1px solid #EBDEC8;border-radius:9px;padding:10px;margin-bottom:12px;font-family:var(--sans);" />
          ${mine.length ? html`<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">${mine.map(function (id) { var d = C.disciplineById(id) || { name: id }; var on = f.discIds.indexOf(id) >= 0; return html`<span key=${id} class=${"pan-tag" + (on ? " on" : "")} onClick=${function () { toggleDisc(id); }}>${on ? "✓ " : ""}${d.name}</span>`; })}</div>`
            : html`<div style="font-size:13px;color:#9a8a6f;margin-bottom:12px;">「我的空间」还没学科,<span class="lnk" style="color:#B6532F;cursor:pointer;" onClick=${function () { p.onClose(); p.app.go("explore"); }}>去加几门 →</span></div>`}
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;font-size:13px;color:#7A6E5E;flex-wrap:wrap;">考点范围 ${scopes.map(function (s) { return html`<span key=${s[0]} class=${"pan-tag" + (f.scope === s[0] ? " on" : "")} onClick=${function () { up("scope", s[0]); }}>${s[1]}</span>`; })}</div>
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;font-size:13px;color:#7A6E5E;flex-wrap:wrap;"><input type="date" value=${f.start} onInput=${function (e) { up("start", e.target.value); }} style="border:1px solid #EBDEC8;border-radius:8px;padding:7px;" /> 至 <input type="date" value=${f.end} onInput=${function (e) { up("end", e.target.value); }} style="border:1px solid #EBDEC8;border-radius:8px;padding:7px;" /></div>
          <div style="display:flex;gap:8px;margin-bottom:12px;align-items:center;flex-wrap:wrap;"><span style="font-size:13px;color:#7A6E5E;">每天</span>${[3, 4, 5, 6].map(function (h) { return html`<span key=${h} class=${"pan-tag" + (+f.hours === h ? " on" : "")} onClick=${function () { up("hours", h); }}>${h}小时</span>`; })}</div>
          <label style="display:flex;align-items:flex-start;gap:8px;font-size:13px;cursor:pointer;margin-bottom:8px;line-height:1.6;"><input type="checkbox" checked=${f.auto} onChange=${function (e) { up("auto", e.target.checked); }} style="margin-top:3px;" /> <span>自动百分比 — 按周期生成最低进度推荐曲线,实时对比你的掌握度(领先/落后)</span></label>
          <label style="display:flex;align-items:flex-start;gap:8px;font-size:13px;cursor:pointer;margin-bottom:18px;line-height:1.6;"><input type="checkbox" checked=${f.timetable} onChange=${function (e) { up("timetable", e.target.checked); }} style="margin-top:3px;" /> <span>生成每日固定时间表 — 把所选学科排成每天的时段(上午/下午/晚上,循环铺满周期),只固定时间不固定考点</span></label>
          <div style="display:flex;justify-content:flex-end;gap:10px;"><span class="pan-btn ghost" onClick=${p.onClose}>取消</span><span class=${"pan-btn " + (f.discIds.length ? "grad" : "ghost")} onClick=${genPeriod}>生成进度推荐 →</span></div>
        </div>` : html`<div>
          <p style="font-size:12.5px;color:#8a7a62;margin:0 0 12px;">每天固定时间重复的习惯(背单词、晨读、错题本…),在日历上自动铺满整段周期。</p>
          <input value=${f.rTitle} onInput=${function (e) { up("rTitle", e.target.value); }} placeholder="事件名(如:背 30 个日语单词 / 数学)" style="width:100%;border:1px solid #EBDEC8;border-radius:9px;padding:10px;margin-bottom:12px;font-family:var(--sans);" />
          ${mine.length ? html`<div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;font-size:13px;color:#7A6E5E;flex-wrap:wrap;">关联学科
            <select value=${f.rDisc} onChange=${function (e) { var v = e.target.value; setF(Object.assign({}, f, { rDisc: v, rTitle: f.rTitle || ((C.disciplineById(v) || {}).name || "") })); }} style="border:1px solid #EBDEC8;border-radius:8px;padding:7px;font-family:var(--sans);">
              <option value="">(不关联)</option>
              ${mine.map(function (id) { var d = C.disciplineById(id) || { name: id }; return html`<option key=${id} value=${id}>${d.name}</option>`; })}
            </select></div>` : null}
          ${f.rDisc ? html`<div style="margin-bottom:10px;">
            <label style="display:flex;align-items:flex-start;gap:8px;font-size:13px;cursor:pointer;line-height:1.6;"><input type="checkbox" checked=${f.rPace} onChange=${function (e) { up("rPace", e.target.checked); }} style="margin-top:3px;" /> <span>推荐进度 — 每天在这格上标「最起码 ≥X%」,给 ${(C.disciplineById(f.rDisc) || {}).name || "它"} 一个最低节奏</span></label>
            ${f.rPace ? html`<div style="display:flex;gap:8px;align-items:center;margin-top:8px;font-size:13px;color:#7A6E5E;flex-wrap:wrap;">考点范围 ${scopes.map(function (s) { return html`<span key=${s[0]} class=${"pan-tag" + (f.scope === s[0] ? " on" : "")} onClick=${function () { up("scope", s[0]); }}>${s[1]}</span>`; })}</div>` : null}
          </div>` : null}
          <div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;">${[0, 1, 2, 3, 4, 5, 6].map(function (d) { var on = f.rDays.indexOf(d) >= 0; return html`<span key=${d} class=${"pan-tag" + (on ? " on" : "")} onClick=${function () { toggleDay(d); }}>周${dn[d]}</span>`; })}</div>
          <div style="display:flex;gap:10px;align-items:center;margin-bottom:12px;font-size:13px;color:#7A6E5E;flex-wrap:wrap;">开始 <input type="time" value=${f.rStart} onInput=${function (e) { up("rStart", e.target.value); }} style="border:1px solid #EBDEC8;border-radius:8px;padding:7px;" /> 时长 ${[15, 30, 45, 60].map(function (m) { return html`<span key=${m} class=${"pan-tag" + (+f.rMin === m ? " on" : "")} onClick=${function () { up("rMin", m); }}>${m}分</span>`; })}</div>
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;font-size:13px;color:#7A6E5E;flex-wrap:wrap;">周期 <input type="date" value=${f.rFrom} onInput=${function (e) { up("rFrom", e.target.value); }} style="border:1px solid #EBDEC8;border-radius:8px;padding:7px;" /> 至 <input type="date" value=${f.rTo} onInput=${function (e) { up("rTo", e.target.value); }} style="border:1px solid #EBDEC8;border-radius:8px;padding:7px;" /></div>
          <div style="display:flex;gap:8px;margin-bottom:18px;align-items:center;"><span style="font-size:13px;color:#7A6E5E;">颜色</span>${colors.map(function (c) { return html`<span key=${c} onClick=${function () { up("rColor", c); }} style=${"width:22px;height:22px;border-radius:50%;cursor:pointer;background:" + c + ";box-shadow:" + (f.rColor === c ? "0 0 0 2px #fff,0 0 0 4px " + c : "none") + ";"}></span>`; })}</div>
          <div style="display:flex;justify-content:flex-end;gap:10px;"><span class="pan-btn ghost" onClick=${p.onClose}>取消</span><span class=${"pan-btn " + (f.rTitle.trim() && f.rDays.length ? "grad" : "ghost")} onClick=${genRecur}>添加循环 →</span></div>
        </div>`}
      </div>
    </div>`;
  }

  function Crumb(p) {
    var app = useApp();
    return html`<div class="pan-crumb">${p.parts.map(function (x, i) { return html`<span key=${i}>${i ? " › " : ""}${x.go ? html`<span class="lnk" onClick=${function () { app.go(x.go, x.params); }}>${x.t}</span>` : x.t}</span>`; })}</div>`;
  }

  window.Screens = window.Screens || {};
  window.Screens.plan = PlanScreen;
})();
