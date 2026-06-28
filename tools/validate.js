#!/usr/bin/env node
/* =============================================================
 *  学习中心 · 数据完整性校验  (node tools/validate.js)
 * -------------------------------------------------------------
 *  懒加载知识库靠 agent / 喂书持续往 data/*.js 填内容，
 *  这个脚本是“填之前/填之后”的只读门禁，防止把索引填乱：
 *    · profile / subject / scope 是否都在 model.js 里定义
 *    · catalog id 是否唯一、字段是否齐、discipline 是否存在
 *    · skeleton 的 ref 是否悬空、ref 的 profile/subject 是否对得上、discipline 是否存在
 *    · disciplines 同文件 id 是否重复、kind 是否合法
 *    · programs（data/programs.js）的 key 是否真学科、形状是否合法
 *    · 跨国内/国际库重复 id（有意去重，仅提示）
 *    · catalog 是否有“孤儿页”（没挂进任何大纲，仅提示）
 *  退出码：有 ERROR → 1，否则 0。WARN/INFO 不影响退出码。
 * ============================================================= */
const path = require("path");
const DATA = path.join(__dirname, "..", "data");

global.window = {};
for (const f of ["model.js", "disciplines.js", "disciplines.intl.js", "programs.js", "skeleton.js", "catalog.js"]) {
  require(path.join(DATA, f));
}
const W = global.window;
const PROFILES = W.STUDY_PROFILES || {};
const SUBJECTS = W.STUDY_SUBJECTS || {};
const SCOPES = W.STUDY_SCOPES || {};
const CN = W.STUDY_DISCIPLINES || [];
const INTL = W.STUDY_DISCIPLINES_INTL || [];
const PROGRAMS = W.STUDY_PROGRAMS || {};
const SKELETON = W.STUDY_SKELETON || [];
const CATALOG = W.STUDY_CATALOG || [];

const errors = [], warns = [], infos = [];
const E = (m) => errors.push(m);
const Wn = (m) => warns.push(m);
const I = (m) => infos.push(m);

const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
const okProfile = (p) => has(PROFILES, p);
const okSubject = (s) => has(SUBJECTS, s);
const okScope = (s) => has(SCOPES, s);
const STATUS = new Set(["done", "partial", "todo"]);
const TAGS = new Set(["top", "strong", "solid"]);
const KINDS = new Set(["academic", "custom"]);

// 所有学科 id（两库合集），供 discipline / programs 引用校验
const allDiscIds = new Set();
[...CN, ...INTL].forEach((g) => (g.items || []).forEach((it) => it.id && allDiscIds.add(it.id)));

/* ---------- model.js 自洽 ---------- */
for (const [pid, p] of Object.entries(PROFILES)) {
  for (const [subj, scs] of Object.entries(p.subjects || {})) {
    if (!okSubject(subj)) E(`model: profile "${pid}" 的 subject "${subj}" 不在 STUDY_SUBJECTS`);
    (scs || []).forEach((sc) => { if (!okScope(sc)) E(`model: profile "${pid}".${subj} 的 scope "${sc}" 不在 STUDY_SCOPES`); });
  }
}

/* ---------- catalog ---------- */
const catById = new Map();
for (const c of CATALOG) {
  if (!c.id) { E(`catalog: 有记录缺 id（title=${c.title || "?"}）`); continue; }
  if (catById.has(c.id)) E(`catalog: 重复 id "${c.id}"`);
  catById.set(c.id, c);
  if (!okProfile(c.profile)) E(`catalog "${c.id}": profile "${c.profile}" 未定义`);
  if (!okSubject(c.subject)) E(`catalog "${c.id}": subject "${c.subject}" 未定义`);
  if (c.discipline && !allDiscIds.has(c.discipline)) E(`catalog "${c.id}": discipline "${c.discipline}" 不在学科索引`);
  (c.scopes || []).forEach((sc) => { if (!okScope(sc)) E(`catalog "${c.id}": scope "${sc}" 未定义`); });
  if (!STATUS.has(c.status)) E(`catalog "${c.id}": status "${c.status}" 非法（done/partial/todo）`);
  if (!c.path) Wn(`catalog "${c.id}": 缺 path`);
}

/* ---------- skeleton：ref 悬空 + ref 与块的 profile/subject 一致 + discipline 合法 ---------- */
const refTargets = new Set();
let pointCount = 0, doneCount = 0;
for (const blk of SKELETON) {
  if (!okProfile(blk.profile)) E(`skeleton: 块 profile "${blk.profile}" 未定义`);
  if (!okSubject(blk.subject)) E(`skeleton: 块 subject "${blk.subject}" 未定义`);
  if (!okScope(blk.scope)) E(`skeleton: 块 scope "${blk.scope}" 未定义 (${blk.profile}/${blk.subject})`);
  if (blk.discipline && !allDiscIds.has(blk.discipline)) E(`skeleton: 块 discipline "${blk.discipline}" 不在学科索引 (${blk.profile}/${blk.subject})`);
  for (const topic of blk.topics || []) {
    for (const pt of topic.points || []) {
      pointCount++;
      if (pt.ref) {
        refTargets.add(pt.ref);
        const t = catById.get(pt.ref);
        if (!t) {
          E(`skeleton: 悬空 ref "${pt.ref}"（${blk.profile}/${blk.subject} · ${pt.title}）→ catalog 里没有`);
        } else {
          doneCount++;
          if (t.profile !== blk.profile) Wn(`skeleton: ref "${pt.ref}" 的 profile(${t.profile}) ≠ 大纲块(${blk.profile})`);
          if (t.subject !== blk.subject) Wn(`skeleton: ref "${pt.ref}" 的 subject(${t.subject}) ≠ 大纲块(${blk.subject})`);
        }
      } else {
        const st = pt.status || "todo";
        if (!STATUS.has(st)) E(`skeleton: 考点 "${pt.title}" status "${st}" 非法`);
        if (st === "done") doneCount++;
      }
    }
  }
}

/* ---------- disciplines（两库） ---------- */
function checkDisc(list, label) {
  const ids = new Map();
  for (const g of list) {
    for (const it of g.items || []) {
      if (!it.id) { E(`${label}: "${g.t1}" 下有条目缺 id`); continue; }
      if (ids.has(it.id)) E(`${label}: 同库重复 id "${it.id}"（"${ids.get(it.id)}" 与 "${g.t1}"）`);
      else ids.set(it.id, g.t1);
      if (!it.name) E(`${label} "${it.id}": 缺 name`);
      if (!it.en) Wn(`${label} "${it.id}": 缺 en`);
      if (it.subject && !okSubject(it.subject)) E(`${label} "${it.id}": subject "${it.subject}" 未定义`);
      if (it.kind && !KINDS.has(it.kind)) E(`${label} "${it.id}": kind "${it.kind}" 非法（academic/custom）`);
    }
  }
  return ids;
}
const cnIds = checkDisc(CN, "disciplines.js");
const intlIds = checkDisc(INTL, "disciplines.intl.js");

/* ---------- programs（独立文件，按 discipline id 关联） ---------- */
let progCount = 0;
for (const [did, list] of Object.entries(PROGRAMS)) {
  if (!allDiscIds.has(did)) E(`programs: key "${did}" 不是任何学科 id`);
  if (!Array.isArray(list)) { E(`programs "${did}": 值应为数组`); continue; }
  list.forEach((p) => {
    progCount++;
    const where = `programs "${did}"(${p.school || "?"})`;
    if (!p.school) E(`${where}: 缺 school`);
    if (!p.program) Wn(`${where}: 缺 program`);
    if (!Number.isInteger(p.year) || p.year < 2000 || p.year > 2100) E(`${where}: year "${p.year}" 非法`);
    if (!TAGS.has(p.tag)) E(`${where}: tag "${p.tag}" 非法（top/strong/solid）`);
    if (!p.note) Wn(`${where}: 缺 note`);
    if (p.url !== undefined && typeof p.url !== "string") E(`${where}: url 类型应为 string`);
  });
}

/* ---------- 跨库重复 id（去重设计，仅提示） ---------- */
const dup = [...cnIds.keys()].filter((id) => intlIds.has(id));
if (dup.length) I(`国内/国际库共享 ${dup.length} 个同名 id（去重设计，加入“我的空间”时合并）：${dup.slice(0, 12).join(", ")}${dup.length > 12 ? " …" : ""}`);

/* ---------- 孤儿 catalog（没被任何大纲 ref，仅提示） ---------- */
const orphans = [...catById.keys()].filter((id) => !refTargets.has(id));
if (orphans.length) I(`catalog 有 ${orphans.length} 个页未挂进任何大纲(skeleton)：${orphans.join(", ")}（独立页可接受，但不计入覆盖度）`);

/* ---------- 输出 ---------- */
const cov = pointCount ? Math.round((doneCount / pointCount) * 100) : 0;
console.log(`\n📊 概览：profile ${Object.keys(PROFILES).length} · subject ${Object.keys(SUBJECTS).length} · scope ${Object.keys(SCOPES).length}`);
console.log(`   学科：国内 ${cnIds.size} · 国际 ${intlIds.size}（条目 id，去重合计 ${allDiscIds.size}）`);
console.log(`   catalog ${CATALOG.length} 页 · skeleton 考点 ${pointCount}（含 ref/done ${doneCount}）· 覆盖度 ${cov}%`);
console.log(`   培养方案：${Object.keys(PROGRAMS).length} 个学科挂了 ${progCount} 条`);

const dump = (arr, icon, name) => { if (arr.length) { console.log(`\n${icon} ${name} (${arr.length})`); arr.forEach((m) => console.log("   - " + m)); } };
dump(infos, "ℹ️ ", "INFO");
dump(warns, "⚠️ ", "WARN");
dump(errors, "❌", "ERROR");
if (!errors.length && !warns.length) console.log("\n✅ 全部通过，无 ERROR / WARN。");
else if (!errors.length) console.log("\n✅ 无 ERROR（WARN 可看情况处理）。");
else console.log(`\n❌ ${errors.length} 个 ERROR，请修复。`);
process.exit(errors.length ? 1 : 0);
