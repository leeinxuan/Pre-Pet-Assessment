import type { JourneyItem, Scenario } from "../../game-types";
import { catJourneyItems } from "./cat/journey";
import { getCatBreedChallengeScenarios } from "./cat/breed-challenges";
import { catLifeScenarios } from "./cat/scenarios";
import { dogJourneyItems } from "./dog/journey";
import { getDogBreedChallengeScenarios } from "./dog/breed-challenges";
import { dogLifeScenarios } from "./dog/scenarios";
import { rabbitJourneyItems } from "./rabbit/journey";
import { getRabbitBreedChallengeScenarios } from "./rabbit/breed-challenges";
import { rabbitLifeScenarios } from "./rabbit/scenarios";

export { catJourneyItems, catLifeScenarios, dogJourneyItems, dogLifeScenarios, rabbitJourneyItems, rabbitLifeScenarios };

/** 共用旅程框架只透過此入口讀取物種資料，不在 UI 內分支題庫來源。 */
export function getLifeScenariosForSpecies(species: string): Scenario[] {
  if (species === "cat") return catLifeScenarios;
  if (species === "rabbit") return rabbitLifeScenarios;
  return dogLifeScenarios;
}

export function getBreedChallengeScenarios(breedId: string): Scenario[] {
  if (breedId === "rabbit") return getRabbitBreedChallengeScenarios(breedId);
  return breedId === "mixed-cat" || breedId === "british-shorthair"
    ? getCatBreedChallengeScenarios(breedId)
    : getDogBreedChallengeScenarios(breedId);
}

export function getAllScenariosForSpecies(species: string, breedId: string): Scenario[] {
  return [...getLifeScenariosForSpecies(species), ...getBreedChallengeScenarios(breedId)];
}

export function getJourneyItemsForSpecies(species: string): JourneyItem[] {
  if (species === "cat") return catJourneyItems;
  if (species === "rabbit") return rabbitJourneyItems;
  return dogJourneyItems;
}
