import type { MasteredCareTheme } from "../../shared/mastered-care-types";
import { preparationThemes } from "../../shared/mastered-care-builder";

export const rabbitMasteredCareThemes: readonly MasteredCareTheme[] = [
  ...preparationThemes({ home: "確認住家空間與同住者共識，評估是否做好迎接兔子的準備。", room: "清除危險物品，再布置籠內床鋪、廁所與飲水設備，讓{petName}安心紮根。", trunk: "帶上**通風外出籠、少量熟悉墊料**，做好接回{petName}的準備。" }),
  { id: "arrival-meal", title: "安頓與第一餐", summary: "了解到家後讓兔子靜待適應的安置流程，以及第一餐應以牧草為主、避免突然更換食物。", category: "care-life", order: 40, sources: [{ kind: "scenario", scenarioIds: ["rabbit-arrival-adjustment"] }, { kind: "arrival-meal" }] },
  { id: "behavior-response", title: "行為情境應對", summary: "遇到抱兔姿勢、高溫避暑、食糞行為誤解、洗澡禁忌，以理解物種需求的方式應對，而非強迫改變。", category: "care-life", order: 50, sources: [{ kind: "scenario", scenarioIds: ["rabbit-carry-sort", "rabbit-heatstroke-prevention", "rabbit-cecotropes", "rabbit-bath"] }] },
  { id: "grooming", title: "定期美容護理", summary: "了解正確梳毛步驟、換毛期照護重點，以及為何兔子不可水洗。", category: "care-life", order: 60, sources: [{ kind: "life-state", key: "rabbit-grooming-complete" }] },
  { id: "life-changes", title: "生活變化應對", summary: "忙碌、排便異常、高齡時，知道如何調整安排並及時尋求**熟悉兔子醫療的獸醫師**協助。", category: "care-life", order: 70, sources: [{ kind: "scenario", scenarioIds: ["rabbit-busy-care", "rabbit-health-emergency", "rabbit-senior-care"] }] },
];
