import { getDogBreedChallengeScenarios } from "./dog/breed-challenges";
import { dogJourneyItems } from "./dog/journey";
import { dogLifeScenarios } from "./dog/scenarios";
import { dogBreeds } from "./dog/selection";
import { dogDepartureTrunkItems, dogHazards, dogRoomItems } from "./dog/preparation";

/**
 * 犬隻專屬素材入口。
 * 所有犬隻素材集中於 public/assets/dog；共用元件應從此設定讀取。
 */
export const dogAssets = {
  selection: { root: "/assets/dog/selection" },
  room: {
    background: "/assets/dog/room/empty-room.png",
    mobileBackground: "/assets/dog/room/empty-room-mobile.png",
    doorplate: "/assets/dog/room/nameplate.png",
  },
  preparation: {
    trunk: "/assets/dog/preparation/car-trunk.png",
    documents: "/assets/dog/preparation/adoption-documents.png",
    idCard: "/assets/dog/preparation/id-card.png",
    peePad: "/assets/dog/preparation/pee-pad.png",
  },
  feeding: {
    room: "/assets/dog/room/empty-room.png",
    mobileRoom: "/assets/dog/room/empty-room-mobile.png",
    food: "/assets/dog/room/food.png",
    waterBowl: "/assets/dog/room/water-bowl.png",
    foodBowl: "/assets/dog/room/food-bowl.png",
    emptyWaterBowl: "/assets/dog/pet-journey/empty-water-bowl.png",
    emptyFoodBowl: "/assets/dog/pet-journey/empty-food-bowl.png",
    waterBottle: "/assets/shared/waterbottle.png",
  },
  life: { root: "/assets/dog/pet-journey" },
  daily: { root: "/assets/dog/walking" },
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
