# 守宮影片｜首幀鎖定流程（ChatGPT 生首幀 → Google Vids Omni 轉影片 → ffmpeg 拼接）【草稿，待使用者確認】

> 通用規範（必讀）：`Pre-Pet-Assessment/scripts/pet-video-sop.md`。範例：倉鼠 `scripts/hamster/hamster-frames-workflow.md`（本檔結構照它，倉鼠已完整跑完一遍，所有踩雷都已寫進去）、鸚鵡、貓、兔子。
> **分鏡基準＝柴犬版**：鏡頭順序、構圖、節奏照柴犬版（`scripts/dog/shiba-ref-frames/<影片名>-s<N>.png`、`public/assets/dog/pet-journey/shiba/*.mp4`）。沒有動物的鏡頭（車子、辦公室、飼主臉部）重用原片（♻️；busy-day-transition 的飼主臉部要重生，見 SOP 最後補充）；有動物的鏡頭把動物換成守宮、場景換成爬蟲缸／客廳。
> 內容依 `docs/gecko-game-planning.md`、`app/data/species/gecko/scenarios.ts`、`journey.ts`。目前守宮版情境的影片位置都是 `placeholder`；`app/data/species/gecko/assets.ts` 還沒有 `petJourney` 區塊。
> 物種：**小型地棲性守宮（以豹紋守宮外觀為準）**，夜行性、完全獨居、外溫動物。

## 檔案存放規則（沿用使用者 2026-10-20 指示）
- **草稿階段**（生成中的首幀、Vids 片段／匯出、合成音樂、備份）一律放使用者桌面資料夾 `飼養前評估影片/gecko/`，依種類分：
  - `start-frames/`（首幀、master、參考圖轉檔）｜`videos/`（Vids 匯出、raw 切段、剪接中間檔、`clips/`）｜`music/`（make_*.py 與 wav）｜`backup/`（舊版、ChatGPT 原圖、對照圖）｜`fix/`（遮罩、contact sheet、修補用中間檔）
- **最終確定的成品**才放進專案：`Pre-Pet-Assessment/public/assets/gecko/pet-journey/<影片名>.mp4`（每支 ≤ 15 秒、1280×720、含音軌），以及需要保留的 start-frames／音樂與剪接腳本放 `scripts/gecko/`。
- **版本命名**：每一輪修改輸出新檔名（`_v2`、`_v3`），不要覆蓋舊版；覆蓋前先備份；刪除前先問使用者範圍。

## 素材與外觀
- **角色（沿用遊戲內那隻）**：`public/assets/gecko/room/gecko.webp`（黃底深褐斑點的豹紋守宮，大眼、微笑）；開心 `public/assets/gecko/feeding/gecko-happy.webp`、不開心 `gecko-unhappy.webp`。固定外觀（每個提示詞都貼）：
  `a small leopard gecko with a pale-yellow to golden-orange body covered in dark-brown leopard spots, a cream-white belly and chin, large round golden eyes with vertical slit pupils, a gentle closed-mouth smile, five slim toes on each foot, a plump rounded tail with dark spots, and thick dark-brown outlines`
- **場景**
  - **爬蟲缸內**（主要）：`public/assets/gecko/room/bg-gecko-terrarium-substrate.webp`（1672×941 橫式，椰纖底材、米色背板、玻璃缸框，無動物）；含加熱墊版 `bg-gecko-terrarium-heat-mat.webp`、空缸 `bg-gecko-terrarium-interior.webp`。
  - **缸內道具**（`public/assets/gecko/room/`）：暖側躲避屋 `warm-hide.webp`、涼側躲避屋 `cool-hide.webp`、濕躲避屋 `moist-hide.webp`、淺水盤 `shallow-water-dish.webp`、鈣粉盤 `calcium-dish.webp`、加熱墊 `heat-mat.webp`、溫濕度計 `thermometer-hygrometer*.webp`（暖側／涼側各一）。餵食用 `public/assets/gecko/feeding/`（`gecko-live-insect.webp`、`gecko-live-insect-calcium.webp`、`shallow-water-dish-full.webp`…）。
  - **整缸外觀**：`gecko-terrarium-front.webp`（正面缸體，網蓋＋深棕缸框）。
  - **安全房間（客廳）**：`gecko-room.webp`（缸放在房間中）、`gecko-room-sealed.webp`（缸已封好的版本）。過場用。
  - **外出盒**：`public/assets/car/` 內對應的運輸盒；沒有就依 SOP 另生。
- **飼主**：棕色馬尾、粉紅針織毛衣、藍色牛仔褲、白襪；人物一律用已核可的飼主角色圖當參考（倉鼠／兔子版已有）。
- 參考圖先轉 PNG（webp 在 ChatGPT 不一定能上傳；透明背景要先墊白），存 `start-frames/_ref_*.png`。
- **ChatGPT 聊天室**：守宮整個專案共用一個新聊天室（開工時建立，把網址記回本檔）。**Vids 專案**：新開「守宮」（SOP §5.1），開工時把網址記回本檔。
- 接線：做完後問使用者範圍，再改 `app/data/species/gecko/assets.ts`（新增 `petJourney`）、`scenarios.ts`、`journey.ts`，**以及 `activity-registry.ts`（忙碌過場 `transition: "busy-care"`、生病後的時間流逝過場 `transition: "time-pass"` 要在這裡開，只加影片檔不會播，倉鼠／鸚鵡踩過）**。照 `cat/assets.ts` 的 `petJourney` 格式；忙碌題的 `busyCarePresentation.sceneMedia` 型別要求 `fallback`（image-layers：背景圖＋角色圖）。

## Master 規格（依使用者 2026-10-23 提供的兩張圖，取代下方統一規則第 2 點的描述）
兩張參考圖已存在 `飼養前評估影片/gecko/start-frames/`：`_ref_room_ui.png`（客廳，1562×880）、`_ref_terrarium_furnished_ui.png`（擺好的缸內，1558×878）。檔名的 `_ui` 表示圖上有遊戲介面元素，**做 master 時一律去掉**。兩個 master 都不含守宮。

### A. 客廳 master（`gecko-room-master.png`）
- **構圖（保持不變）**：左邊木門；窗戶（窗簾、白天城市景）；窗下米色沙發（3 個抱枕：米、褐、綠）；前方橢圓木茶几、紫色橢圓地毯；中央吊燈；右邊低櫃，櫃上放爬蟲缸；左側盆栽。
- **要去掉的遊戲介面**：①掛牌（寫「多多」的木牌與吊繩）；②圓形「>」按鈕與「點擊佈置」字；③四個圓角外框（裁成直角）。去掉掛牌後牆面補回牆壁與畫框原樣，不要留吊繩線。
- **茶几上的物品**（飼料盒、兩罐補充品）預設**不畫**，需要餵食鏡頭時再於該首幀另外加；要保留的話使用者說一聲。
- **櫃上的缸**：此圖的缸是遠景示意（空缸、淺色底材）。**遠景鏡頭可沿用**；要特寫缸內的鏡頭一律改用下面的缸內 master，兩張的缸框顏色（深棕缸框＋黑色網蓋）保持一致。
- 白天窗外為藍天，需要夜晚時另做夜間版（見 C）。

### B. 缸內 master（`gecko-terrarium-furnished-master.png`）
**空間分區（以 1558×878 座標為準，像素為約略值；提示詞要用這些位置描述）**
| 區域 | 位置 | 物件 |
|---|---|---|
| 涼區（左） | x 0–700 | 藍灰色岩石圓頂躲避屋（x 80–415）、黃綠斑紋黃金葛盆栽（x 100–615，在躲避屋後方）、彎曲沉木（x 390–730，由涼區延伸到中間）、涼區溫度計（**在缸外**，左上，x 190–410、y 105–250：本體夾在缸蓋與缸框之間，線貼在玻璃內側／外側往下，探針貼膠帶固定在左側底材 x≈455、y≈690） |
| 中區 | x 610–1075 | 黑灰色底座＋橙色淺盤的「濕躲避屋／水盤座」（x 610–975、y 430–600）、**鈣粉盤**（白色粉末，x 690–865、y 620–740）、**水盤**（清水，x 895–1070、y 620–740） |
| 熱區（右） | x 1000–1558 | 陶土橙色圓頂躲避屋（x 1045–1365、y 415–625）、深灰色石板（x 1100–1395、y 615–765，曬背用）、熱區溫度計（**在缸外**，右下，x 1280–1505、y 700–870：本體放在缸外底部，探針針頭埋在加熱墊與缸底玻璃之間、不外露） |
| 底部 | y 780–878 | 缸底棕色木框；**加熱墊**位於缸底下方偏右（深色長條，x 830–1300、y 835–865，電線往右出）——加熱墊在熱區底下，涼區下方沒有加熱墊 |
| 頂部 | y 0–85 | 黑色缸框與網蓋；**照明燈的光線**從上方右側打下（x 700–1370 最亮，y 85–125 一條高亮光帶） |
- **底材**：深棕色椰纖碎屑（絕不出現鬆散細沙）。**背板**：米色。**玻璃反光**：左上與右下各一條斜線，位置固定。
- **要去掉的遊戲介面**：左上圓形「←」返回鈕、圖四周的圓角外框。
- **溫度計處理（使用者 2026-10-23 確認）**：**兩支溫度計都放在缸外**，不要移進缸內。①涼區溫度計：本體夾在缸蓋與缸框之間，線貼著玻璃往下，探針貼膠帶固定在涼區底材上（圖上位置照舊）。②熱區溫度計：本體放在缸外右下角，探針線沿缸外底部走到加熱墊邊緣，**探針針頭埋在加熱墊與缸底玻璃之間，畫面上完全看不到針頭**（2026-10-23 更新），不進缸內。兩支螢幕保持空白（數字用後製字卡疊，不讓 AI 畫）。
- **水盤與鈣粉盤**：master 的狀態是水盤滿水、鈣粉盤有白色粉末；需要「空」的鏡頭要在首幀明寫 `empty`，不能靠 Vids 自己改。
- **照明光線**：master 的光線是柔和、局部的暖白光（右上），不是光束或聚光燈，也不是整面變亮。晚上版把光線關掉，只留加熱墊的暖色底光。

### C. 時段／狀態變體（先做完 master 再從 master 衍生，一律用 ChatGPT「上傳 master＋`edit… keep everything else identical`」）
| 變體 | 缸內光線 | 窗外／室內 | 守宮活動 | 用在 |
|---|---|---|---|---|
| 白天（lamp on） | 右上暖白光亮、熱區較亮 | 藍天 | 躲在躲避屋、只露頭或不見 | first-day、correct-answer 白天鏡頭 |
| 傍晚 | 燈亮度降低、整體偏暖橙 | 夕陽橙色天空 | 開始活動、走向熱區 | correct-answer、②、④⑦ 多數 |
| 夜晚（lamp off） | 照明關閉、只剩暖色微光（加熱墊）、缸內偏暗 | 夜空、室內吊燈亮 | 最活躍：走動、舔鼻子、探頭 | 過場⑨⑪⑫ |
首幀的狀態（燈亮／暗、水盤空／滿、昆蟲有／無）一定在 ChatGPT 首幀就畫對。

### D. 守宮動線與動作規則（依分區）
- **熱區（右）**：陶土躲避屋口與石板＝取暖／曬背位置；傍晚守宮常趴在石板上或躲避屋頂上。
- **涼區（左）**：藍灰躲避屋＝休息／睡覺；黃金葛後方可藏身。
- **中區**：兩個盤子＝補水、補鈣位置；守宮走過去低頭舔水（嘴靠近水面，不要畫舌頭特寫過長）。
- 守宮由涼區走向熱區要沿底材地面走，不能爬上黃金葛、沉木最多踩上一小段、不爬玻璃。
- 缸內所有物件（兩個躲避屋、兩個盤子、石板、沉木、溫度計與探針）**位置固定不動**；提示詞一律寫 `all objects stay exactly where they are`。

### E. 提示詞骨架
**ChatGPT 去 UI 版 master（缸內）**
```
In THIS message, image 1 is the reference of a leopard gecko terrarium interior. Redraw it as a clean master image, keeping the same art style, same camera angle, same 16:9 framing, and the exact same layout and positions of every object: the blue-grey stone dome hide and the pothos plant and driftwood on the LEFT cool side, the dark-grey stand with an orange tray, the round calcium dish (white powder) and the round water dish (clear water) in the middle, the terracotta dome hide and the dark slate stone on the RIGHT warm side, dark-brown coconut-fiber substrate, beige back wall, black frame with a mesh lid at the top, a soft warm-white lamp glow at the upper right, and a dark heat mat strip visible at the bottom under the right side. REMOVE the circular back-arrow button at the top-left and the rounded outer frame. Keep BOTH thermometers outside the tank exactly like the reference: the cool-side thermometer clipped between the lid and the frame at the upper left with its cable taped down along the glass and its probe taped to the substrate on the left, and the warm-side thermometer sitting outside the tank at the lower right with its probe cable running along the bottom edge and disappearing under the heat mat, the probe tip hidden between the heat mat and the glass and never visible (do NOT move it inside the tank). Both thermometer screens stay blank (no digits). No gecko, no text, no UI elements. 
```
**ChatGPT 去 UI 版 master（客廳）**
```
In THIS message, image 1 is the reference of a cozy living room. Redraw it as a clean master image with the same art style, same camera angle, same 16:9 framing and the same layout of the door, window with curtains, plant, sofa with three cushions, oval wooden coffee table, purple oval rug, pendant lamp, wall frames, and the cabinet on the right with the reptile terrarium on top. REMOVE the hanging wooden name sign (restore the wall and frame behind it), the round arrow button and its label, the two supplement jars and the feeder box on the coffee table, and the rounded outer frame. No gecko, no people, no text, no UI elements.
```
**Vids 缸內 A 型骨架**
```
Use this image as the exact first frame and animate it. A static locked camera in front of a leopard gecko terrarium, flat 2D illustration with thick dark-brown outlines. All objects in the tank stay exactly where they are: [list]. The lamp glow stays constant. [0.0–Xs 動作…]. No other animals, no extra objects, no text, no hands unless stated.
```

### F. 各支影片的缸內落點（A 型）
| # | 影片 | 變體 | 起點 → 動作 → 終點 |
|---|---|---|---|
| ① | correct-answer | 傍晚 | 熱區石板上趴著 → 緩慢眨眼、尾巴輕擺 → 停在石板，嘴角微笑 |
| ② | correct-answer2 | 傍晚 | 涼區藍灰躲避屋旁 → 沿底材走過中區 → 停在熱區躲避屋頂，舔一下鼻子 |
| ③ | first-day | 白天 | 缸中央（剛放入）→ 快速鑽進熱區陶土躲避屋 → 只露半個頭、眼睛警戒轉動（飼主不入鏡） |
| ④ | refuse-food | 傍晚 | 熱區躲避屋口探頭 → 地面上的昆蟲爬動、守宮不理 → 縮回屋內（不拍捕食特寫） |
| ⑤ | temperature-check | 夜晚偏冷、燈暗 | 兩支缸外溫度計特寫（涼 19°C 夾在蓋與缸框處、暖 24°C 在缸外右下，探針線進加熱墊下、不見針頭；數字用後製字卡）→ 守宮縮在熱區躲避屋動也不動 → 加熱墊暖色微光淡弱 |
| ⑥ | shedding | 傍晚近景 | 熱區石板旁 → 前腳與嘴輕撥趾端白色殘皮 → 旁邊有一小片已脫下的皮；濕躲避屋（中區）入鏡 |
| ⑦ | sick | 傍晚 | 趴在熱區躲避屋外 → 尾巴明顯細瘦、眼睛半閉 → 水盤與食盤都沒動 |
B 型過場的缸內鏡頭用夜晚版（⑨⑪⑫）；客廳鏡頭用客廳 master，缸為遠景，進入特寫時用缸內 master 的對應變體。

### G. 驗收清單（每個 master／首幀）
1. 沒有遊戲介面元素（返回鈕、名牌、箭頭、「點擊佈置」、圓角外框）。
2. 物件位置與上面 B 表一致，沒有多出或少掉的物件；底材是椰纖碎屑，沒有細沙。
3. 照明光線柔和、位置在右上，不是光束；夜晚版沒有照明光。
4. 兩支溫度計都在缸外（涼區夾在蓋與缸框之間、線貼玻璃；熱區探針線進加熱墊下、針頭不外露），螢幕空白。
5. 加熱墊只在熱區下方。
6. 沒有守宮、沒有文字。

## 統一規則
1. **畫風**：沿用守宮素材的深褐粗描邊、柔和陰影、暖米色；不粉彩、不染黃。斑點樣式、尾巴粗細全程一致。
2. **兩個 master（階段 2，先做、使用者確認後才批次生首幀；master 一律不含守宮）**：以使用者 2026-10-23 提供的兩張參考圖為準，規格見上方「Master 規格」。舊稿的描述（暖側在左）已作廢——**現在是涼區在左、熱區在右、加熱墊在熱區底下、照明光在右上**。水盤與鈣粉盤：「有水」用 `shallow-water-dish-full.webp` 為準，「空」要在首幀明寫 `empty`。
3. **守宮行為要寫實、不擬人**：四肢貼地小步走、舌頭舔鼻眼、頭微微左右轉、緩慢眨眼、尾巴輕擺、吐舌嗅聞、鑽進躲避屋、趴在暖側躲避屋頂上取暖、脫皮時用嘴撕舊皮。**不要**站立揮手、兩足行走、攀爬玻璃（豹紋守宮是地棲）。動作小而慢。
4. **夜行性畫面**：「白天」＝守宮躲在躲避屋裡只露出頭或完全不見；「活動時間」＝傍晚／夜間（缸內開暖色小燈、窗外變暗）。**需要晚上的鏡頭，首幀就要畫成夜晚**（倉鼠版教訓：只在提示詞寫 night，Vids 還是會生白天）。
5. **聲音**：Vids 原音全拿掉，只用自製音樂（SOP §6.2）；♻️ 重用鏡頭保留原音並交叉淡入底樂；不放合成動物音效。我們聽不到，音量用數字驗證（平均 −18～−24 dB、peak < −0.5 dB），並請使用者聽。
6. **安全規範（照 SOP §9）**：錯誤選項用靜態圖——抓握或拉扯尾巴（斷尾）、鬆散細沙底材、野外抓來的蟲、人類食物、精油／殺蟲劑、混養打架、過熱／過冷缸溫都**不拍**；手與守宮的互動只有「手掌貼著地面讓牠自己爬上來、低位輕托」，不抓、不舉高、不碰尾巴；生病／高齡用「尾巴細瘦、趴著不動、不吃、眼睛半閉」，不要血、不要排泄物特寫、**不要昆蟲被吃的特寫**（餵食用「昆蟲放進盤中、守宮靠近」帶過）。
7. 3:2 → 16:9 裁切（`crop=1536:864:0:Y,scale=1280:720`），成品最終 1280×720。
8. **老年轉場（time-passes-aging）首幀一開始就要有復古感**：回憶鏡頭（幼守宮、青年、成體）在 ChatGPT 首幀 prompt 就要寫暖色復古老照片質感（warm vintage film look、faded golden tones、soft grain、gentle vignette；不要發黑、不要偏冷）；最後一鏡（現在的老守宮）首幀保持乾淨正常色調；倒數第二鏡→最後一鏡用 ffmpeg `blend` 的 T 斜坡漸變過渡，後製濾鏡只做輔助。

## 影片清單（共 12 支，對應倉鼠／鸚鵡版）
### A 型（一鏡到底）
| # | 影片 | 對應情境 | 場景 | 動作（Vids 提示詞重點） | 長度 |
|---|---|---|---|---|---|
| ① | correct-answer | 答對回饋 | 缸內中景（傍晚暖光） | 守宮趴在暖側躲避屋旁，緩慢眨眼、尾巴輕輕左右擺，嘴角微笑 | 4–5 s |
| ② | correct-answer2 | 答對回饋 | 缸內 | 守宮從涼側慢慢走到暖側，舔一下鼻子，停在躲避屋頂上 | 4 s |
| ③ | first-day | gecko-arrival-settle | 缸內（白天） | 守宮從外出盒移到缸內後，快速鑽進暖側躲避屋，只露出半個頭，眼睛警戒地轉動；飼主不入鏡，不被打擾 | 8 s |
| ④ | refuse-food | gecko-refuse-food | 缸內（傍晚） | 暖側躲避屋口，守宮只探出頭，缸裡的昆蟲在地面爬、守宮不理會、縮回屋內；不出現捕食或死蟲特寫 | 8 s |
| ⑤ | temperature-check | gecko-temperature-check | 缸內（冷天、室內偏暗） | 缸外溫度計（暖側 24°C／涼側 19°C）特寫帶守宮縮在暖側躲避屋，動也不動；加熱墊指示燈不亮感 | 7–8 s |
| ⑥ | shedding | gecko-shedding | 缸內近景 | 守宮用前腳與嘴輕撥趾端的白色殘皮，另一側有已脫下的皮；濕躲避屋在旁；不拉扯、不出血 | 7–8 s |
| ⑦ | sick | gecko-health-emergency | 缸內 | 守宮趴在躲避屋外不動、尾巴明顯細瘦、眼睛半閉、水盤與蟲都沒動 | 8 s |
### B 型（多鏡頭過場，整支同一首底樂）
| # | 影片 | 鏡頭（柴犬分鏡） |
|---|---|---|
| ⑧ | arrival-transition（約 11 s） | 車子白天♻️→寵物店／爬蟲店領守宮（飼主雙手捧外出盒）→夕陽開車♻️→提盒進家→外出盒放在缸旁、守宮探頭→歡迎回家（守宮在缸內，字用 `Pre-Pet-Assessment/scripts/歡迎回家繽紛泡泡字貼紙.png` 另外疊，**放右上、不擋守宮**） |
| ⑨ | busy-day-transition（約 13 s） | 辦公室♻️→夜晚客廳的缸（守宮在暖側躲避屋口、**空食盤**）→飼主臉部（**重生**，no bag）→飼主手掌貼地讓守宮爬上來（低位輕托） |
| ⑩ | time-passes-aging（約 10 s） | 幼守宮笨拙爬動→青年守宮探索→成體趴在手掌上→老守宮慢慢走動（尾巴細一點、斑色變淡）；前三幕復古濾鏡，最後一幕乾淨 |
| ⑪ | busy-daily-care（約 10 s） | 辦公室夜晚♻️→**空**水盤／食盤旁的守宮→守宮縮在躲避屋裡不安（燈暗、加熱墊沒開感） |
| ⑫ | senior-life（約 9 s） | 老守宮在躲避屋旁休息→慢慢走向水盤→飼主把水盤與躲避屋移近、調成更容易進出的位置→老守宮趴在飼主手掌上被輕托 |

- **老守宮額外指示**：`a senior leopard gecko: the same spotted coloring but faded and a little duller, a thinner tail, slightly cloudy eyes, moving slowly and low to the ground`；**幼守宮**：`a 2-month-old baby leopard gecko, much smaller, slimmer, with bolder banded markings and a thin tail`。
- 底樂（先確認，使用者可要求更換）：correct-answer 輕快（≥120 BPM、尤克里里＋鐵琴）、correct-answer2 俏皮撥弦、first-day 稀疏柔音鋼琴、refuse-food 慢速小調、temperature-check 冷色調的單音鋼片琴、shedding 輕柔木吉他、sick 慢速小調弦樂；過場依對應曲風，但**避免跟倉鼠／鸚鵡版聽起來一樣**（換樂器：小提琴撥奏／手碟／口琴）；每支底樂不 loop、用 `apad` 補到畫面長度、新鏡頭不留 Vids 原音。

## 流程
1. 階段 2：做兩個 master → 使用者確認。
2. 階段 3：每支首幀（同一個 ChatGPT 聊天室，每次重新上傳圖＋`In THIS message, image 1 is…`；要改舊首幀就上傳舊圖＋`In THIS message… edit… keep everything else identical`），全部生完做總覽集中審圖，使用者確認後才進 Vids。ChatGPT 下載：DOM 圖片順序不可靠，必須檢查檔案大小，必要時用 `(1)` 重複檔。
3. 階段 4：Vids 新專案「守宮」，一支支生、立刻看 contact sheet（1 fps）、插入後核對總長（每次應 +10 s），全部完成匯出一次，再抽樣確認片段順序。注意：Vids 會幻覺多餘物件（多一間屋子、堆疊木頭取代躲避屋），提示詞明寫 `no other house / the hide stays exactly where it is`；缸內物件位置要寫 `all objects stay in place`。
4. 階段 5：剪接（`build_finals.py` 同倉鼠版）、合成音樂、混音（**音軌要補到跟畫面等長 `apad`，避免被截斷**；限幅用 `alimiter=limit=0.8:level=0`）。
5. 局部修正：影片中靜態物件（水盤、食盤、加熱墊指示）需要補或移除時，用「ChatGPT 改首幀 → ECC 對齊 → 以物件遮罩疊回每一格、兔子／守宮移動處自動讓位」的方式修補，不必整支重生（兔子版 bath／cecotropes 已驗證）。滾輪類會自己動的物件，用 alphamerge＋羽化遮罩凍結成第 0 幀。
6. 交付：每支用 SendUserFile；請使用者聽音樂與看畫面；定稿後才複製進專案。

## 進度追蹤
| 影片 | 首幀 | Vids 片段 | 成品 |
|---|---|---|---|
| master：terrarium-furnished（去 UI；溫度計維持缸外）→ `…master_v3.png` | ✅ | ✅ | ✅ |
| master：room（去名牌／按鈕／茶几物品）→ `gecko-room-master_v1.png` | ✅ | ✅ | ✅ |
| 變體：白天 v3／傍晚 `…evening_v2.png`／夜晚 `…night_v2.png`（缸內） | ✅ | ✅ | ✅ |
| ① correct-answer（白天，守宮置中）→ `correct-answer-s1.png`（v4 裁切） | ✅ | ✅ | ✅ `clips/final/correct-answer.mp4` 5 s，音樂 C 大調 128 BPM |
| ② correct-answer2（白天，3/4 側身）→ `correct-answer2-s1.png` | ✅ | ✅ | ✅ `clips/final/correct-answer2.mp4` 5 s（Vids 原片 0–7.5 s 加速 1.5×），音樂 F 大調 136 BPM |
| ③~⑫ | ⬜ | ⬜ | ⬜ |

## 踩雷（沿用 SOP §10＋倉鼠／兔子版新增，開工前先讀）
- Vids 對「手摸頭／手靠近頭／手抓動物」的圖會誤判違規，改成手掌貼地、手放旁邊或托在下方。提示詞過長且含大量 `does NOT` 時也可能被誤判，改短。
- Vids 偶爾自己放大／縮小畫面或換掉物件：生完逐段看；重生要換提示詞，不要只按重新生成。
- Vids 面板：「插入」第一次點擊只會捲動，要點兩次；重新整理頁面後 AI 面板會關閉要重開；輸入框 ref 固定、檔案 input ref 每次會變（用 `find`）。
- 不要在提示詞寫 "tripod"；缸門／網蓋要寫 stays CLOSED。
- 混音時用 `apad` 補長；♻️ 保留原音的鏡頭平均音量常偏低（−31～−43 dB），要用自製 acrossfade 濾鏡正規化後再與底樂混。
- 首幀的狀態（水盤空／滿、昆蟲有／無、白天／夜晚、燈亮／暗）必須在 ChatGPT 首幀就畫對，Vids 不會替你補。
- ChatGPT 送出有時沒反應：再點一次送出；頁面卡在「思考中」時重新整理，圖通常已經生好。
- 輸入框要先點擊聚焦再打字，否則文字不會進去。


## 追加規則（答對回饋 ①②，2026-10-23 使用者確認）
- 答對回饋用**白天（早上）版**，守宮要在**畫面正中央**（鏡頭以守宮為中心裁切，不一定在缸中央）、展現可愛開心：① 趴石板瞇眼微笑、② 3/4 側身點頭小跑。
- 做法：ChatGPT 生整缸圖（1672×941，守宮縮小到約躲避屋寬的 0.7）→ 以守宮為中心裁 1174×660（`y=941-660`）→ 縮成 1280×720 當 Vids「動畫」首幀。
- 守宮比例：不可比躲避屋大；涼區溫度計線照原圖（棕色細線從缸蓋垂下、探針貼膠帶在藍灰躲避屋前），不可畫成貼玻璃的黑線。
- Vids 專案「守宮」（`docs.google.com/videos/d/1dpWia6lg6_0cxRjyPe3QMzNUJZnAfpl3TBZ3yrcFI5w`）：每次生成後「在新場景中插入」，匯出整支 mp4 後以 ffmpeg 取 `-ss 前一支長度 -t 10`。時間軸：0–10 s＝①、10–20 s＝②。

## 進度與實作補充（2026-10-23，①–⑦ 已完成使用者確認）
| # | 成品（`飼養前評估影片/gecko/videos/clips/final/`） | 備註 |
|---|---|---|
| ①②③④⑤ | correct-answer / correct-answer2 / first-day(_temps) / refuse-food(_temps) / temperature-check | ③④ 疊溫度數字（24/30、20/25）；⑤ 涼 19°C／暖 24°C |
| ⑥ | `shedding-stuck.mp4`（8.6 s） | **改成「蛻皮卡住」**：腳趾黏白色殘皮、守宮不安，要靠飼主提高濕度或協助；舊版「自己撥皮」收在 `shedding_selfpeel_old.mp4` |
| ⑦ | `sick_full.mp4`（12.5 s，單一首配樂） | 前 4.5 s 全缸（24°C/30°C，蟲直接散在地上、不放碟子）→ 交叉淡入 → 拉近鏡頭後腿發軟「踩棉花」走兩小步後趴平；舊的 `sick.mp4`／`sick-walk.mp4` 為中間檔 |

**新增規則（從 ①–⑦ 學到）**
1. 溫度數字**直接疊在首幀圖上**（PIL，DejaVuSans-Bold，色 (30,44,36)，`NN°C`），不要等影片生成後再補；影片裡的星星浮水印／糊掉數字，用首幀圖裁出螢幕區塊當 patch 用 ffmpeg `overlay` 蓋回去。
2. 守宮畫風：同一段 ChatGPT 對話內連續「edit your last image」最穩；若畫風漂成寫實，明寫 `same cute chibi cartoon style (big round head, large glossy eyes, thick outline)` 並只重畫守宮。表情要「平嘴、半垂眼」，prompt 裡寫 `no smile, flat mouth`。
3. 守宮會吃自己的蛻皮是真的，但影片裡**不要出現嘴碰皮／像在進食**；前爪不要靠近嘴。
4. 蟲：直接散在底材上、守宮不理，不放蟲盤（會被誤認成多一個鈣粉盤）。
5. 「後腿踩棉花」這類細節：全缸廣角生不出來，要用**拉近的首幀**，首幀就畫成後腿彎曲發軟、身體下沉的姿勢，動畫只讓牠在原地發抖、走兩小步就趴下。
6. Vids 操作：`file_upload` 要用**暫存路徑** `/mnt/user-data/uploads/…`（device 路徑會被擋）；新鏡頭用「插入→在新場景中插入」（每次 +10 s）；有選取片段時按鈕是「取代」會覆蓋該場景；匯出後用 `ffmpeg -ss <起點> -t 10` 剪段，並用 md5 確認有換版。
7. 合併多段：`xfade=fade:duration=0.6`，音樂只混一次（`volume=-5~-6dB`、`afade` 入 0.4／出 1.2、`alimiter 0.95`），`volumedetect` 平均約 −18～−24 dB。
8. 底樂腳本：`music/make_*_bed.py`（`hamlib.py`）；shedding-stuck 木吉他 E 小調 58 BPM、sick_full 簧管＋低音墊 D 小調 50 BPM。

**待做**：B 型過場 ⑧–⑫（含 ♻️ 重用鏡頭與飼主入鏡鏡頭，開工前先跟使用者確認範圍）；接線（`assets.ts`／`scenarios.ts`／`journey.ts`／`activity-registry.ts`）。
