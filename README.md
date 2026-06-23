# 📚 我的学习中心 (Study Hub)

一个**数据驱动的高考备考知识库**。每次提问后，新的知识点会被做成网页、自动归类、互相引用，方便长期复习。

## 怎么用

直接用浏览器打开 **`index.html`** 即可（双击就行，离线可用，无需安装任何东西）。

- 首页 = 应用中心：按 **科目 → 分类 → 知识点** 自动组织
- 顶部搜索框：按标题 / 标签 / 科目秒搜
- 科目卡片：点击筛选
- 每个知识点页底部有「相关知识点」自动互链

> 第一篇建议先看：**学习方法 → 如何使用这个学习中心**

## 目录结构

```
study-for-kids/
├── index.html              # 首页（应用中心）
├── data/catalog.js         # ★ 知识点清单（网站的"数据库"）
├── assets/
│   ├── style.css           # 全站样式
│   ├── hub.js              # 首页逻辑
│   └── page.js             # 知识页通用逻辑（面包屑/相关/公式渲染）
├── subjects/<科目>/*.html  # 一个知识点 = 一个网页
└── templates/_template.html # 新页面模板
```

科目 key：`chinese / math / english / physics / chemistry / biology / politics / history / geography / methods`

## 新增一个知识点（两步）

1. 复制 `templates/_template.html` 到 `subjects/<科目>/<英文名>.html`，填内容。
2. 在 `data/catalog.js` 的 `STUDY_CATALOG` 数组里加一条记录（字段说明见该文件末尾）。

首页会自动统计、归类、生成搜索与关联链接——**不用手动改首页**。

## 特性

- 📐 数学公式：写 `$x^2$` / `$$...$$`，由 MathJax 渲染（需联网；离线显示原文，内容不丢）
- 🎮 交互示例：用 `<canvas>` + 滑块做可拖动的演示（见「数学 → 二次函数」）
- 🔗 知识互联：`catalog.js` 里的 `related` + 同分类自动成网
- 🗂️ 完全静态：无需服务器、无构建步骤，离线优先
