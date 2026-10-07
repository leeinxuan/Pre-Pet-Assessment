"use client";

/* eslint-disable @next/next/no-img-element -- The walking scene uses native layered images for animation and drag coordinates. */
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { dogAssets } from "../../../../data/species/dog/assets";
import { dogReport } from "../../../../data/species/dog/report";
import { dogShibaWalkingAsset, walkingPreloadImages, walkingPrepItems, walkingSceneLayout, walkingScenes } from "../../../../data/species/dog/walking";
import type { LifeActivityState } from "../../../../game-types";
import { DailyCareCompletion } from "../../DailyCareCompletion";

const dogDailyAsset = (fileName: string) => `${dogAssets.daily.root}/${fileName}`;

const walkingPrepNotes: Record<string, string> = {
  leash: "外出時維持安全距離，避免走失或衝突。",
  bag: "散步時清理排泄物，是對環境與他人的責任。",
  water: "天氣熱或散步時間較長時，幫狗狗補充飲水。",
};

// 點一下按鈕前進一小步；長按則以每秒固定百分比平滑前進，避免不同螢幕更新頻率造成跳動。
const walkingStep = 7;
const walkingHoldSpeed = 40;
const dailyLifeStageLabel = "日常照護";

// 貓砂盆救援隊暫用已存在的共用素材，避免缺少 /assets/cat/... 圖檔時讓 Vite/RSC 請求失敗。
// 正式貓咪素材補齊後，只需在此替換為對應的 /assets/cat/... 路徑即可。
function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

type WalkingPathPoint = {
  x: number;
  y: number;
  scale: number;
};

const walkingSceneCompletionAt: Partial<Record<number, number>> = {
  // 場景 2 視覺上較早抵達終點，縮短完成距離，避免最後還要多按幾下。
  1: 80,
};

function getWalkingCompletionPosition(sceneIndex: number) {
  return walkingSceneCompletionAt[sceneIndex] ?? 100;
}

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, value));
}

function interpolateWalkingPoint(start: WalkingPathPoint, waypoint: WalkingPathPoint | undefined, end: WalkingPathPoint, progress: number, turnAt = 0.55) {
  const safeProgress = Math.max(0, Math.min(1, progress));
  const safeTurnAt = Math.max(0.05, Math.min(0.95, turnAt));
  const hasWaypoint = Boolean(waypoint);
  const segmentProgress = hasWaypoint
    ? (safeProgress <= safeTurnAt ? safeProgress / safeTurnAt : (safeProgress - safeTurnAt) / (1 - safeTurnAt))
    : safeProgress;
  const from = hasWaypoint && safeProgress > safeTurnAt ? waypoint! : start;
  const to = hasWaypoint && safeProgress <= safeTurnAt ? waypoint! : end;

  return {
    x: clampPercent(lerp(from.x, to.x, segmentProgress)),
    y: clampPercent(lerp(from.y, to.y, segmentProgress)),
    scale: Math.max(0.05, lerp(from.scale, to.scale, segmentProgress)),
  };
}

function getWalkingCharacterStyle(sceneIndex: number, position: number, mobile = false): CSSProperties {
  const layout = walkingSceneLayout[sceneIndex];
  const completionPosition = getWalkingCompletionPosition(sceneIndex);
  const progress = Math.max(0, Math.min(1, position / completionPosition));

  const start = mobile
    ? { x: layout.mobileStartX, y: layout.mobileStartY, scale: layout.mobileScale }
    : { x: layout.startX, y: layout.startY, scale: layout.scale };
  const end = mobile
    ? { x: layout.mobileEndX ?? layout.endX, y: layout.mobileEndY ?? layout.endY, scale: layout.mobileEndScale ?? layout.endScale ?? layout.scale }
    : { x: layout.endX, y: layout.endY, scale: layout.endScale ?? layout.scale };
  const waypoint = mobile ? layout.mobileWaypoint : layout.waypoint;
  const point = interpolateWalkingPoint(start, waypoint, end, progress, layout.turnAt);

  return {
    "--walk-left": `${point.x}%`,
    "--walk-top": `${point.y}%`,
    "--walk-scale": point.scale,
  } as CSSProperties;
}

function useMobileWalkingLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 720px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export function WalkingActivity({
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
  const [safetyStep, setSafetyStep] = useState<"question" | "law" | "correct" | "prepared">(
    activity.walkingMinutes > 0 || activity.walkingComplete ? "prepared" : "question",
  );
  const [position, setPosition] = useState(0);
  const [moving, setMoving] = useState(false);
  const [message, setMessage] = useState("");
  const completingSceneRef = useRef<number | null>(null);
  const forwardAnimationFrameRef = useRef<number | null>(null);
  const forwardHoldTimerRef = useRef<number | null>(null);
  const forwardLastFrameRef = useRef<number | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const poopTargetRef = useRef<HTMLDivElement | null>(null);
  const draggingBagRef = useRef(false);
  const forwardHeldRef = useRef(false);
  const [draggedBag, setDraggedBag] = useState<{ x: number; y: number } | null>(null);
  const isMobileWalkingLayout = useMobileWalkingLayout();
  const sceneIndex = Math.min(activity.walkingSceneIndex, walkingScenes.length - 1);
  const scene = walkingScenes[sceneIndex];
  const prepared = activity.walkingPreparedItems;
  const allPrepared = walkingPrepItems.every((item) => prepared.includes(item.id));
  const needsCleanup = started && scene.poopEvent && position >= 50 && !activity.walkingPoopCleaned;
  const progressMinutes = Math.min(20, activity.walkingMinutes);
  const walkingInstruction = "按住「往前走」，陪牠一步一步往前走。散步不只是運動，也是牠探索環境、放鬆心情和練習與世界相處的時間。";
  const walkingEventMessage = scene.poopEvent && position >= 50
    ? activity.walkingPoopCleaned
      ? { title: "做得很好！", body: "散步時清理排泄物，也是照顧責任的一部分。" }
      : { title: "散步中的小事件", body: "牠在路上排泄了，先停下來幫牠清理乾淨，再繼續往前走。" }
    : null;
  const mobilePoopPlacement = walkingSceneLayout[sceneIndex]?.mobilePoop;
  const mobilePoopStyle = mobilePoopPlacement
    ? ({
      "--mobile-walk-poop-left": `${mobilePoopPlacement.x}%`,
      "--mobile-walk-poop-top": `${mobilePoopPlacement.y}%`,
      "--mobile-walk-poop-size": `${mobilePoopPlacement.size}%`,
    } as CSSProperties)
    : undefined;
  const desktopPoopPlacement = walkingSceneLayout[sceneIndex]?.poop;
  const desktopPoopStyle = desktopPoopPlacement
    ? ({
      "--walk-poop-left": `${desktopPoopPlacement.x}%`,
      "--walk-poop-top": `${desktopPoopPlacement.y}%`,
      "--walk-poop-size": `${desktopPoopPlacement.size}%`,
    } as CSSProperties)
    : undefined;

  useEffect(() => {
    walkingPreloadImages.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    if (needsCleanup || activity.walkingComplete) stopForward();
  }, [needsCleanup, activity.walkingComplete]);

  useEffect(() => () => {
    if (forwardAnimationFrameRef.current !== null) window.cancelAnimationFrame(forwardAnimationFrameRef.current);
    if (forwardHoldTimerRef.current !== null) window.clearTimeout(forwardHoldTimerRef.current);
  }, []);

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

  function completeWalkingScene(completedIndex: number) {
    if (completingSceneRef.current === completedIndex) return;
    completingSceneRef.current = completedIndex;
    stopForward(false);
    const complete = completedIndex >= walkingScenes.length - 1;
    const nextMinutes = Math.min(20, activity.walkingMinutes + 5);
    onChange({
      walkingMinutes: nextMinutes,
      walkingSceneIndex: complete ? completedIndex : completedIndex + 1,
      walkingComplete: complete,
    });
    setMessage(complete ? "散步時間達到 20 分鐘！" : `完成「${walkingScenes[completedIndex].title}」，散步時間 +5 分鐘。`);
  }

  const advanceWalk = useCallback((distance: number) => {
    if (!started || activity.walkingComplete) return;
    if (needsCleanup) {
      setMessage("先把排泄物清理乾淨，再繼續散步。");
      setMoving(false);
      return;
    }
    const completionPosition = getWalkingCompletionPosition(sceneIndex);
    setMoving(true);
    setPosition((current) => {
      if (scene.poopEvent && current >= 50 && !activity.walkingPoopCleaned) {
        stopForward();
        return 50;
      }
      const next = Math.min(completionPosition, current + distance);
      if (next >= completionPosition && current < completionPosition && completingSceneRef.current !== sceneIndex) {
        completeWalkingScene(sceneIndex);
      }
      return next;
    });
  }, [activity.walkingComplete, activity.walkingPoopCleaned, activity.walkingMinutes, needsCleanup, onChange, scene.poopEvent, sceneIndex, started]); // eslint-disable-line react-hooks/exhaustive-deps -- completeWalkingScene intentionally uses the current walking state captured by these dependencies.

  function stopForward(releaseHold = true) {
    if (releaseHold) forwardHeldRef.current = false;
    if (forwardHoldTimerRef.current !== null) window.clearTimeout(forwardHoldTimerRef.current);
    forwardHoldTimerRef.current = null;
    if (forwardAnimationFrameRef.current !== null) window.cancelAnimationFrame(forwardAnimationFrameRef.current);
    forwardAnimationFrameRef.current = null;
    forwardLastFrameRef.current = null;
    setMoving(false);
  }

  function startForward() {
    if (!started || activity.walkingComplete || needsCleanup) {
      if (needsCleanup) setMessage("先把排泄物清理乾淨，再繼續散步。");
      return;
    }
    if (forwardHeldRef.current || forwardHoldTimerRef.current !== null) return;
    // 短按只前進一步；超過門檻才啟動唯一的 rAF 連續移動迴圈。
    advanceWalk(walkingStep);
    const moveFrame = (timestamp: number) => {
      if (!forwardHeldRef.current) return;
      const previousTimestamp = forwardLastFrameRef.current ?? timestamp;
      const deltaSeconds = Math.min(0.05, Math.max(0, timestamp - previousTimestamp) / 1000);
      forwardLastFrameRef.current = timestamp;
      if (deltaSeconds > 0) advanceWalk(walkingHoldSpeed * deltaSeconds);
      if (forwardHeldRef.current) forwardAnimationFrameRef.current = window.requestAnimationFrame(moveFrame);
    };
    forwardHoldTimerRef.current = window.setTimeout(() => {
      forwardHoldTimerRef.current = null;
      forwardHeldRef.current = true;
      forwardLastFrameRef.current = null;
      forwardAnimationFrameRef.current = window.requestAnimationFrame(moveFrame);
    }, 220);
  }

  const draggedBagSize = 74;

  function getDraggedBagPosition(event: ReactPointerEvent<HTMLButtonElement>) {
    const sceneRect = sceneRef.current?.getBoundingClientRect();
    if (!sceneRect) return null;
    return {
      x: event.clientX - sceneRect.left - draggedBagSize / 2,
      y: event.clientY - sceneRect.top - draggedBagSize / 2,
    };
  }

  function startDraggingBag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!needsCleanup) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const nextPosition = getDraggedBagPosition(event);
    if (nextPosition) {
      draggingBagRef.current = true;
      setDraggedBag(nextPosition);
    }
  }

  function dragBag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!draggingBagRef.current) return;
    event.preventDefault();
    const nextPosition = getDraggedBagPosition(event);
    if (nextPosition) setDraggedBag(nextPosition);
  }

  function finishDraggingBag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!draggingBagRef.current) return;
    event.preventDefault();
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    const finalBagPosition = getDraggedBagPosition(event) ?? draggedBag;
    if (!finalBagPosition) {
      draggingBagRef.current = false;
      setDraggedBag(null);
      return;
    }
    const sceneRect = sceneRef.current?.getBoundingClientRect();
    const poopRect = poopTargetRef.current?.getBoundingClientRect();
    const tolerance = 58;
    const bagRect = {
      left: finalBagPosition.x,
      top: finalBagPosition.y,
      right: finalBagPosition.x + draggedBagSize,
      bottom: finalBagPosition.y + draggedBagSize,
      centerX: finalBagPosition.x + draggedBagSize / 2,
      centerY: finalBagPosition.y + draggedBagSize / 2,
    };
    const hitPoop = sceneRect && poopRect
      ? (
        bagRect.centerX >= poopRect.left - sceneRect.left - tolerance &&
        bagRect.centerX <= poopRect.right - sceneRect.left + tolerance &&
        bagRect.centerY >= poopRect.top - sceneRect.top - tolerance &&
        bagRect.centerY <= poopRect.bottom - sceneRect.top + tolerance
      ) || (
        bagRect.right >= poopRect.left - sceneRect.left - tolerance &&
        bagRect.left <= poopRect.right - sceneRect.left + tolerance &&
        bagRect.bottom >= poopRect.top - sceneRect.top - tolerance &&
        bagRect.top <= poopRect.bottom - sceneRect.top + tolerance
      )
      : false;

    draggingBagRef.current = false;
    setDraggedBag(null);
    if (hitPoop) cleanupPoop();
  }

  function cancelDraggingBag() {
    draggingBagRef.current = false;
    setDraggedBag(null);
  }

  function cleanupPoop() {
    stopForward();
    draggingBagRef.current = false;
    setDraggedBag(null);
    onChange({ walkingPoopCleaned: true });
    setMessage("已清理完成，繼續陪牠往前走。");
  }

  const renderWalkingEventCard = (className = "") => walkingEventMessage ? (
    <div className={`walking-event-card ${className}`} role="status">
      <b>{walkingEventMessage.title}</b>
      <p>{walkingEventMessage.body}</p>
      {needsCleanup && (
        <div className="walking-drag-row">
          <button
            type="button"
            className={`walking-drag-bag ${draggedBag ? "is-source-dragging" : ""}`}
            onPointerDown={startDraggingBag}
            onPointerMove={dragBag}
            onPointerUp={finishDraggingBag}
            onPointerCancel={cancelDraggingBag}
            aria-label="拖曳撿便袋清理排泄物"
          >
            <img src={dogDailyAsset("poop-bag-1.png")} alt="" />
          </button>
          <p className="walking-drag-instruction">拖曳撿便袋到便便的位置完成清理。</p>
        </div>
      )}
    </div>
  ) : null;

  if (activity.walkingComplete) return <DailyCareCompletion
    title="每天，都要一起走出去"
    summary={`你陪${petName}完成了今天的散步，也記得為牠清理排泄物。`}
    detail="規律散步讓牠能探索環境、嗅聞、活動身體，也有助於維持生理與心理健康。"
    reflectionTitle="把每天的照顧，想成長長的日常"
    reflection="散步只是照顧牠的一部分。餵食、換水、清潔、互動、觀察狀況與安靜陪伴，都會反覆出現在每一天裡。晴天、下雨、疲累或工作忙碌時，牠仍需要你留下一段穩定的時間。請想一想：你願意怎麼安排自己的生活，長期陪牠好好長大、變老？"
    dailyCareBreakdown={dogReport.dailyCareBreakdown}
    onContinue={onContinue}
  />;

  return (
    <section className="walking-activity" aria-label="今天也要出門散步">
      <div className="walking-head">
        <div>
          <p className="life-stage-label">{dailyLifeStageLabel}</p>
          <h1>今天也要出門散步</h1>
          {!started && safetyStep === "question" && <p>出門前，先選出你認為能兼顧安全與探索的散步方式。</p>}
          {!started && safetyStep !== "question" && <p>一天的照顧不只是在家餵食和陪伴，狗狗也需要規律外出活動。散步能讓牠探索環境、消耗體力、練習社會化，也有機會完成排泄。</p>}
        </div>
      </div>

      {!started ? (
        safetyStep === "question" ? (
          <section className="walking-safety-choice" aria-labelledby="walking-safety-title">
            <h2 id="walking-safety-title">你會用哪一種方式陪牠散步？</h2>
            <div className="walking-safety-grid">
              <button type="button" onClick={() => setSafetyStep("correct")}>
                <img src={dogShibaWalkingAsset("leash-choice.png")} alt="飼主使用胸背與牽繩，保持鬆繩讓柴犬嗅聞環境" />
                <span><b>繫好牽繩，保持鬆弛</b><small>讓狗狗在可控距離內嗅聞、探索環境。</small></span>
              </button>
              <button type="button" onClick={() => setSafetyStep("law")}>
                <img src={dogShibaWalkingAsset("off-leash-choice.png")} alt="沒有牽繩的柴犬離飼主一段距離自行探索" />
                <span><b>不繫牽繩，讓牠自己走</b><small>讓狗狗自由自在探索，飼主在後方跟著。</small></span>
              </button>
            </div>
          </section>
        ) : safetyStep === "law" ? (
          <section className="walking-law-feedback" aria-live="polite">
            <span aria-hidden="true">!</span>
            <div><p className="life-stage-label">外出安全與法規提醒</p><h2>自由探索，也需要有能立即保護牠的距離</h2></div>
            <p>《動物保護法》第 20 條要求寵物出入公共場所時須有人伴同；各縣市也可能以自治規範要求使用牽繩、箱籠或其他適當防護措施。外出前應查明所在地規定。</p>
            <p>即使在沒有明確禁止的地點，牽繩仍能降低走失、突然衝向車道、驚嚇他人或與其他動物衝突的風險。保持牽繩鬆弛，狗狗仍然可以嗅聞和探索。</p>
            <button type="button" className="secondary" onClick={() => setSafetyStep("question")}>回去重新選擇</button>
          </section>
        ) : safetyStep === "correct" ? (
          <section className="walking-law-feedback walking-law-feedback--correct" aria-live="polite">
            <span aria-hidden="true">✓</span>
            <div><p className="life-stage-label">你選得很好</p><h2>牽繩不是限制探索，而是讓探索更安全</h2></div>
            <p>繫好合適的胸背帶或項圈並保持牽繩鬆弛，狗狗仍然可以嗅聞、觀察環境；遇到車輛、陌生動物或突然受驚時，你也能及時控制距離，降低走失與衝突風險。</p>
            <p>《動物保護法》第 20 條要求寵物出入公共場所時須有人伴同，各縣市也可能要求使用牽繩、箱籠或其他適當防護措施。因此另一個「不繫牽繩」的選項，即使看似自由，也不是安全的散步方式。</p>
            <button type="button" className="primary" onClick={() => setSafetyStep("prepared")}>繼續準備散步用品 <span>→</span></button>
          </section>
        ) : (
        <div className="walking-prep">
          <section className="walking-prep-supplies" aria-label="出門前準備用品">
            <h2>出門前，先確認這些東西</h2>
            <p className="walking-safety-confirmed">✓ 已選擇牽繩陪伴，讓探索保持在安全範圍內。</p>
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
        </div>)
      ) : (
        <div className="walking-game">
          <p className="walking-game-hint">{walkingInstruction}</p>
          <div className="walking-scene-shell">
          <div
            className={`walking-scene ${moving ? "is-moving" : ""}`}
            ref={sceneRef}
            tabIndex={0}
            aria-label="散步場景，按往前走按鈕前進"
          >
            <div className="walking-progress walking-progress-overlay" aria-label={`散步進度 ${progressMinutes} / 20 分鐘`}>
              <b>散步進度</b>
              <div><span style={{ width: `${(progressMinutes / 20) * 100}%` }} /></div>
              <small>{progressMinutes} / 20 分鐘</small>
            </div>
            <picture>
              <source media="(max-width: 720px)" srcSet={scene.mobileImage} />
              <img className="walking-bg" src={scene.image} alt={scene.title} />
            </picture>
            {draggedBag && (
              <img
                className="walking-drag-bag-ghost"
                src={dogDailyAsset("poop-bag-1.png")}
                alt=""
                aria-hidden="true"
                style={{ left: draggedBag.x, top: draggedBag.y }}
              />
            )}
            <div className="walking-character" style={getWalkingCharacterStyle(sceneIndex, position, isMobileWalkingLayout)}>
              <img
                src={activity.walkingPoopCleaned ? dogShibaWalkingAsset("walker-dog-bag.webp") : needsCleanup ? dogShibaWalkingAsset("walker-and-dog-poop.png") : dogShibaWalkingAsset("walker-and-dog.webp")}
                alt={`正在和${petName}散步的人物與小狗`}
              />
            </div>
            {needsCleanup && (
              <div
                className={isMobileWalkingLayout ? "walking-poop walking-poop--mobile" : "walking-poop"}
                ref={poopTargetRef}
                style={isMobileWalkingLayout ? mobilePoopStyle : desktopPoopStyle}
                aria-hidden="true"
              >
                <img src={dogDailyAsset("poop.png")} alt="" />
              </div>
            )}
            {renderWalkingEventCard("walking-event-card--desktop")}
            <button
              type="button"
              className="walking-forward-button"
              disabled={needsCleanup}
              onPointerDown={(event) => {
                event.preventDefault();
                event.currentTarget.setPointerCapture?.(event.pointerId);
                startForward();
              }}
              onPointerUp={(event) => {
                event.currentTarget.releasePointerCapture?.(event.pointerId);
                stopForward();
              }}
              onPointerCancel={() => stopForward()}
              onPointerLeave={() => stopForward()}
              onLostPointerCapture={() => stopForward()}
              aria-label="往前走"
            >
              <span className="walking-forward-orb" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M8 11.2V4.8a1.7 1.7 0 1 1 3.4 0v5.4" />
                  <path d="M11.4 10V8.3a1.55 1.55 0 1 1 3.1 0v2.3" />
                  <path d="M14.5 10.7V9.4a1.45 1.45 0 1 1 2.9 0v2.4" />
                  <path d="M17.4 12.2v-1a1.35 1.35 0 1 1 2.7 0v4.1c0 3.3-2.3 5.7-6.1 5.7h-1.6c-2.2 0-3.7-.9-4.9-2.5l-3-4.1a1.7 1.7 0 0 1 2.6-2.1l1.1 1.1" />
                </svg>
              </span>
              <span className="walking-forward-label">往前走</span>
            </button>
          </div>
          {renderWalkingEventCard("walking-event-card--mobile")}
          </div>
        </div>
      )}
    </section>
  );
}
