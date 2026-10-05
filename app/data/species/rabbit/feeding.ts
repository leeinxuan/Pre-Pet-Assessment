import type { ArrivalMealSceneLayout, ArrivalMealSupplyImageSizes } from "../../../game-types";

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
