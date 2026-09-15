import { dogConfig } from "./dog/index";
import { catConfig } from "./cat/index";
import { rabbitConfig } from "./rabbit/index";
import { birdConfig } from "./bird/index";
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
  rabbit: {
    ...rabbitConfig,
    copy: speciesGameConfig.rabbit.copy,
    breeds: rabbitConfig.selection.breeds,
    roomItems: rabbitConfig.preparation.roomItems,
    hazards: rabbitConfig.preparation.hazards,
    trunkItems: rabbitConfig.preparation.trunkItems,
  },
  bird: {
    ...birdConfig,
    copy: speciesGameConfig.bird.copy,
    breeds: birdConfig.selection.breeds,
    roomItems: birdConfig.preparation.roomItems,
    hazards: birdConfig.preparation.hazards,
    trunkItems: birdConfig.preparation.trunkItems,
  },
} as const;
export type SpeciesConfig = (typeof speciesConfigs)[SpeciesId];

export function getSpeciesConfig(species: string | undefined): SpeciesConfig {
  if (species === "cat") return speciesConfigs.cat;
  if (species === "rabbit") return speciesConfigs.rabbit;
  if (species === "bird") return speciesConfigs.bird;
  return speciesConfigs.dog;
}

/** 舊共用文案在完全搬移前的相容入口。 */
export function getSpeciesCopy(species: string | undefined) {
  if (species === "cat") return speciesGameConfig.cat.copy;
  if (species === "rabbit") return speciesGameConfig.rabbit.copy;
  if (species === "bird") return speciesGameConfig.bird.copy;
  return speciesGameConfig.dog.copy;
}

export function getBreedForSpecies(species: string | undefined, breedId: string | undefined) {
  return getSpeciesConfig(species).selection.breeds.find((breed) => breed.id === breedId);
}

export { dogConfig, catConfig, rabbitConfig, birdConfig };
