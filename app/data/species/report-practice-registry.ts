import type { LifeActivityState, ReportPracticeItemConfig } from "../../game-types";

type SpeciesPracticeConfig = { arrivalMeal: ReportPracticeItemConfig; additionalPracticeItems?: readonly ReportPracticeItemConfig[] };

export const reportPracticeRegistry: Record<string, SpeciesPracticeConfig> = {
  dog: { arrivalMeal: { id: "arrival-meal", label: "已完成到家第一餐", completionSelector: "arrival-meal", requiredActivityIds: ["food", "water"] } },
  cat: { arrivalMeal: { id: "arrival-meal", label: "已完成到家第一餐", completionSelector: "arrival-meal", requiredActivityIds: ["food", "water"] } },
  rabbit: { arrivalMeal: { id: "arrival-meal", label: "已完成到家第一餐", completionSelector: "arrival-meal", requiredActivityIds: ["food", "water", "veggie"] } },
  bird: { arrivalMeal: { id: "arrival-meal", label: "已完成到家第一餐", completionSelector: "arrival-meal", requiredActivityIds: ["food", "water", "veggie"] } },
  hamster: { arrivalMeal: { id: "arrival-meal", label: "已完成到家第一餐", completionSelector: "arrival-meal", requiredActivityIds: ["hamster-pellet", "fresh-water"] } },
};

export function getReportPracticeItems(species: string): readonly ReportPracticeItemConfig[] {
  const config = reportPracticeRegistry[species] ?? reportPracticeRegistry.dog;
  return [config.arrivalMeal, ...(config.additionalPracticeItems ?? [])];
}

export function isReportPracticeItemComplete(item: ReportPracticeItemConfig, activity: LifeActivityState): boolean {
  if (item.completionSelector === "cat-litter") return activity.catInspectionSteps.includes("litter-complete");
  return (item.requiredActivityIds ?? []).every((id) => id === "food" ? activity.arrivalMealFoodReady : id === "water" ? activity.arrivalMealWaterReady : id === "veggie" ? activity.arrivalMealVeggieReady : activity.hamsterMealSelected.includes(id));
}

const discussionSummaryOverrides: Record<string, Record<string, { confirmed: string; needsConfirmation: string }>> = {
  dog: { "busy-daily-care": { confirmed: "忙碌時的日常照顧：協助者已安排，但緊急聯絡方式仍值得在交接前再確認。", needsConfirmation: "忙碌時的日常照顧：需要確認協助者是否真的有時間、能力與意願照顧寵物。" } },
  cat: { "cat-busy-care": { confirmed: "臨時晚歸時的貓咪照顧：協助者已安排，但緊急聯絡方式仍值得在交接前再確認。", needsConfirmation: "臨時晚歸時的貓咪照顧：需要確認協助者是否真的有時間、能力與意願照顧貓咪，並清楚交接食水、砂盆、環境巡視、陪玩與狀況觀察。" } },
};

export function getReportDiscussionSummaryOverride(species: string, scenarioId: string, helperDetailsConfirmed: boolean): string | undefined {
  const override = discussionSummaryOverrides[species]?.[scenarioId];
  return override ? (helperDetailsConfirmed ? override.confirmed : override.needsConfirmation) : undefined;
}
