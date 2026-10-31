import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { speciesIds } from "./helpers/game-data-snapshot.mjs";
import { closeAppModuleLoader, loadAppModule } from "./helpers/load-app-module.mjs";

/**
 * 直接呼叫資料與流程函式的行為測試。
 * 重構只要行為不變就不會壞；請勿改回用正規式比對原始碼文字。
 */
let species, journey, registry, expenses, replay;

before(async () => {
  [species, journey, registry, expenses, replay] = await Promise.all([
    loadAppModule("/app/data/species/index.ts"),
    loadAppModule("/app/data/species/journey.ts"),
    loadAppModule("/app/data/species/activity-registry.ts"),
    loadAppModule("/app/data/shared/expenses.ts"),
    loadAppModule("/app/components/life/journey-replay.ts"),
  ]);
});
after(closeAppModuleLoader);

const speciesFlows = {
  dog: {
    requiredMealSupplies: ["food", "water"],
    recurringExpenses: ["dog-food-monthly", "dog-clean-monthly"],
    activities: { arrival: "video-scenario", behavior: "daily-behavior", walking: "walking", "breed-challenge": "breed-challenge", "busy-care": "busy-care", sick: "video-scenario", senior: "video-scenario" },
  },
  cat: {
    requiredMealSupplies: ["food", "water"],
    recurringExpenses: ["cat-food-monthly", "cat-litter-monthly"],
    activities: { "cat-arrival": "video-scenario", "cat-daily-care": "daily-behavior", "cat-daily-inspection": "cat-inspection", "breed-challenge": "breed-challenge", "cat-busy-care": "busy-care", "cat-sick": "video-scenario", "cat-senior": "daily-behavior-single" },
  },
  rabbit: {
    requiredMealSupplies: ["food", "water", "veggie"],
    recurringExpenses: ["rabbit-hay-monthly", "rabbit-pellet-monthly", "rabbit-veggies-monthly"],
    activities: { "rabbit-arrival": "video-scenario", "rabbit-first-meal": "arrival-meal", "rabbit-carry-sort": "rabbit-carry-sort", "rabbit-daily-care": "daily-behavior", "rabbit-daily-check": "rabbit-daily-check", "breed-challenge": "breed-challenge", "rabbit-busy-care": "busy-care", "rabbit-health": "video-scenario", "rabbit-senior": "video-scenario" },
  },
  bird: {
    requiredMealSupplies: ["food", "water", "veggie"],
    recurringExpenses: ["bird-food-monthly", "bird-cleaning-monthly"],
    activities: { "bird-arrival": "video-scenario", "bird-first-meal": "arrival-meal", "bird-daily-care": "daily-behavior", "bird-daily-inspection": "bird-cage-inspection", "bird-challenge": "breed-challenge", "bird-busy-care": "busy-care", "bird-sick": "video-scenario", "bird-senior": "daily-behavior-single" },
  },
  hamster: {
    requiredMealSupplies: ["food", "water"],
    recurringExpenses: ["hamster-pellet-monthly"],
    activities: { "hamster-arrival": "video-scenario", "hamster-first-meal": "arrival-meal", "hamster-daily-care": "daily-behavior", "hamster-solitary": "video-scenario", "hamster-cage-check": "hamster-inspection", "hamster-busy-care": "busy-care", "hamster-health": "video-scenario", "hamster-senior": "video-scenario" },
  },
  gecko: {
    requiredMealSupplies: ["food", "veggie", "water"],
    recurringExpenses: ["gecko-food-monthly"],
    activities: { "gecko-arrival": "video-scenario", "gecko-first-meal": "arrival-meal", "gecko-daily-care": "daily-behavior", "gecko-health-inspection": "gecko-health-inspection", "gecko-busy-care": "busy-care", "gecko-sick": "video-scenario", "gecko-senior": "video-scenario" },
  },
};

/** 走訪資料物件，收集所有指定欄位的值（含巢狀）。 */
function collectFieldValues(value, fields, found = new Set(), seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return found;
  seen.add(value);
  for (const [key, entry] of Object.entries(value)) {
    if (fields.has(key)) {
      for (const id of [entry].flat()) if (typeof id === "string") found.add(id);
    }
    collectFieldValues(entry, fields, found, seen);
  }
  return found;
}

test("every species exposes the canonical config sections", () => {
  for (const id of speciesIds) {
    const config = species.getSpeciesConfig(id);
    assert.equal(config.id, id);
    for (const field of ["copy", "feeding", "journey", "preparation", "report", "homeReadiness", "masteredCareThemes", "careReviewAdditionalNotes", "acquisition"]) {
      assert.ok(config[field], `${id} config must register ${field}`);
    }
  }
});

test("every species report uses the three standard checklist groups", () => {
  const expectedTitles = ["每日照顧", "家中環境", "外出與接回"];
  for (const id of speciesIds) {
    const { checklistGroups } = species.getSpeciesConfig(id).report;
    assert.deepEqual(
      checklistGroups.map((group) => group.title),
      expectedTitles,
      id + " report checklist groups must use the standard order",
    );
    assert.ok(checklistGroups.every((group) => group.items.length > 0), id + " checklist groups must not be empty");
  }
});

test("species lookups fall back to dog only for unregistered species", () => {
  for (const unknown of ["", "unknown", "constructor", "toString", undefined]) {
    assert.equal(species.getSpeciesConfig(unknown).id, "dog", `${String(unknown)} must resolve to dog`);
    assert.deepEqual(expenses.getExpenseRulesForSpecies(unknown), {}, `${String(unknown)} must have no expense rules`);
  }
  for (const id of speciesIds) assert.equal(species.getSpeciesConfig(id).id, id);
});

test("first meal keeps its supplies, unsafe foods and recurring expenses", () => {
  for (const [id, expected] of Object.entries(speciesFlows)) {
    const { feeding } = species.getSpeciesConfig(id);
    assert.equal(feeding.interaction, "scene", `${id} keeps its scene-based first meal`);
    assert.deepEqual([...feeding.requiredSupplies], expected.requiredMealSupplies, `${id} required meal supplies changed`);
    assert.deepEqual([...feeding.recurringExpenseIds], expected.recurringExpenses, `${id} recurring meal expenses changed`);
    assert.ok(feeding.unsafeFoods.length > 0, `${id} keeps unsafe-food feedback`);
  }
});

test("journey items dispatch to their registered activities", () => {
  for (const [id, expected] of Object.entries(speciesFlows)) {
    for (const [itemId, activityKey] of Object.entries(expected.activities)) {
      assert.equal(registry.getJourneyActivityConfig(id, itemId)?.activityKey, activityKey, `${id}/${itemId} must dispatch to ${activityKey}`);
    }
  }
});

test("every journey item has its own registry entry and registered scenarios exist", () => {
  for (const id of speciesIds) {
    const items = journey.getJourneyItemsForSpecies(id);
    const scenarioIds = new Set([
      ...journey.getLifeScenariosForSpecies(id).map((scenario) => scenario.id),
      ...items.map((item) => item.scenarioId).filter(Boolean),
    ]);
    assert.ok(items.length > 0, `${id} journey must have items`);
    for (const item of items) {
      const config = registry.journeyActivityRegistry[id][item.id];
      assert.ok(config, `${id} journey item ${item.id} must be registered (no silent dog fallback)`);
      assert.equal(registry.getJourneyActivityConfig(id, item.id), config);
      if (config.scenarioId) assert.ok(scenarioIds.has(config.scenarioId), `${id} registry scenario ${config.scenarioId} must exist`);
    }
    // 已註冊物種查不到的節點不可借用犬的設定。
    if (id !== "dog") assert.equal(registry.getJourneyActivityConfig(id, "walking"), undefined);
  }
});

test("replay reset strategies clear the activity state they own", () => {
  const resetContracts = {
    walking: ["walkingPreparedItems", "walkingSceneIndex", "walkingMinutes", "walkingPoopCleaned", "walkingComplete"],
    "cat-inspection": ["catInspectionSteps"],
    "rabbit-carry-sort": ["rabbitCarryOrder", "rabbitCarryComplete", "rabbitCarryAttempts", "rabbitCarryAnswerRevealed", "rabbitCarryFeedbackShown"],
    "rabbit-daily-check": ["rabbitDailyCheckSteps", "rabbitGroomingState", "rabbitGroomingObservations", "rabbitGroomingInspection"],
    "bird-cage-inspection": ["birdCageInspectionSteps", "birdCageInspectionStates"],
    "hamster-first-meal": ["arrivalMealSelectedChoiceIds", "arrivalMealFeedbackChoiceId"],
    "hamster-inspection": ["hamsterInspectionStarted", "hamsterInspectionStates", "hamsterInspectionCompleted", "hamsterInspectionFeedback"],
    "gecko-health-inspection": ["geckoHealthInspectionStarted", "geckoHealthInspectionStates", "geckoHealthInspectionCompleted", "geckoHealthInspectionFeedback"],
  };
  for (const [resetKey, fields] of Object.entries(resetContracts)) {
    const patch = registry.getJourneyActivityResetPatch(resetKey);
    assert.ok(patch, `${resetKey} reset strategy must exist`);
    for (const field of fields) assert.ok(Object.hasOwn(patch, field), `${resetKey} must reset ${field}`);
    // 每次重玩都要拿到新的陣列與物件，不能共用上一次的 state。
    assert.notEqual(registry.getJourneyActivityResetPatch(resetKey), patch);
  }
  // 只靠答案重設與重新掛載的活動，不需要額外的 state patch。
  for (const resetKey of ["daily-behavior", "breed-challenge", "busy-care"]) {
    assert.equal(registry.getJourneyActivityResetPatch(resetKey), undefined);
  }
  assert.equal(registry.getJourneyActivityResetPatch(undefined), undefined);
});

test("species expense lookup never falls back to another species", () => {
  for (const id of speciesIds) {
    for (const other of speciesIds.filter((entry) => entry !== id)) {
      for (const expenseId of Object.keys(expenses.expenseCatalogBySpecies[other])) {
        if (Object.hasOwn(expenses.expenseCatalogBySpecies[id], expenseId)) continue;
        assert.equal(expenses.getExpenseForSpecies(expenseId, id), undefined, `${id} must not read ${other}'s ${expenseId}`);
      }
    }
  }
  // 未指定物種的 legacy 查詢仍可取得合併目錄。
  assert.equal(expenses.getExpenseForSpecies("dog-food-monthly")?.id, "dog-food-monthly");
});

test("every expense id referenced by species data exists in that species catalog", () => {
  const referenceFields = new Set(["expenseId", "expenseIds", "silentExpenseIds", "recurringExpenseIds", "reusedExpenseIds", "deferredArrivalFeedbackExpenseIds", "arrivalMealExcludedExpenseIds", "walkingExpenseIds"]);
  for (const id of speciesIds) {
    const config = species.getSpeciesConfig(id);
    const referenced = collectFieldValues({
      preparation: config.preparation,
      feeding: config.feeding,
      journeyItems: journey.getJourneyItemsForSpecies(id),
      scenarios: journey.getLifeScenariosForSpecies(id),
      rules: expenses.getExpenseRulesForSpecies(id),
    }, referenceFields);
    for (const card of expenses.getExpenseRulesForSpecies(id).combinedExpenseCards ?? []) card.expenseIds.forEach((expenseId) => referenced.add(expenseId));
    assert.ok(referenced.size > 0, `${id} must reference expenses`);
    for (const expenseId of referenced) {
      assert.ok(expenses.getExpenseForSpecies(expenseId, id), `${id} expense reference ${expenseId} must exist in ${id}/expenses.ts`);
    }
  }
});

test("non-dog species never borrow dog scenario or feedback videos", () => {
  const videoSources = (media) => (media?.type === "video" ? [media.src] : []);
  for (const id of speciesIds.filter((entry) => entry !== "dog")) {
    const sources = [];
    for (const scenario of journey.getLifeScenariosForSpecies(id)) {
      const presentation = journey.getScenarioPresentation(id, scenario.id);
      sources.push(
        ...videoSources(scenario.sceneMedia),
        ...videoSources(scenario.correctFeedbackMedia),
        ...videoSources(presentation.correctFeedbackMedia),
        ...(presentation.sceneVideo?.src ? [presentation.sceneVideo.src] : []),
      );
    }
    for (const src of sources) {
      assert.doesNotMatch(src, /^\/assets\/dog\//, `${id} must not use dog media ${src}`);
    }
  }
});

test("replay button appears only when revisiting a completed item", () => {
  const firstVisit = replay.enterJourneyItem("a", []);
  assert.equal(replay.canReplayJourneyItem(firstVisit, "a", "q1"), false, "first completion must not offer replay");

  const revisit = replay.enterJourneyItem("a", ["a"]);
  assert.equal(replay.isRevisitingJourneyItem(revisit, "a"), true);
  assert.equal(replay.canReplayJourneyItem(revisit, "a", "q1"), true);
  assert.equal(replay.canReplayJourneyItem(revisit, "b", "q1"), false, "other items are not revisits");
});

test("replay is tracked per sub-question and keeps the first snapshot", () => {
  const original = {
    q1: { scenarioId: "q1", firstChoiceId: "x", finalChoiceId: "x", firstResult: "incorrect", finalResult: "correct", attempts: 2 },
    q2: { scenarioId: "q2", firstChoiceId: "y", finalChoiceId: "y", firstResult: "correct", finalResult: "correct", attempts: 1 },
  };
  const activity = { walkingMinutes: 12 };
  let state = replay.enterJourneyItem("a", ["a"]);

  state = replay.startJourneyReplay(state, { itemId: "a", scenarioIds: ["q1"], activityPatch: { walkingMinutes: 0 } }, original, activity);
  assert.equal(replay.canReplayJourneyItem(state, "a", "q1"), false, "replayed sub-question hides the button");
  assert.equal(replay.canReplayJourneyItem(state, "a", "q2"), true, "other sub-questions can still be replayed");
  assert.equal(replay.canReplayJourneyItem(state, "a"), false, "items without sub-questions replay once");

  const cleared = replay.clearReplayAnswers(original, ["q1"]);
  assert.equal(cleared.q1, undefined);
  assert.equal(cleared.q2, original.q2, "only the replayed answer is cleared");

  // 重答 q1 後再重玩 q2：q1 的快照必須仍是第一次完成時的答案。
  const practiced = { ...cleared, q1: { ...original.q1, firstResult: "correct", attempts: 1 } };
  state = replay.startJourneyReplay(state, { itemId: "a", scenarioIds: ["q2"] }, practiced, { walkingMinutes: 0 });
  assert.equal(state.session.answers.q1, original.q1);
  assert.equal(state.session.answers.q2, original.q2);
  assert.equal(state.session.activity.walkingMinutes, 12, "activity snapshot keeps the original value");

  const restored = replay.restoreReplayAnswers(replay.clearReplayAnswers(practiced, ["q2"]), state.session);
  assert.deepEqual(restored, original, "leaving restores the first completion record");

  assert.equal(replay.enterJourneyItem("b", ["a"]).session, null, "navigating away ends the replay session");
});
