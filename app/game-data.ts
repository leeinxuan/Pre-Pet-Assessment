import type {
  CareMember,
  ExpenseRecord,
  HazardItem,
  Profile,
  RoomItem,
  Scenario,
  TrunkItem,
} from "./game-types";

export const money = new Intl.NumberFormat("zh-TW");

export const stations = [
  ["01", "選擇寵物", "遇見想領養的牠"],
  ["02", "領養前準備", "為牠準備一個家"],
  ["03", "飼養生活", "從接回家到長期陪伴"],
  ["04", "認識你", "回到真實的你"],
  ["05", "評估報告", "我的飼養準備報告"],
] as const;

export const intros = [
  {
    title: "\u9078\u64c7\u5925\u4f34",
    body: "\u5148\u9078\u5b9a\u7269\u7a2e\u8207\u54c1\u7a2e\uff0c\u7406\u89e3\u7260\u672a\u4f86\u53ef\u80fd\u9700\u8981\u7684\u751f\u6d3b\u7bc0\u594f\u3002",
    icon: "pet",
    tip: "",
  },
  {
    title: "\u9818\u990a\u524d\u6e96\u5099",
    body: "\u6574\u7406\u751f\u6d3b\u7a7a\u9593\u3001\u63a5\u56de\u7528\u54c1\u8207\u57fa\u672c\u7167\u9867\u5b89\u6392\uff0c\u8b93\u5230\u5bb6\u7b2c\u4e00\u5929\u66f4\u5b89\u7a69\u3002",
    icon: "home",
    tip: "",
  },
  {
    title: "\u63a5\u7260\u56de\u5bb6",
    body: "\u5f9e\u5b89\u5168\u642d\u8eca\u5230\u7b2c\u4e00\u6b21\u9032\u9580\uff0c\u7528\u7a69\u5b9a\u7684\u6b65\u8abf\u966a\u7260\u8a8d\u8b58\u65b0\u74b0\u5883\u3002",
    icon: "car",
    tip: "",
  },
  {
    title: "\u65e5\u5e38\u7167\u8b77",
    body: "\u628a\u98f2\u98df\u3001\u6563\u6b65\u3001\u6e05\u6f54\u8207\u4e92\u52d5\uff0c\u6162\u6162\u8b8a\u6210\u6bcf\u5929\u505a\u5f97\u5230\u7684\u7bc0\u594f\u3002",
    icon: "sun",
    tip: "",
  },
  {
    title: "\u5065\u5eb7\u89c0\u5bdf",
    body: "\u7576\u98df\u617e\u3001\u7cbe\u795e\u6216\u8eab\u9ad4\u72c0\u6cc1\u6539\u8b8a\u6642\uff0c\u5b78\u6703\u8a18\u9304\u4e26\u627e\u5c08\u696d\u5354\u52a9\u3002",
    icon: "health",
    tip: "",
  },
  {
    title: "\u751f\u6d3b\u8b8a\u5316",
    body: "\u5fd9\u788c\u3001\u642c\u5bb6\u6216\u9ad8\u9f61\u968e\u6bb5\u4f86\u81e8\u6642\uff0c\u91cd\u65b0\u5b89\u6392\u7167\u9867\u8207\u652f\u63f4\u3002",
    icon: "change",
    tip: "",
  },
  {
    title: "\u8cc7\u6599\u88dc\u5145",
    body: "\u628a\u4f60\u7684\u751f\u6d3b\u689d\u4ef6\u88dc\u9f4a\uff0c\u8b93\u63d0\u9192\u66f4\u8cbc\u8fd1\u771f\u5be6\u7167\u9867\u72c0\u6cc1\u3002",
    icon: "note",
    tip: "",
  },
  {
    title: "\u7167\u9867\u7e3d\u89bd",
    body: "\u5c07\u9019\u8d9f\u7df4\u7fd2\u6574\u7406\u6210\u6e05\u55ae\uff0c\u5e36\u8457\u5177\u9ad4\u91cd\u9ede\u56de\u5230\u73fe\u5be6\u751f\u6d3b\u3002",
    icon: "check",
    tip: "",
  },
] as const;

export const categories = [
  { id: "dog", label: "犬", icon: "🐕", image: "/assets/species/dog.png", active: true },
  { id: "cat", label: "貓", icon: "🐈", image: "/assets/species/cat.png", active: false },
  { id: "rabbit", label: "兔", icon: "🐇", image: "/assets/species/rabbit.png", active: false },
  { id: "bird", label: "鳥", icon: "🦜", image: "/assets/species/bird.png", active: false },
  { id: "reptile", label: "爬蟲", icon: "🦎", image: "/assets/species/reptile.png", active: false },
  { id: "small", label: "小型哺乳", icon: "🐹", image: "/assets/species/small-mammal.png", active: false },
];

export const breeds = [
  { id: "chihuahua", label: "吉娃娃", icon: "🐕", image: "/assets/species/dog/chihuahua.png", size: "small", shortDescription: "體型嬌小、警覺性高，適合室內陪伴生活。雖然活動空間需求較小，仍需要規律散步與溫和社會化。" },
  { id: "poodle", label: "貴賓犬", icon: "🐩", image: "/assets/species/dog/poodle.png", size: "small", shortDescription: "聰明、親人且學習力強，需要足夠互動、益智活動與定期美容整理。適合願意投入陪伴與訓練時間的家庭。" },
  { id: "shiba", label: "柴犬", icon: "🐕", image: "/assets/species/dog/shiba.png", size: "medium", shortDescription: "個性獨立、精力充沛，也可能較有主見。需要穩定訓練、充足散步與安全的外出牽繩管理。" },
  { id: "border", label: "邊境牧羊犬", icon: "🐕‍🦺", image: "/assets/species/dog/border-collie.png", size: "medium", shortDescription: "學習力與精力都非常高，需要大量運動、訓練和腦力刺激。較適合生活步調活躍、能長時間陪伴互動的飼主。" },
  { id: "labrador", label: "拉布拉多", icon: "🦮", image: "/assets/species/dog/labrador.png", size: "large", shortDescription: "親人、友善且活潑，通常喜歡互動與戶外活動。需要足夠運動、體重管理及基本服從訓練。" },
];

export type PetSize = "small" | "medium" | "large";

export const sizeBasedCosts: Record<PetSize, {
  monthlyFood: number;
  monthlyWasteBags: number;
  monthlyPreventiveMedicine: number;
  carrier: number;
  leash: number;
  bed: number;
  seniorSupplies: number;
}> = {
  small: { monthlyFood: 800, monthlyWasteBags: 150, monthlyPreventiveMedicine: 600, carrier: 900, leash: 700, bed: 700, seniorSupplies: 1000 },
  medium: { monthlyFood: 1200, monthlyWasteBags: 200, monthlyPreventiveMedicine: 900, carrier: 1200, leash: 950, bed: 900, seniorSupplies: 1500 },
  large: { monthlyFood: 1800, monthlyWasteBags: 300, monthlyPreventiveMedicine: 1300, carrier: 1800, leash: 1200, bed: 1300, seniorSupplies: 2200 },
};

export function getPetSizeForBreed(breedId: string): PetSize {
  const size = breeds.find((item) => item.id === breedId)?.size;
  return size === "small" || size === "large" ? size : "medium";
}

export function applySizeBasedExpenseAmount(expense: ExpenseRecord, petSize: PetSize): ExpenseRecord {
  const costs = sizeBasedCosts[petSize];
  const sizeAmountById: Record<string, number> = {
    "monthly-food-main": costs.monthlyFood,
    "monthly-waste-bags": costs.monthlyWasteBags,
    "monthly-preventive-medicine": costs.monthlyPreventiveMedicine,
    carrier: costs.carrier,
    leash: costs.leash,
    bed: costs.bed,
    "senior-slipmat": costs.seniorSupplies,
    "senior-access-bed": costs.seniorSupplies,
  };
  const amount = sizeAmountById[expense.id];
  return typeof amount === "number" ? { ...expense, amount } : expense;
}

export const expenseCatalog: Record<string, ExpenseRecord> = {
  "food-bowl": { id: "food-bowl", name: "食碗", amount: 350, category: "用品", stage: "領養前準備", recurring: false },
  "water-bowl": { id: "water-bowl", name: "水碗", amount: 350, category: "用品", stage: "領養前準備", recurring: false },
  bed: { id: "bed", name: "睡墊", amount: 900, category: "用品", stage: "領養前準備", recurring: false },
  carrier: { id: "carrier", name: "安全外出籠", amount: 1200, category: "用品", stage: "領養前準備", recurring: false },
  leash: { id: "leash", name: "牽繩與胸背帶", amount: 950, category: "用品", stage: "領養前準備", recurring: false },
  toy: { id: "toy", name: "\u73a9\u5177", amount: 450, category: "\u4e00\u6b21\u6027\u6e96\u5099\u8cbb", stage: "\u9818\u990a\u524d\u6e96\u5099", recurring: false },
  toilet: { id: "toilet", name: "尿墊或便盆", amount: 500, category: "清潔", stage: "領養前準備", recurring: false },
  cleaner: { id: "cleaner", name: "寵物友善清潔用品", amount: 420, category: "清潔", stage: "領養前準備", recurring: false },
  "starter-food": { id: "starter-food", name: "初期飼料", amount: 800, category: "飲食", stage: "領養前準備", recurring: false },
  "monthly-food-main": { id: "monthly-food-main", name: "\u6bcf\u6708\u4e3b\u98df\u8cbb", amount: 1200, category: "\u6bcf\u6708\u57fa\u672c\u652f\u51fa", stage: "\u65e5\u5e38\u7167\u8b77", recurring: true },
  "monthly-waste-bags": { id: "monthly-waste-bags", name: "\u6bcf\u6708\u64bf\u4fbf\u888b\u8207\u6e05\u6f54\u6d88\u8017\u54c1", amount: 200, category: "\u6bcf\u6708\u57fa\u672c\u652f\u51fa", stage: "\u65e5\u5e38\u6563\u6b65", recurring: true },
  "monthly-preventive-medicine": { id: "monthly-preventive-medicine", name: "\u6bcf\u6708\u9810\u9632\u85e5\u7269", amount: 900, category: "\u6bcf\u6708\u57fa\u672c\u652f\u51fa", stage: "\u65e5\u5e38\u7167\u8b77", recurring: true },
  "microchip-registration": { id: "microchip-registration", name: "\u6676\u7247\u690d\u5165\u8207\u5bf5\u7269\u767b\u8a18", amount: 1000, category: "\u5230\u5bb6\u5f8c\u5fc5\u8981\u652f\u51fa", stage: "\u5bf5\u7269\u5230\u5bb6\u5f8c", recurring: false },
  "rabies-vaccine": { id: "rabies-vaccine", name: "\u72c2\u72ac\u75c5\u75ab\u82d7", amount: 400, category: "\u5230\u5bb6\u5f8c\u5fc5\u8981\u652f\u51fa", stage: "\u5bf5\u7269\u5230\u5bb6\u5f8c", recurring: false },
  "basic-vaccine-checkup": { id: "basic-vaccine-checkup", name: "\u57fa\u790e\u75ab\u82d7\u8207\u521d\u671f\u5065\u5eb7\u6aa2\u67e5", amount: 3500, category: "\u5230\u5bb6\u5f8c\u5fc5\u8981\u652f\u51fa", stage: "\u5bf5\u7269\u5230\u5bb6\u5f8c", recurring: false },
  "sick-vet-care": { id: "sick-vet-care", name: "生病就醫與檢查", amount: 4200, category: "醫療", stage: "生病與就醫", recurring: false, fromEmergency: true },
  "journey-care-service": { id: "journey-care-service", name: "短期照顧服務", amount: 2400, category: "照顧服務", stage: "飼主生活發生改變", recurring: false },
  "senior-checkup": { id: "senior-checkup", name: "高齡健康檢查", amount: 3200, category: "醫療", stage: "逐漸進入高齡", recurring: false, fromEmergency: true },
  "senior-slipmat": { id: "senior-slipmat", name: "高齡犬防滑墊", amount: 1200, category: "高齡用品", stage: "調整高齡生活空間", recurring: false },
  "senior-access-bed": { id: "senior-access-bed", name: "低入口高齡睡墊", amount: 1800, category: "高齡用品", stage: "調整高齡生活空間", recurring: false },
};

export const roomItems: RoomItem[] = [
  { id: "bed", label: "睡墊", icon: "🛏️", image: "/assets/room/pet-bed.png", placement: { x: 67, y: 83, width: 32, layer: 2 }, required: true, need: "休息", expenseId: "bed", purpose: "提供固定且舒適的休息空間，讓小狗能安心休息。" },
  { id: "toy", label: "玩具", icon: "🦴", image: "/assets/room/toy.png", placement: { x: 73, y: 80, width: 10, layer: 4 }, required: true, need: "活動", expenseId: "toy", purpose: "合適的玩具可以提供活動與探索，也能減少因無聊產生的破壞行為。" },
  { id: "water-bowl", label: "水碗", icon: "💧", image: "/assets/room/water-bowl.png", placement: { x: 32, y: 90, width: 12, layer: 3 }, required: true, need: "飲食", expenseId: "water-bowl", purpose: "每天確認水碗乾淨，並提供足量的新鮮飲水。" },
  { id: "food-bowl", label: "狗碗", icon: "🥣", image: "/assets/room/food-bowl.png", placement: { x: 41, y: 90, width: 10, layer: 3 }, required: true, need: "飲食", expenseId: "food-bowl", purpose: "固定的飲食器具能幫助建立規律的餵食習慣。" },
  { id: "toilet", label: "尿墊", icon: "▧", image: "/assets/room/pee-pad.png", placement: { x: 15, y: 85, width: 20, layer: 1 }, required: true, need: "排泄", expenseId: "toilet", purpose: "排泄用品應與食物及休息位置分開，方便小狗建立習慣。" },
  { id: "cleaner", label: "清潔用品", icon: "🧼", image: "/assets/room/cleaner.png", placement: { x: 39, y: 46, width: 10, layer: 3 }, required: true, need: "清潔", expenseId: "cleaner", purpose: "準備安全的清潔用品，並收在小狗無法自行取得的位置。" },
  { id: "food", label: "飼料", icon: "🦴", image: "/assets/room/food.png", placement: { x: 50, y: 85, width: 9, layer: 3 }, required: true, need: "飲食", expenseId: "starter-food", purpose: "選擇符合小狗年齡、體型及健康需求的主食，並妥善保存。" },
];

export const hazards: HazardItem[] = [
  { id: "small-parts", label: "小物品", icon: "●", image: "/assets/room/small-items.png", placement: { x: 40, y: 75, width: 12, layer: 5 }, danger: "容易被誤吞，可能造成噎住或腸胃阻塞。", handling: "收進小狗無法取得的抽屜或收納盒。" },
  { id: "chocolate", label: "巧克力", icon: "🍫", image: "/assets/room/chocolate.png", placement: { x: 89, y: 78, width: 10, layer: 5  }, danger: "含有不適合狗狗的成分，可能危害健康。", handling: "放進有門的高處櫃子。" },
  { id: "chemicals", label: "清潔劑", icon: "🧴", image: "/assets/room/detergent.png", placement: { x: 62, y: 64, width: 10, layer: 5 }, danger: "可能造成誤食或皮膚接觸風險。", handling: "收進上鎖或小狗無法開啟的櫃子。" },
  { id: "cables", label: "電線", icon: "🔌", image: "/assets/room/wire.png", placement: { x: 12, y: 78, width: 20, layer: 5 }, danger: "可能被啃咬，造成受傷或觸電。", handling: "整理固定或加裝電線保護套。" },
];

export const initialMembers: CareMember[] = [
  { id: "player", name: "", age: null, isPlayer: true },
];

export const trunkItems: TrunkItem[] = [
  {
    id: "id", label: "身分證", kind: "document", image: "/assets/car/id-card.png", preparedLabel: "已攜帶",
    description: "領養單位可能需要確認領養人的身分與聯絡資料，出發前請依通知準備有效身分證明。",
    reason: "方便領養單位依其評估與交接流程核對申請人資料。",
    caution: "實際需要攜帶的文件，請依領養單位通知及評估流程確認。",
    sourceLabel: "領養單位提供的領養評估單與接回注意事項",
    feedback: "身分證已放入文件夾。", placement: { x: 20, y: 36, width: 15, layer: 4 },
  },
  {
    id: "documents", label: "領養文件", kind: "document", image: "/assets/car/adoption-documents.png", preparedLabel: "已攜帶",
    description: "如有租屋，須提供房東許可之證明。",
    reason: "如有租屋，須提供房東許可之證明。",
    caution: "實際需要攜帶的文件，請依領養單位通知及評估流程確認。",
    sourceLabel: "領養單位提供的領養評估單與接回注意事項",
    feedback: "領養文件已放入文件夾。", placement: { x: 22, y: 32, width: 24, layer: 3 },
  },
  {
    id: "carrier-kit", label: "運輸籠＋尿墊", kind: "supply", image: "/assets/car/carrier.png", preparedLabel: "已準備",
    description: "運輸籠可降低行車途中小狗在車內移動或逃脫的風險；底部鋪設尿墊，可處理緊張或長途移動時可能發生的排泄與髒污。",
    reason: "提供平穩、可固定且不干擾駕駛的安全運輸空間。",
    caution: "運輸籠尺寸需合適並保持穩定；尿墊應鋪在籠內底部，而不是鋪滿後車廂。",
    sourceLabel: "動物醫療機構與領養單位提供的安全運輸建議",
    feedback: "尿墊已鋪入運輸籠，安全運輸設備準備完成。", expenseIds: ["carrier", "toilet"], placement: { x: 51, y: 60, width: 34, layer: 5 },
  },
  {
    id: "water-kit", label: "水碗", kind: "supply", image: "/assets/car/water-bottle.png", preparedLabel: "已準備",
    description: "途中應準備飲水及可使用的水碗，視小狗狀況與路程適時補充。行車中不要放置裝滿水且容易打翻的開放水碗。",
    reason: "途中可在安全停靠時補充飲水，避免脫水或一次喝得太急。",
    caution: "水碗與飲水應收妥於側邊，行車時不要讓開放容器在車內翻倒。",
    sourceLabel: "動物醫療機構提供的外出飲水與運輸照護建議",
    feedback: "水碗與飲水已收妥。", expenseIds: ["water-bowl"], placement: { x: 55, y: 67, width: 27, layer: 6 },
  },
  {
    id: "leash", label: "牽繩", kind: "supply", image: "/assets/car/leash.png", preparedLabel: "已準備",
    description: "上下車前應先確認牽繩及合適的胸背帶已正確使用，避免小狗在陌生地點掙脫或逃跑。",
    reason: "抵達後可先控制移動範圍，再安全地讓小狗離開運輸籠。",
    caution: "牽繩應捲好並放在容易取得的位置，不要纏繞運輸籠或散落在車廂中。",
    sourceLabel: "領養單位提供的接回注意事項與外出安全提醒",
    feedback: "牽繩已收好，抵達後可以先確認安全裝備再讓小狗下車。", expenseIds: ["leash"], placement: { x: 30, y: 60, width: 25, layer: 4 },
  },
  {
    id: "cleaner", label: "清潔用品", kind: "supply", image: "/assets/room/cleaner.png", preparedLabel: "已準備",
    description: "小狗在陌生環境或移動途中可能因緊張而排泄或嘔吐，可準備清潔袋、擦拭用品及安全的清潔工具。",
    reason: "途中若發生排泄或髒污，可以盡快整理並維持運輸空間舒適。",
    caution: "包裝需密封，與飲水分開收納，也不要放進運輸籠或讓小狗直接咬到。",
    sourceLabel: "領養單位與動物醫療機構提供的接送清潔建議",
    feedback: "清潔用品已收妥，可以處理途中可能發生的髒污。", expenseIds: ["cleaner"], placement: { x: 35, y: 68, width: 12, layer: 8 },
  },
];

export const departureTrunkItems: TrunkItem[] = [
  trunkItems.find((item) => item.id === "id")!,
  trunkItems.find((item) => item.id === "documents")!,
  {
    id: "carrier", label: "運輸籠", kind: "supply", image: "/assets/car/carrier.png", preparedLabel: "已準備",
    description: "安全運輸籠可降低行車途中移動或逃脫的風險。", reason: "提供穩定的運輸空間。", caution: "確認尺寸合適並固定在平坦位置。",
    sourceLabel: "專案既有接回安全運輸建議", feedback: "運輸籠已放入後車廂。", expenseIds: ["carrier"], placement: { x: 51, y: 60, width: 34, layer: 5 },
  },
  {
    id: "pee-pad", label: "尿墊", kind: "supply", image: "/assets/car/pee-pad.png", preparedLabel: "已準備",
    description: "尿墊可協助處理移動途中可能發生的排泄與髒污。", reason: "讓運輸區域保持乾淨。", caution: "平整鋪在運輸籠預定位置下方。",
    sourceLabel: "專案既有接回安全運輸建議", feedback: "尿墊已放入後車廂底部。", expenseIds: ["toilet"], placement: { x: 49, y: 66, width: 20, layer: 6 },
  },
  trunkItems.find((item) => item.id === "water-kit")!,
  trunkItems.find((item) => item.id === "leash")!,
  trunkItems.find((item) => item.id === "cleaner")!,
];

const positive = {
  feedbackTitle: "做得很好！",
  effects: { trust: 2, wellbeing: 2, support: 1 },
} as const;
const partial = {
  feedbackTitle: "方向不錯，但還可以再調整。",
  effects: { trust: 1, wellbeing: 1, support: 1 },
} as const;
const incorrect = {
  feedbackTitle: "這個做法可能不太適合。",
  effects: { trust: -1, wellbeing: -1, support: 0 },
} as const;

export const scenarios: Scenario[] = [
  {
    id: "ride-home",
    stage: "接回家當天",
    timeLabel: "接牠回家的路上",
    title: "安全搭車回家",
    description: "牠第一次坐你的車，看起來緊張又想往車門靠近。你會怎麼安排？",
    artIndex: 8,
    reminder: "外出與交通時應採取合適防護；運輸籠或合身胸背帶能降低逃脫與干擾駕駛的風險。",
    choices: [
      { id: "secure-carrier", text: "讓牠待在固定好的安全運輸籠，車內保持安靜。", result: "correct", ...positive, explanation: "穩定的運輸空間能降低晃動、逃脫與干擾駕駛的風險。", expenseIds: ["carrier"] },
      { id: "lap", text: "請同行家人抱著牠，並盡量安撫。", result: "partial", ...partial, explanation: "陪伴有幫助，但緊急煞車時抱著仍不安全。", suggestion: "改用固定運輸籠，讓家人在旁安靜陪伴。" },
      { id: "free-car", text: "讓牠在車內自由走動，熟悉環境後就會放鬆。", result: "incorrect", ...incorrect, explanation: "自由走動可能干擾駕駛，也可能在開門時逃脫。", suggestion: "停車後重新安置到安全運輸籠再出發。" },
    ],
  },
  {
    id: "first-door",
    stage: "接回家當天",
    timeLabel: "第一次進家門",
    title: "陌生的家，從哪裡開始？",
    description: "家人很期待見牠，牠卻縮在門邊觀察。你會怎麼做？",
    artIndex: 0,
    choices: [
      { id: "quiet-zone", text: "先帶到安靜安全的小範圍，放好水，讓牠自行探索。", result: "correct", ...positive, explanation: "降低刺激並保留退路，有助於牠建立安全感。" },
      { id: "sit-nearby", text: "坐在附近陪伴，但不主動碰觸，等牠靠近。", result: "correct", ...positive, explanation: "穩定陪伴且尊重距離，是另一個合理做法。" },
      { id: "welcome-party", text: "請大家圍過來認識牠，越快熟悉家人越好。", result: "incorrect", ...incorrect, explanation: "陌生人、聲音與靠近會同時增加刺激。", suggestion: "先限制人數與聲音，讓牠主動決定互動速度。" },
    ],
  },
  {
    id: "first-meal",
    stage: "接回家當天",
    timeLabel: "到家後的第一餐",
    title: "牠沒有立刻吃飯",
    description: "牠聞了聞飼料就離開，家人想拿人類食物引誘。你會怎麼處理？",
    artIndex: 2,
    choices: [
      { id: "familiar-food", text: "提供少量原本熟悉的飼料與乾淨飲水，記錄進食狀況。", result: "correct", ...positive, explanation: "維持熟悉飲食能減少腸胃負擔，也方便觀察適應情況。", expenseIds: ["monthly-food-main"] },
      { id: "wait-calm", text: "先讓環境安靜，稍後再提供相同飼料。", result: "partial", ...partial, explanation: "減少壓力是好方向，也要持續記錄飲水與進食。", suggestion: "若長時間不吃或合併精神異常，應聯絡獸醫。" },
      { id: "table-food", text: "加很多人類食物，至少先讓牠吃下去。", result: "incorrect", ...incorrect, explanation: "突然更換或混入不適合的食物可能造成腸胃不適。", suggestion: "回到熟悉飼料，必要時詢問獸醫安全的轉食方式。" },
    ],
  },
  {
    id: "hiding",
    stage: "第一週適應期",
    timeLabel: "到家第二天",
    title: "牠躲在角落不願互動",
    description: "你靠近時牠退縮，家人擔心牠是不是不喜歡這個家。",
    artIndex: 0,
    choices: [
      { id: "observe-signals", text: "保持距離、維持固定作息，觀察牠的身體訊號。", result: "correct", ...positive, explanation: "剛到陌生環境時躲藏很常見，尊重距離能減少壓力。" },
      { id: "gentle-company", text: "在遠處安靜做自己的事，偶爾輕聲說話。", result: "correct", ...positive, explanation: "不強迫互動的陪伴也能建立熟悉感。" },
      { id: "pull-out", text: "把牠抱出來，多摸一摸就會習慣。", result: "incorrect", ...incorrect, explanation: "強迫離開躲藏處可能加深害怕，甚至引發防衛行為。", suggestion: "保留安全躲藏處，等牠主動探索。" },
    ],
  },
  {
    id: "night-anxiety",
    stage: "第一週適應期",
    timeLabel: "第一週的夜晚",
    title: "半夜一直叫或焦躁",
    description: "牠在夜裡來回走動、叫幾聲，你和家人都睡不好。",
    artIndex: 5,
    choices: [
      { id: "check-needs", text: "先確認排泄、飲水與環境安全，再用固定睡眠流程安撫。", result: "correct", ...positive, explanation: "先排除基本需求，再建立可預期的夜間節奏較穩定。" },
      { id: "nearby-bed", text: "暫時把睡墊移近一點，等適應後逐步調整。", result: "partial", ...partial, explanation: "短期提供安全感可以理解，但要避免每天任意改變規則。", suggestion: "搭配固定關燈、安靜與排泄時間。" },
      { id: "punish-noise", text: "大聲制止，讓牠知道半夜不能叫。", result: "incorrect", ...incorrect, explanation: "責罵可能把陌生環境與威脅連在一起，增加焦慮。", suggestion: "先確認需求與壓力來源，再用一致作息慢慢調整。" },
    ],
  },
  {
    id: "chewing-toilet",
    stage: "第一週適應期",
    timeLabel: "到家第一週",
    title: "咬壞物品或排泄失誤",
    description: "回家後看到被咬的拖鞋和地上的排泄物，你已經有點累了。",
    artIndex: 4,
    choices: [
      { id: "manage-environment", text: "清理現場、收好危險物，增加合適啃咬物與排泄引導。", result: "correct", ...positive, explanation: "管理環境與提供替代行為，比事後責罵更能預防再次發生。" },
      { id: "review-routine", text: "檢查散步、排泄與獨處安排，再調整時間。", result: "correct", ...positive, explanation: "行為常和需求及節奏有關，回頭檢查日常是合理做法。" },
      { id: "show-damage", text: "把牠帶到現場責罵，讓牠知道做錯了。", result: "incorrect", ...incorrect, explanation: "事後責罵很難讓牠理解原因，反而可能害怕你。", suggestion: "清理氣味、管理環境，並在正確行為發生時鼓勵。" },
    ],
  },
  {
    id: "daily-feeding",
    stage: "建立日常生活",
    timeLabel: "日常生活開始後",
    title: "每天的餵食與飲水",
    description: "生活漸漸穩定，你要建立家中每個人都能遵守的餵食方式。",
    artIndex: 2,
    choices: [
      { id: "measured-meals", text: "固定時段與份量，隨時提供乾淨飲水並記錄異常。", result: "correct", ...positive, explanation: "規律份量與飲水有助於體重、腸胃與健康觀察。", expenseIds: ["monthly-food-main", "monthly-waste-bags"] },
      { id: "family-board", text: "用家庭紀錄板標記誰餵過，避免重複餵食。", result: "correct", ...positive, explanation: "清楚交接能避免漏餐或重複餵食。" },
      { id: "free-treats", text: "家人看到牠撒嬌就各自給零食，不需要特別記錄。", result: "incorrect", ...incorrect, explanation: "多人重複餵食容易造成熱量過量，也不易追蹤食慾變化。", suggestion: "統一零食份量並記錄每日總量。" },
    ],
  },
  {
    id: "exercise",
    stage: "建立日常生活",
    timeLabel: "普通的下班日",
    title: "今天很累，還是需要活動",
    description: "你下班後很疲倦，但牠正在門邊期待今天的散步或陪玩。",
    artIndex: 5,
    supportChoice: true,
    choices: [
      { id: "rest-then-walk", text: "稍作休息後完成符合牠需求的基本散步。", result: "correct", ...positive, explanation: "照顧自己的狀態後仍完成基本需求，是可持續的安排。" },
      { id: "backup-help", text: "請前面安排好的備用照顧者協助今天的活動。", result: "correct", ...positive, explanation: "事先分工就是為了讓照顧在忙碌時不會中斷。" },
      { id: "indoor-game", text: "依牠的狀況安排嗅聞或益智等室內活動。", result: "partial", ...partial, explanation: "室內活動能補充腦力刺激，但不一定能完全取代外出與排泄需求。", suggestion: "確認基本排泄與活動量後再彈性搭配。" },
    ],
  },
  {
    id: "grooming",
    stage: "建立日常生活",
    timeLabel: "週末上午",
    title: "清潔、梳毛與例行照顧",
    description: "今天沒有意外，只是到了梳毛、清潔用品與檢查耳朵腳掌的時間。",
    artIndex: 6,
    choices: [
      { id: "gentle-routine", text: "短時間、分步完成，配合牠能接受的節奏。", result: "correct", ...positive, explanation: "把照顧拆小並建立正向經驗，能讓例行清潔更穩定。", expenseIds: ["routine-care"] },
      { id: "professional-help", text: "不熟悉的部分先請美容或醫療專業人員示範。", result: "correct", ...positive, explanation: "知道何時求助也是負責任的照顧能力。" },
      { id: "force-finish", text: "一次抓緊完成全部流程，免得拖太久。", result: "incorrect", ...incorrect, explanation: "強迫控制可能增加害怕，之後更難進行身體照護。", suggestion: "拆成短步驟，必要時尋求低壓操作協助。" },
    ],
  },
  {
    id: "low-appetite",
    stage: "健康與突發事件",
    timeLabel: "某個平常的早晨",
    title: "食慾下降、精神也不太一樣",
    description: "牠早餐吃得很少，活動力下降，但外觀看不出明顯傷口。",
    artIndex: 1,
    choices: [
      { id: "record-monitor", text: "記錄飲食、排泄與精神狀態，確認是否有其他警訊。", result: "correct", ...positive, explanation: "具體紀錄能協助判斷變化，也能提供獸醫重要資訊。" },
      { id: "offer-foods", text: "不斷換不同食物測試，看牠願意吃哪一個。", result: "partial", ...partial, explanation: "想確認食慾可以理解，但頻繁換食會干擾判斷。", suggestion: "先記錄原飲食狀況，並留意是否需要聯絡獸醫。" },
      { id: "ignore-day", text: "牠應該只是心情不好，先完全不處理。", result: "incorrect", ...incorrect, explanation: "精神與食慾同時改變可能是健康警訊。", suggestion: "開始紀錄並依持續時間、嚴重度與其他症狀諮詢獸醫。" },
    ],
  },
  {
    id: "contact-vet",
    stage: "健康與突發事件",
    timeLabel: "症狀持續之後",
    title: "要不要聯絡獸醫？",
    description: "幾小時後牠仍沒精神，還出現嘔吐。你會怎麼做？",
    artIndex: 3,
    reminder: "提供必要醫療是飼主責任的一部分；異常持續或惡化時，不宜只靠網路自行判斷。",
    choices: [
      { id: "call-vet", text: "整理紀錄並立即聯絡獸醫，依專業建議就醫。", result: "correct", ...positive, explanation: "症狀持續且增加時，及早由專業人員判斷能降低延誤風險。", expenseIds: ["first-checkup"] },
      { id: "ask-online", text: "先在社群詢問，等有人遇過相同狀況再決定。", result: "partial", ...partial, explanation: "蒐集經驗不能取代個別醫療評估。", suggestion: "同時直接聯絡獸醫，不要只等待網路回覆。" },
      { id: "wait-days", text: "再等幾天，真的很嚴重再去。", result: "incorrect", ...incorrect, explanation: "等待可能讓脫水、疼痛或其他病況惡化。", suggestion: "現在就聯絡獸醫，說明持續時間與症狀變化。" },
    ],
  },
  {
    id: "medical-cost",
    stage: "健康與突發事件",
    timeLabel: "到達動物醫院",
    title: "臨時醫療支出",
    description: "獸醫建議進一步檢查與治療，費用超出本月原本預算。",
    artIndex: 3,
    choices: [
      { id: "use-emergency", text: "使用緊急預備金，並和院所確認必要項目與後續計畫。", result: "correct", ...positive, explanation: "預備金正是用來避免必要醫療因臨時現金不足而中斷。", expenseIds: ["emergency-exam"] },
      { id: "discuss-plan", text: "和獸醫討論檢查優先順序、分階段方案與可行付款安排。", result: "correct", ...positive, explanation: "坦白討論資源限制，有助於在醫療需要與負擔間找到方案。", expenseIds: ["emergency-exam"] },
      { id: "cheapest-only", text: "不問差異，直接選最便宜的處理方式。", result: "incorrect", ...incorrect, explanation: "只看價格可能忽略必要診斷與風險。", suggestion: "先請獸醫解釋每項目的目的、急迫性與替代方案。" },
    ],
  },
  {
    id: "travel",
    stage: "生活變化",
    timeLabel: "需要離家三天",
    title: "誰能在你不在時照顧牠？",
    description: "臨時收到出差通知，你需要安排餵食、活動、清潔與緊急聯絡。",
    artIndex: 5,
    supportChoice: true,
    choices: [
      { id: "assigned-backup", text: "聯絡前面安排好的備用照顧者，交接作息與緊急資訊。", result: "correct", ...positive, explanation: "既有分工能縮短臨時協調時間，也讓照顧延續一致。" },
      { id: "boarding-service", text: "選擇評估過的照顧服務，完整交接健康與行為資料。", result: "correct", ...positive, explanation: "合適的專業服務也是可行備案，但要提早確認環境與紀錄。", expenseIds: ["boarding"] },
      { id: "leave-alone", text: "放足飼料和水，讓牠自己待三天。", result: "incorrect", ...incorrect, explanation: "長時間無人查看會有飲水、排泄、健康與安全風險。", suggestion: "安排可信任照顧者或合適寄宿服務，保留每日回報。" },
    ],
  },
  {
    id: "work-change",
    stage: "生活變化",
    timeLabel: "工作時間改變",
    title: "每天晚兩小時回家",
    description: "新的工作安排讓原本的散步與晚餐時間都受到影響。",
    artIndex: 5,
    supportChoice: true,
    choices: [
      { id: "redistribute", text: "和照顧成員重新分配晚餐與活動，自己保留其他主要工作。", result: "correct", ...positive, explanation: "生活改變時重新分工，能避免所有責任落在單一人身上。" },
      { id: "paid-walker", text: "評估可信任的散步或到府服務，並保留交接紀錄。", result: "partial", ...partial, explanation: "外部服務可以補位，但仍要評估人員、犬隻適應與持續費用。", suggestion: "先試行並安排家人或自己的備援。" },
      { id: "just-wait", text: "讓牠每天多等兩小時，應該會自己習慣。", result: "incorrect", ...incorrect, explanation: "長期延後飲食、排泄與活動可能影響健康與行為。", suggestion: "重新安排照顧者或服務，讓基本需求維持穩定。" },
    ],
  },
  {
    id: "moving",
    stage: "生活變化",
    timeLabel: "準備搬家",
    title: "新住處與家庭狀況改變",
    description: "新住處規定、空間與同住者都不同，你需要重新確認能否繼續穩定照顧。",
    artIndex: 7,
    reminder: "搬家或生活改變時，應先尋求合法且安全的照顧調整；不能任意棄置動物。",
    choices: [
      { id: "check-housing", text: "先確認租約、社區規定、門窗安全與家人共識，再安排搬遷。", result: "correct", ...positive, explanation: "把居住規則、安全與支持系統一起確認，能降低搬家後的衝突。", expenseIds: ["moving"] },
      { id: "temporary-support", text: "若短期無法入住，先安排可信任的合法暫時照顧。", result: "correct", ...positive, explanation: "有期限與交接的暫時安排，比倉促放棄更負責任。" },
      { id: "abandon", text: "若新住處不能養，就把牠留在原地或隨意送人。", result: "incorrect", ...incorrect, explanation: "任意棄置有安全與法律風險，也讓動物失去必要照顧。", suggestion: "先尋求家人、原領養單位、合法轉養與專業協助。" },
    ],
  },
  {
    id: "senior-life",
    stage: "生活變化",
    timeLabel: "一起生活很多年後",
    title: "牠慢慢進入老年",
    description: "牠走得比較慢、睡得更多，也需要更頻繁的健康追蹤。",
    artIndex: 1,
    choices: [
      { id: "adapt-senior", text: "調整活動強度、止滑與休息空間，安排老年健康檢查。", result: "correct", ...positive, explanation: "依身體變化調整環境與醫療追蹤，是長期照顧的重要部分。", expenseIds: ["senior"] },
      { id: "gentle-routine-senior", text: "保留牠喜歡的日常，但縮短時間並觀察恢復狀況。", result: "correct", ...positive, explanation: "老年不等於完全停止活動，適度且可調整的日常有助於生活品質。" },
      { id: "same-intensity", text: "維持年輕時的活動量，不能讓牠變懶。", result: "incorrect", ...incorrect, explanation: "忽略關節、心肺與恢復能力可能造成疼痛或受傷。", suggestion: "和獸醫討論適合的活動量，依當天狀況彈性調整。" },
    ],
  },
];

export const scenarioStages: Record<number, { start: number; end: number }> = {
  3: { start: 0, end: 2 },
  4: { start: 3, end: 8 },
  5: { start: 9, end: 11 },
  6: { start: 12, end: 15 },
};

export const initialProfile: Profile = {
  age: "",
  role: "",
  roleOther: "",
  hoursAway: "",
  careHours: "",
  housing: "",
  landlordConsent: "",
  hasHousemates: null,
  housematesConsent: null,
  housemateList: [],
  housemateTypes: [],
  otherHousemate: "",
  activitySpace: "",
  otherActivitySpace: "",
  homeSpaceImage: "",
  homeSpaceImageName: "",
  noShibaExperience: false,
  pastPetTypes: [],
  pastDogCount: "",
  pastCatCount: "",
  pastOther: "",
  currentPetTypes: [],
  currentDogCount: "",
  currentCatCount: "",
  currentOther: "",
  experienceNote: "",
  experience: "",
  pastPets: "",
  currentPets: "",
  reasons: [],
  reasonOther: "",
  monthlyBudget: "",
  emergencyFund: null,
  backupSupport: null,
};
