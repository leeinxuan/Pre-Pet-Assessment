import type { JourneyItem, Scenario, ScenarioPresentationConfig, SpeciesScenarioPresentationConfig } from "../../game-types";
import { catDailyBehaviorScenarioIds, catJourneyItems, catScenarioPresentation } from "./cat/journey";
import { getCatBreedChallengeScenarios } from "./cat/breed-challenges";
import { catLifeScenarios, getCatLifeScenarios } from "./cat/scenarios";
import { dogDailyBehaviorScenarioIds, dogJourneyItems, dogScenarioPresentation } from "./dog/journey";
import { getDogBreedChallengeScenarios } from "./dog/breed-challenges";
import { dogLifeScenarios, getDogLifeScenarios } from "./dog/scenarios";
import { rabbitDailyBehaviorScenarioIds, rabbitJourneyItems, rabbitScenarioPresentation } from "./rabbit/journey";
import { getRabbitBreedChallengeScenarios } from "./rabbit/breed-challenges";
import { rabbitActivityScenarios, rabbitLifeScenarios } from "./rabbit/scenarios";
import { birdDailyBehaviorScenarioIds, birdJourneyItems, birdScenarioPresentation } from "./bird/journey";
import { getBirdChallengeScenarios } from "./bird/breed-challenges";
import { birdActivityScenarios, birdLifeScenarios } from "./bird/scenarios";
import { hamsterDailyBehaviorScenarioIds, hamsterJourneyItems, hamsterScenarioPresentation } from "./hamster/journey";
import { hamsterLifeScenarios } from "./hamster/scenarios";

export { catJourneyItems, catLifeScenarios, dogJourneyItems, dogLifeScenarios, rabbitJourneyItems, rabbitLifeScenarios, birdJourneyItems, birdLifeScenarios };

const dailyBehaviorScenarioIdsBySpecies = {
  dog: dogDailyBehaviorScenarioIds,
  cat: catDailyBehaviorScenarioIds,
  rabbit: rabbitDailyBehaviorScenarioIds,
  bird: birdDailyBehaviorScenarioIds,
  hamster: hamsterDailyBehaviorScenarioIds,
} as const;

const scenarioPresentationBySpecies: Record<string, SpeciesScenarioPresentationConfig> = {
  dog: dogScenarioPresentation,
  cat: catScenarioPresentation,
  rabbit: rabbitScenarioPresentation,
  bird: birdScenarioPresentation,
  hamster: hamsterScenarioPresentation,
};

export function getDailyBehaviorScenarioIds(species: string): readonly string[] {
  return dailyBehaviorScenarioIdsBySpecies[species as keyof typeof dailyBehaviorScenarioIdsBySpecies] ?? dailyBehaviorScenarioIdsBySpecies.dog;
}

export function getScenarioPresentation(species: string, scenarioId: string): ScenarioPresentationConfig {
  const config = scenarioPresentationBySpecies[species] ?? scenarioPresentationBySpecies.dog;
  return { ...config.defaults, ...config.scenarios[scenarioId] } as ScenarioPresentationConfig;
}

/** 旅程畫面站點由資料中的階段識別決定，不依物種或陣列索引猜測。 */
export function getJourneyStepForItem(item: JourneyItem | undefined): number {
  if (item?.stageId === "arrival") return 3;
  if (item?.stageId === "daily") return 4;
  if (item?.stageId === "breed") return 5;
  if (item?.stageId === "life-change") return 6;
  return 4;
}

/** 共用旅程框架只透過此入口讀取物種資料，不在 UI 內分支題庫來源。 */
export function getLifeScenariosForSpecies(species: string, breedId = ""): Scenario[] {
  if (species === "cat") return getCatLifeScenarios(breedId);
  if (species === "rabbit") return rabbitLifeScenarios;
  if (species === "bird") return birdLifeScenarios;
  if (species === "hamster") return hamsterLifeScenarios;
  return getDogLifeScenarios(breedId);
}

export function getBreedChallengeScenarios(breedId: string): Scenario[] {
  if (breedId === "rabbit") return getRabbitBreedChallengeScenarios(breedId);
  if (breedId === "bird") return getBirdChallengeScenarios();
  return breedId === "mixed-cat" || breedId === "british-shorthair"
    ? getCatBreedChallengeScenarios(breedId)
    : getDogBreedChallengeScenarios(breedId);
}

export function getAllScenariosForSpecies(species: string, breedId: string): Scenario[] {
  if (species === "rabbit") return [...rabbitLifeScenarios, ...Object.values(rabbitActivityScenarios)];
  if (species === "bird") return [...birdLifeScenarios, ...Object.values(birdActivityScenarios)];
  if (species === "hamster") return hamsterLifeScenarios;
  return getLifeScenariosForSpecies(species, breedId);
}

export function getJourneyItemsForSpecies(species: string): JourneyItem[] {
  const items = species === "cat" ? catJourneyItems
    : species === "rabbit" ? rabbitJourneyItems
      : species === "bird" ? birdJourneyItems
        : species === "hamster" ? hamsterJourneyItems
        : dogJourneyItems;
  // 品種資料與題庫仍保留供日後啟用；目前不納入可見流程、進度或匯出。
  return items.filter((item) => item.stageId !== "breed" && item.type !== "breed-challenge" && item.type !== "bird-challenge");
}
