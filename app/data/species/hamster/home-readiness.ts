import type { HomeReadinessCard, HomeReadinessHousingChoice } from "../../shared/home-readiness-types";
import { createHomeReadinessConfig, item, paragraph, text } from "../../shared/home-readiness-builder";

const housingChoices: HomeReadinessHousingChoice[] = [
  { id: "owner", label: "我住在自有住宅", followUpTitle: "自有住宅提醒", nextQuestionId: "household-consent", followUpContent: [item(text("社區或公寓管委會可能有"), text("寵物相關規定", true), text("，請事先確認；倉鼠雖安靜，但部分社區對室內飼養寵物仍有規範，避免日後糾紛。")), item(text("倉鼠不發出明顯叫聲，但籠具清潔需頻繁，氣味管理是主要課題；請評估通風條件與清潔動線，確保居家環境舒適。")), item(text("評估居住空間是否有"), text("穩定、溫度適宜、遠離直曬陽光", true), text("的角落擺放籠具；直曬陽光或通風不良都可能威脅倉鼠健康。"))], reviewSummary: [text("確認住家空間與同住者共識，評估是否做好迎接倉鼠的準備。")] },
  { id: "renter", label: "我是租屋族", followUpTitle: "租屋提醒", nextQuestionId: "household-consent", followUpContent: [item(text("房東是否已"), text("書面", true), text("同意飼養？口頭同意在換房東或房客搬遷時可能無法保障。")), item(text("台灣「可寵租屋」比例較低，若未來因故需要搬家，找尋寵物友善住宅的難度相對較高——請提前評估。")), item(text("評估租屋空間是否有"), text("適合擺放籠具的穩定角落", true), text("，避免直曬陽光、爐火熱源或冷氣直吹位置。"))], reviewSummary: [text("確認住家空間與同住者共識，評估是否做好迎接倉鼠的準備。")] },
];

const cards: HomeReadinessCard[] = [
  { id: "household-consent", stepLabel: "同住者共識", title: [text("同住家人或室友是否 "), text("100% 同意", true), text("飼養？")], body: [paragraph(text("{petName} 的日常"), text("氣味、籠具清潔氣味、夜間滾輪轉動聲音", true), text("會影響每一位同住者。倉鼠是夜行性動物，牠最活躍的時候可能是你和家人熟睡的時候。若有人反對，可能讓"), text("照護責任落在不願承擔的人身上", true), text("，也可能在你不在時對{petName}造成干擾。請在領養前與所有同住者"), text("充分溝通", true), text("，達成"), text("真正的共識", true), text("。"))] },
  { id: "allergy-check", stepLabel: "過敏評估", title: [text("同住者是否有人對倉鼠毛髮或皮屑"), text("過敏", true), text("？")], body: [paragraph(text("動物毛髮及皮屑是常見的"), text("過敏原", true), text("，有過敏體質的人應在飼養前"), text("謹慎評估", true), text("，切勿衝動飼養。若飼養後才出現過敏反應，可透過"), text("加強環境清潔", true), text("來降低過敏原，但"), text("不應因此棄養", true), text("。若有疑慮，建議先"), text("諮詢醫師", true), text("。"))] },
  { id: "future-changes", stepLabel: "未來生活變化", title: [text("若未來"), text("懷孕、生子", true), text("，或"), text("長輩施壓", true), text("，你能否堅定不棄養？")], body: [paragraph(text("許多動物在主人"), text("懷孕或新生兒到來", true), text("時遭到棄養。在"), text("醫師指導", true), text("下維持適當清潔，與寵物共存通常是可行的。長輩或伴侶的施壓是"), text("常見考驗", true), text("——請在飼養前就與家人"), text("充分溝通", true), text("，讓這份承諾是"), text("全家一起做出的決定", true), text("。"))] },
];

export const hamsterHomeReadiness = createHomeReadinessConfig({ housingChoices, cards, reviewSummary: [text("確認住家空間與同住者共識，評估是否做好迎接倉鼠的準備。")], pendingReviewSummary: [text("確認住家空間與同住者共識，評估是否做好迎接倉鼠的準備。")], });
