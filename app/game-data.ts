import type {
  CareMember,
  ExpenseRecord,
  HazardItem,
  Profile,
  RoomItem,
  Scenario,
  TrunkItem,
} from "./game-types";
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

/*export const hazards: HazardItem[] = [
  // Mobile hazard positions:
  // 在這裡調整手機版「布置房間」危險物品的位置與大小。
  // mobilePlacement 的 x / y / width 都是百分比，基準是手機版 1:1 房間容器；不會影響桌機版 placement。
  { id: "small-parts", label: "小物品", icon: "●", image: "/assets/room/small-items.png", placement: { x: 40, y: 75, width: 12, layer: 5 }, mobilePlacement: { x: 80, y: 55, width: 16 }, danger: "容易被誤吞，可能造成噎住或腸胃阻塞。", handling: "收進小狗無法取得的抽屜或收納盒。" },
  { id: "chocolate", label: "巧克力", icon: "🍫", image: "/assets/room/chocolate.png", placement: { x: 89, y: 78, width: 10, layer: 5  }, mobilePlacement: { x: 89, y: 78, width: 16 }, danger: "含有不適合狗狗的成分，可能危害健康。", handling: "放進有門的高處櫃子。" },
  { id: "chemicals", label: "一般清潔劑", icon: "🧴", image: "/assets/room/detergent.png", placement: { x: 62, y: 64, width: 10, layer: 5 }, mobilePlacement: { x: 55, y: 65, width: 15 }, danger: "一般清潔劑可能含有刺激性或不適合寵物接觸的成分。", handling: "應收在牠碰不到的地方；日常清潔請選擇寵物專用清潔用品。" },
  { id: "cables", label: "電線", icon: "🔌", image: "/assets/room/wire.png", placement: { x: 12, y: 78, width: 20, layer: 5 }, mobilePlacement: { x: 15, y: 78, width: 25 }, danger: "可能被啃咬，造成受傷或觸電。", handling: "整理固定或加裝電線保護套。" },
];*/
/** @deprecated 請改至 data/species/dog/preparation.ts 調整。 */
export const hazards = dogHazards;

// Mobile feeding item positions:
// 在這裡調整手機版「準備第一餐」房間裡狗狗、裝水碗、裝食物碗的位置與大小。
// left / bottom / width / maxHeight 都是百分比，基準是手機版 1:1 餵食房間容器；不會影響桌機版。
/** @deprecated 請改至 data/species/dog/layout.ts 調整。 */
export const arrivalMealMobilePlacements = dogArrivalMealMobilePlacements;

/*export const trunkItems: TrunkItem[] = [
  {
    id: "id", label: "身分證", kind: "document", image: "/assets/car/id-card.png", preparedLabel: "已攜帶",
    description: "領養單位可能需要確認領養人的身分與聯絡資料，出發前請依通知準備有效身分證明。",
    reason: "方便領養單位依其評估與交接流程核對申請人資料。",
    caution: "實際需要攜帶的文件，請依領養單位通知及評估流程確認。",
    sourceLabel: "領養單位提供的領養評估單與接回注意事項",
    feedback: "身分證已放入文件夾。", placement: { x: 20, y: 36, width: 15, layer: 4 },
  },
  {
    id: "documents", label: "飼養文件", kind: "document", image: "/assets/car/adoption-documents.png", preparedLabel: "已攜帶",
    description: "請攜帶家中環境照片；如有租屋，須提供房東許可之證明。",
    reason: "請攜帶家中環境照片；如有租屋，須提供房東許可之證明。",
    caution: "實際需要攜帶的文件，請依領養單位通知及評估流程確認。",
    sourceLabel: "領養單位提供的領養評估單與接回注意事項",
    feedback: "飼養文件已放入文件夾。", placement: { x: 22, y: 32, width: 24, layer: 3 },
  },
  {
    id: "carrier-kit", label: "運輸籠＋尿墊", kind: "supply", image: "/assets/car/carrier.png", preparedLabel: "已準備",
    description: "運輸籠可降低行車途中小狗在車內移動或逃脫的風險；底部鋪設尿墊，可處理緊張或長途移動時可能發生的排泄與髒污。",
    reason: "提供平穩、可固定且不干擾駕駛的安全運輸空間。",
    caution: "運輸籠尺寸需合適並保持穩定；尿墊應鋪在籠內底部，而不是鋪滿後車廂。",
    sourceLabel: "動物醫療機構與領養單位提供的安全運輸建議",
    feedback: "尿墊已鋪入運輸籠，安全運輸設備準備完成。", expenseIds: ["carrier", "toilet"], placement: { x: 51, y: 60, width: 34, layer: 5 },
  },
  {
    id: "water-kit", label: "水碗", kind: "supply", image: "/assets/car/water-bottle.png", preparedLabel: "已準備",
    description: "途中應準備飲水及可使用的水碗，視小狗狀況與路程適時補充。行車中不要放置裝滿水且容易打翻的開放水碗。",
    reason: "途中可在安全停靠時補充飲水，避免脫水或一次喝得太急。",
    caution: "水碗與飲水應收妥於側邊，行車時不要讓開放容器在車內翻倒。",
    sourceLabel: "動物醫療機構提供的外出飲水與運輸照護建議",
    feedback: "水碗與飲水已收妥。", expenseIds: ["water-bowl"], placement: { x: 55, y: 67, width: 27, layer: 6 },
  },
  {
    id: "leash", label: "牽繩", kind: "supply", image: "/assets/car/leash.png", preparedLabel: "已準備",
    description: "上下車前應先確認牽繩及合適的胸背帶已正確使用，避免小狗在陌生地點掙脫或逃跑。",
    reason: "抵達後可先控制移動範圍，再安全地讓小狗離開運輸籠。",
    caution: "牽繩應捲好並放在容易取得的位置，不要纏繞運輸籠或散落在車廂中。",
    sourceLabel: "領養單位提供的接回注意事項與外出安全提醒",
    feedback: "牽繩已收好，抵達後可以先確認安全裝備再讓小狗下車。", expenseIds: ["leash"], placement: { x: 30, y: 60, width: 25, layer: 4 },
  },
  {
    id: "cleaner", label: "寵物專用清潔用品", kind: "supply", image: "/assets/room/cleaner.png", preparedLabel: "已準備",
    description: "小狗在陌生環境或移動途中可能因緊張而排泄或嘔吐，可準備清潔袋、擦拭用品及安全的清潔工具。",
    reason: "途中若發生排泄或髒污，可以盡快整理並維持運輸空間舒適。",
    caution: "包裝需密封，與飲水分開收納，也不要放進運輸籠或讓小狗直接咬到。",
    sourceLabel: "領養單位與動物醫療機構提供的接送清潔建議",
    feedback: "清潔用品已收妥，可以處理途中可能發生的髒污。", expenseIds: ["cleaner"], placement: { x: 35, y: 68, width: 12, layer: 8 },
  },
];

export const departureTrunkItems: TrunkItem[] = [
  trunkItems.find((item) => item.id === "id")!,
  trunkItems.find((item) => item.id === "documents")!,
  {
    id: "carrier", label: "運輸籠", kind: "supply", image: "/assets/car/carrier.png", preparedLabel: "已準備",
    description: "安全運輸籠可降低行車途中移動或逃脫的風險。", reason: "提供穩定的運輸空間。", caution: "確認尺寸合適並固定在平坦位置。",
    sourceLabel: "專案既有接回安全運輸建議", feedback: "運輸籠已放入後車廂。", expenseIds: ["carrier"], placement: { x: 51, y: 60, width: 34, layer: 5 },
  },
  {
    id: "pee-pad", label: "尿墊", kind: "supply", image: "/assets/car/pee-pad.png", preparedLabel: "已準備",
    description: "尿墊可協助處理移動途中可能發生的排泄與髒污。", reason: "讓運輸區域保持乾淨。", caution: "平整鋪在運輸籠預定位置下方。",
    sourceLabel: "專案既有接回安全運輸建議", feedback: "尿墊已放入後車廂底部。", expenseIds: ["toilet"], placement: { x: 49, y: 66, width: 20, layer: 6 },
  },
  trunkItems.find((item) => item.id === "water-kit")!,
  trunkItems.find((item) => item.id === "leash")!,
  trunkItems.find((item) => item.id === "cleaner")!,
];*/
/** @deprecated 請改至 data/species/dog/preparation.ts 調整。 */
export const trunkItems = dogTrunkItems;
/** @deprecated 請改至 data/species/dog/preparation.ts 調整。 */
export const departureTrunkItems = dogDepartureTrunkItems;

/** @deprecated 請改從 data/shared/legacy-scenarios.ts 匯入。 */
export { scenarios } from "./data/shared/legacy-scenarios";


