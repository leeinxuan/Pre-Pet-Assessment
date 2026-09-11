import { catAssets } from "../../catAssets";

/** 貓咪選擇頁資料。新增貓咪品種卡時只需修改此處。 */
export const catBreeds = [
  { id: "mixed-cat", species: "cat", label: "米克斯貓", icon: "🐈", image: catAssets.selection.mixedCat, size: "medium", shortDescription: "外觀與個性各有不同，無法只靠毛色預測。牠們和所有家貓一樣，需要每天的獵捕式互動遊戲來滿足本能，以及定時定量的餵食管理來避免室內生活帶來的過重風險。" },
  { id: "british-shorthair", species: "cat", label: "英國短毛貓", icon: "🐱", image: catAssets.selection.britishShorthair, size: "medium", shortDescription: "圓臉圓眼，個性沉穩獨立，喜歡陪在你身邊但不愛被強抱。活動量偏低、食慾旺盛，容易過重；加上品種有較高的心臟病（HCM）風險，建議定量餵食、定期健康檢查，並養成每週梳理豐厚被毛的習慣。" },
] as const;

export const catSelection = { breeds: catBreeds } as const;
