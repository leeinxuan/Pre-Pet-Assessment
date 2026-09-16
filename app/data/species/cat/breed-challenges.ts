import { buildBreedChallengeScenarios, type BreedChallengeQuestion } from "../../shared/breed-challenges";

/** Cat breed-specific content from docs/cat-game-planning.md. */
export const catBreedChallengeContent: Record<"mixed-cat" | "british-shorthair", BreedChallengeQuestion[]> = {
  "mixed-cat": [
    { title: "牠來自哪裡", description: "你在收容所領養了 {petName}，帶牠回家後，牠立刻躲進床底下。家人說：「要不要主動把牠抱出來，多跟牠互動，讓牠快點習慣？」你會怎麼做？", topic: "收容所適應與安全感", reportSummary: "許多台灣米克斯貓來自收容所或曾有流浪經歷；躲藏是正常的適應行為，應提供安全藏身空間並讓牠自行靠近。", breedKnowledge: "許多台灣米克斯貓來自**收容所或曾是流浪貓**，早期社會化程度因個體而差異極大。初到新家時，**躲藏是正常的適應行為**，不代表牠無法融入。最重要的是準備好**安全藏身空間**，讓牠主動決定何時靠近。適應期可能需要**數天到數週**，強迫互動只會延長這個過程。", correctChoiceIndex: 1, correctText: "讓牠躲著，準備好安全藏身空間，等牠自己出來", correctExplanation: "躲藏是正常適應行為，不代表牠不能融入。提供安全藏身空間，讓牠主動決定何時靠近，才是建立信任的起點。", distractors: [
      { text: "牠的毛色這麼特別，個性一定跟大家說的一樣親人", explanation: "毛色或花紋無法預測個性。每隻米克斯貓的社會化程度和過去經歷都不同。", suggestion: "先觀察牠的實際反應，尊重牠的適應節奏。" },
      { text: "牠跟大家說的不一樣，可能是不正常的貓", explanation: "每隻貓的個性都不同，這是正常的。觀察牠實際的行為與回應，才是了解牠的方法。", suggestion: "保留安全空間並減少刺激。" },
      { text: "用同一套方式對待所有貓就好，個性差異不重要", explanation: "忽略個別差異可能讓貓感到壓力，也難以發現牠真正的需求。", suggestion: "依牠的回應調整互動方式。" },
    ] },
    { title: "你以為領養的是短毛貓……", description: "你在認養說明會上看上一隻看起來是短毛的幼貓，打算帶牠回家。朋友問你：「你知道牠長大會變成什麼毛型嗎？」", topic: "米克斯貓毛型與梳理準備", reportSummary: "米克斯貓的成貓毛型無法從幼貓外觀準確預測；毛型會影響日常梳理需求。", breedKnowledge: "米克斯貓的**成貓毛型無法從幼貓外觀準確預測**。幼貓時看似短毛，長大後可能發展出**半長毛甚至長毛**。毛型影響日常梳理需求：短毛貓通常每週梳理一次即可，而半長毛或長毛米克斯貓需要**更頻繁的梳理**，換毛期若疏忽還可能出現打結。領養前應做好照護任何毛型的準備。", correctChoiceIndex: 1, correctText: "幼貓的毛型看不準，長大可能是短毛、半長毛或長毛", correctExplanation: "米克斯貓的基因來源多樣，幼貓的成貓毛型無法準確預測。有些幼貓看起來短毛，成年後卻長出明顯的半長毛或長毛，照護需求也隨之改變。", distractors: [
      { text: "幼貓現在是短毛，長大一定也是短毛", explanation: "米克斯貓的成貓毛型無法從幼貓外觀準確預測，幼貓時看似短毛，長大可能發展為半長毛甚至長毛。", suggestion: "為不同毛型的梳理需求保留準備。" },
      { text: "只要父母都是短毛，幼貓長大也一定是短毛", explanation: "米克斯貓的毛型遺傳複雜，即使父母看起來是短毛，也可能帶有半長毛或長毛基因。", suggestion: "依成長後的實際毛型調整梳理頻率。" },
      { text: "毛型不重要，反正都是米克斯貓", explanation: "毛型會直接影響日常梳理需求與照護方式，長毛或半長毛需要更頻繁的梳理。", suggestion: "領養前先準備照護不同毛型的可能。" },
    ] },
    { title: "雜種優勢……是真的嗎？", description: "朋友說：「米克斯貓是雜種，基因比較強，不像純種貓那麼容易生病，所以不需要常去看醫生。」你打算怎麼回應？", topic: "米克斯貓健康照護", reportSummary: "米克斯貓基因多樣性不代表免疫疾病；定期疫苗、健檢與驅蟲仍不可省略。", breedKnowledge: "米克斯貓的基因多樣性確實可能降低某些**品種遺傳性疾病**的風險，但這不等於「不需要就醫」。曾為流浪貓的米克斯貓可能接觸過**貓愛滋（FIV）**、**貓白血病（FeLV）**等病毒，應在領養前或到家後完整**篩檢**。定期疫苗、年度健檢、驅蟲，仍是每隻貓不可省略的基本照護。", correctChoiceIndex: 1, correctText: "米克斯貓的確較少特定品種遺傳疾病，但仍需定期健檢與疫苗", correctExplanation: "米克斯貓的基因多樣性雖可能降低某些品種遺傳疾病的風險，但常見貓咪疾病（如牙周病、病毒感染）與定期疫苗、驅蟲仍是每隻貓不可省略的基本照護。", distractors: [
      { text: "朋友說得對，米克斯貓基因多樣，基本上不需要定期健檢", explanation: "基因多樣性可能降低某些遺傳性疾病風險，但不等於不需要定期健檢與疫苗。", suggestion: "維持定期健檢、疫苗與驅蟲。" },
      { text: "米克斯貓一定比純種貓健康，完全不需要擔心", explanation: "雜種優勢是相對概念，不代表米克斯貓免疫所有疾病，定期照護仍不可省略。", suggestion: "把健康觀察與例行醫療排進日常。" },
      { text: "米克斯貓從收容所來，通常已打過所有疫苗，之後不需要補打", explanation: "收容所雖會進行基本健康評估，但疫苗有效期與補打時程需與獸醫確認，不可自行假設已完整接種。", suggestion: "到家後確認篩檢與疫苗紀錄。" },
    ] },
  ],
  "british-shorthair": [
    { title: "英短的貪食本性", description: "英國短毛貓食慾旺盛，但天生活動量偏低。你打算怎麼幫牠維持健康體重？", topic: "飲食與體重管理", reportSummary: "英短食慾好、活動量低，容易過重；需定時定量餵食並搭配益智漏食玩具。", breedKnowledge: "英國短毛貓常見**活動量低**、**食慾旺盛**的照護挑戰，容易在不知不覺中**體重超標**。採**定時定量餵食**，並用**益智漏食玩具**延長進食時間；避免**自由任食**。", correctChoiceIndex: 0, correctText: "定時定量分次餵食，搭配益智漏食玩具，避免自由任食", correctExplanation: "英短活動量低、食慾好，定量管理加上漏食玩具能讓牠吃得慢、動得多，有效降低過重風險。", distractors: [
      { text: "讓牠自由進食，想吃多少就吃多少", explanation: "英短活動量低，自由任食很容易吃過量而過重。", suggestion: "改成定時定量，再用益智玩具讓牠邊活動邊吃。" },
      { text: "多安排陪玩時間，消耗多少就補多少", explanation: "增加活動是好事，但補充量仍需依體態評估，不能直接增加份量。", suggestion: "遊戲時間增加後，仍依體態與獸醫建議決定是否調整份量。" },
      { text: "只要牠看起來不胖就不用管食量", explanation: "肉眼判斷不夠準確，早期過重或體態變化不易察覺。", suggestion: "定期撫摸肋骨、量體重，搭配獸醫體態評估。" },
    ] },
    { title: "英短的心臟要定期檢查", description: "英國短毛貓有較高的肥厚性心肌病（HCM）風險，早期通常沒有明顯症狀。你會怎麼安排健康追蹤？", topic: "品種相關健康篩檢", reportSummary: "英短是HCM高風險品種；早期多無症狀，建議定期例行健康檢查含心臟聽診。", breedKnowledge: "**肥厚性心肌病（HCM）**早期可能完全沒有症狀；有時只有在例行健康檢查時，才能透過**心雜音**發現線索。定期安排**心臟聽診**，必要時搭配**超音波篩檢**，有助及早發現。", correctChoiceIndex: 2, correctText: "定期帶去獸醫做例行健康檢查，包含心臟聽診篩檢", correctExplanation: "HCM早期沒有明顯症狀，定期例行檢查有機會透過心雜音早期發現，讓病情在加重前獲得介入。", distractors: [
      { text: "只要牠精神好、食慾正常，就不用特別檢查", explanation: "HCM早期幾乎沒有外在症狀，精神與食慾好不代表心臟沒有問題。", suggestion: "即使看起來健康，定期健康檢查仍是發現早期問題的關鍵。" },
      { text: "等到出現呼吸困難或精神變差再去看獸醫", explanation: "等到明顯症狀出現時，病情可能已進展到較嚴重的階段。", suggestion: "定期健康檢查讓問題能在症狀前被發現，而不是等到出現後才處理。" },
      { text: "心臟病是老貓才需要擔心的問題，現在還早", explanation: "HCM在英短中可能在成年或中年就出現，不限於高齡貓。", suggestion: "從成年期起安排定期心臟聽診，不要等到老年才開始。" },
    ] },
    { title: "那一身豐厚的毛", description: "英國短毛貓雖是短毛，但被毛密度很高；換毛季節的掉毛量更多。你打算怎麼照顧？", topic: "毛髮梳理照護", reportSummary: "英短被毛密度高，平時每週梳毛一次，春秋換毛季應加強梳理頻率。", breedKnowledge: "英國短毛貓被毛密集；每到**春、秋換毛季**，掉毛量會明顯增加。平時**每週至少梳理一次**；換毛期可提高到**每天或隔天**，幫助去除死毛並維持舒適。", correctChoiceIndex: 3, correctText: "平時每週至少梳毛一次，換毛季節加強頻率", correctExplanation: "定期梳毛能有效清除死毛、減少飛毛，換毛季增加頻率讓毛況和家中環境更好管理。", distractors: [
      { text: "短毛貓不需要梳毛，自己舔毛就夠了", explanation: "英短被毛密度極高，僅靠自我梳理不足以去除大量死毛，換毛季尤其明顯。", suggestion: "準備適合的梳子，固定安排梳毛時間。" },
      { text: "只在牠明顯掉毛時才梳一梳", explanation: "等到掉毛已很嚴重才開始，家裡和牠身上的毛都更難管理。", suggestion: "平時定期梳毛是預防，換毛季則需加強頻率。" },
      { text: "牠不喜歡被梳就不強迫，不梳也不會怎樣", explanation: "不梳毛會讓死毛堆積，可能增加毛球與家中毛髮問題。", suggestion: "從短時間、溫和方式開始讓牠習慣梳毛，再慢慢延長。" },
    ] },
  ],
};

export function getCatBreedChallengeScenarios(breedId: string) {
  const supportedBreedId = breedId === "british-shorthair" ? "british-shorthair" : "mixed-cat";
  return buildBreedChallengeScenarios(catBreedChallengeContent[supportedBreedId], supportedBreedId, "cat");
}
