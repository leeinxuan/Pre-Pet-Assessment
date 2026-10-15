"use client";

import { useRef, useState } from "react";
import { officialPetSources } from "../../data/shared/pet-sources";
import { getSpeciesConfig } from "../../data/species";
import { contentLastUpdated } from "../../data/shared/content-meta";
import { ProfileSupplementForm } from "../report/ProfileForms";
import type { Profile } from "../../game-types";
import { useDialogFocus } from "../shared/useDialogFocus";

export function PetAcquisitionPage({ profile, petName, breed, species, onProfileChange, onBack, onReset }: { profile: Profile; petName: string; breed: string; species: string; onProfileChange: (profile: Profile) => void; onBack: () => void; onReset: () => void }) {
  const [shareMessage, setShareMessage] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileEdited, setProfileEdited] = useState(false);
  const profileModalRef = useRef<HTMLElement>(null);
  const acquisition = getSpeciesConfig(species).acquisition;
  const visibleSources = officialPetSources.filter((source) => acquisition.sourceIds.includes(source.id));

  useDialogFocus({ isOpen: profileModalOpen, dialogRef: profileModalRef, onClose: () => setProfileModalOpen(false) });

  async function shareWithOthers() {
    const url = new URL("/", window.location.href).toString();
    try {
      if (navigator.share) {
        await navigator.share({ title: "伴日子新手村", text: "一起完成飼主準備度練習。", url });
        setShareMessage("已開啟分享選單。");
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareMessage("連結已複製，可以貼給家人或朋友。");
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setShareMessage("目前無法自動分享，請複製瀏覽器網址列中的連結。");
      }
    }
  }

  return <div className="content-wrap official-acquisition-page">
    <header className="official-acquisition-hero">
      <p className="life-stage-label">下一步</p>
      <h1>透過合法管道迎接牠</h1>
      <p>完成準備後，請選擇透明、合法且能提供完整資訊的取得方式。</p>
    </header>

    <section className="official-profile-entry" aria-labelledby="official-profile-title">
      <div><h2 id="official-profile-title">準備聯繫前，先整理你的生活條件</h2><p>居住環境、可投入時間與照顧經驗，能幫助收容所、認養平台或合法業者更了解你是否適合迎接牠。</p></div>
      <button type="button" className="secondary" onClick={() => setProfileModalOpen(true)}>填寫真實生活條件</button>
    </section>
    {profileEdited && <p className="official-profile-complete" role="status">已整理真實生活條件，可於聯繫前下載使用。</p>}

    <main className="official-acquisition-list" aria-label="官方取得管道">
      {visibleSources.map((source) => <section className="official-acquisition-panel" key={source.id} aria-labelledby={`${source.id}-title`}>
        <div className="official-acquisition-panel-copy">
          <p className="official-acquisition-category">{source.category}</p>
          <h2 id={`${source.id}-title`}>{source.title}</h2>
          <p>{source.description}</p>
        </div>
        <a className="primary official-acquisition-link" href={source.url} target="_blank" rel="noopener noreferrer">
          {source.linkLabel} <span>↗</span>
        </a>
      </section>)}
    </main>
    <p className="official-acquisition-reminder">{acquisition.reminder.map((segment, index) => segment.emphasis
      ? <strong className="home-readiness-emphasis" key={`${segment.text}-${index}`}>{segment.text}</strong>
      : <span key={`${segment.text}-${index}`}>{segment.text}</span>)}</p>

    <div className="nav-buttons official-acquisition-footer-actions">
      <button className="secondary" type="button" onClick={onBack}>← 返回飼養觀念回顧</button>
      <div className="official-final-actions">
        <button className="secondary" type="button" onClick={shareWithOthers}>分享給他人 <span>↗</span></button>
        <button className="primary" type="button" onClick={onReset}>重新體驗 <span>↻</span></button>
      </div>
    </div>
    {shareMessage && <p className="official-share-status" role="status">{shareMessage}</p>}
    <footer className="official-acquisition-source-note">
      <div className="official-acquisition-source-note__identity">
        <p>© 2026 伴日子新手村。</p>
      </div>
      <div className="official-acquisition-source-note__details">
        <p>飼養與照護資訊參考農業部寵物飼養與照顧指南及相關公開資料；</p>
        <p>插圖、情境圖片與動畫素材由 AI 輔助生成。</p>
      </div>
      <p>最後更新：{contentLastUpdated}</p>
    </footer>
    {profileModalOpen && <div className="profile-modal-backdrop" role="presentation" onMouseDown={() => setProfileModalOpen(false)}><section ref={profileModalRef} className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-supplement-title" tabIndex={-1} onMouseDown={(event) => event.stopPropagation()}><button type="button" className="profile-modal-close" aria-label="關閉真實生活條件表單" onClick={() => setProfileModalOpen(false)}>×</button><ProfileSupplementForm embedded profile={profile} petName={petName} breed={breed} species={species} onChange={(nextProfile) => { setProfileEdited(true); onProfileChange(nextProfile); }} onBack={() => undefined} onReset={() => undefined} /></section></div>}
  </div>;
}
