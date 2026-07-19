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

test("contains the eight-stage adoption timeline and project-owned artwork", async () => {
  const [page, data, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/game-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/illustrations/hero-life-preview.png", import.meta.url)),
    access(new URL("../public/illustrations/lifetime-costs.png", import.meta.url)),
    access(new URL("../public/illustrations/scenario-grid.png", import.meta.url)),
    access(new URL("../public/illustrations/prep-room.png", import.meta.url)),
  ]);

  for (const label of ["選擇寵物", "領養前準備", "接回家", "日常生活", "健康與意外", "生活變化", "認識你", "評估報告"]) {
    assert.match(data, new RegExp(label));
  }
  for (const scenarioId of ["ride-home", "first-door", "first-meal", "hiding", "night-anxiety", "chewing-toilet", "daily-feeding", "exercise", "grooming", "low-appetite", "contact-vet", "medical-cost", "travel", "work-change", "moving", "senior-life"]) {
    assert.match(data, new RegExp(scenarioId));
  }
  assert.doesNotMatch(page, /LawStep|CostStep|lawAnswers|costIndex/);
  assert.match(page, /ExpenseRecord/);
  assert.match(page, /firstChoiceId/);
  assert.match(css, /family=Huninn/);
  assert.match(css, /\.cost-bar/);
  assert.match(css, /scenario-grid\.png/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
