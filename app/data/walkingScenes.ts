export const walkingPrepItems = [
  { id: "leash", label: "牽繩／胸背帶", image: "/assets/car/leash.png" },
  { id: "bag", label: "撿便袋", image: "/assets/walking/poop-bag.png" },
  { id: "water", label: "水", image: "/assets/pet-journey/waterbottle.png" },
] as const;

export const walkingScenes = [
  { title: "家門口往人行道", image: "/assets/walking/door-to-sidewalk.jpg", poopEvent: false },
  { title: "公園", image: "/assets/walking/park.png", poopEvent: false },
  { title: "公園 2", image: "/assets/walking/park-poop-event.png", poopEvent: true },
  { title: "人行道往家門口", image: "/assets/walking/sidewalk-to-home.jpg", poopEvent: false },
] as const;

export const walkingPreloadImages = [
  ...walkingScenes.map((scene) => scene.image),
  ...walkingPrepItems.map((item) => item.image),
  "/assets/walking/walker-and-dog.png",
  "/assets/walking/walker-and-dog-poop.png",
  "/assets/walking/poop.png",
] as const;