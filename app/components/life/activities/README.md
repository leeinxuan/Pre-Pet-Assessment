# 生活旅程活動元件

這個目錄存放 `LifeJourneyComponents.tsx` 分派的實際活動元件。主旅程檔只負責依活動註冊設定組裝流程；物種專屬互動與共用情境版型放在此處。

## 各物種日常照護互動

- `daily-care/WalkingActivity.tsx`：犬散步活動。
- `daily-care/CatDailyInspectionActivity.tsx`：貓砂盆日常檢查。
- `daily-care/RabbitDailyCheckActivity.tsx`：兔子梳毛與外觀檢查。
- `daily-care/BirdCageInspectionActivity.tsx`：鸚鵡鳥籠巡視。
- `daily-care/GuidedActivities.tsx`：倉鼠早晨巡視。

這五個元件在旅程中屬於相同層級：每個物種各自保留不同的互動狀態機，但都由共用旅程依活動註冊設定分派。

物種專屬的互動樣式應放在對應活動旁（例如 `daily-care/HamsterMorningInspectionActivity.css`），再由 `app/globals.css` 依既有順序載入。共用版面、按鈕與響應式規則則維持在 `app/styles/`，不要建立全域的 `dog.css` 或 `cat.css`。

## 其他活動檔案

- `ArrivalMealActivity.tsx`：五物種到家第一餐。
- `RabbitCarrySortActivity.tsx`：抱兔步驟排序與完成回饋。
- `DailyBehaviorActivityMulti.tsx`：五物種共用的多題日常行為流程。
- `VideoScenarioActivity.tsx`：影片情境題。
- `BusyCareActivity.tsx`：忙碌日照顧與協助者確認。
- `BreedChallengeActivity.tsx`：犬種挑戰。
- `JourneyTransitions.tsx`：接回家、時間流逝與忙碌日過場。

## 共用介面

- `scenario-ui.tsx`：情境題、影片、知識卡與答題回饋版型。
- `activity-ui.tsx`：活動標題、寵物名稱替換等小型共用 UI。
- `index.ts`：正式活動元件入口；流程組裝檔應優先從此處匯入。

## 相容檔案

`DailyBehaviorActivity.tsx`、`FeedingActivity.tsx` 與 `WarningSignalActivity.tsx` 目前仍是舊名稱的相容轉出檔，不是實際活動實作。保留它們是為了避免既有引用失效；新程式不要從這三個檔案新增依賴。
