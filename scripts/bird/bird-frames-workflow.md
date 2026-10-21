# 鸚鵡影片｜首幀鎖定流程（ChatGPT 生首幀 → Google Vids Omni 轉影片 → ffmpeg 拼接）

> 通用規範（必讀）：`scripts/pet-video-sop.md`。範例：`scripts/cat/cat-frames-workflow.md`、`scripts/rabbit/rabbit-frames-workflow.md`。
> **分鏡基準＝柴犬版**：每支影片的鏡頭順序、構圖、動作節奏都照柴犬版（`scripts/dog/shiba-ref-frames/<影片名>-s<N>.png`、`public/assets/dog/pet-journey/shiba/*.mp4`）。沒有動物的鏡頭（車子、辦公室、飼主臉部）直接重用原片（♻️）；有動物的鏡頭，以柴犬分鏡當構圖參考，把動物換成鸚鵡，場景換成鸚鵡的生活空間。
> 內容依鸚鵡版遊戲（`docs/bird-game-planning.md`、`app/data/species/bird/scenarios.ts`、`journey.ts`）規劃。目前鸚鵡版所有情境的影片位置都是 `placeholder`；`app/data/species/bird/assets.ts` 還沒有 `petJourney` 區塊。
>
> - **兩個場景（鸚鵡和兔子一樣有自己的生活空間＝鳥籠）**
>   - **籠內（主要場景）**：使用者提供的鳥籠內部圖（＝`public/assets/bird/room/bg-cage-interior-feces-tray.webp`，**直式 2:3**、正面視角、**沒有鳥**）。**保持原本的直式鳥籠，不要改成橫式、不要把籠子加寬。**內有：頂部溫濕度計、右上掛式藤球＋木塊串、中央木棲木＋垂下的繩圈、左側繩梯＋木階、右側飲水瓶＋食碗、右下天然樹枝棲木、白色線網底盤＋綠色抽屜。16:9 的首幀只取籠子的一段（上段／中段／下段），**不必拍到籠子最頂端或最底端**。日常、情境題影片絕大多數在這裡發生。
>   - **安全房間（籠所在的室內）**：`public/assets/bird/room/bird-safe-room.webp`（米色牆、淺色木地板、左側木門、右側窗戶、沙發、茶几、地毯、右側木櫃、牆上相框）。鳥籠放在右側牆邊（`bird-cage.webp` 外觀）。用於過場、第一天、放飛、飼主進門等需要整間房的鏡頭。
> - **鸚鵡外觀參考**：`public/assets/bird/feeding/bird-happy.webp`（開心、瞇眼張嘴）、`bird-unhappy.webp`（不安）；選擇畫面圖 `public/assets/species/bird.webp`（綠身黃頭、站在 T 型棲木）；手上版 `public/assets/bird/dailygame/bird-on-hand-sing.webp`
> - **物件參考**：鳥籠外觀 `public/assets/bird/room/bird-cage.webp`（奶油色塑膠框＋米色鐵絲、綠色底盤與抽屜、正面有門）／`bird-cage-front.webp`；外出籠 `public/assets/car/bird-carrier.webp`（**透明圓頂、粉紅色底座、奶油色提把與斜坡門**）；遮光布 `public/assets/car/bird-cover-cloth.webp`（米色折疊布）；棲木、玩具、碗在 `public/assets/bird/room/`
> - 參考圖已先轉成 PNG（webp 在 ChatGPT 不一定能上傳；透明背景已壓平成米色底）：`scripts/bird/_backup/_ref_*.png`
> - 首幀存放：`scripts/bird/start-frames/<影片名>-s<鏡頭>.png`（1280×720）
> - Vids 片段存放：`public/assets/bird/pet-journey/clips/<影片名>-s<鏡頭>.mp4`
> - 成品輸出：`public/assets/bird/pet-journey/<影片名>.mp4`（每支 **≤ 15 秒**）
> - ChatGPT 聊天室（整個鸚鵡專案共用）：<https://chatgpt.com/c/6ad58bfa-ac70-83e8-a3d4-59625cbb1178>
> - Vids 專案：**新開一個專案，命名「鸚鵡」**（SOP §5.1），專案網址：`https://docs.google.com/videos/d/1F1leZDIJ_IT-1I3zQeCYatfCEYwBqiQMwG779ErON4U/edit`（2026-10-19 已新開，空白，只有 1 個預設空白場景）
> - 接線：做完後在 `app/data/species/bird/assets.ts` 新增 `petJourney` 區塊（格式比照 `app/data/species/rabbit/assets.ts`），再把 `scenarios.ts`／`journey.ts` 的 `sceneMedia`、`correctFeedbackMedia`、`busyCarePresentation` 從 `placeholder` 改成對應影片。接線範圍開工時先問使用者。

---

## 統一規則

1. **畫風只有一種**：沿用鸚鵡素材（`bird-happy.webp`、`bg-cage-interior*.webp`、`bird-safe-room.webp`）的畫風——乾淨的深褐色描邊、細羽毛筆觸、柔和陰影、暖米色調。不要粉彩、不要細線、不要整張染黃。
2. **場景（兩個，不要混用視角）**
   - **籠內**：以 `bird-cage-master.png`（＝使用者的**直式原圖**，不重畫、不加寬）為圖 1，首幀請 ChatGPT 輸出**橫式 3:2、只取籠子的一段**（見【鸚鵡新增指令・籠內】的「取景」）。固定正面視角、鏡頭不動；裡面的物件（溫濕度計、藤球串、棲木＋繩圈、繩梯、飲水瓶、食碗、樹枝棲木）樣式、相對位置與大小全程不變。需要增減物件時（例如食碗變空、水瓶變少）在【籠內新增指令】的額外指示明寫。
   - **安全房間**：以 `bird-room-master.png` 為圖 1（`bird-safe-room.webp` ＋ 放進鳥籠）。需要外出籠時加 `bird-carrier.webp` 當圖 3。
   - 兩個 master 滿意後存到 `scripts/bird/start-frames/`，**之後所有首幀都以它們為圖 1**（貓版第二輪踩過：場景每張都不一樣，同一支影片前後會穿幫）。**master 一律不含鳥**（SOP §3，避免被 master 裡的鳥帶偏）。
   - 戶外、車內、辦公室、收容所類鏡頭沿用柴犬版／貓版（♻️ 原片，或圖 1 ＝ 柴犬分鏡把動物換成鸚鵡）。
3. **鸚鵡固定外觀（每個提示詞都貼）**：
   `a small budgerigar (parakeet) with a bright yellow face and chest fading to light lime-green on the belly, back and tail base, black-and-yellow scalloped wing and back markings, a blue cere above a small beak, two small blue cheek patches, a long tapered blue-green tail, pink feet, and thick dark-brown outlines`
   **已確認（2026-10-19）：鸚鵡外觀以 `bird-happy.webp` 為準**（黃臉黃胸、淡綠腹背）。角色參考圖一律用 `_ref_bird_happy.png`；選擇畫面圖 `bird.webp` 較綠，只當參考、不當準則。生圖時若鳥變得太綠，在指令加強 `bright yellow face and chest`。
4. **飼主固定外觀**：棕色馬尾、粉紅色針織毛衣、藍色牛仔褲、白襪（沿用貓版／兔子版／柴犬版，no hoodie, no bag）。人物一律用已核可的飼主角色圖當參考，不要只靠文字（SOP 踩雷 B-2）。
5. ChatGPT 只出 3:2（1536×1024），下載後用 ffmpeg `crop=1536:864:0:Y,scale=1280:720` 裁成 16:9（Y 看構圖，通常 50–70；鳥頭靠最上緣時用小 Y）。
6. **鸚鵡行為要寫實，不擬人化**：鸚鵡用兩隻腳抓棲木站立（不是站在地上走），會左右橫移、轉頭、理羽、抖羽、展翅拍一下、用嘴巴＋腳爬繩梯。**不要**：站在人手以外的地面上昂首走路、用翅膀「揮手」、雙手抱胸等擬人動作。動作要小而慢：Vids 生成快速拍翅常常糊成一團或多長一隻翅膀，所以展翅只寫「短暫地」。
7. **鸚鵡會學人說話，但遊戲裡一律不要**：所有 prompt 都寫 `no human voices, no speech, the bird does not talk or mimic words`。
8. **安全／內容規範**（鸚鵡版特有，其餘照 SOP §9）
   - 題目裡的**錯誤選項不做影片**：用手抓握鸚鵡、強迫牠進籠、多人圍觀、餵酪梨／巧克力／鹹食、特氟龍鍋／噴霧／香氛蠟燭／毒植物、籠門敞開放著不管、長時間蓋布不通風——這些都只用靜態圖。
   - **手與鳥的互動只有一種：手指給鳥站上去，或指尖輕搔頭頂。**不要握住身體、不要捏翅膀。
   - 生病用「澎毛縮成一團、眼睛半閉、不動、不吃」表現，不要血、不要嘔吐、不要糞便特寫、不要鳥掉在籠底抽搐。
   - 鳥只在籠內或安全房間；房間裡放飛的鏡頭窗戶要看起來是關著的。

## 流程（Claude in Chrome 自動化）

1. **鸚鵡所有首幀都在同一個 ChatGPT 聊天室生成**（使用者 2026-10-19 指示）：<https://chatgpt.com/c/6ad58bfa-ac70-83e8-a3d4-59625cbb1178>（標題「Generate Edited Image」，房間 master 就是在這裡生的）。每次送出前仍要**在這則訊息重新上傳需要的圖**，並在指令開頭寫 `In THIS message, image 1 is the first attached image, image 2 the second…`，避免和聊天室裡先前的圖混淆；一次只送一題，等圖出來再送下一題。用 `file_upload` 上傳圖 1（該鏡頭場景的 master：`bird-cage-master.png` 或 `bird-room-master.png`）、圖 2（鸚鵡參考 `_ref_bird_happy.png`，或老／幼鳥時仍用它再加額外指示）、圖 3（需要的物件／飼主參考）。**上傳完等 ≥ 6 秒縮圖出現再打字。**
2. 貼【鸚鵡新增指令】＋該鏡頭【額外指示】→ 送出 → 檢查（綠黃配色符合、藍色蠟膜與臉頰斑、只有一隻鳥、鳥小於籠子、籠內物件沒變、籠子沒多出一面牆）。
3. 下載 → ffmpeg 裁切 → 存 `scripts/bird/start-frames/`。
4. Vids →「製作 AI 影片」(Omni, 720p, 10 秒)：上傳首幀，提示詞以 `Use this image as the exact first frame and animate it.` 開頭，貼【動作】＋【通用結尾】＋【通用音訊結尾】。
5. 先按「送出」等新預覽出現，才按「插入 → 在新場景中插入」；插入後立刻刪多餘空白場景；核對總長增加 10 秒（SOP §5.1）。
6. 全部生完一次匯出，用 ffmpeg `-ss/-t` 切段 → `clips/`。多鏡頭用 `python3 scripts/cat/splice.py OUT.mp4 [--xf 0.25] SRC:START:DUR ...`。

---

## 階段 2：兩個 master（先做，使用者確認後才批次生首幀）

**① `bird-cage-master.png`（籠內，直式原圖，不含鳥）**
- 圖 1 ＝ 使用者提供的鳥籠內部圖（`_ref_cage_interior_tray.png`），圖 2 ＝ `_ref_bird_cage.png`（籠外觀，只用來對照材質與顏色）。
```
（不需要生成。`bird-cage-master.png` 直接使用使用者提供的直式圖，已複製到 `scripts/bird/start-frames/bird-cage-master.png`，1024×1536。2026-10-19 使用者指示：**保持直式、不要橫式化**；先前重畫成橫式的版本已退件，存在 `_backup/_rejected_cage_master_widened.png`。）
```
- 取景對照（直式原圖 1024×1536 上的大致位置，供首幀指令的「取景」使用）：**上段**＝溫濕度計＋右上藤球串＋上方橫棲木；**中段**＝橫棲木＋繩圈＋左側繩梯＋右側水瓶與食碗（最常用，大多數鏡頭用這段）；**下段**＝食碗＋樹枝棲木＋白網地板＋綠色抽屜。每支首幀換不同取景以避免構圖重複。
- 檢查：**直式籠子的樣式沒有被改**（沒有變寬、繩梯仍在左側貼著籠壁、溫濕度計仍是單一圓表）、物件齊全、**沒有鳥**。

**② `bird-room-master.png`（安全房間，放進鳥籠，不含鳥）**
- 圖 1 ＝ `_ref_bird_safe_room.png`，圖 2 ＝ `_ref_bird_cage.png`（籠外觀）。
```
Edit image 1, a cosy living room. Add the bird cage from image 2 standing on top of the low wooden sideboard that already stands against the back wall at the right-hand side of the room (the long low cabinet on the back wall, not the small cabinet next to the window). The cage sits centred on the top of that sideboard, with its feet resting on the sideboard top, clearly visible but not oversized. The cage must look exactly like image 2 (cream plastic frame, cream wire bars, front door with a latch, green floor grid and green tray drawer) and is EMPTY: no bird, no animals, no people. Do not add a stand or any other furniture. Keep everything else in image 1 exactly unchanged (door, window, sofa, coffee table, rug, both cabinets, picture frames, floor, framing, lighting, colors). Draw the cage in the same illustration style as image 1: clean dark-brown outlines, soft shading, warm tone. Do not add anything not mentioned, no yellow or sepia filter. Landscape 1536x1024, important content away from the top and bottom edges. Please generate the image now.
```
- 同時請使用者確認籠內底盤（使用者的內部圖是白網＋綠抽屜、外觀圖是綠網）以哪個為準——預設以內部圖為準，外觀圖只用在房間鏡頭。

---

## 共用段落

**【鸚鵡新增指令・籠內】（圖 1 = `bird-cage-master.png`（直式原圖），圖 2 = 鸚鵡參考，圖 3 = 視需要的物件／飼主參考）**
```
Edit image 1, the inside of an empty bird cage seen front-on (a tall portrait image). Make a LANDSCAPE 3:2 image that shows only the [FRAMING] of this same cage, as a cropped medium shot: do NOT widen, redesign or rotate the cage, keep its original tall proportions, bars, accessories and drawing style exactly as in image 1; it is fine if the top or the bottom of the cage is not visible. Add the bird from image 2 inside the cage as described below: a small budgerigar (parakeet) with a bright yellow face and chest fading to light lime-green on the belly, back and tail base, black-and-yellow scalloped wing and back markings, a blue cere above a small beak, two small blue cheek patches, a long tapered blue-green tail, pink feet. The bird must be small compared with the cage: a perched bird is about as wide as half the length of the wooden perch. Exactly ONE bird. Keep every accessory visible in that part of the cage (thermometer-hygrometer, rattan-ball hanging toy, wooden perch with rope ring, rope ladder, water bottle, food bowl, natural wood branch perch) with the same design, positions and sizes as in image 1, except for the changes described below. Draw in the same illustration style as image 1 and image 2: clean dark-brown outlines, fine feather-texture strokes, soft shading, warm tone. Do not add anything not mentioned, no yellow or sepia filter. Landscape 1536x1024, important content away from the top and bottom edges. Please generate the image now.
```
- `[FRAMING]` 換成取景：`upper part (thermometer, hanging rattan toy and the upper perch)`／`middle part (the wooden perch with the rope ring, the rope ladder on the left, the water bottle and food bowl on the right)`／`lower part (food bowl, branch perch, wire floor and the green tray drawer)`。

**【鸚鵡新增指令・房間】（圖 1 = `bird-room-master.png`，圖 2 = 鸚鵡參考，圖 3 = 外出籠／飼主參考，視需要）**
```
Edit image 1, a cosy living room with an empty bird cage standing on the low wooden sideboard against the back wall at the right. Add the bird from image 2 as described below: a small budgerigar (parakeet) with a bright yellow face and chest fading to light lime-green on the belly, back and tail base, black-and-yellow scalloped wing and back markings, a blue cere above a small beak, two small blue cheek patches, a long tapered blue-green tail, pink feet. Exactly ONE bird, small compared with the room. Use image 3 only as a reference for the object or person described. Keep everything in image 1 exactly unchanged (room, door, window, furniture, cage, picture frames, floor, framing, lighting, colors) except for the changes described below. Draw in the same illustration style as image 1 and image 2: clean dark-brown outlines, fine feather-texture strokes, soft shading, warm tone. Do not add anything not mentioned, no yellow or sepia filter. Landscape 1536x1024, important content away from the top and bottom edges. Please generate the image now.
```

**【Vids 通用結尾】**
```
Animate this exact image. Keep the art style, outline thickness, colors, lighting, background and the bird's design exactly as in the start frame for the whole clip. The bird keeps its yellow face and chest, light-green body, scalloped wing markings, blue cere and cheek patches, long blue-green tail. Exactly one bird. Locked static camera, no zoom, no pan, no cuts. The bird moves realistically like a real budgerigar: small head turns, small sideways hops along the perch, feather fluffing, brief gentle wing flutters. Keep wing movement short, never blurry. Not anthropomorphized. The cage bars and every object stay exactly where they are. No text appears.
```

**【Vids 通用音訊結尾】**
```
AUDIO: quiet room tone only. Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no laughing, and the bird does not talk or mimic any words. No music, no distorted, synthetic or eerie sounds.
```
（成品的聲音不用 Vids 原音，見「聲音規則」。）

**幼鳥額外指示（time-passes-aging 鏡頭 1）**
```
Draw the bird as a 2-month-old young budgie: the same yellow and green coloring, but the forehead and crown covered with fine dark barred stripes reaching down to the cere, a smaller, rounder body, a shorter tail and large dark eyes.
```
**老鳥額外指示（senior-life、time-passes-aging 鏡頭 4）**
```
Draw the bird as a senior: the same coloring but slightly faded and duller, a few paler patches on the face, slightly cloudy eyes, feathers a little ruffled but NOT puffed up, a plump healthy body (not thin), a shorter, slightly worn tail, sitting calmly on a low perch.
```

---

## 聲音規則（每支都要遵守；細節見 SOP §6.2 三層規則）

- **第 1 層 原音**：與其他物種共用的鏡頭（辦公室打字、車子）保留素材原音，音樂在該鏡頭結束後才進來。新生成的鏡頭一律靜音（Vids 原音全部拿掉）。
- **第 2 層 底樂（每支一首）**：大調、輕柔、簡單，同一物種內不要太像；過場動畫整支只用一首、不循環。生病（sick）可用慢速稀疏小調。建議（可再調整，先和使用者確認）：

| 影片 | 底樂 |
|---|---|
| correct-answer | **輕快、有活力**（使用者指定）：明亮大調、速度偏快（約 120 BPM 以上）、尤克里里／音樂盒＋鐵琴 jingle，節奏跳躍、帶開心感，不要拖慢或太抒情 |
| correct-answer2 | 俏皮撥弦＋木琴 |
| first-day | 稀疏、試探的鋼片琴／柔音鋼琴 |
| sick | 慢速（約 46 BPM）小調、低音 drone＋極稀疏柔音鋼琴（虛弱不詭異；樂器避開兔子版 sick 的鋼琴） |
| arrival-transition | 溫暖希望的鋼琴＋弦樂 |
| busy-day-transition | 指彈吉他＋弦樂墊（溫暖回家） |
| busy-daily-care | 疲憊但溫柔的獨奏鋼琴（A 小調，不加時鐘滴答） |
| time-passes-aging | 前段活潑、後段懷舊的鋼琴（同一首） |
| senior-life | 緩慢懷舊鋼琴＋弦樂墊 |
| ⑤⑥⑦ 日常行為三支 | excessive-calling＝輕快拇指琴；stereotypy＝規律簡單的撥弦；picky-eating＝俏皮馬林巴 |

- **第 3 層 動作音效**：預設不加。鳥叫聲、拍翅、啄食聲**合成出來容易顯得奇怪**；使用者明確要才做，而且：
  - 只出現在動作的時間窗內（用 4 fps 逐格確認動作起訖，窗外靜音）。
  - 鳥叫聲優先用 **CC0 實錄**（OpenGameArt／Freesound 的 CC0 項目；在使用者的 Chrome 下載、需先徵得同意），存 `scripts/bird/sfx-cc0/` 並附 `LICENSE.txt`；合成適合的只有輕柔的聲音（羽毛抖動、爪子輕刮棲木）。
  - 鸚鵡真實會有的聲音：輕柔啾鳴、磨嘴（放鬆時的細碎磨喙聲）、拍翅、爪子抓棲木、咬開種子殼、喝水。**不要**人聲或學舌。
- 重做音軌不必重跑 Vids：視訊 `-c:v copy`，只換音軌。驗收：平均音量約 −18～−24 dB（`volumedetect`），再請使用者聽。

---

## A 型：一鏡到底

> 每支標註：**柴犬分鏡對照**（`scripts/dog/shiba-ref-frames/`）→ 鸚鵡版怎麼改。**必做**＝對照貓／兔子 11 支清單的必要影片；⑤⑥⑦ 是日常行為題（`journey.ts` 的 `birdDailyBehaviorScenarioIds`），**使用者已確認要做（2026-10-19）**，排在必做之後。

### ① `correct-answer.mp4`（4–5 秒）｜必做
- 對應：所有答對的回饋（`correctPrimary`）
- 柴犬分鏡：`correct-answer-s1.png`（坐著面向鏡頭、瞇眼微笑）→ 鸚鵡站在中央棲木、面向鏡頭
- 場景：籠內（圖 1 = `bird-cage-master.png`）
- 首幀：【籠內】＋`The bird perches on the wooden perch at the centre of the cage facing the camera, eyes squeezed shut in a happy smile, beak slightly open, feathers relaxed and fluffy.`（表情參考 `bird-happy.webp`）
- 構圖：中景，鳥佔畫面高度約 25–30%，棲木、繩圈、兩側物件都在框內。
- 動作：
```
The bird sits on the perch facing the camera with its eyes closed in contentment, its head gently bobbing and its feathers softly ruffling. It gives one small happy shuffle sideways along the perch, then settles and slowly blinks.
```

### ② `correct-answer2.mp4`（4 秒）｜必做
- 對應：答對回饋的第二支（`correctSecondary`）
- 柴犬分鏡：`correct-answer2-s1.png`（3/4 側身、尾巴大幅搖擺）→ 鸚鵡 3/4 側面、在繩圈旁開心展翅一下
- 場景：籠內，**構圖和 ① 不同**：靠近繩圈那側、略低角度
- 首幀：【籠內】＋`The bird stands on the perch beside the hanging rope ring in three-quarter side view, head turned toward the camera with bright eyes, wings folded.`
- 動作：
```
The bird shuffles sideways along the perch, briefly opens both wings for one quick joyful flutter, folds them back, tilts its head and chirps silently with its beak slightly open, then settles. Wing movement is short and clean.
```

### ③ `first-day.mp4`（10 秒，Vids 生成 8 秒即可）｜必做
- 對應：`bird-arrival-adjustment`「第一天適應新家」
- 柴犬分鏡：`first-day-s1.png`（狗從外出籠探頭）→ 鸚鵡縮在外出籠一角
- 場景：安全房間（圖 1 = `bird-room-master.png`，圖 3 = `_ref_bird_carrier.png`）
- 首幀：【房間】＋`The pink-based carrier with a clear dome (image 3) sits on the wooden floor right next to the bird cage, with its door closed. Inside the carrier, the bird is huddled in one corner on the floor of the carrier with its feathers fluffed up into a round ball, eyes half open. Nobody is in the room. The carrier must keep its clear dome, pink base, cream handle and ramp door.`
- 動作：
```
The bird stays huddled and fluffed in the corner of the carrier, almost motionless, only its breathing moving the feathers. Its head turns very slightly toward a faint sound, then returns; it blinks slowly twice. No people appear, nobody touches or approaches the carrier. The carrier, the cage and everything in the room stay exactly where they are.
```
- 注意：**畫面不出現遮光布、手、人**（遮光布是正確答案，不在影片揭曉；開門／移籠／多人圍觀都是錯誤選項，不可出現）。

### ④ `sick.mp4`（8 秒）｜必做
- 對應：`bird-health-emergency`「今天澎毛縮在角落」
- 柴犬分鏡：`sick-s1.png`（狗坐在食碗旁、低頭猶豫）→ 鸚鵡縮在籠內角落低棲木、食碗滿的沒動
- 場景：籠內
- 首幀：【籠內】＋`The bird perches on the low branch perch in the lower corner of the cage, fluffed up into a round ball with its head sunk into its shoulders and its eyes half closed, looking dull. The food bowl is full and untouched, the water bottle is full.`（表情參考 `bird-unhappy.webp`，但眼睛半閉）
- 動作：
```
The bird stays fluffed up and nearly motionless on the perch, its sides rising slowly with each breath and its tail dipping slightly with each breath. Its eyes close halfway, open a little, then close again. It does not move toward the food bowl. Very slow, small movement.
```
- 注意：不要血、嘔吐、糞便；要適合兒童／學生觀看；不要讓鳥掉到籠底。

### ⑤ `excessive-calling.mp4`（7 秒）
- 對應：`bird-excessive-calling`「一直叫」（柴犬版 `barking`）
- 柴犬分鏡：`barking-s1.png`（張嘴吠叫、身體前傾）→ 鸚鵡昂首張嘴、短暫抬翅
- 場景：籠內，略仰角
- 首幀：【籠內】＋`The bird stands on the top perch with its head thrust forward and up and its beak wide open in a loud call, wings slightly lifted from its body, bright wide eyes.`
- 動作：
```
The bird calls repeatedly: its beak opens wide with each call, its head bobs forward and up, and its wings lift slightly from its body for a moment. Midway it pauses, closes its beak and tilts its head to listen, then calls twice more. It does not leave the perch.
```

### ⑥ `stereotypy.mp4`（7 秒）
- 對應：`bird-stereotypy`「一直重複做同一件事」（柴犬版沒有對應，構圖自訂）
- 場景：籠內，正面中景
- 首幀：【籠內】＋`The bird stands at the left end of the long wooden perch, body slightly tense, looking straight ahead.`
- 動作：
```
The bird walks sideways along the wooden perch to the right end, stops, turns its head, then walks back to the left end, again and again in the exact same rhythm, with the same stiff, repetitive motion and no interest in the toys or the food. The cage and all objects stay exactly where they are.
```

### ⑦ `picky-eating.mp4`（8 秒）
- 對應：`bird-picky-eating`「只挑喜歡的吃」（柴犬版沒有對應）
- 場景：籠內，靠近食碗的特寫（食碗佔畫面右半）
- 首幀：【籠內】＋`Close view of the food bowl at the right of the cage, filled with mixed seeds. The bird stands on the edge of the bowl looking into it. A few husks and seeds lie on the floor tray below.`
- 動作：
```
The bird dips its head into the bowl, picks out one large seed, holds it in its beak and cracks the husk, and lets the husk fall. It tosses a small pellet aside with its beak, then picks another large seed. Small, natural, tidy movements.
```
- 注意：不出現巧克力、酪梨、鹹食；種子用普通混合穀物。

> 不做影片、以靜態圖處理：`bird-puffing-feathers`（和 sick 畫面重複）、`bird-molting-care`（`journey.ts` 目前沒有引用這兩題，真的要做時再補）、籠內巡視活動（已有互動素材）、鳥的考驗。

---

## B 型：多鏡頭（5 支）

♻️ = 沒有鳥的鏡頭，直接剪柴犬原片（`public/assets/dog/pet-journey/shiba/`，貓版／兔子版同一段也可），連同原音使用。

### ⑧ `arrival-transition.mp4`（約 10–14 秒）｜過場：整支同一首底樂
柴犬分鏡：`arrival-transition-s1…s6.png`

| 鏡頭 | 柴犬分鏡 | 首幀 | 保留 | 做法 |
|---|---|---|---|---|
| 1 車子白天 | s1 | — | 0–1.4s | ♻️ |
| 2 鳥店領鳥 | s2（跪著把狗放進籠） | `arrival-transition-s2.png`：飼主蹲著，雙手捧著粉紅底座透明圓頂的外出籠，籠內鸚鵡站在小棲木上；背景是整排小鳥籠（沒有狗） | 2s | 換鳥 → Vids |
| 3 夕陽開車 | s3 | — | 3.5–5s | ♻️ |
| 4 提籠進家 | s4（提籠進客廳） | 圖 1 = `bird-room-master.png`＋【房間】＋飼主雙手穩穩提著外出籠走進房間，籠內鳥安靜站著 | 1.5–2s | 新增 → Vids |
| 5 籠門打開 | s5（籠門開、狗探頭） | 【房間】＋外出籠放在鳥籠旁地板上、斜坡門放下，鳥站在籠門口邊緣望著旁邊敞開的鳥籠 | 2s | 新增 → Vids |
| 6 歡迎回家 | s6（狗坐著、字樣在左） | 【房間】＋鳥安靜站在鳥籠裡的棲木上（沒有字，不蓋住鳥） | 2–3s | 新增 → Vids，字另外疊 |

鏡頭 2：
```
The woman kneels and holds the carrier steadily in both hands; inside, the bird stands on its small perch, turns its head to look around the shop and back at her, calm, feathers smooth. The small cages in the background stay where they are.
```
鏡頭 4：
```
The woman walks slowly into the room carrying the carrier steadily level with both hands; the bird inside sways gently with her steps and holds on to its perch. She stops near the bird cage.
```
鏡頭 5：
```
The ramp door of the carrier is down. The bird slowly leans out, looks at the open cage beside it, takes one careful sideways hop along the edge, and stops. Nobody touches the bird.
```
鏡頭 6：
```
The bird sits calmly on the perch in the cage, head turning slowly to look around the room, feathers smooth, eyes blinking slowly. Very small, quiet movement.
```
- 「歡迎回家」字：沿用貓版結論——不要烤進畫面、不要蓋住鳥。ChatGPT 綠幕圖（`#00FF00` 背景）→ PIL 去背成透明 PNG → ffmpeg overlay＋alpha 淡入，寬約 0.36 倍畫面寬、放在畫面左上偏中、離左邊至少 12%（網頁版會裁掉左右邊緣）。

### ⑨ `busy-day-transition.mp4`（約 13 秒）｜過場：整支同一首底樂（用指彈吉他＋弦樂）
柴犬分鏡：`busy-day-transition-s1…s5.png`

| 鏡頭 | 柴犬分鏡 | 首幀 | 保留 | 做法 |
|---|---|---|---|---|
| 1 辦公室白天→夜 | s1 | — | 0–5s | ♻️ |
| 2–3 鳥等待、飼主開門 | s2、s3（夜晚客廳，狗坐著，門打開） | `busy-day-transition-s2.png`：安全房間夜晚（窗外夜空、新月，檯燈暖光），鳥籠在右側，鳥站在籠內靠門那側的棲木上，飼主還沒進門 | 4.3s | 新增 → Vids |
| 4 飼主臉部近景 | s4 | — | 9–11s | ♻️ |
| 5 逗鳥 | s5（輕撫狗頭） | `busy-day-transition-s5.png`：近景，飼主伸出一根手指，鳥站在她的手指上，另一隻手沒入鏡 | 2.5s | 新增 → Vids |

鏡頭 2–3：
```
The bird perches alone in the cage near the door side, feathers slightly fluffed, head tilting toward the door. After a moment the door on the left opens and the woman steps in looking tired. The bird's head snaps up, it perks up and hops along the perch toward the bars nearest her.
```
鏡頭 5：
```
The woman holds out one finger and the bird steps calmly onto it; she gently scratches the top of its head with one fingertip of her other hand, slowly and calmly; the bird half closes its eyes and fluffs its feathers in contentment. Slow, tender movement.
```
- 夜景注意：窗外是夜空與月亮，室內只有檯燈暖光；鳥籠不要被蓋布。

### ⑩ `time-passes-aging.mp4`（約 10 秒）｜過場：整支同一首底樂
柴犬分鏡：`time-passes-aging-s1…s4.png`（幼犬→跳接飛盤→奔跑→老犬）

| 鏡頭 | 柴犬分鏡 | 首幀 | 保留 |
|---|---|---|---|
| 1 幼鳥笨拙跳躍 | s1 | 【籠內】＋幼鳥額外指示＋`the young bird on the low branch perch, a small wooden toy on the floor tray` | 1.5s |
| 2 青年鳥飛行 | s2 | 【房間】＋`the young adult bird in mid-flight across the room, wings spread, window closed`（飛向籠子） | 2s |
| 3 成鳥站在飼主手指唱歌 | s3 | 【房間】＋飼主坐著、成鳥站在她的手指上張嘴唱歌（參考 `_ref_bird_on_hand_sing.png`）＋飼主角色圖 | 3s |
| 4 老鳥慢慢活動 | s4 | 【籠內】＋老鳥額外指示 | 4.5s |

動作：
```
S1: The tiny young bird hops clumsily along the perch, loses its balance for a moment, flaps once and regains its grip, then sits and shakes its head.
S2: The young bird flies in a short smooth arc across the room toward the cage and lands lightly on the cage top, flapping briefly.
S3: The bird stands on the woman's finger and sings with its beak open, head bobbing, while she smiles and the bird leans into her gentle touch.
S4: The old bird shuffles slowly along the low perch with careful small steps, stops, ruffles its feathers once and settles.
```
**追加規則（沿用兔子版 ⑨）**
- 復古回憶感只套在「過去」的鏡頭（S1、S2），S3 約 3.6–6.0 秒線性淡回正常色，S4（現在）不加濾鏡。
- **直接在 ChatGPT 指令寫入復古色調，不用事後 ffmpeg 加濾鏡**：S1、S2 的指令加上 `Overall color grade: faded vintage postcard look, low saturation, warm brownish-tan tint with a soft hazy low-contrast feel, slightly lifted blacks, like an old newspaper illustration (not bright yellow, not green).`，並拿掉原本的 `no yellow or sepia filter`。⚠ 鸚鵡本身是黃綠色，復古調要壓住但**不要把鳥變成全黃或全灰**，生完要和正常色版比對。
- 三幀可用一個指令在 ChatGPT 一次生完（分開的全尺寸圖）。

### ⑪ `busy-daily-care.mp4`（約 10 秒）
- 對應：`bird-busy-care`（`busyCarePresentation.sceneMedia`）
柴犬分鏡：`busy-daily-care-s1…s3.png`

| 鏡頭 | 柴犬分鏡 | 首幀 | 保留 | 做法 |
|---|---|---|---|---|
| 1 辦公室夜晚 | s1 | — | 0–4s | ♻️ |
| 2 鳥獨自等待 | s2（狗坐在空碗旁） | 【籠內】＋`the food bowl is almost empty with only a few husks, the water bottle is nearly empty, the bird perches next to the bowl looking at it` | 2s | 新增 → Vids |
| 3 鳥縮著不安 | s3（狗趴著、眼睛上瞟） | 【籠內】＋`the bird perches low on the branch perch, feathers slightly fluffed, eyes looking toward the room` | 4s | 新增 → Vids |

鏡頭 2：
```
The bird perches beside the nearly empty food bowl, bends down to look into it, picks at a husk, then lifts its head and looks toward the room, then slowly lowers its head.
```
鏡頭 3：
```
The bird sits low on the perch with its feathers slightly fluffed and its eyes looking toward the room, then blinks slowly and lets its feathers settle; its head sinks a little lower. Very slow, subtle movement.
```
- 與 sick 的差別：這裡只是「被忽略」的落寞，不要澎成一團、不要眼睛全閉。食碗「幾乎空」，不要出現糞便。

### ⑫ `senior-life.mp4`（約 8–9 秒）｜四個鏡頭都用老鳥版
- 對應：`bird-senior-care`
柴犬分鏡：`senior-life-s1…s4.png`

| 鏡頭 | 柴犬分鏡 | 首幀 | 保留 |
|---|---|---|---|
| 1 低棲木休息 | s1（老狗趴在門邊） | 【籠內】＋老鳥額外指示＋`resting on the low branch perch in the lower corner` | 0.8s |
| 2 小心換棲木 | s2（慢慢走路） | 【籠內】＋老鳥額外指示，鳥站在低棲木邊緣、望向上方的主棲木 | 2.8s |
| 3 飼主把棲木調低 | s3（老狗趴著） | 【籠內】＋籠門打開，飼主的手與粉紅袖口從門口伸入，把木棲木調到較低位置，老鳥安靜站在另一端棲木看著（只露手臂，不露臉；用已核可的飼主角色圖當參考）＋老鳥額外指示 | 2s |
| 4 輕搔頭頂 | s4（飼主陪老狗） | 【房間】＋老鳥站在飼主手指上，飼主另一手以指尖輕搔牠的頭頂＋老鳥額外指示 | 3s |

動作：
```
S1: The old bird rests on the low perch with its feathers slightly puffed in a relaxed way, eyes half closed, and lifts its head a little.
S2: The old bird looks up at the higher perch, hesitates, then takes a slow, careful hop up and grips the perch with both feet, wings slightly out for balance.
S3: The woman's hand gently lowers the wooden perch to a lower position and withdraws; the old bird watches calmly and steps onto the lowered perch.
S4: The old bird stands on the woman's finger with its eyes half closed while she gently scratches the top of its head with one fingertip; its feathers relax and it leans in.
```
- 老鳥身形要圓潤有營養，不要太瘦（兔子版 senior 第一次被評「沒營養」）；老態靠羽色褪淡與眼神。

---

## 生成完之後

1. 片段放進 `public/assets/bird/pet-journey/clips/`，依「保留」秒數剪接、補 ♻️ 原片，`splice.py --xf 0.25` 輸出 1280×720。
2. 音樂與混音：照 SOP §6.2 與上面「聲音規則」；有 ♻️ 原音的鏡頭用 `mix_music.py` 保留原音再 crossfade 進底樂。
3. 檢查：`ffmpeg -vf "fps=1.5,scale=384:-1,tile=5x3"` 做 contact sheet 逐格目視，確認 **只有一隻鳥、羽色一致、籠內物件位置不瞬移、籠條沒變形、沒有多出翅膀或腳**。

## 預期風險（尚未實測，做第一支時驗證，有結論就移到下面的追加規則）

- **鳥的羽色在黃與綠之間飄**：每張首幀都附 `_ref_bird_happy.png`，並在檢查時比對。
- **鐵絲籠條被重畫**：圖 1 的籠條密度與顏色容易漂；首幀盡量用簡單視角（正面），不要斜角。
- **拍翅糊成一團／多長一隻翅膀**：prompt 只寫短暫展翅；失敗就挑沒有拍翅的秒數。
- **鳥站不穩、腳沒有抓住棲木**：prompt 強調 `grips the perch with both feet`；手指上的鏡頭強調 `steps onto one finger`。
- **籠子外觀被改（綠網變白網等）**：內部圖是白網＋綠抽屜、外觀圖是綠網；房間鏡頭用外觀圖、籠內鏡頭用內部圖，兩者混用的鏡頭（過場）要在檢查時特別看。
- **Vids 被拒（違反條款）**：改較遠景、手指給鳥站上去而不是任何抓握動作。

## 進度追蹤

| 影片 | 類型 | 對應情境 | 首幀 | Vids 片段 | 成品 |
|---|---|---|---|---|---|
| master：bird-cage-master | — | 籠內場景 | ✅（使用者已確認） | — | — |
| master：bird-room-master | — | 房間場景 | ✅（使用者已確認） | — | — |
| ① correct-answer | 題目 | 答對回饋 | ✅ correct-answer-s1.png（v5 放大鳥，crop Y=40） | ✅ 2026-10-19 生成，時間軸 0–10s（clips/raw-*.mp4，已靜音） | ⬜ |
| ② correct-answer2 | 題目 | 答對回饋 | ✅ correct-answer2-s1.png（v5 放大鳥，crop Y=100） | ✅ 2026-10-19 生成，時間軸 10–20s（clips/raw-*.mp4，已靜音） | ⬜ |
| ③ first-day | 題目 | bird-arrival-adjustment | ✅ first-day-s1.png（v3：籠內左下角、鳥放大，crop Y=150） | ✅ 2026-10-19 生成，時間軸 20–30s（clips/raw-*.mp4，已靜音） | ⬜ |
| ④ sick | 題目 | bird-health-emergency | ✅ sick-s1.png（v4 放大鳥，crop Y=100，鳥在右下原木枝） | ✅ 2026-10-19 生成，時間軸 30–40s（clips/raw-*.mp4，已靜音） | ⬜ |
| ⑤ excessive-calling | 題目 | bird-excessive-calling | ⬜ | ⬜ | ⬜ |
| ⑥ stereotypy | 題目 | bird-stereotypy | ⬜ | ⬜ | ⬜ |
| ⑦ picky-eating | 題目 | bird-picky-eating | ⬜ | ⬜ | ⬜ |
| ⑧ arrival-transition | 過場 | 接回家過場 | ⬜ | ⬜ | ⬜ |
| ⑨ busy-day-transition | 過場 | 忙碌過場 | ⬜ | ⬜ | ⬜ |
| ⑩ time-passes-aging | 過場 | 老化過場 | ⬜ | ⬜ | ⬜ |
| ⑪ busy-daily-care | 題目 | bird-busy-care | ⬜ | ⬜ | ⬜ |
| ⑫ senior-life | 題目 | bird-senior-care | ⬜ | ⬜ | ⬜ |

---

## 踩雷與注意事項

- 【比例】籠內首幀鸚鵡要夠大：prompt 要寫「真實虎皮鸚鵡約 18 公分，籠內寬只有 3–4 隻鳥長；用品縮成真實比例；緊密取景，鳥全身（頭到尾尖）約佔畫面高 45%，圓滾滾的虎皮鸚鵡，不是小麻雀」。比例太小（約 20–25%）會像麻雀，使用者退回過。raw：`ca_v5_raw`、`ca2_v5_raw`、`fd_v3_raw`、`sick_v4_raw`。

- ①②首幀 16:9 取景時籠頂太近、鸚鵡比例怪 → prompt 要求「加高籠頂，鳥頭到天花板至少兩個鳥高」（raw：`ca_v4_raw.png`、`ca2_v4_raw.png`）。③第一天改為籠內縮在角落（raw：`fd_v2_raw.png`），不用房間與外出籠。

- furnished master v2（2026-10-19）：以空籠為背景、舊 furnished 圖為樣式參考，重生成真實安裝方式（溫度計掛鉤掛橫桿、玩具/繩梯用扣環掛頂桿、棲木以塑膠固定座插在籠壁、水瓶食盆夾具夾在籠條上）。舊版存 `_backup/_cage_furnished_v1_ref.png`。①②④ 首幀已用 v2 master 重生（raw：`_backup/ca_v3_raw.png`、`ca2_v3_raw.png`、`sick_v3_raw.png`）；之後 ⑤⑥⑦ 與過場籠內畫面都以 v2 master 為準。

- 【重要】籠內 master 必須用「有用品的籠子」`start-frames/bird-cage-furnished-master.png`（v2 真實安裝版，1024×1536：溫度計、吊掛玩具、橫棲木＋繩圈、繩梯、水瓶＋食盆、右下原木枝）；先前用空籠當參考，模型自己亂畫用品，使用者退回重生。prompt 要寫明「不得增減/換色/移動任何用品」，並說明忽略左上角的返回箭頭按鈕（截圖 UI）。

- 首幀統一流程：同聊天室 6ad58bfa-…，3:2 原圖存 `_backup/*_raw.png`，裁切 `crop=1536:864:0:80` → 1280×720。第一張（①）生成時水瓶/食盆被畫成綠色，之後 prompt 加「cream/white, NOT green」即正常。
- 下載生成圖前，先確認 1536 寬圖片數量已增加，否則會抓到上一張。

通用踩雷清單（SOP §10，共 29 項）全部適用，開工前先讀一遍，尤其：master 不含動物（1）、上傳後等 6 秒再打字（3）、「exactly ONE single full-frame image」（4）、側欄殘留結果要先送出再插入（21）、`cmd+a` 前確認焦點（22）、動作音效逐格確認窗口（23）、新物種開新 Vids 專案並每支清空白場景（29）。

鸚鵡版特有（持續追加；每做完一支，把首幀選擇與 crop、匯出檔與時間軸位置、聲音設定、使用者回饋寫在下面）：

- **master 做法紀錄（2026-10-19）**
  - `bird-cage-master.png`：**使用者提供的直式原圖**（`_ref_cage_interior_tray.png` 的複本，1024×1536）。第一版曾請 ChatGPT 重畫成橫式（`_backup/_rejected_cage_master_widened.png`），使用者要求保持直式，已退件。
  - `bird-room-master.png`：ChatGPT 新對話「Generate Edited Image」，圖 1 = `_ref_bird_safe_room.png`、圖 2 = `_ref_bird_cage.png`；`_backup/room_master_B_raw.png`，`crop=1536:864:0:60,scale=1280:720` → `start-frames/bird-room-master.png`。**鳥籠放在背景原有的後牆右側矮櫃（長矮櫃）頂上**（第一版放在自加的低木架上，使用者要求改，已退件為 `_backup/_rejected_room_master_v1.png`）；籠外觀正確、沒有鳥。⚠ 籠在整間房裡偏小：房間鏡頭裡鳥會很小；需要看清楚鳥的鏡頭用籠內取景，或在指令寫 `the bird cage is large and prominent`。
- （其餘鸚鵡特有踩雷：做完第一支影片後，從上面「預期風險」搬過來並補實際結論。）

### 更新：①② 無天花板規則（v7）
- ①②首幀改為「畫面不出現天花板／籠頂／溫度計／玩具」，直條向上延伸出畫面，鸚鵡置於畫面正中央（高約 40–45%）。
- 原始檔：①`_backup/ca_v7_raw.png`、②`_backup/ca2_v7_raw.png`(v6 跑成寫實風已淘汰;②要用①的 raw 當圖1風格參考並明說 NOT photorealistic)，皆以 `crop=1536:864:0:50,scale=1280:720` 裁切。

### Vids 生成紀錄（2026-10-19）
- 專案「鸚鵡」時間軸 40 秒、4 個場景、無空白場景：① 0–10s、② 10–20s、③ 20–30s、④ 30–40s。
- 匯出檔：`public/assets/bird/pet-journey/clips/bird_vids_export.mp4`（40.06 s）；切段 `clips/raw-<名稱>.mp4`（各 10 s，已去音軌、libx264 crf18）。
- 下一步：依各支需要長度修剪（①4–5s、②4s、③8s、④8s）、做底樂、混音，經使用者聽過後再接線。

## 2026-10-19 更新：③ 外出籠版 + ①② 足趾環繞 2/3 規則
- ③ first-day-s1.png 改為「鸚鵡在外出籠內部（外出籠置於鳥籠隔壁，畫面聚焦外出籠內部）」，來源 _backup/fd_v4_raw.png。
- ①② 棲木畫面必須能看出足趾環繞棲木圓周約 2/3（參考圖 toe-wrap-2of3-ref.png）：棲木略加粗、雙腳可見、趾從上方繞到前後。來源 _backup/ca_v8_raw.png、ca2_v8_raw.png（crop Y=50）。
- 待辦：①②③ 以新首幀重新生成 Vids 並重新切 raw-*.mp4。
- ①② 再修（v9/v10）：鸚鵡腳為對趾足（每腳 4 趾，2 趾朝前、2 趾朝後），前趾包住棲木前側、後趾包住後側，趾尖低於棲木中線，約環繞 2/3 圓周；棲木再加粗約 1.5 倍。來源 _backup/ca_v9_raw.png、ca2_v10_raw.png。
- ①② 再修（v10/v11）：棲木改細（直徑約鳥體高 1/6，參考 perch-feet-ref），腳縮小、纖細，前2後2趾自然環繞約 2/3 圓周，不誇張。來源 _backup/ca_v10_raw.png、ca2_v11_raw.png。
- ③ first-day-s1.png 更新為新版外出籠（public/assets/car/bird-carrier.webp，內部中間有一根細棲木）：鸚鵡蓬鬆蹲在棲木上，趾環繞棲木。來源 _backup/fd_v5_raw.png（crop Y=60）；舊版備份 first-day-s1_carrier_nop.png。

## Vids 重生記錄 v2（2026-10-19）
- ①②（細棲木＋足趾環繞 2/3）、③（新版外出籠，中間有棲木）用新首幀重生，匯出 clips/bird_vids_export_v2.mp4（80 s）。
- 時間軸對照：舊 ①②③ 0–30 s（棄用）、④ sick 30–40 s、新① 40–50 s、新② 50–60 s、壞掉的 ③（鏡頭被拉近）60–70 s（棄用）、新③ 70–80 s。
- 切出：raw-correct-answer=40–50、raw-correct-answer2=50–60、raw-first-day=70–80（皆 10 s、已靜音）；raw-sick 沿用舊版。
- 教訓：Vids 對 ③ 外出籠首幀曾自動拉近鏡頭，提示詞需加「FRAMING IS CRITICAL … never zooms … bird about 45% of frame height」。
- 舊版 raw 備份在 scripts/bird/_backup/old-clips/。

## 剪輯 v3（2026-10-19）— 保留 Vids 原音（含叫聲）
- ③ first-day-s1 畫風修正：_backup/fd_v6_raw.png（以 ca_v10_raw 當畫風參考，線條較深、質感同 ①②）；舊版備份 first-day-s1_v5style.png。
- 重新匯出 clips/bird_vids_export_v3.mp4（90 s）：新① 40–50、新② 50–60、新③（舊畫風，棄用）70–80、新③（新畫風）80–90；④ 取自 bird_vids_export.mp4 的 30–40。
- raw-*.mp4（10 s，含原音）：raw-correct-answer、raw-correct-answer2、raw-first-day、raw-sick。
- 剪短成品（含原音，頭 0.1 s 淡入、尾 0.2 s 淡出）：correct-answer.mp4 4.5 s、correct-answer2.mp4 4 s、first-day.mp4 8 s、sick.mp4 8 s。
- 已知：③ 新版影片第一幀被 Vids 略為拉遠（看得到外出籠提把），與首幀構圖不完全相同；鳥有時看起來較不蓬鬆。

## 音樂與混音（2026-10-19）
- scripts/bird/make_music.py 以 numpy 合成音樂盒風 BGM（①② 明亮 C 大調五聲、③ 平靜 A 小調、④ 輕柔下行），wav 存 scripts/bird/music/。
- 混音：原音（含叫聲）增益至峰值約 -6 dB，音樂壓在 -16/-16/-20/-23 dB（①②③④），尾端淡出 0.7 s；成品 clips/final/{correct-answer,correct-answer2,first-day,sick}.mp4（4.5/4/8/8 s，畫面 copy 自剪輯版）。
- 尚未接 assets.ts。

## 使用者偏好追加（2026-10-19）
- **correct-answer 的音樂一律要輕快、有活力**（答對的開心回饋）：明亮大調、速度偏快、節奏跳躍；①②（correct-answer／correct-answer2）都照此，不可做成平靜或抒情。目前合成版：scripts/bird/make_music.py 的 bright_a（120 BPM）。
- **保留 Vids 原音的叫聲**：鸚鵡影片的鳥叫聲要留著（與其他物種「新生成鏡頭一律靜音」不同）；生成提示詞改為「quiet room tone with a few soft natural budgie chirps only」，仍禁止人聲、說話、哼唱，鳥不模仿人說話。混音時原音增益至峰值約 -6 dB，音樂壓在其下（-16/-16/-20/-23 dB）。

## 答對音樂改版（輕快版，參考貓咪）
- ①② 改用 `scripts/bird/make_music_lively.py` 產生：尤克里里刷弦 + 鐘琴/木琴旋律 + 拍手，① 150 BPM、② 168 BPM（C 大調），舊音樂盒版備份在 `music/v1/`。
- 混音：原音（含鳥叫）峰值拉到 -6 dB，音樂峰值 -11 dB，淡出 0.7 s，影片 `-c:v copy`；成品 mean 約 -26 / -28 dB（貓咪約 -24 dB）。
- ③④ 仍為音樂盒版。

## ⑤⑥⑦ 首幀（2026-10-20）
- 已生成：`start-frames/excessive-calling-s1.png`、`stereotypy-s1.png`、`picky-eating-s1.png`（皆以 `bird-cage-furnished-master.png` ＋ `correct-answer-s1.png` 當圖 1／2，crop Y=50／50／20）。
- **⑦ picky-eating**：使用者最後選回滿碗混合種子的版本（`picky-eating-s1.png`）；少數種子版備份 `_backup/pe_v2_crop_fewseeds.png`。**生成影片時鸚鵡只准吃葵花籽和花生**（prompt 明寫 only sunflower seeds and peanuts，不吃其他種子/顆粒）。

## ⑤⑥⑦ Vids／剪輯／混音（2026-10-20）
- Vids 匯出 `clips/bird_vids_export_v4.mp4`（120 s）：⑤ 90–100、⑥ 100–110、⑦ 110–120（接在 v3 的 90 s 之後）。第一次 ⑤ 生成「沒套用首幀」變成寫實鳥（棄用，重送一次才對）——生成後務必先看預覽是不是我們的畫風再插入。
- 剪輯：`clips/raw-{excessive-calling,stereotypy,picky-eating}.mp4`（10 s 含原音）→ `clips/{…}.mp4` 切成 7／7／8 s；成品 `clips/final/{…}.mp4`。
- 音樂 `scripts/bird/make_music_daily.py`：⑤ 112 BPM kalimba、⑥ 96 BPM 規律撥弦 ostinato、⑦ 118 BPM 馬林巴；原音（含鳥叫）峰值 -6／-6／-8 dB，音樂峰值約 -11／-7／-10 dB（成品 mean 約 -26／-31／-28 dB）。
- ⑦ 提示詞明寫 eats ONLY sunflower seeds and peanuts（使用者要求）。

## ⑧ arrival-transition 製作紀錄（2026-10-20）
- 首幀 s2（多種鳥、一籠一隻、提籠放櫃檯、飼主站櫃檯前）、s4（外出籠門關好）、s5（門放下、鳥在籠門口）、s6（籠頂平整、前柵欄完整）；s1/s3 沿用柴犬原片。
- Vids 一次生成 s2/s4/s5/s6 → 匯出 `clips/bird_vids_export_v5.mp4`（160s；s2 120–130、s4 130–140、s5 140–150、s6 150–160）→ `clips/raw-arrival-s*.mp4`。
- 剪接：shiba 0–1.15（車內鏡頭只到 1.25s，1.4s 會露出柴犬）/ s2 0–2.2 / shiba 3.5–5 / s4b（重生，鏡頭鎖死）0–2.2 / s5 1.0–3.2 / s6 0–3.0，`scripts/cat/splice.py --xf 0.25`，共 11.0s（s4 初版鏡頭會平移、櫃上籠子瞬移，已改用 raw-arrival-s4b.mp4 / bird_vids_export_v6.mp4 的 160–170s）。
- 「歡迎回家」用 `scripts/歡迎回家繽紛泡泡字貼紙.png`，寬 384px、x=154（距左 12%）、y=100，8.7s 起 0.6s alpha 淡入。
- 配樂 `make_music_arrival.py`（84 BPM 鋼琴琶音＋弦樂 pad，C–G/B–Am–F–C），原音 ×0.8、配樂 ×0.5，結尾 0.7s 淡出；輸出 `clips/final/arrival-transition.mp4`（mean -22 dB / peak -8.3 dB）。
- s6 影片鏡頭會自行拉遠（鳥約 25% 高），重生一次出現不同籠子，故採用第一次結果。

---

## ⑨ busy-day-transition 製作紀錄（2026-10-20）
- 新首幀兩張：`start-frames/busy-day-transition-s2.png`（夜晚房間、籠子放大、鳥約 30% 高、門在左邊緣）、`busy-day-transition-s5.png`（近景，一根手指＋鳥，平面手繪畫風）。s5 第一版沿用柴犬圖的偏寫實畫風被退件（備份 `_backup/bdt_s5_v1_*`），改以 `arrival-transition-s2.png`（鸚鵡系列畫風＋飼主）當圖 1、柴犬圖只當構圖參考；柴犬圖的包包肩帶要在指令明寫 `no bag, no strap`。
- Vids：s2 要把 s5 首幀當**第二張素材圖**（飼主外觀＋畫風參考，提示詞開頭寫 `image 2 shows the same woman…`，並刪掉提示詞開頭多出的「圖片 2」chip）。提示詞務必加：`the very first frame must be IDENTICAL to image 1… Do NOT crop/zoom in/push in` 和 `The bird cage door stays CLOSED… The woman only opens the room door`；第一次沒加這兩句，鏡頭會直接拉近、籠門被打開。
- Vids 匯出：`clips/bird_vids_export_v7.mp4`（190 s；s2＝170–180、s5＝180–190）→ `raw-busy-s2.mp4`、`raw-busy-s5.mp4`。
- 成品 `final/busy-day-transition.mp4`（13.1 s）：shiba 0–5.0（辦公室，保留原音）／s2 0–4.3／shiba 9.0–11.0（飼主臉部）／s5 0–2.5，交叉淡化 0.25 s；Vids 原音 ×0.8＋底樂 ×0.5（4.8 s 進），尾端淡出 0.7 s。
- 底樂：`make_music_busy.py`＋`music/music_busy-day-transition.wav`（88 BPM，Karplus-Strong 指彈吉他＋弦樂墊，G–Em–C–G，9.8 s）。
- 已知問題：柴犬臉部鏡頭是偏寫實畫風且肩上有包包肩帶（原片重用）；s2 後半鏡頭比首幀略拉近。

### ⑨ 更新（2026-10-20）：鏡頭 4「飼主臉部」改為重生
- 首幀 `start-frames/busy-day-transition-s4.png`（`_backup/bdt_s4_v1_*`）：平面手繪畫風、無肩帶、疲憊但帶著回到家的放鬆。圖 1＝`bdt_s5_v2_crop.png`（鸚鵡系列畫風＋飼主），圖 2＝柴犬 `busy-day-transition-s4.png`（只當構圖）。
- 原本的 ♻️ 柴犬 9–11 s 取消，成品改用新生成的 Vids 片段（約 2 s）。
- ⑨ 重生完成（2026-10-20）：Vids 匯出 `bird_vids_export_v8`（下載 `鸚鵡 (7).mp4`，200 s；新臉部＝190–200）→ `raw-busy-s4.mp4`。成品改為 shiba 0–5.0／s2 0–4.3／s4 0–2.2（飼主臉部，無肩帶、平面手繪）／s5 0–2.5，xf 0.25，共 13.3 s，混音同前；舊版備份 `_backup/busy_final_v1_shibaface.mp4`。

## ⑩ time-passes-aging 製作紀錄（2026-10-20）
- 首幀 `start-frames/time-passes-aging-s1…s4.png`（備份 `_backup/tpa_s*_v1_raw.png`）：s1 幼鳥（籠內，復古色）／s2 青年鳥飛行（房間，復古色）／s3 飼主手指上成鳥唱歌（正常色，圖 1＝room master、圖 2＝sing ref、圖 3＝arrival-transition-s2 飼主）／s4 老鳥（籠內，正常色）。
- Vids 匯出 `clips/bird_vids_export_v8.mp4`（240 s；s1＝200–210、s2＝210–220、s3＝220–230、s4＝230–240）→ `raw-tpa-s1…s4.mp4`。
- ⚠ Vids 踩雷：s2 第一次生成籠門被打開（重生一次修正）；s3 提示詞寫 `tripod` 會真的畫出相機腳架，需加 `NO camera, NO tripod`（之後避免寫 tripod）；s2 生成結果四周有米色圓角邊，剪接時 `crop=1220:686:30:17,scale=1280:720`（`raw-tpa-s2c.mp4`）。
- 剪接（xfade）：s1 0–1.7／s2c 0–2.3／s3 0–3.3／s4 0–4.5，轉場 0.25／0.8（復古→正常）／0.25，共 10.77 s，靜音後只放底樂。
- 底樂 `make_music_aging.py`＋`music/music_time-passes-aging.wav`：鋼琴，前 5.8 s 輕快（C–G–Am–F，120 BPM），之後轉慢（66 BPM，F–Am–C/G–C）懷舊，尾端淡出。成品 `final/time-passes-aging.mp4`。

## ⑪ busy-daily-care 製作紀錄（2026-10-20）
- 首幀 `start-frames/busy-daily-care-s2.png`（鳥守快空的食碗）、`-s3.png`（鳥縮在低棲木，需含圓形繩環；第一版缺繩環已退件 `_backup/bdc_s3_v1_crop.png`）。皆加「略暗的暖色傍晚光」。
- Vids 匯出 `clips/bird_vids_export_v9.mp4`（260 s；s2＝240–250、s3＝250–260）。s3 第一次生成閉眼睡著、畫面多出吊掛玩具；第二次提示詞加「首幀要完全相同、眼睛保持睜開」後表情落寞、可用。
- 成品 `final/busy-daily-care.mp4`（9.75 s）：shiba 0–4.0（辦公室，保留原音）／s2 0–2.25／s3 0–4.0，xf 0.25；Vids 原音 ×0.8＋獨奏鋼琴 ×0.55（`make_music_busycare.py`、`music/music_busy-daily-care.wav`，A 小調 60 BPM，約 3.7 s 進）。
- 中途 Vids 被登出（需使用者重新登入），登出前未送出的生成會遺失。

## ⑫ senior-life（2026-10-20）
- 首格：senior-life-s1~s4.png（s1 低棲木休息；s2 抬頭看高棲木；s3 手＋粉袖把棲木放低；s4 客廳老鳥站手指、另一手放旁邊）。老態靠褪色／臉部發白／眼睛半閉混濁；s4 初版（手摸頭）老態不足已重畫，舊版 `_backup/sl_s4_v1_crop.png`。
- Vids：s4「手摸頭」連續 4 次被判違規（換圖換字都一樣）→ 改成「手放旁邊不碰頭」才通過。s2 前兩次一次飛去繩圈、一次繩梯變木梯，第三次接受（老鳥飛上繩圈當「高處」）。提示詞含 "does NOT ..." 較長版曾被誤判，改回簡短原版即通過。
- 剪接：raw-sl-s1..s4（bird_vids_export_v10.mp4，260–300 s）；s1 0–1.0、s2 4.0–6.8、s3 3.0–6.5、s4 1.0–4.0，xf 0.25 → 9.6 s。
- 配樂：make_music_senior.py → music/music_senior-life.wav（鋼琴 F–Am–C/G–C 66 BPM + 弦墊），延遲 0.3 s、音量 0.5、片尾淡出 1.0 s。
- 成品：clips/final/senior-life.mp4（9.6 s）。
