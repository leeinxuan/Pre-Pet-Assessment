import {
  catDailyBehaviorScenarioIds,
  catLitterRescueConfig,
} from "../../life-data";
import { getCatBreedChallengeScenarios } from "./cat/breed-challenges";
import { catJourneyItems } from "./cat/journey";
import { catLifeScenarios } from "./cat/scenarios";

/**
 * 貓咪流程唯一的素材路徑映射。
 * 新增或替換貓咪素材時，請優先在這裡調整，避免路徑散落在元件內。
 */
export const catAssets = {
  selection: {
    orangeCat: "/assets/cat/selection/orange-cat.png",
    tabbyCat: "/assets/cat/selection/tabby-cat.png",
  },
  room: {
    safeRoom: "/assets/cat/room/cat-safe-room.png",
    safeRoomSecured: "/assets/cat/room/cat-safe-room-secured.png",
    windowSafetyNet: "/assets/cat/room/window-safety-net.png",
    hideaway: "/assets/cat/room/cat-hideaway.png",
    restSpace: "/assets/cat/room/cat-rest-space.png",
    litterBox: "/assets/cat/room/cat-litter-box.png",
    litter: "/assets/cat/room/cat-litter.png",
    foodBowl: "/assets/cat/feeding/cat-food-bowl.png",
    waterBowl: "/assets/cat/feeding/cat-water-bowl.png",
    scratchingBoard: "/assets/cat/room/cat-scratching-board.png",
    tree: "/assets/cat/room/cat-tree.png",
    lilyPlant: "/assets/cat/room/lily-plant.png",
    humanMedicine: "/assets/cat/room/human-medicine.png",
    yarn: "/assets/cat/room/yarn.png",
    fragrance: "/assets/cat/room/fragrance.png",
    coolingMat: "/assets/cat/room/cooling-mat.png",
  },
  feeding: {
    food: "/assets/cat/feeding/cat-food.png",
    foodBowl: "/assets/cat/feeding/cat-food-bowl.png",
    waterBowl: "/assets/cat/feeding/cat-water-bowl.png",
    seasonedLeftovers: "/assets/cat/feeding/seasoned-leftovers.png",
    vegetablesFruit: "/assets/cat/feeding/vegetables-fruit.png",
    leftoverFishBones: "/assets/cat/feeding/leftover-fish-bones.png",
  },
  daily: {
    // TODO(cat-assets): 補入專用巡視背景與貓砂鏟後，僅需在此替換路徑。
    inspectionBackground: "/assets/cat/room/cat-safe-room-secured.png",
    litterBox: "/assets/cat/room/cat-litter-box.png",
    // 暫用狗狗房間的中性清潔工具素材，待貓咪專用貓砂鏟素材補齊後替換。
    litterScoop: "/assets/dog/room/cleaner.png",
  },
  preparation: {
    // TODO(cat-assets): 尚未提供專用外出籠、文件素材，暫用安全中性 fallback。
    carrier: "/assets/car/carrier.png",
    documents: "/assets/car/adoption-documents.png",
  },
  life: {
    safeRoom: "/assets/cat/room/cat-safe-room.png",
    orangeCat: "/assets/cat/selection/orange-cat.png",
    tabbyCat: "/assets/cat/selection/tabby-cat.png",
  },
} as const;

/** 貓咪專屬資料集合的素材部分；互動題庫仍由既有 cat 設定漸進遷入。 */
export const catSpeciesData = {
  id: "cat" as const,
  assets: catAssets,
  lifeScenarios: catLifeScenarios,
  journeyItems: catJourneyItems,
  breedChallenges: getCatBreedChallengeScenarios,
  dailyBehaviorScenarioIds: catDailyBehaviorScenarioIds,
  litterInspection: catLitterRescueConfig,
} as const;
