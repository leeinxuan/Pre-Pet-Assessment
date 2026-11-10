"use client";

import { useEffect, useState } from "react";
import { COMPACT_PORTRAIT_LAYOUT_QUERY } from "./responsive";

/** 手機與平板直式共用活動版型；平板橫式維持桌機版。 */
export function useMobileLayout() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(COMPACT_PORTRAIT_LAYOUT_QUERY);
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isMobile;
}
