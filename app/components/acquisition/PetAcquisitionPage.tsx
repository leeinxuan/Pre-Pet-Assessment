"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ProfileSupplementForm } from "../report/ProfileReportComponents";
import type { Profile } from "../../game-types";

const taiwanCities = ["基隆市", "臺北市", "新北市", "桃園市", "新竹市", "新竹縣", "苗栗縣", "臺中市", "彰化縣", "南投縣", "雲林縣", "嘉義市", "嘉義縣", "臺南市", "高雄市", "屏東縣", "宜蘭縣", "花蓮縣", "臺東縣", "澎湖縣", "金門縣", "連江縣"] as const;
type AcquisitionKind = "領養" | "合法購買";
type AcquisitionCard = { title: string; kind: AcquisitionKind; city?: string; image?: string; icon?: string; href?: string; sourceUrl?: string; sourceLabel?: string; description: string; offerings: string; audience: string };
const adoptionCards: AcquisitionCard[] = [
  { title: "毛孩生活故事卡", kind: "領養", city: "台南市", image: "/assets/acquisition/paws-life-village.jpg", href: "https://paws.ixda.tw/", sourceUrl: "https://paws.ixda.tw/", sourceLabel: "平台網站", description: "平台提供的認養與故事資訊入口。聯繫前可先整理居住環境與照顧安排。", offerings: "可閱讀平台公開的認養相關資訊與聯繫內容。", audience: "適合想先了解平台公開資訊，再決定是否聯繫的使用者。" },
  { title: "地區收容所資訊", kind: "領養", icon: "🏠", href: "https://animal.moa.gov.tw/Frontend/PublicShelter", sourceUrl: "https://animal.moa.gov.tw/Frontend/PublicShelter", sourceLabel: "農業部動物保護資訊網", description: "農業部動物保護資訊網列出各縣市公立動物收容所與連結。", offerings: "可依縣市查看公立收容所與相關聯繫入口。", audience: "適合希望從所在地開始查詢公立收容所資訊的使用者。" },
  { title: "全國動物認領養資訊", kind: "領養", icon: "🤝", href: "https://animal.moa.gov.tw/Frontend/AdoptSearch/AdoptInfo", sourceUrl: "https://animal.moa.gov.tw/Frontend/AdoptSearch/AdoptInfo", sourceLabel: "農業部動物保護資訊網", description: "農業部的認領養資訊頁提供各縣市收容所與全國認領養系統入口。", offerings: "可查找認領養相關資訊、收容所入口與地方動保單位聯繫方式。", audience: "適合希望先比較各地公開認養管道的使用者。" },
  { title: "數位認養服務", kind: "領養", icon: "💻", href: "https://m.moa.gov.tw/AnimalAdoption/Index", sourceUrl: "https://m.moa.gov.tw/AnimalAdoption/Index", sourceLabel: "農業部田邊好幫手", description: "農業部提供的動物認養與協尋資訊入口，可依地區瀏覽公開認養資訊。", offerings: "可依縣市預先瀏覽動物資訊，並依頁面指示聯繫各地承辦單位。", audience: "適合需要線上先查詢所在地認養資訊的使用者。" },
];
const purchaseCards: AcquisitionCard[] = [
  { title: "合法寵物業者名單", kind: "合法購買", icon: "🏷", href: "https://www.pet.gov.tw/Web/BusinessList.aspx", sourceUrl: "https://www.pet.gov.tw/Web/BusinessList.aspx", sourceLabel: "寵物登記管理資訊網", description: "官方名單可查詢特定寵物業者的許可證、營業項目、營業狀態與有效日期。", offerings: "可依縣市、業務項目、評鑑與關鍵字查詢公開登記資料。", audience: "適合希望先核對業者登記與營業資訊的使用者。" },
  { title: "依地區篩選合法業者", kind: "合法購買", icon: "📍", href: "https://www.pet.gov.tw/Web/BusinessList.aspx", sourceUrl: "https://www.pet.gov.tw/Web/BusinessList.aspx", sourceLabel: "寵物登記管理資訊網", description: "官方查詢頁提供縣市篩選，可先確認所在地業者是否列於公開名單。", offerings: "可查看業者所在地、許可證、業務項目與營業狀態。", audience: "適合希望從居住地附近開始確認公開登記資訊的使用者。" },
  { title: "依物種篩選合法業者", kind: "合法購買", icon: "🐾", href: "https://www.pet.gov.tw/Web/BusinessList.aspx", sourceUrl: "https://www.pet.gov.tw/Web/BusinessList.aspx", sourceLabel: "寵物登記管理資訊網", description: "官方查詢頁可檢視特定寵物種類與業務項目的公開登記資料。", offerings: "可比對特定寵物種類、許可證資訊與有效日期。", audience: "適合希望先確認預計飼養物種相關公開登記資訊的使用者。" },
];

function AcquisitionOptionCard({ card, onOpen }: { card: AcquisitionCard; onOpen: (card: AcquisitionCard) => void }) {
  return <button type="button" className="legal-option-card is-active" onClick={() => onOpen(card)}>
    <span className="legal-option-visual">{card.image ? <img src={card.image} alt="" /> : <span aria-hidden="true">{card.icon ?? "🐾"}</span>}</span>
    <span className="legal-option-copy"><b>{card.title}</b><span className="legal-option-city">{card.city ?? card.kind}</span></span>
    <span className="legal-option-action">查看平台資訊</span>
  </button>;
}

function AcquisitionInfoDialog({ card, onClose }: { card: AcquisitionCard; onClose: () => void }) {
  const [notice, setNotice] = useState("");
  function openPlatform() { if (!card.href) { setNotice("平台連結準備中。"); return; } window.open(card.href, "_blank", "noopener,noreferrer"); }
  return <div className="acquisition-dialog-backdrop" role="presentation" onMouseDown={onClose}>
    <section className="acquisition-dialog" role="dialog" aria-modal="true" aria-labelledby="acquisition-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
      <button type="button" className="acquisition-dialog-close" aria-label="關閉平台資訊" onClick={onClose}>×</button>
      <div className="acquisition-dialog-visual">{card.image ? <img src={card.image} alt="" /> : <span aria-hidden="true">{card.icon ?? "🐾"}</span>}</div>
      <p className="life-stage-label">{card.kind}</p><h2 id="acquisition-dialog-title">{card.title}</h2><p className="acquisition-dialog-meta">{card.city ? `服務地區：${card.city}` : "服務範圍：平台資訊準備中"}</p>
      <p>{card.description}</p><div className="acquisition-dialog-details"><b>你可在這裡找到</b><p>{card.offerings}</p></div><p className="acquisition-dialog-audience"><b>適合誰使用</b>{card.audience}</p><p className="acquisition-dialog-reminder">請確認來源、健康與照顧資訊是否透明，並保留必要文件與聯繫紀錄。</p>
      {card.sourceUrl && <a className="acquisition-dialog-source" href={card.sourceUrl} target="_blank" rel="noreferrer">資料來源：{card.sourceLabel ?? "官方網站"}</a>}{notice && <p className="acquisition-dialog-notice" role="status">{notice}</p>}<button type="button" className="primary" onClick={openPlatform}>前往查看 <span>↗</span></button>
    </section>
  </div>;
}

export function PetAcquisitionPage({ profile, petName, breed, species, onProfileChange, onBack, onReset }: { profile: Profile; petName: string; breed: string; species: string; onProfileChange: (profile: Profile) => void; onBack: () => void; onReset: () => void }) {
  const [selectedCity, setSelectedCity] = useState(""); const [searchMessage, setSearchMessage] = useState(""); const [shareMessage, setShareMessage] = useState(""); const [activeAcquireTab, setActiveAcquireTab] = useState<"adopt" | "buy">("adopt"); const [profileModalOpen, setProfileModalOpen] = useState(false); const [profileEdited, setProfileEdited] = useState(false); const [activeCard, setActiveCard] = useState<AcquisitionCard | null>(null);
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
    <div className="legal-acquisition-sections"><section className={`legal-section legal-section--adopt ${activeAcquireTab === "adopt" ? "is-mobile-active" : ""}`}><div className="legal-section-head"><h2>領養</h2><p>可以先從收容所、合作認養平台或數位認養服務查看目前開放認養的動物。</p></div><div className="legal-option-grid">{adoptionCards.map((card) => <AcquisitionOptionCard key={card.title} card={card} onOpen={setActiveCard} />)}</div></section><section className={`legal-section legal-section--buy ${activeAcquireTab === "buy" ? "is-mobile-active" : ""}`}><div className="legal-section-head"><h2>購買</h2><p>若選擇購買，請確認來源合法、資訊透明，並了解動物來源、健康紀錄與後續照顧責任。</p></div><div className="legal-option-grid">{purchaseCards.map((card) => <AcquisitionOptionCard key={card.title} card={card} onOpen={setActiveCard} />)}</div></section></div>
    <p className="legal-acquisition-reminder">無論選擇領養或購買，都請確認來源合法，並保留相關文件與健康紀錄。</p><div className="nav-buttons legal-acquisition-footer-actions"><button className="secondary" type="button" onClick={onBack}>← 返回飼養觀念回顧</button><div className="legal-final-actions"><button className="secondary" type="button" onClick={shareWithOthers}>分享給他人 <span>↗</span></button><button className="primary" type="button" onClick={onReset}>重新體驗 <span>↻</span></button></div></div>{shareMessage && <p className="legal-share-status" role="status">{shareMessage}</p>}{profileModalOpen && <div className="profile-modal-backdrop" role="presentation" onMouseDown={() => setProfileModalOpen(false)}><section className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-supplement-title" onMouseDown={(event) => event.stopPropagation()}><button type="button" className="profile-modal-close" aria-label="關閉真實生活條件表單" onClick={() => setProfileModalOpen(false)}>×</button><ProfileSupplementForm embedded profile={profile} petName={petName} breed={breed} species={species} onChange={(nextProfile) => { setProfileEdited(true); onProfileChange(nextProfile); }} onBack={() => undefined} onReset={() => undefined} /></section></div>}{activeCard && <AcquisitionInfoDialog card={activeCard} onClose={() => setActiveCard(null)} />}
  </div>;
}
