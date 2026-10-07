import type { CareReviewAdditionalNote } from "../../shared/care-review-note-types";
import { paragraph, text } from "../../shared/care-review-note-builder";

export const hamsterCareReviewAdditionalNotes: CareReviewAdditionalNote[] = [
  { title: [text("夜間滾輪聲響——{petName}最活躍的時候正是你熟睡時")], summary: [text("倉鼠在夜間到清晨最為活躍，滾輪轉動聲可能成為輕眠飼主的困擾。")], content: [paragraph(text("倉鼠在夜間到清晨最為活躍，滾輪轉動聲可能成為輕眠飼主的困擾。解決方式包括：選用"), text("靜音滾輪", true), text("（軸承型金屬滾輪）、確認滾輪底座穩固不滑動、或將籠具移至通風良好但隔音效果較佳的房間角落。"), text("不應因此移除滾輪", true), text("——那對倉鼠的身心健康至關重要。若夜間完全沒有任何活動聲音，反而是需要留意的健康訊號。"))] },
  { title: [text("合籠前必須了解的品系差異——{petName}需要自己的空間嗎？")], summary: [text("許多飼主想讓倉鼠「有伴」，但倉鼠的社交模式因品系而異，不可一概而論。")], content: [paragraph(text("許多飼主想讓倉鼠「有伴」，但倉鼠的社交模式因品系而異，不可一概而論。"), text("黃金鼠（敘利亞倉鼠）", true), text("有強烈領域性，成年後獨居是最安全的飼養方式，強行合籠可能導致嚴重打鬥甚至死亡；部分"), text("侏儒倉鼠品系", true), text("相對可接受同性同伴，但仍需採漸進式引入，並隨時準備隔離。確認{petName}的品系是合籠決策的第一步，若不確定，獸醫師或有經驗的飼主是最好的諮詢對象。"))] },
  { title: [text("適應新環境需要時間——搬家或籠具更換後請耐心等待")], summary: [text("環境驟變可能讓{petName}出現緊迫反應。")], content: [paragraph(text("倉鼠以氣味作為辨認安全領域的主要依據，環境驟變（搬家、全面更換墊料、換新籠具）可能讓{petName}出現緊迫反應，如躲藏不出、進食量短暫下降。因應方式：搬遷時保留舊巢箱或部分舊墊料，讓熟悉的氣味幫助{petName}安心；全面清潔籠具時保留一小塊舊墊料置於巢箱中；新環境下的前三天盡量維持原有餵食時間與互動習慣。"))] },
];
