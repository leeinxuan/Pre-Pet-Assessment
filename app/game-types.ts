export type ExpenseCategory = string;

export type ExpenseRecord = {
  id: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  stage: string;
  recurring: boolean;
  fromEmergency?: boolean;
  /** 供共用費用明細、摘要與匯出使用的簡短用途說明。 */
  description?: string;
  /** 由 journey 觸發時保留來源，供共用明細、摘要與匯出追溯。 */
  speciesId?: string;
  stageId?: string;
  sourceScenarioId?: string;
};

export type ExpenseTriggerMeta = Pick<ExpenseRecord, "speciesId" | "stageId" | "sourceScenarioId">;

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

/** 題目完成後由資料帶入的共用回饋內容。 */
export type ScenarioCompletionFeedback = {
  title: string;
  encouragement: string;
  knowledgeTitle: string;
  knowledgeContent: Array<{
    type: "paragraph" | "item";
    text: string;
  }>;
  reminder?: string;
};

export type Scenario = {
  id: string;
  stage: string;
  /** 顯示於共用情境頁的階段小標；未設定時沿用 stage。 */
  stageTitle?: string;
  /** 共用旅程側欄的明確分段識別，避免以題目索引推斷歸屬。 */
  stageId?: string;
  timeLabel: string;
  title: string;
  description: string;
  /** 題目資料指定時，供共用選項元件顯示的提問文字。 */
  questionText?: string;
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
  learningPoints?: string[];
  knowledgeTitle?: string;
  completionFeedback?: ScenarioCompletionFeedback;
  /** 題庫資料識別欄位：供旅程、摘要與除錯使用，UI 不以畫面位置推斷。 */
  speciesId?: string;
  breedId?: string;
  order?: number;
  /** 規劃文件中的原始題號；品種題目不可依陣列位置推斷。 */
  sourceQuestionNumber?: number;
  summaryCategory?: string;
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
  discussionFlags?: string[];
};

export type LifeJourneyPhase =
  | "arrival-video"
  | "life-journey"
  | "complete";

export type JourneyItemType =
  | "scenario"
  | "walking"
  | "daily-inspection"
  | "arrival-meal"
  // 兔子專屬活動仍沿用共用旅程的完成、回顧與下載資料格式。
  | "rabbit-carry-sort"
  | "rabbit-daily-check"
  | "bird-cage-inspection"
  | "bird-challenge"
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
  stageId?: string;
  stageLabel?: string;
  /** 完成此 journey item 的既有正確回饋後才登錄的共用費用。 */
  expenseIds?: string[];
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
  catInspectionSteps: string[];
  sickTimePassComplete: boolean;
  bodyCareParts: string[];
  seniorAdjustments: string[];
  rabbitCarryOrder: string[];
  rabbitCarryComplete: boolean;
  rabbitCarryAttempts: number;
  rabbitCarryAnswerRevealed: boolean;
  /** 已看完三次錯誤後的正解；僅用來切換共用回饋頁，不算自行答對。 */
  rabbitCarryFeedbackShown: boolean;
  rabbitDailyCheckSteps: string[];
  birdCageInspectionSteps: string[];
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
  activitySpace: string[];
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
  /** 未提供正式素材時保留為 undefined，由共用準備介面顯示中性預留位置。 */
  image?: string;
  placement: { x: number; y: number; width: number; layer: number };
  mobilePlacement?: { x: number; y: number; width: number };
  required: boolean;
  need: "飲食" | "休息" | "排泄" | "安全" | "活動" | "清潔";
  expenseId?: string;
  /** 同一個實際互動可同時帶入用品與每月耗材等共用費用。 */
  expenseIds?: string[];
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
