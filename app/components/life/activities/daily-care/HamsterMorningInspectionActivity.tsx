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
type MobileTool = Exclude<DragKind, "shake"> | null;

const sandDebrisIds = ["one", "two", "three"] as const;

/** 倉鼠 §5.3.2：以物種資料驅動的廁所角落與砂浴盆清潔活動。 */
export function HamsterMorningInspectionActivity({ activity, petName, onChange, onContinue }: {
  activity: LifeActivityState; petName: string; onChange: Change; onContinue: () => void;
}) {
  const isMobile = useMobileLayout();
  const config = hamsterCageCheck;
  const steps = config.progressSteps;
  const displayPetName = petName.trim() || hamsterCopy.animalNameFallback;
  const render = (value: string) => withPetName(value, petName, "hamster");
  const states = activity.hamsterInspectionStates;
  const toiletComplete = activity.hamsterInspectionCompleted.includes(steps[0].id);
  const storedSievedDebrisIds = typeof states.sievedDebrisIds === "string"
    ? states.sievedDebrisIds.split(",").filter((id): id is typeof sandDebrisIds[number] => sandDebrisIds.includes(id as typeof sandDebrisIds[number]))
    // 保留既有進度：更新前已篩掉的數量，會對應為已清掉的雜質。
    : sandDebrisIds.slice(0, typeof states.sievePasses === "number" ? states.sievePasses : 0);
  const sievedDebrisIds = new Set(storedSievedDebrisIds);
  const sievePasses = sievedDebrisIds.size;
  const siftComplete = sievePasses === sandDebrisIds.length;
  const siftAcknowledged = states.siftAcknowledged === "yes";
  const storedShakeProgress = typeof states.shakeProgress === "number" ? states.shakeProgress : 0;
  const shakeComplete = storedShakeProgress >= config.interaction.shakeProgressTarget;
  const complete = toiletComplete && shakeComplete && activity.hamsterInspectionCompleted.includes(steps[2].id) && states.cleaningFinished === "yes";
  const [dragging, setDragging] = useState<DragKind | null>(null);
  const [shakeOffset, setShakeOffset] = useState(0);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const shakeTracking = useRef({ previousX: 0, lastMovedAt: 0, activeDurationMs: 0, baseProgress: 0 });
  const shakeProgressRef = useRef(storedShakeProgress);
  const [shakeProgress, setShakeProgress] = useState(storedShakeProgress);
  const [dragPoint, setDragPoint] = useState<{ x: number; y: number } | null>(null);
  const sandDebrisRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const [mobileTool, setMobileTool] = useState<MobileTool>(null);
  const [mobileShakePulse, setMobileShakePulse] = useState(false);
  const [mobileTargetPulse, setMobileTargetPulse] = useState<string | null>(null);
  const mobileAnimationTimer = useRef<number | null>(null);
  const mergeStates = (patch: Record<string, string | number>) => onChange({ hamsterInspectionStates: { ...states, ...patch } });
  const setFeedback = (id: string, status: "question" | "incorrect" | "correct") => onChange({ hamsterInspectionFeedback: { ...activity.hamsterInspectionFeedback, [id]: status } });
  const completeStep = (id: string) => {
    if (!activity.hamsterInspectionCompleted.includes(id)) onChange({ hamsterInspectionCompleted: [...activity.hamsterInspectionCompleted, id] });
  };
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
      setShakeOffset(0);
      shakeTracking.current = { previousX: event.clientX, lastMovedAt: Date.now(), activeDurationMs: 0, baseProgress: shakeProgressRef.current };
    }
    setDragging(kind);
  }

  function finishShakeProgress() {
    shakeProgressRef.current = config.interaction.shakeProgressTarget;
    setShakeProgress(config.interaction.shakeProgressTarget);
    setDragging(null); dragStart.current = null; setDragPoint(null); setShakeOffset(0);
    mergeStates({ shakeProgress: config.interaction.shakeProgressTarget, statusMessage: config.interaction.shakeCompleteHint });
    completeStep(steps[2].id);
  }

  function updateDrag(event: ReactPointerEvent<HTMLElement>) {
    if (!dragging) return;
    setDragPoint({ x: event.clientX, y: event.clientY });
    if (dragging === "shake" && dragStart.current) {
      const distance = event.clientX - dragStart.current.x;
      // 讓砂盆在實際拖曳時立即跟手左右移動；放開後再播放明顯的回彈。
      setShakeOffset(Math.max(-34, Math.min(34, distance * .22)));
      const movement = Math.abs(event.clientX - shakeTracking.current.previousX);
      shakeTracking.current.previousX = event.clientX;
      if (movement < 2) return;
      const now = Date.now();
      const gapSinceLastMovement = now - shakeTracking.current.lastMovedAt;
      // 停住一段時間後不回溯累積，只有實際持續拖曳才會讓進度前進。
      if (gapSinceLastMovement <= 180) shakeTracking.current.activeDurationMs += gapSinceLastMovement;
      shakeTracking.current.lastMovedAt = now;
      const nextProgress = Math.min(
        config.interaction.shakeProgressTarget,
        shakeTracking.current.baseProgress + (shakeTracking.current.activeDurationMs / config.interaction.shakeDurationMs) * config.interaction.shakeProgressTarget,
      );
      if (nextProgress === shakeProgressRef.current) return;
      shakeProgressRef.current = nextProgress;
      setShakeProgress(nextProgress);
      if (nextProgress >= config.interaction.shakeProgressTarget) finishShakeProgress();
    }
  }

  function isToiletCornerPoint(event: ReactPointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    // 髒墊料固定顯示在籠具右上方的墊料區，拖曳到該區即可清理。
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
    // 先讓補好的墊料留在缺口一秒，再讓回饋框淡入。
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

  function selectMobileTool(tool: Exclude<DragKind, "shake">) {
    if (!isMobile || mobileTool || shakeComplete) return;
    const expected = (tool === "scoop" && !toiletSummaryAcknowledged && !dirtyCornerIsScooped)
      || (tool === "sieve" && toiletSummaryAcknowledged && !siftComplete);
    if (expected) setMobileTool(tool);
  }

  function tapMobileDirtyBedding() {
    if (!isMobile || mobileTool !== "scoop" || dirtyCornerIsScooped || toiletComplete) return;
    setMobileTool(null);
    playMobileTargetPulse("dirty-bedding");
    mergeStates({ toiletScooped: "yes", statusMessage: config.interaction.refillHint });
  }

  function tapMobileDebris(debrisId: typeof sandDebrisIds[number]) {
    if (!isMobile || mobileTool !== "sieve" || siftComplete || sievedDebrisIds.has(debrisId)) return;
    const nextDebrisIds = [...sievedDebrisIds, debrisId];
    const nextPasses = nextDebrisIds.length;
    setMobileTool(null);
    playMobileTargetPulse(`debris-${debrisId}`);
    mergeStates({
      sievePasses: nextPasses,
      sievedDebrisIds: nextDebrisIds.join(","),
      statusMessage: nextPasses === sandDebrisIds.length ? "✅ 雜質清理完成" : `已篩出一部分雜質（${nextPasses} / ${sandDebrisIds.length}）`,
    });
    if (nextPasses === sandDebrisIds.length) completeStep(steps[1].id);
  }

  function tapMobileSandBath() {
    if (!isMobile || !siftAcknowledged || shakeComplete) return;
    setMobileShakePulse(true);
    if (mobileAnimationTimer.current !== null) window.clearTimeout(mobileAnimationTimer.current);
    mobileAnimationTimer.current = window.setTimeout(() => {
      setMobileShakePulse(false);
      mobileAnimationTimer.current = null;
    }, 560);
    const nextProgress = Math.min(
      config.interaction.shakeProgressTarget,
      shakeProgressRef.current + config.interaction.mobileTap.shake.progressIncrement,
    );
    shakeProgressRef.current = nextProgress;
    setShakeProgress(nextProgress);
    if (nextProgress >= config.interaction.shakeProgressTarget) {
      finishShakeProgress();
      return;
    }
    mergeStates({ shakeProgress: nextProgress, statusMessage: config.interaction.mobileTap.shake.prompt });
  }

  function finishSieveDrag(event: ReactPointerEvent<HTMLElement>) {
    if (dragging !== "sieve" || !dragStart.current || siftComplete) return;
    setDragging(null); dragStart.current = null; setDragPoint(null);
    const debrisId = sandDebrisIds.find((id) => {
      const bounds = sandDebrisRefs.current[id]?.getBoundingClientRect();
      return bounds
        && event.clientX >= bounds.left
        && event.clientX <= bounds.right
        && event.clientY >= bounds.top
        && event.clientY <= bounds.bottom;
    });
    if (!debrisId || sievedDebrisIds.has(debrisId)) return mergeStates({ statusMessage: "把漏勺放在任一處雜質上，就能篩掉那一處。" });
    const nextDebrisIds = [...sievedDebrisIds, debrisId];
    const nextPasses = nextDebrisIds.length;
    mergeStates({
      sievePasses: nextPasses,
      sievedDebrisIds: nextDebrisIds.join(","),
      statusMessage: nextPasses === sandDebrisIds.length ? "✅ 雜質清理完成" : `已篩出一部分雜質（${nextPasses} / ${sandDebrisIds.length}）`,
    });
    if (nextPasses === sandDebrisIds.length) completeStep(steps[1].id);
  }

  function finishShakeDrag() {
    if (dragging !== "shake" || !dragStart.current || shakeComplete) return;
    setDragging(null); dragStart.current = null; setDragPoint(null); setShakeOffset(0);
    mergeStates({ shakeProgress: Math.round(shakeProgressRef.current), statusMessage: config.interaction.shakeHint });
  }

  function completeKeyboardCleaning(tool: DragKind) {
    if (tool === "scoop" && !dirtyCornerIsScooped) {
      mergeStates({ toiletScooped: "yes", statusMessage: config.interaction.refillHint });
    }
    if (tool === "sieve" && !siftComplete) {
      const nextDebrisId = sandDebrisIds.find((id) => !sievedDebrisIds.has(id));
      if (!nextDebrisId) return;
      const nextDebrisIds = [...sievedDebrisIds, nextDebrisId];
      const nextPasses = nextDebrisIds.length;
      mergeStates({
        sievePasses: nextPasses,
        sievedDebrisIds: nextDebrisIds.join(","),
        statusMessage: nextPasses === sandDebrisIds.length ? "✅ 雜質清理完成" : `已篩出一部分雜質（${nextPasses} / ${sandDebrisIds.length}）`,
      });
      if (nextPasses === sandDebrisIds.length) completeStep(steps[1].id);
    }
    if (tool === "shake" && !shakeComplete) finishShakeProgress();
  }

  if (!activity.hamsterInspectionStarted) return <ActivityIntroPage config={config.intro} petName={petName} species="hamster" onStart={startActivity} />;
  if (complete) return <DailyCareCompletion title={render(config.completion.title)} summary={render(config.completion.subtitle)} detail={render(config.completion.description)} reflectionTitle={render(config.completion.reflectionTitle)} reflection={render(config.completion.reflection)} dailyCareBreakdown={hamsterReport.dailyCareBreakdown} careTimeTitle={config.completion.careTitle} continueLabel={config.completion.continueLabel} onContinue={onContinue} />;

  const activeIndex = !toiletComplete ? 0 : !siftComplete ? 1 : 2;
  const desktopPromptText = !toiletSummaryAcknowledged
    ? (statusMessage || (dirtyCornerIsScooped ? config.interaction.refillHint : steps[0].prompt))
    : !siftComplete
      ? (statusMessage || steps[1].prompt)
      : !siftAcknowledged
        ? "✅ 雜質清理完成，準備水平搖晃砂盆。"
        : shakeComplete
          ? config.interaction.shakeCompleteHint
          : config.interaction.shakeHint;
  const mobilePromptText = !toiletSummaryAcknowledged
    ? (!dirtyCornerIsScooped
      ? (mobileTool === "scoop" ? config.interaction.mobileTap.scoop.targetPrompt : config.interaction.mobileTap.scoop.selectPrompt)
      : config.interaction.refillHint)
    : !siftComplete
      ? (mobileTool === "sieve" ? config.interaction.mobileTap.sieve.targetPrompt : config.interaction.mobileTap.sieve.selectPrompt)
      : !siftAcknowledged
        ? "✅ 雜質清理完成，準備整理砂盆。"
        : shakeComplete
          ? config.interaction.shakeCompleteHint
          : config.interaction.mobileTap.shake.prompt;
  const ghostImage = dragging === "scoop" ? hamsterAssets.cageCheckActivity.scoop : dragging === "sieve" ? hamsterAssets.cageCheckActivity.sandSieve : null;
  const sandBathStyle = { "--hamster-sand-offset": `${shakeOffset}px` } as CSSProperties;
  const cleanedCageItems = config.preparedCageItems;
  const sandBathImage = shakeComplete
    ? hamsterAssets.cageCheckActivity.sandBathClean
    : shakeProgress >= config.interaction.shakeProgressTarget / 2
      ? hamsterAssets.cageCheckActivity.sandBathMiddle
      : hamsterAssets.cageCheckActivity.sandBathMess;
  const activeStage = steps[activeIndex];
  return <section className="guided-activity hamster-cage-check" aria-label={`${displayPetName}的清潔日常`}>
    <header className="guided-activity-heading hamster-cage-check-heading"><p className="life-stage-label">日常照護</p><h1>{displayPetName} 的清潔日常</h1><p className="hamster-cage-check-message">{render(config.sceneDescription)}</p></header>
    <ol className="rabbit-grooming-progress hamster-cage-check-progress" aria-label="清潔日常進度">
      {steps.map((step, index) => {
        const isComplete = (index === 0 && toiletComplete) || (index === 1 && siftComplete) || (index === 2 && shakeComplete);
        return <li key={step.id} className={isComplete ? "done" : index === activeIndex ? "active" : ""}><span>{isComplete ? "✓" : index + 1}</span>{step.label}</li>;
      })}
    </ol>
    <div className="hamster-stage-summary" aria-label={`目前為步驟 ${activeIndex + 1}：${activeStage.label}`}>
      <b>步驟 {activeIndex + 1} / {steps.length}</b>
      <span className="hamster-stage-dots" aria-hidden="true">{steps.map((step, index) => <i key={step.id} className={index < activeIndex ? "is-complete" : index === activeIndex ? "is-active" : ""}>{index < activeIndex ? "✓" : ""}</i>)}</span>
      <span className="hamster-stage-name">{activeStage.label}</span>
    </div>
    {isMobile && siftAcknowledged && !shakeComplete && <div className="hamster-mobile-action-progress" aria-label="砂浴盆整理進度"><b>{config.interaction.mobileTap.shake.progressLabel}</b><div role="progressbar" aria-valuemin={0} aria-valuemax={config.interaction.shakeProgressTarget} aria-valuenow={Math.round(shakeProgress)}><span style={{ width: `${(shakeProgress / config.interaction.shakeProgressTarget) * 100}%` }} /></div><small>{Math.round(shakeProgress)}%</small></div>}
    <div className="hamster-cage-check-scene" onPointerMove={isMobile ? undefined : updateDrag} onPointerUp={isMobile ? undefined : (event) => {
      if (dragging === "scoop") finishToiletDrag(event);
      if (dragging === "sieve") finishSieveDrag(event);
      if (dragging === "shake") finishShakeDrag();
    }} onPointerCancel={isMobile ? undefined : () => { setDragging(null); dragStart.current = null; setDragPoint(null); setShakeOffset(0); mergeStates({ shakeProgress: Math.round(shakeProgressRef.current) }); }}>
      {isMobile && <p className="hamster-mobile-prompt" role={shakeComplete ? "status" : undefined}>{render(mobilePromptText)}</p>}
      {!isMobile && (!siftAcknowledged || shakeComplete) && <p className="hamster-cage-check-prompt" role={shakeComplete ? "status" : undefined}>{render(desktopPromptText)}</p>}
      {!isMobile && siftAcknowledged && !shakeComplete && <div className="hamster-shake-progress" aria-label="砂浴盆整理進度"><b>搖晃進度</b><div role="progressbar" aria-valuemin={0} aria-valuemax={config.interaction.shakeProgressTarget} aria-valuenow={Math.round(shakeProgress)}><span style={{ width: `${(shakeProgress / config.interaction.shakeProgressTarget) * 100}%` }} /></div></div>}
      {!toiletSummaryAcknowledged ? <>
        <img className="hamster-cage-floor" src={isMobile ? hamsterAssets.cageCheckActivity.floorViewMobile : hamsterAssets.cageCheckActivity.floorView} alt={`${displayPetName}的籠具底部`} />
        <div className="hamster-cage-prepared-items" aria-hidden="true">
          {cleanedCageItems.map((item) => <img
            key={item.id}
            className={`hamster-cage-prepared-item hamster-cage-prepared-item--${item.id}`}
            style={{ left: `${item.placement.x}%`, top: `${item.placement.y}%`, width: `${item.placement.width}%`, zIndex: item.placement.layer }}
            src={item.image}
            alt=""
          />)}
        </div>
        {!toiletComplete && (isMobile
          ? <button type="button" className={`hamster-dirty-bedding is-top-right hamster-mobile-target ${mobileTargetPulse === "dirty-bedding" ? "is-tap-success" : ""} ${dirtyCornerIsScooped ? "is-scooped" : ""}`} onClick={tapMobileDirtyBedding} aria-label="清理髒污角落"><img src={hamsterAssets.cageCheckActivity.dirtyBedding} alt="" /></button>
          : <span className={`hamster-dirty-bedding is-top-right ${dirtyCornerIsScooped ? "is-scooped" : ""}`} aria-hidden="true"><img src={hamsterAssets.cageCheckActivity.dirtyBedding} alt="" /></span>)}
        {dirtyCornerIsScooped && !toiletComplete && <button type="button" className="hamster-cleaning-tool hamster-cleaning-tool--bedding" onClick={refillToiletCorner} aria-label="補上乾淨墊料"><img src={hamsterAssets.cageCheckActivity.beddingPackage} alt="" /><span>點擊補上新墊料</span></button>}
        {toiletComplete && <span className="hamster-filled-bedding is-top-right" aria-hidden="true"><img src={hamsterAssets.cageCheckActivity.cleanBedding} alt="" /></span>}
        {!dirtyCornerIsScooped && <button type="button" className={`hamster-cleaning-tool hamster-cleaning-tool--scoop ${isMobile && mobileTool === "scoop" ? "is-tap-selected" : ""} ${isMobile && !mobileTool ? "is-tap-target" : ""}`} onPointerDown={isMobile ? undefined : (event) => startDrag("scoop", event)} onClick={(event) => { if (isMobile) selectMobileTool("scoop"); else if (event.detail === 0) completeKeyboardCleaning("scoop"); }} aria-label="清理髒污角落"><img src={hamsterAssets.cageCheckActivity.scoop} alt="" /><span>{isMobile ? "點擊小鏟子" : "拖曳小鏟子清除髒污"}</span></button>}
        {toiletComplete && toiletFeedbackVisible && <section className="hamster-cage-check-note hamster-cage-check-note--scene" aria-live="polite"><span className="hamster-cage-check-note-icon" aria-hidden="true">✓</span><p>{renderKnowledgeText(render(steps[0].completion))}</p><button type="button" className="primary" onClick={() => { mergeStates({ statusMessage: "" }); setFeedback(steps[0].id, "correct"); }}>繼續清理砂浴盆 →</button></section>}
      </> : <>
        <div className={`hamster-sand-bath-stage ${siftAcknowledged ? "is-ready-to-shake" : ""} ${shakeComplete ? "is-clean" : ""} ${mobileShakePulse ? "is-shaking" : ""} ${isMobile && siftAcknowledged && !shakeComplete ? "is-tap-target" : ""}`} role={siftAcknowledged && !shakeComplete ? "button" : undefined} tabIndex={siftAcknowledged && !shakeComplete ? 0 : undefined} aria-label={siftAcknowledged && !shakeComplete ? "完成水平搖晃砂浴盆" : undefined} onPointerDown={isMobile ? undefined : (event) => siftAcknowledged && !shakeComplete && startDrag("shake", event)} onClick={isMobile ? tapMobileSandBath : undefined} onKeyDown={(event) => { if (!isMobile && (event.key === "Enter" || event.key === " ") && siftAcknowledged && !shakeComplete) { event.preventDefault(); completeKeyboardCleaning("shake"); } }}>
          <img
            className="hamster-sand-bath"
            style={sandBathStyle}
            src={sandBathImage}
            alt={shakeComplete ? "清潔完成的砂浴盆" : shakeProgress >= config.interaction.shakeProgressTarget / 2 ? "整理中的砂浴盆" : "需要清理的砂浴盆"}
          />
          {!siftComplete && <>{sandDebrisIds.map((id, index) => isMobile
            ? <button type="button" className={`hamster-sand-debris hamster-sand-debris--${index + 1} hamster-mobile-target ${mobileTool === "sieve" ? "is-tap-target" : ""} ${mobileTargetPulse === `debris-${id}` ? "is-tap-success" : ""} ${sievedDebrisIds.has(id) ? "is-removed" : ""}`} key={id} onClick={(event) => { event.stopPropagation(); tapMobileDebris(id); }} aria-label="篩除雜質"><img src={index === 1 ? hamsterAssets.cageCheckActivity.sandBathDirty : hamsterAssets.cageCheckActivity.droppings} alt="" /></button>
            : <span ref={(element) => { sandDebrisRefs.current[id] = element; }} className={`hamster-sand-debris hamster-sand-debris--${index + 1} ${sievedDebrisIds.has(id) ? "is-removed" : ""}`} key={id} aria-hidden="true"><img src={index === 1 ? hamsterAssets.cageCheckActivity.sandBathDirty : hamsterAssets.cageCheckActivity.droppings} alt="" /></span>)}<button type="button" className={`hamster-cleaning-tool hamster-cleaning-tool--sieve ${isMobile && mobileTool === "sieve" ? "is-tap-selected" : ""} ${isMobile && !mobileTool ? "is-tap-target" : ""}`} onPointerDown={isMobile ? undefined : (event) => startDrag("sieve", event)} onClick={(event) => { event.stopPropagation(); if (isMobile) selectMobileTool("sieve"); else if (event.detail === 0) completeKeyboardCleaning("sieve"); }} aria-label="篩除砂浴盆雜質"><img src={hamsterAssets.cageCheckActivity.sandSieve} alt="" /><span>{isMobile ? "點擊漏勺" : "拖曳細孔漏勺"}</span></button></>}
          {!isMobile && siftAcknowledged && !shakeComplete && <span className="hamster-sand-shake-label" aria-hidden="true">按住左右拖曳砂浴盆，讓細碎粉塵沉到底部</span>}
        </div>
        {siftComplete && !siftAcknowledged && <section className="hamster-cage-check-note hamster-cage-check-note--compact hamster-cage-check-note--scene" aria-live="polite"><span className="hamster-cage-check-note-icon" aria-hidden="true">✓</span><p>{renderKnowledgeText(render(steps[1].completion))}</p><button type="button" className="primary" onClick={() => mergeStates({ siftAcknowledged: "yes", statusMessage: "" })}>開始水平搖晃 →</button></section>}
        {shakeComplete && !isMobile && <button type="button" className="primary hamster-cage-check-finish" onClick={() => mergeStates({ cleaningFinished: "yes" })}>完成清潔 →</button>}
      </>}
    </div>
    {isMobile && shakeComplete && <div className="hamster-mobile-finish-row"><button type="button" className="primary hamster-cage-check-finish" onClick={() => mergeStates({ cleaningFinished: "yes" })}>完成清潔 →</button></div>}
    {ghostImage && dragPoint && <img className="hamster-cage-check-drag-ghost" src={ghostImage} alt="" aria-hidden="true" style={{ left: dragPoint.x, top: dragPoint.y }} />}
  </section>;
}
