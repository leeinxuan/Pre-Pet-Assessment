import { dogConfig } from "./dog/index";
import { catConfig } from "./cat/index";
import type { SpeciesId } from "../shared/types";
import { speciesGameConfig } from "../speciesGameConfig";

/**
 * 共用 UI 的單一物種設定入口。
 * 畫面應讀取 selection / preparation / journey / report / assets / layout，
 * 只有 WalkingActivity 與 LitterInspectionActivity 依 journey.activity 決定玩法。
 */
// Flat aliases below are deliberately kept while existing shared components migrate to nested sections.
// They prevent a behaviour change during the transition and do not duplicate content.
export const speciesConfigs = {
  dog: {
    ...dogConfig,
    copy: speciesGameConfig.dog.copy,
    breeds: dogConfig.selection.breeds,
    roomItems: dogConfig.preparation.roomItems,
    hazards: dogConfig.preparation.hazards,
    trunkItems: dogConfig.preparation.trunkItems,
  },
  cat: {
    ...catConfig,
    copy: speciesGameConfig.cat.copy,
    breeds: catConfig.selection.breeds,
    roomItems: catConfig.preparation.roomItems,
    hazards: catConfig.preparation.hazards,
    trunkItems: catConfig.preparation.trunkItems,
  },
} as const;
export type SpeciesConfig = (typeof speciesConfigs)[SpeciesId];

export function getSpeciesConfig(species: string | undefined): SpeciesConfig {
  return species === "cat" ? speciesConfigs.cat : speciesConfigs.dog;
}

/** 舊共用文案在完全搬移前的相容入口。 */
export function getSpeciesCopy(species: string | undefined) {
  return species === "cat" ? speciesGameConfig.cat.copy : speciesGameConfig.dog.copy;
}

export function getBreedForSpecies(species: string | undefined, breedId: string | undefined) {
  return getSpeciesConfig(species).selection.breeds.find((breed) => breed.id === breedId);
}

export { dogConfig, catConfig };
