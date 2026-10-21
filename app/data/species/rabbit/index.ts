import { rabbitAssets } from "./assets";
import { rabbitSelection } from "./selection";
import { rabbitFeeding } from "./feeding";
import { getRabbitBreedChallengeScenarios } from "./breed-challenges";
import { rabbitJourney, rabbitScenarioPresentation } from "./journey";
import { rabbitPreparation } from "./preparation";
import { rabbitReport } from "./report";
import { rabbitActivityScenarios } from "./activities";
import { rabbitLifeScenarios } from "./scenarios";
import { rabbitCopy } from "./copy";
import { rabbitHomeReadiness } from "./home-readiness";
import { rabbitMasteredCareThemes } from "./mastered-care-themes";
import { rabbitCareReviewAdditionalNotes } from "./care-review-notes";
import { rabbitAcquisition } from "./acquisition";

export const rabbitConfig = {
  id: "rabbit" as const,
  selection: rabbitSelection,
  preparation: rabbitPreparation,
  journey: rabbitJourney,
  scenarios: rabbitLifeScenarios,
  getLifeScenarios: () => rabbitLifeScenarios,
  getReportScenarios: () => [...rabbitLifeScenarios, ...Object.values(rabbitActivityScenarios)],
  scenarioPresentation: rabbitScenarioPresentation,
  breedChallenges: getRabbitBreedChallengeScenarios,
  report: rabbitReport,
  assets: rabbitAssets,
  feeding: rabbitFeeding,
  copy: rabbitCopy,
  homeReadiness: rabbitHomeReadiness,
  masteredCareThemes: rabbitMasteredCareThemes,
  careReviewAdditionalNotes: rabbitCareReviewAdditionalNotes,
  acquisition: rabbitAcquisition,
} as const;

export { rabbitAssets, rabbitJourney, rabbitPreparation, rabbitReport, rabbitLifeScenarios, getRabbitBreedChallengeScenarios, rabbitFeeding, rabbitSelection };
