import type { SpeciesCopy } from "../../shared/species-config-types";

export const geckoCopy: SpeciesCopy = {
  animalName: "小型地棲性守宮", animalNameFallback: "小型地棲性守宮", typeLabel: "小型地棲性守宮",
  selectionTitle: "選擇想認識的小型地棲性守宮", breedTitle: "認識牠的生活習性", nameTitle: "替牠取個名字", namePlaceholder: "輸入守宮的名字",
  historyTitle: "你的飼養經驗", historyBody: "每一段經驗都會幫助你更具體地準備新的陪伴。", hasPreviousLabel: "以前養過", noPreviousLabel: "第一次養守宮", previousSectionTitle: "過去的飼養經驗",
  roomTitle: "先替牠布置安全的生活空間", roomBody: (petName) => `在把 ${petName} 帶回家前，先檢查生活空間並準備好爬蟲缸。`,
  departureTitle: "出發接牠回家", departureBody: (petName) => `把 ${petName} 接回家前，確認文件與運輸用品都已準備好。`,
  lifeChallengeLabel: (selectedLabel) => `${selectedLabel} 的生活練習`,
};
