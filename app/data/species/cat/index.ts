import { catAssets } from "./assets";
import { catHazards, catRoomItems } from "./preparation";
import { catJourney } from "./journey";
import { catLayout } from "./layout";
import { catPreparation } from "./preparation";
import { catReport } from "./report";
import { catLifeScenarios } from "./scenarios";
import { getCatBreedChallengeScenarios } from "./breed-challenges";
import { catSelection } from "./selection";

export const catConfig = {
  id: "cat" as const,
  selection: catSelection,
  preparation: { roomItems: catRoomItems, hazards: catHazards, ...catPreparation },
  journey: catJourney,
  scenarios: catLifeScenarios,
  breedChallenges: getCatBreedChallengeScenarios,
  report: catReport,
  assets: catAssets,
  layout: catLayout,
} as const;

export { catAssets, catJourney, catLayout, catPreparation, catReport, catSelection, catLifeScenarios, getCatBreedChallengeScenarios };
