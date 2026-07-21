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
      { id: "quiet-explore", text: "保持環境安靜，提供安全空間與飲水，讓豆豆依自己的速度探索。", result: "correct", ...positive, explanation: "安靜、可退回的安全空間能降低刺激，讓豆豆逐步建立對新家的信任。", suggestion: "保持固定作息，等豆豆主動靠近再慢慢增加互動。" },
      { id: "sit-and-watch", text: "讓家人留在附近小聲聊天，不主動碰觸，觀察豆豆是否願意靠近。", result: "partial", ...partial, explanation: "不強迫互動是合理方向，但人數與聲音仍可能讓剛到家的豆豆緊張。", suggestion: "先減少在場人數，保留一位安靜陪伴者即可。" },
      { id: "welcome-crowd", text: "大家一起圍過來抱抱牠，讓牠快點熟悉所有家人。", result: "incorrect", ...incorrect, explanation: "同時被多人靠近和抱起，可能讓已經緊張的豆豆失去退路，增加閃躲或防衛反應。", suggestion: "先提供安靜安全的範圍，尊重牠主動探索和互動的速度。" },
    ],
  },
  {
    id: "behavior-guidance",
    stage: "逐漸長大的時候",
    timeLabel: "逐漸長大的時候",
    title: "面對行為問題",
    description: "你回家後發現拖鞋被咬壞，地上也有排泄痕跡。豆豆看到你時退到桌子下面。",
    topic: "行為需求與正向引導",
    artIndex: 4,
    choices: [
      { id: "review-and-guide", text: "清理現場、收好危險物，檢查活動與排泄安排，提供合適替代用品並正向引導。", result: "correct", ...positive, explanation: "先管理環境和需求來源，再鼓勵正確行為，能降低問題重複發生，也不會破壞信任。" },
      { id: "short-timeout", text: "先讓自己冷靜，再縮小活動範圍並重新安排散步和排泄時間。", result: "partial", ...partial, explanation: "冷靜處理與調整日常是好方向，但縮小空間不能變成長時間隔離。", suggestion: "搭配安全替代用品，並在正確行為出現時立即鼓勵。" },
      { id: "scold-and-crate", text: "把豆豆帶到現場大聲責罵，再關進籠子讓牠反省。", result: "incorrect", ...incorrect, explanation: "事後責罵很難讓豆豆理解原因，長時間把籠子當處罰也可能增加害怕與焦慮。", suggestion: "清除氣味、管理物品與作息，使用一致且正向的引導。" },
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
    supportChoice: true,
    choices: [
      { id: "basic-care-first", text: "稍作休息後完成今晚的基本餵食、飲水、排泄與適量活動。", result: "correct", ...positive, explanation: "先照顧自己的狀態，再維持豆豆不可中斷的基本需求，是可持續的安排。" },
      { id: "assigned-helper", text: "請已確認能協助的家人或照顧者，幫忙今晚的餵食與活動。", result: "correct", ...positive, explanation: "事先確認支援人選能避免忙碌時漏掉照顧，也讓交接更清楚。" },
      { id: "indoor-only", text: "只安排短時間嗅聞或益智活動，其他需求明天再補。", result: "partial", ...partial, explanation: "室內活動可以彈性調整，但不能取代當天必要的飲水、進食與排泄。", suggestion: "先完成基本需求，再依體力調整活動形式與時間。" },
      { id: "skip-today", text: "今天實在太累，飼料和散步都等明天再處理。", result: "incorrect", ...incorrect, explanation: "忽略基本需求可能造成飢餓、脫水、憋尿與焦躁，也會打亂穩定作息。", suggestion: "完成最低限度照顧，或立即聯絡已安排好的支援者。" },
    ],
  },
  {
    id: "illness-vet",
    stage: "健康出現變化",
    timeLabel: "健康出現變化",
    title: "生病與就醫",
    description: "豆豆今天食慾下降、活動變少，還出現一次嘔吐，看起來和平常不太一樣。",
    topic: "健康觀察與就醫判斷",
    artIndex: 3,
    choices: [
      { id: "record-and-vet", text: "記錄飲食、飲水、排泄與精神狀態，聯絡獸醫院並依建議就醫。", result: "correct", ...positive, explanation: "具體紀錄能幫助獸醫判斷，異常合併嘔吐時及早諮詢也能降低延誤風險。", suggestion: "攜帶紀錄與既有病史，依獸醫建議安排檢查。", expenseIds: ["journey-medical-care"] },
      { id: "observe-briefly", text: "先短時間密切觀察並記錄，如果症狀持續或增加就立刻聯絡獸醫。", result: "partial", ...partial, explanation: "觀察與紀錄是合理起點，但豆豆已有多項異常，不宜只在家等待太久。", suggestion: "現在就先電話詢問獸醫院，說明症狀與持續時間。" },
      { id: "human-medicine", text: "先給豆豆吃家裡的人用腸胃藥，看看睡一覺會不會好。", result: "incorrect", ...incorrect, explanation: "人用藥物的成分和劑量可能對狗造成中毒或掩蓋病況，延誤正確診斷。", suggestion: "不要自行給藥，整理觀察紀錄並聯絡獸醫。" },
    ],
  },
  {
    id: "owner-life-change",
    stage: "飼主生活發生改變",
    timeLabel: "飼主生活發生改變",
    title: "原本的照顧方式無法維持",
    description: "你換了工作，還需要離家幾天。原本的餵食、散步和陪伴時間必須重新安排。",
    topic: "生活變化與長期責任",
    artIndex: 7,
    supportChoice: true,
    reminder: "生活改變時，飼主仍需安排合法、安全且持續的照顧，不能任意棄置動物。",
    choices: [
      { id: "replan-family", text: "和家人或照顧者確認可行安排，請能協助的人接手並完整交接。", result: "correct", ...positive, explanation: "確認支援安排並保留交接紀錄，能讓豆豆的作息和健康照顧持續不中斷。" },
      { id: "paid-care", text: "評估合適的到府或住宿服務，確認環境、紀錄和緊急聯絡方式。", result: "correct", ...positive, explanation: "經過評估的專業照顧是可行方案，清楚交接能降低陌生照顧的風險。", expenseIds: ["journey-care-service"] },
      { id: "food-alone", text: "準備很多飼料和水，讓豆豆自己在家待幾天。", result: "incorrect", ...incorrect, explanation: "長時間無人查看會有飲水、排泄、健康與意外風險，也無法處理突發狀況。", suggestion: "安排可信任的照顧者或合適服務，並保留每日回報。" },
    ],
  },
  {
    id: "growing-old",
    stage: "逐漸進入高齡",
    timeLabel: "逐漸進入高齡",
    title: "小狗逐漸老去",
    description: "一起生活多年後，豆豆走得更慢、睡眠增加，上下樓梯也比以前吃力。",
    topic: "高齡健康與日常調整",
    artIndex: 1,
    choices: [
      { id: "senior-check", text: "安排健康檢查，記錄變化，調整活動強度並重新檢查家中環境。", result: "correct", ...positive, explanation: "高齡變化仍可能包含疼痛或疾病，醫療追蹤與環境調整能一起維持生活品質。", expenseIds: ["senior-checkup"] },
      { id: "gentle-routine", text: "保留豆豆喜歡的日常，但縮短時間、放慢速度並觀察恢復狀況。", result: "partial", ...partial, explanation: "調整活動是好方向，但不能把所有變化都當成自然老化。", suggestion: "同時安排健康檢查，和獸醫討論疼痛與活動能力。" },
      { id: "just-aging", text: "年紀大本來就會慢，不需要檢查，維持以前的活動量就好。", result: "incorrect", ...incorrect, explanation: "忽略疼痛、關節或其他疾病可能讓不舒服持續，原有活動強度也可能造成受傷。", suggestion: "安排檢查，再依豆豆當下能力調整環境和活動。" },
    ],
  },
  {
    id: "late-life-companionship",
    stage: "生命後段的陪伴",
    timeLabel: "生命後段的陪伴",
    title: "一起討論豆豆現在需要什麼",
    description: "豆豆的健康狀況起伏變多。你準備和獸醫討論疼痛、飲食、活動能力、舒適程度與後續照護。",
    topic: "生活品質與生命後段照護",
    artIndex: 1,
    choices: [
      { id: "quality-dialogue", text: "記錄豆豆每天的舒適與活動狀況，和獸醫共同討論生活品質與照護選項。", result: "correct", ...positive, explanation: "持續觀察並和專業人員討論，可以讓每次調整都更貼近豆豆當下的需要與舒適。" },
      { id: "family-vet-plan", text: "先和家人整理疑問，再請獸醫說明疼痛管理、飲食和後續照護方式。", result: "correct", ...positive, explanation: "把家人的觀察和專業評估放在一起，有助於形成溫和、可執行的照護計畫。" },
      { id: "avoid-discussion", text: "不去討論，因為談到生命後段只會讓大家更難過。", result: "incorrect", ...incorrect, explanation: "避開討論可能讓疼痛或照護需求沒有被及時看見，也讓家人在變化發生時更慌張。", suggestion: "可以從記錄舒適程度開始，請獸醫以能理解的方式逐步說明，不需要在遊戲中做出單一重大決定。" },
    ],
  },
];

export const journeyItems: JourneyItem[] = [
  { id: "arrival", type: "scenario", timeLabel: "一起生活的第一天", title: "第一天適應新家", scenarioId: "arrival-adjustment" },
  { id: "body-language", type: "body-language", timeLabel: "適應新家的時候", title: "看懂小狗的身體語言" },
  { id: "feeding", type: "feeding", timeLabel: "一起生活三個月", title: "準備豆豆的晚餐" },
  { id: "behavior", type: "scenario", timeLabel: "逐漸長大的時候", title: "面對行為問題", scenarioId: "behavior-guidance" },
  { id: "busy-care", type: "scenario", timeLabel: "穩定生活的日常", title: "忙碌時的日常照顧", scenarioId: "busy-daily-care" },
  { id: "body-care", type: "body-care", timeLabel: "成年後的例行照顧", title: "清潔與基礎身體觀察" },
  { id: "health", type: "scenario", timeLabel: "健康出現變化", title: "生病與就醫", scenarioId: "illness-vet" },
  { id: "life-change", type: "scenario", timeLabel: "飼主生活發生改變", title: "飼主生活發生改變", scenarioId: "owner-life-change" },
  { id: "senior", type: "scenario", timeLabel: "逐漸進入高齡", title: "小狗逐漸老去", scenarioId: "growing-old" },
  { id: "senior-room", type: "senior-room", timeLabel: "調整高齡生活空間", title: "改造高齡犬的家" },
  { id: "late-life", type: "scenario", timeLabel: "生命後段的陪伴", title: "生命後段的陪伴", scenarioId: "late-life-companionship" },
];

export const initialLifeActivityState: LifeActivityState = {
  bodyLanguageSignals: [],
  feedingFoodReady: false,
  feedingWaterSteps: [],
  feedingServed: false,
  bodyCareParts: [],
  seniorAdjustments: [],
};
