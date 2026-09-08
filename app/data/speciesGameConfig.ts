import type { HazardItem, RoomItem, TrunkItem } from "../game-types";
import { departureTrunkItems, hazards, roomItems } from "../game-data";
import { catAssets } from "./catAssets";

export type SpeciesId = "dog" | "cat";

export type SpeciesCopy = {
  animalName: string;
  animalNameFallback: string;
  typeLabel: string;
  selectionTitle: string;
  breedTitle: string;
  nameTitle: string;
  namePlaceholder: string;
  historyTitle: string;
  historyBody: string;
  hasPreviousLabel: string;
  noPreviousLabel: string;
  previousSectionTitle: string;
  roomTitle: string;
  roomBody: (petName: string) => string;
  departureTitle: string;
  departureBody: (petName: string) => string;
  lifeChallengeLabel: (selectedLabel: string) => string;
};

export type SpeciesReportConfig = {
  checklistGroups: Array<{ title: string; items: string[] }>;
  handlingRows: Array<[string, string]>;
  moneyDisclaimer: string;
  /** 供網頁回顧與正式照護指南共同使用；不要在元件內硬寫物種時間。 */
  dailyCareTime: string;
  dailyCareTimeNote: string;
};

export type SpeciesGameConfig = {
  id: SpeciesId;
  copy: SpeciesCopy;
  roomItems: RoomItem[];
  hazards: HazardItem[];
  trunkItems: TrunkItem[];
  report: SpeciesReportConfig;
};

export const catRoomItems: RoomItem[] = [
  // Cat mobile room item positions:
  // 在這裡調整「貓」手機版布置房間物品座標；x / y / width 以 1:1 房間容器百分比為基準。
  // 防護網是背景狀態的觸發物品；完成後由 RoomPreparation 切換成 safeRoomSecured，不能個別放進房間。
  { id: "cat-safe-window", label: "窗戶防護網", icon: "□", image: catAssets.room.windowSafetyNet, placement: { x: 88, y: 44, width: 11, layer: 5 }, mobilePlacement: { x: 86, y: 45, width: 17 }, required: true, need: "安全", expenseId: "cat-safe-window", purpose: "先確認門窗、紗窗與陽台防護穩固，避免貓咪逃脫或墜落。" },
  { id: "cat-hide-box", label: "可退避的安全躲藏空間", icon: "▣", image: catAssets.room.hideaway, placement: { x: 25, y: 60, width: 15, layer: 3 }, mobilePlacement: { x: 58, y: 74, width: 32 }, required: true, need: "安全", expenseId: "cat-hide-box", purpose: "準備緊張時可躲避的隱蔽空間，讓貓咪能用自己的速度觀察與適應。" },
  { id: "cat-rest-space", label: "休息空間", icon: "🛏️", image: catAssets.room.restSpace, placement: { x: 43, y: 65, width: 18, layer: 2 }, mobilePlacement: { x: 70, y: 84, width: 28 }, required: true, need: "休息", expenseId: "cat-rest-bed", purpose: "日常睡眠與舒適休息的位置要安靜、穩定，避免一直被打擾。" },
  { id: "cat-litter-box", label: "貓砂盆", icon: "▤", image: catAssets.room.litterBox, placement: { x: 14, y: 84, width: 20, layer: 2 }, mobilePlacement: { x: 15, y: 78, width: 30 }, required: true, need: "排泄", expenseId: "cat-litter-box", purpose: "貓砂盆應放在安靜、容易到達且與食水分開的位置。" },
  { id: "cat-litter", label: "貓砂", icon: "◌", image: catAssets.room.litter, placement: { x: 30, y: 84, width: 12, layer: 3 }, mobilePlacement: { x: 28, y: 78, width: 22 }, required: true, need: "清潔", expenseId: "cat-litter", purpose: "維持足夠砂量並每天清理，才能觀察排泄與降低壓力。" },
  { id: "cat-food-bowl", label: "食盆", icon: "🥣", image: catAssets.room.foodBowl, placement: { x: 52, y: 89, width: 10, layer: 3 }, mobilePlacement: { x: 37, y: 87, width: 17 }, required: true, need: "飲食", expenseId: "food-bowl", purpose: "固定食盆位置，避免和砂盆太接近，讓進食更安心。" },
  { id: "cat-water-bowl", label: "水碗", icon: "💧", image: catAssets.room.waterBowl, placement: { x: 42, y: 89, width: 10, layer: 3 }, mobilePlacement: { x: 22, y: 88, width: 18 }, required: true, need: "飲食", expenseId: "water-bowl", purpose: "水碗可與食盆稍微分開，並每天更換乾淨飲水。" },
  { id: "cat-scratcher", label: "抓板", icon: "▥", image: catAssets.room.scratchingBoard, placement: { x: 70, y: 85, width: 12, layer: 4 }, mobilePlacement: { x: 68, y: 83, width: 20 }, required: true, need: "活動", expenseId: "cat-scratcher", purpose: "抓板能提供自然抓磨出口，降低家具被抓的機會。" },
  { id: "cat-tree", label: "跳台", icon: "▧", image: catAssets.room.tree, placement: { x: 85, y: 75, width: 20, layer: 2 }, mobilePlacement: { x: 78, y: 66, width: 27 }, required: true, need: "活動", expenseId: "cat-tree", purpose: "垂直空間能讓貓咪觀察環境、活動與保有安全距離。" },
  // TODO(cat-assets): 尚無獨立安全玩具素材，暫沿用抓板圖示以維持安全的貓咪專屬畫面。
  { id: "cat-safe-toy", label: "安全玩具", icon: "✦", image: catAssets.room.scratchingBoard, placement: { x: 56, y: 65, width: 10, layer: 4 }, mobilePlacement: { x: 49, y: 83, width: 17 }, required: true, need: "活動", expenseId: "cat-safe-toy", purpose: "選擇不易吞食、可收納的安全玩具，互動後也要整理。" },
];

export const catHazards: HazardItem[] = [
  // Cat mobile hazard positions:
  // 在這裡調整「貓」手機版危險物品座標；不影響狗版 hazards。
  { id: "cat-toxic-plants", label: "百合／有毒植物", icon: "✿", image: catAssets.room.lilyPlant, placement: { x: 31, y: 35, width: 11, layer: 5 }, mobilePlacement: { x: 28, y: 52, width: 17 }, danger: "百合等植物可能對貓造成嚴重危害，即使少量接觸也應避免。", handling: "移出貓咪能到達的空間，並確認家中植物是否安全。" },
  { id: "cat-human-medicine", label: "人類藥品", icon: "▣", image: catAssets.room.humanMedicine, placement: { x: 84, y: 76, width: 9, layer: 5 }, mobilePlacement: { x: 83, y: 76, width: 15 }, danger: "人用藥品不應自行給貓使用，誤食也可能造成中毒。", handling: "收到有門的櫃內，並避免把藥放在桌面或包包外層。" },
  { id: "cat-string", label: "線狀異物", icon: "⌁", image: catAssets.room.yarn, placement: { x: 12, y: 79, width: 12, layer: 5 }, mobilePlacement: { x: 13, y: 80, width: 24 }, danger: "線、繩、橡皮筋等可能被吞食，造成腸胃阻塞或傷害。", handling: "收進抽屜或盒內，玩具使用後也要收好。" },
  { id: "cat-essential-oil", label: "精油／薰香", icon: "◍", image: catAssets.room.fragrance, placement: { x: 93, y: 48, width: 9, layer: 5 }, mobilePlacement: { x: 58, y: 66, width: 15 }, danger: "部分精油與薰香對貓不適合，密閉空間中風險更高。", handling: "避免在貓咪活動區使用，並保持通風與安全距離。" },
  { id: "cat-cleaner", label: "清潔劑", icon: "🧴", image: "/assets/room/detergent.png", placement: { x: 69, y: 71, width: 9, layer: 5 }, mobilePlacement: { x: 70, y: 70, width: 15 }, danger: "清潔劑可能刺激皮膚、呼吸道或被舔入體內。", handling: "使用後確實收納，地面乾燥前避免貓咪進入。" },
  { id: "cat-cooling-product", label: "涼感產品", icon: "❄", image: catAssets.room.coolingMat, placement: { x: 45, y: 80, width: 14, layer: 5 }, mobilePlacement: { x: 86, y: 45, width: 17 }, danger: "部分涼感墊、冰包或凝膠產品若被咬破，可能造成誤食、滑倒或受傷風險。", handling: "改用通風陰涼處、乾淨飲水與可清洗墊材；任何降溫用品都要確認材質安全並避免貓咪啃咬。" },
];

export const catTrunkItems: TrunkItem[] = departureTrunkItems
  .filter((item) => item.id !== "leash")
  .map((item) => {
    if (item.id === "carrier") {
      return {
        ...item,
        label: "外出籠",
        description: "外出籠可降低行車途中貓咪在車內移動或逃脫的風險。",
        reason: "提供平穩、可固定且降低刺激的安全運輸空間。",
        caution: "外出籠尺寸需合適並固定在平坦位置；抵達前不要抱著貓咪直接上下車。",
        feedback: "外出籠已放入後車廂。",
      };
    }
    if (item.id === "pee-pad") {
      return {
        ...item,
        description: "尿墊可協助處理移動途中可能發生的排泄、嘔吐或髒污。",
        reason: "讓外出籠與運輸區域保持乾淨。",
        caution: "平整鋪在外出籠預定位置下方，並確認不會滑動或被貓咪抓成一團。",
        feedback: "尿墊已放入後車廂底部。",
      };
    }
    if (item.id === "water-kit") {
      return {
        ...item,
        description: "途中應準備飲水及可使用的水碗，視貓咪狀況與路程在安全停靠處補充。",
        reason: "途中可在安全停靠時補充飲水，避免長時間等待造成不適。",
        caution: "行車中避免開籠餵水，也不要放置裝滿水且容易打翻的開放水碗。",
        feedback: "水碗與飲水已收妥。",
      };
    }
    if (item.id === "cleaner") {
      return {
        ...item,
        description: "貓咪在陌生環境或移動途中可能因緊張而排泄或嘔吐，可準備清潔袋、擦拭用品及安全的清潔工具。",
        reason: "途中若發生排泄或髒污，可以盡快整理並維持運輸空間舒適。",
        caution: "包裝需密封，與飲水分開收納，也不要放進外出籠或讓貓咪直接咬到。",
        feedback: "清潔用品已收妥，可以處理途中可能發生的髒污。",
      };
    }
    return item;
  });

export const speciesGameConfig: Record<SpeciesId, SpeciesGameConfig> = {
  dog: {
    id: "dog",
    copy: {
      animalName: "狗狗",
      animalNameFallback: "小狗",
      typeLabel: "品種",
      selectionTitle: "你想飼養哪一種動物？",
      breedTitle: "選擇你想飼養的品種",
      nameTitle: "先幫牠取一個名字",
      namePlaceholder: "請輸入小狗的名字",
      historyTitle: "你以前有養過狗嗎？",
      historyBody: "過去的經驗很珍貴，也可能讓我們自然沿用熟悉的照顧方式。先簡單告訴我們，你是否曾經和狗狗一起生活。",
      hasPreviousLabel: "有，曾經有養過狗",
      noPreviousLabel: "沒有，這是第一次",
      previousSectionTitle: "以前陪伴你的狗狗",
      roomTitle: "先替牠布置安全的生活空間",
      roomBody: (petName) => `${petName || "小狗"} 還沒到家，但牠的生活角落可以先準備起來。先把每天會用到的用品放進房間，再看看有哪些東西可能讓牠誤咬、誤食或受傷。`,
      departureTitle: "出發接牠回家",
      departureBody: (petName) => `今天要去接 ${petName || "小狗"} 回家了。出門前先把需要的文件與接回用品準備好，讓牠在路上有安全的位置，也讓你能從容處理突發狀況。`,
      lifeChallengeLabel: (selectedLabel) => `${selectedLabel}的考驗`,
    },
    roomItems,
    hazards,
    trunkItems: departureTrunkItems,
    report: {
      checklistGroups: [
        { title: "每日照顧", items: ["固定餵食", "提供乾淨飲水", "觀察精神、食慾與排泄", "安排陪伴與活動", "外出散步或合適活動", "清理排泄物"] },
        { title: "家中環境", items: ["睡墊", "水碗與狗碗", "尿墊或如廁區", "寵物專用清潔用品", "危險物品收好", "安靜休息空間"] },
        { title: "外出與接回", items: ["身分證", "飼養文件", "運輸籠", "尿墊", "牽繩", "飲水與清潔用品"] },
      ],
      handlingRows: [
        ["忙碌或離家", "安排家人、朋友或合適照護者協助"],
        ["食慾、精神或排泄異常", "記錄並聯絡獸醫"],
        ["行為困擾", "調整環境、提供活動，必要時尋求專業協助"],
        ["生活改變", "重新安排照顧時間與支援"],
        ["高齡階段", "提早準備醫療與長期照顧資源"],
      ],
      moneyDisclaimer: "這筆金額用來模擬一次突發就醫時的現金緩衝，不代表能支付完整治療，也不是狗狗一生的醫療費。",
      dailyCareTime: "每日約需安排 60 分鐘以上",
      dailyCareTimeNote: "包含餵食與換水、環境清潔、互動陪伴、外出活動，以及觀察食慾與排泄狀況。",
    },
  },
  cat: {
    id: "cat",
    copy: {
      animalName: "貓咪",
      animalNameFallback: "貓咪",
      typeLabel: "品種",
      selectionTitle: "你想飼養哪一種動物？",
      breedTitle: "選擇你想飼養的品種",
      nameTitle: "先幫牠取一個名字",
      namePlaceholder: "請輸入貓咪的名字",
      historyTitle: "你以前有養過貓嗎？",
      historyBody: "過去的陪伴經驗很珍貴，但每隻貓的適應速度、個性與生活需求仍可能不同。先簡單告訴我們，你是否曾經和貓咪一起生活。",
      hasPreviousLabel: "有，曾經有養過貓",
      noPreviousLabel: "沒有，這是第一次",
      previousSectionTitle: "以前陪伴你的貓咪",
      roomTitle: "先替牠布置安靜安全的生活空間",
      roomBody: (petName) => `${petName || "貓咪"} 還沒到家，但安全房可以先準備好。先確認門窗與紗窗穩固，放好砂盆、食水、躲藏處、休息空間、抓板與安全玩具，再確認哪些物品需要收起。`,
      departureTitle: "出發接牠回家",
      departureBody: (petName) => `今天要去接 ${petName || "貓咪"} 回家了。出門前先把需要的文件與接回用品準備好，讓牠在路上有安全的位置，也讓你能從容處理突發狀況。`,
      lifeChallengeLabel: (selectedLabel) => `${selectedLabel}的考驗`,
    },
    roomItems: catRoomItems,
    hazards: catHazards,
    trunkItems: catTrunkItems,
    report: {
      checklistGroups: [
        { title: "每日照顧", items: ["固定餵食", "提供乾淨飲水", "每日巡視並清除排泄物", "維持足夠且乾淨的貓砂", "留意排泄異常，記錄後儘速聯絡獸醫", "安排安全陪玩", "保留安靜休息與躲藏處"] },
        { title: "家中環境", items: ["門窗與紗窗穩固", "可退避的安全躲藏空間", "日常休息空間", "貓砂盆與貓砂", "食盆與水碗", "抓板或跳台", "線狀物、有毒植物與涼感產品收好"] },
        { title: "外出與接回", items: ["身分證", "飼養文件", "外出籠", "尿墊", "水碗", "飲水與清潔用品"] },
      ],
      handlingRows: [
        ["忙碌或離家", "交接食水、砂盆、環境巡視與狀況回報"],
        ["食慾、飲水或尿便異常", "記錄變化並儘速聯絡獸醫"],
        ["每週清洗貓砂盆", "先放置備用砂盆，清洗後完全晾乾再放回"],
        ["躲藏或壓力增加", "降低刺激，保留可退回的安全空間"],
        ["居家安全", "收好線狀物、有毒植物、人用藥與清潔劑"],
        ["高齡階段", "調整低入口砂盆、階梯式跳台與溫暖休息處"],
      ],
      moneyDisclaimer: "這筆金額用來模擬一次突發就醫時的現金緩衝，不代表能支付完整治療，也不是貓咪一生的醫療費。",
      dailyCareTime: "每日約需安排 45 分鐘以上",
      dailyCareTimeNote: "包含餵食與換水、貓砂盆與環境清潔、互動陪伴，以及觀察食慾、飲水與排泄狀況。",
    },
  },
};

export function getSpeciesGameConfig(species: string): SpeciesGameConfig {
  return species === "cat" ? speciesGameConfig.cat : speciesGameConfig.dog;
}
