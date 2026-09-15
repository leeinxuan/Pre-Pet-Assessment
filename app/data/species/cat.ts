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
    mixedCat: "/assets/cat/selection/mixed-cat.png",
    // TODO(cat-assets): 請補入英國短毛貓專用插圖；目前以既有中性短毛貓插圖作為安全 fallback。
    britishShorthair: "/assets/cat/selection/british-shorthair.png",
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
    teaserWand: "/assets/cat/room/cat-teaser-wand.png",
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
    emptyFoodBowl: "/assets/cat/feeding/empty-food-bowl.png",
    emptyWaterBowl: "/assets/cat/feeding/empty-water-bowl.png",
    hungryScaredCat: "/assets/cat/feeding/orange-cat-hungry-scared.png",
    happyCat: "/assets/cat/feeding/orange-cat-happy.png",
    seasonedLeftovers: "/assets/cat/feeding/seasoned-leftovers.png",
    vegetablesFruit: "/assets/cat/feeding/vegetables-fruit.png",
    leftoverFishBones: "/assets/cat/feeding/leftover-fish-bones.png",
    waterBottle: "/assets/shared/waterbottle.png",
    chocolate: "/assets/shared/chocolate.png",
  },
  daily: {
    inspectionBackground: "/assets/cat/room/cat-safe-room-secured.png",
    // 相容尚未移除的舊版元件；現行互動使用下方的狀態素材。
    litterBox: "/assets/cat/cleaning/dirty-litter-box.png",
    dirtyLitterBox: "/assets/cat/cleaning/dirty-litter-box.png",
    cleanLitterBox: "/assets/cat/cleaning/clean-litter-box.png",
    replacementLitterBox: "/assets/cat/cleaning/replacement-litter-box.png",
    replacementLitterBoxIcon: "/assets/cat/cleaning/replacement-litter-box-icon.png",
    litterScoop: "/assets/cat/cleaning/litter-scoop.png",
    catPoop: "/assets/cat/cleaning/cat-poop.png",
    urineClump: "/assets/cat/cleaning/urine-clump.png",
    trashBin: "/assets/cat/cleaning/trash-bin.png",
  },
  preparation: {
    // TODO(cat-assets): 尚未提供專用外出籠、文件素材，暫用安全中性 fallback。
    carrier: "/assets/car/carrier.png",
    documents: "/assets/car/adoption-documents.png",
  },
  life: {
    safeRoom: "/assets/cat/room/cat-safe-room.png",
    mixedCat: "/assets/cat/selection/mixed-cat.png",
    britishShorthair: "/assets/cat/selection/british-shorthair.png",
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
