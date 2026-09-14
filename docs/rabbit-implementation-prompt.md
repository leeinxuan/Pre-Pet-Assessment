# 兔版飼養評估遊戲實作指令

> **用途**：將此文件提供給 AI，讓它依照現有貓版/犬版程式碼的模式，為兔版新增所有必要的 TypeScript 資料檔案。
> **專案路徑**：`C:\Users\User\Desktop\飼養前評估遊戲`
> **不可觸碰**：所有犬版（dog）與現有貓版（cat）程式碼，以及所有共用元件

---

## 🔴 0. 文件來源與優先順序（最優先讀取）

**`docs/rabbit-game-planning.md` 是兔子流程一切內容的唯一來源**，包含：題目、順序、選項、答案、回饋文案、照護知識、階段命名。

實作者必須在寫任何一行程式碼前先讀完 `rabbit-game-planning.md`，再參考本文件進行開發。

**嚴格禁止**：
- 自行簡化、略過或改變題目順序
- 以狗貓題目內容猜測兔子流程
- 依記憶或本文件描述重建題目，而不回頭確認 planning 文件

若本文件（implementation prompt）與 `rabbit-game-planning.md` 有任何衝突，**以 `rabbit-game-planning.md` 為準**，並於實作後同步更新本文件。

---

## ⚠️ 核心架構原則（實作前必讀）

### A. 兔子必須使用既有共用元件與版型

兔版不得建立任何新的獨立頁面元件或版型。以下項目**全部沿用**狗狗／貓咪的對應共用實作：

- 情境題頁（ScenarioPage / QuestionPage）
- 選項樣式（ChoiceCard / AnswerOption）
- 「做得很好」回饋頁（CorrectFeedbackPage / WellDonePage）
- KnowledgeCard（知識卡片）
- 飼養觀念回顧頁（ReviewPage）
- 取得寵物頁（AdoptionSourcePage）

兔版差異**只能**集中在 `app/data/species/rabbit/` 的 config／data 檔案中，包含：名稱與物種資訊、素材 mapping、準備物品、題目與答案、情境回饋與小知識、每日投入時間、費用。

**唯一的例外**：若有素材定位等版面上不可避免的差異，可使用**小範圍**兔子專屬 CSS selector（例如 `.species-rabbit .room-item`），但**不可新增整套兔子版面樣式**。

#### 情境頁版型細節

兔子必須完全複用以下現有版型結構，**不可建立兔子獨立的情境題 JSX 或大量 `.rabbit-*` 版型 CSS**：

- 階段小標（stageTitle）
- 題目主標題（title）
- 情境描述（description）
- 左側媒體區（SceneMedia）、右側選項區（choices）
- 手機版上下堆疊（現有 responsive 樣式）

素材缺失**只能觸發 placeholder**，不得改變整個頁面的結構或排版。

---

### B. 情境媒體（SceneMedia）fallback 規格

所有兔子情境題必須使用共用 `SceneMedia`（或現有情境媒體元件），並滿足以下規則：

1. **兔子影片或圖片尚未提供時，不可**：
   - 省略媒體區塊（造成版型位移）
   - 讓整個情境頁退化為全寬選項頁

2. **必須顯示統一的 placeholder**，包含以下四個元素：
   - 虛線圓角容器（`border: 2px dashed`，圓角 `8px` 以上）
   - `影片製作中` 標籤（小字，次要色）
   - 目前情境題的 `title`（中字，顯示題目名稱讓 QA 能對照）
   - `情境影片將於後續補上。` 說明文字（小字）

3. **升級路徑**：媒體 placeholder 的判斷邏輯必須是「路徑是否存在且可載入」，不可硬寫 `if (species === "rabbit")`。日後只要在 scenario data 補上正確的媒體路徑，即自動改為顯示正式影片／圖片，**不需修改任何版型 component**。

4. **實作方式**：在 scenario data 的 `media` 欄位設為 `null`（或空字串 `""`）時，共用 SceneMedia 元件應顯示上述 placeholder，而非崩潰或消失。確認現有元件是否已有此邏輯；若無，以**最小幅度修改元件**（加一個 null guard），不可重寫整個元件。

---

### B-2. 素材 fallback 規則

所有兔子素材 mapping **必須有明確且可用的 fallback**：

1. **不可假設兔子素材已存在**。任何標註 `// TODO(rabbit-assets)` 的路徑，在實際檔案存在前都可能載入失敗。
2. **不可對可能為 `undefined` 的素材呼叫 `.import`、`.src` 或任何屬性**，必須先檢查該值是否存在。
3. **fallback 優先順序**：
   - 有標記 fallback 的 → 直接使用 fallback 路徑
   - 無 fallback 標記但功能與構圖相近的狗狗／貓咪素材 → 標記為暫用素材並借用
   - 無法借用的 → 使用程式碼中已定義的 placeholder（空白圖、預設圖示等）
4. **不可使用**：不存在的檔名、空字串 `""`、未定義的 asset key。
5. **實作完成後**，必須逐一確認下列所有素材參照均可正常載入：
   - 所有 `<img>` 的 `src`
   - 所有 `<video>` 的 `src`
   - 所有 CSS `url()` 背景圖
   - 所有動態 mapping（例如 `assets[itemId]`）
   - 所有下載路徑

---

### C. 階段資料（stageId／stageTitle／order）完整定義規格

每個兔子情境題都必須在 scenario data 中**明確定義**以下欄位，**不可由 component 透過 index 或預設值推斷**：

| 欄位 | 說明 |
|---|---|
| `id` | 全域唯一字串，例如 `"rabbit-arrival-adjustment"` |
| `stageId` | 階段識別字串，決定側欄分組 |
| `stageTitle` | 顯示於階段小標的文字 |
| `order` | 該階段內的排列順序（整數，從 1 開始） |
| `title` | 情境題主標題 |
| `description` | 情境描述（一到兩段文字） |
| `media` | 影片或圖片路徑；尚未備妥時設為 `null` |
| `questionType` | `"single"` / `"multiple"` / `"confirm"` 等，與現有型別一致 |
| `knowledgeCard` | `{ title, content }` 物件（見規則 E） |
| `summaryCategory` | 此題答對後要寫入「飼養觀念回顧」的分類 id（見飼養觀念回顧規格） |

#### 必須使用的 stageTitle 對照表

以下為兔子流程所有階段的**固定名稱**，側欄、進度條、回顧分類、上一題／下一題全部使用此對照表，不可自行命名：

| stageId | stageTitle | 包含的情境 |
|---|---|---|
| `arrival` | `接回家` | 到家第一天、餵食互動、第一餐 |
| `daily-care` | `日常照護` | D-1 排序、D-2 跺腳、D-3 中暑、D-4 換毛、日常巡視 |
| `rabbit-challenge` | `兔子的考驗` | 三道考驗題（食糞、繁殖、洗澡） |
| `life-change` | `當生活發生變化` | 忙碌照護多步驟確認 |
| `health` | `健康與排泄觀察` | 糞便驟減、食慾觀察 |
| `senior` | `高齡後的照護準備` | 高齡照護 |

> **重要**：兔子雖跳過**品種選擇頁**，但「兔子的考驗」（`rabbit-challenge`）是獨立的旅程階段，**不可因此省略或錯置**。

#### 資料一致性要求

側邊欄、進度條、上一題／下一題按鈕、實際頁面渲染順序、飼養觀念回顧分類，**全部必須讀取同一份 `rabbitJourneyItems` + scenario data**，不可各自維護獨立順序。

---

### D. 兔子選擇物種圖片規則

- 物種選擇頁的兔子圖片**固定使用既有的 `rabbit.png`**（路徑：`/assets/rabbit/selection/rabbit.png` 或現有實際路徑）。
- **不得替換、刪除或以 placeholder 覆蓋此圖片**。
- 此圖片需出現於下列位置：
  - 物種選擇頁（SpeciesSelectionPage）的兔子選項卡片
  - 旅程側欄（Journey Sidebar）中的物種圖示（若有）
  - 報告摘要頁（ReportPage）的物種圖示（若有）

---

### E. 知識卡（KnowledgeCard）標題與物種文案規格

`KnowledgeCard` 的標題與內容**必須由 scenario data 的 `knowledgeCard` 欄位傳入**，不可在共用元件內硬寫任何物種文字。

#### 兔子允許使用的知識卡標題

| 情境類型 | knowledgeCard.title |
|---|---|
| 一般日常照護 | `兔子小知識` |
| 高齡照護題 | `兔子高齡照護小知識` |
| 未來有品種資料時 | `{品種}小知識`（預留，現在統一用上兩種） |

#### 嚴格禁止

兔子流程中**任何頁面、任何狀態**下，都不得出現：

- `狗狗小知識`
- `柴犬小知識`（或任何犬種名稱）
- `貓咪小知識`（或任何貓種名稱）
- 其他非兔子的物種文案

若共用 `KnowledgeCard` 元件目前有物種相關的預設標題（例如預設顯示 `狗狗小知識`），必須改為從 props 取得，**不可保留任何硬寫的物種名稱預設值**。此修改屬於最小幅度 bug fix，不影響狗狗、貓咪的現有資料（它們的 scenario data 已有正確標題傳入）。

#### 問題欄位規則（不可重複元件的「你會怎麼做？」）

共用情境頁元件已固定顯示「**你會怎麼做？**」作為題目提示，**scenario data 的 `question` 或 `description` 欄位不可再放入重複的獨立問句**（例如「這個行為的正確解讀是？」、「以下哪個做法正確？」、「以下哪個描述正確？」）。

- 複選題若需提示，只須保留「（請選出所有正確選項）」等**括號補充說明**，不可放完整的獨立問句
- 考驗題（BreedChallengeQuestion）的問題欄位同樣適用此規則

#### 知識卡內容格式規格（重點標示）

> **與犬版、貓版相同格式**：只有 `KnowledgeCard` 元件顯示的內容才會呈現**物種主題色彩標示**；`correctFeedback`／`explanation` 等做得很好回饋文字用 **bold** 標示但不加色彩。

`knowledgeCard.content` 必須符合以下格式：

1. **分行呈現**：每個知識點各自一行（使用 `\n` 分隔或 `content: string[]` 陣列，依元件實作格式）
2. **重點詞彙以 `<mark>` 或元件 highlight prop 標示**（對應企劃文件中的 `**bold**` 詞彙），在 UI 中以物種主題色顯示
3. **每行以 1–2 句為限**，避免單一行文字過長

企劃文件 `**bold**` → 實作對應：
- `knowledgeCard.content` 中：使用元件 highlight 語法（`<mark>` 或 `[text]{highlight}`，依現有實作格式）
- `correctFeedback.explanation` / `learningPoints` 中：使用一般 markdown `**bold**`（不加色彩）

---

### F. 兔子餵食互動頁規格

兔子流程**不可缺少餵食互動頁**（對應狗狗、貓咪的 `arrival-meal` 或餵食互動 activity）。

#### 位置與順序

到家第一天流程的順序**固定為**：
1. `rabbit-arrival-adjustment`（接回家情境題）
2. 兔子餵食互動頁（`arrival-meal` 類型）
3. 後續日常照護題目

**不可省略第 2 步**，也不可將餵食互動插入日常照護段落。

#### 內容規格（從 `rabbit-game-planning.md` §5.2.3 提取）

餵食互動必須使用現有狗狗／貓咪的**共用餵食互動元件**（`ArrivalMealActivity` 或對應元件），並傳入兔子專屬的食物資料。本題採**三類食物設計**：

- **正確食物**（可放入碗中，顯示 ✅ 知識說明）：
  - `hay`：牧草／乾草
  - `leafy-veggie`：新鮮葉菜（青江菜／萵苣）
  - `fresh-water`：乾淨飲水（水碗）

- **警示食物**（▲ 三角形警示，可放入碗中，放入後彈出條件說明，不算錯誤）：
  - `carrot`：整袋紅蘿蔔（顯示名稱不含括號，`result: "caution"` 或同等欄位）
  - 說明：「紅蘿蔔不能當主食，少量偶爾可以，但含糖量偏高，不可替代牧草」
  - **實作注意**：若現有元件只有 `correct`／`incorrect` 兩種 result 類型，需最小幅度擴充為三種（加入 `caution`），UI 顯示 ▲ icon 並允許放入碗中

- **錯誤食物**（❌ 完全禁止，不能放入碗中）：
  - `onion`：洋蔥（有毒）
  - `macadamia`：夏威夷豆（有毒）

- **知識回饋**：正確食物全部放入後顯示兔子食性說明（牧草 >80%、葉菜 10–15%、紅蘿蔔只能極少量偶爾給）

素材未完成時可用**安全 fallback**（借用貓版食物圖示並標注暫用），但**不可省略整個互動頁**。

---

### G. 忙碌照護確認流程規格

`rabbit-busy-care` 情境題**不可只是單一選項題**；兔子流程必須使用與狗狗、貓咪**完全相同的多步驟忙碌照護確認流程**：

#### 六步驟流程（必須全部實作）

1. **選擇可協助照顧者**（家人、朋友、鄰居、寵物旅館等）
2. **輸入協助者名稱**（`{helperName}`，後續步驟顯示用）
3. **顯示照護事項清單**：「請確認 {helperName} 了解以下照護內容」
4. **逐項「是／否」確認**（依下方兔子專屬清單）
5. **顯示回饋**：答「是」項目 ✓，答「否」項目提示需再確認
6. **寫入飼養觀念回顧**：答「否」或不確定的項目寫入「建議再留意的觀念」

#### 兔子忙碌照護確認項目（從 `rabbit-game-planning.md` 提取確切措辭）

- 牧草是否已補充足量（每日確認不斷草）
- 飲水是否已更換（每日換新鮮水）
- 便盆是否已清潔
- 糞便量與外觀是否正常（顏色、大小、數量）
- 活動空間是否安全（沒有電線、有毒物品）
- 緊急聯繫：兔科獸醫電話是否已告知協助者

**嚴格禁止**在兔子確認清單中出現：
- 散步、牽繩、外出如廁（犬專屬）
- 貓砂盆換砂（貓砂盆用詞；兔用「便盆」）
- 任何其他物種專屬文案

---

### H. 飼養觀念回顧（summaryCategory）資料規格

每一個兔子情境題在 scenario data 中都必須定義 `summaryCategory`，決定答對後寫入哪個分類。

#### 兔子摘要分類對照表

| summaryCategory | 分類顯示名稱 | 對應情境 |
|---|---|---|
| `safe-space` | `安全生活空間` | 環境設置、危險物排除 |
| `arrival-adjustment` | `接回與適應` | 到家第一天、餵食互動 |
| `daily-care` | `飲食與日常照護` | 餵食、牧草、巡視、跺腳、換毛 |
| `life-arrangement` | `生活安排與協助照顧` | 忙碌照護確認 |
| `health-observation` | `健康、排泄與高齡照護` | 糞便觀察、食慾、高齡 |

#### 寫入規則

- **單選題**：答對後立刻寫入對應 summaryCategory
- **複選題**：所有必要正確選項都已勾選後才寫入（不可部分勾選就算通過）
- **多步驟忙碌照護**：六步驟全部完成後才寫入 `life-arrangement`
- **答錯或不確定**的項目：寫入「建議再留意的觀念」（不計入「你已建立的照顧觀念」）
- **禁止**使用錯誤的 scenario ID、空 breed key 或其他物種的 key，導致兔子答題紀錄無法被摘要 mapping 讀取

完整走完兔子流程後，「你已建立的照顧觀念」**必須顯示多個分類**（並非只顯示一項），涵蓋玩家實際答對的所有 summaryCategory。

---

### J. 兔子跳過品種選擇規則

兔子**沒有品種選擇頁**，選擇兔子後直接進入取名頁或下一個正式步驟。

**禁止的實作方式**：
- ❌ 先渲染選擇品種頁再立刻跳轉（會造成閃爍）
- ❌ 讓 `selectedBreed` 停留在 `undefined`（會在後續流程造成 runtime error）

**必須確保**：
- 路由與流程步驟陣列：兔子的步驟清單中完全沒有品種選擇頁
- `selectionConfig.skipBreedPage: true`（或對應的旗標），確保路由不會渲染該頁
- `selectedBreed` 在選擇兔子後立刻設定為安全的預設值（例如 `"rabbit"`），不可為 `undefined`
- 側欄進度、上一頁／下一頁按鈕、進度百分比計算：都必須能正確辨識兔子無品種
- 摘要／確認頁：不可出現品種欄位

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
app/data/species/species-config.ts              ← SpeciesId 與 speciesConfig 格式（確認 skipBreedPage 或同等機制的欄位）
app/data/species/index.ts                       ← 物種入口匯出格式
app/data/species/journey.ts                     ← getLifeScenariosForSpecies 等 switch 函式格式
docs/rabbit-game-planning.md                    ← 所有兔版內容的唯一來源
```

同時搜尋並讀取下列元件實作：

```
SceneMedia（或情境媒體元件）                    ← 確認 null/空路徑時的現有行為
KnowledgeCard                                   ← 確認標題是否硬寫，若是則需最小幅度修正
```

讀取時特別注意：
- `species-config.ts` 中品種選擇的跳過機制（`skipBreedPage`、`selectionConfig` 等）
- 品種選擇流程在哪裡決定是否渲染品種頁（路由守衛、flow step 陣列）
- `selectedBreed` 的型別定義與使用位置

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

| id | label | 必要性 | 參考費用（台幣） | 素材路徑 | fallback |
|---|---|---|---|---|---|
| `hay-rack` | 牧草架 | 必要 | 約 300–800 元 | `// TODO(rabbit-assets): /assets/rabbit/room/hay-rack.png` | 暫借 `/assets/dog/room/dog-food-bowl.png` |
| `heavy-water-bowl` | 較重的飲水碗 | 必要 | 約 100–300 元 | `// TODO(rabbit-assets)` | 暫借 `/assets/cat/feeding/cat-water-bowl.png` |
| `litter-box` | 便盆（附吸附墊料） | 必要 | 本體約 200–500 元（墊料另計 150–400 元/月） | `// TODO(rabbit-assets)` | 暫借 `/assets/cat/room/cat-litter-box.png` |
| `hiding-box` | 躲藏箱／小屋 | 必要 | 約 200–800 元 | `// TODO(rabbit-assets): /assets/rabbit/room/hiding-box.png` | 暫借 `/assets/cat/room/cat-bed.png` |
| `anti-slip-mat` | 防滑墊 | 必要 | 約 150–400 元 | `// TODO(rabbit-assets): /assets/rabbit/room/anti-slip-mat.png` | 暫借 `/assets/cat/room/cat-mat.png` |
| `cooling-mat` | 陶板涼感墊 | 重要 | 約 200–600 元 | `// TODO(rabbit-assets)` | 暫借 `/assets/cat/room/cooling-mat.png` |
| `chew-toy` | 咀嚼玩具（木製） | 重要 | 約 50–200 元 | `// TODO(rabbit-assets): /assets/rabbit/room/chew-toy.png` | 暫借 `/assets/dog/room/dog-toy.png` |

> **fallback 使用方式**：若 TODO 路徑對應檔案不存在，直接在 mapping 中使用 fallback 欄位的路徑，並加上 `// 暫用素材` 注釋。

placement 座標：參考 dog/cat 的數值範圍（x/y 為百分比），自行估算合理位置即可，後續會依視覺調整。

### 2-B hazards（企劃文件 §4.1.2）

共 5–6 項：

| id | label | 素材路徑 | fallback |
|---|---|---|---|
| `cable` | 電線 | `// TODO(rabbit-assets)` | 暫借 `/assets/dog/room/wire.png` |
| `toxic-plant` | 有毒植物（蔥蒜洋蔥等） | `// TODO(rabbit-assets)` | 暫借 `/assets/cat/room/toxic-plant.png` |
| `plastic-item` | 塑膠製品 | `// TODO(rabbit-assets)` | 暫借 `/assets/dog/room/plastic-bag.png` |
| `foam-mat-with-edges` | 有邊角的海棉墊 | `// TODO(rabbit-assets)` | 暫借 `/assets/cat/room/cat-mat.png` |
| `high-platform` | 過高的平台（無保護） | `// TODO(rabbit-assets)` | 暫借 `/assets/cat/room/cat-shelf.png` |

### 2-C trunkItems（企劃文件 §4.2.1）

共 6 項：

| id | label | 參考費用（台幣） | 素材路徑 | fallback |
|---|---|---|---|---|
| `carrier` | 安全外出籠／提袋 | 約 600–1,500 元 | `// TODO(rabbit-assets)` | 暫借 `/assets/dog/preparation/carrier.png` |
| `anti-slip-liner` | 防滑墊（籠內鋪底） | 約 50–150 元 | `// TODO(rabbit-assets)` | 暫借 `/assets/cat/room/cat-mat.png` |
| `hay-in-carrier` | 少量牧草（籠內放置） | 0 元（現有牧草） | `// TODO(rabbit-assets)` | 暫借 `/assets/dog/room/dog-food-bowl.png` |
| `cooling-pack` | 保冷袋／冰袋（夏季必備） | 約 100–400 元 | `// TODO(rabbit-assets)` | 暫借 `/assets/cat/room/cooling-mat.png` |
| `id-card` | 身分證 | 無需費用 | `// TODO(rabbit-assets)` | 暫借 `/assets/dog/preparation/id-card.png` |
| `adoption-documents` | 領養資料／購買文件 | 無需費用 | `// TODO(rabbit-assets)` | 暫借 `/assets/dog/preparation/adoption-documents.png` |

**最後匯出**：`export const rabbitPreparation = { roomItems, hazards, trunkItems } as const;`

---

## 步驟 3：新建 `app/data/species/rabbit/breed-challenges.ts`

**格式參考**：`app/data/species/cat/breed-challenges.ts`（型別 `BreedChallengeQuestion[]`，函式 `buildBreedChallengeScenarios`）

兔版不分品種，Record key 固定為 `"rabbit"`，共 3 題，全部來自企劃文件 §5.4。

> **問題欄位規則**：考驗題的 `question` 欄位**不可放入獨立問句**（如「這個行為的正確解讀是？」），元件已固定顯示「你會怎麼做？」。三道考驗題的 `question` 欄位留空或省略。

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

共需 8 個 Scenario，全部內容來自企劃文件 §5。

**每個 Scenario 必須包含以下欄位**（不可省略，不可依 index 推斷）：`id`、`stageId`、`stageTitle`、`order`、`title`、`description`、`media`（`null` 代表影片製作中）、`questionType`、`knowledgeCard: { title, content }`、`summaryCategory`。

### 4-1 `rabbit-arrival-adjustment`（§5.2.2）
- `stageId`：`"arrival"` ／ `stageTitle`：`"接回家"` ／ `order`：`1`
- `description`（情境）：`"等了這麼久，{petName} 終於到家了。你打開外出籠，牠小心翼翼地走出來，鼻子快速抽動，四處嗅了嗅——然後一個箭步衝進了躲藏箱，縮在最裡面，只有鼻子偶爾微微顫動。你看著牠，不確定是不是該做點什麼。"`
- `media`：`null`（影片製作中）
- `questionType`：`"single"`
- `knowledgeCard.title`：`"兔子小知識"`
- `summaryCategory`：`"arrival-adjustment"`
- `multipleChoice`：false（單選）
- 正確選項：「保持安靜，讓牠自己決定何時出來」
- 3 個錯誤選項：從 §5.2.2 表格提取
- `correctFeedback.learningPoints`（2 條，**重點標示**）：
  - **躲藏**是兔子面對新環境的正常**壓力反應**，不是失敗，不需要做任何事去「安慰」
  - 最好的第一步：**保持安靜、靜靜等待**，讓 {petName} 用自己的節奏探索新家，建立對你的**信任**

### 4-2 `rabbit-stomp`（§5.3.1 D-2）
- `stageId`：`"daily-care"` ／ `stageTitle`：`"日常照護"` ／ `order`：`1`
- `description`（情境）：`"你費力地把新買的書架搬進了 {petName} 的活動空間。才剛放好，你就聽見——叩！叩！叩！{petName} 站在書架旁邊，用力連續跺著後腳，眼神警戒地盯著這個不速之客。"`
- `media`：`null`（影片製作中）
- `questionType`：`"multiple"`
- `knowledgeCard.title`：`"兔子小知識"`
- `summaryCategory`：`"daily-care"`
- `multipleChoice`：true（複選）
- 正確選項 ids：保持安靜 + 放熟悉墊料
- 錯誤選項 ids：強迫抱起 + 誤解跺腳是歡迎

### 4-3 `rabbit-heatstroke-prevention`（§5.3.1 D-3）
- `stageId`：`"daily-care"` ／ `stageTitle`：`"日常照護"` ／ `order`：`2`
- `description`（情境）：`"今年夏天特別熱，天氣預報顯示接下來幾天氣溫都會超過 33℃。你家平常不會全天開冷氣，但現在你開始擔心 {petName}——兔子不能流汗，一旦中暑可能在幾小時內危及生命。你開始思考：我可以做些什麼？"`
- `media`：`null`（影片製作中）
- `questionType`：`"multiple"`
- `knowledgeCard.title`：`"兔子小知識"`
- `summaryCategory`：`"daily-care"`
- `multipleChoice`：true（複選）
- 正確選項：確保室內冷氣/風扇 + 陶板涼感墊
- 錯誤選項：移到陽台 + 噴霧瓶噴水
- `correctFeedback`：「做得好！兔子最適環境是 15–25℃……」
- **注意**：`question` 欄位只保留複選提示，不放獨立問句（元件已顯示「你會怎麼做？」）

### 4-4 `rabbit-shedding`（§5.3.1 D-4）
- `stageId`：`"daily-care"` ／ `stageTitle`：`"日常照護"` ／ `order`：`4`
- `description`（情境）：`"今天早上一打開 {petName} 的活動空間，你就被嚇了一跳——地板上毛到處都是，就連水碗旁邊都飄著幾根。{petName} 坐在角落用嘴巴理毛，每梳一下就掉下一撮。"`
- `media`：`null`（影片製作中）
- `questionType`：`"multiple"`
- `knowledgeCard.title`：`"兔子小知識"`
- `summaryCategory`：`"daily-care"`
- `multipleChoice`：true（複選）
- 正確選項：每天梳毛 + 觀察排便
- 錯誤選項：立刻看獸醫（⚠️先觀察，非直接錯誤，result 可用 `"incorrect"` 或自訂） + 洗澡

### 4-5 `rabbit-busy-care`（§5.5.1）
- `stageId`：`"life-change"` ／ `stageTitle`：`"當生活發生變化"` ／ `order`：`1`
- `media`：`null`（影片製作中）
- `questionType`：`"multi-step-confirm"`（依現有忙碌照護 activity 型別）
- `knowledgeCard.title`：`"兔子小知識"`
- `summaryCategory`：`"life-arrangement"`（六步驟全部完成後才寫入）
- **此題為多步驟確認流程**（見核心原則 G），不可只實作單一選項題
- 協助者選擇、名稱輸入、逐項確認清單、回饋：全部依現有共用多步驟元件實作
- 確認清單內容從 `rabbit-game-planning.md` §5.5.1 提取，**禁止使用狗狗散步、牽繩或貓砂換砂等文案**

### 4-6 `rabbit-health-emergency`（§5.5.2）
- `stageId`：`"health"` ／ `stageTitle`：`"健康與排泄觀察"` ／ `order`：`1`
- `description`（情境）：`"自從學會了每天日常巡視，你對 {petName} 的狀態已經很敏感。今天，你盯著便盆愣了很久——糞便數量比昨天少了很多，形狀也偏小。轉頭看向牧草架——幾乎沒動過。{petName} 縮在躲藏箱角落，沒有像往常一樣出來迎接你。"`
- `media`：`null`（影片製作中）
- `questionType`：`"single"`
- `knowledgeCard.title`：`"兔子小知識"`
- `summaryCategory`：`"health-observation"`
- `multipleChoice`：false（單選）
- 正確選項：「立刻聯繫兔科獸醫，帶去看診」
- 3 個錯誤選項：從 §5.5.2 表格提取
- `correctFeedback.learningPoints`（2 條，**重點標示**）：
  - **排便量驟減 ＋ 食慾下降**是最重要的**危急警訊**，需立刻就醫
  - **12 小時完全無進食**就是非常危急的情形，立刻聯繫**兔科獸醫**

### 4-7 `rabbit-senior-care`（§5.5.3）
- `stageId`：`"senior"` ／ `stageTitle`：`"高齡後的照護準備"` ／ `order`：`1`
- `description`（情境）：`"{petName} 已經 6 歲了。你注意到這幾個月牠的步伐慢了下來，以前每天都會跳上窩邊看你的動作，現在越來越少了。昨天你看著牠費力地跨過便盆的矮沿，心裡有些難受。你決定重新看看牠的環境——也許有些事情可以為牠做得更好。"`
- `media`：`null`（影片製作中）
- `questionType`：`"single"`（**單選**，企劃文件已更新）
- `knowledgeCard.title`：`"兔子高齡照護小知識"`
- `summaryCategory`：`"health-observation"`
- `multipleChoice`：false（**單選**，正確答案只有一個）
- 正確選項：「將健康檢查頻率提高為半年一次，並降低圍欄出入高度、增加軟質墊料」
- 錯誤選項：減少活動空間 / 減少牧草改軟食 / 維持現有環境不動
- `correctFeedback.learningPoints`（2 條，**重點標示**）：
  - **定期健康檢查**（至少**半年一次**）＋**友善關節的環境**（降低出入高度、增加**軟質墊料**）
  - 任何飲食或醫療調整應先諮詢**兔科獸醫**

**匯出**：`export const rabbitLifeScenarios: Scenario[]`

---

## 步驟 5：新建 `app/data/species/rabbit/journey.ts`

**格式參考**：`app/data/species/cat/journey.ts`

### journeyItems（JourneyItem[]）

依序排列：

```typescript
export const rabbitJourneyItems: JourneyItem[] = [
  // 接回家
  { id: "rabbit-arrival",         type: "scenario",             timeLabel: "接回家",             title: "到家的第一天",                  scenarioId: "rabbit-arrival-adjustment" },
  // 餵食互動（必須在接回家情境題之後，日常照護之前）
  { id: "rabbit-first-meal",      type: "arrival-meal",         timeLabel: "接回家",             title: "第一餐" },
  // D-1 抱兔排序遊戲（新 activity 類型，元件待建）
  { id: "rabbit-carry-sort",      type: "rabbit-carry-sort",    timeLabel: "日常照護",           title: "試著抱起 {petName}" },
  { id: "rabbit-daily-care",      type: "scenario",             timeLabel: "日常照護",           title: "兔兔日常照護" },
  // 兔兔日常巡視（新 activity 類型，類似貓砂盆巡視，元件待建）
  { id: "rabbit-daily-check",     type: "rabbit-daily-check",   timeLabel: "日常照護",           title: "早安，{petName}！" },
  // 兔子的考驗（獨立階段，不可省略）
  { id: "breed-challenge",        type: "breed-challenge",      timeLabel: "兔子的考驗",         title: "兔子的考驗" },
  // 生活變化（多步驟確認流程）
  { id: "rabbit-busy-care",       type: "scenario",             timeLabel: "當生活發生變化",     title: "臨時出差，{petName} 怎麼辦？",  scenarioId: "rabbit-busy-care" },
  // 健康與排泄觀察
  { id: "rabbit-health",          type: "scenario",             timeLabel: "健康與排泄觀察",     title: "糞便突然變少了",                scenarioId: "rabbit-health-emergency" },
  // 高齡照護
  { id: "rabbit-senior",          type: "scenario",             timeLabel: "高齡後的照護準備",   title: "{petName} 進入高齡期",          scenarioId: "rabbit-senior-care" },
];
```

> **注意**：`"rabbit-carry-sort"` 與 `"rabbit-daily-check"` 是新的 activity type，需要後續在 `game-types.ts` 的 `JourneyItem` union 中加入，並新建對應的 React 元件。本次實作先定義資料，元件為後續工作。

### dailyBehaviorScenarioIds

D-2、D-3、D-4：

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

結構與 `catAssets` 相同。規則：
- 標記 `// TODO(rabbit-assets)` 的路徑：直接使用後方 fallback 路徑，等兔子素材備齊後再換
- 所有 fallback 路徑必須是專案中確實存在的檔案，**不可填寫不存在的路徑**

```typescript
export const rabbitAssets = {
  selection: {
    // 使用既有 rabbit.png，路徑依現有實際位置填入
    rabbit: "/assets/rabbit/selection/rabbit.png",  // ← 確認此路徑存在，若不同請調整
  },
  room: {
    background: "/assets/rabbit/room/rabbit-room.png",         // TODO(rabbit-assets)；暫借 /assets/cat/room/cat-room.png
    mobileBackground: "/assets/rabbit/room/rabbit-room-mobile.png", // TODO；暫借 /assets/cat/room/cat-room-mobile.png
    hayRack: "/assets/cat/feeding/cat-food-bowl.png",          // 暫用貓版食碗
    waterBowl: "/assets/cat/feeding/cat-water-bowl.png",       // 暫借貓版
    litterBox: "/assets/cat/room/cat-litter-box.png",          // 暫借貓版
    hidingBox: "/assets/cat/room/cat-bed.png",                 // 暫借貓版
    coolingMat: "/assets/cat/room/cooling-mat.png",            // 暫借貓版
    chewToy: "/assets/dog/room/dog-toy.png",                   // 暫借犬版
  },
  feeding: {
    hay: "/assets/dog/room/dog-food-bowl.png",                 // TODO(rabbit-assets)；暫借犬版食碗
    leafyVeggie: "/assets/cat/feeding/cat-food-wet.png",       // TODO；暫借貓版濕食
    freshWater: "/assets/cat/feeding/cat-water-bowl.png",      // 暫借貓版
    carrot: "/assets/cat/feeding/cat-food-bowl.png",            // TODO(rabbit-assets)；暫借貓版（▲ 警示食物，非完全禁止）
    onion: "/assets/cat/room/toxic-plant.png",                 // TODO；暫借貓版有毒植物
    macadamia: "/assets/cat/room/toxic-plant.png",             // TODO；暫借貓版
  },
  preparation: {
    carrier: "/assets/dog/preparation/carrier.png",            // 暫借犬版
    idCard: "/assets/dog/preparation/id-card.png",             // 暫借犬版
    documents: "/assets/dog/preparation/adoption-documents.png", // 暫借犬版
    coolingPack: "/assets/cat/room/cooling-mat.png",           // TODO；暫借貓版
  },
  daily: {
    checkBackground: "/assets/cat/room/cat-room.png",          // TODO(rabbit-assets)；暫借貓版房間
  },
} as const;
```

> ⚠️ **實作前**：確認 `selection.rabbit` 的路徑確實存在於專案中。若現有路徑不同（例如 `/assets/rabbit.png`），請使用實際路徑，**不可填入不存在的字串**。

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
2. 在 `speciesConfig` 物件新增 `rabbit` 欄位（仿照 `cat` 格式），並加入品種跳過設定：

```typescript
rabbit: {
  assets: rabbitSpeciesData.assets,
  lifeScenarios: rabbitSpeciesData.lifeScenarios,
  journeyItems: rabbitSpeciesData.journeyItems,
  breedChallenges: rabbitSpeciesData.breedChallenges,
  dailyBehaviorScenarioIds: rabbitSpeciesData.dailyBehaviorScenarioIds,
  dailyCheck: rabbitSpeciesData.dailyCheck,
  dailyActivity: "rabbit-daily-check" as const,
  // ↓ 跳過品種選擇頁（依現有機制名稱調整，例如 skipBreedPage 或 selectionConfig）
  skipBreedPage: true,
  defaultBreedId: "rabbit",  // selectedBreed 的安全預設值
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

4. 確認任何初始化 `selectedBreed` 的程式碼：對 rabbit 設定預設值 `"rabbit"`，不可讓它保持 `undefined`。

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
- **不要為兔子新增獨立的情境頁、回饋頁、KnowledgeCard、飼養觀念回顧頁或取得寵物頁元件**
- 所有兔版素材路徑若尚未存在，一律使用 fallback，並以 `// TODO(rabbit-assets): 說明` 注釋標示待換路徑
- `placement` 座標為暫定值，待視覺設計確認後調整
- `rabbit-carry-sort` 與 `rabbit-daily-check` 兩個新 activity 類型只定義資料，元件為獨立後續工作

---

## ✅ 驗收清單

實作完成後，請逐項確認以下所有項目均通過：

### 技術層面

- [ ] 執行 `corepack pnpm run build` **無錯誤**（含 TypeScript 編譯）
- [ ] 執行完整兔子流程**不出現** `[vite] Internal server error`
- [ ] **不出現** `Cannot read properties of undefined (reading 'import')` 或類似 undefined 存取錯誤
- [ ] 執行 `corepack pnpm test` 所有測試通過
- [ ] 執行 `corepack pnpm run lint` 無 error（warning 可允許）

### 流程完整性

- [ ] 選擇兔子 → 取名 → 接回家情境題 → **餵食互動頁** → 日常照護 → 兔子的考驗 → 生活變化 → 健康觀察 → 高齡照護，順序正確且無缺漏
- [ ] 選擇兔子後**直接進入取名頁**，不會出現或閃過品種選擇頁
- [ ] **餵食互動頁**出現在接回家情境題之後、日常照護之前，不可缺少
- [ ] 「兔子的考驗」階段出現在旅程中的**正確位置**，不會被跳過或錯置到日常照護

### 側邊欄與進度一致性

- [ ] 側邊欄的階段分類與題目順序，與**實際瀏覽順序完全一致**
- [ ] 進度條、上一題／下一題按鈕的跳轉目標與 journeyItems 順序一致
- [ ] 每個情境頁都顯示**正確的 stageTitle**（依對照表：接回家、日常照護、兔子的考驗、當生活發生變化、健康與排泄觀察、高齡後的照護準備）
- [ ] 兔子的 `selectedBreed` 在整個流程中**不會為 `undefined`**（預設為 `"rabbit"`）

### UI 版型一致性

- [ ] 所有兔子情境頁都**維持共用版型**：階段小標、題目主標題、情境描述、左側媒體區、右側選項區均存在
- [ ] 桌機版：上方文字區、下方左媒體右選項；手機版：上媒體下選項——皆與狗貓版型**完全一致**
- [ ] 兔子流程中**沒有出現**獨立建立的情境題頁、選項元件、回饋頁或飼養觀念回顧頁元件

### 情境媒體 placeholder

- [ ] 尚未備妥媒體的情境題顯示**影片製作中 placeholder**（虛線圓角容器 + `影片製作中` 標籤 + 題目名稱 + 說明文字）
- [ ] 顯示 placeholder 時**右側選項區正常呈現**，版型不退化為全寬選項頁或白畫面
- [ ] placeholder 邏輯是「媒體路徑是否可用」，日後補上路徑自動切換，**不需修改元件**

### 忙碌照護多步驟確認

- [ ] `rabbit-busy-care` 包含完整六步驟流程：選擇協助者 → 輸入名稱 → 顯示清單 → 逐項確認 → 顯示回饋 → 寫入回顧
- [ ] 確認清單內容為**兔子專屬**（牧草、飲水、便盆、糞便觀察、環境安全、緊急聯繫），**不出現**散步、牽繩、貓砂等其他物種文案

### 飼養觀念回顧（summaryCategory）

- [ ] 完整走完兔子流程後，「你已建立的照顧觀念」顯示**多個分類**（接回與適應、飲食與日常照護、生活安排與協助照顧、健康排泄與高齡照護等），而非只顯示一項
- [ ] 複選題必須**所有正確選項完成**才寫入答對紀錄
- [ ] 忙碌照護多步驟必須**六步驟全部完成**才寫入 `life-arrangement`
- [ ] summaryCategory 讀取正確，**不因 breed key 或 species key 錯誤**而導致兔子紀錄消失

### 知識卡物種文案

- [ ] 兔子情境回饋頁的 KnowledgeCard 標題為 `兔子小知識` 或 `兔子高齡照護小知識`
- [ ] 兔子流程中**任何頁面、任何狀態**都不出現 `狗狗小知識`、`柴犬小知識`、`貓咪小知識` 或其他非兔子的物種文案

### 物種圖片與素材

- [ ] 物種選擇頁的兔子圖片為 **`rabbit.png`**（既有檔案），可正常顯示
- [ ] 所有標記 `// TODO(rabbit-assets)` 的素材都已使用**既有的 fallback 路徑**，無空字串或不存在路徑
- [ ] 所有 `<img>`、`<video>`、CSS `url()`、動態 mapping 路徑均可正常載入，不出現破圖或白畫面

### 回歸測試

- [ ] **狗狗流程**完整走完無異常（知識卡標題、摘要分類、多步驟照護均正確）
- [ ] **貓咪流程**完整走完無異常（知識卡標題、摘要分類均正確）
- [ ] 選擇物種頁三個物種（狗、貓、兔）均可正常選擇並進入各自流程
