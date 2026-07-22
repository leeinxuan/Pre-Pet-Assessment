"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { expenseCatalog, money, roomItems } from "./game-data";
import { journeyItems, lifeScenarios } from "./life-data";
import type {
  ExpenseRecord,
  LifeActivityState,
  Scenario,
  ScenarioAnswer,
  ScenarioChoice,
} from "./game-types";

const arrivalVideoSrc = "/assets/pet-journey/arrival-transition.mp4";
const shibaImageSrc = "/assets/pet-journey/shiba-dog.png";

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
  const onContinueRef = useRef(onContinue);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      video.pause();
      video.currentTime = 0;
      startTimeoutRef.current = window.setTimeout(finishArrivalVideo, 180);
      return () => {
        if (startTimeoutRef.current !== null) window.clearTimeout(startTimeoutRef.current);
      };
    }

    startTimeoutRef.current = window.setTimeout(() => {
      if (video.paused || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) finishArrivalVideo();
    }, 8000);

    const playAttempt = video.play();
    playAttempt?.catch(() => {
      console.warn("接回家過場影片無法自動播放，已略過至命名頁面。");
      finishArrivalVideo();
    });

    return () => {
      if (startTimeoutRef.current !== null) window.clearTimeout(startTimeoutRef.current);
    };
  }, [finishArrivalVideo]);

  function handlePlaying() {
    if (startTimeoutRef.current !== null) {
      window.clearTimeout(startTimeoutRef.current);
      startTimeoutRef.current = null;
    }
  }

  return (
    <section className="arrival-video-screen" aria-label="接回家影片過場">
      <video
        ref={videoRef}
        src={arrivalVideoSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-label="小狗搭乘外出籠抵達新家的過場動畫"
        onPlaying={handlePlaying}
        onEnded={finishArrivalVideo}
        onError={() => {
          console.warn("接回家過場影片載入失敗，已略過至命名頁面。");
          finishArrivalVideo();
        }}
      />
    </section>
  );
}

export function PetNaming({
  petName,
  onSave,
  onBack,
}: {
  petName: string;
  onSave: (name: string) => void;
  onBack: () => void;
}) {
  const [draft, setDraft] = useState(petName);
  const [error, setError] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = draft.trim();
    if (!name) {
      setError("請先幫小狗取一個名字。");
      return;
    }
    if (Array.from(name).length > 12) {
      setError("名字請控制在12個字以內。");
      return;
    }
    setError("");
    onSave(name);
  }

  return (
    <div className="content-wrap pet-naming-page">
      <div className="pet-naming-image">
        <img src={shibaImageSrc} alt="等待命名的柴犬" />
      </div>
      <form className="pet-naming-copy" onSubmit={submit} noValidate>
        <h1>歡迎來到新家</h1>
        <p>經過領養前的準備，你終於把小狗接回家了。今天是你們一起生活的第一天，也是這段長久陪伴的開始。</p>
        <div className="soft-note">在開始生活旅程以前，先幫牠取一個名字吧。接下來，這個名字會陪著你們走過每一個生活情境。</div>
        <label htmlFor="pet-name">牠叫什麼名字？</label>
        <input
          id="pet-name"
          value={draft}
          onChange={(event) => { setDraft(event.target.value); setError(""); }}
          placeholder="請輸入小狗的名字"
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "pet-name-error" : "pet-name-hint"}
        />
        <small id="pet-name-hint">1～12 個字，儲存後仍可回來修改。</small>
        {error && <p id="pet-name-error" className="field-error" role="alert">{error}</p>}
        <div className="pet-naming-actions">
          <button type="button" className="secondary" onClick={onBack}>← 返回領養前準備</button>
          <button type="submit" className="primary large">開始生活旅程 <span>→</span></button>
        </div>
      </form>
    </div>
  );
}

function stageForIndex(index: number) {
  if (index <= 2) return 3;
  if (index <= 5) return 4;
  if (index === 6) return 5;
  return 6;
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
        <button className="primary" onClick={onContinue}>{labels[choice.result].button} <span>→</span></button>
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
        <div className={`scene-art scene-${scenario.artIndex}`} aria-hidden="true"><div className="scene-sprite" /><p>{scenario.timeLabel}</p></div>
      </article>
      <section className="reflection">
        <h2>如果是你，會怎麼做？</h2>
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

const feedingFoods = [
  { id: "main", label: "適合豆豆的完整主食", icon: "🥣", kind: "main" },
  { id: "treat", label: "寵物零食", icon: "🦴", kind: "treat" },
  { id: "leftovers", label: "人類剩菜", icon: "🍱", kind: "risk" },
  { id: "chocolate", label: "巧克力", icon: "🍫", kind: "risk" },
  { id: "seasoned-meat", label: "調味肉類", icon: "🍖", kind: "risk" },
  { id: "bone", label: "不適合的骨頭", icon: "🦴", kind: "risk" },
];
const waterSteps = ["倒掉原本不乾淨的水", "清潔水碗", "加入乾淨飲水", "將水碗放回固定位置"];

function FeedingActivity({
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
  const [message, setMessage] = useState(activity.feedingServed ? "晚餐與飲水都已準備完成。" : `先選擇適合${petName}的晚餐。`);
  const waterComplete = activity.feedingWaterSteps.length === waterSteps.length;
  function chooseFood(kind: string) {
    if (kind === "main") {
      onChange({ feedingFoodReady: true });
      setMessage(`選得很好！主食應符合${petName}的年齡、體型及健康需求。`);
    } else if (kind === "treat") {
      setMessage("零食可以作為少量獎勵，但不能代替營養完整的正餐。");
    } else {
      setMessage(`這項食物不適合放進${petName}的餐碗。部分人類食物可能油、鹽或調味過多，也可能含有危險成分，請換一個選擇。`);
    }
  }
  function doWaterStep(step: string, index: number) {
    if (index !== activity.feedingWaterSteps.length) {
      setMessage("請依序完成飲水準備，先處理前一個步驟。");
      return;
    }
    onChange({ feedingWaterSteps: [...activity.feedingWaterSteps, step] });
    setMessage(index === waterSteps.length - 1 ? "乾淨飲水已放回固定位置。" : `${step}完成，繼續下一步。`);
  }
  function serve() {
    if (!activity.feedingFoodReady || !waterComplete) {
      setMessage(`還有一件每天都很重要的事：請確認${petName}有合適主食，以及隨時有乾淨、足量的飲水。`);
      return;
    }
    onChange({ feedingServed: true });
    onAddExpense("monthly-main-food");
    setMessage("晚餐準備完成！規律的餵食、合適的食物及乾淨飲水，都是每天照顧的重要部分。");
  }
  return (
    <section className={`life-activity feeding-activity ${activity.feedingServed ? "served" : ""}`}>
      <div className="activity-heading"><h1>準備{petName}的晚餐</h1><p>三個月後，{petName}已經逐漸熟悉新家。到了固定的晚餐時間，牠正坐在食碗旁等待你準備晚餐。</p></div>
      <div className="feeding-steps">
        <article><span>1</span><h2>選擇食物</h2><div className="food-options">{feedingFoods.map((food) => <button key={food.id} className={activity.feedingFoodReady && food.kind === "main" ? "selected" : ""} onClick={() => chooseFood(food.kind)}><i>{food.icon}</i><b>{withPetName(food.label, petName)}</b></button>)}</div></article>
        <article><span>2</span><h2>準備乾淨飲水</h2><div className="water-sequence">{waterSteps.map((step, index) => <button key={step} className={activity.feedingWaterSteps.includes(step) ? "done" : ""} disabled={index > activity.feedingWaterSteps.length} onClick={() => doWaterStep(step, index)}><i>{activity.feedingWaterSteps.includes(step) ? "✓" : index + 1}</i>{step}</button>)}</div></article>
        <article className="serve-dinner"><span>3</span><h2>把晚餐交給{petName}</h2><div className="dinner-scene" aria-hidden="true"><i>🐕</i><b>{activity.feedingFoodReady ? "🥣" : "○"}</b><em>{waterComplete ? "💧" : "○"}</em></div><button className="secondary" onClick={serve}>{activity.feedingServed ? `再看看${petName}吃晚餐` : `請${petName}吃晚餐`}</button></article>
      </div>
      <div className="activity-message" role="status"><p>{message}</p>{activity.feedingServed && <b>每月主食費＋NT$1,500（只登記一次）</b>}</div>
      <div className="activity-actions"><span>{activity.feedingServed ? "晚餐與飲水已完成" : "完成三個步驟後繼續"}</span><button className="primary" disabled={!activity.feedingServed} onClick={onContinue}>完成晚餐練習 <span>→</span></button></div>
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
  roomReady,
  onIndex,
  onChoose,
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
  roomReady: string[];
  onIndex: (index: number) => void;
  onChoose: (scenario: Scenario, choice: ScenarioChoice) => void;
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
  const [feedbackOpen, setFeedbackOpen] = useState(Boolean(answer));

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

  return (
    <div className="content-wrap life-journey-page">
      <div className="life-journey-head">
        <div><h1>你們一起走到了「{item.timeLabel}」</h1></div>
        <b>{index + 1} / {journeyItems.length}</b>
      </div>
      {scenario && (
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
      )}
      {item.type === "body-language" && <BodyLanguageActivity petName={petName} viewed={activity.bodyLanguageSignals} onView={(id) => onActivityChange({ bodyLanguageSignals: activity.bodyLanguageSignals.includes(id) ? activity.bodyLanguageSignals : [...activity.bodyLanguageSignals, id] })} onContinue={continueJourney} />}
      {item.type === "feeding" && <FeedingActivity petName={petName} activity={activity} onChange={onActivityChange} onAddExpense={onAddExpense} onContinue={continueJourney} />}
      {item.type === "body-care" && <BodyCareActivity petName={petName} viewed={activity.bodyCareParts} onView={(id) => onActivityChange({ bodyCareParts: activity.bodyCareParts.includes(id) ? activity.bodyCareParts : [...activity.bodyCareParts, id] })} onContinue={continueJourney} />}
      {item.type === "senior-room" && <SeniorRoomActivity petName={petName} roomReady={roomReady} selected={activity.seniorAdjustments} onSelect={(id) => onActivityChange({ seniorAdjustments: activity.seniorAdjustments.includes(id) ? activity.seniorAdjustments : [...activity.seniorAdjustments, id] })} onAddExpense={onAddExpense} onContinue={continueJourney} />}

      <div className="scenario-bottom-nav life-bottom-nav">
        <button className="secondary" onClick={() => index > 0 ? selectItem(index - 1) : onBack()}>← {index > 0 ? "上一個生活內容" : "返回命名頁面"}</button>
        <span>{completedCount} / {journeyItems.length} 個生活內容已完成</span>
      </div>
      <span className="visually-hidden">目前共登記 {expenses.length} 筆費用，所有費用以唯一識別碼避免重複。</span>
    </div>
  );
}
