import type { JourneyItem, SpeciesScenarioPresentationConfig } from "../../../game-types";
import { arrivalRequiredExpenseIdsBySpecies } from "../../shared/expenses";
import { scenarioMedia } from "../../shared/scenario-media";
export { walkingPreloadImages, walkingPrepItems, walkingSceneLayout, walkingScenes } from "./walking";

/** 犬隻旅程順序；WalkingActivity 是唯一專屬玩法元件。 */
export const dogJourneyItems: JourneyItem[] = [
  { id: "arrival", type: "scenario", timeLabel: "一起生活的第一天", title: "第一天適應新家", scenarioId: "arrival-adjustment", stageId: "arrival", stageLabel: "接回家", expenseIds: [...arrivalRequiredExpenseIdsBySpecies.dog] },
  { id: "behavior", type: "scenario", timeLabel: "日常行為照顧", title: "日常行為照顧", stageId: "daily", stageLabel: "日常照護" },
  { id: "walking", type: "walking", timeLabel: "日常照護", title: "今天也要出門散步", stageId: "daily", stageLabel: "日常照護" },
  { id: "breed-challenge", type: "breed-challenge", timeLabel: "品種的考驗", title: "品種的考驗", stageId: "breed", stageLabel: "品種的考驗" },
  { id: "busy-care", type: "scenario", timeLabel: "當生活發生變化", title: "疲憊忙碌的日子", scenarioId: "busy-daily-care", stageId: "life-change", stageLabel: "生活變化" },
  { id: "sick", type: "scenario", timeLabel: "生病與就醫", title: "生病與就醫", scenarioId: "illness-vet", stageId: "life-change", stageLabel: "生活變化" },
  { id: "senior", type: "scenario", timeLabel: "逐漸進入高齡", title: "小狗逐漸老去", scenarioId: "growing-old", stageId: "life-change", stageLabel: "生活變化" },
];

/** 情境題本體仍由 life-data 逐題遷移；本檔已是旅程順序的唯一來源。 */
export const dogJourney = {
  items: dogJourneyItems,
  activity: "walking" as const,
} as const;

export const dogDailyBehaviorScenarioIds = ["behavior-barking", "behavior-chewing", "behavior-toileting"] as const;

export const dogScenarioPresentation: SpeciesScenarioPresentationConfig = {
  defaults: { defaultPetName: "小狗", knowledgeTitle: "狗狗小知識", correctFeedbackMedia: { type: "video", src: scenarioMedia.correctPrimary } },
  scenarios: {
    "behavior-barking": { sceneVideo: { src: scenarioMedia.dog.barking, ariaLabel: "日常行為照顧影片" }, completionIntro: "你已經找到合適的做法。接著多認識一點{petName}吠叫時可能想傳達的需求。" },
    "behavior-chewing": { sceneVideo: { src: scenarioMedia.dog.chewing, ariaLabel: "日常行為照顧影片" }, correctFeedbackMedia: { type: "video", src: scenarioMedia.correctSecondary }, completionIntro: "你已經找到合適的做法。接著看看狗狗為什麼需要啃咬，以及如何安全地引導{petName}。" },
    "behavior-toileting": { sceneVideo: { src: scenarioMedia.dog.toileting, ariaLabel: "日常行為照顧影片" }, completionIntro: "你已經找到合適的做法。如廁不只是記住一個地點，還和{petName}的年齡、時機與健康狀況有關。" },
  },
};
