# AGENTS.md — 给所有 AI agent 的项目说明

> 本文件供 Codex / Claude / Cursor 等任意 agent 阅读。动手前请先读完，尤其是「⚠️ 注意事项」。

## 一、这个项目是什么（定位）

这是**一名高中生的个人高考备考知识库**，做成一个数据驱动的静态「学习中心」网站。

- **用户**：中国高二学生，2026 年暑假升高三，正在备考高考。
- **选考方向**：物化生。重点科目 = **语文、数学、英语、物理、化学、生物**（内容主要往这 6 科填）。
- **核心模式**：用户每问一个问题 / 知识点，agent 不只是回答，而是把它**沉淀成一个分类好、可交互、互相引用的网页**，长期积累成一座方便复习、持续学习的知识城。

## 二、工作方式（回答问题后要做的事）★最重要

用户问一个学科问题后，除了讲清楚，还要把它收进知识库：

1. 复制 `templates/_template.html` → `subjects/<科目>/<英文短名>.html`，填内容。
2. 在 `data/catalog.js` 的 `STUDY_CATALOG` 数组加一条记录（字段说明见该文件末尾：id / subject / category / title / path / summary / tags / date / difficulty / type / related）。
3. 用 `related` 字段把它和已有知识点互相链接，连成知识网。
4. 首页（`index.html`）会**自动**完成归类、统计、搜索、关联——**不要手动改首页**。

- **科目 key**：`chinese / math / english / physics / chemistry / biology / politics / history / geography / methods`
- **改完即时生效**：静态服务直接读文件，无需构建、无需重新部署，浏览器刷新即可。

## 三、技术约束（不要破坏）

- **纯静态、零构建、离线优先**，必须保证 `file://` 直接双击也能用：
  - `data/catalog.js` 用 `window.STUDY_CATALOG` 全局变量加载。**不要改成 `fetch()` 读 JSON**——`file://` 下会被 CORS 拦截。
  - 知识页用相对路径 `../../`（页面固定在 `subjects/<科目>/` 两级深处）。
- **数学公式**：MathJax（CDN，需联网渲染），正文写 `$...$`（行内）或 `$$...$$`（独占行）。
- **交互示例**：原生 JS + `<canvas>`，**不要引入框架 / 打包器 / npm 依赖**。
- **语言与风格**：用中文，面向高中生水平，讲清重点和易错点。
- 仓库用 git 管理（`main` 分支）。新增内容按需提交。

## 四、⚠️ 线上部署（已上线，改动需谨慎）

站点已通过 **Cloudflare Tunnel** 发布到公网，用户用手机访问：

- **公网地址**：<https://study.albertma.site>
- **链路**：静态服务 `127.0.0.1:8790` → cloudflared 隧道 `ssh-wsl`(`248c11e0-…`) → `study.albertma.site`
- **静态服务**：`python3 -m http.server 8790`，watchdog = `~/bin/ensure-study-server.sh`（cron 每分钟 + `@reboot` 守护）。
- **隧道配置**：`~/.cloudflared/config.yml` 里的 `study.albertma.site` 那条 ingress；隧道 watchdog = `~/bin/ensure-cloudflared.sh`。
- 运行环境：WSL2 (Debian)，**没有 systemd**，所有常驻服务靠 cron watchdog 维持。

**改动红线：**

- ⚠️ `~/.cloudflared/config.yml` **同时承载用户的其他生产服务**（crm / fleet / kb / nocobase 等）。对它**只能追加**，绝不可删除或重排别人的条目。
- ⚠️ 重启 cloudflared 要小心：它收到 SIGTERM 后有 ~30s **优雅排空**，不会立刻退出；用 `~/bin/ensure-cloudflared.sh` 守护拉起。识别进程用 `pgrep -x cloudflared`（`pgrep -f` 会误匹配你自己的命令行）。
- ⚠️ **站点是公开的**：任何页面内容全网可见。**不要写入隐私、密钥、成绩、家庭信息等敏感内容**。
- 部署脚本在 `~/bin/` 和 `~/.cloudflared/`（仓库之外），不随 git 管理。

## 五、关于用户

中文交流；高中生，备考时间紧；讲解要直奔重点、给例子、点出易错点和考试陷阱。
