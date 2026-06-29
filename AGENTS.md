# AGENTS.md — Pansophia 万象学院 · 给 AI agent / 贡献者的项目手册

> 任意 agent(Codex / Claude / Cursor)或贡献者动手前先读完本文。
> 一所家庭/小团体共用的「虚拟大学」学习平台:以个人为中心(进度/计划/笔记/积分/成就),
> 全人类学科体系树为背景,知识点**懒加载**(按需生成),按价值生成**积分**。多用户、平等。

## 一、技术架构(★必读)

**前端 = React + htm(零构建)**,**数据库 = PostgreSQL(唯一真源)**,**后端 = Python `server.py`**。

- **React 本地内置,不走 CDN**:`assets/vendor/react*.production.min.js`、`htm.umd.js`。`window.html = htm.bind(h)`(`h` 见 `app.js`,把 `class=`/字符串 `style=` 转成 React 形态),JSX 风格、免 Babel、免打包。
- **FullCalendar 本地内置**:`assets/vendor/fullcalendar.global.min.js`(进「学习计划」才懒加载)。
- **内容数据 = 静态 JS 全局变量**(`data/*.js` 里的 `window.STUDY_*` / `WORD_BANK_*` / `QUIZ_BANK`)。**agent 直接改这些 JS 文件填内容**——这是懒加载玩法的命根,保留。
- **用户态数据(进度/积分/愿望/笔记/计划/单词SRS)在 PostgreSQL**。前端启动从 `/api/state?user=` **水合**到内存缓存,组件同步读缓存,改动**写直达** `/api/state`。localStorage 只记「上次选了哪个用户」。
- **逻辑全在 `assets/core.js`**(`window.Core`,框架无关)。**屏在** `assets/app.js`(根+顶栏+路由+context)、`assets/screens.js`、`assets/vocab.js`(单词 SRS)、`assets/plan.js`(学习计划=FullCalendar)。

### 缓存版本(★改前端必做)
若用 CDN/边缘缓存,`.js/.css` 会被缓存。`index.html` 设 `no-store`,所有本地资源带 `?v=YYYYMMDD<字母>`。**每次改前端,把 index.html 里所有 `?v=` 统一 bump**,否则用户拿旧版。

## 二、PostgreSQL 后端

- 需要一个 PostgreSQL 实例(本机或容器均可),建一个**独立数据库**(默认名 `pansophia`)。连接信息写在仓库外的 `~/.studyhub/config.json`(见 `config.sample.json`)。
- 表:`users`(key/name/icon/color/blurb/settings/...)、`user_state(user_key,name,value jsonb)`(KV:disc/points/progress/events/wishlist/notes/plan/schedule/tasks/vocab/wordbook/goals/achievements)、`files`(附件 bytea)、`library`(名校培养方案正文快照=本地资料库)。
- `server.py` = Python + **psycopg2**(同源静态站 + `/api`)。用装了 psycopg2 的 python 启动。改 `server.py` 后重启,然后 `curl :8790/api/health`(应 `db:true`)。
- 配置 `~/.studyhub/config.json`:`write_token`(前端公开,只写)、`read_key`(读 report 用,服务端)、`pg`(连接信息)。
- API:`GET /api/health` · `GET|POST /api/users` · `GET|POST /api/state?user=` · `GET /api/overview` · `POST /api/event` · `POST /api/upload` / `GET /api/file?id=`(附件) · `GET /api/lib?disc=|?id=` / `POST /api/cache`(资料库) · `GET /api/report?user=&key=`(读密钥)。
- **CLI agent(AI 导师)可直接读写 `pansophia.user_state`**:看进度/积分/掌握做反馈;消费 `wishlist` 里 `status:pending` 的项备课(检索/生成 catalog+skeleton,改状态 cooking→ready)。

## 三、功能屏与对应代码

- **首页**(home):个人仪表盘(数据卡/继续学习/今日计划/热力图/各科进度/最近笔记)。
- **学科探索**(explore→discipline):总览=六大门类+现实学科(`STUDY_CATEGORIES`)每类前 6;**点门类卡/「查看全部」= `explore?cat=<key>` 完整学科目录**(`ExploreScreen` 读 `app.params.cat`)→ 学科详情(二级方向 + 🎓名校培养方案 + 📚考点大纲 + 📚学习资源 + 加入我的空间)。培养方案每条可「📄 本地副本」(资料库缓存)/「重新抓取」。
- **学习计划**(plan.js,FullCalendar):月/周/日;空白拖选建任务;拖拽/缩放改时间。**「✦ 新建计划」两型**:① **一定周期内**(选学科+周期+每天小时+☑自动百分比+☑每日固定时间表)→ `schedule(model:"pace")`:最低进度推荐面板(你已% vs 今天推荐≥%)+ 每日科目时间表(固定时间不固定考点);② **每天循环事件**(可关联学科+☑推荐进度,日历每天标「最起码≥Y%」)。任务首次完成→给分;挂了考点(ref)则联动掌握。
- **我的课程**(course):**无 `disc` 先进「课程表」**(`CourseList`:把「学科×范围」平铺成课程卡,按学习者范围过滤[见 `courseScopeOK`/`userPrefScopes`],按学科 tab 筛选;同一学科可多门课)→ 点卡进单课(大纲/讲解/笔记 + 标记掌握)。
- **习题测试**(quiz)+ **单词专项**(vocab.js):quiz 列表可搜索/科目筛选/分组/显示历史最好%;单词训练=词库(JLPT/TOEFL/单词本)→ 单词卡 → 3 关全对才通过 → Leitner 记忆曲线;答对/通过得分。词库 `words.*.js` 懒加载。
- **笔记**(notes)/**愿望清单**(wishlist)/**积分·等级·成就**(points,按掌握/答对计,不按时长)/**数据分析中心**(analytics,多维+全员总览)。

## 四、怎么填内容(懒加载)

- 学科一句话说明:`data/disc_notes.js`;名校培养方案:`data/programs.js`(`{school,program?,year?,tag,note?,url?}`);考点大纲:`data/skeleton.js`(绑定 profile)+ `data/skeleton.syllabi.js`(共享,按 subject|scope);讲解页:`subjects/<科目>/<名>.html` + `data/catalog.js` 记录,skeleton 考点写 `ref` 回链;二级方向校订:`data/disc_sub_overrides.js`;现实学科资源:`data/disc_resources.js`;词库:`words.*.js`(脚本生成勿手改)。
- ★批量填内容前后跑 `node tools/validate.js`(挡 ref 悬空/重复 id/形状非法)。
- ★**内容级批量操作建议逐条做 + 校验,不要正则盲改**。
- 培养方案批量缓存:`python3 tools/cache_programs.py`(抓 programs.js 链接正文存 `library` 表)。

## 五、本地验证清单(改完跑)

- `node tools/validate.js` 全过;`node --check assets/*.js`。
- 起服务后 `curl :8790/api/health`(db:true)、`/api/users`、`/api/overview`。
- 浏览器硬刷走查;切用户看数据隔离。

## 六、⚠️ 注意

- **站点若公开**:任何页面内容全网可见,**绝不把隐私写进静态 HTML/JS**(种子数据用示例名)。用户态数据在 DB;读 report 要 `read_key`。
- **只在你建的 `pansophia` 库内操作**;若复用了别的 PG 实例,DDL 前确认连对库。
- 改 `server.py` 用装了 psycopg2 的 python 重启;改前端 bump `?v=`。
- 部署脚本、反向代理/隧道配置、`~/.studyhub` 密钥都在仓库外、不进 git。

## 七、示例学习者

种子里有 3 个示例档案(`server.py` init / `data/model.js`):Siyu(高考方向)、Ma Huan(终身学习)、Jiahuan(小升初)——**演示数据**,部署后可在用户管理里改成自己的。
