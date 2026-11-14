"use client";

import { useEffect } from "react";
import { PHONE_LAYOUT_QUERY } from "./responsive";

/**
 * 手機底部延伸：版面高度只算到瀏覽器工具列上緣，工具列下方露出的是 <html> 底色。
 * 這裡取「畫面最底端那個元素」的實際背景色，套到 <html>，讓底部面板的顏色一路延伸到螢幕最底。
 * 與裝置尺寸無關；遇到圖片／影片／漸層背景時不套用，維持預設底色。
 */
const MOBILE_QUERY = PHONE_LAYOUT_QUERY;
// This pane supplies its own contained vertical scrolling while the document is
// locked. When it exists, native iOS scrolling must not be cancelled at the
// document level, even if Safari retargets touchmove outside the original child.
const LOCKED_PAGE_SCROLL_PANE_SELECTOR = ".correct-feedback-copy";

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
  // 以版面（stage-layout）的底緣取樣，不是視窗底緣：頁面被捲動或補了延伸區塊時，視窗底緣會落在延伸區塊上。
  const layoutBottom = document.querySelector(".stage-layout")?.getBoundingClientRect().bottom ?? window.innerHeight;
  const y = Math.max(0, Math.min(window.innerHeight, layoutBottom) - 3);
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

    // 鎖定頁的可捲動清單：不論 class 名稱，一律在尾端留出實際工具列高度，
    // 讓內容「剛好放得下」的頁面也能捲動一點，按鈕才會停在工具列上方而不是被蓋住。
    const markPanes = () => {
      const active = media.matches && isPageLocked();
      document.querySelectorAll(".bleed-pane").forEach((el) => {
        if (!active) {
          el.classList.remove("bleed-pane");
          if (el instanceof HTMLElement) el.style.removeProperty("--pane-bottom-obstruction");
        }
      });
      const feedbackPane = document.querySelector<HTMLElement>(LOCKED_PAGE_SCROLL_PANE_SELECTOR);
      if (!active) {
        feedbackPane?.style.removeProperty("--feedback-scroll-spacer");
      }
      if (!active) return;
      document.querySelectorAll(".stage-layout *").forEach((el) => {
        if (el.matches(".stage, .content-wrap, .stage-layout")) return;
        // 回饋面板的高度與底部留白由 CSS 與 CorrectFeedbackLayout 的實測高度決定，不套用依量測時機變動的遮擋留白。
        if (el.matches(LOCKED_PAGE_SCROLL_PANE_SELECTOR)) {
          if (el.classList.contains("bleed-pane")) {
            el.classList.remove("bleed-pane");
            if (el instanceof HTMLElement) el.style.removeProperty("--pane-bottom-obstruction");
          }
          return;
        }
        const overflowY = getComputedStyle(el).overflowY;
        const isScrollablePane = overflowY === "auto" || overflowY === "scroll";
        const bottom = el.getBoundingClientRect().bottom;
        if (isScrollablePane && bottom >= window.innerHeight - 40) {
          el.classList.add("bleed-pane");
          if (el instanceof HTMLElement) {
            const obstruction = Math.ceil(Math.max(0, bottom - window.innerHeight));
            const currentObstruction = Number.parseFloat(el.style.getPropertyValue("--pane-bottom-obstruction")) || 0;
            if (Math.abs(obstruction - currentObstruction) >= 1) el.style.setProperty("--pane-bottom-obstruction", `${obstruction}px`);
          }
        } else if (el.classList.contains("bleed-pane")) {
          el.classList.remove("bleed-pane");
          if (el instanceof HTMLElement) el.style.removeProperty("--pane-bottom-obstruction");
        }
      });
    };
    // 底部延伸只在「工具列浮在網頁上方」的 iPhone Safari 才需要：
    // 此時 screen.height 比可用高度多出一截（含工具列）。開發者工具的手機模擬、Android、
    // 主畫面 App（standalone）都沒有這一截，延伸高度會把按鈕推到畫面外，所以設為 0。
    const measureViewportHeight = (unit: "lvh" | "dvh") => {
      const probe = document.createElement("div");
      probe.style.cssText = `position:fixed;left:-9999px;top:0;width:1px;height:100${unit};visibility:hidden;pointer-events:none;`;
      document.body.appendChild(probe);
      const height = probe.getBoundingClientRect().height;
      probe.remove();
      return height;
    };
    const updateBleed = () => {
      const isIPhone = /iPhone|iPad|iPod/.test(navigator.userAgent);
      const needsBleed = media.matches && isIPhone && window.screen.height - window.innerHeight >= 100;
      const toolbarHeight = needsBleed
        ? Math.max(0, Math.round(measureViewportHeight("lvh") - measureViewportHeight("dvh")))
        : 0;
      const configuredBleed = Number.parseFloat(
        getComputedStyle(root).getPropertyValue("--bottom-bleed-target"),
      );
      const bleedHeight = needsBleed && Number.isFinite(configuredBleed)
        ? Math.max(0, configuredBleed)
        : 0;
      root.style.setProperty("--bottom-bleed", `${bleedHeight}px`);
      root.style.setProperty("--bottom-toolbar-safe", `${toolbarHeight}px`);
    };
    const apply = () => {
      frame = 0;
      updateBleed();
      keepLocked();
      markPanes();
      const color = media.matches ? sampleBottomColor() : "";
      if (color === last) return;
      last = color;
      if (color) {
        root.style.setProperty("background-color", color);
        root.style.setProperty("--bottom-bleed-color", color);
      } else {
        root.style.removeProperty("background-color");
        root.style.removeProperty("--bottom-bleed-color");
      }
    };
    // 鎖定頁（touch-action: none）不允許整頁被捲動：延伸區塊讓文件變長，iOS 仍可能把它捲動（例如 scrollIntoView），
    // 一旦偏離 0 就拉回，避免底部空白越捲越高。
    const isPageLocked = () => getComputedStyle(root).getPropertyValue("--page-lock").trim() === "1";
    // 鎖定頁：手指若不在「可捲動的內部清單」上，就不讓整頁被拖動。
    let startedOnControl = false;
    let touchStart: { x: number; y: number } | null = null;
    const onTouchStart = (event: TouchEvent) => {
      startedOnControl = event.target instanceof Element && Boolean(event.target.closest("button, a, input, select, textarea, summary, [role='button']"));
      const touch = event.touches[0];
      touchStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
    };
    const onTouchEnd = () => { startedOnControl = false; touchStart = null; };
    const onTouchMove = (event: TouchEvent) => {
      if (!media.matches || event.touches.length > 1 || !isPageLocked()) return;
      // iOS 會因為 touchmove 被取消而不派發 click。互動控制項交給瀏覽器
      // 處理點擊。Safari 可能在移動時將 target 改指向外層，故以 touchstart 為準。
      // 整頁若真的被捲動，keepLocked 仍會將它拉回頂端。
      if (startedOnControl || (event.target instanceof Element && event.target.closest("button, a, input, select, textarea, summary, [role='button']"))) return;
      const touch = event.touches[0];
      if (touch && touchStart && Math.hypot(touch.clientX - touchStart.x, touch.clientY - touchStart.y) < 10) return;
      const explicitPane = document.querySelector<HTMLElement>(LOCKED_PAGE_SCROLL_PANE_SELECTOR);
      if (explicitPane) {
        (window as unknown as { __touchDbg?: string }).__touchDbg = `pass-page ${String(explicitPane.className).slice(0, 19)} ${explicitPane.scrollHeight}/${explicitPane.clientHeight}`;
        return;
      }
      let el = event.target instanceof Element ? event.target : null;
      while (el && el !== document.body && el !== root) {
        const style = getComputedStyle(el);
        if ((style.overflowY === "auto" || style.overflowY === "scroll") && el.scrollHeight > el.clientHeight + 1) {
          (window as unknown as { __touchDbg?: string }).__touchDbg = `pass ${String(el.className).slice(0, 24)} ${el.scrollHeight}/${el.clientHeight}`;
          return;
        }
        el = el.parentElement;
      }
      (window as unknown as { __touchDbg?: string }).__touchDbg = `BLOCK ${event.target instanceof Element ? String(event.target.className).slice(0, 24) : "?"}`;
      if (event.cancelable) event.preventDefault();
    };
    const keepLocked = () => {
      if (!media.matches || window.scrollY === 0) return;
      if (!isPageLocked()) return;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    };
    const onScroll = () => {
      keepLocked();
      schedule();
    };
    const schedule = () => {
      if (!frame) frame = window.setTimeout(apply, 16);
    };

    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["class", "style", "hidden"] });
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("touchcancel", onTouchEnd, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    media.addEventListener("change", schedule);
    document.addEventListener("transitionend", schedule, true);
    schedule();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("touchcancel", onTouchEnd);
      document.removeEventListener("touchmove", onTouchMove);
      media.removeEventListener("change", schedule);
      document.removeEventListener("transitionend", schedule, true);
      if (frame) window.clearTimeout(frame);
      root.style.removeProperty("background-color");
      root.style.removeProperty("--bottom-bleed-color");
      root.style.removeProperty("--bottom-bleed");
      root.style.removeProperty("--bottom-toolbar-safe");
      document.querySelector<HTMLElement>(LOCKED_PAGE_SCROLL_PANE_SELECTOR)?.style.removeProperty("--feedback-scroll-spacer");
      document.querySelectorAll<HTMLElement>(".bleed-pane").forEach((el) => el.style.removeProperty("--pane-bottom-obstruction"));
    };
  }, []);

  return null;
}
