"use client";

import { useEffect, useRef, useState } from "react";
import { dogAssets } from "../../../data/species/dog/assets";
import { catScenarioCorrectFeedback } from "../../../data/species/cat/scenarios";
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
  getCorrectAnswerVideo,
  lifeStageLabelForScenario,
  plainFeedbackText,
  useVideoMetadataPreload,
  withBreedName,
} from "./scenario-ui";

const dogShibaAsset = (fileName: string) => `${dogAssets.life.shibaRoot}/${fileName}`;

export function VideoScenarioActivity({
  scenario,
  answer,
  petName,
  breed,
  onChoose,
  onCorrectComplete,
  onCorrectFeedbackShown,
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
  /** 指定費用須在「做得很好」畫面呈現後才登錄。 */
  deferExpensesUntilFeedback?: boolean;
  onReplay?: () => void;
  continueImmediately?: boolean;
}) {
  const [mode, setMode] = useState<"question" | "incorrect" | "positive">(answer?.finalResult === "correct" ? "positive" : answer ? "incorrect" : "question");
  const [videoFailed, setVideoFailed] = useState(false);
  const [, setVideoFinished] = useState(false);
  const isCatScenario = scenario.id.startsWith("cat-");
  const isRabbitScenario = scenario.id.startsWith("rabbit-");
  const isBirdScenario = scenario.id.startsWith("bird-");
  const isHamsterScenario = scenario.id.startsWith("hamster-");
  const source = isCatScenario || isRabbitScenario || isBirdScenario || isHamsterScenario
    ? undefined
    : scenario.id === "arrival-adjustment"
    ? dogShibaAsset("first-day.mp4")
    : scenario.id === "growing-old"
      ? dogShibaAsset("senior-life.mp4")
      : dogShibaAsset("sick.mp4");
  useVideoMetadataPreload(source);
  useVideoMetadataPreload(isHamsterScenario ? undefined : getCorrectAnswerVideo(scenario.id));
  const selectedChoice = scenario.choices.find((choice) => choice.id === answer?.finalChoiceId);
  const feedbackExpenseShownFor = useRef("");

  function choose(choice: ScenarioChoice) {
    onChoose(choice);
    if (choice.result === "correct" && scenario.stageId === "arrival" && !deferExpensesUntilFeedback) {
      onCorrectFeedbackShown?.(scenario, choice);
    }
    setVideoFailed(false);
    setVideoFinished(false);
    setMode(choice.result === "correct" ? "positive" : "incorrect");
  }

  // Effect 在正確回饋畫面提交後才執行，避免費用動畫早於「做得很好」。
  useEffect(() => {
    if (!deferExpensesUntilFeedback || mode !== "positive" || selectedChoice?.result !== "correct") return;
    const key = `${scenario.id}:${selectedChoice.id}`;
    if (feedbackExpenseShownFor.current === key) return;
    feedbackExpenseShownFor.current = key;
    onCorrectFeedbackShown?.(scenario, selectedChoice);
  }, [deferExpensesUntilFeedback, mode, onCorrectFeedbackShown, scenario, selectedChoice]);

  if (mode === "positive" && selectedChoice) {
    const catFeedback = isCatScenario && !(scenario.id === "cat-illness-vet" && scenario.breedKnowledge)
      ? catScenarioCorrectFeedback[scenario.id as keyof typeof catScenarioCorrectFeedback]
      : undefined;
    // 通用品種流程不再顯示獨立「品種小知識」卡；健康題的內容由題目資料
    // 直接放進既有的物種小知識卡，避免重複且錯誤地標示為特定品種。
    const breedSpecificSuggestion = scenario.breedKnowledge ?? "";
    const [breedKnowledge = "", followupSuggestion = ""] = breedSpecificSuggestion.split("\n\n");
    const completionFeedback = scenario.completionFeedback;
    return (
      <CorrectFeedbackLayout
        variant="single"
        title={completionFeedback?.title}
        videoSrc={getCorrectAnswerVideo(scenario.id)}
        mediaPlaceholder={isHamsterScenario ? <SceneMediaPlaceholder title={withPetName(scenario.title, petName)} /> : undefined}
        videoFailed={videoFailed}
        fallbackText="正向結果影片目前無法播放，仍可繼續生活旅程。"
        intro={completionFeedback ? <p>{renderKnowledgeText(withPetName(completionFeedback.encouragement, petName))}</p> : catFeedback ? <>
          <p>{withPetName(catFeedback.encouragement, petName)}</p>
          <p>{plainFeedbackText(withPetName(selectedChoice.explanation, petName))}</p>
        </> : <p>{plainFeedbackText(withPetName(selectedChoice.explanation, petName))}</p>}
        breedHighlight={breedKnowledge ? <BreedKnowledgeHighlight text={withPetName(breedKnowledge, petName)} label={`${breedLabelForId(breed)}小知識`} /> : null}
        correctItems={completionFeedback ? undefined : catFeedback ? catFeedback.knowledgePoints.map((point) => withPetName(point, petName)) : scenario.learningPoints?.map((point) => withPetName(point, petName))}
        knowledgeContent={completionFeedback?.knowledgeContent.map((content) => ({ ...content, text: withPetName(content.text, petName) }))}
        knowledgeTitle={completionFeedback?.knowledgeTitle ?? catFeedback?.knowledgeTitle ?? scenario.knowledgeTitle ?? (isBirdScenario ? "鳥類小知識" : isRabbitScenario ? "兔子小知識" : undefined)}
        suggestion={completionFeedback?.reminder ? (
          <p>{renderKnowledgeText(withPetName(completionFeedback.reminder, petName))}</p>
        ) : catFeedback ? (
          <p>{plainFeedbackText(withPetName(catFeedback.reminder, petName))}</p>
        ) : followupSuggestion ? (
          <p>{plainFeedbackText(withPetName(followupSuggestion, petName))}</p>
        ) : !completionFeedback && !breedKnowledge && selectedChoice.suggestion ? (
          <p>{plainFeedbackText(withPetName(withBreedName(selectedChoice.suggestion, breed), petName))}</p>
        ) : null}
        otherTips={completionFeedback || catFeedback ? null : <OtherCorrectTips scenario={scenario} choice={selectedChoice} petName={petName} />}
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
          <section className="video-scenario-options"><h2>你會怎麼做？</h2>{scenario.choices.map((choice) => <ScenarioOptionCard key={choice.id} onClick={() => choose(choice)}>{withPetName(choice.text, petName)}</ScenarioOptionCard>)}</section>
        )}
      </div>
    </section>
  );
}

