"use client";

/* eslint-disable @next/next/no-img-element -- The litter-box drag scene relies on native image coordinates and pointer targets. */
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { catLitterRescueConfig } from "../../../../data/species/cat/activities";
import { DailyCareCompletion } from "../../DailyCareCompletion";
import { useMobileLayout } from "../../../shared/useMobileLayout";
import { ActivityIntroPage, withPetName } from "../activity-ui";
import { useTapSequence } from "../useTapSequence";

export function CatDailyInspectionActivity({ activity, petName, selected, onChange, onActivityChange, onContinue }: { activity: { catInspectionIntroStarted: boolean }; petName: string; selected: string[]; onChange: (selected: string[]) => void; onActivityChange: (patch: { catInspectionIntroStarted: boolean }) => void; onContinue: () => void }) {
  const config = catLitterRescueConfig;
  const { assets, copy } = config;
  const litterBoxRef = useRef<HTMLButtonElement>(null);
  const binRef = useRef<HTMLButtonElement>(null);
  const [dragging, setDragging] = useState(false);
  const draggingRef = useRef(false);
  const activeDragRef = useRef<string | null>(null);
  const scoopHasLeftBoxRef = useRef(true);
  const [dragPoint, setDragPoint] = useState<{ x: number; y: number } | null>(null);
  const [revealedWaste, setRevealedWaste] = useState<string[]>([]);
  const [carryingWaste, setCarryingWaste] = useState<string | null>(null);
  const [isWasteOverBin, setIsWasteOverBin] = useState(false);
  const [binAcceptingWaste, setBinAcceptingWaste] = useState(false);
  const binCloseTimerRef = useRef<number | null>(null);
  const discardTimerRef = useRef<number | null>(null);
  const tapBusyRef = useRef(false);
  const isMobileTap = useMobileLayout();
  const [discardingWaste, setDiscardingWaste] = useState<string | null>(null);
  const [litterFilled, setLitterFilled] = useState(false);
  const [backupInstalled, setBackupInstalled] = useState(false);
  const [keyboardSelectedStage, setKeyboardSelectedStage] = useState<number | null>(null);
  const completionCommittedRef = useRef(false);
  const scoopCountRef = useRef(0);
  useEffect(() => () => {
    if (binCloseTimerRef.current !== null) window.clearTimeout(binCloseTimerRef.current);
    if (discardTimerRef.current !== null) window.clearTimeout(discardTimerRef.current);
  }, []);
  const [wastePositions] = useState(() => config.wasteItems.map((item) => ({ ...item })));
  const complete = selected.includes("litter-complete");
  const wasteItems = wastePositions;
  const urineWaste = wasteItems[0];
  const poopWaste = wasteItems[1];
  const urineRevealed = Boolean(urineWaste && revealedWaste.includes(urineWaste.id));
  const urineDiscarded = Boolean(urineWaste && selected.includes(`litter-waste:${urineWaste.id}`));
  const poopRevealed = Boolean(poopWaste && revealedWaste.includes(poopWaste.id));
  const poopDiscarded = Boolean(poopWaste && selected.includes(`litter-waste:${poopWaste.id}`));
  const stageIndex = !urineRevealed ? 0 : !urineDiscarded ? 1 : !poopRevealed ? 2 : !poopDiscarded ? 3 : !litterFilled ? 4 : 5;
  const { step: tapStep, phase: tapPhase, selectTool: selectTapTool, completeTarget: completeTapTarget } = useTapSequence<string, string, (typeof config.mobileTapSteps)[number]["outcome"]>(config.mobileTapSteps, stageIndex);
  useEffect(() => { tapBusyRef.current = false; }, [stageIndex]);
  if (!activity.catInspectionIntroStarted) return <ActivityIntroPage
    config={config.intro}
    petName={petName}
    species="cat"
    onStart={() => onActivityChange({ catInspectionIntroStarted: true })}
  />;
  const stageInstruction = isMobileTap && !backupInstalled
    ? stageIndex === 5 ? "" : tapStep?.prompts[tapPhase] ?? ""
    : stageIndex <= 4 ? copy.stageInstructions[stageIndex as 0 | 1 | 2 | 3 | 4]
      : backupInstalled ? copy.backupCompleteInstruction : "";
  const stageHelper = stageIndex === 5 && !backupInstalled
    ? copy.backupHelper
    : undefined;

  function isPointInsideRect(clientX: number, clientY: number, element: HTMLElement | null, tolerance = 0) {
    const rect = element?.getBoundingClientRect();
    return Boolean(rect && clientX >= rect.left - tolerance && clientX <= rect.right + tolerance && clientY >= rect.top - tolerance && clientY <= rect.bottom + tolerance);
  }
  function isInsideLitterBox(clientX: number, clientY: number) {
    const rect = litterBoxRef.current?.getBoundingClientRect();
    if (!rect) return false;
    const tolerance = Math.min(14, Math.max(7, rect.width * .035));
    return isPointInsideRect(clientX, clientY, litterBoxRef.current, tolerance);
  }
  function isOverTrashBin(clientX: number, clientY: number) {
    return isPointInsideRect(clientX, clientY, binRef.current, 12);
  }
  const isBinOpen = isWasteOverBin || binAcceptingWaste;
  function holdBinOpenForDiscard() {
    setBinAcceptingWaste(true);
    if (binCloseTimerRef.current !== null) window.clearTimeout(binCloseTimerRef.current);
    binCloseTimerRef.current = window.setTimeout(() => {
      setBinAcceptingWaste(false);
      binCloseTimerRef.current = null;
    }, 280);
  }
  function handleTapTool(tool: string) {
    if (!isMobileTap || tapBusyRef.current || backupInstalled) return;
    selectTapTool(tool);
  }
  function handleTapTarget(target: string) {
    if (!isMobileTap || tapBusyRef.current || backupInstalled) return;
    const outcome = completeTapTarget(target);
    if (!outcome) return;
    tapBusyRef.current = true;
    switch (outcome.type) {
      case "reveal":
        setRevealedWaste((current) => current.includes(outcome.itemId) ? current : [...current, outcome.itemId]);
        break;
      case "discard":
        holdBinOpenForDiscard();
        setDiscardingWaste(outcome.itemId);
        discardTimerRef.current = window.setTimeout(() => {
          onChange([...selected, `litter-waste:${outcome.itemId}`]);
          setDiscardingWaste(null);
          discardTimerRef.current = null;
        }, 350);
        break;
      case "fill":
        setLitterFilled(true);
        break;
      case "backup":
        setBackupInstalled(true);
        break;
    }
  }
  function beginPointerDrag(event: ReactPointerEvent<HTMLElement>, kind: string) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    activeDragRef.current = kind;
    draggingRef.current = true;
    setDragging(true);
    setDragPoint({ x: event.clientX, y: event.clientY });
  }
  function startDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (complete || (stageIndex !== 0 && stageIndex !== 2)) return;
    // The tool is visually parked outside the litter box. Starting another drag
    // therefore confirms the required "move out, then drag in again" transition.
    if (scoopCountRef.current > 0) scoopHasLeftBoxRef.current = true;
    beginPointerDrag(event, "scoop");
  }
  function startWasteDrag(event: ReactPointerEvent<HTMLButtonElement>, wasteId: string) {
    const expectedWasteId = stageIndex === 1 ? urineWaste?.id : stageIndex === 3 ? poopWaste?.id : undefined;
    if (!expectedWasteId || wasteId !== expectedWasteId || selected.includes(`litter-waste:${wasteId}`)) return;
    beginPointerDrag(event, wasteId);
    setCarryingWaste(wasteId);
    setIsWasteOverBin(false);
  }
  function trackScoopSweep(event: ReactPointerEvent<HTMLElement>) {
    if (!draggingRef.current) return;
    setDragPoint({ x: event.clientX, y: event.clientY });
    if (activeDragRef.current === "scoop" && !isInsideLitterBox(event.clientX, event.clientY)) scoopHasLeftBoxRef.current = true;
    if (activeDragRef.current && activeDragRef.current !== "scoop" && activeDragRef.current !== "litter") setIsWasteOverBin(isOverTrashBin(event.clientX, event.clientY));
  }
  function finishDrag(event: ReactPointerEvent<HTMLElement>) {
    if (!draggingRef.current) return;
    const dragKind = activeDragRef.current;
    draggingRef.current = false;
    activeDragRef.current = null;
    setDragging(false); setDragPoint(null);
    setIsWasteOverBin(false);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (dragKind === "litter") {
      if (isInsideLitterBox(event.clientX, event.clientY)) setLitterFilled(true);
      return;
    }
    if (dragKind && dragKind !== "scoop") {
      if (isOverTrashBin(event.clientX, event.clientY)) {
        holdBinOpenForDiscard();
        onChange([...selected, `litter-waste:${dragKind}`]);
        setCarryingWaste(null);
      } else setCarryingWaste(null);
      return;
    }
    if (dragKind !== "scoop") return;
    if (!isInsideLitterBox(event.clientX, event.clientY)) {
      return;
    }
    if (!scoopHasLeftBoxRef.current) return;
    const nextWaste = stageIndex === 0 ? urineWaste : stageIndex === 2 ? poopWaste : undefined;
    if (!nextWaste) return;
    scoopCountRef.current += 1;
    scoopHasLeftBoxRef.current = false;
    setRevealedWaste((current) => current.includes(nextWaste.id) ? current : [...current, nextWaste.id]);
  }
  function cancelDrag(event: ReactPointerEvent<HTMLElement>) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    activeDragRef.current = null;
    setDragging(false);
    setDragPoint(null);
    setCarryingWaste(null);
    setIsWasteOverBin(false);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function installBackup() {
    if (!litterFilled || backupInstalled) return;
    setBackupInstalled(true);
  }

  function selectKeyboardTool() {
    if (stageIndex > 4) return;
    setKeyboardSelectedStage(stageIndex);
    window.requestAnimationFrame(() => (stageIndex === 1 || stageIndex === 3 ? binRef.current : litterBoxRef.current)?.focus());
  }

  function selectWasteByKeyboard(wasteId: string) {
    const expectedWasteId = stageIndex === 1 ? urineWaste?.id : stageIndex === 3 ? poopWaste?.id : undefined;
    if (!expectedWasteId || wasteId !== expectedWasteId) return;
    setKeyboardSelectedStage(stageIndex);
    window.requestAnimationFrame(() => binRef.current?.focus());
  }

  function completeKeyboardStage() {
    if (keyboardSelectedStage !== stageIndex) return;
    const waste = stageIndex === 0 ? urineWaste : stageIndex === 2 ? poopWaste : undefined;
    const wasteToDiscard = stageIndex === 1 ? urineWaste : stageIndex === 3 ? poopWaste : undefined;

    if (waste) {
      setRevealedWaste((current) => current.includes(waste.id) ? current : [...current, waste.id]);
    } else if (wasteToDiscard) {
      holdBinOpenForDiscard();
      onChange([...selected, `litter-waste:${wasteToDiscard.id}`]);
    } else if (stageIndex === 4) {
      setLitterFilled(true);
    }
    setKeyboardSelectedStage(null);
  }

  const keyboardStep = stageIndex <= 4 ? copy.keyboardSteps[stageIndex as 0 | 1 | 2 | 3 | 4] : undefined;
  function finishCleaning() {
    if (!backupInstalled || completionCommittedRef.current || complete) return;
    completionCommittedRef.current = true;
    onChange([...selected, "litter-complete"]);
  }
  function startLitterDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (stageIndex !== 4) return;
    beginPointerDrag(event, "litter");
  }
  if (complete) return <DailyCareCompletion title={withPetName(copy.completion.title, petName, "cat")} summary={withPetName(copy.completion.summary, petName, "cat")} detail={copy.completion.detail} reflectionTitle={withPetName(copy.completion.reflectionTitle, petName, "cat")} reflection={copy.completion.reflection} dailyCareBreakdown={copy.completion.dailyCareBreakdown} onContinue={onContinue} />;
  return <section className="life-activity cat-inspection-activity cat-litter-rescue" onPointerMove={trackScoopSweep} onPointerUp={finishDrag} onPointerCancel={cancelDrag}>
    <div className="activity-heading"><p className="life-stage-label">{copy.heading.eyebrow}</p><h1>{copy.heading.title}</h1><p>{withPetName(copy.heading.description, petName, "cat")}</p></div>
    <ol className="cat-litter-stage-rail" aria-label={copy.aria.stageRail}>
      {copy.stageLabels.map((label, index) => <li key={`${label}-${index}`} className={index < stageIndex ? "is-complete" : index === stageIndex ? "is-active" : ""}><span>{index < stageIndex ? "✓" : index + 1}</span>{label}</li>)}
    </ol>
    <div className="cat-litter-stage-summary" role="status" aria-label={`${copy.aria.stageRail}：步驟 ${stageIndex + 1} / ${copy.stageLabels.length}，${copy.stageLabels[stageIndex]}`}>
      <strong>步驟 {stageIndex + 1} / {copy.stageLabels.length}</strong>
      <span className="cat-litter-stage-dots" aria-hidden="true">
        {copy.stageLabels.map((_, index) => <i key={index} className={index < stageIndex ? "is-complete" : index === stageIndex ? "is-active" : ""} />)}
      </span>
      <span className="cat-litter-stage-name" title={copy.stageLabels[stageIndex]}>{copy.stageLabels[stageIndex]}</span>
    </div>
    <div className="cat-rescue-layout">
      <div className="cat-rescue-scene" aria-label={copy.aria.scene}>
        <div className={`cat-rescue-event-card${stageHelper && !stageInstruction ? " is-helper-only" : ""}`}><b>{copy.aria.currentStep}</b>{stageInstruction && <p>{stageInstruction}</p>}{stageHelper && <small>{stageHelper}</small>}</div>
        <button ref={litterBoxRef} type="button" className={`cat-rescue-litter-box${litterFilled ? " is-filled" : ""}${backupInstalled ? " is-backup" : ""}${!isMobileTap && stageIndex === 0 ? " is-scoop-target" : ""}${isMobileTap && tapStep?.target === "litter-box" && tapPhase === "toolSelected" ? " is-tap-target" : ""}`} aria-label={keyboardStep?.action ?? copy.aria.litterBox} aria-disabled={isMobileTap ? tapStep?.target !== "litter-box" || tapPhase !== "toolSelected" : keyboardSelectedStage !== stageIndex} onClick={(event) => { if (isMobileTap) handleTapTarget("litter-box"); else if (event.detail === 0) completeKeyboardStage(); }}><img draggable={false} src={backupInstalled ? assets.replacementLitterBox : litterFilled ? assets.cleanLitterBox : assets.dirtyLitterBox} alt="" /></button>
        {wasteItems.map((item) => {
          const isTapWaste = isMobileTap && tapStep?.target === item.id && (stageIndex === 0 || stageIndex === 2);
          const isDesktopWaste = !isMobileTap && revealedWaste.includes(item.id) && !selected.includes(`litter-waste:${item.id}`) && carryingWaste !== item.id;
          return isTapWaste || isDesktopWaste ? <button type="button" key={item.id} className={`cat-rescue-waste${isTapWaste && tapPhase === "toolSelected" ? " is-tap-target" : ""}`} style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.size}%` }} aria-label={isMobileTap ? `鏟起${item.label}` : `選取${item.label}`} aria-disabled={isMobileTap && tapPhase !== "toolSelected"} onPointerDown={isMobileTap ? undefined : (event) => startWasteDrag(event, item.id)} onPointerMove={isMobileTap ? undefined : trackScoopSweep} onPointerUp={isMobileTap ? undefined : finishDrag} onPointerCancel={isMobileTap ? undefined : cancelDrag} onClick={(event) => { if (isMobileTap) handleTapTarget(item.id); else if (event.detail === 0) selectWasteByKeyboard(item.id); }}><img draggable={false} src={item.kind === "poop" ? assets.catPoop : assets.urineClump} alt="" /></button> : null;
        })}
        <button ref={binRef} type="button" className={`cat-rescue-bin${isBinOpen ? " is-drop-target" : ""}${isMobileTap && tapStep?.target === "bin" && tapPhase === "itemCollected" ? " is-tap-target" : ""}`} style={{ left: `${config.bin.x}%`, top: `${config.bin.y}%`, width: `${config.bin.size}%`, height: `${config.bin.size}%` }} aria-label={keyboardStep?.action ?? copy.aria.trashBin} aria-disabled={isMobileTap ? tapStep?.target !== "bin" || tapPhase !== "itemCollected" : keyboardSelectedStage !== stageIndex} onClick={(event) => { if (isMobileTap) handleTapTarget("bin"); else if (event.detail === 0) completeKeyboardStage(); }}><img src={isBinOpen ? assets.trashBinOpen : assets.trashBin} alt="" />{discardingWaste && <img className="cat-rescue-discarding-waste" src={wasteItems.find((item) => item.id === discardingWaste)?.kind === "poop" ? assets.catPoop : assets.urineClump} alt="" />}</button>
      <div className="cat-rescue-controls">
          {(stageIndex === 0 || stageIndex === 2) ? <div className="cat-rescue-tool-card"><button type="button" className={`cat-rescue-scoop-tool${dragging ? " is-dragging" : ""}${!isMobileTap || tapPhase === "idle" ? " is-prompt" : ""}${isMobileTap && tapPhase === "toolSelected" ? " is-tap-selected" : ""}`} onPointerDown={isMobileTap ? undefined : startDrag} onPointerMove={isMobileTap ? undefined : trackScoopSweep} onPointerUp={isMobileTap ? undefined : finishDrag} onPointerCancel={isMobileTap ? undefined : cancelDrag} onClick={(event) => { if (isMobileTap) handleTapTool("scoop"); else if (event.detail === 0) selectKeyboardTool(); }} aria-label={keyboardStep?.select ?? copy.keyboardSteps[0].select}><img draggable={false} src={assets.litterScoop} alt="" /></button></div> : isMobileTap && (stageIndex === 1 || stageIndex === 3) ? <div className="cat-rescue-collected-tool" aria-hidden="true"><img src={assets.litterScoop} alt="" /><img className="cat-rescue-collected-waste" src={stageIndex === 1 ? assets.urineClump : assets.catPoop} alt="" /></div> : stageIndex === 4 ? <div className="cat-rescue-tool-card"><button type="button" className={`cat-rescue-action-icon${isMobileTap && tapPhase === "idle" ? " is-tap-prompt" : ""}${isMobileTap && tapPhase === "toolSelected" ? " is-tap-selected" : ""}`} onPointerDown={isMobileTap ? undefined : startLitterDrag} onPointerMove={isMobileTap ? undefined : trackScoopSweep} onPointerUp={isMobileTap ? undefined : finishDrag} onPointerCancel={isMobileTap ? undefined : cancelDrag} onClick={(event) => { if (isMobileTap) handleTapTool("clean-litter"); else if (event.detail === 0) selectKeyboardTool(); }} aria-label={keyboardStep?.select ?? copy.keyboardSteps[4].select}><img draggable={false} src={assets.cleanLitter} alt="" /></button></div> : stageIndex === 5 && !backupInstalled ? <div className="cat-rescue-choice-card"><b className="cat-rescue-replacement-label">{copy.replaceLabel}</b><button type="button" className={`cat-rescue-action-icon${isMobileTap && tapPhase === "idle" ? " is-tap-prompt" : ""}${isMobileTap && tapPhase === "toolSelected" ? " is-tap-selected" : ""}`} onClick={() => { if (isMobileTap) handleTapTool("backup-box"); else installBackup(); }} aria-label={copy.aria.replaceLitterBox}><img draggable={false} src={assets.replacementLitterBoxIcon} alt="" /></button></div> : null}
        </div>
      </div>
      {backupInstalled && <div className="cat-rescue-finish-action"><button type="button" className="primary" onClick={finishCleaning}>{copy.completeLabel} <span>→</span></button></div>}
    </div>
    {dragging && dragPoint && <div className="cat-rescue-drag-ghost" style={{ left: dragPoint.x, top: dragPoint.y }} aria-hidden="true"><img src={carryingWaste ? wasteItems.find((item) => item.id === carryingWaste)?.kind === "poop" ? assets.catPoop : assets.urineClump : stageIndex === 4 ? assets.cleanLitter : assets.litterScoop} alt="" /></div>}
  </section>;
}
