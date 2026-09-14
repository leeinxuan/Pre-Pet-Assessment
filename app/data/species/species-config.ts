import { breeds } from "../../game-data";
import { speciesGameConfig as legacySpeciesGameConfig } from "../speciesGameConfig";
import { catSpeciesData } from "./cat";
import { dogSpeciesData } from "./dog";
import { rabbitConfig } from "./rabbit";

export type SpeciesId = "dog" | "cat" | "rabbit";

/**
 * 共用畫面的唯一物種設定入口。
 * 目前保留 legacy config 的題庫／物品資料來源，讓搬移可逐步進行且不破壞流程；
 * 新元件請由此讀取，不要再於元件內分散判斷 dog/cat。
 */
export const speciesConfig = {
  dog: {
    ...legacySpeciesGameConfig.dog,
    breeds: dogSpeciesData.breeds,
    assets: dogSpeciesData.assets,
    lifeScenarios: dogSpeciesData.lifeScenarios,
    journeyItems: dogSpeciesData.journeyItems,
    breedChallenges: dogSpeciesData.breedChallenges,
    dailyActivity: "walking" as const,
  },
  cat: {
    ...legacySpeciesGameConfig.cat,
    breeds: breeds.filter((breed) => breed.species === "cat"),
    assets: catSpeciesData.assets,
    lifeScenarios: catSpeciesData.lifeScenarios,
    journeyItems: catSpeciesData.journeyItems,
    breedChallenges: catSpeciesData.breedChallenges,
    dailyBehaviorScenarioIds: catSpeciesData.dailyBehaviorScenarioIds,
    litterInspection: catSpeciesData.litterInspection,
    dailyActivity: "litter-inspection" as const,
  },
  rabbit: {
    ...legacySpeciesGameConfig.rabbit,
    breeds: rabbitConfig.selection.breeds,
    assets: rabbitConfig.assets,
    lifeScenarios: rabbitConfig.scenarios,
    journeyItems: rabbitConfig.journey.items,
    breedChallenges: rabbitConfig.breedChallenges,
    dailyBehaviorScenarioIds: rabbitConfig.journey.dailyBehaviorScenarioIds,
    dailyCheck: rabbitConfig.journey.dailyCheck,
    dailyActivity: "rabbit-daily-check" as const,
  },
} as const;

export type SpeciesConfig = (typeof speciesConfig)[SpeciesId];

export function getSpeciesConfig(species: string | undefined): SpeciesConfig {
  if (species === "cat") return speciesConfig.cat;
  if (species === "rabbit") return speciesConfig.rabbit;
  return speciesConfig.dog;
}

export function getBreedForSpecies(species: string | undefined, breedId: string | undefined) {
  return getSpeciesConfig(species).breeds.find((breed) => breed.id === breedId);
}
