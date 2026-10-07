import type { HomeReadinessHousingChoice } from "../../shared/home-readiness-types";
import { createHomeReadinessConfig, createStandardCards, item, text } from "../../shared/home-readiness-builder";

const housingChoices: HomeReadinessHousingChoice[] = [
  { id: "owner", label: "我住在自有住宅", followUpTitle: "自有住宅提醒", nextQuestionId: "household-consent", followUpContent: [item(text("社區或公寓管委會可能有"), text("寵物相關規定", true), text("，請事先確認；兔子雖安靜，但部分社區對室內飼養寵物仍有規範，避免日後糾紛。")), item(text("兔子"), text("不發出明顯叫聲", true), text("，但代謝旺盛、排泄頻繁，氣味管理是主要課題；請評估通風條件與清潔動線，確保居家環境舒適。")), item(text("評估居住空間是否有"), text("足夠空間", true), text("供兔子在圍欄內自由活動；長期缺乏活動空間可能影響兔子的腸道蠕動與骨骼健康。"))], reviewSummary: [text("已確認住處規範與"), text("安全圍欄內每日自由活動", true), text("的空間。")] },
  { id: "renter", label: "我是租屋族", followUpTitle: "租屋提醒", nextQuestionId: "household-consent", followUpContent: [item(text("房東是否已"), text("書面", true), text("同意飼養？口頭同意在換房東或房客搬遷時可能無法保障。")), item(text("台灣「可寵租屋」比例較低，若未來因故需要搬家，找尋寵物友善住宅的難度相對較高——請提前評估。")), item(text("評估租屋空間是否有"), text("足夠空間", true), text("讓兔子在圍欄內自由活動；長期缺乏活動空間可能影響兔子的腸道蠕動與骨骼健康。"))], reviewSummary: [text("已確認"), text("房東書面同意", true), text("與未來搬遷時的照顧安排。")] },
];

export const rabbitHomeReadiness = createHomeReadinessConfig({ housingChoices, cards: createStandardCards("兔兔毛髮或皮屑", "氣味、毛髮、作息", "動物毛髮及皮屑", "加強環境清潔、定期梳毛"), reviewSummary: [text("確認居住規範、同住者共識與安全活動空間。")], pendingReviewSummary: [text("帶牠回家前，請先確認住處規範、同住者共識與生活空間是否適合。")], });
