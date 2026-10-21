import type {
  GeckoBodyInspectionPoint,
  GeckoFecesInspection,
  GeckoHealthInspectionConfig,
} from "../../../game-types";
import { geckoAssets } from "./assets";

const health = geckoAssets.healthInspection;

const binaryChoices = (normal: string, warning: string) => [
  { id: "normal", text: normal, correctStates: ["normal"] },
  { id: "warning", text: warning, correctStates: ["warning"] },
] as const;

const feces: GeckoFecesInspection = {
  id: "feces",
  label: "排泄觀察",
  instruction: "點擊底材上的糞便，觀察今天的排泄狀態並辨識需要留意的變化。",
  prompt: "今天的排泄狀況看起來……？",
  choices: binaryChoices("排泄狀況正常，今天清理一下就好", "排泄狀況有異常，需要留意"),
  states: {
    normal: {
      image: health.fecesNormal,
      imageAlt: "成形固體排泄物與白色膏狀尿酸",
      detail: "少量成形固體排泄物，尿酸呈白色膏狀。",
      correctFeedback: "✅ 正確！今天的排泄物成形、尿酸白色膏狀，是正常的表現。守宮通常排泄在固定角落，清理後可以繼續觀察下次的狀況。",
      incorrectFeedback: "其實今天的排泄狀況是正常的——成形固體、尿酸白色膏狀。守宮的排泄頻率約每 1–3 天一次，健康的尿酸應呈白色或淡黃色。",
    },
    warning: {
      image: health.fecesWarning,
      imageAlt: "顏色異常的守宮排泄物",
      detail: "排泄量明顯異常、尿酸呈橘色或棕色、或連續多天無排泄記錄。",
      correctFeedback: "✅ 正確！你發現了排泄異常——尿酸變色（橘色/棕色）可能是脫水或腎臟問題的早期訊號，請持續記錄並在近期諮詢熟悉爬蟲類醫療的獸醫師。",
      incorrectFeedback: "仔細再看——今天的排泄物有異常（尿酸顏色偏橘、量異常或多天無排泄）。這些是健康警訊，不能視為正常，請記錄並諮詢熟悉爬蟲類醫療的獸醫師。",
    },
  },
  comparison: {
    title: "排泄異常",
    image: health.fecesWarning,
    imageAlt: "需要留意的守宮排泄異常",
    description: "⚠️ 需要注意的排泄異常：尿酸呈橘色或棕色（可能脫水或腎臟問題）；連續 7 天以上無排泄記錄；排泄物帶血或有強烈異味——出現上述情況請諮詢熟悉爬蟲類醫療的獸醫師。",
    actionLabel: "了解異常排泄",
  },
  scenePlacement: { x: 75, y: 73, width: 10, layer: 7 },
};

const bodyPoints: readonly GeckoBodyInspectionPoint[] = [
  {
    id: "eyes",
    label: "眼睛",
    instruction: "點擊眼睛，觀察是否清亮、有無腫脹或殘皮。",
    prompt: "{petName} 的眼睛看起來……？",
    hotspot: { x: 27, y: 32 },
    choices: binaryChoices("眼睛清亮，今天沒有問題", "眼睛有異常，需要留意"),
    states: {
      normal: {
        image: health.eyeNormal,
        imageAlt: "明亮清澈的守宮眼睛",
        detail: "眼睛明亮清澈，瞳孔收放正常。",
        correctFeedback: "✅ 正確！{petName} 的眼睛今天明亮清澈，瞳孔正常，沒有分泌物或腫脹，是健康的表現。",
        incorrectFeedback: "其實 {petName} 的眼睛今天是正常的——清亮、無分泌物、無腫脹。守宮的眼睛應該清晰有神；若出現半閉或浮腫才需要立即留意。",
      },
      warning: {
        image: health.eyeWarning,
        imageAlt: "半閉且浮腫的守宮眼睛",
        detail: "半閉、浮腫、或眼皮周圍有脫皮殘留，睜眼困難。",
        correctFeedback: "✅ 正確！你發現了眼睛異常——半閉眼、浮腫或眼皮周圍有脫皮殘留，可能是脫皮問題或感染，請盡快諮詢熟悉爬蟲類醫療的獸醫師。",
        incorrectFeedback: "仔細再看——{petName} 的眼睛有異常（半閉或腫脹），不能視為正常。守宮眼睛問題若拖延可能造成永久損傷，請盡快聯繫熟悉爬蟲類醫療的獸醫師。",
      },
    },
    comparison: {
      title: "眼睛異常",
      image: health.eyeWarning,
      imageAlt: "需要留意的守宮眼睛異常",
      description: "⚠️ 眼睛半閉、浮腫，或眼皮周圍有脫皮殘留（睜眼困難）時，請諮詢熟悉爬蟲類醫療的獸醫師——脫皮殘留壓迫眼球可能造成永久損傷。",
      actionLabel: "了解眼睛異常",
    },
  },
  {
    id: "tail",
    label: "尾巴",
    instruction: "點擊尾巴，確認是否飽滿並觀察近期體況。",
    prompt: "{petName} 的尾巴看起來……？",
    hotspot: { x: 77, y: 51 },
    choices: binaryChoices("尾巴看起來健康，體況正常", "尾巴有異常，需要留意"),
    states: {
      normal: {
        image: health.tailNormal,
        imageAlt: "飽滿渾圓的守宮尾巴",
        detail: "尾巴飽滿渾圓，從基部到末端有健康胖度。",
        correctFeedback: "✅ 正確！{petName} 的尾巴今天飽滿渾圓——守宮在尾巴儲存脂肪，健康的尾巴表示近期熱量攝取充足。",
        incorrectFeedback: "其實 {petName} 的尾巴今天是正常的——飽滿渾圓，是健康體況的表現。守宮在尾巴儲存脂肪作為能量來源，健康的尾巴應有足夠的厚度。",
      },
      warning: {
        image: health.tailWarning,
        imageAlt: "明顯消瘦的守宮尾巴",
        detail: "尾巴明顯消瘦、呈細棒狀，可見尾椎輪廓。",
        correctFeedback: "✅ 正確！你發現了尾巴消瘦——這表示 {petName} 近期攝取的熱量不足。請檢查餵食頻率與昆蟲大小，並用電子秤記錄體重趨勢，若持續消瘦請諮詢熟悉爬蟲類醫療的獸醫師。",
        incorrectFeedback: "仔細再看——{petName} 的尾巴明顯消瘦，不能視為正常。消瘦的尾巴表示身體在消耗儲存的脂肪，需要調整餵食計畫並密切追蹤體重。",
      },
    },
    comparison: {
      title: "尾巴異常",
      image: health.tailWarning,
      imageAlt: "需要留意的守宮尾巴消瘦",
      description: "⚠️ 守宮尾巴是體況的直接指標——若尾巴開始明顯消瘦（可見尾椎輪廓），表示近期攝食不足。建議每週固定用電子秤量體重，成體守宮體重突然下降 10% 以上時請諮詢獸醫。",
      actionLabel: "了解尾巴異常",
    },
  },
  {
    id: "skin",
    label: "皮膚",
    instruction: "點擊身體皮膚，確認目前的脫皮狀態。",
    prompt: "{petName} 的皮膚看起來……？",
    hotspot: { x: 49, y: 44 },
    choices: [
      { id: "normal", text: "皮膚狀況正常或即將脫皮，不需特別處理", correctStates: ["normal", "shedding"] },
      { id: "warning", text: "皮膚有殘皮問題，需要處理", correctStates: ["stuck-shed"] },
    ],
    states: {
      normal: {
        image: health.skinNormal,
        imageAlt: "光滑完整的守宮皮膚",
        detail: "皮膚光滑完整，顏色清晰。",
        correctFeedback: "✅ 正確！{petName} 的皮膚今天光滑完整，沒有即將脫皮的灰白色或殘皮，是健康的狀態。",
        incorrectFeedback: "其實 {petName} 的皮膚今天是正常的——光滑完整，沒有需要處理的狀況。正常的守宮皮膚顏色清晰，不會有灰白霧狀覆蓋。",
      },
      shedding: {
        image: health.skinShedding,
        imageAlt: "表面呈灰白霧狀的守宮皮膚",
        detail: "皮膚表面開始出現灰白霧狀，即將脫皮。",
        correctFeedback: "✅ 正確！皮膚表面出現灰白霧狀是即將脫皮的正常前兆，不需要特別處理——可以在缸中放入濕躲避屋（濕苔蘚盒），幫助 {petName} 順利脫皮。",
        incorrectFeedback: "其實表面的灰白霧狀是正常的脫皮前兆，不需要強行介入。你可以確認缸內有濕躲避屋，讓 {petName} 在需要時自行使用。",
      },
      "stuck-shed": {
        image: health.skinStuckShed,
        imageAlt: "仍有殘留皮膚的守宮",
        detail: "脫皮後仍有殘留皮膚，特別在趾端或尾巴根部。",
        correctFeedback: "✅ 正確！你發現了脫皮殘留——請用溫熱濕毛巾包裹 {petName} 的腳 5–10 分鐘使皮膚軟化，再用濕棉棒輕柔地從趾端基部向外捲動去除殘皮，若無法去除請諮詢熟悉爬蟲類醫療的獸醫師。",
        incorrectFeedback: "仔細再看——{petName} 有脫皮殘留（特別注意趾端區域）。殘留的皮膚不會自行脫落，若卡在趾端可能造成趾頭永久損傷，請立刻輕柔協助去除或聯繫獸醫。",
      },
    },
    comparison: {
      title: "皮膚異常",
      image: health.skinStuckShed,
      imageAlt: "守宮脫皮卡住的異常狀態",
      description: "⚠️ 脫皮卡住（stuck shed）最危險的位置是趾端——殘留皮膚乾燥後收縮，可能阻斷血液循環造成趾頭壞死，請在脫皮後 24 小時內確認趾端狀況。",
      actionLabel: "了解脫皮異常",
    },
  },
  {
    id: "toes",
    label: "趾端",
    instruction: "點擊趾端，確認是否有環狀殘皮。",
    prompt: "{petName} 的趾端看起來……？",
    hotspot: { x: 42, y: 74 },
    choices: binaryChoices("趾端乾淨，沒有殘皮", "趾端有殘皮，需要處理"),
    states: {
      normal: {
        image: health.toeNormal,
        imageAlt: "清潔且無殘皮的守宮趾端",
        detail: "每趾趾端清潔，無皮膚殘留。",
        correctFeedback: "✅ 正確！{petName} 的所有趾端今天乾淨，沒有脫皮殘留。",
        incorrectFeedback: "其實 {petName} 的趾端今天是乾淨的，不需要特別處理。但養成每次脫皮後確認趾端的習慣，是避免脫皮問題造成傷害的關鍵。",
      },
      warning: {
        image: health.toeWarning,
        imageAlt: "有環狀殘皮的守宮趾端",
        detail: "一趾或多趾趾端有環狀殘皮，趾端可能稍粗或顏色偏暗。",
        correctFeedback: "✅ 正確！你發現了趾端殘皮——請用溫熱濕毛巾包裹 {petName} 的腳 5–10 分鐘使皮膚軟化，再用濕棉棒輕柔地從趾端基部向外捲動去除殘皮，若無法去除請諮詢熟悉爬蟲類醫療的獸醫師。",
        incorrectFeedback: "仔細再看——{petName} 的某些趾端有脫皮殘留，不能忽視。趾端殘皮會隨著乾燥收縮，可能造成趾頭永久損傷，請立刻輕柔協助去除。",
      },
    },
    comparison: {
      title: "趾端異常",
      image: health.toeWarning,
      imageAlt: "需要留意的守宮趾端殘皮",
      description: "⚠️ 趾端殘皮是守宮最常見也最危險的脫皮問題——套在趾端的皮膚乾燥後會像橡皮筋一樣收縮，阻斷血液供應，最終可能導致趾頭壞死脫落。建議每次脫皮後 24 小時內確認所有趾端狀況。",
      actionLabel: "了解趾端異常",
    },
  },
];

export const geckoHealthInspection: GeckoHealthInspectionConfig = {
  intro: {
    eyebrow: "日常照護",
    title: "{petName} 看起來沒事，不代表牠真的沒事",
    paragraphs: [
      "守宮非常**善於隱藏不適**——即使牠不舒服，也幾乎不會主動表現出來。",
      "每天的觀察，是守宮健康的**第一道防線**。**溫度**、**飲水**、**排泄**、**眼睛**、**尾巴**、**皮膚**——每天確認這些細節，才能在**問題還小的時候**先發現它。",
    ],
    startLabel: "開始今日巡視",
    visualAssets: { character: health.body },
  },
  title: "{petName} 的每日健康巡視",
  description: "守宮善於隱藏不適，每天固定巡視，是在問題還小的時候先發現它的第一道防線。",
  progress: [
    { id: "temperature", label: "溫度確認" },
    { id: "water", label: "飲水更換" },
    { id: "feces", label: "排泄觀察" },
    { id: "body", label: "身體巡視" },
  ],
  scene: {
    background: health.terrariumBackground,
    body: health.body,
    bodyAlt: "等待進行眼睛、尾巴、皮膚與趾端檢查的守宮",
    magnifier: health.magnifier,
    completedItems: [
      { id: "cool-hide", image: geckoAssets.room.coolHide, alt: "涼側躲避屋", placement: { x: 22, y: 70, width: 25, layer: 3 } },
      { id: "moist-hide", image: geckoAssets.room.moistHide, alt: "濕躲避屋", placement: { x: 51, y: 58, width: 25, layer: 3 } },
      { id: "warm-hide", image: geckoAssets.room.warmHide, alt: "暖側躲避屋", placement: { x: 77, y: 65, width: 25, layer: 3 } },
      { id: "calcium-dish", image: geckoAssets.room.calciumDish, alt: "補鈣碟", placement: { x: 45, y: 77, width: 15, layer: 6 } },
      { id: "shallow-water-dish", image: geckoAssets.room.shallowWaterDish, alt: "淺水碟", placement: { x: 60, y: 77, width: 15, layer: 6 } },
    ],
  },
  temperature: {
  instruction: "確認暖側底部與涼側溫度，調整加熱設備後再確認今日溫度。",
    warmLabel: "暖側溫度",
    coolLabel: "涼側溫度",
    controllerLabel: "加熱片控制器",
    warmThermometer: health.warmThermometer,
    coolThermometer: health.coolThermometer,
    controllerImage: health.heatMatController,
    // The actual finished terrarium places the cool-side gauge high on the
    // left and the warm-side gauge at the heated lower-right area.
    warmPlacement: { x: 90, y: 86, width: 25 },
    coolPlacement: { x: 22, y: 14, width: 25 },
    correctTemperatures: {
      warm: { min: 28, max: 32 },
      cool: { min: 22, max: 25 },
    },
    presets: {
      // 企劃 §5.3.2：too-cold 暖側 22–25°C／涼側 18–20°C；too-hot 暖側 34–36°C／涼側 26–28°C；in-range 不需調整。
      "too-cold": [{ warm: 22, cool: 18 }, { warm: 23, cool: 19 }, { warm: 24, cool: 20 }, { warm: 25, cool: 20 }],
      "too-hot": [{ warm: 34, cool: 26 }, { warm: 35, cool: 27 }, { warm: 36, cool: 28 }],
      "in-range": [{ warm: 29, cool: 23 }, { warm: 30, cool: 24 }, { warm: 31, cool: 24 }],
    },
    adjustment: { warm: 1, cool: 0.5 },
    confirmLabel: "✅ 確認今日溫度",
    successFeedback: {
      "too-cold": "✅ 調整完成！暖側升至 28–32°C、涼側 22–25°C——{petName} 現在可以在冷熱兩側之間自由選擇最舒適的溫度了。",
      "too-hot": "✅ 調整完成！過高的溫度已調回安全範圍——暖側超過 35°C 可能引發熱衰竭，定期確認很重要。",
      "in-range": "✅ 今天溫度梯度良好，不需要調整。持續每天確認，是對 {petName} 最基本的保障。",
    },
    fixedWarning: "⚠️ 暖側超過 35°C 可能引發熱衰竭；涼側低於 18°C 守宮消化與免疫功能都會受影響。加熱設備須搭配溫度計持續監控，不可使用電熱石（無法精準控溫且易燙傷）。",
    continueLabel: "繼續確認飲水 →",
  },
  water: {
    instruction: "檢查水碟是否乾淨，點擊髒水碟更換為乾淨飲水。",
    dirtyImage: health.waterDirty,
    dirtyImageAlt: "需要清洗換水的守宮水碟",
    cleanImage: health.waterClean,
    cleanImageAlt: "已換上新鮮飲水的乾淨水碟",
    detail: "每天換新鮮的水，清洗水碟。守宮飲水量雖少，但飲水習慣的改變是健康的早期訊號。",
    successFeedback: "✅ 水碟已清洗，今天的新鮮飲水也補好了。",
    fixedWarning: "⚠️ 守宮有時會在水碟附近排泄，請每天確認飲水是否清澈，水碟每日清洗更換是基本習慣。",
    continueLabel: "繼續觀察排泄 →",
    sceneItemId: "shallow-water-dish",
  },
  feces,
  body: {
    requiresOrderedInspection: false,
    showPointNumbers: false,
    instruction: "點擊提示點，觀察 {petName} 的眼睛、尾巴、皮膚與趾端是否出現異常警訊。",
    points: bodyPoints,
  },
  completion: {
    title: "今日巡視完成！{petName} 的爬蟲缸記錄好了",
    subtitle: "你確認了溫度梯度、飲水、排泄角落，還有 {petName} 的眼睛、尾巴與趾端。",
    description: "守宮不會告訴你牠不舒服——牠只是靜靜地待著。但尾巴的粗細、眼睛是否清亮、趾端是否乾淨，都是牠唯一能「說」的語言。只有每天固定觀察，才能在問題還小的時候先看見它。",
    reflectionTitle: "每天多看牠一眼，是對 {petName} 最具體的守護",
    reflection: "守宮是隱藏不適的高手。牠不會靠近你尋求幫助，也不會主動讓你知道牠不舒服。溫度梯度、尾巴體況、趾端殘皮——這些每天兩三分鐘就能確認的細節，是你能給 {petName} 最直接的照顧，也是每一次發現問題時，讓牠不必痛太久的方式。",
    careTitle: "每天留給牠的照護時間",
    continueLabel: "繼續生活旅程 →",
  },
};
