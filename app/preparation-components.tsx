"use client";

import { useMemo, useState } from "react";
import { careTasks, hazards, roomItems, trunkItems } from "./game-data";
import type { CareAssignment, CareMember, TrunkItem } from "./game-types";
import { NavButtons, StepHeading } from "./shared-components";

const preparationTitles = ["布置生活空間", "建立照顧成員", "分配照顧工作", "整理汽車後車廂"];

function PreparationProgress({ task }: { task: number }) {
  return (
    <div className="prep-task-progress" aria-label={`領養前準備第 ${task + 1} 步，共 4 步`}>
      {preparationTitles.map((title, index) => <span key={title} className={`${index === task ? "active" : ""} ${index < task ? "done" : ""}`}><i>{index < task ? "✓" : index + 1}</i><b>{title}</b></span>)}
    </div>
  );
}

export function RoomPreparation({
  selectedItems,
  securedHazards,
  onAddItem,
  onRemoveItem,
  onToggleHazard,
  onBack,
  onNext,
}: {
  selectedItems: string[];
  securedHazards: string[];
  onAddItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onToggleHazard: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [message, setMessage] = useState("");
  const required = roomItems.filter((item) => item.required);
  const missing = required.filter((item) => !selectedItems.includes(item.id));
  const unsecured = hazards.filter((item) => !securedHazards.includes(item.id));
  const complete = missing.length === 0 && unsecured.length === 0;
  const waiting = roomItems.filter((item) => !selectedItems.includes(item.id));

  function checkRoom() {
    if (complete) {
      setMessage("房間準備完成！你已經替牠準備好安全的休息、飲食與活動空間。");
      return;
    }
    if (missing.some((item) => item.need === "休息")) setMessage("還少了一個可以安心休息的地方，試著找找看適合的物品。");
    else if (missing.some((item) => item.need === "飲食")) setMessage("飲食準備還不完整，請確認食物、食碗與乾淨飲水。");
    else if (missing.some((item) => item.need === "排泄")) setMessage("還需要安排清楚的排泄空間，讓適應期更容易整理。");
    else if (unsecured.length) setMessage(`還有 ${unsecured[0].label} 尚未收好。${unsecured[0].hint}`);
    else setMessage("再確認必要用品與安全區域，就快完成了。");
  }

  return (
    <div className="content-wrap preparation-page">
      <PreparationProgress task={0} />
      <StepHeading eyebrow="02 · 領養前準備" title="先替牠布置安全的生活空間" body="把用品拖進房間，或直接點擊加入；再逐一把可能造成風險的物品收好。" />
      <div className="prep-board expanded">
        <section className="item-shelf"><h2>用品準備箱 <span>{waiting.length} 件可加入</span></h2><div>{waiting.map((item) => <button key={item.id} draggable onDragStart={(event) => event.dataTransfer.setData("text/plain", item.id)} onClick={() => onAddItem(item.id)}><span>{item.icon}</span><b>{item.label}</b><small>{item.required ? "必要用品" : "可選用品"} · 拖曳或點擊</small></button>)}</div>{waiting.length === 0 && <p className="empty-box">所有用品都已放進房間 ✓</p>}</section>
        <div className="room room-preparation" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); onAddItem(event.dataTransfer.getData("text/plain")); }}>
          <p>安全、休息、飲食、排泄與活動空間</p>
          {selectedItems.map((id, index) => {
            const item = roomItems.find((entry) => entry.id === id);
            return item ? <button key={id} className={`placed item-${index % 6}`} onClick={() => onRemoveItem(id)} title="點擊移回準備箱"><span>{item.icon}</span><b>{item.label}</b></button> : null;
          })}
        </div>
      </div>
      <section className="hazard-panel"><div><p className="eyebrow">居家安全檢查</p><h2>把危險物品收好</h2><p>點選項目代表已完成固定、收納或防護。</p></div><div className="hazard-grid">{hazards.map((item) => <button key={item.id} className={securedHazards.includes(item.id) ? "secured" : ""} aria-pressed={securedHazards.includes(item.id)} onClick={() => onToggleHazard(item.id)}><span>{item.icon}</span><b>{item.label}</b><small>{securedHazards.includes(item.id) ? "✓ 已收好" : item.hint}</small></button>)}</div></section>
      <div className={`task-message ${complete ? "success" : ""}`} role="status">{message || "完成用品放置與危險物品收納後，按下「檢查房間」。"}</div>
      <div className="task-check-actions"><button className="secondary" onClick={checkRoom}>檢查房間</button></div>
      <NavButtons onBack={onBack} onNext={onNext} disabled={!complete} nextLabel="房間完成，建立照顧成員" />
    </div>
  );
}

export function CareMemberSetup({
  members,
  onChange,
  onBack,
  onNext,
}: {
  members: CareMember[];
  onChange: (members: CareMember[]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const valid = members.every((member) => member.name.trim() && member.age !== null && member.age >= 1 && member.age <= 120);

  function updateMember(id: string, patch: Partial<CareMember>) {
    onChange(members.map((member) => member.id === id ? { ...member, ...patch } : member));
  }

  function addMember() {
    if (members.length >= 6) return;
    onChange([...members, { id: `member-${Date.now()}`, name: "", age: null, isPlayer: false }]);
  }

  function validate() {
    const nextErrors: Record<string, string> = {};
    members.forEach((member) => {
      if (!member.name.trim()) nextErrors[`${member.id}-name`] = "請填寫稱呼。";
      if (member.age === null || member.age < 1 || member.age > 120) nextErrors[`${member.id}-age`] = "請輸入 1～120 歲。";
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onNext();
  }

  return (
    <div className="content-wrap preparation-page">
      <PreparationProgress task={1} />
      <StepHeading eyebrow="02 · 領養前準備" title="誰會一起照顧牠？" body="先建立照顧成員，下一步才能把每天與臨時的工作分配清楚。" />
      <div className="member-grid">{members.map((member, index) => <article className="member-card" key={member.id}><div className="member-card-head"><span>{member.isPlayer ? "我" : index + 1}</span><div><b>{member.isPlayer ? "主要玩家" : "家庭成員"}</b><small>{member.isPlayer ? "不可移除" : "可修改或移除"}</small></div>{!member.isPlayer && index > 1 && <button onClick={() => onChange(members.filter((item) => item.id !== member.id))}>移除</button>}</div><label>名稱或稱呼<input value={member.name} disabled={member.isPlayer} placeholder="例：媽媽" onChange={(event) => updateMember(member.id, { name: event.target.value })} /></label>{errors[`${member.id}-name`] && <p className="field-error">{errors[`${member.id}-name`]}</p>}<label>年齡<input type="number" inputMode="numeric" min="1" max="120" value={member.age ?? ""} placeholder="例：35" onChange={(event) => updateMember(member.id, { age: event.target.value ? Math.min(120, Math.max(1, Number(event.target.value))) : null })} /></label>{errors[`${member.id}-age`] && <p className="field-error">{errors[`${member.id}-age`]}</p>}</article>)}</div>
      <button className="add-member-button" onClick={addMember} disabled={members.length >= 6}>＋ 新增家庭成員 <small>{members.length} / 6</small></button>
      <div className={`task-message ${valid ? "success" : ""}`}>{valid ? "成員資料完整，可以開始分配照顧工作。" : "每位成員都需要稱呼與合理年齡。"}</div>
      <NavButtons onBack={onBack} onNext={validate} disabled={false} nextLabel="成員完成，開始分工" />
    </div>
  );
}

export function CareTaskAssignment({
  members,
  assignments,
  onChange,
  onBack,
  onNext,
}: {
  members: CareMember[];
  assignments: Record<string, CareAssignment>;
  onChange: (assignments: Record<string, CareAssignment>) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [message, setMessage] = useState("");
  const memberById = useMemo(() => Object.fromEntries(members.map((member) => [member.id, member])), [members]);

  function update(taskId: string, key: keyof CareAssignment, value: string) {
    onChange({ ...assignments, [taskId]: { ...assignments[taskId], [key]: value } });
  }

  const validation = useMemo(() => {
    const missing = careTasks.filter((task) => !assignments[task.id]?.primary);
    const samePerson = careTasks.filter((task) => assignments[task.id]?.primary && assignments[task.id]?.primary === assignments[task.id]?.backup);
    const playerHasTask = careTasks.some((task) => assignments[task.id]?.primary === "player");
    const temporary = assignments.emergency?.primary || assignments.emergency?.backup;
    const riskyChild = careTasks.filter((task) => task.risk && assignments[task.id]?.primary && (memberById[assignments[task.id].primary]?.age ?? 99) < 18);
    return { missing, samePerson, playerHasTask, temporary, riskyChild, valid: missing.length === 0 && samePerson.length === 0 && playerHasTask && Boolean(temporary) && riskyChild.length === 0 };
  }, [assignments, memberById]);

  function checkAssignments() {
    if (validation.missing.length) setMessage(`還有「${validation.missing[0].label}」沒有主要負責人。`);
    else if (validation.samePerson.length) setMessage(`「${validation.samePerson[0].label}」的主要與備用負責人不能是同一人。`);
    else if (!validation.playerHasTask) setMessage("你自己至少需要負責一項主要工作。");
    else if (!validation.temporary) setMessage("請為臨時無法照顧時安排一位支援者。");
    else if (validation.riskyChild.length) setMessage(`單獨負責「${validation.riskyChild[0].label}」需要足夠判斷與控制能力。年幼成員可以一起參與，但建議由成年人負主要責任。`);
    else setMessage("分工完成！清楚的照顧分工能減少遺漏，也能避免領養後才發現沒有人有時間負責。");
  }

  return (
    <div className="content-wrap preparation-page">
      <PreparationProgress task={2} />
      <StepHeading eyebrow="02 · 領養前準備" title="把照顧工作分配清楚" body="每項工作都需要主要負責人；備用者可在忙碌、出差或生病時接手。" />
      <div className="assignment-table"><div className="assignment-head"><b>照顧工作</b><b>主要負責人</b><b>備用／協助者</b></div>{careTasks.map((task) => <div className="assignment-row" key={task.id}><span><b>{task.label}</b>{task.risk && <small>需要足夠判斷與控制能力</small>}</span><label><span className="visually-hidden">{task.label}主要負責人</span><select value={assignments[task.id]?.primary ?? ""} onChange={(event) => update(task.id, "primary", event.target.value)}><option value="">請選擇</option>{members.map((member) => <option key={member.id} value={member.id}>{member.name}（{member.age} 歲）</option>)}</select></label><label><span className="visually-hidden">{task.label}備用負責人</span><select value={assignments[task.id]?.backup ?? ""} onChange={(event) => update(task.id, "backup", event.target.value)}><option value="">可留空</option>{members.map((member) => <option key={member.id} value={member.id}>{member.name}（{member.age} 歲）</option>)}</select></label></div>)}</div>
      <div className={`task-message ${validation.valid ? "success" : ""}`} role="status">{message || "完成主要分工後，按下「檢查分工」。"}</div>
      <div className="task-check-actions"><button className="secondary" onClick={checkAssignments}>檢查分工</button></div>
      <NavButtons onBack={onBack} onNext={onNext} disabled={!validation.valid} nextLabel="分工完成，整理後車廂" />
    </div>
  );
}

export function CarTrunkPreparation({
  selected,
  checked,
  passed,
  onToggle,
  onCheck,
  onBack,
  onNext,
}: {
  selected: string[];
  checked: boolean;
  passed: boolean;
  onToggle: (id: string) => void;
  onCheck: (passed: boolean) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [departing, setDeparting] = useState(false);
  const essential = trunkItems.filter((item) => item.kind === "essential");
  const selectedItems = selected.map((id) => trunkItems.find((item) => item.id === id)).filter(Boolean) as TrunkItem[];
  const missing = essential.filter((item) => !selected.includes(item.id));
  const risks = selectedItems.filter((item) => item.kind === "risk");

  function checkTrunk() {
    onCheck(missing.length === 0 && risks.length === 0);
  }

  function depart() {
    setDeparting(true);
    window.setTimeout(onNext, 650);
  }

  return (
    <div className="content-wrap preparation-page">
      <PreparationProgress task={3} />
      <StepHeading eyebrow="02 · 領養前準備" title="出發接牠回家" body="你準備開車去接牠了。請把接牠回家需要的物品放進後車廂。" />
      <div className={`trunk-layout ${departing ? "departing" : ""}`}>
        <section className="trunk-shelf"><h2>可選物品</h2><div>{trunkItems.filter((item) => !selected.includes(item.id)).map((item) => <button key={item.id} draggable onDragStart={(event) => event.dataTransfer.setData("text/plain", item.id)} onClick={() => onToggle(item.id)}><span>{item.icon}</span><b>{item.label}</b><small>拖曳或點擊放入</small></button>)}</div></section>
        <section className="car-trunk" aria-label="打開的汽車後車廂" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); onToggle(event.dataTransfer.getData("text/plain")); }}>
          <div className="trunk-lid"><span>後車窗</span></div>
          <div className="trunk-body"><p>接牠回家的後車廂</p><div>{selectedItems.map((item) => <button key={item.id} onClick={() => onToggle(item.id)} title="點擊移出後車廂"><span>{item.icon}</span><b>{item.label}</b></button>)}</div>{selectedItems.length === 0 && <small>把物品拖進來，或點擊左側物品。</small>}</div>
        </section>
      </div>
      <div className="trunk-check"><button className="secondary" onClick={checkTrunk}>檢查後車廂</button></div>
      {checked && <section className={`trunk-feedback ${passed ? "success" : "warning"}`} role="status"><h2>{passed ? "後車廂準備完成！" : "還需要再調整"}</h2>{passed ? <p>你已經準備好安全運輸、基本清潔及領養文件。</p> : <><div>{missing.length > 0 && <p><b>需要補齊：</b>{missing.map((item) => item.label).join("、")}</p>}{risks.length > 0 && <p><b>請移除風險物品：</b>{risks.map((item) => item.label).join("、")}</p>}</div><ul>{[...missing.slice(0, 2), ...risks.slice(0, 3)].map((item) => <li key={item.id}><span>{item.icon}</span><p><b>{item.label}</b>{item.feedback}</p></li>)}</ul></>}</section>}
      <NavButtons onBack={onBack} onNext={depart} disabled={!passed} nextLabel="出發接牠" />
    </div>
  );
}
