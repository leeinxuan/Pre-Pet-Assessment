# Components map

這個資料夾是目前網站的元件化入口。重構採取「保守搬移、保留功能」策略：

- `shared/SharedComponents.tsx`：共用 UI 與流程外框，例如 `StageRail`、`CostBar`、`Welcome`、`SpeciesStep`。
- `preparation/PreparationComponents.tsx`：領養前準備互動，例如布置生活空間與後車廂準備。
- `life/LifeJourneyComponents.tsx`：飼養生活流程、情境題、影片回饋與互動遊戲。
- `life/legacy/ScenarioComponents.tsx`：舊情境題實作；`life/ScenarioComponents.tsx` 是相容入口。
- `report/AssessmentReport.tsx`：照顧準備總覽與觀念回顧。
- `report/ProfileForms.tsx`：個人資料與補充資料表單。
- `report/PdfExportControls.tsx`：PDF／圖片輸出。
- `report/ProfileReportComponents.tsx`：保留給舊引用的相容入口。

舊的 `app/*-components.tsx` 檔案目前保留為 re-export 相容層，讓既有 import 不會立即失效。

純資料逐步集中到 `app/data/`。散步遊戲的場景、用品與預載清單位於 `app/data/species/dog/walking.ts`。

## Re-export 對照

下列檔案是相容入口，不是獨立實作；新增功能時請直接修改右側的實作檔。

| 相容入口 | 實際實作 |
| --- | --- |
| `selection/BreedCard.tsx`、`SpeciesCard.tsx`、`SpeciesStep.tsx` | `shared/SharedComponents.tsx` 的 `SpeciesStep` |
| `layout/CostBar.tsx`、`StageRail.tsx` | `shared/SharedComponents.tsx` |
| `preparation/Room*.tsx`、`DoorplateNameInput.tsx` | `preparation/PreparationComponents.tsx` 的 `RoomPreparation` |
| `preparation/CarTrunkPreparation.tsx`、`Departure*.tsx` | `preparation/PreparationComponents.tsx` 的 `CarTrunkPreparation` |
| `life/LifeJourney.tsx`、`LifeStageHeader.tsx`、`VideoScenario.tsx` | `life/LifeJourneyComponents.tsx` |
| `life/ArrivalTransitionVideo.tsx` | `life/LifeJourneyComponents.tsx` 的轉出 |
| `life/activities/DailyBehaviorActivity.tsx`、`FeedingActivity.tsx`、`WarningSignalActivity.tsx` | `life/LifeJourneyComponents.tsx` 的相容別名 |
| `report/Care*.tsx`、`PrintPdfButton.tsx`、`ProfilePrintPage.tsx` | `report/AssessmentReport.tsx` |
| `report/ProfileSupplementForm.tsx` | `report/ProfileForms.tsx` |

`life/legacy/ScenarioComponents.tsx` 與 `life/ScenarioComponents.tsx`、`ScenarioFeedback.tsx`、`ScenarioQuestion.tsx` 僅服務舊的 `legacy-scenarios` 相容入口；目前正式旅程不使用它們。保留它們是為了避免舊 import 立即失效，後續移除前應先確認所有外部引用都已遷移。
