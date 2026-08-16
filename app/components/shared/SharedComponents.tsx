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

function getLifeStageRanges(breed: string) {
  const breedLabel = breeds.find((item) => item.id === breed)?.label ?? "品種";
  return [
    { label: "接回家", start: 0, end: 0 },
    { label: "日常照護", start: 1, end: 2 },
    { label: `${breedLabel}的考驗`, start: 3, end: 3 },
    { label: "生活變化", start: 4, end: 6 },
  ] as const;
}

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
  breed,
  journeyIndex,
  journeyCompleted,
  onGoTo,
  onSelectionPage,
  onPreparationTask,
  onLifeStage,
}: {
  step: number;
  furthestStep: number;
  selectionPage: "species" | "breed" | "name" | "history" | "transition";
  selectionReached: number;
  preparationTask: number;
  preparationReached: number;
  lifePhase: LifeJourneyPhase;
  breed: string;
  journeyIndex: number;
  journeyCompleted: string[];
  onGoTo: (step: number) => void;
  onSelectionPage: (page: "species" | "breed" | "name" | "history" | "transition") => void;
  onPreparationTask: (task: number) => void;
  onLifeStage: (stage: number) => void;
}) {
  const lifeStageRanges = getLifeStageRanges(breed);
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
      children: ["選擇物種", "選擇品種", "替牠取名", "過往經驗", "新的開始"].map((label, index) => ({
        id: ["species", "breed", "name", "history", "transition"][index],
        label,
        status: step > 1 && index <= selectionReached ? "completed" : statusAt(index, ({ species: 0, breed: 1, name: 2, history: 3, transition: 4 } as const)[selectionPage], selectionReached),
        onClick: () => onSelectionPage((["species", "breed", "name", "history", "transition"] as const)[index]),
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
            <button className="nav-main-button" disabled={item.status === "locked"} onClick={item.onClick} aria-current={item.status === "current" ? "step" : undefined}>
              <span>{item.status === "completed" ? "✓" : item.number}</span><em>{item.label}</em>
            </button>
            {item.children && (
              <div className="nav-children">
                {item.children.map((child, childIndex) => (
                  <div className={`nav-child ${child.status}`} key={child.id}>
                    <button disabled={child.status === "locked"} onClick={child.onClick} aria-current={child.status === "current" ? "step" : undefined}>
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
        <summary aria-label={`目前在第 ${currentMain + 1} 站：${navigation[currentMain].label}。點擊查看完整進度`}>
          <span className="mobile-progress-copy">
            <b>{navigation[currentMain].number} {navigation[currentMain].label}</b>
          </span>
          <span
            className="mobile-progress-track"
            role="img"
            aria-label={`共 ${navigation.length} 站，目前在第 ${currentMain + 1} 站：${navigation[currentMain].label}`}
          >
            {navigation.map((item) => (
              <span className={`mobile-progress-step ${item.status}`} key={`mobile-${item.id}`}>
                <i aria-hidden="true" />
                <span className="visually-hidden">{item.label}：{item.status === "completed" ? "已完成" : item.status === "current" ? "目前位置" : "尚未開始"}</span>
              </span>
            ))}
          </span>
          <span className="mobile-progress-toggle" aria-hidden="true" />
        </summary>
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
  petName,
  onCategory,
  onBreed,
  onPetName,
  hasPreviousDog,
  previousBreed,
  previousDogName,
  onHasPreviousDog,
  onPreviousBreed,
  onPreviousDogName,
  onNext,
}: {
  selectionPage: "species" | "breed" | "name" | "history" | "transition";
  onSelectionPage: (page: "species" | "breed" | "name" | "history" | "transition") => void;
  category: string;
  breed: string;
  petName: string;
  onCategory: (value: string) => void;
  onBreed: (value: string) => void;
  onPetName: (value: string) => void;
  hasPreviousDog: boolean | null;
  previousBreed: string;
  previousDogName: string;
  onHasPreviousDog: (value: boolean) => void;
  onPreviousBreed: (value: string) => void;
  onPreviousDogName: (value: string) => void;
  onNext: () => void;
}) {
  const selectedBreed = breeds.find((item) => item.id === breed);
  const selectedPreviousBreed = breeds.find((item) => item.id === previousBreed);
  const breedCarouselRef = useRef<HTMLDivElement>(null);
  const breedScrollTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  useEffect(() => () => {
    if (breedScrollTimerRef.current) window.clearTimeout(breedScrollTimerRef.current);
  }, []);

  function chooseCategory(id: string) {
    onCategory(id);
    onBreed("");
    onSelectionPage("breed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function syncBreedFromCarousel() {
    const container = breedCarouselRef.current;
    if (!container) return;
    const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;
    const cards = Array.from(container.querySelectorAll<HTMLButtonElement>("[data-breed-id]"));
    const centered = cards.reduce<{ id: string; distance: number } | null>((closest, card) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - containerCenter);
      const id = card.dataset.breedId ?? "";
      if (!id || (closest && closest.distance <= distance)) return closest;
      return { id, distance };
    }, null);
    if (centered && centered.id !== breed) onBreed(centered.id);
  }

  function handleBreedCarouselScroll() {
    if (breedScrollTimerRef.current) window.clearTimeout(breedScrollTimerRef.current);
    breedScrollTimerRef.current = window.setTimeout(syncBreedFromCarousel, 120);
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
      ) : selectionPage === "breed" ? (
        <section className="partner-selection-page" key="breed">
          <StepHeading title="選擇你想領養的品種" />
          <div className="breed-row breed-page-grid breed-carousel" ref={breedCarouselRef} onScroll={handleBreedCarouselScroll} aria-label="品種橫向滑動選擇">
            {breeds.map((item) => (
              <button key={item.id} data-breed-id={item.id} className={breed === item.id ? "selected" : ""} onClick={() => onBreed(item.id)} aria-pressed={breed === item.id}>
                {item.image ? <img className="partner-card-image" src={item.image} alt="" /> : <span>{item.icon}</span>}<b>{item.label}</b>{breed === item.id && <i>✓</i>}
              </button>
            ))}
          </div>
          <div className={`selection-note breed-description ${selectedBreed ? "selected" : "empty"}`} role="status" aria-live="polite" aria-atomic="true">
            {selectedBreed?.image ? <img className="selection-note-image" src={selectedBreed.image} alt="" /> : <span aria-hidden="true">{selectedBreed?.icon ?? "🐾"}</span>}
            <div><b>{selectedBreed ? `你選擇了：${selectedBreed.label}` : "品種飼養特性"}</b><p>{selectedBreed?.shortDescription ?? "點選一個品種，查看牠的飼養特性。"}</p></div>
          </div>
          <NavButtons onBack={() => onSelectionPage("species")} onNext={() => onSelectionPage("name")} disabled={!breed} nextLabel="下一步" />
        </section>
      ) : selectionPage === "name" ? (
        <section className="partner-selection-page pet-naming-page" key="name">
          <StepHeading title="先幫牠取一個名字" body="這個名字會陪著牠走進接下來的生活，也會出現在後面的情境演練裡。" />
          <div className="pet-naming-stage">
            <img src="/assets/room/nameplate.png" alt="小狗名字吊牌" />
            <label htmlFor="new-pet-name" className="sr-only">小狗的名字</label>
            <input id="new-pet-name" value={petName} maxLength={12} placeholder="請輸入小狗的名字" onChange={(event) => onPetName(event.target.value)} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} autoFocus />
          </div>
          <NavButtons onBack={() => onSelectionPage("breed")} onNext={() => onSelectionPage("history")} disabled={!petName.trim()} nextLabel="下一步" />
        </section>
      ) : selectionPage === "history" ? (
        <section className="partner-selection-page previous-dog-page" key="history">
          <StepHeading title="你以前有養過狗嗎？" body="過去的經驗很珍貴，也可能讓我們自然沿用熟悉的照顧方式。先簡單告訴我們，你是否曾經和狗狗一起生活。" />
          <div className="previous-dog-choice" role="group" aria-label="是否曾經養過狗">
            <button type="button" className={hasPreviousDog === true ? "selected" : ""} aria-pressed={hasPreviousDog === true} onClick={() => onHasPreviousDog(true)}><b>有，曾經有養過狗</b><small>接著填寫牠的品種與名字</small></button>
            <button type="button" className={hasPreviousDog === false ? "selected" : ""} aria-pressed={hasPreviousDog === false} onClick={() => onHasPreviousDog(false)}><b>沒有，這是第一次</b><small>直接開始這次的領養前準備</small></button>
          </div>
          {hasPreviousDog === true && (
            <div className="previous-dog-details">
              <div><p className="life-stage-label">以前陪伴你的狗狗</p><h2>牠是哪一個品種？</h2></div>
              <div className="breed-row previous-breed-grid">
                {breeds.map((item) => (
                  <button type="button" key={item.id} className={previousBreed === item.id ? "selected" : ""} onClick={() => onPreviousBreed(item.id)} aria-pressed={previousBreed === item.id}>
                    <img className="partner-card-image" src={item.image} alt="" /><b>{item.label}</b>{previousBreed === item.id && <i>✓</i>}
                  </button>
                ))}
              </div>
              <label className="previous-dog-name">牠的名字<input value={previousDogName} maxLength={12} placeholder="例如：豆豆" onChange={(event) => onPreviousDogName(event.target.value)} /></label>
            </div>
          )}
          <NavButtons
            onBack={() => onSelectionPage("name")}
            onNext={() => hasPreviousDog ? onSelectionPage("transition") : onNext()}
            disabled={hasPreviousDog === null || (hasPreviousDog && (!previousBreed || !previousDogName.trim()))}
            nextLabel="下一步"
          />
        </section>
      ) : (
        <section className="experience-transition-page" key="transition" aria-labelledby="experience-transition-title">
          <div className="experience-dogs" aria-label="從過去的陪伴經驗走向新的生命">
            <article className="experience-dog-card experience-dog-card--past">
              <span>過去熟悉的生活</span>
              <img src={selectedPreviousBreed?.image} alt={`${previousDogName || "以前的狗狗"}，${selectedPreviousBreed?.label ?? "犬"}`} />
              <div><h2>{previousDogName || "以前的狗狗"}</h2><b>{selectedPreviousBreed?.label}</b><p>{selectedPreviousBreed?.shortDescription}</p></div>
            </article>
            <div className="experience-arrow" aria-hidden="true"><i>→</i></div>
            <article className="experience-dog-card experience-dog-card--next">
              <span>準備迎接的新生活</span>
              <img src={selectedBreed?.image} alt={`這次想迎接的${selectedBreed?.label ?? "狗狗"}`} />
              <div><h2>{petName || `新的${selectedBreed?.label ?? "狗狗"}`}</h2><b>{selectedBreed?.label}</b><p>{selectedBreed?.shortDescription}</p></div>
            </article>
          </div>
          <div className="experience-story">
            <p id="experience-transition-title" className="experience-story-line experience-story-line--past">你熟悉的是和<strong>{previousDogName || selectedPreviousBreed?.label}</strong>經過一段時間磨合後的生活。</p>
            <p className="experience-story-line experience-story-line--next"><strong>{petName || `新的${selectedBreed?.label ?? "狗狗"}`}</strong>是一隻不一樣的生命，可能有不同的個性、經歷、健康狀況與適應速度。</p>
            <p className="experience-story-line experience-story-line--bridge">接下來，請先暫時放下<strong>「以前就是這樣照顧」</strong>的想法，陪<strong>{petName || "牠"}</strong>從到家第一天演練一次，也重新確認現在的你是否準備好和牠建立新的生活。</p>
          </div>
          <div className="experience-transition-actions"><button type="button" className="secondary" onClick={() => onSelectionPage("history")}>← 返回</button><button type="button" className="primary" onClick={onNext}>開始領養前準備 <span>→</span></button></div>
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
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!latestExpense) {
      setFlashExpense(null);
      return;
    }
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setFlashExpense(latestExpense);
    toastTimerRef.current = window.setTimeout(() => {
      setFlashExpense(null);
      toastTimerRef.current = null;
    }, 2400);
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
          <span className="bill-trigger-icon" aria-hidden="true">＄</span>
          <em>{expenseLabels.viewDetails}</em>
        </button>
      </div>
      {detailsOpen && <ExpenseDetails expenses={expenses} emergencyReserve={emergencyReserve} breed={breed} onClose={() => setDetailsOpen(false)} />}
    </>
  );
}
