import { catAssets } from "../../catAssets";

/** 貓咪選擇頁資料。新增貓咪品種卡時只需修改此處。 */
export const catBreeds = [
  { id: "orange-cat", species: "cat", label: "米克斯－橘貓", icon: "🐈", image: catAssets.selection.orangeCat, size: "medium", shortDescription: "多數親人、表達需求明顯，常喜歡主動互動與撒嬌。牠也較需要注意體重管理，建議採定時定量餵食，搭配益智漏食玩具與日常活動，避免因過度進食而變胖。" },
  { id: "tabby-cat", species: "cat", label: "米克斯－虎斑貓", icon: "🐈‍⬛", image: catAssets.selection.tabbyCat, size: "medium", shortDescription: "聰明、互動性高，也常保有旺盛的獵捕本能。牠喜歡和人玩耍，適合每天安排逗貓棒等獵捕遊戲，並提供貓跳台或安全的垂直空間，幫助牠消耗精力。" },
] as const;

export const catSelection = { breeds: catBreeds } as const;
