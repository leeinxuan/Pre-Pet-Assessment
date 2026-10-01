import type { SpeciesId } from "../shared/types";

export type HomeReadinessTextSegment = { text: string; emphasis?: boolean };
export type HomeReadinessTextBlock = {
  type: "paragraph" | "item";
  segments: HomeReadinessTextSegment[];
};

export type HomeReadinessHousingChoice = {
  id: "owner" | "renter";
  label: string;
  followUpTitle: string;
  followUpContent: HomeReadinessTextBlock[];
  reviewSummary: HomeReadinessTextSegment[];
  nextQuestionId: "household-consent";
};

export type HomeReadinessCard = {
  id: "household-consent" | "allergy-check" | "future-changes";
  stepLabel: string;
  title: HomeReadinessTextSegment[];
  body: HomeReadinessTextBlock[];
};

export type HomeReadinessConfig = {
  id: "home-readiness";
  stageId: "home-readiness";
  order: 1;
  summaryCategory: "home-readiness";
  housingChoices: HomeReadinessHousingChoice[];
  cards: HomeReadinessCard[];
  completionMessage: HomeReadinessTextSegment[];
  reviewSummary: HomeReadinessTextSegment[];
  pendingReviewSummary: HomeReadinessTextSegment[];
};

const text = (value: string, emphasis = false): HomeReadinessTextSegment => ({ text: value, ...(emphasis ? { emphasis } : {}) });
const item = (...segments: HomeReadinessTextSegment[]): HomeReadinessTextBlock => ({ type: "item", segments });
const paragraph = (...segments: HomeReadinessTextSegment[]): HomeReadinessTextBlock => ({ type: "paragraph", segments });

const sharedCards = (allergyAnimal: string, dailyTraits: string, allergenSource: string, cleaningAction: string): HomeReadinessCard[] => [
  {
    id: "household-consent",
    stepLabel: "家人都同意嗎？",
    title: [text("同住家人或室友是否 "), text("100% 同意", true), text("飼養？")],
    body: [paragraph(
      text("{petName} 的日常"), text(dailyTraits, true), text("（夜間活動、叫聲等）會影響每一位同住者。若有人反對，可能在飼主不在時對寵物產生排斥，也可能讓"), text("照護責任落在不願承擔的人身上", true), text("。請在領養前與所有同住者"), text("充分溝通", true), text("，達成"), text("真正的共識", true), text("。"),
    )],
  },
  {
    id: "allergy-check",
    stepLabel: "過敏準備好了嗎？",
    title: [text(`同住者是否有人對${allergyAnimal}`), text("過敏", true), text("？")],
    body: [paragraph(
      text(`${allergenSource}是常見的`), text("過敏原", true), text("，有過敏體質的人應在飼養前"), text("謹慎評估", true), text("，切勿衝動飼養。若飼養後才出現過敏反應，可透過"), text(cleaningAction, true), text("來降低過敏原，但"), text("不應因此棄養", true), text("。若有疑慮，建議先"), text("諮詢醫師", true), text("。"),
    )],
  },
  {
    id: "future-changes",
    stepLabel: "未來也能堅持嗎？",
    title: [text("若未來"), text("懷孕、生子", true), text("，或"), text("長輩施壓", true), text("，你能否堅定不棄養？")],
    body: [paragraph(
      text("許多動物在主人"), text("懷孕或新生兒到來", true), text("時遭到棄養。在"), text("醫師指導", true), text("下維持適當清潔，與寵物共存通常是可行的。長輩或伴侶的施壓是"), text("常見考驗", true), text("——請在飼養前就與家人"), text("充分溝通", true), text("，讓這份承諾是"), text("全家一起做出的決定", true), text("。"),
    )],
  },
];

const ownerChoices: Record<SpeciesId, HomeReadinessHousingChoice> = {
  dog: {
    id: "owner", label: "我住在自有住宅", followUpTitle: "自有住宅提醒", nextQuestionId: "household-consent",
    followUpContent: [
      item(text("社區或公寓管委會可能有"), text("寵物相關規定", true), text("（如禁止進出公共空間、寵物體重上限、須繫牽繩等），請事先確認，避免日後糾紛。")),
      item(text("若住在公寓或大廈，留意"), text("電梯與公共走道的禮節", true), text("，部分社區規定寵物需以提籠或牽繩管束方可進入公共區域。")),
      item(text("評估居住空間是否有"), text("足夠空間", true), text("讓狗狗自由活動；長期空間不足可能引發焦慮或破壞行為。")),
    ],
    reviewSummary: [text("已確認住處規範、"), text("足夠活動空間", true), text("與地板安全。")],
  },
  cat: {
    id: "owner", label: "我住在自有住宅", followUpTitle: "自有住宅提醒", nextQuestionId: "household-consent",
    followUpContent: [
      item(text("社區或公寓管委會可能有"), text("寵物相關規定", true), text("（如禁止進出公共空間、寵物體重上限、須繫牽繩等），請事先確認，避免日後糾紛。")),
      item(text("即使是自有住宅，貓咪在"), text("發情期的夜間嚎叫", true), text("聲量可能影響鄰居；若飼養未結紮的貓，請及早安排"), text("結紮手術", true), text("，並評估周遭鄰居關係。")),
      item(text("若住在公寓或大廈，留意"), text("電梯與公共走道的禮節", true), text("，並確認門窗防逃設施完善，避免貓咪進入公共區域引發糾紛。")),
    ],
    reviewSummary: [text("已確認住處規範、鄰里影響與"), text("門窗防逃設施", true), text("。")],
  },
  rabbit: {
    id: "owner", label: "我住在自有住宅", followUpTitle: "自有住宅提醒", nextQuestionId: "household-consent",
    followUpContent: [
      item(text("社區或公寓管委會可能有"), text("寵物相關規定", true), text("，請事先確認；兔子雖安靜，但部分社區對室內飼養寵物仍有規範，避免日後糾紛。")),
      item(text("兔子"), text("不發出明顯叫聲", true), text("，但代謝旺盛、排泄頻繁，氣味管理是主要課題；請評估通風條件與清潔動線，確保居家環境舒適。")),
      item(text("評估居住空間是否有"), text("足夠空間", true), text("供兔子在圍欄內自由活動；長期缺乏活動空間可能影響兔子的腸道蠕動與骨骼健康。")),
    ],
    reviewSummary: [text("已確認住處規範與"), text("安全圍欄內每日自由活動", true), text("的空間。")],
  },
  bird: {
    id: "owner", label: "我住在自有住宅", followUpTitle: "自有住宅提醒", nextQuestionId: "household-consent",
    followUpContent: [
      item(text("社區或公寓管委會可能有"), text("寵物相關規定", true), text("，請事先確認，避免日後糾紛。")),
      item(text("鸚鵡的"), text("鳴叫聲量相當大", true), text("，在公寓住宅中極易影響鄰居，甚至引發抗議或糾紛；這是飼養鸚鵡前"), text("最重要的現實考量之一", true), text("，請誠實評估你的居住環境與鄰居關係。")),
      item(text("若住在公寓，建議事先與鄰居溝通，並了解可能的"), text("隔音措施", true), text("（如加裝隔音窗簾等），以降低鄰里衝突的風險。")),
    ],
    reviewSummary: [text("已確認住處規範、"), text("鳴叫聲量", true), text("與鄰里關係。")],
  },
};

const renterChoices: Record<SpeciesId, HomeReadinessHousingChoice> = {
  dog: {
    id: "renter", label: "我是租屋族", followUpTitle: "租屋提醒", nextQuestionId: "household-consent",
    followUpContent: [
      item(text("房東是否已"), text("書面", true), text("同意飼養？口頭同意在換房東或房客搬遷時可能無法保障。")),
      item(text("台灣「可寵租屋」比例較低，若未來因故需要搬家，找尋寵物友善住宅的難度相對較高——請提前評估。")),
      item(text("評估租屋空間是否有"), text("足夠空間", true), text("讓狗狗自由活動；長期空間不足可能引發焦慮或破壞行為。")),
    ],
    reviewSummary: [text("已確認"), text("房東書面同意", true), text("、足夠活動空間與地板安全。")],
  },
  cat: {
    id: "renter", label: "我是租屋族", followUpTitle: "租屋提醒", nextQuestionId: "household-consent",
    followUpContent: [
      item(text("房東是否已"), text("書面", true), text("同意飼養？口頭同意在換房東或房客搬遷時可能無法保障。")),
      item(text("台灣「可寵租屋」比例較低，若未來因故需要搬家，找尋寵物友善住宅的難度相對較高——請提前評估。")),
      item(text("評估租屋空間是否有"), text("足夠空間", true), text("讓貓咪自由活動，並確認門窗能否加裝"), text("防逃設施", true), text("（貓網、窗扣），避免貓咪外逃。")),
    ],
    reviewSummary: [text("已確認"), text("房東書面同意", true), text("與未來搬遷時的照顧安排。")],
  },
  rabbit: {
    id: "renter", label: "我是租屋族", followUpTitle: "租屋提醒", nextQuestionId: "household-consent",
    followUpContent: [
      item(text("房東是否已"), text("書面", true), text("同意飼養？口頭同意在換房東或房客搬遷時可能無法保障。")),
      item(text("台灣「可寵租屋」比例較低，若未來因故需要搬家，找尋寵物友善住宅的難度相對較高——請提前評估。")),
      item(text("評估租屋空間是否有"), text("足夠空間", true), text("讓兔子在圍欄內自由活動；長期缺乏活動空間可能影響兔子的腸道蠕動與骨骼健康。")),
    ],
    reviewSummary: [text("已確認"), text("房東書面同意", true), text("與未來搬遷時的照顧安排。")],
  },
  bird: {
    id: "renter", label: "我是租屋族", followUpTitle: "租屋提醒", nextQuestionId: "household-consent",
    followUpContent: [
      item(text("房東是否已"), text("書面", true), text("同意飼養？口頭同意在換房東或房客搬遷時可能無法保障。")),
      item(text("台灣「可寵租屋」比例較低，若未來因故需要搬家，找尋寵物友善住宅的難度相對較高——請提前評估。")),
      item(text("評估租屋空間是否適合鳥籠擺放（充足"), text("通風", true), text("與"), text("自然光線", true), text("）；若飼養鸚鵡，請確認鳴叫噪音不會引發房東或鄰居抗議。")),
    ],
    reviewSummary: [text("已確認"), text("房東書面同意", true), text("與未來搬遷時的照顧安排。")],
  },
};

const completionMessage = [text("讓這份承諾是"), text("全家一起做出的決定", true), text("。")];

export const homeReadinessBySpecies: Record<SpeciesId, HomeReadinessConfig> = {
  dog: { id: "home-readiness", stageId: "home-readiness", order: 1, summaryCategory: "home-readiness", housingChoices: [ownerChoices.dog, renterChoices.dog], cards: sharedCards("犬類毛髮或皮屑", "氣味、毛髮、作息", "動物毛髮及皮屑", "加強環境清潔、定期梳毛"), completionMessage, reviewSummary: [text("確認居住規範、同住者共識與環境是否適合狗狗。")], pendingReviewSummary: [text("帶牠回家前，請先確認住處規範、同住者共識與生活空間是否適合。")], },
  cat: { id: "home-readiness", stageId: "home-readiness", order: 1, summaryCategory: "home-readiness", housingChoices: [ownerChoices.cat, renterChoices.cat], cards: sharedCards("貓咪毛髮或皮屑", "氣味、毛髮、作息", "動物毛髮及皮屑", "加強環境清潔、定期梳毛"), completionMessage, reviewSummary: [text("確認居住規範、同住者共識與安全防逃環境。")], pendingReviewSummary: [text("帶牠回家前，請先確認住處規範、同住者共識與生活空間是否適合。")], },
  rabbit: { id: "home-readiness", stageId: "home-readiness", order: 1, summaryCategory: "home-readiness", housingChoices: [ownerChoices.rabbit, renterChoices.rabbit], cards: sharedCards("兔兔毛髮或皮屑", "氣味、毛髮、作息", "動物毛髮及皮屑", "加強環境清潔、定期梳毛"), completionMessage, reviewSummary: [text("確認居住規範、同住者共識與安全活動空間。")], pendingReviewSummary: [text("帶牠回家前，請先確認住處規範、同住者共識與生活空間是否適合。")], },
  bird: { id: "home-readiness", stageId: "home-readiness", order: 1, summaryCategory: "home-readiness", housingChoices: [ownerChoices.bird, renterChoices.bird], cards: sharedCards("鳥類羽毛或皮屑", "氣味、羽屑、作息", "鳥類羽毛及皮屑", "加強環境清潔、定期清理羽屑"), completionMessage, reviewSummary: [text("確認居住規範、同住者共識與鳴叫聲量的現實影響。")], pendingReviewSummary: [text("帶牠回家前，請先確認住處規範、同住者共識與生活空間是否適合。")], },
};

export function getHomeReadinessConfig(species: string): HomeReadinessConfig {
  if (species === "cat") return homeReadinessBySpecies.cat;
  if (species === "rabbit") return homeReadinessBySpecies.rabbit;
  if (species === "bird") return homeReadinessBySpecies.bird;
  return homeReadinessBySpecies.dog;
}
