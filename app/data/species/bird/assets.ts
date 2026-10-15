/** 鳥籠預備與第一餐共用同一份主食飼料素材，費用與日常操作仍各自處理。 */
const birdSeedMixAsset = "/assets/bird/feeding/bird-seed-mix.webp";

/** 鸚鵡素材依用途集中管理；路徑對應 public/assets/bird 的分類資料夾。 */
export const birdAssets = {
  selection: { bird: "/assets/species/bird.webp" },
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
      "/assets/bird/room/perch-set-1.webp",
      "/assets/bird/room/perch-set-2.webp",
      "/assets/bird/room/perch-set-3.webp",
    ],
    bowl: "/assets/bird/room/food-bowl.webp",
    water: "/assets/bird/room/water-bowl.webp",
    toy: "/assets/bird/room/chew-toy.webp",
    climbingToy: "/assets/bird/room/climbing-toy.webp",
    tray: "/assets/bird/room/feces-tray.webp",
    thermometer: "/assets/bird/room/thermometer.webp",
    plant: "/assets/bird/room/toxic-plant.webp",
    hazards: {
      teflonPan: "/assets/bird/room/teflon-pan.webp",
      incenseCandle: "/assets/bird/room/incense-candle.webp",
      sprayAerosol: "/assets/bird/room/spray-aerosol.webp",
      mirrorToy: "/assets/bird/room/mirror-toy.webp",
      roundCage: "/assets/bird/room/round-cage.webp",
    },
    initialFood: birdSeedMixAsset,
  },
  feeding: {
    background: "/assets/bird/feeding/bird-feeding-bg.webp",
    happy: "/assets/bird/feeding/bird-happy.webp",
    unhappy: "/assets/bird/feeding/bird-unhappy.webp",
    seedMix: birdSeedMixAsset,
    freshVeggie: "/assets/bird/feeding/fresh-veggie.webp",
    emptyFoodBowl: "/assets/bird/feeding/feeding-food-bowl-empty.webp",
    fullFoodBowl: "/assets/bird/feeding/feeding-food-bowl-full.webp",
    emptyWaterBowl: "/assets/bird/feeding/feeding-water-bowl-empty.webp",
    fullWaterBowl: "/assets/bird/feeding/feeding-water-bowl-full.webp",
    waterBottle: "/assets/shared/waterbottle.webp",
    chocolate: "/assets/bird/feeding/chocolate.webp",
    avocado: "/assets/bird/feeding/avocado.webp",
    saltySnack: "/assets/bird/feeding/salty-snack.webp",
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
      healthy: "/assets/bird/dailygame/droppings-health.webp",
      watery: "/assets/bird/dailygame/droppings-watery.webp",
      small: "/assets/bird/dailygame/droppings-small.webp",
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
    magnifier: "/assets/shared/magnifier.webp",
  },
  preparation: {
    carrier: "/assets/car/bird-carrier.webp",
    cover: "/assets/car/bird-cover-cloth.webp",
    food: birdSeedMixAsset,
    water: "/assets/car/water-supply.webp",
  },
} as const;
