import type { SpeciesCopy } from "../../shared/species-config-types";

export const geckoCopy: SpeciesCopy = {
  animalName: "小型地棲性守宮",
  animalNameFallback: "小型地棲性守宮",
  typeLabel: "小型地棲性守宮",
  selectionTitle: "你想飼養哪一種動物？",
  breedTitle: "認識牠的生活習性",
  nameTitle: "替牠取個名字",
  namePlaceholder: "輸入守宮的名字",
  historyTitle: "你養過守宮嗎？",
  historyBody: "過去的飼養經驗很珍貴，但守宮需要穩定的溫度梯度與環境管理，每隻個體的適應狀況也可能不同。先簡單告訴我們，你是否曾經養過守宮。",
  hasPreviousLabel: "以前養過",
  noPreviousLabel: "第一次養守宮",
  previousSectionTitle: "過去的飼養經驗",
  roomTitle: "先替牠布置安全的生活空間",
  roomBody: (petName) => `在把 ${petName} 帶回家前，先檢查生活空間並準備好爬蟲缸。`,
  departureTitle: "出發接牠回家",
  departureBody: (petName) => `今天要去接${petName}回家了。出門前先把需要的文件與接回用品準備好，讓牠在路上有安全的位置，也讓你能從容處理突發狀況。`,
  lifeChallengeLabel: (selectedLabel) => `${selectedLabel} 的生活練習`,
};
