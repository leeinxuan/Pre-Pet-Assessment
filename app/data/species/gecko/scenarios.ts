import type { Scenario } from "../../../game-types";
import { incorrect, positive } from "../../shared/scenario-feedback";
import { geckoReport } from "./report";
const correct = (id: string, text: string, explanation: string, expenseIds?: string[]) => ({
  id,
  text,
  result: "correct" as const,
  ...positive,
  explanation,
  ...(expenseIds ? {
    expenseIds
  } : {})
});
const wrong = (id: string, text: string, explanation: string) => ({
  id,
  text,
  result: "incorrect" as const,
  ...incorrect,
  explanation
});
export const geckoLifeScenarios: Scenario[] = [
  {
    id: "gecko-arrival-settle",
    stage: "接回家",
    stageId: "arrival",
    stageTitle: "適應新家與安全感",
    timeLabel: "接回家",
    title: "第一天適應新家",
    description: "{petName}剛進爬蟲缸，立刻躲進躲避屋不出來。牠動也不動，你叫牠名字也沒有反應。",
    questionText: "你會怎麼做？",
    topic: "適應期安置",
    reportSummary: "維持安靜與穩定環境，讓守宮自行探索。",
    artIndex: 0,
    sceneMedia: {
      type: "placeholder"
    },
    correctFeedbackMedia: {
      type: "placeholder"
    },
    choices: [
      wrong("force-pick-up", "把牠從躲避屋裡拿出來，放到手上熟悉一下新環境", "強迫接觸會讓守宮在最脆弱的時刻產生強烈壓力，延長適應期，甚至引發防禦性咬人行為。接回初期請先不要碰觸牠。"), wrong("open-lid", "把缸蓋打開，讓房間更透氣一點，方便牠適應氣味", "打開缸蓋會讓守宮感受到外界威脅，且有逃脫風險。爬蟲缸提供的封閉感反而讓牠感到安全。"), correct("quiet-explore", "讓缸蓋蓋好，減少干擾，讓{petName}自己慢慢探索", "守宮需要 5–14 天甚至更長的適應期。此時最好的做法就是關好缸蓋、維持穩定溫度，讓牠在沒有干擾的環境中建立安全感。", [
        "gecko-arrival-checkup"
      ]), wrong("keep-calling", "在缸外輕輕敲缸壁呼喚，讓牠知道你在", "敲缸壁的振動對守宮而言是威脅訊號，讓牠更緊張而非熟悉你。請等牠主動出現後，再緩慢地讓牠習慣你的氣味與存在。")
    ],
    correctSummary: ["守宮接回後需要5–14天的適應期，應保持缸蓋蓋好、減少干擾，不強迫觸碰，等牠主動出現探索後再緩慢建立信任。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你給了{petName}最需要的東西——安靜和空間，做得很好！",
      knowledgeTitle: "守宮小知識",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "守宮對新環境的適應需要時間，**通常需要 5–14 天**才會開始穩定進食。這段期間請維持穩定溫度、減少缸外干擾，不強迫觸碰或餵食。**出現在外頭探索、主動接近食物**，是牠開始適應的好信號。"
        }
      ]
    }
  },
  {
    id: "gecko-refuse-food",
    stage: "日常照護",
    stageId: "daily",
    timeLabel: "日常照護",
    title: "{petName} 已經三天沒吃東西了",
    description: "你每天傍晚放昆蟲進缸，但{petName}躲在暖側躲避屋完全不出來，昆蟲在缸裡爬了一晚最後死掉，牠一口都沒吃。這已經是第三天了。",
    questionText: "你應該怎麼做？（複選）",
    topic: "拒食觀察",
    reportSummary: "先確認溫度與適應／蛻皮狀態，不強迫餵食。",
    artIndex: 0,
    multipleChoice: true,
    requiredCorrectOptionIds: [
      "check-temperature", "check-adaption-or-shed"
    ],
    wrongOptionIds: [
      "force-feed", "switch-to-fruit"
    ],
    choices: [
      correct("check-temperature", "確認溫度計讀數，確保暖側底部溫度在 28–32°C、涼側在 22–25°C", "溫度不足是守宮拒食的最常見原因之一。環境溫度偏低時，守宮的消化與食慾都會大幅下降，確認溫度是第一步。"), wrong("force-feed", "強迫將昆蟲夾到{petName}嘴邊，逼牠吃", "強迫餵食會造成壓力，讓守宮更難建立正常的進食行為。若牠真的不吃，應先排查環境因素，而不是強迫餵食。"), correct("check-adaption-or-shed", "評估是否仍在適應期（接回未滿 2 週）或即將蛻皮（皮膚變灰白）", "接回初期拒食和脫皮前拒食都屬於正常生理行為。若皮膚開始變灰白，守宮正在準備蛻皮，蛻皮後通常會恢復食慾。"), wrong("switch-to-fruit", "把昆蟲換成水果，看看牠會不會喜歡", "守宮是肉食性動物，不吃植物性食物。改換食物種類不是解決拒食的方式，反而可能讓問題更複雜。")
    ],
    correctSummary: ["守宮在適應期、蛻皮前、繁殖季或溫度不足時會正常拒食，應先排查這四個原因，超過14天仍未進食才需就醫，不可強迫餵食。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你沒有慌亂強迫，而是先找出拒食的原因，做得很好！",
      knowledgeTitle: "守宮小知識",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "守宮在幾種情況下會短暫拒食——**適應期（接回 1–2 週內）**、**蛻皮前**（皮膚變灰白）、**繁殖季**（發情期），以及**環境溫度不足**時。首先確認這四個原因，若排除後仍超過 14 天未進食，**應諮詢熟悉爬蟲的獸醫**。不要急著強迫餵食，那會讓問題更難解決。"
        }
      ]
    }
  },
  {
    id: "gecko-temperature-check",
    stage: "日常照護",
    stageId: "daily",
    timeLabel: "日常照護",
    title: "缸裡的加熱片是否夠用？",
    description: "今天特別冷，室溫只有 16°C。你查了一下溫度計，發現暖側底部才 24°C，涼側只有 19°C，都比建議溫度低不少。{petName}縮在暖側躲避屋裡完全沒動靜。",
    questionText: "你應該怎麼做？（複選）",
    topic: "低溫處理",
    reportSummary: "提升室溫並使用適當加熱設備，持續監控溫度。",
    artIndex: 0,
    multipleChoice: true,
    requiredCorrectOptionIds: [
      "room-heating", "add-heating-device"
    ],
    wrongOptionIds: [
      "cover-terrarium", "wait-and-see"
    ],
    choices: [
      correct("room-heating", "開啟室內暖氣，讓整個房間升溫，幫助缸內溫度回升", "室溫過低時，光靠加熱片的加熱效率會大幅下降。將室溫維持在 20°C 以上，能讓加熱片的效果更穩定，守宮也能維持正常體溫。"), correct("add-heating-device", "再增加一片加熱片或使用爬蟲專用陶瓷燈泡加熱，同時監控溫度不超標", "在嚴冬或室溫偏低時，單片加熱片可能不夠用，增加輔助加熱設備是合理的做法，但務必搭配溫度計監控，避免過熱。"), wrong("cover-terrarium", "用棉被或厚布蓋住整個爬蟲缸保溫", "覆蓋整個缸體會阻礙通風，導致缸內濕度飆升、氣體無法流通，對守宮反而有害。保溫應透過適當的加熱設備，而非封閉缸體。"), wrong("wait-and-see", "先觀察幾天，看牠能不能自己撐過去", "低溫會導致守宮消化停滯、免疫力下降，若長期處於過低溫度可能引發嚴重健康問題，不應等待觀察，應即時處理。")
    ],
    correctSummary: ["守宮缸暖側應維持28–32°C、涼側22–25°C，冬天室溫過低時應開暖氣或增設加熱設備，不可覆蓋缸體保溫，所有加熱設備應搭配溫度計監控。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你即時注意到溫度問題並採取了正確的行動，{petName}今晚能暖暖的了！",
      knowledgeTitle: "守宮小知識",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "守宮是**外溫動物**，體溫完全依賴環境溫度。爬蟲缸的**暖側底部應維持 28–32°C，涼側維持 22–25°C**。冬天室溫過低時，加熱效率明顯下降，需增設輔助加熱設備。請勿使用電熱石（加熱石），因無法精準控溫且容易造成燙傷。**所有加熱設備都應搭配溫度計監控**，確保溫度在安全範圍。"
        }
      ]
    }
  },
  {
    id: "gecko-shedding",
    stage: "日常照護",
    stageId: "daily",
    timeLabel: "日常照護",
    title: "{petName} 在脫皮，但有一段皮卡住了",
    description: "你發現{petName}身上有一段舊皮一直沒有脫乾淨，前腳的趾端有白色的殘皮包著，已經過了兩天了。",
    questionText: "你應該怎麼做？（複選）",
    topic: "脫皮照護",
    reportSummary: "提高濕躲避屋濕度或溫水軟化殘皮，避免強拉。",
    artIndex: 0,
    multipleChoice: true,
    requiredCorrectOptionIds: [
      "wet-hide-assist", "warm-water-soak"
    ],
    wrongOptionIds: [
      "force-remove-shed", "just-wait"
    ],
    choices: [
      wrong("force-remove-shed", "直接用手或鑷子強行拉除殘皮", "強行拉除殘皮可能一起扯下嬌嫩皮膚，甚至造成出血和組織傷害。請先軟化殘皮，不要直接硬拉。"), correct("wet-hide-assist", "在濕躲避屋內鋪上更濕潤的濕紙巾，讓{petName}自己進去泡一泡軟化殘皮", "提高濕躲避屋濕度，讓守宮在裡面自然活動時殘皮軟化，是最溫和有效的方式，通常一晚就能改善。"), correct("warm-water-soak", "用溫水輕輕浸泡守宮趾端（水溫不超過 30°C），後以軟濕棉棒輕輕協助移除軟化的殘皮", "以溫水短暫浸泡後，殘皮變軟可以更安全地用棉棒輕輕撥除，這是協助守宮去除殘皮的標準方法。"), wrong("just-wait", "等待觀察，殘皮應該會自己掉", "趾端殘皮若不處理，會逐漸收縮，阻斷血液循環，嚴重時導致趾端壞死脫落，應在兩天內主動協助處理。")
    ],
    correctSummary: ["守宮趾端殘皮超過48小時應主動用溫水軟化後協助去除或提高濕躲避屋濕度，不可強行硬拉，以防血液循環受阻導致趾端壞死。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你用對了方式幫助{petName}完成脫皮，細心又有耐心！",
      knowledgeTitle: "守宮小知識",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "守宮定期蛻皮，**蛻皮前皮膚會變得灰白暗淡**，這時不要打擾牠，也不要餵食。蛻皮不完全多半是因為**環境濕度不足**——確保濕躲避屋內保持潮濕是預防的根本。**趾端和眼周是最容易殘留的位置**，若超過 48 小時仍有殘皮，請主動用溫水軟化後協助去除，避免血液循環受阻。"
        }
      ]
    }
  },
  {
    id: "gecko-busy-care",
    stage: "生活變化",
    stageId: "life-change",
    stageTitle: "當生活發生變化",
    timeLabel: "當生活發生變化",
    title: "臨時晚歸，{petName} 的照顧怎麼辦？",
    description: "今天臨時需要加班，預計晚上九點才能到家。守宮是夜行性動物，傍晚開始活動——而今天剛好也是餵食日（守宮每 2–3 天餵一次），需要在傍晚提供沾好鈣粉的活昆蟲。缸內溫度也要在傍晚確認一次，排泄位置和守宮的精神狀況也要有人看過。這樣下去，今晚誰來照顧牠？",
    questionText: "你會怎麼做？",
    topic: "忙碌備援計畫",
    reportSummary: "提前安排可信任協助者並交接照護內容。",
    artIndex: 0,
    busyCarePresentation: {
      animalName: "小型地棲性守宮",
      sceneMedia: {
        type: "placeholder"
      },
      feedbackMedia: {
        type: "placeholder"
      }
    },
    busyCareCompletion: {
      title: "做得很好！",
      encouragement: "你不只是找了人，還確認了時間、意願、照護細節和緊急聯絡，這樣的交接才能讓 {petName} 在你忙碌時仍獲得穩定照顧，做得很好！",
      reflectionTitle: "留給自己的一個問題",
      reflectionText: "牠很獨立，但每天的照顧，一天都少不了。",
      reflectionContent: [
        "忙完這段時間回到家，你還有心思確認{petName}的溫度、排泄狀況和精神，確認牠一切都好嗎？"
      ],
      additionalAdvice: [
        "如果未來找不到合適的代養人，可以提前了解附近是否有熟悉爬蟲照護的寵物旅館或獸醫診所提供的住宿服務，作為備用方案。"
      ],
      showCareTime: false,
      careTimeTitle: "每日照護時間",
      careTimeItems: geckoReport.dailyCareBreakdown
    },
    busyCareChecklist: [
      {
        id: "daily-care",
        prompt: "你已經向協助者說明 {petName} 的每日照護要點了嗎？（溫度確認、今天是否為餵食日（守宮每 2–3 天餵一次，非每日）、排泄清理、健康觀察）",
        reviewHint: "先確認溫度、餵食日、排泄清理與健康觀察的交接內容。",
        correctAnswer: "yes"
      },
      {
        id: "support-confirmed",
        prompt: "我還沒有確認協助者在你忙碌時，是否真的有時間協助照顧 {petName}。",
        reviewHint: "還需要確認協助者是否真的有時間。",
        correctAnswer: "no"
      },
      {
        id: "care-willing",
        prompt: "協助者願意依照你的交接方式照顧 {petName} 嗎？",
        reviewHint: "還需要確認協助者願意依交接方式照顧。",
        correctAnswer: "yes"
      },
      {
        id: "emergency-contact",
        prompt: "協助者知道 {petName} 出現異常或緊急狀況時怎麼聯絡你嗎？",
        reviewHint: "還需要確認異常或緊急狀況時的聯絡方式。",
        correctAnswer: "yes"
      },
    ],
    choices: [
      {
        ...correct("seek-help", "主動聯繫可信任的家人或朋友，請他們代為照顧 {petName}", "你知道忙碌的時候不是讓 {petName} 自己撐，而是要立刻找人幫忙，做得很好！繼續確認你的交接安排是否完整。"),
        isSupportChoice: true
      },
      wrong("gecko-extra-food", "出門前多放幾隻昆蟲在缸裡，讓{petName}自己吃", "昆蟲在缸裡會持續移動、騷擾守宮，甚至在守宮睡覺時咬傷牠。此外，溫度確認與排泄觀察無法靠多放昆蟲解決，仍需有人到場確認。"),
      wrong("gecko-delay", "今晚先跳過，明天早上一次補上", "守宮在溫度適當時，傍晚至夜間是主要活動進食時段，跳過一次雖不至於緊急，但若習慣性延後，會影響牠的規律生理節律與健康觀察的連續性。"),
      wrong("gecko-neighbor-quick-check", "請鄰居「順便看一下」就好，不用特別交代", "沒有爬蟲照護經驗的人「看一下」不等於能發現溫度異常或守宮異常行為。如果真的請人代顧，必須先說明溫度確認方式、餵食步驟與緊急聯絡方式。"),
    ],
    correctSummary: ["確定晚歸時應聯繫可信任的人完整交接溫度確認、是否為餵食日、排泄清理與健康觀察，也可事先了解熟悉爬蟲照護的寵物旅館作為備援方案。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你已安排好照護備援。",
      knowledgeTitle: "守宮小知識",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "可靠的交接必須包含具體照護內容與緊急聯絡方式。"
        }
      ]
    }
  },
  {
    id: "gecko-health-emergency",
    stage: "生活變化",
    stageId: "life-change",
    stageTitle: "當生活發生變化",
    timeLabel: "當生活發生變化",
    title: "牠看起來和平常不太一樣",
    description: "{petName}平常每次餵食都搶著吃，但最近三天完全不理睬昆蟲，而且你發現牠的後腿走路時有一點像「踩棉花」——不太穩定，有時候後腿會抖動一下。說不上來哪裡不對，但就是感覺和平常不太一樣。",
    questionText: "你會怎麼做？",
    topic: "健康突發事件",
    reportSummary: "出現明顯異常時，記錄症狀並盡快諮詢**熟悉爬蟲類醫療的獸醫師**。",
    artIndex: 0,
    sceneMedia: {
      type: "placeholder"
    },
    correctFeedbackMedia: {
      type: "placeholder"
    },
    choices: [
      wrong("wait-and-see", "先等幾天看看，牠可能只是心情不好", "後腿無力與顫抖是代謝性骨病（MBD）的早期症狀，若延誤就醫可能造成不可逆的骨骼損傷。請勿等待，應立即記錄並諮詢獸醫。"),
      wrong("human-medicine", "先拿家裡的人用藥餵一點，看看有沒有改善", "人用藥物的成分與劑量對守宮體型與代謝完全不適用，可能造成器官衰竭。守宮出現異常絕對不可自行用藥。"),
      correct("record-and-vet", "記錄後腿顫抖的頻率與進食狀況，並聯絡熟悉爬蟲的獸醫確認是否就醫", "及早記錄與尋求獸醫建議，是守宮健康的第一道防線。守宮常見需留意的問題包括：代謝性骨病（MBD）、肥胖與脂肪肝、腸道寄生蟲、卵阻塞（雌守宮）、組織脫垂。如果有任何和平常不同，請記錄並尋求獸醫建議。", [
        "gecko-mild-sick", "gecko-moderate-sick", "gecko-hospitalization"
      ]),
      wrong("ask-experienced-friend", "先問有養過守宮的朋友，照他以前遇過的方式處理", "不同個體的症狀可能來自不同原因，朋友的經驗無法取代獸醫的專業診斷，尤其後腿問題可能需要 X 光確認骨骼狀況。")
    ],
    correctSummary: ["守宮出現後腿無力顫抖或持續拒食等異常時，應立刻記錄並諮詢熟悉爬蟲的獸醫，不可自行給藥、給人用藥物或等待觀察。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你記錄了觀察到的異常並諮詢獸醫，沒有拖延也沒有自行給藥，做得很好！",
      knowledgeTitle: "守宮小知識",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "守宮常見需要留意的健康問題："
        },
        {
          type: "paragraph",
          text: "**後腿無力與顫抖**：後腿走路不穩、顫抖，或脊椎彎曲、下頜變軟——需立即就醫；每次餵食確實沾鈣粉是預防關鍵。"
        },
        {
          type: "paragraph",
          text: "**體態與食慾明顯變化**：尾巴快速消瘦、腹部腫脹、食慾持續下降——成體每 2–3 天餵食一次即可，尾巴是體況最直接的指標。"
        },
        {
          type: "paragraph",
          text: "**排便與食慾持續異常**：排便量少或顏色異常、明顯消瘦、食慾下降——糞便狀況是重要的健康指標，若持續異常應就醫確認。"
        },
        {
          type: "paragraph",
          text: "**腹部腫脹與拒食（雌守宮）**：腹部異常腫脹、行動困難、完全拒食——未交配的雌守宮仍可能形成無精卵，卵無法排出時需就醫。"
        },
        {
          type: "paragraph",
          text: "**泄殖腔外有組織外露**：泄殖腔口出現紅色或粉紅色組織，**絕對不可自行嘗試推回**，需立即就醫。"
        }
      ],
      reminder: "食慾、排泄、精神與後腿力量的變化都是重要觀察指標；多項同時出現時，請準備好記錄並盡速聯絡熟悉爬蟲的獸醫。台灣熟悉爬蟲疾病的獸醫資源相對少，建議事先找好診所，不要等到急症才找。"
    }
  },
  {
    id: "gecko-senior-care",
    stage: "生活變化",
    stageId: "life-change",
    stageTitle: "當生活發生變化",
    timeLabel: "當生活發生變化",
    title: "{petName} 進入高齡期了",
    description: "{petName}已經跟著你好幾年了。牠的尾巴漸漸沒有以前那麼粗，每次餵食的反應也慢了一點，有時候傍晚還是躲在躲避屋沒出來。你感覺到牠老了。",
    questionText: "你會怎麼做？",
    topic: "高齡照護",
    reportSummary: "提高健康檢查頻率並調整環境與餵食觀察。",
    artIndex: 0,
    sceneMedia: {
      type: "placeholder"
    },
    correctFeedbackMedia: {
      type: "placeholder"
    },
    choices: [
      correct("gecko-senior-adjust", "提前規劃醫療基金，學習老年照顧知識，並定期諮詢獸醫", "提前準備能幫助飼主在高齡階段更穩定地照顧 {petName}，也能及早安排健康觀察、醫療需求與長期照顧。", [
        "gecko-senior-room"
      ]),
      wrong("gecko-senior-wait", "等到牠真的很嚴重再處理，平常不用特別準備", "高齡照顧需要提前準備。等到症狀很嚴重才處理，可能延誤照顧，也會讓 {petName} 承受更多不適；醫療基金、健康觀察與日常照護都應在問題變嚴重前開始規劃。"),
      wrong("gecko-senior-self-medicate", "自行判斷並使用人用藥物或網路偏方", "人用藥物或網路偏方可能對守宮造成危險。高齡階段若有健康疑慮，應諮詢獸醫並依專業建議處理。"),
      wrong("gecko-senior-supplements", "先買大家推薦的保健食品補一補，等下次有空再安排檢查", "想提早保養是好意，但保健食品不能取代健康檢查，也未必適合牠當下的身體狀況。先把活動、食慾與照護重點的變化記下來，和獸醫討論。")
    ],
    correctSummary: ["高齡守宮應提前規劃醫療基金、定期諮詢獸醫安排健康檢查，並學習老年照護重點，不可等到症狀嚴重才處理，也不應使用人用藥物或網路偏方。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你願意提前為 {petName} 的高齡生活做準備，做得很好！早一步規劃，才能在最需要的時候穩穩陪著牠。",
      knowledgeTitle: "長達 **15–28 年**的每日陪伴與生命承諾",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "與 {petName} 在一起的每一天，都是一份長達十五年乃至二十多年的承諾。豹紋守宮圈養紀錄最長已達 28.5 年——牠會隨著歲月慢慢老去，可能出現**食慾下降、消化遲緩、骨骼退化，甚至各器官的老化症狀**。在迎接牠之前，請先問問自己：你做好了陪伴牠走到生命盡頭的心理準備嗎？"
        }
      ]
    }
  },
];
