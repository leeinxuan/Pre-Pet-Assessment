"use client";

import type { ReactNode } from "react";
import { ObservationReturnButton, plainChoiceText, type ObservationAnswerStatus } from "./activity-ui";

/**
 * Rabbit and bird observation activities share the same card shell. Species
 * configuration still supplies the image, copy, choices, and comparison flow.
 */
export function ObservationCard({
  className = "",
  label,
  labelledBy,
  children,
}: {
  className?: string;
  label: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`observation-card ${className}`}
      role="dialog"
      aria-modal="false"
      aria-live="polite"
      aria-label={labelledBy ? undefined : label}
      aria-labelledby={labelledBy}
    >
      {children}
    </section>
  );
}

/** A shared, warm-toned comparison panel for normal-versus-warning learning. */
export function ObservationCardComparison({ children }: { children: ReactNode }) {
  return <section className="observation-card-comparison">{children}</section>;
}

/**
 * Shared question/error/success state renderer for rabbit and bird anatomy
 * observations. Each activity supplies only its data and transition actions.
 */
export function ObservationCardFlow({
  status,
  title,
  image,
  question,
  choices,
  feedback,
  onChoose,
  onReturn,
  correctAction,
}: {
  status: ObservationAnswerStatus;
  title: ReactNode;
  image: ReactNode;
  question: ReactNode;
  choices: ReadonlyArray<{ id: string; label: string }>;
  feedback: ReactNode;
  onChoose: (id: string) => void;
  onReturn: () => void;
  correctAction?: ReactNode;
}) {
  return (
    <>
      {image}
      <h2>{title}</h2>
      {status === "correct" ? <>
        <p className="observation-card-feedback observation-card-feedback--correct">{feedback}</p>
        {correctAction}
      </> : status === "incorrect" ? <>
        <p className="observation-card-feedback observation-card-feedback--incorrect">{feedback}</p>
        <ObservationReturnButton onReturn={onReturn} />
      </> : <>
        <p className="observation-card-question">{question}</p>
        <div className="observation-card-choices">
          {choices.map((choice) => <button type="button" key={choice.id} onClick={() => onChoose(choice.id)}>{typeof choice.label === "string" ? plainChoiceText(choice.label) : choice.label}</button>)}
        </div>
      </>}
    </>
  );
}
