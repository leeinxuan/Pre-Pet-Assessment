import type { JourneyItem, Scenario } from "../../game-types";
import { catJourneyItems } from "./cat/journey";
import { getCatBreedChallengeScenarios } from "./cat/breed-challenges";
import { catLifeScenarios, getCatLifeScenarios } from "./cat/scenarios";
import { dogJourneyItems } from "./dog/journey";
import { getDogBreedChallengeScenarios } from "./dog/breed-challenges";
import { dogLifeScenarios, getDogLifeScenarios } from "./dog/scenarios";
import { rabbitJourneyItems } from "./rabbit/journey";
import { getRabbitBreedChallengeScenarios } from "./rabbit/breed-challenges";
import { rabbitActivityScenarios, rabbitLifeScenarios } from "./rabbit/scenarios";
import { birdJourneyItems } from "./bird/journey";
import { getBirdChallengeScenarios } from "./bird/breed-challenges";
import { birdActivityScenarios, birdLifeScenarios } from "./bird/scenarios";

export { catJourneyItems, catLifeScenarios, dogJourneyItems, dogLifeScenarios, rabbitJourneyItems, rabbitLifeScenarios, birdJourneyItems, birdLifeScenarios };

/** 共用旅程框架只透過此入口讀取物種資料，不在 UI 內分支題庫來源。 */
export function getLifeScenariosForSpecies(species: string, breedId = ""): Scenario[] {
  if (species === "cat") return getCatLifeScenarios(breedId);
  if (species === "rabbit") return rabbitLifeScenarios;
  if (species === "bird") return birdLifeScenarios;
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
  if (species === "rabbit") return [...rabbitLifeScenarios, ...Object.values(rabbitActivityScenarios), ...getRabbitBreedChallengeScenarios("rabbit")];
  if (species === "bird") return [...birdLifeScenarios, ...Object.values(birdActivityScenarios), ...getBirdChallengeScenarios()];
  return [...getLifeScenariosForSpecies(species, breedId), ...getBreedChallengeScenarios(breedId)];
}

export function getJourneyItemsForSpecies(species: string): JourneyItem[] {
  if (species === "cat") return catJourneyItems;
  if (species === "rabbit") return rabbitJourneyItems;
  if (species === "bird") return birdJourneyItems;
  return dogJourneyItems;
}
