"use client";

/* eslint-disable @next/next/no-img-element -- Report artwork is consumed by the capture/export flow and must retain native image rendering. */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { money } from "../../data/shared/expenses";
import type { HomeReadinessTextBlock, HomeReadinessTextSegment } from "../../data/shared/home-readiness-types";
import type { MasteredCareSource } from "../../data/shared/mastered-care-types";
import { isMasteredCareLifeStateComplete } from "../../data/shared/mastered-care-selectors";
import { interpolatePetName, petNameFallback } from "../../data/shared/pet-text";
import { getAllScenariosForSpecies } from "../../data/species/journey";
import { getSpeciesConfig } from "../../data/species/index";
import { getReportDiscussionSummaryOverride, getReportPracticeItems, isReportPracticeItemComplete } from "../../data/species/report-practice-registry";
import type { CareMember, ExpenseRecord, LifeActivityState, Profile, Scenario, ScenarioAnswer } from "../../game-types";
import type { SharedDiscussionTopic } from "../../shared-result-types";
import {
  ExpenseDetails,
  formatTemporaryExpenseReserve,
  getInitialPreparationBreakdown,
  getInitialPreparationTotal,
  getMonthlyBasicTotal,
  getTemporaryExpenses,
  mergeDefaultVisibleExpenses,
  temporaryExpenseReserveNote,
} from "../shared/SharedComponents";
import type { HomeReadinessState } from "../../data/shared/home-readiness-state";
import { PdfDownloadButton } from "./PdfExportControls";

function personalizeReportText(text: string, petName: string, species?: string) {
  return interpolatePetName(text, petName, species);
}

/** 各物種資料保留完整句子；回顧卡只呈現可掃讀的實際時間值。 */
function dailyCareDurationLabel(value: string) {
  return value.replace(/^每日約需安排\s*/, "");
}

function homeReadinessText(segments: HomeReadinessTextSegment[], petName: string, species?: string) {
  return segments.map((segment) => interpolatePetName(segment.text, petName, species)).join("");
}

function HomeReadinessReviewText({ segments, petName, species }: { segments: HomeReadinessTextSegment[]; petName: string; species?: string }) {
  return <>{segments.map((segment, index) => {
    const parts = interpolatePetName(segment.text, petName, species).split("**");
    return <span key={`${segment.text}-${index}`}>{parts.map((part, partIndex) => (segment.emphasis || partIndex % 2 === 1)
      ? <strong className="home-readiness-emphasis" key={`${part}-${partIndex}`}>{part}</strong>
      : part)}</span>;
  })}</>;
}

function CareReviewRichText({ blocks, petName, species }: { blocks: HomeReadinessTextBlock[]; petName: string; species?: string }) {
  const paragraphs = blocks.filter((block) => block.type === "paragraph");
  const items = blocks.filter((block) => block.type === "item");
  return <>{paragraphs.map((block, index) => <p key={`paragraph-${index}`}><HomeReadinessReviewText segments={block.segments} petName={petName} species={species} /></p>)}{items.length > 0 && <ul>{items.map((block, index) => <li key={`item-${index}`}><HomeReadinessReviewText segments={block.segments} petName={petName} species={species} /></li>)}</ul>}</>;
}

function knowledgePointsForScenario(scenario: Scenario, petName: string, species?: string) {
  const correctChoices = scenario.choices.filter((choice) => choice.result === "correct");
  const rawPoints = scenario.correctSummary?.length
    ? scenario.correctSummary
    : correctChoices.flatMap((choice) => [choice.text, choice.explanation, choice.suggestion ?? ""]);
  return Array.from(new Set(rawPoints.flatMap((point) => point.split("\n")).map((point) => personalizeReportText(point.trim(), petName, species)).filter(Boolean))).slice(0, 6);
}

/**
 * PDF 匯出以固定 A4 畫布擷取。將較短的複習卡放進同一頁，避免每一題
 * 都留下大段空白；估算高度接近一張 A4 可用內容區時才另起新頁。
 */
function groupDiscussionTopicsForPdf(topics: SharedDiscussionTopic[]) {
  const availableHeight = 202;
  const pages: SharedDiscussionTopic[][] = [];
  let currentPage: SharedDiscussionTopic[] = [];
  let currentHeight = 0;

  for (const topic of topics) {
    const textLength = [topic.title, topic.topic, topic.summary ?? "", ...topic.knowledgePoints.slice(0, 4)].join("").length;
    // Header 與卡片留白約佔 35mm；其餘以每行約 48 個中文字估算，
    // 保守保留空間，避免固定畫布擷取時截掉下一張卡片。
    const estimatedHeight = 35 + Math.ceil(textLength / 48) * 4.8;
    if (currentPage.length > 0 && currentHeight + estimatedHeight > availableHeight) {
      pages.push(currentPage);
      currentPage = [];
      currentHeight = 0;
    }
    currentPage.push(topic);
    currentHeight += estimatedHeight;
  }

  if (currentPage.length) pages.push(currentPage);
  return pages;
}

export function AssessmentReport({
  petName,
  breed,
  species = "dog",
  profile,
  expenses,
  roomReady,
  hazardsReady,
  trunkPassed,
  answers,
  lifeActivity,
  homeReadiness,
  committed,
}: {
  petName: string;
  breed: string;
  species?: string;
  profile: Profile;
  expenses: ExpenseRecord[];
  roomReady: string[];
  hazardsReady: string[];
  members: CareMember[];
  trunkSelected: string[];
  trunkPassed: boolean;
  answers: Record<string, ScenarioAnswer>;
  lifeActivity: LifeActivityState;
  homeReadiness: HomeReadinessState;
  committed: boolean;
  onCommittedChange: (committed: boolean) => void;
  onBack: () => void;
  onReset: () => void;
}) {
  const [activeDiscussionId, setActiveDiscussionId] = useState("");
  const [expenseDetailsOpen, setExpenseDetailsOpen] = useState(false);
  const [dailyCareDetailsOpen, setDailyCareDetailsOpen] = useState(false);
  const [activeAdditionalNoteIndex, setActiveAdditionalNoteIndex] = useState<number | null>(null);
  const additionalNotesTriggerRef = useRef<HTMLButtonElement>(null);
  const additionalNotesModalRef = useRef<HTMLElement>(null);
  const speciesConfig = getSpeciesConfig(species);
  const homeReadinessConfig = speciesConfig.homeReadiness;
  const careReviewAdditionalNotes = speciesConfig.careReviewAdditionalNotes;
  const selectedHousing = homeReadinessConfig.housingChoices.find((choice) => choice.id === homeReadiness.housing);
  const homeReadinessComplete = Boolean(selectedHousing && homeReadiness.housingReminderAcknowledged && homeReadinessConfig.cards.every((card) => homeReadiness.acknowledgedCardIds.includes(card.id)));
  useEffect(() => {
    if (!activeDiscussionId && !dailyCareDetailsOpen && activeAdditionalNoteIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    const additionalNotesTrigger = additionalNotesTriggerRef.current;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDiscussionId("");
        setDailyCareDetailsOpen(false);
        setActiveAdditionalNoteIndex(null);
      }
    };
    const trapAdditionalNotesFocus = (event: KeyboardEvent) => {
      if (activeAdditionalNoteIndex === null || event.key !== "Tab") return;
      const focusable = additionalNotesModalRef.current?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("keydown", trapAdditionalNotesFocus);
    if (activeAdditionalNoteIndex !== null) window.setTimeout(() => additionalNotesModalRef.current?.querySelector<HTMLElement>("button")?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("keydown", trapAdditionalNotesFocus);
      if (activeAdditionalNoteIndex !== null) additionalNotesTrigger?.focus();
    };
  }, [activeDiscussionId, dailyCareDetailsOpen, activeAdditionalNoteIndex]);
  const visibleExpenses = mergeDefaultVisibleExpenses(expenses, breed, species);
  const initialPreparationTotal = getInitialPreparationTotal(visibleExpenses);
  const monthlyBasicTotal = getMonthlyBasicTotal(visibleExpenses);
  const initialPreparationBreakdown = getInitialPreparationBreakdown(visibleExpenses);
  const temporaryExpenses = getTemporaryExpenses(visibleExpenses);
  const temporaryExpenseTotalLabel = temporaryExpenses.length
    ? formatTemporaryExpenseReserve(temporaryExpenses).replace(/^建議預留\s*/, "")
    : "NT$ 0";
  const reportScenarios = getAllScenariosForSpecies(species, breed);
  const practiceItems = getReportPracticeItems().map((item) => ({ label: item.label, complete: isReportPracticeItemComplete(item, species, lifeActivity) }));
  const arrivalMealComplete = practiceItems.find((item) => item.label === "已完成到家第一餐")?.complete ?? false;
  const requiredRoom = speciesConfig.roomItems.filter((item) => item.required);
  const roomCompletion = Math.round((roomReady.filter((id) => requiredRoom.some((item) => item.id === id)).length / requiredRoom.length) * 100);
  const rawActivitySpace = profile.activitySpace as string[] | string;
  const selectedActivitySpaces = Array.isArray(rawActivitySpace)
    ? rawActivitySpace
    : rawActivitySpace
      ? [rawActivitySpace]
      : [];
  const activitySpace = selectedActivitySpaces.length
    ? selectedActivitySpaces.map((space) => space === "其他" ? profile.otherActivitySpace || "其他（待補充）" : space).join("、")
    : "待補充";
  const enteredHousemates = profile.housemateList.map((item) => item.trim()).filter(Boolean);
  const legacyHousemates = [
    ...profile.housemateTypes.filter((item) => item !== "無" && item !== "其他"),
    profile.housemateTypes.includes("其他") ? profile.otherHousemate || "其他（待補充）" : "",
  ].filter(Boolean);
  const housemateStatus = profile.hasHousemates === false
    ? "無同住家人"
    : profile.hasHousemates === true
      ? (enteredHousemates.length ? enteredHousemates.join("、") : legacyHousemates.length ? legacyHousemates.join("、") : "有同住家人（待補充）")
      : "待補充";
  const selectedBreed = speciesConfig.breeds.find((item) => item.id === breed);
  const selectedTypeLabel = selectedBreed?.label ?? speciesConfig.copy.animalNameFallback;
  const reasonStatus = profile.reasons.length ? profile.reasons.map((item) => item === "其他" ? profile.reasonOther || "其他（待補充）" : item).join("、") : "待補充";
  const discussionTopics: SharedDiscussionTopic[] = Object.values(answers)
    .filter((answer) => answer.firstResult !== "correct" || Boolean(answer.discussionFlags?.length))
    .map((answer) => reportScenarios.find((scenario) => scenario.id === answer.scenarioId))
    .filter((scenario): scenario is Scenario => Boolean(scenario))
    .map((scenario) => ({
      id: scenario.id,
      title: personalizeReportText(scenario.title, petName, species),
      topic: personalizeReportText(scenario.topic ?? scenario.stage, petName, species),
      summary: personalizeReportText(getReportDiscussionSummaryOverride(species, scenario.id, Boolean(answers[scenario.id]?.discussionFlags?.includes("helper-details-to-confirm"))) ?? scenario.reportSummary ?? scenario.choices.find((choice) => choice.result === "correct")?.explanation ?? scenario.title, petName, species),
      knowledgePoints: knowledgePointsForScenario(scenario, petName, species),
    }));
  const discussionTopicPages = groupDiscussionTopicsForPdf(discussionTopics);
  const activeDiscussion = discussionTopics.find((topic) => topic.id === activeDiscussionId);
  const activeKnowledge = activeDiscussion;
  const completedSource = (source: MasteredCareSource) => {
    if (source.kind === "home-readiness") return homeReadinessComplete;
    if (source.kind === "room-preparation") return roomCompletion === 100 && hazardsReady.length === speciesConfig.hazards.length;
    if (source.kind === "trunk-preparation") return trunkPassed;
    if (source.kind === "arrival-meal") return arrivalMealComplete;
    if (source.kind === "scenario") return source.scenarioIds.every((scenarioId) => answers[scenarioId]?.finalResult === "correct");
    return isMasteredCareLifeStateComplete(source, lifeActivity);
  };
  const visibleMasteredCareThemes = speciesConfig.masteredCareThemes
    .filter((theme) => theme.sources.every(completedSource))
    .sort((left, right) => left.order - right.order);
  const knowledgeModal = activeKnowledge && typeof document !== "undefined"
    ? createPortal(
      <div className="knowledge-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveDiscussionId(""); }}>
        <section className="knowledge-modal" role="dialog" aria-modal="true" aria-labelledby="knowledge-modal-title">
          <button type="button" className="knowledge-modal-close" onClick={() => setActiveDiscussionId("")} aria-label="關閉知識點">×</button>
          <p className="life-stage-label">{activeKnowledge.topic}</p>
          <h2 id="knowledge-modal-title">{activeKnowledge.title}</h2>
          <p>回顧這一題較合適的照護知識點：</p>
          <ul>{activeKnowledge.knowledgePoints.map((point) => <li key={point}>{point}</li>)}</ul>
          <button type="button" className="knowledge-modal-confirm" onClick={() => setActiveDiscussionId("")}>我知道了</button>
        </section>
      </div>,
      document.body,
    )
    : null;
  const dailyCareModal = dailyCareDetailsOpen && typeof document !== "undefined"
    ? createPortal(
      <div className="knowledge-modal-backdrop daily-care-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setDailyCareDetailsOpen(false); }}>
        <section className="knowledge-modal daily-care-modal" role="dialog" aria-modal="true" aria-labelledby="daily-care-modal-title">
          <button type="button" className="knowledge-modal-close" onClick={() => setDailyCareDetailsOpen(false)} aria-label="關閉每日照護細項">×</button>
          <h2 id="daily-care-modal-title">每天留給牠的照護時間</h2>
          <p className="daily-care-modal-intro">{speciesConfig.report.dailyCareTimeNote}</p>
          <ul className="daily-care-modal-list">{speciesConfig.report.dailyCareBreakdown.map((item) => <li key={item.title}><b>{item.title}</b><span>{item.detail}</span></li>)}</ul>
          <button type="button" className="knowledge-modal-confirm" onClick={() => setDailyCareDetailsOpen(false)}>我知道了</button>
        </section>
      </div>,
      document.body,
    )
    : null;
  const activeAdditionalNote = activeAdditionalNoteIndex === null ? null : careReviewAdditionalNotes[activeAdditionalNoteIndex];
  const additionalNotesModal = activeAdditionalNote && typeof document !== "undefined"
    ? createPortal(
      <div className="knowledge-modal-backdrop care-review-notes-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveAdditionalNoteIndex(null); }}>
        <section ref={additionalNotesModalRef} className="knowledge-modal care-review-notes-modal" role="dialog" aria-modal="true" aria-labelledby="care-review-notes-modal-title" tabIndex={-1}>
          <button type="button" className="knowledge-modal-close" onClick={() => setActiveAdditionalNoteIndex(null)} aria-label="關閉照顧路上的提醒">×</button>
          <p className="life-stage-label">照顧路上的提醒</p>
          <h2 id="care-review-notes-modal-title"><HomeReadinessReviewText segments={activeAdditionalNote.title} petName={petName} species={species} /></h2>
          <div className="care-review-notes-modal-content"><CareReviewRichText blocks={activeAdditionalNote.content} petName={petName} species={species} /></div>
          <button type="button" className="knowledge-modal-confirm" onClick={() => setActiveAdditionalNoteIndex(null)}>關閉</button>
        </section>
      </div>,
      document.body,
    )
    : null;
  const homeSpaceImages = profile.homeSpaceImages.length ? profile.homeSpaceImages : (profile.homeSpaceImage ? [profile.homeSpaceImage] : []);
  const homeSpaceImageNames = profile.homeSpaceImageNames.length ? profile.homeSpaceImageNames : (profile.homeSpaceImageName ? [profile.homeSpaceImageName] : []);

  const checklistGroups = speciesConfig.report.checklistGroups;
  const handlingRows = speciesConfig.report.handlingRows;
  const consentText = profile.hasHousemates === true
    ? profile.housematesConsent === true ? "已知情並同意" : profile.housematesConsent === false ? "不同意" : "尚未確認"
    : "";
  const sensitiveHousemateText = profile.hasHousemates === true && profile.hasSensitiveHouseholdMembers ? "家中有幼童、長者、孕婦" : "";
  const pastPets = [
    profile.pastPetTypes.includes("狗") && `狗${profile.pastDogCount ? ` ${profile.pastDogCount} 隻` : ""}`,
    profile.pastPetTypes.includes("貓") && `貓${profile.pastCatCount ? ` ${profile.pastCatCount} 隻` : ""}`,
    profile.pastPetTypes.includes("其他") && (profile.pastOther || "其他"),
  ].filter(Boolean).join("、");
  const currentPets = [
    profile.currentPetTypes.includes("狗") && `狗${profile.currentDogCount ? ` ${profile.currentDogCount} 隻` : ""}`,
    profile.currentPetTypes.includes("貓") && `貓${profile.currentCatCount ? ` ${profile.currentCatCount} 隻` : ""}`,
    profile.currentPetTypes.includes("其他") && (profile.currentOther || "其他"),
  ].filter(Boolean).join("、");
  const printProfileSections = [
    {
      title: "時間與居住",
      rows: [
        profile.hoursAway !== "" && ["每天離家時間", `每日 ${profile.hoursAway} 小時`],
        profile.careHours !== "" && ["每天可投入照顧時間", `每日 ${profile.careHours} 小時`],
        profile.housing && ["居住空間", profile.housing],
        profile.housing === "租屋" && profile.landlordConsent && ["房東狀態", profile.landlordConsent],
      ].filter(Boolean) as string[][],
    },
    {
      title: "同住與活動空間",
      rows: [
        housemateStatus !== "待補充" && ["同居家人", housemateStatus],
        sensitiveHousemateText && ["特殊同住者類型", sensitiveHousemateText],
        consentText && ["同住者同意", consentText],
        activitySpace !== "待補充" && ["寵物預計活動空間", activitySpace],
      ].filter(Boolean) as string[][],
    },
    {
      title: "飼養經驗與原因",
      rows: [
        profile.noShibaExperience && [`${selectedTypeLabel}經驗`, `我沒有養過${selectedTypeLabel}`],
        pastPets && ["曾經飼養", pastPets],
        currentPets && ["目前家中有寵物", currentPets],
        profile.experienceNote && ["其他飼養經驗分享", profile.experienceNote],
        reasonStatus !== "待補充" && ["飼養原因", reasonStatus],
      ].filter(Boolean) as string[][],
    },
  ].map((section) => ({ ...section, rows: section.rows.slice(0, 6) })).filter((section) => section.rows.length > 0);

  return (
    <>
    <div className="content-wrap summary-page assessment-report compact-assessment">
      <article className="care-a4-sheet" aria-label="伴日子照顧準備總覽 A4">
        <header className="care-a4-header">
          <div>
            <p>伴日子新手村</p>
            <h1>照顧準備總覽</h1>
            <span>把這趟練習整理成你真正帶得走的照顧清單</span>
          </div>
          <aside className="care-breed-card">
            <span className="care-breed-copy">
              <b>{selectedBreed?.label ?? (petName || petNameFallback(species))}</b>
              <small>{petName.trim() || petNameFallback(species)}</small>
            </span>
            {selectedBreed?.image && <img src={selectedBreed.image} alt={selectedBreed.label} />}
          </aside>
        </header>

        <section className={`care-a4-home-readiness ${homeReadinessComplete ? "is-complete" : "is-pending"}`} aria-labelledby="care-a4-home-readiness-title">
          <h2 id="care-a4-home-readiness-title">家庭與居住確認</h2>
          {homeReadinessComplete && selectedHousing ? <><p className="care-a4-home-readiness-status">已確認</p><p>{selectedHousing.label}；<HomeReadinessReviewText segments={selectedHousing.reviewSummary} petName={petName} species={species} /></p></> : <><p className="care-a4-home-readiness-status">尚未確認</p><p><HomeReadinessReviewText segments={homeReadinessConfig.pendingReviewSummary} petName={petName} species={species} /></p></>}
        </section>

        <section className="care-a4-checklists" aria-labelledby="care-a4-checklist-title">
          <h2 id="care-a4-checklist-title">準備清單</h2>
          {checklistGroups.map((group) => (
            <div key={group.title} className="care-a4-card">
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}><span aria-hidden="true">□</span><b>{item}</b></li>)}</ul>
            </div>
          ))}
        </section>

        <section className="care-a4-table-section" aria-labelledby="care-a4-table-title">
          <h2 id="care-a4-table-title">日常照護提醒</h2>
          <div className="care-a4-table">{handlingRows.map(([situation, advice]) => <div key={situation}><b>{situation}</b><p>{advice}</p></div>)}</div>
        </section>

      </article>

      <article className="care-a4-sheet care-a4-sheet--details" aria-label="伴日子照顧準備總覽：支出與每日投入">
        <header className="care-a4-header care-a4-header--compact">
          <div>
            <p>伴日子新手村</p>
            <h1>照顧安排與支出</h1>
            <span>把迎接牠前需要留意的時間與花費，整理成一份可帶走的指南</span>
          </div>
        </header>
        <section className="care-a4-money" aria-label="預估支出">
          <h2>預估支出</h2>
          <div className="care-a4-expense-cards">
            <section className="care-a4-expense-card">
              <h3>初期準備金</h3><strong>NT$ {money.format(initialPreparationTotal)}</strong>
              <p className="care-a4-expense-summary-copy">第一次需要準備的總金額，包含：</p>
              <dl className="care-a4-expense-summary-lines">
                <div><dt>{initialPreparationBreakdown.afterArrival.label}</dt><dd>NT$ {money.format(initialPreparationBreakdown.afterArrival.total)}</dd></div>
                <div><dt>{initialPreparationBreakdown.environment.label}</dt><dd>NT$ {money.format(initialPreparationBreakdown.environment.total)}</dd></div>
                <div><dt>{initialPreparationBreakdown.departure.label}</dt><dd>NT$ {money.format(initialPreparationBreakdown.departure.total)}</dd></div>
              </dl>
            </section>
            <section className="care-a4-expense-card">
              <h3>每月預估支出</h3><strong>NT$ {money.format(monthlyBasicTotal)}／月</strong>
              <p className="care-a4-expense-summary-copy">{monthlyBasicTotal > 0 ? "每月基本照護的固定支出總額。" : "目前尚未登記項目"}</p>
            </section>
            <section className="care-a4-expense-card care-a4-expense-card--reserve">
              <h3>臨時性支出</h3><strong>{temporaryExpenseTotalLabel}</strong>
              <p className="care-a4-expense-summary-copy">{temporaryExpenses.length > 0 ? temporaryExpenseReserveNote : "目前尚未登記項目"}</p>
            </section>
          </div>
        </section>

        <section className="care-a4-daily-time" aria-label="每日投入時間">
          <h2>每日投入時間</h2>
          <b>{speciesConfig.report.dailyCareTime}</b>
          <p>{speciesConfig.report.dailyCareTimeNote}</p>
          <ul>{speciesConfig.report.dailyCareBreakdown.map((item) => <li key={item.title}><span>{item.title}</span><b>{item.detail}</b></li>)}</ul>
        </section>

        <footer className="care-a4-commitment">
          <span aria-hidden="true">{committed ? "☑" : "□"}</span>
          <p>我已閱讀以上提醒，並承諾會善盡照顧責任，持續提供合適的飲食、乾淨飲水、安全環境、日常陪伴與必要醫療，好好照顧我的寵物。</p>
        </footer>
      </article>

      {discussionTopicPages.map((topics, index) => (
        <article key={topics.map((topic) => topic.id).join("-")} className="care-a4-sheet care-a4-sheet--followup" aria-label={`伴日子知識點複習摘要 A4：${index + 1}`}>
          <header className="care-a4-header care-a4-header--compact">
            <div>
              <p>伴日子新手村</p>
              <h1>需要特別注意的照顧重點</h1>
              <span>把曾出現不同選擇的情境，整理成可再次確認的照顧觀念</span>
            </div>
          </header>
          <section className="care-a4-discussion care-a4-discussion--cards" aria-label="知識點複習摘要">
            {topics.map((topic) => <article key={topic.id} className="care-a4-discussion-card">
              <h2>{topic.topic}</h2>
              <p><b>情境：</b>{topic.summary ?? topic.title}</p>
              <div>
                <b>建議複習：</b>
                <ul>{topic.knowledgePoints.slice(0, 4).map((point) => <li key={point}><HomeReadinessReviewText segments={[{ text: point }]} petName={petName} species={species} /></li>)}</ul>
              </div>
            </article>)}
          </section>
        </article>
      ))}

      <section className="care-review-page" aria-label="你的飼養觀念回顧">
        <header className="care-review-hero">
          <div>
            <p className="life-stage-label">飼養生活回顧</p>
            <h1>你的飼養觀念回顧</h1>
            <p>回顧這次體驗中你已掌握的照顧重點，也看看哪些地方值得在真正迎接牠之前再多了解一些。</p>
          </div>
          <aside className="care-review-pet">
            <div><b>{selectedBreed?.label ?? selectedTypeLabel}</b>{petName.trim() && <span>{petName}</span>}</div>
            {selectedBreed?.image && <img src={selectedBreed.image} alt={selectedBreed.label} />}
          </aside>
        </header>

        <section className="care-review-section care-review-mastered" aria-labelledby="mastered-care-title">
          <header><span aria-hidden="true">✓</span><div><h2 id="mastered-care-title">你已建立的照顧觀念</h2><p>這些是你在情境中已經掌握、可以帶進真實生活的照顧方向。</p></div></header>
          {visibleMasteredCareThemes.length ? <div className="care-review-mastered-theme-grid">
            {visibleMasteredCareThemes.map((theme) => <article key={theme.id}>
              <span aria-hidden="true">✓</span>
              <div><b>{theme.title}</b><p><HomeReadinessReviewText segments={[{ text: theme.summary }]} petName={petName} species={species} /></p></div>
            </article>)}
          </div> : <p className="care-review-empty">完成並答對情境題後，這裡會整理你已建立的照顧觀念。</p>}
        </section>

        <section className="care-review-section care-review-followup" aria-labelledby="followup-care-title">
          <header><span aria-hidden="true">✦</span><div><h2 id="followup-care-title">建議再留意的觀念</h2><p>以下主題在體驗中曾出現不同選擇，建議在真正飼養前，再多花一些時間了解。</p></div></header>
          {discussionTopics.length ? <div className="care-review-topic-grid">
            {discussionTopics.map((topic) => <article key={topic.id}><span aria-hidden="true">✦</span><div><b>{topic.title}</b><p>{topic.summary ?? topic.topic}</p></div><button type="button" className="discussion-info-button" onClick={() => setActiveDiscussionId(topic.id)} aria-label={`查看「${topic.title}」的知識點`}><i aria-hidden="true">i</i> 查看知識點</button></article>)}
          </div> : <div className="care-review-all-clear"><span aria-hidden="true">✓</span><p>你已完成本次體驗中的所有照顧重點。正式飼養前，仍可以透過照護指南持續複習。</p></div>}
        </section>

        {careReviewAdditionalNotes.length > 0 && <section className="care-review-section care-review-notes-entry" aria-labelledby="care-review-notes-entry-title"><header><span aria-hidden="true">◌</span><div><h2 id="care-review-notes-entry-title">照顧路上的提醒</h2><p>這些是補充的照顧觀念，非每位飼主都會遇到的情況，但事先了解能幫助你在需要時更從容判斷。</p></div></header><div className="care-review-topic-grid">{careReviewAdditionalNotes.map((note, index) => <article key={`additional-note-${index}`}><span aria-hidden="true">◌</span><div><b><HomeReadinessReviewText segments={note.title} petName={petName} species={species} /></b><p><HomeReadinessReviewText segments={note.summary} petName={petName} species={species} /></p></div><button type="button" className="discussion-info-button" onClick={(event) => { additionalNotesTriggerRef.current = event.currentTarget; setActiveAdditionalNoteIndex(index); }} aria-label={`查看「${homeReadinessText(note.title, petName, species)}」的提醒細節`}><i aria-hidden="true">i</i> 查看細節</button></article>)}</div></section>}

        <section className="care-review-section care-review-resources" aria-labelledby="care-resource-title">
          <header><div><h2 id="care-resource-title">預估支出與每日投入時間</h2><p>飼養不只有金錢支出，也需要穩定安排每天的照顧時間。</p></div></header>
          <div className="care-resource-grid">
            <article className="care-resource-cost"><span aria-hidden="true">$</span><div><h3>預估支出</h3><div className="care-cost-summary"><section><small>每月預估支出</small><b>NT$ {money.format(monthlyBasicTotal)}<em>／月</em></b></section><section><small>初期準備金</small><b>NT$ {money.format(initialPreparationTotal)}</b></section></div><p>臨時性支出預留：{temporaryExpenseReserveNote}</p><button type="button" className="secondary care-expense-button" onClick={() => setExpenseDetailsOpen(true)}>查看費用細項</button></div></article>
            <article className="care-resource-time"><span aria-hidden="true">◷</span><div><h3>每日投入時間</h3><section className="care-time-summary"><small>每日約需安排</small><b>{dailyCareDurationLabel(speciesConfig.report.dailyCareTime)}</b></section><p>{speciesConfig.report.dailyCareTimeNote}</p><button type="button" className="secondary care-expense-button" onClick={() => setDailyCareDetailsOpen(true)}>查看每日照護細項</button></div></article>
          </div>
        </section>

        <section className="care-guide-download" aria-labelledby="care-guide-download-title">
          <div><span aria-hidden="true">↓</span><h2 id="care-guide-download-title">帶走你的照護指南</h2><p>將這次體驗整理成可保存的照護指南，之後準備迎接牠時也能再次查看。</p><small>內容包含：照顧準備清單、需要留意的照顧重點、預估支出、每日時間投入與照顧承諾</small></div>
          <PdfDownloadButton petName={petName} label="下載我的照護指南" />
        </section>
        <section className="care-guide-download care-guide-official" aria-labelledby="care-guide-official-title">
          <div><span aria-hidden="true">↗</span><h2 id="care-guide-official-title">農業部寵物飼養與照顧指南</h2><p>想再深入了解更詳細的飼養需求、照護方式與相關規範嗎？這裡整理了農業部的官方知識庫，提供更完整的資訊供你查閱。</p></div>
          <a className="secondary care-guide-official-link" href="https://animal.moa.gov.tw/Frontend/Know/PageTabList?TabID=31B05CB460072264BF30B852D5842398#tab1" target="_blank" rel="noopener noreferrer">查看官方指南 <span>↗</span></a>
        </section>
      </section>

      <article className="care-print-profile" aria-label="使用者填寫的個人資料">
        <header className="care-a4-header">
          <div>
            <p>個人資料</p>
            <h1>真實生活條件</h1>
            <span>僅列出你已填寫或勾選的內容</span>
          </div>
          <aside>
            <b>{petName || petNameFallback(species)}</b>
            <small>{selectedBreed?.label ?? selectedTypeLabel}</small>
          </aside>
        </header>
        <div className="print-profile-grid">
          {printProfileSections.length > 0 ? printProfileSections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <dl>{section.rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            </section>
          )) : <p className="print-empty-note">目前尚未補充真實生活條件。</p>}
        </div>
        <section className="print-home-space-photo" aria-label="居家空間照片">
          <h2>居家空間照片</h2>
          {homeSpaceImages.length ? (
            <div className="print-home-space-gallery">
              {homeSpaceImages.map((image, index) => (
                <figure key={`${homeSpaceImageNames[index] ?? "print-home-space"}-${index}`}>
                  <img src={image} alt={`使用者上傳的居家空間照片 ${index + 1}`} />
                  <figcaption>{homeSpaceImageNames[index] || `居家空間照片 ${index + 1}`}</figcaption>
                </figure>
              ))}
            </div>
          ) : <p>尚未上傳居家空間照片</p>}
        </section>
      </article>
      {expenseDetailsOpen && <ExpenseDetails expenses={expenses} breed={breed} species={species} onClose={() => setExpenseDetailsOpen(false)} />}
      {knowledgeModal}
      {dailyCareModal}
      {additionalNotesModal}
    </div>
    </>
  );
}
