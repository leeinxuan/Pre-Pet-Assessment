import type { ExpenseRecord } from "../../game-types";
import { catExpenses } from "../species/cat/expenses";
import { catBreeds } from "../species/cat/selection";
import { birdExpenses } from "../species/bird/expenses";
import { dogExpenses } from "../species/dog/expenses";
import { dogBreeds } from "../species/dog/selection";
import { rabbitExpenses } from "../species/rabbit/expenses";

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

/** 每個物種維護自己的費用資料；共用層只負責依物種取得與合併目錄。 */
export const expenseCatalogBySpecies = {
  dog: dogExpenses,
  cat: catExpenses,
  rabbit: rabbitExpenses,
  bird: birdExpenses,
} as const;

/** 舊有元件以 ID 查詢時使用的合併目錄；金額與資料仍只在物種檔維護。 */
export const expenseCatalog: Record<string, ExpenseRecord> = {
  ...dogExpenses,
  ...catExpenses,
  ...rabbitExpenses,
  ...birdExpenses,
};

/** 依目前物種取費用，避免同一 ID 的犬貓說明互相覆蓋。 */
export function getExpenseForSpecies(id: string, species?: string): ExpenseRecord | undefined {
  const speciesCatalog = species === "dog" || species === "cat" || species === "rabbit" || species === "bird"
    ? expenseCatalogBySpecies[species]
    : undefined;
  return speciesCatalog?.[id] ?? expenseCatalog[id];
}

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
