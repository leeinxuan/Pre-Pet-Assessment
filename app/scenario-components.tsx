"use client";

import { useEffect, useMemo, useState } from "react";
import { scenarios } from "./game-data";
import type { Scenario, ScenarioAnswer, ScenarioChoice } from "./game-types";

export function ScenarioFeedback({
  scenario,
  choice,
  onRetry,
  onContinue,
}: {
  scenario: Scenario;
  choice: ScenarioChoice;
  onRetry: () => void;
  onContinue: () => void;
}) {
  const labels = {
    correct: { icon: "✓", button: "繼續下一個情境" },
    partial: { icon: "△", button: "記住建議，繼續" },
    incorrect: { icon: "!", button: "看完建議，繼續" },
  } as const;
  const label = labels[choice.result];
  return (
    <section className={`scenario-feedback ${choice.result}`} aria-live="polite">
      <div className="feedback-title"><span>{label.icon}</span><div><small>{scenario.timeLabel}</small><h2>{choice.feedbackTitle}</h2></div></div>
      <p>{choice.explanation}</p>
      {choice.suggestion && <div className="feedback-suggestion"><b>可以這樣調整</b><p>{choice.suggestion}</p></div>}
      {scenario.reminder && <div className="law-reminder"><span>i</span><p><b>生活裡的法規提醒</b>{scenario.reminder}</p></div>}
      <div className="feedback-actions">
        {choice.result === "incorrect" && <button className="secondary" onClick={onRetry}>重新選一次</button>}
        <button className="primary" onClick={onContinue}>{label.button} <span>→</span></button>
      </div>
    </section>
  );
}

export function ScenarioGame({
  start,
  end,
  index,
  answers,
  backupNames,
  onIndex,
  onChoose,
  onBackStage,
  onCompleteStage,
}: {
  start: number;
  end: number;
  index: number;
  answers: Record<string, ScenarioAnswer>;
  backupNames: string[];
  onIndex: (index: number) => void;
  onChoose: (scenario: Scenario, choice: ScenarioChoice) => void;
  onBackStage: () => void;
  onCompleteStage: () => void;
}) {
  const scenario = scenarios[index];
  const answer = answers[scenario.id];
  const [feedbackOpen, setFeedbackOpen] = useState(Boolean(answer));

  useEffect(() => {
    setFeedbackOpen(Boolean(answers[scenarios[index].id]));
  }, [index, answers]);

  const selectedChoice = useMemo(
    () => scenario.choices.find((choice) => choice.id === answer?.finalChoiceId) ?? null,
    [answer, scenario.choices],
  );
  const stageScenarios = scenarios.slice(start, end + 1);
  const stageComplete = stageScenarios.every((item) => Boolean(answers[item.id]));
  const position = index - start;
  const hasBackup = backupNames.length > 0;

  function choose(choice: ScenarioChoice) {
    onChoose(scenario, choice);
    setFeedbackOpen(true);
  }

  function continueJourney() {
    if (index < end) {
      onIndex(index + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (stageComplete) {
      onCompleteStage();
    }
  }

  return (
    <div className="content-wrap scenario-page timeline-scenario">
      <div className="scene-progress">
        <div><span style={{ width: `${((position + 1) / stageScenarios.length) * 100}%` }} /></div>
        <p>{scenario.stage} · {scenario.timeLabel}</p>
        <b>{position + 1} / {stageScenarios.length}</b>
      </div>
      <div className="timeline-strip" aria-label="生活時間軸">{stageScenarios.map((item, itemIndex) => <button key={item.id} className={`${start + itemIndex === index ? "active" : ""} ${answers[item.id] ? answers[item.id].firstResult : ""}`} onClick={() => onIndex(start + itemIndex)} aria-label={`前往${item.timeLabel}`}><i>{answers[item.id] ? "✓" : itemIndex + 1}</i><span>{item.timeLabel}</span></button>)}</div>

      {!feedbackOpen ? (
        <>
          <article className="scene-card" key={scenario.id}>
            <div className="scene-copy"><p className="eyebrow">{scenario.stage}</p><h1>{scenario.title}</h1><p>{scenario.description}</p>{scenario.supportChoice && <div className={`support-link ${hasBackup ? "ready" : "missing"}`}><span>{hasBackup ? "✓" : "!"}</span><p><b>{hasBackup ? `可聯絡：${backupNames.join("、")}` : "目前沒有可用的備用照顧者"}</b>{hasBackup ? "前面建立的分工可以在這裡使用。" : "你仍可選其他方案，但報告會提醒支援不足。"}</p></div>}</div>
            <div className={`scene-art scene-${scenario.artIndex}`} aria-hidden="true"><div className="scene-sprite" /><p>{scenario.timeLabel}</p></div>
          </article>
          <section className="reflection"><h2>如果是你，會怎麼做？</h2><div className="choice-grid">{scenario.choices.map((choice) => {
            const unavailableBackup = (choice.id === "backup-help" || choice.id === "assigned-backup") && !hasBackup;
            return <button key={choice.id} disabled={unavailableBackup} onClick={() => choose(choice)}><span>{choice.result === "correct" ? "可行做法" : choice.result === "partial" ? "需要調整" : "先想一想"}</span><p>{choice.text}</p>{unavailableBackup && <small>前面尚未安排備用照顧者</small>}</button>;
          })}</div></section>
        </>
      ) : selectedChoice ? (
        <ScenarioFeedback
          scenario={scenario}
          choice={selectedChoice}
          onRetry={() => setFeedbackOpen(false)}
          onContinue={continueJourney}
        />
      ) : null}

      <div className="scenario-bottom-nav">
        <button className="secondary" onClick={() => index > start ? onIndex(index - 1) : onBackStage()}>← {index > start ? "上一個情境" : "返回上一階段"}</button>
        <span>{Object.values(answers).filter((item) => stageScenarios.some((scenarioItem) => scenarioItem.id === item.scenarioId)).length} / {stageScenarios.length} 已完成</span>
        {index === end && stageComplete && !feedbackOpen && <button className="primary" onClick={onCompleteStage}>前往下一階段 <span>→</span></button>}
      </div>
    </div>
  );
}
