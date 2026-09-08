import type { HazardItem, RoomItem, TrunkItem } from "../../../game-types";
import { catAssets } from "./assets";
import { catHazardPlacements, catRoomPlacements } from "./layout";
import { dogDepartureTrunkItems } from "../dog/preparation";

export const catRoomItems: RoomItem[] = [
  // Cat mobile room item positions:
  // 在這裡調整「貓」手機版布置房間物品座標；x / y / width 以 1:1 房間容器百分比為基準。
  // 防護網是背景狀態的觸發物品；完成後由 RoomPreparation 切換成 safeRoomSecured，不能個別放進房間。
  { id: "cat-safe-window", label: "窗戶防護網", icon: "□", image: catAssets.room.windowSafetyNet, ...catRoomPlacements["cat-safe-window"], required: true, need: "安全", expenseId: "cat-safe-window", purpose: "先確認門窗、紗窗與陽台防護穩固，避免貓咪逃脫或墜落。" },
  { id: "cat-hide-box", label: "可退避的安全躲藏空間", icon: "▣", image: catAssets.room.hideaway, ...catRoomPlacements["cat-hide-box"], required: true, need: "安全", expenseId: "cat-hide-box", purpose: "準備緊張時可躲避的隱蔽空間，讓貓咪能用自己的速度觀察與適應。" },
  { id: "cat-rest-space", label: "休息空間", icon: "🛏️", image: catAssets.room.restSpace, ...catRoomPlacements["cat-rest-space"], required: true, need: "休息", expenseId: "cat-rest-bed", purpose: "日常睡眠與舒適休息的位置要安靜、穩定，避免一直被打擾。" },
  { id: "cat-litter-box", label: "貓砂盆", icon: "▤", image: catAssets.room.litterBox, ...catRoomPlacements["cat-litter-box"], required: true, need: "排泄", expenseId: "cat-litter-box", purpose: "貓砂盆應放在安靜、容易到達且與食水分開的位置。" },
  { id: "cat-litter", label: "貓砂", icon: "◌", image: catAssets.room.litter, ...catRoomPlacements["cat-litter"], required: true, need: "清潔", expenseId: "cat-litter", purpose: "維持足夠砂量並每天清理，才能觀察排泄與降低壓力。" },
  { id: "cat-food-bowl", label: "食盆", icon: "🥣", image: catAssets.room.foodBowl, ...catRoomPlacements["cat-food-bowl"], required: true, need: "飲食", expenseId: "food-bowl", purpose: "固定食盆位置，避免和砂盆太接近，讓進食更安心。" },
  { id: "cat-water-bowl", label: "水碗", icon: "💧", image: catAssets.room.waterBowl, ...catRoomPlacements["cat-water-bowl"], required: true, need: "飲食", expenseId: "water-bowl", purpose: "水碗可與食盆稍微分開，並每天更換乾淨飲水。" },
  { id: "cat-scratcher", label: "抓板", icon: "▥", image: catAssets.room.scratchingBoard, ...catRoomPlacements["cat-scratcher"], required: true, need: "活動", expenseId: "cat-scratcher", purpose: "抓板能提供自然抓磨出口，降低家具被抓的機會。" },
  { id: "cat-tree", label: "跳台", icon: "▧", image: catAssets.room.tree, ...catRoomPlacements["cat-tree"], required: true, need: "活動", expenseId: "cat-tree", purpose: "垂直空間能讓貓咪觀察環境、活動與保有安全距離。" },
  // TODO(cat-assets): 尚無獨立安全玩具素材，暫沿用抓板圖示以維持安全的貓咪專屬畫面。
  { id: "cat-safe-toy", label: "安全玩具", icon: "✦", image: catAssets.room.scratchingBoard, ...catRoomPlacements["cat-safe-toy"], required: true, need: "活動", expenseId: "cat-safe-toy", purpose: "選擇不易吞食、可收納的安全玩具，互動後也要整理。" },
];

export const catHazards: HazardItem[] = [
  // Cat mobile hazard positions:
  // 在這裡調整「貓」手機版危險物品座標；不影響狗版 hazards。
  { id: "cat-toxic-plants", label: "百合／有毒植物", icon: "✿", image: catAssets.room.lilyPlant, ...catHazardPlacements["cat-toxic-plants"], danger: "百合等植物可能對貓造成嚴重危害，即使少量接觸也應避免。", handling: "移出貓咪能到達的空間，並確認家中植物是否安全。" },
  { id: "cat-human-medicine", label: "人類藥品", icon: "▣", image: catAssets.room.humanMedicine, ...catHazardPlacements["cat-human-medicine"], danger: "人用藥品不應自行給貓使用，誤食也可能造成中毒。", handling: "收到有門的櫃內，並避免把藥放在桌面或包包外層。" },
  { id: "cat-string", label: "線狀異物", icon: "⌁", image: catAssets.room.yarn, ...catHazardPlacements["cat-string"], danger: "線、繩、橡皮筋等可能被吞食，造成腸胃阻塞或傷害。", handling: "收進抽屜或盒內，玩具使用後也要收好。" },
  { id: "cat-essential-oil", label: "精油／薰香", icon: "◍", image: catAssets.room.fragrance, ...catHazardPlacements["cat-essential-oil"], danger: "部分精油與薰香對貓不適合，密閉空間中風險更高。", handling: "避免在貓咪活動區使用，並保持通風與安全距離。" },
  { id: "cat-cleaner", label: "清潔劑", icon: "🧴", image: "/assets/room/detergent.png", ...catHazardPlacements["cat-cleaner"], danger: "清潔劑可能刺激皮膚、呼吸道或被舔入體內。", handling: "使用後確實收納，地面乾燥前避免貓咪進入。" },
  { id: "cat-cooling-product", label: "涼感產品", icon: "❄", image: catAssets.room.coolingMat, ...catHazardPlacements["cat-cooling-product"], danger: "部分涼感墊、冰包或凝膠產品若被咬破，可能造成誤食、滑倒或受傷風險。", handling: "改用通風陰涼處、乾淨飲水與可清洗墊材；任何降溫用品都要確認材質安全並避免貓咪啃咬。" },
];

/**
 * 貓咪出發接回用品：與犬隻共用物品框架，但不包含牽繩。
 * 物種差異只在此處的文案與篩選規則，UI／費用／完成條件維持共用。
 */
export const catTrunkItems: TrunkItem[] = dogDepartureTrunkItems
  .filter((item) => item.id !== "leash")
  .map((item) => {
    if (item.id === "carrier") return { ...item, label: "外出籠", description: "外出籠可降低行車途中貓咪在車內移動或逃脫的風險。", reason: "提供平穩、可固定且降低刺激的安全運輸空間。", caution: "外出籠尺寸需合適並固定在平坦位置；抵達前不要抱著貓咪直接上下車。", feedback: "外出籠已放入後車廂。" };
    if (item.id === "pee-pad") return { ...item, description: "尿墊可協助處理移動途中可能發生的排泄、嘔吐或髒污。", reason: "讓外出籠與運輸區域保持乾淨。", caution: "平整鋪在外出籠預定位置下方，並確認不會滑動或被貓咪抓成一團。", feedback: "尿墊已放入後車廂底部。" };
    if (item.id === "water-kit") return { ...item, description: "途中應準備飲水及可使用的水碗，視貓咪狀況與路程在安全停靠處補充。", reason: "途中可在安全停靠時補充飲水，避免長時間等待造成不適。", caution: "行車中避免開籠餵水，也不要放置裝滿水且容易打翻的開放水碗。", feedback: "水碗與飲水已收妥。" };
    if (item.id === "cleaner") return { ...item, description: "貓咪在陌生環境或移動途中可能因緊張而排泄或嘔吐，可準備清潔袋、擦拭用品及安全的清潔工具。", reason: "途中若發生排泄或髒污，可以盡快整理並維持運輸空間舒適。", caution: "包裝需密封，與飲水分開收納，也不要放進外出籠或讓貓咪直接咬到。", feedback: "清潔用品已收妥，可以處理途中可能發生的髒污。" };
    return item;
  });

export const catPreparation = { trunkItems: catTrunkItems } as const;

