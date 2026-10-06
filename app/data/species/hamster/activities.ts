export const hamsterFirstMeal = {
  title: "{petName} 的第一餐，你準備了什麼？",
  items: [
    { id: "hamster-pellet", label: "倉鼠專用綜合飼料（定量）", result: "correct", feedback: "✅ 正確！倉鼠需要均衡的綜合飼料；每天固定餵食量，不要因為「碗空了」就補充，因為牠可能把食物藏進頰囊或巢穴了。", expenseIds: ["hamster-pellet-monthly"] },
    { id: "fresh-water", label: "乾淨飲水（飲水器）", result: "correct", feedback: "✅ 必要！每天確認飲水器正常出水，並提供乾淨飲水。" },
    { id: "sunflower-seeds", label: "葵瓜子（一大把）", result: "caution", feedback: "▲ 少量可以，但不能當主食！倉鼠特別喜歡葵瓜子，但容易只吃這個忽略其他成分，造成挑食和營養不均。每天固定少量作為點心即可，不可讓牠想吃多少就吃多少。" },
    { id: "onion", label: "洋蔥", result: "incorrect", feedback: "❌ 有毒！蔥、蒜、洋蔥對倉鼠有毒，絕對不可餵食。廚房常見食材，請務必放置在{petName}無法取得的地方。" },
    { id: "citrus-fruit", label: "柑橘類水果", result: "incorrect", feedback: "❌ 不適合！柑橘類水果的酸性可能刺激倉鼠消化道，不建議餵食。水果類食物整體須謹慎，含糖量高的種類尤其要避免或極少量給予。" },
  ],
} as const;

/** docs/hamster-game-planning.md §5.3.2 的兩段式早晨清潔流程。 */
export const hamsterMorningCheck = {
  introTitle: "早晨巡視——每天替 {petName} 確認一次",
  introParagraphs: [
    "倉鼠是夜行性動物，牠最活躍的時候是你熟睡的時候。等你早上醒來，就是一天一次確認{petName}一切安好的最佳時機。",
    "{petName}會固定選擇同一個角落作為廁所——每天清那個角落的髒墊料，是維持衛生最輕鬆有效的方式，也是許多新手不知道要做的日常任務。砂浴是牠維持毛髮健康的方式，定期篩除結塊的沙讓牠隨時都能有效沙浴。",
    "這兩件清潔工作，就是每天早晨為 {petName} 做的最重要的事。",
  ],
  startLabel: "開始早晨巡視 →",
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
