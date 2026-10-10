import type { JourneyItem, SpeciesScenarioPresentationConfig } from "../../../game-types";
import { geckoHealthInspection } from "./activities";

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
export const geckoScenarioPresentation: SpeciesScenarioPresentationConfig = { defaults: { defaultPetName: "小守", knowledgeTitle: "守宮小知識", correctFeedbackMedia: { type: "placeholder" } }, scenarios: {} };
export const geckoJourney = { items: geckoJourneyItems, dailyBehaviorScenarioIds: geckoDailyBehaviorScenarioIds, geckoHealthInspection } as const;
