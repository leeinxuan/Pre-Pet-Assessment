export type PetSourceSpecies = "犬" | "貓" | "兔" | "鳥" | "爬蟲" | "小型哺乳類";

export type PetSource = {
  id: string;
  route: "adoption" | "purchase";
  name: string;
  url?: string;
  species: PetSourceSpecies[];
  region: string;
  oneLinePositioning: string;
  suitableFor: string[];
  checksBeforeVisit: string[];
  imageSrc?: string;
};

export const petSources: PetSource[] = [
  {
    id: "ministry-adoption", route: "adoption", name: "全國動物收容管理系統", url: "https://www.pet.gov.tw/AnimalApp/AnnounceMent.aspx?PageType=Adopt", species: ["犬", "貓", "兔"], region: "地點不限",
    oneLinePositioning: "全台公立收容所的動物統一登錄在這裡，領養即救命，是最透明的來源。",
    suitableFor: ["不指定品種或年齡。", "願意接受成犬貓或有過去經歷的動物。", "第一次養也可以。"],
    checksBeforeVisit: ["動物是否已完成疫苗和絕育。", "收容所能否告知動物入所前的背景。", "領養流程是否需要事先預約或等待配對。"],
  },
  {
    id: "taiwan-adoption-map", route: "adoption", name: "台灣認養地圖", url: "https://www.meetpets.org.tw/", species: ["犬", "貓"], region: "地點不限",
    oneLinePositioning: "聚合全台中途與救援組織的資訊，一個地方找到各地等待認養的狗貓。",
    suitableFor: ["想從有人照顧的中途認養。", "希望有更多動物個性資訊。", "地點彈性不限縣市。"],
    checksBeforeVisit: ["聯繫前確認刊登中途是否提供健康紀錄和疫苗證明。", "部分資訊可能未即時更新，直接聯繫確認動物現況。", "確認刊登來源與中途背景是否可信。"],
  },
  {
    id: "paws-life-stories", route: "adoption", name: "毛孩生活故事卡", url: "https://paws.ixda.tw/", species: ["犬", "貓", "兔"], region: "台南", imageSrc: "/assets/acquisition/paws-life-village.jpg",
    oneLinePositioning: "結合動物故事與認養資訊的媒合入口，適合想多了解動物個性再決定的人。",
    suitableFor: ["希望先閱讀動物的生活故事和照顧紀錄。", "想先了解動物個性，再決定是否聯繫。"],
    checksBeforeVisit: ["確認來源是公立收容所或個人中途。", "平台本身不負責動物健康保障，需向刊登方直接索取醫療紀錄。"],
  },
  {
    id: "species-rescue", route: "adoption", name: "物種專屬救援組織", species: ["兔", "鳥"], region: "地點不限",
    oneLinePositioning: "由物種飼養者自行組成，認養的動物通常有完整個性評估，中途也會持續提供飼養諮詢。",
    suitableFor: ["第一次養兔子或鳥，需要飼養指導支援。", "想確認動物健康與行為後再決定。"],
    checksBeforeVisit: ["認養條件通常較嚴格，可能需要填審核表、家訪或試養期。", "確認中途是否會在認養後提供諮詢支援。"],
  },
  {
    id: "foster-facebook-groups", route: "adoption", name: "個人中途 FB 社團", species: ["兔", "鳥", "爬蟲", "小型哺乳類"], region: "地點不限",
    oneLinePositioning: "門檻最低、物種最多元，但品質完全依賴個別中途主的責任心。",
    suitableFor: ["要找比較少見的物種，例如爬蟲或特殊小哺。", "已有飼養經驗。", "能自行判斷中途資訊是否可信。"],
    checksBeforeVisit: ["是否提供健康紀錄和寄生蟲驅除證明。", "中途是否了解這個物種的基本需求。", "直接詢問動物的生活習慣和已知問題。"],
  },
  {
    id: "registered-breeder", route: "purchase", name: "農業部登記繁殖場", species: ["犬", "貓"], region: "地點不限",
    oneLinePositioning: "合法登記的繁殖場有政府查核，是相對透明的購買管道，但仍需主動索取文件。",
    suitableFor: ["需要特定品種犬貓。", "願意花時間做來源查核。"],
    checksBeforeVisit: ["要求查看農業部繁殖場登記證。", "確認種公母的健康紀錄。", "拒絕不讓你看繁殖環境的業者。"],
  },
  {
    id: "legal-pet-shop", route: "purchase", name: "合法寵物店", species: ["犬", "貓", "兔", "鳥", "爬蟲", "小型哺乳類"], region: "地點不限",
    oneLinePositioning: "方便取得多種動物，但來源透明度差異很大，需要主動查核。",
    suitableFor: ["已清楚知道自己要什麼物種。", "有能力辨別店家是否能提供完整來源資訊。"],
    checksBeforeVisit: ["詢問動物來源，例如繁殖場或進口商。", "索取疫苗紀錄。", "拒絕無法說明來源的店家，並確認是否提供售後健康保障期。"],
  },
];
