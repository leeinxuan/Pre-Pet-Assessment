"use client";

/* eslint-disable @next/next/no-img-element -- Activity intro artwork keeps existing CSS-controlled dimensions. */
import { interpolatePetName } from "../../../data/shared/pet-text";

export function withPetName(text: string, petName: string) {
  const displayName = petName.trim() || "牠";
  const withPlaceholders = interpolatePetName(text, displayName);
  if (!petName.trim()) return withPlaceholders;
  return withPlaceholders
    .replaceAll("豆豆", displayName)
    .replaceAll("小狗", displayName)
    .replaceAll("狗狗", displayName);
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

/** 可由各活動資料帶入的純說明前導頁，避免活動專屬頁面與內容散落在互動元件中。 */
export function ActivityIntroPage({ eyebrow, title, paragraphs, actionLabel, visualAssets, onStart }: { eyebrow: string; title: string; paragraphs: readonly string[]; actionLabel: string; visualAssets?: { character: string; tool: string; collector: string }; onStart: () => void }) {
  return <section className="activity-intro-page" aria-labelledby="activity-intro-title">
    <div className="activity-intro-page-card">
      {visualAssets && <div className="activity-intro-page-visual" aria-hidden="true">
        <img className="activity-intro-page-pet" src={visualAssets.character} alt="" />
        <img className="activity-intro-page-tool" src={visualAssets.tool} alt="" />
        <img className="activity-intro-page-collector" src={visualAssets.collector} alt="" />
      </div>}
      <div className="activity-intro-page-content">
        <p className="life-stage-label">{eyebrow}</p>
        <h1 id="activity-intro-title">{title}</h1>
        <div className="activity-intro-page-copy">
          {paragraphs.map((paragraph, index) => <p key={`${paragraph}-${index}`}>{renderKnowledgeText(paragraph)}</p>)}
        </div>
        <button type="button" className="primary" onClick={onStart}>{actionLabel}</button>
      </div>
    </div>
  </section>;
}


