export type SharedDiscussionTopic = {
  id: string;
  title: string;
  topic: string;
  knowledgePoints: string[];
};

export type SharedAssessmentResult = {
  version: 1;
  createdAt: string;
  petName: string;
  breedId: string;
  breedLabel: string;
  readinessLevel: string;
  preparation: {
    roomCompletion: number;
    hazardsComplete: boolean;
    transportComplete: boolean;
  };
  costs: {
    simulatedTotal: number;
    emergencyReserve: number;
    suggestedTotal: number;
  };
  preparedItems: string[];
  itemsToConfirm: string[];
  discussionTopics: SharedDiscussionTopic[];
  committed: boolean;
};

export type SharedAssessmentRecord = {
  id: string;
  result: SharedAssessmentResult;
};
