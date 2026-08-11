"use client";

import { useMemo, useState } from "react";
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
  const [furthestStep, setFurthestStep] = useState(1);
  const [introOpen, setIntroOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [selectionPage, setSelectionPage] = useState<"species" | "breed">("species");
  const [selectionReached, setSelectionReached] = useState(0);
  const [preparationTask, setPreparationTask] = useState(0);
  const [preparationReached, setPreparationReached] = useState(0);
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
    const firstJourneyItem = [0, 1, 3];
    const underlyingStep = [3, 4, 6];
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

  function changeSelectionPage(page: "species" | "breed") {
    setSelectionPage(page);
    setSelectionReached((current) => Math.max(current, page === "breed" ? 1 : 0));
  }

  function changePreparationTask(task: number) {
    setPreparationTask(task);
    setPreparationReached((current) => Math.max(current, task));
  }

  function addExpenseById(id: string) {
    const expense = expenseCatalog[id];
    if (!expense) return;
    const sizedExpense = applySizeBasedExpenseAmount(expense, getPetSizeForBreed(breed));
    setExpenses((current) => {
      if (current.some((item) => item.id === id)) return current;
      setLatestExpense(sizedExpense);
      window.setTimeout(() => setLatestExpense((active) => active?.id === id ? null : active), 1800);
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
      return {
        ...current,
        [scenario.id]: previous
          ? { ...previous, finalChoiceId: choice.id, finalResult: choice.result, attempts: previous.attempts + 1 }
          : {
            scenarioId: scenario.id,
            firstChoiceId: choice.id,
            finalChoiceId: choice.id,
            firstResult: choice.result,
            finalResult: choice.result,
            attempts: 1,
          },
      };
    });
    choice.expenseIds?.forEach(addExpenseById);
  }

  function resetJourney() {
    setCategory("");
    setBreed("");
    setSelectionPage("species");
    setSelectionReached(0);
    setPreparationTask(0);
    setPreparationReached(0);
    setRoomReady([]);
    setHazardsReady([]);
    setMembers(initialMembers);
    setTrunkSelected([]);
    setTrunkPassed(false);
    setExpenses([]);
    setLatestExpense(null);
    setLifePhase("arrival-video");
    setPetName("");
    setJourneyIndex(0);
    setJourneyCompleted([]);
    setLifeActivity(initialLifeActivityState);
    setScenarioAnswers({});
    setProfile(initialProfile);
  }

  function startFreshJourney() {
    resetJourney();
    setStep(1);
    setFurthestStep(1);
    setIntroOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetAll() {
    resetJourney();
    setStep(0);
    setFurthestStep(1);
    setIntroOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPreparation() {
    if (preparationTask === 0) {
      return <RoomPreparation selectedItems={roomReady} securedHazards={hazardsReady} petName={petName} onPrepare={addRoomItem} onToggleHazard={toggleHazard} onSavePetName={setPetName} onBack={() => goTo(1)} onNext={() => changePreparationTask(1)} />;
    }
    return <CarTrunkPreparation selected={trunkSelected} petName={petName} onSelect={selectTrunkItem} onBack={() => changePreparationTask(0)} onNext={() => { setPreparationReached((current) => Math.max(current, 1)); setStep(3); setFurthestStep((current) => Math.max(current, 3)); setIntroOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} />;
  }

  function renderLifeJourney() {
    if (lifePhase === "arrival-video") {
      return <ArrivalTransitionVideo onContinue={() => { setJourneyIndex(0); setLifePhase("life-journey"); }} />;
    }
    return (
      <LifeJourney
        index={journeyIndex}
        petName={petName}
        answers={scenarioAnswers}
        activity={lifeActivity}
        completedIds={journeyCompleted}
        expenses={expenses}
        backupNames={backupNames}
        members={members}
        roomReady={roomReady}
        onIndex={setJourneyIndex}
        onChoose={answerScenario}
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
      {step === 0 && <Welcome onStart={startFreshJourney} />}

      {step > 0 && !introOpen && (
        <div className="stage-layout">
          <StageRail
            step={step}
            furthestStep={furthestStep}
            selectionPage={selectionPage}
            selectionReached={selectionReached}
            preparationTask={preparationTask}
            preparationReached={preparationReached}
            lifePhase={lifePhase}
            journeyIndex={journeyIndex}
            journeyCompleted={journeyCompleted}
            onGoTo={goToStation}
            onSelectionPage={(page) => { changeSelectionPage(page); goToStation(1); }}
            onPreparationTask={(task) => { changePreparationTask(task); goToStation(2); }}
            onLifeStage={goToLifeStage}
          />
          <section className="stage" aria-live="polite">
            {step >= 2 && step <= 7 && <CostBar expenses={expenses} emergencyReserve={emergencyReserve} latestExpense={latestExpense} breed={breed} />}
            {step === 1 && <SpeciesStep selectionPage={selectionPage} onSelectionPage={changeSelectionPage} category={category} breed={breed} onCategory={setCategory} onBreed={(id) => { setBreed(id); if (id) setSelectionReached((current) => Math.max(current, 1)); }} onNext={() => goTo(2)} />}
            {step === 2 && renderPreparation()}
            {step >= 3 && step <= 6 && renderLifeJourney()}
            {step === 7 && <>
              <AssessmentReport petName={petName} breed={breed} profile={profile} expenses={expenses} emergencyReserve={emergencyReserve} roomReady={roomReady} hazardsReady={hazardsReady} members={members} trunkSelected={trunkSelected} trunkPassed={trunkPassed} answers={scenarioAnswers} lifeActivity={lifeActivity} onBack={() => { setStep(6); setIntroOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} onReset={resetAll} />
              <ProfileSupplementForm profile={profile} onChange={setProfile} onBack={() => { setStep(6); setIntroOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} onReset={resetAll} />
            </>}
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
