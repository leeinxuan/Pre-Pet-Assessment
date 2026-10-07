import type { MasteredCareTheme } from "./mastered-care-types";

export function preparationThemes(copy: { home: string; room: string; trunk: string }): MasteredCareTheme[] {
  return [
    { id: "home-readiness", title: "居住環境確認", summary: copy.home, order: 10, sources: [{ kind: "home-readiness" }] },
    { id: "safe-room", title: "安全空間佈置", summary: copy.room, order: 20, sources: [{ kind: "room-preparation" }] },
    { id: "departure-preparation", title: "出發前整備", summary: copy.trunk, order: 30, sources: [{ kind: "trunk-preparation" }] },
  ];
}
