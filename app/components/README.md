# Components map

這個資料夾是目前網站的元件化入口。重構採取「保守搬移、保留功能」策略：

- `shared/SharedComponents.tsx`：共用 UI 與流程外框，例如 `StageRail`、`CostBar`、`Welcome`、`SpeciesStep`。
- `preparation/PreparationComponents.tsx`：領養前準備互動，例如布置生活空間與後車廂準備。
- `life/LifeJourneyComponents.tsx`：飼養生活流程、情境題、影片回饋與互動遊戲。
- `life/ScenarioComponents.tsx`：舊情境題元件相容入口。
- `report/AssessmentReport.tsx`：照顧準備總覽與觀念回顧。
- `report/ProfileForms.tsx`：個人資料與補充資料表單。
- `report/PdfExportControls.tsx`：PDF／圖片輸出。
- `report/ProfileReportComponents.tsx`：保留給舊引用的相容入口。

舊的 `app/*-components.tsx` 檔案目前保留為 re-export 相容層，讓既有 import 不會立即失效。

純資料逐步集中到 `app/data/`。散步遊戲的場景、用品與預載清單位於 `app/data/species/dog/walking.ts`。
