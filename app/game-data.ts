import type {
  CareAssignment,
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
  ["03", "接回家", "接牠回家的那一天"],
  ["04", "日常生活", "一起生活的日常"],
  ["05", "健康與意外", "生病與意外來臨時"],
  ["06", "生活變化", "當生活發生改變"],
  ["07", "認識你", "回到真實的你"],
  ["08", "評估報告", "我的飼養準備報告"],
] as const;

export const intros = [
  {
    eyebrow: "第一站 · 遇見想領養的牠",
    title: "先從你想一起生活的動物開始",
    body: "不同物種、不同品種，會遇到很不一樣的日常。選擇後，我們會帶你從領養前準備一路走進長期生活。",
    icon: "🐾",
    tip: "這不是承諾，隨時都能回來更換。",
  },
  {
    eyebrow: "第二站 · 為牠準備一個家",
    title: "在出發以前，把家、照顧者與行李準備好",
    body: "安全的空間、清楚的分工與合適的接送用品，能讓接回家的第一天少一點匆忙。",
    icon: "⌂",
    tip: "每項購買只會記錄一次，返回調整不會重複扣款。",
  },
  {
    eyebrow: "第三站 · 接牠回家的那一天",
    title: "車門關上後，你們的共同生活正式開始",
    body: "從安全搭車、第一次進家門到第一餐，每個小決定都會影響牠對新環境的第一印象。",
    icon: "🚗",
    tip: "先穩定、再親近，給牠一點理解陌生世界的時間。",
  },
  {
    eyebrow: "第四站 · 一起生活的日常",
    title: "把第一週的磨合，慢慢變成每天的節奏",
    body: "適應、飲食、散步、陪玩與清潔不只有突發狀況，也包含很多平凡而安心的日常。",
    icon: "☀",
    tip: "穩定的小事，往往比一次做到完美更重要。",
  },
  {
    eyebrow: "第五站 · 生病與意外來臨時",
    title: "當牠看起來不太一樣，你會怎麼判斷？",
    body: "觀察、聯絡獸醫、交通與醫療預備金，會在真正需要時一起發揮作用。",
    icon: "✚",
    tip: "及早詢問不代表小題大作，而是把風險留給專業判斷。",
  },
  {
    eyebrow: "第六站 · 當生活發生改變",
    title: "工作、旅行、搬家與老年，都會重新安排生活",
    body: "長期照顧不是永遠不變，而是在每次變動時仍能找到安全、合法且負責任的安排。",
    icon: "↻",
    tip: "前面建立的備用照顧者，會在這一段真正派上用場。",
  },
  {
    eyebrow: "第七站 · 回到真實的你",
    title: "把模擬生活，放回你現在的生活條件",
    body: "你已經陪牠走過一段模擬生活。現在讓我們把遊戲中的經驗放回你的真實生活中，看看哪些部分已經準備好，哪些還需要確認。",
    icon: "◎",
    tip: "沒有理想答案，真實資料才有助於產生有用的報告。",
  },
  {
    eyebrow: "最後一站 · 我的飼養準備報告",
    title: "把一路上的選擇，整理成下一步行動",
    body: "報告不判斷合格或不合格，而是整合準備、學習、費用與生活條件，指出已具備與需要再確認的部分。",
    icon: "✓",
    tip: "可以帶著報告與家人、獸醫或收容所逐項討論。",
  },
] as const;

export const categories = [
  { id: "dog", label: "犬", icon: "🐕", active: true },
  { id: "cat", label: "貓", icon: "🐈", active: false },
  { id: "rabbit", label: "兔", icon: "🐇", active: false },
  { id: "bird", label: "鳥", icon: "🦜", active: false },
  { id: "reptile", label: "爬蟲", icon: "🦎", active: false },
  { id: "small", label: "小型哺乳", icon: "🐹", active: false },
];

export const breeds = [
  { id: "chihuahua", label: "吉娃娃", icon: "🐕", shortDescription: "體型嬌小、警覺性高，適合室內陪伴生活。雖然活動空間需求較小，仍需要規律散步與溫和社會化。" },
  { id: "poodle", label: "貴賓犬", icon: "🐩", shortDescription: "聰明、親人且學習力強，需要足夠互動、益智活動與定期美容整理。適合願意投入陪伴與訓練時間的家庭。" },
  { id: "shiba", label: "柴犬", icon: "🐕", shortDescription: "個性獨立、精力充沛，也可能較有主見。需要穩定訓練、充足散步與安全的外出牽繩管理。" },
  { id: "border", label: "邊境牧羊犬", icon: "🐕‍🦺", shortDescription: "學習力與精力都非常高，需要大量運動、訓練和腦力刺激。較適合生活步調活躍、能長時間陪伴互動的飼主。" },
  { id: "labrador", label: "拉布拉多", icon: "🦮", shortDescription: "親人、友善且活潑，通常喜歡互動與戶外活動。需要足夠運動、體重管理及基本服從訓練。" },
];

export const expenseCatalog: Record<string, ExpenseRecord> = {
  "food-bowl": { id: "food-bowl", name: "食碗", amount: 350, category: "用品", stage: "領養前準備", recurring: false },
  "water-bowl": { id: "water-bowl", name: "水碗", amount: 350, category: "用品", stage: "領養前準備", recurring: false },
  bed: { id: "bed", name: "睡墊", amount: 900, category: "用品", stage: "領養前準備", recurring: false },
  carrier: { id: "carrier", name: "安全外出籠", amount: 1200, category: "用品", stage: "領養前準備", recurring: false },
  leash: { id: "leash", name: "牽繩與胸背帶", amount: 950, category: "用品", stage: "領養前準備", recurring: false },
  toy: { id: "toy", name: "益智玩具", amount: 450, category: "用品", stage: "領養前準備", recurring: false },
  toilet: { id: "toilet", name: "尿墊或便盆", amount: 500, category: "清潔", stage: "領養前準備", recurring: false },
  cleaner: { id: "cleaner", name: "寵物友善清潔用品", amount: 420, category: "清潔", stage: "領養前準備", recurring: false },
  "food-monthly": { id: "food-monthly", name: "每月飼料", amount: 1600, category: "飲食", stage: "建立日常生活", recurring: true },
  "waste-monthly": { id: "waste-monthly", name: "每月清潔耗材", amount: 450, category: "清潔", stage: "建立日常生活", recurring: true },
  "routine-care": { id: "routine-care", name: "每月例行保健準備", amount: 600, category: "醫療", stage: "建立日常生活", recurring: true },
  "first-checkup": { id: "first-checkup", name: "初次健康檢查", amount: 1800, category: "醫療", stage: "接回家當天", recurring: false },
  "emergency-exam": { id: "emergency-exam", name: "緊急檢查與治療", amount: 6800, category: "醫療", stage: "健康與突發事件", recurring: false, fromEmergency: true },
  boarding: { id: "boarding", name: "三日安心照顧服務", amount: 3600, category: "照顧服務", stage: "生活變化", recurring: false },
  moving: { id: "moving", name: "搬家安全設備調整", amount: 1500, category: "用品", stage: "生活變化", recurring: false },
  senior: { id: "senior", name: "老年健康檢查", amount: 3200, category: "醫療", stage: "生活變化", recurring: false, fromEmergency: true },
};

export const roomItems: RoomItem[] = [
  { id: "food-bowl", label: "食碗", icon: "🥣", required: true, need: "飲食", expenseId: "food-bowl" },
  { id: "water-bowl", label: "水碗", icon: "💧", required: true, need: "飲食", expenseId: "water-bowl" },
  { id: "bed", label: "睡墊", icon: "🛏️", required: true, need: "休息", expenseId: "bed" },
  { id: "carrier", label: "外出籠", icon: "🧳", required: true, need: "安全", expenseId: "carrier" },
  { id: "leash", label: "牽繩或胸背帶", icon: "🦮", required: true, need: "活動", expenseId: "leash" },
  { id: "toy", label: "玩具", icon: "🧸", required: false, need: "活動", expenseId: "toy" },
  { id: "toilet", label: "尿墊或便盆", icon: "▧", required: true, need: "排泄", expenseId: "toilet" },
  { id: "cleaner", label: "清潔用品", icon: "🧼", required: true, need: "清潔", expenseId: "cleaner" },
  { id: "food", label: "飼料", icon: "🦴", required: true, need: "飲食", expenseId: "food-monthly" },
];

export const hazards: HazardItem[] = [
  { id: "cables", label: "電線", icon: "🔌", hint: "整理並固定電線，避免啃咬與絆倒。" },
  { id: "chemicals", label: "清潔劑", icon: "🧴", hint: "放進有門的櫃子，避免舔食或誤觸。" },
  { id: "chocolate", label: "巧克力與危險食物", icon: "🍫", hint: "移到寵物碰不到的密閉空間。" },
  { id: "small-parts", label: "容易吞食的小物品", icon: "●", hint: "收進盒子，避免誤食與腸胃阻塞。" },
  { id: "windows", label: "未防護的門窗或陽台", icon: "▤", hint: "加裝防逃與防墜措施，確認活動區域安全。" },
];

export const careTasks = [
  { id: "breakfast", label: "早上餵食", risk: false },
  { id: "dinner", label: "晚上餵食", risk: false },
  { id: "water", label: "更換飲水", risk: false },
  { id: "walk", label: "散步或陪玩", risk: true },
  { id: "toilet", label: "清理排泄物", risk: false },
  { id: "groom", label: "梳毛與清潔", risk: false },
  { id: "shopping", label: "購買飼料及用品", risk: false },
  { id: "vet", label: "帶寵物就醫", risk: true },
  { id: "emergency", label: "臨時無法照顧時的支援", risk: true },
] as const;

export const initialMembers: CareMember[] = [
  { id: "player", name: "我", age: null, isPlayer: true },
  { id: "family-1", name: "家人", age: null, isPlayer: false },
];

export const initialAssignments: Record<string, CareAssignment> = Object.fromEntries(
  careTasks.map((task) => [task.id, { primary: "", backup: "" }]),
);

export const trunkItems: TrunkItem[] = [
  { id: "carrier", label: "安全提籠或運輸籠", icon: "🧳", kind: "essential", feedback: "行車過程中，寵物需要安全且穩定的空間。", expenseId: "carrier" },
  { id: "leash", label: "合適的牽繩", icon: "➰", kind: "essential", feedback: "下車與移動時要先確保牽繩尺寸合適。", expenseId: "leash" },
  { id: "harness", label: "胸背帶", icon: "🦺", kind: "essential", feedback: "合身胸背帶可降低掙脫風險。", expenseId: "leash" },
  { id: "water", label: "飲水", icon: "💧", kind: "essential", feedback: "路途中保留乾淨飲水，避免一次喝得太急。" },
  { id: "bowl", label: "水碗", icon: "🥣", kind: "essential", feedback: "穩定的小水碗方便在安全停靠時補水。", expenseId: "water-bowl" },
  { id: "bags", label: "清潔袋", icon: "🛍️", kind: "essential", feedback: "途中發生排泄時可以立即清理。" },
  { id: "pad", label: "尿墊", icon: "▧", kind: "essential", feedback: "尿墊能保護籠內並讓清潔更容易。", expenseId: "toilet" },
  { id: "towel", label: "毛巾", icon: "▱", kind: "essential", feedback: "熟悉或柔軟的毛巾能增加穩定感。" },
  { id: "documents", label: "領養文件", icon: "📄", kind: "essential", feedback: "確認來源、健康、晶片與交接文件，並依規定辦理登記。" },
  { id: "id", label: "身分證明", icon: "▣", kind: "essential", feedback: "辦理領養與資料更新時需要核對身分。" },
  { id: "food", label: "少量熟悉的飼料", icon: "🦴", kind: "essential", feedback: "少量熟悉食物可避免接回當天突然換食。", expenseId: "food-monthly" },
  { id: "cleaner", label: "基本清潔用品", icon: "🧼", kind: "essential", feedback: "選擇氣味溫和、寵物友善的用品。", expenseId: "cleaner" },
  { id: "one-toy", label: "一個安靜的玩具", icon: "🧸", kind: "optional", feedback: "不是最重要，但一個安靜、熟悉的玩具可以攜帶。" },
  { id: "many-toys", label: "大量新玩具", icon: "🎁", kind: "optional", feedback: "不需要一次帶太多，先以安全運輸與文件為優先。" },
  { id: "human-snack", label: "人類零食", icon: "🍪", kind: "risk", feedback: "成分可能不適合寵物，請改帶熟悉的飼料。" },
  { id: "chocolate", label: "巧克力", icon: "🍫", kind: "risk", feedback: "巧克力可能造成健康風險，請立即移除。" },
  { id: "loud-toy", label: "音量很大的玩具", icon: "📣", kind: "risk", feedback: "巨大聲響可能增加剛換環境時的壓力。" },
  { id: "box", label: "沒有蓋子的紙箱", icon: "📦", kind: "risk", feedback: "紙箱無法提供穩定防逃的行車空間。" },
  { id: "wrong-leash", label: "尺寸不合的牽繩", icon: "〰", kind: "risk", feedback: "尺寸不合容易掙脫，請換成合身裝備。" },
  { id: "perfume-cleaner", label: "香味強烈的清潔用品", icon: "🫧", kind: "risk", feedback: "強烈氣味可能刺激嗅覺，請使用溫和用品。" },
  { id: "fireworks", label: "煙火", icon: "🎆", kind: "risk", feedback: "巨大聲響與火源都不適合放在接送行李中。" },
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
      { id: "familiar-food", text: "提供少量原本熟悉的飼料與乾淨飲水，記錄進食狀況。", result: "correct", ...positive, explanation: "維持熟悉飲食能減少腸胃負擔，也方便觀察適應情況。", expenseIds: ["food-monthly"] },
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
      { id: "measured-meals", text: "固定時段與份量，隨時提供乾淨飲水並記錄異常。", result: "correct", ...positive, explanation: "規律份量與飲水有助於體重、腸胃與健康觀察。", expenseIds: ["food-monthly", "waste-monthly"] },
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
  experience: "",
  pastPets: "",
  currentPets: "",
  reasons: [],
  reasonOther: "",
  monthlyBudget: "",
  emergencyFund: null,
  backupSupport: null,
};
