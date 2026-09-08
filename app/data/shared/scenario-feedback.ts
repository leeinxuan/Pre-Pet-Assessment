import type { ScenarioChoice } from "../../game-types";

export const positive = {
  feedbackTitle: "做得很好！",
  effects: { trust: 2, wellbeing: 2, support: 1 },
} as const;

export const partial = {
  feedbackTitle: "方向不錯，但還可以再完整一點。",
  effects: { trust: 1, wellbeing: 1, support: 1 },
} as const;

export const incorrect = {
  feedbackTitle: "這個做法可能不太適合。",
  effects: { trust: -1, wellbeing: -1, support: 0 },
} as const;

export type ScenarioFeedback = Pick<ScenarioChoice, "feedbackTitle" | "effects">;
