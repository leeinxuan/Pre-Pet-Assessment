import { loadAppModule } from "./load-app-module.mjs";

export const speciesIds = ["dog", "cat", "rabbit", "bird", "hamster", "gecko"];

/** 文案函式（例如 roomBody(petName)）以這些輸入展開，確保名字替換結果也被快照。 */
const sampleArgs = [["多多"], [""]];

/**
 * 把資料轉成穩定、可比對的 JSON：物件鍵排序、函式以範例輸入展開、undefined 保留標記。
 * 同一物件在不同位置出現時各自展開，避免快照依賴引用順序。
 */
export function serialize(value, depth = 0) {
  if (depth > 40) throw new Error("serialize: data nested too deeply");
  if (typeof value === "function") {
    return {
      "ƒ": Object.fromEntries(sampleArgs.map((args) => {
        try {
          return [JSON.stringify(args), serialize(value(...args), depth + 1)];
        } catch (error) {
          return [JSON.stringify(args), `throws: ${error.message}`];
        }
      })),
    };
  }
  if (Array.isArray(value)) return value.map((entry) => serialize(entry, depth + 1));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, serialize(value[key], depth + 1)]));
  }
  return value === undefined ? "<undefined>" : value;
}

/** 依物種收集正式資料來源與共用流程規則；每個物種一份，差異比對較好閱讀。 */
export async function buildGameDataSnapshot() {
  const [species, journey, registry, expenses, petText, appFlow] = await Promise.all([
    loadAppModule("/app/data/species/index.ts"),
    loadAppModule("/app/data/species/journey.ts"),
    loadAppModule("/app/data/species/activity-registry.ts"),
    loadAppModule("/app/data/shared/expenses.ts"),
    loadAppModule("/app/data/shared/pet-text.ts"),
    loadAppModule("/app/data/shared/app-flow.ts"),
  ]);

  const perSpecies = {};
  for (const id of speciesIds) {
    const config = species.getSpeciesConfig(id);
    const items = journey.getJourneyItemsForSpecies(id);
    perSpecies[id] = serialize({
      config,
      // 倉鼠、守宮沒有品種題；其餘物種依每個品種展開。
      breedChallengesByBreed: "breedChallenges" in config
        ? Object.fromEntries(config.selection.breeds.map((breed) => [breed.id, config.breedChallenges(breed.id)]))
        : "<none>",
      journeyItems: items,
      activityRegistry: Object.fromEntries(items.map((item) => [item.id, registry.getJourneyActivityConfig(id, item.id)])),
      lifeScenarios: journey.getLifeScenariosForSpecies(id),
      dailyBehaviorScenarioIds: journey.getDailyBehaviorScenarioIds(id),
      transitionMedia: species.getJourneyTransitionMedia(id),
      expenses: expenses.expenseCatalogBySpecies[id],
      expenseRules: expenses.getExpenseRulesForSpecies(id),
      petNameFallback: petText.petNameFallback(id),
    });
  }

  const resetKeys = [...new Set(Object.values(registry.journeyActivityRegistry)
    .flatMap((entries) => Object.values(entries).map((entry) => entry.resetKey))
    .filter(Boolean))].sort();
  const shared = serialize({
    speciesCategories: species.speciesCategories,
    appFlow,
    resetPatches: Object.fromEntries(resetKeys.map((key) => [key, registry.getJourneyActivityResetPatch(key)])),
  });

  return { ...perSpecies, shared };
}
