import type { Scenario } from "../../../game-types";
import { incorrect, positive } from "../../shared/scenario-feedback";
import { scenarioMedia } from "../../shared/scenario-media";
export const dogLifeScenarios: Scenario[] = [
  {
    id: "arrival-adjustment",
    stage: "一起生活的第一天",
    stageId: "arrival",
    stageTitle: "適應新家與安全感",
    timeLabel: "一起生活的第一天",
    title: "第一天適應新家",
    description: "豆豆剛走進陌生的新家，躲在外出籠旁觀察，家人都很想立刻和牠打招呼。",
    questionText: "你會怎麼做？",
    topic: "適應新家與安全感",
    reportSummary: "第一天適應新家時，狗狗可能因陌生而躲藏或緊張；保留安靜、安全且能退回的空間，等待牠主動探索。",
    artIndex: 0,
    sceneMedia: {
      type: "video",
      src: scenarioMedia.dog.arrival,
      ariaLabel: "小狗第一天適應新家的影片"
    },
    correctFeedbackMedia: {
      type: "video",
      src: scenarioMedia.correctPrimary,
      ariaLabel: "正確處置後的正向結果影片"
    },
    requiresRetry: true,
    continueLabel: "繼續",
    choices: [
      {
        id: "force-pick-up",
        text: "強行抱出來",
        result: "incorrect",
        ...incorrect,
        explanation: "這個做法可能讓牠更緊張。被強行抱起會讓小狗失去退路，增加防衛反應，也可能降低牠對新環境的安全感。先放低互動強度，讓牠用自己的速度探索。"
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
        explanation: "持續靠近與呼喚會增加刺激，讓還在適應中的小狗難以安心觀察，可能變得更緊張或躲避。先退開一些，讓牠保有安靜且能退回的安全空間。"
      },
      {
        id: "quiet-nearby",
        text: "坐在附近陪牠，但每隔一下就伸手摸摸看",
        result: "incorrect",
        ...incorrect,
        explanation: "想陪伴牠的心意很好，但頻繁伸手仍可能讓剛到家的小狗感到壓力，難以真正休息。可以安靜待在附近，先不主動碰觸，等牠願意靠近時再互動。"
      },
    ],
    correctSummary: ["狗狗剛到家需要時間觀察環境，正確做法是保持距離、提供安靜安全的空間，讓牠以自己的速度建立安全感，不強迫互動。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你知道第一天不要給 {petName} 太多壓力，做得很好！給牠時間和空間，才能讓牠以自己的速度建立安全感。",
      knowledgeTitle: "狗狗小知識",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "剛到新家的小狗需要先觀察環境。**保持距離**並提供**安靜、安全的空間**，能減少壓力，讓牠以**自己的速度**建立安全感。準備乾淨飲水與可休息的角落，等牠**主動靠近**後再慢慢增加互動。"
        },
      ]
    }
  },
  {
    id: "behavior-barking",
    stage: "日常行為照顧",
    stageTitle: "日常照護",
    timeLabel: "日常照護",
    title: "牠一直吠叫，該怎麼辦？",
    description: "{petName} 最近每到傍晚，只要外頭有腳步聲或門鈴響，就會對著玄關一直吠叫。今晚已經叫了好幾次，你也開始擔心影響到鄰居。",
    questionText: "哪些是合適的應對方式？（複選）",
    topic: "日常行為照顧",
    reportSummary: "遇到吠叫、啃咬與如廁問題，以正向方式引導而非懲罰。",
    artIndex: 4,
    multipleChoice: true,
    requiredCorrectOptionIds: [
      "bark-block", "bark-redirect", "bark-walk", "bark-expert"
    ],
    wrongOptionIds: [
      "bark-scold"
    ],
    choices: [
      {
        id: "bark-block",
        text: "遮蔽玄關門縫或拉上窗簾，減少觸發吠叫的視覺刺激",
        result: "correct",
        ...positive,
        explanation: "減少觸發源是處理吠叫最直接的環境管理方式，可以降低 {petName} 的反應頻率。"
      },
      {
        id: "bark-redirect",
        text: "溫和引導 {petName} 離開玄關，回到牠熟悉的休息位置",
        result: "correct",
        ...positive,
        explanation: "溫和轉移注意力能幫助 {petName} 冷靜下來，避免持續累積焦躁。"
      },
      {
        id: "bark-scold",
        text: "立刻大聲責罵，讓牠知道吠叫不被允許",
        result: "incorrect",
        ...incorrect,
        explanation: "大聲責罵可能反而強化 {petName} 的焦慮，讓吠叫情況更難改善，也無法處理觸發原因。"
      },
      {
        id: "bark-walk",
        text: "確保白天有足夠的散步與活動量，消耗精力",
        result: "correct",
        ...positive,
        explanation: "充足的活動量有助於降低整體焦躁值，讓 {petName} 對外部刺激的反應也會更穩定。"
      },
      {
        id: "bark-expert",
        text: "若吠叫頻繁或持續難以改善，尋求獸醫或行為專家協助",
        result: "correct",
        ...positive,
        explanation: "持續性吠叫可能涉及焦慮或習得行為，專業評估能幫助找出根本原因。"
      },
    ],
    correctSummary: ["面對吠叫問題，應減少觸發源（遮蔽視線）、溫和轉移注意力並確保充足活動量，不可大聲責罵，持續困擾時應尋求獸醫或行為專家協助。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你沒有用責罵，而是從環境與活動量兩個方向去理解 {petName}，這正是面對吠叫問題最有效的方式！",
      knowledgeTitle: "狗狗小知識",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "傍晚對門口或窗外吠叫，通常是領域性反應或警戒行為的表現。減少觸發源（如遮蔽視線）、搭配充足活動量，是改善的第一步。"
        },
        {
          type: "paragraph",
          text: "若持續無法緩解，可記錄**吠叫的時間、頻率與觸發情境**，帶著記錄諮詢獸醫或動物行為師。"
        },
      ],
      reminder: "你有想過 {petName} 的吠叫是否可能影響鄰居嗎？吠叫問題在公寓或樓層住宅中特別容易影響鄰居。提前學習行為引導技巧，也是對 {petName} 和周遭鄰里負責的表現。"
    }
  },
  {
    id: "behavior-chewing",
    stage: "日常行為照顧",
    stageTitle: "日常照護",
    timeLabel: "日常照護",
    title: "牠開始亂咬東西，該怎麼辦？",
    description: "你回到客廳時，發現小狗正在咬桌腳旁的物品。旁邊還有一些不能讓牠碰到的小東西。",
    questionText: "你應該怎麼做？（複選）",
    topic: "日常行為照顧",
    reportSummary: "狗狗亂咬東西時，應收好危險物並提供安全啃咬玩具；打罵可能增加壓力，也無法教會合適做法。",
    artIndex: 4,
    multipleChoice: true,
    requiredCorrectOptionIds: [
      "chew-toys", "chew-store-hazards", "chew-expert"
    ],
    wrongOptionIds: [
      "chew-punish"
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
        explanation: "打罵或驚嚇可能造成壓力、破壞信任，也不一定能解決探索與情緒需求。先收好危險物品，並把牠引導到安全的啃咬玩具。"
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
      },
    ],
    correctSummary: ["啃咬是狗狗的自然需求，應提供安全啃咬玩具並將危險物品收好，不可打罵或驚嚇，持續嚴重時應尋求獸醫或行為專家協助。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你沒有用責罵壓制需求，而是提供安全出口並做好環境管理，做得很好！",
      knowledgeTitle: "狗狗小知識",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "啃咬是**狗狗的自然行為**，幼犬換牙、探索、無聊或壓力都可能讓啃咬增加。"
        },
        {
          type: "paragraph",
          text: "選擇符合體型且不易碎的玩具，並在**咬對物品時立即鼓勵**；玩具破損時要更換，避免誤食。"
        },
      ]
    }
  },
  {
    id: "behavior-toileting",
    stage: "日常行為照顧",
    stageTitle: "日常照護",
    timeLabel: "日常照護",
    title: "牠在不適合的地方大小便，該怎麼辦？",
    description: "你發現 {petName} 在不適合的位置大小便。牠看起來不是故意搗亂，而是還沒建立固定如廁習慣。",
    questionText: "哪些是幫助建立良好如廁習慣的適當做法？（複選）",
    topic: "日常行為照顧",
    reportSummary: "狗狗在錯誤位置排泄時，應增加合適的如廁機會、固定位置並正向引導，而不是事後責罵。",
    artIndex: 4,
    multipleChoice: true,
    requiredCorrectOptionIds: [
      "toilet-material", "toilet-outings", "toilet-expert"
    ],
    wrongOptionIds: [
      "toilet-scold"
    ],
    choices: [
      {
        id: "toilet-material",
        text: "在固定位置設置便盆或尿布墊，如廁正確後立即給予獎勵或讚美",
        result: "correct",
        ...positive,
        explanation: "固定位置幫助狗狗建立「這裡可以如廁」的連結；正確完成後立即給予正向回饋，能加速建立穩定習慣。"
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
        explanation: "責罵可能讓狗狗害怕，卻不一定知道正確如廁地點。應增加合適的如廁機會，並在牠於正確地點完成時立即給予獎勵。"
      },
    ],
    correctSummary: ["建立如廁習慣的正確方式是在固定地點完成時立即給予正向回饋，並多安排外出機會，不可責罵，排泄頻率異常時應就醫排除健康問題。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你選擇了正向引導，而不是責罵，做得很好！讓 {petName} 知道正確地點，比事後處罰更有效。",
      knowledgeTitle: "狗狗小知識",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "睡醒、進食與玩耍後常是如廁時機；在正確地點完成後要**立即獎勵**。"
        },
        {
          type: "paragraph",
          text: "事後責罵無法教會正確地點；若突然頻尿或憋不住，應先請獸醫**排除健康問題**。"
        },
      ]
    }
  },
  {
    id: "busy-daily-care",
    stage: "當生活發生變化",
    stageId: "life-change",
    stageTitle: "當生活發生變化",
    timeLabel: "當生活發生變化",
    title: "疲憊忙碌的日子",
    description: "今天臨時需要加班，早上出門後一路忙到很晚。你已經很疲累，但豆豆仍需要晚餐、乾淨飲水、排泄與適當活動。",
    questionText: "你會怎麼做？",
    topic: "時間安排與照顧支援",
    reportSummary: "臨時加班或晚歸時，仍要事先安排可信任的人按時協助餵食、換水、排泄、活動與狀況觀察。",
    artIndex: 5,
    busyCarePresentation: {
      animalName: "犬",
      sceneMedia: {
        type: "video",
        src: scenarioMedia.dog.busyCare,
        ariaLabel: "疲憊忙碌的日子情境影片",
        fallback: {
          type: "image-layers",
          backgroundSrc: scenarioMedia.dog.room,
          backgroundAlt: "居家房間場景",
          characterSrc: scenarioMedia.dog.busyCareCharacter,
          characterAlt: "{petName}在房間裡等待照顧"
        }
      },
      feedbackMedia: {
        type: "video",
        src: scenarioMedia.correctSecondary
      }
    },
    busyCareCompletion: {
      reflectionText: "在 {petName} 的世界裡，你就是他的全部。",
      reflectionTitle: "留給自己的一個問題",
      reflectionContent: [
        "忙完一天回到家時，你還有能量陪伴等了你一整天的 {petName} 嗎？"
      ],
      additionalAdvice: [
        "如果未來臨時找不到合適的家人朋友，可以平時先了解附近是否有熟悉狗狗照護的寵物旅館，作為備用方案。"
      ]
    },
    busyCareChecklist: [
      {
        id: "daily-care",
        prompt: "你已經向協助者說明 {petName} 每天的餵食、換水、外出散步如廁、活動與陪伴安排了嗎？",
        correctAnswer: "yes",
        reviewHint: "每日餵食、換水、外出散步如廁、活動與陪伴安排還需要先交接"
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
        id: "alone-with-food",
        text: "早上出門前先多放一些飼料和水，晚上忙完再好好陪牠",
        result: "incorrect",
        ...incorrect,
        explanation: "早上多放食物和水仍不能取代一整天的排泄、活動與狀況觀察，也可能造成過量進食或突發狀況沒有人發現。確定要加班時，應先安排能接手照顧的人，並清楚交接需求。"
      },
      {
        id: "family-helper",
        text: "請同住家人或朋友協助",
        result: "correct",
        isSupportChoice: true,
        ...positive,
        explanation: "你不只是想到一個人，也認真確認對方的時間、意願、照護知識與緊急聯絡方式。這樣的交接才能讓小狗在你忙碌時仍獲得穩定照顧。"
      },
      {
        id: "guard-dog-can-wait",
        text: "狗狗本來就有顧家的功能，在家裡睡久一點沒關係",
        result: "incorrect",
        ...incorrect,
        explanation: "會顧家，不等於能長時間獨處。超過八小時無人照護，狗狗可能錯過排泄、飲水與活動，也可能因焦慮或無聊而吠叫、破壞物品。確定會晚歸時，仍要安排合適的人中途協助照顧。"
      },
      {
        id: "hold-until-tomorrow",
        text: "傍晚到家再餵，至少睡前有吃到晚餐就好",
        result: "incorrect",
        ...incorrect,
        explanation: "把晚餐、排泄與活動一路延後到回家，會讓小狗長時間等待，也無法因應加班比預期更晚或臨時狀況。確定會晚歸時，應先安排可信任的人按平常時間協助基本照顧。"
      },
    ],
    correctSummary: ["確定晚歸時應立刻聯繫可信任的人代為照顧，完整交接餵食、換水、外出如廁與緊急聯絡方式，也可事先了解附近的寵物旅館作為備援，多放食物無法取代完整照護。"],
  },
  {
    id: "illness-vet",
    stage: "生病與就醫",
    stageTitle: "當生活發生變化",
    timeLabel: "生病與就醫",
    title: "牠看起來和平常不太一樣",
    description: "最近你發現 {petName} 皮膚出現大片紅疹且頻繁抓癢，同時食慾有點變差，精神懨懨的，糞便的形狀和量也和平常不太一樣。",
    questionText: "你會怎麼做？",
    topic: "健康觀察與就醫判斷",
    reportSummary: "出現食慾、精神或排泄改變時，應記錄症狀並詢問獸醫，不要自行餵人用藥。",
    artIndex: 3,
    sceneMedia: {
      type: "video",
      src: scenarioMedia.dog.illness,
      ariaLabel: "小狗生病與就醫情境影片"
    },
    correctFeedbackMedia: {
      type: "video",
      src: scenarioMedia.correctSecondary,
      ariaLabel: "正確處置後的正向結果影片"
    },
    requiresRetry: true,
    choices: [
      {
        id: "wait-and-see",
        text: "先等幾天看看，牠可能只是心情不好",
        result: "incorrect",
        ...incorrect,
        explanation: "等太久可能延誤就醫，讓{petName} 持續不舒服。",
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
        explanation: "及早觀察與記錄能幫助獸醫判斷。犬常見需留意的問題包括：**皮膚搔癢或過敏**、**腸胃異常**（嘔吐、腹瀉）、**牙周病**（口臭、進食遲疑）、**關節問題**（跛行、起身困難）、**內、外寄生蟲**。如果食慾、精神、排泄或活動和平常不同，請記錄並尋求獸醫建議。",
        expenseIds: [
          "dog-mild-sick", "dog-moderate-sick", "dog-hospitalization"
        ]
      },
      {
        id: "ask-experienced-friend",
        text: "先拍照問有養狗的朋友，照他以前遇過的方式處理",
        result: "incorrect",
        ...incorrect,
        explanation: "朋友的經驗可以提供陪伴，但相似外觀不一定代表相同原因，仍可能錯過需要檢查的狀況。可以整理朋友提醒的觀察重點，但醫療判斷與用藥仍應交給獸醫。"
      },
    ],
    correctSummary: ["狗狗同時出現皮膚紅疹、食慾下降、精神不振或排泄異常等多項改變時，應立即記錄並聯繫獸醫，不可等待觀察或自行給藥。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你記錄了觀察到的異常並諮詢獸醫，沒有拖延也沒有自行給藥，做得很好！",
      knowledgeTitle: "狗狗小知識",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "狗狗常見需要留意的健康問題："
        },
        {
          type: "item",
          text: "**皮膚搔癢與紅疹**：搔癢、反覆舔腳、紅疹、局部掉毛——持續發生應就醫確認。"
        },
        {
          type: "item",
          text: "**腸胃異常**：嘔吐、腹瀉、排便量或形狀明顯改變——超過一天或混有血絲時需就醫。"
        },
        {
          type: "item",
          text: "**口腔異味與進食異常**：口臭、進食遲疑、牙齦紅腫——定期刷牙改善或口腔檢查治療。"
        },
        {
          type: "item",
          text: "**活動力與步態異常**：不想上下樓梯、跛行、起身困難——大型犬與高齡犬需定期評估。"
        },
        {
          type: "item",
          text: "**內、外寄生蟲預防**：外出後需仔細檢查毛皮，定期驅除體內外寄生蟲。"
        },
      ],
      reminder: "食慾、飲水、排泄、精神與活動的改變都是重要觀察指標；多項同時出現時，準備好記錄並盡速聯絡獸醫，不要自行判斷或給藥。"
    }
  },
  {
    id: "growing-old",
    stage: "逐漸進入高齡",
    stageId: "life-change",
    stageTitle: "當生活發生變化",
    timeLabel: "逐漸進入高齡",
    title: "高齡後的照顧準備",
    description: "{petName} 上個月剛過了十歲生日。牠還是喜歡散步，但起身慢了一點，偶爾在樓梯前停一下。獸醫在健檢時提醒你，現在正是開始規劃高齡照護的好時機。",
    questionText: "你會怎麼做？",
    topic: "高齡照顧與醫療準備",
    reportSummary: "狗狗進入高齡後，可能出現行動退化、排泄照護與醫療需求；應提早準備時間、環境調整和醫療基金。",
    artIndex: 1,
    sceneMedia: {
      type: "video",
      src: scenarioMedia.dog.senior,
      ariaLabel: "小狗逐漸進入高齡的情境影片"
    },
    correctFeedbackMedia: {
      type: "video",
      src: scenarioMedia.correctPrimary,
      ariaLabel: "正確處置後的正向結果影片"
    },
    requiresRetry: true,
    choices: [
      {
        id: "senior-plan-ahead",
        text: "提前規劃醫療基金，學習老年照顧知識，並定期諮詢獸醫",
        result: "correct",
        ...positive,
        explanation: "提前準備能幫助飼主在高齡階段更穩定地照顧小狗，也能及早安排健康觀察、醫療需求與長期照顧。",
        expenseIds: [
          "dog-senior-room"
        ]
      },
      {
        id: "senior-wait",
        text: "等到牠真的很嚴重再處理，平常不用特別準備",
        result: "incorrect",
        ...incorrect,
        explanation: "高齡照顧需要提前準備。等到症狀很嚴重才處理，可能延誤照顧，也會讓小狗承受更多不適；醫療基金、健康觀察與日常照護都應在問題變嚴重前開始規劃。"
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
      },
    ],
    correctSummary: ["狗狗進入高齡期應提前規劃醫療基金、提高健檢頻率至每半年一次，並依身體狀況調整日常照護，不可等到症狀嚴重才開始準備。"],
    completionFeedback: {
      title: "做得很好！",
      encouragement: "你願意提前為 {petName} 的高齡生活做準備，做得很好！早一步規劃，才能在最需要的時候穩穩陪著牠。",
      knowledgeTitle: "長達 10-15 年的每日陪伴與生命承諾",
      knowledgeContent: [
        {
          type: "paragraph",
          text: "與 {petName} 在一起的每一天，都是一份**長達 10-15 年**的承諾。"
        },
        {
          type: "paragraph",
          text: "牠會隨著歲月慢慢老去，可能出現**失智**、**大小便失禁**，甚至**癱瘓**。"
        },
        {
          type: "paragraph",
          text: "在迎接牠之前，請先問問自己：你做好了陪伴牠走到**生命盡頭**的心理準備嗎？"
        },
      ]
    }
  },
];
export function getDogLifeScenarios(_breedId: string): Scenario[] {
  void _breedId;
  return dogLifeScenarios.map((scenario) => scenario.id === "illness-vet" ? {
    ...scenario,
    speciesId: "dog",
    stageId: "life-change",
    order: 2,
    summaryCategory: "illness-vet"
  } : scenario);
}
