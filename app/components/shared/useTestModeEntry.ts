/** 測試模式由首頁的開始流程集中判斷，正式網址不啟用跳關。 */
export const testModeQueryParam = "test";

export function isTestModeEntryUrl(search: string) {
  return new URLSearchParams(search).get(testModeQueryParam) === "1";
}
