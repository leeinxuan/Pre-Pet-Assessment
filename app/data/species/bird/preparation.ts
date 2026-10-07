import type { DepartureSceneConfig, HazardItem, RoomItem, RoomSceneConfig, TrunkItem } from "../../../game-types";
import { birdAssets } from "./assets";

export const birdRoomItems: RoomItem[] = [
  { id: "bird-cage", label: "方形金屬鳥籠", icon: "▦", image: birdAssets.room.cage, sceneImage: birdAssets.room.cageFront, placement: { x: 70, y: 40, width: 15, layer: 2 }, required: true, need: "安全", expenseId: "bird-cage", description: "方形籠提供可倚靠的角落；格柵間隙需依鳥體型選擇。" },
  { id: "food-initial", label: "主食飼料", icon: "◈", image: birdAssets.room.initialFood, placement: { x: 55, y: 60, width: 10, layer: 4 }, required: false, need: "飲食", expenseId: "bird-food-initial", description: "依食性選購：種子飼料、滋養丸或吸蜜粉。" },
  {
    id: "perch-set", label: "不同材質的棲木", icon: "━", image: birdAssets.room.perch,
    placement: { x: 50, y: 54, width: 30, layer: 3 }, required: true, need: "休息", expenseId: "bird-perch-set",
    description: "不同高度與粗細的棲木能分散足部壓力。",
    // 籠內三張棲木分開定位；每筆均可獨立調整桌機／手機位置、尺寸與圖層。
    sceneParts: [
      { id: "perch-1", image: birdAssets.room.perchParts[0], placement: { x: 30, y: 31, width: 42, layer: 5 }, mobilePlacement: { x: 31, y: 31, width: 42 } },
      { id: "perch-2", image: birdAssets.room.perchParts[1], placement: { x: 75, y: 60, width: 36, layer: 5 }, mobilePlacement: { x: 63, y: 51, width: 36 } },
      { id: "perch-3", image: birdAssets.room.perchParts[2], placement: { x: 40, y: 43, width: 38, layer: 5 }, mobilePlacement: { x: 35, y: 72, width: 38 } },
    ],
  },
  { id: "bird-food-bowl", label: "專用食碗", icon: "🥣", image: birdAssets.room.bowl, placement: { x: 85, y: 50, width: 30, layer: 4 }, required: true, need: "飲食", expenseId: "bird-food-bowl", description: "依食性提供專用飼料，並留意碗中是否只剩空殼。" },
  { id: "bird-water-bowl", label: "飲水器", icon: "💧", image: birdAssets.room.water, placement: { x: 77, y: 42, width: 30, layer: 3 }, required: true, need: "飲食", expenseId: "bird-water-bowl", description: "每天換水並清洗容器；避免過深容器造成跌落風險。" },
  { id: "bird-chew-toy", label: "天然啃咬玩具", icon: "✦", image: birdAssets.room.toy, placement: { x: 68, y: 25, width: 35, layer: 4 }, required: false, need: "活動", expenseId: "bird-chew-toy", description: "木材、麻繩等天然材質可提供安全啃咬與紓壓。" },
  { id: "bird-climbing-toy", label: "攀爬玩具", icon: "⌁", image: birdAssets.room.climbingToy, placement: { x: 12, y: 48, width: 40, layer: 4 }, required: false, need: "活動", expenseId: "bird-climbing-toy", description: "增加籠內活動與探索機會，定期輪換更有新鮮感。" },
  { id: "bird-feces-tray", label: "籠底墊料", icon: "▤", image: birdAssets.room.tray, placement: { x: 50, y: 79, width: 28, layer: 3 }, required: true, need: "清潔", expenseIds: ["bird-feces-tray", "bird-cleaning-monthly"], description: "每天更換墊料，才能觀察糞便並維持環境衛生；可使用報紙、餐巾紙、紙棉等材質，避免使用有香氣的產品。" },
  { id: "bird-thermometer", label: "溫度計", icon: "℃", image: birdAssets.room.thermometer, placement: { x: 38, y: 23, width: 20, layer: 4 }, required: false, need: "安全", expenseId: "bird-thermometer", description: "鳥對溫度變化敏感，需要具體數據協助調整環境。" },
];

export const birdHazards: HazardItem[] = [
  { id: "teflon-pan", label: "鐵氟龍不沾鍋", icon: "⚠", image: birdAssets.room.hazards.teflonPan, placement: { x: 23, y: 65, width: 10, layer: 5 }, danger: "高溫可能產生對鳥致命的有毒氣體，養鳥家庭必須完全停用。", handling: "移除並改用不含鐵氟龍的鍋具。" },
  { id: "incense-candle", label: "線香／薰香蠟燭", icon: "♨", image: birdAssets.room.hazards.incenseCandle, placement: { x: 34, y: 63, width: 8, layer: 5 }, danger: "揮發性氣味與煙霧會傷害敏感的鳥類呼吸道。", handling: "不要在鳥的生活空間使用香氛或精油。" },
  { id: "spray-aerosol", label: "噴霧清潔劑／芳香劑", icon: "☁", image: birdAssets.room.hazards.sprayAerosol, placement: { x: 60, y: 85, width: 10, layer: 5 }, danger: "噴霧化學物質會刺激鳥類呼吸道。", handling: "改用無揮發、對鳥安全的清潔方式。" },
  { id: "toxic-plant", label: "有毒室內植物", icon: "✿", image: birdAssets.room.plant, placement: { x: 55, y: 55, width: 15, layer: 5 }, danger: "鳥可能啃咬植物，部分常見植物會造成中毒。", handling: "移出鳥能接觸的範圍並確認植物安全。" },
  { id: "mirror-toy", label: "鏡子／身形相似玩具", icon: "◇", image: birdAssets.room.hazards.mirrorToy, placement: { x: 40, y: 50, width: 12, layer: 5 }, danger: "長期把倒影當同類互動，可能影響社交並誘發發情。", handling: "移除鏡子，改提供可輪換的天然玩具。" },
  { id: "round-cage", label: "圓形鳥籠", icon: "○", image: birdAssets.room.hazards.roundCage, placement: { x: 70, y: 38, width: 18, layer: 5 }, danger: "圓形籠缺少角落可倚靠，長期可能增加緊迫。", handling: "更換為方形、尺寸與格柵合適的金屬鳥籠。" },
];

export const birdTrunkItems: TrunkItem[] = [
  { id: "bird-carrier", label: "外出籠／運輸箱", kind: "supply", image: birdAssets.preparation.carrier, visualScale: 1, preparedLabel: "已準備", description: "鳥必須在通風、堅固且間隙安全的外出籠中運送。", expenseIds: ["bird-carrier"], placement: { x: 45, y: 61, width: 25, layer: 5 } },
  { id: "cover-cloth", label: "遮光布／透氣布", kind: "supply", image: birdAssets.preparation.cover, preparedLabel: "已準備", description: "覆蓋外出籠可減少視覺刺激與緊迫。", expenseIds: ["bird-cover-cloth"], placement: { x: 45, y: 56, width: 22, layer: 6 } },
  { id: "species-food", label: "少量熟悉飼料", kind: "supply", image: birdAssets.preparation.food, preparedLabel: "已準備", description: "途中備少量符合食性的熟悉飼料。", expenseIds: ["bird-starter-food"], placement: { x: 28, y: 63, width: 16, layer: 6 } },
  { id: "water-supply", label: "防翻飲水容器", kind: "supply", image: birdAssets.preparation.water, preparedLabel: "已準備", description: "長途移動準備適量飲水，安全停靠時補充。", placement: { x: 57, y: 66, width: 12, layer: 6 } },
  { id: "id-card", visualClassName: "id", visualRole: "identity-card", label: "身分證", kind: "document", image: birdAssets.preparation.idCard, preparedLabel: "已攜帶", description: "辦理認養與核對身分時使用。", placement: { x: 20, y: 36, width: 15, layer: 4 } },
  { id: "adoption-documents", visualClassName: "documents", visualRole: "document-folder", label: "領養文件", kind: "document", image: birdAssets.preparation.documents, preparedLabel: "已攜帶", description: "請攜帶家中環境照片；如有租屋，須提供房東許可之證明。", placement: { x: 23, y: 32, width: 23, layer: 3 } },
];
export const birdRoomFlow = {
  initialBackground: birdAssets.room.background,
  safeBackground: birdAssets.room.background,
  interiorBackground: birdAssets.room.cageInterior,
  interiorSafeBackground: birdAssets.room.cageInteriorWithTray,
  interiorBackgroundAspectRatio: "9 / 16",
  floorHazardId: "",
  safeWhenAllHazards: true,
  fenceItemId: "bird-cage",
  interiorItemId: "bird-feces-tray",
  outsideItemIds: ["bird-cage", "food-initial"],
  entryRequiredItemIds: ["bird-cage", "food-initial"],
  floorHotspot: { desktop: { x: 0, y: 0, width: 0, height: 0 }, mobile: { x: 0, y: 0, width: 0, height: 0 } },
  copy: {
    fenceInstruction: "先決定 {petName} 的生活角落，把鳥籠放好吧。",
    fencePlacedInstruction: "鳥籠放好了！把飼料也準備好吧 🌿",
    entryReadyInstruction: "都備齊了！點進籠子幫 {petName} 佈置裡面吧 👆",
    interiorInstruction: "這就是 {petName} 的鳥籠。把需要的東西一件一件放進來吧。",
    lockedInstruction: "請先放好鳥籠，再準備主食飼料。",
    entryLabel: "查看鳥籠內部配置",
  },
} as const;

export const birdRoomScene: RoomSceneConfig = { backgroundAlt: "鳥兒生活空間", interiorBackgroundAlt: "鳥籠內部配置" };
export const birdDepartureScene: DepartureSceneConfig = { trunkBackground: "/assets/car/car-trunk.png", trunkBackgroundAlt: "打開的汽車後車廂", documentFolderImage: birdAssets.preparation.documents, documentFolderAlt: "飼養文件夾" };
export const birdPreparation = { roomItems: birdRoomItems, hazards: birdHazards, trunkItems: birdTrunkItems, roomFlow: birdRoomFlow, roomScene: birdRoomScene, departureScene: birdDepartureScene } as const;
