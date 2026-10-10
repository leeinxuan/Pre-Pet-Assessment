"use client";

import { useEffect, useRef, useState } from "react";
import { getDailyBehaviorScenarioIds, getLifeScenariosForSpecies, getScenarioPresentation } from "../../../data/species/journey";
import type { Scenario, ScenarioAnswer, ScenarioChoice, ScenarioResult } from "../../../game-types";
import { renderKnowledgeText, withPetName } from "./activity-ui";
import {
  CorrectFeedbackLayout,
  IncorrectExplanation,
  SceneMediaPlaceholder,
  ScenarioOptionCard,
  VideoWithToggle,
  lifeStageLabelForScenario,
  plainFeedbackText,
  useVideoMetadataPreload,
} from "./scenario-ui";

export function DailyBehaviorActivityMulti({
  answers,
  petName,
  onChooseMultiple,
  onCorrectExpenseSequence,
  triggerExpenseOnFeedback = false,
  onContinue,
  onReplay,
  continueImmediately = false,
  scenarioIds,
  species = "dog",
  testNextSignal = 0,
}: {
  answers: Record<string, ScenarioAnswer>;
  petName: string;
  onChooseMultiple: (scenario: Scenario, choices: ScenarioChoice[], result: ScenarioResult) => void;
  /** 正確選項全部完成時播放活動費用卡。 */
  onCorrectExpenseSequence?: (scenario: Scenario, choices: ScenarioChoice[]) => Promise<void>;
  /** 費用卡要在「做得很好」頁面出現，而非作答選項畫面。 */
  triggerExpenseOnFeedback?: boolean;
  onContinue: () => void;
  onReplay?: () => void;
  continueImmediately?: boolean;
  scenarioIds?: readonly string[];
  species?: string;
  testNextSignal?: number;
}) {
  const scenarioSource = getLifeScenariosForSpecies(species);
  const scenarios = (scenarioIds ?? getDailyBehaviorScenarioIds(species))
    .map((id) => scenarioSource.find((entry) => entry.id === id))
    .filter((entry): entry is Scenario => Boolean(entry));
  const firstUnfinished = scenarios.findIndex((entry) => answers[entry.id]?.finalResult !== "correct");
  const [currentIndex, setCurrentIndex] = useState(firstUnfinished === -1 ? scenarios.length - 1 : firstUnfinished);
  const [mode, setMode] = useState<"question" | "animating" | "incorrect" | "positive">(
    firstUnfinished === -1 ? "positive" : "question",
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [incorrectOptionId, setIncorrectOptionId] = useState<string | null>(null);
  const [retryCopy, setRetryCopy] = useState<{ title: string; explanation: string; suggestion?: string } | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [, setVideoFinished] = useState(false);
  const expenseSequenceShownFor = useRef("");
  const [expenseSequenceComplete, setExpenseSequenceComplete] = useState(true);
  const scenario = scenarios[currentIndex];
  const presentation = getScenarioPresentation(species, scenario?.id ?? "");
  const behaviorVideoSource = presentation.sceneVideo?.src;
  const correctFeedbackVideo = presentation.correctFeedbackMedia.type === "video" ? presentation.correctFeedbackMedia.src : undefined;
  const nextBehaviorScenario = scenarios[currentIndex + 1];
  const nextPresentation = nextBehaviorScenario ? getScenarioPresentation(species, nextBehaviorScenario.id) : undefined;
  useVideoMetadataPreload(behaviorVideoSource);
  useVideoMetadataPreload(nextPresentation?.sceneVideo?.src);
  useVideoMetadataPreload(correctFeedbackVideo);

  function moveToNext() {
    if (currentIndex === scenarios.length - 1) {
      onContinue();
      return;
    }
    setCurrentIndex((value) => value + 1);
    setSelectedIds([]);
    setIncorrectOptionId(null);
    setRetryCopy(null);
    setMode("question");
    setVideoFailed(false);
    setVideoFinished(false);
    setExpenseSequenceComplete(true);
  }

  // 測試模式的外部前進訊號必須同步到本元件的題目狀態。
  useEffect(() => {
    if (testNextSignal > 0) moveToNext(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [testNextSignal]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!triggerExpenseOnFeedback || mode !== "positive" || !onCorrectExpenseSequence || !scenario) return;
    const selectedChoices = scenario.choices.filter((choice) => selectedIds.includes(choice.id));
    if (selectedChoices.length === 0) return;
    const key = `${scenario.id}:${selectedChoices.map((choice) => choice.id).join(",")}`;
    if (expenseSequenceShownFor.current === key) return;
    expenseSequenceShownFor.current = key;
    void onCorrectExpenseSequence(scenario, selectedChoices).finally(() => setExpenseSequenceComplete(true));
  }, [mode, onCorrectExpenseSequence, scenario, selectedIds, triggerExpenseOnFeedback]);

  if (!scenario) return null;

  const correctChoiceIds = scenario.requiredCorrectOptionIds ?? scenario.choices.filter((choice) => choice.result === "correct").map((choice) => choice.id);
  const wrongChoiceIds = scenario.wrongOptionIds ?? scenario.choices.filter((choice) => choice.result === "incorrect").map((choice) => choice.id);
  const correctSummary = scenario.correctSummary ?? scenario.choices
    .filter((choice) => correctChoiceIds.includes(choice.id))
    .map((choice) => choice.text);
  const learningPoints = scenario.learningPoints ?? correctSummary;
  const correctSelectedCount = selectedIds.filter((id) => correctChoiceIds.includes(id)).length;
  const displayPetName = petName || presentation.defaultPetName;

  function toggleChoice(choiceId: string) {
    if (mode !== "question") return;
    const choice = scenario.choices.find((item) => item.id === choiceId);
    if (!choice) return;

    if (wrongChoiceIds.includes(choiceId) || choice.result === "incorrect") {
      setIncorrectOptionId(choiceId);
      onChooseMultiple(scenario, scenario.choices.filter((item) => selectedIds.includes(item.id) || item.id === choiceId), "incorrect");
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
    setRetryCopy(null);
    const selectedChoices = scenario.choices.filter((item) => nextIds.includes(item.id));
    const hasEveryCorrectChoice = correctChoiceIds.every((id) => nextIds.includes(id));
    if (hasEveryCorrectChoice && nextIds.length === correctChoiceIds.length) {
      onChooseMultiple(scenario, selectedChoices, "correct");
      setVideoFailed(false);
      setVideoFinished(false);
      if (!onCorrectExpenseSequence) {
        setMode("positive");
        return;
      }
      if (triggerExpenseOnFeedback) {
        setExpenseSequenceComplete(false);
        setMode("positive");
        return;
      }
      setMode("animating");
      void onCorrectExpenseSequence(scenario, selectedChoices).then(() => setMode("positive"));
    }
  }

  function retry() {
    setRetryCopy(null);
    setIncorrectOptionId(null);
    setMode("question");
  }

  if (mode === "positive") {
    const completionFeedback = scenario.completionFeedback;
    const completionIntro = completionFeedback?.encouragement
      ? withPetName(completionFeedback.encouragement, petName, species)
      : withPetName(presentation.completionIntro ?? "你選到了這個情境中幾個合適的照顧方式：", displayPetName, species);
    return (
      <CorrectFeedbackLayout
        variant="multiple"
        title={completionFeedback?.title}
        videoSrc={correctFeedbackVideo ?? ""}
        mediaPlaceholder={presentation.correctFeedbackMedia.type === "placeholder" ? <SceneMediaPlaceholder title={withPetName(scenario.title, petName, species)} /> : undefined}
        videoFailed={videoFailed}
        fallbackText="正向結果影片目前無法播放，仍可繼續生活旅程。"
        intro={<p>{renderKnowledgeText(completionIntro)}</p>}
        // 貓咪小知識中的「貓咪」是泛稱，不能被玩家名稱取代；只有明確的 {petName} 佔位符才套用名字。
        correctItems={completionFeedback ? undefined : learningPoints.map((item) => presentation.preserveGenericAnimalTerms
          ? item.replaceAll("{petName}", displayPetName)
          : withPetName(item, petName, species))}
        knowledgeContent={completionFeedback?.knowledgeContent.map((content) => ({ ...content, text: withPetName(content.text, petName, species) }))}
        knowledgeTitle={completionFeedback?.knowledgeTitle ?? scenario.knowledgeTitle ?? presentation.knowledgeTitle}
        suggestion={completionFeedback?.reminder
          ? <p>{renderKnowledgeText(withPetName(completionFeedback.reminder, petName, species))}</p>
          : scenario.completionNotice ? <p>{plainFeedbackText(withPetName(scenario.completionNotice, petName, species))}</p> : null}
        onVideoEnded={() => setVideoFinished(true)}
        onVideoError={() => { setVideoFailed(true); setVideoFinished(true); }}
        onReplay={onReplay}
        onContinue={moveToNext}
        continueImmediately={continueImmediately}
        continueDisabled={triggerExpenseOnFeedback && !expenseSequenceComplete}
        continueHint={triggerExpenseOnFeedback && !expenseSequenceComplete ? "正在加入本次照顧費用…" : undefined}
      />
    );
  }

  return (
    <section className="daily-behavior-activity">
      <div className="daily-behavior-head">
        <p className="life-stage-label">{lifeStageLabelForScenario(scenario)}</p>
        <h1>{withPetName(scenario.title, petName, species)}</h1>
        <p>{renderKnowledgeText(withPetName(scenario.description, petName, species))}</p>
      </div>
      <div className="daily-behavior-video">
        {behaviorVideoSource ? (
          <VideoWithToggle
            src={behaviorVideoSource}
            loop
            ariaLabel={presentation.sceneVideo?.ariaLabel ?? "日常行為照顧影片"}
            onError={() => setVideoFailed(true)}
          />
        ) : (
          <SceneMediaPlaceholder title={withPetName(scenario.title, petName, species)} />
        )}
        {videoFailed && <div className="scene-video-fallback" role="status">影片暫時無法播放，請直接完成右側互動。</div>}
      </div>
      {mode === "incorrect" && incorrectOptionId && retryCopy ? (
        <section className="daily-behavior-retry" aria-live="polite">
          <h2>{retryCopy.title}</h2>
          <IncorrectExplanation text={withPetName(retryCopy.explanation, petName, species)} />
          {retryCopy.suggestion && <div className="incorrect-suggestion"><b>可以這樣調整：</b><p>{withPetName(retryCopy.suggestion, petName, species)}</p></div>}
          <button type="button" className="secondary" onClick={retry}>重新想一次</button>
        </section>
      ) : <section className="reflection daily-behavior-choices">
          <div className="daily-behavior-question-row">
            <h2>{scenario.questionText ?? "此刻需要完成哪些事？（複選）"}</h2>
            <p className="daily-behavior-live-hint visible daily-behavior-progress-hint" role="status">
              {mode === "animating" ? "正在加入本次照顧費用…" : `已找到 ${correctSelectedCount} / ${correctChoiceIds.length} 個合適做法`}
            </p>
          </div>
          <div className="choice-grid">
            {scenario.choices.map((choice) => {
              const selected = selectedIds.includes(choice.id);
              return (
                <ScenarioOptionCard key={choice.id} type="multiple" selected={selected} disabled={mode === "animating"} onClick={() => toggleChoice(choice.id)}>
                  {withPetName(choice.text, petName, species)}
                </ScenarioOptionCard>
              );
            })}
          </div>
        </section>}
    </section>
  );
}
