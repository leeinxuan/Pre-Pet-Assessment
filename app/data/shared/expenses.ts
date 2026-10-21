import type { ExpenseRecord, SpeciesExpenseRules } from "../../game-types";
import { catExpenseRules, catExpenses } from "../species/cat/expenses";
import { birdExpenseRules, birdExpenses } from "../species/bird/expenses";
import { dogExpenseRules, dogExpenses } from "../species/dog/expenses";
import { rabbitExpenseRules, rabbitExpenses } from "../species/rabbit/expenses";
import { hamsterExpenseRules, hamsterExpenses } from "../species/hamster/expenses";
import { geckoExpenseRules, geckoExpenses } from "../species/gecko/expenses";

/** 共用金額格式與費用計算資料。 */
export const money = new Intl.NumberFormat("zh-TW");

/** 每個物種維護自己的費用資料；共用層只負責依物種取得與合併目錄。 */
export const expenseCatalogBySpecies = {
  dog: dogExpenses,
  cat: catExpenses,
  rabbit: rabbitExpenses,
  bird: birdExpenses,
  hamster: hamsterExpenses,
  gecko: geckoExpenses,
} as const;

/** 每個物種的費用流程規則，與費用目錄一起由物種檔維護。 */
export const expenseRulesBySpecies: Record<keyof typeof expenseCatalogBySpecies, SpeciesExpenseRules> = {
  dog: dogExpenseRules,
  cat: catExpenseRules,
  rabbit: rabbitExpenseRules,
  bird: birdExpenseRules,
  hamster: hamsterExpenseRules,
  gecko: geckoExpenseRules,
};

const noExpenseRules: SpeciesExpenseRules = {};

/** 依目前物種取費用流程規則；未註冊的物種沒有任何特殊規則。 */
export function getExpenseRulesForSpecies(species: string | undefined): SpeciesExpenseRules {
  return species !== undefined && Object.hasOwn(expenseRulesBySpecies, species)
    ? expenseRulesBySpecies[species as keyof typeof expenseRulesBySpecies]
    : noExpenseRules;
}

/** 舊有元件以 ID 查詢時使用的合併目錄；金額與資料仍只在物種檔維護。 */
export const expenseCatalog: Record<string, ExpenseRecord> = {
  ...dogExpenses,
  ...catExpenses,
  ...rabbitExpenses,
  ...birdExpenses,
  ...hamsterExpenses,
  ...geckoExpenses,
};

/** 依目前物種取費用，避免同一 ID 的犬貓說明互相覆蓋。 */
export function getExpenseForSpecies(id: string, species?: string): ExpenseRecord | undefined {
  // 已指定物種時，查不到即代表該物種沒有這筆費用；不能退回其他物種的扁平目錄。
  if (species !== undefined) {
    const speciesCatalog = expenseCatalogBySpecies[species as keyof typeof expenseCatalogBySpecies];
    return speciesCatalog?.[id];
  }

  // 僅供尚未遷移的 legacy 呼叫使用；正式流程都必須傳入目前物種。
  return expenseCatalog[id];
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
