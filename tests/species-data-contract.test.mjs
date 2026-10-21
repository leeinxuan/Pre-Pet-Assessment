import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const speciesIds = ["dog", "cat", "rabbit", "bird", "hamster", "gecko"];
const root = new URL("../", import.meta.url);
const source = (path) => readFile(new URL(path, root), "utf8");

test("all registered species expose the complete canonical data contract", async () => {
  for (const species of speciesIds) {
    const base = `app/data/species/${species}/`;
    const requiredFiles = [
      "index.ts", "copy.ts", "feeding.ts", "journey.ts", "preparation.ts", "report.ts",
      "home-readiness.ts", "mastered-care-themes.ts", "care-review-notes.ts", "expenses.ts", "acquisition.ts",
    ];
    await Promise.all(requiredFiles.map((file) => access(new URL(`${base}${file}`, root))));

    // 設定欄位是否註冊，由 game-logic.test.mjs 直接讀取 getSpeciesConfig 檢查。
  }
});

test("specialized interactions have one species-local activity entry point", async () => {
  for (const species of speciesIds) {
    await access(new URL(`app/data/species/${species}/activities.ts`, root));
  }

  const [dogActivities, rabbitActivities, catPreparation, catIndex] = await Promise.all([
    source("app/data/species/dog/activities.ts"),
    source("app/data/species/rabbit/activities.ts"),
    source("app/data/species/cat/preparation.ts"),
    source("app/data/species/cat/index.ts"),
  ]);
  assert.match(dogActivities, /walkingActivityConfig/);
  assert.match(rabbitActivities, /rabbitGroomingConfig/);
  assert.match(catPreparation, /roomItems:\s*catRoomItems/);
  assert.match(catPreparation, /hazards:\s*catHazards/);
  assert.match(catIndex, /preparation:\s*catPreparation/);
});

test("formal species data does not retain layout or split activity-data modules", async () => {
  for (const species of speciesIds) {
    const base = `app/data/species/${species}/`;
    await assert.rejects(access(new URL(`${base}layout.ts`, root)));
  }

  const [dogActivities, rabbitActivities, rabbitJourney, rabbitScenarios, rabbitReport, birdActivities, birdScenarios] = await Promise.all([
    source("app/data/species/dog/activities.ts"),
    source("app/data/species/rabbit/activities.ts"),
    source("app/data/species/rabbit/journey.ts"),
    source("app/data/species/rabbit/scenarios.ts"),
    source("app/data/species/rabbit/report.ts"),
    source("app/data/species/bird/activities.ts"),
    source("app/data/species/bird/scenarios.ts"),
  ]);
  await assert.rejects(access(new URL("app/data/species/dog/walking.ts", root)));
  assert.match(dogActivities, /walkingActivityConfig/);
  assert.match(rabbitActivities, /rabbitActivityScenarios/);
  assert.doesNotMatch(rabbitJourney, /export const rabbitGroomingConfig/);
  assert.doesNotMatch(rabbitScenarios, /export const rabbitActivityScenarios/);
  assert.doesNotMatch(rabbitReport, /export const rabbitGroomingCompletion/);
  assert.match(birdActivities, /export const birdActivityScenarios/);
  assert.doesNotMatch(birdScenarios, /export const birdActivityScenarios/);
});

test("acquisition sources keep the legal business lookup only for dog and cat", async () => {
  for (const species of speciesIds) {
    const acquisition = await source(`app/data/species/${species}/acquisition.ts`);
    if (species === "dog" || species === "cat") {
      assert.match(acquisition, /"legal-pet-businesses"/, `${species} must keep the legal pet business lookup`);
    } else {
      assert.doesNotMatch(acquisition, /"legal-pet-businesses"/, `${species} must not show the dog/cat legal pet business lookup`);
    }
    assert.match(acquisition, /來源方/, `${species} must use the shared source reminder`);
  }
});

test("species report support data is available through canonical files", async () => {
  for (const species of speciesIds) {
    const base = `app/data/species/${species}/`;
    const [home, themes, notes] = await Promise.all([
      source(`${base}home-readiness.ts`),
      source(`${base}mastered-care-themes.ts`),
      source(`${base}care-review-notes.ts`),
    ]);
    assert.match(home, new RegExp(`export const ${species}HomeReadiness\\b`));
    assert.match(themes, new RegExp(`export const ${species}MasteredCareThemes\\b`));
    assert.match(themes, /preparationThemes\(/, `${species} preparation themes must use the categorized shared builder`);
    assert.match(themes, /category:\s*"care-life"/, `${species} care-life themes must declare their report category`);
    assert.match(notes, new RegExp(`export const ${species}CareReviewAdditionalNotes\\b`));
  }
});

test("cat required after-arrival expenses match the latest planning copy", async () => {
  const expenses = await source("app/data/species/cat/expenses.ts");
  assert.match(expenses, /到家後盡快安排，確認整體狀態與驅蟲需求；/);
  assert.match(expenses, /晶片植入與寵物登記[\s\S]*規費金額，請以所在縣市（動保處或防疫所）最新規費公告為準/);
  assert.match(expenses, /狂犬病疫苗[\s\S]*規費金額，請以所在縣市（動保處或防疫所）最新規費公告為準/);
  assert.match(expenses, /可預防多種生殖系統疾病[\s\S]*母貓費用較高/);
  assert.doesNotMatch(expenses, /\*\*母貓費用較高\*\*/);
  assert.doesNotMatch(expenses, /米克斯建議加做 FeLV／FIV 篩檢/);
  assert.doesNotMatch(expenses, /部分地方政府可免費辦理/);
});

test("dog and cat use the shared carrier while hamster uses its dedicated carrier", async () => {
  const [dog, cat, hamsterAssets] = await Promise.all([
    source("app/data/species/dog/preparation.ts"),
    source("app/data/species/cat/assets.ts"),
    source("app/data/species/hamster/assets.ts"),
  ]);
  assert.match(dog, /\/assets\/car\/carrier\.webp/);
  assert.match(cat, /carrier:\s*"\/assets\/car\/carrier\.webp"/);
  assert.match(hamsterAssets, /\/assets\/car\/hamster-carrier\.webp/);
  await Promise.all([
    access(new URL("public/assets/car/carrier.webp", root)),
    access(new URL("public/assets/car/hamster-carrier.webp", root)),
  ]);
});

test("only dog and cat departure preparation keeps identity and adoption documents", async () => {
  const preparations = Object.fromEntries(await Promise.all(speciesIds.map(async (species) => [
    species,
    await source(`app/data/species/${species}/preparation.ts`),
  ])));
  assert.match(preparations.dog, /kind:\s*"document"/, "dog must retain departure documents");
  assert.match(preparations.cat, /dogDepartureTrunkItems/, "cat must retain the shared dog and cat document items");
  assert.doesNotMatch(preparations.cat, /item\.kind\s*!==\s*"document"/, "cat must not filter out departure documents");
  for (const species of ["rabbit", "bird", "hamster", "gecko"]) {
    assert.doesNotMatch(preparations[species], /kind:\s*"document"/, `${species} must not require departure documents`);
    assert.doesNotMatch(preparations[species], /id-card|adoption-documents|ownership-docs/, `${species} must not retain document completion ids`);
  }
});

test("shared intro and hazard panel follow the current interaction contract", async () => {
  const [flow, preparation, guide] = await Promise.all([
    source("app/data/shared/app-flow.ts"),
    source("app/components/preparation/PreparationComponents.tsx"),
    source("docs/新物種程式實作準則.md"),
  ]);
  assert.doesNotMatch(flow, /\\u8207\\u54c1\\u7a2e|與品種/);
  assert.match(flow, /\\u5148\\u9078\\u5b9a\\u7269\\u7a2e\\uff0c/);
  assert.match(preparation, /className="room-hazard-alert-close"/);
  assert.match(preparation, /aria-label=\{`關閉\$\{hazard\.label\}說明`\}/);
  assert.match(preparation, /setActiveHazardInfo\(id\)/);
  assert.match(guide, /說明欄不可使用自動消失或計時關閉機制/);
});
