import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = (path) => readFile(new URL(path, root), "utf8");

const speciesFlows = {
  dog: {
    requiredMealSupplies: ["food", "water"],
    recurringExpenses: ["dog-food-monthly", "dog-clean-monthly"],
    activities: { arrival: "video-scenario", behavior: "daily-behavior", walking: "walking", "breed-challenge": "breed-challenge", "busy-care": "busy-care", sick: "video-scenario", senior: "video-scenario" },
  },
  cat: {
    requiredMealSupplies: ["food", "water"],
    recurringExpenses: ["cat-food-monthly", "cat-litter-monthly"],
    activities: { "cat-arrival": "video-scenario", "cat-daily-care": "daily-behavior", "cat-daily-inspection": "cat-inspection", "breed-challenge": "breed-challenge", "cat-busy-care": "busy-care", "cat-sick": "video-scenario", "cat-senior": "video-scenario" },
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
    requiredMealSupplies: ["hamster-pellet", "fresh-water"],
    recurringExpenses: ["hamster-pellet-monthly"],
    activities: { "hamster-arrival": "video-scenario", "hamster-first-meal": "arrival-meal", "hamster-daily-care": "daily-behavior", "hamster-solitary": "video-scenario", "hamster-cage-check": "hamster-inspection", "hamster-busy-care": "busy-care", "hamster-health": "video-scenario", "hamster-senior": "video-scenario" },
  },
};

function quotedArray(sourceText, field) {
  const match = sourceText.match(new RegExp(`${field}\\s*:\\s*\\[([^\\]]*)\\]`, "s"));
  assert.ok(match, `expected ${field} array`);
  return [...match[1].matchAll(/"([^"]+)"/g)].map((entry) => entry[1]);
}

function registrySection(registry, species, nextSpecies) {
  const start = registry.indexOf(`  ${species}: {`);
  assert.notEqual(start, -1, `${species} activity registry section must exist`);
  const end = nextSpecies ? registry.indexOf(`  ${nextSpecies}: {`, start) : registry.indexOf("\n};", start);
  return registry.slice(start, end);
}

test("five species preserve first-meal completion and recurring-expense contracts", async () => {
  const reportRegistry = await source("app/data/species/report-practice-registry.ts");
  for (const [species, expected] of Object.entries(speciesFlows)) {
    const feeding = await source(`app/data/species/${species}/feeding.ts`);
    assert.deepEqual(quotedArray(feeding, "recurringExpenseIds"), expected.recurringExpenses, `${species} recurring meal expenses changed`);

    const reportStart = reportRegistry.indexOf(`  ${species}:`);
    const reportEnd = reportRegistry.indexOf("\n  ", reportStart + 3);
    const reportSection = reportRegistry.slice(reportStart, reportEnd === -1 ? undefined : reportEnd);
    assert.deepEqual(quotedArray(reportSection, "requiredActivityIds"), expected.requiredMealSupplies, `${species} report completion rule changed`);

    if (species === "hamster") {
      assert.match(feeding, /interaction:\s*"choice"/, "hamster keeps its choice-based first meal");
    } else {
      assert.match(feeding, /interaction:\s*"scene"/, `${species} keeps its scene-based first meal`);
      assert.deepEqual(quotedArray(feeding, "requiredSupplies"), expected.requiredMealSupplies, `${species} required meal supplies changed`);
      assert.match(feeding, /unsafeFoods:\s*\[/, `${species} keeps unsafe-food feedback`);
    }
  }
});

test("five species preserve journey component dispatch", async () => {
  const registry = await source("app/data/species/activity-registry.ts");
  const speciesIds = Object.keys(speciesFlows);
  speciesIds.forEach((species, index) => {
    const section = registrySection(registry, species, speciesIds[index + 1]);
    for (const [itemId, activityKey] of Object.entries(speciesFlows[species].activities)) {
      const helper = activityKey === "video-scenario" ? "video" : "activity";
      const pattern = helper === "video"
        ? new RegExp(`video\\("${itemId}",`)
        : new RegExp(`activity\\("${itemId}",\\s*"${activityKey}"`);
      assert.match(section, pattern, `${species}/${itemId} must still dispatch to ${activityKey}`);
    }
  });
});

test("replay reset strategies retain the activity state fields they clear", async () => {
  const registry = await source("app/data/species/activity-registry.ts");
  const resetContracts = {
    walking: ["walkingPreparedItems", "walkingSceneIndex", "walkingMinutes", "walkingPoopCleaned", "walkingComplete"],
    "cat-inspection": ["catInspectionSteps"],
    "rabbit-carry-sort": ["rabbitCarryOrder", "rabbitCarryComplete", "rabbitCarryAttempts", "rabbitCarryAnswerRevealed", "rabbitCarryFeedbackShown"],
    "rabbit-daily-check": ["rabbitDailyCheckSteps", "rabbitGroomingState", "rabbitGroomingObservations", "rabbitGroomingInspection"],
    "bird-cage-inspection": ["birdCageInspectionSteps", "birdCageInspectionStates"],
    "hamster-first-meal": ["hamsterMealSelected", "hamsterMealFeedbackId"],
    "hamster-inspection": ["hamsterInspectionStarted", "hamsterInspectionStates", "hamsterInspectionCompleted", "hamsterInspectionFeedback"],
  };
  for (const [resetKey, fields] of Object.entries(resetContracts)) {
    const start = registry.indexOf(`case "${resetKey}"`);
    assert.notEqual(start, -1, `${resetKey} reset strategy must exist`);
    const end = registry.indexOf("case ", start + 6);
    const section = registry.slice(start, end === -1 ? registry.indexOf("default:", start) : end);
    for (const field of fields) assert.match(section, new RegExp(`\\b${field}\\s*:`), `${resetKey} must reset ${field}`);
  }
});

test("large flow screens remain behind dynamic import boundaries", async () => {
  const page = await source("app/page.tsx");
  for (const component of ["LifeJourney", "ArrivalTransitionVideo", "HomeReadinessActivity", "RoomPreparation", "CarTrunkPreparation", "AssessmentReport", "PetAcquisitionPage"]) {
    assert.match(page, new RegExp(`const ${component} = dynamic\\(`), `${component} should remain lazy-loaded`);
  }
  assert.doesNotMatch(page, /import\s*\{[^}]*LifeJourney[^}]*\}\s*from\s*"\.\/components\/life\/LifeJourneyComponents"/s);
  assert.doesNotMatch(page, /import\s*\{[^}]*AssessmentReport[^}]*\}\s*from\s*"\.\/components\/report\/ProfileReportComponents"/s);
  assert.match(page, /const dynamicFlowOptions = \{ loading: FlowLoadingFallback \}/);
  assert.match(page, /<FlowLoadErrorBoundary resetKey=/);
});

test("dynamic flow loading and error states remain accessible and retryable", async () => {
  const fallback = await source("app/components/shared/AsyncFlowState.tsx");
  assert.match(fallback, /role="status"/);
  assert.match(fallback, /aria-busy="true"/);
  assert.match(fallback, /role="alert"/);
  assert.match(fallback, /window\.location\.reload\(\)/);
  assert.match(fallback, />重新載入</);
});
