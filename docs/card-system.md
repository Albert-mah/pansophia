# 知识卡片体系 — 规格(前端 × 内容管线共同契约)

> 2026-07-02 定稿。目标:把每个考点做成「几分钟学会/复习一次」的卡片,配 SRS 复习循环,
> 内容由 agent 管线批量填充(见 `skills/`)。改这里的字段先同步 `assets/review.js`、
> `tools/validate.js` 和 `skills/cards/SKILL.md` 三处。

## 一、核心决定

1. **卡片的主键 = kpKey**(与掌握记录、PG 题库 `questions.kp` 同一套 key):
   - 考点在 catalog 有讲解页 → kp = catalog id(如 `mh-en-past-tense`);
   - 考点还是 todo(无 ref)→ **kp = 考点标题原文**(如 `有理数及其运算`)。
   - 这是 `core.js kpKey(p) = p.ref || p.title` 的既有体系,卡片、题目、掌握、SRS 全部共用,
     **不引入第三套 id,不改 skeleton 文件**。
2. **卡片是纯数据不是 HTML 页**:agent 只填结构化字段,渲染由 `assets/review.js` 的
   `CardArticle` 统一负责。讲解页(`subjects/*.html`)降级为「深入阅读」层,不再是内容主力。
3. **题目存 PG `questions` 表**(唯一题库真源),经 `tools/import_questions.py` 走
   `POST /api/questions` 入库,每题必挂 `kp`。静态 `data/quizzes.js` 是遗留成套卷,不再扩充。
4. **章节汇总 ≠ 汇总卡**:汇总 = 考点目录的状态地图(已有)+ 整课混合练 + 模拟试卷(已有,
   practice 屏)。串联卡 v1 不做。

## 二、卡片 schema(`data/cards.<subject>.js`)

每科一个文件,追加式(merge 冲突最小):

```js
window.STUDY_CARDS = (window.STUDY_CARDS || []).concat([
  {
    kp: "有理数及其运算",          // 必填。= 考点的 kpKey(见上)
    title: "有理数及其运算",        // 必填。考点标题原文(展示用;kp 为 catalog id 时二者不同)
    subject: "math",              // 必填。model.js STUDY_SUBJECTS 的 key
    scope: "chuzhong",            // 必填。model.js STUDY_SCOPES 的 key(无范围课程填 null)
    mode: "drill",                // 必填。learn 认识为主 / drill 配题精练 / task 实践打卡
    hook: "一句话:符号先行,先定正负再算数值", // 必填。卡片正面提示,SRS 复习的"想一想"线索,≤40 字
    body: [                        // 必填。2-4 个「小点」,总字数 200-500,几分钟能读完
      { t: "小标题(4-12字)", p: "段落一……支持 **加粗** 和 `代码/算式`,不允许 HTML 标签。" },
      { t: "另一个小点", p: "段落二……" }
      // 每个小点 = 卡片内一个可独立打卡的知识点:前端渲染成进度点条
      // (懂了→实心,hover 出标题+摘要,点击跳到该段);习题圆点自动来自 PG 题库。
      // 旧形状(纯字符串段落)兼容但会报 WARN,新卡一律用 {t,p}。
    ],
    example: "一个具体的例子(强烈建议给)",     // 选填但 drill 卡建议必给
    pitfall: "最常见的一个坑",                 // 选填
    mnemonic: "一句话记忆",                    // 选填
    task: "mode=task 时必填:具体行动指引(做什么、产出什么、怎么算完成)",
    minutes: 3,                   // 必填。预估 1-5 分钟
    difficulty: 2,                // 必填。1/2/3
    deepDive: "subjects/math/xxx.html",  // 选填。长讲解页路径(有 ref 的考点自动有,不用重复填)
    date: "2026-07-02", by: "claude"     // 必填。生成日期 + 生成者标识
  }
]);
```

**mode 判定标准**(拆卡时决定):
- `drill` — 有明确对错、能出客观题(选择/填空)的知识点。**必须配题 ≥3 道**(见 skills/questions)。
- `learn` — 认识为主:概念地图、鉴赏、方法论概述等,出题牵强就不出,读懂即可标掌握。
- `task` — 要动手交付的:写作文、读整本书、做观察记录。卡片给行动指引,完成 = 用户自主打卡掌握。

## 三、SRS 复习(user_state `kpsrs`)

- 形状:`{ [kp]: { box, due, ts } }`,Leitner 盒 `[0,1,2,4,8,16,30]` 天(与单词训练一致)。
- 入队:考点被「标记掌握」时自动 box=1、明天到期;复习屏提供「补录已掌握考点」。
- 评分:记得 → box+1;模糊 → box-1(最低 1);忘了 → box=0(当天重现)+ 建议回课程页重学。
- 首页「今日复习」聚合:到期知识卡 + 到期单词(vocab 已有自己的 SRS,只汇总数字)。

## 四、题目契约(PG questions 表)

```json
{ "kp": "有理数及其运算", "subject": "math", "scope": "chuzhong",
  "type": "choice|fill", "difficulty": 2, "variant_of": "组id或null",
  "stem": "题干", "options": ["A","B","C","D"], "answer": 1,
  "explain": "解析(必填)", "source": "skills/questions@claude" }
```

- `choice`:options 3-5 项,answer 是正确项下标;`fill`:answer 是可接受答案字符串数组。
- **变体组**:同一考法换数值/情境的题,在 JSON 里写相同的 `"group": "任意标签"`,
  导入脚本自动把组内第一题作为组头、其余题的 `variant_of` 回填为组头的数据库 id。
  不同考法就不同 group(或不写 group)。
- 每道题必有 `explain`。来源标识写进 `source`。

## 四·五、积分防刷(2026-07-02 加固)

- **一次性账本**:`core.awardOnce(key, delta, reason)`,同一 key 一生只发一次分,
  记在 `user_state.awarded`。key 约定:`kp:<ref>`(掌握)/ `q:<PG题id>`(答对题)/
  `q:set:<套卷id>#<题号>`(静态套卷)/ `quizset:<套卷id>`(套卷全对)。
  重复做题、取消掌握再标,都**不再重复给分**(答题记录/错题本照常)。
- **掌握门禁** `core.masteryGate(ref)`:drill 卡须配套题答 ≥3 道且(按每题最近一次)全对;
  learn/task 卡须小点全部「懂了」;无卡有题按题目门;无卡无题须读过讲解。
  `setMastery` 内部强制执行,所有入口(课程页/练习完成页/日历任务联动)统一受限,
  被拦时返回 `{blocked, reason}`,任务联动降级为待办 +5 分。
- 时间门控的奖励保留原样(SRS 复习记得 +2、单词通过 +8):到期机制天然限速,不构成刷分回路。

## 五、校验与门禁

- `node tools/validate.js` — 卡片规则:kp 能在大纲/目录中唯一定位、mode 合法、必填字段、
  重复卡、body 里出现 HTML 标签报 ERROR。
- `python3 tools/import_questions.py <file.json> [--dry-run]` — 题目 schema 校验 + 入库。
- 批量填充按 `skills/README.md` 的管线执行,**每步都要过校验再进下一步**。

## 相关文档

- `skills/README.md` — 内容管线四个 skill 总览
- `docs/ai-tutor-skill.md` — AI 导师(留言箱/备课)总契约
- `AGENTS.md` — 项目总手册
