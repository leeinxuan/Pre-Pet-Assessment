import type { JourneyItem } from "../../../game-types";

export const rabbitJourneyItems: JourneyItem[] = [
  { id: "rabbit-arrival", type: "scenario", timeLabel: "接回家", title: "第一天適應新家", scenarioId: "rabbit-arrival-adjustment", stageId: "arrival", stageLabel: "接回家" },
  { id: "rabbit-first-meal", type: "arrival-meal", timeLabel: "接回家", title: "第一餐", stageId: "arrival", stageLabel: "接回家" },
  { id: "rabbit-carry-sort", type: "rabbit-carry-sort", timeLabel: "日常照護", title: "和 {petName} 成為好朋友吧！", stageId: "daily", stageLabel: "日常照護" },
  { id: "rabbit-daily-care", type: "scenario", timeLabel: "日常照護", title: "兔兔日常照護", stageId: "daily", stageLabel: "日常照護" },
  { id: "rabbit-daily-check", type: "rabbit-daily-check", timeLabel: "日常照護", title: "{petName} 的美容時間到了！", stageId: "daily", stageLabel: "日常照護" },
  { id: "breed-challenge", type: "breed-challenge", timeLabel: "兔子的考驗", title: "兔子的考驗", stageId: "breed", stageLabel: "兔子的考驗" },
  // 健康與高齡題都屬「生活變化」的延伸，側欄與進度僅維持既有四個共用分類。
  { id: "rabbit-busy-care", type: "scenario", timeLabel: "當生活發生變化", title: "臨時晚歸，{petName} 的照顧怎麼辦？", scenarioId: "rabbit-busy-care", stageId: "life-change", stageLabel: "生活變化" },
  { id: "rabbit-health", type: "scenario", timeLabel: "當生活發生變化", title: "糞便突然變少了", scenarioId: "rabbit-health-emergency", stageId: "life-change", stageLabel: "生活變化" },
  { id: "rabbit-senior", type: "scenario", timeLabel: "當生活發生變化", title: "{petName} 進入高齡期", scenarioId: "rabbit-senior-care", stageId: "life-change", stageLabel: "生活變化" },
];

/** 不含由高溫預防題自動接續的 rabbit-heatstroke-emergency。 */
export const rabbitDailyBehaviorScenarioIds = ["rabbit-heatstroke-prevention", "rabbit-cecotropes", "rabbit-bath"] as const;

export const rabbitDailyCheckConfig = {
  steps: ["groom-head-ears", "groom-back-sides", "groom-hind-tail", "groom-paws", "groom-teeth", "groom-nails"] as const,
} as const;

const rabbitGroomingAsset = (fileName: string) => `/assets/rabbit/weekly-grooming/${fileName}`;

/** 兔子每週美容關卡的素材、固定 state 與文字，畫面元件只依這份設定驅動。 */
export const rabbitGroomingConfig = {
  initialState: "part-1-step-1-head-ears",
  intro: {
    eyebrow: "日常照護",
    title: "{petName} 的美容時間到了！",
    paragraphs: [
      "一般人洗澡時會用水，但兔子截然不同。**把兔子放入水中或全身打濕，會造成極大緊迫**，可能引發**休克**或嚴重壓力反應；就算吹乾，也無法消除過程的傷害。",
      "**梳毛才是兔子最重要的日常護理方式。**定期梳理能清除脫落毛髮，避免牠自行理毛時吞入過多毛髮，引發危險的**腸阻塞**；換毛期尤其重要。",
      "梳理時**後肢及尾根周圍**是最需要仔細照顧的區域，這裡最容易藏污納垢與結毛，也最常被新手飼主忽略。",
      "除了梳毛，你也要學會觀察**門齒**和**指甲**的狀態——過長都需要請獸醫處理，不能自行修剪。",
    ],
    startLabel: "開始美容時間 →",
    visualAssets: {
      character: rabbitGroomingAsset("rabbit-grooming-eyes-close.png"),
      tool: rabbitGroomingAsset("grooming-brush.png"),
      collector: rabbitGroomingAsset("fur-ball-empty.png"),
    },
  },
  assets: {
    idle: rabbitGroomingAsset("rabbit-grooming-idle.png"),
    eyesClose: rabbitGroomingAsset("rabbit-grooming-eyes-close.png"),
    side: rabbitGroomingAsset("rabbit-grooming-side.png"),
    hindquarters: rabbitGroomingAsset("rabbit-grooming-hindquarters.png"),
    footpad: rabbitGroomingAsset("rabbit-grooming-footpad.png"),
    inspection: rabbitGroomingAsset("rabbit-inspection-front.png"),
    brush: rabbitGroomingAsset("grooming-brush.png"),
    furBallEmpty: rabbitGroomingAsset("fur-ball-empty.png"),
    furBallStep1: rabbitGroomingAsset("fur-ball-step1.png"),
    furBallStep2: rabbitGroomingAsset("fur-ball-step2.png"),
    furBallStep3: rabbitGroomingAsset("fur-ball-step3.png"),
  },
  groomingSteps: [
    { id: "groom-head-ears", stateId: "part-1-step-1-head-ears", completeStateId: "part-1-step-1-complete", label: "頭頂與耳後", instruction: "拖曳梳子，輕輕梳理頭頂與耳後。", character: "idle", furBall: "furBallEmpty" },
    { id: "groom-back-sides", stateId: "part-1-step-2-back-sides", completeStateId: "part-1-step-2-complete", label: "背部與側面", instruction: "拖曳梳子，沿背部與側面梳理。", character: "side", furBall: "furBallStep1" },
    { id: "groom-hind-tail", stateId: "part-1-step-3-hindquarters", completeStateId: "part-1-step-3-complete", label: "後肢及尾根", instruction: "拖曳梳子，仔細梳理後肢及尾根周圍。", character: "hindquarters", furBall: "furBallStep2", caution: "尾根部容易藏污和結毛，是最需要仔細梳理的區域。" },
    { id: "groom-footpad", stateId: "part-1-step-4-footpad", completeStateId: "part-1-complete", label: "足底檢查", instruction: "點擊腳掌，完成足底檢查。", character: "footpad", furBall: "furBallStep3" },
  ],
  observations: {
    footpad: {
      title: "足底觀察", normalImage: rabbitGroomingAsset("footpad-normal.png"), warningImage: rabbitGroomingAsset("footpad-warning.png"),
      question: "{petName} 的足底看起來……？",
      choices: [{ id: "normal", label: "正常，毛髮完整" }, { id: "warning", label: "有脫毛或紅腫，需要注意" }],
      incorrectFeedback: {
        normal: "再仔細看看——{petName} 的足底毛髮目前濃密均勻、無紅腫。正常足底膚色均勻，毛髮完整覆蓋。",
        warning: "再仔細看看——{petName} 的足底出現毛髮稀疏或紅腫的跡象，這是足底皮膚炎的早期特徵，需要注意。",
      },
      correctFeedback: "足底需要每次梳毛時一併確認。足底毛髮脫落或出現紅腫，是**足底皮膚炎**的早期徵兆，與地板材質不適合、過重或缺乏活動有關。若發現異狀，請盡快諮詢兔科獸醫。",
      warningExplanation: "⚠️ 足底警告示例——毛髮稀疏、膚色偏紅，可能為足底皮膚炎初期，需要獸醫評估。",
    },
    incisor: {
      title: "門齒觀察", normalImage: rabbitGroomingAsset("incisor-normal.png"), warningImage: rabbitGroomingAsset("incisor-long.png"),
      question: "{petName} 的門齒看起來……？",
      choices: [{ id: "normal", label: "正常，長度適中" }, { id: "warning", label: "偏長，需要注意" }],
      incorrectFeedback: {
        normal: "再仔細看看——{petName} 的門齒目前長度正常、上下咬合對稱。正常門齒應短而整齊，不超出嘴唇太多。",
        warning: "再仔細看看——{petName} 的門齒已經偏長，留意是否向外延伸、或上下咬合出現不對稱的情形。",
      },
      correctFeedback: "門齒需要每週至少確認一次。正常門齒短而整齊、上下咬合對稱。若發現偏長或歪斜，請盡快諮詢兔科獸醫——**不可自行剪牙**，強行處理可能傷到牙根。",
      warningExplanation: "⚠️ 偏長的門齒示例——門齒明顯向外延伸，上下不對稱，需要獸醫評估。",
    },
    nail: {
      title: "指甲觀察", normalImage: rabbitGroomingAsset("nail-normal.png"), warningImage: rabbitGroomingAsset("nail-long.png"),
      question: "{petName} 的指甲看起來……？",
      choices: [{ id: "normal", label: "正常，長度適中" }, { id: "warning", label: "偏長，需要注意" }],
      incorrectFeedback: {
        normal: "再仔細看看——{petName} 的指甲目前在正常範圍內。正常指甲應自然彎曲，不超出趾墊、不呈鉤狀。",
        warning: "再仔細看看——{petName} 的指甲已經偏長，留意是否出現明顯的鉤狀彎曲，甚至向趾墊方向捲曲。",
      },
      correctFeedback: "指甲需要至少每週確認一次。正常指甲應自然彎曲，不超出趾墊太多。若發現偏長或鉤狀，請請兔科獸醫或專業人員協助修剪——**避免自行修剪**，以免剪到血線造成出血。",
      warningExplanation: "⚠️ 偏長的指甲示例——指甲呈明顯鉤狀，已超出趾墊，需要專業修剪。",
    },
  },
} as const;

export const rabbitJourney = {
  items: rabbitJourneyItems,
  dailyBehaviorScenarioIds: rabbitDailyBehaviorScenarioIds,
  dailyCheck: rabbitDailyCheckConfig,
  activity: "rabbit-daily-check" as const,
} as const;
