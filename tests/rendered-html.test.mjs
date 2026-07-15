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

test("contains all seven experience stages, lifetime cost math, and project-owned artwork", async () => {
  const [page, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/illustrations/hero-life-preview.png", import.meta.url)),
    access(new URL("../public/illustrations/lifetime-costs.png", import.meta.url)),
    access(new URL("../public/illustrations/scenario-grid.png", import.meta.url)),
    access(new URL("../public/illustrations/prep-room.png", import.meta.url)),
  ]);

  for (const label of ["選擇夥伴", "法規暖身", "認識你", "費用開箱", "生活預演", "準備房間", "準備摘要"]) {
    assert.match(page, new RegExp(label));
  }
  for (const axis of ["A1 物種認識與天性", "A2 空間與環境條件", "A3 飲食與食性", "A4 健康與醫療", "A5 行為、互動與家庭相處", "A6 時間與生活型態", "A7 花費與經濟能力", "A8 飼養動機與可持續性", "A9 法規、責任與合法取得"]) {
    assert.match(page, new RegExp(axis));
  }
  assert.match(page, /3600 \* 12 \* estimatedLifespan/);
  assert.match(page, /12800 \* estimatedLifespan/);
  assert.match(css, /family=Huninn/);
  assert.match(css, /@keyframes swipeLeft/);
  assert.match(css, /scenario-grid\.png/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
