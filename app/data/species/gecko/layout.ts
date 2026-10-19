/**
 * 守宮房間場景的名牌位置；數值皆為房間場景百分比。
 * desktop 與 mobile 可各自調整，不會影響其他物種。
 */
export const geckoRoomDoorplatePlacement = {
  desktop: { x: 60, y: 14, width: 28 },
  mobile: { x: 33, y: 20, width: 40 },
  mobileText: { left: 4, top: 56, width: 95, height: 20, fontSize: 16 },
} as const;

/**
 * 場景內的雙溫濕度計由同一件用品產生；兩個位置仍可分別調整。
 */
export const geckoThermometerSceneParts = {
  cool: {
    id: "cool-side",
    placement: { x: 22, y: 13, width: 23, layer: 6 },
    mobilePlacement: { x: 18, y: 32, width: 16 },
  },
  warm: {
    id: "warm-side",
    placement: { x: 77, y: 91, width: 23, layer: 6 },
    mobilePlacement: { x: 78, y: 32, width: 16 },
  },
} as const;

export const geckoLayout = {
  roomDoorplatePlacement: geckoRoomDoorplatePlacement,
  thermometerSceneParts: geckoThermometerSceneParts,
} as const;
