export const hamsterFirstMeal = {
  title: "{petName} 的第一餐，你準備了什麼？",
  items: [
    { id: "hamster-pellet", label: "倉鼠專用綜合飼料（定量）", result: "correct", feedback: "✅ 正確！倉鼠需要均衡的綜合飼料；每天固定餵食量，不要因為「碗空了」就補充，因為牠可能把食物藏進頰囊或巢穴了。", expenseIds: ["hamster-pellet-monthly"] },
    { id: "fresh-water", label: "乾淨飲水（飲水器）", result: "correct", feedback: "✅ 必要！每天確認飲水器正常出水，並提供乾淨飲水。" },
    { id: "sunflower-seeds", label: "葵瓜子（一大把）", result: "caution", feedback: "▲ 少量可以，但不能當主食！倉鼠特別喜歡葵瓜子，但容易只吃這個忽略其他成分，造成挑食和營養不均。每天固定少量作為點心即可，不可讓牠想吃多少就吃多少。" },
    { id: "onion", label: "洋蔥", result: "incorrect", feedback: "❌ 有毒！蔥、蒜、洋蔥對倉鼠有毒，絕對不可餵食。廚房常見食材，請務必放置在{petName}無法取得的地方。" },
    { id: "citrus-fruit", label: "柑橘類水果", result: "incorrect", feedback: "❌ 不適合！柑橘類水果的酸性可能刺激倉鼠消化道，不建議餵食。水果類食物整體須謹慎，含糖量高的種類尤其要避免或極少量給予。" },
  ],
} as const;

export type InspectionState = "normal" | "warning";

export const hamsterMorningCheck = {
  introTitle: "早晨巡視——每天替 {petName} 確認一次",
  introParagraphs: [
    "倉鼠是夜行性動物，牠最活躍的時候是你熟睡的時候。等你早上醒來，就是一天一次確認{petName}一切安好的最佳時機。",
    "倉鼠隱藏病痛的能力不輸鳥類——看起來縮著睡覺很正常，但食量的細微變化、砂浴盆的使用情況、滾輪是否有轉動痕跡，這些才是你真正需要每天確認的事情。",
    "砂浴是{petName}維持毛髮健康的方式，定期篩除結塊的沙是你的日常任務。飲水器的出水是否順暢、食碗的情況如何，也是每天不能漏掉的巡視項目。",
  ],
  startLabel: "開始早晨巡視 →",
  steps: [
    { id: "water", label: "飲水器確認", question: "{petName} 的飲水器狀態如何？", visual: { normal: "吸管頭有水珠附著，出水正常", warning: "吸管頭乾燥無水珠，長時間水位未下降" }, options: [{ id: "normal", label: "出水正常，繼續觀察" }, { id: "warning", label: "吸管異常，需要確認" }], feedback: { normal: { correct: "✅ 飲水器出水正常！每天早晨確認吸管頭是否有水珠，是避免 {petName} 缺水最快速的方式。", incorrect: "飲水器今天是正常的，吸管頭有水珠附著代表出水沒問題。繼續每天早晨確認這個細節就好。" }, warning: { correct: "✅ 你發現了！吸管乾燥可能是堵塞或水已用盡——倉鼠體型小，缺水幾小時就可能出問題。請立刻輕壓吸管確認，並補充水量或更換飲水器。", incorrect: "仔細看——吸管頭是乾的，長時間沒有水珠出現。倉鼠對缺水非常敏感，請立刻確認是否正常出水，並確保水量充足。" } } },
    { id: "food", label: "食碗進食情況", question: "{petName} 昨晚的飲食情況如何？", visual: { normal: "食碗幾乎空了（正常：倉鼠已吃或已囤入巢穴）", warning: "食碗完全未動，昨天的食物依然完整保留" }, options: [{ id: "normal", label: "看起來有正常進食，繼續觀察" }, { id: "warning", label: "食量異常，需要留意" }], feedback: { normal: { correct: "✅ 正確！{petName} 有正常進食的跡象。記得食碗空了不一定代表吃完——可能是囤進巢穴了；固定份量餵食，不要因為食碗空了就額外補充。", incorrect: "其實{petName}今天的食碗是正常的。倉鼠有囤食習性，食碗空了可能是塞入頰囊帶走了，不一定是吃光了；繼續固定量餵食，觀察連續幾天的趨勢。" }, warning: { correct: "✅ 正確！{petName} 的食碗完全未動，這是需要關注的訊號。若連續兩天以上食量明顯下降，加上精神不振，請盡快諮詢獸醫師。", incorrect: "仔細看——{petName} 的食碗完全沒動，昨晚的食物原封未動。連續的食量明顯下降可能表示健康問題，請持續觀察並記錄，若持續兩天以上就諮詢獸醫師。" } } },
    { id: "wheel", label: "滾輪狀態", question: "{petName} 的滾輪狀態如何？", visual: { normal: "滾輪固定、看起來潔淨", warning: "滾輪傾斜、表面有大量污物" }, options: [{ id: "normal", label: "滾輪固定、看起來潔淨" }, { id: "warning", label: "滾輪傾斜、表面有大量污物" }], feedback: { normal: { correct: "✅ 滾輪狀態良好！定期確認滾輪是否順暢轉動、有無異音，並定期清潔——滾輪是{petName}最重要的日常活動設施。", incorrect: "其實{petName}的滾輪今天狀態是正常的。保持定期清潔的習慣，確認底部無髒污、轉動順暢，就能讓{petName}放心奔跑。" }, warning: { correct: "✅ 你發現了！滾輪傾斜或大量污物都需要處理——傾斜可能導致運動傷害，污物則影響衛生。請立刻調整固定並清潔。", incorrect: "仔細看——滾輪的狀態需要調整。傾斜的滾輪讓倉鼠跑步時身體姿勢不正確，可能造成傷害；請固定好並清潔後再讓{petName}使用。" } } },
    { id: "sleep", label: "睡眠狀態", question: "{petName} 現在的睡眠狀態如何？", visual: { normal: "縮成圓球形，自然睡姿", warning: "身體攤平、側倒、或有明顯顫抖" }, options: [{ id: "normal", label: "縮成圓球形，自然睡姿" }, { id: "warning", label: "身體攤平、側倒、或有明顯顫抖" }], feedback: { normal: { correct: "✅ 縮成球形是倉鼠自然的睡姿，牠在保持體溫的同時感到安全和放鬆——一切正常。", incorrect: "縮成球形其實是倉鼠最放鬆的睡姿，不需要擔心。牠透過縮緊身體維持體溫，這是完全正常的表現。" }, warning: { correct: "✅ 你注意到了異狀！身體攤平側倒或有顫抖是不正常的表現——可能是體溫過低、過熱或身體不適的訊號，請盡快諮詢獸醫師。", incorrect: "仔細看——{petName}的姿勢有些不尋常。身體攤平側倒不是正常睡姿，可能表示身體不適；請先確認環境溫度是否適當，並密切觀察，若沒有改善請就醫。" } } },
  ],
  completion: {
    title: "早晨巡視完成！{petName} 的小小家整理好了",
    subtitle: "你確認了飲水器、食碗進食情況、滾輪狀態，還觀察了{petName}的睡眠狀態。",
    description: "倉鼠的健康很難從外表立刻看出來——每天早晨的這幾個觀察步驟，是你最能掌握{petName}狀況的機會窗口。",
    reflectionTitle: "每次巡視，都是和 {petName} 的一次無聲對話",
    reflection: "倉鼠不像貓狗會叫你，牠的狀態藏在飲水器的水珠、食碗的細節和滾輪的使用痕跡裡。每天早晨花幾分鐘確認這些，是新手飼主最快建立觀察習慣的方式。",
    careTitle: "每天留給牠的照護時間",
    continueLabel: "繼續生活旅程 →",
  },
} as const;
