import type { MasteredCareTheme } from "../../shared/mastered-care-types";
import { preparationThemes } from "../../shared/mastered-care-builder";

export const catMasteredCareThemes: readonly MasteredCareTheme[] = [
  ...preparationThemes({ home: "確認住家空間、門窗安全與同住者共識，評估能否安心飼貓。", room: "清除危險物品，備好貓砂盆、躲藏處、抓板與攀爬空間。", trunk: "帶上外出籠、尿墊與飼養文件，做好接貓的出發準備。" }),
  { id: "arrival-meal", title: "安頓與第一餐", summary: "了解貓咪到家後需安靜適應，以及第一餐的食物選擇。", order: 40, sources: [{ kind: "scenario", scenarioIds: ["cat-arrival-adjustment"] }, { kind: "arrival-meal" }] },
  { id: "behavior-response", title: "行為情境應對", summary: "遇到夜間亢奮、抓家具與推落物品，了解正確的應對方式。", order: 50, sources: [{ kind: "scenario", scenarioIds: ["cat-night-energy-care", "cat-scratching-care", "cat-climbing-care"] }] },
  { id: "litter-management", title: "貓砂盆管理", summary: "知道貓砂盆的清潔頻率、砂量與位置設定，維持良好排泄環境。", order: 60, sources: [{ kind: "life-state", key: "cat-litter-complete" }] },
  { id: "life-changes", title: "生活變化應對", summary: "忙碌、生病、高齡時，知道如何安排代理照護並觀察健康變化。", order: 70, sources: [{ kind: "scenario", scenarioIds: ["cat-busy-care", "cat-illness-vet", "cat-growing-old"] }] },
];
