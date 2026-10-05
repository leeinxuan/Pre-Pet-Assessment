import type { HazardItem, RoomItem, TrunkItem } from "../game-types";
import { departureTrunkItems, hazards, roomItems } from "../game-data";
import { catHazards, catRoomItems, catTrunkItems as catDepartureTrunkItems } from "./species/cat/preparation";
import { dogReport } from "./species/dog/report";
import { catReport } from "./species/cat/report";
import { rabbitPreparation } from "./species/rabbit/preparation";
import { rabbitReport } from "./species/rabbit/report";
import { birdPreparation } from "./species/bird/preparation";
import { birdReport } from "./species/bird/report";
import { hamsterPreparation } from "./species/hamster/preparation";
import { hamsterReport } from "./species/hamster/report";

export type SpeciesId = "dog" | "cat" | "rabbit" | "bird" | "hamster";

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
  /** 供網頁回顧與正式照護指南共同使用；不要在元件內硬寫物種時間。 */
  dailyCareTime: string;
  dailyCareTimeNote: string;
  /** 網頁回顧與物種專屬完成頁共用的日常照護節奏。 */
  dailyCareBreakdown: Array<{ title: string; detail: string }>;
};

/** 互動遊戲完成頁的內容資料；版型由共用完成頁元件統一處理。 */
export type InteractionCompletionContent = {
  title: string;
  subtitle: string;
  description: string;
  reflectionTitle: string;
  reflectionContent: string[];
  careTimeTitle: string;
  careTimeItems: Array<{ title: string; detail: string }>;
  /** 互動完成頁可在每日照護卡後補充資料驅動的保養頻率。 */
  careTimeSupplement?: {
    title: string;
    items: Array<{ title: string; detail: string; description: string }>;
  };
  continueLabel: string;
};

export type SpeciesGameConfig = {
  id: SpeciesId;
  copy: SpeciesCopy;
  roomItems: RoomItem[];
  hazards: HazardItem[];
  trunkItems: TrunkItem[];
  report: SpeciesReportConfig;
  /** 特定物種的房間階段與背景切換；共用元件只依設定執行。 */
  roomFlow?: {
    initialBackground: string;
    safeBackground: string;
    interiorBackground: string;
    interiorSafeBackground: string;
    /** 籠內背景的容器比例；match-room 會沿用完整房間容器。 */
    interiorBackgroundAspectRatio?: "match-room" | string;
    floorHazardId: string;
    safeWhenAllHazards?: boolean;
    fenceItemId: string;
    interiorItemId: string;
    /** 在房間全景可放置的項目；未設定時沿用既有只顯示入口用品的流程。 */
    outsideItemIds?: string[];
    /** 點進內部視角前必須完成的物品。 */
    entryRequiredItemIds?: string[];
    floorHotspot: {
      desktop: { x: number; y: number; width: number; height: number };
      mobile: { x: number; y: number; width: number; height: number };
    };
    copy: {
      fenceInstruction: string;
      fencePlacedInstruction: string;
      entryReadyInstruction?: string;
      interiorInstruction: string;
      hazardInstruction?: string;
      lockedInstruction?: string;
      entryLabel?: string;
    };
  };
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
      roomTitle: "先替牠布置安全的生活空間",
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
  rabbit: {
    id: "rabbit",
    copy: {
      animalName: "兔子",
      animalNameFallback: "小白",
      typeLabel: "物種",
      selectionTitle: "你想飼養哪一種動物？",
      breedTitle: "認識你的新家人——兔子",
      nameTitle: "先幫牠取一個名字",
      namePlaceholder: "請輸入兔子的名字",
      historyTitle: "你養過兔子嗎？",
      historyBody: "過去的陪伴經驗很珍貴，但兔子會隱藏不適，也需要每天穩定的照顧與觀察。",
      hasPreviousLabel: "有，以前養過兔子",
      noPreviousLabel: "沒有，這是第一次",
      previousSectionTitle: "以前陪伴你的兔子",
      roomTitle: "先替牠布置安全的生活空間",
      roomBody: (petName) => `${petName || "小白"} 還沒到家，先準備牧草、飲水、便盆、躲藏處與防滑地面，並收好可能被啃咬的危險物。`,
      departureTitle: "出發接牠回家",
      departureBody: (petName) => `今天要去接${petName || "小白"} 回家了。出門前先把需要的文件與接回用品準備好，讓牠在路上有安全的位置，也讓你能從容處理突發狀況。`,
      lifeChallengeLabel: () => "兔子的考驗",
    },
    roomItems: rabbitPreparation.roomItems,
    hazards: rabbitPreparation.hazards,
    trunkItems: rabbitPreparation.trunkItems,
    report: rabbitReport,
    roomFlow: {
      initialBackground: rabbitPreparation.roomFlow.initialBackground,
      safeBackground: rabbitPreparation.roomFlow.safeBackground,
      interiorBackground: rabbitPreparation.roomFlow.interiorBackground,
      interiorSafeBackground: rabbitPreparation.roomFlow.interiorSafeBackground,
      interiorBackgroundAspectRatio: rabbitPreparation.roomFlow.interiorBackgroundAspectRatio,
      floorHazardId: "slippery-floor",
      fenceItemId: "fence-pen",
      interiorItemId: "anti-slip-mat",
      floorHotspot: rabbitPreparation.roomFlow.floorHotspot,
      copy: rabbitPreparation.roomFlow.copy,
    },
  },
  bird: {
    id: "bird",
    copy: {
      animalName: "鸚鵡", animalNameFallback: "小啾", typeLabel: "物種",
      selectionTitle: "你想飼養哪一種動物？", breedTitle: "認識你的新家人——鸚鵡",
      nameTitle: "先幫牠取一個名字", namePlaceholder: "請輸入鸚鵡的名字",
      historyTitle: "你養過鸚鵡嗎？", historyBody: "鸚鵡照護有許多容易被忽略的細節；不論是否有經驗，都一起重新確認牠的需要。",
      hasPreviousLabel: "有，以前養過鸚鵡", noPreviousLabel: "沒有，這是第一次養鸚鵡", previousSectionTitle: "以前陪伴你的鸚鵡",
      roomTitle: "先替牠布置安全的生活空間",
      roomBody: (petName) => `${petName || "小啾"} 還沒到家。先準備合適鳥籠、棲木、食水容器與豐富化玩具，並移除會傷害鳥類呼吸道的物品。`,
      departureTitle: "出發接牠回家", departureBody: (petName) => `今天要去接${petName || "小啾"} 回家了。出門前先把需要的文件與接回用品準備好，讓牠在路上有安全的位置，也讓你能從容處理突發狀況。`,
      lifeChallengeLabel: () => "鳥的考驗",
    },
    roomItems: birdPreparation.roomItems, hazards: birdPreparation.hazards, trunkItems: birdPreparation.trunkItems, report: birdReport,
    roomFlow: {
      initialBackground: birdPreparation.roomFlow.initialBackground,
      safeBackground: birdPreparation.roomFlow.safeBackground,
      interiorBackground: birdPreparation.roomFlow.interiorBackground,
      interiorSafeBackground: birdPreparation.roomFlow.interiorSafeBackground,
      interiorBackgroundAspectRatio: birdPreparation.roomFlow.interiorBackgroundAspectRatio,
      floorHazardId: "",
      safeWhenAllHazards: true,
      fenceItemId: "bird-cage",
      interiorItemId: "bird-feces-tray",
      outsideItemIds: [...birdPreparation.roomFlow.outsideItemIds],
      entryRequiredItemIds: [...birdPreparation.roomFlow.entryRequiredItemIds],
      floorHotspot: { desktop: { x: 0, y: 0, width: 0, height: 0 }, mobile: { x: 0, y: 0, width: 0, height: 0 } },
      copy: birdPreparation.roomFlow.copy,
    },
  },
  hamster: {
    id: "hamster",
    copy: {
      animalName: "倉鼠", animalNameFallback: "芝麻", typeLabel: "物種",
      selectionTitle: "你想飼養哪一種動物？", breedTitle: "認識你的新家人——倉鼠",
      nameTitle: "先幫牠取一個名字", namePlaceholder: "請輸入倉鼠的名字",
      historyTitle: "你之前養過倉鼠嗎？", historyBody: "你之前養過倉鼠嗎？",
      hasPreviousLabel: "養過，{petName} 是我的第二隻以上", noPreviousLabel: "沒養過，{petName} 是我第一隻倉鼠",
      previousSectionTitle: "以前陪伴你的倉鼠",
      roomTitle: "先替牠布置安全的生活空間", roomBody: (petName) => `在把${petName || "芝麻"}帶回家前，先檢查生活空間。請點擊場景中的危險物品，先將它們收好。`,
      departureTitle: "出發接牠回家", departureBody: (petName) => `今天要去接${petName || "芝麻"}回家了。出門前先把需要的文件與接回用品準備好，讓牠在路上有安全的位置，也讓你能從容處理突發狀況。`,
      lifeChallengeLabel: () => "倉鼠的考驗",
    },
    roomItems: hamsterPreparation.roomItems, hazards: hamsterPreparation.hazards, trunkItems: hamsterPreparation.trunkItems,
    report: hamsterReport, roomFlow: hamsterPreparation.roomFlow,
  },
};

export function getSpeciesGameConfig(species: string): SpeciesGameConfig {
  if (species === "cat") return speciesGameConfig.cat;
  if (species === "rabbit") return speciesGameConfig.rabbit;
  if (species === "bird") return speciesGameConfig.bird;
  if (species === "hamster") return speciesGameConfig.hamster;
  return speciesGameConfig.dog;
}
