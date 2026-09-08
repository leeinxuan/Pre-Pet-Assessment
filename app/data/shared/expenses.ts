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
};

