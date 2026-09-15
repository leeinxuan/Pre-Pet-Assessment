import type { JourneyItem } from "../../../game-types";

export const birdJourneyItems: JourneyItem[] = [
  { id: "bird-arrival", type: "scenario", timeLabel: "一起生活的第一天", title: "第一天安置新家", scenarioId: "bird-arrival-adjustment", stageId: "arrival", stageLabel: "接回家" },
  { id: "bird-first-meal", type: "arrival-meal", timeLabel: "一起生活的第一天", title: "第一餐", stageId: "arrival", stageLabel: "接回家" },
  { id: "bird-daily-care", type: "scenario", timeLabel: "日常照護", title: "鳥的日常照護", stageId: "daily", stageLabel: "日常照護" },
  { id: "bird-daily-inspection", type: "bird-cage-inspection", timeLabel: "日常照護", title: "鳥籠日常巡視", stageId: "daily", stageLabel: "日常照護" },
  { id: "bird-challenge", type: "bird-challenge", timeLabel: "鳥的考驗", title: "鳥的考驗", stageId: "breed", stageLabel: "鳥的考驗" },
  { id: "bird-busy-care", type: "scenario", timeLabel: "當生活發生變化", title: "臨時忙碌，誰來照顧？", scenarioId: "bird-busy-care", stageId: "life-change", stageLabel: "生活變化" },
  { id: "bird-sick", type: "scenario", timeLabel: "健康狀況變化", title: "{petName} 看起來還好——但你真的確定嗎？", scenarioId: "bird-health-emergency", stageId: "life-change", stageLabel: "生活變化" },
  { id: "bird-senior", type: "scenario", timeLabel: "逐漸進入高齡", title: "鳥兒慢慢變老", scenarioId: "bird-senior-care", stageId: "life-change", stageLabel: "生活變化" },
];
export const birdDailyBehaviorScenarioIds = ["bird-puffing-feathers", "bird-molting-care"] as const;
export const birdCageInspectionConfig = { targetStamps: 4, steps: ["tray-clean", "feces-observed", "health-observed", "social-time"] as const } as const;
export const birdJourney = { items: birdJourneyItems, dailyBehaviorScenarioIds: birdDailyBehaviorScenarioIds, cageInspection: birdCageInspectionConfig, activity: "bird-cage-inspection" as const } as const;
