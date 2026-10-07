import type { HazardItem, RoomItem, TrunkItem } from "../../game-types";

export type SpeciesCopy = {
  animalName: string; animalNameFallback: string; typeLabel: string;
  selectionTitle: string; breedTitle: string; nameTitle: string; namePlaceholder: string;
  historyTitle: string; historyBody: string; hasPreviousLabel: string; noPreviousLabel: string; previousSectionTitle: string;
  roomTitle: string; roomBody: (petName: string) => string;
  departureTitle: string; departureBody: (petName: string) => string;
  lifeChallengeLabel: (selectedLabel: string) => string;
};

export type SpeciesReportConfig = {
  checklistGroups: Array<{ title: string; items: string[] }>;
  handlingRows: Array<[string, string]>;
  dailyCareTime: string; dailyCareTimeNote: string;
  dailyCareBreakdown: Array<{ title: string; detail: string }>;
};

export type InteractionCompletionContent = {
  title: string; subtitle: string; description: string; reflectionTitle: string; reflectionContent: string[];
  careTimeTitle: string; careTimeItems: Array<{ title: string; detail: string }>;
  careTimeSupplement?: { title: string; items: Array<{ title: string; detail: string; description: string }> };
  continueLabel: string;
};

export type RoomFlowConfig = {
  initialBackground: string; safeBackground: string; interiorBackground: string; interiorSafeBackground: string;
  interiorBackgroundAspectRatio?: "match-room" | string; floorHazardId: string; safeWhenAllHazards?: boolean;
  fenceItemId: string; interiorItemId: string; outsideItemIds?: string[]; entryRequiredItemIds?: string[];
  floorHotspot: { desktop: { x: number; y: number; width: number; height: number }; mobile: { x: number; y: number; width: number; height: number } };
  copy: { fenceInstruction: string; fencePlacedInstruction: string; entryReadyInstruction?: string; interiorInstruction: string; hazardInstruction?: string; lockedInstruction?: string; entryLabel?: string };
};

export type SpeciesGameConfig = {
  id: "dog" | "cat" | "rabbit" | "bird" | "hamster";
  copy: SpeciesCopy; roomItems: RoomItem[]; hazards: HazardItem[]; trunkItems: TrunkItem[]; report: SpeciesReportConfig; roomFlow?: RoomFlowConfig;
};
