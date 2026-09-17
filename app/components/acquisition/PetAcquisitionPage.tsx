"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ProfileSupplementForm } from "../report/ProfileReportComponents";
import { petSources, type PetSource } from "../../data/shared/pet-sources";
import type { Profile } from "../../game-types";

const taiwanCities = ["基隆市", "臺北市", "新北市", "桃園市", "新竹市", "新竹縣", "苗栗縣", "臺中市", "彰化縣", "南投縣", "雲林縣", "嘉義市", "嘉義縣", "臺南市", "高雄市", "屏東縣", "宜蘭縣", "花蓮縣", "臺東縣", "澎湖縣", "金門縣", "連江縣"] as const;

function SourceImageFrame({ source, className }: { source: PetSource; className: string }) {
  return <span className={className} aria-hidden="true">
    {source.imageSrc && <img src={source.imageSrc} alt="" onError={(event) => { event.currentTarget.remove(); }} />}
  </span>;
}

function AcquisitionOptionCard({ card, onOpen }: { card: PetSource; onOpen: (card: PetSource) => void }) {
  return <button type="button" className="legal-option-card is-active" onClick={() => onOpen(card)}>
    <SourceImageFrame source={card} className="legal-option-visual" />
    <span className="legal-option-copy"><b>{card.name}</b><span className="legal-option-city">{card.species.join("、")} · {card.region}</span></span>
    <span className="legal-option-action">查看平台資訊</span>
  </button>;
}

function AcquisitionInfoDialog({ card, onClose }: { card: PetSource; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { onClose(); return; }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusable?.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); previouslyFocused?.focus(); };
  }, [onClose]);
  return <div className="acquisition-dialog-backdrop" role="presentation" onMouseDown={onClose}>
    <section ref={dialogRef} className="acquisition-dialog" role="dialog" aria-modal="true" aria-labelledby="acquisition-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
      <button ref={closeButtonRef} type="button" className="acquisition-dialog-close" aria-label="關閉據點資訊" onClick={onClose}>×</button>
      <p className="life-stage-label">據點資訊</p><div className="acquisition-dialog-heading"><h2 id="acquisition-dialog-title">{card.name}</h2><SourceImageFrame source={card} className="acquisition-dialog-visual" /></div>
      <div className="acquisition-dialog-facts"><div className="acquisition-dialog-species" aria-label="動物種類"><b>動物種類</b><span>{card.species.map((species) => <i key={species}>{species}</i>)}</span></div><div className="acquisition-dialog-region"><b>地區</b><span>{card.region}</span></div></div>
      <p className="acquisition-dialog-positioning">{card.oneLinePositioning}</p>
      <section className="acquisition-dialog-section"><h3>適合你如果⋯⋯</h3><ul>{card.suitableFor.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section className="acquisition-dialog-section"><h3>去之前要確認的事</h3><ul>{card.checksBeforeVisit.map((item) => <li key={item}>{item}</li>)}</ul></section>
      {card.url && <a className="primary acquisition-dialog-source" href={card.url} target="_blank" rel="noopener noreferrer">{card.linkLabel ?? "前往網站"} <span>↗</span></a>}
    </section>
  </div>;
}

export function PetAcquisitionPage({ profile, petName, breed, species, onProfileChange, onBack, onReset }: { profile: Profile; petName: string; breed: string; species: string; onProfileChange: (profile: Profile) => void; onBack: () => void; onReset: () => void }) {
  const [selectedCity, setSelectedCity] = useState(""); const [searchMessage, setSearchMessage] = useState(""); const [shareMessage, setShareMessage] = useState(""); const [activeAcquireTab, setActiveAcquireTab] = useState<"adopt" | "buy">("adopt"); const [profileModalOpen, setProfileModalOpen] = useState(false); const [profileEdited, setProfileEdited] = useState(false); const [activeCard, setActiveCard] = useState<PetSource | null>(null);
  const adoptionCards = petSources.filter((source) => source.route === "adoption");
  const purchaseCards = petSources.filter((source) => source.route === "purchase");
  useEffect(() => {
    if (!profileModalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [profileModalOpen]);
  function searchRegion(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSearchMessage("目前先提供取得管道參考，縣市查詢功能準備中。"); }
  async function shareWithOthers() { const url = new URL("/", window.location.href).toString(); try { if (navigator.share) { await navigator.share({ title: "伴日子新手村", text: "一起完成飼主準備度練習。", url }); setShareMessage("已開啟分享選單。"); return; } await navigator.clipboard.writeText(url); setShareMessage("連結已複製，可以貼給家人或朋友。"); } catch (error) { if (!(error instanceof DOMException && error.name === "AbortError")) setShareMessage("目前無法自動分享，請複製瀏覽器網址列中的連結。"); } }
  return <div className="content-wrap legal-acquisition-page">
    <div className="legal-acquisition-hero"><div><h1><span>下一步</span>透過合法管道迎接牠</h1><p>完成準備後，請選擇透明、合法且能提供完整資訊的取得方式。</p></div></div>
    <section className="legal-profile-entry" aria-labelledby="legal-profile-title"><div><h2 id="legal-profile-title">準備聯繫前，先整理你的生活條件</h2><p>居住環境、可投入時間與照顧經驗，能幫助收容所、認養平台或合法業者更了解你是否適合迎接牠。</p></div><button type="button" className="secondary" onClick={() => setProfileModalOpen(true)}>填寫真實生活條件</button></section>
    {profileEdited && <p className="legal-profile-complete" role="status">已整理個人資料，可於聯繫平台前下載使用。</p>}
    <form className="legal-search" onSubmit={searchRegion}><label htmlFor="legal-region-select">依所在地區查看取得管道</label><div><select id="legal-region-select" value={selectedCity} onChange={(event) => setSelectedCity(event.target.value)}><option value="">選擇縣市</option>{taiwanCities.map((city) => <option key={city} value={city}>{city}</option>)}</select><button type="submit">搜尋</button></div>{searchMessage && <p role="status">{searchMessage}</p>}</form>
    <div className="legal-acquisition-tabs" role="tablist" aria-label="取得寵物方式"><button type="button" role="tab" aria-selected={activeAcquireTab === "adopt"} className={activeAcquireTab === "adopt" ? "active" : ""} onClick={() => setActiveAcquireTab("adopt")}>領養</button><button type="button" role="tab" aria-selected={activeAcquireTab === "buy"} className={activeAcquireTab === "buy" ? "active" : ""} onClick={() => setActiveAcquireTab("buy")}>購買</button></div>
    <div className="legal-acquisition-sections"><section className={`legal-section legal-section--adopt ${activeAcquireTab === "adopt" ? "is-mobile-active" : ""}`}><div className="legal-section-head"><h2>領養</h2><p>可以先從收容所、合作認養平台或數位認養服務查看目前開放認養的動物。</p></div><div className="legal-option-grid">{adoptionCards.map((card) => <AcquisitionOptionCard key={card.id} card={card} onOpen={setActiveCard} />)}</div></section><section className={`legal-section legal-section--buy ${activeAcquireTab === "buy" ? "is-mobile-active" : ""}`}><div className="legal-section-head"><h2>購買</h2><p>若選擇購買，請確認來源合法、資訊透明，並了解動物來源、健康紀錄與後續照顧責任。</p></div><div className="legal-option-grid">{purchaseCards.map((card) => <AcquisitionOptionCard key={card.id} card={card} onOpen={setActiveCard} />)}</div></section></div>
    <p className="legal-acquisition-reminder">無論選擇領養或購買，都請確認來源合法，並保留相關文件與健康紀錄。</p><div className="nav-buttons legal-acquisition-footer-actions"><button className="secondary" type="button" onClick={onBack}>← 返回飼養觀念回顧</button><div className="legal-final-actions"><button className="secondary" type="button" onClick={shareWithOthers}>分享給他人 <span>↗</span></button><button className="primary" type="button" onClick={onReset}>重新體驗 <span>↻</span></button></div></div>{shareMessage && <p className="legal-share-status" role="status">{shareMessage}</p>}{profileModalOpen && <div className="profile-modal-backdrop" role="presentation" onMouseDown={() => setProfileModalOpen(false)}><section className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-supplement-title" onMouseDown={(event) => event.stopPropagation()}><button type="button" className="profile-modal-close" aria-label="關閉真實生活條件表單" onClick={() => setProfileModalOpen(false)}>×</button><ProfileSupplementForm embedded profile={profile} petName={petName} breed={breed} species={species} onChange={(nextProfile) => { setProfileEdited(true); onProfileChange(nextProfile); }} onBack={() => undefined} onReset={() => undefined} /></section></div>}{activeCard && <AcquisitionInfoDialog card={activeCard} onClose={() => setActiveCard(null)} />}
  </div>;
}
