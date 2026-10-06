import type { ExpenseRecord } from "../../game-types";
import { catExpenses } from "../species/cat/expenses";
import { birdExpenses } from "../species/bird/expenses";
import { dogExpenses } from "../species/dog/expenses";
import { rabbitExpenses } from "../species/rabbit/expenses";
import { hamsterExpenses } from "../species/hamster/expenses";

/** 共用金額格式與費用計算資料。 */
export const money = new Intl.NumberFormat("zh-TW");

/** 每個物種維護自己的費用資料；共用層只負責依物種取得與合併目錄。 */
export const expenseCatalogBySpecies = {
  dog: dogExpenses,
  cat: catExpenses,
  rabbit: rabbitExpenses,
  bird: birdExpenses,
  hamster: hamsterExpenses,
} as const;

/** 舊有元件以 ID 查詢時使用的合併目錄；金額與資料仍只在物種檔維護。 */
export const expenseCatalog: Record<string, ExpenseRecord> = {
  ...dogExpenses,
  ...catExpenses,
  ...rabbitExpenses,
  ...birdExpenses,
  ...hamsterExpenses,
};

/** 依目前物種取費用，避免同一 ID 的犬貓說明互相覆蓋。 */
export function getExpenseForSpecies(id: string, species?: string): ExpenseRecord | undefined {
  const speciesCatalog = species === "dog" || species === "cat" || species === "rabbit" || species === "bird" || species === "hamster"
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
  dog: ["dog-arrival-checkup", "dog-microchip", "dog-rabies-vaccine", "dog-sterilization"],
  cat: ["cat-arrival-checkup", "cat-microchip", "cat-rabies-vaccine", "cat-sterilization"],
} as const;
