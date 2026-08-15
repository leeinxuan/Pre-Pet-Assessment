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
      { id: "force-pick-up", text: "強行抱出來", result: "incorrect", ...incorrect, explanation: "這個做法可能讓牠更緊張。被強行抱起會讓小狗失去退路，增加防衛反應，也可能降低牠對新環境的安全感。", suggestion: "保持距離，提供安靜安全的空間，讓牠用自己的速度探索。" },
      { id: "quiet-explore", text: "保持距離，給牠安靜適應的時間", result: "correct", ...positive, explanation: "剛到新家的小狗需要先觀察環境。保持距離並提供安靜、安全的空間，能減少壓力，讓牠以自己的速度建立安全感。", suggestion: "準備乾淨飲水與可休息的角落，等牠主動靠近後再慢慢增加互動。" },
      { id: "keep-calling", text: "持續靠近並呼喚牠", result: "incorrect", ...incorrect, explanation: "持續靠近與呼喚會增加刺激，讓還在適應中的小狗難以安心觀察，可能變得更緊張或躲避。", suggestion: "先給牠安靜的時間與可退回的安全空間，等待牠主動探索或靠近。" },
      { id: "quiet-nearby", text: "坐在附近陪牠，但每隔一下就伸手摸摸看", result: "incorrect", ...incorrect, explanation: "想陪伴牠的心意很好，但頻繁伸手仍可能讓剛到家的小狗感到壓力，難以真正休息。", suggestion: "可以安靜待在附近，先不主動碰觸，等牠願意靠近時再互動。" },
    ],
  },
  {
    id: "behavior-barking",
    stage: "日常行為照顧",
    timeLabel: "日常照護",
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
    timeLabel: "日常照護",
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
      { id: "chew-punish", text: "看到牠咬東西就立刻打牠或嚇牠", result: "incorrect", ...incorrect, explanation: "打罵或驚嚇可能造成壓力、破壞信任，也不一定能解決探索與情緒需求。", suggestion: "提供安全啃咬玩具、收好危險物品；情況嚴重或持續時可找專業協助。" },
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
    artIndex: 4,
    multipleChoice: true,
    requiredCorrectOptionIds: ["toilet-material", "toilet-outings", "toilet-expert"],
    wrongOptionIds: ["toilet-scold"],
    correctSummary: ["使用適當材質鋪地，例如報紙或尿布墊。", "一天多安排幾次外出如廁機會。", "若頻率異常或持續困擾，尋求獸醫或行為專家協助。"],
    choices: [
      { id: "toilet-material", text: "使用適當材質鋪地，例如報紙或尿布墊", result: "correct", ...positive, explanation: "適當材質能幫助建立固定如廁位置，也讓清潔和引導更一致。" },
      { id: "toilet-outings", text: "一天多安排幾次外出如廁機會", result: "correct", ...positive, explanation: "增加合適的外出機會，能讓幼犬有更多時間練習正確如廁。" },
      { id: "toilet-expert", text: "若頻率異常或持續困擾，尋求獸醫或行為專家協助", result: "correct", ...positive, explanation: "頻率異常或持續困擾時，尋求獸醫或行為專家協助能確認是否有健康或行為需求。" },
      { id: "toilet-scold", text: "牠尿錯地方就把牠抓過來罵", result: "incorrect", ...incorrect, explanation: "責罵可能讓狗狗害怕，卻不一定知道正確如廁地點。", suggestion: "使用適當材質、增加外出機會，並在牠做對時給予獎勵。" },
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
      { id: "alone-with-food", text: "先多放一些飼料和水，等忙完再好好陪牠", result: "incorrect", ...incorrect, explanation: "多放食物和水不能取代排泄、活動與狀況觀察，也可能造成過量進食或突發狀況沒有人發現。", suggestion: "離家前應先確認能接手餵食、飲水、排泄與活動的人選，並清楚交接照顧需求。" },
      { id: "family-helper", text: "請家庭成員協助", result: "correct", ...positive, explanation: "事先確認家庭成員能協助照顧，能讓小狗持續獲得餵食、飲水、排泄照顧與陪伴，不會長時間完全無人照護。" },
      { id: "trusted-helper", text: "請最近幾天有空、也了解照顧需求的朋友協助", result: "correct", ...positive, explanation: "狗狗不能長時間完全無人照護。忙碌或離家時，可以找最近幾天有空、可信任，且願意依照交接內容協助照顧的朋友，協助餵食、換水、清理排泄與觀察狀況。" },
      { id: "hold-until-tomorrow", text: "狗狗忍耐一天不上廁所應該還好，明天再多遛一點補回來", result: "incorrect", ...incorrect, explanation: "把排泄和活動延到隔天，可能讓小狗長時間不舒服，也無法處理今天的基本需求。", suggestion: "今天就安排可信任的人協助排泄與基本活動；照顧不能用隔天加倍來補足。" },
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
      { id: "wait-and-see", text: "先等幾天看看，牠可能只是心情不好", result: "incorrect", ...incorrect, explanation: "等太久可能延誤皮膚過敏、關節不適或眼部問題的處理，讓小狗持續不舒服。", suggestion: "記錄具體症狀與變化，並聯絡獸醫確認是否需要檢查。" },
      { id: "human-medicine", text: "先拿家裡剩下的感冒藥餵一點，看看今晚會不會舒服些", result: "incorrect", ...incorrect, explanation: "即使只是少量，家中的人用感冒藥也可能含有不適合狗狗的成分，並讓原本的症狀更難判斷。", suggestion: "先不要自行給藥；記錄症狀、使用中的用品與可能接觸物，再向獸醫說明。" },
      { id: "record-and-vet", text: "記錄食慾、飲水、排泄、精神與症狀變化，並聯絡獸醫確認是否就醫", result: "correct", ...positive, explanation: "及早觀察與記錄能幫助獸醫判斷。", suggestion: "柴犬較常見需要留意的健康問題包括：\n皮膚過敏或搔癢、掉毛、紅腫；\n關節不適、跛行或活動力下降；\n眼睛分泌物增加、紅眼或視力異常。\n\n如果發現食慾、精神、排泄或活動狀況和平常不同，請記錄變化並尋求獸醫建議。", expenseIds: ["sick-vet-care"] },
      { id: "ask-experienced-friend", text: "先拍照問有養狗的朋友，照他以前遇過的方式處理", result: "incorrect", ...incorrect, explanation: "朋友的經驗可以提供陪伴，但相似外觀不一定代表相同原因，仍可能錯過需要檢查的狀況。", suggestion: "可以整理朋友提醒你的觀察重點，但醫療判斷與用藥仍應交給獸醫。" },
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
      { id: "senior-supplements-first", text: "先買大家推薦的保健食品補一補，等下次有空再安排檢查", result: "incorrect", ...incorrect, explanation: "想提早保養是好意，但保健食品不能取代健康檢查，也未必適合牠當下的身體狀況。", suggestion: "先把活動、食慾與排泄變化記下來，和獸醫討論檢查及適合的日常調整。" },
    ],
  },
];

type BreedChallengeQuestion = {
  title: string;
  description: string;
  topic: string;
  correctText: string;
  correctExplanation: string;
  distractors: Array<{ text: string; explanation: string; suggestion: string }>;
};

const breedChallengeContent: Record<string, BreedChallengeQuestion[]> = {
  shiba: [
    {
      title: "一年四季都在掉毛",
      description: "柴犬換毛量很大，地板、沙發和衣服上常常都看得到毛。面對長期反覆的清潔工作，你會怎麼處理？",
      topic: "柴犬的換毛與居家清潔",
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
  return questions.map((question, index) => ({
    id: `breed-challenge-${index + 1}`,
    stage: "品種的考驗",
    timeLabel: "日常照護",
    title: question.title,
    description: question.description,
    topic: question.topic,
    artIndex: 4,
    choices: [
      {
        id: `breed-challenge-${index + 1}-correct`,
        text: question.correctText,
        result: "correct",
        ...positive,
        explanation: question.correctExplanation,
      },
      ...question.distractors.map((choice, choiceIndex) => ({
        id: `breed-challenge-${index + 1}-distractor-${choiceIndex + 1}`,
        text: choice.text,
        result: "incorrect" as const,
        ...incorrect,
        explanation: choice.explanation,
        suggestion: choice.suggestion,
      })),
    ],
  }));
}

export const journeyItems: JourneyItem[] = [
  { id: "arrival", type: "scenario", timeLabel: "一起生活的第一天", title: "第一天適應新家", scenarioId: "arrival-adjustment" },
  { id: "behavior", type: "scenario", timeLabel: "日常行為照顧", title: "日常行為照顧" },
  { id: "walking", type: "walking", timeLabel: "日常照護", title: "今天也要出門散步" },
  { id: "breed-challenge", type: "breed-challenge", timeLabel: "品種的考驗", title: "品種的考驗" },
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
