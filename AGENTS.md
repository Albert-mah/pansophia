# AGENTS.md — 给所有 AI agent 的项目说明

> 本文件供 Codex / Claude / Cursor 等任意 agent 阅读。动手前请先读完，尤其是「⚠️ 注意事项」。

## 一、这个项目是什么（定位）

这是一个**家庭共用的数据驱动静态「学习中心」**，已通用化为 **三个正交维度**（重构于 2026-06-26）：

- **PROFILE 学习者（人）**：`albert`（我 · 高考备考 + 英语进阶 + 日语）、`mahuan`（嘉欢 · 六年级小升初 · 英语为主）。定义在 `data/model.js` 的 `STUDY_PROFILES`。（旧的 `STUDY_TRACKS` 是它的别名；URL/localStorage 仍用 `track` 这个参数名，值就是 profile id。）
- **SUBJECT 学科**：语文/数学/英语/**日语**/物化生政史地/学习方法（`STUDY_SUBJECTS`，带 `kind: language|academic|meta`）。
- **SCOPE 范围/等级**：小学/初中/高考 / CEFR / **JLPT** / CET / 雅思…（`STUDY_SCOPES`）。这是"圈出不同知识点"的标签维度，**多对多**：一个词/考点可同属多个 scope。

**核心模式（懒加载知识地图）**：地基是**考点大纲骨架**（`data/skeleton.js`，多为 `待填`），内容**慢慢填**，来源三种：① agent 按考点生成讲解页；② 用户喂的资料/书由 agent 拆解填充（嘉欢的冀教版 PDF 就是这么拆的）；③ 少量真题做例题。首页按 profile→subject→scope 展示，并显示**覆盖度 %**。语言类（英/日）可**批量导入开源词库**；学科类靠手写/半自动。

## 二、工作方式 ★最重要

### A. 新增一个知识点（讲解类，两步）
1. 复制 `templates/_template.html` → `subjects/<科目>/<英文短名>.html`，填内容。嘉欢的英语页用 `mh-` 前缀（如 `subjects/english/mh-xxx.html`）。
2. 在 `data/catalog.js` 的 `STUDY_CATALOG` 加一条记录，带 `{ profile, subject, scopes[], status:"done" }`。若它对应大纲里的某考点，把 `data/skeleton.js` 那个考点写上 `ref:"<这条id>"`（自动算"已填"并可点进、覆盖度+1）。
3. 用 `related` 互链。首页 `index.html` 会**自动**归类、统计、搜索、关联、算覆盖度——**不要手动改首页**。

### B. 新增单词检测（任意语言）
- 英语等：`data/words.js` 的 `WORD_BANK` 加一组（词条 `{term, gloss, reading?, tip?}`；旧的 `{en,cn}` 仍兼容），带 `profile / subject / scopes[] / unit`。
- 日语：`data/words.ja.js` 由 `tools/import_jlpt.py` **从开源词库生成，别手改**；要扩 N4/N3 改导入器重跑。
- 组可带 `lang:"ja"` 和 `mode`（`term2reading` 看词→读音 / `term2gloss` 看词→义 / `gloss2term` 看义→拼词 / `dictation`）。检测中心按 lang/mode 自动给对应练习按钮。

### C. 新增习题 / 摸底
- `data/quizzes.js` 的 `QUIZ_BANK` 加题（`choice`/`fill` + `explain`），带 `profile / subject / scopes[]`。
- 摸底在 `data/diagnostic.js`（`DIAG_TEST` 每题带 `point` 考点 + `DIAG_POINTS` 给弱项建议链接）。

- **profile key**：`albert / mahuan`（`data/model.js`）；**scope key**：见 `STUDY_SCOPES`。
- **改完即时生效**：静态服务直接读文件，无需构建、无需重新部署，刷新即可。

## 三、技术约束（不要破坏）

- **纯静态、零构建、离线优先**，必须保证 `file://` 直接双击也能用：
  - 数据用 `window.STUDY_CATALOG / STUDY_TRACKS / STUDY_SUBJECTS / WORD_BANK / QUIZ_BANK` 全局变量加载。**不要改成 `fetch()` 读 JSON**——`file://` 下会被 CORS 拦截。
  - 知识页用相对路径 `../../`（页面固定在 `subjects/<科目>/` 两级深处）；检测页在 `quiz/`（一级深），用 `../`。
- **检测的学习记录**（错题本 / 生词本 / 成绩）存在浏览器 **localStorage**，按 track 命名空间隔离（`studyhub.<track>.*`），见 `assets/common.js`。**这是预留 SQLite 的升级口**：将来要跨设备同步 / 后台出题，只需把 `StudyHub.load/save` 换成请求后端，调用方不用改（详见第六节）。
- **数学公式**：MathJax（CDN，需联网渲染），正文写 `$...$` / `$$...$$`。
- **交互示例**：原生 JS + `<canvas>`，**不要引入框架 / 打包器 / npm 依赖**。
- **语言与风格**：用中文。给嘉欢讲英语要**面向六年级 / 小升初**，简单直白、口诀化、点出易错点；给高考内容则面向高中生。
- 仓库用 git 管理（`main` 分支）。新增内容按需提交。

## 四、文件结构速查

```
index.html              首页（profile 切换 + 仪表盘 + 考点大纲覆盖度 + 目录）
data/model.js           ★ STUDY_PROFILES / STUDY_SUBJECTS / STUDY_SCOPES（总入口）
data/skeleton.js        ★ 考点大纲骨架 STUDY_SKELETON（懒加载，status/ref）
data/catalog.js         讲解类知识点清单 STUDY_CATALOG（profile/subject/scopes/status）
data/words.js           单词库 WORD_BANK（英语等）
data/words.ja.js        ★ 日语 N5 词库 WORD_BANK_JA（tools/import_jlpt.py 生成，勿手改）
data/quizzes.js         题库 QUIZ_BANK
tools/import_jlpt.py     ★ 开源 JLPT 词库导入器（源在 tools/sources/，MIT，见 SOURCES.md）
assets/common.js        StudyHub：profile 判定 + localStorage + logEvent 上报
assets/hub.js           首页逻辑（profile 切换、仪表盘、大纲覆盖度、目录、搜索）
data/diagnostic.js      知识点摸底题库 DIAG_TEST + 考点建议 DIAG_POINTS
assets/quiz.js          检测引擎（单词检测 / 习题 / 摸底 / 错题本 / 生词本 / 成绩 / 上报）
assets/page.js          知识页通用脚本（面包屑 / 相关 / 公式）
quiz/index.html         检测中心
quiz/run.html           通用检测运行器（?type=word|quiz|wrong|vocab&id=…&mode=…&track=…）
quiz/diagnostic.html    知识点摸底（测完出强弱项报告）
progress.html           ★家长/哥哥的学习跟踪面板（要读密钥 ?key=…）
server.py               ★同源服务器：静态站 + /api 学习记录接口（SQLite）
subjects/<科目>/*.html  一个知识点 = 一个网页
templates/_template.html 新知识页模板
```

## 五、⚠️ 线上部署（已上线，改动需谨慎）

站点通过 **Cloudflare Tunnel** 发布到公网，手机可访问。**两个子域名指向同一静态服务**（`127.0.0.1:8790`），按域名决定默认落到哪个空间：

- **<https://study.albertma.site>** → 默认「我的高考」空间
- **<https://mahuan.albertma.site>** → 默认「嘉欢的学习」空间（给弟弟用）
- 任意空间都能在首页顶部 pill 切换；也可用 `?track=gaokao|mahuan` 直达。
- **链路**：`python3 server.py`（8790，**静态站 + /api**，watchdog `~/bin/ensure-study-server.sh`，cron 每分钟 + `@reboot`）→ cloudflared 隧道 `248c11e0-…`（watchdog `~/bin/ensure-cloudflared.sh`）。`server.py` 已替代原来的 `python3 -m http.server`；同源提供 API，故**不需要动隧道**。
- 运行环境：WSL2，**没有 systemd**，常驻服务全靠 cron watchdog。改 `server.py` 后要重启它生效：`pkill -f server.py && ~/bin/ensure-study-server.sh`（会有几秒静态站中断，study/mahuan 都受影响，动作要快、改完先本地 `curl /api/health` 验证）。

**改动红线：**

- ⚠️ `~/.cloudflared/config.yml` **同时承载用户的其他生产服务**（crm / fleet / kb / nocobase 等）。对它**只能追加**，绝不可删除或重排别人的条目。改前先 `cp` 备份；改后用 `cloudflared --config <file> tunnel ingress validate` 校验。
- ⚠️ 加新子域名要建 DNS：`cloudflared tunnel --origincert ~/.cloudflared/cert-albertma.pem route dns 248c11e0-e955-4a98-81d7-7445ddf53bcb <host>.albertma.site`。
- ⚠️ 重启 cloudflared 会让**所有**隧道服务短暂中断：SIGTERM 后有 ~30s **优雅排空**才退出；用 `~/bin/ensure-cloudflared.sh` 拉起。识别进程用 `pgrep -x cloudflared`（`pgrep -f` 会误匹配命令行）。
- ⚠️ **站点是公开的**：任何页面内容全网可见。**绝不要把隐私 / 校内成绩 / 家庭信息写进页面 HTML**。
- ⚠️ **学习记录现在是中心化的**（见第六节）：每次练习的「类型 / 得分 / 摸底各考点对错」会上报到本机 SQLite（`~/.studyhub/`，仓库外、不进 git）。**读取要密钥**（`progress.html?key=…`），公网拿不到。写 token 在前端是公开的（只能写不能读），可被伪造灌假数据——风险可接受，要更严就上 Cloudflare Access。
- 部署脚本在 `~/bin/`、隧道配置在 `~/.cloudflared/`、后端数据/密钥在 `~/.studyhub/`（都在仓库之外），不随 git 管理。

## 六、中心化存储 / 学习跟踪（已实现，2026-06-25）

为了让哥哥能**跟踪嘉欢的学习情况**，已上一个**轻量 SQLite 后端**（`server.py`，Python 标准库，无第三方依赖）。

**模型 = 事件日志（不是全量同步）**：
- 嘉欢每做完一次练习（摸底 / 单词 / 习题 / 错题 / 生词复习），`quiz.js` 的 `store.addScore` 会调 `StudyHub.logEvent` 往 `POST /api/event` 上报一条：`{track,kind,label,correct,total,detail,ts}`。摸底的 `detail` 带各考点对错。**fire-and-forget，失败不影响本地**，离线照常用。
- 首次打开还会把本机已有的旧成绩 `migrateOnce` 补传上去。
- 嘉欢的页面**只写不读**（不需要读密钥）；他的错题本/生词本仍是本地的（够他自己重练）。
- 哥哥的 `progress.html?key=<读密钥>` 调 `GET /api/report`（**要读密钥**）看时间线、各考点掌握度、弱项聚合。
- **防刷**：`POST /api/event` 有限流（按真实客户端 IP `Cf-Connecting-Ip`，单 IP 30 次/5 分钟，全局 120 次/分钟），超了返回 429。
- ⚠️ **接口命名有意区分**：写=`/api/event`（开放+限流），读=`/api/report`（要密钥）。配 Cloudflare Access 时只圈 `progress.html` 和 `/api/report`，**千万别圈 `/api/event` 或用 `/api/*` 通配**，否则嘉欢匿名上报会被登录页挡住、跟踪就断了。

**部署**：
- 配置 + 数据库：`~/.studyhub/config.json`（`write_token` / `read_key` / `db_path`）、`~/.studyhub/studyhub.db`（events 表，WAL）。都在仓库外。
- `server.py` 同源提供静态 + API（端口 8790），所以**没动隧道、没加子域名**。
- 写 token 嵌在 `assets/common.js`（公开值，只能写）；读密钥只在哥哥的网址里，不进任何文件。

**还没做（下一步可选）**：① 错题本/生词本的**跨设备全量同步**（现在只同步"事件"，没同步错题本内容）；② **真鉴权**（现在读密钥是 URL 明文 + 写 token 公开，建议上 Cloudflare Access 用 Google 登录把 `progress.html` 和 `/api` 圈起来）；③ 后台出题 UI。
- 改 API/数据层时，保持 `StudyHub.load/save`（本地）与 `logEvent`（上报）解耦：本地仍是离线兜底，**别打破 `file://` 离线可用**。

## 七、关于用户

中文交流。两类对象：① 用户本人——高三备考，讲解直奔重点、给例子、点易错点；② 弟弟马嘉欢——六年级小升初、英语基础弱、时间紧，内容要更基础、更鼓励、口诀化、能立刻上手练。
