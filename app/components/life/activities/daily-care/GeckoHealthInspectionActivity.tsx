"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useRef, useState } from "react";
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
import { ActivityIntroPage, renderKnowledgeText, type ObservationAnswerStatus } from "../activity-ui";
import { InspectionHotspot } from "../InspectionHotspot";
import { ObservationCard, ObservationCardComparison, ObservationCardFlow } from "../ObservationCard";

type Change = (patch: Partial<LifeActivityState>) => void;
type PointerPosition = { id: string; x: number; y: number } | null;

const choose = <T,>(values: readonly T[]) => values[Math.floor(Math.random() * values.length)];

function CompletedTerrariumScene({ config, excludeItemIds = [] }: {
  config: GeckoHealthInspectionConfig;
  excludeItemIds?: readonly string[];
}) {
  return <>
    <img className="gecko-health-background" src={config.scene.background} alt="" />
    {config.scene.completedItems.filter((item) => !excludeItemIds.includes(item.id)).map((item) => (
      <img
        key={item.id}
        className="gecko-completed-scene-item"
        src={item.image}
        alt={item.alt}
        style={{
          left: `${item.placement.x}%`, top: `${item.placement.y}%`, width: `${item.placement.width}%`, zIndex: item.placement.layer,
        }}
      />
    ))}
  </>;
}

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
  const activeStage = !completed.includes("temperature")
    ? "temperature"
    : !completed.includes("water")
      ? "water"
      : !completed.includes("feces")
        ? "feces"
        : "body";
  const waterFilled = states["water-filled"] === true;
  const waterFeedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const waterReplacementInProgress = useRef(false);
  const waterStepActive = useRef(false);

  useEffect(() => () => {
    if (waterFeedbackTimeout.current !== null) {
      clearTimeout(waterFeedbackTimeout.current);
    }
  }, []);

  useEffect(() => {
    waterStepActive.current = activity.geckoHealthInspectionStarted && activeStage === "water";
    if (waterStepActive.current) return;

    if (waterFeedbackTimeout.current !== null) {
      clearTimeout(waterFeedbackTimeout.current);
      waterFeedbackTimeout.current = null;
    }
    waterReplacementInProgress.current = false;
  }, [activeStage, activity.geckoHealthInspectionStarted]);

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
        onStart={() => {
          if (waterFeedbackTimeout.current !== null) {
            clearTimeout(waterFeedbackTimeout.current);
            waterFeedbackTimeout.current = null;
          }
          waterReplacementInProgress.current = false;
          setOpenId(null);
          onChange({
            geckoHealthInspectionStarted: true,
            geckoHealthInspectionStates: generatedInitialStates,
            geckoHealthInspectionCompleted: [],
            geckoHealthInspectionFeedback: {},
          });
        }}
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

  const activeBodyPoint = config.body.requiresOrderedInspection
    ? config.body.points.find((point) => !completed.includes(point.id))
    : undefined;
  const activeJudgement = openId === config.feces.id
    ? config.feces
    : config.body.points.find((point) => point.id === openId);
  const activeState = activeJudgement
    ? states[activeJudgement.id] as GeckoHealthDisplayState
    : undefined;
  const activeStateContent = activeJudgement && activeState
    ? activeJudgement.states[activeState]
    : undefined;
  const activeFeedback: ObservationAnswerStatus = activeJudgement
    ? activity.geckoHealthInspectionFeedback[activeJudgement.id] ?? "question"
    : "question";
  const comparisonVisible = activeJudgement
    ? states[`comparison-${activeJudgement.id}`] === true
    : false;
  // 企劃：異常對照提示只在 normal＋答對時顯示。
  const needsComparison = activeState === "normal";
  const warm = Number(states["temperature-warm"]);
  const cool = Number(states["temperature-cool"]);
  // 溫度計以四捨五入的整數顯示，判斷是否進入安全範圍也必須用同一個數值。
  const displayedWarm = Math.round(warm);
  const displayedCool = Math.round(cool);
  const temperatureIsCorrect = displayedWarm >= config.temperature.correctTemperatures.warm.min
    && displayedWarm <= config.temperature.correctTemperatures.warm.max
    && displayedCool >= config.temperature.correctTemperatures.cool.min
    && displayedCool <= config.temperature.correctTemperatures.cool.max;
  const temperatureMode = states["temperature-mode"] as GeckoTemperatureState;
  const temperatureConfirmed = activity.geckoHealthInspectionFeedback.temperature === "correct";
  const waterSceneItem = config.scene.completedItems.find((item) => item.id === config.water.sceneItemId);

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

  const trackMagnifier = (id: string, event: React.PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMagnifier({ id, x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <section className="life-activity gecko-health-inspection" aria-label={renderText(config.title)}>
      <div className="activity-heading">
        <p className="life-stage-label">日常照護</p>
        <h1>{render(config.title)}</h1>
        <p className="gecko-health-message">{render(config.description)}</p>
      </div>

      <ol className="rabbit-grooming-progress" aria-label="每日巡視進度">
        {config.progress.map((step, index) => {
          const stepComplete = step.id === "body" ? bodyComplete : completed.includes(step.id);
          return (
            <li key={step.id} className={stepComplete ? "done" : step.id === activeStage ? "active" : ""}>
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
            <CompletedTerrariumScene config={config} />
            <div className="gecko-temperature-layout">
              <article
                className="gecko-thermometer gecko-thermometer--warm"
                style={{ left: `${config.temperature.warmPlacement.x}%`, top: `${config.temperature.warmPlacement.y}%`, width: `${config.temperature.warmPlacement.width}%` }}
              >
                <span className="gecko-thermometer-label">{config.temperature.warmLabel}</span>
                <img src={config.temperature.warmThermometer} alt={`${config.temperature.warmLabel}溫度計`} />
                <strong>{Math.round(warm)}°C</strong>
              </article>
              <article
                className="gecko-thermometer gecko-thermometer--cool"
                style={{ left: `${config.temperature.coolPlacement.x}%`, top: `${config.temperature.coolPlacement.y}%`, width: `${config.temperature.coolPlacement.width}%` }}
              >
                <img src={config.temperature.coolThermometer} alt={`${config.temperature.coolLabel}溫度計`} />
                <strong>{Math.round(cool)}°C</strong>
                <span className="gecko-thermometer-label">{config.temperature.coolLabel}</span>
              </article>
              <div className="gecko-temperature-controller">
                <img src={config.temperature.controllerImage} alt="" />
                <span className="sr-only">{config.temperature.controllerLabel}</span>
                <div className="gecko-temperature-controls" aria-label={config.temperature.controllerLabel}>
                  <button type="button" onClick={() => adjustTemperature(-1)} aria-label="降低溫度">−</button>
                  <button type="button" onClick={() => adjustTemperature(1)} aria-label="提高溫度">＋</button>
                </div>
              </div>
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
            <CompletedTerrariumScene config={config} excludeItemIds={[config.water.sceneItemId]} />
            {waterSceneItem && <button
              type="button"
              className="gecko-water-target"
              style={{ left: `${waterSceneItem.placement.x}%`, top: `${waterSceneItem.placement.y}%`, width: `${waterSceneItem.placement.width}%`, zIndex: waterSceneItem.placement.layer }}
              onClick={() => {
                if (waterFilled || waterReplacementInProgress.current) return;
                waterReplacementInProgress.current = true;
                waterFeedbackTimeout.current = setTimeout(() => {
                  waterFeedbackTimeout.current = null;
                  if (!waterStepActive.current) return;
                  waterReplacementInProgress.current = false;
                  setOpenId("water");
                }, 1000);
                persistStates({ "water-filled": true });
              }}
              aria-label={waterFilled ? "已換上新鮮飲水" : "點擊髒水碟更換飲水"}
              disabled={waterFilled}
            >
              <img className={waterFilled ? "is-filled" : ""} src={waterFilled ? config.water.cleanImage : config.water.dirtyImage} alt={waterFilled ? config.water.cleanImageAlt : config.water.dirtyImageAlt} />
              {!waterFilled && <span>點擊水碟</span>}
            </button>}
            {openId === "water" && (
              <section className="gecko-health-card gecko-health-card--center" aria-live="polite">
                <img className={`gecko-health-card-image ${waterFilled ? "is-filled" : ""}`} src={waterFilled ? config.water.cleanImage : config.water.dirtyImage} alt={waterFilled ? config.water.cleanImageAlt : config.water.dirtyImageAlt} />
                <h2>{waterFilled ? "飲水更換完成" : "每天確認飲水"}</h2>
                <p>{render(waterFilled ? config.water.successFeedback : config.water.detail)}</p>
                {waterFilled && <p className="gecko-feedback-note">{render(config.water.fixedWarning)}</p>}
                <button
                  type="button"
                  className="primary"
                  onClick={() => complete("water")}
                >
                  {config.water.continueLabel}
                </button>
              </section>
            )}
          </>
        )}

        {activeStage === "feces" && (
          <>
            <CompletedTerrariumScene config={config} />
            <button
              type="button"
              className="gecko-feces-target"
              style={{ left: `${config.feces.scenePlacement.x}%`, top: `${config.feces.scenePlacement.y}%`, width: `${config.feces.scenePlacement.width}%`, zIndex: config.feces.scenePlacement.layer }}
              onClick={() => setOpenId(config.feces.id)}
              aria-label="點擊底材上的排泄物進行觀察"
            >
              {activeStateContent
                ? <img src={activeStateContent.image} alt={activeStateContent.imageAlt} />
                : <img src={config.feces.states[states.feces as GeckoHealthDisplayState]?.image} alt="" />}
            </button>
          </>
        )}

        {activeStage === "body" && (
          <div className="gecko-body-stage">
            <div className="gecko-body-art">
              <img className="gecko-body-image" src={config.scene.body} alt={config.scene.bodyAlt} />
              {config.body.points.map((point, index) => {
                const pointComplete = completed.includes(point.id);
                const isAvailable = !pointComplete && (!config.body.requiresOrderedInspection || point.id === activeBodyPoint?.id);
                return (
                  <InspectionHotspot
                    key={point.id}
                    type="button"
                    className={`gecko-body-hotspot ${pointComplete ? "is-complete" : ""} ${isAvailable ? "is-available" : ""} ${config.body.requiresOrderedInspection && isAvailable ? "is-current" : ""}`}
                    complete={pointComplete}
                    showOrder={config.body.showPointNumbers}
                    order={index + 1}
                    style={{ left: `${point.hotspot.x}%`, top: `${point.hotspot.y}%` }}
                    disabled={!isAvailable}
                    aria-label={pointComplete ? `${point.label}已完成` : point.instruction}
                    onClick={() => setOpenId(point.id)}
                    onPointerEnter={isAvailable ? (event) => trackMagnifier(point.id, event) : undefined}
                    onPointerMove={isAvailable ? (event) => trackMagnifier(point.id, event) : undefined}
                    onPointerLeave={() => setMagnifier(null)}
                  >
                    {isAvailable && magnifier?.id === point.id && (
                      <img
                        className="gecko-magnifier-cursor"
                        src={config.scene.magnifier}
                        alt=""
                        style={{ left: magnifier.x, top: magnifier.y }}
                      />
                    )}
                  </InspectionHotspot>
                );
              })}
            </div>
          </div>
        )}

        {activeJudgement && activeStateContent && (
          <ObservationCard className="gecko-observation-card" label={`${activeJudgement.label}觀察`}>
            {comparisonVisible && activeJudgement.comparison ? (
              <>
                <h2>異常狀態</h2>
                <ObservationCardComparison>
                  <img src={activeJudgement.comparison.image} alt={activeJudgement.comparison.imageAlt} />
                  <p>{render(activeJudgement.comparison.description)}</p>
                </ObservationCardComparison>
                <button type="button" className="observation-card-action" onClick={() => complete(activeJudgement.id)}>我了解了</button>
              </>
            ) : (
              <ObservationCardFlow
                status={activeFeedback}
                title={activeJudgement.label}
                image={<img className="observation-card-image" src={activeStateContent.image} alt={activeStateContent.imageAlt} />}
                question={render(activeJudgement.prompt)}
                choices={activeJudgement.choices.map((choice) => ({ id: choice.id, label: renderText(choice.text) }))}
                feedback={render(activeFeedback === "incorrect" ? activeStateContent.incorrectFeedback : activeStateContent.correctFeedback)}
                onChoose={selectAnswer}
                onReturn={() => onChange({ geckoHealthInspectionFeedback: { ...activity.geckoHealthInspectionFeedback, [activeJudgement.id]: "question" } })}
                correctAction={needsComparison && activeJudgement.comparison
                  ? <button type="button" className="observation-card-action" onClick={() => persistStates({ [`comparison-${activeJudgement.id}`]: true })}>{activeJudgement.comparison.actionLabel}</button>
                  : <button type="button" className="observation-card-action" onClick={() => complete(activeJudgement.id)}>我了解了</button>}
              />
            )}
          </ObservationCard>
        )}
      </div>
      {activeStage === "temperature" && !temperatureConfirmed && (
        <div className="gecko-temperature-actions">
          <p className="gecko-temperature-action-hint" aria-live="polite">
            {temperatureIsCorrect ? "溫度已調整完成，可以確認。" : "暖側底部應維持 28–32°C，涼側應維持 22–25°C。"}
          </p>
          <button
            type="button"
            className="primary gecko-temperature-confirm"
            disabled={!temperatureIsCorrect}
            onClick={() => onChange({
              geckoHealthInspectionFeedback: {
                ...activity.geckoHealthInspectionFeedback,
                temperature: "correct",
              },
            })}
          >
            {config.temperature.confirmLabel}
          </button>
        </div>
      )}
    </section>
  );
}
