"use client";

/* eslint-disable @next/next/no-img-element -- Arrival-meal sprites and scene layers require native image sizing and positioning. */
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { getSpeciesConfig } from "../../../data/species";
import { interpolatePetName } from "../../../data/shared/pet-text";
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
 * 完成後以透明預留格取代用品按鈕；高度跟原本「圖片＋名稱」一致，
 * 避免任何物種在點擊用品後讓左側物品欄或整個餵食場景縮動。
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
  const [foodWarning, setFoodWarning] = useState<{ title: string; text: string } | null>(null);
  const [unsafeFoodIds, setUnsafeFoodIds] = useState<string[]>([]);
  const choiceItems = feeding.interaction === "choice" ? feeding.choices : [];
  const sceneSupplies = feeding.interaction === "scene" ? feeding.supplies : [];
  const sceneUnsafeFoods = feeding.interaction === "scene" ? feeding.unsafeFoods : [];
  const sceneComplete = feeding.interaction === "scene" && feeding.requiredSupplies.every((key) => key === "food" ? activity.arrivalMealFoodReady : key === "water" ? activity.arrivalMealWaterReady : activity.arrivalMealVeggieReady);
  const requiredChoices = choiceItems.filter((item) => item.result === "correct");
  const choiceComplete = requiredChoices.every((item) => activity.hamsterMealSelected.includes(item.id));
  const choiceFeedback = choiceItems.find((item) => item.id === activity.hamsterMealFeedbackId);
  const complete = feeding.interaction === "choice" ? choiceComplete : sceneComplete;
  const [readyPetDisplayed, setReadyPetDisplayed] = useState(false);
  useEffect(() => {
    if (!complete || hasRecordedMeal.current) return;
    hasRecordedMeal.current = true;
    let active = true;
    void (async () => {
      await playExpenseSequenceRef.current?.(expenseIdsRef.current ?? []);
      if (active) setExpenseSequenceComplete(true);
    })();
    return () => { active = false; };
  }, [complete]);
  useEffect(() => {
    const delay = feeding.interaction === "scene" ? feeding.readyPetDelayMs : undefined;
    if (!complete || delay === undefined) return;
    const timer = window.setTimeout(() => setReadyPetDisplayed(true), delay);
    return () => window.clearTimeout(timer);
  }, [complete, feeding]);
  function prepareSupply(key: "food" | "water" | "veggie") {
    const ready = key === "food" ? activity.arrivalMealFoodReady : key === "water" ? activity.arrivalMealWaterReady : activity.arrivalMealVeggieReady;
    if (ready) return;
    setFoodWarning(null);
    onChange(key === "food" ? { arrivalMealFoodReady: true } : key === "water" ? { arrivalMealWaterReady: true } : { arrivalMealVeggieReady: true });
  }
  function warnUnsafeFood(kind: string) {
    const unsafeFood = sceneUnsafeFoods.find((item) => item.id === kind);
    if (!unsafeFood) return;
    setUnsafeFoodIds((current) => current.includes(kind) ? current : [...current, kind]);
    setFoodWarning({ title: unsafeFood.title, text: unsafeFood.text });
  }
  function chooseMealChoice(id: string) {
    const item = choiceItems.find((entry) => entry.id === id);
    if (!item) return;
    const isNewSafeChoice = item.result !== "incorrect" && !activity.hamsterMealSelected.includes(id);
    if (isNewSafeChoice) {
      onChange({ hamsterMealSelected: [...activity.hamsterMealSelected, id], hamsterMealFeedbackId: id });
      return;
    }
    onChange({ hamsterMealFeedbackId: id });
  }
  return (
    <section className={`arrival-meal-activity${feeding.interaction === "choice" ? " arrival-meal-activity--choice" : ""}`} aria-label={`為${petName}準備第一餐`}>
      <div className="arrival-meal-heading">
        <p className="life-stage-label">{lifeStageArrivalLabel}</p>
        <h1>{feeding.interaction === "choice" ? interpolatePetName(feeding.title, petName) : `幫${petName || feeding.animalName}準備第一餐`}</h1>
        <p>{feeding.interaction === "choice" ? interpolatePetName(feeding.intro, petName || "牠") : `${petName || feeding.animalName}剛到新家，還有些不安。先幫${petName || "牠"}準備合適的主食與乾淨飲水，讓牠慢慢安心下來。`}</p>
      </div>
      <aside className={`arrival-meal-supplies${feeding.interaction === "choice" ? " arrival-meal-supplies--choice" : ""}`} aria-label="晚餐用品">
        {feeding.interaction === "choice" ? choiceItems.map((item) => <button key={item.id} type="button" draggable={!activity.hamsterMealSelected.includes(item.id)}
          onDragStart={(event) => event.dataTransfer.setData("text/plain", item.id)} onClick={() => chooseMealChoice(item.id)}
          className={`arrival-meal-choice-button ${item.result === "incorrect" ? "is-unsafe" : ""} ${activity.hamsterMealSelected.includes(item.id) ? "done" : ""}`}>
          <b>{item.result === "caution" ? "▲ " : ""}{item.label}</b><small>{activity.hamsterMealSelected.includes(item.id) ? "已放入食碗" : item.result === "incorrect" ? "點擊查看原因" : "點擊或拖曳放入"}</small>
        </button>) : <>{sceneSupplies.map((supply) => {
          const ready = supply.stateKey === "food" ? activity.arrivalMealFoodReady : supply.stateKey === "water" ? activity.arrivalMealWaterReady : activity.arrivalMealVeggieReady;
          return <div key={supply.stateKey} className="arrival-meal-supply-slot" style={arrivalMealSupplySlotStyle(arrivalMealSupplyImageSizes, supply.stateKey)}>{!ready ? <button type="button" className={supply.stateKey === "food" ? "arrival-meal-supply-food-button" : undefined} onClick={() => prepareSupply(supply.stateKey)}><img className={supply.stateKey === "food" ? "arrival-meal-supply-food" : supply.stateKey === "water" ? "arrival-meal-supply-water" : undefined} style={arrivalMealSupplyImageStyle(arrivalMealSupplyImageSizes, supply.stateKey)} src={supply.image} alt={supply.alt} /><span>{supply.label}</span></button> : <div className="arrival-meal-supply-placeholder" aria-hidden="true" />}</div>;
        })}{sceneUnsafeFoods.map((food) => {
          const caution = food.presentation === "caution";
          return <button key={food.id} type="button" className={`arrival-meal-unsafe${caution ? " caution" : ""}${unsafeFoodIds.includes(food.id) ? " warning" : ""}`} onClick={() => warnUnsafeFood(food.id)}><span className="unsafe-food-visual"><img style={arrivalMealSupplyImageStyle(arrivalMealSupplyImageSizes, "unsafe")} src={food.image} alt={food.label} />{unsafeFoodIds.includes(food.id) && (caution ? <WarningTriangle className="unsafe-food-warning-icon" /> : <i className="unsafe-food-prohibition-icon" aria-hidden="true">🚫</i>)}</span><span>{food.label}</span></button>;
        })}</>}
      </aside>
      <div className="arrival-meal-scene" role={feeding.interaction === "choice" ? "group" : undefined} aria-label={feeding.interaction === "choice" ? "第一餐食碗" : undefined} onDragOver={feeding.interaction === "choice" ? (event) => event.preventDefault() : undefined} onDrop={feeding.interaction === "choice" ? (event) => { event.preventDefault(); chooseMealChoice(event.dataTransfer.getData("text/plain")); } : undefined}>
        {feeding.interaction === "choice" ? <div className="scene-media-placeholder" aria-live="polite"><small>互動場景</small><b>食碗</b><p>{activity.hamsterMealSelected.length ? choiceItems.filter((item) => activity.hamsterMealSelected.includes(item.id)).map((item) => item.label).join("、") : feeding.emptyBowlText}</p></div> : <>
        <img className="arrival-meal-room arrival-meal-room--desktop" src={feeding.scene.desktopBackground} alt={`${feeding.animalName}的新家房間`} />
        <img className="arrival-meal-room arrival-meal-room--mobile" src={feeding.scene.mobileBackground} alt="" />
        {foodWarning && <div className="arrival-meal-warning" role="alert">
          <button type="button" className="arrival-meal-warning-close" onClick={() => setFoodWarning(null)} aria-label="關閉不適合食物提示">×</button>
          <b>{foodWarning.title}</b>
          <p>{foodWarning.text}</p>
        </div>}
        <img className="arrival-meal-dog" style={arrivalMealPlacementStyle(arrivalMealSceneLayout, "pet")} src={complete && (feeding.readyPetDelayMs === undefined || readyPetDisplayed) ? feeding.scene.pet.ready : feeding.scene.pet.waiting} alt={complete ? `${petName || feeding.animalName}安心地待在房間裡` : `${petName || feeding.animalName}還在等待晚餐與飲水`} />
        <img className="arrival-meal-water" style={arrivalMealPlacementStyle(arrivalMealSceneLayout, "water")} src={activity.arrivalMealWaterReady ? feeding.scene.water.ready : feeding.scene.water.empty} alt={activity.arrivalMealWaterReady ? "裝好水的水碗" : "空水碗"} />
        <img className="arrival-meal-food" style={arrivalMealPlacementStyle(arrivalMealSceneLayout, "food")} src={activity.arrivalMealFoodReady ? feeding.scene.food.ready : feeding.scene.food.empty} alt={activity.arrivalMealFoodReady ? "裝好主食的食碗" : "空食碗"} />
        {feeding.scene.veggie && activity.arrivalMealVeggieReady && <img className="arrival-meal-veggie" style={arrivalMealPlacementStyle(arrivalMealSceneLayout, "veggie")} src={feeding.scene.veggie.ready} alt={feeding.scene.veggie.alt} />}
        </>}
      </div>
      <div className="arrival-meal-footer">
        {feeding.interaction === "choice" && choiceFeedback && <p className={`guided-activity-feedback ${choiceFeedback.result}`} role="status">{interpolatePetName(choiceFeedback.feedback, petName)}</p>}
        <p className="arrival-meal-completion-message" role="status">{complete ? feeding.completionMessage : "\u00a0"}</p>
        <button className="primary" disabled={!complete || !expenseSequenceComplete} onClick={onContinue}>繼續生活旅程 <span>→</span></button>
      </div>
    </section>
  );
}
