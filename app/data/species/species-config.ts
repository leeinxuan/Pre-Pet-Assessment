/**
 * @deprecated 請直接由 `app/data/species/index.ts` 匯入。
 *
 * 保留這個舊路徑供既有 import 相容使用；所有值與型別都直接轉出正式
 * 物種註冊表，不再組裝第二份設定或回頭依賴 speciesGameConfig.ts。
 */
export {
  speciesConfigs as speciesConfig,
  getSpeciesConfig,
  getSpeciesCopy,
  getBreedForSpecies,
  dogConfig,
  catConfig,
  rabbitConfig,
  birdConfig,
  hamsterConfig,
} from "./index";

export type { SpeciesConfig } from "./index";
export type { SpeciesId } from "../shared/types";
