"use client";

import type { ReactNode } from "react";

type MobileStageIntroProps = {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  icon: ReactNode;
  onStart: () => void;
  className?: string;
};

/** 只在手機版顯示；文案與圖示均由各階段既有設定傳入。 */
export function MobileStageIntro({ id, title, description, actionLabel, icon, onStart, className = "" }: MobileStageIntroProps) {
  return <section className={`mobile-stage-intro intro-screen ${className}`.trim()} aria-labelledby={id}>
    <div className="intro-orbit" aria-hidden="true">{icon}</div>
    <h1 id={id} className="intro-screen-title--light">{title}</h1>
    <p className="intro-body">{description}</p>
    <button type="button" className="primary large" onClick={onStart}>{actionLabel} <span aria-hidden="true">→</span></button>
  </section>;
}
