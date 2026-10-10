"use client";

/* eslint-disable @next/next/no-img-element -- Room and departure scenes rely on native image sizing for existing drag coordinates and overlays. */

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { getExpenseForSpecies, money } from "../../data/shared/expenses";
import { initialHomeReadinessState, type HomeReadinessState } from "../../data/shared/home-readiness-state";
import { getSpeciesConfig } from "../../data/species/index";
import type { CareMember, ExpenseRecord, HazardItem, RoomItem } from "../../game-types";
import { NavButtons, StepHeading } from "../shared/SharedComponents";
import type { HomeReadinessTextBlock, HomeReadinessTextSegment } from "../../data/shared/home-readiness-types";
import { sharedAssets } from "../../data/shared/assets";

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
  </div>;
}

function expensePriceText(expenseIds: string[] = [], species: string) {
  const prices = expenseIds.map((id) => getExpenseForSpecies(id, species)).filter((item): item is ExpenseRecord => Boolean(item));
  if (prices.length === 0) return "";
  const total = prices.reduce((sum, item) => sum + item.amount, 0);
  return `NT$${money.format(total)}`;
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
  } as CSSProperties;
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

function roomDoorplatePlacementStyle(placement: {
  desktop: { x: number; y: number; width: number };
  mobile: { x: number; y: number; width: number };
  mobileText: { left: number; top: number; width: number; height: number; fontSize: number };
}): CSSProperties {
  return {
    left: `${placement.desktop.x}%`,
    top: `${placement.desktop.y}%`,
    width: `${placement.desktop.width}%`,
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

export function RoomPreparation({
  selectedItems,
  securedHazards,
  petName,
  onPrepare,
  onToggleHazard,
  onBack,
  onReplay,
  onNext,
  reviewing = false,
  species = "dog",
}: {
  selectedItems: string[];
  securedHazards: string[];
  petName: string;
  onPrepare: (id: string) => void;
  onToggleHazard: (id: string) => void;
  onBack: () => void;
  onReplay: () => void;
  onNext: () => void;
  reviewing?: boolean;
  breed: string;
  species?: string;
}) {
  const speciesConfig = getSpeciesConfig(species);
  const doorplatePlacement = speciesConfig.layout.roomDoorplatePlacement;
  const roomScene = speciesConfig.preparation.roomScene;
  const activeRoomItems = speciesConfig.roomItems;
  const activeHazards = speciesConfig.hazards;
  const [roomCheckMessage, setRoomCheckMessage] = useState("");
  const [dismissingHazard, setDismissingHazard] = useState<string | null>(null);
  const [activeHazardInfo, setActiveHazardInfo] = useState<string | null>(null);
  const [exitingItems, setExitingItems] = useState<string[]>([]);
  const roomSceneRef = useRef<HTMLDivElement>(null);
  const [roomSceneReady, setRoomSceneReady] = useState(false);
  // 只有資料明確標記 required 的兔子用品會阻擋通關；建議項與暫用素材不會造成完成判定卡住。
  const requiredRoomItems = activeRoomItems.filter((item) => item.required);
  const itemsDone = requiredRoomItems.filter((item) => selectedItems.includes(item.id)).length;
  // 只計算目前物種資料中存在的危險物 ID，避免舊進度造成完成判定失真。
  const hazardsDone = activeHazards.filter((item) => securedHazards.includes(item.id)).length;
  const hazardsCleared = hazardsDone === activeHazards.length;
  const complete = itemsDone === requiredRoomItems.length && hazardsDone === activeHazards.length;
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
  const interiorUsesOwnAspectRatio = Boolean(insideView && roomFlow?.interiorBackgroundAspectRatio && roomFlow.interiorBackgroundAspectRatio !== "match-room");
  const interiorItemId = roomFlow?.interiorItemId;
  const interiorItemPlaced = Boolean(interiorItemId && selectedItems.includes(interiorItemId));
  const roomBackground = roomFlow
    ? (insideView ? (interiorItemPlaced ? roomFlow.interiorSafeBackground ?? roomFlow.safeBackground : roomFlow.interiorBackground ?? roomFlow.safeBackground) : (floorHazardComplete ? roomFlow.safeBackground : roomFlow.initialBackground))
    : (isSceneSafe ? roomScene.safeBackground : roomScene.background);
  const mobileRoomBackground = roomFlow
    ? (insideView
      ? roomBackground
      : (floorHazardComplete ? roomFlow.safeMobileBackground ?? roomFlow.safeBackground : roomFlow.initialMobileBackground ?? roomFlow.initialBackground))
    : (isSceneSafe ? roomScene.safeBackground ?? roomBackground : roomScene.mobileBackground ?? roomBackground);
  // 只有犬隻目前提供獨立手機背景；用 picture 在素材層切換，避免影響其他頁面的 CSS。
  const usesDedicatedMobileRoomBackground = Boolean(!insideView && (roomFlow?.initialMobileBackground || roomFlow?.safeMobileBackground));
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
    if (!hasInteriorRoomFlow) return true;
    return insideView
      ? !outsideItemIds.includes(item.id) && item.id !== interiorItemId
      : outsideItemIds.includes(item.id);
  });
  // 依目前物種資料切列，不能假設每種動物只有八件用品；否則第九件起會存在資料卻無法操作。
  const supplyRows = Array.from(
    { length: Math.ceil(activeRoomItems.length / 2) },
    (_, index) => activeRoomItems.slice(index * 2, index * 2 + 2),
  ).filter((row) => row.length > 0);

  useEffect(() => {
    const scene = roomSceneRef.current;
    if (!scene) return;
    const markReady = () => {
      if (scene.clientWidth > 0 && scene.clientHeight > 0) setRoomSceneReady(true);
    };
    markReady();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(markReady);
    observer?.observe(scene);
    return () => observer?.disconnect();
  }, []);

  function prepareItem(id: string) {
    const item = activeRoomItems.find((entry) => entry.id === id);
    if (!hazardsCleared) {
      setRoomCheckMessage("請先完成空間安全整理，再開始佈置用品。");
      return;
    }
    if (!item || selectedItems.includes(id) || exitingItems.includes(id)) return;
    const isOutsideItem = Boolean(roomFlow?.outsideItemIds?.includes(item.id) ?? item.id === roomFlow?.fenceItemId);
    if (hasInteriorRoomFlow && !insideView && !isOutsideItem) {
      setRoomCheckMessage(entryReady ? (roomFlow?.copy.entryReadyInstruction ?? roomFlow?.copy.fencePlacedInstruction ?? "請先進入內部空間。").replaceAll("{petName}", displayName) : roomFlow?.copy.lockedInstruction ?? "請先完成入口用品，再開始佈置裡面的用品。");
      return;
    }
    if (hasInteriorRoomFlow && isOutsideItem && item.id !== roomFlow?.fenceItemId && !fencePlaced) {
      setRoomCheckMessage(roomFlow?.copy.lockedInstruction ?? "請先放置入口用品。");
      return;
    }
    if (hasInteriorRoomFlow && item.id === roomFlow?.fenceItemId) setInsideRoomView(false);
    setExitingItems((current) => [...current, id]);
    onPrepare(id);
    window.setTimeout(() => setExitingItems((current) => current.filter((itemId) => itemId !== id)), 450);
    setRoomCheckMessage("");
  }

  function secureHazard(id: string) {
    const hazard = activeHazards.find((item) => item.id === id);
    if (!hazard || securedHazards.includes(id) || dismissingHazard) return;
    setDismissingHazard(id);
    setRoomCheckMessage("");
    window.setTimeout(() => {
      onToggleHazard(id);
      setDismissingHazard(null);
      setActiveHazardInfo(id);
    }, 260);
    window.setTimeout(() => setActiveHazardInfo((current) => current === id ? null : current), 4260);
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

  return (
    <div className="content-wrap preparation-page">
      <StepHeading
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
            <h2>用品準備箱</h2>{!hazardsCleared && <span>請先完成空間安全整理</span>}
          </div>
          <div className="room-supply-rows">
            {supplyRows.map((row, rowIndex) => <div key={`${rowIndex}-${row.map((item) => item.id).join("-")}`} className={`room-supply-row room-supply-row--${row.length} full-seven`}>
              {row.map((item) => {
                const selected = selectedItems.includes(item.id);
                const note = { label: item.label, note: item.description };
                const expenseIds = [...(item.expenseIds ?? []), ...(item.expenseId ? [item.expenseId] : [])];
                const price = expensePriceText(Array.from(new Set(expenseIds)), species);
                const isOutsideItem = Boolean(roomFlow?.outsideItemIds?.includes(item.id) ?? item.id === roomFlow?.fenceItemId);
                const canPrepare = hazardsCleared && (!hasInteriorRoomFlow || (insideView ? !isOutsideItem : (isOutsideItem && (item.id === roomFlow?.fenceItemId || fencePlaced))));
                return <div key={item.id} className="supply-slot">
                  {!selected ? <button type="button" className={`${exitingItems.includes(item.id) ? "departing" : ""} ${!canPrepare ? "locked" : ""}`} aria-label={`${item.label}，${canPrepare ? "可加入生活空間" : fencePlaced ? roomFlow?.copy.interiorInstruction ?? "請先進入圍欄內部" : roomFlow?.copy.lockedInstruction ?? "請先放置圍欄"}`} disabled={exitingItems.includes(item.id) || !canPrepare} onClick={() => prepareItem(item.id)}>
                    <span className="room-supply-visual"><RoomItemVisual item={item} /></span>
                    <b>{item.label}</b>
                  </button> : <div className="supply-slot-note" aria-live="polite"><b>{note.label}</b><small>{note.note}</small>{price && <span className="supply-slot-price">{price}</span>}</div>}
                </div>;
              })}
            </div>)}
          </div>
        </section>

        <div className="room-interaction-column">
          {activeHazard && <section className="room-hazard-alert" role="status" aria-live="polite"><h2>{activeHazard.label}已收起</h2><p><b>為什麼危險：</b>{activeHazard.danger.replaceAll("{petName}", displayName)}</p><p><b>建議如何處理：</b>{activeHazard.handling.replaceAll("{petName}", displayName)}</p></section>}
          <div ref={roomSceneRef} className={`room-scene simplified-room-scene ${roomFlow ? "room-flow-scene" : ""} ${usesDedicatedMobileRoomBackground ? "room-scene--dedicated-mobile-background" : ""} ${floorHazardComplete ? "room-scene--floor-safe" : ""} ${insideView ? "room-flow-scene--interior" : ""} ${interiorUsesOwnAspectRatio ? "room-flow-scene--custom-aspect" : ""} ${roomSceneReady ? "room-scene-ready" : ""}`} style={interiorUsesOwnAspectRatio ? { "--room-flow-aspect-ratio": roomFlow?.interiorBackgroundAspectRatio } as CSSProperties : undefined} role="group" aria-label="寵物生活空間">
            {roomBackground ? usesDedicatedMobileRoomBackground ? <picture className="room-scene-background room-scene-background--dedicated-mobile">
              <source media="(max-width: 720px)" srcSet={mobileRoomBackground} />
              <img src={roomBackground} alt={roomScene.backgroundAlt} style={roomScene.backgroundStyle} />
            </picture> : <><img
              className={`room-scene-background room-scene-background--desktop ${roomScene.desktopBackgroundClass ?? "room-scene-background--cat"} ${interiorUsesOwnAspectRatio ? "room-scene-background--portrait" : ""}`}
              src={roomBackground}
              alt={insideView ? roomScene.interiorBackgroundAlt ?? roomScene.backgroundAlt : roomScene.backgroundAlt}
              style={roomScene.backgroundStyle}
            /><img
              className={`room-scene-background room-scene-background--mobile ${roomScene.mobileBackgroundClass ?? ""} ${interiorUsesOwnAspectRatio ? "room-scene-background--portrait" : ""}`}
              src={mobileRoomBackground}
              alt=""
              style={roomScene.backgroundStyle}
            /></> : <div className="preparation-asset-placeholder hamster-room-background-placeholder" role="img" aria-label={insideView ? "倉鼠籠內背景素材待補" : "倉鼠房間背景素材待補"}>素材待補</div>}
            {visiblePlacedItems.map((item) => hasInteriorRoomFlow && item.id === roomFlow?.fenceItemId
              ? <button key={item.id} type="button" className="room-object placed-supply auto-room-object placed-room-item--entry room-flow-entry" style={roomItemPlacementStyle(item)} aria-label={entryReady ? roomFlow?.copy.entryLabel ?? "查看內部配置" : (roomFlow?.copy.fencePlacedInstruction ?? "請先完成入口用品。").replaceAll("{petName}", displayName)} disabled={!entryReady} onClick={() => setInsideRoomView(true)}><RoomItemVisual item={item} scene /><span>{item.label}</span></button>
              : item.sceneParts?.length
                ? item.sceneParts.map((part) => <div key={`${item.id}-${part.id}`} className={`room-object room-object-part placed-supply auto-room-object placed-room-item--${item.id}`} style={roomScenePartPlacementStyle(part)}><img src={part.image} alt={`房間中已配置的${item.label}`} /></div>)
                : <div key={item.id} className={`room-object placed-supply auto-room-object placed-room-item--${item.id}`} style={roomItemPlacementStyle(item)}><RoomItemVisual item={item} scene /><span>{item.label}</span></div>)}
            {activeHazards.filter((item) => !securedHazards.includes(item.id)).map((item) => roomFlow && roomFlow.floorHazardId && item.id === roomFlow.floorHazardId
              ? <button key={item.id} type="button" className="room-floor-hazard-hotspot" style={roomHotspotStyle(roomFlow.floorHotspot)} aria-label={`收好危險物品：${item.label}`} onClick={() => secureHazard(item.id)}><span>{item.label}</span></button>
              : <button key={item.id} type="button" className={`room-object room-hazard ${dismissingHazard === item.id ? "dismissing" : ""}`} style={roomHazardPlacementStyle(item)} aria-label={`收好危險物品：${item.label}`} onClick={() => secureHazard(item.id)}>{item.image ? <img src={item.image} alt="" /> : <span className="preparation-asset-placeholder" aria-hidden="true">{item.icon}</span>}<span>{item.label}</span></button>)}
            {insideView && <button type="button" className="room-flow-return" aria-label="返回整個房間" onClick={() => setInsideRoomView(false)}>←</button>}
            {!hasInteriorRoomFlow && roomScene.doorplate && <div className="pet-doorplate" style={roomDoorplatePlacementStyle(doorplatePlacement)}>
              <img src={roomScene.doorplate.image} alt={roomScene.doorplate.alt} />
              <span className="pet-doorplate-name">{displayName}</span>
            </div>}
          </div>

        </div>
      </div>
      <div className="room-actions">
        <button className="secondary" onClick={complete || reviewing ? onReplay : onBack}>{complete || reviewing ? "↻ 再玩一次" : "← 返回"}</button>
        <div className="room-actions-right">{roomCheckMessage && <p className="room-check-message" role="alert">{roomCheckMessage}</p>}<button className="primary" onClick={completeRoomCheck}>完成房間檢查，準備出發 <span>→</span></button></div>
      </div>
    </div>
  );
}

export function CareMemberSetup({ members, onChange, onBack, onNext }: { members: CareMember[]; onChange: (members: CareMember[]) => void; onBack: () => void; onNext: () => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    if (Object.keys(nextErrors).length === 0) onNext();
  }

  return <div className="content-wrap preparation-page">
    <StepHeading title="設定主要飼養者與共同照護者" body="先填寫主要飼養者；若確實有人可以一起照護，再新增共同照護者即可。" />
    <div className="member-grid">{members.map((member) => <article className="member-card" key={member.id}><div className="member-card-head"><span>{member.isPlayer ? "主" : "協"}</span><div><b>{member.isPlayer ? "主要飼養者" : "共同照護者"}</b><small>{member.isPlayer ? "名稱與年齡必填" : "名稱必填，年齡選填"}</small></div>{!member.isPlayer && <button type="button" onClick={() => onChange(members.filter((item) => item.id !== member.id))}>移除</button>}</div><label>名稱或稱呼<input value={member.name} placeholder={member.isPlayer ? "例：小美" : "例：媽媽"} onChange={(event) => updateMember(member.id, { name: event.target.value })} /></label>{errors[`${member.id}-name`] && <p className="field-error">{errors[`${member.id}-name`]}</p>}<label>年齡{!member.isPlayer && <small>（選填）</small>}<input type="number" inputMode="numeric" min="1" max="120" value={member.age ?? ""} placeholder="例：35" onChange={(event) => updateMember(member.id, { age: event.target.value ? Number(event.target.value) : null })} /></label>{errors[`${member.id}-age`] && <p className="field-error">{errors[`${member.id}-age`]}</p>}</article>)}</div>
    <button type="button" className="add-member-button" onClick={addMember} disabled={members.length >= 6}>＋新增共同照護者 <small>{members.length - 1} / 5</small></button>
    <div className={`task-message ${valid ? "success" : ""}`}>{valid ? "照顧成員資料已完成，可以整理出發用品。" : "請先完成主要照顧者資料；共同照護者只需填寫真實存在的人選。"}</div>
    <NavButtons onBack={onBack} onNext={validate} nextLabel="成員完成，準備出發" />
  </div>;
}

export function CarTrunkPreparation({ selected, petName, species = "dog", onSelect, onBack, onReplay, onNext, reviewing = false }: { selected: string[]; petName: string; breed: string; species?: string; onSelect: (id: string) => void; onBack: () => void; onReplay: () => void; onNext: () => void; reviewing?: boolean }) {
  const speciesConfig = getSpeciesConfig(species);
  const displayName = petName.trim() || speciesConfig.copy.animalNameFallback;
  const activeTrunkItems = speciesConfig.trunkItems;
  const departureScene = speciesConfig.preparation.departureScene;
  const [exitingItems, setExitingItems] = useState<string[]>([]);
  const [departing, setDeparting] = useState(false);
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
    }, 360);
  }

  function depart() { setDeparting(true); window.setTimeout(onNext, 650); }

  return <div className="content-wrap preparation-page">
    <StepHeading title={speciesConfig.copy.departureTitle} body={speciesConfig.copy.departureBody(petName)} />
    <div className={`departure-layout ${departing ? "departing" : ""}`}>
      <aside className="departure-supply-shelf" aria-label="準備物品">
        <div className="departure-supply-header"><h2>準備物品</h2></div>
        <div className="departure-supply-rows">
          {supplyRows.map((row, index) => <div className={`departure-supply-row departure-supply-row--${row.length}`} key={`${row.map((item) => item.id).join("-")}-${index}`}>
            {row.map((item) => {
              const itemSelected = selected.includes(item.id);
              const note = { label: item.label, note: item.description.replaceAll("{petName}", displayName) };
              const price = expensePriceText(item.expenseIds ?? [], species);
              const reusedExpense = (item.reusedExpenseIds?.length ?? 0) > 0;
              const hidePriceForReusedItem = departureScene.hidePriceForReusedItemIds?.includes(item.id);
              return <div key={item.id} className="supply-slot">
                {!itemSelected ? <button type="button" className={exitingItems.includes(item.id) ? "departing" : ""} onClick={() => selectItem(item.id)} aria-label={`準備${item.label}`}>
                  <span className="departure-supply-visual">{item.image ? <img className={`departure-item-image departure-item-image--${item.visualClassName ?? item.id}`} style={item.visualScale === undefined ? undefined : { "--departure-item-image-scale": item.visualScale } as CSSProperties} src={item.image} alt="" /> : <span className="preparation-asset-placeholder" aria-label={`${item.label}素材待補`}>素材待補</span>}</span><b>{item.label}</b>
                </button> : <div className="supply-slot-note" aria-live="polite"><b>{note.label}</b><small>{note.note}</small>{reusedExpense ? <span className="supply-slot-price">已於房間準備計入</span> : price && !hidePriceForReusedItem && <span className="supply-slot-price">{price}</span>}</div>}
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
    <div className="departure-actions">
      <button type="button" className="secondary" onClick={complete || reviewing ? onReplay : onBack}>{complete || reviewing ? "↻ 再玩一次" : "← 返回"}</button>
      <div><button type="button" className="primary" onClick={depart} disabled={!complete}>出發接牠 <span>→</span></button></div>
    </div>
  </div>;
}
