import { dogConfig } from "./dog/index";
import { catConfig } from "./cat/index";
import { rabbitConfig } from "./rabbit/index";
import { birdConfig } from "./bird/index";
import { hamsterConfig } from "./hamster/index";
import { geckoConfig } from "./gecko/index";
import type { SpeciesId } from "../shared/types";
import type { RoomFlowConfig } from "../shared/species-config-types";

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
    copy: dogConfig.copy,
    breeds: dogConfig.selection.breeds,
    roomItems: dogConfig.preparation.roomItems,
    hazards: dogConfig.preparation.hazards,
    trunkItems: dogConfig.preparation.trunkItems,
    roomFlow: dogConfig.preparation.roomFlow as unknown as RoomFlowConfig,
  },
  cat: {
    ...catConfig,
    copy: catConfig.copy,
    breeds: catConfig.selection.breeds,
    roomItems: catConfig.preparation.roomItems,
    hazards: catConfig.preparation.hazards,
    trunkItems: catConfig.preparation.trunkItems,
    roomFlow: undefined,
  },
  rabbit: {
    ...rabbitConfig,
    copy: rabbitConfig.copy,
    breeds: rabbitConfig.selection.breeds,
    roomItems: rabbitConfig.preparation.roomItems,
    hazards: rabbitConfig.preparation.hazards,
    trunkItems: rabbitConfig.preparation.trunkItems,
    roomFlow: rabbitConfig.preparation.roomFlow as unknown as RoomFlowConfig,
  },
  bird: {
    ...birdConfig,
    copy: birdConfig.copy,
    breeds: birdConfig.selection.breeds,
    roomItems: birdConfig.preparation.roomItems,
    hazards: birdConfig.preparation.hazards,
    trunkItems: birdConfig.preparation.trunkItems,
    roomFlow: birdConfig.preparation.roomFlow as unknown as RoomFlowConfig,
  },
  hamster: {
    ...hamsterConfig,
    copy: hamsterConfig.copy,
    breeds: hamsterConfig.selection.breeds,
    roomItems: hamsterConfig.preparation.roomItems,
    hazards: hamsterConfig.preparation.hazards,
    trunkItems: hamsterConfig.preparation.trunkItems,
    roomFlow: hamsterConfig.preparation.roomFlow as unknown as RoomFlowConfig,
  },
  gecko: {
    ...geckoConfig,
    copy: geckoConfig.copy,
    breeds: geckoConfig.selection.breeds,
    roomItems: geckoConfig.preparation.roomItems,
    hazards: geckoConfig.preparation.hazards,
    trunkItems: geckoConfig.preparation.trunkItems,
    roomFlow: geckoConfig.preparation.roomFlow as unknown as RoomFlowConfig,
  },
} as const;
export type SpeciesConfig = (typeof speciesConfigs)[SpeciesId];

export function getSpeciesConfig(species: string | undefined): SpeciesConfig {
  return speciesConfigs[species as SpeciesId] ?? speciesConfigs.dog;
}

/** 由已註冊的品種資料找回所屬物種，供品種題等共用流程使用。 */
export function getSpeciesConfigForBreed(breedId: string): SpeciesConfig {
  return (Object.values(speciesConfigs) as SpeciesConfig[])
    .find((config) => config.selection.breeds.some((breed) => breed.id === breedId))
    ?? speciesConfigs.dog;
}

/** 共用元件讀取正式註冊表提供的物種文案。 */
export function getSpeciesCopy(species: string | undefined) {
  return getSpeciesConfig(species).copy;
}

export function getBreedForSpecies(species: string | undefined, breedId: string | undefined) {
  return getSpeciesConfig(species).selection.breeds.find((breed) => breed.id === breedId);
}

export { dogConfig, catConfig, rabbitConfig, birdConfig, hamsterConfig, geckoConfig };
