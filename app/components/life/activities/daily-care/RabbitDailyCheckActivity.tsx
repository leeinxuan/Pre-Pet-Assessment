"use client";

/* eslint-disable @next/next/no-img-element -- Rabbit grooming uses native images for anatomy hitboxes and drag positioning. */
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { rabbitGroomingConfig } from "../../../../data/species/rabbit/journey";
import { rabbitActivityScenarios } from "../../../../data/species/rabbit/scenarios";
import { rabbitGroomingCompletion } from "../../../../data/species/rabbit/report";
import type { LifeActivityState, Scenario, ScenarioChoice } from "../../../../game-types";
import { DailyCareCompletion } from "../../DailyCareCompletion";
import { ActivityIntroPage, renderKnowledgeText, withPetName } from "../activity-ui";

type RabbitObservationStatus = "question" | "incorrect" | "correct" | "comparison";

export function RabbitDailyCheckActivity({ activity, petName, onChange, onChoose, onContinue }: { activity: LifeActivityState; petName: string; onChange: (patch: Partial<LifeActivityState>) => void; onChoose: (scenario: Scenario, choice: ScenarioChoice) => void; onContinue: () => void }) {
  const scenario = rabbitActivityScenarios["rabbit-daily-check"];
  const completed = activity.rabbitDailyCheckSteps;
  const state = activity.rabbitGroomingState || rabbitGroomingConfig.initialState;
  const [draggingBrush, setDraggingBrush] = useState(false);
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
  const [magnifierPosition, setMagnifierPosition] = useState<{ x: number; y: number } | null>(null);
  const [observation, setObservation] = useState<{ key: keyof typeof rabbitGroomingConfig.observations; displayState: "normal" | "warning"; status: RabbitObservationStatus } | null>(null);
  const brushTargetRef = useRef<HTMLDivElement>(null);
  const groomingSteps = rabbitGroomingConfig.groomingSteps;
  const current = groomingSteps.find((step) => step.stateId === state)
    ?? (state === "part-1-footpad-observation" ? groomingSteps.find((step) => step.id === "groom-footpad") : undefined);
  const isBrushStep = Boolean(current && current.id !== "groom-footpad");
  const isTransition = state === "part-2-transition";
  const isInspection = state === "part-2-inspection" || state === "part-2-incisor-observation" || state === "part-2-nail-observation";
  const furCollectionProgress = [0, 33, 67, 100][groomingSteps.slice(0, 3).filter((step) => completed.includes(step.id)).length] ?? 100;
  const add = (id: string) => onChange({ rabbitDailyCheckSteps: completed.includes(id) ? completed : [...completed, id] });
  const setState = (next: string) => onChange({ rabbitGroomingState: next });
  const showMagnifier = (event: ReactPointerEvent<HTMLElement>) => setMagnifierPosition({ x: event.clientX, y: event.clientY });

  useEffect(() => {
    const nextState: Record<string, string> = { "part-1-step-1-complete": "part-1-step-2-back-sides", "part-1-step-2-complete": "part-1-step-3-hindquarters", "part-1-step-3-complete": "part-1-step-4-footpad", "part-1-complete": "part-2-transition", "part-2-transition": "part-2-inspection" };
    const next = nextState[state];
    if (!next) return;
    const timer = window.setTimeout(() => setState(next), state === "part-2-transition" ? 3400 : 500);
    return () => window.clearTimeout(timer);
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps -- transitions are driven only by the grooming state machine.

  const openObservation = (key: keyof typeof rabbitGroomingConfig.observations) => {
    const stored = activity.rabbitGroomingInspection?.[key];
    const displayState = stored?.displayState ?? (Math.random() < 0.5 ? "normal" : "warning");
    const status = stored?.status ?? "question";
    if (!stored) onChange({
      rabbitGroomingObservations: { ...activity.rabbitGroomingObservations, [key]: displayState },
      rabbitGroomingInspection: { ...activity.rabbitGroomingInspection, [key]: { displayState, status, attempts: 0 } },
    });
    setObservation({ key, displayState, status });
  };
  const answerObservation = (choiceId: "normal" | "warning") => {
    if (!observation) return;
    const isCorrect = choiceId === observation.displayState;
    const nextStatus: "correct" | "incorrect" = isCorrect ? "correct" : "incorrect";
    const prior = activity.rabbitGroomingInspection?.[observation.key];
    const next = { displayState: observation.displayState, status: nextStatus, attempts: (prior?.attempts ?? 0) + (isCorrect ? 0 : 1) };
    onChange({ rabbitGroomingInspection: { ...activity.rabbitGroomingInspection, [observation.key]: next } });
    setObservation({ ...observation, status: nextStatus });
  };
  const confirmObservation = () => {
    if (!observation || (observation.status !== "correct" && observation.status !== "comparison")) return;
    const nextState = observation.key === "footpad" ? "part-1-complete" : observation.key === "incisor" ? "part-2-nail-observation" : "interaction-complete";
    if (observation.key === "footpad") add("groom-footpad");
    if (observation.key === "incisor") add("inspect-incisor");
    if (observation.key === "nail") { add("inspect-nail"); onChoose(scenario, scenario.choices[1]); }
    setObservation(null);
    setState(nextState);
  };
  const finishBrush = (event: ReactPointerEvent<HTMLElement>) => {
    if (!draggingBrush || !current || !isBrushStep) return;
    setDraggingBrush(false); setPoint(null);
    const inRect = (rect: DOMRect | undefined, padding = 0) => Boolean(rect && event.clientX >= rect.left - padding && event.clientX <= rect.right + padding && event.clientY >= rect.top - padding && event.clientY <= rect.bottom + padding);
    // 只接受目前局部提示對應的部位，避免梳到其他身體區域也被判定完成。
    const overTarget = inRect(brushTargetRef.current?.getBoundingClientRect(), 12);
    if (!overTarget) return;
    add(current.id); setState(current.completeStateId);
  };
  if (!activity.rabbitGroomingIntroStarted) return <ActivityIntroPage
    config={rabbitGroomingConfig.intro}
    petName={petName}
    species="rabbit"
    onStart={() => { setObservation(null); setDraggingBrush(false); setPoint(null); onChange({ rabbitGroomingIntroStarted: true, rabbitDailyCheckSteps: [], rabbitGroomingState: rabbitGroomingConfig.initialState, rabbitGroomingObservations: {}, rabbitGroomingInspection: {} }); }}
  />;
  if (state === "interaction-complete") return <DailyCareCompletion title={withPetName(rabbitGroomingCompletion.title, petName)} summary={withPetName(rabbitGroomingCompletion.subtitle, petName)} detail={withPetName(rabbitGroomingCompletion.description, petName)} reflectionTitle={rabbitGroomingCompletion.reflectionTitle} reflection={rabbitGroomingCompletion.reflectionContent.map((paragraph) => withPetName(paragraph, petName))} dailyCareBreakdown={rabbitGroomingCompletion.careTimeItems} careTimeTitle={rabbitGroomingCompletion.careTimeTitle} careTimeSupplement={rabbitGroomingCompletion.careTimeSupplement} continueLabel={rabbitGroomingCompletion.continueLabel} onContinue={onContinue} />;
  const firstPart = !isInspection && !isTransition;
  const characterKey = isInspection || isTransition ? "inspection" : current?.character ?? (state.startsWith("part-1-step-") && state.endsWith("-complete") ? "eyesClose" : "idle");
  const furBallKey = current?.furBall ?? (state === "part-1-step-1-complete" ? "furBallStep1" : state === "part-1-step-2-complete" ? "furBallStep2" : "furBallStep3");
  const observationData = observation ? rabbitGroomingConfig.observations[observation.key] : null;
  return <section className="rabbit-activity rabbit-grooming-activity" onPointerMove={(event) => draggingBrush && setPoint({ x: event.clientX, y: event.clientY })} onPointerUp={finishBrush} onPointerCancel={() => { setDraggingBrush(false); setPoint(null); }} aria-labelledby="rabbit-grooming-title">
    <header><p>日常照護</p><h1 id="rabbit-grooming-title">{withPetName(scenario.title, petName)}</h1><p className="rabbit-grooming-scene-description">{withPetName(firstPart ? rabbitGroomingConfig.sceneDescriptions.part1 : rabbitGroomingConfig.sceneDescriptions.part2, petName)}</p><span>{firstPart ? "第一部分：梳毛與足底確認" : "第二部分：門齒與指甲外觀檢查"}</span></header>
    {firstPart && <ol className="rabbit-grooming-progress" aria-label="美容保養進度">{groomingSteps.map((step, index) => <li key={step.id} className={completed.includes(step.id) ? "done" : current?.id === step.id ? "active" : ""}><span>{completed.includes(step.id) ? "✓" : index + 1}</span>{step.label}</li>)}</ol>}
    {isTransition ? <div className="rabbit-grooming-transition" role="status"><span aria-hidden="true">✓</span><div><p>第一部分完成</p><strong>梳毛與足底檢查都完成了</strong><small>接著一起看看 {petName || "兔兔"} 的門齒與指甲外觀。</small></div></div> : <>
      <div className={`rabbit-grooming-scene ${observation ? "has-observation" : ""}`}>
        {!observation && <p className="rabbit-grooming-scene-prompt">{isInspection ? "點擊嘴部與前腳，完成外觀檢查。" : current?.instruction ?? "請依照提示完成保養。"}</p>}
        {current?.id === "groom-hind-tail" && <aside className="rabbit-grooming-caution"><b>特別注意！</b><span>{current.caution}</span></aside>}
        <div className="rabbit-grooming-character"><img src={rabbitGroomingConfig.assets[characterKey]} alt={petName || "兔兔"} onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement?.classList.add("asset-unavailable"); }} />
          {!isInspection && current && (current.id === "groom-footpad" ? <button type="button" data-grooming-step={current.id} className="rabbit-anatomy-hitbox rabbit-footpad-hitbox" aria-label="檢查兔子足底" disabled={Boolean(observation) || completed.includes("groom-footpad")} onPointerEnter={showMagnifier} onPointerMove={showMagnifier} onPointerLeave={() => setMagnifierPosition(null)} onClick={() => { setMagnifierPosition(null); setState("part-1-footpad-observation"); openObservation("footpad"); }} /> : <div ref={brushTargetRef} data-grooming-step={current.id} className={`rabbit-grooming-guideline ${draggingBrush ? "is-dragging" : ""}`} aria-label={current.label} />)}
          {isInspection && <>
            <button type="button" className={`rabbit-anatomy-hitbox rabbit-incisor-hitbox ${completed.includes("inspect-incisor") ? "done" : ""}`} aria-label="檢查兔子門齒" disabled={Boolean(observation) || completed.includes("inspect-incisor")} onPointerEnter={showMagnifier} onPointerMove={showMagnifier} onPointerLeave={() => setMagnifierPosition(null)} onClick={() => { setMagnifierPosition(null); setState("part-2-incisor-observation"); openObservation("incisor"); }} />
            <button type="button" className={`rabbit-anatomy-hitbox rabbit-nail-hitbox ${completed.includes("inspect-nail") ? "done" : ""}`} aria-label="檢查兔子指甲" disabled={Boolean(observation) || !completed.includes("inspect-incisor") || completed.includes("inspect-nail")} onPointerEnter={showMagnifier} onPointerMove={showMagnifier} onPointerLeave={() => setMagnifierPosition(null)} onClick={() => { setMagnifierPosition(null); setState("part-2-nail-observation"); openObservation("nail"); }} />
          </>}
        </div>
        {firstPart && <aside className="rabbit-fur-collector" aria-label={`毛球收集進度 ${furCollectionProgress}%`}><small>毛球收集進度 {furCollectionProgress}%</small><img src={rabbitGroomingConfig.assets[furBallKey]} alt="收集到的毛球" onError={(event) => { event.currentTarget.style.display = "none"; }} /><span>毛球收集罐</span></aside>}
      {isBrushStep && current && <button type="button" className="rabbit-grooming-brush" onDragStart={(event) => event.preventDefault()} onPointerDown={(event) => { event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); setDraggingBrush(true); setPoint({ x: event.clientX, y: event.clientY }); }} onPointerUp={(event) => { finishBrush(event); event.stopPropagation(); }}><img draggable={false} src={rabbitGroomingConfig.assets.brush} alt="可拖曳的梳子" onError={(event) => { event.currentTarget.style.display = "none"; }} /></button>}
      {observation && observationData && <section className={`rabbit-grooming-observation rabbit-grooming-observation-${observation.key} is-${observation.status}`} role="dialog" aria-labelledby="rabbit-grooming-observation-title" aria-live="polite">
        <img src={observation.status === "comparison" || observation.displayState === "warning" ? observationData.warningImage : observationData.normalImage} alt={observationData.title} onError={(event) => { event.currentTarget.style.display = "none"; }} />
        <h2 id="rabbit-grooming-observation-title">{observation.status === "comparison" ? observationData.abnormalTitle : observationData.title}</h2>
        {observation.status === "comparison" ? <>
          <p>{renderKnowledgeText(withPetName(observationData.abnormalDescription, petName))}</p>
          <button type="button" className="knowledge-modal-confirm" onClick={confirmObservation}>我了解了 →</button>
        </> : observation.status === "correct" ? <>
          <p>{renderKnowledgeText(withPetName(observationData.correctFeedback[observation.displayState], petName))}</p>
          {observation.displayState === "normal"
            ? <button type="button" className="knowledge-modal-confirm" onClick={() => setObservation({ ...observation, status: "comparison" })}>了解異常狀況</button>
            : <button type="button" className="knowledge-modal-confirm" onClick={confirmObservation}>我了解了 →</button>}
        </> : <>
          <p className="rabbit-grooming-observation-question">{renderKnowledgeText(withPetName(observationData.question, petName))}</p>
          {observation.status === "incorrect" && <p className="rabbit-grooming-observation-feedback">{renderKnowledgeText(withPetName(observationData.incorrectFeedback[observation.displayState], petName))}</p>}
          <div className="rabbit-grooming-observation-choices" aria-label={withPetName(observationData.question, petName)}>
            {observationData.choices.map((choice) => <button type="button" key={choice.id} onClick={() => answerObservation(choice.id as "normal" | "warning")}>{choice.label}</button>)}
          </div>
        </>}
      </section>}
      </div>
    </>}
    {draggingBrush && point && <div className="rabbit-grooming-drag-ghost" style={{ left: point.x, top: point.y }}><img src={rabbitGroomingConfig.assets.brush} alt="" /></div>}
    {magnifierPosition && <img className="activity-magnifier-hint" src={rabbitGroomingConfig.assets.magnifier} alt="" aria-hidden="true" style={{ left: magnifierPosition.x, top: magnifierPosition.y }} />}
  </section>;
}
