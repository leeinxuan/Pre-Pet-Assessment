import { n as require_jsx_runtime, o as require_react, s as __toESM, t as require_react_dom } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-DxNJ-qM2.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var money = new Intl.NumberFormat("zh-TW");
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
		image: "/species/犬.png",
		active: true
	},
	{
		id: "cat",
		label: "貓",
		icon: "🐈",
		image: "/species/貓.png",
		active: false
	},
	{
		id: "rabbit",
		label: "兔",
		icon: "🐇",
		image: "/species/兔.png",
		active: false
	},
	{
		id: "bird",
		label: "鳥",
		icon: "🦜",
		image: "/species/鳥.png",
		active: false
	},
	{
		id: "reptile",
		label: "爬蟲",
		icon: "🦎",
		image: "/species/爬蟲.png",
		active: false
	},
	{
		id: "small",
		label: "小型哺乳",
		icon: "🐹",
		image: "/species/小型哺乳.png",
		active: false
	}
];
var breeds = [
	{
		id: "chihuahua",
		label: "吉娃娃",
		icon: "🐕",
		image: "/species/dog/吉娃娃.png",
		shortDescription: "體型嬌小、警覺性高，適合室內陪伴生活。雖然活動空間需求較小，仍需要規律散步與溫和社會化。"
	},
	{
		id: "poodle",
		label: "貴賓犬",
		icon: "🐩",
		image: "/species/dog/貴賓犬.png",
		shortDescription: "聰明、親人且學習力強，需要足夠互動、益智活動與定期美容整理。適合願意投入陪伴與訓練時間的家庭。"
	},
	{
		id: "shiba",
		label: "柴犬",
		icon: "🐕",
		image: "/species/dog/柴犬.png",
		shortDescription: "個性獨立、精力充沛，也可能較有主見。需要穩定訓練、充足散步與安全的外出牽繩管理。"
	},
	{
		id: "border",
		label: "邊境牧羊犬",
		icon: "🐕‍🦺",
		image: "/species/dog/邊境牧羊犬.png",
		shortDescription: "學習力與精力都非常高，需要大量運動、訓練和腦力刺激。較適合生活步調活躍、能長時間陪伴互動的飼主。"
	},
	{
		id: "labrador",
		label: "拉布拉多",
		icon: "🦮",
		image: "/species/dog/拉不拉多.png",
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
			x: 32,
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
			x: 42,
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
			y: 46,
			width: 10,
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
			x: 50,
			y: 85,
			width: 9,
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
var partial = {
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
({ ...positive$1 }), { ...partial }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...partial }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...partial }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...partial }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...partial }, { ...incorrect$1 }, { ...positive$1 }, { ...partial }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...partial }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 }, { ...positive$1 }, { ...positive$1 }, { ...incorrect$1 };
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
		id: "behavior-barking",
		stage: "日常行為照顧",
		timeLabel: "日常生活",
		title: "牠一直吠叫，該怎麼辦？",
		description: "晚上你正在休息，小狗突然對著門口一直吠叫。你看見牠有些警覺，也注意到附近有聲音經過。",
		topic: "日常行為照顧",
		artIndex: 4,
		choices: [
			{
				id: "bark-play",
				text: "提供遊戲與互動，增加安全感",
				result: "correct",
				...positive,
				explanation: "遊戲與溫和互動能提供安全感，也有助於把注意力轉向合適的活動。"
			},
			{
				id: "bark-walk",
				text: "帶牠適量散步，消耗精力",
				result: "correct",
				...positive,
				explanation: "依小狗狀況安排適量散步，有助於滿足活動需求並降低累積的焦躁。"
			},
			{
				id: "bark-scold",
				text: "牠一直叫就大聲罵牠，讓牠知道不可以",
				result: "incorrect",
				...incorrect,
				explanation: "單純責罵可能增加緊張，無法處理吠叫背後的原因。",
				suggestion: "從安全感、活動量與正向互動著手；持續影響生活時可尋求專業協助。"
			},
			{
				id: "bark-expert",
				text: "若情況持續或影響生活，尋求獸醫或行為專家協助",
				result: "correct",
				...positive,
				explanation: "當狀況持續或影響生活時，及早諮詢獸醫或行為專家能更完整找出原因。"
			}
		]
	},
	{
		id: "behavior-chewing",
		stage: "日常行為照顧",
		timeLabel: "日常生活",
		title: "牠開始亂咬東西，該怎麼辦？",
		description: "你回到客廳時，發現小狗正在咬桌腳旁的物品。旁邊還有一些不能讓牠碰到的小東西。",
		topic: "日常行為照顧",
		artIndex: 4,
		choices: [
			{
				id: "chew-toys",
				text: "提供多樣化且安全的啃咬玩具",
				result: "correct",
				...positive,
				explanation: "安全的啃咬玩具能提供合適的探索出口，也能讓牠把咬的需求放在正確物品上。"
			},
			{
				id: "chew-store-hazards",
				text: "把有害物品收好，避免牠接觸",
				result: "correct",
				...positive,
				explanation: "先管理環境能降低誤食與受傷風險，也讓小狗更容易練習安全的選擇。"
			},
			{
				id: "chew-punish",
				text: "看到牠咬東西就立刻打牠或嚇牠",
				result: "incorrect",
				...incorrect,
				explanation: "打罵或驚嚇可能造成壓力、破壞信任，也不一定能解決探索與情緒需求。",
				suggestion: "提供安全啃咬玩具、收好危險物品；情況嚴重或持續時可找專業協助。"
			},
			{
				id: "chew-expert",
				text: "若情況嚴重或持續，尋求獸醫或行為專家協助",
				result: "correct",
				...positive,
				explanation: "持續或嚴重的行為改變值得讓獸醫或行為專家協助評估。"
			}
		]
	},
	{
		id: "behavior-toileting",
		stage: "日常行為照顧",
		timeLabel: "日常生活",
		title: "牠在不適合的地方大小便，該怎麼辦？",
		description: "你發現小狗在不適合的位置大小便。牠看起來不是故意搗亂，而是還沒建立固定如廁習慣。",
		topic: "日常行為照顧",
		artIndex: 4,
		choices: [
			{
				id: "toilet-material",
				text: "使用適當材質鋪地，例如報紙或尿布墊",
				result: "correct",
				...positive,
				explanation: "適當材質能幫助建立固定如廁位置，也讓清潔和引導更一致。"
			},
			{
				id: "toilet-outings",
				text: "一天多安排幾次外出如廁機會",
				result: "correct",
				...positive,
				explanation: "增加合適的外出機會，能讓幼犬有更多時間練習正確如廁。"
			},
			{
				id: "toilet-scold",
				text: "牠尿錯地方就把牠抓過來罵",
				result: "incorrect",
				...incorrect,
				explanation: "責罵可能讓狗狗害怕，卻不一定知道正確如廁地點。",
				suggestion: "使用適當材質、增加外出機會，並在牠做對時給予獎勵。"
			},
			{
				id: "toilet-expert",
				text: "若頻率異常或持續困擾，尋求獸醫或行為專家協助",
				result: "correct",
				...positive,
				explanation: "頻率異常或持續困擾時，尋求獸醫或行為專家協助能確認是否有健康或行為需求。"
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
		choices: [
			{
				id: "alone-with-food",
				text: "準備大量食物，讓牠自己待在家",
				result: "incorrect",
				...incorrect,
				explanation: "只準備大量食物，讓小狗長時間獨自在家，可能造成飲水不足、排泄無法處理、過量進食、焦慮或突發狀況沒有人發現。",
				suggestion: "離家前應先確認能接手餵食、飲水、排泄與活動的人選，並清楚交接照顧需求。"
			},
			{
				id: "family-helper",
				text: "請家庭成員協助",
				result: "correct",
				...positive,
				explanation: "事先確認家庭成員能協助照顧，能讓小狗持續獲得餵食、飲水、排泄照顧與陪伴，不會長時間完全無人照護。"
			},
			{
				id: "trusted-helper",
				text: "請最近幾天有空、也了解照顧需求的朋友協助",
				result: "correct",
				...positive,
				explanation: "狗狗不能長時間完全無人照護。忙碌或離家時，可以找最近幾天有空、可信任，且願意依照交接內容協助照顧的朋友，協助餵食、換水、清理排泄與觀察狀況。"
			}
		]
	},
	{
		id: "illness-vet",
		stage: "生病與就醫",
		timeLabel: "生病與就醫",
		title: "柴犬常見健康問題觀察",
		description: "最近你發現小狗常常舔腳、抓癢，走路時偶爾不太想跳上跳下，眼睛也有些紅紅的。",
		topic: "健康觀察與就醫判斷",
		artIndex: 3,
		choices: [
			{
				id: "record-and-vet",
				text: "記錄食慾、飲水、排泄、精神與症狀變化，並聯絡獸醫確認是否就醫",
				result: "correct",
				...positive,
				explanation: "及早觀察與記錄能幫助獸醫判斷。",
				suggestion: "柴犬較常見需要留意的健康問題包括：\n皮膚過敏或搔癢、掉毛、紅腫；\n關節不適、跛行或活動力下降；\n眼睛分泌物增加、紅眼或視力異常。\n\n如果發現食慾、精神、排泄或活動狀況和平常不同，請記錄變化並尋求獸醫建議。",
				expenseIds: ["sick-vet-care"]
			},
			{
				id: "wait-and-see",
				text: "先等幾天看看，牠可能只是心情不好",
				result: "incorrect",
				...incorrect,
				explanation: "等太久可能延誤皮膚過敏、關節不適或眼部問題的處理，讓小狗持續不舒服。",
				suggestion: "記錄具體症狀與變化，並聯絡獸醫確認是否需要檢查。"
			},
			{
				id: "human-medicine",
				text: "自行餵人用藥或網路偏方",
				result: "incorrect",
				...incorrect,
				explanation: "人用藥與未經專業確認的偏方可能對小狗造成危險，也可能讓皮膚、關節或眼部問題更難判斷。",
				suggestion: "不要自行給藥；先記錄症狀，再向獸醫說明觀察到的變化。"
			}
		]
	},
	{
		id: "growing-old",
		stage: "逐漸進入高齡",
		timeLabel: "逐漸進入高齡",
		title: "高齡後的照顧準備",
		description: "小狗進入高齡階段後，健康檢查與醫療照顧變得更重要。你開始發現牠需要比以前更多觀察與照顧。",
		topic: "高齡照顧與醫療準備",
		artIndex: 1,
		choices: [
			{
				id: "senior-plan-ahead",
				text: "提前規劃醫療基金，學習老年照顧知識，並定期諮詢獸醫",
				result: "correct",
				...positive,
				explanation: "做得很好！提前準備能幫助飼主在高齡階段更穩定地照顧小狗，也能及早安排健康觀察、醫療需求與長期照顧。"
			},
			{
				id: "senior-wait",
				text: "等到牠真的很嚴重再處理，平常不用特別準備",
				result: "incorrect",
				...incorrect,
				explanation: "高齡照顧需要提前準備。等到症狀很嚴重才處理，可能延誤照顧，也會讓小狗承受更多不適。",
				suggestion: "提前規劃醫療基金，持續觀察健康變化並定期諮詢獸醫。"
			},
			{
				id: "senior-human-medicine",
				text: "自行判斷並使用人用藥物或網路偏方",
				result: "incorrect",
				...incorrect,
				explanation: "人用藥物或網路偏方可能對小狗造成危險。高齡階段若有健康疑慮，應諮詢獸醫並依專業建議處理。",
				suggestion: "不要自行給藥；記錄觀察到的變化，再與獸醫討論適合的照顧方式。"
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
		id: "behavior",
		type: "scenario",
		timeLabel: "日常行為照顧",
		title: "日常行為照顧"
	},
	{
		id: "walking",
		type: "walking",
		timeLabel: "日常生活",
		title: "今天也要出門散步"
	},
	{
		id: "busy-care",
		type: "scenario",
		timeLabel: "穩定生活的日常",
		title: "忙碌時的日常照顧",
		scenarioId: "busy-daily-care"
	},
	{
		id: "sick",
		type: "scenario",
		timeLabel: "生病與就醫",
		title: "生病與就醫",
		scenarioId: "illness-vet"
	},
	{
		id: "senior",
		type: "scenario",
		timeLabel: "逐漸進入高齡",
		title: "小狗逐漸老去",
		scenarioId: "growing-old"
	}
];
var initialLifeActivityState = {
	bodyLanguageSignals: [],
	arrivalMealFoodReady: false,
	arrivalMealWaterReady: false,
	walkingPreparedItems: [],
	walkingSceneIndex: 0,
	walkingMinutes: 0,
	walkingPoopCleaned: false,
	walkingComplete: false,
	sickTimePassComplete: false,
	bodyCareParts: [],
	seniorAdjustments: []
};
var import_jsx_runtime = require_jsx_runtime();
var arrivalVideoSource = "/assets/pet-journey/arrival-transition.mp4";
function withPetName(text, petName) {
	return text.replaceAll("豆豆", petName).replaceAll("小狗", petName).replaceAll("狗狗", petName);
}
var lifeStageLabels = {
	arrival: "適應新家與安全感",
	daily: "日常生活照護",
	change: "當生活發生變化"
};
function lifeStageLabelForScenario(scenario) {
	if (scenario.id === "arrival-adjustment") return lifeStageLabels.arrival;
	if (scenario.id === "illness-vet" || scenario.id === "growing-old") return lifeStageLabels.change;
	return lifeStageLabels.daily;
}
function otherCorrectChoices(scenario, choice, petName) {
	if (choice.result !== "correct") return [];
	return scenario.choices.filter((entry) => entry.result === "correct" && entry.id !== choice.id).filter((entry) => !(scenario.id === "busy-daily-care" && entry.id === "family-helper")).slice(0, 2).map((entry) => withPetName(entry.text, petName));
}
function OtherCorrectTips({ scenario, choice, petName }) {
	const tips = otherCorrectChoices(scenario, choice, petName);
	if (tips.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "other-correct-tips",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "也可以這樣做" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: tips.map((tip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: tip }, tip)) })]
	});
}
function ArrivalTransitionVideo({ onContinue }) {
	const videoRef = (0, import_react.useRef)(null);
	const hasFinishedArrivalVideo = (0, import_react.useRef)(false);
	const startTimeoutRef = (0, import_react.useRef)(null);
	const endTimeoutRef = (0, import_react.useRef)(null);
	const onContinueRef = (0, import_react.useRef)(onContinue);
	const [needsManualPlay, setNeedsManualPlay] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		onContinueRef.current = onContinue;
	}, [onContinue]);
	const showFinalFrame = (0, import_react.useCallback)(() => {
		if (hasFinishedArrivalVideo.current) return;
		hasFinishedArrivalVideo.current = true;
		if (startTimeoutRef.current !== null) window.clearTimeout(startTimeoutRef.current);
		videoRef.current?.pause();
		endTimeoutRef.current = window.setTimeout(() => onContinueRef.current(), 1e3);
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
			if (endTimeoutRef.current !== null) window.clearTimeout(endTimeoutRef.current);
		};
	}, [showFinalFrame]);
	function handlePlaying() {
		if (startTimeoutRef.current !== null) {
			window.clearTimeout(startTimeoutRef.current);
			startTimeoutRef.current = null;
		}
		setNeedsManualPlay(false);
	}
	function startVideoManually() {
		const video = videoRef.current;
		if (!video) return;
		video.muted = false;
		video.play().then(() => setNeedsManualPlay(false)).catch(() => setNeedsManualPlay(true));
	}
	function handleArrivalEnded() {
		showFinalFrame();
	}
	function handleVideoError() {
		showFinalFrame();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "arrival-video-screen",
		"aria-label": "接回家影片過場",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			ref: videoRef,
			src: arrivalVideoSource,
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
		}), needsManualPlay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "primary arrival-video-play",
			onClick: startVideoManually,
			children: "播放影片"
		})]
	});
}
function stageForIndex(index) {
	if (index <= 0) return 3;
	if (index <= 3) return 4;
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
	const requiresRetry = scenario.id === "arrival-adjustment" || scenario.id === "illness-vet" || scenario.id === "growing-old";
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtherCorrectTips, {
				scenario,
				choice,
				petName
			}),
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
					className: "life-stage-label",
					children: lifeStageLabelForScenario(scenario)
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: scenario.id === "growing-old" ? "你會怎麼安排？" : "如果是你，會怎麼做？" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "choice-grid",
			children: scenario.choices.filter((choice) => choice.id !== "assigned-helper" || hasBackup).map((choice) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => onChoose(choice),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: choice.id === "assigned-helper" ? `請${backupNames.join("或")}依照事先安排的分工，協助今晚的餵食與活動。` : withPetName(choice.text, petName) })
				}, choice.id);
			})
		})]
	})] });
}
function VideoScenarioActivity({ scenario, answer, petName, onChoose, onCorrectComplete }) {
	const [mode, setMode] = (0, import_react.useState)(answer?.finalResult === "correct" ? "positive" : answer ? "incorrect" : "question");
	const [videoFailed, setVideoFailed] = (0, import_react.useState)(false);
	const [, setVideoFinished] = (0, import_react.useState)(false);
	const source = scenario.id === "arrival-adjustment" ? "/assets/pet-journey/first-day.mp4" : scenario.id === "growing-old" ? "/assets/pet-journey/time passes_old.mp4" : "/assets/pet-journey/sick.mp4";
	const selectedChoice = scenario.choices.find((choice) => choice.id === answer?.finalChoiceId);
	function choose(choice) {
		onChoose(choice);
		setVideoFailed(false);
		setVideoFinished(false);
		setMode(choice.result === "correct" ? "positive" : "incorrect");
	}
	if (mode === "positive" && selectedChoice) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "video-scenario-positive",
		"aria-live": "polite",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "video-scenario-positive-video",
			children: videoFailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scene-video-fallback",
				role: "status",
				children: "正向結果影片目前無法播放，仍可繼續生活旅程。"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: "/assets/pet-journey/correct-answer.mp4",
				autoPlay: true,
				playsInline: true,
				preload: "metadata",
				"aria-label": "正確處置後的正向結果影片",
				onEnded: () => setVideoFinished(true),
				onError: () => {
					setVideoFailed(true);
					setVideoFinished(true);
				}
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "video-scenario-positive-copy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "做得很好！" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(selectedChoice.explanation, petName) }),
				scenario.id === "illness-vet" && selectedChoice.suggestion ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "illness-health-note",
					children: withPetName(selectedChoice.suggestion, petName).split("\n").map((line, index) => line ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: line }, `${line}-${index}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}, `break-${index}`))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: scenario.id === "arrival-adjustment" ? "你已替牠保留適應新家的空間。接著一起準備第一餐吧。" : scenario.id === "growing-old" ? "提早安排醫療準備與健康觀察，能讓高齡階段的照顧更穩定。" : "及早觀察、記錄並聯絡獸醫，能讓小狗獲得更適當的照顧。" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtherCorrectTips, {
					scenario,
					choice: selectedChoice,
					petName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "primary",
					onClick: onCorrectComplete,
					children: ["繼續 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "video-scenario-activity",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "video-scenario-heading",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "life-stage-label",
					children: lifeStageLabelForScenario(scenario)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: withPetName(scenario.title, petName) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(scenario.description, petName) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "video-scenario-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "video-scenario-visual",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: source,
					autoPlay: true,
					loop: true,
					playsInline: true,
					preload: "metadata",
					"aria-label": scenario.id === "arrival-adjustment" ? "小狗第一天適應新家的影片" : scenario.id === "growing-old" ? "小狗逐漸進入高齡的情境影片" : "柴犬常見健康問題觀察影片",
					onError: () => setVideoFailed(true)
				}), videoFailed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "scene-video-fallback",
					role: "status",
					children: "這段情境影片目前無法播放。"
				})]
			}), mode === "incorrect" && selectedChoice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "video-scenario-retry",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "這個做法可能不太適合" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(selectedChoice.explanation, petName) }),
					selectedChoice.suggestion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "可以這樣調整：" }), withPetName(selectedChoice.suggestion, petName)] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "secondary",
						onClick: () => setMode("question"),
						children: "重新選擇"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "video-scenario-options",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "你會怎麼做？" }), scenario.choices.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => choose(choice),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: withPetName(choice.text, petName) })
				}, choice.id))]
			})]
		})]
	});
}
var dailyBehaviorScenarioIds = [
	"behavior-barking",
	"behavior-chewing",
	"behavior-toileting"
];
var dailyBehaviorVideos = {
	"behavior-barking": "/assets/pet-journey/barking.mp4",
	"behavior-chewing": "/assets/pet-journey/chewing-on-things.mp4",
	"behavior-toileting": "/assets/pet-journey/Urinate-and-defecate-at-will.mp4"
};
function DailyBehaviorActivity({ answers, petName, onChoose, onContinue }) {
	const scenarios = dailyBehaviorScenarioIds.map((id) => lifeScenarios.find((entry) => entry.id === id)).filter((entry) => Boolean(entry));
	const firstUnfinished = scenarios.findIndex((entry) => answers[entry.id]?.finalResult !== "correct");
	const [currentIndex, setCurrentIndex] = (0, import_react.useState)(firstUnfinished === -1 ? scenarios.length - 1 : firstUnfinished);
	const [mode, setMode] = (0, import_react.useState)(firstUnfinished === -1 ? "positive" : "question");
	const [videoFailed, setVideoFailed] = (0, import_react.useState)(false);
	const [, setVideoFinished] = (0, import_react.useState)(false);
	const scenario = scenarios[currentIndex];
	const selectedChoice = scenario && scenario.choices.find((choice) => choice.id === answers[scenario.id]?.finalChoiceId);
	if (!scenario) return null;
	function choose(choice) {
		onChoose(scenario, choice);
		setVideoFailed(false);
		setVideoFinished(false);
		setMode(choice.result === "correct" ? "positive" : "incorrect");
	}
	function retry() {
		setMode("question");
	}
	function moveToNext() {
		if (currentIndex === scenarios.length - 1) {
			onContinue();
			return;
		}
		setCurrentIndex((value) => value + 1);
		setMode("question");
		setVideoFailed(false);
		setVideoFinished(false);
	}
	if (mode === "positive" && selectedChoice) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "daily-behavior-positive",
		"aria-live": "polite",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "daily-behavior-positive-video",
			children: videoFailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scene-video-fallback",
				role: "status",
				children: "正向結果影片目前無法播放，仍可繼續下一段生活互動。"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: "/assets/pet-journey/correct-answer.mp4",
				autoPlay: true,
				playsInline: true,
				preload: "metadata",
				"aria-label": "改善後的正向結果影片",
				onEnded: () => setVideoFinished(true),
				onError: () => {
					setVideoFailed(true);
					setVideoFinished(true);
				}
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "daily-behavior-positive-copy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "做得很好！" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(selectedChoice.explanation, petName) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtherCorrectTips, {
					scenario,
					choice: selectedChoice,
					petName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "改善後，牠能在安全又被理解的環境裡慢慢學習。" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "primary",
					onClick: moveToNext,
					children: ["繼續 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "daily-behavior-activity",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "daily-behavior-head",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "life-stage-label",
						children: lifeStageLabels.daily
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: withPetName(scenario.title, petName) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(scenario.description, petName) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "daily-behavior-video",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: dailyBehaviorVideos[scenario.id] ?? "/assets/pet-journey/chewing-on-things.mp4",
					autoPlay: true,
					loop: true,
					playsInline: true,
					preload: "metadata",
					"aria-label": "小狗日常行為問題情境影片",
					onError: () => setVideoFailed(true)
				}), videoFailed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "scene-video-fallback",
					role: "status",
					children: "這段情境影片目前無法播放。"
				})]
			}),
			mode === "incorrect" && selectedChoice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "daily-behavior-retry",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "這個做法可能不太適合" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(selectedChoice.explanation, petName) }),
					selectedChoice.suggestion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "可以這樣調整：" }), withPetName(selectedChoice.suggestion, petName)] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "secondary",
						onClick: retry,
						children: "重新選擇"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "reflection daily-behavior-choices",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "你會怎麼處理？" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "choice-grid",
					children: scenario.choices.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => choose(choice),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(choice.text, petName) })
					}, choice.id))
				})]
			})
		]
	});
}
function BusyCareActivity({ scenario, answer, petName, members: _members, onMembersChange: _onMembersChange, onChoose, onContinue }) {
	const [mode, setMode] = (0, import_react.useState)(answer?.finalResult === "correct" ? "positive" : "question");
	const [familyFeedback, setFamilyFeedback] = (0, import_react.useState)(null);
	const [videoFailed, setVideoFailed] = (0, import_react.useState)(false);
	const [, setVideoFinished] = (0, import_react.useState)(false);
	const selectedChoice = scenario.choices.find((choice) => choice.id === answer?.finalChoiceId);
	const familyOptions = [{
		id: "dad",
		name: "爸爸",
		label: "近期工作繁忙的爸爸",
		reason: "爸爸近期工作繁忙，可能無法穩定負責餵食、飲水、排泄與陪伴。"
	}, {
		id: "younger-brother",
		name: "年幼的弟弟",
		label: "年幼的弟弟",
		reason: "弟弟年紀太小，還不能獨立照顧小狗，也不適合單獨承擔照顧責任。"
	}];
	function choose(choice) {
		if (choice.id === "family-helper") {
			setFamilyFeedback(null);
			setMode("family");
			return;
		}
		onChoose(choice);
		setVideoFailed(false);
		setVideoFinished(false);
		setMode(choice.result === "correct" ? "positive" : "incorrect");
	}
	if (mode === "positive" && selectedChoice) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "busy-care-positive",
		"aria-live": "polite",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "busy-care-positive-video",
			children: videoFailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scene-video-fallback",
				role: "status",
				children: "正向結果影片目前無法播放，仍可繼續生活旅程。"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: "/assets/pet-journey/correct-answer.mp4",
				autoPlay: true,
				playsInline: true,
				preload: "metadata",
				"aria-label": "安排照顧支援後的正向結果影片",
				onEnded: () => setVideoFinished(true),
				onError: () => {
					setVideoFailed(true);
					setVideoFinished(true);
				}
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "busy-care-positive-copy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "做得很好！" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(selectedChoice.explanation, petName) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtherCorrectTips, {
					scenario,
					choice: selectedChoice,
					petName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
					"事先確認與交接，能讓",
					petName,
					"在你忙碌時仍獲得餵食、飲水、排泄照顧與陪伴。"
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "primary",
					onClick: onContinue,
					children: ["繼續 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "busy-care-activity",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "busy-care-heading",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "life-stage-label",
					children: lifeStageLabels.daily
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "忙碌時的日常照顧" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(scenario.description, petName) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "busy-care-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "busy-care-room",
				"aria-label": "小狗在房間中等待照顧的情境",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "busy-care-room-background",
					src: "/room/空房間.png",
					alt: "居家房間場景"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "busy-care-hungry-dog",
					src: "/assets/pet-journey/柴犬趴著餓肚子.png",
					alt: `${petName}趴在房間裡等待照顧`
				})]
			}), mode === "family" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "busy-care-members",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "先確認家人是否真的能協助" }) }),
					!familyFeedback && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "busy-care-member-list busy-care-family-options",
						children: familyOptions.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFamilyFeedback({
								name: member.name,
								reason: member.reason
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: member.label })
						}, member.id))
					}),
					familyFeedback && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "busy-care-family-feedback",
						role: "alert",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [familyFeedback.name, "目前不適合協助"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(familyFeedback.reason, petName) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "busy-care-member-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "secondary",
							onClick: () => setFamilyFeedback(null),
							children: "重新選擇家庭成員"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "primary",
							onClick: () => {
								setFamilyFeedback(null);
								setMode("question");
							},
							children: ["返回上一層，改選其他照顧方式 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
						})]
					})
				]
			}) : mode === "incorrect" && selectedChoice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "busy-care-feedback incorrect",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "這個做法可能不太適合" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(selectedChoice.explanation, petName) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "可以這樣調整：" }), selectedChoice.suggestion ? withPetName(selectedChoice.suggestion, petName) : ""] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "secondary",
						onClick: () => setMode("question"),
						children: "重新選擇"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "busy-care-options",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "你會怎麼安排？" }), scenario.choices.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => choose(choice),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: withPetName(choice.text, petName) })
				}, choice.id))]
			})]
		})]
	});
}
function ArrivalMealActivity({ activity, petName, onChange, onAddExpense, onContinue }) {
	const complete = activity.arrivalMealFoodReady && activity.arrivalMealWaterReady;
	const hasRecordedMeal = (0, import_react.useRef)(false);
	const [foodWarning, setFoodWarning] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!complete || hasRecordedMeal.current) return;
		hasRecordedMeal.current = true;
		onAddExpense("monthly-food-main");
	}, [complete, onAddExpense]);
	function prepareFood() {
		if (activity.arrivalMealFoodReady) return;
		setFoodWarning(null);
		onChange({ arrivalMealFoodReady: true });
	}
	function prepareWater() {
		if (activity.arrivalMealWaterReady) return;
		setFoodWarning(null);
		onChange({ arrivalMealWaterReady: true });
	}
	function warnUnsafeFood(kind) {
		setFoodWarning(kind === "macadamia" ? {
			title: "這個不能給小狗吃",
			text: "常見的人類食物例如洋蔥、大蒜、巧克力、葡萄、堅果類（例如：夏威夷豆）、口香糖（含木糖醇）等，對犬隻而言可能會造成健康危害。另外，太鹹、太油或含有咖啡因的食物，也不適合犬隻食用。"
		} : {
			title: "吃剩的骨頭不適合當作正餐",
			text: "許多民眾會將吃過的骨頭、便當或剩菜剩飯當作犬隻的食物來源之一，但除了必須注意犬隻的營養均衡與日食物安全適當之外，啃食骨頭或剩食中較堅硬的殘渣，可能造成犬隻口腔或消化道危害，建議避免餵食此類食物。"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "arrival-meal-activity",
		"aria-label": `為${petName}準備第一餐`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "arrival-meal-heading",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "life-stage-label",
						children: lifeStageLabels.daily
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
						"幫",
						petName,
						"準備第一餐"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						petName,
						"剛到新家，還有些不安。先幫",
						petName,
						"準備合適的主食與乾淨飲水，讓牠慢慢安心下來。"
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "arrival-meal-supplies",
				"aria-label": "晚餐用品",
				children: [
					!activity.arrivalMealFoodReady && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "arrival-meal-supply-food-button",
						onClick: prepareFood,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "arrival-meal-supply-food",
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: foodWarning?.title === "這個不能給小狗吃" ? "arrival-meal-unsafe warning" : "arrival-meal-unsafe",
						onClick: () => warnUnsafeFood("macadamia"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/assets/pet-journey/夏威夷豆.png",
							alt: "夏威夷豆"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "夏威夷豆" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: foodWarning?.title === "吃剩的骨頭不適合當作正餐" ? "arrival-meal-unsafe warning" : "arrival-meal-unsafe",
						onClick: () => warnUnsafeFood("bones"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/assets/pet-journey/吃剩的骨頭.png",
							alt: "吃剩的骨頭"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "吃剩的骨頭" })]
					})
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
					foodWarning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "arrival-meal-warning",
						role: "alert",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: foodWarning.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: foodWarning.text })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "arrival-meal-dog",
						src: complete ? "/assets/pet-journey/shiba-dog.png" : "/assets/pet-journey/柴犬不開心.png",
						alt: complete ? `${petName}開心地坐在房間裡` : `${petName}還在等待晚餐與飲水`
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
var walkingPrepItems = [
	{
		id: "leash",
		label: "牽繩／胸背帶",
		image: "/car/牽繩.png"
	},
	{
		id: "bag",
		label: "撿便袋",
		image: "/walking-the-dog/poop-bag.png"
	},
	{
		id: "water",
		label: "水",
		image: "/assets/pet-journey/waterbottle.png"
	}
];
var walkingScenes = [
	{
		title: "家門口往人行道",
		image: "/walking-the-dog/home-to-sidewalk.jpg",
		poopEvent: false
	},
	{
		title: "公園",
		image: "/walking-the-dog/park.png",
		poopEvent: false
	},
	{
		title: "公園 2",
		image: "/walking-the-dog/park-2.png",
		poopEvent: true
	},
	{
		title: "人行道往家門口",
		image: "/walking-the-dog/sidewalk-to-home.jpg",
		poopEvent: false
	}
];
var walkingPreloadImages = [
	...walkingScenes.map((scene) => scene.image),
	...walkingPrepItems.map((item) => item.image),
	"/walking-the-dog/walking-person-shiba.png",
	"/walking-the-dog/walking-person-shiba-poop.png",
	"/walking-the-dog/poop.png"
];
function WalkingActivity({ activity, petName, onChange, onContinue }) {
	const [started, setStarted] = (0, import_react.useState)(activity.walkingMinutes > 0 || activity.walkingComplete);
	const [position, setPosition] = (0, import_react.useState)(0);
	const [moving, setMoving] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [completedSceneIndex, setCompletedSceneIndex] = (0, import_react.useState)(null);
	const completingSceneRef = (0, import_react.useRef)(null);
	const sceneIndex = Math.min(activity.walkingSceneIndex, walkingScenes.length - 1);
	const scene = walkingScenes[sceneIndex];
	const prepared = activity.walkingPreparedItems;
	const allPrepared = walkingPrepItems.every((item) => prepared.includes(item.id));
	const needsCleanup = started && scene.poopEvent && position >= 50 && !activity.walkingPoopCleaned;
	const progressMinutes = Math.min(20, activity.walkingMinutes);
	(0, import_react.useEffect)(() => {
		walkingPreloadImages.forEach((src) => {
			const image = new Image();
			image.src = src;
		});
	}, []);
	(0, import_react.useEffect)(() => {
		setPosition(0);
		setMoving(false);
		setCompletedSceneIndex(null);
		completingSceneRef.current = null;
	}, [activity.walkingSceneIndex]);
	(0, import_react.useEffect)(() => {
		if (!started || activity.walkingComplete || !moving || needsCleanup) return;
		const timer = window.setInterval(() => {
			setPosition((current) => {
				if (scene.poopEvent && current >= 50 && !activity.walkingPoopCleaned) {
					setMoving(false);
					return 50;
				}
				const next = Math.min(100, current + .72);
				if (next >= 100 && current < 100 && completingSceneRef.current !== sceneIndex) {
					completingSceneRef.current = sceneIndex;
					setCompletedSceneIndex(sceneIndex);
				}
				return next;
			});
		}, 38);
		return () => window.clearInterval(timer);
	}, [
		activity.walkingComplete,
		activity.walkingPoopCleaned,
		moving,
		needsCleanup,
		scene.poopEvent,
		sceneIndex,
		started
	]);
	(0, import_react.useEffect)(() => {
		if (!started || activity.walkingComplete || completedSceneIndex === null) return;
		if (completedSceneIndex !== sceneIndex) return;
		const complete = completedSceneIndex >= walkingScenes.length - 1;
		onChange({
			walkingMinutes: Math.min(20, activity.walkingMinutes + 5),
			walkingSceneIndex: complete ? completedSceneIndex : completedSceneIndex + 1,
			walkingComplete: complete
		});
		setMessage(complete ? "散步時間達到 20 分鐘！" : `完成「${walkingScenes[completedSceneIndex].title}」，散步時間 +5 分鐘。`);
	}, [
		activity.walkingComplete,
		activity.walkingMinutes,
		completedSceneIndex,
		onChange,
		sceneIndex,
		started
	]);
	function prepare(id) {
		if (prepared.includes(id)) return;
		onChange({ walkingPreparedItems: [...prepared, id] });
		setMessage("");
	}
	function startWalk() {
		if (!prepared.includes("leash")) {
			setMessage("外出活動需要適當防護措施，牽繩或胸背帶能避免走失、驚嚇衝出，也能保護牠和其他人。");
			return;
		}
		if (!allPrepared) {
			setMessage("出門前也要準備撿便袋和水，讓散步更安心。");
			return;
		}
		setStarted(true);
		setMessage("把滑鼠移到畫面右側，陪牠慢慢往前走。");
	}
	function handleSceneMove(event) {
		if (!started || activity.walkingComplete) return;
		if (needsCleanup) {
			setMessage("先把排泄物清理乾淨，再繼續散步。");
			setMoving(false);
			return;
		}
		const rect = event.currentTarget.getBoundingClientRect();
		setMoving((event.clientX - rect.left) / rect.width > .54);
	}
	function cleanupPoop() {
		onChange({ walkingPoopCleaned: true });
		setMessage("已清理完成，散步時記得隨手清理排泄物。");
	}
	if (activity.walkingComplete) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "walking-activity walking-complete",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "walking-complete-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "今天的散步完成了！" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"你陪",
					petName,
					"完成了至少 20 分鐘的活動，也記得清理排泄物。"
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "規律散步能讓狗狗有機會探索環境、消耗體力，也有助於維持生理與心理健康。" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "primary",
					onClick: onContinue,
					children: ["繼續生活旅程 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "walking-activity",
		"aria-label": "今天也要出門散步",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "walking-head",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "life-stage-label",
				children: lifeStageLabels.daily
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "今天也要出門散步" })] })
		}), !started ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "walking-prep",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "walking-prep-list",
				children: walkingPrepItems.map((item) => {
					const done = prepared.includes(item.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: done ? "prepared" : "",
						"aria-pressed": done,
						onClick: () => prepare(item.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.image,
							alt: item.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label })]
					}, item.id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "walking-prep-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "出門準備" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "三項都完成後才可以開始散步。外出時的防護、補水與清理排泄，都是日常照顧的一部分。" }),
					message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "walking-message",
						role: "alert",
						children: message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "primary",
						disabled: !allPrepared,
						onClick: startWalk,
						children: ["開始散步 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
					})
				]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "walking-game",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "walking-progress",
					"aria-label": `散步進度 ${progressMinutes} / 20 分鐘`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "散步進度" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${progressMinutes / 20 * 100}%` } }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [progressMinutes, " / 20 分鐘"] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `walking-scene ${moving ? "is-moving" : ""}`,
					onMouseMove: handleSceneMove,
					onMouseLeave: () => setMoving(false),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "walking-bg",
							src: scene.image,
							alt: scene.title
						}),
						needsCleanup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "walking-scene-alert",
							role: "alert",
							children: "散步中發現排泄物，請點擊清理後再繼續前進。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "walking-character",
							style: { left: `${Math.min(78, 5 + position * .73)}%` },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: needsCleanup ? "/walking-the-dog/walking-person-shiba-poop.png" : "/walking-the-dog/walking-person-shiba.png",
								alt: `正在和${petName}散步的人物與小狗`
							}), needsCleanup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "walking-poop",
								onClick: cleanupPoop,
								"aria-label": "清理排泄物",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/walking-the-dog/poop.png",
									alt: ""
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "walking-forward-zone",
							"aria-hidden": "true",
							children: "滑鼠移到右側前進"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "primary walking-mobile-forward",
					onPointerDown: () => setMoving(true),
					onPointerUp: () => setMoving(false),
					onPointerCancel: () => setMoving(false),
					onPointerLeave: () => setMoving(false),
					disabled: needsCleanup,
					children: "按住往前走"
				})
			]
		})]
	});
}
function LifeJourney({ index, petName, answers, activity, completedIds, expenses, backupNames, members, roomReady, onIndex, onChoose, onMembersChange, onActivityChange, onCompleteItem, onAddExpense, onStageChange, onBack, onComplete }) {
	const item = journeyItems[index];
	const scenario = item.scenarioId ? lifeScenarios.find((entry) => entry.id === item.scenarioId) : void 0;
	const answer = scenario ? answers[scenario.id] : void 0;
	const isDailyBehaviorActivity = item.id === "behavior";
	const isWalkingActivity = item.id === "walking";
	const isBusyCareActivity = item.id === "busy-care" && scenario?.id === "busy-daily-care";
	const isVideoFeedbackScenario = scenario?.id === "arrival-adjustment" || scenario?.id === "illness-vet" || scenario?.id === "growing-old";
	const [arrivalMealOpen, setArrivalMealOpen] = (0, import_react.useState)(false);
	const showArrivalMeal = scenario?.id === "arrival-adjustment" && answer?.finalResult === "correct" && arrivalMealOpen;
	const [feedbackOpen, setFeedbackOpen] = (0, import_react.useState)(Boolean(answer));
	const [timePassOpen, setTimePassOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setTimePassOpen(false);
		setArrivalMealOpen(false);
	}, [index]);
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
			isDailyBehaviorActivity ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyBehaviorActivity, {
				answers,
				petName,
				onChoose,
				onContinue: continueJourney
			}) : isWalkingActivity ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalkingActivity, {
				activity,
				petName,
				onChange: onActivityChange,
				onContinue: continueJourney
			}) : isBusyCareActivity && scenario ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusyCareActivity, {
				scenario,
				answer,
				petName,
				members,
				onMembersChange,
				onChoose: choose,
				onContinue: continueJourney
			}) : isVideoFeedbackScenario && scenario && !showArrivalMeal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoScenarioActivity, {
				scenario,
				answer,
				petName,
				onChoose: choose,
				onCorrectComplete: () => {
					if (scenario.id === "arrival-adjustment") setArrivalMealOpen(true);
					else continueJourney();
				}
			}) : scenario && (showArrivalMeal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrivalMealActivity, {
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
		end: 0
	},
	{
		label: "日常生活",
		start: 1,
		end: 2
	},
	{
		label: "生活變化",
		start: 3,
		end: 4
	}
];
function statusAt(index, current, reached) {
	if (index === current) return "current";
	if (index <= reached) return "completed";
	return "locked";
}
function StageRail({ step, furthestStep, selectionPage, selectionReached, preparationTask, preparationReached, lifePhase, journeyIndex, journeyCompleted, onGoTo, onSelectionPage, onPreparationTask, onLifeStage }) {
	const currentMain = step === 1 ? 0 : step === 2 ? 1 : step <= 6 ? 2 : 3;
	const currentLifeStage = lifePhase === "arrival-video" ? 0 : lifeStageRanges.findIndex((range) => journeyIndex >= range.start && journeyIndex <= range.end);
	const mainTargets = [
		1,
		2,
		Math.max(3, Math.min(6, step)),
		7
	];
	const mainUnlockSteps = [
		1,
		2,
		3,
		7
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
			children: ["布置生活空間", "出發前準備"].map((label, index) => ({
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
			id: "assessment",
			number: "04",
			label: "照顧準備總覽",
			status: mainStatus(3),
			onClick: () => onGoTo(7)
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
		"aria-label": "毛日子新手村封面",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "welcome-hero-copy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
					"毛日子",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"新手村"
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "welcome-subtitle",
					children: "在真正飼養前，先走過一次與毛小孩的完整旅程"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary large welcome-start",
					onClick: onStart,
					children: ["開始生活練習 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "welcome-village",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "welcome-cloud welcome-cloud--left" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "welcome-cloud welcome-cloud--center" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "welcome-cloud welcome-cloud--right" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "welcome-houses",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "welcome-house welcome-house--a" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "welcome-house welcome-house--b" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "welcome-house welcome-house--c" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "welcome-house welcome-house--d" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "welcome-house welcome-house--e" })
					]
				})
			]
		})]
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
						item.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "partner-card-image",
							src: item.image,
							alt: ""
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }),
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
							item.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "partner-card-image",
								src: item.image,
								alt: ""
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }),
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
					children: [selectedBreed?.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "selection-note-image",
						src: selectedBreed.image,
						alt: ""
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
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
var preparedRoomItemNotes = {
	bed: {
		label: "睡墊",
		note: "提供固定、安靜的休息位置。"
	},
	toy: {
		label: "玩具",
		note: "幫助小狗消耗精力與建立正向互動。"
	},
	"water-bowl": {
		label: "水碗",
		note: "每天確認有乾淨、足量的飲水。"
	},
	"food-bowl": {
		label: "狗碗",
		note: "固定飲食器具，幫助建立規律餵食。"
	},
	toilet: {
		label: "尿墊",
		note: "協助建立如廁位置，減少環境壓力。"
	},
	cleaner: {
		label: "清潔用品",
		note: "維持居家清潔，降低病原與異味。"
	},
	food: {
		label: "飼料",
		note: "選擇符合年齡、體型與健康需求的主食。"
	}
};
var preparedTrunkItemNotes = {
	id: {
		label: "身分證",
		note: "辦理認養與核對身分時使用。"
	},
	documents: {
		label: "領養文件",
		note: "確認認養流程與後續照顧責任。"
	},
	carrier: {
		label: "運輸籠",
		note: "讓小狗在移動途中有安全固定的空間。"
	},
	"pee-pad": {
		label: "尿墊",
		note: "接回途中可降低排泄與清潔壓力。"
	},
	"water-kit": {
		label: "水碗",
		note: "必要時補充飲水，避免長時間缺水。"
	},
	leash: {
		label: "牽繩",
		note: "下車或移動時維持安全防護。"
	},
	cleaner: {
		label: "清潔用品",
		note: "處理接回途中可能發生的髒污。"
	}
};
function RoomPreparation({ selectedItems, securedHazards, petName, onPrepare, onToggleHazard, onSavePetName, onBack, onNext }) {
	const [nameDraft, setNameDraft] = (0, import_react.useState)(petName);
	const [nameError, setNameError] = (0, import_react.useState)("");
	const [nameEditing, setNameEditing] = (0, import_react.useState)(!petName);
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
	(0, import_react.useEffect)(() => {
		setNameDraft(petName);
		if (petName) setNameEditing(false);
	}, [petName]);
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
		setNameEditing(false);
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
			!petName.trim() ? "請先點選門牌，輸入小狗的名字" : "",
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
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "room-supply-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: itemsDone === roomItems.length ? "已準備的物品" : "用品準備箱" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: itemsDone === roomItems.length ? "用品已準備完成" : `${roomItems.length - itemsDone} 件可加入` })]
						}),
						remainingRoomItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
						}),
						remainingRoomItems.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "prepared-item-list",
							"aria-label": "已準備的房間物品",
							children: roomItems.map((item) => {
								const note = preparedRoomItemNotes[item.id] ?? {
									label: item.label,
									note: item.purpose
								};
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: note.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: note.note })] }, item.id);
							})
						})
					]
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `pet-doorplate ${nameEditing ? "editing" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/room/門牌.png",
									alt: "小狗名字門牌"
								}), nameEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pet-doorplate-editor",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "pet-name",
											className: "sr-only",
											children: "小狗名字"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "pet-name",
											value: nameDraft,
											maxLength: 12,
											placeholder: "請輸入小狗的名字",
											onChange: (event) => setNameDraft(event.target.value),
											onKeyDown: (event) => {
												if (event.key === "Enter") saveName();
											},
											"aria-invalid": Boolean(nameError),
											"aria-describedby": "pet-name-error",
											autoFocus: true
										}),
										nameError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											id: "pet-name-error",
											className: "field-error",
											role: "alert",
											children: nameError
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: petName ? "named" : "placeholder",
									onClick: () => {
										setNameEditing(true);
										setNameError("");
									},
									children: petName || "請輸入小狗的名字"
								})]
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
							children: ["房間完成，準備出發 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
						})
					]
				})]
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
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "departure-supply-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: complete ? "已準備的物品" : "準備物品" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: complete ? "準備完成" : `${remainingItems.length} 件可準備` })]
						}),
						!complete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
						}),
						complete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "prepared-item-list departure-prepared-list",
							"aria-label": "已準備的後車廂物品",
							children: departureTrunkItems.map((item) => {
								const note = preparedTrunkItemNotes[item.id] ?? {
									label: item.label,
									note: item.description
								};
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: note.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: note.note })] }, item.id);
							})
						})
					]
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
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
function PdfFab() {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	if (!mounted) return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "primary pdf-fab",
		onClick: () => window.print(),
		children: "輸出 PDF"
	}), document.body);
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
function ProfileSupplementForm({ profile, onChange, onBack, onReset }) {
	const update = (key, value) => {
		onChange({
			...profile,
			[key]: value
		});
	};
	const clamp = (raw, max) => raw === "" ? "" : String(Math.min(max, Math.max(0, Number(raw.replace(/\D/g, "")) || 0)));
	const toggle = (key, value) => update(key, profile[key].includes(value) ? profile[key].filter((item) => item !== value) : [...profile[key], value]);
	const chooseHousemate = (value) => {
		if (value === "無") return onChange({
			...profile,
			housemateTypes: ["無"],
			otherHousemate: "",
			hasHousemates: false,
			housematesConsent: null
		});
		const existing = profile.housemateTypes.filter((item) => item !== "無");
		const housemateTypes = existing.includes(value) ? existing.filter((item) => item !== value) : [...existing, value];
		onChange({
			...profile,
			housemateTypes,
			hasHousemates: housemateTypes.length ? true : null
		});
	};
	const consentOptions = [
		{
			value: "agree",
			label: "已知情並同意",
			selected: profile.housematesConsent === true,
			consent: true
		},
		{
			value: "pending",
			label: "尚未確認",
			selected: profile.housematesConsent === null,
			consent: null
		},
		{
			value: "disagree",
			label: "不同意",
			selected: profile.housematesConsent === false,
			consent: false
		}
	];
	const setCount = (key, raw) => update(key, clamp(raw, 99));
	function handleHomeSpaceImage(file) {
		if (!file) return;
		if (!file.type.startsWith("image/")) return;
		const reader = new FileReader();
		reader.onload = () => onChange({
			...profile,
			homeSpaceImage: String(reader.result ?? ""),
			homeSpaceImageName: file.name
		});
		reader.readAsDataURL(file);
	}
	const experienceInputs = (prefix) => {
		const types = prefix === "past" ? profile.pastPetTypes : profile.currentPetTypes;
		return [
			"狗",
			"貓",
			"其他"
		].map((type) => {
			const enabled = types.includes(type);
			const countKey = type === "狗" ? `${prefix}DogCount` : `${prefix}CatCount`;
			const otherKey = `${prefix}Other`;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: enabled,
					onChange: () => toggle(prefix === "past" ? "pastPetTypes" : "currentPetTypes", type)
				}),
				type,
				type === "其他" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					disabled: !enabled,
					value: profile[otherKey],
					onChange: (event) => update(otherKey, event.target.value),
					placeholder: "請說明"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "number",
					min: "0",
					disabled: !enabled,
					value: profile[countKey],
					onChange: (event) => setCount(countKey, event.target.value),
					placeholder: "隻"
				})
			] }, type);
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "content-wrap profile-supplement",
		"aria-labelledby": "profile-supplement-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "profile-wizard-head",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				id: "profile-supplement-title",
				children: "補充真實生活條件"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "這些資料可協助收容所、寵物店家或照護人員了解你的居住環境、同住者狀況與飼養經驗，作為後續溝通與照顧建議的參考。" })] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "profile-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "每天的時間" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["每天可投入照顧時間", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
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
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "居住空間" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "housing-options",
						children: ["自有住宅", "租屋"].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionButton, {
							label: value,
							selected: profile.housing === value,
							onClick: () => update("housing", value)
						}, value))
					}),
					profile.housing === "租屋" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "landlord-options",
						children: ["房東已同意", "尚未取得同意"].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionButton, {
							label: value,
							selected: profile.landlordConsent === value,
							onClick: () => update("landlordConsent", value)
						}, value))
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "同居家人" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "supplement-choice-grid",
						children: [
							"無",
							"幼童",
							"長者",
							"孕婦",
							"其他"
						].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: `supplement-choice ${profile.housemateTypes.includes(value) ? "selected" : ""}`,
							"aria-pressed": profile.housemateTypes.includes(value),
							onClick: () => chooseHousemate(value),
							children: [profile.housemateTypes.includes(value) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓" }), value]
						}, value))
					}),
					profile.housemateTypes.includes("其他") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "supplement-inline-input",
						children: ["其他同居家人", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "請說明",
							value: profile.otherHousemate,
							onChange: (event) => update("otherHousemate", event.target.value)
						})]
					}),
					profile.hasHousemates && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "supplement-followup",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "同住者是否知情並同意飼養？" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "supplement-choice-grid compact",
							children: consentOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: `supplement-choice ${option.selected ? "selected" : ""}`,
								"aria-pressed": option.selected,
								onClick: () => update("housematesConsent", option.consent),
								children: option.label
							}, option.value))
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "寵物預計活動空間" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "supplement-choice-grid",
						children: [
							"戶外空間",
							"室內客廳",
							"房間",
							"其他"
						].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: `supplement-choice ${profile.activitySpace === value ? "selected" : ""}`,
							"aria-pressed": profile.activitySpace === value,
							onClick: () => update("activitySpace", value),
							children: [profile.activitySpace === value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓" }), value]
						}, value))
					}),
					profile.activitySpace === "其他" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "supplement-inline-input",
						children: ["其他活動空間", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "請說明",
							value: profile.otherActivitySpace,
							onChange: (event) => update("otherActivitySpace", event.target.value)
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "居家空間" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "home-space-upload",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/png,image/jpeg,image/webp",
							onChange: (event) => handleHomeSpaceImage(event.target.files?.[0])
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "共同為毛孩的安全把關" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "可上傳未來寵物活動空間照片，協助評估環境安全與照顧安排。" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: profile.homeSpaceImageName || "選擇 PNG、JPG、JPEG 或 WebP 圖片" })
					] }), profile.homeSpaceImage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: profile.homeSpaceImage,
						alt: "已上傳的居家空間照片預覽"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: profile.homeSpaceImageName })] })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "飼養經驗" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `supplement-choice shiba-experience ${profile.noShibaExperience ? "selected" : ""}`,
						"aria-pressed": profile.noShibaExperience,
						onClick: () => update("noShibaExperience", !profile.noShibaExperience),
						children: "我沒有養過柴犬"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pet-experience-block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "曾經飼養：" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pet-experience-row",
								children: experienceInputs("past")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "目前家中有寵物：" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pet-experience-row",
								children: experienceInputs("current")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "experience-note",
								children: ["其他飼養經驗分享：", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									placeholder: "請分享你的照顧經驗",
									value: profile.experienceNote,
									onChange: (event) => update("experienceNote", event.target.value)
								})]
							})
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: ["飼養原因 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "可複選" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "supplement-choice-grid reasons",
						children: [
							"陪伴與情緒支持",
							"喜愛動物",
							"單純想養",
							"看家守衛",
							"他人推薦",
							"其他"
						].map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: `supplement-choice ${profile.reasons.includes(reason) ? "selected" : ""}`,
							"aria-pressed": profile.reasons.includes(reason),
							onClick: () => toggle("reasons", reason),
							children: [profile.reasons.includes(reason) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓" }), reason]
						}, reason))
					}),
					profile.reasons.includes("其他") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "supplement-inline-input",
						children: ["其他飼養原因", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "請說明",
							value: profile.reasonOther,
							onChange: (event) => update("reasonOther", event.target.value)
						})]
					})
				] })
			]
		})]
	});
}
function AssessmentReport({ petName, breed, profile, expenses, emergencyReserve, roomReady, hazardsReady, members, trunkSelected, trunkPassed, answers, lifeActivity, onBack, onReset }) {
	const [committed, setCommitted] = (0, import_react.useState)(false);
	const recurring = expenses.filter((item) => item.recurring).reduce((sum, item) => sum + item.amount, 0);
	expenses.filter((item) => !item.recurring && item.category === "用品").reduce((sum, item) => sum + item.amount, 0);
	expenses.filter((item) => item.category === "醫療" && !item.recurring).reduce((sum, item) => sum + item.amount, 0);
	expenses.filter((item) => item.category === "照顧服務").reduce((sum, item) => sum + item.amount, 0);
	expenses.filter((item) => item.category === "高齡用品").reduce((sum, item) => sum + item.amount, 0);
	const total = expenses.reduce((sum, item) => sum + item.amount, 0);
	const emergencyUsed = expenses.filter((item) => item.fromEmergency).reduce((sum, item) => sum + item.amount, 0);
	const correctFirst = Object.values(answers).filter((item) => item.firstResult === "correct").length;
	const corrected = Object.values(answers).filter((item) => item.firstResult !== "correct" && item.finalResult === "correct");
	Object.values(answers).filter((item) => item.firstResult === "correct").map((item) => lifeScenarios.find((scenario) => scenario.id === item.scenarioId)?.topic).filter(Boolean);
	corrected.map((item) => lifeScenarios.find((scenario) => scenario.id === item.scenarioId)?.topic).filter(Boolean);
	const needsLearning = Object.values(answers).filter((item) => item.firstResult === "incorrect" && item.finalResult !== "correct").map((item) => lifeScenarios.find((scenario) => scenario.id === item.scenarioId)?.topic).filter(Boolean);
	const practiceItems = [{
		label: "已完成到家第一餐",
		complete: lifeActivity.arrivalMealFoodReady && lifeActivity.arrivalMealWaterReady
	}];
	const practiceComplete = practiceItems.filter((item) => item.complete).length;
	members.filter((member) => !member.isPlayer && member.name.trim()).map((member) => member.name);
	const requiredRoom = roomItems.filter((item) => item.required);
	const roomCompletion = Math.round(roomReady.filter((id) => requiredRoom.some((item) => item.id === id)).length / requiredRoom.length * 100);
	const preparationStrong = roomCompletion === 100 && hazardsReady.length === hazards.length && trunkPassed;
	const activitySpace = profile.activitySpace === "其他" ? profile.otherActivitySpace || "其他（待補充）" : profile.activitySpace || "待補充";
	const housemateStatus = profile.housemateTypes.includes("無") ? "無" : profile.housemateTypes.length ? [...profile.housemateTypes.filter((item) => item !== "其他"), profile.housemateTypes.includes("其他") ? profile.otherHousemate || "其他（待補充）" : ""].filter(Boolean).join("、") : "待補充";
	profile.noShibaExperience || profile.pastPetTypes.length || profile.currentPetTypes.length || profile.experienceNote;
	const reasonStatus = profile.reasons.length ? profile.reasons.map((item) => item === "其他" ? profile.reasonOther || "其他（待補充）" : item).join("、") : "待補充";
	[
		preparationStrong,
		correctFirst >= 5,
		practiceComplete === practiceItems.length,
		profile.activitySpace !== "",
		profile.reasons.length > 0,
		profile.housing !== "租屋" || profile.landlordConsent === "房東已同意",
		profile.hasHousemates !== true || profile.housematesConsent === true
	].filter(Boolean).length;
	[
		roomCompletion === 100 && "必要用品與生活空間已完成",
		hazardsReady.length === hazards.length && "居家危險物已完成收納與防護",
		trunkPassed && "接送行李、文件與安全運輸已通過檢查",
		correctFirst >= 5 && `${correctFirst} 個情境第一次就掌握照顧方向`,
		practiceComplete === practiceItems.length && "目前的生活練習與飲水步驟皆已完成",
		profile.activitySpace && "已規劃寵物的主要活動空間",
		profile.reasons.length > 0 && "已整理飼養原因"
	].filter(Boolean);
	const confirm = [
		roomCompletion < 100 && `必要用品完成度 ${roomCompletion}%`,
		hazardsReady.length < hazards.length && "仍有居家危險物需要防護",
		!trunkPassed && "接寵物後車廂尚未通過檢查",
		!profile.activitySpace && "尚未填寫寵物預計活動空間",
		!profile.reasons.length && "尚未填寫飼養原因",
		...needsLearning.slice(0, 5).map((item) => `情境需要再確認：${item}`)
	].filter(Boolean);
	[profile.hasHousemates && profile.housematesConsent !== true && "所有同住者是否知情並同意飼養", profile.housing === "租屋" && profile.landlordConsent !== "房東已同意" && "租屋規定與房東書面同意"].filter(Boolean);
	[...confirm.slice(0, 5)];
	const selectedBreed = breeds.find((item) => item.id === breed);
	const checklistGroups = [
		{
			title: "每日照顧",
			items: [
				"固定餵食",
				"提供乾淨飲水",
				"觀察精神、食慾與排泄",
				"安排陪伴與活動",
				"外出散步或合適活動",
				"清理排泄物"
			]
		},
		{
			title: "家中環境",
			items: [
				"睡墊",
				"水碗與狗碗",
				"尿墊或如廁區",
				"清潔用品",
				"危險物品收好",
				"安靜休息空間"
			]
		},
		{
			title: "外出與接回",
			items: [
				"身分證",
				"領養文件",
				"運輸籠",
				"尿墊",
				"牽繩",
				"飲水與清潔用品"
			]
		}
	];
	const handlingRows = [
		["忙碌或離家", "安排家人、朋友或合適照護者協助"],
		["食慾、精神或排泄異常", "記錄並聯絡獸醫"],
		["行為困擾", "調整環境、提供活動，必要時尋求專業協助"],
		["生活改變", "重新安排照顧時間與支援"],
		["高齡階段", "提早準備醫療與長期照顧資源"]
	];
	const consentText = profile.hasHousemates === true ? profile.housematesConsent === true ? "已知情並同意" : profile.housematesConsent === false ? "不同意" : "尚未確認" : "";
	const pastPets = [
		profile.pastPetTypes.includes("狗") && `狗${profile.pastDogCount ? ` ${profile.pastDogCount} 隻` : ""}`,
		profile.pastPetTypes.includes("貓") && `貓${profile.pastCatCount ? ` ${profile.pastCatCount} 隻` : ""}`,
		profile.pastPetTypes.includes("其他") && (profile.pastOther || "其他")
	].filter(Boolean).join("、");
	const currentPets = [
		profile.currentPetTypes.includes("狗") && `狗${profile.currentDogCount ? ` ${profile.currentDogCount} 隻` : ""}`,
		profile.currentPetTypes.includes("貓") && `貓${profile.currentCatCount ? ` ${profile.currentCatCount} 隻` : ""}`,
		profile.currentPetTypes.includes("其他") && (profile.currentOther || "其他")
	].filter(Boolean).join("、");
	const printProfileSections = [
		{
			title: "時間與居住",
			rows: [
				profile.hoursAway !== "" && ["每天離家時間", `每日 ${profile.hoursAway} 小時`],
				profile.careHours !== "" && ["每天可投入照顧時間", `每日 ${profile.careHours} 小時`],
				profile.housing && ["居住空間", profile.housing],
				profile.housing === "租屋" && profile.landlordConsent && ["房東狀態", profile.landlordConsent]
			].filter(Boolean)
		},
		{
			title: "同住與活動空間",
			rows: [
				housemateStatus !== "待補充" && ["同居家人", housemateStatus],
				consentText && ["同住者同意", consentText],
				activitySpace !== "待補充" && ["寵物預計活動空間", activitySpace]
			].filter(Boolean)
		},
		{
			title: "飼養經驗與原因",
			rows: [
				profile.noShibaExperience && ["柴犬經驗", "我沒有養過柴犬"],
				pastPets && ["曾經飼養", pastPets],
				currentPets && ["目前家中有寵物", currentPets],
				profile.experienceNote && ["其他飼養經驗分享", profile.experienceNote],
				reasonStatus !== "待補充" && ["飼養原因", reasonStatus]
			].filter(Boolean)
		}
	].map((section) => ({
		...section,
		rows: section.rows.slice(0, 6)
	})).filter((section) => section.rows.length > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PdfFab, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap summary-page assessment-report compact-assessment",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "care-a4-sheet",
				"aria-label": "毛日子照顧準備總覽 A4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "care-a4-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "毛日子新手村" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "照顧準備總覽" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "把喜歡變成每天做得到的照顧" })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "care-breed-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: selectedBreed?.label ?? (petName || "小狗") }), selectedBreed?.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: selectedBreed.image,
								alt: selectedBreed.label
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "care-a4-checklists",
						"aria-labelledby": "care-a4-checklist-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "care-a4-checklist-title",
							children: "Checklist"
						}), checklistGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "care-a4-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: group.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "□"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item })] }, item)) })]
						}, group.title))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "care-a4-table-section",
						"aria-labelledby": "care-a4-table-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "care-a4-table-title",
							children: "需要特別處理的狀況"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "care-a4-table",
							children: handlingRows.map(([situation, advice]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: situation }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: advice })] }, situation))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "care-a4-money",
						"aria-label": "費用速記",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "模擬累積" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["NT$ ", money.format(total)] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "每月固定" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["NT$ ", money.format(recurring)] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "緊急預備金" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["NT$ ", money.format(Math.max(0, emergencyReserve - emergencyUsed))] })] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "care-a4-commitment",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: committed ? "☑" : "□"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "我已閱讀以上提醒，並承諾會善盡照顧責任，持續提供合適的飲食、乾淨飲水、安全環境、日常陪伴與必要醫療，好好照顧我的寵物。" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "care-commitment overview-commitment",
				"aria-labelledby": "overview-care-commitment-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "overview-care-commitment-title",
					children: "照顧承諾"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: committed,
					onChange: (event) => setCommitted(event.target.checked)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "我已閱讀以上提醒，並承諾會善盡照顧責任，持續提供合適的飲食、乾淨飲水、安全環境、日常陪伴與必要醫療，好好照顧我的寵物。" })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "care-print-profile",
				"aria-label": "使用者填寫的個人資料",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "care-a4-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "個人資料" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "真實生活條件" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "僅列出你已填寫或勾選的內容" })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: petName || "小狗" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: selectedBreed?.label ?? "柴犬" })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "print-profile-grid",
						children: printProfileSections.length > 0 ? printProfileSections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: section.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", { children: section.rows.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: value })] }, label)) })] }, section.title)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "print-empty-note",
							children: "目前尚未補充真實生活條件。"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "print-home-space-photo",
						"aria-label": "居家空間照片",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "居家空間照片" }), profile.homeSpaceImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: profile.homeSpaceImage,
							alt: "使用者上傳的居家空間照片"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: profile.homeSpaceImageName || "已上傳居家空間照片" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "尚未上傳居家空間照片" })]
					})
				]
			})
		]
	})] });
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
	const backupNames = (0, import_react.useMemo)(() => {
		return members.filter((member) => !member.isPlayer && member.name.trim()).map((member) => member.name);
	}, [members]);
	function goTo(next) {
		setStep(next);
		setFurthestStep((current) => Math.max(current, next));
		setIntroOpen(next > 0 && next <= 2);
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
			1,
			3
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
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarTrunkPreparation, {
			selected: trunkSelected,
			onSelect: selectTrunkItem,
			onBack: () => changePreparationTask(0),
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
			members,
			roomReady,
			onIndex: setJourneyIndex,
			onChoose: answerScenario,
			onMembersChange: updateMembers,
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
				setPreparationTask(1);
				setIntroOpen(false);
			},
			onComplete: () => {
				setLifePhase("complete");
				setStep(7);
				setFurthestStep((current) => Math.max(current, 7));
				setIntroOpen(false);
				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});
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
					onGoTo: goToStation,
					onSelectionPage: (page) => {
						changeSelectionPage(page);
						goToStation(1);
					},
					onPreparationTask: (task) => {
						changePreparationTask(task);
						goToStation(2);
					},
					onLifeStage: goToLifeStage
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
						step === 7 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessmentReport, {
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
							onBack: () => {
								setStep(6);
								setIntroOpen(false);
								window.scrollTo({
									top: 0,
									behavior: "smooth"
								});
							},
							onReset: resetAll
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSupplementForm, {
							profile,
							onChange: setProfile,
							onBack: () => {
								setStep(6);
								setIntroOpen(false);
								window.scrollTo({
									top: 0,
									behavior: "smooth"
								});
							},
							onReset: resetAll
						})] })
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
