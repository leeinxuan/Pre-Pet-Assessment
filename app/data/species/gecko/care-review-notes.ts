import type { CareReviewAdditionalNote } from "../../shared/care-review-note-types";
import { paragraph, text } from "../../shared/care-review-note-builder";

/** gecko-game-planning.md §6.7 額外注意事項——非主線情境提醒。 */
export const geckoCareReviewAdditionalNotes: CareReviewAdditionalNote[] = [
  { title: [text("若有計畫繁殖——守宮的繁殖與卵的照顧")], summary: [text("守宮繁殖需要額外的設備與知識，不建議新手在未充分準備下嘗試。")], content: [
    paragraph(text("守宮繁殖需要額外的設備與知識，"), text("不建議新手在未充分準備下嘗試", true), text("。雌守宮即使未交配，也可能產下無精卵；若卵無法順利排出（卵阻塞），需就醫甚至手術。")),
    paragraph(text("繁殖前應先了解孵蛋設備（孵卵器、孵化介質）、幼體的分缸管理，以及如何安置多隻幼守宮——"), text("每隻幼守宮都需要獨立的缸具", true), text("。")),
  ] },
  { title: [text("沙門氏菌——與守宮互動後的手部衛生")], summary: [text("爬蟲類（包含守宮）的腸道中可能帶有沙門氏菌，接觸後不洗手可能透過口腔途徑感染，對嬰幼兒、孕婦與免疫力較弱者尤其危險。")], content: [paragraph(text("爬蟲類（包含守宮）的腸道中可能帶有沙門氏菌，"), text("接觸後不洗手可能透過口腔途徑感染", true), text("，對嬰幼兒、孕婦與免疫力較弱者尤其危險。每次觸碰守宮、清理缸具或排泄物後，請立即用肥皂洗手。"), text("5 歲以下兒童應在大人監督下接觸守宮，並立即洗手", true), text("。"))] },
  { title: [text("守宮是獨居動物——不要同缸飼養")], summary: [text("雄性守宮相遇必然發生激烈打鬥，雌性同缸也有競爭行為與壓力風險。")], content: [paragraph(text("雄性守宮相遇必然發生激烈打鬥，雌性同缸也有競爭行為與壓力風險。即使看起來相安無事，"), text("弱勢個體可能長期在壓力下飲食不穩、免疫力下降", true), text("。若想同時飼養多隻守宮，每隻必須有"), text("完全獨立的缸具", true), text("。"))] },
  { title: [text("若家中同時飼養貓狗——爬蟲缸的隔離")], summary: [text("守宮是小型爬蟲，即使沒有被直接攻擊，貓狗在爬蟲缸周圍持續出現本身就是掠食者壓力訊號。")], content: [paragraph(text("守宮是小型爬蟲，即使沒有被直接攻擊，貓狗在爬蟲缸周圍持續出現本身就是掠食者壓力訊號。長期暴露在這種壓力下，守宮可能出現慢性免疫力下降、拒食或行為退縮。"), text("請確保爬蟲缸放置在貓狗無法進入或靠近的空間", true), text("，或使用附鎖扣的加固型缸蓋，防止貓狗開蓋或拍打缸壁。"))] },
];
