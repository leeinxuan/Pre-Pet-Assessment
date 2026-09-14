import { buildBreedChallengeScenarios, type BreedChallengeQuestion } from "../../shared/breed-challenges";

/** 兔子不分品種；三個固定挑戰對應飼養前必須理解的生理與照護差異。 */
export const rabbitBreedChallengeContent: Record<"rabbit", BreedChallengeQuestion[]> = {
  rabbit: [
    {
      title: "等等……牠在吃什麼？",
      description: "你看見 `{petName}` 把嘴湊到屁股旁邊，吃了一種像葡萄串、柔軟又帶光澤的東西。",
      topic: "食糞行為（盲腸便）",
      reportSummary: "兔子的食糞行為屬正常生理需求；盲腸便含重要營養，通常會被立即食入。",
      breedKnowledge: "兔子的糞便有兩種：每天清理的**圓形硬糞**，以及柔軟成串的**盲腸便（葡萄便）**。\n\n盲腸便通常會被**立即食入**，其中含有腸道菌叢產生的**必需胺基酸與 B 群維生素**。若大量盲腸便**長期出現在便盆中未被食入**，才需要留意壓力或飲食問題並諮詢獸醫。",
      correctChoiceIndex: 1,
      correctText: "這是食糞行為，盲腸便是必要的營養來源，完全正常",
      correctExplanation: "盲腸便是兔子吸收重要營養的方式；不應阻止或當成一般髒污清除。",
      distractors: [
        { text: "牠好像生病了，要立刻帶去看獸醫", explanation: "這是正常的食糞行為；牠吃的是盲腸便，不是疾病表現。", suggestion: "先分辨圓形硬糞與盲腸便，避免誤解正常生理行為。" },
        { text: "牠在吃地板上的東西，要更頻繁清潔籠子", explanation: "牠是在食入剛排出的盲腸便，不是吃地板上的髒東西。", suggestion: "維持正常清潔即可，不需要為此增加清潔頻率。" },
        { text: "應該阻止這個行為，對衛生習慣不好", explanation: "阻止食入盲腸便會讓兔子少掉重要營養來源。", suggestion: "讓牠完成正常食糞行為；只有長期未食入才需諮詢獸醫。" },
      ],
    },
    {
      title: "一對兔子……會變成幾隻？",
      description: "你的 `{petName}` 快 5 個月了，朋友想帶未絕育的公兔來玩一下，還說就 30 分鐘，沒事的。",
      topic: "繁殖力與絕育時機",
      reportSummary: "兔子繁殖力強，約 4～5 月齡就應諮詢獸醫評估絕育，以避免意外繁殖與相關健康風險。",
      breedKnowledge: "兔子最早約**3–4 月齡**就可能具有繁殖能力；母兔屬於**刺激性排卵**動物，且**一年可多次**懷孕。\n\n約**4–5 月齡**就應諮詢獸醫評估**絕育**。除了避免意外繁殖，也能降低母兔**子宮腫瘤**風險，並減少**噴尿標記**與部分攻擊行為。",
      correctChoiceIndex: 2,
      correctText: "兔子繁殖力極強，4–5 月齡就應諮詢獸醫評估絕育",
      correctExplanation: "短暫接觸也可能繁殖；及早由獸醫評估絕育是更安全、負責任的安排。",
      correctExpenseIds: ["rabbit-sterilization"],
      distractors: [
        { text: "兔子 5 個月還很小，不用擔心懷孕", explanation: "兔子最早約 3～4 月齡就可能具有繁殖能力。", suggestion: "不要以年紀小為由讓未絕育公母兔接觸。" },
        { text: "玩 30 分鐘不會有事", explanation: "兔子繁殖行為發生很快，短暫接觸也有高風險。", suggestion: "未絕育公母兔不應以短暫接觸作為安全安排。" },
        { text: "公兔不需要絕育，只要母兔絕育就好", explanation: "公兔絕育同樣有助減少標記與部分衝突，也需由獸醫評估。", suggestion: "讓獸醫依個體狀況說明合適的絕育安排。" },
      ],
    },
    {
      title: "兔子可以洗澡嗎？",
      description: "`{petName}` 身上有一點味道，尾巴根部附近也有些髒污。你想幫牠好好清潔。",
      topic: "正確清潔方式（禁止洗澡）",
      reportSummary: "兔子不適合洗澡或使用乾洗粉；日常清潔以規律梳毛及局部微濕擦拭為主。",
      breedKnowledge: "兔子**不能洗澡**；全身弄濕會造成強烈緊迫，甚至可能引發**休克**。\n\n牠們也**不適合使用寵物乾洗粉**。日常以**定期梳毛**為主，局部污漬用**微濕毛巾**輕擦；無法自行處理時，請先**諮詢兔科獸醫**。",
      correctChoiceIndex: 2,
      correctText: "用梳子定期梳毛，局部髒污用稍微濕潤的毛巾輕輕擦拭",
      correctExplanation: "梳毛是兔子的日常護理核心；局部處理即可，避免全身弄濕與吹風造成壓力。",
      distractors: [
        { text: "放進澡盆裡幫牠洗澡，吹乾就好", explanation: "全身弄濕會造成巨大緊迫，吹乾也不能消除風險。", suggestion: "不要替兔子洗澡，改用梳毛與局部微濕擦拭。" },
        { text: "用寵物乾洗粉幫牠清潔", explanation: "兔子不適合使用寵物乾洗粉。", suggestion: "以定期梳毛作為主要清潔方式。" },
        { text: "用吹風機低溫在遠距離幫牠吹乾毛", explanation: "吹風機的聲音與氣流同樣會造成壓力，兔子不需要先弄濕再吹乾。", suggestion: "避免洗澡與吹風，必要時諮詢兔科獸醫。" },
      ],
    },
  ],
};

export function getRabbitBreedChallengeScenarios(_breedId: string) {
  return buildBreedChallengeScenarios(rabbitBreedChallengeContent.rabbit, "rabbit");
}
