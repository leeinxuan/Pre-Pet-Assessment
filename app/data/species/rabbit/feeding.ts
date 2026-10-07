import type { ArrivalMealSceneLayout, ArrivalMealSupplyImageSizes, FeedingConfig } from "../../../game-types";
import { rabbitAssets } from "./assets";

/** 兔子第一餐場景素材的位置；可依兔籠畫面獨立調整。 */
export const rabbitArrivalMealSceneLayout: ArrivalMealSceneLayout = {
  desktop: {
    pet: { left: 33, bottom: 25, width: 33, maxHeight: 67 },
    water: { left: 13, bottom: 25, width: 15 },
    food: { left: 28, bottom: 25, width: 15 },
    veggie: { left: 20, bottom: 45, width: 13 },
  },
  mobile: {
    pet: { left: 32, bottom: 10, width: 50, maxHeight: 58 },
    water: { left: 10, bottom: 10, width: 24 },
    food: { left: 28, bottom: 5, width: 24 },
    veggie: { left: 52, bottom: 7, width: 20 },
  },
};

/** 兔子第一餐物品欄圖片尺寸；桌機與手機均可獨立調整。 */
export const rabbitArrivalMealSupplyImageSizes: ArrivalMealSupplyImageSizes = {
  desktop: { default: { width: 92, height: 108 }, food: { width: 125, height: 125 }, water: { width: 92, height: 108 }, veggie: { width: 92, height: 108 }, unsafe: { width: 92, height: 108 } },
  mobile: { default: { width: 72, height: 78 }, food: { width: 150, height: 150 }, water: { width: 130, height: 130 }, veggie: { width: 72, height: 78 }, unsafe: { width: 72, height: 78 } },
};

export const rabbitFeeding: FeedingConfig = {
  animalName: "兔子", completionMessage: "第一餐準備好了！兔子的飲食以牧草為主，搭配適量新鮮葉菜與乾淨飲水；紅蘿蔔只能少量偶爾提供。", recurringExpenseIds: ["rabbit-hay-monthly", "rabbit-pellet-monthly", "rabbit-veggies-monthly"],
  interaction: "scene", requiredSupplies: ["food", "water", "veggie"],
  supplies: [{ stateKey: "food", label: "牧草", image: rabbitAssets.feeding.hay, alt: "牧草" }, { stateKey: "water", label: "飲水", image: "/assets/shared/waterbottle.png", alt: "飲水" }, { stateKey: "veggie", label: "新鮮葉菜", image: rabbitAssets.feeding.leafyVeggie, alt: "新鮮葉菜" }],
  unsafeFoods: [
    { id: "rabbit-carrot", label: "整袋紅蘿蔔", image: rabbitAssets.feeding.carrotMain, title: "整袋紅蘿蔔不適合作為主食", text: "紅蘿蔔只能偶爾少量提供，含糖量偏高，不能替代每日 80% 以上的牧草。請以足量牧草為主，搭配合適的新鮮葉菜與乾淨飲水。", presentation: "caution" },
    { id: "rabbit-onion", label: "洋蔥", image: rabbitAssets.feeding.onion, title: "洋蔥不能給兔子吃", text: "洋蔥、大蒜與蔥類對兔子有毒，不能作為零食或安撫食物。請改提供足量牧草、合適的新鮮葉菜與乾淨飲水。" },
    { id: "rabbit-macadamia", label: "夏威夷豆", image: rabbitAssets.feeding.macadamia, title: "夏威夷豆不能給兔子吃", text: "夏威夷豆對兔子有毒，可能引發肌肉無力與後肢麻痺。請改提供足量牧草、合適的新鮮葉菜與乾淨飲水。" },
  ],
  scene: { desktopBackground: rabbitAssets.room.fenceInteriorWithMat, mobileBackground: rabbitAssets.room.fenceInteriorWithMat, pet: { waiting: rabbitAssets.feeding.rabbitUnhappy, ready: rabbitAssets.feeding.rabbitHappy }, water: { empty: rabbitAssets.feeding.waterBowlEmpty, ready: rabbitAssets.room.waterBowl }, food: { empty: rabbitAssets.feeding.hayRackEmpty, ready: rabbitAssets.feeding.hayRack }, veggie: { ready: rabbitAssets.feeding.leafyVeggie, alt: "已準備的新鮮葉菜" } },
  arrivalMealSceneLayout: rabbitArrivalMealSceneLayout, arrivalMealSupplyImageSizes: rabbitArrivalMealSupplyImageSizes,
};
