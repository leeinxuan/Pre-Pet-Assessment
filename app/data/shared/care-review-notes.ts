import type { SpeciesId } from "../shared/types";
import type { HomeReadinessTextBlock, HomeReadinessTextSegment } from "./home-readiness";

export type CareReviewAdditionalNote = {
  title: HomeReadinessTextSegment[];
  summary: HomeReadinessTextSegment[];
  content: HomeReadinessTextBlock[];
};

const text = (value: string, emphasis = false): HomeReadinessTextSegment => ({ text: value, ...(emphasis ? { emphasis } : {}) });
const paragraph = (...segments: HomeReadinessTextSegment[]): HomeReadinessTextBlock => ({ type: "paragraph", segments });
const item = (...segments: HomeReadinessTextSegment[]): HomeReadinessTextBlock => ({ type: "item", segments });

export const careReviewAdditionalNotes: Record<SpeciesId, CareReviewAdditionalNote[]> = {
  dog: [
    { title: [text("若家中已有其他狗狗——新成員引入與磨合")], summary: [text("引入第二隻犬時，現有的犬隻可能出現地盤防衛或攻擊行為，建議採取"), text("漸進式引入計畫", true), text("。")], content: [
      paragraph(text("引入第二隻犬時，現有的犬隻可能出現地盤防衛或攻擊行為，建議採取"), text("漸進式引入計畫", true), text("：")),
      item(text("先在"), text("中立場地", true), text("（如公園）讓雙方短暫接觸，觀察互動反應。")),
      item(text("回家後讓新舊成員"), text("分房生活一段時間", true), text("，透過交換睡墊或玩具"), text("熟悉彼此氣味", true), text("。")),
      item(text("在有人監督的情況下逐步縮短共處距離；若出現追咬或警告訊號，"), text("立即分隔", true), text("。")),
      item(text("多犬家庭需為每隻犬提供"), text("各自獨立的食水碗、床位與活動空間", true), text("，避免資源爭奪引發衝突。")),
      paragraph(text("若雙方長期無法適應，不可強迫共存。")),
    ] },
    { title: [text("若家中已有貓咪——犬貓跨物種共養")], summary: [text("犬隻的追逐本能可能嚇到貓咪甚至造成傷害。")], content: [
      paragraph(text("犬隻的追逐本能可能嚇到貓咪甚至造成傷害。建議先以"), text("隔門氣味交換", true), text("為起點，再逐步允許有人監督的短暫共處；確保貓咪有能主動躲避犬隻的"), text("高處或隱密空間", true), text("，讓牠隨時能脫離視線。")),
    ] },
    { title: [text("幼犬的照護要求（⚠️ 新手請謹慎評估）")], summary: [text("幼犬的照護密度遠高於成犬，需要充裕時間配合。")], content: [
      paragraph(text("幼犬的照護密度遠高於成犬：")),
      item(text("**密集餵食與排泄協助**：幼犬腸胃容量小，每日需餵食 3–4 次；如廁訓練也需持續引導，初期事故頻繁屬正常現象，需要充裕時間配合。")),
      item(text("**3–14 週齡是社會化關鍵期**：這段期間接觸人類、聲音、其他動物與環境的正向經驗，深刻影響成年後的個性穩定度。社會化安排需依個體健康狀態進行，不可操之過急。")),
      item(text("**全日陪伴需求高**：幼犬白天獨處時間不宜過長，且需持續觀察健康狀況，若無法在這段時期提供充足陪伴，建議考慮迎接年齡稍大的犬隻。")),
    ] },
  ],
  cat: [
    { title: [text("若家中已有其他貓咪——新成員引入與磨合（⚠️ 疾病傳染風險）")], summary: [text("貓咪領域性極強，引入新貓時需特別注意健康檢查與隔離。")], content: [
      paragraph(text("貓咪領域性極強，引入新貓時請注意：")),
      item(text("帶回新貓前，先至動物醫院進行健康檢查", true), text("，確認是否有"), text("貓白血病（FeLV）", true), text("或"), text("貓愛滋（FIV）", true), text("——這兩種疾病可透過打架、舔毛等直接接觸傳染給家中原有的貓咪。")),
      item(text("回家後先"), text("完全隔離", true), text("（建議至少一至兩週），讓新舊貓透過門縫或毛巾"), text("交換氣味", true), text("，再逐步縮短接觸距離。")),
      item(text("全程有人監督；出現哈氣、跳撲等警告訊號時立即分開。")),
      item(text("提供各自獨立的"), text("食器、飲水盆、貓砂盆、玩具與休息空間", true), text("——資源爭奪是衝突的主要來源。")),
      item(text("若雙方無法適應，不可勉強，以免影響生理或心理健康。")),
    ] },
    { title: [text("若家中已有其他動物（如犬）——跨物種共養")], summary: [text("貓咪與犬隻相處需要較長時間適應。")], content: [
      paragraph(text("貓咪與犬隻相處需要較長時間適應；確保貓咪有能"), text("主動躲避犬隻的高處或隱密空間", true), text("，讓牠隨時能脫離壓力情境。")),
    ] },
    { title: [text("幼貓的照護要求（⚠️ 尤其是哺乳期幼貓）")], summary: [text("幼貓的照護需求因月齡不同而差異極大。")], content: [
      paragraph(text("幼貓的照護需求因月齡不同而差異極大：")),
      item(text("**哺乳期（0–4 週）**：每 2–3 小時餵食一次（可使用幼貓專用代奶粉），且需飼主以衛生紙或棉花棒沾溫水**人工刺激排泄**——這是此時期幼貓無法自行完成的生理動作。全日密集陪護，不適合無充裕時間的飼主。")),
      item(text("**4 週後**：幼貓開始長牙，可逐步嘗試泡軟的幼貓專用乾飼料，糞便成形狀況也是健康指標之一。")),
      item(text("**早期社會化至關重要**：幼貓與母貓及人類的充分互動，是成年後個性穩定的基礎；若幼貓過早離開母貓，成年後更容易出現行為問題。")),
      item(text("**不建議過多零食**：幼貓階段避免養成依賴零食的習慣，以免影響均衡飲食。")),
    ] },
  ],
  rabbit: [
    { title: [text("若家中已有其他兔子——新成員引入與磨合")], summary: [text("兔子具有強烈的領域性，帶回新兔時請採取"), text("漸進式引入計畫", true), text("。")], content: [
      paragraph(text("兔子具有強烈的領域性，帶回新兔時請採取"), text("漸進式引入計畫", true), text("：")),
      item(text("先將新兔"), text("完全隔離", true), text("一段時間，確認健康狀況，並讓雙方透過"), text("交換睡墊", true), text("熟悉彼此氣味。")),
      item(text("在"), text("中立場地", true), text("（非任何一隻兔熟悉的空間）短暫接觸，觀察互動。")),
      item(text("全程監督，若出現追咬或激烈追趕，"), text("立即分開", true), text("。")),
      item(text("最合適的配對是已絕育的異性兔", true), text("；同性別兔（尤其未絕育的公兔）打架機率較高，若長期無法和平共處，應分籠飼養。")),
    ] },
    { title: [text("意外繁殖預防")], summary: [text("兔子繁殖能力極強，若同時飼養公母兔，強烈建議"), text("及早絕育", true), text("。")], content: [
      paragraph(text("兔子繁殖能力極強（一胎可達數隻，一年可繁殖多次）。若同時飼養公母兔，強烈建議"), text("及早絕育", true), text("（建議 4–5 月齡後由獸醫師評估）——不只能避免意外懷孕，也可預防母兔常見的"), text("子宮腫瘤", true), text("，並減少打架與噴尿行為。")),
    ] },
    { title: [text("幼兔的照護要求（⚠️ 免疫力低、需特別留意）")], summary: [text("幼兔依月齡不同，照護重點差異明顯。")], content: [
      paragraph(text("兔子依月齡不同，照護重點差異明顯：")),
      item(text("**幼兔期（斷奶後至 3 月齡）**：免疫力尚低，容易因飲食不當或環境變化而生病。主食以**高鈣牧草（如苜蓿草）**為主，補充骨骼與牙齒發育所需；若給予蔬菜，務必徹底清潔，出現腹瀉應盡速就醫。")),
      item(text("**成長期（3–6 月齡）**：部分兔子此時已達性成熟，**建議在 3–4 月齡起將公母兔分開飼養**，避免意外繁殖；4–5 月齡後可至動物醫院評估絕育時機。")),
      item(text("**早期社會化影響深遠**：幼年時期若缺乏與人類和其他動物的互動，成年後容易出現攻擊、害羞或難以適應新環境的行為，**建議從小溫和、耐心地讓幼兔習慣被觸摸與靠近**。")),
    ] },
  ],
  bird: [
    { title: [text("若家中已有其他鳥——新成員引入（⚠️ 病毒傳染風險）")], summary: [text("引入新鳥前，有一個非常重要的健康風險需要注意。")], content: [
      paragraph(text("引入新鳥前，有一個非常重要的健康風險需要注意：")),
      item(text("鸚形目常見的"), text("鸚鵡喙羽病（PBFD）", true), text("、"), text("小鸚哥病（APV）", true), text("與"), text("前胃擴張症（ABV）", true), text("，均為高傳染性、致命性疾病，可透過羽毛、排泄物或分泌物傳播。")),
      item(text("迎接新鳥回家前，應請獸醫師進行病毒 DNA 檢驗（血液或羽管），並採取預防性隔離飼養", true), text("；確認健康後才可與其他鳥接觸。")),
      item(text("引入後持續觀察雙方互動，若現有的鳥出現明顯壓力或領域防衛，應提供足夠的物理分隔空間。")),
    ] },
    { title: [text("繁殖管理")], summary: [text("鸚鵡若與伴侶鳥長期共居，可能出現"), text("發情與產卵", true), text("行為。")], content: [
      paragraph(text("鸚鵡若與伴侶鳥長期共居，可能出現"), text("發情與產卵", true), text("行為。產卵對雌鳥消耗大量鈣質，若未妥善管理可能危及健康（如"), text("難產、代謝性骨病", true), text("）。若無繁殖計畫，可透過減少光照（8 小時光照 / 16 小時黑暗）、移除巢箱、暫時隔離伴侶等方式"), text("抑制發情", true), text("，必要時諮詢獸醫師。")),
    ] },
    { title: [text("合籠訓練（漸進式接觸，勿貿然合籠）")], summary: [text("直接將兩隻鸚鵡放進同一個籠子，容易引發攻擊甚至重傷。")], content: [
      paragraph(text("鸚鵡族群內存在階級制度，直接將兩隻鸚鵡放進同一個籠子，很容易引發攻擊甚至重傷。正確的合籠流程應採**漸進式**：")),
      item(text("先將新鳥置於**獨立隔離籠**進行健康觀察（至少兩週），確認無傳染性疾病。")),
      item(text("將兩個籠子**並排放置**但不接觸，讓雙方透過籠間距離熟悉彼此氣味與存在。")),
      item(text("在籠外**中立空間**（雙方都不熟悉的地點）讓牠們短暫接觸，觀察行為是否和善。")),
      item(text("確認互動穩定無衝突後，才可嘗試合籠——並在旁監看至少數小時。")),
      paragraph(text("不同物種因體型、喙力與行為模式差異大，即使看似相處和平，仍可能突然發生傷害事故。")),
    ] },
    { title: [text("不同物種切莫直接混養")], summary: [text("不同種類的鳥不應直接混養。")], content: [
      paragraph(text("不同種類的鳥在體型、喙力、資源需求、行為模式與環境適應能力上差異極大，即使外表看起來溫和，混養仍可能導致弱勢個體受傷或長期壓力。**不同物種不應直接混養**——若家中已有鳥，引入其他物種前應充分了解雙方習性，並做好永久分籠的準備。即使是同物種個體，引入新成員也需遵循漸進式合籠流程（見上）。")),
    ] },
    { title: [text("新手不適合飼養雛鳥")], summary: [text("不需要從雛鳥開始，一樣能建立深厚情感。")], content: [
      paragraph(text("攀禽（鸚鵡類）的雛鳥屬**晚熟型**，出生後無法獨立進食，人工養育需具備：嫻熟的**軟管餵食技術**、24 小時穩定的**保溫環境**、每隔數小時**定時刺激排泄**——任一環節失誤都可能危及雛鳥生命，**極不建議新手嘗試**。")),
      paragraph(text("好消息是：**不需要從雛鳥開始，一樣能建立深厚情感**。待鳥能獨立生活後再帶回，透過日常互動同樣可以建立穩固信任，不需倚仗印痕作用（imprinting）。挑選友善環境繁育、已斷奶的幼鳥或成鳥，對新手而言是更安全、成功率更高的選擇。")),
    ] },
  ],
  hamster: [
    { title: [text("夜間滾輪聲響——{petName}最活躍的時候正是你熟睡時")], summary: [text("倉鼠在夜間到清晨最為活躍，滾輪轉動聲可能成為輕眠飼主的困擾。")], content: [paragraph(text("倉鼠在夜間到清晨最為活躍，滾輪轉動聲可能成為輕眠飼主的困擾。解決方式包括：選用"), text("靜音滾輪", true), text("（軸承型金屬滾輪）、確認滾輪底座穩固不滑動、或將籠具移至通風良好但隔音效果較佳的房間角落。"), text("不應因此移除滾輪", true), text("——那對倉鼠的身心健康至關重要。若夜間完全沒有任何活動聲音，反而是需要留意的健康訊號。"))] },
    { title: [text("合籠前必須了解的品系差異——{petName}需要自己的空間嗎？")], summary: [text("許多飼主想讓倉鼠「有伴」，但倉鼠的社交模式因品系而異，不可一概而論。")], content: [paragraph(text("許多飼主想讓倉鼠「有伴」，但倉鼠的社交模式因品系而異，不可一概而論。"), text("黃金鼠（敘利亞倉鼠）", true), text("有強烈領域性，成年後獨居是最安全的飼養方式，強行合籠可能導致嚴重打鬥甚至死亡；部分"), text("侏儒倉鼠品系", true), text("相對可接受同性同伴，但仍需採漸進式引入，並隨時準備隔離。確認{petName}的品系是合籠決策的第一步，若不確定，獸醫師或有經驗的飼主是最好的諮詢對象。"))] },
    { title: [text("適應新環境需要時間——搬家或籠具更換後請耐心等待")], summary: [text("環境驟變可能讓{petName}出現緊迫反應。")], content: [paragraph(text("倉鼠以氣味作為辨認安全領域的主要依據，環境驟變（搬家、全面更換墊料、換新籠具）可能讓{petName}出現緊迫反應，如躲藏不出、進食量短暫下降。因應方式：搬遷時保留舊巢箱或部分舊墊料，讓熟悉的氣味幫助{petName}安心；全面清潔籠具時保留一小塊舊墊料置於巢箱中；新環境下的前三天盡量維持原有餵食時間與互動習慣。"))] },
  ],
};

export function getCareReviewAdditionalNotes(species: string): CareReviewAdditionalNote[] {
  if (species === "cat") return careReviewAdditionalNotes.cat;
  if (species === "rabbit") return careReviewAdditionalNotes.rabbit;
  if (species === "bird") return careReviewAdditionalNotes.bird;
  if (species === "hamster") return careReviewAdditionalNotes.hamster;
  return careReviewAdditionalNotes.dog;
}
