import type { GeckoHealthInspectionConfig } from "../../../game-types";

const binaryChoices = (normal: string, warning: string) => [
  { id: "normal", text: normal, normalIsCorrect: true },
  { id: "warning", text: warning, normalIsCorrect: false },
] as const;

export const geckoHealthInspection: GeckoHealthInspectionConfig = {
  intro: { eyebrow: "日常照護", title: "{petName} 看起來沒事，不代表牠真的沒事", paragraphs: ["守宮非常**善於隱藏不適**——即使牠不舒服，也幾乎不會主動表現出來。", "每天的觀察，是守宮健康的**第一道防線**。**溫度**、**飲水**、**排泄**、**眼睛**、**尾巴**、**皮膚**——每天確認這些細節，才能在**問題還小的時候**先發現它。"], startLabel: "開始今日巡視" },
  title: "{petName} 的每日健康巡視", description: "依序確認環境與身體細節，養成每天主動觀察的習慣。",
  steps: [
    { id: "temperature", label: "溫度確認", instruction: "確認暖側與涼側溫度讀數。", detail: "暖側底部應維持 28–32°C，涼側維持 22–25°C。", choices: binaryChoices("溫度正常，暖涼兩側都在安全範圍", "溫度有問題，需要調整"), normalFeedback: "正確！今天的溫度梯度良好，守宮能自由選擇舒適區域。", warningFeedback: "正確！溫度異常時，請立刻檢查並調整加熱設備。" },
    { id: "water", label: "飲水更換", instruction: "確認水碟並換上新鮮飲水。", detail: "守宮飲水量雖少，但飲水習慣的改變是健康早期訊號。", completionLabel: "換水完成" },
    { id: "feces", label: "排泄觀察", instruction: "確認底材排泄角落的狀況。", detail: "健康尿酸應呈白色或淡黃色；異常顏色、帶血或多天無排泄都需記錄。", choices: binaryChoices("排泄狀況正常，今天清理一下就好", "排泄狀況有異常，需要留意"), normalFeedback: "正確！成形排泄物與白色尿酸是常見的正常表現。", warningFeedback: "正確！排泄異常應持續記錄並諮詢爬蟲獸醫。" },
    { id: "eyes", label: "眼睛觀察", instruction: "觀察眼睛是否清亮、有無腫脹或殘皮。", detail: "半閉、浮腫或眼皮殘皮都需要留意。", choices: binaryChoices("眼睛清亮，今天沒有問題", "眼睛有異常，需要留意"), normalFeedback: "正確！眼睛清亮、無分泌物是健康表現。", warningFeedback: "正確！眼睛異常可能與脫皮問題或感染有關。" },
    { id: "tail", label: "尾巴觀察", instruction: "確認尾巴是否飽滿，觀察近期體況。", detail: "尾巴是守宮儲存脂肪的部位，明顯消瘦需要追蹤。", choices: binaryChoices("尾巴看起來健康，體況正常", "尾巴有異常，需要留意"), normalFeedback: "正確！飽滿尾巴代表近期體況穩定。", warningFeedback: "正確！消瘦尾巴應檢查餵食並記錄體重趨勢。" },
    { id: "skin-toes", label: "皮膚與趾端", instruction: "確認皮膚與趾端是否有殘皮。", detail: "趾端殘皮可能影響血液循環；脫皮後務必確認。", choices: binaryChoices("皮膚狀況正常或即將脫皮，不需特別處理", "皮膚或趾端有殘皮問題，需要處理"), normalFeedback: "正確！正常脫皮前皮膚可略顯灰白，持續提供濕躲避屋。", warningFeedback: "正確！殘皮需先軟化後輕柔協助，必要時諮詢獸醫。" },
  ],
  completion: { title: "今日巡視完成！", subtitle: "你完成了環境、飲水、排泄與外觀確認。", description: "守宮善於隱藏不適；每天固定巡視，才能及早發現小變化。", reflectionTitle: "每天幾分鐘的主動觀察", reflection: "記錄異常、維持環境穩定，必要時及早諮詢熟悉爬蟲的獸醫。", careTitle: "每日投入時間", continueLabel: "繼續生活旅程 →" },
};
