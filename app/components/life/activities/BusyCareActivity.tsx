"use client";

/* eslint-disable @next/next/no-img-element -- Existing layered busy-care scene uses native images for exact positioning. */

import { useState } from "react";
import { dogAssets } from "../../../data/species/dog/assets";
import { catAssets } from "../../../data/species/cat/assets";
import type { BusyCareChecklistQuestion, CareMember, Scenario, ScenarioAnswer, ScenarioChoice } from "../../../game-types";
import { renderKnowledgeText, withPetName } from "./activity-ui";
import {
  CorrectFeedbackLayout,
  IncorrectExplanation,
  KnowledgeCard,
  SceneMediaPlaceholder,
  ScenarioOptionCard,
  VideoWithToggle,
  getCorrectAnswerVideo,
  lifeStageLabelForScenario,
  plainFeedbackText,
} from "./scenario-ui";

const dogShibaAsset = (fileName: string) => `${dogAssets.life.shibaRoot}/${fileName}`;

function getBusyCareChecklist(items: readonly BusyCareChecklistQuestion[] | undefined, petName: string) {
  return (items ?? []).map((item) => ({
    ...item,
    prompt: item.prompt.replaceAll("{petName}", petName),
    reviewHint: item.reviewHint?.replaceAll("{petName}", petName),
  }));
}

export function BusyCareActivity({
  scenario,
  answer,
  petName,
  members,
  species = "dog",
  onMembersChange,
  onChoose,
  onMarkForReview,
  onContinue,
  onReplay,
  continueImmediately = false,
}: {
  scenario: Scenario;
  answer?: ScenarioAnswer;
  petName: string;
  members: CareMember[];
  species?: string;
  onMembersChange: (members: CareMember[]) => void;
  onChoose: (choice: ScenarioChoice) => void;
  onMarkForReview?: (scenario: Scenario, flag: string) => void;
  onContinue: () => void;
  onReplay?: () => void;
  continueImmediately?: boolean;
}) {
  const [mode, setMode] = useState<"question" | "family" | "incorrect" | "positive">(answer?.finalResult === "correct" ? "positive" : "question");
  const [familyStep, setFamilyStep] = useState<"name" | "check">("name");
  const [helperName, setHelperName] = useState("");
  const [helperChecks, setHelperChecks] = useState<Record<string, "yes" | "no" | "">>({});
  const [sceneVideoFailed, setSceneVideoFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [, setVideoFinished] = useState(false);
  const isCat = species === "cat";
  const isRabbit = species === "rabbit";
  const isBird = species === "bird";
  const animalName = isCat ? "貓咪" : isRabbit ? "兔子" : isBird ? "鸚鵡" : species === "hamster" ? "倉鼠" : "犬";
  const displayPetName = petName || animalName;
  const selectedChoice = scenario.choices.find((choice) => choice.id === answer?.finalChoiceId);
  const busyCompletion = scenario.busyCareCompletion;
  const familySupportChoice = scenario.choices.find((choice) => choice.isSupportChoice)
    ?? scenario.choices.find((choice) => choice.id === "family-helper" || choice.id === "rabbit-busy-helper" || choice.id === "bird-busy-helper");
  const helperQuestions = getBusyCareChecklist(scenario.busyCareChecklist, displayPetName).map((item) => ({
    ...item,
    text: item.prompt,
    short: item.reviewHint ?? {
      "daily-care": "每日餵食、換水、排泄與活動安排還需要先交接",
      "support-confirmed": "協助者的時間還需要先確認",
      "care-willing": "協助者的意願還需要先確認",
      "emergency-contact": "緊急聯絡方式還需要補充確認",
    }[item.id] ?? "交接內容還需要先確認",
    accepted: [item.correctAnswer],
  }));
  const allHelperChecksAnswered = helperQuestions.every((question) => Boolean(helperChecks[question.id]));
  const unsuitableHelperReasons = helperQuestions
    .filter((question) => helperChecks[question.id] && !question.accepted.includes(helperChecks[question.id] as "yes" | "no"))
    .map((question) => question.short);
  const hasUncertainHelperCheck = unsuitableHelperReasons.length > 0;
  const shouldShowHelperUncertainty = allHelperChecksAnswered && hasUncertainHelperCheck;

  function selectHelperCheck(question: typeof helperQuestions[number], value: "yes" | "no") {
    setHelperChecks((current) => ({ ...current, [question.id]: value }));
    if (!question.accepted.includes(value)) onMarkForReview?.(scenario, "helper-details-to-confirm");
  }

  function choose(choice: ScenarioChoice) {
    if (choice.id === familySupportChoice?.id) {
      setFamilyStep("name");
      setHelperChecks({});
      setMode("family");
      return;
    }
    onChoose(choice);
    setVideoFailed(false);
    setVideoFinished(false);
    setMode(choice.result === "correct" ? "positive" : "incorrect");
  }

  function resetHelperCandidate() {
    setFamilyStep("name");
    setHelperName("");
    setHelperChecks({});
  }

  function confirmHelperCandidate() {
    if (!allHelperChecksAnswered) return;
    if (hasUncertainHelperCheck) return;
    if (!familySupportChoice) return;
    const trimmedName = helperName.trim();
    if (trimmedName && !members.some((member) => member.name.trim().toLocaleLowerCase() === trimmedName.toLocaleLowerCase())) {
      onMembersChange([...members, { id: `busy-helper-${Date.now()}`, name: trimmedName, age: null, isPlayer: false }]);
    }
    onChoose(familySupportChoice);
    setVideoFailed(false);
    setVideoFinished(false);
    setMode("positive");
  }

  if (mode === "positive" && selectedChoice) {
    const completionTitle = busyCompletion?.title ?? "做得很好！";
    const encouragement = busyCompletion?.encouragement;
    return (
      <CorrectFeedbackLayout
        key={scenario.id}
        variant="single"
        title={completionTitle}
        videoSrc={getCorrectAnswerVideo(scenario.id)}
        mediaPlaceholder={species === "hamster" ? <SceneMediaPlaceholder title={withPetName(scenario.title, petName)} /> : undefined}
        videoFailed={videoFailed}
        fallbackText="正向結果影片目前無法播放，仍可繼續生活旅程。"
        intro={<p>{encouragement
          ? renderKnowledgeText(withPetName(encouragement, petName))
          : helperName.trim() && selectedChoice.id === familySupportChoice?.id
            ? `你確認了${helperName.trim()}的交接內容與緊急聯絡方式。這樣的交接才能讓${displayPetName}在你忙碌時仍獲得穩定照顧。`
            : plainFeedbackText(withPetName(selectedChoice.explanation, petName))}</p>}
        otherTips={busyCompletion && <div className="busy-care-completion-content">
          <section className="busy-care-warm-note busy-care-energy-reflection">
            <b className="busy-care-slogan">{renderKnowledgeText(withPetName(busyCompletion.reflectionText, petName))}</b>
            <p className="busy-care-reflection-title"><span aria-hidden="true">💡</span>{busyCompletion.reflectionTitle}</p>
            {busyCompletion.reflectionContent.map((content, index) => <p key={`${content}-${index}`}>{renderKnowledgeText(withPetName(content, petName))}</p>)}
          </section>
          {busyCompletion.showKnowledgeCard !== false && busyCompletion.knowledgeTitle && busyCompletion.knowledgeContent && (
            <KnowledgeCard title={busyCompletion.knowledgeTitle} className="busy-care-knowledge-card">
              {busyCompletion.knowledgeContent.map((content, index) => <p key={`${content}-${index}`}>{renderKnowledgeText(withPetName(content, petName))}</p>)}
            </KnowledgeCard>
          )}
          {busyCompletion.showCareTime !== false && busyCompletion.careTimeTitle && busyCompletion.careTimeItems && <section className="busy-care-care-time" aria-label={busyCompletion.careTimeTitle}>
            <b>{busyCompletion.careTimeTitle}</b>
            <ul>{busyCompletion.careTimeItems.map((item) => <li key={`${item.title}-${item.detail}`}><span>{item.title}</span><strong>{item.detail}</strong></li>)}</ul>
          </section>}
        </div>}
        otherTipsBeforeSuggestion
        suggestion={busyCompletion?.additionalAdvice?.length ? <div className="busy-care-additional-advice">{busyCompletion.additionalAdvice.map((advice, index) => <p key={`${advice}-${index}`}>{renderKnowledgeText(withPetName(advice, petName))}</p>)}</div> : null}
        onVideoEnded={() => setVideoFinished(true)}
        onVideoError={() => { setVideoFailed(true); setVideoFinished(true); }}
        onReplay={onReplay}
        onContinue={onContinue}
        continueImmediately={continueImmediately}
      />
    );
  }

  return (
    <section className="busy-care-activity">
      <div className="busy-care-heading"><p className="life-stage-label">{lifeStageLabelForScenario(scenario)}</p><h1>{withPetName(scenario.title, petName)}</h1><p>{withPetName(scenario.description, petName)}</p></div>
      <div className="busy-care-layout">
        <div className="busy-care-room" aria-label={`${animalName}在房間中等待照顧的情境`}>
          {isRabbit || species === "hamster" ? (
            <SceneMediaPlaceholder title={withPetName(scenario.title, petName)} />
          ) : !isCat && !sceneVideoFailed ? (
            <VideoWithToggle className="busy-care-room-video" src={dogShibaAsset("busy-daily-care.mp4")} loop ariaLabel="疲憊忙碌的日子情境影片" onError={() => setSceneVideoFailed(true)} />
          ) : (
            <>
              <img className="busy-care-room-background" src={isCat ? catAssets.life.safeRoom : dogAssets.feeding.room} alt="居家房間場景" />
              <img className="busy-care-hungry-dog" src={isCat ? catAssets.life.mixedCat : dogShibaAsset("shiba-hungry.png")} alt={`${displayPetName}在房間裡等待照顧`} />
            </>
          )}
        </div>
        {mode === "family" ? (
          <section className="busy-care-members" aria-live="polite">
            {familyStep === "name" ? (
              <>
                <div><span>協助者 1 / 2</span><h2>你會找誰幫忙？</h2><p>可以是同住家人，也可以是你信任的朋友。先寫下一個實際可聯絡的人。</p></div>
                <label className="busy-helper-name-field"><span>協助者姓名或稱呼</span><input type="text" value={helperName} placeholder="例如：姊姊、阿德" maxLength={20} onChange={(event) => setHelperName(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && helperName.trim()) setFamilyStep("check"); }} /></label>
                <div className="busy-care-member-actions"><button type="button" className="secondary" onClick={() => setMode("question")}>返回</button><button type="button" className="primary" disabled={!helperName.trim()} onClick={() => setFamilyStep("check")}>下一步，確認是否合適 <span>→</span></button></div>
              </>
            ) : (
              <>
                <div><span>協助者 2 / 2</span><h2>一起確認{helperName.trim()}是否合適</h2></div>
                <div className="busy-helper-checklist">
                  {helperQuestions.map((question, questionIndex) => (
                    <div className="busy-helper-question" role="group" aria-label={question.text} key={question.id}>
                      <p><span>{questionIndex + 1}</span><span className="busy-helper-question-text">{renderKnowledgeText(question.text)}</span></p>
                      <div>
                        <button type="button" className={helperChecks[question.id] === "yes" ? "is-selected" : ""} aria-pressed={helperChecks[question.id] === "yes"} onClick={() => selectHelperCheck(question, "yes")}>{"yesLabel" in question && typeof question.yesLabel === "string" ? question.yesLabel : "是"}</button>
                        <button type="button" className={helperChecks[question.id] === "no" ? "is-selected is-no" : ""} aria-pressed={helperChecks[question.id] === "no"} onClick={() => selectHelperCheck(question, "no")}>{"noLabel" in question && typeof question.noLabel === "string" ? question.noLabel : "否"}</button>
                      </div>
                    </div>
                  ))}
                </div>
                {shouldShowHelperUncertainty && (
                  <div className="busy-care-family-feedback" role="status"><b>這位協助者還有幾件事需要先確認</b><ul>{unsuitableHelperReasons.map((reason) => <li key={reason}>{reason}</li>)}</ul><p>你可以先和{helperName.trim()}談清楚，或改找另一位更適合的協助者。</p></div>
                )}
                <div className="busy-care-member-actions busy-helper-check-actions"><button type="button" className="secondary" onClick={resetHelperCandidate}>選擇其他人</button>{!shouldShowHelperUncertainty && <button type="button" className="primary" disabled={!allHelperChecksAnswered} onClick={confirmHelperCandidate}>確認這位協助者 <span>→</span></button>}</div>
              </>
            )}
          </section>
        ) : mode === "incorrect" && selectedChoice ? (
          <section className="busy-care-feedback incorrect busy-care-feedback--standard" aria-live="polite">
            <h2>這個做法可能不太適合</h2>
            <IncorrectExplanation text={withPetName(selectedChoice.explanation, petName)} />
            {selectedChoice.suggestion && <div className="incorrect-suggestion"><b>可以這樣調整：</b><p>{withPetName(selectedChoice.suggestion, petName)}</p></div>}
            <button type="button" className="secondary" onClick={() => setMode("question")}>重新想一次</button>
          </section>
        ) : (
          <section className="busy-care-options"><h2>{withPetName(scenario.questionText ?? "你會怎麼安排？", petName)}</h2>{scenario.choices.map((choice) => <ScenarioOptionCard key={choice.id} onClick={() => choose(choice)}>{withPetName(choice.text, petName)}</ScenarioOptionCard>)}</section>
        )}
      </div>
    </section>
  );
}

