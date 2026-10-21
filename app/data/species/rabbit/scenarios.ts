import type { Scenario } from "../../../game-types";
import { incorrect, positive } from "../../shared/scenario-feedback";
import { rabbitAssets } from "./assets";
import { rabbitReport } from "./report";
/** 兔子生活情境題；所有文字依 rabbit-game-planning.md 建立。 */
export const rabbitLifeScenarios: Scenario[] = [
  {
    id: "rabbit-arrival-adjustment",
    stage: "接回家",
    stageId: "arrival",
    stageTitle: "適應新家與安全感",
    timeLabel: "接回家",
    title: "第一天適應新家",
    description: "等了這麼久，`{petName}` 終於到家了。牠走出外出籠後快速嗅了嗅，隨即衝進躲藏箱，縮在最裡面，只有鼻子偶爾微微顫動。\n\n你看著牠，不確定是不是該做點什麼。",
    questionText: "你會怎麼做？",
    topic: "兔子適應新家與安全感",
    reportSummary: "兔子剛到家躲藏是正常反應；應保持安靜，讓牠自己決定何時探索。",
    artIndex: 0,
    sceneMedia: {
      type: "video",
      src: rabbitAssets.petJourney.firstDay,
      ariaLabel: "兔子第一天適應新家情境影片"
    },
    correctFeedbackMedia: {
      type: "video",
      src: rabbitAssets.petJourney.correctPrimary,
      ariaLabel: "兔子答對回饋影片"
    },
    choices: [
      {
        id: "rabbit-pull-out",
        text: "把 {petName} 從箱子裡抱出來，讓牠熟悉環境",
        result: "incorrect",
        ...incorrect,
        explanation: "躲藏是正常壓力反應；強迫出來只會增加緊迫，甚至引發休克。",
        suggestion: "保持安靜，讓牠自己決定何時出來探索。"
      },
      {
        id: "rabbit-quiet-explore",
        text: "保持安靜，讓牠自己決定何時出來",
        result: "correct",
        ...positive,
        explanation: "兔子需要時間適應新環境；主動探索是建立信任的第一步。",
        expenseIds: [
          "rabbit-arrival-checkup"
        ],
        silentExpenseIds: [
          "rabbit-sterilization-male", "rabbit-sterilization-female"
        ]
      },
      {
        id: "rabbit-call-loudly",
        text: "大聲叫牠的名字，讓牠認識你",
        result: "incorrect",
        ...incorrect,
        explanation: "兔子聽覺敏銳，突然的大聲會造成驚嚇。",
        suggestion: "放慢動作、降低音量，讓牠慢慢習慣你的存在。"
      },
      {
        id: "rabbit-food-lure",
        text: "把玩具和零食放在箱口，引牠出來",
        result: "incorrect",
        ...incorrect,
        explanation: "用食物引誘可能讓牠在害怕與想吃之間更緊迫。",
        suggestion: "不施壓，讓牠在安全感足夠時自然探索。"
      },
    ],
    correctSummary: ["兔子剛到家躲起來是正常的壓力反應，正確做法是保持安靜、讓牠自己決定何時出來探索，不要強迫互動。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你願意放慢腳步，讓 {petName} 用自己的節奏認識新家，做得很好！",
      knowledgeTitle: "兔子小知識",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "**躲藏**是兔子面對陌生環境的正常**壓力反應**，不是對你布置的環境感到不滿，不需要急著安慰。"
        },
        {
          type: "paragraph",
          text: "先**保持安靜、靜靜等待**，讓牠用自己的節奏探索新家，慢慢建立**信任**。"
        },
      ]
    }
  },
  {
    id: "rabbit-heatstroke-prevention",
    stage: "日常照護",
    stageId: "daily",
    stageTitle: "日常照護",
    timeLabel: "日常照護",
    title: "夏天到了，怎麼幫 {petName} 避暑？",
    description: "外面艷陽高照，室內溫度計已經爬到 33℃。{petName} 趴平在地板上，耳朵攤開，呼吸看起來比平常快了一點。你平常沒有全天開冷氣的習慣——但現在，你決定幫牠做好環境準備。",
    questionText: "下列哪些是正確的避暑做法？（複選）",
    topic: "兔子高溫預防",
    reportSummary: "兔子怕熱；夏季應維持涼爽室內環境並提供可自主使用的陶板涼感墊。",
    artIndex: 2,
    sceneMedia: {
      type: "video",
      src: rabbitAssets.petJourney.summerHeat,
      ariaLabel: "兔子夏日避暑情境影片"
    },
    correctFeedbackMedia: {
      type: "video",
      src: rabbitAssets.petJourney.correctPrimary,
      ariaLabel: "兔子答對回饋影片"
    },
    multipleChoice: true,
    requiredCorrectOptionIds: [
      "rabbit-heat-air", "rabbit-heat-mat"
    ],
    wrongOptionIds: [
      "rabbit-heat-balcony", "rabbit-heat-spray"
    ],
    choices: [
      {
        id: "rabbit-heat-balcony",
        text: "把 {petName} 移到陽台，讓牠呼吸新鮮空氣",
        result: "incorrect",
        ...incorrect,
        explanation: "陽台在夏天可能直接曝曬，溫度遠高於室內，是非常危險的選擇！兔子沒有汗腺，只靠耳朵散熱，中暑可致命。"
      },
      {
        id: "rabbit-heat-air",
        text: "確保室內有冷氣或風扇，維持溫度在 25℃ 以下",
        result: "correct",
        ...positive,
        explanation: "兔子最適溫度是 15–25℃，超過 28℃ 就需開始關注高溫徵兆。冷氣是夏天最有效的保護方式。",
        expenseIds: [
          "rabbit-ac-monthly"
        ]
      },
      {
        id: "rabbit-heat-mat",
        text: "在 {petName} 的活動區放一塊陶板涼感墊",
        result: "correct",
        ...positive,
        explanation: "陶板散熱效果好，讓兔子可以自由選擇趴在上面降溫，是安全且有效的輔助散熱方式。"
      },
      {
        id: "rabbit-heat-spray",
        text: "用噴霧瓶對 {petName} 噴水幫牠降溫",
        result: "incorrect",
        ...incorrect,
        explanation: "兔子不適合弄濕，直接噴水可能增加緊迫並引發感冒。輔助散熱應用稍涼的毛巾輕敷耳朵或腳掌，而非全身噴水。"
      },
    ],
    correctSummary: ["兔子沒有汗腺、非常怕熱，台灣夏天需全天開冷氣維持室溫在 25℃ 以下，陶板涼感墊可輔助散熱，不可對兔子噴水或移至陽台。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你知道兔子比你想的還要怕熱，提前準備好降溫環境，做得很好！台灣夏天高溫對 {petName} 來說是真實的危險，而不是「熱一下就好」——正確的避暑準備，是每個兔飼主的必修課。",
      knowledgeTitle: "兔兔小知識",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "兔子沒有汗腺，只能靠**耳朵血管**散熱，對高溫的耐受力遠低於人類。台灣夏天氣溫動輒超過 **33℃**，對兔子來說是真實的生存威脅。"
        },
        {
          type: "paragraph",
          text: "兔子最適環境溫度為 **15–25℃**，超過 **28℃** 就必須積極介入：夏季需要**全天開冷氣**（包含夜間與清晨，因為兔子在這兩個時段同樣活躍），搭配**陶板涼感墊**輔助散熱——但冷氣才是夏天真正的**保命關鍵**。"
        },
      ]
    }
  },
  {
    id: "rabbit-cecotropes",
    stage: "日常照護",
    stageId: "daily",
    stageTitle: "日常照護",
    timeLabel: "日常照護",
    title: "{petName} 在吃什麼？！",
    description: "你在旁邊看著 {petName} 吃東西，突然發現牠把嘴湊到屁股旁邊，吃了一種看起來像葡萄串、閃亮亮的柔軟東西。你嚇了一跳，以為牠在做什麼奇怪的事。",
    questionText: "你應該怎麼做？（複選）",
    topic: "兔子的食糞行為",
    reportSummary: "盲腸便是兔子正常且必要的營養來源；不應阻止牠自行食入。",
    artIndex: 3,
    sceneMedia: {
      type: "video",
      src: rabbitAssets.petJourney.cecotropes,
      ariaLabel: "兔子食入盲腸便情境影片"
    },
    correctFeedbackMedia: {
      type: "video",
      src: rabbitAssets.petJourney.correctPrimary,
      ariaLabel: "兔子答對回饋影片"
    },
    multipleChoice: true,
    requiredCorrectOptionIds: [
      "rabbit-cecotropes-normal", "rabbit-cecotropes-nutrition"
    ],
    wrongOptionIds: [
      "rabbit-cecotropes-vet", "rabbit-cecotropes-stop"
    ],
    choices: [
      {
        id: "rabbit-cecotropes-normal",
        text: "不去打擾，讓 {petName} 繼續——這是正常的食糞行為（盲腸便），讓牠自行食入",
        result: "correct",
        ...positive,
        explanation: "盲腸便（俗稱葡萄便）柔軟、成串、帶光澤，與平時清便盆的圓形硬糞不同；這是本能，不應干預。"
      },
      {
        id: "rabbit-cecotropes-nutrition",
        text: "不阻止，了解干預反而影響牠的營養吸收，等牠自己吃完",
        result: "correct",
        ...positive,
        explanation: "盲腸便含有必需胺基酸和 B 群維生素，是兔子吸收關鍵營養的方式。"
      },
      {
        id: "rabbit-cecotropes-vet",
        text: "立刻帶去看獸醫，以為牠在做奇怪的事",
        result: "incorrect",
        ...incorrect,
        explanation: "這是正常的生理行為；只有大量盲腸便長期未被食入，才需要諮詢獸醫。"
      },
      {
        id: "rabbit-cecotropes-stop",
        text: "試圖阻止牠，覺得這個行為不衛生",
        result: "incorrect",
        ...incorrect,
        explanation: "食糞行為是兔子本能，盲腸便是必需的營養來源，干預反而影響健康。"
      },
    ],
    correctSummary: ["兔子自行食入柔軟成串的盲腸便是正常的本能行為，含有必需胺基酸和 B 群維生素，不應干預或阻止。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你沒有打擾 {petName}，讓牠完成這個本能行為，做得很好！**盲腸便**是兔子每天必須自行食入的重要營養來源，阻止牠等於讓牠損失了**必需胺基酸**和 **B 群維生素**。",
      knowledgeTitle: "兔兔小知識",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "兔子的糞便有兩種，完全不同的東西："
        },
        {
          type: "item",
          text: "**圓形硬糞**（清便盆的那種）：正常代謝廢物，每天清理",
          image: rabbitAssets.daily.fecalPellets,
          imageAlt: "圓形硬糞示意圖"
        },
        {
          type: "item",
          text: "**盲腸便（葡萄便）**：柔軟、成串、帶光澤，通常在清晨或傍晚排出並**立即食入**——這是正常本能，**不應阻止**",
          image: rabbitAssets.daily.cecotropes,
          imageAlt: "盲腸便示意圖"
        },
        {
          type: "item",
          text: "若大量盲腸便長期出現在便盆中**未被食入**，可能反映**壓力**或**飲食問題**，需諮詢獸醫"
        },
      ]
    }
  },
  {
    id: "rabbit-bath",
    stage: "日常照護",
    stageId: "daily",
    stageTitle: "日常照護",
    timeLabel: "日常照護",
    title: "{petName} 好髒，幫牠洗個澡？",
    description: "你蹲下來摸 {petName}，發現牠身上有一股悶悶的氣味，尾根附近的毛也結成一小塊、有點髒污。你直覺地想：「這樣不行，要幫牠好好洗個澡才行。」",
    questionText: "下列哪些是正確的清潔方式？（複選）",
    topic: "兔子日常清潔",
    reportSummary: "兔子不適合洗澡；日常清潔以梳毛、局部微濕擦拭及必要時諮詢**熟悉兔子醫療的獸醫師**為主。",
    artIndex: 3,
    sceneMedia: {
      type: "video",
      src: rabbitAssets.petJourney.bath,
      ariaLabel: "兔子洗澡情境"
    },
    multipleChoice: true,
    requiredCorrectOptionIds: [
      "rabbit-bath-brush", "rabbit-bath-wipe", "rabbit-bath-vet"
    ],
    wrongOptionIds: [
      "rabbit-bath-tub", "rabbit-bath-powder"
    ],
    choices: [
      {
        id: "rabbit-bath-powder",
        text: "用寵物乾洗粉幫牠清潔，這樣不用弄濕就能除臭",
        result: "incorrect",
        ...incorrect,
        explanation: "聽起來方便，但兔子不適合使用寵物乾洗粉，成分可能刺激兔子皮膚或被舔食吸收。"
      },
      {
        id: "rabbit-bath-brush",
        text: "用梳子幫 {petName} 梳毛，這是日常清潔的基本方式",
        result: "correct",
        ...positive,
        explanation: "正確！梳毛是兔子日常護理的核心，換毛期尤其重要，也能降低因自行理毛吞入過多毛髮的風險。"
      },
      {
        id: "rabbit-bath-tub",
        text: "用少量溫水輕輕清洗尾根髒污，洗完立刻用毛巾擦乾再吹乾",
        result: "incorrect",
        ...incorrect,
        explanation: "即使是局部、動作輕柔，把兔子放入水中仍會造成極大緊迫，可能引發休克。正確做法是用**微濕毛巾**小範圍輕擦，不讓皮膚真正浸濕。"
      },
      {
        id: "rabbit-bath-wipe",
        text: "尾根的髒污用稍微濕潤的毛巾輕輕擦拭，不需要整隻弄濕",
        result: "correct",
        ...positive,
        explanation: "正確！局部污漬用微濕毛巾小範圍輕擦是安全的做法，不需弄濕全身。"
      },
      {
        id: "rabbit-bath-vet",
        text: "如果污染情況自己無法處理，先諮詢**熟悉兔子醫療的獸醫師**，不自行沖洗",
        result: "correct",
        ...positive,
        explanation: "正確！如尾部嚴重污染，應請**熟悉兔子醫療的獸醫師**評估處理方式，不應自行將牠放入水中。"
      },
    ],
    correctSummary: ["兔子不能洗澡，日常清潔以梳毛為主，局部髒污用微濕毛巾輕擦即可，無法自行處理時應諮詢獸醫而非自行沖洗。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你知道兔子不能洗澡，選擇了梳毛和局部清潔，做得很好！全身弄濕會造成極大**緊迫**，可能引發**休克**，就算吹乾也無法消除過程的傷害。",
      knowledgeTitle: "兔兔小知識",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "兔子的日常清潔方式："
        },
        {
          type: "item",
          text: "**梳毛**是核心，每天或換毛期每天多梳幾次，避免毛球吞入造成腸道問題"
        },
        {
          type: "item",
          text: "**局部污漬**（尾根、臀部）：用**微濕毛巾**小範圍輕擦，不需整隻弄濕"
        },
        {
          type: "item",
          text: "**洗澡**：絕對禁止全身沖洗，**乾洗粉**也不建議"
        },
        {
          type: "item",
          text: "無法自行處理的髒污（如嚴重尾部污染）：應諮詢**熟悉兔子醫療的獸醫師**評估，而非自行沖洗"
        },
      ]
    }
  },
  {
    id: "rabbit-busy-care",
    stage: "當生活發生變化",
    stageId: "life-change",
    stageTitle: "當生活發生變化",
    timeLabel: "當生活發生變化",
    title: "臨時晚歸，{petName} 的照顧怎麼辦？",
    description: "今天臨時需要加班，預計晚上九點才能到家。{petName} 到了傍晚就該補充牧草、換水和清理便盆——而且每天觀察糞便狀況，是你必須親自確認的事。你開始想：這樣下去，今晚誰來照顧牠？",
    questionText: "你會怎麼做？",
    topic: "忙碌備援計畫",
    reportSummary: "兔子需要每日補草、換水、清便盆與觀察糞便；離家時應安排可信任的人每天協助照顧。",
    artIndex: 5,
    busyCarePresentation: {
      animalName: "兔子",
      sceneMedia: {
        type: "video",
        src: rabbitAssets.petJourney.busyDailyCare,
        ariaLabel: "兔子等待日常照顧的情境影片",
        fallback: {
          type: "image-layers",
          backgroundSrc: rabbitAssets.room.background,
          backgroundAlt: "兔子的生活空間",
          characterSrc: rabbitAssets.feeding.rabbitUnhappy,
          characterAlt: "等待照顧的 {petName}"
        }
      },
      feedbackMedia: {
        type: "video",
        src: rabbitAssets.petJourney.correctSecondary
      }
    },
    busyCareCompletion: {
      title: "做得很好！",
      encouragement: "你不只是找了人，還確認了時間、意願、照護細節和緊急聯絡，這樣的交接才能讓 {petName} 在你忙碌時仍獲得穩定照顧，做得很好！",
      reflectionText: "在 {petName} 的世界裡，你是那個讓牠願意靠近的人。",
      reflectionTitle: "留給自己的一個問題",
      reflectionContent: [
        "忙完這段時間回到家，你還有心思觀察 {petName} 的糞便、牧草量和精神狀態，確認牠一切都好嗎？"
      ],
      careTimeTitle: "每日照護時間",
      careTimeItems: rabbitReport.dailyCareBreakdown,
      showCareTime: false,
      additionalAdvice: [
        "如果未來找不到合適的代養人，可以提前了解附近是否有熟悉兔子照護的寵物旅館，或由**熟悉兔子醫療的獸醫師**提供的住宿服務，作為備用方案。"
      ]
    },
    busyCareChecklist: [
      {
        id: "daily-care",
        prompt: "你已經向協助者說明 {petName} 每天的牧草補充、換水、便盆清理、糞便觀察與健康巡視安排了嗎？",
        correctAnswer: "yes",
        reviewHint: "每日牧草補充、換水、便盆清理、糞便觀察與健康巡視安排還需要先交接"
      },
      {
        id: "support-confirmed",
        prompt: "我還沒有確認協助者在你忙碌時，是否真的有時間協助照顧 {petName}。",
        correctAnswer: "no",
        reviewHint: "協助者的時間還需要先確認"
      },
      {
        id: "care-willing",
        prompt: "協助者願意依照你的交接方式照顧 {petName} 嗎？",
        correctAnswer: "yes",
        reviewHint: "協助者的意願還需要先確認"
      },
      {
        id: "emergency-contact",
        prompt: "協助者知道 {petName} 出現異常或緊急狀況時怎麼聯絡你嗎？",
        correctAnswer: "yes",
        reviewHint: "緊急聯絡方式還需要補充確認"
      },
    ],
    choices: [
      {
        id: "seek-help",
        text: "主動聯繫可信任的家人或朋友，請他們代為照顧 {petName}",
        result: "correct",
        isSupportChoice: true,
        ...positive,
        explanation: "你知道忙碌的時候不是讓 {petName} 自己撐，而是要立刻找人幫忙，做得很好！繼續確認你的交接安排是否完整。"
      },
      {
        id: "rabbit-extra-hay",
        text: "出門前多放一份牧草，讓 {petName} 自己撐到晚上",
        result: "incorrect",
        ...incorrect,
        explanation: "多放牧草仍無法取代傍晚的飲水更換、便盆清理和糞便觀察。兔子的糞便狀況每天都需要確認，12 小時無進食就是危急訊號。確定要晚歸時，應先安排可信任的人代為照顧。"
      },
      {
        id: "rabbit-neighbor-glance",
        text: "請鄰居幫忙「看一下」就好，不用特別交代",
        result: "incorrect",
        ...incorrect,
        explanation: "只是「看一下」可能遺漏牧草補充、便盆清理與糞便觀察，也不知道要注意什麼警訊。請照顧的人需要知道具體的照顧內容和緊急時如何聯絡你。"
      },
      {
        id: "rabbit-hold-till-return",
        text: "等晚上回家再一次處理，平常兔子也能撐幾小時",
        result: "incorrect",
        ...incorrect,
        explanation: "把傍晚的牧草補充、飲水和便盆清理全部延後，加上一整天沒有人觀察糞便狀況，可能在你不知情時發生問題。確定晚歸時，應事先安排合適的人接手照顧。"
      },
    ],
    correctSummary: ["確定晚歸時應主動聯繫可信任的人代為照顧，完整交代照護細節與緊急聯絡方式，也可事先了解熟悉兔子的寵物旅館作為備援，多放牧草無法取代定時換水、清理便盆和觀察糞便的必要照護。"],
  },
  {
    id: "rabbit-health-emergency",
    stage: "當生活發生變化",
    stageId: "life-change",
    stageTitle: "健康狀況變化",
    timeLabel: "當生活發生變化",
    title: "排便量突然減少",
    description: "最近這兩天，你注意到 `{petName}` 活動力明顯下降，長時間蹲坐在角落不太移動，牧草架幾乎沒被碰過，便盆裡的糞粒也比平常少很多，而且嘴巴周圍有些濕濕的。",
    questionText: "根據這些觀察，你應該？",
    topic: "生活變化：排泄與食慾觀察",
    reportSummary: "排便量驟減與食慾下降是兔子重要危急警訊，應立刻聯繫**熟悉兔子醫療的獸醫師**。",
    artIndex: 4,
    sceneMedia: {
      type: "video",
      src: rabbitAssets.petJourney.sick,
      ariaLabel: "兔子健康異常情境影片"
    },
    correctFeedbackMedia: {
      type: "video",
      src: rabbitAssets.petJourney.correctSecondary,
      ariaLabel: "兔子答對回饋影片"
    },
    choices: [
      {
        id: "rabbit-health-wait",
        text: "這是正常波動，明天再看看",
        result: "incorrect",
        ...incorrect,
        explanation: "排便量突然減少＋食慾下降是兔子最重要的危急警訊，不能等待。",
        suggestion: "立刻聯繫**熟悉兔子醫療的獸醫師**，帶去看診。"
      },
      {
        id: "rabbit-health-vet",
        text: "立刻聯繫**熟悉兔子醫療的獸醫師**，帶去看診",
        result: "correct",
        ...positive,
        explanation: "兔子突然排便量變少、食慾變差，應立刻尋求獸醫師協助。12 小時完全無進食就是非常危急的情形。",
        expenseIds: [
          "rabbit-mild-sick", "rabbit-moderate-sick", "rabbit-hospitalization"
        ]
      },
      {
        id: "rabbit-health-vegetable",
        text: "換成 {petName} 喜歡的蔬菜，刺激食慾",
        result: "incorrect",
        ...incorrect,
        explanation: "突然改變食物種類可能加重消化問題。",
        suggestion: "此時應立刻就醫，而不是嘗試調整飲食。"
      },
      {
        id: "rabbit-health-next-week",
        text: "記錄下來，下週例行健康檢查時告訴獸醫",
        result: "incorrect",
        ...incorrect,
        explanation: "排便量驟減＋食慾下降需要立刻處置，等一週可能已造成嚴重腸阻塞。",
        suggestion: "立刻聯繫**熟悉兔子醫療的獸醫師**，帶去看診。"
      },
    ],
    correctSummary: ["兔子排便量突然減少、食慾下降是緊急警訊，必須立刻聯繫**熟悉兔子醫療的獸醫師**就診，不可等待觀察或自行調整飲食。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你立刻察覺到異常並聯繫獸醫，沒有觀望等待，做得很好！",
      knowledgeTitle: "兔兔小知識",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "兔子常見需要留意的健康問題："
        },
        {
          type: "item",
          text: "**消化道停滯**：排便量減少或無排便、食慾下降、腹部腫脹緊繃——12 小時未進食需立即就醫。"
        },
        {
          type: "item",
          text: "**口部潮濕與進食異常**：流口水（嘴巴至脖子處濕）、進食時遲疑或掉食——出現此類症狀應就醫確認。"
        },
        {
          type: "item",
          text: "**活動力與行動異常**：身體僵硬不願移動、長時間維持蹲坐姿態（無四肢舒展）、走路不穩、眼睛顫抖——應盡快就醫。"
        },
        {
          type: "item",
          text: "**呼吸急促**：呼吸急促、必須開口呼吸——兔子無法用嘴巴呼吸，此為緊急症狀，需立刻就醫。"
        },
        {
          type: "item",
          text: "**體表異常**：大量脫毛、眼周潮濕、耳朵或身體出現異味——出現時應就醫確認。"
        },
      ],
      reminder: "排便量減少、食慾下降、活動力降低都是兔子最重要的危急警訊；12 小時完全無進食就是非常緊急的情形，應立刻帶去**熟悉兔子醫療的獸醫師**，不可自行換食物或等待下次回診。"
    }
  },
  {
    id: "rabbit-senior-care",
    stage: "當生活發生變化",
    stageId: "life-change",
    stageTitle: "高齡照護",
    timeLabel: "當生活發生變化",
    title: "牠進入高齡期了，一起調整家的環境吧",
    description: "`{petName}` 已經 6 歲了。這幾個月牠的步伐慢了下來，以前每天都會跳上窩邊看你，現在越來越少。昨天，你看著牠費力跨過便盆矮沿，決定重新看看牠的生活環境。",
    questionText: "你會怎麼做？",
    topic: "生活變化：高齡兔環境與健康照護",
    reportSummary: "高齡兔應提高健檢頻率、降低出入高度並增加軟質墊料；牧草與適當活動仍不可省略。",
    artIndex: 1,
    sceneMedia: {
      type: "video",
      src: rabbitAssets.petJourney.seniorLife,
      ariaLabel: "高齡兔生活調整情境影片"
    },
    correctFeedbackMedia: {
      type: "video",
      src: rabbitAssets.petJourney.correctSecondary,
      ariaLabel: "兔子答對回饋影片"
    },
    choices: [
      {
        id: "rabbit-senior-space",
        text: "減少 {petName} 的活動空間，讓牠多休息",
        result: "incorrect",
        ...incorrect,
        explanation: "高齡兔仍需要適當活動空間；過度限制不利生活品質與腸道蠕動。",
        suggestion: "依個體狀況調整環境，而非完全限制活動。"
      },
      {
        id: "rabbit-senior-hay",
        text: "減少牧草量，改以軟食為主，比較好消化",
        result: "incorrect",
        ...incorrect,
        explanation: "牧草對高齡兔的磨牙與腸胃功能仍然重要。",
        suggestion: "飲食調整需依**熟悉兔子醫療的獸醫師**建議進行。"
      },
      {
        id: "rabbit-senior-no-change",
        text: "維持現有環境不動，避免環境改變造成壓力",
        result: "incorrect",
        ...incorrect,
        explanation: "小幅優化出入高度與休息處是必要的，能保護老化關節與身體。",
        suggestion: "依牠的行動狀況調整環境，讓移動與休息更容易。"
      },
      {
        id: "rabbit-senior-checkup",
        text: "將健康檢查頻率提高為半年一次，並降低圍欄出入高度、增加軟質墊料",
        result: "correct",
        ...positive,
        explanation: "定期健康檢查有助及早發現高齡兔常見問題；降低出入高度與增加軟墊則能保護老化關節。",
        expenseIds: [
          "rabbit-senior-room"
        ]
      },
    ],
    correctSummary: ["高齡兔（6 歲以上）應提高健康檢查頻率至半年一次，並調整環境以保護關節——降低出入高度、增加軟質墊料，維持充足牧草供應。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "高齡期的照護重點：定期健康檢查（至少半年一次）、友善關節的環境（降低出入高度、增加軟質墊料），以及持續供應充足的牧草。",
      knowledgeTitle: "長達 8-13 年的每日陪伴與生命承諾",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "與 {petName} 在一起的每一天，都是一份**長達 8-13 年**的承諾。"
        },
        {
          type: "paragraph",
          text: "牠會隨著歲月慢慢老去，可能出現**牙齒退化**、**消化系統弱化**，甚至**活動力大幅下降**。"
        },
        {
          type: "paragraph",
          text: "在迎接牠之前，請先問問自己：你做好了陪伴牠走到**生命盡頭**的心理準備嗎？"
        },
      ]
    }
  },
];
/** 規劃文件 D-1：順序即為正解；操作元件只讀取動作與對應提示。 */
