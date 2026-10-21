import { rabbitAssets } from "./assets";

/** 兔子不進行品種細選；固定 selection id 為 rabbit。 */
export const rabbitSelection = {
  skipBreedPage: true,
  category: { active: true },
  breeds: [{
    id: "rabbit", species: "rabbit", label: "兔子", icon: "🐇", image: rabbitAssets.selection.rabbit, size: "small",
    shortDescription: "兔子是純草食動物，牧草必須持續供應；牠們也會隱藏不適，需要每天觀察食慾、精神與糞便。",
  }],
} as const;
