"use client";

import { useState } from "react";
import { breeds, categories, money, stations } from "./game-data";
import { journeyItems } from "./life-data";
import type { ExpenseRecord, LifeJourneyPhase } from "./game-types";

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
  { label: "接回家", start: 0, end: 1 },
  { label: "日常生活", start: 2, end: 5 },
  { label: "健康與意外", start: 6, end: 6 },
  { label: "生活變化", start: 7, end: 10 },
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
  profilePage,
  profileReached,
  onGoTo,
  onSelectionPage,
  onPreparationTask,
  onLifeStage,
  onProfilePage,
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
  profilePage: number;
  profileReached: number;
  onGoTo: (step: number) => void;
  onSelectionPage: (page: "species" | "breed") => void;
  onPreparationTask: (task: number) => void;
  onLifeStage: (stage: number) => void;
  onProfilePage: (page: number) => void;
}) {
  const currentMain = step === 1 ? 0 : step === 2 ? 1 : step <= 6 ? 2 : step === 7 ? 3 : 4;
  const currentLifeStage = lifePhase === "arrival-intro" ? 0 : lifeStageRanges.findIndex((range) => journeyIndex >= range.start && journeyIndex <= range.end);
  const mainTargets = [1, 2, Math.max(3, Math.min(6, step)), 7, 8];
  const mainUnlockSteps = [1, 2, 3, 7, 8];
  const profileTitles = ["時間與身分", "居住與同住者", "經驗與動機", "預算與支援"];

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
      children: ["布置生活空間", "建立照顧成員", "整理汽車後車廂"].map((label, index) => ({
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
      id: "profile",
      number: "04",
      label: "認識你",
      status: mainStatus(3),
      onClick: () => onGoTo(7),
      children: profileTitles.map((label, index) => ({
        id: `profile-${index}`,
        label,
        status: statusAt(index, profilePage, profileReached),
        onClick: () => onProfilePage(index),
      })),
    },
    {
      id: "report",
      number: "05",
      label: "評估報告",
      status: mainStatus(4),
      onClick: () => onGoTo(8),
    },
  ];

  function renderNavigation() {
    return (
      <nav className="station-navigation">
        {navigation.map((item, index) => (
          <div className={`nav-main ${item.status}`} key={item.id}>
            <button className="nav-main-button" onClick={item.onClick} disabled={item.status === "locked"} aria-current={item.status === "current" ? "step" : undefined}>
              <span>{item.status === "completed" ? "✓" : item.number}</span><em>{item.label}</em>
            </button>
            {index === currentMain && item.children && (
              <div className="nav-children">
                {item.children.map((child, childIndex) => (
                  <div className={`nav-child ${child.status}`} key={child.id}>
                    <button onClick={child.onClick} disabled={child.status === "locked"} aria-current={child.status === "current" ? "step" : undefined}>
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
    <section className="welcome">
      <nav className="welcome-nav">
        <div className="brand static"><span className="brand-mark">慢</span><span>慢慢來，先想想</span></div>
        <span className="prototype-tag">一段真正開始生活的領養預演</span>
      </nav>
      <div className="welcome-grid">
        <div className="hero-copy">
          <p className="eyebrow">給準飼主的一段慢速旅程</p>
          <h1>在把牠帶回家以前，<br /><span>先一起生活一次。</span></h1>
          <p className="hero-lead">從準備空間、分配照顧，到接回家、建立日常、面對生病與生活變化。這不是適不適合的測驗，而是一段約 15–20 分鐘的生活時間軸。</p>
          <div className="hero-actions">
            <button className="primary large" onClick={onStart}>開始領養生活預演 <span>→</span></button>
            <span className="time-pill">◷ 約 15–20 分鐘</span>
          </div>
          <div className="trust-line"><span>不評分</span><span>不貼標籤</span><span>可返回調整</span></div>
        </div>
        <div className="hero-scene" aria-label="準飼主與柴犬在家中安靜相處的插畫">
          <img src="/illustrations/hero-life-preview.png" alt="準飼主與柴犬在溫暖的居家空間互相觀察" />
          <div className="thought">準備，不必一次到位<br /><b>但可以先想清楚。</b></div>
        </div>
      </div>
      <div className="journey-map journey-map-eight">
        {stations.map(([number, shortLabel], index) => <div key={number}><span>{number}</span><p>{shortLabel}</p>{index < stations.length - 1 && <i>··</i>}</div>)}
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
                <span>{item.icon}</span><b>{item.label}</b>
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
                <span>{item.icon}</span><b>{item.label}</b>{breed === item.id && <i>✓</i>}
              </button>
            ))}
          </div>
          <div className={`selection-note breed-description ${selectedBreed ? "selected" : "empty"}`} role="status" aria-live="polite" aria-atomic="true">
            <span aria-hidden="true">{selectedBreed?.icon ?? "🐾"}</span>
            <div><b>{selectedBreed ? `你選擇了：${selectedBreed.label}` : "品種飼養特性"}</b><p>{selectedBreed?.shortDescription ?? "點選一個品種，查看牠的飼養特性。"}</p></div>
          </div>
          <NavButtons onBack={() => onSelectionPage("species")} onNext={onNext} disabled={!breed} nextLabel="開始領養前準備" />
        </section>
      )}
    </div>
  );
}

export function ExpenseDetails({ expenses, onClose }: { expenses: ExpenseRecord[]; onClose: () => void }) {
  const oneTime = expenses.filter((item) => !item.recurring);
  const recurring = expenses.filter((item) => item.recurring);
  return (
    <div className="expense-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="expense-modal" role="dialog" aria-modal="true" aria-labelledby="expense-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="expense-modal-head"><div><p className="eyebrow">費用明細</p><h2 id="expense-title">一路上的實際支出</h2></div><button onClick={onClose} aria-label="關閉費用明細">×</button></div>
        <div className="expense-groups">
          <div><h3>一次性支出</h3>{oneTime.length ? <ul>{oneTime.map((item) => <li key={item.id}><span><b>{item.name}</b><small>{item.category} · {item.stage}</small></span><strong>NT$ {money.format(item.amount)}</strong></li>)}</ul> : <p>目前還沒有一次性支出。</p>}</div>
          <div><h3>每月固定支出</h3>{recurring.length ? <ul>{recurring.map((item) => <li key={item.id}><span><b>{item.name}</b><small>{item.category} · {item.stage}</small></span><strong>NT$ {money.format(item.amount)}／月</strong></li>)}</ul> : <p>目前還沒有每月固定支出。</p>}</div>
        </div>
        <button className="primary" onClick={onClose}>看完明細</button>
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
  const currentMonth = expenses.reduce((sum, item) => sum + item.amount, 0);
  const recurring = expenses.filter((item) => item.recurring).reduce((sum, item) => sum + item.amount, 0);
  const emergencyUsed = expenses.filter((item) => item.fromEmergency).reduce((sum, item) => sum + item.amount, 0);
  return (
    <>
      <div className="cost-bar" aria-label="目前費用狀況">
        <div><small>本月花費</small><b>NT$ {money.format(currentMonth)}</b></div>
        <div><small>累積花費</small><b>NT$ {money.format(currentMonth)}</b></div>
        <div><small>每月固定支出</small><b>NT$ {money.format(recurring)}</b></div>
        <div><small>緊急預備金</small><b>NT$ {money.format(Math.max(0, emergencyReserve - emergencyUsed))}</b></div>
        <button onClick={() => setDetailsOpen(true)}>查看明細 <span>＋</span></button>
        {latestExpense && <div className="expense-toast" role="status" aria-live="polite">{latestExpense.name} ＋NT$ {money.format(latestExpense.amount)}</div>}
      </div>
      {detailsOpen && <ExpenseDetails expenses={expenses} onClose={() => setDetailsOpen(false)} />}
    </>
  );
}
