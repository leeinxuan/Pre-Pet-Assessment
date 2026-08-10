"use client";

import { useEffect, useState } from "react";
import { breeds, categories, money } from "../../game-data";
import { journeyItems } from "../../life-data";
import type { ExpenseRecord, LifeJourneyPhase } from "../../game-types";

export function StepHeading({ title, body }: { title: string; body: string }) {
  return <div className="step-heading"><h1>{title}</h1><p>{body}</p></div>;
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
  const currentMain = step === 1 ? 0 : step === 2 ? 1 : step <= 6 ? 2 : 3;
  const currentLifeStage = lifePhase === "arrival-video"
    ? 0
    : lifeStageRanges.findIndex((range) => journeyIndex >= range.start && journeyIndex <= range.end);
  const mainTargets = [1, 2, Math.max(3, Math.min(6, step)), 7];
  const mainUnlockSteps = [1, 2, 3, 7];

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
        status: statusAt(index, selectionPage === "species" ? 0 : 1, selectionReached),
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
        status: statusAt(index, preparationTask, preparationReached),
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
    <section className="welcome" aria-label="毛日子新手村封面">
      <div className="welcome-hero-copy">
        <h1>毛日子<br />新手村</h1>
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
          <StepHeading title="你想領養哪一種動物？" body="先選擇物種，再挑一個目前最感興趣的品種。這一版先以犬隻示範完整時間軸。" />
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
          <StepHeading title="選擇你想領養的品種" body="品種會影響後續提醒，但每隻動物仍有自己的個性與需求。" />
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
type CostFlashKey = "total" | "monthly" | "supplies" | "medical";

const expenseLabels = {
  oneTimeSupplies: "\u4e00\u6b21\u6027\u7528\u54c1",
  monthlyBasic: "\u6bcf\u6708\u57fa\u672c\u652f\u51fa",
  medicalHealth: "\u91ab\u7642\u8207\u5065\u5eb7",
  departureSupplies: "\u5916\u51fa\u4ea4\u901a\u8207\u63a5\u56de\u7528\u54c1",
  careService: "\u7167\u9867\u670d\u52d9",
  other: "\u5176\u4ed6",
  detailEyebrow: "\u82b1\u8cbb\u660e\u7d30",
  detailTitle: "\u76ee\u524d\u5df2\u767b\u8a18\u7684\u652f\u51fa",
  closeDetails: "\u95dc\u9589\u660e\u7d30",
  noGroupExpenses: "\u76ee\u524d\u6c92\u6709\u6b64\u985e\u652f\u51fa\u3002",
  currentCostStatus: "\u76ee\u524d\u8cbb\u7528\u72c0\u6cc1",
  totalSpent: "\u672c\u6b21\u5df2\u82b1\u8cbb",
  medicalReserveBalance: "\u91ab\u7642\u61c9\u6025\u91d1\u9918\u984d",
  emergencyReserveHelp: "\u7dca\u6025\u9810\u5099\u91d1\u662f\u5efa\u8b70\u984d\u5ea6\uff0c\u6a21\u64ec\u7a81\u767c\u91ab\u7642\u6216\u7167\u9867\u72c0\u6cc1\u6642\u6703\u6263\u9664\uff0c\u4e0d\u4ee3\u8868\u5df2\u82b1\u8cbb\u3002",
  viewDetails: "\u67e5\u770b\u660e\u7d30",
  monthlySuffix: "\uff0f\u6708",
  medicalCategory: "\u91ab\u7642",
  careCategory: "\u7167\u9867\u670d\u52d9",
  departureKeyword: "\u51fa\u767c",
  arrivalKeyword: "\u63a5\u56de",
  categorySupply: "\u7528\u54c1",
  categoryClean: "\u6e05\u6f54",
  categoryFood: "\u98f2\u98df",
  categorySenior: "\u9ad8\u9f61\u7528\u54c1",
} as const;

const expenseDetailGroupOrder: ExpenseDetailGroup[] = [
  expenseLabels.oneTimeSupplies,
  expenseLabels.monthlyBasic,
  expenseLabels.medicalHealth,
  expenseLabels.departureSupplies,
  expenseLabels.careService,
  expenseLabels.other,
];

function isMedicalExpense(item: ExpenseRecord) {
  return item.category === expenseLabels.medicalCategory || Boolean(item.fromEmergency);
}

function isCareServiceExpense(item: ExpenseRecord) {
  return item.category === expenseLabels.careCategory;
}


function isDepartureExpense(item: ExpenseRecord) {
  return ["carrier", "leash"].includes(item.id) || item.stage.includes(expenseLabels.arrivalKeyword) || item.stage.includes(expenseLabels.departureKeyword);
}

function isOneTimeSupplyExpense(item: ExpenseRecord) {
  return !item.recurring && !isMedicalExpense(item) && !isCareServiceExpense(item);
}

function detailGroupForExpense(item: ExpenseRecord): ExpenseDetailGroup {
  if (item.recurring) return expenseLabels.monthlyBasic;
  if (isMedicalExpense(item)) return expenseLabels.medicalHealth;
  if (isCareServiceExpense(item)) return expenseLabels.careService;
  if (isDepartureExpense(item)) return expenseLabels.departureSupplies;
  if (([expenseLabels.categorySupply, expenseLabels.categoryClean, expenseLabels.categoryFood, expenseLabels.categorySenior] as readonly string[]).includes(item.category)) return expenseLabels.oneTimeSupplies;
  return expenseLabels.other;
}

function flashKeysForExpense(item: ExpenseRecord): CostFlashKey[] {
  if (item.recurring) return ["monthly"];
  if (isMedicalExpense(item)) return ["total", "medical"];
  return ["total", "supplies"];
}

export function ExpenseDetails({ expenses, onClose }: { expenses: ExpenseRecord[]; onClose: () => void }) {
  const grouped = expenseDetailGroupOrder.map((group) => ({
    group,
    items: expenses.filter((item) => detailGroupForExpense(item) === group),
  }));

  return (
    <div className="expense-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="expense-modal" role="dialog" aria-modal="true" aria-labelledby="expense-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="expense-modal-head"><div><p className="eyebrow">{expenseLabels.detailEyebrow}</p><h2 id="expense-title">{expenseLabels.detailTitle}</h2></div><button onClick={onClose} aria-label={expenseLabels.closeDetails}>x</button></div>
        <div className="expense-groups">
          {grouped.map(({ group, items }) => (
            <div key={group}>
              <h3>{group}</h3>
              {items.length ? (
                <ul>{items.map((item) => <li key={item.id}><span><b>{item.name}</b><small>{item.category} · {item.stage}</small></span><strong>NT$ {money.format(item.amount)}{item.recurring ? expenseLabels.monthlySuffix : ""}</strong></li>)}</ul>
              ) : (
                <p>{expenseLabels.noGroupExpenses}</p>
              )}
            </div>
          ))}
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
}: {
  expenses: ExpenseRecord[];
  emergencyReserve: number;
  latestExpense: ExpenseRecord | null;
}) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [flashKeys, setFlashKeys] = useState<CostFlashKey[]>([]);
  const totalSpent = expenses.filter((item) => !item.recurring).reduce((sum, item) => sum + item.amount, 0);
  const recurring = expenses.filter((item) => item.recurring).reduce((sum, item) => sum + item.amount, 0);
  const oneTimeSupplies = expenses.filter(isOneTimeSupplyExpense).reduce((sum, item) => sum + item.amount, 0);
  const emergencyUsed = expenses.filter((item) => item.fromEmergency).reduce((sum, item) => sum + item.amount, 0);

  useEffect(() => {
    if (!latestExpense) return;
    setFlashKeys(flashKeysForExpense(latestExpense));
    const timer = window.setTimeout(() => setFlashKeys([]), 1600);
    return () => window.clearTimeout(timer);
  }, [latestExpense]);

  function costCellClass(key: CostFlashKey) {
    return `cost-cell${flashKeys.includes(key) ? " flash" : ""}`;
  }

  return (
    <>
      <div className="cost-bar" aria-label={expenseLabels.currentCostStatus}>
        <div className={costCellClass("total")}><small>{expenseLabels.totalSpent}</small><b>NT$ {money.format(totalSpent)}</b></div>
        <div className={costCellClass("monthly")}><small>{expenseLabels.monthlyBasic}</small><b>NT$ {money.format(recurring)}</b></div>
        <div className={costCellClass("supplies")}><small>{expenseLabels.oneTimeSupplies}</small><b>NT$ {money.format(oneTimeSupplies)}</b></div>
        <div className={costCellClass("medical")}><small title={expenseLabels.emergencyReserveHelp}>{expenseLabels.medicalReserveBalance}</small><b>NT$ {money.format(Math.max(0, emergencyReserve - emergencyUsed))}</b></div>
        <button onClick={() => setDetailsOpen(true)}>{expenseLabels.viewDetails} <span>+</span></button>
      </div>
      {detailsOpen && <ExpenseDetails expenses={expenses} onClose={() => setDetailsOpen(false)} />}
    </>
  );
}
