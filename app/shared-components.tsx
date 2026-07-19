"use client";

import { useState } from "react";
import { breeds, categories, money, stations } from "./game-data";
import type { ExpenseRecord } from "./game-types";

export function StepHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <div className="step-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{body}</p></div>;
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

export function StageRail({ step, onGoTo }: { step: number; onGoTo: (step: number) => void }) {
  return (
    <aside className="station-rail" aria-label="體驗進度">
      {stations.map(([number, shortLabel, longLabel], index) => (
        <button
          key={number}
          className={`${step === index + 1 ? "active" : ""} ${step > index + 1 ? "done" : ""}`}
          onClick={() => index + 1 <= step && onGoTo(index + 1)}
          disabled={index + 1 > step}
          aria-label={`${number} ${longLabel}`}
        >
          <span>{step > index + 1 ? "✓" : number}</span>
          <em>{shortLabel}</em>
        </button>
      ))}
    </aside>
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
  category,
  breed,
  onCategory,
  onBreed,
  onNext,
}: {
  category: string;
  breed: string;
  onCategory: (value: string) => void;
  onBreed: (value: string) => void;
  onNext: () => void;
}) {
  const [selectionPage, setSelectionPage] = useState<"species" | "breed">(category ? "breed" : "species");
  const selectedCategory = categories.find((item) => item.id === category);
  const selectedBreed = breeds.find((item) => item.id === breed);

  function chooseCategory(id: string) {
    onCategory(id);
    onBreed("");
    setSelectionPage("breed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="content-wrap partner-picker">
      <div className="partner-progress" aria-label={`選擇寵物第 ${selectionPage === "species" ? 1 : 2} 步，共 2 步`}>
        <span className="active"><i>1</i>選擇物種</span>
        <b aria-hidden="true" />
        <span className={selectionPage === "breed" ? "active" : ""}><i>2</i>選擇品種</span>
      </div>
      {selectionPage === "species" ? (
        <section className="partner-selection-page" key="species">
          <StepHeading eyebrow="01 · 遇見想領養的牠" title="你想領養哪一種動物？" body="先選擇物種，再挑一個目前最感興趣的品種。這一版先以犬隻示範完整時間軸。" />
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
          <StepHeading eyebrow={`01 · 遇見想領養的牠 · ${selectedCategory?.label ?? "犬"}`} title="選擇你想領養的品種" body="品種會影響後續提醒，但每隻動物仍有自己的個性與需求。" />
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
          <NavButtons onBack={() => setSelectionPage("species")} onNext={onNext} disabled={!breed} nextLabel="開始領養前準備" />
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
