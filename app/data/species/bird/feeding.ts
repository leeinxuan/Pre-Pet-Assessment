import type { ArrivalMealSceneLayout, ArrivalMealSupplyImageSizes, FeedingConfig } from "../../../game-types";
import { birdAssets } from "./assets";

/** 鸚鵡第一餐場景素材的位置；可依鳥籠餵食畫面獨立調整。 */
export const birdArrivalMealSceneLayout: ArrivalMealSceneLayout = {
  desktop: {
    pet: { left: 12, bottom: 41, width: 33, maxHeight: 67 },
    water: { left: 37, bottom: 40, width: 25 },
    food: { left: 55, bottom: 40, width: 20 },
    veggie: { left: 45, bottom: -1, width: 30 },
  },
  mobile: {
    pet: { left: 32, bottom: 10, width: 50, maxHeight: 58 },
    water: { left: 10, bottom: 10, width: 24 },
    food: { left: 28, bottom: 5, width: 24 },
    veggie: { left: 52, bottom: 7, width: 20 },
  },
};

/** 鸚鵡第一餐物品欄圖片尺寸；桌機與手機均可獨立調整。 */
export const birdArrivalMealSupplyImageSizes: ArrivalMealSupplyImageSizes = {
  desktop: { default: { width: 92, height: 108 }, food: { width: 125, height: 125 }, water: { width: 92, height: 108 }, veggie: { width: 92, height: 108 }, unsafe: { width: 92, height: 108 } },
  mobile: { default: { width: 72, height: 78 }, food: { width: 150, height: 150 }, water: { width: 130, height: 130 }, veggie: { width: 72, height: 78 }, unsafe: { width: 72, height: 78 } },
};

export const birdFeeding: FeedingConfig = {
  animalName: "小啾", completionMessage: "第一餐準備好了！請持續提供符合食性的專用飼料、新鮮食材與每天更換的乾淨飲水。", recurringExpenseIds: ["bird-food-monthly", "bird-cleaning-monthly"],
  interaction: "scene", requiredSupplies: ["food", "water", "veggie"],
  supplies: [{ stateKey: "food", label: "鸚鵡專用混合飼料", image: birdAssets.feeding.seedMix, alt: "鸚鵡專用混合飼料" }, { stateKey: "water", label: "飲水", image: birdAssets.feeding.waterBottle, alt: "飲水" }, { stateKey: "veggie", label: "新鮮蔬菜", image: birdAssets.feeding.freshVeggie, alt: "新鮮蔬菜" }],
  unsafeFoods: [
    { id: "chocolate", label: "巧克力", image: birdAssets.feeding.chocolate, title: "巧克力不能給鳥吃", text: "巧克力中的成分可能傷害鳥類神經與心臟；即使少量也不能餵食。" },
    { id: "avocado", label: "酪梨", image: birdAssets.feeding.avocado, title: "酪梨不能給鳥吃", text: "酪梨含 Persin，對大多數鳥類有毒，可能造成呼吸困難與虛弱。" },
    { id: "salty-snack", label: "洋芋片／鹹味零食", image: birdAssets.feeding.saltySnack, title: "鹹味零食不適合鳥", text: "高鈉調味食品會增加鳥類腎臟負擔，不能作為零食。" },
  ],
  scene: { desktopBackground: birdAssets.feeding.background, mobileBackground: birdAssets.feeding.background, pet: { waiting: birdAssets.feeding.unhappy, ready: birdAssets.feeding.happy }, water: { empty: birdAssets.feeding.emptyWaterBowl, ready: birdAssets.feeding.fullWaterBowl }, food: { empty: birdAssets.feeding.emptyFoodBowl, ready: birdAssets.feeding.fullFoodBowl }, veggie: { ready: birdAssets.feeding.freshVeggie, alt: "已準備的新鮮蔬菜" } },
  arrivalMealSceneLayout: birdArrivalMealSceneLayout, arrivalMealSupplyImageSizes: birdArrivalMealSupplyImageSizes,
};
