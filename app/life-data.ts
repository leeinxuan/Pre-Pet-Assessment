import type { JourneyItem, LifeActivityState, Scenario } from "./game-types";

const positive = {
  feedbackTitle: "做得很好！",
  effects: { trust: 2, wellbeing: 2, support: 1 },
} as const;

const partial = {
  feedbackTitle: "方向不錯，但還可以再完整一點。",
  effects: { trust: 1, wellbeing: 1, support: 1 },
} as const;

const incorrect = {
  feedbackTitle: "這個做法可能不太適合。",
  effects: { trust: -1, wellbeing: -1, support: 0 },
} as const;

export const lifeScenarios: Scenario[] = [
  {
    id: "arrival-adjustment",
    stage: "一起生活的第一天",
    timeLabel: "一起生活的第一天",
    title: "第一天適應新家",
    description: "豆豆剛走進陌生的新家，躲在外出籠旁觀察，家人都很想立刻和牠打招呼。",
    topic: "適應新家與安全感",
    artIndex: 0,
    choices: [
      { id: "quiet-explore", text: "保持距離，給牠安靜適應的時間", result: "correct", ...positive, explanation: "剛到新家的小狗需要先觀察環境。保持距離並提供安靜、安全的空間，能減少壓力，讓牠以自己的速度建立安全感。", suggestion: "準備乾淨飲水與可休息的角落，等牠主動靠近後再慢慢增加互動。" },
      { id: "force-pick-up", text: "強行抱出來", result: "incorrect", ...incorrect, explanation: "這個做法可能讓牠更緊張。被強行抱起會讓小狗失去退路，增加防衛反應，也可能降低牠對新環境的安全感。", suggestion: "保持距離，提供安靜安全的空間，讓牠用自己的速度探索。" },
      { id: "keep-calling", text: "持續靠近並呼喚牠", result: "incorrect", ...incorrect, explanation: "持續靠近與呼喚會增加刺激，讓還在適應中的小狗難以安心觀察，可能變得更緊張或躲避。", suggestion: "先給牠安靜的時間與可退回的安全空間，等待牠主動探索或靠近。" },
    ],
  },
  {
    id: "behavior-barking",
    stage: "日常行為照顧",
    timeLabel: "日常生活",
    title: "牠一直吠叫，該怎麼辦？",
    description: "晚上你正在休息，小狗突然對著門口一直吠叫。你看見牠有些警覺，也注意到附近有聲音經過。",
    topic: "日常行為照顧",
    artIndex: 4,
    multipleChoice: true,
    requiredCorrectOptionIds: ["bark-play", "bark-walk", "bark-expert"],
    wrongOptionIds: ["bark-scold"],
    correctSummary: ["提供遊戲與互動，增加安全感。", "帶牠適量散步，消耗精力。", "若情況持續或影響生活，尋求獸醫或行為專家協助。"],
    choices: [
      { id: "bark-play", text: "提供遊戲與互動，增加安全感", result: "correct", ...positive, explanation: "遊戲與溫和互動能提供安全感，也有助於把注意力轉向合適的活動。" },
      { id: "bark-walk", text: "帶牠適量散步，消耗精力", result: "correct", ...positive, explanation: "依小狗狀況安排適量散步，有助於滿足活動需求並降低累積的焦躁。" },
      { id: "bark-scold", text: "牠一直叫就大聲罵牠，讓牠知道不可以", result: "incorrect", ...incorrect, explanation: "單純責罵可能增加緊張，無法處理吠叫背後的原因。", suggestion: "從安全感、活動量與正向互動著手；持續影響生活時可尋求專業協助。" },
      { id: "bark-expert", text: "若情況持續或影響生活，尋求獸醫或行為專家協助", result: "correct", ...positive, explanation: "當狀況持續或影響生活時，及早諮詢獸醫或行為專家能更完整找出原因。" },
    ],
  },
  {
    id: "behavior-chewing",
    stage: "日常行為照顧",
    timeLabel: "日常生活",
    title: "牠開始亂咬東西，該怎麼辦？",
    description: "你回到客廳時，發現小狗正在咬桌腳旁的物品。旁邊還有一些不能讓牠碰到的小東西。",
    topic: "日常行為照顧",
    artIndex: 4,
    multipleChoice: true,
    requiredCorrectOptionIds: ["chew-toys", "chew-store-hazards", "chew-expert"],
    wrongOptionIds: ["chew-punish"],
    correctSummary: ["提供多樣化且安全的啃咬玩具。", "把有害物品收好，避免牠接觸。", "若情況嚴重或持續，尋求獸醫或行為專家協助。"],
    choices: [
      { id: "chew-toys", text: "提供多樣化且安全的啃咬玩具", result: "correct", ...positive, explanation: "安全的啃咬玩具能提供合適的探索出口，也能讓牠把咬的需求放在正確物品上。" },
      { id: "chew-store-hazards", text: "把有害物品收好，避免牠接觸", result: "correct", ...positive, explanation: "先管理環境能降低誤食與受傷風險，也讓小狗更容易練習安全的選擇。" },
      { id: "chew-punish", text: "看到牠咬東西就立刻打牠或嚇牠", result: "incorrect", ...incorrect, explanation: "打罵或驚嚇可能造成壓力、破壞信任，也不一定能解決探索與情緒需求。", suggestion: "提供安全啃咬玩具、收好危險物品；情況嚴重或持續時可找專業協助。" },
      { id: "chew-expert", text: "若情況嚴重或持續，尋求獸醫或行為專家協助", result: "correct", ...positive, explanation: "持續或嚴重的行為改變值得讓獸醫或行為專家協助評估。" },
    ],
  },
  {
    id: "behavior-toileting",
    stage: "日常行為照顧",
    timeLabel: "日常生活",
    title: "牠在不適合的地方大小便，該怎麼辦？",
    description: "你發現小狗在不適合的位置大小便。牠看起來不是故意搗亂，而是還沒建立固定如廁習慣。",
    topic: "日常行為照顧",
    artIndex: 4,
    multipleChoice: true,
    requiredCorrectOptionIds: ["toilet-material", "toilet-outings", "toilet-expert"],
    wrongOptionIds: ["toilet-scold"],
    correctSummary: ["使用適當材質鋪地，例如報紙或尿布墊。", "一天多安排幾次外出如廁機會。", "若頻率異常或持續困擾，尋求獸醫或行為專家協助。"],
    choices: [
      { id: "toilet-material", text: "使用適當材質鋪地，例如報紙或尿布墊", result: "correct", ...positive, explanation: "適當材質能幫助建立固定如廁位置，也讓清潔和引導更一致。" },
      { id: "toilet-outings", text: "一天多安排幾次外出如廁機會", result: "correct", ...positive, explanation: "增加合適的外出機會，能讓幼犬有更多時間練習正確如廁。" },
      { id: "toilet-scold", text: "牠尿錯地方就把牠抓過來罵", result: "incorrect", ...incorrect, explanation: "責罵可能讓狗狗害怕，卻不一定知道正確如廁地點。", suggestion: "使用適當材質、增加外出機會，並在牠做對時給予獎勵。" },
      { id: "toilet-expert", text: "若頻率異常或持續困擾，尋求獸醫或行為專家協助", result: "correct", ...positive, explanation: "頻率異常或持續困擾時，尋求獸醫或行為專家協助能確認是否有健康或行為需求。" },
    ],
  },
  {
    id: "busy-daily-care",
    stage: "穩定生活的日常",
    timeLabel: "穩定生活的日常",
    title: "忙碌時的日常照顧",
    description: "今天工作特別忙，你很疲累，但豆豆仍需要晚餐、乾淨飲水、排泄與適當活動。",
    topic: "時間安排與照顧支援",
    artIndex: 5,
    choices: [
      { id: "alone-with-food", text: "準備大量食物，讓牠自己待在家", result: "incorrect", ...incorrect, explanation: "只準備大量食物，讓小狗長時間獨自在家，可能造成飲水不足、排泄無法處理、過量進食、焦慮或突發狀況沒有人發現。", suggestion: "離家前應先確認能接手餵食、飲水、排泄與活動的人選，並清楚交接照顧需求。" },
      { id: "family-helper", text: "請家庭成員協助", result: "correct", ...positive, explanation: "事先確認家庭成員能協助照顧，能讓小狗持續獲得餵食、飲水、排泄照顧與陪伴，不會長時間完全無人照護。" },
      { id: "trusted-helper", text: "請最近幾天有空、也了解照顧需求的朋友協助", result: "correct", ...positive, explanation: "狗狗不能長時間完全無人照護。忙碌或離家時，可以找最近幾天有空、可信任，且願意依照交接內容協助照顧的朋友，協助餵食、換水、清理排泄與觀察狀況。" },
    ],
  },
  {
    id: "illness-vet",
    stage: "生病與就醫",
    timeLabel: "生病與就醫",
    title: "柴犬常見健康問題觀察",
    description: "最近你發現小狗常常舔腳、抓癢，走路時偶爾不太想跳上跳下，眼睛也有些紅紅的。",
    topic: "健康觀察與就醫判斷",
    artIndex: 3,
    choices: [
      { id: "record-and-vet", text: "記錄食慾、飲水、排泄、精神與症狀變化，並聯絡獸醫確認是否就醫", result: "correct", ...positive, explanation: "及早觀察與記錄能幫助獸醫判斷。", suggestion: "柴犬較常見需要留意的健康問題包括：\n皮膚過敏或搔癢、掉毛、紅腫；\n關節不適、跛行或活動力下降；\n眼睛分泌物增加、紅眼或視力異常。\n\n如果發現食慾、精神、排泄或活動狀況和平常不同，請記錄變化並尋求獸醫建議。", expenseIds: ["sick-vet-care"] },
      { id: "wait-and-see", text: "先等幾天看看，牠可能只是心情不好", result: "incorrect", ...incorrect, explanation: "等太久可能延誤皮膚過敏、關節不適或眼部問題的處理，讓小狗持續不舒服。", suggestion: "記錄具體症狀與變化，並聯絡獸醫確認是否需要檢查。" },
      { id: "human-medicine", text: "自行餵人用藥或網路偏方", result: "incorrect", ...incorrect, explanation: "人用藥與未經專業確認的偏方可能對小狗造成危險，也可能讓皮膚、關節或眼部問題更難判斷。", suggestion: "不要自行給藥；先記錄症狀，再向獸醫說明觀察到的變化。" },
    ],
  },
  {
    id: "growing-old",
    stage: "逐漸進入高齡",
    timeLabel: "逐漸進入高齡",
    title: "高齡後的照顧準備",
    description: "小狗進入高齡階段後，健康檢查與醫療照顧變得更重要。你開始發現牠需要比以前更多觀察與照顧。",
    topic: "高齡照顧與醫療準備",
    artIndex: 1,
    choices: [
      { id: "senior-plan-ahead", text: "提前規劃醫療基金，學習老年照顧知識，並定期諮詢獸醫", result: "correct", ...positive, explanation: "提前準備能幫助飼主在高齡階段更穩定地照顧小狗，也能及早安排健康觀察、醫療需求與長期照顧。" },
      { id: "senior-wait", text: "等到牠真的很嚴重再處理，平常不用特別準備", result: "incorrect", ...incorrect, explanation: "高齡照顧需要提前準備。等到症狀很嚴重才處理，可能延誤照顧，也會讓小狗承受更多不適。", suggestion: "提前規劃醫療基金，持續觀察健康變化並定期諮詢獸醫。" },
      { id: "senior-human-medicine", text: "自行判斷並使用人用藥物或網路偏方", result: "incorrect", ...incorrect, explanation: "人用藥物或網路偏方可能對小狗造成危險。高齡階段若有健康疑慮，應諮詢獸醫並依專業建議處理。", suggestion: "不要自行給藥；記錄觀察到的變化，再與獸醫討論適合的照顧方式。" },
    ],
  },
];

export const journeyItems: JourneyItem[] = [
  { id: "arrival", type: "scenario", timeLabel: "一起生活的第一天", title: "第一天適應新家", scenarioId: "arrival-adjustment" },
  { id: "behavior", type: "scenario", timeLabel: "日常行為照顧", title: "日常行為照顧" },
  { id: "walking", type: "walking", timeLabel: "日常生活", title: "今天也要出門散步" },
  { id: "busy-care", type: "scenario", timeLabel: "穩定生活的日常", title: "忙碌時的日常照顧", scenarioId: "busy-daily-care" },
  { id: "sick", type: "scenario", timeLabel: "生病與就醫", title: "生病與就醫", scenarioId: "illness-vet" },
  { id: "senior", type: "scenario", timeLabel: "逐漸進入高齡", title: "小狗逐漸老去", scenarioId: "growing-old" },
];

export const initialLifeActivityState: LifeActivityState = {
  bodyLanguageSignals: [],
  arrivalMealFoodReady: false,
  arrivalMealWaterReady: false,
  walkingPreparedItems: [],
  walkingSceneIndex: 0,
  walkingMinutes: 0,
  walkingPoopCleaned: false,
  walkingComplete: false,
  sickTimePassComplete: false,
  bodyCareParts: [],
  seniorAdjustments: [],
};
