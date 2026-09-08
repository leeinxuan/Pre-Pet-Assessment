/**
 * 犬隻位置設定入口。
 * desktop 只影響桌機，mobile 只影響手機；物件座標請集中在此或 preparation 的每筆 placement。
 * 不要再透過 globals.css 覆寫個別物件位置。
 */
export const roomDoorplatePlacement = {
  mobile: { x: 33, y: 20, width: 40 },
  // mobileText 是門牌內名字文字的位置，基準是門牌圖片本身。
  mobileText: { left: 4, top: 56, width: 95, height: 20, fontSize: 16 },
} as const;

export const arrivalMealMobilePlacements = {
  dog: { left: 32, bottom: 10, width: 50, maxHeight: 58 },
  water: { left: 10, bottom: 10, width: 24 },
  food: { left: 28, bottom: 5, width: 24 },
} as const;

export const dogLayout = { roomDoorplatePlacement, arrivalMealMobilePlacements } as const;
