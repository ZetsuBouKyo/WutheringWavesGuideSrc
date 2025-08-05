# Wuthering Waves Guide

[鳴潮攻略網站](https://wutheringwavesguide.netlify.app/)的原始碼。網站內包含共鳴者傷害分析、傷害計算機、排軸產圖小工具。

- [0+1 隊伍 Tier List](https://wutheringwavesguide.netlify.app/tiers/t01/affixes_15_1) 本 Tier List 由於開發者時間有限，尚未包含所有隊伍、手法，歡迎大家加入開發完善。
- [簡易傷害計算機](https://wutheringwavesguide.netlify.app/tool/simple_calculator)
- [模板傷害計算機](https://wutheringwavesguide.netlify.app/tool/template_calculator) 可以依照手法進行複雜的傷害分析。
- [排軸小工具](https://wutheringwavesguide.netlify.app/tool/rotation_builder) 可以線上產排軸圖。

## Damage analysis

共鳴者傷害分析舉例: [珂萊塔](https://wutheringwavesguide.netlify.app/resonator/1107)

輸出手法詳細分析舉例: [珂萊塔](https://wutheringwavesguide.netlify.app/template/82176157/damage_analysis/affixes_20_skill_bonus)

- 隊伍輸出占比
- 增益傷害占比
- 技能傷害占比
- 技能種類傷害占比，即常態攻擊、共鳴技能、共鳴回路、共鳴解放、變奏技能、延奏技能
- 技能加成傷害占比，即普攻、重擊......等
- 輸出手法
- 傷害列表
- 詳細傷害計算

## Development

### Windows

#### Web

```script
# Install packages
npm install -i

# Generate the cache file
ts-node .\scripts\get_templates.ts

# Run dev
npm run dev

# Build the website
npm run build

# Run the website preview
## The website will be served from the files under `./dist/**/*`.
npm run preview
```

## Disclaimer

本網站/本文件所提供的數據分析、計算結果及相關內容均基於玩家社群收集的數據、實驗測試及推測分析，並非來自官方數據或保證準確。

### 數據來源與準確性

- 本分析基於遊戲內測試數據、社群貢獻及公開資訊，可能存在誤差或遺漏。
- 遊戲更新、補丁或平衡調整可能導致數據變動，本網站/本文件不保證即時更新或維持準確性。

### 使用風險

- 本分析結果僅供參考，實際傷害可能因個人操作、武器、聲骸搭配及其他變數而有所不同。
- 玩家應根據自身需求與遊玩體驗作出最佳決策，而非完全依賴本分析內容。

### 與官方無關

- 本網站/本文件與《鳴潮》官方無任何關聯，所有內容均為第三方數據分析與研究。
- 《鳴潮》及相關名稱、圖像、數據均屬原版權方所有，本分析僅供非商業用途參考。

### 最終解釋權

- 本網站/本文件保留對數據分析內容的調整權，若有任何問題，請自行斟酌使用。
