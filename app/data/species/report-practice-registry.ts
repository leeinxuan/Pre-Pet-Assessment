import type { LifeActivityState, ReportPracticeItemConfig } from "../../game-types";
import { isReportPracticeItemComplete as selectReportPracticeItemCompletion } from "./report-practice-selectors";

/** 第一餐需求由各物種 feeding.ts 推導，避免在報告層維護第二份食材清單。 */
export const reportPracticeRegistry = {
  arrivalMeal: { id: "arrival-meal", label: "已完成到家第一餐", completionSelector: "arrival-meal" },
} as const satisfies Record<string, ReportPracticeItemConfig>;

export function getReportPracticeItems(): readonly ReportPracticeItemConfig[] {
  return [reportPracticeRegistry.arrivalMeal];
}

export function isReportPracticeItemComplete(item: ReportPracticeItemConfig, species: string, activity: LifeActivityState): boolean {
  return selectReportPracticeItemCompletion(item, species, activity);
}

const discussionSummaryOverrides: Record<string, Record<string, { confirmed: string; needsConfirmation: string }>> = {
  dog: { "busy-daily-care": { confirmed: "忙碌時的日常照顧：協助者已安排，但緊急聯絡方式仍值得在交接前再確認。", needsConfirmation: "忙碌時的日常照顧：需要確認協助者是否真的有時間、能力與意願照顧寵物。" } },
  cat: { "cat-busy-care": { confirmed: "臨時晚歸時的貓咪照顧：協助者已安排，但緊急聯絡方式仍值得在交接前再確認。", needsConfirmation: "臨時晚歸時的貓咪照顧：需要確認協助者是否真的有時間、能力與意願照顧貓咪，並清楚交接食水、砂盆、環境巡視、陪玩與狀況觀察。" } },
};

export function getReportDiscussionSummaryOverride(species: string, scenarioId: string, helperDetailsConfirmed: boolean): string | undefined {
  const override = discussionSummaryOverrides[species]?.[scenarioId];
  return override ? (helperDetailsConfirmed ? override.confirmed : override.needsConfirmation) : undefined;
}
