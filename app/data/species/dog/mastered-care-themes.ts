import type { MasteredCareTheme } from "../../shared/mastered-care-types";
import { preparationThemes } from "../../shared/mastered-care-builder";

export const dogMasteredCareThemes: readonly MasteredCareTheme[] = [
  ...preparationThemes({ home: "確認住家空間與同住者共識，評估是否做好迎接狗狗的準備。", room: "清除危險物品，備好狗床、如廁區與活動範圍，讓牠安心紮根。", trunk: "帶上牽繩、運輸籠與飼養文件，做好接狗的出發準備。" }),
  { id: "arrival-meal", title: "安頓與第一餐", summary: "了解到家後的安置流程，以及第一餐應選用哪些食物。", order: 40, sources: [{ kind: "scenario", scenarioIds: ["arrival-adjustment"] }, { kind: "arrival-meal" }] },
  { id: "behavior-response", title: "行為情境應對", summary: "遇到吠叫、啃咬與如廁問題，以正向方式引導而非懲罰。", order: 50, sources: [{ kind: "scenario", scenarioIds: ["behavior-barking", "behavior-chewing", "behavior-toileting"] }] },
  { id: "walking", title: "每日散步需求", summary: "知道狗狗每天必須外出散步如廁，不因天氣或忙碌而省略。", order: 60, sources: [{ kind: "life-state", key: "walkingComplete" }] },
  { id: "life-changes", title: "生活變化應對", summary: "忙碌、生病、高齡時，知道如何調整安排並及時尋求協助。", order: 70, sources: [{ kind: "scenario", scenarioIds: ["busy-daily-care", "illness-vet", "growing-old"] }] },
];
