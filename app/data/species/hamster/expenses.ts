import type { ExpenseRecord } from "../../../game-types";

/** §7 費用清單。金額與說明只在此維護；事件由用品與題目 ID 觸發。 */
export const hamsterExpenses: Record<string, ExpenseRecord> = {
  "hamster-cage-setup": { id: "hamster-cage-setup", name: "倉鼠籠（含底盤、附件）", amount: 2000, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "金屬或硬質材料、底板防逃；足夠空間讓倉鼠自由活動與挖掘" },
  "hamster-wheel": { id: "hamster-wheel", name: "靜音滾輪（實心底板）", amount: 400, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "倉鼠每晚需大量奔跑，滾輪為必備設施；選實心底板防止腳趾卡入" },
  "hamster-hideout": { id: "hamster-hideout", name: "巢箱（倉鼠小屋）", amount: 280, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "倉鼠需要可隨時躲藏的巢穴，也是食物儲藏與睡眠空間" },
  "hamster-water-bottle": { id: "hamster-water-bottle", name: "飲水器（吸管式）", amount: 180, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "吸管式飲水器衛生穩定，不易翻倒弄濕墊料" },
  "hamster-food-bowl": { id: "hamster-food-bowl", name: "食碗（較重陶製）", amount: 120, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "較重的食碗不易被推倒；每天固定量餵食" },
  "hamster-sand-bath-box": { id: "hamster-sand-bath-box", name: "砂浴盆（含初期砂）", amount: 250, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "砂浴是倉鼠清潔毛髮的正確方式；提供固定砂浴盆，定期篩砂清潔" },
  "hamster-bedding-initial": { id: "hamster-bedding-initial", name: "墊料（初期備量）", amount: 175, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "入住前鋪設足夠深度墊料供挖掘保暖；之後每月補充（見每月基本支出）" },
  "hamster-gnaw-initial": { id: "hamster-gnaw-initial", name: "磨牙棒（初期備量）", amount: 100, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "牙齒終生持續生長，入住即需備妥；之後每月補充（見每月基本支出）" },
  "pellet": { id: "pellet", name: "倉鼠綜合飼料", amount: 200, category: "一次性準備費", stage: "飼養前準備", recurring: false, description: "倉鼠專用飼料為主食；入住即需備妥，之後每月補充（見每月基本支出）" },
  "hamster-carrier": { id: "hamster-carrier", name: "防逃運輸容器（金屬或硬質外出盒）", amount: 350, category: "一次性準備費", stage: "出發前準備", recurring: false, description: "倉鼠啃咬力強且擅長利用縫隙逃脫，不可使用薄壁塑膠容器" },
  "hamster-arrival-checkup": { id: "hamster-arrival-checkup", name: "到家後首次健康檢查", amount: 800, category: "到家後必要支出", stage: "寵物到家後", recurring: false, description: "建立第一份醫療紀錄，確認基本健康狀況；倉鼠體型小、體徵不易察覺，及早建立基準值很重要" },
  "hamster-pellet-monthly": { id: "hamster-pellet-monthly", name: "每月綜合飼料費用", amount: 200, category: "每月基本支出", stage: "日常照護", recurring: true, description: "倉鼠專用飼料為主食；每日固定量餵食，觀察剩食情況" },
  "hamster-sand-monthly": { id: "hamster-sand-monthly", name: "每月沙浴用砂費用", amount: 200, category: "每月基本支出", stage: "日常照護", recurring: true, description: "定期補充與篩洗砂浴用砂；保持乾淨防止細菌滋生" },
  "hamster-bedding-monthly": { id: "hamster-bedding-monthly", name: "每月墊料費用", amount: 175, category: "每月基本支出", stage: "日常照護", recurring: true, description: "紙質或木屑墊料；每週部分更換，定期全換" },
  "hamster-gnaw-monthly": { id: "hamster-gnaw-monthly", name: "每月磨牙棒費用", amount: 100, category: "每月基本支出", stage: "日常照護", recurring: true, description: "倉鼠牙齒終生持續生長，需透過磨牙棒維持磨損" },
  "hamster-routine-checkup": { id: "hamster-routine-checkup", name: "定期健康檢查（半年）", amount: 1000, category: "臨時／醫療支出", stage: "生活變化", recurring: false, description: "倉鼠壽命短、易小病惡化，建議每半年一次健檢" },
  "hamster-emergency-vet": { id: "hamster-emergency-vet", name: "緊急就醫費用", amount: 1500, category: "臨時／醫療支出", stage: "生活變化", recurring: false, fromEmergency: true, description: "依病況差異大；倉鼠體型小、麻醉風險較高，費用依病因不同" },
  "hamster-senior-care": { id: "hamster-senior-care", name: "高齡照護備用（環境調整）", amount: 800, category: "臨時／醫療支出", stage: "生活變化", recurring: false, description: "高齡倉鼠需降低籠內設施高度、增加保暖與觀察頻率" },
};
