/** 鳥類房間場景的名牌位置；數值皆為房間場景百分比。 */
export const birdRoomDoorplatePlacement = {
  desktop: { x: 87, y: 16, width: 28 },
  mobile: { x: 33, y: 20, width: 40 },
  mobileText: { left: 4, top: 56, width: 95, height: 20, fontSize: 16 },
} as const;

export const birdLayout = { roomDoorplatePlacement: birdRoomDoorplatePlacement } as const;
