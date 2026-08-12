"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { breeds, hazards, money, roomItems } from "../../game-data";
import { lifeScenarios } from "../../life-data";
import type { CareMember, ExpenseRecord, LifeActivityState, Profile, ScenarioAnswer } from "../../game-types";
import { mergeDefaultVisibleExpenses, NavButtons } from "../shared/SharedComponents";

function PdfFab() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <button type="button" className="primary pdf-fab" onClick={() => window.print()}>
      輸出 PDF
    </button>,
    document.body
  );
}

function OptionButton({ label, selected, onClick, icon, simple = false }: { label: string; selected: boolean; onClick: () => void; icon?: string; simple?: boolean }) {
  return (
    <button type="button" className={`profile-option ${simple ? "simple" : ""} ${selected ? "selected" : ""}`} aria-pressed={selected} onClick={onClick}>
      {selected && <i aria-hidden="true">?</i>}{icon && <span aria-hidden="true">{icon}</span>}<b>{label}</b>{!simple && <small>{selected ? "已選擇" : "點擊選擇"}</small>}
    </button>
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
  onChange,
  onBack,
  onReset,
}: {
  profile: Profile;
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
    reader.onload = () => onChange({ ...profile, homeSpaceImage: String(reader.result ?? ""), homeSpaceImageName: file.name });
    reader.readAsDataURL(file);
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

  return (
    <section className="content-wrap profile-supplement" aria-labelledby="profile-supplement-title">
      <div className="profile-wizard-head"><div><h1 id="profile-supplement-title">補充真實生活條件</h1><p>這些資料可協助收容所、寵物店家或照護人員了解你的居住環境、同住者狀況與飼養經驗，作為後續溝通與照顧建議的參考。</p></div></div>
      <section className="profile-panel">
        <fieldset><legend>每天的時間</legend><div className="profile-time-grid"><label>每天離家時間<span>每日 <input type="number" min="0" max="24" value={profile.hoursAway} onChange={(event) => update("hoursAway", clamp(event.target.value, 24))} /> 小時</span></label><label>每天可投入照顧時間<span>每日 <input type="number" min="0" max="24" value={profile.careHours} onChange={(event) => update("careHours", clamp(event.target.value, 24))} /> 小時</span></label></div></fieldset>
        <fieldset><legend>居住空間</legend><div className="housing-options">{["自有住宅", "租屋"].map((value) => <OptionButton key={value} label={value} selected={profile.housing === value} onClick={() => chooseHousing(value)} simple />)}</div>{profile.housing === "租屋" && <div className="supplement-followup landlord-consent-followup"><b>房東／租約是否允許飼養寵物？</b><div className="supplement-choice-grid compact">{["已確認並同意", "尚未確認", "不同意"].map((value) => {
          const selected = profile.landlordConsent === value || (value === "已確認並同意" && profile.landlordConsent === "房東已同意") || (value === "尚未確認" && profile.landlordConsent === "尚未取得同意");
          return <button type="button" key={value} className={`supplement-choice ${selected ? "selected" : ""}`} aria-pressed={selected} onClick={() => update("landlordConsent", value)}>{value}</button>;
        })}</div></div>}</fieldset>
        <fieldset><legend>同居家人</legend><div className="supplement-choice-grid compact housemate-presence-choice"><button type="button" className={`supplement-choice ${profile.hasHousemates === false ? "selected" : ""}`} aria-pressed={profile.hasHousemates === false} onClick={() => chooseHousematePresence(false)}>{profile.hasHousemates === false && <span>✓</span>}無</button><button type="button" className={`supplement-choice ${profile.hasHousemates === true ? "selected" : ""}`} aria-pressed={profile.hasHousemates === true} onClick={() => chooseHousematePresence(true)}>{profile.hasHousemates === true && <span>✓</span>}有</button></div>{profile.hasHousemates === true && <label className="supplement-inline-input housemate-text-input">請簡單填寫同住家人<input value={profile.housemateList[0] ?? ""} placeholder="例如：爸爸、媽媽、妹妹" onChange={(event) => updateHousemateText(event.target.value)} /></label>}{profile.hasHousemates === true && <div className="supplement-followup"><b>同住者是否知情並同意飼養？</b><div className="supplement-choice-grid compact">{consentOptions.map((option) => <button type="button" key={option.value} className={`supplement-choice ${option.selected ? "selected" : ""}`} aria-pressed={option.selected} onClick={() => update("housematesConsent", option.consent)}>{option.label}</button>)}</div></div>}</fieldset>
        <fieldset><legend>寵物預計活動空間</legend><div className="supplement-choice-grid">{["戶外空間", "室內客廳", "房間", "其他"].map((value) => <button type="button" key={value} className={`supplement-choice ${profile.activitySpace === value ? "selected" : ""}`} aria-pressed={profile.activitySpace === value} onClick={() => update("activitySpace", value)}>{profile.activitySpace === value && <span>✓</span>}{value}</button>)}</div>{profile.activitySpace === "其他" && <label className="supplement-inline-input">其他活動空間<input placeholder="請說明" value={profile.otherActivitySpace} onChange={(event) => update("otherActivitySpace", event.target.value)} /></label>}</fieldset>
        <fieldset><legend>居家空間</legend><div className="home-space-upload">
          <label>
            <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleHomeSpaceImage(event.target.files?.[0])} />
            <b>共同為毛孩的安全把關</b>
            <span>可上傳未來寵物活動空間照片，協助評估環境安全與照顧安排。</span>
            <em>{profile.homeSpaceImageName || "選擇 PNG、JPG、JPEG 或 WebP 圖片"}</em>
          </label>
          {profile.homeSpaceImage && <figure><img src={profile.homeSpaceImage} alt="已上傳的居家空間照片預覽" /><figcaption>{profile.homeSpaceImageName}</figcaption></figure>}
        </div></fieldset>
        <fieldset><legend>飼養經驗</legend><div className="pet-experience-block"><b>曾經飼養：</b><div className="pet-experience-row">{experienceInputs("past")}</div><b>目前家中有寵物：</b><div className="pet-experience-row">{experienceInputs("current")}</div><label className="experience-note">其他飼養經驗分享：<textarea placeholder="請分享你的照顧經驗" value={profile.experienceNote} onChange={(event) => update("experienceNote", event.target.value)} /></label></div><button type="button" className={`supplement-choice shiba-experience ${profile.noShibaExperience ? "selected" : ""}`} aria-pressed={profile.noShibaExperience} onClick={() => update("noShibaExperience", !profile.noShibaExperience)}>我沒有養過柴犬</button></fieldset>
        <fieldset><legend>飼養原因 <small>可複選</small></legend><div className="supplement-choice-grid reasons">{["陪伴與情緒支持", "喜愛動物", "單純想養", "看家守衛", "他人推薦", "其他"].map((reason) => <button type="button" key={reason} className={`supplement-choice ${profile.reasons.includes(reason) ? "selected" : ""}`} aria-pressed={profile.reasons.includes(reason)} onClick={() => toggle("reasons", reason)}>{profile.reasons.includes(reason) && <span>✓</span>}{reason}</button>)}</div>{profile.reasons.includes("其他") && <label className="supplement-inline-input">其他飼養原因<input placeholder="請說明" value={profile.reasonOther} onChange={(event) => update("reasonOther", event.target.value)} /></label>}</fieldset>
      </section>
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
  onBack: () => void;
  onReset: () => void;
}) {
  const [committed, setCommitted] = useState(false);
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

  const checklistGroups = [
    { title: "每日照顧", items: ["固定餵食", "提供乾淨飲水", "觀察精神、食慾與排泄", "安排陪伴與活動", "外出散步或合適活動", "清理排泄物"] },
    { title: "家中環境", items: ["睡墊", "水碗與狗碗", "尿墊或如廁區", "清潔用品", "危險物品收好", "安靜休息空間"] },
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
    <PdfFab />
    <div className="content-wrap summary-page assessment-report compact-assessment">
      <article className="care-a4-sheet" aria-label="毛日子照顧準備總覽 A4">
        <header className="care-a4-header">
          <div>
            <p>毛日子新手村</p>
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

      <section className="care-commitment overview-commitment" aria-labelledby="overview-care-commitment-title">
        <h2 id="overview-care-commitment-title">照顧承諾</h2>
        <label>
          <input type="checkbox" checked={committed} onChange={(event) => setCommitted(event.target.checked)} />
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
          {profile.homeSpaceImage ? <figure><img src={profile.homeSpaceImage} alt="使用者上傳的居家空間照片" /><figcaption>{profile.homeSpaceImageName || "已上傳居家空間照片"}</figcaption></figure> : <p>尚未上傳居家空間照片</p>}
        </section>
      </article>
    </div>
    </>
  );
}
