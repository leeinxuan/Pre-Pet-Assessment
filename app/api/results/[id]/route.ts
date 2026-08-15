import { readSharedAssessmentResult } from "../../../../db/shared-results";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await readSharedAssessmentResult(id);
    if (!result) return Response.json({ error: "找不到這份結果" }, { status: 404, headers: { "cache-control": "private, no-store" } });
    return Response.json({ id, result }, { headers: { "cache-control": "private, no-store" } });
  } catch {
    return Response.json({ error: "目前無法讀取這份結果" }, { status: 500, headers: { "cache-control": "private, no-store" } });
  }
}
