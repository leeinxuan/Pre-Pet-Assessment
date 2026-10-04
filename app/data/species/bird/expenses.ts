import type { ExpenseRecord } from "../../../game-types";

/** 鸚鵡流程的費用清單。 */
export const birdExpenses: Record<string, ExpenseRecord> = {
  "bird-cage": { id: "bird-cage", name: "鳥籠", amount: 800, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "方形金屬籠（白鐵）較佳；格柵間距需依體型選擇；破壞力強者選金屬籠。" },
  "bird-perch-set": { id: "bird-perch-set", name: "棲木組", amount: 300, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "提供不同材質與粗細的棲木；寬度讓足趾環繞約 2/3 為佳。" },
  "bird-food-bowl": { id: "bird-food-bowl", name: "食碗／食杯", amount: 120, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "依食性選擇適當容器；吸蜜性鳥類需專用碗具。" },
  "bird-water-bowl": { id: "bird-water-bowl", name: "水碗／水杯", amount: 120, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "不使用過大過深容器；避免鳥跌落。" },
  "bird-chew-toy": { id: "bird-chew-toy", name: "啃咬玩具", amount: 200, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "天然材質（木材、麻繩）降低誤食風險；為消耗品，需定期更換。" },
  "bird-climbing-toy": { id: "bird-climbing-toy", name: "攀爬玩具", amount: 300, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "增加籠內落腳空間，鼓勵活動；視使用狀況定期更換。" },
  "bird-feces-tray": { id: "bird-feces-tray", name: "糞尿托盤與墊料", amount: 250, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "籠底附糞尿盤；放報紙、紙棉等墊料，每日清潔。" },
  "bird-thermometer": { id: "bird-thermometer", name: "溫度計", amount: 200, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "鳥對溫度變化敏感，維持環境溫度穩定非常重要。" },
  "bird-carrier": { id: "bird-carrier", name: "鳥用外出籠", amount: 800, category: "一次性準備費", stage: "出發前準備", recurring: false, description: "通風良好、材質堅固、內有棲木；縫隙不讓肢體探出。" },
  "bird-cover-cloth": { id: "bird-cover-cloth", name: "遮光布", amount: 200, category: "一次性準備費", stage: "出發前準備", recurring: false, description: "遮蔽籠具降低外界刺激，減少途中緊迫；也用於日常安靜休息。" },
  "bird-starter-food": { id: "bird-starter-food", name: "物種主食飼料", amount: 150, category: "一次性準備費", stage: "出發前準備", recurring: false, description: "依食性選購：種子飼料、滋養丸或吸蜜粉；切勿混用不同食性飼料。" },
  "bird-arrival-checkup": { id: "bird-arrival-checkup", name: "到家後首次健康檢查", amount: 1200, category: "到家後必要支出", stage: "寵物到家後", recurring: false, description: "鳥類常隱藏病徵，抵家後應找熟悉鳥類醫療的獸醫建立健康基準。" },
  "bird-food-monthly": { id: "bird-food-monthly", name: "每月飼料費（主食＋鮮食）", amount: 500, category: "每月基本支出", stage: "日常照護", recurring: true, description: "專用飼料為主食，鮮食（蔬果）為輔；鮮食不建議甜度高的水果；不建議僅以單一飼料為全部食物。" },
  "bird-cleaning-monthly": { id: "bird-cleaning-monthly", name: "每月清潔耗材費", amount: 200, category: "每月基本支出", stage: "日常照護", recurring: true, description: "糞尿托盤墊料每日更換；定期徹底清洗消毒籠舍；使用確認對鳥無害的清潔劑。" },
  "bird-emergency-vet": { id: "bird-emergency-vet", name: "緊急就醫費用", amount: 4000, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "張口呼吸、翅膀下垂、無法穩站棲木等警訊須立即就醫；鳥基礎代謝高、病程快。" },
  "bird-mild-sick": { id: "bird-mild-sick", name: "輕症就診（輕微糞便異常／輕度羽毛問題）", amount: 1500, category: "臨時／醫療支出", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "掛號費 + 診察費 + 3–5 天藥費；輕微糞便異常、輕度羽毛問題等症狀輕微未達抽血標準；鳥科獸醫資源稀少，建議事先找好可看診的獸醫。" },
  "bird-moderate-sick": { id: "bird-moderate-sick", name: "急症檢查（澎毛精神極差／消化異常）", amount: 5000, category: "臨時／醫療支出", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "掛號費 + 血液檢查 + X 光 + 藥費；澎毛、精神低落、消化異常持續超過一天；鳥類血量少，採樣技術難度高，費用較犬貓高。" },
  "bird-hospitalization": { id: "bird-hospitalization", name: "住院與手術費用", amount: 15000, category: "臨時／醫療支出", stage: "生病與就醫", recurring: false, fromEmergency: true, description: "需住院觀察、手術（如難產取蛋、腫瘤切除）；鳥類麻醉風險高，費用依病因差異極大。" },
  "bird-senior-checkup": { id: "bird-senior-checkup", name: "高齡健康檢查", amount: 2000, category: "臨時／醫療支出", stage: "生活變化", recurring: false, description: "高齡鳥應提高健檢頻率；體重、飲食、羽毛及站棲狀態定期評估。" },
  "bird-senior-room": { id: "bird-senior-room", name: "高齡環境調整用品", amount: 1200, category: "高齡用品", stage: "生活變化", recurring: false, description: "降低棲木高度防跌落、增加保暖設備（暖燈、布巾）、減少環境干擾。" },
};
