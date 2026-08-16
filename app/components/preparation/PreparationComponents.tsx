"use client";

import { useEffect, useRef, useState } from "react";
import { applySizeBasedExpenseAmount, departureTrunkItems, expenseCatalog, getPetSizeForBreed, hazards, money, roomItems, trunkItems } from "../../game-data";
import type { CareMember, ExpenseRecord } from "../../game-types";
import { NavButtons, StepHeading } from "../shared/SharedComponents";

const preparedRoomItemNotes: Record<string, { label: string; note: string }> = {
  bed: { label: "睡墊", note: "提供固定、安靜的休息位置。" },
  toy: { label: "玩具", note: "幫助小狗消耗精力與建立正向互動。" },
  "water-bowl": { label: "水碗", note: "每天確認有乾淨、足量的飲水。" },
  "food-bowl": { label: "狗碗", note: "固定飲食器具，幫助建立規律餵食。" },
  toilet: { label: "尿墊", note: "協助建立如廁位置，減少環境壓力。" },
  cleaner: { label: "寵物專用清潔用品", note: "維持居家清潔，降低病原與異味。" },
  food: { label: "飼料", note: "選擇符合年齡、體型與健康需求的主食。" },
};

const preparedTrunkItemNotes: Record<string, { label: string; note: string }> = {
  id: { label: "身分證", note: "辦理認養與核對身分時使用。" },
  documents: { label: "領養文件", note: "如有租屋，須提供房東許可之證明。" },
  carrier: { label: "運輸籠", note: "讓小狗在移動途中有安全固定的空間。" },
  "pee-pad": { label: "尿墊", note: "接回途中可降低排泄與清潔壓力。" },
  "water-kit": { label: "水碗", note: "必要時補充飲水，避免長時間缺水。" },
  leash: { label: "牽繩", note: "下車或移動時維持安全防護。" },
  cleaner: { label: "寵物專用清潔用品", note: "處理接回途中可能發生的髒污。" },
};

function expensePriceText(expenseIds: string[] = [], breed: string) {
  const petSize = getPetSizeForBreed(breed);
  const prices = expenseIds
    .map((id) => expenseCatalog[id])
    .filter((item): item is ExpenseRecord => Boolean(item))
    .map((item) => applySizeBasedExpenseAmount(item, petSize));
  if (prices.length === 0) return "";
  const total = prices.reduce((sum, item) => sum + item.amount, 0);
  return `NT$${money.format(total)}`;
}

export function RoomPreparation({
  selectedItems,
  securedHazards,
  petName,
  onPrepare,
  onToggleHazard,
  onBack,
  onReplay,
  onNext,
  reviewing = false,
  breed,
}: {
  selectedItems: string[];
  securedHazards: string[];
  petName: string;
  onPrepare: (id: string) => void;
  onToggleHazard: (id: string) => void;
  onBack: () => void;
  onReplay: () => void;
  onNext: () => void;
  reviewing?: boolean;
  breed: string;
}) {
  const [roomCheckMessage, setRoomCheckMessage] = useState("");
  const [dismissingHazard, setDismissingHazard] = useState<string | null>(null);
  const [activeHazardInfo, setActiveHazardInfo] = useState<string | null>(null);
  const [exitingItems, setExitingItems] = useState<string[]>([]);
  const roomSceneRef = useRef<HTMLDivElement>(null);
  const [roomSceneReady, setRoomSceneReady] = useState(false);
  const itemsDone = roomItems.filter((item) => selectedItems.includes(item.id)).length;
  const hazardsDone = securedHazards.length;
  const complete = itemsDone === roomItems.length && hazardsDone === hazards.length;
  const activeHazard = hazards.find((item) => item.id === activeHazardInfo);
  const supplyRows = [roomItems.slice(0, 2), roomItems.slice(2, 4), roomItems.slice(4)].filter((row) => row.length > 0);

  useEffect(() => {
    const scene = roomSceneRef.current;
    if (!scene) return;
    const markReady = () => {
      if (scene.clientWidth > 0 && scene.clientHeight > 0) setRoomSceneReady(true);
    };
    markReady();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(markReady);
    observer?.observe(scene);
    return () => observer?.disconnect();
  }, []);

  function prepareItem(id: string) {
    const item = roomItems.find((entry) => entry.id === id);
    if (!item || selectedItems.includes(id) || exitingItems.includes(id)) return;
    setExitingItems((current) => [...current, id]);
    onPrepare(id);
    window.setTimeout(() => setExitingItems((current) => current.filter((itemId) => itemId !== id)), 450);
    setRoomCheckMessage("");
  }

  function secureHazard(id: string) {
    const hazard = hazards.find((item) => item.id === id);
    if (!hazard || securedHazards.includes(id) || dismissingHazard) return;
    setDismissingHazard(id);
    setRoomCheckMessage("");
    window.setTimeout(() => {
      onToggleHazard(id);
      setDismissingHazard(null);
      setActiveHazardInfo(id);
    }, 260);
    window.setTimeout(() => setActiveHazardInfo((current) => current === id ? null : current), 4260);
  }

  function getRoomCheckMessages() {
    const missingItems = roomItems.length - itemsDone;
    const remainingHazards = hazards.length - hazardsDone;
    return [
      missingItems > 0 ? `還有 ${missingItems} 件用品還沒準備好` : "",
      remainingHazards > 0 ? "還有危險物品需要處理" : "",
    ].filter(Boolean);
  }

  function completeRoomCheck() {
    if (complete) {
      setRoomCheckMessage("");
      onNext();
      return;
    }
    const messages = getRoomCheckMessages();
    setRoomCheckMessage(messages.length > 0 ? messages.join("，") : "房間還沒準備好，請再確認用品與危險物品");
  }

  return (
    <div className="content-wrap preparation-page">
      <StepHeading title="先替牠布置安全的生活空間" body={`${petName || "小狗"} 還沒到家，但牠的生活角落可以先準備起來。先把每天會用到的用品放進房間，再看看有哪些東西可能讓牠誤咬、誤食或受傷。`} />
      <div className="room-preparation-layout simplified-room-layout">
        <section className="room-supply-shelf" aria-label="生活用品準備區">
          <div className="room-supply-header">
            <h2>用品準備箱</h2>
          </div>
          <div className="room-supply-rows">
            {supplyRows.map((row, rowIndex) => <div key={`${rowIndex}-${row.map((item) => item.id).join("-")}`} className={`room-supply-row room-supply-row--${row.length} full-seven`}>
              {row.map((item) => {
                const selected = selectedItems.includes(item.id);
                const note = preparedRoomItemNotes[item.id] ?? { label: item.label, note: item.purpose };
                const price = item.expenseId ? expensePriceText([item.expenseId], breed) : "";
                return <div key={item.id} className="supply-slot">
                  {!selected ? <button type="button" className={exitingItems.includes(item.id) ? "departing" : ""} aria-label={`${item.label}，可加入`} disabled={exitingItems.includes(item.id)} onClick={() => prepareItem(item.id)}>
                    <span className="room-supply-visual"><img className={`room-item-image room-item-image--${item.id}`} src={item.image} alt="" /></span>
                    <b>{item.label}</b>
                  </button> : <div className="supply-slot-note" aria-live="polite"><b>{note.label}</b><small>{note.note}</small><span className="supply-slot-price">{price || "不另計費"}</span></div>}
                </div>;
              })}
            </div>)}
          </div>
        </section>

        <div className="room-interaction-column">
          <div ref={roomSceneRef} className={`room-scene simplified-room-scene ${roomSceneReady ? "room-scene-ready" : ""}`} role="group" aria-label="寵物生活空間">
            <img className="room-scene-background" src="/assets/room/empty-room.png" alt="空的寵物生活房間" />
            {roomItems.filter((item) => selectedItems.includes(item.id)).map((item) => <div key={item.id} className={`room-object placed-supply auto-room-object ${item.id === "food" ? "placed-room-item--food" : ""}`} style={{ left: `${item.placement.x}%`, top: `${item.placement.y}%`, width: `${item.placement.width}%`, zIndex: item.placement.layer }}><img src={item.image} alt={`房間中已配置的${item.label}`} /><span>{item.label}</span></div>)}
            {hazards.filter((item) => !securedHazards.includes(item.id)).map((item) => <button key={item.id} type="button" className={`room-object room-hazard ${dismissingHazard === item.id ? "dismissing" : ""}`} style={{ left: `${item.placement.x}%`, top: `${item.placement.y}%`, width: `${item.placement.width}%`, zIndex: item.placement.layer }} onClick={() => secureHazard(item.id)}><img src={item.image} alt={`房間中的危險物品：${item.label}`} /><span>{item.label}</span></button>)}
            <div className="pet-doorplate">
              <img src="/assets/room/nameplate.png" alt="小狗名字門牌" />
              <span className="pet-doorplate-name">{petName}</span>
            </div>
            {activeHazard && <section className="room-hazard-alert" role="status" aria-live="polite"><h2>{activeHazard.label}已收起</h2><p><b>為什麼危險：</b>{activeHazard.danger}</p><p><b>建議如何處理：</b>{activeHazard.handling}</p></section>}
          </div>

        </div>
      </div>
      <div className="room-actions">
        <button className="secondary" onClick={complete || reviewing ? onReplay : onBack}>{complete || reviewing ? "↻ 再玩一次" : "← 返回"}</button>
        <div className="room-actions-right">{roomCheckMessage && <p className="room-check-message" role="alert">{roomCheckMessage}</p>}<button className="primary" onClick={completeRoomCheck}>完成房間檢查，準備出發 <span>→</span></button></div>
      </div>
    </div>
  );
}

export function CareMemberSetup({ members, onChange, onBack, onNext }: { members: CareMember[]; onChange: (members: CareMember[]) => void; onBack: () => void; onNext: () => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const primary = members.find((member) => member.isPlayer);
  const valid = Boolean(primary?.name.trim() && primary.age && primary.age >= 1 && primary.age <= 120 && members.filter((member) => !member.isPlayer).every((member) => member.name.trim() && (member.age === null || (member.age >= 1 && member.age <= 120))));

  function updateMember(id: string, patch: Partial<CareMember>) { onChange(members.map((member) => member.id === id ? { ...member, ...patch } : member)); }
  function addMember() { if (members.length < 6) onChange([...members, { id: `member-${Date.now()}`, name: "", age: null, isPlayer: false }]); }
  function validate() {
    const nextErrors: Record<string, string> = {};
    members.forEach((member) => {
      if (!member.name.trim()) nextErrors[`${member.id}-name`] = member.isPlayer ? "請填寫主要照顧者稱呼。" : "請填寫共同照護者稱呼。";
      if (member.isPlayer && (member.age === null || member.age < 1 || member.age > 120)) nextErrors[`${member.id}-age`] = "請輸入 1～120 歲。";
      if (!member.isPlayer && member.age !== null && (member.age < 1 || member.age > 120)) nextErrors[`${member.id}-age`] = "年齡如有填寫，請輸入 1～120 歲。";
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onNext();
  }

  return <div className="content-wrap preparation-page">
    <StepHeading title="設定主要飼養者與共同照護者" body="先填寫主要飼養者；若確實有人可以一起照護，再新增共同照護者即可。" />
    <div className="member-grid">{members.map((member) => <article className="member-card" key={member.id}><div className="member-card-head"><span>{member.isPlayer ? "主" : "協"}</span><div><b>{member.isPlayer ? "主要飼養者" : "共同照護者"}</b><small>{member.isPlayer ? "名稱與年齡必填" : "名稱必填，年齡選填"}</small></div>{!member.isPlayer && <button type="button" onClick={() => onChange(members.filter((item) => item.id !== member.id))}>移除</button>}</div><label>名稱或稱呼<input value={member.name} placeholder={member.isPlayer ? "例：小美" : "例：媽媽"} onChange={(event) => updateMember(member.id, { name: event.target.value })} /></label>{errors[`${member.id}-name`] && <p className="field-error">{errors[`${member.id}-name`]}</p>}<label>年齡{!member.isPlayer && <small>（選填）</small>}<input type="number" inputMode="numeric" min="1" max="120" value={member.age ?? ""} placeholder="例：35" onChange={(event) => updateMember(member.id, { age: event.target.value ? Number(event.target.value) : null })} /></label>{errors[`${member.id}-age`] && <p className="field-error">{errors[`${member.id}-age`]}</p>}</article>)}</div>
    <button type="button" className="add-member-button" onClick={addMember} disabled={members.length >= 6}>＋新增共同照護者 <small>{members.length - 1} / 5</small></button>
    <div className={`task-message ${valid ? "success" : ""}`}>{valid ? "照顧成員資料已完成，可以整理出發用品。" : "請先完成主要照顧者資料；共同照護者只需填寫真實存在的人選。"}</div>
    <NavButtons onBack={onBack} onNext={validate} nextLabel="成員完成，準備出發" />
  </div>;
}

export function CarTrunkPreparation({ selected, petName, breed, onSelect, onBack, onReplay, onNext, reviewing = false }: { selected: string[]; petName: string; breed: string; onSelect: (id: string) => void; onBack: () => void; onReplay: () => void; onNext: () => void; reviewing?: boolean }) {
  const [exitingItems, setExitingItems] = useState<string[]>([]);
  const [departing, setDeparting] = useState(false);
  const documents = departureTrunkItems.filter((item) => item.kind === "document");
  const supplies = departureTrunkItems.filter((item) => item.kind === "supply");
  const documentDone = documents.filter((item) => selected.includes(item.id)).length;
  const supplyDone = supplies.filter((item) => selected.includes(item.id)).length;
  const complete = documentDone === documents.length && supplyDone === supplies.length;
  const supplyRows = Array.from(
    { length: Math.ceil(departureTrunkItems.length / 2) },
    (_, index) => departureTrunkItems.slice(index * 2, index * 2 + 2),
  ).filter((row) => row.length > 0);
  // Kept only for the legacy markup below; the rendered interface returns before it.
  const [message, setMessage] = useState("");
  const activeId = "";
  const activeItem = trunkItems[0];

  function selectItem(id: string) {
    if (selected.includes(id) || exitingItems.includes(id)) return;
    setExitingItems((current) => [...current, id]);
    window.setTimeout(() => {
      onSelect(id);
      setExitingItems((current) => current.filter((itemId) => itemId !== id));
    }, 360);
  }

  function legacyCheckPreparation() {
    const missingDocuments = documents.filter((item) => !selected.includes(item.id));
    const missingSupplies = supplies.filter((item) => !selected.includes(item.id));
    if (missingDocuments.length > 0 && missingSupplies.length > 0) {
      setMessage(`還有需要確認的身分或領養文件。還需要準備：${missingSupplies.map((item) => item.label).join("、")}。`);
    } else if (missingDocuments.length > 0) {
      setMessage("還有需要確認的身分或領養文件。");
    } else if (missingSupplies.length > 0) {
      setMessage(`還需要準備：${missingSupplies.map((item) => item.label).join("、")}。`);
    } else {
      setMessage("準備完成！文件、運輸設備及途中用品都已確認。");
    }
  }

  function depart() { setDeparting(true); window.setTimeout(onNext, 650); }

  return <div className="content-wrap preparation-page">
    <StepHeading title="出發接牠回家" body={`今天要去接 ${petName || "小狗"} 回家了。出門前先把需要的文件與接回用品準備好，讓牠在路上有安全的位置，也讓你能從容處理突發狀況。`} />
    <div className={`departure-layout ${departing ? "departing" : ""}`}>
      <aside className="departure-supply-shelf" aria-label="準備物品">
        <div className="departure-supply-header"><h2>準備物品</h2></div>
        <div className="departure-supply-rows">
          {supplyRows.map((row, index) => <div className={`departure-supply-row departure-supply-row--${row.length}`} key={`${row.map((item) => item.id).join("-")}-${index}`}>
            {row.map((item) => {
              const itemSelected = selected.includes(item.id);
              const note = preparedTrunkItemNotes[item.id] ?? { label: item.label, note: item.description };
              const price = expensePriceText(item.expenseIds ?? [], breed);
              return <div key={item.id} className="supply-slot">
                {!itemSelected ? <button type="button" className={exitingItems.includes(item.id) ? "departing" : ""} onClick={() => selectItem(item.id)} aria-label={`準備${item.label}`}>
                  <span className="departure-supply-visual"><img className={`departure-item-image departure-item-image--${item.id}`} src={item.image} alt="" /></span><b>{item.label}</b>
                </button> : <div className="supply-slot-note" aria-live="polite"><b>{note.label}</b><small>{note.note}</small><span className="supply-slot-price">{price || "不另計費"}</span></div>}
              </div>;
            })}
          </div>)}
        </div>
      </aside>

      <section className="departure-car" aria-label="已打開的汽車後車廂與自動配置用品">
        <img className="car-trunk-background" src="/assets/car/car-trunk.png" alt="打開的汽車後車廂" />
        {selected.includes("documents") && <div className="car-document-folder complete"><img src="/assets/car/adoption-documents.png" alt="領養文件夾" /></div>}
        {selected.includes("id") && <img className="placed-car-item placed-car-id" src="/assets/car/id-card.png" alt="放入文件夾的身分證" />}
        {supplies.filter((item) => selected.includes(item.id)).map((item) => false ? (
          <div key={item.id} className="placed-car-item placed-car-carrier-kit" style={{ left: `${item.placement.x}%`, top: `${item.placement.y}%`, width: `${item.placement.width}%`, zIndex: item.placement.layer }}>
            <img className="carrier-pad" src="/assets/car/pee-pad.png" alt="鋪在運輸籠內的尿墊" /><img className="carrier-image" src={item.image} alt="放在後車廂的安全運輸籠" />
          </div>
        ) : <img key={item.id} className={`placed-car-item placed-car-${item.id}`} style={{ left: `${item.placement.x}%`, top: `${item.placement.y}%`, width: `${item.placement.width}%`, zIndex: item.placement.layer }} src={item.image} alt={`後車廂內的${item.label}`} />)}
      </section>
    </div>
    <div className="departure-actions">
      <button type="button" className="secondary" onClick={complete || reviewing ? onReplay : onBack}>{complete || reviewing ? "↻ 再玩一次" : "← 返回"}</button>
      <div><button type="button" className="primary" onClick={depart} disabled={!complete}>出發接牠 <span>→</span></button></div>
    </div>
  </div>;

  return <div className="content-wrap preparation-page">
    <StepHeading title="出發接牠回家" body="確認需要攜帶的文件及接回用品。點擊項目後，系統會自動配置到文件夾或後車廂。" />
    <div className={`car-preparation-layout ${departing ? "departing" : ""}`}>
      <aside className="car-preparation-panel" aria-label="出發前準備內容">
        <DepartureGroup title="A. 準備文件" description="先確認辦理領養及接回時需要攜帶的身分與領養資料。" done={documentDone} total={documents.length} items={documents} selected={selected} activeId={activeId} onSelect={selectItem} />
        <DepartureGroup title="B. 準備接回用品" description="準備安全運輸、飲水、牽引及清潔用品，讓小狗回家的路程更安全。" done={supplyDone} total={supplies.length} items={supplies} selected={selected} activeId={activeId} onSelect={selectItem} />
      </aside>

      <section className="car-trunk-scene" aria-label="已打開的汽車後車廂與自動配置用品">
        <img className="car-trunk-background" src="/assets/car/car-trunk.png" alt="打開且等待放入接回用品的汽車後車廂" />
        <div className={`car-document-folder ${documentDone === documents.length ? "complete" : ""}`}>
          <img src="/assets/car/adoption-documents.png" alt="領養文件夾" />
          <span>{documentDone === documents.length ? "文件已備齊" : `文件 ${documentDone}／${documents.length}`}</span>
        </div>
        {selected.includes("id") && <img className="placed-car-item placed-car-id" src="/assets/car/id-card.png" alt="已放入文件夾的身分證" />}
        {supplies.filter((item) => selected.includes(item.id)).map((item) => item.id === "carrier-kit" ? (
          <div key={item.id} className="placed-car-item placed-car-carrier-kit" style={{ left: `${item.placement.x}%`, top: `${item.placement.y}%`, width: `${item.placement.width}%`, zIndex: item.placement.layer }}>
            <img className="carrier-pad" src="/assets/car/pee-pad.png" alt="鋪在運輸籠底部的尿墊" />
            <img className="carrier-image" src={item.image} alt="已鋪好尿墊的安全運輸籠" />
          </div>
        ) : (
          <img key={item.id} className={`placed-car-item placed-car-${item.id}`} style={{ left: `${item.placement.x}%`, top: `${item.placement.y}%`, width: `${item.placement.width}%`, zIndex: item.placement.layer }} src={item.image} alt={`後車廂中已收妥的${item.label}`} />
        ))}
      </section>
    </div>

    {activeItem && <section className="departure-item-information" aria-live="polite" aria-labelledby="departure-information-title">
      <div><p className="eyebrow">物品資訊</p><h2 id="departure-information-title">{activeItem.label}</h2></div>
      <dl><div><dt>用途</dt><dd>{activeItem.description}</dd></div><div><dt>為什麼需要</dt><dd>{activeItem.reason}</dd></div><div><dt>注意事項</dt><dd>{activeItem.caution}</dd></div></dl>
      <p className="departure-source">參考：{activeItem.sourceLabel}{activeItem.sourceUrl && <a href={activeItem.sourceUrl} target="_blank" rel="noreferrer">查看參考資料</a>}</p>
    </section>}

    <div className={`task-message ${complete ? "success" : ""}`} role="status" aria-live="polite">{complete ? "文件與接回用品都準備完成，可以出發接牠回家了。" : message || `文件準備 ${documentDone}／2｜接回用品 ${supplyDone}／4`}</div>
    <div className="departure-actions">
      <button type="button" className="secondary" onClick={onBack}>← 返回</button>
      <div><button type="button" className="secondary" onClick={legacyCheckPreparation}>檢查準備</button><button type="button" className="primary" onClick={depart} disabled={!complete}>出發接牠 <span>→</span></button></div>
    </div>
  </div>;
}

function DepartureGroup({ title, description, done, total, items, selected, activeId, onSelect }: { title: string; description: string; done: number; total: number; items: typeof trunkItems; selected: string[]; activeId: string; onSelect: (id: string) => void }) {
  return <section className="car-preparation-group"><div className="car-preparation-group-head"><h2>{title}</h2><b>{done}／{total}</b></div><p>{description}</p><div className="car-preparation-items">{items.map((item) => {
    const prepared = selected.includes(item.id);
    return <button key={item.id} type="button" className={`${prepared ? "prepared" : ""} ${activeId === item.id ? "active" : ""}`} aria-pressed={prepared} onClick={() => onSelect(item.id)}><img src={item.image} alt="" /><span><b>{item.label}</b><small>{prepared ? `✓ ${item.preparedLabel}` : "點擊自動配置"}</small><em>為什麼要帶？</em></span></button>;
  })}</div>{done === total && <p className="car-group-complete">✓ {title.startsWith("A") ? "文件準備完成 2／2，文件已備齊" : "接回用品準備完成 4／4"}</p>}</section>;
}
