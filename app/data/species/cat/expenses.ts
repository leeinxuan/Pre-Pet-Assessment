import type { ExpenseRecord, SpeciesExpenseRules } from "../../../game-types";

/** §7 貓費用清單；金額與費用明細說明均以 cat-game-planning.md 為準。 */
export const catExpenses: Record<string, ExpenseRecord> = {
  "cat-safe-window": { id: "cat-safe-window", name: "門窗與紗窗安全防護", amount: 1500, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false },
  "cat-litter-box": { id: "cat-litter-box", name: "貓砂盆與貓砂（初期）", amount: 1200, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false },
  "cat-food-bowl": { id: "cat-food-bowl", name: "食盆", amount: 300, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false },
  "cat-water-bowl": { id: "cat-water-bowl", name: "水碗", amount: 300, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false },
  "cat-scratcher": { id: "cat-scratcher", name: "抓板", amount: 800, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false },
  "cat-tree": { id: "cat-tree", name: "跳台", amount: 3500, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false },
  "cat-hiding-space": { id: "cat-hiding-space", name: "安全躲藏空間（紙箱或貓屋）", amount: 600, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false },
  "cat-rest-bed": { id: "cat-rest-bed", name: "日常休息空間（貓床或軟墊）", amount: 800, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false },
  "cat-safe-toy": { id: "cat-safe-toy", name: "安全玩具", amount: 600, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false },
  "cat-carrier": { id: "cat-carrier", name: "外出籠", amount: 1500, category: "一次性準備費", stage: "出發前準備", recurring: false, fromEmergency: false },
  "cat-carrier-pad": { id: "cat-carrier-pad", name: "尿墊（外出用）", amount: 250, category: "一次性準備費", stage: "出發前準備", recurring: false, fromEmergency: false },
  "cat-water-kit": { id: "cat-water-kit", name: "外出用水碗＋飲水", amount: 250, category: "一次性準備費", stage: "出發前準備", recurring: false, fromEmergency: false },
  "cat-cleaner-kit": { id: "cat-cleaner-kit", name: "外出清潔組（濕紙巾）", amount: 150, category: "一次性準備費", stage: "出發前準備", recurring: false, fromEmergency: false },
  "cat-arrival-checkup": { id: "cat-arrival-checkup", name: "到家後首次健康檢查", amount: 2000, showPlusSuffix: true, category: "到家後必要支出", stage: "寵物到家後", recurring: false, fromEmergency: false, description: "到家後盡快安排，確認整體狀態與驅蟲需求；" },
  "cat-microchip": { id: "cat-microchip", name: "晶片植入與寵物登記", amount: 1500, category: "到家後必要支出", stage: "寵物到家後", recurring: false, fromEmergency: false, description: "台灣法規要求貓咪植入晶片並完成寵物登記；**規費金額，請以所在縣市（動保處或防疫所）最新規費公告為準**" },
  "cat-rabies-vaccine": { id: "cat-rabies-vaccine", name: "狂犬病疫苗", amount: 600, category: "到家後必要支出", stage: "寵物到家後", recurring: false, fromEmergency: false, description: "台灣法規要求貓咪每年施打狂犬病疫苗；到家後應確認接種狀態並補打；**規費金額，請以所在縣市（動保處或防疫所）最新規費公告為準**" },
  "cat-sterilization": { id: "cat-sterilization", name: "絕育手術費用（公）", amount: 3500, category: "到家後必要支出", stage: "寵物到家後", recurring: false, fromEmergency: false, description: "台灣法規規定無繁殖計畫貓咪應絕育；可預防多種生殖系統疾病，並大幅減少發情嚎叫；母貓費用較高，約 3,000–6,000 元" },
  "cat-food-monthly": { id: "cat-food-monthly", name: "每月飼料費（主食）", amount: 1800, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "乾飼料為主、濕食（罐頭）為輔；不可給予巧克力、洋蔥、葡萄等有毒食物；依體重與年齡調整份量" },
  "cat-litter-monthly": { id: "cat-litter-monthly", name: "每月貓砂費", amount: 700, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "維持足夠砂量並每天清理，才能觀察排泄與降低壓力。" },
  "cat-mild-sick": { id: "cat-mild-sick", name: "輕症就診（感冒／輕度腹瀉）", amount: 600, maxAmount: 1700, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "一般門診含診察與短期藥費；輕微呼吸道症狀、輕度消化問題等症狀未達抽血標準" },
  "cat-moderate-sick": { id: "cat-moderate-sick", name: "急症檢查（嘔吐不吃／精神極差）", amount: 1400, maxAmount: 4600, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "門診含血液常規或影像檢查與藥費；嘔吐不吃、精神萎靡；公貓尿道阻塞需立即就醫" },
  "cat-hospitalization": { id: "cat-hospitalization", name: "住院與手術費用", amount: 4000, maxAmount: 40000, maxAmountOpenEnded: true, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "含麻醉、住院護理與手術費；需住院觀察或手術（如 HCM、尿道阻塞術後、子宮蓄膿）" },
  "cat-senior-room": { id: "cat-senior-room", name: "高齡環境調整用品", amount: 800, maxAmount: 2500, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: false, description: "低入口砂盆、地墊、階梯式設施與保暖休息處；高齡貓跳躍能力下降需調整生活環境" },
};

/** 費用流程規則；ID 只引用本物種費用。 */
export const catExpenseRules: SpeciesExpenseRules = {
  // 貓砂在房間佈置時已登錄。
  arrivalMealExcludedExpenseIds: ["cat-litter-monthly"],
};
