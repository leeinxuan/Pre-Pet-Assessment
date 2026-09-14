import type { Scenario } from "../../../game-types";
import { incorrect, positive } from "../../shared/scenario-feedback";

const rabbitKnowledge = {
  arrival: ["**躲藏**是兔子面對陌生環境的正常**壓力反應**，不是失敗，也不需要急著安慰。", "先**保持安靜、靜靜等待**，讓牠用自己的節奏探索新家，慢慢建立**信任**。"],
  stomp: ["**跺腳**通常代表緊張或感受到威脅；先降低刺激，不要強迫抱起。", "熟悉的墊料或毛巾能幫助牠在環境改變時建立**安全感**。"],
  heat: ["兔子最適環境約為 **15～25℃**；超過 **28℃** 就要積極留意高溫風險。", "冷氣與可自由選擇的**陶板涼感墊**，是安全的夏日降溫安排。"],
  shedding: ["換毛期要**規律梳毛並觀察排便**；食入太多毛髮可能影響腸胃。", "兔子**不適合洗澡**，日常清潔以梳毛與局部微濕擦拭為主。"],
  health: ["**排便量驟減 ＋ 食慾下降**是重要的**危急警訊**，需要立刻就醫。", "**12 小時完全無進食**就是非常危急的情形，請立刻聯繫**兔科獸醫**。"],
  senior: ["**定期健康檢查**至少**半年一次**，並用降低出入高度、增加**軟質墊料**打造友善關節的環境。", "任何飲食或醫療調整，都先諮詢**兔科獸醫**。"],
};

/** 兔子生活情境題；所有文字依 rabbit-game-planning.md 建立。 */
export const rabbitLifeScenarios: Scenario[] = [
  {
    id: "rabbit-arrival-adjustment", stage: "接回家", stageId: "arrival", stageTitle: "適應新家與安全感", timeLabel: "接回家", title: "牠躲起來了……",
    description: "等了這麼久，`{petName}` 終於到家了。牠走出外出籠後快速嗅了嗅，隨即衝進躲藏箱，縮在最裡面，只有鼻子偶爾微微顫動。\n\n你看著牠，不確定是不是該做點什麼。",
    topic: "兔子適應新家與安全感", reportSummary: "兔子剛到家躲藏是正常反應；應保持安靜，讓牠自己決定何時探索。", artIndex: 0,
    learningPoints: rabbitKnowledge.arrival, knowledgeTitle: "兔子小知識",
    choices: [
      { id: "rabbit-pull-out", text: "把 {petName} 從箱子裡抱出來，讓牠熟悉環境", result: "incorrect", ...incorrect, explanation: "躲藏是正常壓力反應；強迫出來只會增加緊迫，甚至引發休克。", suggestion: "保持安靜，讓牠自己決定何時出來探索。" },
      { id: "rabbit-quiet-explore", text: "保持安靜，讓牠自己決定何時出來", result: "correct", ...positive, explanation: "兔子需要時間適應新環境；主動探索是建立信任的第一步。", expenseIds: ["rabbit-arrival-checkup"] },
      { id: "rabbit-call-loudly", text: "大聲叫牠的名字，讓牠認識你", result: "incorrect", ...incorrect, explanation: "兔子聽覺敏銳，突然的大聲會造成驚嚇。", suggestion: "放慢動作、降低音量，讓牠慢慢習慣你的存在。" },
      { id: "rabbit-food-lure", text: "把玩具和零食放在箱口，引牠出來", result: "incorrect", ...incorrect, explanation: "用食物引誘可能讓牠在害怕與想吃之間更緊迫。", suggestion: "不施壓，讓牠在安全感足夠時自然探索。" },
    ],
  },
  {
    id: "rabbit-stomp", stage: "日常照護", stageId: "daily", stageTitle: "日常照護", timeLabel: "日常照護", title: "{petName} 跺腳了！",
    description: "你費力地把新買的書架搬進 `{petName}` 的活動空間。才剛放好，你就聽見牠用力連續跺著後腳，警戒地盯著這個不速之客。", topic: "兔子跺腳與壓力訊號",
    reportSummary: "兔子跺腳代表緊張或不安；應保持安靜、不強迫互動，並用熟悉氣味協助適應。", artIndex: 1,
    multipleChoice: true, requiredCorrectOptionIds: ["rabbit-stomp-quiet", "rabbit-stomp-familiar"], wrongOptionIds: ["rabbit-stomp-pickup", "rabbit-stomp-welcome"],
    correctSummary: ["保持安靜，讓牠有時間熟悉新氣味。", "在附近放熟悉的舊毛巾或墊料。"], learningPoints: rabbitKnowledge.stomp, knowledgeTitle: "兔子小知識",
    choices: [
      { id: "rabbit-stomp-quiet", text: "保持安靜，給 {petName} 時間習慣新傢俱的氣味", result: "correct", ...positive, explanation: "跺腳代表緊張或不安；讓牠自主熟悉比較安全。" },
      { id: "rabbit-stomp-pickup", text: "把 {petName} 抱起來安慰牠", result: "incorrect", ...incorrect, explanation: "正在緊張的兔子被突然抱起，可能更害怕。", suggestion: "先降低刺激，讓牠自己面對與退避。" },
      { id: "rabbit-stomp-familiar", text: "在新傢俱旁放 {petName} 熟悉的舊毛巾或墊料", result: "correct", ...positive, explanation: "熟悉的氣味有助於建立安全感。" },
      { id: "rabbit-stomp-welcome", text: "牠在歡迎新傢俱，不用理會", result: "incorrect", ...incorrect, explanation: "跺腳是負面訊號，代表緊張或感受到威脅。", suggestion: "用安靜與熟悉氣味協助牠慢慢適應。" },
    ],
  },
  {
    id: "rabbit-heatstroke-prevention", stage: "日常照護", stageId: "daily", stageTitle: "日常照護", timeLabel: "日常照護", title: "夏天到了，怎麼幫牠避暑？",
    description: "今年夏天特別熱，接下來幾天氣溫都會超過 33℃。你家平常不會全天開冷氣，但兔子不能流汗，一旦中暑可能在幾小時內危及生命。\n\n你開始思考：可以怎麼為 `{petName}` 做好環境準備？", topic: "兔子高溫預防",
    reportSummary: "兔子怕熱；夏季應維持涼爽室內環境並提供可自主使用的陶板涼感墊。", artIndex: 2,
    multipleChoice: true, requiredCorrectOptionIds: ["rabbit-heat-air", "rabbit-heat-mat"], wrongOptionIds: ["rabbit-heat-balcony", "rabbit-heat-spray"],
    correctSummary: ["維持室內冷氣或風扇，讓環境保持涼爽。", "在活動區放置陶板涼感墊。"], learningPoints: rabbitKnowledge.heat, knowledgeTitle: "兔子小知識",
    choices: [
      { id: "rabbit-heat-balcony", text: "把 {petName} 移到陽台，讓牠呼吸新鮮空氣", result: "incorrect", ...incorrect, explanation: "夏天陽台可能曝曬、溫度遠高於室內，對兔子非常危險。", suggestion: "改在通風、可控且涼爽的室內安排降溫。" },
      { id: "rabbit-heat-air", text: "確保室內有冷氣或風扇，維持溫度在 25℃ 以下", result: "correct", ...positive, explanation: "冷氣是夏天最有效的保護方式；超過 28℃就需留意高溫徵兆。" },
      { id: "rabbit-heat-mat", text: "在 {petName} 的活動區放一塊陶板涼感墊", result: "correct", ...positive, explanation: "兔子可以自由選擇趴在陶板上降溫，是安全的輔助方式。" },
      { id: "rabbit-heat-spray", text: "用噴霧瓶對 {petName} 噴水幫牠降溫", result: "incorrect", ...incorrect, explanation: "兔子不適合弄濕，直接噴水可能增加緊迫。", suggestion: "以涼爽環境為主，不要全身噴水。" },
    ],
  },
  {
    id: "rabbit-heatstroke-emergency", stage: "日常照護", stageId: "daily", stageTitle: "日常照護", timeLabel: "日常照護", title: "牠看起來不太對勁",
    description: "你回家發現 `{petName}` 躺在籠子角落，呼吸比平時急促，食慾也下降了。你的第一反應是？", topic: "兔子高溫緊急應對",
    reportSummary: "出現高溫警訊時，應立刻移到冷氣房並密切觀察；持續惡化要立即就醫。", artIndex: 2,
    choices: [
      { id: "rabbit-heat-wait", text: "天氣這麼熱很正常，等晚上涼了再看", result: "incorrect", ...incorrect, explanation: "呼吸急促加上食慾下降是危急警訊，不能等待。", suggestion: "立刻移到涼爽環境並評估就醫。" },
      { id: "rabbit-heat-emergency-correct", text: "立刻移到冷氣房，開冷氣，密切觀察，若持續惡化立即就醫", result: "correct", ...positive, explanation: "先改善環境溫度；症狀未改善時需立刻就醫。" },
      { id: "rabbit-heat-ice", text: "用毛巾沾冰水敷全身，幫牠快速降溫", result: "incorrect", ...incorrect, explanation: "不應冰水或大面積弄濕；這會增加緊迫。", suggestion: "以冷氣房降溫為主，必要時儘速就醫。" },
      { id: "rabbit-heat-force-water", text: "強迫餵水，補充水分幫助降溫", result: "incorrect", ...incorrect, explanation: "強迫灌水可能造成緊迫。", suggestion: "提供乾淨飲水，先改善環境溫度並觀察就醫。" },
    ],
  },
  {
    id: "rabbit-shedding", stage: "日常照護", stageId: "daily", stageTitle: "日常照護", timeLabel: "日常照護", title: "換毛期大量脫毛",
    description: "今天早上一打開 `{petName}` 的活動空間，你就被嚇了一跳——地板上毛到處都是，就連水碗旁邊也飄著幾根。牠坐在角落用嘴巴理毛，每梳一下就掉下一撮。", topic: "兔子換毛期照護",
    reportSummary: "換毛期應規律梳毛並觀察排便；不以洗澡處理大量掉毛。", artIndex: 3,
    multipleChoice: true, requiredCorrectOptionIds: ["rabbit-shed-brush", "rabbit-shed-poop"], wrongOptionIds: ["rabbit-shed-vet", "rabbit-shed-bath"],
    correctSummary: ["每天幫牠梳毛，清除脫落毛髮。", "觀察排便數量與外觀。"], learningPoints: rabbitKnowledge.shedding, knowledgeTitle: "兔子小知識",
    choices: [
      { id: "rabbit-shed-brush", text: "每天幫 {petName} 梳毛，清除脫落毛髮", result: "correct", ...positive, explanation: "可降低兔子自行理毛時食入過多毛髮的風險。" },
      { id: "rabbit-shed-vet", text: "立刻帶去看獸醫，一定是生病了", result: "incorrect", ...incorrect, explanation: "成兔每年可能有正常換毛期；若同時食慾下降、皮膚異常或精神差，再就醫確認。", suggestion: "先規律梳毛並觀察食慾、精神與排便。" },
      { id: "rabbit-shed-poop", text: "觀察排便是否正常，留意數量和外觀", result: "correct", ...positive, explanation: "排便是確認消化道是否受換毛期影響的重要指標。" },
      { id: "rabbit-shed-bath", text: "幫 {petName} 洗個澡，讓牠清爽", result: "incorrect", ...incorrect, explanation: "兔子不適合洗澡，也不適合乾洗粉。", suggestion: "日常護理以梳毛為主。" },
    ],
  },
  {
    id: "rabbit-busy-care", stage: "當生活發生變化", stageId: "life-change", stageTitle: "當生活發生變化", timeLabel: "當生活發生變化", title: "如果你很忙，牠怎麼辦？",
    description: "你臨時需要到外地出差三天，沒辦法親自照顧 `{petName}`。這幾天，牠怎麼辦？", topic: "忙碌時的兔子照護安排",
    reportSummary: "兔子需要每日補草、換水、清便盆與觀察糞便；離家時應安排可信任的人每天協助照顧。", artIndex: 5,
    choices: [
      { id: "rabbit-busy-hay", text: "多放一週份量的牧草，讓 {petName} 自己吃", result: "incorrect", ...incorrect, explanation: "牧草需要每天補充新鮮的；飲水、便盆與糞便觀察也不能中斷。", suggestion: "安排可信任的人每日協助照顧。" },
      { id: "rabbit-busy-helper", text: "請家人或朋友每天來幫忙照顧 {petName}", result: "correct", ...positive, explanation: "兔子的照護需要每天進行；先確認協助者知道照護步驟與危急警訊。", suggestion: "交接牧草、飲水、便盆、糞便觀察與緊急聯絡方式。" },
      { id: "rabbit-busy-hotel", text: "把 {petName} 帶到一般寵物旅館寄宿", result: "incorrect", ...incorrect, explanation: "並非每家旅館都熟悉兔子的照護需求。", suggestion: "若需寄宿，要先確認有兔子照護經驗並完整交接。" },
      { id: "rabbit-busy-reduce", text: "這幾天就減少照顧頻率，撐過去就好", result: "incorrect", ...incorrect, explanation: "兔子會隱藏不適；照護中斷可能很快造成危險。", suggestion: "出發前先安排每日可到場的協助者。" },
    ],
  },
  {
    id: "rabbit-health-emergency", stage: "當生活發生變化", stageId: "life-change", stageTitle: "健康狀況變化", timeLabel: "當生活發生變化", title: "糞便突然變少了",
    description: "自從學會每天日常巡視，你對 `{petName}` 的狀態很敏感。今天，便盆裡的糞便比昨天少很多、形狀也偏小；牧草架幾乎沒動過。\n\n牠縮在躲藏箱角落，沒有像往常一樣出來迎接你。", topic: "生活變化：排泄與食慾觀察",
    reportSummary: "排便量驟減與食慾下降是兔子重要危急警訊，應立刻聯繫兔科獸醫。", artIndex: 4,
    learningPoints: rabbitKnowledge.health, knowledgeTitle: "兔子小知識",
    choices: [
      { id: "rabbit-health-wait", text: "這是正常波動，明天再看看", result: "incorrect", ...incorrect, explanation: "排便量突然減少加上食慾下降是重要危急警訊，不能等待。", suggestion: "立刻聯繫兔科獸醫。" },
      { id: "rabbit-health-vet", text: "立刻聯繫兔科獸醫，帶去看診", result: "correct", ...positive, explanation: "12 小時完全無進食就是危急情形；應立刻尋求兔科獸醫協助。", expenseIds: ["rabbit-emergency-reserve"] },
      { id: "rabbit-health-vegetable", text: "換成牠喜歡的蔬菜，刺激食慾", result: "incorrect", ...incorrect, explanation: "突然改變食物可能加重消化問題。", suggestion: "先就醫，不要自行調整飲食處理危急警訊。" },
      { id: "rabbit-health-next-week", text: "記錄下來，下週例行健康檢查時告訴獸醫", result: "incorrect", ...incorrect, explanation: "不能等到下週，延後可能造成嚴重後果。", suggestion: "立刻聯繫兔科獸醫。" },
    ],
  },
  {
    id: "rabbit-senior-care", stage: "當生活發生變化", stageId: "life-change", stageTitle: "高齡照護", timeLabel: "當生活發生變化", title: "牠進入高齡期了，一起調整家的環境吧",
    description: "`{petName}` 已經 6 歲了。這幾個月牠的步伐慢了下來，以前每天都會跳上窩邊看你，現在越來越少。昨天，你看著牠費力跨過便盆矮沿，決定重新看看牠的生活環境。", topic: "生活變化：高齡兔環境與健康照護",
    reportSummary: "高齡兔應提高健檢頻率、降低出入高度並增加軟質墊料；牧草與適當活動仍不可省略。", artIndex: 1,
    learningPoints: rabbitKnowledge.senior, knowledgeTitle: "兔子高齡照護小知識",
    choices: [
      { id: "rabbit-senior-space", text: "減少 {petName} 的活動空間，讓牠多休息", result: "incorrect", ...incorrect, explanation: "高齡兔仍需要適當活動空間；過度限制不利生活品質與腸道蠕動。", suggestion: "依個體狀況調整環境，而非完全限制活動。" },
      { id: "rabbit-senior-hay", text: "減少牧草量，改以軟食為主，比較好消化", result: "incorrect", ...incorrect, explanation: "牧草對高齡兔的磨牙與腸胃功能仍然重要。", suggestion: "飲食調整需依兔科獸醫建議進行。" },
      { id: "rabbit-senior-no-change", text: "維持現有環境不動，避免環境改變造成壓力", result: "incorrect", ...incorrect, explanation: "小幅優化出入高度與休息處是必要的，能保護老化關節與身體。", suggestion: "依牠的行動狀況調整環境，讓移動與休息更容易。" },
      { id: "rabbit-senior-checkup", text: "將健康檢查頻率提高為半年一次，並降低圍欄出入高度、增加軟質墊料", result: "correct", ...positive, explanation: "定期健康檢查有助及早發現高齡兔常見問題；降低出入高度與增加軟墊則能保護老化關節。", expenseIds: ["rabbit-routine-checkup", "rabbit-senior-room"] },
    ],
  },
];
