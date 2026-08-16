# 伴日子新手村｜飼養前評估遊戲

這是一個以「真的領養並照顧一隻寵物」為時間軸的互動式網站。玩家會從選擇寵物、布置生活空間、準備接回家用品，一路進入飼養生活情境，最後整理成照顧準備總覽。

網站重點不是考試，而是讓準飼主在正式飼養前，先走過一次完整的生活旅程：準備空間、接回家、餵食、散步、日常照顧、就醫判斷與生活變化。

## 目前流程

1. 選擇寵物
2. 領養前準備
   - 布置生活空間
   - 小狗門牌命名
   - 出發前準備／整理後車廂
3. 飼養生活
   - 適應新家與安全感
   - 日常生活照護
   - 當生活發生變化
4. 照顧準備總覽
   - Checklist 與重點整理
   - 資料補充
   - 照顧承諾
   - PDF 輸出

## 技術與執行

專案使用 Vinext / Vite / React / TypeScript。

## 本機開啟網站

在 VS Code 打開專案資料夾後，開啟 Terminal，輸入：

```bash
corepack pnpm dev
```

成功後，終端機會顯示本機網址：

```txt
http://localhost:3000/
```

把這個網址貼到瀏覽器就可以看到網站。

要關掉本機網站時，在同一個 Terminal 按：

```txt
Ctrl + C
```

如果第一次開啟、或套件有更新，請先執行：

```bash
corepack pnpm install
```

安裝依賴：

```bash
corepack pnpm install
```

啟動本機開發環境：

```bash
corepack pnpm dev
```

正式建置：

```bash
corepack pnpm run build
```

測試：

```bash
corepack pnpm test
```

Lint：

```bash
corepack pnpm run lint
```

## 主要目錄

```txt
app/
  components/
    layout/
    welcome/
    selection/
    preparation/
    life/
    life/activities/
    report/
    shared/
  data/
  game-data.ts
  life-data.ts
  game-types.ts
  globals.css
  page.tsx

public/
  assets/
    welcome/
    species/
    room/
    car/
    pet-journey/
    walking/

docs/
  asset-map.md
```

## 素材管理

素材已整理到 `public/assets/`，並以英文 kebab-case 命名。網站中的公開引用路徑以 `/assets/...` 開頭。

素材對照表請看：

- [docs/asset-map.md](./docs/asset-map.md)

新增素材時請盡量依用途放入以下資料夾：

- `public/assets/welcome/`：首頁與歡迎視覺
- `public/assets/species/`：物種與品種圖片
- `public/assets/room/`：房間背景與房間用品
- `public/assets/car/`：後車廂與接回家用品
- `public/assets/pet-journey/`：飼養生活影片與小狗狀態圖片
- `public/assets/walking/`：散步互動遊戲素材

請避免在新素材檔名中使用中文、空格或特殊符號。

## 開發注意事項

- 不要任意改動情境題 id，否則可能影響作答紀錄與報告整理。
- 費用紀錄依唯一 expense id 防止重複計算。
- 跨頁狀態主要保留在 `app/page.tsx`，單一互動內部暫時狀態則放在各互動元件中。
- 修改圖片或影片路徑後，請同步更新資料檔、元件與 CSS 中的引用。
- 修改完成後至少執行 `pnpm run build`。

## 已知事項

原先曾有警告訊號教學影片路徑 `/assets/pet-journey/dog-body-language.mp4`，但目前工作區尚未包含此影片檔。若未來恢復該互動頁，請補上對應素材。
