"use client";

import { useEffect, useState } from "react";
import { breeds, hazards, money, roomItems } from "../../game-data";
import { getBreedChallengeScenarios, lifeScenarios } from "../../life-data";
import type { CareMember, ExpenseRecord, LifeActivityState, Profile, Scenario, ScenarioAnswer } from "../../game-types";
import type { SharedDiscussionTopic } from "../../shared-result-types";
import { mergeDefaultVisibleExpenses, NavButtons } from "../shared/SharedComponents";

const a4PageWidthPt = 595.28;
const a4PageHeightPt = 841.89;

function personalizeReportText(text: string, petName: string) {
  const name = petName.trim() || "小狗";
  return text.replaceAll("豆豆", name).replaceAll("小狗", name).replaceAll("狗狗", name);
}

function knowledgePointsForScenario(scenario: Scenario, petName: string) {
  const correctChoices = scenario.choices.filter((choice) => choice.result === "correct");
  const rawPoints = scenario.correctSummary?.length
    ? scenario.correctSummary
    : correctChoices.flatMap((choice) => [choice.text, choice.explanation, choice.suggestion ?? ""]);
  return Array.from(new Set(rawPoints.flatMap((point) => point.split("\n")).map((point) => personalizeReportText(point.trim(), petName)).filter(Boolean))).slice(0, 6);
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

type ReportPdfKind = "overview" | "profile";

async function downloadAssessmentPdf(petName: string, kind: ReportPdfKind) {
  const selector = kind === "profile" ? ".care-print-profile" : ".care-a4-sheet";
  const sourcePages = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (!sourcePages.length) throw new Error("PDF source pages not found");

  const stage = document.createElement("div");
  stage.className = "pdf-export-stage";
  sourcePages.forEach((page) => stage.appendChild(page.cloneNode(true)));
  document.body.appendChild(stage);

  try {
    await document.fonts?.ready;
    await replaceImagesWithDataUrls(stage);
    const pages = Array.from(stage.children) as HTMLElement[];
    const canvases = [];
    for (const page of pages) canvases.push(await elementToCanvas(page));
    const blob = createPdfBlobFromCanvases(canvases);
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
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  } finally {
    stage.remove();
  }
}

function PdfDownloadButton({ petName, kind = "overview", label }: { petName: string; kind?: ReportPdfKind; label?: string }) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const buttonLabel = label ?? (kind === "profile" ? "下載個人資料 PDF" : "下載照顧準備總覽 PDF");

  return (
    <div className="report-download-control">
      {error && <p className="pdf-download-error" role="alert">{error}</p>}
      <button
        type="button"
        className={`primary pdf-download-button ${generating ? "is-generating" : ""}`}
        onClick={async () => {
          if (generating) return;
          setGenerating(true);
          setError("");
          try {
            await downloadAssessmentPdf(petName, kind);
          } catch {
            setError("PDF 下載失敗，請再試一次。");
          } finally {
            setGenerating(false);
          }
        }}
        disabled={generating}
        aria-label={buttonLabel}
        title="下載 PDF"
      >
        {generating ? (
          <span className="pdf-download-spinner" aria-hidden="true" />
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 3a1 1 0 0 1 1 1v9.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.4l3.3 3.3V4a1 1 0 0 1 1-1Z" />
            <path d="M5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z" />
          </svg>
        )}
        <span>{generating ? "正在整理 PDF…" : buttonLabel}</span>
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
  onChange,
  onBack,
  onReset,
}: {
  profile: Profile;
  petName: string;
  onChange: (profile: Profile) => void;
  onBack: () => void;
  onReset: () => void;
}) {
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
    <section className="content-wrap profile-supplement" aria-labelledby="profile-supplement-title">
      <div className="profile-wizard-head"><div><h1 id="profile-supplement-title">補充真實生活條件</h1><p>這些資料可協助收容所、寵物店家或照護人員了解你的居住環境、同住者狀況與飼養經驗，作為後續溝通與照顧建議的參考。</p></div></div>
      <section className="profile-panel">
        <fieldset><legend>每天的時間</legend><div className="profile-time-grid"><label>每天離家時間<span>每日 <input type="number" min="0" max="24" value={profile.hoursAway} onChange={(event) => update("hoursAway", clamp(event.target.value, 24))} /> 小時</span></label><label>每天可投入照顧時間<span>每日 <input type="number" min="0" max="24" value={profile.careHours} onChange={(event) => update("careHours", clamp(event.target.value, 24))} /> 小時</span></label></div></fieldset>
        <fieldset><legend>居住空間</legend><div className="housing-options">{["自有住宅", "租屋"].map((value) => <OptionButton key={value} label={value} selected={profile.housing === value} onClick={() => chooseHousing(value)} simple />)}</div>{profile.housing === "租屋" && <div className="supplement-followup landlord-consent-followup"><b>房東／租約是否允許飼養寵物？</b><div className="supplement-choice-grid compact">{["已確認並同意", "尚未確認", "不同意"].map((value) => {
          const selected = profile.landlordConsent === value || (value === "已確認並同意" && profile.landlordConsent === "房東已同意") || (value === "尚未確認" && profile.landlordConsent === "尚未取得同意");
          return <button type="button" key={value} className={`supplement-choice ${selected ? "selected" : ""}`} aria-pressed={selected} onClick={() => update("landlordConsent", value)}>{selected && <SelectedDot />}{value}</button>;
        })}</div></div>}</fieldset>
        <fieldset><legend>同居家人</legend><div className="supplement-choice-grid compact housemate-presence-choice"><button type="button" className={`supplement-choice ${profile.hasHousemates === false ? "selected" : ""}`} aria-pressed={profile.hasHousemates === false} onClick={() => chooseHousematePresence(false)}>{profile.hasHousemates === false && <SelectedDot />}無</button><button type="button" className={`supplement-choice ${profile.hasHousemates === true ? "selected" : ""}`} aria-pressed={profile.hasHousemates === true} onClick={() => chooseHousematePresence(true)}>{profile.hasHousemates === true && <SelectedDot />}有</button></div>{profile.hasHousemates === true && <div className="housemate-entry-row"><label className="supplement-inline-input housemate-text-input">請簡單填寫同住家人<input value={profile.housemateList[0] ?? ""} placeholder="例如：爸爸、媽媽、妹妹" onChange={(event) => updateHousemateText(event.target.value)} /></label><label className="supplement-checkbox"><input type="checkbox" checked={profile.hasSensitiveHouseholdMembers} onChange={(event) => update("hasSensitiveHouseholdMembers", event.target.checked)} />家中有幼童、長者、孕婦</label></div>}{profile.hasHousemates === true && <div className="supplement-followup"><b>同住者是否知情並同意飼養？</b><div className="supplement-choice-grid compact">{consentOptions.map((option) => <button type="button" key={option.value} className={`supplement-choice ${option.selected ? "selected" : ""}`} aria-pressed={option.selected} onClick={() => update("housematesConsent", option.consent)}>{option.selected && <SelectedDot />}{option.label}</button>)}</div></div>}</fieldset>
        <fieldset><legend>寵物預計活動空間</legend><div className="supplement-choice-grid">{["戶外空間", "室內客廳", "房間", "其他"].map((value) => <button type="button" key={value} className={`supplement-choice ${profile.activitySpace === value ? "selected" : ""}`} aria-pressed={profile.activitySpace === value} onClick={() => update("activitySpace", value)}>{profile.activitySpace === value && <SelectedDot />}{value}</button>)}</div>{profile.activitySpace === "其他" && <label className="supplement-inline-input">其他活動空間<input placeholder="請說明" value={profile.otherActivitySpace} onChange={(event) => update("otherActivitySpace", event.target.value)} /></label>}</fieldset>
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
        <fieldset><legend>飼養經驗</legend><div className="pet-experience-block"><b>曾經飼養：</b><div className="pet-experience-row">{experienceInputs("past")}</div><b>目前家中有寵物：</b><div className="pet-experience-row">{experienceInputs("current")}</div><label className="experience-note">其他飼養經驗分享：<textarea placeholder="請分享你的照顧經驗" value={profile.experienceNote} onChange={(event) => update("experienceNote", event.target.value)} /></label></div><button type="button" className={`supplement-choice shiba-experience ${profile.noShibaExperience ? "selected" : ""}`} aria-pressed={profile.noShibaExperience} onClick={() => update("noShibaExperience", !profile.noShibaExperience)}>{profile.noShibaExperience && <SelectedDot />}我沒有養過柴犬</button></fieldset>
        <fieldset><legend>飼養原因 <small>可複選</small></legend><div className="supplement-choice-grid reasons">{["陪伴與情緒支持", "喜愛動物", "單純想養", "看家守衛", "他人推薦", "其他"].map((reason) => {
          const selected = profile.reasons.includes(reason);
          return <button type="button" key={reason} className={`supplement-choice ${selected ? "selected" : ""}`} aria-pressed={selected} onClick={() => toggle("reasons", reason)}>{selected && <SelectedDot />}{reason}</button>;
        })}</div>{profile.reasons.includes("其他") && <label className="supplement-inline-input">其他飼養原因<input placeholder="請說明" value={profile.reasonOther} onChange={(event) => update("reasonOther", event.target.value)} /></label>}</fieldset>
      </section>
      <div className="profile-pdf-actions">
        <PdfDownloadButton petName={petName} kind="profile" label="下載個人資料 PDF" />
      </div>
    </section>
  );
}

export function AssessmentReport({
  petName,
  breed,
  profile,
  expenses,
  emergencyReserve,
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
  profile: Profile;
  expenses: ExpenseRecord[];
  emergencyReserve: number;
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
  useEffect(() => {
    if (!activeDiscussionId) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveDiscussionId("");
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeDiscussionId]);
  const visibleExpenses = mergeDefaultVisibleExpenses(expenses, breed);
  const total = visibleExpenses.reduce((sum, item) => sum + item.amount, 0);
  const suggestedPreparedTotal = total + emergencyReserve;
  const correctFirst = Object.values(answers).filter((item) => item.firstResult === "correct").length;
  const corrected = Object.values(answers).filter((item) => item.firstResult !== "correct" && item.finalResult === "correct");
  const correctTopics = Object.values(answers).filter((item) => item.firstResult === "correct").map((item) => lifeScenarios.find((scenario) => scenario.id === item.scenarioId)?.topic).filter(Boolean) as string[];
  const correctedTopics = corrected.map((item) => lifeScenarios.find((scenario) => scenario.id === item.scenarioId)?.topic).filter(Boolean) as string[];
  const needsLearning = Object.values(answers).filter((item) => item.firstResult === "incorrect" && item.finalResult !== "correct").map((item) => lifeScenarios.find((scenario) => scenario.id === item.scenarioId)?.topic).filter(Boolean) as string[];
  const practiceItems = [
    { label: "已完成到家第一餐", complete: lifeActivity.arrivalMealFoodReady && lifeActivity.arrivalMealWaterReady },
  ];
  const practiceComplete = practiceItems.filter((item) => item.complete).length;
  const backupNames = members.filter((member) => !member.isPlayer && member.name.trim()).map((member) => member.name);
  const requiredRoom = roomItems.filter((item) => item.required);
  const roomCompletion = Math.round((roomReady.filter((id) => requiredRoom.some((item) => item.id === id)).length / requiredRoom.length) * 100);
  const preparationStrong = roomCompletion === 100 && hazardsReady.length === hazards.length && trunkPassed;
  const activitySpace = profile.activitySpace === "其他" ? profile.otherActivitySpace || "其他（待補充）" : profile.activitySpace || "待補充";
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
  const experienceStatus = profile.noShibaExperience ? "沒有柴犬經驗" : profile.pastPetTypes.length || profile.currentPetTypes.length || profile.experienceNote ? "已補充飼養經驗" : "待補充";
  const reasonStatus = profile.reasons.length ? profile.reasons.map((item) => item === "其他" ? profile.reasonOther || "其他（待補充）" : item).join("、") : "待補充";
  const landlordConfirmed = profile.landlordConsent === "已確認並同意" || profile.landlordConsent === "房東已同意";
  const strongSignals = [preparationStrong, correctFirst >= 5, practiceComplete === practiceItems.length, profile.activitySpace !== "", profile.reasons.length > 0, profile.housing !== "租屋" || landlordConfirmed, profile.hasHousemates !== true || profile.housematesConsent === true].filter(Boolean).length;
  const level = strongSignals >= 6 ? "已具備多項準備" : strongSignals >= 3 ? "有部分條件需要先確認" : "建議先完成準備事項";

  const prepared = [
    roomCompletion === 100 && "必要用品與生活空間已完成",
    hazardsReady.length === hazards.length && "居家危險物已完成收納與防護",
    trunkPassed && "接送行李、文件與安全運輸已通過檢查",
    correctFirst >= 5 && `${correctFirst} 個情境第一次就掌握照顧方向`,
    practiceComplete === practiceItems.length && "目前的生活練習與飲水步驟皆已完成",
    profile.activitySpace && "已規劃寵物的主要活動空間",
    profile.reasons.length > 0 && "已整理飼養原因",
  ].filter(Boolean) as string[];
  const confirm = [
    roomCompletion < 100 && `必要用品完成度 ${roomCompletion}%`,
    hazardsReady.length < hazards.length && "仍有居家危險物需要防護",
    !trunkPassed && "接寵物後車廂尚未通過檢查",
    !profile.activitySpace && "尚未填寫寵物預計活動空間",
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
  const selectedBreed = breeds.find((item) => item.id === breed);
  const reportScenarios = [...lifeScenarios, ...getBreedChallengeScenarios(breed)];
  const discussionTopics: SharedDiscussionTopic[] = Object.values(answers)
    .filter((answer) => answer.firstResult !== "correct")
    .map((answer) => reportScenarios.find((scenario) => scenario.id === answer.scenarioId))
    .filter((scenario): scenario is Scenario => Boolean(scenario))
    .map((scenario) => ({
      id: scenario.id,
      title: personalizeReportText(scenario.title, petName),
      topic: scenario.topic ?? scenario.stage,
      summary: personalizeReportText(scenario.reportSummary ?? scenario.choices.find((choice) => choice.result === "correct")?.explanation ?? scenario.title, petName),
      knowledgePoints: knowledgePointsForScenario(scenario, petName),
    }));
  const activeDiscussion = discussionTopics.find((topic) => topic.id === activeDiscussionId);
  const homeSpaceImages = profile.homeSpaceImages.length ? profile.homeSpaceImages : (profile.homeSpaceImage ? [profile.homeSpaceImage] : []);
  const homeSpaceImageNames = profile.homeSpaceImageNames.length ? profile.homeSpaceImageNames : (profile.homeSpaceImageName ? [profile.homeSpaceImageName] : []);

  const checklistGroups = [
    { title: "每日照顧", items: ["固定餵食", "提供乾淨飲水", "觀察精神、食慾與排泄", "安排陪伴與活動", "外出散步或合適活動", "清理排泄物"] },
    { title: "家中環境", items: ["睡墊", "水碗與狗碗", "尿墊或如廁區", "寵物專用清潔用品", "危險物品收好", "安靜休息空間"] },
    { title: "外出與接回", items: ["身分證", "領養文件", "運輸籠", "尿墊", "牽繩", "飲水與清潔用品"] },
  ];
  const handlingRows = [
    ["忙碌或離家", "安排家人、朋友或合適照護者協助"],
    ["食慾、精神或排泄異常", "記錄並聯絡獸醫"],
    ["行為困擾", "調整環境、提供活動，必要時尋求專業協助"],
    ["生活改變", "重新安排照顧時間與支援"],
    ["高齡階段", "提早準備醫療與長期照顧資源"],
  ];
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
        profile.noShibaExperience && ["柴犬經驗", "我沒有養過柴犬"],
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
              <b>{selectedBreed?.label ?? (petName || "小狗")}</b>
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
          <h2 id="care-a4-table-title">需要特別處理的狀況</h2>
          <div className="care-a4-table">{handlingRows.map(([situation, advice]) => <div key={situation}><b>{situation}</b><p>{advice}</p></div>)}</div>
        </section>

        {discussionTopics.length > 0 && <section className="care-a4-discussion" aria-label="知識點複習摘要">
          <h2><span aria-hidden="true">△</span> 知識點複習摘要</h2>
          <ul>{discussionTopics.slice(0, 4).map((topic) => <li key={topic.id}>{topic.summary ?? topic.title}</li>)}</ul>
          {discussionTopics.length > 4 && <small>另有 {discussionTopics.length - 4} 題，請查看分享頁完整知識點。</small>}
        </section>}

        <section className="care-a4-money" aria-label="預估支出">
          <h2>預估支出</h2>
          <div className="care-a4-money-types">
            <h3>支出包含</h3>
            <ul>
              <li>到家後必要支出</li>
              <li className="care-a4-money-note">（晶片與寵物登記、狂犬病疫苗、基礎疫苗與初期健康檢查）</li>
              <li>一次性準備費</li>
              <li>每月基本支出</li>
              <li>臨時／醫療支出</li>
              <li>建議預留醫療應急金</li>
            </ul>
          </div>
          <div className="care-a4-money-summary">
            <h3>金額摘要</h3>
            <dl>
              <div><dt>目前模擬支出</dt><dd>NT$ {money.format(total)}</dd></div>
              <div><dt>建議預留醫療應急金</dt><dd>NT$ {money.format(emergencyReserve)}</dd></div>
              <div><dt>建議準備金額</dt><dd>NT$ {money.format(suggestedPreparedTotal)}</dd></div>
            </dl>
          </div>
        </section>

        <footer className="care-a4-commitment">
          <span aria-hidden="true">{committed ? "☑" : "□"}</span>
          <p>我已閱讀以上提醒，並承諾會善盡照顧責任，持續提供合適的飲食、乾淨飲水、安全環境、日常陪伴與必要醫療，好好照顧我的寵物。</p>
        </footer>
      </article>

      {discussionTopics.length > 0 ? (
        <section className="overview-discussion" aria-labelledby="overview-discussion-title">
          <header className="overview-discussion-heading"><span aria-hidden="true">△</span><div><h2 id="overview-discussion-title">建議再深入討論的題目</h2><p>這些題目可以特別再複習一次相關的知識點。</p></div></header>
          <div className="overview-discussion-list">
            {discussionTopics.map((topic) => (
              <article key={topic.id} className="overview-discussion-card">
                <span aria-hidden="true">△</span>
                <div><b>{topic.title}</b><small>{topic.summary ?? topic.topic}</small></div>
                <button type="button" className="discussion-info-button" onClick={() => setActiveDiscussionId(topic.id)} aria-label={`查看「${topic.title}」的知識點`}><i aria-hidden="true">i</i> 查看知識點</button>
              </article>
            ))}
          </div>
        </section>
      ) : <section className="overview-discussion-clear"><span aria-hidden="true">✓</span><div><h2>目前沒有需要特別標示的題目</h2><p>仍建議帶著總覽和家人討論實際分工與生活安排。</p></div></section>}

      <section className="care-commitment overview-commitment" aria-labelledby="overview-care-commitment-title">
        <h2 id="overview-care-commitment-title">照顧承諾</h2>
        <label>
          <input type="checkbox" checked={committed} onChange={(event) => onCommittedChange(event.target.checked)} />
          <span>我已閱讀以上提醒，並承諾會善盡照顧責任，持續提供合適的飲食、乾淨飲水、安全環境、日常陪伴與必要醫療，好好照顧我的寵物。</span>
        </label>
      </section>

      <article className="care-print-profile" aria-label="使用者填寫的個人資料">
        <header className="care-a4-header">
          <div>
            <p>個人資料</p>
            <h1>真實生活條件</h1>
            <span>僅列出你已填寫或勾選的內容</span>
          </div>
          <aside>
            <b>{petName || "小狗"}</b>
            <small>{selectedBreed?.label ?? "柴犬"}</small>
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
      <div className="report-download-footer">
        <PdfDownloadButton petName={petName} />
      </div>
      {activeDiscussion && <div className="knowledge-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveDiscussionId(""); }}>
        <section className="knowledge-modal" role="dialog" aria-modal="true" aria-labelledby="knowledge-modal-title">
          <button type="button" className="knowledge-modal-close" onClick={() => setActiveDiscussionId("")} aria-label="關閉知識點">×</button>
          <p className="life-stage-label">{activeDiscussion.topic}</p>
          <h2 id="knowledge-modal-title">{activeDiscussion.title}</h2>
          <p>回顧這一題較合適的照護知識點：</p>
          <ul>{activeDiscussion.knowledgePoints.map((point) => <li key={point}>{point}</li>)}</ul>
          <button type="button" className="knowledge-modal-confirm" onClick={() => setActiveDiscussionId("")}>我知道了</button>
        </section>
      </div>}
    </div>
    </>
  );
}
