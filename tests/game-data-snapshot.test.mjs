import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { after, test } from "node:test";
import { buildGameDataSnapshot } from "./helpers/game-data-snapshot.mjs";
import { closeAppModuleLoader } from "./helpers/load-app-module.mjs";

/**
 * 遊戲資料快照：重構時用來確認「文案、金額、ID、座標、流程」完全沒變。
 * 有意修改遊戲資料時，執行 `pnpm test:update-snapshot` 更新快照，並在 commit 中一併檢查快照差異。
 */
const snapshotDir = new URL("./snapshots/game-data/", import.meta.url);
const updating = process.env.UPDATE_GAME_DATA_SNAPSHOT === "1";

after(closeAppModuleLoader);

function firstDifferences(expected, actual, path = "", found = []) {
  if (found.length >= 8 || JSON.stringify(expected) === JSON.stringify(actual)) return found;
  const bothObjects = expected && actual && typeof expected === "object" && typeof actual === "object";
  if (!bothObjects || Array.isArray(expected) !== Array.isArray(actual)) {
    found.push(`${path || "(root)"}\n      快照: ${JSON.stringify(expected)?.slice(0, 160)}\n      目前: ${JSON.stringify(actual)?.slice(0, 160)}`);
    return found;
  }
  for (const key of new Set([...Object.keys(expected), ...Object.keys(actual)])) {
    firstDifferences(expected[key], actual[key], Array.isArray(expected) ? `${path}[${key}]` : `${path}.${key}`, found);
  }
  return found;
}

test("game data matches the committed snapshot", async () => {
  const snapshot = await buildGameDataSnapshot();
  if (updating) await mkdir(snapshotDir, { recursive: true });

  for (const [name, data] of Object.entries(snapshot)) {
    const file = new URL(`${name}.json`, snapshotDir);
    if (updating) {
      await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
      continue;
    }
    const stored = JSON.parse(await readFile(file, "utf8").catch(() => {
      throw new Error(`缺少 tests/snapshots/game-data/${name}.json，請執行 pnpm test:update-snapshot`);
    }));
    const differences = firstDifferences(stored, data);
    assert.equal(
      differences.length,
      0,
      `${name} 的遊戲資料和快照不同（若是有意修改，請執行 pnpm test:update-snapshot）：\n    ${differences.join("\n    ")}`,
    );
  }
});
