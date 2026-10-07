import type { DepartureSceneConfig, HazardItem, RoomItem, RoomSceneConfig, TrunkItem } from "../../../game-types";
import { rabbitAssets } from "./assets";

/** 兔子房間用品與素材由此資料設定提供，共用房間元件只負責渲染與流程控制。 */
export const rabbitRoomItems: RoomItem[] = [
  { id: "fence-pen", label: "圍片／柵欄", icon: "▥", image: rabbitAssets.room.fencePen, sceneImage: rabbitAssets.room.fencePenInRoom, placement: { x: 72, y: 80, width: 30, layer: 2 }, mobilePlacement: { x: 68, y: 54, width: 30 }, required: true, need: "安全", expenseId: "rabbit-fence-pen", description: "以穩固圍片隔出安全活動範圍，保護兔子與家具。" },
  { id: "hay-rack", label: "牧草架", icon: "🌾", image: rabbitAssets.room.hayRack, placement: { x: 22, y: 50, width: 23, layer: 3 }, mobilePlacement: { x: 20, y: 68, width: 25 }, required: true, need: "飲食", expenseId: "rabbit-hay-rack", description: "牧草是兔子的主食，必須隨時可取用；牧草架也能避免牧草被踩髒。" },
  { id: "heavy-water-bowl", label: "較重的飲水碗", icon: "💧", image: rabbitAssets.room.waterBowl, placement: { x: 40, y: 65, width: 15, layer: 3 }, mobilePlacement: { x: 42, y: 82, width: 17 }, required: true, need: "飲食", expenseId: "rabbit-heavy-water-bowl", description: "較重的飲水碗不容易打翻，也方便每天觀察飲水量。" },
  { id: "litter-box", label: "便盆（附吸附墊料）", icon: "▤", image: rabbitAssets.room.litterBox, placement: { x: 73, y: 30, width: 25, layer: 3 }, mobilePlacement: { x: 70, y: 78, width: 31 }, required: true, need: "排泄", expenseIds: ["rabbit-litter-box", "rabbit-litter-monthly"], description: "兔子傾向固定區域排泄；定期清潔便盆才能避免尿灼傷並觀察糞便。" },
  { id: "hiding-box", label: "躲藏箱／小屋", icon: "⌂", image: rabbitAssets.room.hidingBox, placement: { x: 30, y: 25, width: 25, layer: 2 }, mobilePlacement: { x: 50, y: 65, width: 35 }, required: true, need: "安全", expenseId: "rabbit-hiding-box", description: "兔子需要隨時可退避的躲藏處，才能降低緊迫。" },
  { id: "anti-slip-mat", label: "防滑墊", icon: "▧", image: rabbitAssets.room.antiSlipMat, placement: { x: 51, y: 88, width: 65, layer: 1 }, mobilePlacement: { x: 50, y: 88, width: 82 }, required: true, need: "安全", expenseId: "rabbit-anti-slip-mat", description: "滑溜地板容易讓骨骼脆弱的兔子受傷，活動區地面必須防滑。" },
  { id: "hay", label: "牧草", icon: "🌾", image: rabbitAssets.feeding.hay, placement: { x: 27, y: 64, width: 14, layer: 4 }, mobilePlacement: { x: 28, y: 63, width: 19 }, required: false, need: "飲食", expenseId: "rabbit-hay-initial", description: "主食，無限量供應；入住前需備妥足量牧草，是兔子每日最重要的食物。" },
  { id: "cooling-mat", label: "陶板涼感墊", icon: "❄", image: rabbitAssets.room.coolingMat, placement: { x: 75, y: 60, width: 22, layer: 3 }, mobilePlacement: { x: 58, y: 80, width: 25 }, required: false, need: "休息", expenseId: "rabbit-cooling-mat", description: "兔子沒有汗腺，高溫時可用陶板涼感墊協助牠自行選擇降溫位置。" },
  { id: "chew-toy", label: "咀嚼玩具（木製）", icon: "✦", image: rabbitAssets.room.chewToy, placement: { x: 83, y: 66, width: 15, layer: 4 }, mobilePlacement: { x: 32, y: 78, width: 18 }, required: false, need: "活動", expenseId: "rabbit-chew-toy", description: "兔齒終生生長，安全的木製咀嚼玩具可提供磨牙與啃咬出口。" },
  { id: "dig-box", label: "挖掘箱", icon: "▤", image: rabbitAssets.room.digBox, placement: { x: 53, y: 25, width: 20, layer: 2 }, mobilePlacement: { x: 18, y: 82, width: 23 }, required: false, need: "活動", expenseId: "rabbit-dig-box", description: "挖掘是兔子的天性；挖掘箱能提供安全的行為出口。" },
];

export const rabbitHazards: HazardItem[] = [
  { id: "cable", label: "電線", icon: "🔌", image: rabbitAssets.room.cable, placement: { x: 20, y: 75, width: 20, layer: 5 }, mobilePlacement: { x: 14, y: 77, width: 25 }, danger: "兔子有強烈啃咬天性，咬電線可能觸電或食入異物。", handling: "整理固定電線或加裝保護套，避免讓兔子接觸。" },
  { id: "toxic-plant", label: "有毒植物（蔥蒜洋蔥等）", icon: "✿", image: rabbitAssets.room.toxicPlant, placement: { x: 40, y: 44, width: 15, layer: 5 }, mobilePlacement: { x: 82, y: 43, width: 21 }, danger: "蔥、蒜與洋蔥等植物對兔子有毒，可能被誤食。", handling: "移出兔子能到達的活動空間，並確認家中植物安全。" },
  { id: "plastic-item", label: "塑膠製品", icon: "▣", image: rabbitAssets.room.plasticItem, placement: { x: 43, y: 76, width: 12, layer: 5 }, mobilePlacement: { x: 44, y: 74, width: 18 }, danger: "兔子可能啃咬塑膠並食入，造成腸胃問題。", handling: "收進櫃子或改用安全材質的用品。" },
  { id: "foam-mat-with-edges", label: "有邊角的海棉墊", icon: "◇", image: rabbitAssets.room.foamMat, placement: { x: 80, y: 80, width: 20, layer: 5 }, mobilePlacement: { x: 68, y: 89, width: 34 }, danger: "兔子啃食泡棉可能食入異物，造成腸阻塞。", handling: "改用完整、無可啃邊角的防滑墊。" },
  { id: "high-platform", label: "過高的平台（無保護）", icon: "△", image: rabbitAssets.room.highPlatform, placement: { x: 73, y: 65, width: 18, layer: 4 }, mobilePlacement: { x: 74, y: 45, width: 24 }, danger: "兔子骨骼脆弱，從無保護的高處落下容易受傷。", handling: "移除過高平台，或改成低矮、穩固且有防護的設施。" },
  { id: "slippery-floor", label: "光滑地板", icon: "▱", image: rabbitAssets.room.antiSlipMat, placement: { x: 51, y: 88, width: 67, layer: 5 }, mobilePlacement: { x: 50, y: 88, width: 84 }, danger: "滑溜地板容易讓骨骼脆弱的兔子滑倒受傷。", handling: "鋪設完整防滑墊，讓活動與休息區保持止滑。" },
];

export const rabbitTrunkItems: TrunkItem[] = [
  { id: "carrier", label: "安全外出籠／提袋", kind: "supply", image: rabbitAssets.preparation.carrier, visualScale: 1.3, preparedLabel: "已準備", expenseIds: ["rabbit-carrier"], description: "兔子必須在適當外出籠或提袋中運送，不可散放；籠內要能讓牠自然站立。", placement: { x: 45, y: 61, width: 25, layer: 5 } },
  // 可裁剪已在房間準備的防滑墊；沿用同一費用 ID，expense store 會自動去重。
  { id: "anti-slip-liner", label: "防滑墊（籠內鋪底）", kind: "supply", image: rabbitAssets.preparation.antiSlipLiner, preparedLabel: "已準備", expenseIds: ["rabbit-anti-slip-mat"], description: "外出籠底部鋪防滑墊，可避免兔子在車輛晃動時滑倒受傷。", placement: { x: 45, y: 65, width: 26, layer: 4 } },
  { id: "hay-in-carrier", label: "少量牧草（籠內放置）", kind: "supply", image: rabbitAssets.preparation.hay, preparedLabel: "已準備", description: "途中提供少量牧草，讓兔子可以進食與磨牙，也有助穩定情緒。", placement: { x: 53, y: 70, width: 12, layer: 6 } },
  { id: "cooling-pack", label: "保冷袋／冰袋（夏季必備）", kind: "supply", image: rabbitAssets.preparation.coolingPack, preparedLabel: "已準備", expenseIds: ["rabbit-cooling-pack"], description: "兔子非常怕熱，夏季外出需準備安全的降溫措施。", placement: { x: 28, y: 67, width: 15, layer: 5 } },
  { id: "id-card", visualClassName: "id", label: "身分證", kind: "document", image: rabbitAssets.preparation.idCard, preparedLabel: "已攜帶", description: "辦理認養與核對身分時使用。", placement: { x: 20, y: 36, width: 15, layer: 4 } },
  { id: "adoption-documents", visualClassName: "documents", label: "領養文件", kind: "document", image: rabbitAssets.preparation.documents, preparedLabel: "已攜帶", description: "如有租屋，須提供房東許可之證明。", placement: { x: 23, y: 32, width: 23, layer: 3 } },
];

/** 兔子房間的階段與背景只由資料設定，避免共用房間元件混入物種字串或素材路徑。 */
export const rabbitRoomFlow = {
  initialBackground: rabbitAssets.room.background,
  safeBackground: rabbitAssets.room.safeBackground,
  interiorBackground: rabbitAssets.room.fenceInterior,
  interiorSafeBackground: rabbitAssets.room.fenceInteriorWithMat,
  interiorBackgroundAspectRatio: "match-room",
  floorHazardId: "slippery-floor",
  fenceItemId: "fence-pen",
  interiorItemId: "anti-slip-mat",
  floorHotspot: {
    desktop: { x: 49, y: 82, width: 78, height: 27 },
    mobile: { x: 49, y: 81, width: 84, height: 29 },
  },
  copy: {
    fenceInstruction: "先決定 {petName} 的生活角落，把圍欄圍好吧。",
    fencePlacedInstruction: "圍欄好了！點進去幫 {petName} 佈置裡面吧 👆",
    interiorInstruction: "這就是 {petName} 的家。把需要的東西一件一件放進來吧。",
  },
} as const;

export const rabbitRoomScene: RoomSceneConfig = { backgroundAlt: "兔子生活空間", interiorBackgroundAlt: "兔子圍欄內部" };
export const rabbitDepartureScene: DepartureSceneConfig = { trunkBackground: "/assets/car/car-trunk.png", trunkBackgroundAlt: "打開的汽車後車廂", documentFolderImage: rabbitAssets.preparation.documents, documentFolderAlt: "飼養文件夾", hidePriceForReusedItemIds: ["anti-slip-liner"] };
export const rabbitPreparation = { roomItems: rabbitRoomItems, hazards: rabbitHazards, trunkItems: rabbitTrunkItems, roomFlow: rabbitRoomFlow, roomScene: rabbitRoomScene, departureScene: rabbitDepartureScene } as const;
