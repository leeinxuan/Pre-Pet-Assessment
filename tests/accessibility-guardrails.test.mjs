import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

function relativeLuminance(hex) {
  const channels = hex.match(/[\da-f]{2}/gi).map((channel) => Number.parseInt(channel, 16) / 255);
  const [red, green, blue] = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(first, second) {
  const firstLuminance = relativeLuminance(first);
  const secondLuminance = relativeLuminance(second);
  return (Math.max(firstLuminance, secondLuminance) + 0.05) / (Math.min(firstLuminance, secondLuminance) + 0.05);
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

test("semantic status colors retain readable contrast", async () => {
  const [baseCss, layoutCss, selectionCss, lifeCss] = await Promise.all([
    source("app/styles/base.css"),
    source("app/styles/layout.css"),
    source("app/styles/selection.css"),
    source("app/styles/life.css"),
  ]);

  const token = (name) => baseCss.match(new RegExp(`--${name}: #(\\w{6})`))?.[1];
  assert.ok(contrastRatio(token("gold-dark"), "ffffff") >= 4.5);
  assert.ok(contrastRatio(token("mint-dark"), "ffffff") >= 4.5);
  assert.ok(contrastRatio(token("orange-dark"), "fffdf7") >= 4.5);
  assert.match(baseCss, /focus-visible[^}]+outline: 3px solid var\(--gold-dark\)/);
  assert.match(layoutCss, /nav-child\.current button span[^}]+background: var\(--gold-dark\)/);
  assert.match(selectionCss, /button\.selected[^}]+border: 2px solid var\(--gold-dark\)/);
  assert.match(lifeCss, /scenario-option-selected-mark[^}]+background: var\(--mint-dark\)/);
});

test("tab lists support roving focus and arrow-key activation", async () => {
  const [tabKeyboard, roomMobile, preparation, walking] = await Promise.all([
    source("app/components/shared/tabKeyboardNavigation.ts"),
    source("app/components/preparation/RoomPreparationMobile.tsx"),
    source("app/components/preparation/PreparationComponents.tsx"),
    source("app/components/life/activities/daily-care/WalkingActivity.tsx"),
  ]);

  for (const key of ["ArrowLeft", "ArrowRight", "Home", "End"]) assert.match(tabKeyboard, new RegExp(`"${key}"`));
  assert.match(tabKeyboard, /\[role="tab"\]:not\(:disabled\)/);
  assert.match(tabKeyboard, /tabs\[nextIndex\]\.focus\(\)/);
  assert.match(tabKeyboard, /tabs\[nextIndex\]\.click\(\)/);
  for (const tabListSource of [roomMobile, preparation, walking]) {
    assert.match(tabListSource, /role="tablist"[^>]+onKeyDown=\{handleTabListKeyDown\}/);
    assert.match(tabListSource, /role="tab"[^>]+aria-controls=/);
    assert.match(tabListSource, /role="tab"[^>]+tabIndex=/);
    assert.match(tabListSource, /role="tabpanel"[^>]+aria-labelledby=/);
  }
});

test("video media exposes text alternatives and caption hooks", async () => {
  const [scenarioUi, transitions, birdInspection, gameTypes] = await Promise.all([
    source("app/components/life/activities/scenario-ui.tsx"),
    source("app/components/life/activities/JourneyTransitions.tsx"),
    source("app/components/life/activities/daily-care/BirdCageInspectionActivity.tsx"),
    source("app/game-types.ts"),
  ]);

  assert.match(scenarioUi, /const descriptionId = useId\(\)/);
  assert.match(scenarioUi, /aria-describedby=\{descriptionId\}/);
  assert.match(scenarioUi, /<track kind="captions"[^>]+srcLang="zh-Hant"/);
  assert.match(gameTypes, /textAlternative\?: string/);
  assert.match(gameTypes, /captionsSrc\?: string/);
  assert.match(transitions, /aria-describedby="arrival-transition-description"/);
  assert.match(transitions, /aria-describedby="time-pass-transition-description"/);
  assert.match(transitions, /aria-describedby="busy-care-transition-description"/);
  assert.match(birdInspection, /<video autoPlay muted playsInline aria-hidden="true"/);
});

test("dialogs preserve keyboard focus and report validation is announced", async () => {
  const [dialogFocus, report, profileForm, mobileInfoSheet, roomMobile, preparation, arrivalMeal, rabbitInspection, birdInspection, geckoInspection] = await Promise.all([
    source("app/components/shared/useDialogFocus.ts"),
    source("app/components/report/AssessmentReport.tsx"),
    source("app/components/report/ProfileForms.tsx"),
    source("app/components/shared/MobileInfoSheet.tsx"),
    source("app/components/preparation/RoomPreparationMobile.tsx"),
    source("app/components/preparation/PreparationComponents.tsx"),
    source("app/components/life/activities/ArrivalMealActivity.tsx"),
    source("app/components/life/activities/daily-care/RabbitDailyCheckActivity.tsx"),
    source("app/components/life/activities/daily-care/BirdCageInspectionActivity.tsx"),
    source("app/components/life/activities/daily-care/GeckoHealthInspectionActivity.tsx"),
  ]);

  assert.match(dialogFocus, /if \(event\.key === "Escape"\)/);
  assert.match(dialogFocus, /if \(event\.key !== "Tab"\) return/);
  assert.match(dialogFocus, /previouslyFocused\.focus\(\)/);
  assert.match(dialogFocus, /const returnTarget = resolveReturnFocus\?\.\(\)/);
  assert.match(dialogFocus, /document\.body\.style\.overflow = "hidden"/);
  assert.equal((report.match(/useDialogFocus\(\{/g) ?? []).length, 3);
  assert.equal((report.match(/role="dialog" aria-modal="true"/g) ?? []).length, 3);
  for (const modalSource of [mobileInfoSheet, roomMobile, preparation, arrivalMeal, rabbitInspection, birdInspection, geckoInspection]) {
    assert.match(modalSource, /useDialogFocus\(\{/);
    assert.match(modalSource, /role="dialog" aria-modal="true"/);
    assert.match(modalSource, /tabIndex=\{-1\}/);
  }
  assert.match(roomMobile, /getReturnFocus: getInfoReturnFocus/);
  assert.match(roomMobile, /data-room-info-id=\{item\.id\}/);
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
  assert.match(hamsterInspection, /aria-label="篩除砂浴盆排泄物"/);
  assert.match(hamsterInspection, /aria-label=\{siftAcknowledged && !shakeComplete \? "完成水平搖晃砂浴盆"/);
});
