import type { HomeReadinessCard, HomeReadinessHousingChoice } from "../../shared/home-readiness-types";
import { createHomeReadinessConfig, item, paragraph, text } from "../../shared/home-readiness-builder";

const housingChoices: HomeReadinessHousingChoice[] = [
  {
    id: "owner", label: "我住在自有住宅", nextQuestionId: "household-consent", followUpTitle: "自有住宅提醒",
    followUpContent: [
      item(text("社區或公寓管委會可能有"), text("寵物相關規定", true), text("（如禁止進出公共空間、寵物體重上限、須繫牽繩等），請事先確認，避免日後糾紛。")),
      item(text("確認住家溫度環境適合守宮飼養（環境溫度不低於 18°C）；並確認飼養空間"), text("防逃措施", true), text("（爬蟲缸蓋緊固、空間無縫隙）——守宮逃脫後極難尋回。")),
      item(text("了解住家附近是否有合格的"), text("非犬貓動物醫院", true), text("，並提前建立"), text("動物醫院口袋名單", true), text("（24 小時急診、就近可達、平時信任的動物醫院）。")),
    ],
    reviewSummary: [text("已確認住處規範、溫控條件與"), text("防逃措施", true), text("，以及住家附近"), text("熟悉爬蟲類醫療的動物醫院口袋名單", true), text("（含 24 小時急診）。")],
  },
  {
    id: "renter", label: "我是租屋族", nextQuestionId: "household-consent", followUpTitle: "租屋提醒",
    followUpContent: [
      item(text("房東是否已"), text("書面", true), text("同意飼養？口頭同意在發生爭議事件時較無保障。")),
      item(text("台灣「寵物友善租屋」比例較低，若未來因故需要搬家，找尋寵物友善住宅的難度相對較高——請提前評估。")),
      item(text("確認租屋允許放置爬蟲缸；守宮雖無叫聲，但活體昆蟲飼料（蟋蟀）有聲音與氣味；並確認"), text("防逃措施", true), text("（缸蓋緊固、空間無縫隙）——守宮逃脫後極難尋回。")),
      item(text("了解住家附近是否有合格的"), text("非犬貓動物醫院", true), text("，並提前建立"), text("動物醫院口袋名單", true), text("（24 小時急診、就近可達、平時信任的動物醫院）。")),
    ],
    reviewSummary: [text("已確認"), text("房東書面同意", true), text("、穩定電力與爬蟲缸擺放條件，以及住家附近"), text("熟悉爬蟲類醫療的動物醫院口袋名單", true), text("（含 24 小時急診）。")],
  },
];

const cards: HomeReadinessCard[] = [
  {
    id: "household-consent", stepLabel: "同住者共識", title: [text("同住家人或室友是否 "), text("100% 同意", true), text("飼養？")],
    body: [paragraph(text("{petName} 的日常"), text("爬蟲缸器材聲音（加熱片運作聲）、活體昆蟲飼料、夜行性作息", true), text("會影響每一位同住者。若有人反對，可能在飼主不在時對寵物產生排斥，也可能讓"), text("照護責任落在不願承擔的人身上", true), text("。請在飼養前與所有同住者"), text("充分溝通", true), text("，達成"), text("真正的共識", true), text("。"))],
  },
  {
    id: "allergy-check", stepLabel: "爬蟲接受度", title: [text("同住者是否"), text("能接受爬蟲動物", true), text("同住在家中？")],
    body: [paragraph(text("爬蟲類對部分人而言在心理上存在排斥感——無論是守宮本身的外觀，還是需要準備"), text("活體昆蟲飼料", true), text("（蟋蟀、麵包蟲等）。若同住者對爬蟲有強烈排斥感，可能在日常生活中產生摩擦，甚至影響守宮的照護品質。請在飼養前"), text("充分溝通", true), text("，確認所有同住者都能接受與守宮共同生活。"))],
  },
  {
    id: "future-changes", stepLabel: "未來生活變化", title: [text("生涯規劃中可能出現的"), text("生活變化", true), text("，你提前想過了嗎？")],
    body: [paragraph(text("棄養往往源於生活改變——"), text("新生兒到來", true), text("、"), text("因求學或工作移居外地甚至海外", true), text("、"), text("生活型態改變後可支配時間減少", true), text("，都是常見考驗。請在飼養前提前評估生涯規劃，讓這份承諾是全家"), text("想清楚後共同做出的決定", true), text("。"))],
  },
];

export const geckoHomeReadiness = createHomeReadinessConfig({
  housingChoices,
  cards,
  reviewSummary: [text("確認住家溫控條件、防逃設施與同住者共識，評估是否做好迎接守宮的準備。")],
  pendingReviewSummary: [text("確認住家溫控條件、防逃設施與同住者共識，評估是否做好迎接守宮的準備。")],
});
