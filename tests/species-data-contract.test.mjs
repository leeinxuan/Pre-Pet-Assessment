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
      "home-readiness.ts", "mastered-care-themes.ts", "care-review-notes.ts", "expenses.ts",
    ];
    await Promise.all(requiredFiles.map((file) => access(new URL(`${base}${file}`, root))));

    const index = await source(`${base}index.ts`);
    for (const field of ["copy", "feeding", "journey", "preparation", "report", "homeReadiness", "masteredCareThemes", "careReviewAdditionalNotes"]) {
      assert.match(index, new RegExp(`\\b${field}\\s*:`), `${species} config must register ${field}`);
    }
  }
});

test("journey activity registry item and video scenario ids resolve to species data", async () => {
  const registry = await source("app/data/species/activity-registry.ts");
  for (let index = 0; index < speciesIds.length; index += 1) {
    const species = speciesIds[index];
    const start = registry.indexOf(`  ${species}: {`);
    const nextSpecies = speciesIds[index + 1];
    const end = nextSpecies ? registry.indexOf(`  ${nextSpecies}: {`, start) : registry.indexOf("\n};", start);
    const section = registry.slice(start, end);
    const [journey, scenarios] = await Promise.all([
      source(`app/data/species/${species}/journey.ts`),
      source(`app/data/species/${species}/scenarios.ts`),
    ]);

    const itemIds = [...section.matchAll(/(?:video|activity)\("([^"]+)"/g)].map((match) => match[1]);
    for (const itemId of itemIds) {
      assert.match(journey, new RegExp(`id:\\s*"${itemId}"`), `${species} registry item ${itemId} must exist in journey.ts`);
    }

    const scenarioIds = [...section.matchAll(/video\("[^"]+",\s*"([^"]+)"/g)].map((match) => match[1]);
    for (const scenarioId of scenarioIds) {
      assert.ok(
        journey.includes(`scenarioId: "${scenarioId}"`) || scenarios.includes(`id: "${scenarioId}"`),
        `${species} registry scenario ${scenarioId} must exist in journey/scenarios data`,
      );
    }
  }
});

test("literal expense ids referenced by species flows exist in that species catalog", async () => {
  for (const species of speciesIds) {
    const base = `app/data/species/${species}/`;
    const [expenses, ...flowSources] = await Promise.all([
      source(`${base}expenses.ts`),
      source(`${base}preparation.ts`),
      source(`${base}feeding.ts`),
      source(`${base}journey.ts`),
      source(`${base}scenarios.ts`),
    ]);
    const catalogIds = new Set([...expenses.matchAll(/(?:\bid:\s*|initial\()"([^"]+)"/g)].map((match) => match[1]));
    const referencedIds = new Set();
    for (const data of flowSources) {
      for (const match of data.matchAll(/(?:expenseId|expenseIds|recurringExpenseIds)\s*:\s*(?:"([^"]+)"|\[([^\]]*)\])/gs)) {
        if (match[1]) referencedIds.add(match[1]);
        for (const literal of (match[2] ?? "").matchAll(/"([^"]+)"/g)) referencedIds.add(literal[1]);
      }
    }
    for (const expenseId of referencedIds) {
      assert.ok(catalogIds.has(expenseId), `${species} expense reference ${expenseId} must exist in expenses.ts`);
    }
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
    assert.match(notes, new RegExp(`export const ${species}CareReviewAdditionalNotes\\b`));
  }
});

test("dog and cat use the shared carrier while hamster uses its dedicated carrier", async () => {
  const [dog, cat, hamsterAssets] = await Promise.all([
    source("app/data/species/dog/preparation.ts"),
    source("app/data/species/cat/assets.ts"),
    source("app/data/species/hamster/assets.ts"),
  ]);
  assert.match(dog, /\/assets\/car\/carrier\.png/);
  assert.match(cat, /carrier:\s*"\/assets\/car\/carrier\.png"/);
  assert.match(hamsterAssets, /\/assets\/car\/hamster-carrier\.webp/);
  await Promise.all([
    access(new URL("public/assets/car/carrier.png", root)),
    access(new URL("public/assets/car/hamster-carrier.webp", root)),
  ]);
});
