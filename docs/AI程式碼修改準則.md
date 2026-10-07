# AI 程式碼修改準則

> 本文件是給後續 AI 與協作者的修改契約。新增功能、修 bug、重構或新增物種前，必須先閱讀全文。
>
> 目標：維持「**資料歸物種、版型歸共用元件、相容層不干擾正式流程**」，不要為了快速完成需求而在共用元件塞入物種條件、素材路徑或重複資料。

## 1. 修改前必讀

依序閱讀：

1. `README.md`
2. `docs/AI_PROJECT_GUIDE.md`
3. 本文件
4. `app/data/species/index.ts`：正式物種註冊表。
5. `app/components/README.md`：元件實作位置與相容入口對照。
6. 與任務直接相關的物種資料夾、共用元件與測試。

若任務是新增物種，還必須閱讀 `docs/新物種程式實作準則.md`。

開始前先用搜尋確認真正的實作與現有 import；不要只因檔名相近就修改一行 re-export 或 legacy 檔。

## 2. 唯一正式資料來源

- 正式物種設定以 `app/data/species/index.ts` 的 `getSpeciesConfig(species)` 為入口。
- 每個物種專屬資料放在 `app/data/species/<species>/`：題目、文案、費用、素材、房間／出發場景、第一餐、報告內容、旅程順序與專屬活動設定。
- 真正跨物種共用的型別、計算、素材與流程才放在 `app/data/shared/`。
- 新增正式 UI 時，優先讀取 `getSpeciesConfig(species)` 的欄位；不要重新建立一份 `dog/cat/...` 的中央對照表。
- `speciesGameConfig.ts`、`game-data.ts`、`life-data.ts` 與 `legacy-scenarios` 都是相容入口，不是新增正式功能的資料來源。

### 禁止的寫法

```ts
// 禁止：共用元件自行決定物種資料。
const image = species === "cat" ? catImage : dogImage;
if (species === "rabbit") { /* 特別流程 */ }
if (item.id === "bird-first-meal") { /* 選素材或規則 */ }
```

### 正確方向

```ts
const config = getSpeciesConfig(species);
const scene = config.preparation.roomScene;
const feeding = config.feeding;
```

若共用元件需要新差異，先擴充明確型別與資料契約，再由每個物種設定提供資料；不要在 JSX 裡加物種分支。

## 3. 共用元件與專屬活動的邊界

### 共用元件應只做

- 依設定渲染畫面、處理通用互動與進度。
- 依 `activityKey` 分派既有活動元件。
- 依資料提供的 selector、reset key、scene config、expense ID、文案與素材呈現結果。

### 共用元件不得做

- 依 `species === ...`、`isDog`、`isCat` 等選擇物種文案、圖片、費用、完成規則或流程。
- 依特定 `item.id`／`scenario.id` 決定某物種應使用哪張素材、哪個活動或哪組 state。
- 直接引用 `/assets/dog/...`、`/assets/cat/...` 等物種素材路徑。
- 為了方便把物種資料複製到元件常數中。

### 專屬活動可以保留

犬散步、貓砂盆、兔子日常檢查、鸚鵡鳥籠巡視與倉鼠早晨巡視是不同的互動狀態機，**不應強行合併成一個巨型元件**。專屬活動可以直接讀取自己的物種資料；但新增可調整的文案、素材、座標或完成規則時，仍優先放回該物種資料夾。

## 4. 特定領域規則

### 旅程與情境題

- 旅程順序、題庫、情境呈現與日常題目 ID 由各物種設定提供。
- 活動分派使用 `JourneyActivityConfig` 與 `activity-registry.ts`；重玩重設使用 `resetKey` 與既有 reset 策略。
- `LifeJourneyComponents.tsx` 可依 `activityKey` 分派元件，但不可依物種名稱或活動 ID 選擇流程。
- 新活動先定義資料契約、註冊資料與 reset 策略，再接上 UI。

### 第一餐、房間與出發準備

- 第一餐差異放在各物種 `feeding.ts`。
- 房間背景、手機背景、門牌、覆蓋層、物品素材與出發場景放在 `preparation.ts`／`layout.ts`。
- 共用元件只能使用 `FeedingConfig`、`RoomSceneConfig`、`DepartureSceneConfig` 與物品資料。
- 不可改動既有費用 ID、危險物規則、物品座標或完成條件，除非任務明確要求。

### 費用

- 正式費用查詢一定要傳入目前 `species`：`getExpenseForSpecies(id, species)`。
- 費用 ID 由物種 `expenses.ts` 與資料設定提供，不要在元件手寫金額或 recurring 判定。
- 不可使用跨物種 flat catalog 作為正式流程的 fallback。

### 報告

- 報告文案、居住確認、照護回顧與主題從 `getSpeciesConfig(species)` 取得。
- 完成判定使用既有 report practice selector 與 mastered-care selector；報告元件不得直接認識某活動的 state 欄位。
- 不可為了補文案在報告 JSX 加入物種名稱或活動 ID 判斷。

### 素材

- 共用素材放在 `app/data/shared/assets.ts` 或 `public/assets/shared/`。
- 物種素材由該物種 `assets.ts`／設定檔輸出。
- 若刻意共用另一物種的素材，必須是產品已確認的設計決定，並在資料層註解原因；不可在共用元件直接引用對方路徑。
- 暫無素材時使用既有 placeholder 資料策略，不要偷偷回退到犬素材；已明確同意沿用犬過場影片的情況除外。

## 5. Legacy 相容層

- 不可刪除、重新導向或大改 `game-data.ts`、`life-data.ts`、`speciesGameConfig.ts`、`legacy-scenarios` 或 `app/*-components.tsx`，除非任務明確要求且已完成所有正式 import 遷移。
- 不可在新的正式功能 import legacy 入口。
- `app/components/life/legacy/` 僅供舊入口使用；正式旅程不得引用。
- 一行 re-export 檔不是空白檔，而是相容 API。先查 `app/components/README.md`，再決定是否需要修改。

## 6. 修改方式與範圍控制

1. 先描述要保留的行為：畫面、文案、流程、費用、完成判定、座標、state 是否不變。
2. 先修改資料契約與資料來源，再讓共用元件消費它；不要反過來在元件增加暫時分支。
3. 一次只處理使用者指定的範圍，不趁機重命名、格式化或搬移無關檔案。
4. 發現既有髒工作區時，保留不相關變更；不得 reset、checkout 或覆寫。
5. 若必須做會改變使用者可見結果的設計決定，先說明影響並取得明確指示。

## 7. 每次完成前的檢查表

### 搜尋檢查

針對修改過的共用元件搜尋並確認沒有新增：

- `species ===`、`isDog`、`isCat`、`isRabbit`、`isBird`、`isHamster`
- 用 `item.id`／`scenario.id` 選擇物種素材、文案或流程
- 物種素材的直接路徑
- 新的正式 legacy import

專屬活動內的自身狀態判斷可以保留，但若判斷只是為了選資料，應改由資料設定提供。

### 必跑驗證

```bash
pnpm exec tsc --noEmit
pnpm lint
node --test tests/species-flow-regression.test.mjs
pnpm run build
git diff --check
```

若完整測試失敗，必須區分「本次造成的失敗」與「修改前既有失敗」，不可直接忽略。

### 回報格式

完成後必須清楚說明：

1. 修改的檔案與原因。
2. 哪些行為刻意維持不變。
3. 搜尋結果與驗證結果。
4. 尚未處理的 legacy 或素材限制。

## 8. 可直接交給其他 AI 的指令

> 請先閱讀 `docs/AI_PROJECT_GUIDE.md`、`docs/AI程式碼修改準則.md`、`app/data/species/index.ts` 與 `app/components/README.md`。本專案採「資料歸物種、版型歸共用元件、legacy 不進正式流程」原則。修改前先追查正式資料來源與既有 import；不得在共用元件新增 `species === ...`、特定 item/scenario ID 的物種流程分支或物種素材硬寫。差異先加入明確型別與各物種資料設定，再由共用元件讀取。保留既有互動、文案、費用、完成判定、座標與 legacy 相容層，除非需求明確要求變更。完成後必須跑型別、lint、流程測試、build 與 diff 檢查，並回報修改範圍與未處理限制。
