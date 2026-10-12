# 橘貓影片｜首幀鎖定流程（ChatGPT 換貓 → Flow 轉影片）

> 仿 `scripts/dog/mixed-frames-workflow.md`，但**全部統一成同一種畫風**：以 `scripts/cat/cat-room-ref.webp`（貓咪客廳）＋橘貓為準。
> 外觀參考：`public/assets/cat/feeding/orange-cat-happy.png`
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

## 進度追蹤

| 影片 | 首幀 | Flow 片段 | 成品 |
|---|---|---|---|
| ① correct-answer | ✅ | — | — |
| 其餘 12 支 | — | — | — |
