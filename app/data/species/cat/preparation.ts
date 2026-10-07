import type { DepartureSceneConfig, HazardItem, RoomItem, RoomSceneConfig, TrunkItem } from "../../../game-types";
import { sharedAssets } from "../../shared/assets";
import { catAssets } from "./assets";
import { catHazardPlacements, catRoomPlacements } from "./layout";
import { dogDepartureTrunkItems } from "../dog/preparation";

export const catRoomItems: RoomItem[] = [
  // Cat mobile room item positions:
  // 在這裡調整「貓」手機版布置房間物品座標；x / y / width 以 1:1 房間容器百分比為基準。
  // 防護網是背景狀態的觸發物品；完成後由 RoomPreparation 切換成 safeRoomSecured，不能個別放進房間。
  { id: "cat-safe-window", label: "窗戶防護網", icon: "□", image: catAssets.room.windowSafetyNet, ...catRoomPlacements["cat-safe-window"], required: true, need: "安全", expenseId: "cat-safe-window", description: "先確認門窗、紗窗與陽台防護穩固，避免貓咪逃脫或墜落。" },
  { id: "cat-hide-box", label: "可退避的安全躲藏空間", icon: "▣", image: catAssets.room.hideaway, ...catRoomPlacements["cat-hide-box"], required: true, need: "安全", expenseId: "cat-hiding-space", description: "準備緊張時可躲避的隱蔽空間，讓貓咪能用自己的速度觀察與適應。" },
  { id: "cat-rest-space", label: "休息空間", icon: "🛏️", image: catAssets.room.restSpace, ...catRoomPlacements["cat-rest-space"], required: true, need: "休息", expenseId: "cat-rest-bed", description: "日常睡眠與舒適休息的位置要安靜、穩定，避免一直被打擾。" },
  { id: "cat-litter-box", label: "貓砂盆", icon: "▤", image: catAssets.room.litterBox, ...catRoomPlacements["cat-litter-box"], required: true, need: "排泄", expenseId: "cat-litter-box", description: "貓砂盆應放在安靜、容易到達且與食水分開的位置。" },
  { id: "cat-litter", label: "貓砂", icon: "◌", image: catAssets.room.litter, ...catRoomPlacements["cat-litter"], required: true, need: "清潔", expenseId: "cat-litter-box", description: "維持足夠砂量並每天清理，才能觀察排泄與降低壓力。" },
  { id: "cat-food-bowl", label: "食盆", icon: "🥣", image: catAssets.room.foodBowl, ...catRoomPlacements["cat-food-bowl"], required: true, need: "飲食", expenseId: "cat-food-bowl", description: "固定食盆位置，避免和砂盆太接近，讓進食更安心。" },
  { id: "cat-water-bowl", label: "水碗", icon: "💧", image: catAssets.room.waterBowl, ...catRoomPlacements["cat-water-bowl"], required: true, need: "飲食", expenseId: "cat-water-bowl", description: "水碗可與食盆稍微分開，並每天更換乾淨飲水。" },
  { id: "cat-scratcher", label: "抓板", icon: "▥", image: catAssets.room.scratchingBoard, ...catRoomPlacements["cat-scratcher"], required: true, need: "活動", expenseId: "cat-scratcher", description: "抓板能提供自然抓磨出口，降低家具被抓的機會。" },
  { id: "cat-tree", label: "跳台", icon: "▧", image: catAssets.room.tree, ...catRoomPlacements["cat-tree"], required: true, need: "活動", expenseId: "cat-tree", description: "垂直空間能讓貓咪觀察環境、活動與保有安全距離。" },
  { id: "cat-safe-toy", label: "安全玩具", icon: "✦", image: catAssets.room.teaserWand, ...catRoomPlacements["cat-safe-toy"], required: true, need: "活動", expenseId: "cat-safe-toy", description: "選擇不易吞食、可收納的安全玩具，互動後也要整理。" },
];

export const catHazards: HazardItem[] = [
  // Cat mobile hazard positions:
  // 在這裡調整「貓」手機版危險物品座標；不影響狗版 hazards。
  { id: "cat-toxic-plants", label: "百合／有毒植物", icon: "✿", image: catAssets.room.lilyPlant, ...catHazardPlacements["cat-toxic-plants"], danger: "百合等植物可能對貓造成嚴重危害，即使少量接觸也應避免。", handling: "移出貓咪能到達的空間，並確認家中植物是否安全。" },
  { id: "cat-human-medicine", label: "人類藥品", icon: "▣", image: catAssets.room.humanMedicine, ...catHazardPlacements["cat-human-medicine"], danger: "人用藥品不應自行給貓使用，誤食也可能造成中毒。", handling: "收到有門的櫃內，並避免把藥放在桌面或包包外層。" },
  { id: "cat-string", label: "線狀異物", icon: "⌁", image: catAssets.room.yarn, ...catHazardPlacements["cat-string"], danger: "線、繩、橡皮筋等可能被吞食，造成腸胃阻塞或傷害。", handling: "收進抽屜或盒內，玩具使用後也要收好。" },
  { id: "cat-essential-oil", label: "精油／薰香", icon: "◍", image: catAssets.room.fragrance, ...catHazardPlacements["cat-essential-oil"], danger: "部分精油與薰香對貓不適合，密閉空間中風險更高。", handling: "避免在貓咪活動區使用，並保持通風與安全距離。" },
  { id: "cat-cleaner", label: "清潔劑", icon: "🧴", image: "/assets/dog/room/detergent.png", ...catHazardPlacements["cat-cleaner"], danger: "清潔劑可能刺激皮膚、呼吸道或被舔入體內。", handling: "使用後確實收納，地面乾燥前避免貓咪進入。" },
  { id: "cat-cooling-product", label: "涼感產品", icon: "❄", image: catAssets.room.coolingMat, ...catHazardPlacements["cat-cooling-product"], danger: "部分涼感墊、冰包或凝膠產品若被咬破，可能造成誤食、滑倒或受傷風險。", handling: "改用通風陰涼處、乾淨飲水與可清洗墊材；任何降溫用品都要確認材質安全並避免貓咪啃咬。" },
];

/**
 * 貓咪出發接回用品：與犬隻共用物品框架，但不包含牽繩。
 * 物種差異只在此處的文案與篩選規則，UI／費用／完成條件維持共用。
 */
export const catTrunkItems: TrunkItem[] = dogDepartureTrunkItems
  .filter((item) => item.id !== "leash")
  .map((item) => {
    if (item.id === "carrier") return { ...item, label: "外出籠", visualScale: 1.5, description: "讓小貓在移動途中有安全固定的空間。", expenseIds: ["cat-carrier"] };
    if (item.id === "pee-pad") return { ...item, description: "接回途中可降低排泄與清潔壓力。", expenseIds: ["cat-carrier-pad"], reusedExpenseIds: [] };
    if (item.id === "water-kit") return { ...item, description: "必要時補充飲水，避免長時間缺水。", expenseIds: ["cat-water-kit"] };
    if (item.id === "cleaner") return { ...item, description: "處理接回途中可能發生的髒污。", expenseIds: ["cat-cleaner-kit"] };
    return item;
  });

export const catRoomScene: RoomSceneConfig = { background: catAssets.room.safeRoom, mobileBackground: catAssets.room.safeRoom, safeBackground: catAssets.room.safeRoomSecured, safeBackgroundWhenItemId: "cat-safe-window", hidePlacedItemId: "cat-safe-window", backgroundAlt: "貓咪安全房", doorplate: { image: sharedAssets.nameplate, alt: "貓咪名字門牌" } };
export const catDepartureScene: DepartureSceneConfig = { trunkBackground: "/assets/car/car-trunk.png", trunkBackgroundAlt: "打開的汽車後車廂", documentFolderImage: "/assets/car/adoption-documents.png", documentFolderAlt: "飼養文件夾" };
export const catPreparation = { trunkItems: catTrunkItems, roomScene: catRoomScene, departureScene: catDepartureScene } as const;
