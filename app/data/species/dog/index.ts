import { dogAssets } from "./assets";
import { dogArrivalMealSceneLayout, dogArrivalMealSupplyImageSizes } from "./feeding";
import { dogJourney } from "./journey";
import { dogLayout } from "./layout";
import { dogPreparation } from "./preparation";
import { dogReport } from "./report";
import { dogLifeScenarios } from "./scenarios";
import { getDogBreedChallengeScenarios } from "./breed-challenges";
import { dogSelection } from "./selection";

export const dogConfig = {
  id: "dog" as const,
  selection: dogSelection,
  preparation: dogPreparation,
  journey: dogJourney,
  scenarios: dogLifeScenarios,
  breedChallenges: getDogBreedChallengeScenarios,
  report: dogReport,
  assets: dogAssets,
  layout: dogLayout,
  feeding: { arrivalMealSceneLayout: dogArrivalMealSceneLayout, arrivalMealSupplyImageSizes: dogArrivalMealSupplyImageSizes },
} as const;

export { dogAssets, dogJourney, dogLayout, dogPreparation, dogReport, dogSelection, dogLifeScenarios, getDogBreedChallengeScenarios, dogArrivalMealSceneLayout, dogArrivalMealSupplyImageSizes };
