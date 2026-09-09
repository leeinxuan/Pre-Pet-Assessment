import { dogBreeds } from "./data/species/dog/selection";
import { catBreeds } from "./data/species/cat/selection";
import { arrivalMealMobilePlacements as dogArrivalMealMobilePlacements, roomDoorplatePlacement as dogRoomDoorplatePlacement } from "./data/species/dog/layout";
import { dogDepartureTrunkItems, dogHazards, dogRoomItems, dogTrunkItems } from "./data/species/dog/preparation";
/** @deprecated 請改從 data/shared/app-flow.ts 匯入。 */
export {
  categories,
  initialMembers,
  initialProfile,
  intros,
  scenarioStages,
  stations,
} from "./data/shared/app-flow";
/** @deprecated 相容舊引用；實際品種資料位於 data/species/{dog,cat}/selection.ts。 */
export const breeds = [...dogBreeds, ...catBreeds];

/** @deprecated 請改從 data/shared/expenses.ts 匯入。 */
export {
  applySizeBasedExpenseAmount,
  expenseCatalog,
  getPetSizeForBreed,
  money,
  sizeBasedCosts,
} from "./data/shared/expenses";
export type { PetSize } from "./data/shared/expenses";
/** @deprecated 請改至 data/species/dog/preparation.ts 調整。 */
export const roomItems = dogRoomItems;

// Mobile doorplate position:
// 在這裡調整手機版「布置房間」門牌的位置與大小。
// mobile 的 x / y / width 都是百分比，基準是手機版 1:1 房間容器；不會影響桌機版門牌 CSS。
/** @deprecated 請改至 data/species/dog/layout.ts 調整。 */
export const roomDoorplatePlacement = dogRoomDoorplatePlacement;

/** @deprecated 請改至 data/species/dog/preparation.ts 調整。 */
export const hazards = dogHazards;

// Mobile feeding item positions:
// 在這裡調整手機版「準備第一餐」房間裡狗狗、裝水碗、裝食物碗的位置與大小。
// left / bottom / width / maxHeight 都是百分比，基準是手機版 1:1 餵食房間容器；不會影響桌機版。
/** @deprecated 請改至 data/species/dog/layout.ts 調整。 */
export const arrivalMealMobilePlacements = dogArrivalMealMobilePlacements;

/** @deprecated 請改至 data/species/dog/preparation.ts 調整。 */
export const trunkItems = dogTrunkItems;
/** @deprecated 請改至 data/species/dog/preparation.ts 調整。 */
export const departureTrunkItems = dogDepartureTrunkItems;

/** @deprecated 請改從 data/shared/legacy-scenarios.ts 匯入。 */
export { scenarios } from "./data/shared/legacy-scenarios";


