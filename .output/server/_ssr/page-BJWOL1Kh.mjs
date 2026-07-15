import { a as require_react, o as __toESM, t as require_jsx_runtime } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-BJWOL1Kh.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var initialProfile = {
	age: "",
	role: "",
	roleOther: "",
	source: "",
	hoursAway: "",
	careHours: "",
	reasons: [],
	reasonOther: "",
	experience: "",
	pastDog: "",
	pastCat: "",
	pastOther: "",
	currentDog: "",
	currentCat: "",
	currentOther: "",
	experienceNote: "",
	housing: "",
	landlordStatus: "",
	rooms: [],
	roomOther: "",
	hasHousemates: null,
	family: [],
	familyOther: "",
	housematesConsent: false,
	photos: []
};
var stations = [
	["01", "選擇夥伴"],
	["02", "法規暖身"],
	["03", "認識你"],
	["04", "費用開箱"],
	["05", "生活預演"],
	["06", "準備房間"],
	["07", "準備摘要"]
];
var intros = [
	{
		eyebrow: "第一站 · 選擇夥伴",
		title: "先從你想一起生活的動物開始",
		body: "不同物種、不同品種，會遇到很不一樣的日常。選擇後，我們會替你換上相符的法規、花費與生活情境。",
		icon: "🐾",
		tip: "這不是承諾，隨時都能回來更換。"
	},
	{
		eyebrow: "第二站 · 法規暖身",
		title: "知道就往右，不清楚就往左",
		body: "不需要猜答案。把不確定的事情留下來，最後會變成你的查詢清單，也方便專業人員接著說明。",
		icon: "↔",
		tip: "選「不太清楚」不會扣分。"
	},
	{
		eyebrow: "第三站 · 認識你",
		title: "把真實生活帶進這場預演",
		body: "住家、時間與同住者會改變照顧安排。請用你現在的狀態回答，不必填成理想中的自己。",
		icon: "⌂",
		tip: "資料只用來產生這次的準備摘要。"
	},
	{
		eyebrow: "第四站 · 費用開箱",
		title: "先猜，再一層一層打開真實花費",
		body: "填下你原本預計準備的金額，再依序打開初期、每月、每年與風險費用。小豬會幫你看見資金的變化。",
		icon: "🐷",
		tip: "金額是柴犬示範值，實際仍依地區與個體調整。"
	},
	{
		eyebrow: "第五站 · 生活預演",
		title: "一起走過九個可能發生的日常",
		body: "每一幕都對應一個重要的飼養面向。沒有標準答案，請選最接近你真的會做的事，也可以留下一句想法。",
		icon: "☁",
		tip: "慢一點想，這正是這段體驗的目的。"
	},
	{
		eyebrow: "第六站 · 準備房間",
		title: "先把環境準備好，再把動物帶回家",
		body: "把已經備妥的物品拖進房間，或用點擊加入；還沒準備也沒關係，它們會自動留在待辦清單。",
		icon: "📦",
		tip: "先環境、後動物，是降低匆忙決定的重要一步。"
	},
	{
		eyebrow: "最後一站 · 準備摘要",
		title: "這不是判決書，是下一場對話的地圖",
		body: "綠色代表已經有方向，黃色代表還想確認，橘色代表值得優先討論。把它帶給獸醫、收容所或寵物店逐項聊聊。",
		icon: "✓",
		tip: "摘要不會顯示「適合」或「不適合飼養」。"
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
var laws = [
	{
		title: "寵物登記",
		statement: "犬隻應植入晶片並辦理寵物登記",
		detail: "帶回家後先確認來源文件與登記資訊，並依規定完成飼主資料更新。"
	},
	{
		title: "公共場所",
		statement: "外出時需有人陪同，並採取適當防護",
		detail: "牽繩、運輸籠或其他防護方式，需依場所與犬隻狀況妥善使用。"
	},
	{
		title: "基本責任",
		statement: "飼主需提供適當飲食、環境與必要醫療",
		detail: "生病或受傷時應及時就醫，日常也需維持可活動、可休息的安全環境。"
	},
	{
		title: "棄養責任",
		statement: "棄養動物可能面臨行政處分",
		detail: "生活變動時，應先尋求合法轉養、行為或照護支援，不可任意棄置。"
	},
	{
		title: "五大自由",
		statement: "照顧包含免於飢渴、恐懼、病痛與不適",
		detail: "也要讓動物能表現自然行為；這些原則會一路出現在後面的情境裡。"
	},
	{
		title: "合法取得",
		statement: "取得前應確認合法來源與健康資訊",
		detail: "向收容所、合法業者或原飼主取得時，都應確認紀錄、晶片與交接文件。"
	}
];
var money = new Intl.NumberFormat("zh-TW");
var estimatedLifespan = 15;
var costBoxes = [
	{
		title: "初期準備",
		amount: 16800,
		unitLabel: "NT$ 16,800",
		formula: "一次性估算",
		icon: "📦",
		detail: "認養／來源、健檢、晶片、運輸籠、圍欄與基本用品"
	},
	{
		title: "每月日常",
		amount: 3600 * 12 * estimatedLifespan,
		unitLabel: "NT$ 3,600／月",
		formula: `3,600 × 12 個月 × ${estimatedLifespan} 年 ＝ NT$ ${money.format(3600 * 12 * estimatedLifespan)}`,
		icon: "🦴",
		detail: "飼料、清潔、驅蟲、消耗品與基礎美容"
	},
	{
		title: "每年固定",
		amount: 12800 * estimatedLifespan,
		unitLabel: "NT$ 12,800／年",
		formula: `12,800 × ${estimatedLifespan} 年 ＝ NT$ ${money.format(12800 * estimatedLifespan)}`,
		icon: "🩺",
		detail: "預防針、健康檢查、保健與用品汰換"
	},
	{
		title: "風險準備",
		amount: 5e4,
		unitLabel: "NT$ 50,000",
		formula: "至少保留一筆緊急預備金",
		icon: "☂",
		detail: "急診、意外、慢性病、行為訓練或臨時照護"
	}
];
var scenarios = [
	{
		axis: "A1 物種認識與天性",
		when: "第一天晚上",
		title: "牠和想像中不一樣",
		body: "牠一直躲起來、不願靠近；你想抱抱牠時，牠低吼、咬人或退縮。",
		flag: "柴犬常有獨立、警戒與不喜歡被強迫碰觸的個體差異。",
		choices: [
			"先保持距離，觀察牠的訊號",
			"找訓練與行為資源再調整",
			"我還不確定能否接受這種互動"
		]
	},
	{
		axis: "A2 空間與環境條件",
		when: "飼養幾個月後",
		title: "環境失控時的應變",
		body: "高溫、潮濕或停電時，室內變得悶熱；牠開始焦躁、喘氣。",
		choices: [
			"已有降溫、備援與安全空間方案",
			"會先盤點設備與鄰近安置地點",
			"目前住家很難調整"
		]
	},
	{
		axis: "A3 飲食與食性",
		when: "到家第一週",
		title: "第一餐的落差",
		body: "牠對原本準備的飼料沒興趣，家人開始餵人類食物，腸胃也不太穩。",
		choices: [
			"會維持轉食紀錄並諮詢專業人員",
			"先停止混餵，重新查飲食需求",
			"我可能會一直換食物試試看"
		]
	},
	{
		axis: "A4 健康與醫療",
		when: "到家第二週",
		title: "看起來沒事，但好像不太對",
		body: "食慾下降、活動變少，外觀看不出明顯傷口；你不確定是否要就醫。",
		flag: "犬隻忍耐力可能讓症狀不明顯；異常持續時不宜只靠網路判斷。",
		choices: [
			"記錄症狀並聯絡獸醫評估",
			"先確認可就診的院所與交通",
			"會再多等幾天看看"
		]
	},
	{
		axis: "A5 行為、互動與家庭相處",
		when: "到家第一個月",
		title: "家人開始受不了",
		body: "牠吠叫、亂咬、護食或抓家具，家人的生活被打亂，開始抱怨。",
		choices: [
			"先管理環境並安排家人分工",
			"尋找正向訓練或行為協助",
			"我擔心家人會要求把牠送走"
		]
	},
	{
		axis: "A6 時間與生活型態",
		when: "日常生活開始後",
		title: "加班與照顧衝突",
		body: "你臨時加班到晚上九點，牠還沒散步、放風、吃飯或清理環境。",
		choices: [
			"已有家人、鄰居或照護備案",
			"會先建立臨時照顧名單",
			"目前只能讓牠繼續等"
		]
	},
	{
		axis: "A7 花費與經濟能力",
		when: "飼養幾年後",
		title: "突發支出",
		body: "牠需要檢查與進一步治療，這筆費用比你原本每月預算高很多。",
		choices: [
			"已有緊急預備金或保險規劃",
			"會先和院所討論分階段方案",
			"可能只能選最便宜的方式處理"
		]
	},
	{
		axis: "A8 飼養動機與可持續性",
		when: "飼養幾年後",
		title: "陪伴不是牠唯一的工作",
		body: "你期待牠改善情緒，但牠也會拒絕互動、生病、破壞或需要大量照顧。",
		choices: [
			"能接受牠不是隨時配合的陪伴者",
			"會重新確認期待與可投入的照顧",
			"若無法帶來快樂，我會很失望"
		]
	},
	{
		axis: "A9 法規、責任與合法取得",
		when: "接牠回家的當天",
		title: "來源文件還沒準備好",
		body: "對方說健康紀錄、晶片或來源文件之後再補，但希望你今天先把牠帶走。",
		flag: "無法確認合法來源與交接資料時，不要因為『已經到了』就勉強完成。",
		choices: [
			"暫緩交接，先補齊文件與紀錄",
			"請專業人員協助核對流程",
			"先帶走，之後再說"
		]
	}
];
var scenarioOrder = [
	8,
	0,
	2,
	3,
	4,
	5,
	1,
	6,
	7
];
var roomItems = [
	"硬式運輸籠",
	"食物與飲水碗",
	"安全休息區",
	"門窗防逃措施",
	"清潔用品",
	"牽繩與名牌"
];
var checklist = [
	"全家已經討論並同意飼養",
	"已確認租屋或社區飼養規定",
	"已拍下門窗、陽台與活動空間供討論",
	"已找到日常與急診可到達的動物醫院",
	"至少一位臨時照顧人願意協助",
	"已安排每日活動、餵食與清潔時段"
];
function Home() {
	const [step, setStep] = (0, import_react.useState)(0);
	const [introOpen, setIntroOpen] = (0, import_react.useState)(false);
	const [category, setCategory] = (0, import_react.useState)("");
	const [breed, setBreed] = (0, import_react.useState)("");
	const [lawIndex, setLawIndex] = (0, import_react.useState)(0);
	const [lawAnswers, setLawAnswers] = (0, import_react.useState)({});
	const [profile, setProfile] = (0, import_react.useState)(initialProfile);
	const [budget, setBudget] = (0, import_react.useState)(8e4);
	const [costIndex, setCostIndex] = (0, import_react.useState)(-1);
	const [scenarioIndex, setScenarioIndex] = (0, import_react.useState)(scenarioOrder[0]);
	const [scenarioAnswers, setScenarioAnswers] = (0, import_react.useState)({});
	const [note, setNote] = (0, import_react.useState)("");
	const [roomReady, setRoomReady] = (0, import_react.useState)([]);
	const [checked, setChecked] = (0, import_react.useState)([]);
	const spent = (costIndex < 0 ? [] : costBoxes.slice(0, costIndex + 1)).reduce((sum, item) => sum + item.amount, 0);
	const balance = budget - spent;
	const focusItems = (0, import_react.useMemo)(() => {
		const lawFocus = laws.map((law, index) => ({
			law,
			answer: lawAnswers[index]
		})).filter((item) => item.answer === "unsure").map((item) => `法規確認：${item.law.title}`);
		const lifeFocus = scenarioOrder.map((itemIndex) => ({
			scene: scenarios[itemIndex],
			answer: scenarioAnswers[itemIndex]?.answer
		})).filter((item) => item.answer && item.answer !== "ready").map((item) => `${item.scene.when}：${item.scene.title}`);
		return [...lawFocus, ...lifeFocus];
	}, [lawAnswers, scenarioAnswers]);
	function goTo(next) {
		setStep(next);
		setIntroOpen(next > 0);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function answerLaw(answer) {
		setLawAnswers((current) => ({
			...current,
			[lawIndex]: answer
		}));
		if (lawIndex < laws.length - 1) setLawIndex((value) => value + 1);
	}
	function answerScenario(answer) {
		setScenarioAnswers((current) => ({
			...current,
			[scenarioIndex]: {
				answer,
				note
			}
		}));
		setNote("");
		const displayIndex = scenarioOrder.indexOf(scenarioIndex);
		if (displayIndex < scenarioOrder.length - 1) setScenarioIndex(scenarioOrder[displayIndex + 1]);
	}
	function addRoomItem(item) {
		setRoomReady((current) => current.includes(item) ? current : [...current, item]);
	}
	function toggleCheck(item) {
		setChecked((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
	}
	function clearJourneyData() {
		setCategory("");
		setBreed("");
		profile.photos.forEach((photo) => URL.revokeObjectURL(photo.url));
		setProfile(initialProfile);
		setLawIndex(0);
		setLawAnswers({});
		setBudget(8e4);
		setCostIndex(-1);
		setScenarioIndex(scenarioOrder[0]);
		setScenarioAnswers({});
		setNote("");
		setRoomReady([]);
		setChecked([]);
	}
	function startFreshJourney() {
		clearJourneyData();
		setStep(1);
		setIntroOpen(true);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function resetAll() {
		clearJourneyData();
		setStep(0);
		setIntroOpen(false);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "app-shell",
		children: [
			step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Welcome, { onStart: startFreshJourney }),
			step > 0 && !introOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stage-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "station-rail",
					"aria-label": "體驗進度",
					children: stations.map(([number, label], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: `${step === index + 1 ? "active" : ""} ${step > index + 1 ? "done" : ""}`,
						onClick: () => index + 1 <= step && goTo(index + 1),
						disabled: index + 1 > step,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step > index + 1 ? "✓" : number }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: label })]
					}, number))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "stage",
					"aria-live": "polite",
					children: [
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeciesStep, {
							category,
							breed,
							onCategory: setCategory,
							onBreed: setBreed,
							onNext: () => goTo(2)
						}),
						step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LawStep, {
							index: lawIndex,
							answers: lawAnswers,
							onIndex: setLawIndex,
							onAnswer: answerLaw,
							onBack: () => goTo(1),
							onNext: () => goTo(3)
						}),
						step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileStep, {
							profile,
							onChange: setProfile,
							onBack: () => goTo(2),
							onNext: () => goTo(4)
						}),
						step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CostStep, {
							budget,
							onBudget: setBudget,
							costIndex,
							onCostIndex: setCostIndex,
							balance,
							spent,
							onBack: () => goTo(3),
							onNext: () => goTo(5)
						}),
						step === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioStep, {
							index: scenarioIndex,
							answers: scenarioAnswers,
							note,
							onNote: setNote,
							onIndex: (index) => {
								setScenarioIndex(index);
								setNote(scenarioAnswers[index]?.note ?? "");
							},
							onAnswer: answerScenario,
							onBack: () => goTo(4),
							onNext: () => goTo(6)
						}),
						step === 6 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrepStep, {
							ready: roomReady,
							checked,
							onAdd: addRoomItem,
							onRemove: (item) => setRoomReady((current) => current.filter((value) => value !== item)),
							onToggle: toggleCheck,
							onBack: () => goTo(5),
							onNext: () => goTo(7)
						}),
						step === 7 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryStep, {
							profile,
							breed,
							lawAnswers,
							budget,
							spent,
							ready: roomReady,
							checked,
							focusItems,
							onBack: () => goTo(6),
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
						children: ["我準備好了 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
					})
				]
			})
		]
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
					children: "飼養前生活預演"
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
							children: "這不是適不適合的測驗，而是一場約 10 分鐘的生活預演。看見花費、責任、意外與準備，也把還不確定的地方帶去好好問。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hero-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "primary large",
								onClick: onStart,
								children: ["開始生活預演 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "time-pill",
								children: "◷ 約 10–15 分鐘"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "trust-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "不評分" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "不貼標籤" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "可隨時停下" })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-scene",
					"aria-label": "一個人與柴犬在家中保持舒適距離、安靜相處的插畫",
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
				className: "journey-map",
				children: stations.map(([number, label], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: number }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: label }),
					index < stations.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "···" })
				] }, number))
			})
		]
	});
}
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
			"aria-label": `選擇夥伴第 ${selectionPage === "species" ? 1 : 2} 步，共 2 步`,
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
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
					eyebrow: "01 · 選擇夥伴",
					title: "你想和哪一種動物生活？",
					body: "先選擇物種，我們會在下一頁帶你挑選目前最感興趣的品種。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "category-grid species-page-grid",
					children: categories.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: category === item.id ? "selected" : "",
						onClick: () => item.active && chooseCategory(item.id),
						disabled: !item.active,
						"aria-label": item.active ? `選擇${item.label}` : `${item.label}，陸續開放`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label }),
							!item.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "陸續開放" }),
							item.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "available-hint",
								children: "點擊選擇"
							})
						]
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "click-hint",
					children: "點選物種後，將前往品種選擇頁"
				})
			]
		}, "species") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "partner-selection-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
					eyebrow: `01 · 選擇夥伴 · ${selectedCategory?.label ?? "犬"}`,
					title: "選擇你想飼養的品種",
					body: "挑選一個目前最感興趣的品種，接下來的評估會以它的常見照護需求為主。"
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
					disabled: !breed
				})
			]
		}, "breed")]
	});
}
function LawStep({ index, answers, onIndex, onAnswer, onBack, onNext }) {
	const item = laws[index];
	const complete = Object.keys(answers).length === laws.length;
	const [showTutorial, setShowTutorial] = (0, import_react.useState)(true);
	const [pendingAnswer, setPendingAnswer] = (0, import_react.useState)(null);
	const [dragStart, setDragStart] = (0, import_react.useState)(null);
	const [dragX, setDragX] = (0, import_react.useState)(0);
	const swipeThreshold = 90;
	function choose(answer) {
		if (pendingAnswer) return;
		setPendingAnswer(answer);
		setDragX(answer === "unsure" ? -150 : 150);
		window.setTimeout(() => {
			onAnswer(answer);
			setPendingAnswer(null);
			setDragX(0);
		}, 900);
	}
	function startDrag(event) {
		if (pendingAnswer) return;
		setDragStart(event.clientX);
		event.currentTarget.setPointerCapture(event.pointerId);
	}
	function moveDrag(event) {
		if (dragStart === null || pendingAnswer) return;
		const distance = event.clientX - dragStart;
		setDragX(Math.max(-180, Math.min(180, distance)));
	}
	function finishDrag(event) {
		if (dragStart === null || pendingAnswer) return;
		const distance = event.clientX - dragStart;
		setDragStart(null);
		if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
		if (distance <= -swipeThreshold) choose("unsure");
		else if (distance >= swipeThreshold) choose("know");
		else setDragX(0);
	}
	function cancelDrag(event) {
		setDragStart(null);
		setDragX(0);
		if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
	}
	function answerWithKeyboard(event, answer) {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		choose(answer);
	}
	if (showTutorial) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap compact law-tutorial",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "law-tutorial-eyebrow",
				children: "認識成為飼主的承諾"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "law-tutorial-card",
				"aria-labelledby": "law-tutorial-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "swipe-lesson-icon",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "←" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "☝" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						id: "law-tutorial-title",
						children: "手指向左／向右滑動"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "也可以使用下方左右答案按鈕，以滑鼠或鍵盤完成作答。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "law-tutorial-alert",
						children: "⚠ 依照指示左滑右滑 ⚠"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "law-tutorial-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "secondary",
					onClick: onBack,
					children: "← 返回"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary",
					onClick: () => setShowTutorial(false),
					children: ["開始暖身 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
				})]
			})
		]
	});
	const direction = dragX < -8 ? "unsure" : dragX > 8 ? "know" : null;
	const cardTransform = `translateX(${dragX}px) rotate(${dragX / 24}deg)`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap compact",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
				eyebrow: "02 · 法規暖身",
				title: "哪些你已經知道？",
				body: "誠實留下不熟悉的項目，最後會自動整理成待確認的法規清單。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mini-progress",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${(index + 1) / laws.length * 100}%` } }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
					index + 1,
					" / ",
					laws.length
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `swipe-zone ${direction ? `dragging-${direction}` : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "swipe-choice unsure",
						onClick: () => choose("unsure"),
						onKeyDown: (event) => answerWithKeyboard(event, "unsure"),
						disabled: Boolean(pendingAnswer),
						"aria-label": "向左作答：不太清楚，留到摘要確認",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "←" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "不太清楚" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "左滑 · 留到摘要確認" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: `law-card draggable ${dragStart !== null ? "is-dragging" : ""} ${pendingAnswer ? "is-committing" : ""}`,
						style: { transform: cardTransform },
						onPointerDown: startDrag,
						onPointerMove: moveDrag,
						onPointerUp: finishDrag,
						onPointerCancel: cancelDrag,
						"aria-label": `第 ${index + 1} 題。向左滑是不太清楚，向右滑是我知道。${item.statement}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `drag-cue left ${direction === "unsure" ? "visible" : ""}`,
								"aria-hidden": "true",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "← 不太清楚" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "留到摘要確認" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `drag-cue right ${direction === "know" ? "visible" : ""}`,
								"aria-hidden": "true",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "我知道 →" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "保留為已了解" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: String(index + 1).padStart(2, "0") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: item.statement }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "law-detail",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "小提醒" }), item.detail]
							}),
							answers[index] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: `answered ${answers[index]}`,
								children: answers[index] === "know" ? "已標記：知道" : "已標記：不太清楚"
							}),
							pendingAnswer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `law-answer-feedback ${pendingAnswer}`,
								role: "status",
								"aria-live": "assertive",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: pendingAnswer === "know" ? "→ 已選擇：我知道" : "← 已選擇：不太清楚" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pendingAnswer === "know" ? "已保留為了解項目。" : "已加入摘要的待確認清單。" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.detail })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "swipe-choice know",
						onClick: () => choose("know"),
						onKeyDown: (event) => answerWithKeyboard(event, "know"),
						disabled: Boolean(pendingAnswer),
						"aria-label": "向右作答：我知道，保留為已了解",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "我知道" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "右滑 · 保留為已了解" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dot-nav",
				children: laws.map((_, itemIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `${itemIndex === index ? "active" : ""} ${answers[itemIndex] ? "filled" : ""}`,
					onClick: () => onIndex(itemIndex),
					disabled: Boolean(pendingAnswer),
					"aria-label": `前往第 ${itemIndex + 1} 題`
				}, itemIndex))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButtons, {
				onBack: () => index > 0 ? onIndex(index - 1) : onBack(),
				onNext,
				disabled: !complete || Boolean(pendingAnswer),
				nextLabel: complete ? "整理好了，繼續" : `還有 ${laws.length - Object.keys(answers).length} 題`
			})
		]
	});
}
function ProfileStep({ profile, onChange, onBack, onNext }) {
	const [page, setPage] = (0, import_react.useState)(0);
	const [errors, setErrors] = (0, import_react.useState)({});
	const pageTitles = [
		"基本資料",
		"取得方式",
		"飼養原因",
		"飼養經驗",
		"居住與家庭環境"
	];
	const update = (key, value) => onChange({
		...profile,
		[key]: value
	});
	const clampNumber = (raw, max) => raw === "" ? "" : String(Math.min(max, Math.max(0, Number(raw.replace(/\D/g, "")) || 0)));
	function toggleList(key, value) {
		const current = profile[key];
		if (key === "family") {
			if (value === "無") update(key, current.includes("無") ? [] : ["無"]);
			else update(key, current.includes(value) ? current.filter((item) => item !== value) : [...current.filter((item) => item !== "無"), value]);
			return;
		}
		update(key, current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
	}
	function validate(currentPage) {
		const nextErrors = {};
		if (currentPage === 0) {
			const age = Number(profile.age);
			if (!profile.age || !Number.isInteger(age) || age < 1 || age > 120) nextErrors.age = "請輸入 1～120 歲的正整數。";
			if (!profile.role) nextErrors.role = "請選擇目前身分。";
			if (profile.role === "其他" && !profile.roleOther.trim()) nextErrors.roleOther = "請填寫其他身分。";
		}
		if (currentPage === 1 && !profile.source) nextErrors.source = "請選擇預計取得方式。";
		if (currentPage === 2) {
			if (!profile.reasons.length) nextErrors.reasons = "請至少選擇一項飼養原因。";
			if (profile.reasons.includes("其他") && !profile.reasonOther.trim()) nextErrors.reasonOther = "請填寫其他飼養原因。";
		}
		if (currentPage === 3 && !profile.experience) nextErrors.experience = "請選擇飼養經驗。";
		if (currentPage === 4) {
			if (!profile.housing) nextErrors.housing = "請選擇居住條件。";
			if (profile.housing === "租屋" && !profile.landlordStatus) nextErrors.landlordStatus = "請確認房東狀態。";
			if (!profile.rooms.length) nextErrors.rooms = "請至少選擇一個活動空間。";
			if (profile.rooms.includes("其他") && !profile.roomOther.trim()) nextErrors.roomOther = "請填寫其他活動空間。";
			if (profile.hasHousemates === null) nextErrors.hasHousemates = "請選擇是否有同住家人。";
			if (profile.hasHousemates === true) {
				if (!profile.family.length) nextErrors.family = "請至少選擇一種同住家人狀況。";
				if (profile.family.includes("其他") && !profile.familyOther.trim()) nextErrors.familyOther = "請填寫其他同住家人。";
				if (!profile.housematesConsent) nextErrors.housematesConsent = "請確認所有同住家人知情並同意飼養。";
			}
		}
		setErrors(nextErrors);
		return Object.keys(nextErrors).length === 0;
	}
	function goForward() {
		if (!validate(page)) return;
		if (page < 4) {
			setPage((value) => value + 1);
			setErrors({});
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		} else onNext();
	}
	function goBack() {
		setErrors({});
		if (page > 0) {
			setPage((value) => value - 1);
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		} else onBack();
	}
	function addPhotos(files) {
		if (!files) return;
		const available = 5 - profile.photos.length;
		const incoming = Array.from(files);
		const nextPhotos = incoming.filter((file) => file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024).slice(0, available).map((file, index) => ({
			id: `${Date.now()}-${index}-${file.name}`,
			name: file.name,
			size: file.size,
			url: URL.createObjectURL(file)
		}));
		update("photos", [...profile.photos, ...nextPhotos]);
		if (incoming.some((file) => !file.type.startsWith("image/") || file.size > 10 * 1024 * 1024)) setErrors((current) => ({
			...current,
			photos: "僅接受圖片格式，且每張不可超過 10 MB。"
		}));
		else if (incoming.length > available) setErrors((current) => ({
			...current,
			photos: "最多可上傳 5 張照片。"
		}));
		else setErrors((current) => {
			const next = { ...current };
			delete next.photos;
			return next;
		});
	}
	function removePhoto(id) {
		const photo = profile.photos.find((item) => item.id === id);
		if (photo) URL.revokeObjectURL(photo.url);
		update("photos", profile.photos.filter((item) => item.id !== id));
	}
	const optionButton = (value, selected, action, icon) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: `profile-option ${selected ? "selected" : ""}`,
		"aria-pressed": selected,
		onClick: action,
		onKeyDown: (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				action();
			}
		},
		children: [
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
				"aria-hidden": "true",
				children: "✓"
			}),
			icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: value }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: selected ? "已選擇" : "點擊選擇" })
		]
	}, value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap profile-wizard",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "profile-wizard-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "第三部分｜認識你"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: pageTitles[page] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "沒有理想答案，請依照你現在的生活狀況填寫。" })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [page + 1, " / 5"] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-stepper",
				"aria-label": `第三部分第 ${page + 1} 步，共 5 步`,
				children: pageTitles.map((title, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
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
									htmlFor: "profile-age",
									children: "年齡"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "profile-age",
									type: "number",
									inputMode: "numeric",
									min: "1",
									max: "120",
									placeholder: "例：20",
									value: profile.age,
									"aria-invalid": Boolean(errors.age),
									onChange: (event) => update("age", clampNumber(event.target.value, 120))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "歲" })
							]
						}),
						errors.age && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: errors.age
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "身分（單選）" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "identity-options",
								children: [
									["學生", "▣"],
									["上班族", "♟"],
									["退休", "◎"],
									["其他", "•••"]
								].map(([value, icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [optionButton(value, profile.role === value, () => update("role", value), icon), value === "其他" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": "其他身分",
									placeholder: "請填寫身分",
									disabled: profile.role !== "其他",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "時間" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "profile-time-grid",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["每日離家時長", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"每日 ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									inputMode: "numeric",
									min: "0",
									max: "24",
									value: profile.hoursAway,
									onChange: (event) => update("hoursAway", clampNumber(event.target.value, 24))
								}),
								" 小時"
							] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["可投入照護時間", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"每日 ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									inputMode: "numeric",
									min: "0",
									max: "24",
									value: profile.careHours,
									onChange: (event) => update("careHours", clampNumber(event.target.value, 24))
								}),
								" 小時"
							] })] })]
						})] })
					] }),
					page === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "取得方式（單選）" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "source-options",
							children: [
								["寵物店", "▰"],
								["收容所", "⌂"],
								["尚未決定", "?"]
							].map(([value, icon]) => optionButton(value, profile.source === value, () => update("source", value), icon))
						}),
						errors.source && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: errors.source
						})
					] }),
					page === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: ["飼養原因 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "可複選" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "reason-options",
							children: [
								"陪伴與情緒支持",
								"喜愛動物",
								"孩子或孩子喜歡",
								"外在吸引",
								"看家守衛",
								"他人推薦",
								"其他"
							].map((value) => optionButton(value, profile.reasons.includes(value), () => toggleList("reasons", value)))
						}),
						errors.reasons && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: errors.reasons
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "conditional-input",
							children: ["其他飼養原因", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								disabled: !profile.reasons.includes("其他"),
								placeholder: "請說明其他原因",
								value: profile.reasonOther,
								onChange: (event) => update("reasonOther", event.target.value)
							})]
						}),
						errors.reasonOther && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: errors.reasonOther
						})
					] }),
					page === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "飼養經驗（單選）" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "experience-options",
							children: ["首次飼養", "有飼養經驗"].map((value) => optionButton(value, profile.experience === value, () => update("experience", value)))
						}),
						errors.experience && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: errors.experience
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `experience-detail ${profile.experience === "有飼養經驗" ? "open" : ""}`,
							"aria-hidden": profile.experience !== "有飼養經驗",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "過去與現在的飼養狀況" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pet-count-row",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "曾經飼養" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
											"狗",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: "0",
												max: "99",
												disabled: profile.experience !== "有飼養經驗",
												value: profile.pastDog,
												onChange: (event) => update("pastDog", clampNumber(event.target.value, 99))
											}),
											"隻"
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
											"貓",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: "0",
												max: "99",
												disabled: profile.experience !== "有飼養經驗",
												value: profile.pastCat,
												onChange: (event) => update("pastCat", clampNumber(event.target.value, 99))
											}),
											"隻"
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["其他", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											disabled: profile.experience !== "有飼養經驗",
											value: profile.pastOther,
											onChange: (event) => update("pastOther", event.target.value)
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pet-count-row",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "目前家中有寵物" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
											"狗",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: "0",
												max: "99",
												disabled: profile.experience !== "有飼養經驗",
												value: profile.currentDog,
												onChange: (event) => update("currentDog", clampNumber(event.target.value, 99))
											}),
											"隻"
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
											"貓",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: "0",
												max: "99",
												disabled: profile.experience !== "有飼養經驗",
												value: profile.currentCat,
												onChange: (event) => update("currentCat", clampNumber(event.target.value, 99))
											}),
											"隻"
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["其他", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											disabled: profile.experience !== "有飼養經驗",
											value: profile.currentOther,
											onChange: (event) => update("currentOther", event.target.value)
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "experience-note",
									children: ["其他飼養經驗分享", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										disabled: profile.experience !== "有飼養經驗",
										placeholder: "可以補充照顧過的動物、時間或經驗",
										value: profile.experienceNote,
										onChange: (event) => update("experienceNote", event.target.value)
									})]
								})
							]
						})
					] }),
					page === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "居住條件（單選）" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "housing-options",
								children: ["自有住宅", "租屋"].map((value) => optionButton(value, profile.housing === value, () => update("housing", value)))
							}),
							errors.housing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "field-error",
								children: errors.housing
							}),
							profile.housing === "租屋" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "landlord-options",
								role: "group",
								"aria-label": "房東狀態",
								children: ["房東知情且同意我飼養", "尚未和房東確認"].map((value) => optionButton(value, profile.landlordStatus === value, () => update("landlordStatus", value)))
							}),
							errors.landlordStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "field-error",
								children: errors.landlordStatus
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: ["寵物預計活動空間 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "可複選" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "compact-options",
								children: [
									"戶外空間",
									"室內客廳",
									"房間",
									"其他"
								].map((value) => optionButton(value, profile.rooms.includes(value), () => toggleList("rooms", value)))
							}),
							errors.rooms && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "field-error",
								children: errors.rooms
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "conditional-input",
								children: ["其他活動空間", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									disabled: !profile.rooms.includes("其他"),
									placeholder: "請說明其他空間",
									value: profile.roomOther,
									onChange: (event) => update("roomOther", event.target.value)
								})]
							}),
							errors.roomOther && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "field-error",
								children: errors.roomOther
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "是否有同住家人？" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "housemate-presence-options",
								children: [optionButton("有", profile.hasHousemates === true, () => update("hasHousemates", true)), optionButton("無", profile.hasHousemates === false, () => update("hasHousemates", false))]
							}),
							errors.hasHousemates && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "field-error",
								children: errors.hasHousemates
							}),
							profile.hasHousemates === true && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "housemate-details",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["同住家人狀況 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "可複選" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "compact-options family-options",
										children: [
											"幼童",
											"長者",
											"孕婦",
											"其他"
										].map((value) => optionButton(value, profile.family.includes(value), () => toggleList("family", value)))
									}),
									errors.family && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "field-error",
										children: errors.family
									}),
									profile.family.includes("其他") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "conditional-input",
										children: ["其他同住家人", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											placeholder: "請說明其他同住家人",
											value: profile.familyOther,
											onChange: (event) => update("familyOther", event.target.value)
										})]
									}),
									errors.familyOther && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "field-error",
										children: errors.familyOther
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: `housemate-consent ${profile.housematesConsent ? "checked" : ""}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: profile.housematesConsent,
											onChange: (event) => update("housematesConsent", event.target.checked)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "我已確認所有同住家人知情並同意飼養。" })]
									}),
									errors.housematesConsent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "field-error",
										children: errors.housematesConsent
									})
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: ["居家空間照片 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "最多 5 張，每張 10 MB" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "photo-dropzone",
								htmlFor: "profile-photos",
								onDragOver: (event) => event.preventDefault(),
								onDrop: (event) => {
									event.preventDefault();
									addPhotos(event.dataTransfer.files);
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "＋"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "共同為毛孩的安全把關" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "上傳未來的活動空間與窗戶防護照片" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "點擊選擇或拖曳圖片到這裡" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "profile-photos",
								className: "visually-hidden",
								type: "file",
								accept: "image/*",
								multiple: true,
								onChange: (event) => {
									addPhotos(event.target.files);
									event.target.value = "";
								}
							}),
							errors.photos && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "field-error",
								children: errors.photos
							}),
							profile.photos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "photo-list",
								children: profile.photos.map((photo) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: photo.url,
										alt: `${photo.name} 縮圖`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: photo.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [(photo.size / 1024 / 1024).toFixed(1), " MB"] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => removePhoto(photo.id),
										"aria-label": `刪除 ${photo.name}`,
										children: "刪除"
									})
								] }, photo.id))
							})
						] })
					] })
				]
			}, page),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButtons, {
				onBack: goBack,
				onNext: goForward,
				nextLabel: page === 4 ? "完成認識你，繼續" : "下一步"
			})
		]
	});
}
function CostStep({ budget, onBudget, costIndex, onCostIndex, balance, spent, onBack, onNext }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap cost-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
				eyebrow: "04 · 費用開箱",
				title: "你原本預計準備多少錢？",
				body: "先留下直覺數字，再逐一打開柴犬常見的花費範圍。"
			}),
			costIndex < 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "budget-entry",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pig-visual",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/illustrations/lifetime-costs.png",
							alt: "柴犬、小豬撲滿、月曆與醫療準備用品"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "先猜一個數字，再打開終生花費" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "我原本預計準備" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "NT$" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: "0",
							step: "1000",
							value: budget,
							onChange: (event) => onBudget(Number(event.target.value))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "不用查資料，填下你現在心中的預估就好。" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary",
						onClick: () => onCostIndex(0),
						children: ["開始打開費用盒 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "money-dashboard",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `pig-bank ${balance < 0 ? "low" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/illustrations/lifetime-costs.png",
							alt: "小豬撲滿與柴犬的終生費用插畫"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "對照終生預估後" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
								balance < 0 ? "尚差" : "尚餘",
								" NT$ ",
								money.format(Math.abs(balance))
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: balance < 0 ? "這不是失敗，而是需要分年規劃的終生費用差額" : "把還沒想到的花費也留進計畫裡" })
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "cost-meter",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["原先心中預算 NT$ ", money.format(budget)] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${Math.min(spent / Math.max(budget, 1) * 100, 100)}%` } }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["已打開的終生預估 NT$ ", money.format(spent)] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								"柴犬預估壽命以 ",
								estimatedLifespan,
								" 年計算"
							] })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "cost-grid",
					children: costBoxes.map((box, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: `${index <= costIndex ? "open" : "locked"} ${index === costIndex ? "current" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: index <= costIndex ? box.icon : "?" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [index + 1, " / 4"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: box.title }),
							index <= costIndex ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: box.unitLabel }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: box.formula }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: box.detail })
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "下一個費用盒" })
						]
					}, box.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "cost-action",
					children: costIndex < costBoxes.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary",
						onClick: () => onCostIndex(costIndex + 1),
						children: ["打開下一個費用盒 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "＋" })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "reframe",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✦" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "把缺口變成準備方向" }), "你可以調整取得時間、建立預備金、詢問保險與醫療分期，而不是用一個數字判斷自己。"] })]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButtons, {
				onBack,
				onNext,
				disabled: costIndex < costBoxes.length - 1
			})
		]
	});
}
function ScenarioStep({ index, answers, note, onNote, onIndex, onAnswer, onBack, onNext }) {
	const scene = scenarios[index];
	const displayIndex = scenarioOrder.indexOf(index);
	const complete = Object.keys(answers).length === scenarios.length;
	const choiceTypes = [
		"ready",
		"unsure",
		"discuss"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap scenario-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scene-progress",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${(displayIndex + 1) / scenarios.length * 100}%` } }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: scene.when }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [displayIndex + 1, " / 9"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "scene-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "scene-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: scene.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: scene.body }),
						scene.flag && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "red-flag",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "!" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "入手前紅旗卡" }), scene.flag] })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `scene-art scene-${index}`,
					"aria-hidden": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scene-sprite" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: scene.when })]
				})]
			}, index),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "reflection",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "如果是你，會怎麼做？" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "choice-grid",
						children: scene.choices.map((choice, choiceIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: answers[index]?.answer === choiceTypes[choiceIndex] ? "selected" : "",
							onClick: () => onAnswer(choiceTypes[choiceIndex]),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: [
								"我有方向",
								"我會先查清楚",
								"想找人討論"
							][choiceIndex] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: choice })]
						}, choice))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "留一句給未來的自己（可略過）" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						placeholder: "我想先確認……",
						value: note,
						onChange: (event) => onNote(event.target.value)
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scene-dots",
				children: scenarioOrder.map((itemIndex, position) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `${itemIndex === index ? "active" : ""} ${answers[itemIndex] ? answers[itemIndex].answer : ""}`,
					onClick: () => onIndex(itemIndex),
					"aria-label": `前往第 ${position + 1} 個生活情境`,
					children: position + 1
				}, itemIndex))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButtons, {
				onBack,
				onNext,
				disabled: !complete,
				nextLabel: complete ? "完成預演，去準備房間" : `還有 ${scenarios.length - Object.keys(answers).length} 幕`
			})
		]
	});
}
function PrepStep({ ready, checked, onAdd, onRemove, onToggle, onBack, onNext }) {
	const waiting = roomItems.filter((item) => !ready.includes(item));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap prep-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeading, {
				eyebrow: "06 · 準備房間",
				title: "把已經準備好的東西放進家裡",
				body: "拖曳或點一下物品即可加入。沒放進去的項目，會自動出現在最後的待辦。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "prep-board",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "item-shelf",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["準備箱 ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [waiting.length, " 件待確認"] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: waiting.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							draggable: true,
							onDragStart: (event) => event.dataTransfer.setData("text/plain", item),
							onClick: () => onAdd(item),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: [
									"🧳",
									"🥣",
									"🛏️",
									"🚪",
									"🧼",
									"🦮"
								][roomItems.indexOf(item)] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "拖曳或點擊加入" })
							]
						}, item)) }),
						waiting.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "empty-box",
							children: "箱子空了，已加入所有示範物品 ✓"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "room",
					onDragOver: (event) => event.preventDefault(),
					onDrop: (event) => {
						event.preventDefault();
						onAdd(event.dataTransfer.getData("text/plain"));
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "先把環境準備好，再把動物帶回家" }), ready.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: `placed item-${index}`,
						onClick: () => onRemove(item),
						title: "點擊移回準備箱",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: [
							"🧳",
							"🥣",
							"🛏️",
							"🚪",
							"🧼",
							"🦮"
						][roomItems.indexOf(item)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item })]
					}, item))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "checklist-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "收容所低標與家庭共識"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "再確認幾件帶不進房間的準備" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "check-grid",
					children: checklist.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: checked.includes(item) ? "checked" : "",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: checked.includes(item),
								onChange: () => onToggle(item)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item })
						]
					}, item))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "prep-reassure",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "💡" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "還沒完成也可以繼續" }), "這裡不是闖關。未勾選的項目會成為帶回家前的具體待辦。"] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButtons, {
				onBack,
				onNext,
				nextLabel: "產生我的準備摘要"
			})
		]
	});
}
function SummaryStep({ profile, breed, lawAnswers, budget, spent, ready, checked, focusItems, onBack, onReset }) {
	const todos = [...roomItems.filter((item) => !ready.includes(item)), ...checklist.filter((item) => !checked.includes(item))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content-wrap summary-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "summary-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "07 · 我的飼養準備摘要"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
						"你已經把衝動，",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"變成可以討論的準備。"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "請帶著這份摘要，與獸醫、收容所或合法寵物店逐項確認。" })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "summary-pet",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🐕" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["我想飼養", breeds.find((item) => item.id === breed)?.label] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: profile.source })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "status-legend",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "green" }), "已有方向"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "yellow" }), "還要確認"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "orange" }), "優先討論"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card profile-summary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "目前的生活" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "關於準飼主" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "年齡／身分" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
								profile.age || "未填",
								" 歲 · ",
								profile.role === "其他" ? profile.roleOther : profile.role
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "居住狀況" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
								profile.housing,
								" · ",
								profile.hasHousemates ? profile.family.join("、") : "無同住家人"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "每日時間" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
								"離家 ",
								profile.hoursAway || "未填",
								" 小時／照顧 ",
								profile.careHours || "未填",
								" 小時"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "飼養經驗" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: profile.experience })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "主要動機" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: profile.reasons.join("、") })] })
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card money-summary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "card-head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "費用預演" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "終生費用對照" })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "money-compare",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "原先心中預估" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["NT$ ", money.format(budget)] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [estimatedLifespan, " 年終生預估"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["NT$ ", money.format(spent)] })] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: budget - spent < 0 ? "orange-note" : "green-note",
								children: budget - spent < 0 ? `終生預估尚有 NT$ ${money.format(spent - budget)} 的差額，建議拆成每月、每年與緊急預備金分別規劃。` : `目前保留 NT$ ${money.format(budget - spent)} 的彈性，可再確認醫療風險。`
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card readiness",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "03" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "已經準備" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "可以延續的方向" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [[...ready, ...checked].slice(0, 7).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: "green",
							children: "✓"
						}), item] }, item)), ready.length + checked.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: "yellow",
							children: "?"
						}), "目前還沒有勾選項目，可以從運輸籠開始。"] })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card todo",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "04" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "帶回家前" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "下一步待辦" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [todos.slice(0, 7).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: "yellow",
							children: "!"
						}), item] }, item)), todos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: "green",
							children: "✓"
						}), "示範清單已全部確認，請再和專業人員核對。"] })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card discuss",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "05" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "給專業人員" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "優先深入討論" })] })]
						}), focusItems.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: focusItems.slice(0, 8).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: "orange",
							children: "●"
						}), item] }, item)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "all-clear",
							children: "目前沒有被標記的疑問；仍建議逐項確認品種需求與醫療安排。"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "summary-card law-summary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "card-head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "06" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "法規暖身" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "了解狀況" })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "law-count",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: Object.values(lawAnswers).filter((value) => value === "know").length }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "已了解" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: Object.values(lawAnswers).filter((value) => value === "unsure").length }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "待確認" })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "請以主管機關最新公告與專業人員說明為準。" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "summary-footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "這份摘不判斷你是否適合飼養。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"它只幫你把真正需要準備與討論的事情，放到衝動之前。"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "secondary",
					onClick: onReset,
					children: "重新預演"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary",
					onClick: () => window.print(),
					children: ["列印／儲存摘要 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "↗" })]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "text-back",
				onClick: onBack,
				children: "← 回去調整準備清單"
			})
		]
	});
}
//#endregion
export { Home as default };
