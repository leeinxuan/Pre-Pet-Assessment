import { getDogBreedChallengeScenarios } from "./dog/breed-challenges";
import { dogJourneyItems } from "./dog/journey";
import { dogLifeScenarios } from "./dog/scenarios";
import { dogBreeds } from "./dog/selection";
import { dogDepartureTrunkItems, dogHazards, dogRoomItems } from "./dog/preparation";
import { sharedAssets } from "../shared/assets";

/**
 * 犬隻專屬素材入口。
 * 所有犬隻素材集中於 public/assets/dog；共用元件應從此設定讀取。
 */
export const dogAssets = {
  selection: { root: "/assets/dog/selection" },
  room: {
    background: "/assets/dog/room/empty-room.webp",
    mobileBackground: "/assets/dog/room/empty-room-mobile.webp",
    doorplate: sharedAssets.nameplate,
  },
  preparation: {
    trunk: "/assets/car/car-trunk.webp",
    documents: "/assets/car/adoption-documents.webp",
    idCard: "/assets/car/id-card.webp",
    peePad: "/assets/car/pee-pad.webp",
  },
  feeding: {
    room: "/assets/dog/room/empty-room.webp",
    mobileRoom: "/assets/dog/room/empty-room-mobile.webp",
    food: "/assets/dog/room/food.webp",
    waterBowl: "/assets/dog/room/water-bowl.webp",
    foodBowl: "/assets/dog/room/food-bowl.webp",
    emptyWaterBowl: "/assets/dog/pet-journey/empty-water-bowl.webp",
    emptyFoodBowl: "/assets/dog/pet-journey/empty-food-bowl.webp",
    waterBottle: "/assets/shared/waterbottle.webp",
  },
  life: {
    root: "/assets/dog/pet-journey",
    shibaRoot: "/assets/dog/pet-journey/shiba",
    busyCareTransition: "/assets/dog/pet-journey/shiba/busy-day-transition.mp4",
  },
  daily: {
    root: "/assets/dog/walking",
    shibaRoot: "/assets/dog/walking/shiba",
  },
} as const;

/** 犬隻專屬資料集合；共用 UI 透過 species-config 取得。 */
export const dogSpeciesData = {
  id: "dog" as const,
  breeds: dogBreeds,
  roomItems: dogRoomItems,
  hazards: dogHazards,
  trunkItems: dogDepartureTrunkItems,
  lifeScenarios: dogLifeScenarios,
  breedChallenges: getDogBreedChallengeScenarios,
  journeyItems: dogJourneyItems,
  assets: dogAssets,
} as const;
