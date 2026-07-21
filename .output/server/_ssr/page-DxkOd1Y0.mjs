import { a as require_react, o as __toESM, t as require_jsx_runtime } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-DxkOd1Y0.js
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
		"飼養生活",
		"從接回家到長期陪伴"
	],
	[
		"04",
		"認識你",
		"回到真實的你"
	],
	[
		"05",
		"評估報告",
		"我的飼養準備報告"
	]
];
var intros = [
	{
		title: "先從你想一起生活的動物開始",
		body: "不同物種、不同品種，會遇到很不一樣的日常。選擇後，我們會帶你從領養前準備一路走進長期生活。",
		icon: "🐾",
		tip: "這不是承諾，隨時都能回來更換。"
	},
	{
		title: "在出發以前，把家、照顧者與行李準備好",
		body: "安全的空間、清楚的分工與合適的接送用品，能讓接回家的第一天少一點匆忙。",
		icon: "⌂",
		tip: "每項購買只會記錄一次，返回調整不會重複扣款。"
	},
	{
		title: "車門關上後，你們的共同生活正式開始",
		body: "從安全搭車、第一次進家門到第一餐，每個小決定都會影響牠對新環境的第一印象。",
		icon: "🚗",
		tip: "先穩定、再親近，給牠一點理解陌生世界的時間。"
	},
	{
		title: "把第一週的磨合，慢慢變成每天的節奏",
		body: "適應、飲食、散步、陪玩與清潔不只有突發狀況，也包含很多平凡而安心的日常。",
		icon: "☀",
		tip: "穩定的小事，往往比一次做到完美更重要。"
	},
	{
		title: "當牠看起來不太一樣，你會怎麼判斷？",
		body: "觀察、聯絡獸醫、交通與醫療預備金，會在真正需要時一起發揮作用。",
		icon: "✚",
		tip: "及早詢問不代表小題大作，而是把風險留給專業判斷。"
	},
	{
		title: "工作、旅行、搬家與老年，都會重新安排生活",
		body: "長期照顧不是永遠不變，而是在每次變動時仍能找到安全、合法且負責任的安排。",
		icon: "↻",
		tip: "前面建立的備用照顧者，會在這一段真正派上用場。"
	},
	{
		title: "把模擬生活，放回你現在的生活條件",
		body: "你已經陪牠走過一段模擬生活。現在讓我們把遊戲中的經驗放回你的真實生活中，看看哪些部分已經準備好，哪些還需要確認。",
		icon: "◎",
		tip: "沒有理想答案，真實資料才有助於產生有用的報告。"
	},
	{
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
	"monthly-main-food": {
		id: "monthly-main-food",
		name: "每月主食費",
		amount: 1500,
		category: "飲食",
		stage: "一起生活三個月",
		recurring: true
	},
	"journey-medical-care": {
		id: "journey-medical-care",
		name: "異常症狀檢查與治療",
		amount: 4200,
		category: "醫療",
		stage: "健康出現變化",
		recurring: false,
		fromEmergency: true
	},
	"journey-care-service": {
		id: "journey-care-service",
		name: "短期照顧服務",
		amount: 2400,
		category: "照顧服務",
		stage: "飼主生活發生改變",
		recurring: false
	},
	"senior-checkup": {
		id: "senior-checkup",
		name: "高齡健康檢查",
		amount: 3200,
		category: "醫療",
		stage: "逐漸進入高齡",
		recurring: false,
		fromEmergency: true
	},
	"senior-slipmat": {
		id: "senior-slipmat",
		name: "高齡犬防滑墊",
		amount: 1200,
		category: "高齡用品",
		stage: "調整高齡生活空間",
		recurring: false
	},
	"senior-access-bed": {
		id: "senior-access-bed",
		name: "低入口高齡睡墊",
		amount: 1800,
		category: "高齡用品",
		stage: "調整高齡生活空間",
		recurring: false
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
		need: "飲食"
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
		feedback: "少量熟悉食物可避免接回當天突然換食。"
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
var positive$1 = {
	feedbackTitle: "做得很好！",
	effects: {
		trust: 2,
		wellbeing: 2,
		support: 1
	}
};
var partial$1 = {
	feedbackTitle: "方向不錯，但還可以再調整。",
	effects: {
		trust: 1,
		wellbeing: 1,
		support: 1
	}
};
var incorrect$1 = {
	feedbackTitle: "這個做法可能不太適合。",
	effects: {
		trust: -1,
		wellbeing: -1,
		support: 0
	}
};
({ ...positive$1 }), { ...partial$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...partial$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...partial$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...partial$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...partial$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...partial$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...partial$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 };
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
var positive = {
	feedbackTitle: "做得很好！",
	effects: {
		trust: 2,
		wellbeing: 2,
		support: 1
	}
};
var partial = {
	feedbackTitle: "方向不錯，但還可以再完整一點。",
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
var lifeScenarios = [
	{
		id: "arrival-adjustment",
		stage: "一起生活的第一天",
		timeLabel: "一起生活的第一天",
		title: "第一天適應新家",
		description: "豆豆剛走進陌生的新家，躲在外出籠旁觀察，家人都很想立刻和牠打招呼。",
		topic: "適應新家與安全感",
		artIndex: 0,
		choices: [
			{
				id: "quiet-explore",
				text: "保持環境安靜，提供安全空間與飲水，讓豆豆依自己的速度探索。",
				result: "correct",
				...positive,
				explanation: "安靜、可退回的安全空間能降低刺激，讓豆豆逐步建立對新家的信任。",
				suggestion: "保持固定作息，等豆豆主動靠近再慢慢增加互動。"
			},
			{
				id: "sit-and-watch",
				text: "讓家人留在附近小聲聊天，不主動碰觸，觀察豆豆是否願意靠近。",
				result: "partial",
				...partial,
				explanation: "不強迫互動是合理方向，但人數與聲音仍可能讓剛到家的豆豆緊張。",
				suggestion: "先減少在場人數，保留一位安靜陪伴者即可。"
			},
			{
				id: "welcome-crowd",
				text: "大家一起圍過來抱抱牠，讓牠快點熟悉所有家人。",
				result: "incorrect",
				...incorrect,
				explanation: "同時被多人靠近和抱起，可能讓已經緊張的豆豆失去退路，增加閃躲或防衛反應。",
				suggestion: "先提供安靜安全的範圍，尊重牠主動探索和互動的速度。"
			}
		]
	},
	{
		id: "behavior-guidance",
		stage: "逐漸長大的時候",
		timeLabel: "逐漸長大的時候",
		title: "面對行為問題",
		description: "你回家後發現拖鞋被咬壞，地上也有排泄痕跡。豆豆看到你時退到桌子下面。",
		topic: "行為需求與正向引導",
		artIndex: 4,
		choices: [
			{
				id: "review-and-guide",
				text: "清理現場、收好危險物，檢查活動與排泄安排，提供合適替代用品並正向引導。",
				result: "correct",
				...positive,
				explanation: "先管理環境和需求來源，再鼓勵正確行為，能降低問題重複發生，也不會破壞信任。"
			},
			{
				id: "short-timeout",
				text: "先讓自己冷靜，再縮小活動範圍並重新安排散步和排泄時間。",
				result: "partial",
				...partial,
				explanation: "冷靜處理與調整日常是好方向，但縮小空間不能變成長時間隔離。",
				suggestion: "搭配安全替代用品，並在正確行為出現時立即鼓勵。"
			},
			{
				id: "scold-and-crate",
				text: "把豆豆帶到現場大聲責罵，再關進籠子讓牠反省。",
				result: "incorrect",
				...incorrect,
				explanation: "事後責罵很難讓豆豆理解原因，長時間把籠子當處罰也可能增加害怕與焦慮。",
				suggestion: "清除氣味、管理物品與作息，使用一致且正向的引導。"
			}
		]
	},
	{
		id: "busy-daily-care",
		stage: "穩定生活的日常",
		timeLabel: "穩定生活的日常",
		title: "忙碌時的日常照顧",
		description: "今天工作特別忙，你很疲累，但豆豆仍需要晚餐、乾淨飲水、排泄與適當活動。",
		topic: "時間安排與照顧支援",
		artIndex: 5,
		supportChoice: true,
		choices: [
			{
				id: "basic-care-first",
				text: "稍作休息後完成今晚的基本餵食、飲水、排泄與適量活動。",
				result: "correct",
				...positive,
				explanation: "先照顧自己的狀態，再維持豆豆不可中斷的基本需求，是可持續的安排。"
			},
			{
				id: "assigned-helper",
				text: "請事先安排並同意的備用照顧者，依分工協助今晚的餵食與活動。",
				result: "correct",
				...positive,
				explanation: "事先建立的支援能避免忙碌時漏掉照顧，也讓交接更清楚。"
			},
			{
				id: "indoor-only",
				text: "只安排短時間嗅聞或益智活動，其他需求明天再補。",
				result: "partial",
				...partial,
				explanation: "室內活動可以彈性調整，但不能取代當天必要的飲水、進食與排泄。",
				suggestion: "先完成基本需求，再依體力調整活動形式與時間。"
			},
			{
				id: "skip-today",
				text: "今天實在太累，飼料和散步都等明天再處理。",
				result: "incorrect",
				...incorrect,
				explanation: "忽略基本需求可能造成飢餓、脫水、憋尿與焦躁，也會打亂穩定作息。",
				suggestion: "完成最低限度照顧，或立即聯絡已安排好的支援者。"
			}
		]
	},
	{
		id: "illness-vet",
		stage: "健康出現變化",
		timeLabel: "健康出現變化",
		title: "生病與就醫",
		description: "豆豆今天食慾下降、活動變少，還出現一次嘔吐，看起來和平常不太一樣。",
		topic: "健康觀察與就醫判斷",
		artIndex: 3,
		choices: [
			{
				id: "record-and-vet",
				text: "記錄飲食、飲水、排泄與精神狀態，聯絡獸醫院並依建議就醫。",
				result: "correct",
				...positive,
				explanation: "具體紀錄能幫助獸醫判斷，異常合併嘔吐時及早諮詢也能降低延誤風險。",
				suggestion: "攜帶紀錄與既有病史，依獸醫建議安排檢查。",
				expenseIds: ["journey-medical-care"]
			},
			{
				id: "observe-briefly",
				text: "先短時間密切觀察並記錄，如果症狀持續或增加就立刻聯絡獸醫。",
				result: "partial",
				...partial,
				explanation: "觀察與紀錄是合理起點，但豆豆已有多項異常，不宜只在家等待太久。",
				suggestion: "現在就先電話詢問獸醫院，說明症狀與持續時間。"
			},
			{
				id: "human-medicine",
				text: "先給豆豆吃家裡的人用腸胃藥，看看睡一覺會不會好。",
				result: "incorrect",
				...incorrect,
				explanation: "人用藥物的成分和劑量可能對狗造成中毒或掩蓋病況，延誤正確診斷。",
				suggestion: "不要自行給藥，整理觀察紀錄並聯絡獸醫。"
			}
		]
	},
	{
		id: "owner-life-change",
		stage: "飼主生活發生改變",
		timeLabel: "飼主生活發生改變",
		title: "原本的照顧方式無法維持",
		description: "你換了工作，還需要離家幾天。原本的餵食、散步和陪伴時間必須重新安排。",
		topic: "生活變化與長期責任",
		artIndex: 7,
		supportChoice: true,
		reminder: "生活改變時，飼主仍需安排合法、安全且持續的照顧，不能任意棄置動物。",
		choices: [
			{
				id: "replan-family",
				text: "和照顧成員重新分工，請已同意的備用照顧者接手並完整交接。",
				result: "correct",
				...positive,
				explanation: "重新分工並保留交接紀錄，能讓豆豆的作息和健康照顧持續不中斷。"
			},
			{
				id: "paid-care",
				text: "評估合適的到府或住宿服務，確認環境、紀錄和緊急聯絡方式。",
				result: "correct",
				...positive,
				explanation: "經過評估的專業照顧是可行方案，清楚交接能降低陌生照顧的風險。",
				expenseIds: ["journey-care-service"]
			},
			{
				id: "food-alone",
				text: "準備很多飼料和水，讓豆豆自己在家待幾天。",
				result: "incorrect",
				...incorrect,
				explanation: "長時間無人查看會有飲水、排泄、健康與意外風險，也無法處理突發狀況。",
				suggestion: "安排可信任的照顧者或合適服務，並保留每日回報。"
			}
		]
	},
	{
		id: "growing-old",
		stage: "逐漸進入高齡",
		timeLabel: "逐漸進入高齡",
		title: "小狗逐漸老去",
		description: "一起生活多年後，豆豆走得更慢、睡眠增加，上下樓梯也比以前吃力。",
		topic: "高齡健康與日常調整",
		artIndex: 1,
		choices: [
			{
				id: "senior-check",
				text: "安排健康檢查，記錄變化，調整活動強度並重新檢查家中環境。",
				result: "correct",
				...positive,
				explanation: "高齡變化仍可能包含疼痛或疾病，醫療追蹤與環境調整能一起維持生活品質。",
				expenseIds: ["senior-checkup"]
			},
			{
				id: "gentle-routine",
				text: "保留豆豆喜歡的日常，但縮短時間、放慢速度並觀察恢復狀況。",
				result: "partial",
				...partial,
				explanation: "調整活動是好方向，但不能把所有變化都當成自然老化。",
				suggestion: "同時安排健康檢查，和獸醫討論疼痛與活動能力。"
			},
			{
				id: "just-aging",
				text: "年紀大本來就會慢，不需要檢查，維持以前的活動量就好。",
				result: "incorrect",
				...incorrect,
				explanation: "忽略疼痛、關節或其他疾病可能讓不舒服持續，原有活動強度也可能造成受傷。",
				suggestion: "安排檢查，再依豆豆當下能力調整環境和活動。"
			}
		]
	},
	{
		id: "late-life-companionship",
		stage: "生命後段的陪伴",
		timeLabel: "生命後段的陪伴",
		title: "一起討論豆豆現在需要什麼",
		description: "豆豆的健康狀況起伏變多。你準備和獸醫討論疼痛、飲食、活動能力、舒適程度與後續照護。",
		topic: "生活品質與生命後段照護",
		artIndex: 1,
		choices: [
			{
				id: "quality-dialogue",
				text: "記錄豆豆每天的舒適與活動狀況，和獸醫共同討論生活品質與照護選項。",
				result: "correct",
				...positive,
				explanation: "持續觀察並和專業人員討論，可以讓每次調整都更貼近豆豆當下的需要與舒適。"
			},
			{
				id: "family-vet-plan",
				text: "先和家人整理疑問，再請獸醫說明疼痛管理、飲食和後續照護方式。",
				result: "correct",
				...positive,
				explanation: "把家人的觀察和專業評估放在一起，有助於形成溫和、可執行的照護計畫。"
			},
			{
				id: "avoid-discussion",
				text: "不去討論，因為談到生命後段只會讓大家更難過。",
				result: "incorrect",
				...incorrect,
				explanation: "避開討論可能讓疼痛或照護需求沒有被及時看見，也讓家人在變化發生時更慌張。",
				suggestion: "可以從記錄舒適程度開始，請獸醫以能理解的方式逐步說明，不需要在遊戲中做出單一重大決定。"
			}
		]
	}
];
var journeyItems = [
	{
		id: "arrival",
		type: "scenario",
		timeLabel: "一起生活的第一天",
		title: "第一天適應新家",
		scenarioId: "arrival-adjustment"
	},
	{
		id: "body-language",
		type: "body-language",
		timeLabel: "適應新家的時候",
		title: "看懂小狗的身體語言"
	},
	{
		id: "feeding",
		type: "feeding",
		timeLabel: "一起生活三個月",
		title: "準備豆豆的晚餐"
	},
	{
		id: "behavior",
		type: "scenario",
		timeLabel: "逐漸長大的時候",
		title: "面對行為問題",
		scenarioId: "behavior-guidance"
	},
	{
		id: "busy-care",
		type: "scenario",
		timeLabel: "穩定生活的日常",
		title: "忙碌時的日常照顧",
		scenarioId: "busy-daily-care"
	},
	{
		id: "body-care",
		type: "body-care",
		timeLabel: "成年後的例行照顧",
		title: "清潔與基礎身體觀察"
	},
	{
		id: "health",
		type: "scenario",
		timeLabel: "健康出現變化",
		title: "生病與就醫",
		scenarioId: "illness-vet"
	},
	{
		id: "life-change",
		type: "scenario",
		timeLabel: "飼主生活發生改變",
		title: "飼主生活發生改變",
		scenarioId: "owner-life-change"
	},
	{
		id: "senior",
		type: "scenario",
		timeLabel: "逐漸進入高齡",
		title: "小狗逐漸老去",
		scenarioId: "growing-old"
	},
	{
		id: "senior-room",
		type: "senior-room",
		timeLabel: "調整高齡生活空間",
		title: "改造高齡犬的家"
	},
	{
		id: "late-life",
		type: "scenario",
		timeLabel: "生命後段的陪伴",
		title: "生命後段的陪伴",
		scenarioId: "late-life-companionship"
	}
];
var initialLifeActivityState = {
	bodyLanguageSignals: [],
	feedingFoodReady: false,
	feedingWaterSteps: [],
	feedingServed: false,
	bodyCareParts: [],
	seniorAdjustments: []
};
var import_jsx_runtime = require_jsx_runtime();
function ArrivalIntro({ onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap arrival-intro",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "arrival-scene",
			"aria-label": "豆豆從外出籠旁探頭，準備走進溫暖的新家",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/illustrations/prep-room.png",
					alt: "",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "arrival-door",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "arrival-carrier",
					"aria-hidden": "true",
					children: "▱"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "arrival-dog",
					"aria-hidden": "true",
					children: "🐕"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "arrival-copy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "小狗剛到家 · 不列入旅程進度"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "歡迎來到新家" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "經過領養前的準備，你終於把豆豆接回家了。今天是你們一起生活的第一天，也是這段長久陪伴的開始。" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "soft-note",
					children: "接下來，你會陪牠從適應新家、建立日常，一路走過健康、生活變化與逐漸老去。你所做的每一個決定，都會成為牠生命中的一部分。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary large",
					onClick: onStart,
					children: ["開始你們的生活旅程 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
				})
			]
		})]
	});
}
function stageForIndex(index) {
	if (index <= 2) return 3;
	if (index <= 5) return 4;
	if (index === 6) return 5;
	return 6;
}
function ScenarioFeedback({ scenario, choice, onRetry, onContinue }) {
	const labels = {
		correct: {
			icon: "✓",
			button: "繼續生活旅程"
		},
		partial: {
			icon: "△",
			button: "記住建議，繼續"
		},
		incorrect: {
			icon: "!",
			button: "看完建議，繼續"
		}
	};
	const expenseChanges = (choice.expenseIds ?? []).map((id) => expenseCatalog[id]).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `scenario-feedback ${choice.result}`,
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "feedback-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: labels[choice.result].icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: scenario.timeLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: choice.feedbackTitle })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: choice.explanation }),
			choice.suggestion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "feedback-suggestion",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "可以這樣調整" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: choice.suggestion })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "feedback-expense",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "本次費用變化" }), expenseChanges.length ? expenseChanges.map((expense) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					expense.name,
					" ＋NT$ ",
					money.format(expense.amount),
					expense.recurring ? "／月" : "",
					"（同一事件只登記一次）"
				] }, expense.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "本次選擇沒有新增費用。" })]
			}),
			scenario.reminder && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "law-reminder",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "i" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "生活裡的責任提醒" }), scenario.reminder] })]
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
						labels[choice.result].button,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })
					]
				})]
			})
		]
	});
}
function ScenarioCard({ scenario, answer, backupNames, feedbackOpen, onChoose, onRetry, onContinue }) {
	const selectedChoice = scenario.choices.find((choice) => choice.id === answer?.finalChoiceId);
	if (feedbackOpen && selectedChoice) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioFeedback, {
		scenario,
		choice: selectedChoice,
		onRetry,
		onContinue
	});
	const hasBackup = backupNames.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "scene-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scene-copy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: scenario.topic
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: scenario.title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: scenario.description }),
				scenario.supportChoice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `support-link ${hasBackup ? "ready" : "missing"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hasBackup ? "✓" : "!" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: hasBackup ? `可聯絡：${backupNames.join("、")}` : "目前缺少可用的備用照顧支援" }), hasBackup ? "選項會直接使用前面建立的成員與分工。" : "請先以自己完成基本照顧或評估專業服務，不會顯示不存在的成員。"] })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `scene-art scene-${scenario.artIndex}`,
			"aria-hidden": "true",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scene-sprite" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: scenario.timeLabel })]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "reflection",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "如果是你，會怎麼做？" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "choice-grid",
			children: scenario.choices.filter((choice) => choice.id !== "assigned-helper" || hasBackup).map((choice) => {
				const text = choice.id === "assigned-helper" ? `請${backupNames.join("或")}依照事先安排的分工，協助今晚的餵食與活動。` : choice.text;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => onChoose(choice),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: choice.result === "correct" ? "可行做法" : choice.result === "partial" ? "需要調整" : "先想一想" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text })]
				}, choice.id);
			})
		})]
	})] });
}
var bodySignals = [
	{
		id: "relaxed",
		area: "身體姿勢",
		label: "放鬆",
		icon: "🐕",
		text: "身體線條柔軟、動作自然，通常代表豆豆在當下環境較有安全感。"
	},
	{
		id: "tense",
		area: "身體姿勢",
		label: "緊張",
		icon: "⚡",
		text: "喘氣、來回走動或身體緊繃可能表示壓力，需要降低刺激並保留距離。"
	},
	{
		id: "avoid",
		area: "身體姿勢",
		label: "閃躲",
		icon: "↩",
		text: "轉頭、後退或躲開是豆豆在說自己暫時不想靠近，應尊重牠的選擇。"
	},
	{
		id: "lip-lick",
		area: "嘴巴",
		label: "舔鼻子",
		icon: "👅",
		text: "在沒有食物時頻繁舔鼻子可能是壓力訊號，要一起觀察環境與其他姿勢。"
	},
	{
		id: "lowered",
		area: "身體姿勢",
		label: "身體壓低",
		icon: "▾",
		text: "身體壓低可能表示害怕或想避免衝突，這時不要從上方強迫抱起。"
	},
	{
		id: "tucked-tail",
		area: "尾巴",
		label: "尾巴夾起",
		icon: "〰",
		text: "尾巴夾在腿間常和害怕、不安有關，應減少刺激並提供退路。"
	},
	{
		id: "stiff",
		area: "耳朵與全身",
		label: "身體僵硬",
		icon: "!",
		text: "突然僵住是需要留意的重要訊號，應停止靠近並觀察豆豆需要多少距離。"
	},
	{
		id: "growl",
		area: "嘴巴",
		label: "低吼",
		icon: "◖",
		text: "低吼是小狗表達不舒服或需要距離的方式，不應立刻以責罵回應。"
	}
];
function BodyLanguageActivity({ viewed, onView, onContinue }) {
	const [active, setActive] = (0, import_react.useState)(viewed.at(-1) ?? "");
	const signal = bodySignals.find((item) => item.id === active);
	const complete = viewed.length === bodySignals.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "life-activity",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "activity-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "看懂小狗的身體語言" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "點擊耳朵、尾巴、嘴巴與身體姿勢的訊號。沒有答對或答錯，重點是學會看見豆豆正在表達什麼。" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "signal-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "signal-dog",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🐕" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "耳朵" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "嘴巴" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "尾巴" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "身體姿勢" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "signal-grid",
					children: bodySignals.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: viewed.includes(item.id) ? "viewed" : "",
						onClick: () => {
							setActive(item.id);
							onView(item.id);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [item.area, viewed.includes(item.id) ? " · 已閱讀" : ""] })
						]
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "activity-message",
				role: "status",
				children: signal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: signal.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: signal.text })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "從任一訊號開始觀察。" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "activity-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					viewed.length,
					" / ",
					bodySignals.length,
					" 個訊號已閱讀"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary",
					disabled: !complete,
					onClick: onContinue,
					children: ["完成身體語言練習 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
				})]
			})
		]
	});
}
var feedingFoods = [
	{
		id: "main",
		label: "適合豆豆的完整主食",
		icon: "🥣",
		kind: "main"
	},
	{
		id: "treat",
		label: "寵物零食",
		icon: "🦴",
		kind: "treat"
	},
	{
		id: "leftovers",
		label: "人類剩菜",
		icon: "🍱",
		kind: "risk"
	},
	{
		id: "chocolate",
		label: "巧克力",
		icon: "🍫",
		kind: "risk"
	},
	{
		id: "seasoned-meat",
		label: "調味肉類",
		icon: "🍖",
		kind: "risk"
	},
	{
		id: "bone",
		label: "不適合的骨頭",
		icon: "🦴",
		kind: "risk"
	}
];
var waterSteps = [
	"倒掉原本不乾淨的水",
	"清潔水碗",
	"加入乾淨飲水",
	"將水碗放回固定位置"
];
function FeedingActivity({ activity, onChange, onAddExpense, onContinue }) {
	const [message, setMessage] = (0, import_react.useState)(activity.feedingServed ? "晚餐與飲水都已準備完成。" : "先選擇適合豆豆的晚餐。");
	const waterComplete = activity.feedingWaterSteps.length === waterSteps.length;
	function chooseFood(kind) {
		if (kind === "main") {
			onChange({ feedingFoodReady: true });
			setMessage("選得很好！主食應符合豆豆的年齡、體型及健康需求。");
		} else if (kind === "treat") setMessage("零食可以作為少量獎勵，但不能代替營養完整的正餐。");
		else setMessage("這項食物不適合放進豆豆的餐碗。部分人類食物可能油、鹽或調味過多，也可能含有危險成分，請換一個選擇。");
	}
	function doWaterStep(step, index) {
		if (index !== activity.feedingWaterSteps.length) {
			setMessage("請依序完成飲水準備，先處理前一個步驟。");
			return;
		}
		onChange({ feedingWaterSteps: [...activity.feedingWaterSteps, step] });
		setMessage(index === waterSteps.length - 1 ? "乾淨飲水已放回固定位置。" : `${step}完成，繼續下一步。`);
	}
	function serve() {
		if (!activity.feedingFoodReady || !waterComplete) {
			setMessage("還有一件每天都很重要的事：請確認豆豆有合適主食，以及隨時有乾淨、足量的飲水。");
			return;
		}
		onChange({ feedingServed: true });
		onAddExpense("monthly-main-food");
		setMessage("晚餐準備完成！規律的餵食、合適的食物及乾淨飲水，都是每天照顧的重要部分。");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `life-activity feeding-activity ${activity.feedingServed ? "served" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "activity-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "準備豆豆的晚餐" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "三個月後，豆豆已經逐漸熟悉新家。到了固定的晚餐時間，牠正坐在食碗旁等待你準備晚餐。" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "feeding-steps",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "選擇食物" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "food-options",
							children: feedingFoods.map((food) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: activity.feedingFoodReady && food.kind === "main" ? "selected" : "",
								onClick: () => chooseFood(food.kind),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: food.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: food.label })]
							}, food.id))
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "準備乾淨飲水" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "water-sequence",
							children: waterSteps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: activity.feedingWaterSteps.includes(step) ? "done" : "",
								disabled: index > activity.feedingWaterSteps.length,
								onClick: () => doWaterStep(step, index),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: activity.feedingWaterSteps.includes(step) ? "✓" : index + 1 }), step]
							}, step))
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "serve-dinner",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "把晚餐交給豆豆" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "dinner-scene",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "🐕" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: activity.feedingFoodReady ? "🥣" : "○" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: waterComplete ? "💧" : "○" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary",
								onClick: serve,
								children: activity.feedingServed ? "再看看豆豆吃晚餐" : "請豆豆吃晚餐"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "activity-message",
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: message }), activity.feedingServed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "每月主食費＋NT$1,500（只登記一次）" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "activity-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: activity.feedingServed ? "晚餐與飲水已完成" : "完成三個步驟後繼續" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary",
					disabled: !activity.feedingServed,
					onClick: onContinue,
					children: ["完成晚餐練習 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
				})]
			})
		]
	});
}
var careParts = [
	{
		id: "eyes",
		label: "眼睛",
		icon: "◉",
		text: "留意分泌物、紅腫或畏光，異常持續時應尋求專業協助。"
	},
	{
		id: "ears",
		label: "耳朵",
		icon: "◖",
		text: "觀察異味、紅腫與疼痛，不要把棉花棒深入耳道。"
	},
	{
		id: "teeth",
		label: "牙齒",
		icon: "▤",
		text: "使用寵物適用工具規律清潔牙齒，發現口臭或疼痛時諮詢獸醫。"
	},
	{
		id: "coat",
		label: "皮膚和毛髮",
		icon: "✦",
		text: "梳毛時一起觀察皮膚、腫塊、寄生蟲或持續搔癢。"
	},
	{
		id: "paws",
		label: "腳掌",
		icon: "🐾",
		text: "檢查腳墊、趾縫和異物，不隨意使用刺激性人用清潔用品。"
	},
	{
		id: "nails",
		label: "指甲",
		icon: "⌁",
		text: "留意長度與行走聲，沒有把握時請專業人員示範安全修剪。"
	}
];
function BodyCareActivity({ viewed, onView, onContinue }) {
	const [active, setActive] = (0, import_react.useState)(viewed.at(-1) ?? "");
	const part = careParts.find((item) => item.id === active);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "life-activity body-care-activity",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "activity-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "清潔與基礎身體觀察" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "依序查看豆豆的眼睛、耳朵、牙齒、皮膚毛髮、腳掌與指甲，將清潔變成每天都能做的健康觀察。" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "body-care-board",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "care-dog",
					"aria-hidden": "true",
					children: "🐕"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "care-parts",
					children: careParts.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: viewed.includes(item.id) ? "viewed" : "",
						onClick: () => {
							setActive(item.id);
							onView(item.id);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: viewed.includes(item.id) ? "✓ 已查看" : "點擊查看" })
						]
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "activity-message",
				role: "status",
				children: part ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: part.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: part.text })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "從任一部位開始查看。" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "activity-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					viewed.length,
					" / ",
					careParts.length,
					" 個部位已查看"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary",
					disabled: viewed.length !== careParts.length,
					onClick: onContinue,
					children: ["完成身體觀察 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
				})]
			})
		]
	});
}
var seniorAdjustments = [
	{
		id: "slipmat",
		label: "鋪設防滑墊",
		icon: "▦",
		expenseId: "senior-slipmat"
	},
	{
		id: "easy-bed",
		label: "容易進出的睡墊",
		icon: "🛏️",
		expenseId: "senior-access-bed"
	},
	{
		id: "stairs",
		label: "減少上下樓梯",
		icon: "▥"
	},
	{
		id: "bowls",
		label: "調整食碗及水碗位置",
		icon: "🥣"
	},
	{
		id: "warm-rest",
		label: "安靜溫暖的休息空間",
		icon: "☀"
	},
	{
		id: "gentle-activity",
		label: "依身體狀況調整活動",
		icon: "🐾"
	}
];
function SeniorRoomActivity({ roomReady, selected, onSelect, onAddExpense, onContinue }) {
	const complete = selected.length === seniorAdjustments.length;
	function choose(id, expenseId) {
		onSelect(id);
		if (!selected.includes(id) && expenseId) onAddExpense(expenseId);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "life-activity senior-room-activity",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "activity-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "改造高齡犬的家" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "豆豆已經走得比較慢。保留領養前準備好的房間，再加入讓高齡生活更安全、舒服的調整。" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "senior-room-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "room senior-room-preview",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "原本已放置的物品" }),
						roomReady.map((id, index) => {
							const item = roomItems.find((entry) => entry.id === id);
							return item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `senior-original item-${index % 6}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: item.icon }), item.label]
							}, id) : null;
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							"aria-hidden": "true",
							children: "🐕"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "senior-adjustments",
					children: seniorAdjustments.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: selected.includes(item.id) ? "selected" : "",
						"aria-pressed": selected.includes(item.id),
						onClick: () => choose(item.id, item.expenseId),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: selected.includes(item.id) ? "✓ 已完成" : item.expenseId ? `加入用品 · NT$ ${money.format(expenseCatalog[item.expenseId].amount)}` : "點擊完成調整" })
						]
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "activity-message",
				role: "status",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: complete ? "高齡生活空間調整完成。安全與舒適會隨豆豆的身體狀況持續變化。" : `已完成 ${selected.length} / ${seniorAdjustments.length} 項調整。` })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "activity-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					selected.length,
					" / ",
					seniorAdjustments.length,
					" 項已完成"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary",
					disabled: !complete,
					onClick: onContinue,
					children: ["完成高齡空間調整 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
				})]
			})
		]
	});
}
function LifeJourney({ index, answers, activity, completedIds, expenses, backupNames, roomReady, onIndex, onChoose, onActivityChange, onCompleteItem, onAddExpense, onStageChange, onBack, onComplete }) {
	const item = journeyItems[index];
	const scenario = item.scenarioId ? lifeScenarios.find((entry) => entry.id === item.scenarioId) : void 0;
	const answer = scenario ? answers[scenario.id] : void 0;
	const [feedbackOpen, setFeedbackOpen] = (0, import_react.useState)(Boolean(answer));
	(0, import_react.useEffect)(() => {
		setFeedbackOpen(Boolean(item.scenarioId && answers[item.scenarioId]));
	}, [answers, item.scenarioId]);
	const completedCount = completedIds.length;
	function selectItem(next) {
		onIndex(next);
		onStageChange(stageForIndex(next));
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function continueJourney() {
		onCompleteItem(item.id);
		if (index === journeyItems.length - 1) {
			onComplete();
			return;
		}
		selectItem(index + 1);
	}
	function choose(choice) {
		if (!scenario) return;
		onChoose(scenario, choice);
		setFeedbackOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap life-journey-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "life-journey-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
					"你們一起走到了「",
					item.timeLabel,
					"」"
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
					index + 1,
					" / ",
					journeyItems.length
				] })]
			}),
			scenario && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioCard, {
				scenario,
				answer,
				backupNames,
				feedbackOpen,
				onChoose: choose,
				onRetry: () => setFeedbackOpen(false),
				onContinue: continueJourney
			}),
			item.type === "body-language" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BodyLanguageActivity, {
				viewed: activity.bodyLanguageSignals,
				onView: (id) => onActivityChange({ bodyLanguageSignals: activity.bodyLanguageSignals.includes(id) ? activity.bodyLanguageSignals : [...activity.bodyLanguageSignals, id] }),
				onContinue: continueJourney
			}),
			item.type === "feeding" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedingActivity, {
				activity,
				onChange: onActivityChange,
				onAddExpense,
				onContinue: continueJourney
			}),
			item.type === "body-care" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BodyCareActivity, {
				viewed: activity.bodyCareParts,
				onView: (id) => onActivityChange({ bodyCareParts: activity.bodyCareParts.includes(id) ? activity.bodyCareParts : [...activity.bodyCareParts, id] }),
				onContinue: continueJourney
			}),
			item.type === "senior-room" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeniorRoomActivity, {
				roomReady,
				selected: activity.seniorAdjustments,
				onSelect: (id) => onActivityChange({ seniorAdjustments: activity.seniorAdjustments.includes(id) ? activity.seniorAdjustments : [...activity.seniorAdjustments, id] }),
				onAddExpense,
				onContinue: continueJourney
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scenario-bottom-nav life-bottom-nav",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary",
					onClick: () => index > 0 ? selectItem(index - 1) : onBack(),
					children: ["← ", index > 0 ? "上一個生活內容" : "返回領養前準備"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					completedCount,
					" / ",
					journeyItems.length,
					" 個生活內容已完成"
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "visually-hidden",
				children: [
					"目前共登記 ",
					expenses.length,
					" 筆費用，所有費用以唯一識別碼避免重複。"
				]
			})
		]
	});
}
function StepHeading({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "step-heading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: body })]
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
var lifeStageRanges = [
	{
		label: "接回家",
		start: 0,
		end: 1
	},
	{
		label: "日常生活",
		start: 2,
		end: 5
	},
	{
		label: "健康與意外",
		start: 6,
		end: 6
	},
	{
		label: "生活變化",
		start: 7,
		end: 10
	}
];
function statusAt(index, current, reached) {
	if (index === current) return "current";
	if (index <= reached) return "completed";
	return "locked";
}
function StageRail({ step, furthestStep, selectionPage, selectionReached, preparationTask, preparationReached, lifePhase, journeyIndex, journeyCompleted, profilePage, profileReached, onGoTo, onSelectionPage, onPreparationTask, onLifeStage, onProfilePage }) {
	const currentMain = step === 1 ? 0 : step === 2 ? 1 : step <= 6 ? 2 : step === 7 ? 3 : 4;
	const currentLifeStage = lifePhase === "arrival-intro" ? 0 : lifeStageRanges.findIndex((range) => journeyIndex >= range.start && journeyIndex <= range.end);
	const mainTargets = [
		1,
		2,
		Math.max(3, Math.min(6, step)),
		7,
		8
	];
	const mainUnlockSteps = [
		1,
		2,
		3,
		7,
		8
	];
	const profileTitles = [
		"時間與身分",
		"居住與同住者",
		"經驗與動機",
		"預算與支援"
	];
	const mainStatus = (index) => {
		if (index === currentMain) return "current";
		if (mainUnlockSteps[index] <= furthestStep) return "completed";
		return "locked";
	};
	const navigation = [
		{
			id: "pet-selection",
			number: "01",
			label: "選擇寵物",
			status: mainStatus(0),
			onClick: () => onGoTo(1),
			children: ["選擇物種", "選擇品種"].map((label, index) => ({
				id: index === 0 ? "species" : "breed",
				label,
				status: statusAt(index, selectionPage === "species" ? 0 : 1, selectionReached),
				onClick: () => onSelectionPage(index === 0 ? "species" : "breed")
			}))
		},
		{
			id: "preparation",
			number: "02",
			label: "領養前準備",
			status: mainStatus(1),
			onClick: () => onGoTo(2),
			children: [
				"布置生活空間",
				"建立照顧成員",
				"分配照顧工作",
				"整理汽車後車廂"
			].map((label, index) => ({
				id: `preparation-${index}`,
				label,
				status: statusAt(index, preparationTask, preparationReached),
				onClick: () => onPreparationTask(index)
			}))
		},
		{
			id: "life-journey",
			number: "03",
			label: "飼養生活",
			status: mainStatus(2),
			onClick: () => onGoTo(mainTargets[2]),
			children: lifeStageRanges.map((range, index) => {
				const completed = lifePhase === "complete" || journeyItems.slice(range.start, range.end + 1).every((item) => journeyCompleted.includes(item.id));
				const status = index === currentLifeStage ? "current" : completed ? "completed" : "locked";
				return {
					id: `life-${index}`,
					label: range.label,
					status,
					onClick: () => onLifeStage(index)
				};
			})
		},
		{
			id: "profile",
			number: "04",
			label: "認識你",
			status: mainStatus(3),
			onClick: () => onGoTo(7),
			children: profileTitles.map((label, index) => ({
				id: `profile-${index}`,
				label,
				status: statusAt(index, profilePage, profileReached),
				onClick: () => onProfilePage(index)
			}))
		},
		{
			id: "report",
			number: "05",
			label: "評估報告",
			status: mainStatus(4),
			onClick: () => onGoTo(8)
		}
	];
	function renderNavigation() {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "station-navigation",
			children: navigation.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `nav-main ${item.status}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "nav-main-button",
					onClick: item.onClick,
					disabled: item.status === "locked",
					"aria-current": item.status === "current" ? "step" : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.status === "completed" ? "✓" : item.number }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: item.label })]
				}), index === currentMain && item.children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nav-children",
					children: item.children.map((child, childIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `nav-child ${child.status}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: child.onClick,
							disabled: child.status === "locked",
							"aria-current": child.status === "current" ? "step" : void 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: child.status === "completed" ? "✓" : childIndex + 1 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: child.label })]
						})
					}, child.id))
				})]
			}, item.id))
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		className: "station-rail",
		"aria-label": "體驗進度",
		children: renderNavigation()
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "mobile-progress-nav",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "目前進度" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
			navigation[currentMain].number,
			" ",
			navigation[currentMain].label
		] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-label": "體驗進度",
			children: renderNavigation()
		})]
	})] });
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
function SpeciesStep({ selectionPage, onSelectionPage, category, breed, onCategory, onBreed, onNext }) {
	const selectedBreed = breeds.find((item) => item.id === breed);
	function chooseCategory(id) {
		onCategory(id);
		onBreed("");
		onSelectionPage("breed");
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "content-wrap partner-picker",
		children: selectionPage === "species" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "partner-selection-page",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
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
					onBack: () => onSelectionPage("species"),
					onNext,
					disabled: !breed,
					nextLabel: "開始領養前準備"
				})
			]
		}, "breed")
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
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
function ProfileForm({ page, onPage, profile, onChange, onBack, onNext }) {
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
			onPage(page + 1);
			setErrors({});
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		} else onNext();
	}
	function backPage() {
		setErrors({});
		if (page > 0) onPage(page - 1);
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-wizard-head",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: titles[page] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "沒有理想答案，請依照現在的生活狀況填寫。" })] })
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
function AssessmentReport({ breed, profile, expenses, emergencyReserve, roomReady, hazardsReady, members, assignments, trunkSelected, trunkPassed, answers, lifeActivity, onBack, onReset }) {
	const recurring = expenses.filter((item) => item.recurring).reduce((sum, item) => sum + item.amount, 0);
	const oneTime = expenses.filter((item) => !item.recurring && item.category === "用品").reduce((sum, item) => sum + item.amount, 0);
	const medical = expenses.filter((item) => item.category === "醫療" && !item.recurring).reduce((sum, item) => sum + item.amount, 0);
	const careService = expenses.filter((item) => item.category === "照顧服務").reduce((sum, item) => sum + item.amount, 0);
	const seniorSupplies = expenses.filter((item) => item.category === "高齡用品").reduce((sum, item) => sum + item.amount, 0);
	const total = expenses.reduce((sum, item) => sum + item.amount, 0);
	const emergencyUsed = expenses.filter((item) => item.fromEmergency).reduce((sum, item) => sum + item.amount, 0);
	const correctFirst = Object.values(answers).filter((item) => item.firstResult === "correct").length;
	const corrected = Object.values(answers).filter((item) => item.firstResult !== "correct" && item.finalResult === "correct");
	const correctTopics = Object.values(answers).filter((item) => item.firstResult === "correct").map((item) => lifeScenarios.find((scenario) => scenario.id === item.scenarioId)?.topic).filter(Boolean);
	const correctedTopics = corrected.map((item) => lifeScenarios.find((scenario) => scenario.id === item.scenarioId)?.topic).filter(Boolean);
	const needsLearning = Object.values(answers).filter((item) => item.firstResult === "incorrect" && item.finalResult !== "correct").map((item) => lifeScenarios.find((scenario) => scenario.id === item.scenarioId)?.topic).filter(Boolean);
	const practiceItems = [
		{
			label: "已認識小狗的身體語言",
			complete: lifeActivity.bodyLanguageSignals.length === 8
		},
		{
			label: "已完成準備晚餐",
			complete: lifeActivity.feedingServed
		},
		{
			label: "已完成乾淨飲水準備",
			complete: lifeActivity.feedingWaterSteps.length === 4
		},
		{
			label: "已完成基本清潔及身體觀察",
			complete: lifeActivity.bodyCareParts.length === 6
		},
		{
			label: "已完成高齡生活空間調整",
			complete: lifeActivity.seniorAdjustments.length === 6
		}
	];
	const practiceComplete = practiceItems.filter((item) => item.complete).length;
	const backupIds = new Set([...Object.values(assignments).map((item) => item.backup), assignments.emergency?.primary].filter((id) => Boolean(id) && id !== "player"));
	const backupNames = members.filter((member) => backupIds.has(member.id)).map((member) => member.name);
	const requiredRoom = roomItems.filter((item) => item.required);
	const roomCompletion = Math.round(roomReady.filter((id) => requiredRoom.some((item) => item.id === id)).length / requiredRoom.length * 100);
	const assignmentCompletion = Math.round(careTasks.filter((task) => assignments[task.id]?.primary).length / careTasks.length * 100);
	const budgetEnough = Number(profile.monthlyBudget) >= recurring;
	const strongSignals = [
		roomCompletion === 100 && hazardsReady.length === 5 && assignmentCompletion === 100 && trunkPassed,
		correctFirst >= 5,
		practiceComplete === 5,
		budgetEnough,
		profile.emergencyFund === true,
		profile.backupSupport === true,
		profile.housing !== "租屋" || profile.landlordConsent === "房東已同意",
		profile.hasHousemates !== true || profile.housematesConsent === true
	].filter(Boolean).length;
	const level = strongSignals >= 7 ? "已具備多項準備" : strongSignals >= 4 ? "有部分條件需要先確認" : "建議先完成準備事項";
	const prepared = [
		roomCompletion === 100 && "必要用品與生活空間已完成",
		hazardsReady.length === 5 && "居家危險物已完成收納與防護",
		assignmentCompletion === 100 && "日常照顧工作已有主要負責人",
		backupNames.length > 0 && `已有備用照顧者：${backupNames.join("、")}`,
		trunkPassed && "接送行李、文件與安全運輸已通過檢查",
		correctFirst >= 5 && `${correctFirst} 個情境第一次就掌握照顧方向`,
		practiceComplete === 5 && "四個生活練習與飲水步驟皆已完成",
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: level }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "這份報告不貼標籤，而是把模擬生活轉成下一步可執行的準備。" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "summary-pet",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedBreed?.icon ?? "🐕" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["我想領養", selectedBreed?.label] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							correctFirst,
							" / ",
							lifeScenarios.length,
							" 題第一次掌握方向"
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "情境判斷" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "第一次選擇與修正" })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "learning-counts",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: correctFirst }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "第一次掌握方向" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: corrected.length }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "提醒後修正" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: needsLearning.length }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "需要再了解" })] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "report-topic-list",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "第一次就掌握" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: correctTopics.join("、") || "尚無" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "經過提醒後修正" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: correctedTopics.join("、") || "尚無" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "還需要了解" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: needsLearning.join("、") || "目前沒有未修正主題" })] })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "03" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "照顧實作" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "生活練習完成狀態" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: practiceItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: item.complete ? "green" : "yellow",
							children: item.complete ? "✓" : "!"
						}), item.label] }, item.label)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "04" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "費用狀況" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "實際事件累積" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "report-metrics",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "一次性用品費" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(oneTime)] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "本月／累積支出" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(total)] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "每月固定支出" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(recurring)] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "醫療支出" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(medical)] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "照顧服務費" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(careService)] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "高齡用品費" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(seniorSupplies)] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "剩餘緊急預備金" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(Math.max(0, emergencyReserve - emergencyUsed))] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "推估一年基本支出" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(recurring * 12)] })] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card profile-summary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "05" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "真實生活條件" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "時間、住居與支援" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "可投入時間" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
								"每日 ",
								profile.careHours,
								" 小時"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "居住空間" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [profile.housing, profile.housing === "租屋" ? ` · ${profile.landlordConsent}` : ""] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "每月預算" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(Number(profile.monthlyBudget))] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "同住者支持" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: profile.hasHousemates ? profile.housematesConsent ? "已同意" : "尚待確認" : "無同住者" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "備用照顧者" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: backupNames.join("、") || "尚未安排" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "緊急預備金" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: profile.emergencyFund ? "已有準備" : "目前沒有" })] })
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card readiness",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "06" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "已經準備好" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "可以延續的部分" })] })]
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "07" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "建議再確認" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "需要補上的條件" })] })]
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "08" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "和家人討論" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "需要共同決定" })] })]
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "09" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "領養前行動清單" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "下一步可以這樣做" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: actions.slice(0, 7).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item)) })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "summary-footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "這份報告不替你貼上單一結論。" }),
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
var emergencyReserve = 2e4;
function Home() {
	const [step, setStep] = (0, import_react.useState)(0);
	const [furthestStep, setFurthestStep] = (0, import_react.useState)(1);
	const [introOpen, setIntroOpen] = (0, import_react.useState)(false);
	const [category, setCategory] = (0, import_react.useState)("");
	const [breed, setBreed] = (0, import_react.useState)("");
	const [selectionPage, setSelectionPage] = (0, import_react.useState)("species");
	const [selectionReached, setSelectionReached] = (0, import_react.useState)(0);
	const [preparationTask, setPreparationTask] = (0, import_react.useState)(0);
	const [preparationReached, setPreparationReached] = (0, import_react.useState)(0);
	const [roomReady, setRoomReady] = (0, import_react.useState)([]);
	const [hazardsReady, setHazardsReady] = (0, import_react.useState)([]);
	const [members, setMembers] = (0, import_react.useState)(initialMembers);
	const [assignments, setAssignments] = (0, import_react.useState)(initialAssignments);
	const [trunkSelected, setTrunkSelected] = (0, import_react.useState)([]);
	const [trunkChecked, setTrunkChecked] = (0, import_react.useState)(false);
	const [trunkPassed, setTrunkPassed] = (0, import_react.useState)(false);
	const [expenses, setExpenses] = (0, import_react.useState)([]);
	const [latestExpense, setLatestExpense] = (0, import_react.useState)(null);
	const [lifePhase, setLifePhase] = (0, import_react.useState)("arrival-intro");
	const [journeyIndex, setJourneyIndex] = (0, import_react.useState)(0);
	const [journeyCompleted, setJourneyCompleted] = (0, import_react.useState)([]);
	const [lifeActivity, setLifeActivity] = (0, import_react.useState)(initialLifeActivityState);
	const [scenarioAnswers, setScenarioAnswers] = (0, import_react.useState)({});
	const [profile, setProfile] = (0, import_react.useState)(initialProfile);
	const [profilePage, setProfilePage] = (0, import_react.useState)(0);
	const [profileReached, setProfileReached] = (0, import_react.useState)(0);
	const backupNames = (0, import_react.useMemo)(() => {
		const backupIds = new Set([...Object.values(assignments).map((assignment) => assignment.backup), assignments.emergency?.primary].filter((id) => Boolean(id) && id !== "player"));
		return members.filter((member) => backupIds.has(member.id)).map((member) => member.name);
	}, [assignments, members]);
	function goTo(next) {
		setStep(next);
		setFurthestStep((current) => Math.max(current, next));
		setIntroOpen(next > 0 && !(next >= 3 && next <= 6));
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function goToStation(next) {
		setStep(next);
		setIntroOpen(false);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function goToLifeStage(stageIndex) {
		const firstJourneyItem = [
			0,
			2,
			6,
			7
		];
		const underlyingStep = [
			3,
			4,
			5,
			6
		];
		if (lifePhase === "arrival-intro" && stageIndex === 0) {
			setStep(3);
			setIntroOpen(false);
		} else {
			setJourneyIndex(firstJourneyItem[stageIndex]);
			setStep(underlyingStep[stageIndex]);
			setIntroOpen(false);
		}
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function changeSelectionPage(page) {
		setSelectionPage(page);
		setSelectionReached((current) => Math.max(current, page === "breed" ? 1 : 0));
	}
	function changePreparationTask(task) {
		setPreparationTask(task);
		setPreparationReached((current) => Math.max(current, task));
	}
	function changeProfilePage(page) {
		setProfilePage(page);
		setProfileReached((current) => Math.max(current, page));
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
		const expenseId = roomItems.find((item) => item.id === id)?.expenseId;
		if (expenseId) addExpenseById(expenseId);
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
					finalResult: choice.result,
					attempts: previous.attempts + 1
				} : {
					scenarioId: scenario.id,
					firstChoiceId: choice.id,
					finalChoiceId: choice.id,
					firstResult: choice.result,
					finalResult: choice.result,
					attempts: 1
				}
			};
		});
		choice.expenseIds?.forEach(addExpenseById);
	}
	function resetJourney() {
		setCategory("");
		setBreed("");
		setSelectionPage("species");
		setSelectionReached(0);
		setPreparationTask(0);
		setPreparationReached(0);
		setRoomReady([]);
		setHazardsReady([]);
		setMembers(initialMembers);
		setAssignments(initialAssignments);
		setTrunkSelected([]);
		setTrunkChecked(false);
		setTrunkPassed(false);
		setExpenses([]);
		setLatestExpense(null);
		setLifePhase("arrival-intro");
		setJourneyIndex(0);
		setJourneyCompleted([]);
		setLifeActivity(initialLifeActivityState);
		setScenarioAnswers({});
		setProfile(initialProfile);
		setProfilePage(0);
		setProfileReached(0);
	}
	function startFreshJourney() {
		resetJourney();
		setStep(1);
		setFurthestStep(1);
		setIntroOpen(true);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function resetAll() {
		resetJourney();
		setStep(0);
		setFurthestStep(1);
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
			onNext: () => changePreparationTask(1)
		});
		if (preparationTask === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareMemberSetup, {
			members,
			onChange: updateMembers,
			onBack: () => changePreparationTask(0),
			onNext: () => changePreparationTask(2)
		});
		if (preparationTask === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareTaskAssignment, {
			members,
			assignments,
			onChange: setAssignments,
			onBack: () => changePreparationTask(1),
			onNext: () => changePreparationTask(3)
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
			onBack: () => changePreparationTask(2),
			onNext: () => {
				setStep(3);
				setFurthestStep((current) => Math.max(current, 3));
				setIntroOpen(false);
				setLifePhase("arrival-intro");
				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});
			}
		});
	}
	function renderLifeJourney() {
		if (lifePhase === "arrival-intro") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrivalIntro, { onStart: () => setLifePhase("journey") });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeJourney, {
			index: journeyIndex,
			answers: scenarioAnswers,
			activity: lifeActivity,
			completedIds: journeyCompleted,
			expenses,
			backupNames,
			roomReady,
			onIndex: setJourneyIndex,
			onChoose: answerScenario,
			onActivityChange: (patch) => setLifeActivity((current) => ({
				...current,
				...patch
			})),
			onCompleteItem: (id) => setJourneyCompleted((current) => current.includes(id) ? current : [...current, id]),
			onAddExpense: addExpenseById,
			onStageChange: (nextStep) => {
				setStep(nextStep);
				setFurthestStep((current) => Math.max(current, nextStep));
				setIntroOpen(false);
			},
			onBack: () => {
				setStep(2);
				setIntroOpen(false);
				setPreparationTask(3);
			},
			onComplete: () => {
				setLifePhase("complete");
				goTo(7);
			}
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
					furthestStep,
					selectionPage,
					selectionReached,
					preparationTask,
					preparationReached,
					lifePhase,
					journeyIndex,
					journeyCompleted,
					profilePage,
					profileReached,
					onGoTo: goToStation,
					onSelectionPage: (page) => {
						changeSelectionPage(page);
						goToStation(1);
					},
					onPreparationTask: (task) => {
						changePreparationTask(task);
						goToStation(2);
					},
					onLifeStage: goToLifeStage,
					onProfilePage: (page) => {
						changeProfilePage(page);
						goToStation(7);
					}
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
							selectionPage,
							onSelectionPage: changeSelectionPage,
							category,
							breed,
							onCategory: setCategory,
							onBreed: setBreed,
							onNext: () => goTo(2)
						}),
						step === 2 && renderPreparation(),
						step >= 3 && step <= 6 && renderLifeJourney(),
						step === 7 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileForm, {
							page: profilePage,
							onPage: changeProfilePage,
							profile,
							onChange: setProfile,
							onBack: () => {
								setStep(6);
								setIntroOpen(false);
							},
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
							lifeActivity,
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
