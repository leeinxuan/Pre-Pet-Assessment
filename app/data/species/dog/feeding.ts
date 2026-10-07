import type { ArrivalMealSceneLayout, ArrivalMealSupplyImageSizes, FeedingConfig } from "../../../game-types";

/** 犬隻第一餐場景素材的位置；百分比以餵食場景本身為基準。 */
export const dogArrivalMealSceneLayout: ArrivalMealSceneLayout = {
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

/** 犬隻第一餐物品欄圖片尺寸；只影響用品欄，不影響場景內的位置。 */
export const dogArrivalMealSupplyImageSizes: ArrivalMealSupplyImageSizes = {
  desktop: { default: { width: 92, height: 108 }, food: { width: 140, height: 140 }, water: { width: 92, height: 108 }, veggie: { width: 92, height: 108 }, unsafe: { width: 92, height: 108 } },
  mobile: { default: { width: 72, height: 78 }, food: { width: 150, height: 150 }, water: { width: 130, height: 130 }, veggie: { width: 72, height: 78 }, unsafe: { width: 72, height: 78 } },
};

export const dogFeeding: FeedingConfig = {
  animalName: "小狗",
  completionMessage: "第一餐準備好了！提供適合的主食與乾淨飲水，讓狗狗在新家慢慢安心下來。",
  recurringExpenseIds: ["dog-food-monthly", "dog-clean-monthly"],
  interaction: "scene",
  requiredSupplies: ["food", "water"],
  supplies: [
    { stateKey: "food", label: "飼料", image: "/assets/dog/room/food.png", alt: "飼料" },
    { stateKey: "water", label: "水", image: "/assets/shared/waterbottle.png", alt: "水瓶" },
  ],
  unsafeFoods: [
    { id: "macadamia", label: "夏威夷豆", image: "/assets/dog/pet-journey/macadamia-nuts.png", title: "這個不能給小狗吃", text: "常見的人類食物例如洋蔥、大蒜、巧克力、葡萄、堅果類（例如：夏威夷豆）、口香糖（含木糖醇）等，對犬隻而言可能會造成健康危害。另外，太鹹、太油或含有咖啡因的食物，也不適合犬隻食用。" },
    { id: "bones", label: "吃剩的骨頭", image: "/assets/dog/pet-journey/leftover-bones.png", title: "吃剩的骨頭不適合當作正餐", text: "許多民眾會將吃過的骨頭、便當或剩菜剩飯當作犬隻的食物來源之一，但除了必須注意犬隻的營養均衡與日食物安全適當之外，啃食骨頭或剩食中較堅硬的殘渣，可能造成犬隻口腔或消化道危害，建議避免餵食此類食物。" },
  ],
  scene: {
    desktopBackground: "/assets/dog/room/empty-room.png", mobileBackground: "/assets/dog/room/empty-room-mobile.png",
    pet: { waiting: "/assets/dog/pet-journey/shiba/shiba-sad.png", ready: "/assets/dog/pet-journey/shiba/shiba-dog.png" },
    water: { empty: "/assets/dog/pet-journey/empty-water-bowl.png", ready: "/assets/dog/room/water-bowl.png" },
    food: { empty: "/assets/dog/pet-journey/empty-food-bowl.png", ready: "/assets/dog/room/food-bowl.png" },
  },
  arrivalMealSceneLayout: dogArrivalMealSceneLayout,
  arrivalMealSupplyImageSizes: dogArrivalMealSupplyImageSizes,
};
