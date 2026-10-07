"use client";

/* eslint-disable @next/next/no-img-element -- Rabbit carry sorting keeps native image dimensions inside pointer-sort rows. */
import { useEffect, useRef, useState } from "react";
import { rabbitActivityScenarios, rabbitCarrySortSteps } from "../../../data/species/rabbit/scenarios";
import type { LifeActivityState, Scenario, ScenarioChoice } from "../../../game-types";
import { renderKnowledgeText, withPetName } from "./activity-ui";
import { CompletionReminderBlock, CorrectFeedbackLayout } from "./scenario-ui";

function RabbitActivityFeedback({ scenario, petName, onReplay, onContinue }: { scenario: Scenario; petName: string; onReplay?: () => void; onContinue: () => void }) {
  const completionFeedback = scenario.completionFeedback;
  return <div className="rabbit-activity-feedback">
    <CorrectFeedbackLayout
      variant="single"
      videoSrc=""
      videoFailed
      fallbackText="兔子日常照護完成"
      mediaPlaceholder={<div className="scene-media-placeholder"><span>兔子日常照護</span><strong>{withPetName(scenario.title, petName)}</strong><small>每一個穩定的日常，都是牠的安全感。</small></div>}
      title={completionFeedback?.title}
      intro={<p>{completionFeedback
        ? renderKnowledgeText(withPetName(completionFeedback.encouragement, petName))
        : scenario.id === "rabbit-daily-check" ? `你完成了今天的保養——梳毛、足底確認、門齒與指甲檢查。定期梳毛，尤其是後肢及尾根周圍，能清除皮屑及脫落毛髮，減少${petName || "牠"}自行理毛時食入過多毛髮引發腸阻塞的機會。` : `你用循序、穩定的方式試著抱起${petName || "牠"}，也把牠的安全感放在前面。`}</p>}
      knowledgeTitle={completionFeedback?.knowledgeTitle ?? scenario.knowledgeTitle ?? "兔子小知識"}
      knowledgeContent={completionFeedback?.knowledgeContent}
      correctItems={completionFeedback ? undefined : scenario.id === "rabbit-carry-sort" ? scenario.learningPoints?.map((text) => withPetName(text, petName)) : scenario.learningPoints}
      onReplay={onReplay}
      onVideoError={() => undefined}
      onContinue={onContinue}
    />
    {scenario.completionReminder && <CompletionReminderBlock reminder={scenario.completionReminder} petName={petName} />}
  </div>;
}

export function RabbitCarrySortActivity({ activity, petName, onChange, onChoose, onContinue, onReplay }: { activity: LifeActivityState; petName: string; onChange: (patch: Partial<LifeActivityState>) => void; onChoose: (scenario: Scenario, choice: ScenarioChoice) => void; onContinue: () => void; onReplay?: () => void }) {
  const scenario = rabbitActivityScenarios["rabbit-carry-sort"];
  const order = activity.rabbitCarryOrder.length ? activity.rabbitCarryOrder : ["2", "0", "4", "1", "3"];
  const [message, setMessage] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const activityRef = useRef<HTMLElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const submittedRef = useRef(false);
  const previousCompletionStateRef = useRef<boolean | null>(null);
  const complete = activity.rabbitCarryComplete;
  const answerRevealed = activity.rabbitCarryAnswerRevealed;
  const feedbackShown = activity.rabbitCarryFeedbackShown;
  const attempts = activity.rabbitCarryAttempts ?? 0;
  const isCompletionState = complete || answerRevealed;

  useEffect(() => {
    const wasCompletionState = previousCompletionStateRef.current;
    previousCompletionStateRef.current = isCompletionState;
    // 初次還原已完成進度時不搶走使用者目前的閱讀位置；只在本次操作切換完成狀態時捲動。
    if (wasCompletionState === null || wasCompletionState || !isCompletionState) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    activityRef.current?.focus({ preventScroll: true });
    activityRef.current?.scrollIntoView({ block: "start", behavior: reducedMotion ? "auto" : "smooth" });
  }, [isCompletionState]);

  useEffect(() => {
    if (feedbackShown) {
      feedbackRef.current?.focus({ preventScroll: true });
    }
  }, [feedbackShown]);

  useEffect(() => {
    submittedRef.current = false;
  }, [complete, feedbackShown, attempts]);

  const move = (from: number, insertAt: number) => {
    if (isCompletionState || from < 0 || insertAt < 0 || from >= order.length || insertAt > order.length) return;
    const next = [...order];
    const [moved] = next.splice(from, 1);
    const destination = from < insertAt ? insertAt - 1 : insertAt;
    next.splice(destination, 0, moved);
    onChange({ rabbitCarryOrder: next });
  };
  const check = () => {
    if (isCompletionState || submittedRef.current) return;
    submittedRef.current = true;
    const incorrectIndex = order.findIndex((value, index) => value !== String(index));
    if (incorrectIndex !== -1) {
      const nextAttempts = attempts + 1;
      onChoose(scenario, scenario.choices[0]);
      if (nextAttempts >= 3) {
        onChange({ rabbitCarryAttempts: nextAttempts, rabbitCarryAnswerRevealed: true, rabbitCarryOrder: ["0", "1", "2", "3", "4"] });
        setMessage("");
        return;
      }
      onChange({ rabbitCarryAttempts: nextAttempts });
      setMessage(`第 ${incorrectIndex + 1} 步需要重新想一想：${rabbitCarrySortSteps[incorrectIndex].hint}`);
      return;
    }
    onChange({ rabbitCarryComplete: true });
    onChoose(scenario, scenario.choices[1]);
  };

  if (feedbackShown) return <div ref={feedbackRef} tabIndex={-1} className="activity-feedback-focus"><RabbitActivityFeedback scenario={scenario} petName={petName} onReplay={onReplay} onContinue={onContinue} /></div>;
  return (
    <section ref={activityRef} tabIndex={-1} className={`rabbit-activity rabbit-carry-activity ${isCompletionState ? "is-completion-state" : ""}`} aria-labelledby="rabbit-carry-title">
      <header><p>日常照護</p><h1 id="rabbit-carry-title">{withPetName(scenario.title, petName)}</h1>{!isCompletionState && <span className="rabbit-carry-description">{withPetName(scenario.description, petName)}</span>}</header>
      <div className="rabbit-activity-panel">
        {answerRevealed && scenario.activityRevealNotice && <p className="rabbit-carry-reveal-notice" role="status">{withPetName(scenario.activityRevealNotice, petName)}</p>}
        <h2 className={isCompletionState ? "rabbit-carry-completion-title" : undefined}>{withPetName(isCompletionState ? scenario.activityCompletionTitle ?? scenario.questionText ?? "" : scenario.questionText ?? "", petName)}</h2>
        <ol className="rabbit-sort-list rabbit-drag-sort-list">
          {order.map((value, index) => (
            <li key={value} data-rabbit-step={index}
              onPointerDown={(event) => {
                if (isCompletionState || (event.target as HTMLElement).closest("button")) return;
                event.preventDefault();
                event.currentTarget.setPointerCapture(event.pointerId);
                setDraggedIndex(index);
                setDropIndex(index);
              }}
              onPointerMove={(event) => {
                if (draggedIndex === null) return;
                const target = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>("[data-rabbit-step]");
                if (!target) return;
                const rect = target.getBoundingClientRect();
                const targetIndex = Number(target.dataset.rabbitStep);
                setDropIndex(event.clientY > rect.top + rect.height / 2 ? targetIndex + 1 : targetIndex);
              }}
              onPointerUp={(event) => {
                const target = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>("[data-rabbit-step]");
                if (draggedIndex !== null && target) {
                  const rect = target.getBoundingClientRect();
                  const targetIndex = Number(target.dataset.rabbitStep);
                  move(draggedIndex, event.clientY > rect.top + rect.height / 2 ? targetIndex + 1 : targetIndex);
                }
                setDraggedIndex(null);
                setDropIndex(null);
              }}
              onPointerCancel={() => { setDraggedIndex(null); setDropIndex(null); }}
              className={`${draggedIndex === index ? "is-dragging" : ""} ${dropIndex === index ? "is-drop-before" : ""} ${dropIndex === index + 1 ? "is-drop-after" : ""} ${isCompletionState ? "is-revealed" : ""}`}
            >
              <span>{index + 1}</span><div className="rabbit-step-image-slot"><img src={rabbitCarrySortSteps[Number(value)].image} alt="" draggable={false} /></div>
              <p>{withPetName(rabbitCarrySortSteps[Number(value)].text, petName)}</p>
              {isCompletionState ? <small>正確動作</small> : <small className="sort-drag-label">按住拖曳排序</small>}
            </li>
          ))}
        </ol>
        {attempts > 0 && !answerRevealed && <p className="sort-attempts" role="status">還有 <strong>{Math.max(0, 3 - attempts)}</strong> 次可嘗試</p>}
        {message && !isCompletionState && <p className="rabbit-activity-message" role="status">{message}</p>}
        {isCompletionState ? <button type="button" className="primary" onClick={() => onChange({ rabbitCarryFeedbackShown: true })}>我知道正確做法了 <span>→</span></button> : <button type="button" className="primary" onClick={check}>確認順序 <span>→</span></button>}
      </div>
    </section>
  );
}

