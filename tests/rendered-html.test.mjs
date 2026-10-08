import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://pet-ready.example/", {
      headers: { accept: "text/html", host: "pet-ready.example" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the pet readiness journey", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-Hant">/);
  assert.match(html, /慢慢來，先想想/);
  assert.match(html, /飼養前生活預演/);
  assert.match(html, /在把牠帶回家以前/);
  assert.match(html, /不評分/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("contains the five-unit journey and current project-owned artwork", async () => {
  const [page, appFlow, shared, sharedAssetData, preparation, dogPreparation, profileReport, dogJourney, dogScenarios, lifeComponents, activityUi, journeyTransitions, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/shared/app-flow.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/shared/SharedComponents.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/shared/assets.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/preparation/PreparationComponents.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/species/dog/preparation.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/report/AssessmentReport.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/species/dog/journey.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/species/dog/scenarios.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/life/LifeJourneyComponents.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/life/activities/activity-ui.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/life/activities/JourneyTransitions.tsx", import.meta.url), "utf8"),
    Promise.all(["base", "layout", "life", "preparation", "report", "selection"].map((name) => readFile(new URL(`../app/styles/${name}.css`, import.meta.url), "utf8"))).then((files) => files.join("\n")),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    access(new URL("../public/og.png", import.meta.url)),
    ...["hero-life-preview", "lifetime-costs", "scenario-grid", "prep-room"].map((name) => access(new URL(`../public/assets/welcome/${name}.webp`, import.meta.url))),
    access(new URL("../public/assets/dog/pet-journey/shiba/arrival-transition.mp4", import.meta.url)),
    access(new URL("../public/assets/dog/pet-journey/shiba/shiba-dog.png", import.meta.url)),
    ...["car-trunk", "id-card", "adoption-documents", "carrier", "pee-pad", "leash"].map((name) => access(new URL(`../public/assets/car/${name}.png`, import.meta.url))),
    ...["hamster-carrier", "water-bottle"].map((name) => access(new URL(`../public/assets/car/${name}.webp`, import.meta.url))),
    ...["empty-room", "empty-room-mobile", "pee-pad", "water-bowl", "cleaner", "food-bowl", "toy", "pet-bed", "food", "small-items", "detergent", "wire"].map((name) => access(new URL(`../public/assets/dog/room/${name}.png`, import.meta.url))),
    access(new URL("../public/assets/shared/nameplate.webp", import.meta.url)),
  ]);

  for (const label of ["選擇寵物", "飼養前準備", "飼養生活", "飼養觀念回顧", "取得寵物"]) {
    assert.match(appFlow, new RegExp(label));
  }
  assert.equal((appFlow.match(/\["0[1-5]",/g) ?? []).length, 5);

  for (const label of ["選擇物種", "家庭與居住確認", "布置生活空間", "出發前準備"]) {
    assert.match(shared, new RegExp(label));
  }
  assert.doesNotMatch(shared, /分配照顧工作/);
  assert.doesNotMatch(preparation, /CareTaskAssignment|分配照顧工作|檢查分工/);
  assert.match(sharedAssetData, /nameplate: "\/assets\/shared\/nameplate\.webp"/);
  assert.match(shared, /nameplate\.src = sharedAssets\.nameplate/);
  assert.match(shared, /<img src=\{sharedAssets\.nameplate\} width=\{2720\} height=\{1860\}/);

  const roomSection = preparation.slice(preparation.indexOf("export function RoomPreparation"), preparation.indexOf("export function CareMemberSetup"));
  assert.match(roomSection, /const activeRoomItems = speciesConfig\.roomItems/);
  assert.match(roomSection, /const requiredRoomItems = activeRoomItems\.filter/);
  assert.match(roomSection, /Math\.ceil\(activeRoomItems\.length \/ 2\)/);
  assert.match(roomSection, /activeRoomItems\.slice\(index \* 2, index \* 2 \+ 2\)/);
  assert.match(roomSection, /room-supply-row--\$\{row\.length\}/);
  assert.match(roomSection, /room-hazard-alert/);
  assert.match(roomSection, /activeHazard\.label\}已收起/);
  assert.match(roomSection, /為什麼危險/);
  assert.match(roomSection, /建議如何處理/);
  assert.match(roomSection, /room-actions-right[\s\S]*roomCheckMessage[\s\S]*完成房間檢查，準備出發/);
  assert.doesNotMatch(roomSection, /species\s*===|isDog|isCat|isRabbit|isBird|isHamster/);
  assert.doesNotMatch(roomSection, /draggable|onDragStart|onDragOver|onDrop/);

  const roomData = dogPreparation.slice(dogPreparation.indexOf("export const dogRoomItems"), dogPreparation.indexOf("export const dogHazards"));
  assert.equal((roomData.match(/image: "\/assets\/dog\/room\//g) ?? []).length, 7);
  assert.equal((roomData.match(/required: true/g) ?? []).length, 7);
  for (const id of ["bed", "toy", "water-bowl", "food-bowl", "toilet", "cleaner", "food"]) {
    assert.match(roomData, new RegExp(`id: "${id}"`));
  }
  assert.match(dogPreparation, /safeBackground: "\/assets\/dog\/room\/empty-room\.png"/);
  assert.match(dogPreparation, /safeMobileBackground: "\/assets\/dog\/room\/empty-room-mobile\.png"/);
  assert.match(dogPreparation, /doorplate: \{ image: sharedAssets\.nameplate/);
  assert.match(dogPreparation, /id: "toilet"[\s\S]*?x: 15, y: 85, width: 20, layer: 1/);
  assert.match(dogPreparation, /id: "water-bowl"[\s\S]*?x: 32, y: 90, width: 12, layer: 3/);
  assert.match(dogPreparation, /id: "food-bowl"[\s\S]*?x: 41, y: 90, width: 10, layer: 3/);
  assert.match(dogPreparation, /id: "bed"[\s\S]*?x: 67, y: 83, width: 32, layer: 2/);
  assert.match(dogPreparation, /id: "toy"[\s\S]*?x: 73, y: 80, width: 10, layer: 4[\s\S]*?required: true/);
  assert.match(dogPreparation, /id: "food"[\s\S]*?x: 50, y: 85, width: 9, layer: 3/);

  const trunkSection = preparation.slice(preparation.indexOf("export function CarTrunkPreparation"));
  assert.doesNotMatch(trunkSection, /species\s*===|isDog|isCat|isRabbit|isBird|isHamster/);
  assert.doesNotMatch(trunkSection, /draggable|onDragStart|onDragOver|onDrop/);
  assert.match(dogPreparation, /trunkBackground: "\/assets\/car\/car-trunk\.png"/);
  assert.match(dogPreparation, /documentFolderImage: "\/assets\/car\/adoption-documents\.png"/);
  assert.match(dogPreparation, /id: "carrier"[\s\S]*image: "\/assets\/car\/carrier\.png"/);
  assert.equal((dogPreparation.match(/kind: "document"/g) ?? []).length, 2);
  assert.equal((dogPreparation.match(/kind: "supply"/g) ?? []).length, 5);
  assert.match(dogPreparation, /expenseIds: \["carrier-kit"\]/);
  assert.match(dogPreparation, /expenseIds: \["toilet"\][\s\S]*reusedExpenseIds: \["toilet"\]/);

  assert.match(page, /expenseIds\.forEach\(\(expenseId\) => addExpenseById\(expenseId\)\)/);
  assert.match(page, /function addExpenseGroupByIds/);
  assert.match(page, /setPetName\(""\)/);
  assert.match(page, /setLifePhase\("arrival-video"\)/);
  assert.match(page, /setLifePhase\("life-journey"\)/);
  assert.match(page, /ExpenseRecord/);
  assert.match(page, /firstChoiceId/);
  assert.match(page, /LifeJourney/);
  assert.doesNotMatch(page, /LawStep|CostStep|lawAnswers|costIndex|name-pet|PetNaming/);

  for (const scenarioId of ["arrival-adjustment", "busy-daily-care", "illness-vet", "growing-old"]) {
    assert.match(dogScenarios, new RegExp(`id: "${scenarioId}"`));
  }
  assert.equal((dogJourney.match(/type: "scenario"/g) ?? []).length, 5);
  for (const activityType of ["walking", "breed-challenge"]) {
    assert.match(dogJourney, new RegExp(`type: "${activityType}"`));
  }
  assert.match(dogJourney, /一起生活的第一天[\s\S]*日常行為照顧[\s\S]*今天也要出門散步[\s\S]*品種的考驗[\s\S]*疲憊忙碌的日子[\s\S]*生病與就醫[\s\S]*小狗逐漸老去/);

  assert.match(journeyTransitions, /arrival-transition\.mp4/);
  assert.match(journeyTransitions, /arrival-video-screen/);
  assert.match(journeyTransitions, /autoPlay/);
  assert.match(journeyTransitions, /muted/);
  assert.match(journeyTransitions, /preload="auto"/);
  assert.match(journeyTransitions, /hasFinishedArrivalVideo/);
  assert.match(activityUi, /replaceAll\("小狗", displayName\)/);
  assert.match(activityUi, /replaceAll\("狗狗", displayName\)/);
  assert.doesNotMatch(lifeComponents, /量杯|飼料克數|每餐份量|餵食後觀察|是否吃完/);
  assert.match(profileReport, /petName/);
  assert.match(shared, /width=\{2720\} height=\{1860\}/);

  assert.match(css, /font-family: "Huninn"/);
  assert.match(css, /\.cost-bar/);
  assert.match(css, /\.room-supply-row \{ display: flex/);
  assert.match(css, /\.room-hazard-alert \{ position: absolute/);
  assert.match(css, /\.car-trunk-scene/);
  assert.match(css, /prep-room\.webp/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
