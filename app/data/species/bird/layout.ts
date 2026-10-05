/** 鳥類房間場景的名牌位置；數值皆為房間場景百分比。 */
export const birdRoomDoorplatePlacement = {
  desktop: { x: 87, y: 16, width: 28 },
  mobile: { x: 33, y: 20, width: 40 },
  mobileText: { left: 4, top: 56, width: 95, height: 20, fontSize: 16 },
} as const;

/** 鳥籠內三根棲木分開定位；素材路徑由 assets.ts 提供。 */
export const birdPerchScenePlacements = [
  { id: "perch-1", placement: { x: 31, y: 31, width: 42, layer: 5 }, mobilePlacement: { x: 31, y: 31, width: 42 } },
  { id: "perch-2", placement: { x: 63, y: 51, width: 36, layer: 5 }, mobilePlacement: { x: 63, y: 51, width: 36 } },
  { id: "perch-3", placement: { x: 35, y: 72, width: 38, layer: 5 }, mobilePlacement: { x: 35, y: 72, width: 38 } },
] as const;

export const birdLayout = {
  roomDoorplatePlacement: birdRoomDoorplatePlacement,
  perchScenePlacements: birdPerchScenePlacements,
} as const;
