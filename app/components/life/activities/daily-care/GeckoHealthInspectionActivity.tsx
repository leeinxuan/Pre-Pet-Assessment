"use client";

import { useState } from "react";
import type { GeckoHealthInspectionConfig, LifeActivityState } from "../../../../game-types";
import { getSpeciesConfig } from "../../../../data/species";
import { interpolatePetName } from "../../../../data/shared/pet-text";
import { DailyCareCompletion } from "../../DailyCareCompletion";
import { ActivityIntroPage, renderKnowledgeText } from "../activity-ui";

type Change = (patch: Partial<LifeActivityState>) => void;

/** Generic data renderer for a staged health-inspection activity. */
export function GeckoHealthInspectionActivity({ config, activity, petName, species, onChange, onContinue }: {
  config: GeckoHealthInspectionConfig; activity: LifeActivityState; petName: string; species: string; onChange: Change; onContinue: () => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const displayName = petName.trim() || getSpeciesConfig(species).copy.animalNameFallback;
  const renderText = (value: string) => interpolatePetName(value, displayName, species);
  const render = (value: string) => renderKnowledgeText(renderText(value));
  const isComplete = config.steps.every((step) => activity.geckoHealthInspectionCompleted.includes(step.id));
  const ensureStates = () => {
    if (Object.keys(activity.geckoHealthInspectionStates).length) return activity.geckoHealthInspectionStates;
    const states = Object.fromEntries(config.steps.filter((step) => step.choices).map((step) => [step.id, Math.random() < 0.5 ? "normal" : "warning"])) as Record<string, "normal" | "warning">;
    onChange({ geckoHealthInspectionStates: states });
    return states;
  };
  const complete = (id: string) => {
    if (!activity.geckoHealthInspectionCompleted.includes(id)) onChange({ geckoHealthInspectionCompleted: [...activity.geckoHealthInspectionCompleted, id] });
    setOpenId(null);
  };
  if (!activity.geckoHealthInspectionStarted) return <ActivityIntroPage config={config.intro} petName={petName} species={species} onStart={() => { ensureStates(); onChange({ geckoHealthInspectionStarted: true }); }} />;
  if (isComplete) return <DailyCareCompletion title={renderText(config.completion.title)} summary={renderText(config.completion.subtitle)} detail={renderText(config.completion.description)} reflectionTitle={renderText(config.completion.reflectionTitle)} reflection={renderText(config.completion.reflection)} dailyCareBreakdown={getSpeciesConfig(species).report.dailyCareBreakdown} careTimeTitle={config.completion.careTitle} continueLabel={config.completion.continueLabel} onContinue={onContinue} />;
  const states = activity.geckoHealthInspectionStates;
  const active = config.steps.find((step) => step.id === openId);
  const status = active ? activity.geckoHealthInspectionFeedback[active.id] ?? "question" : "question";
  const select = (choiceId: string) => {
    if (!active || !active.choices) return;
    const selected = active.choices.find((choice) => choice.id === choiceId);
    const normal = states[active.id] !== "warning";
    const correct = selected?.normalIsCorrect === normal;
    onChange({ geckoHealthInspectionFeedback: { ...activity.geckoHealthInspectionFeedback, [active.id]: correct ? "correct" : "incorrect" } });
  };
  return <section className="gecko-health-inspection" aria-label={renderText(config.title)}>
    <header><p className="life-stage-label">日常照護</p><h1>{render(config.title)}</h1><p>{render(config.description)}</p></header>
    <ol className="gecko-health-progress" aria-label="每日巡視進度">{config.steps.map((step, index) => <li key={step.id} className={activity.geckoHealthInspectionCompleted.includes(step.id) ? "is-complete" : step.id === openId ? "is-current" : ""}><span>{activity.geckoHealthInspectionCompleted.includes(step.id) ? "✓" : index + 1}</span>{step.label}</li>)}</ol>
    <div className="gecko-health-scene" role="img" aria-label="守宮巡視場景素材待補">
      <p className="preparation-asset-placeholder">守宮巡視素材待補</p>
      <div className="gecko-health-points">{config.steps.map((step) => <button key={step.id} type="button" disabled={activity.geckoHealthInspectionCompleted.includes(step.id)} className={step.id === openId ? "is-active" : ""} onClick={() => setOpenId(step.id)}><b>{step.label}</b><small>{activity.geckoHealthInspectionCompleted.includes(step.id) ? "已確認" : step.instruction}</small></button>)}</div>
    </div>
    {active && <section className="gecko-health-card" aria-live="polite"><h2>{active.label}</h2><p>{render(active.detail)}</p>{!active.choices ? <button type="button" className="primary" onClick={() => complete(active.id)}>{active.completionLabel ?? "完成確認"}</button> : status === "question" ? <div className="gecko-health-choices">{active.choices.map((choice) => <button key={choice.id} type="button" onClick={() => select(choice.id)}>{choice.text}</button>)}</div> : <><p className={status === "correct" ? "is-correct" : "is-incorrect"}>{render((status === "correct" ? (states[active.id] === "warning" ? active.warningFeedback : active.normalFeedback) : "再仔細看看目前狀態，確認後再選擇。") ?? "")}</p>{status === "correct" ? <button type="button" className="primary" onClick={() => complete(active.id)}>繼續巡視 →</button> : <button type="button" onClick={() => onChange({ geckoHealthInspectionFeedback: { ...activity.geckoHealthInspectionFeedback, [active.id]: "question" } })}>重新判斷</button>}</>}</section>}
  </section>;
}
