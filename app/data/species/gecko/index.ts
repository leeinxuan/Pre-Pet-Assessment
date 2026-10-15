import { geckoAssets } from "./assets";
import { geckoLayout } from "./layout";
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

export const geckoSelection = { skipBreedPage: true, categoryImage: geckoAssets.selection.gecko, breeds: [{ id: "gecko", species: "gecko", label: "小型地棲性守宮", icon: "🦎", image: geckoAssets.selection.gecko, size: "small", shortDescription: "夜行、獨居且仰賴環境溫度梯度的爬蟲；需要穩定的每日觀察與細節照護。" }] } as const;
export const geckoConfig = { id: "gecko" as const, selection: geckoSelection, preparation: geckoPreparation, journey: geckoJourney, scenarios: geckoLifeScenarios, getLifeScenarios: () => geckoLifeScenarios, getReportScenarios: () => geckoLifeScenarios, scenarioPresentation: geckoScenarioPresentation, report: geckoReport, assets: geckoAssets, layout: geckoLayout, feeding: geckoFeeding, copy: geckoCopy, homeReadiness: geckoHomeReadiness, masteredCareThemes: geckoMasteredCareThemes, careReviewAdditionalNotes: geckoCareReviewAdditionalNotes, acquisition: geckoAcquisition } as const;
