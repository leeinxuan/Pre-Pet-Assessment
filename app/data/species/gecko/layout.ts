/**
 * 守宮房間場景的名牌位置；數值皆為房間場景百分比。
 * desktop 與 mobile 可各自調整，不會影響其他物種。
 */
export const geckoRoomDoorplatePlacement = {
  desktop: { x: 87, y: 16, width: 28 },
  mobile: { x: 33, y: 20, width: 40 },
  mobileText: { left: 4, top: 56, width: 95, height: 20, fontSize: 16 },
} as const;

export const geckoLayout = { roomDoorplatePlacement: geckoRoomDoorplatePlacement } as const;
