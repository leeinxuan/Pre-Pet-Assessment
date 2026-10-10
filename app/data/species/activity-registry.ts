import type { JourneyActivityConfig, JourneyActivityKey, LifeActivityState } from "../../game-types";
import { rabbitGroomingConfig } from "./rabbit/journey";

type SpeciesActivityRegistry = Record<string, JourneyActivityConfig>;

const video = (itemId: string, scenarioId: string, extra: Partial<JourneyActivityConfig> = {}): JourneyActivityConfig => ({ itemId, scenarioId, activityKey: "video-scenario", ...extra });
const activity = (itemId: string, activityKey: JourneyActivityKey, extra: Partial<JourneyActivityConfig> = {}): JourneyActivityConfig => ({ itemId, activityKey, ...extra });

/**
 * 單一活動分派入口。此表刻意只描述既有行為，不建立或合併任何活動元件。
 * 下一步由 LifeJourneyMap 消費 activityKey、transition 與 resetKey。
 */
export const journeyActivityRegistry: Record<string, SpeciesActivityRegistry> = {
  dog: {
    arrival: video("arrival", "arrival-adjustment", { transition: "arrival-meal", deferItemExpenses: true }),
    behavior: activity("behavior", "daily-behavior", { resetKey: "daily-behavior" }),
    walking: activity("walking", "walking", { resetKey: "walking" }),
    "breed-challenge": activity("breed-challenge", "breed-challenge", { resetKey: "breed-challenge" }),
    "busy-care": activity("busy-care", "busy-care", { transition: "busy-care", resetKey: "busy-care" }),
    sick: video("sick", "illness-vet", { transition: "time-pass", triggerExpenseOnFeedback: true }), senior: video("senior", "growing-old", { triggerExpenseOnFeedback: true }),
  },
  cat: {
    "cat-arrival": video("cat-arrival", "cat-arrival-adjustment", { transition: "arrival-meal", deferItemExpenses: true }),
    "cat-daily-care": activity("cat-daily-care", "daily-behavior", { resetKey: "daily-behavior" }),
    "cat-daily-inspection": activity("cat-daily-inspection", "cat-inspection", { resetKey: "cat-inspection" }),
    "breed-challenge": activity("breed-challenge", "breed-challenge", { resetKey: "breed-challenge" }),
    "cat-busy-care": activity("cat-busy-care", "busy-care", { resetKey: "busy-care" }),
    "cat-sick": video("cat-sick", "cat-illness-vet", { triggerExpenseOnFeedback: true }), "cat-senior": video("cat-senior", "cat-growing-old", { triggerExpenseOnFeedback: true }),
  },
  rabbit: {
    "rabbit-arrival": video("rabbit-arrival", "rabbit-arrival-adjustment"), "rabbit-first-meal": activity("rabbit-first-meal", "arrival-meal"),
    "rabbit-carry-sort": activity("rabbit-carry-sort", "rabbit-carry-sort", { resetKey: "rabbit-carry-sort" }),
    "rabbit-daily-care": activity("rabbit-daily-care", "daily-behavior", { resetKey: "daily-behavior", triggerExpenseOnFeedback: true }),
    "rabbit-daily-check": activity("rabbit-daily-check", "rabbit-daily-check", { resetKey: "rabbit-daily-check" }),
    "breed-challenge": activity("breed-challenge", "breed-challenge", { resetKey: "breed-challenge" }),
    "rabbit-busy-care": activity("rabbit-busy-care", "busy-care", { resetKey: "busy-care" }),
    "rabbit-health": video("rabbit-health", "rabbit-health-emergency", { triggerExpenseOnFeedback: true }), "rabbit-senior": video("rabbit-senior", "rabbit-senior-care", { triggerExpenseOnFeedback: true }),
  },
  bird: {
    "bird-arrival": video("bird-arrival", "bird-arrival-adjustment"), "bird-first-meal": activity("bird-first-meal", "arrival-meal"),
    "bird-daily-care": activity("bird-daily-care", "daily-behavior", { resetKey: "daily-behavior" }),
    "bird-daily-inspection": activity("bird-daily-inspection", "bird-cage-inspection", { resetKey: "bird-cage-inspection" }),
    "bird-challenge": activity("bird-challenge", "breed-challenge", { resetKey: "breed-challenge" }),
    "bird-busy-care": activity("bird-busy-care", "busy-care", { resetKey: "busy-care" }),
    "bird-sick": video("bird-sick", "bird-health-emergency", { triggerExpenseOnFeedback: true }), "bird-senior": activity("bird-senior", "daily-behavior-single", { resetKey: "daily-behavior", triggerExpenseOnFeedback: true }),
  },
  hamster: {
    "hamster-arrival": video("hamster-arrival", "hamster-arrival-adjustment", { deferItemExpenses: true }),
    "hamster-first-meal": activity("hamster-first-meal", "arrival-meal", { resetKey: "hamster-first-meal" }),
    "hamster-daily-care": activity("hamster-daily-care", "daily-behavior", { resetKey: "daily-behavior" }),
    "hamster-solitary": video("hamster-solitary", "hamster-solitary"),
    "hamster-cage-check": activity("hamster-cage-check", "hamster-inspection", { resetKey: "hamster-inspection" }),
    "hamster-busy-care": activity("hamster-busy-care", "busy-care", { resetKey: "busy-care" }),
    "hamster-health": video("hamster-health", "hamster-health-emergency", { triggerExpenseOnFeedback: true }), "hamster-senior": video("hamster-senior", "hamster-senior-care", { triggerExpenseOnFeedback: true }),
  },
  gecko: {
    "gecko-arrival": video("gecko-arrival", "gecko-arrival-settle", { deferItemExpenses: true }),
    "gecko-first-meal": activity("gecko-first-meal", "arrival-meal", { resetKey: "gecko-first-meal" }),
    "gecko-daily-care": activity("gecko-daily-care", "daily-behavior", { resetKey: "daily-behavior" }),
    "gecko-health-inspection": activity("gecko-health-inspection", "gecko-health-inspection", { resetKey: "gecko-health-inspection" }),
    "gecko-busy-care": activity("gecko-busy-care", "busy-care", { resetKey: "busy-care" }),
    "gecko-sick": video("gecko-sick", "gecko-health-emergency", { triggerExpenseOnFeedback: true }),
    "gecko-senior": video("gecko-senior", "gecko-senior-care", { triggerExpenseOnFeedback: true }),
  },
};

export function getJourneyActivityConfig(species: string, itemId: string): JourneyActivityConfig | undefined {
  return journeyActivityRegistry[species]?.[itemId] ?? journeyActivityRegistry.dog[itemId];
}

/** 重玩時只回復既有活動 state；不處理答題、費用或完成紀錄。 */
export function getJourneyActivityResetPatch(resetKey: string | undefined): Partial<LifeActivityState> | undefined {
  switch (resetKey) {
    case "walking": return { walkingPreparedItems: [], walkingSceneIndex: 0, walkingMinutes: 0, walkingPoopCleaned: false, walkingComplete: false, catInspectionSteps: [] };
    case "cat-inspection": return { catInspectionSteps: [], catInspectionIntroStarted: false };
    case "rabbit-carry-sort": return { rabbitCarryOrder: [], rabbitCarryComplete: false, rabbitCarryAttempts: 0, rabbitCarryAnswerRevealed: false, rabbitCarryFeedbackShown: false };
    case "rabbit-daily-check": return { rabbitDailyCheckSteps: [], rabbitGroomingIntroStarted: false, rabbitGroomingState: rabbitGroomingConfig.initialState, rabbitGroomingObservations: {}, rabbitGroomingInspection: {} };
    case "bird-cage-inspection": return { birdCageInspectionSteps: [], birdCageInspectionIntroStarted: false, birdCageInspectionStates: {} };
    case "hamster-first-meal": return { hamsterMealSelected: [], hamsterMealFeedbackId: "" };
    case "hamster-inspection": return { hamsterInspectionStarted: false, hamsterInspectionStates: {}, hamsterInspectionCompleted: [], hamsterInspectionFeedback: {} };
    case "gecko-health-inspection": return { geckoHealthInspectionStarted: false, geckoHealthInspectionStates: {}, geckoHealthInspectionCompleted: [], geckoHealthInspectionFeedback: {} };
    default: return undefined;
  }
}
