/** 犬隻散步活動的資料、素材與固定操作設定。 */
import { dogReport } from "./report";

const dogShibaWalkingRoot = "/assets/dog/walking/shiba";

export const dogShibaWalkingAsset = (fileName: string) => `${dogShibaWalkingRoot}/${fileName}`;

export const walkingPrepItems = [
  { id: "leash", label: "牽繩／胸背帶", image: "/assets/car/leash.webp", imageScale: 1 },
  { id: "bag", label: "撿便袋", image: "/assets/dog/walking/poop-bag-1.webp", imageScale: 1 },
  { id: "water", label: "水", image: "/assets/car/water-bottle.webp", imageScale: 2 },
] as const;

export const walkingActivityConfig = {
  assets: {
    poopBag: "/assets/dog/walking/poop-bag-1.webp",
    poop: "/assets/dog/walking/poop.webp",
    walker: dogShibaWalkingAsset("walker-and-dog.webp"),
    walkerWithPoop: dogShibaWalkingAsset("walker-and-dog-poop.webp"),
    walkerWithBag: dogShibaWalkingAsset("walker-dog-bag.webp"),
    leashChoice: dogShibaWalkingAsset("leash-choice.webp"),
    offLeashChoice: dogShibaWalkingAsset("off-leash-choice.webp"),
  },
  interaction: {
    stepDistance: 7,
    holdSpeed: 40,
    completionAtByScene: { 1: 80 } as Partial<Record<number, number>>,
    mobileCleanupSteps: [
      {
        id: "walking-poop-cleanup",
        tool: "bag",
        target: "poop",
        prompts: {
          idle: "點擊拾便袋，準備清理便便。",
          toolSelected: "點擊便便，完成清理。",
          completed: "正在清理便便…",
        },
        outcome: { type: "cleanup" },
      },
    ],
  },
  prepNotes: {
    leash: "外出時維持安全距離，避免走失或衝突。",
    bag: "散步時清理排泄物，是對環境與他人的責任。",
    water: "天氣熱或散步時間較長時，幫狗狗補充飲水。",
  },
  copy: {
    stageLabel: "日常照護",
    heading: "今天也要出門散步",
    beforeChoice: "出門前，先選出你認為能兼顧安全與探索的散步方式。",
    afterChoice: "一天的照顧不只是在家餵食和陪伴，狗狗也需要規律外出活動。散步能讓牠探索環境、消耗體力、練習社會化，也有機會完成排泄。",
    safetyQuestion: "你會用哪一種方式陪牠散步？",
    choices: {
      leash: { title: "繫好牽繩，保持鬆弛", detail: "讓狗狗在可控距離內嗅聞、探索環境。" },
      offLeash: { title: "不繫牽繩，讓牠自己走", detail: "讓狗狗自由自在探索，飼主在後方跟著。" },
    },
    actions: { retry: "回去重新選擇", continuePreparation: "繼續準備散步用品", start: "開始散步", forward: "往前走" },
    preparation: {
      suppliesLabel: "出門前準備用品",
      title: "出門前，先確認這些東西",
      safetyConfirmed: "✓ 已選擇牽繩陪伴，讓探索保持在安全範圍內。",
      readyTitle: "準備好再出門",
      readyDescription: "確認牽繩、撿便袋和水都準備好後，就可以陪牠走一段 20 分鐘的散步路線。路上如果牠排泄，也要記得停下來清理。",
    },
    walkInstruction: "點擊「往前走」，陪牠一步一步往前走。散步不只是運動，也是牠探索環境、放鬆心情和練習與世界相處的時間。",
    messages: {
      leashRequired: "外出活動需要適當防護措施，牽繩或胸背帶能避免走失、驚嚇衝出，也能保護牠和其他人。",
      preparationRequired: "出門前也要準備撿便袋和水，讓散步更安心。",
      cleanupRequired: "先把排泄物清理乾淨，再繼續散步。",
      cleanupComplete: "已清理完成，繼續陪牠往前走。",
      mobileCleanupComplete: "清理完成，繼續散步吧！",
      complete: "散步時間達到 20 分鐘！",
      sceneComplete: (title: string) => `完成「${title}」，散步時間 +5 分鐘。`,
      event: {
        complete: { title: "做得很好！", body: "散步時清理排泄物，也是照顧責任的一部分。" },
        pending: { title: "散步中的小事件", body: "牠在路上排泄了，先停下來幫牠清理乾淨，再繼續往前走。" },
      },
    },
    aria: {
      activity: "今天也要出門散步",
      scene: "散步場景",
      forward: "往前走",
      cleanupBag: "使用撿便袋清理排泄物",
      cleanupTarget: "清理便便",
      cleanupInstruction: "拖曳撿便袋到便便的位置完成清理。",
      walkingCharacter: "正在和{petName}散步的人物與小狗",
      progress: (minutes: number) => `散步進度 ${minutes} / 20 分鐘`,
    },
    completion: {
      title: "每天，都要一起走出去",
      summary: "你陪{petName}完成了今天的散步，也記得為牠清理排泄物。",
      detail: "規律散步讓牠能探索環境、嗅聞、活動身體，也有助於維持生理與心理健康。",
      reflectionTitle: "把每天的照顧，想成長長的日常",
      reflection: "散步只是照顧牠的一部分。餵食、換水、清潔、互動、觀察狀況與安靜陪伴，都會反覆出現在每一天裡。晴天、下雨、疲累或工作忙碌時，牠仍需要你留下一段穩定的時間。請想一想：你願意怎麼安排自己的生活，長期陪牠好好長大、變老？",
      dailyCareBreakdown: dogReport.dailyCareBreakdown,
    },
  },
} as const;

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

export const walkingSceneLayout: Record<number, WalkingSceneLayout> = {
  0: { startX: 30, startY: 50, endX: 65, endY: 50, scale: 1.5, endScale: 0.3, turnAt: 0.55, waypoint: { x: 70, y: 60, scale: 1.5 }, mobileStartX: 35, mobileStartY: 50, mobileScale: 0.7, mobileWaypoint: { x: 70, y: 60, scale: 0.7 }, mobileEndX: 70, mobileEndY: 50, mobileEndScale: 0.3 },
  1: { startX: 25, startY: 60, endX: 70, endY: 45, scale: 1.5, endScale: 1, mobileStartX: 40, mobileStartY: 60, mobileScale: 1, mobileEndX: 60, mobileEndY: 45, mobileEndScale: 0.5 },
  2: { startX: 20, startY: 58, endX: 90, endY: 58, scale: 1.5, endScale: 1.5, mobileStartX: 30, mobileStartY: 65, mobileScale: 1, mobileEndX: 78, mobileEndY: 65, mobileEndScale: 1, poop: { x: 70, y: 85, size: 20 }, mobilePoop: { x: 59, y: 89, size: 40 } },
  3: { startX: 25, startY: 50, endX: 70, endY: 60, scale: 0.3, endScale: 1.5, turnAt: 0.55, waypoint: { x: 30, y: 60, scale: 1.5 }, mobileStartX: 30, mobileStartY: 50, mobileScale: 0.4, mobileWaypoint: { x: 40, y: 55, scale: 0.7 }, mobileEndX: 65, mobileEndY: 55, mobileEndScale: 0.82 },
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
