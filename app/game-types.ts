export type ExpenseCategory = string;

export type ExpenseRecord = {
  id: string;
  name: string;
  amount: number;
  /** 費用明細中，估算起價後是否顯示「+」。 */
  showPlusSuffix?: boolean;
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
  descriptionBySpecies?: Partial<Record<"dog" | "cat" | "rabbit" | "bird" | "hamster" | "gecko", string>>;
  /** 由 journey 觸發時保留來源，供共用明細、摘要與匯出追溯。 */
  speciesId?: string;
  stageId?: string;
  sourceScenarioId?: string;
};

export type ExpenseTriggerMeta = Pick<ExpenseRecord, "speciesId" | "stageId" | "sourceScenarioId">;

/** 活動同時加入多筆費用時，合併成一張費用卡的呈現方式。 */
export type CombinedExpenseCardRule = {
  /** 本次新增的費用全部屬於這組 ID 時套用。 */
  expenseIds: readonly string[];
  name: string;
  category: ExpenseCategory;
  recurring: boolean;
};

/** 各物種費用的流程規則；共用流程依目前物種讀取，不在元件內寫死費用 ID。 */
export type SpeciesExpenseRules = {
  /** 到家題答對時不在作答當下登錄，改由「做得很好」頁出現後才登錄的費用。 */
  deferredArrivalFeedbackExpenseIds?: readonly string[];
  /** 已由其他互動登錄、第一餐不可重複觸發的每月費用。 */
  arrivalMealExcludedExpenseIds?: readonly string[];
  /** 散步準備（撿便袋）時登錄的費用。 */
  walkingExpenseIds?: readonly string[];
  combinedExpenseCards?: readonly CombinedExpenseCardRule[];
};

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
  /** Text shown in the shared inventory explanation card after this supply is correctly prepared. */
  description: string;
};

export type ArrivalMealSceneAssets = {
  desktopBackground: string;
  mobileBackground: string;
  /** 手機版場景背景的裁切設定；省略時沿用共用樣式。 */
  mobileBackgroundStyle?: { objectFit?: "contain" | "cover"; objectPosition?: string; transform?: string; transformOrigin?: string };
  pet: { waiting: string; ready: string };
  water: { empty: string; ready: string };
  /**
   * `empty` can be omitted for food that should not appear in the scene until
   * the player has selected it (for example live feeder insects).
   */
  food: {
    empty?: string;
    ready: string;
    alt?: string;
    /** A data-provided visual variant when another required supply is ready. */
    readyOverrides?: Array<{ when: ArrivalMealSupply["stateKey"]; image: string; alt?: string }>;
  };
  /** The third supply slot is deliberately generic; individual species name it in `supplies`. */
  veggie?: { empty?: string; ready: string; alt: string };
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

/** 房間場景中的名字名牌位置；各物種資料直接隨 roomScene 維護。 */
export type RoomDoorplatePlacement = {
  desktop: { x: number; y: number; width: number };
  desktopText: { left: number; top: number; width: number; height: number; fontSize: number };
  mobile: { x: number; y: number; width: number };
  mobileText: { left: number; top: number; width: number; height: number; fontSize: number };
};

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
  /** 僅手機版外部房間背景的裁切方式；不會套用到籠子／缸體內部場景。 */
  mobileExteriorBackgroundStyle?: { objectFit?: "contain" | "cover"; objectPosition?: string };
  backgroundStyle?: { objectFit?: "contain" | "cover"; objectPosition?: string };
  doorplate?: { image: string; alt: string; placement: RoomDoorplatePlacement };
};

/** 出發前準備畫面中與物種素材相關的設定。 */
export type DepartureSceneConfig = {
  trunkBackground?: string;
  trunkBackgroundAlt: string;
  documentFolderImage?: string;
  documentFolderAlt?: string;
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
  /** 正確作答時直接登錄、但不顯示費用卡動畫的預留費用。 */
  silentExpenseIds?: string[];
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
    /** 知識卡條目可選的輔助圖，素材路徑由物種資料集中管理。 */
    image?: string;
    imageAlt?: string;
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
  /** 答案需要再確認時顯示的提示；由各物種情境提供。 */
  reviewHint: string;
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
  /** 選項區上方的問題文字；每一題均由物種資料明確提供。 */
  questionText: string;
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
  /** Optional class for a scenario's question layout, supplied by species presentation data. */
  questionClassName?: string;
  sceneVideo?: { src: string; ariaLabel: string };
  correctFeedbackMedia: ScenarioMediaConfig;
  /** 題目正確回饋依序輪播的媒體；未設定時沿用單一 correctFeedbackMedia。 */
  correctFeedbackMediaVariants?: readonly ScenarioMediaConfig[];
  completionIntro?: string;
};

export type SpeciesScenarioPresentationConfig = {
  defaults: Pick<ScenarioPresentationConfig, "defaultPetName" | "knowledgeTitle" | "preserveGenericAnimalTerms" | "correctFeedbackMedia" | "correctFeedbackMediaVariants">;
  scenarios: Record<string, Partial<ScenarioPresentationConfig>>;
};

/** Optional journey transition videos supplied by a species data module. */
export type JourneyTransitionMedia = {
  arrival?: string;
  timePass?: string;
  busyCare?: string;
  /** 手機直式（9:16）版本；未提供時退回橫式影片。 */
  arrivalMobile?: string;
  timePassMobile?: string;
  busyCareMobile?: string;
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
  | "gecko-health-inspection"
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
  | "bird-cage-inspection" | "hamster-inspection" | "gecko-health-inspection" | "breed-challenge" | "busy-care";

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

/** 重玩重設策略的鍵；每個鍵都必須在 activity-registry.ts 宣告對應策略。 */
export type JourneyActivityResetKey =
  | "walking" | "daily-behavior" | "breed-challenge" | "busy-care" | "cat-inspection"
  | "rabbit-carry-sort" | "rabbit-daily-check" | "bird-cage-inspection"
  | "hamster-first-meal" | "hamster-inspection" | "gecko-first-meal" | "gecko-health-inspection";

export type JourneyActivityConfig = {
  itemId: string;
  scenarioId?: string;
  activityKey: JourneyActivityKey;
  /** 保留既有流程視覺節點；實際轉場元件在共用路由處理。 */
  transition?: "arrival-meal" | "time-pass" | "busy-care";
  /** 答對後原本由 journey item 費用在回饋確認時寫入。 */
  deferItemExpenses?: boolean;
  /** 是否在正確回饋顯示時播放 expense 動畫，而非作答當下。 */
  triggerExpenseOnFeedback?: boolean;
  /** 重玩時使用的活動 state 重設策略（見 activity-registry.ts）。 */
  resetKey?: JourneyActivityResetKey;
};

export type GeckoHealthDisplayState = "normal" | "warning" | "shedding" | "stuck-shed";
export type GeckoTemperatureState = "too-cold" | "too-hot" | "in-range";

export type GeckoHealthInspectionChoice = {
  id: string;
  text: string;
  correctStates: readonly GeckoHealthDisplayState[];
};

export type GeckoHealthInspectionState = {
  image: string;
  imageAlt: string;
  detail: string;
  correctFeedback: string;
  incorrectFeedback: string;
};

export type GeckoHealthJudgement = {
  id: string;
  label: string;
  instruction: string;
  prompt: string;
  choices: readonly GeckoHealthInspectionChoice[];
  states: Partial<Record<GeckoHealthDisplayState, GeckoHealthInspectionState>>;
  comparison?: {
    title: string;
    image: string;
    imageAlt: string;
    description: string;
    actionLabel: string;
  };
};

type GeckoScenePlacement = { x: number; y: number; width: number; layer: number };
type GeckoMobileScenePlacement = { x: number; y: number; width: number };

export type GeckoFecesInspection = GeckoHealthJudgement & {
  scenePlacement: GeckoScenePlacement;
  /** Mobile-only placement for the interactive feces artwork. */
  mobileScenePlacement?: GeckoMobileScenePlacement;
};

export type GeckoBodyInspectionPoint = GeckoHealthJudgement & {
  hotspot: { x: number; y: number };
  /** Position in the square mobile inspection scene; desktop uses hotspot. */
  mobileHotspot?: { x: number; y: number };
};

export type GeckoHealthInspectionConfig = {
  intro: ActivityIntroConfig;
  title: string;
  description: string;
  progress: readonly { id: "temperature" | "water" | "feces" | "body"; label: string }[];
  scene: {
    background: string;
    /** Optional mobile-only scene artwork; desktop continues to use background. */
    backgroundMobile?: string;
    body: string;
    bodyAlt: string;
    magnifier: string;
    /** Finished terrarium composition owned by the Gecko care activity. */
    completedItems: readonly {
      id: string;
      image: string;
      alt: string;
      placement: { x: number; y: number; width: number; layer: number; transform?: string };
      mobilePlacement?: { x: number; y: number; width: number; transform?: string };
      sceneVisual?: {
        mixBlendMode?: "normal" | "screen" | "soft-light";
        opacity?: number;
        pointerEvents?: "none";
      };
      className?: string;
    }[];
  };
  temperature: {
    instruction: string;
    warmLabel: string;
    coolLabel: string;
    controllerLabel: string;
    warmThermometer: string;
    coolThermometer: string;
    controllerImage: string;
    warmPlacement: { x: number; y: number; width: number };
    coolPlacement: { x: number; y: number; width: number };
    /** Mobile-only positions and sizes for the two interactive thermometers. */
    warmMobilePlacement?: { x: number; y: number; width: number };
    coolMobilePlacement?: { x: number; y: number; width: number };
    /** Offsets for each thermometer illustration within its current anchor. */
    warmImagePlacement: { top: string; left: string };
    coolImagePlacement: { top: string; left: string };
    /** Independent temperature-number positions within each thermometer. */
    warmReadingPlacement: { top: string; right: string };
    coolReadingPlacement: { top: string; right: string };
    /** Mobile-only x/y anchors for readings over each thermometer image. */
    warmMobileReadingPlacement?: { x: string; y: string };
    coolMobileReadingPlacement?: { x: string; y: string };
    /** Independent visual offsets for the warm/cool label capsules. */
    warmLabelPlacement: { top: string; left: string };
    coolLabelPlacement: { top: string; left: string };
    /** Mobile-only offsets for each label capsule, relative to its thermometer. */
    warmMobileLabelPlacement?: { x: string; y: string };
    coolMobileLabelPlacement?: { x: string; y: string };
    /** Internal validation bounds for each thermometer's actual position. */
    correctTemperatures: {
      warm: { min: number; max: number };
      cool: { min: number; max: number };
    };
    presets: Record<GeckoTemperatureState, readonly { warm: number; cool: number }[]>;
    adjustment: { warm: number; cool: number };
    confirmLabel: string;
    successFeedback: Record<GeckoTemperatureState, string>;
    fixedWarning: string;
    continueLabel: string;
  };
  water: {
    instruction: string;
    dirtyImage: string;
    dirtyImageAlt: string;
    cleanImage: string;
    cleanImageAlt: string;
    detail: string;
    successFeedback: string;
    fixedWarning: string;
    continueLabel: string;
    sceneItemId: string;
    /** Independent position for the clickable dirty/clean water dish. */
    interactivePlacement: GeckoScenePlacement;
    /** Mobile-only position and size for the interactive dirty/clean dish. */
    mobileInteractivePlacement?: GeckoMobileScenePlacement;
  };
  feces: GeckoFecesInspection;
  body: {
    /** Whether body inspection points unlock one at a time. */
    requiresOrderedInspection: boolean;
    /** Whether visible sequence numbers are meaningful for the inspection. */
    showPointNumbers: boolean;
    instruction: string;
    points: readonly GeckoBodyInspectionPoint[];
  };
  completion: {
    title: string;
    subtitle: string;
    description: string;
    reflectionTitle: string;
    reflection: string;
    careTitle: string;
    continueLabel: string;
  };
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
  /** 同一局的足底、進食與指甲觀察結果固定保留，重開卡片不會重新隨機。 */
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
  /** 籠外互動完成後，需由玩家主動點擊「完成巡視」才會切換至完成頁。 */
  birdCageInspectionCompleted: boolean;
  arrivalMealSelectedChoiceIds: string[];
  arrivalMealFeedbackChoiceId: string;
  hamsterInspectionStarted: boolean;
  /** 倉鼠清潔活動的隨機髒污角落與各操作累積進度；重 render 時不可重抽或歸零。 */
  hamsterInspectionStates: Record<string, string | number>;
  hamsterInspectionCompleted: string[];
  hamsterInspectionFeedback: Record<string, "question" | "incorrect" | "correct">;
  geckoHealthInspectionStarted: boolean;
  /** 同一局的隨機觀察狀態、溫度讀值與知識卡進度；重新 render 或答錯時不得重抽。 */
  geckoHealthInspectionStates: Record<string, string | number | boolean>;
  geckoHealthInspectionCompleted: string[];
  geckoHealthInspectionFeedback: Record<string, "question" | "incorrect" | "correct">;
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
    placement: { x: number; y: number; width: number; layer: number; transform?: string };
    mobilePlacement?: { x: number; y: number; width: number; transform?: string };
  }>;
  /**
   * 場景位置由物種資料提供；transform 讓單一素材可獨立微調而不必改共用元件。
   */
  placement: { x: number; y: number; width: number; layer: number; transform?: string };
  mobilePlacement?: { x: number; y: number; width: number; transform?: string };
  /** 場景素材的非幾何呈現設定，例如黑底燈光的混合模式。 */
  sceneVisual?: {
    mixBlendMode?: "normal" | "screen" | "soft-light";
    opacity?: number;
    pointerEvents?: "none";
  };
  /** 可由物種資料指定的場景視覺 class，例如燈光覆蓋層。 */
  sceneClassName?: string;
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
  /** 手機版獨立點擊區（1:1 場景百分比）；未設定時由 mobilePlacement 推算。 */
  mobileHitArea?: { x: number; y: number; width: number; height: number };
  /** 手機物品欄裁切未整理場景的區域；可排除只作熱區標記的獨立素材。 */
  mobileThumbnailCrop?: { x: number; y: number; size: number; includeSprite?: boolean };
  /**
   * A background-only hazard can expose a labelled hit target without adding a
   * separate sprite. Geometry remains in the species data.
   */
  hotspot?: {
    desktop: { x: number; y: number; width: number; height: number };
    mobile: { x: number; y: number; width: number; height: number };
  };
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
  /** 已在前一個準備階段計入、此處僅重複使用的穩定費用 id；畫面顯示「已於房間準備計入」。 */
  reusedExpenseIds?: string[];
  /** 不需另外花費、也不是沿用房間費用時，在價格位置顯示的說明（例如「可使用紙捲」）。 */
  priceNote?: string;
  placement: { x: number; y: number; width: number; layer: number };
};
