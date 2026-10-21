import { getDogBreedChallengeScenarios } from "./dog/breed-challenges";
import { dogJourneyItems } from "./dog/journey";
import { dogLifeScenarios } from "./dog/scenarios";
import { dogBreeds } from "./dog/selection";
import { dogDepartureTrunkItems, dogHazards, dogRoomItems } from "./dog/preparation";
import { dogAssets } from "./dog/assets";

/** @deprecated 請由 `data/species/dog/assets.ts` 匯入。 */
export { dogAssets } from "./dog/assets";

/** 犬隻專屬資料集合；共用 UI 透過 species-config 取得。 */
export const dogSpeciesData = {
  id: "dog" as const,
  breeds: dogBreeds,
  roomItems: dogRoomItems,
  hazards: dogHazards,
  trunkItems: dogDepartureTrunkItems,
  lifeScenarios: dogLifeScenarios,
  breedChallenges: getDogBreedChallengeScenarios,
  journeyItems: dogJourneyItems,
  assets: dogAssets,
} as const;
