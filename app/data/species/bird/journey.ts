import type { JourneyItem, SpeciesScenarioPresentationConfig } from "../../../game-types";
import { birdAssets } from "./assets";
import { birdCageInspectionConfig } from "./activities";

export const birdJourneyItems: JourneyItem[] = [
  { id: "bird-arrival", type: "scenario", timeLabel: "一起生活的第一天", title: "第一天適應新家", scenarioId: "bird-arrival-adjustment", stageId: "arrival", stageLabel: "接回家" },
  { id: "bird-first-meal", type: "arrival-meal", timeLabel: "一起生活的第一天", title: "第一餐", stageId: "arrival", stageLabel: "接回家" },
  { id: "bird-daily-care", type: "scenario", timeLabel: "日常照護", title: "鸚鵡日常照護", stageId: "daily", stageLabel: "日常照護" },
  { id: "bird-daily-inspection", type: "bird-cage-inspection", timeLabel: "日常照護", title: "鸚鵡日常巡視", stageId: "daily", stageLabel: "日常照護" },
  { id: "bird-challenge", type: "bird-challenge", timeLabel: "鳥的考驗", title: "鳥的考驗", stageId: "breed", stageLabel: "鳥的考驗" },
  { id: "bird-busy-care", type: "scenario", timeLabel: "當生活發生變化", title: "臨時晚歸，誰來接手？", scenarioId: "bird-busy-care", stageId: "life-change", stageLabel: "生活變化" },
  { id: "bird-sick", type: "scenario", timeLabel: "健康狀況變化", title: "{petName} 今天澎毛縮在角落", scenarioId: "bird-health-emergency", stageId: "life-change", stageLabel: "生活變化" },
  { id: "bird-senior", type: "scenario", timeLabel: "逐漸進入高齡", title: "鸚鵡慢慢變老", scenarioId: "bird-senior-care", stageId: "life-change", stageLabel: "生活變化" },
];
export const birdDailyBehaviorScenarioIds = ["bird-picky-eating", "bird-stereotypy", "bird-excessive-calling"] as const;
export const birdScenarioPresentation: SpeciesScenarioPresentationConfig = {
  defaults: { defaultPetName: "鸚鵡", knowledgeTitle: "鳥類小知識", correctFeedbackMedia: { type: "video", src: birdAssets.petJourney.correctPrimary } },
  scenarios: {
    "bird-picky-eating": { sceneVideo: { src: birdAssets.petJourney.pickyEating, ariaLabel: "鸚鵡挑食情境影片" } },
    "bird-stereotypy": { sceneVideo: { src: birdAssets.petJourney.stereotypy, ariaLabel: "鸚鵡刻板行為情境影片" } },
    "bird-excessive-calling": { sceneVideo: { src: birdAssets.petJourney.excessiveCalling, ariaLabel: "鸚鵡過度鳴叫情境影片" } },
    "bird-senior-care": {},
  },
};
export const birdJourney = {
  items: birdJourneyItems,
  dailyBehaviorScenarioIds: birdDailyBehaviorScenarioIds,
  cageInspection: birdCageInspectionConfig,
  transitionMedia: {
    arrival: birdAssets.petJourney.arrivalTransition,
    timePass: birdAssets.petJourney.timePassesAging,
    busyCare: birdAssets.petJourney.busyDayTransition,
  },
  activity: "bird-cage-inspection" as const,
} as const;
