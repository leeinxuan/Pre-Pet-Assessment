import type { CareReviewAdditionalNote } from "../../shared/care-review-note-types";
import { item, paragraph, text } from "../../shared/care-review-note-builder";

export const rabbitCareReviewAdditionalNotes: CareReviewAdditionalNote[] = [
  { title: [text("若家中已有其他兔子——新成員引入與磨合")], summary: [text("兔子具有強烈的領域性，帶回新兔時請採取"), text("漸進式引入計畫", true), text("。")], content: [
    paragraph(text("兔子具有強烈的領域性，帶回新兔時請採取"), text("漸進式引入計畫", true), text("：")),
    item(text("先將新兔"), text("完全隔離", true), text("一段時間，確認健康狀況，並讓雙方透過"), text("交換睡墊", true), text("熟悉彼此氣味。")),
    item(text("在"), text("中立場地", true), text("（非任何一隻兔熟悉的空間）短暫接觸，觀察互動。")),
    item(text("全程監督，若出現追咬或激烈追趕，"), text("立即分開", true), text("。")),
    item(text("最合適的配對是已絕育的異性兔", true), text("；同性別兔（尤其未絕育的公兔）打架機率較高，若長期無法和平共處，應分籠飼養。")),
  ] },
  { title: [text("意外繁殖預防")], summary: [text("兔子繁殖能力極強，若同時飼養公母兔，強烈建議"), text("及早絕育", true), text("。")], content: [paragraph(text("兔子繁殖能力極強（一胎可達數隻，一年可繁殖多次）。若同時飼養公母兔，強烈建議"), text("及早絕育", true), text("（建議 4–5 月齡後由獸醫師評估）——不只能避免意外懷孕，也可預防母兔常見的"), text("子宮腫瘤", true), text("，並減少打架與噴尿行為。"))] },
  { title: [text("幼兔的照護要求（⚠️ 免疫力低、需特別留意）")], summary: [text("幼兔依月齡不同，照護重點差異明顯。")], content: [
    paragraph(text("兔子依月齡不同，照護重點差異明顯：")),
    item(text("**幼兔期（斷奶後至 3 月齡）**：免疫力尚低，容易因飲食不當或環境變化而生病。主食以**高鈣牧草（如苜蓿草）**為主，補充骨骼與牙齒發育所需；若給予蔬菜，務必徹底清潔，出現腹瀉應盡速就醫。")),
    item(text("**成長期（3–6 月齡）**：部分兔子此時已達性成熟，**建議在 3–4 月齡起將公母兔分開飼養**，避免意外繁殖；4–5 月齡後可至動物醫院評估絕育時機。")),
    item(text("**早期社會化影響深遠**：幼年時期若缺乏與人類和其他動物的互動，成年後容易出現攻擊、害羞或難以適應新環境的行為，**建議從小溫和、耐心地讓幼兔習慣被觸摸與靠近**。")),
  ] },
];
