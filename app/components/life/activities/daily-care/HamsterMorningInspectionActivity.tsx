"use client";

/* eslint-disable @next/next/no-img-element -- The activity uses data-owned interactive artwork. */

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import type { LifeActivityState } from "../../../../game-types";
import { hamsterAssets, hamsterCageCheck, hamsterReport } from "../../../../data/species/hamster/activities";
import { hamsterCopy } from "../../../../data/species/hamster/copy";
import { DailyCareCompletion } from "../../DailyCareCompletion";
import { useMobileLayout } from "../../../shared/useMobileLayout";
import { ActivityIntroPage, renderKnowledgeText, withPetName } from "../activity-ui";

type Change = (patch: Partial<LifeActivityState>) => void;
type DragKind = "scoop" | "sieve" | "shake";
type MobileTool = "scoop" | "sieve" | null;
type SandPhase = "scoop" | "shake" | "trash";

/** 倉鼠 §5.3.2：廁所角落清潔，以及兩輪「舀沙、搖篩、丟棄」砂浴盆清潔。 */
export function HamsterMorningInspectionActivity({ activity, petName, onChange, onContinue }: {
  activity: LifeActivityState; petName: string; onChange: Change; onContinue: () => void;
}) {
  const isMobile = useMobileLayout();
  const config = hamsterCageCheck;
  const mobileScene = config.mobileScenePlacement;
  const desktopBedding = config.desktopBeddingPlacement;
  const steps = config.progressSteps;
  const displayPetName = petName.trim() || hamsterCopy.animalNameFallback;
  const render = (value: string) => withPetName(value, petName, "hamster");
  const states = activity.hamsterInspectionStates;
  const toiletComplete = activity.hamsterInspectionCompleted.includes(steps[0].id);
  const sandComplete = activity.hamsterInspectionCompleted.includes(steps[1].id);
  const sandSummaryAcknowledged = activity.hamsterInspectionFeedback[steps[1].id] === "correct";
  const complete = toiletComplete && sandComplete && states.cleaningFinished === "yes" && sandSummaryAcknowledged;
  const sandRound: 1 | 2 = states.sandRound === 2 ? 2 : 1;
  const sandPhase: SandPhase = states.sandPhase === "shake" || states.sandPhase === "trash" ? states.sandPhase : "scoop";
  const roundCopy = config.sandCleaning.rounds[sandRound - 1];
  const storedShakeProgress = typeof states.sandShakeProgress === "number" ? states.sandShakeProgress : 0;
  const [shakeProgress, setShakeProgress] = useState(storedShakeProgress);
  const shakeProgressRef = useRef(storedShakeProgress);
  const [dragging, setDragging] = useState<DragKind | null>(null);
  const [dragPoint, setDragPoint] = useState<{ x: number; y: number } | null>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const shakeTracking = useRef({ previousX: 0, lastMovedAt: 0, activeDurationMs: 0, baseProgress: 0 });
  const [mobileTool, setMobileTool] = useState<MobileTool>(null);
  const [mobileTargetPulse, setMobileTargetPulse] = useState<string | null>(null);
  const [mobileSieveShaking, setMobileSieveShaking] = useState(false);
  const [trashAnimating, setTrashAnimating] = useState(false);
  const mobileAnimationTimer = useRef<number | null>(null);
  const mobileSieveAnimationTimer = useRef<number | null>(null);
  const trashAnimationTimer = useRef<number | null>(null);

  const beddingStyle = (
    mobilePlacement: { readonly left: number; readonly top: number; readonly width: number },
    desktopPlacement: { readonly top: number; readonly right: number; readonly width: number; readonly minWidth: number; readonly maxWidth: number },
  ): CSSProperties => isMobile
    ? { left: `${mobilePlacement.left}%`, top: `${mobilePlacement.top}%`, right: "auto", width: `${mobilePlacement.width}%`, minWidth: 0, maxWidth: "none" }
    : { top: `${desktopPlacement.top}%`, right: `${desktopPlacement.right}%`, width: `${desktopPlacement.width}%`, minWidth: desktopPlacement.minWidth, maxWidth: desktopPlacement.maxWidth };
  const mobileToolStyle = (placement: { readonly bottom: number; readonly left: number; readonly width: number }): CSSProperties | undefined => isMobile
    ? { bottom: `${placement.bottom}%`, left: `${placement.left}%`, width: `${placement.width}%` }
    : undefined;
  const mergeStates = (patch: Record<string, string | number>) => onChange({ hamsterInspectionStates: { ...states, ...patch } });
  const setFeedback = (id: string, status: "question" | "incorrect" | "correct") => onChange({ hamsterInspectionFeedback: { ...activity.hamsterInspectionFeedback, [id]: status } });
  const dirtyCornerIsScooped = states.toiletScooped === "yes";
  const toiletSummaryAcknowledged = activity.hamsterInspectionFeedback[steps[0].id] === "correct";
  const statusMessage = typeof states.statusMessage === "string" ? states.statusMessage : "";
  const toiletFeedbackAt = typeof states.toiletFeedbackAt === "number" ? states.toiletFeedbackAt : null;
  const [toiletFeedbackClock, setToiletFeedbackClock] = useState(() => Date.now());
  const toiletFeedbackVisible = toiletComplete
    && !toiletSummaryAcknowledged
    && (!toiletFeedbackAt || toiletFeedbackClock >= toiletFeedbackAt);

  useEffect(() => {
    if (!toiletComplete || toiletSummaryAcknowledged || !toiletFeedbackAt || toiletFeedbackAt <= Date.now()) return;
    const timer = window.setTimeout(() => setToiletFeedbackClock(toiletFeedbackAt), toiletFeedbackAt - Date.now());
    return () => window.clearTimeout(timer);
  }, [toiletComplete, toiletFeedbackAt, toiletSummaryAcknowledged]);

  useEffect(() => () => {
    if (mobileAnimationTimer.current !== null) window.clearTimeout(mobileAnimationTimer.current);
    if (mobileSieveAnimationTimer.current !== null) window.clearTimeout(mobileSieveAnimationTimer.current);
    if (trashAnimationTimer.current !== null) window.clearTimeout(trashAnimationTimer.current);
  }, []);

  function startActivity() {
    onChange({ hamsterInspectionStarted: true, hamsterInspectionStates: { toiletCorner: config.interaction.toiletCorner } });
  }

  function startDrag(kind: DragKind, event: ReactPointerEvent<HTMLElement>) {
    if (isMobile) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { x: event.clientX, y: event.clientY };
    setDragPoint({ x: event.clientX, y: event.clientY });
    if (kind === "shake") {
      shakeTracking.current = { previousX: event.clientX, lastMovedAt: Date.now(), activeDurationMs: 0, baseProgress: shakeProgressRef.current };
    }
    setDragging(kind);
  }

  function finishSandShake() {
    shakeProgressRef.current = config.interaction.shakeProgressTarget;
    setShakeProgress(config.interaction.shakeProgressTarget);
    setDragging(null); dragStart.current = null; setDragPoint(null);
    mergeStates({ sandPhase: "trash", sandShakeProgress: config.interaction.shakeProgressTarget, statusMessage: roundCopy.trashPrompt });
  }

  function updateDrag(event: ReactPointerEvent<HTMLElement>) {
    if (!dragging) return;
    setDragPoint({ x: event.clientX, y: event.clientY });
    if (dragging !== "shake" || !dragStart.current) return;
    const movement = Math.abs(event.clientX - shakeTracking.current.previousX);
    shakeTracking.current.previousX = event.clientX;
    if (movement < 2) return;
    const now = Date.now();
    const gapSinceLastMovement = now - shakeTracking.current.lastMovedAt;
    if (gapSinceLastMovement <= 180) shakeTracking.current.activeDurationMs += gapSinceLastMovement;
    shakeTracking.current.lastMovedAt = now;
    const nextProgress = Math.min(
      config.interaction.shakeProgressTarget,
      shakeTracking.current.baseProgress + (shakeTracking.current.activeDurationMs / config.interaction.shakeDurationMs) * config.interaction.shakeProgressTarget,
    );
    if (nextProgress === shakeProgressRef.current) return;
    shakeProgressRef.current = nextProgress;
    setShakeProgress(nextProgress);
    if (nextProgress >= config.interaction.shakeProgressTarget) finishSandShake();
  }

  function isToiletCornerPoint(event: ReactPointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    return event.clientX - bounds.left >= bounds.width * .58
      && event.clientY - bounds.top >= bounds.height * .4
      && event.clientY - bounds.top <= bounds.height * .82;
  }

  function finishToiletDrag(event: ReactPointerEvent<HTMLElement>) {
    if (dragging !== "scoop" || !dragStart.current) return;
    const selectedCorner = isToiletCornerPoint(event);
    setDragging(null); dragStart.current = null; setDragPoint(null);
    if (!selectedCorner) return mergeStates({ statusMessage: config.interaction.cleanCornerHint });
    mergeStates({ toiletScooped: "yes", statusMessage: config.interaction.refillHint });
  }

  function refillToiletCorner() {
    if (!dirtyCornerIsScooped) return;
    onChange({
      hamsterInspectionStates: { ...states, toiletRefilled: "yes", statusMessage: "✅ 廁所角落已整理乾淨", toiletFeedbackAt: Date.now() + 1000 },
      hamsterInspectionCompleted: activity.hamsterInspectionCompleted.includes(steps[0].id)
        ? activity.hamsterInspectionCompleted
        : [...activity.hamsterInspectionCompleted, steps[0].id],
    });
  }

  function playMobileTargetPulse(target: string) {
    setMobileTargetPulse(target);
    if (mobileAnimationTimer.current !== null) window.clearTimeout(mobileAnimationTimer.current);
    mobileAnimationTimer.current = window.setTimeout(() => {
      setMobileTargetPulse(null);
      mobileAnimationTimer.current = null;
    }, 360);
  }

  function selectMobileTool(tool: MobileTool) {
    if (!isMobile || mobileTool || !tool) return;
    if (tool === "scoop" && !toiletSummaryAcknowledged && !dirtyCornerIsScooped) setMobileTool(tool);
    if (tool === "sieve" && toiletSummaryAcknowledged && sandPhase === "scoop") setMobileTool(tool);
  }

  function tapMobileDirtyBedding() {
    if (!isMobile || mobileTool !== "scoop" || dirtyCornerIsScooped || toiletComplete) return;
    setMobileTool(null);
    playMobileTargetPulse("dirty-bedding");
    mergeStates({ toiletScooped: "yes", statusMessage: config.interaction.refillHint });
  }

  function beginSandShake() {
    setMobileTool(null);
    shakeProgressRef.current = 0;
    setShakeProgress(0);
    mergeStates({ sandPhase: "shake", sandShakeProgress: 0, statusMessage: roundCopy.shakePrompt });
  }

  function finishSandScoopDrag(event: ReactPointerEvent<HTMLElement>) {
    if (dragging !== "sieve" || !dragStart.current || sandPhase !== "scoop") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    setDragging(null); dragStart.current = null; setDragPoint(null);
    if (x < .14 || x > .88 || y < .18 || y > .88) return mergeStates({ statusMessage: config.interaction.siftHint });
    beginSandShake();
  }

  function tapMobileSandBath() {
    if (!isMobile || mobileTool !== "sieve" || sandPhase !== "scoop") return;
    playMobileTargetPulse("sand-bath");
    beginSandShake();
  }

  function incrementSandShake() {
    if (sandPhase !== "shake") return;
    if (isMobile) {
      setMobileSieveShaking(false);
      window.requestAnimationFrame(() => setMobileSieveShaking(true));
      if (mobileSieveAnimationTimer.current !== null) window.clearTimeout(mobileSieveAnimationTimer.current);
      mobileSieveAnimationTimer.current = window.setTimeout(() => {
        setMobileSieveShaking(false);
        mobileSieveAnimationTimer.current = null;
      }, 420);
    }
    const nextProgress = Math.min(
      config.interaction.shakeProgressTarget,
      shakeProgressRef.current + config.interaction.mobileTap.shake.progressIncrement,
    );
    shakeProgressRef.current = nextProgress;
    setShakeProgress(nextProgress);
    if (nextProgress >= config.interaction.shakeProgressTarget) return finishSandShake();
    mergeStates({ sandShakeProgress: nextProgress, statusMessage: roundCopy.shakePrompt });
  }

  function finishShakeDrag() {
    if (dragging !== "shake" || !dragStart.current || sandPhase !== "shake") return;
    setDragging(null); dragStart.current = null; setDragPoint(null);
    mergeStates({ sandShakeProgress: Math.round(shakeProgressRef.current), statusMessage: roundCopy.shakePrompt });
  }

  function discardSandWaste() {
    if (sandPhase !== "trash" || trashAnimating) return;
    setTrashAnimating(true);
    trashAnimationTimer.current = window.setTimeout(() => {
      setTrashAnimating(false);
      trashAnimationTimer.current = null;
      shakeProgressRef.current = 0;
      setShakeProgress(0);
      if (sandRound === 1) {
        onChange({ hamsterInspectionStates: { ...states, sandRound: 2, sandPhase: "scoop", sandShakeProgress: 0, statusMessage: config.sandCleaning.rounds[1].scoopPrompt } });
        return;
      }
      onChange({
        hamsterInspectionStates: { ...states, sandRound: 2, sandPhase: "trash", sandShakeProgress: config.interaction.shakeProgressTarget, cleaningFinished: "yes", statusMessage: config.sandCleaning.completion },
        hamsterInspectionCompleted: activity.hamsterInspectionCompleted.includes(steps[1].id)
          ? activity.hamsterInspectionCompleted
          : [...activity.hamsterInspectionCompleted, steps[1].id],
      });
    }, 520);
  }

  function completeKeyboardCleaning(tool: DragKind) {
    if (tool === "scoop" && !dirtyCornerIsScooped) mergeStates({ toiletScooped: "yes", statusMessage: config.interaction.refillHint });
    if (tool === "sieve" && sandPhase === "scoop") beginSandShake();
    if (tool === "shake" && sandPhase === "shake") incrementSandShake();
  }

  if (!activity.hamsterInspectionStarted) return <ActivityIntroPage config={config.intro} petName={petName} species="hamster" onStart={startActivity} />;
  if (complete) return <DailyCareCompletion title={render(config.completion.title)} summary={render(config.completion.subtitle)} detail={render(config.completion.description)} reflectionTitle={render(config.completion.reflectionTitle)} reflection={render(config.completion.reflection)} dailyCareBreakdown={hamsterReport.dailyCareBreakdown} careTimeTitle={config.completion.careTitle} continueLabel={config.completion.continueLabel} onContinue={onContinue} />;

  const activeIndex = toiletSummaryAcknowledged ? 1 : 0;
  const activeStage = steps[activeIndex];
  const sandPrompt = sandComplete
    ? config.sandCleaning.completion
    : sandPhase === "scoop" ? roundCopy.scoopPrompt : sandPhase === "shake" ? roundCopy.shakePrompt : roundCopy.trashPrompt;
  const desktopPromptText = !toiletSummaryAcknowledged
    ? (statusMessage || (dirtyCornerIsScooped ? config.interaction.refillHint : steps[0].prompt))
    : (statusMessage || sandPrompt);
  const mobilePromptText = !toiletSummaryAcknowledged
    ? (!dirtyCornerIsScooped
      ? (mobileTool === "scoop" ? config.interaction.mobileTap.scoop.targetPrompt : config.interaction.mobileTap.scoop.selectPrompt)
      : config.interaction.refillHint)
    : sandComplete
      ? config.sandCleaning.completion
      : sandPhase === "scoop"
      ? (mobileTool === "sieve" ? config.interaction.mobileTap.sieve.targetPrompt : roundCopy.scoopPrompt)
      : sandPhase === "shake"
        ? config.interaction.mobileTap.shake.prompt
        : sandPrompt;
  const mobilePromptIsLong = mobilePromptText.length > 20;
  const ghostImage = dragging === "scoop" ? hamsterAssets.cageCheckActivity.scoop : dragging === "sieve" ? hamsterAssets.cageCheckActivity.sandSieve : null;
  const sieveFocusImage = shakeProgress >= config.interaction.shakeProgressTarget
    ? hamsterAssets.cageCheckActivity.sandSieveClean
    : shakeProgress >= config.interaction.shakeProgressTarget / 2
      ? hamsterAssets.cageCheckActivity.sandSieveMiddle
      : hamsterAssets.cageCheckActivity.sandSieveFull;

  return <section className="guided-activity hamster-cage-check" aria-label={render(config.title)}>
    <header className="guided-activity-heading hamster-cage-check-heading"><p className="life-stage-label">日常照護</p><h1>{render(config.title)}</h1><p className="hamster-cage-check-message">{render(config.sceneDescription)}</p></header>
    <ol className="rabbit-grooming-progress hamster-cage-check-progress" aria-label="清潔日常進度">
      {steps.map((step, index) => {
        const isComplete = index === 0 ? toiletComplete : sandComplete;
        return <li key={step.id} className={isComplete ? "done" : index === activeIndex ? "active" : ""}><span>{isComplete ? "✓" : index + 1}</span>{step.label}</li>;
      })}
    </ol>
    <div className="hamster-stage-summary" aria-label={`目前為步驟 ${activeIndex + 1}：${activeStage.label}`}>
      <b>步驟 {activeIndex + 1} / {steps.length}</b>
      <span className="hamster-stage-dots" aria-hidden="true">{steps.map((step, index) => <i key={step.id} className={index < activeIndex ? "is-complete" : index === activeIndex ? "is-active" : ""}>{index < activeIndex ? "✓" : ""}</i>)}</span>
      <span className="hamster-stage-name">{activeStage.label}</span>
    </div>
    <div className="hamster-cage-check-scene" onPointerMove={isMobile ? undefined : updateDrag} onPointerUp={isMobile ? undefined : (event) => {
      if (dragging === "scoop") finishToiletDrag(event);
      if (dragging === "sieve") finishSandScoopDrag(event);
      if (dragging === "shake") finishShakeDrag();
    }} onPointerCancel={isMobile ? undefined : () => { setDragging(null); dragStart.current = null; setDragPoint(null); mergeStates({ sandShakeProgress: Math.round(shakeProgressRef.current) }); }}>
      {isMobile && <p className={`hamster-mobile-prompt${mobilePromptIsLong ? " is-long" : ""}`}>{render(mobilePromptText)}</p>}
      {!isMobile && <p className="hamster-cage-check-prompt">{render(desktopPromptText)}</p>}
      {!toiletSummaryAcknowledged ? <>
        <img className="hamster-cage-floor" src={hamsterAssets.cageCheckActivity.floorView} alt={`${displayPetName}的籠具底部`} />
        <div className="hamster-cage-prepared-items" aria-hidden="true">
          {config.preparedCageItems.filter((item) => !isMobile || item.mobileVisible).map((item) => {
            const placement = isMobile ? item.mobilePlacement : item.placement;
            return <img key={item.id} className={`hamster-cage-prepared-item hamster-cage-prepared-item--${item.id}`} style={{ left: `${placement.x}%`, top: `${placement.y}%`, width: `${placement.width}%`, zIndex: item.placement.layer }} src={item.image} alt="" />;
          })}
        </div>
        {!toiletComplete && (isMobile
          ? <button type="button" className={`hamster-dirty-bedding is-top-right hamster-mobile-target ${mobileTargetPulse === "dirty-bedding" ? "is-tap-success" : ""} ${dirtyCornerIsScooped ? "is-scooped" : ""}`} style={beddingStyle(mobileScene.dirtyBedding, desktopBedding.dirtyBedding)} onClick={tapMobileDirtyBedding} aria-label="清理髒污角落"><img src={hamsterAssets.cageCheckActivity.dirtyBedding} alt="" /></button>
          : <span className={`hamster-dirty-bedding is-top-right ${dirtyCornerIsScooped ? "is-scooped" : ""}`} style={beddingStyle(mobileScene.dirtyBedding, desktopBedding.dirtyBedding)} aria-hidden="true"><img src={hamsterAssets.cageCheckActivity.dirtyBedding} alt="" /></span>)}
        {dirtyCornerIsScooped && !toiletComplete && <button type="button" className="hamster-cleaning-tool hamster-cleaning-tool--bedding" style={mobileToolStyle(mobileScene.beddingPackage)} onClick={refillToiletCorner} aria-label="補上乾淨墊料"><img src={hamsterAssets.cageCheckActivity.beddingPackage} alt="" /><span>點擊補上新墊料</span></button>}
        {toiletComplete && <span className="hamster-filled-bedding is-top-right" style={beddingStyle(mobileScene.cleanBedding, desktopBedding.cleanBedding)} aria-hidden="true"><img src={hamsterAssets.cageCheckActivity.cleanBedding} alt="" /></span>}
        {!dirtyCornerIsScooped && <button type="button" className={`hamster-cleaning-tool hamster-cleaning-tool--scoop ${isMobile && mobileTool === "scoop" ? "is-tap-selected" : ""} ${isMobile && !mobileTool ? "is-tap-target" : ""}`} style={mobileToolStyle(mobileScene.scoop)} onPointerDown={isMobile ? undefined : (event) => startDrag("scoop", event)} onClick={(event) => { if (isMobile) selectMobileTool("scoop"); else if (event.detail === 0) completeKeyboardCleaning("scoop"); }} aria-label="清理髒污角落"><img src={hamsterAssets.cageCheckActivity.scoop} alt="" /><span>{isMobile ? "點擊小鏟子" : "拖曳小鏟子清除髒污"}</span></button>}
        {toiletComplete && toiletFeedbackVisible && <section className="hamster-cage-check-note hamster-cage-check-note--scene" aria-live="polite"><span className="hamster-cage-check-note-icon" aria-hidden="true">✓</span><p>{renderKnowledgeText(render(steps[0].completion))}</p><button type="button" className="primary" onClick={() => { mergeStates({ statusMessage: "", sandRound: 1, sandPhase: "scoop", sandShakeProgress: 0 }); setFeedback(steps[0].id, "correct"); }}>繼續清理砂浴盆 →</button></section>}
      </> : <div className={`hamster-sand-bath-stage is-${sandPhase} is-round-${sandRound} ${sandComplete ? "is-complete" : ""} ${dragging === "shake" ? "is-shaking" : ""} ${mobileTargetPulse === "sand-bath" ? "is-tap-success" : ""}`} onClick={tapMobileSandBath}>
        <img className="hamster-sand-bath" src={hamsterAssets.cageCheckActivity.sandBathMess} alt={sandComplete ? "已清除糞便與結塊的砂浴盆" : "散布糞便與結塊、等待篩沙清潔的砂浴盆"} />
        {!sandComplete && <>
          <span className="hamster-sand-debris hamster-sand-debris--1" aria-hidden="true"><img src={hamsterAssets.cageCheckActivity.droppings} alt="" /></span>
          <span className="hamster-sand-debris hamster-sand-debris--2" aria-hidden="true"><img src={hamsterAssets.cageCheckActivity.sandBathDirty} alt="" /></span>
          {sandRound === 1 && <>
            <span className="hamster-sand-debris hamster-sand-debris--3" aria-hidden="true"><img src={hamsterAssets.cageCheckActivity.droppings} alt="" /></span>
            <span className="hamster-sand-debris hamster-sand-debris--4" aria-hidden="true"><img src={hamsterAssets.cageCheckActivity.sandBathDirty} alt="" /></span>
          </>}
          {sandPhase === "scoop" && <button type="button" className={`hamster-cleaning-tool hamster-cleaning-tool--sieve ${isMobile && mobileTool === "sieve" ? "is-tap-selected" : ""} ${isMobile && !mobileTool ? "is-tap-target" : ""}`} style={mobileToolStyle(mobileScene.sieve)} onPointerDown={isMobile ? undefined : (event) => startDrag("sieve", event)} onClick={(event) => { event.stopPropagation(); if (isMobile) selectMobileTool("sieve"); else if (event.detail === 0) completeKeyboardCleaning("sieve"); }} aria-label={roundCopy.scoopPrompt}><img src={hamsterAssets.cageCheckActivity.sandSieve} alt="" /><span>{isMobile ? "點擊砂鏟" : "拖曳砂鏟舀沙"}</span></button>}
          {sandPhase !== "scoop" && <button type="button" className={`hamster-sand-sieve-focus ${sandPhase === "shake" ? "is-shake-ready" : "is-clean"} ${mobileSieveShaking ? "is-mobile-shaking" : ""} ${trashAnimating ? "is-discarding" : ""}`} onPointerDown={isMobile || sandPhase !== "shake" ? undefined : (event) => startDrag("shake", event)} onClick={(event) => { event.stopPropagation(); if (sandPhase === "shake" && (isMobile || event.detail === 0)) incrementSandShake(); }} disabled={sandPhase === "trash"} aria-label={sandPhase === "shake" ? roundCopy.shakePrompt : "砂鏟上的排泄物等待丟棄"}><img src={sieveFocusImage} alt="" /></button>}
          <button type="button" className={`hamster-sand-trash ${sandPhase === "trash" ? "is-ready" : ""} ${trashAnimating ? "is-open" : ""}`} onClick={(event) => { event.stopPropagation(); discardSandWaste(); }} disabled={sandPhase !== "trash" || trashAnimating} aria-label={roundCopy.trashPrompt}><img src={trashAnimating ? hamsterAssets.cageCheckActivity.trashBinOpen : hamsterAssets.cageCheckActivity.trashBin} alt="" /></button>
          {sandPhase === "shake" && <div className="hamster-sieve-progress" aria-label={config.sandCleaning.shakeProgressLabel}><b>{config.sandCleaning.shakeProgressLabel}</b><div role="progressbar" aria-valuemin={0} aria-valuemax={config.interaction.shakeProgressTarget} aria-valuenow={Math.round(shakeProgress)}><span style={{ width: `${(shakeProgress / config.interaction.shakeProgressTarget) * 100}%` }} /></div><small>{Math.round(shakeProgress)}%</small></div>}
        </>}
        {sandComplete && <button type="button" className="primary hamster-cage-check-finish" onClick={(event) => { event.stopPropagation(); setFeedback(steps[1].id, "correct"); }}>完成清潔 →</button>}
      </div>}
    </div>
    {ghostImage && dragPoint && <img className="hamster-cage-check-drag-ghost" src={ghostImage} alt="" aria-hidden="true" style={{ left: dragPoint.x, top: dragPoint.y }} />}
  </section>;
}
