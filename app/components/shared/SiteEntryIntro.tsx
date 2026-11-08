"use client";

import { useCallback, useEffect, useState } from "react";

const INTRO_SESSION_KEY = "pre-pet-entry-intro-v2";

type IntroPhase = "playing" | "leaving" | "done";

export default function SiteEntryIntro() {
  const [phase, setPhase] = useState<IntroPhase>("playing");

  const leave = useCallback(() => {
    setPhase((current) => current === "playing" ? "leaving" : current);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const forcePreview = new URLSearchParams(window.location.search).get("intro") === "1";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hasPlayed = false;

    try {
      hasPlayed = window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
    } catch {
      // Continue with the intro when storage is unavailable.
    }

    const shouldSkip = !forcePreview && (hasPlayed || reducedMotion);

    if (shouldSkip) {
      root.dataset.skipEntryIntro = "true";
      return;
    }

    delete root.dataset.skipEntryIntro;
    root.classList.add("site-entry-intro-active");
    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch {
      // Storage can be unavailable in privacy-restricted browsers. The intro
      // still works; it will simply play again after a full reload.
    }

    const leaveTimer = window.setTimeout(leave, 1650);
    const skip = () => leave();
    const passiveOptions: AddEventListenerOptions = { passive: true };

    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("wheel", skip, passiveOptions);
    window.addEventListener("touchstart", skip, passiveOptions);

    return () => {
      window.clearTimeout(leaveTimer);
      root.classList.remove("site-entry-intro-active");
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, [leave]);

  useEffect(() => {
    if (phase !== "leaving") return;

    const finishTimer = window.setTimeout(() => {
      document.documentElement.classList.remove("site-entry-intro-active");
      setPhase("done");
    }, 520);

    return () => window.clearTimeout(finishTimer);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`site-entry-intro${phase === "leaving" ? " is-leaving" : ""}`}
      role="status"
      aria-label="網站載入中"
      onPointerDown={leave}
    >
      <div className="site-entry-intro__motion" aria-hidden="true">
        <span className="site-entry-intro__arrow">
          <svg className="site-entry-intro__logo" viewBox="0 0 800 800">
            <path
              className="site-entry-intro__logo-body"
              d="M697.74,352.95L452.66,64.94c-36.96-43.47-107.97-17.34-107.97,39.69v127.56h-204.53c-30.46,0-55.15,24.69-55.15,55.15v58.03c0,39.95,13.74,79.04,40.23,108.94,37.21,42.01,104.6,87.94,219.44,81.96,0,0,66.04-5.68,115.02-47.6,10.75-9.2,27.17-9.67,37.12.4,10.82,10.95,10.03,28.51-1.4,38.47-67.05,58.34-146.69,61.16-150.04,61.25h-.7v106.65c0,57.02,71.01,83.16,107.97,39.69l245.07-288.02c23.06-27.1,23.06-67.05,0-94.16Z"
            />
            <path
              className="site-entry-intro__eye"
              d="M382.41,351.92c-19.59,3.71-36.44-13.14-32.73-32.73,2.06-10.88,10.96-19.78,21.84-21.84,19.59-3.71,36.44,13.14,32.73,32.73-2.06,10.88-10.96,19.78-21.84,21.84Z"
            />
            <path
              className="site-entry-intro__eye"
              d="M495.59,412.13c-24.28,3.72-44.9-16.9-41.18-41.18,2.32-15.13,14.68-27.5,29.82-29.82,24.28-3.72,44.9,16.9,41.18,41.18-2.32,15.13-14.68,27.5-29.82,29.82Z"
            />
            <path
              className="site-entry-intro__eyelid"
              d="M382.41,351.92c-19.59,3.71-36.44-13.14-32.73-32.73,2.06-10.88,10.96-19.78,21.84-21.84,19.59-3.71,36.44,13.14,32.73,32.73-2.06,10.88-10.96,19.78-21.84,21.84Z"
            />
            <path
              className="site-entry-intro__eyelid"
              d="M495.59,412.13c-24.28,3.72-44.9-16.9-41.18-41.18,2.32-15.13,14.68-27.5,29.82-29.82,24.28-3.72,44.9,16.9,41.18,41.18-2.32,15.13-14.68,27.5-29.82,29.82Z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
