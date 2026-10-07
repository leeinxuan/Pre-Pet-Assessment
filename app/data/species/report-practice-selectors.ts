import { getSpeciesConfig } from "./index";
import type { LifeActivityState, ReportPracticeItemConfig } from "../../game-types";

type PracticeCompletionSelector = ReportPracticeItemConfig["completionSelector"];
type PracticeSelector = (species: string, activity: LifeActivityState) => boolean;

const sceneSupplyCompletionSelectors = {
  food: (activity: LifeActivityState) => activity.arrivalMealFoodReady,
  water: (activity: LifeActivityState) => activity.arrivalMealWaterReady,
  veggie: (activity: LifeActivityState) => activity.arrivalMealVeggieReady,
} as const;

/**
 * 報告中的第一餐完成判定完全由 feeding.ts 的互動設定衍生。
 * scene 類型檢查 requiredSupplies；choice 類型要求所有非 incorrect 的選項皆已選取。
 */
function isArrivalMealComplete(species: string, activity: LifeActivityState) {
  const feeding = getSpeciesConfig(species).feeding;
  if (feeding.interaction === "scene") {
    return feeding.requiredSupplies.every((supply) => sceneSupplyCompletionSelectors[supply](activity));
  }
  return feeding.choices
    .filter((choice) => choice.result !== "incorrect")
    .every((choice) => activity.hamsterMealSelected.includes(choice.id));
}

/** 報告版型只呼叫 selector key；各 selector 可各自認識其所屬活動的 state。 */
export const reportPracticeCompletionSelectors: Record<PracticeCompletionSelector, PracticeSelector> = {
  "arrival-meal": isArrivalMealComplete,
  "cat-litter": (_species, activity) => activity.catInspectionSteps.includes("litter-complete"),
};

export function isReportPracticeItemComplete(item: ReportPracticeItemConfig, species: string, activity: LifeActivityState) {
  return reportPracticeCompletionSelectors[item.completionSelector](species, activity);
}
