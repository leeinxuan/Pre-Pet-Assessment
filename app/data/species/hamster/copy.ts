import type { SpeciesCopy } from "../../shared/species-config-types";

export const hamsterCopy: SpeciesCopy = {
  animalName: "倉鼠",
  animalNameFallback: "芝麻",
  typeLabel: "物種",
  selectionTitle: "你想飼養哪一種動物？",
  breedTitle: "認識你的新家人——倉鼠",
  nameTitle: "先幫牠取一個名字",
  namePlaceholder: "請輸入倉鼠的名字",
  historyTitle: "你之前養過倉鼠嗎？",
  historyBody: "過去的陪伴經驗很珍貴，但倉鼠體型小、多在夜間活動，身體不適時也不容易被察覺。先簡單告訴我們，你是否曾經和倉鼠一起生活。",
  hasPreviousLabel: "以前養過",
  noPreviousLabel: "第一次養倉鼠",
  previousSectionTitle: "以前陪伴你的倉鼠",
  roomTitle: "先替牠布置安全的生活空間",
  roomBody: (petName) => `在把${petName || "芝麻"}帶回家前，先檢查生活空間。請點擊場景中的危險物品，先將它們收好。`,
  departureTitle: "出發接牠回家",
  departureBody: (petName) => `今天要去接${petName || "芝麻"}回家了。出門前先把需要的接回用品準備好，讓牠在路上有安全的位置，也讓你能從容處理突發狀況。`,
  lifeChallengeLabel: () => "倉鼠的考驗",
};
