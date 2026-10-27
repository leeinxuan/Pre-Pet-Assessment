import type { ArrivalMealSceneLayout, ArrivalMealSupplyImageSizes, FeedingConfig } from "../../../game-types";
import { geckoAssets } from "./assets";

const imageSizes: ArrivalMealSupplyImageSizes = {
  desktop: {
    default: { width: 104, height: 104 },
    food: { width: 112, height: 112 },
    water: { width: 104, height: 104 },
    veggie: { width: 104, height: 104 },
    unsafe: { width: 96, height: 96 },
  },
  mobile: {
    default: { width: 78, height: 78 },
    food: { width: 86, height: 86 },
    water: { width: 78, height: 78 },
    veggie: { width: 78, height: 78 },
    unsafe: { width: 74, height: 74 },
  },
};

/** 桌機與手機位置皆由守宮資料設定，與其他物種互不影響。 */
/** 第一餐場景可在 desktop／mobile 分別調整素材位置與大小。 */
export const geckoArrivalMealSceneLayout: ArrivalMealSceneLayout = {
  desktop: {
    pet: { left: 40, bottom: 12, width: 31, maxHeight: 72 },
    food: { left: 22, bottom: 18, width: 17, maxHeight: 30 },
    water: { left: 10, bottom: 10, width: 14, maxHeight: 25 },
    veggie: { left: 30, bottom: 10, width: 14, maxHeight: 25 },
  },
  mobile: {
    pet: { left: 20, bottom: 17, width: 47, maxHeight: 64 },
    food: { left: 55, bottom: 29, width: 25, maxHeight: 30 },
    water: { left: 68, bottom: 16, width: 20, maxHeight: 24 },
    veggie: { left: 45, bottom: 16, width: 20, maxHeight: 24 },
  },
};

export const geckoFeeding: FeedingConfig = {
  animalName: "小型地棲性守宮",
  completionMessage: "第一餐準備好了！你準備了沾好鈣粉的活昆蟲，還有乾淨的飲水。守宮不需要每天餵食。成體每 2–3 天餵一次就夠了，每天餵反而容易造成肥胖與脂肪肝。尾巴粗細是判斷體況最直接的指標。",
  recurringExpenseIds: ["gecko-food-monthly"],
  interaction: "scene",
  requiredSupplies: ["food", "veggie", "water"],
  supplies: [
    { stateKey: "food", label: "活體餌料昆蟲", image: geckoAssets.feeding.liveInsect, alt: "活體餌料昆蟲", description: "守宮為肉食性，主食為活昆蟲（蟋蟀、杜比亞蟑螂或麵包蟲）。選擇大小約為守宮兩眼間距的昆蟲，避免過大造成消化負擔。" },
    { stateKey: "veggie", label: "鈣粉", image: geckoAssets.room.calciumSupplement, alt: "鈣粉與綜合維他命粉", description: "每次餵食前以鈣粉沾裹昆蟲，每週 1–2 次改用含 D3 鈣粉或綜合維他命粉輪替，維持鈣磷平衡。" },
    { stateKey: "water", label: "乾淨飲水", image: geckoAssets.feeding.waterBottle, alt: "乾淨飲水", description: "每天提供新鮮飲水並清洗水碟。守宮飲水量雖少，但飲水習慣的改變是健康的重要觀察指標。" },
  ],
  unsafeFoods: [
    { id: "fruit-vegetable", label: "水果 / 蔬菜", image: geckoAssets.feeding.fruitVegetable, title: "不適合守宮的食物", text: "守宮是肉食性動物，消化系統無法處理植物纖維，餵食蔬果不能提供所需營養，反而可能引發消化問題。", presentation: "warning" },
    { id: "human-food", label: "人類食物（剩飯、麵包等）", image: geckoAssets.feeding.humanFood, title: "人類食物有危險", text: "人類食物中的調味料、油脂、糖分對守宮有毒，絕對不可餵食任何人類食品。", presentation: "warning" },
    { id: "wild-caught-insect", label: "野外捕捉的昆蟲", image: geckoAssets.feeding.wildCaughtInsect, title: "野外昆蟲風險高", text: "野外昆蟲可能殘留農藥，或攜帶寄生蟲、病菌。請僅使用來自爬蟲專門店的繁殖用餌料昆蟲。", presentation: "warning" },
  ],
  scene: {
    desktopBackground: geckoAssets.room.terrariumSubstrate,
    mobileBackground: geckoAssets.room.terrariumSubstrate,
    pet: { waiting: geckoAssets.feeding.geckoWaiting, ready: geckoAssets.feeding.geckoReady },
    water: { empty: geckoAssets.room.shallowWaterDish, ready: geckoAssets.feeding.fullWaterDish },
    food: {
      ready: geckoAssets.feeding.liveInsect,
      alt: "活體餌料昆蟲",
      readyOverrides: [{ when: "veggie", image: geckoAssets.feeding.calciumDustedInsect, alt: "沾好鈣粉的活體餌料昆蟲" }],
    },
    veggie: { empty: geckoAssets.room.shallowWaterDish, ready: geckoAssets.room.calciumDish, alt: "裝好鈣粉的補鈣碟" },
  },
  arrivalMealSceneLayout: geckoArrivalMealSceneLayout,
  arrivalMealSupplyImageSizes: imageSizes,
};
