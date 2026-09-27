export type OfficialPetSource = {
  id: "ministry-adoption" | "legal-pet-businesses";
  category: "認養" | "購買前查核";
  title: string;
  description: string;
  url: string;
  linkLabel: string;
};

/** 取得寵物頁僅提供農業部寵物登記管理資訊網的官方查詢入口。 */
export const officialPetSources: OfficialPetSource[] = [
  {
    id: "ministry-adoption",
    category: "認養",
    title: "認養：全國動物收容管理系統",
    description: "前往官方收容資訊，查看待認養動物與認養流程。",
    url: "https://www.pet.gov.tw/AnimalApp/AnnounceMent.aspx?PageType=Adopt",
    linkLabel: "查看待認養動物",
  },
  {
    id: "legal-pet-businesses",
    category: "購買前查核",
    title: "購買前，先查詢合法寵物業者",
    description: "若你決定透過購買方式取得寵物，建議先查核業者是否具備合法許可與可追溯的來源資訊，再做決定。",
    url: "https://www.pet.gov.tw/Web/BusinessList.aspx",
    linkLabel: "查詢合法寵物業者",
  },
];
