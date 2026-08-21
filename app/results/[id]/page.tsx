"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { SharedAssessmentRecord } from "../../shared-result-types";

const currency = new Intl.NumberFormat("zh-TW");

export default function SharedResultPage() {
  const params = useParams<{ id: string }>();
  const [record, setRecord] = useState<SharedAssessmentRecord | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/results/${encodeURIComponent(params.id)}`)
      .then(async (response) => {
        const body = await response.json() as SharedAssessmentRecord & { error?: string };
        if (!response.ok) throw new Error(body.error || "找不到這份結果");
        setRecord(body);
      })
      .catch((reason: Error) => setError(reason.message));
  }, [params.id]);

  if (error) {
    return <main className="shared-result-state"><h1>這份結果目前無法開啟</h1><p>{error}</p><Link href="/">回到伴日子新手村</Link></main>;
  }
  if (!record) return <main className="shared-result-state"><p>正在整理照顧準備總覽…</p></main>;

  const result = record.result;
  return (
    <main className="shared-result-page">
      <header className="shared-result-hero">
        <div><p>伴日子新手村 · 分享結果</p><h1>{result.petName ? `${result.petName}的` : "我的"}照顧準備總覽</h1><span>{result.breedLabel} · {new Date(result.createdAt).toLocaleDateString("zh-TW")}</span></div>
        <aside><small>目前狀態</small><b>{result.readinessLevel}</b></aside>
      </header>

      <section className="shared-result-grid" aria-label="準備狀態摘要">
        <article><span>{result.preparation.roomCompletion}%</span><b>生活空間準備</b></article>
        <article><span>{result.preparation.hazardsComplete ? "完成" : "待確認"}</span><b>危險物防護</b></article>
        <article><span>{result.preparation.transportComplete ? "完成" : "待確認"}</span><b>接回與運輸準備</b></article>
      </section>

      {result.discussionTopics.length > 0 ? (
        <section className="shared-discussion-section" aria-labelledby="shared-discussion-title">
          <div className="shared-section-heading"><span aria-hidden="true">△</span><div><h2 id="shared-discussion-title">建議再深入討論的題目</h2><p>這些題目可以特別再複習一次相關的知識點。</p></div></div>
          <div className="shared-discussion-list">
            {result.discussionTopics.map((topic) => (
              <details key={topic.id}>
                <summary><span>△</span><div><b>{topic.title}</b><small>{topic.summary ?? topic.topic}</small></div><em>查看知識點</em></summary>
                <ul>{topic.knowledgePoints.map((point) => <li key={point}>{point}</li>)}</ul>
              </details>
            ))}
          </div>
        </section>
      ) : <section className="shared-all-clear"><span>✓</span><div><h2>目前沒有需要特別標示的題目</h2><p>仍可以帶著這份摘要和家人討論實際分工與生活安排。</p></div></section>}

      <section className="shared-result-lists">
        <article><h2>已具備的準備</h2><ul>{result.preparedItems.map((item) => <li key={item}>✓ {item}</li>)}</ul></article>
        <article><h2>接下來要確認</h2><ul>{result.itemsToConfirm.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </section>

      <section className="shared-result-costs">
        <div><h2>照顧費用摘要</h2><p>費用為互動過程中的模擬估算，實際金額仍需依地區、體型與健康狀況確認。這筆金額用來模擬一次突發就醫時的現金緩衝，不代表能支付完整治療，也不是狗狗一生的醫療費。</p></div>
        <dl><div><dt>模擬支出</dt><dd>NT$ {currency.format(result.costs.simulatedTotal)}</dd></div><div><dt>初始醫療應急金</dt><dd>NT$ {currency.format(result.costs.emergencyReserve)}</dd></div><div className="shared-result-cost-total"><dt>最低應準備金額</dt><dd>NT$ {currency.format(result.costs.suggestedTotal)}</dd></div></dl>
      </section>

      <footer className="shared-result-footer"><p>{result.committed ? "✓ 產生連結時，飼主已勾選照顧承諾。" : "這份摘要產生時尚未勾選照顧承諾。"}</p><small>此分享頁不包含居家照片、家庭成員姓名或其他個人資料。</small><Link href="/">我也要做飼主準備度練習</Link></footer>
    </main>
  );
}
