/**
 * 兔版素材入口。
 * 所有值都指向 public 中已存在的兔子或共用車用素材，避免缺圖造成流程中斷。
 */
export const rabbitAssets = {
  selection: { rabbit: "/assets/species/rabbit.png" },
  room: {
    background: "/assets/rabbit/room/rabbit-room.png",
    mobileBackground: "/assets/rabbit/room/rabbit-room.png",
    safeBackground: "/assets/rabbit/room/rabbit-safe-room.png",
    fenceInterior: "/assets/rabbit/room/bg-fence-interior.png",
    fenceInteriorWithMat: "/assets/rabbit/room/bg-fence-interior_anti-slip-mat.png",
    hayRack: "/assets/rabbit/room/hay-rack.png",
    waterBowl: "/assets/rabbit/room/heavy-water-bowl.png",
    litterBox: "/assets/rabbit/room/litter-box.png",
    hidingBox: "/assets/rabbit/room/hiding-box.png",
    antiSlipMat: "/assets/rabbit/room/anti-slip-mat.png",
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
    rabbitUnhappy: "/assets/rabbit/feeding/rabbit-unhappy.png",
    rabbitHappy: "/assets/rabbit/feeding/rabbit-happy.png",
    hayRackEmpty: "/assets/rabbit/feeding/hay-rack-empty.png",
    waterBowlEmpty: "/assets/rabbit/feeding/heavy-water-bowl-empty.png",
    leafyVeggie: "/assets/rabbit/feeding/leafy-veggie.png",
    carrotMain: "/assets/rabbit/feeding/carrot-main.png",
    onion: "/assets/rabbit/feeding/onion.png",
    macadamia: "/assets/rabbit/feeding/macadamia.png",
  },
  preparation: {
    carrier: "/assets/car/rabbit-carrier.png",
    antiSlipLiner: "/assets/car/anti-slip-liner.png",
    hay: "/assets/car/hay-in-carrier.png",
    idCard: "/assets/car/id-card.png",
    documents: "/assets/car/adoption-documents.png",
    coolingPack: "/assets/car/cooling-pack.png",
  },
  daily: { checkBackground: "/assets/cat/room/cat-safe-room.png" },
} as const;
