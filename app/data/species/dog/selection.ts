/** 犬隻選擇頁資料。新增犬種時只需修改此處。 */
export const dogBreeds = [
  { id: "chihuahua", species: "dog", label: "吉娃娃", icon: "🐕", image: "/assets/dog/selection/chihuahua.png", size: "small", shortDescription: "體型嬌小、警覺性高，適合室內陪伴生活。雖然活動空間需求較小，仍需要規律散步與溫和社會化。" },
  { id: "poodle", species: "dog", label: "貴賓犬", icon: "🐩", image: "/assets/dog/selection/poodle.png", size: "small", shortDescription: "聰明、親人且學習力強，需要足夠互動、益智活動與定期美容整理。適合願意投入陪伴與訓練時間的家庭。" },
  { id: "shiba", species: "dog", label: "柴犬", icon: "🐕", image: "/assets/dog/selection/shiba.png", size: "medium", shortDescription: "個性獨立、精力充沛，也可能較有主見。需要穩定訓練、充足散步與安全的外出牽繩管理。" },
  { id: "border", species: "dog", label: "邊境牧羊犬", icon: "🐕‍🦺", image: "/assets/dog/selection/border-collie.png", size: "medium", shortDescription: "學習力與精力都非常高，需要大量運動、訓練和腦力刺激。較適合生活步調活躍、能長時間陪伴互動的飼主。" },
  { id: "labrador", species: "dog", label: "拉布拉多", icon: "🦮", image: "/assets/dog/selection/labrador.png", size: "large", shortDescription: "親人、友善且活潑，通常喜歡互動與戶外活動。需要足夠運動、體重管理及基本服從訓練。" },
  { id: "doberman", species: "dog", label: "杜賓犬", icon: "🐕", image: "/assets/dog/selection/doberman.png", size: "large", shortDescription: "警覺、聰明且活動量高，需要穩定訓練、規律運動與清楚界線。適合能投入陪伴、社會化與安全管理的家庭。" },
  { id: "old-english-sheepdog", species: "dog", label: "英國古代牧羊犬", icon: "🐕", image: "/assets/dog/selection/old-english-sheepdog.png", size: "large", shortDescription: "溫和親人、體型較大且毛量豐厚，需要規律梳理、充足活動與舒適的生活空間。適合願意投入日常照護與毛髮整理的家庭。" },
  { id: "mixed", species: "dog", label: "米克斯", icon: "🐕", image: "/assets/dog/selection/mixed-breed.png", size: "medium", shortDescription: "個性與體型差異較大，適合先了解牠的實際年齡、體態與生活習慣。準備時可保留彈性，依牠到家後的反應慢慢調整。" },
] as const;

export const dogSelection = { breeds: dogBreeds } as const;
