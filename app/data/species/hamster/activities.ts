import type { ActivityIntroConfig } from "../../../game-types";
import { hamsterAssets } from "./assets";

/** 專屬活動元件僅由本檔取得倉鼠巡視所需素材與照護時間資料。 */
export { hamsterAssets };
export { hamsterReport } from "./report";

/** docs/hamster-game-planning.md §5.3.2 的倉鼠清潔日常狀態機資料。 */
export const hamsterCageCheck = {
  sceneDescription: "今天早上，你走近 {petName} 的籠子，牠剛結束一夜的探索，正窩在熟悉的墊料裡休息。先花幾分鐘整理牠最常使用的角落和砂浴盆，讓牠醒來後有個乾淨舒適的小家吧。",
  intro: {
    eyebrow: "日常照護",
    title: "早晨巡視——每天替 {petName} 確認一次",
    paragraphs: [
      "倉鼠是**夜行性動物**，**早晨**是一天一次確認 {petName} 一切安好的最佳時機。",
      "{petName} 有**固定的廁所角落**——**每天清**那個角落的髒墊料，是維持衛生最有效的方式。**砂浴盆**也要**定期篩除結塊**，讓牠隨時都能正常使用。",
      "這兩件事，就是每天早晨為 {petName} 做的最重要的照顧。",
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
      label: "撈出砂浴盆雜質",
      prompt: "用漏勺篩掉 {petName} 在砂浴盆裡留下的糞便和結塊！",
      completion: "細孔漏勺的孔洞比浴沙顆粒小，可以讓細沙通過、只留下糞便和結塊。烘焙用的小型茶葉濾網就很好用。",
    },
    {
      id: "settle-sand",
      label: "水平搖晃砂盆",
      prompt: "輕輕左右搖晃砂盆，讓細碎的粉塵沉到底部！",
      completion: "篩完後一定要水平輕輕搖晃，讓剩餘的細碎粉塵沉到底部——否則 {petName} 下次打滾挖掘時會直接吸入粉塵，影響牠的呼吸道。",
    },
  ] as const,
  interaction: {
    // 固定廁所角落，讓每日清潔流程與畫面位置一致。
    toiletCorner: "top-right",
    siftPassesRequired: 3,
    shakeProgressTarget: 100,
    // 持續拖曳五秒可填滿；秒數不顯示給玩家。
    shakeDurationMs: 5000,
    cleanCornerHint: "這裡還乾淨，再找找看",
    refillHint: "點擊剛清出的角落，補上乾淨的新墊料。",
    siftHint: "按住漏勺，從砂盆一端拖曳到另一端。",
    shakeHint: "在砂盆上左右拖曳，讓細碎粉塵沉到底部。",
    shakeCompleteHint: "太好了！砂浴盆已經平整又乾淨，{petName} 可以舒服地使用了！",
  },
  completion: {
    title: "清潔完成！{petName} 的小小家整理好了",
    subtitle: "你清理了廁所角落的髒墊料，也篩好了砂浴盆。",
    description: "倉鼠的健康很難從外表立刻看出來——牠靠著這兩個乾淨的空間，每天維持身體的整潔與舒適。",
    reflectionTitle: "每天的小動作，是對 {petName} 最具體的照顧",
    reflection: "倉鼠不像貓狗會告訴你牠的需求。牠有固定的廁所角落、每天使用砂浴盆——保持這兩個地方的乾淨，就是你每天能給牠最直接的照顧，也是觀察牠使用習慣有無異常的時機。",
    careTitle: "每天留給牠的照護時間",
    continueLabel: "繼續生活旅程 →",
  },
} as const;
