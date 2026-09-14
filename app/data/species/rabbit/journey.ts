import type { JourneyItem } from "../../../game-types";

export const rabbitJourneyItems: JourneyItem[] = [
  { id: "rabbit-arrival", type: "scenario", timeLabel: "接回家", title: "到家的第一天", scenarioId: "rabbit-arrival-adjustment", stageId: "arrival", stageLabel: "接回家" },
  { id: "rabbit-daily-care", type: "scenario", timeLabel: "日常照護", title: "兔兔日常照護", stageId: "daily", stageLabel: "日常照護" },
  { id: "breed-challenge", type: "breed-challenge", timeLabel: "兔子的考驗", title: "兔子的考驗", stageId: "breed", stageLabel: "兔子的考驗" },
  // 健康與高齡題都屬「生活變化」的延伸，側欄與進度僅維持既有四個共用分類。
  { id: "rabbit-busy-care", type: "scenario", timeLabel: "當生活發生變化", title: "臨時出差，{petName} 怎麼辦？", scenarioId: "rabbit-busy-care", stageId: "life-change", stageLabel: "生活變化" },
  { id: "rabbit-health", type: "scenario", timeLabel: "當生活發生變化", title: "糞便突然變少了", scenarioId: "rabbit-health-emergency", stageId: "life-change", stageLabel: "生活變化" },
  { id: "rabbit-senior", type: "scenario", timeLabel: "當生活發生變化", title: "{petName} 進入高齡期", scenarioId: "rabbit-senior-care", stageId: "life-change", stageLabel: "生活變化" },
];

/** 不含由高溫預防題自動接續的 rabbit-heatstroke-emergency。 */
export const rabbitDailyBehaviorScenarioIds = ["rabbit-stomp", "rabbit-heatstroke-prevention", "rabbit-shedding"] as const;

export const rabbitDailyCheckConfig = {
  steps: ["hay-rack", "water-bowl", "litter-box", "poop-observation"] as const,
  poopVariants: ["normal", "reduced", "cecotrope-uneaten"] as const,
} as const;

export const rabbitJourney = {
  items: rabbitJourneyItems,
  dailyBehaviorScenarioIds: rabbitDailyBehaviorScenarioIds,
  dailyCheck: rabbitDailyCheckConfig,
  activity: "rabbit-daily-check" as const,
} as const;
