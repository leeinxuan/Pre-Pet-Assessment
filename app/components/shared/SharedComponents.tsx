"use client";

import { useEffect, useRef, useState } from "react";
import { applySizeBasedExpenseAmount, breeds, categories, expenseCatalog, getPetSizeForBreed, money } from "../../game-data";
import { journeyItems } from "../../life-data";
import type { ExpenseRecord, LifeJourneyPhase } from "../../game-types";

export function StepHeading({ title, body }: { title: string; body?: string }) {
  return <div className="step-heading"><h1>{title}</h1>{body && <p>{body}</p>}</div>;
}

export function NavButtons({
  onBack,
  onNext,
  nextLabel = "繼續下一站",
  disabled = false,
}: {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  disabled?: boolean;
}) {
  return (
    <div className="nav-buttons">
      <button className="secondary" onClick={onBack}>← 返回</button>
      <button className="primary" onClick={onNext} disabled={disabled}>{nextLabel} <span>→</span></button>
    </div>
  );
}

type NavigationStatus = "completed" | "current" | "locked";

type NavigationChild = {
  id: string;
  label: string;
  status: NavigationStatus;
  onClick: () => void;
};

type MainNavigation = {
  id: string;
  number: string;
  label: string;
  status: NavigationStatus;
  onClick: () => void;
  children?: NavigationChild[];
};

const lifeStageRanges = [
  { label: "接回家", start: 0, end: 0 },
  { label: "日常生活", start: 1, end: 2 },
  { label: "生活變化", start: 3, end: 4 },
] as const;

function statusAt(index: number, current: number, reached: number): NavigationStatus {
  if (index === current) return "current";
  if (index <= reached) return "completed";
  return "locked";
}

export function StageRail({
  step,
  furthestStep,
  selectionPage,
  selectionReached,
  preparationTask,
  preparationReached,
  lifePhase,
  journeyIndex,
  journeyCompleted,
  onGoTo,
  onSelectionPage,
  onPreparationTask,
  onLifeStage,
}: {
  step: number;
  furthestStep: number;
  selectionPage: "species" | "breed";
  selectionReached: number;
  preparationTask: number;
  preparationReached: number;
  lifePhase: LifeJourneyPhase;
  journeyIndex: number;
  journeyCompleted: string[];
  onGoTo: (step: number) => void;
  onSelectionPage: (page: "species" | "breed") => void;
  onPreparationTask: (task: number) => void;
  onLifeStage: (stage: number) => void;
}) {
  const currentMain = step === 1 ? 0 : step === 2 ? 1 : step <= 6 ? 2 : step === 7 ? 3 : 4;
  const currentLifeStage = lifePhase === "arrival-video"
    ? 0
    : lifeStageRanges.findIndex((range) => journeyIndex >= range.start && journeyIndex <= range.end);
  const mainTargets = [1, 2, Math.max(3, Math.min(6, step)), 7, 8];
  const mainUnlockSteps = [1, 2, 3, 7, 8];

  const mainStatus = (index: number): NavigationStatus => {
    if (index === currentMain) return "current";
    if (mainUnlockSteps[index] <= furthestStep) return "completed";
    return "locked";
  };

  const navigation: MainNavigation[] = [
    {
      id: "pet-selection",
      number: "01",
      label: "選擇寵物",
      status: mainStatus(0),
      onClick: () => onGoTo(1),
      children: ["選擇物種", "選擇品種"].map((label, index) => ({
        id: index === 0 ? "species" : "breed",
        label,
        status: step > 1 && index <= selectionReached ? "completed" : statusAt(index, selectionPage === "species" ? 0 : 1, selectionReached),
        onClick: () => onSelectionPage(index === 0 ? "species" : "breed"),
      })),
    },
    {
      id: "preparation",
      number: "02",
      label: "領養前準備",
      status: mainStatus(1),
      onClick: () => onGoTo(2),
      children: ["布置生活空間", "出發前準備"].map((label, index) => ({
        id: `preparation-${index}`,
        label,
        status: step > 2 && index <= preparationReached ? "completed" : statusAt(index, preparationTask, preparationReached),
        onClick: () => onPreparationTask(index),
      })),
    },
    {
      id: "life-journey",
      number: "03",
      label: "飼養生活",
      status: mainStatus(2),
      onClick: () => onGoTo(mainTargets[2]),
      children: lifeStageRanges.map((range, index) => {
        const completed = lifePhase === "complete" || journeyItems.slice(range.start, range.end + 1).every((item) => journeyCompleted.includes(item.id));
        const status: NavigationStatus = index === currentLifeStage ? "current" : completed ? "completed" : "locked";
        return {
          id: `life-${index}`,
          label: range.label,
          status,
          onClick: () => onLifeStage(index),
        };
      }),
    },
    {
      id: "assessment",
      number: "04",
      label: "照顧準備總覽",
      status: mainStatus(3),
      onClick: () => onGoTo(7),
    },
    {
      id: "legal-acquisition",
      number: "05",
      label: "取得寵物",
      status: mainStatus(4),
      onClick: () => onGoTo(8),
    },
  ];

  function renderNavigation() {
    return (
      <nav className="station-navigation">
        {navigation.map((item, index) => (
          <div className={`nav-main ${item.status}`} key={item.id}>
            <button className="nav-main-button" onClick={item.onClick} aria-current={item.status === "current" ? "step" : undefined}>
              <span>{item.status === "completed" ? "✓" : item.number}</span><em>{item.label}</em>
            </button>
            {item.children && (
              <div className="nav-children">
                {item.children.map((child, childIndex) => (
                  <div className={`nav-child ${child.status}`} key={child.id}>
                    <button onClick={child.onClick} aria-current={child.status === "current" ? "step" : undefined}>
                      <span>{child.status === "completed" ? "✓" : childIndex + 1}</span><em>{child.label}</em>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    );
  }

  return (
    <>
      <aside className="station-rail" aria-label="體驗進度">{renderNavigation()}</aside>
      <details className="mobile-progress-nav">
        <summary><span>目前進度</span><b>{navigation[currentMain].number} {navigation[currentMain].label}</b></summary>
        <div aria-label="體驗進度">{renderNavigation()}</div>
      </details>
    </>
  );
}

export function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <section className="welcome" aria-label="伴日子新手村封面">
      <div className="welcome-hero-copy">
        <h1>伴日子<br />新手村</h1>
        <p className="welcome-subtitle">在真正飼養前，先走過一次與毛小孩的完整旅程</p>
        <button className="primary large welcome-start" onClick={onStart}>開始生活練習 <span>→</span></button>
      </div>
      <div className="welcome-village" aria-hidden="true">
        <span className="welcome-cloud welcome-cloud--left" />
        <span className="welcome-cloud welcome-cloud--center" />
        <span className="welcome-cloud welcome-cloud--right" />
        <div className="welcome-houses">
          <span className="welcome-house welcome-house--a" />
          <span className="welcome-house welcome-house--b" />
          <span className="welcome-house welcome-house--c" />
          <span className="welcome-house welcome-house--d" />
          <span className="welcome-house welcome-house--e" />
        </div>
      </div>
    </section>
  );
}

export function SpeciesStep({
  selectionPage,
  onSelectionPage,
  category,
  breed,
  onCategory,
  onBreed,
  onNext,
}: {
  selectionPage: "species" | "breed";
  onSelectionPage: (page: "species" | "breed") => void;
  category: string;
  breed: string;
  onCategory: (value: string) => void;
  onBreed: (value: string) => void;
  onNext: () => void;
}) {
  const selectedBreed = breeds.find((item) => item.id === breed);

  function chooseCategory(id: string) {
    onCategory(id);
    onBreed("");
    onSelectionPage("breed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="content-wrap partner-picker">
      {selectionPage === "species" ? (
        <section className="partner-selection-page" key="species">
          <StepHeading title="你想領養哪一種動物？" />
          <div className="category-grid species-page-grid">
            {categories.map((item) => (
              <button
                key={item.id}
                className={category === item.id ? "selected" : ""}
                onClick={() => item.active && chooseCategory(item.id)}
                disabled={!item.active}
                aria-label={item.active ? `選擇${item.label}` : `${item.label}，陸續開放`}
              >
                {item.image ? <img className="partner-card-image" src={item.image} alt="" /> : <span>{item.icon}</span>}<b>{item.label}</b>
                <small>{item.active ? "點擊選擇" : "陸續開放"}</small>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="partner-selection-page" key="breed">
          <StepHeading title="選擇你想領養的品種" />
          <div className="breed-row breed-page-grid">
            {breeds.map((item) => (
              <button key={item.id} className={breed === item.id ? "selected" : ""} onClick={() => onBreed(item.id)} aria-pressed={breed === item.id}>
                {item.image ? <img className="partner-card-image" src={item.image} alt="" /> : <span>{item.icon}</span>}<b>{item.label}</b>{breed === item.id && <i>✓</i>}
              </button>
            ))}
          </div>
          <div className={`selection-note breed-description ${selectedBreed ? "selected" : "empty"}`} role="status" aria-live="polite" aria-atomic="true">
            {selectedBreed?.image ? <img className="selection-note-image" src={selectedBreed.image} alt="" /> : <span aria-hidden="true">{selectedBreed?.icon ?? "🐾"}</span>}
            <div><b>{selectedBreed ? `你選擇了：${selectedBreed.label}` : "品種飼養特性"}</b><p>{selectedBreed?.shortDescription ?? "點選一個品種，查看牠的飼養特性。"}</p></div>
          </div>
          <NavButtons onBack={() => onSelectionPage("species")} onNext={onNext} disabled={!breed} nextLabel="開始領養前準備" />
        </section>
      )}
    </div>
  );
}

type ExpenseDetailGroup = string;
const expenseLabels = {
  requiredAfterArrival: "\u5230\u5bb6\u5f8c\u5fc5\u8981\u652f\u51fa",
  oneTimePrep: "\u4e00\u6b21\u6027\u6e96\u5099\u8cbb",
  monthlyBasic: "\u6bcf\u6708\u57fa\u672c\u652f\u51fa",
  temporaryMedical: "\u81e8\u6642\uff0f\u91ab\u7642\u652f\u51fa",
  suggestedReserve: "\u5efa\u8b70\u9810\u7559",
  emergencyReserveTitle: "\u5efa\u8b70\u9810\u7559\u91ab\u7642\u61c9\u6025\u91d1",
  detailEyebrow: "\u82b1\u8cbb\u660e\u7d30",
  detailTitle: "\u76ee\u524d\u5df2\u767b\u8a18\u7684\u652f\u51fa",
  closeDetails: "\u95dc\u9589\u660e\u7d30",
  noGroupExpenses: "\u76ee\u524d\u5c1a\u672a\u767b\u8a18\u6b64\u985e\u652f\u51fa\u3002",
  currentCostStatus: "\u76ee\u524d\u8cbb\u7528\u72c0\u6cc1",
  accumulatedTotal: "\u7d2f\u7a4d\u652f\u51fa",
  accumulatedHelp: "\u542b\u76ee\u524d\u6d41\u7a0b\u5df2\u767b\u8a18\u7684\u4e00\u6b21\u6027\u3001\u7576\u6708\u652f\u51fa\u8207\u5230\u5bb6\u5f8c\u5fc5\u8981\u652f\u51fa",
  viewDetails: "\u67e5\u770b\u660e\u7d30",
  monthlySuffix: "\uff0f\u6708",
  monthlyType: "\u6bcf\u6708\u652f\u51fa",
  oneTimeType: "\u4e00\u6b21\u6027\u652f\u51fa",
  addedPrefix: "\u65b0\u589e\uff1a",
} as const;

const requiredAfterArrivalExpenseIds = new Set(["microchip-registration", "rabies-vaccine", "basic-vaccine-checkup"]);
const defaultVisibleExpenseIds = ["microchip-registration", "rabies-vaccine", "basic-vaccine-checkup", "monthly-preventive-medicine"];
const defaultVisibleExpenses = defaultVisibleExpenseIds
  .map((id) => expenseCatalog[id])
  .filter((item): item is ExpenseRecord => Boolean(item));
const oneTimePreparationExpenseIds = new Set(["food-bowl", "water-bowl", "bed", "carrier", "leash", "toy", "toilet", "cleaner", "starter-food"]);
const temporaryMedicalExpenseIds = new Set(["sick-vet-care", "senior-checkup", "journey-care-service", "senior-slipmat", "senior-access-bed"]);

const expenseDetailGroupOrder: ExpenseDetailGroup[] = [
  expenseLabels.requiredAfterArrival,
  expenseLabels.oneTimePrep,
  expenseLabels.monthlyBasic,
  expenseLabels.temporaryMedical,
];

export function isRequiredAfterArrivalExpense(item: ExpenseRecord) {
  return requiredAfterArrivalExpenseIds.has(item.id);
}

export function isMonthlyExpense(item: ExpenseRecord) {
  return item.recurring;
}

export function isTemporaryOrMedicalExpense(item: ExpenseRecord) {
  return temporaryMedicalExpenseIds.has(item.id) || item.category === "\u91ab\u7642" || item.category === "\u7167\u9867\u670d\u52d9" || item.category === "\u9ad8\u9f61\u7528\u54c1" || Boolean(item.fromEmergency);
}

export function isOneTimePreparationExpense(item: ExpenseRecord) {
  return !isMonthlyExpense(item) && !isRequiredAfterArrivalExpense(item) && !isTemporaryOrMedicalExpense(item);
}

export function mergeDefaultVisibleExpenses(expenses: ExpenseRecord[], breed: string) {
  const petSize = getPetSizeForBreed(breed);
  const existingIds = new Set(expenses.map((item) => item.id));
  return [
    ...expenses,
    ...defaultVisibleExpenses
      .filter((item) => !existingIds.has(item.id))
      .map((item) => applySizeBasedExpenseAmount(item, petSize)),
  ];
}

function detailGroupForExpense(item: ExpenseRecord): ExpenseDetailGroup {
  if (isRequiredAfterArrivalExpense(item)) return expenseLabels.requiredAfterArrival;
  if (isMonthlyExpense(item)) return expenseLabels.monthlyBasic;
  if (isTemporaryOrMedicalExpense(item)) return expenseLabels.temporaryMedical;
  if (isOneTimePreparationExpense(item)) return expenseLabels.oneTimePrep;
  return expenseLabels.temporaryMedical;
}

function expenseTypeLabel(item: ExpenseRecord) {
  if (isMonthlyExpense(item)) return expenseLabels.monthlyType;
  return expenseLabels.oneTimeType;
}

export function ExpenseDetails({ expenses, emergencyReserve, breed, onClose }: { expenses: ExpenseRecord[]; emergencyReserve: number; breed: string; onClose: () => void }) {
  const visibleExpenses = mergeDefaultVisibleExpenses(expenses, breed);
  const preparationTotal = visibleExpenses.filter(isOneTimePreparationExpense).reduce((sum, item) => sum + item.amount, 0);
  const monthlyTotal = visibleExpenses.filter(isMonthlyExpense).reduce((sum, item) => sum + item.amount, 0);
  const temporaryMedicalTotal = visibleExpenses.filter(isTemporaryOrMedicalExpense).reduce((sum, item) => sum + item.amount, 0);
  const accumulatedTotal = visibleExpenses.reduce((sum, item) => sum + item.amount, 0);
  const grouped = expenseDetailGroupOrder.map((group) => ({
    group,
    items: visibleExpenses.filter((item) => detailGroupForExpense(item) === group),
  }));

  return (
    <div className="expense-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="expense-modal" role="dialog" aria-modal="true" aria-labelledby="expense-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="expense-modal-head"><div><p className="eyebrow">{expenseLabels.detailEyebrow}</p><h2 id="expense-title">{expenseLabels.detailTitle}</h2></div><button onClick={onClose} aria-label={expenseLabels.closeDetails}>x</button></div>
        <div className="expense-modal-summary" aria-label="費用摘要">
          <div><small>{expenseLabels.oneTimePrep}</small><b>NT$ {money.format(preparationTotal)}</b></div>
          <div><small>{expenseLabels.monthlyBasic}</small><b>NT$ {money.format(monthlyTotal)}</b></div>
          <div><small>{expenseLabels.temporaryMedical}</small><b>NT$ {money.format(temporaryMedicalTotal)}</b></div>
          <div><small title={expenseLabels.accumulatedHelp}>{expenseLabels.accumulatedTotal}</small><b>NT$ {money.format(accumulatedTotal)}</b></div>
        </div>
        <div className="expense-groups">
          {grouped.map(({ group, items }) => (
            <div key={group}>
              <h3>{group}</h3>
              {items.length ? (
                <ul>{items.map((item) => <li key={item.id}><span><b>{item.name}</b><small>{item.stage} / {expenseTypeLabel(item)}</small></span><strong>NT$ {money.format(item.amount)}{isMonthlyExpense(item) ? expenseLabels.monthlySuffix : ""}</strong></li>)}</ul>
              ) : (
                <p>{expenseLabels.noGroupExpenses}</p>
              )}
            </div>
          ))}
          <div className="expense-reserve-note">
            <h3>{expenseLabels.suggestedReserve}</h3>
            <b>{expenseLabels.emergencyReserveTitle}: NT$ {money.format(emergencyReserve)}</b>
          </div>
        </div>
        <button className="primary" onClick={onClose}>{expenseLabels.closeDetails}</button>
      </section>
    </div>
  );
}

export function CostBar({
  expenses,
  emergencyReserve,
  latestExpense,
  breed,
}: {
  expenses: ExpenseRecord[];
  emergencyReserve: number;
  latestExpense: ExpenseRecord | null;
  breed: string;
}) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [flashExpense, setFlashExpense] = useState<ExpenseRecord | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!latestExpense) return;
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setFlashExpense(latestExpense);
    toastTimerRef.current = window.setTimeout(() => {
      setFlashExpense(null);
      toastTimerRef.current = null;
    }, 2400);
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
    };
  }, [latestExpense]);

  return (
    <>
      <div className="cost-bar cost-bar-compact" aria-label={expenseLabels.currentCostStatus}>
        {flashExpense && (
          <p className="cost-toast" role="status">
            新增「{flashExpense.name}」NT$ {money.format(flashExpense.amount)}{isMonthlyExpense(flashExpense) ? expenseLabels.monthlySuffix : ""}
          </p>
        )}
        <button type="button" className="bill-trigger" onClick={() => setDetailsOpen(true)} aria-label={expenseLabels.viewDetails} title={expenseLabels.viewDetails}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 3h10a2 2 0 0 1 2 2v16l-3-1.7-2 1.2-2-1.2-2 1.2-2-1.2L5 21V5a2 2 0 0 1 2-2Z" />
            <path d="M8 8h8M8 12h8M8 16h5" />
          </svg>
          <em>{expenseLabels.viewDetails}</em>
        </button>
      </div>
      {detailsOpen && <ExpenseDetails expenses={expenses} emergencyReserve={emergencyReserve} breed={breed} onClose={() => setDetailsOpen(false)} />}
    </>
  );
}
