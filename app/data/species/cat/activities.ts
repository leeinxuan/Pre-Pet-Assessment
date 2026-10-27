import type { ActivityIntroConfig } from "../../../game-types";
import { catAssets } from "./assets";
import { catReport } from "./report";

/** 貓砂盆救援隊的內容、素材與固定操作資料。 */
export const catLitterRescueConfig = {
  intro: {
    eyebrow: "日常照護",
    title: "每天清砂盆，是給 {petName} 最基本的照顧",
    paragraphs: [
      "貓咪對砂盆的乾淨程度**非常敏感**。砂盆太髒，牠可能**忍著不上**，或改去其他地方排泄——而貓咪一旦養成在外排泄的習慣，就**很難改正**。",
      "**每天鏟砂**、**確認砂量**，**每週換上備用盆**——動作不多，但少了哪一樣，{petName} 都能感覺到。",
      "{petName} 的廁所，今天靠你了！",
    ],
    startLabel: "開始今天的清潔 →",
    visualAssets: {
      character: catAssets.feeding.happyCat,
      tool: catAssets.daily.litterScoop,
      collector: catAssets.daily.trashBin,
    },
  } satisfies ActivityIntroConfig,
  // 相容舊版儲存紀錄；現行活動不再使用印章／輪次流程。
  targetStamps: 3,
  enableWeeklyWash: false,
  enableAbnormalObservation: false,
  weeklyWashRound: 2,
  abnormalObservationRound: 3,
  wasteItems: [
    { id: "urine-1", kind: "urine", label: "尿團", x: 39, y: 57, size: 12 },
    { id: "poop-1", kind: "poop", label: "便便", x: 43, y: 71, size: 11 },
  ],
  bin: { x: 82, y: 70, size: 16 },
  mobileTapSteps: [
    { id: "collect-urine", tool: "scoop", target: "urine-1", prompts: { idle: "點擊貓砂鏟，準備鏟出尿團。", toolSelected: "點擊尿團，鏟起尿團。" }, outcome: { type: "reveal", itemId: "urine-1" } },
    { id: "discard-urine", target: "bin", initialPhase: "itemCollected", prompts: { itemCollected: "點擊垃圾桶，將尿團丟棄。", completed: "正在丟棄尿團…" }, outcome: { type: "discard", itemId: "urine-1" } },
    { id: "collect-poop", tool: "scoop", target: "poop-1", prompts: { idle: "點擊貓砂鏟，準備鏟出便便。", toolSelected: "點擊便便，鏟起便便。" }, outcome: { type: "reveal", itemId: "poop-1" } },
    { id: "discard-poop", target: "bin", initialPhase: "itemCollected", prompts: { itemCollected: "點擊垃圾桶，將便便丟棄。", completed: "正在丟棄便便…" }, outcome: { type: "discard", itemId: "poop-1" } },
    { id: "refill-litter", tool: "clean-litter", target: "litter-box", prompts: { idle: "點擊乾淨貓砂，準備補砂。", toolSelected: "點擊貓砂盆，補上新貓砂。" }, outcome: { type: "fill" } },
    { id: "replace-box", tool: "backup-box", target: "litter-box", prompts: { idle: "點擊備用貓砂盆，準備替換。", toolSelected: "點擊貓砂盆，換上乾淨的備用盆。" }, outcome: { type: "backup" } },
  ],
  assets: {
    dirtyLitterBox: catAssets.daily.dirtyLitterBox,
    cleanLitterBox: catAssets.daily.cleanLitterBox,
    replacementLitterBox: catAssets.daily.replacementLitterBox,
    litterScoop: catAssets.daily.litterScoop,
    cleanLitter: catAssets.room.litter,
    urineClump: catAssets.daily.urineClump,
    catPoop: catAssets.daily.catPoop,
    trashBin: catAssets.daily.trashBin,
    trashBinOpen: catAssets.daily.trashBinOpen,
    replacementLitterBoxIcon: catAssets.daily.replacementLitterBoxIcon,
  },
  copy: {
    defaultPetName: "貓咪",
    heading: { eyebrow: "日常照護", title: "貓砂盆清潔隊", description: "跟著步驟整理砂盆，讓{petName}安心如廁。" },
    stageLabels: ["鏟出尿團", "丟進垃圾桶", "鏟出便便", "丟進垃圾桶", "補上新貓砂", "替換貓砂盆"],
    stageInstructions: ["拖曳貓砂鏟到貓砂盆裡，鏟出尿團。", "把尿團拖進垃圾桶。", "拖曳貓砂鏟到貓砂盆裡，鏟出便便。", "把便便拖進垃圾桶。", "拖曳乾淨貓砂到貓砂盆裡，補上新貓砂。"],
    backupCompleteInstruction: "貓砂盆已經乾淨又舒服了！",
    backupHelper: "貓砂盆使用一段時間後容易累積異味和髒污，換上乾淨的備用貓砂盆，才能讓貓咪有舒服、衛生的如廁空間。",
    keyboardSteps: [
      { select: "選取貓砂鏟", action: "鏟出尿團" },
      { select: "選取尿團", action: "放入垃圾桶" },
      { select: "選取貓砂鏟", action: "鏟出便便" },
      { select: "選取便便", action: "放入垃圾桶" },
      { select: "選取乾淨貓砂", action: "補進貓砂盆" },
    ],
    aria: { stageRail: "清潔步驟", scene: "貓砂盆清潔互動場景", currentStep: "目前步驟", litterBox: "貓砂盆", trashBin: "垃圾桶", replaceLitterBox: "更換新的貓砂盆" },
    replaceLabel: "點擊替換貓砂盆",
    completeLabel: "完成清潔",
    completion: {
      title: "砂盆整潔，{petName}才安心",
      summary: "你完成了今天的貓砂盆清潔，也幫{petName}換上了乾淨的備用盆。",
      detail: "貓咪對砂盆乾淨程度很敏感；每天清除排泄物 2–3 次，每週徹底清洗並完全晾乾，清洗期間換上備用盆，讓牠隨時有廁所可用。",
      reflectionTitle: "把每天的照顧，想成陪{petName}長大的日常",
      reflection: "貓咪不需要每天帶出門，但砂盆清潔、餵食換水、互動陪玩與健康觀察都需要固定完成。不論下班多晚或週末多累，都要為牠留下穩定的時間。",
      dailyCareBreakdown: catReport.dailyCareBreakdown,
    },
  },
} as const;
