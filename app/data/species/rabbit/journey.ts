import type { ActivityIntroConfig, JourneyItem, SpeciesScenarioPresentationConfig } from "../../../game-types";

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

export const rabbitDailyBehaviorScenarioIds = ["rabbit-heatstroke-prevention", "rabbit-cecotropes", "rabbit-bath"] as const;

export const rabbitScenarioPresentation: SpeciesScenarioPresentationConfig = {
  defaults: { defaultPetName: "兔子", knowledgeTitle: "兔子小知識", correctFeedbackMedia: { type: "placeholder" } },
  scenarios: {
    "rabbit-heatstroke-prevention": { completionIntro: "你已經把降溫安排放進日常環境。維持涼爽室內與提供陶板涼感墊，能讓{petName}自己選擇舒服的位置。" },
    "rabbit-cecotropes": {},
  },
};

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
      "兔子**不能用水洗澡**——打濕或浸水會造成**極大緊迫**，甚至引發**休克**。梳毛才是 {petName} **最重要的日常護理**。",
      "定期梳理能清除脫落毛髮，避免 {petName} 自行理毛時吞入過多，引發危險的**腸阻塞**。**換毛期間**尤其需要**每天梳**。",
      "今天你要梳理背部、尾根和後肢，並觀察**門齒**與**指甲**的狀態。如果過長，需要請獸醫協助處理。",
    ],
    startLabel: "開始美容時間 →",
    visualAssets: {
      character: rabbitGroomingAsset("rabbit-grooming-eyes-close.webp"),
      tool: rabbitGroomingAsset("grooming-brush.webp"),
      collector: rabbitGroomingAsset("fur-ball-empty.webp"),
    },
  } satisfies ActivityIntroConfig,
  assets: {
    idle: rabbitGroomingAsset("rabbit-grooming-idle.webp"),
    eyesClose: rabbitGroomingAsset("rabbit-grooming-eyes-close.webp"),
    side: rabbitGroomingAsset("rabbit-grooming-side.webp"),
    hindquarters: rabbitGroomingAsset("rabbit-grooming-hindquarters.webp"),
    footpad: rabbitGroomingAsset("rabbit-grooming-footpad.webp"),
    inspection: rabbitGroomingAsset("rabbit-inspection-front.webp"),
    brush: rabbitGroomingAsset("grooming-brush.webp"),
    magnifier: "/assets/shared/magnifier.png",
    furBallEmpty: rabbitGroomingAsset("fur-ball-empty.webp"),
    furBallStep1: rabbitGroomingAsset("fur-ball-step1.webp"),
    furBallStep2: rabbitGroomingAsset("fur-ball-step2.webp"),
    furBallStep3: rabbitGroomingAsset("fur-ball-step3.webp"),
  },
  groomingSteps: [
    { id: "groom-head-ears", stateId: "part-1-step-1-head-ears", completeStateId: "part-1-step-1-complete", label: "頭頂與耳後", instruction: "拖曳梳子，輕輕梳理頭頂與耳後。", character: "idle", furBall: "furBallEmpty" },
    { id: "groom-back-sides", stateId: "part-1-step-2-back-sides", completeStateId: "part-1-step-2-complete", label: "背部與側面", instruction: "拖曳梳子，沿背部與側面梳理。", character: "side", furBall: "furBallStep1" },
    { id: "groom-hind-tail", stateId: "part-1-step-3-hindquarters", completeStateId: "part-1-step-3-complete", label: "後肢及尾根", instruction: "拖曳梳子，仔細梳理後肢及尾根周圍。", character: "hindquarters", furBall: "furBallStep2", caution: "尾根部容易藏污和結毛，是最需要仔細梳理的區域。" },
    { id: "groom-footpad", stateId: "part-1-step-4-footpad", completeStateId: "part-1-complete", label: "足底檢查", instruction: "梳完後肢，順手翻開看看腳底吧\n點擊腳掌，完成足底檢查。", character: "footpad", furBall: "furBallStep3" },
  ],
  sceneDescriptions: {
    part1: "今天早上，你來到 {petName} 身邊，牠正安靜地整理著自己的毛髮。換毛期容易留下細小浮毛，先陪牠完成一趟溫柔的梳毛與足底檢查吧。",
    part2: "梳毛完成後，{petName} 放鬆地待在你身旁。趁這個時候，再一起看看門齒與指甲的外觀，確認牠日常活動時也能舒舒服服。",
  },
  observations: {
    footpad: {
      title: "足底觀察", abnormalTitle: "足底異常", normalImage: rabbitGroomingAsset("footpad-normal.webp"), warningImage: rabbitGroomingAsset("footpad-warning.webp"),
      question: "{petName} 的足底看起來……？",
      choices: [{ id: "normal", label: "正常，毛髮完整" }, { id: "warning", label: "有脫毛或紅腫，需要注意" }],
      incorrectFeedback: {
        normal: "再仔細看看——{petName} 的足底毛髮目前濃密均勻、無紅腫。正常足底膚色均勻，毛髮完整覆蓋。",
        warning: "再仔細看看——{petName} 的足底出現毛髮稀疏或紅腫的跡象，這是足底皮膚炎的早期特徵，需要注意。",
      },
      correctFeedback: {
        normal: "✅ 正確！{petName} 的足底毛髮濃密均勻、沒有紅腫，今天狀況正常。每次梳毛時都記得一併確認。",
        warning: "✅ 正確！你注意到 {petName} 的足底有毛髮稀疏或紅腫的跡象，這是需要留意的狀況。請盡快諮詢兔科獸醫。",
      },
      abnormalDescription: "足底毛髮脫落或出現紅腫，可能是**足底皮膚炎**的早期徵兆，常與地板材質不適合、過重或缺乏活動有關。若發現異狀，請盡快諮詢兔科獸醫。",
    },
    incisor: {
      title: "門齒觀察", abnormalTitle: "門齒異常", normalImage: rabbitGroomingAsset("incisor-normal.webp"), warningImage: rabbitGroomingAsset("incisor-long.webp"),
      question: "{petName} 的門齒看起來……？",
      choices: [{ id: "normal", label: "正常，長度適中" }, { id: "warning", label: "偏長，需要注意" }],
      incorrectFeedback: {
        normal: "再仔細看看——{petName} 的門齒目前長度正常、上下咬合對稱。正常門齒應短而整齊，不超出嘴唇太多。",
        warning: "再仔細看看——{petName} 的門齒已經偏長，留意是否向外延伸、或上下咬合出現不對稱的情形。",
      },
      correctFeedback: {
        normal: "✅ 正確！{petName} 的門齒長度適中、上下咬合對稱，今天沒有異狀。繼續每週確認一次就好。",
        warning: "✅ 正確！你發現 {petName} 的門齒偏長或咬合不對稱，需要盡快諮詢兔科獸醫。",
      },
      abnormalDescription: "門齒明顯向外延伸、上下不對稱時，可能影響進食。請交由兔科獸醫評估，**不可自行剪牙**，以免傷到牙根。",
    },
    nail: {
      title: "指甲觀察", abnormalTitle: "指甲異常", normalImage: rabbitGroomingAsset("nail-normal.webp"), warningImage: rabbitGroomingAsset("nail-long.webp"),
      question: "{petName} 的指甲看起來……？",
      choices: [{ id: "normal", label: "正常，長度適中" }, { id: "warning", label: "偏長，需要注意" }],
      incorrectFeedback: {
        normal: "再仔細看看——{petName} 的指甲目前在正常範圍內。正常指甲應自然彎曲，不超出趾墊、不呈鉤狀。",
        warning: "再仔細看看——{petName} 的指甲已經偏長，留意是否出現明顯的鉤狀彎曲，甚至向趾墊方向捲曲。",
      },
      correctFeedback: {
        normal: "✅ 正確！{petName} 的指甲長度適中、自然彎曲，今天沒有異狀。繼續至少每週確認一次。",
        warning: "✅ 正確！你注意到 {petName} 的指甲偏長或呈鉤狀，建議請兔科獸醫或專業人員協助修剪。",
      },
      abnormalDescription: "指甲過長可能會呈現明顯鉤狀，甚至向趾墊方向捲曲。請請兔科獸醫或專業人員協助修剪，**避免自行修剪**，以免剪到血線造成出血。",
    },
  },
} as const;

export const rabbitJourney = {
  items: rabbitJourneyItems,
  dailyBehaviorScenarioIds: rabbitDailyBehaviorScenarioIds,
  dailyCheck: rabbitDailyCheckConfig,
  activity: "rabbit-daily-check" as const,
} as const;
