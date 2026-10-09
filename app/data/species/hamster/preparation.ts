import type { DepartureSceneConfig, HazardItem, RoomItem, RoomSceneConfig, TrunkItem } from "../../../game-types";
import { hamsterAssets } from "./assets";

export const hamsterHazards: HazardItem[] = [
  { id: "cable", label: "電線", icon: "⌁", image: hamsterAssets.room.hazards.cable, placement: { x: 14, y: 77, width: 13, layer: 5 }, danger: "倉鼠有強烈啃咬天性，咬電線可能觸電或食入絕緣皮層。", handling: "整理固定電線或收入線槽，讓{petName}的活動區域無電線可及。" },
  { id: "loose-gap-cage", label: "格柵過大的舊籠", icon: "▥", image: hamsterAssets.room.hazards.looseGapCage, placement: { x: 84, y:84, width: 15, layer: 5 }, danger: "倉鼠擅長利用縫隙逃脫，格柵過寬或薄壁塑膠籠都難以防逃。", handling: "更換為格柵間距適當、不易啃穿的金屬籠具。" },
  { id: "direct-sunlight-spot", label: "陽光直曬的位置", icon: "☀", image: hamsterAssets.room.hazards.directSunlightSpot, placement: { x: 24, y: 43, width: 18, layer: 5 }, danger: "倉鼠靠耳朵的微血管散熱，對高溫耐受性低，直曬可能導致中暑。", handling: "將籠具位置移至陰涼、通風、無直曬的穩定角落。" },
  { id: "strong-scent-item", label: "強烈氣味物品", icon: "◌", image: hamsterAssets.room.hazards.strongScentItem, placement: { x: 24, y: 40, width: 6, layer: 5 }, danger: "小型哺乳類嗅覺靈敏，強烈香薰、化學揮發物可能刺激呼吸道。", handling: "籠具附近應避免使用香薰、殺蟲劑或強烈清潔劑。" },
];

export const hamsterRoomItems: RoomItem[] = [
  { id: "hamster-cage", label: "倉鼠籠", icon: "▥", image: hamsterAssets.room.cage, sceneImage: hamsterAssets.room.cageFront, placement: { x: 11, y: 60, width: 15, layer: 2 }, required: true, need: "安全", expenseId: "hamster-cage-setup", description: "防逃金屬籠；有足夠空間放置滾輪、巢穴與砂浴盆。" },
  { id: "pellet", label: "倉鼠綜合飼料", icon: "◉", image: hamsterAssets.feeding.pellet, placement: { x: 20, y: 78, width: 10, layer: 4 }, required: false, need: "飲食", expenseId: "hamster-pellet-initial", description: "倉鼠專用飼料為主食；入住前備妥足量，每日固定量餵食。" },
  { id: "bedding", label: "紙質墊料", icon: "▤", image: hamsterAssets.room.bedding, placement: { x: 72, y: 60, width: 38, layer: 1 }, required: false, need: "休息", expenseIds: ["hamster-bedding-initial", "hamster-bedding-monthly"], description: "足夠深度讓{petName}挖掘保暖；安全吸附力佳。" },
  { id: "exercise-wheel", label: "滾輪", icon: "◉", image: hamsterAssets.room.exerciseWheel, placement: { x: 72, y: 40, width: 35, layer: 3 }, required: true, need: "活動", expenseId: "hamster-wheel", description: "倉鼠必備；每晚大量奔跑釋放精力，選實心底板防腳趾卡入。" },
  { id: "water-bottle", label: "飲水器", icon: "♧", image: hamsterAssets.room.waterBottle, placement: { x: 11, y: 31, width: 23, layer: 3 }, required: true, need: "飲食", expenseId: "hamster-water-bottle", description: "衛生穩定，不易翻倒弄濕墊料；每天確認正常出水。" },
  { id: "food-bowl", label: "食碗", icon: "◡", image: hamsterAssets.room.foodBowl, placement: { x: 16, y: 70, width: 20, layer: 3 }, required: true, need: "飲食", expenseId: "hamster-food-bowl", description: "較重款式不易被推倒；每天固定量餵食。" },
  { id: "hideout", label: "巢箱", icon: "⌂", image: hamsterAssets.room.hideout, placement: { x: 83, y: 70, width: 21, layer: 3 }, required: true, need: "休息", expenseId: "hamster-hideout", description: "倉鼠的睡眠與躲藏空間，也是囤食處。" },
  { id: "sand-bath-box", label: "砂浴盆", icon: "▣", image: hamsterAssets.room.sandBathBox, placement: { x: 40, y: 55, width: 25, layer: 3 }, required: true, need: "清潔", expenseIds: ["hamster-sand-bath-box", "hamster-sand-monthly"], description: "倉鼠清潔毛髮的正確方式；定期篩砂，不用水洗。" },
  { id: "gnaw-stick", label: "磨牙棒", icon: "━", image: hamsterAssets.room.gnawStick, placement: { x: 55, y: 75, width: 18, layer: 4 }, required: false, need: "活動", expenseIds: ["hamster-gnaw-initial", "hamster-gnaw-monthly"], description: "牙齒終生持續生長，磨牙棒幫助維持磨損。" },
];

export const hamsterTrunkItems: TrunkItem[] = [
  { id: "id-card", visualClassName: "id", visualRole: "identity-card", label: "身分證", kind: "document", image: hamsterAssets.preparation.idCard, description: "辦理認養與核對身分時使用。", preparedLabel: "已攜帶", placement: { x: 20, y: 36, width: 15, layer: 4 } },
  { id: "adoption-documents", visualClassName: "documents", visualRole: "document-folder", label: "領養文件", kind: "document", image: hamsterAssets.preparation.adoptionDocuments, description: "如有租屋，須提供房東許可之證明。", preparedLabel: "已攜帶", placement: { x: 23, y: 32, width: 23, layer: 3 } },
  { id: "carrier", label: "防逃運輸容器", kind: "supply", image: hamsterAssets.preparation.carrier, visualScale: 1, description: "擅長啃咬與鑽縫隙，需選金屬或硬質材料。", preparedLabel: "已準備", expenseIds: ["hamster-carrier"], placement: { x: 45, y: 60, width: 20, layer: 5 } },
  { id: "bedding-in-carrier", label: "容器內墊料", kind: "supply", image: hamsterAssets.preparation.bedding, description: "運輸容器內放入{petName}熟悉氣味的墊料，有助穩定情緒。", preparedLabel: "已準備", placement: { x: 50, y: 69, width: 12, layer: 6 } },
  { id: "hideout-in-carrier", label: "小型躲藏物", kind: "supply", image: hamsterAssets.preparation.hideoutInCarrier, description: "提供可躲藏的空間，讓{petName}在移動過程中感到安心。", preparedLabel: "已準備", placement: { x: 30, y: 66, width: 12, layer: 4 } },
];

export const hamsterRoomFlow = {
  initialBackground: hamsterAssets.room.initialBackground,
  safeBackground: hamsterAssets.room.safeBackground,
  interiorBackground: hamsterAssets.room.cageInterior,
  interiorSafeBackground: hamsterAssets.room.cageInteriorWithBedding,
  interiorBackgroundAspectRatio: "match-room",
  floorHazardId: "direct-sunlight-spot",
  fenceItemId: "hamster-cage",
  interiorItemId: "bedding",
  outsideItemIds: ["hamster-cage", "pellet"],
  entryRequiredItemIds: ["hamster-cage", "pellet"],
  floorHotspot: { desktop: { x: 84, y: 50, width: 27, height: 32 }, mobile: { x: 74, y: 50, width: 27, height: 32 } },
  copy: {
    fenceInstruction: "先決定 {petName} 的生活角落，把籠子放好吧。",
    fencePlacedInstruction: "籠子放好了！把飼料也準備好吧。",
    entryReadyInstruction: "都備齊了！點進去幫 {petName} 佈置裡面吧 👆",
    interiorInstruction: "這就是 {petName} 的家。把需要的東西一件一件放進來吧。",
    hazardInstruction: "在把{petName}帶回家前，先檢查生活空間。請點擊場景中的危險物品，先將它們收好。",
    lockedInstruction: "請先放置倉鼠籠，再準備主食飼料。",
    entryLabel: "查看倉鼠籠內部配置",
  },
} as const;

export const hamsterRoomScene: RoomSceneConfig = { backgroundAlt: "倉鼠生活空間", interiorBackgroundAlt: "倉鼠籠內部配置" };
export const hamsterDepartureScene: DepartureSceneConfig = { trunkBackground: hamsterAssets.preparation.trunkBackground, trunkBackgroundAlt: "打開的汽車後車廂", documentFolderImage: hamsterAssets.preparation.adoptionDocuments, documentFolderAlt: "飼養文件夾" };
export const hamsterPreparation = { roomItems: hamsterRoomItems, hazards: hamsterHazards, trunkItems: hamsterTrunkItems, roomFlow: hamsterRoomFlow, roomScene: hamsterRoomScene, departureScene: hamsterDepartureScene } as const;
