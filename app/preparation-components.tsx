"use client";

import { useState } from "react";
import type { DragEvent } from "react";
import { hazards, roomItems, trunkItems } from "./game-data";
import type { CareMember, TrunkItem } from "./game-types";
import { NavButtons, StepHeading } from "./shared-components";

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
  const [selectedSupply, setSelectedSupply] = useState<string | null>(null);
  const [selectedHazard, setSelectedHazard] = useState<string | null>(null);
  const [trashDragging, setTrashDragging] = useState(false);
  const [trashOver, setTrashOver] = useState(false);
  const [trashSuccess, setTrashSuccess] = useState(false);
  const [roomApproved, setRoomApproved] = useState(false);
  const required = roomItems.filter((item) => item.required);
  const missing = required.filter((item) => !selectedItems.includes(item.id));
  const unsecured = hazards.filter((item) => !securedHazards.includes(item.id));
  const complete = missing.length === 0 && unsecured.length === 0;
  const waiting = roomItems.filter((item) => !selectedItems.includes(item.id));

  function placeSupply(id: string) {
    if (!roomItems.some((item) => item.id === id) || selectedItems.includes(id)) return;
    onAddItem(id);
    setSelectedSupply(null);
    setRoomApproved(false);
    setMessage("");
  }

  function secureHazard(id: string) {
    const hazard = hazards.find((item) => item.id === id);
    if (!hazard || securedHazards.includes(id)) return;
    onToggleHazard(id);
    setSelectedHazard(null);
    setTrashDragging(false);
    setTrashOver(false);
    setTrashSuccess(true);
    window.setTimeout(() => setTrashSuccess(false), 500);
    setRoomApproved(false);
    setMessage(hazard.feedback);
  }

  function readRoomDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    const value = event.dataTransfer.getData("text/plain");
    if (value.startsWith("supply:")) placeSupply(value.slice(7));
  }

  function readTrashDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    const value = event.dataTransfer.getData("text/plain");
    if (value.startsWith("hazard:")) secureHazard(value.slice(7));
    else {
      setTrashDragging(false);
      setTrashOver(false);
    }
  }

  function checkRoom() {
    if (complete) {
      setRoomApproved(true);
      setMessage("房間準備完成！你已經放好基本生活用品，也收起了可能造成危險的物品。");
      return;
    }
    setRoomApproved(false);
    if (missing.length && unsecured.length) setMessage(`還有${missing.length}項用品尚未放入房間。還有${unsecured.length}項危險物品需要收好。`);
    else if (missing.length) setMessage("房間裡還缺少狗狗生活需要的用品，請再檢查用品準備區。");
    else setMessage("用品已經準備完成，但房間中還有可能造成風險的物品。");
  }

  return (
    <div className="content-wrap preparation-page">
      <StepHeading title="先替牠布置安全的生活空間" body="把用品放進房間，再把危險物品拖進垃圾桶；也可以先點選危險物品，再點擊垃圾桶。" />
      <div className="room-preparation-layout">
        <section className="room-supply-shelf" aria-label="用品準備區">
          <h2>用品準備箱 <span>{waiting.length} 件可加入</span></h2>
          <p>拖曳用品，或先點選用品再點房間。</p>
          <div className="room-supply-grid">
            {waiting.map((item) => (
              <button
                key={item.id}
                type="button"
                draggable
                className={selectedSupply === item.id ? "selected" : ""}
                aria-pressed={selectedSupply === item.id}
                onDragStart={(event) => event.dataTransfer.setData("text/plain", `supply:${item.id}`)}
                onClick={() => setSelectedSupply((current) => current === item.id ? null : item.id)}
              >
                <img className={item.id === "food" ? "room-item-image room-item-image--food" : "room-item-image"} src={item.image} alt={`準備用品：${item.label}`} onError={(event) => { event.currentTarget.hidden = true; }} />
                <b>{item.label}</b>
              </button>
            ))}
          </div>
          {waiting.length === 0 && <p className="empty-box">所有用品都已放進房間 ✓</p>}
        </section>
        <div className="room-interaction-column">
          <div
            className={`room-scene ${selectedSupply ? "awaiting-placement" : ""}`}
            role="group"
            tabIndex={0}
            aria-label={selectedSupply ? `將${roomItems.find((item) => item.id === selectedSupply)?.label}放進房間` : "空的寵物生活房間"}
            onClick={() => selectedSupply && placeSupply(selectedSupply)}
            onKeyDown={(event) => { if (selectedSupply && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); placeSupply(selectedSupply); } }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={readRoomDrop}
          >
            <img className="room-scene-background" src="/room/空房間.png" alt="空的寵物生活房間" />
            {selectedItems.map((id) => {
            const item = roomItems.find((entry) => entry.id === id);
            return item ? (
              <button
                key={id}
                type="button"
                className={`room-object placed-supply ${item.id === "food" ? "placed-room-item--food" : ""}`}
                style={{ left: `${item.placement.x}%`, top: `${item.placement.y}%`, width: `${item.placement.width}%` }}
                onClick={(event) => { event.stopPropagation(); onRemoveItem(id); setRoomApproved(false); setMessage(""); }}
                aria-label={`房間中的${item.label}，點擊移回用品準備區`}
              >
                <img className={item.id === "food" ? "room-item-image room-item-image--food" : "room-item-image"} src={item.image} alt={`房間中的用品：${item.label}`} onError={(event) => { event.currentTarget.hidden = true; }} />
                <span>{item.label}</span>
              </button>
            ) : null;
          })}
            {unsecured.map((item) => (
              <button
                key={item.id}
                type="button"
                draggable
                className={`room-object room-hazard ${selectedHazard === item.id ? "selected" : ""}`}
                style={{ left: `${item.placement.x}%`, top: `${item.placement.y}%`, width: `${item.placement.width}%` }}
                aria-pressed={selectedHazard === item.id}
                onDragStart={(event) => { event.dataTransfer.setData("text/plain", `hazard:${item.id}`); setTrashDragging(true); }}
                onDragEnd={() => { setTrashDragging(false); setTrashOver(false); }}
                onClick={(event) => { event.stopPropagation(); setSelectedHazard((current) => current === item.id ? null : item.id); }}
                aria-label={`房間中的危險物品：${item.label}，選取後可放進垃圾桶`}
              >
                <img src={item.image} alt={`房間中的危險物品：${item.label}`} onError={(event) => { event.currentTarget.hidden = true; }} />
                <span>{item.label}</span>
              </button>
            ))}
            <button
              type="button"
              className={`room-trash-bin ${selectedHazard || trashDragging ? "ready" : ""} ${trashOver ? "over" : ""} ${trashSuccess ? "success" : ""}`}
              aria-label="將選取的危險物品放進垃圾桶"
              onClick={(event) => { event.stopPropagation(); if (selectedHazard) secureHazard(selectedHazard); }}
              onDragEnter={(event) => { event.preventDefault(); if (trashDragging) setTrashOver(true); }}
              onDragOver={(event) => { event.preventDefault(); if (trashDragging) setTrashOver(true); }}
              onDragLeave={() => setTrashOver(false)}
              onDrop={readTrashDrop}
            >
              <img src="/room/垃圾桶.png" alt="房間中的垃圾桶" />
              <span>{unsecured.length === 0 ? "危險物品已全部收好！" : `已收好 ${hazards.length - unsecured.length}／${hazards.length}`}</span>
            </button>
          </div>
          <div className="trash-guidance" role="note"><b>把危險物品移出活動範圍</b><p>請把房間中的危險物品拖進垃圾桶，或先點選物品，再點擊垃圾桶。遊戲中的垃圾桶代表把危險物品移出小狗可以接觸的範圍。</p></div>
        </div>
      </div>
      <div className={`task-message ${roomApproved ? "success" : ""}`} role="status" aria-live="polite">{message || "完成8項用品放置與4項危險物品收納後，按下「檢查房間」。"}</div>
      <div className="task-check-actions"><button className="secondary" onClick={checkRoom}>檢查房間</button></div>
      <NavButtons onBack={onBack} onNext={onNext} disabled={!roomApproved} nextLabel="房間完成，建立照顧成員" />
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
      <StepHeading title="誰會一起照顧牠？" body="建立可能一起照顧牠的家庭成員，完成後就可以整理接牠回家的後車廂。" />
      <div className="member-grid">{members.map((member, index) => <article className="member-card" key={member.id}><div className="member-card-head"><span>{member.isPlayer ? "我" : index + 1}</span><div><b>{member.isPlayer ? "主要玩家" : "家庭成員"}</b><small>{member.isPlayer ? "不可移除" : "可修改或移除"}</small></div>{!member.isPlayer && index > 1 && <button onClick={() => onChange(members.filter((item) => item.id !== member.id))}>移除</button>}</div><label>名稱或稱呼<input value={member.name} disabled={member.isPlayer} placeholder="例：媽媽" onChange={(event) => updateMember(member.id, { name: event.target.value })} /></label>{errors[`${member.id}-name`] && <p className="field-error">{errors[`${member.id}-name`]}</p>}<label>年齡<input type="number" inputMode="numeric" min="1" max="120" value={member.age ?? ""} placeholder="例：35" onChange={(event) => updateMember(member.id, { age: event.target.value ? Math.min(120, Math.max(1, Number(event.target.value))) : null })} /></label>{errors[`${member.id}-age`] && <p className="field-error">{errors[`${member.id}-age`]}</p>}</article>)}</div>
      <button className="add-member-button" onClick={addMember} disabled={members.length >= 6}>＋ 新增家庭成員 <small>{members.length} / 6</small></button>
      <div className={`task-message ${valid ? "success" : ""}`}>{valid ? "成員資料完整，可以繼續整理後車廂。" : "每位成員都需要稱呼與合理年齡。"}</div>
      <NavButtons onBack={onBack} onNext={validate} disabled={false} nextLabel="成員完成，整理後車廂" />
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
      <StepHeading title="出發接牠回家" body="你準備開車去接牠了。請把接牠回家需要的物品放進後車廂。" />
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
