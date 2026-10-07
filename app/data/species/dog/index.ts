import { dogAssets } from "./assets";
import { dogFeeding } from "./feeding";
import { dogJourney, dogScenarioPresentation } from "./journey";
import { dogLayout } from "./layout";
import { dogPreparation } from "./preparation";
import { dogReport } from "./report";
import { dogLifeScenarios, getDogLifeScenarios } from "./scenarios";
import { getDogBreedChallengeScenarios } from "./breed-challenges";
import { dogSelection } from "./selection";
import { dogCopy } from "./copy";
import { dogHomeReadiness } from "./home-readiness";
import { dogMasteredCareThemes } from "./mastered-care-themes";
import { dogCareReviewAdditionalNotes } from "./care-review-notes";

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
  layout: dogLayout,
  feeding: dogFeeding,
  copy: dogCopy,
  homeReadiness: dogHomeReadiness,
  masteredCareThemes: dogMasteredCareThemes,
  careReviewAdditionalNotes: dogCareReviewAdditionalNotes,
} as const;

export { dogAssets, dogJourney, dogLayout, dogPreparation, dogReport, dogSelection, dogLifeScenarios, getDogBreedChallengeScenarios, dogFeeding };
