# 米克斯影片｜首幀鎖定流程（Gemini 換狗 → Flow 轉影片）

> 取代 `mixed-video-prompts.md` 的純文字生成方式。每段 Flow prompt 都含 `SOUND:`（該鏡頭的音效與配樂），並要加上【Flow 通用音訊結尾】。
> 參考畫面：`scripts/dog/shiba-ref-frames/`（`<影片名>-s1.png`、`-s2.png`…，依柴犬版鏡頭順序編號）
> 米克斯外觀參考：`public/assets/dog/selection/mixed-breed.png`

---

## 為什麼 prompt 要改

有了起始畫面，**畫風、線條、色調、房間佈置都由圖片決定**。這時如果 prompt 又重新描述一次房間和畫風，模型反而會「照文字重畫」，把畫風拉走。
所以這一版分成兩段：

1. **Gemini 換狗 prompt**：負責做出正確的起始畫面。
2. **Flow 動作 prompt**：很短，只描述「接下來發生什麼動作」，並要求維持起始畫面的樣子。

---

## 流程

1. **Gemini（做起始畫面）**
   - 上傳兩張圖：**圖 1** 是 `shiba-ref-frames/` 裡對應的畫面，**圖 2** 是 `mixed-breed.png`。
   - 貼上下面的【通用換狗指令】；如果該鏡頭有【額外指示】，接在後面一起貼。
   - 檢查結果：狗要是黑背、棕褐色臉頰和腿、兩眼上方有棕色眉斑、白胸斑、短毛、長尾下垂；線條粗細和色調要跟圖 1 一樣。不對就重新生成。
2. **Flow（轉影片）**
   - 選 **Frames to Video**，把 Gemini 做好的圖設成起始畫面（breed-size 同時設起始和結束畫面）。
   - 貼上該鏡頭的【Flow 動作 prompt】（含 SOUND）＋【Flow 通用結尾】＋【Flow 通用音訊結尾】。
3. **多鏡頭影片**
   - 每個鏡頭各生成一段，再剪掉多餘的部分、接起來（保留秒數寫在各鏡頭）。
   - **沒有狗的鏡頭直接剪柴犬原片**，不用重新生成（標示 ♻️）。
   - 剪接和溶接可以交給我用 ffmpeg 處理：把生成的影片放進資料夾就好。

---

## 共用段落

**【通用換狗指令】（Gemini，每張都要貼）**
```
Edit image 1. Replace the Shiba Inu with the dog shown in image 2: a lean, medium-sized black-and-tan mixed-breed dog — black saddle on the back, neck, top of the head and top of the tail; rust-tan cheeks, two small tan eyebrow dots above the eyes, tan legs and belly; a small white patch on the chest; large erect triangular ears; short smooth coat (not fluffy); a long tail that hangs low with a slight upward curve at the tip (NOT curled over the back).
Keep the new dog in the same pose, size, position and facing direction as the Shiba. Keep everything else in image 1 exactly unchanged: background, furniture, people, objects, framing, lighting and color grading.
Draw the new dog in the illustration style of image 1, NOT the style of image 2: the same bold dark-brown outline thickness, the same fine fur-texture strokes and soft shading, the same eye highlights and the same warm color tone. Output the same aspect ratio as image 1 (16:9).
```

**【Flow 通用結尾】（每段影片都要貼）**
```
Animate this exact image. Keep the art style, outline thickness, colors, lighting, background and the dog's design exactly as in the start frame for the whole clip. The dog keeps its black-and-tan pattern, erect ears, short coat and long low tail (never curled). Locked camera, no zoom, no pan, no cuts. The dog moves realistically like a real dog, not anthropomorphized. No text appears.
```

**【Flow 通用音訊結尾】（每段影片都要貼，接在【Flow 通用結尾】後面）**
```
AUDIO: include the realistic sound effects and background music described in SOUND. Keep the music soft, low-volume and instrumental only (no vocals), mixed below the sound effects. Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no whispering, no laughing, no talking dog, no distorted, synthetic or eerie sounds. The dog makes only realistic dog sounds.
```

---

## A 型：一鏡到底（6 支）

### ④ `correct-answer.mp4`（4–5 秒）
- 起始畫面：`correct-answer-s1.png`
- 額外指示：無
- Flow 動作：
```
The dog sits on the lavender rug facing the camera, eyes squinted happily, mouth open in a panting smile with tongue out. Its long tail sweeps back and forth on the floor and its head bobs slightly as it pants.
SOUND: soft happy panting, tail thumping on the wooden floor; music: a short bright ukulele-and-glockenspiel jingle.
```

### ⑤ `correct-answer2.mp4`（4 秒）
- 起始畫面：`correct-answer2-s1.png`
- 額外指示：無
- Flow 動作：
```
The dog stands on the lavender rug, body three-quarters to the side, head toward the camera with a bright open-mouth smile. Its long tail wags energetically in wide sweeps, making its hips wiggle side to side, and it squints happily for a moment.
SOUND: happy panting, light paw taps; music: a quick cheerful ukulele jingle with light hand claps.
```

### ⑥ `first-day.mp4`（10 秒，Flow 生成 8 秒即可）
- 起始畫面：`first-day-s1.png`（狗從外出籠裡探頭）
- 額外指示：`Only the dog's head is visible poking out of the carrier opening, same as the Shiba.`
- Flow 動作：
```
The dog peeks out of the carrier, eyes darting around the unfamiliar room. It slowly and cautiously crawls out, body low, and stands beside the carrier sniffing the air, tail held low, ears half back. Then it turns back and presses its body against the side of the carrier, glancing around nervously, not moving away. No people appear.
SOUND: quiet room tone, a wall clock ticking softly, faint sniffing, soft careful paw steps on the rug, a plastic carrier creak; music: very soft, tentative solo piano.
```

### ⑦ `barking.mp4`（7 秒）
- 起始畫面：`barking-s1.png`
- 額外指示：`The dog is barking with its mouth open, same as the Shiba.`
- Flow 動作：
```
The dog stands on the lavender rug facing left toward the door, body braced and leaning forward, ears fully erect, tail raised stiffly. It barks repeatedly, mouth opening wide with each bark. Midway it pauses, closes its mouth and tilts its head to listen, then barks twice more.
SOUND: sharp, realistic medium-sized dog barks, a faint muffled knock or doorbell outside, quiet evening room tone; music: a low, subtle tense pizzicato pulse.
```

### ⑨ `urinate-and-defecate.mp4`（9 秒，Flow 生成 8 秒即可）
- 起始畫面：`urinate-and-defecate-s1.png`（狗從左邊入鏡）
- 額外指示：無
- Flow 動作：
```
The dog trots in from the left, lowers its nose to the lavender rug, sniffs and circles once. It squats in side view and leaves a small, simple cartoon brown pile on the rug, then sits calmly beside it with a neutral face, sniffs it briefly, and trots off to the right, leaving the pile behind. Tasteful and child-friendly.
SOUND: light paw steps on wood, sniffing, quiet room tone; music: soft, slightly playful bassoon-and-pizzicato tune.
```

### ⑫ `sick.mp4`（8 秒）｜米克斯專屬：牙周病＋跳蚤
- 起始畫面：`sick-s1.png`
- 額外指示：
```
Do NOT copy the red skin patches from the Shiba — the new dog's coat is clean. The dog sits beside the green food bowl, head slightly lowered toward the food, looking hesitant.
```
- Flow 動作：
```
The dog sniffs the kibble in the green bowl, takes one careful bite, then stops and drops it. It paws hesitantly at the side of its mouth and licks its lips. When it opens its mouth, its gums look swollen and reddish, and a faint wavy cartoon smell line drifts from its mouth; it turns away from the bowl. Then it sits and scratches its neck and side rapidly with a hind leg, small curved itch-lines appearing, a few tiny black dots faintly visible in its short fur. Finally it lies down on its side on the rug with low energy, eyes half-closed, food left uneaten.
SOUND: sniffing, a single kibble crunch then silence, lip-licking, rapid scratching of paw on fur with a jingling collar tag, a soft tired sigh; music: quiet, slightly worried solo piano.
```

---

## B 型：多鏡頭（8 支）

### ① `arrival-transition.mp4`（約 10 秒）
> `pet-journey/mixed/` 裡已經有一支。如果那支可以用，就跳過這一支。

| 鏡頭 | 起始畫面 | 保留 | 做法 |
|---|---|---|---|
| 1 車子白天 | — | 0–1.4s | ♻️ 剪柴犬原片 |
| 2 收容所 | `arrival-transition-s2.png` | 2s | Gemini 換狗 → Flow |
| 3 夕陽開車 | — | 3.5–5s | ♻️ 剪柴犬原片 |
| 4 提籠進客廳 | — | 5–6.5s | ♻️ 剪柴犬原片（籠子裡的狗看不清楚；如果看得出是柴犬，就改成 Gemini 換狗 → Flow） |
| 5 走出籠子 | `arrival-transition-s5.png` | 2s | Gemini 換狗 → Flow |
| 6 歡迎回家 | `arrival-transition-s6.png` | 1.5s | Gemini 換狗（「歡迎回家」字樣會保留下來）→ Flow |

鏡頭 2 動作：
```
The woman kneels and gently guides the dog into the open grey-and-navy carrier with both hands; the dog steps in cautiously, ears slightly back. The other dogs in the kennels behind stay where they are.
SOUND: shelter ambience with distant soft barks, a carrier door latch click; music: warm hopeful piano and strings.
```
鏡頭 5 額外指示：`The dog is halfway out of the carrier, same as the Shiba.`
鏡頭 5 動作：
```
The dog slowly steps out of the carrier onto the lavender rug one paw at a time, sniffing the air and looking around with alert, curious eyes.
SOUND: soft paw steps, sniffing, a carrier door creak; music: warm hopeful piano and strings, gently rising.
```
鏡頭 6 額外指示：`Keep the Chinese title "歡迎回家" exactly as it is.`
鏡頭 6 動作：
```
The dog sits calmly on the lavender rug, mouth softly open in a relaxed pant, tail sweeping gently on the floor. The title text stays perfectly still and unchanged.
SOUND: relaxed panting, tail brushing the floor; music: the warm piano-and-strings theme resolving into a gentle, heartwarming ending.
```

### ② `busy-day-transition.mp4`（約 13 秒）

| 鏡頭 | 起始畫面 | 保留 | 做法 |
|---|---|---|---|
| 1 辦公室白天→夜 | — | 0–5s | ♻️ 剪柴犬原片 |
| 2 狗獨自等待 | `busy-day-transition-s2.png` | 0.8s | 和鏡頭 3 用同一段影片 |
| 3 開門迎接 | `busy-day-transition-s2.png` | 3.5s | Gemini 換狗 → Flow（鏡頭 2、3 一次生成） |
| 4 飼主臉部近景 | — | 9–11s | ♻️ 剪柴犬原片 |
| 5 摸狗 | `busy-day-transition-s5.png` | 2.5s | Gemini 換狗 → Flow |

鏡頭 2–3 動作：
```
The dog sits alone on the pale rug facing the door, waiting. After a moment the door on the left opens and the woman steps in with a shoulder bag, looking tired. The dog's ears perk up, its tail wags low and fast, and it trots over to greet her, briefly placing its front paws on her legs.
SOUND: quiet night room tone, a clock ticking, key in the lock, a door creak, excited paw steps on wood, a soft happy whine; music: shifts from quiet and lonely to warm and tender piano.
```
鏡頭 5 額外指示：`Close-up: the woman's hand is stroking the dog's head and cupping its chin; the dog's eyes are half-closed and content.`
鏡頭 5 動作：
```
The woman gently strokes the dog's head and cups its chin; the dog leans into her hand with eyes half-closed and a relaxed open mouth. Slow, calm, tender movement.
SOUND: soft fur rustle, a contented dog sigh; music: tender, warm piano and soft strings.
```

### ③ `time-passes-aging.mp4`（約 10 秒）

| 鏡頭 | 起始畫面 | 保留 | 版本 |
|---|---|---|---|
| 1 幼犬 | `time-passes-aging-s1.png` | 1.5s | 幼犬 |
| 2 青年接飛盤 | `time-passes-aging-s2.png` | 2s | 成犬 |
| 3 壯年奔跑 | `time-passes-aging-s3.png` | 2s | 成犬 |
| 4 老年 | `time-passes-aging-s4.png` | 4.5s | 老犬 |

鏡頭 1 額外指示：
```
Draw the dog as a 3-month-old chubby puppy with the same black-and-tan pattern, soft half-folded ears, round belly, big paws and a short tail.
```
鏡頭 1 動作：
```
The chubby puppy bounces clumsily along the dirt path near the bench, tail wagging.
SOUND: park birdsong, light quick puppy paw patter, a tiny happy yip; music: playful, bouncy music box melody.
```
鏡頭 2 動作：
```
The young dog leaps up, catches the red flying disc in its mouth and lands on the path.
SOUND: a whoosh of the flying disc, a soft catch, paws landing on dirt, birdsong; music: upbeat acoustic guitar.
```
鏡頭 3 動作：
```
The dog runs at full stride along the path past the green tennis ball, ears back, tongue out.
SOUND: fast paw thuds on the dirt path, panting, wind, birdsong; music: lively acoustic guitar at its most energetic.
```
鏡頭 4 額外指示：
```
Draw the dog as a senior: the same black-and-tan pattern but with the black faded to charcoal, a grey-white frosted muzzle, chin and eye area, a slightly thinner body and a slightly arched back.
```
鏡頭 4 動作：
```
The old dog walks slowly along the path with its head low and eyes half-closed, then stops and stands quietly.
SOUND: slow, soft uneven paw steps, gentle breeze, distant birds; music: slow, nostalgic solo piano.
```

### ⑧ `chewing-on-things.mp4`（約 8 秒）

| 鏡頭 | 起始畫面 | 保留 |
|---|---|---|
| 1 咬抱枕、爬沙發 | `chewing-on-things-s1.png` | 1.5s |
| 2 咬櫃腳 | `chewing-on-things-s2.png` | 2s |
| 3 咬抱枕、掀地毯 | `chewing-on-things-s3.png` | 2s |
| 4 轉頭開心 | `chewing-on-things-s4.png` | 2.5s |

鏡頭 1 動作：
```
The dog tugs a cushion with its teeth on the rug, white stuffing scattered around, then puts its front paws up on the sofa arm and bites a sofa cushion.
SOUND: fabric ripping, playful little growls, paws scrabbling on the sofa; music: mischievous pizzicato strings.
```
鏡頭 2 動作：
```
The dog crouches and gnaws on the wooden sideboard leg, head tilted, eyes squeezed shut in concentration.
SOUND: wood gnawing and crunching; music: mischievous pizzicato strings continuing.
```
鏡頭 3 動作：
```
The dog mouths a cushion on the floor, then grabs the edge of the lavender rug in its teeth and pulls it up, shaking its head playfully.
SOUND: fabric tugging, rug shuffling on the floor, playful growls; music: mischievous pizzicato strings.
```
鏡頭 4 動作：
```
The dog stands among the scattered white stuffing facing the camera with a bright open-mouth pant and a wagging tail, completely unaware anything is wrong.
SOUND: happy panting, tail swishing; music: the mischievous tune ending on a light comedic note.
```

### ⑩ `busy-daily-care.mp4`（約 10 秒）

| 鏡頭 | 起始畫面 | 保留 | 做法 |
|---|---|---|---|
| 1 辦公室夜晚 | — | 0–4s | ♻️ 剪柴犬原片 |
| 2 狗獨自坐著 | `busy-daily-care-s2.png` | 2s | Gemini 換狗 → Flow |
| 3 狗趴下難過 | `busy-daily-care-s3.png` | 4s | Gemini 換狗 → Flow |

鏡頭 2 動作：
```
The dog sits alone on the lavender rug next to the empty food bowl, looks toward the door, then slowly lowers its head.
SOUND: a quiet house, a wall clock ticking, faint distant city traffic; music: subdued, lonely solo piano.
```
鏡頭 3 額外指示：`The dog lies with its chin resting on its front paws, ears drooping, eyes looking up sadly.`
鏡頭 3 動作：
```
The dog lies with its chin on its front paws, eyes looking up sadly, then lets out a small sigh through its nose; its ears droop and its tail lies flat. Very slow, subtle movement.
SOUND: a soft sigh through the nose, a clock ticking in the silence; music: subdued, gentle, slightly sad piano.
```

### ⑪ `senior-life.mp4`（約 8–9 秒）
> 四個鏡頭都用老犬版。每一張都要在【通用換狗指令】後面加上：
```
Draw the dog as a senior: the same black-and-tan pattern but with the black faded to charcoal, a grey-white frosted muzzle, chin and eye area, a slightly thinner body and a slightly arched back.
```

| 鏡頭 | 起始畫面 | 保留 |
|---|---|---|
| 1 門邊趴著 | `senior-life-s1.png` | 0.8s |
| 2 公園散步停下 | `senior-life-s2.png` | 2.8s |
| 3 草地上喘氣 | `senior-life-s3.png` | 1.8s |
| 4 家中撫摸 | `senior-life-s4.png` | 3s |

鏡頭 1 動作：
```
The old dog lies on the rug near the half-open door, lifting its head slightly.
SOUND: quiet room tone, a door creaking softly; music: gentle, warm but melancholy piano.
```
鏡頭 2 動作：
```
The woman walks the old dog on a red leash; the dog walks slowly and stiffly, then stops, its back legs trembling. The woman bends down and supports its body with both hands, looking worried.
SOUND: birdsong, slow uneven paw steps, a leash jingle, soft panting; music: gentle, melancholy piano.
```
鏡頭 3 動作：
```
The old dog lies on the grass panting softly beside the tennis ball, eyes tired and droopy.
SOUND: soft tired panting, a light breeze through the grass; music: gentle, melancholy piano.
```
鏡頭 4 動作：
```
The woman kneels on the rug and slowly strokes the old dog's head; the dog lies on its side with eyes closed, breathing slowly.
SOUND: quiet room tone, slow calm breathing, soft fur rustle; music: tender, heartwarming piano and soft strings.
```

### ⑬ `breed-size.mp4`（約 8 秒）｜米克斯專屬：成犬體型無法預測
> 用 Flow 的**起始畫面＋結束畫面**一次生成，讓模型自己補出「長大」的過程。

**起始畫面**（Gemini）
- 上傳：圖 1 `correct-answer2-s1.png`（全彩客廳），圖 2 `mixed-breed.png`，圖 3 `arrival-transition-s2.png`（飼主外觀參考）
- 指令（這張**不用**貼通用換狗指令，直接用這段）：
```
Edit image 1. Remove the Shiba Inu. Keep the room, framing, outline thickness, colors and lighting exactly unchanged.
Add the young woman from image 3 (brown ponytail, pink sweatshirt, blue jeans, white sneakers), drawn in the same style, sitting cross-legged in the middle of the lavender rug and smiling down at a tiny 3-month-old chubby puppy curled in her lap. The puppy has the color pattern of the dog in image 2 (black back, tan cheeks, tan eyebrow dots, tan legs, tiny white chest patch), soft half-folded ears, a round belly and big paws. Next to her on the rug: a very small round dog bed, a tiny food bowl and a short thin leash.
Draw everything in the illustration style of image 1 (bold dark-brown outlines, fur strokes, warm tones). 16:9.
```

**結束畫面**（Gemini）
- 上傳：圖 1 是**上一步做好的起始畫面**，圖 2 `mixed-breed.png`
- 指令：
```
Edit image 1. Keep the room, the woman's position, the tiny dog bed, the tiny bowl, framing, outline thickness, colors and lighting exactly unchanged.
Replace the puppy with the same dog fully grown, matching image 2: a lean, long-legged, long-bodied black-and-tan adult, clearly much bigger than expected. It is trying to lie in the tiny dog bed but only its front paws and chest fit; the rest of its body spills over onto the rug, and the tiny bowl looks miniature next to it. The woman sits in the same spot holding up the short little leash, staring with wide surprised eyes and an open mouth.
Same illustration style as image 1. 16:9.
```

**Flow 動作**（設好起始與結束畫面後）：
```
Months pass in the same locked shot: the puppy in the woman's lap gradually grows — into a lanky adolescent, then a young adult — while the tree outside the window turns from green to golden to green. The grown dog steps onto the tiny bed and flops down with only its front half fitting. The woman's smile turns into wide-eyed surprise as she holds up the short leash.
SOUND: soft puppy whimpers and happy yips, gentle whooshes as time passes, a heavier thump as the grown dog flops into the tiny bed; music: light, cheerful ukulele that ends on a playful comedic sting at her surprise.
```

### ⑭ `breed-individual.mp4`（約 9–10 秒）｜米克斯專屬：個體差異

| 鏡頭 | 起始畫面 | 保留 |
|---|---|---|
| 1 翻圖鑑、對不上 | 用 `correct-answer2-s1.png` 生成 | 3s |
| 2 三隻不同的米克斯 | 用 `correct-answer-s1.png` 生成 | 3s |
| 3 觀察自己的狗 | 用鏡頭 1 的成品生成 | 4s |

**鏡頭 1 起始畫面**（上傳：圖 1 `correct-answer2-s1.png`，圖 2 `mixed-breed.png`，圖 3 `arrival-transition-s2.png`；先貼【通用換狗指令】，再接下面這段）：
```
The dog now lies on the lavender rug. Also add the young woman from image 3 (brown ponytail, pink sweatshirt, blue jeans, white sneakers), drawn in the same style as image 1, sitting on the sofa on the right holding a thick open illustrated dog-breed book whose pages show drawings of different purebred dogs (no readable text). She looks from the book to the dog with a puzzled expression.
```
Flow 動作：
```
The woman flips a page, looks up at the dog lying on the rug, back down at the book, then up again, tilting her head, puzzled. The dog lies calmly and flicks an ear.
SOUND: pages flipping, quiet room tone; music: a light, curious pizzicato 'question' motif.
```

**鏡頭 2 起始畫面**（上傳：圖 1 `correct-answer-s1.png`，圖 2 `mixed-breed.png`；這張不用貼通用換狗指令，直接用這段）：
```
Using the illustration style of image 1 (bold dark-brown outlines, fur strokes, warm amber tones), create a new 16:9 picture on a plain warm cream background. Three very different mixed-breed dogs stand side by side: on the left a small dog with floppy ears and a white coat with brown spots; in the middle the black-and-tan dog from image 2 with erect ears; on the right a large shaggy dog with a patchy brindle coat. Above them floats an open cartoon book whose pages each show only a big simple question mark. No text.
```
Flow 動作：
```
Each dog behaves differently in a natural way: the small one hangs back cautiously with its tail low, the black-and-tan one looks around alertly with ears swiveling, and the large one flops down calmly and rolls onto its side. The question-mark book floats gently.
SOUND: a small nervous whine, alert sniffing, a big relaxed dog sigh as it flops down; music: playful, curious xylophone and pizzicato.
```

**鏡頭 3 起始畫面**（上傳：圖 1 是鏡頭 1 的成品；直接用這段）：
```
Edit image 1. Keep the room, style, outline thickness, colors and the dog's design exactly unchanged. The book is now closed on the sofa. The woman sits cross-legged on the lavender rug next to the dog, holding out her hand; a small pile of dog toys lies on the rug nearby; a small notebook lies beside her.
```
Flow 動作：
```
The dog sniffs the woman's outstretched hand, walks over to the toy pile, picks one particular toy, brings it back and lies down at her feet with its chin on the toy, tail gently wagging. The woman smiles warmly and picks up the small notebook.
SOUND: sniffing, soft paw steps, a toy squeak, tail brushing the rug; music: warm, gentle acoustic guitar ending on a soft, happy note.
```

---

## 生成完之後

把生成的片段放進 `public/assets/dog/pet-journey/mixed/clips/`（建議檔名：`<影片名>-s<鏡頭>.mp4`，例如 `busy-day-transition-s3.mp4`），告訴我一聲，我會：
- 依上面的「保留」秒數剪掉多餘的部分
- 補上 ♻️ 的柴犬原片片段
- 用溶接接成完整影片（畫面與聲音一起交叉淡化，避免音樂在鏡頭交界處突然斷掉），輸出成 1280×720，存到 `pet-journey/mixed/`
- ♻️ 柴犬原片片段會連同原本的音效和配樂一起使用
