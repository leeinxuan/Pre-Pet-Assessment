import type { Scenario } from "../../../game-types";
import { incorrect, positive } from "../../shared/scenario-feedback";
import { hamsterReport } from "./report";

const correct = (id: string, text: string, explanation: string, expenseIds?: string[]) => ({ id, text, result: "correct" as const, ...positive, explanation, ...(expenseIds ? { expenseIds } : {}) });
const wrong = (id: string, text: string, explanation: string) => ({ id, text, result: "incorrect" as const, ...incorrect, explanation });

/** All visible scenario copy is transcribed from §5 of hamster-game-planning.md. */
export const hamsterLifeScenarios: Scenario[] = [
  {
    id: "hamster-arrival-adjustment", stage: "接回家", stageId: "arrival", timeLabel: "接回家", title: "第一天適應新家",
    description: "等了這麼久，{petName} 終於到家了。你打開運輸容器，牠小心翼翼地探出頭，鼻子快速抽動嗅聞，然後一個箭步衝進了巢箱，縮在最深處，一動也不動。你看著牠，不確定是不是該做點什麼。",
    questionText: "你會怎麼做？", topic: "新環境安置", reportSummary: "讓倉鼠用自己的節奏探索新家，不強迫牠離開巢箱。", artIndex: 0,
    completionFeedback: { title: "做得很好！", encouragement: "**躲藏**是面對新環境的正常**壓力反應**，不是不友善，也不需要「做點什麼」來安慰", knowledgeTitle: "倉鼠小知識", knowledgeContent: [{ type: "paragraph", text: "最好的第一步就是**保持安靜、靜靜等待**，讓 {petName} 用自己的節奏探索新家、建立對你的**信任**" }] },
    choices: [
      wrong("hamster-arrival-force", "把 {petName} 從巢箱裡拿出來，讓牠多接觸新環境", "躲藏是面對新環境的正常壓力反應，不是失敗。強迫出來只會增加緊迫；倉鼠需要自己決定何時探索。"),
      correct("hamster-arrival-quiet", "保持安靜，讓牠自己慢慢適應", "對！讓{petName}用自己的節奏探索新家是建立信任的第一步。提供可隨時躲藏的巢穴，減少外界干擾。", ["hamster-arrival-checkup"]),
      wrong("hamster-arrival-call", "大聲叫牠的名字，讓牠記住你", "倉鼠聽覺敏銳，突然的大聲會造成驚嚇。應保持環境安靜，讓牠慢慢習慣你的存在。"),
      wrong("hamster-arrival-lure", "放一些零食在巢箱口，引牠出來", "用食物引誘可能讓{petName}在「想吃」和「害怕」之間掙扎，反而造成更大的緊迫。讓牠在沒有壓力的情況下自然探索。"),
    ],
  },
  {
    id: "hamster-nocturnal", stage: "日常照護", stageId: "daily", timeLabel: "日常照護", title: "白天 {petName} 都不動，牠是生病了嗎？",
    description: "你買了{petName}來之後，發現每次在白天去看牠，牠都縮在巢箱裡，幾乎一動也不動。明明前一天晚上你還聽到滾輪聲，但白天就是看不到牠活動。你開始擔心：牠是不是生病了？",
    questionText: "你應該怎麼理解和應對這個情況？", topic: "夜行性與健康觀察", reportSummary: "尊重夜行性作息，晚間確認活動與進食跡象。", artIndex: 0,
    multipleChoice: true, requiredCorrectOptionIds: ["hamster-nocturnal-respect", "hamster-nocturnal-obs"], wrongOptionIds: ["hamster-nocturnal-wake", "hamster-nocturnal-vet"],
    correctSummary: ["這是正常的！倉鼠是夜行性動物，白天睡覺、夜間活動才是牠的自然節律", "雖然白天睡覺是正常的，但我仍然應該每天晚上確認{petName}有在活動、進食"],
    completionFeedback: { title: "做得很好！", encouragement: "你尊重了 {petName} 的夜行性本能，也知道要在夜間確認牠的健康狀況，做得很好！強迫牠配合人類的白天作息，是很多飼主無意間犯的錯誤。", knowledgeTitle: "倉鼠小知識", knowledgeContent: [
      { type: "paragraph", text: "倉鼠是**夜行性動物**，天黑後到清晨才是最活躍的時段。白天在巢箱裡睡覺是完全正常的。" },
      { type: "paragraph", text: "飼主日常健康觀察的最佳時間是**傍晚或夜間**——觀察{petName}是否有在轉動滾輪、進食、整理毛髮。若連續幾天夜間都沒有活動跡象，加上食量明顯減少，才是需要關注的訊號。" },
    ] },
    choices: [
      correct("hamster-nocturnal-respect", "這是正常的！倉鼠是夜行性動物，白天睡覺、夜間活動才是牠的自然節律", "倉鼠是夜行性動物，白天大多在睡眠，晚上和清晨才是牠們最活躍的時段。白天安靜是完全正常的。"),
      correct("hamster-nocturnal-obs", "雖然白天睡覺是正常的，但我仍然應該每天晚上確認{petName}有在活動、進食", "對！即使知道牠是夜行性，每天晚間也要確認有活動跡象、食碗有進食痕跡——這是日常健康觀察的重要部分。"),
      wrong("hamster-nocturnal-wake", "強迫牠白天多醒著，讓牠配合我的作息", "強迫夜行性動物在白天活動，對牠是嚴重的緊迫。倉鼠的生理節律不應被強迫改變，要尊重牠的天性。"),
      wrong("hamster-nocturnal-vet", "立刻帶去看獸醫，因為白天都在睡覺很不正常", "白天睡覺對夜行性的倉鼠是完全正常的；只有伴隨食量明顯下降、外觀異常、對刺激完全無反應時才需要就醫。"),
    ],
  },
  {
    id: "hamster-picky-eating", stage: "日常照護", stageId: "daily", timeLabel: "日常照護", title: "{petName} 食碗裡只剩堅果，其他的都不見了？",
    description: "你每天固定量餵食，但發現 {petName} 的食碗裡每次都只剩下幾顆葵瓜子以外的食物全部不見了——牠似乎只吃特定食物，其他的全部消失了。你不確定是不是要換成牠喜歡的食物。",
    questionText: "下列哪些是正確的應對方式？", topic: "囤食與固定份量", reportSummary: "固定份量餵食，檢查巢穴囤食，不因食碗空了就持續補充。", artIndex: 0,
    multipleChoice: true, requiredCorrectOptionIds: ["hamster-food-fixed-portion", "hamster-food-check-hoard"], wrongOptionIds: ["hamster-food-change-nuts", "hamster-food-add-more"],
    correctSummary: ["繼續每天固定量餵食，不額外補充被清空的食物", "定期檢查巢穴，清除過多囤積的食物避免發霉"],
    completionFeedback: { title: "做得很好！", encouragement: "你了解倉鼠的囤食本能，也知道要固定份量而不是順著牠的偏好一直補，做得很好！這樣才能確保{petName}每天都攝取到均衡的營養。", knowledgeTitle: "倉鼠小知識", knowledgeContent: [
      { type: "paragraph", text: "倉鼠的名字「倉」就來自牠強烈的**囤食習性**——牠們有可以撐大的**頰囊**，能把大量食物塞進去帶回巢穴存放，食碗看起來空了，但食物可能都在巢穴裡。" },
      { type: "paragraph", text: "以**綜合飼料**餵食時，倉鼠容易先吃掉偏好的堅果類，剩下其他成分。正確做法是**每天固定量**提供，讓牠把今天的份量全部消耗後，明天再補新的——而不是「碗空就加」。定期清理巢穴中的囤積物，避免新鮮食物發霉。" },
    ] },
    choices: [
      wrong("hamster-food-change-nuts", "改成全部換成葵瓜子，因為{petName}最喜歡那個", "全面改成葵瓜子會讓{petName}的飲食嚴重不均衡；堅果類脂肪高，只吃堅果會造成肥胖和營養缺乏。繼續提供均衡的綜合飼料才正確。"),
      correct("hamster-food-fixed-portion", "繼續每天固定量餵食，不額外補充被清空的食物", "對！倉鼠有囤食習性，食碗空了不代表吃完了——牠可能把食物塞進頰囊藏回巢穴。固定餵食量是避免挑食和過度囤積的關鍵。"),
      correct("hamster-food-check-hoard", "定期檢查巢穴，清除過多囤積的食物避免發霉", "倉鼠會大量囤食在巢穴中；新鮮食物或容易發霉的食材大量堆積可能有衛生問題，定期清理巢穴囤積物是必要的。"),
      wrong("hamster-food-add-more", "食碗空了就繼續補充，確保{petName}隨時有足夠的食物", "食碗空了不代表吃光了——可能是囤進巢穴了。持續補充反而讓牠囤積更多，也讓你無法掌握實際進食量。固定量才能觀察食量變化。"),
    ],
  },
  {
    id: "hamster-solitary", stage: "日常照護", stageId: "daily", timeLabel: "日常照護", title: "{petName} 需要一個同伴嗎？",
    description: "你的朋友看到 {petName}，說：「只養一隻倉鼠不會很孤單嗎？要不要再領養一隻，讓牠們互相作伴？」你有點猶豫——{petName} 平時獨自在籠裡玩，真的沒問題嗎？",
    questionText: "你會怎麼做？", topic: "獨居與合籠風險", reportSummary: "先了解倉鼠的領域性，避免貿然合籠。", artIndex: 0,
    completionFeedback: { title: "做得很好！", encouragement: "你了解 {petName} 的天性，做出了最安全的選擇！", knowledgeTitle: "倉鼠小知識", knowledgeContent: [{ type: "paragraph", text: "倉鼠天生具有強烈的**領域性**，在野外各自守護自己的地盤、獨自生活。**合籠不是陪伴，是壓力的來源**——甚至可能引發致命的打鬥。無論品系，**一隻一籠**都是最安全的飼養原則。{petName} 不需要同伴，牠需要的是你的陪伴與豐富的生活環境。" }] },
    choices: [
      wrong("hamster-solitary-together", "再去收容所領養一隻，把牠們放進同一個籠子，讓牠們一起生活", "倉鼠天生具有強烈領域性，把兩隻放進同一籠中，無論公母，都很可能發生**激烈打鬥，甚至互相致死**。看似平靜的倉鼠，在籠內壓力累積後也可能突然爆發衝突。"),
      wrong("hamster-solitary-sniff", "先讓兩隻隔著籠子互相嗅聞幾天，確認不打架後再合籠", "隔籠嗅聞看似溫和，但放進同一籠後，封閉空間會引發領域競爭，即使初期平靜，之後仍可能突發打鬥。對大多數倉鼠品系來說，**沒有「適應後合籠」絕對安全的做法**。"),
      correct("hamster-solitary-one", "讓 {petName} 繼續獨居，倉鼠天生就有強烈領域性，一隻一籠才是安全的", "倉鼠天生具有強烈領域性，獨居是牠的本能，不是孤單。無論品系，**一隻一籠**都是最安全的飼養原則——{petName} 有你陪伴、有豐富的環境就已經足夠。"),
      wrong("hamster-solitary-large-space", "再養一隻，但為牠們準備超大空間，各自有自己的巢穴區域", "空間大小無法解決倉鼠的領域本能。籠具內無論如何分隔，封閉空間中彼此氣味重疊，長期仍會引發衝突。**一隻一籠**才是最安全的原則，沒有例外。"),
    ],
  },
  {
    id: "hamster-busy-care", stage: "生活變化", stageId: "life-change", timeLabel: "當生活發生變化", title: "臨時晚歸，{petName} 的照顧怎麼辦？",
    description: "今天臨時需要加班，預計晚上九點才能到家。{petName} 傍晚開始活動，飲水器要確認出水、食碗需要補充今天的份量、砂浴盆也需要篩一下——而且每天傍晚確認牠的狀態，是你掌握健康的重要時機。你開始想：今晚誰來照顧牠？",
    questionText: "你會怎麼做？", topic: "忙碌備援計畫", reportSummary: "晚歸時安排可信任的人照顧，交接飲水、餵食、砂浴與健康觀察。", artIndex: 0,
    busyCareCompletion: { title: "做得很好！", encouragement: "你不只是找了人，還確認了時間、意願、照護細節和緊急聯絡，這樣的交接才能讓 {petName} 在你忙碌時仍獲得穩定照顧，做得很好！", reflectionText: "在 {petName} 的世界裡，你是那個讓牠願意靠近的人。", reflectionTitle: "留給自己的一個問題", reflectionContent: ["忙完這段時間回到家，你還有心思觀察 {petName} 的食量、活動跡象和精神狀態，確認牠一切都好嗎？"], showCareTime: false, careTimeTitle: "每日照護時間", careTimeItems: hamsterReport.dailyCareBreakdown, additionalAdvice: ["如果未來找不到合適的代養人，可以提前了解附近是否有熟悉小型哺乳類照護的寵物旅館或獸醫診所提供的住宿服務，作為備用方案。"] },
    busyCareChecklist: [
      { id: "daily-care", prompt: "你已經向協助者說明 {petName} 每天的飲水確認、食碗補充、砂浴盆篩沙與健康觀察安排了嗎？", reviewHint: "你已經向協助者說明 {petName} 每天的飲水確認、食碗補充、砂浴盆篩沙與健康觀察安排了嗎？", correctAnswer: "yes" },
      { id: "support-confirmed", prompt: "我還沒有確認協助者在你忙碌時，是否真的有時間協助照顧 {petName}。", reviewHint: "我還沒有確認協助者在你忙碌時，是否真的有時間協助照顧 {petName}。", correctAnswer: "no" },
      { id: "care-willing", prompt: "協助者願意依照你的交接方式照顧 {petName} 嗎？", reviewHint: "協助者願意依照你的交接方式照顧 {petName} 嗎？", correctAnswer: "yes" },
      { id: "emergency-contact", prompt: "協助者知道 {petName} 出現異常或緊急狀況時怎麼聯絡你嗎？", reviewHint: "協助者知道 {petName} 出現異常或緊急狀況時怎麼聯絡你嗎？", correctAnswer: "yes" },
    ],
    choices: [
      { ...correct("seek-help", "主動聯繫可信任的家人或朋友，請他們代為照顧 {petName}", "你知道忙碌的時候不是讓 {petName} 自己撐，而是要立刻找人幫忙，做得很好！繼續確認你的交接安排是否完整。"), isSupportChoice: true },
      wrong("hamster-extra-food", "出門前多放一份食物和水，讓{petName}自己撐到晚上", "多放食物和水仍無法取代砂浴盆清潔、進食量觀察與日常健康確認。確定晚歸時，應先安排可信任的人代為照顧。"),
      wrong("hamster-leave-alone", "倉鼠自理能力強，晚一點回家也沒關係", "雖然倉鼠相對獨立，但每天的飲水確認、固定份量餵食與健康觀察都不能省略；發現問題需要當天就能處理。確定晚歸時，應事先安排照顧。"),
      wrong("hamster-quick-check", "請路過的鄰居幫忙「看一下」就好，不用交代細節", "只是「看一下」可能遺漏飲水確認、餵食和健康觀察，也不知道發現異狀時要怎麼聯絡你。請照顧的人需要知道具體的照顧內容。"),
    ],
  },
  {
    id: "hamster-health-emergency", stage: "生活變化", stageId: "life-change", timeLabel: "當生活發生變化", title: "{petName} 活動力明顯下降",
    description: "最近這兩天，你傍晚去確認{petName}時，發現牠比平常晚很多才從巢箱出來，滾輪也幾乎沒有轉動的聲音，食碗的食物到了隔天幾乎原封未動。今天更發現牠縮在角落，對你的靠近也沒什麼反應。",
    questionText: "根據這些觀察，你應該？", topic: "健康突發事件", reportSummary: "活動力與食量明顯下降時，立刻諮詢熟悉倉鼠的獸醫。", artIndex: 0,
    completionFeedback: { title: "做得很好！", encouragement: "你注意到了{petName}的異常，而且立刻決定就醫而不是再等等，做得很好！日常觀察習慣讓你能在關鍵時刻保護牠。", knowledgeTitle: "倉鼠小知識", knowledgeContent: [
      { type: "paragraph", text: "倉鼠常見的健康問題包括：" },
      { type: "item", text: "**濕尾症**：多發生於年幼或受到強烈壓力的倉鼠，以肛門周圍潮濕、腹瀉為主要徵狀，病程進展快速，需緊急就醫。" },
      { type: "item", text: "**腫瘤**：高齡倉鼠常見，可能出現在皮下或腹部；發現明顯腫塊應立即就醫評估。" },
      { type: "item", text: "**糖尿病**：部分侏儒倉鼠品系（如坎培爾侏儒鼠）具有較高遺傳風險，表現為飲水量和排尿量異常增加。" },
      { type: "item", text: "**呼吸道感染**：環境通風不良、溫差過大時易發，表現為呼吸急促、有聲音或鼻眼分泌物增加。" },
      { type: "item", text: "**蟎蟲感染**：過度抓癢、毛髮稀疏或皮膚結痂是常見警訊，需獸醫師確認並處理。" },
    ], reminder: "**活動力明顯下降 ＋ 食量連續減少**是需要立刻就醫的訊號。倉鼠隱藏病痛的能力很強，等到外觀上明顯不對，可能病情已進展一段時間。每天的觀察讓你能在早期就發現變化。" },
    choices: [
      wrong("hamster-health-wait", "這可能是正常的波動，多等幾天看看", "活動力下降加上食量明顯減少連續超過一天，是需要立刻關注的警訊；不能用「等等看」代替就醫評估。"),
      correct("hamster-health-vet", "立刻諮詢熟悉倉鼠的獸醫師，安排看診", "對！連續的食量明顯減少加上活動力下降，是需要立刻尋求獸醫師協助的訊號。倉鼠的病程發展可能很快，不能拖延。", ["hamster-emergency-vet"]),
      wrong("hamster-health-seeds", "給牠喜歡的葵瓜子，看能不能刺激食慾", "此時需要的是獸醫師的評估，而不是用點心刺激食慾；突然改變飲食可能讓診斷更複雜。"),
      wrong("hamster-health-temperature", "確認籠具溫度是否合適，先調整環境再觀察", "確認環境溫度是對的，但這不能取代就醫；若調整環境後沒有明顯改善，請立刻就醫，不要繼續等待。"),
    ],
  },
  {
    id: "hamster-senior-care", stage: "生活變化", stageId: "life-change", timeLabel: "當生活發生變化", title: "{petName} 進入高齡期了",
    description: "{petName} 已經快要兩歲了。這幾個月你注意到牠跑滾輪的時間短了，有時候你靠近籠子牠也不一定馬上反應。牠的毛色也沒有以前那麼光亮，活動量比以前少了一些。你知道倉鼠的壽命不長，開始想著要怎麼照顧這個階段的牠。",
    questionText: "你會怎麼做？", topic: "高齡照護", reportSummary: "高齡前提前諮詢獸醫、安排規律檢查，並調整環境。", artIndex: 0,
    completionFeedback: { title: "做得很好！", encouragement: "你願意提前為{petName}的高齡生活做準備，做得很好！早一步規劃，才能在最需要的時候穩穩陪著牠。", knowledgeTitle: "長達 **2–3 年**的每日陪伴與生命承諾", knowledgeContent: [{ type: "paragraph", text: "與 {petName} 在一起的每一天，都是一份雖然短暫卻**真實的承諾**。牠的壽命比你想的短——**倉鼠平均壽命約 2–3 年**，牠會隨著歲月慢慢老去，**活動量下降，毛色暗淡，最終告別**。在迎接牠之前，請先問問自己：你做好了**陪伴牠走到生命盡頭**的心理準備嗎？" }] },
    choices: [
      correct("hamster-senior-vet", "提前諮詢獸醫師，了解高齡倉鼠的照護重點，並安排更規律的健康檢查", "高齡期的倉鼠更需要定期健康檢查（建議半年至一年一次），提前諮詢能幫助你為{petName}規劃更適合高齡期的環境與照護方式。", ["hamster-routine-checkup", "hamster-senior-care"]),
      wrong("hamster-senior-wait", "等到牠真的很嚴重再就醫，平常不需要特別準備", "高齡照護需要提前準備；等到症狀很明顯才處理，可能讓{petName}在不必要的不適中度過最後一段時間。提前規劃才能在最需要時穩定陪著牠。"),
      wrong("hamster-senior-remove-wheel", "把滾輪拿出來，讓高齡的{petName}多休息", "適當的活動對高齡倉鼠仍然重要，不應直接移除滾輪；可以換成較輕鬆的環境（如降低設施的難度），但不應剝奪活動機會。"),
      wrong("hamster-senior-no-change", "維持現有環境不動，避免環境改變造成壓力", "小幅度的環境優化（如確保設施容易取用、維持舒適溫度）是必要的；同時安排更規律的健康檢查，才能完整照顧高齡{petName}的需求。"),
    ],
  },
];
