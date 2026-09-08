/**
 * @deprecated 請改從 `app/data/species/journey.ts` 或對應物種資料夾匯入。
 * 此檔僅暫時維持現有元件與進度保存流程的相容性。
 */
export {
  catJourneyItems,
  catLifeScenarios,
  dogJourneyItems as journeyItems,
  dogLifeScenarios as lifeScenarios,
  getAllScenariosForSpecies,
  getBreedChallengeScenarios,
  getJourneyItemsForSpecies,
  getLifeScenariosForSpecies,
} from "./data/species/journey";

export {
  catDailyBehaviorScenarioIds,
  catLitterRescueConfig,
} from "./data/species/cat/journey";

export { initialLifeActivityState } from "./data/shared/life-activity";
