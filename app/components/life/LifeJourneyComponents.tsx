"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { expenseCatalog, money, roomItems } from "../../game-data";
import { journeyItems, lifeScenarios } from "../../life-data";
import { walkingPreloadImages, walkingPrepItems, walkingScenes } from "../../data/walkingScenes";
import type {
  CareMember,
  ExpenseRecord,
  LifeActivityState,
  Scenario,
  ScenarioAnswer,
  ScenarioChoice,
  ScenarioResult,
} from "../../game-types";

const arrivalVideoSource = "/assets/pet-journey/arrival-transition.mp4";
const correctAnswerVideos = [
  "/assets/pet-journey/correct-answer.mp4",
  "/assets/pet-journey/correct-answer2.mp4",
] as const;

const scenarioCorrectAnswerVideoIndex: Record<string, number> = {
  "arrival-adjustment": 0,
  "illness-vet": 1,
  "growing-old": 0,
  "busy-daily-care": 1,
};

function getCorrectAnswerVideo(key: number | string) {
  const index = typeof key === "number" ? key : (scenarioCorrectAnswerVideoIndex[key] ?? 0);
  return correctAnswerVideos[Math.abs(index) % correctAnswerVideos.length];
}

function withPetName(text: string, petName: string) {
  return text
    .replaceAll("豆豆", petName)
    .replaceAll("小狗", petName)
    .replaceAll("狗狗", petName);
}

const lifeStageLabels = {
  arrival: "適應新家與安全感",
  daily: "日常生活照護",
  change: "當生活發生變化",
} as const;

function lifeStageLabelForScenario(scenario: Scenario) {
  if (scenario.id === "arrival-adjustment") return lifeStageLabels.arrival;
  if (scenario.id === "illness-vet" || scenario.id === "growing-old") return lifeStageLabels.change;
  return lifeStageLabels.daily;
}

function otherCorrectChoices(scenario: Scenario, choice: ScenarioChoice, petName: string) {
  if (choice.result !== "correct") return [];
  return scenario.choices
    .filter((entry) => entry.result === "correct" && entry.id !== choice.id)
    .filter((entry) => !(scenario.id === "busy-daily-care" && entry.id === "family-helper"))
    .slice(0, 2)
    .map((entry) => withPetName(entry.text, petName));
}

function OtherCorrectTips({ scenario, choice, petName }: { scenario: Scenario; choice: ScenarioChoice; petName: string }) {
  const tips = otherCorrectChoices(scenario, choice, petName);
  if (tips.length === 0) return null;
  return <div className="other-correct-tips"><b>也可以這樣做</b><ul>{tips.map((tip) => <li key={tip}>{tip}</li>)}</ul></div>;
}

export function ArrivalTransitionVideo({ onContinue }: { onContinue: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasFinishedArrivalVideo = useRef(false);
  const startTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const endTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
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

  return (
    <section className="arrival-video-screen" aria-label="接回家影片過場">
      <video
        ref={videoRef}
        src={arrivalVideoSource}
        autoPlay
        playsInline
        preload="auto"
        aria-label="小狗搭乘外出籠抵達新家的過場動畫"
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
      <video ref={videoRef} src="/assets/pet-journey/time-passes-aging.mp4" autoPlay playsInline preload="auto" aria-label="時間流逝過場動畫" onEnded={finish} onError={() => setNeedsManualPlay(true)} />
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
}: {
  scenario: Scenario;
  choice: ScenarioChoice;
  petName: string;
  onRetry: () => void;
  onContinue: () => void;
}) {
  const requiresRetry = scenario.id === "arrival-adjustment" || scenario.id === "illness-vet" || scenario.id === "growing-old";
  const labels = {
    correct: { icon: "✓", button: "繼續生活旅程" },
    partial: { icon: "△", button: "記住建議，繼續" },
    incorrect: { icon: "!", button: "看完建議，繼續" },
  } as const;
  const expenseChanges = (choice.expenseIds ?? []).map((id) => expenseCatalog[id]).filter(Boolean);
  return (
    <section className={`scenario-feedback ${choice.result}`} aria-live="polite">
      <div className="feedback-title"><span>{labels[choice.result].icon}</span><div><small>{scenario.timeLabel}</small><h2>{withPetName(choice.feedbackTitle, petName)}</h2></div></div>
      <p>{withPetName(choice.explanation, petName)}</p>
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
        {choice.result === "incorrect" && <button className="secondary" onClick={onRetry}>重新選一次</button>}
        {(!requiresRetry || choice.result !== "incorrect") && <button className="primary" onClick={onContinue}>{scenario.id === "arrival-adjustment" ? "繼續" : labels[choice.result].button} <span>→</span></button>}
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
}: {
  scenario: Scenario;
  petName: string;
  answer?: ScenarioAnswer;
  backupNames: string[];
  feedbackOpen: boolean;
  onChoose: (choice: ScenarioChoice) => void;
  onRetry: () => void;
  onContinue: () => void;
}) {
  const [sceneVideoFailed, setSceneVideoFailed] = useState(false);
  const scenarioVideo = scenario.id === "arrival-adjustment"
    ? { src: "/assets/pet-journey/first-day.mp4", label: "小狗第一天適應新家的影片" }
    : scenario.id === "illness-vet"
      ? { src: "/assets/pet-journey/sick.mp4", label: "小狗生病與就醫情境影片" }
      : null;
  useEffect(() => setSceneVideoFailed(false), [scenario.id]);
  const selectedChoice = scenario.choices.find((choice) => choice.id === answer?.finalChoiceId);
  if (feedbackOpen && selectedChoice) {
    return <ScenarioFeedback scenario={scenario} choice={selectedChoice} petName={petName} onRetry={onRetry} onContinue={onContinue} />;
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
              : <video className="scene-video" src={scenarioVideo.src} autoPlay loop playsInline preload="metadata" aria-label={scenarioVideo.label} onError={() => setSceneVideoFailed(true)} />
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
            return <button key={choice.id} onClick={() => onChoose(choice)}><p>{text}</p></button>;
          })}
        </div>
      </section>
    </>
  );
}

function VideoScenarioActivity({
  scenario,
  answer,
  petName,
  onChoose,
  onCorrectComplete,
}: {
  scenario: Scenario;
  answer?: ScenarioAnswer;
  petName: string;
  onChoose: (choice: ScenarioChoice) => void;
  onCorrectComplete: () => void;
}) {
  const [mode, setMode] = useState<"question" | "incorrect" | "positive">(answer?.finalResult === "correct" ? "positive" : answer ? "incorrect" : "question");
  const [videoFailed, setVideoFailed] = useState(false);
  const [, setVideoFinished] = useState(false);
  const source = scenario.id === "arrival-adjustment"
    ? "/assets/pet-journey/first-day.mp4"
    : scenario.id === "growing-old"
      ? "/assets/pet-journey/senior-life.mp4"
      : "/assets/pet-journey/sick.mp4";
  const selectedChoice = scenario.choices.find((choice) => choice.id === answer?.finalChoiceId);

  function choose(choice: ScenarioChoice) {
    onChoose(choice);
    setVideoFailed(false);
    setVideoFinished(false);
    setMode(choice.result === "correct" ? "positive" : "incorrect");
  }

  if (mode === "positive" && selectedChoice) {
    return (
      <section className="video-scenario-positive" aria-live="polite">
        <div className="video-scenario-positive-video">
          {videoFailed ? <div className="scene-video-fallback" role="status">正向結果影片目前無法播放，仍可繼續生活旅程。</div> : <video src={getCorrectAnswerVideo(scenario.id)} autoPlay playsInline preload="metadata" aria-label="正確處置後的正向結果影片" onEnded={() => setVideoFinished(true)} onError={() => { setVideoFailed(true); setVideoFinished(true); }} />}
        </div>
        <div className="video-scenario-positive-copy">
          <h2>做得很好！</h2>
          <p>{withPetName(selectedChoice.explanation, petName)}</p>
          {scenario.id === "illness-vet" && selectedChoice.suggestion ? (
            <div className="illness-health-note">
              {withPetName(selectedChoice.suggestion, petName).split("\n").map((line, index) => line ? <p key={`${line}-${index}`}>{line}</p> : <br key={`break-${index}`} />)}
            </div>
          ) : selectedChoice.suggestion ? (
            <p>{withPetName(selectedChoice.suggestion, petName)}</p>
          ) : null}
          <OtherCorrectTips scenario={scenario} choice={selectedChoice} petName={petName} />
          <button type="button" className="primary" onClick={onCorrectComplete}>繼續 <span>→</span></button>
        </div>
      </section>
    );
  }

  return (
    <section className="video-scenario-activity">
      <div className="video-scenario-heading"><p className="life-stage-label">{lifeStageLabelForScenario(scenario)}</p><h1>{withPetName(scenario.title, petName)}</h1><p>{withPetName(scenario.description, petName)}</p></div>
      <div className="video-scenario-layout">
        <div className="video-scenario-visual">
          <video src={source} autoPlay loop playsInline preload="metadata" aria-label={scenario.id === "arrival-adjustment" ? "小狗第一天適應新家的影片" : scenario.id === "growing-old" ? "小狗逐漸進入高齡的情境影片" : "柴犬常見健康問題觀察影片"} onError={() => setVideoFailed(true)} />
          {videoFailed && <div className="scene-video-fallback" role="status">這段情境影片目前無法播放。</div>}
        </div>
        {mode === "incorrect" && selectedChoice ? (
          <section className="video-scenario-retry" aria-live="polite">
            <h2>這個做法可能不太適合</h2>
            <p>{withPetName(selectedChoice.explanation, petName)}</p>
            {selectedChoice.suggestion && <div className="incorrect-suggestion"><b>可以這樣調整：</b><p>{withPetName(selectedChoice.suggestion, petName)}</p></div>}
            <button type="button" className="secondary" onClick={() => setMode("question")}>重新選擇</button>
          </section>
        ) : (
          <section className="video-scenario-options"><h2>你會怎麼做？</h2>{scenario.choices.map((choice) => <button type="button" key={choice.id} onClick={() => choose(choice)}><b>{withPetName(choice.text, petName)}</b></button>)}</section>
        )}
      </div>
    </section>
  );
}

const dailyBehaviorScenarioIds = ["behavior-barking", "behavior-chewing", "behavior-toileting"] as const;
const dailyBehaviorVideos: Record<string, string> = {
  "behavior-barking": "/assets/pet-journey/barking.mp4",
  "behavior-chewing": "/assets/pet-journey/chewing-on-things.mp4",
  "behavior-toileting": "/assets/pet-journey/urinate-and-defecate.mp4",
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
            <video
              src={getCorrectAnswerVideo(currentIndex)}
              autoPlay
              playsInline
              preload="metadata"
              aria-label="改善後的正向結果影片"
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
          <p>{withPetName(correctIntroByScenario[scenario.id] ?? "做得很好！你選到了這個情境中幾個合適的照顧方式：", petName)}</p>
          <ul className="daily-behavior-correct-list">
            {correctSummary.map((item) => <li key={item}>{withPetName(item, petName)}</li>)}
          </ul>
          <button type="button" className="primary" onClick={moveToNext}>繼續 <span>?</span></button>
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
        <video
          src={dailyBehaviorVideos[scenario.id] ?? "/assets/pet-journey/chewing-on-things.mp4"}
          autoPlay
          loop
          playsInline
          preload="metadata"
          aria-label="小狗日常行為問題情境影片"
          onError={() => setVideoFailed(true)}
        />
        {videoFailed && <div className="scene-video-fallback" role="status">這段情境影片目前無法播放。</div>}
      </div>
      {mode === "incorrect" && selectedChoice ? (
        <section className="daily-behavior-retry" aria-live="polite">
          <h2>這個做法可能不太適合</h2>
          <p>{withPetName(selectedChoice.explanation, petName)}</p>
          {selectedChoice.suggestion && <div className="incorrect-suggestion"><b>可以這樣調整：</b><p>{withPetName(selectedChoice.suggestion, petName)}</p></div>}
          <button type="button" className="secondary" onClick={retry}>重新選擇</button>
        </section>
      ) : (
        <section className="reflection daily-behavior-choices">
          <h2>???????????</h2>
          <div className="choice-grid">
            {scenario.choices.map((choice) => (
              <button key={choice.id} type="button" onClick={() => choose(choice)}>
                <p>{withPetName(choice.text, petName)}</p>
              </button>
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
}: {
  answers: Record<string, ScenarioAnswer>;
  petName: string;
  onChooseMultiple: (scenario: Scenario, choices: ScenarioChoice[], result: ScenarioResult) => void;
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
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [retryCopy, setRetryCopy] = useState<{ title: string; explanation: string; suggestion?: string } | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [, setVideoFinished] = useState(false);
  const scenario = scenarios[currentIndex];

  if (!scenario) return null;

  const correctChoiceIds = scenario.requiredCorrectOptionIds ?? scenario.choices.filter((choice) => choice.result === "correct").map((choice) => choice.id);
  const wrongChoiceIds = scenario.wrongOptionIds ?? scenario.choices.filter((choice) => choice.result === "incorrect").map((choice) => choice.id);
  const correctSummary = scenario.correctSummary ?? scenario.choices
    .filter((choice) => correctChoiceIds.includes(choice.id))
    .map((choice) => choice.text);
  const displayPetName = petName || "小狗";
  const correctIntroByScenario: Record<string, string> = {
    "behavior-barking": `做得很好！面對${displayPetName}吠叫時，重點是先理解牠為什麼叫，再用合適的方式協助牠穩定下來，可以這樣做：`,
    "behavior-chewing": `做得很好！${displayPetName}亂咬東西常和探索、無聊、換牙或壓力有關，先提供安全替代物並管理環境會更合適，可以這樣做：`,
    "behavior-toileting": `做得很好！${displayPetName}如廁習慣需要時間建立，重點是提供固定地點、增加外出機會，並觀察是否有健康或壓力因素，可以這樣做：`,
  };

  function toggleChoice(choiceId: string) {
    setRetryCopy(null);
    const choice = scenario.choices.find((item) => item.id === choiceId);
    if (!choice) return;

    if (wrongChoiceIds.includes(choiceId) || choice.result === "incorrect") {
      onChooseMultiple(scenario, [choice], "incorrect");
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
    setSelectedIds([]);
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
      <section className="daily-behavior-positive" aria-live="polite">
        <div className="daily-behavior-positive-video">
          {videoFailed ? (
            <div className="scene-video-fallback" role="status">影片暫時無法播放，但你已完成這個情境。</div>
          ) : (
            <video
              src={getCorrectAnswerVideo(currentIndex)}
              autoPlay
              playsInline
              preload="metadata"
              aria-label="正向回饋影片"
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
          <p>{withPetName(correctIntroByScenario[scenario.id] ?? "做得很好！你選到了這個情境中幾個合適的照顧方式：", petName)}</p>
          <ul className="daily-behavior-correct-list">
            {correctSummary.map((item) => <li key={item}>{withPetName(item, petName)}</li>)}
          </ul>
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
        <video
          src={dailyBehaviorVideos[scenario.id] ?? "/assets/pet-journey/chewing-on-things.mp4"}
          autoPlay
          loop
          playsInline
          preload="metadata"
          aria-label="日常行為照顧影片"
          onError={() => setVideoFailed(true)}
        />
        {videoFailed && <div className="scene-video-fallback" role="status">影片暫時無法播放，請直接完成右側互動。</div>}
      </div>
      {mode === "incorrect" && retryCopy ? (
        <section className="daily-behavior-retry" aria-live="polite">
          <h2>{retryCopy.title}</h2>
          <p>{withPetName(retryCopy.explanation, petName)}</p>
          {retryCopy.suggestion && <div className="incorrect-suggestion"><b>可以這樣調整：</b><p>{withPetName(retryCopy.suggestion, petName)}</p></div>}
          <button type="button" className="secondary" onClick={retry}>重新選擇</button>
        </section>
      ) : (
                                <section className="reflection daily-behavior-choices">
          <h2>你會怎麼處理？（複選）</h2>
          <div className="choice-grid">
            {scenario.choices.map((choice) => {
              const selected = selectedIds.includes(choice.id);
              return (
                <button
                  key={choice.id}
                  type="button"
                  className={selected ? "selected" : ""}
                  aria-pressed={selected}
                  onClick={() => toggleChoice(choice.id)}
                >
                  <span aria-hidden="true">{selected ? "✓" : ""}</span>
                  <p>{withPetName(choice.text, petName)}</p>
                </button>
              );
            })}
          </div>
          <p className={`daily-behavior-live-hint ${selectedIds.length > 0 && correctChoiceIds.some((id) => !selectedIds.includes(id)) ? "visible" : ""}`} role="status" aria-hidden={!(selectedIds.length > 0 && correctChoiceIds.some((id) => !selectedIds.includes(id)))}>
            還有可以補充的處理方式，請再看看其他選項。
          </p>
        </section>
      )}
    </section>
  );
}

function BusyCareActivity({
  scenario,
  answer,
  petName,
  members: _members,
  onMembersChange: _onMembersChange,
  onChoose,
  onContinue,
}: {
  scenario: Scenario;
  answer?: ScenarioAnswer;
  petName: string;
  members: CareMember[];
  onMembersChange: (members: CareMember[]) => void;
  onChoose: (choice: ScenarioChoice) => void;
  onContinue: () => void;
}) {
  const [mode, setMode] = useState<"question" | "family" | "incorrect" | "positive">(answer?.finalResult === "correct" ? "positive" : "question");
  const [familyFeedback, setFamilyFeedback] = useState<{ name: string; reason: string } | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [, setVideoFinished] = useState(false);
  const selectedChoice = scenario.choices.find((choice) => choice.id === answer?.finalChoiceId);
  const familyOptions = [
    { id: "dad", name: "爸爸", label: "近期工作繁忙的爸爸", reason: "爸爸近期工作繁忙，可能無法穩定負責餵食、飲水、排泄與陪伴。" },
    { id: "younger-brother", name: "年幼的弟弟", label: "年幼的弟弟", reason: "弟弟年紀太小，還不能獨立照顧小狗，也不適合單獨承擔照顧責任。" },
  ];

  function choose(choice: ScenarioChoice) {
    if (choice.id === "family-helper") {
      setFamilyFeedback(null);
      setMode("family");
      return;
    }
    onChoose(choice);
    setVideoFailed(false);
    setVideoFinished(false);
    setMode(choice.result === "correct" ? "positive" : "incorrect");
  }

  if (mode === "positive" && selectedChoice) {
    return (
      <section className="busy-care-positive" aria-live="polite">
        <div className="busy-care-positive-video">
          {videoFailed ? <div className="scene-video-fallback" role="status">正向結果影片目前無法播放，仍可繼續生活旅程。</div> : <video src={getCorrectAnswerVideo(scenario.id)} autoPlay playsInline preload="metadata" aria-label="安排照顧支援後的正向結果影片" onEnded={() => setVideoFinished(true)} onError={() => { setVideoFailed(true); setVideoFinished(true); }} />}
        </div>
        <div className="busy-care-positive-copy"><h2>做得很好！</h2><p>{withPetName(selectedChoice.explanation, petName)}</p><OtherCorrectTips scenario={scenario} choice={selectedChoice} petName={petName} /><small>事先確認與交接，能讓{petName}在你忙碌時仍獲得餵食、飲水、排泄照顧與陪伴。</small><button type="button" className="primary" onClick={onContinue}>繼續 <span>→</span></button></div>
      </section>
    );
  }

  return (
    <section className="busy-care-activity">
      <div className="busy-care-heading"><p className="life-stage-label">{lifeStageLabels.daily}</p><h1>忙碌時的日常照顧</h1><p>{withPetName(scenario.description, petName)}</p></div>
      <div className="busy-care-layout">
        <div className="busy-care-room" aria-label="小狗在房間中等待照顧的情境">
          <img className="busy-care-room-background" src="/assets/room/empty-room.png" alt="居家房間場景" />
          <img className="busy-care-hungry-dog" src="/assets/pet-journey/shiba-hungry.png" alt={`${petName}趴在房間裡等待照顧`} />
        </div>
        {mode === "family" ? (
          <section className="busy-care-members" aria-live="polite">
            <div><h2>先確認家人是否真的能協助</h2></div>
            {!familyFeedback && <div className="busy-care-member-list busy-care-family-options">{familyOptions.map((member) => <button key={member.id} type="button" onClick={() => setFamilyFeedback({ name: member.name, reason: member.reason })}><b>{member.label}</b></button>)}</div>}
            {familyFeedback && <div className="busy-care-family-feedback" role="alert"><b>{familyFeedback.name}目前不適合協助</b><p>{withPetName(familyFeedback.reason, petName)}</p></div>}
            <div className="busy-care-member-actions"><button type="button" className="secondary" onClick={() => setFamilyFeedback(null)}>重新選擇家庭成員</button><button type="button" className="primary" onClick={() => { setFamilyFeedback(null); setMode("question"); }}>返回上一層，改選其他照顧方式 <span>→</span></button></div>
          </section>
        ) : mode === "incorrect" && selectedChoice ? (
          <section className="busy-care-feedback incorrect busy-care-feedback--standard" aria-live="polite">
            <h2>這個做法可能不太適合</h2>
            <p>{withPetName(selectedChoice.explanation, petName)}</p>
            {selectedChoice.suggestion && <div className="incorrect-suggestion"><b>可以這樣調整：</b><p>{withPetName(selectedChoice.suggestion, petName)}</p></div>}
            <button type="button" className="secondary" onClick={() => setMode("question")}>重新選擇</button>
          </section>
        ) : (
          <section className="busy-care-options"><h2>你會怎麼安排？</h2>{scenario.choices.map((choice) => <button type="button" key={choice.id} onClick={() => choose(choice)}><b>{withPetName(choice.text, petName)}</b></button>)}</section>
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
          {!videoFailed && <video ref={videoRef} className="warning-signal-video" src="/assets/pet-journey/dog-body-language.mp4" playsInline preload="metadata" aria-label="小狗警告訊號教學影片" onTimeUpdate={syncSegment} onEnded={finishVideo} onError={() => { setVideoFailed(true); finishVideo(); }} />}
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
  onChange,
  onAddExpense,
  onContinue,
}: {
  activity: LifeActivityState;
  petName: string;
  onChange: (patch: Partial<LifeActivityState>) => void;
  onAddExpense: (id: string) => void;
  onContinue: () => void;
}) {
  const complete = activity.arrivalMealFoodReady && activity.arrivalMealWaterReady;
  const hasRecordedMeal = useRef(false);
  const [foodWarning, setFoodWarning] = useState<{ title: string; text: string } | null>(null);
  useEffect(() => {
    if (!complete || hasRecordedMeal.current) return;
    hasRecordedMeal.current = true;
    onAddExpense("monthly-food-main");
  }, [complete, onAddExpense]);
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
  function warnUnsafeFood(kind: "macadamia" | "bones") {
    setFoodWarning(kind === "macadamia"
      ? {
        title: "這個不能給小狗吃",
        text: "常見的人類食物例如洋蔥、大蒜、巧克力、葡萄、堅果類（例如：夏威夷豆）、口香糖（含木糖醇）等，對犬隻而言可能會造成健康危害。另外，太鹹、太油或含有咖啡因的食物，也不適合犬隻食用。",
      }
      : {
        title: "吃剩的骨頭不適合當作正餐",
        text: "許多民眾會將吃過的骨頭、便當或剩菜剩飯當作犬隻的食物來源之一，但除了必須注意犬隻的營養均衡與日食物安全適當之外，啃食骨頭或剩食中較堅硬的殘渣，可能造成犬隻口腔或消化道危害，建議避免餵食此類食物。",
      });
  }
  return (
    <section className="arrival-meal-activity" aria-label={`為${petName}準備第一餐`}>
      <div className="arrival-meal-heading">
        <p className="life-stage-label">{lifeStageLabels.daily}</p>
        <h1>幫{petName}準備第一餐</h1>
        <p>{petName}剛到新家，還有些不安。先幫{petName}準備合適的主食與乾淨飲水，讓牠慢慢安心下來。</p>
      </div>
      <aside className="arrival-meal-supplies" aria-label="晚餐用品">
        {!activity.arrivalMealFoodReady && <button type="button" className="arrival-meal-supply-food-button" onClick={prepareFood}><img className="arrival-meal-supply-food" src="/assets/room/food.png" alt="飼料" /><span>飼料</span></button>}
        {!activity.arrivalMealWaterReady && <button type="button" onClick={prepareWater}><img src="/assets/pet-journey/waterbottle.png" alt="水瓶" /><span>水</span></button>}
        <button type="button" className={foodWarning?.title === "這個不能給小狗吃" ? "arrival-meal-unsafe warning" : "arrival-meal-unsafe"} onClick={() => warnUnsafeFood("macadamia")}><img src="/assets/pet-journey/macadamia-nuts.png" alt="夏威夷豆" /><span>夏威夷豆</span></button>
        <button type="button" className={foodWarning?.title === "吃剩的骨頭不適合當作正餐" ? "arrival-meal-unsafe warning" : "arrival-meal-unsafe"} onClick={() => warnUnsafeFood("bones")}><img src="/assets/pet-journey/leftover-bones.png" alt="吃剩的骨頭" /><span>吃剩的骨頭</span></button>
      </aside>
      <div className="arrival-meal-scene">
        <img className="arrival-meal-room" src="/assets/room/empty-room.png" alt="小狗的新家房間" />
        {foodWarning && <div className="arrival-meal-warning" role="alert"><b>{foodWarning.title}</b><p>{foodWarning.text}</p></div>}
        <img className="arrival-meal-dog" src={complete ? "/assets/pet-journey/shiba-dog.png" : "/assets/pet-journey/shiba-sad.png"} alt={complete ? `${petName}開心地坐在房間裡` : `${petName}還在等待晚餐與飲水`} />
        <img className="arrival-meal-water" src={activity.arrivalMealWaterReady ? "/assets/room/water-bowl.png" : "/assets/pet-journey/empty-water-bowl.png"} alt={activity.arrivalMealWaterReady ? "裝好水的水碗" : "空水碗"} />
        <img className="arrival-meal-food" src={activity.arrivalMealFoodReady ? "/assets/room/food-bowl.png" : "/assets/pet-journey/empty-food-bowl.png"} alt={activity.arrivalMealFoodReady ? "裝好飼料的狗碗" : "空飼料碗"} />
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

function WalkingActivity({
  activity,
  petName,
  onChange,
  onAddExpense,
  onContinue,
}: {
  activity: LifeActivityState;
  petName: string;
  onChange: (patch: Partial<LifeActivityState>) => void;
  onAddExpense: (id: string) => void;
  onContinue: () => void;
}) {
  const [started, setStarted] = useState(activity.walkingMinutes > 0 || activity.walkingComplete);
  const [position, setPosition] = useState(0);
  const [moving, setMoving] = useState(false);
  const [message, setMessage] = useState("");
  const [completedSceneIndex, setCompletedSceneIndex] = useState<number | null>(null);
  const completingSceneRef = useRef<number | null>(null);
  const movingTimerRef = useRef<number | null>(null);
  const sceneIndex = Math.min(activity.walkingSceneIndex, walkingScenes.length - 1);
  const scene = walkingScenes[sceneIndex];
  const prepared = activity.walkingPreparedItems;
  const allPrepared = walkingPrepItems.every((item) => prepared.includes(item.id));
  const needsCleanup = started && scene.poopEvent && position >= 50 && !activity.walkingPoopCleaned;
  const progressMinutes = Math.min(20, activity.walkingMinutes);
  const walkingInstruction = "按下鍵盤右方向鍵，陪牠一步一步往前走。散步不只是運動，也是牠探索環境、放鬆心情和練習與世界相處的時間。";
  const walkingEventMessage = scene.poopEvent && position >= 50
    ? activity.walkingPoopCleaned
      ? { title: "做得很好！", body: "散步時清理排泄物，也是照顧責任的一部分。" }
      : { title: "散步中的小事件", body: "牠在路上排泄了，先停下來幫牠清理乾淨，再繼續往前走。" }
    : null;

  useEffect(() => {
    walkingPreloadImages.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    setPosition(0);
    setMoving(false);
    setCompletedSceneIndex(null);
    completingSceneRef.current = null;
  }, [activity.walkingSceneIndex]);

  useEffect(() => () => {
    if (movingTimerRef.current !== null) window.clearTimeout(movingTimerRef.current);
  }, []);

  useEffect(() => {
    if (!started || activity.walkingComplete || completedSceneIndex === null) return;
    if (completedSceneIndex !== sceneIndex) return;
    const complete = completedSceneIndex >= walkingScenes.length - 1;
    const nextMinutes = Math.min(20, activity.walkingMinutes + 5);
    onChange({
      walkingMinutes: nextMinutes,
      walkingSceneIndex: complete ? completedSceneIndex : completedSceneIndex + 1,
      walkingComplete: complete,
    });
    setMessage(complete ? "散步時間達到 20 分鐘！" : `完成「${walkingScenes[completedSceneIndex].title}」，散步時間 +5 分鐘。`);
  }, [activity.walkingComplete, activity.walkingMinutes, completedSceneIndex, onChange, sceneIndex, started]);

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

  const advanceWalk = useCallback(() => {
    if (!started || activity.walkingComplete) return;
    if (needsCleanup) {
      setMessage("先把排泄物清理乾淨，再繼續散步。");
      setMoving(false);
      return;
    }
    setMoving(true);
    if (movingTimerRef.current !== null) window.clearTimeout(movingTimerRef.current);
    movingTimerRef.current = window.setTimeout(() => setMoving(false), 180);
    setPosition((current) => {
      if (scene.poopEvent && current >= 50 && !activity.walkingPoopCleaned) {
        setMoving(false);
        return 50;
      }
      const next = Math.min(100, current + 3);
      if (next >= 100 && current < 100 && completingSceneRef.current !== sceneIndex) {
        completingSceneRef.current = sceneIndex;
        setCompletedSceneIndex(sceneIndex);
      }
      return next;
    });
  }, [activity.walkingComplete, activity.walkingPoopCleaned, needsCleanup, scene.poopEvent, sceneIndex, started]);

  useEffect(() => {
    if (!started || activity.walkingComplete) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "ArrowRight") return;
      event.preventDefault();
      advanceWalk();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [started, activity.walkingComplete, advanceWalk]);

  function cleanupPoop() {
    onChange({ walkingPoopCleaned: true });
    setMessage("已清理完成，散步時記得隨手清理排泄物。");
  }

  if (activity.walkingComplete) {
    return (
      <section className="walking-activity walking-complete">
        <div className="walking-complete-card">
          <h1>今天的散步完成了！</h1>
          <p>你陪{petName}完成了至少 20 分鐘的活動，也記得清理排泄物。</p>
          <p>規律散步能讓狗狗有機會探索環境、消耗體力，也有助於維持生理與心理健康。</p>
          <button type="button" className="primary" onClick={onContinue}>繼續生活旅程 <span>→</span></button>
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
          {!started && <p>一天的照顧不只是在家餵食和陪伴，狗狗也需要規律外出活動。散步能讓牠探索環境、消耗體力、練習社會化，也有機會完成排泄。出門前，先把安全與清潔用品準備好吧。</p>}
        </div>
      </div>

      {!started ? (
        <div className="walking-prep">
          <section className="walking-prep-supplies" aria-label="出門前準備用品">
            <h2>出門前，先確認這些東西</h2>
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
        </div>
      ) : (
        <div className="walking-game">
          <p className="walking-game-hint">{walkingInstruction}</p>
          <div
            className={`walking-scene ${moving ? "is-moving" : ""}`}
            tabIndex={0}
            aria-label="散步場景，按鍵盤右方向鍵前進"
          >
            <img className="walking-bg" src={scene.image} alt={scene.title} />
            <div className="walking-progress walking-progress-overlay" aria-label={`散步進度 ${progressMinutes} / 20 分鐘`}>
              <b>散步進度</b>
              <div><span style={{ width: `${(progressMinutes / 20) * 100}%` }} /></div>
              <small>{progressMinutes} / 20 分鐘</small>
            </div>
            {walkingEventMessage && (
              <div className="walking-event-card" role="status">
                <b>{walkingEventMessage.title}</b>
                <p>{walkingEventMessage.body}</p>
              </div>
            )}
            <div className="walking-character" style={{ left: `${Math.min(78, 5 + position * 0.73)}%` }}>
              <img
                src={needsCleanup ? "/assets/walking/walker-and-dog-poop.png" : "/assets/walking/walker-and-dog.png"}
                alt={`正在和${petName}散步的人物與小狗`}
              />
              {needsCleanup && <button type="button" className="walking-poop" onClick={cleanupPoop} aria-label="清理排泄物"><img src="/assets/walking/poop.png" alt="" /></button>}
            </div>
            <div className="walk-key-hint" aria-hidden="true">
              <div className="walk-key-hint-inner">
                <span className="keycap">→</span>
                <span className="key-hint-text">按右鍵前進</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="primary walking-mobile-forward"
            onPointerDown={advanceWalk}
            disabled={needsCleanup}
          >
            點一下往前走
          </button>
        </div>
      )}
    </section>
  );
}

export function LifeJourney({
  index,
  petName,
  answers,
  activity,
  completedIds,
  expenses,
  backupNames,
  members,
  roomReady,
  onIndex,
  onChoose,
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
  answers: Record<string, ScenarioAnswer>;
  activity: LifeActivityState;
  completedIds: string[];
  expenses: ExpenseRecord[];
  backupNames: string[];
  members: CareMember[];
  roomReady: string[];
  onIndex: (index: number) => void;
  onChoose: (scenario: Scenario, choice: ScenarioChoice) => void;
  onChooseMultiple: (scenario: Scenario, choices: ScenarioChoice[], result: ScenarioResult) => void;
  onMembersChange: (members: CareMember[]) => void;
  onActivityChange: (patch: Partial<LifeActivityState>) => void;
  onCompleteItem: (id: string) => void;
  onAddExpense: (id: string) => void;
  onStageChange: (step: number) => void;
  onBack: () => void;
  onComplete: () => void;
}) {
  const item = journeyItems[index];
  const scenario = item.scenarioId ? lifeScenarios.find((entry) => entry.id === item.scenarioId) : undefined;
  const answer = scenario ? answers[scenario.id] : undefined;
  const isDailyBehaviorActivity = item.id === "behavior";
  const isWalkingActivity = item.id === "walking";
  const isBusyCareActivity = item.id === "busy-care" && scenario?.id === "busy-daily-care";
  const isVideoFeedbackScenario = scenario?.id === "arrival-adjustment" || scenario?.id === "illness-vet" || scenario?.id === "growing-old";
  const [arrivalMealOpen, setArrivalMealOpen] = useState(false);
  const showArrivalMeal = scenario?.id === "arrival-adjustment" && answer?.finalResult === "correct" && arrivalMealOpen;
  const [feedbackOpen, setFeedbackOpen] = useState(Boolean(answer));
  const [timePassOpen, setTimePassOpen] = useState(false);
  useEffect(() => {
    setTimePassOpen(false);
    setArrivalMealOpen(false);
  }, [index]);

  const completedCount = completedIds.length;

  function selectItem(next: number) {
    const nextScenarioId = journeyItems[next].scenarioId;
    setFeedbackOpen(Boolean(nextScenarioId && answers[nextScenarioId]));
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
    if (index === journeyItems.length - 1) {
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

  if (timePassOpen && item.scenarioId === "illness-vet") {
    return <TimePassTransition onComplete={() => {
      onActivityChange({ sickTimePassComplete: true });
      setTimePassOpen(false);
      selectItem(index + 1);
    }} />;
  }

  return (
    <div className="content-wrap life-journey-page">
      {isDailyBehaviorActivity ? (
        <DailyBehaviorActivityMulti
          answers={answers}
          petName={petName}
          onChooseMultiple={onChooseMultiple}
          onContinue={continueJourney}
        />
      ) : isWalkingActivity ? (
        <WalkingActivity
          activity={activity}
          petName={petName}
          onChange={onActivityChange}
          onAddExpense={onAddExpense}
          onContinue={continueJourney}
        />
      ) : isBusyCareActivity && scenario ? (
        <BusyCareActivity
          scenario={scenario}
          answer={answer}
          petName={petName}
          members={members}
          onMembersChange={onMembersChange}
          onChoose={choose}
          onContinue={continueJourney}
        />
      ) : isVideoFeedbackScenario && scenario && !showArrivalMeal ? (
        <VideoScenarioActivity
          scenario={scenario}
          answer={answer}
          petName={petName}
          onChoose={choose}
          onCorrectComplete={() => {
            if (scenario.id === "arrival-adjustment") setArrivalMealOpen(true);
            else continueJourney();
          }}
        />
      ) : scenario && (showArrivalMeal ? (
        <ArrivalMealActivity
          activity={activity}
          petName={petName}
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
        />
      ))}
      <div className="scenario-bottom-nav life-bottom-nav">
        <button className="secondary" onClick={() => index > 0 ? selectItem(index - 1) : onBack()}>← {index > 0 ? "上一個生活內容" : "返回出發前準備"}</button>
      </div>
      <span className="visually-hidden">目前共登記 {expenses.length} 筆費用，所有費用以唯一識別碼避免重複。</span>
    </div>
  );
}
