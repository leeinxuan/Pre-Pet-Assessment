"use client";

import { useEffect, useState } from "react";
import { COMPACT_PORTRAIT_LAYOUT_QUERY } from "./responsive";

/**
 * 手機與平板直式共用直式素材；平板橫式仍挑選桌機素材。
 * 掛載前回傳 null；掛載後只判斷一次並固定，避免影片播放中因為換 src 而被中斷
 * （換 src 會讓 play() 以 AbortError 失敗，過場就會被誤判為播放失敗而略過）。
 */
export function useIsMobileViewport(): boolean | null {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(window.matchMedia(COMPACT_PORTRAIT_LAYOUT_QUERY).matches); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  return isMobile;
}
