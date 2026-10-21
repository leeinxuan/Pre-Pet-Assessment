import { dogAssets } from "./assets";
import { dogFeeding } from "./feeding";
import { dogJourney, dogScenarioPresentation } from "./journey";
import { dogPreparation } from "./preparation";
import { dogReport } from "./report";
import { dogLifeScenarios, getDogLifeScenarios } from "./scenarios";
import { getDogBreedChallengeScenarios } from "./breed-challenges";
import { dogSelection } from "./selection";
import { dogCopy } from "./copy";
import { dogHomeReadiness } from "./home-readiness";
import { dogMasteredCareThemes } from "./mastered-care-themes";
import { dogCareReviewAdditionalNotes } from "./care-review-notes";
import { dogAcquisition } from "./acquisition";

export const dogConfig = {
  id: "dog" as const,
  selection: dogSelection,
  preparation: dogPreparation,
  journey: dogJourney,
  scenarios: dogLifeScenarios,
  getLifeScenarios: getDogLifeScenarios,
  getReportScenarios: getDogLifeScenarios,
  scenarioPresentation: dogScenarioPresentation,
  breedChallenges: getDogBreedChallengeScenarios,
  report: dogReport,
  assets: dogAssets,
  feeding: dogFeeding,
  copy: dogCopy,
  homeReadiness: dogHomeReadiness,
  masteredCareThemes: dogMasteredCareThemes,
  careReviewAdditionalNotes: dogCareReviewAdditionalNotes,
  acquisition: dogAcquisition,
} as const;

export { dogAssets, dogJourney, dogPreparation, dogReport, dogSelection, dogLifeScenarios, getDogBreedChallengeScenarios, dogFeeding };
