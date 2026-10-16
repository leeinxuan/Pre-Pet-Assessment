const rabbitHayAsset = "/assets/car/hay-in-carrier.webp";

/**
 * 兔版素材入口。
 * 所有值都指向 public 中已存在的兔子或共用車用素材，避免缺圖造成流程中斷。
 */
export const rabbitAssets = {
  selection: { rabbit: "/assets/species/rabbit.webp" },
  room: {
    background: "/assets/rabbit/room/rabbit-room.webp",
    mobileBackground: "/assets/rabbit/room/rabbit-room.webp",
    safeBackground: "/assets/rabbit/room/rabbit-safe-room.webp",
    fenceInterior: "/assets/rabbit/room/bg-fence-interior.webp",
    fenceInteriorWithMat: "/assets/rabbit/room/bg-fence-interior_anti-slip-mat.webp",
    hayRack: "/assets/rabbit/room/hay-rack.webp",
    waterBowl: "/assets/rabbit/room/heavy-water-bowl.webp",
    litterBox: "/assets/rabbit/room/litter-box.webp",
    hidingBox: "/assets/rabbit/room/hiding-box.webp",
    antiSlipMat: "/assets/rabbit/room/anti-slip-mat.webp",
    coolingMat: "/assets/rabbit/room/cooling-mat.webp",
    chewToy: "/assets/rabbit/room/chew-toy.webp",
    digBox: "/assets/rabbit/room/dig-box.webp",
    cable: "/assets/rabbit/room/cable.webp",
    toxicPlant: "/assets/rabbit/room/toxic-plant.webp",
    plasticItem: "/assets/rabbit/room/plastic-item.webp",
    foamMat: "/assets/rabbit/room/foam-mat-with-edges.webp",
    highPlatform: "/assets/rabbit/room/high-platform.webp",
    fencePen: "/assets/rabbit/room/fence-pen.webp",
    fencePenInRoom: "/assets/rabbit/room/fence-pen-in-room.webp",
  },
  feeding: {
    /** 第一餐與房間初期備量共用同一張既有牧草素材。 */
    hay: rabbitHayAsset,
    rabbitUnhappy: "/assets/rabbit/feeding/rabbit-unhappy.webp",
    rabbitHappy: "/assets/rabbit/feeding/rabbit-happy.webp",
    hayRackEmpty: "/assets/rabbit/feeding/hay-rack-empty.webp",
    hayRack: "/assets/rabbit/room/hay-rack.webp",
    waterBowlEmpty: "/assets/rabbit/feeding/heavy-water-bowl-empty.webp",
    leafyVeggie: "/assets/rabbit/feeding/leafy-veggie.webp",
    carrotMain: "/assets/rabbit/feeding/carrot-main.webp",
    onion: "/assets/rabbit/feeding/onion.webp",
    macadamia: "/assets/rabbit/feeding/macadamia.webp",
  },
  preparation: {
    carrier: "/assets/car/rabbit-carrier.webp",
    antiSlipLiner: "/assets/car/anti-slip-liner.webp",
    hay: rabbitHayAsset,
    waterSupply: "/assets/car/water-supply.webp",
    coolingPack: "/assets/car/cooling-pack.webp",
  },
  daily: {
    checkBackground: "/assets/cat/room/cat-safe-room.webp",
    fecalPellets: "/assets/rabbit/pet-journey/Fecal pellets.png",
    cecotropes: "/assets/rabbit/pet-journey/Cecotropes.png",
  },
  /** 寵物旅程情境影片（rabbit-frames-workflow.md 的 ①–⑪）。 */
  petJourney: {
    arrivalTransition: "/assets/rabbit/pet-journey/arrival-transition.mp4",
    firstDay: "/assets/rabbit/pet-journey/first-day.mp4",
    summerHeat: "/assets/rabbit/pet-journey/summer-heat.mp4",
    sick: "/assets/rabbit/pet-journey/sick.mp4",
    cecotropes: "/assets/rabbit/pet-journey/cecotropes.mp4",
    busyDailyCare: "/assets/rabbit/pet-journey/busy-daily-care.mp4",
    busyDayTransition: "/assets/rabbit/pet-journey/busy-day-transition.mp4",
    seniorLife: "/assets/rabbit/pet-journey/senior-life.mp4",
    timePassesAging: "/assets/rabbit/pet-journey/time-passes-aging.mp4",
    correctPrimary: "/assets/rabbit/pet-journey/correct-answer.mp4",
    correctSecondary: "/assets/rabbit/pet-journey/correct-answer2.mp4",
  },
} as const;
