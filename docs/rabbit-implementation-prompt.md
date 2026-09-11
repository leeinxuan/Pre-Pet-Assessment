# 兔版飼養評估遊戲實作指令

> **用途**：將此文件提供給 AI，讓它依照現有貓版/犬版程式碼的模式，為兔版新增所有必要的 TypeScript 資料檔案。
> **專案路徑**：`C:\Users\User\Desktop\飼養前評估遊戲`
> **不可觸碰**：所有犬版（dog）與現有貓版（cat）程式碼，以及所有共用元件

---

## 任務概述

在 `app/data/species/rabbit/` 建立 6 個新檔案，並更新 3 個現有共用入口檔案，讓兔版加入遊戲物種選項。所有內容來自 `docs/rabbit-game-planning.md`（下稱「企劃文件」）。

---

## 步驟 0：在開始寫程式碼之前，請先讀取以下檔案

讓 AI 先讀取，用來理解格式模板：

```
app/data/species/cat.ts                         ← 貓版 assets 與 speciesData 格式
app/data/species/dog.ts                         ← 犬版同上
app/data/species/cat/report.ts                  ← report 格式
app/data/species/dog/preparation.ts             ← roomItems / hazards / trunkItems 格式
app/data/species/cat/scenarios.ts               ← Scenario[] 格式（包含 multipleChoice 題）
app/data/species/cat/breed-challenges.ts        ← BreedChallengeQuestion[] 格式
app/data/species/cat/journey.ts                 ← JourneyItem[] 與 dailyBehaviorScenarioIds 格式
app/data/species/species-config.ts              ← SpeciesId 與 speciesConfig 格式
app/data/species/index.ts                       ← 物種入口匯出格式
app/data/species/journey.ts                     ← getLifeScenariosForSpecies 等 switch 函式格式
docs/rabbit-game-planning.md                    ← 所有兔版內容的唯一來源
```

---

## 步驟 1：新建 `app/data/species/rabbit/report.ts`

**格式參考**：`app/data/species/cat/report.ts`（型別 `SpeciesReportConfig`）

內容規格（直接從企劃文件 §7.3 轉換）：

- `dailyCareTime`：`"每日約需安排 1～2 小時"`
- `dailyCareTimeNote`：涵蓋牧草補充、飲水更換、便盆清潔、放風陪伴、糞便觀察
- `dailyCareBreakdown`（4 筆，格式 `{ title, detail }`）：
  - 牧草補充與飲水更換 → `"約 10～15 分鐘"`
  - 便盆清潔與糞便觀察 → `"約 5～10 分鐘"`
  - 放風陪伴與互動 → `"約 30～60 分鐘"`
  - 環境巡視與狀況觀察 → `"約 5～10 分鐘"`
- `checklistGroups`：三組（每日照顧、家中環境、外出與接回），內容從企劃文件 §4 提取
- `handlingRows`：至少包含以下情境（二欄：情境 / 做法）：
  - 忙碌或離家
  - 食慾下降或糞便量驟減
  - 換毛期大量脫毛
  - 夏季高溫（28℃ 以上）
  - 居家安全
  - 高齡階段（6 歲以上）
- `moneyDisclaimer`：與貓版措辭相同，將「貓咪」改為「兔子」

---

## 步驟 2：新建 `app/data/species/rabbit/preparation.ts`

**格式參考**：`app/data/species/dog/preparation.ts`（型別 `RoomItem[]`、`HazardItem[]`、`TrunkItem[]`）

### 2-A roomItems（企劃文件 §4.1.1）

共 7–9 項（必要優先，建議項可選）：

| id | label | 必要性 | 素材路徑說明 |
|---|---|---|---|
| `hay-rack` | 牧草架 | 必要 | `// TODO(rabbit-assets): /assets/rabbit/room/hay-rack.png` |
| `heavy-water-bowl` | 較重的飲水碗 | 必要 | 暫借 `/assets/cat/feeding/cat-water-bowl.png` |
| `litter-box` | 便盆（附吸附墊料） | 必要 | 暫借 `/assets/cat/room/cat-litter-box.png` |
| `hiding-box` | 躲藏箱／小屋 | 必要 | `// TODO(rabbit-assets): /assets/rabbit/room/hiding-box.png` |
| `anti-slip-mat` | 防滑墊 | 必要 | `// TODO(rabbit-assets): /assets/rabbit/room/anti-slip-mat.png` |
| `cooling-mat` | 陶板涼感墊 | 重要 | 暫借 `/assets/cat/room/cooling-mat.png` |
| `chew-toy` | 咀嚼玩具（木製） | 重要 | `// TODO(rabbit-assets): /assets/rabbit/room/chew-toy.png` |

placement 座標：參考 dog/cat 的數值範圍（x/y 為百分比），自行估算合理位置即可，後續會依視覺調整。

### 2-B hazards（企劃文件 §4.1.2）

共 5–6 項：

| id | label | 素材路徑說明 |
|---|---|---|
| `cable` | 電線 | 暫借 `/assets/dog/room/wire.png` |
| `toxic-plant` | 有毒植物（蔥蒜洋蔥等） | `// TODO` |
| `plastic-item` | 塑膠製品 | `// TODO` |
| `foam-mat-with-edges` | 有邊角的海棉墊 | `// TODO` |
| `high-platform` | 過高的平台（無保護） | `// TODO` |

### 2-C trunkItems（企劃文件 §4.2.1）

共 6 項：

| id | label | 素材路徑說明 |
|---|---|---|
| `carrier` | 安全外出籠／提袋 | 暫借 `/assets/dog/preparation/carrier.png` |
| `anti-slip-liner` | 防滑墊（籠內鋪底） | `// TODO` |
| `hay-in-carrier` | 少量牧草（籠內放置） | `// TODO` |
| `cooling-pack` | 保冷袋／冰袋（夏季必備） | `// TODO` |
| `id-card` | 身分證 | 暫借 `/assets/dog/preparation/id-card.png` |
| `adoption-documents` | 領養資料／購買文件 | 暫借 `/assets/dog/preparation/adoption-documents.png` |

**最後匯出**：`export const rabbitPreparation = { roomItems, hazards, trunkItems } as const;`

---

## 步驟 3：新建 `app/data/species/rabbit/breed-challenges.ts`

**格式參考**：`app/data/species/cat/breed-challenges.ts`（型別 `BreedChallengeQuestion[]`，函式 `buildBreedChallengeScenarios`）

兔版不分品種，Record key 固定為 `"rabbit"`，共 3 題，全部來自企劃文件 §5.4。

### 考驗 1：食糞行為（企劃文件 §5.4 考驗1）

- `title`：`"等等……牠在吃什麼？"`
- `topic`：`"食糞行為（盲腸便）"`
- 正確選項 index：`1`（「這是食糞行為，盲腸便是必要的營養來源，完全正常」）
- 3 個錯誤選項：從企劃文件 §5.4 考驗1 表格中的 ❌ 選項提取
- `breedKnowledge`（顯示在「做得很好」卡片）：以 `**粗體**` 標示關鍵詞，包含：**圓形硬糞**、**盲腸便（葡萄便）**、**立即食入**、**必需胺基酸與 B 群維生素**、**長期出現在便盆中未被食入**

### 考驗 2：繁殖力（企劃文件 §5.4 考驗2）

- `title`：`"一對兔子……會變成幾隻？"`
- `topic`：`"繁殖力與絕育時機"`
- 正確選項 index：`2`（「兔子繁殖力極強，4–5 月齡就應諮詢獸醫評估絕育」）
- 3 個錯誤選項：從企劃文件 §5.4 考驗2 表格提取
- `breedKnowledge`：關鍵詞粗體包含：**3–4 月齡**、**刺激性排卵**、**一年可多次**、**4–5 月齡**、**絕育**、**子宮腫瘤**、**噴尿標記**

### 考驗 3：不可洗澡（企劃文件 §5.4 考驗3）

- `title`：`"兔子可以洗澡嗎？"`
- `topic`：`"正確清潔方式（禁止洗澡）"`
- 正確選項 index：`2`（「用梳子定期梳毛，局部髒污用稍微濕潤的毛巾輕輕擦拭」）
- 3 個錯誤選項：從企劃文件 §5.4 考驗3 表格提取
- `breedKnowledge`：關鍵詞粗體包含：**不能洗澡**、**休克**、**不適合使用寵物乾洗粉**、**定期梳毛**、**微濕毛巾**、**諮詢兔科獸醫**

**匯出函式**：
```typescript
export function getRabbitBreedChallengeScenarios(_breedId: string) {
  return buildBreedChallengeScenarios(rabbitBreedChallengeContent["rabbit"], "rabbit");
}
```

---

## 步驟 4：新建 `app/data/species/rabbit/scenarios.ts`

**格式參考**：`app/data/species/cat/scenarios.ts`（型別 `Scenario`，使用 `incorrect`、`positive` 輔助函式）

共需 8 個 Scenario，全部內容來自企劃文件 §5：

### 4-1 `rabbit-arrival-adjustment`（§5.2.2）
- `stage`：`"接回家"`
- `multipleChoice`：false（單選）
- 正確選項：「保持安靜，讓牠自己決定何時出來」
- 3 個錯誤選項：從 §5.2.2 表格提取
- `correctFeedback.knowledgePoints`（1–2 條，**重點標示**）：躲藏是正常壓力反應；讓牠自主探索建立信任

### 4-2 `rabbit-stomp`（§5.3.1 D-2）
- `stage`：`"日常照護"`
- `multipleChoice`：true（複選）
- 正確選項 ids：保持安靜 + 放熟悉墊料
- 錯誤選項 ids：強迫抱起 + 誤解跺腳是歡迎

### 4-3 `rabbit-heatstroke-prevention`（§5.3.1 D-3 第一階段）
- `stage`：`"日常照護"`
- `multipleChoice`：true（複選）
- 正確選項：確保室內冷氣/風扇 + 陶板涼感墊
- 錯誤選項：移到陽台 + 噴霧瓶噴水
- `correctFeedback`：「做得好！兔子最適環境是 15–25℃……」（含接續第二階段的提示句）

### 4-4 `rabbit-heatstroke-emergency`（§5.3.1 D-3 第二階段）
- `stage`：`"日常照護"`
- `multipleChoice`：false（單選）
- **注意**：此題由元件在 `rabbit-heatstroke-prevention` 完成後自動串接顯示，請在 `journey.ts` 的 `dailyBehaviorScenarioIds` 中**不包含**此 id，只包含 `rabbit-heatstroke-prevention`。
- 正確選項：「立刻移到冷氣房，開冷氣，密切觀察，若持續惡化立即就醫」

### 4-5 `rabbit-shedding`（§5.3.1 D-4）
- `stage`：`"日常照護"`
- `multipleChoice`：true（複選）
- 正確選項：每天梳毛 + 觀察排便
- 錯誤選項：立刻看獸醫（⚠️先觀察，非直接錯誤，result 可用 `"incorrect"` 或自訂） + 洗澡

### 4-6 `rabbit-busy-care`（§5.5.1）
- `stage`：`"當生活發生變化"`
- `multipleChoice`：false（單選）
- 正確選項：「請家人或朋友每天來幫忙照顧」
- 3 個錯誤選項：從 §5.5.1 表格提取
- 備援確認 4 項（企劃文件 §5.5.1 表格）以 `busyCareChecklist` 或 metadata 方式附加，具體格式依現有 `cat-busy-care` scenario 實作而定

### 4-7 `rabbit-health-emergency`（§5.5.2）
- `stage`：`"健康緊急狀況"`
- `multipleChoice`：false（單選）
- 正確選項：「立刻聯繫兔科獸醫，帶去看診」
- 3 個錯誤選項：從 §5.5.2 表格提取

### 4-8 `rabbit-senior-care`（§5.5.3）
- `stage`：`"逐漸進入高齡"`
- `multipleChoice`：true（複選）
- 正確選項：提高健檢頻率 + 降低出入高度增加軟墊
- 錯誤選項：減少活動空間 + 減少牧草改軟食

**匯出**：`export const rabbitLifeScenarios: Scenario[]`

---

## 步驟 5：新建 `app/data/species/rabbit/journey.ts`

**格式參考**：`app/data/species/cat/journey.ts`

### journeyItems（JourneyItem[]）

依序排列：

```typescript
export const rabbitJourneyItems: JourneyItem[] = [
  { id: "rabbit-arrival",         type: "scenario",             timeLabel: "接回家",           title: "到家的第一天",       scenarioId: "rabbit-arrival-adjustment" },
  { id: "rabbit-first-meal",      type: "arrival-meal",         timeLabel: "接回家",           title: "第一餐" },
  // D-1 抱兔排序遊戲（新 activity 類型，元件待建）
  { id: "rabbit-carry-sort",      type: "rabbit-carry-sort",    timeLabel: "日常照護",         title: "試著抱起 {petName}" },
  { id: "rabbit-daily-care",      type: "scenario",             timeLabel: "日常照護",         title: "兔兔日常照護" },
  // 兔兔日常巡視（新 activity 類型，類似貓砂盆巡視，元件待建）
  { id: "rabbit-daily-check",     type: "rabbit-daily-check",   timeLabel: "日常照護",         title: "早安，{petName}！" },
  { id: "breed-challenge",        type: "breed-challenge",      timeLabel: "兔子的考驗",       title: "兔子的考驗" },
  { id: "rabbit-busy-care",       type: "scenario",             timeLabel: "當生活發生變化",   title: "臨時出差，{petName} 怎麼辦？", scenarioId: "rabbit-busy-care" },
  { id: "rabbit-health",          type: "scenario",             timeLabel: "健康緊急狀況",     title: "糞便突然變少了",               scenarioId: "rabbit-health-emergency" },
  { id: "rabbit-senior",          type: "scenario",             timeLabel: "逐漸進入高齡",     title: "{petName} 進入高齡期",         scenarioId: "rabbit-senior-care" },
];
```

> **注意**：`"rabbit-carry-sort"` 與 `"rabbit-daily-check"` 是新的 activity type，需要後續在 `game-types.ts` 的 `JourneyItem` union 中加入，並新建對應的 React 元件。本次實作先定義資料，元件為後續工作。

### dailyBehaviorScenarioIds

D-2、D-3 第一階段、D-4（**不包含** D-3 第二階段 `rabbit-heatstroke-emergency`）：

```typescript
export const rabbitDailyBehaviorScenarioIds = [
  "rabbit-stomp",
  "rabbit-heatstroke-prevention",
  "rabbit-shedding",
] as const;
```

### rabbitDailyCheckConfig（兔兔日常巡視，對應貓版 catLitterRescueConfig）

```typescript
export const rabbitDailyCheckConfig = {
  steps: ["hay-rack", "water-bowl", "litter-box", "poop-observation"] as const,
  // 第四步隨機出現三種情境之一
  poopVariants: ["normal", "reduced", "cecotrope-uneaten"] as const,
} as const;
```

**匯出**：`export const rabbitJourneyItems`、`export const rabbitDailyBehaviorScenarioIds`、`export const rabbitDailyCheckConfig`

---

## 步驟 6：新建 `app/data/species/rabbit/index.ts`

**格式參考**：`app/data/species/cat.ts`

### rabbitAssets

結構與 `catAssets` 相同，所有 `/assets/rabbit/...` 路徑均加 `// TODO(rabbit-assets)` 注釋；可借用的路徑直接引用：

```typescript
export const rabbitAssets = {
  selection: {
    // TODO(rabbit-assets): /assets/rabbit/selection/rabbit.png
    rabbit: "/assets/rabbit/selection/rabbit.png",
  },
  room: {
    // TODO(rabbit-assets): 補入兔版房間背景
    background: "/assets/rabbit/room/rabbit-room.png",
    mobileBackground: "/assets/rabbit/room/rabbit-room-mobile.png",
    hayRack: "/assets/rabbit/room/hay-rack.png",             // TODO
    waterBowl: "/assets/cat/feeding/cat-water-bowl.png",    // 暫借貓版
    litterBox: "/assets/cat/room/cat-litter-box.png",       // 暫借貓版
    hidingBox: "/assets/rabbit/room/hiding-box.png",        // TODO
    coolingMat: "/assets/cat/room/cooling-mat.png",         // 暫借貓版
  },
  feeding: {
    hay: "/assets/rabbit/feeding/hay.png",                  // TODO
    leafyVeggie: "/assets/rabbit/feeding/leafy-veggie.png", // TODO
    freshWater: "/assets/cat/feeding/cat-water-bowl.png",   // 暫借
    carrotMain: "/assets/rabbit/feeding/carrot-main.png",   // TODO
    onion: "/assets/rabbit/feeding/onion.png",              // TODO
    macadamia: "/assets/rabbit/feeding/macadamia.png",      // TODO
  },
  preparation: {
    carrier: "/assets/dog/preparation/carrier.png",         // 暫借犬版
    idCard: "/assets/dog/preparation/id-card.png",          // 暫借犬版
    documents: "/assets/dog/preparation/adoption-documents.png", // 暫借犬版
    coolingPack: "/assets/rabbit/preparation/cooling-pack.png",  // TODO
  },
  daily: {
    // TODO(rabbit-assets): 兔兔日常巡視場景背景
    checkBackground: "/assets/rabbit/room/rabbit-room.png",
  },
} as const;
```

### rabbitSpeciesData

```typescript
export const rabbitSpeciesData = {
  id: "rabbit" as const,
  assets: rabbitAssets,
  lifeScenarios: rabbitLifeScenarios,
  journeyItems: rabbitJourneyItems,
  breedChallenges: getRabbitBreedChallengeScenarios,
  dailyBehaviorScenarioIds: rabbitDailyBehaviorScenarioIds,
  dailyCheck: rabbitDailyCheckConfig,
} as const;
```

從以下路徑 import：
- `./rabbit/scenarios` → `rabbitLifeScenarios`
- `./rabbit/journey` → `rabbitJourneyItems`, `rabbitDailyBehaviorScenarioIds`, `rabbitDailyCheckConfig`
- `./rabbit/breed-challenges` → `getRabbitBreedChallengeScenarios`

---

## 步驟 7：更新現有共用檔案（最小幅度修改）

### 7-A `app/data/species/species-config.ts`

1. 將 `SpeciesId = "dog" | "cat"` 改為 `"dog" | "cat" | "rabbit"`
2. 在 `speciesConfig` 物件新增 `rabbit` 欄位（仿照 `cat` 格式）：

```typescript
rabbit: {
  // legacySpeciesGameConfig 若無 rabbit 則省略 spread
  assets: rabbitSpeciesData.assets,
  lifeScenarios: rabbitSpeciesData.lifeScenarios,
  journeyItems: rabbitSpeciesData.journeyItems,
  breedChallenges: rabbitSpeciesData.breedChallenges,
  dailyBehaviorScenarioIds: rabbitSpeciesData.dailyBehaviorScenarioIds,
  dailyCheck: rabbitSpeciesData.dailyCheck,
  dailyActivity: "rabbit-daily-check" as const,
},
```

3. `getSpeciesConfig` 函式加入 rabbit 分支：
```typescript
export function getSpeciesConfig(species: string | undefined): SpeciesConfig {
  if (species === "cat") return speciesConfig.cat;
  if (species === "rabbit") return speciesConfig.rabbit;
  return speciesConfig.dog;
}
```

### 7-B `app/data/species/journey.ts`

在 `getLifeScenariosForSpecies`、`getBreedChallengeScenarios`、`getJourneyItemsForSpecies` 三個函式中各加入 rabbit 分支：

```typescript
// 範例（其他函式同理）
export function getLifeScenariosForSpecies(species: string): Scenario[] {
  if (species === "cat") return catLifeScenarios;
  if (species === "rabbit") return rabbitLifeScenarios;
  return dogLifeScenarios;
}
```

同時補上 rabbit 相關 import。

### 7-C `app/data/species/index.ts`

在 `speciesConfigs` 物件新增 rabbit（仿照 cat 格式）：

```typescript
rabbit: {
  ...rabbitConfig,
  // 若無 speciesGameConfig.rabbit，省略 copy spread
  roomItems: rabbitConfig.preparation.roomItems,
  hazards: rabbitConfig.preparation.hazards,
  trunkItems: rabbitConfig.preparation.trunkItems,
},
```

並更新 `getSpeciesConfig` 回傳邏輯加入 rabbit。

---

## 步驟 8：完成後執行確認

```bash
corepack pnpm run build
corepack pnpm test
corepack pnpm run lint
```

若 TypeScript 出現 `JourneyItem` type 錯誤（因為 `"rabbit-carry-sort"` 與 `"rabbit-daily-check"` 是新 type），請在 `game-types.ts` 的 `JourneyItem.type` union 中加入這兩個新值，並加上 TODO 注釋說明元件待建。

---

## 注意事項

- **不要修改任何犬版（dog）程式碼**
- **不要修改任何現有貓版（cat）內容**
- **不要刪除或重構現有元件**
- 所有兔版素材路徑若尚未提供，一律以 `// TODO(rabbit-assets): 說明` 注釋標示
- `placement` 座標為暫定值，待視覺設計確認後調整
- `rabbit-carry-sort` 與 `rabbit-daily-check` 兩個新 activity 類型只定義資料，元件為獨立後續工作
