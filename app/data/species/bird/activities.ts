import type { ActivityIntroConfig, Scenario } from "../../../game-types";
import { positive } from "../../shared/scenario-feedback";
import { birdAssets } from "./assets";

/** 專屬活動元件僅由本檔取得鳥籠遊戲所需素材。 */
export { birdAssets };
export { birdReport } from "./report";

/**
 * 鸚鵡鳥籠巡視的題目、選項與素材。
 * 元件只負責互動狀態機與畫面組合；物種內容一律由這裡提供。
 */
export const birdCageInspectionActivityData = {
  healthPoints: [
    { id: "eyes", label: "眼睛", images: birdAssets.dailyGame.parts.eyes, alt: "鸚鵡的眼睛特寫", abnormalDescription: "眼分泌物、紅腫或半閉眼都是警訊，請當天聯繫**熟悉鳥類醫療的獸醫師**。", choices: { normal: "看起來清亮，今天沒問題", warning: "有異常，需要留意" }, feedback: { normal: { correct: "✅ 正確！{petName} 的眼睛今天清亮有神，無分泌物或腫脹，是健康的表現。繼續每天觀察。", incorrect: "其實 {petName} 的眼睛今天是正常的——清亮、無分泌物。健康的鳥眼應清晰有神；若出現眼屎、腫脹或半閉才需要注意。" }, warning: { correct: "✅ 正確！你發現了眼睛異常——眼分泌物、紅腫或半閉眼都是警訊，請當天聯繫**熟悉鳥類醫療的獸醫師**。", incorrect: "仔細再看——{petName} 的眼睛今天有異常，不能視為正常。眼睛異常可能代表感染或全身性疾病，請盡快聯繫**熟悉鳥類醫療的獸醫師**。" } } },
    { id: "feathers", label: "羽毛", images: birdAssets.dailyGame.parts.feathers, alt: "鸚鵡的羽毛特寫", abnormalDescription: "澎毛（非睡眠狀態）、凌亂或出現裸皮，都是需要盡快就醫的警訊。", choices: { normal: "羽毛整齊，今天狀況好", warning: "羽毛有異常，需要留意" }, feedback: { normal: { correct: "✅ 正確！{petName} 的羽毛今天整齊、有光澤，沒有蓬鬆或凌亂，是健康的表現。", incorrect: "其實 {petName} 的羽毛今天是正常的——整齊、有光澤。健康的鳥只有在睡覺或放鬆時才會稍微蓬羽，清醒時持續澎毛才需注意。" }, warning: { correct: "✅ 正確！你發現了羽毛異常——澎毛（非睡眠狀態）、凌亂或出現裸皮，都是需要盡快就醫的警訊。鳥類澎毛常是不適的第一個外顯訊號。", incorrect: "仔細再看——{petName} 現在的羽毛不正常（非睡眠時澎毛／凌亂／裸皮），可能代表身體不適或疾病，請當天聯繫**熟悉鳥類醫療的獸醫師**。" } } },
    { id: "feet", label: "腳和棲木", images: birdAssets.dailyGame.parts.feet, alt: "鸚鵡雙腳抓握棲木的特寫", abnormalDescription: "抓握無力、腫脹或結痂，可能影響站姿與健康，請盡快諮詢**熟悉鳥類醫療的獸醫師**。", choices: { normal: "腳趾抓握正常，沒問題", warning: "腳有異常，需要留意" }, feedback: { normal: { correct: "✅ 正確！{petName} 的腳趾今天抓握棲木穩固，無腫脹或結痂，是健康的表現。", incorrect: "其實 {petName} 的腳今天是正常的——抓握穩固、無異狀。健康的鳥能穩定站在棲木上，腳趾無腫脹或過多角質。" }, warning: { correct: "✅ 正確！你注意到了腳部異常——抓握無力、腫脹或結痂，可能影響站姿與健康，請盡快諮詢**熟悉鳥類醫療的獸醫師**。", incorrect: "仔細再看——{petName} 的腳有異常（抓握無力／腫脹／結痂），不能忽視。鳥站不穩或頻繁換腳，可能是腳部疾病或神經問題的警訊。" } } },
    { id: "breathing", label: "呼吸狀況", images: birdAssets.dailyGame.parts.breathing, alt: "鸚鵡胸腹呼吸起伏的特寫", abnormalDescription: "張口呼吸或尾羽隨呼吸上下起伏是鳥類急症，請立刻聯繫**熟悉鳥類醫療的獸醫師**，不能等待。", choices: { normal: "呼吸平順，沒有問題", warning: "呼吸有異常，需要立即注意" }, feedback: { normal: { correct: "✅ 正確！{petName} 的呼吸今天平順，靜止時幾乎看不出起伏，沒有張口，是健康的表現。", incorrect: "其實 {petName} 今天的呼吸是正常的——安靜時幾乎看不出呼吸動作。只有張口呼吸或尾羽隨呼吸明顯起伏，才是緊急警訊。" }, warning: { correct: "✅ 正確！你發現了呼吸異常——🚨 張口呼吸或尾羽隨呼吸上下起伏是鳥類急症，請立刻聯繫**熟悉鳥類醫療的獸醫師**，不能等待。", incorrect: "仔細再看——{petName} 現在的呼吸有異常（張口呼吸或尾羽起伏），這是鳥類急症警訊，不能視為正常。請立刻聯繫**熟悉鳥類醫療的獸醫師**，呼吸困難屬緊急狀況。" } } },
  ] as const,
  droppingOptions: [
    { id: "healthy", image: birdAssets.dailyGame.droppings.healthy, alt: "健康的糞便", title: "正常", form: "成形", color: "深綠色", urate: "白色乾燥", meaning: "表示今天腸胃與水分正常，繼續維持。", attention: "正常", feedback: { correct: "✅ 正確！今天的糞便成形、深綠色，尿酸部分白色乾燥，是腸胃與水分正常的表現，繼續保持每天觀察的習慣。", incorrect: "其實今天的糞便是正常的——成形、深綠色、尿酸白色乾燥。健康的鸚鵡糞便應有固態部分；若糞便偏軟水、顏色異常或量少才是警訊。" } },
    { id: "watery", image: birdAssets.dailyGame.droppings.watery, alt: "水狀、顏色異常的糞便", title: "需要留意", form: "水分過多", color: "偏綠黑帶紅或黃色", urate: "需持續觀察", meaning: "可能有消化問題或感染徵兆，建議今天觀察精神與食慾，若持續出現請聯繫**熟悉鳥類醫療的獸醫師**。", attention: "需要留意", feedback: { correct: "✅ 正確！你注意到了糞便異常——水分過多或顏色異常可能是消化問題或感染的徵兆，建議今天持續觀察精神與食慾，若持續出現請聯繫**熟悉鳥類醫療的獸醫師**。", incorrect: "仔細再看——今天的糞便顏色或形狀有異常（水狀或色偏），不能視為正常。鸚鵡糞便若持續偏水、帶紅或發黑，可能代表腸道問題，請密切觀察並諮詢**熟悉鳥類醫療的獸醫師**。" } },
    { id: "small", image: birdAssets.dailyGame.droppings.small, alt: "量很少的糞便", title: "需要留意", form: "量明顯少於平常", color: "需搭配食量觀察", urate: "需持續觀察", meaning: "若同時觀察到食慾下降，是需要注意的警訊，請今天聯繫**熟悉鳥類醫療的獸醫師**確認。", attention: "需要留意", feedback: { correct: "✅ 正確！糞便量明顯偏少是需要注意的警訊，若同時觀察到食慾下降，請今天就聯繫**熟悉鳥類醫療的獸醫師**確認。", incorrect: "仔細再看——今天的糞便量比平常少，這不是正常的，不能忽視。糞便量驟減＋食慾下降是重要警訊，若同時出現請當天聯繫**熟悉鳥類醫療的獸醫師**。" } },
  ] as const,
} as const;

export const birdCageInspectionConfig = {
  intro: {
    eyebrow: "日常照護",
    title: "{petName} 看起來沒事，不代表牠真的沒事",
    paragraphs: [
      "鳥類演化出了強大的**隱藏病徵能力**——就算生病，也會盡力維持正常外表。等到 {petName} 明顯**嗜睡**或**澎毛**，往往代表病情**已相當嚴重**。",
      "**每天主動觀察**是最好的預防方式。**糞便的狀態**、**羽毛的光澤**、**眼睛是否清亮**——這些細節只有每天看著牠的你才能發現異常。",
      "今天的巡視，就是你和 {petName} 之間的默契。",
    ],
    startLabel: "開始今日巡視 →",
    visualAssets: {
      character: birdAssets.dailyGame.birdCloseup,
      tool: birdAssets.dailyGame.magnifier,
      collector: birdAssets.dailyGame.beddingDirty,
    },
  } satisfies ActivityIntroConfig,
  targetStamps: 4,
  bodyInspection: { requiresOrderedInspection: false, showPointNumbers: false },
  steps: ["tray-clean", "feces-observed", "health-observed", "social-time"] as const,
  cageOut: {
    initialPrompt: "先確認兩側窗戶都關好了，再為 {petName} 打開籠門。",
    oneWindowClosedPrompt: "已關好一扇窗，再確認另一側窗戶。",
    windowsClosedPrompt: "門窗都關好了！現在可以點擊籠門鎖扣。",
    unsafeDoorPrompt: "你確認過門窗已關好了嗎？{petName} 一旦飛出室外很難找回來。",
    outOfCagePrompt: "**讓鳥隻主動踏出籠門，不要伸手進去掏牠**\n這樣牠才能在安心的狀態下與你互動。",
    outOfCageConfirmLabel: "繼續互動",
  },
} as const;

/** 鳥籠巡視也以 Scenario 記錄結果，供共用回顧與報告使用。 */
export const birdActivityScenarios: Record<"bird-cage-inspection", Scenario> = {
  "bird-cage-inspection": {
    id: "bird-cage-inspection",
    stage: "日常照護",
    stageId: "daily",
    stageTitle: "日常照護",
    timeLabel: "日常照護",
    title: "鳥籠日常巡視",
    description: "清潔托盤、觀察糞便與健康狀態，並安排籠外互動。",
    questionText: "今天的鳥籠巡視完成了嗎？",
    topic: "每日鳥籠巡視",
    reportSummary: "每天清潔糞便托盤、觀察排泄與健康，並安排安全籠外互動，是鳥類照護的基礎。",
    artIndex: 0,
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你已找到這個情境中合適的照顧方式，做得很好！",
      knowledgeTitle: "鳥類日常照護",
      knowledgeContent: [
        { type: "paragraph", text: "每天更換墊料，才能清楚觀察糞便量與狀態。" },
        { type: "paragraph", text: "澎毛、無法站棲木、張口呼吸是當天聯繫**熟悉鳥類醫療的獸醫師**的警訊。" },
      ],
    },
    choices: [
      { id: "bird-cage-complete", text: "完成鳥籠巡視", result: "correct", ...positive, explanation: "你完成了清潔、觀察與安全互動，替日常健康守住重要細節。" },
    ],
  },
};
