/** 選擇品種頁唯一可選資料；目前暫不顯示，保留供日後重新啟用。 */
export const dogBreeds = [
  { id: "shiba", species: "dog", label: "柴犬", icon: "🐕", image: "/assets/dog/selection/shiba.png", size: "medium", shortDescription: "個性獨立、精力充沛，也可能較有主見。需要穩定訓練、充足散步與安全的外出牽繩管理。" },
  { id: "mixed", species: "dog", label: "米克斯", icon: "🐕", image: "/assets/dog/selection/mixed-breed.png", size: "medium", shortDescription: "個性與體型差異較大，適合先了解牠的實際年齡、體態與生活習慣。準備時可保留彈性，依牠到家後的反應慢慢調整。" },
] as const;

/** 現行流程採通用犬資料；既有品種資料保留供未來重新啟用。 */
export const dogSelection = {
  skipBreedPage: true,
  breeds: [{ id: "dog", species: "dog", label: "犬", icon: "🐕", image: "/assets/species/dog.webp", size: "medium", shortDescription: "以通用犬隻照護需求為基礎，重點在日常陪伴、安全與健康觀察。" }],
} as const;
