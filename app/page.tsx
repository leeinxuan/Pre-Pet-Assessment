"use client";

import { useMemo, useState } from "react";

type Answer = "ready" | "unsure" | "discuss";
type LawAnswer = "know" | "unsure";

type ProfilePhoto = { id: string; name: string; url: string; size: number };
type Profile = {
  age: string;
  role: string;
  roleOther: string;
  source: string;
  hoursAway: string;
  careHours: string;
  reasons: string[];
  reasonOther: string;
  experience: string;
  pastDog: string;
  pastCat: string;
  pastOther: string;
  currentDog: string;
  currentCat: string;
  currentOther: string;
  experienceNote: string;
  housing: string;
  landlordStatus: string;
  rooms: string[];
  roomOther: string;
  hasHousemates: boolean | null;
  family: string[];
  familyOther: string;
  housematesConsent: boolean;
  photos: ProfilePhoto[];
};

const initialProfile: Profile = {
  age: "", role: "", roleOther: "", source: "", hoursAway: "", careHours: "",
  reasons: [], reasonOther: "", experience: "", pastDog: "", pastCat: "", pastOther: "",
  currentDog: "", currentCat: "", currentOther: "", experienceNote: "", housing: "",
  landlordStatus: "", rooms: [], roomOther: "", hasHousemates: null, family: [], familyOther: "",
  housematesConsent: false, photos: [],
};

const stations = [
  ["01", "選擇夥伴"],
  ["02", "法規暖身"],
  ["03", "認識你"],
  ["04", "費用開箱"],
  ["05", "生活預演"],
  ["06", "準備房間"],
  ["07", "準備摘要"],
] as const;

const intros = [
  {
    eyebrow: "第一站 · 選擇夥伴",
    title: "先從你想一起生活的動物開始",
    body: "不同物種、不同品種，會遇到很不一樣的日常。選擇後，我們會替你換上相符的法規、花費與生活情境。",
    icon: "🐾",
    tip: "這不是承諾，隨時都能回來更換。",
  },
  {
    eyebrow: "第二站 · 法規暖身",
    title: "知道就往右，不清楚就往左",
    body: "不需要猜答案。把不確定的事情留下來，最後會變成你的查詢清單，也方便專業人員接著說明。",
    icon: "↔",
    tip: "選「不太清楚」不會扣分。",
  },
  {
    eyebrow: "第三站 · 認識你",
    title: "把真實生活帶進這場預演",
    body: "住家、時間與同住者會改變照顧安排。請用你現在的狀態回答，不必填成理想中的自己。",
    icon: "⌂",
    tip: "資料只用來產生這次的準備摘要。",
  },
  {
    eyebrow: "第四站 · 費用開箱",
    title: "先猜，再一層一層打開真實花費",
    body: "填下你原本預計準備的金額，再依序打開初期、每月、每年與風險費用。小豬會幫你看見資金的變化。",
    icon: "🐷",
    tip: "金額是柴犬示範值，實際仍依地區與個體調整。",
  },
  {
    eyebrow: "第五站 · 生活預演",
    title: "一起走過九個可能發生的日常",
    body: "每一幕都對應一個重要的飼養面向。沒有標準答案，請選最接近你真的會做的事，也可以留下一句想法。",
    icon: "☁",
    tip: "慢一點想，這正是這段體驗的目的。",
  },
  {
    eyebrow: "第六站 · 準備房間",
    title: "先把環境準備好，再把動物帶回家",
    body: "把已經備妥的物品拖進房間，或用點擊加入；還沒準備也沒關係，它們會自動留在待辦清單。",
    icon: "📦",
    tip: "先環境、後動物，是降低匆忙決定的重要一步。",
  },
  {
    eyebrow: "最後一站 · 準備摘要",
    title: "這不是判決書，是下一場對話的地圖",
    body: "綠色代表已經有方向，黃色代表還想確認，橘色代表值得優先討論。把它帶給獸醫、收容所或寵物店逐項聊聊。",
    icon: "✓",
    tip: "摘要不會顯示「適合」或「不適合飼養」。",
  },
];

const categories = [
  { id: "dog", label: "犬", icon: "🐕", active: true },
  { id: "cat", label: "貓", icon: "🐈", active: false },
  { id: "rabbit", label: "兔", icon: "🐇", active: false },
  { id: "bird", label: "鳥", icon: "🦜", active: false },
  { id: "reptile", label: "爬蟲", icon: "🦎", active: false },
  { id: "small", label: "小型哺乳", icon: "🐹", active: false },
];

const breeds = [
  { id: "chihuahua", label: "吉娃娃", icon: "🐕" },
  { id: "poodle", label: "貴賓犬", icon: "🐩" },
  { id: "shiba", label: "柴犬", icon: "🐕" },
  { id: "border", label: "邊境牧羊犬", icon: "🐕‍🦺" },
  { id: "labrador", label: "拉布拉多", icon: "🦮" },
];

const laws = [
  {
    title: "寵物登記",
    statement: "犬隻應植入晶片並辦理寵物登記",
    detail: "帶回家後先確認來源文件與登記資訊，並依規定完成飼主資料更新。",
  },
  {
    title: "公共場所",
    statement: "外出時需有人陪同，並採取適當防護",
    detail: "牽繩、運輸籠或其他防護方式，需依場所與犬隻狀況妥善使用。",
  },
  {
    title: "基本責任",
    statement: "飼主需提供適當飲食、環境與必要醫療",
    detail: "生病或受傷時應及時就醫，日常也需維持可活動、可休息的安全環境。",
  },
  {
    title: "棄養責任",
    statement: "棄養動物可能面臨行政處分",
    detail: "生活變動時，應先尋求合法轉養、行為或照護支援，不可任意棄置。",
  },
  {
    title: "五大自由",
    statement: "照顧包含免於飢渴、恐懼、病痛與不適",
    detail: "也要讓動物能表現自然行為；這些原則會一路出現在後面的情境裡。",
  },
  {
    title: "合法取得",
    statement: "取得前應確認合法來源與健康資訊",
    detail: "向收容所、合法業者或原飼主取得時，都應確認紀錄、晶片與交接文件。",
  },
];

const money = new Intl.NumberFormat("zh-TW");
const estimatedLifespan = 15;

const costBoxes = [
  { title: "初期準備", amount: 16800, unitLabel: "NT$ 16,800", formula: "一次性估算", icon: "📦", detail: "認養／來源、健檢、晶片、運輸籠、圍欄與基本用品" },
  { title: "每月日常", amount: 3600 * 12 * estimatedLifespan, unitLabel: "NT$ 3,600／月", formula: `3,600 × 12 個月 × ${estimatedLifespan} 年 ＝ NT$ ${money.format(3600 * 12 * estimatedLifespan)}`, icon: "🦴", detail: "飼料、清潔、驅蟲、消耗品與基礎美容" },
  { title: "每年固定", amount: 12800 * estimatedLifespan, unitLabel: "NT$ 12,800／年", formula: `12,800 × ${estimatedLifespan} 年 ＝ NT$ ${money.format(12800 * estimatedLifespan)}`, icon: "🩺", detail: "預防針、健康檢查、保健與用品汰換" },
  { title: "風險準備", amount: 50000, unitLabel: "NT$ 50,000", formula: "至少保留一筆緊急預備金", icon: "☂", detail: "急診、意外、慢性病、行為訓練或臨時照護" },
];

const scenarios = [
  {
    axis: "A1 物種認識與天性",
    when: "第一天晚上",
    title: "牠和想像中不一樣",
    body: "牠一直躲起來、不願靠近；你想抱抱牠時，牠低吼、咬人或退縮。",
    flag: "柴犬常有獨立、警戒與不喜歡被強迫碰觸的個體差異。",
    choices: ["先保持距離，觀察牠的訊號", "找訓練與行為資源再調整", "我還不確定能否接受這種互動"],
  },
  {
    axis: "A2 空間與環境條件",
    when: "飼養幾個月後",
    title: "環境失控時的應變",
    body: "高溫、潮濕或停電時，室內變得悶熱；牠開始焦躁、喘氣。",
    choices: ["已有降溫、備援與安全空間方案", "會先盤點設備與鄰近安置地點", "目前住家很難調整"],
  },
  {
    axis: "A3 飲食與食性",
    when: "到家第一週",
    title: "第一餐的落差",
    body: "牠對原本準備的飼料沒興趣，家人開始餵人類食物，腸胃也不太穩。",
    choices: ["會維持轉食紀錄並諮詢專業人員", "先停止混餵，重新查飲食需求", "我可能會一直換食物試試看"],
  },
  {
    axis: "A4 健康與醫療",
    when: "到家第二週",
    title: "看起來沒事，但好像不太對",
    body: "食慾下降、活動變少，外觀看不出明顯傷口；你不確定是否要就醫。",
    flag: "犬隻忍耐力可能讓症狀不明顯；異常持續時不宜只靠網路判斷。",
    choices: ["記錄症狀並聯絡獸醫評估", "先確認可就診的院所與交通", "會再多等幾天看看"],
  },
  {
    axis: "A5 行為、互動與家庭相處",
    when: "到家第一個月",
    title: "家人開始受不了",
    body: "牠吠叫、亂咬、護食或抓家具，家人的生活被打亂，開始抱怨。",
    choices: ["先管理環境並安排家人分工", "尋找正向訓練或行為協助", "我擔心家人會要求把牠送走"],
  },
  {
    axis: "A6 時間與生活型態",
    when: "日常生活開始後",
    title: "加班與照顧衝突",
    body: "你臨時加班到晚上九點，牠還沒散步、放風、吃飯或清理環境。",
    choices: ["已有家人、鄰居或照護備案", "會先建立臨時照顧名單", "目前只能讓牠繼續等"],
  },
  {
    axis: "A7 花費與經濟能力",
    when: "飼養幾年後",
    title: "突發支出",
    body: "牠需要檢查與進一步治療，這筆費用比你原本每月預算高很多。",
    choices: ["已有緊急預備金或保險規劃", "會先和院所討論分階段方案", "可能只能選最便宜的方式處理"],
  },
  {
    axis: "A8 飼養動機與可持續性",
    when: "飼養幾年後",
    title: "陪伴不是牠唯一的工作",
    body: "你期待牠改善情緒，但牠也會拒絕互動、生病、破壞或需要大量照顧。",
    choices: ["能接受牠不是隨時配合的陪伴者", "會重新確認期待與可投入的照顧", "若無法帶來快樂，我會很失望"],
  },
  {
    axis: "A9 法規、責任與合法取得",
    when: "接牠回家的當天",
    title: "來源文件還沒準備好",
    body: "對方說健康紀錄、晶片或來源文件之後再補，但希望你今天先把牠帶走。",
    flag: "無法確認合法來源與交接資料時，不要因為『已經到了』就勉強完成。",
    choices: ["暫緩交接，先補齊文件與紀錄", "請專業人員協助核對流程", "先帶走，之後再說"],
  },
];

// 顯示順序使用原始陣列索引，答案仍以原 A1～A9 索引儲存。
const scenarioOrder = [8, 0, 2, 3, 4, 5, 1, 6, 7] as const;

const roomItems = ["硬式運輸籠", "食物與飲水碗", "安全休息區", "門窗防逃措施", "清潔用品", "牽繩與名牌"];

const checklist = [
  "全家已經討論並同意飼養",
  "已確認租屋或社區飼養規定",
  "已拍下門窗、陽台與活動空間供討論",
  "已找到日常與急診可到達的動物醫院",
  "至少一位臨時照顧人願意協助",
  "已安排每日活動、餵食與清潔時段",
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [introOpen, setIntroOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [lawIndex, setLawIndex] = useState(0);
  const [lawAnswers, setLawAnswers] = useState<Record<number, LawAnswer>>({});
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [budget, setBudget] = useState(80000);
  const [costIndex, setCostIndex] = useState(-1);
  const [scenarioIndex, setScenarioIndex] = useState<number>(scenarioOrder[0]);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<number, { answer: Answer; note: string }>>({});
  const [note, setNote] = useState("");
  const [roomReady, setRoomReady] = useState<string[]>([]);
  const [checked, setChecked] = useState<string[]>([]);

  const openedCosts = costIndex < 0 ? [] : costBoxes.slice(0, costIndex + 1);
  const spent = openedCosts.reduce((sum, item) => sum + item.amount, 0);
  const balance = budget - spent;

  const focusItems = useMemo(() => {
    const lawFocus = laws
      .map((law, index) => ({ law, answer: lawAnswers[index] }))
      .filter((item) => item.answer === "unsure")
      .map((item) => `法規確認：${item.law.title}`);
    const lifeFocus = scenarioOrder
      .map((itemIndex) => ({ scene: scenarios[itemIndex], answer: scenarioAnswers[itemIndex]?.answer }))
      .filter((item) => item.answer && item.answer !== "ready")
      .map((item) => `${item.scene.when}：${item.scene.title}`);
    return [...lawFocus, ...lifeFocus];
  }, [lawAnswers, scenarioAnswers]);

  function goTo(next: number) {
    setStep(next);
    setIntroOpen(next > 0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function answerLaw(answer: LawAnswer) {
    setLawAnswers((current) => ({ ...current, [lawIndex]: answer }));
    if (lawIndex < laws.length - 1) setLawIndex((value) => value + 1);
  }

  function answerScenario(answer: Answer) {
    setScenarioAnswers((current) => ({ ...current, [scenarioIndex]: { answer, note } }));
    setNote("");
    const displayIndex = scenarioOrder.indexOf(scenarioIndex as typeof scenarioOrder[number]);
    if (displayIndex < scenarioOrder.length - 1) setScenarioIndex(scenarioOrder[displayIndex + 1]);
  }

  function addRoomItem(item: string) {
    setRoomReady((current) => current.includes(item) ? current : [...current, item]);
  }

  function toggleCheck(item: string) {
    setChecked((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  }

  function clearJourneyData() {
    setCategory("");
    setBreed("");
    profile.photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    setProfile(initialProfile);
    setLawIndex(0);
    setLawAnswers({});
    setBudget(80000);
    setCostIndex(-1);
    setScenarioIndex(scenarioOrder[0]);
    setScenarioAnswers({});
    setNote("");
    setRoomReady([]);
    setChecked([]);
  }

  function startFreshJourney() {
    clearJourneyData();
    setStep(1);
    setIntroOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetAll() {
    clearJourneyData();
    setStep(0);
    setIntroOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="app-shell">
      {step === 0 && <Welcome onStart={startFreshJourney} />}

      {step > 0 && !introOpen && (
        <div className="stage-layout">
          <aside className="station-rail" aria-label="體驗進度">
            {stations.map(([number, label], index) => (
              <button
                key={number}
                className={`${step === index + 1 ? "active" : ""} ${step > index + 1 ? "done" : ""}`}
                onClick={() => index + 1 <= step && goTo(index + 1)}
                disabled={index + 1 > step}
              >
                <span>{step > index + 1 ? "✓" : number}</span>
                <em>{label}</em>
              </button>
            ))}
          </aside>

          <section className="stage" aria-live="polite">
            {step === 1 && (
              <SpeciesStep
                category={category}
                breed={breed}
                onCategory={setCategory}
                onBreed={setBreed}
                onNext={() => goTo(2)}
              />
            )}

            {step === 2 && (
              <LawStep
                index={lawIndex}
                answers={lawAnswers}
                onIndex={setLawIndex}
                onAnswer={answerLaw}
                onBack={() => goTo(1)}
                onNext={() => goTo(3)}
              />
            )}

            {step === 3 && (
              <ProfileStep profile={profile} onChange={setProfile} onBack={() => goTo(2)} onNext={() => goTo(4)} />
            )}

            {step === 4 && (
              <CostStep
                budget={budget}
                onBudget={setBudget}
                costIndex={costIndex}
                onCostIndex={setCostIndex}
                balance={balance}
                spent={spent}
                onBack={() => goTo(3)}
                onNext={() => goTo(5)}
              />
            )}

            {step === 5 && (
              <ScenarioStep
                index={scenarioIndex}
                answers={scenarioAnswers}
                note={note}
                onNote={setNote}
                onIndex={(index) => {
                  setScenarioIndex(index);
                  setNote(scenarioAnswers[index]?.note ?? "");
                }}
                onAnswer={answerScenario}
                onBack={() => goTo(4)}
                onNext={() => goTo(6)}
              />
            )}

            {step === 6 && (
              <PrepStep
                ready={roomReady}
                checked={checked}
                onAdd={addRoomItem}
                onRemove={(item) => setRoomReady((current) => current.filter((value) => value !== item))}
                onToggle={toggleCheck}
                onBack={() => goTo(5)}
                onNext={() => goTo(7)}
              />
            )}

            {step === 7 && (
              <SummaryStep
                profile={profile}
                breed={breed}
                lawAnswers={lawAnswers}
                budget={budget}
                spent={spent}
                ready={roomReady}
                checked={checked}
                focusItems={focusItems}
                onBack={() => goTo(6)}
                onReset={resetAll}
              />
            )}
          </section>
        </div>
      )}

      {step > 0 && introOpen && (
        <section className="intro-screen">
          <div className="intro-orbit" aria-hidden="true"><span>{intros[step - 1].icon}</span></div>
          <p className="eyebrow">{intros[step - 1].eyebrow}</p>
          <h1>{intros[step - 1].title}</h1>
          <p className="intro-body">{intros[step - 1].body}</p>
          <div className="soft-note"><span>✦</span>{intros[step - 1].tip}</div>
          <button className="primary large" onClick={() => setIntroOpen(false)}>我準備好了 <span>→</span></button>
        </section>
      )}
    </main>
  );
}

function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <section className="welcome">
      <nav className="welcome-nav">
        <div className="brand static"><span className="brand-mark">慢</span><span>慢慢來，先想想</span></div>
        <span className="prototype-tag">飼養前生活預演</span>
      </nav>
      <div className="welcome-grid">
        <div className="hero-copy">
          <p className="eyebrow">給準飼主的一段慢速旅程</p>
          <h1>在把牠帶回家以前，<br /><span>先一起生活一次。</span></h1>
          <p className="hero-lead">這不是適不適合的測驗，而是一場約 10 分鐘的生活預演。看見花費、責任、意外與準備，也把還不確定的地方帶去好好問。</p>
          <div className="hero-actions">
            <button className="primary large" onClick={onStart}>開始生活預演 <span>→</span></button>
            <span className="time-pill">◷ 約 10–15 分鐘</span>
          </div>
          <div className="trust-line"><span>不評分</span><span>不貼標籤</span><span>可隨時停下</span></div>
        </div>
        <div className="hero-scene" aria-label="一個人與柴犬在家中保持舒適距離、安靜相處的插畫">
          <img src="/illustrations/hero-life-preview.png" alt="準飼主與柴犬在溫暖的居家空間互相觀察" />
          <div className="thought">準備，不必一次到位<br /><b>但可以先想清楚。</b></div>
        </div>
      </div>
      <div className="journey-map">
        {stations.map(([number, label], index) => <div key={number}><span>{number}</span><p>{label}</p>{index < stations.length - 1 && <i>···</i>}</div>)}
      </div>
    </section>
  );
}

function StepHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <div className="step-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{body}</p></div>;
}

function NavButtons({ onBack, onNext, nextLabel = "繼續下一站", disabled = false }: { onBack: () => void; onNext: () => void; nextLabel?: string; disabled?: boolean }) {
  return <div className="nav-buttons"><button className="secondary" onClick={onBack}>← 返回</button><button className="primary" onClick={onNext} disabled={disabled}>{nextLabel} <span>→</span></button></div>;
}

function SpeciesStep({ category, breed, onCategory, onBreed, onNext }: { category: string; breed: string; onCategory: (value: string) => void; onBreed: (value: string) => void; onNext: () => void }) {
  const [selectionPage, setSelectionPage] = useState<"species" | "breed">("species");
  const selectedCategory = categories.find((item) => item.id === category);

  function chooseCategory(id: string) {
    onCategory(id);
    onBreed("");
    setSelectionPage("breed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="content-wrap partner-picker">
      <div className="partner-progress" aria-label={`選擇夥伴第 ${selectionPage === "species" ? 1 : 2} 步，共 2 步`}>
        <span className="active"><i>1</i>選擇物種</span>
        <b aria-hidden="true" />
        <span className={selectionPage === "breed" ? "active" : ""}><i>2</i>選擇品種</span>
      </div>

      {selectionPage === "species" ? (
        <section className="partner-selection-page" key="species">
          <StepHeading eyebrow="01 · 選擇夥伴" title="你想和哪一種動物生活？" body="先選擇物種，我們會在下一頁帶你挑選目前最感興趣的品種。" />
          <div className="category-grid species-page-grid">
            {categories.map((item) => (
              <button
                key={item.id}
                className={category === item.id ? "selected" : ""}
                onClick={() => item.active && chooseCategory(item.id)}
                disabled={!item.active}
                aria-label={item.active ? `選擇${item.label}` : `${item.label}，陸續開放`}
              >
                <span>{item.icon}</span>
                <b>{item.label}</b>
                {!item.active && <small>陸續開放</small>}
                {item.active && <small className="available-hint">點擊選擇</small>}
              </button>
            ))}
          </div>
          <p className="click-hint">點選物種後，將前往品種選擇頁</p>
        </section>
      ) : (
        <section className="partner-selection-page" key="breed">
          <StepHeading eyebrow={`01 · 選擇夥伴 · ${selectedCategory?.label ?? "犬"}`} title="選擇你想飼養的品種" body="挑選一個目前最感興趣的品種，接下來的評估會以它的常見照護需求為主。" />
          <div className="breed-row breed-page-grid">
            {breeds.map((item) => (
              <button key={item.id} className={breed === item.id ? "selected" : ""} onClick={() => onBreed(item.id)} aria-pressed={breed === item.id}>
                <span>{item.icon}</span>
                <b>{item.label}</b>
                {breed === item.id && <i>✓</i>}
              </button>
            ))}
          </div>
          {breed ? (
            <div className="selection-note"><span>{selectedCategory?.icon ?? "🐕"}</span><div><b>你選擇了：{breeds.find((item) => item.id === breed)?.label}</b><p>你可以更換品種，確認後再繼續下一站。</p></div></div>
          ) : (
            <p className="breed-required-hint">請先點選一個品種，再繼續下一站。</p>
          )}
          <NavButtons onBack={() => setSelectionPage("species")} onNext={onNext} disabled={!breed} />
        </section>
      )}
    </div>
  );
}

function LawStep({ index, answers, onIndex, onAnswer, onBack, onNext }: { index: number; answers: Record<number, LawAnswer>; onIndex: (value: number) => void; onAnswer: (value: LawAnswer) => void; onBack: () => void; onNext: () => void }) {
  const item = laws[index];
  const complete = Object.keys(answers).length === laws.length;
  const [swipeMotion, setSwipeMotion] = useState<LawAnswer | null>(null);

  function choose(answer: LawAnswer) {
    if (swipeMotion) return;
    setSwipeMotion(answer);
    window.setTimeout(() => {
      onAnswer(answer);
      setSwipeMotion(null);
    }, 320);
  }

  return (
    <div className="content-wrap compact">
      <StepHeading eyebrow="02 · 法規暖身" title="哪些你已經知道？" body="誠實留下不熟悉的項目，最後會自動整理成待確認的法規清單。" />
      <div className="mini-progress"><span style={{ width: `${((index + 1) / laws.length) * 100}%` }} /><em>{index + 1} / {laws.length}</em></div>
      <div className="swipe-zone">
        <button className="swipe-choice unsure" onClick={() => choose("unsure")} disabled={Boolean(swipeMotion)}><span>←</span><b>不太清楚</b><small>留到摘要確認</small></button>
        <article className={`law-card ${swipeMotion === "unsure" ? "swipe-left" : ""} ${swipeMotion === "know" ? "swipe-right" : ""}`}>
          <p>{String(index + 1).padStart(2, "0")}</p>
          <span>{item.title}</span>
          <h2>{item.statement}</h2>
          <div><b>小提醒</b>{item.detail}</div>
          {answers[index] && <em className={`answered ${answers[index]}`}>{answers[index] === "know" ? "已標記：知道" : "已標記：不太清楚"}</em>}
        </article>
        <button className="swipe-choice know" onClick={() => choose("know")} disabled={Boolean(swipeMotion)}><span>→</span><b>我知道</b><small>保留為已了解</small></button>
      </div>
      <div className="dot-nav">{laws.map((_, itemIndex) => <button key={itemIndex} className={`${itemIndex === index ? "active" : ""} ${answers[itemIndex] ? "filled" : ""}`} onClick={() => onIndex(itemIndex)} aria-label={`前往第 ${itemIndex + 1} 題`} />)}</div>
      <NavButtons onBack={onBack} onNext={onNext} disabled={!complete} nextLabel={complete ? "整理好了，繼續" : `還有 ${laws.length - Object.keys(answers).length} 題`} />
    </div>
  );
}

function ProfileStep({ profile, onChange, onBack, onNext }: { profile: Profile; onChange: (value: Profile) => void; onBack: () => void; onNext: () => void }) {
  const [page, setPage] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const pageTitles = ["基本資料", "取得方式", "飼養原因", "飼養經驗", "居住與家庭環境"];
  const update = <K extends keyof Profile>(key: K, value: Profile[K]) => onChange({ ...profile, [key]: value });
  const clampNumber = (raw: string, max: number) => raw === "" ? "" : String(Math.min(max, Math.max(0, Number(raw.replace(/\D/g, "")) || 0)));

  function toggleList(key: "reasons" | "rooms" | "family", value: string) {
    const current = profile[key];
    if (key === "family") {
      if (value === "無") update(key, current.includes("無") ? [] : ["無"]);
      else update(key, current.includes(value) ? current.filter((item) => item !== value) : [...current.filter((item) => item !== "無"), value]);
      return;
    }
    update(key, current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  function validate(currentPage: number) {
    const nextErrors: Record<string, string> = {};
    if (currentPage === 0) {
      const age = Number(profile.age);
      if (!profile.age || !Number.isInteger(age) || age < 1 || age > 120) nextErrors.age = "請輸入 1～120 歲的正整數。";
      if (!profile.role) nextErrors.role = "請選擇目前身分。";
      if (profile.role === "其他" && !profile.roleOther.trim()) nextErrors.roleOther = "請填寫其他身分。";
    }
    if (currentPage === 1 && !profile.source) nextErrors.source = "請選擇預計取得方式。";
    if (currentPage === 2) {
      if (!profile.reasons.length) nextErrors.reasons = "請至少選擇一項飼養原因。";
      if (profile.reasons.includes("其他") && !profile.reasonOther.trim()) nextErrors.reasonOther = "請填寫其他飼養原因。";
    }
    if (currentPage === 3 && !profile.experience) nextErrors.experience = "請選擇飼養經驗。";
    if (currentPage === 4) {
      if (!profile.housing) nextErrors.housing = "請選擇居住條件。";
      if (profile.housing === "租屋" && !profile.landlordStatus) nextErrors.landlordStatus = "請確認房東狀態。";
      if (!profile.rooms.length) nextErrors.rooms = "請至少選擇一個活動空間。";
      if (profile.rooms.includes("其他") && !profile.roomOther.trim()) nextErrors.roomOther = "請填寫其他活動空間。";
      if (profile.hasHousemates === null) nextErrors.hasHousemates = "請選擇是否有同住家人。";
      if (profile.hasHousemates === true) {
        if (!profile.family.length) nextErrors.family = "請至少選擇一種同住家人狀況。";
        if (profile.family.includes("其他") && !profile.familyOther.trim()) nextErrors.familyOther = "請填寫其他同住家人。";
        if (!profile.housematesConsent) nextErrors.housematesConsent = "請確認所有同住家人知情並同意飼養。";
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goForward() {
    if (!validate(page)) return;
    if (page < 4) {
      setPage((value) => value + 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else onNext();
  }

  function goBack() {
    setErrors({});
    if (page > 0) {
      setPage((value) => value - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else onBack();
  }

  function addPhotos(files: FileList | null) {
    if (!files) return;
    const available = 5 - profile.photos.length;
    const incoming = Array.from(files);
    const valid = incoming.filter((file) => file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024).slice(0, available);
    const nextPhotos = valid.map((file, index) => ({ id: `${Date.now()}-${index}-${file.name}`, name: file.name, size: file.size, url: URL.createObjectURL(file) }));
    update("photos", [...profile.photos, ...nextPhotos]);
    if (incoming.some((file) => !file.type.startsWith("image/") || file.size > 10 * 1024 * 1024)) setErrors((current) => ({ ...current, photos: "僅接受圖片格式，且每張不可超過 10 MB。" }));
    else if (incoming.length > available) setErrors((current) => ({ ...current, photos: "最多可上傳 5 張照片。" }));
    else setErrors((current) => { const next = { ...current }; delete next.photos; return next; });
  }

  function removePhoto(id: string) {
    const photo = profile.photos.find((item) => item.id === id);
    if (photo) URL.revokeObjectURL(photo.url);
    update("photos", profile.photos.filter((item) => item.id !== id));
  }

  const optionButton = (value: string, selected: boolean, action: () => void, icon?: string) => (
    <button key={value} type="button" className={`profile-option ${selected ? "selected" : ""}`} aria-pressed={selected} onClick={action} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); action(); } }}>
      {selected && <i aria-hidden="true">✓</i>}{icon && <span aria-hidden="true">{icon}</span>}<b>{value}</b><small>{selected ? "已選擇" : "點擊選擇"}</small>
    </button>
  );

  return (
    <div className="content-wrap profile-wizard">
      <div className="profile-wizard-head">
        <div><p className="eyebrow">第三部分｜認識你</p><h1>{pageTitles[page]}</h1><p>沒有理想答案，請依照你現在的生活狀況填寫。</p></div>
        <b>{page + 1} / 5</b>
      </div>
      <div className="profile-stepper" aria-label={`第三部分第 ${page + 1} 步，共 5 步`}>{pageTitles.map((title, index) => <span key={title} className={`${index === page ? "active" : ""} ${index < page ? "done" : ""}`}><i>{index < page ? "✓" : index + 1}</i><em>{title}</em></span>)}</div>

      <section className="profile-panel" key={page}>
        {page === 0 && <>
          <div className="inline-number-field"><label htmlFor="profile-age">年齡</label><input id="profile-age" type="number" inputMode="numeric" min="1" max="120" placeholder="例：20" value={profile.age} aria-invalid={Boolean(errors.age)} onChange={(event) => update("age", clampNumber(event.target.value, 120))} /><span>歲</span></div>
          {errors.age && <p className="field-error">{errors.age}</p>}
          <fieldset><legend>身分（單選）</legend><div className="identity-options">{[["學生", "▣"], ["上班族", "♟"], ["退休", "◎"], ["其他", "•••"]].map(([value, icon]) => <div key={value}>{optionButton(value, profile.role === value, () => update("role", value), icon)}{value === "其他" && <input aria-label="其他身分" placeholder="請填寫身分" disabled={profile.role !== "其他"} value={profile.roleOther} onChange={(event) => update("roleOther", event.target.value)} />}</div>)}</div>{errors.role && <p className="field-error">{errors.role}</p>}{errors.roleOther && <p className="field-error">{errors.roleOther}</p>}</fieldset>
          <fieldset><legend>時間</legend><div className="profile-time-grid"><label>每日離家時長<span>每日 <input type="number" inputMode="numeric" min="0" max="24" value={profile.hoursAway} onChange={(event) => update("hoursAway", clampNumber(event.target.value, 24))} /> 小時</span></label><label>可投入照護時間<span>每日 <input type="number" inputMode="numeric" min="0" max="24" value={profile.careHours} onChange={(event) => update("careHours", clampNumber(event.target.value, 24))} /> 小時</span></label></div></fieldset>
        </>}

        {page === 1 && <fieldset><legend>取得方式（單選）</legend><div className="source-options">{[["寵物店", "▰"], ["收容所", "⌂"], ["尚未決定", "?"]].map(([value, icon]) => optionButton(value, profile.source === value, () => update("source", value), icon))}</div>{errors.source && <p className="field-error">{errors.source}</p>}</fieldset>}

        {page === 2 && <fieldset><legend>飼養原因 <small>可複選</small></legend><div className="reason-options">{["陪伴與情緒支持", "喜愛動物", "孩子或孩子喜歡", "外在吸引", "看家守衛", "他人推薦", "其他"].map((value) => optionButton(value, profile.reasons.includes(value), () => toggleList("reasons", value)))}</div>{errors.reasons && <p className="field-error">{errors.reasons}</p>}<label className="conditional-input">其他飼養原因<input disabled={!profile.reasons.includes("其他")} placeholder="請說明其他原因" value={profile.reasonOther} onChange={(event) => update("reasonOther", event.target.value)} /></label>{errors.reasonOther && <p className="field-error">{errors.reasonOther}</p>}</fieldset>}

        {page === 3 && <fieldset><legend>飼養經驗（單選）</legend><div className="experience-options">{["首次飼養", "有飼養經驗"].map((value) => optionButton(value, profile.experience === value, () => update("experience", value)))}</div>{errors.experience && <p className="field-error">{errors.experience}</p>}<div className={`experience-detail ${profile.experience === "有飼養經驗" ? "open" : ""}`} aria-hidden={profile.experience !== "有飼養經驗"}><h2>過去與現在的飼養狀況</h2><div className="pet-count-row"><b>曾經飼養</b><label>狗<input type="number" min="0" max="99" disabled={profile.experience !== "有飼養經驗"} value={profile.pastDog} onChange={(event) => update("pastDog", clampNumber(event.target.value, 99))} />隻</label><label>貓<input type="number" min="0" max="99" disabled={profile.experience !== "有飼養經驗"} value={profile.pastCat} onChange={(event) => update("pastCat", clampNumber(event.target.value, 99))} />隻</label><label>其他<input disabled={profile.experience !== "有飼養經驗"} value={profile.pastOther} onChange={(event) => update("pastOther", event.target.value)} /></label></div><div className="pet-count-row"><b>目前家中有寵物</b><label>狗<input type="number" min="0" max="99" disabled={profile.experience !== "有飼養經驗"} value={profile.currentDog} onChange={(event) => update("currentDog", clampNumber(event.target.value, 99))} />隻</label><label>貓<input type="number" min="0" max="99" disabled={profile.experience !== "有飼養經驗"} value={profile.currentCat} onChange={(event) => update("currentCat", clampNumber(event.target.value, 99))} />隻</label><label>其他<input disabled={profile.experience !== "有飼養經驗"} value={profile.currentOther} onChange={(event) => update("currentOther", event.target.value)} /></label></div><label className="experience-note">其他飼養經驗分享<textarea disabled={profile.experience !== "有飼養經驗"} placeholder="可以補充照顧過的動物、時間或經驗" value={profile.experienceNote} onChange={(event) => update("experienceNote", event.target.value)} /></label></div></fieldset>}

        {page === 4 && <>
          <fieldset><legend>居住條件（單選）</legend><div className="housing-options">{["自有住宅", "租屋"].map((value) => optionButton(value, profile.housing === value, () => update("housing", value)))}</div>{errors.housing && <p className="field-error">{errors.housing}</p>}{profile.housing === "租屋" && <div className="landlord-options" role="group" aria-label="房東狀態">{["房東知情且同意我飼養", "尚未和房東確認"].map((value) => optionButton(value, profile.landlordStatus === value, () => update("landlordStatus", value)))}</div>}{errors.landlordStatus && <p className="field-error">{errors.landlordStatus}</p>}</fieldset>
          <fieldset><legend>寵物預計活動空間 <small>可複選</small></legend><div className="compact-options">{["戶外空間", "室內客廳", "房間", "其他"].map((value) => optionButton(value, profile.rooms.includes(value), () => toggleList("rooms", value)))}</div>{errors.rooms && <p className="field-error">{errors.rooms}</p>}<label className="conditional-input">其他活動空間<input disabled={!profile.rooms.includes("其他")} placeholder="請說明其他空間" value={profile.roomOther} onChange={(event) => update("roomOther", event.target.value)} /></label>{errors.roomOther && <p className="field-error">{errors.roomOther}</p>}</fieldset>
          <fieldset><legend>是否有同住家人？</legend><div className="housemate-presence-options">{optionButton("有", profile.hasHousemates === true, () => update("hasHousemates", true))}{optionButton("無", profile.hasHousemates === false, () => update("hasHousemates", false))}</div>{errors.hasHousemates && <p className="field-error">{errors.hasHousemates}</p>}{profile.hasHousemates === true && <div className="housemate-details"><h2>同住家人狀況 <small>可複選</small></h2><div className="compact-options family-options">{["幼童", "長者", "孕婦", "其他"].map((value) => optionButton(value, profile.family.includes(value), () => toggleList("family", value)))}</div>{errors.family && <p className="field-error">{errors.family}</p>}{profile.family.includes("其他") && <label className="conditional-input">其他同住家人<input placeholder="請說明其他同住家人" value={profile.familyOther} onChange={(event) => update("familyOther", event.target.value)} /></label>}{errors.familyOther && <p className="field-error">{errors.familyOther}</p>}<label className={`housemate-consent ${profile.housematesConsent ? "checked" : ""}`}><input type="checkbox" checked={profile.housematesConsent} onChange={(event) => update("housematesConsent", event.target.checked)} /><b>我已確認所有同住家人知情並同意飼養。</b></label>{errors.housematesConsent && <p className="field-error">{errors.housematesConsent}</p>}</div>}</fieldset>
          <fieldset><legend>居家空間照片 <small>最多 5 張，每張 10 MB</small></legend><label className="photo-dropzone" htmlFor="profile-photos" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); addPhotos(event.dataTransfer.files); }}><span aria-hidden="true">＋</span><b>共同為毛孩的安全把關</b><p>上傳未來的活動空間與窗戶防護照片</p><small>點擊選擇或拖曳圖片到這裡</small></label><input id="profile-photos" className="visually-hidden" type="file" accept="image/*" multiple onChange={(event) => { addPhotos(event.target.files); event.target.value = ""; }} />{errors.photos && <p className="field-error">{errors.photos}</p>}{profile.photos.length > 0 && <div className="photo-list">{profile.photos.map((photo) => <article key={photo.id}><img src={photo.url} alt={`${photo.name} 縮圖`} /><div><b>{photo.name}</b><small>{(photo.size / 1024 / 1024).toFixed(1)} MB</small></div><button type="button" onClick={() => removePhoto(photo.id)} aria-label={`刪除 ${photo.name}`}>刪除</button></article>)}</div>}</fieldset>
        </>}
      </section>

      <NavButtons onBack={goBack} onNext={goForward} nextLabel={page === 4 ? "完成認識你，繼續" : "下一步"} />
    </div>
  );
}

function CostStep({ budget, onBudget, costIndex, onCostIndex, balance, spent, onBack, onNext }: { budget: number; onBudget: (value: number) => void; costIndex: number; onCostIndex: (value: number) => void; balance: number; spent: number; onBack: () => void; onNext: () => void }) {
  return (
    <div className="content-wrap cost-page">
      <StepHeading eyebrow="04 · 費用開箱" title="你原本預計準備多少錢？" body="先留下直覺數字，再逐一打開柴犬常見的花費範圍。" />
      {costIndex < 0 ? (
        <div className="budget-entry">
          <div className="pig-visual"><img src="/illustrations/lifetime-costs.png" alt="柴犬、小豬撲滿、月曆與醫療準備用品" /><i>先猜一個數字，再打開終生花費</i></div>
          <label><span>我原本預計準備</span><div><b>NT$</b><input type="number" min="0" step="1000" value={budget} onChange={(event) => onBudget(Number(event.target.value))} /></div><small>不用查資料，填下你現在心中的預估就好。</small></label>
          <button className="primary" onClick={() => onCostIndex(0)}>開始打開費用盒 <span>→</span></button>
        </div>
      ) : (
        <>
          <div className="money-dashboard">
            <div className={`pig-bank ${balance < 0 ? "low" : ""}`}><img src="/illustrations/lifetime-costs.png" alt="小豬撲滿與柴犬的終生費用插畫" /><div><small>對照終生預估後</small><b>{balance < 0 ? "尚差" : "尚餘"} NT$ {money.format(Math.abs(balance))}</b><i>{balance < 0 ? "這不是失敗，而是需要分年規劃的終生費用差額" : "把還沒想到的花費也留進計畫裡"}</i></div></div>
            <div className="cost-meter"><span>原先心中預算 NT$ {money.format(budget)}</span><div><i style={{ width: `${Math.min((spent / Math.max(budget, 1)) * 100, 100)}%` }} /></div><b>已打開的終生預估 NT$ {money.format(spent)}</b><small>柴犬預估壽命以 {estimatedLifespan} 年計算</small></div>
          </div>
          <div className="cost-grid">
            {costBoxes.map((box, index) => <article key={box.title} className={`${index <= costIndex ? "open" : "locked"} ${index === costIndex ? "current" : ""}`}><span>{index <= costIndex ? box.icon : "?"}</span><small>{index + 1} / 4</small><h3>{box.title}</h3>{index <= costIndex ? <><b>{box.unitLabel}</b><strong>{box.formula}</strong><p>{box.detail}</p></> : <p>下一個費用盒</p>}</article>)}
          </div>
          <div className="cost-action">{costIndex < costBoxes.length - 1 ? <button className="primary" onClick={() => onCostIndex(costIndex + 1)}>打開下一個費用盒 <span>＋</span></button> : <div className="reframe"><span>✦</span><p><b>把缺口變成準備方向</b>你可以調整取得時間、建立預備金、詢問保險與醫療分期，而不是用一個數字判斷自己。</p></div>}</div>
        </>
      )}
      <NavButtons onBack={onBack} onNext={onNext} disabled={costIndex < costBoxes.length - 1} />
    </div>
  );
}

function ScenarioStep({ index, answers, note, onNote, onIndex, onAnswer, onBack, onNext }: { index: number; answers: Record<number, { answer: Answer; note: string }>; note: string; onNote: (value: string) => void; onIndex: (value: number) => void; onAnswer: (value: Answer) => void; onBack: () => void; onNext: () => void }) {
  const scene = scenarios[index];
  const displayIndex = scenarioOrder.indexOf(index as typeof scenarioOrder[number]);
  const complete = Object.keys(answers).length === scenarios.length;
  const choiceTypes: Answer[] = ["ready", "unsure", "discuss"];
  return (
    <div className="content-wrap scenario-page">
      <div className="scene-progress"><div><span style={{ width: `${((displayIndex + 1) / scenarios.length) * 100}%` }} /></div><p>{scene.when}</p><b>{displayIndex + 1} / 9</b></div>
      <article className="scene-card" key={index}>
        <div className="scene-copy"><h1>{scene.title}</h1><p>{scene.body}</p>{scene.flag && <div className="red-flag"><span>!</span><p><b>入手前紅旗卡</b>{scene.flag}</p></div>}</div>
        <div className={`scene-art scene-${index}`} aria-hidden="true"><div className="scene-sprite" /><p>{scene.when}</p></div>
      </article>
      <section className="reflection"><h2>如果是你，會怎麼做？</h2><div className="choice-grid">{scene.choices.map((choice, choiceIndex) => <button key={choice} className={answers[index]?.answer === choiceTypes[choiceIndex] ? "selected" : ""} onClick={() => onAnswer(choiceTypes[choiceIndex])}><span>{["我有方向", "我會先查清楚", "想找人討論"][choiceIndex]}</span><p>{choice}</p></button>)}</div><label><span>留一句給未來的自己（可略過）</span><textarea placeholder="我想先確認……" value={note} onChange={(event) => onNote(event.target.value)} /></label></section>
      <div className="scene-dots">{scenarioOrder.map((itemIndex, position) => <button key={itemIndex} className={`${itemIndex === index ? "active" : ""} ${answers[itemIndex] ? answers[itemIndex].answer : ""}`} onClick={() => onIndex(itemIndex)} aria-label={`前往第 ${position + 1} 個生活情境`}>{position + 1}</button>)}</div>
      <NavButtons onBack={onBack} onNext={onNext} disabled={!complete} nextLabel={complete ? "完成預演，去準備房間" : `還有 ${scenarios.length - Object.keys(answers).length} 幕`} />
    </div>
  );
}

function PrepStep({ ready, checked, onAdd, onRemove, onToggle, onBack, onNext }: { ready: string[]; checked: string[]; onAdd: (item: string) => void; onRemove: (item: string) => void; onToggle: (item: string) => void; onBack: () => void; onNext: () => void }) {
  const waiting = roomItems.filter((item) => !ready.includes(item));
  return (
    <div className="content-wrap prep-page">
      <StepHeading eyebrow="06 · 準備房間" title="把已經準備好的東西放進家裡" body="拖曳或點一下物品即可加入。沒放進去的項目，會自動出現在最後的待辦。" />
      <div className="prep-board">
        <div className="item-shelf"><h2>準備箱 <span>{waiting.length} 件待確認</span></h2><div>{waiting.map((item, index) => <button key={item} draggable onDragStart={(event) => event.dataTransfer.setData("text/plain", item)} onClick={() => onAdd(item)}><span>{["🧳", "🥣", "🛏️", "🚪", "🧼", "🦮"][roomItems.indexOf(item)]}</span><b>{item}</b><small>拖曳或點擊加入</small></button>)}</div>{waiting.length === 0 && <p className="empty-box">箱子空了，已加入所有示範物品 ✓</p>}</div>
        <div className="room" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); onAdd(event.dataTransfer.getData("text/plain")); }}><p>先把環境準備好，再把動物帶回家</p>{ready.map((item, index) => <button key={item} className={`placed item-${index}`} onClick={() => onRemove(item)} title="點擊移回準備箱"><span>{["🧳", "🥣", "🛏️", "🚪", "🧼", "🦮"][roomItems.indexOf(item)]}</span><b>{item}</b></button>)}</div>
      </div>
      <section className="checklist-card"><div><p className="eyebrow">收容所低標與家庭共識</p><h2>再確認幾件帶不進房間的準備</h2></div><div className="check-grid">{checklist.map((item) => <label key={item} className={checked.includes(item) ? "checked" : ""}><input type="checkbox" checked={checked.includes(item)} onChange={() => onToggle(item)} /><span>✓</span><p>{item}</p></label>)}</div></section>
      <div className="prep-reassure"><span>💡</span><p><b>還沒完成也可以繼續</b>這裡不是闖關。未勾選的項目會成為帶回家前的具體待辦。</p></div>
      <NavButtons onBack={onBack} onNext={onNext} nextLabel="產生我的準備摘要" />
    </div>
  );
}

function SummaryStep({ profile, breed, lawAnswers, budget, spent, ready, checked, focusItems, onBack, onReset }: { profile: Profile; breed: string; lawAnswers: Record<number, LawAnswer>; budget: number; spent: number; ready: string[]; checked: string[]; focusItems: string[]; onBack: () => void; onReset: () => void }) {
  const todos = [...roomItems.filter((item) => !ready.includes(item)), ...checklist.filter((item) => !checked.includes(item))];
  return (
    <div className="content-wrap summary-page">
      <div className="summary-title"><div><p className="eyebrow">07 · 我的飼養準備摘要</p><h1>你已經把衝動，<br />變成可以討論的準備。</h1><p>請帶著這份摘要，與獸醫、收容所或合法寵物店逐項確認。</p></div><div className="summary-pet"><span>🐕</span><b>我想飼養{breeds.find((item) => item.id === breed)?.label}</b><small>{profile.source}</small></div></div>
      <div className="status-legend"><span><i className="green" />已有方向</span><span><i className="yellow" />還要確認</span><span><i className="orange" />優先討論</span></div>
      <section className="summary-grid">
        <article className="summary-card profile-summary"><div className="card-head"><span>01</span><div><p>目前的生活</p><h2>關於準飼主</h2></div></div><dl><div><dt>年齡／身分</dt><dd>{profile.age || "未填"} 歲 · {profile.role === "其他" ? profile.roleOther : profile.role}</dd></div><div><dt>居住狀況</dt><dd>{profile.housing} · {profile.hasHousemates ? profile.family.join("、") : "無同住家人"}</dd></div><div><dt>每日時間</dt><dd>離家 {profile.hoursAway || "未填"} 小時／照顧 {profile.careHours || "未填"} 小時</dd></div><div><dt>飼養經驗</dt><dd>{profile.experience}</dd></div><div><dt>主要動機</dt><dd>{profile.reasons.join("、")}</dd></div></dl></article>
        <article className="summary-card money-summary"><div className="card-head"><span>02</span><div><p>費用預演</p><h2>終生費用對照</h2></div></div><div className="money-compare"><div><small>原先心中預估</small><b>NT$ {money.format(budget)}</b></div><span>→</span><div><small>{estimatedLifespan} 年終生預估</small><b>NT$ {money.format(spent)}</b></div></div><p className={budget - spent < 0 ? "orange-note" : "green-note"}>{budget - spent < 0 ? `終生預估尚有 NT$ ${money.format(spent - budget)} 的差額，建議拆成每月、每年與緊急預備金分別規劃。` : `目前保留 NT$ ${money.format(budget - spent)} 的彈性，可再確認醫療風險。`}</p></article>
        <article className="summary-card readiness"><div className="card-head"><span>03</span><div><p>已經準備</p><h2>可以延續的方向</h2></div></div><ul>{[...ready, ...checked].slice(0, 7).map((item) => <li key={item}><i className="green">✓</i>{item}</li>)}{ready.length + checked.length === 0 && <li><i className="yellow">?</i>目前還沒有勾選項目，可以從運輸籠開始。</li>}</ul></article>
        <article className="summary-card todo"><div className="card-head"><span>04</span><div><p>帶回家前</p><h2>下一步待辦</h2></div></div><ul>{todos.slice(0, 7).map((item) => <li key={item}><i className="yellow">!</i>{item}</li>)}{todos.length === 0 && <li><i className="green">✓</i>示範清單已全部確認，請再和專業人員核對。</li>}</ul></article>
        <article className="summary-card discuss"><div className="card-head"><span>05</span><div><p>給專業人員</p><h2>優先深入討論</h2></div></div>{focusItems.length ? <ul>{focusItems.slice(0, 8).map((item) => <li key={item}><i className="orange">●</i>{item}</li>)}</ul> : <p className="all-clear">目前沒有被標記的疑問；仍建議逐項確認品種需求與醫療安排。</p>}</article>
        <article className="summary-card law-summary"><div className="card-head"><span>06</span><div><p>法規暖身</p><h2>了解狀況</h2></div></div><div className="law-count"><div><b>{Object.values(lawAnswers).filter((value) => value === "know").length}</b><small>已了解</small></div><div><b>{Object.values(lawAnswers).filter((value) => value === "unsure").length}</b><small>待確認</small></div></div><p>請以主管機關最新公告與專業人員說明為準。</p></article>
      </section>
      <div className="summary-footer"><p><b>這份摘不判斷你是否適合飼養。</b><br />它只幫你把真正需要準備與討論的事情，放到衝動之前。</p><div><button className="secondary" onClick={onReset}>重新預演</button><button className="primary" onClick={() => window.print()}>列印／儲存摘要 <span>↗</span></button></div></div>
      <button className="text-back" onClick={onBack}>← 回去調整準備清單</button>
    </div>
  );
}
