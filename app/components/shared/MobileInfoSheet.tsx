"use client";

/* eslint-disable @next/next/no-img-element -- Item thumbnails use the existing public asset paths. */

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export type MobileInfoSheetContent = {
  title: string;
  description: string;
  image?: string;
  price?: string;
};

/** Informational only: all placement and expense actions remain in the activity. */
export function MobileInfoSheet({ content, onClose }: { content: MobileInfoSheetContent | null; onClose: () => void }) {
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (!content) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [content, onClose]);

  if (!content || typeof document === "undefined") return null;
  return createPortal(
    <div className="mobile-info-sheet-overlay" onClick={onClose}>
      <section className="mobile-info-sheet" role="dialog" aria-modal="true" aria-label={`${content.title}說明`}
        onClick={(event) => event.stopPropagation()}
        onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientY ?? null; }}
        onTouchEnd={(event) => {
          if (touchStart.current !== null && event.currentTarget.scrollTop <= 0 && (event.changedTouches[0]?.clientY ?? 0) - touchStart.current > 70) onClose();
          touchStart.current = null;
        }}>
        <span className="mobile-info-sheet-handle" aria-hidden="true" />
        <button type="button" className="mobile-info-sheet-close" onClick={onClose} aria-label="關閉說明">×</button>
        <header>
          {content.image && <img src={content.image} alt="" />}
          <div><h2>{content.title}</h2>{content.price && <p>{content.price}</p>}</div>
        </header>
        <div className="mobile-info-sheet-copy"><p>{content.description}</p></div>
      </section>
    </div>, document.body,
  );
}
