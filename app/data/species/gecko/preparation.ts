import type { DepartureSceneConfig, HazardItem, RoomItem, RoomSceneConfig, TrunkItem } from "../../../game-types";
import { sharedAssets } from "../../shared/assets";
import { geckoAssets } from "./assets";
import { geckoThermometerSceneParts } from "./layout";

export const geckoHazards: HazardItem[] = [
  {
    id: "insecticide-spray",
    label: "殺蟲劑",
    icon: "⚠",
    image: geckoAssets.room.insecticideSpray,
    placement: { x: 25, y: 65, width: 9, layer: 4 },
    mobilePlacement: { x: 18, y: 30, width: 16 },
    danger: "對守宮具強烈毒性，微量吸入或皮膚接觸可能致命，且藥效會在環境中殘留。",
    handling: "請收入密閉櫃或搬至守宮無法接觸的空間。",
  },
  {
    id: "essential-oil-diffuser",
    label: "精油擴香器",
    icon: "⚠",
    image: geckoAssets.room.essentialOilDiffuser,
    placement: { x: 55, y: 56, width: 12, layer: 4 },
    mobilePlacement: { x: 72, y: 26, width: 16 },
    danger: "精油揮發物對爬蟲類呼吸道有刺激性，長期暴露可能導致呼吸異常。",
    handling: "使用時請關閉爬蟲缸所在空間，保持通風。",
  },
  {
    id: "loose-sand-substrate",
    label: "鬆散細沙",
    icon: "⚠",
    image: geckoAssets.room.looseSandSubstrate,
    placement: { x: 52, y: 75, width: 16, layer: 4 },
    mobilePlacement: { x: 50, y: 75, width: 22 },
    danger: "守宮覓食時會誤食鬆散底材，細沙積在腸道可能造成腸阻塞。",
    handling: "請替換為安全底材（椰子纖維、紙巾或磁磚）。",
  },
  {
    id: "openings",
    label: "牆縫／管道開口",
    icon: "↗",
    placement: { x: 82, y: 62, width: 1, layer: 4 },
    hotspot: { desktop: { x: 76, y: 57, width: 14, height: 30 }, mobile: { x: 74, y: 57, width: 20, height: 30 } },
    danger: "守宮體型小、善於穿縫，逃脫後極難救援。",
    handling: "封閉牆縫與管道開口，讓生活空間沒有可鑽入的縫隙。",
  },
];

/**
 * 前三件是全室視角的入口用品；其餘用品只在爬蟲缸內部可放置。
 * 物品欄順序即遊戲引導順序，避免讓共用元件認得守宮 item id。
 */
export const geckoRoomItems: RoomItem[] = [
  {
    id: "gecko-terrarium", label: "爬蟲專用玻璃缸", icon: "▣", image: geckoAssets.room.terrarium, sceneImage: geckoAssets.room.terrariumFront,
    placement: { x: 79, y: 43, width: 15, layer: 2 }, mobilePlacement: { x: 56, y: 61, width: 52 }, required: true, need: "安全", expenseId: "gecko-terrarium",
    description: "建議至少 60×45×30 cm，附緊固式網蓋，防止逃脫。",
  },
  {
    id: "first-feeder-insects", label: "首批活體餌料昆蟲及飼育容器", icon: "◉", image: geckoAssets.room.feederInsects, sceneImage: geckoAssets.room.feederInsectsFront,
    placement: { x: 57, y: 60, width: 10, layer: 5 }, mobilePlacement: { x: 65, y: 70, width: 18 }, required: true, need: "飲食", expenseId: "gecko-feeder-insects-initial",
    description: "適應穩定後開始餵食；餌料置於通氣飼育盒避免逃脫。",
  },
  {
    id: "calcium-and-vitamin-supplement", label: "鈣粉與綜合維他命粉", icon: "✦", image: geckoAssets.room.calciumSupplement,
    placement: { x: 45, y: 63, width: 6, layer: 5 }, mobilePlacement: { x: 45, y: 71, width: 15 }, required: true, need: "飲食", expenseId: "gecko-supplements-initial",
    description: "每次餵食前以鈣粉沾裹昆蟲，定期輪替補充。",
  },
  {
    id: "safe-substrate", label: "安全底材（椰子纖維磚／紙巾／磁磚）", icon: "▤", image: geckoAssets.room.safeSubstrate,
    placement: { x: 50, y: 77, width: 50, layer: 1 }, mobilePlacement: { x: 50, y: 78, width: 65 }, required: true, need: "安全", expenseId: "gecko-substrate",
    description: "鋪設全缸底部，避免誤食細沙造成腸阻塞。",
  },
  {
    id: "heat-mat", label: "加熱片（爬蟲專用）", icon: "♨", image: geckoAssets.room.heatMat,
    placement: { x: 20, y: 72, width: 16, layer: 3 }, mobilePlacement: { x: 21, y: 73, width: 23 }, required: true, need: "安全", expenseId: "gecko-heat-mat",
    description: "貼附缸底一側，建立暖側 28–32°C 與涼側。",
  },
  {
    id: "thermometer-hygrometer", label: "數位溫濕度計（至少 2 個）", icon: "◷", image: geckoAssets.room.thermometerHygrometer,
    placement: { x: 72, y: 25, width: 12, layer: 6 }, required: true, need: "安全", expenseId: "gecko-thermometer-2",
    description: "分別置於暖側與涼側，確認溫度梯度與濕度。",
    sceneParts: [
      { ...geckoThermometerSceneParts.cool, image: geckoAssets.room.thermometerHygrometerCool },
      { ...geckoThermometerSceneParts.warm, image: geckoAssets.room.thermometerHygrometerWarm },
    ],
  },
  {
    id: "warm-hide", label: "暖側躲避屋", icon: "⌂", image: geckoAssets.room.warmHide,
    placement: { x: 77, y: 65, width: 25, layer: 3 }, mobilePlacement: { x: 25, y: 57, width: 25 }, required: true, need: "休息", expenseId: "gecko-warm-hide",
    description: "放在加熱片正上方，讓守宮休息與消化。",
  },
  {
    id: "cool-hide", label: "涼側躲避屋", icon: "⌂", image: geckoAssets.room.coolHide,
    placement: { x: 22, y: 70, width: 25, layer: 3 }, mobilePlacement: { x: 73, y: 58, width: 25 }, required: true, need: "休息", expenseId: "gecko-cool-hide",
    description: "讓守宮過熱時能快速退到陰涼處。",
  },
  {
    id: "moist-hide", label: "濕躲避屋（脫皮盒）", icon: "◒", image: geckoAssets.room.moistHide,
    placement: { x: 51, y: 58, width: 25, layer: 3 }, mobilePlacement: { x: 51, y: 54, width: 24 }, required: true, need: "休息", expenseId: "gecko-moist-hide",
    description: "鋪濕潤椰子纖維或水苔，協助完整蛻皮。",
  },
  {
    id: "shallow-water-dish", label: "淺水碟", icon: "◡", image: geckoAssets.room.shallowWaterDish,
    placement: { x: 60, y: 77, width: 15, layer: 6 }, mobilePlacement: { x: 67, y: 70, width: 15 }, required: true, need: "飲食", expenseId: "gecko-water-dish",
    description: "每日換新鮮水，水碟不可太深。",
  },
  {
    id: "calcium-dish", label: "補鈣碟", icon: "◌", image: geckoAssets.room.calciumDish,
    placement: { x: 45, y: 77, width: 15, layer: 6 }, mobilePlacement: { x: 38, y: 70, width: 14 }, required: true, need: "飲食", expenseId: "gecko-calcium-dish",
    description: "常備一小碟無 D3 鈣粉，供守宮自行舔食。",
  },
];

export const geckoTrunkItems: TrunkItem[] = [
  { id: "gecko-transport-box", label: "爬蟲專用運輸盒（附通氣孔）", kind: "supply", image: geckoAssets.preparation.transportBox, description: "選用可遮光的小型塑膠盒或布袋，減少視覺刺激。", preparedLabel: "已準備", expenseIds: ["gecko-transport-box"], placement: { x: 48, y: 60, width: 20, layer: 5 } },
  { id: "hand-warmer-or-heat-pack", label: "暖暖包（氣溫低時備用）", kind: "supply", image: geckoAssets.preparation.heatPack, description: "低於 20°C 時放在運輸盒外層保溫，不可直接接觸守宮。", preparedLabel: "已準備", expenseIds: ["gecko-heat-pack"], placement: { x: 35, y: 65, width: 12, layer: 6 } },
];

export const geckoRoomFlow = {
  initialBackground: geckoAssets.room.initial,
  safeBackground: geckoAssets.room.sealed,
  interiorBackground: geckoAssets.room.terrariumInterior,
  interiorSafeBackground: geckoAssets.room.terrariumSubstrate,
  interiorBackgroundStates: [
    { whenItemIds: ["safe-substrate"], background: geckoAssets.room.terrariumSubstrate },
    { whenItemIds: ["safe-substrate", "heat-mat"], background: geckoAssets.room.terrariumHeatMat },
  ],
  hiddenPlacedItemIds: ["safe-substrate", "heat-mat"],
  interiorUnlockItemId: "safe-substrate",
  hasInteriorView: true,
  // 牆縫與管道共用一個熱區；封好後立即切換為已封閉的房間背景。
  floorHazardId: "openings",
  fenceItemId: "gecko-terrarium",
  interiorItemId: "safe-substrate",
  interiorRequiredItemIds: ["safe-substrate", "heat-mat", "thermometer-hygrometer", "warm-hide", "cool-hide", "moist-hide", "shallow-water-dish", "calcium-dish"],
  outsideItemIds: ["gecko-terrarium", "first-feeder-insects", "calcium-and-vitamin-supplement"],
  entryRequiredItemIds: ["gecko-terrarium", "first-feeder-insects", "calcium-and-vitamin-supplement"],
  floorHotspot: { desktop: { x: 0, y: 0, width: 0, height: 0 }, mobile: { x: 0, y: 0, width: 0, height: 0 } },
  copy: {
    hazardInstruction: "在把{petName}帶回家前，先收好環境中的危險物品並封閉所有縫隙。",
    fenceInstruction: "先決定 {petName} 的生活角落，把爬蟲缸、首批餌料與補充品備好吧。",
    fencePlacedInstruction: "外部用品備齊後，就能點進爬蟲缸佈置裡面。",
    entryReadyInstruction: "都準備好了！點進爬蟲缸，為 {petName} 配置內部空間吧。",
    interiorInstruction: "先鋪安全底材，再一件一件放入缸內用品。",
    lockedInstruction: "請先鋪好安全底材，才能配置其他缸內用品。",
    entryLabel: "查看爬蟲缸內部配置",
  },
} as const;

export const geckoRoomScene: RoomSceneConfig = {
  backgroundAlt: "守宮生活空間",
  interiorBackgroundAlt: "守宮爬蟲缸內部配置",
  doorplate: { image: sharedAssets.nameplate, alt: "守宮名字名牌" },
};
export const geckoDepartureScene: DepartureSceneConfig = {
  trunkBackground: geckoAssets.preparation.trunkBackground,
  trunkBackgroundAlt: "打開的汽車後車廂",
};
export const geckoPreparation = {
  roomItems: geckoRoomItems,
  hazards: geckoHazards,
  trunkItems: geckoTrunkItems,
  roomFlow: geckoRoomFlow,
  roomScene: geckoRoomScene,
  departureScene: geckoDepartureScene,
} as const;
