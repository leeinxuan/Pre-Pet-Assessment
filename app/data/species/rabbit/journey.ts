import type { JourneyItem, SpeciesScenarioPresentationConfig } from "../../../game-types";
import { rabbitAssets } from "./assets";
import { rabbitDailyCheckConfig } from "./activities";

export const rabbitJourneyItems: JourneyItem[] = [
  { id: "rabbit-arrival", type: "scenario", timeLabel: "接回家", title: "第一天適應新家", scenarioId: "rabbit-arrival-adjustment", stageId: "arrival", stageLabel: "接回家" },
  { id: "rabbit-first-meal", type: "arrival-meal", timeLabel: "接回家", title: "第一餐", stageId: "arrival", stageLabel: "接回家" },
  { id: "rabbit-carry-sort", type: "rabbit-carry-sort", timeLabel: "日常照護", title: "和 {petName} 成為好朋友吧！", stageId: "daily", stageLabel: "日常照護" },
  { id: "rabbit-daily-care", type: "scenario", timeLabel: "日常照護", title: "兔兔日常照護", stageId: "daily", stageLabel: "日常照護" },
  { id: "rabbit-daily-check", type: "rabbit-daily-check", timeLabel: "日常照護", title: "{petName} 的美容時間到了！", stageId: "daily", stageLabel: "日常照護" },
  { id: "breed-challenge", type: "breed-challenge", timeLabel: "兔子的考驗", title: "兔子的考驗", stageId: "breed", stageLabel: "兔子的考驗" },
  // 健康與高齡題都屬「生活變化」的延伸，側欄與進度僅維持既有四個共用分類。
  { id: "rabbit-busy-care", type: "scenario", timeLabel: "當生活發生變化", title: "臨時晚歸，{petName} 的照顧怎麼辦？", scenarioId: "rabbit-busy-care", stageId: "life-change", stageLabel: "生活變化" },
  { id: "rabbit-health", type: "scenario", timeLabel: "當生活發生變化", title: "糞便突然變少了", scenarioId: "rabbit-health-emergency", stageId: "life-change", stageLabel: "生活變化" },
  { id: "rabbit-senior", type: "scenario", timeLabel: "當生活發生變化", title: "{petName} 進入高齡期", scenarioId: "rabbit-senior-care", stageId: "life-change", stageLabel: "生活變化" },
];

export const rabbitDailyBehaviorScenarioIds = ["rabbit-heatstroke-prevention", "rabbit-cecotropes", "rabbit-bath"] as const;

export const rabbitScenarioPresentation: SpeciesScenarioPresentationConfig = {
  defaults: {
    defaultPetName: "兔子",
    knowledgeTitle: "兔子小知識",
    correctFeedbackMedia: { type: "placeholder" },
    correctFeedbackMediaVariants: [
      { type: "video", src: rabbitAssets.petJourney.correctPrimary, ariaLabel: "兔子答對回饋影片" },
      { type: "video", src: rabbitAssets.petJourney.correctSecondary, ariaLabel: "兔子答對回饋影片" },
    ],
  },
  scenarios: {
    "rabbit-heatstroke-prevention": { completionIntro: "你已經把降溫安排放進日常環境。維持涼爽室內與提供陶板涼感墊，能讓{petName}自己選擇舒服的位置。" },
    "rabbit-cecotropes": {},
  },
};

export const rabbitJourney = {
  items: rabbitJourneyItems,
  dailyBehaviorScenarioIds: rabbitDailyBehaviorScenarioIds,
  dailyCheck: rabbitDailyCheckConfig,
  transitionMedia: {
    arrival: rabbitAssets.petJourney.arrivalTransition,
    arrivalMobile: rabbitAssets.petJourney.arrivalTransitionMobile,
    timePass: rabbitAssets.petJourney.timePassesAging,
    timePassMobile: rabbitAssets.petJourney.timePassesAgingMobile,
    busyCare: rabbitAssets.petJourney.busyDayTransition,
    busyCareMobile: rabbitAssets.petJourney.busyDayTransitionMobile,
  },
  activity: "rabbit-daily-check" as const,
} as const;
