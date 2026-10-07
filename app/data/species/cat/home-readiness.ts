import type { HomeReadinessHousingChoice } from "../../shared/home-readiness-types";
import { createHomeReadinessConfig, createStandardCards, item, text } from "../../shared/home-readiness-builder";

const housingChoices: HomeReadinessHousingChoice[] = [
  { id: "owner", label: "我住在自有住宅", followUpTitle: "自有住宅提醒", nextQuestionId: "household-consent", followUpContent: [item(text("社區或公寓管委會可能有"), text("寵物相關規定", true), text("（如禁止進出公共空間、寵物體重上限、須繫牽繩等），請事先確認，避免日後糾紛。")), item(text("即使是自有住宅，貓咪在"), text("發情期的夜間嚎叫", true), text("聲量可能影響鄰居；若飼養未結紮的貓，請及早安排"), text("結紮手術", true), text("，並評估周遭鄰居關係。")), item(text("若住在公寓或大廈，留意"), text("電梯與公共走道的禮節", true), text("，並確認門窗防逃設施完善，避免貓咪進入公共區域引發糾紛。"))], reviewSummary: [text("已確認住處規範、鄰里影響與"), text("門窗防逃設施", true), text("。")] },
  { id: "renter", label: "我是租屋族", followUpTitle: "租屋提醒", nextQuestionId: "household-consent", followUpContent: [item(text("房東是否已"), text("書面", true), text("同意飼養？口頭同意在換房東或房客搬遷時可能無法保障。")), item(text("台灣「可寵租屋」比例較低，若未來因故需要搬家，找尋寵物友善住宅的難度相對較高——請提前評估。")), item(text("評估租屋空間是否有"), text("足夠空間", true), text("讓貓咪自由活動，並確認門窗能否加裝"), text("防逃設施", true), text("（貓網、窗扣），避免貓咪外逃。"))], reviewSummary: [text("已確認"), text("房東書面同意", true), text("與未來搬遷時的照顧安排。")] },
];

export const catHomeReadiness = createHomeReadinessConfig({ housingChoices, cards: createStandardCards("貓咪毛髮或皮屑", "氣味、毛髮、作息", "動物毛髮及皮屑", "加強環境清潔、定期梳毛"), reviewSummary: [text("確認居住規範、同住者共識與安全防逃環境。")], pendingReviewSummary: [text("帶牠回家前，請先確認住處規範、同住者共識與生活空間是否適合。")], });
