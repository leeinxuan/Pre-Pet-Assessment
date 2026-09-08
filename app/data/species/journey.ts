import type { JourneyItem, Scenario } from "../../game-types";
import { catJourneyItems } from "./cat/journey";
import { getCatBreedChallengeScenarios } from "./cat/breed-challenges";
import { catLifeScenarios } from "./cat/scenarios";
import { dogJourneyItems } from "./dog/journey";
import { getDogBreedChallengeScenarios } from "./dog/breed-challenges";
import { dogLifeScenarios } from "./dog/scenarios";

export { catJourneyItems, catLifeScenarios, dogJourneyItems, dogLifeScenarios };

/** 共用旅程框架只透過此入口讀取物種資料，不在 UI 內分支題庫來源。 */
export function getLifeScenariosForSpecies(species: string): Scenario[] {
  return species === "cat" ? catLifeScenarios : dogLifeScenarios;
}

export function getBreedChallengeScenarios(breedId: string): Scenario[] {
  return breedId === "orange-cat" || breedId === "tabby-cat"
    ? getCatBreedChallengeScenarios(breedId)
    : getDogBreedChallengeScenarios(breedId);
}

export function getAllScenariosForSpecies(species: string, breedId: string): Scenario[] {
  return [...getLifeScenariosForSpecies(species), ...getBreedChallengeScenarios(breedId)];
}

export function getJourneyItemsForSpecies(species: string): JourneyItem[] {
  return species === "cat" ? catJourneyItems : dogJourneyItems;
}
