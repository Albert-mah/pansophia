# skill:questions — 出题(每张 drill 卡 ≥3 道)

给 drill 卡配题。题目入 PG `questions` 表(经本地 API,不用 PG 凭证)。
JSON 契约:`docs/card-system.md` §四。种子样例:`tools/seeds/questions-20260702-cards-seed.json`。

## 出题原则

1. **题从卡片里长出来**:先读这张卡的 body / example / pitfall。
   - example 换数值/换情境 → 变体组(同 `group`);
   - pitfall 直接变成错误选项(用户真的会这么错,选项才有价值);
   - 课后习题风格:考卡片讲的考法,不超纲。
2. 每张 drill 卡 **≥3 题**,其中至少 2 题组成一个变体组(同考法换皮,防背答案)。
3. `choice` 优先(手机上好点);答案唯一、格式复杂的用 `fill`(answer 给全所有可接受写法)。
4. `explain` 必填:一句讲对为什么对、错为什么错。
5. `kp` = 卡片的 kp,**逐字符一致**(从 cards 文件复制)。
6. `point` = 这道题考的卡片**小点标题**(逐字符抄该小点的 `t`),每题都带
   —— 小节级挂题靠它,别偷懒。

## 步骤

1. 写 JSON 文件到 `tools/seeds/questions-<日期>-<主题>.json`(数组,字段见契约)。
2. 校验:`python3 tools/import_questions.py <file> --dry-run` → 通过才继续。
3. 查重:对每个 kp 先 `curl -s --get --data-urlencode "kp=<kp>" http://127.0.0.1:8790/api/questions`
   看已有几题、考法是否重复 —— **已有同考法的不要再入,补缺的考法**。
4. 入库:`python3 tools/import_questions.py <file>`(需要本地 server.py 在跑;
   group → variant_of 由脚本自动回填)。
5. 验收:`python3 tools/import_questions.py --coverage` → 所有 drill 卡 ≥3 题、退出码 0。

## 禁止

- 直连 PG 写题(必须走脚本/API)。
- 无 kp 入题、explain 留空、选项里有两个可争议的正确项。
- 同一考法重复灌题(查重那步不许跳)。

## 产出汇报

kp 清单 × 各配几题、变体组数、coverage 输出。
