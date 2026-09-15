import type { HazardItem, RoomItem, TrunkItem } from "../../../game-types";
import { birdAssets } from "./assets";

export const birdRoomItems: RoomItem[] = [
  { id: "bird-cage", label: "方形金屬鳥籠", icon: "▦", image: birdAssets.room.cage, placement: { x: 53, y: 58, width: 38, layer: 2 }, required: true, need: "安全", expenseId: "bird-cage", purpose: "方形籠提供可倚靠的角落；格柵間隙需依鳥體型選擇。" },
  { id: "perch-set", label: "不同材質的棲木", icon: "━", image: birdAssets.room.perch, placement: { x: 50, y: 54, width: 30, layer: 3 }, required: true, need: "休息", expenseId: "bird-perch-set", purpose: "不同高度與粗細的棲木能分散足部壓力。" },
  { id: "bird-food-bowl", label: "專用食碗", icon: "🥣", image: birdAssets.room.bowl, placement: { x: 42, y: 73, width: 12, layer: 4 }, required: true, need: "飲食", expenseId: "bird-food-bowl", purpose: "依食性提供專用飼料，並留意碗中是否只剩空殼。" },
  { id: "bird-water-bowl", label: "適當大小的水碗", icon: "💧", image: birdAssets.room.water, placement: { x: 59, y: 73, width: 12, layer: 4 }, required: true, need: "飲食", expenseId: "bird-water-bowl", purpose: "每天換水並清洗容器；避免過深容器造成跌落風險。" },
  { id: "bird-chew-toy", label: "天然啃咬玩具", icon: "✦", image: birdAssets.room.toy, placement: { x: 68, y: 50, width: 12, layer: 4 }, required: false, need: "活動", expenseId: "bird-chew-toy", purpose: "木材、麻繩等天然材質可提供安全啃咬與紓壓。" },
  { id: "bird-climbing-toy", label: "攀爬玩具", icon: "⌁", image: birdAssets.room.toy, placement: { x: 35, y: 53, width: 13, layer: 4 }, required: false, need: "活動", expenseId: "bird-climbing-toy", purpose: "增加籠內活動與探索機會，定期輪換更有新鮮感。" },
  { id: "bird-feces-tray", label: "糞便托盤與墊料", icon: "▤", image: birdAssets.room.tray, placement: { x: 50, y: 79, width: 28, layer: 3 }, required: true, need: "清潔", expenseId: "bird-feces-tray", purpose: "每天更換墊料，才能觀察糞便並維持環境衛生。" },
  { id: "bird-thermometer", label: "溫度計", icon: "℃", image: birdAssets.room.thermometer, placement: { x: 80, y: 44, width: 9, layer: 4 }, required: false, need: "安全", expenseId: "bird-thermometer", purpose: "鳥對溫度變化敏感，需要具體數據協助調整環境。" },
];

export const birdHazards: HazardItem[] = [
  { id: "teflon-pan", label: "鐵氟龍不沾鍋", icon: "⚠", image: birdAssets.room.cage, placement: { x: 15, y: 71, width: 18, layer: 5 }, danger: "高溫可能產生對鳥致命的有毒氣體，養鳥家庭必須完全停用。", handling: "移除並改用不含鐵氟龍的鍋具。" },
  { id: "incense-candle", label: "線香／薰香蠟燭", icon: "♨", image: birdAssets.room.toy, placement: { x: 20, y: 48, width: 12, layer: 5 }, danger: "揮發性氣味與煙霧會傷害敏感的鳥類呼吸道。", handling: "不要在鳥的生活空間使用香氛或精油。" },
  { id: "spray-aerosol", label: "噴霧清潔劑／芳香劑", icon: "☁", image: birdAssets.room.thermometer, placement: { x: 78, y: 62, width: 10, layer: 5 }, danger: "噴霧化學物質會刺激鳥類呼吸道。", handling: "改用無揮發、對鳥安全的清潔方式。" },
  { id: "toxic-plant", label: "有毒室內植物", icon: "✿", image: birdAssets.room.plant, placement: { x: 83, y: 48, width: 15, layer: 5 }, danger: "鳥可能啃咬植物，部分常見植物會造成中毒。", handling: "移出鳥能接觸的範圍並確認植物安全。" },
  { id: "mirror-toy", label: "鏡子／身形相似玩具", icon: "◇", image: birdAssets.room.toy, placement: { x: 34, y: 66, width: 12, layer: 5 }, danger: "長期把倒影當同類互動，可能影響社交並誘發發情。", handling: "移除鏡子，改提供可輪換的天然玩具。" },
  { id: "round-cage", label: "圓形鳥籠", icon: "○", image: birdAssets.room.cage, placement: { x: 50, y: 58, width: 24, layer: 5 }, danger: "圓形籠缺少角落可倚靠，長期可能增加緊迫。", handling: "更換為方形、尺寸與格柵合適的金屬鳥籠。" },
];

export const birdTrunkItems: TrunkItem[] = [
  { id: "bird-carrier", label: "外出籠／運輸箱", kind: "supply", image: birdAssets.preparation.carrier, preparedLabel: "已準備", description: "鳥必須在通風、堅固且間隙安全的外出籠中運送。", reason: "提供穩定、安全的運輸空間。", caution: "確認固定平穩並保留通風。", sourceLabel: "鳥類安全運輸建議", feedback: "外出籠已放入車內。", expenseIds: ["bird-carrier"], placement: { x: 50, y: 61, width: 34, layer: 5 } },
  { id: "cover-cloth", label: "遮光布／透氣布", kind: "supply", image: birdAssets.preparation.cover, preparedLabel: "已準備", description: "覆蓋外出籠可減少視覺刺激與緊迫。", reason: "協助鳥在陌生移動中平靜。", caution: "不可遮住通風口。", sourceLabel: "鳥類外出準備", feedback: "遮光布已收好。", expenseIds: ["bird-cover-cloth"], placement: { x: 38, y: 56, width: 22, layer: 6 } },
  { id: "species-food", label: "少量熟悉飼料", kind: "supply", image: birdAssets.preparation.food, preparedLabel: "已準備", description: "途中備少量符合食性的熟悉飼料。", reason: "避免在緊迫時提供陌生或錯誤食物。", caution: "依物種食性選擇，不能混用。", sourceLabel: "鳥類飲食要點", feedback: "熟悉飼料已備好。", expenseIds: ["bird-starter-food"], placement: { x: 60, y: 54, width: 16, layer: 6 } },
  { id: "water-supply", label: "防翻飲水容器", kind: "supply", image: birdAssets.preparation.water, preparedLabel: "已準備", description: "長途移動準備適量飲水，安全停靠時補充。", reason: "維持途中水分供應。", caution: "避免開放容器在車內打翻。", sourceLabel: "鳥類飲水建議", feedback: "飲水容器已收妥。", placement: { x: 65, y: 66, width: 12, layer: 6 } },
  { id: "id-card", label: "身分證", kind: "document", image: birdAssets.preparation.idCard, preparedLabel: "已攜帶", description: "領養或購買交接可能需要身分確認。", reason: "方便完成交接資料。", caution: "依單位通知確認文件。", sourceLabel: "接回文件", feedback: "身分證已放入文件夾。", placement: { x: 20, y: 36, width: 15, layer: 4 } },
  { id: "adoption-documents", label: "領養文件／健康說明", kind: "document", image: birdAssets.preparation.documents, preparedLabel: "已攜帶", description: "確認健康資訊與來源合法性說明。", reason: "讓交接與來源資料完整。", caution: "保留合法來源證明。", sourceLabel: "鳥的來源建議", feedback: "文件已收好。", placement: { x: 23, y: 32, width: 23, layer: 3 } },
];
export const birdPreparation = { roomItems: birdRoomItems, hazards: birdHazards, trunkItems: birdTrunkItems } as const;
