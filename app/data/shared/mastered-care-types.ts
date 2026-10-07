export type MasteredCareSource =
  | { kind: "home-readiness" }
  | { kind: "room-preparation" }
  | { kind: "trunk-preparation" }
  | { kind: "arrival-meal" }
  | { kind: "scenario"; scenarioIds: readonly string[] }
  | { kind: "life-state"; key: "walkingComplete" | "cat-litter-complete" | "rabbit-grooming-complete" | "bird-cage-inspection-complete" | "hamster-inspection-complete"; requiredStepIds?: readonly string[] };

export type MasteredCareTheme = {
  id: string;
  title: string;
  summary: string;
  order: number;
  sources: readonly MasteredCareSource[];
};
