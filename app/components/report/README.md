# 報告元件

- `AssessmentReport.tsx`：照顧準備總覽、觀念回顧、費用與每日投入畫面。
- `ProfileForms.tsx`：個人資料分頁表單與補充資料表單。
- `PdfExportControls.tsx`：PDF／PNG 產生、下載與行動裝置儲存控制。
- `index.ts`：正式報告模組入口。
- `ProfileReportComponents.tsx`：舊引用的 compatibility re-export；新程式應直接使用專責模組或 `index.ts`。

拆分只改變程式位置，報告畫面、PDF、圖片輸出、表單欄位與公開元件名稱維持不變。
