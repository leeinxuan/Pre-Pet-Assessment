import type { MasteredCareTheme } from "../../shared/mastered-care-types";
export const geckoMasteredCareThemes: readonly MasteredCareTheme[] = [
  { id: "gecko-home", title: "安全環境", summary: "封閉逃脫縫隙、移除毒性物品並準備安全底材。", order: 1, sources: [{ kind: "room-preparation" }] },
  { id: "gecko-feeding", title: "飲食與補鈣", summary: "提供活體昆蟲、補鈣與乾淨飲水。", order: 2, sources: [{ kind: "arrival-meal" }] },
  { id: "gecko-inspection", title: "每日健康巡視", summary: "固定觀察溫度、飲水、排泄與身體外觀。", order: 3, sources: [{ kind: "life-state", key: "gecko-health-inspection-complete", requiredStepIds: ["temperature", "water", "feces", "eyes", "tail", "skin-toes"] }] },
  { id: "gecko-change", title: "生活變化", summary: "準備備援、及早就醫並規劃高齡照護。", order: 4, sources: [{ kind: "scenario", scenarioIds: ["gecko-busy-care", "gecko-health-emergency", "gecko-senior-care"] }] },
];
