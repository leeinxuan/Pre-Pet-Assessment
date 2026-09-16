import { buildBreedChallengeScenarios, type BreedChallengeQuestion } from "../../shared/breed-challenges";

/** Only breeds available in the current dog journey are represented here. */
export const dogBreedChallengeContent: Record<"shiba" | "mixed", BreedChallengeQuestion[]> = {
  // Existing verified Shiba content is intentionally retained verbatim.
  shiba: [
    { title: "一年四季都在掉毛", description: "柴犬換毛量很大，地板、沙發和衣服上常常都看得到毛。面對長期反覆的清潔工作，你會怎麼處理？", topic: "柴犬的換毛與居家清潔", reportSummary: "柴犬有雙層被毛，平時與換毛期都可能讓家中累積大量毛髮，需要把梳毛、吸塵與衣物除毛納入長期日常。", breedKnowledge: "柴犬具有**雙層被毛**，平時就會掉毛，換毛期更會**大量脫落底毛**；生活在較溫暖或室內環境時，掉毛也可能分散在**全年**。規律梳毛與吸塵能減少散落毛髮，但**無法讓家中完全沒有毛**，也不建議只為了止掉毛就任意剃除雙層毛。", correctText: "固定梳毛與吸塵，把清潔排進每週生活，也接受家裡不可能完全沒有毛", correctExplanation: "規律梳理、清潔與可接受的生活標準，比追求一次清到完全沒毛更能長期維持。", distractors: [
      { text: "等毛多到看不下去時，再一次把牠剃得很短", explanation: "一次剃短不等於解決正常換毛，也可能影響毛髮與皮膚保護。", suggestion: "用適合雙層毛犬的工具規律梳理；若皮膚或掉毛狀況異常，再詢問獸醫或美容專業人員。" },
      { text: "平常先用黏毛滾輪處理衣服，地板週末再一起清就好", explanation: "這能暫時改善外觀，但只處理衣服可能讓毛髮持續堆積，也忽略了狗狗本身需要規律梳理。", suggestion: "把短時間梳毛、局部吸塵和衣物除毛拆成可持續的小任務。" },
      { text: "不讓牠進客廳和房間，應該就不需要常常打掃", explanation: "限制活動範圍無法停止換毛，也可能犧牲原本需要的陪伴與生活品質。", suggestion: "可以設定好清潔的休息區與家具保護方式，但仍要安排互動、梳毛與環境清潔。" },
    ] },
    { title: "颳風下雨也要出門上廁所", description: "柴犬通常很愛乾淨，有些柴犬不喜歡在家裡上廁所。即使天氣不好，牠仍在門邊等著外出，你會怎麼做？", topic: "柴犬的外出排泄需求", reportSummary: "許多柴犬傾向離開生活區域後才排泄，飼主需要每天安排穩定外出，也要準備雨天短路線與室內備案。", breedKnowledge: "柴犬往往很重視生活區域的清潔，許多個體會**傾向離開睡眠與活動空間後才排泄**，因此可能逐漸習慣在戶外如廁。這**不代表牠能長時間憋尿**；飼主仍需每天安排**穩定的外出機會**，也要準備雨具、短路線，以及必要時可逐步練習的室內備案。", correctChoiceIndex: 3, correctText: "準備雨具與擦腳用品，依天氣調整路線和時間，但仍完成安全的外出排泄與基本散步", correctExplanation: "把雨具、短路線與回家清潔準備好，才能在壞天氣中持續滿足排泄與活動需求。", distractors: [
      { text: "今天雨太大，忍一天不上廁所應該還好，明天再遛久一點", explanation: "把需求延到隔天可能讓狗狗長時間不舒服，隔天加長散步也無法補回今天的排泄需求。", suggestion: "縮短路線、避開危險時段並做好雨天防護，但仍要提供安全如廁機會。" },
      { text: "抱牠到門口看雨，如果牠不肯走就直接回家", explanation: "短暫嘗試是有彈性的做法，但若沒有替代安排，牠仍可能整天缺乏合適的排泄機會。", suggestion: "先找有遮蔽的短路線，也可在平日逐步建立備用的室內如廁選項。" },
      { text: "只要在家鋪很多尿墊，牠應該自然就會改在室內上", explanation: "只增加尿墊不一定能立刻改變已建立的如廁習慣，也可能讓牠更困惑。", suggestion: "若要建立室內備案，需要用固定位置、漸進引導與正向回饋慢慢練習。" },
    ] },
  ],
  mixed: [
    { title: "成犬體型，無法從幼犬外表預測", description: "你從收容所帶回了一隻三個月大的米克斯幼犬，看起來小小的很可愛。朋友說：「這麼小，長大應該也不大，就是一隻小型犬吧。」你覺得這個說法……", topic: "米克斯的成犬體型與照護準備", reportSummary: "米克斯的成犬體型與外觀難從幼犬時期預測，飼主應為空間、飼料與醫療費用保留彈性。", breedKnowledge: "米克斯（混種犬）的親本品種往往不確定，**幼犬時期的體型無法可靠預測成犬大小**。在台灣，米克斯的體型分布範圍廣，飼主應為空間、飼料份量與醫療費用做**彈性規劃**，而非假設牠長大後「不會很大」。", correctChoiceIndex: 1, correctText: "米克斯成犬體型不可預測，需為各種可能做好準備", correctExplanation: "正確！米克斯的成犬體型與外觀，取決於親本品種的組合，幼犬階段難以判斷。飼主應為小型至大型的可能做好空間、飼料與醫療費用的準備。", distractors: [
      { text: "對，幼犬如果現在小，長大就是小型犬", explanation: "米克斯的親本品種組合不確定，幼犬時期的體型無法預測成犬大小。許多原本看似小型的幼犬，成年後體型遠超預期。", suggestion: "先以彈性空間、可調整的用品與預算規劃迎接牠的成長。" },
      { text: "米克斯都是中型犬，不用擔心", explanation: "台灣米克斯的體型分布範圍很廣，從 5 公斤以下到 30 公斤以上都有。成犬體型取決於親本組合，無法以「都是中型犬」概括。", suggestion: "不要以單一體型假設用品、空間與醫療需求。" },
      { text: "只要現在吃得不多，長大後也不會需要大空間", explanation: "幼犬的食量與活動範圍不代表成犬需求；成長後的體型、食量與運動需求都可能改變。", suggestion: "隨成長定期評估體態、活動量、用品尺寸與生活空間。" },
    ] },
    { title: "米克斯和純種犬不一樣的地方……", description: "你在書上讀到某個純種犬的性格描述，很詳細。朋友說：「你的米克斯不知道會什麼樣，大概就是隨便吧。」你怎麼看這個說法？", topic: "米克斯的個體差異與理解", reportSummary: "米克斯的個性與習性因個體差異大，應透過收容所觀察、認養前互動與日常相處逐步理解需求。", breedKnowledge: "米克斯的**個性與習性因個體差異大**，無法從品種手冊預判，但可以透過收容所工作人員的觀察記錄、認養前互動，以及接回家後的日常相處，**逐步了解牠的需求與性格**。每一隻米克斯都有獨特的組合，認識牠本身，比查找品種特性更有幫助。", correctChoiceIndex: 1, correctText: "每隻米克斯的個性都是獨特的，需要花時間觀察和了解", correctExplanation: "正確！米克斯的個性由多種基因組合決定，無法從品種手冊預判，但可以透過日常相處、行為觀察，逐漸了解牠的習性與需求。這反而是認識牠的獨特過程。", distractors: [
      { text: "對，米克斯個性隨機，沒辦法預測，只能碰運氣", explanation: "米克斯的個性確實比純種犬更難從外觀預判，但並非「隨機」或「沒辦法了解」。透過收容所工作人員的觀察記錄、個體互動測試，能了解牠的基本性格傾向。", suggestion: "從牠的實際反應與照護紀錄開始，慢慢建立理解。" },
      { text: "米克斯通常比較聰明、健康，所以不需要特別管理", explanation: "米克斯確實常有「雜種優勢」的說法，但這不代表免疫或完全沒有遺傳性健康問題，仍需定期健康檢查與正確飲食管理。", suggestion: "維持健檢、飲食與日常觀察，不以品種印象取代照護。" },
      { text: "米克斯個性不穩定，帶回家前要先測試好幾個月", explanation: "了解個性需要觀察，但不需要誇大成「不穩定」。與收容所工作人員確認基本性格評估，加上接回家後的耐心適應期，是更實際的做法。", suggestion: "為適應期保留時間與安全空間，逐步了解牠。" },
    ] },
  ],
};

export function getDogBreedChallengeScenarios(breedId: string) {
  const supportedBreedId = breedId === "mixed" ? "mixed" : "shiba";
  return buildBreedChallengeScenarios(dogBreedChallengeContent[supportedBreedId], supportedBreedId, "dog");
}
