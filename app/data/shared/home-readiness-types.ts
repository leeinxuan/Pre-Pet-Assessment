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
