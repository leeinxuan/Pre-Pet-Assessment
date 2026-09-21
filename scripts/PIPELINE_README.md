# AI 素材生成 Pipeline

> Pre-Pet Assessment 網站專用素材自動化生成流程

## 整體架構

```
asset-manifest.json          ← 定義每個物種需要哪些素材
        ↓
generate-assets.py           ← 讀取清單、組合提示詞、呼叫 Gemini API
        ↓
public/assets/{species}/     ← 生成的圖片直接存入，網站即可使用
```

---

## 第一步：取得 Gemini API Key

1. 打開 https://aistudio.google.com/apikey
2. 用你的實驗室 Google 帳號登入
3. 點「Create API key」
4. 複製金鑰

---

## 第二步：安裝依賴

```bash
cd Pre-Pet-Assessment/scripts
pip install google-genai pillow
```

---

## 第三步：設定 API Key

```bash
export GEMINI_API_KEY="你複製的金鑰"
```

> 如果每次都要設定很麻煩，可以加到 `~/.zshrc` 或 `~/.bashrc`

---

## 第四步：執行生成

### 先用 dry-run 確認提示詞沒問題

```bash
# 看看兔子素材的提示詞清單（不會實際生成）
python generate-assets.py --species rabbit --dry-run

# 只看「還缺少的」素材
python generate-assets.py --species rabbit --status needed --dry-run
```

### 正式生成

```bash
# 生成兔子所有缺少的素材
python generate-assets.py --species rabbit --status needed

# 生成鳥類所有缺少的素材
python generate-assets.py --species bird --status needed

# 生成所有物種（含暫用素材）
python generate-assets.py --species all --status needed
python generate-assets.py --species all --status placeholder

# 強制重新生成（即使檔案已存在）
python generate-assets.py --species rabbit --force
```

---

## 素材清單（asset-manifest.json）說明

### Status 說明

| status | 意思 |
|--------|------|
| `done` | 已有正式素材，不需要生成 |
| `needed` | 完全沒有素材，需要 AI 生成 |
| `placeholder` | 暫時借用其他物種的素材，之後要換成專屬素材 |

### 新增物種的步驟

1. 在 `asset-manifest.json` 的 `species` 裡加入新物種
2. 定義 `style`（畫風描述）和 `basePrompt`
3. 在 `assets` 裡列出每個類別需要的素材
4. 執行 `python generate-assets.py --species 新物種 --dry-run` 確認
5. 執行 `python generate-assets.py --species 新物種 --status needed` 開始生成

---

## 生成後：更新程式碼讓網站用新素材

以兔子為例，生成完圖片後要更新 `app/data/species/rabbit/assets.ts`：

```typescript
// 把暫用素材替換掉
export const rabbitAssets = {
  room: {
    background: "/assets/rabbit/room/rabbit-room-background.png",  // ✅ 已換成專屬素材
    hayRack: "/assets/rabbit/room/hay-rack.png",                   // ✅ 已換成專屬素材
    // ...
  }
}
```

---

## 影片素材：使用 Veo（另外處理）

圖片可以用 Gemini API 自動生成，但**影片需要用 Google Veo**：

1. 打開 https://labs.google/fx/tools/video-fx
2. 或用 Vertex AI 的 Veo API（需要 Google Cloud 專案）

影片提示詞範例（從 manifest 的情境素材延伸）：

```
"A cute lop-eared rabbit eating hay slowly in a bright, clean room, 
 loop animation, 3 seconds, top-down view, pastel illustration style"
```

---

## 小提示

- **每次只生成一個物種**，比較容易確認品質
- 生成後用瀏覽器開 `localhost:3000` 直接看網站效果
- 如果某張圖不滿意，修改 manifest 的 prompt 後用 `--force` 重新生成
- API 有 rate limit，腳本已內建 3 秒延遲，不會被鎖定

---

## 流程總結

```
1. aistudio.google.com → 取得 API Key
2. pip install google-genai
3. export GEMINI_API_KEY="..."
4. python generate-assets.py --species rabbit --dry-run   ← 確認
5. python generate-assets.py --species rabbit --status needed  ← 生成
6. 更新 assets.ts 中的路徑
7. 重複步驟 5-6 直到所有物種完成
```
