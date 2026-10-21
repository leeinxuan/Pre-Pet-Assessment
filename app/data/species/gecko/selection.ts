import { geckoAssets } from "./assets";

export const geckoSelection = {
  skipBreedPage: true,
  category: { active: true },
  breeds: [{
    id: "gecko", species: "gecko", label: "小型地棲性守宮", icon: "🦎", image: geckoAssets.selection.gecko, size: "small",
    shortDescription: "夜行、獨居且仰賴環境溫度梯度的爬蟲；需要穩定的每日觀察與細節照護。",
  }],
} as const;
