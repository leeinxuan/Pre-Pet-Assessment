# AI 專案交接指南｜伴日子新手村：飼養前評估遊戲

這份文件是給另一個 AI 或新的開發協作者讀的。目標是讓接手者不用重新猜測專案脈絡，就能知道這個專案在做什麼、目前怎麼運作、改動時要從哪裡下手，以及哪些地方不能隨意破壞。

## 1. 專案一句話

這是一個「飼養前評估」互動網站。玩家會在正式領養或飼養寵物前，先走過一次模擬旅程：選擇想照顧的動物、布置生活空間、準備接回家的用品、面對飼養生活情境，最後產出照顧準備總覽與承諾。

網站不是考試，也不是要判定玩家適不適合養寵物；它比較像一個溫和但具體的新手村，讓準飼主提前看見「真的開始照顧一個生命」會牽涉到哪些日常責任、費用、安全判斷與家庭協作。

## 2. 使用者體驗流程

主流程由 `app/page.tsx` 控制，目前站點順序如下：

1. 歡迎頁
2. 選擇寵物
   - 選擇物種
   - 選擇品種／外觀類型
   - 替寵物取名
   - 過往飼養經驗
   - 新的開始
3. 飼養前準備
   - 布置生活空間
   - 出發前準備／整理後車廂
4. 飼養生活
   - 接回家
   - 日常照護
   - 品種／外觀類型的考驗
   - 生活變化
5. 照顧準備總覽
   - Checklist 與情境回顧
   - 個人條件補充
   - 照顧承諾
   - PDF 輸出
6. 取得寵物

畫面左側的進度導覽由 `StageRail` 呈現。玩家通過各階段時，`app/page.tsx` 會更新 `step`、`furthestStep`、`selectionPage`、`preparationTask`、`lifePhase`、`journeyIndex` 等狀態。

## 3. 技術架構

專案使用：

- Vinext
- Vite
- Next.js App Router 風格目錄
- React
- TypeScript
- pnpm
- Drizzle ORM

主要指令定義在 `package.json`：

```bash
corepack pnpm install
corepack pnpm dev
corepack pnpm run build
corepack pnpm test
corepack pnpm run lint
```

本機開發通常使用：

```bash
corepack pnpm dev
```

成功後開啟終端機顯示的本機網址，通常是：

```txt
http://localhost:3000/
```

## 4. 網站設計邏輯

這個網站的設計核心不是「把寵物知識做成測驗」，而是把準飼主未來會遇到的生活責任，整理成一條可以親自走過的旅程。每一個畫面都應回答三個問題：

1. 玩家現在正在做哪一種真實飼養準備？
2. 這件事如果沒有先想清楚，未來可能造成什麼照護風險？
3. 網站要讓玩家在低壓情境中練習哪一個判斷或行動？

因此，新增頁面、關卡或內容時，不應先從「我想放一個互動」開始，而應先從「準飼主在哪個時間點需要這個提醒」開始。

### 4.1 整體敘事順序

網站採用時間軸設計，從尚未飼養到真的接回家，再到長期生活：

```txt
想養牠
  → 選擇牠
  → 準備家
  → 接牠回來
  → 一起生活
  → 遇到變化
  → 回頭確認自己準備好了嗎
  → 前往負責任的取得管道
```

這個順序的理由是：準飼主最容易低估的不是單一知識點，而是時間累積後的照顧量。網站要讓玩家感覺「這不是一題答對就結束」，而是「我需要把環境、金錢、時間、家人協作和判斷能力都放進來想」。

### 4.2 每個站點存在的理由

| 站點 | 設計目的 | 玩家應該練習的事 |
|---|---|---|
| 歡迎頁 | 建立這不是考試，而是一趟飼養前預演 | 願意開始誠實檢查自己的準備 |
| 選擇寵物 | 讓玩家先具體化想照顧的對象 | 理解不同物種、品種或外觀類型會影響照護方式，但不能用刻板印象判斷生命 |
| 替寵物取名 | 建立情感投入 | 讓後續提醒更像是在照顧一個具體個體，而不是抽象題庫 |
| 過往經驗 | 讓玩家回想自己或家庭是否有照護經驗 | 分辨「曾經接觸過」和「能長期負責」不是同一件事 |
| 布置生活空間 | 把抽象安全知識變成具體環境準備 | 準備必要用品、移除危害、理解家中配置會影響安全 |
| 出發前準備 | 模擬真的要把寵物接回家的前一刻 | 準備文件、運輸、安全與緊急聯絡，不倉促行動 |
| 接回家 | 呈現剛到新環境時的低干擾照護 | 給動物時間探索，不強迫互動 |
| 日常照護 | 把每日責任具體化 | 照顧不是偶爾陪玩，而是每天重複的餵食、清潔、觀察與活動 |
| 品種／外觀類型的考驗 | 呈現選擇對象後可能出現的生活差異 | 不用刻板印象決定照護，但要針對真實需求做準備 |
| 生活變化 | 模擬忙碌、生病、高齡等長期議題 | 建立備援、紀錄、聯絡獸醫、調整環境的能力 |
| 照顧準備總覽 | 把整趟遊戲轉成自我檢查 | 回顧已準備、待確認、需要和家人討論的事項 |
| 取得寵物 | 把遊戲結尾接到現實行動 | 前往負責任的取得或領養資訊，而不是衝動購買 |

### 4.3 新內容應該放在哪裡

新增內容時，先判斷它屬於哪一種設計功能：

| 內容類型 | 應放位置 | 判斷標準 |
|---|---|---|
| 選擇前就該知道的差異 | 選擇寵物 | 會影響玩家要不要選這個物種或類型 |
| 家中環境與用品 | 飼養前準備／布置生活空間 | 玩家在接回家前就能準備或移除 |
| 接回家當天需要做的事 | 飼養前準備／出發前準備，或飼養生活／接回家 | 若是出門前要帶的，放出發準備；若是到家後的互動，放接回家 |
| 每天或每週會重複的照護 | 飼養生活／日常照護 | 需要玩家建立習慣，而不是只知道一次 |
| 與特定選擇對象相關的照護差異 | 品種／外觀類型的考驗 | 內容依玩家選擇切換，但不能強化刻板印象 |
| 忙碌、搬家、生病、高齡等長期變化 | 飼養生活／生活變化 | 不是第一天發生，但長期一定可能遇到 |
| 對玩家自身條件的反思 | 照顧準備總覽 | 需要玩家填寫現實狀況、預算、時間、家人支持 |
| 真實下一步資訊 | 取得寵物 | 與領養、合法取得、後續諮詢或資源相關 |

如果一個內容同時適合多個位置，優先放在「玩家最需要做決定的時間點」。例如「外出籠」既是用品也是接回家安全的一部分；在玩法上應先放在出發前準備，後續接回家情境再引用它。

### 4.4 每個互動關卡的設計格式

新增關卡前，先寫清楚以下欄位：

```txt
關卡名稱：
放置階段：
真實生活情境：
玩家要做的決定或動作：
正確行動：
常見誤解：
錯誤行動的回饋：
是否產生費用：
是否影響報告：
需要的素材：
缺素材時的佔位方式：
內容來源或審稿狀態：
```

這能避免關卡只剩漂亮畫面，卻沒有明確照護理由。

### 4.5 題目與回饋的撰寫原則

題目應使用生活語氣，而不是考卷語氣。玩家看到的應該是「你現在遇到一個照顧場景」，不是「請選出正確答案」。

好的題目通常包含：

- 具體時間，例如第一天晚上、接回家前、下班晚歸後。
- 具體狀態，例如牠躲起來、不願意吃、砂盆變髒、開始亂咬。
- 具體限制，例如家人不在、天氣不好、你需要出門。
- 一個清楚可選擇的行動。

回饋應做到：

- 先承接玩家的想法，再說明風險。
- 告訴玩家下一次可以怎麼做。
- 避免羞辱玩家或製造恐慌。
- 醫療內容只提醒觀察、紀錄、聯絡獸醫，不做診斷與用藥建議。

### 4.6 費用設計邏輯

費用列不是購物清單，也不是要製造壓力。它的目的是讓玩家看見「飼養責任會逐步累積」，並且理解一次性用品、日常支出和緊急預備金的差異。

新增費用時要先問：

1. 這筆費用是否來自玩家明確做出的準備或選擇？
2. 它是一次性、週期性，還是緊急預備？
3. 是否會因物種、體型或照護需求而不同？
4. 是否已有相同 expense id 可以重用？

不要為了讓畫面更豐富而任意增加費用。費用應該和真實照護責任有關。

### 4.7 報告設計邏輯

報告不是分數單，而是玩家完成旅程後的整理頁。它應該幫玩家回答：

- 我已經準備了什麼？
- 我在哪些情境中做出了合適判斷？
- 哪些地方還需要和家人、同住者或照顧備援討論？
- 我的時間、預算、居住條件是否支持長期照護？
- 如果我真的要取得寵物，下一步該如何更負責任？

所以報告文案應避免「你失敗了」這種語氣。更好的語氣是「這一項還需要確認」、「建議接回家前先補上」、「可以和家人討論備援方式」。

### 4.8 視覺與情緒節奏

整體設計應保持溫暖、清楚、低壓，但不能過度可愛到淡化責任。每個階段的情緒節奏可以這樣安排：

| 階段 | 情緒 | 視覺方向 |
|---|---|---|
| 歡迎與選擇 | 期待、親近 | 明亮、留白、具體寵物形象 |
| 飼養前準備 | 實作、整理 | 清楚物件、可辨識用品、可操作位置 |
| 接回家 | 安靜、放慢 | 低刺激、柔和動線、避免強迫互動感 |
| 日常照護 | 規律、陪伴 | 重複但不無聊，讓玩家感覺責任會持續 |
| 生活變化 | 穩定、可靠 | 不恐嚇，讓玩家知道有正確處理步驟 |
| 報告 | 回顧、承諾 | 清單清楚、語氣支持、下一步具體 |

避免把高風險情境做成驚嚇或懲罰式畫面。這個網站希望玩家願意繼續面對責任，而不是因為被嚇到就關掉。

### 4.9 給 AI 的設計決策流程

當另一個 AI 要新增或修改內容時，請照這個順序思考：

1. 先確認這個內容服務哪一個真實飼養問題。
2. 判斷它屬於選擇、準備、接回家、日常、生活變化、報告或取得寵物。
3. 寫出玩家此刻要做的具體行動。
4. 設計正確選項與常見錯誤選項。
5. 設計溫和但明確的回饋。
6. 決定是否要記錄到費用、答題紀錄或報告。
7. 檢查是否需要新素材，若缺素材要用佔位或安全 fallback。
8. 最後才開始修改資料檔、元件或 CSS。

這個順序很重要：先有照護理由，再有互動設計，最後才有程式實作。

## 5. 重要目錄

```txt
app/
  page.tsx                         # 全站主流程與跨階段狀態
  game-types.ts                    # 共用型別
  data/                            # 物種、情境、費用、報告資料
  components/                      # 依流程拆分的 React 元件
  styles/                          # 分區 CSS
  globals.css                      # 全域樣式入口

public/
  assets/                          # 圖片、影片與公開素材

docs/
  AI_PROJECT_GUIDE.md              # 本文件
  species-game-architecture.md     # 犬貓共用架構與貓版規格
  cat-game-planning.md             # 貓版規劃
  asset-map.md                     # 素材對照表

db/
  schema.ts                        # Drizzle schema
  shared-results.ts                # 結果分享相關資料存取

app/api/results/
  route.ts                         # 建立／讀取分享結果的 API
```

## 6. 核心資料流

### 6.1 主流程狀態

`app/page.tsx` 是目前最重要的協調層。它保存：

- 玩家選擇的物種：目前變數名是 `category`
- 玩家選擇的品種／外觀類型：目前變數名是 `breed`
- 寵物名字：`petName`
- 房間用品完成狀態：`roomReady`
- 危害物收妥狀態：`hazardsReady`
- 出發用品完成狀態：`trunkSelected`、`trunkPassed`
- 費用紀錄：`expenses`
- 生活旅程進度：`lifePhase`、`journeyIndex`、`journeyCompleted`
- 情境答題紀錄：`scenarioAnswers`
- 報告補充資料：`profile`
- 照顧承諾：`careCommitted`

雖然目前變數仍使用 `category` 與 `breed`，但概念上應理解為：

```ts
category = species
breed = selectionId
```

犬版的 `breed` 是犬種；貓版的 `breed` 實際上是外觀類型，例如橘貓、虎斑貓。接手 AI 不應把橘貓／虎斑貓描述成固定生物學品種，也不應推導固定性格或疾病風險。

### 6.2 物種設定入口

物種設定入口在：

```txt
app/data/species/index.ts
```

主要函式：

```ts
getSpeciesConfig(species)
getSpeciesCopy(species)
getBreedForSpecies(species, breedId)
```

目前 `getSpeciesConfig` 會依 `species === "cat"` 回傳貓設定，其他情況預設回傳犬設定。這讓舊流程在沒有選物種時仍能維持犬版 fallback。

物種資料分流：

```txt
app/data/species/dog/
app/data/species/cat/
```

犬貓共用方向記錄在：

```txt
docs/species-game-architecture.md
```

如果要新增第三種動物，不要複製整個頁面流程；應新增一個物種設定，讓既有共用元件讀取新資料。

## 7. 主要元件職責

### 7.1 歡迎與共用導覽

```txt
app/components/shared/SharedComponents.tsx
app/components/layout/StageRail.tsx
app/components/layout/CostBar.tsx
```

負責歡迎頁、物種選擇、進度側欄、費用列與共用小元件。`StageRail` 不能只為單一物種硬寫流程，因為犬貓應共用同一套站點。

### 7.2 飼養前準備

```txt
app/components/preparation/
```

重要元件：

- `RoomPreparation`
- `CarTrunkPreparation`
- `RoomScene`
- `RoomSupplyShelf`
- `DepartureCarScene`
- `DepartureSupplyShelf`
- `DoorplateNameInput`

房間關卡讓玩家選擇必要用品並收妥危害物。出發關卡讓玩家把接回家用品放入後車廂。用品、危害、圖片、費用應來自物種設定，不應在元件中散落犬貓條件。

### 7.3 飼養生活

```txt
app/components/life/
app/components/life/activities/
```

重要元件：

- `ArrivalTransitionVideo`
- `LifeJourney`
- `ScenarioQuestion`
- `ScenarioFeedback`
- `VideoScenario`
- `WalkingActivity`
- `FeedingActivity`
- `DailyBehaviorActivity`
- `BusyCareActivity`
- `WarningSignalActivity`

生活旅程依 `JourneyItem.type` 分派不同玩法。常見型別包含：

```ts
"scenario"
"walking"
"daily-inspection"
"breed-challenge"
"body-language"
"body-care"
"senior-room"
```

犬版每日活動是散步。貓版每日活動是砂盆巡視／清潔。兩者應共用「旅程進度與完成」外框，但內部互動可以是不同元件。

### 7.4 報告與取得寵物

```txt
app/components/report/
app/components/acquisition/PetAcquisitionPage.tsx
```

報告整合玩家準備過程、答題紀錄、費用紀錄、照顧成員、個人條件與承諾。進入「取得寵物」前，玩家必須先勾選照顧承諾。

## 8. 資料與內容檔案

### 8.1 共用資料

```txt
app/data/shared/
  app-flow.ts
  breed-challenges.ts
  expenses.ts
  legacy-scenarios.ts
  life-activity.ts
  report.ts
  scenario-feedback.ts
  types.ts
```

`expenses.ts` 管理費用與按體型調整的金額。加入新費用時，要使用唯一 expense id，避免重複計算。

`life-activity.ts` 提供生活互動初始狀態。新增生活活動時，要同步更新 `LifeActivityState` 與初始值。

### 8.2 犬版資料

```txt
app/data/species/dog/
  assets.ts
  breed-challenges.ts
  index.ts
  journey.ts
  layout.ts
  preparation.ts
  report.ts
  scenarios.ts
  selection.ts
  walking.ts
```

犬版是目前基準流程。除非任務明確要求，接手 AI 不應任意修改犬版既有題目 id、費用 id、旅程 id 或素材路徑。

### 8.3 貓版資料

```txt
app/data/species/cat/
  assets.ts
  breed-challenges.ts
  index.ts
  journey.ts
  layout.ts
  preparation.ts
  report.ts
  scenarios.ts
  selection.ts
```

貓版要維持與犬版相同站點數與報告結構，但內容替換為貓照護知識。貓版醫療相關內容只能描述「觀察、紀錄、聯絡獸醫」，不能提供診斷或用藥指示。

## 9. API 與資料庫

結果分享相關檔案：

```txt
app/api/results/route.ts
app/api/results/[id]/route.ts
app/results/[id]/page.tsx
db/schema.ts
db/shared-results.ts
```

資料庫使用 Drizzle。schema 變更後執行：

```bash
corepack pnpm db:generate
```

若修改分享報告資料格式，要同時檢查：

- 前端送出的資料 shape
- API route 的驗證與儲存
- `db/schema.ts`
- `app/results/[id]/page.tsx`
- 舊分享結果的相容性

## 10. 素材規則

素材放在：

```txt
public/assets/
```

公開引用路徑以 `/assets/...` 開頭。新增素材時：

1. 使用英文 kebab-case 檔名。
2. 不使用中文、空格或特殊符號。
3. 依物種與用途分類，例如：

```txt
public/assets/dog/
public/assets/cat/
public/assets/welcome/
```

4. 更新：

```txt
docs/asset-map.md
```

不可讓 `<img>` 或 `<video>` 指向不存在的檔案。若正式素材尚未到位，應使用文字佔位或既有安全 fallback，並在資料檔加上清楚 TODO。

## 11. AI 接手前必讀順序

新的 AI 若要安全接手，建議依序讀：

1. `README.md`
2. `docs/AI_PROJECT_GUIDE.md`
3. `docs/species-game-architecture.md`
4. `app/page.tsx`
5. `app/game-types.ts`
6. `app/data/species/index.ts`
7. 依任務讀對應物種資料：
   - 犬版：`app/data/species/dog/`
   - 貓版：`app/data/species/cat/`
8. 依任務讀對應元件：
   - 選擇：`app/components/selection/`
   - 準備：`app/components/preparation/`
   - 生活：`app/components/life/`
   - 報告：`app/components/report/`
9. `docs/asset-map.md`

不要一開始就大規模重寫。先建立資料流心智模型，再做小步增量修改。

## 12. 常見修改任務與下手點

### 12.1 修改某個情境題

先找物種資料：

```txt
app/data/species/dog/scenarios.ts
app/data/species/cat/scenarios.ts
```

或品種／外觀類型挑戰：

```txt
app/data/species/dog/breed-challenges.ts
app/data/species/cat/breed-challenges.ts
```

注意事項：

- 儘量不要改既有 scenario id。
- 若新增選項有費用效果，確認 `expenseIds` 存在於 `app/data/shared/expenses.ts`。
- 醫療內容不可提供診斷或用藥。

### 12.2 新增用品或危害物

改：

```txt
app/data/species/dog/preparation.ts
app/data/species/cat/preparation.ts
```

同時確認：

- 圖片路徑存在於 `public/assets/...`
- 位置座標在桌機與手機都合理
- 必要用品的 `required` 設定正確
- 費用 id 有定義
- `docs/asset-map.md` 有更新

### 12.3 修改生活旅程順序

改：

```txt
app/data/species/dog/journey.ts
app/data/species/cat/journey.ts
```

同時檢查 `LifeJourney` 是否支援該 `JourneyItem.type`。若新增 type，要同步更新：

```txt
app/game-types.ts
app/components/life/LifeJourneyComponents.tsx
app/data/shared/life-activity.ts
```

### 12.4 修改報告內容

改：

```txt
app/data/species/dog/report.ts
app/data/species/cat/report.ts
app/components/report/ProfileReportComponents.tsx
```

報告應維持同一個結構，只依物種替換文案、清單、費用與情境回顧。

### 12.5 新增一個物種

不要複製整套頁面。應新增：

```txt
app/data/species/new-species/
```

並更新：

```txt
app/data/species/index.ts
app/data/shared/types.ts
app/game-types.ts
```

新物種應提供：

- selection
- preparation
- journey
- scenarios
- breed-challenges 或等價挑戰
- report
- assets
- layout

## 13. 驗收方式

修改完成後至少執行：

```bash
corepack pnpm run build
```

建議也執行：

```bash
corepack pnpm test
corepack pnpm run lint
```

人工檢查流程：

1. 從歡迎頁開始跑一次犬版。
2. 從歡迎頁開始跑一次貓版。
3. 確認選擇、準備、生活、報告、取得寵物都能前進。
4. 確認費用列不重複加總。
5. 確認報告能反映玩家作答與準備狀態。
6. 確認手機尺寸下文字、按鈕、圖片沒有重疊。

## 14. 不可破壞的約束

- 不要任意改 scenario id、journey id、expense id。
- 不要刪除犬版既有資料與素材。
- 不要把犬貓邏輯硬寫成大量散落的 `species === "cat"` 條件。
- 不要讓不存在的素材路徑進入 `<img>` 或 `<video>`。
- 不要把橘貓、虎斑貓描述成固定品種、固定性格或固定疾病風險。
- 不要提供醫療診斷、用藥建議或無來源的健康結論。
- 不要將整個流程改成全新頁面；應保留共用流程並替換資料。
- 不要覆寫使用者或其他 AI 已在工作區留下的無關變更。

## 15. 目前架構的實際狀態

這個專案已經有一部分從單一犬版，演進到犬貓共用架構：

- `app/data/species/index.ts` 已是物種設定入口。
- `JourneyItemType` 已包含 `daily-inspection`。
- `LifeActivityState` 已包含 `catInspectionSteps`。
- 貓版資料與素材目錄已存在。
- 部分舊命名仍保留，例如 `category`、`breed`、`hasPreviousDog`。
- `speciesConfigs` 目前仍保留 flat aliases，例如 `breeds`、`roomItems`、`hazards`、`trunkItems`，用來支援尚未完全遷移的共用元件。

因此接手 AI 應採取「增量整理」策略：先讓現有功能穩定運作，再逐步把舊命名與 flat aliases 收斂到更清楚的 `species`／`selectionId`／nested config。

## 16. 建議給另一個 AI 的工作提示

如果要把這份專案交給另一個 AI，可以直接使用以下提示：

```txt
請先閱讀 README.md、docs/AI_PROJECT_GUIDE.md、docs/species-game-architecture.md、app/page.tsx、app/data/species/index.ts。

這是一個 Vinext / Vite / React / TypeScript 的飼養前評估互動網站。主流程由 app/page.tsx 控制，內容透過 app/data/species/ 下的物種設定切換。不要重寫整個網站，也不要刪除犬版既有流程。任何新增物種或內容都應走共用資料設定，而不是複製頁面或在元件中散落條件判斷。

修改前先確認 git status，避免覆寫使用者既有變更。修改後至少執行 corepack pnpm run build；若任務涉及流程或資料，請再執行 corepack pnpm test 與 corepack pnpm run lint。
```
