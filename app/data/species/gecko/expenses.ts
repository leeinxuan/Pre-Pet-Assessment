import type { ExpenseRecord, SpeciesExpenseRules } from "../../../game-types";

const initial = (id: string, name: string, amount: number, description?: string): ExpenseRecord => ({ id, name, amount, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description });
export const geckoExpenses: Record<string, ExpenseRecord> = {
  "gecko-terrarium": { ...initial("gecko-terrarium", "爬蟲專用玻璃缸", 8000), maxAmount: 8000 },
  "gecko-heat-mat": { ...initial("gecko-heat-mat", "加熱片（爬蟲專用）", 1500), maxAmount: 1500 },
  "gecko-lighting-setup": { ...initial("gecko-lighting-setup", "光源設備（UVB 燈 + 日夜節律燈）", 1300), maxAmount: 1300 },
  "gecko-enrichment-decor": { ...initial("gecko-enrichment-decor", "環境豐富化物件（石板、沉木或人造植物）", 300), maxAmount: 500 },
  "gecko-thermometer-2": { ...initial("gecko-thermometer-2", "數位溫濕度計 × 2", 800), maxAmount: 800 },
  "gecko-warm-hide": { ...initial("gecko-warm-hide", "熱區躲避屋", 600), maxAmount: 600 },
  "gecko-cool-hide": { ...initial("gecko-cool-hide", "冷區躲避屋", 400), maxAmount: 400 },
  "gecko-moist-hide": { ...initial("gecko-moist-hide", "濕躲避屋（脫皮盒）", 600), maxAmount: 600 },
  "gecko-substrate": { ...initial("gecko-substrate", "安全底材", 500), maxAmount: 500 },
  "gecko-water-dish": { ...initial("gecko-water-dish", "淺水碟", 200), maxAmount: 200 },
  "gecko-calcium-dish": { ...initial("gecko-calcium-dish", "補鈣碟", 150), maxAmount: 150 },
  "gecko-feeding-tongs": { ...initial("gecko-feeding-tongs", "餵食用長夾", 300), maxAmount: 300 },
  "gecko-feeder-insects-initial": { ...initial("gecko-feeder-insects-initial", "首批活體餌料昆蟲及飼育容器", 300), maxAmount: 300 },
  "gecko-supplements-initial": { ...initial("gecko-supplements-initial", "鈣粉與綜合維他命粉", 400), maxAmount: 400 },
  "gecko-cover-towel": { ...initial("gecko-cover-towel", "小毛巾", 0), stage: "出發前準備" },
  "gecko-soft-padding": { ...initial("gecko-soft-padding", "柔軟墊材", 0), stage: "出發前準備" },
  "gecko-transport-box": { ...initial("gecko-transport-box", "爬蟲運輸盒（附通氣孔）", 500), maxAmount: 500, stage: "出發前準備" },
  "gecko-heat-pack": { ...initial("gecko-heat-pack", "暖暖包（氣溫低時備用）", 100), maxAmount: 100, stage: "出發前準備" },
  "gecko-arrival-checkup": { id: "gecko-arrival-checkup", name: "到家第一週健康檢查", amount: 1500, showPlusSuffix: true, maxAmount: 3000, category: "到家後必要支出", stage: "寵物到家後", recurring: false, fromEmergency: false, description: "確認健康狀況、糞便寄生蟲篩檢，建立第一份醫療紀錄（異寵費用標準）。" },
  "gecko-food-monthly": { id: "gecko-food-monthly", name: "活體餌料昆蟲", amount: 800, maxAmount: 800, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "依守宮體型與餵食頻率，成體每 3–7 天餵食一次。" },
  "gecko-calcium-monthly": { id: "gecko-calcium-monthly", name: "鈣粉與綜合維他命補充劑", amount: 300, maxAmount: 300, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "每週 1–2 次餵食前以鈣粉沾裹昆蟲，定期補充。" },
  "gecko-substrate-replace": { id: "gecko-substrate-replace", name: "底材更換", amount: 300, maxAmount: 300, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "建議每月全缸更換一次；椰子纖維磚或紙巾底材均適用。" },
  "gecko-electricity": { id: "gecko-electricity", name: "加熱設備電費（全年）", amount: 500, maxAmount: 500, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "加熱片 24 小時運作；冬天若加輔助加熱燈電費增加。" },
  "gecko-mild-sick": { id: "gecko-mild-sick", name: "輕症就診（拒食、脫皮異常、輕微行為改變）", amount: 1000, maxAmount: 2500, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "含異寵診察費（上限 1,500 元）加藥費；費用來源：桃園市、臺北市、高雄市獸醫師公會診療費用標準（2024–2025）。" },
  "gecko-moderate-sick": { id: "gecko-moderate-sick", name: "急症檢查（骨骼代謝異常疑似、產蛋困難初期、腸道問題）", amount: 2500, maxAmount: 6000, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "含診察費、血液檢查、X 光、藥費；爬蟲 X 光可確認骨骼狀況與產蛋困難情形；費用來源同上。" },
  "gecko-hospitalization": { id: "gecko-hospitalization", name: "住院與手術（產蛋困難手術、體內組織外露手術、嚴重骨骼代謝異常處置）", amount: 6000, maxAmount: 50000, maxAmountOpenEnded: true, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "含麻醉、住院護理與手術費；爬蟲手術需熟悉爬蟲類醫療的獸醫師操作，資源稀少費用高；費用來源同上。" },
  "gecko-senior-room": { id: "gecko-senior-room", name: "高齡環境調整用品（防滑墊、低矮躲避屋、升溫設備補強）", amount: 1000, maxAmount: 3000, category: "高齡用品", stage: "生活變化", recurring: false, fromEmergency: false, description: "高齡守宮行動力下降，需調整缸具佈置降低受傷風險。" },
};

/** 費用流程規則；ID 只引用本物種費用。 */
export const geckoExpenseRules: SpeciesExpenseRules = {};
