"use client";

import { useEffect, useState } from "react";
import { getExpenseForSpecies, isTemporaryReserveExpense } from "../../data/shared/expenses";
import {
  getDailyBehaviorScenarioIds,
  getJourneyItemsForSpecies,
  getJourneyStepForItem,
  getLifeScenariosForSpecies,
} from "../../data/species/journey";
import { getJourneyActivityConfig, getJourneyActivityResetPatch } from "../../data/species/activity-registry";
import { getSpeciesConfig } from "../../data/species";
import {
  ArrivalMealActivity,
  BirdCageInspectionActivity,
  BreedChallengeActivity,
  BusyCareActivity,
  BusyCareTransition,
  CatDailyInspectionActivity,
  DailyBehaviorActivityMulti,
  GuidedInspection,
  RabbitCarrySortActivity,
  RabbitDailyCheckActivity,
  ScenarioCard,
  TimePassTransition,
  VideoScenarioActivity,
  WalkingActivity,
} from "./activities";
export { ArrivalTransitionVideo } from "./activities";
import type {
  CareMember,
  ExpenseRecord,
  ExpenseTriggerMeta,
  LifeActivityState,
  Scenario,
  ScenarioAnswer,
  ScenarioChoice,
  ScenarioResult,
} from "../../game-types";

function choiceHasTemporaryReserveExpense(choice: ScenarioChoice, species: string) {
  return (choice.expenseIds ?? []).some((id) => {
    const expense = getExpenseForSpecies(id, species);
    return Boolean(expense && isTemporaryReserveExpense(expense));
  });
}

const directRoomExpenseIds = new Set([
  "cat-litter-monthly",
  "bird-cleaning-monthly",
  "hamster-sand-monthly",
  "hamster-bedding-monthly",
  "hamster-gnaw-monthly",
  "rabbit-litter-monthly",
  // 狗狗清潔耗材在散步前選取撿便袋時加入，不能跟第一餐一起觸發。
  "dog-clean-monthly",
]);

function arrivalMealExpenseIdsForSpecies(species: string) {
  return getSpeciesConfig(species).feeding.recurringExpenseIds.filter((id) => !directRoomExpenseIds.has(id));
}



export function LifeJourney({
  index,
  petName,
  breed,
  species = "dog",
  answers,
  activity,
  completedIds,
  backupNames,
  members,
  testSkipSignal = 0,
  testNextSignal = 0,
  onIndex,
  onChoose,
  onMarkScenarioForReview,
  onChooseMultiple,
  onMembersChange,
  onActivityChange,
  onCompleteItem,
  onAddExpense,
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
  completedIds: string[];
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
  onMembersChange: (members: CareMember[]) => void;
  onActivityChange: (patch: Partial<LifeActivityState>) => void;
  onCompleteItem: (id: string) => void;
  onAddExpense: (id: string, triggerMeta?: ExpenseTriggerMeta) => void;
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
  const isDailyBehaviorActivity = activityKey === "daily-behavior" || activityKey === "daily-behavior-single";
  const isDailyInspectionActivity = activityKey === "cat-inspection";
  const isRabbitCarrySortActivity = activityKey === "rabbit-carry-sort";
  const isRabbitDailyCheckActivity = activityKey === "rabbit-daily-check";
  const isBirdCageInspectionActivity = activityKey === "bird-cage-inspection";
  const isArrivalMealActivity = activityKey === "arrival-meal";
  const isWalkingActivity = activityKey === "walking";
  const isBreedChallengeActivity = activityKey === "breed-challenge";
  const isActivityWithSubQuestions = isDailyBehaviorActivity || isBreedChallengeActivity;
  const [activityNextSignal, setActivityNextSignal] = useState(0);
  const isBusyCareActivity = activityKey === "busy-care";
  const isVideoFeedbackScenario = activityKey === "video-scenario";
  const [arrivalMealOpen, setArrivalMealOpen] = useState(false);
  // 兔子的第一餐是明確的 journey item；犬貓則沿用既有的到家後直接開啟方式。
  const showArrivalMeal = activityConfig?.transition === "arrival-meal" && answer?.finalResult === "correct" && arrivalMealOpen;
  const [feedbackOpen, setFeedbackOpen] = useState(Boolean(answer));
  const [timePassOpen, setTimePassOpen] = useState(false);
  const [busyCareTransitionIndex, setBusyCareTransitionIndex] = useState<number | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [resetItemId, setResetItemId] = useState<string | null>(null);
  const [replayInProgress, setReplayInProgress] = useState(false);
  // 測試模式由頂層切換 index；這裡只清除元件內暫存畫面，不能寫入任何答題或完成資料。
  useEffect(() => {
    if (testSkipSignal === 0) return;
    setFeedbackOpen(false); // eslint-disable-line react-hooks/set-state-in-effect
    setTimePassOpen(false);
    setArrivalMealOpen(false);
    setBusyCareTransitionIndex(null);
    setReplayInProgress(false);
  }, [testSkipSignal]);

  function selectItem(next: number) {
    const nextScenarioId = activeJourneyItems[next].scenarioId;
    setFeedbackOpen(Boolean(nextScenarioId && answers[nextScenarioId]));
    setReplayInProgress(false);
    onIndex(next);
    onStageChange(getJourneyStepForItem(activeJourneyItems[next]));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function continueJourney() {
    if (!(isRabbitCarrySortActivity && activity.rabbitCarryAnswerRevealed && !activity.rabbitCarryComplete)) {
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

  function resetCurrentQuestion() {
    setFeedbackOpen(false);
    setArrivalMealOpen(false);
    setTimePassOpen(false);
    const resetPatch = getJourneyActivityResetPatch(activityConfig?.resetKey);
    if (resetPatch) onActivityChange(resetPatch);
    setReplayInProgress(true);
    setResetItemId(item.id);
    setResetSignal((current) => current + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const isReviewingCompletedItem = completedIds.includes(item.id);
  const canResetCurrent = isReviewingCompletedItem && !replayInProgress;
  const currentResetSignal = resetItemId === item.id ? resetSignal : 0;
  const replayCorrectProps = isReviewingCompletedItem
    ? { onReplay: resetCurrentQuestion, continueImmediately: true }
    : {};

  if (timePassOpen && activityConfig?.transition === "time-pass") {
    return <TimePassTransition onComplete={() => {
      onActivityChange({ sickTimePassComplete: true });
      setTimePassOpen(false);
      selectItem(index + 1);
    }} />;
  }

  if (activityConfig?.transition === "busy-care" && busyCareTransitionIndex !== index) {
    return <BusyCareTransition onComplete={() => setBusyCareTransitionIndex(index)} />;
  }

  return (
    <div className={`content-wrap life-journey-page ${canResetCurrent ? "is-reviewing" : ""}`}>
      {isRabbitCarrySortActivity ? (
        <RabbitCarrySortActivity
          activity={activity}
          petName={petName}
          onChange={onActivityChange}
          onChoose={onChoose}
          onContinue={continueJourney}
          {...replayCorrectProps}
        />
      ) : activityKey === "hamster-inspection" ? (
        <GuidedInspection activity={activity} petName={petName} onChange={onActivityChange} onContinue={continueJourney} />
      ) : isRabbitDailyCheckActivity ? (
        <RabbitDailyCheckActivity
          activity={activity}
          petName={petName}
          onChange={onActivityChange}
          onChoose={onChoose}
          onContinue={continueJourney}
          {...replayCorrectProps}
        />
      ) : isBirdCageInspectionActivity ? (
        <BirdCageInspectionActivity
          activity={activity}
          petName={petName}
          onChange={onActivityChange}
          onChoose={onChoose}
          onContinue={continueJourney}
        />
      ) : isDailyBehaviorActivity ? (
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
          onContinue={continueJourney}
          scenarioIds={activityKey === "daily-behavior-single" && scenario ? [scenario.id] : getDailyBehaviorScenarioIds(species)}
          species={species}
          testNextSignal={activityNextSignal}
          {...replayCorrectProps}
        />
      ) : isDailyInspectionActivity ? (
        <CatDailyInspectionActivity
          petName={petName}
          selected={activity.catInspectionSteps}
          onChange={(catInspectionSteps) => onActivityChange({ catInspectionSteps })}
          onContinue={continueJourney}
        />
      ) : isWalkingActivity ? (
        <WalkingActivity
          key={`${item.id}:${activity.walkingSceneIndex}:${currentResetSignal}`}
          activity={activity}
          petName={petName}
          onChange={onActivityChange}
          expenseIds={["dog-clean-monthly"]}
          onPlayExpenseSequence={onPlayExpenseSequence}
          onContinue={continueJourney}
        />
      ) : isArrivalMealActivity ? (
        <ArrivalMealActivity
          activity={activity}
          petName={petName}
          species={species}
          onChange={onActivityChange}
          expenseIds={arrivalMealExpenseIdsForSpecies(species)}
          onPlayExpenseSequence={onPlayExpenseSequence}
          onContinue={continueJourney}
        />
      ) : isBreedChallengeActivity ? (
        <BreedChallengeActivity
          key={`${item.id}:${currentResetSignal}`}
          breed={breed}
          petName={petName}
          answers={answers}
          onChoose={onChoose}
          onContinue={continueJourney}
          testNextSignal={activityNextSignal}
          {...replayCorrectProps}
        />
      ) : isBusyCareActivity && scenario ? (
        <BusyCareActivity
          key={`${item.id}:${currentResetSignal}`}
          scenario={scenario}
          answer={answer}
          petName={petName}
          members={members}
          onMembersChange={onMembersChange}
          onChoose={choose}
          onMarkForReview={onMarkScenarioForReview}
          onContinue={continueJourney}
          {...replayCorrectProps}
        />
      ) : isVideoFeedbackScenario && scenario && !showArrivalMeal ? (
        <VideoScenarioActivity
          key={`${item.id}:${currentResetSignal}`}
          scenario={scenario}
          answer={answer}
          petName={petName}
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
          }}
          onCorrectExpenseSequence={scenario.choices.some((choice) => choiceHasTemporaryReserveExpense(choice, species))
            ? (correctScenario, choice) => onPlayExpenseSequence(choice.expenseIds ?? [], {
              speciesId: species,
              stageId: item.stageId ?? correctScenario.stageId,
              sourceScenarioId: correctScenario.id,
            })
            : undefined}
          deferExpensesUntilFeedback={activityConfig?.deferItemExpenses === true}
          {...replayCorrectProps}
        />
      ) : scenario && (showArrivalMeal ? (
        <ArrivalMealActivity
          activity={activity}
          petName={petName}
          species={species}
          onChange={onActivityChange}
          expenseIds={arrivalMealExpenseIdsForSpecies(species)}
          onPlayExpenseSequence={onPlayExpenseSequence}
          onContinue={continueJourney}
        />
      ) : (
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
      ))}
    </div>
  );
}
