export type ExpenseCategory = string;

export type ExpenseRecord = {
  id: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  stage: string;
  recurring: boolean;
  fromEmergency?: boolean;
};

export type CareMember = {
  id: string;
  name: string;
  age: number | null;
  isPlayer: boolean;
};

export type ScenarioResult = "correct" | "partial" | "incorrect";

export type ScenarioChoice = {
  id: string;
  text: string;
  result: ScenarioResult;
  feedbackTitle: string;
  explanation: string;
  suggestion?: string;
  expenseIds?: string[];
  effects?: {
    trust?: number;
    wellbeing?: number;
    support?: number;
  };
};

export type Scenario = {
  id: string;
  stage: string;
  timeLabel: string;
  title: string;
  description: string;
  topic?: string;
  reportSummary?: string;
  breedKnowledge?: string;
  choices: ScenarioChoice[];
  reminder?: string;
  artIndex: number;
  supportChoice?: boolean;
  multipleChoice?: boolean;
  requiredCorrectOptionIds?: string[];
  wrongOptionIds?: string[];
  correctSummary?: string[];
};

export type ScenarioAnswer = {
  scenarioId: string;
  firstChoiceId: string;
  finalChoiceId: string;
  firstChoiceIds?: string[];
  finalChoiceIds?: string[];
  firstResult: ScenarioResult;
  finalResult: ScenarioResult;
  attempts: number;
};

export type LifeJourneyPhase =
  | "arrival-video"
  | "life-journey"
  | "complete";

export type JourneyItemType =
  | "scenario"
  | "walking"
  | "breed-challenge"
  | "body-language"
  | "body-care"
  | "senior-room";

export type JourneyItem = {
  id: string;
  type: JourneyItemType;
  timeLabel: string;
  title: string;
  scenarioId?: string;
};

export type LifeActivityState = {
  bodyLanguageSignals: string[];
  arrivalMealFoodReady: boolean;
  arrivalMealWaterReady: boolean;
  walkingPreparedItems: string[];
  walkingSceneIndex: number;
  walkingMinutes: number;
  walkingPoopCleaned: boolean;
  walkingComplete: boolean;
  sickTimePassComplete: boolean;
  bodyCareParts: string[];
  seniorAdjustments: string[];
};

export type Profile = {
  age: string;
  role: string;
  roleOther: string;
  hoursAway: string;
  careHours: string;
  housing: string;
  landlordConsent: string;
  hasHousemates: boolean | null;
  housematesConsent: boolean | null;
  hasSensitiveHouseholdMembers: boolean;
  housemateList: string[];
  housemateTypes: string[];
  otherHousemate: string;
  activitySpace: string;
  otherActivitySpace: string;
  homeSpaceImage: string;
  homeSpaceImageName: string;
  homeSpaceImages: string[];
  homeSpaceImageNames: string[];
  noShibaExperience: boolean;
  pastPetTypes: string[];
  pastDogCount: string;
  pastCatCount: string;
  pastOther: string;
  currentPetTypes: string[];
  currentDogCount: string;
  currentCatCount: string;
  currentOther: string;
  experienceNote: string;
  experience: string;
  pastPets: string;
  currentPets: string;
  reasons: string[];
  reasonOther: string;
  monthlyBudget: string;
  emergencyFund: boolean | null;
  backupSupport: boolean | null;
};

export type RoomItem = {
  id: string;
  label: string;
  icon: string;
  image: string;
  placement: { x: number; y: number; width: number; layer: number };
  mobilePlacement?: { x: number; y: number; width: number };
  required: boolean;
  need: "飲食" | "休息" | "排泄" | "安全" | "活動" | "清潔";
  expenseId?: string;
  purpose: string;
};

export type HazardItem = {
  id: string;
  label: string;
  icon: string;
  image: string;
  placement: { x: number; y: number; width: number; layer: number };
  mobilePlacement?: { x: number; y: number; width: number };
  danger: string;
  handling: string;
};

export type TrunkItem = {
  id: string;
  label: string;
  kind: "document" | "supply";
  image: string;
  description: string;
  reason: string;
  caution: string;
  sourceLabel: string;
  sourceUrl?: string;
  feedback: string;
  preparedLabel: "已攜帶" | "已準備";
  expenseIds?: string[];
  placement: { x: number; y: number; width: number; layer: number };
};
