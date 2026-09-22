import { rabbitAssets } from "./assets";
import { getRabbitBreedChallengeScenarios } from "./breed-challenges";
import { rabbitJourney } from "./journey";
import { rabbitLayout } from "./layout";
import { rabbitPreparation } from "./preparation";
import { rabbitReport } from "./report";
import { rabbitLifeScenarios } from "./scenarios";

/**
 * 兔子不進行品種細選；固定 selection id 為 rabbit。
 * 共用選擇元件可透過 skipBreedPage 直接進入命名頁。
 */
export const rabbitSelection = {
  skipBreedPage: true,
  breeds: [{
    id: "rabbit", species: "rabbit", label: "兔子", icon: "🐇", image: rabbitAssets.selection.rabbit, size: "small",
    shortDescription: "兔子是純草食動物，牧草必須持續供應；牠們也會隱藏不適，需要每天觀察食慾、精神與糞便。",
  }],
} as const;

export const rabbitConfig = {
  id: "rabbit" as const,
  selection: rabbitSelection,
  preparation: rabbitPreparation,
  journey: rabbitJourney,
  scenarios: rabbitLifeScenarios,
  breedChallenges: getRabbitBreedChallengeScenarios,
  report: rabbitReport,
  assets: rabbitAssets,
  layout: rabbitLayout,
} as const;

export { rabbitAssets, rabbitJourney, rabbitLayout, rabbitPreparation, rabbitReport, rabbitLifeScenarios, getRabbitBreedChallengeScenarios };
