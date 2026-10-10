import type { CareReviewAdditionalNote } from "../../shared/care-review-note-types";
import { paragraph, text } from "../../shared/care-review-note-builder";
export const geckoCareReviewAdditionalNotes: CareReviewAdditionalNote[] = [
  { title: [text("獨居是守宮的安全距離")], summary: [text("每隻守宮都需要自己的爬蟲缸。")], content: [paragraph(text("守宮具領域性，飼養時應一隻一缸，避免混養造成壓力或攻擊。"))] },
  { title: [text("接觸後確實洗手")], summary: [text("建立基本衛生習慣。")], content: [paragraph(text("接觸守宮、缸內用品或排泄物後請確實洗手，避免交叉污染。"))] },
];
