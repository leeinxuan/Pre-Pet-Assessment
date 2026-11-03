import type { ExpenseRecord, SpeciesExpenseRules } from "../../game-types";
import { catExpenseRules, catExpenses } from "../species/cat/expenses";
import { birdExpenseRules, birdExpenses } from "../species/bird/expenses";
import { dogExpenseRules, dogExpenses } from "../species/dog/expenses";
import { rabbitExpenseRules, rabbitExpenses } from "../species/rabbit/expenses";
import { hamsterExpenseRules, hamsterExpenses } from "../species/hamster/expenses";
import { geckoExpenseRules, geckoExpenses } from "../species/gecko/expenses";
import { dogDepartureTrunkItems, dogRoomItems } from "../species/dog/preparation";
import { catRoomItems, catTrunkItems } from "../species/cat/preparation";
import { rabbitRoomItems, rabbitTrunkItems } from "../species/rabbit/preparation";
import { birdRoomItems, birdTrunkItems } from "../species/bird/preparation";
import { hamsterRoomItems, hamsterTrunkItems } from "../species/hamster/preparation";
import { geckoRoomItems, geckoTrunkItems } from "../species/gecko/preparation";

/** 共用金額格式與費用計算資料。 */
export const money = new Intl.NumberFormat("zh-TW");

type PreparationItemSource = { expenseId?: string; expenseIds?: string[]; description?: string };

/**
 * 「飼養前準備」「出發前準備」費用的說明不在 expenses.ts 重複維護，
 * 改由 preparation.ts 的房間／後車廂用品 description 提供，讓準備畫面與費用明細文字一致。
 * 房間用品對應「飼養前準備」，後車廂用品對應「出發前準備」；沒有對應用品的費用保留自己的 description。
 */
function withPreparationDescriptions(
  expenses: Record<string, ExpenseRecord>,
  roomItems: readonly PreparationItemSource[],
  trunkItems: readonly PreparationItemSource[],
): Record<string, ExpenseRecord> {
  const descriptionsByExpenseId = (items: readonly PreparationItemSource[]) => {
    const map = new Map<string, string>();
    for (const item of items) {
      if (!item.description) continue;
      for (const id of item.expenseIds ?? (item.expenseId ? [item.expenseId] : [])) {
        if (!map.has(id)) map.set(id, item.description);
      }
    }
    return map;
  };
  const bySourceStage: Record<string, Map<string, string>> = {
    "飼養前準備": descriptionsByExpenseId(roomItems),
    "出發前準備": descriptionsByExpenseId(trunkItems),
  };
  return Object.fromEntries(Object.entries(expenses).map(([id, expense]) => {
    const description = bySourceStage[expense.stage]?.get(id);
    return [id, description ? { ...expense, description } : expense];
  }));
}

/** 每個物種維護自己的費用資料；共用層只負責依物種取得與合併目錄。 */
export const expenseCatalogBySpecies = {
  dog: withPreparationDescriptions(dogExpenses, dogRoomItems, dogDepartureTrunkItems),
  cat: withPreparationDescriptions(catExpenses, catRoomItems, catTrunkItems),
  rabbit: withPreparationDescriptions(rabbitExpenses, rabbitRoomItems, rabbitTrunkItems),
  bird: withPreparationDescriptions(birdExpenses, birdRoomItems, birdTrunkItems),
  hamster: withPreparationDescriptions(hamsterExpenses, hamsterRoomItems, hamsterTrunkItems),
  gecko: withPreparationDescriptions(geckoExpenses, geckoRoomItems, geckoTrunkItems),
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
  ...expenseCatalogBySpecies.dog,
  ...expenseCatalogBySpecies.cat,
  ...expenseCatalogBySpecies.rabbit,
  ...expenseCatalogBySpecies.bird,
  ...expenseCatalogBySpecies.hamster,
  ...expenseCatalogBySpecies.gecko,
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
