"use client";

/* eslint-disable @next/next/no-img-element -- Arrival-meal sprites and scene layers require native image sizing and positioning. */
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { getSpeciesConfig } from "../../../data/species";
import { interpolatePetName } from "../../../data/shared/pet-text";
import { ItemDescriptionCard } from "../../shared/ItemDescriptionCard";
import { MobileInfoSheet, type MobileInfoSheetContent } from "../../shared/MobileInfoSheet";
import { MobileStageIntro } from "../../shared/MobileStageIntro";
import { MobileItemInfoBadge, MobileItemPlacedCheck } from "../../shared/MobileItemMarks";
import { useDialogFocus } from "../../shared/useDialogFocus";
import { useMobileLayout } from "../../shared/useMobileLayout";
import { matchesCompactPortraitLayout } from "../../shared/responsive";
import { logEvent } from "../../../lib/event-log";
import type {
  ArrivalMealSceneItemKey,
  ArrivalMealSceneLayout,
  ArrivalMealSupplyImageKey,
  ArrivalMealSupplyImageSizes,
  LifeActivityState,
} from "../../../game-types";

const lifeStageArrivalLabel = "適應新家與安全感";

function arrivalMealPlacementStyle(layout: ArrivalMealSceneLayout, kind: ArrivalMealSceneItemKey): CSSProperties {
  const desktop = layout.desktop[kind];
  const mobile = layout.mobile[kind];
  return {
    "--arrival-meal-left": `${desktop.left}%`,
    "--arrival-meal-bottom": `${desktop.bottom}%`,
    "--arrival-meal-width": `${desktop.width}%`,
    "--arrival-meal-max-height": desktop.maxHeight === undefined ? "none" : `${desktop.maxHeight}%`,
    "--mobile-arrival-meal-left": `${mobile.left}%`,
    "--mobile-arrival-meal-bottom": `${mobile.bottom}%`,
    "--mobile-arrival-meal-width": `${mobile.width}%`,
    "--mobile-arrival-meal-max-height": mobile.maxHeight === undefined ? "none" : `${mobile.maxHeight}%`,
  } as CSSProperties;
}

function arrivalMealSupplyImageStyle(sizes: ArrivalMealSupplyImageSizes, kind: ArrivalMealSupplyImageKey): CSSProperties {
  const desktop = sizes.desktop[kind];
  const mobile = sizes.mobile[kind];
  return {
    "--arrival-meal-supply-width": `${desktop.width}px`,
    "--arrival-meal-supply-height": `${desktop.height}px`,
    "--mobile-arrival-meal-supply-width": `${mobile.width}px`,
    "--mobile-arrival-meal-supply-height": `${mobile.height}px`,
  } as CSSProperties;
}

/**
 * 每個用品格預先保留完成說明卡所需的高度，讓圖片切換成卡片時，
 * 不會推移同列的用品、餵食場景或後續按鈕。
 */
function arrivalMealSupplySlotStyle(sizes: ArrivalMealSupplyImageSizes, kind: ArrivalMealSupplyImageKey): CSSProperties {
  const desktop = sizes.desktop[kind];
  const mobile = sizes.mobile[kind];
  return {
    "--arrival-meal-supply-slot-height": `${desktop.height + 36}px`,
    "--mobile-arrival-meal-supply-slot-height": `${mobile.height + 36}px`,
  } as CSSProperties;
}


function WarningTriangle({ className = "" }: { className?: string }) {
  return <svg className={`warning-triangle ${className}`.trim()} viewBox="0 0 48 44" aria-hidden="true" focusable="false">
    <path d="M24 3 45 40H3L24 3Z" fill="#f6c84a" stroke="#30261d" strokeWidth="4" strokeLinejoin="round" />
    <path d="M24 14v13" stroke="#30261d" strokeWidth="4" strokeLinecap="round" />
    <circle cx="24" cy="33" r="2.5" fill="#30261d" />
  </svg>;
}

function FeedingIntroIcon() {
  return <svg className="intro-line-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 36h46l-5 16H14L9 36ZM16 36l4-17h24l4 17M24 25h16M21 42h22" /><path d="M28 11c0 3-3 4-3 7m11-7c0 3-3 4-3 7" /></svg>;
}


export function ArrivalMealActivity({
  activity,
  petName,
  species = "dog",
  onChange,
  expenseIds,
  onPlayExpenseSequence,
  onContinue,
}: {
  activity: LifeActivityState;
  petName: string;
  species?: string;
  onChange: (patch: Partial<LifeActivityState>) => void;
  expenseIds?: readonly string[];
  onPlayExpenseSequence?: (ids: readonly string[]) => Promise<void>;
  onContinue: () => void;
}) {
  const speciesConfig = getSpeciesConfig(species);
  const feeding = speciesConfig.feeding;
  const arrivalMealSceneLayout = feeding.arrivalMealSceneLayout;
  const arrivalMealSupplyImageSizes = feeding.arrivalMealSupplyImageSizes;
  const hasRecordedMeal = useRef(false);
  const expenseIdsRef = useRef(expenseIds);
  const playExpenseSequenceRef = useRef(onPlayExpenseSequence);
  const [expenseSequenceComplete, setExpenseSequenceComplete] = useState(false);
  const [foodWarning, setFoodWarning] = useState<{ title: string; text: string; image: string } | null>(null);
  const [mobileInfo, setMobileInfo] = useState<MobileInfoSheetContent | null>(null);
  const [mobileStarted, setMobileStarted] = useState(false);
  const [unsafeFoodIds, setUnsafeFoodIds] = useState<string[]>([]);
  const [exitingItemIds, setExitingItemIds] = useState<string[]>([]);
  const warningDialogRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileLayout();
  const choiceItems = feeding.interaction === "choice" ? feeding.choices : [];
  const sceneSupplies = feeding.interaction === "scene" ? feeding.supplies : [];
  const sceneUnsafeFoods = feeding.interaction === "scene" ? feeding.unsafeFoods : [];
  const sceneComplete = feeding.interaction === "scene" && feeding.requiredSupplies.every((key) => key === "food" ? activity.arrivalMealFoodReady : key === "water" ? activity.arrivalMealWaterReady : activity.arrivalMealVeggieReady);
  const requiredChoices = choiceItems.filter((item) => item.result === "correct");
  const choiceComplete = requiredChoices.every((item) => activity.arrivalMealSelectedChoiceIds.includes(item.id));
  const choiceFeedback = choiceItems.find((item) => item.id === activity.arrivalMealFeedbackChoiceId);
  const complete = feeding.interaction === "choice" ? choiceComplete : sceneComplete;
  const mealTitle = feeding.interaction === "choice" ? interpolatePetName(feeding.title, petName) : `幫${petName || feeding.animalName}準備第一餐`;
  const mealDescription = feeding.interaction === "choice"
    ? interpolatePetName(feeding.intro, petName || "牠")
    : `${petName || feeding.animalName}剛到新家，還有些不安。先幫${petName || "牠"}準備合適的主食與乾淨飲水，讓牠慢慢安心下來。`;
  const arrivalMealActivityStyle = feeding.interaction === "scene"
    ? {
      ...(feeding.scene.desktopSupplyColumnWidth === undefined ? {} : {
        "--arrival-meal-supply-column-width": `${feeding.scene.desktopSupplyColumnWidth}px`,
      }),
      ...(feeding.scene.desktopBackgroundStyle?.objectFit ? {
        "--arrival-meal-desktop-background-fit": feeding.scene.desktopBackgroundStyle.objectFit,
      } : {}),
      ...(feeding.scene.desktopBackgroundStyle?.objectPosition ? {
        "--arrival-meal-desktop-background-position": feeding.scene.desktopBackgroundStyle.objectPosition,
      } : {}),
      ...(feeding.scene.desktopBackgroundStyle?.transform ? {
        "--arrival-meal-desktop-background-transform": feeding.scene.desktopBackgroundStyle.transform,
      } : {}),
      ...(feeding.scene.desktopBackgroundStyle?.transformOrigin ? {
        "--arrival-meal-desktop-background-origin": feeding.scene.desktopBackgroundStyle.transformOrigin,
      } : {}),
    } as CSSProperties
    : undefined;
  const supplyReady = (key: "food" | "water" | "veggie") => key === "food"
    ? activity.arrivalMealFoodReady
    : key === "water"
      ? activity.arrivalMealWaterReady
      : activity.arrivalMealVeggieReady;
  const hasMealItemPlaced = feeding.interaction === "choice"
    ? activity.arrivalMealSelectedChoiceIds.length > 0
    : sceneSupplies.some((supply) => supplyReady(supply.stateKey));
  const foodReadyOverride = feeding.interaction !== "choice" && activity.arrivalMealFoodReady
    ? feeding.scene.food.readyOverrides?.find((override) => supplyReady(override.when))
    : undefined;
  const foodSceneAsset = feeding.interaction !== "choice"
    ? (activity.arrivalMealFoodReady ? foodReadyOverride?.image ?? feeding.scene.food.ready : feeding.scene.food.empty)
    : undefined;
  const foodSceneAlt = feeding.interaction !== "choice"
    ? (activity.arrivalMealFoodReady ? foodReadyOverride?.alt ?? feeding.scene.food.alt ?? "準備好的主食" : "主食等待放入")
    : "";
  const veggieSceneAsset = feeding.interaction !== "choice" && feeding.scene.veggie
    ? (activity.arrivalMealVeggieReady ? feeding.scene.veggie.ready : feeding.scene.veggie.empty)
    : undefined;
  const [readyPetDisplayed, setReadyPetDisplayed] = useState(false);
  useDialogFocus({ isOpen: Boolean(foodWarning && !isMobile), dialogRef: warningDialogRef, onClose: closeFoodWarning });
  useEffect(() => {
  if (complete) logEvent("arrival_meal_completed", { species });
}, [complete, species]);
  useEffect(() => {
    if (!complete || hasRecordedMeal.current || (!mobileStarted && matchesCompactPortraitLayout())) return;
    hasRecordedMeal.current = true;
    let active = true;
    void (async () => {
      await playExpenseSequenceRef.current?.(expenseIdsRef.current ?? []);
      if (active) setExpenseSequenceComplete(true);
    })();
    return () => { active = false; };
  }, [complete, mobileStarted]);
  useEffect(() => {
    const delay = feeding.interaction === "scene" ? feeding.readyPetDelayMs : undefined;
    if (!complete || delay === undefined || (!mobileStarted && matchesCompactPortraitLayout())) return;
    const timer = window.setTimeout(() => setReadyPetDisplayed(true), delay);
    return () => window.clearTimeout(timer);
  }, [complete, feeding, mobileStarted]);
  function prepareSupply(key: "food" | "water" | "veggie") {
    const ready = key === "food" ? activity.arrivalMealFoodReady : key === "water" ? activity.arrivalMealWaterReady : activity.arrivalMealVeggieReady;
    if (ready) return;
    setFoodWarning(null);
    const completeSelection = () => {
  logEvent("supply_prepared", { supply: key });
  onChange(key === "food" ? { arrivalMealFoodReady: true } : key === "water" ? { arrivalMealWaterReady: true } : { arrivalMealVeggieReady: true });
};
    if (!isMobile) {
      completeSelection();
      return;
    }
    const itemId = `supply-${key}`;
    if (exitingItemIds.includes(itemId)) return;
    setExitingItemIds((current) => [...current, itemId]);
    window.setTimeout(() => {
      completeSelection();
      setExitingItemIds((current) => current.filter((id) => id !== itemId));
    }, 360);
  }

  function openMobileSupplyInfo(supply: typeof sceneSupplies[number]) {
    logEvent("item_info_opened", { itemId: supply.stateKey });
    setMobileInfo({ title: supply.label, description: supply.description, image: supply.image });
  }
  function closeFoodWarning() {
    logEvent("food_warning_closed");
    setFoodWarning(null);
  }
  function warnUnsafeFood(kind: string) {
    const unsafeFood = sceneUnsafeFoods.find((item) => item.id === kind);
    if (!unsafeFood) return;
    logEvent("wrong_food_clicked", { foodId: kind });
    setUnsafeFoodIds((current) => current.includes(kind) ? current : [...current, kind]);
    setFoodWarning({ title: interpolatePetName(unsafeFood.title, petName, species), text: interpolatePetName(unsafeFood.text, petName, species), image: unsafeFood.image });
  }
  function chooseMealChoice(id: string) {
    const item = choiceItems.find((entry) => entry.id === id);
    if (!item) return;
    if (activity.arrivalMealSelectedChoiceIds.includes(id) && matchesCompactPortraitLayout()) {
      setMobileInfo({ title: item.label, description: interpolatePetName(item.feedback, petName) });
      return;
    }
    const isNewSafeChoice = item.result !== "incorrect" && !activity.arrivalMealSelectedChoiceIds.includes(id);
    if (isNewSafeChoice) {
      const completeSelection = () => onChange({ arrivalMealSelectedChoiceIds: [...activity.arrivalMealSelectedChoiceIds, id], arrivalMealFeedbackChoiceId: id });
      if (!isMobile) {
        completeSelection();
        return;
      }
      const itemId = `choice-${id}`;
      if (exitingItemIds.includes(itemId)) return;
      setExitingItemIds((current) => [...current, itemId]);
      window.setTimeout(() => {
        completeSelection();
        setExitingItemIds((current) => current.filter((entry) => entry !== itemId));
      }, 360);
      return;
    }
    onChange({ arrivalMealFeedbackChoiceId: id });
  }
  return (
    <section className={`arrival-meal-activity${feeding.interaction === "choice" ? " arrival-meal-activity--choice" : ""}${mobileStarted ? " is-mobile-started" : " is-mobile-intro"}`} data-species={species} style={arrivalMealActivityStyle} aria-label={`為${petName}準備第一餐`}>
      <MobileStageIntro id="arrival-meal-mobile-intro-title" icon={<FeedingIntroIcon />} title={mealTitle} description={mealDescription} actionLabel="開始準備第一餐" onStart={() => setMobileStarted(true)} />
      <div className="arrival-meal-inventory"><div className="arrival-meal-heading">
        <p className="life-stage-label">{lifeStageArrivalLabel}</p>
        <h1>{mealTitle}</h1>
        <p>{mealDescription}</p>
      </div>
      <aside className={`arrival-meal-supplies${feeding.interaction === "choice" ? " arrival-meal-supplies--choice" : ""}`} aria-label="晚餐用品">
        {feeding.interaction === "choice" ? choiceItems.map((item) => <button key={item.id} type="button" draggable={!activity.arrivalMealSelectedChoiceIds.includes(item.id)}
          onDragStart={(event) => event.dataTransfer.setData("text/plain", item.id)} onClick={() => chooseMealChoice(item.id)}
          disabled={exitingItemIds.includes(`choice-${item.id}`)} className={`arrival-meal-choice-button ${item.result === "incorrect" ? "is-unsafe" : ""} ${activity.arrivalMealSelectedChoiceIds.includes(item.id) ? "done" : ""}${exitingItemIds.includes(`choice-${item.id}`) ? " departing" : ""}`}>
          <b>{item.result === "caution" ? "▲ " : ""}{item.label}</b><small>{activity.arrivalMealSelectedChoiceIds.includes(item.id) ? "已放入食碗" : item.result === "incorrect" ? "點擊查看原因" : "點擊或拖曳放入"}</small><MobileItemInfoBadge />{activity.arrivalMealSelectedChoiceIds.includes(item.id) && <MobileItemPlacedCheck />}
        </button>) : <>{sceneSupplies.map((supply) => {
          const ready = supply.stateKey === "food" ? activity.arrivalMealFoodReady : supply.stateKey === "water" ? activity.arrivalMealWaterReady : activity.arrivalMealVeggieReady;
          const imageClassName = supply.stateKey === "food" ? "arrival-meal-supply-food" : supply.stateKey === "water" ? "arrival-meal-supply-water" : undefined;
          const imageStyle = arrivalMealSupplyImageStyle(arrivalMealSupplyImageSizes, supply.stateKey);
          const note = <ItemDescriptionCard className="arrival-meal-desktop-note" title={supply.label} description={supply.description} footer="已準備完成" />;
          const exiting = exitingItemIds.includes(`supply-${supply.stateKey}`);
          return <div key={supply.stateKey} className="arrival-meal-supply-slot arrival-meal-supply-slot--info-card" style={arrivalMealSupplySlotStyle(arrivalMealSupplyImageSizes, supply.stateKey)}>{ready ? <>{note}<button type="button" className="arrival-meal-mobile-done" onClick={() => openMobileSupplyInfo(supply)} aria-label={`查看${supply.label}說明`}><img style={imageStyle} src={supply.image} alt="" /><span>{supply.label}</span><MobileItemInfoBadge /><MobileItemPlacedCheck /></button></> : <><button type="button" disabled={exiting} className={`${supply.stateKey === "food" ? "arrival-meal-supply-food-button " : ""}${exiting ? "departing" : ""}`.trim() || undefined} onClick={() => prepareSupply(supply.stateKey)}><img className={imageClassName} style={imageStyle} src={supply.image} alt="" /><span>{supply.label}</span><MobileItemInfoBadge /></button><ItemDescriptionCard className="arrival-meal-desktop-note arrival-meal-desktop-note--reserve" title={supply.label} description={supply.description} footer="已準備完成" /></>}</div>;
        })}{sceneUnsafeFoods.map((food) => {
          const caution = food.presentation === "caution";
          return <button key={food.id} type="button" className={`arrival-meal-unsafe${caution ? " caution" : ""}${unsafeFoodIds.includes(food.id) ? " warning" : ""}`} onClick={() => warnUnsafeFood(food.id)}><span className="unsafe-food-visual"><img style={arrivalMealSupplyImageStyle(arrivalMealSupplyImageSizes, "unsafe")} src={food.image} alt="" />{unsafeFoodIds.includes(food.id) && (caution ? <WarningTriangle className="unsafe-food-warning-icon" /> : <i className="unsafe-food-prohibition-icon" aria-hidden="true">🚫</i>)}</span><span>{food.label}</span><MobileItemInfoBadge /></button>;
        })}</>}
      </aside>
      </div>
      <div className={`arrival-meal-scene${feeding.interaction !== "choice" && feeding.scene.mobileBackgroundStyle ? " arrival-meal-scene--own-mobile-bg" : ""}`} role={feeding.interaction === "choice" ? "group" : undefined} aria-label={feeding.interaction === "choice" ? "第一餐食碗" : undefined} onDragOver={feeding.interaction === "choice" ? (event) => event.preventDefault() : undefined} onDrop={feeding.interaction === "choice" ? (event) => { event.preventDefault(); chooseMealChoice(event.dataTransfer.getData("text/plain")); } : undefined}>
        {mobileStarted && !hasMealItemPlaced && <p className="mobile-item-operation-cue">{feeding.interaction === "choice" ? "點擊食物，放入食碗" : "點擊用品，準備第一餐"}</p>}
        {feeding.interaction === "choice" ? <div className="scene-media-placeholder" aria-live="polite"><small>互動場景</small><b>食碗</b><p>{activity.arrivalMealSelectedChoiceIds.length ? choiceItems.filter((item) => activity.arrivalMealSelectedChoiceIds.includes(item.id)).map((item) => item.label).join("、") : feeding.emptyBowlText}</p></div> : <>
        <img className="arrival-meal-room arrival-meal-room--desktop" src={feeding.scene.desktopBackground} alt={`${feeding.animalName}的新家房間`} />
        <img className="arrival-meal-room arrival-meal-room--mobile" src={feeding.scene.mobileBackground} style={feeding.scene.mobileBackgroundStyle} alt="" />
        {foodWarning && <div className="arrival-meal-warning-overlay">
          <div ref={warningDialogRef} className="arrival-meal-warning" role="dialog" aria-modal="true" aria-label={foodWarning.title} tabIndex={-1} onClick={closeFoodWarning}>
            <button type="button" className="arrival-meal-warning-close" onClick={(event) => { event.stopPropagation(); closeFoodWarning(); }} aria-label="關閉不適合食物提示">×</button>
            <b>{foodWarning.title}</b>
            <p>{foodWarning.text}</p>
          </div>
        </div>}
        <img className="arrival-meal-dog" style={arrivalMealPlacementStyle(arrivalMealSceneLayout, "pet")} src={complete && (feeding.readyPetDelayMs === undefined || readyPetDisplayed) ? feeding.scene.pet.ready : feeding.scene.pet.waiting} alt={complete ? `${petName || feeding.animalName}安心地待在房間裡` : `${petName || feeding.animalName}還在等待晚餐與飲水`} />
        <img className="arrival-meal-water" style={arrivalMealPlacementStyle(arrivalMealSceneLayout, "water")} src={activity.arrivalMealWaterReady ? feeding.scene.water.ready : feeding.scene.water.empty} alt={activity.arrivalMealWaterReady ? "裝好水的水碗" : "空水碗"} />
        {foodSceneAsset && <img className="arrival-meal-food" style={arrivalMealPlacementStyle(arrivalMealSceneLayout, "food")} src={foodSceneAsset} alt={foodSceneAlt} />}
        {veggieSceneAsset && feeding.scene.veggie && <img className="arrival-meal-veggie" style={arrivalMealPlacementStyle(arrivalMealSceneLayout, "veggie")} src={veggieSceneAsset} alt={activity.arrivalMealVeggieReady ? feeding.scene.veggie.alt : "空的補鈣碟"} />}
        </>}
      </div>
      <div className={`arrival-meal-footer${complete ? " is-complete" : ""}${feeding.interaction === "choice" && choiceFeedback ? " has-feedback" : ""}`}>
        {feeding.interaction === "choice" && choiceFeedback && <p className={`guided-activity-feedback ${choiceFeedback.result}`} role="status">{interpolatePetName(choiceFeedback.feedback, petName)}</p>}
        {complete && <p className="arrival-meal-completion-message" role="status">{feeding.completionMessage}</p>}
        <button className="primary arrival-meal-continue-button" disabled={!complete || !expenseSequenceComplete} onClick={onContinue}>繼續生活旅程 <span>→</span></button>
      </div>
      <MobileInfoSheet content={mobileInfo ?? (foodWarning ? { title: foodWarning.title, description: foodWarning.text, image: foodWarning.image } : null)} onClose={() => { logEvent(foodWarning ? "food_warning_closed" : "food_info_closed"); setMobileInfo(null); setFoodWarning(null); }} />
    </section>
  );
}
