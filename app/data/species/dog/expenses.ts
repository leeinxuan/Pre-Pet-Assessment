import type { ExpenseRecord } from "../../../game-types";

/** §7 犬費用清單；金額與費用明細說明均以 dog-game-planning.md 為準。 */
export const dogExpenses: Record<string, ExpenseRecord> = {
  "dog-bed": { id: "dog-bed", name: "睡墊", amount: 1000, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "提供安靜、安全的休息角落；可選擇犬用床或軟墊，依體型選擇適合尺寸" },
  "dog-toy": { id: "dog-toy", name: "玩具", amount: 500, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "提供啃咬與互動的適當出口；選擇不易碎裂、無毒材質，避免誤食" },
  "dog-water-bowl": { id: "dog-water-bowl", name: "水碗", amount: 300, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "隨時保持乾淨飲水；選擇適合體型的碗，不易打翻為佳" },
  "dog-food-bowl": { id: "dog-food-bowl", name: "狗碗", amount: 300, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "固定位置餵食，建立穩定作息；依體型選擇高度適中的食碗" },
  "dog-toilet": { id: "dog-toilet", name: "尿墊", amount: 400, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "協助建立如廁位置，減少環境壓力。" },
  "dog-cleaner": { id: "dog-cleaner", name: "寵物專用清潔用品", amount: 400, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "清潔排泄物，避免殘留氣味引導錯誤如廁行為；需選用對犬無害的成分" },
  "dog-food": { id: "dog-food", name: "飼料", amount: 800, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "依體型與年齡選擇適合的犬用飼料；初期維持原飼料、漸進換食以避免腸胃不適" },
  "carrier-kit": { id: "carrier-kit", name: "運輸籠", amount: 1800, category: "一次性準備費", stage: "出發前準備", recurring: false, fromEmergency: false, description: "安全運送，避免車內跌倒或排泄污染；選擇通風、堅固且尺寸適當的運輸籠。" },
  toilet: { id: "toilet", name: "尿墊", amount: 800, category: "一次性準備費", stage: "出發前準備", recurring: false, fromEmergency: false, description: "接回途中可降低排泄與清潔壓力。" },
  "water-kit": { id: "water-kit", name: "水碗（外出用）", amount: 250, category: "一次性準備費", stage: "出發前準備", recurring: false, fromEmergency: false, description: "路程中保持水分供應；折疊式水碗方便攜帶" },
  "dog-leash": { id: "dog-leash", name: "牽繩", amount: 600, category: "一次性準備費", stage: "出發前準備", recurring: false, fromEmergency: false, description: "移動安全必備；選擇適合體型的牽繩長度與扣環強度" },
  "dog-cleaner-kit": { id: "dog-cleaner-kit", name: "外出清潔組", amount: 250, category: "一次性準備費", stage: "出發前準備", recurring: false, fromEmergency: false, description: "路程中若發生排泄可即時清理；公共場所清潔為基本禮儀與法規義務" },
  "dog-arrival-checkup": { id: "dog-arrival-checkup", name: "到家後首次健康檢查", amount: 2000, category: "到家後必要支出", stage: "寵物到家後", recurring: false, fromEmergency: false, description: "到家後盡快安排，建立健康基準，確認整體狀態" },
  "dog-microchip": { id: "dog-microchip", name: "晶片植入與寵物登記", amount: 1500, category: "到家後必要支出", stage: "寵物到家後", recurring: false, fromEmergency: false, description: "台灣法規要求犬隻植入晶片並完成寵物登記；部分地方政府可免費辦理，詳洽所在縣市動保處" },
  "dog-rabies-vaccine": { id: "dog-rabies-vaccine", name: "狂犬病疫苗", amount: 600, category: "到家後必要支出", stage: "寵物到家後", recurring: false, fromEmergency: false, description: "台灣法規要求犬隻每年施打狂犬病疫苗；初次到家後應確認接種狀態並補打" },
  "dog-sterilization": { id: "dog-sterilization", name: "絕育手術費用（公）", amount: 6000, category: "到家後必要支出", stage: "寵物到家後", recurring: false, fromEmergency: false, description: "台灣法規規定無繁殖計畫犬隻應絕育；可預防多種生殖系統疾病、減少發情期行為問題；母犬費用較高，約 5,000–15,000 元（依體型差異大）" },
  "dog-food-monthly": { id: "dog-food-monthly", name: "每月飼料費", amount: 2500, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "依體型與年齡選擇乾飼料、濕食或混合；不可給予巧克力、洋蔥、葡萄等有毒食物" },
  "dog-clean-monthly": { id: "dog-clean-monthly", name: "每月清潔耗材費", amount: 1200, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "清潔耗材（尿墊、洗毛精、撿便袋）需定期補充" },
  "dog-mild-sick": { id: "dog-mild-sick", name: "輕症就診（感冒／輕度腹瀉）", amount: 600, maxAmount: 1700, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "一般門診含診察與短期藥費；皮膚搔癢、輕微腹瀉等症狀輕微" },
  "dog-moderate-sick": { id: "dog-moderate-sick", name: "急症檢查（嘔吐不吃／精神極差）", amount: 1400, maxAmount: 4600, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "血液常規或影像檢查與藥費；食慾或精神明顯下降" },
  "dog-hospitalization": { id: "dog-hospitalization", name: "住院與手術費用", amount: 4000, maxAmount: 40000, maxAmountOpenEnded: true, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "含麻醉、住院護理與手術費；需住院觀察、靜脈輸液或手術" },
  "dog-senior-room": { id: "dog-senior-room", name: "高齡環境調整用品", amount: 800, maxAmount: 2500, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: false, description: "降低障礙物高度、提供防滑地墊、增加保暖設備；高齡犬行動退化需調整生活環境" },
};
