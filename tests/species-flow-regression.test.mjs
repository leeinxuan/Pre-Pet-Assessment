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

    if (species === "hamster") {
      assert.match(feeding, /interaction:\s*"choice"/, "hamster keeps its choice-based first meal");
    } else {
      assert.match(feeding, /interaction:\s*"scene"/, `${species} keeps its scene-based first meal`);
      assert.deepEqual(quotedArray(feeding, "requiredSupplies"), expected.requiredMealSupplies, `${species} required meal supplies changed`);
      assert.match(feeding, /unsafeFoods:\s*\[/, `${species} keeps unsafe-food feedback`);
    }
  }
  const practiceRegistrySection = reportRegistry.slice(0, reportRegistry.indexOf("const discussionSummaryOverrides"));
  assert.doesNotMatch(practiceRegistrySection, /requiredActivityIds|dog:|cat:|rabbit:|bird:|hamster:/, "report registry must not duplicate feeding completion requirements");
  assert.match(practiceRegistrySection, /completionSelector:\s*"arrival-meal"/);
});

test("report completion selectors own activity-state details and derive meals from feeding data", async () => {
  const [report, masteredSelectors, practiceSelectors] = await Promise.all([
    source("app/components/report/AssessmentReport.tsx"),
    source("app/data/shared/mastered-care-selectors.ts"),
    source("app/data/species/report-practice-selectors.ts"),
  ]);
  assert.doesNotMatch(report, /walkingComplete|catInspectionSteps|rabbitGroomingState|hamsterInspectionCompleted|birdCageInspectionSteps/);
  assert.match(report, /isMasteredCareLifeStateComplete\(source, lifeActivity\)/);
  assert.match(masteredSelectors, /masteredCareCompletionSelectors/);
  assert.match(practiceSelectors, /getSpeciesConfig\(species\)\.feeding/);
  assert.match(practiceSelectors, /feeding\.requiredSupplies/);
  assert.match(practiceSelectors, /feeding\.choices/);
});

test("species-scoped expense lookup never falls back to another species", async () => {
  const expenses = await source("app/data/shared/expenses.ts");
  assert.match(expenses, /if \(species !== undefined\)[\s\S]*return speciesCatalog\?\.\[id\];/);
  assert.match(expenses, /return expenseCatalog\[id\];/);
  assert.doesNotMatch(expenses, /speciesCatalog\?\.\[id\] \?\? expenseCatalog\[id\]/);
});

test("departure document visuals use data roles instead of document ids", async () => {
  const preparationComponent = await source("app/components/preparation/PreparationComponents.tsx");
  assert.match(preparationComponent, /item\.visualRole === "document-folder"/);
  assert.match(preparationComponent, /item\.visualRole === "identity-card"/);
  assert.doesNotMatch(preparationComponent, /item\.id === "documents"|item\.id === "id"|item\.id === "id-card"/);

  for (const species of ["dog", "rabbit", "bird", "hamster"]) {
    const preparation = await source(`app/data/species/${species}/preparation.ts`);
    assert.match(preparation, /visualRole: "document-folder"/, `${species} must declare its document-folder visual`);
    assert.match(preparation, /visualRole: "identity-card"/, `${species} must declare its identity-card visual`);
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

test("daily-behavior activities receive the active species", async () => {
  const lifeJourney = await source("app/components/life/LifeJourneyComponents.tsx");
  const dailyBehaviorStart = lifeJourney.indexOf("<DailyBehaviorActivityMulti");
  assert.notEqual(dailyBehaviorStart, -1, "daily-behavior renderer must exist");
  const dailyBehaviorEnd = lifeJourney.indexOf("/>", dailyBehaviorStart);
  const dailyBehavior = lifeJourney.slice(dailyBehaviorStart, dailyBehaviorEnd);
  assert.match(dailyBehavior, /scenarioIds=.*getDailyBehaviorScenarioIds\(species\)/s);
  assert.match(dailyBehavior, /species=\{species\}/, "daily behavior must use the active species data");
});

test("scenario media selection stays out of shared scenario UI", async () => {
  const [dailyBehavior, videoScenario, breedChallenge, scenarioUi, journeyRegistry, dogScenarios, dogBreedChallenges] = await Promise.all([
    source("app/components/life/activities/DailyBehaviorActivityMulti.tsx"),
    source("app/components/life/activities/VideoScenarioActivity.tsx"),
    source("app/components/life/activities/BreedChallengeActivity.tsx"),
    source("app/components/life/activities/scenario-ui.tsx"),
    source("app/data/species/journey.ts"),
    source("app/data/species/dog/scenarios.ts"),
    source("app/data/species/dog/breed-challenges.ts"),
  ]);
  const componentSource = `${dailyBehavior}\n${videoScenario}\n${breedChallenge}`;
  assert.doesNotMatch(componentSource, /species\s*===|isDog|isCat|isRabbit|isBird|isHamster|\.startsWith\("(?:cat|rabbit|bird|hamster)-/);
  assert.doesNotMatch(componentSource, /dogAssets|getCorrectAnswerVideo|correct-answer(?:2)?\.mp4|chewing-on-things\.mp4/);
  assert.doesNotMatch(scenarioUi, /dogAssets|getCorrectAnswerVideo|breedChallengeVideos|arrival-adjustment|illness-vet|growing-old|busy-daily-care/);
  assert.match(videoScenario, /scenario\.sceneMedia/);
  assert.match(videoScenario, /scenario\.correctFeedbackMedia/);
  assert.match(breedChallenge, /scenario\?\.sceneMedia/);
  assert.match(scenarioUi, /scenario\.requiresRetry/);
  assert.match(scenarioUi, /scenario\.questionTitle/);
  assert.match(scenarioUi, /scenario\.continueLabel/);
  assert.match(dogScenarios, /sceneMedia:\s*\{ type: "video"/);
  assert.match(dogScenarios, /correctFeedbackMedia:\s*\{ type: "video"/);
  assert.match(dogBreedChallenges, /scenarioMedia\.dog\.shedding/);
  assert.match(dogBreedChallenges, /scenarioMedia\.dog\.rainyWalk/);
  assert.match(journeyRegistry, /getSpeciesConfig\(species\)\.scenarioPresentation/);
  assert.doesNotMatch(journeyRegistry, /if \(species ===|species === "cat"|species === "rabbit"|species === "bird"|species === "hamster"/);
  for (const species of Object.keys(speciesFlows)) {
    const [journey, speciesConfig] = await Promise.all([
      source(`app/data/species/${species}/journey.ts`),
      source(`app/data/species/${species}/index.ts`),
    ]);
    assert.match(journey, new RegExp(`export const ${species}ScenarioPresentation`));
    assert.match(speciesConfig, new RegExp(`scenarioPresentation: ${species}ScenarioPresentation`));
    if (species !== "dog") {
      assert.match(journey, /correctFeedbackMedia:\s*\{ type: "placeholder" \}/, `${species} must not borrow dog feedback video`);
      assert.doesNotMatch(journey, /scenarioMedia\.dog\./, `${species} must not borrow dog question video`);
    }
  }
});

test("busy-care presentation and support choice come from scenario data", async () => {
  const busyCare = await source("app/components/life/activities/BusyCareActivity.tsx");
  assert.doesNotMatch(busyCare, /species\s*===|isDog|isCat|isRabbit|isBird|isHamster/);
  assert.doesNotMatch(busyCare, /dogAssets|catAssets|getCorrectAnswerVideo|family-helper|rabbit-busy-helper|bird-busy-helper/);
  assert.match(busyCare, /scenario\.busyCarePresentation/);
  assert.match(busyCare, /choice\.isSupportChoice/);
  for (const species of Object.keys(speciesFlows)) {
    const scenarios = await source(`app/data/species/${species}/scenarios.ts`);
    assert.match(scenarios, /busyCarePresentation:\s*\{/s, `${species} busy-care presentation must be data-driven`);
    assert.match(scenarios, /isSupportChoice:\s*true/, `${species} busy-care support choice must be explicit`);
  }
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

test("formal readiness and report components read the registered species data", async () => {
  const [preparation, report] = await Promise.all([
    source("app/components/preparation/PreparationComponents.tsx"),
    source("app/components/report/AssessmentReport.tsx"),
  ]);
  assert.match(preparation, /getSpeciesConfig\(species\)\.homeReadiness/);
  assert.doesNotMatch(preparation, /getHomeReadinessConfig/);
  assert.match(report, /speciesConfig\.homeReadiness/);
  assert.match(report, /speciesConfig\.careReviewAdditionalNotes/);
  assert.match(report, /speciesConfig\.masteredCareThemes/);
  assert.doesNotMatch(report, /getHomeReadinessConfig|getCareReviewAdditionalNotes|getMasteredCareThemes/);
});

test("legacy scenario entry is isolated from the formal journey", async () => {
  const [page, lifeJourney, compatibilityEntry, legacyImplementation] = await Promise.all([
    source("app/page.tsx"),
    source("app/components/life/LifeJourneyComponents.tsx"),
    source("app/components/life/ScenarioComponents.tsx"),
    source("app/components/life/legacy/ScenarioComponents.tsx"),
  ]);
  assert.doesNotMatch(`${page}\n${lifeJourney}`, /legacy-scenarios|ScenarioComponents/);
  assert.match(compatibilityEntry, /@deprecated/);
  assert.match(compatibilityEntry, /from "\.\/legacy\/ScenarioComponents"/);
  assert.match(legacyImplementation, /legacy-scenarios/);
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
  assert.match(fallback, /aria-label="內容載入中"/);
  assert.doesNotMatch(fallback, /正在準備下一段練習|正在載入畫面與互動內容/);
  assert.match(fallback, /role="alert"/);
  assert.match(fallback, /window\.location\.reload\(\)/);
  assert.match(fallback, />重新載入</);
});

test("test-mode next signal cannot leak into the following journey item", async () => {
  const [page, lifeJourney, journeyData] = await Promise.all([
    source("app/page.tsx"),
    source("app/components/life/LifeJourneyComponents.tsx"),
    source("app/data/species/journey.ts"),
  ]);
  assert.match(page, /setTestNextTargetIndex\(journeyIndex\)/);
  assert.match(page, /testNextSignal=\{testNextTargetIndex === journeyIndex \? testNextSignal : 0\}/);
  assert.match(page, /onIndex=\{\(nextIndex\) => \{ setTestNextTargetIndex\(null\); setJourneyIndex\(nextIndex\); \}\}/);
  assert.match(lifeJourney, /transition === "busy-care" && busyCareTransitionIndex !== index[\s\S]*setBusyCareTransitionIndex\(index\)[\s\S]*return/);
  assert.match(lifeJourney, /timePassOpen && activityConfig\?\.transition === "time-pass"[\s\S]*sickTimePassComplete: true[\s\S]*selectItem\(index \+ 1\)/);
  assert.doesNotMatch(lifeJourney, /stageForIndex|species === "hamster"/);
  assert.match(lifeJourney, /onStageChange\(getJourneyStepForItem\(activeJourneyItems\[next\]\)\)/);
  for (const stageId of ["arrival", "daily", "breed", "life-change"]) {
    assert.match(journeyData, new RegExp(`item\\?\\.stageId === "${stageId}"`));
  }
});
