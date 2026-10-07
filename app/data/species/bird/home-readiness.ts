import type { HomeReadinessHousingChoice } from "../../shared/home-readiness-types";
import { createHomeReadinessConfig, createStandardCards, item, text } from "../../shared/home-readiness-builder";

const housingChoices: HomeReadinessHousingChoice[] = [
  { id: "owner", label: "我住在自有住宅", followUpTitle: "自有住宅提醒", nextQuestionId: "household-consent", followUpContent: [item(text("社區或公寓管委會可能有"), text("寵物相關規定", true), text("，請事先確認，避免日後糾紛。")), item(text("鸚鵡的"), text("鳴叫聲量相當大", true), text("，在公寓住宅中極易影響鄰居，甚至引發抗議或糾紛；這是飼養鸚鵡前"), text("最重要的現實考量之一", true), text("，請誠實評估你的居住環境與鄰居關係。")), item(text("若住在公寓，建議事先與鄰居溝通，並了解可能的"), text("隔音措施", true), text("（如加裝隔音窗簾等），以降低鄰里衝突的風險。"))], reviewSummary: [text("已確認住處規範、"), text("鳴叫聲量", true), text("與鄰里關係。")] },
  { id: "renter", label: "我是租屋族", followUpTitle: "租屋提醒", nextQuestionId: "household-consent", followUpContent: [item(text("房東是否已"), text("書面", true), text("同意飼養？口頭同意在換房東或房客搬遷時可能無法保障。")), item(text("台灣「可寵租屋」比例較低，若未來因故需要搬家，找尋寵物友善住宅的難度相對較高——請提前評估。")), item(text("評估租屋空間是否適合鳥籠擺放（充足"), text("通風", true), text("與"), text("自然光線", true), text("）；若飼養鸚鵡，請確認鳴叫噪音不會引發房東或鄰居抗議。"))], reviewSummary: [text("已確認"), text("房東書面同意", true), text("與未來搬遷時的照顧安排。")] },
];

export const birdHomeReadiness = createHomeReadinessConfig({ housingChoices, cards: createStandardCards("鳥類羽毛或皮屑", "氣味、羽屑、作息", "鳥類羽毛及皮屑", "加強環境清潔、定期清理羽屑"), reviewSummary: [text("確認居住規範、同住者共識與鳴叫聲量的現實影響。")], pendingReviewSummary: [text("帶牠回家前，請先確認住處規範、同住者共識與生活空間是否適合。")], });
