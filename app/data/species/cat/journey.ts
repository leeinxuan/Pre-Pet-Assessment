import type { JourneyItem } from "../../../game-types";

/** 貓咪旅程順序；LitterInspectionActivity 是唯一專屬玩法元件。 */
export const catJourneyItems: JourneyItem[] = [
  { id: "cat-arrival", type: "scenario", timeLabel: "一起生活的第一天", title: "第一天適應新家", scenarioId: "cat-arrival-adjustment", stageId: "arrival", stageLabel: "接回家" },
  { id: "cat-daily-care", type: "scenario", timeLabel: "日常照護", title: "貓咪日常照護", stageId: "daily", stageLabel: "日常照護" },
  { id: "cat-daily-inspection", type: "daily-inspection", timeLabel: "日常照護", title: "貓砂盆救援隊", stageId: "daily", stageLabel: "日常照護" },
  { id: "breed-challenge", type: "breed-challenge", timeLabel: "品種的考驗", title: "品種的考驗", stageId: "breed", stageLabel: "品種的考驗" },
  { id: "cat-busy-care", type: "scenario", timeLabel: "當生活發生變化", title: "臨時晚歸，誰來接手？", scenarioId: "cat-busy-care", stageId: "life-change", stageLabel: "生活變化" },
  { id: "cat-sick", type: "scenario", timeLabel: "生病與就醫", title: "生病與就醫", scenarioId: "cat-illness-vet", stageId: "life-change", stageLabel: "生活變化" },
  { id: "cat-senior", type: "scenario", timeLabel: "逐漸進入高齡", title: "貓咪慢慢變老", scenarioId: "cat-growing-old", stageId: "life-change", stageLabel: "生活變化" },
];

/** 貓咪日常照護三題的固定識別碼；重做時選項與答題紀錄保持一致。 */
export const catDailyBehaviorScenarioIds = ["cat-night-energy-care", "cat-scratching-care", "cat-indoor-outdoor-care"] as const;

/**
 * 貓咪專屬玩法：貓砂盆救援隊。
 * 每日清潔互動的命中區全部集中於此，不與犬隻散步資料共用。
 */
export const catLitterRescueConfig = {
  // 相容舊版儲存紀錄；現行 CatDailyInspectionActivity 不再使用印章／輪次流程。
  targetStamps: 3,
  enableWeeklyWash: false,
  enableAbnormalObservation: false,
  weeklyWashRound: 2,
  abnormalObservationRound: 3,
  wasteItems: [
    { id: "urine", label: "尿團", x: 42, y: 62, size: 13 },
    { id: "poop", label: "糞便", x: 59, y: 67, size: 12 },
  ],
  bin: { x: 82, y: 70, size: 16 },
} as const;

/** 情境題與貓砂盆設定本體仍由 life-data 逐題遷移；本檔已是旅程順序唯一來源。 */
export const catJourney = {
  items: catJourneyItems,
  dailyBehaviorScenarioIds: catDailyBehaviorScenarioIds,
  litterInspection: catLitterRescueConfig,
  activity: "litter-inspection" as const,
} as const;
