import type { MasteredCareTheme } from "../../shared/mastered-care-types";
import { preparationThemes } from "../../shared/mastered-care-builder";
export const geckoMasteredCareThemes: readonly MasteredCareTheme[] = [
  ...preparationThemes({
    home: "確認住家溫控條件、防逃設施與同住者共識，評估是否做好迎接守宮的準備。",
    room: "清除危險物品（細沙、殺蟲劑），備好爬蟲缸及三個躲避屋、加熱設備與安全底材。",
    trunk: "帶上運輸盒、餌料昆蟲、鈣粉，做好接回守宮的準備。",
  }),
  { id: "gecko-feeding", title: "飲食與補鈣", summary: "提供活體昆蟲、補鈣與乾淨飲水。", category: "care-life", order: 40, sources: [{ kind: "arrival-meal" }] },
  { id: "gecko-inspection", title: "每日健康巡視", summary: "固定觀察溫度、飲水、排泄與身體外觀。", category: "care-life", order: 50, sources: [{ kind: "life-state", key: "gecko-health-inspection-complete", requiredStepIds: ["temperature", "water", "feces", "eyes", "tail", "skin", "toes"] }] },
  { id: "gecko-change", title: "生活變化", summary: "準備備援、及早就醫並規劃高齡照護。", category: "care-life", order: 60, sources: [{ kind: "scenario", scenarioIds: ["gecko-busy-care", "gecko-health-emergency", "gecko-senior-care"] }] },
];
