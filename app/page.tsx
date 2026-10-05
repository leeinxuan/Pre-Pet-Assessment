"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { initialMembers, initialProfile, intros } from "./data/shared/app-flow";
import { applySizeBasedExpenseAmount, getExpenseForSpecies, getPetSizeForBreed, isTemporaryReserveExpense } from "./data/shared/expenses";
import { getSpeciesConfig } from "./data/species/index";
import { getJourneyItemsForSpecies } from "./data/species/journey";
import { initialLifeActivityState } from "./data/shared/life-activity";
import type {
  CareMember,
  ExpenseRecord,
  ExpenseTriggerMeta,
  LifeActivityState,
  LifeJourneyPhase,
  Profile,
  Scenario,
  ScenarioAnswer,
  ScenarioChoice,
  ScenarioResult,
} from "./game-types";
import {
  ArrivalTransitionVideo,
  LifeJourney,
} from "./components/life/LifeJourneyComponents";
import {
  CarTrunkPreparation,
  HomeReadinessActivity,
  initialHomeReadinessState,
  RoomPreparation,
} from "./components/preparation/PreparationComponents";
import { AssessmentReport } from "./components/report/ProfileReportComponents";
import { PetAcquisitionPage } from "./components/acquisition/PetAcquisitionPage";
import {
  CostBar,
  SpeciesStep,
  StageRail,
  TestSkipButton,
  Welcome,
} from "./components/shared/SharedComponents";

function IntroIcon({ step }: { step: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.1, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const icons = [
    <>
      <path {...common} d="M18 36c4.5-5.8 23.5-5.8 28 0" />
      <path {...common} d="M24 27c0 2.2-1.4 4-3.1 4s-3.1-1.8-3.1-4 1.4-4 3.1-4 3.1 1.8 3.1 4Z" />
      <path {...common} d="M46.2 27c0 2.2-1.4 4-3.1 4S40 29.2 40 27s1.4-4 3.1-4 3.1 1.8 3.1 4Z" />
      <path {...common} d="M31.6 20c0 2.4-1.5 4.4-3.4 4.4s-3.4-2-3.4-4.4 1.5-4.4 3.4-4.4 3.4 2 3.4 4.4Z" />
      <path {...common} d="M39.2 20c0 2.4-1.5 4.4-3.4 4.4s-3.4-2-3.4-4.4 1.5-4.4 3.4-4.4 3.4 2 3.4 4.4Z" />
    </>,
    <>
      <path {...common} d="M16 31.5 32 17l16 14.5" />
      <path {...common} d="M20 29v17h24V29" />
      <path {...common} d="M29 46V35h6v11" />
    </>,
    <>
      <path {...common} d="M18 38h28l2-10H16l2 10Z" />
      <path {...common} d="M22 28l4-8h12l4 8" />
      <path {...common} d="M22 41.5h0M42 41.5h0" />
    </>,
    <>
      <path {...common} d="M32 15v34" />
      <path {...common} d="M18 32h28" />
      <path {...common} d="M22.5 22.5 41.5 41.5" />
      <path {...common} d="M41.5 22.5 22.5 41.5" />
    </>,
    <>
      <path {...common} d="M32 47s14-8.5 14-20a8 8 0 0 0-14-5.2A8 8 0 0 0 18 27c0 11.5 14 20 14 20Z" />
      <path {...common} d="M24 32h5l2-5 4 11 2-6h4" />
    </>,
    <>
      <path {...common} d="M21 24h20v20H21z" />
      <path {...common} d="M27 20h10" />
      <path {...common} d="M26 31h12M26 37h8" />
      <path {...common} d="M43 21l4 4-4 4" />
    </>,
    <>
      <path {...common} d="M21 17h17l5 5v25H21z" />
      <path {...common} d="M38 17v7h7" />
      <path {...common} d="M26 31h12M26 37h12M26 43h7" />
    </>,
    <>
      <path {...common} d="M20 32l8 8 16-18" />
      <path {...common} d="M17 18h30v30H17z" />
    </>,
  ];

  return (
    <svg className="intro-line-icon" viewBox="0 0 64 64" aria-hidden="true">
      {icons[step - 1] ?? icons[0]}
    </svg>
  );
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [testMode, setTestMode] = useState(false);
  const [furthestStep, setFurthestStep] = useState(1);
  const [introOpen, setIntroOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [selectionPage, setSelectionPage] = useState<"species" | "breed" | "name" | "history" | "transition">("species");
  const [selectionReached, setSelectionReached] = useState(0);
  const [hasPreviousPet, setHasPreviousPet] = useState<boolean | null>(null);
  const [oldPetName, setOldPetName] = useState("");
  const [preparationTask, setPreparationTask] = useState(0);
  const [preparationReached, setPreparationReached] = useState(0);
  const [preparationReplayTask, setPreparationReplayTask] = useState<number | null>(null);
  const [homeReadiness, setHomeReadiness] = useState(initialHomeReadinessState);
  const [roomReady, setRoomReady] = useState<string[]>([]);
  const [hazardsReady, setHazardsReady] = useState<string[]>([]);
  const [members, setMembers] = useState<CareMember[]>(initialMembers);
  const [trunkSelected, setTrunkSelected] = useState<string[]>([]);
  const [trunkPassed, setTrunkPassed] = useState(false);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [latestExpense, setLatestExpense] = useState<ExpenseRecord | null>(null);
  const [lifePhase, setLifePhase] = useState<LifeJourneyPhase>("arrival-video");
  const [petName, setPetName] = useState("");
  const [journeyIndex, setJourneyIndex] = useState(0);
  const [journeyCompleted, setJourneyCompleted] = useState<string[]>([]);
  const [lifeActivity, setLifeActivity] = useState<LifeActivityState>(initialLifeActivityState);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, ScenarioAnswer>>({});
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [careCommitted, setCareCommitted] = useState(false);
  const [testSkipSignal, setTestSkipSignal] = useState(0);
  const [testNextSignal, setTestNextSignal] = useState(0);
  const costToastTimerRef = useRef<number | null>(null);
  const committedSelectionRef = useRef<{ category: string; breed: string } | null>(null);

  useEffect(() => {
    return () => {
      if (costToastTimerRef.current !== null) {
        window.clearTimeout(costToastTimerRef.current);
        costToastTimerRef.current = null;
      }
    };
  }, []);

  const backupNames = useMemo(() => {
    return members.filter((member) => !member.isPlayer && member.name.trim()).map((member) => member.name);
  }, [members]);
  const speciesConfig = getSpeciesConfig(category);
  // 舊存檔或舊網址帶入已移除犬種時，render 直接安全回選擇頁；
  // 不在 effect 中補寫狀態，避免把舊資料帶進 journey 或產生級聯 render。

  function goTo(next: number) {
    setStep(next);
    setFurthestStep((current) => Math.max(current, next));
    setIntroOpen(next > 0 && next <= 2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToStation(next: number) {
    setStep(next);
    setIntroOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToLifeStage(stageIndex: number) {
    const stageStarts = getJourneyItemsForSpecies(category).reduce<number[]>((starts, item, index, all) => {
      if (index === 0 || item.stageId !== all[index - 1].stageId) starts.push(index);
      return starts;
    }, []);
    const journeyStart = stageStarts[stageIndex] ?? 0;
    if (lifePhase === "arrival-video" && stageIndex === 0) {
      setStep(3);
      setIntroOpen(false);
    } else {
      setLifePhase("life-journey");
      setJourneyIndex(journeyStart);
      setStep(stageIndex === 0 ? 3 : stageIndex >= stageStarts.length - 1 ? 6 : 4);
      setIntroOpen(false);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function changeSelectionPage(page: "species" | "breed" | "name" | "history" | "transition") {
    const resolvedPage = page === "breed" && getSpeciesConfig(category).selection.skipBreedPage ? "name" : page;
    setSelectionPage(resolvedPage);
    const pageIndex = ({ species: 0, breed: 1, name: 2, history: 3, transition: 4 } as const)[resolvedPage];
    setSelectionReached((current) => Math.max(current, pageIndex));
  }

  function changePreparationTask(task: number) {
    setPreparationTask(task);
    setPreparationReplayTask(null);
    setPreparationReached((current) => Math.max(current, task));
  }

  function skipCurrentJourneyItemForTest() {
    if (!testMode) return;

    // 飼養前準備共有三項；跳題只切換流程，不補寫用品、費用或完成紀錄。
    if (step === 2) {
      setPreparationReplayTask(null);
      if (preparationTask < 2) {
        changePreparationTask(preparationTask + 1);
      } else {
        setPreparationReached((current) => Math.max(current, 2));
        setStep(3);
        setFurthestStep((current) => Math.max(current, 3));
        setIntroOpen(false);
      }
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    if (step < 3 || step > 6) return;
    setLatestExpense(null);
    setLifeActivity(initialLifeActivityState);

    // 到家影片不是 journey item，略過時直接進入第一個正式關卡。
    if (lifePhase === "arrival-video") {
      setTestSkipSignal((current) => current + 1);
      setLifePhase("life-journey");
      setJourneyIndex(0);
      setStep(3);
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    // 一般關卡：只觸發子題目前進，由 LifeJourneyMap 決定是否推進到下一大關。
    setTestNextSignal((current) => current + 1);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function addExpenseById(id: string, triggerMeta?: ExpenseTriggerMeta) {
    const expense = getExpenseForSpecies(id, category);
    if (!expense) return;
    const sizedExpense = {
      ...applySizeBasedExpenseAmount(expense, getPetSizeForBreed(breed)),
      ...triggerMeta,
    };
    setExpenses((current) => {
      if (current.some((item) => item.id === id)) return current;
      if (costToastTimerRef.current !== null) {
        window.clearTimeout(costToastTimerRef.current);
        costToastTimerRef.current = null;
      }
      setLatestExpense(sizedExpense);
      costToastTimerRef.current = window.setTimeout(() => {
        setLatestExpense((active) => active?.id === id ? null : active);
        costToastTimerRef.current = null;
      }, 1900);
      return [...current, sizedExpense];
    });
  }

  /** 同一個旅程節點新增一組既有費用，明細仍以原本 expenseId 個別去重。 */
  function addExpenseGroupByIds(ids: readonly string[], triggerMeta?: ExpenseTriggerMeta) {
    const catalogExpenses = ids
      .map((id) => getExpenseForSpecies(id, category))
      .filter((expense): expense is ExpenseRecord => Boolean(expense))
      .map((expense) => ({ ...applySizeBasedExpenseAmount(expense, getPetSizeForBreed(breed)), ...triggerMeta }));

    if (!catalogExpenses.length) return;

    setExpenses((current) => {
      const additions = catalogExpenses.filter((expense) => !current.some((item) => item.id === expense.id));
      if (!additions.length) return current;

      if (costToastTimerRef.current !== null) window.clearTimeout(costToastTimerRef.current);
      const groupExpense: ExpenseRecord = {
        id: `arrival-expense-group:${additions.map((item) => item.id).join("+")}`,
        name: "到家後必要支出",
        amount: additions.reduce((sum, item) => sum + item.amount, 0),
        category: "到家後必要支出",
        stage: "寵物到家後",
        recurring: false,
      };
      setLatestExpense(groupExpense);
      costToastTimerRef.current = window.setTimeout(() => {
        setLatestExpense((active) => active?.id === groupExpense.id ? null : active);
        costToastTimerRef.current = null;
      }, 1900);
      return [...current, ...additions];
    });
  }

  function addRoomItem(id: string) {
    if (!id) return;
    setRoomReady((current) => current.includes(id) ? current : [...current, id]);
    const item = speciesConfig.roomItems.find((entry) => entry.id === id);
    const expenseIds = [...(item?.expenseIds ?? []), ...(item?.expenseId ? [item.expenseId] : [])];
    Array.from(new Set(expenseIds)).forEach((expenseId) => addExpenseById(expenseId));
  }

  function toggleHazard(id: string) {
    setHazardsReady((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function updateMembers(nextMembers: CareMember[]) {
    setMembers(nextMembers);
  }

  function selectTrunkItem(id: string) {
    if (!id) return;
    const trunkItem = speciesConfig.trunkItems.find((item) => item.id === id);
    const reusedExpenseIds = new Set(trunkItem?.reusedExpenseIds ?? []);
    const expenseIds = (trunkItem?.expenseIds ?? []).filter((expenseId) => !reusedExpenseIds.has(expenseId));
    setTrunkSelected((current) => {
      if (current.includes(id)) return current;
      const next = [...current, id];
      const trunkComplete = speciesConfig.trunkItems.every((item) => next.includes(item.id));
      setTrunkPassed(trunkComplete);
      if (trunkComplete) setPreparationReached((current) => Math.max(current, 1));
      return next;
    });
    expenseIds.forEach((expenseId) => addExpenseById(expenseId));
  }

  function answerScenario(scenario: Scenario, choice: ScenarioChoice) {
    setScenarioAnswers((current) => {
      const previous = current[scenario.id];
      const discussionFlag = scenario.id === "busy-daily-care" && choice.id.startsWith("family-helper-") ? "unsuitable-family-helper" : "";
      const discussionFlags = discussionFlag
        ? Array.from(new Set([...(previous?.discussionFlags ?? []), discussionFlag]))
        : previous?.discussionFlags;
      return {
        ...current,
        [scenario.id]: previous
          ? { ...previous, finalChoiceId: choice.id, finalResult: choice.result, attempts: previous.attempts + 1, discussionFlags }
          : {
            scenarioId: scenario.id,
            firstChoiceId: choice.id,
            finalChoiceId: choice.id,
            firstResult: choice.result,
            finalResult: choice.result,
            attempts: 1,
            discussionFlags,
          },
      };
    });
    // 臨時性預留支出等「做得很好」頁出現後，才由 LifeJourney 寫入。
    const deferredArrivalExpenseIds = scenario.stageId === "arrival" && choice.result === "correct"
      ? new Set(["rabbit-arrival-checkup", "bird-arrival-checkup", "hamster-arrival-checkup"])
      : new Set<string>();
    choice.expenseIds
      ?.filter((id) => {
        const expense = getExpenseForSpecies(id, category);
        return !deferredArrivalExpenseIds.has(id) && !isTemporaryReserveExpense(expense ?? { category: "", fromEmergency: false });
      })
      .forEach((expenseId) => addExpenseById(expenseId));
  }

  function markScenarioForReview(scenario: Scenario, flag: string) {
    setScenarioAnswers((current) => {
      const previous = current[scenario.id];
      if (!previous) {
        return {
          ...current,
          [scenario.id]: {
            scenarioId: scenario.id,
            firstChoiceId: "",
            finalChoiceId: "",
            firstResult: "incorrect",
            finalResult: "incorrect",
            attempts: 0,
            discussionFlags: [flag],
          },
        };
      }
      return {
        ...current,
        [scenario.id]: {
          ...previous,
          discussionFlags: Array.from(new Set([...(previous.discussionFlags ?? []), flag])),
        },
      };
    });
  }

  function answerScenarioMultiple(scenario: Scenario, choices: ScenarioChoice[], result: ScenarioResult) {
    const choiceIds = choices.map((choice) => choice.id);
    const joinedChoiceId = choiceIds.join(",");
    setScenarioAnswers((current) => {
      const previous = current[scenario.id];
      return {
        ...current,
        [scenario.id]: previous
          ? { ...previous, finalChoiceId: joinedChoiceId, finalChoiceIds: choiceIds, finalResult: result, attempts: previous.attempts + 1 }
          : {
            scenarioId: scenario.id,
            firstChoiceId: joinedChoiceId,
            finalChoiceId: joinedChoiceId,
            firstChoiceIds: choiceIds,
            finalChoiceIds: choiceIds,
            firstResult: result,
            finalResult: result,
            attempts: 1,
          },
      };
    });
    if (result === "correct") {
      choices
        .flatMap((choice) => choice.expenseIds ?? [])
        .filter((expenseId) => {
          const expense = getExpenseForSpecies(expenseId, category);
          return !isTemporaryReserveExpense(expense ?? { category: "", fromEmergency: false });
        })
        .forEach((expenseId) => addExpenseById(expenseId));
    }
  }

  function resetAllGameData(nextSelection?: { category: string; breed: string }, options?: { preserveTestMode?: boolean }) {
    // 一次寫入最終值，避免先寫空值再覆寫的雙重渲染問題。
    setCategory(nextSelection?.category ?? "");
    setBreed(nextSelection?.breed ?? "");
    setSelectionPage(nextSelection ? "name" : "species");
    setSelectionReached(nextSelection ? 2 : 0);
    setHasPreviousPet(null);
    setOldPetName("");
    setPreparationTask(0);
    setPreparationReached(0);
    setPreparationReplayTask(null);
    setHomeReadiness(initialHomeReadinessState);
    setRoomReady([]);
    setHazardsReady([]);
    setMembers(initialMembers);
    setTrunkSelected([]);
    setTrunkPassed(false);
    setExpenses([]);
    setLatestExpense(null);
    if (costToastTimerRef.current !== null) {
      window.clearTimeout(costToastTimerRef.current);
      costToastTimerRef.current = null;
    }
    setLifePhase("arrival-video");
    setPetName("");
    setJourneyIndex(0);
    setJourneyCompleted([]);
    setLifeActivity(initialLifeActivityState);
    setScenarioAnswers({});
    setProfile(initialProfile);
    setCareCommitted(false);
    setTestSkipSignal(0);
    setTestNextSignal(0);
    committedSelectionRef.current = nextSelection ?? null;
    if (nextSelection) {
      setStep(1);
      setFurthestStep(1);
      setIntroOpen(false);
      if (!options?.preserveTestMode) setTestMode(false);
    }
  }

  const resetJourney = () => resetAllGameData();

  function confirmSelectedJourney() {
    const nextSelection = { category, breed };
    const previousSelection = committedSelectionRef.current;
    const selectionChanged = Boolean(previousSelection && (previousSelection.category !== nextSelection.category || previousSelection.breed !== nextSelection.breed));
    if (selectionChanged) {
      // 新的物種／品種只保留選擇本身，其他資料回到首次進站的乾淨狀態。
      resetAllGameData(nextSelection, { preserveTestMode: testMode });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    committedSelectionRef.current = nextSelection;
    goTo(2);
  }

  function selectSpeciesForJourney(nextSelection: { category: string; breed: string }) {
    const previousSelection = committedSelectionRef.current;
    const selectionChanged = Boolean(previousSelection && (
      previousSelection.category !== nextSelection.category || previousSelection.breed !== nextSelection.breed
    ));

    // 新物種／品種必須在選擇當下清空舊流程。若延到最後確認才重置，
    // 會先進一次取名頁、確認後又回到取名頁，造成重複渲染與重複輸入。
    if (selectionChanged) {
      resetAllGameData(nextSelection, { preserveTestMode: testMode });
      if (testMode) setPetName("多多");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCategory(nextSelection.category);
    setBreed(nextSelection.breed);
    setSelectionPage("name");
    setSelectionReached((current) => Math.max(current, 2));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startFreshJourney() {
    resetJourney();
    setTestMode(false);
    setStep(1);
    setFurthestStep(1);
    setIntroOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetAll() {
    resetJourney();
    setTestMode(false);
    setStep(0);
    setFurthestStep(1);
    setIntroOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startTestJourney() {
    resetJourney();
    setTestMode(true);
    setCategory("dog");
    setBreed("dog");
    committedSelectionRef.current = { category: "dog", breed: "dog" };
    // 測試模式不依物種帶入名稱，統一使用同一個預設名稱。
    setPetName("多多");
    setHasPreviousPet(true);
    setOldPetName("豆豆");
    setSelectionReached(4);
    setPreparationReached(2);
    setFurthestStep(8);
    setLifePhase("arrival-video");
    setJourneyIndex(0);
    setStep(1);
    // 測試模式也從共用的物種選擇入口開始，不能落入已隱藏的品種頁。
    setSelectionPage("species");
    setIntroOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPreparation() {
    if (preparationTask === 0) {
      return <HomeReadinessActivity species={category} petName={petName} state={homeReadiness} onChange={setHomeReadiness} onBack={() => goTo(1)} onNext={() => { changePreparationTask(1); window.scrollTo({ top: 0, behavior: "auto" }); }} />;
    }
    if (preparationTask === 1) {
      const reviewing = preparationReached >= 2 && preparationReplayTask !== 1;
      return <RoomPreparation selectedItems={roomReady} securedHazards={hazardsReady} petName={petName} breed={breed} species={category} onPrepare={addRoomItem} onToggleHazard={toggleHazard} reviewing={reviewing} onReplay={() => { setRoomReady([]); setHazardsReady([]); setPreparationReplayTask(1); }} onBack={() => changePreparationTask(0)} onNext={() => { changePreparationTask(2); window.scrollTo({ top: 0, behavior: "auto" }); }} />;
    }
    const reviewing = furthestStep >= 3 && preparationReplayTask !== 2;
    return <CarTrunkPreparation selected={trunkSelected} petName={petName} breed={breed} species={category} onSelect={selectTrunkItem} reviewing={reviewing} onReplay={() => { setTrunkSelected([]); setTrunkPassed(false); setPreparationReplayTask(2); }} onBack={() => changePreparationTask(1)} onNext={() => { setPreparationReached((current) => Math.max(current, 2)); setStep(3); setFurthestStep((current) => Math.max(current, 3)); setIntroOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} />;
  }

  function renderLifeJourney() {
    if (lifePhase === "arrival-video") {
      return <ArrivalTransitionVideo species={category} onContinue={() => { setJourneyIndex(0); setLifePhase("life-journey"); }} />;
    }
    return (
      <LifeJourney
        index={journeyIndex}
        petName={petName}
        breed={breed}
        species={category}
        answers={scenarioAnswers}
        activity={lifeActivity}
        completedIds={journeyCompleted}
        expenses={expenses}
        backupNames={backupNames}
        members={members}
        roomReady={roomReady}
        testSkipSignal={testSkipSignal}
        testNextSignal={testNextSignal}
        onIndex={setJourneyIndex}
        onChoose={answerScenario}
        onMarkScenarioForReview={markScenarioForReview}
        onChooseMultiple={answerScenarioMultiple}
        onMembersChange={updateMembers}
        onActivityChange={(patch) => setLifeActivity((current) => ({ ...current, ...patch }))}
        onCompleteItem={(id) => setJourneyCompleted((current) => current.includes(id) ? current : [...current, id])}
        onAddExpense={addExpenseById}
        onAddExpenseGroup={addExpenseGroupByIds}
        onStageChange={(nextStep) => { setStep(nextStep); setFurthestStep((current) => Math.max(current, nextStep)); setIntroOpen(false); }}
        onBack={() => { setStep(2); setPreparationTask(2); setIntroOpen(false); }}
        onComplete={() => {
          setLifePhase("complete");
          setStep(7);
          setFurthestStep((current) => Math.max(current, 7));
          setIntroOpen(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  return (
    <main className="app-shell">
      {step === 0 && <Welcome onStart={startFreshJourney} onTestStart={startTestJourney} />}

      {step > 0 && !introOpen && (
        <div className="stage-layout">
          <StageRail
            testMode={testMode}
            step={step}
            furthestStep={furthestStep}
            selectionPage={selectionPage}
            selectionReached={selectionReached}
            preparationTask={preparationTask}
            preparationReached={preparationReached}
            lifePhase={lifePhase}
            breed={breed}
            species={category}
            journeyIndex={journeyIndex}
            journeyCompleted={journeyCompleted}
            onGoTo={goToStation}
            onSelectionPage={(page) => { changeSelectionPage(page); goToStation(1); }}
            onPreparationTask={(task) => { changePreparationTask(task); goToStation(2); }}
            onLifeStage={goToLifeStage}
          />
          <section className="stage" aria-live="polite">
            {step >= 2 && step <= 8 && <CostBar expenses={expenses} latestExpense={latestExpense} breed={breed} species={category} />}
            {step === 1 && <SpeciesStep selectionPage={selectionPage} onSelectionPage={changeSelectionPage} category={category} breed={breed} petName={petName} onCategory={(nextCategory) => { setCategory(nextCategory); if (nextCategory === "cat" && petName === "小狗") setPetName(""); }} onBreed={(id) => { setBreed(id); if (id) setSelectionReached((current) => Math.max(current, 1)); }} onSelectSpecies={selectSpeciesForJourney} onPetName={setPetName} hasPreviousPet={hasPreviousPet} oldPetName={oldPetName} onHasPreviousPet={(value) => { setHasPreviousPet(value); if (!value) setOldPetName(""); }} onOldPetName={setOldPetName} onNext={confirmSelectedJourney} />}
            {step === 2 && renderPreparation()}
            {step >= 3 && step <= 6 && renderLifeJourney()}
            {step === 7 && <>
              <AssessmentReport petName={petName} breed={breed} species={category} profile={profile} expenses={expenses} roomReady={roomReady} hazardsReady={hazardsReady} members={members} trunkSelected={trunkSelected} trunkPassed={trunkPassed} answers={scenarioAnswers} lifeActivity={lifeActivity} homeReadiness={homeReadiness} committed={careCommitted} onCommittedChange={setCareCommitted} onBack={() => { setStep(6); setIntroOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} onReset={resetAll} />
              <div className="report-next-step-actions">
                <p>準備好進一步了解合法、透明的取得方式了嗎？</p>
                <button className="primary" type="button" onClick={() => { setStep(8); setFurthestStep((current) => Math.max(current, 8)); window.scrollTo({ top: 0, behavior: "auto" }); }}>取得寵物 <span>→</span></button>
              </div>
            </>}
            {step === 8 && <PetAcquisitionPage profile={profile} petName={petName} breed={breed} species={category} onProfileChange={setProfile} onBack={() => { setStep(7); setIntroOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} onReset={resetAll} />}
          </section>
        </div>
      )}

      {testMode && !introOpen && (step === 2 || (step >= 3 && step <= 6)) && <TestSkipButton onSkip={skipCurrentJourneyItemForTest} />}

      {step > 0 && introOpen && (
        <section className="intro-screen">
          <div className="intro-orbit" aria-hidden="true"><IntroIcon step={step} /></div>
          <h1 className={step === 1 || step === 2 ? "intro-screen-title--light" : undefined}>{intros[step - 1].title}</h1>
          <p className="intro-body">{intros[step - 1].body}</p>
          <button className="primary large" onClick={() => setIntroOpen(false)}>開始 <span>→</span></button>
        </section>
      )}
    </main>
  );
}
