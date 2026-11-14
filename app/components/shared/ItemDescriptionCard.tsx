"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { createPortal } from "react-dom";
import { logEvent } from "../../lib/event-log";

type ItemDescriptionCardProps = {
  title: string;
  description: string;
  /** 說明配圖：有此欄位時，description 中的 <accent> 段落在電腦版顯示底線並可點擊彈出圖片。 */
  descriptionImage?: string;
  /** Optional footer keeps the card's information row consistent with priced preparation items. */
  footer?: string;
  className?: string;
};

/** 將 description 字串解析，把 <accent>…</accent> 渲染為重點色 span；有 descriptionImage 時在電腦版加底線與點擊行為。 */
function renderDescription(text: string, descriptionImage: string | undefined, onImageClick: () => void) {
  const parts = text.split(/(<accent>.*?<\/accent>)/g).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith("<accent>") && part.endsWith("</accent>")) {
      const inner = part.slice(8, -9);
      if (descriptionImage) {
        return (
          <span
            key={index}
            className="description-accent description-accent--link"
            role="button"
            tabIndex={0}
            onClick={onImageClick}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onImageClick(); } }}
          >
            {inner}
          </span>
        );
      }
      return <span key={index} className="description-accent">{inner}</span>;
    }
    return <span key={index}>{part}</span>;
  });
}

/**
 * Shared completion card used wherever an inventory item becomes an explained item.
 * Preparation supplies may show a price in the footer; activities can show status text.
 * When `descriptionImage` is provided, <accent> segments become clickable underlined links
 * that open an image popup (desktop behaviour; mobile shows the image inline in the sheet).
 */
export function ItemDescriptionCard({ title, description, descriptionImage, footer, className = "" }: ItemDescriptionCardProps) {
  const [popupOpen, setPopupOpen] = useState(false);

  return <>
    <div className={`supply-slot-note ${className}`.trim()} aria-live="polite">
      <b>{title}</b>
      <small>{renderDescription(description, descriptionImage, () => { logEvent("description_image_opened", { title }); setPopupOpen(true); })}</small>
      {footer && <span className="supply-slot-price">{footer}</span>}
    </div>
    {popupOpen && descriptionImage && typeof document !== "undefined" && createPortal(
      <div className="description-image-overlay" onClick={() => setPopupOpen(false)} role="dialog" aria-modal="true" aria-label={`${title}示意圖`}>
        <div className="description-image-popup" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="description-image-close" onClick={() => setPopupOpen(false)} aria-label="關閉圖片">×</button>
          <img src={descriptionImage} alt={`${title}示意圖`} className="description-image-img" />
        </div>
      </div>,
      document.body
    )}
  </>;
}
