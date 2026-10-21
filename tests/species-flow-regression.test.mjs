import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = (path) => readFile(new URL(path, root), "utf8");

const speciesIds = ["dog", "cat", "rabbit", "bird", "hamster", "gecko"];

test("report registry does not duplicate feeding completion requirements", async () => {
  const reportRegistry = await source("app/data/species/report-practice-registry.ts");
  const practiceRegistrySection = reportRegistry.slice(0, reportRegistry.indexOf("const discussionSummaryOverrides"));
  assert.doesNotMatch(practiceRegistrySection, /requiredActivityIds|dog:|cat:|rabbit:|bird:|hamster:/, "report registry must not duplicate feeding completion requirements");
  assert.match(practiceRegistrySection, /completionSelector:\s*"arrival-meal"/);
});

test("species selection uses the named hamster artwork and the requested card order", async () => {
  const [hamsterAssets, speciesIndex] = await Promise.all([
    source("app/data/species/hamster/assets.ts"),
    source("app/data/species/index.ts"),
  ]);
  assert.match(hamsterAssets, /selection: \{ hamster: "\/assets\/species\/hamster\.webp" \}/);
  assert.doesNotMatch(hamsterAssets, /small-mammal/);
  assert.ok(speciesIndex.indexOf("  gecko: {") < speciesIndex.indexOf("  hamster: {"));
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

test("departure document visuals use data roles instead of document ids", async () => {
  const preparationComponent = await source("app/components/preparation/PreparationComponents.tsx");
  assert.match(preparationComponent, /item\.visualRole === "document-folder"/);
  assert.match(preparationComponent, /item\.visualRole === "identity-card"/);
  assert.doesNotMatch(preparationComponent, /item\.id === "documents"|item\.id === "id"|item\.id === "id-card"/);

  const dogPreparation = await source("app/data/species/dog/preparation.ts");
  assert.match(dogPreparation, /visualRole: "document-folder"/, "dog and cat must retain the document-folder visual");
  assert.match(dogPreparation, /visualRole: "identity-card"/, "dog and cat must retain the identity-card visual");

  for (const species of ["rabbit", "bird", "hamster", "gecko"]) {
    const preparation = await source(`app/data/species/${species}/preparation.ts`);
    assert.doesNotMatch(preparation, /visualRole: "document-folder"/, `${species} must not retain a document-folder visual`);
    assert.doesNotMatch(preparation, /visualRole: "identity-card"/, `${species} must not retain an identity-card visual`);
  }
});

test("cat senior care uses the shared multi-select flow and scenario question text", async () => {
  const [registry, videoScenario, catScenarios] = await Promise.all([
    source("app/data/species/activity-registry.ts"),
    source("app/components/life/activities/VideoScenarioActivity.tsx"),
    source("app/data/species/cat/scenarios.ts"),
  ]);
  assert.match(registry, /"cat-senior": activity\("cat-senior", "daily-behavior-single"/);
  assert.match(videoScenario, /withPetName\(scenario\.questionText, petName, species\)/);
  assert.doesNotMatch(videoScenario, /scenario\.questionText\s*\?\?/);
  assert.match(catScenarios, /id:\s*"cat-growing-old"[\s\S]*?questionText:\s*"以下哪些做法能幫助 \{petName\} 在高齡期安心生活？（複選）"[\s\S]*?multipleChoice:\s*true/);
  assert.match(catScenarios, /id:\s*"cat-busy-care"[\s\S]*?questionText:\s*"你會怎麼做？"[\s\S]*?id:\s*"seek-help"/);
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

// 物種影片是否借用犬素材，改由 game-logic.test.mjs 直接檢查資料；這裡只保留共用元件的架構守則。
test("scenario media selection stays out of shared scenario UI", async () => {
  const [dailyBehavior, videoScenario, breedChallenge, scenarioUi, journeyRegistry] = await Promise.all([
    source("app/components/life/activities/DailyBehaviorActivityMulti.tsx"),
    source("app/components/life/activities/VideoScenarioActivity.tsx"),
    source("app/components/life/activities/BreedChallengeActivity.tsx"),
    source("app/components/life/activities/scenario-ui.tsx"),
    source("app/data/species/journey.ts"),
  ]);
  const componentSource = `${dailyBehavior}\n${videoScenario}\n${breedChallenge}`;
  assert.doesNotMatch(componentSource, /species\s*===|isDog|isCat|isRabbit|isBird|isHamster|\.startsWith\("(?:cat|rabbit|bird|hamster)-/);
  assert.doesNotMatch(componentSource, /dogAssets|getCorrectAnswerVideo|correct-answer(?:2)?\.mp4|chewing-on-things\.mp4/);
  assert.doesNotMatch(scenarioUi, /dogAssets|getCorrectAnswerVideo|breedChallengeVideos|arrival-adjustment|illness-vet|growing-old|busy-daily-care/);
  assert.doesNotMatch(journeyRegistry, /if \(species ===|species === "cat"|species === "rabbit"|species === "bird"|species === "hamster"/);
});

test("journey transitions resolve species media through the data registry", async () => {
  const [transitions, speciesIndex] = await Promise.all([
    source("app/components/life/activities/JourneyTransitions.tsx"),
    source("app/data/species/index.ts"),
  ]);
  assert.match(transitions, /getJourneyTransitionMedia\(species\)/);
  assert.doesNotMatch(transitions, /species\/dog\/assets|dogAssets|dogShibaAsset/);
  assert.match(speciesIndex, /export function getJourneyTransitionMedia/);
});

test("busy-care presentation and support choice come from scenario data", async () => {
  const busyCare = await source("app/components/life/activities/BusyCareActivity.tsx");
  assert.doesNotMatch(busyCare, /species\s*===|isDog|isCat|isRabbit|isBird|isHamster/);
  assert.doesNotMatch(busyCare, /dogAssets|catAssets|getCorrectAnswerVideo|family-helper|rabbit-busy-helper|bird-busy-helper/);
  assert.match(busyCare, /scenario\.busyCarePresentation/);
  assert.match(busyCare, /choice\.isSupportChoice/);
  for (const species of speciesIds) {
    const scenarios = await source(`app/data/species/${species}/scenarios.ts`);
    assert.match(scenarios, /busyCarePresentation:\s*\{/s, `${species} busy-care presentation must be data-driven`);
    assert.match(scenarios, /isSupportChoice:\s*true/, `${species} busy-care support choice must be explicit`);
  }
});

// 回訪與重玩的判斷邏輯由 game-logic.test.mjs 直接測試；這裡只守住頁面接線不被拆掉。
test("journey navigation and expenses go through the shared replay state", async () => {
  const [page, journey] = await Promise.all([
    source("app/page.tsx"),
    source("app/components/life/LifeJourneyComponents.tsx"),
  ]);
  // 所有旅程導覽都經過共用入口，先還原快照再判斷回訪。
  for (const target of ["activeItem?.id", "targetItem?.id", "getJourneyItemsForSpecies(category)[nextIndex]?.id", "null"]) {
    assert.ok(page.includes(`enterJourneyReplayItem(${target})`), `navigation to ${target} must use enterJourneyReplayItem`);
  }
  // 重新作答期間不得新增費用或成員。
  for (const fn of ["addExpenseById", "addExpenseSilentlyById", "addExpenseGroupByIds", "playExpenseSequenceByIds", "updateMembers"]) {
    const body = page.slice(page.indexOf(`function ${fn}(`), page.indexOf(`function ${fn}(`) + 400);
    assert.match(body, /if \(isReplayingJourney\(\)\) return/, `${fn} must skip writes while replaying`);
  }
  // 按鈕的 click 事件不可被當成題目 ID 傳入。
  assert.match(journey, /onReplay: canReplayCurrent \? \(\) => replayCurrentQuestion\(\) : undefined/);
  assert.match(journey, /reviewFromStart: isRevisitingItem/);
  assert.doesNotMatch(journey, /setJourneyCompleted|setExpenses|onResetScenarioAnswers/);
});

test("formal readiness and report components read the registered species data", async () => {
  const [preparation, report] = await Promise.all([
    source("app/components/preparation/PreparationComponents.tsx"),
    source("app/components/report/AssessmentReport.tsx"),
  ]);
  assert.match(preparation, /const speciesConfig = getSpeciesConfig\(species\)/);
  assert.match(preparation, /speciesConfig\.homeReadiness/);
  assert.doesNotMatch(preparation, /getHomeReadinessConfig/);
  assert.match(report, /speciesConfig\.homeReadiness/);
  assert.match(report, /speciesConfig\.careReviewAdditionalNotes/);
  assert.match(report, /speciesConfig\.masteredCareThemes/);
  assert.doesNotMatch(report, /getHomeReadinessConfig|getCareReviewAdditionalNotes|getMasteredCareThemes/);
});

test("room-scene data owns doorplate and specialised item placement", async () => {
  const [preparationComponent, geckoPreparation, speciesIndex] = await Promise.all([
    source("app/components/preparation/PreparationComponents.tsx"),
    source("app/data/species/gecko/preparation.ts"),
    source("app/data/species/index.ts"),
  ]);
  assert.match(preparationComponent, /const doorplatePlacement = roomScene\.doorplate\?\.placement/);
  assert.doesNotMatch(preparationComponent, /speciesConfig\.layout/);
  assert.match(geckoPreparation, /id: "thermometer-hygrometer"[\s\S]*?sceneParts: \[[\s\S]*?id: "cool-side"[\s\S]*?id: "warm-side"/);
  assert.doesNotMatch(geckoPreparation, /from "\.\/layout"/);
  assert.doesNotMatch(speciesIndex, /layout:/);
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
  assert.match(page, /onIndex=\{selectJourneyIndex\}/);
  assert.match(page, /function selectJourneyIndex\(nextIndex: number\) \{\n\s*setTestNextTargetIndex\(null\);/);
  assert.match(lifeJourney, /transition === "busy-care" && busyCareTransitionIndex !== index[\s\S]*setBusyCareTransitionIndex\(index\)[\s\S]*return/);
  assert.match(lifeJourney, /timePassOpen && activityConfig\?\.transition === "time-pass"[\s\S]*sickTimePassComplete: true[\s\S]*selectItem\(index \+ 1\)/);
  assert.doesNotMatch(lifeJourney, /stageForIndex|species === "hamster"/);
  assert.match(lifeJourney, /onStageChange\(getJourneyStepForItem\(activeJourneyItems\[next\]\)\)/);
  for (const stageId of ["arrival", "daily", "breed", "life-change"]) {
    assert.match(journeyData, new RegExp(`item\\?\\.stageId === "${stageId}"`));
  }
});
