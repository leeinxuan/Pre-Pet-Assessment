"use client";

import { useSyncExternalStore } from "react";

/** 測試模式入口只在網址帶有 `?test=1` 時出現，一般玩家在正式站看不到。 */
export const testModeQueryParam = "test";

export function isTestModeEntryUrl(search: string) {
  return new URLSearchParams(search).get(testModeQueryParam) === "1";
}

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

/** 伺服器端一律不顯示，避免 hydration 不一致；瀏覽器端依目前網址判斷。 */
export function useTestModeEntry() {
  return useSyncExternalStore(
    subscribe,
    () => isTestModeEntryUrl(window.location.search),
    () => false,
  );
}
