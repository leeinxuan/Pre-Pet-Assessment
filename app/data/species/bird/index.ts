import { birdAssets } from "./assets";
import { birdSelection } from "./selection";
import { birdFeeding } from "./feeding";
import { getBirdChallengeScenarios } from "./breed-challenges";
import { birdJourney, birdScenarioPresentation } from "./journey";
import { birdPreparation } from "./preparation";
import { birdReport } from "./report";
import { birdLifeScenarios } from "./scenarios";
import { birdCopy } from "./copy";
import { birdHomeReadiness } from "./home-readiness";
import { birdMasteredCareThemes } from "./mastered-care-themes";
import { birdCareReviewAdditionalNotes } from "./care-review-notes";
import { birdAcquisition } from "./acquisition";
import { birdActivityScenarios, birdCageInspectionActivityData, birdCageInspectionConfig } from "./activities";

export const birdConfig = {
  id: "bird" as const,
  selection: birdSelection,
  preparation: birdPreparation,
  journey: birdJourney,
  scenarios: birdLifeScenarios,
  getLifeScenarios: () => birdLifeScenarios,
  getReportScenarios: () => [...birdLifeScenarios, ...Object.values(birdActivityScenarios)],
  scenarioPresentation: birdScenarioPresentation,
  breedChallenges: getBirdChallengeScenarios,
  report: birdReport,
  assets: birdAssets,
  feeding: birdFeeding,
  copy: birdCopy,
  homeReadiness: birdHomeReadiness,
  masteredCareThemes: birdMasteredCareThemes,
  careReviewAdditionalNotes: birdCareReviewAdditionalNotes,
  acquisition: birdAcquisition,
} as const;

export { birdAssets, birdJourney, birdPreparation, birdReport, birdLifeScenarios, getBirdChallengeScenarios, birdFeeding, birdCageInspectionActivityData, birdCageInspectionConfig, birdSelection };
