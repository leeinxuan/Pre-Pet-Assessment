"use client";

import { useMemo, useState } from "react";
import {
  expenseCatalog,
  initialAssignments,
  initialMembers,
  initialProfile,
  intros,
  roomItems,
  trunkItems,
} from "./game-data";
import { initialLifeActivityState } from "./life-data";
import type {
  CareAssignment,
  CareMember,
  ExpenseRecord,
  LifeActivityState,
  LifeJourneyPhase,
  Profile,
  Scenario,
  ScenarioAnswer,
  ScenarioChoice,
} from "./game-types";
import { ArrivalIntro, LifeJourney } from "./life-journey-components";
import {
  CarTrunkPreparation,
  CareMemberSetup,
  CareTaskAssignment,
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
  const [introOpen, setIntroOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [preparationTask, setPreparationTask] = useState(0);
  const [roomReady, setRoomReady] = useState<string[]>([]);
  const [hazardsReady, setHazardsReady] = useState<string[]>([]);
  const [members, setMembers] = useState<CareMember[]>(initialMembers);
  const [assignments, setAssignments] = useState<Record<string, CareAssignment>>(initialAssignments);
  const [trunkSelected, setTrunkSelected] = useState<string[]>([]);
  const [trunkChecked, setTrunkChecked] = useState(false);
  const [trunkPassed, setTrunkPassed] = useState(false);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [latestExpense, setLatestExpense] = useState<ExpenseRecord | null>(null);
  const [lifePhase, setLifePhase] = useState<LifeJourneyPhase>("arrival-intro");
  const [journeyIndex, setJourneyIndex] = useState(0);
  const [journeyCompleted, setJourneyCompleted] = useState<string[]>([]);
  const [lifeActivity, setLifeActivity] = useState<LifeActivityState>(initialLifeActivityState);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, ScenarioAnswer>>({});
  const [profile, setProfile] = useState<Profile>(initialProfile);

  const backupNames = useMemo(() => {
    const backupIds = new Set(
      [
        ...Object.values(assignments).map((assignment) => assignment.backup),
        assignments.emergency?.primary,
      ].filter((id): id is string => Boolean(id) && id !== "player"),
    );
    return members.filter((member) => backupIds.has(member.id)).map((member) => member.name);
  }, [assignments, members]);

  function goTo(next: number) {
    setStep(next);
    setIntroOpen(next > 0 && !(next >= 3 && next <= 6));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToStation(next: number) {
    const firstJourneyItem: Record<number, number> = { 3: 0, 4: 3, 5: 6, 6: 7 };
    if (firstJourneyItem[next] !== undefined) setJourneyIndex(firstJourneyItem[next]);
    goTo(next);
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
    const validIds = new Set(nextMembers.map((member) => member.id));
    setMembers(nextMembers);
    setAssignments((current) => Object.fromEntries(Object.entries(current).map(([taskId, assignment]) => [
      taskId,
      {
        primary: validIds.has(assignment.primary) ? assignment.primary : "",
        backup: validIds.has(assignment.backup) ? assignment.backup : "",
      },
    ])));
  }

  function toggleTrunkItem(id: string) {
    if (!id) return;
    const adding = !trunkSelected.includes(id);
    setTrunkSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    setTrunkChecked(false);
    setTrunkPassed(false);
    if (adding) {
      const expenseId = trunkItems.find((item) => item.id === id)?.expenseId;
      if (expenseId) addExpenseById(expenseId);
    }
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
    setPreparationTask(0);
    setRoomReady([]);
    setHazardsReady([]);
    setMembers(initialMembers);
    setAssignments(initialAssignments);
    setTrunkSelected([]);
    setTrunkChecked(false);
    setTrunkPassed(false);
    setExpenses([]);
    setLatestExpense(null);
    setLifePhase("arrival-intro");
    setJourneyIndex(0);
    setJourneyCompleted([]);
    setLifeActivity(initialLifeActivityState);
    setScenarioAnswers({});
    setProfile(initialProfile);
  }

  function startFreshJourney() {
    resetJourney();
    setStep(1);
    setIntroOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetAll() {
    resetJourney();
    setStep(0);
    setIntroOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPreparation() {
    if (preparationTask === 0) {
      return <RoomPreparation selectedItems={roomReady} securedHazards={hazardsReady} onAddItem={addRoomItem} onRemoveItem={(id) => setRoomReady((current) => current.filter((item) => item !== id))} onToggleHazard={toggleHazard} onBack={() => goTo(1)} onNext={() => setPreparationTask(1)} />;
    }
    if (preparationTask === 1) {
      return <CareMemberSetup members={members} onChange={updateMembers} onBack={() => setPreparationTask(0)} onNext={() => setPreparationTask(2)} />;
    }
    if (preparationTask === 2) {
      return <CareTaskAssignment members={members} assignments={assignments} onChange={setAssignments} onBack={() => setPreparationTask(1)} onNext={() => setPreparationTask(3)} />;
    }
    return <CarTrunkPreparation selected={trunkSelected} checked={trunkChecked} passed={trunkPassed} onToggle={toggleTrunkItem} onCheck={(passed) => { setTrunkChecked(true); setTrunkPassed(passed); }} onBack={() => setPreparationTask(2)} onNext={() => { setStep(3); setIntroOpen(false); setLifePhase("arrival-intro"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />;
  }

  function renderLifeJourney() {
    if (lifePhase === "arrival-intro") {
      return <ArrivalIntro onStart={() => setLifePhase("journey")} />;
    }
    return (
      <LifeJourney
        index={journeyIndex}
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
        onStageChange={(nextStep) => { setStep(nextStep); setIntroOpen(false); }}
        onBack={() => { setStep(2); setIntroOpen(false); setPreparationTask(3); }}
        onComplete={() => { setLifePhase("complete"); goTo(7); }}
      />
    );
  }

  return (
    <main className="app-shell">
      {step === 0 && <Welcome onStart={startFreshJourney} />}

      {step > 0 && !introOpen && (
        <div className="stage-layout">
          <StageRail step={step} onGoTo={goToStation} />
          <section className="stage" aria-live="polite">
            {step >= 2 && step <= 7 && <CostBar expenses={expenses} emergencyReserve={emergencyReserve} latestExpense={latestExpense} />}
            {step === 1 && <SpeciesStep category={category} breed={breed} onCategory={setCategory} onBreed={setBreed} onNext={() => goTo(2)} />}
            {step === 2 && renderPreparation()}
            {step >= 3 && step <= 6 && renderLifeJourney()}
            {step === 7 && <ProfileForm profile={profile} onChange={setProfile} onBack={() => { setStep(6); setIntroOpen(false); }} onNext={() => goTo(8)} />}
            {step === 8 && <AssessmentReport breed={breed} profile={profile} expenses={expenses} emergencyReserve={emergencyReserve} roomReady={roomReady} hazardsReady={hazardsReady} members={members} assignments={assignments} trunkSelected={trunkSelected} trunkPassed={trunkPassed} answers={scenarioAnswers} lifeActivity={lifeActivity} onBack={() => goTo(7)} onReset={resetAll} />}
          </section>
        </div>
      )}

      {step > 0 && introOpen && (
        <section className="intro-screen">
          <div className="intro-orbit" aria-hidden="true"><span>{intros[step - 1].icon}</span></div>
          <p className="eyebrow">{intros[step - 1].eyebrow}</p>
          <h1>{intros[step - 1].title}</h1>
          <p className="intro-body">{intros[step - 1].body}</p>
          <div className="soft-note"><span>✦</span>{intros[step - 1].tip}</div>
          <button className="primary large" onClick={() => setIntroOpen(false)}>進入這一站 <span>→</span></button>
        </section>
      )}
    </main>
  );
}
