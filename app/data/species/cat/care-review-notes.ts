import type { CareReviewAdditionalNote } from "../../shared/care-review-note-types";
import { item, paragraph, text } from "../../shared/care-review-note-builder";

export const catCareReviewAdditionalNotes: CareReviewAdditionalNote[] = [
  { title: [text("若家中已有其他貓咪——新成員引入與磨合（⚠️ 疾病傳染風險）")], summary: [text("貓咪領域性極強，引入新貓時需特別注意健康檢查與隔離。")], content: [
    paragraph(text("貓咪領域性極強，引入新貓時請注意：")),
    item(text("帶回新貓前，先至動物醫院進行健康檢查", true), text("，確認是否有"), text("貓白血病（FeLV）", true), text("或"), text("貓愛滋（FIV）", true), text("——這兩種疾病可透過打架、舔毛等直接接觸傳染給家中原有的貓咪。")),
    item(text("回家後先"), text("完全隔離", true), text("（建議至少一至兩週），讓新舊貓透過門縫或毛巾"), text("交換氣味", true), text("，再逐步縮短接觸距離。")),
    item(text("全程有人監督；出現哈氣、跳撲等警告訊號時立即分開。")),
    item(text("提供各自獨立的"), text("食器、飲水盆、貓砂盆、玩具與休息空間", true), text("——資源爭奪是衝突的主要來源。")),
    item(text("若雙方無法適應，不可勉強，以免影響生理或心理健康。")),
  ] },
  { title: [text("若家中已有其他動物（如犬）——跨物種共養")], summary: [text("貓咪與犬隻相處需要較長時間適應。")], content: [paragraph(text("貓咪與犬隻相處需要較長時間適應；確保貓咪有能"), text("主動躲避犬隻的高處或隱密空間", true), text("，讓牠隨時能脫離壓力情境。"))] },
  { title: [text("幼貓的照護要求（⚠️ 尤其是哺乳期幼貓）")], summary: [text("幼貓的照護需求因月齡不同而差異極大。")], content: [
    paragraph(text("幼貓的照護需求因月齡不同而差異極大：")),
    item(text("**哺乳期（0–4 週）**：每 2–3 小時餵食一次（可使用幼貓專用代奶粉），且需飼主以衛生紙或棉花棒沾溫水**人工刺激排泄**——這是此時期幼貓無法自行完成的生理動作。全日密集陪護，不適合無充裕時間的飼主。")),
    item(text("**4 週後**：幼貓開始長牙，可逐步嘗試泡軟的幼貓專用乾飼料，糞便成形狀況也是健康指標之一。")),
    item(text("**早期社會化至關重要**：幼貓與母貓及人類的充分互動，是成年後個性穩定的基礎；若幼貓過早離開母貓，成年後更容易出現行為問題。")),
    item(text("**不建議過多零食**：幼貓階段避免養成依賴零食的習慣，以免影響均衡飲食。")),
  ] },
];
