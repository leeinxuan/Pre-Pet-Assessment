"use client";

import { useEffect, useRef, useState } from "react";
import type { Profile } from "../../game-types";
import { loadRetriableModule } from "../shared/AsyncFlowState";
import { COMPACT_PORTRAIT_LAYOUT_QUERY } from "../shared/responsive";

type ReportPdfKind = "overview" | "profile";

function useMobileDownloadMode() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(COMPACT_PORTRAIT_LAYOUT_QUERY);
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);
  return mobile;
}

const downloadIcon = <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path d="M12 3a1 1 0 0 1 1 1v9.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.4l3.3 3.3V4a1 1 0 0 1 1-1Z" />
  <path d="M5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z" />
</svg>;

export function LazyPdfDownloadButton({ petName, kind = "overview", label, profile, selectedTypeLabel, onBeforeDownload, onAfterDownload }: {
  petName: string;
  kind?: ReportPdfKind;
  label?: string;
  profile?: Profile;
  selectedTypeLabel?: string;
  onBeforeDownload?: () => void | Promise<void>;
  onAfterDownload?: () => void;
}) {
  const [generating, setGenerating] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const preparedUrlRef = useRef("");
  const mobileDownload = useMobileDownloadMode();
  const previewOnMobile = mobileDownload;
  const buttonLabel = label ?? (kind === "profile" ? "下載個人資料" : "下載照顧準備總覽");

  useEffect(() => {
    if (!previewOnMobile) return;
    let cancelled = false;
    if (preparedUrlRef.current) URL.revokeObjectURL(preparedUrlRef.current);
    preparedUrlRef.current = "";
    const prepare = async () => {
      try {
        await onBeforeDownload?.();
        const pdf = await loadRetriableModule(() => import("./PdfExportControls"));
        const { blob } = await pdf.createAssessmentPdf(petName, kind, profile, selectedTypeLabel);
        if (!cancelled) preparedUrlRef.current = URL.createObjectURL(blob);
      } catch (prepareError) {
        if (!cancelled) {
          console.error("Assessment export failed.", prepareError);
          setError("PDF下載失敗，請再試一次。");
        }
      } finally {
        if (!cancelled) {
          onAfterDownload?.();
          setGenerating(false);
        }
      }
    };
    // Profile fields can still change on the acquisition page. Regenerate
    // after editing settles so the opened PDF always contains the latest data.
    const timer = window.setTimeout(() => {
      setGenerating(true);
      setCompleted(false);
      void prepare();
    }, kind === "profile" ? 600 : 0);
    return () => { cancelled = true; window.clearTimeout(timer); };
    // The export callbacks are recreated on render but do not change the data.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewOnMobile, petName, kind, profile, selectedTypeLabel, retryCount]);

  useEffect(() => () => {
    if (preparedUrlRef.current) URL.revokeObjectURL(preparedUrlRef.current);
  }, []);

  const preparePdf = async () => {
    if (generating) return;
    if (previewOnMobile) {
      if (!preparedUrlRef.current) {
        setError("");
        setRetryCount((count) => count + 1);
        return;
      }
      const opened = window.open(preparedUrlRef.current, "_blank");
      if (!opened) setError("無法開啟 PDF 分頁，請允許此網站開啟彈出視窗後再試一次。");
      else { opened.opener = null; setError(""); setCompleted(true); }
      return;
    }
    setGenerating(true);
    setCompleted(false);
    setError("");
    try {
      await onBeforeDownload?.();
      const pdf = await loadRetriableModule(() => import("./PdfExportControls"));
      await pdf.downloadAssessmentPdf(petName, kind, profile, selectedTypeLabel);
      setCompleted(true);
    } catch (downloadError) {
      console.error("Assessment export failed.", downloadError);
      setError("PDF下載失敗，請再試一次。");
    } finally {
      onAfterDownload?.();
      setGenerating(false);
    }
  };

  return <div className="report-download-control">
    {error && <p className="pdf-download-error" role="alert">{error}</p>}
    <button type="button" className={`primary pdf-download-button ${generating ? "is-generating" : ""}`} onClick={preparePdf} disabled={generating} aria-label={buttonLabel} title="下載 PDF">
        {generating ? <span className="pdf-download-spinner" aria-hidden="true" /> : downloadIcon}
        <span>{generating ? (kind === "overview" ? "正在整理你的照護指南…" : "正在整理你的個人資料…") : completed ? (kind === "overview" ? "照護指南已下載" : "個人資料已下載") : buttonLabel}</span>
    </button>
  </div>;
}
