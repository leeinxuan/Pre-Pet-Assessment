"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  getDailyBehaviorScenarioIds,
  getJourneyItemsForSpecies,
  getJourneyStepForItem,
  getLifeScenariosForSpecies,
} from "../../data/species/journey";
import { getJourneyActivityConfig, getJourneyActivityResetPatch } from "../../data/species/activity-registry";
import { getSpeciesConfig } from "../../data/species";
import { getExpenseRulesForSpecies } from "../../data/shared/expenses";
import {
  canReplayJourneyItem,
  isRevisitingJourneyItem,
  type JourneyReplayRequest,
  type JourneyReplayState,
} from "./journey-replay";
import {
  ArrivalMealActivity,
  BirdCageInspectionActivity,
  BreedChallengeActivity,
  BusyCareActivity,
  BusyCareTransition,
  CatDailyInspectionActivity,
  DailyBehaviorActivityMulti,
  HamsterMorningInspectionActivity,
  GeckoHealthInspectionActivity,
  RabbitCarrySortActivity,
  RabbitDailyCheckActivity,
  ScenarioCard,
  TimePassTransition,
  VideoScenarioActivity,
  WalkingActivity,
} from "./activities";
import { resetQuestionVideoAutoplay } from "./activities/scenario-ui";
export { ArrivalTransitionVideo } from "./activities";
import type {
  CareMember,
  ExpenseRecord,
  ExpenseTriggerMeta,
  JourneyActivityKey,
  LifeActivityState,
  Scenario,
  ScenarioAnswer,
  ScenarioChoice,
  ScenarioResult,
} from "../../game-types";

function arrivalMealExpenseIdsForSpecies(species: string) {
  // 已由其他互動登錄的每月耗材（房間佈置、散步準備），不能跟第一餐一起再觸發一次。
  const excludedIds = new Set(getExpenseRulesForSpecies(species).arrivalMealExcludedExpenseIds ?? []);
  return getSpeciesConfig(species).feeding.recurringExpenseIds.filter((id) => !excludedIds.has(id));
}

export function LifeJourney({
  index,
  petName,
  breed,
  species = "dog",
  answers,
  activity,
  replayState,
  backupNames,
  members,
  testSkipSignal = 0,
  testNextSignal = 0,
  onIndex,
  onChoose,
  onMarkScenarioForReview,
  onChooseMultiple,
  onStartReplay,
  onMembersChange,
  onActivityChange,
  onCompleteItem,
  onAddExpense,
  onAddExpenseSilently,
  onAddExpenseGroup,
  onPlayExpenseSequence,
  onStageChange,
  onComplete,
}: {
  index: number;
  petName: string;
  breed: string;
  species?: string;
  answers: Record<string, ScenarioAnswer>;
  activity: LifeActivityState;
  /** 共用的回訪／重新作答狀態，由頂層導覽事件維護。 */
  replayState: JourneyReplayState;
  expenses: ExpenseRecord[];
  backupNames: string[];
  members: CareMember[];
  roomReady: string[];
  testSkipSignal?: number;
  testNextSignal?: number;
  onIndex: (index: number) => void;
  onChoose: (scenario: Scenario, choice: ScenarioChoice) => void;
  onMarkScenarioForReview: (scenario: Scenario, flag: string) => void;
  onChooseMultiple: (scenario: Scenario, choices: ScenarioChoice[], result: ScenarioResult) => void;
  onStartReplay: (request: JourneyReplayRequest) => void;
  onMembersChange: (members: CareMember[]) => void;
  onActivityChange: (patch: Partial<LifeActivityState>) => void;
  onCompleteItem: (id: string) => void;
  onAddExpense: (id: string, triggerMeta?: ExpenseTriggerMeta) => void;
  onAddExpenseSilently: (id: string, triggerMeta?: ExpenseTriggerMeta) => void;
  onAddExpenseGroup: (ids: readonly string[], triggerMeta?: ExpenseTriggerMeta) => void;
  onPlayExpenseSequence: (ids: readonly string[], triggerMeta?: ExpenseTriggerMeta) => Promise<void>;
  onStageChange: (step: number) => void;
  onBack: () => void;
  onComplete: () => void;
}) {
  const activeJourneyItems = getJourneyItemsForSpecies(species);
  const activeLifeScenarios = getLifeScenariosForSpecies(species, breed);
  const item = activeJourneyItems[index] ?? activeJourneyItems[0];
  const scenario = item.scenarioId ? activeLifeScenarios.find((entry) => entry.id === item.scenarioId) : undefined;
  const answer = scenario ? answers[scenario.id] : undefined;
  const activityConfig = getJourneyActivityConfig(species, item.id);
  const activityKey = activityConfig?.activityKey ?? "scenario";
  const speciesJourney = getSpeciesConfig(species).journey;
  const geckoHealthInspectionConfig = "geckoHealthInspection" in speciesJourney ? speciesJourney.geckoHealthInspection : undefined;
  const isActivityWithSubQuestions = activityKey === "daily-behavior" || activityKey === "daily-behavior-single" || activityKey === "breed-challenge";
  const [activityNextSignal, setActivityNextSignal] = useState(0);
  const [arrivalMealOpen, setArrivalMealOpen] = useState(false);
  // 兔子的第一餐是明確的 journey item；犬貓則沿用既有的到家後直接開啟方式。
  const showArrivalMeal = activityConfig?.transition === "arrival-meal" && answer?.finalResult === "correct" && arrivalMealOpen;
  const [feedbackOpen, setFeedbackOpen] = useState(Boolean(answer));
  const [timePassOpen, setTimePassOpen] = useState(false);
  const [busyCareTransitionIndex, setBusyCareTransitionIndex] = useState<number | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [resetItemId, setResetItemId] = useState<string | null>(null);
  // 測試模式由頂層切換 index；這裡只清除元件內暫存畫面，不能寫入任何答題或完成資料。
  useEffect(() => {
    if (testSkipSignal === 0) return;
    setFeedbackOpen(false); // eslint-disable-line react-hooks/set-state-in-effect
    setTimePassOpen(false);
    setArrivalMealOpen(false);
    setBusyCareTransitionIndex(null);
  }, [testSkipSignal]);

  function selectItem(next: number) {
    const nextScenarioId = activeJourneyItems[next].scenarioId;
    setFeedbackOpen(Boolean(nextScenarioId && answers[nextScenarioId]));
    onIndex(next);
    onStageChange(getJourneyStepForItem(activeJourneyItems[next]));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function continueJourney() {
    if (!(activityKey === "rabbit-carry-sort" && activity.rabbitCarryAnswerRevealed && !activity.rabbitCarryComplete)) {
      onCompleteItem(item.id);
    }
    if (activityConfig?.transition === "time-pass" && !activity.sickTimePassComplete) {
      setTimePassOpen(true);
      return;
    }
    if (index === activeJourneyItems.length - 1) {
      onComplete();
      return;
    }
    selectItem(index + 1);
  }

  function continueScenario() {
    if (activityConfig?.transition === "arrival-meal") {
      setArrivalMealOpen(true);
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      return;
    }
    continueJourney();
  }

  // 測試模式以外部訊號驅動下一小題或下一個旅程節點。
  // 這是測試控制器送入的明確事件，不是由渲染資料反推 state。
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (testNextSignal <= 0) return;
    // 過場與題目是兩個獨立畫面；測試按鈕在過場時只結束過場，不能連題目一起略過。
    if (activityConfig?.transition === "busy-care" && busyCareTransitionIndex !== index) {
      setBusyCareTransitionIndex(index);
      return;
    }
    if (timePassOpen && activityConfig?.transition === "time-pass") {
      onActivityChange({ sickTimePassComplete: true });
      setTimePassOpen(false);
      selectItem(index + 1);
      return;
    }
    if (isActivityWithSubQuestions) {
      setActivityNextSignal((n) => n + 1);
    } else {
      continueJourney();
    }
  }, [testNextSignal]); // eslint-disable-line react-hooks/exhaustive-deps
  /* eslint-enable react-hooks/set-state-in-effect */

  function choose(choice: ScenarioChoice) {
    if (!scenario) return;
    onChoose(scenario, choice);
    setFeedbackOpen(true);
  }

  /** 「再玩一次」：只把目前題目退回未作答狀態，快照與還原由共用 replay 狀態處理。 */
  function replayCurrentQuestion(scenarioId?: string) {
    const scenarioIds = scenarioId ? [scenarioId] : scenario ? [scenario.id] : [];
    scenarioIds.forEach((id) => resetQuestionVideoAutoplay(`${species}:${id}:scene`));
    scenarioIds.forEach((id) => resetQuestionVideoAutoplay(`breed:${id}:scene`));
    onStartReplay({ itemId: item.id, scenarioIds, activityPatch: getJourneyActivityResetPatch(activityConfig?.resetKey) });
    setFeedbackOpen(false);
    setArrivalMealOpen(false);
    setTimePassOpen(false);
    setResetItemId(item.id);
    setResetSignal((current) => current + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const isRevisitingItem = isRevisitingJourneyItem(replayState, item.id);
  const canReplayCurrent = canReplayJourneyItem(replayState, item.id);
  const currentResetSignal = resetItemId === item.id ? resetSignal : 0;
  const replayCorrectProps = { onReplay: canReplayCurrent ? () => replayCurrentQuestion() : undefined, continueImmediately: isRevisitingItem };
  const replaySubQuestion = canReplayCurrent ? (scenarioId: string) => replayCurrentQuestion(scenarioId) : undefined;

  if (timePassOpen && activityConfig?.transition === "time-pass") {
    return <TimePassTransition species={species} onComplete={() => {
      onActivityChange({ sickTimePassComplete: true });
      setTimePassOpen(false);
      selectItem(index + 1);
    }} />;
  }

  if (activityConfig?.transition === "busy-care" && busyCareTransitionIndex !== index) {
    return <BusyCareTransition species={species} onComplete={() => setBusyCareTransitionIndex(index)} />;
  }

  const renderArrivalMeal = () => (
    <ArrivalMealActivity
      activity={activity}
      petName={petName}
      species={species}
      onChange={onActivityChange}
      expenseIds={arrivalMealExpenseIdsForSpecies(species)}
      onPlayExpenseSequence={onPlayExpenseSequence}
      onContinue={continueJourney}
    />
  );

  // 一般情境題，也是其他活動缺少必要資料時的退回畫面。
  const renderScenario = () => scenario && (showArrivalMeal ? renderArrivalMeal() : (
    <ScenarioCard
      scenario={scenario}
      petName={petName}
      species={species}
      answer={answer}
      backupNames={backupNames}
      feedbackOpen={feedbackOpen}
      onChoose={choose}
      onRetry={() => setFeedbackOpen(false)}
      onContinue={continueJourney}
      {...replayCorrectProps}
    />
  ));

  const renderDailyBehavior = () => (
    <DailyBehaviorActivityMulti
      key={`${item.id}:${currentResetSignal}`}
      answers={answers}
      petName={petName}
      onChooseMultiple={onChooseMultiple}
      onCorrectExpenseSequence={(correctScenario, choices) => {
        return onPlayExpenseSequence(choices.flatMap((choice) => choice.expenseIds ?? []), {
          speciesId: species,
          stageId: correctScenario.stageId,
          sourceScenarioId: correctScenario.id,
        });
      }}
      triggerExpenseOnFeedback={activityConfig?.triggerExpenseOnFeedback === true}
      onContinue={continueJourney}
      scenarioIds={activityKey === "daily-behavior-single" && scenario ? [scenario.id] : getDailyBehaviorScenarioIds(species)}
      species={species}
      testNextSignal={activityNextSignal}
      onReplay={replaySubQuestion}
      continueImmediately={isRevisitingItem}
    />
  );

  /** 依 activityKey 分派活動；新增 JourneyActivityKey 時型別會要求在此補上對應畫面。 */
  const activityRenderers: Record<JourneyActivityKey, () => ReactNode> = {
    "rabbit-carry-sort": () => (
      <RabbitCarrySortActivity
        activity={activity}
        petName={petName}
        onChange={onActivityChange}
        onChoose={onChoose}
        onContinue={continueJourney}
        {...replayCorrectProps}
      />
    ),
    "hamster-inspection": () => (
      <HamsterMorningInspectionActivity activity={activity} petName={petName} onChange={onActivityChange} onContinue={continueJourney} />
    ),
    "gecko-health-inspection": () => geckoHealthInspectionConfig ? (
      <GeckoHealthInspectionActivity
        config={geckoHealthInspectionConfig}
        activity={activity}
        petName={petName}
        species={species}
        onChange={onActivityChange}
        onContinue={continueJourney}
      />
    ) : renderScenario(),
    "rabbit-daily-check": () => (
      <RabbitDailyCheckActivity
        activity={activity}
        petName={petName}
        onChange={onActivityChange}
        onChoose={onChoose}
        onContinue={continueJourney}
      />
    ),
    "bird-cage-inspection": () => (
      <BirdCageInspectionActivity
        activity={activity}
        petName={petName}
        onChange={onActivityChange}
        onChoose={onChoose}
        onContinue={continueJourney}
      />
    ),
    "daily-behavior": renderDailyBehavior,
    "daily-behavior-single": renderDailyBehavior,
    "cat-inspection": () => (
      <CatDailyInspectionActivity
        activity={activity}
        petName={petName}
        selected={activity.catInspectionSteps}
        onChange={(catInspectionSteps) => onActivityChange({ catInspectionSteps })}
        onActivityChange={onActivityChange}
        onContinue={continueJourney}
      />
    ),
    walking: () => (
      <WalkingActivity
        key={`${item.id}:${activity.walkingSceneIndex}:${currentResetSignal}`}
        activity={activity}
        petName={petName}
        onChange={onActivityChange}
        expenseIds={getExpenseRulesForSpecies(species).walkingExpenseIds ?? []}
        onPlayExpenseSequence={onPlayExpenseSequence}
        onContinue={continueJourney}
      />
    ),
    "arrival-meal": renderArrivalMeal,
    "breed-challenge": () => (
      <BreedChallengeActivity
        key={`${item.id}:${currentResetSignal}`}
        breed={breed}
        petName={petName}
        answers={answers}
        onChoose={onChoose}
        onContinue={continueJourney}
        testNextSignal={activityNextSignal}
        onReplay={replaySubQuestion}
        continueImmediately={isRevisitingItem}
      />
    ),
    "busy-care": () => scenario ? (
      <BusyCareActivity
        key={`${item.id}:${currentResetSignal}`}
        scenario={scenario}
        answer={answer}
        petName={petName}
        species={species}
        members={members}
        onMembersChange={onMembersChange}
        onChoose={choose}
        onMarkForReview={onMarkScenarioForReview}
        onContinue={continueJourney}
        {...replayCorrectProps}
      />
    ) : renderScenario(),
    "video-scenario": () => scenario && !showArrivalMeal ? (
      <VideoScenarioActivity
        key={`${item.id}:${currentResetSignal}`}
        scenario={scenario}
        answer={answer}
        petName={petName}
        species={species}
        breed={breed}
        onChoose={choose}
        onCorrectComplete={continueScenario}
        onCorrectFeedbackShown={(correctScenario, choice) => {
          const expenseIds = activityConfig?.deferItemExpenses ? item.expenseIds : choice.expenseIds;
          const triggerMeta = { speciesId: species, stageId: item.stageId ?? correctScenario.stageId, sourceScenarioId: correctScenario.id };
          if (activityConfig?.deferItemExpenses && expenseIds?.length) {
            onAddExpenseGroup(expenseIds, triggerMeta);
          } else {
            expenseIds?.forEach((expenseId) => onAddExpense(expenseId, triggerMeta));
          }
          choice.silentExpenseIds?.forEach((expenseId) => onAddExpenseSilently(expenseId, triggerMeta));
        }}
        onCorrectExpenseSequence={activityConfig?.triggerExpenseOnFeedback
          ? (correctScenario, choice) => onPlayExpenseSequence(choice.expenseIds ?? [], {
            speciesId: species,
            stageId: item.stageId ?? correctScenario.stageId,
            sourceScenarioId: correctScenario.id,
          })
          : undefined}
        triggerExpenseOnFeedback={activityConfig?.triggerExpenseOnFeedback === true}
        deferExpensesUntilFeedback={activityConfig?.deferItemExpenses === true}
        {...replayCorrectProps}
      />
    ) : renderScenario(),
    scenario: renderScenario,
  };

  return (
    <div className={`content-wrap life-journey-page ${canReplayCurrent ? "is-reviewing" : ""}`}>
      {activityRenderers[activityKey]()}
    </div>
  );
}
