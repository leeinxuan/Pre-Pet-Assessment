import { buildBreedChallengeScenarios, type BreedChallengeQuestion } from "../../shared/breed-challenges";

export const catBreedChallengeContent: Record<string, BreedChallengeQuestion[]> = {
  "mixed-cat": [
    {
      title: "牠的個性是牠自己的",
      description: "你聽說橘貓一定親人、虎斑一定調皮。\n\n但你的米克斯貓和別人說的完全不一樣，你會怎麼做？",
      topic: "個體差異與個性理解",
      reportSummary: "米克斯貓個性主要受早期社會化與生活經驗影響，毛色或花紋無法預測個性，需透過實際觀察了解每隻貓。",
      breedKnowledge: "米克斯貓外觀多元；個性主要受**早期社會化**與**個別生活經驗**塑造，而非毛色決定。\n\n每隻貓的互動偏好、膽量與情緒表達都不同。慢慢觀察牠實際的**行為模式**，才是了解牠的最好方法。",
      correctChoiceIndex: 1,
      correctText: "觀察牠實際的行為與回應，慢慢了解牠的個別喜好與節奏",
      correctExplanation: "每隻貓的個性都不一樣，不能靠毛色或別人的經驗預測。透過耐心觀察牠的行為反應，才能真正了解牠的需求。",
      distractors: [
        { text: "牠的毛色這麼特別，個性一定跟大家說的一樣", explanation: "毛色或花紋並不能可靠地預測個性，不同米克斯貓的個性差異可以非常大。", suggestion: "放下預期，從實際互動中了解牠。" },
        { text: "牠跟大家說的不一樣，可能是牠不正常", explanation: "每隻貓的個性都不同，這是正常的，不是問題。", suggestion: "觀察牠的行為、回應與情緒線索，尊重牠的個別節奏。" },
        { text: "用同一套方式對待所有貓就好，個性差異不重要", explanation: "忽略個別差異可能讓貓咪感到壓力，也難以發現牠真正的需求。", suggestion: "調整互動方式，配合牠實際的個性與回應。" },
      ],
    },
    {
      title: "每天的獵捕時間",
      description: "你的米克斯貓白天在家發呆，偶爾突然飛奔，也開始亂咬你的腳踝。\n\n你打算怎麼安排每天的互動？",
      topic: "互動遊戲與環境豐富化",
      reportSummary: "所有貓咪都保有獵捕本能，每天需安排可追逐、撲抓、完成獵捕循環的互動遊戲。",
      breedKnowledge: "不論毛色與外觀，貓咪都保有「**搜索→追逐→撲抓→收尾**」的完整**獵捕本能**。\n\n每天安排兩到三段短時間的**逗貓棒互動遊戲**，讓牠追逐可捕捉的物件，能滿足這項需求並減少無聊行為。",
      correctChoiceIndex: 0,
      correctText: "每天安排兩到三段短時間的逗貓棒互動遊戲，提供安全玩具，不用手腳逗弄",
      correctExplanation: "每天固定的獵捕式互動能有效滿足牠的本能需求，也能避免把手腳當成玩具的習慣。",
      distractors: [
        { text: "買很多靜態玩具散在地上，讓牠自己玩就好", explanation: "靜態玩具若沒有陪玩、輪替或帶動，很快會失去吸引力，也無法真正滿足獵捕需求。", suggestion: "安排固定的互動陪玩時間，結束後收好線狀玩具。" },
        { text: "牠咬腳踝就輕打牠的鼻子讓牠知道不能咬", explanation: "處罰方式可能讓貓咪感到壓力或混亂，也沒有解決精力未滿足的根本原因。", suggestion: "提供每天的獵捕遊戲出口，亂咬行為通常會自然減少。" },
        { text: "等牠自己無聊跑掉就好，貓咪通常會自我調節", explanation: "精力長期未獲滿足的貓咪可能出現無聊行為或壓力，不一定會自然消退。", suggestion: "主動安排固定遊戲，不要等到出現問題才介入。" },
      ],
    },
    {
      title: "室內生活與體重管理",
      description: "你的米克斯貓整天窩在家，偶爾玩一下就去睡覺。\n\n家人想讓牠自由吃到飽，你會怎麼安排？",
      topic: "飲食與體重管理",
      reportSummary: "室內貓活動量低，自由任食容易過重；需定時定量並搭配益智漏食玩具。",
      breedKnowledge: "室內飼養時，日常活動量通常較低；**自由任食**容易讓牠在不知不覺中攝取超過所需熱量，長期可能**體重超標**。\n\n以**定時定量**搭配**益智漏食玩具**，讓進食本身也成為一種活動，是穩定的管理方式。",
      correctChoiceIndex: 2,
      correctText: "定時定量分次餵食，搭配益智漏食玩具，定期觀察體態",
      correctExplanation: "室內貓活動量低，定量管理能掌握每日熱量，益智漏食玩具讓吃飯同時也是活動，有助維持健康體態。",
      distractors: [
        { text: "牠活動量低就自行少餵一半，等牠瘦了再調整", explanation: "自行大幅減少份量可能讓牠攝取不足，應依體態和獸醫建議調整。", suggestion: "諮詢獸醫後依體態調整份量，避免過度減食。" },
        { text: "讓牠自由吃到飽，反正牠看起來還好", explanation: "自由任食對活動量低的室內貓很容易造成過重，外觀有時不容易判斷體態。", suggestion: "改成定時定量，並定期摸肋骨或量體重確認體態。" },
        { text: "只要每天玩一點，就算任食也不會胖", explanation: "少量活動消耗的熱量有限，若進食無限制，仍可能攝取超過所需。", suggestion: "活動與定量餵食都需要，不能只靠遊戲來平衡無限制的飲食。" },
      ],
    },
  ],
  "british-shorthair": [
    {
      title: "英短的吃貨本性",
      description: "英國短毛貓食慾旺盛，但天生活動量偏低。\n\n你打算怎麼幫牠維持健康體重？",
      topic: "飲食與體重管理",
      reportSummary: "英短食慾好、活動量低，容易過重；需定時定量餵食並搭配益智漏食玩具。",
      breedKnowledge: "英國短毛貓常見**活動量低**、**食慾旺盛**的照護挑戰，容易在不知不覺中**體重超標**。\n\n採**定時定量餵食**，並用**益智漏食玩具**延長進食時間；避免**自由任食**。",
      correctChoiceIndex: 0,
      correctText: "定時定量分次餵食，搭配益智漏食玩具，避免自由任食",
      correctExplanation: "英短活動量低、食慾好，定量管理加上漏食玩具能讓牠吃得慢、動得多，有效降低過重風險。",
      distractors: [
        { text: "讓牠自由進食，想吃多少就吃多少", explanation: "英短活動量低，自由任食很容易吃過量而過重。", suggestion: "換成定時定量，再用益智玩具讓牠邊活動邊吃。" },
        { text: "多安排陪玩時間，消耗多少就補多少", explanation: "增加活動是好事，但補充量仍需依體態評估，不能直接增加份量。", suggestion: "遊戲時間增加後，仍依體態與獸醫建議決定是否調整份量。" },
        { text: "只要牠看起來不胖就不用管食量", explanation: "肉眼判斷不夠準確，早期過重或體態變化不易察覺。", suggestion: "定期摸肋骨、量體重，搭配獸醫體態評估。" },
      ],
    },
    {
      title: "英短的心臟要定期檢查",
      description: "英國短毛貓有較高的肥厚性心肌病（HCM）風險，早期通常沒有明顯症狀。\n\n你會怎麼安排健康追蹤？",
      topic: "品種相關健康篩檢",
      reportSummary: "英短是HCM高風險品種；早期多無症狀，建議定期例行健康檢查含心臟聽診。",
      breedKnowledge: "**肥厚性心肌病（HCM）**早期可能完全沒有症狀；有時只有在例行健康檢查時，才能透過**心雜音**發現線索。\n\n定期安排**心臟聽診**，必要時搭配**超音波篩檢**，有助及早發現。",
      correctChoiceIndex: 2,
      correctText: "定期帶去獸醫做例行健康檢查，包含心臟聽診篩檢",
      correctExplanation: "HCM早期沒有明顯症狀，定期例行檢查有機會透過心雜音早期發現，讓病情在加重前獲得介入。",
      distractors: [
        { text: "只要牠精神好、食慾正常，就不用特別檢查", explanation: "HCM早期幾乎沒有外在症狀，精神與食慾好不代表心臟沒有問題。", suggestion: "即使看起來健康，定期健康檢查仍是發現早期問題的關鍵。" },
        { text: "等到出現呼吸困難或精神變差再去看醫生", explanation: "等到明顯症狀出現時，病情可能已進展到較嚴重的階段。", suggestion: "定期健康檢查讓問題能在症狀前被發現，而不是等到出現後才處理。" },
        { text: "心臟病是老貓才需要擔心的問題，現在還早", explanation: "HCM在英短中可能在成年或中年就出現，不限於高齡貓。", suggestion: "從成年期起安排定期心臟聽診，不要等到老年才開始。" },
      ],
    },
    {
      title: "那一身豐厚的毛",
      description: "英國短毛貓雖是短毛，但被毛密度很高；換毛季節的掉毛量更多。\n\n你打算怎麼照顧？",
      topic: "毛髮梳理照護",
      reportSummary: "英短被毛密度高，平時每週梳毛一次，春秋換毛季應加強梳理頻率。",
      breedKnowledge: "英國短毛貓被毛密集；每到**春、秋換毛季**，掉毛量會明顯增加。\n\n平時**每週至少梳理一次**；換毛期可提高到**每天或隔天**，幫助去除死毛並維持舒適。",
      correctChoiceIndex: 3,
      correctText: "平時每週至少梳毛一次，換毛季節加強頻率",
      correctExplanation: "定期梳毛能有效清除死毛、減少飛毛，換毛季增加頻率讓毛況和家中環境更好管理。",
      distractors: [
        { text: "短毛貓不需要梳毛，自己舔毛就夠了", explanation: "英短毛密度極高，僅靠自我梳理不足以去除大量死毛，換毛季尤其明顯。", suggestion: "準備適合的梳子，固定安排梳毛時間。" },
        { text: "只在牠明顯掉毛時才梳一梳", explanation: "等到掉毛已很嚴重才開始，家裡和牠身上的毛都更難管理。", suggestion: "平時定期梳毛是預防，換毛季則需加強頻率。" },
        { text: "牠不喜歡被梳就不強迫，不梳也不會怎樣", explanation: "不梳毛會讓死毛堆積，可能增加毛球與家中毛髮問題。", suggestion: "從短時間、溫和方式開始讓牠習慣梳毛，再慢慢延長。" },
      ],
    },
  ],
};

export function getCatBreedChallengeScenarios(breedId: string) {
  const questions = catBreedChallengeContent[breedId] ?? catBreedChallengeContent["mixed-cat"];
  return buildBreedChallengeScenarios(questions, catBreedChallengeContent[breedId] ? breedId : "mixed-cat");
}
