const rabbitHayAsset = "/assets/car/hay-in-carrier.webp";

/**
 * 兔版素材入口。
 * 所有值都指向 public 中已存在的兔子或共用車用素材，避免缺圖造成流程中斷。
 */
export const rabbitAssets = {
  selection: { rabbit: "/assets/species/rabbit.png" },
  room: {
    background: "/assets/rabbit/room/rabbit-room.webp",
    mobileBackground: "/assets/rabbit/room/rabbit-room.webp",
    safeBackground: "/assets/rabbit/room/rabbit-safe-room.webp",
    fenceInterior: "/assets/rabbit/room/bg-fence-interior.webp",
    fenceInteriorWithMat: "/assets/rabbit/room/bg-fence-interior_anti-slip-mat.webp",
    hayRack: "/assets/rabbit/room/hay-rack.webp",
    waterBowl: "/assets/rabbit/room/heavy-water-bowl.png",
    litterBox: "/assets/rabbit/room/litter-box.png",
    hidingBox: "/assets/rabbit/room/hiding-box.png",
    antiSlipMat: "/assets/rabbit/room/anti-slip-mat.webp",
    coolingMat: "/assets/rabbit/room/cooling-mat.png",
    chewToy: "/assets/rabbit/room/chew-toy.png",
    digBox: "/assets/rabbit/room/dig-box.png",
    cable: "/assets/rabbit/room/cable.png",
    toxicPlant: "/assets/rabbit/room/toxic-plant.png",
    plasticItem: "/assets/rabbit/room/plastic-item.png",
    foamMat: "/assets/rabbit/room/foam-mat-with-edges.png",
    highPlatform: "/assets/rabbit/room/high-platform.png",
    fencePen: "/assets/rabbit/room/fence-pen.png",
    fencePenInRoom: "/assets/rabbit/room/fence-pen-in-room.png",
  },
  feeding: {
    /** 第一餐與房間初期備量共用同一張既有牧草素材。 */
    hay: rabbitHayAsset,
    rabbitUnhappy: "/assets/rabbit/feeding/rabbit-unhappy.webp",
    rabbitHappy: "/assets/rabbit/feeding/rabbit-happy.webp",
    hayRackEmpty: "/assets/rabbit/feeding/hay-rack-empty.png",
    hayRack: "/assets/rabbit/room/hay-rack.webp",
    waterBowlEmpty: "/assets/rabbit/feeding/heavy-water-bowl-empty.png",
    leafyVeggie: "/assets/rabbit/feeding/leafy-veggie.webp",
    carrotMain: "/assets/rabbit/feeding/carrot-main.png",
    onion: "/assets/rabbit/feeding/onion.webp",
    macadamia: "/assets/rabbit/feeding/macadamia.png",
  },
  preparation: {
    carrier: "/assets/car/rabbit-carrier.webp",
    antiSlipLiner: "/assets/car/anti-slip-liner.png",
    hay: rabbitHayAsset,
    idCard: "/assets/car/id-card.png",
    documents: "/assets/car/adoption-documents.png",
    coolingPack: "/assets/car/cooling-pack.png",
  },
  daily: { checkBackground: "/assets/cat/room/cat-safe-room.webp" },
} as const;
