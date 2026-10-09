import type { ActivityIntroConfig } from "../../../game-types";
import { hamsterAssets } from "./assets";

/** docs/hamster-game-planning.md §5.3.2 的兩段式早晨清潔流程。 */
export const hamsterMorningCheck = {
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
      character: hamsterAssets.feeding.happy,
      tool: hamsterAssets.dailyInspection.bedding,
      collector: hamsterAssets.dailyInspection.sandBath,
    },
  } satisfies ActivityIntroConfig,
  steps: {
    toilet: {
      id: "toilet-corner",
      label: "廁所角落點清潔",
      prompt: "找到 {petName} 的廁所角落，清掉髒的墊料！",
      completion: "{petName} 會固定選擇同一個角落作為廁所——這是倉鼠的天性。每天清那個角落的髒墊料，比整籠換墊省事多了，也讓牠對環境氣味感到安心。",
    },
    sandBath: {
      id: "sand-bath",
      label: "砂浴盆篩沙清潔",
      prompt: "篩掉砂浴盆裡的結塊廢沙！",
      completion: "砂浴是 {petName} 清潔毛髮的方式，使用過的沙會結塊或混入雜質。定期篩除結塊就好，不需要整盆換新——讓牠隨時都有乾淨的沙可以用。",
    },
  },
  completion: {
    title: "早晨巡視完成！{petName} 的小小家整理好了",
    subtitle: "你清理了廁所角落的髒墊料，也篩好了砂浴盆。",
    description: "倉鼠的健康很難從外表立刻看出來——牠靠著這兩個乾淨的空間，每天維持身體的整潔與舒適。",
    reflectionTitle: "每天的小動作，是對 {petName} 最具體的照顧",
    reflection: "倉鼠不像貓狗會告訴你牠的需求。牠有固定的廁所角落、每天使用砂浴盆——保持這兩個地方的乾淨，就是你每天能給牠最直接的照顧，也是觀察牠使用習慣有無異常的時機。",
    careTitle: "每天留給牠的照護時間",
    continueLabel: "繼續生活旅程 →",
  },
} as const;
