"use client";

import { useEffect, useState } from "react";
import { getBreedChallengeScenarios } from "../../../data/species/journey";
import type { Scenario, ScenarioAnswer, ScenarioChoice } from "../../../game-types";
import { withPetName } from "./activity-ui";
import {
  BreedKnowledgeHighlight,
  CorrectFeedbackLayout,
  IncorrectExplanation,
  ScenarioOptionCard,
  VideoWithToggle,
  breedChallengeLabelForId,
  breedChallengeVideos,
  getCorrectAnswerVideo,
  plainFeedbackText,
} from "./scenario-ui";

export function BreedChallengeActivity({
  breed,
  petName,
  answers,
  onChoose,
  onContinue,
  onReplay,
  continueImmediately = false,
  testNextSignal = 0,
}: {
  breed: string;
  petName: string;
  answers: Record<string, ScenarioAnswer>;
  onChoose: (scenario: Scenario, choice: ScenarioChoice) => void;
  onContinue: () => void;
  onReplay?: () => void;
  continueImmediately?: boolean;
  testNextSignal?: number;
}) {
  const scenarios = getBreedChallengeScenarios(breed);
  const firstUnfinished = scenarios.findIndex((scenario) => answers[scenario.id]?.finalResult !== "correct");
  const [currentIndex, setCurrentIndex] = useState(firstUnfinished === -1 ? scenarios.length - 1 : firstUnfinished);
  const [mode, setMode] = useState<"question" | "incorrect" | "positive">(firstUnfinished === -1 ? "positive" : "question");
  const [feedbackVideoFailed, setFeedbackVideoFailed] = useState(false);
  const [questionVideoFailedFor, setQuestionVideoFailedFor] = useState<string | null>(null);
  const scenario = scenarios[currentIndex];
  const questionVideoFailed = questionVideoFailedFor === scenario?.id;
  const selectedChoice = scenario?.choices.find((choice) => choice.id === answers[scenario.id]?.finalChoiceId);
  const breedLabel = breedChallengeLabelForId(breed);
  const challengeVideoSource = scenario ? breedChallengeVideos[scenario.title] : undefined;

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    if (testNextSignal > 0) moveToNext(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [testNextSignal]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!scenario) return null;

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
            <VideoWithToggle className="breed-challenge-video" src={challengeVideoSource} loop ariaLabel={`${scenario.title}情境影片`} onError={() => setQuestionVideoFailedFor(scenario.id)} />
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
            <h2>{scenario.questionText ?? "你會怎麼做？"}</h2>
            <div>{scenario.choices.map((choice) => <ScenarioOptionCard key={choice.id} onClick={() => choose(choice)}>{withPetName(choice.text, petName)}</ScenarioOptionCard>)}</div>
          </section>
        )}
      </div>
    </section>
  );
}

