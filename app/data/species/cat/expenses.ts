import type { ExpenseRecord } from "../../../game-types";

/** 貓流程的費用清單；共用 ID 仍保有貓咪自己的說明。 */
export const catExpenses: Record<string, ExpenseRecord> = {
  "food-bowl": { id: "food-bowl", name: "食碗", amount: 350, category: "用品", stage: "領養前準備", recurring: false, description: "固定位置餵食，建立穩定作息；寬口、深度淺的碗減少貓鬚不適。" },
  "water-bowl": { id: "water-bowl", name: "水碗", amount: 350, category: "用品", stage: "領養前準備", recurring: false, description: "遠離食盆放置；部分貓偏好流動水，可搭配飲水機。" },
  toilet: { id: "toilet", name: "尿墊或便盆", amount: 500, category: "清潔", stage: "領養前準備", recurring: false, description: "途中防止意外弄髒外出籠；選擇吸水性佳、不易移位的款式" },
  "microchip-registration": { id: "microchip-registration", name: "晶片植入與寵物登記", amount: 1000, category: "到家後必要支出", stage: "寵物到家後", recurring: false, description: "台灣法規要求貓咪植入晶片並完成寵物登記；部分地方政府可免費辦理，詳洽所在縣市動保處。" },
  "rabies-vaccine": { id: "rabies-vaccine", name: "狂犬病疫苗", amount: 400, category: "到家後必要支出", stage: "寵物到家後", recurring: false, description: "台灣法規要求貓咪每年施打狂犬病疫苗；到家後應確認接種狀態並補打。" },
  "basic-vaccine-checkup": { id: "basic-vaccine-checkup", name: "基礎疫苗與初期健康檢查", amount: 3500, category: "到家後必要支出", stage: "寵物到家後", recurring: false, description: "到家後盡快安排，確認整體狀態與驅蟲需求；米克斯建議加做 FeLV／FIV 篩檢。" },
  "sick-vet-care": { id: "sick-vet-care", name: "生病就醫與檢查", amount: 4200, category: "醫療", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "食慾、飲水、尿便、活動量或躲藏異常時須就醫。" },
  "senior-checkup": { id: "senior-checkup", name: "高齡定期健康檢查", amount: 2500, category: "醫療", stage: "逐漸進入高齡", recurring: false, fromEmergency: true, description: "高齡貓應提高健檢頻率（每半年一次）；體重、飲水、如廁、活動量及精神狀況定期評估。" },
  "cat-sterilization": { id: "cat-sterilization", name: "絕育手術費用", amount: 3500, category: "到家後必要支出", stage: "寵物到家後", recurring: false, description: "無繁殖計畫強烈建議絕育；可預防子宮蓄膿、乳腺腫瘤等疾病，並大幅減少發情嚎叫與外出衝動；費用依性別而異。" },
  "cat-hide-box": { id: "cat-hide-box", name: "躲藏紙箱", amount: 120, category: "用品", stage: "飼養前準備", recurring: false, description: "新到家貓咪需要可退避的安全角落；貓屋或有蓋的紙箱均可。" },
  "cat-safe-window": { id: "cat-safe-window", name: "門窗與紗窗安全防護", amount: 900, category: "用品", stage: "飼養前準備", recurring: false },
  "cat-rest-bed": { id: "cat-rest-bed", name: "貓咪休息空間", amount: 900, category: "用品", stage: "飼養前準備", recurring: false, description: "提供溫暖舒適的休息處；可選擇可拆洗款式。" },
  "cat-litter-box": { id: "cat-litter-box", name: "貓砂盆", amount: 700, category: "清潔", stage: "飼養前準備", recurring: false, description: "建議每隻貓至少一個砂盆；選擇入口低、尺寸足夠的款式；提供不同類型貓砂供貓選擇。" },
  "cat-litter": { id: "cat-litter", name: "貓砂", amount: 500, category: "每月基本支出", stage: "日常照護", recurring: true, description: "貓砂盆每天清潔、定期全換砂；貓砂選擇需考量貓的偏好與飼主打掃便利性。" },
  "cat-scratcher": { id: "cat-scratcher", name: "抓板", amount: 350, category: "用品", stage: "飼養前準備", recurring: false, description: "提供合法磨爪出口，減少抓沙發行為；選擇穩固、高度適合的款式。" },
  "cat-tree": { id: "cat-tree", name: "跳台", amount: 1800, category: "用品", stage: "飼養前準備", recurring: false, description: "垂直空間能讓貓咪觀察環境、活動與保有安全距離。" },
  "cat-safe-toy": { id: "cat-safe-toy", name: "安全玩具", amount: 300, category: "用品", stage: "飼養前準備", recurring: false, description: "選擇不易吞食、可收納的安全玩具，互動後也要整理。" },
  "cat-monthly-food": { id: "cat-monthly-food", name: "每月貓主食費", amount: 1300, category: "每月基本支出", stage: "日常照護", recurring: true, description: "乾飼料為主、濕食（罐頭）為輔；不可給予巧克力、洋蔥、葡萄等有毒食物；依體重與年齡調整份量。" },
  "cat-carrier": { id: "cat-carrier", name: "貓用外出籠", amount: 1200, category: "用品", stage: "飼養前準備", recurring: false, description: "安全運送貓咪的必要設備；選擇通風、有頂蓋、開口足夠的款式；平時可放置家中讓貓習慣。" },
  "cat-senior-room": { id: "cat-senior-room", name: "高齡貓環境調整用品", amount: 1500, category: "高齡用品", stage: "逐漸進入高齡", recurring: false, description: "低入口砂盆、地墊、階梯式設施與保暖休息處；高齡貓跳躍能力下降需調整生活環境。" },
  "cat-mild-sick": { id: "cat-mild-sick", name: "輕症就診（感冒／輕度腹瀉）", amount: 1200, category: "臨時／醫療支出", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "掛號費 + 診察費 + 3–5 天藥費；輕微呼吸道症狀、輕度消化問題等症狀輕微未達抽血標準。" },
  "cat-moderate-sick": { id: "cat-moderate-sick", name: "急症檢查（嘔吐不吃／精神極差）", amount: 3500, category: "臨時／醫療支出", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "掛號費 + 血液檢查 + X 光 + 藥費；嘔吐不吃、精神萎靡、排尿異常等明顯症狀需確認病因；公貓尿道阻塞為急症需立即就醫。" },
  "cat-hospitalization": { id: "cat-hospitalization", name: "住院與手術費用", amount: 12000, category: "臨時／醫療支出", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "需住院觀察、手術或長期治療（如 HCM 心臟病、尿道阻塞術後、子宮蓄膿）；費用依病因與住院天數差異極大。" },
};
