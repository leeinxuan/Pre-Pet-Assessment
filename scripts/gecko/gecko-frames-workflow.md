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

## 統一規則
1. **畫風**：沿用守宮素材的深褐粗描邊、柔和陰影、暖米色；不粉彩、不染黃。斑點樣式、尾巴粗細全程一致。
2. **兩個 master（階段 2，先做、使用者確認後才批次生首幀；master 一律不含守宮）**
   - `gecko-terrarium-furnished-master.png`：以 `bg-gecko-terrarium-substrate.webp` 為底，佈置好暖側（左：暖躲避屋＋溫度計）、涼側（右：涼躲避屋）、濕躲避屋、淺水盤（盛水）、鈣粉盤；**底材一律用椰纖／紙巾／磁磚，絕不出現鬆散細沙**（遊戲反面教材）。缸框與玻璃反光位置固定、視角固定。
   - `gecko-room-master.png`：`gecko-room.webp` 客廳＋缸放在房間低櫃／桌上，空缸、無守宮。
   - **水盤與鈣粉盤**：需要「有水」用 `shallow-water-dish-full.webp` 為準，需要「空」要在首幀明寫 `empty`（倉鼠版教訓：碗要空／滿都要在首幀指定，Vids 不會自己改）。
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
| ⑤ | temperature-check | gecko-temperature-check | 缸內（冷天、室內偏暗） | 溫度計（暖側 24°C／涼側 19°C）特寫帶守宮縮在暖側躲避屋，動也不動；加熱墊指示燈不亮感 | 7–8 s |
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
| master：terrarium-furnished | ⬜ | ⬜ | ⬜ |
| master：room | ⬜ | ⬜ | ⬜ |
| ①~⑫ | ⬜ | ⬜ | ⬜ |

## 踩雷（沿用 SOP §10＋倉鼠／兔子版新增，開工前先讀）
- Vids 對「手摸頭／手靠近頭／手抓動物」的圖會誤判違規，改成手掌貼地、手放旁邊或托在下方。提示詞過長且含大量 `does NOT` 時也可能被誤判，改短。
- Vids 偶爾自己放大／縮小畫面或換掉物件：生完逐段看；重生要換提示詞，不要只按重新生成。
- Vids 面板：「插入」第一次點擊只會捲動，要點兩次；重新整理頁面後 AI 面板會關閉要重開；輸入框 ref 固定、檔案 input ref 每次會變（用 `find`）。
- 不要在提示詞寫 "tripod"；缸門／網蓋要寫 stays CLOSED。
- 混音時用 `apad` 補長；♻️ 保留原音的鏡頭平均音量常偏低（−31～−43 dB），要用自製 acrossfade 濾鏡正規化後再與底樂混。
- 首幀的狀態（水盤空／滿、昆蟲有／無、白天／夜晚、燈亮／暗）必須在 ChatGPT 首幀就畫對，Vids 不會替你補。
- ChatGPT 送出有時沒反應：再點一次送出；頁面卡在「思考中」時重新整理，圖通常已經生好。
- 輸入框要先點擊聚焦再打字，否則文字不會進去。
