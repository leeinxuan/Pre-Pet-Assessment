"use client";

/* eslint-disable @next/next/no-img-element -- Profile photo previews must preserve the existing native image behavior. */

import { useState } from "react";
import { getSpeciesConfig } from "../../data/species/index";
import type { Profile } from "../../game-types";
import { NavButtons } from "../shared/SharedComponents";
import { PdfDownloadButton } from "./PdfExportControls";

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
  const selectedTypeLabel = selectedBreed?.label ?? getSpeciesConfig(species).copy.animalNameFallback;
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

