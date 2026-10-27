import type { JourneyItem, SpeciesScenarioPresentationConfig } from "../../../game-types";
import { arrivalRequiredExpenseIdsBySpecies } from "../../shared/expenses";
import { catAssets } from "./assets";
import { catLitterRescueConfig } from "./activities";

/** @deprecated 請改由 `cat/activities.ts` 匯入。 */
export { catLitterRescueConfig } from "./activities";

/** 貓咪旅程順序；LitterInspectionActivity 是唯一專屬玩法元件。 */
export const catJourneyItems: JourneyItem[] = [
  { id: "cat-arrival", type: "scenario", timeLabel: "一起生活的第一天", title: "第一天適應新家", scenarioId: "cat-arrival-adjustment", stageId: "arrival", stageLabel: "接回家", expenseIds: [...arrivalRequiredExpenseIdsBySpecies.cat] },
  { id: "cat-daily-care", type: "scenario", timeLabel: "日常照護", title: "貓咪日常照護", stageId: "daily", stageLabel: "日常照護" },
  { id: "cat-daily-inspection", type: "daily-inspection", timeLabel: "日常照護", title: "貓砂盆救援隊", stageId: "daily", stageLabel: "日常照護" },
  { id: "breed-challenge", type: "breed-challenge", timeLabel: "品種的考驗", title: "品種的考驗", stageId: "breed", stageLabel: "品種的考驗" },
  { id: "cat-busy-care", type: "scenario", timeLabel: "當生活發生變化", title: "臨時晚歸，誰來接手？", scenarioId: "cat-busy-care", stageId: "life-change", stageLabel: "生活變化" },
  { id: "cat-sick", type: "scenario", timeLabel: "生病與就醫", title: "生病與就醫", scenarioId: "cat-illness-vet", stageId: "life-change", stageLabel: "生活變化" },
  { id: "cat-senior", type: "scenario", timeLabel: "逐漸進入高齡", title: "貓咪慢慢變老", scenarioId: "cat-growing-old", stageId: "life-change", stageLabel: "生活變化" },
];

/** 貓咪日常照護三題的固定識別碼；重做時選項與答題紀錄保持一致。 */
export const catDailyBehaviorScenarioIds = ["cat-night-energy-care", "cat-scratching-care", "cat-climbing-care"] as const;

/** 旅程順序唯一來源；活動內容與素材維護於 activities.ts。 */
export const catJourney = {
  items: catJourneyItems,
  dailyBehaviorScenarioIds: catDailyBehaviorScenarioIds,
  litterInspection: catLitterRescueConfig,
  transitionMedia: {
    arrival: catAssets.petJourney.arrivalTransition,
    arrivalMobile: catAssets.petJourney.arrivalTransitionMobile,
    timePass: catAssets.petJourney.timePassesAging,
    timePassMobile: catAssets.petJourney.timePassesAgingMobile,
    busyCare: catAssets.petJourney.busyDayTransition,
    busyCareMobile: catAssets.petJourney.busyDayTransitionMobile,
  },
  activity: "litter-inspection" as const,
} as const;

export const catScenarioPresentation: SpeciesScenarioPresentationConfig = {
  defaults: {
    defaultPetName: "貓咪",
    knowledgeTitle: "貓咪小知識",
    preserveGenericAnimalTerms: true,
    correctFeedbackMedia: { type: "video", src: catAssets.petJourney.correctPrimary, ariaLabel: "貓咪答對回饋影片" },
    correctFeedbackMediaVariants: [
      { type: "video", src: catAssets.petJourney.correctPrimary, ariaLabel: "貓咪答對回饋影片" },
      { type: "video", src: catAssets.petJourney.correctSecondary, ariaLabel: "貓咪答對回饋影片" },
    ],
  },
  scenarios: {
    "cat-night-energy-care": { sceneVideo: { src: catAssets.petJourney.nightEnergy, ariaLabel: "貓咪夜間活動情境影片" }, completionIntro: "你已經找到合適的做法。規律遊戲與安全玩具，能讓{petName}的精力有合適出口。" },
    "cat-scratching-care": { sceneVideo: { src: catAssets.petJourney.scratching, ariaLabel: "貓咪抓磨情境影片" }, completionIntro: "你已經找到合適的做法。提供抓板與安全高處，能讓{petName}用自然方式活動。" },
    "cat-climbing-care": { sceneVideo: { src: catAssets.petJourney.climbing, ariaLabel: "貓咪攀爬情境影片" }, completionIntro: "你已經找到合適的做法。提供安全的垂直活動空間、收好易碎物，並確認門窗與紗窗穩固，能讓{petName}安心探索。" },
  },
};
