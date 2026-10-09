"use client";

/* eslint-disable @next/next/no-img-element -- Activity intro artwork keeps existing CSS-controlled dimensions. */
import { interpolatePetName, petNameFallback } from "../../../data/shared/pet-text";
import type { ActivityIntroConfig } from "../../../game-types";

export function withPetName(text: string, petName: string, species?: string) {
  const displayName = petName.trim() || petNameFallback(species);
  const withPlaceholders = interpolatePetName(text, displayName, species);
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
export function ActivityIntroPage({ config, petName, species, onStart }: { config: ActivityIntroConfig; petName: string; species: string; onStart: () => void }) {
  const { eyebrow, title, paragraphs, startLabel: actionLabel, visualAssets } = config;
  return <section className="activity-intro-page" aria-labelledby="activity-intro-title">
    <div className="activity-intro-page-card">
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
