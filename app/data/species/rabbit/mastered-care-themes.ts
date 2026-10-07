import type { MasteredCareTheme } from "../../shared/mastered-care-types";
import { preparationThemes } from "../../shared/mastered-care-builder";

export const rabbitMasteredCareThemes: readonly MasteredCareTheme[] = [
  ...preparationThemes({ home: "確認地板防滑、無有毒植物，評估適合飼兔的環境條件。", room: "先設置圍欄劃定活動區，再布置籠內床鋪、廁所與飲水設備。", trunk: "帶上固態底板外出籠與飼養文件，做好接兔的出發準備。" }),
  { id: "arrival-meal", title: "安頓與第一餐", summary: "了解兔子到家後習慣躲藏，以及第一餐應提供的食物種類。", order: 40, sources: [{ kind: "scenario", scenarioIds: ["rabbit-arrival-adjustment"] }, { kind: "arrival-meal" }] },
  { id: "behavior-response", title: "行為情境應對", summary: "了解如何建立信任、應對避暑需求、食糞行為與拒絕洗澡。", order: 50, sources: [{ kind: "scenario", scenarioIds: ["rabbit-carry-sort", "rabbit-heatstroke-prevention", "rabbit-cecotropes", "rabbit-bath"] }] },
  { id: "grooming", title: "美容與梳毛", summary: "知道兔子不需要水洗，以梳毛替代，並依毛長決定頻率。", order: 60, sources: [{ kind: "life-state", key: "rabbit-grooming-complete" }] },
  { id: "life-changes", title: "生活變化應對", summary: "忙碌、突發健康事件、高齡時，知道如何調整照護環境與安排。", order: 70, sources: [{ kind: "scenario", scenarioIds: ["rabbit-busy-care", "rabbit-health-emergency", "rabbit-senior-care"] }] },
];
