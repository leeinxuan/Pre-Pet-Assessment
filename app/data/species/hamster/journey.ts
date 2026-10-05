import type { JourneyItem } from "../../../game-types";

export const hamsterJourneyItems: JourneyItem[] = [
  { id: "hamster-arrival", type: "scenario", timeLabel: "接回家", title: "第一天適應新家", scenarioId: "hamster-arrival-adjustment", stageId: "arrival", stageLabel: "接回家" },
  { id: "hamster-first-meal", type: "arrival-meal", timeLabel: "接回家", title: "{petName} 的第一餐，你準備了什麼？", stageId: "arrival", stageLabel: "接回家" },
  { id: "hamster-daily-care", type: "scenario", timeLabel: "日常照護", title: "倉鼠日常照護", stageId: "daily", stageLabel: "日常照護" },
  { id: "hamster-solitary", type: "scenario", timeLabel: "日常照護", title: "{petName} 需要一個同伴嗎？", scenarioId: "hamster-solitary", stageId: "daily", stageLabel: "日常照護" },
  { id: "hamster-cage-check", type: "guided-inspection", timeLabel: "日常照護", title: "{petName} 的早晨巡視", stageId: "daily", stageLabel: "日常照護" },
  // §5.4 只有標題、沒有題目或答案，不建立不可完成的「倉鼠的考驗」節點。
  { id: "hamster-busy-care", type: "scenario", timeLabel: "當生活發生變化", title: "臨時晚歸，{petName} 的照顧怎麼辦？", scenarioId: "hamster-busy-care", stageId: "life-change", stageLabel: "生活變化" },
  { id: "hamster-health", type: "scenario", timeLabel: "當生活發生變化", title: "{petName} 活動力明顯下降", scenarioId: "hamster-health-emergency", stageId: "life-change", stageLabel: "生活變化" },
  { id: "hamster-senior", type: "scenario", timeLabel: "當生活發生變化", title: "{petName} 進入高齡期了", scenarioId: "hamster-senior-care", stageId: "life-change", stageLabel: "生活變化" },
];

export const hamsterDailyBehaviorScenarioIds = ["hamster-nocturnal", "hamster-picky-eating"] as const;
export const hamsterJourney = { items: hamsterJourneyItems, dailyBehaviorScenarioIds: hamsterDailyBehaviorScenarioIds } as const;
