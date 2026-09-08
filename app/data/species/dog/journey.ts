import type { JourneyItem } from "../../../game-types";
export { walkingPreloadImages, walkingPrepItems, walkingSceneLayout, walkingScenes } from "./walking";

/** 犬隻旅程順序；WalkingActivity 是唯一專屬玩法元件。 */
export const dogJourneyItems: JourneyItem[] = [
  { id: "arrival", type: "scenario", timeLabel: "一起生活的第一天", title: "第一天適應新家", scenarioId: "arrival-adjustment" },
  { id: "behavior", type: "scenario", timeLabel: "日常行為照顧", title: "日常行為照顧" },
  { id: "walking", type: "walking", timeLabel: "日常照護", title: "今天也要出門散步" },
  { id: "breed-challenge", type: "breed-challenge", timeLabel: "品種的考驗", title: "品種的考驗" },
  { id: "busy-care", type: "scenario", timeLabel: "當生活發生變化", title: "疲憊忙碌的日子", scenarioId: "busy-daily-care" },
  { id: "sick", type: "scenario", timeLabel: "生病與就醫", title: "生病與就醫", scenarioId: "illness-vet" },
  { id: "senior", type: "scenario", timeLabel: "逐漸進入高齡", title: "小狗逐漸老去", scenarioId: "growing-old" },
];

/** 情境題本體仍由 life-data 逐題遷移；本檔已是旅程順序的唯一來源。 */
export const dogJourney = {
  items: dogJourneyItems,
  activity: "walking" as const,
} as const;
