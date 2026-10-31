"use client";

/* eslint-disable @next/next/no-img-element -- The walking scene uses native layered images for animation and drag coordinates. */
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { walkingActivityConfig, walkingLawCopy, walkingPreloadImages, walkingPrepItems, walkingSceneLayout, walkingScenes } from "../../../../data/species/dog/activities";
import type { LifeActivityState } from "../../../../game-types";
import { DailyCareCompletion } from "../../DailyCareCompletion";
import { useMobileLayout } from "../../../shared/useMobileLayout";
import { renderKnowledgeText, withPetName } from "../activity-ui";
import { useTapSequence } from "../useTapSequence";

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

type WalkingPathPoint = {
  x: number;
  y: number;
  scale: number;
};

function getWalkingCompletionPosition(sceneIndex: number) {
  return walkingActivityConfig.interaction.completionAtByScene[sceneIndex] ?? 100;
}

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, value));
}

function interpolateWalkingPoint(start: WalkingPathPoint, waypoint: WalkingPathPoint | undefined, end: WalkingPathPoint, progress: number, turnAt = 0.55) {
  const safeProgress = Math.max(0, Math.min(1, progress));
  const safeTurnAt = Math.max(0.05, Math.min(0.95, turnAt));
  const hasWaypoint = Boolean(waypoint);
  const segmentProgress = hasWaypoint
    ? (safeProgress <= safeTurnAt ? safeProgress / safeTurnAt : (safeProgress - safeTurnAt) / (1 - safeTurnAt))
    : safeProgress;
  const from = hasWaypoint && safeProgress > safeTurnAt ? waypoint! : start;
  const to = hasWaypoint && safeProgress <= safeTurnAt ? waypoint! : end;

  return {
    x: clampPercent(lerp(from.x, to.x, segmentProgress)),
    y: clampPercent(lerp(from.y, to.y, segmentProgress)),
    scale: Math.max(0.05, lerp(from.scale, to.scale, segmentProgress)),
  };
}

function getWalkingCharacterStyle(sceneIndex: number, position: number, mobile = false): CSSProperties {
  const layout = walkingSceneLayout[sceneIndex];
  const completionPosition = getWalkingCompletionPosition(sceneIndex);
  const progress = Math.max(0, Math.min(1, position / completionPosition));

  const start = mobile
    ? { x: layout.mobileStartX, y: layout.mobileStartY, scale: layout.mobileScale }
    : { x: layout.startX, y: layout.startY, scale: layout.scale };
  const end = mobile
    ? { x: layout.mobileEndX ?? layout.endX, y: layout.mobileEndY ?? layout.endY, scale: layout.mobileEndScale ?? layout.endScale ?? layout.scale }
    : { x: layout.endX, y: layout.endY, scale: layout.endScale ?? layout.scale };
  const waypoint = mobile ? layout.mobileWaypoint : layout.waypoint;
  const point = interpolateWalkingPoint(start, waypoint, end, progress, layout.turnAt);

  return {
    "--walk-left": `${point.x}%`,
    "--walk-top": `${point.y}%`,
    "--walk-scale": point.scale,
  } as CSSProperties;
}

export function WalkingActivity({
  activity,
  petName,
  onChange,
  expenseIds,
  onPlayExpenseSequence,
  onContinue,
}: {
  activity: LifeActivityState;
  petName: string;
  onChange: (patch: Partial<LifeActivityState>) => void;
  expenseIds?: readonly string[];
  onPlayExpenseSequence?: (ids: readonly string[]) => Promise<void>;
  onContinue: () => void;
}) {
  const { assets, copy, interaction, prepNotes } = walkingActivityConfig;
  const forwardHoldStepMs = Math.round((interaction.stepDistance / interaction.holdSpeed) * 1000);
  const [started, setStarted] = useState(activity.walkingMinutes > 0 || activity.walkingComplete);
  const [safetyStep, setSafetyStep] = useState<"question" | "law" | "correct" | "prepared">(
    activity.walkingMinutes > 0 || activity.walkingComplete ? "prepared" : "question",
  );
  const [mobileSafetyChoice, setMobileSafetyChoice] = useState<"leash" | "offLeash" | null>(null);
  const [position, setPosition] = useState(0);
  const positionRef = useRef(0);
  const [moving, setMoving] = useState(false);
  const [message, setMessage] = useState("");
  const bagExpenseSequenceStartedRef = useRef(false);
  const completingSceneRef = useRef<number | null>(null);
  /** 長按期間的固定節奏計時器；與畫面幀率無關，避免低幀率時只播放動作卻不前進。 */
  const forwardHoldTimerRef = useRef<number | null>(null);
  const keyboardMoveTimerRef = useRef<number | null>(null);
  const mobileCleanupTimerRef = useRef<number | null>(null);
  const mobileCleanupBusyRef = useRef(false);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const poopTargetRef = useRef<HTMLDivElement | null>(null);
  const draggingBagRef = useRef(false);
  const forwardHeldRef = useRef(false);
  const [draggedBag, setDraggedBag] = useState<{ x: number; y: number } | null>(null);
  const isMobileWalkingLayout = useMobileLayout();
  const [mobilePoopCleaning, setMobilePoopCleaning] = useState(false);
  const { step: mobileCleanupStep, phase: mobileCleanupPhase, selectTool: selectMobileCleanupTool, completeTarget: completeMobileCleanupTarget } = useTapSequence(interaction.mobileCleanupSteps, 0);
  const sceneIndex = Math.min(activity.walkingSceneIndex, walkingScenes.length - 1);
  const scene = walkingScenes[sceneIndex];
  const prepared = activity.walkingPreparedItems;
  const allPrepared = walkingPrepItems.every((item) => prepared.includes(item.id));
  const needsCleanup = started && scene.poopEvent && position >= 50 && !activity.walkingPoopCleaned;
  const progressMinutes = Math.min(20, activity.walkingMinutes);
  const walkingInstruction = copy.walkInstruction;
  const walkingEventMessage = scene.poopEvent && position >= 50
    ? activity.walkingPoopCleaned
      ? copy.messages.event.complete
      : copy.messages.event.pending
    : null;
  const mobilePoopPlacement = walkingSceneLayout[sceneIndex]?.mobilePoop;
  const mobilePoopStyle = mobilePoopPlacement
    ? ({
      "--mobile-walk-poop-left": `${mobilePoopPlacement.x}%`,
      "--mobile-walk-poop-top": `${mobilePoopPlacement.y}%`,
      "--mobile-walk-poop-size": `${mobilePoopPlacement.size}%`,
    } as CSSProperties)
    : undefined;
  const desktopPoopPlacement = walkingSceneLayout[sceneIndex]?.poop;
  const desktopPoopStyle = desktopPoopPlacement
    ? ({
      "--walk-poop-left": `${desktopPoopPlacement.x}%`,
      "--walk-poop-top": `${desktopPoopPlacement.y}%`,
      "--walk-poop-size": `${desktopPoopPlacement.size}%`,
    } as CSSProperties)
    : undefined;

  useEffect(() => {
    walkingPreloadImages.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    if (needsCleanup || activity.walkingComplete) stopForward();
  }, [needsCleanup, activity.walkingComplete]);

  // 切換分頁、視窗失焦或在按鈕外放開時，按鈕可能收不到 pointerup；一律停止長按前進。
  useEffect(() => {
    const stopWhenHidden = () => { if (document.hidden) stopForward(); };
    const stopHold = () => stopForward();
    window.addEventListener("blur", stopHold);
    window.addEventListener("pointerup", stopHold);
    window.addEventListener("pointercancel", stopHold);
    document.addEventListener("visibilitychange", stopWhenHidden);
    return () => {
      window.removeEventListener("blur", stopHold);
      window.removeEventListener("pointerup", stopHold);
      window.removeEventListener("pointercancel", stopHold);
      document.removeEventListener("visibilitychange", stopWhenHidden);
    };
  }, []);

  useEffect(() => () => {
    if (forwardHoldTimerRef.current !== null) window.clearInterval(forwardHoldTimerRef.current);
    if (keyboardMoveTimerRef.current !== null) window.clearTimeout(keyboardMoveTimerRef.current);
    if (mobileCleanupTimerRef.current !== null) window.clearTimeout(mobileCleanupTimerRef.current);
  }, []);

  async function prepare(id: string) {
    if (prepared.includes(id)) return;
    onChange({ walkingPreparedItems: [...prepared, id] });
    setMessage("");

    // 每月清潔耗材的費用在散步前「選取撿便袋」時即時加入，
    // 不等待後段路上清理排泄物的拖曳互動。
    if (id === "bag" && !bagExpenseSequenceStartedRef.current) {
      bagExpenseSequenceStartedRef.current = true;
      await onPlayExpenseSequence?.(expenseIds ?? []);
    }
  }

  function startWalk() {
    if (!prepared.includes("leash")) {
      setMessage(copy.messages.leashRequired);
      return;
    }
    if (!allPrepared) {
      setMessage(copy.messages.preparationRequired);
      return;
    }
    setStarted(true);
    setMessage("");
  }

  function completeWalkingScene(completedIndex: number) {
    if (completingSceneRef.current === completedIndex) return;
    completingSceneRef.current = completedIndex;
    stopForward();
    const complete = completedIndex >= walkingScenes.length - 1;
    const nextMinutes = Math.min(20, activity.walkingMinutes + 5);
    onChange({
      walkingMinutes: nextMinutes,
      walkingSceneIndex: complete ? completedIndex : completedIndex + 1,
      walkingComplete: complete,
    });
    if (!complete) {
      positionRef.current = 0;
      setPosition(0);
    }
    setMessage(complete ? copy.messages.complete : copy.messages.sceneComplete(walkingScenes[completedIndex].title));
  }

  const advanceWalk = useCallback((distance: number) => {
    if (!started || activity.walkingComplete) return;
    if (needsCleanup) {
      setMessage(copy.messages.cleanupRequired);
      setMoving(false);
      return;
    }
    const completionPosition = getWalkingCompletionPosition(sceneIndex);
    setMoving(true);
    const current = positionRef.current;
    const cleanupBoundary = scene.poopEvent && !activity.walkingPoopCleaned ? 50 : completionPosition;
    const next = Math.min(completionPosition, cleanupBoundary, current + distance);
    if (next === current) return;
    positionRef.current = next;
    setPosition(next);
    if (next >= cleanupBoundary && cleanupBoundary < completionPosition) stopForward();
    if (next >= completionPosition && completingSceneRef.current !== sceneIndex) completeWalkingScene(sceneIndex);
  }, [activity.walkingComplete, activity.walkingPoopCleaned, activity.walkingMinutes, needsCleanup, onChange, scene.poopEvent, sceneIndex, started]); // eslint-disable-line react-hooks/exhaustive-deps -- completeWalkingScene intentionally uses the current walking state captured by these dependencies.

  // 計時器每次都呼叫最新的 advanceWalk，長按期間的事件、清理與場景完成判斷都和點擊一致。
  const advanceWalkRef = useRef(advanceWalk);
  useEffect(() => { advanceWalkRef.current = advanceWalk; }, [advanceWalk]);

  function stopForward() {
    forwardHeldRef.current = false;
    if (forwardHoldTimerRef.current !== null) window.clearInterval(forwardHoldTimerRef.current);
    forwardHoldTimerRef.current = null;
    setMoving(false);
  }

  function startForward() {
    if (!started || activity.walkingComplete || needsCleanup) {
      if (needsCleanup) setMessage(copy.messages.cleanupRequired);
      return;
    }
    if (forwardHeldRef.current) return;
    // 長按等同以固定節奏連續點擊：按下立即走一步，之後每隔一段時間再走一步。
    // 間隔由既有設定推得（步距 ÷ 長按速度），維持原本的前進速度。
    forwardHeldRef.current = true;
    advanceWalk(interaction.stepDistance);
    if (!forwardHeldRef.current) return;
    forwardHoldTimerRef.current = window.setInterval(() => {
      if (!forwardHeldRef.current) return;
      advanceWalkRef.current(interaction.stepDistance);
    }, forwardHoldStepMs);
  }

  function moveForwardByKeyboard() {
    // 原本的指標操作包含「按住」的連續移動；鍵盤則以一次按鍵前進一小步，
    // 讓 Enter 與 Space 有可預期、可重複的等價操作。
    advanceWalk(interaction.stepDistance);
    if (keyboardMoveTimerRef.current !== null) window.clearTimeout(keyboardMoveTimerRef.current);
    keyboardMoveTimerRef.current = window.setTimeout(() => {
      keyboardMoveTimerRef.current = null;
      setMoving(false);
    }, 180);
  }

  const draggedBagSize = 74;

  function getDraggedBagPosition(event: ReactPointerEvent<HTMLButtonElement>) {
    const sceneRect = sceneRef.current?.getBoundingClientRect();
    if (!sceneRect) return null;
    return {
      x: event.clientX - sceneRect.left - draggedBagSize / 2,
      y: event.clientY - sceneRect.top - draggedBagSize / 2,
    };
  }

  function startDraggingBag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!needsCleanup) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const nextPosition = getDraggedBagPosition(event);
    if (nextPosition) {
      draggingBagRef.current = true;
      setDraggedBag(nextPosition);
    }
  }

  function dragBag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!draggingBagRef.current) return;
    event.preventDefault();
    const nextPosition = getDraggedBagPosition(event);
    if (nextPosition) setDraggedBag(nextPosition);
  }

  function finishDraggingBag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!draggingBagRef.current) return;
    event.preventDefault();
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    const finalBagPosition = getDraggedBagPosition(event) ?? draggedBag;
    if (!finalBagPosition) {
      draggingBagRef.current = false;
      setDraggedBag(null);
      return;
    }
    const sceneRect = sceneRef.current?.getBoundingClientRect();
    const poopRect = poopTargetRef.current?.getBoundingClientRect();
    const tolerance = 58;
    const bagRect = {
      left: finalBagPosition.x,
      top: finalBagPosition.y,
      right: finalBagPosition.x + draggedBagSize,
      bottom: finalBagPosition.y + draggedBagSize,
      centerX: finalBagPosition.x + draggedBagSize / 2,
      centerY: finalBagPosition.y + draggedBagSize / 2,
    };
    const hitPoop = sceneRect && poopRect
      ? (
        bagRect.centerX >= poopRect.left - sceneRect.left - tolerance &&
        bagRect.centerX <= poopRect.right - sceneRect.left + tolerance &&
        bagRect.centerY >= poopRect.top - sceneRect.top - tolerance &&
        bagRect.centerY <= poopRect.bottom - sceneRect.top + tolerance
      ) || (
        bagRect.right >= poopRect.left - sceneRect.left - tolerance &&
        bagRect.left <= poopRect.right - sceneRect.left + tolerance &&
        bagRect.bottom >= poopRect.top - sceneRect.top - tolerance &&
        bagRect.top <= poopRect.bottom - sceneRect.top + tolerance
      )
      : false;

    draggingBagRef.current = false;
    setDraggedBag(null);
    if (hitPoop) cleanupPoop();
  }

  function cancelDraggingBag() {
    draggingBagRef.current = false;
    setDraggedBag(null);
  }

  function cleanupPoop() {
    if (activity.walkingPoopCleaned) return;
    stopForward();
    draggingBagRef.current = false;
    setDraggedBag(null);
    onChange({ walkingPoopCleaned: true });
    setMessage(copy.messages.cleanupComplete);
  }

  function selectMobileBag() {
    if (!isMobileWalkingLayout || !needsCleanup || mobileCleanupBusyRef.current) return;
    selectMobileCleanupTool("bag");
  }

  function cleanMobilePoop() {
    if (!isMobileWalkingLayout || !needsCleanup || mobileCleanupBusyRef.current) return;
    if (!completeMobileCleanupTarget("poop")) return;
    mobileCleanupBusyRef.current = true;
    setMobilePoopCleaning(true);
    mobileCleanupTimerRef.current = window.setTimeout(() => {
      cleanupPoop();
      setMobilePoopCleaning(false);
      mobileCleanupTimerRef.current = null;
    }, 420);
  }

  const renderWalkingEventCard = (className = "", mobile = false) => walkingEventMessage ? (
    <div className={`walking-event-card ${className}`} role="status">
      <b>{walkingEventMessage.title}</b>
      <p>{walkingEventMessage.body}</p>
      {mobile && !needsCleanup && <p className="walking-mobile-event-instruction">{copy.messages.mobileCleanupComplete}</p>}
      {needsCleanup && (
        <div className="walking-cleanup-controls">
          <div className="walking-drag-row">
            <button
              type="button"
              className={`walking-drag-bag ${draggedBag ? "is-source-dragging" : ""}${mobile && mobileCleanupPhase === "idle" ? " is-tap-prompt" : ""}${mobile && mobileCleanupPhase === "toolSelected" ? " is-tap-selected" : ""}`}
              onPointerDown={mobile ? undefined : startDraggingBag}
              onPointerMove={mobile ? undefined : dragBag}
              onPointerUp={mobile ? undefined : finishDraggingBag}
              onPointerCancel={mobile ? undefined : cancelDraggingBag}
              onClick={(event) => { if (mobile) selectMobileBag(); else if (event.detail === 0) cleanupPoop(); }}
              aria-pressed={mobile ? mobileCleanupPhase === "toolSelected" : undefined}
              aria-label={copy.aria.cleanupBag}
            >
              <img src={assets.poopBag} alt="" />
            </button>
            {mobile && <p className="walking-mobile-event-instruction">{mobileCleanupStep.prompts[mobileCleanupPhase]}</p>}
            {!mobile && <p className="walking-drag-instruction">{copy.aria.cleanupInstruction}</p>}
          </div>
        </div>
      )}
    </div>
  ) : null;

  const renderForwardButton = (mobile: boolean) => (
    <button
      type="button"
      className={`walking-forward-button ${mobile ? "walking-forward-button--mobile" : "walking-forward-button--desktop"}`}
      disabled={needsCleanup || mobilePoopCleaning}
      onPointerDown={(event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture?.(event.pointerId);
        startForward();
      }}
      onPointerUp={(event) => {
        event.currentTarget.releasePointerCapture?.(event.pointerId);
        stopForward();
      }}
      onPointerCancel={() => stopForward()}
      onPointerLeave={() => stopForward()}
      onLostPointerCapture={() => stopForward()}
      onContextMenu={(event) => event.preventDefault()}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        moveForwardByKeyboard();
      }}
      aria-label={copy.aria.forward}
    >
      {mobile ? <>{copy.actions.forward}<span aria-hidden="true">→</span></> : <>
        <span className="walking-forward-orb" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M8 11.2V4.8a1.7 1.7 0 1 1 3.4 0v5.4" />
            <path d="M11.4 10V8.3a1.55 1.55 0 1 1 3.1 0v2.3" />
            <path d="M14.5 10.7V9.4a1.45 1.45 0 1 1 2.9 0v2.4" />
            <path d="M17.4 12.2v-1a1.35 1.35 0 1 1 2.7 0v4.1c0 3.3-2.3 5.7-6.1 5.7h-1.6c-2.2 0-3.7-.9-4.9-2.5l-3-4.1a1.7 1.7 0 0 1 2.6-2.1l1.1 1.1" />
          </svg>
        </span>
        <span className="walking-forward-label">{copy.actions.forward}</span>
      </>}
    </button>
  );

  if (activity.walkingComplete) return <DailyCareCompletion
    title={copy.completion.title}
    summary={withPetName(copy.completion.summary, petName, "dog")}
    detail={copy.completion.detail}
    reflectionTitle={copy.completion.reflectionTitle}
    reflection={copy.completion.reflection}
    dailyCareBreakdown={copy.completion.dailyCareBreakdown}
    onContinue={onContinue}
  />;

  return (
    <section className={`walking-activity${started ? " is-walking-game" : ""}${!started ? ` is-walking-${safetyStep}` : ""}`} aria-label={copy.aria.activity}>
      <div className="walking-head">
        <div>
          <p className="life-stage-label">{copy.stageLabel}</p>
          <h1>{copy.heading}</h1>
          {!started && safetyStep === "question" && <p>{copy.beforeChoice}</p>}
          {!started && safetyStep !== "question" && <p>{copy.afterChoice}</p>}
        </div>
      </div>

      {!started ? (
        safetyStep === "question" ? (<>
          <section className="walking-safety-choice" aria-labelledby="walking-safety-title">
            <h2 id="walking-safety-title">{copy.safetyQuestion}</h2>
            {isMobileWalkingLayout ? <>
              <div className="walking-safety-tabs" role="tablist" aria-label={copy.safetyQuestion}>
                <button type="button" role="tab" aria-selected={mobileSafetyChoice === "leash"} aria-controls="walking-safety-preview" className={mobileSafetyChoice === "leash" ? "is-selected" : ""} onClick={() => setMobileSafetyChoice("leash")}>{copy.choices.leash.title}</button>
                <button type="button" role="tab" aria-selected={mobileSafetyChoice === "offLeash"} aria-controls="walking-safety-preview" className={mobileSafetyChoice === "offLeash" ? "is-selected" : ""} onClick={() => setMobileSafetyChoice("offLeash")}>{copy.choices.offLeash.title}</button>
              </div>
              <div className="walking-safety-preview" id="walking-safety-preview" role="tabpanel" hidden={!mobileSafetyChoice}>
                {mobileSafetyChoice && <img src={mobileSafetyChoice === "leash" ? assets.leashChoice : assets.offLeashChoice} alt={mobileSafetyChoice === "leash" ? copy.choices.leash.title : copy.choices.offLeash.title} />}
              </div>
            </> : <div className="walking-safety-grid">
              <button type="button" onClick={() => setSafetyStep("correct")}>
                <img src={assets.leashChoice} alt="" />
                <span><b>{copy.choices.leash.title}</b><small>{copy.choices.leash.detail}</small></span>
              </button>
              <button type="button" onClick={() => setSafetyStep("law")}>
                <img src={assets.offLeashChoice} alt="" />
                <span><b>{copy.choices.offLeash.title}</b><small>{copy.choices.offLeash.detail}</small></span>
              </button>
            </div>}
          </section>
          {isMobileWalkingLayout && <div className="walking-safety-continue"><button type="button" className="primary" disabled={!mobileSafetyChoice} onClick={() => setSafetyStep(mobileSafetyChoice === "leash" ? "correct" : "law")}>繼續 <span>→</span></button></div>}
        </>) : safetyStep === "law" ? (
          <section className="walking-law-feedback" aria-live="polite">
            <span aria-hidden="true">!</span>
            <div><p className="life-stage-label">{walkingLawCopy.incorrect.eyebrow}</p><h2>{walkingLawCopy.incorrect.title}</h2></div>
            {walkingLawCopy.incorrect.paragraphs.map((paragraph) => <p key={paragraph}>{renderKnowledgeText(paragraph)}</p>)}
            <button type="button" className="secondary" onClick={() => setSafetyStep("question")}>{copy.actions.retry}</button>
          </section>
        ) : safetyStep === "correct" ? (
          <section className="walking-law-feedback walking-law-feedback--correct" aria-live="polite">
            <span aria-hidden="true">✓</span>
            <div><p className="life-stage-label">{walkingLawCopy.correct.eyebrow}</p><h2>{walkingLawCopy.correct.title}</h2></div>
            {walkingLawCopy.correct.paragraphs.map((paragraph) => <p key={paragraph}>{renderKnowledgeText(paragraph)}</p>)}
            <button type="button" className="primary" onClick={() => setSafetyStep("prepared")}>{copy.actions.continuePreparation} <span>→</span></button>
          </section>
        ) : (
        <div className="walking-prep">
          <section className="walking-prep-supplies" aria-label={copy.preparation.suppliesLabel}>
            <h2>{copy.preparation.title}</h2>
            <p className="walking-safety-confirmed">{copy.preparation.safetyConfirmed}</p>
            <div className="walking-prep-list">
              {walkingPrepItems.map((item) => {
                const done = prepared.includes(item.id);
                return (
                  <button type="button" key={item.id} className={done ? "prepared" : ""} aria-pressed={done} onClick={() => prepare(item.id)}>
                    <img
                      src={item.image}
                      alt=""
                      style={{ "--walking-prep-image-scale": item.imageScale } as CSSProperties}
                    />
                    <b>{item.label}</b>
                    <small>{prepNotes[item.id as keyof typeof prepNotes]}</small>
                  </button>
                );
              })}
            </div>
          </section>
          <div className="walking-prep-card">
            <h2>{copy.preparation.readyTitle}</h2>
            <p>{copy.preparation.readyDescription}</p>
            {message && <p className="walking-message" role="alert">{message}</p>}
            <div className="walking-prep-actions">
              <button type="button" className="primary" disabled={!allPrepared} onClick={startWalk}>{copy.actions.start} <span>→</span></button>
            </div>
          </div>
        </div>)
      ) : (
        <div className="walking-game">
          <p className="walking-game-hint">{walkingInstruction}</p>
          <div className="walking-scene-shell">
          <div className="walking-progress walking-progress-overlay" aria-label={copy.aria.progress(progressMinutes)}>
            <b>散步進度</b>
            <div><span style={{ width: `${(progressMinutes / 20) * 100}%` }} /></div>
            <small>{progressMinutes} / 20 分鐘</small>
          </div>
          {renderWalkingEventCard("walking-event-card--mobile", true)}
          <div
            className={`walking-scene ${moving ? "is-moving" : ""}`}
            ref={sceneRef}
            role="group"
            aria-label={copy.aria.scene}
          >
            <picture>
              <source media="(max-width: 720px)" srcSet={scene.mobileImage} />
              <img className="walking-bg" src={scene.image} alt={scene.title} />
            </picture>
            {draggedBag && (
              <img
                className="walking-drag-bag-ghost"
                src={assets.poopBag}
                alt=""
                aria-hidden="true"
                style={{ left: draggedBag.x, top: draggedBag.y }}
              />
            )}
            <div className="walking-character" style={getWalkingCharacterStyle(sceneIndex, position, isMobileWalkingLayout)}>
              <img
                src={activity.walkingPoopCleaned ? assets.walkerWithBag : needsCleanup ? assets.walkerWithPoop : assets.walker}
                alt={withPetName(copy.aria.walkingCharacter, petName, "dog")}
              />
            </div>
            {needsCleanup && (isMobileWalkingLayout ? (
              <button
                type="button"
                className={`walking-poop walking-poop--mobile${mobileCleanupPhase === "toolSelected" ? " is-tap-target" : ""}${mobilePoopCleaning ? " is-cleaning" : ""}`}
                style={mobilePoopStyle}
                onClick={cleanMobilePoop}
                aria-label={copy.aria.cleanupTarget}
                aria-disabled={mobileCleanupPhase !== "toolSelected"}
              >
                <img src={assets.poop} alt="" />
                {mobilePoopCleaning && <img className="walking-poop-cleanup-bag" src={assets.poopBag} alt="" />}
              </button>
            ) : (
              <div className="walking-poop" ref={poopTargetRef} style={desktopPoopStyle} aria-hidden="true">
                <img src={assets.poop} alt="" />
              </div>
            ))}
            {renderWalkingEventCard("walking-event-card--desktop")}
            {renderForwardButton(false)}
          </div>
          {renderForwardButton(true)}
          </div>
        </div>
      )}
    </section>
  );
}
