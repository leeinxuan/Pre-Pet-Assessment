/**
 * 飼養觀念回顧的「你已建立的照顧觀念」。
 * 每個項目都只描述規劃檔定義的一個觀念，並以來源活動／題目決定是否可顯示。
 */
export type MasteredCareSource =
  | { kind: "home-readiness" }
  | { kind: "room-preparation" }
  | { kind: "trunk-preparation" }
  | { kind: "arrival-meal" }
  | { kind: "scenario"; scenarioIds: readonly string[] }
  | {
    kind: "life-state";
    key: "walkingComplete" | "cat-litter-complete" | "rabbit-grooming-complete" | "bird-cage-inspection-complete";
    requiredStepIds?: readonly string[];
  };

export type MasteredCareTheme = {
  id: string;
  title: string;
  summary: string;
  order: number;
  /** 同一張卡的所有來源都必須完成，才算真正建立此觀念。 */
  sources: readonly MasteredCareSource[];
};

const preparationThemes = (copy: {
  home: string;
  room: string;
  trunk: string;
}): MasteredCareTheme[] => [
  { id: "home-readiness", title: "居住環境確認", summary: copy.home, order: 10, sources: [{ kind: "home-readiness" }] },
  { id: "safe-room", title: "安全空間佈置", summary: copy.room, order: 20, sources: [{ kind: "room-preparation" }] },
  { id: "departure-preparation", title: "出發前整備", summary: copy.trunk, order: 30, sources: [{ kind: "trunk-preparation" }] },
];

export const masteredCareThemesBySpecies: Record<string, readonly MasteredCareTheme[]> = {
  dog: [
    ...preparationThemes({
      home: "確認住家空間與同住者共識，評估是否做好迎接狗狗的準備。",
      room: "清除危險物品，備好狗床、如廁區與活動範圍，讓牠安心紮根。",
      trunk: "帶上牽繩、運輸籠與飼養文件，做好接狗的出發準備。",
    }),
    { id: "arrival-meal", title: "安頓與第一餐", summary: "了解到家後的安置流程，以及第一餐應選用哪些食物。", order: 40, sources: [{ kind: "scenario", scenarioIds: ["arrival-adjustment"] }, { kind: "arrival-meal" }] },
    { id: "behavior-response", title: "行為情境應對", summary: "遇到吠叫、啃咬與如廁問題，以正向方式引導而非懲罰。", order: 50, sources: [{ kind: "scenario", scenarioIds: ["behavior-barking", "behavior-chewing", "behavior-toileting"] }] },
    { id: "walking", title: "每日散步需求", summary: "知道狗狗每天必須外出散步如廁，不因天氣或忙碌而省略。", order: 60, sources: [{ kind: "life-state", key: "walkingComplete" }] },
    { id: "life-changes", title: "生活變化應對", summary: "忙碌、生病、高齡時，知道如何調整安排並及時尋求協助。", order: 70, sources: [{ kind: "scenario", scenarioIds: ["busy-daily-care", "illness-vet", "growing-old"] }] },
  ],
  cat: [
    ...preparationThemes({
      home: "確認住家空間、門窗安全與同住者共識，評估能否安心飼貓。",
      room: "清除危險物品，備好貓砂盆、躲藏處、抓板與攀爬空間。",
      trunk: "帶上外出籠、尿墊與飼養文件，做好接貓的出發準備。",
    }),
    { id: "arrival-meal", title: "安頓與第一餐", summary: "了解貓咪到家後需安靜適應，以及第一餐的食物選擇。", order: 40, sources: [{ kind: "scenario", scenarioIds: ["cat-arrival-adjustment"] }, { kind: "arrival-meal" }] },
    { id: "behavior-response", title: "行為情境應對", summary: "遇到夜間亢奮、抓家具與推落物品，了解正確的應對方式。", order: 50, sources: [{ kind: "scenario", scenarioIds: ["cat-night-energy-care", "cat-scratching-care", "cat-climbing-care"] }] },
    { id: "litter-management", title: "貓砂盆管理", summary: "知道貓砂盆的清潔頻率、砂量與位置設定，維持良好排泄環境。", order: 60, sources: [{ kind: "life-state", key: "cat-litter-complete" }] },
    { id: "life-changes", title: "生活變化應對", summary: "忙碌、生病、高齡時，知道如何安排代理照護並觀察健康變化。", order: 70, sources: [{ kind: "scenario", scenarioIds: ["cat-busy-care", "cat-illness-vet", "cat-growing-old"] }] },
  ],
  rabbit: [
    ...preparationThemes({
      home: "確認地板防滑、無有毒植物，評估適合飼兔的環境條件。",
      room: "先設置圍欄劃定活動區，再布置籠內床鋪、廁所與飲水設備。",
      trunk: "帶上固態底板外出籠與飼養文件，做好接兔的出發準備。",
    }),
    { id: "arrival-meal", title: "安頓與第一餐", summary: "了解兔子到家後習慣躲藏，以及第一餐應提供的食物種類。", order: 40, sources: [{ kind: "scenario", scenarioIds: ["rabbit-arrival-adjustment"] }, { kind: "arrival-meal" }] },
    { id: "behavior-response", title: "行為情境應對", summary: "了解如何建立信任、應對避暑需求、食糞行為與拒絕洗澡。", order: 50, sources: [{ kind: "scenario", scenarioIds: ["rabbit-carry-sort", "rabbit-heatstroke-prevention", "rabbit-cecotropes", "rabbit-bath"] }] },
    { id: "grooming", title: "美容與梳毛", summary: "知道兔子不需要水洗，以梳毛替代，並依毛長決定頻率。", order: 60, sources: [{ kind: "life-state", key: "rabbit-grooming-complete" }] },
    { id: "life-changes", title: "生活變化應對", summary: "忙碌、突發健康事件、高齡時，知道如何調整照護環境與安排。", order: 70, sources: [{ kind: "scenario", scenarioIds: ["rabbit-busy-care", "rabbit-health-emergency", "rabbit-senior-care"] }] },
  ],
  bird: [
    ...preparationThemes({
      home: "確認住家無鐵氟龍、薰香等鳥類毒素，評估適合飼鳥的環境條件。",
      room: "選用合適的方形金屬籠，備好棲木、飲水器與安全玩具。",
      trunk: "帶上外出籠、透氣墊材與飼養文件，準備好接鳥的出發物品。",
    }),
    { id: "arrival-meal", title: "安頓與第一餐", summary: "了解鳥類到家後需安靜適應，以及符合食性的第一餐食物。", order: 40, sources: [{ kind: "scenario", scenarioIds: ["bird-arrival-adjustment"] }, { kind: "arrival-meal" }] },
    { id: "behavior-response", title: "行為情境應對", summary: "遇到挑食、刻板行為或持續鳴叫，了解背後原因與應對方式。", order: 50, sources: [{ kind: "scenario", scenarioIds: ["bird-picky-eating", "bird-stereotypy", "bird-excessive-calling"] }] },
    { id: "cage-inspection", title: "鳥籠日常巡視", summary: "知道每天檢查棲木、玩具與糞便托盤的重要性與具體做法。", order: 60, sources: [{ kind: "life-state", key: "bird-cage-inspection-complete", requiredStepIds: ["tray-clean", "feces-observed", "health-observed", "social-time"] }] },
    { id: "life-changes", title: "生活變化應對", summary: "忙碌、突發健康事件、高齡時，知道如何調整照護安排。", order: 70, sources: [{ kind: "scenario", scenarioIds: ["bird-busy-care", "bird-health-emergency", "bird-senior-care"] }] },
  ],
};
