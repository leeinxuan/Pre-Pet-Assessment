import type { ActivityIntroConfig } from "../../../game-types";
import { hamsterAssets } from "./assets";

/** 專屬活動元件僅由本檔取得倉鼠巡視所需素材與照護時間資料。 */
export { hamsterAssets };
export { hamsterReport } from "./report";

/** docs/hamster-game-planning.md §5.3.2 的倉鼠清潔日常狀態機資料。 */
export const hamsterCageCheck = {
  title: "每日{petName}健康日記",
  sceneDescription: "今天早上，你走近 {petName} 的籠子，牠剛結束一夜的探索，正窩在熟悉的墊料裡休息。先花幾分鐘整理牠最常使用的角落和砂浴盆，讓牠醒來後有個乾淨舒適的小家吧。",
  intro: {
    eyebrow: "日常照護",
    title: "每日{petName}健康日記",
    paragraphs: [
      "倉鼠是**夜行性動物**，每天找個固定時間確認 {petName} 一切安好，是最重要的照護習慣。",
      "{petName} 有**固定的廁所角落**——**每天清**那個角落的髒墊料，是維持衛生最有效的方式。**砂浴盆**也要**定期篩除結塊**，讓牠隨時都能正常使用。",
      "這兩件事，就是每天為 {petName} 做的最重要的照顧。",
    ],
    startLabel: "開始今天的清潔 →",
    visualAssets: {
      // CageCheckActivity 尚未提供角色圖；沿用倉鼠既有角色素材，不使用其他物種暫代。
      character: hamsterAssets.feeding.happy,
      tool: hamsterAssets.cageCheckActivity.scoop,
      collector: hamsterAssets.cageCheckActivity.sandBathMess,
    },
  } satisfies ActivityIntroConfig,
  progressSteps: [
    {
      id: "toilet-corner",
      label: "廁所角落點清潔",
      prompt: "找找看 {petName} 今天在哪裡上廁所了！",
      completion: "倉鼠有個聰明的習慣——牠會固定選同一個角落當廁所，讓自己的窩保持整潔。每天只要清那個角落，不需要整籠大換，牠就能住在熟悉又舒適的環境裡。",
    },
    {
      id: "sift-sand",
      label: "砂浴盆篩沙清潔",
      prompt: "用砂鏟舀起浴沙、篩回細沙，再把排泄物丟進垃圾桶。",
      completion: "浴沙裡的糞便和結塊都清乾淨了，{petName} 可以繼續在裡面打滾了！",
    },
  ] as const,
  sandCleaning: {
    rounds: [
      {
        scoopPrompt: "用砂鏟舀起一部分浴沙",
        shakePrompt: "搖晃砂鏟，讓細沙漏回盆裡",
        trashPrompt: "點擊垃圾桶，丟掉留在砂鏟上的排泄物",
      },
      {
        scoopPrompt: "再舀一次浴沙！",
        shakePrompt: "搖晃砂鏟，讓細沙漏回盆裡",
        trashPrompt: "點擊垃圾桶，丟掉最後的排泄物！",
      },
    ],
    shakeProgressLabel: "搖晃進度",
    completion: "浴沙裡的糞便和結塊都清乾淨了，{petName} 可以繼續在裡面打滾了！",
  },
  interaction: {
    // 固定廁所角落，讓每日清潔流程與畫面位置一致。
    toiletCorner: "top-right",
    shakeProgressTarget: 100,
    // 持續拖曳約 2.5 秒可填滿；秒數不顯示給玩家。
    shakeDurationMs: 2500,
    cleanCornerHint: "這裡還乾淨，再找找看",
    refillHint: "點擊剛清出的角落，補上乾淨的新墊料。",
    siftHint: "把砂鏟移到砂浴盆上方，舀起一部分浴沙。",
    shakeHint: "左右拖曳砂鏟，讓細沙從篩孔漏回盆裡。",
    shakeCompleteHint: "細沙已經漏回盆裡，點擊垃圾桶丟掉砂鏟上的排泄物。",
    /** Touch-first instructions and thresholds. Desktop keeps the drag/hold interactions above. */
    mobileTap: {
      scoop: {
        selectPrompt: "點擊小鏟子，準備清理髒污。",
        targetPrompt: "點擊髒污，完成清理。",
      },
      sieve: {
        selectPrompt: "點擊砂鏟，準備舀起浴沙。",
        targetPrompt: "點擊砂浴盆，舀起一部分浴沙。",
      },
      shake: {
        prompt: "連續點擊砂鏟，讓細沙漏回砂浴盆裡。",
        progressLabel: "搖晃進度",
        progressIncrement: 25,
      },
    },
  },
  /**
   * 清潔活動中的籠內用品獨立於 preparation.ts；兩個畫面可各自調整位置與尺寸。
   * 這裡只描述清潔畫面要顯示的已布置用品，不會影響飼養前準備的物品欄或房間配置。
   */
  preparedCageItems: [
    { id: "exercise-wheel", image: hamsterAssets.room.exerciseWheel, placement: { x: 57, y: 40, width: 35, layer: 3 }, mobilePlacement: { x:25, y: 42, width: 60 }, mobileVisible: true },
    { id: "water-bottle", image: hamsterAssets.room.waterBottle, placement: { x: 11, y: 31, width: 23, layer: 3 }, mobilePlacement: { x: 11, y: 31, width: 23 }, mobileVisible: false },
    { id: "food-bowl", image: hamsterAssets.room.foodBowl, placement: { x: 16, y: 70, width: 20, layer: 4 }, mobilePlacement: { x: 16, y: 70, width: 20 }, mobileVisible: false },
    { id: "hideout", image: hamsterAssets.room.hideout, placement: { x: 83, y: 72, width: 20, layer: 3 }, mobilePlacement: { x: 72, y: 75, width: 30 }, mobileVisible: true },
    { id: "sand-bath-box", image: hamsterAssets.room.sandBathBox, placement: { x: 30, y: 55, width: 25, layer: 3 }, mobilePlacement: { x: 30, y: 55, width: 25 }, mobileVisible: false },
  ] as const,
  /** 桌機版髒墊料與乾淨墊料的位置及大小；top/right/width 為場景百分比，最小／最大寬度為 px。 */
  desktopBeddingPlacement: {
    dirtyBedding: { top: 48, right: 12, width: 18, minWidth: 94, maxWidth: 176 },
    cleanBedding: { top: 48, right: 12, width: 18, minWidth: 94, maxWidth: 176 },
  },
  /** 手機版清潔場景的獨立座標與尺寸，單位為場景百分比；不影響桌機拖拉位置。 */
  mobileScenePlacement: {
    // 髒墊料與乾淨墊料可分別調整：left/top 是場景左上角起算的百分比，width 是寬度百分比。
    dirtyBedding: { left: 50, top: 50, width: 25 },
    cleanBedding: { left: 50, top: 50, width: 25 },
    scoop: { bottom: 5, left: 2, width: 29 },
    beddingPackage: { bottom: 5, left: 2, width: 29 },
    sieve: { bottom: 7, left: 2, width: 27 },
    sandBath: { width: 96, maxHeight: 80, offsetX: 0, offsetY: 0 },
    debris: [
      { left: 31, top: 42, width: 16 },
      { left: 48, top: 55, width: 16 },
      { left: 62, top: 42, width: 16 },
    ],
  },
  completion: {
    title: "清潔完成！{petName} 的小小家整理好了",
    subtitle: "浴沙裡的糞便和結塊都清乾淨了，{petName} 可以繼續在裡面打滾了！",
    description: "倉鼠的健康很難從外表立刻看出來——牠擁有乾淨的空間，才能每天維持身體的整潔與舒適。",
    reflectionTitle: "每天的小動作，是對 {petName} 最具體的照顧",
    reflection: "倉鼠不像貓狗會告訴你牠的需求。牠有固定的廁所角落、每天使用砂浴盆——保持這兩個地方的乾淨，就是你每天能給牠最直接的照顧，也是觀察牠使用習慣有無異常的時機。",
    careTitle: "每天留給牠的照護時間",
    continueLabel: "繼續生活旅程",
  },
} as const;
