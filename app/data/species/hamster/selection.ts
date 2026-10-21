import { hamsterAssets } from "./assets";

export const hamsterSelection = {
  skipBreedPage: true,
  category: { active: true },
  breeds: [{
    id: "hamster", species: "hamster", label: "倉鼠", icon: "🐹", image: hamsterAssets.selection.hamster, size: "small",
    shortDescription: "倉鼠兼具夜行性的作息特性、齧齒類持續生長的牙齒、沙浴清潔的特殊需求，以及品系間差異極大的社交模式。",
  }],
} as const;
