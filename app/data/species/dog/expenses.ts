import type { ExpenseRecord, SpeciesExpenseRules } from "../../../game-types";

/** §7 犬費用清單；金額與費用明細說明均以 dog-game-planning.md 為準。 */
export const dogExpenses: Record<string, ExpenseRecord> = {
  "dog-bed": { id: "dog-bed", name: "睡墊", amount: 1000, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false },
  "dog-toy": { id: "dog-toy", name: "玩具", amount: 500, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false },
  "dog-water-bowl": { id: "dog-water-bowl", name: "水碗", amount: 300, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false },
  "dog-food-bowl": { id: "dog-food-bowl", name: "狗碗", amount: 300, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false },
  "dog-toilet": { id: "dog-toilet", name: "尿墊", amount: 400, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false },
  "dog-cleaner": { id: "dog-cleaner", name: "寵物專用清潔用品", amount: 400, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false },
  "dog-food": { id: "dog-food", name: "飼料", amount: 800, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false },
  "carrier-kit": { id: "carrier-kit", name: "運輸籠", amount: 1800, category: "一次性準備費", stage: "出發前準備", recurring: false, fromEmergency: false },
  toilet: { id: "toilet", name: "尿墊", amount: 800, category: "一次性準備費", stage: "出發前準備", recurring: false, fromEmergency: false },
  "water-kit": { id: "water-kit", name: "水碗（外出用）", amount: 250, category: "一次性準備費", stage: "出發前準備", recurring: false, fromEmergency: false },
  "dog-leash": { id: "dog-leash", name: "牽繩", amount: 600, category: "一次性準備費", stage: "出發前準備", recurring: false, fromEmergency: false },
  "dog-cleaner-kit": { id: "dog-cleaner-kit", name: "外出清潔組", amount: 250, category: "一次性準備費", stage: "出發前準備", recurring: false, fromEmergency: false },
  "dog-arrival-checkup": { id: "dog-arrival-checkup", name: "到家後首次健康檢查", amount: 2000, showPlusSuffix: true, category: "到家後必要支出", stage: "寵物到家後", recurring: false, fromEmergency: false, description: "到家後盡快安排，建立健康基準，確認整體狀態" },
  "dog-microchip": { id: "dog-microchip", name: "晶片植入與寵物登記", amount: 1500, category: "到家後必要支出", stage: "寵物到家後", recurring: false, fromEmergency: false, description: "台灣法規要求犬隻植入晶片並完成寵物登記；**規費金額，請以所在縣市（動保處或防疫所）最新規費公告為準**" },
  "dog-rabies-vaccine": { id: "dog-rabies-vaccine", name: "狂犬病疫苗", amount: 600, category: "到家後必要支出", stage: "寵物到家後", recurring: false, fromEmergency: false, description: "台灣法規要求犬隻每年施打狂犬病疫苗；初次到家後應確認接種狀態並補打。**規費金額，請以所在縣市（動保處或防疫所）最新規費公告為準**" },
  "dog-sterilization": { id: "dog-sterilization", name: "絕育手術費用（公）", amount: 6000, category: "到家後必要支出", stage: "寵物到家後", recurring: false, fromEmergency: false, description: "台灣法規規定無繁殖計畫犬隻應絕育；可預防多種生殖系統疾病、減少發情期行為問題；母犬費用較高，約 5,000–15,000 元（依體型差異大）" },
  "dog-food-monthly": { id: "dog-food-monthly", name: "每月飼料費", amount: 2500, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "依體型與年齡選擇乾飼料、濕食或混合；不可給予巧克力、洋蔥、葡萄等有毒食物" },
  "dog-clean-monthly": { id: "dog-clean-monthly", name: "每月清潔耗材費", amount: 1200, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "清潔耗材（尿墊、洗毛精、撿便袋等）需定期補充" },
  "dog-mild-sick": { id: "dog-mild-sick", name: "輕症就診（感冒／輕度腹瀉）", amount: 600, maxAmount: 1700, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "一般門診含診察與短期藥費；皮膚搔癢、輕微腹瀉等症狀輕微" },
  "dog-moderate-sick": { id: "dog-moderate-sick", name: "急症檢查（嘔吐不吃／精神極差）", amount: 1400, maxAmount: 4600, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "血液常規或影像檢查與藥費；食慾或精神明顯下降" },
  "dog-hospitalization": { id: "dog-hospitalization", name: "住院與手術費用", amount: 4000, maxAmount: 40000, maxAmountOpenEnded: true, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "含麻醉、住院護理與手術費；需住院觀察、靜脈輸液或手術" },
  "dog-senior-room": { id: "dog-senior-room", name: "高齡環境調整用品", amount: 800, maxAmount: 2500, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: false, description: "降低障礙物高度、提供防滑地墊、增加保暖設備；高齡犬行動退化需調整生活環境" },
};

/** 費用流程規則；ID 只引用本物種費用。 */
export const dogExpenseRules: SpeciesExpenseRules = {
  // 狗狗清潔耗材在散步前選取撿便袋時加入，不能跟第一餐一起觸發。
  arrivalMealExcludedExpenseIds: ["dog-clean-monthly"],
  walkingExpenseIds: ["dog-clean-monthly"],
};
