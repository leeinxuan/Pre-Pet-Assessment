import type { KeyboardEvent } from "react";

const tabNavigationKeys = ["ArrowLeft", "ArrowRight", "Home", "End"] as const;

/**
 * Shared horizontal tab-list behaviour following the ARIA tabs pattern.
 * Disabled tabs are skipped; moving focus also activates the destination tab.
 */
export function handleTabListKeyDown(event: KeyboardEvent<HTMLElement>) {
  if (!tabNavigationKeys.includes(event.key as (typeof tabNavigationKeys)[number])) return;

  const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'));
  if (tabs.length === 0) return;

  const eventTarget = event.target instanceof Element ? event.target.closest<HTMLButtonElement>('[role="tab"]') : null;
  const currentIndex = Math.max(0, tabs.findIndex((tab) => tab === eventTarget));
  const nextIndex = event.key === "Home"
    ? 0
    : event.key === "End"
      ? tabs.length - 1
      : event.key === "ArrowLeft"
        ? (currentIndex - 1 + tabs.length) % tabs.length
        : (currentIndex + 1) % tabs.length;

  event.preventDefault();
  tabs[nextIndex].focus();
  tabs[nextIndex].click();
}
