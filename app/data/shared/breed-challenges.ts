import type { Scenario, ScenarioChoice } from "../../game-types";
import { incorrect, positive } from "./scenario-feedback";

export type BreedChallengeQuestion = {
  /** 規劃文件原始題號；未提供時才採用資料陣列順序。 */
  sourceQuestionNumber?: number;
  title: string;
  description: string;
  questionText?: string;
  topic: string;
  reportSummary: string;
  breedKnowledge?: string;
  correctChoiceIndex?: number;
  correctText: string;
  correctExplanation: string;
  /** 答對此品種考驗後，使用共用 expense store 加入的費用。 */
  correctExpenseIds?: string[];
  distractors: Array<{ text: string; explanation: string; suggestion: string }>;
};

export function buildBreedChallengeScenarios(
  questions: BreedChallengeQuestion[],
  breedId: string,
  speciesId = "dog",
): Scenario[] {
  return questions.map((question, questionIndex) => {
    const sourceQuestionNumber = question.sourceQuestionNumber ?? questionIndex + 1;
    const correctChoice: ScenarioChoice = {
      id: `breed-challenge-${sourceQuestionNumber}-correct`,
      text: question.correctText,
      result: "correct",
      ...positive,
      explanation: question.correctExplanation,
      expenseIds: question.correctExpenseIds,
    };
    const distractorChoices: ScenarioChoice[] = question.distractors.map((choice, choiceIndex) => ({
      id: `breed-challenge-${sourceQuestionNumber}-distractor-${choiceIndex + 1}`,
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
      id: `breed-challenge-${sourceQuestionNumber}`,
      stage: "品種的考驗",
      stageId: "breed",
      speciesId,
      breedId,
      order: sourceQuestionNumber,
      sourceQuestionNumber,
      summaryCategory: "breed-challenge",
      timeLabel: "日常照護",
      title: question.title,
      description: question.description,
      questionText: question.questionText,
      topic: question.topic,
      reportSummary: question.reportSummary,
      breedKnowledge: question.breedKnowledge,
      artIndex: 4,
      choices,
    };
  });
}
