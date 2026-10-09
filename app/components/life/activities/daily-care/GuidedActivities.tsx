"use client";

/* eslint-disable @next/next/no-img-element -- Interactive inspection sprites use intrinsic asset dimensions and direct DOM image behavior. */

import { useEffect, useRef, useState } from "react";
import type { LifeActivityState } from "../../../../game-types";
import { hamsterAssets } from "../../../../data/species/hamster/assets";
import { hamsterMorningCheck } from "../../../../data/species/hamster/activities";
import { hamsterReport } from "../../../../data/species/hamster/report";
import { interpolatePetName } from "../../../../data/shared/pet-text";
import { DailyCareCompletion } from "../../DailyCareCompletion";
import { ActivityIntroPage } from "../activity-ui";

type Change = (patch: Partial<LifeActivityState>) => void;

/** 倉鼠 §5.3.2：每天清理固定廁所角落，再篩除砂浴盆結塊。 */
export function GuidedInspection({ activity, petName, onChange, onContinue }: {
  activity: LifeActivityState; petName: string; onChange: Change; onContinue: () => void;
}) {
  const config = hamsterMorningCheck;
  const displayPetName = petName || "芝麻";
  const render = (value: string) => interpolatePetName(value, displayPetName);
  const toiletStep = config.steps.toilet;
  const sandBathStep = config.steps.sandBath;
  const toiletComplete = activity.hamsterInspectionCompleted.includes(toiletStep.id);
  const sandBathComplete = activity.hamsterInspectionCompleted.includes(sandBathStep.id);
  const [toiletRemoving, setToiletRemoving] = useState(false);
  const [sandDragStart, setSandDragStart] = useState<number | null>(null);
  const [sandProgress, setSandProgress] = useState(0);
  const [sandHint, setSandHint] = useState("");
  const toiletTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sandProgressRef = useRef(0);

  useEffect(() => () => {
    if (toiletTimer.current) clearTimeout(toiletTimer.current);
  }, []);

  function completeStep(stepId: string) {
    if (activity.hamsterInspectionCompleted.includes(stepId)) return;
    onChange({ hamsterInspectionCompleted: [...activity.hamsterInspectionCompleted, stepId] });
  }

  function cleanToiletCorner() {
    if (toiletComplete || toiletRemoving) return;
    setToiletRemoving(true);
    toiletTimer.current = setTimeout(() => {
      completeStep(toiletStep.id);
      setToiletRemoving(false);
    }, 460);
  }

  function startSandSifting(clientX: number) {
    if (sandBathComplete) return;
    setSandDragStart(clientX);
    sandProgressRef.current = 0;
    setSandProgress(0);
    setSandHint("拖曳篩網從左到右，篩出結塊廢沙。");
  }

  function moveSandSieve(clientX: number, width: number) {
    if (sandDragStart === null || sandBathComplete) return;
    const nextProgress = Math.max(0, Math.min(100, ((clientX - sandDragStart) / width) * 100));
    sandProgressRef.current = nextProgress;
    setSandProgress(nextProgress);
  }

  function finishSandSifting() {
    if (sandDragStart === null || sandBathComplete) return;
    setSandDragStart(null);
    if (sandProgressRef.current >= 55) {
      setSandProgress(100);
      sandProgressRef.current = 100;
      setSandHint("");
      completeStep(sandBathStep.id);
      return;
    }
    sandProgressRef.current = 0;
    setSandProgress(0);
    setSandHint("再拖遠一點，讓篩網完整劃過砂浴盆。");
  }

  if (!activity.hamsterInspectionStarted) return <ActivityIntroPage
    config={config.intro}
    petName={petName}
    species="hamster"
    onStart={() => onChange({ hamsterInspectionStarted: true })}
  />;

  if (toiletComplete && sandBathComplete) return <DailyCareCompletion
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

  const activeStep = toiletComplete ? sandBathStep : toiletStep;
  const activeStepNumber = toiletComplete ? 2 : 1;

  return <section className="guided-activity hamster-morning-inspection" aria-label={`${displayPetName}的早晨巡視`}>
    <header className="guided-activity-heading">
      <p className="life-stage-label">每日清潔 · {activeStepNumber} / 2</p>
      <h1>{render(activeStep.prompt)}</h1>
    </header>
    <ol className="hamster-morning-progress" aria-label="早晨巡視進度">
      {[toiletStep, sandBathStep].map((step, index) => <li key={step.id} className={(index === 0 ? toiletComplete : sandBathComplete) ? "is-complete" : index + 1 === activeStepNumber ? "is-current" : ""}><span>{index + 1}</span>{step.label}</li>)}
    </ol>
    {!toiletComplete ? <div className={`hamster-morning-scene hamster-morning-scene--toilet ${toiletRemoving ? "is-removing" : ""}`}>
      <img className="hamster-morning-background" src={hamsterAssets.dailyInspection.cageInterior} alt={`${displayPetName}的籠內生活空間`} />
      <button type="button" className="hamster-toilet-corner" onClick={cleanToiletCorner} disabled={toiletRemoving} aria-label="清理廁所角落的髒墊料">
        <img src={hamsterAssets.dailyInspection.bedding} alt="髒墊料" />
        <span>{toiletRemoving ? "正在清理…" : "點擊清理髒墊料"}</span>
      </button>
      {toiletRemoving && <span className="hamster-fresh-bedding" aria-hidden="true">新墊料已補上</span>}
    </div> : <div className="hamster-morning-sand-stage">
      <p className="hamster-morning-completion-note">{render(toiletStep.completion)}</p>
      <div className="hamster-morning-scene hamster-morning-scene--sand" onPointerMove={(event) => moveSandSieve(event.clientX, event.currentTarget.getBoundingClientRect().width)}>
        <img className="hamster-sand-bath-image" src={hamsterAssets.dailyInspection.sandBath} alt="砂浴盆" />
        <span className={`hamster-sand-clump hamster-sand-clump--one ${sandProgress >= 35 ? "is-sifted" : ""}`} aria-hidden="true" />
        <span className={`hamster-sand-clump hamster-sand-clump--two ${sandProgress >= 55 ? "is-sifted" : ""}`} aria-hidden="true" />
        <span className={`hamster-sand-clump hamster-sand-clump--three ${sandProgress >= 75 ? "is-sifted" : ""}`} aria-hidden="true" />
        <button type="button" className="hamster-sand-sieve" style={{ left: `${12 + sandProgress * 0.56}%` }} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); startSandSifting(event.clientX); }} onPointerUp={finishSandSifting} onPointerCancel={finishSandSifting} aria-label="拖曳篩網篩除砂浴盆裡的結塊廢沙"><span aria-hidden="true">⌁</span><small>篩網</small></button>
        <p className="hamster-sand-drag-hint">{sandHint || "拖曳篩網從左到右，篩出結塊廢沙。"}</p>
      </div>
    </div>}
    {toiletComplete && <p className="hamster-morning-step-note">{render(sandBathStep.completion)}</p>}
  </section>;
}
