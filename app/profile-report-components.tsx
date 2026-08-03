"use client";

import { useState } from "react";
import { breeds, hazards, money, roomItems } from "./game-data";
import { lifeScenarios } from "./life-data";
import type { CareMember, ExpenseRecord, LifeActivityState, Profile, ScenarioAnswer } from "./game-types";
import { NavButtons } from "./shared-components";

function OptionButton({ label, selected, onClick, icon }: { label: string; selected: boolean; onClick: () => void; icon?: string }) {
  return (
    <button type="button" className={`profile-option ${selected ? "selected" : ""}`} aria-pressed={selected} onClick={onClick}>
      {selected && <i aria-hidden="true">✓</i>}{icon && <span aria-hidden="true">{icon}</span>}<b>{label}</b><small>{selected ? "已選擇" : "點擊選擇"}</small>
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
          <fieldset><legend>居住類型</legend><div className="housing-options">{["自有住宅", "租屋"].map((value) => <OptionButton key={value} label={value} selected={profile.housing === value} onClick={() => update("housing", value)} />)}</div>{errors.housing && <p className="field-error">{errors.housing}</p>}{profile.housing === "租屋" && <div className="landlord-options">{["房東已同意", "尚未取得同意"].map((value) => <OptionButton key={value} label={value} selected={profile.landlordConsent === value} onClick={() => update("landlordConsent", value)} />)}</div>}{errors.landlordConsent && <p className="field-error">{errors.landlordConsent}</p>}</fieldset>
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
  const [committed, setCommitted] = useState(false);
  const [finished, setFinished] = useState(false);
  const update = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    onChange({ ...profile, [key]: value });
    setFinished(false);
  };
  const clamp = (raw: string, max: number) => raw === "" ? "" : String(Math.min(max, Math.max(0, Number(raw.replace(/\D/g, "")) || 0)));
  const toggle = (key: "pastPetTypes" | "currentPetTypes" | "reasons", value: string) => update(key, profile[key].includes(value) ? profile[key].filter((item) => item !== value) : [...profile[key], value]);
  const chooseHousemate = (value: string) => {
    if (value === "無") return onChange({ ...profile, housemateTypes: ["無"], otherHousemate: "", hasHousemates: false, housematesConsent: null });
    const existing = profile.housemateTypes.filter((item) => item !== "無");
    const housemateTypes = existing.includes(value) ? existing.filter((item) => item !== value) : [...existing, value];
    onChange({ ...profile, housemateTypes, hasHousemates: housemateTypes.length ? true : null });
  };
  const setCount = (key: "pastDogCount" | "pastCatCount" | "currentDogCount" | "currentCatCount", raw: string) => update(key, clamp(raw, 99));
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
      <section className="info-use-section">
        <div className="profile-wizard-head"><div><h1>為什麼需要補充這些資料？</h1><p>你填寫的資料會用來整理更貼近你生活狀況的提醒。</p></div></div>
        <div className="info-use-table" role="table" aria-label="資料填寫用途說明">
          {[
            ["每日陪伴時間", "影響日常照顧提醒"],
            ["同住者狀況", "影響家庭互動與安全提醒"],
            ["活動空間", "影響空間布置與危險物提醒"],
            ["飼養經驗", "影響新手照顧重點"],
            ["飼養原因", "影響長期責任與期待提醒"],
          ].map(([label, value]) => <div key={label} role="row"><b role="cell">{label}</b><span role="cell">{value}</span></div>)}
        </div>
      </section>
      <div className="profile-wizard-head"><div><h1 id="profile-supplement-title">補充真實生活條件</h1><p>只保留會影響照顧安排的資訊；預算、身分與備用照顧者欄位不再顯示。</p></div></div>
      <section className="profile-panel">
        <fieldset><legend>每天的時間</legend><div className="profile-time-grid"><label>每天離家時間<span>每日 <input type="number" min="0" max="24" value={profile.hoursAway} onChange={(event) => update("hoursAway", clamp(event.target.value, 24))} /> 小時</span></label><label>每天可投入照顧時間<span>每日 <input type="number" min="0" max="24" value={profile.careHours} onChange={(event) => update("careHours", clamp(event.target.value, 24))} /> 小時</span></label></div></fieldset>
        <fieldset><legend>居住空間</legend><div className="housing-options">{["自有住宅", "租屋"].map((value) => <OptionButton key={value} label={value} selected={profile.housing === value} onClick={() => update("housing", value)} />)}</div>{profile.housing === "租屋" && <div className="landlord-options">{["房東已同意", "尚未取得同意"].map((value) => <OptionButton key={value} label={value} selected={profile.landlordConsent === value} onClick={() => update("landlordConsent", value)} />)}</div>}</fieldset>
        <fieldset><legend>同居家人</legend><div className="supplement-choice-grid">{["無", "幼童", "長者", "孕婦", "其他"].map((value) => <button type="button" key={value} className={`supplement-choice ${profile.housemateTypes.includes(value) ? "selected" : ""}`} aria-pressed={profile.housemateTypes.includes(value)} onClick={() => chooseHousemate(value)}>{profile.housemateTypes.includes(value) && <span>✓</span>}{value}</button>)}</div>{profile.housemateTypes.includes("其他") && <label className="supplement-inline-input">其他同居家人<input placeholder="請說明" value={profile.otherHousemate} onChange={(event) => update("otherHousemate", event.target.value)} /></label>}{profile.hasHousemates && <div className="supplement-followup"><b>同住者是否知情並同意飼養？</b><div className="supplement-choice-grid compact">{[["agree", "已知情並同意"], ["pending", "尚未確認"], ["disagree", "不同意"]].map(([value, label]) => <button type="button" key={value} className={`supplement-choice ${value === "agree" ? profile.housematesConsent === true : value === "pending" ? profile.housematesConsent === null : profile.housematesConsent === false ? "selected" : ""}`} aria-pressed={value === "agree" ? profile.housematesConsent === true : value === "pending" ? profile.housematesConsent === null : profile.housematesConsent === false} onClick={() => update("housematesConsent", value === "agree" ? true : value === "disagree" ? false : null)}>{label}</button>)}</div></div>}</fieldset>
        <fieldset><legend>寵物預計活動空間</legend><div className="supplement-choice-grid">{["戶外空間", "室內客廳", "房間", "其他"].map((value) => <button type="button" key={value} className={`supplement-choice ${profile.activitySpace === value ? "selected" : ""}`} aria-pressed={profile.activitySpace === value} onClick={() => update("activitySpace", value)}>{profile.activitySpace === value && <span>✓</span>}{value}</button>)}</div>{profile.activitySpace === "其他" && <label className="supplement-inline-input">其他活動空間<input placeholder="請說明" value={profile.otherActivitySpace} onChange={(event) => update("otherActivitySpace", event.target.value)} /></label>}</fieldset>
        <fieldset><legend>居家空間</legend><div className="home-space-placeholder" role="note"><b>共同為毛孩的安全把關</b><span>上傳未來的活動空間與家戶防護照片</span></div></fieldset>
        <fieldset><legend>飼養經驗</legend><button type="button" className={`supplement-choice shiba-experience ${profile.noShibaExperience ? "selected" : ""}`} aria-pressed={profile.noShibaExperience} onClick={() => update("noShibaExperience", !profile.noShibaExperience)}>我沒有養過柴犬</button><div className="pet-experience-block"><b>曾經飼養：</b><div className="pet-experience-row">{experienceInputs("past")}</div><b>目前家中有寵物：</b><div className="pet-experience-row">{experienceInputs("current")}</div><label className="experience-note">其他飼養經驗分享：<textarea placeholder="請分享你的照顧經驗" value={profile.experienceNote} onChange={(event) => update("experienceNote", event.target.value)} /></label></div></fieldset>
        <fieldset><legend>飼養原因 <small>可複選</small></legend><div className="supplement-choice-grid reasons">{["陪伴與情緒支持", "喜愛動物", "單純想養", "看家守衛", "他人推薦", "其他"].map((reason) => <button type="button" key={reason} className={`supplement-choice ${profile.reasons.includes(reason) ? "selected" : ""}`} aria-pressed={profile.reasons.includes(reason)} onClick={() => toggle("reasons", reason)}>{profile.reasons.includes(reason) && <span>✓</span>}{reason}</button>)}</div>{profile.reasons.includes("其他") && <label className="supplement-inline-input">其他飼養原因<input placeholder="請說明" value={profile.reasonOther} onChange={(event) => update("reasonOther", event.target.value)} /></label>}</fieldset>
      </section>
      <section className="care-commitment" aria-labelledby="care-commitment-title">
        <h2 id="care-commitment-title">照顧承諾</h2>
        <label>
          <input type="checkbox" checked={committed} onChange={(event) => { setCommitted(event.target.checked); setFinished(false); }} />
          <span>我已閱讀以上提醒，並承諾會善盡照顧責任，持續提供合適的飲食、乾淨飲水、安全環境、日常陪伴與必要醫療，好好照顧我的寵物。</span>
        </label>
      </section>
      <div className="profile-supplement-actions">
        <button type="button" className="secondary" onClick={onBack}>← 返回飼養生活</button>
        <button type="button" className="secondary" onClick={onReset}>重新預演</button>
        <button type="button" className="primary" disabled={!committed} onClick={() => setFinished(true)}>完成評估 <span>✓</span></button>
        {finished && <span role="status">已完成照顧承諾。</span>}
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
  const recurring = expenses.filter((item) => item.recurring).reduce((sum, item) => sum + item.amount, 0);
  const oneTime = expenses.filter((item) => !item.recurring && item.category === "用品").reduce((sum, item) => sum + item.amount, 0);
  const medical = expenses.filter((item) => item.category === "醫療" && !item.recurring).reduce((sum, item) => sum + item.amount, 0);
  const careService = expenses.filter((item) => item.category === "照顧服務").reduce((sum, item) => sum + item.amount, 0);
  const seniorSupplies = expenses.filter((item) => item.category === "高齡用品").reduce((sum, item) => sum + item.amount, 0);
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  const emergencyUsed = expenses.filter((item) => item.fromEmergency).reduce((sum, item) => sum + item.amount, 0);
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
  const housemateStatus = profile.housemateTypes.includes("無") ? "無" : profile.housemateTypes.length ? [...profile.housemateTypes.filter((item) => item !== "其他"), profile.housemateTypes.includes("其他") ? profile.otherHousemate || "其他（待補充）" : ""].filter(Boolean).join("、") : "待補充";
  const experienceStatus = profile.noShibaExperience ? "沒有柴犬經驗" : profile.pastPetTypes.length || profile.currentPetTypes.length || profile.experienceNote ? "已補充飼養經驗" : "待補充";
  const reasonStatus = profile.reasons.length ? profile.reasons.map((item) => item === "其他" ? profile.reasonOther || "其他（待補充）" : item).join("、") : "待補充";
  const strongSignals = [preparationStrong, correctFirst >= 5, practiceComplete === practiceItems.length, profile.activitySpace !== "", profile.reasons.length > 0, profile.housing !== "租屋" || profile.landlordConsent === "房東已同意", profile.hasHousemates !== true || profile.housematesConsent === true].filter(Boolean).length;
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
    profile.housing === "租屋" && profile.landlordConsent !== "房東已同意" && "租屋規定與房東書面同意",
  ].filter(Boolean) as string[];
  const actions = [
    ...confirm.slice(0, 5),
    "帶著品種需求與醫療紀錄問題詢問獸醫或領養單位",
    "和同住家人討論活動空間與日常照顧安排",
  ];
  const selectedBreed = breeds.find((item) => item.id === breed);

  const overviewCards = [
    { title: "照顧時間", text: "你需要每天安排固定時間陪伴、餵食、飲水、排泄與活動。散步建議至少 20–30 分鐘，仍需依狗狗年齡、健康與天氣調整。" },
    { title: "生活環境", text: "家中需要有安全、乾淨、通風、可休息的空間。危險物品要收好，食物、清潔用品、電線與小物品都需要注意。" },
    { title: "照顧責任", text: "狗狗無法長時間完全無人照護。當你忙碌、外出或生活改變時，需要事先安排家人、朋友或合適照護者協助。" },
  ];
  const checklistGroups = [
    { title: "每日照顧", items: ["提供合適主食", "隨時提供乾淨飲水", "觀察食慾、精神、排泄與活動狀況", "安排陪伴與互動時間", "安排外出散步或合適活動", "清理排泄物與維持環境清潔"] },
    { title: "家中環境", items: ["準備睡墊", "準備水碗與狗碗", "準備尿墊或如廁區", "準備清潔用品", "收好巧克力、人類食物、清潔劑、電線與小物品", "保留安全、安靜、可休息的空間"] },
    { title: "外出與接回", items: ["攜帶身分證與領養文件", "準備運輸籠", "準備尿墊", "準備牽繩", "準備水與清潔用品", "外出時使用牽繩或胸背帶"] },
    { title: "生活變化", items: ["忙碌時安排替代照顧者", "發現生病徵兆時記錄並聯絡獸醫", "生活改變時重新安排照顧", "高齡後提前準備醫療基金與老年照顧知識"] },
  ];
  const handlingRows = [
    ["剛到新家", "給牠安靜空間，不要強迫互動，讓牠用自己的速度適應。"],
    ["吠叫", "增加安全感、遊戲、適量散步；若持續困擾，尋求獸醫或行為專家協助。"],
    ["亂咬東西", "提供安全啃咬玩具，收好危險物品。"],
    ["隨意大小便", "使用尿墊或適當材質，一天多出門幾次，做對時給予獎勵。"],
    ["忙碌或很累", "不要只放大量食物讓牠獨自在家，需安排家人、朋友或合適照護者協助。"],
    ["生病", "記錄食慾、飲水、排泄與精神狀態，必要時聯絡獸醫。"],
    ["高齡照顧", "提前規劃醫療基金，學習老年照顧知識，定期諮詢獸醫。"],
  ];
  const expenseRows = [
    ["一次性用品", "運輸籠、睡墊、水碗、狗碗、尿墊、清潔用品、牽繩等。"],
    ["每月固定支出", "主食費、日常消耗用品。"],
    ["可能發生的支出", "醫療費、臨時照顧服務、高齡照顧相關費用。"],
    ["緊急預備金", "建議保留一筆可應付突發醫療或照顧安排的預備金。"],
  ];

  return (
    <div className="content-wrap summary-page assessment-report compact-assessment">
      <div className="summary-title">
        <div><h1>照顧準備總覽</h1><p>把你和{petName || "小狗"}完成的旅程整理成可執行的照顧清單。</p></div>
        <div className="summary-pet"><span>{selectedBreed?.icon ?? "🐕"}</span><b>{petName || "小狗"} · {selectedBreed?.label ?? "柴犬"}</b><small>{correctFirst} / {lifeScenarios.length} 題第一次掌握方向</small></div>
      </div>

      <section className="overview-cards" aria-label="照顧準備總覽">
        {overviewCards.map((item) => <article key={item.title}><h2>{item.title}</h2><p>{item.text}</p></article>)}
      </section>

      <section className="checklist-section" aria-labelledby="care-checklist-title">
        <div className="section-heading"><span>Checklist</span><h2 id="care-checklist-title">你需要做到的事</h2></div>
        <div className="checklist-grid">
          {checklistGroups.map((group) => (
            <article key={group.title} className="checklist-card">
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}><span aria-hidden="true">□</span>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="key-table-section" aria-labelledby="handling-table-title">
        <div className="section-heading"><span>重點整理</span><h2 id="handling-table-title">情境處理重點</h2></div>
        <div className="key-table">{handlingRows.map(([situation, advice]) => <div key={situation}><b>{situation}</b><p>{advice}</p></div>)}</div>
      </section>

      <section className="key-table-section" aria-labelledby="expense-table-title">
        <div className="section-heading"><span>費用與用品</span><h2 id="expense-table-title">費用與用品整理</h2></div>
        <div className="expense-summary-strip">
          <div><small>目前模擬累積花費</small><b>NT$ {money.format(total)}</b></div>
          <div><small>每月固定支出</small><b>NT$ {money.format(recurring)}</b></div>
          <div><small>剩餘緊急預備金</small><b>NT$ {money.format(Math.max(0, emergencyReserve - emergencyUsed))}</b></div>
        </div>
        <div className="key-table expense-table">{expenseRows.map(([label, text]) => <div key={label}><b>{label}</b><p>{text}</p></div>)}</div>
      </section>
    </div>
  );
}
