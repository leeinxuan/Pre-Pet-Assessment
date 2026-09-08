/**
 * 貓咪位置設定入口。
 * desktop 只影響桌機，mobile 只影響手機；可直接調整每筆資料的 placement / mobilePlacement。
 * 不要再透過 globals.css 覆寫個別物件位置。
 */
export const catRoomPlacements = {
  "cat-safe-window": { placement: { x: 88, y: 44, width: 11, layer: 5 }, mobilePlacement: { x: 86, y: 45, width: 17 } },
  "cat-hide-box": { placement: { x: 25, y: 60, width: 15, layer: 3 }, mobilePlacement: { x: 58, y: 74, width: 32 } },
  "cat-rest-space": { placement: { x: 43, y: 65, width: 18, layer: 2 }, mobilePlacement: { x: 70, y: 84, width: 28 } },
  "cat-litter-box": { placement: { x: 14, y: 84, width: 20, layer: 2 }, mobilePlacement: { x: 15, y: 78, width: 30 } },
  "cat-litter": { placement: { x: 30, y: 84, width: 12, layer: 3 }, mobilePlacement: { x: 28, y: 78, width: 22 } },
  "cat-food-bowl": { placement: { x: 52, y: 89, width: 10, layer: 3 }, mobilePlacement: { x: 37, y: 87, width: 17 } },
  "cat-water-bowl": { placement: { x: 42, y: 89, width: 10, layer: 3 }, mobilePlacement: { x: 22, y: 88, width: 18 } },
  "cat-scratcher": { placement: { x: 70, y: 85, width: 12, layer: 4 }, mobilePlacement: { x: 68, y: 83, width: 20 } },
  "cat-tree": { placement: { x: 85, y: 75, width: 20, layer: 2 }, mobilePlacement: { x: 78, y: 66, width: 27 } },
  "cat-safe-toy": { placement: { x: 56, y: 65, width: 10, layer: 4 }, mobilePlacement: { x: 49, y: 83, width: 17 } },
} as const;

export const catHazardPlacements = {
  "cat-toxic-plants": { placement: { x: 31, y: 35, width: 11, layer: 5 }, mobilePlacement: { x: 28, y: 52, width: 17 } },
  "cat-human-medicine": { placement: { x: 84, y: 76, width: 9, layer: 5 }, mobilePlacement: { x: 83, y: 76, width: 15 } },
  "cat-string": { placement: { x: 12, y: 79, width: 12, layer: 5 }, mobilePlacement: { x: 13, y: 80, width: 24 } },
  "cat-essential-oil": { placement: { x: 93, y: 48, width: 9, layer: 5 }, mobilePlacement: { x: 58, y: 66, width: 15 } },
  "cat-cleaner": { placement: { x: 69, y: 71, width: 9, layer: 5 }, mobilePlacement: { x: 70, y: 70, width: 15 } },
  "cat-cooling-product": { placement: { x: 45, y: 80, width: 14, layer: 5 }, mobilePlacement: { x: 86, y: 45, width: 17 } },
} as const;

export const catLayout = { roomPlacements: catRoomPlacements, hazardPlacements: catHazardPlacements } as const;
