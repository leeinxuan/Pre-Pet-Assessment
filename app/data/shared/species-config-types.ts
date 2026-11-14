import type {
  DepartureSceneConfig,
  FeedingConfig,
  HazardItem,
  RoomItem,
  RoomSceneConfig,
  Scenario,
  SpeciesScenarioPresentationConfig,
  TrunkItem,
} from "../../game-types";
import type { CareReviewAdditionalNote } from "./care-review-note-types";
import type { HomeReadinessConfig } from "./home-readiness-types";
import type { MasteredCareTheme } from "./mastered-care-types";
import type { PetAcquisitionConfig } from "./pet-sources";
import type { SpeciesId } from "./types";

export type SpeciesCopy = {
  animalName: string; animalNameFallback: string; typeLabel: string;
  selectionTitle: string; breedTitle: string; nameTitle: string; namePlaceholder: string;
  historyTitle: string; historyBody: string; hasPreviousLabel: string; noPreviousLabel: string; previousSectionTitle: string;
  roomTitle: string; roomBody: (petName: string) => string;
  departureTitle: string; departureBody: (petName: string) => string;
  lifeChallengeLabel: (selectedLabel: string) => string;
};

export type SpeciesReportConfig = {
  checklistGroups: Array<{ title: string; items: string[] }>;
  handlingRows: Array<[string, string]>;
  dailyCareTime: string; dailyCareTimeNote: string;
  dailyCareBreakdown: Array<{ title: string; detail: string }>;
};

export type InteractionCompletionContent = {
  title: string; subtitle: string; description: string; reflectionTitle: string; reflectionContent: string[];
  careTimeTitle: string; careTimeItems: Array<{ title: string; detail: string }>;
  careTimeSupplement?: { title: string; items: Array<{ title: string; detail: string; description: string }> };
  continueLabel: string;
};

export type RoomFlowConfig = {
  initialBackground?: string; safeBackground?: string;
  /** 若手機房間背景另有素材，僅在手機背景層使用，避免載入桌機比例圖片。 */
  initialMobileBackground?: string; safeMobileBackground?: string;
  /** 僅有籠具／圍欄內部視角的物種需要提供以下欄位。 */
  interiorBackground?: string; interiorSafeBackground?: string;
  /** 籠具／圍欄內部若有獨立手機比例素材，僅在手機背景層使用。 */
  interiorMobileBackground?: string; interiorSafeMobileBackground?: string;
  /** 需要先放置入口用品、再進入內部佈置的物種，可在素材尚未就緒時保留流程。 */
  hasInteriorView?: boolean;
  /** Data-driven cumulative interior backgrounds, evaluated in declaration order. */
  interiorBackgroundStates?: Array<{ whenItemIds: readonly string[]; background: string }>;
  /** Mobile equivalent of cumulative interior backgrounds, evaluated in declaration order. */
  interiorMobileBackgroundStates?: Array<{ whenItemIds: readonly string[]; background: string }>;
  /** Items which alter the composited background but do not have a separate scene sprite. */
  hiddenPlacedItemIds?: readonly string[];
  /** Interior supplies remain unavailable until this required item is placed. */
  interiorUnlockItemId?: string;
  /** Mobile interior supplies unlock in this order; defaults to interiorUnlockItemId. */
  mobileInteriorPrerequisiteItemIds?: readonly string[];
  /** Required supplies placed in the interior view; drives the shared entry prompt completion state. */
  interiorRequiredItemIds?: readonly string[];
  interiorBackgroundAspectRatio?: "match-room" | string; interiorBackgroundMobileFit?: "cover"; floorHazardId: string; safeWhenAllHazards?: boolean;
  fenceItemId?: string; interiorItemId?: string; outsideItemIds?: readonly string[]; entryRequiredItemIds?: readonly string[];
  /** 手機版「點擊佈置」提示膠囊中心，使用場景百分比座標。 */
  mobileEntryHintPlacement?: { x: number; y: number };
  floorHotspot: { desktop: { x: number; y: number; width: number; height: number }; mobile: { x: number; y: number; width: number; height: number } };
  copy: { fenceInstruction?: string; fencePlacedInstruction?: string; entryReadyInstruction?: string; interiorInstruction?: string; completeInstruction?: string; hazardInstruction?: string; lockedInstruction?: string;
    /** 內部用品因 interiorUnlockItemId 尚未放置而鎖定時的提示；未提供時沿用 lockedInstruction。 */
    interiorLockedInstruction?: string; entryLabel?: string };
};

export type SpeciesSelectionConfig = {
  skipBreedPage: boolean;
  category: { active: boolean };
  breeds: readonly {
    id: string;
    species: SpeciesId;
    label: string;
    icon: string;
    image?: string;
    size: string;
    shortDescription: string;
  }[];
};

export type SpeciesPreparationConfig = {
  roomItems: readonly RoomItem[];
  hazards: readonly HazardItem[];
  trunkItems: readonly TrunkItem[];
  roomFlow?: RoomFlowConfig;
  roomScene: RoomSceneConfig;
  departureScene: DepartureSceneConfig;
};

/**
 * 每個正式物種資料夾都必須提供的共同契約。
 *
 * `journey`、`assets` 與專屬活動仍保留各物種精確的推論型別；這份契約只負責
 * 確認共用元件所依賴的入口完整存在，避免新增物種時漏掉設定或拼錯欄位。
 */
export type SpeciesConfigContract = {
  id: SpeciesId;
  /** 手機日常互動是否移除共用卡片外框並延伸為滿版；由物種資料決定，避免共用 CSS 辨識物種名稱。 */
  mobileActivityLayout: "standard" | "full-bleed";
  selection: SpeciesSelectionConfig;
  preparation: SpeciesPreparationConfig;
  journey: unknown;
  scenarios: readonly Scenario[];
  getLifeScenarios: (...args: never[]) => readonly Scenario[];
  getReportScenarios: (...args: never[]) => readonly Scenario[];
  scenarioPresentation: SpeciesScenarioPresentationConfig;
  breedChallenges?: unknown;
  report: SpeciesReportConfig;
  assets: unknown;
  feeding: FeedingConfig;
  copy: SpeciesCopy;
  homeReadiness: HomeReadinessConfig;
  masteredCareThemes: readonly MasteredCareTheme[];
  careReviewAdditionalNotes: readonly CareReviewAdditionalNote[];
  acquisition: PetAcquisitionConfig;
};

export type SpeciesGameConfig = {
  id: "dog" | "cat" | "rabbit" | "bird" | "hamster" | "gecko";
  copy: SpeciesCopy; roomItems: RoomItem[]; hazards: HazardItem[]; trunkItems: TrunkItem[]; report: SpeciesReportConfig; roomFlow?: RoomFlowConfig;
};
