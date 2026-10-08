"use client";

import { useEffect, useRef, useState } from "react";
import type { Scenario, ScenarioAnswer, ScenarioChoice } from "../../../game-types";
import { renderKnowledgeText, withPetName } from "./activity-ui";
import {
  BreedKnowledgeHighlight,
  CorrectFeedbackLayout,
  IncorrectExplanation,
  OtherCorrectTips,
  SceneMediaPlaceholder,
  ScenarioOptionCard,
  VideoWithToggle,
  breedLabelForId,
  lifeStageLabelForScenario,
  plainFeedbackText,
  useVideoMetadataPreload,
  withBreedName,
} from "./scenario-ui";

export function VideoScenarioActivity({
  scenario,
  answer,
  petName,
  breed,
  onChoose,
  onCorrectComplete,
  onCorrectFeedbackShown,
  onCorrectExpenseSequence,
  triggerExpenseOnFeedback = false,
  deferExpensesUntilFeedback = false,
  onReplay,
  continueImmediately = false,
}: {
  scenario: Scenario;
  answer?: ScenarioAnswer;
  petName: string;
  breed: string;
  onChoose: (choice: ScenarioChoice) => void;
  onCorrectComplete: () => void;
  onCorrectFeedbackShown?: (scenario: Scenario, choice: ScenarioChoice) => void;
  /** 指定活動要播放的費用卡。 */
  onCorrectExpenseSequence?: (scenario: Scenario, choice: ScenarioChoice) => Promise<void>;
  /** 費用卡要在「做得很好」頁面出現，而非作答選項畫面。 */
  triggerExpenseOnFeedback?: boolean;
  /** 指定費用須在「做得很好」畫面呈現後才登錄。 */
  deferExpensesUntilFeedback?: boolean;
  onReplay?: () => void;
  continueImmediately?: boolean;
}) {
  const [mode, setMode] = useState<"question" | "animating" | "incorrect" | "positive">(answer?.finalResult === "correct" ? "positive" : answer ? "incorrect" : "question");
  const [videoFailed, setVideoFailed] = useState(false);
  const [, setVideoFinished] = useState(false);
  const sceneMedia = scenario.sceneMedia ?? { type: "placeholder" as const };
  const feedbackMedia = scenario.correctFeedbackMedia ?? { type: "placeholder" as const };
  const source = sceneMedia.type === "video" ? sceneMedia.src : undefined;
  const correctFeedbackVideo = feedbackMedia.type === "video" ? feedbackMedia.src : undefined;
  useVideoMetadataPreload(source);
  useVideoMetadataPreload(correctFeedbackVideo);
  const selectedChoice = scenario.choices.find((choice) => choice.id === answer?.finalChoiceId);
  const feedbackExpenseShownFor = useRef("");
  const expenseSequenceShownFor = useRef("");
  const [expenseSequenceComplete, setExpenseSequenceComplete] = useState(true);

  function choose(choice: ScenarioChoice) {
    onChoose(choice);
    if (choice.result === "correct" && scenario.stageId === "arrival" && !deferExpensesUntilFeedback) {
      onCorrectFeedbackShown?.(scenario, choice);
    }
    setVideoFailed(false);
    setVideoFinished(false);
    if (choice.result !== "correct" || !onCorrectExpenseSequence) {
      setMode(choice.result === "correct" ? "positive" : "incorrect");
      return;
    }
    if (triggerExpenseOnFeedback) {
      setExpenseSequenceComplete(false);
      setMode("positive");
      return;
    }
    setMode("animating");
    void onCorrectExpenseSequence(scenario, choice).then(() => setMode("positive"));
  }

  // Effect 在正確回饋畫面提交後才執行，避免費用動畫早於「做得很好」。
  useEffect(() => {
    if (!deferExpensesUntilFeedback || mode !== "positive" || selectedChoice?.result !== "correct") return;
    const key = `${scenario.id}:${selectedChoice.id}`;
    if (feedbackExpenseShownFor.current === key) return;
    feedbackExpenseShownFor.current = key;
    onCorrectFeedbackShown?.(scenario, selectedChoice);
  }, [deferExpensesUntilFeedback, mode, onCorrectFeedbackShown, scenario, selectedChoice]);

  useEffect(() => {
    if (!triggerExpenseOnFeedback || mode !== "positive" || selectedChoice?.result !== "correct" || !onCorrectExpenseSequence) return;
    const key = `${scenario.id}:${selectedChoice.id}`;
    if (expenseSequenceShownFor.current === key) return;
    expenseSequenceShownFor.current = key;
    void onCorrectExpenseSequence(scenario, selectedChoice).finally(() => setExpenseSequenceComplete(true));
  }, [mode, onCorrectExpenseSequence, scenario, selectedChoice, triggerExpenseOnFeedback]);

  if (mode === "positive" && selectedChoice) {
    // 通用品種流程不再顯示獨立「品種小知識」卡；健康題的內容由題目資料
    // 直接放進既有的物種小知識卡，避免重複且錯誤地標示為特定品種。
    const breedSpecificSuggestion = scenario.breedKnowledge ?? "";
    const [breedKnowledge = "", followupSuggestion = ""] = breedSpecificSuggestion.split("\n\n");
    const completionFeedback = scenario.completionFeedback;
    return (
      <CorrectFeedbackLayout
        variant="single"
        title={completionFeedback?.title}
        videoSrc={correctFeedbackVideo ?? ""}
        mediaPlaceholder={feedbackMedia.type === "placeholder" ? <SceneMediaPlaceholder title={withPetName(scenario.title, petName)} /> : undefined}
        videoFailed={videoFailed}
        fallbackText="正向結果影片目前無法播放，仍可繼續生活旅程。"
        intro={completionFeedback ? <p>{renderKnowledgeText(withPetName(completionFeedback.encouragement, petName))}</p> : <p>{plainFeedbackText(withPetName(selectedChoice.explanation, petName))}</p>}
        breedHighlight={breedKnowledge ? <BreedKnowledgeHighlight text={withPetName(breedKnowledge, petName)} label={`${breedLabelForId(breed)}小知識`} /> : null}
        correctItems={completionFeedback ? undefined : scenario.learningPoints?.map((point) => withPetName(point, petName))}
        knowledgeContent={completionFeedback?.knowledgeContent.map((content) => ({ ...content, text: withPetName(content.text, petName) }))}
        knowledgeTitle={completionFeedback?.knowledgeTitle ?? scenario.knowledgeTitle ?? "照護小知識"}
        suggestion={completionFeedback?.reminder ? (
          <p>{renderKnowledgeText(withPetName(completionFeedback.reminder, petName))}</p>
        ) : followupSuggestion ? (
          <p>{plainFeedbackText(withPetName(followupSuggestion, petName))}</p>
        ) : !completionFeedback && !breedKnowledge && selectedChoice.suggestion ? (
          <p>{plainFeedbackText(withPetName(withBreedName(selectedChoice.suggestion, breed), petName))}</p>
        ) : null}
        otherTips={completionFeedback ? null : <OtherCorrectTips scenario={scenario} choice={selectedChoice} petName={petName} />}
        onVideoEnded={() => setVideoFinished(true)}
        onVideoError={() => { setVideoFailed(true); setVideoFinished(true); }}
        onReplay={onReplay}
        onContinue={onCorrectComplete}
        continueImmediately={continueImmediately}
        continueDisabled={triggerExpenseOnFeedback && !expenseSequenceComplete}
        continueHint={triggerExpenseOnFeedback && !expenseSequenceComplete ? "正在加入本次照顧費用…" : undefined}
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
              ariaLabel={sceneMedia.type === "video" ? sceneMedia.ariaLabel : scenario.title}
              onError={() => setVideoFailed(true)}
            />
          ) : <SceneMediaPlaceholder title={withPetName(scenario.title, petName)} />}
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
          <section className="video-scenario-options"><h2>{mode === "animating" ? "正在加入本次照顧費用…" : "你會怎麼做？"}</h2>{scenario.choices.map((choice) => <ScenarioOptionCard key={choice.id} disabled={mode === "animating"} onClick={() => choose(choice)}>{withPetName(choice.text, petName)}</ScenarioOptionCard>)}</section>
        )}
      </div>
    </section>
  );
}
