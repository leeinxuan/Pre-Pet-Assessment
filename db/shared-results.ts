import type { SharedAssessmentResult } from "../app/shared-result-types";

const createTableSql = `
  CREATE TABLE IF NOT EXISTS shared_assessment_results (
    id TEXT PRIMARY KEY NOT NULL,
    payload TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )
`;

function getResultsDb() {
  const runtime = globalThis as typeof globalThis & { __PRE_PET_RESULTS_DB__?: D1Database };
  if (!runtime.__PRE_PET_RESULTS_DB__) throw new Error("Share result storage is unavailable");
  return runtime.__PRE_PET_RESULTS_DB__;
}

async function ensureResultsTable() {
  const db = getResultsDb();
  await db.prepare(createTableSql).run();
  return db;
}

export async function saveSharedAssessmentResult(result: SharedAssessmentResult) {
  const db = await ensureResultsTable();
  const id = crypto.randomUUID().replaceAll("-", "");
  await db
    .prepare("INSERT INTO shared_assessment_results (id, payload, created_at) VALUES (?, ?, ?)")
    .bind(id, JSON.stringify(result), Date.now())
    .run();
  return id;
}

export async function readSharedAssessmentResult(id: string) {
  if (!/^[a-f0-9]{32}$/.test(id)) return null;
  const db = await ensureResultsTable();
  const row = await db
    .prepare("SELECT payload FROM shared_assessment_results WHERE id = ? LIMIT 1")
    .bind(id)
    .first<{ payload: string }>();
  if (!row) return null;
  try {
    return JSON.parse(row.payload) as SharedAssessmentResult;
  } catch {
    return null;
  }
}
