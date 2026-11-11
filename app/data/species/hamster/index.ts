import { hamsterAssets } from "./assets";
import { hamsterSelection } from "./selection";
import { hamsterFeeding } from "./feeding";
import { hamsterPreparation } from "./preparation";
import { hamsterJourney, hamsterScenarioPresentation } from "./journey";
import { hamsterLifeScenarios } from "./scenarios";
import { hamsterReport } from "./report";
import { hamsterCopy } from "./copy";
import { hamsterHomeReadiness } from "./home-readiness";
import { hamsterMasteredCareThemes } from "./mastered-care-themes";
import { hamsterCareReviewAdditionalNotes } from "./care-review-notes";
import { hamsterAcquisition } from "./acquisition";
import type { SpeciesConfigContract } from "../../shared/species-config-types";

export const hamsterConfig = {
  id: "hamster" as const,
  mobileActivityLayout: "full-bleed" as const,
  selection: hamsterSelection,
  preparation: hamsterPreparation,
  journey: hamsterJourney,
  scenarios: hamsterLifeScenarios,
  getLifeScenarios: () => hamsterLifeScenarios,
  getReportScenarios: () => hamsterLifeScenarios,
  scenarioPresentation: hamsterScenarioPresentation,
  report: hamsterReport,
  assets: hamsterAssets,
  feeding: hamsterFeeding,
  copy: hamsterCopy,
  homeReadiness: hamsterHomeReadiness,
  masteredCareThemes: hamsterMasteredCareThemes,
  careReviewAdditionalNotes: hamsterCareReviewAdditionalNotes,
  acquisition: hamsterAcquisition,
} as const satisfies SpeciesConfigContract;

export { hamsterSelection };
