# 橘貓影片｜首幀鎖定流程（ChatGPT 換貓 → Flow 轉影片）

> 仿 `scripts/dog/mixed-frames-workflow.md`，但**全部統一成同一種畫風**：以 `scripts/cat/cat-room-ref.webp`（貓咪客廳）＋橘貓為準。
> 外觀參考：`public/assets/cat/feeding/orange-cat-happy.webp`
> 柴犬參考畫面（姿勢／構圖參考）：`scripts/dog/shiba-ref-frames/<影片名>-s<鏡頭>.png`
> 首幀存放：`scripts/cat/start-frames/<影片名>-s<鏡頭>.png`（1280×720）；Flow 片段存放：`public/assets/cat/pet-journey/clips/`
> 成品輸出：`public/assets/cat/pet-journey/<影片名>.mp4`

---

## 統一規則

1. **畫風只有一種**：粗深褐色輪廓線、細毛髮筆觸、柔和陰影、暖米色調（同 `cat-room-ref.webp`）。不要粉彩、細線、整張染黃。
2. **場景**
   - 室內一律用貓咪客廳（圖 1 = `cat-room-ref.webp`），需要沙發、貓砂盆、外出籠等物件時在 prompt 裡加上。
   - 戶外公園、辦公室、收容所、車內沿用柴犬版場景（圖 1 = 對應柴犬畫面，把狗換成貓）。
3. **橘貓固定外觀**：`an orange tabby cat: light orange fur with darker orange tabby stripes, white chest, white chin and muzzle, white paws, pink nose, pink inner ears, a long ringed tail`
4. **飼主固定外觀**：棕色馬尾、粉紅帽 T、藍色牛仔褲、白色運動鞋（沿用柴犬版）。
5. ChatGPT 只出 3:2（1536×1024），下載後由 Claude 用 ffmpeg `crop=1536:864,scale=1280:720` 裁成 16:9。

## 流程（Claude in Chrome 自動化）

1. ChatGPT 每張首幀開新對話；用 `file_upload` 上傳圖 1（場景）、圖 2（橘貓）、圖 3（柴犬姿勢參考，視需要）。
2. 貼【換貓指令】＋該鏡頭【額外指示】→ 送出 → 檢查（橘貓花紋、輪廓粗細、沒有被染黃、場景沒變）。
3. 下載 → ffmpeg 裁切 → 存 `scripts/cat/start-frames/`。
4. Flow：Frames to Video，起始畫面＝首幀，貼【Flow 動作】＋【Flow 通用結尾】＋【Flow 通用音訊結尾】。
5. 片段下載到 `public/assets/cat/pet-journey/clips/<影片名>-s<鏡頭>.mp4`，再用 ffmpeg 依「保留」秒數剪接溶接。

---

## 共用段落

**【換貓指令】（需要把柴犬畫面換成貓時）**
```
Edit image 1. Replace the Shiba Inu with the orange tabby cat shown in image 2: light orange fur with darker orange tabby stripes, white chest, white chin and muzzle, white paws, pink nose, pink inner ears, a long ringed tail.
Keep the new cat in the same pose, size, position and facing direction as the Shiba. Keep everything else in image 1 exactly unchanged: background, furniture, people, objects, framing, lighting and color grading.
Draw the cat in the illustration style of image 1, NOT the style of image 2: the same bold dark-brown outline thickness, fine fur-texture strokes, soft shading and warm color tone.
This is a precise edit of image 1, not a new drawing: do not redraw, restyle or re-light the scene, do not add a yellow or sepia filter, do not add or remove objects. Landscape format (1536x1024), keep important content away from the top and bottom edges so it works when cropped to 16:9. Please generate the image now.
```

**【貓咪客廳新增指令】（室內場景：圖 1 = 空的貓咪客廳，圖 2 = 橘貓，圖 3 = 柴犬姿勢參考）**
```
Edit image 1, an empty cat-friendly living room. Add the orange tabby cat from image 2 as described below. Use image 3 only as a reference for pose, size and position. Keep everything in image 1 exactly unchanged (room, door, windows with safety nets, curtain, shelves, cabinet, plants, lamp, rug, framing, lighting, colors). Draw in the same illustration style as image 1: bold dark-brown outlines, fine fur-texture strokes, soft shading, warm tone. Do not add anything not mentioned, no yellow or sepia filter. Landscape 1536x1024, important content away from top and bottom edges. Please generate the image now.
```

**【Flow 通用結尾】**
```
Animate this exact image. Keep the art style, outline thickness, colors, lighting, background and the cat's design exactly as in the start frame for the whole clip. The cat keeps its light orange fur with darker orange tabby stripes, white chest and paws, and long ringed tail. Locked camera, no zoom, no pan, no cuts. The cat moves realistically like a real cat, not anthropomorphized. No text appears.
```

**【Flow 通用音訊結尾】**
```
AUDIO: include the realistic sound effects and background music described in SOUND. Keep the music soft, low-volume and instrumental only (no vocals), mixed below the sound effects. Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no laughing, no talking cat, no distorted, synthetic or eerie sounds. The cat makes only realistic cat sounds.
```

**老貓額外指示（senior-life、time-passes-aging 鏡頭 4）**
```
Draw the cat as a senior: the same orange tabby pattern but with the orange faded and duller, a grey-white frosted muzzle and chin, a slightly thinner body and a slightly arched back.
```
**幼貓額外指示（time-passes-aging 鏡頭 1）**
```
Draw the cat as a 3-month-old kitten: the same orange tabby pattern, a small chubby body, big round head, large ears, big paws and a short thin tail.
```

---

## A 型：一鏡到底（8 支）

### ① `correct-answer.mp4`（4–5 秒）✅ 首幀已完成
- 首幀：`correct-answer-s1.png`
- Flow 動作：
```
The cat sits on the lavender rug facing the camera, eyes squinted happily, mouth open in a little smile. Its tail curls and sways slowly beside it and its head bobs gently, then it blinks slowly with contentment.
SOUND: a soft happy purr, a tiny chirpy meow; music: a short bright ukulele-and-glockenspiel jingle.
```

### ② `correct-answer2.mp4`（4 秒）
- 首幀：用【貓咪客廳新增指令】＋額外指示：`The cat stands on the rug in three-quarter side view, head toward the camera with a bright smile, tail held high with a curled tip.`
- Flow 動作：
```
The cat stands on the lavender rug, head toward the camera with a bright smile. Its tail waves in a slow upright curl, it takes two light steps in place and squints happily for a moment, then rubs its cheek against the air as if greeting.
SOUND: a happy trill-meow, soft paw taps on the floor; music: a quick cheerful ukulele jingle with light hand claps.
```

### ③ `first-day.mp4`（10 秒，Flow 生成 8 秒即可）
- 首幀：貓咪客廳新增指令＋`A grey-and-navy pet carrier with its door open sits on the rug; only the cat's head is visible poking out of the carrier opening.`（圖 3 參考 `first-day-s1.png`）
- Flow 動作：
```
The cat peeks out of the carrier, eyes wide, ears swiveling around the unfamiliar room. It stays inside for a moment, then very slowly steps out, body low to the floor, belly almost touching the rug, whiskers forward, sniffing. It creeps a few steps toward the sofa side of the room, stops, and looks back at the carrier. No people appear.
SOUND: quiet room tone, a wall clock ticking softly, faint sniffing, soft careful paw steps, a plastic carrier creak; music: very soft, tentative solo piano.
```

### ④ `night-energy.mp4`（7 秒）｜取代狗的 barking
- 首幀：貓咪客廳新增指令＋`It is night: the windows show a dark blue night sky with city lights and the lamp gives a warm dim glow. The cat is in a low crouch on the rug, wide round eyes, ears forward, butt slightly raised, ready to pounce. A small catnip mouse toy lies near it.`
- Flow 動作：
```
The cat wiggles its hips, then bursts into a zoomie: it sprints across the room, leaps onto the low cabinet at the right and back down, skids on the floorboards and skids into a sudden stop, wide-eyed, tail puffed. It then crouches again and swats at the toy mouse.
SOUND: quick pattering paws on wood, a skid, a soft thump landing, a short excited chirp, quiet night room tone; music: a light, playful pizzicato run.
```

### ⑤ `scratching.mp4`（7 秒）｜取代狗的 chewing
- 首幀：貓咪客廳新增指令＋`Add a beige fabric sofa against the right wall (replace nothing else). The cat stands on its hind legs beside the sofa arm with its front paws extended on the sofa fabric, scratching; small loose threads hang from the sofa arm. A cat scratching post stands unused in the corner.`
- Flow 動作：
```
The cat stretches up and scratches the sofa arm with both front paws in long strokes, claws pulling fabric, eyes half-closed in satisfaction. It drops down, looks back at the camera for a second, then turns and rakes the sofa arm again.
SOUND: rasping fabric scratches, soft paw thumps, a satisfied low trill; music: mischievous pizzicato strings.
```

### ⑥ `climbing.mp4`（7 秒）
- 首幀：貓咪客廳新增指令＋`The cat sits on top of the wooden cabinet at the right, beside a ceramic cup placed near the edge, looking down at the floor with curious wide eyes, one front paw raised toward the cup.`
- Flow 動作：
```
The cat looks at the cup, then slowly extends a paw and taps it. It taps again and pushes the cup off the edge; the cup falls to the floor and tips over (it does not break into sharp pieces). The cat peers over the edge, then glances at the camera innocently.
SOUND: a soft paw tap, a light clunk as the cup lands, quiet room tone; music: a mischievous pizzicato sting that ends on a light comedic note.
```

### ⑦ `litter.mp4`（8 秒）｜取代狗的 urinate-and-defecate
- 首幀：貓咪客廳新增指令＋`Add an open grey cat litter box with a low entrance on the floor at the left of the rug. The cat stands beside the litter box, sniffing its edge. Use public/assets/cat/room/cat-litter-box.webp as the litter box reference if provided.`
- Flow 動作：
```
The cat steps into the litter box, sniffs and paws the litter with its front paws, then squats briefly in side view, tail raised. It steps out, turns around and scratches the litter to cover the spot, then walks away calmly. Tasteful and child-friendly, nothing graphic.
SOUND: litter crunching under paws, light paw steps, quiet room tone; music: soft, slightly playful bassoon-and-pizzicato tune.
```

### ⑧ `sick.mp4`（8 秒）
- 首幀：貓咪客廳新增指令＋`The cat sits hunched on the rug next to a green food bowl full of kibble, head lowered, ears slightly back, eyes half-closed, looking dull and hesitant. Its coat is clean (no red patches).`
- Flow 動作：
```
The cat sniffs the kibble, takes one hesitant lick, then turns its head away from the bowl. It sits hunched and still, blinks slowly, then stands up and walks stiffly toward the left corner of the room to hide behind the cabinet, glancing back once.
SOUND: sniffing, a faint soft pad of paws, quiet room tone, a weak little meow; music: quiet, slightly worried solo piano.
```

---

## B 型：多鏡頭（5 支）

♻️ = 沒有貓的鏡頭，直接剪柴犬原片，連同音效配樂一起使用。

### ⑨ `arrival-transition.mp4`（約 10 秒）
| 鏡頭 | 首幀 | 保留 | 做法 |
|---|---|---|---|
| 1 車子白天 | — | 0–1.4s | ♻️ |
| 2 收容所 | `arrival-transition-s2.png` 換貓 | 2s | 換貓 → Flow |
| 3 夕陽開車 | — | 3.5–5s | ♻️ |
| 4 提籠進客廳 | — | 5–6.5s | ♻️（籠內看不出動物才可用） |
| 5 走出籠子 | 貓咪客廳新增指令＋`the cat is halfway out of an open grey-and-navy carrier on the rug` | 2s | 新增 → Flow |
| 6 歡迎回家 | 貓咪客廳新增指令＋保留「歡迎回家」標題 | 1.5s | 新增 → Flow |

鏡頭 2：
```
The woman kneels and gently guides the cat into the open grey-and-navy carrier with both hands; the cat steps in cautiously, ears slightly back. The other animals in the kennels stay where they are.
SOUND: shelter ambience with distant soft meows, a carrier door latch click; music: warm hopeful piano and strings.
```
鏡頭 5：
```
The cat slowly steps out of the carrier onto the lavender rug one paw at a time, body low, sniffing the air and looking around with alert, curious eyes.
SOUND: soft paw steps, sniffing, a carrier door creak; music: warm hopeful piano and strings, gently rising.
```
鏡頭 6：
```
The cat sits calmly on the lavender rug, eyes slowly closing and opening, tail curled around its paws. The title text stays perfectly still and unchanged.
SOUND: a soft purr, quiet room tone; music: the warm piano-and-strings theme resolving into a gentle, heartwarming ending.
```

### ⑩ `busy-day-transition.mp4`（約 13 秒）
| 鏡頭 | 首幀 | 保留 | 做法 |
|---|---|---|---|
| 1 辦公室白天→夜 | — | 0–5s | ♻️ |
| 2–3 貓等門、開門迎接 | `busy-day-transition-s2.png` 換貓 | 4.3s | 換貓 → Flow |
| 4 飼主臉部近景 | — | 9–11s | ♻️ |
| 5 摸貓 | `busy-day-transition-s5.png` 換貓（`Close-up: the woman's hand strokes the cat's head and chin; the cat's eyes are half-closed`） | 2.5s | 換貓 → Flow |

鏡頭 2–3：
```
The cat sits alone on the rug facing the door, waiting. After a moment the door on the left opens and the woman steps in with a shoulder bag, looking tired. The cat's ears perk up, its tail rises straight up, and it trots over and rubs against her legs.
SOUND: quiet night room tone, a clock ticking, key in the lock, a door creak, soft paw steps, a gentle greeting meow; music: shifts from quiet and lonely to warm and tender piano.
```
鏡頭 5：
```
The woman gently strokes the cat's head and scratches under its chin; the cat leans into her hand with eyes half-closed. Slow, calm, tender movement.
SOUND: soft fur rustle, a quiet contented purr; music: tender, warm piano and soft strings.
```

### ⑪ `time-passes-aging.mp4`（約 10 秒）｜貓改全程室內
| 鏡頭 | 首幀 | 保留 |
|---|---|---|
| 1 幼貓追毛線球 | 貓咪客廳新增指令＋幼貓額外指示＋`a ball of red yarn on the rug` | 1.5s |
| 2 青年貓跳起撲逗貓棒 | 貓咪客廳新增指令＋`a feather teaser wand held in the air above the cat` | 2s |
| 3 壯年貓全速奔跑 | 貓咪客廳新增指令＋`the cat mid-run across the rug` | 2s |
| 4 老貓慢走 | 貓咪客廳新增指令＋老貓額外指示 | 4.5s |

動作：
```
S1: The tiny kitten bats the red yarn ball clumsily across the rug, then pounces on it, tail wagging stiffly.
SOUND: light quick kitten paw patter, a tiny mew; music: playful, bouncy music box melody.

S2: The young cat leaps up and swats the feather teaser wand with both front paws, then lands lightly on the rug.
SOUND: a whoosh of the wand, a soft landing; music: upbeat acoustic guitar.

S3: The cat runs at full stride across the room, ears back, tail streaming behind it.
SOUND: fast paw thuds on wood, a skid; music: lively acoustic guitar at its most energetic.

S4: The old cat walks slowly across the rug with its head low, then stops and sits down carefully.
SOUND: slow, soft uneven paw steps, quiet room tone; music: slow, nostalgic solo piano.
```

### ⑫ `busy-daily-care.mp4`（約 10 秒）
| 鏡頭 | 首幀 | 保留 | 做法 |
|---|---|---|---|
| 1 辦公室夜晚 | — | 0–4s | ♻️ |
| 2 貓獨自坐著 | 貓咪客廳新增指令＋`an empty food bowl and empty water bowl next to the cat` | 2s | 新增 → Flow |
| 3 貓趴下難過 | 貓咪客廳新增指令＋`the cat lies loafed with its chin resting on its paws, ears drooping, eyes looking up sadly` | 4s | 新增 → Flow |

鏡頭 2：
```
The cat sits alone on the rug next to the empty bowls, looks toward the door, then slowly lowers its head.
SOUND: a quiet house, a wall clock ticking, faint distant city traffic; music: subdued, lonely solo piano.
```
鏡頭 3：
```
The cat lies with its chin on its paws, eyes looking up sadly, then blinks slowly and lets out a tiny sigh through its nose; its ears droop and its tail lies flat. Very slow, subtle movement.
SOUND: a soft sigh through the nose, a clock ticking in the silence; music: subdued, gentle, slightly sad piano.
```

### ⑬ `senior-life.mp4`（約 8–9 秒）｜四個鏡頭都用老貓版
| 鏡頭 | 首幀 | 保留 |
|---|---|---|
| 1 門邊趴著 | 貓咪客廳新增指令＋老貓額外指示＋`lying near the half-open door` | 0.8s |
| 2 猶豫跳不上沙發／被扶著 | 貓咪客廳新增指令＋沙發＋老貓額外指示＋飼主 | 2.8s |
| 3 猶豫進砂盆 | 貓咪客廳新增指令＋貓砂盆（低入口）＋老貓額外指示 | 1.8s |
| 4 家中撫摸 | 貓咪客廳新增指令＋飼主跪在地墊＋老貓額外指示 | 3s |

動作：
```
S1: The old cat lies on the rug near the half-open door and lifts its head slightly.
SOUND: quiet room tone, a door creaking softly; music: gentle, warm but melancholy piano.

S2: The old cat crouches to jump onto the sofa, hesitates, and slumps back down. The woman bends down and gently lifts its hind end with both hands to help it up, looking worried.
SOUND: a faint meow, soft paw scuffs on fabric; music: gentle, melancholy piano.

S3: The old cat stands at the litter box entrance, hesitates, then lifts one paw and steps in slowly and stiffly.
SOUND: litter crunching softly, slow paw steps; music: gentle, melancholy piano.

S4: The woman kneels on the rug and slowly strokes the old cat's head; the cat lies on its side with eyes closed, breathing slowly.
SOUND: quiet room tone, slow calm breathing, a faint purr; music: tender, heartwarming piano and soft strings.
```

---

## 生成完之後

片段放進 `public/assets/cat/pet-journey/clips/`，Claude 依「保留」秒數剪接，補 ♻️ 柴犬原片，用溶接輸出 1280×720 到 `public/assets/cat/pet-journey/<影片名>.mp4`。

## 實際流程（2026-10 更新：Flow 改用 Google Vids Omni）

1. **首幀**：ChatGPT（一個物種一個對話）上傳 圖1=`cat-room-ref.webp`、圖2=`public/assets/cat/feeding/orange-cat-happy.webp`（需要人物／砂盆時圖3 = 參考圖），貼上對應指令 → 1536×1024 → 下載 → `ffmpeg crop=1536:864,scale=1280:720` 存到 `scripts/cat/start-frames/<影片>-s<n>.png`（原圖 `.orig.png`）。每張約 2–2.5 分鐘、不能排隊。
2. **動態片段**：Vids →「製作 AI 影片」(Omni, 720p, 8s)。上傳首幀 → 提示詞以 `Use this image as the exact first frame and animate it.` 開頭，內含 `Locked static camera, no zoom, no pan, no cuts`、`SOUND:`、`No human voices, no speech`；避免出現 TV／screen 字眼。生成後選畫布片段 → 點「取代」（有時要點兩次，確認畫布已變）→ 檔案 → 下載 → MP4。下載檔為 1920×1080 含音訊，右下有浮水印。
3. **模型會亂變形**（例如躲藏箱被打開）：改成兩段短片＋溶接，或在首幀就放好最終狀態。
4. **拼接**：`python3 scripts/cat/splice.py OUT.mp4 [--xf 0.25] SRC:START:DUR ...`（統一縮放 1280×720@30fps，影音交叉淡化）。♻️ 鏡頭直接取柴犬原片的秒數。
5. **檢查**：`ffmpeg -vf "fps=1,scale=320:-1,tile=4x2"` 做 contact sheet 目視確認。

單鏡頭影片 → `public/assets/cat/pet-journey/clips/`；多鏡頭片段 → 同資料夾 `<影片>-s<n>.mp4`；成品 → `public/assets/cat/pet-journey/<影片>.mp4`。

## 進度追蹤

| 影片 | 首幀 | Flow 片段 | 成品 |
|---|---|---|---|
| ① correct-answer | ✅ | — | — |
| 單鏡頭 7 支（first-day、correct-answer×2、night-energy、scratching、climbing、sick） | ✅ | ✅ | ✅ |
| arrival-transition、busy-day-transition、time-passes-aging、busy-daily-care、senior-life | ✅ | ✅ | ✅（待使用者目視確認） |

## 多鏡頭影片補充規則（第二輪修正後）

- **同一間客廳**：每張 ChatGPT 起始畫面都以 `cat-room-master.png` 當第 1 張圖，確保家具/位置/風格在所有影片一致。
- **貓咪**：第 2 張圖用 orange cat 參考圖；**老貓** = faded dull cream-orange fur, washed-out grey-brown stripes, frosted white-grey muzzle and chin, long grey-white whiskers, slightly cloudy tired eyes, thin body with visible shoulder bones, ears pointed。避免使用 "ears drooping"（會造成耳朵變形）。
- **主人**：第 3 張圖用同一張女生參考圖（棕色馬尾、粉色針織毛衣、藍色牛仔褲、白襪，no hoodie, no bag）。
- **逗貓棒**：一定由主人手持，prompt 明寫 "held by her hand, never hanging from the ceiling"。
- **回憶鏡頭**：prompt 加 "warm faded vintage old-photo look, sepia tone, soft grain"；現在的鏡頭用正常色調。
- **情緒**：悲傷用姿勢描述（head low、ears pointed、eyes half closed），主人 "not smiling, sad and wistful"。
- **Vids 被拒（這項要求似乎違反相關條款）**：改用較遠景、手放在背上而非「摟抱/親吻」，或換成別的鏡頭。
- **操作 lesson**：ChatGPT 輸入框先點 (850,750) 再 type；type 與 Enter 必須分開，中間截圖確認文字已進入輸入框。下載後確認檔名是新的（避免撿到舊檔）。
- **Vids 取代**：選取畫布後，第一次點「取代」可能只顯示 tooltip，需確認畫布內容已換成新片段（有時會出現「取代」確認列）。
- 啟用腳本：`newframe.sh NAME`（最新 PNG → start-frames/NAME.png 1280x720）、`newclip.sh NAME`（最新 MP4 → clips/NAME.mp4 + 縮圖）、`splice.py OUT --xf 0.4 SRC:START:DUR ...`（交叉淡化合成）。

## 第三輪修正（arrival-transition 回家後分鏡、長度上限）
- 每支影片最長 15 秒。
- arrival-transition 回家後分鏡：s7 主人在貓的家放下提籠 → s8 貓咪走出提籠（近景）→ s9 貓咪坐姿近景（左側留白）；最後以 ffmpeg drawtext 疊上「歡迎回家」（淡入）。
- 檔案：start-frames/arrival-transition-s7~s9.png、clips/arrival-transition-s7~s9.mp4。
- 注意：ChatGPT 圖片檢視器右上的下載鈕在 (1353,27)，開啟檢視器前該位置是「分享」，誤點會建立公開連結，務必先確認檢視器已開啟。

## 第四輪：單鏡頭影片改用完整家具房間
- first-day、night-energy、sick 改以 cat-room-master 為首幀背景重生（start-frames/first-day-v2、night-energy-v2、sick-v2）。
- 舊版備份在 scripts/cat/_backup/_old_*.mp4。

## 第五輪：sick / night-energy 重做

- sick：起始畫面 `sick-v3.png`（貓咪趴低、毛亂，貓屋就在貓咪右側一隻貓長的距離）。提示詞強調「鏡頭像三腳架完全固定、貓屋/碗/家具位置與大小不變」，避免推近造成貓屋瞬移。動作：虛弱嗅碗→轉頭→蹣跚走進貓屋。
- night-energy：起始畫面 `night-energy-v3.png`（夜間客廳，咖啡桌上有杯子、書、盆栽、面紙盒，貓蹲在桌旁屁股扭動）。動作：撲老鼠→繞地毯狂奔→跳沙發→跳上咖啡桌→掃落桌上物品→跳下繼續亂竄。
- 舊版備份：`_backup/_old2_sick.mp4`、`_backup/_old2_night-energy.mp4`。
- 「歡迎回家」圓潤粉彩字：ChatGPT 產綠幕文字圖 → PIL 去背成透明 PNG → ffmpeg overlay + alpha fade（不要用 -shortest）。
- ChatGPT 若遺失參考圖：用 device_stage_files 後對「附加相片」的 file input 重新 file_upload，提示詞改用 "Using the two attached images …"。

### night-energy 最終做法（兩鏡接合）
- Vids 影片模型會在物品被掃落後讓桌子消失、偶爾出現第二隻貓，單靠提示詞「桌面要空」會讓整張桌子不見。
- 解法：前半段 `_backup/_old3_night-energy.mp4` 的 0–5.4s（貓跳上桌、掃落物品）＋後半段 `clips/night-energy-b.mp4`（起始畫面 `night-energy-v4.png`：桌面清空、物品散落地毯、貓從桌上跳下），用 `splice.py --xf 0.4` 接成 13s。
- 驗收時務必逐格檢查：只有一隻貓、桌子全程存在。

### night-energy 結尾修正（2026-10-13）
- 結尾不用定格：以 ChatGPT 生成「貓坐在空桌上、物品散落地上」的畫面 `night-energy-v5.png`，Vids 生成 8 秒「貓靜靜坐著」的 `clips/night-energy-c.mp4`，接在前半段（跳上桌掃落物品的前 5.0s）後面，`splice.py --xf 0.5`，總長約 12.5s，結尾聲音再淡出 1.2s。

## Round 6 – unified background music (multi-shot videos)
Problem: spliced videos had a different generated soundtrack per shot. A short loop of one shot's audio was rejected (loop too obvious), and one bed over the whole video also masks natural SFX shots (e.g. busy-daily-care: typing + sigh).
Method:
1. Vids → 音樂 → 生成歌曲 (Lyria 3.5), 完整 + 樂器伴奏, prompt asks for a steady, no-drops, no-vocal cozy bed. Insert (2:38), duplicate scenes (場景 → 複製場景) so the timeline is ≥ 64 s.
2. Right panel 音效 → 所有音軌 → expand each scene's 影片 → tick 靜音 (wait ~2 s between clicks, the UI lags). Export MP4 → `Downloads/貓咪.mp4` → `ffmpeg -vn` → `scripts/cat/music/lyria-bed.wav` (64 s, continuous, no loop).
3. `scripts/cat/mix_music.py VIDEO AUDIO_SRC OUT BED_START KEEP_END` keeps the ORIGINAL audio for 0..KEEP_END (SFX shot) and crossfades (0.8 s) into one continuous slice of the bed; a different BED_START per video; level matched to the original loudness; 1.2 s fade-out.
Applied: arrival-transition keep 0–4.5 s (bed @0), night-energy keep 0–5 (bed @16), busy-daily-care keep 0–5 (bed @32), senior-life keep 0–5 (bed @48). Previous versions in `_backup` (`_old_*_mixed-music` = original per-shot audio, `_old_*_looped-bed` = rejected loop version).

### Round 6b – music matched to each scene's mood
One shared calm bed did not fit every scene, so each video got its own Lyria track (prompts in Vids 生成歌曲, instrumental, steady, no drops). Export per track: delete the old music bar, generate, 插入, export MP4, `ffmpeg -vn` → `scripts/cat/music/*-bed.wav` (music starts after a silent lead-in; find with `silencedetect`, slice from just after it). Mix with `mix_music.py … --bed music/X-bed.wav --db N`.
- arrival-transition: calm warm bed (lyria-bed.wav) over the WHOLE video (drive there → drive home, one track, keep 0).
- night-energy: playful pizzicato/marimba (night-bed.wav), whole video.
- busy-daily-care: original typing/sigh 0–5 s, then gentle tired-but-caring piano/guitar (busy-bed.wav).
- senior-life: slow nostalgic solo piano + strings (senior-bed.wav), whole video.
Previous versions: `_backup/_old_*_music-v1.mp4`.

## Round 7 – sound effects + climbing rebuilt as "cup shatters"
- SFX are procedural (no downloads): `scripts/cat/sfx.py` (kit: thud, paw_step, tap, shatter, clatter, bowl_clink, whoosh, rustle, purr, sigh, chime/sparkle, creak, car_bed, room_tone) and `scripts/cat/add_sfx.py` (per-video cue sheets `CUES`, time in seconds). Usage: `add_sfx.py NAME VIDEO OUT [BASE_AUDIO KEEP_END|none]` — default layers SFX over the video's existing music; busy-daily-care keeps only its first 3.7 s of original audio (typing/sigh) and the second half is SFX only; climbing has no music (`none`).
- climbing: frame at 6.0 s of the old video → ChatGPT "shatter the cup" (`start-frames/climbing-broken.png`) → Vids Omni 8 s (locked camera, cat looks down then at camera) → insert as new scene → export, cut 8 s with ffmpeg → `xfade` 0.2 s after the original's first 5.35 s (cat pushing the cup) → 13.2 s, shatter SFX at the cut (5.25 s). Old version: `_backup/_old_climbing_intact-cup.mp4`.
- Backups: `_old_*_music-only.mp4` = the matched-music versions before SFX.

## Round 8 (climbing 原音 / arrival 字幕重放)
- climbing.mp4：不再用合成音效。影片＝原版 0–5.35 s + 0.2 s 淡入 + 新「杯子摔碎」鏡頭；音訊＝原版 Veo 背景音樂與真實碎裂聲（約 5.2–6.5 s）延伸到 13.2 s。合成版備份為 `_backup/_old_climbing_synth-sfx.mp4`。
- arrival-transition.mp4：最後一幕重新用 `start-frames/arrival-final-src.png`（無字乾淨畫面）在 Vids 生成 8 s（`arrival-final-shot.mp4`），接在原片 10.3 s 後（0.1 s 淡入）；「歡迎回家」用 ChatGPT 綠幕圖去背（`start-frames/arrival-welcome-text.png`），縮成寬 460 px，放在 x=154,y=72（左上中間，離左邊 12%，不遮貓），10.6–11.0 s 淡入。音訊沿用原本（音樂＋音效）。舊版備份為 `_backup/_old_arrival-transition_text-left.mp4`。

## Round 9 (climbing 音訊再改)
- 背景音樂：回到原版 Veo 音樂（不循環），只用 0–5.4 s，4.5–5.4 s 淡出；碎裂聲改用 CC0 真實音效 `sfx-cc0/glass_breaking.wav`（OpenGameArt, Till Behrend），在 5.25 s 疊上（-3 dB）。其後安靜到 13.2 s。
- Vids Lyria 無法生成純音效（第一次被拒、第二次只得到音樂），所以改下載 CC0。
- 備份：`_old_climbing_lyria-bed-no-sfx.mp4`、`_old_climbing_orig-audio.mp4`、`_old_climbing_synth-sfx.mp4`。
