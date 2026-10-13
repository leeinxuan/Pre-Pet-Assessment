"use client";

/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import type {
  GeckoHealthDisplayState,
  GeckoHealthInspectionConfig,
  GeckoHealthJudgement,
  GeckoTemperatureState,
  LifeActivityState,
} from "../../../../game-types";
import { getSpeciesConfig } from "../../../../data/species";
import { interpolatePetName } from "../../../../data/shared/pet-text";
import { DailyCareCompletion } from "../../DailyCareCompletion";
import { ActivityIntroPage, renderKnowledgeText } from "../activity-ui";

type Change = (patch: Partial<LifeActivityState>) => void;
type PointerPosition = { x: number; y: number } | null;

const choose = <T,>(values: readonly T[]) => values[Math.floor(Math.random() * values.length)];

function buildInitialStates(config: GeckoHealthInspectionConfig): Record<string, string | number | boolean> {
  const temperatureMode = choose(Object.keys(config.temperature.presets) as GeckoTemperatureState[]);
  const temperature = choose(config.temperature.presets[temperatureMode]);
  const states: Record<string, string | number | boolean> = {
    "temperature-mode": temperatureMode,
    "temperature-warm": temperature.warm,
    "temperature-cool": temperature.cool,
  };
  const pickJudgementState = (item: GeckoHealthJudgement) => {
    const available = Object.keys(item.states) as GeckoHealthDisplayState[];
    states[item.id] = choose(available);
  };
  pickJudgementState(config.feces);
  config.body.points.forEach(pickJudgementState);
  return states;
}

export function GeckoHealthInspectionActivity({ config, activity, petName, species, onChange, onContinue }: {
  config: GeckoHealthInspectionConfig;
  activity: LifeActivityState;
  petName: string;
  species: string;
  onChange: Change;
  onContinue: () => void;
}) {
  const generatedInitialStates = useMemo(() => buildInitialStates(config), [config]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [magnifier, setMagnifier] = useState<PointerPosition>(null);
  const displayName = petName.trim() || getSpeciesConfig(species).copy.animalNameFallback;
  const renderText = (value: string) => interpolatePetName(value, displayName, species);
  const render = (value: string) => renderKnowledgeText(renderText(value));
  const states = Object.keys(activity.geckoHealthInspectionStates).length
    ? activity.geckoHealthInspectionStates
    : generatedInitialStates;
  const completed = activity.geckoHealthInspectionCompleted;
  const bodyComplete = config.body.points.every((point) => completed.includes(point.id));
  const isComplete = config.progress.every((step) => step.id === "body" ? bodyComplete : completed.includes(step.id));

  const persistStates = (patch: Record<string, string | number | boolean>) => {
    onChange({ geckoHealthInspectionStates: { ...states, ...patch } });
  };
  const complete = (id: string) => {
    if (!completed.includes(id)) {
      onChange({ geckoHealthInspectionCompleted: [...completed, id] });
    }
    setOpenId(null);
    setMagnifier(null);
  };

  if (!activity.geckoHealthInspectionStarted) {
    return (
      <ActivityIntroPage
        config={config.intro}
        petName={petName}
        species={species}
        onStart={() => onChange({
          geckoHealthInspectionStarted: true,
          geckoHealthInspectionStates: generatedInitialStates,
          geckoHealthInspectionCompleted: [],
          geckoHealthInspectionFeedback: {},
        })}
      />
    );
  }

  if (isComplete) {
    return (
      <DailyCareCompletion
        title={renderText(config.completion.title)}
        summary={renderText(config.completion.subtitle)}
        detail={renderText(config.completion.description)}
        reflectionTitle={renderText(config.completion.reflectionTitle)}
        reflection={renderText(config.completion.reflection)}
        dailyCareBreakdown={getSpeciesConfig(species).report.dailyCareBreakdown}
        careTimeTitle={config.completion.careTitle}
        continueLabel={config.completion.continueLabel}
        onContinue={onContinue}
      />
    );
  }

  const activeStage = !completed.includes("temperature")
    ? "temperature"
    : !completed.includes("water")
      ? "water"
      : !completed.includes("feces")
        ? "feces"
        : "body";
  const activeBodyPoint = config.body.points.find((point) => !completed.includes(point.id));
  const activeJudgement = openId === config.feces.id
    ? config.feces
    : config.body.points.find((point) => point.id === openId);
  const activeState = activeJudgement
    ? states[activeJudgement.id] as GeckoHealthDisplayState
    : undefined;
  const activeStateContent = activeJudgement && activeState
    ? activeJudgement.states[activeState]
    : undefined;
  const activeFeedback = activeJudgement
    ? activity.geckoHealthInspectionFeedback[activeJudgement.id] ?? "question"
    : "question";
  const comparisonVisible = activeJudgement
    ? states[`comparison-${activeJudgement.id}`] === true
    : false;
  const needsComparison = activeState === "normal" || activeState === "shedding";
  const temperatureMode = states["temperature-mode"] as GeckoTemperatureState;
  const warm = Number(states["temperature-warm"]);
  const cool = Number(states["temperature-cool"]);
  const warmSafe = warm >= config.temperature.target.warmMin && warm <= config.temperature.target.warmMax;
  const coolSafe = cool >= config.temperature.target.coolMin && cool <= config.temperature.target.coolMax;
  const temperatureConfirmed = activity.geckoHealthInspectionFeedback.temperature === "correct";
  const waterFilled = states["water-filled"] === true;

  const instruction = activeStage === "temperature"
    ? config.temperature.instruction
    : activeStage === "water"
      ? config.water.instruction
      : activeStage === "feces"
        ? config.feces.instruction
        : activeBodyPoint?.instruction ?? config.body.instruction;

  const adjustTemperature = (direction: 1 | -1) => {
    persistStates({
      "temperature-warm": warm + config.temperature.adjustment.warm * direction,
      "temperature-cool": cool + config.temperature.adjustment.cool * direction,
    });
  };

  const selectAnswer = (choiceId: string) => {
    if (!activeJudgement || !activeState) return;
    const selected = activeJudgement.choices.find((choice) => choice.id === choiceId);
    const isCorrect = selected?.correctStates.includes(activeState) ?? false;
    onChange({
      geckoHealthInspectionFeedback: {
        ...activity.geckoHealthInspectionFeedback,
        [activeJudgement.id]: isCorrect ? "correct" : "incorrect",
      },
    });
  };

  const trackMagnifier = (event: React.PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMagnifier({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <section className="gecko-health-inspection" aria-label={renderText(config.title)}>
      <header className="gecko-health-header">
        <p className="life-stage-label">日常照護</p>
        <h1>{render(config.title)}</h1>
        <p>{render(config.description)}</p>
      </header>

      <ol className="rabbit-grooming-progress gecko-health-progress" aria-label="每日巡視進度">
        {config.progress.map((step, index) => {
          const stepComplete = step.id === "body" ? bodyComplete : completed.includes(step.id);
          return (
            <li key={step.id} className={stepComplete ? "is-complete" : step.id === activeStage ? "is-current" : ""}>
              <span>{stepComplete ? "✓" : index + 1}</span>
              {step.label}
            </li>
          );
        })}
      </ol>

      <div className={`gecko-health-scene gecko-health-scene--${activeStage}`}>
        <div className="gecko-health-instruction" aria-live="polite">{render(instruction)}</div>

        {activeStage === "temperature" && (
          <>
            <img className="gecko-health-background" src={config.scene.background} alt="" />
            <div className="gecko-temperature-layout">
              <article className={`gecko-thermometer-card ${warmSafe ? "is-safe" : ""}`}>
                <img src={config.temperature.warmThermometer} alt="" />
                <div>
                  <span>{config.temperature.warmLabel}</span>
                  <strong>{Math.round(warm)}°C</strong>
                </div>
              </article>
              <article className={`gecko-thermometer-card ${coolSafe ? "is-safe" : ""}`}>
                <img src={config.temperature.coolThermometer} alt="" />
                <div>
                  <span>{config.temperature.coolLabel}</span>
                  <strong>{Math.round(cool)}°C</strong>
                </div>
              </article>
              <div className="gecko-temperature-controller">
                <img src={config.temperature.controllerImage} alt="" />
                <span>{config.temperature.controllerLabel}</span>
                <div className="gecko-temperature-controls" aria-label={config.temperature.controllerLabel}>
                  <button type="button" onClick={() => adjustTemperature(-1)} aria-label="降低溫度">−</button>
                  <button type="button" onClick={() => adjustTemperature(1)} aria-label="提高溫度">＋</button>
                </div>
              </div>
              {!temperatureConfirmed && (
                <button
                  type="button"
                  className="primary gecko-temperature-confirm"
                  disabled={!warmSafe || !coolSafe}
                  onClick={() => onChange({
                    geckoHealthInspectionFeedback: {
                      ...activity.geckoHealthInspectionFeedback,
                      temperature: "correct",
                    },
                  })}
                >
                  {config.temperature.confirmLabel}
                </button>
              )}
            </div>
            {temperatureConfirmed && (
              <section className="gecko-health-feedback gecko-health-feedback--success" aria-live="polite">
                <span className="gecko-feedback-check" aria-hidden="true">✓</span>
                <p>{render(config.temperature.successFeedback[temperatureMode])}</p>
                <p className="gecko-feedback-note">{render(config.temperature.fixedWarning)}</p>
                <button type="button" className="primary" onClick={() => complete("temperature")}>
                  {config.temperature.continueLabel}
                </button>
              </section>
            )}
          </>
        )}

        {activeStage === "water" && (
          <>
            <img className="gecko-health-background" src={config.scene.background} alt="" />
            <button type="button" className="gecko-water-target" onClick={() => setOpenId("water")}>
              <img className={waterFilled ? "is-filled" : ""} src={waterFilled ? config.water.cleanImage : config.water.dirtyImage} alt={waterFilled ? config.water.cleanImageAlt : config.water.dirtyImageAlt} />
              <span>{waterFilled ? "已換上新鮮飲水" : "點擊水碟"}</span>
            </button>
            {openId === "water" && (
              <section className="gecko-health-card gecko-health-card--center" aria-live="polite">
                <img className={`gecko-health-card-image ${waterFilled ? "is-filled" : ""}`} src={waterFilled ? config.water.cleanImage : config.water.dirtyImage} alt={waterFilled ? config.water.cleanImageAlt : config.water.dirtyImageAlt} />
                <h2>{waterFilled ? "飲水更換完成" : "每天確認飲水"}</h2>
                <p>{render(waterFilled ? config.water.successFeedback : config.water.detail)}</p>
                {waterFilled && <p className="gecko-feedback-note">{render(config.water.fixedWarning)}</p>}
                <button
                  type="button"
                  className="primary"
                  onClick={() => waterFilled ? complete("water") : persistStates({ "water-filled": true })}
                >
                  {waterFilled ? config.water.continueLabel : config.water.fillLabel}
                </button>
              </section>
            )}
          </>
        )}

        {activeStage === "feces" && (
          <>
            <img className="gecko-health-background" src={config.scene.background} alt="" />
            <button type="button" className="gecko-feces-target" onClick={() => setOpenId(config.feces.id)}>
              {activeStateContent
                ? <img src={activeStateContent.image} alt={activeStateContent.imageAlt} />
                : <img src={config.feces.states[states.feces as GeckoHealthDisplayState]?.image} alt="" />}
              <span>點擊排泄角落</span>
            </button>
          </>
        )}

        {activeStage === "body" && (
          <div className="gecko-body-stage">
            <p className="gecko-body-prompt">{render(config.body.prompt)}</p>
            <div className="gecko-body-art">
              <img className="gecko-body-image" src={config.scene.body} alt={config.scene.bodyAlt} />
              {config.body.points.map((point, index) => {
                const pointComplete = completed.includes(point.id);
                const isAvailable = point.id === activeBodyPoint?.id;
                return (
                  <button
                    key={point.id}
                    type="button"
                    className={`gecko-body-hotspot ${pointComplete ? "is-complete" : ""} ${isAvailable ? "is-current" : ""}`}
                    style={{ left: `${point.hotspot.x}%`, top: `${point.hotspot.y}%` }}
                    disabled={!isAvailable}
                    aria-label={pointComplete ? `${point.label}已完成` : point.instruction}
                    onClick={() => setOpenId(point.id)}
                    onPointerMove={isAvailable ? trackMagnifier : undefined}
                    onPointerLeave={() => setMagnifier(null)}
                  >
                    {pointComplete ? "✓" : index + 1}
                    {isAvailable && magnifier && (
                      <img
                        className="gecko-magnifier-cursor"
                        src={config.scene.magnifier}
                        alt=""
                        style={{ left: magnifier.x, top: magnifier.y }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeJudgement && activeStateContent && (
          <section className="gecko-health-card gecko-health-card--inspection" aria-live="polite">
            {comparisonVisible && activeJudgement.comparison ? (
              <>
                <img className="gecko-health-card-image" src={activeJudgement.comparison.image} alt={activeJudgement.comparison.imageAlt} />
                <p className="gecko-health-card-kicker">異常對照</p>
                <h2>{activeJudgement.comparison.title}</h2>
                <p>{render(activeJudgement.comparison.description)}</p>
                <button type="button" className="primary" onClick={() => complete(activeJudgement.id)}>我了解了，繼續巡視 →</button>
              </>
            ) : (
              <>
                <img className="gecko-health-card-image" src={activeStateContent.image} alt={activeStateContent.imageAlt} />
                <p className="gecko-health-card-kicker">{activeJudgement.label}</p>
                <h2>{render(activeJudgement.prompt)}</h2>
                <p>{render(activeStateContent.detail)}</p>
                {activeFeedback !== "correct" && (
                  <div className="gecko-health-choices">
                    {activeJudgement.choices.map((choice) => (
                      <button
                        key={choice.id}
                        type="button"
                        className={activeFeedback === "incorrect" ? "is-retry" : ""}
                        onClick={() => selectAnswer(choice.id)}
                      >
                        {choice.text}
                      </button>
                    ))}
                  </div>
                )}
                {activeFeedback === "incorrect" && <p className="gecko-answer-feedback is-incorrect">{render(activeStateContent.incorrectFeedback)}</p>}
                {activeFeedback === "correct" && (
                  <>
                    <p className="gecko-answer-feedback is-correct">{render(activeStateContent.correctFeedback)}</p>
                    {needsComparison && activeJudgement.comparison
                      ? <button type="button" className="gecko-comparison-button" onClick={() => persistStates({ [`comparison-${activeJudgement.id}`]: true })}>{activeJudgement.comparison.actionLabel} →</button>
                      : <button type="button" className="primary" onClick={() => complete(activeJudgement.id)}>我了解了，繼續巡視 →</button>}
                  </>
                )}
              </>
            )}
          </section>
        )}
      </div>
    </section>
  );
}
