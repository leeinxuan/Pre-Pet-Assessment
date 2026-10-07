/** 鳥籠預備與第一餐共用同一份主食飼料素材，費用與日常操作仍各自處理。 */
const birdSeedMixAsset = "/assets/bird/feeding/bird-seed-mix.webp";

/** 鸚鵡素材依用途集中管理；路徑對應 public/assets/bird 的分類資料夾。 */
export const birdAssets = {
  selection: { bird: "/assets/species/bird.png" },
  room: {
    background: "/assets/bird/room/bird-safe-room.webp",
    mobileBackground: "/assets/bird/room/bird-safe-room.webp",
    /** 物品欄使用 cage；成功放進完整房間後使用正面視角。 */
    cage: "/assets/bird/room/bird-cage.webp",
    cageFront: "/assets/bird/room/bird-cage-front.webp",
    cageInterior: "/assets/bird/room/bg-cage-interior.webp",
    cageInteriorWithTray: "/assets/bird/room/bg-cage-interior-feces-tray.webp",
    perch: "/assets/bird/room/perch-set.webp",
    perchParts: [
      "/assets/bird/room/perch-set-1.png",
      "/assets/bird/room/perch-set-2.png",
      "/assets/bird/room/perch-set-3.png",
    ],
    bowl: "/assets/bird/room/food-bowl.png",
    water: "/assets/bird/room/water-bowl.png",
    toy: "/assets/bird/room/chew-toy.png",
    climbingToy: "/assets/bird/room/climbing-toy.png",
    tray: "/assets/bird/room/feces-tray.png",
    thermometer: "/assets/bird/room/thermometer.png",
    plant: "/assets/bird/room/toxic-plant.webp",
    hazards: {
      teflonPan: "/assets/bird/room/teflon-pan.png",
      incenseCandle: "/assets/bird/room/incense-candle.png",
      sprayAerosol: "/assets/bird/room/spray-aerosol.png",
      mirrorToy: "/assets/bird/room/mirror-toy.png",
      roundCage: "/assets/bird/room/round-cage.webp",
    },
    initialFood: birdSeedMixAsset,
  },
  feeding: {
    background: "/assets/bird/feeding/bird-feeding-bg.webp",
    happy: "/assets/bird/feeding/bird-happy.webp",
    unhappy: "/assets/bird/feeding/bird-unhappy.webp",
    seedMix: birdSeedMixAsset,
    freshVeggie: "/assets/bird/feeding/fresh-veggie.png",
    emptyFoodBowl: "/assets/bird/feeding/feeding-food-bowl-empty.png",
    fullFoodBowl: "/assets/bird/feeding/feeding-food-bowl-full.webp",
    emptyWaterBowl: "/assets/bird/feeding/feeding-water-bowl-empty.png",
    fullWaterBowl: "/assets/bird/feeding/feeding-water-bowl-full.png",
    waterBottle: "/assets/shared/waterbottle.png",
    chocolate: "/assets/bird/feeding/chocolate.png",
    avocado: "/assets/bird/feeding/avocado.webp",
    saltySnack: "/assets/bird/feeding/salty-snack.png",
  },
  dailyGame: {
    cage: {
      dirty: "/assets/bird/dailygame/cage-dirty.webp",
      clean: "/assets/bird/dailygame/cage-clean.webp",
      doorOpen: "/assets/bird/dailygame/cage-door-open.webp",
      trayOutDirty: "/assets/bird/dailygame/cage-tray-out-dirty.webp",
      trayOutClean: "/assets/bird/dailygame/cage-tray-out-clean.webp",
    },
    birdCloseup: "/assets/bird/dailygame/bird-closeup-interactive.webp",
    beddingDirty: "/assets/bird/dailygame/bedding-dirty.webp",
    droppings: {
      healthy: "/assets/bird/dailygame/droppings-health.png",
      watery: "/assets/bird/dailygame/droppings-watery.png",
      small: "/assets/bird/dailygame/droppings-small.png",
    },
    parts: {
      eyes: { normal: "/assets/bird/dailygame/part-eye-normal.webp", abnormal: "/assets/bird/dailygame/part-eye-abnormal.webp" },
      feathers: { normal: "/assets/bird/dailygame/part-feather-normal.webp", abnormal: "/assets/bird/dailygame/part-feather-abnormal.webp" },
      feet: { normal: "/assets/bird/dailygame/part-feet-normal.webp", abnormal: "/assets/bird/dailygame/part-feet-abnormal.webp" },
      breathing: { normal: "/assets/bird/dailygame/part-breath-normal.webp", abnormal: "/assets/bird/dailygame/part-breath-abnormal.webp" },
    },
    onHand: {
      idle: "/assets/bird/dailygame/bird-on-hand-idle.webp",
      nod: "/assets/bird/dailygame/bird-on-hand-nod.webp",
      sing: "/assets/bird/dailygame/bird-on-hand-sing.webp",
    },
    magnifier: "/assets/bird/dailygame/magnifier.png",
  },
  preparation: {
    carrier: "/assets/car/bird-carrier.webp",
    cover: "/assets/car/bird-cover-cloth.png",
    food: birdSeedMixAsset,
    water: "/assets/car/bird-water-supply.png",
    idCard: "/assets/car/id-card.png",
    documents: "/assets/car/adoption-documents.png",
  },
} as const;
