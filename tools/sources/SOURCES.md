# 开源数据来源（导入种子）

- `jlpt_n5_vocab.csv` — JLPT N5 词表（漢字+读音），来自 Bluskyo/JLPT_Vocabulary（MIT）。
  https://github.com/Bluskyo/JLPT_Vocabulary
- `jlpt_kanji.json` — JLPT 各级汉字（含义/笔画/频度），来自 AnchorI/jlpt-kanji-dictionary（MIT）。
  https://github.com/AnchorI/jlpt-kanji-dictionary

导入脚本：tools/import_jlpt.py → 生成 data/words.ja.js
均为 MIT 许可，注明出处即可使用。
