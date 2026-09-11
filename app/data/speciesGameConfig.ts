import type { HazardItem, RoomItem, TrunkItem } from "../game-types";
import { departureTrunkItems, hazards, roomItems } from "../game-data";
import { catHazards, catRoomItems, catTrunkItems as catDepartureTrunkItems } from "./species/cat/preparation";
import { dogReport } from "./species/dog/report";
import { catReport } from "./species/cat/report";

export type SpeciesId = "dog" | "cat";

export type SpeciesCopy = {
  animalName: string;
  animalNameFallback: string;
  typeLabel: string;
  selectionTitle: string;
  breedTitle: string;
  nameTitle: string;
  namePlaceholder: string;
  historyTitle: string;
  historyBody: string;
  hasPreviousLabel: string;
  noPreviousLabel: string;
  previousSectionTitle: string;
  roomTitle: string;
  roomBody: (petName: string) => string;
  departureTitle: string;
  departureBody: (petName: string) => string;
  lifeChallengeLabel: (selectedLabel: string) => string;
};

export type SpeciesReportConfig = {
  checklistGroups: Array<{ title: string; items: string[] }>;
  handlingRows: Array<[string, string]>;
  moneyDisclaimer: string;
  /** 供網頁回顧與正式照護指南共同使用；不要在元件內硬寫物種時間。 */
  dailyCareTime: string;
  dailyCareTimeNote: string;
  /** 網頁回顧與物種專屬完成頁共用的日常照護節奏。 */
  dailyCareBreakdown: Array<{ title: string; detail: string }>;
};

export type SpeciesGameConfig = {
  id: SpeciesId;
  copy: SpeciesCopy;
  roomItems: RoomItem[];
  hazards: HazardItem[];
  trunkItems: TrunkItem[];
  report: SpeciesReportConfig;
};

/** @deprecated 請改至 data/species/cat/preparation.ts 調整。 */
export const catTrunkItems = catDepartureTrunkItems;

export const speciesGameConfig: Record<SpeciesId, SpeciesGameConfig> = {
  dog: {
    id: "dog",
    copy: {
      animalName: "狗狗",
      animalNameFallback: "小狗",
      typeLabel: "品種",
      selectionTitle: "你想飼養哪一種動物？",
      breedTitle: "選擇你想飼養的品種",
      nameTitle: "先幫牠取一個名字",
      namePlaceholder: "請輸入小狗的名字",
      historyTitle: "你以前有養過狗嗎？",
      historyBody: "過去的經驗很珍貴，也可能讓我們自然沿用熟悉的照顧方式。先簡單告訴我們，你是否曾經和狗狗一起生活。",
      hasPreviousLabel: "有，曾經有養過狗",
      noPreviousLabel: "沒有，這是第一次",
      previousSectionTitle: "以前陪伴你的狗狗",
      roomTitle: "先替牠布置安全的生活空間",
      roomBody: (petName) => `${petName || "小狗"} 還沒到家，但牠的生活角落可以先準備起來。先把每天會用到的用品放進房間，再看看有哪些東西可能讓牠誤咬、誤食或受傷。`,
      departureTitle: "出發接牠回家",
      departureBody: (petName) => `今天要去接 ${petName || "小狗"} 回家了。出門前先把需要的文件與接回用品準備好，讓牠在路上有安全的位置，也讓你能從容處理突發狀況。`,
      lifeChallengeLabel: (selectedLabel) => `${selectedLabel}的考驗`,
    },
    roomItems,
    hazards,
    trunkItems: departureTrunkItems,
    report: dogReport,
  },
  cat: {
    id: "cat",
    copy: {
      animalName: "貓咪",
      animalNameFallback: "貓咪",
      typeLabel: "品種",
      selectionTitle: "你想飼養哪一種動物？",
      breedTitle: "選擇你想飼養的品種",
      nameTitle: "先幫牠取一個名字",
      namePlaceholder: "請輸入貓咪的名字",
      historyTitle: "你以前有養過貓嗎？",
      historyBody: "過去的陪伴經驗很珍貴，但每隻貓的適應速度、個性與生活需求仍可能不同。先簡單告訴我們，你是否曾經和貓咪一起生活。",
      hasPreviousLabel: "有，曾經有養過貓",
      noPreviousLabel: "沒有，這是第一次",
      previousSectionTitle: "以前陪伴你的貓咪",
      roomTitle: "先替牠布置安靜安全的生活空間",
      roomBody: (petName) => `${petName || "貓咪"} 還沒到家，但安全房可以先準備好。先確認門窗與紗窗穩固，放好砂盆、食水、躲藏處、休息空間、抓板與安全玩具，再確認哪些物品需要收起。`,
      departureTitle: "出發接牠回家",
      departureBody: (petName) => `今天要去接 ${petName || "貓咪"} 回家了。出門前先把需要的文件與接回用品準備好，讓牠在路上有安全的位置，也讓你能從容處理突發狀況。`,
      lifeChallengeLabel: (selectedLabel) => `${selectedLabel}的考驗`,
    },
    roomItems: catRoomItems,
    hazards: catHazards,
    trunkItems: catTrunkItems,
    report: catReport,
  },
};

export function getSpeciesGameConfig(species: string): SpeciesGameConfig {
  return species === "cat" ? speciesGameConfig.cat : speciesGameConfig.dog;
}

