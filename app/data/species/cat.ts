import { catConfig } from "./cat/index";

/**
 * @deprecated 請直接由 `data/species/cat/` 的對應模組匯入。
 *
 * 保留舊路徑與舊扁平欄位供既有 import 相容使用；內容全部取自貓咪
 * 正式設定，不在此檔保存素材、題庫或旅程資料副本。
 */
export const catSpeciesData = {
  id: catConfig.id,
  breeds: catConfig.selection.breeds,
  assets: catConfig.assets,
  lifeScenarios: catConfig.scenarios,
  journeyItems: catConfig.journey.items,
  breedChallenges: catConfig.breedChallenges,
  dailyBehaviorScenarioIds: catConfig.journey.dailyBehaviorScenarioIds,
  litterInspection: catConfig.journey.litterInspection,
} as const;

export {
  catConfig,
  catAssets,
  catJourney,
  catLayout,
  catPreparation,
  catReport,
  catSelection,
  catLifeScenarios,
  getCatBreedChallengeScenarios,
  catFeeding,
} from "./cat/index";
