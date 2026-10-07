import type { HomeReadinessCard, HomeReadinessConfig, HomeReadinessHousingChoice, HomeReadinessTextBlock, HomeReadinessTextSegment } from "./home-readiness-types";

export const text = (value: string, emphasis = false): HomeReadinessTextSegment => ({ text: value, ...(emphasis ? { emphasis } : {}) });
export const item = (...segments: HomeReadinessTextSegment[]): HomeReadinessTextBlock => ({ type: "item", segments });
export const paragraph = (...segments: HomeReadinessTextSegment[]): HomeReadinessTextBlock => ({ type: "paragraph", segments });

export function createStandardCards(allergyAnimal: string, dailyTraits: string, allergenSource: string, cleaningAction: string): HomeReadinessCard[] {
  return [
    { id: "household-consent", stepLabel: "家人都同意嗎？", title: [text("同住家人或室友是否 "), text("100% 同意", true), text("飼養？")], body: [paragraph(text("{petName} 的日常"), text(dailyTraits, true), text("（夜間活動、叫聲等）會影響每一位同住者。若有人反對，可能在飼主不在時對寵物產生排斥，也可能讓"), text("照護責任落在不願承擔的人身上", true), text("。請在領養前與所有同住者"), text("充分溝通", true), text("，達成"), text("真正的共識", true), text("。"))] },
    { id: "allergy-check", stepLabel: "過敏準備好了嗎？", title: [text(`同住者是否有人對${allergyAnimal}`), text("過敏", true), text("？")], body: [paragraph(text(`${allergenSource}是常見的`), text("過敏原", true), text("，有過敏體質的人應在飼養前"), text("謹慎評估", true), text("，切勿衝動飼養。若飼養後才出現過敏反應，可透過"), text(cleaningAction, true), text("來降低過敏原，但"), text("不應因此棄養", true), text("。若有疑慮，建議先"), text("諮詢醫師", true), text("。"))] },
    { id: "future-changes", stepLabel: "未來也能堅持嗎？", title: [text("若未來"), text("懷孕、生子", true), text("，或"), text("長輩施壓", true), text("，你能否堅定不棄養？")], body: [paragraph(text("許多動物在主人"), text("懷孕或新生兒到來", true), text("時遭到棄養。在"), text("醫師指導", true), text("下維持適當清潔，與寵物共存通常是可行的。長輩或伴侶的施壓是"), text("常見考驗", true), text("——請在飼養前就與家人"), text("充分溝通", true), text("，讓這份承諾是"), text("全家一起做出的決定", true), text("。"))] },
  ];
}

export function createHomeReadinessConfig(input: {
  housingChoices: HomeReadinessHousingChoice[];
  cards: HomeReadinessCard[];
  reviewSummary: HomeReadinessTextSegment[];
  pendingReviewSummary: HomeReadinessTextSegment[];
}): HomeReadinessConfig {
  return { id: "home-readiness", stageId: "home-readiness", order: 1, summaryCategory: "home-readiness", ...input, completionMessage: [text("讓這份承諾是"), text("全家一起做出的決定", true), text("。")] };
}
