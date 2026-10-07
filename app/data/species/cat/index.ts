import { catAssets } from "./assets";
import { catFeeding } from "./feeding";
import { catHazards, catRoomItems } from "./preparation";
import { catJourney } from "./journey";
import { catLayout } from "./layout";
import { catPreparation } from "./preparation";
import { catReport } from "./report";
import { catLifeScenarios } from "./scenarios";
import { getCatBreedChallengeScenarios } from "./breed-challenges";
import { catSelection } from "./selection";
import { catCopy } from "./copy";
import { catHomeReadiness } from "./home-readiness";
import { catMasteredCareThemes } from "./mastered-care-themes";
import { catCareReviewAdditionalNotes } from "./care-review-notes";

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
  feeding: catFeeding,
  copy: catCopy,
  homeReadiness: catHomeReadiness,
  masteredCareThemes: catMasteredCareThemes,
  careReviewAdditionalNotes: catCareReviewAdditionalNotes,
} as const;

export { catAssets, catJourney, catLayout, catPreparation, catReport, catSelection, catLifeScenarios, getCatBreedChallengeScenarios, catFeeding };
