import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("core accessibility landmarks, focus, and live updates remain available", async () => {
  const [layout, page, baseCss, shared] = await Promise.all([
    source("app/layout.tsx"),
    source("app/page.tsx"),
    source("app/styles/base.css"),
    source("app/components/shared/SharedComponents.tsx"),
  ]);

  assert.match(layout, /<html lang="zh-Hant">/);
  assert.match(layout, /<a className="skip-link" href="#main-content">跳到主要內容<\/a>/);
  assert.match(page, /<main ref=\{mainContentRef\} id="main-content" className="app-shell" tabIndex=\{-1\}>/);
  assert.match(page, /role="status" aria-live="polite" aria-atomic="true"/);
  assert.match(page, /heading\.focus\(\{ preventScroll: true \}\)/);
  assert.match(baseCss, /button:focus-visible[\s\S]*outline: 3px solid/);
  assert.match(baseCss, /\.skip-link:focus \{ transform: translateY\(0\); \}/);
  assert.match(shared, /aria-label="體驗進度"/);
  assert.match(shared, /function navigationStatusText/);
  assert.match(shared, /aria-label=\{`\$\{item\.number\} \$\{item\.label\}，\$\{navigationStatusText\(item\.status\)\}`\}/);
});

test("dialogs preserve keyboard focus and report validation is announced", async () => {
  const [dialogFocus, report, profileForm] = await Promise.all([
    source("app/components/shared/useDialogFocus.ts"),
    source("app/components/report/AssessmentReport.tsx"),
    source("app/components/report/ProfileForms.tsx"),
  ]);

  assert.match(dialogFocus, /if \(event\.key === "Escape"\)/);
  assert.match(dialogFocus, /if \(event\.key !== "Tab"\) return/);
  assert.match(dialogFocus, /previouslyFocused\?\.focus\(\)/);
  assert.match(dialogFocus, /document\.body\.style\.overflow = "hidden"/);
  assert.equal((report.match(/useDialogFocus\(\{/g) ?? []).length, 3);
  assert.equal((report.match(/role="dialog" aria-modal="true"/g) ?? []).length, 3);
  assert.match(profileForm, /role="alert" tabIndex=\{-1\}>請先完成或修正標示的欄位/);
  assert.match(profileForm, /aria-invalid=\{Boolean\(errors\.age\)\}/);
  assert.match(profileForm, /aria-invalid=\{Boolean\(errors\.monthlyBudget\)\}/);
});

test("drag interactions stay keyboard-operable without separate keyboard-instruction panels", async () => {
  const [walking, walkingData, catInspection, rabbitInspection, hamsterInspection] = await Promise.all([
    source("app/components/life/activities/daily-care/WalkingActivity.tsx"),
    source("app/data/species/dog/activities.ts"),
    source("app/components/life/activities/daily-care/CatDailyInspectionActivity.tsx"),
    source("app/components/life/activities/daily-care/RabbitDailyCheckActivity.tsx"),
    source("app/components/life/activities/daily-care/HamsterMorningInspectionActivity.tsx"),
  ]);

  for (const activity of [walking, catInspection, rabbitInspection, hamsterInspection]) {
    assert.doesNotMatch(activity, />鍵盤操作</);
    assert.doesNotMatch(activity, /keyboard-(?:steps|cleanup)/);
  }
  assert.match(walking, /aria-label=\{copy\.aria\.cleanupBag\}/);
  assert.match(walkingData, /cleanupBag: "使用撿便袋清理排泄物"/);
  assert.match(walking, /event\.detail === 0\) cleanupPoop\(\)/);
  assert.match(catInspection, /aria-label=\{keyboardStep\?\.select/);
  assert.match(catInspection, /aria-label=\{keyboardStep\?\.action/);
  assert.match(rabbitInspection, /aria-label="選取梳子"/);
  assert.match(rabbitInspection, /aria-label=\{`梳理\$\{current\.label\}`\}/);
  assert.match(hamsterInspection, /aria-label="清理髒污角落"/);
  assert.match(hamsterInspection, /aria-label="篩除砂浴盆雜質"/);
  assert.match(hamsterInspection, /aria-label=\{siftAcknowledged && !shakeComplete \? "完成水平搖晃砂浴盆"/);
});
