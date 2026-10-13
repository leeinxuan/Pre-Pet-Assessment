import type { Scenario } from "../../../game-types";
import { incorrect, positive } from "../../shared/scenario-feedback";
import { geckoReport } from "./report";

const correct = (id: string, text: string, explanation: string, expenseIds?: string[]) => ({ id, text, result: "correct" as const, ...positive, explanation, ...(expenseIds ? { expenseIds } : {}) });
const wrong = (id: string, text: string, explanation: string) => ({ id, text, result: "incorrect" as const, ...incorrect, explanation });
const completion = (encouragement: string, knowledge: string | readonly string[]) => ({ title: "做得很好！", encouragement, knowledgeTitle: "守宮小知識", knowledgeContent: (Array.isArray(knowledge) ? knowledge : [knowledge]).map((text) => ({ type: "paragraph" as const, text })) });

/** 企劃以 Markdown 標示的重點字保留在資料內，由共用渲染器套用重點色。 */
const planningKnowledgeByScenario: Record<string, readonly string[]> = {
  "gecko-arrival-settle": ["守宮對新環境的適應需要時間，**通常需要 5–14 天**才會開始穩定進食。這段期間請維持穩定溫度、減少缸外干擾，不強迫觸碰或餵食。**出現在外頭探索、主動接近食物**，是牠開始適應的好信號。"],
  "gecko-refuse-food": ["守宮在幾種情況下會短暫拒食——**適應期（接回 1–2 週內）**、**蛻皮前**（皮膚變灰白）、**繁殖季**（發情期），以及**環境溫度不足**時。首先確認這四個原因，若排除後仍超過 14 天未進食，**應諮詢熟悉爬蟲的獸醫**。不要急著強迫餵食，那會讓問題更難解決。"],
  "gecko-temperature-check": ["守宮是**外溫動物**，體溫完全依賴環境溫度。爬蟲缸的**暖側底部應維持 28–32°C，涼側維持 22–25°C**。冬天室溫過低時，加熱效率明顯下降，需增設輔助加熱設備。請勿使用電熱石（加熱石），因無法精準控溫且容易造成燙傷。**所有加熱設備都應搭配溫度計監控**，確保溫度在安全範圍。"],
  "gecko-shedding": ["守宮定期蛻皮，**蛻皮前皮膚會變得灰白暗淡**，這時不要打擾牠，也不要餵食。蛻皮不完全多半是因為**環境濕度不足**——確保濕躲避屋內保持潮濕是預防的根本。**趾端和眼周是最容易殘留的位置**，若超過 48 小時仍有殘皮，請主動用溫水軟化後協助去除，避免血液循環受阻。"],
  "gecko-health-emergency": ["守宮常見需要留意的健康問題：", "**後腿無力與顫抖**：後腿走路不穩、顫抖，或脊椎彎曲、下頜變軟——需立即就醫；每次餵食確實沾鈣粉是預防關鍵。", "**體態與食慾明顯變化**：尾巴快速消瘦、腹部腫脹、食慾持續下降——成體每 2–3 天餵食一次即可，尾巴是體況最直接的指標。", "**排便與食慾持續異常**：排便量少或顏色異常、明顯消瘦、食慾下降——糞便狀況是重要的健康指標，若持續異常應就醫確認。", "**腹部腫脹與拒食（雌守宮）**：腹部異常腫脹、行動困難、完全拒食——未交配的雌守宮仍可能形成無精卵，卵無法排出時需就醫。", "**泄殖腔外有組織外露**：泄殖腔口出現紅色或粉紅色組織，**絕對不可自行嘗試推回**，需立即就醫。"],
  "gecko-senior-care": ["與 {petName} 在一起的每一天，都是一份長達**15–28 年**的承諾。牠會隨著歲月慢慢老去，可能出現**食慾下降、消化遲緩、骨骼退化，甚至各器官的老化症狀**。在迎接牠之前，請先問問自己：你做好了陪伴牠走到生命盡頭的心理準備嗎？"],
};

const planningReminderByScenario: Record<string, string> = {
  "gecko-health-emergency": "食慾、排泄、精神與後腿力量的變化都是重要觀察指標；多項同時出現時，請準備好記錄並盡速聯絡熟悉爬蟲的獸醫。台灣熟悉爬蟲疾病的獸醫資源相對少，建議事先找好診所，不要等到急症才找。",
};

function applyPlanningKnowledgeEmphasis(scenario: Scenario): Scenario {
  const knowledge = planningKnowledgeByScenario[scenario.id];
  const reminder = planningReminderByScenario[scenario.id];
  const sidebarStage = scenario.stageId === "arrival" ? "接回家" : scenario.stageId === "life-change" ? "生活變化" : scenario.stage;
  const timeLabel = scenario.stageId === "arrival" ? "接回家" : scenario.stageId === "life-change" ? "當生活發生變化" : scenario.timeLabel;
  const stageTitle = scenario.stageId === "arrival" ? "適應新家與安全感" : scenario.stageId === "life-change" ? "當生活發生變化" : scenario.stageTitle;
  const stageAdjusted = { ...scenario, stage: sidebarStage, timeLabel, ...(stageTitle ? { stageTitle } : {}) };
  if (!knowledge || !scenario.completionFeedback) return stageAdjusted;
  return {
    ...stageAdjusted,
    completionFeedback: {
      ...scenario.completionFeedback,
      knowledgeContent: knowledge.map((text) => ({ type: "paragraph", text })),
      ...(reminder ? { reminder } : {}),
    },
  };
}

const geckoScenarios: Scenario[] = [
  { id: "gecko-arrival-settle", stage: "適應新家與安全感", stageId: "arrival", timeLabel: "適應新家與安全感", title: "第一天適應新家", sceneMedia: { type: "placeholder" }, correctFeedbackMedia: { type: "placeholder" }, description: "{petName} 剛進爬蟲缸，立刻躲進躲避屋不出來。牠動也不動，你叫牠名字也沒有反應。", questionText: "你會怎麼做？", topic: "適應期安置", reportSummary: "維持安靜與穩定環境，讓守宮自行探索。", artIndex: 0, completionFeedback: completion("你給了 {petName} 最需要的東西——安靜和空間，做得很好！", "守宮對新環境的適應需要時間，**通常需要 5–14 天**才會開始穩定進食。這段期間請維持穩定溫度、減少缸外干擾，不強迫觸碰或餵食。**出現在外頭探索、主動接近食物**，是牠開始適應的好信號。"), choices: [wrong("force-pick-up", "把牠從躲避屋裡拿出來，放到手上熟悉一下新環境", "強迫接觸會增加壓力並延長適應期。"), wrong("open-lid", "把缸蓋打開，讓房間更透氣一點", "打開缸蓋有逃脫風險，也會減少守宮的安全感。"), correct("quiet-explore", "讓缸蓋蓋好，減少干擾，讓 {petName} 自己慢慢探索", "正確！維持穩定環境，讓守宮用自己的節奏建立安全感。", ["gecko-arrival-checkup"]), wrong("keep-calling", "在缸外輕輕敲缸壁呼喚，讓牠知道你在", "振動對守宮是威脅訊號，請等待牠主動出現。") ] },
  { id: "gecko-refuse-food", stage: "日常照護", stageId: "daily", timeLabel: "日常照護", title: "{petName} 已經三天沒吃東西了", description: "你每天傍晚放昆蟲進缸，但 {petName} 躲在暖側躲避屋完全不出來，昆蟲在缸裡爬了一晚最後死掉，牠一口都沒吃。這已經是第三天了。", questionText: "你應該怎麼做？（請選出所有正確選項）", topic: "拒食觀察", reportSummary: "先確認溫度與適應／蛻皮狀態，不強迫餵食。", artIndex: 0, multipleChoice: true, requiredCorrectOptionIds: ["check-temperature", "check-adaption-or-shed"], wrongOptionIds: ["force-feed", "switch-to-fruit"], completionFeedback: completion("你沒有慌亂強迫，而是先找出拒食的原因，做得很好！", "守宮在幾種情況下會短暫拒食——**適應期（接回 1–2 週內）**、**蛻皮前**（皮膚變灰白）、**繁殖季**（發情期），以及**環境溫度不足**時。首先確認這四個原因，若排除後仍超過 14 天未進食，**應諮詢熟悉爬蟲的獸醫**。不要急著強迫餵食，那會讓問題更難解決。"), choices: [correct("check-temperature", "確認溫度計讀數，確保暖側底部溫度在 28–32°C、涼側在 22–25°C", "溫度不足是守宮拒食的常見原因。"), wrong("force-feed", "強迫將昆蟲夾到 {petName} 嘴邊，逼牠吃", "強迫餵食會增加壓力。"), correct("check-adaption-or-shed", "評估是否仍在適應期或即將蛻皮", "適應期與蛻皮前拒食都可能是正常生理行為。"), wrong("switch-to-fruit", "把昆蟲換成水果，看看牠會不會喜歡", "守宮是肉食性動物，不應餵食水果。") ] },
  { id: "gecko-temperature-check", stage: "日常照護", stageId: "daily", timeLabel: "日常照護", title: "缸裡的加熱片是否夠用？", description: "今天特別冷，室溫只有 16°C。你查了一下溫度計，發現暖側底部才 24°C，涼側只有 19°C，都比建議溫度低不少。{petName} 縮在暖側躲避屋裡完全沒動靜。", questionText: "你應該怎麼做？（請選出所有正確選項）", topic: "低溫處理", reportSummary: "提升室溫並使用適當加熱設備，持續監控溫度。", artIndex: 0, multipleChoice: true, requiredCorrectOptionIds: ["room-heating", "add-heating-device"], wrongOptionIds: ["cover-terrarium", "wait-and-see"], completionFeedback: completion("你即時注意到溫度問題並採取了正確的行動，{petName} 今晚能暖暖的了！", "守宮是**外溫動物**，體溫完全依賴環境溫度。爬蟲缸的**暖側底部應維持 28–32°C，涼側維持 22–25°C**。冬天室溫過低時，加熱效率明顯下降，需增設輔助加熱設備。請勿使用電熱石（加熱石），因無法精準控溫且容易造成燙傷。**所有加熱設備都應搭配溫度計監控**，確保溫度在安全範圍。"), choices: [correct("room-heating", "開啟室內暖氣，讓整個房間升溫", "室溫維持在 20°C 以上能讓加熱設備更穩定。"), correct("add-heating-device", "增加適當加熱設備，同時監控溫度不超標", "寒冬時可以增設輔助加熱，但務必監控。"), wrong("cover-terrarium", "用棉被或厚布蓋住整個爬蟲缸保溫", "會阻礙通風並造成濕度與氣體問題。"), wrong("wait-and-see", "先觀察幾天，看牠能不能自己撐過去", "低溫會影響消化與免疫，應即時處理。") ] },
  { id: "gecko-shedding", stage: "日常照護", stageId: "daily", timeLabel: "日常照護", title: "{petName} 在脫皮，但有一段皮卡住了", description: "你發現 {petName} 身上有一段舊皮一直沒有脫乾淨，前腳的趾端有白色的殘皮包著，已經過了兩天了。", questionText: "你應該怎麼做？（請選出所有正確選項）", topic: "脫皮照護", reportSummary: "提高濕躲避屋濕度或溫水軟化殘皮，避免強拉。", artIndex: 0, multipleChoice: true, requiredCorrectOptionIds: ["wet-hide-assist", "warm-water-soak"], wrongOptionIds: ["force-remove-shed", "just-wait"], completionFeedback: completion("你用對了方式幫助 {petName} 完成脫皮，細心又有耐心！", "守宮定期蛻皮，**蛻皮前皮膚會變得灰白暗淡**，這時不要打擾牠，也不要餵食。蛻皮不完全多半是因為**環境濕度不足**——確保濕躲避屋內保持潮濕是預防的根本。**趾端和眼周是最容易殘留的位置**，若超過 48 小時仍有殘皮，請主動用溫水軟化後協助去除，避免血液循環受阻。"), choices: [wrong("force-remove-shed", "直接用手或鑷子強行拉除殘皮", "可能拉傷嬌嫩皮膚。"), correct("wet-hide-assist", "在濕躲避屋鋪更濕潤的濕紙巾，讓 {petName} 自己軟化殘皮", "提高局部濕度是溫和有效的方式。"), correct("warm-water-soak", "用溫水輕輕浸泡趾端後，以軟濕棉棒協助", "軟化後才能更安全地協助移除。"), wrong("just-wait", "等待觀察，殘皮應該會自己掉", "趾端殘皮可能收縮並影響血液循環。") ] },
  {
    id: "gecko-busy-care",
    stage: "生活變化",
    stageId: "life-change",
    timeLabel: "生活變化",
    title: "臨時晚歸，{petName} 的照顧怎麼辦？",
    description: "今天臨時需要加班，預計晚上九點才能到家。守宮是夜行性動物，傍晚開始活動——而今天剛好也是餵食日（守宮每 2–3 天餵一次），需要在傍晚提供沾好鈣粉的活昆蟲。缸內溫度也要在傍晚確認一次，排泄位置和守宮的精神狀況也要有人看過。這樣下去，今晚誰來照顧牠？",
    questionText: "你會怎麼做？",
    topic: "忙碌備援計畫",
    reportSummary: "提前安排可信任協助者並交接照護內容。",
    artIndex: 0,
    busyCarePresentation: { animalName: "小型地棲性守宮", sceneMedia: { type: "placeholder" }, feedbackMedia: { type: "placeholder" } },
    busyCareChecklist: [
      {
        id: "daily-care",
        prompt: "你已經向協助者說明 {petName} 的每日照護要點了嗎？（溫度確認、今天是否為餵食日（守宮每 2–3 天餵一次，非每日）、排泄清理、健康觀察）",
        reviewHint: "先確認溫度、餵食日、排泄清理與健康觀察的交接內容。",
        correctAnswer: "yes",
      },
      {
        id: "support-confirmed",
        prompt: "我還沒有確認協助者在你忙碌時，是否真的有時間協助照顧 {petName}。",
        reviewHint: "還需要確認協助者是否真的有時間。",
        correctAnswer: "no",
      },
      {
        id: "care-willing",
        prompt: "協助者願意依照你的交接方式照顧 {petName} 嗎？",
        reviewHint: "還需要確認協助者願意依交接方式照顧。",
        correctAnswer: "yes",
      },
      {
        id: "emergency-contact",
        prompt: "協助者知道 {petName} 出現異常或緊急狀況時怎麼聯絡你嗎？",
        reviewHint: "還需要確認異常或緊急狀況時的聯絡方式。",
        correctAnswer: "yes",
      },
    ],
    busyCareCompletion: {
      title: "做得很好！",
      encouragement: "你確認了時間、意願、照護細節與緊急聯絡，讓 {petName} 在你忙碌時仍有穩定照顧。",
      reflectionTitle: "留給自己的一個問題",
      reflectionText: "在守宮的世界裡，你是維持環境穩定的人。",
      reflectionContent: ["忙完回家後，你還能確認牠的溫度、進食和排泄狀況嗎？"],
      showCareTime: false,
      careTimeTitle: "每日照護時間",
      careTimeItems: geckoReport.dailyCareBreakdown,
    },
    completionFeedback: completion("你已安排好照護備援。", "可靠的交接必須包含具體照護內容與緊急聯絡方式。"),
    choices: [
      {
        ...correct("seek-help", "主動聯繫可信任的家人或朋友，請他們代為照顧 {petName}", "你知道忙碌的時候不是讓 {petName} 自己撐，而是要立刻找人幫忙，做得很好！繼續確認你的交接安排是否完整。"),
        isSupportChoice: true,
      },
      wrong("gecko-extra-food", "出門前多放幾隻昆蟲在缸裡，讓{petName}自己吃", "昆蟲在缸裡會持續移動、騷擾守宮，甚至在守宮睡覺時咬傷牠。此外，溫度確認與排泄觀察無法靠多放昆蟲解決，仍需有人到場確認。"),
      wrong("gecko-delay", "今晚先跳過，明天早上一次補上", "守宮在溫度適當時，傍晚至夜間是主要活動進食時段，跳過一次雖不至於緊急，但若習慣性延後，會影響牠的規律生理節律與健康觀察的連續性。"),
      wrong("gecko-neighbor-quick-check", "請鄰居「順便看一下」就好，不用特別交代", "沒有爬蟲照護經驗的人「看一下」不等於能發現溫度異常或守宮異常行為。如果真的請人代顧，必須先說明溫度確認方式、餵食步驟與緊急聯絡方式。"),
    ],
  },
  { id: "gecko-health-emergency", stage: "生活變化", stageId: "life-change", timeLabel: "生活變化", title: "牠看起來和平常不太一樣", sceneMedia: { type: "placeholder" }, correctFeedbackMedia: { type: "placeholder" }, description: "{petName} 活動力下降、拒食且尾巴消瘦，你需要立刻判斷下一步。", questionText: "你應該怎麼做？", topic: "健康突發事件", reportSummary: "出現明顯異常時，記錄症狀並盡快諮詢爬蟲獸醫。", artIndex: 0, completionFeedback: completion("你注意到異常並決定尋求專業協助，做得很好！", "守宮善於隱藏病痛；食慾、活動力和尾巴體況明顯改變時不可拖延。"), choices: [correct("gecko-vet", "記錄症狀並盡快諮詢熟悉爬蟲的獸醫", "正確！先記錄並安排專業評估。", ["gecko-mild-sick", "gecko-moderate-sick", "gecko-hospitalization"]), wrong("gecko-wait", "再等幾天看看", "明顯異常不應以等待取代專業評估。"), wrong("gecko-force-feed", "強迫餵食讓牠恢復體力", "強迫餵食會增加壓力且可能掩蓋問題。") ] },
  { id: "gecko-senior-care", stage: "生活變化", stageId: "life-change", timeLabel: "生活變化", title: "{petName} 進入高齡期了", sceneMedia: { type: "placeholder" }, correctFeedbackMedia: { type: "placeholder" }, description: "{petName} 活動較少、尾巴不如以前飽滿，你想提前安排高齡照護。", questionText: "你會怎麼做？", topic: "高齡照護", reportSummary: "提高健康檢查頻率並調整環境與餵食觀察。", artIndex: 0, completionFeedback: completion("你願意提前為 {petName} 的高齡生活做準備，做得很好！", "高齡守宮需要更密集觀察體重、食量與活動，並維持容易使用的環境。"), choices: [correct("gecko-senior-adjust", "提高健康檢查頻率，並依獸醫建議調整環境", "正確！提前規劃才能穩定陪伴高齡守宮。", ["gecko-senior-room"]), wrong("gecko-senior-ignore", "活動變少是自然現象，不必改變任何照護", "高齡變化仍需要記錄與專業評估。") ] },
];

export const geckoLifeScenarios = geckoScenarios.map(applyPlanningKnowledgeEmphasis);
