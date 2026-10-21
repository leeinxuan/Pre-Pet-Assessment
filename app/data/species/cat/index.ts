import { catAssets } from "./assets";
import { catFeeding } from "./feeding";
import { catJourney, catScenarioPresentation } from "./journey";
import { catPreparation } from "./preparation";
import { catReport } from "./report";
import { catLifeScenarios, getCatLifeScenarios } from "./scenarios";
import { getCatBreedChallengeScenarios } from "./breed-challenges";
import { catSelection } from "./selection";
import { catCopy } from "./copy";
import { catHomeReadiness } from "./home-readiness";
import { catMasteredCareThemes } from "./mastered-care-themes";
import { catCareReviewAdditionalNotes } from "./care-review-notes";
import { catAcquisition } from "./acquisition";
import { catLitterRescueConfig } from "./activities";

export const catConfig = {
  id: "cat" as const,
  selection: catSelection,
  preparation: catPreparation,
  journey: catJourney,
  scenarios: catLifeScenarios,
  getLifeScenarios: getCatLifeScenarios,
  getReportScenarios: getCatLifeScenarios,
  scenarioPresentation: catScenarioPresentation,
  breedChallenges: getCatBreedChallengeScenarios,
  report: catReport,
  assets: catAssets,
  feeding: catFeeding,
  copy: catCopy,
  homeReadiness: catHomeReadiness,
  masteredCareThemes: catMasteredCareThemes,
  careReviewAdditionalNotes: catCareReviewAdditionalNotes,
  acquisition: catAcquisition,
} as const;

export { catAssets, catJourney, catPreparation, catReport, catSelection, catLifeScenarios, getCatBreedChallengeScenarios, catFeeding, catLitterRescueConfig };
