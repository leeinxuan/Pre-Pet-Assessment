import { env } from "cloudflare:workers";
import type { SharedAssessmentResult } from "../app/shared-result-types";

const createTableSql = `
  CREATE TABLE IF NOT EXISTS shared_assessment_results (
    id TEXT PRIMARY KEY NOT NULL,
    payload TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )
`;

function getResultsDb() {
  if (!env.DB) throw new Error("Share result storage is unavailable");
  return env.DB;
}

async function ensureResultsTable() {
  await getResultsDb().prepare(createTableSql).run();
}

export async function saveSharedAssessmentResult(result: SharedAssessmentResult) {
  await ensureResultsTable();
  const id = crypto.randomUUID().replaceAll("-", "");
  await getResultsDb()
    .prepare("INSERT INTO shared_assessment_results (id, payload, created_at) VALUES (?, ?, ?)")
    .bind(id, JSON.stringify(result), Date.now())
    .run();
  return id;
}

export async function readSharedAssessmentResult(id: string) {
  if (!/^[a-f0-9]{32}$/.test(id)) return null;
  await ensureResultsTable();
  const row = await getResultsDb()
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
