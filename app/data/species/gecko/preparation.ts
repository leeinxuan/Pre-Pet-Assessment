import type { DepartureSceneConfig, HazardItem, RoomItem, RoomSceneConfig, TrunkItem } from "../../../game-types";
import { geckoAssets } from "./assets";

export const geckoHazards: HazardItem[] = [
  { id: "insecticide-spray", label: "殺蟲劑噴霧", icon: "⚠", placement: { x: 18, y: 30, width: 12, layer: 4 }, danger: "對守宮具強烈毒性，微量吸入或皮膚接觸可能致命，且藥效會在環境中殘留。", handling: "請收入密閉櫃或搬至守宮無法接觸的空間。" },
  { id: "essential-oil-diffuser", label: "精油擴香器", icon: "◌", placement: { x: 74, y: 26, width: 12, layer: 4 }, danger: "精油揮發物對爬蟲類呼吸道有刺激性，長期暴露可能導致呼吸異常。", handling: "使用時請關閉爬蟲缸所在空間，保持通風。" },
  { id: "loose-sand-substrate", label: "細沙／爬蟲沙", icon: "▧", placement: { x: 52, y: 75, width: 16, layer: 4 }, danger: "守宮覓食時會誤食鬆散底材，細沙積在腸道可能造成腸阻塞。", handling: "請替換為安全底材（椰子纖維、紙巾或磁磚）。" },
  { id: "open-storage-gap", label: "牆縫／管道開口", icon: "↗", placement: { x: 87, y: 50, width: 12, layer: 4 }, danger: "守宮體型小、善於穿縫，逃脫後極難救援。", handling: "請封閉所有牆縫與管道開口。" },
];

export const geckoRoomItems: RoomItem[] = [
  { id: "gecko-terrarium", label: "爬蟲專用玻璃缸", icon: "▣", placement: { x: 48, y: 55, width: 42, layer: 2 }, required: true, need: "安全", expenseId: "gecko-terrarium", description: "建議至少 60×45×30 cm，附緊固式網蓋，防止逃脫。" },
  { id: "heat-mat", label: "加熱片（爬蟲專用）", icon: "♨", placement: { x: 20, y: 72, width: 16, layer: 3 }, required: true, need: "安全", expenseId: "gecko-heat-mat", description: "貼附缸底一側，建立暖側 28–32°C 與涼側。" },
  { id: "thermometer-hygrometer", label: "數位溫濕度計（至少 2 個）", icon: "◷", placement: { x: 72, y: 25, width: 12, layer: 4 }, required: true, need: "安全", expenseId: "gecko-thermometer-2", description: "分別置於暖側與涼側，確認溫度梯度與濕度。" },
  { id: "warm-hide", label: "暖側躲避屋", icon: "⌂", placement: { x: 25, y: 55, width: 18, layer: 3 }, required: true, need: "休息", expenseId: "gecko-warm-hide", description: "放在加熱片正上方，讓守宮休息與消化。" },
  { id: "cool-hide", label: "涼側躲避屋", icon: "⌂", placement: { x: 73, y: 56, width: 18, layer: 3 }, required: true, need: "休息", expenseId: "gecko-cool-hide", description: "讓守宮過熱時能快速退到陰涼處。" },
  { id: "moist-hide", label: "濕躲避屋（脫皮盒）", icon: "◒", placement: { x: 51, y: 52, width: 17, layer: 3 }, required: true, need: "休息", expenseId: "gecko-moist-hide", description: "鋪濕潤椰子纖維或水苔，協助完整蛻皮。" },
  { id: "safe-substrate", label: "安全底材（椰子纖維磚／紙巾／磁磚）", icon: "▤", placement: { x: 50, y: 77, width: 50, layer: 1 }, required: true, need: "安全", expenseId: "gecko-substrate", description: "鋪設全缸底部，避免誤食細沙造成腸阻塞。" },
  { id: "shallow-water-dish", label: "淺水碟", icon: "◡", placement: { x: 66, y: 69, width: 10, layer: 4 }, required: true, need: "飲食", expenseId: "gecko-water-dish", description: "每日換新鮮水，水碟不可太深。" },
  { id: "calcium-dish", label: "補鈣碟", icon: "◌", placement: { x: 38, y: 68, width: 9, layer: 4 }, required: true, need: "飲食", expenseId: "gecko-calcium-dish", description: "常備一小碟無 D3 鈣粉，供守宮自行舔食。" },
  { id: "first-feeder-insects", label: "首批活體餌料昆蟲及飼育容器", icon: "◉", placement: { x: 56, y: 67, width: 10, layer: 4 }, required: true, need: "飲食", expenseId: "gecko-feeder-insects-initial", description: "適應穩定後開始餵食；餌料置於通氣飼育盒避免逃脫。" },
  { id: "calcium-and-vitamin-supplement", label: "鈣粉與綜合維他命粉", icon: "✦", placement: { x: 44, y: 67, width: 9, layer: 4 }, required: true, need: "飲食", expenseId: "gecko-supplements-initial", description: "每次餵食前以鈣粉沾裹昆蟲，定期輪替補充。" },
];

export const geckoTrunkItems: TrunkItem[] = [
  { id: "id-card", visualClassName: "id", visualRole: "identity-card", label: "身分證", kind: "document", description: "辦理認養與核對身分時使用。", preparedLabel: "已攜帶", placement: { x: 20, y: 35, width: 15, layer: 4 } },
  { id: "ownership-docs", visualClassName: "documents", visualRole: "document-folder", label: "飼養文件", kind: "document", description: "請攜帶家中環境照片；如有租屋，須提供房東許可證明。", preparedLabel: "已攜帶", placement: { x: 24, y: 32, width: 20, layer: 3 } },
  { id: "gecko-transport-box", label: "爬蟲專用運輸盒（附通氣孔）", kind: "supply", description: "選用可遮光的小型塑膠盒或布袋，減少視覺刺激。", preparedLabel: "已準備", expenseIds: ["gecko-transport-box"], placement: { x: 48, y: 60, width: 20, layer: 5 } },
  { id: "hand-warmer-or-heat-pack", label: "暖暖包（氣溫低時備用）", kind: "supply", description: "低於 20°C 時放在運輸盒外層保溫，不可直接接觸守宮。", preparedLabel: "已準備", expenseIds: ["gecko-heat-pack"], placement: { x: 66, y: 62, width: 12, layer: 4 } },
];

export const geckoRoomFlow = {
  initialBackground: geckoAssets.room.initial, safeBackground: geckoAssets.room.safe, interiorBackground: geckoAssets.room.terrariumInterior, interiorSafeBackground: geckoAssets.room.terrariumInterior,
  hasInteriorView: true, floorHazardId: "open-storage-gap", fenceItemId: "gecko-terrarium", interiorItemId: "safe-substrate", outsideItemIds: ["gecko-terrarium"], entryRequiredItemIds: ["gecko-terrarium"],
  floorHotspot: { desktop: { x: 87, y: 50, width: 12, height: 20 }, mobile: { x: 80, y: 50, width: 16, height: 20 } },
  copy: { hazardInstruction: "在把{petName}帶回家前，先收好環境中的危險物品並封閉所有縫隙。", fenceInstruction: "先放置爬蟲專用玻璃缸，為 {petName} 準備安全空間。", fencePlacedInstruction: "玻璃缸放好了！點進去佈置缸內環境吧。", interiorInstruction: "把守宮需要的用品一件一件放入缸內。", entryLabel: "查看爬蟲缸內部配置" },
} as const;

export const geckoRoomScene: RoomSceneConfig = { backgroundAlt: "守宮生活空間素材待補", interiorBackgroundAlt: "守宮爬蟲缸內部素材待補" };
export const geckoDepartureScene: DepartureSceneConfig = { trunkBackground: geckoAssets.preparation.trunkBackground, trunkBackgroundAlt: "接回守宮場景素材待補", documentFolderImage: geckoAssets.preparation.documents, documentFolderAlt: "飼養文件夾素材待補" };
export const geckoPreparation = { roomItems: geckoRoomItems, hazards: geckoHazards, trunkItems: geckoTrunkItems, roomFlow: geckoRoomFlow, roomScene: geckoRoomScene, departureScene: geckoDepartureScene } as const;
