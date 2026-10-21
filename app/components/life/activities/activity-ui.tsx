"use client";

/* eslint-disable @next/next/no-img-element -- Activity intro artwork keeps existing CSS-controlled dimensions. */
import { interpolatePetName } from "../../../data/shared/pet-text";
import type { ActivityIntroConfig } from "../../../game-types";

/** 外觀觀察題共用的作答狀態；返回僅回到同一個觀察題，不重新抽取素材狀態。 */
export type ObservationAnswerStatus = "question" | "incorrect" | "correct";

export function ObservationReturnButton({ onReturn }: { onReturn: () => void }) {
  return <button type="button" className="knowledge-modal-confirm observation-return-button" onClick={onReturn}>重新想一次</button>;
}

export function withPetName(text: string, petName: string, species?: string) {
  return interpolatePetName(text, petName, species);
}

export function renderKnowledgeText(text: string) {
  return text.split(/(\*\*.*?\*\*|<mark>.*?<\/mark>|<danger>.*?<\/danger>)/g).filter(Boolean).map((part, index) => (
    part.startsWith("**") && part.endsWith("**")
      ? <strong className="knowledge-emphasis" key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
      : part.startsWith("<mark>") && part.endsWith("</mark>")
        ? <strong className="knowledge-emphasis" key={`${part}-${index}`}>{part.slice(6, -7)}</strong>
      : part.startsWith("<danger>") && part.endsWith("</danger>")
        ? <strong className="knowledge-danger" key={`${part}-${index}`}>{part.slice(8, -9)}</strong>
      : <span key={`${part}-${index}`}>{part}</span>
  ));
}

/** 選擇題維持純文字，不能因資料中的知識標記改變局部字重或字級。 */
export function plainChoiceText(text: string) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/<(?:mark|danger)>(.*?)<\/(?:mark|danger)>/g, "$1");
}

/** 可由各活動資料帶入的純說明前導頁，避免活動專屬頁面與內容散落在互動元件中。 */
export function ActivityIntroPage({ config, petName, species, onStart }: { config: ActivityIntroConfig; petName: string; species: string; onStart: () => void }) {
  const { eyebrow, title, paragraphs, startLabel: actionLabel, visualAssets } = config;
  return <section className="activity-intro-page" aria-labelledby="activity-intro-title">
    <div className={`activity-intro-page-card${visualAssets ? "" : " activity-intro-page-card--copy-only"}`}>
      {visualAssets && <div className="activity-intro-page-visual" aria-hidden="true">
        {visualAssets.character && <img className="activity-intro-page-pet" src={visualAssets.character} alt="" />}
        {visualAssets.tool && <img className="activity-intro-page-tool" src={visualAssets.tool} alt="" />}
        {visualAssets.collector && <img className="activity-intro-page-collector" src={visualAssets.collector} alt="" />}
      </div>}
      <div className="activity-intro-page-content">
        <p className="life-stage-label">{eyebrow}</p>
        <h1 id="activity-intro-title">{withPetName(title, petName, species)}</h1>
        <div className="activity-intro-page-copy">
          {paragraphs.map((paragraph, index) => <p key={`${paragraph}-${index}`}>{renderKnowledgeText(withPetName(paragraph, petName, species))}</p>)}
        </div>
        <button type="button" className="primary" onClick={() => {
          onStart();
          window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
        }}>{actionLabel}</button>
      </div>
    </div>
  </section>;
}
