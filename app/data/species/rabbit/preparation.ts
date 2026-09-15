import type { HazardItem, RoomItem, TrunkItem } from "../../../game-types";
import { rabbitAssets } from "./assets";

/** 兔子房間用品；兔版素材補齊前，TODO 路徑由元件安全呈現為圖片缺失狀態。 */
export const rabbitRoomItems: RoomItem[] = [
  { id: "hay-rack", label: "牧草架", icon: "🌾", image: rabbitAssets.room.hayRack, placement: { x: 22, y: 72, width: 18, layer: 3 }, mobilePlacement: { x: 20, y: 68, width: 25 }, required: true, need: "飲食", expenseId: "rabbit-hay-rack", purpose: "牧草是兔子的主食，必須隨時可取用；牧草架也能避免牧草被踩髒。" },
  { id: "heavy-water-bowl", label: "較重的飲水碗", icon: "💧", image: rabbitAssets.room.waterBowl, placement: { x: 40, y: 84, width: 12, layer: 3 }, mobilePlacement: { x: 42, y: 82, width: 17 }, required: true, need: "飲食", expenseId: "rabbit-heavy-water-bowl", purpose: "較重的飲水碗不容易打翻，也方便每天觀察飲水量。" },
  { id: "litter-box", label: "便盆（附吸附墊料）", icon: "▤", image: rabbitAssets.room.litterBox, placement: { x: 73, y: 80, width: 22, layer: 2 }, mobilePlacement: { x: 70, y: 78, width: 31 }, required: true, need: "排泄", expenseIds: ["rabbit-litter-box", "rabbit-litter-monthly"], purpose: "兔子傾向固定區域排泄；定期清潔便盆才能避免尿灼傷並觀察糞便。" },
  { id: "hiding-box", label: "躲藏箱／小屋", icon: "⌂", image: rabbitAssets.room.hidingBox, placement: { x: 53, y: 68, width: 25, layer: 2 }, mobilePlacement: { x: 50, y: 65, width: 35 }, required: true, need: "安全", expenseId: "rabbit-hiding-box", purpose: "兔子需要隨時可退避的躲藏處，才能降低緊迫。" },
  { id: "anti-slip-mat", label: "防滑墊", icon: "▧", image: rabbitAssets.room.antiSlipMat, placement: { x: 51, y: 88, width: 65, layer: 1 }, mobilePlacement: { x: 50, y: 88, width: 82 }, required: true, need: "安全", expenseId: "rabbit-anti-slip-mat", purpose: "滑溜地板容易讓骨骼脆弱的兔子受傷，活動區地面必須防滑。" },
  { id: "cooling-mat", label: "陶板涼感墊", icon: "❄", image: rabbitAssets.room.coolingMat, placement: { x: 62, y: 83, width: 18, layer: 3 }, mobilePlacement: { x: 58, y: 80, width: 25 }, required: false, need: "休息", expenseId: "rabbit-cooling-mat", purpose: "兔子沒有汗腺，高溫時可用陶板涼感墊協助牠自行選擇降溫位置。" },
  { id: "chew-toy", label: "咀嚼玩具（木製）", icon: "✦", image: rabbitAssets.room.chewToy, placement: { x: 33, y: 82, width: 12, layer: 4 }, mobilePlacement: { x: 32, y: 78, width: 18 }, required: false, need: "活動", expenseId: "rabbit-chew-toy", purpose: "兔齒終生生長，安全的木製咀嚼玩具可提供磨牙與啃咬出口。" },
  { id: "dig-box", label: "挖掘箱", icon: "▤", image: rabbitAssets.room.hidingBox, placement: { x: 18, y: 84, width: 17, layer: 2 }, mobilePlacement: { x: 18, y: 82, width: 23 }, required: false, need: "活動", expenseId: "rabbit-dig-box", purpose: "挖掘是兔子的天性；挖掘箱能提供安全的行為出口。" },
  { id: "fence-pen", label: "圍片／柵欄", icon: "▥", placement: { x: 88, y: 72, width: 14, layer: 1 }, mobilePlacement: { x: 87, y: 70, width: 20 }, required: true, need: "安全", expenseId: "rabbit-fence-pen", purpose: "以穩固圍片隔出安全活動範圍，保護兔子與家具。" },
];

export const rabbitHazards: HazardItem[] = [
  { id: "cable", label: "電線", icon: "🔌", image: "/assets/dog/room/wire.png", placement: { x: 12, y: 78, width: 20, layer: 5 }, mobilePlacement: { x: 14, y: 77, width: 25 }, danger: "兔子有強烈啃咬天性，咬電線可能觸電或食入異物。", handling: "整理固定電線或加裝保護套，避免讓兔子接觸。" },
  { id: "toxic-plant", label: "有毒植物（蔥蒜洋蔥等）", icon: "✿", image: rabbitAssets.room.toxicPlant, placement: { x: 84, y: 45, width: 15, layer: 5 }, mobilePlacement: { x: 82, y: 43, width: 21 }, danger: "蔥、蒜與洋蔥等植物對兔子有毒，可能被誤食。", handling: "移出兔子能到達的活動空間，並確認家中植物安全。" },
  { id: "plastic-item", label: "塑膠製品", icon: "▣", image: rabbitAssets.room.plasticItem, placement: { x: 43, y: 76, width: 12, layer: 5 }, mobilePlacement: { x: 44, y: 74, width: 18 }, danger: "兔子可能啃咬塑膠並食入，造成腸胃問題。", handling: "收進櫃子或改用安全材質的用品。" },
  { id: "foam-mat-with-edges", label: "有邊角的海棉墊", icon: "◇", image: rabbitAssets.room.foamMat, placement: { x: 67, y: 90, width: 25, layer: 5 }, mobilePlacement: { x: 68, y: 89, width: 34 }, danger: "兔子啃食泡棉可能食入異物，造成腸阻塞。", handling: "改用完整、無可啃邊角的防滑墊。" },
  { id: "high-platform", label: "過高的平台（無保護）", icon: "△", image: rabbitAssets.room.highPlatform, placement: { x: 73, y: 47, width: 18, layer: 5 }, mobilePlacement: { x: 74, y: 45, width: 24 }, danger: "兔子骨骼脆弱，從無保護的高處落下容易受傷。", handling: "移除過高平台，或改成低矮、穩固且有防護的設施。" },
  { id: "slippery-floor", label: "光滑地板", icon: "▱", image: rabbitAssets.room.antiSlipMat, placement: { x: 51, y: 88, width: 67, layer: 5 }, mobilePlacement: { x: 50, y: 88, width: 84 }, danger: "滑溜地板容易讓骨骼脆弱的兔子滑倒受傷。", handling: "鋪設完整防滑墊，讓活動與休息區保持止滑。" },
];

export const rabbitTrunkItems: TrunkItem[] = [
  { id: "carrier", label: "安全外出籠／提袋", kind: "supply", image: rabbitAssets.preparation.carrier, preparedLabel: "已準備", expenseIds: ["rabbit-carrier"], description: "兔子必須在適當外出籠或提袋中運送，不可散放；籠內要能讓牠自然站立。", reason: "提供穩定、可固定的安全運輸空間。", caution: "確認外出籠尺寸合適、通風並固定在平坦位置。", sourceLabel: "兔子接回與安全運輸建議", feedback: "安全外出籠已放入車內。", placement: { x: 50, y: 61, width: 34, layer: 5 } },
  // 可裁剪已在房間準備的防滑墊；沿用同一費用 ID，expense store 會自動去重。
  { id: "anti-slip-liner", label: "防滑墊（籠內鋪底）", kind: "supply", image: rabbitAssets.preparation.antiSlipLiner, preparedLabel: "已準備", expenseIds: ["rabbit-anti-slip-mat"], description: "外出籠底部鋪防滑墊，可避免兔子在車輛晃動時滑倒受傷。", reason: "保護骨骼脆弱的兔子，讓移動更穩定。", caution: "鋪平並確認不會捲起或讓兔子啃咬。", sourceLabel: "兔子安全運輸建議", feedback: "防滑墊已鋪好。", placement: { x: 48, y: 69, width: 26, layer: 6 } },
  { id: "hay-in-carrier", label: "少量牧草（籠內放置）", kind: "supply", image: rabbitAssets.preparation.hay, preparedLabel: "已準備", description: "途中提供少量牧草，讓兔子可以進食與磨牙，也有助穩定情緒。", reason: "牧草不能長時間斷供。", caution: "維持乾燥並以少量、安全方式放置，避免遮住通風口。", sourceLabel: "兔子飲食與運輸建議", feedback: "少量牧草已放入籠內。", placement: { x: 58, y: 54, width: 18, layer: 6 } },
  { id: "cooling-pack", label: "保冷袋／冰袋（夏季必備）", kind: "supply", image: rabbitAssets.preparation.coolingPack, preparedLabel: "已準備", expenseIds: ["rabbit-cooling-pack"], description: "兔子非常怕熱，夏季外出需準備安全的降溫措施。", reason: "降低途中高溫造成的中暑風險。", caution: "不可直接冰敷兔子身體，保持隔層與良好通風。", sourceLabel: "兔子高溫照護建議", feedback: "保冷措施已收妥。", placement: { x: 31, y: 62, width: 20, layer: 5 } },
  { id: "id-card", label: "身分證", kind: "document", image: rabbitAssets.preparation.idCard, preparedLabel: "已攜帶", description: "辦理認養與核對身分時使用。", reason: "方便單位確認接回人的身分與聯絡資料。", caution: "實際文件以領養單位或業者通知為準。", sourceLabel: "領養／購買單位接回文件", feedback: "身分證已放入文件夾。", placement: { x: 20, y: 36, width: 15, layer: 4 } },
  { id: "adoption-documents", label: "領養文件", kind: "document", image: rabbitAssets.preparation.documents, preparedLabel: "已攜帶", description: "如有租屋，須提供房東許可之證明。", reason: "讓認養資料與居住安排更完整透明。", caution: "依實際單位通知確認所需文件。", sourceLabel: "領養／購買單位接回文件", feedback: "領養文件已放入文件夾。", placement: { x: 23, y: 32, width: 23, layer: 3 } },
];

export const rabbitPreparation = { roomItems: rabbitRoomItems, hazards: rabbitHazards, trunkItems: rabbitTrunkItems } as const;
