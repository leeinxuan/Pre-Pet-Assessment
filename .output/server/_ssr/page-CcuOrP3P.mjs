import { a as require_react, o as __toESM, t as require_jsx_runtime } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-CcuOrP3P.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var money = new Intl.NumberFormat("zh-TW");
var stations = [
	[
		"01",
		"選擇寵物",
		"遇見想領養的牠"
	],
	[
		"02",
		"領養前準備",
		"為牠準備一個家"
	],
	[
		"03",
		"接回家",
		"接牠回家的那一天"
	],
	[
		"04",
		"日常生活",
		"一起生活的日常"
	],
	[
		"05",
		"健康與意外",
		"生病與意外來臨時"
	],
	[
		"06",
		"生活變化",
		"當生活發生改變"
	],
	[
		"07",
		"認識你",
		"回到真實的你"
	],
	[
		"08",
		"評估報告",
		"我的飼養準備報告"
	]
];
var intros = [
	{
		eyebrow: "第一站 · 遇見想領養的牠",
		title: "先從你想一起生活的動物開始",
		body: "不同物種、不同品種，會遇到很不一樣的日常。選擇後，我們會帶你從領養前準備一路走進長期生活。",
		icon: "🐾",
		tip: "這不是承諾，隨時都能回來更換。"
	},
	{
		eyebrow: "第二站 · 為牠準備一個家",
		title: "在出發以前，把家、照顧者與行李準備好",
		body: "安全的空間、清楚的分工與合適的接送用品，能讓接回家的第一天少一點匆忙。",
		icon: "⌂",
		tip: "每項購買只會記錄一次，返回調整不會重複扣款。"
	},
	{
		eyebrow: "第三站 · 接牠回家的那一天",
		title: "車門關上後，你們的共同生活正式開始",
		body: "從安全搭車、第一次進家門到第一餐，每個小決定都會影響牠對新環境的第一印象。",
		icon: "🚗",
		tip: "先穩定、再親近，給牠一點理解陌生世界的時間。"
	},
	{
		eyebrow: "第四站 · 一起生活的日常",
		title: "把第一週的磨合，慢慢變成每天的節奏",
		body: "適應、飲食、散步、陪玩與清潔不只有突發狀況，也包含很多平凡而安心的日常。",
		icon: "☀",
		tip: "穩定的小事，往往比一次做到完美更重要。"
	},
	{
		eyebrow: "第五站 · 生病與意外來臨時",
		title: "當牠看起來不太一樣，你會怎麼判斷？",
		body: "觀察、聯絡獸醫、交通與醫療預備金，會在真正需要時一起發揮作用。",
		icon: "✚",
		tip: "及早詢問不代表小題大作，而是把風險留給專業判斷。"
	},
	{
		eyebrow: "第六站 · 當生活發生改變",
		title: "工作、旅行、搬家與老年，都會重新安排生活",
		body: "長期照顧不是永遠不變，而是在每次變動時仍能找到安全、合法且負責任的安排。",
		icon: "↻",
		tip: "前面建立的備用照顧者，會在這一段真正派上用場。"
	},
	{
		eyebrow: "第七站 · 回到真實的你",
		title: "把模擬生活，放回你現在的生活條件",
		body: "你已經陪牠走過一段模擬生活。現在讓我們把遊戲中的經驗放回你的真實生活中，看看哪些部分已經準備好，哪些還需要確認。",
		icon: "◎",
		tip: "沒有理想答案，真實資料才有助於產生有用的報告。"
	},
	{
		eyebrow: "最後一站 · 我的飼養準備報告",
		title: "把一路上的選擇，整理成下一步行動",
		body: "報告不判斷合格或不合格，而是整合準備、學習、費用與生活條件，指出已具備與需要再確認的部分。",
		icon: "✓",
		tip: "可以帶著報告與家人、獸醫或收容所逐項討論。"
	}
];
var categories = [
	{
		id: "dog",
		label: "犬",
		icon: "🐕",
		active: true
	},
	{
		id: "cat",
		label: "貓",
		icon: "🐈",
		active: false
	},
	{
		id: "rabbit",
		label: "兔",
		icon: "🐇",
		active: false
	},
	{
		id: "bird",
		label: "鳥",
		icon: "🦜",
		active: false
	},
	{
		id: "reptile",
		label: "爬蟲",
		icon: "🦎",
		active: false
	},
	{
		id: "small",
		label: "小型哺乳",
		icon: "🐹",
		active: false
	}
];
var breeds = [
	{
		id: "chihuahua",
		label: "吉娃娃",
		icon: "🐕",
		shortDescription: "體型嬌小、警覺性高，適合室內陪伴生活。雖然活動空間需求較小，仍需要規律散步與溫和社會化。"
	},
	{
		id: "poodle",
		label: "貴賓犬",
		icon: "🐩",
		shortDescription: "聰明、親人且學習力強，需要足夠互動、益智活動與定期美容整理。適合願意投入陪伴與訓練時間的家庭。"
	},
	{
		id: "shiba",
		label: "柴犬",
		icon: "🐕",
		shortDescription: "個性獨立、精力充沛，也可能較有主見。需要穩定訓練、充足散步與安全的外出牽繩管理。"
	},
	{
		id: "border",
		label: "邊境牧羊犬",
		icon: "🐕‍🦺",
		shortDescription: "學習力與精力都非常高，需要大量運動、訓練和腦力刺激。較適合生活步調活躍、能長時間陪伴互動的飼主。"
	},
	{
		id: "labrador",
		label: "拉布拉多",
		icon: "🦮",
		shortDescription: "親人、友善且活潑，通常喜歡互動與戶外活動。需要足夠運動、體重管理及基本服從訓練。"
	}
];
var expenseCatalog = {
	"food-bowl": {
		id: "food-bowl",
		name: "食碗",
		amount: 350,
		category: "用品",
		stage: "領養前準備",
		recurring: false
	},
	"water-bowl": {
		id: "water-bowl",
		name: "水碗",
		amount: 350,
		category: "用品",
		stage: "領養前準備",
		recurring: false
	},
	bed: {
		id: "bed",
		name: "睡墊",
		amount: 900,
		category: "用品",
		stage: "領養前準備",
		recurring: false
	},
	carrier: {
		id: "carrier",
		name: "安全外出籠",
		amount: 1200,
		category: "用品",
		stage: "領養前準備",
		recurring: false
	},
	leash: {
		id: "leash",
		name: "牽繩與胸背帶",
		amount: 950,
		category: "用品",
		stage: "領養前準備",
		recurring: false
	},
	toy: {
		id: "toy",
		name: "益智玩具",
		amount: 450,
		category: "用品",
		stage: "領養前準備",
		recurring: false
	},
	toilet: {
		id: "toilet",
		name: "尿墊或便盆",
		amount: 500,
		category: "清潔",
		stage: "領養前準備",
		recurring: false
	},
	cleaner: {
		id: "cleaner",
		name: "寵物友善清潔用品",
		amount: 420,
		category: "清潔",
		stage: "領養前準備",
		recurring: false
	},
	"food-monthly": {
		id: "food-monthly",
		name: "每月飼料",
		amount: 1600,
		category: "飲食",
		stage: "建立日常生活",
		recurring: true
	},
	"waste-monthly": {
		id: "waste-monthly",
		name: "每月清潔耗材",
		amount: 450,
		category: "清潔",
		stage: "建立日常生活",
		recurring: true
	},
	"routine-care": {
		id: "routine-care",
		name: "每月例行保健準備",
		amount: 600,
		category: "醫療",
		stage: "建立日常生活",
		recurring: true
	},
	"first-checkup": {
		id: "first-checkup",
		name: "初次健康檢查",
		amount: 1800,
		category: "醫療",
		stage: "接回家當天",
		recurring: false
	},
	"emergency-exam": {
		id: "emergency-exam",
		name: "緊急檢查與治療",
		amount: 6800,
		category: "醫療",
		stage: "健康與突發事件",
		recurring: false,
		fromEmergency: true
	},
	boarding: {
		id: "boarding",
		name: "三日安心照顧服務",
		amount: 3600,
		category: "照顧服務",
		stage: "生活變化",
		recurring: false
	},
	moving: {
		id: "moving",
		name: "搬家安全設備調整",
		amount: 1500,
		category: "用品",
		stage: "生活變化",
		recurring: false
	},
	senior: {
		id: "senior",
		name: "老年健康檢查",
		amount: 3200,
		category: "醫療",
		stage: "生活變化",
		recurring: false,
		fromEmergency: true
	}
};
var roomItems = [
	{
		id: "food-bowl",
		label: "食碗",
		icon: "🥣",
		required: true,
		need: "飲食",
		expenseId: "food-bowl"
	},
	{
		id: "water-bowl",
		label: "水碗",
		icon: "💧",
		required: true,
		need: "飲食",
		expenseId: "water-bowl"
	},
	{
		id: "bed",
		label: "睡墊",
		icon: "🛏️",
		required: true,
		need: "休息",
		expenseId: "bed"
	},
	{
		id: "carrier",
		label: "外出籠",
		icon: "🧳",
		required: true,
		need: "安全",
		expenseId: "carrier"
	},
	{
		id: "leash",
		label: "牽繩或胸背帶",
		icon: "🦮",
		required: true,
		need: "活動",
		expenseId: "leash"
	},
	{
		id: "toy",
		label: "玩具",
		icon: "🧸",
		required: false,
		need: "活動",
		expenseId: "toy"
	},
	{
		id: "toilet",
		label: "尿墊或便盆",
		icon: "▧",
		required: true,
		need: "排泄",
		expenseId: "toilet"
	},
	{
		id: "cleaner",
		label: "清潔用品",
		icon: "🧼",
		required: true,
		need: "清潔",
		expenseId: "cleaner"
	},
	{
		id: "food",
		label: "飼料",
		icon: "🦴",
		required: true,
		need: "飲食",
		expenseId: "food-monthly"
	}
];
var hazards = [
	{
		id: "cables",
		label: "電線",
		icon: "🔌",
		hint: "整理並固定電線，避免啃咬與絆倒。"
	},
	{
		id: "chemicals",
		label: "清潔劑",
		icon: "🧴",
		hint: "放進有門的櫃子，避免舔食或誤觸。"
	},
	{
		id: "chocolate",
		label: "巧克力與危險食物",
		icon: "🍫",
		hint: "移到寵物碰不到的密閉空間。"
	},
	{
		id: "small-parts",
		label: "容易吞食的小物品",
		icon: "●",
		hint: "收進盒子，避免誤食與腸胃阻塞。"
	},
	{
		id: "windows",
		label: "未防護的門窗或陽台",
		icon: "▤",
		hint: "加裝防逃與防墜措施，確認活動區域安全。"
	}
];
var careTasks = [
	{
		id: "breakfast",
		label: "早上餵食",
		risk: false
	},
	{
		id: "dinner",
		label: "晚上餵食",
		risk: false
	},
	{
		id: "water",
		label: "更換飲水",
		risk: false
	},
	{
		id: "walk",
		label: "散步或陪玩",
		risk: true
	},
	{
		id: "toilet",
		label: "清理排泄物",
		risk: false
	},
	{
		id: "groom",
		label: "梳毛與清潔",
		risk: false
	},
	{
		id: "shopping",
		label: "購買飼料及用品",
		risk: false
	},
	{
		id: "vet",
		label: "帶寵物就醫",
		risk: true
	},
	{
		id: "emergency",
		label: "臨時無法照顧時的支援",
		risk: true
	}
];
var initialMembers = [{
	id: "player",
	name: "我",
	age: null,
	isPlayer: true
}, {
	id: "family-1",
	name: "家人",
	age: null,
	isPlayer: false
}];
var initialAssignments = Object.fromEntries(careTasks.map((task) => [task.id, {
	primary: "",
	backup: ""
}]));
var trunkItems = [
	{
		id: "carrier",
		label: "安全提籠或運輸籠",
		icon: "🧳",
		kind: "essential",
		feedback: "行車過程中，寵物需要安全且穩定的空間。",
		expenseId: "carrier"
	},
	{
		id: "leash",
		label: "合適的牽繩",
		icon: "➰",
		kind: "essential",
		feedback: "下車與移動時要先確保牽繩尺寸合適。",
		expenseId: "leash"
	},
	{
		id: "harness",
		label: "胸背帶",
		icon: "🦺",
		kind: "essential",
		feedback: "合身胸背帶可降低掙脫風險。",
		expenseId: "leash"
	},
	{
		id: "water",
		label: "飲水",
		icon: "💧",
		kind: "essential",
		feedback: "路途中保留乾淨飲水，避免一次喝得太急。"
	},
	{
		id: "bowl",
		label: "水碗",
		icon: "🥣",
		kind: "essential",
		feedback: "穩定的小水碗方便在安全停靠時補水。",
		expenseId: "water-bowl"
	},
	{
		id: "bags",
		label: "清潔袋",
		icon: "🛍️",
		kind: "essential",
		feedback: "途中發生排泄時可以立即清理。"
	},
	{
		id: "pad",
		label: "尿墊",
		icon: "▧",
		kind: "essential",
		feedback: "尿墊能保護籠內並讓清潔更容易。",
		expenseId: "toilet"
	},
	{
		id: "towel",
		label: "毛巾",
		icon: "▱",
		kind: "essential",
		feedback: "熟悉或柔軟的毛巾能增加穩定感。"
	},
	{
		id: "documents",
		label: "領養文件",
		icon: "📄",
		kind: "essential",
		feedback: "確認來源、健康、晶片與交接文件，並依規定辦理登記。"
	},
	{
		id: "id",
		label: "身分證明",
		icon: "▣",
		kind: "essential",
		feedback: "辦理領養與資料更新時需要核對身分。"
	},
	{
		id: "food",
		label: "少量熟悉的飼料",
		icon: "🦴",
		kind: "essential",
		feedback: "少量熟悉食物可避免接回當天突然換食。",
		expenseId: "food-monthly"
	},
	{
		id: "cleaner",
		label: "基本清潔用品",
		icon: "🧼",
		kind: "essential",
		feedback: "選擇氣味溫和、寵物友善的用品。",
		expenseId: "cleaner"
	},
	{
		id: "one-toy",
		label: "一個安靜的玩具",
		icon: "🧸",
		kind: "optional",
		feedback: "不是最重要，但一個安靜、熟悉的玩具可以攜帶。"
	},
	{
		id: "many-toys",
		label: "大量新玩具",
		icon: "🎁",
		kind: "optional",
		feedback: "不需要一次帶太多，先以安全運輸與文件為優先。"
	},
	{
		id: "human-snack",
		label: "人類零食",
		icon: "🍪",
		kind: "risk",
		feedback: "成分可能不適合寵物，請改帶熟悉的飼料。"
	},
	{
		id: "chocolate",
		label: "巧克力",
		icon: "🍫",
		kind: "risk",
		feedback: "巧克力可能造成健康風險，請立即移除。"
	},
	{
		id: "loud-toy",
		label: "音量很大的玩具",
		icon: "📣",
		kind: "risk",
		feedback: "巨大聲響可能增加剛換環境時的壓力。"
	},
	{
		id: "box",
		label: "沒有蓋子的紙箱",
		icon: "📦",
		kind: "risk",
		feedback: "紙箱無法提供穩定防逃的行車空間。"
	},
	{
		id: "wrong-leash",
		label: "尺寸不合的牽繩",
		icon: "〰",
		kind: "risk",
		feedback: "尺寸不合容易掙脫，請換成合身裝備。"
	},
	{
		id: "perfume-cleaner",
		label: "香味強烈的清潔用品",
		icon: "🫧",
		kind: "risk",
		feedback: "強烈氣味可能刺激嗅覺，請使用溫和用品。"
	},
	{
		id: "fireworks",
		label: "煙火",
		icon: "🎆",
		kind: "risk",
		feedback: "巨大聲響與火源都不適合放在接送行李中。"
	}
];
var positive = {
	feedbackTitle: "做得很好！",
	effects: {
		trust: 2,
		wellbeing: 2,
		support: 1
	}
};
var partial = {
	feedbackTitle: "方向不錯，但還可以再調整。",
	effects: {
		trust: 1,
		wellbeing: 1,
		support: 1
	}
};
var incorrect = {
	feedbackTitle: "這個做法可能不太適合。",
	effects: {
		trust: -1,
		wellbeing: -1,
		support: 0
	}
};
var scenarios = [
	{
		id: "ride-home",
		stage: "接回家當天",
		timeLabel: "接牠回家的路上",
		title: "安全搭車回家",
		description: "牠第一次坐你的車，看起來緊張又想往車門靠近。你會怎麼安排？",
		artIndex: 8,
		reminder: "外出與交通時應採取合適防護；運輸籠或合身胸背帶能降低逃脫與干擾駕駛的風險。",
		choices: [
			{
				id: "secure-carrier",
				text: "讓牠待在固定好的安全運輸籠，車內保持安靜。",
				result: "correct",
				...positive,
				explanation: "穩定的運輸空間能降低晃動、逃脫與干擾駕駛的風險。",
				expenseIds: ["carrier"]
			},
			{
				id: "lap",
				text: "請同行家人抱著牠，並盡量安撫。",
				result: "partial",
				...partial,
				explanation: "陪伴有幫助，但緊急煞車時抱著仍不安全。",
				suggestion: "改用固定運輸籠，讓家人在旁安靜陪伴。"
			},
			{
				id: "free-car",
				text: "讓牠在車內自由走動，熟悉環境後就會放鬆。",
				result: "incorrect",
				...incorrect,
				explanation: "自由走動可能干擾駕駛，也可能在開門時逃脫。",
				suggestion: "停車後重新安置到安全運輸籠再出發。"
			}
		]
	},
	{
		id: "first-door",
		stage: "接回家當天",
		timeLabel: "第一次進家門",
		title: "陌生的家，從哪裡開始？",
		description: "家人很期待見牠，牠卻縮在門邊觀察。你會怎麼做？",
		artIndex: 0,
		choices: [
			{
				id: "quiet-zone",
				text: "先帶到安靜安全的小範圍，放好水，讓牠自行探索。",
				result: "correct",
				...positive,
				explanation: "降低刺激並保留退路，有助於牠建立安全感。"
			},
			{
				id: "sit-nearby",
				text: "坐在附近陪伴，但不主動碰觸，等牠靠近。",
				result: "correct",
				...positive,
				explanation: "穩定陪伴且尊重距離，是另一個合理做法。"
			},
			{
				id: "welcome-party",
				text: "請大家圍過來認識牠，越快熟悉家人越好。",
				result: "incorrect",
				...incorrect,
				explanation: "陌生人、聲音與靠近會同時增加刺激。",
				suggestion: "先限制人數與聲音，讓牠主動決定互動速度。"
			}
		]
	},
	{
		id: "first-meal",
		stage: "接回家當天",
		timeLabel: "到家後的第一餐",
		title: "牠沒有立刻吃飯",
		description: "牠聞了聞飼料就離開，家人想拿人類食物引誘。你會怎麼處理？",
		artIndex: 2,
		choices: [
			{
				id: "familiar-food",
				text: "提供少量原本熟悉的飼料與乾淨飲水，記錄進食狀況。",
				result: "correct",
				...positive,
				explanation: "維持熟悉飲食能減少腸胃負擔，也方便觀察適應情況。",
				expenseIds: ["food-monthly"]
			},
			{
				id: "wait-calm",
				text: "先讓環境安靜，稍後再提供相同飼料。",
				result: "partial",
				...partial,
				explanation: "減少壓力是好方向，也要持續記錄飲水與進食。",
				suggestion: "若長時間不吃或合併精神異常，應聯絡獸醫。"
			},
			{
				id: "table-food",
				text: "加很多人類食物，至少先讓牠吃下去。",
				result: "incorrect",
				...incorrect,
				explanation: "突然更換或混入不適合的食物可能造成腸胃不適。",
				suggestion: "回到熟悉飼料，必要時詢問獸醫安全的轉食方式。"
			}
		]
	},
	{
		id: "hiding",
		stage: "第一週適應期",
		timeLabel: "到家第二天",
		title: "牠躲在角落不願互動",
		description: "你靠近時牠退縮，家人擔心牠是不是不喜歡這個家。",
		artIndex: 0,
		choices: [
			{
				id: "observe-signals",
				text: "保持距離、維持固定作息，觀察牠的身體訊號。",
				result: "correct",
				...positive,
				explanation: "剛到陌生環境時躲藏很常見，尊重距離能減少壓力。"
			},
			{
				id: "gentle-company",
				text: "在遠處安靜做自己的事，偶爾輕聲說話。",
				result: "correct",
				...positive,
				explanation: "不強迫互動的陪伴也能建立熟悉感。"
			},
			{
				id: "pull-out",
				text: "把牠抱出來，多摸一摸就會習慣。",
				result: "incorrect",
				...incorrect,
				explanation: "強迫離開躲藏處可能加深害怕，甚至引發防衛行為。",
				suggestion: "保留安全躲藏處，等牠主動探索。"
			}
		]
	},
	{
		id: "night-anxiety",
		stage: "第一週適應期",
		timeLabel: "第一週的夜晚",
		title: "半夜一直叫或焦躁",
		description: "牠在夜裡來回走動、叫幾聲，你和家人都睡不好。",
		artIndex: 5,
		choices: [
			{
				id: "check-needs",
				text: "先確認排泄、飲水與環境安全，再用固定睡眠流程安撫。",
				result: "correct",
				...positive,
				explanation: "先排除基本需求，再建立可預期的夜間節奏較穩定。"
			},
			{
				id: "nearby-bed",
				text: "暫時把睡墊移近一點，等適應後逐步調整。",
				result: "partial",
				...partial,
				explanation: "短期提供安全感可以理解，但要避免每天任意改變規則。",
				suggestion: "搭配固定關燈、安靜與排泄時間。"
			},
			{
				id: "punish-noise",
				text: "大聲制止，讓牠知道半夜不能叫。",
				result: "incorrect",
				...incorrect,
				explanation: "責罵可能把陌生環境與威脅連在一起，增加焦慮。",
				suggestion: "先確認需求與壓力來源，再用一致作息慢慢調整。"
			}
		]
	},
	{
		id: "chewing-toilet",
		stage: "第一週適應期",
		timeLabel: "到家第一週",
		title: "咬壞物品或排泄失誤",
		description: "回家後看到被咬的拖鞋和地上的排泄物，你已經有點累了。",
		artIndex: 4,
		choices: [
			{
				id: "manage-environment",
				text: "清理現場、收好危險物，增加合適啃咬物與排泄引導。",
				result: "correct",
				...positive,
				explanation: "管理環境與提供替代行為，比事後責罵更能預防再次發生。"
			},
			{
				id: "review-routine",
				text: "檢查散步、排泄與獨處安排，再調整時間。",
				result: "correct",
				...positive,
				explanation: "行為常和需求及節奏有關，回頭檢查日常是合理做法。"
			},
			{
				id: "show-damage",
				text: "把牠帶到現場責罵，讓牠知道做錯了。",
				result: "incorrect",
				...incorrect,
				explanation: "事後責罵很難讓牠理解原因，反而可能害怕你。",
				suggestion: "清理氣味、管理環境，並在正確行為發生時鼓勵。"
			}
		]
	},
	{
		id: "daily-feeding",
		stage: "建立日常生活",
		timeLabel: "日常生活開始後",
		title: "每天的餵食與飲水",
		description: "生活漸漸穩定，你要建立家中每個人都能遵守的餵食方式。",
		artIndex: 2,
		choices: [
			{
				id: "measured-meals",
				text: "固定時段與份量，隨時提供乾淨飲水並記錄異常。",
				result: "correct",
				...positive,
				explanation: "規律份量與飲水有助於體重、腸胃與健康觀察。",
				expenseIds: ["food-monthly", "waste-monthly"]
			},
			{
				id: "family-board",
				text: "用家庭紀錄板標記誰餵過，避免重複餵食。",
				result: "correct",
				...positive,
				explanation: "清楚交接能避免漏餐或重複餵食。"
			},
			{
				id: "free-treats",
				text: "家人看到牠撒嬌就各自給零食，不需要特別記錄。",
				result: "incorrect",
				...incorrect,
				explanation: "多人重複餵食容易造成熱量過量，也不易追蹤食慾變化。",
				suggestion: "統一零食份量並記錄每日總量。"
			}
		]
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
			{
				id: "rest-then-walk",
				text: "稍作休息後完成符合牠需求的基本散步。",
				result: "correct",
				...positive,
				explanation: "照顧自己的狀態後仍完成基本需求，是可持續的安排。"
			},
			{
				id: "backup-help",
				text: "請前面安排好的備用照顧者協助今天的活動。",
				result: "correct",
				...positive,
				explanation: "事先分工就是為了讓照顧在忙碌時不會中斷。"
			},
			{
				id: "indoor-game",
				text: "依牠的狀況安排嗅聞或益智等室內活動。",
				result: "partial",
				...partial,
				explanation: "室內活動能補充腦力刺激，但不一定能完全取代外出與排泄需求。",
				suggestion: "確認基本排泄與活動量後再彈性搭配。"
			}
		]
	},
	{
		id: "grooming",
		stage: "建立日常生活",
		timeLabel: "週末上午",
		title: "清潔、梳毛與例行照顧",
		description: "今天沒有意外，只是到了梳毛、清潔用品與檢查耳朵腳掌的時間。",
		artIndex: 6,
		choices: [
			{
				id: "gentle-routine",
				text: "短時間、分步完成，配合牠能接受的節奏。",
				result: "correct",
				...positive,
				explanation: "把照顧拆小並建立正向經驗，能讓例行清潔更穩定。",
				expenseIds: ["routine-care"]
			},
			{
				id: "professional-help",
				text: "不熟悉的部分先請美容或醫療專業人員示範。",
				result: "correct",
				...positive,
				explanation: "知道何時求助也是負責任的照顧能力。"
			},
			{
				id: "force-finish",
				text: "一次抓緊完成全部流程，免得拖太久。",
				result: "incorrect",
				...incorrect,
				explanation: "強迫控制可能增加害怕，之後更難進行身體照護。",
				suggestion: "拆成短步驟，必要時尋求低壓操作協助。"
			}
		]
	},
	{
		id: "low-appetite",
		stage: "健康與突發事件",
		timeLabel: "某個平常的早晨",
		title: "食慾下降、精神也不太一樣",
		description: "牠早餐吃得很少，活動力下降，但外觀看不出明顯傷口。",
		artIndex: 1,
		choices: [
			{
				id: "record-monitor",
				text: "記錄飲食、排泄與精神狀態，確認是否有其他警訊。",
				result: "correct",
				...positive,
				explanation: "具體紀錄能協助判斷變化，也能提供獸醫重要資訊。"
			},
			{
				id: "offer-foods",
				text: "不斷換不同食物測試，看牠願意吃哪一個。",
				result: "partial",
				...partial,
				explanation: "想確認食慾可以理解，但頻繁換食會干擾判斷。",
				suggestion: "先記錄原飲食狀況，並留意是否需要聯絡獸醫。"
			},
			{
				id: "ignore-day",
				text: "牠應該只是心情不好，先完全不處理。",
				result: "incorrect",
				...incorrect,
				explanation: "精神與食慾同時改變可能是健康警訊。",
				suggestion: "開始紀錄並依持續時間、嚴重度與其他症狀諮詢獸醫。"
			}
		]
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
			{
				id: "call-vet",
				text: "整理紀錄並立即聯絡獸醫，依專業建議就醫。",
				result: "correct",
				...positive,
				explanation: "症狀持續且增加時，及早由專業人員判斷能降低延誤風險。",
				expenseIds: ["first-checkup"]
			},
			{
				id: "ask-online",
				text: "先在社群詢問，等有人遇過相同狀況再決定。",
				result: "partial",
				...partial,
				explanation: "蒐集經驗不能取代個別醫療評估。",
				suggestion: "同時直接聯絡獸醫，不要只等待網路回覆。"
			},
			{
				id: "wait-days",
				text: "再等幾天，真的很嚴重再去。",
				result: "incorrect",
				...incorrect,
				explanation: "等待可能讓脫水、疼痛或其他病況惡化。",
				suggestion: "現在就聯絡獸醫，說明持續時間與症狀變化。"
			}
		]
	},
	{
		id: "medical-cost",
		stage: "健康與突發事件",
		timeLabel: "到達動物醫院",
		title: "臨時醫療支出",
		description: "獸醫建議進一步檢查與治療，費用超出本月原本預算。",
		artIndex: 3,
		choices: [
			{
				id: "use-emergency",
				text: "使用緊急預備金，並和院所確認必要項目與後續計畫。",
				result: "correct",
				...positive,
				explanation: "預備金正是用來避免必要醫療因臨時現金不足而中斷。",
				expenseIds: ["emergency-exam"]
			},
			{
				id: "discuss-plan",
				text: "和獸醫討論檢查優先順序、分階段方案與可行付款安排。",
				result: "correct",
				...positive,
				explanation: "坦白討論資源限制，有助於在醫療需要與負擔間找到方案。",
				expenseIds: ["emergency-exam"]
			},
			{
				id: "cheapest-only",
				text: "不問差異，直接選最便宜的處理方式。",
				result: "incorrect",
				...incorrect,
				explanation: "只看價格可能忽略必要診斷與風險。",
				suggestion: "先請獸醫解釋每項目的目的、急迫性與替代方案。"
			}
		]
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
			{
				id: "assigned-backup",
				text: "聯絡前面安排好的備用照顧者，交接作息與緊急資訊。",
				result: "correct",
				...positive,
				explanation: "既有分工能縮短臨時協調時間，也讓照顧延續一致。"
			},
			{
				id: "boarding-service",
				text: "選擇評估過的照顧服務，完整交接健康與行為資料。",
				result: "correct",
				...positive,
				explanation: "合適的專業服務也是可行備案，但要提早確認環境與紀錄。",
				expenseIds: ["boarding"]
			},
			{
				id: "leave-alone",
				text: "放足飼料和水，讓牠自己待三天。",
				result: "incorrect",
				...incorrect,
				explanation: "長時間無人查看會有飲水、排泄、健康與安全風險。",
				suggestion: "安排可信任照顧者或合適寄宿服務，保留每日回報。"
			}
		]
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
			{
				id: "redistribute",
				text: "和照顧成員重新分配晚餐與活動，自己保留其他主要工作。",
				result: "correct",
				...positive,
				explanation: "生活改變時重新分工，能避免所有責任落在單一人身上。"
			},
			{
				id: "paid-walker",
				text: "評估可信任的散步或到府服務，並保留交接紀錄。",
				result: "partial",
				...partial,
				explanation: "外部服務可以補位，但仍要評估人員、犬隻適應與持續費用。",
				suggestion: "先試行並安排家人或自己的備援。"
			},
			{
				id: "just-wait",
				text: "讓牠每天多等兩小時，應該會自己習慣。",
				result: "incorrect",
				...incorrect,
				explanation: "長期延後飲食、排泄與活動可能影響健康與行為。",
				suggestion: "重新安排照顧者或服務，讓基本需求維持穩定。"
			}
		]
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
			{
				id: "check-housing",
				text: "先確認租約、社區規定、門窗安全與家人共識，再安排搬遷。",
				result: "correct",
				...positive,
				explanation: "把居住規則、安全與支持系統一起確認，能降低搬家後的衝突。",
				expenseIds: ["moving"]
			},
			{
				id: "temporary-support",
				text: "若短期無法入住，先安排可信任的合法暫時照顧。",
				result: "correct",
				...positive,
				explanation: "有期限與交接的暫時安排，比倉促放棄更負責任。"
			},
			{
				id: "abandon",
				text: "若新住處不能養，就把牠留在原地或隨意送人。",
				result: "incorrect",
				...incorrect,
				explanation: "任意棄置有安全與法律風險，也讓動物失去必要照顧。",
				suggestion: "先尋求家人、原領養單位、合法轉養與專業協助。"
			}
		]
	},
	{
		id: "senior-life",
		stage: "生活變化",
		timeLabel: "一起生活很多年後",
		title: "牠慢慢進入老年",
		description: "牠走得比較慢、睡得更多，也需要更頻繁的健康追蹤。",
		artIndex: 1,
		choices: [
			{
				id: "adapt-senior",
				text: "調整活動強度、止滑與休息空間，安排老年健康檢查。",
				result: "correct",
				...positive,
				explanation: "依身體變化調整環境與醫療追蹤，是長期照顧的重要部分。",
				expenseIds: ["senior"]
			},
			{
				id: "gentle-routine-senior",
				text: "保留牠喜歡的日常，但縮短時間並觀察恢復狀況。",
				result: "correct",
				...positive,
				explanation: "老年不等於完全停止活動，適度且可調整的日常有助於生活品質。"
			},
			{
				id: "same-intensity",
				text: "維持年輕時的活動量，不能讓牠變懶。",
				result: "incorrect",
				...incorrect,
				explanation: "忽略關節、心肺與恢復能力可能造成疼痛或受傷。",
				suggestion: "和獸醫討論適合的活動量，依當天狀況彈性調整。"
			}
		]
	}
];
var scenarioStages = {
	3: {
		start: 0,
		end: 2
	},
	4: {
		start: 3,
		end: 8
	},
	5: {
		start: 9,
		end: 11
	},
	6: {
		start: 12,
		end: 15
	}
};
var initialProfile = {
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
	backupSupport: null
};
var import_jsx_runtime = require_jsx_runtime();
function StepHeading({ eyebrow, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "step-heading",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: body })
		]
	});
}
function NavButtons({ onBack, onNext, nextLabel = "繼續下一站", disabled = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nav-buttons",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "secondary",
			onClick: onBack,
			children: "← 返回"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "primary",
			onClick: onNext,
			disabled,
			children: [
				nextLabel,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })
			]
		})]
	});
}
function StageRail({ step, onGoTo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		className: "station-rail",
		"aria-label": "體驗進度",
		children: stations.map(([number, shortLabel, longLabel], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: `${step === index + 1 ? "active" : ""} ${step > index + 1 ? "done" : ""}`,
			onClick: () => index + 1 <= step && onGoTo(index + 1),
			disabled: index + 1 > step,
			"aria-label": `${number} ${longLabel}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step > index + 1 ? "✓" : number }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: shortLabel })]
		}, number))
	});
}
function Welcome({ onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "welcome",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "welcome-nav",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "brand static",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "brand-mark",
						children: "慢"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "慢慢來，先想想" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "prototype-tag",
					children: "一段真正開始生活的領養預演"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "welcome-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "給準飼主的一段慢速旅程"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
							"在把牠帶回家以前，",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "先一起生活一次。" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hero-lead",
							children: "從準備空間、分配照顧，到接回家、建立日常、面對生病與生活變化。這不是適不適合的測驗，而是一段約 15–20 分鐘的生活時間軸。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hero-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "primary large",
								onClick: onStart,
								children: ["開始領養生活預演 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "time-pill",
								children: "◷ 約 15–20 分鐘"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "trust-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "不評分" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "不貼標籤" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "可返回調整" })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-scene",
					"aria-label": "準飼主與柴犬在家中安靜相處的插畫",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/illustrations/hero-life-preview.png",
						alt: "準飼主與柴犬在溫暖的居家空間互相觀察"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "thought",
						children: [
							"準備，不必一次到位",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "但可以先想清楚。" })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "journey-map journey-map-eight",
				children: stations.map(([number, shortLabel], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: number }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: shortLabel }),
					index < stations.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "··" })
				] }, number))
			})
		]
	});
}
function SpeciesStep({ category, breed, onCategory, onBreed, onNext }) {
	const [selectionPage, setSelectionPage] = (0, import_react.useState)(category ? "breed" : "species");
	const selectedCategory = categories.find((item) => item.id === category);
	const selectedBreed = breeds.find((item) => item.id === breed);
	function chooseCategory(id) {
		onCategory(id);
		onBreed("");
		setSelectionPage("breed");
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap partner-picker",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "partner-progress",
			"aria-label": `選擇寵物第 ${selectionPage === "species" ? 1 : 2} 步，共 2 步`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "active",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "1" }), "選擇物種"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { "aria-hidden": "true" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: selectionPage === "breed" ? "active" : "",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "2" }), "選擇品種"]
				})
			]
		}), selectionPage === "species" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "partner-selection-page",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
				eyebrow: "01 · 遇見想領養的牠",
				title: "你想領養哪一種動物？",
				body: "先選擇物種，再挑一個目前最感興趣的品種。這一版先以犬隻示範完整時間軸。"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "category-grid species-page-grid",
				children: categories.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: category === item.id ? "selected" : "",
					onClick: () => item.active && chooseCategory(item.id),
					disabled: !item.active,
					"aria-label": item.active ? `選擇${item.label}` : `${item.label}，陸續開放`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.active ? "點擊選擇" : "陸續開放" })
					]
				}, item.id))
			})]
		}, "species") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "partner-selection-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
					eyebrow: `01 · 遇見想領養的牠 · ${selectedCategory?.label ?? "犬"}`,
					title: "選擇你想領養的品種",
					body: "品種會影響後續提醒，但每隻動物仍有自己的個性與需求。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "breed-row breed-page-grid",
					children: breeds.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: breed === item.id ? "selected" : "",
						onClick: () => onBreed(item.id),
						"aria-pressed": breed === item.id,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label }),
							breed === item.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "✓" })
						]
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `selection-note breed-description ${selectedBreed ? "selected" : "empty"}`,
					role: "status",
					"aria-live": "polite",
					"aria-atomic": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: selectedBreed?.icon ?? "🐾"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: selectedBreed ? `你選擇了：${selectedBreed.label}` : "品種飼養特性" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selectedBreed?.shortDescription ?? "點選一個品種，查看牠的飼養特性。" })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButtons, {
					onBack: () => setSelectionPage("species"),
					onNext,
					disabled: !breed,
					nextLabel: "開始領養前準備"
				})
			]
		}, "breed")]
	});
}
function ExpenseDetails({ expenses, onClose }) {
	const oneTime = expenses.filter((item) => !item.recurring);
	const recurring = expenses.filter((item) => item.recurring);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "expense-modal-backdrop",
		role: "presentation",
		onMouseDown: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "expense-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "expense-title",
			onMouseDown: (event) => event.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "expense-modal-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "費用明細"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "expense-title",
						children: "一路上的實際支出"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						"aria-label": "關閉費用明細",
						children: "×"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "expense-groups",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "一次性支出" }), oneTime.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: oneTime.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						item.category,
						" · ",
						item.stage
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["NT$ ", money.format(item.amount)] })] }, item.id)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "目前還沒有一次性支出。" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "每月固定支出" }), recurring.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: recurring.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						item.category,
						" · ",
						item.stage
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
						"NT$ ",
						money.format(item.amount),
						"／月"
					] })] }, item.id)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "目前還沒有每月固定支出。" })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "primary",
					onClick: onClose,
					children: "看完明細"
				})
			]
		})
	});
}
function CostBar({ expenses, emergencyReserve, latestExpense }) {
	const [detailsOpen, setDetailsOpen] = (0, import_react.useState)(false);
	const currentMonth = expenses.reduce((sum, item) => sum + item.amount, 0);
	const recurring = expenses.filter((item) => item.recurring).reduce((sum, item) => sum + item.amount, 0);
	const emergencyUsed = expenses.filter((item) => item.fromEmergency).reduce((sum, item) => sum + item.amount, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cost-bar",
		"aria-label": "目前費用狀況",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "本月花費" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["NT$ ", money.format(currentMonth)] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "累積花費" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["NT$ ", money.format(currentMonth)] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "每月固定支出" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["NT$ ", money.format(recurring)] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "緊急預備金" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["NT$ ", money.format(Math.max(0, emergencyReserve - emergencyUsed))] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setDetailsOpen(true),
				children: ["查看明細 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "＋" })]
			}),
			latestExpense && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "expense-toast",
				role: "status",
				"aria-live": "polite",
				children: [
					latestExpense.name,
					" ＋NT$ ",
					money.format(latestExpense.amount)
				]
			})
		]
	}), detailsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseDetails, {
		expenses,
		onClose: () => setDetailsOpen(false)
	})] });
}
var preparationTitles = [
	"布置生活空間",
	"建立照顧成員",
	"分配照顧工作",
	"整理汽車後車廂"
];
function PreparationProgress({ task }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "prep-task-progress",
		"aria-label": `領養前準備第 ${task + 1} 步，共 4 步`,
		children: preparationTitles.map((title, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: `${index === task ? "active" : ""} ${index < task ? "done" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: index < task ? "✓" : index + 1 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: title })]
		}, title))
	});
}
function RoomPreparation({ selectedItems, securedHazards, onAddItem, onRemoveItem, onToggleHazard, onBack, onNext }) {
	const [message, setMessage] = (0, import_react.useState)("");
	const missing = roomItems.filter((item) => item.required).filter((item) => !selectedItems.includes(item.id));
	const unsecured = hazards.filter((item) => !securedHazards.includes(item.id));
	const complete = missing.length === 0 && unsecured.length === 0;
	const waiting = roomItems.filter((item) => !selectedItems.includes(item.id));
	function checkRoom() {
		if (complete) {
			setMessage("房間準備完成！你已經替牠準備好安全的休息、飲食與活動空間。");
			return;
		}
		if (missing.some((item) => item.need === "休息")) setMessage("還少了一個可以安心休息的地方，試著找找看適合的物品。");
		else if (missing.some((item) => item.need === "飲食")) setMessage("飲食準備還不完整，請確認食物、食碗與乾淨飲水。");
		else if (missing.some((item) => item.need === "排泄")) setMessage("還需要安排清楚的排泄空間，讓適應期更容易整理。");
		else if (unsecured.length) setMessage(`還有 ${unsecured[0].label} 尚未收好。${unsecured[0].hint}`);
		else setMessage("再確認必要用品與安全區域，就快完成了。");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap preparation-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreparationProgress, { task: 0 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
				eyebrow: "02 · 領養前準備",
				title: "先替牠布置安全的生活空間",
				body: "把用品拖進房間，或直接點擊加入；再逐一把可能造成風險的物品收好。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "prep-board expanded",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "item-shelf",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["用品準備箱 ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [waiting.length, " 件可加入"] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: waiting.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							draggable: true,
							onDragStart: (event) => event.dataTransfer.setData("text/plain", item.id),
							onClick: () => onAddItem(item.id),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [item.required ? "必要用品" : "可選用品", " · 拖曳或點擊"] })
							]
						}, item.id)) }),
						waiting.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "empty-box",
							children: "所有用品都已放進房間 ✓"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "room room-preparation",
					onDragOver: (event) => event.preventDefault(),
					onDrop: (event) => {
						event.preventDefault();
						onAddItem(event.dataTransfer.getData("text/plain"));
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "安全、休息、飲食、排泄與活動空間" }), selectedItems.map((id, index) => {
						const item = roomItems.find((entry) => entry.id === id);
						return item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: `placed item-${index % 6}`,
							onClick: () => onRemoveItem(id),
							title: "點擊移回準備箱",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label })]
						}, id) : null;
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "hazard-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "居家安全檢查"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "把危險物品收好" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "點選項目代表已完成固定、收納或防護。" })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hazard-grid",
					children: hazards.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: securedHazards.includes(item.id) ? "secured" : "",
						"aria-pressed": securedHazards.includes(item.id),
						onClick: () => onToggleHazard(item.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: securedHazards.includes(item.id) ? "✓ 已收好" : item.hint })
						]
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `task-message ${complete ? "success" : ""}`,
				role: "status",
				children: message || "完成用品放置與危險物品收納後，按下「檢查房間」。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "task-check-actions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "secondary",
					onClick: checkRoom,
					children: "檢查房間"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButtons, {
				onBack,
				onNext,
				disabled: !complete,
				nextLabel: "房間完成，建立照顧成員"
			})
		]
	});
}
function CareMemberSetup({ members, onChange, onBack, onNext }) {
	const [errors, setErrors] = (0, import_react.useState)({});
	const valid = members.every((member) => member.name.trim() && member.age !== null && member.age >= 1 && member.age <= 120);
	function updateMember(id, patch) {
		onChange(members.map((member) => member.id === id ? {
			...member,
			...patch
		} : member));
	}
	function addMember() {
		if (members.length >= 6) return;
		onChange([...members, {
			id: `member-${Date.now()}`,
			name: "",
			age: null,
			isPlayer: false
		}]);
	}
	function validate() {
		const nextErrors = {};
		members.forEach((member) => {
			if (!member.name.trim()) nextErrors[`${member.id}-name`] = "請填寫稱呼。";
			if (member.age === null || member.age < 1 || member.age > 120) nextErrors[`${member.id}-age`] = "請輸入 1～120 歲。";
		});
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length === 0) onNext();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap preparation-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreparationProgress, { task: 1 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
				eyebrow: "02 · 領養前準備",
				title: "誰會一起照顧牠？",
				body: "先建立照顧成員，下一步才能把每天與臨時的工作分配清楚。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "member-grid",
				children: members.map((member, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "member-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "member-card-head",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: member.isPlayer ? "我" : index + 1 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: member.isPlayer ? "主要玩家" : "家庭成員" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: member.isPlayer ? "不可移除" : "可修改或移除" })] }),
								!member.isPlayer && index > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => onChange(members.filter((item) => item.id !== member.id)),
									children: "移除"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["名稱或稱呼", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: member.name,
							disabled: member.isPlayer,
							placeholder: "例：媽媽",
							onChange: (event) => updateMember(member.id, { name: event.target.value })
						})] }),
						errors[`${member.id}-name`] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: errors[`${member.id}-name`]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["年齡", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							inputMode: "numeric",
							min: "1",
							max: "120",
							value: member.age ?? "",
							placeholder: "例：35",
							onChange: (event) => updateMember(member.id, { age: event.target.value ? Math.min(120, Math.max(1, Number(event.target.value))) : null })
						})] }),
						errors[`${member.id}-age`] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: errors[`${member.id}-age`]
						})
					]
				}, member.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "add-member-button",
				onClick: addMember,
				disabled: members.length >= 6,
				children: ["＋ 新增家庭成員 ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [members.length, " / 6"] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `task-message ${valid ? "success" : ""}`,
				children: valid ? "成員資料完整，可以開始分配照顧工作。" : "每位成員都需要稱呼與合理年齡。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButtons, {
				onBack,
				onNext: validate,
				disabled: false,
				nextLabel: "成員完成，開始分工"
			})
		]
	});
}
function CareTaskAssignment({ members, assignments, onChange, onBack, onNext }) {
	const [message, setMessage] = (0, import_react.useState)("");
	const memberById = (0, import_react.useMemo)(() => Object.fromEntries(members.map((member) => [member.id, member])), [members]);
	function update(taskId, key, value) {
		onChange({
			...assignments,
			[taskId]: {
				...assignments[taskId],
				[key]: value
			}
		});
	}
	const validation = (0, import_react.useMemo)(() => {
		const missing = careTasks.filter((task) => !assignments[task.id]?.primary);
		const samePerson = careTasks.filter((task) => assignments[task.id]?.primary && assignments[task.id]?.primary === assignments[task.id]?.backup);
		const playerHasTask = careTasks.some((task) => assignments[task.id]?.primary === "player");
		const temporary = assignments.emergency?.primary || assignments.emergency?.backup;
		const riskyChild = careTasks.filter((task) => task.risk && assignments[task.id]?.primary && (memberById[assignments[task.id].primary]?.age ?? 99) < 18);
		return {
			missing,
			samePerson,
			playerHasTask,
			temporary,
			riskyChild,
			valid: missing.length === 0 && samePerson.length === 0 && playerHasTask && Boolean(temporary) && riskyChild.length === 0
		};
	}, [assignments, memberById]);
	function checkAssignments() {
		if (validation.missing.length) setMessage(`還有「${validation.missing[0].label}」沒有主要負責人。`);
		else if (validation.samePerson.length) setMessage(`「${validation.samePerson[0].label}」的主要與備用負責人不能是同一人。`);
		else if (!validation.playerHasTask) setMessage("你自己至少需要負責一項主要工作。");
		else if (!validation.temporary) setMessage("請為臨時無法照顧時安排一位支援者。");
		else if (validation.riskyChild.length) setMessage(`單獨負責「${validation.riskyChild[0].label}」需要足夠判斷與控制能力。年幼成員可以一起參與，但建議由成年人負主要責任。`);
		else setMessage("分工完成！清楚的照顧分工能減少遺漏，也能避免領養後才發現沒有人有時間負責。");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap preparation-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreparationProgress, { task: 2 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
				eyebrow: "02 · 領養前準備",
				title: "把照顧工作分配清楚",
				body: "每項工作都需要主要負責人；備用者可在忙碌、出差或生病時接手。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "assignment-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "assignment-head",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "照顧工作" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "主要負責人" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "備用／協助者" })
					]
				}), careTasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "assignment-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: task.label }), task.risk && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "需要足夠判斷與控制能力" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "visually-hidden",
							children: [task.label, "主要負責人"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: assignments[task.id]?.primary ?? "",
							onChange: (event) => update(task.id, "primary", event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "請選擇"
							}), members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: member.id,
								children: [
									member.name,
									"（",
									member.age,
									" 歲）"
								]
							}, member.id))]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "visually-hidden",
							children: [task.label, "備用負責人"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: assignments[task.id]?.backup ?? "",
							onChange: (event) => update(task.id, "backup", event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "可留空"
							}), members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: member.id,
								children: [
									member.name,
									"（",
									member.age,
									" 歲）"
								]
							}, member.id))]
						})] })
					]
				}, task.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `task-message ${validation.valid ? "success" : ""}`,
				role: "status",
				children: message || "完成主要分工後，按下「檢查分工」。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "task-check-actions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "secondary",
					onClick: checkAssignments,
					children: "檢查分工"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButtons, {
				onBack,
				onNext,
				disabled: !validation.valid,
				nextLabel: "分工完成，整理後車廂"
			})
		]
	});
}
function CarTrunkPreparation({ selected, checked, passed, onToggle, onCheck, onBack, onNext }) {
	const [departing, setDeparting] = (0, import_react.useState)(false);
	const essential = trunkItems.filter((item) => item.kind === "essential");
	const selectedItems = selected.map((id) => trunkItems.find((item) => item.id === id)).filter(Boolean);
	const missing = essential.filter((item) => !selected.includes(item.id));
	const risks = selectedItems.filter((item) => item.kind === "risk");
	function checkTrunk() {
		onCheck(missing.length === 0 && risks.length === 0);
	}
	function depart() {
		setDeparting(true);
		window.setTimeout(onNext, 650);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap preparation-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreparationProgress, { task: 3 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
				eyebrow: "02 · 領養前準備",
				title: "出發接牠回家",
				body: "你準備開車去接牠了。請把接牠回家需要的物品放進後車廂。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `trunk-layout ${departing ? "departing" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "trunk-shelf",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "可選物品" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: trunkItems.filter((item) => !selected.includes(item.id)).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						draggable: true,
						onDragStart: (event) => event.dataTransfer.setData("text/plain", item.id),
						onClick: () => onToggle(item.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "拖曳或點擊放入" })
						]
					}, item.id)) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "car-trunk",
					"aria-label": "打開的汽車後車廂",
					onDragOver: (event) => event.preventDefault(),
					onDrop: (event) => {
						event.preventDefault();
						onToggle(event.dataTransfer.getData("text/plain"));
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "trunk-lid",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "後車窗" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "trunk-body",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "接牠回家的後車廂" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: selectedItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => onToggle(item.id),
								title: "點擊移出後車廂",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label })]
							}, item.id)) }),
							selectedItems.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "把物品拖進來，或點擊左側物品。" })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "trunk-check",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "secondary",
					onClick: checkTrunk,
					children: "檢查後車廂"
				})
			}),
			checked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `trunk-feedback ${passed ? "success" : "warning"}`,
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: passed ? "後車廂準備完成！" : "還需要再調整" }), passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "你已經準備好安全運輸、基本清潔及領養文件。" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [missing.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "需要補齊：" }), missing.map((item) => item.label).join("、")] }), risks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "請移除風險物品：" }), risks.map((item) => item.label).join("、")] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: [...missing.slice(0, 2), ...risks.slice(0, 3)].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label }), item.feedback] })] }, item.id)) })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButtons, {
				onBack,
				onNext: depart,
				disabled: !passed,
				nextLabel: "出發接牠"
			})
		]
	});
}
function OptionButton({ label, selected, onClick, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: `profile-option ${selected ? "selected" : ""}`,
		"aria-pressed": selected,
		onClick,
		children: [
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
				"aria-hidden": "true",
				children: "✓"
			}),
			icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: selected ? "已選擇" : "點擊選擇" })
		]
	});
}
function ProfileForm({ profile, onChange, onBack, onNext }) {
	const [page, setPage] = (0, import_react.useState)(0);
	const [errors, setErrors] = (0, import_react.useState)({});
	const titles = [
		"時間與身分",
		"居住與同住者",
		"經驗與動機",
		"預算與支援"
	];
	const update = (key, value) => onChange({
		...profile,
		[key]: value
	});
	const clamp = (raw, max) => raw === "" ? "" : String(Math.min(max, Math.max(0, Number(raw.replace(/\D/g, "")) || 0)));
	function toggleReason(reason) {
		update("reasons", profile.reasons.includes(reason) ? profile.reasons.filter((item) => item !== reason) : [...profile.reasons, reason]);
	}
	function validate(current) {
		const next = {};
		if (current === 0) {
			if (!profile.age || Number(profile.age) < 1 || Number(profile.age) > 120) next.age = "請輸入 1～120 歲。";
			if (!profile.role) next.role = "請選擇身分類型。";
			if (profile.role === "其他" && !profile.roleOther.trim()) next.roleOther = "請說明其他身分。";
			if (profile.hoursAway === "") next.hoursAway = "請填寫每天離家時間。";
			if (profile.careHours === "") next.careHours = "請填寫每天可投入時間。";
		}
		if (current === 1) {
			if (!profile.housing) next.housing = "請選擇居住類型。";
			if (profile.housing === "租屋" && !profile.landlordConsent) next.landlordConsent = "請確認房東是否同意。";
			if (profile.hasHousemates === null) next.hasHousemates = "請選擇是否有同住者。";
			if (profile.hasHousemates && profile.housematesConsent === null) next.housematesConsent = "請確認同住者是否同意。";
		}
		if (current === 2) {
			if (!profile.experience) next.experience = "請選擇飼養經驗。";
			if (!profile.reasons.length) next.reasons = "請至少選擇一項飼養動機。";
			if (profile.reasons.includes("其他") && !profile.reasonOther.trim()) next.reasonOther = "請說明其他動機。";
		}
		if (current === 3) {
			if (!profile.monthlyBudget || Number(profile.monthlyBudget) < 0) next.monthlyBudget = "請填寫每月可負擔預算。";
			if (profile.emergencyFund === null) next.emergencyFund = "請選擇是否有緊急預備金。";
			if (profile.backupSupport === null) next.backupSupport = "請選擇是否有外部支援。";
		}
		setErrors(next);
		return Object.keys(next).length === 0;
	}
	function nextPage() {
		if (!validate(page)) return;
		if (page < titles.length - 1) {
			setPage((value) => value + 1);
			setErrors({});
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		} else onNext();
	}
	function backPage() {
		setErrors({});
		if (page > 0) setPage((value) => value - 1);
		else onBack();
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap profile-wizard",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-bridge",
				children: "你已經陪牠走過一段模擬生活。現在讓我們把遊戲中的經驗放回你的真實生活中，看看哪些部分已經準備好，哪些還需要確認。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "profile-wizard-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "07 · 回到真實的你"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: titles[page] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "沒有理想答案，請依照現在的生活狀況填寫。" })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
					page + 1,
					" / ",
					titles.length
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-stepper profile-stepper-four",
				"aria-label": `認識你第 ${page + 1} 步，共 ${titles.length} 步`,
				children: titles.map((title, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `${index === page ? "active" : ""} ${index < page ? "done" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: index < page ? "✓" : index + 1 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: title })]
				}, title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "profile-panel",
				children: [
					page === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-number-field",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "real-age",
									children: "年齡"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "real-age",
									type: "number",
									min: "1",
									max: "120",
									placeholder: "例：20",
									value: profile.age,
									onChange: (event) => update("age", clamp(event.target.value, 120))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "歲" })
							]
						}),
						errors.age && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: errors.age
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "身分類型" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "identity-options",
								children: [
									["學生", "▣"],
									["上班族", "♟"],
									["退休", "◎"],
									["其他", "•••"]
								].map(([value, icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionButton, {
									label: value,
									icon,
									selected: profile.role === value,
									onClick: () => update("role", value)
								}), value === "其他" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": "其他身分",
									disabled: profile.role !== "其他",
									placeholder: "請說明",
									value: profile.roleOther,
									onChange: (event) => update("roleOther", event.target.value)
								})] }, value))
							}),
							errors.role && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "field-error",
								children: errors.role
							}),
							errors.roleOther && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "field-error",
								children: errors.roleOther
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "每天的時間" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "profile-time-grid",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["每天離家時間", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"每日 ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: "0",
										max: "24",
										value: profile.hoursAway,
										onChange: (event) => update("hoursAway", clamp(event.target.value, 24))
									}),
									" 小時"
								] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["每天能投入照顧時間", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"每日 ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: "0",
										max: "24",
										value: profile.careHours,
										onChange: (event) => update("careHours", clamp(event.target.value, 24))
									}),
									" 小時"
								] })] })]
							}),
							errors.hoursAway && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "field-error",
								children: errors.hoursAway
							}),
							errors.careHours && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "field-error",
								children: errors.careHours
							})
						] })
					] }),
					page === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "居住類型" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "housing-options",
							children: ["自有住宅", "租屋"].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionButton, {
								label: value,
								selected: profile.housing === value,
								onClick: () => update("housing", value)
							}, value))
						}),
						errors.housing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: errors.housing
						}),
						profile.housing === "租屋" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "landlord-options",
							children: ["房東已同意", "尚未取得同意"].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionButton, {
								label: value,
								selected: profile.landlordConsent === value,
								onClick: () => update("landlordConsent", value)
							}, value))
						}),
						errors.landlordConsent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: errors.landlordConsent
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "是否有同住者？" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "housemate-presence-options",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionButton, {
								label: "有",
								selected: profile.hasHousemates === true,
								onClick: () => update("hasHousemates", true)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionButton, {
								label: "無",
								selected: profile.hasHousemates === false,
								onClick: () => update("hasHousemates", false)
							})]
						}),
						errors.hasHousemates && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: errors.hasHousemates
						}),
						profile.hasHousemates === true && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "housemate-details",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "所有同住者是否知情並同意？" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "housemate-presence-options",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionButton, {
										label: "同意",
										selected: profile.housematesConsent === true,
										onClick: () => update("housematesConsent", true)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionButton, {
										label: "尚未同意",
										selected: profile.housematesConsent === false,
										onClick: () => update("housematesConsent", false)
									})]
								}),
								errors.housematesConsent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "field-error",
									children: errors.housematesConsent
								})
							]
						})
					] })] }),
					page === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "過去及目前的飼養經驗" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "experience-options",
							children: ["首次飼養", "有飼養經驗"].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionButton, {
								label: value,
								selected: profile.experience === value,
								onClick: () => update("experience", value)
							}, value))
						}),
						errors.experience && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: errors.experience
						}),
						profile.experience === "有飼養經驗" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "experience-detail open",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "experience-note",
								children: ["過去飼養經驗", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "例：曾照顧犬隻 5 年",
									value: profile.pastPets,
									onChange: (event) => update("pastPets", event.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "experience-note",
								children: ["目前家中寵物", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "例：目前有一隻貓",
									value: profile.currentPets,
									onChange: (event) => update("currentPets", event.target.value)
								})]
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: ["飼養動機 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "可複選" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "reason-options",
							children: [
								"陪伴與情緒支持",
								"喜愛動物",
								"家庭共同決定",
								"提供動物一個家",
								"生活夥伴",
								"其他"
							].map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionButton, {
								label: reason,
								selected: profile.reasons.includes(reason),
								onClick: () => toggleReason(reason)
							}, reason))
						}),
						errors.reasons && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: errors.reasons
						}),
						profile.reasons.includes("其他") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "conditional-input",
							children: ["其他動機", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "請說明",
								value: profile.reasonOther,
								onChange: (event) => update("reasonOther", event.target.value)
							})]
						}),
						errors.reasonOther && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: errors.reasonOther
						})
					] })] }),
					page === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "每月可負擔預算" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "budget-profile-input",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "NT$" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: "0",
										step: "500",
										placeholder: "例：5000",
										value: profile.monthlyBudget,
										onChange: (event) => update("monthlyBudget", clamp(event.target.value, 999999))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "不含大型突發醫療費用" })
								]
							}),
							errors.monthlyBudget && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "field-error",
								children: errors.monthlyBudget
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "是否有緊急預備金？" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "housing-options",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionButton, {
									label: "有",
									selected: profile.emergencyFund === true,
									onClick: () => update("emergencyFund", true)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionButton, {
									label: "目前沒有",
									selected: profile.emergencyFund === false,
									onClick: () => update("emergencyFund", false)
								})]
							}),
							errors.emergencyFund && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "field-error",
								children: errors.emergencyFund
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "忙碌、出差或生病時，是否有人能協助？" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "housing-options",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionButton, {
									label: "有可靠支援",
									selected: profile.backupSupport === true,
									onClick: () => update("backupSupport", true)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionButton, {
									label: "目前沒有",
									selected: profile.backupSupport === false,
									onClick: () => update("backupSupport", false)
								})]
							}),
							errors.backupSupport && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "field-error",
								children: errors.backupSupport
							})
						] })
					] })
				]
			}, page),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButtons, {
				onBack: backPage,
				onNext: nextPage,
				nextLabel: page === titles.length - 1 ? "產生我的評估報告" : "下一步"
			})
		]
	});
}
function AssessmentReport({ breed, profile, expenses, emergencyReserve, roomReady, hazardsReady, members, assignments, trunkSelected, trunkPassed, answers, onBack, onReset }) {
	const recurring = expenses.filter((item) => item.recurring).reduce((sum, item) => sum + item.amount, 0);
	const oneTime = expenses.filter((item) => !item.recurring && item.category === "用品").reduce((sum, item) => sum + item.amount, 0);
	const medical = expenses.filter((item) => item.category === "醫療").reduce((sum, item) => sum + item.amount, 0);
	const total = expenses.reduce((sum, item) => sum + item.amount, 0);
	const emergencyUsed = expenses.filter((item) => item.fromEmergency).reduce((sum, item) => sum + item.amount, 0);
	const correctFirst = Object.values(answers).filter((item) => item.firstResult === "correct").length;
	const corrected = Object.values(answers).filter((item) => item.firstResult !== "correct" && scenarios.find((scenario) => scenario.id === item.scenarioId)?.choices.find((choice) => choice.id === item.finalChoiceId)?.result === "correct").length;
	const needsLearning = Object.values(answers).filter((item) => item.firstResult === "incorrect").map((item) => scenarios.find((scenario) => scenario.id === item.scenarioId)?.title).filter(Boolean);
	const backupIds = new Set([...Object.values(assignments).map((item) => item.backup), assignments.emergency?.primary].filter((id) => Boolean(id) && id !== "player"));
	const backupNames = members.filter((member) => backupIds.has(member.id)).map((member) => member.name);
	const requiredRoom = roomItems.filter((item) => item.required);
	const roomCompletion = Math.round(roomReady.filter((id) => requiredRoom.some((item) => item.id === id)).length / requiredRoom.length * 100);
	const assignmentCompletion = Math.round(careTasks.filter((task) => assignments[task.id]?.primary).length / careTasks.length * 100);
	const budgetEnough = Number(profile.monthlyBudget) >= recurring;
	const strongSignals = [
		roomCompletion === 100 && hazardsReady.length === 5 && assignmentCompletion === 100 && trunkPassed,
		correctFirst >= 11,
		budgetEnough,
		profile.emergencyFund === true,
		profile.backupSupport === true,
		profile.housing !== "租屋" || profile.landlordConsent === "房東已同意",
		profile.hasHousemates !== true || profile.housematesConsent === true
	].filter(Boolean).length;
	const level = strongSignals >= 6 ? "已具備多項準備" : strongSignals >= 4 ? "有部分條件需要先確認" : "建議暫緩並完成準備事項";
	const prepared = [
		roomCompletion === 100 && "必要用品與生活空間已完成",
		hazardsReady.length === 5 && "居家危險物已完成收納與防護",
		assignmentCompletion === 100 && "日常照顧工作已有主要負責人",
		backupNames.length > 0 && `已有備用照顧者：${backupNames.join("、")}`,
		trunkPassed && "接送行李、文件與安全運輸已通過檢查",
		correctFirst >= 11 && `${correctFirst} 個情境第一次就選擇適當做法`,
		budgetEnough && "每月預算可涵蓋目前固定支出"
	].filter(Boolean);
	const confirm = [
		roomCompletion < 100 && `必要用品完成度 ${roomCompletion}%`,
		hazardsReady.length < 5 && "仍有居家危險物需要防護",
		backupNames.length === 0 && "尚未建立可用的備用照顧者",
		!trunkPassed && "接寵物後車廂尚未通過檢查",
		!budgetEnough && `每月預算低於目前固定支出 NT$ ${money.format(recurring)}`,
		profile.emergencyFund === false && "目前沒有緊急預備金",
		...needsLearning.slice(0, 5).map((item) => `情境需要再確認：${item}`)
	].filter(Boolean);
	const familyTopics = [
		profile.hasHousemates && profile.housematesConsent !== true && "所有同住者是否知情並同意飼養",
		profile.housing === "租屋" && profile.landlordConsent !== "房東已同意" && "租屋規定與房東書面同意",
		profile.backupSupport === false && "忙碌、出差或生病時由誰接手",
		assignmentCompletion < 100 && "未完成的照顧工作如何分配"
	].filter(Boolean);
	const actions = [
		...confirm.slice(0, 5),
		"帶著品種需求與醫療紀錄問題詢問獸醫或領養單位",
		"將每月固定支出與緊急預備金分開存放"
	];
	const selectedBreed = breeds.find((item) => item.id === breed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap summary-page assessment-report",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "summary-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "08 · 我的飼養準備報告"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: level }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "這不是合格或不合格，而是把模擬生活轉成下一步可執行的準備。" })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "summary-pet",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedBreed?.icon ?? "🐕" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["我想領養", selectedBreed?.label] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							correctFirst,
							" / ",
							scenarios.length,
							" 題第一次適當"
						] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "report-level",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "綜合準備狀態" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: level }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "參考準備任務、第一次作答、費用與真實生活條件。" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "領養前準備" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "家、分工與接送" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "report-metrics",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "房間必要用品" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [roomCompletion, "%"] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "危險物防護" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [hazardsReady.length, " / 5"] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "工作分配" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [assignmentCompletion, "%"] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "備用照顧者" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: backupNames.length ? backupNames.join("、") : "尚未安排" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "後車廂" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: trunkPassed ? "已通過" : `${trunkSelected.length} 件已放入` })] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "card-head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "情境學習" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "第一次選擇與修正" })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "learning-counts",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: correctFirst }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "第一次適當" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: corrected }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "提醒後修正" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: needsLearning.length }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "需要再了解" })] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "all-clear",
								children: needsLearning.length ? `優先主題：${needsLearning.slice(0, 3).join("、")}` : "所有情境都已留下可行方向，仍可持續向專業人員學習。"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "03" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "費用狀況" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "實際事件累積" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "report-metrics",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "一次性用品費" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(oneTime)] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "本月／累積支出" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(total)] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "每月固定支出" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(recurring)] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "醫療與突發" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(medical)] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "剩餘緊急預備金" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(Math.max(0, emergencyReserve - emergencyUsed))] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "推估一年基本支出" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(recurring * 12)] })] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card profile-summary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "04" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "真實生活條件" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "時間、住居與支援" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "每日時間" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
								"離家 ",
								profile.hoursAway,
								" 小時／照顧 ",
								profile.careHours,
								" 小時"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "居住條件" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [profile.housing, profile.housing === "租屋" ? ` · ${profile.landlordConsent}` : ""] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "同住者支持" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: profile.hasHousemates ? profile.housematesConsent ? "已同意" : "尚待確認" : "無同住者" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "飼養經驗" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: profile.experience })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "每月預算" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(Number(profile.monthlyBudget))] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "外部支援" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: profile.backupSupport ? "有可靠支援" : "目前沒有" })] })
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card readiness",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "05" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "已經準備好" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "可以延續的部分" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: prepared.length ? prepared.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: "green",
							children: "✓"
						}), item] }, item)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: "yellow",
							children: "?"
						}), "目前先從完成領養前準備清單開始。"] }) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card todo",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "06" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "建議再確認" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "需要補上的條件" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: confirm.length ? confirm.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: "yellow",
							children: "!"
						}), item] }, item)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: "green",
							children: "✓"
						}), "目前主要條件已有方向，請持續依實際個體調整。"] }) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card discuss",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "07" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "和家人討論" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "需要共同決定" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: familyTopics.length ? familyTopics.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: "orange",
							children: "●"
						}), item] }, item)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: "green",
							children: "✓"
						}), "目前家庭支持條件已有明確方向。"] }) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card action-list",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "08" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "領養前行動清單" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "下一步可以這樣做" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: actions.slice(0, 7).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item)) })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "summary-footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "這份報告不判斷你是否適合飼養。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"它整理的是現在已具備的條件，以及真正領養前值得再確認的部分。"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "secondary",
					onClick: onReset,
					children: "重新預演"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary",
					onClick: () => window.print(),
					children: ["列印／儲存報告 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "↗" })]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "text-back",
				onClick: onBack,
				children: "← 回去調整真實生活資料"
			})
		]
	});
}
function ScenarioFeedback({ scenario, choice, onRetry, onContinue }) {
	const label = {
		correct: {
			icon: "✓",
			button: "繼續下一個情境"
		},
		partial: {
			icon: "△",
			button: "記住建議，繼續"
		},
		incorrect: {
			icon: "!",
			button: "看完建議，繼續"
		}
	}[choice.result];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `scenario-feedback ${choice.result}`,
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "feedback-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: scenario.timeLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: choice.feedbackTitle })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: choice.explanation }),
			choice.suggestion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "feedback-suggestion",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "可以這樣調整" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: choice.suggestion })]
			}),
			scenario.reminder && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "law-reminder",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "i" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "生活裡的法規提醒" }), scenario.reminder] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "feedback-actions",
				children: [choice.result === "incorrect" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "secondary",
					onClick: onRetry,
					children: "重新選一次"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary",
					onClick: onContinue,
					children: [
						label.button,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })
					]
				})]
			})
		]
	});
}
function ScenarioGame({ start, end, index, answers, backupNames, onIndex, onChoose, onBackStage, onCompleteStage }) {
	const scenario = scenarios[index];
	const answer = answers[scenario.id];
	const [feedbackOpen, setFeedbackOpen] = (0, import_react.useState)(Boolean(answer));
	(0, import_react.useEffect)(() => {
		setFeedbackOpen(Boolean(answers[scenarios[index].id]));
	}, [index, answers]);
	const selectedChoice = (0, import_react.useMemo)(() => scenario.choices.find((choice) => choice.id === answer?.finalChoiceId) ?? null, [answer, scenario.choices]);
	const stageScenarios = scenarios.slice(start, end + 1);
	const stageComplete = stageScenarios.every((item) => Boolean(answers[item.id]));
	const position = index - start;
	const hasBackup = backupNames.length > 0;
	function choose(choice) {
		onChoose(scenario, choice);
		setFeedbackOpen(true);
	}
	function continueJourney() {
		if (index < end) {
			onIndex(index + 1);
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		} else if (stageComplete) onCompleteStage();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap scenario-page timeline-scenario",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scene-progress",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${(position + 1) / stageScenarios.length * 100}%` } }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						scenario.stage,
						" · ",
						scenario.timeLabel
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
						position + 1,
						" / ",
						stageScenarios.length
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "timeline-strip",
				"aria-label": "生活時間軸",
				children: stageScenarios.map((item, itemIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: `${start + itemIndex === index ? "active" : ""} ${answers[item.id] ? answers[item.id].firstResult : ""}`,
					onClick: () => onIndex(start + itemIndex),
					"aria-label": `前往${item.timeLabel}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: answers[item.id] ? "✓" : itemIndex + 1 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.timeLabel })]
				}, item.id))
			}),
			!feedbackOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "scene-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "scene-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: scenario.stage
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: scenario.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: scenario.description }),
						scenario.supportChoice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `support-link ${hasBackup ? "ready" : "missing"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hasBackup ? "✓" : "!" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: hasBackup ? `可聯絡：${backupNames.join("、")}` : "目前沒有可用的備用照顧者" }), hasBackup ? "前面建立的分工可以在這裡使用。" : "你仍可選其他方案，但報告會提醒支援不足。"] })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `scene-art scene-${scenario.artIndex}`,
					"aria-hidden": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scene-sprite" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: scenario.timeLabel })]
				})]
			}, scenario.id), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "reflection",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "如果是你，會怎麼做？" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "choice-grid",
					children: scenario.choices.map((choice) => {
						const unavailableBackup = (choice.id === "backup-help" || choice.id === "assigned-backup") && !hasBackup;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							disabled: unavailableBackup,
							onClick: () => choose(choice),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: choice.result === "correct" ? "可行做法" : choice.result === "partial" ? "需要調整" : "先想一想" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: choice.text }),
								unavailableBackup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "前面尚未安排備用照顧者" })
							]
						}, choice.id);
					})
				})]
			})] }) : selectedChoice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioFeedback, {
				scenario,
				choice: selectedChoice,
				onRetry: () => setFeedbackOpen(false),
				onContinue: continueJourney
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scenario-bottom-nav",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary",
						onClick: () => index > start ? onIndex(index - 1) : onBackStage(),
						children: ["← ", index > start ? "上一個情境" : "返回上一階段"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						Object.values(answers).filter((item) => stageScenarios.some((scenarioItem) => scenarioItem.id === item.scenarioId)).length,
						" / ",
						stageScenarios.length,
						" 已完成"
					] }),
					index === end && stageComplete && !feedbackOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary",
						onClick: onCompleteStage,
						children: ["前往下一階段 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
					})
				]
			})
		]
	});
}
var initialScenarioCursors = {
	3: 0,
	4: 3,
	5: 9,
	6: 12
};
var emergencyReserve = 2e4;
function Home() {
	const [step, setStep] = (0, import_react.useState)(0);
	const [introOpen, setIntroOpen] = (0, import_react.useState)(false);
	const [category, setCategory] = (0, import_react.useState)("");
	const [breed, setBreed] = (0, import_react.useState)("");
	const [preparationTask, setPreparationTask] = (0, import_react.useState)(0);
	const [roomReady, setRoomReady] = (0, import_react.useState)([]);
	const [hazardsReady, setHazardsReady] = (0, import_react.useState)([]);
	const [members, setMembers] = (0, import_react.useState)(initialMembers);
	const [assignments, setAssignments] = (0, import_react.useState)(initialAssignments);
	const [trunkSelected, setTrunkSelected] = (0, import_react.useState)([]);
	const [trunkChecked, setTrunkChecked] = (0, import_react.useState)(false);
	const [trunkPassed, setTrunkPassed] = (0, import_react.useState)(false);
	const [expenses, setExpenses] = (0, import_react.useState)([]);
	const [latestExpense, setLatestExpense] = (0, import_react.useState)(null);
	const [scenarioCursors, setScenarioCursors] = (0, import_react.useState)(initialScenarioCursors);
	const [scenarioAnswers, setScenarioAnswers] = (0, import_react.useState)({});
	const [profile, setProfile] = (0, import_react.useState)(initialProfile);
	const backupNames = (0, import_react.useMemo)(() => {
		const backupIds = new Set([...Object.values(assignments).map((assignment) => assignment.backup), assignments.emergency?.primary].filter((id) => Boolean(id) && id !== "player"));
		return members.filter((member) => backupIds.has(member.id)).map((member) => member.name);
	}, [assignments, members]);
	function goTo(next) {
		setStep(next);
		setIntroOpen(next > 0);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function addExpenseById(id) {
		const expense = expenseCatalog[id];
		if (!expense) return;
		setExpenses((current) => {
			if (current.some((item) => item.id === id)) return current;
			setLatestExpense(expense);
			window.setTimeout(() => setLatestExpense((active) => active?.id === id ? null : active), 1800);
			return [...current, expense];
		});
	}
	function addRoomItem(id) {
		if (!id) return;
		setRoomReady((current) => current.includes(id) ? current : [...current, id]);
		addExpenseById(id === "food" ? "food-monthly" : id);
	}
	function toggleHazard(id) {
		setHazardsReady((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
	}
	function updateMembers(nextMembers) {
		const validIds = new Set(nextMembers.map((member) => member.id));
		setMembers(nextMembers);
		setAssignments((current) => Object.fromEntries(Object.entries(current).map(([taskId, assignment]) => [taskId, {
			primary: validIds.has(assignment.primary) ? assignment.primary : "",
			backup: validIds.has(assignment.backup) ? assignment.backup : ""
		}])));
	}
	function toggleTrunkItem(id) {
		if (!id) return;
		const adding = !trunkSelected.includes(id);
		setTrunkSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
		setTrunkChecked(false);
		setTrunkPassed(false);
		if (adding) {
			const expenseId = trunkItems.find((item) => item.id === id)?.expenseId;
			if (expenseId) addExpenseById(expenseId);
		}
	}
	function answerScenario(scenario, choice) {
		setScenarioAnswers((current) => {
			const previous = current[scenario.id];
			return {
				...current,
				[scenario.id]: previous ? {
					...previous,
					finalChoiceId: choice.id,
					attempts: previous.attempts + 1
				} : {
					scenarioId: scenario.id,
					firstChoiceId: choice.id,
					finalChoiceId: choice.id,
					firstResult: choice.result,
					attempts: 1
				}
			};
		});
		choice.expenseIds?.forEach(addExpenseById);
	}
	function resetJourney() {
		setCategory("");
		setBreed("");
		setPreparationTask(0);
		setRoomReady([]);
		setHazardsReady([]);
		setMembers(initialMembers);
		setAssignments(initialAssignments);
		setTrunkSelected([]);
		setTrunkChecked(false);
		setTrunkPassed(false);
		setExpenses([]);
		setLatestExpense(null);
		setScenarioCursors(initialScenarioCursors);
		setScenarioAnswers({});
		setProfile(initialProfile);
	}
	function startFreshJourney() {
		resetJourney();
		setStep(1);
		setIntroOpen(true);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function resetAll() {
		resetJourney();
		setStep(0);
		setIntroOpen(false);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function renderPreparation() {
		if (preparationTask === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomPreparation, {
			selectedItems: roomReady,
			securedHazards: hazardsReady,
			onAddItem: addRoomItem,
			onRemoveItem: (id) => setRoomReady((current) => current.filter((item) => item !== id)),
			onToggleHazard: toggleHazard,
			onBack: () => goTo(1),
			onNext: () => setPreparationTask(1)
		});
		if (preparationTask === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareMemberSetup, {
			members,
			onChange: updateMembers,
			onBack: () => setPreparationTask(0),
			onNext: () => setPreparationTask(2)
		});
		if (preparationTask === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareTaskAssignment, {
			members,
			assignments,
			onChange: setAssignments,
			onBack: () => setPreparationTask(1),
			onNext: () => setPreparationTask(3)
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarTrunkPreparation, {
			selected: trunkSelected,
			checked: trunkChecked,
			passed: trunkPassed,
			onToggle: toggleTrunkItem,
			onCheck: (passed) => {
				setTrunkChecked(true);
				setTrunkPassed(passed);
			},
			onBack: () => setPreparationTask(2),
			onNext: () => goTo(3)
		});
	}
	function renderScenarioStage(currentStep) {
		const range = scenarioStages[currentStep];
		const cursor = scenarioCursors[currentStep] ?? range.start;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioGame, {
			start: range.start,
			end: range.end,
			index: cursor,
			answers: scenarioAnswers,
			backupNames,
			onIndex: (index) => setScenarioCursors((current) => ({
				...current,
				[currentStep]: index
			})),
			onChoose: answerScenario,
			onBackStage: () => goTo(currentStep - 1),
			onCompleteStage: () => goTo(currentStep + 1)
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "app-shell",
		children: [
			step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Welcome, { onStart: startFreshJourney }),
			step > 0 && !introOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stage-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageRail, {
					step,
					onGoTo: goTo
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "stage",
					"aria-live": "polite",
					children: [
						step >= 2 && step <= 7 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CostBar, {
							expenses,
							emergencyReserve,
							latestExpense
						}),
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeciesStep, {
							category,
							breed,
							onCategory: setCategory,
							onBreed: setBreed,
							onNext: () => goTo(2)
						}),
						step === 2 && renderPreparation(),
						step >= 3 && step <= 6 && renderScenarioStage(step),
						step === 7 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileForm, {
							profile,
							onChange: setProfile,
							onBack: () => goTo(6),
							onNext: () => goTo(8)
						}),
						step === 8 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessmentReport, {
							breed,
							profile,
							expenses,
							emergencyReserve,
							roomReady,
							hazardsReady,
							members,
							assignments,
							trunkSelected,
							trunkPassed,
							answers: scenarioAnswers,
							onBack: () => goTo(7),
							onReset: resetAll
						})
					]
				})]
			}),
			step > 0 && introOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "intro-screen",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intro-orbit",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: intros[step - 1].icon })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: intros[step - 1].eyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: intros[step - 1].title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "intro-body",
						children: intros[step - 1].body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "soft-note",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✦" }), intros[step - 1].tip]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary large",
						onClick: () => setIntroOpen(false),
						children: ["進入這一站 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
					})
				]
			})
		]
	});
}
//#endregion
export { Home as default };
