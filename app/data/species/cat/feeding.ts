import type { ArrivalMealSceneLayout, ArrivalMealSupplyImageSizes, FeedingConfig } from "../../../game-types";
import { catAssets } from "./assets";

/** 貓咪第一餐場景素材的位置；可獨立於犬隻調整。 */
export const catArrivalMealSceneLayout: ArrivalMealSceneLayout = {
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

/** 貓咪第一餐物品欄圖片尺寸；可獨立於犬隻調整。 */
export const catArrivalMealSupplyImageSizes: ArrivalMealSupplyImageSizes = {
  desktop: { default: { width: 92, height: 108 }, food: { width: 125, height: 125 }, water: { width: 92, height: 108 }, veggie: { width: 92, height: 108 }, unsafe: { width: 92, height: 108 } },
  mobile: { default: { width: 72, height: 78 }, food: { width: 150, height: 150 }, water: { width: 130, height: 130 }, veggie: { width: 72, height: 78 }, unsafe: { width: 72, height: 78 } },
};

export const catFeeding: FeedingConfig = {
  animalName: "貓咪", completionMessage: "第一餐準備好了！合適的主食與乾淨飲水，能讓貓咪在新家慢慢安心下來。", recurringExpenseIds: ["cat-food-monthly", "cat-litter-monthly"],
  interaction: "scene", requiredSupplies: ["food", "water"],
  supplies: [{ stateKey: "food", label: "貓主食", image: catAssets.feeding.food, alt: "貓主食" }, { stateKey: "water", label: "水", image: catAssets.feeding.waterBottle, alt: "水瓶" }],
  unsafeFoods: [
    { id: "seasoned-leftovers", label: "調味剩菜", image: catAssets.feeding.seasonedLeftovers, title: "調味剩菜不適合貓咪", text: "人類剩菜可能太鹹、太油，也可能含有洋蔥、大蒜或其他不適合貓咪的成分。剛到家時請先提供合適主食與乾淨飲水。" },
    { id: "chocolate-caffeine", label: "巧克力", image: catAssets.feeding.chocolate, title: "這個不能給貓咪吃", text: "巧克力可能危害貓咪健康，也不適合作為引誘進食或安撫的食物。人類食物不一定適合貓咪，不確定食材安全性時，請查詢可靠資料或詢問獸醫。" },
    { id: "vegetables-fruits", label: "蔬菜／水果", image: catAssets.feeding.vegetablesFruit, title: "蔬菜／水果只能確認安全後少量提供", text: "有些蔬菜或水果可在確認安全後少量補充，但洋蔥、青蔥、大蒜、葡萄與葡萄乾等不適合貓咪。蔬菜／水果不應取代主食；不確定食材是否適合時，請先查詢可靠資料或詢問獸醫。" },
  ],
  scene: { desktopBackground: catAssets.life.safeRoom, mobileBackground: catAssets.life.safeRoom, pet: { waiting: catAssets.feeding.hungryScaredCat, ready: catAssets.feeding.happyCat }, water: { empty: catAssets.feeding.emptyWaterBowl, ready: catAssets.feeding.waterBowl }, food: { empty: catAssets.feeding.emptyFoodBowl, ready: catAssets.feeding.foodBowl } },
  arrivalMealSceneLayout: catArrivalMealSceneLayout, arrivalMealSupplyImageSizes: catArrivalMealSupplyImageSizes,
};
