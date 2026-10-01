import type { ExpenseRecord } from "../../game-types";
import { dogBreeds } from "../species/dog/selection";
import { catBreeds } from "../species/cat/selection";

/** 共用金額格式與費用計算資料。 */
export const money = new Intl.NumberFormat("zh-TW");

const breeds = [...dogBreeds, ...catBreeds];

export type PetSize = "small" | "medium" | "large";

export const sizeBasedCosts: Record<PetSize, {
  monthlyFood: number;
  monthlyWasteBags: number;
  monthlyPreventiveMedicine: number;
  carrier: number;
  leash: number;
  bed: number;
  seniorSupplies: number;
}> = {
  small: { monthlyFood: 800, monthlyWasteBags: 150, monthlyPreventiveMedicine: 600, carrier: 900, leash: 700, bed: 700, seniorSupplies: 1000 },
  medium: { monthlyFood: 1200, monthlyWasteBags: 200, monthlyPreventiveMedicine: 900, carrier: 1200, leash: 950, bed: 900, seniorSupplies: 1500 },
  large: { monthlyFood: 1800, monthlyWasteBags: 300, monthlyPreventiveMedicine: 1300, carrier: 1800, leash: 1200, bed: 1300, seniorSupplies: 2200 },
};

export function getPetSizeForBreed(breedId: string): PetSize {
  const size = breeds.find((item) => item.id === breedId)?.size as PetSize | undefined;
  return size === "small" || size === "large" ? size : "medium";
}

export function applySizeBasedExpenseAmount(expense: ExpenseRecord, petSize: PetSize): ExpenseRecord {
  const costs = sizeBasedCosts[petSize];
  const sizeAmountById: Record<string, number> = {
    "monthly-food-main": costs.monthlyFood,
    "monthly-waste-bags": costs.monthlyWasteBags,
    "monthly-preventive-medicine": costs.monthlyPreventiveMedicine,
    carrier: costs.carrier,
    leash: costs.leash,
    bed: costs.bed,
    "senior-slipmat": costs.seniorSupplies,
    "senior-access-bed": costs.seniorSupplies,
  };
  const amount = sizeAmountById[expense.id];
  return typeof amount === "number" ? { ...expense, amount } : expense;
}

/** 將同一固定 expense id 的物種說明解析成實際寫入 expense store 的 description。 */
export function getExpenseForSpecies(id: string, species?: string): ExpenseRecord | undefined {
  const expense = expenseCatalog[id];
  if (!expense) return undefined;
  const speciesDescription = species === "dog" || species === "cat" || species === "rabbit" || species === "bird"
    ? expense.descriptionBySpecies?.[species]
    : undefined;
  const resolvedExpense = { ...expense };
  delete resolvedExpense.descriptionBySpecies;
  return speciesDescription ? { ...resolvedExpense, description: speciesDescription } : resolvedExpense;
}

export const expenseCatalog: Record<string, ExpenseRecord> = {
  "food-bowl": { id: "food-bowl", name: "食碗", amount: 350, category: "用品", stage: "領養前準備", recurring: false, description: "固定位置餵食，建立穩定作息；依體型選擇高度適中的食碗。", descriptionBySpecies: { cat: "固定位置餵食，建立穩定作息；寬口、深度淺的碗減少貓鬚不適。" } },
  "water-bowl": { id: "water-bowl", name: "水碗", amount: 350, category: "用品", stage: "領養前準備", recurring: false, description: "隨時保持乾淨飲水；選擇適合體型的碗，不易打翻為佳。", descriptionBySpecies: { cat: "遠離食盆放置；部分貓偏好流動水，可搭配飲水機。" } },
  bed: { id: "bed", name: "睡墊", amount: 900, category: "用品", stage: "領養前準備", recurring: false, description: "提供安靜、安全的休息角落；可選擇犬用床或軟墊，依體型選擇適合尺寸。" },
  carrier: { id: "carrier", name: "安全外出籠", amount: 1200, category: "用品", stage: "領養前準備", recurring: false, description: "安全運送，避免車內跌倒或排泄污染；選擇通風、堅固且尺寸適當的運輸籠。" },
  leash: { id: "leash", name: "牽繩與胸背帶", amount: 950, category: "用品", stage: "領養前準備", recurring: false, description: "移動安全必備；選擇適合體型的牽繩長度與扣環強度。" },
  toy: { id: "toy", name: "\u73a9\u5177", amount: 450, category: "\u4e00\u6b21\u6027\u6e96\u5099\u8cbb", stage: "\u9818\u990a\u524d\u6e96\u5099", recurring: false, description: "提供啃咬與互動的適當出口；選擇不易碎裂、無毒材質，避免誤食。" },
  toilet: { id: "toilet", name: "尿墊或便盆", amount: 500, category: "清潔", stage: "領養前準備", recurring: false, description: "協助建立如廁位置，減少環境壓力。", descriptionBySpecies: { cat: "途中防止意外弄髒外出籠；選擇吸水性佳、不易移位的款式" } },
  cleaner: { id: "cleaner", name: "寵物專用清潔用品", amount: 420, category: "清潔", stage: "領養前準備", recurring: false, description: "清潔排泄物，避免殘留氣味引導錯誤如廁行為；需選用對犬無害的成分。" },
  "starter-food": { id: "starter-food", name: "初期飼料", amount: 800, category: "飲食", stage: "領養前準備", recurring: false, description: "依體型與年齡選擇適合的犬用飼料；初期維持原飼料、漸進換食以避免腸胃不適。" },
  "monthly-food-main": { id: "monthly-food-main", name: "\u6bcf\u6708\u4e3b\u98df\u8cbb", amount: 1200, category: "\u6bcf\u6708\u57fa\u672c\u652f\u51fa", stage: "\u65e5\u5e38\u7167\u8b77", recurring: true, description: "依體型與年齡選擇乾飼料、濕食或混合；不可給予巧克力、洋蔥、葡萄等有毒食物。" },
  "monthly-waste-bags": { id: "monthly-waste-bags", name: "\u6bcf\u6708\u64bf\u4fbf\u888b\u8207\u6e05\u6f54\u6d88\u8017\u54c1", amount: 200, category: "\u6bcf\u6708\u57fa\u672c\u652f\u51fa", stage: "\u65e5\u5e38\u6563\u6b65", recurring: true, description: "柴犬換毛季毛量大，需定期梳毛；每月至少洗澡一次；清潔耗材（尿墊、洗毛精）需定期補充。" },
  "monthly-preventive-medicine": { id: "monthly-preventive-medicine", name: "\u6bcf\u6708\u9810\u9632\u85e5\u7269", amount: 900, category: "\u6bcf\u6708\u57fa\u672c\u652f\u51fa", stage: "\u65e5\u5e38\u7167\u8b77", recurring: true },
  "microchip-registration": { id: "microchip-registration", name: "\u6676\u7247\u690d\u5165\u8207\u5bf5\u7269\u767b\u8a18", amount: 1000, category: "\u5230\u5bb6\u5f8c\u5fc5\u8981\u652f\u51fa", stage: "\u5bf5\u7269\u5230\u5bb6\u5f8c", recurring: false, description: "台灣法規要求犬隻植入晶片並完成寵物登記；部分地方政府可免費辦理，詳洽所在縣市動保處。", descriptionBySpecies: { cat: "台灣法規要求貓咪植入晶片並完成寵物登記；部分地方政府可免費辦理，詳洽所在縣市動保處。" } },
  "rabies-vaccine": { id: "rabies-vaccine", name: "\u72c2\u72ac\u75c5\u75ab\u82d7", amount: 400, category: "\u5230\u5bb6\u5f8c\u5fc5\u8981\u652f\u51fa", stage: "\u5bf5\u7269\u5230\u5bb6\u5f8c", recurring: false, description: "台灣法規要求犬隻每年施打狂犬病疫苗；初次到家後應確認接種狀態並補打。", descriptionBySpecies: { cat: "台灣法規要求貓咪每年施打狂犬病疫苗；到家後應確認接種狀態並補打。" } },
  "basic-vaccine-checkup": { id: "basic-vaccine-checkup", name: "\u57fa\u790e\u75ab\u82d7\u8207\u521d\u671f\u5065\u5eb7\u6aa2\u67e5", amount: 3500, category: "\u5230\u5bb6\u5f8c\u5fc5\u8981\u652f\u51fa", stage: "\u5bf5\u7269\u5230\u5bb6\u5f8c", recurring: false, description: "到家後盡快安排，建立健康基準，確認整體狀態。", descriptionBySpecies: { cat: "到家後盡快安排，確認整體狀態與驅蟲需求；米克斯建議加做 FeLV／FIV 篩檢。" } },
  "dog-sterilization": { id: "dog-sterilization", name: "絕育手術費用", amount: 5000, category: "到家後必要支出", stage: "寵物到家後", recurring: false, description: "無繁殖計畫強烈建議絕育；可預防多種生殖系統疾病，並減少發情期相關行為問題；費用依性別與體型而異。" },
  "cat-sterilization": { id: "cat-sterilization", name: "絕育手術費用", amount: 3500, category: "到家後必要支出", stage: "寵物到家後", recurring: false, description: "無繁殖計畫強烈建議絕育；可預防子宮蓄膿、乳腺腫瘤等疾病，並大幅減少發情嚎叫與外出衝動；費用依性別而異。" },
  "sick-vet-care": { id: "sick-vet-care", name: "生病就醫與檢查", amount: 4200, category: "醫療", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "皮膚搔癢、食慾精神改變、牙齦紅腫等警訊須就醫。", descriptionBySpecies: { cat: "食慾、飲水、尿便、活動量或躲藏異常時須就醫。" } },
  "dog-mild-sick": { id: "dog-mild-sick", name: "輕症就診（感冒／輕度腹瀉）", amount: 1500, category: "臨時／醫療支出", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "掛號費 + 診察費 + 3–5 天藥費；皮膚搔癢、輕微腹瀉等症狀輕微且未達抽血標準。" },
  "dog-moderate-sick": { id: "dog-moderate-sick", name: "急症檢查（嘔吐不吃／精神極差）", amount: 4000, category: "臨時／醫療支出", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "掛號費 + 血液檢查 + X 光 + 藥費；嘔吐腹瀉超過一天、食慾或精神明顯下降需確認病因。" },
  "dog-hospitalization": { id: "dog-hospitalization", name: "住院與手術費用", amount: 15000, category: "臨時／醫療支出", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "需住院觀察、靜脈輸液或手術（如腸梗阻、中毒）；費用依病因與住院天數差異極大。" },
  "journey-care-service": { id: "journey-care-service", name: "短期照顧服務", amount: 2400, category: "照顧服務", stage: "飼主生活發生改變", recurring: false },
  "dog-senior-room": { id: "dog-senior-room", name: "高齡環境調整用品", amount: 1500, category: "高齡用品", stage: "逐漸進入高齡", recurring: false, description: "降低障礙物高度、提供防滑地墊、增加保暖設備；高齡犬行動退化需調整生活環境。" },
  "dog-senior-checkup": { id: "dog-senior-checkup", name: "高齡定期健康檢查", amount: 2500, category: "醫療", stage: "逐漸進入高齡", recurring: false, fromEmergency: false, description: "高齡犬應提高健檢頻率（每半年一次）；體重、食慾、排泄、活動量及精神狀況定期評估。" },
  "senior-checkup": { id: "senior-checkup", name: "高齡定期健康檢查", amount: 2500, category: "醫療", stage: "逐漸進入高齡", recurring: false, fromEmergency: true, description: "高齡犬應提高健檢頻率（每半年一次）；體重、食慾、排泄、活動量及精神狀況定期評估。", descriptionBySpecies: { cat: "高齡貓應提高健檢頻率（每半年一次）；體重、飲水、如廁、活動量及精神狀況定期評估。" } },
  "senior-slipmat": { id: "senior-slipmat", name: "高齡犬防滑墊", amount: 1200, category: "高齡用品", stage: "調整高齡生活空間", recurring: false },
  "senior-access-bed": { id: "senior-access-bed", name: "低入口高齡睡墊", amount: 1800, category: "高齡用品", stage: "調整高齡生活空間", recurring: false },
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
  "rabbit-hay-rack": { id: "rabbit-hay-rack", name: "牧草架", amount: 550, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "牧草為兔子主食（>80%），牧草架保持乾淨可持續取用。" },
  "rabbit-heavy-water-bowl": { id: "rabbit-heavy-water-bowl", name: "較重的飲水碗", amount: 200, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "選重碗避免打翻；比滾珠瓶更受兔子歡迎，也能觀察飲水量。" },
  "rabbit-litter-box": { id: "rabbit-litter-box", name: "兔用便盆", amount: 400, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "兔有固定排泄習性，便盆須與食水區分開。" },
  "rabbit-hiding-box": { id: "rabbit-hiding-box", name: "躲藏箱／小屋", amount: 500, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "兔子需要可自由進出的藏身處以紓解壓力。" },
  "rabbit-anti-slip-mat": { id: "rabbit-anti-slip-mat", name: "防滑墊", amount: 280, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "地面須防滑，避免骨骼受傷；骨骼脆弱、掙扎易致腰椎損傷。" },
  "rabbit-cooling-mat": { id: "rabbit-cooling-mat", name: "陶板涼感墊", amount: 400, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "兔子無汗腺僅靠雙耳散熱，氣溫高於 28℃ 時必備。" },
  "rabbit-chew-toy": { id: "rabbit-chew-toy", name: "木製咀嚼玩具", amount: 120, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "兔齒終生生長，需持續提供磨牙材質。" },
  "rabbit-dig-box": { id: "rabbit-dig-box", name: "挖掘箱", amount: 250, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "滿足挖掘天性並減少破壞行為。" },
  "rabbit-fence-pen": { id: "rabbit-fence-pen", name: "圍片／柵欄", amount: 900, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "室內以圍片區隔飼養活動空間，讓兔子安全移動。" },
  "rabbit-carrier": { id: "rabbit-carrier", name: "安全外出籠／提袋", amount: 1100, category: "一次性準備費", stage: "出發前準備", recurring: false, description: "兔子必須在適當外出籠中運送，不可散放；籠內需有足夠空間自然站立。" },
  "rabbit-cooling-pack": { id: "rabbit-cooling-pack", name: "保冷袋／冰袋", amount: 250, category: "一次性準備費", stage: "出發前準備", recurring: false, description: "夏季接回途中協助避免高溫中暑。" },
  "rabbit-arrival-checkup": { id: "rabbit-arrival-checkup", name: "到家後首次健康檢查", amount: 1500, category: "到家後必要支出", stage: "寵物到家後", recurring: false, description: "建立可信任的兔科獸醫並進行健康評估。" },
  "rabbit-sterilization": { id: "rabbit-sterilization", name: "絕育手術費用", amount: 3500, category: "到家後必要支出", stage: "寵物到家後", recurring: false, description: "建議 4–5 月齡評估後絕育；預防子宮腫瘤、減少打架與意外繁殖。" },
  "rabbit-hay-monthly": { id: "rabbit-hay-monthly", name: "每月牧草與基本飲食費", amount: 850, category: "每月基本支出", stage: "日常照護", recurring: true, description: "主食（>80%），提摩西草、果園草等，需每月穩定採購。" },
  "rabbit-pellet-monthly": { id: "rabbit-pellet-monthly", name: "每月飼料費用（輔助）", amount: 200, category: "每月基本支出", stage: "日常照護", recurring: true, description: "輔助主食不超過飲食的 5%，依年齡選擇配方。" },
  "rabbit-veggies-monthly": { id: "rabbit-veggies-monthly", name: "每月新鮮葉菜費用", amount: 350, category: "每月基本支出", stage: "日常照護", recurring: true, description: "新鮮葉菜約占飲食 10～15%，不以紅蘿蔔取代主食。" },
  "rabbit-litter-monthly": { id: "rabbit-litter-monthly", name: "每月便盆墊料費用", amount: 275, category: "每月基本支出", stage: "日常照護", recurring: true, description: "定期更換吸附墊料，維持清潔並避免尿灼傷。" },
  "rabbit-ac-monthly": { id: "rabbit-ac-monthly", name: "夏季冷氣電費（夏季月份）", amount: 1000, category: "每月基本支出", stage: "日常照護", recurring: true, description: "兔子非常怕熱，夏天（約 5–10 月）需全天開冷氣維持 25℃ 以下；電費依機型與使用時數而異，建議納入每月固定預算。" },
  "rabbit-care-service": { id: "rabbit-care-service", name: "短期代養費用", amount: 2000, category: "照顧服務", stage: "飼主生活發生改變", recurring: false, description: "僅在選擇付費專業代養時加入。" },
  "rabbit-emergency-reserve": { id: "rabbit-emergency-reserve", name: "緊急醫療備用金", amount: 5000, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "消化道停滯、受驚嚇緊迫等危急狀況需立即就醫；兔子隱藏不適，警訊出現時通常已嚴重。" },
  "rabbit-mild-sick": { id: "rabbit-mild-sick", name: "輕症就診（輕微消化不順／皮膚問題）", amount: 1500, category: "臨時／醫療支出", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "掛號費 + 診察費 + 3–5 天藥費；輕微消化不順、輕度皮膚問題等症狀輕微未達抽血標準；兔科獸醫資源稀少，建議事先確認診所。" },
  "rabbit-moderate-sick": { id: "rabbit-moderate-sick", name: "急症檢查（嘔吐不吃／精神極差）", amount: 4500, category: "臨時／醫療支出", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "掛號費 + 血液檢查 + X 光 + 藥費；消化道停滯初期（食慾明顯下降）、斜頸觀察等；兔類血量少，採樣費用較一般犬貓高。" },
  "rabbit-hospitalization": { id: "rabbit-hospitalization", name: "住院與手術費用", amount: 15000, category: "臨時／醫療支出", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "需住院觀察、腸道手術或齒科整牙（開刀）；兔子麻醉風險較高，手術費用相對昂貴；費用依病因差異極大。" },
  "rabbit-routine-checkup": { id: "rabbit-routine-checkup", name: "定期健康檢查", amount: 1000, category: "臨時／醫療支出", stage: "生活變化", recurring: false, description: "建議至少半年至一年一次全面健康檢查；門齒與指甲每週檢查。" },
  "rabbit-senior-room": { id: "rabbit-senior-room", name: "高齡環境調整用品", amount: 1500, category: "高齡用品", stage: "生活變化", recurring: false, description: "6 歲以上注意老化；調低棲架高度、強化防滑、提供保暖設施、增加健檢頻率。" },
  "bird-cage": { id: "bird-cage", name: "鳥籠", amount: 800, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "方形金屬籠（白鐵）較佳；格柵間距需依體型選擇；破壞力強者選金屬籠。" },
  "bird-perch-set": { id: "bird-perch-set", name: "棲木組", amount: 300, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "提供不同材質與粗細的棲木；寬度讓足趾環繞約 2/3 為佳。" },
  "bird-food-bowl": { id: "bird-food-bowl", name: "食碗／食杯", amount: 120, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "依食性選擇適當容器；吸蜜性鳥類需專用碗具。" },
  "bird-water-bowl": { id: "bird-water-bowl", name: "水碗／水杯", amount: 120, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "不使用過大過深容器；避免鳥跌落。" },
  "bird-chew-toy": { id: "bird-chew-toy", name: "啃咬玩具", amount: 200, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "天然材質（木材、麻繩）降低誤食風險；為消耗品，需定期更換。" },
  "bird-climbing-toy": { id: "bird-climbing-toy", name: "攀爬玩具", amount: 300, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "增加籠內落腳空間，鼓勵活動；視使用狀況定期更換。" },
  "bird-feces-tray": { id: "bird-feces-tray", name: "糞尿托盤與墊料", amount: 250, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "籠底附糞尿盤；放報紙、紙棉等墊料，每日清潔。" },
  "bird-thermometer": { id: "bird-thermometer", name: "溫度計", amount: 200, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "鳥對溫度變化敏感，維持環境溫度穩定非常重要。" },
  "bird-carrier": { id: "bird-carrier", name: "鳥用外出籠", amount: 800, category: "一次性準備費", stage: "出發前準備", recurring: false, description: "通風良好、材質堅固、內有棲木；縫隙不讓肢體探出。" },
  "bird-cover-cloth": { id: "bird-cover-cloth", name: "遮光布", amount: 200, category: "一次性準備費", stage: "出發前準備", recurring: false, description: "遮蔽籠具降低外界刺激，減少途中緊迫；也用於日常安靜休息。" },
  "bird-starter-food": { id: "bird-starter-food", name: "物種主食飼料", amount: 150, category: "一次性準備費", stage: "出發前準備", recurring: false, description: "依食性選購：種子飼料、滋養丸或吸蜜粉；切勿混用不同食性飼料。" },
  "bird-arrival-checkup": { id: "bird-arrival-checkup", name: "到家後首次健康檢查", amount: 1200, category: "到家後必要支出", stage: "寵物到家後", recurring: false, description: "鳥類常隱藏病徵，抵家後應找熟悉鳥類醫療的獸醫建立健康基準。" },
  "bird-food-monthly": { id: "bird-food-monthly", name: "每月飼料費（主食＋鮮食）", amount: 500, category: "每月基本支出", stage: "日常照護", recurring: true, description: "專用飼料為主食，鮮食（蔬果）為輔；鮮食不建議甜度高的水果；不建議僅以單一飼料為全部食物。" },
  "bird-cleaning-monthly": { id: "bird-cleaning-monthly", name: "每月清潔耗材費", amount: 200, category: "每月基本支出", stage: "日常照護", recurring: true, description: "糞尿托盤墊料每日更換；定期徹底清洗消毒籠舍；使用確認對鳥無害的清潔劑。" },
  "bird-emergency-vet": { id: "bird-emergency-vet", name: "緊急就醫費用", amount: 4000, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "張口呼吸、翅膀下垂、無法穩站棲木等警訊須立即就醫；鳥基礎代謝高、病程快。" },
  "bird-mild-sick": { id: "bird-mild-sick", name: "輕症就診（輕微糞便異常／輕度羽毛問題）", amount: 1500, category: "臨時／醫療支出", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "掛號費 + 診察費 + 3–5 天藥費；輕微糞便異常、輕度羽毛問題等症狀輕微未達抽血標準；鳥科獸醫資源稀少，建議事先找好可看診的獸醫。" },
  "bird-moderate-sick": { id: "bird-moderate-sick", name: "急症檢查（澎毛精神極差／消化異常）", amount: 5000, category: "臨時／醫療支出", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "掛號費 + 血液檢查 + X 光 + 藥費；澎毛、精神低落、消化異常持續超過一天；鳥類血量少，採樣技術難度高，費用較犬貓高。" },
  "bird-hospitalization": { id: "bird-hospitalization", name: "住院與手術費用", amount: 15000, category: "臨時／醫療支出", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "需住院觀察、手術（如難產取蛋、腫瘤切除）；鳥類麻醉風險高，費用依病因差異極大。" },
  "bird-senior-checkup": { id: "bird-senior-checkup", name: "高齡健康檢查", amount: 2000, category: "臨時／醫療支出", stage: "生活變化", recurring: false, description: "高齡鳥應提高健檢頻率；體重、飲食、羽毛及站棲狀態定期評估。" },
  "bird-senior-room": { id: "bird-senior-room", name: "高齡環境調整用品", amount: 1200, category: "高齡用品", stage: "生活變化", recurring: false, description: "降低棲木高度防跌落、增加保暖設備（暖燈、布巾）、減少環境干擾。" },
};

/** 臨時性預留費用只會在對應題目的正確回饋出現後才登錄。 */
export function isTemporaryReserveExpense(item: Pick<ExpenseRecord, "category" | "fromEmergency">) {
  return Boolean(item.fromEmergency)
    || item.category === "醫療"
    || item.category === "照顧服務"
    || item.category === "高齡用品"
    || item.category === "臨時／醫療支出";
}

/** 犬、貓第一題答對後才一次登錄的既有到家後必要支出。 */
export const arrivalRequiredExpenseIdsBySpecies = {
  dog: ["microchip-registration", "rabies-vaccine", "basic-vaccine-checkup", "dog-sterilization"],
  cat: ["microchip-registration", "rabies-vaccine", "basic-vaccine-checkup", "cat-sterilization"],
} as const;
