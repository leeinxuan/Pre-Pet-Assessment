/**
 * 犬隻散步資料。
 * 場景、路徑、手機位置與預載素材都只屬於犬隻；共用旅程元件請由此匯入。
 */

const dogShibaWalkingRoot = "/assets/dog/walking/shiba";

export const dogShibaWalkingAsset = (fileName: string) => `${dogShibaWalkingRoot}/${fileName}`;

export const walkingPrepItems = [
  { id: "leash", label: "牽繩／胸背帶", image: "/assets/car/leash.webp", imageScale: 1 },
  { id: "bag", label: "撿便袋", image: "/assets/dog/walking/poop-bag-1.webp", imageScale: 1 },
  { id: "water", label: "水", image: "/assets/car/water-bottle.webp", imageScale: 2 },
] as const;

/** §5.3.2 外出安全與法規；互動畫面由犬隻資料提供，避免在共用元件硬寫文案。 */
export const walkingLawCopy = {
  incorrect: {
    eyebrow: "外出安全與法規提醒",
    title: "自由探索，也需要有能立即保護牠的距離",
    paragraphs: [
      "《動物保護法》第 20 條要求寵物出入公共場所或公眾得出入之場所時須有人伴同；各縣市**依動物保護自治條例**，在**公共場所或公眾得出入之場所**要求使用牽繩、箱籠或其他適當防護措施。外出前應查明所在地規定。",
      "即使在沒有明確禁止的地點，牽繩仍能降低走失、突然衝向車道、驚嚇他人或與其他動物衝突的風險。保持牽繩鬆弛，狗狗仍然可以嗅聞和探索。",
    ],
  },
  correct: {
    eyebrow: "你選得很好",
    title: "牽繩不是限制探索，而是讓探索更安全",
    paragraphs: [
      "繫好合適的胸背帶或項圈並保持牽繩鬆弛，狗狗仍然可以嗅聞、觀察環境；遇到車輛、陌生動物或突然受驚時，你也能及時控制距離，降低走失與衝突風險。",
      "《動物保護法》第 20 條要求寵物出入公共場所或公眾得出入之場所時須有人伴同，各縣市**依動物保護自治條例**要求在**公共場所或公眾得出入之場所**使用牽繩、箱籠或其他適當防護措施。因此另一個「不繫牽繩」的選項，即使看似自由，也不是安全的散步方式。",
    ],
  },
} as const;

export const walkingScenes = [
  { title: "家門口往人行道", image: "/assets/dog/walking/door-to-sidewalk.webp", mobileImage: "/assets/dog/walking/door-to-sidewalk-mobile.webp", poopEvent: false },
  { title: "公園", image: "/assets/dog/walking/park.webp", mobileImage: "/assets/dog/walking/park-mobile.webp", poopEvent: false },
  { title: "公園 2", image: "/assets/dog/walking/park-poop-event.webp", mobileImage: "/assets/dog/walking/park-poop-event-mobile.webp", poopEvent: true },
  { title: "人行道往家門口", image: "/assets/dog/walking/sidewalk-to-home.webp", mobileImage: "/assets/dog/walking/sidewalk-to-home-mobile.webp", poopEvent: false },
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
  dogShibaWalkingAsset("walker-and-dog.webp"),
  dogShibaWalkingAsset("walker-and-dog-poop.webp"),
  dogShibaWalkingAsset("walker-dog-bag.webp"),
  "/assets/dog/walking/poop-bag-1.webp",
  "/assets/dog/walking/poop.webp",
] as const;
