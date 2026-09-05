# 物種共用遊戲架構｜犬版基準與貓版填入規格

> 目的：將現有犬版整理成唯一的遊戲流程基準，貓版只替換「內容資料、素材、費用、互動小遊戲」，不另建一套頁面流程。
>
> 依據：目前網站實作與 `docs/cat-game-planning.md`。貓咪知識內容僅使用團隊 Obsidian vault 的 O1–O7 筆記，詳見本文第 8 節。

## 1. 共用原則

```text
同一套：頁面順序、側欄、進度、答題、成本、總覽、個人資料、承諾、取得寵物
依物種切換：選擇卡、房間用品、危險物、接回用品、情境題、生活小遊戲、素材、費用與報告文案
```

不可將 `species === "cat"` 的條件散落在元件中。改由一個 `SpeciesGameConfig` 物種設定檔供每個畫面取用。

## 2. 現行犬版：完整流程基準

| 大站 | 子流程／現行元件 | 犬版目前的功能 | 共用責任 |
|---|---|---|---|
| 01 選擇寵物 | `SpeciesStep` | 選物種、選犬種、取名、填過往養狗經驗、經驗過場 | 固定五頁與同一側欄狀態 |
| 02 飼養前準備 | `RoomPreparation` | 點選用品放入房間，點選並收起危險物 | 同一個「用品＋房間＋危害」互動殼 |
| 02 飼養前準備 | `CarTrunkPreparation` | 將文件、運輸籠、尿墊、水、牽繩、清潔用品放入後車廂 | 同一個「出發用品＋運輸畫面」互動殼；全部物品必備 |
| 03.1 接回家 | `ArrivalTransitionVideo`、`VideoScenarioActivity`、`ArrivalMealActivity` | 到家適應題 → 第一餐用品互動 | 過場後先完成安置情境，再完成第一餐 |
| 03.2 日常照護 | `DailyBehaviorActivity`、`WalkingActivity` | 多題日常行為選擇；散步準備、場景推進與撿便互動 | 一個日常情境群組＋一個物種專屬每日小遊戲 |
| 03.3 品種的考驗 | `BreedChallengeActivity` | 依柴犬、吉娃娃等犬種取得兩題挑戰 | 同一個兩題序列、答錯重試與知識卡機制 |
| 03.4 生活變化 | `BusyCareActivity`、`VideoScenarioActivity`、`SeniorRoomActivity` | 忙碌備援、疾病就醫、高齡照護 | 同一個生活變化序列；忙碌題有協助者確認子流程 |
| 04 照顧準備總覽 | `AssessmentReport`、`ProfileSupplementForm` | 準備程度、清單、情境回顧、承諾、真實條件補充與下載 | 同一個計算方式、報告區塊與承諾解鎖 |
| 05 取得寵物 | `PetAcquisitionPage` | 取得管道與下一步 | 共用頁面；文字依物種替換 |

### 犬版現行生活旅程順序

```text
接回家
  └ 第一日適應 → 準備第一餐
日常照護
  └ 日常行為照顧（吠叫／亂咬／如廁）→ 散步互動
品種的考驗
  └ 依犬種的兩道生活題
生活變化
  └ 疲憊忙碌的日子 → 生病與就醫 → 逐漸進入高齡
```

## 3. 統一側欄與進度規格

所有物種固定使用以下順序，不因物種增刪站點：

```text
01 選擇寵物
   1 選擇物種
   2 選擇品種
   3 替牠取名
   4 過往經驗
   5 新的開始

02 飼養前準備
   1 布置生活空間
   2 出發前準備

03 飼養生活
   1 接回家
   2 日常照護
   3 品種的考驗
   4 生活變化

04 照顧準備總覽
05 取得寵物
```

`品種` 是 UI 欄位名稱。貓咪卡片下方會註明「外觀類型」，避免把橘色／虎斑花紋誤述為生物學品種。

## 4. 犬／貓內容填入對照

| 共用槽位 | 犬版（目前） | 貓版（已規劃） | 類型 |
|---|---|---|---|
| 選擇品種卡 | 柴犬、吉娃娃、貴賓犬等 | 橘貓、虎斑貓；卡片標示外觀類型 | 資料＋圖片 |
| 房間必要用品 | 睡墊、玩具、水碗、狗碗、尿墊、清潔品、飼料 | 安全躲藏／休息空間、貓砂盆、貓砂、食盆、水碗、抓板、跳台、安全玩具；紙箱只是躲藏空間的一種示例 | 資料＋房間素材 |
| 房間危險物 | 電線、巧克力、清潔劑、小物等 | 百合／有毒植物、人類藥品、線狀異物、精油／薰香、清潔劑、未防護門窗 | 資料＋房間素材 |
| 出發必備品 | 身分證、文件、運輸籠、尿墊、水、牽繩、清潔用品 | 身分證、領養文件（依單位要求）、外出籠、既有飲食／疫苗／除蚤驅蟲／健康資訊（依取得來源）、乾淨飲水、就近醫療資源與緊急聯絡資訊。安全躲藏處、貓砂盆與貓砂留在房間準備關卡 | 資料＋運輸素材 |
| 接回家情境 | 第一日適應：安靜等狗探索 | 第一次進安全房：關好門窗，讓貓自行走出外出籠並探索 | 單選情境＋影片／插圖 |
| 第一餐小遊戲 | 飼料＋水為正確；夏威夷豆、剩骨頭為錯誤 | 貓主食＋水為正確；調味剩菜、巧克力／咖啡因點心、含木糖醇物品／人用藥品為錯誤 | 點選／拖曳互動＋素材 |
| 日常情境群組 | 吠叫、亂咬、如廁 | 晚上還很有精神、抓沙發、牠不想出門 | 多題選擇 |
| 每日小遊戲 | 散步：備品、場景行走、撿便 | 貓砂盆救援隊：鏟除排泄物、補足貓砂、每週清洗／備用盆／完全晾乾 | 物種專屬小遊戲 |
| 品種的考驗 | 各犬種兩題，如換毛、雨天排泄、口腔、訓練 | 橘貓：家庭餵食紀錄；虎斑貓：安全捕捉遊戲與線狀物管理 | 兩題序列＋素材 |
| 忙碌備援 | 請家人／朋友，確認時間、意願、照護知識、緊急聯絡 | 題名「臨時晚歸，誰來接手？」；完全同構，交接內容換成食水、砂盆、環境巡視、陪玩與觀察；不設定固定獨處時數 | 共用忙碌題元件＋文字／素材 |
| 醫療情境 | 健康變化記錄與聯絡獸醫 | 「牠突然變得不太一樣」：食慾、飲水、排泄、活動、躲藏、嘔吐／腹瀉等明顯變化，記錄後儘速聯絡獸醫；不做疾病診斷 | 單選情境＋就醫溝通紀錄卡＋文字／素材 |
| 高齡活動 | 防滑、低入口睡墊、碗位、保暖、活動調整 | 7 歲熟齡、11 歲高齡；高度適中的額外砂盆與地墊、階梯式跳台、保暖休息處、每半年健檢與每週量體重／食水／排泄等趨勢觀察 | 高齡空間互動＋追蹤卡＋素材 |
| 總覽清單 | 狗的每日照顧、家中環境、外出接回 | 同三群組；內容換成貓的食水、砂盆、躲藏／垂直空間、安全房與外出籠 | 同一份報表版型＋資料 |

> 貓版生活變化不包含「新貓加入」。多貓知識保留在 Obsidian 作為未來擴充資料，不進入這一版遊戲。

## 5. 共用資料模型

以下為重構目標；名稱可依實作調整，但資料責任不可混在 React 元件中。

```ts
type SpeciesId = "dog" | "cat";

type SpeciesGameConfig = {
  id: SpeciesId;
  labels: {
    singular: string;             // 小狗／貓咪
    selectionHeading: string;     // 選擇你想飼養的品種
    classificationNote: string;   // 貓：外觀類型；犬：空字串
    dailyActivityTitle: string;   // 今天也要出門散步／貓砂盆救援隊
  };
  selections: SpeciesSelection[];
  preparation: PreparationConfig;
  arrival: ArrivalConfig;
  dailyCare: DailyCareConfig;
  challenge: ChallengeConfig;
  lifeChanges: LifeChangeConfig;
  expenses: ExpenseCatalog;
  report: ReportConfig;
  sources?: SourceReference[];
};

type PreparationConfig = {
  room: { background: AssetRef; items: RoomItem[]; hazards: HazardItem[] };
  departure: { background: AssetRef; requiredItems: TrunkItem[] };
};

type ArrivalConfig = {
  transition: AssetRef;
  safetyScenario: Scenario;
  mealActivity: MealActivityConfig;
};

type DailyCareConfig = {
  scenarios: Scenario[];
  activity: {
    type: "walking" | "daily-inspection";
    title: string;
    completionState: string[];
    config: unknown; // 由 WalkingConfig / DailyInspectionConfig 再細分
  };
};
```

### 必須新增／調整的共用型別

| 現行 | 問題 | 調整方向 |
|---|---|---|
| `breeds` 單一陣列 | 只能列犬種 | 改為 `selectionsBySpecies[species]` |
| `roomItems`、`hazards`、`departureTrunkItems` 全域常數 | 只承載犬資料 | 移入 `SpeciesGameConfig.preparation` |
| `journeyItems`、`lifeScenarios` 全域常數 | 只能跑犬旅程 | 改為 `journeyBySpecies[species]` |
| `JourneyItemType` 含 `walking` | 名稱綁定犬行為 | 加 `daily-inspection`；元件由 `activity.type` 分派 |
| `LifeActivityState.walking*` | 貓沒有散步狀態 | 加入貓專屬 `dailyInspection` 子狀態；犬狀態不變 |
| `getPetSizeForBreed` | 金額只按犬型計算 | 改為 `getExpenseProfile(selectionId, species)`；貓以固定或外觀類型共用設定，不能由毛色推導健康／體型 |
| `breed` prop | 名稱不符合貓外觀類型 | 對外改為 `selectionId`；畫面仍可顯示「品種」欄位 |

### 建議狀態形狀

```ts
type GameRun = {
  species: SpeciesId;
  selectionId: string;
  petName: string;
  preparation: {
    roomReady: string[];
    hazardsSecured: string[];
    departureReady: string[];
  };
  life: {
    completedJourneyIds: string[];
    answers: Record<string, ScenarioAnswer>;
    activity: SpeciesActivityState;
  };
};

type SpeciesActivityState = {
  arrivalMeal: { foodReady: boolean; waterReady: boolean };
  dog?: { walkingPreparedItems: string[]; walkingSceneIndex: number; walkingMinutes: number; poopCleaned: boolean };
  cat?: { litterCleared: boolean; litterPlacementChecked: boolean; waterRefilled: boolean; safePlaySelected: boolean; observationLogged: boolean };
};
```

## 6. 互動元件的共用與替換邊界

| 元件 | 做成共用 | 依物種替換 |
|---|---|---|
| `SpeciesStep` | 分頁、選取、命名、經驗與過場流程 | 選擇卡資料、提示文字、經驗問句與圖片 |
| `RoomPreparation` | 點選用品、放入場景、移除危害、完成度判定 | 場景背景、用品、危害、位置、文案、費用 |
| `CarTrunkPreparation` | 必備物品架、放入運輸場景、全部完成才通關 | 物品、車內／運輸場景、文案、費用 |
| `ArrivalMealActivity` | 正確物品放入食盆、水碗；錯誤物品警示；兩項完成才前進 | 食物、錯誤物、動物圖、食器、警示文案 |
| `ScenarioCard`／回饋 | 選項、答錯重試、正確回饋、知識卡 | 題幹、選項、回饋、影音／插圖、來源 |
| `BusyCareActivity` | 協助者姓名＋三項確認流程 | 日常交接事項與提醒文字、場景素材 |
| `BreedChallengeActivity` | 二題挑戰、重試、知識卡、依選擇取題 | 題目與外觀類型內容；貓版標題可顯示「{選擇類型}的考驗」 |
| 每日活動 | 共用「開始／完成／重玩／成本／進度」外框 | 犬為 `WalkingActivity`；貓為 `DailyInspectionActivity` |
| `SeniorRoomActivity` | 選擇所有高齡調整後通關 | 高齡調整項目、場景與費用 |
| `AssessmentReport` | 所有報告區塊、程度計算、承諾、下載 | checklist、handlingRows、prepared／confirm／actions 文案、費用與卡片圖片 |

## 7. 貓版每日照護巡視：替換犬版散步的規格

保留犬版散步的「準備 → 場景操作 → 事件 → 完成反思」節奏，但貓版只保留貓砂盆清潔：

```text
選擇早／晚巡視時段
  1. 鏟除尿團與糞便，放入密封清潔桶
  2. 檢查並補足可供掩埋的貓砂
  3. 每週清洗日：換備用盆 → 清洗 → 完全晾乾原盆
取得本日第 1／2／3 枚巡視印章
```

### 通關規則

- 每局必須清除全部可見排泄物並補足砂量；本日集滿 2–3 枚巡視印章完成日常目標。
- 每週清洗事件必須先換上備用盆，並讓原盆完全晾乾後才可復位。
- 出現排泄困難、顯著減少、明顯疼痛等事件時，正確處置為「記錄時間與現象並聯絡獸醫」，不是自行診斷。
- 選到濃香掩蓋砂盆味、未補足砂量、未晾乾就放回砂盆等選項，顯示回饋後回到該步驟重選。

## 8. 貓版內容來源（團隊 Obsidian）

| ID | Obsidian 檔案 | 使用位置 |
|---|---|---|
| O1 | `知識庫/01-寵物照護指南/02-貓/貓-通則/貓.md` | 物種總覽、砂盆、食水、活動、室內安全 |
| O2 | `知識庫/01-寵物照護指南/02-貓/貓-通則/貓-飼養前評估.md` | 選擇卡原則、準備總覽與品種資訊限制 |
| O3 | `知識庫/01-寵物照護指南/02-貓/貓-通則/貓-居家環境與安全防護.md` | 安全房、防墜、危害、砂盆、外出籠、搬家 |
| O4 | `知識庫/01-寵物照護指南/02-貓/貓-通則/貓-飲食營養與餵食.md` | 第一餐、轉食、飲水與餵食紀錄 |
| O5 | `知識庫/01-寵物照護指南/02-貓/貓-通則/貓-適應期教學.md` | 初到安全房、低干擾互動與適應 |
| O6 | `知識庫/01-寵物照護指南/02-貓/貓-通則/貓-各階段照護與多貓共養.md` | 安全陪玩、抓板／跳台與高齡調整 |
| O7 | `知識庫/01-寵物照護指南/02-貓/貓-日常觀察與照護紀錄.md` | 每日紀錄、異常觀察與聯絡獸醫原則 |

## 9. 實作順序

1. **抽資料，不改介面**：引入 `SpeciesGameConfig`，先把現有犬資料完整搬入，行為與畫面不得改變。
2. **讓共用頁面收 `species`／`selectionId`**：選擇、準備、旅程、成本與報告改讀設定檔。
3. **加入貓資料與素材空位**：先使選擇、房間、出發、接回、第一餐與總覽可走完全程。
4. **加入 `DailyInspectionActivity`**：保留犬版 `WalkingActivity`，以 item type 分派兩種小遊戲。
5. **填入貓的情境、外觀類型挑戰與生活變化**：出差採犬版 `BusyCareActivity` 同構；不加新貓加入題。
6. **內容與畫面驗收**：先由獸醫／內容審稿確認，再補每個貓版素材並完成手機版測試。

## 10. 驗收條件

- [ ] 切換犬／貓時，側欄與站點數完全一致。
- [ ] 犬版既有測試與完整流程不改變。
- [ ] 貓版可從選擇橘貓／虎斑貓一路完成到報告，不需要犬資料作為 fallback。
- [ ] 每個貓情境都有 Obsidian source ID 與待審稿狀態。
- [ ] 任何醫療內容都只描述觀察、紀錄與尋求獸醫協助，不給診斷／用藥指示。
- [ ] 貓版不含新貓加入生活變化題。
- [ ] 報告結構、承諾、個人資料與「取得寵物」解鎖方式皆與犬版一致。

## 11. AI 實作交接：檔案與修改範圍

本文件搭配現有專案可直接作為實作規格；但 AI 必須先讀取下列檔案，以現有元件與 CSS 為基礎做**增量重構**，不能以新頁面取代現有犬版。

| 目的 | 現行檔案 | 實作要求 |
|---|---|---|
| 全站狀態與頁面切換 | `app/page.tsx` | 將 `category`／`breed` 演進為 `species`／`selectionId`；既有犬流程行為保持不變。 |
| 共用型別 | `app/game-types.ts` | 加入 `SpeciesId`、共用設定型別、貓每日巡視狀態與 `daily-inspection` journey type。 |
| 犬資料來源 | `app/game-data.ts`、`app/life-data.ts` | 將目前資料封裝成 dog config，不可改變既有犬文案、ID 或金額。 |
| 新增物種設定 | `app/data/speciesGameConfig.ts`（新增） | 建立 `dog`、`cat` 兩個完整 `SpeciesGameConfig`；cat config 填入本文第 4、7、8 節內容。 |
| 選擇流程與側欄 | `app/components/shared/SharedComponents.tsx` | 讀取物種設定取得卡片與名詞；貓顯示「外觀類型」註記。 |
| 準備關卡 | `app/components/preparation/PreparationComponents.tsx` | 使用 config 的 room／departure 資料與素材，不可直接 import 犬專用常數。 |
| 生活旅程 | `app/components/life/LifeJourneyComponents.tsx` | 由 config 載入 journey、scenario、challenge；保留 WalkingActivity，新增 DailyInspectionActivity。 |
| 成本與總覽 | `app/components/shared/SharedComponents.tsx`、`app/components/report/ProfileReportComponents.tsx` | 顯示物種資料、費用、checklist、handlingRows；維持現有報告區塊與承諾解鎖。 |
| 視覺樣式 | `app/globals.css` | 在既有 class 上擴充，不重寫犬版樣式；缺素材時使用第 12.4 節的文字佔位樣式。 |
| 既有素材索引 | `docs/asset-map.md` | 保留原有犬素材路徑；新增貓素材時同步更新。 |

### AI 實作順序與不可做事項

1. 先讓 `SpeciesGameConfig.dog` 輸出與現在完全一樣的犬版。
2. 在不改動犬版流程前提下，加上貓 config 與貓 selection。
3. 先用文字佔位完成貓版端到端流程；不可因缺圖片或影片阻擋功能。
4. 再逐一以正式素材取代佔位，路徑固定後更新 asset map。
5. 每一步執行 `pnpm lint` 與 `pnpm test`；確認犬、貓皆可完成整趟旅程。

不可做：

- 不可刪除或覆寫既有犬資料、元件、素材或 CSS。
- 不可把橘貓／虎斑貓描述為固定品種、固定性格或固定疾病風險。
- 不可製作醫療診斷、用藥說明或無來源的金額。
- 不可在素材缺漏時引用不存在的圖片／影片路徑；必須使用文字佔位。

## 12. 素材盤點與文字佔位規格

### 12.1 既有可重用素材

| 用途 | 現有路徑 | 可否直接用於貓版 | 使用規則 |
|---|---|---:|---|
| 物種卡基礎圖 | `public/assets/species/cat.png` | 是 | 可作貓物種入口；不可充當橘貓／虎斑貓選擇卡。 |
| 房間背景 | `public/assets/room/empty-room.png`、`empty-room-mobile.png` | 暫時可 | 先作共用空房，之後換成貓安全房背景。 |
| 外出籠 | `public/assets/car/carrier.png` | 暫時可 | 先沿用外出籠物件；正式版換成貓用比例與構圖。 |
| 接回車景 | `public/assets/car/car-trunk.png` | 暫時可 | 可沿用後車廂背景，物件與說明改成貓版。 |
| 名牌 | `public/assets/room/nameplate.png` | 是 | 可以延用為貓名牌。 |
| 食水空碗／容器 | `public/assets/room/food-bowl.png`、`water-bowl.png`、`public/assets/pet-journey/empty-food-bowl.png`、`empty-water-bowl.png` | 僅暫時 | 功能可先共用，正式版需換為貓食器素材。 |
| 通用 UI／回饋影片 | `public/assets/pet-journey/correct-answer.mp4`、`correct-answer2.mp4` | 暫時可 | 僅作正確回饋，不能顯示犬隻內容。若畫面含犬，改文字佔位。 |

### 12.2 貓版缺少的正式素材

所有下列項目初期均使用第 12.4 節佔位。正式素材建議放在 `public/assets/cat/` 下，避免混入犬資料夾。

| ID | 建議正式路徑 | 類型 | 用在何處 | 文字佔位標題 |
|---|---|---|---|---|
| `cat-orange-card` | `/assets/cat/selection/orange-cat.png` | 圖片 | 橘貓選擇卡 | `［待補素材：橘貓選擇卡］` |
| `cat-tabby-card` | `/assets/cat/selection/tabby-cat.png` | 圖片 | 虎斑貓選擇卡 | `［待補素材：虎斑貓選擇卡］` |
| `cat-safe-room` | `/assets/cat/room/safe-room.png` | 圖片 | 布置安全房、第一餐、每日巡視背景 | `［待補素材：貓咪安全房］` |
| `cat-safe-room-mobile` | `/assets/cat/room/safe-room-mobile.png` | 圖片 | 手機版安全房 | `［待補素材：手機版貓咪安全房］` |
| `cat-litter-box` | `/assets/cat/room/litter-box.png` | 圖片 | 房間用品、砂盆巡視 | `［待補素材：貓砂盆］` |
| `cat-litter-scoop` | `/assets/cat/daily/litter-scoop.png` | 圖片 | 砂盆清理互動 | `［待補素材：貓砂鏟］` |
| `cat-food-bowl` | `/assets/cat/room/food-bowl.png` | 圖片 | 第一餐 | `［待補素材：貓食盆］` |
| `cat-water-bowl` | `/assets/cat/room/water-bowl.png` | 圖片 | 第一餐 | `［待補素材：貓水碗］` |
| `cat-hiding-space` | `/assets/cat/room/hiding-space.png` | 圖片 | 房間用品、安全房 | `［待補素材：安全躲藏／休息空間］` |
| `cat-scratcher` | `/assets/cat/room/scratcher.png` | 圖片 | 房間用品、安全陪玩 | `［待補素材：貓抓板］` |
| `cat-tree` | `/assets/cat/room/cat-tree.png` | 圖片 | 房間用品、高齡調整 | `［待補素材：貓跳台］` |
| `cat-wand-toy` | `/assets/cat/daily/wand-toy.png` | 圖片 | 安全陪玩 | `［待補素材：逗貓棒］` |
| `cat-safe-carrier` | `/assets/cat/departure/carrier.png` | 圖片 | 出發準備、接回家 | `［待補素材：貓用外出籠］` |
| `cat-window-guard` | `/assets/cat/hazards/window-guard.png` | 圖片 | 防墜／防逃互動 | `［待補素材：門窗防墜防逃］` |
| `cat-lily-hazard` | `/assets/cat/hazards/lily.png` | 圖片 | 危害收納 | `［待補素材：百合／有毒植物］` |
| `cat-medicine-hazard` | `/assets/cat/hazards/medicine.png` | 圖片 | 危害收納、第一餐錯誤物 | `［待補素材：人類藥品］` |
| `cat-string-hazard` | `/assets/cat/hazards/string.png` | 圖片 | 危害收納、虎斑分支 | `［待補素材：線狀異物］` |
| `cat-essential-oil-hazard` | `/assets/cat/hazards/essential-oil.png` | 圖片 | 危害收納 | `［待補素材：精油／薰香］` |
| `cat-cleaner-hazard` | `/assets/cat/hazards/cleaner.png` | 圖片 | 危害收納 | `［待補素材：清潔化學品］` |
| `cat-arrival-transition` | `/assets/cat/life/arrival-transition.mp4` | 影片 | 接回家過場 | `［待補影片：貓咪接回家過場］` |
| `cat-first-safe-room` | `/assets/cat/life/first-safe-room.mp4` | 影片／圖片 | 第一次進安全房題 | `［待補素材：貓咪在安全房自主探索］` |
| `cat-daily-inspection` | `/assets/cat/daily/daily-inspection.png` | 圖片 | 貓砂盆救援隊背景 | `［待補素材：貓砂盆清潔場景］` |
| `cat-litter-waste-set` | `/assets/cat/daily/litter-waste-set.png` | 圖片組／Sprite | 尿團、糞便、乾淨砂面、砂量不足、補砂後 | `［待補素材：貓砂盆互動狀態組］` |
| `cat-litter-weekly-clean` | `/assets/cat/daily/litter-weekly-clean.png` | 圖片組／Sprite | 每週清洗、備用盆、晾乾狀態 | `［待補素材：每週清洗貓砂盆］` |
| `cat-busy-care` | `/assets/cat/life/busy-care.mp4` | 影片／圖片 | 臨時晚歸，誰來接手？ | `［待補素材：貓咪等待照護情境］` |
| `cat-moving` | `/assets/cat/life/moving.png` | 圖片 | 搬家題 | `［待補素材：搬家安全房情境］` |
| `cat-health-change` | `/assets/cat/life/health-change.png` | 圖片 | 牠突然變得不太一樣 | `［待補素材：貓咪健康變化觀察］` |
| `cat-senior-room` | `/assets/cat/life/senior-room.png` | 圖片 | 高齡空間調整 | `［待補素材：高齡貓生活空間］` |
| `cat-orange-feeding` | `/assets/cat/challenges/orange-feeding.png` | 圖片 | 橘貓挑戰題 | `［待補素材：家庭餵食紀錄］` |
| `cat-tabby-play` | `/assets/cat/challenges/tabby-play.png` | 圖片 | 虎斑貓挑戰題 | `［待補素材：安全捕捉遊戲］` |

### 12.3 正式素材製作規格

以下清單就是貓版目前流程需要交付的正式素材。所有貓皆使用同一隻中性、短毛家貓角色；以被毛顏色／花紋區分選擇卡即可，不須畫成不同品種或賦予人格表情。除危害與健康警訊外，整體採溫暖、低刺激的繪本式 2D 插畫：米白／淺木色室內、圓角、柔和陰影、乾淨輪廓。避免驚恐、痛苦、髒亂或血腥的特寫。

#### A. 選擇與飼養前準備

| 素材包 | 檔案／類型 | 構圖與外觀 | 需要的狀態／細節 | 使用位置 |
|---|---|---|---|---|
| 橘貓 | `cat-orange-card`，PNG | 橘色短毛家貓坐在淺色地墊上，正面或 3/4 側面，留出上方標題與下方說明文字空間 | 平靜、自然眼神；只傳達「橘色被毛」，不可加入「愛吃／親人」等暗示 | 「選擇品種」中的外觀類型卡 |
| 虎斑貓 | `cat-tabby-card`， PNG | 虎斑短毛家貓相同構圖與比例，明確可辨的虎斑紋 | 平靜、自然眼神；只傳達「虎斑花紋」，不可做成更活潑或搗蛋的姿勢 | 外觀類型卡 |
| 安全房背景 | `cat-safe-room`、`cat-safe-room-mobile`，橫式與直式背景 | 安靜小房間：關閉且有防護的窗、外出籠、躲藏／休息空間、食水區、與食水分開的砂盆區；畫面中央留出可放置用品的空位 | **空房版**與**完成布置版**各一張；物件最好另切透明圖，不要全部畫死在背景 | 房間布置、到家、安全房題 |
| 房間用品組 | 透明 PNG：砂盆、砂鏟、食盆、水碗、躲藏空間、抓板、跳台、外出籠、防墜窗扣 | 3/4 視角、與房間背景同光源、可拖放且邊緣清楚 | 每個物件至少有「未放置／已放置」兩態；躲藏空間可畫紙箱，但名稱為安全躲藏／休息空間 | 布置安全生活空間 |
| 危害物組 | 透明 PNG：百合、有標示的人用藥盒、線狀物、精油／薰香、清潔劑、開啟的窗戶 | 一眼可辨識且不美化危害；危害物本身不需可愛表情 | 每項有「可見危害」與「已收妥／已防護」兩態；開窗以防護網／窗扣完成態呈現 | 居家危害收納互動 |
| 接回用品組 | 透明 PNG：貓用外出籠、身分證、領養文件、既有食物／健康資訊夾、乾淨飲水、獸醫聯絡卡 | 俯視或側視要與既有後車廂玩法一致 | 每項有未放入／已放入後車廂的明確視覺差異；文件不可呈現真實個資 | 出發接回家 |

#### B. 接回家與第一餐

| 素材包 | 檔案／類型 | 構圖與外觀 | 互動／影片內容 |
|---|---|---|---|
| 接回家過場 | `cat-arrival-transition`，無聲 MP4，約 6–8 秒，可循環 | 車子停下、外出籠被平穩帶入家門、鏡頭切到安靜安全房門口；不拍貓在籠內驚慌 | 影片字幕：`「到家後，先帶牠進準備好的安全房。」`；結尾停在可進入題目的門口畫面 |
| 第一次進安全房 | `cat-first-safe-room`，無聲 MP4 或 3 張連續插圖 | 外出籠放穩、門打開後人退後等待、貓自行走出並選擇躲藏／探索；不抱出、不拉扯 | 約 8–10 秒；選項用同一畫面分出「讓牠自行離籠」與錯誤的「伸手拖出」圖示；字幕說明低干擾等待 |
| 第一次餵食組 | `cat-food-bowl`、`cat-water-bowl`、安全主食、錯誤食物圖 | 乾淨食盆與水碗置於明確、分開的區域；錯誤物包含調味人食、巧克力／咖啡因點心、含木糖醇物品／人用藥品，外觀需易辨識 | 正確物拖入食器時有柔和勾勾與食器填滿狀態；錯誤物有阻擋框＋簡短原因，不能用恐怖畫面 |

#### C. 日常照護：貓砂盆救援隊

| 素材包 | 檔案／類型 | 長相與動態細節 | 互動規則對應 |
|---|---|---|---|
| 遊戲主背景 | `cat-daily-inspection`，橫式與直式背景 | 安靜、固定位置的開放式砂盆區；背景不含食水與玩具，避免誤以為本關需巡視其他項目 | 上方保留早／晚時段與 1／2／3 枚印章列；右側放清潔桶、補砂袋、備用盆 |
| 砂盆與貓砂狀態組 | `cat-litter-waste-set`，透明 Sprite 或多張 PNG | 至少要有：乾淨砂面、尿團、糞便、砂量不足、補砂後、可掩埋的砂面；尿團與糞便用非寫實圖標化造型 | 玩家拖曳砂鏟掃過排泄物，再拖至密封清潔桶；未清完時「完成」按鈕不可用 |
| 貓砂鏟與清潔桶 | `cat-litter-scoop` 加一個 `cat-litter-bin` | 鏟子有靜止、鏟起、倒入桶三態；桶有關閉與已收納兩態 | 命中排泄物出現小星點與「已清除」；直接把鏟子移走不算完成 |
| 補砂提示 | `cat-litter-refill`，透明 PNG＋小動畫 | 半滿貓砂袋、砂流、砂面從淺變厚；不顯示固定公分數 | 砂量不足才出現；點擊／拖曳補砂後，顯示「可以掩埋」而非宣稱固定厚度 |
| 上廁所行為提示 | 可用 5 個小圖標或 3 秒無聲循環動態 | 聞、挖掘、轉圈、排泄、掩埋，以足跡／鏟砂動作呈現；不需露出排泄特寫 | 僅在首次開局或補砂完成後出現，作為「砂盆需夠大、砂量要能掩埋」的知識提示，不能讓玩家打斷動作 |
| 每週清洗日組 | `cat-litter-weekly-clean`，3–4 張狀態圖 | 原砂盆、乾淨備用盆、清洗中、完全晾乾；可用陽光與水滴消失示意完全乾燥 | 正確順序：先放備用盆 → 清洗原盆 → 完全晾乾；把濕盆直接放回時顯示回饋後回到上一步 |
| 排泄異常事件卡 | `cat-litter-alert`，插圖卡 | 貓在砂盆旁停下或反覆進出、照顧者以手機／筆記記錄時間；不可畫出疼痛特寫或直接標示疾病名稱 | 選「記錄並聯繫獸醫」才通過；卡片內容是觀察與聯繫，不提供診斷或用藥 |

#### D. 日常情境與外觀類型挑戰

| 情境 | 素材構圖 | 正確選擇的畫面 | 錯誤選擇的畫面 |
|---|---|---|---|
| 晚上還很有精神 | 客廳夜景，貓注意安全實體玩具；畫面保留四個選項圖示位置 | 逗貓棒／玩偶／球與安靜休息處 | 雷射光點、手腳逗玩、長時間籠飼皆用簡明禁用圖示，不呈現傷害 |
| 抓沙發 | 沙發側邊與抓板並列，讓玩家看見替代選擇 | 在合適位置的抓板、跳台或抓柱 | 大聲責罵、去爪、用手指引逗，均以紅色叉號圖示呈現 |
| 不想出門 | 貓退到安全躲藏空間，門口有胸背帶與外出籠 | 留在室內、提供抓板／跳台／安全玩具 | 強抱出門、無防護放出、徒手抱出門，用阻擋圖示呈現 |
| 橘貓餵食紀錄 | 家庭共用餵食紀錄板：早／午／晚、主食、零食欄位 | 量好並共同記錄；角色是橘貓但不畫成貪吃 | 多人各自投餵、隔天不給正餐等情境，以提醒圖示表達 |
| 虎斑貓安全捕捉 | 虎斑貓注意鞋帶，旁邊有已收起的線狀物、逗貓棒、抓板與跳台 | 收好線狀物、用安全實體玩具互動 | 手腳逗玩、雷射筆、長期關籠，以禁用圖示呈現 |

#### E. 生活變化與報告

| 素材包 | 檔案／類型 | 構圖與內容 | 必備變化狀態 |
|---|---|---|---|
| 臨時晚歸 | `cat-busy-care`，6–8 秒無聲 MP4 或主插圖 | 傍晚室內、時鐘變晚、照顧者查看聯絡人與交接清單；貓在安全室內自然休息 | 協助者流程需有「有時間／有意願／知道食水砂盆環境巡視／緊急聯絡」四枚確認圖示 |
| 搬家 | `cat-moving`，橫式插圖 | 搬家箱與開關門的走道；貓在關門安全房或外出籠中，門窗有防墜防逃 | 正確態為安全房／外出籠；錯誤態為貓自由走在搬家動線上與未防護窗邊 |
| 健康變化 | `cat-health-change`，橫式插圖＋觀察卡圖示 | 貓安靜躲在休息處，照顧者比對食慾、飲水、排泄、活動、躲藏等紀錄；畫面保持中性，不做病容診斷 | 「記錄時間／前後變化／影像資料／聯繫獸醫」四格卡；不得出現疾病名稱、診斷結果或藥物 |
| 高齡空間 | `cat-senior-room`，可點擊房間圖 | 高度適中的額外砂盆、活動範圍地墊、階梯式跳台、被褥／保暖休息處；高齡貓自然步行 | 每個正確調整各自高亮；另有半年健檢、每週量體重、食水／排泄／活動觀察的追蹤卡 |
| 總覽報告圖示 | 一組扁平 SVG 或透明 PNG | 安全房、外出籠、食盆、水碗、砂盆、抓板、醫療聯絡、協助者、搬家、高齡調整 | 完成用勾選、待確認用中性色提醒；不要用紅色「失敗」標示飼養者 |

#### F. 影片共同規格

- 全部影片無聲也能理解；提供繁中字幕逐字稿與靜態封面圖。若使用旁白，需另附繁中字幕與靜音時等義的畫面資訊。
- 建議 6–10 秒、可無縫循環、720p 以上；不得以快速剪輯或突發音效製造壓力。
- 不拍攝／不呈現：強拉出外出籠、強迫互動、真實排泄物特寫、血液、疾病診斷、餵藥或高風險操作。
- 每支影片最後停留 1 秒在下一步所需的關鍵物件上，方便使用者接續點擊，也便於改用靜態圖版本。

### 12.4 文字佔位元件規格

素材尚未提供時，AI 必須用以下共用元件呈現，不能讓 `<img>` 或 `<video>` 指向不存在路徑：

```tsx
type AssetPlaceholderProps = {
  title: string;
  description: string;
  kind: "image" | "video";
  assetId: string;
};

function AssetPlaceholder({ title, description, kind, assetId }: AssetPlaceholderProps) {
  return (
    <div className={`asset-placeholder asset-placeholder--${kind}`} data-asset-id={assetId} role="img" aria-label={`${title}：${description}`}>
      <span aria-hidden="true">{kind === "video" ? "▶" : "▧"}</span>
      <b>{title}</b>
      <small>{description}</small>
    </div>
  );
}
```

佔位文案規則：

- 標題固定採第 12.2 節的 `文字佔位標題`。
- 說明必須描述未來素材應呈現的**情境**，例如「橘色被毛的家貓，坐在選擇卡構圖中央；不暗示固定性格」。
- `data-asset-id` 必須對應第 12.2 節 ID，方便日後批次搜尋替換。
- 文字佔位不可用 emoji 代替有安全意義的危害圖；危害至少要有清楚文字名稱和處置按鈕。

### 12.5 貓版素材目錄約定

```text
public/assets/cat/
├── selection/
├── room/
├── hazards/
├── departure/
├── daily/
├── life/
└── challenges/
```

每新增、替換或移除一項正式素材，都要同步更新 `docs/asset-map.md`，並將第 12.2 節對應項目的狀態改為「已提供」。
