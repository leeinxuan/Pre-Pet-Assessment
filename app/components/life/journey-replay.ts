import type { LifeActivityState, ScenarioAnswer } from "../../game-types";

/**
 * 旅程題目「再玩一次」的共用狀態。
 *
 * - 只由導覽事件（側邊欄、繼續下一題）與「再玩一次」按鈕更新，
 *   不從元件掛載或畫面重新整理推導，避免第一次完成時就出現按鈕。
 * - 重新作答只是練習：開始前快照該題答案與活動欄位，離開時還原，
 *   因此完成紀錄、報告與費用都維持第一次完成時的結果。
 */
export type JourneyReplaySession = {
  itemId: string;
  /** 開始重新作答前的答案；undefined 代表原本沒有該筆答案。 */
  answers: Record<string, ScenarioAnswer | undefined>;
  /** 開始重新作答前、會被重設的活動欄位原值。 */
  activity: Partial<LifeActivityState>;
};

export type JourneyReplayState = {
  /** 進入時已完成的旅程節點：玩家完成後離開，再回到此題。 */
  revisitedItemId: string | null;
  /** 目前正在重新作答的節點與快照。 */
  session: JourneyReplaySession | null;
};

export type JourneyReplayRequest = {
  itemId: string;
  scenarioIds: readonly string[];
  activityPatch?: Partial<LifeActivityState>;
};

export const initialJourneyReplayState: JourneyReplayState = { revisitedItemId: null, session: null };

/** 進入某個旅程節點；只有進入前已完成的節點才算回訪。 */
export function enterJourneyItem(itemId: string | null | undefined, completedIds: readonly string[]): JourneyReplayState {
  return {
    revisitedItemId: itemId && completedIds.includes(itemId) ? itemId : null,
    session: null,
  };
}

export function isRevisitingJourneyItem(state: JourneyReplayState, itemId: string) {
  return state.revisitedItemId === itemId;
}

export function isReplayingJourneyItem(state: JourneyReplayState, itemId: string) {
  return state.session?.itemId === itemId;
}

/**
 * 回訪已完成題目、且該題尚未重新作答時，才顯示「再玩一次」。
 * 多小題活動以 scenarioId 逐題判斷；沒有題目 ID 的活動以整個節點判斷。
 */
export function canReplayJourneyItem(state: JourneyReplayState, itemId: string, scenarioId?: string) {
  if (!isRevisitingJourneyItem(state, itemId)) return false;
  if (!isReplayingJourneyItem(state, itemId)) return true;
  return scenarioId !== undefined && !Object.hasOwn(state.session?.answers ?? {}, scenarioId);
}

export function startJourneyReplay(
  state: JourneyReplayState,
  request: JourneyReplayRequest,
  answers: Record<string, ScenarioAnswer>,
  activity: LifeActivityState,
): JourneyReplayState {
  // 同一節點內再重玩另一小題時沿用既有快照，只補上尚未快照的題目與欄位，確保還原的是第一次完成時的資料。
  const previous = state.session?.itemId === request.itemId ? state.session : null;
  const answerSnapshot = { ...Object.fromEntries(request.scenarioIds.map((id) => [id, answers[id]])), ...previous?.answers };
  const activitySnapshot = {
    ...Object.fromEntries(Object.keys(request.activityPatch ?? {}).map((key) => [key, activity[key as keyof LifeActivityState]])),
    ...previous?.activity,
  } as Partial<LifeActivityState>;
  return { ...state, session: { itemId: request.itemId, answers: answerSnapshot, activity: activitySnapshot } };
}

/** 清除目前題目的答案，讓題目回到尚未作答的選項畫面。 */
export function clearReplayAnswers(answers: Record<string, ScenarioAnswer>, scenarioIds: readonly string[]) {
  const next = { ...answers };
  scenarioIds.forEach((id) => { delete next[id]; });
  return next;
}

/** 還原重新作答前的答案快照。 */
export function restoreReplayAnswers(answers: Record<string, ScenarioAnswer>, session: JourneyReplaySession) {
  const next = { ...answers };
  Object.entries(session.answers).forEach(([id, answer]) => {
    if (answer) next[id] = answer;
    else delete next[id];
  });
  return next;
}
