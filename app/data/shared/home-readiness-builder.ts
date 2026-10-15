import type { HomeReadinessCard, HomeReadinessConfig, HomeReadinessHousingChoice, HomeReadinessTextBlock, HomeReadinessTextSegment } from "./home-readiness-types";

export const text = (value: string, emphasis = false): HomeReadinessTextSegment => ({ text: value, ...(emphasis ? { emphasis } : {}) });
export const item = (...segments: HomeReadinessTextSegment[]): HomeReadinessTextBlock => ({ type: "item", segments });
export const paragraph = (...segments: HomeReadinessTextSegment[]): HomeReadinessTextBlock => ({ type: "paragraph", segments });

export function createHomeReadinessConfig(input: {
  housingChoices: HomeReadinessHousingChoice[];
  cards: HomeReadinessCard[];
  reviewSummary: HomeReadinessTextSegment[];
  pendingReviewSummary: HomeReadinessTextSegment[];
}): HomeReadinessConfig {
  return { id: "home-readiness", stageId: "home-readiness", order: 1, summaryCategory: "home-readiness", ...input, completionMessage: [text("讓這份承諾是全家"), text("想清楚後共同做出的決定", true), text("。")] };
}
