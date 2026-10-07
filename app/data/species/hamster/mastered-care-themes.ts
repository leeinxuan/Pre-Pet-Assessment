import type { MasteredCareTheme } from "../../shared/mastered-care-types";
import { preparationThemes } from "../../shared/mastered-care-builder";

export const hamsterMasteredCareThemes: readonly MasteredCareTheme[] = [
  ...preparationThemes({ home: "確認住家空間與同住者共識，評估是否做好迎接倉鼠的準備。", room: "清除危險物品，備好**籠具、砂浴盆、滾輪、飲水器、磨牙棒**，讓{petName}安心紮根。", trunk: "帶上**防逃運輸容器、少量墊料、領養文件**，做好接回{petName}的準備。" }),
  { id: "arrival-meal", title: "安頓與第一餐", summary: "了解到家後讓倉鼠自行適應的安置流程，以及第一餐應選用哪些食物、避免哪些禁忌。", order: 40, sources: [{ kind: "scenario", scenarioIds: ["hamster-arrival-adjustment"] }, { kind: "arrival-meal" }] },
  { id: "behavior-response", title: "行為情境應對", summary: "遇到獨居性合籠迷思、夜行性作息誤解、囤食挑食問題，以理解物種需求的方式應對，而非強迫改變。", order: 50, sources: [{ kind: "scenario", scenarioIds: ["hamster-nocturnal", "hamster-picky-eating", "hamster-solitary"] }] },
  { id: "inspection", title: "每日早晨籠具巡視", summary: "每天早晨清理固定廁所角落、篩除砂浴盆結塊，維持{petName}的舒適衛生，也觀察牠的使用習慣。", order: 60, sources: [{ kind: "life-state", key: "hamster-inspection-complete" }] },
  { id: "life-changes", title: "生活變化應對", summary: "忙碌、生病、高齡時，知道如何調整安排並及時尋求協助，不讓{petName}在關鍵時刻等待。", order: 70, sources: [{ kind: "scenario", scenarioIds: ["hamster-busy-care", "hamster-health-emergency", "hamster-senior-care"] }] },
];
