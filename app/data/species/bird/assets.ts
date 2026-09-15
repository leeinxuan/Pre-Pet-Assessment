/** 鳥類專屬插圖尚在製作；目前借用功能相近的既有素材，集中在此以便替換。 */
export const birdAssets = {
  selection: { bird: "/assets/species/bird.png" },
  room: {
    background: "/assets/cat/room/cat-safe-room.png", mobileBackground: "/assets/cat/room/cat-safe-room.png",
    cage: "/assets/dog/preparation/carrier.png", perch: "/assets/dog/room/toy.png", bowl: "/assets/dog/room/food-bowl.png",
    water: "/assets/cat/feeding/cat-water-bowl.png", toy: "/assets/dog/room/toy.png", tray: "/assets/cat/room/cat-litter-box.png",
    thermometer: "/assets/cat/room/cooling-mat.png", plant: "/assets/cat/room/lily-plant.png",
  },
  preparation: { carrier: "/assets/dog/preparation/carrier.png", cover: "/assets/cat/room/cat-hideaway.png", food: "/assets/dog/room/food.png", water: "/assets/shared/waterbottle.png", idCard: "/assets/dog/preparation/id-card.png", documents: "/assets/dog/preparation/adoption-documents.png" },
} as const;
