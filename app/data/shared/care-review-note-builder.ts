import type { HomeReadinessTextBlock, HomeReadinessTextSegment } from "./home-readiness-types";

export const text = (value: string, emphasis = false): HomeReadinessTextSegment => ({ text: value, ...(emphasis ? { emphasis } : {}) });
export const paragraph = (...segments: HomeReadinessTextSegment[]): HomeReadinessTextBlock => ({ type: "paragraph", segments });
export const item = (...segments: HomeReadinessTextSegment[]): HomeReadinessTextBlock => ({ type: "item", segments });
