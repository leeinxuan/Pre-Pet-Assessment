export type ExpenseCategory = string;

export type ExpenseRecord = {
  id: string;
  name: string;
  amount: number;
  /** 臨時性預留支出的最高參考金額；未填時代表單一金額。 */
  maxAmount?: number;
  /** 最高金額為開放式上限（例如 50,000+）時使用。 */
  maxAmountOpenEnded?: boolean;
  category: ExpenseCategory;
  stage: string;
  recurring: boolean;
  fromEmergency?: boolean;
  /** 供共用費用明細、摘要與匯出使用的簡短用途說明。 */
  description?: string;
  /** 共用 expense id 在不同物種有不同官方說明時，由寫入 store 前解析。 */
  descriptionBySpecies?: Partial<Record<"dog" | "cat" | "rabbit" | "bird" | "hamster", string>>;
  /** 由 journey 觸發時保留來源，供共用明細、摘要與匯出追溯。 */
  speciesId?: string;
  stageId?: string;
  sourceScenarioId?: string;
};

export type ExpenseTriggerMeta = Pick<ExpenseRecord, "speciesId" | "stageId" | "sourceScenarioId">;

/** 第一餐物品欄圖片的桌機／手機尺寸；內容由各物種 feeding.ts 提供。 */
export type ArrivalMealSupplyImageSize = { width: number; height: number };
export type ArrivalMealSupplyImageKey = "default" | "food" | "water" | "veggie" | "unsafe";
export type ArrivalMealSupplyImageSizes = {
  desktop: Record<ArrivalMealSupplyImageKey, ArrivalMealSupplyImageSize>;
  mobile: Record<ArrivalMealSupplyImageKey, ArrivalMealSupplyImageSize>;
};

/** 第一餐場景內素材的位置與大小；內容由各物種 feeding.ts 提供。 */
export type ArrivalMealSceneItemKey = "pet" | "water" | "food" | "veggie";
export type ArrivalMealScenePlacement = { left: number; bottom: number; width: number; maxHeight?: number };
export type ArrivalMealSceneLayout = {
  desktop: Record<ArrivalMealSceneItemKey, ArrivalMealScenePlacement>;
  mobile: Record<ArrivalMealSceneItemKey, ArrivalMealScenePlacement>;
};

/** 第一餐的資料契約。共用元件只依此設定呈現各物種差異。 */
export type ArrivalMealUnsafeFood = {
  id: string;
  label: string;
  image: string;
  title: string;
  text: string;
  /** caution 使用警示三角形；warning 使用禁止符號。 */
  presentation?: "caution" | "warning";
};

export type ArrivalMealSupply = {
  stateKey: "food" | "water" | "veggie";
  label: string;
  image: string;
  alt: string;
};

export type ArrivalMealSceneAssets = {
  desktopBackground: string;
  mobileBackground: string;
  pet: { waiting: string; ready: string };
  water: { empty: string; ready: string };
  food: { empty: string; ready: string };
  veggie?: { ready: string; alt: string };
};

export type ArrivalMealChoice = {
  id: string;
  label: string;
  result: "correct" | "caution" | "incorrect";
  feedback: string;
  expenseIds?: readonly string[];
};

export type FeedingConfig = {
  animalName: string;
  completionMessage: string;
  recurringExpenseIds: readonly string[];
  arrivalMealSceneLayout: ArrivalMealSceneLayout;
  arrivalMealSupplyImageSizes: ArrivalMealSupplyImageSizes;
} & ({
  interaction: "scene";
  requiredSupplies: readonly ArrivalMealSupply["stateKey"][];
  supplies: readonly ArrivalMealSupply[];
  unsafeFoods: readonly ArrivalMealUnsafeFood[];
  scene: ArrivalMealSceneAssets;
  /** 貓咪保留完成 700ms 後才切換開心素材的既有動畫節奏。 */
  readyPetDelayMs?: number;
} | {
  interaction: "choice";
  title: string;
  intro: string;
  choices: readonly ArrivalMealChoice[];
  emptyBowlText: string;
});

/** 房間佈置畫面中與物種素材相關的設定；流程規則仍由 roomFlow 負責。 */
export type RoomSceneConfig = {
  background?: string;
  mobileBackground?: string;
  safeBackground?: string;
  safeBackgroundWhenItemId?: string;
  hidePlacedItemId?: string;
  backgroundAlt: string;
  interiorBackgroundAlt?: string;
  desktopBackgroundClass?: string;
  mobileBackgroundClass?: string;
  backgroundStyle?: { objectFit?: "contain" | "cover"; objectPosition?: string };
  doorplate?: { image: string; alt: string };
};

/** 出發前準備畫面中與物種素材相關的設定。 */
export type DepartureSceneConfig = {
  trunkBackground: string;
  trunkBackgroundAlt: string;
  documentFolderImage: string;
  documentFolderAlt: string;
  hidePriceForReusedItemIds?: readonly string[];
};

export type CareMember = {
  id: string;
  name: string;
  age: number | null;
  isPlayer: boolean;
};

export type ScenarioResult = "correct" | "partial" | "incorrect";

export type ScenarioMediaConfig =
  | { type: "video"; src: string; ariaLabel: string }
  | { type: "placeholder" };

export type ScenarioChoice = {
  id: string;
  text: string;
  result: ScenarioResult;
  /** 忙碌備援題中，選到此選項後進入共用交接確認流程。 */
  isSupportChoice?: boolean;
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

/** 題目完成頁下方的補充提醒；內容與圖片預留說明均由題目資料提供。 */
export type ScenarioCompletionReminder = {
  title: string;
  items: Array<{
    title: string;
    description: string;
    imagePlaceholderLabel: string;
    image?: string;
    imageAlt?: string;
  }>;
  footer: string;
};

/**
 * 忙碌日常四項交接確認完成後的共用回饋內容。
 * 文案與每日照護時間均由物種情境資料提供，避免共用元件混入特定物種內容。
 */
export type BusyCareCompletionContent = {
  title?: string;
  encouragement?: string;
  reflectionText: string;
  reflectionTitle: string;
  reflectionContent: string[];
  knowledgeTitle?: string;
  knowledgeContent?: string[];
  /** 特定完成頁只需反思與建議時，隱藏共用小知識卡。 */
  showKnowledgeCard?: boolean;
  careTimeTitle?: string;
  careTimeItems?: Array<{ title: string; detail: string }>;
  /** 某些完成頁只需要反思與知識；不影響報告中的每日照護時間資料。 */
  showCareTime?: boolean;
  additionalAdvice?: string[];
};

/** 忙碌備援計劃的交接確認題；文字與順序由各物種情境資料提供。 */
export type BusyCareChecklistQuestion = {
  id: string;
  prompt: string;
  correctAnswer: "yes" | "no";
  reviewHint?: string;
};

export type BusyCareImageScene = {
  type: "image-layers";
  backgroundSrc: string;
  backgroundAlt: string;
  characterSrc: string;
  characterAlt: string;
};

export type BusyCarePresentationConfig = {
  animalName: string;
  sceneMedia:
    | { type: "placeholder" }
    | BusyCareImageScene
    | { type: "video"; src: string; ariaLabel: string; fallback: BusyCareImageScene };
  feedbackMedia: { type: "video"; src: string } | { type: "placeholder" };
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
  /** 共用情境頁的題目區標題。 */
  questionTitle?: string;
  /** 題目場景媒體；沒有正式影片時明確使用 placeholder。 */
  sceneMedia?: ScenarioMediaConfig;
  /** 答對後的媒體；沒有物種專屬影片時明確使用 placeholder。 */
  correctFeedbackMedia?: ScenarioMediaConfig;
  /** 答錯時是否必須重試，不能直接繼續。 */
  requiresRetry?: boolean;
  /** 回饋頁繼續按鈕文字。 */
  continueLabel?: string;
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
  /** 特定情境答對後顯示於共用做得很好頁的綠色提醒。 */
  completionNotice?: string;
  completionFeedback?: ScenarioCompletionFeedback;
  /** 題目資料指定時，顯示於主要完成回饋框下方的補充提醒。 */
  completionReminder?: ScenarioCompletionReminder;
  /** 互動題完成後仍留在原頁時顯示的完成標題。 */
  activityCompletionTitle?: string;
  /** 互動題自動揭示正解時，顯示於完成標題上方的低層級提示。 */
  activityRevealNotice?: string;
  /** 忙碌日常完成頁的專屬內容；版型仍由共用 BusyCareActivity 呈現。 */
  busyCareCompletion?: BusyCareCompletionContent;
  /** 忙碌備援計劃的四項確認題；不可依物種名稱在 UI 推斷文案。 */
  busyCareChecklist?: BusyCareChecklistQuestion[];
  /** 忙碌照護共用版型所需的物種名稱、場景與完成回饋媒體。 */
  busyCarePresentation?: BusyCarePresentationConfig;
  /** 題庫資料識別欄位：供旅程、摘要與除錯使用，UI 不以畫面位置推斷。 */
  speciesId?: string;
  breedId?: string;
  order?: number;
  /** 規劃文件中的原始題號；品種題目不可依陣列位置推斷。 */
  sourceQuestionNumber?: number;
  summaryCategory?: string;
};

/** 共用情境版型所需的媒體與顯示文字；實際選擇由各物種 journey 資料提供。 */
export type ScenarioPresentationConfig = {
  defaultPetName: string;
  knowledgeTitle: string;
  preserveGenericAnimalTerms?: boolean;
  sceneVideo?: { src: string; ariaLabel: string };
  correctFeedbackMedia: { type: "video"; src: string } | { type: "placeholder" };
  completionIntro?: string;
};

export type SpeciesScenarioPresentationConfig = {
  defaults: Pick<ScenarioPresentationConfig, "defaultPetName" | "knowledgeTitle" | "preserveGenericAnimalTerms" | "correctFeedbackMedia">;
  scenarios: Record<string, Partial<ScenarioPresentationConfig>>;
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
  | "guided-inspection"
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

/** 生活旅程活動的註冊資料；共用路由以 activityKey 決定既有元件，不以物種或 ID 推斷。 */
export type JourneyActivityKey =
  | "scenario" | "video-scenario" | "arrival-meal" | "daily-behavior" | "daily-behavior-single"
  | "walking" | "cat-inspection" | "rabbit-carry-sort" | "rabbit-daily-check"
  | "bird-cage-inspection" | "hamster-inspection" | "breed-challenge" | "busy-care";

/** 核心互動開始前的純說明頁資料；各物種只提供需要的內容與既有素材。 */
export type ActivityIntroConfig = {
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  startLabel: string;
  visualAssets?: {
    character?: string;
    tool?: string;
    collector?: string;
  };
};

export type JourneyActivityConfig = {
  itemId: string;
  scenarioId?: string;
  activityKey: JourneyActivityKey;
  /** 保留既有流程視覺節點；實際轉場元件在共用路由處理。 */
  transition?: "arrival-meal" | "time-pass" | "busy-care";
  /** 答對後原本由 journey item 費用在回饋確認時寫入。 */
  deferItemExpenses?: boolean;
  /** 下一步會依此鍵搬移重玩 state 重設策略。 */
  resetKey?: string;
};

export type ReportPracticeItemConfig = {
  id: string;
  label: string;
  completionSelector: "arrival-meal" | "cat-litter";
};

export type LifeActivityState = {
  bodyLanguageSignals: string[];
  arrivalMealFoodReady: boolean;
  arrivalMealWaterReady: boolean;
  arrivalMealVeggieReady: boolean;
  walkingPreparedItems: string[];
  walkingSceneIndex: number;
  walkingMinutes: number;
  walkingPoopCleaned: boolean;
  walkingComplete: boolean;
  catInspectionSteps: string[];
  /** 貓砂盆互動前導說明已閱讀；重玩此活動時回到前導頁。 */
  catInspectionIntroStarted: boolean;
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
  /** 美容活動前導說明已閱讀；重新開始此題時才回到前導頁。 */
  rabbitGroomingIntroStarted: boolean;
  /** 兔子美容互動的固定 state machine，目前狀態不可由素材或陣列位置推斷。 */
  rabbitGroomingState: string;
  /** 同一局的足底、門齒與指甲觀察結果固定保留，重開卡片不會重新隨機。 */
  rabbitGroomingObservations: Record<string, "normal" | "warning">;
  /** 美容判斷題的隨機圖片、答錯次數與回饋狀態，回到同一題時不可重抽。 */
  rabbitGroomingInspection: Record<string, {
    displayState: "normal" | "warning";
    status: "question" | "incorrect" | "correct";
    attempts: number;
  }>;
  birdCageInspectionSteps: string[];
  /** 鸚鵡鳥籠巡視前導說明已閱讀；重玩此活動時回到前導頁。 */
  birdCageInspectionIntroStarted: boolean;
  /** 同一輪鳥籠巡視的四個健康觀察結果；重新開卡或重新 render 時不得重抽。 */
  birdCageInspectionStates: Record<string, "normal" | "warning">;
  hamsterMealSelected: string[];
  hamsterMealFeedbackId: string;
  hamsterInspectionStarted: boolean;
  hamsterInspectionStates: Record<string, "normal" | "warning">;
  hamsterInspectionCompleted: string[];
  hamsterInspectionFeedback: Record<string, "question" | "incorrect" | "correct">;
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
  /** 場景中的已放置素材；未設定時沿用物品欄 image。 */
  sceneImage?: string;
  /** 一項用品在場景中需要由多張素材組成時，各部件的位置仍由物種資料提供。 */
  sceneParts?: Array<{
    id: string;
    image: string;
    placement: { x: number; y: number; width: number; layer: number };
    mobilePlacement?: { x: number; y: number; width: number };
  }>;
  placement: { x: number; y: number; width: number; layer: number };
  mobilePlacement?: { x: number; y: number; width: number };
  required: boolean;
  need: "飲食" | "休息" | "排泄" | "安全" | "活動" | "清潔";
  expenseId?: string;
  /** 同一個實際互動可同時帶入用品與每月耗材等共用費用。 */
  expenseIds?: string[];
  /** 物品完成放置後，顯示於用品卡中的簡短說明。 */
  description: string;
};

export type HazardItem = {
  id: string;
  label: string;
  icon: string;
  image?: string;
  placement: { x: number; y: number; width: number; layer: number };
  mobilePlacement?: { x: number; y: number; width: number };
  danger: string;
  handling: string;
};

export type TrunkItem = {
  id: string;
  label: string;
  kind: "document" | "supply";
  /** 文件在後車廂場景中的視覺用途；共用元件不可依穩定 id 判斷。 */
  visualRole?: "document-folder" | "identity-card";
  image?: string;
  /**
   * 圖片尺寸等共用視覺規則使用的 class key；不可取代互動、狀態或費用的穩定 id。
   */
  visualClassName?: string;
  /** 物品欄圖片的個別縮放倍率；各物種可獨立調整。 */
  visualScale?: number;
  description: string;
  preparedLabel: "已攜帶" | "已準備";
  expenseIds?: string[];
  /** 已在前一個準備階段計入、此處僅重複使用的穩定費用 id。 */
  reusedExpenseIds?: string[];
  placement: { x: number; y: number; width: number; layer: number };
};
