"use client";

/* eslint-disable @next/next/no-img-element -- Layered bird-cage interaction uses native images for exact positioning. */

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { birdAssets } from "../../../../data/species/bird/assets";
import { birdReport } from "../../../../data/species/bird/report";
import { birdActivityScenarios } from "../../../../data/species/bird/scenarios";
import { interpolatePetName } from "../../../../data/shared/pet-text";
import type { LifeActivityState, Scenario, ScenarioChoice } from "../../../../game-types";
import { DailyCareCompletion } from "../../DailyCareCompletion";

function BirdCageAsset({ src, alt, fallback, className, width, height }: { src: string; alt: string; fallback: string; className?: string; width: number; height: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className={`${className ?? ""} bird-cage-asset-fallback`} role="img" aria-label={alt}>{fallback}</span>;
  return <img className={className} src={src} alt={alt} width={width} height={height} onError={() => setFailed(true)} />;
}

export function BirdCageInspectionActivity({ activity, petName, onChange, onChoose, onContinue }: { activity: LifeActivityState; petName: string; onChange: (patch: Partial<LifeActivityState>) => void; onChoose: (scenario: Scenario, choice: ScenarioChoice) => void; onContinue: () => void }) {
  const healthPoints = [
    { id: "eyes", label: "眼睛", images: birdAssets.dailyGame.parts.eyes, alt: "鸚鵡的眼睛特寫", abnormalDescription: "眼分泌物、紅腫或半閉眼都是警訊，請當天聯繫鳥類獸醫。", choices: { normal: "看起來清亮，今天沒問題", warning: "有異常，需要留意" }, feedback: { normal: { correct: "✅ 正確！{petName} 的眼睛今天清亮有神，無分泌物或腫脹，是健康的表現。繼續每天觀察。", incorrect: "其實 {petName} 的眼睛今天是正常的——清亮、無分泌物。健康的鳥眼應清晰有神；若出現眼屎、腫脹或半閉才需要注意。" }, warning: { correct: "✅ 正確！你發現了眼睛異常——眼分泌物、紅腫或半閉眼都是警訊，請當天聯繫鳥類獸醫。", incorrect: "仔細再看——{petName} 的眼睛今天有異常，不能視為正常。眼睛異常可能代表感染或全身性疾病，請盡快聯繫鳥類獸醫。" } } },
    { id: "feathers", label: "羽毛", images: birdAssets.dailyGame.parts.feathers, alt: "鸚鵡的羽毛特寫", abnormalDescription: "澎毛（非睡眠狀態）、凌亂或出現裸皮，都是需要盡快就醫的警訊。", choices: { normal: "羽毛整齊，今天狀況好", warning: "羽毛有異常，需要留意" }, feedback: { normal: { correct: "✅ 正確！{petName} 的羽毛今天整齊、有光澤，沒有蓬鬆或凌亂，是健康的表現。", incorrect: "其實 {petName} 的羽毛今天是正常的——整齊、有光澤。健康的鳥只有在睡覺或放鬆時才會稍微蓬羽，清醒時持續澎毛才需注意。" }, warning: { correct: "✅ 正確！你發現了羽毛異常——澎毛（非睡眠狀態）、凌亂或出現裸皮，都是需要盡快就醫的警訊。鳥類澎毛常是不適的第一個外顯訊號。", incorrect: "仔細再看——{petName} 現在的羽毛不正常（非睡眠時澎毛／凌亂／裸皮），可能代表身體不適或疾病，請當天聯繫鳥類獸醫。" } } },
    { id: "feet", label: "腳和棲木", images: birdAssets.dailyGame.parts.feet, alt: "鸚鵡雙腳抓握棲木的特寫", abnormalDescription: "抓握無力、腫脹或結痂，可能影響站姿與健康，請盡快諮詢鳥類獸醫。", choices: { normal: "腳趾抓握正常，沒問題", warning: "腳有異常，需要留意" }, feedback: { normal: { correct: "✅ 正確！{petName} 的腳趾今天抓握棲木穩固，無腫脹或結痂，是健康的表現。", incorrect: "其實 {petName} 的腳今天是正常的——抓握穩固、無異狀。健康的鳥能穩定站在棲木上，腳趾無腫脹或過多角質。" }, warning: { correct: "✅ 正確！你注意到了腳部異常——抓握無力、腫脹或結痂，可能影響站姿與健康，請盡快諮詢鳥類獸醫。", incorrect: "仔細再看——{petName} 的腳有異常（抓握無力／腫脹／結痂），不能忽視。鳥站不穩或頻繁換腳，可能是腳部疾病或神經問題的警訊。" } } },
    { id: "breathing", label: "呼吸狀況", images: birdAssets.dailyGame.parts.breathing, alt: "鸚鵡胸腹呼吸起伏的特寫", abnormalDescription: "張口呼吸或尾羽隨呼吸上下起伏是鳥類急症，請立刻聯繫鳥類獸醫，不能等待。", choices: { normal: "呼吸平順，沒有問題", warning: "呼吸有異常，需要立即注意" }, feedback: { normal: { correct: "✅ 正確！{petName} 的呼吸今天平順，靜止時幾乎看不出起伏，沒有張口，是健康的表現。", incorrect: "其實 {petName} 今天的呼吸是正常的——安靜時幾乎看不出呼吸動作。只有張口呼吸或尾羽隨呼吸明顯起伏，才是緊急警訊。" }, warning: { correct: "✅ 正確！你發現了呼吸異常——🚨 張口呼吸或尾羽隨呼吸上下起伏是鳥類急症，請立刻聯繫鳥類獸醫，不能等待。", incorrect: "仔細再看——{petName} 現在的呼吸有異常（張口呼吸或尾羽起伏），這是鳥類急症警訊，不能視為正常。請立刻聯繫鳥類獸醫，呼吸困難屬緊急狀況。" } } },
  ] as const;
  const droppingOptions = [
    { id: "healthy", image: birdAssets.dailyGame.droppings.healthy, alt: "健康的糞便", title: "正常", form: "成形", color: "深綠色", urate: "白色乾燥", meaning: "表示今天腸胃與水分正常，繼續維持。", attention: "正常", feedback: { correct: "✅ 正確！今天的糞便成形、深綠色，尿酸部分白色乾燥，是腸胃與水分正常的表現，繼續保持每天觀察的習慣。", incorrect: "其實今天的糞便是正常的——成形、深綠色、尿酸白色乾燥。健康的鸚鵡糞便應有固態部分；若糞便偏軟水、顏色異常或量少才是警訊。" } },
    { id: "watery", image: birdAssets.dailyGame.droppings.watery, alt: "水狀、顏色異常的糞便", title: "需要留意", form: "水分過多", color: "偏綠黑帶紅或黃色", urate: "需持續觀察", meaning: "可能有消化問題或感染徵兆，建議今天觀察精神與食慾，若持續出現請聯繫鳥類獸醫。", attention: "需要留意", feedback: { correct: "✅ 正確！你注意到了糞便異常——水分過多或顏色異常可能是消化問題或感染的徵兆，建議今天持續觀察精神與食慾，若持續出現請聯繫鳥類獸醫。", incorrect: "仔細再看——今天的糞便顏色或形狀有異常（水狀或色偏），不能視為正常。鸚鵡糞便若持續偏水、帶紅或發黑，可能代表腸道問題，請密切觀察並諮詢鳥類獸醫。" } },
    { id: "small", image: birdAssets.dailyGame.droppings.small, alt: "量很少的糞便", title: "需要留意", form: "量明顯少於平常", color: "需搭配食量觀察", urate: "需持續觀察", meaning: "若同時觀察到食慾下降，是需要注意的警訊，請今天聯繫鳥類獸醫確認。", attention: "需要留意", feedback: { correct: "✅ 正確！糞便量明顯偏少是需要注意的警訊，若同時觀察到食慾下降，請今天就聯繫鳥類獸醫確認。", incorrect: "仔細再看——今天的糞便量比平常少，這不是正常的，不能忽視。糞便量驟減＋食慾下降是重要警訊，若同時出現請當天聯繫鳥類獸醫。" } },
  ] as const;
  const done = activity.birdCageInspectionSteps;
  const has = (id: string) => done.includes(id);
  const addMany = (...ids: string[]) => {
    const nextSteps = [...done, ...ids.filter((id) => !done.includes(id))];
    if (nextSteps.length !== done.length) onChange({ birdCageInspectionSteps: nextSteps });
  };
  const add = (id: string) => addMany(id);
  const cleanComplete = has("tray-returned");
  const healthComplete = healthPoints.every(({ id }) => has(`health-${id}`));
  const complete = cleanComplete && has("feces-observed") && healthComplete && has("social-time");
  const [message, setMessage] = useState("點擊鳥籠底部托盤，將它拉出。");
  const [activeObservation, setActiveObservation] = useState<"feces" | (typeof healthPoints)[number]["id"] | null>(null);
  const [selectedDroppingId] = useState<(typeof droppingOptions)[number]["id"]>(() => droppingOptions[Math.floor(Math.random() * droppingOptions.length)].id);
  const [doorOpening, setDoorOpening] = useState(false);
  const [socialCompleting, setSocialCompleting] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [healthTransition, setHealthTransition] = useState(false);
  const [healthFeedback, setHealthFeedback] = useState<Record<string, "question" | "incorrect" | "correct">>({});
  const [droppingFeedback, setDroppingFeedback] = useState<"question" | "incorrect" | "correct">("question");
  const [showDroppingComparison, setShowDroppingComparison] = useState(false);
  const [showHealthComparison, setShowHealthComparison] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState<{ x: number; y: number } | null>(null);
  const doorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heartTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const singTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const socialInteractionLock = useRef(false);
  const healthTransitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scenario = birdActivityScenarios["bird-cage-inspection"];
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
    if (doorTimer.current) clearTimeout(doorTimer.current);
    if (heartTimer.current) clearTimeout(heartTimer.current);
    if (singTimer.current) clearTimeout(singTimer.current);
    if (healthTransitionTimer.current) clearTimeout(healthTransitionTimer.current);
  }, []);

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
        setMessage(`點擊籠門鎖扣，為 ${petName || "小啾"} 打開籠門。`);
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

  function openDoor() {
    if (doorOpening) return;
    setDoorOpening(true);
    doorTimer.current = setTimeout(() => {
      addMany("cage-door-open", "bird-out");
      setDoorOpening(false);
      setMessage(`輕輕點擊，陪 ${petName || "小啾"} 享受籠外互動時光。`);
    }, 400);
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
    if (nextTouch < 5) {
      return;
    }
    setSocialCompleting(true);
    singTimer.current = setTimeout(() => {
      add("social-time");
      onChoose(scenario, scenario.choices[0]);
    }, 900);
  }

  if (complete) return <DailyCareCompletion title={`${petName || "小啾"} 的健康，藏在這些細節裡`} summary={`你完成了今天的鳥籠巡視——清潔糞便托盤、觀察糞便、檢視健康狀態，還給了${petName || "小啾"}籠外互動的時間。`} detail="墊料每天換，才能清楚看到糞便量與狀態；水狀、顏色偏綠黑帶紅、量明顯減少，或澎毛、無法站棲木、張口呼吸，都是需要當天聯繫鳥類獸醫的訊號。" reflectionTitle={`每天陪${petName || "牠"}的時間，比你想的還要重要`} reflection="每天清潔、每天觀察、每天給予籠外互動時間缺一不可。高互動鳥類長期缺乏社交與刺激，可能出現拔毛或自傷等問題。" dailyCareBreakdown={birdReport.dailyCareBreakdown} onContinue={onContinue} />;

  const isTrayInitial = !has("tray-out");
  const isTrayDirty = has("tray-out") && !has("tray-scraped");
  const isTrayClean = has("tray-scraped") && !has("feces-observed");
  const isHealthInspection = cleanComplete && (!healthComplete || healthTransition);
  const isSocial = healthComplete && !healthTransition;
  const sceneSource = isTrayInitial ? birdAssets.dailyGame.cage.dirty
    : isTrayDirty ? birdAssets.dailyGame.cage.trayOutDirty
    : isTrayClean ? birdAssets.dailyGame.cage.trayOutClean
    : isHealthInspection ? birdAssets.dailyGame.birdCloseup
    : has("cage-door-open") ? birdAssets.dailyGame.cage.doorOpen
    : birdAssets.dailyGame.cage.clean;
  const socialImage = socialTouches === 0
    ? birdAssets.dailyGame.onHand.idle
    : socialTouches % 2 === 1
      ? birdAssets.dailyGame.onHand.nod
      : birdAssets.dailyGame.onHand.sing;

  return <section className="life-activity bird-cage-activity" aria-label="鳥籠日常巡視">
    <div className="activity-heading"><p className="life-stage-label">日常照護</p><h1>{petName || "小啾"} 的鳥籠日常巡視</h1><p className="bird-cage-message">今天早上，你走近 {petName || "小啾"} 的鳥籠，牠正在棲木上整理羽毛，籠底也留下了昨天使用過的痕跡。開始一天前，先陪牠完成一趟日常巡視吧。</p></div>
    <ol className="cat-litter-stage-rail">{["清潔托盤", "觀察糞便", "健康巡視", "籠外互動"].map((label, index) => <li key={label} className={((index === 0 && cleanComplete) || (index === 1 && has("feces-observed")) || (index === 2 && healthComplete) || (index === 3 && has("social-time"))) ? "is-complete" : ""}><span>{index + 1}</span>{label}</li>)}</ol>
    <div className={`bird-cage-scene ${isTrayInitial || isTrayDirty ? "is-tray-stage" : ""} ${isHealthInspection ? "is-health-inspection" : ""} ${healthTransition ? "is-health-transition" : ""} ${has("cage-door-open") ? "is-door-open" : ""} ${has("bird-out") ? "is-social-stage" : ""}`}>
      <BirdCageAsset className="bird-cage-background" src={sceneSource} alt={isHealthInspection ? `${petName || "小啾"}的健康檢查畫面` : "鸚鵡鳥籠場景"} fallback="🪶" width={1600} height={900} />
      <p className="bird-cage-scene-prompt">{message}</p>
      {isTrayInitial && <button type="button" className="bird-cage-main-hotspot bird-cage-main-hotspot--tray" onClick={pullOutTray} aria-label="點擊鳥籠底部托盤將它拉出" />}
      {isTrayDirty && <button type="button" className="bird-replacement-tray" onClick={replaceBedding} aria-label="使用新的籠底托盤替換髒墊料"><BirdCageAsset src={birdAssets.room.tray} alt="新的籠底托盤" fallback="▤" width={280} height={180} /><span>點擊更換墊料</span></button>}
      {isTrayClean && <button type="button" className="bird-dirty-bedding bird-dirty-bedding--aside" onClick={observeDroppings} onPointerEnter={showMagnifier} onPointerMove={showMagnifier} onPointerLeave={() => setMagnifierPosition(null)} aria-label="觀察髒墊紙上的糞便">
        <BirdCageAsset src={birdAssets.dailyGame.beddingDirty} alt="可觀察的髒墊紙" fallback="▤" width={240} height={180} />
        <small>點擊觀察</small>
      </button>}
      {isHealthInspection && <div className="bird-health-points" aria-label="健康巡視部位">{healthPoints.map((part) => <button type="button" key={part.id} className={has(`health-${part.id}`) ? "is-observed" : ""} disabled={has(`health-${part.id}`) || healthTransition} aria-label={`檢查${part.label}`} onPointerEnter={showMagnifier} onPointerMove={showMagnifier} onPointerLeave={() => setMagnifierPosition(null)} onClick={() => openHealthObservation(part.id)}><span aria-hidden="true">{has(`health-${part.id}`) ? "✓" : ""}</span><small>{part.label}</small></button>)}</div>}
      {isSocial && !has("cage-door-open") && <button type="button" className={`bird-cage-main-hotspot bird-cage-main-hotspot--lock ${doorOpening ? "is-opening" : ""}`} disabled={doorOpening} onClick={openDoor} aria-label="點擊鳥籠鎖扣開啟鳥籠" />}
      {has("bird-out") && <><div className="bird-social-progress" aria-label={`互動進度 ${socialTouches} / 5`}><span>互動進度 {socialTouches} / 5</span><i aria-hidden="true"><b style={{ width: `${socialTouches * 20}%` }} /></i></div><button type="button" className={`bird-social-pet ${showHearts ? "is-petted" : ""}`} onClick={petBird} disabled={socialCompleting} aria-label={`和${petName || "小啾"}互動`}>
        <BirdCageAsset className="bird-social-pet-image" src={socialImage} alt={`${petName || "小啾"}站在手上互動`} fallback="🦜" width={1200} height={900} />
        {showHearts && <span className="bird-social-hearts" aria-hidden="true">♥ ♥</span>}
      </button></>}
      {activeObservation && <section className="bird-observation-card" role="dialog" aria-modal="false" aria-live="polite" aria-label={activeObservation === "feces" ? "糞便觀察" : `${selectedHealthPoint?.label ?? "健康部位"}觀察`}>
        {activeObservation === "feces" && !showDroppingComparison ? <>
          <BirdCageAsset className="bird-observation-image" src={selectedDropping.image} alt={selectedDropping.alt} fallback="● ● ●" width={280} height={280} />
          {droppingFeedback === "correct" ? <p className="bird-observation-correct">{selectedDropping.feedback.correct}</p> : <>
            {droppingFeedback === "incorrect" && <p className="bird-observation-incorrect">{selectedDropping.feedback.incorrect}</p>}
            <p className="bird-observation-question">你覺得今天的糞便狀態如何？</p>
            <div className="bird-observation-choices"><button type="button" onClick={() => answerDroppings("normal")}>看起來正常，今天沒問題</button><button type="button" onClick={() => answerDroppings("warning")}>有異常，需要留意</button></div>
          </>}
        </> : activeObservation === "feces" ? <>
          <h2>異常糞便狀態</h2>
          <div className="bird-observation-comparison-grid">
            {[droppingOptions[1], droppingOptions[2]].map((dropping) => <article key={dropping.id}><BirdCageAsset src={dropping.image} alt={dropping.alt} fallback="●" width={160} height={160} /><h3>{dropping.id === "watery" ? "水狀／異色" : "量少"}</h3><p>{dropping.meaning}</p></article>)}
          </div>
        </> : selectedHealthPoint && showHealthComparison ? <>
          <h2>異常狀態</h2>
          <section className="bird-observation-comparison"><BirdCageAsset src={selectedHealthPoint.images.abnormal} alt={`${selectedHealthPoint.label}異常狀態`} fallback="●" width={180} height={180} /><p>{selectedHealthPoint.abnormalDescription}</p></section>
        </> : selectedHealthPoint && <>
          <BirdCageAsset className="bird-observation-image" src={selectedHealthPoint.images[healthStates[selectedHealthPoint.id] === "normal" ? "normal" : "abnormal"]} alt={selectedHealthPoint.alt} fallback="●" width={280} height={280} />
          <h2>{selectedHealthPoint.label}</h2>
          {healthFeedback[selectedHealthPoint.id] === "correct" ? <p className="bird-observation-correct">{interpolatePetName(selectedHealthPoint.feedback[healthStates[selectedHealthPoint.id]].correct, petName || "小啾")}</p> : <>
            {healthFeedback[selectedHealthPoint.id] === "incorrect" && <p className="bird-observation-incorrect">{interpolatePetName(selectedHealthPoint.feedback[healthStates[selectedHealthPoint.id]].incorrect, petName || "小啾")}</p>}
            <p className="bird-observation-question">你覺得今天的狀態如何？</p>
            <div className="bird-observation-choices"><button type="button" onClick={() => answerHealthPoint("normal")}>{selectedHealthPoint.choices.normal}</button><button type="button" onClick={() => answerHealthPoint("warning")}>{selectedHealthPoint.choices.warning}</button></div>
          </>}
        </>}
        {activeObservation === "feces" && droppingFeedback === "correct" && !showDroppingComparison && <button type="button" onClick={() => setShowDroppingComparison(true)}>了解異常糞便</button>}
        {selectedHealthPoint && healthFeedback[selectedHealthPoint.id] === "correct" && healthStates[selectedHealthPoint.id] === "normal" && !showHealthComparison && <button type="button" onClick={() => setShowHealthComparison(true)}>了解異常狀態</button>}
        {((activeObservation === "feces" && showDroppingComparison) || (selectedHealthPoint && healthFeedback[selectedHealthPoint.id] === "correct" && (healthStates[selectedHealthPoint.id] === "warning" || showHealthComparison))) && <button type="button" onClick={closeObservation}>{activeObservation === "feces" ? "我記住了" : "我了解了"}</button>}
      </section>}
      {magnifierPosition && <img className="bird-magnifier-hint" src={birdAssets.dailyGame.magnifier} alt="" aria-hidden="true" style={{ left: magnifierPosition.x, top: magnifierPosition.y }} />}
    </div>
  </section>;
}

