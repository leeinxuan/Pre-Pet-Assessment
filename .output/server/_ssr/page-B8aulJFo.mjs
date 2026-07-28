import { a as require_react, o as __toESM, t as require_jsx_runtime } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-B8aulJFo.js
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
	"starter-food": {
		id: "starter-food",
		name: "初期飼料",
		amount: 800,
		category: "飲食",
		stage: "領養前準備",
		recurring: false
	},
	"monthly-food-main": {
		id: "monthly-food-main",
		name: "每月主食費",
		amount: 1e3,
		category: "飲食",
		stage: "第一天適應新家",
		recurring: true
	},
	"sick-vet-care": {
		id: "sick-vet-care",
		name: "生病就醫與檢查",
		amount: 4200,
		category: "醫療",
		stage: "生病與就醫",
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
		id: "bed",
		label: "睡墊",
		icon: "🛏️",
		image: "/room/睡墊.png",
		placement: {
			x: 67,
			y: 83,
			width: 32,
			layer: 2
		},
		required: true,
		need: "休息",
		expenseId: "bed",
		purpose: "提供固定且舒適的休息空間，讓小狗能安心休息。"
	},
	{
		id: "toy",
		label: "玩具",
		icon: "🦴",
		image: "/room/玩具.png",
		placement: {
			x: 73,
			y: 80,
			width: 10,
			layer: 4
		},
		required: true,
		need: "活動",
		purpose: "合適的玩具可以提供活動與探索，也能減少因無聊產生的破壞行為。"
	},
	{
		id: "water-bowl",
		label: "水碗",
		icon: "💧",
		image: "/room/水.png",
		placement: {
			x: 35,
			y: 90,
			width: 12,
			layer: 3
		},
		required: true,
		need: "飲食",
		expenseId: "water-bowl",
		purpose: "每天確認水碗乾淨，並提供足量的新鮮飲水。"
	},
	{
		id: "food-bowl",
		label: "狗碗",
		icon: "🥣",
		image: "/room/狗碗.png",
		placement: {
			x: 45,
			y: 90,
			width: 12,
			layer: 3
		},
		required: true,
		need: "飲食",
		expenseId: "food-bowl",
		purpose: "固定的飲食器具能幫助建立規律的餵食習慣。"
	},
	{
		id: "toilet",
		label: "尿墊",
		icon: "▧",
		image: "/room/尿墊.png",
		placement: {
			x: 15,
			y: 85,
			width: 20,
			layer: 1
		},
		required: true,
		need: "排泄",
		expenseId: "toilet",
		purpose: "排泄用品應與食物及休息位置分開，方便小狗建立習慣。"
	},
	{
		id: "cleaner",
		label: "清潔用品",
		icon: "🧼",
		image: "/room/清潔用品.png",
		placement: {
			x: 39,
			y: 47,
			width: 8,
			layer: 3
		},
		required: true,
		need: "清潔",
		expenseId: "cleaner",
		purpose: "準備安全的清潔用品，並收在小狗無法自行取得的位置。"
	},
	{
		id: "food",
		label: "飼料",
		icon: "🦴",
		image: "/room/飼料.png",
		placement: {
			x: 53,
			y: 87,
			width: 15,
			layer: 3
		},
		required: true,
		need: "飲食",
		expenseId: "starter-food",
		purpose: "選擇符合小狗年齡、體型及健康需求的主食，並妥善保存。"
	}
];
var hazards = [
	{
		id: "small-parts",
		label: "小物品",
		icon: "●",
		image: "/room/小物品.png",
		placement: {
			x: 26,
			y: 85,
			width: 12,
			layer: 5
		},
		danger: "容易被誤吞，可能造成噎住或腸胃阻塞。",
		handling: "收進小狗無法取得的抽屜或收納盒。"
	},
	{
		id: "chocolate",
		label: "巧克力",
		icon: "🍫",
		image: "/room/巧克力.png",
		placement: {
			x: 89,
			y: 78,
			width: 10,
			layer: 5
		},
		danger: "含有不適合狗狗的成分，可能危害健康。",
		handling: "放進有門的高處櫃子。"
	},
	{
		id: "chemicals",
		label: "清潔劑",
		icon: "🧴",
		image: "/room/清潔劑.png",
		placement: {
			x: 62,
			y: 64,
			width: 10,
			layer: 5
		},
		danger: "可能造成誤食或皮膚接觸風險。",
		handling: "收進上鎖或小狗無法開啟的櫃子。"
	},
	{
		id: "cables",
		label: "電線",
		icon: "🔌",
		image: "/room/電線.png",
		placement: {
			x: 12,
			y: 78,
			width: 24,
			layer: 5
		},
		danger: "可能被啃咬，造成受傷或觸電。",
		handling: "整理固定或加裝電線保護套。"
	}
];
var initialMembers = [{
	id: "player",
	name: "",
	age: null,
	isPlayer: true
}];
var trunkItems = [
	{
		id: "id",
		label: "身分證",
		kind: "document",
		image: "/car/身分證件.png",
		preparedLabel: "已攜帶",
		description: "領養單位可能需要確認領養人的身分與聯絡資料，出發前請依通知準備有效身分證明。",
		reason: "方便領養單位依其評估與交接流程核對申請人資料。",
		caution: "實際需要攜帶的文件，請依領養單位通知及評估流程確認。",
		sourceLabel: "領養單位提供的領養評估單與接回注意事項",
		feedback: "身分證已放入文件夾。",
		placement: {
			x: 20,
			y: 36,
			width: 15,
			layer: 4
		}
	},
	{
		id: "documents",
		label: "領養文件",
		kind: "document",
		image: "/car/文件.png",
		preparedLabel: "已攜帶",
		description: "領養申請、評估或契約文件可能包含飼養條件、照顧責任及後續聯絡資料，出發前應先確認是否需要攜帶或簽署。",
		reason: "把交接資料集中整理，能在辦理流程時快速確認與簽署。",
		caution: "不同領養單位的流程與文件不完全相同，請以該單位通知為準。",
		sourceLabel: "領養單位提供的領養評估單與接回注意事項",
		feedback: "領養文件已放入文件夾。",
		placement: {
			x: 22,
			y: 32,
			width: 24,
			layer: 3
		}
	},
	{
		id: "carrier-kit",
		label: "運輸籠＋尿墊",
		kind: "supply",
		image: "/car/外出籠.png",
		preparedLabel: "已準備",
		description: "運輸籠可降低行車途中小狗在車內移動或逃脫的風險；底部鋪設尿墊，可處理緊張或長途移動時可能發生的排泄與髒污。",
		reason: "提供平穩、可固定且不干擾駕駛的安全運輸空間。",
		caution: "運輸籠尺寸需合適並保持穩定；尿墊應鋪在籠內底部，而不是鋪滿後車廂。",
		sourceLabel: "動物醫療機構與領養單位提供的安全運輸建議",
		feedback: "尿墊已鋪入運輸籠，安全運輸設備準備完成。",
		expenseIds: ["carrier", "toilet"],
		placement: {
			x: 51,
			y: 60,
			width: 34,
			layer: 5
		}
	},
	{
		id: "water-kit",
		label: "水碗",
		kind: "supply",
		image: "/car/水.png",
		preparedLabel: "已準備",
		description: "途中應準備飲水及可使用的水碗，視小狗狀況與路程適時補充。行車中不要放置裝滿水且容易打翻的開放水碗。",
		reason: "途中可在安全停靠時補充飲水，避免脫水或一次喝得太急。",
		caution: "水碗與飲水應收妥於側邊，行車時不要讓開放容器在車內翻倒。",
		sourceLabel: "動物醫療機構提供的外出飲水與運輸照護建議",
		feedback: "水碗與飲水已收妥。",
		expenseIds: ["water-bowl"],
		placement: {
			x: 55,
			y: 67,
			width: 27,
			layer: 6
		}
	},
	{
		id: "leash",
		label: "牽繩",
		kind: "supply",
		image: "/car/牽繩.png",
		preparedLabel: "已準備",
		description: "上下車前應先確認牽繩及合適的胸背帶已正確使用，避免小狗在陌生地點掙脫或逃跑。",
		reason: "抵達後可先控制移動範圍，再安全地讓小狗離開運輸籠。",
		caution: "牽繩應捲好並放在容易取得的位置，不要纏繞運輸籠或散落在車廂中。",
		sourceLabel: "領養單位提供的接回注意事項與外出安全提醒",
		feedback: "牽繩已收好，抵達後可以先確認安全裝備再讓小狗下車。",
		expenseIds: ["leash"],
		placement: {
			x: 30,
			y: 60,
			width: 25,
			layer: 4
		}
	},
	{
		id: "cleaner",
		label: "清潔用品",
		kind: "supply",
		image: "/room/清潔用品.png",
		preparedLabel: "已準備",
		description: "小狗在陌生環境或移動途中可能因緊張而排泄或嘔吐，可準備清潔袋、擦拭用品及安全的清潔工具。",
		reason: "途中若發生排泄或髒污，可以盡快整理並維持運輸空間舒適。",
		caution: "包裝需密封，與飲水分開收納，也不要放進運輸籠或讓小狗直接咬到。",
		sourceLabel: "領養單位與動物醫療機構提供的接送清潔建議",
		feedback: "清潔用品已收妥，可以處理途中可能發生的髒污。",
		expenseIds: ["cleaner"],
		placement: {
			x: 35,
			y: 68,
			width: 12,
			layer: 8
		}
	}
];
var departureTrunkItems = [
	trunkItems.find((item) => item.id === "id"),
	trunkItems.find((item) => item.id === "documents"),
	{
		id: "carrier",
		label: "運輸籠",
		kind: "supply",
		image: "/car/外出籠.png",
		preparedLabel: "已準備",
		description: "安全運輸籠可降低行車途中移動或逃脫的風險。",
		reason: "提供穩定的運輸空間。",
		caution: "確認尺寸合適並固定在平坦位置。",
		sourceLabel: "專案既有接回安全運輸建議",
		feedback: "運輸籠已放入後車廂。",
		expenseIds: ["carrier"],
		placement: {
			x: 51,
			y: 60,
			width: 34,
			layer: 5
		}
	},
	{
		id: "pee-pad",
		label: "尿墊",
		kind: "supply",
		image: "/car/尿墊.png",
		preparedLabel: "已準備",
		description: "尿墊可協助處理移動途中可能發生的排泄與髒污。",
		reason: "讓運輸區域保持乾淨。",
		caution: "平整鋪在運輸籠預定位置下方。",
		sourceLabel: "專案既有接回安全運輸建議",
		feedback: "尿墊已放入後車廂底部。",
		expenseIds: ["toilet"],
		placement: {
			x: 49,
			y: 66,
			width: 20,
			layer: 6
		}
	},
	trunkItems.find((item) => item.id === "water-kit"),
	trunkItems.find((item) => item.id === "leash"),
	trunkItems.find((item) => item.id === "cleaner")
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
				text: "保持距離，給牠安靜適應的時間",
				result: "correct",
				...positive,
				explanation: "做得很好！剛到新家的小狗需要先觀察環境。保持距離並提供安靜、安全的空間，能減少壓力，讓牠以自己的速度建立安全感。",
				suggestion: "準備乾淨飲水與可休息的角落，等牠主動靠近後再慢慢增加互動。"
			},
			{
				id: "force-pick-up",
				text: "強行抱出來",
				result: "incorrect",
				...incorrect,
				explanation: "這個做法可能讓牠更緊張。被強行抱起會讓小狗失去退路，增加防衛反應，也可能降低牠對新環境的安全感。",
				suggestion: "保持距離，提供安靜安全的空間，讓牠用自己的速度探索。"
			},
			{
				id: "keep-calling",
				text: "持續靠近並呼喚牠",
				result: "incorrect",
				...incorrect,
				explanation: "持續靠近與呼喚會增加刺激，讓還在適應中的小狗難以安心觀察，可能變得更緊張或躲避。",
				suggestion: "先給牠安靜的時間與可退回的安全空間，等待牠主動探索或靠近。"
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
				text: "請已確認能協助的家人或照顧者，幫忙今晚的餵食與活動。",
				result: "correct",
				...positive,
				explanation: "事先確認支援人選能避免忙碌時漏掉照顧，也讓交接更清楚。"
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
		stage: "生病與就醫",
		timeLabel: "生病與就醫",
		title: "食慾與精神狀況變差",
		description: "小狗今天食慾下降、活動變少，看起來和平常不太一樣。你會怎麼做？",
		topic: "健康觀察與就醫判斷",
		artIndex: 3,
		choices: [
			{
				id: "record-and-vet",
				text: "記錄食慾、飲水、排泄與精神狀態，並聯絡獸醫確認是否就醫",
				result: "correct",
				...positive,
				explanation: "做得很好！具體紀錄能幫助獸醫判斷，及早聯絡也能避免重要症狀被延誤。",
				suggestion: "持續記下症狀出現的時間、頻率與變化，並依獸醫建議安排就醫。",
				expenseIds: ["sick-vet-care"]
			},
			{
				id: "wait-and-see",
				text: "先等幾天看看，牠可能只是心情不好",
				result: "incorrect",
				...incorrect,
				explanation: "只等待可能錯過病況惡化的時機。食慾與精神同時變差時，應先觀察具體症狀並及早諮詢獸醫。",
				suggestion: "記錄食慾、飲水、排泄與精神變化，聯絡獸醫確認下一步。"
			},
			{
				id: "human-medicine",
				text: "自行餵人用藥或網路偏方",
				result: "incorrect",
				...incorrect,
				explanation: "人用藥與未經專業確認的偏方可能對小狗造成危險，也可能掩蓋病況並延誤治療。",
				suggestion: "不要自行給藥；先記錄症狀，並向獸醫說明觀察到的變化。"
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
				text: "和家人或照顧者確認可行安排，請能協助的人接手並完整交接。",
				result: "correct",
				...positive,
				explanation: "確認支援安排並保留交接紀錄，能讓豆豆的作息和健康照顧持續不中斷。"
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
		title: "看懂小狗的警告訊號"
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
		id: "sick",
		type: "scenario",
		timeLabel: "生病與就醫",
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
	arrivalMealFoodReady: false,
	arrivalMealWaterReady: false,
	sickTimePassComplete: false,
	bodyCareParts: [],
	seniorAdjustments: []
};
var import_jsx_runtime = require_jsx_runtime();
var arrivalVideoSources = ["/assets/pet-journey/arrival-transition.mp4", "/assets/pet-journey/arrival-transition2.mp4"];
function withPetName(text, petName) {
	return text.replaceAll("豆豆", petName).replaceAll("小狗", petName).replaceAll("狗狗", petName);
}
function ArrivalTransitionVideo({ onContinue }) {
	const videoRef = (0, import_react.useRef)(null);
	const hasFinishedArrivalVideo = (0, import_react.useRef)(false);
	const startTimeoutRef = (0, import_react.useRef)(null);
	const endTimeoutRef = (0, import_react.useRef)(null);
	const onContinueRef = (0, import_react.useRef)(onContinue);
	const [currentVideo, setCurrentVideo] = (0, import_react.useState)(0);
	const [needsManualPlay, setNeedsManualPlay] = (0, import_react.useState)(false);
	const [showWelcome, setShowWelcome] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		onContinueRef.current = onContinue;
	}, [onContinue]);
	(0, import_react.useCallback)(() => {
		if (hasFinishedArrivalVideo.current) return;
		hasFinishedArrivalVideo.current = true;
		if (startTimeoutRef.current !== null) window.clearTimeout(startTimeoutRef.current);
		videoRef.current?.pause();
		onContinueRef.current();
	}, []);
	const showFinalFrame = (0, import_react.useCallback)(() => {
		if (hasFinishedArrivalVideo.current) return;
		hasFinishedArrivalVideo.current = true;
		if (startTimeoutRef.current !== null) window.clearTimeout(startTimeoutRef.current);
		videoRef.current?.pause();
		setShowWelcome(true);
		endTimeoutRef.current = window.setTimeout(() => onContinueRef.current(), 1600);
	}, []);
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (!video) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			video.pause();
			video.currentTime = 0;
			startTimeoutRef.current = window.setTimeout(showFinalFrame, 180);
			return () => {
				if (startTimeoutRef.current !== null) window.clearTimeout(startTimeoutRef.current);
			};
		}
		startTimeoutRef.current = window.setTimeout(() => {
			if (video.paused || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) setNeedsManualPlay(true);
		}, 8e3);
		video.load();
		video.play()?.catch(() => {
			console.warn("接回家過場影片無法自動播放，已略過至飼養生活。");
			setNeedsManualPlay(true);
		});
		return () => {
			if (startTimeoutRef.current !== null) window.clearTimeout(startTimeoutRef.current);
		};
	}, [currentVideo, showFinalFrame]);
	function handlePlaying() {
		if (startTimeoutRef.current !== null) {
			window.clearTimeout(startTimeoutRef.current);
			startTimeoutRef.current = null;
		}
		setNeedsManualPlay(false);
	}
	function handleArrivalEnded() {
		if (currentVideo === 0) {
			setNeedsManualPlay(false);
			setCurrentVideo(1);
			return;
		}
		showFinalFrame();
	}
	function handleVideoError() {
		if (currentVideo === 0) {
			setCurrentVideo(1);
			return;
		}
		showFinalFrame();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "arrival-video-screen",
		"aria-label": "接回家影片過場",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			ref: videoRef,
			src: arrivalVideoSources[currentVideo],
			autoPlay: true,
			playsInline: true,
			preload: "auto",
			"aria-label": "小狗搭乘外出籠抵達新家的過場動畫",
			onPlaying: handlePlaying,
			onEnded: handleArrivalEnded,
			onError: () => {
				console.warn("接回家過場影片載入失敗，已略過至飼養生活。");
				handleVideoError();
			}
		}), showWelcome && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "arrival-video-welcome",
			children: "歡迎來到新家"
		})]
	});
}
function stageForIndex(index) {
	if (index <= 1) return 3;
	if (index <= 4) return 4;
	return 6;
}
function TimePassTransition({ onComplete }) {
	const videoRef = (0, import_react.useRef)(null);
	const [needsManualPlay, setNeedsManualPlay] = (0, import_react.useState)(false);
	const hasFinished = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (!video) return;
		video.play().catch(() => setNeedsManualPlay(true));
	}, []);
	function finish() {
		if (hasFinished.current) return;
		hasFinished.current = true;
		onComplete();
	}
	function playManually() {
		const video = videoRef.current;
		if (!video) return;
		video.muted = false;
		video.play().then(() => setNeedsManualPlay(false)).catch(() => setNeedsManualPlay(true));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "time-pass-transition",
		"aria-label": "時間流逝過場動畫",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			ref: videoRef,
			src: "/assets/pet-journey/time passes.mp4",
			autoPlay: true,
			playsInline: true,
			preload: "auto",
			"aria-label": "時間流逝過場動畫",
			onEnded: finish,
			onError: () => setNeedsManualPlay(true)
		}), needsManualPlay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "time-pass-play",
			onClick: playManually,
			children: "播放影片"
		})]
	});
}
function ScenarioFeedback({ scenario, choice, petName, onRetry, onContinue }) {
	const requiresRetry = scenario.id === "arrival-adjustment" || scenario.id === "illness-vet";
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: labels[choice.result].icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: scenario.timeLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: withPetName(choice.feedbackTitle, petName) })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(choice.explanation, petName) }),
			choice.suggestion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "feedback-suggestion",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "可以這樣調整" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(choice.suggestion, petName) })]
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "i" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "生活裡的責任提醒" }), withPetName(scenario.reminder, petName)] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "feedback-actions",
				children: [choice.result === "incorrect" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "secondary",
					onClick: onRetry,
					children: "重新選一次"
				}), (!requiresRetry || choice.result !== "incorrect") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary",
					onClick: onContinue,
					children: [
						scenario.id === "arrival-adjustment" ? "繼續" : labels[choice.result].button,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })
					]
				})]
			})
		]
	});
}
function ScenarioCard({ scenario, petName, answer, backupNames, feedbackOpen, onChoose, onRetry, onContinue }) {
	const [sceneVideoFailed, setSceneVideoFailed] = (0, import_react.useState)(false);
	const scenarioVideo = scenario.id === "arrival-adjustment" ? {
		src: "/assets/pet-journey/first-day.mp4",
		label: "小狗第一天適應新家的影片"
	} : scenario.id === "illness-vet" ? {
		src: "/assets/pet-journey/sick.mp4",
		label: "小狗生病與就醫情境影片"
	} : null;
	(0, import_react.useEffect)(() => setSceneVideoFailed(false), [scenario.id]);
	const selectedChoice = scenario.choices.find((choice) => choice.id === answer?.finalChoiceId);
	if (feedbackOpen && selectedChoice) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioFeedback, {
		scenario,
		choice: selectedChoice,
		petName,
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: withPetName(scenario.title, petName) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(scenario.description, petName) }),
				scenario.supportChoice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `support-link ${hasBackup ? "ready" : "missing"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hasBackup ? "✓" : "!" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: hasBackup ? `可聯絡：${backupNames.join("、")}` : "目前缺少可用的備用照顧支援" }), hasBackup ? "選項會直接使用前面建立的成員與分工。" : "請先以自己完成基本照顧或評估專業服務，不會顯示不存在的成員。"] })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `scene-art scene-${scenario.artIndex} ${scenarioVideo ? "scene-art--video" : ""}`,
			children: [scenarioVideo ? sceneVideoFailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scene-video-fallback",
				role: "status",
				children: "這段情境影片目前無法播放。"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				className: "scene-video",
				src: scenarioVideo.src,
				autoPlay: true,
				loop: true,
				muted: true,
				playsInline: true,
				preload: "metadata",
				"aria-label": scenarioVideo.label,
				onError: () => setSceneVideoFailed(true)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scene-sprite",
				"aria-hidden": "true"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: scenario.timeLabel })]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "reflection",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "如果是你，會怎麼做？" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "choice-grid",
			children: scenario.choices.filter((choice) => choice.id !== "assigned-helper" || hasBackup).map((choice) => {
				const text = choice.id === "assigned-helper" ? `請${backupNames.join("或")}依照事先安排的分工，協助今晚的餵食與活動。` : withPetName(choice.text, petName);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => onChoose(choice),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: choice.result === "correct" ? "可行做法" : choice.result === "partial" ? "需要調整" : "先想一想" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text })]
				}, choice.id);
			})
		})]
	})] });
}
var warningSignalSegments = [
	{
		title: "牠不是無故攻擊",
		text: "一般而言，犬隻通常不是無故攻擊。當牠覺得受到威脅或不舒服時，可能會先透過表情、聲音或行動發出警告。"
	},
	{
		title: "牠正在要求距離",
		text: "有經驗的狗狗為了避免衝突，可能會先示警，也會主動拉開安全距離。這時不要繼續逼近，應慢慢退開。"
	},
	{
		title: "常見的警示反應",
		text: "指南中列出的階段性警示行為包含：撩牙、撩嘴皮、低吼、吠叫、嘶吼。這些都是需要被看見的訊號。"
	},
	{
		title: "不要責罵，先降低刺激",
		text: "看到警告訊號時，不要立刻責罵或強迫牠配合。可以慢慢拉開距離，面對著牠逐漸離開現場，讓牠有空間冷靜。"
	},
	{
		title: "先觀察，再互動",
		text: "飼主應熟悉小狗平常的行為，學會辨識牠緊張、害怕或不舒服時的表現，才能更好地照顧牠的身心狀態。"
	}
];
function WarningSignalsActivity({ viewed, onView, onContinue }) {
	const videoRef = (0, import_react.useRef)(null);
	const complete = viewed.includes("warning-signals-video");
	const [started, setStarted] = (0, import_react.useState)(complete);
	const [videoFailed, setVideoFailed] = (0, import_react.useState)(false);
	const [segmentIndex, setSegmentIndex] = (0, import_react.useState)(complete ? warningSignalSegments.length - 1 : 0);
	function startVideo() {
		setStarted(true);
		const video = videoRef.current;
		if (!video) return;
		video.play().catch(() => setVideoFailed(true));
	}
	function syncSegment() {
		const video = videoRef.current;
		if (!video?.duration || !Number.isFinite(video.duration)) return;
		setSegmentIndex(Math.min(warningSignalSegments.length - 1, Math.floor(video.currentTime / video.duration * warningSignalSegments.length)));
	}
	function finishVideo() {
		setSegmentIndex(warningSignalSegments.length - 1);
		onView("warning-signals-video");
	}
	const segment = warningSignalSegments[segmentIndex];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "life-activity warning-signals-activity",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "activity-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "看懂小狗的警告訊號" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "有些反應不是牠故意兇，而是在告訴你：牠需要距離。" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "warning-signal-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "warning-signal-video-wrap",
					children: [
						!videoFailed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							ref: videoRef,
							className: "warning-signal-video",
							src: "/assets/pet-journey/03狗狗身體語言.mp4",
							playsInline: true,
							preload: "metadata",
							"aria-label": "小狗警告訊號教學影片",
							onTimeUpdate: syncSegment,
							onEnded: finishVideo,
							onError: () => {
								setVideoFailed(true);
								finishVideo();
							}
						}),
						!started && !videoFailed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "warning-signal-start",
							onClick: startVideo,
							"aria-label": "開始播放小狗警告訊號教學影片",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "▶" }), "開始觀看"]
						}),
						videoFailed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "warning-signal-fallback",
							role: "status",
							children: "影片目前無法播放，仍可閱讀右側警告訊號說明。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "warning-signal-video-tag",
							children: "Video"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "warning-signal-copy",
					"aria-live": "polite",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							segmentIndex + 1,
							" / ",
							warningSignalSegments.length
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: segment.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: segment.text }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "資料依據：農業部《寵物飼養與照顧指南－犬篇》" })
					]
				})]
			}),
			complete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "warning-signal-complete",
				role: "status",
				children: "你已經看過小狗的警告訊號。下次看到類似反應時，先給牠距離，就是很重要的照顧。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "activity-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: complete ? "已完成警告訊號教學" : started ? "影片播放中" : "點擊一次開始觀看" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary",
					disabled: !complete,
					onClick: onContinue,
					children: ["繼續生活旅程 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
				})]
			})
		]
	});
}
function ArrivalMealActivity({ activity, petName, onChange, onAddExpense, onContinue }) {
	const complete = activity.arrivalMealFoodReady && activity.arrivalMealWaterReady;
	const hasRecordedMeal = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!complete || hasRecordedMeal.current) return;
		hasRecordedMeal.current = true;
		onAddExpense("monthly-food-main");
	}, [complete, onAddExpense]);
	function prepareFood() {
		if (activity.arrivalMealFoodReady) return;
		onChange({ arrivalMealFoodReady: true });
	}
	function prepareWater() {
		if (activity.arrivalMealWaterReady) return;
		onChange({ arrivalMealWaterReady: true });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "arrival-meal-activity",
		"aria-label": `為${petName}準備第一餐`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "arrival-meal-supplies",
				"aria-label": "晚餐用品",
				children: [
					!activity.arrivalMealFoodReady && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: prepareFood,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/room/飼料.png",
							alt: "飼料"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "飼料" })]
					}),
					!activity.arrivalMealWaterReady && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: prepareWater,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/assets/pet-journey/waterbottle.png",
							alt: "水瓶"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "水" })]
					}),
					complete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "晚餐用品已準備好" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "arrival-meal-scene",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "arrival-meal-room",
						src: "/room/空房間.png",
						alt: "小狗的新家房間"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "arrival-meal-dog",
						src: "/assets/pet-journey/shiba-dog.png",
						alt: petName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "arrival-meal-water",
						src: activity.arrivalMealWaterReady ? "/room/水.png" : "/assets/pet-journey/空水碗.png",
						alt: activity.arrivalMealWaterReady ? "裝好水的水碗" : "空水碗"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "arrival-meal-food",
						src: activity.arrivalMealFoodReady ? "/room/狗碗.png" : "/assets/pet-journey/空飼料碗.png",
						alt: activity.arrivalMealFoodReady ? "裝好飼料的狗碗" : "空飼料碗"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "arrival-meal-footer",
				children: [complete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					children: "晚餐準備好了！合適的主食與乾淨飲水，是每天照顧的重要部分。"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary",
					disabled: !complete,
					onClick: onContinue,
					children: ["繼續生活旅程 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
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
function BodyCareActivity({ petName, viewed, onView, onContinue }) {
	const [active, setActive] = (0, import_react.useState)(viewed.at(-1) ?? "");
	const part = careParts.find((item) => item.id === active);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "life-activity body-care-activity",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "activity-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "清潔與基礎身體觀察" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"依序查看",
					petName,
					"的眼睛、耳朵、牙齒、皮膚毛髮、腳掌與指甲，將清潔變成每天都能做的健康觀察。"
				] })]
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
function SeniorRoomActivity({ roomReady, petName, selected, onSelect, onAddExpense, onContinue }) {
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
					"改造",
					petName,
					"的家"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [petName, "已經走得比較慢。保留領養前準備好的房間，再加入讓高齡生活更安全、舒服的調整。"] })]
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: complete ? `高齡生活空間調整完成。安全與舒適會隨${petName}的身體狀況持續變化。` : `已完成 ${selected.length} / ${seniorAdjustments.length} 項調整。` })
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
function LifeJourney({ index, petName, answers, activity, completedIds, expenses, backupNames, roomReady, onIndex, onChoose, onActivityChange, onCompleteItem, onAddExpense, onStageChange, onBack, onComplete }) {
	const item = journeyItems[index];
	const scenario = item.scenarioId ? lifeScenarios.find((entry) => entry.id === item.scenarioId) : void 0;
	const answer = scenario ? answers[scenario.id] : void 0;
	const showArrivalMeal = scenario?.id === "arrival-adjustment" && answer?.finalResult === "correct";
	const [feedbackOpen, setFeedbackOpen] = (0, import_react.useState)(Boolean(answer));
	const [timePassOpen, setTimePassOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setTimePassOpen(false), [index]);
	const completedCount = completedIds.length;
	function selectItem(next) {
		const nextScenarioId = journeyItems[next].scenarioId;
		setFeedbackOpen(Boolean(nextScenarioId && answers[nextScenarioId]));
		onIndex(next);
		onStageChange(stageForIndex(next));
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function continueJourney() {
		onCompleteItem(item.id);
		if (item.scenarioId === "illness-vet" && !activity.sickTimePassComplete) {
			setTimePassOpen(true);
			return;
		}
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
	if (timePassOpen && item.scenarioId === "illness-vet") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimePassTransition, { onComplete: () => {
		onActivityChange({ sickTimePassComplete: true });
		setTimePassOpen(false);
		selectItem(index + 1);
	} });
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
			scenario && (showArrivalMeal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrivalMealActivity, {
				activity,
				petName,
				onChange: onActivityChange,
				onAddExpense,
				onContinue: continueJourney
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioCard, {
				scenario,
				petName,
				answer,
				backupNames,
				feedbackOpen,
				onChoose: choose,
				onRetry: () => setFeedbackOpen(false),
				onContinue: continueJourney
			})),
			item.type === "body-language" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningSignalsActivity, {
				viewed: activity.bodyLanguageSignals,
				onView: (id) => onActivityChange({ bodyLanguageSignals: activity.bodyLanguageSignals.includes(id) ? activity.bodyLanguageSignals : [...activity.bodyLanguageSignals, id] }),
				onContinue: continueJourney
			}),
			item.type === "body-care" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BodyCareActivity, {
				petName,
				viewed: activity.bodyCareParts,
				onView: (id) => onActivityChange({ bodyCareParts: activity.bodyCareParts.includes(id) ? activity.bodyCareParts : [...activity.bodyCareParts, id] }),
				onContinue: continueJourney
			}),
			item.type === "senior-room" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeniorRoomActivity, {
				petName,
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
					children: ["← ", index > 0 ? "上一個生活內容" : "返回出發前準備"]
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
		end: 4
	},
	{
		label: "生活變化",
		start: 5,
		end: 8
	}
];
function statusAt(index, current, reached) {
	if (index === current) return "current";
	if (index <= reached) return "completed";
	return "locked";
}
function StageRail({ step, furthestStep, selectionPage, selectionReached, preparationTask, preparationReached, lifePhase, journeyIndex, journeyCompleted, profilePage, profileReached, onGoTo, onSelectionPage, onPreparationTask, onLifeStage, onProfilePage }) {
	const currentMain = step === 1 ? 0 : step === 2 ? 1 : step <= 6 ? 2 : step === 7 ? 3 : 4;
	const currentLifeStage = lifePhase === "arrival-video" ? 0 : lifeStageRanges.findIndex((range) => journeyIndex >= range.start && journeyIndex <= range.end);
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
				"家庭成員與共同照護",
				"出發前準備"
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
					"aria-current": item.status === "current" ? "step" : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.status === "completed" ? "✓" : item.number }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: item.label })]
				}), item.children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nav-children",
					children: item.children.map((child, childIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `nav-child ${child.status}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: child.onClick,
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
function RoomPreparation({ selectedItems, securedHazards, petName, onPrepare, onToggleHazard, onSavePetName, onBack, onNext }) {
	const [nameDraft, setNameDraft] = (0, import_react.useState)(petName);
	const [nameError, setNameError] = (0, import_react.useState)("");
	const [roomApproved, setRoomApproved] = (0, import_react.useState)(false);
	const [roomCheckMessage, setRoomCheckMessage] = (0, import_react.useState)("");
	const [dismissingHazard, setDismissingHazard] = (0, import_react.useState)(null);
	const [activeHazardInfo, setActiveHazardInfo] = (0, import_react.useState)(null);
	const [exitingItems, setExitingItems] = (0, import_react.useState)([]);
	const roomSceneRef = (0, import_react.useRef)(null);
	const [roomSceneReady, setRoomSceneReady] = (0, import_react.useState)(false);
	const itemsDone = roomItems.filter((item) => selectedItems.includes(item.id)).length;
	const hazardsDone = securedHazards.length;
	const complete = itemsDone === roomItems.length && hazardsDone === hazards.length && Boolean(petName.trim());
	const activeHazard = hazards.find((item) => item.id === activeHazardInfo);
	const remainingRoomItems = roomItems.filter((item) => !selectedItems.includes(item.id) || exitingItems.includes(item.id));
	const supplyRows = remainingRoomItems.length <= 3 ? [remainingRoomItems] : [
		remainingRoomItems.slice(0, 2),
		remainingRoomItems.slice(2, 4),
		remainingRoomItems.slice(4)
	].filter((row) => row.length > 0);
	(0, import_react.useEffect)(() => setNameDraft(petName), [petName]);
	(0, import_react.useEffect)(() => {
		const scene = roomSceneRef.current;
		if (!scene) return;
		const markReady = () => {
			if (scene.clientWidth > 0 && scene.clientHeight > 0) setRoomSceneReady(true);
		};
		markReady();
		const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(markReady);
		observer?.observe(scene);
		return () => observer?.disconnect();
	}, []);
	function prepareItem(id) {
		if (!roomItems.find((entry) => entry.id === id) || selectedItems.includes(id) || exitingItems.includes(id)) return;
		setExitingItems((current) => [...current, id]);
		onPrepare(id);
		window.setTimeout(() => setExitingItems((current) => current.filter((itemId) => itemId !== id)), 450);
		setRoomApproved(false);
		setRoomCheckMessage("");
	}
	function secureHazard(id) {
		if (!hazards.find((item) => item.id === id) || securedHazards.includes(id) || dismissingHazard) return;
		setDismissingHazard(id);
		setRoomApproved(false);
		setRoomCheckMessage("");
		window.setTimeout(() => {
			onToggleHazard(id);
			setDismissingHazard(null);
			setActiveHazardInfo(id);
		}, 260);
		window.setTimeout(() => setActiveHazardInfo((current) => current === id ? null : current), 4260);
	}
	function saveName() {
		const cleanName = nameDraft.trim();
		if (!cleanName) return setNameError("請先幫小狗取一個名字。");
		if ([...cleanName].length > 12) return setNameError("名字請控制在12個字以內。");
		onSavePetName(cleanName);
		setNameDraft(cleanName);
		setNameError("");
		setRoomApproved(false);
		setRoomCheckMessage("");
	}
	function checkRoom() {
		if (complete) {
			setRoomApproved(true);
			setRoomCheckMessage("");
			return;
		}
		setRoomApproved(false);
		const missingItems = roomItems.length - itemsDone;
		const remainingHazards = hazards.length - hazardsDone;
		setRoomCheckMessage([
			!petName.trim() ? "請先完成小狗命名" : "",
			missingItems > 0 ? `還有${missingItems}項用品尚未準備` : "",
			remainingHazards > 0 ? `還有${remainingHazards}項危險物品需要處理` : ""
		].filter(Boolean).join("，"));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap preparation-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
				title: "先替牠布置安全的生活空間",
				body: "點選七項日常用品，系統會自動放到合適位置；再找出房間中的四項安全風險。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "room-preparation-layout simplified-room-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "room-supply-shelf",
					"aria-label": "生活用品準備區",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "room-supply-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "用品準備箱" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: itemsDone === roomItems.length ? "用品已準備完成" : `${roomItems.length - itemsDone} 件可加入` })]
					}), remainingRoomItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "room-supply-rows",
						children: supplyRows.map((row, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `room-supply-row room-supply-row--${row.length}`,
							children: row.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: exitingItems.includes(item.id) ? "departing" : "",
								"aria-label": `${item.label}，可加入`,
								disabled: exitingItems.includes(item.id),
								onClick: () => prepareItem(item.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "room-supply-visual",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										className: `room-item-image room-item-image--${item.id}`,
										src: item.image,
										alt: ""
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label })]
							}, item.id))
						}, `${rowIndex}-${row.map((item) => item.id).join("-")}`))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "room-interaction-column",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: roomSceneRef,
						className: `room-scene simplified-room-scene ${roomSceneReady ? "room-scene-ready" : ""}`,
						role: "group",
						"aria-label": "寵物生活空間",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "room-scene-background",
								src: "/room/空房間.png",
								alt: "空的寵物生活房間"
							}),
							roomItems.filter((item) => selectedItems.includes(item.id)).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `room-object placed-supply auto-room-object ${item.id === "food" ? "placed-room-item--food" : ""}`,
								style: {
									left: `${item.placement.x}%`,
									top: `${item.placement.y}%`,
									width: `${item.placement.width}%`,
									zIndex: item.placement.layer
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: `房間中已配置的${item.label}`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
							}, item.id)),
							hazards.filter((item) => !securedHazards.includes(item.id)).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: `room-object room-hazard ${dismissingHazard === item.id ? "dismissing" : ""}`,
								style: {
									left: `${item.placement.x}%`,
									top: `${item.placement.y}%`,
									width: `${item.placement.width}%`,
									zIndex: item.placement.layer
								},
								onClick: () => secureHazard(item.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: `房間中的危險物品：${item.label}`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
							}, item.id)),
							petName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pet-nameplate named",
								"aria-live": "polite",
								children: [petName, "的家"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: `pet-name-inline pet-name-overlay ${petName ? "named" : ""}`,
								"aria-labelledby": "pet-name-inline-title",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										id: "pet-name-inline-title",
										children: "牠叫什麼名字？"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "pet-name",
											children: "小狗名字"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "pet-name",
											value: nameDraft,
											maxLength: 24,
											placeholder: "請輸入小狗的名字",
											onChange: (event) => setNameDraft(event.target.value),
											"aria-invalid": Boolean(nameError),
											"aria-describedby": "pet-name-error"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "secondary",
											onClick: saveName,
											children: "掛上名字牌"
										})
									] }),
									nameError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										id: "pet-name-error",
										className: "field-error",
										role: "alert",
										children: nameError
									})
								]
							}),
							activeHazard && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "room-hazard-alert",
								role: "status",
								"aria-live": "polite",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [activeHazard.label, "已收起"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "為什麼危險：" }), activeHazard.danger] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "建議如何處理：" }), activeHazard.handling] })
								]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "room-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "secondary",
					onClick: onBack,
					children: "← 返回"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "room-actions-right",
					children: [
						roomCheckMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "room-check-message",
							role: "alert",
							children: roomCheckMessage
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary",
							onClick: checkRoom,
							children: "檢查房間"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary",
							onClick: onNext,
							disabled: !roomApproved,
							children: ["房間完成，設定照顧成員 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
						})
					]
				})]
			})
		]
	});
}
function CareMemberSetup({ members, onChange, onBack, onNext }) {
	const [errors, setErrors] = (0, import_react.useState)({});
	const primary = members.find((member) => member.isPlayer);
	const valid = Boolean(primary?.name.trim() && primary.age && primary.age >= 1 && primary.age <= 120 && members.filter((member) => !member.isPlayer).every((member) => member.name.trim() && (member.age === null || member.age >= 1 && member.age <= 120)));
	function updateMember(id, patch) {
		onChange(members.map((member) => member.id === id ? {
			...member,
			...patch
		} : member));
	}
	function addMember() {
		if (members.length < 6) onChange([...members, {
			id: `member-${Date.now()}`,
			name: "",
			age: null,
			isPlayer: false
		}]);
	}
	function validate() {
		const nextErrors = {};
		members.forEach((member) => {
			if (!member.name.trim()) nextErrors[`${member.id}-name`] = member.isPlayer ? "請填寫主要照顧者稱呼。" : "請填寫共同照護者稱呼。";
			if (member.isPlayer && (member.age === null || member.age < 1 || member.age > 120)) nextErrors[`${member.id}-age`] = "請輸入 1～120 歲。";
			if (!member.isPlayer && member.age !== null && (member.age < 1 || member.age > 120)) nextErrors[`${member.id}-age`] = "年齡如有填寫，請輸入 1～120 歲。";
		});
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length === 0) onNext();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap preparation-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
				title: "設定主要飼養者與共同照護者",
				body: "先填寫主要飼養者；若確實有人可以一起照護，再新增共同照護者即可。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "member-grid",
				children: members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "member-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "member-card-head",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: member.isPlayer ? "主" : "協" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: member.isPlayer ? "主要飼養者" : "共同照護者" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: member.isPlayer ? "名稱與年齡必填" : "名稱必填，年齡選填" })] }),
								!member.isPlayer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => onChange(members.filter((item) => item.id !== member.id)),
									children: "移除"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["名稱或稱呼", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: member.name,
							placeholder: member.isPlayer ? "例：小美" : "例：媽媽",
							onChange: (event) => updateMember(member.id, { name: event.target.value })
						})] }),
						errors[`${member.id}-name`] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: errors[`${member.id}-name`]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
							"年齡",
							!member.isPlayer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "（選填）" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								inputMode: "numeric",
								min: "1",
								max: "120",
								value: member.age ?? "",
								placeholder: "例：35",
								onChange: (event) => updateMember(member.id, { age: event.target.value ? Number(event.target.value) : null })
							})
						] }),
						errors[`${member.id}-age`] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: errors[`${member.id}-age`]
						})
					]
				}, member.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "add-member-button",
				onClick: addMember,
				disabled: members.length >= 6,
				children: ["＋新增共同照護者 ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [members.length - 1, " / 5"] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `task-message ${valid ? "success" : ""}`,
				children: valid ? "照顧成員資料已完成，可以整理出發用品。" : "請先完成主要照顧者資料；共同照護者只需填寫真實存在的人選。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButtons, {
				onBack,
				onNext: validate,
				nextLabel: "成員完成，準備出發"
			})
		]
	});
}
function CarTrunkPreparation({ selected, onSelect, onBack, onNext }) {
	const [exitingItems, setExitingItems] = (0, import_react.useState)([]);
	const [departing, setDeparting] = (0, import_react.useState)(false);
	const documents = departureTrunkItems.filter((item) => item.kind === "document");
	const supplies = departureTrunkItems.filter((item) => item.kind === "supply");
	const documentDone = documents.filter((item) => selected.includes(item.id)).length;
	const supplyDone = supplies.filter((item) => selected.includes(item.id)).length;
	const complete = documentDone === documents.length && supplyDone === supplies.length;
	const remainingItems = departureTrunkItems.filter((item) => !selected.includes(item.id) || exitingItems.includes(item.id));
	const supplyRows = remainingItems.length <= 3 ? [remainingItems] : [
		remainingItems.slice(0, 2),
		remainingItems.slice(2, 4),
		remainingItems.slice(4)
	].filter((row) => row.length > 0);
	const [message, setMessage] = (0, import_react.useState)("");
	trunkItems[0];
	function selectItem(id) {
		if (selected.includes(id) || exitingItems.includes(id)) return;
		setExitingItems((current) => [...current, id]);
		window.setTimeout(() => {
			onSelect(id);
			setExitingItems((current) => current.filter((itemId) => itemId !== id));
		}, 360);
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
				body: ""
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `departure-layout ${departing ? "departing" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "departure-supply-shelf",
					"aria-label": "準備物品",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "departure-supply-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "準備物品" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: complete ? "準備完成" : `${remainingItems.length} 件可準備` })]
					}), !complete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "departure-supply-rows",
						children: supplyRows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `departure-supply-row departure-supply-row--${row.length}`,
							children: row.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: exitingItems.includes(item.id) ? "departing" : "",
								onClick: () => selectItem(item.id),
								"aria-label": `準備${item.label}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "departure-supply-visual",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										className: `departure-item-image departure-item-image--${item.id}`,
										src: item.image,
										alt: ""
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label })]
							}, item.id))
						}, `${row.map((item) => item.id).join("-")}-${index}`))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "departure-car",
					"aria-label": "已打開的汽車後車廂與自動配置用品",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "car-trunk-background",
							src: "/car/後車箱.png",
							alt: "打開的汽車後車廂"
						}),
						selected.includes("documents") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "car-document-folder complete",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/car/文件.png",
								alt: "領養文件夾"
							})
						}),
						selected.includes("id") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "placed-car-item placed-car-id",
							src: "/car/身分證件.png",
							alt: "放入文件夾的身分證"
						}),
						supplies.filter((item) => selected.includes(item.id)).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: `placed-car-item placed-car-${item.id}`,
							style: {
								left: `${item.placement.x}%`,
								top: `${item.placement.y}%`,
								width: `${item.placement.width}%`,
								zIndex: item.placement.layer
							},
							src: item.image,
							alt: `後車廂內的${item.label}`
						}, item.id))
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "departure-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "secondary",
					onClick: onBack,
					children: "← 返回"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "primary",
					onClick: depart,
					disabled: !complete,
					children: ["出發接牠 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
				}) })]
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
function AssessmentReport({ petName, breed, profile, expenses, emergencyReserve, roomReady, hazardsReady, members, trunkSelected, trunkPassed, answers, lifeActivity, onBack, onReset }) {
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
			label: "已看過小狗的警告訊號",
			complete: lifeActivity.bodyLanguageSignals.includes("warning-signals-video")
		},
		{
			label: "已完成到家第一餐",
			complete: lifeActivity.arrivalMealFoodReady && lifeActivity.arrivalMealWaterReady
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
	const backupNames = members.filter((member) => !member.isPlayer && member.name.trim()).map((member) => member.name);
	const requiredRoom = roomItems.filter((item) => item.required);
	const roomCompletion = Math.round(roomReady.filter((id) => requiredRoom.some((item) => item.id === id)).length / requiredRoom.length * 100);
	const budgetEnough = Number(profile.monthlyBudget) >= recurring;
	const strongSignals = [
		roomCompletion === 100 && hazardsReady.length === hazards.length && trunkPassed,
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
		hazardsReady.length === hazards.length && "居家危險物已完成收納與防護",
		backupNames.length > 0 && `已有可協助照顧的家庭成員：${backupNames.join("、")}`,
		trunkPassed && "接送行李、文件與安全運輸已通過檢查",
		correctFirst >= 5 && `${correctFirst} 個情境第一次就掌握照顧方向`,
		practiceComplete === 5 && "四個生活練習與飲水步驟皆已完成",
		budgetEnough && "每月預算可涵蓋目前固定支出"
	].filter(Boolean);
	const confirm = [
		roomCompletion < 100 && `必要用品完成度 ${roomCompletion}%`,
		hazardsReady.length < hazards.length && "仍有居家危險物需要防護",
		backupNames.length === 0 && "尚未新增其他可協助的照顧成員",
		!trunkPassed && "接寵物後車廂尚未通過檢查",
		!budgetEnough && `每月預算低於目前固定支出 NT$ ${money.format(recurring)}`,
		profile.emergencyFund === false && "目前沒有緊急預備金",
		...needsLearning.slice(0, 5).map((item) => `情境需要再確認：${item}`)
	].filter(Boolean);
	const familyTopics = [
		profile.hasHousemates && profile.housematesConsent !== true && "所有同住者是否知情並同意飼養",
		profile.housing === "租屋" && profile.landlordConsent !== "房東已同意" && "租屋規定與房東書面同意",
		profile.backupSupport === false && "忙碌、出差或生病時由誰接手"
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: level }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"這份報告不貼標籤，而是把和",
					petName,
					"的模擬生活轉成下一步可執行的準備。"
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "summary-pet",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedBreed?.icon ?? "🐕" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
							petName,
							" · ",
							selectedBreed?.label
						] }),
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "領養前準備" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "家、成員與接送" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "report-metrics",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "房間必要用品" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [roomCompletion, "%"] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "危險物防護" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
									hazardsReady.length,
									" / ",
									hazards.length
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "照顧成員" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: backupNames.length ? backupNames.join("、") : "只有我" })] }),
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "家庭照顧成員" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: backupNames.join("、") || "只有我" })] }),
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
	const [trunkSelected, setTrunkSelected] = (0, import_react.useState)([]);
	const [trunkPassed, setTrunkPassed] = (0, import_react.useState)(false);
	const [expenses, setExpenses] = (0, import_react.useState)([]);
	const [latestExpense, setLatestExpense] = (0, import_react.useState)(null);
	const [lifePhase, setLifePhase] = (0, import_react.useState)("arrival-video");
	const [petName, setPetName] = (0, import_react.useState)("");
	const [journeyIndex, setJourneyIndex] = (0, import_react.useState)(0);
	const [journeyCompleted, setJourneyCompleted] = (0, import_react.useState)([]);
	const [lifeActivity, setLifeActivity] = (0, import_react.useState)(initialLifeActivityState);
	const [scenarioAnswers, setScenarioAnswers] = (0, import_react.useState)({});
	const [profile, setProfile] = (0, import_react.useState)(initialProfile);
	const [profilePage, setProfilePage] = (0, import_react.useState)(0);
	const [profileReached, setProfileReached] = (0, import_react.useState)(0);
	const backupNames = (0, import_react.useMemo)(() => {
		return members.filter((member) => !member.isPlayer && member.name.trim()).map((member) => member.name);
	}, [members]);
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
			5
		];
		const underlyingStep = [
			3,
			4,
			6
		];
		if (lifePhase === "arrival-video" && stageIndex === 0) {
			setStep(3);
			setIntroOpen(false);
		} else {
			setLifePhase("life-journey");
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
		setMembers(nextMembers);
	}
	function selectTrunkItem(id) {
		if (!id) return;
		const expenseIds = departureTrunkItems.find((item) => item.id === id)?.expenseIds ?? [];
		setTrunkSelected((current) => {
			if (current.includes(id)) return current;
			const next = [...current, id];
			setTrunkPassed(departureTrunkItems.every((item) => next.includes(item.id)));
			return next;
		});
		expenseIds.forEach(addExpenseById);
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
		setTrunkSelected([]);
		setTrunkPassed(false);
		setExpenses([]);
		setLatestExpense(null);
		setLifePhase("arrival-video");
		setPetName("");
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
			petName,
			onPrepare: addRoomItem,
			onToggleHazard: toggleHazard,
			onSavePetName: setPetName,
			onBack: () => goTo(1),
			onNext: () => changePreparationTask(1)
		});
		if (preparationTask === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareMemberSetup, {
			members,
			onChange: updateMembers,
			onBack: () => changePreparationTask(0),
			onNext: () => changePreparationTask(2)
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarTrunkPreparation, {
			selected: trunkSelected,
			onSelect: selectTrunkItem,
			onBack: () => changePreparationTask(1),
			onNext: () => {
				setStep(3);
				setFurthestStep((current) => Math.max(current, 3));
				setIntroOpen(false);
				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});
			}
		});
	}
	function renderLifeJourney() {
		if (lifePhase === "arrival-video") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrivalTransitionVideo, { onContinue: () => {
			setJourneyIndex(0);
			setLifePhase("life-journey");
		} });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeJourney, {
			index: journeyIndex,
			petName,
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
				setPreparationTask(2);
				setIntroOpen(false);
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
							petName,
							breed,
							profile,
							expenses,
							emergencyReserve,
							roomReady,
							hazardsReady,
							members,
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
