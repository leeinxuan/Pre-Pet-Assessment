/**
 * 倉鼠所有專屬視覺素材的唯一入口。
 * 互動元件只讀資料設定，不能自行硬寫 /assets/hamster 路徑。
 */
export const hamsterAssets = {
  selection: { hamster: "/assets/hamster/feeding/hamster-happy.webp" },
  room: {
    initialBackground: "/assets/hamster/room/direct-sunlight-spot.webp",
    safeBackground: "/assets/hamster/room/hamster-safe-room.webp",
    cageInterior: "/assets/hamster/room/bg-cage-interior.webp",
    cageInteriorWithBedding: "/assets/hamster/room/bg-bedding.webp",
    cage: "/assets/hamster/room/hamster-cage.webp",
    cageFront: "/assets/hamster/room/hamster-cage-front.webp",
    exerciseWheel: "/assets/hamster/room/exercise-wheel.webp",
    waterBottle: "/assets/hamster/room/water-bottle.png",
    foodBowl: "/assets/hamster/room/food-bowl.png",
    hideout: "/assets/hamster/room/hideout.webp",
    sandBathBox: "/assets/hamster/room/sand-bath-box.webp",
    bedding: "/assets/hamster/room/bedding.webp",
    gnawStick: "/assets/hamster/room/gnaw-stick.webp",
    hazards: {
      cable: "/assets/hamster/room/cable.webp",
      looseGapCage: "/assets/hamster/room/loose-gap-cage.png",
      directSunlightSpot: "/assets/hamster/room/direct-sunlight-spot.webp",
      strongScentItem: "/assets/hamster/room/strong-scent-item.png",
    },
  },
  feeding: {
    pellet: "/assets/hamster/feeding/pellet.webp",
    sunflowerSeeds: "/assets/hamster/feeding/sunflower-seeds.webp",
    onion: "/assets/hamster/feeding/onion.webp",
    citrusFruit: "/assets/hamster/feeding/citrus-fruit.webp",
    unhappy: "/assets/hamster/feeding/hamster-unhappy.webp",
    happy: "/assets/hamster/feeding/hamster-happy.webp",
    fullFoodBowl: "/assets/hamster/feeding/food-bowl-full.webp",
    fullWaterBottle: "/assets/hamster/feeding/water-bottle-full.png",
  },
  preparation: {
    carrier: "/assets/car/hamster-carrier.webp",
    idCard: "/assets/car/id-card.png",
    adoptionDocuments: "/assets/car/adoption-documents.png",
    trunkBackground: "/assets/car/car-trunk.png",
  },
  dailyInspection: {
    cageInterior: "/assets/hamster/room/bg-cage-interior.webp",
    bedding: "/assets/hamster/room/bedding.webp",
    sandBath: "/assets/hamster/room/sand-bath-box.webp",
  },
} as const;
