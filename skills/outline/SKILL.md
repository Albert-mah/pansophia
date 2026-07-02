# skill:outline — 考点大纲(章节 → 考点拆解)

给一门课(subject × scope)生成或扩充「章节 → 考点」两级大纲。
大纲是后面拆卡的骨架:**考点粒度 = 一张卡 = 几分钟能学完的一个点**。

## 输入

- subject、scope(必须已在 `data/model.js` 的 `STUDY_SUBJECTS` / `STUDY_SCOPES` 里定义;
  不在 → 停下来问人,不要自己加)
- 参考材料:课标 / 教材目录 / 考纲(优先用 `course_materials` 表或用户给的;没有就按学段通识)

## 步骤

1. `grep -n "subject: \"<subject>\"" data/skeleton.syllabi.js` 看是否已有该 subject+scope 的块。
   已有 → 只做增补(在既有 topics 里加 points 或加新 topic),不许重排/改名已有考点。
2. 没有 → 在 `data/skeleton.syllabi.js` 末尾的 `.concat([...])` 数组里追加一个块:

```js
{ subject: "chemistry", scope: "chuzhong", discipline: "chemistry", topics: [
  { title: "章节名(教材单元级)", points: [
    { "title": "考点名", "status": "todo" },
    ...
  ] },
  ...
] }
```

3. 拆分粒度自检(每个考点问三遍):
   - 一张卡讲得完吗?讲不完 → 拆成两个考点。
   - 是「一个知识点」还是「一类活动」?活动类(写作/观察/项目)也算考点,后面拆卡会标 task。
   - 名字是不是简洁名词短语?(≤18 字,不带句号,像「一元二次方程的解法」)
4. 数量参考:一个章节 4-12 个考点;一门课(一个 scope)30-80 个。
5. 跑 `node tools/validate.js`,必须全绿(它会查 subject/scope/discipline 合法、status 形状)。

## 禁止

- 改动已有考点的 title(卡片和掌握记录按标题挂接,改名=断链)。确要改名 → 停下来问人。
- 给考点直接写 `ref`(那是讲解页的事,拆卡阶段不管)。
- 动这个文件里别的块。

## 产出汇报

subject×scope、新增章节数/考点数、validate 结尾三行。
