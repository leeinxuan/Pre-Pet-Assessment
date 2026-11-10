/**
 * 全站共用的版面判定。
 *
 * - 手機：不分方向，維持既有 720px 斷點。
 * - 平板直式：沿用手機版流程與觸控互動。
 * - 平板橫式：不符合 compact portrait，維持桌機版。
 */
export const PHONE_LAYOUT_QUERY = "(max-width: 720px)";
export const TABLET_PORTRAIT_LAYOUT_QUERY = "(min-width: 721px) and (max-width: 1100px) and (orientation: portrait)";
export const COMPACT_PORTRAIT_LAYOUT_QUERY = `${PHONE_LAYOUT_QUERY}, ${TABLET_PORTRAIT_LAYOUT_QUERY}`;

export function matchesCompactPortraitLayout() {
  return typeof window !== "undefined" && window.matchMedia(COMPACT_PORTRAIT_LAYOUT_QUERY).matches;
}
