# Codex 任务:批量优化 & 填充讲解页内容

> 目标:把 `subjects/**/*.html` 的讲解页做得**信息尽可能丰富、可点开看详细知识点、交互尽可能多、帮学习者省时间省精力**。逐页处理,只改内容/交互,**不改框架、不改任何共享数据文件**。
> 讲解页现在通过「同文档注入」进入 App(见 app.js `mountLesson`),已不是 iframe。所以你的改动必须遵守下面的结构与作用域规则,否则会污染 App 或让组件失效。

## 一、每页必须保持的结构(注入依赖它)
1. `<head>` 保持四行不动:`style.css`、`data/model.js`、`data/catalog.js`、`assets/page.js`(带 `data-page-id="<id>"`)。
2. 正文必须是**单个** `<article class="page">`……`</article>`——注入时只取这个节点。所有内容放它里面。
3. `.topbar`(面包屑 + 返回首页)保留(独立打开时用;注入时自动丢弃)。
4. `<header class="page-header">` 里保留 `data-kicker` / `<h1>` / `data-meta`;结尾保留 `<section class="related"><div class="related-grid" data-related></div></section>`。

## 二、作用域铁律(注入后正文进 App 同一 DOM,别污染全站)
- **元素 id 必须每页唯一**:所有交互组件用到的 id 一律加页面前缀(如 `dn-`、`nm-`、`en-pr-`)。禁止用 `#box`、`#result` 这类裸名。
- **自定义 `<style>` 块**:只允许**带页面前缀的类选择器 / @keyframes**(如 `.dn-lab .dn-btn`、`@keyframes dn-pulse`)。**严禁**在 `<style>` 里写裸元素选择器(`h1`/`p`/`table`/`button`/`.box`/`.lab` 等全局名),否则注入后会改到整个 App。
- 配色/排版**复用 style.css 已有类**(`.box` `.box.key/.tip/.warn/.example`、`.lab`、`.control`、`.readout`、`.page` 等)和 **CSS 变量**(`var(--accent)`/`var(--text)`/`var(--surface)`/`var(--border)`/`var(--bg)`/`var(--text-soft)`/`var(--text-faint)` 等)。不要硬编码大量颜色。
- 交互组件 = **自包含内联** `<script>(function(){ ... })();</script>`,纯 vanilla JS,用 `document.getElementById('<带前缀id>')`。**不得引入任何外部库/CDN**(数学公式用 `\( \)` / `\[ \]`,由框架自动排版,不用自己加 MathJax)。

## 三、内容优化目标(四个要求)
1. **信息尽可能丰富**:把每个知识点讲透——概念 + 为什么 + 具体例子 + 常见坑 + 一句话记忆。例子要贴学习者场景:
   - 设计课(`subjects/design/`,学习者 ma-huan 做 NocoBase 后台)→ 例子落在后台/管理系统界面。
   - 嘉欢的英语(`subjects/english/mh-*`)→ 新概念路线、初中生口吻、活泼鼓励。语文(`subjects/chinese/mh-*`)、生物(`subjects/biology/mh-*`)同理。
   - 高考理科/研究生数学等 → 对应学段的严谨度。
2. **可点开看详细知识点(渐进式展开,省时间)**:主线保持简洁可扫读,把「深入/推导/更多例子/易错细节」放进**可点开的折叠块**。用原生 `<details class="dn-more"><summary>展开:xxx</summary> …详细… </details>`(summary 用带前缀的类做样式,别写裸 `summary{}`)。让学习者先看主干、想深入再点开。
3. **交互尽可能多**:每页**至少 2 个** `.lab` 交互组件(现在多数只有 1 个)。多用:实时替换/重算、点选判对错+计分、拖动滑块看变化、切换对照、迷你小测、随机出题。交互要**立刻有反馈**。
4. **省精力省时间**:每页顶部给一个 `.box.key`「一分钟看懂」TL;DR;小标题分段;关键结论加粗;末尾「试一试」给可动手的自检。

## 四、逐页流程
1. `ls subjects/**/*.html`(48 篇)。按学科批量,一次一篇,读原文→在其基础上**增强**(不要推翻已有的好内容,补充/加深/加交互)。
2. 每篇改完自检:
   - `node --check` 该页内联 `<script>`(可把脚本抽出临时文件校验);标签闭合、`<article class="page">` 唯一。
   - 所有 id 带页面前缀且唯一;`<style>` 无裸元素选择器;无外部库。
3. **不要**改 `data/catalog.js` / `data/skeleton*.js` / `assets/*.js` / `index.html` / `assets/style.css`(改了 style.css 需重跑 `node scripts/build-embed-css.js`,但本任务不改它)。只改 `subjects/**/*.html`。
4. 内容一律**原创**,不得整段抄教材/文章/纪录片文本。

## 五、验收(抽查)
- 页面独立打开正常;在 App 里点考点内嵌打开,正文融入 App 主题、交互组件可玩、折叠块能点开、单一滚动。
- App 其它页面样式**未被讲解页 CSS 改动**(说明作用域守住了)。
- 每页 ≥2 个交互、≥1 个可点开折叠、有 TL;DR 与试一试。

## 六、可参考的现有好样例
`subjects/english/mh-pronouns.html`(代词变形器)、`subjects/design/design-norman-principles.html`(好/坏设计切换台)结构规范、交互到位,可作为下限基准去超越。
