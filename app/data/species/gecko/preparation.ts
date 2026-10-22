import type { DepartureSceneConfig, HazardItem, RoomItem, RoomSceneConfig, TrunkItem } from "../../../game-types";
import { sharedAssets } from "../../shared/assets";
import type { RoomFlowConfig } from "../../shared/species-config-types";
import { geckoAssets } from "./assets";

export const geckoRoomDoorplatePlacement = {
  desktop: { x: 57, y: 13, width: 25 },
  desktopText: { left: 15, top: 62, width: 70, height: 13, fontSize: 15 },
  mobile: { x: 33, y: 20, width: 40 },
  mobileText: { left: 4, top: 56, width: 95, height: 20, fontSize: 16 },
} as const;

export const geckoHazards: HazardItem[] = [
  {
    id: "insecticide-spray",
    label: "殺蟲劑噴霧",
    icon: "⚠",
    image: geckoAssets.room.insecticideSpray,
    placement: { x: 25, y: 65, width: 9, layer: 4 },
    mobilePlacement: { x: 18, y: 30, width: 16 },
    danger: "對守宮具強烈毒性，微量吸入或皮膚接觸可能致命，且藥效在環境中殘留。",
    handling: "請收入密閉櫃或搬至守宮無法接觸的空間。",
  },
  {
    id: "essential-oil-diffuser",
    label: "精油擴香器",
    icon: "⚠",
    image: geckoAssets.room.essentialOilDiffuser,
    placement: { x: 45, y: 56, width: 12, layer: 4 },
    mobilePlacement: { x: 72, y: 26, width: 16 },
    danger: "精油揮發物對爬蟲類呼吸道有刺激性，長期暴露可能導致呼吸異常。",
    handling: "使用時請關閉爬蟲缸所在空間，保持通風。",
  },
  {
    id: "loose-sand-substrate",
    label: "細沙/爬蟲沙",
    icon: "⚠",
    image: geckoAssets.room.looseSandSubstrate,
    placement: { x: 52, y: 75, width: 16, layer: 4 },
    mobilePlacement: { x: 50, y: 75, width: 22 },
    danger: "守宮覓食時會誤食鬆散底材，細沙積在腸道可能造成腸阻塞，嚴重時致命。",
    handling: "請替換為安全底材（椰子纖維、紙巾或磁磚）。",
  },
  {
    id: "openings",
    label: "牆縫/管道開口",
    icon: "↗",
    placement: { x: 82, y: 62, width: 1, layer: 4 },
    hotspot: { desktop: { x: 92, y: 40, width: 14, height: 62 }, mobile: { x: 74, y: 57, width: 20, height: 30 } },
    danger: "守宮體型小、善於穿縫，逃脫後極難救援。",
    handling: "請封閉所有牆縫與管道開口。",
  },
];

/**
 * 前三件是全室視角的入口用品；其餘用品只在爬蟲缸內部可放置。
 * 物品欄順序即遊戲引導順序，避免讓共用元件認得守宮 item id。
 */
export const geckoRoomItems: RoomItem[] = [
  {
    id: "gecko-terrarium", label: "爬蟲專用玻璃缸", icon: "▣", image: geckoAssets.room.terrarium, sceneImage: geckoAssets.room.terrariumFront,
    placement: { x: 80, y: 43, width: 15, layer: 2 }, mobilePlacement: { x: 56, y: 61, width: 52 }, required: true, need: "安全", expenseId: "gecko-terrarium",
    description: "建議至少 60×45×30 cm，附緊固式網蓋，防止逃脫。",
  },
  {
    id: "first-feeder-insects", label: "首批活體餌料昆蟲（蟋蟀或麵包蟲）及飼育容器", icon: "◉", image: geckoAssets.room.feederInsects, sceneImage: geckoAssets.room.feederInsectsFront,
    placement: { x: 57, y: 60, width: 10, layer: 5 }, mobilePlacement: { x: 65, y: 70, width: 18 }, required: true, need: "飲食", expenseId: "gecko-feeder-insects-initial",
    description: "守宮接回後第 3–7 天適應穩定再開始餵食；餌料昆蟲須先備好，存放於通氣飼育盒避免逃脫。",
  },
  {
    id: "calcium-and-vitamin-supplement", label: "鈣粉與綜合維他命粉", icon: "✦", image: geckoAssets.room.calciumSupplement,
    placement: { x: 45, y: 63, width: 6, layer: 5 }, mobilePlacement: { x: 45, y: 71, width: 15 }, required: true, need: "飲食", expenseId: "gecko-supplements-initial",
    description: "每次餵食前以鈣粉沾裹昆蟲；每週 1–2 次改用含 D3 鈣粉或綜合維他命粉輪替使用，維持鈣磷平衡。",
  },
  {
    id: "safe-substrate", label: "安全底材（椰子纖維磚/紙巾/磁磚）", icon: "▤", image: geckoAssets.room.safeSubstrate,
    placement: { x: 50, y: 77, width: 50, layer: 1 }, mobilePlacement: { x: 50, y: 78, width: 65 }, required: true, need: "安全", expenseId: "gecko-substrate",
    description: "鋪設全缸底部，不可使用細沙或鬆散顆粒底材，避免誤食造成腸阻塞。",
  },
  {
    id: "heat-mat", label: "加熱片（爬蟲專用）", icon: "♨", image: geckoAssets.room.heatMat,
    placement: { x: 20, y: 72, width: 16, layer: 3 }, mobilePlacement: { x: 21, y: 73, width: 23 }, required: true, need: "安全", expenseId: "gecko-heat-mat",
    description: "貼附缸底一側，建立暖側（底部溫度約 28–32°C），另一側保持涼側，讓守宮自行選擇溫度。",
  },
  {
    id: "thermometer-hygrometer", label: "數位溫濕度計（至少 2 個）", icon: "◷", image: geckoAssets.room.thermometerHygrometer,
    placement: { x: 72, y: 25, width: 12, layer: 6 }, required: true, need: "安全", expenseId: "gecko-thermometer-2",
    description: "分別置於暖側與涼側，隨時確認溫度梯度是否正確，濕度維持 30–50%。",
    sceneParts: [
      { id: "cool-side", image: geckoAssets.room.thermometerHygrometerCool, placement: { x: 22, y: 13, width: 23, layer: 6 }, mobilePlacement: { x: 18, y: 32, width: 16 } },
      { id: "warm-side", image: geckoAssets.room.thermometerHygrometerWarm, placement: { x: 90, y: 88, width: 23, layer: 6 }, mobilePlacement: { x: 78, y: 32, width: 16 } },
    ],
  },
  {
    id: "warm-hide", label: "暖側躲避屋", icon: "⌂", image: geckoAssets.room.warmHide,
    placement: { x: 77, y: 65, width: 25, layer: 3 }, mobilePlacement: { x: 25, y: 57, width: 25 }, required: true, need: "休息", expenseId: "gecko-warm-hide",
    description: "放置於加熱片正上方，讓守宮在需要溫暖時有隱蔽空間休息消化。",
  },
  {
    id: "cool-hide", label: "涼側躲避屋", icon: "⌂", image: geckoAssets.room.coolHide,
    placement: { x: 22, y: 70, width: 25, layer: 3 }, mobilePlacement: { x: 73, y: 58, width: 25 }, required: true, need: "休息", expenseId: "gecko-cool-hide",
    description: "放置於缸內涼側，讓守宮在過熱時能快速退到陰涼處。",
  },
  {
    id: "moist-hide", label: "濕躲避屋（脫皮盒）", icon: "◒", image: geckoAssets.room.moistHide,
    placement: { x: 51, y: 58, width: 25, layer: 3 }, mobilePlacement: { x: 51, y: 54, width: 24 }, required: true, need: "休息", expenseId: "gecko-moist-hide",
    description: "內部鋪濕潤椰子纖維或水苔，維持局部高濕度，協助守宮完整蛻皮，避免趾端殘皮。",
  },
  {
    id: "shallow-water-dish", label: "淺水碟", icon: "◡", image: geckoAssets.room.shallowWaterDish,
    placement: { x: 60, y: 77, width: 15, layer: 6 }, mobilePlacement: { x: 67, y: 70, width: 15 }, required: true, need: "飲食", expenseId: "gecko-water-dish",
    description: "每日換新鮮水，守宮飲水量少但仍需固定供水；水碟不可太深，以免守宮溺水。",
  },
  {
    id: "calcium-dish", label: "補鈣碟（放置散裝鈣粉）", icon: "◌", image: geckoAssets.room.calciumDish,
    placement: { x: 45, y: 77, width: 15, layer: 6 }, mobilePlacement: { x: 38, y: 70, width: 14 }, required: true, need: "飲食", expenseId: "gecko-calcium-dish",
    description: "在缸內常備一小碟無 D3 鈣粉，讓守宮可依需求自行舔食補充。",
  },
];

export const geckoTrunkItems: TrunkItem[] = [
  { id: "gecko-transport-box", label: "爬蟲專用運輸盒（附通氣孔）", kind: "supply", image: geckoAssets.preparation.transportBox, description: "選用可遮光的小型塑膠盒或布袋，減少運輸途中的視覺刺激，讓守宮保持冷靜。", preparedLabel: "已準備", expenseIds: ["gecko-transport-box"], placement: { x: 48, y: 60, width: 20, layer: 5 } },
  { id: "hand-warmer-or-heat-pack", label: "暖暖包（氣溫低時備用）", kind: "supply", image: geckoAssets.preparation.heatPack, description: "氣溫低於 20°C 時，在運輸盒外層放置暖暖包維持溫度，避免守宮受寒，不可直接接觸守宮。", preparedLabel: "已準備", expenseIds: ["gecko-heat-pack"], placement: { x: 35, y: 65, width: 12, layer: 6 } },
];

export const geckoRoomFlow: RoomFlowConfig = {
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
    hazardInstruction: "在把{petName}帶回家前，先檢查生活空間。請點擊場景中的危險物品，先將它們收好。",
    fenceInstruction: "危險物品已收好。先決定 {petName} 的生活角落，把爬蟲缸放好，再備好餌料與補充品吧。",
    fencePlacedInstruction: "外部用品備齊後，就能點進爬蟲缸佈置裡面。",
    entryReadyInstruction: "都準備好了！點進爬蟲缸，為 {petName} 配置內部空間吧。",
    interiorInstruction: "爬蟲缸已就定位。請先鋪設底材，再依序放入其他生活物品。",
    lockedInstruction: "請先鋪好安全底材，才能配置其他缸內用品。",
    entryLabel: "查看爬蟲缸內部配置",
  },
};

export const geckoRoomScene: RoomSceneConfig = {
  backgroundAlt: "守宮生活空間",
  interiorBackgroundAlt: "守宮爬蟲缸內部配置",
  doorplate: { image: sharedAssets.nameplate, alt: "守宮名字名牌", placement: geckoRoomDoorplatePlacement },
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
