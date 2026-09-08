import { getCatBreedChallengeScenarios, catBreedChallengeContent } from "./cat/breed-challenges";
import { getDogBreedChallengeScenarios, dogBreedChallengeContent } from "./dog/breed-challenges";

/** 依物種資料來源組裝品種考驗；此檔不存放任何犬貓題目內容。 */
export function getBreedChallengeScenarios(breedId: string) {
  return breedId in catBreedChallengeContent
    ? getCatBreedChallengeScenarios(breedId)
    : getDogBreedChallengeScenarios(breedId);
}
