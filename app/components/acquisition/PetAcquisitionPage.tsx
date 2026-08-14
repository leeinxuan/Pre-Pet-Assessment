"use client";

import { useState, type FormEvent } from "react";

const taiwanCities = [
  "基隆市",
  "臺北市",
  "新北市",
  "桃園市",
  "新竹市",
  "新竹縣",
  "苗栗縣",
  "臺中市",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義市",
  "嘉義縣",
  "臺南市",
  "高雄市",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "臺東縣",
  "澎湖縣",
  "金門縣",
  "連江縣",
] as const;

type AcquisitionCard = {
  title: string;
  city?: string;
  image?: string;
  icon?: string;
  href?: string;
};

const adoptionCards: AcquisitionCard[] = [
  {
    title: "毛孩生活故事卡",
    city: "台南市",
    image: "/assets/acquisition/paws-life-village.jpg",
    href: "https://paws.ixda.tw/",
  },
  { title: "地區收容所資訊", icon: "🏠" },
  { title: "合作認養平台", icon: "🤝" },
  { title: "數位認養服務", icon: "💻" },
];

const purchaseCards: AcquisitionCard[] = [
  { title: "合法寵物店查詢", icon: "🏷" },
  { title: "依地區篩選", icon: "📍" },
  { title: "依物種篩選", icon: "🐕" },
];

function AcquisitionOptionCard({ card }: { card: AcquisitionCard }) {
  const visual = card.image ? (
    <img src={card.image} alt="" />
  ) : (
    <span aria-hidden="true">{card.icon ?? "🐾"}</span>
  );

  const cardBody = (
    <>
      <span className="legal-option-visual">{visual}</span>
      <span className="legal-option-copy">
        <b>{card.title}</b>
        <span className="legal-option-city" aria-label={card.city ? `縣市：${card.city}` : undefined}>
          {card.city ?? "\u00A0"}
        </span>
      </span>
    </>
  );

  if (card.href) {
    return (
      <a className="legal-option-card is-active" href={card.href} target="_blank" rel="noopener noreferrer">
        {cardBody}
        <em className="legal-option-action">前往查看</em>
      </a>
    );
  }

  return (
    <article className="legal-option-card is-disabled" aria-disabled="true">
      {cardBody}
      <button className="legal-option-action" type="button" onClick={() => undefined}>前往查看</button>
    </article>
  );
}

export function PetAcquisitionPage({ onBack, onReset }: { onBack: () => void; onReset: () => void }) {
  const [selectedCity, setSelectedCity] = useState("");
  const [searchMessage, setSearchMessage] = useState("");

  function searchRegion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchMessage("目前先提供取得管道參考，縣市查詢功能準備中。");
  }

  return (
    <div className="content-wrap legal-acquisition-page">
      <div className="legal-acquisition-hero">
        <div>
          <h1><span>下一步</span>透過合法管道迎接牠</h1>
          <p>完成準備後，請選擇透明、合法且能提供完整資訊的取得方式。</p>
        </div>
      </div>

      <form className="legal-search" onSubmit={searchRegion}>
        <label htmlFor="legal-region-select">依所在地區查看取得管道</label>
        <div>
          <select id="legal-region-select" value={selectedCity} onChange={(event) => setSelectedCity(event.target.value)}>
            <option value="">選擇縣市</option>
            {taiwanCities.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
          <button type="submit">搜尋</button>
        </div>
        {searchMessage && <p role="status">{searchMessage}</p>}
      </form>

      <div className="legal-acquisition-sections">
        <section className="legal-section">
          <div className="legal-section-head">
            <h2>領養</h2>
            <p>可以先從收容所、合作認養平台或數位認養服務查看目前開放認養的動物。</p>
          </div>
          <div className="legal-option-grid">
            {adoptionCards.map((card) => <AcquisitionOptionCard key={card.title} card={card} />)}
          </div>
        </section>

        <section className="legal-section">
          <div className="legal-section-head">
            <h2>購買</h2>
            <p>若選擇購買，請確認來源合法、資訊透明，並了解動物來源、健康紀錄與後續照顧責任。</p>
          </div>
          <div className="legal-option-grid">
            {purchaseCards.map((card) => <AcquisitionOptionCard key={card.title} card={card} />)}
          </div>
        </section>
      </div>

      <p className="legal-acquisition-reminder">無論選擇領養或購買，都請確認來源合法，並保留相關文件與健康紀錄。</p>
      <div className="nav-buttons">
        <button className="secondary" type="button" onClick={onBack}>← 返回照顧準備總覽</button>
        <button className="primary" type="button" onClick={onReset}>重新開始 <span>→</span></button>
      </div>
    </div>
  );
}
