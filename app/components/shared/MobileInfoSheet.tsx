"use client";

/* eslint-disable @next/next/no-img-element -- Item thumbnails use the existing public asset paths. */

import { useRef } from "react";
import { createPortal } from "react-dom";
import { useDialogFocus } from "./useDialogFocus";
import { useMobileLayout } from "./useMobileLayout";

export type MobileInfoSheetContent = {
  title: string;
  description: string;
  image?: string;
  price?: string;
};

/** Informational only: all placement and expense actions remain in the activity. */
export function MobileInfoSheet({ content, onClose }: { content: MobileInfoSheetContent | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLElement>(null);
  const isMobile = useMobileLayout();
  useDialogFocus({ isOpen: Boolean(content && isMobile), dialogRef, onClose, preventScroll: true });

  if (!content || typeof document === "undefined") return null;
  return createPortal(
    <div className="mobile-info-sheet-overlay" onClick={onClose}>
      <section ref={dialogRef} className="mobile-info-sheet" role="dialog" aria-modal="true" aria-label={`${content.title}說明`} tabIndex={-1}
        onClick={(event) => event.stopPropagation()}>
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
