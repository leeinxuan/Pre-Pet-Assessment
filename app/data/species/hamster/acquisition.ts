import type { PetAcquisitionConfig } from "../../shared/pet-sources";

export const hamsterAcquisition: PetAcquisitionConfig = {
  sourceIds: ["ministry-adoption"],
  reminder: [
    { text: "無論選擇領養或購買，都建議向" },
    { text: "來源方", emphasis: true },
    { text: "了解動物的背景與飼養狀況，並保留健康紀錄與相關資訊。" },
  ],
};
