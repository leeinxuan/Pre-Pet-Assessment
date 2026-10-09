import type { ArrivalMealSceneLayout, ArrivalMealSupplyImageSizes, FeedingConfig } from "../../../game-types";
import { hamsterAssets } from "./assets";

/** 倉鼠第一餐場景素材的位置；桌機與手機均由倉鼠資料獨立控制。 */
export const hamsterArrivalMealSceneLayout: ArrivalMealSceneLayout = {
  desktop: {
    pet: { left: 35, bottom: 20, width: 25, maxHeight: 67 },
    water: { left: 1, bottom: 45, width: 25 },
    food: { left: 10, bottom: 10, width: 25 },
    veggie: { left: 55, bottom: 10, width: 13 },
  },
  mobile: {
    pet: { left: 32, bottom: 10, width: 50, maxHeight: 58 },
    water: { left: 10, bottom: 10, width: 24 },
    food: { left: 28, bottom: 5, width: 24 },
    veggie: { left: 52, bottom: 7, width: 20 },
  },
};

/** 倉鼠第一餐物品欄尺寸。 */
export const hamsterArrivalMealSupplyImageSizes: ArrivalMealSupplyImageSizes = {
  desktop: { default: { width: 92, height: 108 }, food: { width: 125, height: 125 }, water: { width: 92, height: 108 }, veggie: { width: 92, height: 108 }, unsafe: { width: 92, height: 108 } },
  mobile: { default: { width: 72, height: 78 }, food: { width: 150, height: 150 }, water: { width: 130, height: 130 }, veggie: { width: 72, height: 78 }, unsafe: { width: 72, height: 78 } },
};

export const hamsterFeeding: FeedingConfig = {
  animalName: "倉鼠", completionMessage: "第一餐準備好了！固定份量的綜合飼料與乾淨飲水，能讓倉鼠在新家慢慢安心下來。", recurringExpenseIds: ["hamster-pellet-monthly"],
  interaction: "scene", requiredSupplies: ["food", "water"],
  supplies: [
    { stateKey: "food", label: "倉鼠專用綜合飼料", image: hamsterAssets.feeding.pellet, alt: "倉鼠專用綜合飼料" },
    { stateKey: "water", label: "乾淨飲水", image: hamsterAssets.feeding.inventoryWaterBottle, alt: "乾淨飲水" },
  ],
  unsafeFoods: [
    { id: "sunflower-seeds", label: "一大把葵瓜子", image: hamsterAssets.feeding.sunflowerSeeds, title: "葵瓜子不能當主食", text: "少量可以，但不能當主食！倉鼠特別喜歡葵瓜子，但容易只吃這個忽略其他成分，造成挑食和營養不均。每天固定少量作為點心即可，不可讓牠想吃多少就吃多少。", presentation: "caution" },
    { id: "onion", label: "洋蔥", image: hamsterAssets.feeding.onion, title: "洋蔥不能給倉鼠吃", text: "蔥、蒜、洋蔥對倉鼠有毒，絕對不可餵食。廚房常見食材，請務必放置在{petName}無法取得的地方。" },
    { id: "citrus-fruit", label: "柑橘類水果", image: hamsterAssets.feeding.citrusFruit, title: "柑橘類水果不適合倉鼠", text: "柑橘類水果的酸性可能刺激倉鼠消化道，不建議餵食。水果類食物整體須謹慎，含糖量高的種類尤其要避免或極少量給予。" },
  ],
  scene: {
    desktopBackground: hamsterAssets.feeding.background,
    mobileBackground: hamsterAssets.feeding.background,
    pet: { waiting: hamsterAssets.feeding.unhappy, ready: hamsterAssets.feeding.happy },
    water: { empty: hamsterAssets.room.waterBottle, ready: hamsterAssets.feeding.fullWaterBottle },
    food: { empty: hamsterAssets.room.foodBowl, ready: hamsterAssets.feeding.fullFoodBowl },
  },
  arrivalMealSceneLayout: hamsterArrivalMealSceneLayout, arrivalMealSupplyImageSizes: hamsterArrivalMealSupplyImageSizes,
};
