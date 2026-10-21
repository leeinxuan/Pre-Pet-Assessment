import { birdAssets } from "./assets";

export const birdSelection = {
  skipBreedPage: true,
  category: { active: true },
  breeds: [{
    id: "bird", species: "bird", label: "鸚鵡", icon: "🦜", image: birdAssets.selection.bird, size: "small",
    shortDescription: "鸚鵡對空氣品質、環境變化與社交互動很敏感；不同物種的壽命與食性差異也很大。",
  }],
} as const;
