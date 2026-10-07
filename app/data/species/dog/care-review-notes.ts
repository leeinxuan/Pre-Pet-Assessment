import type { CareReviewAdditionalNote } from "../../shared/care-review-note-types";
import { item, paragraph, text } from "../../shared/care-review-note-builder";

export const dogCareReviewAdditionalNotes: CareReviewAdditionalNote[] = [
  { title: [text("若家中已有其他狗狗——新成員引入與磨合")], summary: [text("引入第二隻犬時，現有的犬隻可能出現地盤防衛或攻擊行為，建議採取"), text("漸進式引入計畫", true), text("。")], content: [
    paragraph(text("引入第二隻犬時，現有的犬隻可能出現地盤防衛或攻擊行為，建議採取"), text("漸進式引入計畫", true), text("：")),
    item(text("先在"), text("中立場地", true), text("（如公園）讓雙方短暫接觸，觀察互動反應。")),
    item(text("回家後讓新舊成員"), text("分房生活一段時間", true), text("，透過交換睡墊或玩具"), text("熟悉彼此氣味", true), text("。")),
    item(text("在有人監督的情況下逐步縮短共處距離；若出現追咬或警告訊號，"), text("立即分隔", true), text("。")),
    item(text("多犬家庭需為每隻犬提供"), text("各自獨立的食水碗、床位與活動空間", true), text("，避免資源爭奪引發衝突。")),
    paragraph(text("若雙方長期無法適應，不可強迫共存。")),
  ] },
  { title: [text("若家中已有貓咪——犬貓跨物種共養")], summary: [text("犬隻的追逐本能可能嚇到貓咪甚至造成傷害。")], content: [paragraph(text("犬隻的追逐本能可能嚇到貓咪甚至造成傷害。建議先以"), text("隔門氣味交換", true), text("為起點，再逐步允許有人監督的短暫共處；確保貓咪有能主動躲避犬隻的"), text("高處或隱密空間", true), text("，讓牠隨時能脫離視線。"))] },
  { title: [text("幼犬的照護要求（⚠️ 新手請謹慎評估）")], summary: [text("幼犬的照護密度遠高於成犬，需要充裕時間配合。")], content: [
    paragraph(text("幼犬的照護密度遠高於成犬：")),
    item(text("**密集餵食與排泄協助**：幼犬腸胃容量小，每日需餵食 3–4 次；如廁訓練也需持續引導，初期事故頻繁屬正常現象，需要充裕時間配合。")),
    item(text("**3–14 週齡是社會化關鍵期**：這段期間接觸人類、聲音、其他動物與環境的正向經驗，深刻影響成年後的個性穩定度。社會化安排需依個體健康狀態進行，不可操之過急。")),
    item(text("**全日陪伴需求高**：幼犬白天獨處時間不宜過長，且需持續觀察健康狀況，若無法在這段時期提供充足陪伴，建議考慮迎接年齡稍大的犬隻。")),
  ] },
];
