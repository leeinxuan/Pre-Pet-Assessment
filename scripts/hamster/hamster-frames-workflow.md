# 倉鼠影片｜首幀鎖定流程（ChatGPT 生首幀 → Google Vids Omni 轉影片 → ffmpeg 拼接）【草稿，待使用者確認】

> 通用規範（必讀）：`Pre-Pet-Assessment/scripts/pet-video-sop.md`。範例：鸚鵡 `scripts/bird/bird-frames-workflow.md`（本檔結構照它）、貓、兔子。
> **分鏡基準＝柴犬版**：鏡頭順序、構圖、節奏照柴犬版（`scripts/dog/shiba-ref-frames/<影片名>-s<N>.png`、`public/assets/dog/pet-journey/shiba/*.mp4`）。沒有動物的鏡頭（車子、辦公室、飼主臉部）重用原片（♻️；busy-day-transition 的飼主臉部要重生，見 SOP 最後補充）；有動物的鏡頭把動物換成倉鼠、場景換成倉鼠籠／客廳。
> 內容依 `docs/hamster-game-planning.md`、`app/data/species/hamster/scenarios.ts`、`journey.ts`。目前倉鼠版情境的影片位置都是 `placeholder`；`app/data/species/hamster/assets.ts` 還沒有 `petJourney` 區塊。

## 檔案存放規則（使用者 2026-10-20 指示）
- **草稿階段**（生成中的首幀、Vids 片段／匯出、合成音樂、備份）一律放使用者桌面資料夾 `飼養前評估影片/hamster/`，依種類分：
  - `start-frames/`（首幀、master、參考圖轉檔）｜`videos/`（Vids 匯出、raw 切段、剪接中間檔）｜`music/`（make_music_*.py 與 wav）｜`backup/`（舊版、ChatGPT 原圖、對照圖）
- **最終確定的成品**才放進專案：`Pre-Pet-Assessment/public/assets/hamster/pet-journey/<影片名>.mp4`（每支 ≤ 15 秒），以及需要保留的 start-frames／音樂腳本放 `scripts/hamster/`。
- 刪除前要先問使用者範圍。

## 素材與外觀
- **角色（已確認：沿用遊戲選擇畫面那隻）**：`public/assets/species/hamster.webp`（滾輪上的倉鼠）；開心 `public/assets/hamster/feeding/hamster-happy.webp`、不開心 `hamster-unhappy.webp`。固定外觀（每個提示詞都貼）：
  `a small round hamster with golden-orange fur on the head and back and a white belly and cheeks, small rounded pink-inner ears, round black bead eyes, a tiny pink nose with long thin whiskers, pink paws and feet, a very short tail, a chubby round body, and thick dark-brown outlines`
- **場景（已確認：遊戲的倉鼠籠＋客廳）**
  - **籠內**（主要）：`public/assets/hamster/room/bg-bedding.webp`（1672×941 橫式，米色木屑墊料、金屬線條籠壁，無動物）＋道具：滾輪 `exercise-wheel.webp`、水瓶 `water-bottle.webp`、食碗 `food-bowl.webp`、躲避屋 `hideout.webp`、砂浴盆 `sand-bath-box.webp`、啃咬棒 `gnaw-stick.webp`、墊料 `bedding.webp`。
  - **安全房間**：`public/assets/hamster/room/hamster-safe-room.webp`（米色客廳：左木門、書櫃、沙發、茶几、右側窗戶、地毯），倉鼠籠改用 `public/assets/hamster/room/hamster-cage-front.webp`（使用者指定的客廳用籠子）放在房間中（放哪裡於 master 時定）。
  - **外出籠**：`public/assets/car/hamster-carrier.webp`。
- **飼主**：棕色馬尾、粉紅針織毛衣、藍色牛仔褲、白襪；人物一律用已核可的飼主角色圖當參考（`arrival-transition-s2.png` 之類，鸚鵡版已有）。
- 參考圖先轉 PNG（webp 在 ChatGPT 不一定能上傳），存 `start-frames/_ref_*.png`。
- **ChatGPT 聊天室**：倉鼠整個專案共用一個新聊天室（開工時建立，把網址記回本檔）。**Vids 專案**：新開「倉鼠」（SOP §5.1），開工時把網址記回本檔。
- 接線：做完後問使用者範圍，再改 `app/data/species/hamster/assets.ts`（新增 `petJourney`）與 `scenarios.ts`／`journey.ts`。

## 統一規則
1. **畫風**：沿用倉鼠素材的深褐粗描邊、細毛筆觸、柔和陰影、暖米色；不粉彩、不染黃。
2. **兩個 master（階段 2，先做、使用者確認後才批次生首幀；master 一律不含倉鼠）**
   - `hamster-cage-furnished-master.png`：依使用者提供的「放滿倉鼠家具的籠子」截圖（2026-10-20）：水瓶掛左壁、黃綠色食碗在左前、黃色三角砂浴盆在中間、木滾輪在右、木圓頂躲避屋在右前、啃咬棒在中間、木屑墊料、金屬線條籠壁；截圖左上角的返回箭頭是 UI，不是畫面內容，不要畫進去。籠子不加寬、不改視角。
   - **食碗滿飼料**：場景需要碗內有飼料時，以 `public/assets/hamster/feeding/food-bowl-full.webp` 為準（空碗用 `room/food-bowl.webp`）。
   - `hamster-room-master.png`：`hamster-safe-room.webp` ＋ 倉鼠籠（`hamster-cage-front.webp`）放在客廳的低櫃／桌上，空籠、無動物。
3. **倉鼠行為要寫實、不擬人**：四肢著地小碎步、用前掌捧食物、頰囊鼓起、梳理臉與耳朵、打哈欠、鑽墊料、跑滾輪、站起來嗅聞（短暫）、白天蜷縮睡覺。**不要**雙手抱胸、揮手、站著走路。動作小而慢。
4. **聲音**：Vids 原音全拿掉，只用自製音樂（SOP §6.2）；不放合成動物音效（滾輪聲、啃咬聲使用者要才做）。
5. **安全規範（照 SOP §9）**：錯誤選項用靜態圖——手抓握倉鼠、兩隻合籠打架、洗澡、生食洋蔥／柑橘、高溫曬太陽、電線、餵零食誘出等**都不拍**；手與倉鼠的互動只有「手掌讓牠站上來」（高齡影片用手掌輕托，不用手指搔頭）；生病用「縮成一團、毛蓬亂、不動、不吃、滾輪沒在轉」，不要血、不要排泄物特寫。
6. 3:2 → 16:9 裁切同鸚鵡（`crop=1536:864:0:Y,scale=1280:720`）。

## 影片清單（共 12 支，對應鸚鵡版）
### A 型（一鏡到底）
| # | 影片 | 對應情境 | 場景 | 動作（Vids 提示詞重點） | 長度 |
|---|---|---|---|---|---|
| ① | correct-answer | 答對回饋 | 籠內中景 | 倉鼠站在滾輪旁開心地搓臉、左右搖晃小身子，眼睛瞇起 | 4–5 s |
| ② | correct-answer2 | 答對回饋 | 籠內 | 倉鼠頰囊鼓鼓地從食碗旁開心跑向躲避屋再探頭 | 4 s |
| ③ | first-day | hamster-arrival-adjustment | 籠內（躲避屋口）| 倉鼠從躲避屋探出頭、鼻子快速抽動，慢慢縮回去；飼主不入鏡 | 8 s |
| ④ | sick | hamster-health-emergency | 籠內 | 倉鼠縮成一團、毛蓬亂、眼睛半閉，滾輪靜止、食碗幾乎沒動 | 8 s |
| ⑤ | nocturnal | hamster-nocturnal | 籠內（白天窗光）| 倉鼠蜷縮在躲避屋口／墊料裡睡覺，只有細微呼吸起伏；中段打一個小哈欠 | 7 s |
| ⑥ | solitary | hamster-solitary | 籠內 | **只有一隻**倉鼠，獨自在籠內理毛、滿足地走動；不出現第二隻 | 7 s |
| ⑦ | picky-eating | hamster-picky-eating | 籠內（食碗特寫）| 食碗裡只剩幾顆瓜子殼，倉鼠頰囊鼓鼓的捧著食物，轉身鑽進躲避屋囤食 | 8 s |
### B 型（多鏡頭過場，整支同一首底樂）
| # | 影片 | 鏡頭（柴犬分鏡） |
|---|---|---|
| ⑧ | arrival-transition（約 11 s） | 車子白天♻️→鳥店改**寵物店領倉鼠**（飼主雙手捧外出籠，籠內倉鼠）→夕陽開車♻️→提籠進家→外出籠放地上、倉鼠探頭→歡迎回家（倉鼠在籠內，字另外疊） |
| ⑨ | busy-day-transition（約 13 s） | 辦公室♻️→倉鼠在夜晚安全房間等待（籠內，躲避屋口）→飼主臉部（**重生**，no bag）→飼主手掌上的倉鼠 |
| ⑩ | time-passes-aging（約 10 s） | 幼鼠笨拙爬動→青年鼠跑滾輪→成鼠站手掌上→老鼠慢慢走動（毛色暗淡、動作慢；依遊戲「毛色不如以前光亮」） |
| ⑪ | busy-daily-care（約 10 s） | 辦公室夜晚♻️→空食碗旁的倉鼠→倉鼠縮著不安（籠內，滾輪沒在轉） |
| ⑫ | senior-life（約 9 s） | 老鼠在躲避屋旁休息→慢慢走向食碗→飼主的手把滾輪／食碗調到更好取用的位置→老鼠站在飼主手掌上被輕托 |

- **老鼠額外指示**：`a senior hamster: the same coloring but slightly faded and duller, a few paler patches around the face, slightly cloudy eyes, fur a little ruffled, a plump healthy body, moving slowly`；**幼鼠**：`a 3-week-old baby hamster, smaller, rounder, with fine soft fur and large dark eyes`。
- 底樂（先確認）：correct-answer 輕快（≥120 BPM、尤克里里＋鐵琴）、correct-answer2 俏皮撥弦、first-day 稀疏柔音鋼琴、sick 慢速小調、nocturnal 輕柔搖籃曲音樂盒、solitary 悠閒木吉他、picky-eating 俏皮馬林巴；過場同鸚鵡版對應曲風，但**避免和鸚鵡版聽起來一樣**（換樂器：鋼片琴／音樂盒／口琴）。

## 流程
1. 階段 2：做兩個 master → 使用者確認。2. 階段 3：每支首幀（同一個 ChatGPT 聊天室，每次重新上傳圖＋`In THIS message, image 1 is…`），全部生完做總覽集中審圖，使用者確認後才進 Vids。3. 階段 4：Vids 新專案「倉鼠」，一支支生、立刻看 contact sheet、插入後核對總長，全部完成匯出一次。4. 階段 5：剪接、合成音樂、混音（**音軌要補到跟畫面等長 `apad`，避免被截斷**）。5. 交付：每支用 SendUserFile；定稿後才複製進專案。

## 進度追蹤
| 影片 | 首幀 | Vids 片段 | 成品 |
|---|---|---|---|
| master：cage-furnished | 🟡 待確認 | ChatGPT 聊天室 https://chatgpt.com/c/6ad76fc0-bc18-83ec-98e6-b820040a6e62 | start-frames/hamster-cage-furnished-master.png |
| master：room | 🟡 待確認（v3：依遊戲截圖，籠子在左側圓桌，去掉飼料袋／名牌／UI） | https://chatgpt.com/c/6ad772d2-8af4-83ec-ac1f-7c34018e8737 | start-frames/hamster-room-master.png |
| ①~⑫ | ✅ | ✅ | ✅ 12 支已進 public/assets/hamster/pet-journey/（2026-10-21 使用者確認） |

## 踩雷（沿用 SOP §10＋鸚鵡版新增，開工前先讀）
- Vids 對「手摸頭／手靠近頭」的圖會誤判違規（鸚鵡 s4 連 4 次），改成手放旁邊或手掌托著。提示詞過長且含大量 `does NOT` 時也可能被誤判，改短。
- Vids 偶爾自己放大／縮小畫面或換掉物件（繩梯變木梯）：生完逐段看；重生要換提示詞，不要只按重新生成。
- 不要在提示詞寫 "tripod"（會畫出攝影三腳架）；籠門要寫 stays CLOSED。
- 混音時用 `apad` 把 Vids 原音補長到畫面長度，否則音樂會在原音結束處斷掉。
- ChatGPT 送出有時沒反應：再點一次送出；頁面卡在「思考中」時重新整理，圖通常已經生好。

## 完成紀錄（2026-10-21，使用者已確認）
- 12 支成品全部完成，放在 `public/assets/hamster/pet-journey/<name>.mp4`（皆 ≤15 s、1280×720、含音軌）。尚未接到 `app/data/species/hamster/assets.ts`。
- 產線腳本：`scripts/hamster/build_finals.py`（剪接＋混音）、`hamlib.py`／`make_beds.py`（合成底樂）。草稿與各版本在桌面 `飼養前評估影片/hamster/`。
- 單一 ChatGPT 對話：https://chatgpt.com/c/6ad775b6-15d4-83e8-bc74-95c7a999c304 ；Vids 專案：https://docs.google.com/videos/d/1IGFI9ELOzbj2t2AjElddqwh9oCMMXlXkBUVQfsVt6lw/edit

### 新增踩雷與技巧
- Vids 面板：「插入」第一次點擊只會捲動，要點兩次；重新整理頁面後 AI 面板會關閉；插入後時間軸應 +10 s，匯出後抽樣確認片段順序。
- Vids 會幻覺出多餘物件（多一間屋子、堆疊木頭取代沙浴）：prompt 明寫「no other house / no stacked logs / sand bath stays」。
- 滾輪會自己動：用 ffmpeg alphamerge＋羽化遮罩，把滾輪區域凍結成第 0 幀（sick、busy-daily-care 末鏡）。
- **老年轉場（time-passes-aging）首幀一開始生圖就要有復古感**：前面的回憶鏡頭（幼鼠、青年鼠、成鼠）在 ChatGPT 生首幀的 prompt 就要寫明暖色復古／老照片質感（warm vintage film look、faded golden tones、soft grain、gentle vignette、slightly lifted blacks；不要發黑、不要偏冷），讓 Vids 生出的影片本身就帶回憶感；最後一鏡（現在的老鼠）首幀維持乾淨正常色調、不加復古。不要只靠 ffmpeg 後製濾鏡硬疊，否則會又黑又假。
- 回憶濾鏡（aging，後製只做輔助微調）：暖色 colorbalance＋輕微 screen 柔光＋vignette＋細噪點，最後一鏡用 blend 的 T 斜坡漸變成無濾鏡。
- 貼紙（arrival）：PNG 以 overlay＋alpha fade 疊在右上，避開倉鼠位置。
- 夜晚場景要在首幀就畫成夜晚；碗的狀態（空／滿）要在首幀指定。
- ♻️ 重用鏡頭保留原音，用 acrossfade 銜接底樂，alimiter=limit=0.8:level=0 防爆音；底樂不 loop，apad 補滿。
- ChatGPT 下載圖：DOM 順序不可靠，要檢查檔案大小，必要時用 (1) 重複檔。
