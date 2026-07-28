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
    { label: "已看過小狗的警告訊號", complete: lifeActivity.bodyLanguageSignals.includes("warning-signals-video") },
    { label: "已完成到家第一餐", complete: lifeActivity.arrivalMealFoodReady && lifeActivity.arrivalMealWaterReady },
    { label: "已完成基本清潔及身體觀察", complete: lifeActivity.bodyCareParts.length === 6 },
    { label: "已完成高齡生活空間調整", complete: lifeActivity.seniorAdjustments.length === 6 },
  ];
  const practiceComplete = practiceItems.filter((item) => item.complete).length;
  const backupNames = members.filter((member) => !member.isPlayer && member.name.trim()).map((member) => member.name);
  const requiredRoom = roomItems.filter((item) => item.required);
  const roomCompletion = Math.round((roomReady.filter((id) => requiredRoom.some((item) => item.id === id)).length / requiredRoom.length) * 100);
  const budgetEnough = Number(profile.monthlyBudget) >= recurring;
  const preparationStrong = roomCompletion === 100 && hazardsReady.length === hazards.length && trunkPassed;
  const strongSignals = [preparationStrong, correctFirst >= 5, practiceComplete === 5, budgetEnough, profile.emergencyFund === true, profile.backupSupport === true, profile.housing !== "租屋" || profile.landlordConsent === "房東已同意", profile.hasHousemates !== true || profile.housematesConsent === true].filter(Boolean).length;
  const level = strongSignals >= 7 ? "已具備多項準備" : strongSignals >= 4 ? "有部分條件需要先確認" : "建議先完成準備事項";

  const prepared = [
    roomCompletion === 100 && "必要用品與生活空間已完成",
    hazardsReady.length === hazards.length && "居家危險物已完成收納與防護",
    backupNames.length > 0 && `已有可協助照顧的家庭成員：${backupNames.join("、")}`,
    trunkPassed && "接送行李、文件與安全運輸已通過檢查",
    correctFirst >= 5 && `${correctFirst} 個情境第一次就掌握照顧方向`,
    practiceComplete === 5 && "四個生活練習與飲水步驟皆已完成",
    budgetEnough && "每月預算可涵蓋目前固定支出",
  ].filter(Boolean) as string[];
  const confirm = [
    roomCompletion < 100 && `必要用品完成度 ${roomCompletion}%`,
    hazardsReady.length < hazards.length && "仍有居家危險物需要防護",
    backupNames.length === 0 && "尚未新增其他可協助的照顧成員",
    !trunkPassed && "接寵物後車廂尚未通過檢查",
    !budgetEnough && `每月預算低於目前固定支出 NT$ ${money.format(recurring)}`,
    profile.emergencyFund === false && "目前沒有緊急預備金",
    ...needsLearning.slice(0, 5).map((item) => `情境需要再確認：${item}`),
  ].filter(Boolean) as string[];
  const familyTopics = [
    profile.hasHousemates && profile.housematesConsent !== true && "所有同住者是否知情並同意飼養",
    profile.housing === "租屋" && profile.landlordConsent !== "房東已同意" && "租屋規定與房東書面同意",
    profile.backupSupport === false && "忙碌、出差或生病時由誰接手",
  ].filter(Boolean) as string[];
  const actions = [
    ...confirm.slice(0, 5),
    "帶著品種需求與醫療紀錄問題詢問獸醫或領養單位",
    "將每月固定支出與緊急預備金分開存放",
  ];
  const selectedBreed = breeds.find((item) => item.id === breed);

  return (
    <div className="content-wrap summary-page assessment-report">
      <div className="summary-title"><div><h1>{level}</h1><p>這份報告不貼標籤，而是把和{petName}的模擬生活轉成下一步可執行的準備。</p></div><div className="summary-pet"><span>{selectedBreed?.icon ?? "🐕"}</span><b>{petName} · {selectedBreed?.label}</b><small>{correctFirst} / {lifeScenarios.length} 題第一次掌握方向</small></div></div>
      <div className="report-level"><span>綜合準備狀態</span><b>{level}</b><p>參考準備任務、第一次作答、費用與真實生活條件。</p></div>
      <section className="summary-grid">
        <article className="summary-card"><div className="card-head"><span>01</span><div><p>領養前準備</p><h2>家、成員與接送</h2></div></div><dl className="report-metrics"><div><dt>房間必要用品</dt><dd>{roomCompletion}%</dd></div><div><dt>危險物防護</dt><dd>{hazardsReady.length} / {hazards.length}</dd></div><div><dt>照顧成員</dt><dd>{backupNames.length ? backupNames.join("、") : "只有我"}</dd></div><div><dt>後車廂</dt><dd>{trunkPassed ? "已通過" : `${trunkSelected.length} 件已放入`}</dd></div></dl></article>
        <article className="summary-card"><div className="card-head"><span>02</span><div><p>情境判斷</p><h2>第一次選擇與修正</h2></div></div><div className="learning-counts"><div><b>{correctFirst}</b><small>第一次掌握方向</small></div><div><b>{corrected.length}</b><small>提醒後修正</small></div><div><b>{needsLearning.length}</b><small>需要再了解</small></div></div><dl className="report-topic-list"><div><dt>第一次就掌握</dt><dd>{correctTopics.join("、") || "尚無"}</dd></div><div><dt>經過提醒後修正</dt><dd>{correctedTopics.join("、") || "尚無"}</dd></div><div><dt>還需要了解</dt><dd>{needsLearning.join("、") || "目前沒有未修正主題"}</dd></div></dl></article>
        <article className="summary-card"><div className="card-head"><span>03</span><div><p>照顧實作</p><h2>生活練習完成狀態</h2></div></div><ul>{practiceItems.map((item) => <li key={item.label}><i className={item.complete ? "green" : "yellow"}>{item.complete ? "✓" : "!"}</i>{item.label}</li>)}</ul></article>
        <article className="summary-card"><div className="card-head"><span>04</span><div><p>費用狀況</p><h2>實際事件累積</h2></div></div><dl className="report-metrics"><div><dt>一次性用品費</dt><dd>NT$ {money.format(oneTime)}</dd></div><div><dt>本月／累積支出</dt><dd>NT$ {money.format(total)}</dd></div><div><dt>每月固定支出</dt><dd>NT$ {money.format(recurring)}</dd></div><div><dt>醫療支出</dt><dd>NT$ {money.format(medical)}</dd></div><div><dt>照顧服務費</dt><dd>NT$ {money.format(careService)}</dd></div><div><dt>高齡用品費</dt><dd>NT$ {money.format(seniorSupplies)}</dd></div><div><dt>剩餘緊急預備金</dt><dd>NT$ {money.format(Math.max(0, emergencyReserve - emergencyUsed))}</dd></div><div><dt>推估一年基本支出</dt><dd>NT$ {money.format(recurring * 12)}</dd></div></dl></article>
        <article className="summary-card profile-summary"><div className="card-head"><span>05</span><div><p>真實生活條件</p><h2>時間、住居與支援</h2></div></div><dl><div><dt>可投入時間</dt><dd>每日 {profile.careHours} 小時</dd></div><div><dt>居住空間</dt><dd>{profile.housing}{profile.housing === "租屋" ? ` · ${profile.landlordConsent}` : ""}</dd></div><div><dt>每月預算</dt><dd>NT$ {money.format(Number(profile.monthlyBudget))}</dd></div><div><dt>同住者支持</dt><dd>{profile.hasHousemates ? (profile.housematesConsent ? "已同意" : "尚待確認") : "無同住者"}</dd></div><div><dt>家庭照顧成員</dt><dd>{backupNames.join("、") || "只有我"}</dd></div><div><dt>緊急預備金</dt><dd>{profile.emergencyFund ? "已有準備" : "目前沒有"}</dd></div></dl></article>
        <article className="summary-card readiness"><div className="card-head"><span>06</span><div><p>已經準備好</p><h2>可以延續的部分</h2></div></div><ul>{prepared.length ? prepared.map((item) => <li key={item}><i className="green">✓</i>{item}</li>) : <li><i className="yellow">?</i>目前先從完成領養前準備清單開始。</li>}</ul></article>
        <article className="summary-card todo"><div className="card-head"><span>07</span><div><p>建議再確認</p><h2>需要補上的條件</h2></div></div><ul>{confirm.length ? confirm.map((item) => <li key={item}><i className="yellow">!</i>{item}</li>) : <li><i className="green">✓</i>目前主要條件已有方向，請持續依實際個體調整。</li>}</ul></article>
        <article className="summary-card discuss"><div className="card-head"><span>08</span><div><p>和家人討論</p><h2>需要共同決定</h2></div></div><ul>{familyTopics.length ? familyTopics.map((item) => <li key={item}><i className="orange">●</i>{item}</li>) : <li><i className="green">✓</i>目前家庭支持條件已有明確方向。</li>}</ul></article>
        <article className="summary-card action-list"><div className="card-head"><span>09</span><div><p>領養前行動清單</p><h2>下一步可以這樣做</h2></div></div><ol>{actions.slice(0, 7).map((item) => <li key={item}>{item}</li>)}</ol></article>
      </section>
      <div className="summary-footer"><p><b>這份報告不替你貼上單一結論。</b><br />它整理的是現在已具備的條件，以及真正領養前值得再確認的部分。</p><div><button className="secondary" onClick={onReset}>重新預演</button><button className="primary" onClick={() => window.print()}>列印／儲存報告 <span>↗</span></button></div></div>
      <button className="text-back" onClick={onBack}>← 回去調整真實生活資料</button>
    </div>
  );
}
