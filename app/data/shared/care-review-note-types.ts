import type { HomeReadinessTextBlock, HomeReadinessTextSegment } from "./home-readiness-types";

export type CareReviewAdditionalNote = {
  title: HomeReadinessTextSegment[];
  summary: HomeReadinessTextSegment[];
  content: HomeReadinessTextBlock[];
};
