import type { ArrivalMealSceneLayout, ArrivalMealSupplyImageSizes, FeedingConfig } from "../../../game-types";
import { hamsterFirstMeal } from "./activities";

/** 倉鼠第一餐目前為選擇／拖曳題；保留場景設定，補素材後可直接使用共用餵食場景。 */
export const hamsterArrivalMealSceneLayout: ArrivalMealSceneLayout = {
  desktop: {
    pet: { left: 47, bottom: 11, width: 33, maxHeight: 67 },
    water: { left: 25, bottom: 10, width: 15 },
    food: { left: 39, bottom: 8, width: 15 },
    veggie: { left: 55, bottom: 10, width: 13 },
  },
  mobile: {
    pet: { left: 32, bottom: 10, width: 50, maxHeight: 58 },
    water: { left: 10, bottom: 10, width: 24 },
    food: { left: 28, bottom: 5, width: 24 },
    veggie: { left: 52, bottom: 7, width: 20 },
  },
};

/** 倉鼠第一餐物品欄尺寸；目前使用文字選項，補素材後仍在此調整。 */
export const hamsterArrivalMealSupplyImageSizes: ArrivalMealSupplyImageSizes = {
  desktop: { default: { width: 92, height: 108 }, food: { width: 125, height: 125 }, water: { width: 92, height: 108 }, veggie: { width: 92, height: 108 }, unsafe: { width: 92, height: 108 } },
  mobile: { default: { width: 72, height: 78 }, food: { width: 150, height: 150 }, water: { width: 130, height: 130 }, veggie: { width: 72, height: 78 }, unsafe: { width: 72, height: 78 } },
};

export const hamsterFeeding: FeedingConfig = {
  animalName: "倉鼠", completionMessage: "第一餐準備好了！固定份量的綜合飼料與乾淨飲水，能讓倉鼠在新家慢慢安心下來。", recurringExpenseIds: ["hamster-pellet-monthly"],
  interaction: "choice", title: hamsterFirstMeal.title, intro: "選出適合的第一餐，讓{petName}在新家慢慢安心下來。", choices: hamsterFirstMeal.items, emptyBowlText: "選擇合適食物，或拖曳卡片到這裡",
  arrivalMealSceneLayout: hamsterArrivalMealSceneLayout, arrivalMealSupplyImageSizes: hamsterArrivalMealSupplyImageSizes,
};
