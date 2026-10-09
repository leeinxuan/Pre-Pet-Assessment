import type { ActivityIntroConfig, JourneyItem, SpeciesScenarioPresentationConfig } from "../../../game-types";
import { birdAssets } from "./assets";

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
  defaults: { defaultPetName: "鸚鵡", knowledgeTitle: "鳥類小知識", correctFeedbackMedia: { type: "placeholder" } },
  scenarios: {
    "bird-picky-eating": {},
    "bird-stereotypy": {},
    "bird-excessive-calling": {},
    "bird-senior-care": {},
  },
};
export const birdCageInspectionConfig = {
  intro: {
    eyebrow: "日常照護",
    title: "{petName} 看起來沒事，不代表牠真的沒事",
    paragraphs: [
      "鳥類演化出了強大的**隱藏病徵能力**——就算生病，也會盡力維持正常外表。等到 {petName} 明顯**嗜睡**或**澎毛**，往往代表病情**已相當嚴重**。",
      "**每天主動觀察**是最好的預防方式。**糞便的狀態**、**羽毛的光澤**、**眼睛是否清亮**——這些細節只有每天看著牠的你才能發現異常。",
      "今天的巡視，就是你和 {petName} 之間的默契。",
    ],
    startLabel: "開始今日巡視 →",
    visualAssets: {
      character: birdAssets.dailyGame.birdCloseup,
      tool: birdAssets.dailyGame.magnifier,
      collector: birdAssets.dailyGame.beddingDirty,
    },
  } satisfies ActivityIntroConfig,
  targetStamps: 4,
  steps: ["tray-clean", "feces-observed", "health-observed", "social-time"] as const,
} as const;
export const birdJourney = { items: birdJourneyItems, dailyBehaviorScenarioIds: birdDailyBehaviorScenarioIds, cageInspection: birdCageInspectionConfig, activity: "bird-cage-inspection" as const } as const;
