import type { HazardItem, RoomItem, TrunkItem } from "../../../game-types";

/**
 * 犬隻房間用品。placement / mobilePlacement 是唯一的物件位置來源；
 * 桌機改 placement，手機改 mobilePlacement。
 */
export const dogRoomItems: RoomItem[] = [
  { id: "bed", label: "睡墊", icon: "🛏️", image: "/assets/dog/room/pet-bed.png", placement: { x: 67, y: 83, width: 32, layer: 2 }, mobilePlacement: { x: 62, y: 85, width: 45 }, required: true, need: "休息", expenseId: "bed", description: "提供固定、安靜的休息位置。" },
  { id: "toy", label: "玩具", icon: "🦴", image: "/assets/dog/room/toy.png", placement: { x: 73, y: 80, width: 10, layer: 4 }, mobilePlacement: { x: 69, y: 80, width: 15 }, required: true, need: "活動", expenseId: "toy", description: "幫助小狗消耗精力與建立正向互動。" },
  { id: "water-bowl", label: "水碗", icon: "💧", image: "/assets/dog/room/water-bowl.png", placement: { x: 32, y: 90, width: 12, layer: 3 }, mobilePlacement: { x: 10, y: 90, width: 18 }, required: true, need: "飲食", expenseId: "water-bowl", description: "每天確認有乾淨、足量的飲水。" },
  { id: "food-bowl", label: "狗碗", icon: "🥣", image: "/assets/dog/room/food-bowl.png", placement: { x: 41, y: 90, width: 10, layer: 3 }, mobilePlacement: { x: 25, y: 90, width: 15 }, required: true, need: "飲食", expenseId: "food-bowl", description: "固定飲食器具，幫助建立規律餵食。" },
  { id: "toilet", label: "尿墊", icon: "▧", image: "/assets/dog/room/pee-pad.png", placement: { x: 15, y: 85, width: 20, layer: 1 }, mobilePlacement: { x: 35, y: 70, width: 25 }, required: true, need: "排泄", expenseId: "toilet", description: "協助建立如廁位置，減少環境壓力。" },
  { id: "cleaner", label: "寵物專用清潔用品", icon: "🧼", image: "/assets/dog/room/cleaner.png", placement: { x: 39, y: 46, width: 10, layer: 3 }, mobilePlacement: { x: 10, y: 46, width: 18 }, required: true, need: "清潔", expenseId: "cleaner", description: "維持居家清潔，降低病原與異味。" },
  { id: "food", label: "飼料", icon: "🦴", image: "/assets/dog/room/food.png", placement: { x: 50, y: 85, width: 9, layer: 3 }, mobilePlacement: { x: 39, y: 86, width: 13 }, required: true, need: "飲食", expenseId: "starter-food", description: "選擇符合年齡、體型與健康需求的主食。" },
];

export const dogHazards: HazardItem[] = [
  { id: "small-parts", label: "小物品", icon: "●", image: "/assets/dog/room/small-items.png", placement: { x: 40, y: 75, width: 12, layer: 5 }, mobilePlacement: { x: 80, y: 55, width: 16 }, danger: "容易被誤吞，可能造成噎住或腸胃阻塞。", handling: "收進小狗無法取得的抽屜或收納盒。" },
  { id: "chocolate", label: "巧克力", icon: "🍫", image: "/assets/shared/chocolate.png", placement: { x: 89, y: 78, width: 10, layer: 5 }, mobilePlacement: { x: 89, y: 78, width: 16 }, danger: "含有不適合狗狗的成分，可能危害健康。", handling: "放進有門的高處櫃子。" },
  { id: "chemicals", label: "一般清潔劑", icon: "🧴", image: "/assets/dog/room/detergent.png", placement: { x: 62, y: 64, width: 10, layer: 5 }, mobilePlacement: { x: 55, y: 65, width: 15 }, danger: "一般清潔劑可能含有刺激性或不適合寵物接觸的成分。", handling: "應收在牠碰不到的地方；日常清潔請選擇寵物專用清潔用品。" },
  { id: "cables", label: "電線", icon: "🔌", image: "/assets/dog/room/wire.png", placement: { x: 12, y: 78, width: 20, layer: 5 }, mobilePlacement: { x: 15, y: 78, width: 25 }, danger: "可能被啃咬，造成受傷或觸電。", handling: "整理固定或加裝電線保護套。" },
];

export const dogDepartureTrunkItems: TrunkItem[] = [
  { id: "id", label: "身分證", kind: "document", image: "/assets/car/id-card.png", preparedLabel: "已攜帶", description: "辦理認養與核對身分時使用。", placement: { x: 20, y: 36, width: 15, layer: 4 } },
  { id: "documents", label: "飼養文件", kind: "document", image: "/assets/car/adoption-documents.png", preparedLabel: "已攜帶", description: "請攜帶家中環境照片；如有租屋，須提供房東許可之證明。", placement: { x: 22, y: 32, width: 24, layer: 3 } },
  { id: "carrier", label: "運輸籠", kind: "supply", image: "/assets/car/carrier.png", preparedLabel: "已準備", description: "讓小狗在移動途中有安全固定的空間。", expenseIds: ["carrier"], placement: { x: 51, y: 60, width: 34, layer: 5 } },
  { id: "pee-pad", label: "尿墊", kind: "supply", image: "/assets/car/pee-pad.png", preparedLabel: "已準備", description: "接回途中可降低排泄與清潔壓力。", expenseIds: ["toilet"], reusedExpenseIds: ["toilet"], placement: { x: 49, y: 66, width: 20, layer: 6 } },
  { id: "water-kit", label: "水碗", kind: "supply", image: "/assets/car/water-bottle.png", preparedLabel: "已準備", description: "必要時補充飲水，避免長時間缺水。", expenseIds: ["water-bowl"], placement: { x: 55, y: 67, width: 27, layer: 6 } },
  { id: "leash", label: "牽繩", kind: "supply", image: "/assets/car/leash.png", preparedLabel: "已準備", description: "下車或移動時維持安全防護。", expenseIds: ["leash"], placement: { x: 30, y: 60, width: 25, layer: 4 } },
  { id: "cleaner", label: "寵物專用清潔用品", kind: "supply", image: "/assets/dog/room/cleaner.png", preparedLabel: "已準備", description: "處理接回途中可能發生的髒污。", expenseIds: ["cleaner"], placement: { x: 35, y: 68, width: 12, layer: 8 } },
];

/** 犬隻房間、危險物、接回與餵食的共用資料。 */
export const dogPreparation = { roomItems: dogRoomItems, hazards: dogHazards, trunkItems: dogDepartureTrunkItems } as const;
