import { buildBreedChallengeScenarios, type BreedChallengeQuestion } from "../../shared/breed-challenges";

export const catBreedChallengeContent: Record<string, BreedChallengeQuestion[]> = {
  "orange-cat": [
    {
      title: "撒嬌也需要合適的遊戲",
      description: "橘貓很親人，常主動靠近討摸、討玩，也會在無聊時一直討食。你會怎麼安排牠的精力與互動？",
      topic: "貓咪精力與獵捕需求",
      reportSummary: "橘貓親人愛互動時，也需要規律遊戲與環境豐富化，避免用加餐取代活動需求。",
      breedKnowledge: "親人與撒嬌不代表每次靠近都是餓了。規律互動遊戲、安全玩具與益智漏食玩具，可以讓貓咪用更健康的方式消耗精力。",
      correctChoiceIndex: 1,
      correctText: "每天安排逗貓棒等互動遊戲，不用手腳逗弄，並提供安全玩具與益智漏食玩具",
      correctExplanation: "規律遊戲能滿足獵捕與互動需求，也避免把無聊或撒嬌都用食物回應。",
      distractors: [
        { text: "牠撒嬌就先餵零食，吃飽自然會安靜", explanation: "把互動需求都用食物回應，可能造成過度進食，也沒有真正滿足活動需求。", suggestion: "先用短段遊戲、撫摸界線與益智玩具回應，再依固定份量餵食。" },
        { text: "用手腳逗牠撲咬，牠會比較有互動感", explanation: "用手腳逗弄可能讓貓咪把人的身體當成獵物。", suggestion: "改用逗貓棒或安全玩具，讓牠追逐可捕捉的物件。" },
        { text: "買很多玩具散在地上，牠想玩就自己玩", explanation: "玩具若沒有輪替、檢查或陪玩，可能很快失去吸引力，也可能留下誤食風險。", suggestion: "安排固定陪玩時間，並在結束後收好線狀玩具。" },
      ],
    },
    {
      title: "舒服生活也需要安全高處",
      description: "橘貓常待在沙發旁邊，也喜歡找安靜角落休息。你想讓牠不無聊，又能安全活動。你會怎麼做？",
      topic: "貓咪垂直空間與安全環境",
      reportSummary: "橘貓需要安全高處、休息空間與穩固門窗，避免因環境單調而長時間無聊或冒險攀爬。",
      breedKnowledge: "貓咪需要能觀察環境的高處，也需要可安靜休息的地方。高處必須穩固，門窗與紗窗也要先確認安全。",
      correctChoiceIndex: 3,
      correctText: "提供穩固貓跳台或層架、安靜休息處，並確認門窗與紗窗穩固",
      correctExplanation: "安全高處與休息空間能讓牠活動、觀察與退回，不必靠危險攀爬或長時間無聊來打發生活。",
      distractors: [
        { text: "只放一個軟墊就好，高處容易弄亂不用準備", explanation: "只有睡覺位置可能不足以滿足觀察、活動與安全感需求。", suggestion: "準備穩固高處與可退回的休息點，並整理危險物。" },
        { text: "讓牠自己爬窗簾和衣櫃，貓咪很會平衡", explanation: "窗簾、衣櫃與未固定高處可能造成跌落、夾傷或逃脫風險。", suggestion: "提供可承重的跳台或層架，並確認門窗防護。" },
        { text: "牠無聊就多餵一點，環境不用特別改", explanation: "食物不能取代活動與環境豐富化，也可能增加體重負擔。", suggestion: "用安全高處、抓板與玩具提供日常活動。" },
      ],
    },
    {
      title: "討食時也要管理體重",
      description: "橘貓常在餐桌旁討食，甚至想翻垃圾桶。家人覺得牠可愛，想持續加餐。你會怎麼做？",
      topic: "貓咪飲食與體重管理",
      reportSummary: "橘貓討食或翻找食物時，應定時定量、收好食物與垃圾，搭配益智漏食玩具並觀察體態。",
      breedKnowledge: "討食不一定代表營養不足。定時定量、家庭餵食紀錄與體態觀察，能降低過度進食與慢性病風險。",
      correctChoiceIndex: 2,
      correctText: "定時定量餵食，收好食物與垃圾，搭配益智漏食玩具並定期觀察體態",
      correctExplanation: "固定份量和環境管理能降低偷吃與翻垃圾桶風險，益智漏食玩具則能讓進食變成安全活動。",
      distractors: [
        { text: "牠討食很可愛，每次靠近都加一點", explanation: "持續加餐會讓熱量難以掌握，增加變胖和健康風險。", suggestion: "把零食納入每日總量，並用遊戲或撫摸回應互動需求。" },
        { text: "垃圾桶不用特別收，牠吃到就當作加菜", explanation: "垃圾桶可能有調味、尖銳包材或不適合貓咪的食物。", suggestion: "把食物和垃圾確實收好，避免誤食。" },
        { text: "活動量看起來正常，所以可以無限制任食", explanation: "活動量高低仍需要搭配年齡、體態與食量管理，不能直接無限制餵食。", suggestion: "依體態與獸醫建議調整份量，定期記錄變化。" },
      ],
    },
  ],
  "tabby-cat": [
    {
      title: "半夜的獵捕開關",
      description: "虎斑貓白天沒怎麼活動，半夜開始奔跑、飛撲，還把家人的手腳當成獵物。你會怎麼安排？",
      topic: "貓咪精力與獵捕需求",
      reportSummary: "虎斑貓精力未滿足時，可能夜間奔跑或撲咬手腳；應用規律互動遊戲與安全玩具提供出口。",
      breedKnowledge: "虎斑花紋不代表固定個性，但許多貓都需要獵捕式互動。逗貓棒、球與可捕捉玩具能讓牠追逐、撲抓與收尾。",
      correctChoiceIndex: 2,
      correctText: "安排規律逗貓棒遊戲，不用手腳逗弄，提供安全玩具讓牠消耗精力",
      correctExplanation: "可捕捉的互動遊戲能滿足獵捕需求，也能避免牠把人的手腳當成玩具。",
      distractors: [
        { text: "用手繼續逗牠，咬久就會知道力道", explanation: "用手腳逗弄可能強化撲咬人的習慣。", suggestion: "改用逗貓棒或其他安全玩具，把攻擊目標轉到玩具上。" },
        { text: "牠半夜跑就關起來，明天自然會累", explanation: "只限制活動未必處理精力與獵捕需求，也可能增加壓力。", suggestion: "白天和睡前安排短段互動遊戲，並保留休息節奏。" },
        { text: "讓牠自己追線或橡皮筋，反正會消耗精力", explanation: "線狀物和小物可能被吞食，無人看顧時風險更高。", suggestion: "使用結構安全的玩具，結束後收好。" },
      ],
    },
    {
      title: "想往高處探索",
      description: "虎斑貓常想跳上窗簾、衣櫃或較高的家具。你擔心牠受傷，也擔心紗窗不夠穩。你會怎麼做？",
      topic: "貓咪垂直空間與安全環境",
      reportSummary: "虎斑貓需要安全垂直空間；若沒有合適高處，可能攀爬窗簾、衣櫃或其他危險位置。",
      breedKnowledge: "垂直空間可以讓貓咪觀察、活動與保有安全感，但高處與門窗必須穩固，不能讓危險位置成為唯一選擇。",
      correctChoiceIndex: 1,
      correctText: "提供貓跳台、層架或安全高處，並確認門窗與紗窗穩固",
      correctExplanation: "把可攀爬路線設計成安全、穩固且可預期，能降低牠往窗簾或危險高處探索的機會。",
      distractors: [
        { text: "牠想爬就讓牠爬，貓咪通常很會落地", explanation: "窗簾、衣櫃或未固定家具仍可能造成受傷、掉落或逃脫風險。", suggestion: "先準備穩固跳台與層架，並檢查門窗安全。" },
        { text: "完全禁止所有高處，牠就不會出事", explanation: "完全禁止可能讓牠缺少觀察與活動出口，反而更想探索危險位置。", suggestion: "提供安全高處，再移除或阻隔危險路線。" },
        { text: "只在窗邊放椅子，不用確認紗窗", explanation: "窗邊高處若沒有穩固紗窗與防護，仍可能有逃脫或墜落風險。", suggestion: "窗邊活動區要搭配穩固防護。" },
      ],
    },
    {
      title: "活動量高也不能無限制吃",
      description: "虎斑貓每天都很會玩，家人覺得牠活動量大，可以一直放滿飼料讓牠自己吃。你會怎麼安排？",
      topic: "貓咪飲食與體重管理",
      reportSummary: "虎斑貓活動量高仍需依年齡、體態與食量安排定時定量，並用益智漏食玩具與觀察紀錄協助管理。",
      breedKnowledge: "活動量高不等於可以無限制任食。飲食仍要依年齡、體態、健康與食慾變化調整。",
      correctChoiceIndex: 3,
      correctText: "依年齡、體態與食量定時定量，收好食物與垃圾，搭配益智漏食玩具並觀察體態",
      correctExplanation: "定時定量能掌握食慾與體態，收好食物與垃圾能避免誤食，益智漏食玩具則能讓進食和活動更安全。",
      distractors: [
        { text: "牠很會跑，所以飼料全天放滿沒關係", explanation: "活動量高仍可能吃過量，也會讓食慾變化不容易被發現。", suggestion: "先建立份量與餵食時間，再依體態調整。" },
        { text: "把人類食物當獎勵，牠玩得多可以吃一點", explanation: "人類食物不一定適合貓咪，調味或特定食材可能造成風險。", suggestion: "不確定食材安全時，查詢可靠資料或詢問獸醫。" },
        { text: "只要牠不胖，就不用記錄吃多少", explanation: "食量變化也是健康線索，不只是在控制體重。", suggestion: "簡單記錄主食、零食與體態變化。" },
      ],
    },
  ],
};

export function getCatBreedChallengeScenarios(breedId: string) {
  const questions = catBreedChallengeContent[breedId] ?? catBreedChallengeContent["orange-cat"] ;
  return buildBreedChallengeScenarios(questions, catBreedChallengeContent[breedId] ? breedId : "orange-cat");
}

