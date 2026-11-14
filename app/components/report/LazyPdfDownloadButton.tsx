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
  const [previewUrl, setPreviewUrl] = useState("");
  const previewUrlRef = useRef("");
  const mobileDownload = useMobileDownloadMode();
  const previewOnMobile = mobileDownload && kind === "overview";
  const buttonLabel = label ?? (kind === "profile" ? "下載個人資料" : "下載照顧準備總覽");

  useEffect(() => () => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
  }, []);

  const preparePdf = async () => {
    if (generating) return;
    setGenerating(true);
    setCompleted(false);
    setError("");
    try {
      await onBeforeDownload?.();
      const pdf = await loadRetriableModule(() => import("./PdfExportControls"));
      if (previewOnMobile) {
        const { blob } = await pdf.createAssessmentPdf(petName, kind, profile, selectedTypeLabel);
        const url = URL.createObjectURL(blob);
        if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = url;
        setPreviewUrl(url);
      } else {
        await pdf.downloadAssessmentPdf(petName, kind, profile, selectedTypeLabel);
        setCompleted(true);
      }
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
    {previewOnMobile && previewUrl ? (
      <a className="primary pdf-download-button" href={previewUrl} target="_blank" rel="noopener noreferrer" type="application/pdf" aria-label={buttonLabel} title="在新分頁檢視 PDF" style={{ textDecoration: "none" }}>
        {downloadIcon}<span>{buttonLabel}</span>
      </a>
    ) : (
      <button type="button" className={`primary pdf-download-button ${generating ? "is-generating" : ""}`} onClick={preparePdf} disabled={generating} aria-label={buttonLabel} title="下載 PDF">
        {generating ? <span className="pdf-download-spinner" aria-hidden="true" /> : downloadIcon}
        <span>{generating ? (kind === "overview" ? "正在整理你的照護指南…" : "正在整理你的個人資料…") : completed ? (kind === "overview" ? "照護指南已下載" : "個人資料已下載") : buttonLabel}</span>
      </button>
    )}
    {previewOnMobile && previewUrl && <span role="status" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>PDF 已準備好，請再點一次按鈕在新分頁檢視。</span>}
  </div>;
}
