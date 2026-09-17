"use client";

import React, { useEffect, useRef, useState } from "react";
import { categories } from "../../data/shared/app-flow";
import { applySizeBasedExpenseAmount, expenseCatalog, getPetSizeForBreed, money } from "../../data/shared/expenses";
import { getJourneyItemsForSpecies } from "../../data/species/journey";
import { getSpeciesConfig } from "../../data/species/index";
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

function getLifeStageRanges(breed: string, species = "dog") {
  if (species === "rabbit" || species === "bird") {
    const items = getJourneyItemsForSpecies(species);
    return items.reduce<Array<{ label: string; start: number; end: number }>>((groups, item, index) => {
      const last = groups.at(-1);
      if (last && item.stageId && last.label === item.stageLabel) {
        last.end = index;
      } else {
        groups.push({ label: item.stageLabel ?? item.timeLabel, start: index, end: index });
      }
      return groups;
    }, []);
  }
  const config = getSpeciesConfig(species);
  const breedLabel = config.breeds.find((item) => item.id === breed)?.label ?? "品種";
  return [
    { label: "接回家", start: 0, end: 0 },
    { label: "日常照護", start: 1, end: 2 },
    { label: config.copy.lifeChallengeLabel(breedLabel), start: 3, end: 3 },
    { label: "生活變化", start: 4, end: 6 },
  ] as const;
}

function statusAt(index: number, current: number, reached: number): NavigationStatus {
  if (index === current) return "current";
  if (index <= reached) return "completed";
  return "locked";
}

export function StageRail({
  testMode,
  step,
  furthestStep,
  selectionPage,
  selectionReached,
  preparationTask,
  preparationReached,
  lifePhase,
  species = "dog",
  breed,
  journeyIndex,
  journeyCompleted,
  onGoTo,
  onSelectionPage,
  onPreparationTask,
  onLifeStage,
}: {
  testMode?: boolean;
  step: number;
  furthestStep: number;
  selectionPage: "species" | "breed" | "name" | "history" | "transition";
  selectionReached: number;
  preparationTask: number;
  preparationReached: number;
  lifePhase: LifeJourneyPhase;
  species?: string;
  breed: string;
  journeyIndex: number;
  journeyCompleted: string[];
  onGoTo: (step: number) => void;
  onSelectionPage: (page: "species" | "breed" | "name" | "history" | "transition") => void;
  onPreparationTask: (task: number) => void;
  onLifeStage: (stage: number) => void;
}) {
  const lifeStageRanges = getLifeStageRanges(breed, species);
  const activeJourneyItems = getJourneyItemsForSpecies(species);
  const currentMain = step === 1 ? 0 : step === 2 ? 1 : step <= 6 ? 2 : step === 7 ? 3 : 4;
  const currentLifeStage = lifePhase === "arrival-video"
    ? 0
    : lifeStageRanges.findIndex((range) => journeyIndex >= range.start && journeyIndex <= range.end);
  const mainTargets = [1, 2, Math.max(3, Math.min(6, step)), 7, 8];
  const mainUnlockSteps = [1, 2, 3, 7, 8];

  const mainStatus = (index: number): NavigationStatus => {
    if (index === currentMain) return "current";
    if (testMode) return "completed";
    if (mainUnlockSteps[index] <= furthestStep) return "completed";
    return "locked";
  };
  // 兔子沒有品種細選；側欄也不顯示一個無法操作的空白步驟。
  const selectionNavigationPages = species === "rabbit" || species === "bird"
    ? [{ id: "species", label: "選擇物種", progress: 0 }, { id: "name", label: "替牠取名", progress: 2 }, { id: "history", label: "過往經驗", progress: 3 }, { id: "transition", label: "新的開始", progress: 4 }]
    : [{ id: "species", label: "選擇物種", progress: 0 }, { id: "breed", label: "選擇品種", progress: 1 }, { id: "name", label: "替牠取名", progress: 2 }, { id: "history", label: "過往經驗", progress: 3 }, { id: "transition", label: "新的開始", progress: 4 }];

  const navigation: MainNavigation[] = [
    {
      id: "pet-selection",
      number: "01",
      label: "選擇寵物",
      status: mainStatus(0),
      onClick: () => onGoTo(1),
      children: selectionNavigationPages.map(({ id, label, progress }) => ({
        id,
        label,
        status: testMode
          ? (id === selectionPage && step === 1 ? "current" : "completed")
          : step > 1 && progress <= selectionReached ? "completed" : statusAt(progress, ({ species: 0, breed: 1, name: 2, history: 3, transition: 4 } as const)[selectionPage], selectionReached),
        onClick: () => onSelectionPage(id as "species" | "breed" | "name" | "history" | "transition"),
      })),
    },
    {
      id: "preparation",
      number: "02",
      label: "飼養前準備",
      status: mainStatus(1),
      onClick: () => onGoTo(2),
      children: ["布置生活空間", "出發前準備"].map((label, index) => ({
        id: `preparation-${index}`,
        label,
        status: testMode
          ? (index === preparationTask && step === 2 ? "current" : "completed")
          : step > 2 && index <= preparationReached ? "completed" : statusAt(index, preparationTask, preparationReached),
        onClick: () => onPreparationTask(index),
      })),
    },
    {
      id: "life-journey",
      number: "03",
      label: "飼養生活",
      status: mainStatus(2),
      onClick: () => testMode ? onLifeStage(0) : onGoTo(mainTargets[2]),
      children: lifeStageRanges.map((range, index) => {
        const completed = lifePhase === "complete" || activeJourneyItems.slice(range.start, range.end + 1).every((item) => journeyCompleted.includes(item.id));
        const status: NavigationStatus = index === currentLifeStage && step >= 3 && step <= 6 ? "current" : testMode || completed ? "completed" : "locked";
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
      label: "飼養觀念回顧",
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
        {testMode && <p className="test-mode-badge">測試模式・關卡已解鎖</p>}
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

export function Welcome({ onStart, onTestStart }: { onStart: () => void; onTestStart: () => void }) {
  return (
    <section className="welcome" aria-label="伴日子新手村封面">
      <div className="welcome-hero-copy">
        <h1>伴日子<br />新手村</h1>
        <p className="welcome-subtitle">在真正飼養前，先走過一次與寵物的完整旅程</p>
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
      <button type="button" className="hidden-test-entry" aria-label="開啟測試模式" onClick={onTestStart}><span aria-hidden="true">·</span></button>
    </section>
  );
}

/** 僅由頂層流程在測試模式掛載，避免任何正式關卡取得跳題入口。 */
export function TestSkipButton({ onSkip }: { onSkip: () => void; label?: string }) {
  return (
    <button type="button" className="test-skip-button" onClick={onSkip} aria-label="下一子題目">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6 3.5L10.5 8 6 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="3.5" x2="12" y2="12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </button>
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
  const speciesConfig = getSpeciesConfig(category);
  type BreedOption = { id: string; image: string; label: string; shortDescription: string };
  const availableBreeds: readonly BreedOption[] = speciesConfig.breeds;
  const selectedBreed = availableBreeds.find((item) => item.id === breed);
  const previousBreeds = (speciesConfig as { previousBreeds?: readonly BreedOption[] }).previousBreeds ?? availableBreeds;
  const selectedPreviousBreed = previousBreeds.find((item) => item.id === previousBreed);
  const sameBreed = Boolean(breed && previousBreed && breed === previousBreed);
  const breedCarouselRef = useRef<HTMLDivElement>(null);
  const breedScrollTimerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (breedScrollTimerRef.current) window.clearTimeout(breedScrollTimerRef.current);
  }, []);

  function chooseCategory(id: string) {
    onCategory(id);
    const nextConfig = getSpeciesConfig(id);
    if (nextConfig.selection.skipBreedPage) {
      onBreed(nextConfig.breeds[0]?.id ?? "");
      onSelectionPage("name");
    } else {
      onBreed("");
      onSelectionPage("breed");
    }
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
          <StepHeading title={speciesConfig.copy.selectionTitle} />
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
          <StepHeading title={speciesConfig.copy.breedTitle} />
          <div className="breed-row breed-page-grid breed-carousel" ref={breedCarouselRef} onScroll={handleBreedCarouselScroll} aria-label="品種橫向滑動選擇">
            {availableBreeds.map((item) => (
              <button key={item.id} data-breed-id={item.id} className={breed === item.id ? "selected" : ""} onClick={() => onBreed(item.id)} aria-pressed={breed === item.id}>
                <img className="partner-card-image" src={item.image} alt="" /><b>{item.label}</b>{breed === item.id && <i>✓</i>}
              </button>
            ))}
          </div>
          <div className={`selection-note breed-description ${selectedBreed ? "selected" : "empty"}`} role="status" aria-live="polite" aria-atomic="true">
            {selectedBreed ? <img className="selection-note-image" src={selectedBreed.image} alt="" /> : <span aria-hidden="true">🐾</span>}
            <div><b>{selectedBreed ? `你選擇了：${selectedBreed.label}` : `${speciesConfig.copy.typeLabel}飼養特性`}</b><p>{selectedBreed?.shortDescription ?? `點選一個${speciesConfig.copy.typeLabel}，查看牠的飼養特性。`}</p></div>
          </div>
          <NavButtons onBack={() => onSelectionPage("species")} onNext={() => onSelectionPage("name")} disabled={!breed} nextLabel="下一步" />
        </section>
      ) : selectionPage === "name" ? (
        <section className="partner-selection-page pet-naming-page" key="name">
          <StepHeading title={speciesConfig.copy.nameTitle} body="這個名字會陪著牠走進接下來的生活，也會出現在後面的情境演練裡。" />
          <div className="pet-naming-stage">
            <img src="/assets/dog/room/nameplate.png" alt={`${speciesConfig.copy.animalName}名字吊牌`} />
            <label htmlFor="new-pet-name" className="sr-only">{speciesConfig.copy.animalName}的名字</label>
            <input id="new-pet-name" name="pet-display-name" value={petName} maxLength={12} placeholder={speciesConfig.copy.namePlaceholder} onChange={(event) => onPetName(event.target.value)} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} autoFocus />
          </div>
          <NavButtons onBack={() => onSelectionPage(speciesConfig.selection.skipBreedPage ? "species" : "breed")} onNext={() => onSelectionPage("history")} disabled={!petName.trim()} nextLabel="下一步" />
        </section>
      ) : selectionPage === "history" ? (
        <section className="partner-selection-page previous-dog-page" key="history">
          <StepHeading title={speciesConfig.copy.historyTitle} body={speciesConfig.copy.historyBody} />
          <div className="previous-dog-choice" role="group" aria-label={`是否曾經養過${speciesConfig.copy.animalName}`}>
            <button type="button" className={hasPreviousDog === true ? "selected" : ""} aria-pressed={hasPreviousDog === true} onClick={() => onHasPreviousDog(true)}><b>{speciesConfig.copy.hasPreviousLabel}</b><small>接著填寫牠的{speciesConfig.copy.typeLabel}與名字</small></button>
            <button type="button" className={hasPreviousDog === false ? "selected" : ""} aria-pressed={hasPreviousDog === false} onClick={() => onHasPreviousDog(false)}><b>{speciesConfig.copy.noPreviousLabel}</b><small>直接開始這次的飼養前準備</small></button>
          </div>
          {hasPreviousDog === true && (
            <div className="previous-dog-details">
              <div><p className="life-stage-label">{speciesConfig.copy.previousSectionTitle}</p><h2>牠是哪一個{speciesConfig.copy.typeLabel}？</h2></div>
              <div className="breed-row previous-breed-grid">
                {previousBreeds.map((item) => (
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
              {selectedPreviousBreed ? <img src={selectedPreviousBreed.image} alt={`${previousDogName || `以前的${speciesConfig.copy.animalName}`}，${selectedPreviousBreed.label}`} /> : <span className="experience-pet-placeholder" aria-hidden="true">🐾</span>}
              <div><h2>{previousDogName || `以前的${speciesConfig.copy.animalName}`}</h2><b>{selectedPreviousBreed?.label}</b><p>{selectedPreviousBreed?.shortDescription}</p></div>
            </article>
            <div className="experience-arrow" aria-hidden="true"><i>→</i></div>
            <article className="experience-dog-card experience-dog-card--next">
              <span>{sameBreed ? "相同品種，新的個體" : "準備迎接的新生活"}</span>
              {selectedBreed ? <img src={selectedBreed.image} alt={`這次想迎接的${selectedBreed.label}`} /> : <span className="experience-pet-placeholder" aria-hidden="true">🐾</span>}
              <div><h2>{petName || `新的${selectedBreed?.label ?? speciesConfig.copy.animalName}`}</h2><b>{selectedBreed?.label}</b><p>{selectedBreed?.shortDescription}</p></div>
            </article>
          </div>
          <div className="experience-story">
            <p id="experience-transition-title" className="experience-story-line experience-story-line--past">你熟悉的是和<strong>{previousDogName || selectedPreviousBreed?.label}</strong>經過一段時間磨合後的生活。</p>
            {sameBreed ? (
              <>
                <p className="experience-story-line experience-story-line--next"><strong>{petName || `新的${speciesConfig.copy.animalName}`}</strong>和<strong>{previousDogName || `以前的${speciesConfig.copy.animalName}`}</strong>雖然都是{selectedBreed?.label}，仍然是<strong>兩個不同的個體</strong>。牠可能有不同的個性、經歷、健康狀況與適應速度。</p>
                <p className="experience-story-line experience-story-line--bridge">接下來，請先暫時放下<strong>「同一個品種就會一樣」</strong>或<strong>「以前就是這樣照顧」</strong>的想法，陪<strong>{petName || "牠"}</strong>從到家第一天演練一次，也重新確認現在的你是否準備好和牠建立新的生活。</p>
              </>
            ) : (
              <>
                <p className="experience-story-line experience-story-line--next"><strong>{petName || `新的${selectedBreed?.label ?? speciesConfig.copy.animalName}`}</strong>是一隻不一樣的生命，可能有不同的個性、經歷、健康狀況與適應速度。</p>
                <p className="experience-story-line experience-story-line--bridge">接下來，請先暫時放下<strong>「以前就是這樣照顧」</strong>的想法，陪<strong>{petName || "牠"}</strong>從到家第一天演練一次，也重新確認現在的你是否準備好和牠建立新的生活。</p>
              </>
            )}
          </div>
          <div className="experience-transition-actions"><button type="button" className="secondary" onClick={() => onSelectionPage("history")}>← 返回</button><button type="button" className="primary" onClick={onNext}>開始飼養前準備 <span>→</span></button></div>
        </section>
      )}
    </div>
  );
}

type ExpenseDetailGroup = string;
const expenseLabels = {
  initialPreparation: "\u521d\u671f\u6e96\u5099\u91d1",
  requiredAfterArrival: "\u5230\u5bb6\u5f8c\u5fc5\u8981\u652f\u51fa",
  oneTimePrep: "\u4e00\u6b21\u6027\u6e96\u5099\u8cbb",
  monthlyBasic: "\u6bcf\u6708\u57fa\u672c\u652f\u51fa",
  temporaryMedical: "\u81e8\u6642\u6027\u652f\u51fa",
  detailEyebrow: "\u82b1\u8cbb\u660e\u7d30",
  detailTitle: "\u76ee\u524d\u5df2\u767b\u8a18\u7684\u652f\u51fa",
  closeDetails: "\u95dc\u9589\u660e\u7d30",
  noGroupExpenses: "\u76ee\u524d\u5c1a\u672a\u767b\u8a18\u6b64\u985e\u652f\u51fa\u3002",
  currentCostStatus: "\u76ee\u524d\u8cbb\u7528\u72c0\u6cc1",
  viewDetails: "\u67e5\u770b\u660e\u7d30",
  monthlySuffix: "\uff0f\u6708",
  addedPrefix: "\u65b0\u589e\uff1a",
} as const;

const requiredAfterArrivalExpenseIds = new Set(["microchip-registration", "rabies-vaccine", "basic-vaccine-checkup", "rabbit-arrival-checkup", "rabbit-sterilization", "bird-arrival-checkup"]);
const defaultVisibleExpenseIds = ["monthly-preventive-medicine"];
const defaultVisibleExpenses = defaultVisibleExpenseIds
  .map((id) => expenseCatalog[id])
  .filter((item): item is ExpenseRecord => Boolean(item));
const temporaryMedicalExpenseIds = new Set(["sick-vet-care", "senior-checkup", "dog-senior-room", "dog-senior-checkup", "journey-care-service", "senior-slipmat", "senior-access-bed", "rabbit-care-service", "rabbit-emergency-reserve", "rabbit-routine-checkup", "rabbit-senior-room", "bird-emergency-vet", "bird-senior-checkup", "bird-senior-room"]);

const expenseDetailGroupOrder: ExpenseDetailGroup[] = [
  expenseLabels.requiredAfterArrival,
  expenseLabels.oneTimePrep,
  expenseLabels.monthlyBasic,
  expenseLabels.temporaryMedical,
];

export function isRequiredAfterArrivalExpense(item: ExpenseRecord) {
  return requiredAfterArrivalExpenseIds.has(item.id) || item.category === "\u5230\u5bb6\u5f8c\u5fc5\u8981\u652f\u51fa";
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

export function getOneTimePreparationExpenseTotal(expenses: ExpenseRecord[]) {
  return expenses.filter(isOneTimePreparationExpense).reduce((sum, item) => sum + item.amount, 0);
}

/** 所有花費畫面與輸出共用的三大分類；原始 category、stage 與 expenseId 仍保留供追蹤。 */
export function getExpenseSummaryCategory(item: ExpenseRecord): ExpenseDetailGroup {
  if (isMonthlyExpense(item)) return expenseLabels.monthlyBasic;
  if (isTemporaryOrMedicalExpense(item)) return expenseLabels.temporaryMedical;
  return expenseLabels.initialPreparation;
}

export function getInitialPreparationTotal(expenses: ExpenseRecord[]) {
  return expenses.filter((item) => getExpenseSummaryCategory(item) === expenseLabels.initialPreparation).reduce((sum, item) => sum + item.amount, 0);
}

export function getMonthlyBasicTotal(expenses: ExpenseRecord[]) {
  return getMonthlyBasicExpenses(expenses).reduce((sum, item) => sum + item.amount, 0);
}

export function getTemporaryExpenseTotal(expenses: ExpenseRecord[]) {
  return getTemporaryExpenses(expenses).reduce((sum, item) => sum + item.amount, 0);
}

/** 回顧、明細與輸出共用：每月基本支出的實際細項。 */
export function getMonthlyBasicExpenses(expenses: ExpenseRecord[]) {
  return expenses.filter((item) => getExpenseSummaryCategory(item) === expenseLabels.monthlyBasic);
}

/** 回顧、明細與輸出共用：臨時性支出的實際細項。 */
export function getTemporaryExpenses(expenses: ExpenseRecord[]) {
  return expenses.filter((item) => getExpenseSummaryCategory(item) === expenseLabels.temporaryMedical);
}

/** 初期準備金的來源分組，供回顧、明細與輸出共用；不改變原始費用分類或加總。 */
export function getInitialPreparationBreakdown(expenses: ExpenseRecord[]) {
  const initialExpenses = expenses.filter((item) => getExpenseSummaryCategory(item) === expenseLabels.initialPreparation);
  const afterArrival = initialExpenses.filter(isRequiredAfterArrivalExpense);
  const departure = initialExpenses.filter((item) => !isRequiredAfterArrivalExpense(item) && item.stage === "出發前準備");
  const environment = initialExpenses.filter((item) => !afterArrival.includes(item) && !departure.includes(item));
  const totalFor = (items: ExpenseRecord[]) => items.reduce((sum, item) => sum + item.amount, 0);

  return {
    afterArrival: { label: "到家後必要支出", items: afterArrival, total: totalFor(afterArrival) },
    environment: { label: "領養前環境佈置", items: environment, total: totalFor(environment) },
    departure: { label: "出發前準備", items: departure, total: totalFor(departure) },
  };
}

/** 以已登記項目產生短摘要，避免不同物種共用硬寫的費用文案。 */
export function getExpenseItemSummary(items: ExpenseRecord[]) {
  if (!items.length) return "目前尚未登記項目";
  const names = Array.from(new Set(items.map((item) => item.name)));
  return `包含${names.slice(0, 3).join("、")}${names.length > 3 ? "等項目" : ""}`;
}

/** 全物種共用累積支出：已登記的所有分類都只加總一次。 */
export function getAccumulatedExpenseTotal(expenses: ExpenseRecord[]) {
  return expenses.reduce((sum, item) => sum + item.amount, 0);
}

export function mergeDefaultVisibleExpenses(expenses: ExpenseRecord[], breed: string, species?: string) {
  // 到家後必要支出必須在完成第一題後才寫入 expense store，不能在明細預先顯示。
  const speciesDefaultExpenses = species === "rabbit" || species === "bird" ? [] : defaultVisibleExpenses;
  const petSize = getPetSizeForBreed(breed);
  const existingIds = new Set(expenses.map((item) => item.id));
  return [
    ...expenses,
    ...speciesDefaultExpenses
      .filter((item) => !existingIds.has(item.id))
      .map((item) => applySizeBasedExpenseAmount(item, petSize)),
  ];
}

function detailGroupForExpense(item: ExpenseRecord): ExpenseDetailGroup {
  if (isRequiredAfterArrivalExpense(item)) return expenseLabels.requiredAfterArrival;
  if (isMonthlyExpense(item)) return expenseLabels.monthlyBasic;
  if (isTemporaryOrMedicalExpense(item)) return expenseLabels.temporaryMedical;
  return expenseLabels.oneTimePrep;
}

export function ExpenseDetails({ expenses, breed, species, onClose }: { expenses: ExpenseRecord[]; breed: string; species?: string; onClose: () => void }) {
  const visibleExpenses = mergeDefaultVisibleExpenses(expenses, breed, species);
  const preparationTotal = getInitialPreparationTotal(visibleExpenses);
  const monthlyTotal = getMonthlyBasicTotal(visibleExpenses);
  const temporaryMedicalTotal = getTemporaryExpenseTotal(visibleExpenses);
  const grouped = expenseDetailGroupOrder.map((group) => ({ group, items: visibleExpenses.filter((item) => detailGroupForExpense(item) === group) }));
  const oneTimePreparation = grouped.find((entry) => entry.group === expenseLabels.oneTimePrep)?.items ?? [];
  const requiredAfterArrival = grouped.find((entry) => entry.group === expenseLabels.requiredAfterArrival)?.items ?? [];
  const monthlyExpenses = grouped.find((entry) => entry.group === expenseLabels.monthlyBasic)?.items ?? [];
  const temporaryExpenses = grouped.find((entry) => entry.group === expenseLabels.temporaryMedical)?.items ?? [];
  const totalFor = (items: ExpenseRecord[]) => items.reduce((sum, item) => sum + item.amount, 0);
  const renderItems = (items: ExpenseRecord[]) => items.length ? (
    <ul>{items.map((item) => <li key={item.id}><span><b>{item.name}</b><small>{item.description ?? item.stage}</small></span><strong>NT$ {money.format(item.amount)}{isMonthlyExpense(item) ? expenseLabels.monthlySuffix : ""}</strong></li>)}</ul>
  ) : <p>{expenseLabels.noGroupExpenses}</p>;

  return (
    <div className="expense-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="expense-modal" role="dialog" aria-modal="true" aria-labelledby="expense-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="expense-modal-head"><div><p className="eyebrow">{expenseLabels.detailEyebrow}</p><h2 id="expense-title">{expenseLabels.detailTitle}</h2></div><button onClick={onClose} aria-label={expenseLabels.closeDetails}>x</button></div>
        <div className="expense-modal-summary" aria-label="費用摘要">
          <div><small>{expenseLabels.initialPreparation}</small><b>NT$ {money.format(preparationTotal)}</b></div>
          <div><small>{expenseLabels.monthlyBasic}</small><b>NT$ {money.format(monthlyTotal)}</b></div>
          <div><small>{expenseLabels.temporaryMedical}</small><b>NT$ {money.format(temporaryMedicalTotal)}</b></div>
        </div>
        <div className="expense-groups">
          <section className="expense-group expense-group--initial">
            <h3>{expenseLabels.initialPreparation}<span>NT$ {money.format(preparationTotal)}</span></h3>
            <div className="expense-initial-subgroups">
              <section className="expense-initial-subgroup"><h4>{expenseLabels.oneTimePrep}<span>NT$ {money.format(totalFor(oneTimePreparation))}</span></h4>{renderItems(oneTimePreparation)}</section>
              <section className="expense-initial-subgroup"><h4>{expenseLabels.requiredAfterArrival}<span>NT$ {money.format(totalFor(requiredAfterArrival))}</span></h4>{renderItems(requiredAfterArrival)}</section>
            </div>
          </section>
          <section className="expense-group"><h3>{expenseLabels.monthlyBasic}<span>NT$ {money.format(totalFor(monthlyExpenses))}{expenseLabels.monthlySuffix}</span></h3>{renderItems(monthlyExpenses)}</section>
          <section className="expense-group"><h3>{expenseLabels.temporaryMedical}<span>NT$ {money.format(totalFor(temporaryExpenses))}</span></h3>{renderItems(temporaryExpenses)}</section>
        </div>
        <button className="primary" onClick={onClose}>{expenseLabels.closeDetails}</button>
      </section>
    </div>
  );
}

/** 金幣飛入動畫：新費用加入時，金幣從畫面中央飛向「查看明細」按鈕。 */
function CoinFlightAnimation({
  expense,
  triggerRef,
}: {
  expense: ExpenseRecord | null;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const lastKey = useRef("");

  useEffect(() => {
    if (!expense) return;
    const key = `${expense.id}-${expense.amount}`;
    if (lastKey.current === key) return;
    lastKey.current = key;

    const btn = triggerRef.current;
    if (!btn) return;

    // Create toast card
    const toast = document.createElement("div");
    toast.className = "coin-toast-overlay";
    toast.innerHTML = `
      <div class="coin-toast-card" role="status" aria-live="polite">
        <svg class="coin-toast-emoji" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 50" width="88" height="46" aria-hidden="true"><rect x="3" y="5" width="90" height="42" rx="7" fill="rgba(20,80,30,0.10)"/><rect x="1" y="1" width="90" height="42" rx="7" fill="#7ec87a"/><rect x="1" y="1" width="90" height="21" rx="7" fill="rgba(255,255,255,0.25)"/><rect x="1" y="20" width="90" height="4" fill="rgba(30,100,40,0.08)"/><rect x="1" y="1" width="90" height="42" rx="7" fill="none" stroke="#3a8a48" stroke-width="1.8"/><rect x="6" y="6" width="80" height="32" rx="4" fill="none" stroke="#3a8a48" stroke-width="0.7" opacity="0.45"/><ellipse cx="46" cy="22" rx="13" ry="11" fill="rgba(30,120,50,0.18)" stroke="#3a8a48" stroke-width="0.8" opacity="0.7"/><text x="46" y="26.5" font-family="Arial Black,Arial,sans-serif" font-size="11" font-weight="900" text-anchor="middle" fill="#1a4a22">NT$</text><text x="14" y="16" font-family="Arial,sans-serif" font-size="7" font-weight="700" fill="#1e5a28">100</text><text x="78" y="36" font-family="Arial,sans-serif" font-size="7" font-weight="700" text-anchor="end" fill="#1e5a28">100</text><text x="14" y="36" font-family="Arial,sans-serif" font-size="9" fill="#3a8a48" opacity="0.7">&#10022;</text><text x="78" y="16" font-family="Arial,sans-serif" font-size="9" text-anchor="end" fill="#3a8a48" opacity="0.7">&#10022;</text></svg>
        <div class="coin-toast-body">
          <b>已加入準備清單</b>
          <span>${expense.name}</span>
          <em>+NT$ ${money.format(expense.amount)}${isMonthlyExpense(expense) ? expenseLabels.monthlySuffix : ""}</em>
        </div>
      </div>`;
    document.body.appendChild(toast);

    // Coins
    const COIN_COUNT = 7;
    const createdCoins: HTMLDivElement[] = [];

    for (let i = 0; i < COIN_COUNT; i++) {
      const coin = document.createElement("div");
      coin.className = "coin-particle";
      // styled as mini bill via CSS

      const angle = (i / COIN_COUNT) * Math.PI * 2;
      const r = 18 + Math.random() * 28;
      const startX = window.innerWidth / 2 + Math.cos(angle) * r;
      const startY = window.innerHeight * 0.47 + Math.sin(angle) * r;
      coin.style.left = startX + "px";
      coin.style.top = startY + "px";
      document.body.appendChild(coin);
      createdCoins.push(coin);

      // Phase 1: bloom out
      coin.animate(
        [
          { transform: "translate(-50%,-50%) scale(0)", opacity: 0 },
          { transform: "translate(-50%,-50%) scale(1.4)", opacity: 1 },
          { transform: "translate(-50%,-50%) scale(1.1)", opacity: 1 },
        ],
        { duration: 320, delay: i * 50, easing: "cubic-bezier(.34,1.6,.64,1)", fill: "forwards" }
      );

      // Phase 2: fly to button after delay
      const flyDelay = i * 50 + 420;
      setTimeout(() => {
        const btnRect = btn.getBoundingClientRect();
        const targetX = btnRect.left + btnRect.width / 2;
        const targetY = btnRect.top + btnRect.height / 2;
        const dx = targetX - startX;
        const dy = targetY - startY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const perpSign = i % 2 === 0 ? 1 : -1;
        const perpScale = 0.28 + Math.random() * 0.18;
        const midDx = dx / 2 + (-dy / dist) * dist * perpScale * perpSign;
        const midDy = dy / 2 + (dx / dist) * dist * perpScale * perpSign;

        coin.animate(
          [
            { transform: "translate(-50%,-50%) scale(1.1)", opacity: 1, offset: 0 },
            {
              transform: `translate(calc(-50% + ${midDx}px), calc(-50% + ${midDy}px)) scale(0.9)`,
              opacity: 0.85,
              offset: 0.55,
            },
            {
              transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.05)`,
              opacity: 0,
              offset: 1,
            },
          ],
          { duration: 680, easing: "cubic-bezier(.4,0,.65,1)", fill: "forwards" }
        );
        setTimeout(() => coin.remove(), 750);
      }, flyDelay);
    }

    // Button pulse when last coin lands
    const pulsAt = (COIN_COUNT - 1) * 50 + 420 + 650;
    const pulseTimer = setTimeout(() => {
      btn.classList.add("bill-trigger--coin-pulse");
      setTimeout(() => btn.classList.remove("bill-trigger--coin-pulse"), 700);
    }, pulsAt);

    // Dismiss toast
    const toastTimer = setTimeout(() => {
      toast.classList.add("coin-toast-overlay--exit");
      setTimeout(() => { try { toast.remove(); } catch { /* noop */ } }, 380);
    }, 2100);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(toastTimer);
      createdCoins.forEach((c) => { try { c.remove(); } catch { /* noop */ } });
      try { toast.remove(); } catch { /* noop */ }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expense?.id, expense?.amount]);

  return null;
}

export function CostBar({
  expenses,
  latestExpense,
  breed,
  species,
}: {
  expenses: ExpenseRecord[];
  latestExpense: ExpenseRecord | null;
  breed: string;
  species?: string;
}) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <CoinFlightAnimation expense={latestExpense} triggerRef={triggerRef} />
      <div className="cost-bar cost-bar-compact" aria-label={expenseLabels.currentCostStatus}>
        <button ref={triggerRef} type="button" className="bill-trigger" onClick={() => setDetailsOpen(true)} aria-label={expenseLabels.viewDetails} title={expenseLabels.viewDetails}>
          <span className="bill-trigger-icon" aria-hidden="true">＄</span>
          <em>{expenseLabels.viewDetails}</em>
        </button>
      </div>
      {detailsOpen && <ExpenseDetails expenses={expenses} breed={breed} species={species} onClose={() => setDetailsOpen(false)} />}
    </>
  );
}

/** @deprecated 已由 CoinFlightAnimation 取代，保留以避免 import 錯誤。 */
export function ExpenseAdditionNotice({ expense }: { expense: ExpenseRecord | null }) {
  return null;
}
