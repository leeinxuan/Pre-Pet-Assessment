export type PetSourceSpecies = "犬" | "貓" | "兔" | "鳥" | "爬蟲" | "兩棲類" | "小型哺乳類" | "水族";

export type PetSource = {
  id: string;
  route: "adoption" | "purchase";
  name: string;
  url?: string;
  linkLabel?: string;
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
    id: "taiwan-adoption-map", route: "adoption", name: "台灣認養地圖", url: "https://www.meetpets.org.tw/", species: ["犬", "貓"], region: "地點不限", imageSrc: "/assets/acquisition/台灣認養地圖.jpg",
    oneLinePositioning: "聚合全台中途與救援組織的資訊，一個地方找到各地等待認養的狗貓。",
    suitableFor: ["想從有人照顧的中途認養。", "希望有更多動物個性資訊。", "地點彈性不限縣市。"],
    checksBeforeVisit: ["聯繫前確認刊登中途是否提供健康紀錄和疫苗證明。", "部分資訊可能未即時更新，直接聯繫確認動物現況。", "確認刊登來源與中途背景是否可信。"],
  },
  {
    id: "paws-life-stories", route: "adoption", name: "毛孩生活故事卡", url: "https://paws.ixda.tw/", species: ["犬"], region: "台南", imageSrc: "/assets/acquisition/paws-life-village.jpg",
    oneLinePositioning: "結合動物故事與認養資訊的媒合入口，適合想多了解動物個性再決定的人。",
    suitableFor: ["希望先閱讀動物的生活故事和照顧紀錄。", "想先了解動物個性，再決定是否聯繫。"],
    checksBeforeVisit: ["確認來源是公立收容所或個人中途。", "平台本身不負責動物健康保障，需向刊登方直接索取醫療紀錄。"],
  },
  {
    id: "taiwan-rabbit-saving-association", route: "adoption", name: "愛兔協會", url: "https://www.loverabbit.org/", species: ["兔"], region: "台北、高雄", imageSrc: "/assets/acquisition/台灣愛兔協會.jpeg",
    oneLinePositioning: "專門協助棄養、傷病與需要安置的兔子，認養前可以先了解兔子的個性、健康狀況與照護需求。",
    suitableFor: ["第一次養兔子，希望有人提供飼養觀念與認養前評估。", "不指定品種，願意認識不同年齡、個性或照護需求的兔子。", "願意先準備合適空間，再決定是否認養。"],
    checksBeforeVisit: ["先確認認養申請、參訪與配對是否需要預約。", "詢問兔子的結紮、健康檢查、既往病史與目前照護需求。", "確認家中是否已準備足夠活動空間、圍欄、牧草與安全環境。"],
  },
  {
    id: "etipets", route: "purchase", name: "東森寵物", url: "https://www.etipets.com/", species: ["犬", "貓", "小型哺乳類", "水族"], region: "地點不限", imageSrc: "/assets/acquisition/東森寵物.jpeg",
    oneLinePositioning: "連鎖寵物通路，用品、犬貓服務、水族與小寵商品集中在同一個購買管道，適合先比較用品與門市服務。",
    suitableFor: ["已經確定飼養物種，想一次準備飼料、用品或日常耗材。", "想比較實體門市服務與線上商品。", "需要犬貓、美容、水族或小寵相關用品與服務資訊。"],
    checksBeforeVisit: ["先確認欲購買的用品或服務是否由附近門市提供。", "若涉及活體動物，主動詢問來源、健康紀錄與相關證明。", "購買前確認飼養空間、設備與後續照護成本都已準備完成。"],
  },
  {
    id: "petsmall", route: "purchase", name: "魚中魚", url: "https://www.petsmall.com.tw/petsmall/index.php", species: ["犬", "貓", "水族", "爬蟲"], region: "地點不限", imageSrc: "/assets/acquisition/魚中魚.jpeg",
    oneLinePositioning: "同時提供水族與寵物相關服務的連鎖通路，適合需要比較水族設備、寵物用品與實體門市資源的人。",
    suitableFor: ["想先實際查看魚缸、過濾設備、飼料或環境用品。", "同時需要水族與一般寵物用品。", "希望先到門市了解不同設備的尺寸與用途。"],
    checksBeforeVisit: ["先確認附近門市是否有你需要的物種用品或設備。", "若考慮購買活體，主動詢問來源、到店時間、健康紀錄與基本照護資訊。", "確認設備尺寸、溫度控制、飼養空間與後續耗材成本是否適合家中條件。"],
  },
  {
    id: "sailor-reptile", route: "purchase", name: "水手兩棲爬蟲・異寵", url: "https://www.facebook.com/sailoreptile/?locale=zh_TW", linkLabel: "前往 Facebook", species: ["爬蟲", "兩棲類", "小型哺乳類"], region: "台北、新北、桃園、台中、彰化、台南、高雄", imageSrc: "/assets/acquisition/水手兩棲爬蟲館.jpeg",
    oneLinePositioning: "專注兩棲、爬蟲與異寵的資訊來源，適合已經知道自己要飼養哪一類特殊寵物，並願意先確認設備與照護條件的人。",
    suitableFor: ["想飼養爬蟲、兩棲類或其他特殊寵物。", "願意先研究溫度、濕度、照明、食物與活動空間。", "能自行確認物種是否合法、來源是否清楚，以及後續醫療資源。"],
    checksBeforeVisit: ["直接詢問動物來源、出生資訊、健康狀況與目前飲食。", "確認物種是否為合法可飼養物種，並了解需要的證明或法規。", "購買前確認家中已備妥合適飼養箱、溫濕度設備、燈具與食物來源。"],
  },
];
