"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { money } from "../../data/shared/expenses";
import { interpolatePetName, petNameFallback } from "../../data/shared/pet-text";
import { getAllScenariosForSpecies } from "../../data/species/journey";
import { getSpeciesConfig } from "../../data/species/index";
import type { CareMember, ExpenseRecord, LifeActivityState, Profile, Scenario, ScenarioAnswer } from "../../game-types";
import type { SharedDiscussionTopic } from "../../shared-result-types";
import {
  ExpenseDetails,
  getInitialPreparationTotal,
  getMonthlyBasicTotal,
  mergeDefaultVisibleExpenses,
  NavButtons,
} from "../shared/SharedComponents";

const a4PageWidthPt = 595.28;
const a4PageHeightPt = 841.89;

function personalizeReportText(text: string, petName: string, species?: string) {
  return interpolatePetName(text, petName, species);
}

function knowledgePointsForScenario(scenario: Scenario, petName: string, species?: string) {
  const correctChoices = scenario.choices.filter((choice) => choice.result === "correct");
  const rawPoints = scenario.correctSummary?.length
    ? scenario.correctSummary
    : correctChoices.flatMap((choice) => [choice.text, choice.explanation, choice.suggestion ?? ""]);
  return Array.from(new Set(rawPoints.flatMap((point) => point.split("\n")).map((point) => personalizeReportText(point.trim(), petName, species)).filter(Boolean))).slice(0, 6);
}

function sanitizePdfFileName(value: string) {
  return value.replace(/[\\/:*?"<>|]/g, "").replace(/\s+/g, " ").trim();
}

function dataUrlToBytes(dataUrl: string) {
  const base64 = dataUrl.split(",")[1] ?? "";
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function textBytes(text: string) {
  return new TextEncoder().encode(text);
}

function concatBytes(chunks: Uint8Array[]) {
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const output = new Uint8Array(totalLength);
  let offset = 0;
  chunks.forEach((chunk) => {
    output.set(chunk, offset);
    offset += chunk.length;
  });
  return output;
}

function createPdfBlobFromCanvases(canvases: HTMLCanvasElement[]) {
  if (!canvases.length) throw new Error("PDF has no renderable pages");
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [0];
  let byteLength = 0;
  const objectCount = 2 + canvases.length * 3;

  const push = (chunk: string | Uint8Array) => {
    const bytes = typeof chunk === "string" ? textBytes(chunk) : chunk;
    chunks.push(bytes);
    byteLength += bytes.length;
  };

  const startObject = (id: number) => {
    offsets[id] = byteLength;
    push(`${id} 0 obj\n`);
  };

  push("%PDF-1.4\n%\u00e2\u00e3\u00cf\u00d3\n");
  startObject(1);
  push("<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  startObject(2);
  push(`<< /Type /Pages /Kids [${canvases.map((_, index) => `${3 + index * 3} 0 R`).join(" ")}] /Count ${canvases.length} >>\nendobj\n`);

  canvases.forEach((canvas, index) => {
    const pageObjectId = 3 + index * 3;
    const imageObjectId = pageObjectId + 1;
    const contentObjectId = pageObjectId + 2;
    const imageBytes = dataUrlToBytes(canvas.toDataURL("image/jpeg", 0.92));
    const content = `q\n${a4PageWidthPt} 0 0 ${a4PageHeightPt} 0 0 cm\n/Im${index + 1} Do\nQ\n`;
    const contentBytes = textBytes(content);

    startObject(pageObjectId);
    push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${a4PageWidthPt} ${a4PageHeightPt}] /Resources << /XObject << /Im${index + 1} ${imageObjectId} 0 R >> >> /Contents ${contentObjectId} 0 R >>\nendobj\n`);

    startObject(imageObjectId);
    push(`<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.length} >>\nstream\n`);
    push(imageBytes);
    push("\nendstream\nendobj\n");

    startObject(contentObjectId);
    push(`<< /Length ${contentBytes.length} >>\nstream\n`);
    push(contentBytes);
    push("endstream\nendobj\n");
  });

  const xrefOffset = byteLength;
  push(`xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`);
  for (let id = 1; id <= objectCount; id += 1) push(`${String(offsets[id]).padStart(10, "0")} 00000 n \n`);
  push(`trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

  return new Blob([concatBytes(chunks)], { type: "application/pdf" });
}

function createTextOnlyPdfBlob(pages: HTMLElement[]) {
  const canvases = pages.map(elementTextToCanvas);
  return createPdfBlobFromCanvases(canvases);
}

async function imageToDataUrl(src: string) {
  if (src.startsWith("data:")) return src;
  const response = await fetch(src);
  const blob = await response.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function replaceImagesWithDataUrls(root: HTMLElement) {
  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(images.map(async (image) => {
    const source = image.getAttribute("src") || image.src;
    if (!source) return;
    try {
      image.src = await imageToDataUrl(new URL(source, window.location.href).toString());
    } catch {
      // Keep the original source as a fallback; failed images should not stop the whole export.
    }
  }));
}

function preserveFormValues(source: HTMLElement, clone: HTMLElement) {
  const sourceControls = Array.from(source.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select"));
  const cloneControls = Array.from(clone.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select"));
  sourceControls.forEach((control, index) => {
    const clonedControl = cloneControls[index];
    if (!clonedControl) return;
    if (control instanceof HTMLInputElement && clonedControl instanceof HTMLInputElement) {
      clonedControl.checked = control.checked;
      if (control.checked) clonedControl.setAttribute("checked", "checked");
      else clonedControl.removeAttribute("checked");
    }
    clonedControl.value = control.value;
    clonedControl.setAttribute("value", control.value);
    if (control instanceof HTMLTextAreaElement && clonedControl instanceof HTMLTextAreaElement) clonedControl.textContent = control.value;
  });
}

function inlineComputedStyles(source: Element, clone: Element) {
  const styles = window.getComputedStyle(source);
  Array.from(styles).forEach((property) => {
    (clone as HTMLElement).style.setProperty(property, styles.getPropertyValue(property), styles.getPropertyPriority(property));
  });
  Array.from(source.children).forEach((child, index) => {
    const clonedChild = clone.children.item(index);
    if (clonedChild) inlineComputedStyles(child, clonedChild);
  });
}

async function elementToCanvas(source: HTMLElement) {
  const width = source.offsetWidth;
  const height = source.offsetHeight;
  if (!width || !height) throw new Error("PDF source page has no layout size");
  const clone = source.cloneNode(true) as HTMLElement;
  clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  await replaceImagesWithDataUrls(clone);
  inlineComputedStyles(source, clone);
  clone.style.margin = "0";
  clone.style.boxSizing = "border-box";

  const html = new XMLSerializer().serializeToString(clone);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject width="100%" height="100%">${html}</foreignObject></svg>`;
  const image = new Image();
  image.decoding = "sync";
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("PDF page render failed"));
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });

  const scale = Math.min(2, window.devicePixelRatio || 1.5);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not available");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
}

/** A no-image fallback for browsers that cannot rasterize SVG foreignObject. */
function elementTextToCanvas(source: HTMLElement) {
  const canvas = document.createElement("canvas");
  canvas.width = 1191;
  canvas.height = 1684;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not available");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#4a4033";
  context.font = '700 30px "Noto Sans TC", "PingFang TC", sans-serif';
  const lines = source.innerText.replace(/\n{3,}/g, "\n\n").split("\n").flatMap((line) => {
    const trimmed = line.trim();
    if (!trimmed) return [""];
    const chunks: string[] = [];
    let current = "";
    for (const character of trimmed) {
      if (context.measureText(`${current}${character}`).width > 1030 && current) { chunks.push(current); current = character; }
      else current += character;
    }
    if (current) chunks.push(current);
    return chunks;
  });
  let y = 90;
  for (const line of lines) {
    if (y > canvas.height - 75) break;
    context.fillText(line, 80, y);
    y += line ? 48 : 26;
  }
  return canvas;
}

type ReportPdfKind = "overview" | "profile";

type ProfilePdfRow = {
  label: string;
  value: string | string[];
};

type ProfilePdfSection = {
  title: string;
  rows: ProfilePdfRow[];
};

const profilePdfPage = { width: 1240, height: 1754, margin: 92, footer: 92 };

function profilePetSummary(profile: Profile, type: "past" | "current") {
  const types = type === "past" ? profile.pastPetTypes : profile.currentPetTypes;
  const dogCount = type === "past" ? profile.pastDogCount : profile.currentDogCount;
  const catCount = type === "past" ? profile.pastCatCount : profile.currentCatCount;
  const other = type === "past" ? profile.pastOther : profile.currentOther;
  const values = [
    types.includes("狗") && `狗${dogCount ? ` ${dogCount} 隻` : ""}`,
    types.includes("貓") && `貓${catCount ? ` ${catCount} 隻` : ""}`,
    types.includes("其他") && (other || "其他"),
  ].filter(Boolean) as string[];
  return values;
}

function profilePdfSections(profile: Profile, selectedTypeLabel: string): ProfilePdfSection[] {
  const housemateText = profile.hasHousemates === true
    ? (profile.housemateList.filter(Boolean).join("、") || "有同住者")
    : profile.hasHousemates === false ? "無" : "尚未填寫";
  const consentText = profile.hasHousemates === true
    ? profile.housematesConsent === true ? "已知情並同意" : profile.housematesConsent === false ? "不同意" : "尚未確認"
    : "不適用";
  const activitySpaces = Array.isArray(profile.activitySpace) ? profile.activitySpace : profile.activitySpace ? [profile.activitySpace] : [];
  const activityText = activitySpaces.map((space) => space === "其他" && profile.otherActivitySpace ? `其他：${profile.otherActivitySpace}` : space);
  const reasons = profile.reasons.map((reason) => reason === "其他" && profile.reasonOther ? `其他：${profile.reasonOther}` : reason);
  const photoCount = profile.homeSpaceImages.length || (profile.homeSpaceImage ? 1 : 0);
  const role = profile.role === "其他" && profile.roleOther ? `其他：${profile.roleOther}` : profile.role;

  return [
    {
      title: "基本資料",
      rows: [
        { label: "年齡", value: profile.age ? `${profile.age} 歲` : "尚未填寫" },
        { label: "身分類型", value: role || "尚未填寫" },
      ],
    },
    {
      title: "時間與居住環境",
      rows: [
        { label: "每天離家時間", value: profile.hoursAway !== "" ? `每日 ${profile.hoursAway} 小時` : "尚未填寫" },
        { label: "每天可投入照顧時間", value: profile.careHours !== "" ? `每日 ${profile.careHours} 小時` : "尚未填寫" },
        { label: "居住類型", value: profile.housing || "尚未填寫" },
        ...(profile.housing === "租屋" ? [{ label: "房東／租約同意", value: profile.landlordConsent || "尚未確認" }] : []),
      ],
    },
    {
      title: "同住與活動空間",
      rows: [
        { label: "同住家人", value: housemateText },
        ...(profile.hasHousemates === true ? [{ label: "同住者是否同意", value: consentText }] : []),
        ...(profile.hasSensitiveHouseholdMembers ? [{ label: "需要特別留意", value: "家中有幼童、長者、孕婦" }] : []),
        { label: "寵物預計活動空間", value: activityText.length ? activityText : "尚未填寫" },
        { label: "居家空間照片", value: photoCount ? `已提供 ${photoCount} 張照片` : "尚未提供" },
      ],
    },
    {
      title: "飼養經驗",
      rows: [
        ...(profile.noShibaExperience ? [{ label: `${selectedTypeLabel}經驗`, value: `我沒有養過${selectedTypeLabel}` }] : []),
        { label: "曾經飼養", value: profilePetSummary(profile, "past").length ? profilePetSummary(profile, "past") : "尚未填寫" },
        { label: "目前家中有寵物", value: profilePetSummary(profile, "current").length ? profilePetSummary(profile, "current") : "尚未填寫" },
        ...(profile.experienceNote ? [{ label: "其他飼養經驗分享", value: profile.experienceNote }] : []),
      ],
    },
    {
      title: "飼養原因與照顧安排",
      rows: [
        { label: "飼養原因", value: reasons.length ? reasons : "尚未填寫" },
        { label: "每月可負擔預算", value: profile.monthlyBudget ? `NT$ ${Number(profile.monthlyBudget).toLocaleString("zh-TW")}` : "尚未填寫" },
        { label: "緊急預備金", value: profile.emergencyFund === true ? "有" : profile.emergencyFund === false ? "目前沒有" : "尚未填寫" },
        { label: "忙碌時的照顧支援", value: profile.backupSupport === true ? "有可靠支援" : profile.backupSupport === false ? "目前沒有" : "尚未填寫" },
      ],
    },
  ];
}

function wrapPdfText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = [];
  let line = "";
  for (const character of text) {
    if (context.measureText(`${line}${character}`).width > maxWidth && line) {
      lines.push(line);
      line = character;
    } else line += character;
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

/** Draws the profile as true A4-sized pages. Sections move as units instead of scaling a long form into one canvas. */
function createProfilePdfCanvases(profile: Profile, petName: string, selectedTypeLabel: string) {
  const pages: Array<{ canvas: HTMLCanvasElement; context: CanvasRenderingContext2D; y: number }> = [];
  const contentWidth = profilePdfPage.width - profilePdfPage.margin * 2;
  const bottom = profilePdfPage.height - profilePdfPage.footer;

  const startPage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = profilePdfPage.width;
    canvas.height = profilePdfPage.height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is not available for profile PDF");
    context.fillStyle = "#fffdf8";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#6d5e48";
    context.font = '600 24px "Noto Sans TC", "PingFang TC", sans-serif';
    context.fillText("伴日子新手村", profilePdfPage.margin, 76);
    context.fillStyle = "#3f3528";
    context.font = '700 48px "Noto Sans TC", "PingFang TC", sans-serif';
    context.fillText("個人資料", profilePdfPage.margin, 138);
    context.fillStyle = "#887761";
    context.font = '400 24px "Noto Sans TC", "PingFang TC", sans-serif';
    context.fillText(petName ? `為 ${petName} 整理的照顧條件摘要` : `為 ${selectedTypeLabel} 整理的照顧條件摘要`, profilePdfPage.margin, 180);
    context.strokeStyle = "#e1d5c3";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(profilePdfPage.margin, 210);
    context.lineTo(profilePdfPage.width - profilePdfPage.margin, 210);
    context.stroke();
    const page = { canvas, context, y: 258 };
    pages.push(page);
    return page;
  };

  const measureRow = (context: CanvasRenderingContext2D, row: ProfilePdfRow) => {
    const valueWidth = contentWidth - 292;
    context.font = '400 26px "Noto Sans TC", "PingFang TC", sans-serif';
    const values = Array.isArray(row.value) ? row.value : [row.value];
    const lines = values.flatMap((value) => wrapPdfText(context, value, valueWidth));
    return { lines, height: Math.max(62, lines.length * 40 + 22), isList: Array.isArray(row.value) };
  };

  const sectionGap = 44;
  let page = startPage();
  for (const section of profilePdfSections(profile, selectedTypeLabel)) {
    const rowLayouts = section.rows.map((row) => measureRow(page.context, row));
    const sectionHeight = 72 + rowLayouts.reduce((total, layout) => total + layout.height, 0) + 26;
    if (page.y + sectionHeight > bottom) page = startPage();
    const pending = section.rows.map((row, index) => ({ ...row, ...rowLayouts[index] }));
    while (pending.length) {
      const available = bottom - page.y;
      const chunkRows: Array<ProfilePdfRow & { lines: string[]; height: number; isList: boolean }> = [];
      let chunkHeight = 98;
      while (pending.length) {
        const row = pending[0];
        if (chunkHeight + row.height <= available || !chunkRows.length) {
          if (chunkHeight + row.height <= available) {
            chunkRows.push(pending.shift()!);
            chunkHeight += row.height;
            continue;
          }
          // A very long free-text answer may span pages. Split only between text lines,
          // repeat its label on the continuation page, and never scale the type down.
          const linesThatFit = Math.max(1, Math.floor((available - chunkHeight - 22) / 40));
          const lines = row.lines.splice(0, linesThatFit);
          const partialHeight = Math.max(62, lines.length * 40 + 22);
          chunkRows.push({ ...row, lines, height: partialHeight });
          // A split value repeats its ordinary field label on the next page;
          // the PDF deliberately avoids adding a visual "continuation" marker.
          row.height = Math.max(62, row.lines.length * 40 + 22);
          chunkHeight += partialHeight;
          break;
        }
        break;
      }
      if (!chunkRows.length) { page = startPage(); continue; }

      const startY = page.y;
      page.context.fillStyle = "#f7f1e6";
      page.context.strokeStyle = "#dfd0bb";
      page.context.lineWidth = 2;
      page.context.beginPath();
      page.context.roundRect(profilePdfPage.margin, startY, contentWidth, chunkHeight, 20);
      page.context.fill();
      page.context.stroke();
      page.context.fillStyle = "#8b5b2d";
      page.context.font = '700 30px "Noto Sans TC", "PingFang TC", sans-serif';
      page.context.fillText(section.title, profilePdfPage.margin + 30, startY + 46);
      page.y += 72;

      chunkRows.forEach((row, index) => {
        const rowY = page.y;
        if (index > 0) {
          page.context.strokeStyle = "#e6d9c8";
          page.context.lineWidth = 1;
          page.context.beginPath();
          page.context.moveTo(profilePdfPage.margin + 30, rowY);
          page.context.lineTo(profilePdfPage.width - profilePdfPage.margin - 30, rowY);
          page.context.stroke();
        }
        page.context.fillStyle = "#705f4a";
        page.context.font = '600 25px "Noto Sans TC", "PingFang TC", sans-serif';
        page.context.fillText(row.label, profilePdfPage.margin + 30, rowY + 40);
        page.context.fillStyle = "#3f3528";
        page.context.font = '400 26px "Noto Sans TC", "PingFang TC", sans-serif';
        row.lines.forEach((line, lineIndex) => {
          const prefix = row.isList && lineIndex === 0 ? "• " : "";
          page.context.fillText(`${prefix}${line}`, profilePdfPage.margin + 292, rowY + 40 + lineIndex * 40);
        });
        page.y += row.height;
      });
      page.y += sectionGap;
      if (pending.length) page = startPage();
    }
  }

  pages.forEach((entry, index) => {
    entry.context.strokeStyle = "#e1d5c3";
    entry.context.lineWidth = 2;
    entry.context.beginPath();
    entry.context.moveTo(profilePdfPage.margin, profilePdfPage.height - 68);
    entry.context.lineTo(profilePdfPage.width - profilePdfPage.margin, profilePdfPage.height - 68);
    entry.context.stroke();
    entry.context.fillStyle = "#887761";
    entry.context.font = '400 21px "Noto Sans TC", "PingFang TC", sans-serif';
    entry.context.textAlign = "right";
    entry.context.fillText(`${index + 1} / ${pages.length}`, profilePdfPage.width - profilePdfPage.margin, profilePdfPage.height - 34);
    entry.context.textAlign = "left";
  });
  return pages.map((entry) => entry.canvas);
}

function useMobileDownloadMode() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(max-width: 720px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  return mobile;
}

async function downloadAssessmentPdf(petName: string, kind: ReportPdfKind, profile?: Profile, selectedTypeLabel?: string) {
  if (typeof window === "undefined" || typeof document === "undefined") throw new Error("PDF export requires a browser environment");
  if (kind === "profile" && profile) {
    const canvases = createProfilePdfCanvases(profile, petName, selectedTypeLabel || "寵物");
    const blob = createPdfBlobFromCanvases(canvases);
    if (!blob.size || blob.type !== "application/pdf") throw new Error("Generated profile PDF blob is invalid");
    const safePetName = sanitizePdfFileName(petName);
    const fileName = safePetName
      ? `伴日子新手村_個人資料_${safePetName}.pdf`
      : "伴日子新手村_個人資料.pdf";
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
    return;
  }
  const selector = kind === "profile" ? ".care-print-profile" : ".care-a4-sheet";
  const sourcePages = Array.from(document.querySelectorAll<HTMLElement>(selector));
  // The profile form can be opened directly from the acquisition page, where
  // the report-only .care-print-profile node is intentionally absent.
  if (!sourcePages.length && kind === "profile") sourcePages.push(...document.querySelectorAll<HTMLElement>(".profile-supplement"));
  if (!sourcePages.length) throw new Error("PDF source pages not found");

  const stage = document.createElement("div");
  stage.className = "pdf-export-stage";
  sourcePages.forEach((page) => {
    const clone = page.cloneNode(true) as HTMLElement;
    preserveFormValues(page, clone);
    stage.appendChild(clone);
  });
  document.body.appendChild(stage);

  try {
    await document.fonts?.ready;
    await replaceImagesWithDataUrls(stage);
    const pages = Array.from(stage.children) as HTMLElement[];
    const canvases = [];
    for (const page of pages) {
      try {
        canvases.push(await elementToCanvas(page));
      } catch (error) {
        // Some browser builds cannot draw a foreignObject SVG or a user photo.
        // Preserve all entered text in a valid PDF instead of failing the download.
        console.warn("Falling back to text-only PDF page export.", error);
        canvases.push(elementTextToCanvas(page));
      }
    }
    let blob: Blob;
    try {
      blob = createPdfBlobFromCanvases(canvases);
    } catch (error) {
      // A canvas can become tainted after a late-loading remote/user image even
      // when SVG rasterization itself succeeded. Rebuild every page without
      // images so this non-essential asset cannot prevent the PDF download.
      console.warn("PDF image encoding failed; rebuilding a text-only PDF.", error);
      blob = createTextOnlyPdfBlob(pages);
    }
    if (!blob.size || blob.type !== "application/pdf") throw new Error("Generated PDF blob is invalid");
    const safePetName = sanitizePdfFileName(petName);
    const fileName = safePetName
      ? `伴日子新手村_${kind === "profile" ? "個人資料" : "照顧準備總覽"}_${safePetName}.pdf`
      : `伴日子新手村_${kind === "profile" ? "個人資料" : "照顧準備總覽"}.pdf`;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
  } finally {
    stage.remove();
  }
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function downloadAssessmentImage(petName: string, kind: ReportPdfKind) {
  const selector = kind === "profile" ? ".care-print-profile" : ".care-a4-sheet";
  const sourcePages = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (!sourcePages.length) throw new Error("Image source pages not found");

  const stage = document.createElement("div");
  stage.className = "pdf-export-stage image-export-stage desktop-pdf-layout";
  sourcePages.forEach((page) => stage.appendChild(page.cloneNode(true)));
  document.body.appendChild(stage);

  try {
    await document.fonts?.ready;
    await replaceImagesWithDataUrls(stage);
    const pages = Array.from(stage.children) as HTMLElement[];
    const canvases = [];
    for (const page of pages) canvases.push(await elementToCanvas(page));
    const safePetName = sanitizePdfFileName(petName);
    const baseFileName = safePetName
      ? `伴日子新手村_${kind === "profile" ? "個人資料" : "照護總覽"}_${safePetName}`
      : `伴日子新手村_${kind === "profile" ? "個人資料" : "照護總覽"}`;

    for (let index = 0; index < canvases.length; index += 1) {
      const canvas = canvases[index];
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((nextBlob) => {
          if (nextBlob) resolve(nextBlob);
          else reject(new Error("PNG export failed"));
        }, "image/png");
      });
      const fileName = canvases.length > 1 ? `${baseFileName}_${index + 1}.png` : `${baseFileName}.png`;
      downloadBlob(blob, fileName);
    }
  } finally {
    stage.remove();
  }
}

function PdfDownloadButton({ petName, kind = "overview", label, profile, selectedTypeLabel }: { petName: string; kind?: ReportPdfKind; label?: string; profile?: Profile; selectedTypeLabel?: string }) {
  const [generating, setGenerating] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const mobileDownload = useMobileDownloadMode();
  const defaultLabel = mobileDownload
    ? (kind === "profile" ? "儲存個人資料" : "儲存照護總覽")
    : (kind === "profile" ? "下載個人資料" : "下載照顧準備總覽");
  const buttonLabel = mobileDownload
    ? (kind === "profile" ? "儲存個人資料" : "儲存照護總覽")
    : (label ?? defaultLabel);
  const exportKindLabel = mobileDownload ? "圖片" : "PDF";

  return (
    <div className="report-download-control">
      {error && <p className="pdf-download-error" role="alert">{error}</p>}
      <button
        type="button"
        className={`primary pdf-download-button ${generating ? "is-generating" : ""}`}
        onClick={async () => {
          if (generating) return;
          setGenerating(true);
          setCompleted(false);
          setError("");
          try {
            if (mobileDownload) await downloadAssessmentImage(petName, kind);
            else await downloadAssessmentPdf(petName, kind, profile, selectedTypeLabel);
            setCompleted(true);
          } catch (error) {
            console.error("Assessment export failed.", error);
            setError(`${exportKindLabel}下載失敗，請再試一次。`);
          } finally {
            setGenerating(false);
          }
        }}
        disabled={generating}
        aria-label={buttonLabel}
        title={mobileDownload ? "儲存圖片" : "下載 PDF"}
      >
        {generating ? (
          <span className="pdf-download-spinner" aria-hidden="true" />
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 3a1 1 0 0 1 1 1v9.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.4l3.3 3.3V4a1 1 0 0 1 1-1Z" />
            <path d="M5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z" />
          </svg>
        )}
        <span>{generating ? (kind === "overview" ? "正在整理你的照護指南…" : "正在整理你的個人資料…") : completed ? (kind === "overview" ? "照護指南已下載" : "個人資料已下載") : buttonLabel}</span>
      </button>
    </div>
  );
}

function OptionButton({ label, selected, onClick, icon, simple = false }: { label: string; selected: boolean; onClick: () => void; icon?: string; simple?: boolean }) {
  return (
    <button type="button" className={`profile-option ${simple ? "simple" : ""} ${selected ? "selected" : ""}`} aria-pressed={selected} onClick={onClick}>
      {selected && (
        <i aria-hidden="true">
          <svg viewBox="0 0 16 16" focusable="false">
            <path d="M6.4 11.6 2.7 7.9l1.4-1.4 2.3 2.3 5.5-5.6 1.4 1.4z" />
          </svg>
        </i>
      )}
      {icon && <span aria-hidden="true">{icon}</span>}
      <b>{label}</b>
      {!simple && <small>{selected ? "已選擇" : "點擊選擇"}</small>}
    </button>
  );
}

function SelectedDot() {
  return (
    <span className="choice-check" aria-hidden="true">
      <svg viewBox="0 0 16 16" focusable="false">
        <path d="M6.4 11.6 2.7 7.9l1.4-1.4 2.3 2.3 5.5-5.6 1.4 1.4z" />
      </svg>
    </span>
  );
}

export function ProfileForm({
  page,
  onPage,
  profile,
  onChange,
  onBack,
  onNext,
}: {
  page: number;
  onPage: (page: number) => void;
  profile: Profile;
  onChange: (profile: Profile) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const titles = ["時間與身分", "居住與同住者", "經驗與動機", "預算與支援"];
  const update = <K extends keyof Profile>(key: K, value: Profile[K]) => onChange({ ...profile, [key]: value });
  const clamp = (raw: string, max: number) => raw === "" ? "" : String(Math.min(max, Math.max(0, Number(raw.replace(/\D/g, "")) || 0)));

  function toggleReason(reason: string) {
    update("reasons", profile.reasons.includes(reason) ? profile.reasons.filter((item) => item !== reason) : [...profile.reasons, reason]);
  }

  function validate(current: number) {
    const next: Record<string, string> = {};
    if (current === 0) {
      if (!profile.age || Number(profile.age) < 1 || Number(profile.age) > 120) next.age = "請輸入 1～120 歲。";
      if (!profile.role) next.role = "請選擇身分類型。";
      if (profile.role === "其他" && !profile.roleOther.trim()) next.roleOther = "請說明其他身分。";
      if (profile.hoursAway === "") next.hoursAway = "請填寫每天離家時間。";
      if (profile.careHours === "") next.careHours = "請填寫每天可投入時間。";
    }
    if (current === 1) {
      if (!profile.housing) next.housing = "請選擇居住類型。";
      if (profile.housing === "租屋" && !profile.landlordConsent) next.landlordConsent = "請確認房東是否同意。";
      if (profile.hasHousemates === null) next.hasHousemates = "請選擇是否有同住者。";
      if (profile.hasHousemates && profile.housematesConsent === null) next.housematesConsent = "請確認同住者是否同意。";
    }
    if (current === 2) {
      if (!profile.experience) next.experience = "請選擇飼養經驗。";
      if (!profile.reasons.length) next.reasons = "請至少選擇一項飼養動機。";
      if (profile.reasons.includes("其他") && !profile.reasonOther.trim()) next.reasonOther = "請說明其他動機。";
    }
    if (current === 3) {
      if (!profile.monthlyBudget || Number(profile.monthlyBudget) < 0) next.monthlyBudget = "請填寫每月可負擔預算。";
      if (profile.emergencyFund === null) next.emergencyFund = "請選擇是否有緊急預備金。";
      if (profile.backupSupport === null) next.backupSupport = "請選擇是否有外部支援。";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function nextPage() {
    if (!validate(page)) return;
    if (page < titles.length - 1) {
      onPage(page + 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else onNext();
  }

  function backPage() {
    setErrors({});
    if (page > 0) onPage(page - 1);
    else onBack();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="content-wrap profile-wizard">
      <div className="profile-bridge">你已經陪牠走過一段模擬生活。現在讓我們把遊戲中的經驗放回你的真實生活中，看看哪些部分已經準備好，哪些還需要確認。</div>
      <div className="profile-wizard-head"><div><h1>{titles[page]}</h1><p>沒有理想答案，請依照現在的生活狀況填寫。</p></div></div>
      <section className="profile-panel" key={page}>
        {page === 0 && <>
          <div className="inline-number-field"><label htmlFor="real-age">年齡</label><input id="real-age" type="number" min="1" max="120" placeholder="例：20" value={profile.age} onChange={(event) => update("age", clamp(event.target.value, 120))} /><span>歲</span></div>{errors.age && <p className="field-error">{errors.age}</p>}
          <fieldset><legend>身分類型</legend><div className="identity-options">{[["學生", "▣"], ["上班族", "♟"], ["退休", "◎"], ["其他", "•••"]].map(([value, icon]) => <div key={value}><OptionButton label={value} icon={icon} selected={profile.role === value} onClick={() => update("role", value)} />{value === "其他" && <input aria-label="其他身分" disabled={profile.role !== "其他"} placeholder="請說明" value={profile.roleOther} onChange={(event) => update("roleOther", event.target.value)} />}</div>)}</div>{errors.role && <p className="field-error">{errors.role}</p>}{errors.roleOther && <p className="field-error">{errors.roleOther}</p>}</fieldset>
          <fieldset><legend>每天的時間</legend><div className="profile-time-grid"><label>每天離家時間<span>每日 <input type="number" min="0" max="24" value={profile.hoursAway} onChange={(event) => update("hoursAway", clamp(event.target.value, 24))} /> 小時</span></label><label>每天能投入照顧時間<span>每日 <input type="number" min="0" max="24" value={profile.careHours} onChange={(event) => update("careHours", clamp(event.target.value, 24))} /> 小時</span></label></div>{errors.hoursAway && <p className="field-error">{errors.hoursAway}</p>}{errors.careHours && <p className="field-error">{errors.careHours}</p>}</fieldset>
        </>}
        {page === 1 && <>
          <fieldset><legend>居住類型</legend><div className="housing-options">{["自有住宅", "租屋"].map((value) => <OptionButton key={value} label={value} selected={profile.housing === value} onClick={() => update("housing", value)} simple />)}</div>{errors.housing && <p className="field-error">{errors.housing}</p>}{profile.housing === "租屋" && <div className="landlord-options">{["房東已同意", "尚未取得同意", "不同意"].map((value) => <OptionButton key={value} label={value} selected={profile.landlordConsent === value} onClick={() => update("landlordConsent", value)} />)}</div>}{errors.landlordConsent && <p className="field-error">{errors.landlordConsent}</p>}</fieldset>
          <fieldset><legend>是否有同住者？</legend><div className="housemate-presence-options"><OptionButton label="有" selected={profile.hasHousemates === true} onClick={() => update("hasHousemates", true)} /><OptionButton label="無" selected={profile.hasHousemates === false} onClick={() => update("hasHousemates", false)} /></div>{errors.hasHousemates && <p className="field-error">{errors.hasHousemates}</p>}{profile.hasHousemates === true && <div className="housemate-details"><h2>所有同住者是否知情並同意？</h2><div className="housemate-presence-options"><OptionButton label="同意" selected={profile.housematesConsent === true} onClick={() => update("housematesConsent", true)} /><OptionButton label="尚未同意" selected={profile.housematesConsent === false} onClick={() => update("housematesConsent", false)} /></div>{errors.housematesConsent && <p className="field-error">{errors.housematesConsent}</p>}</div>}</fieldset>
        </>}
        {page === 2 && <>
          <fieldset><legend>過去及目前的飼養經驗</legend><div className="experience-options">{["首次飼養", "有飼養經驗"].map((value) => <OptionButton key={value} label={value} selected={profile.experience === value} onClick={() => update("experience", value)} />)}</div>{errors.experience && <p className="field-error">{errors.experience}</p>}{profile.experience === "有飼養經驗" && <div className="experience-detail open"><label className="experience-note">過去飼養經驗<input placeholder="例：曾照顧犬隻 5 年" value={profile.pastPets} onChange={(event) => update("pastPets", event.target.value)} /></label><label className="experience-note">目前家中寵物<input placeholder="例：目前有一隻貓" value={profile.currentPets} onChange={(event) => update("currentPets", event.target.value)} /></label></div>}</fieldset>
          <fieldset><legend>飼養動機 <small>可複選</small></legend><div className="reason-options">{["陪伴與情緒支持", "喜愛動物", "家庭共同決定", "提供動物一個家", "生活夥伴", "其他"].map((reason) => <OptionButton key={reason} label={reason} selected={profile.reasons.includes(reason)} onClick={() => toggleReason(reason)} />)}</div>{errors.reasons && <p className="field-error">{errors.reasons}</p>}{profile.reasons.includes("其他") && <label className="conditional-input">其他動機<input placeholder="請說明" value={profile.reasonOther} onChange={(event) => update("reasonOther", event.target.value)} /></label>}{errors.reasonOther && <p className="field-error">{errors.reasonOther}</p>}</fieldset>
        </>}
        {page === 3 && <>
          <fieldset><legend>每月可負擔預算</legend><div className="budget-profile-input"><span>NT$</span><input type="number" min="0" step="500" placeholder="例：5000" value={profile.monthlyBudget} onChange={(event) => update("monthlyBudget", clamp(event.target.value, 999999))} /><small>不含大型突發醫療費用</small></div>{errors.monthlyBudget && <p className="field-error">{errors.monthlyBudget}</p>}</fieldset>
          <fieldset><legend>是否有緊急預備金？</legend><div className="housing-options"><OptionButton label="有" selected={profile.emergencyFund === true} onClick={() => update("emergencyFund", true)} /><OptionButton label="目前沒有" selected={profile.emergencyFund === false} onClick={() => update("emergencyFund", false)} /></div>{errors.emergencyFund && <p className="field-error">{errors.emergencyFund}</p>}</fieldset>
          <fieldset><legend>忙碌、出差或生病時，是否有人能協助？</legend><div className="housing-options"><OptionButton label="有可靠支援" selected={profile.backupSupport === true} onClick={() => update("backupSupport", true)} /><OptionButton label="目前沒有" selected={profile.backupSupport === false} onClick={() => update("backupSupport", false)} /></div>{errors.backupSupport && <p className="field-error">{errors.backupSupport}</p>}</fieldset>
        </>}
      </section>
      <NavButtons onBack={backPage} onNext={nextPage} nextLabel={page === titles.length - 1 ? "產生我的評估報告" : "下一步"} />
    </div>
  );
}

export function ProfileSupplementForm({
  profile,
  petName,
  breed,
  species = "dog",
  onChange,
  onBack,
  onReset,
  embedded = false,
}: {
  profile: Profile;
  petName: string;
  breed: string;
  species?: string;
  onChange: (profile: Profile) => void;
  onBack: () => void;
  onReset: () => void;
  embedded?: boolean;
}) {
  const selectedBreed = getSpeciesConfig(species).breeds.find((item) => item.id === breed);
  const selectedTypeLabel = selectedBreed?.label ?? (species === "cat" ? "貓咪" : species === "rabbit" ? "兔子" : species === "bird" ? "鳥兒" : "柴犬");
  const update = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    onChange({ ...profile, [key]: value });
  };
  const chooseHousing = (value: string) => {
    onChange({
      ...profile,
      housing: value,
      landlordConsent: value === "租屋" ? (profile.landlordConsent || "尚未確認") : "",
    });
  };
  const clamp = (raw: string, max: number) => raw === "" ? "" : String(Math.min(max, Math.max(0, Number(raw.replace(/\D/g, "")) || 0)));
  const toggle = (key: "pastPetTypes" | "currentPetTypes" | "reasons", value: string) => update(key, profile[key].includes(value) ? profile[key].filter((item) => item !== value) : [...profile[key], value]);
  const chooseHousematePresence = (hasHousemates: boolean) => {
    onChange({
      ...profile,
      hasHousemates,
      housemateTypes: hasHousemates ? [] : ["無"],
      housemateList: hasHousemates ? (profile.housemateList.length ? profile.housemateList : [""]) : [],
      otherHousemate: "",
      hasSensitiveHouseholdMembers: hasHousemates ? profile.hasSensitiveHouseholdMembers : false,
      housematesConsent: hasHousemates ? profile.housematesConsent : null,
    });
  };
  const updateHousemateText = (value: string) => {
    const trimmed = value.trim();
    onChange({ ...profile, hasHousemates: true, housemateList: [value], housemateTypes: trimmed ? [trimmed] : [] });
  };
  const consentOptions: Array<{ value: "agree" | "pending" | "disagree"; label: string; selected: boolean; consent: boolean | null }> = [
    { value: "agree", label: "已知情並同意", selected: profile.housematesConsent === true, consent: true },
    { value: "pending", label: "尚未確認", selected: profile.housematesConsent === null, consent: null },
    { value: "disagree", label: "不同意", selected: profile.housematesConsent === false, consent: false },
  ];
  const setCount = (key: "pastDogCount" | "pastCatCount" | "currentDogCount" | "currentCatCount", raw: string) => update(key, clamp(raw, 99));
  const rawActivitySpace = profile.activitySpace as string[] | string;
  const selectedActivitySpaces = Array.isArray(rawActivitySpace)
    ? rawActivitySpace
    : rawActivitySpace
      ? [rawActivitySpace]
      : [];
  const toggleActivitySpace = (value: string) => {
    const nextSpaces = selectedActivitySpaces.includes(value)
      ? selectedActivitySpaces.filter((item) => item !== value)
      : [...selectedActivitySpaces, value];
    onChange({
      ...profile,
      activitySpace: nextSpaces,
      otherActivitySpace: nextSpaces.includes("其他") ? profile.otherActivitySpace : "",
    });
  };
  function handleHomeSpaceImage(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const image = String(reader.result ?? "");
      const images = profile.homeSpaceImages.length ? profile.homeSpaceImages : (profile.homeSpaceImage ? [profile.homeSpaceImage] : []);
      const imageNames = profile.homeSpaceImageNames.length ? profile.homeSpaceImageNames : (profile.homeSpaceImageName ? [profile.homeSpaceImageName] : []);
      const nextImages = [...images, image];
      const nextImageNames = [...imageNames, file.name];
      onChange({
        ...profile,
        homeSpaceImage: nextImages[0] ?? "",
        homeSpaceImageName: nextImageNames[0] ?? "",
        homeSpaceImages: nextImages,
        homeSpaceImageNames: nextImageNames,
      });
    };
    reader.readAsDataURL(file);
  }
  function removeHomeSpaceImage(indexToRemove: number) {
    const images = profile.homeSpaceImages.length ? profile.homeSpaceImages : (profile.homeSpaceImage ? [profile.homeSpaceImage] : []);
    const imageNames = profile.homeSpaceImageNames.length ? profile.homeSpaceImageNames : (profile.homeSpaceImageName ? [profile.homeSpaceImageName] : []);
    const nextImages = images.filter((_, index) => index !== indexToRemove);
    const nextImageNames = imageNames.filter((_, index) => index !== indexToRemove);
    onChange({
      ...profile,
      homeSpaceImage: nextImages[0] ?? "",
      homeSpaceImageName: nextImageNames[0] ?? "",
      homeSpaceImages: nextImages,
      homeSpaceImageNames: nextImageNames,
    });
  }
  const experienceInputs = (prefix: "past" | "current") => {
    const types = prefix === "past" ? profile.pastPetTypes : profile.currentPetTypes;
    return ["狗", "貓", "其他"].map((type) => {
      const enabled = types.includes(type);
      const countKey = (type === "狗" ? `${prefix}DogCount` : `${prefix}CatCount`) as "pastDogCount" | "pastCatCount" | "currentDogCount" | "currentCatCount";
      const otherKey = `${prefix}Other` as "pastOther" | "currentOther";
      return <label key={type}><input type="checkbox" checked={enabled} onChange={() => toggle(prefix === "past" ? "pastPetTypes" : "currentPetTypes", type)} />{type}{type === "其他" ? <input disabled={!enabled} value={profile[otherKey]} onChange={(event) => update(otherKey, event.target.value)} placeholder="請說明" /> : <input type="number" min="0" disabled={!enabled} value={profile[countKey]} onChange={(event) => setCount(countKey, event.target.value)} placeholder="隻" />}</label>;
    });
  };
  const homeSpaceImages = profile.homeSpaceImages.length ? profile.homeSpaceImages : (profile.homeSpaceImage ? [profile.homeSpaceImage] : []);
  const homeSpaceImageNames = profile.homeSpaceImageNames.length ? profile.homeSpaceImageNames : (profile.homeSpaceImageName ? [profile.homeSpaceImageName] : []);

  return (
    <section className={`${embedded ? "profile-supplement profile-supplement--embedded" : "content-wrap profile-supplement"}`} aria-labelledby="profile-supplement-title">
      <div className="profile-wizard-head"><div><h1 id="profile-supplement-title">補充真實生活條件</h1><p>這些資料可協助收容所、寵物店家或照護人員了解你的居住環境、同住者狀況與飼養經驗，作為後續溝通與照顧建議的參考。</p></div></div>
      <section className="profile-panel">
        <fieldset><legend>每天的時間</legend><div className="profile-time-grid"><label>每天離家時間<span>每日 <input type="number" min="0" max="24" value={profile.hoursAway} onChange={(event) => update("hoursAway", clamp(event.target.value, 24))} /> 小時</span></label><label>每天可投入照顧時間<span>每日 <input type="number" min="0" max="24" value={profile.careHours} onChange={(event) => update("careHours", clamp(event.target.value, 24))} /> 小時</span></label></div></fieldset>
        <fieldset><legend>居住空間</legend><div className="housing-options">{["自有住宅", "租屋"].map((value) => <OptionButton key={value} label={value} selected={profile.housing === value} onClick={() => chooseHousing(value)} simple />)}</div>{profile.housing === "租屋" && <div className="supplement-followup landlord-consent-followup"><b>房東／租約是否允許飼養寵物？</b><div className="supplement-choice-grid compact">{["已確認並同意", "尚未確認", "不同意"].map((value) => {
          const selected = profile.landlordConsent === value || (value === "已確認並同意" && profile.landlordConsent === "房東已同意") || (value === "尚未確認" && profile.landlordConsent === "尚未取得同意");
          return <button type="button" key={value} className={`supplement-choice ${selected ? "selected" : ""}`} aria-pressed={selected} onClick={() => update("landlordConsent", value)}>{selected && <SelectedDot />}{value}</button>;
        })}</div></div>}</fieldset>
        <fieldset><legend>同居家人</legend><div className="supplement-choice-grid compact housemate-presence-choice"><button type="button" className={`supplement-choice ${profile.hasHousemates === false ? "selected" : ""}`} aria-pressed={profile.hasHousemates === false} onClick={() => chooseHousematePresence(false)}>{profile.hasHousemates === false && <SelectedDot />}無</button><button type="button" className={`supplement-choice ${profile.hasHousemates === true ? "selected" : ""}`} aria-pressed={profile.hasHousemates === true} onClick={() => chooseHousematePresence(true)}>{profile.hasHousemates === true && <SelectedDot />}有</button></div>{profile.hasHousemates === true && <div className="housemate-entry-row"><label className="supplement-inline-input housemate-text-input">請簡單填寫同住家人<input value={profile.housemateList[0] ?? ""} placeholder="例如：爸爸、媽媽、妹妹" onChange={(event) => updateHousemateText(event.target.value)} /></label><label className="supplement-checkbox"><input type="checkbox" checked={profile.hasSensitiveHouseholdMembers} onChange={(event) => update("hasSensitiveHouseholdMembers", event.target.checked)} />家中有幼童、長者、孕婦</label></div>}{profile.hasHousemates === true && <div className="supplement-followup"><b>同住者是否知情並同意飼養？</b><div className="supplement-choice-grid compact">{consentOptions.map((option) => <button type="button" key={option.value} className={`supplement-choice ${option.selected ? "selected" : ""}`} aria-pressed={option.selected} onClick={() => update("housematesConsent", option.consent)}>{option.selected && <SelectedDot />}{option.label}</button>)}</div></div>}</fieldset>
        <fieldset><legend>寵物預計活動空間 <small>可複選</small></legend><div className="supplement-choice-grid">{["戶外空間", "室內客廳", "房間", "其他"].map((value) => {
          const selected = selectedActivitySpaces.includes(value);
          return <button type="button" key={value} className={`supplement-choice ${selected ? "selected" : ""}`} aria-pressed={selected} onClick={() => toggleActivitySpace(value)}>{selected && <SelectedDot />}{value}</button>;
        })}</div>{selectedActivitySpaces.includes("其他") && <label className="supplement-inline-input">其他活動空間<input placeholder="請說明" value={profile.otherActivitySpace} onChange={(event) => update("otherActivitySpace", event.target.value)} /></label>}</fieldset>
        <fieldset><legend>居家空間</legend><div className="home-space-upload">
          {homeSpaceImages.length === 0 ? (
            <label className="home-space-dropzone">
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => { handleHomeSpaceImage(event.target.files?.[0]); event.currentTarget.value = ""; }} />
              <b>共同為毛孩的安全把關</b>
              <span>可上傳未來寵物活動空間照片，協助評估環境安全與照顧安排。</span>
              <em>選擇 PNG、JPG、JPEG 或 WebP 圖片</em>
            </label>
          ) : (
            <div className="home-space-gallery">
              {homeSpaceImages.map((image, index) => (
                <figure key={`${homeSpaceImageNames[index] ?? "home-space"}-${index}`}>
                  <button type="button" className="home-space-remove-photo" onClick={() => removeHomeSpaceImage(index)} aria-label={`刪除居家空間照片 ${index + 1}`}>×</button>
                  <img src={image} alt={`已上傳的居家空間照片預覽 ${index + 1}`} />
                  <figcaption>{homeSpaceImageNames[index] || `居家空間照片 ${index + 1}`}</figcaption>
                </figure>
              ))}
              <label className="home-space-add-photo" aria-label="新增居家空間照片">
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => { handleHomeSpaceImage(event.target.files?.[0]); event.currentTarget.value = ""; }} />
                <span aria-hidden="true">＋</span>
                <b>新增照片</b>
              </label>
            </div>
          )}
        </div></fieldset>
        <fieldset><legend>飼養經驗</legend><div className="pet-experience-block"><b>曾經飼養：</b><div className="pet-experience-row">{experienceInputs("past")}</div><b>目前家中有寵物：</b><div className="pet-experience-row">{experienceInputs("current")}</div><label className="experience-note">其他飼養經驗分享：<textarea placeholder="請分享你的照顧經驗" value={profile.experienceNote} onChange={(event) => update("experienceNote", event.target.value)} /></label></div><button type="button" className={`supplement-choice shiba-experience ${profile.noShibaExperience ? "selected" : ""}`} aria-pressed={profile.noShibaExperience} onClick={() => update("noShibaExperience", !profile.noShibaExperience)}>{profile.noShibaExperience && <SelectedDot />}我沒有養過{selectedTypeLabel}</button></fieldset>
        <fieldset><legend>飼養原因 <small>可複選</small></legend><div className="supplement-choice-grid reasons">{["陪伴與情緒支持", "喜愛動物", "單純想養", "看家守衛", "他人推薦", "其他"].map((reason) => {
          const selected = profile.reasons.includes(reason);
          return <button type="button" key={reason} className={`supplement-choice ${selected ? "selected" : ""}`} aria-pressed={selected} onClick={() => toggle("reasons", reason)}>{selected && <SelectedDot />}{reason}</button>;
        })}</div>{profile.reasons.includes("其他") && <label className="supplement-inline-input">其他飼養原因<input placeholder="請說明" value={profile.reasonOther} onChange={(event) => update("reasonOther", event.target.value)} /></label>}</fieldset>
      </section>
      <div className="profile-pdf-actions">
        <PdfDownloadButton petName={petName} kind="profile" label="下載個人資料" profile={profile} selectedTypeLabel={selectedTypeLabel} />
        <p>下載後可提供給收容所、認養平台或合法寵物業者參考，協助他們了解你的居住環境與照顧安排。</p>
      </div>
    </section>
  );
}

export function AssessmentReport({
  petName,
  breed,
  species = "dog",
  profile,
  expenses,
  roomReady,
  hazardsReady,
  members,
  trunkSelected,
  trunkPassed,
  answers,
  lifeActivity,
  committed,
  onCommittedChange,
  onBack,
  onReset,
}: {
  petName: string;
  breed: string;
  species?: string;
  profile: Profile;
  expenses: ExpenseRecord[];
  roomReady: string[];
  hazardsReady: string[];
  members: CareMember[];
  trunkSelected: string[];
  trunkPassed: boolean;
  answers: Record<string, ScenarioAnswer>;
  lifeActivity: LifeActivityState;
  committed: boolean;
  onCommittedChange: (committed: boolean) => void;
  onBack: () => void;
  onReset: () => void;
}) {
  const [activeDiscussionId, setActiveDiscussionId] = useState("");
  const [expenseDetailsOpen, setExpenseDetailsOpen] = useState(false);
  const [dailyCareDetailsOpen, setDailyCareDetailsOpen] = useState(false);
  const speciesConfig = getSpeciesConfig(species);
  useEffect(() => {
    if (!activeDiscussionId && !dailyCareDetailsOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDiscussionId("");
        setDailyCareDetailsOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeDiscussionId, dailyCareDetailsOpen]);
  const visibleExpenses = mergeDefaultVisibleExpenses(expenses, breed, species);
  const initialPreparationTotal = getInitialPreparationTotal(visibleExpenses);
  const monthlyBasicTotal = getMonthlyBasicTotal(visibleExpenses);
  const correctFirst = Object.values(answers).filter((item) => item.firstResult === "correct").length;
  const corrected = Object.values(answers).filter((item) => item.firstResult !== "correct" && item.finalResult === "correct");
  const reportScenarios = getAllScenariosForSpecies(species, breed);
  const correctTopics = Object.values(answers).filter((item) => item.firstResult === "correct").map((item) => reportScenarios.find((scenario) => scenario.id === item.scenarioId)?.topic).filter(Boolean) as string[];
  const correctedTopics = corrected.map((item) => reportScenarios.find((scenario) => scenario.id === item.scenarioId)?.topic).filter(Boolean) as string[];
  const needsLearning = Object.values(answers).filter((item) => item.firstResult === "incorrect" && item.finalResult !== "correct").map((item) => reportScenarios.find((scenario) => scenario.id === item.scenarioId)?.topic).filter(Boolean) as string[];
  const practiceItems = [
    { label: "已完成到家第一餐", complete: lifeActivity.arrivalMealFoodReady && lifeActivity.arrivalMealWaterReady },
    ...(species === "cat" ? [{ label: "已完成貓砂盆救援隊", complete: lifeActivity.catInspectionSteps.includes("litter-complete") }] : []),
  ];
  const practiceComplete = practiceItems.filter((item) => item.complete).length;
  const backupNames = members.filter((member) => !member.isPlayer && member.name.trim()).map((member) => member.name);
  const requiredRoom = speciesConfig.roomItems.filter((item) => item.required);
  const roomCompletion = Math.round((roomReady.filter((id) => requiredRoom.some((item) => item.id === id)).length / requiredRoom.length) * 100);
  const preparationStrong = roomCompletion === 100 && hazardsReady.length === speciesConfig.hazards.length && trunkPassed;
  const rawActivitySpace = profile.activitySpace as string[] | string;
  const selectedActivitySpaces = Array.isArray(rawActivitySpace)
    ? rawActivitySpace
    : rawActivitySpace
      ? [rawActivitySpace]
      : [];
  const activitySpace = selectedActivitySpaces.length
    ? selectedActivitySpaces.map((space) => space === "其他" ? profile.otherActivitySpace || "其他（待補充）" : space).join("、")
    : "待補充";
  const enteredHousemates = profile.housemateList.map((item) => item.trim()).filter(Boolean);
  const legacyHousemates = [
    ...profile.housemateTypes.filter((item) => item !== "無" && item !== "其他"),
    profile.housemateTypes.includes("其他") ? profile.otherHousemate || "其他（待補充）" : "",
  ].filter(Boolean);
  const housemateStatus = profile.hasHousemates === false
    ? "無同住家人"
    : profile.hasHousemates === true
      ? (enteredHousemates.length ? enteredHousemates.join("、") : legacyHousemates.length ? legacyHousemates.join("、") : "有同住家人（待補充）")
      : "待補充";
  const selectedBreed = speciesConfig.breeds.find((item) => item.id === breed);
  const selectedTypeLabel = selectedBreed?.label ?? (species === "cat" ? "貓咪" : species === "rabbit" ? "兔子" : species === "bird" ? "鳥兒" : "柴犬");
  const experienceStatus = profile.noShibaExperience ? `沒有${selectedTypeLabel}經驗` : profile.pastPetTypes.length || profile.currentPetTypes.length || profile.experienceNote ? "已補充飼養經驗" : "待補充";
  const reasonStatus = profile.reasons.length ? profile.reasons.map((item) => item === "其他" ? profile.reasonOther || "其他（待補充）" : item).join("、") : "待補充";
  const landlordConfirmed = profile.landlordConsent === "已確認並同意" || profile.landlordConsent === "房東已同意";
  const hasActivitySpace = selectedActivitySpaces.length > 0;
  const strongSignals = [preparationStrong, correctFirst >= 5, practiceComplete === practiceItems.length, hasActivitySpace, profile.reasons.length > 0, profile.housing !== "租屋" || landlordConfirmed, profile.hasHousemates !== true || profile.housematesConsent === true].filter(Boolean).length;
  const level = strongSignals >= 6 ? "已具備多項準備" : strongSignals >= 3 ? "有部分條件需要先確認" : "建議先完成準備事項";

  const prepared = [
    roomCompletion === 100 && "必要用品與生活空間已完成",
    hazardsReady.length === speciesConfig.hazards.length && "居家危險物已完成收納與防護",
    trunkPassed && "接送行李、文件與安全運輸已通過檢查",
    correctFirst >= 5 && `${correctFirst} 個情境第一次就掌握照顧方向`,
    practiceComplete === practiceItems.length && "目前的生活練習與飲水步驟皆已完成",
    hasActivitySpace && "已規劃寵物的主要活動空間",
    profile.reasons.length > 0 && "已整理飼養原因",
  ].filter(Boolean) as string[];
  const confirm = [
    roomCompletion < 100 && `必要用品完成度 ${roomCompletion}%`,
    hazardsReady.length < speciesConfig.hazards.length && "仍有居家危險物需要防護",
    !trunkPassed && "接寵物後車廂尚未通過檢查",
    !hasActivitySpace && "尚未填寫寵物預計活動空間",
    !profile.reasons.length && "尚未填寫飼養原因",
    ...needsLearning.slice(0, 5).map((item) => `情境需要再確認：${item}`),
  ].filter(Boolean) as string[];
  const familyTopics = [
    profile.hasHousemates && profile.housematesConsent !== true && "所有同住者是否知情並同意飼養",
    profile.housing === "租屋" && !landlordConfirmed && "租屋規定與房東書面同意",
  ].filter(Boolean) as string[];
  const actions = [
    ...confirm.slice(0, 5),
    "帶著品種需求與醫療紀錄問題詢問獸醫或領養單位",
    "和同住家人討論活動空間與日常照顧安排",
  ];
  const discussionTopics: SharedDiscussionTopic[] = Object.values(answers)
    .filter((answer) => answer.firstResult !== "correct" || Boolean(answer.discussionFlags?.length))
    .map((answer) => reportScenarios.find((scenario) => scenario.id === answer.scenarioId))
    .filter((scenario): scenario is Scenario => Boolean(scenario))
    .map((scenario) => ({
      id: scenario.id,
      title: personalizeReportText(scenario.title, petName, species),
      topic: personalizeReportText(scenario.topic ?? scenario.stage, petName, species),
      summary: scenario.id === "busy-daily-care"
        ? answers[scenario.id]?.discussionFlags?.includes("helper-details-to-confirm")
          ? "忙碌時的日常照顧：協助者已安排，但緊急聯絡方式仍值得在交接前再確認。"
          : "忙碌時的日常照顧：需要確認協助者是否真的有時間、能力與意願照顧寵物。"
        : scenario.id === "cat-busy-care"
          ? answers[scenario.id]?.discussionFlags?.includes("helper-details-to-confirm")
            ? personalizeReportText("臨時晚歸時的貓咪照顧：協助者已安排，但緊急聯絡方式仍值得在交接前再確認。", petName)
            : personalizeReportText("臨時晚歸時的貓咪照顧：需要確認協助者是否真的有時間、能力與意願照顧貓咪，並清楚交接食水、砂盆、環境巡視、陪玩與狀況觀察。", petName)
        : personalizeReportText(scenario.reportSummary ?? scenario.choices.find((choice) => choice.result === "correct")?.explanation ?? scenario.title, petName, species),
      knowledgePoints: knowledgePointsForScenario(scenario, petName, species),
    }));
  const activeDiscussion = discussionTopics.find((topic) => topic.id === activeDiscussionId);
  const discussionTopicIds = new Set(discussionTopics.map((topic) => topic.id));
  const masteredDetails: SharedDiscussionTopic[] = Object.values(answers)
    // 曾答錯、選擇「還不確定」或需補充確認的題目只保留在下方補強區，不重複列在已建立觀念。
    .filter((answer) => answer.finalResult === "correct" && !discussionTopicIds.has(answer.scenarioId))
    .map((answer) => reportScenarios.find((scenario) => scenario.id === answer.scenarioId))
    .filter((scenario): scenario is Scenario => Boolean(scenario))
    .map((scenario) => ({
      id: scenario.id,
      title: personalizeReportText(scenario.title, petName, species),
      topic: personalizeReportText(scenario.topic ?? scenario.stage, petName, species),
      summary: personalizeReportText(scenario.reportSummary ?? scenario.choices.find((choice) => choice.result === "correct")?.explanation ?? scenario.title, petName, species),
      knowledgePoints: knowledgePointsForScenario(scenario, petName, species),
    }));
  const activeKnowledge = activeDiscussion;
  // 僅彙整使用者第一次即掌握的題目，讓此區維持快速掃讀的主題摘要。
  const masteredThemes = (species === "rabbit" ? [
    {
      id: "rabbit-safe-home",
      icon: "⌂",
      title: "安全生活空間",
      summary: "知道要準備防滑、可躲藏且避開危險物的安全活動環境。",
      scenarioIds: [],
      preparationComplete: roomCompletion === 100 && hazardsReady.length === speciesConfig.hazards.length,
    },
    {
      id: "rabbit-arrival",
      icon: "♡",
      title: "接回與適應",
      summary: "理解兔子剛到家時需要安靜、可退避的空間，依自己的節奏探索。",
      scenarioIds: ["rabbit-arrival-adjustment"],
    },
    {
      id: "rabbit-food-daily",
      icon: "✦",
      title: "飲食與日常照護",
      summary: "了解牧草、乾淨飲水、環境巡視與日常觀察都需要穩定安排。",
      scenarioIds: ["rabbit-carry-sort", "rabbit-daily-check", "rabbit-stomp", "rabbit-heatstroke-prevention", "rabbit-heatstroke-emergency", "rabbit-shedding"],
      practiceComplete: lifeActivity.arrivalMealFoodReady && lifeActivity.arrivalMealWaterReady,
    },
    {
      id: "rabbit-breed-care",
      icon: "◌",
      title: "兔子的生理與習慣",
      summary: "能分辨正常生理行為，並把繁殖、清潔與日常照護放進長期安排。",
      scenarioIds: ["breed-challenge-1", "breed-challenge-2", "breed-challenge-3"],
    },
    {
      id: "rabbit-life-change",
      icon: "✚",
      title: "生活變化",
      summary: "知道忙碌時的交接、排泄與食慾異常，以及高齡後的環境調整都需要提早安排。",
      scenarioIds: ["rabbit-busy-care", "rabbit-health-emergency", "rabbit-senior-care"],
    },
  ] : species === "bird" ? [
    { id: "bird-safe-home", icon: "⌂", title: "安全生活空間", summary: "知道鳥籠、棲木、食水容器與空氣安全都必須在到家前準備好。", scenarioIds: [], preparationComplete: roomCompletion === 100 && hazardsReady.length === speciesConfig.hazards.length },
    { id: "bird-arrival", icon: "♡", title: "接回與適應", summary: "理解剛到家的鳥需要安靜、遮光感與循序適應。", scenarioIds: ["bird-arrival-adjustment"] },
    { id: "bird-daily-care", icon: "✦", title: "飲食與日常照護", summary: "能分辨安全食物，並把托盤清潔、健康觀察與陪伴安排成每天的節奏。", scenarioIds: ["bird-cage-inspection", "bird-puffing-feathers", "bird-molting-care"], practiceComplete: lifeActivity.arrivalMealFoodReady && lifeActivity.arrivalMealWaterReady },
    { id: "bird-reality", icon: "◌", title: "鳥的長期責任", summary: "理解空氣安全、健康監測、叫聲與社交需求都是飼養前必須接受的現實。", scenarioIds: ["breed-challenge-1", "breed-challenge-2", "breed-challenge-3"] },
    { id: "bird-life-change", icon: "✚", title: "生活變化", summary: "知道忙碌交接、急症就醫與高齡環境調整都要提早安排。", scenarioIds: ["bird-busy-care", "bird-health-emergency", "bird-senior-care"] },
  ] : species === "cat" ? [
    {
      id: "cat-safe-home",
      icon: "⌂",
      title: "安全生活空間",
      summary: "讓牠能在熟悉、可退回的環境裡，按照自己的節奏安心生活。",
      scenarioIds: ["cat-arrival-adjustment", "cat-indoor-outdoor-care"],
    },
    {
      id: "cat-daily-care",
      icon: "✦",
      title: "日常照護",
      summary: "把互動、抓磨與環境清潔安排成每天可持續的照顧節奏。",
      scenarioIds: ["cat-night-energy-care", "cat-scratching-care"],
    },
    {
      id: "cat-breed-care",
      icon: "◌",
      title: "品種與日常習慣",
      summary: "依牠的個性、活動量、飲食與健康需求，安排合適的日常照顧。",
      scenarioIds: ["breed-challenge-1", "breed-challenge-2", "breed-challenge-3"],
    },
    {
      id: "cat-life-arrangement",
      icon: "♡",
      title: "生活安排",
      summary: "生活忙碌時，也先替牠安排穩定、可信任的照顧支持。",
      scenarioIds: ["cat-busy-care"],
    },
    {
      id: "cat-health-senior",
      icon: "☀",
      title: "健康與高齡照護",
      summary: "持續觀察日常變化，並隨年齡調整牠容易活動與休息的環境。",
      scenarioIds: ["cat-illness-vet", "cat-growing-old"],
    },
  ] : [
    {
      id: "dog-safe-home",
      icon: "⌂",
      title: "安全生活空間",
      summary: "知道先整理安全、穩定的環境，讓牠能安心適應與活動。",
      scenarioIds: ["arrival-adjustment", "behavior-chewing", "behavior-toileting"],
    },
    {
      id: "dog-daily-care",
      icon: "✦",
      title: "每日照護安排",
      summary: "了解餵食、清潔、互動與規律如廁，都需要每天穩定投入。",
      scenarioIds: ["behavior-barking", "behavior-chewing", "behavior-toileting"],
    },
    {
      id: "dog-breed-care",
      icon: "◌",
      title: "品種與日常習慣",
      summary: "能把品種特性放進日常安排，提前準備合適的照顧方式。",
      scenarioIds: ["breed-challenge-1", "breed-challenge-2", "breed-challenge-3"],
    },
    {
      id: "dog-life-arrangement",
      icon: "♡",
      title: "生活變化與協助安排",
      summary: "知道忙碌時應先安排可信任的人，並清楚交接照顧需求。",
      scenarioIds: ["busy-daily-care"],
    },
    {
      id: "dog-health-senior",
      icon: "☀",
      title: "健康與高齡照護",
      summary: "知道狀況改變時要記錄並尋求協助，也會為高齡生活提早準備。",
      scenarioIds: ["illness-vet", "growing-old"],
    },
  ]).map((theme) => ({
    ...theme,
    matchedCount: masteredDetails.filter((detail) => (theme.scenarioIds as readonly string[]).includes(detail.id)).length
      + ("preparationComplete" in theme && theme.preparationComplete ? 1 : 0)
      + ("practiceComplete" in theme && theme.practiceComplete ? 1 : 0),
  })).filter((theme) => theme.matchedCount > 0);
  const knowledgeModal = activeKnowledge && typeof document !== "undefined"
    ? createPortal(
      <div className="knowledge-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveDiscussionId(""); }}>
        <section className="knowledge-modal" role="dialog" aria-modal="true" aria-labelledby="knowledge-modal-title">
          <button type="button" className="knowledge-modal-close" onClick={() => setActiveDiscussionId("")} aria-label="關閉知識點">×</button>
          <p className="life-stage-label">{activeKnowledge.topic}</p>
          <h2 id="knowledge-modal-title">{activeKnowledge.title}</h2>
          <p>回顧這一題較合適的照護知識點：</p>
          <ul>{activeKnowledge.knowledgePoints.map((point) => <li key={point}>{point}</li>)}</ul>
          <button type="button" className="knowledge-modal-confirm" onClick={() => setActiveDiscussionId("")}>我知道了</button>
        </section>
      </div>,
      document.body,
    )
    : null;
  const dailyCareModal = dailyCareDetailsOpen && typeof document !== "undefined"
    ? createPortal(
      <div className="knowledge-modal-backdrop daily-care-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setDailyCareDetailsOpen(false); }}>
        <section className="knowledge-modal daily-care-modal" role="dialog" aria-modal="true" aria-labelledby="daily-care-modal-title">
          <button type="button" className="knowledge-modal-close" onClick={() => setDailyCareDetailsOpen(false)} aria-label="關閉每日照護細項">×</button>
          <h2 id="daily-care-modal-title">每天留給牠的照護時間</h2>
          <p className="daily-care-modal-intro">{speciesConfig.report.dailyCareTimeNote}</p>
          <ul className="daily-care-modal-list">{speciesConfig.report.dailyCareBreakdown.map((item) => <li key={item.title}><b>{item.title}</b><span>{item.detail}</span></li>)}</ul>
          <button type="button" className="knowledge-modal-confirm" onClick={() => setDailyCareDetailsOpen(false)}>我知道了</button>
        </section>
      </div>,
      document.body,
    )
    : null;
  const homeSpaceImages = profile.homeSpaceImages.length ? profile.homeSpaceImages : (profile.homeSpaceImage ? [profile.homeSpaceImage] : []);
  const homeSpaceImageNames = profile.homeSpaceImageNames.length ? profile.homeSpaceImageNames : (profile.homeSpaceImageName ? [profile.homeSpaceImageName] : []);

  const checklistGroups = speciesConfig.report.checklistGroups;
  const handlingRows = speciesConfig.report.handlingRows;
  const consentText = profile.hasHousemates === true
    ? profile.housematesConsent === true ? "已知情並同意" : profile.housematesConsent === false ? "不同意" : "尚未確認"
    : "";
  const sensitiveHousemateText = profile.hasHousemates === true && profile.hasSensitiveHouseholdMembers ? "家中有幼童、長者、孕婦" : "";
  const pastPets = [
    profile.pastPetTypes.includes("狗") && `狗${profile.pastDogCount ? ` ${profile.pastDogCount} 隻` : ""}`,
    profile.pastPetTypes.includes("貓") && `貓${profile.pastCatCount ? ` ${profile.pastCatCount} 隻` : ""}`,
    profile.pastPetTypes.includes("其他") && (profile.pastOther || "其他"),
  ].filter(Boolean).join("、");
  const currentPets = [
    profile.currentPetTypes.includes("狗") && `狗${profile.currentDogCount ? ` ${profile.currentDogCount} 隻` : ""}`,
    profile.currentPetTypes.includes("貓") && `貓${profile.currentCatCount ? ` ${profile.currentCatCount} 隻` : ""}`,
    profile.currentPetTypes.includes("其他") && (profile.currentOther || "其他"),
  ].filter(Boolean).join("、");
  const printProfileSections = [
    {
      title: "時間與居住",
      rows: [
        profile.hoursAway !== "" && ["每天離家時間", `每日 ${profile.hoursAway} 小時`],
        profile.careHours !== "" && ["每天可投入照顧時間", `每日 ${profile.careHours} 小時`],
        profile.housing && ["居住空間", profile.housing],
        profile.housing === "租屋" && profile.landlordConsent && ["房東狀態", profile.landlordConsent],
      ].filter(Boolean) as string[][],
    },
    {
      title: "同住與活動空間",
      rows: [
        housemateStatus !== "待補充" && ["同居家人", housemateStatus],
        sensitiveHousemateText && ["特殊同住者類型", sensitiveHousemateText],
        consentText && ["同住者同意", consentText],
        activitySpace !== "待補充" && ["寵物預計活動空間", activitySpace],
      ].filter(Boolean) as string[][],
    },
    {
      title: "飼養經驗與原因",
      rows: [
        profile.noShibaExperience && [`${selectedTypeLabel}經驗`, `我沒有養過${selectedTypeLabel}`],
        pastPets && ["曾經飼養", pastPets],
        currentPets && ["目前家中有寵物", currentPets],
        profile.experienceNote && ["其他飼養經驗分享", profile.experienceNote],
        reasonStatus !== "待補充" && ["飼養原因", reasonStatus],
      ].filter(Boolean) as string[][],
    },
  ].map((section) => ({ ...section, rows: section.rows.slice(0, 6) })).filter((section) => section.rows.length > 0);

  return (
    <>
    <div className="content-wrap summary-page assessment-report compact-assessment">
      <article className="care-a4-sheet" aria-label="伴日子照顧準備總覽 A4">
        <header className="care-a4-header">
          <div>
            <p>伴日子新手村</p>
            <h1>照顧準備總覽</h1>
            <span>把這趟練習整理成你真正帶得走的照顧清單</span>
          </div>
          <aside className="care-breed-card">
            <span className="care-breed-copy">
              <b>{selectedBreed?.label ?? (petName || petNameFallback(species))}</b>
              {petName.trim() && <small>{petName}</small>}
            </span>
            {selectedBreed?.image && <img src={selectedBreed.image} alt={selectedBreed.label} />}
          </aside>
        </header>

        <section className="care-a4-checklists" aria-labelledby="care-a4-checklist-title">
          <h2 id="care-a4-checklist-title">準備清單</h2>
          {checklistGroups.map((group) => (
            <div key={group.title} className="care-a4-card">
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}><span aria-hidden="true">□</span><b>{item}</b></li>)}</ul>
            </div>
          ))}
        </section>

        <section className="care-a4-table-section" aria-labelledby="care-a4-table-title">
          <h2 id="care-a4-table-title">日常照護提醒</h2>
          <div className="care-a4-table">{handlingRows.map(([situation, advice]) => <div key={situation}><b>{situation}</b><p>{advice}</p></div>)}</div>
        </section>

      </article>

      <article className="care-a4-sheet care-a4-sheet--details" aria-label="伴日子照顧準備總覽：支出與每日投入">
        <header className="care-a4-header care-a4-header--compact">
          <div>
            <p>伴日子新手村</p>
            <h1>照顧安排與支出</h1>
            <span>把迎接牠前需要留意的時間與花費，整理成一份可帶走的指南</span>
          </div>
        </header>
        <section className="care-a4-money" aria-label="預估支出">
          <h2>預估支出</h2>
          <div className="care-a4-money-types">
            <h3>支出包含</h3>
            <ul>
              <li><span>初期準備金</span><b>NT$ {money.format(initialPreparationTotal)}</b></li>
              <li className="care-a4-money-note">（第一次需要準備的總金額，包含領養前環境佈置、出發前準備與到家後必要支出）</li>
              <li><span>每月預估支出</span><b>NT$ {money.format(monthlyBasicTotal)}／月</b></li>
            </ul>
          </div>
          <div className="care-a4-money-summary">
            <h3>金額摘要</h3>
            <dl>
              <div><dt>每月預估支出</dt><dd>NT$ {money.format(monthlyBasicTotal)}</dd></div>
              <div className="care-a4-money-total"><dt>初期準備金</dt><dd>NT$ {money.format(initialPreparationTotal)}</dd></div>
            </dl>
          </div>
          <p className="care-a4-money-disclaimer"><span className="care-a4-money-disclaimer-icon" aria-hidden="true">💡</span><span>{speciesConfig.report.moneyDisclaimer}</span></p>
        </section>

        <section className="care-a4-daily-time" aria-label="每日投入時間">
          <h2>每日投入時間</h2>
          <b>{speciesConfig.report.dailyCareTime}</b>
          <p>{speciesConfig.report.dailyCareTimeNote}</p>
          <ul>{speciesConfig.report.dailyCareBreakdown.map((item) => <li key={item.title}><span>{item.title}</span><b>{item.detail}</b></li>)}</ul>
        </section>

        <footer className="care-a4-commitment">
          <span aria-hidden="true">{committed ? "☑" : "□"}</span>
          <p>我已閱讀以上提醒，並承諾會善盡照顧責任，持續提供合適的飲食、乾淨飲水、安全環境、日常陪伴與必要醫療，好好照顧我的寵物。</p>
        </footer>
      </article>

      {discussionTopics.length > 0 && (
        <article className="care-a4-sheet care-a4-sheet--followup" aria-label="伴日子知識點複習摘要 A4">
          <header className="care-a4-header care-a4-header--compact">
            <div>
              <p>伴日子新手村</p>
              <h1>需要特別注意的照顧重點</h1>
              <span>把曾出現不同選擇的情境，整理成可再次確認的照顧觀念</span>
            </div>
          </header>
          <section className="care-a4-discussion care-a4-discussion--cards" aria-label="知識點複習摘要">
            {discussionTopics.map((topic) => (
              <article key={topic.id} className="care-a4-discussion-card">
                <h2>{topic.topic}</h2>
                <p><b>情境：</b>{topic.summary ?? topic.title}</p>
                <div>
                  <b>建議複習：</b>
                  <ul>{topic.knowledgePoints.slice(0, 4).map((point) => <li key={point}>{point}</li>)}</ul>
                </div>
              </article>
            ))}
          </section>
        </article>
      )}

      <section className="care-review-page" aria-label="你的飼養觀念回顧">
        <header className="care-review-hero">
          <div>
            <p className="life-stage-label">飼養生活回顧</p>
            <h1>你的飼養觀念回顧</h1>
            <p>回顧這次體驗中你已掌握的照顧重點，也看看哪些地方值得在真正迎接牠之前再多了解一些。</p>
          </div>
          <aside className="care-review-pet">
            <div><b>{selectedBreed?.label ?? selectedTypeLabel}</b>{petName.trim() && <span>{petName}</span>}</div>
            {selectedBreed?.image && <img src={selectedBreed.image} alt={selectedBreed.label} />}
          </aside>
        </header>

        <section className="care-review-section care-review-mastered" aria-labelledby="mastered-care-title">
          <header><span aria-hidden="true">✓</span><div><h2 id="mastered-care-title">你已建立的照顧觀念</h2><p>這些是你在情境中已經掌握、可以帶進真實生活的照顧方向。</p></div></header>
          {masteredThemes.length ? <div className="care-review-mastered-theme-grid">
            {masteredThemes.map((theme) => <article key={theme.id}>
              <span aria-hidden="true">✓</span>
              <div><b>{theme.title}</b><p>{theme.summary}</p></div>
            </article>)}
          </div> : <p className="care-review-empty">完成並答對情境題後，這裡會整理你已建立的照顧觀念。</p>}
        </section>

        <section className="care-review-section care-review-followup" aria-labelledby="followup-care-title">
          <header><span aria-hidden="true">✦</span><div><h2 id="followup-care-title">建議再留意的觀念</h2><p>以下主題在體驗中曾出現不同選擇，建議在真正飼養前，再多花一些時間了解。</p></div></header>
          {discussionTopics.length ? <div className="care-review-topic-grid">
            {discussionTopics.map((topic) => <article key={topic.id}><span aria-hidden="true">✦</span><div><b>{topic.title}</b><p>{topic.summary ?? topic.topic}</p></div><button type="button" className="discussion-info-button" onClick={() => setActiveDiscussionId(topic.id)} aria-label={`查看「${topic.title}」的知識點`}><i aria-hidden="true">i</i> 查看知識點</button></article>)}
          </div> : <div className="care-review-all-clear"><span aria-hidden="true">✓</span><p>你已完成本次體驗中的所有照顧重點。正式飼養前，仍可以透過照護指南持續複習。</p></div>}
        </section>

        <section className="care-review-section care-review-resources" aria-labelledby="care-resource-title">
          <header><div><h2 id="care-resource-title">預估支出與每日投入時間</h2><p>飼養不只有金錢支出，也需要穩定安排每天的照顧時間。</p></div></header>
          <div className="care-resource-grid">
            <article className="care-resource-cost"><span aria-hidden="true">$</span><div><h3>預估支出</h3><div className="care-cost-summary"><p><small>每月預估支出</small><b>NT$ {money.format(monthlyBasicTotal)}<em>／月</em></b></p><p><small>初期準備金<br />第一次需要準備的總金額</small><b>NT$ {money.format(initialPreparationTotal)}</b></p></div><p>臨時性支出會依健康與高齡照護狀況發生，建議另外預留備用金。</p><button type="button" className="secondary care-expense-button" onClick={() => setExpenseDetailsOpen(true)}>查看費用細項</button></div></article>
            <article className="care-resource-time"><span aria-hidden="true">◷</span><div><h3>每日投入時間</h3><b>{speciesConfig.report.dailyCareTime}</b><p>{speciesConfig.report.dailyCareTimeNote}</p><button type="button" className="secondary care-expense-button" onClick={() => setDailyCareDetailsOpen(true)}>查看每日照護細項</button></div></article>
          </div>
        </section>

        <section className="care-guide-download" aria-labelledby="care-guide-download-title">
          <div><span aria-hidden="true">↓</span><h2 id="care-guide-download-title">帶走你的照護指南</h2><p>將這次體驗整理成可保存的照護指南，之後準備迎接牠時也能再次查看。</p><small>內容包含：照顧準備清單、需要留意的照顧重點、預估支出、每日時間投入與照顧承諾</small></div>
          <PdfDownloadButton petName={petName} label="下載我的照護指南" />
        </section>
      </section>

      <article className="care-print-profile" aria-label="使用者填寫的個人資料">
        <header className="care-a4-header">
          <div>
            <p>個人資料</p>
            <h1>真實生活條件</h1>
            <span>僅列出你已填寫或勾選的內容</span>
          </div>
          <aside>
            <b>{petName || petNameFallback(species)}</b>
            <small>{selectedBreed?.label ?? selectedTypeLabel}</small>
          </aside>
        </header>
        <div className="print-profile-grid">
          {printProfileSections.length > 0 ? printProfileSections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <dl>{section.rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            </section>
          )) : <p className="print-empty-note">目前尚未補充真實生活條件。</p>}
        </div>
        <section className="print-home-space-photo" aria-label="居家空間照片">
          <h2>居家空間照片</h2>
          {homeSpaceImages.length ? (
            <div className="print-home-space-gallery">
              {homeSpaceImages.map((image, index) => (
                <figure key={`${homeSpaceImageNames[index] ?? "print-home-space"}-${index}`}>
                  <img src={image} alt={`使用者上傳的居家空間照片 ${index + 1}`} />
                  <figcaption>{homeSpaceImageNames[index] || `居家空間照片 ${index + 1}`}</figcaption>
                </figure>
              ))}
            </div>
          ) : <p>尚未上傳居家空間照片</p>}
        </section>
      </article>
      {expenseDetailsOpen && <ExpenseDetails expenses={expenses} breed={breed} species={species} onClose={() => setExpenseDetailsOpen(false)} />}
      {knowledgeModal}
      {dailyCareModal}
    </div>
    </>
  );
}
