"use client";

/* eslint-disable @next/next/no-img-element -- Room and departure scenes rely on native image sizing for existing drag coordinates and overlays. */
/* eslint-disable react-hooks/refs -- The scene event handlers read the in-flight guard only after user interaction. */

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getExpenseForSpecies, money } from "../../data/shared/expenses";
import { initialHomeReadinessState, type HomeReadinessState } from "../../data/shared/home-readiness-state";
import { getSpeciesConfig } from "../../data/species/index";
import type { CareMember, ExpenseRecord, HazardItem, RoomItem } from "../../game-types";
import { NavButtons, StepHeading } from "../shared/SharedComponents";
import { ItemDescriptionCard } from "../shared/ItemDescriptionCard";
import { MobileInfoSheet, type MobileInfoSheetContent } from "../shared/MobileInfoSheet";
import { MobileStageIntro } from "../shared/MobileStageIntro";
import type { HomeReadinessTextBlock, HomeReadinessTextSegment } from "../../data/shared/home-readiness-types";
import { sharedAssets } from "../../data/shared/assets";
import { RoomPreparationMobile, type MobileRoomSupplyTutorialState } from "./RoomPreparationMobile";

export { initialHomeReadinessState };
export type { HomeReadinessState };

function renderHomeReadinessSegments(segments: HomeReadinessTextSegment[], replaceName: (text: string) => string) {
  return segments.map((segment, index) => segment.emphasis
    ? <strong className="home-readiness-emphasis" key={`${segment.text}-${index}`}>{replaceName(segment.text)}</strong>
    : <span key={`${segment.text}-${index}`}>{replaceName(segment.text)}</span>);
}

function HomeReadinessRichText({ blocks, replaceName }: { blocks: HomeReadinessTextBlock[]; replaceName: (text: string) => string }) {
  const listItems = blocks.filter((block) => block.type === "item");
  const paragraphs = blocks.filter((block) => block.type === "paragraph");
  return <>{paragraphs.map((block, index) => <p key={`paragraph-${index}`}>{renderHomeReadinessSegments(block.segments, replaceName)}</p>)}{listItems.length > 0 && <ul>{listItems.map((block, index) => <li key={`item-${index}`}>{renderHomeReadinessSegments(block.segments, replaceName)}</li>)}</ul>}</>;
}

function StorageBoxIcon() {
  return <svg viewBox="0 0 32 32" focusable="false" aria-hidden="true">
    <path d="M5 9h22v4H5zM7 13h18l-1.5 13h-15zM12 17h8" />
  </svg>;
}

function DepartureIntroIcon() {
  return <svg className="intro-line-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="13" y="22" width="38" height="30" rx="4" /><path d="M25 22v-6a7 7 0 0 1 14 0v6M13 32h38M25 32v7m14-7v7" /></svg>;
}

function WarningTriangleIcon() {
  return <svg viewBox="0 0 32 30" focusable="false" aria-hidden="true">
    <path d="M16 3 29 27H3L16 3Z" />
    <path d="M16 11v8" />
    <circle cx="16" cy="23" r="1" />
  </svg>;
}

/** 共用的籠舍／圍欄／爬蟲缸入口指示箭頭；以 SVG 保持各物種視覺一致。 */
function InteriorEntryPointerIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <span className={`interior-entry-hint interior-entry-hint--${direction}`} aria-hidden="true">
      <svg className="interior-entry-hint-arrow" viewBox="0 0 28 28" focusable="false" aria-hidden="true">
        <circle cx="14" cy="14" r="14" fill="#fff" stroke="none" />
        {direction === "left"
          ? <path d="M12.5 9.5l5 4.5-5 4.5" />
          : <path d="M15.5 9.5l-5 4.5 5 4.5" />}
      </svg>
      <span className="interior-entry-hint-label">點擊佈置</span>
    </span>
  );
}

export function HomeReadinessActivity({ species = "dog", petName, state, onChange, onBack, onNext }: {
  species?: string; petName: string; state: HomeReadinessState; onChange: (state: HomeReadinessState) => void; onBack: () => void; onNext: () => void;
}) {
  const speciesConfig = getSpeciesConfig(species);
  const config = speciesConfig.homeReadiness;
  const displayName = petName.trim() || speciesConfig.copy.animalNameFallback;
  const arrivalLead = petName.trim()
    ? `${displayName} 快要來了！佈置家之前，我們先確認一件重要的事……`
    : "牠快要來了！佈置家之前，我們先確認一件重要的事……";
  const replaceName = (text: string) => text.replaceAll("{petName}", displayName);
  const selectedHousing = config.housingChoices.find((choice) => choice.id === state.housing);
  const canShowCards = Boolean(selectedHousing && state.housingReminderAcknowledged);
  const allAcknowledged = config.cards.every((card) => state.acknowledgedCardIds.includes(card.id));
  const firstIncompleteIndex = config.cards.findIndex((card) => !state.acknowledgedCardIds.includes(card.id));
  const activeCardIndex = state.openCardId
    ? Math.max(0, config.cards.findIndex((card) => card.id === state.openCardId))
    : Math.max(0, firstIncompleteIndex);
  const activeCard = allAcknowledged ? undefined : config.cards[activeCardIndex];

  function openCommitmentCard(index: number) {
    const card = config.cards[index];
    if (!card) return;
    const isComplete = state.acknowledgedCardIds.includes(card.id);
    const canOpen = isComplete || index === firstIncompleteIndex;
    if (canOpen) onChange({ ...state, openCardId: card.id });
  }

  function acknowledgeCommitmentCard() {
    if (!activeCard || state.acknowledgedCardIds.includes(activeCard.id)) return;
    const acknowledgedCardIds = [...state.acknowledgedCardIds, activeCard.id];
    const nextCard = config.cards.find((card) => !acknowledgedCardIds.includes(card.id));
    onChange({ ...state, acknowledgedCardIds, openCardId: nextCard?.id ?? null });
  }

  return <div className="content-wrap home-readiness">
    <div className="home-readiness-desktop-flow">
    {!canShowCards ? <>
      <header className="home-readiness-heading"><h1>家庭與居住確認</h1><p>{arrivalLead}</p></header>
      {!selectedHousing ? <section className="home-readiness-workbench home-readiness-workbench--housing"><article className="home-readiness-question"><p className="life-stage-label">第一步・居住條件</p><h2>你目前的居住狀況是？</h2><div className="home-readiness-choice-grid">
        {config.housingChoices.map((choice) => <button type="button" key={choice.id} onClick={() => onChange({ ...state, housing: choice.id, housingReminderAcknowledged: false })}><span className="home-readiness-choice-media"><img src={choice.id === "renter" ? sharedAssets.housing.tenant : sharedAssets.housing.homeowner} alt="" /></span><span className="home-readiness-choice-label">{choice.label}</span></button>)}
      </div></article></section> : <section className="home-readiness-workbench home-readiness-workbench--reminder"><article className="home-readiness-reminder-step"><p className="life-stage-label">第一步・居住提醒</p><h2>{selectedHousing.followUpTitle}</h2><HomeReadinessRichText blocks={selectedHousing.followUpContent} replaceName={replaceName} /><button type="button" className="primary" onClick={() => onChange({ ...state, housingReminderAcknowledged: true })}>我了解了</button></article></section>}
    </> : <>
      <header className="home-readiness-heading"><h1>家庭與居住確認</h1><p>還有一件事——同住的人都準備好了嗎？</p></header>
      <section className="home-readiness-checklist"><header><p className="life-stage-label">第二步・共同承諾</p><h2>逐一確認，讓照顧從全家的共識開始。</h2></header>
        <nav className="home-readiness-progress" aria-label="共同承諾進度">{config.cards.map((card, index) => {
          const complete = state.acknowledgedCardIds.includes(card.id);
          const current = activeCard?.id === card.id;
          const available = complete || index === firstIncompleteIndex;
          return <button type="button" key={card.id} className={`${complete ? "is-complete" : ""} ${current ? "is-current" : ""}`} disabled={!available || allAcknowledged} onClick={() => openCommitmentCard(index)}><span>{complete ? "✓" : index + 1}</span><b>{card.stepLabel}</b></button>;
        })}</nav>
        {activeCard && <article className={`home-readiness-commitment-card ${allAcknowledged ? "is-complete" : ""}`}>
          <h3>{renderHomeReadinessSegments(activeCard.title, replaceName)}</h3>
          <div className="home-readiness-commitment-copy"><HomeReadinessRichText blocks={activeCard.body} replaceName={replaceName} /></div>
          {state.acknowledgedCardIds.includes(activeCard.id)
            ? <p className="home-readiness-reviewed">已確認；可從上方步驟回看其他內容。</p>
            : <button type="button" className="primary" onClick={acknowledgeCommitmentCard}>我了解了</button>}
        </article>}
      </section>{allAcknowledged && <section className="home-readiness-completion" role="status"><span aria-hidden="true">✓</span><div><p className="life-stage-label">共同承諾完成</p><p>{renderHomeReadinessSegments(config.completionMessage, replaceName)}</p></div></section>}<NavButtons onBack={onBack} onNext={onNext} disabled={!allAcknowledged} nextLabel="繼續" />
    </>}
    </div>

    <div className="home-readiness-mobile-flow">
      <header className="home-readiness-mobile-heading">
        <h1>家庭與居住確認</h1>
        <p>{canShowCards ? "還有一件事——同住的人都準備好了嗎？" : arrivalLead}</p>
      </header>

      {canShowCards && <nav className="home-readiness-mobile-progress" aria-label="共同承諾進度">{config.cards.map((card, index) => {
        const complete = state.acknowledgedCardIds.includes(card.id);
        const current = activeCard?.id === card.id;
        const available = complete || index === firstIncompleteIndex;
        return <button type="button" key={card.id} className={`${complete ? "is-complete" : ""} ${current ? "is-current" : ""}`} disabled={!available || allAcknowledged} onClick={() => openCommitmentCard(index)}><span>{complete ? "✓" : index + 1}</span><b>{card.stepLabel}</b></button>;
      })}</nav>}

      <main className="home-readiness-mobile-content">
        {!canShowCards ? (!selectedHousing
          ? <section className="home-readiness-workbench home-readiness-workbench--housing"><article className="home-readiness-question"><p className="life-stage-label">第一步・居住條件</p><h2>你目前的居住狀況是？</h2><div className="home-readiness-choice-grid">
            {config.housingChoices.map((choice) => <button type="button" key={choice.id} onClick={() => onChange({ ...state, housing: choice.id, housingReminderAcknowledged: false })}><span className="home-readiness-choice-media"><img src={choice.id === "renter" ? sharedAssets.housing.tenant : sharedAssets.housing.homeowner} alt="" /></span><span className="home-readiness-choice-label">{choice.label}</span></button>)}
          </div></article></section>
          : <section className="home-readiness-workbench home-readiness-workbench--reminder"><article className="home-readiness-reminder-step"><p className="life-stage-label">第一步・居住提醒</p><h2>{selectedHousing.followUpTitle}</h2><HomeReadinessRichText blocks={selectedHousing.followUpContent} replaceName={replaceName} /><button type="button" className="primary" onClick={() => onChange({ ...state, housingReminderAcknowledged: true })}>我了解了</button></article></section>)
          : <>
            {activeCard && <article className="home-readiness-commitment-card">
              <h3>{renderHomeReadinessSegments(activeCard.title, replaceName)}</h3>
              <div className="home-readiness-commitment-copy"><HomeReadinessRichText blocks={activeCard.body} replaceName={replaceName} /></div>
              {state.acknowledgedCardIds.includes(activeCard.id)
                ? <p className="home-readiness-reviewed">已確認；可從上方步驟回看其他內容。</p>
                : <button type="button" className="primary" onClick={acknowledgeCommitmentCard}>我了解了</button>}
            </article>}
            {allAcknowledged && <section className="home-readiness-completion" role="status"><span aria-hidden="true">✓</span><div><p className="life-stage-label">共同承諾完成</p><p>{renderHomeReadinessSegments(config.completionMessage, replaceName)}</p></div></section>}
          </>}
      </main>

      {canShowCards && allAcknowledged && <div className="home-readiness-mobile-complete-action">
        <button type="button" className="primary" onClick={onNext}>繼續 <span>→</span></button>
      </div>}
    </div>
  </div>;
}

function expensePriceText(expenseIds: string[] = [], species: string) {
  const prices = expenseIds.map((id) => getExpenseForSpecies(id, species)).filter((item): item is ExpenseRecord => Boolean(item));
  if (prices.length === 0) return "";
  // 有金額區間的用品顯示最高值，與企劃「8,000 元（3,000–8,000）」前面的參考金額一致。
  const total = prices.reduce((sum, item) => sum + (item.maxAmount ?? item.amount), 0);
  return `NT$${money.format(total)}`;
}

function mobileRoomPriceText(item: RoomItem, species: string) {
  const ids = Array.from(new Set([...(item.expenseIds ?? []), ...(item.expenseId ? [item.expenseId] : [])]));
  return mobileExpensePriceText(ids, species);
}

function mobileExpensePriceText(expenseIds: string[] = [], species: string) {
  const prices = expenseIds.map((id) => getExpenseForSpecies(id, species)).filter((record): record is ExpenseRecord => Boolean(record));
  if (prices.length === 0) return "";
  const minimum = prices.reduce((sum, record) => sum + record.amount, 0);
  const maximum = prices.reduce((sum, record) => sum + (record.maxAmount ?? record.amount), 0);
  return minimum === maximum ? `NT$${money.format(maximum)}` : `NT$${money.format(maximum)}（${money.format(minimum)}–${money.format(maximum)}）`;
}

function roomItemPlacementStyle(item: RoomItem): CSSProperties {
  return {
    left: `${item.placement.x}%`,
    top: `${item.placement.y}%`,
    width: `${item.placement.width}%`,
    zIndex: item.placement.layer,
    "--mobile-room-item-x": `${item.mobilePlacement?.x ?? item.placement.x}%`,
    "--mobile-room-item-y": `${item.mobilePlacement?.y ?? item.placement.y}%`,
    "--mobile-room-item-width": `${item.mobilePlacement?.width ?? item.placement.width}%`,
    "--mobile-room-item-transform": item.mobilePlacement?.transform ?? item.placement.transform ?? "translate(-50%, -50%)",
    transform: item.placement.transform,
  } as CSSProperties;
}

function roomItemSceneStyle(item: RoomItem): CSSProperties {
  return {
    ...roomItemPlacementStyle(item),
    ...(item.sceneVisual?.mixBlendMode ? { mixBlendMode: item.sceneVisual.mixBlendMode } : {}),
    ...(item.sceneVisual?.opacity !== undefined ? { opacity: item.sceneVisual.opacity } : {}),
    ...(item.sceneVisual?.pointerEvents ? { pointerEvents: item.sceneVisual.pointerEvents } : {}),
  };
}

function roomScenePartPlacementStyle(part: NonNullable<RoomItem["sceneParts"]>[number]): CSSProperties {
  return {
    left: `${part.placement.x}%`,
    top: `${part.placement.y}%`,
    width: `${part.placement.width}%`,
    zIndex: part.placement.layer,
    "--mobile-room-item-x": `${part.mobilePlacement?.x ?? part.placement.x}%`,
    "--mobile-room-item-y": `${part.mobilePlacement?.y ?? part.placement.y}%`,
    "--mobile-room-item-width": `${part.mobilePlacement?.width ?? part.placement.width}%`,
    "--mobile-room-item-transform": part.mobilePlacement?.transform ?? part.placement.transform ?? "translate(-50%, -50%)",
    transform: part.placement.transform,
  } as CSSProperties;
}

function roomHazardPlacementStyle(item: HazardItem): CSSProperties {
  return {
    left: `${item.placement.x}%`,
    top: `${item.placement.y}%`,
    width: `${item.placement.width}%`,
    zIndex: item.placement.layer,
    "--mobile-room-hazard-x": `${item.mobilePlacement?.x ?? item.placement.x}%`,
    "--mobile-room-hazard-y": `${item.mobilePlacement?.y ?? item.placement.y}%`,
    "--mobile-room-hazard-width": `${item.mobilePlacement?.width ?? item.placement.width}%`,
  } as CSSProperties;
}

function roomHotspotStyle(placement: {
  desktop: { x: number; y: number; width: number; height: number };
  mobile: { x: number; y: number; width: number; height: number };
}): CSSProperties {
  return {
    left: `${placement.desktop.x}%`,
    top: `${placement.desktop.y}%`,
    width: `${placement.desktop.width}%`,
    height: `${placement.desktop.height}%`,
    "--mobile-room-hotspot-x": `${placement.mobile.x}%`,
    "--mobile-room-hotspot-y": `${placement.mobile.y}%`,
    "--mobile-room-hotspot-width": `${placement.mobile.width}%`,
    "--mobile-room-hotspot-height": `${placement.mobile.height}%`,
  } as CSSProperties;
}

function mobileHazardArea(item: HazardItem, floorHotspot?: { mobile: { x: number; y: number; width: number; height: number } }) {
  const specified = item.mobileHitArea ?? item.hotspot?.mobile ?? floorHotspot?.mobile;
  if (specified) return { ...specified, width: Math.max(22, specified.width), height: Math.max(20, specified.height) };
  const visual = item.mobilePlacement ?? item.placement;
  return { x: visual.x, y: visual.y, width: Math.min(40, Math.max(22, visual.width + 8)), height: Math.min(36, Math.max(20, visual.width * 1.15 + 8)) };
}

function mobileHazardAreaStyle(area: { x: number; y: number; width: number; height: number }): CSSProperties {
  return { left: `${area.x}%`, top: `${area.y}%`, width: `max(52px, ${area.width}%)`, height: `max(52px, ${area.height}%)` };
}

function roomDoorplatePlacementStyle(placement: {
  desktop: { x: number; y: number; width: number };
  desktopText: { left: number; top: number; width: number; height: number; fontSize: number };
  mobile: { x: number; y: number; width: number };
  mobileText: { left: number; top: number; width: number; height: number; fontSize: number };
}): CSSProperties {
  return {
    left: `${placement.desktop.x}%`,
    top: `${placement.desktop.y}%`,
    width: `${placement.desktop.width}%`,
    "--desktop-doorplate-text-left": `${placement.desktopText.left}%`,
    "--desktop-doorplate-text-top": `${placement.desktopText.top}%`,
    "--desktop-doorplate-text-width": `${placement.desktopText.width}%`,
    "--desktop-doorplate-text-height": `${placement.desktopText.height}%`,
    "--desktop-doorplate-text-font-size": `${placement.desktopText.fontSize}px`,
    "--mobile-doorplate-x": `${placement.mobile.x}%`,
    "--mobile-doorplate-y": `${placement.mobile.y}%`,
    "--mobile-doorplate-width": `${placement.mobile.width}%`,
    "--mobile-doorplate-text-left": `${placement.mobileText.left}%`,
    "--mobile-doorplate-text-top": `${placement.mobileText.top}%`,
    "--mobile-doorplate-text-width": `${placement.mobileText.width}%`,
    "--mobile-doorplate-text-height": `${placement.mobileText.height}%`,
    "--mobile-doorplate-text-font-size": `${placement.mobileText.fontSize}px`,
  } as CSSProperties;
}

function RoomItemVisual({ item, scene = false }: { item: RoomItem; scene?: boolean }) {
  const image = scene ? item.sceneImage ?? item.image : item.image;
  if (image) return <img className={scene ? "" : `room-item-image room-item-image--${item.id}`} src={image} alt={scene ? `房間中已配置的${item.label}` : ""} />;
  return <span className={`preparation-asset-placeholder ${scene ? "preparation-asset-placeholder--scene" : ""}`} role="img" aria-label={`${item.label}素材待補`}>素材待補</span>;
}

function HazardInfoPanel({ hazard, petName, onClose }: { hazard: HazardItem; petName: string; onClose: () => void }) {
  return (
    <div className="room-hazard-overlay">
      <section className="room-hazard-alert" role="dialog" aria-labelledby={`hazard-info-${hazard.id}`} onClick={onClose}>
        <button type="button" className="room-hazard-alert-close" onClick={onClose} aria-label={`關閉${hazard.label}說明`}>×</button>
        <h2 id={`hazard-info-${hazard.id}`}>{hazard.label}已收起</h2>
        <p><b>為什麼危險：</b>{hazard.danger.replaceAll("{petName}", petName)}</p>
        <p><b>建議如何處理：</b>{hazard.handling.replaceAll("{petName}", petName)}</p>
      </section>
    </div>
  );
}

export function RoomPreparation({
  selectedItems,
  securedHazards,
  petName,
  onPrepare,
  onToggleHazard,
  onReplay,
  onNext,
  mobileSupplyTutorial,
  onMobileSupplyTutorialChange,
  reviewing = false,
  species = "dog",
}: {
  selectedItems: string[];
  securedHazards: string[];
  petName: string;
  onPrepare: (id: string) => void;
  onToggleHazard: (id: string) => void;
  onReplay: () => void;
  onNext: () => void;
  mobileSupplyTutorial: MobileRoomSupplyTutorialState;
  onMobileSupplyTutorialChange: (next: MobileRoomSupplyTutorialState) => void;
  reviewing?: boolean;
  breed: string;
  species?: string;
}) {
  const speciesConfig = getSpeciesConfig(species);
  const roomScene = speciesConfig.preparation.roomScene;
  const doorplatePlacement = roomScene.doorplate?.placement;
  const activeRoomItems = speciesConfig.roomItems;
  const activeHazards = speciesConfig.hazards;
  const [roomCheckMessage, setRoomCheckMessage] = useState("");
  const [dismissingHazard, setDismissingHazard] = useState<string | null>(null);
  const [activeHazardInfo, setActiveHazardInfo] = useState<string | null>(null);
  const [activeMobileItemInfo, setActiveMobileItemInfo] = useState<string | null>(null);
  const [exitingItems, setExitingItems] = useState<string[]>([]);
  const roomSceneRef = useRef<HTMLDivElement>(null);
  const mobileRoomSceneRef = useRef<HTMLDivElement>(null);
  const hazardInFlight = useRef<string | null>(null);
  const [roomSceneReady, setRoomSceneReady] = useState(false);
  // 只有資料明確標記 required 的兔子用品會阻擋通關；建議項與暫用素材不會造成完成判定卡住。
  const requiredRoomItems = activeRoomItems.filter((item) => item.required);
  const itemsDone = requiredRoomItems.filter((item) => selectedItems.includes(item.id)).length;
  // 只計算目前物種資料中存在的危險物 ID，避免舊進度造成完成判定失真。
  const hazardsDone = activeHazards.filter((item) => securedHazards.includes(item.id)).length;
  const hazardsCleared = hazardsDone === activeHazards.length;
  const complete = itemsDone === requiredRoomItems.length && hazardsDone === activeHazards.length;
  const mobileRoomComplete = hazardsCleared && activeRoomItems.every((item) => selectedItems.includes(item.id));
  const activeHazard = activeHazards.find((item) => item.id === activeHazardInfo);
  const isSceneSafe = Boolean(roomScene.safeBackgroundWhenItemId && selectedItems.includes(roomScene.safeBackgroundWhenItemId));
  const roomFlow = speciesConfig.roomFlow;
  const [insideRoomView, setInsideRoomView] = useState(false);
  const floorHazardComplete = Boolean(roomFlow && (roomFlow.safeWhenAllHazards ? hazardsCleared : securedHazards.includes(roomFlow.floorHazardId)));
  const hasInteriorRoomFlow = Boolean(roomFlow?.hasInteriorView ?? (roomFlow?.fenceItemId && roomFlow.interiorItemId && roomFlow.interiorBackground && roomFlow.interiorSafeBackground));
  const fencePlaced = Boolean(roomFlow?.fenceItemId && selectedItems.includes(roomFlow.fenceItemId));
  const entryRequiredItemIds = roomFlow?.entryRequiredItemIds ?? (roomFlow?.fenceItemId ? [roomFlow.fenceItemId] : []);
  const entryReady = Boolean(hasInteriorRoomFlow && entryRequiredItemIds.every((id) => selectedItems.includes(id)));
  const outsideItemIds = roomFlow?.outsideItemIds ?? (roomFlow?.fenceItemId ? [roomFlow.fenceItemId] : []);
  const insideView = Boolean(hasInteriorRoomFlow && entryReady && insideRoomView);
  const interiorRequiredItemIds = roomFlow?.interiorRequiredItemIds
    ?? requiredRoomItems.filter((item) => !outsideItemIds.includes(item.id)).map((item) => item.id);
  const interiorItemsComplete = interiorRequiredItemIds.length > 0
    && interiorRequiredItemIds.every((id) => selectedItems.includes(id));
  const shouldPromptInteriorEntry = Boolean(
    hasInteriorRoomFlow
    && fencePlaced
    && entryReady
    && !insideView
    && !interiorItemsComplete,
  );
  const interiorUsesOwnAspectRatio = Boolean(insideView && roomFlow?.interiorBackgroundAspectRatio && roomFlow.interiorBackgroundAspectRatio !== "match-room");
  const interiorItemId = roomFlow?.interiorItemId;
  const interiorItemPlaced = Boolean(interiorItemId && selectedItems.includes(interiorItemId));
  const matchingInteriorBackground = roomFlow?.interiorBackgroundStates
    ?.filter((state) => state.whenItemIds.every((id) => selectedItems.includes(id)))
    .at(-1)?.background;
  const matchingInteriorMobileBackground = roomFlow?.interiorMobileBackgroundStates
    ?.filter((state) => state.whenItemIds.every((id) => selectedItems.includes(id)))
    .at(-1)?.background;
  const roomBackground = roomFlow
    ? (insideView ? (matchingInteriorBackground ?? (interiorItemPlaced ? roomFlow.interiorSafeBackground ?? roomFlow.safeBackground : roomFlow.interiorBackground ?? roomFlow.safeBackground)) : (floorHazardComplete ? roomFlow.safeBackground : roomFlow.initialBackground))
    : (isSceneSafe ? roomScene.safeBackground : roomScene.background);
  const mobileRoomBackground = roomFlow
    ? (insideView
      ? (matchingInteriorMobileBackground ?? (interiorItemPlaced
        ? roomFlow.interiorSafeMobileBackground ?? roomFlow.interiorSafeBackground ?? roomBackground
        : roomFlow.interiorMobileBackground ?? roomFlow.interiorBackground ?? roomBackground))
      : (floorHazardComplete ? roomFlow.safeMobileBackground ?? roomFlow.safeBackground : roomFlow.initialMobileBackground ?? roomFlow.initialBackground))
    : (isSceneSafe ? roomScene.safeBackground ?? roomBackground : roomScene.mobileBackground ?? roomBackground);
  const mobileSceneBackgroundStyle = !insideView
    ? roomScene.mobileExteriorBackgroundStyle ?? roomScene.backgroundStyle
    : roomScene.backgroundStyle;
  // 有獨立手機背景時一律用 picture 由瀏覽器切換來源，避免桌機背景層在手機籠內視角殘留。
  const usesDedicatedMobileRoomBackground = Boolean(
    insideView
      ? (roomFlow?.interiorMobileBackground || roomFlow?.interiorSafeMobileBackground || roomFlow?.interiorMobileBackgroundStates?.length)
      : (roomFlow?.initialMobileBackground || roomFlow?.safeMobileBackground),
  );
  const displayName = petName.trim() || speciesConfig.copy.animalNameFallback;
  const roomInstruction = roomFlow
    ? !hazardsCleared
      ? (roomFlow.copy.hazardInstruction ?? "在把{petName}帶回家前，先檢查生活空間。請點擊場景中的危險物品，先將它們收好。").replaceAll("{petName}", displayName)
      : hasInteriorRoomFlow && !fencePlaced
        ? (roomFlow.copy.fenceInstruction ?? "請先完成入口用品。").replaceAll("{petName}", displayName)
        : hasInteriorRoomFlow && !entryReady
          ? (roomFlow.copy.fencePlacedInstruction ?? "請先進入內部空間。").replaceAll("{petName}", displayName)
          : insideView
          ? (roomFlow.copy.interiorInstruction ?? "把需要的東西一件一件放進來吧。").replaceAll("{petName}", displayName)
          : (roomFlow.copy.completeInstruction ?? roomFlow.copy.entryReadyInstruction ?? roomFlow.copy.fencePlacedInstruction ?? "空間已整理完成。請點擊下方準備用品，將它們放進生活空間。").replaceAll("{petName}", displayName)
    : hazardsCleared
      ? "空間已整理完成。請點擊下方準備用品，將它們放進生活空間。"
      : `在把${displayName}帶回家前，先檢查生活空間。請點擊場景中的危險物品，先將它們收好。`;
  const visiblePlacedItems = activeRoomItems.filter((item) => {
    if (!selectedItems.includes(item.id) || item.id === roomScene.hidePlacedItemId) return false;
    if (roomFlow?.hiddenPlacedItemIds?.includes(item.id)) return false;
    if (!hasInteriorRoomFlow) return true;
    return insideView
      ? !outsideItemIds.includes(item.id) && item.id !== interiorItemId
      : outsideItemIds.includes(item.id);
  });
  const mobileEntryItem = visiblePlacedItems.find((item) => item.id === roomFlow?.fenceItemId);
  // 依目前物種資料切列，不能假設每種動物只有八件用品；否則第九件起會存在資料卻無法操作。
  const supplyRows = Array.from(
    { length: Math.ceil(activeRoomItems.length / 2) },
    (_, index) => activeRoomItems.slice(index * 2, index * 2 + 2),
  ).filter((row) => row.length > 0);

  useEffect(() => {
    const scenes = [roomSceneRef.current, mobileRoomSceneRef.current].filter((scene): scene is HTMLDivElement => Boolean(scene));
    const markReady = () => {
      if (scenes.some((scene) => scene.clientWidth > 0 && scene.clientHeight > 0)) setRoomSceneReady(true);
    };
    markReady();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(markReady);
    scenes.forEach((scene) => observer?.observe(scene));
    return () => observer?.disconnect();
  }, []);

  function prepareItem(id: string): boolean {
    const item = activeRoomItems.find((entry) => entry.id === id);
    if (!hazardsCleared) {
      setRoomCheckMessage("請先完成空間安全整理，再開始佈置用品。");
      return false;
    }
    if (!item || selectedItems.includes(id) || exitingItems.includes(id)) return false;
    const isOutsideItem = Boolean(roomFlow?.outsideItemIds?.includes(item.id) ?? item.id === roomFlow?.fenceItemId);
    if (hasInteriorRoomFlow && !insideView && !isOutsideItem) {
      setRoomCheckMessage(entryReady ? (roomFlow?.copy.entryReadyInstruction ?? roomFlow?.copy.fencePlacedInstruction ?? "請先進入內部空間。").replaceAll("{petName}", displayName) : roomFlow?.copy.lockedInstruction ?? "請先完成入口用品，再開始佈置裡面的用品。");
      return false;
    }
    if (hasInteriorRoomFlow && isOutsideItem && item.id !== roomFlow?.fenceItemId && !fencePlaced) {
      setRoomCheckMessage(roomFlow?.copy.lockedInstruction ?? "請先放置入口用品。");
      return false;
    }
    if (hasInteriorRoomFlow && insideView && !isOutsideItem && roomFlow?.interiorUnlockItemId && item.id !== roomFlow.interiorUnlockItemId && !selectedItems.includes(roomFlow.interiorUnlockItemId)) {
      setRoomCheckMessage((roomFlow.copy.interiorLockedInstruction ?? roomFlow.copy.lockedInstruction ?? "請先完成內部基礎配置。").replaceAll("{petName}", displayName));
      return false;
    }
    if (hasInteriorRoomFlow && item.id === roomFlow?.fenceItemId) setInsideRoomView(false);
    // 危險物品已全部清除後放入第一件用品時，自動收起仍開著的危險物品說明框。
    const isFirstPlacedItem = !activeRoomItems.some((entry) => selectedItems.includes(entry.id));
    if (isFirstPlacedItem) setActiveHazardInfo(null);
    setExitingItems((current) => [...current, id]);
    onPrepare(id);
    window.setTimeout(() => setExitingItems((current) => current.filter((itemId) => itemId !== id)), 450);
    setRoomCheckMessage("");
    return true;
  }

  function secureHazard(id: string) {
    const hazard = activeHazards.find((item) => item.id === id);
    if (!hazard) return;
    if (securedHazards.includes(id)) {
      setActiveHazardInfo(id);
      return;
    }
    if (hazardInFlight.current || dismissingHazard) return;
    hazardInFlight.current = id;
    setDismissingHazard(id);
    setRoomCheckMessage("");
    window.setTimeout(() => {
      onToggleHazard(id);
      setDismissingHazard(null);
      setActiveHazardInfo(id);
      hazardInFlight.current = null;
    }, 260);
  }

  const closeMobileInfo = useCallback(() => {
    setActiveHazardInfo(null);
    setActiveMobileItemInfo(null);
  }, [setActiveHazardInfo, setActiveMobileItemInfo]);

  function secureMobileHazard(event: MouseEvent<HTMLButtonElement>, targetId: string) {
    const scene = mobileRoomSceneRef.current;
    if (!scene) return secureHazard(targetId);
    const rect = scene.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 100;
    const y = (event.clientY - rect.top) / rect.height * 100;
    const nearby = activeHazards.filter((item) => !securedHazards.includes(item.id) && (() => {
      const area = mobileHazardArea(item, roomFlow?.floorHazardId === item.id ? roomFlow.floorHotspot : undefined);
      return Math.abs(x - area.x) <= Math.max(area.width / 2, 26 / rect.width * 100)
        && Math.abs(y - area.y) <= Math.max(area.height / 2, 26 / rect.height * 100);
    })());
    const closest = nearby.sort((a, b) => {
      const first = mobileHazardArea(a, roomFlow?.floorHazardId === a.id ? roomFlow.floorHotspot : undefined);
      const second = mobileHazardArea(b, roomFlow?.floorHazardId === b.id ? roomFlow.floorHotspot : undefined);
      return Math.hypot(x - first.x, y - first.y) - Math.hypot(x - second.x, y - second.y);
    })[0];
    secureHazard(closest?.id ?? targetId);
  }

  function secureMobileHazardFromScene(event: MouseEvent<HTMLDivElement>) {
    if (!mobileRoomSceneRef.current || hazardsCleared || (event.target as HTMLElement).closest("button")) return;
    const rect = mobileRoomSceneRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 100;
    const y = (event.clientY - rect.top) / rect.height * 100;
    const closest = activeHazards.filter((item) => !securedHazards.includes(item.id)).map((item) => {
      const area = mobileHazardArea(item, roomFlow?.floorHazardId === item.id ? roomFlow.floorHotspot : undefined);
      const within = Math.abs(x - area.x) <= Math.max(area.width / 2, 26 / rect.width * 100)
        && Math.abs(y - area.y) <= Math.max(area.height / 2, 26 / rect.height * 100);
      return { id: item.id, distance: Math.hypot(x - area.x, y - area.y), within };
    }).filter((item) => item.within).sort((a, b) => a.distance - b.distance)[0];
    if (closest) secureHazard(closest.id);
  }

  function getRoomCheckMessages() {
    const missingItems = requiredRoomItems.length - itemsDone;
    const remainingHazards = activeHazards.length - hazardsDone;
    return [
      missingItems > 0 ? `還有 ${missingItems} 件用品還沒準備好` : "",
      remainingHazards > 0 ? "還有危險物品需要處理" : "",
    ].filter(Boolean);
  }

  function completeRoomCheck() {
    if (complete) {
      setRoomCheckMessage("");
      onNext();
      return;
    }
    const messages = getRoomCheckMessages();
    setRoomCheckMessage(messages.length > 0 ? messages.join("，") : "房間還沒準備好，請再確認用品與危險物品");
  }

  const renderRoomScene = (mobile: boolean, mobileOverlay?: ReactNode) => (
          <div ref={mobile ? mobileRoomSceneRef : roomSceneRef} className={`room-scene simplified-room-scene ${roomFlow ? "room-flow-scene" : ""} ${usesDedicatedMobileRoomBackground ? "room-scene--dedicated-mobile-background" : ""} ${floorHazardComplete ? "room-scene--floor-safe" : ""} ${insideView ? "room-flow-scene--interior" : ""} ${interiorUsesOwnAspectRatio ? "room-flow-scene--custom-aspect" : ""} ${roomSceneReady || mobile ? "room-scene-ready" : ""} ${mobile ? "room-mobile-scene" : ""}`} style={interiorUsesOwnAspectRatio ? { "--room-flow-aspect-ratio": roomFlow?.interiorBackgroundAspectRatio } as CSSProperties : undefined} data-species={species} role="group" aria-label="寵物生活空間" onClick={mobile ? secureMobileHazardFromScene : undefined}>
            {!mobile && activeHazard && <HazardInfoPanel hazard={activeHazard} petName={displayName} onClose={() => setActiveHazardInfo(null)} />}
            {roomBackground ? usesDedicatedMobileRoomBackground ? <picture className="room-scene-background room-scene-background--dedicated-mobile">
              <source media="(max-width: 720px)" srcSet={mobileRoomBackground} />
              <img src={roomBackground} alt={roomScene.backgroundAlt} style={roomScene.backgroundStyle} />
            </picture> : <><img
              className={`room-scene-background room-scene-background--desktop ${roomScene.desktopBackgroundClass ?? ""} ${interiorUsesOwnAspectRatio ? "room-scene-background--portrait" : ""}`}
              src={roomBackground}
              alt={insideView ? roomScene.interiorBackgroundAlt ?? roomScene.backgroundAlt : roomScene.backgroundAlt}
              style={roomScene.backgroundStyle}
            /><img
              className={`room-scene-background room-scene-background--mobile ${roomScene.mobileBackgroundClass ?? ""} ${interiorUsesOwnAspectRatio ? "room-scene-background--portrait" : ""} ${interiorUsesOwnAspectRatio && roomFlow?.interiorBackgroundMobileFit === "cover" ? "room-scene-background--fit-cover" : ""}`}
              src={mobileRoomBackground}
              alt=""
              style={mobileSceneBackgroundStyle}
            /></> : <div className="preparation-asset-placeholder room-scene-background-placeholder" role="img" aria-label={`${insideView ? roomScene.interiorBackgroundAlt ?? roomScene.backgroundAlt : roomScene.backgroundAlt}素材待補`}>素材待補</div>}
            {visiblePlacedItems.map((item) => hasInteriorRoomFlow && item.id === roomFlow?.fenceItemId
              ? <button key={item.id} data-room-item-id={item.id} type="button" className={`room-object placed-supply auto-room-object placed-room-item--entry room-flow-entry ${shouldPromptInteriorEntry ? "is-interior-entry-prompt" : ""}`} style={roomItemPlacementStyle(item)} aria-label={entryReady ? `${roomFlow?.copy.entryLabel ?? "查看內部配置"}${shouldPromptInteriorEntry ? "，點擊進入內部繼續佈置" : ""}` : (roomFlow?.copy.fencePlacedInstruction ?? "請先完成入口用品。").replaceAll("{petName}", displayName)} disabled={!entryReady} onClick={() => { if (entryReady) { setInsideRoomView(true); if (mobile) setRoomCheckMessage(""); } }}>
                <RoomItemVisual item={item} scene />
                <span>{item.label}</span>
                {!mobile && shouldPromptInteriorEntry && <InteriorEntryPointerIcon direction={(item.mobilePlacement?.x ?? item.placement?.x ?? 50) >= 50 ? "left" : "right"} />}
              </button>
              : item.sceneParts?.length
                ? item.sceneParts.map((part) => <div key={`${item.id}-${part.id}`} data-room-item-id={item.id} className={`room-object room-object-part placed-supply auto-room-object placed-room-item--${item.id}`} style={roomScenePartPlacementStyle(part)}><img src={part.image} alt={`房間中已配置的${item.label}`} /></div>)
                : <div key={item.id} data-room-item-id={item.id} className={`room-object placed-supply auto-room-object placed-room-item--${item.id} ${item.sceneClassName ?? ""}`} style={roomItemSceneStyle(item)}><RoomItemVisual item={item} scene /><span>{item.label}</span></div>)}
            {mobile && shouldPromptInteriorEntry && mobileEntryItem && <div className={`room-mobile-entry-cue ${(mobileEntryItem.mobilePlacement?.x ?? mobileEntryItem.placement.x) >= 50 ? "room-mobile-entry-cue--left" : "room-mobile-entry-cue--right"}`} style={{
              left: `${Math.max(24, Math.min(76, (mobileEntryItem.mobilePlacement?.x ?? mobileEntryItem.placement.x) + ((mobileEntryItem.mobilePlacement?.x ?? mobileEntryItem.placement.x) >= 50 ? -21 : 21)))}%`,
              top: `${mobileEntryItem.mobilePlacement?.y ?? mobileEntryItem.placement.y}%`,
            }} aria-hidden="true"><InteriorEntryPointerIcon direction={(mobileEntryItem.mobilePlacement?.x ?? mobileEntryItem.placement.x) >= 50 ? "left" : "right"} /></div>}
            {activeHazards.filter((item) => !securedHazards.includes(item.id)).map((item) => item.hotspot
              ? <button key={item.id} type="button" className="room-floor-hazard-hotspot" style={roomHotspotStyle(item.hotspot)} aria-label={`收好危險物品：${item.label}`} onClick={(event) => mobile ? secureMobileHazard(event, item.id) : secureHazard(item.id)}><span className="room-floor-hazard-label">{item.label}</span></button>
              : roomFlow && roomFlow.floorHazardId && item.id === roomFlow.floorHazardId
                ? <button key={item.id} type="button" className="room-floor-hazard-hotspot" style={roomHotspotStyle(roomFlow.floorHotspot)} aria-label={`收好危險物品：${item.label}`} onClick={(event) => mobile ? secureMobileHazard(event, item.id) : secureHazard(item.id)}><span className="room-floor-hazard-label">{item.label}</span></button>
              : mobile ? <div key={item.id} className="room-mobile-hazard-wrap"><div className={`room-object room-hazard room-mobile-hazard-visual ${dismissingHazard === item.id ? "dismissing" : ""}`} style={roomHazardPlacementStyle(item)} aria-hidden="true">{item.image ? <img src={item.image} alt="" /> : <span className="preparation-asset-placeholder">{item.icon}</span>}<span className="room-hazard-label">{item.label}</span></div><button type="button" className="room-mobile-hazard-hit-area" style={mobileHazardAreaStyle(mobileHazardArea(item))} aria-label={`收好危險物品：${item.label}`} onClick={(event) => secureMobileHazard(event, item.id)} /></div>
              : <button key={item.id} type="button" className={`room-object room-hazard ${dismissingHazard === item.id ? "dismissing" : ""}`} style={roomHazardPlacementStyle(item)} aria-label={`收好危險物品：${item.label}`} onClick={() => secureHazard(item.id)}>{item.image ? <img src={item.image} alt="" /> : <span className="preparation-asset-placeholder" aria-hidden="true">{item.icon}</span>}<span className="room-hazard-label">{item.label}</span></button>)}
            {insideView && <button type="button" className="room-flow-return" aria-label="返回整個房間" onClick={() => setInsideRoomView(false)}>←</button>}
            {!insideView && roomScene.doorplate && doorplatePlacement && <div className="pet-doorplate" style={roomDoorplatePlacementStyle(doorplatePlacement)}>
              <img src={roomScene.doorplate.image} alt={roomScene.doorplate.alt} />
              <span className="pet-doorplate-name">{displayName}</span>
            </div>}
            {mobileOverlay}
            {mobile && roomCheckMessage && <p className="room-mobile-scene-message" role="alert">{roomCheckMessage}</p>}
          </div>
  );

  return (
    <div className="content-wrap preparation-page room-preparation-page">
      <div className="room-preparation-desktop"><StepHeading
        title={speciesConfig.copy.roomTitle}
        body={roomInstruction}
      />
      <ol className="room-phase-progress" aria-label="房間佈置進度">
        <li className={hazardsCleared ? "done" : "active"}><span>1</span>收好危險物品 <b>{hazardsDone}／{activeHazards.length}</b></li>
        <li className={hazardsCleared ? "active" : "locked"}><span>2</span>佈置準備用品 <b>{itemsDone}／{requiredRoomItems.length}</b></li>
      </ol>
      <div className="room-preparation-layout simplified-room-layout">
        <section className="room-supply-shelf" aria-label="生活用品準備區">
          <div className="room-supply-header">
            <h2><span className="room-supply-header-icon"><StorageBoxIcon /></span>用品準備箱</h2>{!hazardsCleared && <span>請先完成空間安全整理</span>}
          </div>
          <div className="room-supply-rows">
            {supplyRows.map((row, rowIndex) => <div key={`${rowIndex}-${row.map((item) => item.id).join("-")}`} className={`room-supply-row room-supply-row--${row.length} full-seven`}>
              {row.map((item) => {
                const selected = selectedItems.includes(item.id);
                const expenseIds = [...(item.expenseIds ?? []), ...(item.expenseId ? [item.expenseId] : [])];
                const price = expensePriceText(Array.from(new Set(expenseIds)), species);
                const isOutsideItem = Boolean(roomFlow?.outsideItemIds?.includes(item.id) ?? item.id === roomFlow?.fenceItemId);
                const interiorItemLocked = Boolean(
                  hasInteriorRoomFlow
                  && insideView
                  && !isOutsideItem
                  && roomFlow?.interiorUnlockItemId
                  && item.id !== roomFlow.interiorUnlockItemId
                  && !selectedItems.includes(roomFlow.interiorUnlockItemId),
                );
                const canPrepare = hazardsCleared && !interiorItemLocked && (!hasInteriorRoomFlow || (insideView ? !isOutsideItem : (isOutsideItem && (item.id === roomFlow?.fenceItemId || fencePlaced))));
                return <div key={item.id} className="supply-slot">
                  {!selected ? <button type="button" className={`${exitingItems.includes(item.id) ? "departing" : ""} ${!canPrepare ? "locked" : ""}`} aria-label={`${item.label}，${canPrepare ? "可加入生活空間" : interiorItemLocked ? (roomFlow?.copy.interiorLockedInstruction ?? roomFlow?.copy.lockedInstruction ?? "請先完成內部基礎配置").replaceAll("{petName}", displayName) : fencePlaced ? roomFlow?.copy.interiorInstruction ?? "請先進入圍欄內部" : roomFlow?.copy.lockedInstruction ?? "請先放置圍欄"}`} disabled={exitingItems.includes(item.id) || !canPrepare} onClick={() => prepareItem(item.id)}>
                    <span className="room-supply-visual"><RoomItemVisual item={item} /></span>
                    <b>{item.label}</b>
                  </button> : <ItemDescriptionCard title={item.label} description={item.description.replaceAll("{petName}", displayName)} footer={price} />}
                </div>;
              })}
            </div>)}
          </div>
        </section>

        <div className="room-interaction-column">
          {renderRoomScene(false)}
          {securedHazards.length > 0 && <div className="room-hazard-review-list" aria-label="已處理的危險物品說明">
            <span className="room-hazard-review-icon" aria-hidden="true">
              <WarningTriangleIcon />
            </span>
            <div className="room-hazard-review-items">
              {activeHazards.filter((hazard) => securedHazards.includes(hazard.id)).map((hazard) => (
                <button type="button" key={hazard.id} onClick={() => setActiveHazardInfo(hazard.id)}>{hazard.label}</button>
              ))}
            </div>
          </div>}
        </div>
      </div>
      <div className="room-actions">
        {reviewing && <button className="secondary" onClick={onReplay}>↻ 再玩一次</button>}
        <div className="room-actions-right">{roomCheckMessage && <p className="room-check-message" role="alert">{roomCheckMessage}</p>}<button className="primary" onClick={completeRoomCheck}>完成房間檢查，準備出發 <span>→</span></button></div>
      </div>
      </div>
      <RoomPreparationMobile key={species} petName={displayName} scene={() => renderRoomScene(true)} firstSupplyItemId={roomScene.mobileFirstSupplyItemId} supplyTutorial={mobileSupplyTutorial} onSupplyTutorialChange={onMobileSupplyTutorialChange} hazardBackground={roomFlow?.initialMobileBackground ?? roomFlow?.initialBackground ?? roomScene.mobileBackground ?? roomScene.background ?? ""} hazards={activeHazards} items={activeRoomItems} securedHazards={securedHazards} selectedItems={selectedItems} activeHazard={activeHazard} activeItem={activeRoomItems.find((item) => item.id === activeMobileItemInfo)} hazardsCleared={hazardsCleared} lockedItemIds={hasInteriorRoomFlow && !insideView ? activeRoomItems.filter((item) => !outsideItemIds.includes(item.id)).map((item) => item.id) : []} hazardIcon={<WarningTriangleIcon />} supplyIcon={<StorageBoxIcon />} onSelectHazard={(id) => { setActiveMobileItemInfo(null); setActiveHazardInfo(id); }} onSelectItem={(id) => { setActiveHazardInfo(null); setActiveMobileItemInfo(id); }} onCloseInfo={closeMobileInfo} onPrepare={prepareItem} roomComplete={mobileRoomComplete} onComplete={completeRoomCheck} itemPrice={(item) => mobileRoomPriceText(item, species)} />
    </div>
  );
}

export function CareMemberSetup({ members, onChange, onBack, onNext }: { members: CareMember[]; onChange: (members: CareMember[]) => void; onBack: () => void; onNext: () => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const memberFormRef = useRef<HTMLDivElement>(null);
  const errorSummaryRef = useRef<HTMLParagraphElement>(null);
  const primary = members.find((member) => member.isPlayer);
  const valid = Boolean(primary?.name.trim() && primary.age && primary.age >= 1 && primary.age <= 120 && members.filter((member) => !member.isPlayer).every((member) => member.name.trim() && (member.age === null || (member.age >= 1 && member.age <= 120))));

  function updateMember(id: string, patch: Partial<CareMember>) { onChange(members.map((member) => member.id === id ? { ...member, ...patch } : member)); }
  function addMember() { if (members.length < 6) onChange([...members, { id: `member-${Date.now()}`, name: "", age: null, isPlayer: false }]); }
  function validate() {
    const nextErrors: Record<string, string> = {};
    members.forEach((member) => {
      if (!member.name.trim()) nextErrors[`${member.id}-name`] = member.isPlayer ? "請填寫主要照顧者稱呼。" : "請填寫共同照護者稱呼。";
      if (member.isPlayer && (member.age === null || member.age < 1 || member.age > 120)) nextErrors[`${member.id}-age`] = "請輸入 1～120 歲。";
      if (!member.isPlayer && member.age !== null && (member.age < 1 || member.age > 120)) nextErrors[`${member.id}-age`] = "年齡如有填寫，請輸入 1～120 歲。";
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onNext();
      return;
    }
    window.setTimeout(() => {
      const firstInvalid = memberFormRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      (firstInvalid ?? errorSummaryRef.current)?.focus();
    }, 0);
  }

  return <div className="content-wrap preparation-page">
    <StepHeading title="設定主要飼養者與共同照護者" body="先填寫主要飼養者；若確實有人可以一起照護，再新增共同照護者即可。" />
    <div ref={memberFormRef} className="member-grid">{Object.keys(errors).length > 0 && <p ref={errorSummaryRef} className="field-error" role="alert" tabIndex={-1}>請先完成或修正標示的成員資料。</p>}{members.map((member) => <article className="member-card" key={member.id}><div className="member-card-head"><span>{member.isPlayer ? "主" : "協"}</span><div><b>{member.isPlayer ? "主要飼養者" : "共同照護者"}</b><small>{member.isPlayer ? "名稱與年齡必填" : "名稱必填，年齡選填"}</small></div>{!member.isPlayer && <button type="button" onClick={() => onChange(members.filter((item) => item.id !== member.id))}>移除</button>}</div><label>名稱或稱呼<input value={member.name} placeholder={member.isPlayer ? "例：小美" : "例：媽媽"} aria-invalid={Boolean(errors[`${member.id}-name`])} onChange={(event) => updateMember(member.id, { name: event.target.value })} /></label>{errors[`${member.id}-name`] && <p className="field-error" role="alert">{errors[`${member.id}-name`]}</p>}<label>年齡{!member.isPlayer && <small>（選填）</small>}<input type="number" inputMode="numeric" min="1" max="120" value={member.age ?? ""} placeholder="例：35" aria-invalid={Boolean(errors[`${member.id}-age`])} onChange={(event) => updateMember(member.id, { age: event.target.value ? Number(event.target.value) : null })} /></label>{errors[`${member.id}-age`] && <p className="field-error" role="alert">{errors[`${member.id}-age`]}</p>}</article>)}</div>
    <button type="button" className="add-member-button" onClick={addMember} disabled={members.length >= 6}>＋新增共同照護者 <small>{members.length - 1} / 5</small></button>
    <div className={`task-message ${valid ? "success" : ""}`}>{valid ? "照顧成員資料已完成，可以整理出發用品。" : "請先完成主要照顧者資料；共同照護者只需填寫真實存在的人選。"}</div>
    <NavButtons onBack={onBack} onNext={validate} nextLabel="成員完成，準備出發" />
  </div>;
}

export function CarTrunkPreparation({ selected, petName, species = "dog", onSelect, onReplay, onNext, reviewing = false }: { selected: string[]; petName: string; breed: string; species?: string; onSelect: (id: string) => void; onReplay: () => void; onNext: () => void; reviewing?: boolean }) {
  const speciesConfig = getSpeciesConfig(species);
  const displayName = petName.trim() || speciesConfig.copy.animalNameFallback;
  const activeTrunkItems = speciesConfig.trunkItems;
  const departureScene = speciesConfig.preparation.departureScene;
  const [exitingItems, setExitingItems] = useState<string[]>([]);
  const [departing, setDeparting] = useState(false);
  const [mobileStarted, setMobileStarted] = useState(false);
  const [mobileInfo, setMobileInfo] = useState<MobileInfoSheetContent | null>(null);
  const [pendingMobileInfoItemIds, setPendingMobileInfoItemIds] = useState<Set<string>>(() => new Set());
  const documents = activeTrunkItems.filter((item) => item.kind === "document");
  const supplies = activeTrunkItems.filter((item) => item.kind === "supply");
  const documentDone = documents.filter((item) => selected.includes(item.id)).length;
  const supplyDone = supplies.filter((item) => selected.includes(item.id)).length;
  const complete = documentDone === documents.length && supplyDone === supplies.length;
  const supplyRows = Array.from(
    { length: Math.ceil(activeTrunkItems.length / 2) },
    (_, index) => activeTrunkItems.slice(index * 2, index * 2 + 2),
  ).filter((row) => row.length > 0);
  function selectItem(id: string) {
    if (selected.includes(id) || exitingItems.includes(id)) return;
    setExitingItems((current) => [...current, id]);
    window.setTimeout(() => {
      onSelect(id);
      setExitingItems((current) => current.filter((itemId) => itemId !== id));
      setPendingMobileInfoItemIds((current) => new Set(current).add(id));
    }, 360);
  }

  function openMobileItemInfo(item: typeof activeTrunkItems[number], price: string | undefined) {
    setPendingMobileInfoItemIds((current) => {
      if (!current.has(item.id)) return current;
      const next = new Set(current);
      next.delete(item.id);
      return next;
    });
    setMobileInfo({ title: item.label, description: item.description.replaceAll("{petName}", displayName), image: item.image, price });
  }

  function depart() { setDeparting(true); window.setTimeout(onNext, 650); }

  return <div className={`content-wrap preparation-page departure-preparation-page${mobileStarted ? " is-mobile-started" : " is-mobile-intro"}`}>
    <MobileStageIntro id="departure-mobile-intro-title" icon={<DepartureIntroIcon />} title={speciesConfig.copy.departureTitle} description={speciesConfig.copy.departureBody(petName)} actionLabel="開始出發前準備" onStart={() => setMobileStarted(true)} />
    <StepHeading title={speciesConfig.copy.departureTitle} body={speciesConfig.copy.departureBody(petName)} />
    <div className={`departure-layout ${departing ? "departing" : ""}`}>
      <aside className="departure-supply-shelf" aria-label="準備物品">
        <div className="departure-mobile-heading"><h1>{speciesConfig.copy.departureTitle}</h1><p>{speciesConfig.copy.departureBody(petName)}</p></div>
        <div className="departure-supply-header"><h2><span className="departure-supply-header-icon"><StorageBoxIcon /></span>準備物品</h2></div>
        <div className="departure-supply-rows">
          {supplyRows.map((row, index) => <div className={`departure-supply-row departure-supply-row--${row.length}`} key={`${row.map((item) => item.id).join("-")}-${index}`}>
            {row.map((item) => {
              const itemSelected = selected.includes(item.id);
              const price = expensePriceText(item.expenseIds ?? [], species);
              const reusedExpense = (item.reusedExpenseIds?.length ?? 0) > 0;
              const mobilePrice = item.priceNote ?? (reusedExpense ? "已於房間準備計入" : mobileExpensePriceText(item.expenseIds ?? [], species));
              const hidePriceForReusedItem = departureScene.hidePriceForReusedItemIds?.includes(item.id);
              return <div key={item.id} className="supply-slot">
                {!itemSelected ? <button type="button" className={exitingItems.includes(item.id) ? "departing" : ""} onClick={() => selectItem(item.id)} aria-label={`準備${item.label}`}>
                  <span className="departure-supply-visual">{item.image ? <img className={`departure-item-image departure-item-image--${item.visualClassName ?? item.id}`} style={item.visualScale === undefined ? undefined : { "--departure-item-image-scale": item.visualScale } as CSSProperties} src={item.image} alt="" /> : <span className="preparation-asset-placeholder" aria-label={`${item.label}素材待補`}>素材待補</span>}</span><b>{item.label}</b>
                </button> : <><ItemDescriptionCard className="departure-desktop-note" title={item.label} description={item.description.replaceAll("{petName}", displayName)} footer={item.priceNote ?? (reusedExpense ? "已於房間準備計入" : price && !hidePriceForReusedItem ? price : undefined)} /><button type="button" className={`departure-mobile-done${pendingMobileInfoItemIds.has(item.id) ? " is-awaiting-info" : ""}`} onClick={() => openMobileItemInfo(item, mobilePrice || undefined)} aria-label={`查看${item.label}說明`}><span className="departure-supply-visual">{item.image && <img src={item.image} alt="" />}</span><b>{item.label}</b><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4.5 4.5L19 7" /></svg></span></button></>}
              </div>;
            })}
          </div>)}
        </div>
      </aside>

      <section className="departure-car" aria-label="已打開的汽車後車廂與自動配置用品">
        {departureScene.trunkBackground ? <img className="car-trunk-background" src={departureScene.trunkBackground} alt={departureScene.trunkBackgroundAlt} /> : <div className="car-trunk-background preparation-asset-placeholder" role="img" aria-label="接回家場景素材待補">素材待補</div>}
        {documents.some((item) => selected.includes(item.id) && item.visualRole === "document-folder") && <div className="car-document-folder complete">{departureScene.documentFolderImage ? <img src={departureScene.documentFolderImage} alt={departureScene.documentFolderAlt} /> : <span className="preparation-asset-placeholder">文件夾素材待補</span>}</div>}
        {documents.filter((item) => selected.includes(item.id) && item.image && item.visualRole === "identity-card").map((item) => <img key={item.id} className={`placed-car-item placed-car-${item.id}`} style={{ left: `${item.placement.x}%`, top: `${item.placement.y}%`, width: `${item.placement.width}%`, zIndex: item.placement.layer }} src={item.image} alt={`已放入文件夾的${item.label}`} />)}
        {supplies.filter((item) => selected.includes(item.id)).map((item) => item.image ? <img key={item.id} className={`placed-car-item placed-car-${item.id}`} style={{ left: `${item.placement.x}%`, top: `${item.placement.y}%`, width: `${item.placement.width}%`, zIndex: item.placement.layer }} src={item.image} alt={`後車廂內的${item.label}`} /> : <div key={item.id} className={`placed-car-item placed-car-${item.id} preparation-asset-placeholder`} style={{ left: `${item.placement.x}%`, top: `${item.placement.y}%`, width: `${item.placement.width}%`, zIndex: item.placement.layer }} role="img" aria-label={`已準備${item.label}，素材待補`}>{item.label}</div>)}
      </section>
    </div>
    <div className={`departure-actions${complete ? " is-complete" : ""}`}>
      {reviewing && <button type="button" className="secondary departure-return-button is-replay" onClick={onReplay}>↻ 再玩一次</button>}
      <div><button type="button" className="primary" onClick={depart} disabled={!complete}>出發接牠 <span>→</span></button></div>
    </div>
    <MobileInfoSheet content={mobileInfo} onClose={() => setMobileInfo(null)} />
  </div>;
}
