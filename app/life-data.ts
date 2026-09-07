import type { JourneyItem, LifeActivityState, Scenario, ScenarioChoice } from "./game-types";

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
    reportSummary: "第一天適應新家時，狗狗可能因陌生而躲藏或緊張；保留安靜、安全且能退回的空間，等待牠主動探索。",
    artIndex: 0,
    choices: [
      { id: "force-pick-up", text: "強行抱出來", result: "incorrect", ...incorrect, explanation: "這個做法可能讓牠更緊張。被強行抱起會讓小狗失去退路，增加防衛反應，也可能降低牠對新環境的安全感。先放低互動強度，讓牠用自己的速度探索。" },
      { id: "quiet-explore", text: "保持距離，給牠安靜適應的時間", result: "correct", ...positive, explanation: "剛到新家的小狗需要先觀察環境。保持距離並提供安靜、安全的空間，能減少壓力，讓牠以自己的速度建立安全感。", suggestion: "準備乾淨飲水與可休息的角落，等牠主動靠近後再慢慢增加互動。" },
      { id: "keep-calling", text: "持續靠近並呼喚牠", result: "incorrect", ...incorrect, explanation: "持續靠近與呼喚會增加刺激，讓還在適應中的小狗難以安心觀察，可能變得更緊張或躲避。先退開一些，讓牠保有安靜且能退回的安全空間。" },
      { id: "quiet-nearby", text: "坐在附近陪牠，但每隔一下就伸手摸摸看", result: "incorrect", ...incorrect, explanation: "想陪伴牠的心意很好，但頻繁伸手仍可能讓剛到家的小狗感到壓力，難以真正休息。可以安靜待在附近，先不主動碰觸，等牠願意靠近時再互動。" },
    ],
  },
  {
    id: "behavior-barking",
    stage: "日常行為照顧",
    timeLabel: "日常照護",
    title: "牠一直吠叫，該怎麼辦？",
    description: "晚上你正在休息，小狗突然對著門口一直吠叫。你看見牠有些警覺，也注意到附近有聲音經過。",
    topic: "日常行為照顧",
    reportSummary: "狗狗持續吠叫時，先理解聲音、壓力或活動不足等原因，再用陪伴、適量活動與專業協助調整。",
    artIndex: 4,
    multipleChoice: true,
    requiredCorrectOptionIds: ["bark-play", "bark-walk", "bark-expert"],
    wrongOptionIds: ["bark-scold"],
    correctSummary: ["提供遊戲與互動，增加安全感。", "帶牠適量散步，消耗精力。", "若情況持續或影響生活，尋求獸醫或行為專家協助。"],
    learningPoints: [
      "吠叫是狗狗的溝通方式。先觀察**何時、對什麼叫**，再判斷是警戒、害怕、無聊或不舒服。",
      "責罵只可能暫時停止聲音，卻未處理原因；若持續發生，可記錄**頻率、時間與觸發情境**後詢問專業人員。",
    ],
    choices: [
      { id: "bark-play", text: "提供遊戲與互動，增加安全感", result: "correct", ...positive, explanation: "遊戲與溫和互動能提供安全感，也有助於把注意力轉向合適的活動。" },
      { id: "bark-walk", text: "帶牠適量散步，消耗精力", result: "correct", ...positive, explanation: "依小狗狀況安排適量散步，有助於滿足活動需求並降低累積的焦躁。" },
      { id: "bark-scold", text: "牠一直叫就大聲罵牠，讓牠知道不可以", result: "incorrect", ...incorrect, explanation: "單純責罵可能增加緊張，也無法處理吠叫背後的原因。應先觀察聲音、壓力、活動量或身體不適等可能的觸發因素。" },
      { id: "bark-expert", text: "若情況持續或影響生活，尋求獸醫或行為專家協助", result: "correct", ...positive, explanation: "當狀況持續或影響生活時，及早諮詢獸醫或行為專家能更完整找出原因。" },
    ],
  },
  {
    id: "behavior-chewing",
    stage: "日常行為照顧",
    timeLabel: "日常照護",
    title: "牠開始亂咬東西，該怎麼辦？",
    description: "你回到客廳時，發現小狗正在咬桌腳旁的物品。旁邊還有一些不能讓牠碰到的小東西。",
    topic: "日常行為照顧",
    reportSummary: "狗狗亂咬東西時，應收好危險物並提供安全啃咬玩具；打罵可能增加壓力，也無法教會合適做法。",
    artIndex: 4,
    multipleChoice: true,
    requiredCorrectOptionIds: ["chew-toys", "chew-store-hazards", "chew-expert"],
    wrongOptionIds: ["chew-punish"],
    correctSummary: ["提供多樣化且安全的啃咬玩具。", "把有害物品收好，避免牠接觸。", "若情況嚴重或持續，尋求獸醫或行為專家協助。"],
    learningPoints: [
      "啃咬是**狗狗的自然行為**，幼犬換牙、探索、無聊或壓力都可能讓啃咬增加。",
      "選擇符合體型且不易碎的玩具，並在**咬對物品時立即鼓勵**；玩具破損時要更換，避免誤食。",
    ],
    choices: [
      { id: "chew-toys", text: "提供多樣化且安全的啃咬玩具", result: "correct", ...positive, explanation: "安全的啃咬玩具能提供合適的探索出口，也能讓牠把咬的需求放在正確物品上。" },
      { id: "chew-punish", text: "看到牠咬東西就立刻打牠或嚇牠", result: "incorrect", ...incorrect, explanation: "打罵或驚嚇可能造成壓力、破壞信任，也不一定能解決探索與情緒需求。先收好危險物品，並把牠引導到安全的啃咬玩具。" },
      { id: "chew-store-hazards", text: "把有害物品收好，避免牠接觸", result: "correct", ...positive, explanation: "先管理環境能降低誤食與受傷風險，也讓小狗更容易練習安全的選擇。" },
      { id: "chew-expert", text: "若情況嚴重或持續，尋求獸醫或行為專家協助", result: "correct", ...positive, explanation: "持續或嚴重的行為改變值得讓獸醫或行為專家協助評估。" },
    ],
  },
  {
    id: "behavior-toileting",
    stage: "日常行為照顧",
    timeLabel: "日常照護",
    title: "牠在不適合的地方大小便，該怎麼辦？",
    description: "你發現小狗在不適合的位置大小便。牠看起來不是故意搗亂，而是還沒建立固定如廁習慣。",
    topic: "日常行為照顧",
    reportSummary: "狗狗在錯誤位置排泄時，應增加合適的如廁機會、固定位置並正向引導，而不是事後責罵。",
    artIndex: 4,
    multipleChoice: true,
    requiredCorrectOptionIds: ["toilet-material", "toilet-outings", "toilet-expert"],
    wrongOptionIds: ["toilet-scold"],
    correctSummary: ["使用適當材質鋪地，例如報紙或尿布墊。", "一天多安排幾次外出如廁機會。", "若頻率異常或持續困擾，尋求獸醫或行為專家協助。"],
    learningPoints: [
      "睡醒、進食與玩耍後常是如廁時機；在正確地點完成後要**立即獎勵**。",
      "事後責罵無法教會正確地點；若突然頻尿或憋不住，應先請獸醫**排除健康問題**。",
    ],
    choices: [
      { id: "toilet-material", text: "使用適當材質鋪地，例如報紙或尿布墊", result: "correct", ...positive, explanation: "適當材質能幫助建立固定如廁位置，也讓清潔和引導更一致。" },
      { id: "toilet-outings", text: "一天多安排幾次外出如廁機會", result: "correct", ...positive, explanation: "增加合適的外出機會，能讓幼犬有更多時間練習正確如廁。" },
      { id: "toilet-expert", text: "若頻率異常或持續困擾，尋求獸醫或行為專家協助", result: "correct", ...positive, explanation: "頻率異常或持續困擾時，尋求獸醫或行為專家協助能確認是否有健康或行為需求。" },
      { id: "toilet-scold", text: "牠尿錯地方就把牠抓過來罵", result: "incorrect", ...incorrect, explanation: "責罵可能讓狗狗害怕，卻不一定知道正確如廁地點。應增加合適的如廁機會，並在牠於正確地點完成時立即給予獎勵。" },
    ],
  },
  {
    id: "busy-daily-care",
    stage: "當生活發生變化",
    timeLabel: "當生活發生變化",
    title: "疲憊忙碌的日子",
    description: "今天臨時需要加班，早上出門後一路忙到很晚。你已經很疲累，但豆豆仍需要晚餐、乾淨飲水、排泄與適當活動。",
    topic: "時間安排與照顧支援",
    reportSummary: "臨時加班或晚歸時，仍要事先安排可信任的人按時協助餵食、換水、排泄、活動與狀況觀察。",
    artIndex: 5,
    choices: [
      { id: "alone-with-food", text: "早上出門前先多放一些飼料和水，晚上忙完再好好陪牠", result: "incorrect", ...incorrect, explanation: "早上多放食物和水仍不能取代一整天的排泄、活動與狀況觀察，也可能造成過量進食或突發狀況沒有人發現。確定要加班時，應先安排能接手照顧的人，並清楚交接需求。" },
      { id: "family-helper", text: "請同住家人或朋友協助", result: "correct", ...positive, explanation: "你不只是想到一個人，也認真確認對方的時間、意願、照護知識與緊急聯絡方式。這樣的交接才能讓小狗在你忙碌時仍獲得穩定照顧。" },
      { id: "guard-dog-can-wait", text: "狗狗本來就有顧家的功能，在家裡睡久一點沒關係", result: "incorrect", ...incorrect, explanation: "會顧家，不等於能長時間獨處。超過八小時無人照護，狗狗可能錯過排泄、飲水與活動，也可能因焦慮或無聊而吠叫、破壞物品。確定會晚歸時，仍要安排合適的人中途協助照顧。" },
      { id: "hold-until-tomorrow", text: "傍晚到家再餵，至少睡前有吃到晚餐就好", result: "incorrect", ...incorrect, explanation: "把晚餐、排泄與活動一路延後到回家，會讓小狗長時間等待，也無法因應加班比預期更晚或臨時狀況。確定會晚歸時，應先安排可信任的人按平常時間協助基本照顧。" },
    ],
  },
  {
    id: "illness-vet",
    stage: "生病與就醫",
    timeLabel: "生病與就醫",
    title: "柴犬常見健康問題觀察",
    description: "最近你發現小狗常常舔腳、抓癢，走路時偶爾不太想跳上跳下，眼睛也有些紅紅的。",
    topic: "健康觀察與就醫判斷",
    reportSummary: "出現搔癢、活動力下降或眼睛紅等變化時，應記錄食慾、精神與症狀並詢問獸醫，不要自行餵人用藥。",
    artIndex: 3,
    choices: [
      { id: "wait-and-see", text: "先等幾天看看，牠可能只是心情不好", result: "incorrect", ...incorrect, explanation: "等太久可能延誤皮膚過敏、關節不適或眼部問題的處理，讓小狗持續不舒服。", suggestion: "記錄具體症狀與變化，並聯絡獸醫確認是否需要檢查。" },
      { id: "human-medicine", text: "先拿家裡剩下的感冒藥餵一點，看看今晚會不會舒服些", result: "incorrect", ...incorrect, explanation: "即使只是少量，家中的人用感冒藥也可能含有不適合狗狗的成分，並讓原本的症狀更難判斷。", suggestion: "先不要自行給藥；記錄症狀、使用中的用品與可能接觸物，再向獸醫說明。" },
      { id: "record-and-vet", text: "記錄食慾、飲水、排泄、精神與症狀變化，並聯絡獸醫確認是否就醫", result: "correct", ...positive, explanation: "及早觀察與記錄能幫助獸醫判斷。", suggestion: "柴犬較常見需要留意的健康問題包括：\n**皮膚過敏或搔癢**、掉毛、紅腫；\n**關節不適**、跛行或活動力下降；\n**眼睛分泌物增加、紅眼或視力異常**。\n\n如果發現食慾、精神、排泄或活動狀況和平常不同，請記錄變化並尋求獸醫建議。", expenseIds: ["sick-vet-care"] },
      { id: "ask-experienced-friend", text: "先拍照問有養狗的朋友，照他以前遇過的方式處理", result: "incorrect", ...incorrect, explanation: "朋友的經驗可以提供陪伴，但相似外觀不一定代表相同原因，仍可能錯過需要檢查的狀況。可以整理朋友提醒的觀察重點，但醫療判斷與用藥仍應交給獸醫。" },
    ],
  },
  {
    id: "growing-old",
    stage: "逐漸進入高齡",
    timeLabel: "逐漸進入高齡",
    title: "高齡後的照顧準備",
    description: "小狗走路開始變慢，後腳偶爾使不上力，曾經輕鬆走完的路如今需要停下休息。你花更多時間陪牠慢慢曬太陽，也要留意牠來不及走到如廁處時，協助清理排泄物、保持身體乾爽。",
    topic: "高齡照顧與醫療準備",
    reportSummary: "狗狗進入高齡後，可能出現行動退化、排泄照護與醫療需求；應提早準備時間、環境調整和醫療基金。",
    artIndex: 1,
    choices: [
      { id: "senior-plan-ahead", text: "提前規劃醫療基金，學習老年照顧知識，並定期諮詢獸醫", result: "correct", ...positive, explanation: "提前準備能幫助飼主在高齡階段更穩定地照顧小狗，也能及早安排健康觀察、醫療需求與長期照顧。" },
      { id: "senior-wait", text: "等到牠真的很嚴重再處理，平常不用特別準備", result: "incorrect", ...incorrect, explanation: "高齡照顧需要提前準備。等到症狀很嚴重才處理，可能延誤照顧，也會讓小狗承受更多不適；醫療基金、健康觀察與日常照護都應在問題變嚴重前開始規劃。" },
      { id: "senior-human-medicine", text: "自行判斷並使用人用藥物或網路偏方", result: "incorrect", ...incorrect, explanation: "人用藥物或網路偏方可能對小狗造成危險。高齡階段若有健康疑慮，應諮詢獸醫並依專業建議處理。", suggestion: "不要自行給藥；記錄觀察到的變化，再與獸醫討論適合的照顧方式。" },
      { id: "senior-supplements-first", text: "先買大家推薦的保健食品補一補，等下次有空再安排檢查", result: "incorrect", ...incorrect, explanation: "想提早保養是好意，但保健食品不能取代健康檢查，也未必適合牠當下的身體狀況。", suggestion: "先把活動、食慾與排泄變化記下來，和獸醫討論檢查及適合的日常調整。" },
    ],
  },
];

export const catLifeScenarios: Scenario[] = [
  {
    id: "cat-arrival-adjustment",
    stage: "一起生活的第一天",
    timeLabel: "一起生活的第一天",
    title: "第一次來到新家",
    description: "貓咪剛到陌生的新家，躲在外出籠裡觀察。家人很想立刻摸摸牠、抱牠出來看看房間。",
    topic: "貓咪適應新家與安全感",
    reportSummary: "貓咪到家第一天應先進安靜安全的小房間，關好門窗，讓牠自行走出外出籠並用自己的速度探索。",
    artIndex: 0,
    choices: [
      { id: "cat-pull-out", text: "把牠抱出籠，讓牠快點認識新家。", result: "incorrect", ...incorrect, explanation: "強迫離開外出籠可能讓貓咪更緊張，也可能引發防衛或躲藏。", suggestion: "先準備新家中的安靜空間，讓牠自己決定何時探索。" },
      { id: "cat-safe-room", text: "關好門窗，放好食水與砂盆，打開外出籠讓牠自行探索。", result: "correct", ...positive, explanation: "保留退路並降低刺激，能幫助貓咪建立安全感。" },
      { id: "cat-welcome-party", text: "請家人圍過來叫牠，讓牠知道大家都歡迎牠。", result: "incorrect", ...incorrect, explanation: "多人靠近、聲音和注視會讓剛到家的貓咪壓力更高。", suggestion: "先限制人數與聲音，等牠穩定後再慢慢增加互動。" },
      { id: "cat-sit-nearby", text: "一進門就打開全屋，讓牠一次探索所有房間。", result: "incorrect", ...incorrect, explanation: "一次面對整個陌生環境可能增加壓力，也讓牠難以找到可退回的地方。", suggestion: "先在新家準備好的安靜空間適應，再依牠的狀態逐步開放探索範圍。" },
    ],
  },
  {
    id: "cat-night-energy-care",
    stage: "日常照護",
    timeLabel: "日常照護",
    title: "晚上還很有精神",
    description: "夜晚時貓咪仍想活動，注意著玩具、發出互動邀請，也會看向晃動的手腳。你會怎麼安排牠的精力與互動？",
    topic: "貓咪精力與獵捕需求",
    reportSummary: "貓咪晚上仍很有精神時，可安排適量互動與安全實體玩具，並在遊戲後保留安靜休息空間；不要用手腳或雷射光點逗弄。",
    artIndex: 4,
    multipleChoice: true,
    requiredCorrectOptionIds: ["cat-night-safe-toys", "cat-night-play-routine", "cat-night-rest-space"],
    wrongOptionIds: ["cat-night-laser", "cat-night-hands"],
    correctSummary: ["使用逗貓棒、玩偶或球等可實際捕捉的安全玩具。", "安排適量互動遊戲，讓牠追逐、捕捉後慢慢收尾。", "遊戲後保留安靜休息空間，讓牠能自在放鬆。"],
    learningPoints: [
      "安全且能**實際捕捉**的玩具，能協助滿足貓咪的互動與獵捕需求。",
      "不用手腳直接逗弄，也不以雷射光點作為主要遊戲；安排遊戲後讓牠有安靜休息空間。",
    ],
    choices: [
      { id: "cat-night-laser", text: "用雷射光點讓牠一直追，累了自然會休息", result: "incorrect", ...incorrect, explanation: "雷射光點不是可實際捕捉的目標，不建議作為主要遊戲方式。", suggestion: "改用逗貓棒、玩偶或球等安全實體玩具，讓牠能追逐、捕捉並收尾。" },
      { id: "cat-night-safe-toys", text: "準備逗貓棒、玩偶或球等安全實體玩具，讓牠可以追逐與捕捉", result: "correct", ...positive, explanation: "安全、可掌握的實體玩具能提供合適的互動與獵捕出口。" },
      { id: "cat-night-hands", text: "直接用手腳和牠玩，讓牠習慣輕輕撲咬", result: "incorrect", ...incorrect, explanation: "手腳逗弄容易讓貓咪把人的身體當作玩具或獵物。", suggestion: "改用玩具保持安全距離，讓牠追逐的是玩具而不是人的手腳。" },
      { id: "cat-night-play-routine", text: "安排適量互動遊戲，讓牠玩過後慢慢收尾", result: "correct", ...positive, explanation: "規律且不過量的互動，能幫助牠把精力用在合適的活動上。" },
      { id: "cat-night-rest-space", text: "遊戲後保留安靜休息空間，讓牠可以自己放鬆", result: "correct", ...positive, explanation: "有活動也有安靜休息，能讓夜晚的生活節奏更穩定。" },
    ],
  },
  {
    id: "cat-scratching-care",
    stage: "日常照護",
    timeLabel: "日常照護",
    title: "抓沙發",
    description: "貓咪開始抓沙發和其他家具，家人很在意家具受損，但也想用不造成壓力的方式引導牠。你會怎麼做？",
    topic: "貓咪抓磨需求與居家安全",
    reportSummary: "貓咪抓沙發或家具時，應在合適位置提供抓板、抓柱、跳台等安全替代選擇並加以引導；抓磨是自然行為，不應用處罰或侵入性做法處理。",
    artIndex: 4,
    multipleChoice: true,
    requiredCorrectOptionIds: ["cat-scratch-board", "cat-scratch-location", "cat-scratch-climbing"],
    wrongOptionIds: ["cat-scratch-punish", "cat-scratch-trim-natural"],
    correctSummary: ["在合適位置提供穩固抓板、抓柱或跳台。", "引導牠使用替代物，並調整家具保護與動線。", "保留安全的抓磨與攀爬環境，讓自然行為有合適出口。"],
    learningPoints: [
      "抓磨是貓咪的正常行為，和伸展、標記與放鬆有關；重點是提供**穩固、位置合適**的安全替代物。",
      "不應去爪、磨牙或剃鬍鬚。提供抓板、抓柱、跳台與合適引導，才能兼顧家具與貓咪需求。",
    ],
    choices: [
      { id: "cat-scratch-punish", text: "抓到就大聲責罵，讓牠知道不可以抓", result: "incorrect", ...incorrect, explanation: "責罵無法提供替代做法，也可能增加壓力。", suggestion: "把抓板、抓柱或跳台放到合適位置，再用引導與環境管理協助牠使用。" },
      { id: "cat-scratch-board", text: "在牠常抓或常經過的位置放穩固抓板、抓柱或跳台", result: "correct", ...positive, explanation: "位置合適又穩固的替代物，能讓牠把抓磨需求放在安全選擇上。" },
      { id: "cat-scratch-trim-natural", text: "為了不再抓家具，替牠去爪、磨牙或剃鬍鬚", result: "incorrect", ...incorrect, explanation: "去爪、磨牙或剃鬍鬚不是解決抓磨問題的方式，也不應作為日常處理。", suggestion: "提供安全替代環境，並用抓板、抓柱與跳台引導牠自然抓磨。" },
      { id: "cat-scratch-location", text: "在牠使用抓板或抓柱時給予引導，並用家具保護降低抓錯機會", result: "correct", ...positive, explanation: "替代物加上環境調整，比處罰更容易讓行為逐漸穩定。" },
      { id: "cat-scratch-climbing", text: "提供安全跳台或高處，讓牠有合適的活動與觀察空間", result: "correct", ...positive, explanation: "安全的垂直空間能讓貓咪有更多自然活動出口。" },
    ],
  },
  {
    id: "cat-indoor-outdoor-care",
    stage: "日常照護",
    timeLabel: "日常照護",
    title: "牠不想出門",
    description: "貓咪退回安全躲藏空間，不願靠近門口的胸背帶或外出籠。家人想帶牠出門走走，你會怎麼安排？",
    topic: "貓咪外出壓力與室內照護",
    reportSummary: "多數貓咪不需要每天外出活動；當牠不想接近外出用品時，應尊重牠留在室內的需求，提供抓板、跳台與安全玩具等環境豐富化。",
    artIndex: 2,
    multipleChoice: true,
    requiredCorrectOptionIds: ["cat-outdoor-respect-boundary", "cat-outdoor-indoor-enrichment"],
    wrongOptionIds: ["cat-outdoor-force-walk", "cat-outdoor-unprotected", "cat-outdoor-carry"],
    correctSummary: ["尊重牠留在安全室內的需求，不強迫外出。", "提供抓板、跳台與安全玩具等室內環境豐富化。"],
    learningPoints: [
      "多數貓咪不需要每天外出活動；安全的室內環境與互動更符合牠的日常需求。",
      "外出時也不應強抱、徒手抱著或在未防護狀態下放牠離開室內。",
    ],
    choices: [
      { id: "cat-outdoor-force-walk", text: "把牠強抱出門，想說多試幾次就會習慣", result: "incorrect", ...incorrect, explanation: "強迫外出會增加壓力，也可能讓牠更害怕門口、外出用品或照顧者。", suggestion: "先尊重牠留在室內的需求，並用安全的室內環境豐富化提供活動。" },
      { id: "cat-outdoor-respect-boundary", text: "尊重牠留在安全躲藏空間的需求，不強迫牠出門", result: "correct", ...positive, explanation: "尊重壓力訊號能降低恐懼累積，讓牠保有安全感。" },
      { id: "cat-outdoor-unprotected", text: "打開門後讓牠自己出去看看，反正附近很安靜", result: "incorrect", ...incorrect, explanation: "未防護狀態下讓貓咪外出有走失、受驚或其他安全風險。", suggestion: "日常活動可在安全室內完成；真正需要移動時，使用安全外出籠。" },
      { id: "cat-outdoor-indoor-enrichment", text: "在室內提供抓板、跳台與安全玩具，安排合適互動", result: "correct", ...positive, explanation: "室內環境豐富化能滿足活動、觀察與互動需求。" },
      { id: "cat-outdoor-carry", text: "徒手抱著牠到外面透氣，累了再抱回來", result: "incorrect", ...incorrect, explanation: "徒手抱出門容易讓受驚的貓咪掙脫，也會增加壓力與走失風險。", suggestion: "讓牠留在安全室內；需要外出時應使用合適的外出籠。" },
    ],
  },
  {
    id: "cat-busy-care",
    stage: "當生活發生變化",
    timeLabel: "當生活發生變化",
    title: "臨時晚歸，誰來接手？",
    description: "今天臨時需要晚歸，貓咪仍需要有人確認食物、飲水、貓砂盆與環境巡視事項。你會怎麼安排接手照顧？",
    topic: "忙碌時的貓咪日常照顧",
    reportSummary: "臨時晚歸時，應安排可信任的協助者，確認對方有時間、有意願，知道食物、飲水、貓砂盆與環境巡視事項，並保有緊急聯絡方式。",
    artIndex: 5,
    choices: [
      { id: "cat-alone-food", text: "出門前多放一些食物和水，晚點回家再處理其他事", result: "incorrect", ...incorrect, explanation: "食物和水不能取代砂盆確認與環境巡視，也可能讓異常狀況沒有人留意。", suggestion: "先安排可信任的協助者，並清楚交接需要確認的事項。" },
      { id: "family-helper", text: "請可信任的人協助，並逐項確認時間、意願、照護事項與緊急聯絡方式", result: "correct", ...positive, explanation: "貓咪看起來獨立，仍需要穩定的食物、飲水、乾淨砂盆與安全環境。先確認交接內容，能讓牠在你忙碌時仍維持安心與規律。", suggestion: "交接時要說明貓咪個性、互動界線、餵食規則、砂盆與環境巡視重點，以及遇到緊急狀況時如何聯絡。" },
      { id: "cat-no-check", text: "貓咪很獨立，等回家後再一起看就好", result: "incorrect", ...incorrect, explanation: "獨立不代表不需要日常照護與安全巡視。食物、飲水、貓砂盆與環境仍需要有人確認。", suggestion: "安排可信任者協助，並把需要確認的事項交接清楚。" },
      { id: "cat-late-meal", text: "只請人倒飼料，其他事情不用特別交代", result: "incorrect", ...incorrect, explanation: "只補食物會漏掉飲水、貓砂盆與環境巡視，也可能讓協助者不知道異常時怎麼聯絡。", suggestion: "交接前一起確認食物、飲水、貓砂盆、環境巡視與緊急聯絡方式。" },
    ],
  },
  {
    id: "cat-illness-vet",
    stage: "生病與就醫",
    timeLabel: "生病與就醫",
    title: "牠突然變得不太一樣",
    description: "今天你注意到貓咪的食慾、飲水、尿便、活動量與躲藏情況和平常不太一樣。你無法確定原因，但這些明顯改變需要被好好記下來。此刻該怎麼做？",
    topic: "貓咪健康觀察與就醫判斷",
    reportSummary: "貓咪出現食慾、飲水、尿便、活動量或躲藏等明顯改變時，應記錄時間與觀察到的狀況並聯絡獸醫；不要自行判定原因或自行給藥。",
    artIndex: 3,
    choices: [
      { id: "cat-health-wait", text: "先自己猜原因，再多觀察好幾天看看", result: "incorrect", ...incorrect, explanation: "明顯變化不應靠自行判斷原因或拖延很多天。", suggestion: "先記錄時間與觀察到的狀況，並聯絡獸醫討論下一步。" },
      { id: "cat-health-complete-response", text: "記錄觀察到的時間與狀況，並聯絡獸醫", result: "correct", ...positive, explanation: "先紀錄並聯絡獸醫，能協助專業人員判斷合適的下一步。", expenseIds: ["sick-vet-care"] },
      { id: "cat-health-friend", text: "先自己判定只是心情問題，暫時不用聯絡獸醫", result: "incorrect", ...incorrect, explanation: "不要自行判定原因；不同變化可能需要由專業人員結合完整資訊判斷。", suggestion: "整理食慾、飲水、尿便、活動量與躲藏等變化後聯絡獸醫。" },
      { id: "cat-health-medicine", text: "先自行給藥或用網路方法處理，再決定要不要詢問", result: "incorrect", ...incorrect, explanation: "不要自行給藥，這可能讓狀況更難掌握。", suggestion: "記下觀察到的改變後聯絡獸醫，依專業人員建議安排後續。" },
    ],
  },
  {
    id: "cat-growing-old",
    stage: "逐漸進入高齡",
    timeLabel: "逐漸進入高齡",
    title: "貓咪慢慢變老",
    description: "高齡貓最近移動比較慢，進出原本的砂盆也有些猶豫。你想讓牠更容易移動、休息與如廁，會怎麼調整生活空間？",
    topic: "高齡貓環境與健康照顧",
    reportSummary: "高齡貓可透過低入口砂盆、階梯式跳台與溫暖休息處降低移動、休息與如廁負擔，並安排獸醫追蹤。",
    artIndex: 1,
    choices: [
      { id: "cat-senior-complete-plan", text: "提供低入口砂盆、階梯式跳台與溫暖休息處，並安排獸醫追蹤", result: "correct", ...positive, explanation: "隨著年齡調整環境與安排追蹤，能讓牠更容易移動、休息與如廁。", expenseIds: ["cat-senior-room", "senior-checkup"] },
      { id: "cat-senior-supplement-only", text: "只買保健品，環境先不調整，等明顯不舒服再說", result: "incorrect", ...incorrect, explanation: "保健品不能取代生活空間調整與獸醫追蹤。", suggestion: "先把日常移動、休息與如廁需要的環境調整好。" },
      { id: "cat-senior-bed-only", text: "只多放一張軟墊，砂盆和跳台都維持原本高度", result: "incorrect", ...incorrect, explanation: "休息處重要，但不足以處理進出砂盆與跳躍的生活負擔。", suggestion: "同時調整低入口砂盆、階梯式跳台與溫暖休息處。" },
      { id: "cat-senior-keep-jumping", text: "維持原本高跳台和高入口砂盆，讓牠自己慢慢適應", result: "incorrect", ...incorrect, explanation: "高跳躍與高入口可能讓移動和如廁變得更吃力。", suggestion: "改用低入口砂盆、階梯式跳台與容易到達的溫暖休息處。" },
    ],
  },
];

type BreedChallengeQuestion = {
  title: string;
  description: string;
  topic: string;
  reportSummary: string;
  breedKnowledge?: string;
  correctChoiceIndex?: number;
  correctText: string;
  correctExplanation: string;
  distractors: Array<{ text: string; explanation: string; suggestion: string }>;
};

const breedChallengeContent: Record<string, BreedChallengeQuestion[]> = {
  "orange-cat": [
    {
      title: "家庭餵食紀錄",
      description: "家人共同使用餵食紀錄板，上面有早、午、晚、主食與零食欄位。大家都想照顧橘貓，你會怎麼讓餵食安排保持一致？",
      topic: "貓咪家庭餵食紀錄",
      reportSummary: "家人共同照顧橘貓時，應量好食物並記錄每次主食與零食，讓每個人都能看見完整的餵食內容。",
      breedKnowledge: "共同記錄不是限制互動，而是讓每位照顧者都能知道今天已提供的主食與零食，維持穩定的餵食安排。",
      correctChoiceIndex: 1,
      correctText: "先量好主食與零食份量，並由每位家人共同記錄所有餵食內容",
      correctExplanation: "份量加上共同紀錄，能讓照顧安排清楚一致，不需要靠猜測或事後補救。",
      distractors: [
        { text: "每位家人想到就各自投餵，不需要特別登記", explanation: "各自投餵時，容易看不見已經提供過的食物與零食。", suggestion: "量好份量後，把每次餵食共同記錄在同一個地方。" },
        { text: "今天有人多餵了，隔天就直接少給一餐補回來", explanation: "忽多忽少的補救方式不利於穩定安排，也無法取代清楚的共同記錄。", suggestion: "維持原本餵食節奏，從下一次開始依量好的份量共同記錄。" },
        { text: "只記主食就好，零食不用列進餵食紀錄", explanation: "零食也是餵食內容的一部分，省略後會讓紀錄不完整。", suggestion: "把主食與零食都寫進早、午、晚的共同紀錄。" },
      ],
    },
    {
      title: "舒服生活也需要安全高處",
      description: "橘貓常待在沙發旁邊，也喜歡找安靜角落休息。你想讓牠不無聊，又能安全活動。你會怎麼做？",
      topic: "貓咪垂直空間與安全環境",
      reportSummary: "橘貓需要安全高處、休息空間與穩固門窗，避免因環境單調而長時間無聊或冒險攀爬。",
      breedKnowledge: "貓咪需要能觀察環境的高處，也需要可安靜休息的地方。高處必須穩固，門窗與紗窗也要先確認安全。",
      correctChoiceIndex: 3,
      correctText: "提供穩固貓跳台或層架、安靜休息處，並確認門窗與紗窗穩固",
      correctExplanation: "安全高處與休息空間能讓牠活動、觀察與退回，不必靠危險攀爬或長時間無聊來打發生活。",
      distractors: [
        { text: "只放一個軟墊就好，高處容易弄亂不用準備", explanation: "只有睡覺位置可能不足以滿足觀察、活動與安全感需求。", suggestion: "準備穩固高處與可退回的休息點，並整理危險物。" },
        { text: "讓牠自己爬窗簾和衣櫃，貓咪很會平衡", explanation: "窗簾、衣櫃與未固定高處可能造成跌落、夾傷或逃脫風險。", suggestion: "提供可承重的跳台或層架，並確認門窗防護。" },
        { text: "牠無聊就多餵一點，環境不用特別改", explanation: "食物不能取代活動與環境豐富化，也可能增加體重負擔。", suggestion: "用安全高處、抓板與玩具提供日常活動。" },
      ],
    },
    {
      title: "紀錄板上的每一格",
      description: "晚餐前，家人發現餵食紀錄板有一格還沒填。你想讓橘貓的日常餵食資訊清楚、容易交接。你會怎麼做？",
      topic: "貓咪飲食與體重管理",
      reportSummary: "家庭餵食紀錄需包含主食與零食，讓不同照顧者能依同一份資訊安排下一餐。",
      breedKnowledge: "把主食和零食都記錄下來，能讓家人之間更容易接手，也能讓日常安排保持一致。",
      correctChoiceIndex: 2,
      correctText: "確認主食與零食都已寫入共同紀錄，再依量好的份量安排下一餐",
      correctExplanation: "完整記錄能讓每位照顧者知道已提供的內容，避免資訊漏接。",
      distractors: [
        { text: "只要有人記得就好，不必把內容寫在共同紀錄板", explanation: "口頭記憶容易遺漏，其他照顧者也不一定知道今天已餵了什麼。", suggestion: "把主食與零食都寫在家人共同使用的紀錄板上。" },
        { text: "只記錄今天的主食，零食不用算進去", explanation: "零食也是餵食內容，沒有記下來會讓資訊不完整。", suggestion: "主食、零食與餵食時段都一起記錄。" },
        { text: "餵完再說，今天忘了記錄也沒關係", explanation: "漏掉一次紀錄會讓下一位照顧者難以確認今天的安排。", suggestion: "先補上已提供的內容，再一起依紀錄安排下一餐。" },
      ],
    },
  ],
  "tabby-cat": [
    {
      title: "安全捕捉遊戲",
      description: "虎斑貓注意到鞋帶等線狀物。旁邊有已收好的線狀物、逗貓棒、抓板與跳台。你會怎麼安排這次遊戲？",
      topic: "貓咪安全捕捉遊戲",
      reportSummary: "虎斑貓注意線狀物時，應先收好可能誤食的線狀物，改用安全、可實際捕捉的實體玩具互動，並提供抓板或跳台。",
      breedKnowledge: "線狀物應妥善收好；遊戲時用安全、可掌握的實體玩具，能讓貓咪追逐與捕捉而不把危險物當作玩具。",
      correctChoiceIndex: 2,
      correctText: "先收好線狀物，改用安全、可實際捕捉的玩具互動，並提供抓板或跳台",
      correctExplanation: "安全實體玩具能讓牠自然追逐與捕捉，抓板和跳台也提供合適的活動出口。",
      distractors: [
        { text: "用手腳逗牠撲咬，互動會更直接", explanation: "手腳逗弄可能讓貓咪把人的身體當成玩具。", suggestion: "改用安全實體玩具，讓牠追逐的是玩具而不是人的手腳。" },
        { text: "打開雷射筆讓牠一直追光點", explanation: "雷射光點不是可實際捕捉的目標，不建議作為主要遊戲方式。", suggestion: "改用可實際捕捉的逗貓棒、玩偶或球。" },
        { text: "先長時間關在籠裡，等牠不注意線狀物再放出來", explanation: "長時間關籠不是處理危險物或活動需求的方法。", suggestion: "先收好線狀物，再提供安全玩具、抓板與跳台。" },
      ],
    },
    {
      title: "想往高處探索",
      description: "虎斑貓常想跳上窗簾、衣櫃或較高的家具。你擔心牠受傷，也擔心紗窗不夠穩。你會怎麼做？",
      topic: "貓咪垂直空間與安全環境",
      reportSummary: "虎斑貓需要安全垂直空間；若沒有合適高處，可能攀爬窗簾、衣櫃或其他危險位置。",
      breedKnowledge: "垂直空間可以讓貓咪觀察、活動與保有安全感，但高處與門窗必須穩固，不能讓危險位置成為唯一選擇。",
      correctChoiceIndex: 1,
      correctText: "提供貓跳台、層架或安全高處，並確認門窗與紗窗穩固",
      correctExplanation: "把可攀爬路線設計成安全、穩固且可預期，能降低牠往窗簾或危險高處探索的機會。",
      distractors: [
        { text: "牠想爬就讓牠爬，貓咪通常很會落地", explanation: "窗簾、衣櫃或未固定家具仍可能造成受傷、掉落或逃脫風險。", suggestion: "先準備穩固跳台與層架，並檢查門窗安全。" },
        { text: "完全禁止所有高處，牠就不會出事", explanation: "完全禁止可能讓牠缺少觀察與活動出口，反而更想探索危險位置。", suggestion: "提供安全高處，再移除或阻隔危險路線。" },
        { text: "只在窗邊放椅子，不用確認紗窗", explanation: "窗邊高處若沒有穩固紗窗與防護，仍可能有逃脫或墜落風險。", suggestion: "窗邊活動區要搭配穩固防護。" },
      ],
    },
    {
      title: "活動量高也不能無限制吃",
      description: "虎斑貓每天都很會玩，家人覺得牠活動量大，可以一直放滿飼料讓牠自己吃。你會怎麼安排？",
      topic: "貓咪飲食與體重管理",
      reportSummary: "虎斑貓活動量高仍需依年齡、體態與食量安排定時定量，並用益智漏食玩具與觀察紀錄協助管理。",
      breedKnowledge: "活動量高不等於可以無限制任食。飲食仍要依年齡、體態、健康與食慾變化調整。",
      correctChoiceIndex: 3,
      correctText: "依年齡、體態與食量定時定量，收好食物與垃圾，搭配益智漏食玩具並觀察體態",
      correctExplanation: "定時定量能掌握食慾與體態，收好食物與垃圾能避免誤食，益智漏食玩具則能讓進食和活動更安全。",
      distractors: [
        { text: "牠很會跑，所以飼料全天放滿沒關係", explanation: "活動量高仍可能吃過量，也會讓食慾變化不容易被發現。", suggestion: "先建立份量與餵食時間，再依體態調整。" },
        { text: "把人類食物當獎勵，牠玩得多可以吃一點", explanation: "人類食物不一定適合貓咪，調味或特定食材可能造成風險。", suggestion: "不確定食材安全時，查詢可靠資料或詢問獸醫。" },
        { text: "只要牠不胖，就不用記錄吃多少", explanation: "食量變化也是健康線索，不只是在控制體重。", suggestion: "簡單記錄主食、零食與體態變化。" },
      ],
    },
  ],
  shiba: [
    {
      title: "一年四季都在掉毛",
      description: "柴犬換毛量很大，地板、沙發和衣服上常常都看得到毛。面對長期反覆的清潔工作，你會怎麼處理？",
      topic: "柴犬的換毛與居家清潔",
      reportSummary: "柴犬有雙層被毛，平時與換毛期都可能讓家中累積大量毛髮，需要把梳毛、吸塵與衣物除毛納入長期日常。",
      breedKnowledge: "柴犬具有**雙層被毛**，平時就會掉毛，換毛期更會**大量脫落底毛**；生活在較溫暖或室內環境時，掉毛也可能分散在**全年**。規律梳毛與吸塵能減少散落毛髮，但**無法讓家中完全沒有毛**，也不建議只為了止掉毛就任意剃除雙層毛。",
      correctText: "固定梳毛與吸塵，把清潔排進每週生活，也接受家裡不可能完全沒有毛",
      correctExplanation: "規律梳理、清潔與可接受的生活標準，比追求一次清到完全沒毛更能長期維持。",
      distractors: [
        { text: "等毛多到看不下去時，再一次把牠剃得很短", explanation: "一次剃短不等於解決正常換毛，也可能影響毛髮與皮膚保護。", suggestion: "用適合雙層毛犬的工具規律梳理；若皮膚或掉毛狀況異常，再詢問獸醫或美容專業人員。" },
        { text: "平常先用黏毛滾輪處理衣服，地板週末再一起清就好", explanation: "這能暫時改善外觀，但只處理衣服可能讓毛髮持續堆積，也忽略了狗狗本身需要規律梳理。", suggestion: "把短時間梳毛、局部吸塵和衣物除毛拆成可持續的小任務。" },
        { text: "不讓牠進客廳和房間，應該就不需要常常打掃", explanation: "限制活動範圍無法停止換毛，也可能犧牲原本需要的陪伴與生活品質。", suggestion: "可以設定好清潔的休息區與家具保護方式，但仍要安排互動、梳毛與環境清潔。" },
      ],
    },
    {
      title: "颳風下雨也要出門上廁所",
      description: "柴犬通常很愛乾淨，有些柴犬不喜歡在家裡上廁所。即使天氣不好，牠仍在門邊等著外出，你會怎麼做？",
      topic: "柴犬的外出排泄需求",
      reportSummary: "許多柴犬傾向離開生活區域後才排泄，飼主需要每天安排穩定外出，也要準備雨天短路線與室內備案。",
      breedKnowledge: "柴犬往往很重視生活區域的清潔，許多個體會**傾向離開睡眠與活動空間後才排泄**，因此可能逐漸習慣在戶外如廁。這**不代表牠能長時間憋尿**；飼主仍需每天安排**穩定的外出機會**，也要準備雨具、短路線，以及必要時可逐步練習的室內備案。",
      correctText: "準備雨具與擦腳用品，依天氣調整路線和時間，但仍完成安全的外出排泄與基本散步",
      correctExplanation: "把雨具、短路線與回家清潔準備好，才能在壞天氣中持續滿足排泄與活動需求。",
      distractors: [
        { text: "今天雨太大，忍一天不上廁所應該還好，明天再遛久一點", explanation: "把需求延到隔天可能讓狗狗長時間不舒服，隔天加長散步也無法補回今天的排泄需求。", suggestion: "縮短路線、避開危險時段並做好雨天防護，但仍要提供安全如廁機會。" },
        { text: "抱牠到門口看雨，如果牠不肯走就直接回家", explanation: "短暫嘗試是有彈性的做法，但若沒有替代安排，牠仍可能整天缺乏合適的排泄機會。", suggestion: "先找有遮蔽的短路線，也可在平日逐步建立備用的室內如廁選項。" },
        { text: "只要在家鋪很多尿墊，牠應該自然就會改在室內上", explanation: "只增加尿墊不一定能立刻改變已建立的如廁習慣，也可能讓牠更困惑。", suggestion: "若要建立室內備案，需要用固定位置、漸進引導與正向回饋慢慢練習。" },
      ],
    },
  ],
  chihuahua: [
    {
      title: "體型小，也需要每天活動",
      description: "吉娃娃體型小，家人覺得在家裡走動就夠了。牠卻常在門邊等著外出，你會怎麼安排？",
      topic: "吉娃娃的日常活動",
      reportSummary: "吉娃娃體型雖小，仍需要依體力安排規律短散步、嗅聞與安全的環境探索。",
      correctText: "依體力與天氣安排規律短散步，讓牠嗅聞、活動並安全接觸環境",
      correctExplanation: "小型犬仍需要合適的外出活動與環境探索；重點是依牠的體力調整，而不是完全取消。",
      distractors: [
        { text: "牠這麼小，在家跑幾圈應該就夠了", explanation: "室內活動可以補充，但不能完全取代嗅聞、探索與外界經驗。", suggestion: "把散步縮短、分次進行，並觀察牠的體力與情緒。" },
        { text: "只有週末有空時，再一次帶牠走很久", explanation: "集中在單日的大量活動較難形成穩定節奏，也可能超過平時體力。", suggestion: "用每日短時段維持規律，週末再依狀況延長。" },
        { text: "全程抱著出門看風景，這樣也算有散步", explanation: "被抱著能接觸環境，但缺少自主嗅聞與身體活動。", suggestion: "在安全、可控的地方讓牠自己走一段，必要時再抱起休息。" },
      ],
    },
    {
      title: "牙齒清潔不能等有味道才做",
      description: "吉娃娃不太喜歡碰嘴巴，你也常忙到忘記刷牙。你會怎麼建立可持續的口腔照護？",
      topic: "吉娃娃的口腔照護",
      reportSummary: "吉娃娃的口腔照護應從短時間碰觸與刷牙練習開始，並配合定期獸醫檢查。",
      correctText: "從短時間碰觸與獎勵開始，慢慢建立刷牙習慣，並配合定期獸醫檢查",
      correctExplanation: "把口腔照護拆成小步驟，通常比等問題出現後才處理更容易長期維持。",
      distractors: [
        { text: "等聞到明顯口臭，再約時間洗牙就好", explanation: "等到已有明顯變化才處理，可能錯過較早發現問題的機會。", suggestion: "把日常觀察、刷牙練習與定期檢查一起安排。" },
        { text: "每天給潔牙零食，就可以不用碰牠的牙齒", explanation: "潔牙產品可以是輔助，但不等於完整的口腔清潔與檢查。", suggestion: "在牠能接受的程度下逐步練習刷牙，並向獸醫確認適合的產品。" },
        { text: "一次抓緊把牙全部刷完，牠久了就會習慣", explanation: "強迫完成可能增加害怕，讓之後更難碰觸嘴巴。", suggestion: "從一兩秒的碰觸開始，配合獎勵，逐步增加時間。" },
      ],
    },
  ],
  poodle: [
    {
      title: "捲毛需要持續整理",
      description: "貴賓犬的毛看起來不太會掉，但只要幾天沒整理就容易打結。你會怎麼把美容照護放進生活？",
      topic: "貴賓犬的毛髮照護",
      reportSummary: "貴賓犬需要固定梳理與專業美容，不能等到毛結明顯時才一次處理。",
      correctText: "固定在家梳理並預約專業美容，把時間和費用都算進長期照顧",
      correctExplanation: "規律梳理與專業修整能降低打結，也讓身體檢查與清潔更穩定。",
      distractors: [
        { text: "等毛結明顯時，再一次剪短處理", explanation: "等到嚴重打結才處理，可能讓整理更不舒服，也更花時間。", suggestion: "用短時間、高頻率的方式維持梳理。" },
        { text: "每次洗澡時多用潤絲，平常就不用梳", explanation: "洗澡不能取代梳理，毛結遇水後有時反而更難處理。", suggestion: "先學會適合的梳理工具和順序，再配合洗護。" },
        { text: "只整理看得到的表面，裡層交給美容師就好", explanation: "表面整齊不代表靠近皮膚的毛沒有打結。", suggestion: "請美容師示範分層梳理，並建立固定檢查部位。" },
      ],
    },
    {
      title: "聰明也需要動腦",
      description: "貴賓犬很快就學會日常規則，但最近開始因無聊而一直找東西玩。你會怎麼安排？",
      topic: "貴賓犬的互動與腦力刺激",
      reportSummary: "貴賓犬需要把散步、嗅聞、短訓練、益智互動與休息排成可持續的生活節奏。",
      correctText: "把散步、嗅聞、短訓練和益智遊戲輪流安排，並保留休息時間",
      correctExplanation: "多樣但不過量的身體與腦力活動，更能形成可持續的生活節奏。",
      distractors: [
        { text: "買很多玩具放著，牠應該會自己玩", explanation: "玩具若沒有輪替與互動，可能很快失去新鮮感。", suggestion: "少量輪替玩具，並加入一起玩的時間。" },
        { text: "每天把同一個指令練久一點，累了就不會搗蛋", explanation: "重複太久可能造成挫折或失去興趣，不能取代多樣需求。", suggestion: "把訓練拆短，穿插嗅聞、遊戲和休息。" },
        { text: "牠一無聊就給零食，先讓牠安靜下來", explanation: "只用零食停止行為，可能沒有處理真正的活動與互動需求。", suggestion: "先安排合適活動，再把零食當作訓練中的小份獎勵。" },
      ],
    },
  ],
  border: [
    {
      title: "精力不只靠跑步消耗",
      description: "邊境牧羊犬散步回家後仍很有精神，開始在家追逐移動的人和物。你會怎麼調整？",
      topic: "邊境牧羊犬的身心活動",
      reportSummary: "邊境牧羊犬除了規律運動，也需要嗅聞、解題與安定休息，不能只靠增加跑步量消耗精力。",
      correctText: "在規律運動之外加入嗅聞、短訓練與解題遊戲，也練習安定休息",
      correctExplanation: "身體活動、腦力刺激與休息能力都重要，不能只靠增加跑步量。",
      distractors: [
        { text: "每天再多跑一小時，把體力完全耗光", explanation: "只增加高強度運動可能讓體能越來越好，卻沒有學會安定與動腦。", suggestion: "把活動種類分散，並安排降速與休息練習。" },
        { text: "在家丟球讓牠一直追，累了自然會停", explanation: "高度重複的追逐可能讓情緒越來越亢奮。", suggestion: "限制追逐時間，穿插嗅聞和冷靜活動。" },
        { text: "牠太興奮就先關在單獨空間，不互動就會安靜", explanation: "短暫降刺激可以幫忙，但長期只隔離沒有教會替代行為。", suggestion: "提供安靜休息區，同時練習可被獎勵的安定行為。" },
      ],
    },
    {
      title: "追逐與牧羊本能需要引導",
      description: "散步時，邊境牧羊犬會盯著腳踏車和跑動的小孩，甚至想衝過去。你會怎麼做？",
      topic: "邊境牧羊犬的追逐管理",
      reportSummary: "邊境牧羊犬出現追逐反應時，應先保持安全距離與牽繩控制，再循序練習把注意力帶回飼主。",
      correctText: "保持安全距離與牽繩控制，練習把注意力帶回飼主，必要時尋求專業協助",
      correctExplanation: "先管理距離與安全，再用循序練習建立新的反應，比硬碰刺激更穩定。",
      distractors: [
        { text: "多靠近幾次讓牠習慣，久了就不會追", explanation: "一下子太靠近刺激，可能讓反應更強，也增加失控風險。", suggestion: "從仍能回應你的距離開始練習。" },
        { text: "看到腳踏車就把牽繩拉得很緊，快速通過", explanation: "安全控制是必要的，但持續拉緊和快速靠近可能讓牠更緊張。", suggestion: "提早拉開距離，用穩定節奏帶離並獎勵回頭。" },
        { text: "改成很晚沒人的時候才散步，就不會遇到問題", explanation: "避開高峰能降低難度，但完全迴避也無法建立可應對的生活能力。", suggestion: "先選較安靜時段，再逐步練習適合的距離。" },
      ],
    },
  ],
  labrador: [
    {
      title: "很愛吃，更需要份量管理",
      description: "拉布拉多總像沒吃飽，家人也很容易被牠的眼神說服多給一點。你會怎麼管理？",
      topic: "拉布拉多的飲食與體重管理",
      reportSummary: "拉布拉多的主食與零食需要全家統一計量和記錄，並依體態與獸醫建議持續調整。",
      correctText: "量好每日主食與零食總量，全家共用紀錄，並依體態和獸醫建議調整",
      correctExplanation: "全家用一致份量與紀錄，比各自憑感覺餵食更容易維持健康體態。",
      distractors: [
        { text: "主食照常，牠表現好時零食多一點沒關係", explanation: "零食也會累積熱量，若沒有算入每日總量，很容易越給越多。", suggestion: "先分出一天可用的獎勵份量，用完就不再增加。" },
        { text: "今天吃多了，明天少餵一餐平衡回來", explanation: "忽多忽少不利於穩定作息，也可能讓飢餓感與討食更明顯。", suggestion: "用固定份量長期調整，不用隔天極端補償。" },
        { text: "讓牠自己決定吃多少，吃飽自然會停", explanation: "有些狗狗不容易自行節制，自由取食可能造成過量。", suggestion: "按量定時餵食，並觀察體態與活動。" },
      ],
    },
    {
      title: "力氣大，散步安全要先練",
      description: "拉布拉多看到喜歡的人和狗就想往前衝，家人有時拉不住。你會怎麼安排散步？",
      topic: "拉布拉多的牽繩與衝動控制",
      reportSummary: "拉布拉多力氣大且容易興奮，主要照顧者都應熟悉合適裝備、距離管理與循序鬆繩練習。",
      correctText: "使用合適胸背與牽繩，從低干擾環境練習鬆繩和回應，再逐步增加難度",
      correctExplanation: "設備、安全距離和循序訓練一起做，能讓散步更可控，也保留探索樂趣。",
      distractors: [
        { text: "牠力氣大就用更短的繩一直拉緊，至少不會跑掉", explanation: "安全控制重要，但全程緊繃可能讓彼此更用力，也沒有教會鬆繩行走。", suggestion: "先在低干擾環境練習，遇到刺激前提早拉開距離。" },
        { text: "讓牠衝過去打完招呼，興奮完就會安靜", explanation: "每次衝拉後都能接近目標，可能反而強化往前衝的行為。", suggestion: "能保持鬆繩與回應時才逐步接近。" },
        { text: "改由力氣最大的家人負責，其他人就不用學", explanation: "只依靠某一位家人的力氣，遇到生活變化時容易失去穩定照顧。", suggestion: "讓主要照顧者都熟悉安全裝備、距離管理與基礎練習。" },
      ],
    },
  ],
};

export function getBreedChallengeScenarios(breedId: string): Scenario[] {
  const questions = breedChallengeContent[breedId] ?? breedChallengeContent.shiba;
  const resolvedBreedId = breedChallengeContent[breedId] ? breedId : "shiba";
  return questions.map((question, index) => ({
    id: `breed-challenge-${index + 1}`,
    stage: "品種的考驗",
    timeLabel: "日常照護",
    title: question.title,
    description: question.description,
    topic: question.topic,
    reportSummary: question.reportSummary,
    breedKnowledge: question.breedKnowledge,
    artIndex: 4,
    choices: buildBreedChallengeChoices(question, index, resolvedBreedId),
  }));
}

function buildBreedChallengeChoices(question: BreedChallengeQuestion, questionIndex: number, breedId: string): ScenarioChoice[] {
  const correctChoice: ScenarioChoice = {
    id: `breed-challenge-${questionIndex + 1}-correct`,
    text: question.correctText,
    result: "correct",
    ...positive,
    explanation: question.correctExplanation,
  };
  const distractorChoices: ScenarioChoice[] = question.distractors.map((choice, choiceIndex) => ({
    id: `breed-challenge-${questionIndex + 1}-distractor-${choiceIndex + 1}`,
    text: choice.text,
    result: "incorrect",
    ...incorrect,
    explanation: choice.explanation,
    suggestion: choice.suggestion,
  }));

  const defaultCorrectIndex = breedId === "shiba" && questionIndex === 1 ? distractorChoices.length : 0;
  const correctIndex = Math.max(0, Math.min(question.correctChoiceIndex ?? defaultCorrectIndex, distractorChoices.length));
  const choices = [...distractorChoices];
  choices.splice(correctIndex, 0, correctChoice);
  return choices;
}

export const journeyItems: JourneyItem[] = [
  { id: "arrival", type: "scenario", timeLabel: "一起生活的第一天", title: "第一天適應新家", scenarioId: "arrival-adjustment" },
  { id: "behavior", type: "scenario", timeLabel: "日常行為照顧", title: "日常行為照顧" },
  { id: "walking", type: "walking", timeLabel: "日常照護", title: "今天也要出門散步" },
  { id: "breed-challenge", type: "breed-challenge", timeLabel: "品種的考驗", title: "品種的考驗" },
  { id: "busy-care", type: "scenario", timeLabel: "當生活發生變化", title: "疲憊忙碌的日子", scenarioId: "busy-daily-care" },
  { id: "sick", type: "scenario", timeLabel: "生病與就醫", title: "生病與就醫", scenarioId: "illness-vet" },
  { id: "senior", type: "scenario", timeLabel: "逐漸進入高齡", title: "小狗逐漸老去", scenarioId: "growing-old" },
];

export const catJourneyItems: JourneyItem[] = [
  { id: "cat-arrival", type: "scenario", timeLabel: "一起生活的第一天", title: "第一天適應新家", scenarioId: "cat-arrival-adjustment" },
  { id: "cat-daily-care", type: "scenario", timeLabel: "日常照護", title: "貓咪日常照護" },
  { id: "cat-daily-inspection", type: "daily-inspection", timeLabel: "日常照護", title: "貓砂盆救援隊" },
  { id: "breed-challenge", type: "breed-challenge", timeLabel: "品種的考驗", title: "品種的考驗" },
  { id: "cat-busy-care", type: "scenario", timeLabel: "當生活發生變化", title: "臨時晚歸，誰來接手？", scenarioId: "cat-busy-care" },
  { id: "cat-sick", type: "scenario", timeLabel: "生病與就醫", title: "生病與就醫", scenarioId: "cat-illness-vet" },
  { id: "cat-senior", type: "scenario", timeLabel: "逐漸進入高齡", title: "貓咪慢慢變老", scenarioId: "cat-growing-old" },
];

export const catDailyBehaviorScenarioIds = ["cat-night-energy-care", "cat-scratching-care", "cat-indoor-outdoor-care"] as const;

// 貓咪專屬互動遊戲設定：貓砂盆救援隊
// targetStamps / 事件輪次 / 場景命中區都集中在這裡，未來要改成 2 次或調整拖曳位置不用進 UI 元件裡找。
export const catLitterRescueConfig = {
  targetStamps: 3,
  weeklyWashRound: 2,
  abnormalObservationRound: 3,
  wasteItems: [
    { id: "urine", label: "尿團", x: 42, y: 62, size: 13 },
    { id: "poop", label: "糞便", x: 59, y: 67, size: 12 },
  ],
  bin: { x: 82, y: 70, size: 16 },
} as const;

export function getLifeScenariosForSpecies(species: string): Scenario[] {
  return species === "cat" ? catLifeScenarios : lifeScenarios;
}

export function getAllScenariosForSpecies(species: string, breedId: string): Scenario[] {
  return [...getLifeScenariosForSpecies(species), ...getBreedChallengeScenarios(breedId)];
}

export function getJourneyItemsForSpecies(species: string): JourneyItem[] {
  return species === "cat" ? catJourneyItems : journeyItems;
}

export const initialLifeActivityState: LifeActivityState = {
  bodyLanguageSignals: [],
  arrivalMealFoodReady: false,
  arrivalMealWaterReady: false,
  walkingPreparedItems: [],
  walkingSceneIndex: 0,
  walkingMinutes: 0,
  walkingPoopCleaned: false,
  walkingComplete: false,
  catInspectionSteps: [],
  sickTimePassComplete: false,
  bodyCareParts: [],
  seniorAdjustments: [],
};
