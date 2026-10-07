"use client";

import { useEffect, useState } from "react";
import type { Profile } from "../../game-types";

const a4PageWidthPt = 595.28;
const a4PageHeightPt = 841.89;

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
  return [
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
      title: "飼養原因",
      rows: [
        { label: "飼養原因", value: reasons.length ? reasons : "尚未填寫" },
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

async function loadProfilePhoto(source: string | undefined) {
  if (!source) return null;
  try {
    const image = new Image();
    image.decoding = "async";
    image.src = await imageToDataUrl(source);
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Profile photo could not be loaded"));
    });
    return image;
  } catch (error) {
    console.warn("Skipping unreadable profile photo in PDF export.", error);
    return null;
  }
}

function drawProfilePhoto(context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) {
  const sourceRatio = image.naturalWidth / image.naturalHeight;
  const targetRatio = width / height;
  const sourceWidth = sourceRatio > targetRatio ? image.naturalHeight * targetRatio : image.naturalWidth;
  const sourceHeight = sourceRatio > targetRatio ? image.naturalHeight : image.naturalWidth / targetRatio;
  const sourceX = Math.max(0, (image.naturalWidth - sourceWidth) / 2);
  const sourceY = Math.max(0, (image.naturalHeight - sourceHeight) / 2);
  context.save();
  context.beginPath();
  context.roundRect(x, y, width, height, 18);
  context.clip();
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
  context.restore();
  context.strokeStyle = "#dfd0bb";
  context.lineWidth = 2;
  context.beginPath();
  context.roundRect(x, y, width, height, 18);
  context.stroke();
}

/** Draws the profile as true A4-sized pages. Sections move as units instead of scaling a long form into one canvas. */
async function createProfilePdfCanvases(profile: Profile, petName: string, selectedTypeLabel: string) {
  const pages: Array<{ canvas: HTMLCanvasElement; context: CanvasRenderingContext2D; y: number }> = [];
  const contentWidth = profilePdfPage.width - profilePdfPage.margin * 2;
  const bottom = profilePdfPage.height - profilePdfPage.footer;
  const photoSources = profile.homeSpaceImages.length ? profile.homeSpaceImages : (profile.homeSpaceImage ? [profile.homeSpaceImage] : []);
  const photos = (await Promise.all(photoSources.map(loadProfilePhoto))).filter((image): image is HTMLImageElement => Boolean(image));

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

  if (photos.length) {
    const photoGap = 24;
    let photoIndex = 0;

    while (photoIndex < photos.length) {
      const photosOnRow = Math.min(2, photos.length - photoIndex);
      const photoWidth = photosOnRow === 1 ? contentWidth : (contentWidth - photoGap) / 2;
      const photoHeight = photosOnRow === 1 ? 500 : 350;
      const requiredHeight = 58 + photoHeight;
      if (page.y + requiredHeight > bottom) page = startPage();

      page.context.fillStyle = "#8b5b2d";
      page.context.font = '700 30px "Noto Sans TC", "PingFang TC", sans-serif';
      page.context.fillText("居家空間照片", profilePdfPage.margin, page.y + 34);
      const photoY = page.y + 58;
      for (let column = 0; column < photosOnRow; column += 1) {
        const x = profilePdfPage.margin + column * (photoWidth + photoGap);
        drawProfilePhoto(page.context, photos[photoIndex + column], x, photoY, photoWidth, photoHeight);
      }
      photoIndex += photosOnRow;
      page.y = photoY + photoHeight + 38;
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
    const canvases = await createProfilePdfCanvases(profile, petName, selectedTypeLabel || "寵物");
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

async function downloadAssessmentImage(petName: string, kind: ReportPdfKind, profile?: Profile, selectedTypeLabel?: string) {
  if (kind === "profile" && profile) {
    const canvases = await createProfilePdfCanvases(profile, petName, selectedTypeLabel || "寵物");
    const safePetName = sanitizePdfFileName(petName);
    const baseFileName = safePetName ? `伴日子新手村_個人資料_${safePetName}` : "伴日子新手村_個人資料";
    for (let index = 0; index < canvases.length; index += 1) {
      const canvas = canvases[index];
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((nextBlob) => nextBlob ? resolve(nextBlob) : reject(new Error("PNG export failed")), "image/png");
      });
      downloadBlob(blob, canvases.length > 1 ? `${baseFileName}_${index + 1}.png` : `${baseFileName}.png`);
    }
    return;
  }
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

export function PdfDownloadButton({ petName, kind = "overview", label, profile, selectedTypeLabel }: { petName: string; kind?: ReportPdfKind; label?: string; profile?: Profile; selectedTypeLabel?: string }) {
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
            if (mobileDownload) await downloadAssessmentImage(petName, kind, profile, selectedTypeLabel);
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
