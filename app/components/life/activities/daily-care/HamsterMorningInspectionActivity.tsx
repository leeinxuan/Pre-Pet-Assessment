"use client";

/* eslint-disable @next/next/no-img-element -- The activity uses data-owned interactive artwork. */

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import type { LifeActivityState } from "../../../../game-types";
import { hamsterAssets, hamsterCageCheck, hamsterReport } from "../../../../data/species/hamster/activities";
import { hamsterCopy } from "../../../../data/species/hamster/copy";
import { DailyCareCompletion } from "../../DailyCareCompletion";
import { ActivityIntroPage, renderKnowledgeText, withPetName } from "../activity-ui";

type Change = (patch: Partial<LifeActivityState>) => void;
type DragKind = "scoop" | "sieve" | "shake";

/** 倉鼠 §5.3.2：以物種資料驅動的廁所角落與砂浴盆清潔活動。 */
export function HamsterMorningInspectionActivity({ activity, petName, onChange, onContinue }: {
  activity: LifeActivityState; petName: string; onChange: Change; onContinue: () => void;
}) {
  const config = hamsterCageCheck;
  const steps = config.progressSteps;
  const displayPetName = petName.trim() || hamsterCopy.animalNameFallback;
  const render = (value: string) => withPetName(value, petName, "hamster");
  const states = activity.hamsterInspectionStates;
  const toiletComplete = activity.hamsterInspectionCompleted.includes(steps[0].id);
  const sievePasses = typeof states.sievePasses === "number" ? states.sievePasses : 0;
  const siftComplete = sievePasses >= config.interaction.siftPassesRequired;
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

  function startActivity() {
    onChange({ hamsterInspectionStarted: true, hamsterInspectionStates: { toiletCorner: config.interaction.toiletCorner } });
  }

  function startDrag(kind: DragKind, event: ReactPointerEvent<HTMLElement>) {
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

  function finishSieveDrag(event: ReactPointerEvent<HTMLElement>) {
    if (dragging !== "sieve" || !dragStart.current || siftComplete) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const movedFarEnough = Math.abs(event.clientX - dragStart.current.x) >= bounds.width * .3;
    setDragging(null); dragStart.current = null; setDragPoint(null);
    if (!movedFarEnough) return mergeStates({ statusMessage: "再拖遠一點，讓漏勺完整劃過砂浴盆。" });
    const nextPasses = Math.min(config.interaction.siftPassesRequired, sievePasses + 1);
    mergeStates({ sievePasses: nextPasses, statusMessage: nextPasses === config.interaction.siftPassesRequired ? "✅ 雜質清理完成" : `已篩出一部分雜質（${nextPasses} / ${config.interaction.siftPassesRequired}）` });
    if (nextPasses === config.interaction.siftPassesRequired) completeStep(steps[1].id);
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
      const nextPasses = Math.min(config.interaction.siftPassesRequired, sievePasses + 1);
      mergeStates({ sievePasses: nextPasses, statusMessage: nextPasses === config.interaction.siftPassesRequired ? "✅ 雜質清理完成" : `已篩出一部分雜質（${nextPasses} / ${config.interaction.siftPassesRequired}）` });
      if (nextPasses === config.interaction.siftPassesRequired) completeStep(steps[1].id);
    }
    if (tool === "shake" && !shakeComplete) finishShakeProgress();
  }

  if (!activity.hamsterInspectionStarted) return <ActivityIntroPage config={config.intro} petName={petName} species="hamster" onStart={startActivity} />;
  if (complete) return <DailyCareCompletion title={render(config.completion.title)} summary={render(config.completion.subtitle)} detail={render(config.completion.description)} reflectionTitle={render(config.completion.reflectionTitle)} reflection={render(config.completion.reflection)} dailyCareBreakdown={hamsterReport.dailyCareBreakdown} careTimeTitle={config.completion.careTitle} continueLabel={config.completion.continueLabel} onContinue={onContinue} />;

  const activeIndex = !toiletComplete ? 0 : !siftComplete ? 1 : 2;
  const promptText = !toiletSummaryAcknowledged
    ? (statusMessage || (dirtyCornerIsScooped ? config.interaction.refillHint : steps[0].prompt))
    : !siftComplete
      ? (statusMessage || steps[1].prompt)
      : !siftAcknowledged
        ? "✅ 雜質清理完成，準備水平搖晃砂盆。"
        : shakeComplete
          ? config.interaction.shakeCompleteHint
          : config.interaction.shakeHint;
  const ghostImage = dragging === "scoop" ? hamsterAssets.cageCheckActivity.scoop : dragging === "sieve" ? hamsterAssets.cageCheckActivity.sandSieve : null;
  const sandBathStyle = { "--hamster-sand-offset": `${shakeOffset}px` } as CSSProperties;
  return <section className="guided-activity hamster-cage-check" aria-label={`${displayPetName}的清潔日常`}>
    <header className="guided-activity-heading hamster-cage-check-heading"><p className="life-stage-label">日常照護</p><h1>{displayPetName} 的清潔日常</h1><p className="hamster-cage-check-message">{render(config.sceneDescription)}</p></header>
    <ol className="rabbit-grooming-progress hamster-cage-check-progress" aria-label="清潔日常進度">
      {steps.map((step, index) => {
        const isComplete = (index === 0 && toiletComplete) || (index === 1 && siftComplete) || (index === 2 && shakeComplete);
        return <li key={step.id} className={isComplete ? "done" : index === activeIndex ? "active" : ""}><span>{isComplete ? "✓" : index + 1}</span>{step.label}</li>;
      })}
    </ol>
    <div className="hamster-cage-check-scene" onPointerMove={updateDrag} onPointerUp={(event) => {
      if (dragging === "scoop") finishToiletDrag(event);
      if (dragging === "sieve") finishSieveDrag(event);
      if (dragging === "shake") finishShakeDrag();
    }} onPointerCancel={() => { setDragging(null); dragStart.current = null; setDragPoint(null); setShakeOffset(0); mergeStates({ shakeProgress: Math.round(shakeProgressRef.current) }); }}>
      {(!siftAcknowledged || shakeComplete) && <p className="hamster-cage-check-prompt" role={shakeComplete ? "status" : undefined}>{render(promptText)}</p>}
      {siftAcknowledged && !shakeComplete && <div className="hamster-shake-progress" aria-label="砂浴盆整理進度"><b>搖晃進度</b><div role="progressbar" aria-valuemin={0} aria-valuemax={config.interaction.shakeProgressTarget} aria-valuenow={Math.round(shakeProgress)}><span style={{ width: `${(shakeProgress / config.interaction.shakeProgressTarget) * 100}%` }} /></div></div>}
      {!toiletSummaryAcknowledged ? <>
        <img className="hamster-cage-floor" src={hamsterAssets.cageCheckActivity.floorView} alt={`${displayPetName}的籠具底部`} />
        {!toiletComplete && <span className={`hamster-dirty-bedding is-top-right ${dirtyCornerIsScooped ? "is-scooped" : ""}`} aria-hidden="true"><img src={hamsterAssets.cageCheckActivity.dirtyBedding} alt="" /></span>}
        {dirtyCornerIsScooped && !toiletComplete && <button type="button" className="hamster-cleaning-tool hamster-cleaning-tool--bedding" onClick={refillToiletCorner} aria-label="補上乾淨墊料"><img src={hamsterAssets.cageCheckActivity.beddingPackage} alt="" /><span>點擊補上新墊料</span></button>}
        {toiletComplete && <span className="hamster-filled-bedding is-top-right" aria-hidden="true"><img src={hamsterAssets.cageCheckActivity.cleanBedding} alt="" /></span>}
        {!dirtyCornerIsScooped && <button type="button" className="hamster-cleaning-tool hamster-cleaning-tool--scoop" onPointerDown={(event) => startDrag("scoop", event)} onClick={(event) => { if (event.detail === 0) completeKeyboardCleaning("scoop"); }} aria-label="清理髒污角落"><img src={hamsterAssets.cageCheckActivity.scoop} alt="" /><span>拖曳小鏟子</span></button>}
        {toiletComplete && toiletFeedbackVisible && <section className="hamster-cage-check-note hamster-cage-check-note--scene" aria-live="polite"><span className="hamster-cage-check-note-icon" aria-hidden="true">✓</span><p>{renderKnowledgeText(render(steps[0].completion))}</p><button type="button" className="primary" onClick={() => { mergeStates({ statusMessage: "" }); setFeedback(steps[0].id, "correct"); }}>繼續清理砂浴盆 →</button></section>}
      </> : <>
        <div className={`hamster-sand-bath-stage ${siftAcknowledged ? "is-ready-to-shake" : ""} ${shakeComplete ? "is-clean" : ""}`} role={siftAcknowledged && !shakeComplete ? "button" : undefined} tabIndex={siftAcknowledged && !shakeComplete ? 0 : undefined} aria-label={siftAcknowledged && !shakeComplete ? "完成水平搖晃砂浴盆" : undefined} onPointerDown={(event) => siftAcknowledged && !shakeComplete && startDrag("shake", event)} onKeyDown={(event) => { if ((event.key === "Enter" || event.key === " ") && siftAcknowledged && !shakeComplete) { event.preventDefault(); completeKeyboardCleaning("shake"); } }}>
          <img
            className="hamster-sand-bath"
            style={sandBathStyle}
            src={shakeComplete ? hamsterAssets.cageCheckActivity.sandBathClean : hamsterAssets.cageCheckActivity.sandBathMess}
            alt={shakeComplete ? "清潔完成的砂浴盆" : "需要清理的砂浴盆"}
          />
          {!siftComplete && <>{Array.from({ length: config.interaction.siftPassesRequired }).map((_, index) => <span className={`hamster-sand-debris hamster-sand-debris--${index + 1} ${sievePasses > index ? "is-removed" : ""}`} key={index} aria-hidden="true"><img src={index === 1 ? hamsterAssets.cageCheckActivity.sandBathDirty : hamsterAssets.cageCheckActivity.droppings} alt="" /></span>)}<button type="button" className="hamster-cleaning-tool hamster-cleaning-tool--sieve" onPointerDown={(event) => startDrag("sieve", event)} onClick={(event) => { if (event.detail === 0) completeKeyboardCleaning("sieve"); }} aria-label="篩除砂浴盆雜質"><img src={hamsterAssets.cageCheckActivity.sandSieve} alt="" /><span>拖曳細孔漏勺</span></button></>}
          {siftAcknowledged && !shakeComplete && <span className="hamster-sand-shake-label" aria-hidden="true">按住左右拖曳砂浴盆，讓細碎粉塵沉到底部</span>}
        </div>
        {siftComplete && !siftAcknowledged && <section className="hamster-cage-check-note hamster-cage-check-note--compact hamster-cage-check-note--scene" aria-live="polite"><span className="hamster-cage-check-note-icon" aria-hidden="true">✓</span><p>{renderKnowledgeText(render(steps[1].completion))}</p><button type="button" className="primary" onClick={() => mergeStates({ siftAcknowledged: "yes", statusMessage: "" })}>開始水平搖晃 →</button></section>}
        {shakeComplete && <button type="button" className="primary hamster-cage-check-finish" onClick={() => mergeStates({ cleaningFinished: "yes" })}>完成清潔 →</button>}
      </>}
    </div>
    {ghostImage && dragPoint && <img className="hamster-cage-check-drag-ghost" src={ghostImage} alt="" aria-hidden="true" style={{ left: dragPoint.x, top: dragPoint.y }} />}
  </section>;
}
