import type { HomeReadinessCard, HomeReadinessHousingChoice } from "../../shared/home-readiness-types";
import { createHomeReadinessConfig, item, paragraph, text } from "../../shared/home-readiness-builder";

/** 犬的居住確認報告文案；版型與 lookup 仍由 shared 層提供。 */
export const dogHomeReadinessReportCopy = {
  reviewSummary: [text("確認住家空間與同住者共識，評估是否做好迎接狗狗的準備。")],
  pendingReviewSummary: [text("確認住家空間與同住者共識，評估是否做好迎接狗狗的準備。")],
};

export const dogHomeReadinessHousingChoices: HomeReadinessHousingChoice[] = [
  { id: "owner", label: "我住在自有住宅", followUpTitle: "自有住宅提醒", nextQuestionId: "household-consent", followUpContent: [item(text("社區或公寓管委會可能有"), text("寵物相關規定", true), text("（如禁止進出公共空間、寵物體重上限、須繫牽繩等），請事先確認，避免日後糾紛。")), item(text("評估居住空間是否有"), text("足夠空間", true), text("讓狗狗自由活動；並留意"), text("爪子磨地板聲", true), text("與"), text("夜間奔跑抓地聲", true), text("在公寓中容易影響鄰居，需事先評估隔音條件。")), item(text("了解住家附近是否有合格的動物醫院，並提前建立"), text("動物醫院口袋名單", true), text("（24 小時急診、就近可達、平時信任的動物醫院）。"))], reviewSummary: [text("已確認住處規範、公共空間禮節與"), text("足夠活動空間", true), text("，以及住家附近"), text("動物醫院口袋名單", true), text("（含 24 小時急診）。")] },
  { id: "renter", label: "我是租屋族", followUpTitle: "租屋提醒", nextQuestionId: "household-consent", followUpContent: [item(text("房東是否已"), text("書面", true), text("同意飼養？口頭同意在發生爭議事件時較無保障。")), item(text("台灣「寵物友善租屋」比例較低，若未來因故需要搬家，找尋寵物友善住宅的難度相對較高——請提前評估。")), item(text("評估租屋空間是否有"), text("足夠空間", true), text("讓狗狗自由活動；並留意"), text("爪子磨地板聲", true), text("與"), text("夜間奔跑抓地聲", true), text("在公寓中容易影響鄰居，需事先評估隔音條件。")), item(text("了解住家附近是否有合格的動物醫院，並提前建立"), text("動物醫院口袋名單", true), text("（24 小時急診、就近可達、平時信任的動物醫院）。"))], reviewSummary: [text("已確認"), text("房東書面同意", true), text("與足夠活動空間，以及住家附近"), text("動物醫院口袋名單", true), text("（含 24 小時急診）。")] },
];

const dogHomeReadinessCards: HomeReadinessCard[] = [
  {
    id: "household-consent",
    stepLabel: "同住者共識",
    title: [text("同住家人或室友是否 "), text("100% 同意", true), text("飼養？")],
    body: [paragraph(text("{petName} 的日常"), text("氣味、掉毛、作息", true), text("（夜間活動、叫聲、可能的破壞行為及如廁訓練期等）會影響每一位同住者。若有人反對，可能在飼主不在時對寵物產生排斥，也可能讓"), text("照護責任落在不願承擔的人身上", true), text("。請在飼養前與所有同住者"), text("充分溝通", true), text("，達成"), text("真正的共識", true), text("。"))],
  },
  {
    id: "allergy-check",
    stepLabel: "過敏評估",
    title: [text("同住者是否有人對寵物毛髮或皮屑"), text("過敏", true), text("？")],
    body: [paragraph(text("動物毛髮及皮屑是常見的"), text("過敏原", true), text("，有過敏體質的人應在飼養前"), text("謹慎評估", true), text("，切勿衝動飼養。若飼養後才出現過敏反應，可透過"), text("加強環境清潔、定期梳毛", true), text("來降低過敏原，但"), text("不應因此棄養", true), text("。若有疑慮，建議先"), text("諮詢醫師", true), text("。"))],
  },
  {
    id: "future-changes",
    stepLabel: "未來生活變化",
    title: [text("生涯規劃中可能出現的"), text("生活變化", true), text("，你提前想過了嗎？")],
    body: [paragraph(text("棄養往往源於生活改變——"), text("新生兒到來", true), text("、"), text("因求學或工作移居外地甚至海外", true), text("、"), text("生活型態改變後可支配時間減少", true), text("，都是常見考驗。請在飼養前提前評估生涯規劃，讓這份承諾是全家"), text("想清楚後共同做出的決定", true), text("。"))],
  },
];

export const dogHomeReadiness = createHomeReadinessConfig({
  housingChoices: dogHomeReadinessHousingChoices,
  cards: dogHomeReadinessCards,
  ...dogHomeReadinessReportCopy,
});
