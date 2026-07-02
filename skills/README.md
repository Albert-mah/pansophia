# Pansophia 内容管线 skills — 总览

> 把「一门课」变成可以碎片时间学完的卡片流水线。任何 agent(Claude / Codex / 便宜模型)
> 按下面四个 skill 的顺序干活,**每一步都有校验门禁,不过就不许进下一步**。
> 全局规格:`docs/card-system.md`;项目红线:`AGENTS.md`。

## 流水线

```
① outline  考点大纲        subject×scope 的章节→考点拆解     data/skeleton.syllabi.js
      ↓ node tools/validate.js
② cards    拆卡 + 写卡      每个考点一张几分钟的卡(定 mode)   data/cards.<subject>.js
      ↓ node tools/validate.js
③ questions 出题            每张 drill 卡 ≥3 道题(带变体组)   PG questions 表(经 API)
      ↓ python3 tools/import_questions.py --coverage
④ chapter  章节收尾审计      查完整性/一致性,汇报缺口          审计报告
```

前端不用动:卡片渲染、SRS 复习、课程页挂接、混合练/模拟卷都是现成的。
**内容 agent 只允许改:`data/skeleton.syllabi.js`、`data/cards.<subject>.js`、经 API 入题。**
不许改 `assets/`、`index.html`、`server.py`、`tools/`。

## 选哪个 skill

| 任务描述 | 用 |
|---------|----|
| 「给 XX 科建大纲 / 补考点」 | ① outline |
| 「把 XX 章做成卡片 / 填内容」 | ② cards(缺大纲先跑 ①) |
| 「给 XX 出题 / 配练习」 | ③ questions |
| 「XX 章检查一下 / 收尾」 | ④ chapter |
| 「把 XX 课整个补上」 | ①→②→③→④ 顺序跑完 |

## 全局红线(每个 skill 都适用)

1. **改前跑一次 `node tools/validate.js` 记住基线,改完必须回到全绿**(ERROR=0)。
2. 站点公开:**内容里绝不出现真实姓名/隐私**,例子用通用场景。
3. 内容原创,不整段抄教材;来源可靠优先(课标/官方教材的考法)。
4. 批量操作**逐条做**,禁止正则脚本盲改共享文件。
5. 一次干完一个章节(topic)就停下跑校验,别憋大招。
6. 完成后在汇报里列:改了哪些文件、加了几张卡/几道题、校验输出结尾三行。

## 相关文档

- `docs/card-system.md` — 卡片/题目 schema 权威定义
- `docs/ai-tutor-skill.md` — AI 导师(留言箱轮询/备课)总契约,消费 wishlist 时从那边进
- `AGENTS.md` — 架构与部署红线
