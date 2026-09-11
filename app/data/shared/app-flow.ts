import type { CareMember, Profile } from "../../game-types";

export const stations = [
  ["01", "選擇寵物", "遇見想領養的牠"],
  ["02", "飼養前準備", "為牠準備一個家"],
  ["03", "飼養生活", "從接回家到長期陪伴"],
  ["04", "飼養觀念回顧", "把練習整理成清單"],
  ["05", "取得寵物", "銜接合法領養與購買資訊"],
] as const;

export const intros = [
  {
    title: "\u9078\u64c7\u5925\u4f34",
    body: "\u5148\u9078\u5b9a\u7269\u7a2e\u8207\u54c1\u7a2e\uff0c\u7406\u89e3\u7260\u672a\u4f86\u53ef\u80fd\u9700\u8981\u7684\u751f\u6d3b\u7bc0\u594f\u3002",
    icon: "pet",
    tip: "",
  },
  {
    title: "飼養前準備",
    body: "\u6574\u7406\u751f\u6d3b\u7a7a\u9593\u3001\u63a5\u56de\u7528\u54c1\u8207\u57fa\u672c\u7167\u9867\u5b89\u6392\uff0c\u8b93\u5230\u5bb6\u7b2c\u4e00\u5929\u66f4\u5b89\u7a69\u3002",
    icon: "home",
    tip: "",
  },
  {
    title: "\u63a5\u7260\u56de\u5bb6",
    body: "\u5f9e\u5b89\u5168\u642d\u8eca\u5230\u7b2c\u4e00\u6b21\u9032\u9580\uff0c\u7528\u7a69\u5b9a\u7684\u6b65\u8abf\u966a\u7260\u8a8d\u8b58\u65b0\u74b0\u5883\u3002",
    icon: "car",
    tip: "",
  },
  {
    title: "\u65e5\u5e38\u7167\u8b77",
    body: "\u628a\u98f2\u98df\u3001\u6563\u6b65\u3001\u6e05\u6f54\u8207\u4e92\u52d5\uff0c\u6162\u6162\u8b8a\u6210\u6bcf\u5929\u505a\u5f97\u5230\u7684\u7bc0\u594f\u3002",
    icon: "sun",
    tip: "",
  },
  {
    title: "\u5065\u5eb7\u89c0\u5bdf",
    body: "\u7576\u98df\u617e\u3001\u7cbe\u795e\u6216\u8eab\u9ad4\u72c0\u6cc1\u6539\u8b8a\u6642\uff0c\u5b78\u6703\u8a18\u9304\u4e26\u627e\u5c08\u696d\u5354\u52a9\u3002",
    icon: "health",
    tip: "",
  },
  {
    title: "\u751f\u6d3b\u8b8a\u5316",
    body: "\u5fd9\u788c\u3001\u642c\u5bb6\u6216\u9ad8\u9f61\u968e\u6bb5\u4f86\u81e8\u6642\uff0c\u91cd\u65b0\u5b89\u6392\u7167\u9867\u8207\u652f\u63f4\u3002",
    icon: "change",
    tip: "",
  },
  {
    title: "\u8cc7\u6599\u88dc\u5145",
    body: "\u628a\u4f60\u7684\u751f\u6d3b\u689d\u4ef6\u88dc\u9f4a\uff0c\u8b93\u63d0\u9192\u66f4\u8cbc\u8fd1\u771f\u5be6\u7167\u9867\u72c0\u6cc1\u3002",
    icon: "note",
    tip: "",
  },
  {
    title: "\u7167\u9867\u7e3d\u89bd",
    body: "\u5c07\u9019\u8d9f\u7df4\u7fd2\u6574\u7406\u6210\u6e05\u55ae\uff0c\u5e36\u8457\u5177\u9ad4\u91cd\u9ede\u56de\u5230\u73fe\u5be6\u751f\u6d3b\u3002",
    icon: "check",
    tip: "",
  },
] as const;

export const categories = [
  { id: "dog", label: "犬", icon: "🐕", image: "/assets/species/dog.png", active: true },
  { id: "cat", label: "貓", icon: "🐈", image: "/assets/species/cat.png", active: true },
  { id: "rabbit", label: "兔", icon: "🐇", image: "/assets/species/rabbit.png", active: false },
  { id: "bird", label: "鳥", icon: "🦜", image: "/assets/species/bird.png", active: false },
  { id: "reptile", label: "爬蟲", icon: "🦎", image: "/assets/species/reptile.png", active: false },
  { id: "small", label: "小型哺乳", icon: "🐹", image: "/assets/species/small-mammal.png", active: false },
];

export const initialMembers: CareMember[] = [
  { id: "player", name: "", age: null, isPlayer: true },
];

export const scenarioStages: Record<number, { start: number; end: number }> = {
  3: { start: 0, end: 2 },
  4: { start: 3, end: 8 },
  5: { start: 9, end: 11 },
  6: { start: 12, end: 15 },
};

export const initialProfile: Profile = {
  age: "",
  role: "",
  roleOther: "",
  hoursAway: "",
  careHours: "",
  housing: "",
  landlordConsent: "",
  hasHousemates: null,
  housematesConsent: null,
  hasSensitiveHouseholdMembers: false,
  housemateList: [],
  housemateTypes: [],
  otherHousemate: "",
  activitySpace: [],
  otherActivitySpace: "",
  homeSpaceImage: "",
  homeSpaceImageName: "",
  homeSpaceImages: [],
  homeSpaceImageNames: [],
  noShibaExperience: false,
  pastPetTypes: [],
  pastDogCount: "",
  pastCatCount: "",
  pastOther: "",
  currentPetTypes: [],
  currentDogCount: "",
  currentCatCount: "",
  currentOther: "",
  experienceNote: "",
  experience: "",
  pastPets: "",
  currentPets: "",
  reasons: [],
  reasonOther: "",
  monthlyBudget: "",
  emergencyFund: null,
  backupSupport: null,
};





