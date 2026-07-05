# skill:questions — 出题(每张 drill 卡 ≥3 道)

给 drill 卡配题。题目入 PG `questions` 表(经本地 API,不用 PG 凭证)。
JSON 契约:`docs/card-system.md` §四。种子样例:`tools/seeds/questions-20260702-cards-seed.json`。

## 出题原则

1. **题从卡片里长出来**:先读这张卡的 body / example / pitfall。
   - example 换数值/换情境 → 变体组(同 `group`);
   - pitfall 直接变成错误选项(用户真的会这么错,选项才有价值);
   - 课后习题风格:考卡片讲的考法,不超纲。
2. 每张 drill 卡 **≥3 题**,其中至少 2 题组成一个变体组(同考法换皮,防背答案)。
3. `choice` 优先(手机上好点);答案唯一、格式复杂的用 `fill`(answer 给全所有可接受写法);
   判断题 = 2 选项 choice。英语/日语可用 `listen`(听音选词):options 放近音词或
   「听句选义」的选项,`audio` 写要朗读的词/句(缺省=正确选项);辨音类每卡 1-2 道即可,
   别整卡全是听力。
4. `explain` 必填:一句讲对为什么对、错为什么错。
5. `kp` = 卡片的 kp,**逐字符一致**(从 cards 文件复制)。
6. `point` = 这道题考的卡片**小点标题**(逐字符抄该小点的 `t`),每题都带
   —— 小节级挂题靠它,别偷懒。

7. **交互复习题**(可选任务,通常单独派):给讲解页的交互演示(`.lab` 块)配理解检验题。
   规则与普通题相同,另加:`lab` = 交互 `.lab-title` 标题**原文**(含 emoji,从页面 HTML 复制);
   `kp` = **页面 catalog id**(不是考点标题);stem 必须把交互场景讲清楚,脱离页面也能作答
   (例:「两版入库单的对比实验里,好版只留 5 个核心字段,这体现了哪种负荷的削减?」);
   选项考「这个交互想让你体会什么」,错误选项 = 对交互的常见误读;每个交互 1 题为主,至多 2 题。

## 步骤

1. 写 JSON 文件到 `tools/seeds/questions-<日期>-<主题>.json`(数组,字段见契约)。
2. 校验:`python3 tools/import_questions.py <file> --dry-run` → 通过才继续。
3. 查重:对每个 kp 先 `curl -s --get --data-urlencode "kp=<kp>" http://127.0.0.1:8790/api/questions`
   看已有几题、考法是否重复 —— **已有同考法的不要再入,补缺的考法**。
4. 入库:`python3 tools/import_questions.py <file>`(需要本地 server.py 在跑;
   group → variant_of 由脚本自动回填)。
5. 验收:`python3 tools/import_questions.py --coverage` → 所有 drill 卡 ≥3 题、退出码 0。

## 灌错了怎么修

发现已导入的题有错(答案错/选项重复/考法废):
`curl -X POST http://127.0.0.1:8790/api/questions/delete -H "Content-Type: application/json" -H "X-Write-Token: <token>" -d '{"id": <题id>}'`
删掉后把修正版走正规 import 重灌,并同步改 seed 文件保持一致。token 读 ~/.studyhub/config.json。

## 禁止

- **任何情况下都不许直连 PG**(写题/删题都走 API;删除端点已有,没有借口)。
- 无 kp 入题、explain 留空、选项里有两个可争议的正确项。
- 同一考法重复灌题(查重那步不许跳)。

## 产出汇报

kp 清单 × 各配几题、变体组数、coverage 输出。
