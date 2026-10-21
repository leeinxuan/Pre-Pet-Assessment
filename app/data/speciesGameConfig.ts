import type { SpeciesGameConfig } from "./shared/species-config-types";
import { dogConfig } from "./species/dog/index";
import { catConfig } from "./species/cat/index";
import { rabbitConfig } from "./species/rabbit/index";
import { birdConfig } from "./species/bird/index";
import { hamsterConfig } from "./species/hamster/index";
import { geckoConfig } from "./species/gecko/index";
import { catTrunkItems as catDepartureTrunkItems } from "./species/cat/preparation";

export type { SpeciesCopy, SpeciesGameConfig, SpeciesReportConfig, InteractionCompletionContent } from "./shared/species-config-types";
export type SpeciesId = "dog" | "cat" | "rabbit" | "bird" | "hamster" | "gecko";

/** @deprecated 請改至 data/species/cat/preparation.ts 匯入。 */
export const catTrunkItems = catDepartureTrunkItems;

/**
 * 舊版扁平設定的相容入口。所有內容均由各物種資料夾的正式設定組成，
 * 此檔不再保存任何物種資料副本。
 */
export const speciesGameConfig: Record<SpeciesId, SpeciesGameConfig> = {
  dog: {
    id: "dog", copy: dogConfig.copy, roomItems: dogConfig.preparation.roomItems,
    hazards: dogConfig.preparation.hazards, trunkItems: dogConfig.preparation.trunkItems,
    report: dogConfig.report,
    roomFlow: dogConfig.preparation.roomFlow,
  },
  cat: {
    id: "cat", copy: catConfig.copy, roomItems: catConfig.preparation.roomItems,
    hazards: catConfig.preparation.hazards, trunkItems: catConfig.preparation.trunkItems,
    report: catConfig.report,
  },
  rabbit: {
    id: "rabbit", copy: rabbitConfig.copy, roomItems: rabbitConfig.preparation.roomItems,
    hazards: rabbitConfig.preparation.hazards, trunkItems: rabbitConfig.preparation.trunkItems,
    report: rabbitConfig.report,
    roomFlow: rabbitConfig.preparation.roomFlow,
  },
  bird: {
    id: "bird", copy: birdConfig.copy, roomItems: birdConfig.preparation.roomItems,
    hazards: birdConfig.preparation.hazards, trunkItems: birdConfig.preparation.trunkItems,
    report: birdConfig.report,
    roomFlow: birdConfig.preparation.roomFlow,
  },
  hamster: {
    id: "hamster", copy: hamsterConfig.copy, roomItems: hamsterConfig.preparation.roomItems,
    hazards: hamsterConfig.preparation.hazards, trunkItems: hamsterConfig.preparation.trunkItems,
    report: hamsterConfig.report,
    roomFlow: hamsterConfig.preparation.roomFlow,
  },
  gecko: {
    id: "gecko", copy: geckoConfig.copy, roomItems: geckoConfig.preparation.roomItems,
    hazards: geckoConfig.preparation.hazards, trunkItems: geckoConfig.preparation.trunkItems,
    report: geckoConfig.report,
    roomFlow: geckoConfig.preparation.roomFlow,
  },
};

export function getSpeciesGameConfig(species: string): SpeciesGameConfig {
  return speciesGameConfig[species as SpeciesId] ?? speciesGameConfig.dog;
}
