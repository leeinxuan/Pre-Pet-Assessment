"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { breeds, expenseCatalog, money, roomItems } from "../../game-data";
import { arrivalMealMobilePlacements } from "../../data/species/dog/layout";
import {
  getBreedChallengeScenarios,
  getJourneyItemsForSpecies,
  getLifeScenariosForSpecies,
  dogLifeScenarios as lifeScenarios,
} from "../../data/species/journey";
import { catDailyBehaviorScenarioIds, catLitterRescueConfig } from "../../data/species/cat/journey";
import { catScenarioCorrectFeedback } from "../../data/species/cat/scenarios";
import { walkingPreloadImages, walkingPrepItems, walkingSceneLayout, walkingScenes } from "../../data/species/dog/walking";
import { dogAssets } from "../../data/species/dog/assets";
import { dogReport } from "../../data/species/dog/report";
import { catAssets } from "../../data/species/cat/assets";
import type {
  CareMember,
  ExpenseRecord,
  LifeActivityState,
  Scenario,
  ScenarioAnswer,
  ScenarioChoice,
  ScenarioResult,
} from "../../game-types";

const dogLifeAsset = (fileName: string) => `${dogAssets.life.root}/${fileName}`;
const dogDailyAsset = (fileName: string) => `${dogAssets.daily.root}/${fileName}`;

const arrivalVideoSource = dogLifeAsset("arrival-transition.mp4");
const correctAnswerVideos = [
  dogLifeAsset("correct-answer.mp4"),
  dogLifeAsset("correct-answer2.mp4"),
] as const;

const scenarioCorrectAnswerVideoIndex: Record<string, number> = {
  "arrival-adjustment": 0,
  "illness-vet": 1,
  "growing-old": 0,
  "busy-daily-care": 1,
  "cat-arrival-adjustment": 0,
  "cat-busy-care": 1,
  "cat-illness-vet": 1,
  "cat-growing-old": 0,
};

const breedChallengeVideos: Record<string, string> = {
  "一年四季都在掉毛": dogLifeAsset("shedding.mp4"),
  "颳風下雨也要出門上廁所": dogLifeAsset("rainy-day-walk.mp4"),
};

function arrivalMealPlacementStyle(kind: keyof typeof arrivalMealMobilePlacements): CSSProperties {
  const placement = arrivalMealMobilePlacements[kind];
  return {
    "--mobile-arrival-meal-left": `${placement.left}%`,
    "--mobile-arrival-meal-bottom": `${placement.bottom}%`,
    "--mobile-arrival-meal-width": `${placement.width}%`,
    "--mobile-arrival-meal-max-height": "maxHeight" in placement ? `${placement.maxHeight}%` : "none",
  } as CSSProperties;
}

function getCorrectAnswerVideo(key: number | string) {
  const index = typeof key === "number" ? key : (scenarioCorrectAnswerVideoIndex[key] ?? 0);
  return correctAnswerVideos[Math.abs(index) % correctAnswerVideos.length];
}

function posterForVideo(src: string) {
  if (src.includes("sick") || src.includes("first-day")) return dogLifeAsset("shiba-sad.png");
  if (src.includes("time-passes") || src.includes("senior")) return dogLifeAsset("shiba-dog.png");
  return dogLifeAsset("shiba-dog.png");
}

function useVideoMetadataPreload(src?: string) {
  useEffect(() => {
    if (!src || typeof document === "undefined") return;
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = src;
    video.load();
  }, [src]);
}

function withPetName(text: string, petName: string) {
  const displayName = petName.trim() || "牠";
  const withPlaceholders = text
    .replaceAll("`{petName}`", displayName)
    .replaceAll("{petName}", displayName);
  if (!petName.trim()) return withPlaceholders;
  return withPlaceholders
    .replaceAll("豆豆", displayName)
    .replaceAll("小狗", displayName)
    .replaceAll("狗狗", displayName);
}

const lifeStageLabels = {
  arrival: "適應新家與安全感",
  daily: "日常照護",
  change: "當生活發生變化",
} as const;

function breedLabelForId(breed: string) {
  return breeds.find((item) => item.id === breed)?.label ?? "這個品種";
}

function breedChallengeLabelForId(breed: string) {
  return breedLabelForId(breed).replace(/^米克斯－/, "");
}

function withBreedName(text: string, breed: string) {
  return text.replaceAll("柴犬", breedLabelForId(breed));
}

function healthSuggestionForBreed(breed: string, shibaSuggestion: string) {
  if (breed === "shiba") return shibaSuggestion;
  const breedLabel = breedLabelForId(breed);
  return `${breedLabel}也可能有需要特別留意的品種相關健康風險。健檢時請主動告知品種、來源與已知家族健康資訊，並詢問獸醫適合追蹤的項目。\n\n如果發現食慾、精神、排泄或活動狀況和平常不同，請記錄變化並尋求獸醫建議。`;
}

function lifeStageLabelForScenario(scenario: Scenario) {
  if (scenario.id === "arrival-adjustment" || scenario.id === "cat-arrival-adjustment") return lifeStageLabels.arrival;
  if (scenario.id === "busy-daily-care" || scenario.id === "illness-vet" || scenario.id === "growing-old" || scenario.id === "cat-busy-care" || scenario.id === "cat-illness-vet" || scenario.id === "cat-growing-old") return lifeStageLabels.change;
  return lifeStageLabels.daily;
}

function otherCorrectChoices(scenario: Scenario, choice: ScenarioChoice, petName: string) {
  if (choice.result !== "correct") return [];
  if (scenario.id === "busy-daily-care") {
    return [];
  }
  return scenario.choices
    .filter((entry) => entry.result === "correct" && entry.id !== choice.id)
    .filter((entry) => !(scenario.id === "busy-daily-care" && entry.id === "family-helper"))
    .slice(0, 2)
    .map((entry) => withPetName(entry.text, petName));
}

function OtherCorrectTips({ scenario, choice, petName }: { scenario: Scenario; choice: ScenarioChoice; petName: string }) {
  const tips = otherCorrectChoices(scenario, choice, petName);
  if (tips.length === 0) return null;
  if (scenario.id === "busy-daily-care") {
    return <div className="busy-care-warm-note"><b>也可以這樣做</b>{tips.map((tip) => <p key={tip}>{tip}</p>)}</div>;
  }
  return <div className="other-correct-tips"><b>也可以這樣做</b><ul>{tips.map((tip) => <li key={tip}>{tip}</li>)}</ul></div>;
}

function DelayedContinueButton({
  label = "繼續",
  onContinue,
  disabled = false,
  hint,
  immediate = false,
}: {
  label?: string;
  onContinue: () => void;
  disabled?: boolean;
  hint?: string;
  immediate?: boolean;
}) {
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    if (immediate) {
      setVisible(true);
      return;
    }
    const timer = window.setTimeout(() => setVisible(true), 3000);
    return () => window.clearTimeout(timer);
  }, [immediate]);

  return (
    <div className={`delayed-continue ${visible ? "is-visible" : "is-waiting"}`} aria-live="polite">
      <button type="button" className="primary" disabled={disabled} tabIndex={visible ? 0 : -1} aria-hidden={!visible} onClick={onContinue}>
        {label} <span>→</span>
      </button>
      {visible && disabled && hint && <small className="delayed-continue-hint">{hint}</small>}
    </div>
  );
}

function renderKnowledgeText(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).filter(Boolean).map((part, index) => (
    part.startsWith("**") && part.endsWith("**")
      ? <strong className="knowledge-emphasis" key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
      : <span key={`${part}-${index}`}>{part}</span>
  ));
}

/** 一般回饋維持自然內文；只有知識卡片才解析必要的重點標示。 */
function plainFeedbackText(text: string) {
  return text.replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1");
}

/** 犬貓回饋頁共用知識卡；情境差異由 title、icon 與內容帶入。 */
function KnowledgeCard({ title, children, className = "", icon = "💡" }: { title: string; children: ReactNode; className?: string; icon?: string }) {
  return <section className={`knowledge-card feedback-knowledge-card ${className}`.trim()}>
    <b className="feedback-knowledge-title"><span aria-hidden="true">{icon}</span>{title}</b>
    {children}
  </section>;
}

function IncorrectExplanation({ text }: { text: string }) {
  const firstSentenceEnd = text.search(/[。！？]/);
  const keyPoint = firstSentenceEnd >= 0 ? text.slice(0, firstSentenceEnd + 1) : text;
  const detail = firstSentenceEnd >= 0 ? text.slice(firstSentenceEnd + 1) : "";
  return <p className="incorrect-feedback-explanation"><strong className="incorrect-feedback-key">{keyPoint}</strong>{detail && <span>{detail}</span>}</p>;
}


function CorrectFeedbackLayout({
  variant,
  videoSrc,
  videoFailed,
  fallbackText,
  intro,
  suggestion,
  breedHighlight,
  otherTips,
  otherTipsBeforeSuggestion = false,
  correctItems,
  knowledgeTitle = "狗狗小知識",
  mediaPlaceholder,
  onReplay,
  onVideoError,
  onVideoEnded,
  onContinue,
  continueImmediately = false,
  continueDisabled = false,
  continueHint,
}: {
  variant: "single" | "multiple";
  videoSrc: string;
  videoFailed: boolean;
  fallbackText: string;
  intro: ReactNode;
  suggestion?: ReactNode;
  breedHighlight?: ReactNode;
  otherTips?: ReactNode;
  otherTipsBeforeSuggestion?: boolean;
  correctItems?: string[];
  knowledgeTitle?: string;
  mediaPlaceholder?: ReactNode;
  onReplay?: () => void;
  onVideoError: () => void;
  onVideoEnded?: () => void;
  onContinue: () => void;
  continueImmediately?: boolean;
  continueDisabled?: boolean;
  continueHint?: string;
}) {
  return (
    <section className={`correct-feedback-layout correct-feedback-layout--${variant}`} aria-live="polite">
      <div className="correct-feedback-media">
        {mediaPlaceholder ? mediaPlaceholder : videoFailed ? (
          <div className="scene-video-fallback" role="status">{fallbackText}</div>
        ) : (
          <VideoWithToggle src={videoSrc} ariaLabel="正確處置後的正向結果影片" onEnded={onVideoEnded} onError={onVideoError} />
        )}
      </div>
      <div className="correct-feedback-copy">
        <h2>做得很好！</h2>
        <div className="correct-feedback-intro">{intro}</div>
        {breedHighlight}
        {correctItems && correctItems.length > 0 && (
          <KnowledgeCard title={knowledgeTitle}>
            <ul className="daily-behavior-correct-list">
              {correctItems.map((item) => <li key={item}>{renderKnowledgeText(item)}</li>)}
            </ul>
          </KnowledgeCard>
        )}
        {otherTipsBeforeSuggestion && otherTips}
        {suggestion && <div className="correct-feedback-suggestion">{suggestion}</div>}
        {!otherTipsBeforeSuggestion && otherTips}
        <div className={`correct-feedback-actions ${onReplay ? "has-replay" : ""}`}>
          {onReplay && <button type="button" className="secondary correct-feedback-replay" onClick={onReplay}>↻ 再玩一次</button>}
          <DelayedContinueButton onContinue={onContinue} immediate={continueImmediately} disabled={continueDisabled} hint={continueHint} />
        </div>
      </div>
    </section>
  );
}

function BreedKnowledgeHighlight({ text, label = "品種小知識" }: { text: string; label?: string }) {
  const lines = text.split(/\n+/);
  // 沒有原始分段的品種知識，以分號切成短段落，避免長篇內容擠成一整塊。
  const paragraphs = lines.length > 1
    ? lines
    : text.split("；").map((paragraph, index, all) => `${paragraph}${index < all.length - 1 ? "；" : ""}`);
  return (
    <KnowledgeCard title={label} className="breed-care-reflection">
      {paragraphs.map((paragraph, index) => paragraph.trim() && <p key={`${paragraph}-${index}`}>{renderKnowledgeText(paragraph.trim())}</p>)}
    </KnowledgeCard>
  );
}

function ScenarioOptionCard({
  type = "single",
  selected = false,
  disabled = false,
  children,
  onClick,
}: {
  type?: "single" | "multiple";
  selected?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`scenario-option-card scenario-option-card--${type} ${selected ? "selected" : ""}`}
      aria-pressed={type === "multiple" ? selected : undefined}
      disabled={disabled}
      onClick={onClick}
    >
      <p>{children}</p>
    </button>
  );
}

function VideoWithToggle({
  className,
  src,
  loop = false,
  autoPlay = true,
  ariaLabel,
  onError,
  onEnded,
}: {
  className?: string;
  src: string;
  loop?: boolean;
  autoPlay?: boolean;
  ariaLabel: string;
  onError?: () => void;
  onEnded?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(!autoPlay);

  useEffect(() => {
    setPaused(!autoPlay);
  }, [autoPlay, src]);

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPaused(false)).catch(() => setPaused(true));
    } else {
      video.pause();
      setPaused(true);
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        playsInline
        preload="metadata"
        aria-label={ariaLabel}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onEnded={() => {
          setPaused(true);
          onEnded?.();
        }}
        onError={onError}
      />
      <button type="button" className="video-toggle-button" onClick={toggleVideo} aria-label={paused ? "播放影片" : "暫停影片"} title={paused ? "播放" : "暫停"}>
        {paused ? <span className="video-play-icon" aria-hidden="true" /> : <span className="video-pause-icon" aria-hidden="true" />}
      </button>
    </>
  );
}

export function ArrivalTransitionVideo({ onContinue, species = "dog" }: { onContinue: () => void; species?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasFinishedArrivalVideo = useRef(false);
  const startTimeoutRef = useRef<number | null>(null);
  const endTimeoutRef = useRef<number | null>(null);
  const onContinueRef = useRef(onContinue);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);

  useEffect(() => {
    onContinueRef.current = onContinue;
  }, [onContinue]);

  const showFinalFrame = useCallback(() => {
    if (hasFinishedArrivalVideo.current) return;
    hasFinishedArrivalVideo.current = true;
    if (startTimeoutRef.current !== null) window.clearTimeout(startTimeoutRef.current);
    videoRef.current?.pause();
    endTimeoutRef.current = window.setTimeout(() => onContinueRef.current(), 1000);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      video.pause();
      video.currentTime = 0;
      startTimeoutRef.current = window.setTimeout(showFinalFrame, 180);
      return () => {
        if (startTimeoutRef.current !== null) window.clearTimeout(startTimeoutRef.current);
      };
    }

    startTimeoutRef.current = window.setTimeout(() => {
      if (video.paused || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) setNeedsManualPlay(true);
    }, 8000);

    video.load();
    const playAttempt = video.play();
    playAttempt?.catch(() => {
      console.warn("接回家過場影片無法自動播放，已略過至飼養生活。");
      setNeedsManualPlay(true);
    });

    return () => {
      if (startTimeoutRef.current !== null) window.clearTimeout(startTimeoutRef.current);
      if (endTimeoutRef.current !== null) window.clearTimeout(endTimeoutRef.current);
    };
  }, [showFinalFrame]);

  function handlePlaying() {
    if (startTimeoutRef.current !== null) {
      window.clearTimeout(startTimeoutRef.current);
      startTimeoutRef.current = null;
    }
    setNeedsManualPlay(false);
  }

  function startVideoManually() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().then(() => setNeedsManualPlay(false)).catch(() => setNeedsManualPlay(true));
  }

  function handleArrivalEnded() {
    showFinalFrame();
  }

  function handleVideoError() {
    showFinalFrame();
  }

  const animalLabel = species === "cat" ? "貓咪" : "小狗";

  return (
    <section className="arrival-video-screen" aria-label="接回家影片過場">
      <video
        ref={videoRef}
        src={arrivalVideoSource}
        autoPlay
        playsInline
        preload="auto"
        aria-label={`${animalLabel}搭乘外出籠抵達新家的過場動畫`}
        onPlaying={handlePlaying}
        onEnded={handleArrivalEnded}
        onError={() => {
          console.warn("接回家過場影片載入失敗，已略過至飼養生活。");
          handleVideoError();
        }}
      />
      {needsManualPlay && <button type="button" className="primary arrival-video-play" onClick={startVideoManually}>播放影片</button>}
    </section>
  );
}

function stageForIndex(index: number) {
  if (index <= 0) return 3;
  if (index <= 3) return 4;
  return 6;
}

function TimePassTransition({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  const hasFinished = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => setNeedsManualPlay(true));
  }, []);

  function finish() {
    if (hasFinished.current) return;
    hasFinished.current = true;
    onComplete();
  }

  function playManually() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().then(() => setNeedsManualPlay(false)).catch(() => setNeedsManualPlay(true));
  }

  return (
    <section className="time-pass-transition" aria-label="時間流逝過場動畫">
      <video ref={videoRef} src={dogLifeAsset("time-passes-aging.mp4")} autoPlay playsInline preload="metadata" aria-label="時間流逝過場動畫" onEnded={finish} onError={() => setNeedsManualPlay(true)} />
      {needsManualPlay && <button type="button" className="time-pass-play" onClick={playManually}>播放影片</button>}
    </section>
  );
}

function ScenarioFeedback({
  scenario,
  choice,
  petName,
  onRetry,
  onContinue,
  onReplay,
  continueImmediately = false,
}: {
  scenario: Scenario;
  choice: ScenarioChoice;
  petName: string;
  onRetry: () => void;
  onContinue: () => void;
  onReplay?: () => void;
  continueImmediately?: boolean;
}) {
  const requiresRetry = [
    "arrival-adjustment",
    "illness-vet",
    "growing-old",
    "cat-arrival-adjustment",
    "cat-illness-vet",
    "cat-growing-old",
  ].includes(scenario.id);
  const [feedbackVideoFailed, setFeedbackVideoFailed] = useState(false);
  const [, setFeedbackVideoFinished] = useState(false);
  const labels = {
    correct: { icon: "✓", button: "繼續生活旅程" },
    partial: { icon: "△", button: "記住建議，繼續" },
    incorrect: { icon: "!", button: "看完建議，繼續" },
  } as const;
  const expenseChanges = (choice.expenseIds ?? []).map((id) => expenseCatalog[id]).filter(Boolean);
  if (choice.result === "correct") {
    return (
      <CorrectFeedbackLayout
        variant="single"
        videoSrc={getCorrectAnswerVideo(scenario.id)}
        videoFailed={feedbackVideoFailed}
        fallbackText="正向結果影片目前無法播放，仍可繼續生活旅程。"
        intro={<p>{plainFeedbackText(withPetName(choice.explanation, petName))}</p>}
        suggestion={choice.suggestion ? <p>{plainFeedbackText(withPetName(choice.suggestion, petName))}</p> : null}
        otherTips={<OtherCorrectTips scenario={scenario} choice={choice} petName={petName} />}
        onVideoEnded={() => setFeedbackVideoFinished(true)}
        onVideoError={() => { setFeedbackVideoFailed(true); setFeedbackVideoFinished(true); }}
        onReplay={onReplay}
        onContinue={onContinue}
        continueImmediately={continueImmediately}
      />
    );
  }
  return (
    <section className={`scenario-feedback ${choice.result}`} aria-live="polite">
      <div className="feedback-title"><span>{labels[choice.result].icon}</span><div><small>{scenario.timeLabel}</small><h2>{withPetName(choice.feedbackTitle, petName)}</h2></div></div>
      <IncorrectExplanation text={withPetName(choice.explanation, petName)} />
      <OtherCorrectTips scenario={scenario} choice={choice} petName={petName} />
      {choice.suggestion && <div className="feedback-suggestion"><b>可以這樣調整：</b><p>{withPetName(choice.suggestion, petName)}</p></div>}
      <div className="feedback-expense">
        <b>本次費用變化</b>
        {expenseChanges.length
          ? expenseChanges.map((expense) => <span key={expense.id}>{expense.name} ＋NT$ {money.format(expense.amount)}{expense.recurring ? "／月" : ""}（同一事件只登記一次）</span>)
          : <span>本次選擇沒有新增費用。</span>}
      </div>
      {scenario.reminder && <div className="law-reminder"><span>i</span><p><b>生活裡的責任提醒</b>{withPetName(scenario.reminder, petName)}</p></div>}
      <div className="feedback-actions">
        {choice.result === "incorrect" && <button className="secondary" onClick={onRetry}>重新想一次</button>}
        {(!requiresRetry || choice.result !== "incorrect") && <button className="primary" onClick={onContinue}>{scenario.id === "arrival-adjustment" || scenario.id === "cat-arrival-adjustment" ? "繼續" : labels[choice.result].button} <span>→</span></button>}
      </div>
    </section>
  );
}

function ScenarioCard({
  scenario,
  petName,
  answer,
  backupNames,
  feedbackOpen,
  onChoose,
  onRetry,
  onContinue,
  onReplay,
  continueImmediately = false,
}: {
  scenario: Scenario;
  petName: string;
  answer?: ScenarioAnswer;
  backupNames: string[];
  feedbackOpen: boolean;
  onChoose: (choice: ScenarioChoice) => void;
  onRetry: () => void;
  onContinue: () => void;
  onReplay?: () => void;
  continueImmediately?: boolean;
}) {
  const [sceneVideoFailed, setSceneVideoFailed] = useState(false);
  const scenarioVideo = scenario.id === "arrival-adjustment"
    ? { src: dogLifeAsset("first-day.mp4"), label: "小狗第一天適應新家的影片" }
    : scenario.id === "illness-vet"
      ? { src: dogLifeAsset("sick.mp4"), label: "小狗生病與就醫情境影片" }
      : null;
  useVideoMetadataPreload(scenarioVideo?.src);
  useEffect(() => setSceneVideoFailed(false), [scenario.id]);
  const selectedChoice = scenario.choices.find((choice) => choice.id === answer?.finalChoiceId);
  if (feedbackOpen && selectedChoice) {
    return <ScenarioFeedback scenario={scenario} choice={selectedChoice} petName={petName} onRetry={onRetry} onContinue={onContinue} onReplay={onReplay} continueImmediately={continueImmediately} />;
  }
  const hasBackup = backupNames.length > 0;
  return (
    <>
      <article className="scene-card">
        <div className="scene-copy">
          <p className="life-stage-label">{lifeStageLabelForScenario(scenario)}</p>
          <h1>{withPetName(scenario.title, petName)}</h1>
          <p>{withPetName(scenario.description, petName)}</p>
          {scenario.supportChoice && (
            <div className={`support-link ${hasBackup ? "ready" : "missing"}`}>
              <span>{hasBackup ? "✓" : "!"}</span>
              <p><b>{hasBackup ? `可聯絡：${backupNames.join("、")}` : "目前缺少可用的備用照顧支援"}</b>{hasBackup ? "選項會直接使用前面建立的成員與分工。" : "請先以自己完成基本照顧或評估專業服務，不會顯示不存在的成員。"}</p>
            </div>
          )}
        </div>
        <div className={`scene-art scene-${scenario.artIndex} ${scenarioVideo ? "scene-art--video" : ""}`}>
          {scenarioVideo ? (
            sceneVideoFailed
              ? <div className="scene-video-fallback" role="status">這段情境影片目前無法播放。</div>
              : <VideoWithToggle className="scene-video" src={scenarioVideo.src} loop ariaLabel={scenarioVideo.label} onError={() => setSceneVideoFailed(true)} />
          ) : <div className="scene-sprite" aria-hidden="true" />}
          <p>{scenario.timeLabel}</p>
        </div>
      </article>
      <section className="reflection">
        <h2>{scenario.id === "growing-old" ? "你會怎麼安排？" : "如果是你，會怎麼做？"}</h2>
        <div className="choice-grid">
          {scenario.choices.filter((choice) => choice.id !== "assigned-helper" || hasBackup).map((choice) => {
            const text = choice.id === "assigned-helper"
              ? `請${backupNames.join("或")}依照事先安排的分工，協助今晚的餵食與活動。`
              : withPetName(choice.text, petName);
            return <ScenarioOptionCard key={choice.id} onClick={() => onChoose(choice)}>{text}</ScenarioOptionCard>;
          })}
        </div>
      </section>
    </>
  );
}

function SeniorMedicalKnowledge() {
  return (
    <KnowledgeCard title="高齡後的長期醫療" className="senior-medical-knowledge">
      <p>高齡後，醫療不一定只是一次突發支出。健康檢查、慢性病追蹤、用藥、牙科、影像檢查與行動照護，都可能成為反覆出現的費用。</p>
    </KnowledgeCard>
  );
}

function VideoScenarioActivity({
  scenario,
  answer,
  petName,
  breed,
  onChoose,
  onCorrectComplete,
  resetSignal,
  onReplay,
  continueImmediately = false,
}: {
  scenario: Scenario;
  answer?: ScenarioAnswer;
  petName: string;
  breed: string;
  onChoose: (choice: ScenarioChoice) => void;
  onCorrectComplete: () => void;
  resetSignal: number;
  onReplay?: () => void;
  continueImmediately?: boolean;
}) {
  const [mode, setMode] = useState<"question" | "incorrect" | "positive">(answer?.finalResult === "correct" ? "positive" : answer ? "incorrect" : "question");
  const [videoFailed, setVideoFailed] = useState(false);
  const [, setVideoFinished] = useState(false);
  const isCatScenario = scenario.id.startsWith("cat-");
  const source = isCatScenario
    ? undefined
    : scenario.id === "arrival-adjustment"
    ? dogLifeAsset("first-day.mp4")
    : scenario.id === "growing-old"
      ? dogLifeAsset("senior-life.mp4")
      : dogLifeAsset("sick.mp4");
  useVideoMetadataPreload(source);
  useVideoMetadataPreload(getCorrectAnswerVideo(scenario.id));
  const selectedChoice = scenario.choices.find((choice) => choice.id === answer?.finalChoiceId);

  useEffect(() => {
    if (resetSignal <= 0) return;
    setMode("question");
    setVideoFailed(false);
    setVideoFinished(false);
  }, [resetSignal]);

  function choose(choice: ScenarioChoice) {
    onChoose(choice);
    setVideoFailed(false);
    setVideoFinished(false);
    setMode(choice.result === "correct" ? "positive" : "incorrect");
  }

  if (mode === "positive" && selectedChoice) {
    const catFeedback = isCatScenario
      ? catScenarioCorrectFeedback[scenario.id as keyof typeof catScenarioCorrectFeedback]
      : undefined;
    const breedSpecificSuggestion = scenario.id === "illness-vet" && selectedChoice.suggestion
      ? healthSuggestionForBreed(breed, selectedChoice.suggestion)
      : "";
    const [breedKnowledge = "", followupSuggestion = ""] = breedSpecificSuggestion.split("\n\n");
    const isSeniorScenario = scenario.id === "growing-old";
    return (
      <CorrectFeedbackLayout
        variant="single"
        videoSrc={getCorrectAnswerVideo(scenario.id)}
        videoFailed={videoFailed}
        fallbackText="正向結果影片目前無法播放，仍可繼續生活旅程。"
        intro={catFeedback ? <>
          <p>{withPetName(catFeedback.encouragement, petName)}</p>
          <p>{plainFeedbackText(withPetName(selectedChoice.explanation, petName))}</p>
        </> : <p>{plainFeedbackText(withPetName(selectedChoice.explanation, petName))}</p>}
        breedHighlight={breedKnowledge ? <BreedKnowledgeHighlight text={withPetName(breedKnowledge, petName)} label={`${breedLabelForId(breed)}小知識`} /> : null}
        correctItems={catFeedback ? catFeedback.knowledgePoints.map((point) => withPetName(point, petName)) : undefined}
        knowledgeTitle={catFeedback?.knowledgeTitle}
        suggestion={catFeedback ? (
          <p>{plainFeedbackText(withPetName(catFeedback.reminder, petName))}</p>
        ) : followupSuggestion ? (
          <p>{plainFeedbackText(withPetName(followupSuggestion, petName))}</p>
        ) : selectedChoice.suggestion ? (
          <p>{plainFeedbackText(withPetName(withBreedName(selectedChoice.suggestion, breed), petName))}</p>
        ) : null}
        otherTips={catFeedback ? null : isSeniorScenario ? <SeniorMedicalKnowledge /> : <OtherCorrectTips scenario={scenario} choice={selectedChoice} petName={petName} />}
        onVideoEnded={() => setVideoFinished(true)}
        onVideoError={() => { setVideoFailed(true); setVideoFinished(true); }}
        onReplay={onReplay}
        onContinue={onCorrectComplete}
        continueImmediately={continueImmediately}
      />
    );
  }

  return (
    <section className="video-scenario-activity">
      <div className="video-scenario-heading"><p className="life-stage-label">{lifeStageLabelForScenario(scenario)}</p><h1>{withPetName(withBreedName(scenario.title, breed), petName)}</h1><p>{withPetName(withBreedName(scenario.description, breed), petName)}</p></div>
      <div className="video-scenario-layout">
        <div className="video-scenario-visual">
          {source ? (
            <VideoWithToggle
              src={source}
              loop
              ariaLabel={scenario.id === "arrival-adjustment" ? "小狗第一天適應新家的影片" : scenario.id === "growing-old" ? "小狗逐漸進入高齡的情境影片" : "柴犬常見健康問題觀察影片"}
              onError={() => setVideoFailed(true)}
            />
          ) : (
            <div className="scene-video-fallback" role="status">貓咪情境素材製作中，請閱讀題目並完成右側選擇。</div>
          )}
          {videoFailed && <div className="scene-video-fallback" role="status">這段情境影片目前無法播放。</div>}
        </div>
        {mode === "incorrect" && selectedChoice ? (
          <section className="video-scenario-retry" aria-live="polite">
            <h2>這個做法可能不太適合</h2>
            <IncorrectExplanation text={withPetName(withBreedName(selectedChoice.explanation, breed), petName)} />
            {selectedChoice.suggestion && <div className="incorrect-suggestion"><b>可以這樣調整：</b><p>{withPetName(withBreedName(selectedChoice.suggestion, breed), petName)}</p></div>}
            <button type="button" className="secondary" onClick={() => setMode("question")}>重新想一次</button>
          </section>
        ) : (
          <section className="video-scenario-options"><h2>你會怎麼做？</h2>{scenario.choices.map((choice) => <ScenarioOptionCard key={choice.id} onClick={() => choose(choice)}>{withPetName(choice.text, petName)}</ScenarioOptionCard>)}</section>
        )}
      </div>
    </section>
  );
}

const dailyBehaviorScenarioIds = ["behavior-barking", "behavior-chewing", "behavior-toileting"] as const;
const dailyBehaviorVideos: Record<string, string> = {
  "behavior-barking": dogLifeAsset("barking.mp4"),
  "behavior-chewing": dogLifeAsset("chewing-on-things.mp4"),
  "behavior-toileting": dogLifeAsset("urinate-and-defecate.mp4"),
};

function DailyBehaviorActivity({
  answers,
  petName,
  onChoose,
  onContinue,
}: {
  answers: Record<string, ScenarioAnswer>;
  petName: string;
  onChoose: (scenario: Scenario, choice: ScenarioChoice) => void;
  onContinue: () => void;
}) {
  const scenarios = dailyBehaviorScenarioIds
    .map((id) => lifeScenarios.find((entry) => entry.id === id))
    .filter((entry): entry is Scenario => Boolean(entry));
  const firstUnfinished = scenarios.findIndex((entry) => answers[entry.id]?.finalResult !== "correct");
  const [currentIndex, setCurrentIndex] = useState(firstUnfinished === -1 ? scenarios.length - 1 : firstUnfinished);
  const [mode, setMode] = useState<"question" | "incorrect" | "positive">(
    firstUnfinished === -1 ? "positive" : "question",
  );
  const [videoFailed, setVideoFailed] = useState(false);
  const [, setVideoFinished] = useState(false);
  const scenario = scenarios[currentIndex];
  const selectedChoice = scenario && scenario.choices.find((choice) => choice.id === answers[scenario.id]?.finalChoiceId);

  if (!scenario) return null;
  const correctSummary = scenario.correctSummary ?? scenario.choices.filter((choice) => choice.result === "correct").map((choice) => choice.text);
  const learningPoints = scenario.learningPoints ?? correctSummary;
  const displayPetName = petName || "小狗";
  const correctIntroByScenario: Record<string, string> = {
    "behavior-barking": `面對${displayPetName}吠叫時，先理解原因再協助牠穩定下來。`,
    "behavior-chewing": `${displayPetName}亂咬常和探索、無聊、換牙或壓力有關。`,
    "behavior-toileting": `${displayPetName}的如廁習慣需要時間與一致引導。`,
  };

  function choose(choice: ScenarioChoice) {
    onChoose(scenario, choice);
    setVideoFailed(false);
    setVideoFinished(false);
    setMode(choice.result === "correct" ? "positive" : "incorrect");
  }

  function retry() {
    setMode("question");
  }

  function moveToNext() {
    if (currentIndex === scenarios.length - 1) {
      onContinue();
      return;
    }
    setCurrentIndex((value) => value + 1);
    setMode("question");
    setVideoFailed(false);
    setVideoFinished(false);
  }

  if (mode === "positive" && selectedChoice) {
    return (
      <section className="daily-behavior-positive" aria-live="polite">
        <div className="daily-behavior-positive-video">
          {videoFailed ? (
            <div className="scene-video-fallback" role="status">正向結果影片目前無法播放，仍可繼續下一段生活互動。</div>
          ) : (
            <VideoWithToggle
              src={getCorrectAnswerVideo(currentIndex)}
              ariaLabel="改善後的正向結果影片"
              onEnded={() => setVideoFinished(true)}
              onError={() => {
                setVideoFailed(true);
                setVideoFinished(true);
              }}
            />
          )}
        </div>
        <div className="daily-behavior-positive-copy">
          <h2>做得很好！</h2>
          <p>{withPetName(correctIntroByScenario[scenario.id] ?? "你選到了這個情境中幾個合適的照顧方式：", petName)}</p>
          <KnowledgeCard title="狗狗小知識">
            <ul className="daily-behavior-correct-list">
              {learningPoints.map((item) => <li key={item}>{renderKnowledgeText(withPetName(item, petName))}</li>)}
            </ul>
          </KnowledgeCard>
          <button type="button" className="primary" onClick={moveToNext}>繼續 <span>→</span></button>
        </div>
      </section>
    );
  }

  return (
    <section className="daily-behavior-activity">
      <div className="daily-behavior-head">
        <p className="life-stage-label">{lifeStageLabels.daily}</p>
        <h1>{withPetName(scenario.title, petName)}</h1>
        <p>{withPetName(scenario.description, petName)}</p>
      </div>
      <div className="daily-behavior-video">
        <VideoWithToggle
          src={dailyBehaviorVideos[scenario.id] ?? dogLifeAsset("chewing-on-things.mp4")}
          loop
          ariaLabel="小狗日常行為問題情境影片"
          onError={() => setVideoFailed(true)}
        />
        {videoFailed && <div className="scene-video-fallback" role="status">這段情境影片目前無法播放。</div>}
      </div>
      {mode === "incorrect" && selectedChoice ? (
        <section className="daily-behavior-retry" aria-live="polite">
          <h2>這個做法可能不太適合</h2>
          <IncorrectExplanation text={withPetName(selectedChoice.explanation, petName)} />
          {selectedChoice.suggestion && <div className="incorrect-suggestion"><b>可以這樣調整：</b><p>{withPetName(selectedChoice.suggestion, petName)}</p></div>}
          <button type="button" className="secondary" onClick={retry}>重新想一次</button>
        </section>
      ) : (
        <section className="reflection daily-behavior-choices">
          <h2>???????????</h2>
          <div className="choice-grid">
            {scenario.choices.map((choice) => (
              <ScenarioOptionCard key={choice.id} onClick={() => choose(choice)}>{withPetName(choice.text, petName)}</ScenarioOptionCard>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

function DailyBehaviorActivityMulti({
  answers,
  petName,
  onChooseMultiple,
  onContinue,
  resetSignal,
  onReplay,
  continueImmediately = false,
  scenarioIds = dailyBehaviorScenarioIds,
  species = "dog",
}: {
  answers: Record<string, ScenarioAnswer>;
  petName: string;
  onChooseMultiple: (scenario: Scenario, choices: ScenarioChoice[], result: ScenarioResult) => void;
  onContinue: () => void;
  resetSignal: number;
  onReplay?: () => void;
  continueImmediately?: boolean;
  scenarioIds?: readonly string[];
  species?: string;
}) {
  const scenarioSource = getLifeScenariosForSpecies(species);
  const scenarios = scenarioIds
    .map((id) => scenarioSource.find((entry) => entry.id === id))
    .filter((entry): entry is Scenario => Boolean(entry));
  const firstUnfinished = scenarios.findIndex((entry) => answers[entry.id]?.finalResult !== "correct");
  const [currentIndex, setCurrentIndex] = useState(firstUnfinished === -1 ? scenarios.length - 1 : firstUnfinished);
  const [mode, setMode] = useState<"question" | "incorrect" | "positive">(
    firstUnfinished === -1 ? "positive" : "question",
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [retryCopy, setRetryCopy] = useState<{ title: string; explanation: string; suggestion?: string } | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [, setVideoFinished] = useState(false);
  const scenario = scenarios[currentIndex];
  const behaviorVideoSource = species === "cat"
    ? dailyBehaviorVideos[scenario?.id ?? ""]
    : scenario
      ? dailyBehaviorVideos[scenario.id] ?? dogLifeAsset("chewing-on-things.mp4")
      : dogLifeAsset("chewing-on-things.mp4");
  const nextBehaviorScenario = scenarios[currentIndex + 1];
  useVideoMetadataPreload(behaviorVideoSource);
  useVideoMetadataPreload(nextBehaviorScenario ? dailyBehaviorVideos[nextBehaviorScenario.id] : undefined);
  useVideoMetadataPreload(getCorrectAnswerVideo(currentIndex));

  useEffect(() => {
    if (resetSignal <= 0) return;
    setCurrentIndex(0);
    setMode("question");
    setSelectedIds([]);
    setRetryCopy(null);
    setVideoFailed(false);
    setVideoFinished(false);
  }, [resetSignal]);

  if (!scenario) return null;

  const correctChoiceIds = scenario.requiredCorrectOptionIds ?? scenario.choices.filter((choice) => choice.result === "correct").map((choice) => choice.id);
  const wrongChoiceIds = scenario.wrongOptionIds ?? scenario.choices.filter((choice) => choice.result === "incorrect").map((choice) => choice.id);
  const correctSummary = scenario.correctSummary ?? scenario.choices
    .filter((choice) => correctChoiceIds.includes(choice.id))
    .map((choice) => choice.text);
  const learningPoints = scenario.learningPoints ?? correctSummary;
  const correctSelectedCount = selectedIds.filter((id) => correctChoiceIds.includes(id)).length;
  const displayPetName = petName || (species === "cat" ? "貓咪" : "小狗");
  const correctIntroByScenario: Record<string, string> = {
    "behavior-barking": `你已經找到合適的做法。接著多認識一點${displayPetName}吠叫時可能想傳達的需求。`,
    "behavior-chewing": `你已經找到合適的做法。接著看看狗狗為什麼需要啃咬，以及如何安全地引導${displayPetName}。`,
    "behavior-toileting": `你已經找到合適的做法。如廁不只是記住一個地點，還和${displayPetName}的年齡、時機與健康狀況有關。`,
    "cat-night-energy-care": `你已經找到合適的做法。規律遊戲與安全玩具，能讓${displayPetName}的精力有合適出口。`,
    "cat-scratching-care": `你已經找到合適的做法。提供抓板與安全高處，能讓${displayPetName}用自然方式活動。`,
    "cat-indoor-outdoor-care": `你已經找到合適的做法。尊重${displayPetName}的壓力反應，並把日常活動安排在安全室內，會比強迫外出更穩定。`,
    "cat-illness-vet": `你已經先完成觀察、紀錄、聯繫與就醫準備。這些資訊能幫助獸醫判斷，但不取代急症處置。`,
    "cat-growing-old": `你已經把高齡照護拆成環境、休息與健康追蹤三部分，讓${displayPetName}的生活能隨身體狀況調整。`,
  };

  function toggleChoice(choiceId: string) {
    setRetryCopy(null);
    const choice = scenario.choices.find((item) => item.id === choiceId);
    if (!choice) return;

    if (wrongChoiceIds.includes(choiceId) || choice.result === "incorrect") {
      const selectedChoices = scenario.choices.filter((item) => selectedIds.includes(item.id) || item.id === choice.id);
      onChooseMultiple(scenario, selectedChoices, "incorrect");
      setRetryCopy({
        title: "這個做法可能不太適合",
        explanation: choice.explanation,
        suggestion: choice.suggestion,
      });
      setMode("incorrect");
      return;
    }

    const nextIds = selectedIds.includes(choiceId) ? selectedIds.filter((id) => id !== choiceId) : [...selectedIds, choiceId];
    setSelectedIds(nextIds);
    const selectedChoices = scenario.choices.filter((item) => nextIds.includes(item.id));
    const wrongChoice = selectedChoices.find((choice) => wrongChoiceIds.includes(choice.id) || choice.result === "incorrect");
    if (wrongChoice) {
      onChooseMultiple(scenario, selectedChoices, "incorrect");
      setRetryCopy({
        title: "這個做法可能不太適合",
        explanation: wrongChoice.explanation,
        suggestion: wrongChoice.suggestion,
      });
      setMode("incorrect");
      return;
    }

    const hasEveryCorrectChoice = correctChoiceIds.every((id) => nextIds.includes(id));
    if (hasEveryCorrectChoice) {
      onChooseMultiple(scenario, selectedChoices, "correct");
      setVideoFailed(false);
      setVideoFinished(false);
      setMode("positive");
    }
  }

  function retry() {
    setRetryCopy(null);
    setMode("question");
  }

  function moveToNext() {
    if (currentIndex === scenarios.length - 1) {
      onContinue();
      return;
    }
    setCurrentIndex((value) => value + 1);
    setSelectedIds([]);
    setRetryCopy(null);
    setMode("question");
    setVideoFailed(false);
    setVideoFinished(false);
  }

  if (mode === "positive") {
    return (
      <CorrectFeedbackLayout
        variant="multiple"
        videoSrc={getCorrectAnswerVideo(currentIndex)}
        videoFailed={videoFailed}
        fallbackText="正向結果影片目前無法播放，仍可繼續生活旅程。"
        intro={<p>{withPetName(correctIntroByScenario[scenario.id] ?? "你選到了這個情境中幾個合適的照顧方式：", petName)}</p>}
        // 貓咪小知識中的「貓咪」是泛稱，不能被玩家名稱取代；只有明確的 {petName} 佔位符才套用名字。
        correctItems={learningPoints.map((item) => species === "cat"
          ? item.replaceAll("{petName}", petName || "貓咪")
          : withPetName(item, petName))}
        knowledgeTitle={species === "cat" ? "貓咪小知識" : "狗狗小知識"}
        onVideoEnded={() => setVideoFinished(true)}
        onVideoError={() => { setVideoFailed(true); setVideoFinished(true); }}
        onReplay={onReplay}
        onContinue={moveToNext}
        continueImmediately={continueImmediately}
      />
    );
  }

  return (
    <section className="daily-behavior-activity">
      <div className="daily-behavior-head">
        <p className="life-stage-label">{lifeStageLabelForScenario(scenario)}</p>
        <h1>{withPetName(scenario.title, petName)}</h1>
        <p>{withPetName(scenario.description, petName)}</p>
      </div>
      <div className="daily-behavior-video">
        {behaviorVideoSource ? (
          <VideoWithToggle
            src={behaviorVideoSource}
            loop
            ariaLabel={species === "cat" ? "貓咪日常照護影片" : "日常行為照顧影片"}
            onError={() => setVideoFailed(true)}
          />
        ) : (
          <div className="scene-video-fallback" role="status">貓咪日常照護素材製作中，請直接完成右側互動。</div>
        )}
        {videoFailed && <div className="scene-video-fallback" role="status">影片暫時無法播放，請直接完成右側互動。</div>}
      </div>
      {mode === "incorrect" && retryCopy ? (
        <section className="daily-behavior-retry" aria-live="polite">
          <h2>{retryCopy.title}</h2>
          <IncorrectExplanation text={withPetName(retryCopy.explanation, petName)} />
          {retryCopy.suggestion && <div className="incorrect-suggestion"><b>可以這樣調整：</b><p>{withPetName(retryCopy.suggestion, petName)}</p></div>}
          <button type="button" className="secondary" onClick={retry}>重新想一次</button>
        </section>
      ) : (
                                <section className="reflection daily-behavior-choices">
          <div className="daily-behavior-question-row">
            <h2>此刻需要完成哪些事？（複選）</h2>
            <p className="daily-behavior-live-hint visible daily-behavior-progress-hint" role="status">
              已找到 {correctSelectedCount} / {correctChoiceIds.length} 個合適做法
            </p>
          </div>
          <div className="choice-grid">
            {scenario.choices.map((choice) => {
              const selected = selectedIds.includes(choice.id);
              return (
                <ScenarioOptionCard key={choice.id} type="multiple" selected={selected} onClick={() => toggleChoice(choice.id)}>
                  {withPetName(choice.text, petName)}
                </ScenarioOptionCard>
              );
            })}
          </div>
        </section>
      )}
    </section>
  );
}

function BusyCareActivity({
  scenario,
  answer,
  petName,
  members,
  species = "dog",
  onMembersChange,
  onChoose,
  onContinue,
  resetSignal,
  onReplay,
  continueImmediately = false,
}: {
  scenario: Scenario;
  answer?: ScenarioAnswer;
  petName: string;
  members: CareMember[];
  species?: string;
  onMembersChange: (members: CareMember[]) => void;
  onChoose: (choice: ScenarioChoice) => void;
  onContinue: () => void;
  resetSignal: number;
  onReplay?: () => void;
  continueImmediately?: boolean;
}) {
  const [mode, setMode] = useState<"question" | "family" | "incorrect" | "positive">(answer?.finalResult === "correct" ? "positive" : "question");
  const [familyStep, setFamilyStep] = useState<"name" | "check">("name");
  const [helperName, setHelperName] = useState("");
  const [helperChecks, setHelperChecks] = useState<Record<string, "yes" | "no" | "">>({});
  const [sceneVideoFailed, setSceneVideoFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [, setVideoFinished] = useState(false);
  const isCat = species === "cat";
  const animalName = isCat ? "貓咪" : "小狗";
  const displayPetName = petName || animalName;
  const selectedChoice = scenario.choices.find((choice) => choice.id === answer?.finalChoiceId);
  const familySupportChoice = scenario.choices.find((choice) => choice.id === "family-helper");
  // 忙碌照護日常的確認題固定使用「是／否」；反向敘述用「否」才是合適答案。
  // 貓咪四題對應照護文件：日常交接、24 小時不進食警訊、緊急聯絡、動物醫院資訊。
  const helperQuestions = isCat
    ? [
      { id: "daily-care", text: `你已經向${helperName || "協助者"}說明每天需補充食水、清潔貓砂盆、巡視環境並安排短段陪玩了嗎？`, short: "每日食水、砂盆、環境巡視與陪玩還需要先交接", accepted: ["yes"] },
      { id: "food-alert", text: `我還沒有特別跟${helperName || "協助者"}說明：${displayPetName}超過 24 小時完全不進食，要立刻通知我。`, short: "24 小時完全不進食的警訊還需要先說明", accepted: ["no"] },
      { id: "emergency-contact", text: `${helperName || "協助者"}知道緊急時怎麼聯絡到你嗎？`, short: "緊急聯絡方式還需要補充確認", accepted: ["yes"] },
      { id: "vet-information", text: `你已把${displayPetName}平常就診的動物醫院聯絡方式和地址給${helperName || "協助者"}了嗎？`, short: "動物醫院的聯絡方式與地址還需要先提供", accepted: ["yes"] },
    ]
    : [
      { id: "daily-care", text: `你已經向${helperName || "協助者"}說明${displayPetName}每天的餵食、換水、排泄清理、活動與陪伴安排了嗎？`, short: "每日餵食、換水、排泄與活動安排還需要先交接", accepted: ["yes"] },
      { id: "support-confirmed", text: `我還沒有確認${helperName || "協助者"}在你忙碌時，是否真的有時間協助照顧${displayPetName}。`, short: "協助者的時間還需要先確認", accepted: ["no"] },
      { id: "care-willing", text: `${helperName || "協助者"}願意依照你的交接方式照顧${displayPetName}嗎？`, short: "協助者的意願還需要先確認", accepted: ["yes"] },
      { id: "emergency-contact", text: `${helperName || "協助者"}知道${displayPetName}出現異常或緊急狀況時怎麼聯絡你嗎？`, short: "緊急聯絡方式還需要補充確認", accepted: ["yes"] },
    ];
  const allHelperChecksAnswered = helperQuestions.every((question) => Boolean(helperChecks[question.id]));
  const unsuitableHelperReasons = helperQuestions
    .filter((question) => helperChecks[question.id] && !question.accepted.includes(helperChecks[question.id] as "yes" | "no"))
    .map((question) => question.short);
  const hasUncertainHelperCheck = unsuitableHelperReasons.length > 0;
  const shouldShowHelperUncertainty = allHelperChecksAnswered && hasUncertainHelperCheck;

  useEffect(() => {
    if (resetSignal <= 0) return;
    setMode("question");
    setFamilyStep("name");
    setHelperName("");
    setHelperChecks({});
    setSceneVideoFailed(false);
    setVideoFailed(false);
    setVideoFinished(false);
  }, [resetSignal]);

  function choose(choice: ScenarioChoice) {
    if (choice.id === "family-helper") {
      setFamilyStep("name");
      setHelperChecks({});
      setMode("family");
      return;
    }
    onChoose(choice);
    setVideoFailed(false);
    setVideoFinished(false);
    setMode(choice.result === "correct" ? "positive" : "incorrect");
  }

  function resetHelperCandidate() {
    setFamilyStep("name");
    setHelperName("");
    setHelperChecks({});
  }

  function confirmHelperCandidate() {
    if (!allHelperChecksAnswered) return;
    if (hasUncertainHelperCheck) return;
    if (!familySupportChoice) return;
    const trimmedName = helperName.trim();
    if (trimmedName && !members.some((member) => member.name.trim().toLocaleLowerCase() === trimmedName.toLocaleLowerCase())) {
      onMembersChange([...members, { id: `busy-helper-${Date.now()}`, name: trimmedName, age: null, isPlayer: false }]);
    }
    onChoose(familySupportChoice);
    setVideoFailed(false);
    setVideoFinished(false);
    setMode("positive");
  }

  if (mode === "positive" && selectedChoice) {
    return (
      <CorrectFeedbackLayout
        key={scenario.id}
        variant="single"
        videoSrc={getCorrectAnswerVideo(scenario.id)}
        videoFailed={videoFailed}
        fallbackText="正向結果影片目前無法播放，仍可繼續生活旅程。"
        intro={<p>{helperName.trim() && selectedChoice.id === "family-helper" ? `你確認了${helperName.trim()}的交接內容與緊急聯絡方式。這樣的交接才能讓${displayPetName}在你忙碌時仍獲得穩定照顧。` : plainFeedbackText(withPetName(selectedChoice.explanation, petName))}</p>}
        otherTips={<div className="busy-care-warm-note busy-care-energy-reflection">{isCat ? <><b><span aria-hidden="true">💡</span>貓咪小知識</b><p>{displayPetName}看起來獨立，仍需要穩定的食物、飲水、乾淨砂盆與安全環境。忙碌時先安排可信任的人協助，能讓牠的日常維持安心與規律。</p></> : <><p className="busy-care-slogan">在狗狗的世界裡，你就是他的全部。</p><b><span aria-hidden="true">💡</span>留給自己的一個問題</b><p>忙完一天回到家時，你還有能量陪伴等了你一整天的{displayPetName}嗎？</p></>}</div>}
        otherTipsBeforeSuggestion
        suggestion={<small>{isCat ? `交接時要說明${displayPetName}的個性、互動界線、餵食規則、砂盆清理方式、環境巡視重點與不可餵食食物，避免因不了解而造成壓力或風險。` : <>不管是請朋友或家人協助，都要清楚交接餵食、飲水、排泄清理、陪伴方式，以及如何和{displayPetName}安全互動，讓牠在你忙碌時也能被穩定照顧。</>}</small>}
        onVideoEnded={() => setVideoFinished(true)}
        onVideoError={() => { setVideoFailed(true); setVideoFinished(true); }}
        onReplay={onReplay}
        onContinue={onContinue}
        continueImmediately={continueImmediately}
      />
    );
  }

  return (
    <section className="busy-care-activity">
      <div className="busy-care-heading"><p className="life-stage-label">{lifeStageLabelForScenario(scenario)}</p><h1>{scenario.title}</h1><p>{withPetName(scenario.description, petName)}</p></div>
      <div className="busy-care-layout">
        <div className="busy-care-room" aria-label={`${animalName}在房間中等待照顧的情境`}>
          {!isCat && !sceneVideoFailed ? (
            <VideoWithToggle className="busy-care-room-video" src={dogLifeAsset("busy-daily-care.mp4")} loop ariaLabel="疲憊忙碌的日子情境影片" onError={() => setSceneVideoFailed(true)} />
          ) : (
            <>
              <img className="busy-care-room-background" src={isCat ? catAssets.life.safeRoom : dogAssets.feeding.room} alt="居家房間場景" />
              <img className="busy-care-hungry-dog" src={isCat ? catAssets.life.mixedCat : dogLifeAsset("shiba-hungry.png")} alt={`${displayPetName}在房間裡等待照顧`} />
            </>
          )}
        </div>
        {mode === "family" ? (
          <section className="busy-care-members" aria-live="polite">
            {familyStep === "name" ? (
              <>
                <div><span>協助者 1 / 2</span><h2>你會找誰幫忙？</h2><p>可以是同住家人，也可以是你信任的朋友。先寫下一個實際可聯絡的人。</p></div>
                <label className="busy-helper-name-field"><span>協助者姓名或稱呼</span><input type="text" value={helperName} placeholder="例如：姊姊、阿德" maxLength={20} onChange={(event) => setHelperName(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && helperName.trim()) setFamilyStep("check"); }} /></label>
                <div className="busy-care-member-actions"><button type="button" className="secondary" onClick={() => setMode("question")}>返回</button><button type="button" className="primary" disabled={!helperName.trim()} onClick={() => setFamilyStep("check")}>下一步，確認是否合適 <span>→</span></button></div>
              </>
            ) : (
              <>
                <div><span>協助者 2 / 2</span><h2>一起確認{helperName.trim()}是否合適</h2></div>
                <div className="busy-helper-checklist">
                  {helperQuestions.map((question, questionIndex) => (
                    <div className="busy-helper-question" role="group" aria-label={question.text} key={question.id}>
                      <p><span>{questionIndex + 1}</span><span className="busy-helper-question-text">{question.text}</span></p>
                      <div>
                        <button type="button" className={helperChecks[question.id] === "yes" ? "is-selected" : ""} aria-pressed={helperChecks[question.id] === "yes"} onClick={() => setHelperChecks((current) => ({ ...current, [question.id]: "yes" }))}>是</button>
                        <button type="button" className={helperChecks[question.id] === "no" ? "is-selected is-no" : ""} aria-pressed={helperChecks[question.id] === "no"} onClick={() => setHelperChecks((current) => ({ ...current, [question.id]: "no" }))}>否</button>
                      </div>
                    </div>
                  ))}
                </div>
                {shouldShowHelperUncertainty && (
                  <div className="busy-care-family-feedback" role="status"><b>這位協助者還有幾件事需要先確認</b><ul>{unsuitableHelperReasons.map((reason) => <li key={reason}>{reason}</li>)}</ul><p>你可以先和{helperName.trim()}談清楚，或改找另一位更適合的協助者。</p></div>
                )}
                <div className="busy-care-member-actions busy-helper-check-actions"><button type="button" className="secondary" onClick={resetHelperCandidate}>選擇其他人</button>{!shouldShowHelperUncertainty && <button type="button" className="primary" disabled={!allHelperChecksAnswered} onClick={confirmHelperCandidate}>確認這位協助者 <span>→</span></button>}</div>
              </>
            )}
          </section>
        ) : mode === "incorrect" && selectedChoice ? (
          <section className="busy-care-feedback incorrect busy-care-feedback--standard" aria-live="polite">
            <h2>這個做法可能不太適合</h2>
            <IncorrectExplanation text={withPetName(selectedChoice.explanation, petName)} />
            {selectedChoice.suggestion && <div className="incorrect-suggestion"><b>可以這樣調整：</b><p>{withPetName(selectedChoice.suggestion, petName)}</p></div>}
            <button type="button" className="secondary" onClick={() => setMode("question")}>重新想一次</button>
          </section>
        ) : (
          <section className="busy-care-options"><h2>你會怎麼安排？</h2>{scenario.choices.map((choice) => <ScenarioOptionCard key={choice.id} onClick={() => choose(choice)}>{withPetName(choice.text, petName)}</ScenarioOptionCard>)}</section>
        )}
      </div>
    </section>
  );
}

function BreedChallengeActivity({
  breed,
  petName,
  answers,
  onChoose,
  onContinue,
  resetSignal,
  onReplay,
  continueImmediately = false,
}: {
  breed: string;
  petName: string;
  answers: Record<string, ScenarioAnswer>;
  onChoose: (scenario: Scenario, choice: ScenarioChoice) => void;
  onContinue: () => void;
  resetSignal: number;
  onReplay?: () => void;
  continueImmediately?: boolean;
}) {
  const scenarios = getBreedChallengeScenarios(breed);
  const firstUnfinished = scenarios.findIndex((scenario) => answers[scenario.id]?.finalResult !== "correct");
  const [currentIndex, setCurrentIndex] = useState(firstUnfinished === -1 ? scenarios.length - 1 : firstUnfinished);
  const [mode, setMode] = useState<"question" | "incorrect" | "positive">(firstUnfinished === -1 ? "positive" : "question");
  const [feedbackVideoFailed, setFeedbackVideoFailed] = useState(false);
  const [questionVideoFailed, setQuestionVideoFailed] = useState(false);
  const scenario = scenarios[currentIndex];
  const selectedChoice = scenario?.choices.find((choice) => choice.id === answers[scenario.id]?.finalChoiceId);
  const breedLabel = breedChallengeLabelForId(breed);
  const isCatBreedChallenge = breed === "mixed-cat" || breed === "british-shorthair";
  const challengeVideoSource = scenario ? breedChallengeVideos[scenario.title] : undefined;

  useEffect(() => {
    if (resetSignal <= 0) return;
    setCurrentIndex(0);
    setMode("question");
    setFeedbackVideoFailed(false);
    setQuestionVideoFailed(false);
  }, [resetSignal]);

  useEffect(() => {
    setQuestionVideoFailed(false);
  }, [scenario?.title]);

  if (!scenario) return null;

  function choose(choice: ScenarioChoice) {
    setFeedbackVideoFailed(false);
    onChoose(scenario, choice);
    setMode(choice.result === "correct" ? "positive" : "incorrect");
  }

  function moveToNext() {
    if (currentIndex >= scenarios.length - 1) {
      onContinue();
      return;
    }
    setCurrentIndex((current) => current + 1);
    setMode("question");
    setFeedbackVideoFailed(false);
    setQuestionVideoFailed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (mode === "positive" && selectedChoice) {
    const breedKnowledge = scenario.breedKnowledge ?? `${scenario.description} ${selectedChoice.explanation}`;
    return (
      <CorrectFeedbackLayout
        key={scenario.id}
        variant="single"
        videoSrc={getCorrectAnswerVideo(scenario.id)}
        videoFailed={feedbackVideoFailed}
        fallbackText="正向結果影片目前無法播放，仍可繼續。"
        intro={<p>{plainFeedbackText(withPetName(selectedChoice.explanation, petName))}</p>}
        breedHighlight={<BreedKnowledgeHighlight text={withPetName(breedKnowledge, petName)} label={`${breedLabel}小知識`} />}
        onVideoError={() => setFeedbackVideoFailed(true)}
        onReplay={onReplay}
        onContinue={moveToNext}
        continueImmediately={continueImmediately}
      />
    );
  }

  return (
    <section className="breed-challenge-activity">
      <header className="breed-challenge-heading">
        <p className="life-stage-label">{breedLabel}的考驗</p>
        <small>先把最容易被可愛外表蓋過去的生活份量，放進你的真實日常裡想一遍。</small>
        <h1>{scenario.title}</h1>
        <div className="breed-challenge-description">{withPetName(scenario.description, petName).split(/\n{2,}/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </header>
      <div className="breed-challenge-layout">
        <div className={challengeVideoSource && !questionVideoFailed ? "breed-challenge-video-placeholder breed-challenge-video-frame" : "breed-challenge-video-placeholder"}>
          {challengeVideoSource && !questionVideoFailed ? (
            <VideoWithToggle className="breed-challenge-video" src={challengeVideoSource} loop ariaLabel={`${scenario.title}情境影片`} onError={() => setQuestionVideoFailed(true)} />
          ) : isCatBreedChallenge ? (
            <>
              <img className="breed-challenge-cat-art" src={breed === "british-shorthair" ? catAssets.life.britishShorthair : catAssets.life.mixedCat} alt={`${breedLabel}情境插圖`} />
              <b>{scenario.title}</b><p>請依情境想想最適合牠的照顧安排。</p>
            </>
          ) : (
            <><span>影片製作中</span><b>{scenario.title}</b><p>情境影片將於後續補上。</p></>
          )}
        </div>
        {mode === "incorrect" && selectedChoice ? (
          <section className="breed-challenge-retry" aria-live="polite">
            <h2>這個想法很常見，但可能還不夠</h2>
            <IncorrectExplanation text={withPetName(selectedChoice.explanation, petName)} />
            {selectedChoice.suggestion && <div className="incorrect-suggestion"><b>可以這樣調整：</b><p>{withPetName(selectedChoice.suggestion, petName)}</p></div>}
            <button type="button" className="secondary" onClick={() => setMode("question")}>重新選擇</button>
          </section>
        ) : (
          <section className="breed-challenge-options">
            <h2>你會怎麼做？</h2>
            <div>{scenario.choices.map((choice) => <ScenarioOptionCard key={choice.id} onClick={() => choose(choice)}>{withPetName(choice.text, petName)}</ScenarioOptionCard>)}</div>
          </section>
        )}
      </div>
    </section>
  );
}

const bodySignals = [
  { id: "relaxed", area: "身體姿勢", label: "放鬆", icon: "🐕", text: "身體線條柔軟、動作自然，通常代表豆豆在當下環境較有安全感。" },
  { id: "tense", area: "身體姿勢", label: "緊張", icon: "⚡", text: "喘氣、來回走動或身體緊繃可能表示壓力，需要降低刺激並保留距離。" },
  { id: "avoid", area: "身體姿勢", label: "閃躲", icon: "↩", text: "轉頭、後退或躲開是豆豆在說自己暫時不想靠近，應尊重牠的選擇。" },
  { id: "lip-lick", area: "嘴巴", label: "舔鼻子", icon: "👅", text: "在沒有食物時頻繁舔鼻子可能是壓力訊號，要一起觀察環境與其他姿勢。" },
  { id: "lowered", area: "身體姿勢", label: "身體壓低", icon: "▾", text: "身體壓低可能表示害怕或想避免衝突，這時不要從上方強迫抱起。" },
  { id: "tucked-tail", area: "尾巴", label: "尾巴夾起", icon: "〰", text: "尾巴夾在腿間常和害怕、不安有關，應減少刺激並提供退路。" },
  { id: "stiff", area: "耳朵與全身", label: "身體僵硬", icon: "!", text: "突然僵住是需要留意的重要訊號，應停止靠近並觀察豆豆需要多少距離。" },
  { id: "growl", area: "嘴巴", label: "低吼", icon: "◖", text: "低吼是小狗表達不舒服或需要距離的方式，不應立刻以責罵回應。" },
];

function BodyLanguageActivity({
  viewed,
  petName,
  onView,
  onContinue,
}: {
  viewed: string[];
  petName: string;
  onView: (id: string) => void;
  onContinue: () => void;
}) {
  const [active, setActive] = useState(viewed.at(-1) ?? "");
  const signal = bodySignals.find((item) => item.id === active);
  const complete = viewed.length === bodySignals.length;
  return (
    <section className="life-activity">
      <div className="activity-heading"><h1>看懂{petName}的身體語言</h1><p>點擊耳朵、尾巴、嘴巴與身體姿勢的訊號。沒有答對或答錯，重點是學會看見{petName}正在表達什麼。</p></div>
      <div className="signal-layout">
        <div className="signal-dog" aria-hidden="true"><span>🐕</span><i>耳朵</i><i>嘴巴</i><i>尾巴</i><i>身體姿勢</i></div>
        <div className="signal-grid">{bodySignals.map((item) => <button key={item.id} className={viewed.includes(item.id) ? "viewed" : ""} onClick={() => { setActive(item.id); onView(item.id); }}><span>{item.icon}</span><b>{item.label}</b><small>{item.area}{viewed.includes(item.id) ? " · 已閱讀" : ""}</small></button>)}</div>
      </div>
      <div className="activity-message" role="status">{signal ? <><b>{signal.label}</b><p>{withPetName(signal.text, petName)}</p></> : <p>從任一訊號開始觀察。</p>}</div>
      <div className="activity-actions"><span>{viewed.length} / {bodySignals.length} 個訊號已閱讀</span><button className="primary" disabled={!complete} onClick={onContinue}>完成身體語言練習 <span>→</span></button></div>
    </section>
  );
}

const warningSignalSegments = [
  {
    title: "牠不是無故攻擊",
    text: "一般而言，犬隻通常不是無故攻擊。當牠覺得受到威脅或不舒服時，可能會先透過表情、聲音或行動發出警告。",
  },
  {
    title: "牠正在要求距離",
    text: "有經驗的狗狗為了避免衝突，可能會先示警，也會主動拉開安全距離。這時不要繼續逼近，應慢慢退開。",
  },
  {
    title: "常見的警示反應",
    text: "指南中列出的階段性警示行為包含：撩牙、撩嘴皮、低吼、吠叫、嘶吼。這些都是需要被看見的訊號。",
  },
  {
    title: "不要責罵，先降低刺激",
    text: "看到警告訊號時，不要立刻責罵或強迫牠配合。可以慢慢拉開距離，面對著牠逐漸離開現場，讓牠有空間冷靜。",
  },
  {
    title: "先觀察，再互動",
    text: "飼主應熟悉小狗平常的行為，學會辨識牠緊張、害怕或不舒服時的表現，才能更好地照顧牠的身心狀態。",
  },
] as const;

function WarningSignalsActivity({
  viewed,
  onView,
  onContinue,
}: {
  viewed: string[];
  onView: (id: string) => void;
  onContinue: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const complete = viewed.includes("warning-signals-video");
  const [started, setStarted] = useState(complete);
  const [videoFailed, setVideoFailed] = useState(false);
  const [segmentIndex, setSegmentIndex] = useState(complete ? warningSignalSegments.length - 1 : 0);

  function startVideo() {
    setStarted(true);
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => setVideoFailed(true));
  }

  function syncSegment() {
    const video = videoRef.current;
    if (!video?.duration || !Number.isFinite(video.duration)) return;
    setSegmentIndex(Math.min(warningSignalSegments.length - 1, Math.floor((video.currentTime / video.duration) * warningSignalSegments.length)));
  }

  function finishVideo() {
    setSegmentIndex(warningSignalSegments.length - 1);
    onView("warning-signals-video");
  }

  const segment = warningSignalSegments[segmentIndex];
  return (
    <section className="life-activity warning-signals-activity">
      <div className="activity-heading">
        <h1>看懂小狗的警告訊號</h1>
        <p>有些反應不是牠故意兇，而是在告訴你：牠需要距離。</p>
      </div>
      <div className="warning-signal-layout">
        <div className="warning-signal-video-wrap">
          {!videoFailed && <video ref={videoRef} className="warning-signal-video" src="/assets/dog/pet-journey/dog-body-language.mp4" playsInline preload="metadata" aria-label="小狗警告訊號教學影片" onTimeUpdate={syncSegment} onEnded={finishVideo} onError={() => { setVideoFailed(true); finishVideo(); }} />}
          {!started && !videoFailed && <button type="button" className="warning-signal-start" onClick={startVideo} aria-label="開始播放小狗警告訊號教學影片"><span>▶</span>開始觀看</button>}
          {videoFailed && <div className="warning-signal-fallback" role="status">影片目前無法播放，仍可閱讀右側警告訊號說明。</div>}
          <span className="warning-signal-video-tag">Video</span>
        </div>
        <article className="warning-signal-copy" aria-live="polite">
          <span>{segmentIndex + 1} / {warningSignalSegments.length}</span>
          <h2>{segment.title}</h2>
          <p>{segment.text}</p>
          <small>資料依據：農業部《寵物飼養與照顧指南－犬篇》</small>
        </article>
      </div>
      {complete && <div className="warning-signal-complete" role="status">你已經看過小狗的警告訊號。下次看到類似反應時，先給牠距離，就是很重要的照顧。</div>}
      <div className="activity-actions">
        <span>{complete ? "已完成警告訊號教學" : started ? "影片播放中" : "點擊一次開始觀看"}</span>
        <button className="primary" disabled={!complete} onClick={onContinue}>繼續生活旅程 <span>→</span></button>
      </div>
    </section>
  );
}

function ArrivalMealActivity({
  activity,
  petName,
  species = "dog",
  onChange,
  onAddExpense,
  onContinue,
}: {
  activity: LifeActivityState;
  petName: string;
  species?: string;
  onChange: (patch: Partial<LifeActivityState>) => void;
  onAddExpense: (id: string) => void;
  onContinue: () => void;
}) {
  const complete = activity.arrivalMealFoodReady && activity.arrivalMealWaterReady;
  const hasRecordedMeal = useRef(false);
  const [foodWarning, setFoodWarning] = useState<{ title: string; text: string } | null>(null);
  const [unsafeFoodIds, setUnsafeFoodIds] = useState<string[]>([]);
  const isCat = species === "cat";
  const animalName = isCat ? "貓咪" : "小狗";
  const mealExpenseId = isCat ? "cat-monthly-food" : "monthly-food-main";
  const unsafeFoods = isCat
    ? [
      {
        id: "seasoned-leftovers",
        label: "調味剩菜",
        image: catAssets.feeding.seasonedLeftovers,
        title: "調味剩菜不適合貓咪",
        text: "人類剩菜可能太鹹、太油，也可能含有洋蔥、大蒜或其他不適合貓咪的成分。剛到家時請先提供合適主食與乾淨飲水。",
      },
      {
        id: "chocolate-caffeine",
        label: "巧克力",
        image: catAssets.feeding.chocolate,
        title: "這個不能給貓咪吃",
        text: "巧克力可能危害貓咪健康，也不適合作為引誘進食或安撫的食物。人類食物不一定適合貓咪，不確定食材安全性時，請查詢可靠資料或詢問獸醫。",
      },
      {
        id: "vegetables-fruits",
        label: "蔬菜／水果",
        image: catAssets.feeding.vegetablesFruit,
        title: "蔬菜／水果只能確認安全後少量提供",
        text: "有些蔬菜或水果可在確認安全後少量補充，但洋蔥、青蔥、大蒜、葡萄與葡萄乾等不適合貓咪。蔬菜／水果不應取代主食；不確定食材是否適合時，請先查詢可靠資料或詢問獸醫。",
      },
    ]
    : [
      {
        id: "macadamia",
        label: "夏威夷豆",
        image: dogLifeAsset("macadamia-nuts.png"),
        title: "這個不能給小狗吃",
        text: "常見的人類食物例如洋蔥、大蒜、巧克力、葡萄、堅果類（例如：夏威夷豆）、口香糖（含木糖醇）等，對犬隻而言可能會造成健康危害。另外，太鹹、太油或含有咖啡因的食物，也不適合犬隻食用。",
      },
      {
        id: "bones",
        label: "吃剩的骨頭",
        image: dogLifeAsset("leftover-bones.png"),
        title: "吃剩的骨頭不適合當作正餐",
        text: "許多民眾會將吃過的骨頭、便當或剩菜剩飯當作犬隻的食物來源之一，但除了必須注意犬隻的營養均衡與日食物安全適當之外，啃食骨頭或剩食中較堅硬的殘渣，可能造成犬隻口腔或消化道危害，建議避免餵食此類食物。",
      },
    ];
  useEffect(() => {
    if (!complete || hasRecordedMeal.current) return;
    hasRecordedMeal.current = true;
    onAddExpense(mealExpenseId);
  }, [complete, mealExpenseId, onAddExpense]);
  function prepareFood() {
    if (activity.arrivalMealFoodReady) return;
    setFoodWarning(null);
    onChange({ arrivalMealFoodReady: true });
  }
  function prepareWater() {
    if (activity.arrivalMealWaterReady) return;
    setFoodWarning(null);
    onChange({ arrivalMealWaterReady: true });
  }
  function warnUnsafeFood(kind: string) {
    const unsafeFood = unsafeFoods.find((item) => item.id === kind);
    if (!unsafeFood) return;
    setUnsafeFoodIds((current) => current.includes(kind) ? current : [...current, kind]);
    setFoodWarning({ title: unsafeFood.title, text: unsafeFood.text });
  }
  return (
    <section className="arrival-meal-activity" aria-label={`為${petName}準備第一餐`}>
      <div className="arrival-meal-heading">
        <p className="life-stage-label">{lifeStageLabels.arrival}</p>
        <h1>幫{petName || animalName}準備第一餐</h1>
        <p>{petName || animalName}剛到新家，還有些不安。先幫{petName || "牠"}準備合適的主食與乾淨飲水，讓牠慢慢安心下來。</p>
      </div>
      <aside className={`arrival-meal-supplies ${activity.arrivalMealFoodReady && activity.arrivalMealWaterReady ? "mobile-condensed" : ""}`} aria-label="晚餐用品">
        <div className="arrival-meal-supply-slot">
          {!activity.arrivalMealFoodReady ? (
            <button type="button" className="arrival-meal-supply-food-button" onClick={prepareFood}><img className="arrival-meal-supply-food" src={isCat ? catAssets.feeding.food : dogAssets.feeding.food} alt={isCat ? "貓主食" : "飼料"} /><span>{isCat ? "貓主食" : "飼料"}</span></button>
          ) : (
            <div className="arrival-meal-supply-placeholder" aria-hidden="true" />
          )}
        </div>
        <div className="arrival-meal-supply-slot">
          {!activity.arrivalMealWaterReady ? (
            <button type="button" onClick={prepareWater}><img className="arrival-meal-supply-water" src={isCat ? catAssets.feeding.waterBottle : dogAssets.feeding.waterBottle} alt="水瓶" /><span>水</span></button>
          ) : (
            <div className="arrival-meal-supply-placeholder" aria-hidden="true" />
          )}
        </div>
        {unsafeFoods.map((food) => (
          <button key={food.id} type="button" className={unsafeFoodIds.includes(food.id) ? "arrival-meal-unsafe warning" : "arrival-meal-unsafe"} onClick={() => warnUnsafeFood(food.id)}><span className="unsafe-food-visual"><img src={food.image} alt={food.label} />{unsafeFoodIds.includes(food.id) && <i aria-hidden="true">🚫</i>}</span><span>{food.label}</span></button>
        ))}
      </aside>
      <div className="arrival-meal-scene">
        <img className="arrival-meal-room arrival-meal-room--desktop" src={isCat ? catAssets.life.safeRoom : dogAssets.feeding.room} alt={`${animalName}的新家房間`} />
        <img className="arrival-meal-room arrival-meal-room--mobile" src={isCat ? catAssets.life.safeRoom : dogAssets.feeding.mobileRoom} alt="" />
        {foodWarning && <div className="arrival-meal-warning" role="alert">
          <button type="button" className="arrival-meal-warning-close" onClick={() => setFoodWarning(null)} aria-label="關閉不適合食物提示">×</button>
          <b>{foodWarning.title}</b>
          <p>{foodWarning.text}</p>
        </div>}
        <img className="arrival-meal-dog" style={arrivalMealPlacementStyle("dog")} src={isCat ? catAssets.life.mixedCat : complete ? dogLifeAsset("shiba-dog.png") : dogLifeAsset("shiba-sad.png")} alt={complete ? `${petName || animalName}安心地待在房間裡` : `${petName || animalName}還在等待晚餐與飲水`} />
        <img className="arrival-meal-water" style={arrivalMealPlacementStyle("water")} src={isCat ? catAssets.feeding.waterBowl : activity.arrivalMealWaterReady ? dogAssets.feeding.waterBowl : dogAssets.feeding.emptyWaterBowl} alt={activity.arrivalMealWaterReady ? "裝好水的水碗" : "空水碗"} />
        <img className="arrival-meal-food" style={arrivalMealPlacementStyle("food")} src={isCat ? catAssets.feeding.foodBowl : activity.arrivalMealFoodReady ? dogAssets.feeding.foodBowl : dogAssets.feeding.emptyFoodBowl} alt={activity.arrivalMealFoodReady ? `裝好主食的${isCat ? "食盆" : "狗碗"}` : "空食碗"} />
      </div>
      <div className="arrival-meal-footer">
        {complete && <p role="status">晚餐準備好了！合適的主食與乾淨飲水，是每天照顧的重要部分。</p>}
        <button className="primary" disabled={!complete} onClick={onContinue}>繼續生活旅程 <span>→</span></button>
      </div>
    </section>
  );
}

const careParts = [
  { id: "eyes", label: "眼睛", icon: "◉", text: "留意分泌物、紅腫或畏光，異常持續時應尋求專業協助。" },
  { id: "ears", label: "耳朵", icon: "◖", text: "觀察異味、紅腫與疼痛，不要把棉花棒深入耳道。" },
  { id: "teeth", label: "牙齒", icon: "▤", text: "使用寵物適用工具規律清潔牙齒，發現口臭或疼痛時諮詢獸醫。" },
  { id: "coat", label: "皮膚和毛髮", icon: "✦", text: "梳毛時一起觀察皮膚、腫塊、寄生蟲或持續搔癢。" },
  { id: "paws", label: "腳掌", icon: "🐾", text: "檢查腳墊、趾縫和異物，不隨意使用刺激性人用清潔用品。" },
  { id: "nails", label: "指甲", icon: "⌁", text: "留意長度與行走聲，沒有把握時請專業人員示範安全修剪。" },
];

function BodyCareActivity({ petName, viewed, onView, onContinue }: { petName: string; viewed: string[]; onView: (id: string) => void; onContinue: () => void }) {
  const [active, setActive] = useState(viewed.at(-1) ?? "");
  const part = careParts.find((item) => item.id === active);
  return (
    <section className="life-activity body-care-activity">
      <div className="activity-heading"><h1>清潔與基礎身體觀察</h1><p>依序查看{petName}的眼睛、耳朵、牙齒、皮膚毛髮、腳掌與指甲，將清潔變成每天都能做的健康觀察。</p></div>
      <div className="body-care-board"><div className="care-dog" aria-hidden="true">🐕</div><div className="care-parts">{careParts.map((item) => <button key={item.id} className={viewed.includes(item.id) ? "viewed" : ""} onClick={() => { setActive(item.id); onView(item.id); }}><span>{item.icon}</span><b>{item.label}</b><small>{viewed.includes(item.id) ? "✓ 已查看" : "點擊查看"}</small></button>)}</div></div>
      <div className="activity-message" role="status">{part ? <><b>{part.label}</b><p>{part.text}</p></> : <p>從任一部位開始查看。</p>}</div>
      <div className="activity-actions"><span>{viewed.length} / {careParts.length} 個部位已查看</span><button className="primary" disabled={viewed.length !== careParts.length} onClick={onContinue}>完成身體觀察 <span>→</span></button></div>
    </section>
  );
}

const seniorAdjustments = [
  { id: "slipmat", label: "鋪設防滑墊", icon: "▦", expenseId: "senior-slipmat" },
  { id: "easy-bed", label: "容易進出的睡墊", icon: "🛏️", expenseId: "senior-access-bed" },
  { id: "stairs", label: "減少上下樓梯", icon: "▥" },
  { id: "bowls", label: "調整食碗及水碗位置", icon: "🥣" },
  { id: "warm-rest", label: "安靜溫暖的休息空間", icon: "☀" },
  { id: "gentle-activity", label: "依身體狀況調整活動", icon: "🐾" },
];

function SeniorRoomActivity({
  roomReady,
  petName,
  selected,
  onSelect,
  onAddExpense,
  onContinue,
}: {
  roomReady: string[];
  petName: string;
  selected: string[];
  onSelect: (id: string) => void;
  onAddExpense: (id: string) => void;
  onContinue: () => void;
}) {
  const complete = selected.length === seniorAdjustments.length;
  function choose(id: string, expenseId?: string) {
    onSelect(id);
    if (!selected.includes(id) && expenseId) onAddExpense(expenseId);
  }
  return (
    <section className="life-activity senior-room-activity">
      <div className="activity-heading"><h1>改造{petName}的家</h1><p>{petName}已經走得比較慢。保留領養前準備好的房間，再加入讓高齡生活更安全、舒服的調整。</p></div>
      <div className="senior-room-layout">
        <div className="room senior-room-preview"><p>原本已放置的物品</p>{roomReady.map((id, index) => { const item = roomItems.find((entry) => entry.id === id); return item ? <span key={id} className={`senior-original item-${index % 6}`}><i>{item.icon}</i>{item.label}</span> : null; })}<b aria-hidden="true">🐕</b></div>
        <div className="senior-adjustments">{seniorAdjustments.map((item) => <button key={item.id} className={selected.includes(item.id) ? "selected" : ""} aria-pressed={selected.includes(item.id)} onClick={() => choose(item.id, item.expenseId)}><span>{item.icon}</span><b>{item.label}</b><small>{selected.includes(item.id) ? "✓ 已完成" : item.expenseId ? `加入用品 · NT$ ${money.format(expenseCatalog[item.expenseId].amount)}` : "點擊完成調整"}</small></button>)}</div>
      </div>
      <div className="activity-message" role="status"><p>{complete ? `高齡生活空間調整完成。安全與舒適會隨${petName}的身體狀況持續變化。` : `已完成 ${selected.length} / ${seniorAdjustments.length} 項調整。`}</p></div>
      <div className="activity-actions"><span>{selected.length} / {seniorAdjustments.length} 項已完成</span><button className="primary" disabled={!complete} onClick={onContinue}>完成高齡空間調整 <span>→</span></button></div>
    </section>
  );
}

function dogWalkStatus(minutes: number) {
  if (minutes >= 20) return "滿足";
  if (minutes >= 15) return "活動中";
  if (minutes >= 10) return "放鬆";
  if (minutes >= 5) return "開始探索";
  return "期待";
}

const walkingPrepNotes: Record<string, string> = {
  leash: "外出時維持安全距離，避免走失或衝突。",
  bag: "散步時清理排泄物，是對環境與他人的責任。",
  water: "天氣熱或散步時間較長時，幫狗狗補充飲水。",
};

// 點一下按鈕前進一小步；長按則以每秒固定百分比平滑前進，避免不同螢幕更新頻率造成跳動。
const walkingStep = 7;
const walkingHoldSpeed = 40;

// 貓砂盆救援隊暫用已存在的共用素材，避免缺少 /assets/cat/... 圖檔時讓 Vite/RSC 請求失敗。
// 正式貓咪素材補齊後，只需在此替換為對應的 /assets/cat/... 路徑即可。
const catLitterRescueAssets = {
  litterBox: catAssets.daily.litterBox,
  scoop: catAssets.daily.litterScoop,
} as const;

function catInspectionToken(kind: string, value: string) {
  return `${kind}:${value}`;
}

function hasCatInspectionToken(selected: string[], kind: string, value: string) {
  return selected.includes(catInspectionToken(kind, value));
}

function CatDailyInspectionActivity({
  petName,
  selected,
  onChange,
  onContinue,
}: {
  petName: string;
  selected: string[];
  onChange: (selected: string[]) => void;
  onContinue: () => void;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dragPoint, setDragPoint] = useState<{ x: number; y: number } | null>(null);
  const [carryingWaste, setCarryingWaste] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [eventWarning, setEventWarning] = useState("");
  const displayPetName = petName || "貓咪";
  const selectedTime = selected.find((item) => item.startsWith("time:"))?.replace("time:", "") as "morning" | "evening" | undefined;
  const stampCount = selected.filter((item) => item.startsWith("stamp:")).length;
  const currentRound = Math.min(stampCount + 1, catLitterRescueConfig.targetStamps);
  const roundKey = String(currentRound);
  const complete = stampCount >= catLitterRescueConfig.targetStamps;
  const wasteCleared = catLitterRescueConfig.wasteItems.every((item) => hasCatInspectionToken(selected, `discarded-${roundKey}`, item.id));
  const litterFilled = hasCatInspectionToken(selected, "litter", roundKey);
  const weeklyDue = catLitterRescueConfig.enableWeeklyWash && currentRound === catLitterRescueConfig.weeklyWashRound;
  const abnormalDue = catLitterRescueConfig.enableAbnormalObservation && currentRound === catLitterRescueConfig.abnormalObservationRound;
  const weeklySteps = ["backup", "washed", "dried", "returned"] as const;
  const weeklyStepIndex = weeklySteps.findIndex((step) => !hasCatInspectionToken(selected, "weekly", step));
  const weeklyComplete = !weeklyDue || weeklyStepIndex === -1;
  const abnormalComplete = !abnormalDue || hasCatInspectionToken(selected, "abnormal", "record-vet");
  const canStampRound = selectedTime && wasteCleared && litterFilled && weeklyComplete && abnormalComplete && !hasCatInspectionToken(selected, "stamp", roundKey);

  const addToken = useCallback((kind: string, value: string) => {
    const token = catInspectionToken(kind, value);
    if (selected.includes(token)) return;
    onChange([...selected, token]);
  }, [onChange, selected]);

  const chooseTime = (time: "morning" | "evening") => {
    const next = selected.filter((item) => !item.startsWith("time:"));
    onChange([...next, catInspectionToken("time", time)]);
    setMessage(time === "morning" ? "早上巡視開始，先看看砂盆裡需要清除的地方。" : "晚上巡視開始，睡前確認砂盆乾淨，能讓牠更安心。");
  };

  function pointerToScenePoint(event: Pick<PointerEvent | ReactPointerEvent, "clientX" | "clientY">) {
    const rect = sceneRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    };
  }

  function isInsideZone(point: { x: number; y: number }, zone: { x: number; y: number; size: number }) {
    const dx = point.x - zone.x;
    const dy = point.y - zone.y;
    return Math.sqrt(dx * dx + dy * dy) <= zone.size;
  }

  function startScoopDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!selectedTime || complete || wasteCleared) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    setDragPoint({ x: event.clientX, y: event.clientY });
    setMessage(carryingWaste ? "把鏟起的排泄物放進密封清潔桶。" : "拖曳貓砂鏟到尿團或糞便上，先把排泄物鏟起來。");
  }

  function moveScoopDrag(event: ReactPointerEvent<HTMLElement>) {
    if (!dragging) return;
    setDragPoint({ x: event.clientX, y: event.clientY });
  }

  function finishScoopDrag(event: ReactPointerEvent<HTMLElement>) {
    if (!dragging) return;
    const point = pointerToScenePoint(event);
    setDragging(false);
    setDragPoint(null);
    if (!point) return;

    if (carryingWaste) {
      if (isInsideZone(point, catLitterRescueConfig.bin)) {
        const wasteLabel = catLitterRescueConfig.wasteItems.find((item) => item.id === carryingWaste)?.label ?? "排泄物";
        addToken(`discarded-${roundKey}`, carryingWaste);
        setCarryingWaste(null);
        setMessage(`${wasteLabel}已放進密封清潔桶。`);
      } else {
        setMessage("鏟起後要放進密封清潔桶，才算完成丟棄。");
      }
      return;
    }

    const targetWaste = catLitterRescueConfig.wasteItems.find((item) => !hasCatInspectionToken(selected, `discarded-${roundKey}`, item.id) && isInsideZone(point, item));
    if (targetWaste) {
      setCarryingWaste(targetWaste.id);
      setMessage(`已鏟起${targetWaste.label}，再拖曳貓砂鏟到密封清潔桶丟棄。`);
    } else {
      setMessage("還沒有鏟到排泄物，可以再靠近尿團或糞便一點。");
    }
  }

  // 拖曳是主要操作；保留點擊作為觸控與輔助操作 fallback，避免裝置未完整派送 pointer move 時卡關。
  function pickWaste(wasteId: string) {
    if (wasteCleared || carryingWaste || hasCatInspectionToken(selected, `discarded-${roundKey}`, wasteId)) return;
    const wasteLabel = catLitterRescueConfig.wasteItems.find((item) => item.id === wasteId)?.label ?? "排泄物";
    setCarryingWaste(wasteId);
    setMessage(`已鏟起${wasteLabel}，再拖曳貓砂鏟到密封清潔桶丟棄。`);
  }

  function discardCarriedWaste() {
    if (!carryingWaste) {
      setMessage("先把尿團或糞便鏟起，再放入密封清潔桶。");
      return;
    }
    const wasteLabel = catLitterRescueConfig.wasteItems.find((item) => item.id === carryingWaste)?.label ?? "排泄物";
    addToken(`discarded-${roundKey}`, carryingWaste);
    setCarryingWaste(null);
    setMessage(`${wasteLabel}已放進密封清潔桶。`);
  }

  function chooseLitter(action: "fresh-litter" | "skip" | "perfume") {
    if (action === "fresh-litter") {
      addToken("litter", roundKey);
      setEventWarning("");
      setMessage("砂量剛好，牠可以自然掩埋排泄物，也較願意使用砂盆。");
      return;
    }
    setEventWarning(action === "skip"
      ? "砂量不足時，貓咪較難掩埋排泄物，也可能降低使用意願。"
      : "不應只靠濃香掩蓋氣味；重點是規律清除排泄物、維持乾淨砂盆，避免氣味與刺激造成貓咪排斥。");
  }

  function chooseWeeklyStep(action: "backup" | "washed" | "dried" | "returned") {
    const expected = weeklySteps[weeklyStepIndex];
    if (action === expected) {
      addToken("weekly", action);
      setEventWarning("");
      setMessage(action === "backup"
        ? "已先放好備用砂盆，等待清洗時牠仍有地方可以使用。"
        : action === "washed"
          ? "原本砂盆已移走並清洗。"
          : action === "dried"
            ? "砂盆已完全晾乾，可以準備放回。"
            : "每週清洗日完成，備用砂盆與原砂盆都安排好了。");
      return;
    }
    setEventWarning(action === "washed" && !hasCatInspectionToken(selected, "weekly", "backup")
      ? "清洗時也要保留可使用的備用砂盆，避免牠臨時找不到地方如廁。"
      : action === "returned" && !hasCatInspectionToken(selected, "weekly", "dried")
        ? "砂盆需完全晾乾再放回，避免潮濕影響使用與清潔。"
        : "每週清洗日要照順序進行，先完成前一步再繼續。");
  }

  function chooseAbnormal(action: "record-vet" | "wait" | "self-medicine") {
    if (action === "record-vet") {
      addToken("abnormal", "record-vet");
      setEventWarning("");
      setMessage("排泄習慣的明顯改變值得留意。先記錄情況並聯絡獸醫，能協助專業人員更快判斷下一步。");
      return;
    }
    setEventWarning(action === "self-medicine"
      ? "明顯排泄變化應記錄並儘速聯絡獸醫，不要自行判定原因或隨意更換藥物。"
      : "明顯排泄變化應記錄並儘速聯絡獸醫，不要自行診斷或拖延很多天。");
  }

  function stampCurrentRound() {
    if (!canStampRound) return;
    addToken("stamp", roundKey);
    setCarryingWaste(null);
    setEventWarning("");
    setMessage(currentRound >= catLitterRescueConfig.targetStamps
      ? "今天的貓砂盆巡視完成了。"
      : "做得很好，規律巡視能同時照顧環境整潔與牠的日常狀況。可以開始下一次巡視。");
  }

  const statusText = complete
    ? "今日巡視完成"
    : selectedTime
      ? `今日巡視 ${stampCount + 1} / ${catLitterRescueConfig.targetStamps}`
      : "選擇巡視時段";

  return (
    <section className="life-activity cat-inspection-activity cat-litter-rescue" onPointerMove={moveScoopDrag} onPointerUp={finishScoopDrag} onPointerCancel={finishScoopDrag}>
      <div className="activity-heading">
        <p className="life-stage-label">日常照護</p>
        <h1>貓砂盆救援隊</h1>
        <p>每天固定巡視貓砂盆，能讓{displayPetName}有乾淨、安心的如廁空間，也能及早留意排泄狀況的變化。</p>
      </div>
      {!selectedTime ? (
        <div className="cat-rescue-start">
          <h2>選擇這次巡視時段</h2>
          <p>早上或晚上都可以，重點是固定巡視、清除排泄物並觀察砂盆狀況。</p>
          <div>
            <button type="button" className="primary" onClick={() => chooseTime("morning")}>早上巡視</button>
            <button type="button" className="secondary" onClick={() => chooseTime("evening")}>晚上巡視</button>
          </div>
        </div>
      ) : complete ? (
        <div className="cat-rescue-complete">
          <span aria-hidden="true">✓</span>
          <h2>今天的貓砂盆巡視完成了</h2>
          <p>乾淨的砂盆、足夠的貓砂與日常觀察，是讓{displayPetName}安心如廁的重要照顧。</p>
          <KnowledgeCard title="貓咪小知識" className="feedback-knowledge-list">
            <ul>
              <li>每日巡視並清除排泄物。</li>
              <li>維持足夠且乾淨的貓砂。</li>
              <li>每週清洗時需使用備用砂盆，並完全晾乾後再放回。</li>
              <li>留意排泄異常，記錄後儘速聯絡獸醫。</li>
            </ul>
          </KnowledgeCard>
        </div>
      ) : (
        <>
          <div className="cat-rescue-progress" aria-label="貓砂盆巡視進度">
            <div><b>{statusText}</b><span>{selectedTime === "morning" ? "早上巡視" : "晚上巡視"}</span></div>
            <div className="cat-rescue-stamps" aria-label={`巡視印章 ${stampCount} / ${catLitterRescueConfig.targetStamps}`}>
              {Array.from({ length: catLitterRescueConfig.targetStamps }, (_, index) => <span key={index} className={index < stampCount ? "earned" : ""}>{index < stampCount ? "✓" : index + 1}</span>)}
            </div>
          </div>
          <div className="cat-rescue-layout">
            <div className="cat-rescue-scene" ref={sceneRef} aria-label="貓砂盆清潔互動場景">
              <div className="cat-rescue-background" aria-hidden="true" />
              <div className="cat-rescue-event-card">
                <b>{!wasteCleared ? "鏟除排泄物" : !litterFilled ? "檢查並補足貓砂" : weeklyDue && !weeklyComplete ? "每週清洗日" : abnormalDue && !abnormalComplete ? "排泄狀況觀察" : "巡視完成"}</b>
                <p>{!wasteCleared
                  ? "拖曳貓砂鏟，逐一鏟除尿團與糞便，再放入密封清潔桶。"
                  : !litterFilled
                    ? "清理完成後，確認砂量是否足夠讓牠自然掩埋。"
                    : weeklyDue && !weeklyComplete
                      ? "今天是每週清洗日。清洗砂盆前，先換上備用砂盆，讓牠在等待時仍有地方可以使用。"
                      : abnormalDue && !abnormalComplete
                        ? "這次巡視發現排泄明顯變少、看起來有點困難。先不要自行診斷。"
                        : "本次巡視已完成，可以領取巡視印章。"}</p>
              </div>
              <div className={`cat-rescue-litter-box${litterFilled ? " is-filled" : ""}`}>
                <img src={catLitterRescueAssets.litterBox} alt="貓砂盆" />
              </div>
              {catLitterRescueConfig.wasteItems.map((item) => !hasCatInspectionToken(selected, `discarded-${roundKey}`, item.id) && carryingWaste !== item.id ? (
                <button key={item.id} type="button" className={`cat-rescue-waste cat-rescue-waste--${item.id}`} style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.size}%`, height: `${item.size}%` }} aria-label={`鏟起${item.label}`} onClick={() => pickWaste(item.id)} />
              ) : null)}
              <button type="button" className="cat-rescue-bin" style={{ left: `${catLitterRescueConfig.bin.x}%`, top: `${catLitterRescueConfig.bin.y}%`, width: `${catLitterRescueConfig.bin.size}%`, height: `${catLitterRescueConfig.bin.size}%` }} onClick={discardCarriedWaste} aria-label="放入密封清潔桶">
                <span aria-hidden="true">▥</span>
                <b>密封清潔桶</b>
              </button>
            </div>
            <div className="cat-rescue-controls">
              {!wasteCleared ? (
                <div className="cat-rescue-tool-card">
                  <b>{carryingWaste ? "已鏟起排泄物" : "貓砂鏟"}</b>
                  <p>{carryingWaste ? "拖到密封清潔桶完成丟棄。" : "把貓砂鏟拖到尿團或糞便，再拖到密封清潔桶。"}</p>
                  <button type="button" className="cat-rescue-scoop-tool" onPointerDown={startScoopDrag} aria-label="拖曳貓砂鏟">
                    <img src={catLitterRescueAssets.scoop} alt="" />
                    <span aria-hidden="true">▱</span>
                  </button>
                </div>
              ) : !litterFilled ? (
                <div className="cat-rescue-choice-card">
                  <b>砂量狀態：不足</b>
                  <p>清理後砂量偏少，請選擇合適做法。</p>
                  <button type="button" onClick={() => chooseLitter("perfume")}>用濃香產品蓋住味道</button>
                  <button type="button" onClick={() => chooseLitter("fresh-litter")}>補入乾淨貓砂到適量</button>
                  <button type="button" onClick={() => chooseLitter("skip")}>先不補砂，等等再說</button>
                </div>
              ) : weeklyDue && !weeklyComplete ? (
                <div className="cat-rescue-choice-card">
                  <b>每週清洗日步驟</b>
                  <p>已完成 {weeklyStepIndex === -1 ? weeklySteps.length : weeklyStepIndex} / {weeklySteps.length} 步。</p>
                  <button type="button" onClick={() => chooseWeeklyStep("washed")}>直接移走原砂盆清洗</button>
                  <button type="button" onClick={() => chooseWeeklyStep("backup")}>放置備用砂盆</button>
                  <button type="button" onClick={() => chooseWeeklyStep("dried")}>讓原本砂盆完全晾乾</button>
                  <button type="button" onClick={() => chooseWeeklyStep("returned")}>原本砂盆晾乾後放回使用</button>
                </div>
              ) : abnormalDue && !abnormalComplete ? (
                <div className="cat-rescue-choice-card">
                  <b>排泄狀況異常</b>
                  <p>選擇你會如何處理這次觀察到的變化。</p>
                  <button type="button" onClick={() => chooseAbnormal("wait")}>再拖很多天看看，可能只是心情不好</button>
                  <button type="button" onClick={() => chooseAbnormal("record-vet")}>記錄時間與狀況，並儘速聯絡獸醫</button>
                  <button type="button" onClick={() => chooseAbnormal("self-medicine")}>自行判斷原因，先換藥或找偏方</button>
                </div>
              ) : (
                <div className="cat-rescue-choice-card cat-rescue-stamp-card">
                  <b>本次巡視完成</b>
                  <p>清理完成，乾淨的砂盆能讓牠更願意穩定使用。</p>
                  <button type="button" className="primary" disabled={!canStampRound} onClick={stampCurrentRound}>領取巡視印章</button>
                </div>
              )}
              {(eventWarning || message) && <div className={eventWarning ? "cat-rescue-message warning" : "cat-rescue-message"} role="status">{eventWarning || message}</div>}
            </div>
          </div>
        </>
      )}
      {dragging && dragPoint && <div className="cat-rescue-drag-ghost" style={{ left: dragPoint.x, top: dragPoint.y }} aria-hidden="true">
        <img src={catLitterRescueAssets.scoop} alt="" />
        <span>▱</span>
      </div>}
      <div className="activity-actions">
        <span>{complete ? "今日巡視已完成" : `巡視印章 ${stampCount} / ${catLitterRescueConfig.targetStamps}`}</span>
        <button className="primary" disabled={!complete} onClick={onContinue}>完成貓砂盆巡視 <span>→</span></button>
      </div>
    </section>
  );
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

type WalkingPathPoint = {
  x: number;
  y: number;
  scale: number;
};

const walkingSceneCompletionAt: Partial<Record<number, number>> = {
  // 場景 2 視覺上較早抵達終點，縮短完成距離，避免最後還要多按幾下。
  1: 80,
};

function getWalkingCompletionPosition(sceneIndex: number) {
  return walkingSceneCompletionAt[sceneIndex] ?? 100;
}

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, value));
}

function interpolateWalkingPoint(start: WalkingPathPoint, waypoint: WalkingPathPoint | undefined, end: WalkingPathPoint, progress: number, turnAt = 0.55) {
  const safeProgress = Math.max(0, Math.min(1, progress));
  const safeTurnAt = Math.max(0.05, Math.min(0.95, turnAt));
  const hasWaypoint = Boolean(waypoint);
  const segmentProgress = hasWaypoint
    ? (safeProgress <= safeTurnAt ? safeProgress / safeTurnAt : (safeProgress - safeTurnAt) / (1 - safeTurnAt))
    : safeProgress;
  const from = hasWaypoint && safeProgress > safeTurnAt ? waypoint! : start;
  const to = hasWaypoint && safeProgress <= safeTurnAt ? waypoint! : end;

  return {
    x: clampPercent(lerp(from.x, to.x, segmentProgress)),
    y: clampPercent(lerp(from.y, to.y, segmentProgress)),
    scale: Math.max(0.05, lerp(from.scale, to.scale, segmentProgress)),
  };
}

function getWalkingCharacterStyle(sceneIndex: number, position: number, mobile = false): CSSProperties {
  const layout = walkingSceneLayout[sceneIndex];
  const completionPosition = getWalkingCompletionPosition(sceneIndex);
  const progress = Math.max(0, Math.min(1, position / completionPosition));

  const start = mobile
    ? { x: layout.mobileStartX, y: layout.mobileStartY, scale: layout.mobileScale }
    : { x: layout.startX, y: layout.startY, scale: layout.scale };
  const end = mobile
    ? { x: layout.mobileEndX ?? layout.endX, y: layout.mobileEndY ?? layout.endY, scale: layout.mobileEndScale ?? layout.endScale ?? layout.scale }
    : { x: layout.endX, y: layout.endY, scale: layout.endScale ?? layout.scale };
  const waypoint = mobile ? layout.mobileWaypoint : layout.waypoint;
  const point = interpolateWalkingPoint(start, waypoint, end, progress, layout.turnAt);

  return {
    "--walk-left": `${point.x}%`,
    "--walk-top": `${point.y}%`,
    "--walk-scale": point.scale,
  } as CSSProperties;
}

function useMobileWalkingLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 720px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function WalkingActivity({
  activity,
  petName,
  onChange,
  onAddExpense,
  onContinue,
  resetSignal,
}: {
  activity: LifeActivityState;
  petName: string;
  onChange: (patch: Partial<LifeActivityState>) => void;
  onAddExpense: (id: string) => void;
  onContinue: () => void;
  resetSignal: number;
}) {
  const [started, setStarted] = useState(activity.walkingMinutes > 0 || activity.walkingComplete);
  const [safetyStep, setSafetyStep] = useState<"question" | "law" | "correct" | "prepared">(
    activity.walkingMinutes > 0 || activity.walkingComplete ? "prepared" : "question",
  );
  const [position, setPosition] = useState(0);
  const [moving, setMoving] = useState(false);
  const [message, setMessage] = useState("");
  const completingSceneRef = useRef<number | null>(null);
  const forwardAnimationFrameRef = useRef<number | null>(null);
  const forwardHoldTimerRef = useRef<number | null>(null);
  const forwardLastFrameRef = useRef<number | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const poopTargetRef = useRef<HTMLDivElement | null>(null);
  const draggingBagRef = useRef(false);
  const forwardHeldRef = useRef(false);
  const [draggedBag, setDraggedBag] = useState<{ x: number; y: number } | null>(null);
  const isMobileWalkingLayout = useMobileWalkingLayout();
  const sceneIndex = Math.min(activity.walkingSceneIndex, walkingScenes.length - 1);
  const scene = walkingScenes[sceneIndex];
  const prepared = activity.walkingPreparedItems;
  const allPrepared = walkingPrepItems.every((item) => prepared.includes(item.id));
  const needsCleanup = started && scene.poopEvent && position >= 50 && !activity.walkingPoopCleaned;
  const progressMinutes = Math.min(20, activity.walkingMinutes);
  const walkingInstruction = "按住「往前走」，陪牠一步一步往前走。散步不只是運動，也是牠探索環境、放鬆心情和練習與世界相處的時間。";
  const walkingEventMessage = scene.poopEvent && position >= 50
    ? activity.walkingPoopCleaned
      ? { title: "做得很好！", body: "散步時清理排泄物，也是照顧責任的一部分。" }
      : { title: "散步中的小事件", body: "牠在路上排泄了，先停下來幫牠清理乾淨，再繼續往前走。" }
    : null;
  const mobilePoopPlacement = walkingSceneLayout[sceneIndex]?.mobilePoop;
  const mobilePoopStyle = mobilePoopPlacement
    ? ({
      "--mobile-walk-poop-left": `${mobilePoopPlacement.x}%`,
      "--mobile-walk-poop-top": `${mobilePoopPlacement.y}%`,
      "--mobile-walk-poop-size": `${mobilePoopPlacement.size}%`,
    } as CSSProperties)
    : undefined;
  const desktopPoopPlacement = walkingSceneLayout[sceneIndex]?.poop;
  const desktopPoopStyle = desktopPoopPlacement
    ? ({
      "--walk-poop-left": `${desktopPoopPlacement.x}%`,
      "--walk-poop-top": `${desktopPoopPlacement.y}%`,
      "--walk-poop-size": `${desktopPoopPlacement.size}%`,
    } as CSSProperties)
    : undefined;

  useEffect(() => {
    walkingPreloadImages.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    if (resetSignal <= 0) return;
    setStarted(false);
    setSafetyStep("question");
    setPosition(0);
    setMoving(false);
    setMessage("");
    setDraggedBag(null);
    draggingBagRef.current = false;
    forwardHeldRef.current = false;
    if (forwardHoldTimerRef.current !== null) window.clearTimeout(forwardHoldTimerRef.current);
    forwardHoldTimerRef.current = null;
    if (forwardAnimationFrameRef.current !== null) window.cancelAnimationFrame(forwardAnimationFrameRef.current);
    forwardAnimationFrameRef.current = null;
    completingSceneRef.current = null;
  }, [resetSignal]);

  useEffect(() => {
    setPosition(0);
    setMoving(false);
    if (forwardAnimationFrameRef.current !== null) window.cancelAnimationFrame(forwardAnimationFrameRef.current);
    forwardAnimationFrameRef.current = null;
    if (forwardHoldTimerRef.current !== null) window.clearTimeout(forwardHoldTimerRef.current);
    forwardHoldTimerRef.current = null;
    forwardLastFrameRef.current = null;
    forwardHeldRef.current = false;
    draggingBagRef.current = false;
    setDraggedBag(null);
    completingSceneRef.current = null;
  }, [activity.walkingSceneIndex]);

  useEffect(() => {
    if (needsCleanup || activity.walkingComplete) stopForward();
  }, [needsCleanup, activity.walkingComplete]);

  useEffect(() => () => {
    if (forwardAnimationFrameRef.current !== null) window.cancelAnimationFrame(forwardAnimationFrameRef.current);
    if (forwardHoldTimerRef.current !== null) window.clearTimeout(forwardHoldTimerRef.current);
  }, []);

  function prepare(id: string) {
    if (prepared.includes(id)) return;
    if (id === "bag") onAddExpense("monthly-waste-bags");
    onChange({ walkingPreparedItems: [...prepared, id] });
    setMessage("");
  }

  function startWalk() {
    if (!prepared.includes("leash")) {
      setMessage("外出活動需要適當防護措施，牽繩或胸背帶能避免走失、驚嚇衝出，也能保護牠和其他人。");
      return;
    }
    if (!allPrepared) {
      setMessage("出門前也要準備撿便袋和水，讓散步更安心。");
      return;
    }
    setStarted(true);
    setMessage("");
  }

  function completeWalkingScene(completedIndex: number) {
    if (completingSceneRef.current === completedIndex) return;
    completingSceneRef.current = completedIndex;
    stopForward(false);
    const complete = completedIndex >= walkingScenes.length - 1;
    const nextMinutes = Math.min(20, activity.walkingMinutes + 5);
    onChange({
      walkingMinutes: nextMinutes,
      walkingSceneIndex: complete ? completedIndex : completedIndex + 1,
      walkingComplete: complete,
    });
    setMessage(complete ? "散步時間達到 20 分鐘！" : `完成「${walkingScenes[completedIndex].title}」，散步時間 +5 分鐘。`);
  }

  const advanceWalk = useCallback((distance: number) => {
    if (!started || activity.walkingComplete) return;
    if (needsCleanup) {
      setMessage("先把排泄物清理乾淨，再繼續散步。");
      setMoving(false);
      return;
    }
    const completionPosition = getWalkingCompletionPosition(sceneIndex);
    setMoving(true);
    setPosition((current) => {
      if (scene.poopEvent && current >= 50 && !activity.walkingPoopCleaned) {
        stopForward();
        return 50;
      }
      const next = Math.min(completionPosition, current + distance);
      if (next >= completionPosition && current < completionPosition && completingSceneRef.current !== sceneIndex) {
        completeWalkingScene(sceneIndex);
      }
      return next;
    });
  }, [activity.walkingComplete, activity.walkingPoopCleaned, activity.walkingMinutes, needsCleanup, onChange, scene.poopEvent, sceneIndex, started]);

  function stopForward(releaseHold = true) {
    if (releaseHold) forwardHeldRef.current = false;
    if (forwardHoldTimerRef.current !== null) window.clearTimeout(forwardHoldTimerRef.current);
    forwardHoldTimerRef.current = null;
    if (forwardAnimationFrameRef.current !== null) window.cancelAnimationFrame(forwardAnimationFrameRef.current);
    forwardAnimationFrameRef.current = null;
    forwardLastFrameRef.current = null;
    setMoving(false);
  }

  function startForward() {
    if (!started || activity.walkingComplete || needsCleanup) {
      if (needsCleanup) setMessage("先把排泄物清理乾淨，再繼續散步。");
      return;
    }
    if (forwardHeldRef.current || forwardHoldTimerRef.current !== null) return;
    // 短按只前進一步；超過門檻才啟動唯一的 rAF 連續移動迴圈。
    advanceWalk(walkingStep);
    const moveFrame = (timestamp: number) => {
      if (!forwardHeldRef.current) return;
      const previousTimestamp = forwardLastFrameRef.current ?? timestamp;
      const deltaSeconds = Math.min(0.05, Math.max(0, timestamp - previousTimestamp) / 1000);
      forwardLastFrameRef.current = timestamp;
      if (deltaSeconds > 0) advanceWalk(walkingHoldSpeed * deltaSeconds);
      if (forwardHeldRef.current) forwardAnimationFrameRef.current = window.requestAnimationFrame(moveFrame);
    };
    forwardHoldTimerRef.current = window.setTimeout(() => {
      forwardHoldTimerRef.current = null;
      forwardHeldRef.current = true;
      forwardLastFrameRef.current = null;
      forwardAnimationFrameRef.current = window.requestAnimationFrame(moveFrame);
    }, 220);
  }

  const draggedBagSize = 74;

  function getDraggedBagPosition(event: ReactPointerEvent<HTMLButtonElement>) {
    const sceneRect = sceneRef.current?.getBoundingClientRect();
    if (!sceneRect) return null;
    return {
      x: event.clientX - sceneRect.left - draggedBagSize / 2,
      y: event.clientY - sceneRect.top - draggedBagSize / 2,
    };
  }

  function startDraggingBag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!needsCleanup) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const nextPosition = getDraggedBagPosition(event);
    if (nextPosition) {
      draggingBagRef.current = true;
      setDraggedBag(nextPosition);
    }
  }

  function dragBag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!draggingBagRef.current) return;
    event.preventDefault();
    const nextPosition = getDraggedBagPosition(event);
    if (nextPosition) setDraggedBag(nextPosition);
  }

  function finishDraggingBag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!draggingBagRef.current) return;
    event.preventDefault();
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    const finalBagPosition = getDraggedBagPosition(event) ?? draggedBag;
    if (!finalBagPosition) {
      draggingBagRef.current = false;
      setDraggedBag(null);
      return;
    }
    const sceneRect = sceneRef.current?.getBoundingClientRect();
    const poopRect = poopTargetRef.current?.getBoundingClientRect();
    const tolerance = 58;
    const bagRect = {
      left: finalBagPosition.x,
      top: finalBagPosition.y,
      right: finalBagPosition.x + draggedBagSize,
      bottom: finalBagPosition.y + draggedBagSize,
      centerX: finalBagPosition.x + draggedBagSize / 2,
      centerY: finalBagPosition.y + draggedBagSize / 2,
    };
    const hitPoop = sceneRect && poopRect
      ? (
        bagRect.centerX >= poopRect.left - sceneRect.left - tolerance &&
        bagRect.centerX <= poopRect.right - sceneRect.left + tolerance &&
        bagRect.centerY >= poopRect.top - sceneRect.top - tolerance &&
        bagRect.centerY <= poopRect.bottom - sceneRect.top + tolerance
      ) || (
        bagRect.right >= poopRect.left - sceneRect.left - tolerance &&
        bagRect.left <= poopRect.right - sceneRect.left + tolerance &&
        bagRect.bottom >= poopRect.top - sceneRect.top - tolerance &&
        bagRect.top <= poopRect.bottom - sceneRect.top + tolerance
      )
      : false;

    draggingBagRef.current = false;
    setDraggedBag(null);
    if (hitPoop) cleanupPoop();
  }

  function cancelDraggingBag() {
    draggingBagRef.current = false;
    setDraggedBag(null);
  }

  function cleanupPoop() {
    stopForward();
    draggingBagRef.current = false;
    setDraggedBag(null);
    onChange({ walkingPoopCleaned: true });
    setMessage("已清理完成，繼續陪牠往前走。");
  }

  const renderWalkingEventCard = (className = "") => walkingEventMessage ? (
    <div className={`walking-event-card ${className}`} role="status">
      <b>{walkingEventMessage.title}</b>
      <p>{walkingEventMessage.body}</p>
      {needsCleanup && (
        <div className="walking-drag-row">
          <button
            type="button"
            className={`walking-drag-bag ${draggedBag ? "is-source-dragging" : ""}`}
            onPointerDown={startDraggingBag}
            onPointerMove={dragBag}
            onPointerUp={finishDraggingBag}
            onPointerCancel={cancelDraggingBag}
            aria-label="拖曳撿便袋清理排泄物"
          >
            <img src={dogDailyAsset("poop-bag-1.png")} alt="" />
          </button>
          <p className="walking-drag-instruction">拖曳撿便袋到便便的位置完成清理。</p>
        </div>
      )}
    </div>
  ) : null;

  if (activity.walkingComplete) {
    return (
      <section className="walking-activity walking-complete">
        <div className="walking-complete-card">
          <h1>每天，都要一起走出去</h1>
          <p>你陪{petName}完成了今天的散步，也記得為牠清理排泄物。</p>
          <p>規律散步讓牠能探索環境、嗅聞、活動身體，也有助於維持生理與心理健康。</p>
          <div className="walking-reflection-note"><b>把每天的照顧，想成長長的日常</b><p>散步只是照顧牠的一部分。餵食、換水、清潔、互動、觀察狀況與安靜陪伴，都會反覆出現在每一天裡。晴天、下雨、疲累或工作忙碌時，牠仍需要你留下一段穩定的時間。請想一想：你願意怎麼安排自己的生活，長期陪牠好好長大、變老？</p></div>
          <section className="walking-time-summary" aria-label="養狗每日基本照護時間估計">
            <p>每天留給牠的照護時間</p>
            <div className="walking-time-commitment">
              {dogReport.dailyCareBreakdown.map((item) => <div key={item.title}><b>{item.title}</b><span>{item.detail}</span></div>)}
            </div>
          </section>
          <DelayedContinueButton label="繼續生活旅程" onContinue={onContinue} />
        </div>
      </section>
    );
  }

  return (
    <section className="walking-activity" aria-label="今天也要出門散步">
      <div className="walking-head">
        <div>
          <p className="life-stage-label">{lifeStageLabels.daily}</p>
          <h1>今天也要出門散步</h1>
          {!started && safetyStep === "question" && <p>出門前，先選出你認為能兼顧安全與探索的散步方式。</p>}
          {!started && safetyStep !== "question" && <p>一天的照顧不只是在家餵食和陪伴，狗狗也需要規律外出活動。散步能讓牠探索環境、消耗體力、練習社會化，也有機會完成排泄。</p>}
        </div>
      </div>

      {!started ? (
        safetyStep === "question" ? (
          <section className="walking-safety-choice" aria-labelledby="walking-safety-title">
            <h2 id="walking-safety-title">你會用哪一種方式陪牠散步？</h2>
            <div className="walking-safety-grid">
              <button type="button" onClick={() => setSafetyStep("correct")}>
                <img src={dogDailyAsset("leash-choice.png")} alt="飼主使用胸背與牽繩，保持鬆繩讓柴犬嗅聞環境" />
                <span><b>繫好牽繩，保持鬆弛</b><small>讓狗狗在可控距離內嗅聞、探索環境。</small></span>
              </button>
              <button type="button" onClick={() => setSafetyStep("law")}>
                <img src={dogDailyAsset("off-leash-choice.png")} alt="沒有牽繩的柴犬離飼主一段距離自行探索" />
                <span><b>不繫牽繩，讓牠自己走</b><small>讓狗狗自由自在探索，飼主在後方跟著。</small></span>
              </button>
            </div>
          </section>
        ) : safetyStep === "law" ? (
          <section className="walking-law-feedback" aria-live="polite">
            <span aria-hidden="true">!</span>
            <div><p className="life-stage-label">外出安全與法規提醒</p><h2>自由探索，也需要有能立即保護牠的距離</h2></div>
            <p>《動物保護法》第 20 條要求寵物出入公共場所時須有人伴同；各縣市也可能以自治規範要求使用牽繩、箱籠或其他適當防護措施。外出前應查明所在地規定。</p>
            <p>即使在沒有明確禁止的地點，牽繩仍能降低走失、突然衝向車道、驚嚇他人或與其他動物衝突的風險。保持牽繩鬆弛，狗狗仍然可以嗅聞和探索。</p>
            <button type="button" className="secondary" onClick={() => setSafetyStep("question")}>回去重新選擇</button>
          </section>
        ) : safetyStep === "correct" ? (
          <section className="walking-law-feedback walking-law-feedback--correct" aria-live="polite">
            <span aria-hidden="true">✓</span>
            <div><p className="life-stage-label">你選得很好</p><h2>牽繩不是限制探索，而是讓探索更安全</h2></div>
            <p>繫好合適的胸背帶或項圈並保持牽繩鬆弛，狗狗仍然可以嗅聞、觀察環境；遇到車輛、陌生動物或突然受驚時，你也能及時控制距離，降低走失與衝突風險。</p>
            <p>《動物保護法》第 20 條要求寵物出入公共場所時須有人伴同，各縣市也可能要求使用牽繩、箱籠或其他適當防護措施。因此另一個「不繫牽繩」的選項，即使看似自由，也不是安全的散步方式。</p>
            <button type="button" className="primary" onClick={() => setSafetyStep("prepared")}>繼續準備散步用品 <span>→</span></button>
          </section>
        ) : (
        <div className="walking-prep">
          <section className="walking-prep-supplies" aria-label="出門前準備用品">
            <h2>出門前，先確認這些東西</h2>
            <p className="walking-safety-confirmed">✓ 已選擇牽繩陪伴，讓探索保持在安全範圍內。</p>
            <div className="walking-prep-list">
              {walkingPrepItems.map((item) => {
                const done = prepared.includes(item.id);
                return (
                  <button type="button" key={item.id} className={done ? "prepared" : ""} aria-pressed={done} onClick={() => prepare(item.id)}>
                    <img src={item.image} alt={item.label} />
                    <b>{item.label}</b>
                    <small>{walkingPrepNotes[item.id]}</small>
                  </button>
                );
              })}
            </div>
          </section>
          <div className="walking-prep-card">
            <h2>準備好再出門</h2>
            <p>確認牽繩、撿便袋和水都準備好後，就可以陪牠走一段 20 分鐘的散步路線。路上如果牠排泄，也要記得停下來清理。</p>
            {message && <p className="walking-message" role="alert">{message}</p>}
            <div className="walking-prep-actions">
              <button type="button" className="primary" disabled={!allPrepared} onClick={startWalk}>開始散步 <span>→</span></button>
            </div>
          </div>
        </div>)
      ) : (
        <div className="walking-game">
          <p className="walking-game-hint">{walkingInstruction}</p>
          <div className="walking-scene-shell">
          <div
            className={`walking-scene ${moving ? "is-moving" : ""}`}
            ref={sceneRef}
            tabIndex={0}
            aria-label="散步場景，按往前走按鈕前進"
          >
            <div className="walking-progress walking-progress-overlay" aria-label={`散步進度 ${progressMinutes} / 20 分鐘`}>
              <b>散步進度</b>
              <div><span style={{ width: `${(progressMinutes / 20) * 100}%` }} /></div>
              <small>{progressMinutes} / 20 分鐘</small>
            </div>
            <picture>
              <source media="(max-width: 720px)" srcSet={scene.mobileImage} />
              <img className="walking-bg" src={scene.image} alt={scene.title} />
            </picture>
            {draggedBag && (
              <img
                className="walking-drag-bag-ghost"
                src={dogDailyAsset("poop-bag-1.png")}
                alt=""
                aria-hidden="true"
                style={{ left: draggedBag.x, top: draggedBag.y }}
              />
            )}
            <div className="walking-character" style={getWalkingCharacterStyle(sceneIndex, position, isMobileWalkingLayout)}>
              <img
                src={activity.walkingPoopCleaned ? dogDailyAsset("walker-dog-bag.png") : needsCleanup ? dogDailyAsset("walker-and-dog-poop.png") : dogDailyAsset("walker-and-dog.png")}
                alt={`正在和${petName}散步的人物與小狗`}
              />
            </div>
            {needsCleanup && (
              <div
                className={isMobileWalkingLayout ? "walking-poop walking-poop--mobile" : "walking-poop"}
                ref={poopTargetRef}
                style={isMobileWalkingLayout ? mobilePoopStyle : desktopPoopStyle}
                aria-hidden="true"
              >
                <img src={dogDailyAsset("poop.png")} alt="" />
              </div>
            )}
            {renderWalkingEventCard("walking-event-card--desktop")}
            <button
              type="button"
              className="walking-forward-button"
              disabled={needsCleanup}
              onPointerDown={(event) => {
                event.preventDefault();
                event.currentTarget.setPointerCapture?.(event.pointerId);
                startForward();
              }}
              onPointerUp={(event) => {
                event.currentTarget.releasePointerCapture?.(event.pointerId);
                stopForward();
              }}
              onPointerCancel={() => stopForward()}
              onPointerLeave={() => stopForward()}
              onLostPointerCapture={() => stopForward()}
              aria-label="往前走"
            >
              <span className="walking-forward-orb" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M8 11.2V4.8a1.7 1.7 0 1 1 3.4 0v5.4" />
                  <path d="M11.4 10V8.3a1.55 1.55 0 1 1 3.1 0v2.3" />
                  <path d="M14.5 10.7V9.4a1.45 1.45 0 1 1 2.9 0v2.4" />
                  <path d="M17.4 12.2v-1a1.35 1.35 0 1 1 2.7 0v4.1c0 3.3-2.3 5.7-6.1 5.7h-1.6c-2.2 0-3.7-.9-4.9-2.5l-3-4.1a1.7 1.7 0 0 1 2.6-2.1l1.1 1.1" />
                </svg>
              </span>
              <span className="walking-forward-label">往前走</span>
            </button>
          </div>
          {renderWalkingEventCard("walking-event-card--mobile")}
          </div>
        </div>
      )}
    </section>
  );
}

export function LifeJourney({
  index,
  petName,
  breed,
  species = "dog",
  answers,
  activity,
  completedIds,
  expenses,
  backupNames,
  members,
  roomReady,
  onIndex,
  onChoose,
  onMarkScenarioForReview,
  onChooseMultiple,
  onMembersChange,
  onActivityChange,
  onCompleteItem,
  onAddExpense,
  onStageChange,
  onBack,
  onComplete,
}: {
  index: number;
  petName: string;
  breed: string;
  species?: string;
  answers: Record<string, ScenarioAnswer>;
  activity: LifeActivityState;
  completedIds: string[];
  expenses: ExpenseRecord[];
  backupNames: string[];
  members: CareMember[];
  roomReady: string[];
  onIndex: (index: number) => void;
  onChoose: (scenario: Scenario, choice: ScenarioChoice) => void;
  onMarkScenarioForReview: (scenario: Scenario, flag: string) => void;
  onChooseMultiple: (scenario: Scenario, choices: ScenarioChoice[], result: ScenarioResult) => void;
  onMembersChange: (members: CareMember[]) => void;
  onActivityChange: (patch: Partial<LifeActivityState>) => void;
  onCompleteItem: (id: string) => void;
  onAddExpense: (id: string) => void;
  onStageChange: (step: number) => void;
  onBack: () => void;
  onComplete: () => void;
}) {
  const activeJourneyItems = getJourneyItemsForSpecies(species);
  const activeLifeScenarios = getLifeScenariosForSpecies(species);
  const item = activeJourneyItems[index] ?? activeJourneyItems[0];
  const scenario = item.scenarioId ? activeLifeScenarios.find((entry) => entry.id === item.scenarioId) : undefined;
  const answer = scenario ? answers[scenario.id] : undefined;
  const isDailyBehaviorActivity = item.id === "behavior" || item.id === "cat-daily-care";
  const isDailyInspectionActivity = item.type === "daily-inspection";
  const isWalkingActivity = item.id === "walking";
  const isBreedChallengeActivity = item.id === "breed-challenge";
  const isBusyCareActivity = Boolean(scenario && (scenario.id === "busy-daily-care" || scenario.id === "cat-busy-care"));
  const isVideoFeedbackScenario = scenario?.id === "arrival-adjustment" || scenario?.id === "illness-vet" || scenario?.id === "growing-old" || scenario?.id === "cat-arrival-adjustment" || scenario?.id === "cat-illness-vet" || scenario?.id === "cat-growing-old";
  const [arrivalMealOpen, setArrivalMealOpen] = useState(false);
  const showArrivalMeal = (scenario?.id === "arrival-adjustment" || scenario?.id === "cat-arrival-adjustment") && answer?.finalResult === "correct" && arrivalMealOpen;
  const [feedbackOpen, setFeedbackOpen] = useState(Boolean(answer));
  const [timePassOpen, setTimePassOpen] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [resetItemId, setResetItemId] = useState<string | null>(null);
  const [replayInProgress, setReplayInProgress] = useState(false);
  useEffect(() => {
    setTimePassOpen(false);
    setArrivalMealOpen(false);
    setReplayInProgress(false);
  }, [index]);

  const completedCount = completedIds.length;

  function selectItem(next: number) {
    const nextScenarioId = activeJourneyItems[next].scenarioId;
    setFeedbackOpen(Boolean(nextScenarioId && answers[nextScenarioId]));
    setReplayInProgress(false);
    onIndex(next);
    onStageChange(stageForIndex(next));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function continueJourney() {
    onCompleteItem(item.id);
    if (item.scenarioId === "illness-vet" && !activity.sickTimePassComplete) {
      setTimePassOpen(true);
      return;
    }
    if (index === activeJourneyItems.length - 1) {
      onComplete();
      return;
    }
    selectItem(index + 1);
  }

  function choose(choice: ScenarioChoice) {
    if (!scenario) return;
    onChoose(scenario, choice);
    setFeedbackOpen(true);
  }

  function resetCurrentQuestion() {
    setFeedbackOpen(false);
    setArrivalMealOpen(false);
    setTimePassOpen(false);
    if (isWalkingActivity) {
      onActivityChange({
        walkingPreparedItems: [],
        walkingSceneIndex: 0,
        walkingMinutes: 0,
        walkingPoopCleaned: false,
        walkingComplete: false,
        catInspectionSteps: [],
      });
    }
    if (isDailyInspectionActivity) onActivityChange({ catInspectionSteps: [] });
    setReplayInProgress(true);
    setResetItemId(item.id);
    setResetSignal((current) => current + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const isReviewingCompletedItem = completedIds.includes(item.id);
  const canResetCurrent = isReviewingCompletedItem && !replayInProgress;
  const currentResetSignal = resetItemId === item.id ? resetSignal : 0;
  const replayCorrectProps = isReviewingCompletedItem
    ? { onReplay: resetCurrentQuestion, continueImmediately: true }
    : {};

  if (timePassOpen && item.scenarioId === "illness-vet") {
    return <TimePassTransition onComplete={() => {
      onActivityChange({ sickTimePassComplete: true });
      setTimePassOpen(false);
      selectItem(index + 1);
    }} />;
  }

  return (
    <div className={`content-wrap life-journey-page ${canResetCurrent ? "is-reviewing" : ""}`}>
      {isDailyBehaviorActivity ? (
        <DailyBehaviorActivityMulti
          answers={answers}
          petName={petName}
          onChooseMultiple={onChooseMultiple}
          onContinue={continueJourney}
          resetSignal={currentResetSignal}
          scenarioIds={species === "cat" ? catDailyBehaviorScenarioIds : dailyBehaviorScenarioIds}
          species={species}
          {...replayCorrectProps}
        />
      ) : isDailyInspectionActivity ? (
        <CatDailyInspectionActivity
          petName={petName}
          selected={activity.catInspectionSteps}
          onChange={(catInspectionSteps) => onActivityChange({ catInspectionSteps })}
          onContinue={continueJourney}
        />
      ) : isWalkingActivity ? (
        <WalkingActivity
          activity={activity}
          petName={petName}
          onChange={onActivityChange}
          onAddExpense={onAddExpense}
          onContinue={continueJourney}
          resetSignal={currentResetSignal}
        />
      ) : isBreedChallengeActivity ? (
        <BreedChallengeActivity
          breed={breed}
          petName={petName}
          answers={answers}
          onChoose={onChoose}
          onContinue={continueJourney}
          resetSignal={currentResetSignal}
          {...replayCorrectProps}
        />
      ) : isBusyCareActivity && scenario ? (
        <BusyCareActivity
          scenario={scenario}
          answer={answer}
          petName={petName}
          members={members}
          species={species}
          onMembersChange={onMembersChange}
          onChoose={choose}
          onContinue={continueJourney}
          resetSignal={currentResetSignal}
          {...replayCorrectProps}
        />
      ) : isVideoFeedbackScenario && scenario && !showArrivalMeal ? (
        <VideoScenarioActivity
          scenario={scenario}
          answer={answer}
          petName={petName}
          breed={breed}
          onChoose={choose}
          onCorrectComplete={() => {
            if (scenario.id === "arrival-adjustment" || scenario.id === "cat-arrival-adjustment") {
              setArrivalMealOpen(true);
              window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
            }
            else continueJourney();
          }}
          resetSignal={currentResetSignal}
          {...replayCorrectProps}
        />
      ) : scenario && (showArrivalMeal ? (
        <ArrivalMealActivity
          activity={activity}
          petName={petName}
          species={species}
          onChange={onActivityChange}
          onAddExpense={onAddExpense}
          onContinue={continueJourney}
        />
      ) : (
        <ScenarioCard
          scenario={scenario}
          petName={petName}
          answer={answer}
          backupNames={backupNames}
          feedbackOpen={feedbackOpen}
          onChoose={choose}
          onRetry={() => setFeedbackOpen(false)}
          onContinue={continueJourney}
          {...replayCorrectProps}
        />
      ))}
    </div>
  );
}
