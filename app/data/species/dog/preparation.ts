import type { HazardItem, RoomItem, TrunkItem } from "../../../game-types";

/**
 * 犬隻房間用品。placement / mobilePlacement 是唯一的物件位置來源；
 * 桌機改 placement，手機改 mobilePlacement。
 */
export const dogRoomItems: RoomItem[] = [
  { id: "bed", label: "睡墊", icon: "🛏️", image: "/assets/room/pet-bed.png", placement: { x: 67, y: 83, width: 32, layer: 2 }, mobilePlacement: { x: 62, y: 85, width: 45 }, required: true, need: "休息", expenseId: "bed", purpose: "提供固定且舒適的休息空間，讓小狗能安心休息。" },
  { id: "toy", label: "玩具", icon: "🦴", image: "/assets/room/toy.png", placement: { x: 73, y: 80, width: 10, layer: 4 }, mobilePlacement: { x: 69, y: 80, width: 15 }, required: true, need: "活動", expenseId: "toy", purpose: "合適的玩具可以提供活動與探索，也能減少因無聊產生的破壞行為。" },
  { id: "water-bowl", label: "水碗", icon: "💧", image: "/assets/room/water-bowl.png", placement: { x: 32, y: 90, width: 12, layer: 3 }, mobilePlacement: { x: 10, y: 90, width: 18 }, required: true, need: "飲食", expenseId: "water-bowl", purpose: "每天確認水碗乾淨，並提供足量的新鮮飲水。" },
  { id: "food-bowl", label: "狗碗", icon: "🥣", image: "/assets/room/food-bowl.png", placement: { x: 41, y: 90, width: 10, layer: 3 }, mobilePlacement: { x: 25, y: 90, width: 15 }, required: true, need: "飲食", expenseId: "food-bowl", purpose: "固定的飲食器具能幫助建立規律的餵食習慣。" },
  { id: "toilet", label: "尿墊", icon: "▧", image: "/assets/room/pee-pad.png", placement: { x: 15, y: 85, width: 20, layer: 1 }, mobilePlacement: { x: 35, y: 70, width: 25 }, required: true, need: "排泄", expenseId: "toilet", purpose: "排泄用品應與食物及休息位置分開，方便小狗建立習慣。" },
  { id: "cleaner", label: "寵物專用清潔用品", icon: "🧼", image: "/assets/room/cleaner.png", placement: { x: 39, y: 46, width: 10, layer: 3 }, mobilePlacement: { x: 10, y: 46, width: 18 }, required: true, need: "清潔", expenseId: "cleaner", purpose: "日常清潔請選擇寵物專用清潔用品，並妥善收納。" },
  { id: "food", label: "飼料", icon: "🦴", image: "/assets/room/food.png", placement: { x: 50, y: 85, width: 9, layer: 3 }, mobilePlacement: { x: 39, y: 86, width: 13 }, required: true, need: "飲食", expenseId: "starter-food", purpose: "選擇符合小狗年齡、體型及健康需求的主食，並妥善保存。" },
];

export const dogHazards: HazardItem[] = [
  { id: "small-parts", label: "小物品", icon: "●", image: "/assets/room/small-items.png", placement: { x: 40, y: 75, width: 12, layer: 5 }, mobilePlacement: { x: 80, y: 55, width: 16 }, danger: "容易被誤吞，可能造成噎住或腸胃阻塞。", handling: "收進小狗無法取得的抽屜或收納盒。" },
  { id: "chocolate", label: "巧克力", icon: "🍫", image: "/assets/room/chocolate.png", placement: { x: 89, y: 78, width: 10, layer: 5 }, mobilePlacement: { x: 89, y: 78, width: 16 }, danger: "含有不適合狗狗的成分，可能危害健康。", handling: "放進有門的高處櫃子。" },
  { id: "chemicals", label: "一般清潔劑", icon: "🧴", image: "/assets/room/detergent.png", placement: { x: 62, y: 64, width: 10, layer: 5 }, mobilePlacement: { x: 55, y: 65, width: 15 }, danger: "一般清潔劑可能含有刺激性或不適合寵物接觸的成分。", handling: "應收在牠碰不到的地方；日常清潔請選擇寵物專用清潔用品。" },
  { id: "cables", label: "電線", icon: "🔌", image: "/assets/room/wire.png", placement: { x: 12, y: 78, width: 20, layer: 5 }, mobilePlacement: { x: 15, y: 78, width: 25 }, danger: "可能被啃咬，造成受傷或觸電。", handling: "整理固定或加裝電線保護套。" },
];

export const dogTrunkItems: TrunkItem[] = [
  { id: "id", label: "身分證", kind: "document", image: "/assets/car/id-card.png", preparedLabel: "已攜帶", description: "領養單位可能需要確認領養人的身分與聯絡資料，出發前請依通知準備有效身分證明。", reason: "方便領養單位依其評估與交接流程核對申請人資料。", caution: "實際需要攜帶的文件，請依領養單位通知及評估流程確認。", sourceLabel: "領養單位提供的領養評估單與接回注意事項", feedback: "身分證已放入文件夾。", placement: { x: 20, y: 36, width: 15, layer: 4 } },
  { id: "documents", label: "飼養文件", kind: "document", image: "/assets/car/adoption-documents.png", preparedLabel: "已攜帶", description: "請攜帶家中環境照片；如有租屋，須提供房東許可之證明。", reason: "請攜帶家中環境照片；如有租屋，須提供房東許可之證明。", caution: "實際需要攜帶的文件，請依領養單位通知及評估流程確認。", sourceLabel: "領養單位提供的領養評估單與接回注意事項", feedback: "飼養文件已放入文件夾。", placement: { x: 22, y: 32, width: 24, layer: 3 } },
  { id: "carrier-kit", label: "運輸籠＋尿墊", kind: "supply", image: "/assets/car/carrier.png", preparedLabel: "已準備", description: "運輸籠可降低行車途中小狗在車內移動或逃脫的風險；底部鋪設尿墊，可處理緊張或長途移動時可能發生的排泄與髒污。", reason: "提供平穩、可固定且不干擾駕駛的安全運輸空間。", caution: "運輸籠尺寸需合適並保持穩定；尿墊應鋪在籠內底部，而不是鋪滿後車廂。", sourceLabel: "動物醫療機構與領養單位提供的安全運輸建議", feedback: "尿墊已鋪入運輸籠，安全運輸設備準備完成。", expenseIds: ["carrier", "toilet"], placement: { x: 51, y: 60, width: 34, layer: 5 } },
  { id: "water-kit", label: "水碗", kind: "supply", image: "/assets/car/water-bottle.png", preparedLabel: "已準備", description: "途中應準備飲水及可使用的水碗，視小狗狀況與路程適時補充。行車中不要放置裝滿水且容易打翻的開放水碗。", reason: "途中可在安全停靠時補充飲水，避免脫水或一次喝得太急。", caution: "水碗與飲水應收妥於側邊，行車時不要讓開放容器在車內翻倒。", sourceLabel: "動物醫療機構提供的外出飲水與運輸照護建議", feedback: "水碗與飲水已收妥。", expenseIds: ["water-bowl"], placement: { x: 55, y: 67, width: 27, layer: 6 } },
  { id: "leash", label: "牽繩", kind: "supply", image: "/assets/car/leash.png", preparedLabel: "已準備", description: "上下車前應先確認牽繩及合適的胸背帶已正確使用，避免小狗在陌生地點掙脫或逃跑。", reason: "抵達後可先控制移動範圍，再安全地讓小狗離開運輸籠。", caution: "牽繩應捲好並放在容易取得的位置，不要纏繞運輸籠或散落在車廂中。", sourceLabel: "領養單位提供的接回注意事項與外出安全提醒", feedback: "牽繩已收好，抵達後可以先確認安全裝備再讓小狗下車。", expenseIds: ["leash"], placement: { x: 30, y: 60, width: 25, layer: 4 } },
  { id: "cleaner", label: "寵物專用清潔用品", kind: "supply", image: "/assets/room/cleaner.png", preparedLabel: "已準備", description: "小狗在陌生環境或移動途中可能因緊張而排泄或嘔吐，可準備清潔袋、擦拭用品及安全的清潔工具。", reason: "途中若發生排泄或髒污，可以盡快整理並維持運輸空間舒適。", caution: "包裝需密封，與飲水分開收納，也不要放進運輸籠或讓小狗直接咬到。", sourceLabel: "領養單位與動物醫療機構提供的接送清潔建議", feedback: "清潔用品已收妥，可以處理途中可能發生的髒污。", expenseIds: ["cleaner"], placement: { x: 35, y: 68, width: 12, layer: 8 } },
];

export const dogDepartureTrunkItems: TrunkItem[] = [
  dogTrunkItems.find((item) => item.id === "id")!,
  dogTrunkItems.find((item) => item.id === "documents")!,
  { id: "carrier", label: "運輸籠", kind: "supply", image: "/assets/car/carrier.png", preparedLabel: "已準備", description: "安全運輸籠可降低行車途中移動或逃脫的風險。", reason: "提供穩定的運輸空間。", caution: "確認尺寸合適並固定在平坦位置。", sourceLabel: "專案既有接回安全運輸建議", feedback: "運輸籠已放入後車廂。", expenseIds: ["carrier"], placement: { x: 51, y: 60, width: 34, layer: 5 } },
  { id: "pee-pad", label: "尿墊", kind: "supply", image: "/assets/car/pee-pad.png", preparedLabel: "已準備", description: "尿墊可協助處理移動途中可能發生的排泄與髒污。", reason: "讓運輸區域保持乾淨。", caution: "平整鋪在運輸籠預定位置下方。", sourceLabel: "專案既有接回安全運輸建議", feedback: "尿墊已放入後車廂底部。", expenseIds: ["toilet"], placement: { x: 49, y: 66, width: 20, layer: 6 } },
  dogTrunkItems.find((item) => item.id === "water-kit")!,
  dogTrunkItems.find((item) => item.id === "leash")!,
  dogTrunkItems.find((item) => item.id === "cleaner")!,
];

/** 犬隻房間、危險物、接回與餵食的共用資料。 */
export const dogPreparation = { roomItems: dogRoomItems, hazards: dogHazards, trunkItems: dogDepartureTrunkItems } as const;
