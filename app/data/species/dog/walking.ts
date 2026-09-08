/**
 * 犬隻散步資料。
 * 場景、路徑、手機位置與預載素材都只屬於犬隻；共用旅程元件請由此匯入。
 */
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

type WalkingSceneLayoutPoint = { x: number; y: number; scale: number };

type WalkingSceneLayout = {
  startX: number; startY: number; endX: number; endY: number; scale: number;
  mobileStartX: number; mobileStartY: number; mobileScale: number;
  turnAt?: number; waypoint?: WalkingSceneLayoutPoint; endScale?: number;
  mobileWaypoint?: WalkingSceneLayoutPoint; mobileEndX?: number; mobileEndY?: number;
  mobileEndScale?: number; poop?: { x: number; y: number; size: number };
  mobilePoop?: { x: number; y: number; size: number };
};

// 散步人物位置設定：桌機與手機的人物＋小狗路徑都集中在這裡。
// x / y 都是相對於散步 stage 的百分比座標，使用 top/left 定位；請避免負值或超出 0～100。
// 之後要微調 Mac/Safari/Chrome 的人物位置，只改這個 walkingSceneLayout，不用改 CSS。
export const walkingSceneLayout: Record<number, WalkingSceneLayout> = {
  0: {
    startX: 30, startY: 50, endX: 65, endY: 50, scale: 1.5, endScale: 0.3,
    turnAt: 0.55, waypoint: { x: 70, y: 60, scale: 1.5 },
    mobileStartX: 35, mobileStartY: 50, mobileScale: 0.7,
    mobileWaypoint: { x: 70, y: 60, scale: 0.7 }, mobileEndX: 70, mobileEndY: 50, mobileEndScale: 0.3,
  },
  1: {
    startX: 25, startY: 60, endX: 70, endY: 45, scale: 1.5, endScale: 1,
    mobileStartX: 40, mobileStartY: 60, mobileScale: 1,
    mobileEndX: 60, mobileEndY: 45, mobileEndScale: 0.5,
  },
  2: {
    startX: 20, startY: 58, endX: 90, endY: 58, scale: 1.5, endScale: 1.5,
    mobileStartX: 30, mobileStartY: 65, mobileScale: 1,
    mobileEndX: 78, mobileEndY: 65, mobileEndScale: 1,
    poop: { x: 70, y: 85, size: 20 }, mobilePoop: { x: 65, y: 85, size: 40 },
  },
  3: {
    startX: 25, startY: 50, endX: 70, endY: 60, scale: 0.3, endScale: 1.5,
    turnAt: 0.55, waypoint: { x: 30, y: 60, scale: 1.5 },
    mobileStartX: 30, mobileStartY: 50, mobileScale: 0.4,
    mobileWaypoint: { x: 40, y: 55, scale: 0.7 }, mobileEndX: 65, mobileEndY: 55, mobileEndScale: 0.82,
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
