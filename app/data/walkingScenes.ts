export const walkingPrepItems = [
  { id: "leash", label: "牽繩／胸背帶", image: "/assets/car/leash.png" },
  { id: "bag", label: "撿便袋", image: "/assets/walking/poop-bag-1.png" },
  { id: "water", label: "水", image: "/assets/pet-journey/waterbottle.png" },
] as const;

export const walkingScenes = [
  { title: "家門口往人行道", image: "/assets/walking/door-to-sidewalk.jpg", mobileImage: "/assets/walking/door-to-sidewalk-mobile.jpg", poopEvent: false },
  { title: "公園", image: "/assets/walking/park.png", mobileImage: "/assets/walking/park-mobile.jpg", poopEvent: false },
  { title: "公園 2", image: "/assets/walking/park-poop-event.png", mobileImage: "/assets/walking/park-poop-event-mobile.jpg", poopEvent: true },
  { title: "人行道往家門口", image: "/assets/walking/sidewalk-to-home.jpg", mobileImage: "/assets/walking/sidewalk-to-home-mobile.jpg", poopEvent: false },
] as const;

type MobileWalkingPoint = {
  left: number;
  bottom: number;
  scale: number;
};

type MobileWalkingScenePlacement = {
  start: MobileWalkingPoint;
  waypoint?: MobileWalkingPoint;
  end: MobileWalkingPoint;
  poop?: { left: number; bottom: number; size: number };
};

// 僅手機版散步位置設定：可在這裡單獨微調人物＋小狗、轉折點、尺寸與便便位置。
// left / bottom 為相對於手機 1:1 場景容器的百分比；不會影響桌機版路徑。
export const mobileWalkingScenePlacements: Record<number, MobileWalkingScenePlacement> = {
  // 場景 1：家門口往人行道，兩段式往遠方移動。
  0: {
    start: { left: 8, bottom: 23, scale: 0.7 },
    waypoint: { left: 40, bottom: 18, scale: 0.7 },
    end: { left: 40, bottom: 40, scale: 0.4 },
  },
  // 場景 2：公園，斜直線移動；沒有 waypoint 即為直線。
  1: {
    start: { left: 7, bottom: 0, scale: 1 },
    end: { left: 35, bottom: 30, scale: 0.6 },
  },
  // 場景 3：公園便便事件。poop 的 left / bottom / size 可獨立調整，不會跟著人物位置改動。
  2: {
    start: { left: 8, bottom: 0, scale: 1 },
    end: { left: 78, bottom: 0, scale: 1 },
    poop: { left: 78, bottom: 15, size: 50 },
  },
  // 場景 4：人行道回家門口。
  3: {
    start: { left: 4, bottom: 35, scale: 0.4 },
    waypoint: { left: 5, bottom: 20, scale: 0.7 },
    end: { left: 45, bottom: 20, scale: 0.82 },
  },
};

export const walkingPreloadImages = [
  ...walkingScenes.map((scene) => scene.image),
  ...walkingScenes.map((scene) => scene.mobileImage),
  ...walkingPrepItems.map((item) => item.image),
  "/assets/walking/walker-and-dog.png",
  "/assets/walking/walker-and-dog-poop.png",
  "/assets/walking/walker-dog-bag.png",
  "/assets/walking/poop-bag-1.png",
  "/assets/walking/poop.png",
] as const;
