import assert from "node:assert/strict";
import test from "node:test";
import { isTestModeEntryUrl } from "../app/components/shared/useTestModeEntry.ts";

test("test-mode entry appears only with ?test=1", () => {
  assert.equal(isTestModeEntryUrl("?test=1"), true);
  assert.equal(isTestModeEntryUrl("?foo=bar&test=1"), true);
  // 一般玩家的網址，或其他值都不能開啟入口。
  for (const search of ["", "?test=0", "?test=true", "?test", "?testing=1"]) {
    assert.equal(isTestModeEntryUrl(search), false, `${search || "(empty)"} must not show the entry`);
  }
});
