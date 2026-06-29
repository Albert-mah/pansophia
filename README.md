# Pansophia · 万象学院

一所**家庭 / 小团体共用的「虚拟大学」**学习平台。以个人为中心(进度 / 计划 / 笔记 / 积分 / 成就),
全人类学科体系树为背景,知识点**懒加载**(按需对话生成),按价值产出**积分**。多用户、平等。

## 特性

- 📚 **知识体系树**:六大门类 + 现实学科,逐层下钻到二级方向、🎓名校培养方案、考点大纲、学习资源。
- 🗓 **学习计划**:FullCalendar 月/周/日;「一定周期内 + 自动百分比」最低进度推荐 + 每日固定时间表;「每天循环事件」习惯打卡。
- 🎓 **我的课程**:按「学科 × 范围」平铺的课程表(按学习者范围过滤),逐考点标记掌握。
- ✏️ **习题 + 单词专项(SRS)**:即时判分 / 错题本;单词卡 + 三关闯过 + Leitner 记忆曲线(JLPT / TOEFL / 自建单词本)。
- 🏆 **积分 · 等级 · 成就**:按"掌握了哪些知识 / 答对"计,不按学习时长。
- 📊 **数据分析中心** + 📥 **本地资料库**(把培养方案网页正文缓存进库,可离线读、AI 可读)。

## 技术栈

- **前端**:React + [htm](https://github.com/developit/htm) **零构建**(本地内置、无打包步骤)+ FullCalendar。
- **后端**:Python `server.py`(标准库 + `psycopg2`),同源静态站 + `/api`。
- **数据库**:PostgreSQL(用户态唯一真源);**内容**是静态 JS 全局(`data/*.js`),按需填。

## 快速开始

1. 准备一个 PostgreSQL,建库 `pansophia`。
2. `cp config.sample.json ~/.studyhub/config.json`,填好 `pg` 连接、`write_token`、`read_key`。
3. `pip install psycopg2-binary`,然后 `python3 server.py`(首次自动建表 + 种子示例用户)。
4. 浏览器打开 `http://127.0.0.1:8790`。公网部署放到任意反向代理 / 隧道后即可。

> 种子里的 Siyu / Ma Huan / Jiahuan 是**示例档案**,部署后在用户管理里改成你自己的。

## 加内容(懒加载)

- 学科一句话说明 `data/disc_notes.js`、名校培养方案 `data/programs.js`、考点大纲 `data/skeleton*.js`、
  讲解页 `subjects/<科目>/*.html` + `data/catalog.js`、现实学科资源 `data/disc_resources.js`、词库 `data/words.*.js`。
- 改完跑校验:`node tools/validate.js` + `node --check assets/*.js` + `curl :8790/api/health`。

细节见 `AGENTS.md`。

## License

MIT(见 `LICENSE`)。
