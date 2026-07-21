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
  ]);

  for (const label of ["選擇寵物", "領養前準備", "飼養生活", "認識你", "評估報告"]) {
    assert.match(data, new RegExp(label));
  }
  assert.equal((data.match(/\["0[1-5]",/g) ?? []).length, 5);
  for (const label of ["選擇物種", "選擇品種", "布置生活空間", "建立照顧成員", "整理汽車後車廂", "接回家", "日常生活", "健康與意外", "生活變化"]) {
    assert.match(shared, new RegExp(label));
  }
  assert.doesNotMatch(shared, /分配照顧工作/);
  assert.doesNotMatch(preparation, /CareTaskAssignment|分配照顧工作|檢查分工/);
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
  assert.match(lifeComponents, /shiba-dog\.png/);
  assert.match(lifeComponents, /影片播放完畢/);
  assert.match(lifeComponents, /略過影片/);
  assert.match(lifeComponents, /歡迎來到新家/);
  assert.match(lifeComponents, /牠叫什麼名字？/);
  assert.match(lifeComponents, /用這個名字開始生活旅程/);
  assert.match(lifeComponents, /請先幫小狗取一個名字。/);
  assert.match(lifeComponents, /名字請控制在12個字以內。/);
  assert.match(lifeComponents, /replaceAll\("小狗", petName\)/);
  assert.match(lifeComponents, /replaceAll\("狗狗", petName\)/);
  assert.match(lifeComponents, /準備\{petName\}的晚餐/);
  assert.match(page, /setPetName\(""\)/);
  assert.match(page, /setLifePhase\("arrival-video"\)/);
  assert.match(page, /setLifePhase\("name-pet"\)/);
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
