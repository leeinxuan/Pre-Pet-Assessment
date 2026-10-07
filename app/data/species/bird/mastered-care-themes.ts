import type { MasteredCareTheme } from "../../shared/mastered-care-types";
import { preparationThemes } from "../../shared/mastered-care-builder";

export const birdMasteredCareThemes: readonly MasteredCareTheme[] = [
  ...preparationThemes({ home: "確認住家無鐵氟龍、薰香等鳥類毒素，評估適合飼鳥的環境條件。", room: "選用合適的方形金屬籠，備好棲木、飲水器與安全玩具。", trunk: "帶上外出籠、透氣墊材與飼養文件，準備好接鳥的出發物品。" }),
  { id: "arrival-meal", title: "安頓與第一餐", summary: "了解鳥類到家後需安靜適應，以及符合食性的第一餐食物。", order: 40, sources: [{ kind: "scenario", scenarioIds: ["bird-arrival-adjustment"] }, { kind: "arrival-meal" }] },
  { id: "behavior-response", title: "行為情境應對", summary: "遇到挑食、刻板行為或持續鳴叫，了解背後原因與應對方式。", order: 50, sources: [{ kind: "scenario", scenarioIds: ["bird-picky-eating", "bird-stereotypy", "bird-excessive-calling"] }] },
  { id: "cage-inspection", title: "鳥籠日常巡視", summary: "知道每天檢查棲木、玩具與糞便托盤的重要性與具體做法。", order: 60, sources: [{ kind: "life-state", key: "bird-cage-inspection-complete", requiredStepIds: ["tray-clean", "feces-observed", "health-observed", "social-time"] }] },
  { id: "life-changes", title: "生活變化應對", summary: "忙碌、突發健康事件、高齡時，知道如何調整照護安排。", order: 70, sources: [{ kind: "scenario", scenarioIds: ["bird-busy-care", "bird-health-emergency", "bird-senior-care"] }] },
];
