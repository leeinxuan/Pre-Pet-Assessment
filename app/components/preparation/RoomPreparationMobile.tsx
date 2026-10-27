"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { HazardItem, RoomItem } from "../../game-types";
import { renderKnowledgeText } from "../life/activities/activity-ui";
import { MobileStageIntro } from "../shared/MobileStageIntro";

type RoomPreparationMobileProps = {
  petName: string;
  scene: (overlay?: ReactNode) => ReactNode;
  supplyHintPlacement?: { top: number; maxWidth?: number };
  hazardBackground: string;
  hazards: HazardItem[];
  items: RoomItem[];
  securedHazards: string[];
  selectedItems: string[];
  activeHazard: HazardItem | undefined;
  activeItem: RoomItem | undefined;
  hazardsCleared: boolean;
  lockedItemIds: string[];
  hazardIcon: ReactNode;
  supplyIcon: ReactNode;
  onSelectHazard: (id: string) => void;
  onSelectItem: (id: string) => void;
  onCloseInfo: () => void;
  onPrepare: (id: string) => boolean;
  roomComplete: boolean;
  onComplete: () => void;
  itemPrice: (item: RoomItem) => string;
};

function PointingHandIcon() {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 4a2 2 0 0 1 2 2v10l1-1a2 2 0 0 1 3 1l1-1a2 2 0 0 1 3 2v5c0 3.3-2.7 6-6 6h-4.5a6 6 0 0 1-4.6-2.2l-5-6a2.2 2.2 0 0 1 3.3-2.9l4.8 4.6V6a2 2 0 0 1 2-2Z" /><path d="M5 7V4m-2 2h4M26 7V4m-2 2h4" /></svg>;
}

function RoomIntroIcon() {
  return <svg className="intro-line-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 31 32 14l20 17" /><path d="M17 28v23h30V28" /><path d="M27 51V37h10v14" /><path d="M24 31h0M40 31h0" /></svg>;
}

function ItemThumbnail({ image, label }: { image?: string; label: string }) {
  return <span className="room-mobile-thumbnail">{image ? <img src={image} alt="" /> : <span aria-hidden="true">◇</span>}<span className="sr-only">{label}</span></span>;
}

function CheckIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7" /></svg>;
}

function LockIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
}

function HazardThumbnail({ hazard, background }: { hazard: HazardItem; background: string }) {
  if (hazard.image) return <ItemThumbnail image={hazard.image} label={hazard.label} />;
  const area = hazard.mobileThumbnailCrop ?? (() => {
    const placement = hazard.hotspot?.mobile ?? hazard.mobileHitArea ?? hazard.mobilePlacement ?? hazard.placement;
    return { x: placement.x, y: placement.y, size: Math.min(32, Math.max(18, placement.width + 8)) };
  })();
  const size = area.size;
  const left = Math.max(0, Math.min(100 - size, area.x - size / 2));
  const top = Math.max(0, Math.min(100 - size, area.y - size / 2));
  const cropStyle = {
    width: `${10000 / size}%`,
    height: `${10000 / size}%`,
    left: `${-left * 100 / size}%`,
    top: `${-top * 100 / size}%`,
  };
  return <span className="room-mobile-thumbnail room-mobile-hazard-thumbnail">
    <img className="room-mobile-hazard-background" src={background} style={cropStyle} alt="" />
  </span>;
}

export function RoomPreparationMobile({ petName, scene, supplyHintPlacement, hazardBackground, hazards, items, securedHazards, selectedItems, activeHazard, activeItem, hazardsCleared, lockedItemIds, hazardIcon, supplyIcon, onSelectHazard, onSelectItem, onCloseInfo, onPrepare, roomComplete, onComplete, itemPrice }: RoomPreparationMobileProps) {
  const [started, setStarted] = useState(false);
  const [chosenTab, setChosenTab] = useState<"hazards" | "items" | null>(null);
  // The supplies are intentionally unavailable until every hazard is secured.
  // Keep the rendered panel on hazards as well, so an old tab selection cannot
  // expose supplies before the prerequisite is met.
  const tab = hazardsCleared ? (chosenTab ?? "items") : "hazards";
  const activeInfo = activeHazard ?? activeItem;
  const touchStart = useRef<number | null>(null);
  const hasPlacedAnyItem = selectedItems.some((id) => items.some((item) => item.id === id));
  const showSupplyHint = tab === "items" && hazardsCleared;

  function handleSupplyClick(id: string, placed: boolean) {
    if (placed) {
      onSelectItem(id);
    } else onPrepare(id);
  }

  useEffect(() => {
    if (!activeInfo || !window.matchMedia("(max-width: 720px)").matches) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onCloseInfo(); };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeInfo, onCloseInfo]);

  return <div className={`room-preparation-mobile${started ? " is-started" : ""}`}>
    {!started ? <MobileStageIntro id="room-mobile-intro-title" className="room-mobile-intro" icon={<RoomIntroIcon />} title={`先替 ${petName} 布置安全的生活空間`} description={`在迎接 ${petName} 前，先收好生活空間中的危險物品，再準備好牠每天需要的用品。`} actionLabel="開始整理空間" onStart={() => setStarted(true)} /> : <>
      {scene(showSupplyHint ? <p className="room-mobile-supply-hint" style={{ "--room-mobile-supply-hint-top": `${supplyHintPlacement?.top ?? 9}%`, "--room-mobile-supply-hint-max-width": `${supplyHintPlacement?.maxWidth ?? 82}%` } as CSSProperties} role="status">{hasPlacedAnyItem ? "點擊已放置用品查看說明。" : "點擊用品欄的物品，放入房間中。"}</p> : undefined)}
      <div className="room-mobile-tabs" role="tablist" aria-label="房間佈置階段">
        <button type="button" role="tab" aria-selected={tab === "hazards"} className={tab === "hazards" ? "is-active" : ""} onClick={() => setChosenTab("hazards")}><span className="room-mobile-tab-title"><span className="room-mobile-tab-icon" aria-hidden="true">{hazardIcon}</span>危險物品</span><span>{securedHazards.filter((id) => hazards.some((item) => item.id === id)).length} / {hazards.length}</span></button>
        <button type="button" role="tab" aria-selected={tab === "items"} className={tab === "items" ? "is-active" : ""} onClick={() => setChosenTab("items")} disabled={!hazardsCleared} aria-label={hazardsCleared ? "用品準備箱" : "請先收好所有危險物品才能使用用品準備箱"}><span className="room-mobile-tab-title"><span className="room-mobile-tab-icon" aria-hidden="true">{supplyIcon}</span>用品準備箱</span><span>{selectedItems.filter((id) => items.some((item) => item.id === id)).length} / {items.length}</span></button>
      </div>
      <section className="room-mobile-inventory" role="tabpanel" aria-label={tab === "hazards" ? "已收好的危險物品" : "準備用品"}>
        {tab === "hazards" ? securedHazards.filter((id) => hazards.some((item) => item.id === id)).length === 0
          ? <div className="room-mobile-empty"><PointingHandIcon /><p>點擊場景中的危險物品收起</p></div>
          : <div className="room-mobile-grid">{securedHazards.map((id) => hazards.find((item) => item.id === id)).filter((item): item is HazardItem => Boolean(item)).map((item) => <button type="button" key={item.id} className="room-mobile-tile room-mobile-hazard-tile is-complete" onClick={() => onSelectHazard(item.id)} aria-label={`${item.label}已收好，查看說明`}><HazardThumbnail hazard={item} background={hazardBackground} /><span className="room-mobile-tile-label">{item.label}</span><span className="room-mobile-complete-mark" aria-hidden="true"><CheckIcon /></span></button>)}</div>
          : <div className="room-mobile-grid">{items.map((item) => {
            const placed = selectedItems.includes(item.id);
            const locked = !placed && lockedItemIds.includes(item.id);
            return <button type="button" key={item.id} className={`room-mobile-tile room-mobile-supply-tile${placed ? " is-complete" : ""}${locked ? " is-locked" : ""}`} onClick={() => handleSupplyClick(item.id, placed)} disabled={!placed && (!hazardsCleared || locked)} aria-label={locked ? `${item.label}，進入內部後可放置` : placed ? `${item.label}已放置，查看說明` : `${item.label}，放入生活空間`}>
              <ItemThumbnail image={item.image} label={item.label} /><span className="room-mobile-tile-label">{item.label}</span>
              {placed && <span className="room-mobile-complete-mark" aria-hidden="true"><CheckIcon /></span>}
              {locked && <span className="room-mobile-lock" aria-hidden="true"><LockIcon /></span>}
            </button>;
          })}</div>}
      </section>
      {roomComplete && <div className="room-mobile-footer"><button type="button" className="primary room-mobile-complete" onClick={onComplete}>完成房間檢查，準備出發 <span aria-hidden="true">→</span></button></div>}
    </>}
    {activeInfo && started && typeof document !== "undefined" && createPortal(<div className="room-mobile-sheet-overlay" onClick={onCloseInfo}>
      <section className="room-mobile-sheet" role="dialog" aria-modal="true" aria-label={`${activeInfo.label}說明`} onClick={(event) => event.stopPropagation()} onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientY ?? null; }} onTouchEnd={(event) => { if (touchStart.current !== null && event.currentTarget.scrollTop <= 0 && (event.changedTouches[0]?.clientY ?? 0) - touchStart.current > 70) onCloseInfo(); touchStart.current = null; }}>
        <span className="room-mobile-sheet-handle" aria-hidden="true" />
        <button type="button" className="room-mobile-sheet-close" onClick={onCloseInfo} aria-label="關閉說明">×</button>
        <header>{activeHazard ? <HazardThumbnail hazard={activeHazard} background={hazardBackground} /> : <ItemThumbnail image={activeInfo.image} label={activeInfo.label} />}<div><h2>{activeInfo.label}</h2>{activeItem && <p className="room-mobile-price">{itemPrice(activeItem)}</p>}</div></header>
        <div className="room-mobile-sheet-copy">{activeHazard ? <><div className="room-mobile-hazard-section"><h3>為什麼危險：</h3><p>{renderKnowledgeText(activeHazard.danger.replaceAll("{petName}", petName))}</p></div><div className="room-mobile-hazard-section"><h3>建議如何處理：</h3><p>{renderKnowledgeText(activeHazard.handling.replaceAll("{petName}", petName))}</p></div></> : activeItem && <p>{renderKnowledgeText(activeItem.description.replaceAll("{petName}", petName))}</p>}</div>
      </section>
    </div>, document.body)}
  </div>;
}
