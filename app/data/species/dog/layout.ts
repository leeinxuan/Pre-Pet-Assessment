/**
 * 犬隻位置設定入口。
 * desktop 只影響桌機，mobile 只影響手機；物件座標請集中在此或 preparation 的每筆 placement。
 * 不要再透過 globals.css 覆寫個別物件位置。
 */
export const roomDoorplatePlacement = {
  // x / y / width 均為房間場景百分比；x 與 translateX(-50%) 對應門牌中心點。
  desktop: { x: 55, y: 16, width: 28 },
  mobile: { x: 33, y: 20, width: 40 },
  // mobileText 是門牌內名字文字的位置，基準是門牌圖片本身。
  mobileText: { left: 4, top: 56, width: 95, height: 20, fontSize: 16 },
} as const;

export const dogLayout = { roomDoorplatePlacement } as const;
