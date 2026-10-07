import type { LifeActivityState } from "../../game-types";
import type { MasteredCareSource } from "./mastered-care-types";

type LifeStateSource = Extract<MasteredCareSource, { kind: "life-state" }>;
type LifeStateSelector = (activity: LifeActivityState, source: LifeStateSource) => boolean;

/**
 * 專屬日常活動的完成條件集中在此。報告版型只提供 source key 與 activity，
 * 不應知道散步、貓砂盆、兔子美容、鳥籠或倉鼠巡視各自的 state 欄位。
 */
export const masteredCareCompletionSelectors: Record<LifeStateSource["key"], LifeStateSelector> = {
  walkingComplete: (activity) => activity.walkingComplete,
  "cat-litter-complete": (activity) => activity.catInspectionSteps.includes("litter-complete"),
  "rabbit-grooming-complete": (activity) => activity.rabbitGroomingState === "interaction-complete",
  "bird-cage-inspection-complete": (activity, source) => (source.requiredStepIds ?? []).every((stepId) => activity.birdCageInspectionSteps.includes(stepId)),
  "hamster-inspection-complete": (activity) => activity.hamsterInspectionCompleted.length === 2,
};

export function isMasteredCareLifeStateComplete(source: LifeStateSource, activity: LifeActivityState) {
  return masteredCareCompletionSelectors[source.key](activity, source);
}
