import type { HomeReadinessHousingChoice } from "../../shared/home-readiness-types";
import { createHomeReadinessConfig, createStandardCards, item, text } from "../../shared/home-readiness-builder";

/** 犬的居住確認報告文案；版型與 lookup 仍由 shared 層提供。 */
export const dogHomeReadinessReportCopy = {
  reviewSummary: [text("確認居住規範、同住者共識與環境是否適合狗狗。")],
  pendingReviewSummary: [text("帶牠回家前，請先確認住處規範、同住者共識與生活空間是否適合。")],
};

export const dogHomeReadinessHousingChoices: HomeReadinessHousingChoice[] = [
  { id: "owner", label: "我住在自有住宅", followUpTitle: "自有住宅提醒", nextQuestionId: "household-consent", followUpContent: [item(text("社區或公寓管委會可能有"), text("寵物相關規定", true), text("（如禁止進出公共空間、寵物體重上限、須繫牽繩等），請事先確認，避免日後糾紛。")), item(text("若住在公寓或大廈，留意"), text("電梯與公共走道的禮節", true), text("，部分社區規定寵物需以提籠或牽繩管束方可進入公共區域。")), item(text("評估居住空間是否有"), text("足夠空間", true), text("讓狗狗自由活動；長期空間不足可能引發焦慮或破壞行為。"))], reviewSummary: [text("已確認住處規範、"), text("足夠活動空間", true), text("與地板安全。")] },
  { id: "renter", label: "我是租屋族", followUpTitle: "租屋提醒", nextQuestionId: "household-consent", followUpContent: [item(text("房東是否已"), text("書面", true), text("同意飼養？口頭同意在換房東或房客搬遷時可能無法保障。")), item(text("台灣「可寵租屋」比例較低，若未來因故需要搬家，找尋寵物友善住宅的難度相對較高——請提前評估。")), item(text("評估租屋空間是否有"), text("足夠空間", true), text("讓狗狗自由活動；長期空間不足可能引發焦慮或破壞行為。"))], reviewSummary: [text("已確認"), text("房東書面同意", true), text("、足夠活動空間與地板安全。")] },
];

export const dogHomeReadiness = createHomeReadinessConfig({
  housingChoices: dogHomeReadinessHousingChoices,
  cards: createStandardCards("犬類毛髮或皮屑", "氣味、毛髮、作息", "動物毛髮及皮屑", "加強環境清潔、定期梳毛"),
  ...dogHomeReadinessReportCopy,
});
