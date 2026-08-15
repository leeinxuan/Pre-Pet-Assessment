import { saveSharedAssessmentResult } from "../../../db/shared-results";
import type { SharedAssessmentResult } from "../../shared-result-types";

function isShortText(value: unknown, maxLength = 500): value is string {
  return typeof value === "string" && value.length <= maxLength;
}

function isTextList(value: unknown, maxItems = 30): value is string[] {
  return Array.isArray(value) && value.length <= maxItems && value.every((item) => isShortText(item));
}

function isSharedResult(value: unknown): value is SharedAssessmentResult {
  if (!value || typeof value !== "object") return false;
  const result = value as Partial<SharedAssessmentResult>;
  return result.version === 1
    && isShortText(result.createdAt, 40)
    && !Number.isNaN(Date.parse(result.createdAt))
    && isShortText(result.petName, 40)
    && isShortText(result.breedId, 80)
    && isShortText(result.breedLabel, 80)
    && isShortText(result.readinessLevel, 100)
    && typeof result.preparation?.roomCompletion === "number"
    && result.preparation.roomCompletion >= 0
    && result.preparation.roomCompletion <= 100
    && typeof result.preparation.hazardsComplete === "boolean"
    && typeof result.preparation.transportComplete === "boolean"
    && typeof result.costs?.simulatedTotal === "number"
    && typeof result.costs.emergencyReserve === "number"
    && typeof result.costs.suggestedTotal === "number"
    && isTextList(result.preparedItems)
    && isTextList(result.itemsToConfirm)
    && Array.isArray(result.discussionTopics)
    && result.discussionTopics.length <= 20
    && result.discussionTopics.every((topic) => isShortText(topic?.id, 100)
      && isShortText(topic?.title, 300)
      && isShortText(topic?.topic, 150)
      && isTextList(topic?.knowledgePoints, 10))
    && typeof result.committed === "boolean";
}

export async function POST(request: Request) {
  try {
    const result: unknown = await request.json();
    const serialized = JSON.stringify(result);
    if (!isSharedResult(result) || serialized.length > 50_000) {
      return Response.json({ error: "結果資料格式不正確" }, { status: 400, headers: { "cache-control": "no-store" } });
    }
    const id = await saveSharedAssessmentResult(result);
    const url = new URL(`/results/${id}`, request.url).toString();
    return Response.json({ id, url }, { headers: { "cache-control": "no-store" } });
  } catch {
    return Response.json({ error: "目前無法產生分享連結，請稍後再試。" }, { status: 500, headers: { "cache-control": "no-store" } });
  }
}
