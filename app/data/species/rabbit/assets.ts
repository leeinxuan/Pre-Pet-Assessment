/**
 * 兔版素材入口。
 * 兔子專屬素材尚未補齊時，暫用功能與構圖接近的既有素材，待兔子素材補齊後替換。
 * 所有值都指向 public 中已存在的檔案，避免缺圖造成流程中斷。
 */
export const rabbitAssets = {
  selection: { rabbit: "/assets/species/rabbit.png" },
  room: {
    background: "/assets/cat/room/cat-safe-room.png", // 暫用共用素材，待兔子素材補齊後替換。
    mobileBackground: "/assets/cat/room/cat-safe-room.png",
    hayRack: "/assets/dog/room/food-bowl.png",
    waterBowl: "/assets/cat/feeding/cat-water-bowl.png",
    litterBox: "/assets/cat/room/cat-litter-box.png",
    hidingBox: "/assets/cat/room/cat-hideaway.png",
    antiSlipMat: "/assets/cat/room/cooling-mat.png",
    coolingMat: "/assets/cat/room/cooling-mat.png",
    chewToy: "/assets/dog/room/toy.png",
    toxicPlant: "/assets/cat/room/lily-plant.png",
    plasticItem: "/assets/dog/room/small-items.png",
    foamMat: "/assets/cat/room/cooling-mat.png",
    highPlatform: "/assets/cat/room/cat-tree.png",
  },
  feeding: {
    hay: "/assets/dog/room/food.png", // 暫用共用素材，待兔子素材補齊後替換。
    leafyVeggie: "/assets/cat/feeding/vegetables-fruit.png",
    freshWater: "/assets/cat/feeding/cat-water-bowl.png",
    carrotMain: "/assets/cat/feeding/vegetables-fruit.png",
    onion: "/assets/cat/room/lily-plant.png",
    macadamia: "/assets/dog/room/small-items.png",
  },
  preparation: {
    carrier: "/assets/dog/preparation/carrier.png",
    antiSlipLiner: "/assets/cat/room/cooling-mat.png",
    hay: "/assets/dog/room/food.png",
    idCard: "/assets/dog/preparation/id-card.png",
    documents: "/assets/dog/preparation/adoption-documents.png",
    coolingPack: "/assets/cat/room/cooling-mat.png",
  },
  daily: { checkBackground: "/assets/cat/room/cat-safe-room.png" },
} as const;
