"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { expenseCatalog, money, roomItems } from "./game-data";
import { journeyItems, lifeScenarios } from "./life-data";
import type {
  CareMember,
  ExpenseRecord,
  LifeActivityState,
  Scenario,
  ScenarioAnswer,
  ScenarioChoice,
} from "./game-types";

const arrivalVideoSources = [
  "/assets/pet-journey/arrival-transition.mp4",
  "/assets/pet-journey/arrival-transition2.mp4",
] as const;

function withPetName(text: string, petName: string) {
  return text
    .replaceAll("豆豆", petName)
    .replaceAll("小狗", petName)
    .replaceAll("狗狗", petName);
}

export function ArrivalTransitionVideo({ onContinue }: { onContinue: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasFinishedArrivalVideo = useRef(false);
  const startTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const endTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const onContinueRef = useRef(onContinue);
  const [currentVideo, setCurrentVideo] = useState<0 | 1>(0);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    onContinueRef.current = onContinue;
  }, [onContinue]);

  const finishArrivalVideo = useCallback(() => {
    if (hasFinishedArrivalVideo.current) return;
    hasFinishedArrivalVideo.current = true;
    if (startTimeoutRef.current !== null) window.clearTimeout(startTimeoutRef.current);
    videoRef.current?.pause();
    onContinueRef.current();
  }, []);

  const showFinalFrame = useCallback(() => {
    if (hasFinishedArrivalVideo.current) return;
    hasFinishedArrivalVideo.current = true;
    if (startTimeoutRef.current !== null) window.clearTimeout(startTimeoutRef.current);
    videoRef.current?.pause();
    setShowWelcome(true);
    endTimeoutRef.current = window.setTimeout(() => onContinueRef.current(), 1600);
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
    };
  }, [currentVideo, showFinalFrame]);

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
    if (currentVideo === 0) {
      setNeedsManualPlay(false);
      setCurrentVideo(1);
      return;
    }
    showFinalFrame();
  }

  function handleVideoError() {
    if (currentVideo === 0) {
      setCurrentVideo(1);
      return;
    }
    showFinalFrame();
  }

  return (
    <section className="arrival-video-screen" aria-label="接回家影片過場">
      <video
        ref={videoRef}
        src={arrivalVideoSources[currentVideo]}
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
      {showWelcome && <h1 className="arrival-video-welcome">歡迎來到新家</h1>}
    </section>
  );
}

function stageForIndex(index: number) {
  if (index <= 0) return 3;
  if (index <= 2) return 4;
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
      <video ref={videoRef} src="/assets/pet-journey/time passes.mp4" autoPlay playsInline preload="auto" aria-label="時間流逝過場動畫" onEnded={finish} onError={() => setNeedsManualPlay(true)} />
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
      {choice.suggestion && <div className="feedback-suggestion"><b>可以這樣調整</b><p>{withPetName(choice.suggestion, petName)}</p></div>}
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
          <p className="eyebrow">{scenario.topic}</p>
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
              : <video className="scene-video" src={scenarioVideo.src} autoPlay loop muted playsInline preload="metadata" aria-label={scenarioVideo.label} onError={() => setSceneVideoFailed(true)} />
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
            return <button key={choice.id} onClick={() => onChoose(choice)}><span>{choice.result === "correct" ? "可行做法" : choice.result === "partial" ? "需要調整" : "先想一想"}</span><p>{text}</p></button>;
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
  const [videoFinished, setVideoFinished] = useState(false);
  const source = scenario.id === "arrival-adjustment"
    ? "/assets/pet-journey/first-day.mp4"
    : scenario.id === "growing-old"
      ? "/assets/pet-journey/time passes_old.mp4"
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
          {videoFailed ? <div className="scene-video-fallback" role="status">正向結果影片目前無法播放，仍可繼續生活旅程。</div> : <video src="/assets/pet-journey/correct-answer.mp4" autoPlay muted playsInline preload="metadata" aria-label="正確處置後的正向結果影片" onEnded={() => setVideoFinished(true)} onError={() => { setVideoFailed(true); setVideoFinished(true); }} />}
        </div>
        <div className="video-scenario-positive-copy"><span>✓ 適當處置</span><h2>做得很好！</h2><p>{withPetName(selectedChoice.explanation, petName)}</p><small>{scenario.id === "arrival-adjustment" ? "你已替牠保留適應新家的空間。接著一起準備第一餐吧。" : scenario.id === "growing-old" ? "提早安排醫療準備與健康觀察，能讓高齡階段的照顧更穩定。" : "及早觀察、記錄並聯絡獸醫，能讓小狗獲得更適當的照顧。"}</small>{videoFinished && <button type="button" className="primary" onClick={onCorrectComplete}>繼續 <span>→</span></button>}</div>
      </section>
    );
  }

  return (
    <section className="video-scenario-activity">
      <div className="video-scenario-heading"><span>{scenario.topic}</span><h1>{withPetName(scenario.title, petName)}</h1><p>{withPetName(scenario.description, petName)}</p></div>
      <div className="video-scenario-layout">
        <div className="video-scenario-visual">
          <video src={source} autoPlay loop muted playsInline preload="metadata" aria-label={scenario.id === "arrival-adjustment" ? "小狗第一天適應新家的影片" : scenario.id === "growing-old" ? "小狗逐漸進入高齡的情境影片" : "小狗食慾與精神狀況變差的影片"} onError={() => setVideoFailed(true)} />
          {videoFailed && <div className="scene-video-fallback" role="status">這段情境影片目前無法播放。</div>}
        </div>
        {mode === "incorrect" && selectedChoice ? (
          <section className="video-scenario-retry" aria-live="polite"><h2>這個做法可能不太適合</h2><p>{withPetName(selectedChoice.explanation, petName)}</p>{selectedChoice.suggestion && <p><b>可以這樣調整：</b>{withPetName(selectedChoice.suggestion, petName)}</p>}<button type="button" className="secondary" onClick={() => setMode("question")}>重新選擇</button></section>
        ) : (
          <section className="video-scenario-options"><h2>你會怎麼做？</h2>{scenario.choices.map((choice) => <button type="button" key={choice.id} onClick={() => choose(choice)}><span>{choice.result === "correct" ? "適當做法" : "先想一想"}</span><b>{withPetName(choice.text, petName)}</b></button>)}</section>
        )}
      </div>
    </section>
  );
}

const dailyBehaviorScenarioIds = ["behavior-barking", "behavior-chewing", "behavior-toileting"] as const;

function DailyBehaviorActivity({
  answers,
  onChoose,
  onContinue,
}: {
  answers: Record<string, ScenarioAnswer>;
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
  const [videoFinished, setVideoFinished] = useState(false);
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
              src="/assets/pet-journey/correct-answer.mp4"
              autoPlay
              muted
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
          <span>✓ 適當處置</span>
          <h2>做得很好！</h2>
          <p>{selectedChoice.explanation}</p>
          <small>改善後，牠能在安全又被理解的環境裡慢慢學習。</small>
          {videoFinished && <button type="button" className="primary" onClick={moveToNext}>繼續 <span>→</span></button>}
        </div>
      </section>
    );
  }

  return (
    <section className="daily-behavior-activity">
      <div className="daily-behavior-head">
        <span>日常行為照顧 · {currentIndex + 1} / {scenarios.length}</span>
        <h1>{scenario.title}</h1>
        <p>{scenario.description}</p>
      </div>
      <div className="daily-behavior-video">
        <video
          src="/assets/pet-journey/chewing-on-things.mp4"
          autoPlay
          loop
          muted
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
          <p>{selectedChoice.explanation}</p>
          {selectedChoice.suggestion && <p><b>可以這樣調整：</b>{selectedChoice.suggestion}</p>}
          <button type="button" className="secondary" onClick={retry}>重新選擇</button>
        </section>
      ) : (
        <section className="reflection daily-behavior-choices">
          <h2>你會怎麼做？</h2>
          <div className="choice-grid">
            {scenario.choices.map((choice) => (
              <button key={choice.id} type="button" onClick={() => choose(choice)}>
                <span>{choice.result === "correct" ? "適當做法" : "先想一想"}</span>
                <p>{choice.text}</p>
              </button>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

function BusyCareActivity({
  scenario,
  answer,
  members,
  onMembersChange,
  onChoose,
  onContinue,
}: {
  scenario: Scenario;
  answer?: ScenarioAnswer;
  members: CareMember[];
  onMembersChange: (members: CareMember[]) => void;
  onChoose: (choice: ScenarioChoice) => void;
  onContinue: () => void;
}) {
  const [mode, setMode] = useState<"question" | "family" | "incorrect" | "positive">(answer?.finalResult === "correct" ? "positive" : "question");
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [familyError, setFamilyError] = useState("");
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);
  const selectedChoice = scenario.choices.find((choice) => choice.id === answer?.finalChoiceId);
  const familyChoice = scenario.choices.find((choice) => choice.id === "family-helper");
  const familyMembers = members.filter((member) => !member.isPlayer);

  function updateMember(id: string, patch: Partial<CareMember>) {
    onMembersChange(members.map((member) => member.id === id ? { ...member, ...patch } : member));
  }

  function addMember() {
    if (members.length >= 6) return;
    const id = `member-${Date.now()}`;
    onMembersChange([...members, { id, name: "", age: null, isPlayer: false }]);
    setSelectedMemberId(id);
  }

  function choose(choice: ScenarioChoice) {
    if (choice.id === "family-helper") {
      setFamilyError("");
      setMode("family");
      return;
    }
    onChoose(choice);
    setVideoFailed(false);
    setVideoFinished(false);
    setMode(choice.result === "correct" ? "positive" : "incorrect");
  }

  function confirmFamilyHelper() {
    const member = familyMembers.find((item) => item.id === selectedMemberId);
    if (!member?.name.trim()) {
      setFamilyError("請先新增或選擇一位已填寫稱呼的家庭成員。");
      return;
    }
    if (!familyChoice) return;
    onChoose(familyChoice);
    setVideoFailed(false);
    setVideoFinished(false);
    setMode("positive");
  }

  if (mode === "positive" && selectedChoice) {
    return (
      <section className="busy-care-positive" aria-live="polite">
        <div className="busy-care-positive-video">
          {videoFailed ? <div className="scene-video-fallback" role="status">正向結果影片目前無法播放，仍可繼續生活旅程。</div> : <video src="/assets/pet-journey/correct-answer.mp4" autoPlay muted playsInline preload="metadata" aria-label="安排照顧支援後的正向結果影片" onEnded={() => setVideoFinished(true)} onError={() => { setVideoFailed(true); setVideoFinished(true); }} />}
        </div>
        <div className="busy-care-positive-copy"><span>✓ 已安排支援</span><h2>做得很好！</h2><p>{selectedChoice.explanation}</p><small>事先確認與交接，能讓小狗在你忙碌時仍獲得餵食、飲水、排泄照顧與陪伴。</small>{videoFinished && <button type="button" className="primary" onClick={onContinue}>繼續 <span>→</span></button>}</div>
      </section>
    );
  }

  return (
    <section className="busy-care-activity">
      <div className="busy-care-heading"><h1>忙碌時的日常照顧</h1><p>今天工作特別忙，你很疲累，但小狗仍需要晚餐、乾淨飲水、排泄與適當活動。</p></div>
      <div className="busy-care-layout">
        <div className="busy-care-room" aria-label="小狗在房間中等待照顧的情境">
          <img className="busy-care-room-background" src="/room/空房間.png" alt="居家房間場景" />
          <img className="busy-care-dog" src="/assets/pet-journey/shiba-dog.png" alt="等待照顧的柴犬" />
          <img className="busy-care-water" src="/room/水.png" alt="裝好水的水碗" />
          <img className="busy-care-bowl" src="/room/狗碗.png" alt="裝好飼料的狗碗" />
        </div>
        {mode === "family" ? (
          <section className="busy-care-members" aria-live="polite">
            <div><span>家庭成員協助</span><h2>新增或選擇能協助的人</h2><p>請先確認對方知情、願意協助，並能了解小狗的餵食、飲水、排泄與活動需求。</p></div>
            {familyMembers.length > 0 && <div className="busy-care-member-list">{familyMembers.map((member) => <label key={member.id} className={selectedMemberId === member.id ? "selected" : ""}><input type="radio" name="busy-care-member" value={member.id} checked={selectedMemberId === member.id} onChange={() => { setSelectedMemberId(member.id); setFamilyError(""); }} /><span>{member.name.trim() || "尚未填寫稱呼"}</span></label>)}</div>}
            {familyMembers.map((member) => !member.name.trim() && <div className="busy-care-member-fields" key={`${member.id}-fields`}><label>家庭成員稱呼<input value={member.name} placeholder="例：媽媽" onChange={(event) => updateMember(member.id, { name: event.target.value })} /></label><label>年齡（選填）<input type="number" min="1" max="120" inputMode="numeric" value={member.age ?? ""} onChange={(event) => updateMember(member.id, { age: event.target.value ? Number(event.target.value) : null })} /></label></div>)}
            <button type="button" className="add-member-button" onClick={addMember} disabled={members.length >= 6}>＋新增家庭成員</button>
            {familyError && <p className="field-error" role="alert">{familyError}</p>}
            <div className="busy-care-member-actions"><button type="button" className="secondary" onClick={() => setMode("question")}>返回選項</button><button type="button" className="primary" onClick={confirmFamilyHelper}>確認由這位家人協助 <span>→</span></button></div>
          </section>
        ) : mode === "incorrect" && selectedChoice ? (
          <section className="busy-care-feedback incorrect" aria-live="polite"><h2>這個做法可能不太適合</h2><p>{selectedChoice.explanation}</p><p><b>可以這樣調整：</b>{selectedChoice.suggestion}</p><button type="button" className="secondary" onClick={() => setMode("question")}>重新選擇</button></section>
        ) : (
          <section className="busy-care-options"><h2>你會怎麼安排？</h2>{scenario.choices.map((choice) => <button type="button" key={choice.id} onClick={() => choose(choice)}><span>{choice.result === "correct" ? "可行安排" : "先想一想"}</span><b>{choice.text}</b></button>)}</section>
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
          {!videoFailed && <video ref={videoRef} className="warning-signal-video" src="/assets/pet-journey/03狗狗身體語言.mp4" playsInline preload="metadata" aria-label="小狗警告訊號教學影片" onTimeUpdate={syncSegment} onEnded={finishVideo} onError={() => { setVideoFailed(true); finishVideo(); }} />}
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
  const [chocolateWarning, setChocolateWarning] = useState(false);
  useEffect(() => {
    if (!complete || hasRecordedMeal.current) return;
    hasRecordedMeal.current = true;
    onAddExpense("monthly-food-main");
  }, [complete, onAddExpense]);
  function prepareFood() {
    if (activity.arrivalMealFoodReady) return;
    onChange({ arrivalMealFoodReady: true });
  }
  function prepareWater() {
    if (activity.arrivalMealWaterReady) return;
    onChange({ arrivalMealWaterReady: true });
  }
  function warnChocolate() {
    setChocolateWarning(true);
  }
  return (
    <section className="arrival-meal-activity" aria-label={`為${petName}準備第一餐`}>
      <aside className="arrival-meal-supplies" aria-label="晚餐用品">
        {!activity.arrivalMealFoodReady && <button type="button" onClick={prepareFood}><img src="/room/飼料.png" alt="飼料" /><span>飼料</span></button>}
        {!activity.arrivalMealWaterReady && <button type="button" onClick={prepareWater}><img src="/assets/pet-journey/waterbottle.png" alt="水瓶" /><span>水</span></button>}
        <button type="button" className={chocolateWarning ? "arrival-meal-chocolate warning" : "arrival-meal-chocolate"} onClick={warnChocolate}><img src="/room/巧克力.png" alt="巧克力" /><span>巧克力</span></button>
        {complete && <p>晚餐用品已準備好</p>}
      </aside>
      <div className="arrival-meal-scene">
        <img className="arrival-meal-room" src="/room/空房間.png" alt="小狗的新家房間" />
        <img className="arrival-meal-dog" src="/assets/pet-journey/shiba-dog.png" alt={petName} />
        <img className="arrival-meal-water" src={activity.arrivalMealWaterReady ? "/room/水.png" : "/assets/pet-journey/空水碗.png"} alt={activity.arrivalMealWaterReady ? "裝好水的水碗" : "空水碗"} />
        <img className="arrival-meal-food" src={activity.arrivalMealFoodReady ? "/room/狗碗.png" : "/assets/pet-journey/空飼料碗.png"} alt={activity.arrivalMealFoodReady ? "裝好飼料的狗碗" : "空飼料碗"} />
      </div>
      <div className="arrival-meal-footer">
        {chocolateWarning && <div className="arrival-meal-warning" role="alert"><b>這個不能給小狗吃</b><p>巧克力屬於犬隻不適合食用的食物，可能對健康造成危害。請選擇適合小狗的主食與乾淨飲水。</p><small>人類食物不一定適合狗狗，尤其是巧克力、洋蔥、大蒜、葡萄、酒精、咖啡因等，都應避免餵食。</small></div>}
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
      <div className="life-journey-head">
        <div><h1>你們一起走到了「{item.timeLabel}」</h1></div>
        <b>{index + 1} / {journeyItems.length}</b>
      </div>
      {isDailyBehaviorActivity ? (
        <DailyBehaviorActivity
          answers={answers}
          onChoose={onChoose}
          onContinue={continueJourney}
        />
      ) : isBusyCareActivity && scenario ? (
        <BusyCareActivity
          scenario={scenario}
          answer={answer}
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
        <span>{completedCount} / {journeyItems.length} 個生活內容已完成</span>
      </div>
      <span className="visually-hidden">目前共登記 {expenses.length} 筆費用，所有費用以唯一識別碼避免重複。</span>
    </div>
  );
}
