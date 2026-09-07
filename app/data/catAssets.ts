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
    // TODO(cat-assets): 尚未提供每日巡視專用背景，暫以已存在的安全房素材作為中性 fallback。
    inspectionBackground: "/assets/cat/room/cat-safe-room-secured.png",
    litterBox: "/assets/cat/room/cat-litter-box.png",
    // TODO(cat-assets): 尚未提供貓砂鏟，暫用既有中性清潔工具；補入正式素材後只需改此路徑。
    litterScoop: "/assets/room/cleaner.png",
  },
  preparation: {
    // TODO(cat-assets): 尚未提供貓咪外出籠、文件與後車廂素材，暫沿用既有中性運輸素材。
    carrier: "/assets/car/carrier.png",
    documents: "/assets/car/adoption-documents.png",
  },
  life: {
    // TODO(cat-assets): 尚未提供接回家／忙碌照護／高齡生活的專用情境影片，先使用貓咪圖像與安全房作 fallback。
    safeRoom: "/assets/cat/room/cat-safe-room.png",
    orangeCat: "/assets/cat/selection/orange-cat.png",
    tabbyCat: "/assets/cat/selection/tabby-cat.png",
  },
} as const;
