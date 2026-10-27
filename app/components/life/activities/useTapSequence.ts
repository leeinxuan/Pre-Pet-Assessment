"use client";

import { useState } from "react";

export type TapPhase = "idle" | "toolSelected" | "itemCollected" | "completed";

export type TapStep<TTool extends string, TTarget extends string, TOutcome> = {
  id: string;
  tool?: TTool;
  target: TTarget;
  initialPhase?: "idle" | "itemCollected";
  prompts: Partial<Record<TapPhase, string>>;
  outcome: TOutcome;
};

/** A small, reusable select-then-target state machine for touch-first activities. */
export function useTapSequence<TTool extends string, TTarget extends string, TOutcome>(
  steps: readonly TapStep<TTool, TTarget, TOutcome>[],
  stepIndex: number,
) {
  const [selection, setSelection] = useState<{ stepId: string; phase: TapPhase } | null>(null);
  const step = steps[stepIndex];
  const phase: TapPhase = step && selection?.stepId === step.id ? selection.phase : step?.initialPhase ?? "idle";

  function selectTool(tool: TTool) {
    if (!step || !step.tool || step.tool !== tool || phase !== "idle") return false;
    setSelection({ stepId: step.id, phase: "toolSelected" });
    return true;
  }

  function completeTarget(target: TTarget): TOutcome | null {
    if (!step || step.target !== target || (phase !== "toolSelected" && phase !== "itemCollected")) return null;
    setSelection({ stepId: step.id, phase: "completed" });
    return step.outcome;
  }

  return { step, phase, selectTool, completeTarget };
}
