"use client";

import { useEffect, useState } from "react";

/** 與各活動手機版 CSS 斷點（max-width: 720px）一致；視窗尺寸改變時即時更新。 */
export function useMobileLayout(maxWidth = 720) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [maxWidth]);
  return isMobile;
}
