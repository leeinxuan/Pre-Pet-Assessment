"use client";

/* eslint-disable @next/next/no-img-element -- The litter-box drag scene relies on native image coordinates and pointer targets. */
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { catLitterRescueConfig } from "../../../../data/species/cat/journey";
import { catAssets } from "../../../../data/species/cat/assets";
import { catReport } from "../../../../data/species/cat/report";
import { DailyCareCompletion } from "../../DailyCareCompletion";

export function CatDailyInspectionActivity({ petName, selected, onChange, onContinue }: { petName: string; selected: string[]; onChange: (selected: string[]) => void; onContinue: () => void }) {
  const litterBoxRef = useRef<HTMLDivElement>(null);
  const binRef = useRef<HTMLDivElement>(null);
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
  const [litterFilled, setLitterFilled] = useState(false);
  const [backupInstalled, setBackupInstalled] = useState(false);
  const completionCommittedRef = useRef(false);
  const scoopCountRef = useRef(0);
  useEffect(() => () => {
    if (binCloseTimerRef.current !== null) window.clearTimeout(binCloseTimerRef.current);
  }, []);
  const [wastePositions] = useState(() => catLitterRescueConfig.wasteItems.map((item) => ({ ...item })));
  const complete = selected.includes("litter-complete");
  const displayPetName = petName || "貓咪";
  const wasteItems = wastePositions;
  const urineWaste = wasteItems[0];
  const poopWaste = wasteItems[1];
  const urineRevealed = Boolean(urineWaste && revealedWaste.includes(urineWaste.id));
  const urineDiscarded = Boolean(urineWaste && selected.includes(`litter-waste:${urineWaste.id}`));
  const poopRevealed = Boolean(poopWaste && revealedWaste.includes(poopWaste.id));
  const poopDiscarded = Boolean(poopWaste && selected.includes(`litter-waste:${poopWaste.id}`));
  const stageIndex = !urineRevealed ? 0 : !urineDiscarded ? 1 : !poopRevealed ? 2 : !poopDiscarded ? 3 : !litterFilled ? 4 : 5;
  const stageInstruction = stageIndex === 0 ? "拖曳貓砂鏟到貓砂盆裡，鏟出尿團。"
    : stageIndex === 1 ? "把尿團拖進垃圾桶。"
      : stageIndex === 2 ? "拖曳貓砂鏟到貓砂盆裡，鏟出便便。"
        : stageIndex === 3 ? "把便便拖進垃圾桶。"
          : stageIndex === 4 ? "拖曳乾淨貓砂到貓砂盆裡，補上新貓砂。"
            : backupInstalled ? "貓砂盆已經乾淨又舒服了！" : "";
  const stageHelper = stageIndex === 5 && !backupInstalled
    ? "貓砂盆使用一段時間後容易累積異味和髒污，換上乾淨的備用貓砂盆，才能讓貓咪有舒服、衛生的如廁空間。"
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
  function startWasteDrag(event: ReactPointerEvent<HTMLImageElement>, wasteId: string) {
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
  function finishCleaning() {
    if (!backupInstalled || completionCommittedRef.current || complete) return;
    completionCommittedRef.current = true;
    onChange([...selected, "litter-complete"]);
  }
  function startLitterDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (stageIndex !== 4) return;
    beginPointerDrag(event, "litter");
  }
  if (complete) return <DailyCareCompletion title={`砂盆整潔，${displayPetName}才安心`} summary={`你完成了今天的貓砂盆清潔，也幫${displayPetName}換上了乾淨的備用盆。`} detail="貓咪對砂盆乾淨程度很敏感；每天清除排泄物 2–3 次，每週徹底清洗並完全晾乾，清洗期間換上備用盆，讓牠隨時有廁所可用。" reflectionTitle={`把每天的照顧，想成陪${displayPetName}長大的日常`} reflection="貓咪不需要每天帶出門，但砂盆清潔、餵食換水、互動陪玩與健康觀察都需要固定完成。不論下班多晚或週末多累，都要為牠留下穩定的時間。" dailyCareBreakdown={catReport.dailyCareBreakdown} onContinue={onContinue} />;
  return <section className="life-activity cat-inspection-activity cat-litter-rescue" onPointerMove={trackScoopSweep} onPointerUp={finishDrag} onPointerCancel={cancelDrag}>
    <div className="activity-heading"><p className="life-stage-label">日常照護</p><h1>貓砂盆清潔隊</h1><p>跟著步驟整理砂盆，讓{displayPetName}安心如廁。</p></div>
    <ol className="cat-litter-stage-rail" aria-label="清潔步驟">
      {["鏟出尿團", "丟進垃圾桶", "鏟出便便", "丟進垃圾桶", "補上新貓砂", "替換貓砂盆"].map((label, index) => <li key={`${label}-${index}`} className={index < stageIndex ? "is-complete" : index === stageIndex ? "is-active" : ""}><span>{index < stageIndex ? "✓" : index + 1}</span>{label}</li>)}
    </ol>
    <div className="cat-rescue-layout">
      <div className="cat-rescue-scene" aria-label="貓砂盆清潔互動場景">
        <div className={`cat-rescue-event-card${stageHelper && !stageInstruction ? " is-helper-only" : ""}`}><b>目前步驟</b>{stageInstruction && <p>{stageInstruction}</p>}{stageHelper && <small>{stageHelper}</small>}</div>
        <div ref={litterBoxRef} className={`cat-rescue-litter-box${litterFilled ? " is-filled" : ""}${backupInstalled ? " is-backup" : ""}${stageIndex === 0 ? " is-scoop-target" : ""}`}><img draggable={false} src={backupInstalled ? catAssets.daily.replacementLitterBox : litterFilled ? catAssets.daily.cleanLitterBox : catAssets.daily.dirtyLitterBox} alt={backupInstalled ? "更換完成的貓砂盆" : litterFilled ? "乾淨的貓砂盆" : "髒的貓砂盆"} /></div>
        {wasteItems.map((item) => revealedWaste.includes(item.id) && !selected.includes(`litter-waste:${item.id}`) && carryingWaste !== item.id ? <img key={item.id} draggable={false} className="cat-rescue-waste" style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.size}%` }} src={item.kind === "poop" ? catAssets.daily.catPoop : catAssets.daily.urineClump} alt={`拖曳${item.label}到垃圾桶`} onPointerDown={(event) => startWasteDrag(event, item.id)} onPointerMove={trackScoopSweep} onPointerUp={finishDrag} onPointerCancel={cancelDrag} /> : null)}
        <div ref={binRef} className={`cat-rescue-bin${isBinOpen ? " is-drop-target" : ""}`} style={{ left: `${catLitterRescueConfig.bin.x}%`, top: `${catLitterRescueConfig.bin.y}%`, width: `${catLitterRescueConfig.bin.size}%`, height: `${catLitterRescueConfig.bin.size}%` }} aria-label="垃圾桶"><img src={isBinOpen ? catAssets.daily.trashBinOpen : catAssets.daily.trashBin} alt={isBinOpen ? "開啟的垃圾桶" : "垃圾桶"} /></div>
        <div className="cat-rescue-controls">
          {(stageIndex === 0 || stageIndex === 2) ? <div className="cat-rescue-tool-card"><button type="button" className={`cat-rescue-scoop-tool${dragging ? " is-dragging" : ""} is-prompt`} onPointerDown={startDrag} onPointerMove={trackScoopSweep} onPointerUp={finishDrag} onPointerCancel={cancelDrag} aria-label="拖曳貓砂鏟到貓砂盆"><img draggable={false} src={catAssets.daily.litterScoop} alt="貓砂鏟" /></button></div> : stageIndex === 4 ? <div className="cat-rescue-tool-card"><button type="button" className="cat-rescue-action-icon" onPointerDown={startLitterDrag} onPointerMove={trackScoopSweep} onPointerUp={finishDrag} onPointerCancel={cancelDrag} aria-label="拖曳乾淨貓砂到貓砂盆"><img draggable={false} src={catAssets.room.litter} alt="補充新的貓砂" /></button></div> : stageIndex === 5 && !backupInstalled ? <div className="cat-rescue-choice-card"><b className="cat-rescue-replacement-label">替換貓砂盆</b><button type="button" className="cat-rescue-action-icon" onClick={installBackup} aria-label="更換新的貓砂盆"><img draggable={false} src={catAssets.daily.replacementLitterBoxIcon} alt="更換新的貓砂盆" /></button></div> : null}
        </div>
      </div>
      {backupInstalled && <div className="cat-rescue-finish-action"><button type="button" className="primary" onClick={finishCleaning}>完成清潔 <span>→</span></button></div>}
    </div>
    {dragging && dragPoint && <div className="cat-rescue-drag-ghost" style={{ left: dragPoint.x, top: dragPoint.y }} aria-hidden="true"><img src={carryingWaste ? wasteItems.find((item) => item.id === carryingWaste)?.kind === "poop" ? catAssets.daily.catPoop : catAssets.daily.urineClump : stageIndex === 4 ? catAssets.room.litter : catAssets.daily.litterScoop} alt="" /></div>}
  </section>;
}

