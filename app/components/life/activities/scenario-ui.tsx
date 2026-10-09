"use client";

/* eslint-disable @next/next/no-img-element -- Scenario artwork and video fallbacks intentionally preserve the existing native media markup. */

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { money, getExpenseForSpecies } from "../../../data/shared/expenses";
import { getSpeciesConfig } from "../../../data/species";
import type { ExpenseRecord, Scenario, ScenarioAnswer, ScenarioChoice } from "../../../game-types";
import { renderKnowledgeText, withPetName } from "./activity-ui";

export function useVideoMetadataPreload(src?: string) {
  useEffect(() => {
    if (!src || typeof document === "undefined") return;
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = src;
    video.load();
  }, [src]);
}

export function breedLabelForId(breed: string, species = "dog") {
  return getSpeciesConfig(species).selection.breeds.find((item) => item.id === breed)?.label ?? "這個品種";
}

export function breedChallengeLabelForId(breed: string) {
  return breedLabelForId(breed, "dog").replace(/^米克斯－/, "");
}

export function withBreedName(text: string, breed: string, species = "dog") {
  return text.replaceAll("柴犬", breedLabelForId(breed, species));
}

export function lifeStageLabelForScenario(scenario: Scenario) {
  return scenario.stageTitle ?? scenario.stage;
}

/** 沒有正式素材時仍保留共用情境媒體版面，避免題目區因缺片滿版。 */
export function SceneMediaPlaceholder({ title }: { title: string }) {
  return <div className="scene-media-placeholder" role="status">
    <small>影片製作中</small>
    <b>{title}</b>
    <p>情境影片將於後續補上。</p>
  </div>;
}

/** 共用提醒圖示：兔子餵食的「注意」與禁止操作都使用同一種非責備式警示。 */
function otherCorrectChoices(scenario: Scenario, choice: ScenarioChoice, petName: string, species?: string) {
  if (choice.result !== "correct") return [];
  return scenario.choices
    .filter((entry) => entry.result === "correct" && entry.id !== choice.id)
    .slice(0, 2)
    .map((entry) => withPetName(entry.text, petName, species));
}

export function OtherCorrectTips({ scenario, choice, petName, species }: { scenario: Scenario; choice: ScenarioChoice; petName: string; species?: string }) {
  const tips = otherCorrectChoices(scenario, choice, petName, species);
  if (tips.length === 0) return null;
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
  const [delayElapsed, setDelayElapsed] = useState(false);
  const visible = immediate || delayElapsed;

  useEffect(() => {
    if (immediate || delayElapsed) return;
    const timer = window.setTimeout(() => setDelayElapsed(true), 3000);
    return () => window.clearTimeout(timer);
  }, [delayElapsed, immediate]);

  return (
    <div className={`delayed-continue ${visible ? "is-visible" : "is-waiting"}`} aria-live="polite">
      <button type="button" className="primary" disabled={disabled} tabIndex={visible ? 0 : -1} aria-hidden={!visible} onClick={onContinue}>
        {label} <span>→</span>
      </button>
      {visible && disabled && hint && <small className="delayed-continue-hint">{hint}</small>}
    </div>
  );
}

/** 一般回饋維持自然內文；只有知識卡片才解析必要的重點標示。 */
export function plainFeedbackText(text: string) {
  return text.replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1");
}

/** 犬貓回饋頁共用知識卡；情境差異由 title、icon 與內容帶入。 */
export function KnowledgeCard({ title, children, className = "", icon = "💡" }: { title: ReactNode; children: ReactNode; className?: string; icon?: string }) {
  return <section className={`knowledge-card feedback-knowledge-card ${className}`.trim()}>
    <b className="feedback-knowledge-title"><span aria-hidden="true">{icon}</span>{title}</b>
    {children}
  </section>;
}

export function IncorrectExplanation({ text }: { text: string }) {
  const firstSentenceEnd = text.search(/[。！？]/);
  const keyPoint = firstSentenceEnd >= 0 ? text.slice(0, firstSentenceEnd + 1) : text;
  const detail = firstSentenceEnd >= 0 ? text.slice(firstSentenceEnd + 1) : "";
  return <p className="incorrect-feedback-explanation"><strong className="incorrect-feedback-key">{renderKnowledgeText(keyPoint)}</strong>{detail && <span>{renderKnowledgeText(detail)}</span>}</p>;
}

export function CompletionReminderBlock({ reminder, petName }: { reminder: NonNullable<Scenario["completionReminder"]>; petName: string }) {
  return <section className="completion-reminder-block" aria-labelledby="completion-reminder-title">
    <header>
      <h2 id="completion-reminder-title">{renderKnowledgeText(withPetName(reminder.title, petName))}</h2>
    </header>
    <div className="completion-reminder-grid">
      {reminder.items.map((item) => <article key={item.title} className="completion-reminder-item">
        {item.image ? (
          <img className="completion-reminder-image" src={item.image} alt={item.imageAlt ?? item.imagePlaceholderLabel} />
        ) : (
          <div className="completion-reminder-placeholder" role="img" aria-label={item.imagePlaceholderLabel}>
            <span>示意圖片待補</span>
          </div>
        )}
        <div>
          <h3>{renderKnowledgeText(withPetName(item.title, petName))}</h3>
          <p>{renderKnowledgeText(withPetName(item.description, petName))}</p>
        </div>
      </article>)}
    </div>
    <p className="completion-reminder-footer">{renderKnowledgeText(withPetName(reminder.footer, petName))}</p>
  </section>;
}


export function CorrectFeedbackLayout({
  variant,
  title = "做得很好！",
  videoSrc,
  videoFailed,
  fallbackText,
  intro,
  suggestion,
  breedHighlight,
  otherTips,
  otherTipsBeforeSuggestion = false,
  correctItems,
  knowledgeContent,
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
  title?: string;
  videoSrc: string;
  videoFailed: boolean;
  fallbackText: string;
  intro: ReactNode;
  suggestion?: ReactNode;
  breedHighlight?: ReactNode;
  otherTips?: ReactNode;
  otherTipsBeforeSuggestion?: boolean;
  correctItems?: string[];
  knowledgeContent?: Array<{ type: "paragraph" | "item"; text: string }>;
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
        <h2>{title}</h2>
        <div className="correct-feedback-intro">{intro}</div>
        {breedHighlight}
        {knowledgeContent && knowledgeContent.length > 0 ? (
          <KnowledgeCard title={renderKnowledgeText(knowledgeTitle)}>
            {knowledgeContent.map((content, index) => content.type === "item" ? (
              <ul className="daily-behavior-correct-list" key={`${content.text}-${index}`}>
                <li>{renderKnowledgeText(content.text)}</li>
              </ul>
            ) : (
              <p key={`${content.text}-${index}`}>{renderKnowledgeText(content.text)}</p>
            ))}
          </KnowledgeCard>
        ) : correctItems && correctItems.length > 0 && (
          <KnowledgeCard title={renderKnowledgeText(knowledgeTitle)}>
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

export function BreedKnowledgeHighlight({ text, label = "品種小知識" }: { text: string; label?: string }) {
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

export function ScenarioOptionCard({
  type = "single",
  selected = false,
  incorrect = false,
  disabled = false,
  children,
  onClick,
}: {
  type?: "single" | "multiple";
  selected?: boolean;
  incorrect?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`scenario-option-card scenario-option-card--${type} ${selected ? "selected" : ""} ${incorrect ? "incorrect" : ""}`}
      aria-pressed={type === "multiple" ? selected : undefined}
      disabled={disabled}
      onClick={onClick}
    >
      <p>{children}</p>
    </button>
  );
}

export function VideoWithToggle({
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
  const playbackKey = `${src}:${autoPlay}`;
  const [playback, setPlayback] = useState({ key: playbackKey, paused: !autoPlay });
  const paused = playback.key === playbackKey ? playback.paused : !autoPlay;
  const updatePaused = (nextPaused: boolean) => setPlayback({ key: playbackKey, paused: nextPaused });

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => updatePaused(false)).catch(() => updatePaused(true));
    } else {
      video.pause();
      updatePaused(true);
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
        onPlay={() => updatePaused(false)}
        onPause={() => updatePaused(true)}
        onEnded={() => {
          updatePaused(true);
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

function ScenarioFeedback({
  scenario,
  choice,
  species = "dog",
  petName,
  onRetry,
  onContinue,
  onReplay,
  continueImmediately = false,
}: {
  scenario: Scenario;
  choice: ScenarioChoice;
  species?: string;
  petName: string;
  onRetry: () => void;
  onContinue: () => void;
  onReplay?: () => void;
  continueImmediately?: boolean;
}) {
  const requiresRetry = scenario.requiresRetry === true;
  const feedbackMedia = scenario.correctFeedbackMedia ?? { type: "placeholder" as const };
  const [feedbackVideoFailed, setFeedbackVideoFailed] = useState(false);
  const [, setFeedbackVideoFinished] = useState(false);
  const labels = {
    correct: { icon: "✓", button: "繼續生活旅程" },
    partial: { icon: "△", button: "記住建議，繼續" },
    incorrect: { icon: "!", button: "看完建議，繼續" },
  } as const;
  const expenseChanges = (choice.expenseIds ?? []).map((id) => getExpenseForSpecies(id, species)).filter((expense): expense is ExpenseRecord => Boolean(expense));
  if (choice.result === "correct") {
    return (
      <CorrectFeedbackLayout
        variant="single"
        videoSrc={feedbackMedia.type === "video" ? feedbackMedia.src : ""}
        mediaPlaceholder={feedbackMedia.type === "placeholder" ? <SceneMediaPlaceholder title={withPetName(scenario.title, petName, species)} /> : undefined}
        videoFailed={feedbackVideoFailed}
        fallbackText="正向結果影片目前無法播放，仍可繼續生活旅程。"
        intro={<p>{plainFeedbackText(withPetName(choice.explanation, petName, species))}</p>}
        correctItems={scenario.learningPoints}
        knowledgeTitle={scenario.knowledgeTitle ?? "狗狗小知識"}
        suggestion={choice.suggestion ? <p>{plainFeedbackText(withPetName(choice.suggestion, petName, species))}</p> : null}
        otherTips={<OtherCorrectTips scenario={scenario} choice={choice} petName={petName} species={species} />}
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
      <div className="feedback-title"><span>{labels[choice.result].icon}</span><div><small>{scenario.timeLabel}</small><h2>{withPetName(choice.feedbackTitle, petName, species)}</h2></div></div>
      <IncorrectExplanation text={withPetName(choice.explanation, petName, species)} />
      <OtherCorrectTips scenario={scenario} choice={choice} petName={petName} species={species} />
      {choice.suggestion && <div className="feedback-suggestion"><b>可以這樣調整：</b><p>{withPetName(choice.suggestion, petName, species)}</p></div>}
      <div className="feedback-expense">
        <b>本次費用變化</b>
        {expenseChanges.length
          ? expenseChanges.map((expense) => <span key={expense.id}>{expense.name} ＋NT$ {money.format(expense.amount)}{expense.recurring ? "／月" : ""}（同一事件只登記一次）</span>)
          : <span>本次選擇沒有新增費用。</span>}
      </div>
      {scenario.reminder && <div className="law-reminder"><span>i</span><p><b>生活裡的責任提醒</b>{withPetName(scenario.reminder, petName, species)}</p></div>}
      <div className="feedback-actions">
        {choice.result === "incorrect" && <button className="secondary" onClick={onRetry}>重新想一次</button>}
        {(!requiresRetry || choice.result !== "incorrect") && <button className="primary" onClick={onContinue}>{scenario.continueLabel ?? labels[choice.result].button} <span>→</span></button>}
      </div>
    </section>
  );
}

export function ScenarioCard({
  scenario,
  petName,
  species = "dog",
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
  species?: string;
  answer?: ScenarioAnswer;
  backupNames: string[];
  feedbackOpen: boolean;
  onChoose: (choice: ScenarioChoice) => void;
  onRetry: () => void;
  onContinue: () => void;
  onReplay?: () => void;
  continueImmediately?: boolean;
}) {
  const [failedSceneVideoFor, setFailedSceneVideoFor] = useState<string | null>(null);
  const sceneVideoFailed = failedSceneVideoFor === scenario.id;
  const sceneMedia = scenario.sceneMedia ?? { type: "placeholder" as const };
  const sceneVideoSource = sceneMedia.type === "video" ? sceneMedia.src : undefined;
  useVideoMetadataPreload(sceneVideoSource);
  const selectedChoice = scenario.choices.find((choice) => choice.id === answer?.finalChoiceId);
  if (feedbackOpen && selectedChoice) {
    return <ScenarioFeedback scenario={scenario} choice={selectedChoice} species={species} petName={petName} onRetry={onRetry} onContinue={onContinue} onReplay={onReplay} continueImmediately={continueImmediately} />;
  }
  const hasBackup = backupNames.length > 0;
  return (
    <>
      <article className="scene-card">
        <div className="scene-copy">
          <p className="life-stage-label">{lifeStageLabelForScenario(scenario)}</p>
          <h1>{withPetName(scenario.title, petName, species)}</h1>
          <p>{withPetName(scenario.description, petName, species)}</p>
          {scenario.supportChoice && (
            <div className={`support-link ${hasBackup ? "ready" : "missing"}`}>
              <span>{hasBackup ? "✓" : "!"}</span>
              <p><b>{hasBackup ? `可聯絡：${backupNames.join("、")}` : "目前缺少可用的備用照顧支援"}</b>{hasBackup ? "選項會直接使用前面建立的成員與分工。" : "請先以自己完成基本照顧或評估專業服務，不會顯示不存在的成員。"}</p>
            </div>
          )}
        </div>
        <div className={`scene-art scene-${scenario.artIndex} ${sceneMedia.type === "video" ? "scene-art--video" : ""}`}>
          {sceneMedia.type === "video" ? (
            sceneVideoFailed
              ? <div className="scene-video-fallback" role="status">這段情境影片目前無法播放。</div>
              : <VideoWithToggle className="scene-video" src={sceneMedia.src} loop ariaLabel={sceneMedia.ariaLabel} onError={() => setFailedSceneVideoFor(scenario.id)} />
          ) : <SceneMediaPlaceholder title={withPetName(scenario.title, petName, species)} />}
          <p>{scenario.timeLabel}</p>
        </div>
      </article>
      <section className="reflection">
        <h2>{scenario.questionTitle ?? "如果是你，會怎麼做？"}</h2>
        <div className="choice-grid">
          {scenario.choices.filter((choice) => choice.id !== "assigned-helper" || hasBackup).map((choice) => {
            const text = choice.id === "assigned-helper"
              ? `請${backupNames.join("或")}依照事先安排的分工，協助今晚的餵食與活動。`
              : withPetName(choice.text, petName, species);
            return <ScenarioOptionCard key={choice.id} onClick={() => onChoose(choice)}>{text}</ScenarioOptionCard>;
          })}
        </div>
      </section>
    </>
  );
}
