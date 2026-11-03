"use client";

import { useEffect } from "react";

/**
 * 手機底部延伸：版面高度只算到瀏覽器工具列上緣，工具列下方露出的是 <html> 底色。
 * 這裡取「畫面最底端那個元素」的實際背景色，套到 <html>，讓底部面板的顏色一路延伸到螢幕最底。
 * 與裝置尺寸無關；遇到圖片／影片／漸層背景時不套用，維持預設底色。
 */
const MOBILE_QUERY = "(max-width: 768px)";

function opaqueBackground(el: Element): string | null {
  const style = getComputedStyle(el);
  if (style.backgroundImage !== "none") return "";
  const match = style.backgroundColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
  if (!match) return null;
  const alpha = match[4] === undefined ? 1 : Number(match[4]);
  return alpha >= 0.98 ? style.backgroundColor : null;
}

function sampleBottomColor(): string {
  const x = Math.round(window.innerWidth / 2);
  const y = Math.max(0, window.innerHeight - 3);
  let el: Element | null = document.elementFromPoint(x, y);
  while (el && el !== document.documentElement) {
    if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement || el instanceof HTMLCanvasElement) return "";
    // 只認「橫跨整個畫面寬」的面板，避免取到面板裡的卡片／按鈕（選取狀態的卡片色會與面板不同）。
    const fullWidth = el.getBoundingClientRect().width >= window.innerWidth - 2;
    const color = fullWidth ? opaqueBackground(el) : el instanceof HTMLElement && getComputedStyle(el).backgroundImage !== "none" ? "" : null;
    if (color !== null) return color;
    el = el.parentElement;
  }
  return "";
}

export default function BottomBleedColor() {
  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const root = document.documentElement;
    let frame = 0;
    let last: string | null = null;

    const apply = () => {
      frame = 0;
      const color = media.matches ? sampleBottomColor() : "";
      if (color === last) return;
      last = color;
      if (color) root.style.setProperty("background-color", color);
      else root.style.removeProperty("background-color");
    };
    const schedule = () => {
      if (!frame) frame = window.setTimeout(apply, 16);
    };

    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["class", "style", "hidden"] });
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    media.addEventListener("change", schedule);
    document.addEventListener("transitionend", schedule, true);
    schedule();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule);
      media.removeEventListener("change", schedule);
      document.removeEventListener("transitionend", schedule, true);
      if (frame) window.clearTimeout(frame);
      root.style.removeProperty("background-color");
    };
  }, []);

  return null;
}
