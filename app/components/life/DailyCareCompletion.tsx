"use client";

import { useEffect, useState } from "react";

type CareTimeItem = { title: string; detail: string };
type CareTimeSupplement = { title: string; items: readonly { title: string; detail: string; description: string }[] };

function renderKnowledgeText(text: string) {
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

function DelayedContinueButton({ label, onContinue }: { label: string; onContinue: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  return <div className={`delayed-continue ${visible ? "is-visible" : "is-waiting"}`} aria-live="polite">
    <button type="button" className="primary" tabIndex={visible ? 0 : -1} aria-hidden={!visible} onClick={onContinue}>
      {label} <span>→</span>
    </button>
  </div>;
}

/** Shared completion screen for the daily-care interaction activities. */
export function DailyCareCompletion({
  title,
  summary,
  detail,
  reflectionTitle,
  reflection,
  dailyCareBreakdown,
  careTimeTitle = "每天留給牠的照護時間",
  careTimeSupplement,
  continueLabel = "繼續生活旅程",
  onContinue,
}: {
  title: string;
  summary: string;
  detail: string;
  reflectionTitle: string;
  reflection: string | readonly string[];
  dailyCareBreakdown: readonly CareTimeItem[];
  careTimeTitle?: string;
  careTimeSupplement?: CareTimeSupplement;
  continueLabel?: string;
  onContinue: () => void;
}) {
  return <section className="walking-activity walking-complete">
    <div className="walking-complete-card">
      <h1>{title}</h1>
      <p>{summary}</p>
      <p>{renderKnowledgeText(detail)}</p>
      <div className="walking-reflection-note"><b>{renderKnowledgeText(reflectionTitle)}</b>{(Array.isArray(reflection) ? reflection : [reflection]).map((paragraph) => <p key={paragraph}>{renderKnowledgeText(paragraph)}</p>)}</div>
      <section className="walking-time-summary" aria-label="每日基本照護時間估計">
        <p>{careTimeTitle}</p>
        <div className="walking-time-commitment">
          {dailyCareBreakdown.map((item) => <div key={item.title}><b>{item.title}</b><span>{item.detail}</span></div>)}
        </div>
        {careTimeSupplement && <section className="walking-care-supplement" aria-label={careTimeSupplement.title}>
          <h2>{careTimeSupplement.title}</h2>
          <div className="walking-time-commitment walking-care-supplement-grid">
            {careTimeSupplement.items.map((item) => <div key={item.title}><b>{item.title}</b><span>{item.detail}</span><small>{item.description}</small></div>)}
          </div>
        </section>}
      </section>
      <DelayedContinueButton label={continueLabel} onContinue={onContinue} />
    </div>
  </section>;
}
