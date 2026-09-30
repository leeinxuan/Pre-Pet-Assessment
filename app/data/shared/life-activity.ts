import type { LifeActivityState } from "../../game-types";

/** 犬貓特殊活動都採用這份共用完成狀態格式。 */
export const initialLifeActivityState: LifeActivityState = {
  bodyLanguageSignals: [],
  arrivalMealFoodReady: false,
  arrivalMealWaterReady: false,
  arrivalMealVeggieReady: false,
  walkingPreparedItems: [],
  walkingSceneIndex: 0,
  walkingMinutes: 0,
  walkingPoopCleaned: false,
  walkingComplete: false,
  catInspectionSteps: [],
  sickTimePassComplete: false,
  bodyCareParts: [],
  seniorAdjustments: [],
  rabbitCarryOrder: [],
  rabbitCarryComplete: false,
  rabbitCarryAttempts: 0,
  rabbitCarryAnswerRevealed: false,
  rabbitCarryFeedbackShown: false,
  rabbitDailyCheckSteps: [],
  rabbitGroomingIntroStarted: false,
  rabbitGroomingState: "part-1-step-1-head-ears",
  rabbitGroomingObservations: {},
  rabbitGroomingInspection: {},
  birdCageInspectionSteps: [],
};
