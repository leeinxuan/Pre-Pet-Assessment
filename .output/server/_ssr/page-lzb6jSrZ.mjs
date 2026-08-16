import { T as __toESM, n as require_jsx_runtime, t as require_react_dom, x as require_react } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-lzb6jSrZ.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var money = new Intl.NumberFormat("zh-TW");
var intros = [
	{
		title: "選擇夥伴",
		body: "先選定物種與品種，理解牠未來可能需要的生活節奏。",
		icon: "pet",
		tip: ""
	},
	{
		title: "領養前準備",
		body: "整理生活空間、接回用品與基本照顧安排，讓到家第一天更安穩。",
		icon: "home",
		tip: ""
	},
	{
		title: "接牠回家",
		body: "從安全搭車到第一次進門，用穩定的步調陪牠認識新環境。",
		icon: "car",
		tip: ""
	},
	{
		title: "日常照護",
		body: "把飲食、散步、清潔與互動，慢慢變成每天做得到的節奏。",
		icon: "sun",
		tip: ""
	},
	{
		title: "健康觀察",
		body: "當食慾、精神或身體狀況改變時，學會記錄並找專業協助。",
		icon: "health",
		tip: ""
	},
	{
		title: "生活變化",
		body: "忙碌、搬家或高齡階段來臨時，重新安排照顧與支援。",
		icon: "change",
		tip: ""
	},
	{
		title: "資料補充",
		body: "把你的生活條件補齊，讓提醒更貼近真實照顧狀況。",
		icon: "note",
		tip: ""
	},
	{
		title: "照顧總覽",
		body: "將這趟練習整理成清單，帶著具體重點回到現實生活。",
		icon: "check",
		tip: ""
	}
];
var categories = [
	{
		id: "dog",
		label: "犬",
		icon: "🐕",
		image: "/assets/species/dog.png",
		active: true
	},
	{
		id: "cat",
		label: "貓",
		icon: "🐈",
		image: "/assets/species/cat.png",
		active: false
	},
	{
		id: "rabbit",
		label: "兔",
		icon: "🐇",
		image: "/assets/species/rabbit.png",
		active: false
	},
	{
		id: "bird",
		label: "鳥",
		icon: "🦜",
		image: "/assets/species/bird.png",
		active: false
	},
	{
		id: "reptile",
		label: "爬蟲",
		icon: "🦎",
		image: "/assets/species/reptile.png",
		active: false
	},
	{
		id: "small",
		label: "小型哺乳",
		icon: "🐹",
		image: "/assets/species/small-mammal.png",
		active: false
	}
];
var breeds = [
	{
		id: "chihuahua",
		label: "吉娃娃",
		icon: "🐕",
		image: "/assets/species/dog/chihuahua.png",
		size: "small",
		shortDescription: "體型嬌小、警覺性高，適合室內陪伴生活。雖然活動空間需求較小，仍需要規律散步與溫和社會化。"
	},
	{
		id: "poodle",
		label: "貴賓犬",
		icon: "🐩",
		image: "/assets/species/dog/poodle.png",
		size: "small",
		shortDescription: "聰明、親人且學習力強，需要足夠互動、益智活動與定期美容整理。適合願意投入陪伴與訓練時間的家庭。"
	},
	{
		id: "shiba",
		label: "柴犬",
		icon: "🐕",
		image: "/assets/species/dog/shiba.png",
		size: "medium",
		shortDescription: "個性獨立、精力充沛，也可能較有主見。需要穩定訓練、充足散步與安全的外出牽繩管理。"
	},
	{
		id: "border",
		label: "邊境牧羊犬",
		icon: "🐕‍🦺",
		image: "/assets/species/dog/border-collie.png",
		size: "medium",
		shortDescription: "學習力與精力都非常高，需要大量運動、訓練和腦力刺激。較適合生活步調活躍、能長時間陪伴互動的飼主。"
	},
	{
		id: "labrador",
		label: "拉布拉多",
		icon: "🦮",
		image: "/assets/species/dog/labrador.png",
		size: "large",
		shortDescription: "親人、友善且活潑，通常喜歡互動與戶外活動。需要足夠運動、體重管理及基本服從訓練。"
	}
];
var sizeBasedCosts = {
	small: {
		monthlyFood: 800,
		monthlyWasteBags: 150,
		monthlyPreventiveMedicine: 600,
		carrier: 900,
		leash: 700,
		bed: 700,
		seniorSupplies: 1e3
	},
	medium: {
		monthlyFood: 1200,
		monthlyWasteBags: 200,
		monthlyPreventiveMedicine: 900,
		carrier: 1200,
		leash: 950,
		bed: 900,
		seniorSupplies: 1500
	},
	large: {
		monthlyFood: 1800,
		monthlyWasteBags: 300,
		monthlyPreventiveMedicine: 1300,
		carrier: 1800,
		leash: 1200,
		bed: 1300,
		seniorSupplies: 2200
	}
};
function getPetSizeForBreed(breedId) {
	const size = breeds.find((item) => item.id === breedId)?.size;
	return size === "small" || size === "large" ? size : "medium";
}
function applySizeBasedExpenseAmount(expense, petSize) {
	const costs = sizeBasedCosts[petSize];
	const amount = {
		"monthly-food-main": costs.monthlyFood,
		"monthly-waste-bags": costs.monthlyWasteBags,
		"monthly-preventive-medicine": costs.monthlyPreventiveMedicine,
		carrier: costs.carrier,
		leash: costs.leash,
		bed: costs.bed,
		"senior-slipmat": costs.seniorSupplies,
		"senior-access-bed": costs.seniorSupplies
	}[expense.id];
	return typeof amount === "number" ? {
		...expense,
		amount
	} : expense;
}
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
		name: "玩具",
		amount: 450,
		category: "一次性準備費",
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
		name: "寵物專用清潔用品",
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
		amount: 1200,
		category: "每月基本支出",
		stage: "日常照護",
		recurring: true
	},
	"monthly-waste-bags": {
		id: "monthly-waste-bags",
		name: "每月撿便袋與清潔消耗品",
		amount: 200,
		category: "每月基本支出",
		stage: "日常散步",
		recurring: true
	},
	"monthly-preventive-medicine": {
		id: "monthly-preventive-medicine",
		name: "每月預防藥物",
		amount: 900,
		category: "每月基本支出",
		stage: "日常照護",
		recurring: true
	},
	"microchip-registration": {
		id: "microchip-registration",
		name: "晶片植入與寵物登記",
		amount: 1e3,
		category: "到家後必要支出",
		stage: "寵物到家後",
		recurring: false
	},
	"rabies-vaccine": {
		id: "rabies-vaccine",
		name: "狂犬病疫苗",
		amount: 400,
		category: "到家後必要支出",
		stage: "寵物到家後",
		recurring: false
	},
	"basic-vaccine-checkup": {
		id: "basic-vaccine-checkup",
		name: "基礎疫苗與初期健康檢查",
		amount: 3500,
		category: "到家後必要支出",
		stage: "寵物到家後",
		recurring: false
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
		image: "/assets/room/pet-bed.png",
		placement: {
			x: 67,
			y: 83,
			width: 32,
			layer: 2
		},
		mobilePlacement: {
			x: 62,
			y: 85,
			width: 45
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
		image: "/assets/room/toy.png",
		placement: {
			x: 73,
			y: 80,
			width: 10,
			layer: 4
		},
		mobilePlacement: {
			x: 69,
			y: 80,
			width: 15
		},
		required: true,
		need: "活動",
		expenseId: "toy",
		purpose: "合適的玩具可以提供活動與探索，也能減少因無聊產生的破壞行為。"
	},
	{
		id: "water-bowl",
		label: "水碗",
		icon: "💧",
		image: "/assets/room/water-bowl.png",
		placement: {
			x: 32,
			y: 90,
			width: 12,
			layer: 3
		},
		mobilePlacement: {
			x: 10,
			y: 90,
			width: 18
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
		image: "/assets/room/food-bowl.png",
		placement: {
			x: 41,
			y: 90,
			width: 10,
			layer: 3
		},
		mobilePlacement: {
			x: 25,
			y: 90,
			width: 15
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
		image: "/assets/room/pee-pad.png",
		placement: {
			x: 15,
			y: 85,
			width: 20,
			layer: 1
		},
		mobilePlacement: {
			x: 35,
			y: 70,
			width: 25
		},
		required: true,
		need: "排泄",
		expenseId: "toilet",
		purpose: "排泄用品應與食物及休息位置分開，方便小狗建立習慣。"
	},
	{
		id: "cleaner",
		label: "寵物專用清潔用品",
		icon: "🧼",
		image: "/assets/room/cleaner.png",
		placement: {
			x: 39,
			y: 46,
			width: 10,
			layer: 3
		},
		mobilePlacement: {
			x: 10,
			y: 46,
			width: 18
		},
		required: true,
		need: "清潔",
		expenseId: "cleaner",
		purpose: "日常清潔請選擇寵物專用清潔用品，並妥善收納。"
	},
	{
		id: "food",
		label: "飼料",
		icon: "🦴",
		image: "/assets/room/food.png",
		placement: {
			x: 50,
			y: 85,
			width: 9,
			layer: 3
		},
		mobilePlacement: {
			x: 39,
			y: 86,
			width: 13
		},
		required: true,
		need: "飲食",
		expenseId: "starter-food",
		purpose: "選擇符合小狗年齡、體型及健康需求的主食，並妥善保存。"
	}
];
var roomDoorplatePlacement = {
	mobile: {
		x: 33,
		y: 20,
		width: 40
	},
	mobileText: {
		left: 4,
		top: 56,
		width: 95,
		height: 20,
		fontSize: 16
	}
};
var hazards = [
	{
		id: "small-parts",
		label: "小物品",
		icon: "●",
		image: "/assets/room/small-items.png",
		placement: {
			x: 40,
			y: 75,
			width: 12,
			layer: 5
		},
		mobilePlacement: {
			x: 80,
			y: 55,
			width: 16
		},
		danger: "容易被誤吞，可能造成噎住或腸胃阻塞。",
		handling: "收進小狗無法取得的抽屜或收納盒。"
	},
	{
		id: "chocolate",
		label: "巧克力",
		icon: "🍫",
		image: "/assets/room/chocolate.png",
		placement: {
			x: 89,
			y: 78,
			width: 10,
			layer: 5
		},
		mobilePlacement: {
			x: 89,
			y: 78,
			width: 16
		},
		danger: "含有不適合狗狗的成分，可能危害健康。",
		handling: "放進有門的高處櫃子。"
	},
	{
		id: "chemicals",
		label: "一般清潔劑",
		icon: "🧴",
		image: "/assets/room/detergent.png",
		placement: {
			x: 62,
			y: 64,
			width: 10,
			layer: 5
		},
		mobilePlacement: {
			x: 55,
			y: 65,
			width: 15
		},
		danger: "一般清潔劑可能含有刺激性或不適合寵物接觸的成分。",
		handling: "應收在牠碰不到的地方；日常清潔請選擇寵物專用清潔用品。"
	},
	{
		id: "cables",
		label: "電線",
		icon: "🔌",
		image: "/assets/room/wire.png",
		placement: {
			x: 12,
			y: 78,
			width: 20,
			layer: 5
		},
		mobilePlacement: {
			x: 15,
			y: 78,
			width: 25
		},
		danger: "可能被啃咬，造成受傷或觸電。",
		handling: "整理固定或加裝電線保護套。"
	}
];
var arrivalMealMobilePlacements = {
	dog: {
		left: 32,
		bottom: 10,
		width: 50,
		maxHeight: 58
	},
	water: {
		left: 10,
		bottom: 10,
		width: 24
	},
	food: {
		left: 28,
		bottom: 5,
		width: 24
	}
};
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
		image: "/assets/car/id-card.png",
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
		image: "/assets/car/adoption-documents.png",
		preparedLabel: "已攜帶",
		description: "如有租屋，須提供房東許可之證明。",
		reason: "如有租屋，須提供房東許可之證明。",
		caution: "實際需要攜帶的文件，請依領養單位通知及評估流程確認。",
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
		image: "/assets/car/carrier.png",
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
		image: "/assets/car/water-bottle.png",
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
		image: "/assets/car/leash.png",
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
		label: "寵物專用清潔用品",
		kind: "supply",
		image: "/assets/room/cleaner.png",
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
		image: "/assets/car/carrier.png",
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
		image: "/assets/car/pee-pad.png",
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
	hasSensitiveHouseholdMembers: false,
	housemateList: [],
	housemateTypes: [],
	otherHousemate: "",
	activitySpace: "",
	otherActivitySpace: "",
	homeSpaceImage: "",
	homeSpaceImageName: "",
	homeSpaceImages: [],
	homeSpaceImageNames: [],
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
		reportSummary: "第一天適應新家時，狗狗可能因陌生而躲藏或緊張；保留安靜、安全且能退回的空間，等待牠主動探索。",
		artIndex: 0,
		choices: [
			{
				id: "force-pick-up",
				text: "強行抱出來",
				result: "incorrect",
				...incorrect,
				explanation: "這個做法可能讓牠更緊張。被強行抱起會讓小狗失去退路，增加防衛反應，也可能降低牠對新環境的安全感。",
				suggestion: "保持距離，提供安靜安全的空間，讓牠用自己的速度探索。"
			},
			{
				id: "quiet-explore",
				text: "保持距離，給牠安靜適應的時間",
				result: "correct",
				...positive,
				explanation: "剛到新家的小狗需要先觀察環境。保持距離並提供安靜、安全的空間，能減少壓力，讓牠以自己的速度建立安全感。",
				suggestion: "準備乾淨飲水與可休息的角落，等牠主動靠近後再慢慢增加互動。"
			},
			{
				id: "keep-calling",
				text: "持續靠近並呼喚牠",
				result: "incorrect",
				...incorrect,
				explanation: "持續靠近與呼喚會增加刺激，讓還在適應中的小狗難以安心觀察，可能變得更緊張或躲避。",
				suggestion: "先給牠安靜的時間與可退回的安全空間，等待牠主動探索或靠近。"
			},
			{
				id: "quiet-nearby",
				text: "坐在附近陪牠，但每隔一下就伸手摸摸看",
				result: "incorrect",
				...incorrect,
				explanation: "想陪伴牠的心意很好，但頻繁伸手仍可能讓剛到家的小狗感到壓力，難以真正休息。",
				suggestion: "可以安靜待在附近，先不主動碰觸，等牠願意靠近時再互動。"
			}
		]
	},
	{
		id: "behavior-barking",
		stage: "日常行為照顧",
		timeLabel: "日常照護",
		title: "牠一直吠叫，該怎麼辦？",
		description: "晚上你正在休息，小狗突然對著門口一直吠叫。你看見牠有些警覺，也注意到附近有聲音經過。",
		topic: "日常行為照顧",
		reportSummary: "狗狗持續吠叫時，先理解聲音、壓力或活動不足等原因，再用陪伴、適量活動與專業協助調整。",
		artIndex: 4,
		multipleChoice: true,
		requiredCorrectOptionIds: [
			"bark-play",
			"bark-walk",
			"bark-expert"
		],
		wrongOptionIds: ["bark-scold"],
		correctSummary: [
			"提供遊戲與互動，增加安全感。",
			"帶牠適量散步，消耗精力。",
			"若情況持續或影響生活，尋求獸醫或行為專家協助。"
		],
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
		timeLabel: "日常照護",
		title: "牠開始亂咬東西，該怎麼辦？",
		description: "你回到客廳時，發現小狗正在咬桌腳旁的物品。旁邊還有一些不能讓牠碰到的小東西。",
		topic: "日常行為照顧",
		reportSummary: "狗狗亂咬東西時，應收好危險物並提供安全啃咬玩具；打罵可能增加壓力，也無法教會合適做法。",
		artIndex: 4,
		multipleChoice: true,
		requiredCorrectOptionIds: [
			"chew-toys",
			"chew-store-hazards",
			"chew-expert"
		],
		wrongOptionIds: ["chew-punish"],
		correctSummary: [
			"提供多樣化且安全的啃咬玩具。",
			"把有害物品收好，避免牠接觸。",
			"若情況嚴重或持續，尋求獸醫或行為專家協助。"
		],
		choices: [
			{
				id: "chew-toys",
				text: "提供多樣化且安全的啃咬玩具",
				result: "correct",
				...positive,
				explanation: "安全的啃咬玩具能提供合適的探索出口，也能讓牠把咬的需求放在正確物品上。"
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
				id: "chew-store-hazards",
				text: "把有害物品收好，避免牠接觸",
				result: "correct",
				...positive,
				explanation: "先管理環境能降低誤食與受傷風險，也讓小狗更容易練習安全的選擇。"
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
		timeLabel: "日常照護",
		title: "牠在不適合的地方大小便，該怎麼辦？",
		description: "你發現小狗在不適合的位置大小便。牠看起來不是故意搗亂，而是還沒建立固定如廁習慣。",
		topic: "日常行為照顧",
		reportSummary: "狗狗在錯誤位置排泄時，應增加合適的如廁機會、固定位置並正向引導，而不是事後責罵。",
		artIndex: 4,
		multipleChoice: true,
		requiredCorrectOptionIds: [
			"toilet-material",
			"toilet-outings",
			"toilet-expert"
		],
		wrongOptionIds: ["toilet-scold"],
		correctSummary: [
			"使用適當材質鋪地，例如報紙或尿布墊。",
			"一天多安排幾次外出如廁機會。",
			"若頻率異常或持續困擾，尋求獸醫或行為專家協助。"
		],
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
				id: "toilet-expert",
				text: "若頻率異常或持續困擾，尋求獸醫或行為專家協助",
				result: "correct",
				...positive,
				explanation: "頻率異常或持續困擾時，尋求獸醫或行為專家協助能確認是否有健康或行為需求。"
			},
			{
				id: "toilet-scold",
				text: "牠尿錯地方就把牠抓過來罵",
				result: "incorrect",
				...incorrect,
				explanation: "責罵可能讓狗狗害怕，卻不一定知道正確如廁地點。",
				suggestion: "使用適當材質、增加外出機會，並在牠做對時給予獎勵。"
			}
		]
	},
	{
		id: "busy-daily-care",
		stage: "當生活發生變化",
		timeLabel: "當生活發生變化",
		title: "疲憊忙碌的日子",
		description: "今天臨時需要加班，早上出門後一路忙到很晚。你已經很疲累，但豆豆仍需要晚餐、乾淨飲水、排泄與適當活動。",
		topic: "時間安排與照顧支援",
		reportSummary: "臨時加班或晚歸時，仍要事先安排可信任的人按時協助餵食、換水、排泄、活動與狀況觀察。",
		artIndex: 5,
		choices: [
			{
				id: "alone-with-food",
				text: "早上出門前先多放一些飼料和水，晚上忙完再好好陪牠",
				result: "incorrect",
				...incorrect,
				explanation: "早上多放食物和水仍不能取代一整天的排泄、活動與狀況觀察，也可能造成過量進食或突發狀況沒有人發現。",
				suggestion: "確定要加班時，應先確認能接手餵食、飲水、排泄與活動的人選，並清楚交接照顧需求。"
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
			},
			{
				id: "hold-until-tomorrow",
				text: "傍晚到家再餵，至少睡前有吃到晚餐就好",
				result: "incorrect",
				...incorrect,
				explanation: "把晚餐、排泄與活動一路延後到回家，會讓小狗長時間等待，也無法因應加班比預期更晚或臨時狀況。",
				suggestion: "確定會晚歸時，就先安排可信任的人按平常時間協助餵食、換水、排泄與基本活動。"
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
		reportSummary: "出現搔癢、活動力下降或眼睛紅等變化時，應記錄食慾、精神與症狀並詢問獸醫，不要自行餵人用藥。",
		artIndex: 3,
		choices: [
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
				text: "先拿家裡剩下的感冒藥餵一點，看看今晚會不會舒服些",
				result: "incorrect",
				...incorrect,
				explanation: "即使只是少量，家中的人用感冒藥也可能含有不適合狗狗的成分，並讓原本的症狀更難判斷。",
				suggestion: "先不要自行給藥；記錄症狀、使用中的用品與可能接觸物，再向獸醫說明。"
			},
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
				id: "ask-experienced-friend",
				text: "先拍照問有養狗的朋友，照他以前遇過的方式處理",
				result: "incorrect",
				...incorrect,
				explanation: "朋友的經驗可以提供陪伴，但相似外觀不一定代表相同原因，仍可能錯過需要檢查的狀況。",
				suggestion: "可以整理朋友提醒你的觀察重點，但醫療判斷與用藥仍應交給獸醫。"
			}
		]
	},
	{
		id: "growing-old",
		stage: "逐漸進入高齡",
		timeLabel: "逐漸進入高齡",
		title: "高齡後的照顧準備",
		description: "小狗走路開始變慢，後腳偶爾使不上力，曾經輕鬆走完的路如今需要停下休息。你花更多時間陪牠慢慢曬太陽，也要留意牠來不及走到如廁處時，協助清理排泄物、保持身體乾爽。",
		topic: "高齡照顧與醫療準備",
		reportSummary: "狗狗進入高齡後，可能出現行動退化、排泄照護與醫療需求；應提早準備時間、環境調整和醫療基金。",
		artIndex: 1,
		choices: [
			{
				id: "senior-plan-ahead",
				text: "提前規劃醫療基金，學習老年照顧知識，並定期諮詢獸醫",
				result: "correct",
				...positive,
				explanation: "提前準備能幫助飼主在高齡階段更穩定地照顧小狗，也能及早安排健康觀察、醫療需求與長期照顧。"
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
			},
			{
				id: "senior-supplements-first",
				text: "先買大家推薦的保健食品補一補，等下次有空再安排檢查",
				result: "incorrect",
				...incorrect,
				explanation: "想提早保養是好意，但保健食品不能取代健康檢查，也未必適合牠當下的身體狀況。",
				suggestion: "先把活動、食慾與排泄變化記下來，和獸醫討論檢查及適合的日常調整。"
			}
		]
	}
];
var breedChallengeContent = {
	shiba: [{
		title: "一年四季都在掉毛",
		description: "柴犬換毛量很大，地板、沙發和衣服上常常都看得到毛。面對長期反覆的清潔工作，你會怎麼處理？",
		topic: "柴犬的換毛與居家清潔",
		reportSummary: "柴犬有雙層被毛，平時與換毛期都可能讓家中累積大量毛髮，需要把梳毛、吸塵與衣物除毛納入長期日常。",
		breedKnowledge: "柴犬具有雙層被毛，平時就會掉毛，換毛期更會大量脫落底毛；生活在較溫暖或室內環境時，掉毛也可能分散在全年。規律梳毛與吸塵能減少散落毛髮，但無法讓家中完全沒有毛，也不建議只為了止掉毛就任意剃除雙層毛。",
		correctText: "固定梳毛與吸塵，把清潔排進每週生活，也接受家裡不可能完全沒有毛",
		correctExplanation: "規律梳理、清潔與可接受的生活標準，比追求一次清到完全沒毛更能長期維持。",
		distractors: [
			{
				text: "等毛多到看不下去時，再一次把牠剃得很短",
				explanation: "一次剃短不等於解決正常換毛，也可能影響毛髮與皮膚保護。",
				suggestion: "用適合雙層毛犬的工具規律梳理；若皮膚或掉毛狀況異常，再詢問獸醫或美容專業人員。"
			},
			{
				text: "平常先用黏毛滾輪處理衣服，地板週末再一起清就好",
				explanation: "這能暫時改善外觀，但只處理衣服可能讓毛髮持續堆積，也忽略了狗狗本身需要規律梳理。",
				suggestion: "把短時間梳毛、局部吸塵和衣物除毛拆成可持續的小任務。"
			},
			{
				text: "不讓牠進客廳和房間，應該就不需要常常打掃",
				explanation: "限制活動範圍無法停止換毛，也可能犧牲原本需要的陪伴與生活品質。",
				suggestion: "可以設定好清潔的休息區與家具保護方式，但仍要安排互動、梳毛與環境清潔。"
			}
		]
	}, {
		title: "颳風下雨也要出門上廁所",
		description: "柴犬通常很愛乾淨，有些柴犬不喜歡在家裡上廁所。即使天氣不好，牠仍在門邊等著外出，你會怎麼做？",
		topic: "柴犬的外出排泄需求",
		reportSummary: "許多柴犬傾向離開生活區域後才排泄，飼主需要每天安排穩定外出，也要準備雨天短路線與室內備案。",
		breedKnowledge: "柴犬往往很重視生活區域的清潔，許多個體會傾向離開睡眠與活動空間後才排泄，因此可能逐漸習慣在戶外如廁。這不代表牠能長時間憋尿；飼主仍需每天安排穩定的外出機會，也要準備雨具、短路線，以及必要時可逐步練習的室內備案。",
		correctText: "準備雨具與擦腳用品，依天氣調整路線和時間，但仍完成安全的外出排泄與基本散步",
		correctExplanation: "把雨具、短路線與回家清潔準備好，才能在壞天氣中持續滿足排泄與活動需求。",
		distractors: [
			{
				text: "今天雨太大，忍一天不上廁所應該還好，明天再遛久一點",
				explanation: "把需求延到隔天可能讓狗狗長時間不舒服，隔天加長散步也無法補回今天的排泄需求。",
				suggestion: "縮短路線、避開危險時段並做好雨天防護，但仍要提供安全如廁機會。"
			},
			{
				text: "抱牠到門口看雨，如果牠不肯走就直接回家",
				explanation: "短暫嘗試是有彈性的做法，但若沒有替代安排，牠仍可能整天缺乏合適的排泄機會。",
				suggestion: "先找有遮蔽的短路線，也可在平日逐步建立備用的室內如廁選項。"
			},
			{
				text: "只要在家鋪很多尿墊，牠應該自然就會改在室內上",
				explanation: "只增加尿墊不一定能立刻改變已建立的如廁習慣，也可能讓牠更困惑。",
				suggestion: "若要建立室內備案，需要用固定位置、漸進引導與正向回饋慢慢練習。"
			}
		]
	}],
	chihuahua: [{
		title: "體型小，也需要每天活動",
		description: "吉娃娃體型小，家人覺得在家裡走動就夠了。牠卻常在門邊等著外出，你會怎麼安排？",
		topic: "吉娃娃的日常活動",
		reportSummary: "吉娃娃體型雖小，仍需要依體力安排規律短散步、嗅聞與安全的環境探索。",
		correctText: "依體力與天氣安排規律短散步，讓牠嗅聞、活動並安全接觸環境",
		correctExplanation: "小型犬仍需要合適的外出活動與環境探索；重點是依牠的體力調整，而不是完全取消。",
		distractors: [
			{
				text: "牠這麼小，在家跑幾圈應該就夠了",
				explanation: "室內活動可以補充，但不能完全取代嗅聞、探索與外界經驗。",
				suggestion: "把散步縮短、分次進行，並觀察牠的體力與情緒。"
			},
			{
				text: "只有週末有空時，再一次帶牠走很久",
				explanation: "集中在單日的大量活動較難形成穩定節奏，也可能超過平時體力。",
				suggestion: "用每日短時段維持規律，週末再依狀況延長。"
			},
			{
				text: "全程抱著出門看風景，這樣也算有散步",
				explanation: "被抱著能接觸環境，但缺少自主嗅聞與身體活動。",
				suggestion: "在安全、可控的地方讓牠自己走一段，必要時再抱起休息。"
			}
		]
	}, {
		title: "牙齒清潔不能等有味道才做",
		description: "吉娃娃不太喜歡碰嘴巴，你也常忙到忘記刷牙。你會怎麼建立可持續的口腔照護？",
		topic: "吉娃娃的口腔照護",
		reportSummary: "吉娃娃的口腔照護應從短時間碰觸與刷牙練習開始，並配合定期獸醫檢查。",
		correctText: "從短時間碰觸與獎勵開始，慢慢建立刷牙習慣，並配合定期獸醫檢查",
		correctExplanation: "把口腔照護拆成小步驟，通常比等問題出現後才處理更容易長期維持。",
		distractors: [
			{
				text: "等聞到明顯口臭，再約時間洗牙就好",
				explanation: "等到已有明顯變化才處理，可能錯過較早發現問題的機會。",
				suggestion: "把日常觀察、刷牙練習與定期檢查一起安排。"
			},
			{
				text: "每天給潔牙零食，就可以不用碰牠的牙齒",
				explanation: "潔牙產品可以是輔助，但不等於完整的口腔清潔與檢查。",
				suggestion: "在牠能接受的程度下逐步練習刷牙，並向獸醫確認適合的產品。"
			},
			{
				text: "一次抓緊把牙全部刷完，牠久了就會習慣",
				explanation: "強迫完成可能增加害怕，讓之後更難碰觸嘴巴。",
				suggestion: "從一兩秒的碰觸開始，配合獎勵，逐步增加時間。"
			}
		]
	}],
	poodle: [{
		title: "捲毛需要持續整理",
		description: "貴賓犬的毛看起來不太會掉，但只要幾天沒整理就容易打結。你會怎麼把美容照護放進生活？",
		topic: "貴賓犬的毛髮照護",
		reportSummary: "貴賓犬需要固定梳理與專業美容，不能等到毛結明顯時才一次處理。",
		correctText: "固定在家梳理並預約專業美容，把時間和費用都算進長期照顧",
		correctExplanation: "規律梳理與專業修整能降低打結，也讓身體檢查與清潔更穩定。",
		distractors: [
			{
				text: "等毛結明顯時，再一次剪短處理",
				explanation: "等到嚴重打結才處理，可能讓整理更不舒服，也更花時間。",
				suggestion: "用短時間、高頻率的方式維持梳理。"
			},
			{
				text: "每次洗澡時多用潤絲，平常就不用梳",
				explanation: "洗澡不能取代梳理，毛結遇水後有時反而更難處理。",
				suggestion: "先學會適合的梳理工具和順序，再配合洗護。"
			},
			{
				text: "只整理看得到的表面，裡層交給美容師就好",
				explanation: "表面整齊不代表靠近皮膚的毛沒有打結。",
				suggestion: "請美容師示範分層梳理，並建立固定檢查部位。"
			}
		]
	}, {
		title: "聰明也需要動腦",
		description: "貴賓犬很快就學會日常規則，但最近開始因無聊而一直找東西玩。你會怎麼安排？",
		topic: "貴賓犬的互動與腦力刺激",
		reportSummary: "貴賓犬需要把散步、嗅聞、短訓練、益智互動與休息排成可持續的生活節奏。",
		correctText: "把散步、嗅聞、短訓練和益智遊戲輪流安排，並保留休息時間",
		correctExplanation: "多樣但不過量的身體與腦力活動，更能形成可持續的生活節奏。",
		distractors: [
			{
				text: "買很多玩具放著，牠應該會自己玩",
				explanation: "玩具若沒有輪替與互動，可能很快失去新鮮感。",
				suggestion: "少量輪替玩具，並加入一起玩的時間。"
			},
			{
				text: "每天把同一個指令練久一點，累了就不會搗蛋",
				explanation: "重複太久可能造成挫折或失去興趣，不能取代多樣需求。",
				suggestion: "把訓練拆短，穿插嗅聞、遊戲和休息。"
			},
			{
				text: "牠一無聊就給零食，先讓牠安靜下來",
				explanation: "只用零食停止行為，可能沒有處理真正的活動與互動需求。",
				suggestion: "先安排合適活動，再把零食當作訓練中的小份獎勵。"
			}
		]
	}],
	border: [{
		title: "精力不只靠跑步消耗",
		description: "邊境牧羊犬散步回家後仍很有精神，開始在家追逐移動的人和物。你會怎麼調整？",
		topic: "邊境牧羊犬的身心活動",
		reportSummary: "邊境牧羊犬除了規律運動，也需要嗅聞、解題與安定休息，不能只靠增加跑步量消耗精力。",
		correctText: "在規律運動之外加入嗅聞、短訓練與解題遊戲，也練習安定休息",
		correctExplanation: "身體活動、腦力刺激與休息能力都重要，不能只靠增加跑步量。",
		distractors: [
			{
				text: "每天再多跑一小時，把體力完全耗光",
				explanation: "只增加高強度運動可能讓體能越來越好，卻沒有學會安定與動腦。",
				suggestion: "把活動種類分散，並安排降速與休息練習。"
			},
			{
				text: "在家丟球讓牠一直追，累了自然會停",
				explanation: "高度重複的追逐可能讓情緒越來越亢奮。",
				suggestion: "限制追逐時間，穿插嗅聞和冷靜活動。"
			},
			{
				text: "牠太興奮就先關在單獨空間，不互動就會安靜",
				explanation: "短暫降刺激可以幫忙，但長期只隔離沒有教會替代行為。",
				suggestion: "提供安靜休息區，同時練習可被獎勵的安定行為。"
			}
		]
	}, {
		title: "追逐與牧羊本能需要引導",
		description: "散步時，邊境牧羊犬會盯著腳踏車和跑動的小孩，甚至想衝過去。你會怎麼做？",
		topic: "邊境牧羊犬的追逐管理",
		reportSummary: "邊境牧羊犬出現追逐反應時，應先保持安全距離與牽繩控制，再循序練習把注意力帶回飼主。",
		correctText: "保持安全距離與牽繩控制，練習把注意力帶回飼主，必要時尋求專業協助",
		correctExplanation: "先管理距離與安全，再用循序練習建立新的反應，比硬碰刺激更穩定。",
		distractors: [
			{
				text: "多靠近幾次讓牠習慣，久了就不會追",
				explanation: "一下子太靠近刺激，可能讓反應更強，也增加失控風險。",
				suggestion: "從仍能回應你的距離開始練習。"
			},
			{
				text: "看到腳踏車就把牽繩拉得很緊，快速通過",
				explanation: "安全控制是必要的，但持續拉緊和快速靠近可能讓牠更緊張。",
				suggestion: "提早拉開距離，用穩定節奏帶離並獎勵回頭。"
			},
			{
				text: "改成很晚沒人的時候才散步，就不會遇到問題",
				explanation: "避開高峰能降低難度，但完全迴避也無法建立可應對的生活能力。",
				suggestion: "先選較安靜時段，再逐步練習適合的距離。"
			}
		]
	}],
	labrador: [{
		title: "很愛吃，更需要份量管理",
		description: "拉布拉多總像沒吃飽，家人也很容易被牠的眼神說服多給一點。你會怎麼管理？",
		topic: "拉布拉多的飲食與體重管理",
		reportSummary: "拉布拉多的主食與零食需要全家統一計量和記錄，並依體態與獸醫建議持續調整。",
		correctText: "量好每日主食與零食總量，全家共用紀錄，並依體態和獸醫建議調整",
		correctExplanation: "全家用一致份量與紀錄，比各自憑感覺餵食更容易維持健康體態。",
		distractors: [
			{
				text: "主食照常，牠表現好時零食多一點沒關係",
				explanation: "零食也會累積熱量，若沒有算入每日總量，很容易越給越多。",
				suggestion: "先分出一天可用的獎勵份量，用完就不再增加。"
			},
			{
				text: "今天吃多了，明天少餵一餐平衡回來",
				explanation: "忽多忽少不利於穩定作息，也可能讓飢餓感與討食更明顯。",
				suggestion: "用固定份量長期調整，不用隔天極端補償。"
			},
			{
				text: "讓牠自己決定吃多少，吃飽自然會停",
				explanation: "有些狗狗不容易自行節制，自由取食可能造成過量。",
				suggestion: "按量定時餵食，並觀察體態與活動。"
			}
		]
	}, {
		title: "力氣大，散步安全要先練",
		description: "拉布拉多看到喜歡的人和狗就想往前衝，家人有時拉不住。你會怎麼安排散步？",
		topic: "拉布拉多的牽繩與衝動控制",
		reportSummary: "拉布拉多力氣大且容易興奮，主要照顧者都應熟悉合適裝備、距離管理與循序鬆繩練習。",
		correctText: "使用合適胸背與牽繩，從低干擾環境練習鬆繩和回應，再逐步增加難度",
		correctExplanation: "設備、安全距離和循序訓練一起做，能讓散步更可控，也保留探索樂趣。",
		distractors: [
			{
				text: "牠力氣大就用更短的繩一直拉緊，至少不會跑掉",
				explanation: "安全控制重要，但全程緊繃可能讓彼此更用力，也沒有教會鬆繩行走。",
				suggestion: "先在低干擾環境練習，遇到刺激前提早拉開距離。"
			},
			{
				text: "讓牠衝過去打完招呼，興奮完就會安靜",
				explanation: "每次衝拉後都能接近目標，可能反而強化往前衝的行為。",
				suggestion: "能保持鬆繩與回應時才逐步接近。"
			},
			{
				text: "改由力氣最大的家人負責，其他人就不用學",
				explanation: "只依靠某一位家人的力氣，遇到生活變化時容易失去穩定照顧。",
				suggestion: "讓主要照顧者都熟悉安全裝備、距離管理與基礎練習。"
			}
		]
	}]
};
function getBreedChallengeScenarios(breedId) {
	const questions = breedChallengeContent[breedId] ?? breedChallengeContent.shiba;
	const resolvedBreedId = breedChallengeContent[breedId] ? breedId : "shiba";
	return questions.map((question, index) => ({
		id: `breed-challenge-${index + 1}`,
		stage: "品種的考驗",
		timeLabel: "日常照護",
		title: question.title,
		description: question.description,
		topic: question.topic,
		reportSummary: question.reportSummary,
		breedKnowledge: question.breedKnowledge,
		artIndex: 4,
		choices: resolvedBreedId === "shiba" && index === 1 ? [...question.distractors.map((choice, choiceIndex) => ({
			id: `breed-challenge-${index + 1}-distractor-${choiceIndex + 1}`,
			text: choice.text,
			result: "incorrect",
			...incorrect,
			explanation: choice.explanation,
			suggestion: choice.suggestion
		})), {
			id: `breed-challenge-${index + 1}-correct`,
			text: question.correctText,
			result: "correct",
			...positive,
			explanation: question.correctExplanation
		}] : [{
			id: `breed-challenge-${index + 1}-correct`,
			text: question.correctText,
			result: "correct",
			...positive,
			explanation: question.correctExplanation
		}, ...question.distractors.map((choice, choiceIndex) => ({
			id: `breed-challenge-${index + 1}-distractor-${choiceIndex + 1}`,
			text: choice.text,
			result: "incorrect",
			...incorrect,
			explanation: choice.explanation,
			suggestion: choice.suggestion
		}))]
	}));
}
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
		timeLabel: "日常照護",
		title: "今天也要出門散步"
	},
	{
		id: "breed-challenge",
		type: "breed-challenge",
		timeLabel: "品種的考驗",
		title: "品種的考驗"
	},
	{
		id: "busy-care",
		type: "scenario",
		timeLabel: "當生活發生變化",
		title: "疲憊忙碌的日子",
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
var walkingPrepItems = [
	{
		id: "leash",
		label: "牽繩／胸背帶",
		image: "/assets/car/leash.png"
	},
	{
		id: "bag",
		label: "撿便袋",
		image: "/assets/walking/poop-bag-1.png"
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
		image: "/assets/walking/door-to-sidewalk.jpg",
		poopEvent: false
	},
	{
		title: "公園",
		image: "/assets/walking/park.png",
		poopEvent: false
	},
	{
		title: "公園 2",
		image: "/assets/walking/park-poop-event.png",
		poopEvent: true
	},
	{
		title: "人行道往家門口",
		image: "/assets/walking/sidewalk-to-home.jpg",
		poopEvent: false
	}
];
var walkingPreloadImages = [
	...walkingScenes.map((scene) => scene.image),
	...walkingPrepItems.map((item) => item.image),
	"/assets/walking/walker-and-dog.png",
	"/assets/walking/walker-and-dog-poop.png",
	"/assets/walking/walker-dog-bag.png",
	"/assets/walking/poop-bag-1.png",
	"/assets/walking/poop.png"
];
var import_jsx_runtime = require_jsx_runtime();
var arrivalVideoSource = "/assets/pet-journey/arrival-transition.mp4";
var correctAnswerVideos = ["/assets/pet-journey/correct-answer.mp4", "/assets/pet-journey/correct-answer2.mp4"];
var scenarioCorrectAnswerVideoIndex = {
	"arrival-adjustment": 0,
	"illness-vet": 1,
	"growing-old": 0,
	"busy-daily-care": 1
};
function arrivalMealPlacementStyle(kind) {
	const placement = arrivalMealMobilePlacements[kind];
	return {
		"--mobile-arrival-meal-left": `${placement.left}%`,
		"--mobile-arrival-meal-bottom": `${placement.bottom}%`,
		"--mobile-arrival-meal-width": `${placement.width}%`,
		"--mobile-arrival-meal-max-height": "maxHeight" in placement ? `${placement.maxHeight}%` : "none"
	};
}
function getCorrectAnswerVideo(key) {
	const index = typeof key === "number" ? key : scenarioCorrectAnswerVideoIndex[key] ?? 0;
	return correctAnswerVideos[Math.abs(index) % correctAnswerVideos.length];
}
function useVideoMetadataPreload(src) {
	(0, import_react.useEffect)(() => {
		if (!src || typeof document === "undefined") return;
		const video = document.createElement("video");
		video.preload = "metadata";
		video.src = src;
		video.load();
	}, [src]);
}
function withPetName(text, petName) {
	return text.replaceAll("豆豆", petName).replaceAll("小狗", petName).replaceAll("狗狗", petName);
}
var lifeStageLabels = {
	arrival: "適應新家與安全感",
	daily: "日常照護",
	change: "當生活發生變化"
};
function breedLabelForId(breed) {
	return breeds.find((item) => item.id === breed)?.label ?? "這個品種";
}
function withBreedName(text, breed) {
	return text.replaceAll("柴犬", breedLabelForId(breed));
}
function healthSuggestionForBreed(breed, shibaSuggestion) {
	if (breed === "shiba") return shibaSuggestion;
	return `${breedLabelForId(breed)}也可能有需要特別留意的品種相關健康風險。健檢時請主動告知品種、來源與已知家族健康資訊，並詢問獸醫適合追蹤的項目。\n\n如果發現食慾、精神、排泄或活動狀況和平常不同，請記錄變化並尋求獸醫建議。`;
}
function lifeStageLabelForScenario(scenario) {
	if (scenario.id === "arrival-adjustment") return lifeStageLabels.arrival;
	if (scenario.id === "busy-daily-care" || scenario.id === "illness-vet" || scenario.id === "growing-old") return lifeStageLabels.change;
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
function DelayedContinueButton({ label = "繼續", onContinue }) {
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => setVisible(true), 3e3);
		return () => window.clearTimeout(timer);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `delayed-continue ${visible ? "is-visible" : "is-waiting"}`,
		"aria-live": "polite",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "primary",
			tabIndex: visible ? 0 : -1,
			"aria-hidden": !visible,
			onClick: onContinue,
			children: [
				label,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })
			]
		})
	});
}
function CorrectFeedbackLayout({ variant, videoSrc, videoFailed, fallbackText, intro, suggestion, breedHighlight, otherTips, correctItems, mediaPlaceholder, onVideoError, onVideoEnded, onContinue }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `correct-feedback-layout correct-feedback-layout--${variant}`,
		"aria-live": "polite",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "correct-feedback-media",
			children: mediaPlaceholder ? mediaPlaceholder : videoFailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scene-video-fallback",
				role: "status",
				children: fallbackText
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoWithToggle, {
				src: videoSrc,
				ariaLabel: "正確處置後的正向結果影片",
				onEnded: onVideoEnded,
				onError: onVideoError
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "correct-feedback-copy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "做得很好！" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "correct-feedback-intro",
					children: intro
				}),
				breedHighlight,
				correctItems && correctItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "daily-behavior-correct-list",
					children: correctItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
				}),
				suggestion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "correct-feedback-suggestion",
					children: suggestion
				}),
				otherTips,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DelayedContinueButton, { onContinue })
			]
		})]
	});
}
function BreedKnowledgeHighlight({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "walking-reflection-note breed-care-reflection",
		children: (text.includes("\n") ? text.split(/\n+/) : text.replaceAll("：", "：\n").replaceAll("；", "；\n").replaceAll("。", "。\n").split(/\n+/)).map((line, index) => line.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: line.trim() }, `${line}-${index}`))
	});
}
function ScenarioOptionCard({ type = "single", selected = false, disabled = false, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: `scenario-option-card scenario-option-card--${type} ${selected ? "selected" : ""}`,
		"aria-pressed": type === "multiple" ? selected : void 0,
		disabled,
		onClick,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children })
	});
}
function VideoWithToggle({ className, src, loop = false, autoPlay = true, ariaLabel, onError, onEnded }) {
	const videoRef = (0, import_react.useRef)(null);
	const [paused, setPaused] = (0, import_react.useState)(!autoPlay);
	(0, import_react.useEffect)(() => {
		setPaused(!autoPlay);
	}, [autoPlay, src]);
	function toggleVideo() {
		const video = videoRef.current;
		if (!video) return;
		if (video.paused) video.play().then(() => setPaused(false)).catch(() => setPaused(true));
		else {
			video.pause();
			setPaused(true);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		ref: videoRef,
		className,
		src,
		autoPlay,
		loop,
		playsInline: true,
		preload: "metadata",
		"aria-label": ariaLabel,
		onPlay: () => setPaused(false),
		onPause: () => setPaused(true),
		onEnded: () => {
			setPaused(true);
			onEnded?.();
		},
		onError
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "video-toggle-button",
		onClick: toggleVideo,
		"aria-label": paused ? "播放影片" : "暫停影片",
		title: paused ? "播放" : "暫停",
		children: paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "video-play-icon",
			"aria-hidden": "true"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "video-pause-icon",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
		})
	})] });
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
			src: "/assets/pet-journey/time-passes-aging.mp4",
			autoPlay: true,
			playsInline: true,
			preload: "metadata",
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
	const [feedbackVideoFailed, setFeedbackVideoFailed] = (0, import_react.useState)(false);
	const [, setFeedbackVideoFinished] = (0, import_react.useState)(false);
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
	if (choice.result === "correct") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CorrectFeedbackLayout, {
		variant: "single",
		videoSrc: getCorrectAnswerVideo(scenario.id),
		videoFailed: feedbackVideoFailed,
		fallbackText: "正向結果影片目前無法播放，仍可繼續生活旅程。",
		intro: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(choice.explanation, petName) }),
		suggestion: choice.suggestion ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(choice.suggestion, petName) }) : null,
		otherTips: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtherCorrectTips, {
			scenario,
			choice,
			petName
		}),
		onVideoEnded: () => setFeedbackVideoFinished(true),
		onVideoError: () => {
			setFeedbackVideoFailed(true);
			setFeedbackVideoFinished(true);
		},
		onContinue
	});
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "可以這樣調整：" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(choice.suggestion, petName) })]
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
	useVideoMetadataPreload(scenarioVideo?.src);
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
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoWithToggle, {
				className: "scene-video",
				src: scenarioVideo.src,
				loop: true,
				ariaLabel: scenarioVideo.label,
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
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioOptionCard, {
					onClick: () => onChoose(choice),
					children: choice.id === "assigned-helper" ? `請${backupNames.join("或")}依照事先安排的分工，協助今晚的餵食與活動。` : withPetName(choice.text, petName)
				}, choice.id);
			})
		})]
	})] });
}
function VideoScenarioActivity({ scenario, answer, petName, breed, onChoose, onCorrectComplete, resetSignal }) {
	const [mode, setMode] = (0, import_react.useState)(answer?.finalResult === "correct" ? "positive" : answer ? "incorrect" : "question");
	const [videoFailed, setVideoFailed] = (0, import_react.useState)(false);
	const [, setVideoFinished] = (0, import_react.useState)(false);
	const source = scenario.id === "arrival-adjustment" ? "/assets/pet-journey/first-day.mp4" : scenario.id === "growing-old" ? "/assets/pet-journey/senior-life.mp4" : "/assets/pet-journey/sick.mp4";
	useVideoMetadataPreload(source);
	useVideoMetadataPreload(getCorrectAnswerVideo(scenario.id));
	const selectedChoice = scenario.choices.find((choice) => choice.id === answer?.finalChoiceId);
	(0, import_react.useEffect)(() => {
		if (resetSignal <= 0) return;
		setMode("question");
		setVideoFailed(false);
		setVideoFinished(false);
	}, [resetSignal]);
	function choose(choice) {
		onChoose(choice);
		setVideoFailed(false);
		setVideoFinished(false);
		setMode(choice.result === "correct" ? "positive" : "incorrect");
	}
	if (mode === "positive" && selectedChoice) {
		const [breedKnowledge = "", followupSuggestion = ""] = (scenario.id === "illness-vet" && selectedChoice.suggestion ? healthSuggestionForBreed(breed, selectedChoice.suggestion) : "").split("\n\n");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CorrectFeedbackLayout, {
			variant: "single",
			videoSrc: getCorrectAnswerVideo(scenario.id),
			videoFailed,
			fallbackText: "正向結果影片目前無法播放，仍可繼續生活旅程。",
			intro: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(selectedChoice.explanation, petName) }),
			breedHighlight: breedKnowledge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "walking-reflection-note breed-care-reflection",
				children: withPetName(breedKnowledge, petName).split("\n").map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: line }, `${line}-${index}`))
			}) : null,
			suggestion: followupSuggestion ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(followupSuggestion, petName) }) : selectedChoice.suggestion ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(withBreedName(selectedChoice.suggestion, breed), petName) }) : null,
			otherTips: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtherCorrectTips, {
				scenario,
				choice: selectedChoice,
				petName
			}),
			onVideoEnded: () => setVideoFinished(true),
			onVideoError: () => {
				setVideoFailed(true);
				setVideoFinished(true);
			},
			onContinue: onCorrectComplete
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "video-scenario-activity",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "video-scenario-heading",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "life-stage-label",
					children: lifeStageLabelForScenario(scenario)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: withPetName(withBreedName(scenario.title, breed), petName) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(withBreedName(scenario.description, breed), petName) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "video-scenario-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "video-scenario-visual",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoWithToggle, {
					src: source,
					loop: true,
					ariaLabel: scenario.id === "arrival-adjustment" ? "小狗第一天適應新家的影片" : scenario.id === "growing-old" ? "小狗逐漸進入高齡的情境影片" : "柴犬常見健康問題觀察影片",
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(withBreedName(selectedChoice.explanation, breed), petName) }),
					selectedChoice.suggestion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "incorrect-suggestion",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "可以這樣調整：" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(withBreedName(selectedChoice.suggestion, breed), petName) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "secondary",
						onClick: () => setMode("question"),
						children: "重新選擇"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "video-scenario-options",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "你會怎麼做？" }), scenario.choices.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioOptionCard, {
					onClick: () => choose(choice),
					children: withPetName(choice.text, petName)
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
	"behavior-toileting": "/assets/pet-journey/urinate-and-defecate.mp4"
};
function DailyBehaviorActivityMulti({ answers, petName, onChooseMultiple, onContinue, resetSignal }) {
	const scenarios = dailyBehaviorScenarioIds.map((id) => lifeScenarios.find((entry) => entry.id === id)).filter((entry) => Boolean(entry));
	const firstUnfinished = scenarios.findIndex((entry) => answers[entry.id]?.finalResult !== "correct");
	const [currentIndex, setCurrentIndex] = (0, import_react.useState)(firstUnfinished === -1 ? scenarios.length - 1 : firstUnfinished);
	const [mode, setMode] = (0, import_react.useState)(firstUnfinished === -1 ? "positive" : "question");
	const [selectedIds, setSelectedIds] = (0, import_react.useState)([]);
	const [retryCopy, setRetryCopy] = (0, import_react.useState)(null);
	const [videoFailed, setVideoFailed] = (0, import_react.useState)(false);
	const [, setVideoFinished] = (0, import_react.useState)(false);
	const scenario = scenarios[currentIndex];
	const behaviorVideoSource = scenario ? dailyBehaviorVideos[scenario.id] ?? "/assets/pet-journey/chewing-on-things.mp4" : "/assets/pet-journey/chewing-on-things.mp4";
	const nextBehaviorScenario = scenarios[currentIndex + 1];
	useVideoMetadataPreload(behaviorVideoSource);
	useVideoMetadataPreload(nextBehaviorScenario ? dailyBehaviorVideos[nextBehaviorScenario.id] : void 0);
	useVideoMetadataPreload(getCorrectAnswerVideo(currentIndex));
	(0, import_react.useEffect)(() => {
		if (resetSignal <= 0) return;
		setCurrentIndex(0);
		setMode("question");
		setSelectedIds([]);
		setRetryCopy(null);
		setVideoFailed(false);
		setVideoFinished(false);
	}, [resetSignal]);
	if (!scenario) return null;
	const correctChoiceIds = scenario.requiredCorrectOptionIds ?? scenario.choices.filter((choice) => choice.result === "correct").map((choice) => choice.id);
	const wrongChoiceIds = scenario.wrongOptionIds ?? scenario.choices.filter((choice) => choice.result === "incorrect").map((choice) => choice.id);
	const correctSummary = scenario.correctSummary ?? scenario.choices.filter((choice) => correctChoiceIds.includes(choice.id)).map((choice) => choice.text);
	const correctSelectedCount = selectedIds.filter((id) => correctChoiceIds.includes(id)).length;
	const displayPetName = petName || "小狗";
	const correctIntroByScenario = {
		"behavior-barking": `面對${displayPetName}吠叫時，重點是先理解牠為什麼叫，再用合適的方式協助牠穩定下來，可以這樣做：`,
		"behavior-chewing": `${displayPetName}亂咬東西常和探索、無聊、換牙或壓力有關，先提供安全替代物並管理環境會更合適，可以這樣做：`,
		"behavior-toileting": `${displayPetName}如廁習慣需要時間建立，重點是提供固定地點、增加外出機會，並觀察是否有健康或壓力因素，可以這樣做：`
	};
	function toggleChoice(choiceId) {
		setRetryCopy(null);
		const choice = scenario.choices.find((item) => item.id === choiceId);
		if (!choice) return;
		if (wrongChoiceIds.includes(choiceId) || choice.result === "incorrect") {
			onChooseMultiple(scenario, scenario.choices.filter((item) => selectedIds.includes(item.id) || item.id === choice.id), "incorrect");
			setRetryCopy({
				title: "這個做法可能不太適合",
				explanation: choice.explanation,
				suggestion: choice.suggestion
			});
			setMode("incorrect");
			return;
		}
		const nextIds = selectedIds.includes(choiceId) ? selectedIds.filter((id) => id !== choiceId) : [...selectedIds, choiceId];
		setSelectedIds(nextIds);
		const selectedChoices = scenario.choices.filter((item) => nextIds.includes(item.id));
		const wrongChoice = selectedChoices.find((choice) => wrongChoiceIds.includes(choice.id) || choice.result === "incorrect");
		if (wrongChoice) {
			onChooseMultiple(scenario, selectedChoices, "incorrect");
			setRetryCopy({
				title: "這個做法可能不太適合",
				explanation: wrongChoice.explanation,
				suggestion: wrongChoice.suggestion
			});
			setMode("incorrect");
			return;
		}
		if (correctChoiceIds.every((id) => nextIds.includes(id))) {
			onChooseMultiple(scenario, selectedChoices, "correct");
			setVideoFailed(false);
			setVideoFinished(false);
			setMode("positive");
		}
	}
	function retry() {
		setRetryCopy(null);
		setMode("question");
	}
	function moveToNext() {
		if (currentIndex === scenarios.length - 1) {
			onContinue();
			return;
		}
		setCurrentIndex((value) => value + 1);
		setSelectedIds([]);
		setRetryCopy(null);
		setMode("question");
		setVideoFailed(false);
		setVideoFinished(false);
	}
	if (mode === "positive") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CorrectFeedbackLayout, {
		variant: "multiple",
		videoSrc: getCorrectAnswerVideo(currentIndex),
		videoFailed,
		fallbackText: "正向結果影片目前無法播放，仍可繼續生活旅程。",
		intro: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(correctIntroByScenario[scenario.id] ?? "你選到了這個情境中幾個合適的照顧方式：", petName) }),
		correctItems: correctSummary.map((item) => withPetName(item, petName)),
		onVideoEnded: () => setVideoFinished(true),
		onVideoError: () => {
			setVideoFailed(true);
			setVideoFinished(true);
		},
		onContinue: moveToNext
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoWithToggle, {
					src: behaviorVideoSource,
					loop: true,
					ariaLabel: "日常行為照顧影片",
					onError: () => setVideoFailed(true)
				}), videoFailed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "scene-video-fallback",
					role: "status",
					children: "影片暫時無法播放，請直接完成右側互動。"
				})]
			}),
			mode === "incorrect" && retryCopy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "daily-behavior-retry",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: retryCopy.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(retryCopy.explanation, petName) }),
					retryCopy.suggestion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "incorrect-suggestion",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "可以這樣調整：" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(retryCopy.suggestion, petName) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "secondary",
						onClick: retry,
						children: "重新選擇"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "reflection daily-behavior-choices",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "你會怎麼處理？（複選）" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "choice-grid",
						children: scenario.choices.map((choice) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioOptionCard, {
								type: "multiple",
								selected: selectedIds.includes(choice.id),
								onClick: () => toggleChoice(choice.id),
								children: withPetName(choice.text, petName)
							}, choice.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "daily-behavior-live-hint visible daily-behavior-progress-hint",
						role: "status",
						children: [
							"已找到 ",
							correctSelectedCount,
							" / ",
							correctChoiceIds.length,
							" 個合適做法"
						]
					})
				]
			})
		]
	});
}
function BusyCareActivity({ scenario, answer, petName, members: _members, onMembersChange: _onMembersChange, onChoose, onContinue, resetSignal }) {
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
	(0, import_react.useEffect)(() => {
		if (resetSignal <= 0) return;
		setMode("question");
		setFamilyFeedback(null);
		setVideoFailed(false);
		setVideoFinished(false);
	}, [resetSignal]);
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
	if (mode === "positive" && selectedChoice) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CorrectFeedbackLayout, {
		variant: "single",
		videoSrc: getCorrectAnswerVideo(scenario.id),
		videoFailed,
		fallbackText: "正向結果影片目前無法播放，仍可繼續生活旅程。",
		intro: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(selectedChoice.explanation, petName) }),
		otherTips: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtherCorrectTips, {
			scenario,
			choice: selectedChoice,
			petName
		}),
		suggestion: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
			"事先確認與交接，能讓",
			petName || "小狗",
			"在你忙碌時仍獲得餵食、飲水、排泄照顧與陪伴。"
		] }),
		onVideoEnded: () => setVideoFinished(true),
		onVideoError: () => {
			setVideoFailed(true);
			setVideoFinished(true);
		},
		onContinue
	}, scenario.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "busy-care-activity",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "busy-care-heading",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "life-stage-label",
					children: lifeStageLabelForScenario(scenario)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: scenario.title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(scenario.description, petName) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "busy-care-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "busy-care-room",
				"aria-label": "小狗在房間中等待照顧的情境",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "busy-care-room-background",
					src: "/assets/room/empty-room.png",
					alt: "居家房間場景"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "busy-care-hungry-dog",
					src: "/assets/pet-journey/shiba-hungry.png",
					alt: `${petName}趴在房間裡等待照顧`
				})]
			}), mode === "family" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "busy-care-members",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "先確認家人是否真的能協助" }) }),
					!familyFeedback && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "busy-care-member-list busy-care-family-options",
						children: familyOptions.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioOptionCard, {
							onClick: () => setFamilyFeedback({
								name: member.name,
								reason: member.reason
							}),
							children: member.label
						}, member.id))
					}),
					familyFeedback && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "busy-care-family-feedback",
						role: "alert",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [familyFeedback.name, "目前不適合協助"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(familyFeedback.reason, petName) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "busy-care-member-actions",
						children: [familyFeedback && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "secondary",
							onClick: () => setFamilyFeedback(null),
							children: "選擇其他家庭成員"
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
				className: "busy-care-feedback incorrect busy-care-feedback--standard",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "這個做法可能不太適合" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(selectedChoice.explanation, petName) }),
					selectedChoice.suggestion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "incorrect-suggestion",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "可以這樣調整：" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(selectedChoice.suggestion, petName) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "secondary",
						onClick: () => setMode("question"),
						children: "重新選擇"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "busy-care-options",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "你會怎麼安排？" }), scenario.choices.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioOptionCard, {
					onClick: () => choose(choice),
					children: withPetName(choice.text, petName)
				}, choice.id))]
			})]
		})]
	});
}
function BreedChallengeActivity({ breed, petName, answers, onChoose, onContinue, resetSignal }) {
	const scenarios = getBreedChallengeScenarios(breed);
	const firstUnfinished = scenarios.findIndex((scenario) => answers[scenario.id]?.finalResult !== "correct");
	const [currentIndex, setCurrentIndex] = (0, import_react.useState)(firstUnfinished === -1 ? scenarios.length - 1 : firstUnfinished);
	const [mode, setMode] = (0, import_react.useState)(firstUnfinished === -1 ? "positive" : "question");
	const [feedbackVideoFailed, setFeedbackVideoFailed] = (0, import_react.useState)(false);
	const scenario = scenarios[currentIndex];
	const selectedChoice = scenario?.choices.find((choice) => choice.id === answers[scenario.id]?.finalChoiceId);
	const breedLabel = breedLabelForId(breed);
	(0, import_react.useEffect)(() => {
		if (resetSignal <= 0) return;
		setCurrentIndex(0);
		setMode("question");
		setFeedbackVideoFailed(false);
	}, [resetSignal]);
	if (!scenario) return null;
	function choose(choice) {
		setFeedbackVideoFailed(false);
		onChoose(scenario, choice);
		setMode(choice.result === "correct" ? "positive" : "incorrect");
	}
	function moveToNext() {
		if (currentIndex >= scenarios.length - 1) {
			onContinue();
			return;
		}
		setCurrentIndex((current) => current + 1);
		setMode("question");
		setFeedbackVideoFailed(false);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	if (mode === "positive" && selectedChoice) {
		const breedKnowledge = scenario.breedKnowledge ?? `${scenario.description} ${selectedChoice.explanation}`;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CorrectFeedbackLayout, {
			variant: "single",
			videoSrc: getCorrectAnswerVideo(scenario.id),
			videoFailed: feedbackVideoFailed,
			fallbackText: "正向結果影片目前無法播放，仍可繼續。",
			intro: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(selectedChoice.explanation, petName) }),
			breedHighlight: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreedKnowledgeHighlight, { text: withPetName(breedKnowledge, petName) }),
			onVideoError: () => setFeedbackVideoFailed(true),
			onContinue: moveToNext
		}, scenario.id);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "breed-challenge-activity",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "breed-challenge-heading",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [breedLabel, "的考驗"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "先把最容易被可愛外表蓋過去的生活份量，放進你的真實日常裡想一遍。" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "breed-challenge-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "breed-challenge-video-placeholder",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "影片製作中" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: scenario.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "情境影片將於後續補上。" })
				]
			}), mode === "incorrect" && selectedChoice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "breed-challenge-retry",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "這個想法很常見，但可能還不夠" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(selectedChoice.explanation, petName) }),
					selectedChoice.suggestion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "incorrect-suggestion",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "可以這樣調整：" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(selectedChoice.suggestion, petName) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "secondary",
						onClick: () => setMode("question"),
						children: "重新想一次"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "breed-challenge-options",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: scenario.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: withPetName(scenario.description, petName) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: scenario.choices.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioOptionCard, {
						onClick: () => choose(choice),
						children: withPetName(choice.text, petName)
					}, choice.id)) })
				]
			})]
		})]
	});
}
function ArrivalMealActivity({ activity, petName, onChange, onAddExpense, onContinue }) {
	const complete = activity.arrivalMealFoodReady && activity.arrivalMealWaterReady;
	const hasRecordedMeal = (0, import_react.useRef)(false);
	const [foodWarning, setFoodWarning] = (0, import_react.useState)(null);
	const [unsafeFoodIds, setUnsafeFoodIds] = (0, import_react.useState)([]);
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
		setUnsafeFoodIds((current) => current.includes(kind) ? current : [...current, kind]);
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
						children: lifeStageLabels.arrival
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
				className: `arrival-meal-supplies ${activity.arrivalMealFoodReady && activity.arrivalMealWaterReady ? "mobile-condensed" : ""}`,
				"aria-label": "晚餐用品",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "arrival-meal-supply-slot",
						children: !activity.arrivalMealFoodReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "arrival-meal-supply-food-button",
							onClick: prepareFood,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "arrival-meal-supply-food",
								src: "/assets/room/food.png",
								alt: "飼料"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "飼料" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "arrival-meal-supply-placeholder",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "arrival-meal-supply-slot",
						children: !activity.arrivalMealWaterReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: prepareWater,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/pet-journey/waterbottle.png",
								alt: "水瓶"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "水" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "arrival-meal-supply-placeholder",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: unsafeFoodIds.includes("macadamia") ? "arrival-meal-unsafe warning" : "arrival-meal-unsafe",
						onClick: () => warnUnsafeFood("macadamia"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "unsafe-food-visual",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/pet-journey/macadamia-nuts.png",
								alt: "夏威夷豆"
							}), unsafeFoodIds.includes("macadamia") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
								"aria-hidden": "true",
								children: "🚫"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "夏威夷豆" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: unsafeFoodIds.includes("bones") ? "arrival-meal-unsafe warning" : "arrival-meal-unsafe",
						onClick: () => warnUnsafeFood("bones"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "unsafe-food-visual",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/pet-journey/leftover-bones.png",
								alt: "吃剩的骨頭"
							}), unsafeFoodIds.includes("bones") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
								"aria-hidden": "true",
								children: "🚫"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "吃剩的骨頭" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "arrival-meal-scene",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "arrival-meal-room arrival-meal-room--desktop",
						src: "/assets/room/empty-room.png",
						alt: "小狗的新家房間"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "arrival-meal-room arrival-meal-room--mobile",
						src: "/assets/room/empty-room-mobile.png",
						alt: "小狗的新家房間"
					}),
					foodWarning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "arrival-meal-warning",
						role: "alert",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "arrival-meal-warning-close",
								onClick: () => setFoodWarning(null),
								"aria-label": "關閉不適合食物提示",
								children: "×"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: foodWarning.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: foodWarning.text })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "arrival-meal-dog",
						style: arrivalMealPlacementStyle("dog"),
						src: complete ? "/assets/pet-journey/shiba-dog.png" : "/assets/pet-journey/shiba-sad.png",
						alt: complete ? `${petName}開心地坐在房間裡` : `${petName}還在等待晚餐與飲水`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "arrival-meal-water",
						style: arrivalMealPlacementStyle("water"),
						src: activity.arrivalMealWaterReady ? "/assets/room/water-bowl.png" : "/assets/pet-journey/empty-water-bowl.png",
						alt: activity.arrivalMealWaterReady ? "裝好水的水碗" : "空水碗"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "arrival-meal-food",
						style: arrivalMealPlacementStyle("food"),
						src: activity.arrivalMealFoodReady ? "/assets/room/food-bowl.png" : "/assets/pet-journey/empty-food-bowl.png",
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
var walkingPrepNotes = {
	leash: "外出時維持安全距離，避免走失或衝突。",
	bag: "散步時清理排泄物，是對環境與他人的責任。",
	water: "天氣熱或散步時間較長時，幫狗狗補充飲水。"
};
var walkingStep = 7;
function lerp(start, end, progress) {
	return start + (end - start) * progress;
}
var walkingScenePaths = {
	0: {
		turnAt: .55,
		start: {
			x: 8,
			y: 50,
			scale: 1
		},
		turn: {
			x: 45,
			y: 50,
			scale: 1
		},
		end: {
			x: 42,
			y: 20,
			scale: .4
		}
	},
	1: {
		turnAt: .5,
		start: {
			x: 8,
			y: 50,
			scale: 1
		},
		turn: {
			x: 29,
			y: 32.5,
			scale: .8
		},
		end: {
			x: 50,
			y: 15,
			scale: .6
		}
	},
	3: {
		turnAt: .55,
		start: {
			x: 5,
			y: 10,
			scale: .3
		},
		turn: {
			x: 15,
			y: 50,
			scale: 1
		},
		end: {
			x: 45,
			y: 50,
			scale: 1
		}
	}
};
var walkingSceneCompletionAt = { 1: 80 };
function getWalkingCompletionPosition(sceneIndex) {
	return walkingSceneCompletionAt[sceneIndex] ?? 100;
}
function getWalkingCharacterStyle(sceneIndex, position) {
	const path = walkingScenePaths[sceneIndex];
	const completionPosition = getWalkingCompletionPosition(sceneIndex);
	if (!path) return {
		"--walk-left": `${Math.min(78, 5 + position * .73)}%`,
		"--walk-bottom": "2%",
		"--walk-translate-y": "0",
		"--walk-scale": 1
	};
	const progress = Math.max(0, Math.min(1, position / completionPosition));
	const { turnAt, start, turn, end } = path;
	const segmentProgress = progress <= turnAt ? progress / turnAt : (progress - turnAt) / (1 - turnAt);
	const from = progress <= turnAt ? start : turn;
	const to = progress <= turnAt ? turn : end;
	return {
		"--walk-left": `${lerp(from.x, to.x, segmentProgress)}%`,
		"--walk-top": `${lerp(from.y, to.y, segmentProgress)}%`,
		"--walk-bottom": "auto",
		"--walk-translate-y": "-50%",
		"--walk-scale": lerp(from.scale, to.scale, segmentProgress)
	};
}
function WalkingActivity({ activity, petName, onChange, onAddExpense, onContinue, resetSignal }) {
	const [started, setStarted] = (0, import_react.useState)(activity.walkingMinutes > 0 || activity.walkingComplete);
	const [safetyStep, setSafetyStep] = (0, import_react.useState)(activity.walkingMinutes > 0 || activity.walkingComplete ? "prepared" : "question");
	const [position, setPosition] = (0, import_react.useState)(0);
	const [moving, setMoving] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const completingSceneRef = (0, import_react.useRef)(null);
	const movingTimerRef = (0, import_react.useRef)(null);
	const forwardIntervalRef = (0, import_react.useRef)(null);
	const sceneRef = (0, import_react.useRef)(null);
	const poopTargetRef = (0, import_react.useRef)(null);
	const draggingBagRef = (0, import_react.useRef)(false);
	const forwardHeldRef = (0, import_react.useRef)(false);
	const [draggedBag, setDraggedBag] = (0, import_react.useState)(null);
	const sceneIndex = Math.min(activity.walkingSceneIndex, walkingScenes.length - 1);
	const scene = walkingScenes[sceneIndex];
	const prepared = activity.walkingPreparedItems;
	const allPrepared = walkingPrepItems.every((item) => prepared.includes(item.id));
	const needsCleanup = started && scene.poopEvent && position >= 50 && !activity.walkingPoopCleaned;
	const progressMinutes = Math.min(20, activity.walkingMinutes);
	const walkingInstruction = "按住「往前走」，陪牠一步一步往前走。散步不只是運動，也是牠探索環境、放鬆心情和練習與世界相處的時間。";
	const walkingEventMessage = scene.poopEvent && position >= 50 ? activity.walkingPoopCleaned ? {
		title: "做得很好！",
		body: "散步時清理排泄物，也是照顧責任的一部分。"
	} : {
		title: "散步中的小事件",
		body: "牠在路上排泄了，先停下來幫牠清理乾淨，再繼續往前走。"
	} : null;
	(0, import_react.useEffect)(() => {
		walkingPreloadImages.forEach((src) => {
			const image = new Image();
			image.src = src;
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (resetSignal <= 0) return;
		setStarted(false);
		setSafetyStep("question");
		setPosition(0);
		setMoving(false);
		setMessage("");
		setDraggedBag(null);
		draggingBagRef.current = false;
		forwardHeldRef.current = false;
		completingSceneRef.current = null;
	}, [resetSignal]);
	(0, import_react.useEffect)(() => {
		setPosition(0);
		setMoving(false);
		if (forwardIntervalRef.current !== null) {
			window.clearInterval(forwardIntervalRef.current);
			forwardIntervalRef.current = null;
		}
		draggingBagRef.current = false;
		setDraggedBag(null);
		completingSceneRef.current = null;
	}, [activity.walkingSceneIndex]);
	(0, import_react.useEffect)(() => {
		if (needsCleanup || activity.walkingComplete) stopForward();
	}, [needsCleanup, activity.walkingComplete]);
	(0, import_react.useEffect)(() => () => {
		if (movingTimerRef.current !== null) window.clearTimeout(movingTimerRef.current);
		if (forwardIntervalRef.current !== null) window.clearInterval(forwardIntervalRef.current);
	}, []);
	function prepare(id) {
		if (prepared.includes(id)) return;
		if (id === "bag") onAddExpense("monthly-waste-bags");
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
		setMessage("");
	}
	function completeWalkingScene(completedIndex) {
		if (completingSceneRef.current === completedIndex) return;
		completingSceneRef.current = completedIndex;
		stopForward(false);
		const complete = completedIndex >= walkingScenes.length - 1;
		onChange({
			walkingMinutes: Math.min(20, activity.walkingMinutes + 5),
			walkingSceneIndex: complete ? completedIndex : completedIndex + 1,
			walkingComplete: complete
		});
		setMessage(complete ? "散步時間達到 20 分鐘！" : `完成「${walkingScenes[completedIndex].title}」，散步時間 +5 分鐘。`);
	}
	const advanceWalk = (0, import_react.useCallback)(() => {
		if (!started || activity.walkingComplete) return;
		if (needsCleanup) {
			setMessage("先把排泄物清理乾淨，再繼續散步。");
			setMoving(false);
			return;
		}
		const completionPosition = getWalkingCompletionPosition(sceneIndex);
		setMoving(true);
		if (movingTimerRef.current !== null) window.clearTimeout(movingTimerRef.current);
		movingTimerRef.current = window.setTimeout(() => setMoving(false), 180);
		setPosition((current) => {
			if (scene.poopEvent && current >= 50 && !activity.walkingPoopCleaned) {
				setMoving(false);
				return 50;
			}
			const next = Math.min(completionPosition, current + walkingStep);
			if (next >= completionPosition && current < completionPosition && completingSceneRef.current !== sceneIndex) completeWalkingScene(sceneIndex);
			return next;
		});
	}, [
		activity.walkingComplete,
		activity.walkingPoopCleaned,
		activity.walkingMinutes,
		needsCleanup,
		onChange,
		scene.poopEvent,
		sceneIndex,
		started
	]);
	function stopForward(releaseHold = true) {
		if (releaseHold) forwardHeldRef.current = false;
		if (forwardIntervalRef.current !== null) {
			window.clearInterval(forwardIntervalRef.current);
			forwardIntervalRef.current = null;
		}
		setMoving(false);
	}
	function startForward() {
		if (!started || activity.walkingComplete || needsCleanup) {
			if (needsCleanup) setMessage("先把排泄物清理乾淨，再繼續散步。");
			return;
		}
		forwardHeldRef.current = true;
		advanceWalk();
		if (forwardIntervalRef.current !== null) window.clearInterval(forwardIntervalRef.current);
		forwardIntervalRef.current = window.setInterval(advanceWalk, 170);
	}
	(0, import_react.useEffect)(() => {
		if (!forwardHeldRef.current || !started || needsCleanup || activity.walkingComplete) return;
		startForward();
	}, [activity.walkingSceneIndex]);
	const draggedBagSize = 74;
	function getDraggedBagPosition(event) {
		const sceneRect = sceneRef.current?.getBoundingClientRect();
		if (!sceneRect) return null;
		return {
			x: event.clientX - sceneRect.left - draggedBagSize / 2,
			y: event.clientY - sceneRect.top - draggedBagSize / 2
		};
	}
	function startDraggingBag(event) {
		if (!needsCleanup) return;
		event.preventDefault();
		event.currentTarget.setPointerCapture?.(event.pointerId);
		const nextPosition = getDraggedBagPosition(event);
		if (nextPosition) {
			draggingBagRef.current = true;
			setDraggedBag(nextPosition);
		}
	}
	function dragBag(event) {
		if (!draggingBagRef.current) return;
		event.preventDefault();
		const nextPosition = getDraggedBagPosition(event);
		if (nextPosition) setDraggedBag(nextPosition);
	}
	function finishDraggingBag(event) {
		if (!draggingBagRef.current) return;
		event.preventDefault();
		event.currentTarget.releasePointerCapture?.(event.pointerId);
		const finalBagPosition = getDraggedBagPosition(event) ?? draggedBag;
		if (!finalBagPosition) {
			draggingBagRef.current = false;
			setDraggedBag(null);
			return;
		}
		const sceneRect = sceneRef.current?.getBoundingClientRect();
		const poopRect = poopTargetRef.current?.getBoundingClientRect();
		const tolerance = 58;
		const bagRect = {
			left: finalBagPosition.x,
			top: finalBagPosition.y,
			right: finalBagPosition.x + draggedBagSize,
			bottom: finalBagPosition.y + draggedBagSize,
			centerX: finalBagPosition.x + draggedBagSize / 2,
			centerY: finalBagPosition.y + draggedBagSize / 2
		};
		const hitPoop = sceneRect && poopRect ? bagRect.centerX >= poopRect.left - sceneRect.left - tolerance && bagRect.centerX <= poopRect.right - sceneRect.left + tolerance && bagRect.centerY >= poopRect.top - sceneRect.top - tolerance && bagRect.centerY <= poopRect.bottom - sceneRect.top + tolerance || bagRect.right >= poopRect.left - sceneRect.left - tolerance && bagRect.left <= poopRect.right - sceneRect.left + tolerance && bagRect.bottom >= poopRect.top - sceneRect.top - tolerance && bagRect.top <= poopRect.bottom - sceneRect.top + tolerance : false;
		draggingBagRef.current = false;
		setDraggedBag(null);
		if (hitPoop) cleanupPoop();
	}
	function cancelDraggingBag() {
		draggingBagRef.current = false;
		setDraggedBag(null);
	}
	function cleanupPoop() {
		stopForward();
		draggingBagRef.current = false;
		setDraggedBag(null);
		onChange({ walkingPoopCleaned: true });
		setMessage("已清理完成，繼續陪牠往前走。");
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "walking-reflection-note",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "把一次散步，想成十多年的日常" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "遛狗不是今天完成就結束的任務。晴天、下雨、疲累或工作忙碌時，排泄、嗅聞、活動與安全仍會每天回來。請想一想：你願意為這段反覆出現的時間，長期保留多少生活空間？" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DelayedContinueButton, {
					label: "繼續生活旅程",
					onContinue
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "walking-activity",
		"aria-label": "今天也要出門散步",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "walking-head",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "life-stage-label",
					children: lifeStageLabels.daily
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "今天也要出門散步" }),
				!started && safetyStep === "question" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "出門前，先選出你認為能兼顧安全與探索的散步方式。" }),
				!started && safetyStep !== "question" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "一天的照顧不只是在家餵食和陪伴，狗狗也需要規律外出活動。散步能讓牠探索環境、消耗體力、練習社會化，也有機會完成排泄。" })
			] })
		}), !started ? safetyStep === "question" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "walking-safety-choice",
			"aria-labelledby": "walking-safety-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "walking-safety-title",
				children: "你會用哪一種方式陪牠散步？"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "walking-safety-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setSafetyStep("prepared"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/assets/walking/leash-choice.png",
						alt: "飼主使用胸背與牽繩，保持鬆繩讓柴犬嗅聞環境"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "繫好牽繩，保持鬆弛" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "讓狗狗在可控距離內嗅聞、探索環境。" })] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setSafetyStep("law"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/assets/walking/off-leash-choice.png",
						alt: "沒有牽繩的柴犬離飼主一段距離自行探索"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "不繫牽繩，讓牠自己走" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "讓狗狗自由自在探索，飼主在後方跟著。" })] })]
				})]
			})]
		}) : safetyStep === "law" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "walking-law-feedback",
			"aria-live": "polite",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: "!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "life-stage-label",
					children: "外出安全與法規提醒"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "自由探索，也需要有能立即保護牠的距離" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "《動物保護法》第 20 條要求寵物出入公共場所時須有人伴同；各縣市也可能以自治規範要求使用牽繩、箱籠或其他適當防護措施。外出前應查明所在地規定。" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "即使在沒有明確禁止的地點，牽繩仍能降低走失、突然衝向車道、驚嚇他人或與其他動物衝突的風險。保持牽繩鬆弛，狗狗仍然可以嗅聞和探索。" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "secondary",
					onClick: () => setSafetyStep("question"),
					children: "回去重新選擇"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "walking-prep",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "walking-prep-supplies",
				"aria-label": "出門前準備用品",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "出門前，先確認這些東西" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "walking-safety-confirmed",
						children: "✓ 已選擇牽繩陪伴，讓探索保持在安全範圍內。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "walking-prep-list",
						children: walkingPrepItems.map((item) => {
							const done = prepared.includes(item.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: done ? "prepared" : "",
								"aria-pressed": done,
								onClick: () => prepare(item.id),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: item.image,
										alt: item.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: walkingPrepNotes[item.id] })
								]
							}, item.id);
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "walking-prep-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "準備好再出門" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "確認牽繩、撿便袋和水都準備好後，就可以陪牠走一段 20 分鐘的散步路線。路上如果牠排泄，也要記得停下來清理。" }),
					message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "walking-message",
						role: "alert",
						children: message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "walking-prep-actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "primary",
							disabled: !allPrepared,
							onClick: startWalk,
							children: ["開始散步 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
						})
					})
				]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "walking-game",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "walking-game-hint",
				children: walkingInstruction
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `walking-scene ${moving ? "is-moving" : ""}`,
				ref: sceneRef,
				tabIndex: 0,
				"aria-label": "散步場景，按往前走按鈕前進",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "walking-bg",
						src: scene.image,
						alt: scene.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "walking-progress walking-progress-overlay",
						"aria-label": `散步進度 ${progressMinutes} / 20 分鐘`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "散步進度" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${progressMinutes / 20 * 100}%` } }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [progressMinutes, " / 20 分鐘"] })
						]
					}),
					walkingEventMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "walking-event-card",
						role: "status",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: walkingEventMessage.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: walkingEventMessage.body }),
							needsCleanup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "walking-drag-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: `walking-drag-bag ${draggedBag ? "is-source-dragging" : ""}`,
									onPointerDown: startDraggingBag,
									onPointerMove: dragBag,
									onPointerUp: finishDraggingBag,
									onPointerCancel: cancelDraggingBag,
									"aria-label": "拖曳撿便袋清理排泄物",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/assets/walking/poop-bag-1.png",
										alt: ""
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "walking-drag-instruction",
									children: "拖曳撿便袋到便便的位置完成清理。"
								})]
							})
						]
					}),
					draggedBag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "walking-drag-bag-ghost",
						src: "/assets/walking/poop-bag-1.png",
						alt: "",
						"aria-hidden": "true",
						style: {
							left: draggedBag.x,
							top: draggedBag.y
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "walking-character",
						style: getWalkingCharacterStyle(sceneIndex, position),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: activity.walkingPoopCleaned ? "/assets/walking/walker-dog-bag.png" : needsCleanup ? "/assets/walking/walker-and-dog-poop.png" : "/assets/walking/walker-and-dog.png",
							alt: `正在和${petName}散步的人物與小狗`
						}), needsCleanup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "walking-poop",
							ref: poopTargetRef,
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/walking/poop.png",
								alt: ""
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "walking-forward-button",
						disabled: needsCleanup,
						onPointerDown: (event) => {
							event.preventDefault();
							event.currentTarget.setPointerCapture?.(event.pointerId);
							startForward();
						},
						onPointerUp: (event) => {
							event.currentTarget.releasePointerCapture?.(event.pointerId);
							stopForward();
						},
						onPointerCancel: () => stopForward(),
						"aria-label": "往前走",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "walking-forward-orb",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 24 24",
								focusable: "false",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 11.2V4.8a1.7 1.7 0 1 1 3.4 0v5.4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11.4 10V8.3a1.55 1.55 0 1 1 3.1 0v2.3" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14.5 10.7V9.4a1.45 1.45 0 1 1 2.9 0v2.4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.4 12.2v-1a1.35 1.35 0 1 1 2.7 0v4.1c0 3.3-2.3 5.7-6.1 5.7h-1.6c-2.2 0-3.7-.9-4.9-2.5l-3-4.1a1.7 1.7 0 0 1 2.6-2.1l1.1 1.1" })
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "walking-forward-label",
							children: "往前走"
						})]
					})
				]
			})]
		})]
	});
}
function LifeJourney({ index, petName, breed, answers, activity, completedIds, expenses, backupNames, members, roomReady, onIndex, onChoose, onChooseMultiple, onMembersChange, onActivityChange, onCompleteItem, onAddExpense, onStageChange, onBack, onComplete }) {
	const item = journeyItems[index];
	const scenario = item.scenarioId ? lifeScenarios.find((entry) => entry.id === item.scenarioId) : void 0;
	const answer = scenario ? answers[scenario.id] : void 0;
	const isDailyBehaviorActivity = item.id === "behavior";
	const isWalkingActivity = item.id === "walking";
	const isBreedChallengeActivity = item.id === "breed-challenge";
	const isBusyCareActivity = item.id === "busy-care" && scenario?.id === "busy-daily-care";
	const isVideoFeedbackScenario = scenario?.id === "arrival-adjustment" || scenario?.id === "illness-vet" || scenario?.id === "growing-old";
	const [arrivalMealOpen, setArrivalMealOpen] = (0, import_react.useState)(false);
	const showArrivalMeal = scenario?.id === "arrival-adjustment" && answer?.finalResult === "correct" && arrivalMealOpen;
	const [feedbackOpen, setFeedbackOpen] = (0, import_react.useState)(Boolean(answer));
	const [timePassOpen, setTimePassOpen] = (0, import_react.useState)(false);
	const [resetSignal, setResetSignal] = (0, import_react.useState)(0);
	const [resetItemId, setResetItemId] = (0, import_react.useState)(null);
	const [replayInProgress, setReplayInProgress] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setTimePassOpen(false);
		setArrivalMealOpen(false);
		setReplayInProgress(false);
	}, [index]);
	completedIds.length;
	function selectItem(next) {
		const nextScenarioId = journeyItems[next].scenarioId;
		setFeedbackOpen(Boolean(nextScenarioId && answers[nextScenarioId]));
		setReplayInProgress(false);
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
	function resetCurrentQuestion() {
		setFeedbackOpen(false);
		setArrivalMealOpen(false);
		setTimePassOpen(false);
		if (isWalkingActivity) onActivityChange({
			walkingPreparedItems: [],
			walkingSceneIndex: 0,
			walkingMinutes: 0,
			walkingPoopCleaned: false,
			walkingComplete: false
		});
		setReplayInProgress(true);
		setResetItemId(item.id);
		setResetSignal((current) => current + 1);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	const canResetCurrent = completedIds.includes(item.id) && !replayInProgress;
	const currentResetSignal = resetItemId === item.id ? resetSignal : 0;
	function handleReplay() {
		if (canResetCurrent) resetCurrentQuestion();
	}
	if (timePassOpen && item.scenarioId === "illness-vet") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimePassTransition, { onComplete: () => {
		onActivityChange({ sickTimePassComplete: true });
		setTimePassOpen(false);
		selectItem(index + 1);
	} });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `content-wrap life-journey-page ${canResetCurrent ? "is-reviewing" : ""}`,
		children: [
			isDailyBehaviorActivity ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyBehaviorActivityMulti, {
				answers,
				petName,
				onChooseMultiple,
				onContinue: continueJourney,
				resetSignal: currentResetSignal
			}) : isWalkingActivity ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalkingActivity, {
				activity,
				petName,
				onChange: onActivityChange,
				onAddExpense,
				onContinue: continueJourney,
				resetSignal: currentResetSignal
			}) : isBreedChallengeActivity ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreedChallengeActivity, {
				breed,
				petName,
				answers,
				onChoose,
				onContinue: continueJourney,
				resetSignal: currentResetSignal
			}) : isBusyCareActivity && scenario ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusyCareActivity, {
				scenario,
				answer,
				petName,
				members,
				onMembersChange,
				onChoose: choose,
				onContinue: continueJourney,
				resetSignal: currentResetSignal
			}) : isVideoFeedbackScenario && scenario && !showArrivalMeal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoScenarioActivity, {
				scenario,
				answer,
				petName,
				breed,
				onChoose: choose,
				onCorrectComplete: () => {
					if (scenario.id === "arrival-adjustment") setArrivalMealOpen(true);
					else continueJourney();
				},
				resetSignal: currentResetSignal
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
			canResetCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scenario-bottom-nav life-bottom-nav",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "secondary",
					onClick: handleReplay,
					children: "↻ 再玩一次"
				})
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: title }), body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: body })]
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
function getLifeStageRanges(breed) {
	return [
		{
			label: "接回家",
			start: 0,
			end: 0
		},
		{
			label: "日常照護",
			start: 1,
			end: 2
		},
		{
			label: `${breeds.find((item) => item.id === breed)?.label ?? "品種"}的考驗`,
			start: 3,
			end: 3
		},
		{
			label: "生活變化",
			start: 4,
			end: 6
		}
	];
}
function statusAt(index, current, reached) {
	if (index === current) return "current";
	if (index <= reached) return "completed";
	return "locked";
}
function StageRail({ step, furthestStep, selectionPage, selectionReached, preparationTask, preparationReached, lifePhase, breed, journeyIndex, journeyCompleted, onGoTo, onSelectionPage, onPreparationTask, onLifeStage }) {
	const lifeStageRanges = getLifeStageRanges(breed);
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
			children: [
				"選擇物種",
				"選擇品種",
				"替牠取名",
				"過往經驗",
				"新的開始"
			].map((label, index) => ({
				id: [
					"species",
					"breed",
					"name",
					"history",
					"transition"
				][index],
				label,
				status: step > 1 && index <= selectionReached ? "completed" : statusAt(index, {
					species: 0,
					breed: 1,
					name: 2,
					history: 3,
					transition: 4
				}[selectionPage], selectionReached),
				onClick: () => onSelectionPage([
					"species",
					"breed",
					"name",
					"history",
					"transition"
				][index])
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
				status: step > 2 && index <= preparationReached ? "completed" : statusAt(index, preparationTask, preparationReached),
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
		},
		{
			id: "legal-acquisition",
			number: "05",
			label: "取得寵物",
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
					disabled: item.status === "locked",
					onClick: item.onClick,
					"aria-current": item.status === "current" ? "step" : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.status === "completed" ? "✓" : item.number }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: item.label })]
				}), item.children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "nav-children",
					children: item.children.map((child, childIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `nav-child ${child.status}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							disabled: child.status === "locked",
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
			"aria-label": `目前在第 ${currentMain + 1} 站：${navigation[currentMain].label}。點擊查看完整進度`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mobile-progress-copy",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
						navigation[currentMain].number,
						" ",
						navigation[currentMain].label
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mobile-progress-track",
					role: "img",
					"aria-label": `共 ${navigation.length} 站，目前在第 ${currentMain + 1} 站：${navigation[currentMain].label}`,
					children: navigation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `mobile-progress-step ${item.status}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "visually-hidden",
							children: [
								item.label,
								"：",
								item.status === "completed" ? "已完成" : item.status === "current" ? "目前位置" : "尚未開始"
							]
						})]
					}, `mobile-${item.id}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mobile-progress-toggle",
					"aria-hidden": "true"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-label": "體驗進度",
			children: renderNavigation()
		})]
	})] });
}
function Welcome({ onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "welcome",
		"aria-label": "伴日子新手村封面",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "welcome-hero-copy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
					"伴日子",
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
function SpeciesStep({ selectionPage, onSelectionPage, category, breed, petName, onCategory, onBreed, onPetName, hasPreviousDog, previousBreed, previousDogName, onHasPreviousDog, onPreviousBreed, onPreviousDogName, onNext }) {
	const selectedBreed = breeds.find((item) => item.id === breed);
	const selectedPreviousBreed = breeds.find((item) => item.id === previousBreed);
	const breedCarouselRef = (0, import_react.useRef)(null);
	const breedScrollTimerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => () => {
		if (breedScrollTimerRef.current) window.clearTimeout(breedScrollTimerRef.current);
	}, []);
	function chooseCategory(id) {
		onCategory(id);
		onBreed("");
		onSelectionPage("breed");
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function syncBreedFromCarousel() {
		const container = breedCarouselRef.current;
		if (!container) return;
		const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;
		const centered = Array.from(container.querySelectorAll("[data-breed-id]")).reduce((closest, card) => {
			const rect = card.getBoundingClientRect();
			const distance = Math.abs(rect.left + rect.width / 2 - containerCenter);
			const id = card.dataset.breedId ?? "";
			if (!id || closest && closest.distance <= distance) return closest;
			return {
				id,
				distance
			};
		}, null);
		if (centered && centered.id !== breed) onBreed(centered.id);
	}
	function handleBreedCarouselScroll() {
		if (breedScrollTimerRef.current) window.clearTimeout(breedScrollTimerRef.current);
		breedScrollTimerRef.current = window.setTimeout(syncBreedFromCarousel, 120);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "content-wrap partner-picker",
		children: selectionPage === "species" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "partner-selection-page",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, { title: "你想領養哪一種動物？" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
		}, "species") : selectionPage === "breed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "partner-selection-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, { title: "選擇你想領養的品種" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "breed-row breed-page-grid breed-carousel",
					ref: breedCarouselRef,
					onScroll: handleBreedCarouselScroll,
					"aria-label": "品種橫向滑動選擇",
					children: breeds.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						"data-breed-id": item.id,
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
					onNext: () => onSelectionPage("name"),
					disabled: !breed,
					nextLabel: "下一步"
				})
			]
		}, "breed") : selectionPage === "name" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "partner-selection-page pet-naming-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
					title: "先幫牠取一個名字",
					body: "這個名字會陪著牠走進接下來的生活，也會出現在後面的情境演練裡。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pet-naming-stage",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/assets/room/nameplate.png",
							alt: "小狗名字吊牌"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "new-pet-name",
							className: "sr-only",
							children: "小狗的名字"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "new-pet-name",
							value: petName,
							maxLength: 12,
							placeholder: "請輸入小狗的名字",
							onChange: (event) => onPetName(event.target.value),
							autoComplete: "off",
							autoCorrect: "off",
							autoCapitalize: "off",
							spellCheck: false,
							autoFocus: true
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButtons, {
					onBack: () => onSelectionPage("breed"),
					onNext: () => onSelectionPage("history"),
					disabled: !petName.trim(),
					nextLabel: "下一步"
				})
			]
		}, "name") : selectionPage === "history" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "partner-selection-page previous-dog-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
					title: "你以前有養過狗嗎？",
					body: "過去的經驗很珍貴，也可能讓我們自然沿用熟悉的照顧方式。先簡單告訴我們，你是否曾經和狗狗一起生活。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "previous-dog-choice",
					role: "group",
					"aria-label": "是否曾經養過狗",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: hasPreviousDog === true ? "selected" : "",
						"aria-pressed": hasPreviousDog === true,
						onClick: () => onHasPreviousDog(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "有，曾經有養過狗" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "接著填寫牠的品種與名字" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: hasPreviousDog === false ? "selected" : "",
						"aria-pressed": hasPreviousDog === false,
						onClick: () => onHasPreviousDog(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "沒有，這是第一次" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "直接開始這次的領養前準備" })]
					})]
				}),
				hasPreviousDog === true && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "previous-dog-details",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "life-stage-label",
							children: "以前陪伴你的狗狗"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "牠是哪一個品種？" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "breed-row previous-breed-grid",
							children: breeds.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: previousBreed === item.id ? "selected" : "",
								onClick: () => onPreviousBreed(item.id),
								"aria-pressed": previousBreed === item.id,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										className: "partner-card-image",
										src: item.image,
										alt: ""
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label }),
									previousBreed === item.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "✓" })
								]
							}, item.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "previous-dog-name",
							children: ["牠的名字", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: previousDogName,
								maxLength: 12,
								placeholder: "例如：豆豆",
								onChange: (event) => onPreviousDogName(event.target.value)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButtons, {
					onBack: () => onSelectionPage("name"),
					onNext: () => hasPreviousDog ? onSelectionPage("transition") : onNext(),
					disabled: hasPreviousDog === null || hasPreviousDog && (!previousBreed || !previousDogName.trim()),
					nextLabel: "下一步"
				})
			]
		}, "history") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "experience-transition-page",
			"aria-labelledby": "experience-transition-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "experience-dogs",
					"aria-label": "從過去的陪伴經驗走向新的生命",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "experience-dog-card experience-dog-card--past",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "過去熟悉的生活" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: selectedPreviousBreed?.image,
									alt: `${previousDogName || "以前的狗狗"}，${selectedPreviousBreed?.label ?? "犬"}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: previousDogName || "以前的狗狗" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: selectedPreviousBreed?.label }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selectedPreviousBreed?.shortDescription })
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "experience-arrow",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "→" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "experience-dog-card experience-dog-card--next",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "準備迎接的新生活" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: selectedBreed?.image,
									alt: `這次想迎接的${selectedBreed?.label ?? "狗狗"}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: petName || `新的${selectedBreed?.label ?? "狗狗"}` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: selectedBreed?.label }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selectedBreed?.shortDescription })
								] })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "experience-story",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							id: "experience-transition-title",
							className: "experience-story-line experience-story-line--past",
							children: [
								"你熟悉的是和",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: previousDogName || selectedPreviousBreed?.label }),
								"經過一段時間磨合後的生活。"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "experience-story-line experience-story-line--next",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: petName || `新的${selectedBreed?.label ?? "狗狗"}` }), "是一隻不一樣的生命，可能有不同的個性、經歷、健康狀況與適應速度。"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "experience-story-line experience-story-line--bridge",
							children: [
								"接下來，請先暫時放下",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "「以前就是這樣照顧」" }),
								"的想法，陪",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: petName || "牠" }),
								"從到家第一天演練一次，也重新確認現在的你是否準備好和牠建立新的生活。"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "experience-transition-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "secondary",
						onClick: () => onSelectionPage("history"),
						children: "← 返回"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "primary",
						onClick: onNext,
						children: ["開始領養前準備 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
					})]
				})
			]
		}, "transition")
	});
}
var expenseLabels = {
	requiredAfterArrival: "到家後必要支出",
	oneTimePrep: "一次性準備費",
	monthlyBasic: "每月基本支出",
	temporaryMedical: "臨時／醫療支出",
	suggestedReserve: "建議預留",
	emergencyReserveTitle: "建議預留醫療應急金",
	detailEyebrow: "花費明細",
	detailTitle: "目前已登記的支出",
	closeDetails: "關閉明細",
	noGroupExpenses: "目前尚未登記此類支出。",
	currentCostStatus: "目前費用狀況",
	accumulatedTotal: "累積支出",
	accumulatedHelp: "含目前流程已登記的一次性、當月支出與到家後必要支出",
	viewDetails: "查看明細",
	monthlySuffix: "／月",
	monthlyType: "每月支出",
	oneTimeType: "一次性支出",
	addedPrefix: "新增："
};
var requiredAfterArrivalExpenseIds = new Set([
	"microchip-registration",
	"rabies-vaccine",
	"basic-vaccine-checkup"
]);
var defaultVisibleExpenses = [
	"microchip-registration",
	"rabies-vaccine",
	"basic-vaccine-checkup",
	"monthly-preventive-medicine"
].map((id) => expenseCatalog[id]).filter((item) => Boolean(item));
var temporaryMedicalExpenseIds = new Set([
	"sick-vet-care",
	"senior-checkup",
	"journey-care-service",
	"senior-slipmat",
	"senior-access-bed"
]);
var expenseDetailGroupOrder = [
	expenseLabels.requiredAfterArrival,
	expenseLabels.oneTimePrep,
	expenseLabels.monthlyBasic,
	expenseLabels.temporaryMedical
];
function isRequiredAfterArrivalExpense(item) {
	return requiredAfterArrivalExpenseIds.has(item.id);
}
function isMonthlyExpense(item) {
	return item.recurring;
}
function isTemporaryOrMedicalExpense(item) {
	return temporaryMedicalExpenseIds.has(item.id) || item.category === "醫療" || item.category === "照顧服務" || item.category === "高齡用品" || Boolean(item.fromEmergency);
}
function isOneTimePreparationExpense(item) {
	return !isMonthlyExpense(item) && !isRequiredAfterArrivalExpense(item) && !isTemporaryOrMedicalExpense(item);
}
function mergeDefaultVisibleExpenses(expenses, breed) {
	const petSize = getPetSizeForBreed(breed);
	const existingIds = new Set(expenses.map((item) => item.id));
	return [...expenses, ...defaultVisibleExpenses.filter((item) => !existingIds.has(item.id)).map((item) => applySizeBasedExpenseAmount(item, petSize))];
}
function detailGroupForExpense(item) {
	if (isRequiredAfterArrivalExpense(item)) return expenseLabels.requiredAfterArrival;
	if (isMonthlyExpense(item)) return expenseLabels.monthlyBasic;
	if (isTemporaryOrMedicalExpense(item)) return expenseLabels.temporaryMedical;
	if (isOneTimePreparationExpense(item)) return expenseLabels.oneTimePrep;
	return expenseLabels.temporaryMedical;
}
function expenseTypeLabel(item) {
	if (isMonthlyExpense(item)) return expenseLabels.monthlyType;
	return expenseLabels.oneTimeType;
}
function ExpenseDetails({ expenses, emergencyReserve, breed, onClose }) {
	const visibleExpenses = mergeDefaultVisibleExpenses(expenses, breed);
	const preparationTotal = visibleExpenses.filter(isOneTimePreparationExpense).reduce((sum, item) => sum + item.amount, 0);
	const monthlyTotal = visibleExpenses.filter(isMonthlyExpense).reduce((sum, item) => sum + item.amount, 0);
	const temporaryMedicalTotal = visibleExpenses.filter(isTemporaryOrMedicalExpense).reduce((sum, item) => sum + item.amount, 0);
	const accumulatedTotal = visibleExpenses.reduce((sum, item) => sum + item.amount, 0);
	const grouped = expenseDetailGroupOrder.map((group) => ({
		group,
		items: visibleExpenses.filter((item) => detailGroupForExpense(item) === group)
	}));
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
						children: expenseLabels.detailEyebrow
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "expense-title",
						children: expenseLabels.detailTitle
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						"aria-label": expenseLabels.closeDetails,
						children: "x"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "expense-modal-summary",
					"aria-label": "費用摘要",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: expenseLabels.oneTimePrep }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["NT$ ", money.format(preparationTotal)] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: expenseLabels.monthlyBasic }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["NT$ ", money.format(monthlyTotal)] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: expenseLabels.temporaryMedical }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["NT$ ", money.format(temporaryMedicalTotal)] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							title: expenseLabels.accumulatedHelp,
							children: expenseLabels.accumulatedTotal
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["NT$ ", money.format(accumulatedTotal)] })] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "expense-groups",
					children: [grouped.map(({ group, items }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: group }), items.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						item.stage,
						" / ",
						expenseTypeLabel(item)
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
						"NT$ ",
						money.format(item.amount),
						isMonthlyExpense(item) ? expenseLabels.monthlySuffix : ""
					] })] }, item.id)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: expenseLabels.noGroupExpenses })] }, group)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "expense-reserve-note",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: expenseLabels.suggestedReserve }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
							expenseLabels.emergencyReserveTitle,
							": NT$ ",
							money.format(emergencyReserve)
						] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "primary",
					onClick: onClose,
					children: expenseLabels.closeDetails
				})
			]
		})
	});
}
function CostBar({ expenses, emergencyReserve, latestExpense, breed }) {
	const [detailsOpen, setDetailsOpen] = (0, import_react.useState)(false);
	const [flashExpense, setFlashExpense] = (0, import_react.useState)(null);
	const toastTimerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		return () => {
			if (toastTimerRef.current !== null) {
				window.clearTimeout(toastTimerRef.current);
				toastTimerRef.current = null;
			}
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!latestExpense) {
			setFlashExpense(null);
			return;
		}
		if (toastTimerRef.current !== null) {
			window.clearTimeout(toastTimerRef.current);
			toastTimerRef.current = null;
		}
		setFlashExpense(latestExpense);
		toastTimerRef.current = window.setTimeout(() => {
			setFlashExpense(null);
			toastTimerRef.current = null;
		}, 2400);
	}, [latestExpense]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cost-bar cost-bar-compact",
		"aria-label": expenseLabels.currentCostStatus,
		children: [flashExpense && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "cost-toast",
			role: "status",
			children: [
				"新增「",
				flashExpense.name,
				"」NT$ ",
				money.format(flashExpense.amount),
				isMonthlyExpense(flashExpense) ? expenseLabels.monthlySuffix : ""
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "bill-trigger",
			onClick: () => setDetailsOpen(true),
			"aria-label": expenseLabels.viewDetails,
			title: expenseLabels.viewDetails,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bill-trigger-icon",
				"aria-hidden": "true",
				children: "＄"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: expenseLabels.viewDetails })]
		})]
	}), detailsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseDetails, {
		expenses,
		emergencyReserve,
		breed,
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
		label: "寵物專用清潔用品",
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
		note: "如有租屋，須提供房東許可之證明。"
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
		label: "寵物專用清潔用品",
		note: "處理接回途中可能發生的髒污。"
	}
};
function expensePriceText(expenseIds = [], breed) {
	const petSize = getPetSizeForBreed(breed);
	const prices = expenseIds.map((id) => expenseCatalog[id]).filter((item) => Boolean(item)).map((item) => applySizeBasedExpenseAmount(item, petSize));
	if (prices.length === 0) return "";
	const total = prices.reduce((sum, item) => sum + item.amount, 0);
	return `NT$${money.format(total)}`;
}
function roomItemPlacementStyle(item) {
	return {
		left: `${item.placement.x}%`,
		top: `${item.placement.y}%`,
		width: `${item.placement.width}%`,
		zIndex: item.placement.layer,
		"--mobile-room-item-x": `${item.mobilePlacement?.x ?? item.placement.x}%`,
		"--mobile-room-item-y": `${item.mobilePlacement?.y ?? item.placement.y}%`,
		"--mobile-room-item-width": `${item.mobilePlacement?.width ?? item.placement.width}%`
	};
}
function roomHazardPlacementStyle(item) {
	return {
		left: `${item.placement.x}%`,
		top: `${item.placement.y}%`,
		width: `${item.placement.width}%`,
		zIndex: item.placement.layer,
		"--mobile-room-hazard-x": `${item.mobilePlacement?.x ?? item.placement.x}%`,
		"--mobile-room-hazard-y": `${item.mobilePlacement?.y ?? item.placement.y}%`,
		"--mobile-room-hazard-width": `${item.mobilePlacement?.width ?? item.placement.width}%`
	};
}
function roomDoorplatePlacementStyle() {
	return {
		"--mobile-doorplate-x": `${roomDoorplatePlacement.mobile.x}%`,
		"--mobile-doorplate-y": `${roomDoorplatePlacement.mobile.y}%`,
		"--mobile-doorplate-width": `${roomDoorplatePlacement.mobile.width}%`,
		"--mobile-doorplate-text-left": `${roomDoorplatePlacement.mobileText.left}%`,
		"--mobile-doorplate-text-top": `${roomDoorplatePlacement.mobileText.top}%`,
		"--mobile-doorplate-text-width": `${roomDoorplatePlacement.mobileText.width}%`,
		"--mobile-doorplate-text-height": `${roomDoorplatePlacement.mobileText.height}%`,
		"--mobile-doorplate-text-font-size": `${roomDoorplatePlacement.mobileText.fontSize}px`
	};
}
function RoomPreparation({ selectedItems, securedHazards, petName, onPrepare, onToggleHazard, onBack, onReplay, onNext, reviewing = false, breed }) {
	const [roomCheckMessage, setRoomCheckMessage] = (0, import_react.useState)("");
	const [dismissingHazard, setDismissingHazard] = (0, import_react.useState)(null);
	const [activeHazardInfo, setActiveHazardInfo] = (0, import_react.useState)(null);
	const [exitingItems, setExitingItems] = (0, import_react.useState)([]);
	const roomSceneRef = (0, import_react.useRef)(null);
	const [roomSceneReady, setRoomSceneReady] = (0, import_react.useState)(false);
	const itemsDone = roomItems.filter((item) => selectedItems.includes(item.id)).length;
	const hazardsDone = securedHazards.length;
	const complete = itemsDone === roomItems.length && hazardsDone === hazards.length;
	const activeHazard = hazards.find((item) => item.id === activeHazardInfo);
	const supplyRows = [
		roomItems.slice(0, 2),
		roomItems.slice(2, 4),
		roomItems.slice(4, 6),
		roomItems.slice(6, 7)
	].filter((row) => row.length > 0);
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
		setRoomCheckMessage("");
	}
	function secureHazard(id) {
		if (!hazards.find((item) => item.id === id) || securedHazards.includes(id) || dismissingHazard) return;
		setDismissingHazard(id);
		setRoomCheckMessage("");
		window.setTimeout(() => {
			onToggleHazard(id);
			setDismissingHazard(null);
			setActiveHazardInfo(id);
		}, 260);
		window.setTimeout(() => setActiveHazardInfo((current) => current === id ? null : current), 4260);
	}
	function getRoomCheckMessages() {
		const missingItems = roomItems.length - itemsDone;
		const remainingHazards = hazards.length - hazardsDone;
		return [missingItems > 0 ? `還有 ${missingItems} 件用品還沒準備好` : "", remainingHazards > 0 ? "還有危險物品需要處理" : ""].filter(Boolean);
	}
	function completeRoomCheck() {
		if (complete) {
			setRoomCheckMessage("");
			onNext();
			return;
		}
		const messages = getRoomCheckMessages();
		setRoomCheckMessage(messages.length > 0 ? messages.join("，") : "房間還沒準備好，請再確認用品與危險物品");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap preparation-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
				title: "先替牠布置安全的生活空間",
				body: `${petName || "小狗"} 還沒到家，但牠的生活角落可以先準備起來。先把每天會用到的用品放進房間，再看看有哪些東西可能讓牠誤咬、誤食或受傷。`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "room-preparation-layout simplified-room-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "room-supply-shelf",
					"aria-label": "生活用品準備區",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "room-supply-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "用品準備箱" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "room-supply-rows",
						children: supplyRows.map((row, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `room-supply-row room-supply-row--${row.length} full-seven`,
							children: row.map((item) => {
								const selected = selectedItems.includes(item.id);
								const note = preparedRoomItemNotes[item.id] ?? {
									label: item.label,
									note: item.purpose
								};
								const price = item.expenseId ? expensePriceText([item.expenseId], breed) : "";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "supply-slot",
									children: !selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
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
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "supply-slot-note",
										"aria-live": "polite",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: note.label }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: note.note }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "supply-slot-price",
												children: price || "不另計費"
											})
										]
									})
								}, item.id);
							})
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
								className: "room-scene-background room-scene-background--desktop",
								src: "/assets/room/empty-room.png",
								alt: "空的寵物生活房間"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "room-scene-background room-scene-background--mobile",
								src: "/assets/room/empty-room-mobile.png",
								alt: "空的寵物生活房間"
							}),
							roomItems.filter((item) => selectedItems.includes(item.id)).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `room-object placed-supply auto-room-object placed-room-item--${item.id}`,
								style: roomItemPlacementStyle(item),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: `房間中已配置的${item.label}`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
							}, item.id)),
							hazards.filter((item) => !securedHazards.includes(item.id)).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: `room-object room-hazard ${dismissingHazard === item.id ? "dismissing" : ""}`,
								style: roomHazardPlacementStyle(item),
								onClick: () => secureHazard(item.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: `房間中的危險物品：${item.label}`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
							}, item.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pet-doorplate",
								style: roomDoorplatePlacementStyle(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/assets/room/nameplate.png",
									alt: "小狗名字門牌"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pet-doorplate-name",
									children: petName
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
					onClick: complete || reviewing ? onReplay : onBack,
					children: complete || reviewing ? "↻ 再玩一次" : "← 返回"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "room-actions-right",
					children: [roomCheckMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "room-check-message",
						role: "alert",
						children: roomCheckMessage
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary",
						onClick: completeRoomCheck,
						children: ["完成房間檢查，準備出發 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
					})]
				})]
			})
		]
	});
}
function CarTrunkPreparation({ selected, petName, breed, onSelect, onBack, onReplay, onNext, reviewing = false }) {
	const [exitingItems, setExitingItems] = (0, import_react.useState)([]);
	const [departing, setDeparting] = (0, import_react.useState)(false);
	const documents = departureTrunkItems.filter((item) => item.kind === "document");
	const supplies = departureTrunkItems.filter((item) => item.kind === "supply");
	const documentDone = documents.filter((item) => selected.includes(item.id)).length;
	const supplyDone = supplies.filter((item) => selected.includes(item.id)).length;
	const complete = documentDone === documents.length && supplyDone === supplies.length;
	const supplyRows = Array.from({ length: Math.ceil(departureTrunkItems.length / 2) }, (_, index) => departureTrunkItems.slice(index * 2, index * 2 + 2)).filter((row) => row.length > 0);
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
				body: `今天要去接 ${petName || "小狗"} 回家了。出門前先把需要的文件與接回用品準備好，讓牠在路上有安全的位置，也讓你能從容處理突發狀況。`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `departure-layout ${departing ? "departing" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "departure-supply-shelf",
					"aria-label": "準備物品",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "departure-supply-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "準備物品" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "departure-supply-rows",
						children: supplyRows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `departure-supply-row departure-supply-row--${row.length}`,
							children: row.map((item) => {
								const itemSelected = selected.includes(item.id);
								const note = preparedTrunkItemNotes[item.id] ?? {
									label: item.label,
									note: item.description
								};
								const price = expensePriceText(item.expenseIds ?? [], breed);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "supply-slot",
									children: !itemSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
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
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "supply-slot-note",
										"aria-live": "polite",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: note.label }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: note.note }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "supply-slot-price",
												children: price || "不另計費"
											})
										]
									})
								}, item.id);
							})
						}, `${row.map((item) => item.id).join("-")}-${index}`))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "departure-car",
					"aria-label": "已打開的汽車後車廂與自動配置用品",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "car-trunk-background",
							src: "/assets/car/car-trunk.png",
							alt: "打開的汽車後車廂"
						}),
						selected.includes("documents") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "car-document-folder complete",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/car/adoption-documents.png",
								alt: "領養文件夾"
							})
						}),
						selected.includes("id") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "placed-car-item placed-car-id",
							src: "/assets/car/id-card.png",
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
					onClick: complete || reviewing ? onReplay : onBack,
					children: complete || reviewing ? "↻ 再玩一次" : "← 返回"
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
var a4PageWidthPt = 595.28;
var a4PageHeightPt = 841.89;
function personalizeReportText(text, petName) {
	const name = petName.trim() || "小狗";
	return text.replaceAll("豆豆", name).replaceAll("小狗", name).replaceAll("狗狗", name);
}
function knowledgePointsForScenario(scenario, petName) {
	const correctChoices = scenario.choices.filter((choice) => choice.result === "correct");
	const rawPoints = scenario.correctSummary?.length ? scenario.correctSummary : correctChoices.flatMap((choice) => [
		choice.text,
		choice.explanation,
		choice.suggestion ?? ""
	]);
	return Array.from(new Set(rawPoints.flatMap((point) => point.split("\n")).map((point) => personalizeReportText(point.trim(), petName)).filter(Boolean))).slice(0, 6);
}
function sanitizePdfFileName(value) {
	return value.replace(/[\\/:*?"<>|]/g, "").replace(/\s+/g, " ").trim();
}
function dataUrlToBytes(dataUrl) {
	const base64 = dataUrl.split(",")[1] ?? "";
	const binary = window.atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
	return bytes;
}
function textBytes(text) {
	return new TextEncoder().encode(text);
}
function concatBytes(chunks) {
	const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
	const output = new Uint8Array(totalLength);
	let offset = 0;
	chunks.forEach((chunk) => {
		output.set(chunk, offset);
		offset += chunk.length;
	});
	return output;
}
function createPdfBlobFromCanvases(canvases) {
	const chunks = [];
	const offsets = [0];
	let byteLength = 0;
	const objectCount = 2 + canvases.length * 3;
	const push = (chunk) => {
		const bytes = typeof chunk === "string" ? textBytes(chunk) : chunk;
		chunks.push(bytes);
		byteLength += bytes.length;
	};
	const startObject = (id) => {
		offsets[id] = byteLength;
		push(`${id} 0 obj\n`);
	};
	push("%PDF-1.4\n%âãÏÓ\n");
	startObject(1);
	push("<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
	startObject(2);
	push(`<< /Type /Pages /Kids [${canvases.map((_, index) => `${3 + index * 3} 0 R`).join(" ")}] /Count ${canvases.length} >>\nendobj\n`);
	canvases.forEach((canvas, index) => {
		const pageObjectId = 3 + index * 3;
		const imageObjectId = pageObjectId + 1;
		const contentObjectId = pageObjectId + 2;
		const imageBytes = dataUrlToBytes(canvas.toDataURL("image/jpeg", .92));
		const contentBytes = textBytes(`q\n${a4PageWidthPt} 0 0 ${a4PageHeightPt} 0 0 cm\n/Im${index + 1} Do\nQ\n`);
		startObject(pageObjectId);
		push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${a4PageWidthPt} ${a4PageHeightPt}] /Resources << /XObject << /Im${index + 1} ${imageObjectId} 0 R >> >> /Contents ${contentObjectId} 0 R >>\nendobj\n`);
		startObject(imageObjectId);
		push(`<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.length} >>\nstream\n`);
		push(imageBytes);
		push("\nendstream\nendobj\n");
		startObject(contentObjectId);
		push(`<< /Length ${contentBytes.length} >>\nstream\n`);
		push(contentBytes);
		push("endstream\nendobj\n");
	});
	const xrefOffset = byteLength;
	push(`xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`);
	for (let id = 1; id <= objectCount; id += 1) push(`${String(offsets[id]).padStart(10, "0")} 00000 n \n`);
	push(`trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
	return new Blob([concatBytes(chunks)], { type: "application/pdf" });
}
async function imageToDataUrl(src) {
	if (src.startsWith("data:")) return src;
	const blob = await (await fetch(src)).blob();
	return await new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(blob);
	});
}
async function replaceImagesWithDataUrls(root) {
	const images = Array.from(root.querySelectorAll("img"));
	await Promise.all(images.map(async (image) => {
		const source = image.getAttribute("src") || image.src;
		if (!source) return;
		try {
			image.src = await imageToDataUrl(new URL(source, window.location.href).toString());
		} catch {}
	}));
}
function inlineComputedStyles(source, clone) {
	const styles = window.getComputedStyle(source);
	Array.from(styles).forEach((property) => {
		clone.style.setProperty(property, styles.getPropertyValue(property), styles.getPropertyPriority(property));
	});
	Array.from(source.children).forEach((child, index) => {
		const clonedChild = clone.children.item(index);
		if (clonedChild) inlineComputedStyles(child, clonedChild);
	});
}
async function elementToCanvas(source) {
	const width = source.offsetWidth;
	const height = source.offsetHeight;
	const clone = source.cloneNode(true);
	clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
	await replaceImagesWithDataUrls(clone);
	inlineComputedStyles(source, clone);
	clone.style.margin = "0";
	clone.style.boxSizing = "border-box";
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject width="100%" height="100%">${new XMLSerializer().serializeToString(clone)}</foreignObject></svg>`;
	const image = new Image();
	image.decoding = "sync";
	await new Promise((resolve, reject) => {
		image.onload = () => resolve();
		image.onerror = () => reject(/* @__PURE__ */ new Error("PDF page render failed"));
		image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
	});
	const scale = Math.min(2, window.devicePixelRatio || 1.5);
	const canvas = document.createElement("canvas");
	canvas.width = Math.round(width * scale);
	canvas.height = Math.round(height * scale);
	const context = canvas.getContext("2d");
	if (!context) throw new Error("Canvas is not available");
	context.fillStyle = "#ffffff";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.drawImage(image, 0, 0, canvas.width, canvas.height);
	return canvas;
}
function useMobileDownloadMode() {
	const [mobile, setMobile] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const query = window.matchMedia("(max-width: 720px)");
		const update = () => setMobile(query.matches);
		update();
		query.addEventListener?.("change", update);
		return () => query.removeEventListener?.("change", update);
	}, []);
	return mobile;
}
async function downloadAssessmentPdf(petName, kind) {
	const selector = kind === "profile" ? ".care-print-profile" : ".care-a4-sheet";
	const sourcePages = Array.from(document.querySelectorAll(selector));
	if (!sourcePages.length) throw new Error("PDF source pages not found");
	const stage = document.createElement("div");
	stage.className = "pdf-export-stage";
	sourcePages.forEach((page) => stage.appendChild(page.cloneNode(true)));
	document.body.appendChild(stage);
	try {
		await document.fonts?.ready;
		await replaceImagesWithDataUrls(stage);
		const pages = Array.from(stage.children);
		const canvases = [];
		for (const page of pages) canvases.push(await elementToCanvas(page));
		const blob = createPdfBlobFromCanvases(canvases);
		const safePetName = sanitizePdfFileName(petName);
		const fileName = safePetName ? `伴日子新手村_${kind === "profile" ? "個人資料" : "照顧準備總覽"}_${safePetName}.pdf` : `伴日子新手村_${kind === "profile" ? "個人資料" : "照顧準備總覽"}.pdf`;
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = fileName;
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.setTimeout(() => URL.revokeObjectURL(url), 1e3);
	} finally {
		stage.remove();
	}
}
function downloadBlob(blob, fileName) {
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	link.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
async function downloadAssessmentImage(petName, kind) {
	const selector = kind === "profile" ? ".care-print-profile" : ".care-a4-sheet";
	const sourcePages = Array.from(document.querySelectorAll(selector));
	if (!sourcePages.length) throw new Error("Image source pages not found");
	const stage = document.createElement("div");
	stage.className = "pdf-export-stage image-export-stage desktop-pdf-layout";
	sourcePages.forEach((page) => stage.appendChild(page.cloneNode(true)));
	document.body.appendChild(stage);
	try {
		await document.fonts?.ready;
		await replaceImagesWithDataUrls(stage);
		const pages = Array.from(stage.children);
		const canvases = [];
		for (const page of pages) canvases.push(await elementToCanvas(page));
		const safePetName = sanitizePdfFileName(petName);
		const baseFileName = safePetName ? `伴日子新手村_${kind === "profile" ? "個人資料" : "照護總覽"}_${safePetName}` : `伴日子新手村_${kind === "profile" ? "個人資料" : "照護總覽"}`;
		for (let index = 0; index < canvases.length; index += 1) {
			const canvas = canvases[index];
			downloadBlob(await new Promise((resolve, reject) => {
				canvas.toBlob((nextBlob) => {
					if (nextBlob) resolve(nextBlob);
					else reject(/* @__PURE__ */ new Error("PNG export failed"));
				}, "image/png");
			}), canvases.length > 1 ? `${baseFileName}_${index + 1}.png` : `${baseFileName}.png`);
		}
	} finally {
		stage.remove();
	}
}
function PdfDownloadButton({ petName, kind = "overview", label }) {
	const [generating, setGenerating] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const mobileDownload = useMobileDownloadMode();
	const buttonLabel = mobileDownload ? kind === "profile" ? "儲存個人資料" : "儲存照護總覽" : label ?? (mobileDownload ? kind === "profile" ? "儲存個人資料" : "儲存照護總覽" : kind === "profile" ? "下載個人資料" : "下載照顧準備總覽");
	const exportKindLabel = mobileDownload ? "圖片" : "PDF";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "report-download-control",
		children: [error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "pdf-download-error",
			role: "alert",
			children: error
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: `primary pdf-download-button ${generating ? "is-generating" : ""}`,
			onClick: async () => {
				if (generating) return;
				setGenerating(true);
				setError("");
				try {
					if (mobileDownload) await downloadAssessmentImage(petName, kind);
					else await downloadAssessmentPdf(petName, kind);
				} catch {
					setError(`${exportKindLabel}下載失敗，請再試一次。`);
				} finally {
					setGenerating(false);
				}
			},
			disabled: generating,
			"aria-label": buttonLabel,
			title: mobileDownload ? "儲存圖片" : "下載 PDF",
			children: [generating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pdf-download-spinner",
				"aria-hidden": "true"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 24 24",
				"aria-hidden": "true",
				focusable: "false",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3a1 1 0 0 1 1 1v9.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.4l3.3 3.3V4a1 1 0 0 1 1-1Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: generating ? `正在整理${exportKindLabel}…` : buttonLabel })]
		})]
	});
}
function OptionButton({ label, selected, onClick, icon, simple = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: `profile-option ${simple ? "simple" : ""} ${selected ? "selected" : ""}`,
		"aria-pressed": selected,
		onClick,
		children: [
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 16 16",
					focusable: "false",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6.4 11.6 2.7 7.9l1.4-1.4 2.3 2.3 5.5-5.6 1.4 1.4z" })
				})
			}),
			icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: label }),
			!simple && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: selected ? "已選擇" : "點擊選擇" })
		]
	});
}
function SelectedDot() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "choice-check",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 16 16",
			focusable: "false",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6.4 11.6 2.7 7.9l1.4-1.4 2.3 2.3 5.5-5.6 1.4 1.4z" })
		})
	});
}
function ProfileSupplementForm({ profile, petName, onChange, onBack, onReset }) {
	const update = (key, value) => {
		onChange({
			...profile,
			[key]: value
		});
	};
	const chooseHousing = (value) => {
		onChange({
			...profile,
			housing: value,
			landlordConsent: value === "租屋" ? profile.landlordConsent || "尚未確認" : ""
		});
	};
	const clamp = (raw, max) => raw === "" ? "" : String(Math.min(max, Math.max(0, Number(raw.replace(/\D/g, "")) || 0)));
	const toggle = (key, value) => update(key, profile[key].includes(value) ? profile[key].filter((item) => item !== value) : [...profile[key], value]);
	const chooseHousematePresence = (hasHousemates) => {
		onChange({
			...profile,
			hasHousemates,
			housemateTypes: hasHousemates ? [] : ["無"],
			housemateList: hasHousemates ? profile.housemateList.length ? profile.housemateList : [""] : [],
			otherHousemate: "",
			hasSensitiveHouseholdMembers: hasHousemates ? profile.hasSensitiveHouseholdMembers : false,
			housematesConsent: hasHousemates ? profile.housematesConsent : null
		});
	};
	const updateHousemateText = (value) => {
		const trimmed = value.trim();
		onChange({
			...profile,
			hasHousemates: true,
			housemateList: [value],
			housemateTypes: trimmed ? [trimmed] : []
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
		reader.onload = () => {
			const image = String(reader.result ?? "");
			const images = profile.homeSpaceImages.length ? profile.homeSpaceImages : profile.homeSpaceImage ? [profile.homeSpaceImage] : [];
			const imageNames = profile.homeSpaceImageNames.length ? profile.homeSpaceImageNames : profile.homeSpaceImageName ? [profile.homeSpaceImageName] : [];
			const nextImages = [...images, image];
			const nextImageNames = [...imageNames, file.name];
			onChange({
				...profile,
				homeSpaceImage: nextImages[0] ?? "",
				homeSpaceImageName: nextImageNames[0] ?? "",
				homeSpaceImages: nextImages,
				homeSpaceImageNames: nextImageNames
			});
		};
		reader.readAsDataURL(file);
	}
	function removeHomeSpaceImage(indexToRemove) {
		const images = profile.homeSpaceImages.length ? profile.homeSpaceImages : profile.homeSpaceImage ? [profile.homeSpaceImage] : [];
		const imageNames = profile.homeSpaceImageNames.length ? profile.homeSpaceImageNames : profile.homeSpaceImageName ? [profile.homeSpaceImageName] : [];
		const nextImages = images.filter((_, index) => index !== indexToRemove);
		const nextImageNames = imageNames.filter((_, index) => index !== indexToRemove);
		onChange({
			...profile,
			homeSpaceImage: nextImages[0] ?? "",
			homeSpaceImageName: nextImageNames[0] ?? "",
			homeSpaceImages: nextImages,
			homeSpaceImageNames: nextImageNames
		});
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
	const homeSpaceImages = profile.homeSpaceImages.length ? profile.homeSpaceImages : profile.homeSpaceImage ? [profile.homeSpaceImage] : [];
	const homeSpaceImageNames = profile.homeSpaceImageNames.length ? profile.homeSpaceImageNames : profile.homeSpaceImageName ? [profile.homeSpaceImageName] : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "content-wrap profile-supplement",
		"aria-labelledby": "profile-supplement-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-wizard-head",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					id: "profile-supplement-title",
					children: "補充真實生活條件"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "這些資料可協助收容所、寵物店家或照護人員了解你的居住環境、同住者狀況與飼養經驗，作為後續溝通與照顧建議的參考。" })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
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
								onClick: () => chooseHousing(value),
								simple: true
							}, value))
						}),
						profile.housing === "租屋" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "supplement-followup landlord-consent-followup",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "房東／租約是否允許飼養寵物？" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "supplement-choice-grid compact",
								children: [
									"已確認並同意",
									"尚未確認",
									"不同意"
								].map((value) => {
									const selected = profile.landlordConsent === value || value === "已確認並同意" && profile.landlordConsent === "房東已同意" || value === "尚未確認" && profile.landlordConsent === "尚未取得同意";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: `supplement-choice ${selected ? "selected" : ""}`,
										"aria-pressed": selected,
										onClick: () => update("landlordConsent", value),
										children: [selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectedDot, {}), value]
									}, value);
								})
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "同居家人" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "supplement-choice-grid compact housemate-presence-choice",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: `supplement-choice ${profile.hasHousemates === false ? "selected" : ""}`,
								"aria-pressed": profile.hasHousemates === false,
								onClick: () => chooseHousematePresence(false),
								children: [profile.hasHousemates === false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectedDot, {}), "無"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: `supplement-choice ${profile.hasHousemates === true ? "selected" : ""}`,
								"aria-pressed": profile.hasHousemates === true,
								onClick: () => chooseHousematePresence(true),
								children: [profile.hasHousemates === true && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectedDot, {}), "有"]
							})]
						}),
						profile.hasHousemates === true && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "housemate-entry-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "supplement-inline-input housemate-text-input",
								children: ["請簡單填寫同住家人", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: profile.housemateList[0] ?? "",
									placeholder: "例如：爸爸、媽媽、妹妹",
									onChange: (event) => updateHousemateText(event.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "supplement-checkbox",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: profile.hasSensitiveHouseholdMembers,
									onChange: (event) => update("hasSensitiveHouseholdMembers", event.target.checked)
								}), "家中有幼童、長者、孕婦"]
							})]
						}),
						profile.hasHousemates === true && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "supplement-followup",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "同住者是否知情並同意飼養？" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "supplement-choice-grid compact",
								children: consentOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: `supplement-choice ${option.selected ? "selected" : ""}`,
									"aria-pressed": option.selected,
									onClick: () => update("housematesConsent", option.consent),
									children: [option.selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectedDot, {}), option.label]
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
								children: [profile.activitySpace === value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectedDot, {}), value]
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "居家空間" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "home-space-upload",
						children: homeSpaceImages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "home-space-dropzone",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "image/png,image/jpeg,image/webp",
									onChange: (event) => {
										handleHomeSpaceImage(event.target.files?.[0]);
										event.currentTarget.value = "";
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "共同為毛孩的安全把關" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "可上傳未來寵物活動空間照片，協助評估環境安全與照顧安排。" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "選擇 PNG、JPG、JPEG 或 WebP 圖片" })
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "home-space-gallery",
							children: [homeSpaceImages.map((image, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "home-space-remove-photo",
									onClick: () => removeHomeSpaceImage(index),
									"aria-label": `刪除居家空間照片 ${index + 1}`,
									children: "×"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: image,
									alt: `已上傳的居家空間照片預覽 ${index + 1}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: homeSpaceImageNames[index] || `居家空間照片 ${index + 1}` })
							] }, `${homeSpaceImageNames[index] ?? "home-space"}-${index}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "home-space-add-photo",
								"aria-label": "新增居家空間照片",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: "image/png,image/jpeg,image/webp",
										onChange: (event) => {
											handleHomeSpaceImage(event.target.files?.[0]);
											event.currentTarget.value = "";
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "＋"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "新增照片" })
								]
							})]
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "飼養經驗" }),
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
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: `supplement-choice shiba-experience ${profile.noShibaExperience ? "selected" : ""}`,
							"aria-pressed": profile.noShibaExperience,
							onClick: () => update("noShibaExperience", !profile.noShibaExperience),
							children: [profile.noShibaExperience && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectedDot, {}), "我沒有養過柴犬"]
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
							].map((reason) => {
								const selected = profile.reasons.includes(reason);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: `supplement-choice ${selected ? "selected" : ""}`,
									"aria-pressed": selected,
									onClick: () => toggle("reasons", reason),
									children: [selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectedDot, {}), reason]
								}, reason);
							})
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-pdf-actions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PdfDownloadButton, {
					petName,
					kind: "profile",
					label: "下載個人資料"
				})
			})
		]
	});
}
function AssessmentReport({ petName, breed, profile, expenses, emergencyReserve, roomReady, hazardsReady, members, trunkSelected, trunkPassed, answers, lifeActivity, committed, onCommittedChange, onBack, onReset }) {
	const [activeDiscussionId, setActiveDiscussionId] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!activeDiscussionId) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const closeOnEscape = (event) => {
			if (event.key === "Escape") setActiveDiscussionId("");
		};
		window.addEventListener("keydown", closeOnEscape);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", closeOnEscape);
		};
	}, [activeDiscussionId]);
	const total = mergeDefaultVisibleExpenses(expenses, breed).reduce((sum, item) => sum + item.amount, 0);
	const suggestedPreparedTotal = total + emergencyReserve;
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
	const enteredHousemates = profile.housemateList.map((item) => item.trim()).filter(Boolean);
	const legacyHousemates = [...profile.housemateTypes.filter((item) => item !== "無" && item !== "其他"), profile.housemateTypes.includes("其他") ? profile.otherHousemate || "其他（待補充）" : ""].filter(Boolean);
	const housemateStatus = profile.hasHousemates === false ? "無同住家人" : profile.hasHousemates === true ? enteredHousemates.length ? enteredHousemates.join("、") : legacyHousemates.length ? legacyHousemates.join("、") : "有同住家人（待補充）" : "待補充";
	profile.noShibaExperience || profile.pastPetTypes.length || profile.currentPetTypes.length || profile.experienceNote;
	const reasonStatus = profile.reasons.length ? profile.reasons.map((item) => item === "其他" ? profile.reasonOther || "其他（待補充）" : item).join("、") : "待補充";
	const landlordConfirmed = profile.landlordConsent === "已確認並同意" || profile.landlordConsent === "房東已同意";
	[
		preparationStrong,
		correctFirst >= 5,
		practiceComplete === practiceItems.length,
		profile.activitySpace !== "",
		profile.reasons.length > 0,
		profile.housing !== "租屋" || landlordConfirmed,
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
	[profile.hasHousemates && profile.housematesConsent !== true && "所有同住者是否知情並同意飼養", profile.housing === "租屋" && !landlordConfirmed && "租屋規定與房東書面同意"].filter(Boolean);
	[...confirm.slice(0, 5)];
	const selectedBreed = breeds.find((item) => item.id === breed);
	const reportScenarios = [...lifeScenarios, ...getBreedChallengeScenarios(breed)];
	const discussionTopics = Object.values(answers).filter((answer) => answer.firstResult !== "correct").map((answer) => reportScenarios.find((scenario) => scenario.id === answer.scenarioId)).filter((scenario) => Boolean(scenario)).map((scenario) => ({
		id: scenario.id,
		title: personalizeReportText(scenario.title, petName),
		topic: scenario.topic ?? scenario.stage,
		summary: personalizeReportText(scenario.reportSummary ?? scenario.choices.find((choice) => choice.result === "correct")?.explanation ?? scenario.title, petName),
		knowledgePoints: knowledgePointsForScenario(scenario, petName)
	}));
	const activeDiscussion = discussionTopics.find((topic) => topic.id === activeDiscussionId);
	const knowledgeModal = activeDiscussion && typeof document !== "undefined" ? (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "knowledge-modal-backdrop",
		onMouseDown: (event) => {
			if (event.target === event.currentTarget) setActiveDiscussionId("");
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "knowledge-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "knowledge-modal-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "knowledge-modal-close",
					onClick: () => setActiveDiscussionId(""),
					"aria-label": "關閉知識點",
					children: "×"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "life-stage-label",
					children: activeDiscussion.topic
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "knowledge-modal-title",
					children: activeDiscussion.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "回顧這一題較合適的照護知識點：" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: activeDiscussion.knowledgePoints.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: point }, point)) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "knowledge-modal-confirm",
					onClick: () => setActiveDiscussionId(""),
					children: "我知道了"
				})
			]
		})
	}), document.body) : null;
	const homeSpaceImages = profile.homeSpaceImages.length ? profile.homeSpaceImages : profile.homeSpaceImage ? [profile.homeSpaceImage] : [];
	const homeSpaceImageNames = profile.homeSpaceImageNames.length ? profile.homeSpaceImageNames : profile.homeSpaceImageName ? [profile.homeSpaceImageName] : [];
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
				"寵物專用清潔用品",
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
	const sensitiveHousemateText = profile.hasHousemates === true && profile.hasSensitiveHouseholdMembers ? "家中有幼童、長者、孕婦" : "";
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
				sensitiveHousemateText && ["特殊同住者類型", sensitiveHousemateText],
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap summary-page assessment-report compact-assessment",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "care-a4-sheet",
				"aria-label": "伴日子照顧準備總覽 A4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "care-a4-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "伴日子新手村" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "照顧準備總覽" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "把這趟練習整理成你真正帶得走的照顧清單" })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "care-breed-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "care-breed-copy",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: selectedBreed?.label ?? (petName || "小狗") }), petName.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: petName })]
							}), selectedBreed?.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
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
							children: "準備清單"
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
						"aria-label": "預估支出",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "預估支出" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "care-a4-money-types",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "支出包含" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "到家後必要支出" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "care-a4-money-note",
										children: "（晶片與寵物登記、狂犬病疫苗、基礎疫苗與初期健康檢查）"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "一次性準備費" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "每月基本支出" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "臨時／醫療支出" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "建議預留醫療應急金" })
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "care-a4-money-summary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "金額摘要" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "目前模擬支出" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(total)] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "建議預留醫療應急金" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(emergencyReserve)] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "建議準備金額" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["NT$ ", money.format(suggestedPreparedTotal)] })] })
								] })]
							})
						]
					}),
					discussionTopics.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "care-a4-commitment",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: committed ? "☑" : "□"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "我已閱讀以上提醒，並承諾會善盡照顧責任，持續提供合適的飲食、乾淨飲水、安全環境、日常陪伴與必要醫療，好好照顧我的寵物。" })]
					})
				]
			}),
			discussionTopics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "care-a4-sheet care-a4-sheet--followup",
				"aria-label": "伴日子知識點複習摘要 A4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: "care-a4-header care-a4-header--compact",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "伴日子新手村" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "知識點複習摘要" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "把還可以再討論的題目，整理成清楚的回顧重點" })
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "care-a4-discussion care-a4-discussion--cards",
						"aria-label": "知識點複習摘要",
						children: discussionTopics.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "care-a4-discussion-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: topic.topic }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "情境：" }), topic.summary ?? topic.title] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "建議複習：" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: topic.knowledgePoints.slice(0, 4).map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: point }, point)) })] })
							]
						}, topic.id))
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
			discussionTopics.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overview-discussion",
				"aria-labelledby": "overview-discussion-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "overview-discussion-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "△"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "overview-discussion-title",
						children: "建議再深入討論的題目"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "這些題目可以特別再複習一次相關的知識點。" })] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overview-discussion-list",
					children: discussionTopics.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "overview-discussion-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "△"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: topic.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: topic.summary ?? topic.topic })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "discussion-info-button",
								onClick: () => setActiveDiscussionId(topic.id),
								"aria-label": `查看「${topic.title}」的知識點`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
									"aria-hidden": "true",
									children: "i"
								}), " 查看知識點"]
							})
						]
					}, topic.id))
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overview-discussion-clear",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: "✓"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "目前沒有需要特別標示的題目" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "仍建議帶著總覽和家人討論實際分工與生活安排。" })] })]
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
					onChange: (event) => onCommittedChange(event.target.checked)
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "居家空間照片" }), homeSpaceImages.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "print-home-space-gallery",
							children: homeSpaceImages.map((image, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: image,
								alt: `使用者上傳的居家空間照片 ${index + 1}`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: homeSpaceImageNames[index] || `居家空間照片 ${index + 1}` })] }, `${homeSpaceImageNames[index] ?? "print-home-space"}-${index}`))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "尚未上傳居家空間照片" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "report-download-footer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PdfDownloadButton, { petName })
			}),
			knowledgeModal
		]
	}) });
}
var taiwanCities = [
	"基隆市",
	"臺北市",
	"新北市",
	"桃園市",
	"新竹市",
	"新竹縣",
	"苗栗縣",
	"臺中市",
	"彰化縣",
	"南投縣",
	"雲林縣",
	"嘉義市",
	"嘉義縣",
	"臺南市",
	"高雄市",
	"屏東縣",
	"宜蘭縣",
	"花蓮縣",
	"臺東縣",
	"澎湖縣",
	"金門縣",
	"連江縣"
];
var adoptionCards = [
	{
		title: "毛孩生活故事卡",
		city: "台南市",
		image: "/assets/acquisition/paws-life-village.jpg",
		href: "https://paws.ixda.tw/"
	},
	{
		title: "地區收容所資訊",
		icon: "🏠"
	},
	{
		title: "合作認養平台",
		icon: "🤝"
	},
	{
		title: "數位認養服務",
		icon: "💻"
	}
];
var purchaseCards = [
	{
		title: "合法寵物店查詢",
		icon: "🏷"
	},
	{
		title: "依地區篩選",
		icon: "📍"
	},
	{
		title: "依物種篩選",
		icon: "🐕"
	}
];
function AcquisitionOptionCard({ card }) {
	const cardBody = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "legal-option-visual",
		children: card.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: card.image,
			alt: ""
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			children: card.icon ?? "🐾"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "legal-option-copy",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: card.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "legal-option-city",
			"aria-label": card.city ? `縣市：${card.city}` : void 0,
			children: card.city ?? "\xA0"
		})]
	})] });
	if (card.href) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		className: "legal-option-card is-active",
		href: card.href,
		target: "_blank",
		rel: "noopener noreferrer",
		children: [cardBody, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
			className: "legal-option-action",
			children: "前往查看"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "legal-option-card is-disabled",
		"aria-disabled": "true",
		children: [cardBody, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "legal-option-action",
			type: "button",
			onClick: () => void 0,
			children: "前往查看"
		})]
	});
}
function PetAcquisitionPage({ onBack, onReset }) {
	const [selectedCity, setSelectedCity] = (0, import_react.useState)("");
	const [searchMessage, setSearchMessage] = (0, import_react.useState)("");
	function searchRegion(event) {
		event.preventDefault();
		setSearchMessage("目前先提供取得管道參考，縣市查詢功能準備中。");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap legal-acquisition-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "legal-acquisition-hero",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "下一步" }), "透過合法管道迎接牠"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "完成準備後，請選擇透明、合法且能提供完整資訊的取得方式。" })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "legal-search",
				onSubmit: searchRegion,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "legal-region-select",
						children: "依所在地區查看取得管道"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						id: "legal-region-select",
						value: selectedCity,
						onChange: (event) => setSelectedCity(event.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "選擇縣市"
						}), taiwanCities.map((city) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: city,
							children: city
						}, city))]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						children: "搜尋"
					})] }),
					searchMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						children: searchMessage
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "legal-acquisition-sections",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "legal-section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "legal-section-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "領養" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "可以先從收容所、合作認養平台或數位認養服務查看目前開放認養的動物。" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "legal-option-grid",
						children: adoptionCards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AcquisitionOptionCard, { card }, card.title))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "legal-section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "legal-section-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "購買" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "若選擇購買，請確認來源合法、資訊透明，並了解動物來源、健康紀錄與後續照顧責任。" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "legal-option-grid",
						children: purchaseCards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AcquisitionOptionCard, { card }, card.title))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "legal-acquisition-reminder",
				children: "無論選擇領養或購買，都請確認來源合法，並保留相關文件與健康紀錄。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nav-buttons",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "secondary",
					type: "button",
					onClick: onBack,
					children: "← 返回照顧準備總覽"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary",
					type: "button",
					onClick: onReset,
					children: ["重新開始 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
				})]
			})
		]
	});
}
var emergencyReserve = 2e4;
function IntroIcon({ step }) {
	const common = {
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2.1,
		strokeLinecap: "round",
		strokeLinejoin: "round"
	};
	const icons = [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M18 36c4.5-5.8 23.5-5.8 28 0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M24 27c0 2.2-1.4 4-3.1 4s-3.1-1.8-3.1-4 1.4-4 3.1-4 3.1 1.8 3.1 4Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M46.2 27c0 2.2-1.4 4-3.1 4S40 29.2 40 27s1.4-4 3.1-4 3.1 1.8 3.1 4Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M31.6 20c0 2.4-1.5 4.4-3.4 4.4s-3.4-2-3.4-4.4 1.5-4.4 3.4-4.4 3.4 2 3.4 4.4Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M39.2 20c0 2.4-1.5 4.4-3.4 4.4s-3.4-2-3.4-4.4 1.5-4.4 3.4-4.4 3.4 2 3.4 4.4Z"
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M16 31.5 32 17l16 14.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M20 29v17h24V29"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M29 46V35h6v11"
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M18 38h28l2-10H16l2 10Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M22 28l4-8h12l4 8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M22 41.5h0M42 41.5h0"
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M32 15v34"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M18 32h28"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M22.5 22.5 41.5 41.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M41.5 22.5 22.5 41.5"
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			...common,
			d: "M32 47s14-8.5 14-20a8 8 0 0 0-14-5.2A8 8 0 0 0 18 27c0 11.5 14 20 14 20Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			...common,
			d: "M24 32h5l2-5 4 11 2-6h4"
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M21 24h20v20H21z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M27 20h10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M26 31h12M26 37h8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M43 21l4 4-4 4"
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M21 17h17l5 5v25H21z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M38 17v7h7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				...common,
				d: "M26 31h12M26 37h12M26 43h7"
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			...common,
			d: "M20 32l8 8 16-18"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			...common,
			d: "M17 18h30v30H17z"
		})] })
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: "intro-line-icon",
		viewBox: "0 0 64 64",
		"aria-hidden": "true",
		children: icons[step - 1] ?? icons[0]
	});
}
function Home() {
	const [step, setStep] = (0, import_react.useState)(0);
	const [furthestStep, setFurthestStep] = (0, import_react.useState)(1);
	const [introOpen, setIntroOpen] = (0, import_react.useState)(false);
	const [category, setCategory] = (0, import_react.useState)("");
	const [breed, setBreed] = (0, import_react.useState)("");
	const [selectionPage, setSelectionPage] = (0, import_react.useState)("species");
	const [selectionReached, setSelectionReached] = (0, import_react.useState)(0);
	const [hasPreviousDog, setHasPreviousDog] = (0, import_react.useState)(null);
	const [previousBreed, setPreviousBreed] = (0, import_react.useState)("");
	const [previousDogName, setPreviousDogName] = (0, import_react.useState)("");
	const [preparationTask, setPreparationTask] = (0, import_react.useState)(0);
	const [preparationReached, setPreparationReached] = (0, import_react.useState)(0);
	const [preparationReplayTask, setPreparationReplayTask] = (0, import_react.useState)(null);
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
	const [careCommitted, setCareCommitted] = (0, import_react.useState)(false);
	const costToastTimerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		return () => {
			if (costToastTimerRef.current !== null) {
				window.clearTimeout(costToastTimerRef.current);
				costToastTimerRef.current = null;
			}
		};
	}, []);
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
			3,
			4
		];
		const underlyingStep = [
			3,
			4,
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
		const pageIndex = {
			species: 0,
			breed: 1,
			name: 2,
			history: 3,
			transition: 4
		}[page];
		setSelectionReached((current) => Math.max(current, pageIndex));
	}
	function changePreparationTask(task) {
		setPreparationTask(task);
		setPreparationReplayTask(null);
		setPreparationReached((current) => Math.max(current, task));
	}
	function addExpenseById(id) {
		const expense = expenseCatalog[id];
		if (!expense) return;
		const sizedExpense = applySizeBasedExpenseAmount(expense, getPetSizeForBreed(breed));
		setExpenses((current) => {
			if (current.some((item) => item.id === id)) return current;
			if (costToastTimerRef.current !== null) {
				window.clearTimeout(costToastTimerRef.current);
				costToastTimerRef.current = null;
			}
			setLatestExpense(sizedExpense);
			costToastTimerRef.current = window.setTimeout(() => {
				setLatestExpense((active) => active?.id === id ? null : active);
				costToastTimerRef.current = null;
			}, 2600);
			return [...current, sizedExpense];
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
			const trunkComplete = departureTrunkItems.every((item) => next.includes(item.id));
			setTrunkPassed(trunkComplete);
			if (trunkComplete) setPreparationReached((current) => Math.max(current, 1));
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
	function answerScenarioMultiple(scenario, choices, result) {
		const choiceIds = choices.map((choice) => choice.id);
		const joinedChoiceId = choiceIds.join(",");
		setScenarioAnswers((current) => {
			const previous = current[scenario.id];
			return {
				...current,
				[scenario.id]: previous ? {
					...previous,
					finalChoiceId: joinedChoiceId,
					finalChoiceIds: choiceIds,
					finalResult: result,
					attempts: previous.attempts + 1
				} : {
					scenarioId: scenario.id,
					firstChoiceId: joinedChoiceId,
					finalChoiceId: joinedChoiceId,
					firstChoiceIds: choiceIds,
					finalChoiceIds: choiceIds,
					firstResult: result,
					finalResult: result,
					attempts: 1
				}
			};
		});
		if (result === "correct") choices.flatMap((choice) => choice.expenseIds ?? []).forEach(addExpenseById);
	}
	function resetJourney() {
		setCategory("");
		setBreed("");
		setSelectionPage("species");
		setSelectionReached(0);
		setHasPreviousDog(null);
		setPreviousBreed("");
		setPreviousDogName("");
		setPreparationTask(0);
		setPreparationReached(0);
		setRoomReady([]);
		setHazardsReady([]);
		setMembers(initialMembers);
		setTrunkSelected([]);
		setTrunkPassed(false);
		setExpenses([]);
		setLatestExpense(null);
		if (costToastTimerRef.current !== null) {
			window.clearTimeout(costToastTimerRef.current);
			costToastTimerRef.current = null;
		}
		setLifePhase("arrival-video");
		setPetName("");
		setJourneyIndex(0);
		setJourneyCompleted([]);
		setLifeActivity(initialLifeActivityState);
		setScenarioAnswers({});
		setProfile(initialProfile);
		setCareCommitted(false);
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
			breed,
			onPrepare: addRoomItem,
			onToggleHazard: toggleHazard,
			reviewing: preparationReached >= 1 && preparationReplayTask !== 0,
			onReplay: () => {
				setRoomReady([]);
				setHazardsReady([]);
				setPreparationReplayTask(0);
			},
			onBack: () => goTo(1),
			onNext: () => {
				changePreparationTask(1);
				window.scrollTo({
					top: 0,
					behavior: "auto"
				});
			}
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarTrunkPreparation, {
			selected: trunkSelected,
			petName,
			breed,
			onSelect: selectTrunkItem,
			reviewing: furthestStep >= 3 && preparationReplayTask !== 1,
			onReplay: () => {
				setTrunkSelected([]);
				setTrunkPassed(false);
				setPreparationReplayTask(1);
			},
			onBack: () => changePreparationTask(0),
			onNext: () => {
				setPreparationReached((current) => Math.max(current, 1));
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
			breed,
			answers: scenarioAnswers,
			activity: lifeActivity,
			completedIds: journeyCompleted,
			expenses,
			backupNames,
			members,
			roomReady,
			onIndex: setJourneyIndex,
			onChoose: answerScenario,
			onChooseMultiple: answerScenarioMultiple,
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
					breed,
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
						step >= 2 && step <= 8 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CostBar, {
							expenses,
							emergencyReserve,
							latestExpense,
							breed
						}),
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeciesStep, {
							selectionPage,
							onSelectionPage: changeSelectionPage,
							category,
							breed,
							petName,
							onCategory: setCategory,
							onBreed: (id) => {
								setBreed(id);
								if (id) setSelectionReached((current) => Math.max(current, 1));
							},
							onPetName: setPetName,
							hasPreviousDog,
							previousBreed,
							previousDogName,
							onHasPreviousDog: (value) => {
								setHasPreviousDog(value);
								if (!value) {
									setPreviousBreed("");
									setPreviousDogName("");
								}
							},
							onPreviousBreed: setPreviousBreed,
							onPreviousDogName: setPreviousDogName,
							onNext: () => goTo(2)
						}),
						step === 2 && renderPreparation(),
						step >= 3 && step <= 6 && renderLifeJourney(),
						step === 7 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessmentReport, {
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
								committed: careCommitted,
								onCommittedChange: setCareCommitted,
								onBack: () => {
									setStep(6);
									setIntroOpen(false);
									window.scrollTo({
										top: 0,
										behavior: "smooth"
									});
								},
								onReset: resetAll
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSupplementForm, {
								profile,
								petName,
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "report-next-step-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "primary",
									type: "button",
									disabled: !careCommitted,
									"aria-describedby": "care-commitment-gate",
									onClick: () => {
										setStep(8);
										setFurthestStep((current) => Math.max(current, 8));
										window.scrollTo({
											top: 0,
											behavior: "auto"
										});
									},
									children: ["取得寵物 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
								}), !careCommitted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									id: "care-commitment-gate",
									className: "report-commitment-hint",
									children: "請先勾選上方的照顧承諾，才能進入下一步。"
								})]
							})
						] }),
						step === 8 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetAcquisitionPage, {
							onBack: () => {
								setStep(7);
								setIntroOpen(false);
								window.scrollTo({
									top: 0,
									behavior: "smooth"
								});
							},
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
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroIcon, { step })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: intros[step - 1].title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "intro-body",
						children: intros[step - 1].body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary large",
						onClick: () => setIntroOpen(false),
						children: ["開始 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
					})
				]
			})
		]
	});
}
//#endregion
export { Home as default };
