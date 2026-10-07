import type { JourneyItem, Scenario, ScenarioPresentationConfig } from "../../game-types";
import { getSpeciesConfig, getSpeciesConfigForBreed } from "./index";

// 保留既有轉出，讓尚未遷移的 import 不會改變。
export { catJourneyItems } from "./cat/journey";
export { catLifeScenarios } from "./cat/scenarios";
export { dogJourneyItems } from "./dog/journey";
export { dogLifeScenarios } from "./dog/scenarios";
export { rabbitJourneyItems } from "./rabbit/journey";
export { rabbitLifeScenarios } from "./rabbit/scenarios";
export { birdJourneyItems } from "./bird/journey";
export { birdLifeScenarios } from "./bird/scenarios";

/** 共用旅程框架只讀取物種註冊表，不在此列舉物種或題目識別碼。 */
export function getDailyBehaviorScenarioIds(species: string): readonly string[] {
  return getSpeciesConfig(species).journey.dailyBehaviorScenarioIds;
}

export function getScenarioPresentation(species: string, scenarioId: string): ScenarioPresentationConfig {
  const presentation = getSpeciesConfig(species).scenarioPresentation;
  return { ...presentation.defaults, ...presentation.scenarios[scenarioId] } as ScenarioPresentationConfig;
}

/** 旅程畫面站點由資料中的階段識別決定，不依物種或陣列索引猜測。 */
export function getJourneyStepForItem(item: JourneyItem | undefined): number {
  if (item?.stageId === "arrival") return 3;
  if (item?.stageId === "daily") return 4;
  if (item?.stageId === "breed") return 5;
  if (item?.stageId === "life-change") return 6;
  return 4;
}

export function getLifeScenariosForSpecies(species: string, breedId = ""): Scenario[] {
  return getSpeciesConfig(species).getLifeScenarios(breedId);
}

export function getBreedChallengeScenarios(breedId: string): Scenario[] {
  const config = getSpeciesConfigForBreed(breedId);
  if ("breedChallenges" in config) return config.breedChallenges(breedId);

  // 舊呼叫若提供未註冊品種，仍維持原本的犬隻預設行為。
  const fallback = getSpeciesConfigForBreed("");
  return "breedChallenges" in fallback ? fallback.breedChallenges(breedId) : [];
}

export function getAllScenariosForSpecies(species: string, breedId: string): Scenario[] {
  return getSpeciesConfig(species).getReportScenarios(breedId);
}

export function getJourneyItemsForSpecies(species: string): JourneyItem[] {
  // 品種資料與題庫仍保留供日後啟用；目前不納入可見流程、進度或匯出。
  return getSpeciesConfig(species).journey.items
    .filter((item) => item.stageId !== "breed" && item.type !== "breed-challenge" && item.type !== "bird-challenge");
}
