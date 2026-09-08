import type { Scenario, ScenarioChoice } from "../../game-types";
import { incorrect, positive } from "./scenario-feedback";

export type BreedChallengeQuestion = {
  title: string;
  description: string;
  topic: string;
  reportSummary: string;
  breedKnowledge?: string;
  correctChoiceIndex?: number;
  correctText: string;
  correctExplanation: string;
  distractors: Array<{ text: string; explanation: string; suggestion: string }>;
};

export function buildBreedChallengeScenarios(
  questions: BreedChallengeQuestion[],
  breedId: string,
): Scenario[] {
  return questions.map((question, questionIndex) => {
    const correctChoice: ScenarioChoice = {
      id: `breed-challenge-${questionIndex + 1}-correct`,
      text: question.correctText,
      result: "correct",
      ...positive,
      explanation: question.correctExplanation,
    };
    const distractorChoices: ScenarioChoice[] = question.distractors.map((choice, choiceIndex) => ({
      id: `breed-challenge-${questionIndex + 1}-distractor-${choiceIndex + 1}`,
      text: choice.text,
      result: "incorrect",
      ...incorrect,
      explanation: choice.explanation,
      suggestion: choice.suggestion,
    }));
    const defaultCorrectIndex = breedId === "shiba" && questionIndex === 1 ? distractorChoices.length : 0;
    const correctIndex = Math.max(0, Math.min(question.correctChoiceIndex ?? defaultCorrectIndex, distractorChoices.length));
    const choices = [...distractorChoices];
    choices.splice(correctIndex, 0, correctChoice);
    return {
      id: `breed-challenge-${questionIndex + 1}`,
      stage: "品種的考驗",
      timeLabel: "日常照護",
      title: question.title,
      description: question.description,
      topic: question.topic,
      reportSummary: question.reportSummary,
      breedKnowledge: question.breedKnowledge,
      artIndex: 4,
      choices,
    };
  });
}
