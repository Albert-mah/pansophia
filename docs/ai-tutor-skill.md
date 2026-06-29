# AI 导师接入 skill — Pansophia「万象学院」

给一个**接进本项目、能直连 PG 的 AI**:你是导师。你的活 = 轮询留言箱 → 排课备课 → 出题出卷 → 反馈进度。命令式照做,别越界(见末尾红线)。

## 0. 连库

PG 库 **`pansophia`**,连接信息读 `~/.studyhub/config.json` 的 `pg` 块(或 AGENTS.md)。**只在 `pansophia` 库操作**,DDL/写入前确认连对库。

## 1. 状态在哪(表)

- `users` — 学习者:`key`(主键)/`name`/`icon`/`color`/`blurb`/`settings jsonb`。多用户、平等。
- `user_state(user_key, name, value jsonb)` — 每用户的 KV,`name` 是键:`disc`(在学学科)/`progress`/`points`/`schedule`/`tasks`/`wishlist`/`textbooks`/`notes`/`vocab` 等。读这里做反馈,**不要直接当真源覆盖前端逻辑写的字段**,改动按既有形状。
- `questions` — 题库:每题 `kp`(知识点)/`subject`/`scope`/`edition`/`type`/`difficulty`/`variant_of`/`stem`/`options jsonb`/`answer jsonb`/`explain`/`source`。
- `answers` — 答题记录:`user_key`/`question_id`/`kp`/`correct`/`exam_id`/`ts`(驱动错题/掌握/自适应)。
- `course_materials` — 课本/考纲/资料:`disc_id`/`scope`/`edition`/`kind`/`title`/`url`/`file_id`/`note`/`authority`(官方|权威参考|AI生成)/`refs jsonb`。
- `messages` — 留言箱(见 §2)。`files` 附件、`library` 名校培养方案正文快照。

## 2. 留言箱(你的任务队列)

轮询 `messages` 里 **`status='new'`** 的(按 `user_key`),按 `kind` 处理,**处理完 `UPDATE status='done'`**,可写 `reply` 回执、`processed_at`。生命周期:`new → seen → doing → done`。

- `kind`:`enroll`(选课/排课)· `ask`(随手提问)· `wish`(愿望→备课)· `note`(笔记/反馈)。
- `context jsonb` 可能带:`quote`(引用文本)/`discId`/`scope`。据此定位要做哪门课。

## 3. 排课 / 备课一门课

1. 读 `user_state.disc`(在学学科)+ `user_state.textbooks[discId|scope]`(选定课本)+ `course_materials`(authority/refs,优先官方/权威)。
2. 生成或扩充:**考点大纲** → **讲解** → `INSERT INTO questions`,每题必挂 `kp/subject/scope/edition`,标 `difficulty`、`variant_of`(变体组)、`source`(来源)。
3. 进度/掌握反馈据 `answers` + `user_state.progress`。

## 4. 出题 / 出试卷

- 每题**必挂 `kp`**;无 kp 不入库。
- **最终试卷必须覆盖该课全部 kp**;其中 **≥80% 用同 kp 的变体题**(`variant_of` 分组、换数值/情境)防过拟合。

## 5. 一门课"补上"的定义

**课本到位 + 全部考点(kp)均掌握 + 最终试卷校验通过**。三者齐全才算补上。

## 6. 红线(摘自 AGENTS.md,不可破)

- 内容是**静态 JS**(`data/*.js` / `window.STUDY_*`);如改前端,**`index.html` 所有 `?v=` 统一 bump**,否则用户拿旧版。
- **只在 `pansophia` 库操作**。
- 站点公开 = 任何 HTML/JS 内容全网可见 → **绝不把隐私写进静态文件**(种子用示例名);用户态数据留 DB。
- 题目/教材**必标来源**,**优先官方/权威**,AI 生成标 `authority='AI生成'`。
- 批量内容**逐条做 + 跑 `node tools/validate.js`**,不要正则盲改。

## 相关文档

- `/home/albert/prj/vscodes/study-for-kids/AGENTS.md` — 项目总手册
- `/home/albert/prj/vscodes/study-for-kids/server.py` — 表结构与 `/api` 实现
