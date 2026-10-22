"use client";

/* eslint-disable @next/next/no-img-element -- Layered bird-cage interaction uses native images for exact positioning. */

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { birdActivityScenarios, birdAssets, birdCageInspectionActivityData, birdCageInspectionConfig, birdReport } from "../../../../data/species/bird/activities";
import { birdCopy } from "../../../../data/species/bird/copy";
import { interpolatePetName } from "../../../../data/shared/pet-text";
import type { LifeActivityState, Scenario, ScenarioChoice } from "../../../../game-types";
import { DailyCareCompletion } from "../../DailyCareCompletion";
import { ActivityIntroPage, ObservationReturnButton, plainChoiceText, renderKnowledgeText, type ObservationAnswerStatus } from "../activity-ui";
import { InspectionHotspot } from "../InspectionHotspot";
import { ObservationCard, ObservationCardComparison, ObservationCardFlow } from "../ObservationCard";

function BirdCageAsset({ src, alt, fallback, className, width, height }: { src: string; alt: string; fallback: string; className?: string; width: number; height: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className={`${className ?? ""} bird-cage-asset-fallback`} role="img" aria-label={alt}>{fallback}</span>;
  return <img className={className} src={src} alt={alt} width={width} height={height} onError={() => setFailed(true)} />;
}

export function BirdCageInspectionActivity({ activity, petName, onChange, onChoose, onContinue }: { activity: LifeActivityState; petName: string; onChange: (patch: Partial<LifeActivityState>) => void; onChoose: (scenario: Scenario, choice: ScenarioChoice) => void; onContinue: () => void }) {
  const displayPetName = petName || birdCopy.animalNameFallback;
  const { healthPoints, droppingOptions } = birdCageInspectionActivityData;
  const done = activity.birdCageInspectionSteps;
  const has = (id: string) => done.includes(id);
  const addMany = (...ids: string[]) => {
    const nextSteps = [...done, ...ids.filter((id) => !done.includes(id))];
    if (nextSteps.length !== done.length) onChange({ birdCageInspectionSteps: nextSteps });
  };
  const add = (id: string) => addMany(id);
  const cleanComplete = has("tray-returned");
  const healthComplete = healthPoints.every(({ id }) => has(`health-${id}`));
  const { requiresOrderedInspection, showPointNumbers } = birdCageInspectionConfig.bodyInspection;
  const inspectionReady = cleanComplete && has("feces-observed") && healthComplete && has("social-time");
  const currentStage = !cleanComplete ? 0 : !has("feces-observed") ? 1 : !healthComplete ? 2 : 3;
  const [message, setMessage] = useState("點擊鳥籠底部托盤，將它拉出。");
  const [activeObservation, setActiveObservation] = useState<"feces" | (typeof healthPoints)[number]["id"] | null>(null);
  const [selectedDroppingId] = useState<(typeof droppingOptions)[number]["id"]>(() => droppingOptions[Math.floor(Math.random() * droppingOptions.length)].id);
  const [doorOpening, setDoorOpening] = useState(false);
  const [cageOutTransitionEnded, setCageOutTransitionEnded] = useState(false);
  const [socialCompleting, setSocialCompleting] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [healthTransition, setHealthTransition] = useState(false);
  const [healthFeedback, setHealthFeedback] = useState<Record<string, ObservationAnswerStatus>>({});
  const [droppingFeedback, setDroppingFeedback] = useState<ObservationAnswerStatus>("question");
  const [showDroppingComparison, setShowDroppingComparison] = useState(false);
  const [showHealthComparison, setShowHealthComparison] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState<{ x: number; y: number } | null>(null);
  const heartTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const singTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const socialInteractionLock = useRef(false);
  const healthTransitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completionSubmissionLocked = useRef(false);
  const cageOut = birdCageInspectionConfig.cageOut;
  const scenario = birdActivityScenarios["bird-cage-inspection"];
  const completionChoice = scenario.choices[0];
  const inspectionCompleteFeedback = completionChoice.explanation;
  const selectedDropping = droppingOptions.find(({ id }) => id === selectedDroppingId) ?? droppingOptions[0];
  const selectedHealthPoint = activeObservation === "feces" ? null : healthPoints.find(({ id }) => id === activeObservation);
  const [generatedHealthStates] = useState<Record<(typeof healthPoints)[number]["id"], "normal" | "warning">>(() => ({
    eyes: Math.random() < .5 ? "normal" : "warning",
    feathers: Math.random() < .5 ? "normal" : "warning",
    feet: Math.random() < .5 ? "normal" : "warning",
    breathing: Math.random() < .5 ? "normal" : "warning",
  }));
  const healthStates = Object.keys(activity.birdCageInspectionStates).length === healthPoints.length
    ? activity.birdCageInspectionStates as Record<(typeof healthPoints)[number]["id"], "normal" | "warning">
    : generatedHealthStates;

  useEffect(() => () => {
    if (heartTimer.current) clearTimeout(heartTimer.current);
    if (singTimer.current) clearTimeout(singTimer.current);
    if (healthTransitionTimer.current) clearTimeout(healthTransitionTimer.current);
  }, []);

  if (!activity.birdCageInspectionIntroStarted) return <ActivityIntroPage
    config={birdCageInspectionConfig.intro}
    petName={petName}
    species="bird"
    onStart={() => onChange({ birdCageInspectionIntroStarted: true })}
  />;

  function pullOutTray() {
    if (Object.keys(activity.birdCageInspectionStates).length !== healthPoints.length) {
      onChange({ birdCageInspectionStates: generatedHealthStates });
    }
    add("tray-out");
    setMessage("點擊左下角的新托盤，替換乾淨的墊料。");
  }

  function replaceBedding() {
    addMany("tray-scraped", "tray-lined");
    setMessage("點擊墊紙，看看今天的糞便狀態。");
  }

  function observeDroppings() {
    setDroppingFeedback("question");
    setShowDroppingComparison(false);
    setActiveObservation("feces");
    setMessage("點擊墊紙，看看今天的糞便狀態。");
  }

  function closeObservation() {
    if (activeObservation === "feces") {
      addMany("feces-observed", "tray-returned");
      setMessage("點擊各個提示點，完成今天的健康巡視。");
    } else if (activeObservation && healthFeedback[activeObservation] === "correct") {
      const isLastHealthPoint = healthPoints.every(({ id }) => id === activeObservation || has(`health-${id}`));
      add(`health-${activeObservation}`);
      if (isLastHealthPoint) {
        setHealthTransition(true);
        setMessage(interpolatePetName(cageOut.initialPrompt, displayPetName));
        healthTransitionTimer.current = setTimeout(() => setHealthTransition(false), 400);
      }
    }
    setActiveObservation(null);
    setShowDroppingComparison(false);
    setShowHealthComparison(false);
  }

  function answerHealthPoint(answer: "normal" | "warning") {
    if (!selectedHealthPoint) return;
    const isCorrect = healthStates[selectedHealthPoint.id] === answer;
    setHealthFeedback((current) => ({ ...current, [selectedHealthPoint.id]: isCorrect ? "correct" : "incorrect" }));
  }

  function openHealthObservation(id: (typeof healthPoints)[number]["id"]) {
    if (Object.keys(activity.birdCageInspectionStates).length !== healthPoints.length) {
      onChange({ birdCageInspectionStates: generatedHealthStates });
    }
    setActiveObservation(id);
    setMessage("點擊各個提示點，完成今天的健康巡視。");
  }

  function answerDroppings(answer: "normal" | "warning") {
    const isCorrect = (selectedDropping.id === "healthy") === (answer === "normal");
    setDroppingFeedback(isCorrect ? "correct" : "incorrect");
  }

  function showMagnifier(event: ReactPointerEvent<HTMLElement>) {
    setMagnifierPosition({ x: event.clientX, y: event.clientY });
  }

  function closeWindow(side: "left" | "right") {
    if (doorOpening || has(`window-${side}-closed`)) return;
    const otherSide = side === "left" ? "right" : "left";
    add(`window-${side}-closed`);
    setMessage(interpolatePetName(
      has(`window-${otherSide}-closed`) ? cageOut.windowsClosedPrompt : cageOut.oneWindowClosedPrompt,
      displayPetName,
    ));
  }

  function finishCageOutTransition() {
    if (!doorOpening || cageOutTransitionEnded) return;
    add("cage-door-open");
    setCageOutTransitionEnded(true);
    setMessage(interpolatePetName(cageOut.outOfCagePrompt, displayPetName));
  }

  function continueCageOutInteraction() {
    setDoorOpening(false);
    setCageOutTransitionEnded(false);
    add("bird-out");
    setMessage(`輕輕點擊，陪 ${displayPetName} 享受籠外互動時光。`);
  }

  function openDoor() {
    if (doorOpening) return;
    if (!has("window-left-closed") || !has("window-right-closed")) {
      setMessage(interpolatePetName(cageOut.unsafeDoorPrompt, displayPetName));
      return;
    }
    setCageOutTransitionEnded(false);
    setDoorOpening(true);
  }

  const socialTouches = [1, 2, 3, 4, 5].filter((count) => has(`social-touch-${count}`)).length;

  function petBird() {
    if (socialCompleting || socialInteractionLock.current || socialTouches >= 5) return;
    socialInteractionLock.current = true;
    setTimeout(() => { socialInteractionLock.current = false; }, 180);
    setShowHearts(true);
    if (heartTimer.current) clearTimeout(heartTimer.current);
    heartTimer.current = setTimeout(() => setShowHearts(false), 650);
    const nextTouch = socialTouches + 1;
    add(`social-touch-${nextTouch}`);
    if (nextTouch < 5) return;
    add("social-time");
    setSocialCompleting(true);
    singTimer.current = setTimeout(() => setSocialCompleting(false), 650);
  }

  function finishInspection() {
    if (!inspectionReady || activity.birdCageInspectionCompleted || completionSubmissionLocked.current) return;
    completionSubmissionLocked.current = true;
    onChange({ birdCageInspectionCompleted: true });
    onChoose(scenario, completionChoice);
  }

  if (activity.birdCageInspectionCompleted) return <DailyCareCompletion title={`${displayPetName} 的健康，藏在這些細節裡`} summary={`你完成了今天的鳥籠巡視——清潔糞便托盤、觀察糞便、檢視健康狀態，還給了${displayPetName}籠外互動的時間。`} detail="墊料每天換，才能清楚看到糞便量與狀態；水狀、顏色偏綠黑帶紅、量明顯減少，或澎毛、無法站棲木、張口呼吸，都是需要當天聯繫**熟悉鳥類醫療的獸醫師**的訊號。" reflectionTitle={`每天陪${petName || "牠"}的時間，比你想的還要重要`} reflection="每天清潔、每天觀察、每天給予籠外互動時間缺一不可。高互動鳥類長期缺乏社交與刺激，可能出現拔毛或自傷等問題。" dailyCareBreakdown={birdReport.dailyCareBreakdown} onContinue={onContinue} />;

  const isTrayInitial = !has("tray-out");
  const isTrayDirty = has("tray-out") && !has("tray-scraped");
  const isTrayClean = has("tray-scraped") && !has("feces-observed");
  const isHealthInspection = cleanComplete && (!healthComplete || healthTransition);
  const isCageOutPreparation = healthComplete && !healthTransition && !has("cage-door-open") && !has("bird-out");
  const isCageOutGuidance = healthComplete && doorOpening && cageOutTransitionEnded && has("cage-door-open") && !has("bird-out");
  const isSocial = has("bird-out");
  const sceneSource = isTrayInitial ? birdAssets.dailyGame.cage.dirty
    : isTrayDirty ? birdAssets.dailyGame.cage.trayOutDirty
    : isTrayClean ? birdAssets.dailyGame.cage.trayOutClean
    : isHealthInspection ? birdAssets.dailyGame.birdCloseup
    : doorOpening || has("cage-door-open") ? birdAssets.dailyGame.cage.doorOpen
    : birdAssets.dailyGame.cage.clean;
  const socialImage = socialTouches === 0
    ? birdAssets.dailyGame.onHand.idle
    : socialTouches % 2 === 1
      ? birdAssets.dailyGame.onHand.nod
      : birdAssets.dailyGame.onHand.sing;

  return <section className="life-activity bird-cage-activity" aria-label="鳥籠日常巡視">
    <div className="activity-heading"><p className="life-stage-label">日常照護</p><h1>{displayPetName} 的鳥籠日常巡視</h1><p className="bird-cage-message">今天早上，你走近 {displayPetName} 的鳥籠，牠正在棲木上整理羽毛，籠底也留下了昨天使用過的痕跡。開始一天前，先陪牠完成清潔、糞便觀察、健康巡視與籠外互動吧。</p></div>
    <ol className="rabbit-grooming-progress" aria-label="鳥籠巡視進度">{["清潔托盤", "觀察糞便", "健康巡視", "籠外互動"].map((label, index) => {
      const isComplete = (index === 0 && cleanComplete) || (index === 1 && has("feces-observed")) || (index === 2 && healthComplete) || (index === 3 && has("social-time"));
      return <li key={label} className={isComplete ? "done" : index === currentStage ? "active" : ""}><span>{isComplete ? "✓" : index + 1}</span>{label}</li>;
    })}</ol>
    <div className={`bird-cage-scene ${isTrayInitial || isTrayDirty ? "is-tray-stage" : ""} ${isHealthInspection ? "is-health-inspection" : ""} ${healthTransition ? "is-health-transition" : ""} ${has("cage-door-open") ? "is-door-open" : ""} ${isSocial ? "is-social-stage" : ""}`}>
      <BirdCageAsset className="bird-cage-background" src={sceneSource} alt={isHealthInspection ? `${displayPetName}的健康檢查畫面` : "鸚鵡鳥籠場景"} fallback="🪶" width={1600} height={900} />
      {!isCageOutGuidance && <p className="bird-cage-scene-prompt">{renderKnowledgeText(inspectionReady ? inspectionCompleteFeedback : message)}</p>}
      {isTrayInitial && <button type="button" className="bird-cage-main-hotspot bird-cage-main-hotspot--tray" onClick={pullOutTray} aria-label="點擊鳥籠底部托盤將它拉出" />}
      {isTrayDirty && <button type="button" className="bird-replacement-tray" onClick={replaceBedding} aria-label="使用新的籠底托盤替換髒墊料"><BirdCageAsset src={birdAssets.room.tray} alt="新的籠底托盤" fallback="▤" width={280} height={180} /><span>點擊更換墊料</span></button>}
      {isTrayClean && <button type="button" className="bird-dirty-bedding bird-dirty-bedding--aside" onClick={observeDroppings} onPointerEnter={showMagnifier} onPointerMove={showMagnifier} onPointerLeave={() => setMagnifierPosition(null)} aria-label="觀察髒墊紙上的糞便">
        <BirdCageAsset src={birdAssets.dailyGame.beddingDirty} alt="可觀察的髒墊紙" fallback="▤" width={240} height={180} />
        <small>點擊觀察</small>
      </button>}
      {isHealthInspection && <div className="bird-health-points" aria-label="健康巡視部位">{healthPoints.map((part, index) => {
        const pointComplete = has(`health-${part.id}`);
        const firstIncomplete = healthPoints.find(({ id }) => !has(`health-${id}`));
        const available = !pointComplete && (!requiresOrderedInspection || part.id === firstIncomplete?.id);
        return <InspectionHotspot type="button" key={part.id} className={pointComplete ? "is-complete" : available ? "is-available" : ""} complete={pointComplete} showOrder={showPointNumbers} order={index + 1} disabled={!available || healthTransition} aria-label={pointComplete ? `${part.label}已完成` : `檢查${part.label}`} onPointerEnter={available ? showMagnifier : undefined} onPointerMove={available ? showMagnifier : undefined} onPointerLeave={() => setMagnifierPosition(null)} onClick={() => openHealthObservation(part.id)}><small>{part.label}</small></InspectionHotspot>;
      })}</div>}
      {isCageOutPreparation && <>
        <div className="bird-cage-window-controls" aria-label="確認窗戶是否關好">
          {(["left", "right"] as const).map((side) => {
            const closed = has(`window-${side}-closed`);
            return <button
              type="button"
              key={side}
              className={`bird-cage-window bird-cage-window--${side} ${closed ? "is-closed" : "is-open"}`}
              onClick={() => closeWindow(side)}
              disabled={closed || doorOpening}
              aria-label={closed ? `${side === "left" ? "左側" : "右側"}窗戶已關好` : `關上${side === "left" ? "左側" : "右側"}窗戶`}
            >
              <BirdCageAsset src={closed ? birdAssets.dailyGame.windows.closed : birdAssets.dailyGame.windows.open} alt={closed ? `${side === "left" ? "左側" : "右側"}窗戶已關好` : `${side === "left" ? "左側" : "右側"}窗戶開啟`} fallback="▣" width={1536} height={1024} />
              {!closed && <span>點擊關窗</span>}
            </button>;
          })}
        </div>
        <button type="button" className={`bird-cage-main-hotspot bird-cage-main-hotspot--lock ${doorOpening ? "is-opening" : ""}`} disabled={doorOpening} onClick={openDoor} aria-label="點擊鳥籠鎖扣開啟鳥籠" />
      </>}
      {doorOpening && <div className={`bird-cage-door-transition${isCageOutGuidance ? " is-guidance" : ""}`} role="status" aria-label={isCageOutGuidance ? "籠外互動提醒" : "鳥籠門正在打開"}>
        <video autoPlay muted playsInline src={birdAssets.dailyGame.cageOutTransition} onEnded={finishCageOutTransition} onError={finishCageOutTransition} />
        {isCageOutGuidance && <section className="bird-cage-out-guidance">
          <p>{interpolatePetName(cageOut.outOfCagePrompt, displayPetName).split("\n").map((line, index) => <span key={`${line}-${index}`}>{renderKnowledgeText(line)}</span>)}</p>
          <button type="button" className="primary" onClick={continueCageOutInteraction}>{cageOut.outOfCageConfirmLabel}</button>
        </section>}
      </div>}
      {isSocial && <button type="button" className={`bird-social-pet ${showHearts ? "is-petted" : ""}`} onClick={petBird} disabled={socialCompleting} aria-label={`和${displayPetName}互動`}>
        <BirdCageAsset className="bird-social-pet-image" src={socialImage} alt={`${displayPetName}站在手上互動`} fallback="🦜" width={1200} height={900} />
        {showHearts && <span className="bird-social-hearts" aria-hidden="true">♥ ♥</span>}
      </button>}
      {activeObservation && <ObservationCard className="bird-observation-card" label={activeObservation === "feces" ? "糞便觀察" : `${selectedHealthPoint?.label ?? "健康部位"}觀察`}>
        {activeObservation === "feces" && !showDroppingComparison ? <>
          <BirdCageAsset className="observation-card-image bird-observation-image" src={selectedDropping.image} alt={selectedDropping.alt} fallback="● ● ●" width={280} height={280} />
          {droppingFeedback === "correct" ? <p className="observation-card-feedback observation-card-feedback--correct">{renderKnowledgeText(selectedDropping.feedback.correct)}</p> : droppingFeedback === "incorrect" ? <>
            <p className="observation-card-feedback observation-card-feedback--incorrect">{renderKnowledgeText(selectedDropping.feedback.incorrect)}</p>
            <ObservationReturnButton onReturn={() => setDroppingFeedback("question")} />
          </> : <>
            <p className="observation-card-question">你覺得今天的糞便狀態如何？</p>
            <div className="observation-card-choices"><button type="button" onClick={() => answerDroppings("normal")}>看起來正常，今天沒問題</button><button type="button" onClick={() => answerDroppings("warning")}>有異常，需要留意</button></div>
          </>}
        </> : activeObservation === "feces" ? <>
          <h2>異常糞便狀態</h2>
          <div className="bird-observation-comparison-grid">
            {[droppingOptions[1], droppingOptions[2]].map((dropping) => <article key={dropping.id}><BirdCageAsset src={dropping.image} alt={dropping.alt} fallback="●" width={160} height={160} /><h3>{dropping.id === "watery" ? "水狀／異色" : "量少"}</h3><p>{renderKnowledgeText(dropping.meaning)}</p></article>)}
          </div>
        </> : selectedHealthPoint && showHealthComparison ? <>
          <h2>異常狀態</h2>
          <ObservationCardComparison><BirdCageAsset src={selectedHealthPoint.images.abnormal} alt={`${selectedHealthPoint.label}異常狀態`} fallback="●" width={180} height={180} /><p>{renderKnowledgeText(selectedHealthPoint.abnormalDescription)}</p></ObservationCardComparison>
        </> : selectedHealthPoint && <>
          <ObservationCardFlow
            status={healthFeedback[selectedHealthPoint.id] ?? "question"}
            title={selectedHealthPoint.label}
            image={<BirdCageAsset className="observation-card-image bird-observation-image" src={selectedHealthPoint.images[healthStates[selectedHealthPoint.id] === "normal" ? "normal" : "abnormal"]} alt={selectedHealthPoint.alt} fallback="●" width={280} height={280} />}
            question="你覺得今天的狀態如何？"
            choices={[{ id: "normal", label: plainChoiceText(selectedHealthPoint.choices.normal) }, { id: "warning", label: plainChoiceText(selectedHealthPoint.choices.warning) }]}
            feedback={renderKnowledgeText(interpolatePetName(selectedHealthPoint.feedback[healthStates[selectedHealthPoint.id]][(healthFeedback[selectedHealthPoint.id] ?? "question") === "correct" ? "correct" : "incorrect"], displayPetName))}
            onChoose={(choiceId) => answerHealthPoint(choiceId as "normal" | "warning")}
            onReturn={() => setHealthFeedback((current) => ({ ...current, [selectedHealthPoint.id]: "question" }))}
          />
        </>}
        {activeObservation === "feces" && droppingFeedback === "correct" && !showDroppingComparison && <button type="button" className="observation-card-action" onClick={() => setShowDroppingComparison(true)}>了解異常糞便</button>}
        {selectedHealthPoint && healthFeedback[selectedHealthPoint.id] === "correct" && healthStates[selectedHealthPoint.id] === "normal" && !showHealthComparison && <button type="button" className="observation-card-action" onClick={() => setShowHealthComparison(true)}>了解異常狀態</button>}
        {((activeObservation === "feces" && showDroppingComparison) || (selectedHealthPoint && healthFeedback[selectedHealthPoint.id] === "correct" && (healthStates[selectedHealthPoint.id] === "warning" || showHealthComparison))) && <button type="button" className="observation-card-action" onClick={closeObservation}>{activeObservation === "feces" ? "我記住了" : "我了解了"}</button>}
      </ObservationCard>}
      {inspectionReady && <button type="button" className="primary bird-cage-complete-button" onClick={finishInspection}>完成巡視 <span>→</span></button>}
      {magnifierPosition && <img className="activity-magnifier-hint" src={birdAssets.dailyGame.magnifier} alt="" aria-hidden="true" style={{ left: magnifierPosition.x, top: magnifierPosition.y }} />}
    </div>
    {isSocial && !inspectionReady && <div className="bird-social-footer">
      <div className="walking-progress bird-social-progress" aria-label={`互動進度 ${socialTouches} / 5`}>
        <b>互動進度</b>
        <div role="progressbar" aria-valuemin={0} aria-valuemax={5} aria-valuenow={socialTouches}><span style={{ width: `${socialTouches * 20}%` }} /></div>
        <small>{socialTouches} / 5</small>
      </div>
    </div>}
  </section>;
}
