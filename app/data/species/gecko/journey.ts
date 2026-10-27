import type { JourneyItem, SpeciesScenarioPresentationConfig } from "../../../game-types";
import { geckoHealthInspection } from "./activities";
import { geckoAssets } from "./assets";

export const geckoJourneyItems: JourneyItem[] = [
  { id: "gecko-arrival", type: "scenario", timeLabel: "接回家", title: "第一天適應新家", scenarioId: "gecko-arrival-settle", stageId: "arrival", stageLabel: "接回家" },
  { id: "gecko-first-meal", type: "arrival-meal", timeLabel: "接回家", title: "{petName} 的第一餐", stageId: "arrival", stageLabel: "接回家" },
  { id: "gecko-daily-care", type: "scenario", timeLabel: "日常照護", title: "日常照護情境", stageId: "daily", stageLabel: "日常照護" },
  { id: "gecko-health-inspection", type: "guided-inspection", timeLabel: "日常照護", title: "{petName} 的每日健康巡視", stageId: "daily", stageLabel: "日常照護" },
  { id: "gecko-busy-care", type: "scenario", timeLabel: "當生活發生變化", title: "臨時晚歸，{petName} 的照顧怎麼辦？", scenarioId: "gecko-busy-care", stageId: "life-change", stageLabel: "生活變化" },
  { id: "gecko-sick", type: "scenario", timeLabel: "當生活發生變化", title: "牠看起來和平常不太一樣", scenarioId: "gecko-health-emergency", stageId: "life-change", stageLabel: "生活變化" },
  { id: "gecko-senior", type: "senior-room", timeLabel: "當生活發生變化", title: "{petName} 進入高齡期了", scenarioId: "gecko-senior-care", stageId: "life-change", stageLabel: "生活變化" },
];
export const geckoDailyBehaviorScenarioIds = ["gecko-refuse-food", "gecko-temperature-check", "gecko-shedding"] as const;
export const geckoScenarioPresentation: SpeciesScenarioPresentationConfig = {
  defaults: {
    defaultPetName: "小守",
    knowledgeTitle: "守宮小知識",
    correctFeedbackMedia: { type: "video", src: geckoAssets.petJourney.correctPrimary, ariaLabel: "守宮答對回饋影片" },
    correctFeedbackMediaVariants: [
      { type: "video", src: geckoAssets.petJourney.correctPrimary, ariaLabel: "守宮答對回饋影片" },
      { type: "video", src: geckoAssets.petJourney.correctSecondary, ariaLabel: "守宮答對回饋影片" },
    ],
  },
  scenarios: {
    "gecko-refuse-food": { sceneVideo: { src: geckoAssets.petJourney.refuseFood, ariaLabel: "守宮拒食情境影片" } },
    "gecko-temperature-check": { sceneVideo: { src: geckoAssets.petJourney.temperatureCheck, ariaLabel: "守宮低溫情境影片" } },
    "gecko-shedding": { sceneVideo: { src: geckoAssets.petJourney.sheddingStuck, ariaLabel: "守宮脫皮殘留情境影片" } },
  },
};
export const geckoJourney = {
  items: geckoJourneyItems,
  dailyBehaviorScenarioIds: geckoDailyBehaviorScenarioIds,
  geckoHealthInspection,
  transitionMedia: {
    arrival: geckoAssets.petJourney.arrivalTransition,
    arrivalMobile: geckoAssets.petJourney.arrivalTransitionMobile,
    timePass: geckoAssets.petJourney.timePassesAging,
    timePassMobile: geckoAssets.petJourney.timePassesAgingMobile,
    busyCare: geckoAssets.petJourney.busyDayTransition,
    busyCareMobile: geckoAssets.petJourney.busyDayTransitionMobile,
  },
} as const;
