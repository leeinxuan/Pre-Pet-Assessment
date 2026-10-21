import type { ActivityIntroConfig, Scenario } from "../../../game-types";
import type { InteractionCompletionContent } from "../../shared/species-config-types";
import { incorrect, positive } from "../../shared/scenario-feedback";
import { rabbitReport } from "./report";

/** 所有兔子專屬互動遊戲的資料、素材、步驟與完成內容皆集中於此。 */
export const rabbitDailyCheckConfig = {
  steps: ["groom-head-ears", "groom-back-sides", "groom-hind-tail", "groom-paws", "groom-eating", "groom-nails"] as const,
} as const;

const rabbitGroomingAsset = (fileName: string) => `/assets/rabbit/weekly-grooming/${fileName}`;

export const rabbitGroomingConfig = {
  initialState: "part-1-step-1-head-ears",
  intro: {
    eyebrow: "日常照護",
    title: "{petName} 的美容時間到了！",
    paragraphs: [
      "兔子**不能用水洗澡**——打濕或浸水會造成**極大緊迫**，甚至引發**休克**。梳毛才是 {petName} **最重要的日常護理**。",
      "定期梳理能清除脫落毛髮，避免 {petName} 自行理毛時吞入過多，引發危險的**腸阻塞**。**換毛期間**尤其需要**每天梳**。",
      "今天你要梳理背部、尾根和後肢，並觀察**進食狀況**與**指甲**的狀態。如果有異常，需要請獸醫協助處理。",
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
    magnifier: "/assets/shared/magnifier.webp",
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
    part2: "梳毛完成後，{petName} 放鬆地待在你身旁。趁這個時候，再一起觀察進食與指甲的狀況，確認牠日常活動時也能舒舒服服。",
  },
  observations: {
    footpad: {
      title: "足底觀察", abnormalTitle: "足底異常", normalImage: rabbitGroomingAsset("footpad-normal.webp"), warningImage: rabbitGroomingAsset("footpad-warning.webp"),
      question: "{petName} 的足底看起來……？", choices: [{ id: "normal", label: "正常，毛髮完整" }, { id: "warning", label: "有脫毛或紅腫，需要注意" }],
      incorrectFeedback: { normal: "再仔細看看——{petName} 的足底毛髮目前濃密均勻、無紅腫。正常足底膚色均勻，毛髮完整覆蓋。", warning: "再仔細看看——{petName} 的足底出現毛髮稀疏或紅腫的跡象，這是足底皮膚炎的早期特徵，需要注意。" },
      correctFeedback: { normal: "✅ 正確！{petName} 的足底毛髮濃密均勻、沒有紅腫，今天狀況正常。每次梳毛時都記得一併確認。", warning: "✅ 正確！你注意到 {petName} 的足底有毛髮稀疏或紅腫的跡象，這是需要留意的狀況。請盡快諮詢**熟悉兔子醫療的獸醫師**。" },
      abnormalDescription: "足底毛髮脫落或出現紅腫，可能是**足底皮膚炎**的早期徵兆，常與地板材質不適合、過重或缺乏活動有關。若發現異狀，請盡快諮詢**熟悉兔子醫療的獸醫師**。",
      correctSummary: "每次梳毛時應檢查足底是否有紅腫或脫毛，出現異狀代表可能是足底潰瘍，需盡快就醫，而非繼續觀察等待。",
    },
    eating: {
      title: "進食觀察", abnormalTitle: "進食異常", normalImage: rabbitGroomingAsset("eating-normal.webp"), warningImage: rabbitGroomingAsset("eating-warning.webp"),
      question: "觀察 {petName} 吃牧草的狀況，你覺得進食情形如何？", choices: [{ id: "normal", label: "正常，進食順暢" }, { id: "warning", label: "吃草遲疑、掉食或嘴邊潮濕，需要注意" }],
      incorrectFeedback: { normal: "其實 {petName} 今天進食狀況正常。觀察吃草行為是最實際的方式：咀嚼靈活、牧草消耗正常，通常代表牙齒沒問題。", warning: "仔細看——{petName} 吃草時遲疑、嘴邊潮濕，可能是門齒異常的訊號，發現這類狀況請盡快諮詢獸醫師，不可自行剪牙。" },
      correctFeedback: { normal: "✅ 進食看起來順暢！咀嚼牧草是兔子最重要的磨牙方式。觀察吃草的樣子，是判斷牙齒狀況最實際的方法。", warning: "✅ 觀察得很仔細！進食遲疑、掉食或嘴邊潮濕，可能是門齒過長的訊號。兔牙是空心的，必須由獸醫師處理，不可自行修剪。" },
      abnormalDescription: "觀察兔子吃牧草的狀況是判斷牙齒健康的最實際方式，若出現**遲疑、掉食或嘴邊潮濕**，應諮詢獸醫師，**不可自行修剪兔牙**。",
      correctSummary: "觀察兔子吃牧草的狀況是判斷牙齒健康的最實際方式，若出現遲疑、掉食或嘴邊潮濕，應諮詢獸醫師，不可自行修剪兔牙。",
    },
    nail: {
      title: "指甲觀察", abnormalTitle: "指甲異常", normalImage: rabbitGroomingAsset("nail-normal.webp"), warningImage: rabbitGroomingAsset("nail-long.webp"),
      question: "{petName} 的指甲看起來……？", choices: [{ id: "normal", label: "正常，長度適中" }, { id: "warning", label: "偏長，需要注意" }],
      incorrectFeedback: { normal: "再仔細看看——{petName} 的指甲目前在正常範圍內。正常指甲應自然彎曲，不超出趾墊、不呈鉤狀。", warning: "再仔細看看——{petName} 的指甲已經偏長，留意是否出現明顯的鉤狀彎曲，甚至向趾墊方向捲曲。" },
      correctFeedback: { normal: "✅ 正確！{petName} 的指甲長度適中、自然彎曲，今天沒有異狀。繼續至少每週確認一次。", warning: "✅ 正確！你注意到 {petName} 的指甲偏長或呈鉤狀，建議請**熟悉兔子醫療的獸醫師**或專業人員協助修剪。" },
      abnormalDescription: "指甲過長可能會呈現明顯鉤狀，甚至向趾墊方向捲曲。請**熟悉兔子醫療的獸醫師**或專業人員協助修剪，**避免自行修剪**，以免剪到血線造成出血。",
      correctSummary: "兔子指甲每 4–6 週需觀察一次，過長時應請獸醫師或專業美容師修剪，不可自行處理以免剪到血管造成出血。",
    },
  },
} as const;

const rabbitHoldStepAssets = {
  approach: "/assets/rabbit/pet-journey/rabbit-hold-step-1-approach.webp",
  handSniff: "/assets/rabbit/pet-journey/rabbit-hold-step-2-hand-sniff.webp",
  headStroke: "/assets/rabbit/pet-journey/rabbit-hold-step-3-head-stroke.webp",
  supportChestHindquarters: "/assets/rabbit/pet-journey/rabbit-hold-step-4-support-chest-hindquarters.webp",
  holdClose: "/assets/rabbit/pet-journey/rabbit-hold-step-5-hold-close.webp",
} as const;

export const rabbitCarrySortSteps = [
  { text: "緩慢靠近，不發出大聲音，蹲低到與 {petName} 視線同高", hint: "突然靠近或蹲太快都會嚇到兔子，牠可能逃跑或警戒。", image: rabbitHoldStepAssets.approach },
  { text: "伸出手背讓 {petName} 嗅聞，等牠不緊張", hint: "讓兔子先認識你的氣味，才能進行下一步。不要急著摸牠。", image: rabbitHoldStepAssets.handSniff },
  { text: "輕輕摸頭頂，確認 {petName} 沒有蹲低或後退", hint: "摸頭是確認兔子放鬆的重要步驟，耳朵貼後、蹲低代表牠還不安心。", image: rabbitHoldStepAssets.headStroke },
  { text: "一手托住胸口，另一手同時托住臀部", hint: "兩手必須同時支撐，單手抓會讓兔子掙扎，增加骨折風險。", image: rabbitHoldStepAssets.supportChestHindquarters },
  { text: "讓 {petName} 靠著你的身體，前肢有支撐", hint: "兔子靠著身體才有安全感，懸空抱容易引發恐慌和掙扎。", image: rabbitHoldStepAssets.holdClose },
] as const;

export const rabbitActivityScenarios: Record<"rabbit-carry-sort" | "rabbit-daily-check", Scenario> = {
  "rabbit-carry-sort": {
    id: "rabbit-carry-sort", stage: "日常照護", stageId: "daily", stageTitle: "日常照護", timeLabel: "日常照護", title: "和{petName} 成為好朋友吧！",
    description: "{petName} 已經到家一段時間了，跟你越來越熟悉。\n今天，你想試著第一次把牠抱起來。你慢慢靠近，{petName} 停下來看著你，鬍鬚輕輕一動。",
    topic: "安全抱兔", reportSummary: "抱兔前先讓牠放鬆，並以雙手支撐胸口與臀部、靠近身體保持穩定。", artIndex: 0,
    questionText: "請把這 5 個動作拖曳到正確的順序，安全地抱起 {petName}。", activityCompletionTitle: "你已學會安全抱起 {petName} 的方式！", activityRevealNotice: "不用擔心，抱兔子確實需要練習～我們一起看看正確的步驟吧！",
    completionFeedback: { title: "做得很好！", encouragement: "你知道怎麼讓 {petName} 安心被抱起，做得很好！每一個步驟都是在幫牠建立對你的信任。", knowledgeTitle: "兔兔小知識", knowledgeContent: [{ type: "paragraph", text: "**緩慢靠近、先讓牠嗅聞**，再確認牠沒有緊張或後退。抱起時要**同時托住胸口與臀部，讓牠靠著身體**；不可拎耳朵或讓腹部朝上。" }] },
    completionReminder: { title: "<danger>請不要這樣抱兔兔</danger>", items: [
      { title: "<danger>從耳朵拎起</danger>", description: "耳朵是兔子的散熱器官，<danger>從耳朵拎起</danger>會造成劇烈疼痛，掙扎可能導致腰椎受損甚至下半身癱瘓。", imagePlaceholderLabel: "從耳朵拎起示意圖片待補", image: "/assets/rabbit/weekly-grooming/rabbit-lifted-by-ears.webp", imageAlt: "從耳朵拎起兔子的錯誤抱法示意" },
      { title: "<danger>讓牠腹部朝上</danger>", description: "<danger>腹部朝上</danger>對兔子造成極大緊迫，可能引發驚嚇性休克，即使牠看起來沒有掙扎也不代表牠不緊張或害怕。", imagePlaceholderLabel: "腹部朝上示意圖片待補", image: "/assets/rabbit/weekly-grooming/rabbit-held-belly-up.webp", imageAlt: "讓兔子腹部朝上的錯誤抱法示意" },
    ], footer: "如果兔兔抗拒或退避，不要強迫互動" },
    choices: [
      { id: "rabbit-carry-incorrect", text: "需要重新思考順序", result: "incorrect", ...incorrect, explanation: "安全抱兔需要循序降低緊張感，確認每一步都完成後再往下。" },
      { id: "rabbit-carry-complete", text: "完成安全抱兔步驟", result: "correct", ...positive, explanation: "你用循序、穩定的方式照顧牠的安全感。" },
    ],
    correctSummary: ["抱兔子需要緩慢靠近、先讓牠嗅聞，再確認放鬆後同時托住胸口與臀部，絕不可拎耳朵或讓腹部朝上。"],
  },
  "rabbit-daily-check": {
    id: "rabbit-daily-check", stage: "日常照護", stageId: "daily", stageTitle: "日常照護", timeLabel: "日常照護", title: "{petName} 的美容時間到了！",
    description: "完成梳毛、足底確認、進食與指甲觀察，讓每週保養成為健康觀察的機會。", questionText: "開始今天的美容保養吧。", topic: "兔兔美容保養", reportSummary: "每週梳理後肢及尾根、確認足底、進食與指甲，能及早發現健康變化。", artIndex: 0,
    completionFeedback: { title: "做得很好！", encouragement: "你完成了今天的保養——梳毛、足底確認、進食與指甲觀察。定期梳毛，尤其是後肢及尾根周圍，能清除皮屑及脫落毛髮，減少 {petName} 自行理毛時食入過多毛髮引發腸阻塞的機會。", knowledgeTitle: "保養不只是好看，更是健康觀察的機會", knowledgeContent: [
      { type: "paragraph", text: "每週幫 {petName} 梳毛時，可以觀察皮膚異常、脫毛區塊、足底紅腫或換毛量是否超乎尋常。" },
      { type: "paragraph", text: "進食與指甲至少一週觀察一次；進食時出現遲疑、掉食或嘴邊潮濕應諮詢獸醫師，指甲偏長建議由獸醫或專業人員協助修剪。" },
      { type: "paragraph", text: "後肢及尾根周圍容易藏污和結毛，是最需要仔細梳理的區域。" },
      { type: "paragraph", text: "建議頻率：短毛兔每週梳毛 2–3 次、換毛期每日；長毛兔每日梳毛；每次梳毛時檢查足底。" },
    ] },
    choices: [
      { id: "rabbit-daily-check-incorrect", text: "需要重新確認", result: "incorrect", ...incorrect, explanation: "這一項還沒完成。請依兔子的日常需求重新處理。" },
      { id: "rabbit-daily-check-complete", text: "完成美容保養", result: "correct", ...positive, explanation: "你完成了今天的保養——梳毛、足底確認、進食與指甲觀察。" },
    ],
  },
};

export const rabbitGroomingCompletion: InteractionCompletionContent = {
  title: "{petName} 的美容時間到了！",
  subtitle: "你完成了今天的保養——梳毛、足底確認、進食與指甲觀察。",
  description: "定期梳毛，尤其注意**後肢及尾根周圍**，能預防皮膚感染、降低**腸阻塞**風險。**進食及指甲至少一週觀察一次**——進食出現異常或指甲偏長時，請諮詢**熟悉兔子醫療的獸醫師**或專業人員。",
  reflectionTitle: "兔子需要的照護時間，比許多人想的還要長",
  reflectionContent: ["兔子的日常照護不只是補飼料、換水而已。牧草補充、便盆清潔、新鮮蔬菜備製、健康觀察，加上**每天至少 30–60 分鐘的放風與陪伴**——每一項都需要固定時間投入，無法用假日一次補回。請想一想：在接下來每一天的生活裡，你能為 {petName} 穩定留出這段時間嗎？"],
  careTimeTitle: "每天留給牠的照護時間",
  careTimeItems: rabbitReport.dailyCareBreakdown,
  careTimeSupplement: {
    title: "每週保養建議頻率",
    items: [
      { title: "梳毛（短毛兔）", detail: "每週 2–3 次；換毛期每日", description: "清除脫落毛髮，防止皮膚感染與腸阻塞" },
      { title: "梳毛（長毛兔）", detail: "每日", description: "換毛期尤其重要，每日梳毛" },
      { title: "進食觀察", detail: "至少每週一次", description: "確認咀嚼順暢；出現遲疑、掉食或嘴邊潮濕時需諮詢**熟悉兔子醫療的獸醫師**" },
      { title: "指甲觀察", detail: "至少每週一次", description: "確認長度正常；修剪需由獸醫或專業人員協助" },
      { title: "足底檢查", detail: "每次梳毛時", description: "確認足底毛髮與皮膚無紅腫或脫毛" },
    ],
  },
  continueLabel: "繼續生活旅程",
};
