"use client";

import { useEffect } from "react";
import type { LifeActivityState } from "../../game-types";
import { hamsterMorningCheck } from "../../data/species/hamster/activities";
import { hamsterReport } from "../../data/species/hamster/report";
import { interpolatePetName } from "../../data/shared/pet-text";
import { DailyCareCompletion } from "./DailyCareCompletion";

type Change = (patch: Partial<LifeActivityState>) => void;

export function GuidedInspection({ activity, petName, onChange, onContinue }: {
  activity: LifeActivityState; petName: string; onChange: Change; onContinue: () => void;
}) {
  const config = hamsterMorningCheck;
  const step = config.steps[activity.hamsterInspectionCompleted.length];
  const displayState = step ? activity.hamsterInspectionStates[step.id] : undefined;
  const status = step ? activity.hamsterInspectionFeedback[step.id] ?? "question" : "question";
  useEffect(() => {
    if (!activity.hamsterInspectionStarted || !step || displayState) return;
    onChange({ hamsterInspectionStates: { ...activity.hamsterInspectionStates, [step.id]: Math.random() < 0.5 ? "normal" : "warning" } });
  }, [activity.hamsterInspectionStarted, activity.hamsterInspectionStates, displayState, onChange, step]);
  const render = (value: string) => interpolatePetName(value, petName);
  if (!activity.hamsterInspectionStarted) return <section className="guided-activity guided-activity-intro">
    <h1>{render(config.introTitle)}</h1>
    {config.introParagraphs.map((paragraph) => <p key={paragraph}>{render(paragraph)}</p>)}
    <button type="button" className="primary" onClick={() => onChange({ hamsterInspectionStarted: true })}>{config.startLabel}</button>
  </section>;
  if (!step) return <DailyCareCompletion
    title={render(config.completion.title)}
    summary={render(config.completion.subtitle)}
    detail={render(config.completion.description)}
    reflectionTitle={render(config.completion.reflectionTitle)}
    reflection={render(config.completion.reflection)}
    dailyCareBreakdown={hamsterReport.dailyCareBreakdown}
    careTimeTitle={config.completion.careTitle}
    continueLabel={config.completion.continueLabel}
    onContinue={onContinue}
  />;
  return <section className="guided-activity">
    <p className="life-stage-label">{activity.hamsterInspectionCompleted.length + 1} / {config.steps.length}</p>
    <h1>{render(step.question)}</h1>
    <div className="guided-activity-observation"><strong>{step.label}</strong><p>{displayState ? render(step.visual[displayState]) : "…"}</p></div>
    {displayState && <>
      <div className="guided-activity-options">{step.options.map((option) => <button key={option.id} type="button" disabled={status === "correct"}
        onClick={() => onChange({ hamsterInspectionFeedback: { ...activity.hamsterInspectionFeedback, [step.id]: option.id === displayState ? "correct" : "incorrect" } })}>{render(option.label)}</button>)}</div>
      {status !== "question" && <p className={`guided-activity-feedback ${status}`} role="status">{render(step.feedback[displayState][status])}</p>}
      {status === "correct" && <button type="button" className="primary" onClick={() => onChange({ hamsterInspectionCompleted: [...activity.hamsterInspectionCompleted, step.id] })}>我了解了</button>}
    </>}
  </section>;
}
