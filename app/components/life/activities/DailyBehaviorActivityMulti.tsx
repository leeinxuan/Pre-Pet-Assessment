"use client";

import { useEffect, useRef, useState } from "react";
import { getExpenseForSpecies, isTemporaryReserveExpense } from "../../../data/shared/expenses";
import { getLifeScenariosForSpecies } from "../../../data/species/journey";
import { catDailyBehaviorScenarioIds } from "../../../data/species/cat/journey";
import { rabbitDailyBehaviorScenarioIds } from "../../../data/species/rabbit/journey";
import { birdDailyBehaviorScenarioIds } from "../../../data/species/bird/journey";
import { hamsterDailyBehaviorScenarioIds } from "../../../data/species/hamster/journey";
import { dogAssets } from "../../../data/species/dog/assets";
import type { Scenario, ScenarioAnswer, ScenarioChoice, ScenarioResult } from "../../../game-types";
import { renderKnowledgeText, withPetName } from "./activity-ui";
import {
  CorrectFeedbackLayout,
  IncorrectExplanation,
  SceneMediaPlaceholder,
  ScenarioOptionCard,
  VideoWithToggle,
  getCorrectAnswerVideo,
  lifeStageLabelForScenario,
  plainFeedbackText,
  useVideoMetadataPreload,
} from "./scenario-ui";

const dogShibaAsset = (fileName: string) => `${dogAssets.life.shibaRoot}/${fileName}`;

function choiceHasTemporaryReserveExpense(choice: ScenarioChoice, species: string) {
  return (choice.expenseIds ?? []).some((id) => {
    const expense = getExpenseForSpecies(id, species);
    return Boolean(expense && isTemporaryReserveExpense(expense));
  });
}

export const dailyBehaviorScenarioIds = ["behavior-barking", "behavior-chewing", "behavior-toileting"] as const;
export const dailyBehaviorScenarioIdsBySpecies = {
  dog: dailyBehaviorScenarioIds,
  cat: catDailyBehaviorScenarioIds,
  rabbit: rabbitDailyBehaviorScenarioIds,
  bird: birdDailyBehaviorScenarioIds,
  hamster: hamsterDailyBehaviorScenarioIds,
} as const;
const dailyBehaviorVideos: Record<string, string> = {
  "behavior-barking": dogShibaAsset("barking.mp4"),
  "behavior-chewing": dogShibaAsset("chewing-on-things.mp4"),
  "behavior-toileting": dogShibaAsset("urinate-and-defecate.mp4"),
};

export function DailyBehaviorActivityMulti({
  answers,
  petName,
  onChooseMultiple,
  onCorrectFeedbackShown,
  onContinue,
  onReplay,
  continueImmediately = false,
  scenarioIds = dailyBehaviorScenarioIds,
  species = "dog",
  testNextSignal = 0,
}: {
  answers: Record<string, ScenarioAnswer>;
  petName: string;
  onChooseMultiple: (scenario: Scenario, choices: ScenarioChoice[], result: ScenarioResult) => void;
  onCorrectFeedbackShown?: (scenario: Scenario, choices: ScenarioChoice[]) => void;
  onContinue: () => void;
  onReplay?: () => void;
  continueImmediately?: boolean;
  scenarioIds?: readonly string[];
  species?: string;
  testNextSignal?: number;
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
  const [incorrectOptionId, setIncorrectOptionId] = useState<string | null>(null);
  const [retryCopy, setRetryCopy] = useState<{ title: string; explanation: string; suggestion?: string } | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [, setVideoFinished] = useState(false);
  const feedbackExpenseShownFor = useRef("");
  const scenario = scenarios[currentIndex];
  const behaviorVideoSource = species === "rabbit" || species === "hamster"
    ? undefined // 暫用共用影片預留區，待兔子日常素材補齊後由資料設定提供。
    : species === "cat"
    ? dailyBehaviorVideos[scenario?.id ?? ""]
    : scenario
      ? dailyBehaviorVideos[scenario.id] ?? dogShibaAsset("chewing-on-things.mp4")
      : dogShibaAsset("chewing-on-things.mp4");
  const nextBehaviorScenario = scenarios[currentIndex + 1];
  useVideoMetadataPreload(behaviorVideoSource);
  useVideoMetadataPreload(nextBehaviorScenario ? dailyBehaviorVideos[nextBehaviorScenario.id] : undefined);
  useVideoMetadataPreload(species === "hamster" ? undefined : getCorrectAnswerVideo(currentIndex));

  // 臨時性預留費用必須先讓使用者看到正確回饋，再登錄到共用費用明細。
  useEffect(() => {
    if (mode !== "positive" || !scenario) return;
    const selectedChoices = scenario.choices.filter((choice) => selectedIds.includes(choice.id));
    if (!selectedChoices.some((choice) => choiceHasTemporaryReserveExpense(choice, species))) return;
    const key = `${scenario.id}:${selectedChoices.map((choice) => choice.id).join(",")}`;
    if (feedbackExpenseShownFor.current === key) return;
    feedbackExpenseShownFor.current = key;
    onCorrectFeedbackShown?.(scenario, selectedChoices);
  }, [mode, onCorrectFeedbackShown, scenario, selectedIds, species]);

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
  }

  // 測試模式的外部前進訊號必須同步到本元件的題目狀態。
  useEffect(() => {
    if (testNextSignal > 0) moveToNext(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [testNextSignal]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!scenario) return null;

  const correctChoiceIds = scenario.requiredCorrectOptionIds ?? scenario.choices.filter((choice) => choice.result === "correct").map((choice) => choice.id);
  const wrongChoiceIds = scenario.wrongOptionIds ?? scenario.choices.filter((choice) => choice.result === "incorrect").map((choice) => choice.id);
  const correctSummary = scenario.correctSummary ?? scenario.choices
    .filter((choice) => correctChoiceIds.includes(choice.id))
    .map((choice) => choice.text);
  const learningPoints = scenario.learningPoints ?? correctSummary;
  const correctSelectedCount = selectedIds.filter((id) => correctChoiceIds.includes(id)).length;
  const displayPetName = petName || (species === "cat" ? "貓咪" : species === "rabbit" ? "兔子" : species === "hamster" ? "芝麻" : "小狗");
  const correctIntroByScenario: Record<string, string> = {
    "behavior-barking": `你已經找到合適的做法。接著多認識一點${displayPetName}吠叫時可能想傳達的需求。`,
    "behavior-chewing": `你已經找到合適的做法。接著看看狗狗為什麼需要啃咬，以及如何安全地引導${displayPetName}。`,
    "behavior-toileting": `你已經找到合適的做法。如廁不只是記住一個地點，還和${displayPetName}的年齡、時機與健康狀況有關。`,
    "cat-night-energy-care": `你已經找到合適的做法。規律遊戲與安全玩具，能讓${displayPetName}的精力有合適出口。`,
    "cat-scratching-care": `你已經找到合適的做法。提供抓板與安全高處，能讓${displayPetName}用自然方式活動。`,
    "cat-climbing-care": `你已經找到合適的做法。提供安全的垂直活動空間、收好易碎物，並確認門窗與紗窗穩固，能讓${displayPetName}安心探索。`,
    "cat-illness-vet": `你已經先完成觀察、紀錄、聯繫與就醫準備。這些資訊能幫助獸醫判斷，但不取代急症處置。`,
    "rabbit-stomp": `你已經找到合適的回應方式。降低刺激並保留熟悉氣味，能讓${displayPetName}用自己的節奏重新建立安全感。`,
    "rabbit-heatstroke-prevention": `你已經把降溫安排放進日常環境。維持涼爽室內與提供陶板涼感墊，能讓${displayPetName}自己選擇舒服的位置。`,
    "rabbit-shedding": "梳毛是兔子的日常護理核心；局部處理即可，避免全身弄濕與吹風造成壓力。",
  };

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
      setMode("positive");
    }
  }

  function retry() {
    setRetryCopy(null);
    setIncorrectOptionId(null);
    setMode("question");
  }

  if (mode === "positive") {
    const completionFeedback = scenario.completionFeedback;
    return (
      <CorrectFeedbackLayout
        variant="multiple"
        title={completionFeedback?.title}
        videoSrc={getCorrectAnswerVideo(currentIndex)}
        mediaPlaceholder={species === "hamster" ? <SceneMediaPlaceholder title={withPetName(scenario.title, petName)} /> : undefined}
        videoFailed={videoFailed}
        fallbackText="正向結果影片目前無法播放，仍可繼續生活旅程。"
        intro={<p>{renderKnowledgeText(withPetName(completionFeedback?.encouragement ?? correctIntroByScenario[scenario.id] ?? "你選到了這個情境中幾個合適的照顧方式：", petName))}</p>}
        // 貓咪小知識中的「貓咪」是泛稱，不能被玩家名稱取代；只有明確的 {petName} 佔位符才套用名字。
        correctItems={completionFeedback ? undefined : learningPoints.map((item) => species === "cat"
          ? item.replaceAll("{petName}", petName || "貓咪")
          : withPetName(item, petName))}
        knowledgeContent={completionFeedback?.knowledgeContent.map((content) => ({ ...content, text: withPetName(content.text, petName) }))}
        knowledgeTitle={completionFeedback?.knowledgeTitle ?? scenario.knowledgeTitle ?? (species === "cat" ? "貓咪小知識" : species === "rabbit" ? "兔子小知識" : species === "bird" ? "鳥類小知識" : "狗狗小知識")}
        suggestion={completionFeedback?.reminder
          ? <p>{renderKnowledgeText(withPetName(completionFeedback.reminder, petName))}</p>
          : scenario.completionNotice ? <p>{plainFeedbackText(withPetName(scenario.completionNotice, petName))}</p> : null}
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
            ariaLabel={species === "cat" ? "貓咪日常照護影片" : species === "rabbit" ? "兔子日常照護影片" : "日常行為照顧影片"}
            onError={() => setVideoFailed(true)}
          />
        ) : (
          <SceneMediaPlaceholder title={withPetName(scenario.title, petName)} />
        )}
        {videoFailed && <div className="scene-video-fallback" role="status">影片暫時無法播放，請直接完成右側互動。</div>}
      </div>
      {mode === "incorrect" && incorrectOptionId && retryCopy ? (
        <section className="daily-behavior-retry" aria-live="polite">
          <h2>{retryCopy.title}</h2>
          <IncorrectExplanation text={withPetName(retryCopy.explanation, petName)} />
          {retryCopy.suggestion && <div className="incorrect-suggestion"><b>可以這樣調整：</b><p>{withPetName(retryCopy.suggestion, petName)}</p></div>}
          <button type="button" className="secondary" onClick={retry}>重新想一次</button>
        </section>
      ) : <section className="reflection daily-behavior-choices">
          <div className="daily-behavior-question-row">
            <h2>{scenario.questionText ?? "此刻需要完成哪些事？（複選）"}</h2>
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
        </section>}
    </section>
  );
}

