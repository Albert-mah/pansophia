# 📚 学习中心 (Study Hub)

一个**家庭共用的数据驱动静态学习平台**。一个站点里用「学习空间」(track) 容纳多个人：

- 🎓 **我的高考** —— 高考备考知识库（物化生方向）
- 🚀 **嘉欢的学习** —— 弟弟马嘉欢（六年级 · 小升初）的英语为主、带**检测中心**

每次提问后，知识点会做成网页、自动归类、互相引用；对嘉欢的英语，还能把单词和考点变成可反复做的**检测题**。

## 怎么用

直接用浏览器打开 **`index.html`**（双击即可，离线可用，无需安装）。

- 顶部 pill 切换**学习空间**；也可用 `index.html?track=gaokao` / `?track=mahuan` 直达
- 搜索框：按标题 / 标签 / 科目秒搜
- 科目卡片：点击筛选
- 嘉欢的空间里有「📝 检测中心」：单词检测、习题练习、错题本 / 生词本、成绩记录（都存在本机）

公网访问：<https://study.albertma.site>（默认高考空间）、<https://mahuan.albertma.site>（默认嘉欢空间）。

## 目录结构

```
study-for-kids/
├── index.html              首页（多空间 + 突击仪表盘）
├── data/
│   ├── catalog.js          知识点清单 + 空间/科目定义（STUDY_TRACKS/SUBJECTS）
│   ├── words.js            单词库 WORD_BANK（检测中心）
│   └── quizzes.js          题库 QUIZ_BANK（检测中心）
├── assets/
│   ├── common.js           StudyHub：空间判定 + 本地存储（预留 SQLite 升级口）
│   ├── style.css           全站样式
│   ├── hub.js              首页逻辑
│   ├── quiz.js             检测引擎（单词/习题/错题本/生词本/成绩）
│   └── page.js             知识页通用逻辑
├── quiz/
│   ├── index.html          检测中心
│   └── run.html            通用检测运行器
├── subjects/<科目>/*.html  一个知识点 = 一个网页
└── templates/_template.html 新页面模板
```

科目 key：`chinese / math / english / physics / chemistry / biology / politics / history / geography / methods`
空间 key：`gaokao / mahuan`

## 新增内容（按类型）

- **讲解知识点**：复制 `templates/_template.html` 到 `subjects/<科目>/`，再在 `data/catalog.js` 加一条记录（写对 `track`）。
- **单词检测**：在 `data/words.js` 的 `WORD_BANK` 加一组词，检测中心自动生成「中→英 / 英→中 / 🔊听写」。
- **习题检测**：在 `data/quizzes.js` 的 `QUIZ_BANK` 加一套题（`choice` 选择 / `fill` 填空）。

详见 `AGENTS.md`（含线上部署红线与 SQLite 升级路径）。

## 特性

- 🧩 **多人学习空间**：一个站点容纳多个人，互不干扰
- 📝 **检测中心**：即时判分 + 解析，错题/生词自动收集、可反复重练，成绩本地留痕
- 📐 数学公式：写 `$x^2$` / `$$...$$`，由 MathJax 渲染（需联网；离线显示原文）
- 🎮 交互示例：用 `<canvas>` + 滑块做可拖动的演示
- 🔗 知识互联：`related` + 同分类自动成网
- 🗂️ 完全静态：无需服务器、无构建步骤，离线优先；学习记录存浏览器本地
