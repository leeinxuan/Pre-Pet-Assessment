"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  applySizeBasedExpenseAmount,
  expenseCatalog,
  departureTrunkItems,
  getPetSizeForBreed,
  initialMembers,
  initialProfile,
  intros,
  roomItems,
} from "./game-data";
import { initialLifeActivityState } from "./life-data";
import type {
  CareMember,
  ExpenseRecord,
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
  RoomPreparation,
} from "./components/preparation/PreparationComponents";
import { AssessmentReport, ProfileSupplementForm } from "./components/report/ProfileReportComponents";
import { PetAcquisitionPage } from "./components/acquisition/PetAcquisitionPage";
import {
  CostBar,
  SpeciesStep,
  StageRail,
  Welcome,
} from "./components/shared/SharedComponents";

const emergencyReserve = 20000;

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
  const [hasPreviousDog, setHasPreviousDog] = useState<boolean | null>(null);
  const [previousBreed, setPreviousBreed] = useState("");
  const [previousDogName, setPreviousDogName] = useState("");
  const [preparationTask, setPreparationTask] = useState(0);
  const [preparationReached, setPreparationReached] = useState(0);
  const [preparationReplayTask, setPreparationReplayTask] = useState<number | null>(null);
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
  const costToastTimerRef = useRef<number | null>(null);

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
    const firstJourneyItem = [0, 1, 3, 4];
    const underlyingStep = [3, 4, 4, 6];
    if (lifePhase === "arrival-video" && stageIndex === 0) {
      setStep(3);
      setIntroOpen(false);
    } else {
      setLifePhase("life-journey");
      setJourneyIndex(firstJourneyItem[stageIndex]);
      setStep(underlyingStep[stageIndex]);
      setIntroOpen(false);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function changeSelectionPage(page: "species" | "breed" | "name" | "history" | "transition") {
    setSelectionPage(page);
    const pageIndex = ({ species: 0, breed: 1, name: 2, history: 3, transition: 4 } as const)[page];
    setSelectionReached((current) => Math.max(current, pageIndex));
  }

  function changePreparationTask(task: number) {
    setPreparationTask(task);
    setPreparationReplayTask(null);
    setPreparationReached((current) => Math.max(current, task));
  }

  function addExpenseById(id: string) {
    const expense = expenseCatalog[id];
    if (!expense) return;
    const sizedExpense = applySizeBasedExpenseAmount(expense, getPetSizeForBreed(breed));
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
      }, 2600);
      return [...current, sizedExpense];
    });
  }

  function addRoomItem(id: string) {
    if (!id) return;
    setRoomReady((current) => current.includes(id) ? current : [...current, id]);
    const expenseId = roomItems.find((item) => item.id === id)?.expenseId;
    if (expenseId) addExpenseById(expenseId);
  }

  function toggleHazard(id: string) {
    setHazardsReady((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function updateMembers(nextMembers: CareMember[]) {
    setMembers(nextMembers);
  }

  function selectTrunkItem(id: string) {
    if (!id) return;
    const expenseIds = departureTrunkItems.find((item) => item.id === id)?.expenseIds ?? [];
    setTrunkSelected((current) => {
      if (current.includes(id)) return current;
      const next = [...current, id];
      const trunkComplete = departureTrunkItems.every((item) => next.includes(item.id));
      setTrunkPassed(trunkComplete);
      if (trunkComplete) setPreparationReached((current) => Math.max(current, 1));
      return next;
    });
    expenseIds.forEach(addExpenseById);
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
    choice.expenseIds?.forEach(addExpenseById);
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
      choices.flatMap((choice) => choice.expenseIds ?? []).forEach(addExpenseById);
    }
  }

  function resetJourney() {
    setCategory("");
    setBreed("");
    setSelectionPage("species");
    setSelectionReached(0);
    setHasPreviousDog(null);
    setPreviousBreed("");
    setPreviousDogName("");
    setPreparationTask(0);
    setPreparationReached(0);
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
    setBreed("shiba");
    setPetName("小伴");
    setHasPreviousDog(true);
    setPreviousBreed("poodle");
    setPreviousDogName("豆豆");
    setSelectionReached(4);
    setPreparationReached(1);
    setFurthestStep(8);
    setLifePhase("life-journey");
    setStep(1);
    setIntroOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPreparation() {
    if (preparationTask === 0) {
      const reviewing = preparationReached >= 1 && preparationReplayTask !== 0;
      return <RoomPreparation selectedItems={roomReady} securedHazards={hazardsReady} petName={petName} breed={breed} onPrepare={addRoomItem} onToggleHazard={toggleHazard} reviewing={reviewing} onReplay={() => { setRoomReady([]); setHazardsReady([]); setPreparationReplayTask(0); }} onBack={() => goTo(1)} onNext={() => { changePreparationTask(1); window.scrollTo({ top: 0, behavior: "auto" }); }} />;
    }
    const reviewing = furthestStep >= 3 && preparationReplayTask !== 1;
    return <CarTrunkPreparation selected={trunkSelected} petName={petName} breed={breed} onSelect={selectTrunkItem} reviewing={reviewing} onReplay={() => { setTrunkSelected([]); setTrunkPassed(false); setPreparationReplayTask(1); }} onBack={() => changePreparationTask(0)} onNext={() => { setPreparationReached((current) => Math.max(current, 1)); setStep(3); setFurthestStep((current) => Math.max(current, 3)); setIntroOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} />;
  }

  function renderLifeJourney() {
    if (lifePhase === "arrival-video") {
      return <ArrivalTransitionVideo onContinue={() => { setJourneyIndex(0); setLifePhase("life-journey"); }} />;
    }
    return (
      <LifeJourney
        index={journeyIndex}
        petName={petName}
        breed={breed}
        answers={scenarioAnswers}
        activity={lifeActivity}
        completedIds={journeyCompleted}
        expenses={expenses}
        backupNames={backupNames}
        members={members}
        roomReady={roomReady}
        onIndex={setJourneyIndex}
        onChoose={answerScenario}
        onChooseMultiple={answerScenarioMultiple}
        onMembersChange={updateMembers}
        onActivityChange={(patch) => setLifeActivity((current) => ({ ...current, ...patch }))}
        onCompleteItem={(id) => setJourneyCompleted((current) => current.includes(id) ? current : [...current, id])}
        onAddExpense={addExpenseById}
        onStageChange={(nextStep) => { setStep(nextStep); setFurthestStep((current) => Math.max(current, nextStep)); setIntroOpen(false); }}
        onBack={() => { setStep(2); setPreparationTask(1); setIntroOpen(false); }}
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
            journeyIndex={journeyIndex}
            journeyCompleted={journeyCompleted}
            onGoTo={goToStation}
            onSelectionPage={(page) => { changeSelectionPage(page); goToStation(1); }}
            onPreparationTask={(task) => { changePreparationTask(task); goToStation(2); }}
            onLifeStage={goToLifeStage}
          />
          <section className="stage" aria-live="polite">
            {step >= 2 && step <= 8 && <CostBar expenses={expenses} emergencyReserve={emergencyReserve} latestExpense={latestExpense} breed={breed} />}
            {step === 1 && <SpeciesStep selectionPage={selectionPage} onSelectionPage={changeSelectionPage} category={category} breed={breed} petName={petName} onCategory={setCategory} onBreed={(id) => { setBreed(id); if (id) setSelectionReached((current) => Math.max(current, 1)); }} onPetName={setPetName} hasPreviousDog={hasPreviousDog} previousBreed={previousBreed} previousDogName={previousDogName} onHasPreviousDog={(value) => { setHasPreviousDog(value); if (!value) { setPreviousBreed(""); setPreviousDogName(""); } }} onPreviousBreed={setPreviousBreed} onPreviousDogName={setPreviousDogName} onNext={() => goTo(2)} />}
            {step === 2 && renderPreparation()}
            {step >= 3 && step <= 6 && renderLifeJourney()}
            {step === 7 && <>
              <AssessmentReport petName={petName} breed={breed} profile={profile} expenses={expenses} emergencyReserve={emergencyReserve} roomReady={roomReady} hazardsReady={hazardsReady} members={members} trunkSelected={trunkSelected} trunkPassed={trunkPassed} answers={scenarioAnswers} lifeActivity={lifeActivity} committed={careCommitted} onCommittedChange={setCareCommitted} onBack={() => { setStep(6); setIntroOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} onReset={resetAll} />
              <ProfileSupplementForm profile={profile} petName={petName} onChange={setProfile} onBack={() => { setStep(6); setIntroOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} onReset={resetAll} />
              <div className="report-next-step-actions">
                <button className="primary" type="button" disabled={!careCommitted} aria-describedby="care-commitment-gate" onClick={() => { setStep(8); setFurthestStep((current) => Math.max(current, 8)); window.scrollTo({ top: 0, behavior: "auto" }); }}>取得寵物 <span>→</span></button>
                {!careCommitted && <p id="care-commitment-gate" className="report-commitment-hint">請先勾選上方的照顧承諾，才能進入下一步。</p>}
              </div>
            </>}
            {step === 8 && <PetAcquisitionPage onBack={() => { setStep(7); setIntroOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} onReset={resetAll} />}
          </section>
        </div>
      )}

      {step > 0 && introOpen && (
        <section className="intro-screen">
          <div className="intro-orbit" aria-hidden="true"><IntroIcon step={step} /></div>
          <h1>{intros[step - 1].title}</h1>
          <p className="intro-body">{intros[step - 1].body}</p>
          <button className="primary large" onClick={() => setIntroOpen(false)}>開始 <span>→</span></button>
        </section>
      )}
    </main>
  );
}
