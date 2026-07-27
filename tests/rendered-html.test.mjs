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

test("contains the five-unit hierarchical journey and project-owned artwork", async () => {
  const [page, data, shared, preparation, profileReport, lifeData, lifeComponents, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/game-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/shared-components.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/preparation-components.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/profile-report-components.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/life-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/life-journey-components.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/illustrations/hero-life-preview.png", import.meta.url)),
    access(new URL("../public/illustrations/lifetime-costs.png", import.meta.url)),
    access(new URL("../public/illustrations/scenario-grid.png", import.meta.url)),
    access(new URL("../public/illustrations/prep-room.png", import.meta.url)),
    access(new URL("../public/assets/pet-journey/arrival-transition.mp4", import.meta.url)),
    access(new URL("../public/assets/pet-journey/shiba-dog.png", import.meta.url)),
    access(new URL("../public/car/後車箱.png", import.meta.url)),
    access(new URL("../public/car/身分證件.png", import.meta.url)),
    access(new URL("../public/car/文件.png", import.meta.url)),
    access(new URL("../public/car/外出籠.png", import.meta.url)),
    access(new URL("../public/car/尿墊.png", import.meta.url)),
    access(new URL("../public/car/水.png", import.meta.url)),
    access(new URL("../public/car/牽繩.png", import.meta.url)),
    access(new URL("../public/room/空房間.png", import.meta.url)),
    ...["尿墊", "水", "清潔用品", "狗碗", "玩具", "睡墊", "飼料", "小物品", "巧克力", "清潔劑", "電線"].map((name) => access(new URL(`../public/room/${name}.png`, import.meta.url))),
  ]);

  for (const label of ["選擇寵物", "領養前準備", "飼養生活", "認識你", "評估報告"]) {
    assert.match(data, new RegExp(label));
  }
  assert.equal((data.match(/\["0[1-5]",/g) ?? []).length, 5);
  for (const label of ["選擇物種", "選擇品種", "布置生活空間", "家庭成員與共同照護", "出發前準備", "接回家", "日常生活", "健康與意外", "生活變化"]) {
    assert.match(shared, new RegExp(label));
  }
  assert.doesNotMatch(shared, /分配照顧工作/);
  assert.doesNotMatch(preparation, /CareTaskAssignment|分配照顧工作|檢查分工/);
  assert.match(preparation, /\/room\/空房間\.png/);
  assert.doesNotMatch(preparation, /\/room\/垃圾桶\.png|將選取的危險物品放進垃圾桶|先點選物品，再點擊垃圾桶/);
  assert.doesNotMatch(preparation, /quiet-rest-area|feeding-area|toilet-area|storage-area|draggable|onDragStart|onDragOver|onDrop/);
  assert.match(preparation, /掛上名字牌/);
  assert.match(preparation, /用品準備箱/);
  assert.match(preparation, /件可加入/);
  assert.match(preparation, /用品已準備完成/);
  assert.doesNotMatch(preparation, /hazard-direct-panel|居家安全檢查完成|居家安全 0／4|居家安全 4／4/);
  assert.match(preparation, /為什麼危險/);
  assert.match(preparation, /建議如何處理/);
  assert.doesNotMatch(preparation, /hazard-panel/);
  const roomPreparationSection = preparation.slice(preparation.indexOf("export function RoomPreparation"), preparation.indexOf("export function CareMemberSetup"));
  assert.match(roomPreparationSection, /remainingRoomItems = roomItems\.filter/);
  assert.match(roomPreparationSection, /remainingRoomItems\.length <= 3/);
  assert.match(roomPreparationSection, /remainingRoomItems\.slice\(0, 2\)[\s\S]*remainingRoomItems\.slice\(2, 4\)[\s\S]*remainingRoomItems\.slice\(4\)/);
  assert.match(roomPreparationSection, /room-supply-row--\$\{row\.length\}/);
  assert.doesNotMatch(roomPreparationSection, /room-supply-check|aria-pressed|className=\{prepared/);
  assert.doesNotMatch(roomPreparationSection, /task-message|已自動配置完成|居家安全進度已更新/);
  assert.match(roomPreparationSection, /room-hazard-alert/);
  assert.match(roomPreparationSection, /activeHazard\.label\}已處理/);
  assert.match(roomPreparationSection, /roomCheckMessage/);
  assert.match(roomPreparationSection, /room-actions-right[\s\S]*roomCheckMessage[\s\S]*檢查房間[\s\S]*房間完成，設定照顧成員/);
  assert.match(css, /\.room-supply-row \{ display: flex/);
  assert.match(css, /\.room-supply-row button \{[\s\S]*border: 0;[\s\S]*background: transparent;[\s\S]*box-shadow: none/);
  assert.match(css, /\.room-hazard \{ position: absolute;[\s\S]*\.room-hazard img \{[\s\S]*animation: hazardPulse/);
  assert.match(css, /\.room-hazard-alert \{ position: absolute/);
  const roomData = data.slice(data.indexOf("export const roomItems"), data.indexOf("export const hazards"));
  assert.equal((roomData.match(/image: "\/room\//g) ?? []).length, 7);
  assert.equal((roomData.match(/required: true/g) ?? []).length, 7);
  for (const id of ["bed", "toy", "water-bowl", "food-bowl", "toilet", "cleaner", "food"]) assert.match(roomData, new RegExp(`id: "${id}"`));
  assert.doesNotMatch(roomData, /id: "carrier"|id: "leash"|preparationMode|recommendedZone|displayInRoom/);
  assert.match(data, /id: "toilet"[\s\S]*?x: 15, y: 85, width: 20, layer: 1/);
  assert.match(data, /id: "water-bowl"[\s\S]*?x: 35, y: 90, width: 12, layer: 3/);
  assert.match(data, /id: "food-bowl"[\s\S]*?x: 45, y: 90, width: 12, layer: 3/);
  assert.match(data, /id: "bed"[\s\S]*?x: 67, y: 83, width: 32, layer: 2/);
  assert.match(data, /id: "toy"[\s\S]*?x: 73, y: 80, width: 10, layer: 4[\s\S]*?required: true/);
  assert.match(data, /id: "food"[\s\S]*?x: 53, y: 87, width: 15, layer: 3/);
  assert.match(preparation, /pet-name-overlay/);
  assert.match(preparation, /dismissingHazard/);
  assert.match(preparation, /activeHazard\.danger/);
  assert.match(preparation, /activeHazard\.handling/);
  const trunkSection = preparation.slice(preparation.indexOf("export function CarTrunkPreparation"));
  assert.match(trunkSection, /\/car\/後車箱\.png/);
  assert.match(trunkSection, /A\. 準備文件/);
  assert.match(trunkSection, /B\. 準備接回用品/);
  assert.match(trunkSection, /檢查準備/);
  assert.match(trunkSection, /\/car\/尿墊\.png/);
  assert.doesNotMatch(trunkSection, /draggable|onDragStart|onDragOver|onDrop/);
  assert.equal((data.match(/kind: "document"/g) ?? []).length, 2);
  assert.equal((data.match(/kind: "supply"/g) ?? []).length, 4);
  assert.equal((data.match(/sourceLabel:/g) ?? []).length, 6);
  assert.match(data, /id: "carrier-kit"/);
  assert.match(data, /expenseIds: \["carrier", "toilet"\]/);
  assert.match(page, /expenseIds\.forEach\(addExpenseById\)/);
  assert.match(css, /\.car-trunk-scene/);
  assert.match(shared, /mobile-progress-nav/);
  assert.doesNotMatch(preparation, /02 · 領養前準備/);
  assert.doesNotMatch(profileReport, /07 · 回到真實的你|08 · 我的飼養準備報告/);
  assert.doesNotMatch(lifeComponents, /飼養生活 · 豆豆的一生/);
  for (const scenarioId of ["arrival-adjustment", "behavior-guidance", "busy-daily-care", "illness-vet", "owner-life-change", "growing-old", "late-life-companionship"]) {
    assert.match(lifeData, new RegExp(scenarioId));
  }
  assert.equal((lifeData.match(/type: "scenario"/g) ?? []).length, 7);
  assert.equal((lifeData.match(/type: "(body-language|feeding|body-care|senior-room)"/g) ?? []).length, 4);
  assert.match(lifeData, /一起生活的第一天[\s\S]*適應新家的時候[\s\S]*一起生活三個月[\s\S]*逐漸長大的時候[\s\S]*穩定生活的日常[\s\S]*成年後的例行照顧[\s\S]*健康出現變化[\s\S]*飼主生活發生改變[\s\S]*逐漸進入高齡[\s\S]*調整高齡生活空間[\s\S]*生命後段的陪伴/);
  assert.match(lifeComponents, /arrival-transition\.mp4/);
  assert.match(lifeComponents, /arrival-video-screen/);
  assert.match(lifeComponents, /autoPlay/);
  assert.match(lifeComponents, /muted/);
  assert.match(lifeComponents, /preload="auto"/);
  assert.match(lifeComponents, /onEnded=\{finishArrivalVideo\}/);
  assert.match(lifeComponents, /hasFinishedArrivalVideo/);
  assert.match(lifeComponents, /prefers-reduced-motion: reduce/);
  assert.match(lifeComponents, /小狗搭乘外出籠抵達新家的過場動畫/);
  assert.doesNotMatch(lifeComponents, /arrival-video-next|arrival-video-play|togglePlayback|continueToNaming/);
  assert.doesNotMatch(lifeComponents, /一起回到新家|影片播放完畢|略過影片|播放影片中|影片暫時無法載入/);
  assert.doesNotMatch(lifeComponents, /<video[\s\S]*?controls/);
  assert.doesNotMatch(lifeComponents, /PetNaming|歡迎來到新家|牠叫什麼名字？/);
  assert.doesNotMatch(lifeComponents, /返回命名頁面/);
  assert.match(lifeComponents, /返回出發前準備/);
  assert.match(preparation, /請先幫小狗取一個名字。/);
  assert.match(preparation, /名字請控制在12個字以內。/);
  assert.match(lifeComponents, /replaceAll\("小狗", petName\)/);
  assert.match(lifeComponents, /replaceAll\("狗狗", petName\)/);
  assert.match(lifeComponents, /準備\{petName\}的晚餐/);
  assert.match(page, /setPetName\(""\)/);
  assert.match(page, /setLifePhase\("arrival-video"\)/);
  assert.doesNotMatch(css, /\.arrival-video-next|\.arrival-video-play/);
  assert.doesNotMatch(page, /name-pet|PetNaming/);
  assert.match(page, /setLifePhase\("life-journey"\)/);
  assert.match(profileReport, /petName/);
  assert.doesNotMatch(lifeComponents, /量杯|飼料克數|每餐份量|餵食後觀察|是否吃完/);
  assert.doesNotMatch(page, /LawStep|CostStep|lawAnswers|costIndex/);
  assert.match(page, /ExpenseRecord/);
  assert.match(page, /firstChoiceId/);
  assert.match(page, /LifeJourney/);
  assert.match(css, /family=Huninn/);
  assert.match(css, /\.cost-bar/);
  assert.match(css, /scenario-grid\.png/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
