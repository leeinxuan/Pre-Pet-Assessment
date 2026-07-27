"use client";

import { useMemo, useState } from "react";
import {
  expenseCatalog,
  initialMembers,
  initialProfile,
  intros,
  roomItems,
  trunkItems,
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
} from "./life-journey-components";
import {
  CarTrunkPreparation,
  CareMemberSetup,
  RoomPreparation,
} from "./preparation-components";
import { AssessmentReport, ProfileForm } from "./profile-report-components";
import {
  CostBar,
  SpeciesStep,
  StageRail,
  Welcome,
} from "./shared-components";

const emergencyReserve = 20000;

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
  const [profilePage, setProfilePage] = useState(0);
  const [profileReached, setProfileReached] = useState(0);

  const backupNames = useMemo(() => {
    return members.filter((member) => !member.isPlayer && member.name.trim()).map((member) => member.name);
  }, [members]);

  function goTo(next: number) {
    setStep(next);
    setFurthestStep((current) => Math.max(current, next));
    setIntroOpen(next > 0 && !(next >= 3 && next <= 6));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToStation(next: number) {
    setStep(next);
    setIntroOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToLifeStage(stageIndex: number) {
    const firstJourneyItem = [0, 2, 6, 7];
    const underlyingStep = [3, 4, 5, 6];
    if (lifePhase === "arrival-video" && stageIndex === 0) {
      setStep(3);
      setIntroOpen(false);
    } else {
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

  function changeProfilePage(page: number) {
    setProfilePage(page);
    setProfileReached((current) => Math.max(current, page));
  }

  function addExpenseById(id: string) {
    const expense = expenseCatalog[id];
    if (!expense) return;
    setExpenses((current) => {
      if (current.some((item) => item.id === id)) return current;
      setLatestExpense(expense);
      window.setTimeout(() => setLatestExpense((active) => active?.id === id ? null : active), 1800);
      return [...current, expense];
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
    const expenseIds = trunkItems.find((item) => item.id === id)?.expenseIds ?? [];
    setTrunkSelected((current) => {
      if (current.includes(id)) return current;
      const next = [...current, id];
      setTrunkPassed(trunkItems.every((item) => next.includes(item.id)));
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
    setProfilePage(0);
    setProfileReached(0);
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
    if (preparationTask === 1) {
      return <CareMemberSetup members={members} onChange={updateMembers} onBack={() => changePreparationTask(0)} onNext={() => changePreparationTask(2)} />;
    }
    return <CarTrunkPreparation selected={trunkSelected} onSelect={selectTrunkItem} onBack={() => changePreparationTask(1)} onNext={() => { setStep(3); setFurthestStep((current) => Math.max(current, 3)); setIntroOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} />;
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
        roomReady={roomReady}
        onIndex={setJourneyIndex}
        onChoose={answerScenario}
        onActivityChange={(patch) => setLifeActivity((current) => ({ ...current, ...patch }))}
        onCompleteItem={(id) => setJourneyCompleted((current) => current.includes(id) ? current : [...current, id])}
        onAddExpense={addExpenseById}
        onStageChange={(nextStep) => { setStep(nextStep); setFurthestStep((current) => Math.max(current, nextStep)); setIntroOpen(false); }}
        onBack={() => { setStep(2); setPreparationTask(2); setIntroOpen(false); }}
        onComplete={() => { setLifePhase("complete"); goTo(7); }}
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
            profilePage={profilePage}
            profileReached={profileReached}
            onGoTo={goToStation}
            onSelectionPage={(page) => { changeSelectionPage(page); goToStation(1); }}
            onPreparationTask={(task) => { changePreparationTask(task); goToStation(2); }}
            onLifeStage={goToLifeStage}
            onProfilePage={(page) => { changeProfilePage(page); goToStation(7); }}
          />
          <section className="stage" aria-live="polite">
            {step >= 2 && step <= 7 && <CostBar expenses={expenses} emergencyReserve={emergencyReserve} latestExpense={latestExpense} />}
            {step === 1 && <SpeciesStep selectionPage={selectionPage} onSelectionPage={changeSelectionPage} category={category} breed={breed} onCategory={setCategory} onBreed={setBreed} onNext={() => goTo(2)} />}
            {step === 2 && renderPreparation()}
            {step >= 3 && step <= 6 && renderLifeJourney()}
            {step === 7 && <ProfileForm page={profilePage} onPage={changeProfilePage} profile={profile} onChange={setProfile} onBack={() => { setStep(6); setIntroOpen(false); }} onNext={() => goTo(8)} />}
            {step === 8 && <AssessmentReport petName={petName} breed={breed} profile={profile} expenses={expenses} emergencyReserve={emergencyReserve} roomReady={roomReady} hazardsReady={hazardsReady} members={members} trunkSelected={trunkSelected} trunkPassed={trunkPassed} answers={scenarioAnswers} lifeActivity={lifeActivity} onBack={() => goTo(7)} onReset={resetAll} />}
          </section>
        </div>
      )}

      {step > 0 && introOpen && (
        <section className="intro-screen">
          <div className="intro-orbit" aria-hidden="true"><span>{intros[step - 1].icon}</span></div>
          <h1>{intros[step - 1].title}</h1>
          <p className="intro-body">{intros[step - 1].body}</p>
          <div className="soft-note"><span>✦</span>{intros[step - 1].tip}</div>
          <button className="primary large" onClick={() => setIntroOpen(false)}>進入這一站 <span>→</span></button>
        </section>
      )}
    </main>
  );
}
