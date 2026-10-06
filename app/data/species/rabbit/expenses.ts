import type { ExpenseRecord } from "../../../game-types";

/** §7 兔子費用清單；金額與費用明細說明均以 rabbit-game-planning.md 為準。 */
export const rabbitExpenses: Record<string, ExpenseRecord> = {
  "rabbit-hay-rack": { id: "rabbit-hay-rack", name: "牧草架", amount: 800, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "固定牧草避免踩踏污染；無限量供應牧草為兔子最重要的飲食需求" },
  "rabbit-heavy-water-bowl": { id: "rabbit-heavy-water-bowl", name: "較重的飲水碗", amount: 350, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "較重不易翻倒；每日換新鮮水、保持清潔" },
  "rabbit-litter-box": { id: "rabbit-litter-box", name: "兔用便盆", amount: 600, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "兔子可訓練定點上廁所；搭配墊料每日清理" },
  "rabbit-hiding-box": { id: "rabbit-hiding-box", name: "躲藏箱／小屋", amount: 800, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "提供可隨時躲藏的安全空間，減少緊迫" },
  "rabbit-anti-slip-mat": { id: "rabbit-anti-slip-mat", name: "防滑墊", amount: 400, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "防止兔子在地板上打滑，保護關節與後肢" },
  "rabbit-cooling-mat": { id: "rabbit-cooling-mat", name: "陶板涼感墊", amount: 600, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "夏季降溫必備；兔子對高溫極度敏感，超過 28°C 有中暑風險" },
  "rabbit-chew-toy": { id: "rabbit-chew-toy", name: "木製咀嚼玩具", amount: 200, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "天然材質供兔子啃咬；維持牙齒磨損，兼具豐富化功能" },
  "rabbit-dig-box": { id: "rabbit-dig-box", name: "挖掘箱", amount: 400, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "提供挖掘行為出口，減少破壞性行為" },
  "rabbit-fence-pen": { id: "rabbit-fence-pen", name: "圍片／柵欄", amount: 1500, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "限制兔子活動範圍，同時提供安全的自由活動空間" },
  "rabbit-hay-initial": { id: "rabbit-hay-initial", name: "牧草（初期備量）", amount: 600, category: "一次性準備費", stage: "飼養前準備", recurring: false, fromEmergency: false, description: "兔子最重要的主食，入住前需備妥足量；之後每月持續補充（見每月基本支出）" },
  "rabbit-carrier": { id: "rabbit-carrier", name: "安全外出籠／提袋", amount: 1800, category: "一次性準備費", stage: "出發前準備", recurring: false, fromEmergency: false, description: "通風良好、兔子能站立轉身；外出就醫、移動時使用" },
  "rabbit-cooling-pack": { id: "rabbit-cooling-pack", name: "保冷袋／冰袋", amount: 400, category: "一次性準備費", stage: "出發前準備", recurring: false, fromEmergency: false, description: "夏季外出時放於外出籠旁降溫；兔子體溫調節能力差" },
  "rabbit-arrival-checkup": { id: "rabbit-arrival-checkup", name: "到家後首次健康檢查", amount: 2000, category: "到家後必要支出", stage: "寵物到家後", recurring: false, fromEmergency: false, description: "確認健康狀況，建立第一份醫療紀錄；兔子常隱藏不適，早期檢查非常重要" },
  "rabbit-hay-monthly": { id: "rabbit-hay-monthly", name: "每月牧草與基本飲食費", amount: 1200, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "無限量牧草為最重要的每日食物，佔飲食 80% 以上；依體型與品牌浮動" },
  "rabbit-pellet-monthly": { id: "rabbit-pellet-monthly", name: "每月飼料費用（輔助）", amount: 350, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "顆粒飼料為輔助，不超過飲食 5%；依體重控制每日份量" },
  "rabbit-veggies-monthly": { id: "rabbit-veggies-monthly", name: "每月新鮮葉菜費用", amount: 550, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "每日提供新鮮蔬菜（以深綠色葉菜為主）；佔飲食約 10–15%" },
  "rabbit-litter-monthly": { id: "rabbit-litter-monthly", name: "每月便盆墊料費用", amount: 450, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "草製或紙製墊料；每日清理，每週全換" },
  "rabbit-ac-monthly": { id: "rabbit-ac-monthly", name: "夏季冷氣電費", amount: 1500, category: "每月基本支出", stage: "日常照護", recurring: true, fromEmergency: false, description: "夏季維持 26°C 以下必要開支；兔子無法耐熱，高溫可致命（夏季適用）" },
  "rabbit-sterilization-male": { id: "rabbit-sterilization-male", name: "絕育手術費用（公兔）", amount: 1000, maxAmount: 6000, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "建議 4–6 個月大後安排；可減少噴尿標記、攻擊行為與意外繁殖風險；費用依診所差異大，異寵醫院偏高" },
  "rabbit-sterilization-female": { id: "rabbit-sterilization-female", name: "絕育手術費用（母兔）", amount: 3000, maxAmount: 15000, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "建議 4–6 個月大後安排；可大幅降低子宮腺癌風險（母兔 3 歲後罹患率逾 50%）；開腹手術難度高，費用明顯高於公兔" },
  "rabbit-mild-sick": { id: "rabbit-mild-sick", name: "輕症就診（輕微腸胃問題等）", amount: 1000, maxAmount: 2500, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "一般門診含診察與短期藥費；兔子易有腸胃蠕動問題，輕症即需就醫；異寵診所費用可能高於一般犬貓診所" },
  "rabbit-moderate-sick": { id: "rabbit-moderate-sick", name: "急症檢查（消化道阻塞等）", amount: 2500, maxAmount: 6000, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "門診含血液常規或影像檢查與藥費；腸胃停滯（GI Stasis）是兔子最常見緊急狀況" },
  "rabbit-hospitalization": { id: "rabbit-hospitalization", name: "住院與手術費用", amount: 6000, maxAmount: 50000, maxAmountOpenEnded: true, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "含麻醉、住院護理與手術費；兔子麻醉風險高，需有異寵麻醉經驗的獸醫執行" },
  "rabbit-senior-room": { id: "rabbit-senior-room", name: "高齡環境調整用品", amount: 800, maxAmount: 2500, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: false, description: "降低設施高度、增加柔軟墊料、減少跳躍需求；高齡兔關節易退化" },
};
