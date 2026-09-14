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
  const size = breeds.find((item) => item.id === breedId)?.size;
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

export const expenseCatalog: Record<string, ExpenseRecord> = {
  "food-bowl": { id: "food-bowl", name: "食碗", amount: 350, category: "用品", stage: "領養前準備", recurring: false },
  "water-bowl": { id: "water-bowl", name: "水碗", amount: 350, category: "用品", stage: "領養前準備", recurring: false },
  bed: { id: "bed", name: "睡墊", amount: 900, category: "用品", stage: "領養前準備", recurring: false },
  carrier: { id: "carrier", name: "安全外出籠", amount: 1200, category: "用品", stage: "領養前準備", recurring: false },
  leash: { id: "leash", name: "牽繩與胸背帶", amount: 950, category: "用品", stage: "領養前準備", recurring: false },
  toy: { id: "toy", name: "\u73a9\u5177", amount: 450, category: "\u4e00\u6b21\u6027\u6e96\u5099\u8cbb", stage: "\u9818\u990a\u524d\u6e96\u5099", recurring: false },
  toilet: { id: "toilet", name: "尿墊或便盆", amount: 500, category: "清潔", stage: "領養前準備", recurring: false },
  cleaner: { id: "cleaner", name: "寵物專用清潔用品", amount: 420, category: "清潔", stage: "領養前準備", recurring: false },
  "starter-food": { id: "starter-food", name: "初期飼料", amount: 800, category: "飲食", stage: "領養前準備", recurring: false },
  "monthly-food-main": { id: "monthly-food-main", name: "\u6bcf\u6708\u4e3b\u98df\u8cbb", amount: 1200, category: "\u6bcf\u6708\u57fa\u672c\u652f\u51fa", stage: "\u65e5\u5e38\u7167\u8b77", recurring: true },
  "monthly-waste-bags": { id: "monthly-waste-bags", name: "\u6bcf\u6708\u64bf\u4fbf\u888b\u8207\u6e05\u6f54\u6d88\u8017\u54c1", amount: 200, category: "\u6bcf\u6708\u57fa\u672c\u652f\u51fa", stage: "\u65e5\u5e38\u6563\u6b65", recurring: true },
  "monthly-preventive-medicine": { id: "monthly-preventive-medicine", name: "\u6bcf\u6708\u9810\u9632\u85e5\u7269", amount: 900, category: "\u6bcf\u6708\u57fa\u672c\u652f\u51fa", stage: "\u65e5\u5e38\u7167\u8b77", recurring: true },
  "microchip-registration": { id: "microchip-registration", name: "\u6676\u7247\u690d\u5165\u8207\u5bf5\u7269\u767b\u8a18", amount: 1000, category: "\u5230\u5bb6\u5f8c\u5fc5\u8981\u652f\u51fa", stage: "\u5bf5\u7269\u5230\u5bb6\u5f8c", recurring: false },
  "rabies-vaccine": { id: "rabies-vaccine", name: "\u72c2\u72ac\u75c5\u75ab\u82d7", amount: 400, category: "\u5230\u5bb6\u5f8c\u5fc5\u8981\u652f\u51fa", stage: "\u5bf5\u7269\u5230\u5bb6\u5f8c", recurring: false },
  "basic-vaccine-checkup": { id: "basic-vaccine-checkup", name: "\u57fa\u790e\u75ab\u82d7\u8207\u521d\u671f\u5065\u5eb7\u6aa2\u67e5", amount: 3500, category: "\u5230\u5bb6\u5f8c\u5fc5\u8981\u652f\u51fa", stage: "\u5bf5\u7269\u5230\u5bb6\u5f8c", recurring: false },
  "sick-vet-care": { id: "sick-vet-care", name: "生病就醫與檢查", amount: 4200, category: "醫療", stage: "生病與就醫", recurring: false, fromEmergency: true },
  "journey-care-service": { id: "journey-care-service", name: "短期照顧服務", amount: 2400, category: "照顧服務", stage: "飼主生活發生改變", recurring: false },
  "senior-checkup": { id: "senior-checkup", name: "高齡健康檢查", amount: 3200, category: "醫療", stage: "逐漸進入高齡", recurring: false, fromEmergency: true },
  "senior-slipmat": { id: "senior-slipmat", name: "高齡犬防滑墊", amount: 1200, category: "高齡用品", stage: "調整高齡生活空間", recurring: false },
  "senior-access-bed": { id: "senior-access-bed", name: "低入口高齡睡墊", amount: 1800, category: "高齡用品", stage: "調整高齡生活空間", recurring: false },
  "cat-hide-box": { id: "cat-hide-box", name: "躲藏紙箱", amount: 120, category: "用品", stage: "飼養前準備", recurring: false },
  "cat-safe-window": { id: "cat-safe-window", name: "門窗與紗窗安全防護", amount: 900, category: "用品", stage: "飼養前準備", recurring: false },
  "cat-rest-bed": { id: "cat-rest-bed", name: "貓咪休息空間", amount: 900, category: "用品", stage: "飼養前準備", recurring: false },
  "cat-litter-box": { id: "cat-litter-box", name: "貓砂盆", amount: 700, category: "清潔", stage: "飼養前準備", recurring: false },
  "cat-litter": { id: "cat-litter", name: "貓砂", amount: 500, category: "每月基本支出", stage: "日常照護", recurring: true },
  "cat-scratcher": { id: "cat-scratcher", name: "抓板", amount: 350, category: "用品", stage: "飼養前準備", recurring: false },
  "cat-tree": { id: "cat-tree", name: "跳台", amount: 1800, category: "用品", stage: "飼養前準備", recurring: false },
  "cat-safe-toy": { id: "cat-safe-toy", name: "安全玩具", amount: 300, category: "用品", stage: "飼養前準備", recurring: false },
  "cat-monthly-food": { id: "cat-monthly-food", name: "每月貓主食費", amount: 1300, category: "每月基本支出", stage: "日常照護", recurring: true },
  "cat-carrier": { id: "cat-carrier", name: "貓用外出籠", amount: 1200, category: "用品", stage: "飼養前準備", recurring: false },
  "cat-senior-room": { id: "cat-senior-room", name: "高齡貓環境調整用品", amount: 1600, category: "高齡用品", stage: "逐漸進入高齡", recurring: false },
  "rabbit-hay-rack": { id: "rabbit-hay-rack", name: "牧草架", amount: 550, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "讓牧草保持乾淨並可持續取用。" },
  "rabbit-heavy-water-bowl": { id: "rabbit-heavy-water-bowl", name: "較重的飲水碗", amount: 200, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "避免打翻，也便於觀察飲水量。" },
  "rabbit-litter-box": { id: "rabbit-litter-box", name: "兔用便盆", amount: 400, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "提供固定排泄區，並與食水區分開。" },
  "rabbit-hiding-box": { id: "rabbit-hiding-box", name: "躲藏箱／小屋", amount: 500, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "提供可自由進出的藏身處，協助紓解壓力。" },
  "rabbit-anti-slip-mat": { id: "rabbit-anti-slip-mat", name: "防滑墊", amount: 280, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "降低滑倒與骨骼受傷風險。" },
  "rabbit-cooling-mat": { id: "rabbit-cooling-mat", name: "陶板涼感墊", amount: 400, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "高於 28℃ 時提供可自行選擇的降溫位置。" },
  "rabbit-chew-toy": { id: "rabbit-chew-toy", name: "木製咀嚼玩具", amount: 120, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "提供安全磨牙與啃咬出口。" },
  "rabbit-dig-box": { id: "rabbit-dig-box", name: "挖掘箱", amount: 250, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "滿足挖掘天性並減少破壞行為。" },
  "rabbit-fence-pen": { id: "rabbit-fence-pen", name: "圍片／柵欄", amount: 900, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "區隔安全活動空間，讓兔子安心移動。" },
  "rabbit-carrier": { id: "rabbit-carrier", name: "安全外出籠／提袋", amount: 1100, category: "一次性準備費", stage: "出發前準備", recurring: false, description: "接回途中提供可自然站立的安全運輸空間。" },
  "rabbit-cooling-pack": { id: "rabbit-cooling-pack", name: "保冷袋／冰袋", amount: 250, category: "一次性準備費", stage: "出發前準備", recurring: false, description: "夏季接回途中協助避免高溫中暑。" },
  "rabbit-arrival-checkup": { id: "rabbit-arrival-checkup", name: "到家後首次健康檢查", amount: 1500, category: "到家後必要支出", stage: "寵物到家後", recurring: false, description: "建立可信任的兔科獸醫並進行健康評估。" },
  "rabbit-sterilization": { id: "rabbit-sterilization", name: "絕育手術費用", amount: 3500, category: "到家後必要支出", stage: "寵物到家後", recurring: false, description: "4～5 月齡可由獸醫評估絕育時機，降低意外繁殖與相關健康風險。" },
  "rabbit-hay-monthly": { id: "rabbit-hay-monthly", name: "每月牧草與基本飲食費", amount: 850, category: "每月基本支出", stage: "日常照護", recurring: true, description: "牧草為主食，需每月穩定採購。" },
  "rabbit-pellet-monthly": { id: "rabbit-pellet-monthly", name: "每月飼料費用（輔助）", amount: 200, category: "每月基本支出", stage: "日常照護", recurring: true, description: "輔助主食不超過飲食的 5%，依年齡選擇配方。" },
  "rabbit-veggies-monthly": { id: "rabbit-veggies-monthly", name: "每月新鮮葉菜費用", amount: 350, category: "每月基本支出", stage: "日常照護", recurring: true, description: "新鮮葉菜約占飲食 10～15%，不以紅蘿蔔取代主食。" },
  "rabbit-litter-monthly": { id: "rabbit-litter-monthly", name: "每月便盆墊料費用", amount: 275, category: "每月基本支出", stage: "日常照護", recurring: true, description: "定期更換吸附墊料，維持清潔並避免尿灼傷。" },
  "rabbit-care-service": { id: "rabbit-care-service", name: "短期代養費用", amount: 2000, category: "照顧服務", stage: "飼主生活發生改變", recurring: false, description: "僅在選擇付費專業代養時加入。" },
  "rabbit-emergency-reserve": { id: "rabbit-emergency-reserve", name: "緊急醫療備用金", amount: 5000, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "危急狀況需立即由兔科獸醫協助。" },
  "rabbit-routine-checkup": { id: "rabbit-routine-checkup", name: "定期健康檢查", amount: 1000, category: "臨時／醫療支出", stage: "生活變化", recurring: false, description: "建議至少半年至一年一次全面健康檢查。" },
  "rabbit-senior-room": { id: "rabbit-senior-room", name: "高齡環境調整用品", amount: 1500, category: "高齡用品", stage: "生活變化", recurring: false, description: "調低出入高度、強化防滑並增加保暖設施。" },
};

