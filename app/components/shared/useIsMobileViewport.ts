"use client";

import { useEffect, useState } from "react";

/**
 * 與 base.css 的手機斷點（max-width: 768px）一致，用於挑選手機直式素材。
 * 掛載前回傳 null；掛載後只判斷一次並固定，避免影片播放中因為換 src 而被中斷
 * （換 src 會讓 play() 以 AbortError 失敗，過場就會被誤判為播放失敗而略過）。
 */
export function useIsMobileViewport(maxWidth = 768): boolean | null {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(window.matchMedia(`(max-width: ${maxWidth}px)`).matches); // eslint-disable-line react-hooks/set-state-in-effect
  }, [maxWidth]);

  return isMobile;
}
