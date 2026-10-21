import type { MasteredCareTheme } from "../../shared/mastered-care-types";
import { preparationThemes } from "../../shared/mastered-care-builder";
export const geckoMasteredCareThemes: readonly MasteredCareTheme[] = [
  ...preparationThemes({
    home: "確認住家溫控條件、防逃設施與同住者共識，評估是否做好迎接守宮的準備。",
    room: "清除危險物品（細沙、殺蟲劑），備好爬蟲缸及三個躲避屋、加熱設備與安全底材。",
    trunk: "帶上運輸盒、餌料昆蟲、鈣粉，做好接回守宮的準備。",
  }),
  { id: "arrival-meal", title: "安頓與第一餐", summary: "了解適應期不打擾的重要性，以及第一餐應選用哪些食物（活昆蟲＋補鈣）。", category: "care-life", order: 40, sources: [{ kind: "scenario", scenarioIds: ["gecko-arrival-settle"] }, { kind: "arrival-meal" }] },
  { id: "behavior-response", title: "行為情境應對", summary: "遇到拒食、溫度異常與脫皮問題時，能先排查環境因素而非強迫干預。", category: "care-life", order: 50, sources: [{ kind: "scenario", scenarioIds: ["gecko-refuse-food", "gecko-temperature-check", "gecko-shedding"] }] },
  { id: "gecko-inspection", title: "每日健康巡視", summary: "建立每天觀察溫度、水碟、排泄、守宮體態（眼睛、尾巴、皮膚）的固定習慣。", category: "care-life", order: 60, sources: [{ kind: "life-state", key: "gecko-health-inspection-complete", requiredStepIds: ["temperature", "water", "feces", "eyes", "tail", "skin", "toes"] }] },
  { id: "life-changes", title: "生活變化應對", summary: "忙碌、生病、高齡時，知道如何調整安排並及時尋求熟悉爬蟲的獸醫協助。", category: "care-life", order: 70, sources: [{ kind: "scenario", scenarioIds: ["gecko-busy-care", "gecko-health-emergency", "gecko-senior-care"] }] },
];
