import type { Scenario } from "../../../game-types";
import { incorrect, positive } from "../../shared/scenario-feedback";
import { birdReport } from "./report";

const knowledge = {
  arrival: ["新環境的陌生氣味、聲音與視覺刺激都可能引發緊迫；遮光布能提供<mark>封閉感與安全感</mark>。", "多數鳥需要 <mark>1～2 週</mark> 才能在新環境真正放鬆。"],
  puff: ["澎毛要和<mark>食慾、呼吸、站棲</mark>等狀態一起判斷。", "鳥常隱藏病徵；異常持續或惡化時，應聯繫<mark>熟悉鳥類的獸醫師</mark>。"],
  molt: ["正常換羽通常是<mark>連續且對稱</mark>的；不對稱裸皮區需提高警覺。", "新生羽毛可能有血管，看到血管毛時<mark>不要拉扯</mark>。"],
  health: ["鳥很會<mark>隱藏病徵</mark>；看起來還好，不代表沒有問題。", "建立每日觀察與<mark>鳥類獸醫年度健檢</mark>，才能提早發現變化。"],
  senior: ["高齡鳥的照護重點是「安全 + 舒適 + 密切觀察」。降低跌落風險、提高健檢頻率、維持穩定溫度、諮詢飲食調整——這些都是讓 {petName} 在老年期維持生活品質的方法。每隻鳥的老化速度不同，鳥類獸醫師的定期評估是最可靠的依據。如果 {petName} 正經歷無法復原的痛苦，安樂死也是由獸醫師專業評估的醫療選項，這是照護責任的一部分。"],
};

export const birdLifeScenarios: Scenario[] = [
  { id: "bird-arrival-adjustment", stage: "接回家", stageId: "arrival", stageTitle: "適應新家與安全感", timeLabel: "一起生活的第一天", title: "{petName} 到家了，你第一件事？", description: "你把外出籠帶進房間。{petName} 在籠內靜靜站在棲木上，左右張望，羽毛微微膨起。", topic: "新環境安置", reportSummary: "鳥剛到家應放在安靜固定位置，覆上遮光布並保留通風，讓牠慢慢適應。", artIndex: 0, learningPoints: knowledge.arrival, knowledgeTitle: "鳥類小知識", choices: [
    { id: "bird-arrival-move", text: "立刻把 {petName} 移到鳥籠，讓牠趕快適應", result: "partial", ...incorrect, explanation: "環境轉換本身就有壓力；此刻強迫移動會增加緊迫。", suggestion: "先把外出籠放在鳥籠旁，等待牠自行探索的時機。" },
    { id: "bird-arrival-cover", text: "放在安靜固定位置，輕蓋遮光布讓 {petName} 平靜下來", result: "correct", ...positive, explanation: "新環境刺激很強；保留通風並輕蓋遮光布，能提供熟悉的封閉感。", expenseIds: ["bird-arrival-checkup"] },
    { id: "bird-arrival-family", text: "邀請全家人圍過來，讓牠快點認識大家", result: "incorrect", ...incorrect, explanation: "多人圍觀是強烈視覺和聽覺刺激。", suggestion: "先保持安靜，讓牠在最少干擾中適應。" },
    { id: "bird-arrival-fly", text: "立刻讓 {petName} 出籠，在房間自由飛翔", result: "incorrect", ...incorrect, explanation: "未確認房間安全前出籠，可能撞傷或逃跑。", suggestion: "先在籠內穩定，再規劃安全的籠外活動。" },
  ] },
  { id: "bird-puffing-feathers", stage: "日常照護", stageId: "daily", stageTitle: "日常照護", timeLabel: "日常照護", title: "{petName} 羽毛一直膨起來", description: "今天 {petName} 的羽毛鬆鬆膨起，比平時圓了一圈，站在棲木上也沒什麼精神。你應該怎麼做？", topic: "澎毛與健康警訊", reportSummary: "澎毛時要同時觀察食慾、呼吸與站棲狀態，適度保暖並設定明確就醫時機。", artIndex: 1, multipleChoice: true, requiredCorrectOptionIds: ["bird-puff-observe", "bird-puff-warm", "bird-puff-record"], wrongOptionIds: ["bird-puff-wait"], correctSummary: ["觀察食慾、呼吸與站棲等其他症狀。", "確認環境溫度並適度保暖。", "記錄時間，異常持續或惡化即聯繫鳥類獸醫。"], learningPoints: knowledge.puff, knowledgeTitle: "鳥類小知識", choices: [
    { id: "bird-puff-observe", text: "觀察是否同時有食慾下降、呼吸急促或無法站棲木", result: "correct", ...positive, explanation: "澎毛需搭配其他症狀一起判斷。" },
    { id: "bird-puff-warm", text: "確認環境溫度，適度移到較溫暖的位置", result: "correct", ...positive, explanation: "澎毛可能代表寒冷或不適；保暖後仍要持續觀察。" },
    { id: "bird-puff-wait", text: "上網查詢澎毛原因，找出最像的症狀後自行調整飼料或補充保健品", result: "incorrect", ...incorrect, explanation: "鳥類疾病症狀重疊性高，網路資料無法取代實際診斷；自行調整飲食或補充保健品也可能掩蓋或加重問題。", suggestion: "同步觀察其他警訊，必要時直接聯繫熟悉鳥類的獸醫師。" },
    { id: "bird-puff-record", text: "記錄時間，24 小時未改善或惡化就聯繫鳥類獸醫", result: "correct", ...positive, explanation: "設定明確的就醫時機，是安全的應對節奏。" },
  ] },
  { id: "bird-molting-care", stage: "日常照護", stageId: "daily", stageTitle: "日常照護", timeLabel: "日常照護", title: "{petName} 開始大量脫毛", description: "最近幾天，你發現籠子底部和周圍有很多羽毛，{petName} 在不停地理羽，偶爾還會用嘴咬羽毛。", topic: "換羽與過度理羽", reportSummary: "換羽時觀察對稱性、精神食慾與脫羽部位；不對稱裸皮或皮膚損傷需就醫評估。", artIndex: 2, multipleChoice: true, requiredCorrectOptionIds: ["bird-molt-symmetry", "bird-molt-appetite", "bird-molt-location"], wrongOptionIds: ["bird-molt-vet", "bird-molt-supplement"], correctSummary: ["觀察脫羽是否對稱。", "確認食慾和精神是否正常。", "觀察脫羽部位與皮膚狀況。"], learningPoints: knowledge.molt, knowledgeTitle: "鳥類小知識", choices: [
    { id: "bird-molt-symmetry", text: "觀察脫羽是否對稱，兩側是否同時發生", result: "correct", ...positive, explanation: "正常換羽通常是連續且對稱的。" },
    { id: "bird-molt-appetite", text: "確認 {petName} 的食慾和精神是否正常", result: "correct", ...positive, explanation: "換羽時仍應維持正常食慾與精神。" },
    { id: "bird-molt-location", text: "確認脫羽是否在嘴喙可碰觸處，並留意皮膚損傷", result: "correct", ...positive, explanation: "可能是過度理羽或拔毛，需要評估壓力、寄生蟲或營養問題。" },
    { id: "bird-molt-vet", text: "這一定是生病了，立刻就醫", result: "partial", ...incorrect, explanation: "成鳥每年有一到兩次季節性換羽；先觀察對稱性、食慾精神與脫羽部位，再判斷是否需要就醫。", suggestion: "若不對稱大面積脫羽、皮膚損傷或精神食慾異常，應聯繫鳥類獸醫。" },
    { id: "bird-molt-supplement", text: "先買羽毛生長補品給牠吃", result: "incorrect", ...incorrect, explanation: "未經獸醫評估自行補充，可能不適合該物種。", suggestion: "擔心異常時先諮詢鳥類獸醫。" },
  ] },
  { id: "bird-picky-eating", stage: "日常照護", stageId: "daily", stageTitle: "日常照護", timeLabel: "日常照護", title: "{petName} 只挑牠喜歡的吃，怎麼辦？", description: "你發現 {petName} 總是把葵花籽和花生先挑光，其他飼料留在碗裡。你想幫牠吃得更均衡。", topic: "鸚鵡挑食與定量餵食", reportSummary: "以定量餵食、訓練獎勵與覓食玩具協助鸚鵡建立均衡飲食。", artIndex: 1, multipleChoice: true, requiredCorrectOptionIds: ["bird-picky-portion", "bird-picky-reward", "bird-picky-forage"], wrongOptionIds: ["bird-picky-favorite"], correctSummary: ["每天定量提供飼料。", "將喜好食物留作訓練獎勵。", "把食物藏在覓食玩具中。"], learningPoints: ["鸚鵡偏愛高油脂種子，長期只吃喜好食物容易造成**肥胖**與**營養失衡**。", "**定量餵食**、**訓練獎勵**和**覓食玩具**可同時改善挑食與無聊。"], knowledgeTitle: "鸚鵡小知識", choices: [
    { id: "bird-picky-favorite", text: "把 {petName} 不喜歡的種子挑掉，只留牠愛吃的", result: "incorrect", ...incorrect, explanation: "葵花籽和花生含油量極高，長期只吃喜好食物會導致肥胖和營養失衡。" },
    { id: "bird-picky-portion", text: "每天定量提供飼料，不讓碗裡隨時都有充足食物", result: "correct", ...positive, explanation: "在有限食物量內，牠會開始嘗試不同種子，而不是只等最愛的食物。" },
    { id: "bird-picky-reward", text: "將 {petName} 最愛的食物單獨留出，作為訓練互動的獎勵零食", result: "correct", ...positive, explanation: "把高誘因食物作為訓練獎勵，能讓互動更有效，同時維持多元飲食。" },
    { id: "bird-picky-forage", text: "把食物藏在覓食玩具裡，讓 {petName} 自己探索取食", result: "correct", ...positive, explanation: "覓食玩具增加探索刺激，也讓進食行為更接近自然狀態。" },
  ] },
  { id: "bird-stereotypy", stage: "日常照護", stageId: "daily", stageTitle: "日常照護", timeLabel: "日常照護", title: "{petName} 一直重複做同一件事", description: "你發現 {petName} 這幾天每天早上都在籠子同一個位置來回踱步，動作單一且持續，跟平時的活潑好動完全不同。", topic: "鸚鵡刻板行為", reportSummary: "刻板行為需從互動與環境豐富化尋找成因，而非只阻斷表面行為。", artIndex: 2, multipleChoice: true, requiredCorrectOptionIds: ["bird-stereotypy-social", "bird-stereotypy-enrichment"], wrongOptionIds: ["bird-stereotypy-remove", "bird-stereotypy-vet"], correctSummary: ["確認籠外互動時間是否足夠。", "輪換籠內玩具，增加豐富化設施。"], learningPoints: ["固定路線踱步、重複啄同一點是常見**壓力指標**。", "**環境豐富化**與足夠的**籠外社交時間**，是預防刻板行為的關鍵。"], knowledgeTitle: "鸚鵡小知識", choices: [
    { id: "bird-stereotypy-remove", text: "把 {petName} 踱步的那段棲木移掉，讓牠沒辦法繼續重複這個動作", result: "incorrect", ...incorrect, explanation: "移除棲木沒有解決壓力或社交需求不足的成因，行為可能轉移成其他形式。" },
    { id: "bird-stereotypy-social", text: "確認 {petName} 每天是否有足夠的籠外互動時間", result: "correct", ...positive, explanation: "缺乏社交陪伴容易發展刻板行為；增加籠外互動是首要調整。" },
    { id: "bird-stereotypy-enrichment", text: "嘗試輪換籠內玩具，增加新的豐富化設施", result: "correct", ...positive, explanation: "定期輪換能增加探索刺激、緩解刻板行為。" },
    { id: "bird-stereotypy-vet", text: "刻板行為代表 {petName} 生病了，立刻就醫", result: "incorrect", ...incorrect, explanation: "先調整環境和互動頻率；若同時出現澎毛、食慾下降等症狀，再聯繫鳥類獸醫評估。" },
  ] },
  { id: "bird-excessive-calling", stage: "日常照護", stageId: "daily", stageTitle: "日常照護", timeLabel: "日常照護", title: "{petName} 一直叫，我到底該怎麼辦？", description: "{petName} 今天從日出開始就一直大叫。家人問：「這樣下去不行，到底怎麼讓牠安靜？」", topic: "鸚鵡鳴叫與互動需求", reportSummary: "先確認社交互動與環境刺激；不以大聲責罵或遮籠方式壓制鳴叫。", artIndex: 3, multipleChoice: true, requiredCorrectOptionIds: ["bird-call-interaction", "bird-call-environment"], wrongOptionIds: ["bird-call-yell", "bird-call-cover"], correctSummary: ["確認籠外互動時間與陪伴是否足夠。", "檢查環境刺激並調整作息。"], learningPoints: ["鸚鵡的鳴叫可能是社交呼喚、環境刺激或作息不穩的訊號。", "建立固定互動與睡眠節奏，比用責罵或遮籠壓制更能處理問題。"], knowledgeTitle: "鸚鵡小知識", completionFeedback: {
    title: "做得很好！",
    encouragement: "你沒有只想著「讓牠閉嘴」，而是找根本原因，做得很好！充足的互動和豐富化才能減少**呼喚型**的過度鳴叫，但**例行型**的叫聲是天性——不需要，也不可能完全消除。",
    knowledgeTitle: "鸚鵡小知識",
    knowledgeContent: [
      { type: "paragraph", text: "鸚鵡的鳴叫分成幾種類型：**呼喚型**（缺乏互動）、**無聊型**（環境刺激不足）、**發情型**（荷爾蒙影響）、**例行型**（日出日落天性）。**呼喚型**和**無聊型**可以透過足夠的籠外互動和**豐富化玩具**大幅減少；**例行型**則需要接受，並學習辨識——這也是養鸚顡的日常功課。" },
    ],
  }, choices: [
    { id: "bird-call-interaction", text: "確認今天 {petName} 的籠外互動時間是否足夠，可能是在呼喚你", result: "correct", ...positive, explanation: "缺乏互動是過度鳴叫常見原因；先確認社交需求是否被滿足。" },
    { id: "bird-call-environment", text: "檢查是否有噪音、光線或作息改變等環境刺激，調整後再觀察", result: "correct", ...positive, explanation: "環境刺激與作息不穩也會提高鳴叫頻率。" },
    { id: "bird-call-yell", text: "大聲責罵 {petName}，讓牠知道不能再叫", result: "incorrect", ...incorrect, explanation: "大聲回應可能被鳥理解成加入鳴叫，還會增加緊迫。" },
    { id: "bird-call-cover", text: "把籠子整個蓋住，強迫牠安靜", result: "incorrect", ...incorrect, explanation: "強制遮籠無法解決原因，也可能破壞穩定作息與安全感。" },
  ] },
  { id: "bird-busy-care", stage: "生活變化", stageId: "life-change", stageTitle: "當生活發生變化", timeLabel: "當生活發生變化", title: "如果你很忙，{petName} 怎麼辦？", description: "你接到緊急通知，這週需要外出出差三天，沒辦法照顧 {petName}。你打開手機，看著 {petName} 的照片，開始想——這幾天，牠怎麼辦？", topic: "忙碌備援計畫", reportSummary: "忙碌前要安排可信任協助者，並交接每日照護、鳥類獸醫與緊急聯絡方式。", artIndex: 0, learningPoints: ["鳥類每天需要新鮮飼料、乾淨飲水、清潔和健康觀察，這些事情沒有人做，就會累積問題。", "平時就要確認<mark>鳥類獸醫的聯絡方式</mark>，關鍵時刻才能立即行動。"], knowledgeTitle: "鳥類小知識", busyCareCompletion: {
    title: "做得很好！",
    encouragement: "你不只是找了人，還確認了時間、意願、照護細節和緊急聯絡，這樣的交接才能讓 {petName} 在你忙碌時仍獲得穩定照顧，做得很好！",
    reflectionText: "在 {petName} 的世界裡，你的聲音是牠最熟悉的安定。",
    reflectionTitle: "留給自己的一個問題",
    reflectionContent: ["忙完一天回到家，你還有餘力讓 {petName} 出籠活動、跟牠說說話嗎？就算只是短短幾分鐘？"],
    showKnowledgeCard: false,
    careTimeTitle: "每日照護時間",
    careTimeItems: birdReport.dailyCareBreakdown,
    showCareTime: false,
    additionalAdvice: ["如果未來找不到合適的代養人，可以提前了解附近是否有接受鳥類的寵物旅館，作為備用方案。⚠️ 請注意，市面上接受鳥類的寵物旅館極少，建議平時就事先查詢確認。"],
  }, choices: [
    { id: "bird-busy-extra", text: "多放三天份量的飼料和水，讓 {petName} 自己撐過去", result: "incorrect", ...incorrect, explanation: "鳥需要每天補充新鮮飼料和飲水，堆放的食物容易變質，大容器的水也難以維持品質；每天的健康觀察也會中斷。", suggestion: "安排有養鳥經驗的人每天到場照顧。" },
    { id: "bird-busy-helper", text: "拜託有養鳥經驗的朋友或家人，每天到家裡補充飼料、換水、清潔和觀察 {petName} 狀態", result: "correct", ...positive, explanation: "有養鳥基礎的人代為照顧是最理想的選擇；事先說明個性、日常習慣、就醫警訊和動物醫院聯絡方式。" },
    { id: "bird-busy-alone", text: "讓 {petName} 在外出籠裡，送到朋友家暫住", result: "partial", ...incorrect, explanation: "送托可行，但鳥類對環境變化敏感，新環境可能造成壓力；需確認接收方有養鳥知識、環境安全且轉移過程安全。", suggestion: "優先安排熟悉環境中的每日到場照護。" },
    { id: "bird-busy-hotel", text: "把 {petName} 放在陽台，讓鄰居幫忙隨便照看一下", result: "incorrect", ...incorrect, explanation: "陽台可能有溫度極端、天氣和噪音問題；沒有養鳥知識的鄰居也難以察覺健康異常。", suggestion: "安排有經驗且能完成完整交接的照護者。" },
  ] },
  { id: "bird-health-emergency", stage: "生活變化", stageId: "life-change", stageTitle: "健康狀況變化", timeLabel: "健康狀況變化", title: "{petName} 看起來還好——但你真的確定嗎？", description: "你的朋友說：「我上次養的鳥，前幾天還很活潑，突然有一天就不行了，完全沒有預兆。」你開始思考：鳥生病到底怎麼看出來？", topic: "隱藏病徵與健康管理", reportSummary: "鳥常隱藏病徵；年度鳥類健檢與每天觀察進食、飲水、糞便及精神狀態都很重要。", artIndex: 1, learningPoints: knowledge.health, knowledgeTitle: "鳥類小知識", completionFeedback: {
    title: "做得很好！",
    encouragement: "你知道光靠外表看不出鳥是否生病，選擇每日記錄並定期帶去健檢，做得很好！",
    knowledgeTitle: "鸚鵡小知識",
    knowledgeContent: [
      { type: "paragraph", text: "鸚鵡常見需要留意的健康問題：" },
      { type: "item", text: "**呼吸困難**（張口呼吸、尾羽隨呼吸上下擺動）：屬於緊急症狀，需當天聯繫鳥類獸醫" },
      { type: "item", text: "**消化異常**（反覆嘔吐、體重持續下降、糞便明顯改變）：持續超過一天應就醫確認" },
      { type: "item", text: "**拔毛或過度理羽**（出現裸皮、羽毛凌亂稀疏）：可能源於壓力、寄生蟲或疾病，需就醫評估" },
      { type: "item", text: "**產蛋異常**（雌鳥頻繁產蛋、無法正常站立移動）：可能導致缺鈣或難產，需緊急就醫" },
      { type: "item", text: "**肥胖**（手觸胸骨摸不到尖端、體型圓滾）：長期只吃高油脂種子的常見結果，需調整飲食" },
    ],
    reminder: "進食量減少、飲水異常、糞便改變、澎毛超過 24 小時、行為突然改變都是需要關注的警訊；觀察到多項同時出現時，應盡速聯繫鳥類獸醫，不要觀望等待。",
  }, choices: [
    { id: "bird-health-eating", text: "鳥只要還在吃東西，就不需要擔心健康問題", result: "incorrect", ...incorrect, explanation: "鳥隱藏病徵的能力極強，可能在相當不適的情況下仍維持部分進食；等到完全不吃，往往已是嚴重狀況。", suggestion: "每天一起觀察進食量、飲水量、糞便、精神與行為。" },
    { id: "bird-health-checkup", text: "鳥每年應帶至熟悉鳥類醫療的獸醫進行健康檢查，同時每天觀察行為、進食量和糞便", result: "correct", ...positive, explanation: "定期健檢可發現看不出來的問題；每天觀察進食量、飲水量、糞便與行為，是最早發現異常的方式。", expenseIds: ["bird-arrival-checkup"] },
    { id: "bird-health-weight", text: "鸚鵡的體重不需要定期秤，憑外觀就能判斷", result: "incorrect", ...incorrect, explanation: "羽毛覆蓋讓鳥的體型難以用肉眼評估；定期秤體重與觸摸胸骨才能準確監測體態。", suggestion: "建立固定的體重與日常狀態紀錄。" },
    { id: "bird-health-cost", text: "鳥一年要健檢一次，是浪費錢的行為", result: "incorrect", ...incorrect, explanation: "鳥隱藏病徵能力強、病程發展快；年度健檢能提前發現潛在問題。", suggestion: "把健檢列入長期照護預算。" },
  ] },
  { id: "bird-senior-care", stage: "生活變化", stageId: "life-change", stageTitle: "高齡照護", timeLabel: "逐漸進入高齡", title: "{petName} 慢慢變老了", description: "{petName} 跟你生活了很多年，牠的活動量慢慢減少，有時候站在低一點的棲木上，有時候理羽的時間更長了。你知道牠開始進入老年期了。", topic: "高齡鳥照護", reportSummary: "高齡鳥需降低跌落風險並提高健檢頻率，維持安全、舒適與密切觀察。", artIndex: 2, multipleChoice: true, requiredCorrectOptionIds: ["bird-senior-perch", "bird-senior-checkup"], wrongOptionIds: ["bird-senior-remove", "bird-senior-reduce-interaction"], correctSummary: ["將棲木調低，降低跌落風險。", "提高健檢頻率，從一年一次改為更頻繁。"], learningPoints: knowledge.senior, knowledgeTitle: "鳥類小知識", completionFeedback: {
    title: "做得很好！",
    encouragement: "你知道高齡照護不只是「讓牠安靜休息」，而是需要主動調整環境和加強醫療觀察，做得很好！",
    knowledgeTitle: "長達 10 年至近 50 年的每日陪伴與生命承諾",
    knowledgeContent: [
      { type: "paragraph", text: "與 {petName} 在一起，是一份 **10 年以上**的承諾——有些物種甚至能陪你走過 **30、40 年**。" },
      { type: "paragraph", text: "牠會隨著歲月老去，需要更多**陪伴**、**照護**與**醫療資源**。" },
      { type: "paragraph", text: "在迎接牠之前，請先問問自己：你做好了陪伴牠走到**生命盡頭**的準備嗎？" },
    ],
  }, choices: [
    { id: "bird-senior-perch", text: "將棲木調低，降低跌落風險", result: "correct", ...positive, explanation: "可保留一根較高棲木，讓牠自行選擇。", expenseIds: ["bird-senior-room"] },
    { id: "bird-senior-checkup", text: "提高健檢頻率，從一年一次改為更頻繁", result: "correct", ...positive, explanation: "能及早發現老年常見的代謝與心血管問題。", expenseIds: ["bird-senior-checkup"] },
    { id: "bird-senior-remove", text: "高齡鳥不再需要豐富化設施，讓牠安靜休息就好", result: "incorrect", ...incorrect, explanation: "即使活動力下降，適合老年鳥的簡單啃咬玩具與低難度益智設施仍有助於心理健康，不應完全撤除所有刺激。", suggestion: "依活動能力調整豐富化，而非完全撤除。" },
    { id: "bird-senior-reduce-interaction", text: "活動力明顯下降後，可以逐漸減少每天的籠外互動時間，讓牠多休息", result: "incorrect", ...incorrect, explanation: "老年期的社交陪伴仍然重要，強制剝奪互動反而可能加速心理退化。應依個體狀況調整互動方式，而非直接縮短時間。", suggestion: "依個體狀況調整互動方式，而非直接縮短時間。" },
  ] },
];

export const birdActivityScenarios: Record<"bird-cage-inspection", Scenario> = {
  "bird-cage-inspection": { id: "bird-cage-inspection", stage: "日常照護", stageId: "daily", stageTitle: "日常照護", timeLabel: "日常照護", title: "鳥籠日常巡視", description: "清潔托盤、觀察糞便與健康狀態，並安排籠外互動。", topic: "每日鳥籠巡視", reportSummary: "每天清潔糞便托盤、觀察排泄與健康，並安排安全籠外互動，是鳥類照護的基礎。", artIndex: 0, learningPoints: ["每天更換墊料，才能清楚觀察糞便量與狀態。", "澎毛、無法站棲木、張口呼吸是當天聯繫鳥類獸醫的警訊。"], knowledgeTitle: "鳥類日常照護", choices: [{ id: "bird-cage-complete", text: "完成鳥籠巡視", result: "correct", ...positive, explanation: "你完成了清潔、觀察與安全互動，替日常健康守住重要細節。" }] },
};
