import type { ArrivalMealSceneLayout, ArrivalMealSupplyImageSizes, FeedingConfig } from "../../../game-types";

const imageSizes: ArrivalMealSupplyImageSizes = { desktop: { default: { width: 110, height: 110 }, food: { width: 110, height: 110 }, water: { width: 110, height: 110 }, veggie: { width: 110, height: 110 }, unsafe: { width: 110, height: 110 } }, mobile: { default: { width: 80, height: 80 }, food: { width: 80, height: 80 }, water: { width: 80, height: 80 }, veggie: { width: 80, height: 80 }, unsafe: { width: 80, height: 80 } } };
const sceneLayout: ArrivalMealSceneLayout = { desktop: { pet: { left: 50, bottom: 20, width: 30, maxHeight: 65 }, water: { left: 70, bottom: 16, width: 14 }, food: { left: 40, bottom: 16, width: 18 }, veggie: { left: 0, bottom: 0, width: 0 } }, mobile: { pet: { left: 50, bottom: 20, width: 45, maxHeight: 60 }, water: { left: 70, bottom: 16, width: 20 }, food: { left: 35, bottom: 16, width: 23 }, veggie: { left: 0, bottom: 0, width: 0 } } };
export const geckoFeeding: FeedingConfig = {
  animalName: "小型地棲性守宮", completionMessage: "第一餐準備好了！你準備了活體餌料、補鈣與乾淨飲水。", recurringExpenseIds: ["gecko-food-monthly"],
  interaction: "choice", title: "{petName} 的第一餐", intro: "選出守宮第一餐需要的所有正確項目。", emptyBowlText: "尚未放入正確的第一餐用品", choices: [
    { id: "gecko-live-insect", label: "活體餌料昆蟲（蟋蟀、杜比亞蟑螂或麵包蟲）", result: "correct", feedback: "正確！守宮為肉食性，主食為活昆蟲；昆蟲大小約為守宮兩眼間距。" },
    { id: "gecko-calcium-dusting", label: "鈣粉（餵食前沾裹昆蟲用）", result: "correct", feedback: "正確！每次餵食前以鈣粉沾裹昆蟲，維持鈣磷平衡。" },
    { id: "gecko-water", label: "乾淨飲水（淺碟）", result: "correct", feedback: "必要！每天提供新鮮飲水並清洗水碟。" },
    { id: "fruit-vegetable", label: "水果／蔬菜", result: "incorrect", feedback: "不適合！守宮是肉食性動物，無法以植物性食物取得所需營養。" },
    { id: "dead-insect-no-movement", label: "靜止不動的死昆蟲", result: "incorrect", feedback: "注意！守宮依靠昆蟲移動觸發捕食本能，活昆蟲仍是最佳選擇。" },
    { id: "human-food", label: "人類食物（剩飯、麵包等）", result: "incorrect", feedback: "危險！人類食物中的調味料、油脂與糖分不適合守宮。" },
    { id: "wild-caught-insect", label: "野外捕捉的昆蟲", result: "incorrect", feedback: "風險高！可能殘留農藥或攜帶寄生蟲、病菌。" },
  ], arrivalMealSceneLayout: sceneLayout, arrivalMealSupplyImageSizes: imageSizes,
};
