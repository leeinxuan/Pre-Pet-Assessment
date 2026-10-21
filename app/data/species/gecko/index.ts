import { geckoAssets } from "./assets";
import { geckoSelection } from "./selection";
import { geckoCopy } from "./copy";
import { geckoFeeding } from "./feeding";
import { geckoPreparation } from "./preparation";
import { geckoJourney, geckoScenarioPresentation } from "./journey";
import { geckoLifeScenarios } from "./scenarios";
import { geckoReport } from "./report";
import { geckoHomeReadiness } from "./home-readiness";
import { geckoMasteredCareThemes } from "./mastered-care-themes";
import { geckoCareReviewAdditionalNotes } from "./care-review-notes";
import { geckoAcquisition } from "./acquisition";

export const geckoConfig = {
  id: "gecko" as const,
  selection: geckoSelection,
  preparation: geckoPreparation,
  journey: geckoJourney,
  scenarios: geckoLifeScenarios,
  getLifeScenarios: () => geckoLifeScenarios,
  getReportScenarios: () => geckoLifeScenarios,
  scenarioPresentation: geckoScenarioPresentation,
  report: geckoReport,
  assets: geckoAssets,
  feeding: geckoFeeding,
  copy: geckoCopy,
  homeReadiness: geckoHomeReadiness,
  masteredCareThemes: geckoMasteredCareThemes,
  careReviewAdditionalNotes: geckoCareReviewAdditionalNotes,
  acquisition: geckoAcquisition,
} as const;

export { geckoSelection };
