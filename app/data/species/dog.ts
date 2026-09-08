import { breeds, departureTrunkItems, hazards, roomItems } from "../../game-data";
import { getDogBreedChallengeScenarios } from "./dog/breed-challenges";
import { dogJourneyItems } from "./dog/journey";
import { dogLifeScenarios } from "./dog/scenarios";

/**
 * 犬隻專屬素材入口。
 * 現有犬隻素材仍保留原本 public/assets 位置，避免在重構期間讓舊路徑失效；
 * 新增或替換犬隻素材時請先集中在此處設定。
 */
export const dogAssets = {
  selection: { root: "/assets/species/dog" },
  room: { background: "/assets/room/empty-room.jpg" },
  preparation: { trunk: "/assets/car/trunk.png" },
  feeding: { room: "/assets/room/empty-room.jpg" },
  life: { root: "/assets/pet-journey" },
  daily: { root: "/assets/walking" },
} as const;

/** 犬隻專屬資料集合；共用 UI 透過 species-config 取得。 */
export const dogSpeciesData = {
  id: "dog" as const,
  breeds: breeds.filter((breed) => (breed.species ?? "dog") === "dog"),
  roomItems,
  hazards,
  trunkItems: departureTrunkItems,
  lifeScenarios: dogLifeScenarios,
  breedChallenges: getDogBreedChallengeScenarios,
  journeyItems: dogJourneyItems,
  assets: dogAssets,
} as const;
