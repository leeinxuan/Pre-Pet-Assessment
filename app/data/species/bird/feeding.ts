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
    pet: { left:-5, bottom: 40, width: 55, maxHeight: 58 },
    water: { left: 65, bottom: 40, width: 45 },
    food: { left: 40, bottom: 38, width: 35 },
    veggie: { left: 52, bottom: 0, width: 40 },
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
  supplies: [
    { stateKey: "food", label: "鸚鵡專用混合飼料", image: birdAssets.feeding.seedMix, alt: "鸚鵡專用混合飼料", description: "植食性鸚鵡的主食是符合食性的混合種子或滋養丸飼料，提供所需能量與基礎營養。注意定期確認食碗內是否只剩空殼，避免誤判進食量。" },
    { stateKey: "water", label: "乾淨飲水", image: birdAssets.feeding.waterBottle, alt: "乾淨飲水", description: "每天提供新鮮飲水並清洗容器。容器不可過大過深，避免鳥跌入。注意觀察每日飲水量，飲水變化是健康的重要指標。" },
    { stateKey: "veggie", label: "新鮮蔬菜", image: birdAssets.feeding.freshVeggie, alt: "新鮮蔬菜", description: "如胡蘿蔔、深綠色蔬菜等適量新鮮蔬果可補充種子飼料缺乏的維生素 A——胡蘿蔔、深綠色蔬菜都是好選擇。注意限制份量，讓鳥以專用飼料為主食，新鮮食材為補充。" },
  ],
  unsafeFoods: [
    { id: "chocolate", label: "巧克力", image: birdAssets.feeding.chocolate, title: "巧克力不能給鳥吃", text: "巧克力對鳥類具有毒性，即使少量也可能致命，絕對不可給鳥食用。" },
    { id: "avocado", label: "酪梨", image: birdAssets.feeding.avocado, title: "酪梨不能給鳥吃", text: "酪梨對大多數鳥類有毒性，誤食可能危及生命。是廚房常見但對鳥類高度危險的食材，請勿讓鳥接觸。" },
    { id: "salty-snack", label: "洋芋片／鹹味零食", image: birdAssets.feeding.saltySnack, title: "鹹味零食不適合鳥", text: "高鈉調味食品會增加鳥類腎臟負擔，不能作為零食。" },
  ],
  scene: { desktopBackground: birdAssets.feeding.background, mobileBackground: birdAssets.feeding.background, pet: { waiting: birdAssets.feeding.unhappy, ready: birdAssets.feeding.happy }, water: { empty: birdAssets.feeding.emptyWaterBowl, ready: birdAssets.feeding.fullWaterBowl }, food: { empty: birdAssets.feeding.emptyFoodBowl, ready: birdAssets.feeding.fullFoodBowl }, veggie: { ready: birdAssets.feeding.freshVeggie, alt: "已準備的新鮮蔬菜" } },
  arrivalMealSceneLayout: birdArrivalMealSceneLayout, arrivalMealSupplyImageSizes: birdArrivalMealSupplyImageSizes,
};
