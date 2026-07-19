export type ExpenseCategory =
  | "用品"
  | "飲食"
  | "醫療"
  | "清潔"
  | "交通"
  | "照顧服務"
  | "其他";

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

export type CareAssignment = {
  primary: string;
  backup: string;
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
  choices: ScenarioChoice[];
  reminder?: string;
  artIndex: number;
  supportChoice?: boolean;
};

export type ScenarioAnswer = {
  scenarioId: string;
  firstChoiceId: string;
  finalChoiceId: string;
  firstResult: ScenarioResult;
  attempts: number;
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
  required: boolean;
  need: "飲食" | "休息" | "排泄" | "安全" | "活動" | "清潔";
  expenseId?: string;
};

export type HazardItem = {
  id: string;
  label: string;
  icon: string;
  hint: string;
};

export type TrunkItem = {
  id: string;
  label: string;
  icon: string;
  kind: "essential" | "optional" | "risk";
  feedback: string;
  expenseId?: string;
};
