import type { ExpenseRecord } from "../../../game-types";

const initial = (id: string, name: string, amount: number, description: string): ExpenseRecord => ({ id, name, amount, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description });
export const geckoExpenses: Record<string, ExpenseRecord> = {
  "gecko-terrarium": { ...initial("gecko-terrarium", "爬蟲專用玻璃缸（60×45×30 cm 以上）", 3000, "附緊固式網蓋，是守宮主要生活空間。"), maxAmount: 8000 },
  "gecko-heat-mat": { ...initial("gecko-heat-mat", "加熱片（爬蟲專用）", 500, "建立暖側溫度，需搭配溫控器使用。"), maxAmount: 1500 },
  "gecko-thermostat": { ...initial("gecko-thermostat", "溫控器", 500, "防止加熱片過熱，精確維持設定溫度。"), maxAmount: 1200 },
  "gecko-thermometer-2": { ...initial("gecko-thermometer-2", "數位溫濕度計 × 2", 300, "分別置於暖側與涼側監控。"), maxAmount: 800 },
  "gecko-warm-hide": { ...initial("gecko-warm-hide", "暖側躲避屋", 200, "讓守宮在暖側有隱蔽空間。"), maxAmount: 600 },
  "gecko-cool-hide": { ...initial("gecko-cool-hide", "涼側躲避屋", 200, "讓守宮在涼側休息。"), maxAmount: 400 },
  "gecko-moist-hide": { ...initial("gecko-moist-hide", "濕躲避屋（脫皮盒）", 200, "協助守宮完整蛻皮，防止殘皮問題。"), maxAmount: 600 },
  "gecko-substrate": { ...initial("gecko-substrate", "安全底材（椰子纖維／磁磚）", 100, "禁用細沙，避免腸阻塞。"), maxAmount: 500 },
  "gecko-water-dish": { ...initial("gecko-water-dish", "淺水碟", 100, "每日換水。"), maxAmount: 200 },
  "gecko-calcium-dish": { ...initial("gecko-calcium-dish", "補鈣碟", 50, "常備散裝鈣粉供守宮自行補充。"), maxAmount: 150 },
  "gecko-feeder-insects-initial": initial("gecko-feeder-insects-initial", "首批活體餌料昆蟲及飼育容器", 300, "適應穩定後提供活體餌料。"),
  "gecko-supplements-initial": initial("gecko-supplements-initial", "鈣粉與綜合維他命粉", 400, "餵食前沾鈣粉，定期輪替補充。"),
  "gecko-transport-box": { ...initial("gecko-transport-box", "爬蟲專用運輸盒", 500, "可遮光、附通氣孔，減少運輸視覺刺激。"), stage: "出發前準備" },
  "gecko-heat-pack": { ...initial("gecko-heat-pack", "暖暖包（氣溫低時備用）", 100, "放在運輸盒外層，不能直接接觸守宮。"), stage: "出發前準備" },
  "gecko-arrival-checkup": { id: "gecko-arrival-checkup", name: "到家第一週健康檢查", amount: 1500, maxAmount: 3000, category: "到家後必要支出", stage: "寵物到家後", recurring: false, fromEmergency: false, description: "確認健康狀況、糞便寄生蟲篩檢，建立第一份醫療紀錄。" },
  "gecko-food-monthly": { id: "gecko-food-monthly", name: "活體餌料昆蟲（蟋蟀／杜比亞蟑螂／麵包蟲）", amount: 300, maxAmount: 800, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "依守宮體型與餵食頻率，成體每 2–3 天餵食一次。" },
  "gecko-calcium-monthly": { id: "gecko-calcium-monthly", name: "鈣粉與綜合維他命補充劑", amount: 100, maxAmount: 300, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "每次餵食消耗，定期補充。" },
  "gecko-substrate-replace": { id: "gecko-substrate-replace", name: "底材更換（椰子纖維）", amount: 100, maxAmount: 300, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "建議每月全缸更換一次，紙巾底材費用更低。" },
  "gecko-electricity": { id: "gecko-electricity", name: "加熱設備電費（全年）", amount: 300, maxAmount: 500, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "加熱片 24 小時運作；冬天若加輔助加熱燈電費增加。" },
  "gecko-annual-checkup-avg": { id: "gecko-annual-checkup-avg", name: "定期健康檢查（年均攤）", amount: 250, maxAmount: 400, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "建議每年一次（含糞便寄生蟲篩檢）。" },
  "gecko-mild-sick": { id: "gecko-mild-sick", name: "輕症就診（拒食、脫皮異常、輕微行為改變）", amount: 1000, maxAmount: 2500, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "含異寵診察費與藥費。" },
  "gecko-moderate-sick": { id: "gecko-moderate-sick", name: "急症檢查（MBD 疑似、卵阻塞初期、腸道問題）", amount: 2500, maxAmount: 6000, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "含診察費、CBC、X 光與藥費。" },
  "gecko-hospitalization": { id: "gecko-hospitalization", name: "住院與手術（卵阻塞手術、組織脫垂手術、嚴重 MBD 處置）", amount: 6000, maxAmount: 50000, maxAmountOpenEnded: true, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "含麻醉、住院護理與手術費。" },
  "gecko-senior-room": { id: "gecko-senior-room", name: "高齡環境調整用品（防滑墊、低矮躲避屋、升溫設備補強）", amount: 1000, maxAmount: 3000, category: "高齡用品", stage: "生活變化", recurring: false, fromEmergency: false, description: "高齡守宮行動力下降，需調整缸具佈置降低受傷風險。" },
};
