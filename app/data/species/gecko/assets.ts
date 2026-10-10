/**
 * 守宮素材入口。素材尚未交付前刻意不填任何 URL；共用元件會顯示「素材待補」
 * 佔位，避免引用不存在檔案或暫借其他物種素材。
 */
export const geckoAssets = {
  selection: { gecko: "/assets/species/reptile.png" },
  room: { initial: undefined, sealed: undefined, safe: undefined, terrariumInterior: undefined },
  preparation: { trunkBackground: "/assets/car/car-trunk.png", documents: undefined },
  feeding: { scene: undefined, gecko: undefined },
} as const;
