"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { initialMembers, initialProfile, intros } from "./data/shared/app-flow";
import { getExpenseForSpecies, getExpenseRulesForSpecies, isTemporaryReserveExpense } from "./data/shared/expenses";
import { initialHomeReadinessState } from "./data/shared/home-readiness-state";
import { getSpeciesConfig } from "./data/species/index";
import { getJourneyItemsForSpecies, getJourneyStepForItem } from "./data/species/journey";
import { initialLifeActivityState } from "./data/shared/life-activity";
import { resetQuestionVideoAutoplay } from "./components/life/activities/scenario-ui";
import {
  clearReplayAnswers,
  enterJourneyItem,
  initialJourneyReplayState,
  restoreReplayAnswers,
  startJourneyReplay,
  type JourneyReplayRequest,
  type JourneyReplayState,
} from "./components/life/journey-replay";
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
  CostBar,
  SpeciesStep,
  StageRail,
  TestSkipButton,
  Welcome,
} from "./components/shared/SharedComponents";
import { FlowLoadErrorBoundary, FlowLoadingFallback } from "./components/shared/AsyncFlowState";
import { isTestModeEntryUrl } from "./components/shared/useTestModeEntry";

const dynamicFlowOptions = { loading: FlowLoadingFallback };

const ArrivalTransitionVideo = dynamic(() => import("./components/life/LifeJourneyComponents").then((module) => module.ArrivalTransitionVideo), dynamicFlowOptions);
const LifeJourney = dynamic(() => import("./components/life/LifeJourneyComponents").then((module) => module.LifeJourney), dynamicFlowOptions);
const HomeReadinessActivity = dynamic(() => import("./components/preparation/PreparationComponents").then((module) => module.HomeReadinessActivity), dynamicFlowOptions);
const RoomPreparation = dynamic(() => import("./components/preparation/PreparationComponents").then((module) => module.RoomPreparation), dynamicFlowOptions);
const CarTrunkPreparation = dynamic(() => import("./components/preparation/PreparationComponents").then((module) => module.CarTrunkPreparation), dynamicFlowOptions);
const AssessmentReport = dynamic(() => import("./components/report/AssessmentReport").then((module) => module.AssessmentReport), dynamicFlowOptions);
const PetAcquisitionPage = dynamic(() => import("./components/acquisition/PetAcquisitionPage").then((module) => module.PetAcquisitionPage), dynamicFlowOptions);

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
  const [mobilePreparationEntry, setMobilePreparationEntry] = useState(0);
  const [preparationReached, setPreparationReached] = useState(0);
  const [preparationReplayTask, setPreparationReplayTask] = useState<number | null>(null);
  // 「可進入」和「已完成後回訪」是兩個不同狀態：側欄解鎖不能讓第一次
  // 進入的關卡被誤判為可再玩。
  const [completedPreparationTasks, setCompletedPreparationTasks] = useState<number[]>([]);
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
  const [mobileJourneyEntry, setMobileJourneyEntry] = useState(0);
  const [journeyCompleted, setJourneyCompleted] = useState<string[]>([]);
  const [journeyReplay, setJourneyReplay] = useState<JourneyReplayState>(initialJourneyReplayState);
  const [lifeActivity, setLifeActivity] = useState<LifeActivityState>(initialLifeActivityState);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, ScenarioAnswer>>({});
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [careCommitted, setCareCommitted] = useState(false);
  const [testSkipSignal, setTestSkipSignal] = useState(0);
  const [testNextSignal, setTestNextSignal] = useState(0);
  const [testNextTargetIndex, setTestNextTargetIndex] = useState<number | null>(null);
  const costToastTimerRef = useRef<number | null>(null);
  const mainContentRef = useRef<HTMLElement>(null);
  const lastFlowFocusKeyRef = useRef<string | null>(null);
  // 費用動畫可能在同一個互動中連續加入多筆資料；以 ref 保持同步去重，
  // 不必等待 React render 才能知道上一張費用卡是否已寫入。
  const expensesRef = useRef<ExpenseRecord[]>([]);
  // 重新作答期間同步封鎖費用與成員寫入；用 ref 讓 await 中的費用序列也讀到最新狀態。
  const journeyReplayRef = useRef<JourneyReplayState>(initialJourneyReplayState);
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
  const flowFocusKey = step === 0
    ? "welcome"
    : introOpen
      ? `intro:${step}`
      : step === 2
        ? `preparation:${preparationTask}`
        : step >= 3 && step <= 6
          ? `life:${lifePhase}:${journeyIndex}`
          : `stage:${step}`;

  useEffect(() => {
    if (flowFocusKey === "welcome" || lastFlowFocusKeyRef.current === flowFocusKey) return;
    lastFlowFocusKeyRef.current = flowFocusKey;

    const main = mainContentRef.current;
    if (!main) return;
    let observer: MutationObserver | null = null;
    let frame = 0;

    const focusNewHeading = () => {
      const heading = main.querySelector<HTMLElement>("h1");
      if (!heading) return false;
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      return true;
    };

    // Dynamic flows may briefly render their loading fallback. Observe only until
    // the destination heading mounts, then move focus once to announce the new step.
    frame = window.requestAnimationFrame(() => {
      if (focusNewHeading()) return;
      observer = new MutationObserver(() => {
        if (focusNewHeading()) observer?.disconnect();
      });
      observer.observe(main, { childList: true, subtree: true });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [flowFocusKey]);
  // 舊存檔或舊網址帶入已移除犬種時，render 直接安全回選擇頁；
  // 不在 effect 中補寫狀態，避免把舊資料帶進 journey 或產生級聯 render。

  function updateJourneyReplay(next: JourneyReplayState) {
    journeyReplayRef.current = next;
    setJourneyReplay(next);
  }

  /** 任何旅程導覽都先結束重新作答並還原快照，再判斷目標題目是否為回訪。 */
  function enterJourneyReplayItem(itemId: string | null | undefined) {
    const session = journeyReplayRef.current.session;
    if (session) {
      setScenarioAnswers((current) => restoreReplayAnswers(current, session));
      setLifeActivity((current) => ({ ...current, ...session.activity }));
    }
    updateJourneyReplay(enterJourneyItem(itemId, journeyCompleted));
  }

  /** 「再玩一次」只重設目前題目，原本答案與活動欄位留存為快照。 */
  function startJourneyItemReplay(request: JourneyReplayRequest) {
    if (journeyReplayRef.current.revisitedItemId !== request.itemId) return;
    updateJourneyReplay(startJourneyReplay(journeyReplayRef.current, request, scenarioAnswers, lifeActivity));
    setScenarioAnswers((current) => clearReplayAnswers(current, request.scenarioIds));
    if (request.activityPatch) setLifeActivity((current) => ({ ...current, ...request.activityPatch }));
  }

  const isReplayingJourney = () => journeyReplayRef.current.session !== null;

  function selectCategory(nextCategory: string) {
    setCategory(nextCategory);
    // 物種可在資料中指定切換時要清除的沿用名字，共用流程不判斷物種。
    const { selection } = getSpeciesConfig(nextCategory);
    const resetNames: readonly string[] = "resetPetNamesOnSelect" in selection ? selection.resetPetNamesOnSelect : [];
    if (resetNames.includes(petName)) setPetName("");
  }

  function selectJourneyIndex(nextIndex: number) {
    if (window.matchMedia("(max-width: 720px)").matches) setMobileJourneyEntry((current) => current + 1);
    setTestNextTargetIndex(null);
    enterJourneyReplayItem(getJourneyItemsForSpecies(category)[nextIndex]?.id);
    setJourneyIndex(nextIndex);
  }

  function goTo(next: number) {
    setStep(next);
    setFurthestStep((current) => Math.max(current, next));
    setIntroOpen(next > 0 && next <= 2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToStation(next: number) {
    if (window.matchMedia("(max-width: 720px)").matches) {
      if (next === 2) setMobilePreparationEntry((current) => current + 1);
      if (next >= 3 && next <= 6) setMobileJourneyEntry((current) => current + 1);
    }
    if (next < 3 || next > 6) setTestNextTargetIndex(null);
    if (next >= 3 && next <= 6 && lifePhase === "complete") setLifePhase("life-journey");
    const activeItem = next >= 3 && next <= 6 ? getJourneyItemsForSpecies(category)[journeyIndex] : undefined;
    enterJourneyReplayItem(activeItem?.id);
    setStep(next);
    setIntroOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToLifeStage(stageIndex: number) {
    if (window.matchMedia("(max-width: 720px)").matches) setMobileJourneyEntry((current) => current + 1);
    const journeyItems = getJourneyItemsForSpecies(category);
    const stageStarts = journeyItems.reduce<number[]>((starts, item, index, all) => {
      if (index === 0 || item.stageId !== all[index - 1].stageId) starts.push(index);
      return starts;
    }, []);
    const journeyStart = stageStarts[stageIndex] ?? 0;
    const targetItem = journeyItems[journeyStart];
    setTestNextTargetIndex(null);
    enterJourneyReplayItem(targetItem?.id);
    if (lifePhase === "arrival-video" && stageIndex === 0) {
      setStep(3);
      setIntroOpen(false);
    } else {
      setLifePhase("life-journey");
      setJourneyIndex(journeyStart);
      setStep(getJourneyStepForItem(journeyItems[journeyStart]));
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
    setTestNextTargetIndex(journeyIndex);
    setTestNextSignal((current) => current + 1);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function showExpenseCard(expense: ExpenseRecord, duration = 1900) {
    if (costToastTimerRef.current !== null) window.clearTimeout(costToastTimerRef.current);
    setLatestExpense(expense);
    costToastTimerRef.current = window.setTimeout(() => {
      setLatestExpense((active) => active?.id === expense.id ? null : active);
      costToastTimerRef.current = null;
    }, duration);
  }

  function appendExpense(expense: ExpenseRecord) {
    if (expensesRef.current.some((item) => item.id === expense.id)) return false;
    const nextExpenses = [...expensesRef.current, expense];
    expensesRef.current = nextExpenses;
    setExpenses(nextExpenses);
    return true;
  }

  function addExpenseById(id: string, triggerMeta?: ExpenseTriggerMeta) {
    if (isReplayingJourney()) return false;
    const expense = getExpenseForSpecies(id, category);
    if (!expense) return false;
    const sizedExpense = { ...expense, ...triggerMeta };
    if (!appendExpense(sizedExpense)) return false;
    showExpenseCard(sizedExpense);
    return true;
  }

  /** 資料指定為預留費用時直接寫入明細，不播放費用卡或金幣動畫。 */
  function addExpenseSilentlyById(id: string, triggerMeta?: ExpenseTriggerMeta) {
    if (isReplayingJourney()) return false;
    const expense = getExpenseForSpecies(id, category);
    if (!expense) return false;
    return appendExpense({ ...expense, ...triggerMeta });
  }

  /** 同一個旅程節點新增一組既有費用，明細仍以原本 expenseId 個別去重。 */
  function addExpenseGroupByIds(ids: readonly string[], triggerMeta?: ExpenseTriggerMeta) {
    if (isReplayingJourney()) return;
    const catalogExpenses = ids
      .map((id) => getExpenseForSpecies(id, category))
      .filter((expense): expense is ExpenseRecord => Boolean(expense))
      .map((expense) => ({ ...expense, ...triggerMeta }));

    if (!catalogExpenses.length) return;

    const additions = catalogExpenses.filter((expense) => appendExpense(expense));
    if (!additions.length) return;
    showExpenseCard({
      id: `arrival-expense-group:${additions.map((item) => item.id).join("+")}`,
      name: "到家後必要支出",
      amount: additions.reduce((sum, item) => sum + item.amount, 0),
      category: "到家後必要支出",
      stage: "寵物到家後",
      recurring: false,
    });
  }

  /**
   * 活動中的費用卡需在動作完成當下出現；多筆費用依企劃合計為一張卡，
   * 呼叫端 await 此函式後，才能顯示答對回饋或切換下一畫面。
   */
  async function playExpenseSequenceByIds(ids: readonly string[], triggerMeta?: ExpenseTriggerMeta) {
    if (isReplayingJourney()) return;
    const uniqueIds = Array.from(new Set(ids));
    const additions = uniqueIds
      .map((id) => getExpenseForSpecies(id, category))
      .filter((expense): expense is ExpenseRecord => Boolean(expense))
      .map((expense) => ({ ...expense, ...triggerMeta }))
      .filter((expense) => !expensesRef.current.some((item) => item.id === expense.id));

    if (!additions.length) return;

    additions.forEach(appendExpense);

    if (additions.length === 1) {
      showExpenseCard(additions[0]);
      await new Promise<void>((resolve) => window.setTimeout(resolve, 2100));
      return;
    }

    const isMedicalReserve = additions.every((expense) => isTemporaryReserveExpense(expense));
    const combinedCard = getExpenseRulesForSpecies(category).combinedExpenseCards
      ?.find((rule) => additions.every((expense) => rule.expenseIds.includes(expense.id)));
    const hasMaximum = additions.some((expense) => typeof expense.maxAmount === "number");

    const totalExpense: ExpenseRecord = isMedicalReserve
      ? {
          id: `activity-expense-total:${additions.map((item) => item.id).join("+")}`,
          name: "醫療備用金（建議預留）",
          amount: additions.reduce((sum, expense) => sum + expense.amount, 0),
          maxAmount: hasMaximum
            ? additions.reduce((sum, expense) => sum + (expense.maxAmount ?? expense.amount), 0)
            : undefined,
          maxAmountOpenEnded: additions.some((expense) => expense.maxAmountOpenEnded),
          category: "臨時／醫療支出",
          stage: additions[0].stage,
          recurring: false,
          fromEmergency: true,
        }
      : {
          id: `activity-expense-total:${additions.map((item) => item.id).join("+")}`,
          name: combinedCard?.name ?? "本次費用加總",
          amount: additions.reduce((sum, expense) => sum + expense.amount, 0),
          category: combinedCard?.category ?? "活動費用",
          stage: additions[0].stage,
          recurring: combinedCard?.recurring ?? false,
        };

    showExpenseCard(totalExpense);
    await new Promise<void>((resolve) => window.setTimeout(resolve, 2100));
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
    // 重新作答只是練習，不能新增或改動照顧成員。
    if (isReplayingJourney()) return;
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
      const discussionFlags = previous?.discussionFlags;
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
    const deferredArrivalExpenseIds = new Set(scenario.stageId === "arrival" && choice.result === "correct"
      ? getExpenseRulesForSpecies(category).deferredArrivalFeedbackExpenseIds ?? []
      : []);
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
    // 多選活動的費用由活動元件在所有正確選項完成的當下依序播放，
    // 不能在這裡直接寫入，否則會跳過費用卡動畫。
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
    setCompletedPreparationTasks([]);
    setHomeReadiness(initialHomeReadinessState);
    setRoomReady([]);
    setHazardsReady([]);
    setMembers(initialMembers);
    setTrunkSelected([]);
    setTrunkPassed(false);
    setExpenses([]);
    expensesRef.current = [];
    setLatestExpense(null);
    if (costToastTimerRef.current !== null) {
      window.clearTimeout(costToastTimerRef.current);
      costToastTimerRef.current = null;
    }
    setLifePhase("arrival-video");
    setPetName("");
    setJourneyIndex(0);
    setJourneyCompleted([]);
    updateJourneyReplay(initialJourneyReplayState);
    setLifeActivity(initialLifeActivityState);
    setScenarioAnswers({});
    setProfile(initialProfile);
    setCareCommitted(false);
    setTestSkipSignal(0);
    setTestNextSignal(0);
    setTestNextTargetIndex(null);
    resetQuestionVideoAutoplay();
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
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    setCategory(nextSelection.category);
    setBreed(nextSelection.breed);
    setSelectionPage("name");
    setSelectionReached((current) => Math.max(current, 2));
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function startFreshJourney() {
    if (isTestModeEntryUrl(window.location.search)) {
      startTestJourney();
      return;
    }
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
      const reviewing = completedPreparationTasks.includes(1) && preparationReached >= 2 && preparationReplayTask !== 1;
      return <RoomPreparation key={`${category}:room:${mobilePreparationEntry}`} selectedItems={roomReady} securedHazards={hazardsReady} petName={petName} breed={breed} species={category} onPrepare={addRoomItem} onToggleHazard={toggleHazard} reviewing={reviewing} onReplay={() => { setRoomReady([]); setHazardsReady([]); setCompletedPreparationTasks((current) => current.filter((task) => task !== 1)); setPreparationReplayTask(1); }} onNext={() => { setCompletedPreparationTasks((current) => current.includes(1) ? current : [...current, 1]); changePreparationTask(2); window.scrollTo({ top: 0, behavior: "auto" }); }} />;
    }
    const reviewing = completedPreparationTasks.includes(2) && furthestStep >= 3 && preparationReplayTask !== 2;
    return <CarTrunkPreparation key={`${category}:departure:${mobilePreparationEntry}`} selected={trunkSelected} petName={petName} breed={breed} species={category} onSelect={selectTrunkItem} reviewing={reviewing} onReplay={() => { setTrunkSelected([]); setTrunkPassed(false); setCompletedPreparationTasks((current) => current.filter((task) => task !== 2)); setPreparationReplayTask(2); }} onNext={() => { setCompletedPreparationTasks((current) => current.includes(2) ? current : [...current, 2]); setPreparationReached((current) => Math.max(current, 2)); setStep(3); setFurthestStep((current) => Math.max(current, 3)); setIntroOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} />;
  }

  function renderLifeJourney() {
    if (lifePhase === "arrival-video") {
      return <ArrivalTransitionVideo species={category} onContinue={() => { setJourneyIndex(0); setLifePhase("life-journey"); }} />;
    }
    return (
      <LifeJourney
        key={`${category}:${journeyIndex}:${mobileJourneyEntry}`}
        index={journeyIndex}
        petName={petName}
        breed={breed}
        species={category}
        answers={scenarioAnswers}
        activity={lifeActivity}
        replayState={journeyReplay}
        expenses={expenses}
        backupNames={backupNames}
        members={members}
        roomReady={roomReady}
        testSkipSignal={testSkipSignal}
        testNextSignal={testNextTargetIndex === journeyIndex ? testNextSignal : 0}
        onIndex={selectJourneyIndex}
        onChoose={answerScenario}
        onMarkScenarioForReview={markScenarioForReview}
        onChooseMultiple={answerScenarioMultiple}
        onStartReplay={startJourneyItemReplay}
        onMembersChange={updateMembers}
        onActivityChange={(patch) => setLifeActivity((current) => ({ ...current, ...patch }))}
        onCompleteItem={(id) => setJourneyCompleted((current) => current.includes(id) ? current : [...current, id])}
        onAddExpense={addExpenseById}
        onAddExpenseSilently={addExpenseSilentlyById}
        onAddExpenseGroup={addExpenseGroupByIds}
        onPlayExpenseSequence={playExpenseSequenceByIds}
        onStageChange={(nextStep) => { setStep(nextStep); setFurthestStep((current) => Math.max(current, nextStep)); setIntroOpen(false); }}
        onBack={() => { setStep(2); setPreparationTask(2); setIntroOpen(false); }}
        onComplete={() => {
          setTestNextTargetIndex(null);
          setLifePhase("complete");
          enterJourneyReplayItem(null);
          setStep(7);
          setFurthestStep((current) => Math.max(current, 7));
          setIntroOpen(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  const flowAnnouncement = step === 0
    ? "歡迎頁"
    : introOpen
      ? `準備開始：${intros[step - 1]?.title ?? "下一個階段"}`
      : step === 1
        ? `目前步驟：${({ species: "選擇物種", breed: "選擇品種", name: "替牠取名", history: "過往經驗", transition: "新的開始" } as const)[selectionPage]}`
        : step === 2
          ? `目前步驟：${["家庭與居住確認", "布置生活空間", "出發前準備"][preparationTask] ?? "飼養前準備"}`
          : step >= 3 && step <= 6
            ? `目前步驟：飼養生活，第 ${journeyIndex + 1} 個情境`
            : step === 7
              ? "目前步驟：飼養觀念回顧"
              : "目前步驟：取得寵物";

  return (
    <main ref={mainContentRef} id="main-content" className="app-shell" tabIndex={-1}>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{flowAnnouncement}</p>
      {step === 0 && <Welcome onStart={startFreshJourney} />}

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
          <section className="stage">
            {step >= 2 && step <= 8 && <CostBar expenses={expenses} latestExpense={latestExpense} breed={breed} species={category} />}
            {step === 1 && <SpeciesStep selectionPage={selectionPage} onSelectionPage={changeSelectionPage} category={category} breed={breed} petName={petName} onCategory={selectCategory} onBreed={(id) => { setBreed(id); if (id) setSelectionReached((current) => Math.max(current, 1)); }} onSelectSpecies={selectSpeciesForJourney} onPetName={setPetName} hasPreviousPet={hasPreviousPet} oldPetName={oldPetName} onHasPreviousPet={(value) => { setHasPreviousPet(value); if (!value) setOldPetName(""); }} onOldPetName={setOldPetName} onNext={confirmSelectedJourney} />}
            <FlowLoadErrorBoundary resetKey={`${step}:${preparationTask}:${lifePhase}:${journeyIndex}`}>
              {step === 2 && renderPreparation()}
              {step >= 3 && step <= 6 && renderLifeJourney()}
              {step === 7 && <>
                <AssessmentReport petName={petName} breed={breed} species={category} profile={profile} expenses={expenses} roomReady={roomReady} hazardsReady={hazardsReady} members={members} trunkSelected={trunkSelected} trunkPassed={trunkPassed} answers={scenarioAnswers} lifeActivity={lifeActivity} homeReadiness={homeReadiness} committed={careCommitted} onCommittedChange={setCareCommitted} onBack={() => { setTestNextTargetIndex(null); setLifePhase("life-journey"); setStep(6); setIntroOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} onReset={resetAll} />
                <div className="report-next-step-actions">
                  <p>準備好進一步了解合法、透明的取得方式了嗎？</p>
                  <button className="primary" type="button" onClick={() => { setStep(8); setFurthestStep((current) => Math.max(current, 8)); window.scrollTo({ top: 0, behavior: "auto" }); }}>取得寵物 <span>→</span></button>
                </div>
              </>}
              {step === 8 && <PetAcquisitionPage profile={profile} petName={petName} breed={breed} species={category} onProfileChange={setProfile} onBack={() => { setStep(7); setIntroOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} onReset={resetAll} />}
            </FlowLoadErrorBoundary>
          </section>
        </div>
      )}

      {testMode && !introOpen && (step === 2 || (step >= 3 && step <= 6)) && <TestSkipButton onSkip={skipCurrentJourneyItemForTest} />}

      {step > 0 && introOpen && (
        <section className="intro-screen">
          <div className="intro-orbit" aria-hidden="true"><IntroIcon step={step} /></div>
          <h1 className={step === 1 || step === 2 ? "intro-screen-title--light" : undefined}>{intros[step - 1].title}</h1>
          <p className="intro-body">{intros[step - 1].body}</p>
          <button type="button" className="primary large" onClick={() => setIntroOpen(false)}>開始 <span>→</span></button>
        </section>
      )}
    </main>
  );
}
