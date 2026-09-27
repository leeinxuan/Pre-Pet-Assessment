# 米克斯影片 Prompt 全集（依柴犬版分鏡重寫）

> Pre-Pet Assessment — `public/assets/dog/pet-journey/mixed/`
> 依據：逐支拆解 `public/assets/dog/pet-journey/shiba/` 的 14 支影片（每 0.7 秒取一格）後重寫。
> 原則：**11 支與柴犬版同分鏡、同劇情，只把狗換成米克斯**；**3 支（breed-size、breed-individual、sick）依 `mixed-asset-spec.md` 與遊戲資料 `app/data/species/dog/*.ts` 的題目內容重新設計**。

## 〇、v2 修正（第一次試生成後）

試生成的 barking 有三個問題：①配音很怪 ②輪廓線太細 ③色調偏淡、偏冷。和柴犬版逐格比對後發現：

| 項目 | 柴犬版 | 試生成的米克斯 |
|---|---|---|
| 平均亮度（HSV V） | 166（較深、較濃） | 188（偏亮、偏白） |
| 平均飽和度（HSV S） | 91（暖琥珀色） | 69（粉彩、褪色） |
| 輪廓線 | 深棕黑色粗線，角色外框約 3–4 px | 細而均勻的線 |
| 毛的畫法 | 有細毛筆觸、漸層陰影、眼睛有反光點 | 平塗色塊，像向量圖 |
| 角色比例 | 頭稍大、眼睛圓、表情可愛 | 偏瘦長，接近杜賓犬 |

**這一版的修正**：每支 prompt 開頭加上 `RENDER STYLE` 段（粗線、毛筆觸、暖琥珀色調、可愛比例，並明確排除粉彩和細線）；音效段改成 `SOUND EFFECTS` 加 `AUDIO RULES`（只保留寫實音效和很小聲的純音樂，禁止人聲、說話、哼唱、詭異音效）。

**最有效的做法：用首幀鎖住畫風（強烈建議）**
只靠文字，很難讓畫風和柴犬版完全一樣。`scripts/dog/shiba-ref-frames/` 裡已經放好每支柴犬影片的開場畫面（`<檔名>-start.png`）。
1. 把對應的 `xxx-start.png` 和 `public/assets/dog/selection/mixed-breed.png` 一起丟給 Gemini，輸入：
   `Edit the first image: replace the Shiba Inu with the black-and-tan dog from the second image, in the same pose and position. Keep the background, outline thickness, colors, lighting and drawing style exactly the same. Short smooth coat, long tail hanging low (not curled).`
2. 在 Flow 選「畫面轉影片（Frames to Video）」，把這張圖設成**起始畫面**，再貼上下面的 prompt。
3. 如果聲音還是怪，可以在 Flow 關掉音訊、生成無聲版，之後再另外疊上音效。


---

## 一、柴犬版影片分析

### 1. 規格

| 項目 | 實測 |
|---|---|
| 解析度 | 1280×720（16:9） |
| 長度 | 答對動畫 4–4.5 秒；情境題 7–10 秒；忙碌過場約 14 秒 |
| 聲音 | 全部都有音軌（音效＋配樂） |
| 文字 | 只有 `arrival-transition` 結尾出現「歡迎回家」 |

### 2. 四種畫面模式

柴犬版不是單一畫風，而是依情境切換四種背景模式，米克斯版要照用：

**模式 S：棕褐線稿客廳（最有辨識度）**
用於 first-day、urinate-and-defecate、sick、correct-answer，以及 chewing 的開場。
背景幾乎是單色：米色／奶茶色底，用細的咖啡色線條描出家具，只有很淡的色塊，像色鉛筆草稿。**狗是畫面裡唯一上滿色的東西**，有清楚的深色輪廓線和平塗陰影，所以非常跳。
固定佈景（每支位置都一樣）：最左邊是有門板的木門，門把是黃銅色，旁邊有電燈開關；後牆有一個矮的 mid-century 邊櫃，上面放盆栽，上方掛兩個小相框；後牆還有一幅山與太陽的風景畫和一個圓形掛鐘；右上角吊著半球形吊燈，往下打一道暖光；右上方有一小層書架；右邊是米色拉扣雙人沙發，上面點綴小小的 ✦ 記號；右前景有被裁掉一半的矮木茶几；左邊畫框外露出一盆大葉植物；牆面有淡淡的磚紋；淺木紋地板；中央是一塊圓形薰衣草紫地毯，上面有幾個小塗鴉記號。

**模式 C：全彩暖色客廳**
用於 barking、correct-answer2、shedding、busy-daily-care 的居家段、chewing 的後段、senior-life 的居家段。
和模式 S 格局相同（木門、邊櫃、掛鐘、吊燈或立燈、沙發、紫地毯），但全部上色：蜂蜜色木地板、米色牆、琥珀色燈光，沙發靠墊是藍綠、芥末黃、粉紅，窗簾是藍色或杏色。乾淨的輪廓線、平塗陰影，繪本感的動漫風。

**模式 O：戶外公園**
用於 time-passes-aging（偏低飽和的棕褐色調）、senior-life（較飽和的綠）、rainy-day-walk（陰天灰綠）。
固定元素：蜿蜒的土色步道、木長椅、黑色路燈、布告欄、池塘、遠方淡淡的城市輪廓、前景小花。

**模式 W：辦公室（飼主視角的劇情段）**
用於 busy-day-transition、busy-daily-care 的開場。
畫風較細緻、偏厚塗的動漫風。飼主側面坐在電腦前，電腦上是圖表，後面是窗外城市，牆上有圓鐘、吊燈，桌上有檔案夾、馬克杯、桌曆、盆栽。窗外天色從白天變黃昏再變夜晚，用來表示時間過去。

### 3. 兩種分鏡節奏

**A 型：單一固定鏡頭（一鏡到底）**
包括 correct-answer、correct-answer2、barking、first-day、urinate-and-defecate、sick。
鏡頭完全不動，狗在紫色地毯附近做一個完整的動作，從開始演到結束。

**B 型：多鏡敘事（2–6 個鏡頭）**
包括 arrival、busy-day-transition、busy-daily-care、time-passes-aging、senior-life、chewing，以及柴犬品種題 shedding、rainy-day-walk。
每個鏡頭本身不移動，鏡頭之間用切換或溶接。結尾常給一個**中近景**強調情緒，例如狗趴著的難過臉、飼主摸狗、衣服上的狗毛特寫。
> ⚠️ 這和 spec 的「全程中景、不切換」不同。為了跟柴犬版一致，下面的 prompt 沿用柴犬版的做法：B 型影片每個鏡頭固定不動，鏡頭之間溶接，結尾可以用中近景。如果想嚴格照 spec，把各 prompt 裡的「medium-close」改成「medium shot」即可。

### 4. 敘事公式（品種題／生病題）

柴犬品種題（shedding、rainy-day-walk）和 sick 都是同一個三段結構，米克斯的 3 支新影片也照這個寫：

1. **呈現問題**：狗表現出這個品種或健康議題的具體行為，例如掉毛、門邊等著出門、抓癢。
2. **生活影響或飼主反應**：例如衣服上沾滿毛、飼主皺眉幫狗穿雨衣。
3. **收尾畫面**：一個情緒明確的定格，讓題目有代入感，但不直接給出答案。

---

## 二、米克斯外觀：固定描述

參考圖：`public/assets/dog/selection/mixed-breed.png`
（整體像台灣常見的黑褐色米克斯，也就是「台灣土狗」型的黑棕犬）

**要畫出來的特徵**
- 體型：中型犬，身形精瘦修長，腿長，胸深、腰細，不胖不圓
- 毛：**短而服貼的短毛**，有光澤，**不蓬鬆**
- 花色：背、頸、頭頂、尾巴上側是黑色（黑色鞍背）；臉頰、口鼻兩側、**兩眼上方的小眉斑**、耳朵內側、四肢、腹側、尾巴下側是棕褐色（鏽棕）；胸口有一小塊白色 V 形斑
- 耳朵：大的直立三角耳，耳朵內側是棕褐色
- 尾巴：**長尾巴，自然下垂，尾端微微往上彎**，**不會像柴犬那樣捲在背上**
- 臉：略長的吻部，深棕色的眼睛，黑鼻子

**英文固定用語（每支影片都要貼）**
```
THE DOG (keep identical in every shot): a medium-sized, lean, athletic Taiwanese black-and-tan mixed-breed dog. Short, smooth, sleek coat (not fluffy). Black saddle covering the back, neck, top of the head and top of the tail; warm rust-tan on the cheeks, muzzle sides, two small tan eyebrow dots above the eyes, inner ears, all four legs, belly and underside of the tail; a small white V-shaped patch on the chest. Large erect triangular ears. Slightly long muzzle, dark brown eyes, black nose. Long tail that hangs low with a gentle upward curve at the tip — the tail is NOT curled over the back. Long slim legs, deep chest, tucked waist. It is clearly NOT a Shiba Inu, not fluffy, not orange.
```

**老年版（time-passes-aging 後段、senior-life）**
```
SENIOR VERSION of the same dog: identical black-and-tan pattern and build, but the black coat is slightly faded to charcoal, the muzzle, chin and area around the eyes are frosted with grey-white hairs, eyes a little cloudy and droopy, body slightly thinner, back slightly arched, slower careful movements.
```

**幼犬版（time-passes-aging 開頭、breed-size 前段）**
```
PUPPY VERSION of the same dog: a 3-month-old chubby black-and-tan puppy with the same color pattern (black back, tan cheeks, eyebrow dots and legs, tiny white chest patch), soft ears half-folded at the tips, round belly, oversized paws, short stubby tail.
```

**飼主固定用語**
```
THE OWNER: a young woman in her twenties with long brown hair in a ponytail, wearing a pink crew-neck sweatshirt, blue jeans and white sneakers. Semi-realistic anime proportions (not chibi).
```

---

## 三、共用風格模組（依模式選一段貼入）

**【STYLE-S】棕褐線稿客廳**
```
2D hand-drawn anime-style animation, 16:9. The background room is drawn as medium-weight sepia-brown ink line art over a flat warm beige/cream wash — nearly monochrome, very low saturation, like a colored-pencil sketch with only faint tonal fills. The dog is the only fully colored element: bold dark-brown ink outlines, flat cel-shaded colors with one soft shadow tone, so it stands out clearly from the pale background.
Fixed room layout: a paneled wooden front door with a brass handle on the far left and a light switch beside it; a large leafy potted plant cropped at the left edge; a low mid-century sideboard against the back wall with a small potted plant and two tiny hanging photo frames above it; a framed landscape picture (mountain and sun) and a round analog wall clock on the back wall; a dome pendant lamp hanging at the upper right, casting a soft cone of warm light; a small wall shelf with books at the top right corner; a beige tufted two-seat sofa on the right decorated with tiny ✦ sparkle marks; a low wooden coffee table cropped in the right foreground; faint brick texture on the walls; light wood plank floor; a round lavender-purple rug in the center with a few tiny scribble marks. Quiet, cozy, warm ambient light.
```

**【STYLE-C】全彩暖色客廳**
```
2D anime-style storybook animation, 16:9, fully colored. Clean dark outlines, cel shading with soft painted gradients, rich warm amber-honey palette. A cozy living room: warm beige walls with faint brick texture, honey-colored wood plank floor, a paneled wooden door on the left, a low wooden sideboard with a leafy plant and small framed pictures above, a round wall clock, a glowing amber pendant lamp or floor lamp, a beige sofa with teal, mustard-yellow and dusty-pink cushions, curtains at a window, green potted plants, and a round lavender-purple rug in the center. Warm golden ambient lighting, cozy slice-of-life mood.
```

**【STYLE-O】戶外公園**
```
2D anime-style animation, 16:9, painted storybook backgrounds with clean outlines. A city park: a winding dirt path through soft green grass, rounded leafy trees, a wooden bench, a black iron lamp post, a wooden notice board with small posters, a small pond, a faint city skyline in the distance, small red, white and yellow flowers in the foreground.
```

**【STYLE-W】辦公室**
```
2D anime-style animation, 16:9, slightly more detailed painterly rendering. An office cubicle beside a large window with a city skyline view; a round wall clock and a hanging lamp above; a desk with a computer monitor showing charts, a keyboard, a teal mug, a desk calendar, stacked blue binders and potted plants; a bookshelf of binders on the left. The woman is seen in side profile sitting in a black office chair.
```

**【GLOBAL】全域規則（每支影片最後都要貼）**
```
Keep the dog's appearance 100% consistent across all shots. Each shot uses a locked, fixed camera (no zoom, no pan). Animals behave realistically based on natural canine body language, not anthropomorphized — no human-like gestures. Include only realistic sound effects and very soft instrumental background music — no human voices, speech, singing or humming. No text, no subtitles, no logos on screen. 1280x720, 16:9.
```

---

## 四、影片 Prompt（14 支）

每支影片的結構是：柴犬版分鏡（附秒數）→ 米克斯版 prompt。組合方式是 **STYLE 模組＋THE DOG＋（THE OWNER）＋分鏡內容＋GLOBAL**。下面每支 prompt 都已經組好，可以直接整段複製使用。

---

### ① `arrival-transition.mp4`：接回家過場｜B 型｜約 10 秒｜同柴犬版

**柴犬版分鏡**
| 秒數 | 畫面 |
|---|---|
| 0–1.4 | 白天，圓潤的藍色小車由左往右開在鄉間雙線道，背景是綠丘、大樹、白雲 |
| 1.4–3.5 | 收容所（全彩）：飼主跪在地上，把柴犬引進灰藍色外出籠；背景籠舍裡有黃金獵犬和其他柴犬 |
| 3.5–5 | 夕陽下同一台車開回家，車窗裡看得到飼主 |
| 5–6.5 | 全彩客廳廣角：飼主提著外出籠走進來，放在紫地毯上，跪下開籠門 |
| 7–8.5 | 中近景：狗從籠子裡慢慢走出來，左右張望 |
| 8.5–10 | 狗坐在紫地毯上開心張嘴；左側出現粉彩圓體字「歡迎回家」 |

```
RENDER STYLE (most important — match exactly): warm hand-drawn 2D storybook anime look. Bold, confident dark-brown/near-black ink outlines, about 3–4 px at 720p — clearly thicker on the dog's outer silhouette, medium weight on furniture — never thin hairlines. The dog has visible fine fur-texture strokes (small hair tufts on the cheeks, chest, neck and legs), soft painted gradient shading on the fur and a white catch-light in each eye — not flat vector fills. Cute storybook character design: slightly large head, big round expressive dark eyes, soft rounded muzzle, friendly face; lean body but not skinny or Doberman-like. Overall color grade: rich warm amber-honey-sepia, medium saturation, slightly deep and golden like lamplight, gently darkened warm corners (soft vignette), faint paper grain. AVOID: pastel, washed-out, pale, cool-toned, low-contrast, thin uniform lines, flat vector art.

2D anime-style storybook animation, 16:9, bold dark-brown ink outlines, cel shading with soft painted gradients, warm cozy palette. A 10-second six-shot sequence joined by soft dissolves; each shot uses a locked, fixed camera.

THE DOG: a medium-sized, lean, athletic Taiwanese black-and-tan mixed-breed dog. Short, smooth, sleek coat (not fluffy). Black saddle covering the back, neck, top of the head and top of the tail; warm rust-tan on the cheeks, muzzle sides, two small tan eyebrow dots above the eyes, inner ears, legs, belly and underside of the tail; a small white V-shaped chest patch. Large erect triangular ears, slightly long muzzle, dark brown eyes, black nose. Long tail that hangs low with a gentle upward curve at the tip — NOT curled over the back. Clearly NOT a Shiba Inu.
THE OWNER: a young woman in her twenties with long brown hair in a ponytail, pink crew-neck sweatshirt, blue jeans, white sneakers. Semi-realistic anime proportions.

Shot 1 (0–1.5s): Bright morning. A small rounded blue compact car drives left to right along a quiet two-lane country road, in a perfect side view. Rolling green hills, round leafy trees, fluffy white clouds, blue sky, little flowers along the roadside.
Shot 2 (1.5–3.5s): Inside a warm animal shelter with cream walls and rows of kennels; other dogs (a golden retriever, a few small dogs) watch from behind the bars. The woman kneels on the floor beside an open grey-and-navy plastic pet carrier and gently guides THE DOG into it with both hands. The dog steps in cautiously, ears slightly back.
Shot 3 (3.5–5s): Golden sunset with pink and orange clouds. The same blue car drives left to right along the same road; the woman is visible through the side window.
Shot 4 (5–6.5s): A cozy fully colored living room — paneled wooden door on the left, wooden bookshelf with books and plants, framed pictures, beige sofa with plaid throw and patterned cushions, round lavender rug. The woman walks in carrying the carrier, sets it down on the rug and kneels to open the grated door.
Shot 5 (6.5–8.5s): Medium-close shot of the carrier on the lavender rug. THE DOG slowly pokes its head out, sniffs the air, then steps out one paw at a time, looking around with alert, curious eyes — natural hesitant behavior in a new place.
Shot 6 (8.5–10s): THE DOG sits calmly on the lavender rug in front of the sofa, mouth softly open in a relaxed pant, tail sweeping gently on the floor. On the left side, large rounded Chinese title text "歡迎回家" gently fades in, in soft pastel colors (peach, mint, cream) with a light glow, like a children's picture-book title. This is the ONLY text in the whole video.

SOUND EFFECTS: gentle car engine, shelter ambience with distant barks, carrier latch click, soft paw steps on the floor, a warm uplifting piano-and-strings melody. Animals behave realistically, not anthropomorphized. No other text or subtitles. AUDIO RULES: keep it quiet and natural — only these realistic sound effects plus very soft, low-volume instrumental background music (gentle acoustic piano or ukulele, no vocals). Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no whispering, no laughing, no talking dog, no distorted, synthetic or eerie sounds. The dog makes only real dog sounds.
```

---

### ② `busy-day-transition.mp4`：忙碌生活過場｜B 型｜約 12–14 秒｜同柴犬版

**柴犬版分鏡**
| 秒數 | 畫面 |
|---|---|
| 0–5 | 辦公室固定鏡頭：窗外從白天→黃昏→星夜；同事的手（深色西裝袖）一次又一次把檔案夾放到桌上，檔案越疊越高；飼主從專心打字變成揉眼睛、撐著頭 |
| 5–5.7 | 夜晚全彩客廳：狗獨自坐在地毯上，面向門口 |
| 5.7–8.5 | 門打開，飼主背著包、一臉疲憊走進來；狗跑過去，前腳搭在她腿上迎接 |
| 9–11 | 飼主臉部近景：從疲憊慢慢變成柔和的微笑 |
| 11.4–14 | 中近景：飼主摸狗的頭、托著下巴，狗瞇眼很享受 |

```
RENDER STYLE (most important — match exactly): warm hand-drawn 2D storybook anime look. Bold, confident dark-brown/near-black ink outlines, about 3–4 px at 720p — clearly thicker on the dog's outer silhouette, medium weight on furniture — never thin hairlines. The dog has visible fine fur-texture strokes (small hair tufts on the cheeks, chest, neck and legs), soft painted gradient shading on the fur and a white catch-light in each eye — not flat vector fills. Cute storybook character design: slightly large head, big round expressive dark eyes, soft rounded muzzle, friendly face; lean body but not skinny or Doberman-like. Overall color grade: rich warm amber-honey-sepia, medium saturation, slightly deep and golden like lamplight, gently darkened warm corners (soft vignette), faint paper grain. AVOID: pastel, washed-out, pale, cool-toned, low-contrast, thin uniform lines, flat vector art.

2D anime-style animation, 16:9, clean outlines, soft cel shading, warm cozy slice-of-life palette. About 13 seconds, four shots joined by soft cuts; each shot uses a locked, fixed camera.

THE DOG: a medium-sized, lean, athletic Taiwanese black-and-tan mixed-breed dog. Short, smooth, sleek coat (not fluffy). Black saddle covering the back, neck, top of the head and top of the tail; warm rust-tan on the cheeks, muzzle sides, two small tan eyebrow dots above the eyes, inner ears, legs, belly and underside of the tail; a small white V-shaped chest patch. Large erect triangular ears, slightly long muzzle, dark brown eyes, black nose. Long tail that hangs low with a gentle upward curve at the tip — NOT curled over the back. Clearly NOT a Shiba Inu.
THE OWNER: a young woman in her twenties with long brown hair in a ponytail, pink crew-neck sweatshirt, blue jeans, white sneakers. Semi-realistic anime proportions.

Shot 1 (0–5s), office, time-lapse feel: The woman sits in side profile at her desk typing at a computer showing charts. Behind her, the large window changes from bright daylight to purple dusk to a starry night with a crescent moon over the city skyline, and the round wall clock hands move forward. A coworker's hand in a dark suit sleeve reaches in from the right again and again, dropping more blue binders onto her desk until the stack towers high. Her posture slowly sags: she rubs her eyes, then rests her head on her hand, exhausted.
Shot 2 (5–5.7s): A fully colored cozy living room at night — beige sofa, coffee table, glowing floor lamp, blue curtains, a window showing the night city and crescent moon, wooden door on the left. THE DOG sits alone on the pale rug, facing the door, ears up, waiting.
Shot 3 (5.7–8.5s): Same framing. The door opens and the woman steps in with a shoulder bag, looking tired. THE DOG's ears perk up, its tail wags low and fast, and it trots over to greet her, briefly placing its front paws on her legs — natural happy greeting behavior.
Shot 4 (8.5–10.5s): Medium-close shot of the woman's face in the warm lamp light: tired eyes, then her expression slowly softens into a gentle smile.
Shot 5 (10.5–13s): Medium-close shot. The woman crouches and strokes THE DOG's head and cups its chin; the dog leans into her hand with eyes half-closed and a relaxed open mouth.

SOUND EFFECTS: keyboard typing, binders thudding on the desk, a clock ticking, key in the lock, door creak, paws on the wood floor, soft happy whine. Music shifts from busy and flat to warm and tender. Animals behave realistically, not anthropomorphized. No text or subtitles on screen. AUDIO RULES: keep it quiet and natural — only these realistic sound effects plus very soft, low-volume instrumental background music (gentle acoustic piano or ukulele, no vocals). Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no whispering, no laughing, no talking dog, no distorted, synthetic or eerie sounds. The dog makes only real dog sounds.
```

---

### ③ `time-passes-aging.mp4`：老化過場｜B 型｜約 10 秒｜同柴犬版

**柴犬版分鏡**
| 秒數 | 畫面 |
|---|---|
| 0–1.4 | 公園（低飽和棕褐色調）：胖胖的幼犬在步道上蹦跳奔跑 |
| 1.4–2.9 | 青年期：狗跳起來咬住紅色飛盤，落地 |
| 3.5–5 | 壯年期：狗大步奔跑，旁邊有網球，毛色最鮮亮 |
| 5.7–10 | 老年期：同一個公園，狗毛色灰白，低頭慢慢走，眼睛半閉 |

```
RENDER STYLE (most important — match exactly): warm hand-drawn 2D storybook anime look. Bold, confident dark-brown/near-black ink outlines, about 3–4 px at 720p — clearly thicker on the dog's outer silhouette, medium weight on furniture — never thin hairlines. The dog has visible fine fur-texture strokes (small hair tufts on the cheeks, chest, neck and legs), soft painted gradient shading on the fur and a white catch-light in each eye — not flat vector fills. Cute storybook character design: slightly large head, big round expressive dark eyes, soft rounded muzzle, friendly face; lean body but not skinny or Doberman-like. Overall color grade: rich warm amber-honey-sepia, medium saturation, slightly deep and golden like lamplight, gently darkened warm corners (soft vignette), faint paper grain. AVOID: pastel, washed-out, pale, cool-toned, low-contrast, thin uniform lines, flat vector art.

2D anime-style animation, 16:9, clean outlines, cel shading. The whole video uses a slightly faded, low-saturation warm sepia palette like an old photograph. About 10 seconds, four life-stage shots joined by soft dissolves; each shot uses a locked, fixed camera, always in the same city park.

Park setting: a winding dirt path through green grass, round leafy trees, a wooden bench, a black iron lamp post, a wooden notice board with posters, a small pond with a white duck, a faint city skyline in the distance, little red, white and yellow flowers in the foreground.

THE DOG: a medium-sized, lean, athletic Taiwanese black-and-tan mixed-breed dog. Short, smooth, sleek coat (not fluffy). Black saddle covering the back, neck, top of the head and top of the tail; warm rust-tan on the cheeks, muzzle sides, two small tan eyebrow dots above the eyes, inner ears, legs, belly and underside of the tail; a small white V-shaped chest patch. Large erect triangular ears, slightly long muzzle, dark brown eyes, black nose. Long tail that hangs low with a gentle upward curve at the tip — NOT curled over the back. Clearly NOT a Shiba Inu.

Shot 1 (0–1.5s) PUPPY: the same dog as a chubby 3-month-old black-and-tan puppy with half-folded ears, round belly and big paws, bouncing clumsily along the path near the bench.
Shot 2 (1.5–3.5s) YOUNG DOG: now a lanky young adult, it leaps up and catches a red flying disc in its mouth, then lands.
Shot 3 (3.5–5.5s) ADULT: in its prime — sleek glossy coat, strong lean body — it runs at full stride along the path past a green tennis ball, ears back, tongue out.
Shot 4 (5.5–10s) SENIOR: the same dog as a senior — black coat faded to charcoal, muzzle and eye area frosted grey-white, slightly thinner body, slightly arched back. It walks slowly along the path with its head low and eyes half-closed, then stops and stands quietly.

SOUND EFFECTS: park birdsong and wind; paws patter quickly at first and become slow and soft. Music moves from playful to gentle and nostalgic. Animals behave realistically, not anthropomorphized. No text or subtitles on screen. AUDIO RULES: keep it quiet and natural — only these realistic sound effects plus very soft, low-volume instrumental background music (gentle acoustic piano or ukulele, no vocals). Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no whispering, no laughing, no talking dog, no distorted, synthetic or eerie sounds. The dog makes only real dog sounds.
```

---

### ④ `correct-answer.mp4`：答對反應 1｜A 型｜約 4–5 秒｜同柴犬版

**柴犬版分鏡**：模式 S 線稿客廳，一鏡到底。狗正面坐在紫地毯中央，瞇眼大笑、吐舌，尾巴輕輕晃，頭微微擺動。

```
RENDER STYLE (most important — match exactly): warm hand-drawn 2D storybook anime look. Bold, confident dark-brown/near-black ink outlines, about 3–4 px at 720p — clearly thicker on the dog's outer silhouette, medium weight on furniture — never thin hairlines. The dog has visible fine fur-texture strokes (small hair tufts on the cheeks, chest, neck and legs), soft painted gradient shading on the fur and a white catch-light in each eye — not flat vector fills. Cute storybook character design: slightly large head, big round expressive dark eyes, soft rounded muzzle, friendly face; lean body but not skinny or Doberman-like. Overall color grade: rich warm amber-honey-sepia, medium saturation, slightly deep and golden like lamplight, gently darkened warm corners (soft vignette), faint paper grain. AVOID: pastel, washed-out, pale, cool-toned, low-contrast, thin uniform lines, flat vector art.

2D hand-drawn anime-style animation, 16:9. The background room is drawn as medium-weight sepia-brown ink line art over a flat warm beige/cream wash — nearly monochrome, very low saturation, like a colored-pencil sketch. The dog is the only fully colored element, with bold dark-brown ink outlines and cel shading with soft painted gradients.
Fixed room layout: paneled wooden door with brass handle and light switch on the far left; a low mid-century sideboard with a small plant and two tiny photo frames above; a framed mountain-and-sun picture and a round wall clock on the back wall; a dome pendant lamp at the upper right casting a soft cone of warm light; a small bookshelf at the top right; a beige tufted sofa on the right with tiny ✦ marks; a wooden coffee table cropped in the right foreground; light wood plank floor; a round lavender-purple rug in the center.

THE DOG: a medium-sized, lean, athletic Taiwanese black-and-tan mixed-breed dog. Short, smooth, sleek coat (not fluffy). Black saddle covering the back, neck, top of the head and top of the tail; warm rust-tan on the cheeks, muzzle sides, two small tan eyebrow dots above the eyes, inner ears, legs, belly and underside of the tail; a small white V-shaped chest patch. Large erect triangular ears, slightly long muzzle, dark brown eyes, black nose. Long tail that hangs low with a gentle upward curve at the tip — NOT curled over the back. Clearly NOT a Shiba Inu.

Single locked shot, 4–5 seconds, medium shot, the dog centered on the lavender rug. THE DOG sits facing the camera with a big happy relaxed expression: eyes squinted into happy crescents, mouth wide open in a panting smile with tongue out. Its long tail sweeps happily back and forth across the floor, and its head bobs slightly as it pants. Its ears are relaxed and slightly back — natural contented body language.

SOUND EFFECTS: soft happy panting, tail thumping on the floor, a short cheerful chime-and-ukulele jingle. No sparkles or effects. Animals behave realistically, not anthropomorphized. No text or subtitles on screen. AUDIO RULES: keep it quiet and natural — only these realistic sound effects plus very soft, low-volume instrumental background music (gentle acoustic piano or ukulele, no vocals). Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no whispering, no laughing, no talking dog, no distorted, synthetic or eerie sounds. The dog makes only real dog sounds.
```

---

### ⑤ `correct-answer2.mp4`：答對反應 2｜A 型｜約 4 秒｜同柴犬版

**柴犬版分鏡**：模式 C 全彩客廳，一鏡到底。狗四腳站在紫地毯上，身體 3/4 側向鏡頭，頭轉向前方微笑，尾巴擺動，身體跟著尾巴左右扭動。

```
RENDER STYLE (most important — match exactly): warm hand-drawn 2D storybook anime look. Bold, confident dark-brown/near-black ink outlines, about 3–4 px at 720p — clearly thicker on the dog's outer silhouette, medium weight on furniture — never thin hairlines. The dog has visible fine fur-texture strokes (small hair tufts on the cheeks, chest, neck and legs), soft painted gradient shading on the fur and a white catch-light in each eye — not flat vector fills. Cute storybook character design: slightly large head, big round expressive dark eyes, soft rounded muzzle, friendly face; lean body but not skinny or Doberman-like. Overall color grade: rich warm amber-honey-sepia, medium saturation, slightly deep and golden like lamplight, gently darkened warm corners (soft vignette), faint paper grain. AVOID: pastel, washed-out, pale, cool-toned, low-contrast, thin uniform lines, flat vector art.

2D anime-style storybook animation, 16:9, fully colored, bold dark-brown ink outlines, cel shading with soft painted gradients, rich warm amber-honey palette. A cozy living room: warm beige walls with faint brick texture, honey wood floor, paneled wooden door on the left with a small framed picture beside it, a low sideboard with a leafy plant, a framed landscape picture, a round wall clock, a glowing dome pendant lamp at the upper right, a small bookshelf, a beige sofa with mustard and blue cushions, a low wooden coffee table, and a round lavender-purple rug in the center.

THE DOG: a medium-sized, lean, athletic Taiwanese black-and-tan mixed-breed dog. Short, smooth, sleek coat (not fluffy). Black saddle covering the back, neck, top of the head and top of the tail; warm rust-tan on the cheeks, muzzle sides, two small tan eyebrow dots above the eyes, inner ears, legs, belly and underside of the tail; a small white V-shaped chest patch. Large erect triangular ears, slightly long muzzle, dark brown eyes, black nose. Long tail that hangs low with a gentle upward curve at the tip — NOT curled over the back. Clearly NOT a Shiba Inu.

Single locked shot, about 4 seconds, medium shot. THE DOG stands on all fours on the lavender rug, body turned three-quarters to the side, head turned toward the camera with a bright open-mouth smile. Its long tail wags energetically in wide sweeps, making its hips wiggle from side to side, and it squints happily for a moment — natural excited, friendly body language.

SOUND EFFECTS: happy panting, a quick upbeat cheerful jingle. No sparkles or effects. Animals behave realistically, not anthropomorphized. No text or subtitles on screen. AUDIO RULES: keep it quiet and natural — only these realistic sound effects plus very soft, low-volume instrumental background music (gentle acoustic piano or ukulele, no vocals). Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no whispering, no laughing, no talking dog, no distorted, synthetic or eerie sounds. The dog makes only real dog sounds.
```

---

### ⑥ `first-day.mp4`：第一天適應新家｜A 型｜約 10 秒｜同柴犬版

**柴犬版分鏡**：模式 S 線稿客廳，一鏡到底。灰藍色外出籠放在紫地毯左半邊、門朝左。
0–2 秒：狗只從籠口探出頭，眼睛往外看。
2–3.5 秒：狗小心地一步一步爬出來。
3.5–6 秒：狗站在籠子旁邊，四處張望、嗅聞。
6–10 秒：狗轉身回到籠子旁邊，身體貼著籠子，不敢離開太遠。
**畫面裡沒有人。**

```
RENDER STYLE (most important — match exactly): warm hand-drawn 2D storybook anime look. Bold, confident dark-brown/near-black ink outlines, about 3–4 px at 720p — clearly thicker on the dog's outer silhouette, medium weight on furniture — never thin hairlines. The dog has visible fine fur-texture strokes (small hair tufts on the cheeks, chest, neck and legs), soft painted gradient shading on the fur and a white catch-light in each eye — not flat vector fills. Cute storybook character design: slightly large head, big round expressive dark eyes, soft rounded muzzle, friendly face; lean body but not skinny or Doberman-like. Overall color grade: rich warm amber-honey-sepia, medium saturation, slightly deep and golden like lamplight, gently darkened warm corners (soft vignette), faint paper grain. AVOID: pastel, washed-out, pale, cool-toned, low-contrast, thin uniform lines, flat vector art.

2D hand-drawn anime-style animation, 16:9. The background room is drawn as medium-weight sepia-brown ink line art over a flat warm beige/cream wash — nearly monochrome, very low saturation, like a colored-pencil sketch. The dog and the pet carrier are the only fully colored elements, with bold dark-brown ink outlines and cel shading with soft painted gradients.
Fixed room layout: paneled wooden door with brass handle and light switch on the far left; a large leafy plant at the left edge; a low mid-century sideboard with a small plant and two tiny photo frames above; a framed mountain-and-sun picture and a round wall clock on the back wall; a dome pendant lamp at the upper right casting a soft cone of warm light; a small bookshelf at the top right; a beige tufted sofa on the right with tiny ✦ marks; a wooden coffee table cropped in the right foreground; light wood plank floor; a round lavender-purple rug in the center.

THE DOG: a medium-sized, lean, athletic Taiwanese black-and-tan mixed-breed dog. Short, smooth, sleek coat (not fluffy). Black saddle covering the back, neck, top of the head and top of the tail; warm rust-tan on the cheeks, muzzle sides, two small tan eyebrow dots above the eyes, inner ears, legs, belly and underside of the tail; a small white V-shaped chest patch. Large erect triangular ears, slightly long muzzle, dark brown eyes, black nose. Long tail that hangs low with a gentle upward curve at the tip — NOT curled over the back. Clearly NOT a Shiba Inu.

Single locked shot, about 10 seconds, wide-medium shot. A grey-and-navy plastic pet carrier sits on the left half of the lavender rug with its grated door open, facing left. No people in the scene.
0–2s: Only THE DOG's head peeks out of the carrier opening; its eyes dart around the unfamiliar room and its ears swivel.
2–3.5s: It slowly and cautiously crawls out, body held low, one paw at a time.
3.5–6s: It stands beside the carrier, sniffing the air and the rug, head turning left and right, tail held low and still, ears half back — natural wary posture in a new place.
6–10s: It turns back and presses its body against the side of the carrier, staying close to its safe spot, glancing around nervously and not venturing further.

SOUND EFFECTS: quiet room tone, a clock ticking softly, faint sniffing and soft paw steps on the rug, gentle, slightly tentative music. Animals behave realistically based on natural fear and curiosity, not anthropomorphized. No text or subtitles on screen. AUDIO RULES: keep it quiet and natural — only these realistic sound effects plus very soft, low-volume instrumental background music (gentle acoustic piano or ukulele, no vocals). Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no whispering, no laughing, no talking dog, no distorted, synthetic or eerie sounds. The dog makes only real dog sounds.
```

---

### ⑦ `barking.mp4`：吠叫行為｜A 型｜約 7 秒｜同柴犬版

**柴犬版分鏡**：模式 C 全彩客廳（木門在左、邊櫃、相框、掛鐘、亮著的立燈、扶手沙發上有粉紅靠墊、右邊窗簾），一鏡到底。狗站在紫地毯上，面向畫面左邊（門的方向），重心壓在前腳，連續吠叫；中間短暫停下來聽，然後又開始叫。

```
RENDER STYLE (most important — match exactly): warm hand-drawn 2D storybook anime look. Bold, confident dark-brown/near-black ink outlines, about 3–4 px at 720p — clearly thicker on the dog's outer silhouette, medium weight on furniture — never thin hairlines. The dog has visible fine fur-texture strokes (small hair tufts on the cheeks, chest, neck and legs), soft painted gradient shading on the fur and a white catch-light in each eye — not flat vector fills. Cute storybook character design: slightly large head, big round expressive dark eyes, soft rounded muzzle, friendly face; lean body but not skinny or Doberman-like. Overall color grade: rich warm amber-honey-sepia, medium saturation, slightly deep and golden like lamplight, gently darkened warm corners (soft vignette), faint paper grain. AVOID: pastel, washed-out, pale, cool-toned, low-contrast, thin uniform lines, flat vector art.

2D anime-style storybook animation, 16:9, fully colored, bold dark-brown ink outlines, cel shading with soft painted gradients, rich warm amber-honey palette. An evening living room: warm beige walls with faint brick texture, the edge of a wooden front door on the far left, a low wooden sideboard with a leafy plant and books, several small framed pictures, a framed sun-and-mountain picture, a round wall clock, a glowing warm floor lamp, a beige armchair/sofa with a dusty-pink cushion on the right, a small plant on a side table, blue curtains at the right edge, honey wood floor, a round lavender-purple rug in the center.

THE DOG: a medium-sized, lean, athletic Taiwanese black-and-tan mixed-breed dog. Short, smooth, sleek coat (not fluffy). Black saddle covering the back, neck, top of the head and top of the tail; warm rust-tan on the cheeks, muzzle sides, two small tan eyebrow dots above the eyes, inner ears, legs, belly and underside of the tail; a small white V-shaped chest patch. Large erect triangular ears, slightly long muzzle, dark brown eyes, black nose. Long tail that hangs low with a gentle upward curve at the tip — NOT curled over the back. Clearly NOT a Shiba Inu.

Single locked shot, about 7 seconds, medium shot. THE DOG stands on the lavender rug facing left toward the front door, body braced and leaning forward with its weight on the front legs, ears fully erect, tail raised stiffly. It barks repeatedly at a sound outside the door, mouth opening wide with each bark. Midway it pauses, closes its mouth, tilts its head slightly and listens intently, then barks again twice — natural alert, territorial barking.

SOUND EFFECTS: sharp medium-pitched barks, faint muffled footsteps and a distant doorbell outside, quiet evening room tone, subtle tense music. Animals behave realistically, not anthropomorphized. No text or subtitles on screen. AUDIO RULES: keep it quiet and natural — only these realistic sound effects plus very soft, low-volume instrumental background music (gentle acoustic piano or ukulele, no vocals). Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no whispering, no laughing, no talking dog, no distorted, synthetic or eerie sounds. The dog makes only real dog sounds.
```

---

### ⑧ `chewing-on-things.mp4`：啃咬行為｜B 型｜約 8 秒｜同柴犬版

**柴犬版分鏡**
| 秒數 | 畫面 |
|---|---|
| 0 | 模式 S 廣角：狗在紫地毯上咬住抱枕往外拉，地上散著白色棉花 |
| 0.7 | 狗前腳搭上沙發扶手，咬沙發上的靠墊 |
| 1.4–2.9 | 中近景（全彩）：狗咬木頭邊櫃的櫃腳，櫃腳已經有咬痕 |
| 3.5–5 | 回到地毯：狗咬地上的抱枕，接著咬住地毯邊緣把它掀起來 |
| 5.7–8 | 狗轉頭面向鏡頭，開心吐舌搖尾巴，周圍一地棉花，被咬過的櫃腳看得到 |

```
RENDER STYLE (most important — match exactly): warm hand-drawn 2D storybook anime look. Bold, confident dark-brown/near-black ink outlines, about 3–4 px at 720p — clearly thicker on the dog's outer silhouette, medium weight on furniture — never thin hairlines. The dog has visible fine fur-texture strokes (small hair tufts on the cheeks, chest, neck and legs), soft painted gradient shading on the fur and a white catch-light in each eye — not flat vector fills. Cute storybook character design: slightly large head, big round expressive dark eyes, soft rounded muzzle, friendly face; lean body but not skinny or Doberman-like. Overall color grade: rich warm amber-honey-sepia, medium saturation, slightly deep and golden like lamplight, gently darkened warm corners (soft vignette), faint paper grain. AVOID: pastel, washed-out, pale, cool-toned, low-contrast, thin uniform lines, flat vector art.

2D anime-style animation, 16:9, bold dark-brown ink outlines, cel shading with soft painted gradients. The first shot uses a pale sepia line-art living room (thin brown lines on a beige wash); the following shots gradually shift into a fully colored warm living room — honey wood floor, beige walls, a wooden sideboard with books and a vase, a beige armchair, a large leafy potted plant, a round lavender-purple rug. About 8 seconds, four shots joined by quick cuts; each shot uses a locked, fixed camera.

THE DOG: a medium-sized, lean, athletic Taiwanese black-and-tan mixed-breed dog. Short, smooth, sleek coat (not fluffy). Black saddle covering the back, neck, top of the head and top of the tail; warm rust-tan on the cheeks, muzzle sides, two small tan eyebrow dots above the eyes, inner ears, legs, belly and underside of the tail; a small white V-shaped chest patch. Large erect triangular ears, slightly long muzzle, dark brown eyes, black nose. Long tail that hangs low with a gentle upward curve at the tip — NOT curled over the back. Clearly NOT a Shiba Inu.

Shot 1 (0–1.5s), wide shot of the sepia line-art room: THE DOG stands on the lavender rug tugging a cushion with its teeth; tufts of white stuffing are scattered on the floor. It then puts its front paws up on the sofa arm and bites a sofa cushion.
Shot 2 (1.5–3.5s), medium-close, colored: THE DOG crouches and gnaws on the wooden leg of a sideboard, head tilted, eyes squeezed shut in concentration; the wood leg shows small bite marks and splinters.
Shot 3 (3.5–5.5s), medium shot on the rug: it mouths a cushion on the floor, then grabs the edge of the lavender rug in its teeth and pulls it up, playfully shaking its head.
Shot 4 (5.5–8s), medium shot: THE DOG stops, turns to face the camera and stands among the scattered white stuffing with a bright open-mouth pant and a wagging tail — completely unaware anything is wrong; the chewed sideboard leg is visible behind it.

SOUND EFFECTS: fabric tearing, wood gnawing and crunching, playful little growls, then happy panting; mischievous pizzicato music. Animals behave realistically based on natural chewing and teething instincts, not anthropomorphized. No text or subtitles on screen. AUDIO RULES: keep it quiet and natural — only these realistic sound effects plus very soft, low-volume instrumental background music (gentle acoustic piano or ukulele, no vocals). Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no whispering, no laughing, no talking dog, no distorted, synthetic or eerie sounds. The dog makes only real dog sounds.
```

---

### ⑨ `urinate-and-defecate.mp4`：在錯誤地點排泄｜A 型｜約 9 秒｜同柴犬版

**柴犬版分鏡**：模式 S 線稿客廳，一鏡到底。
0–0.7 秒：狗從畫面左邊小跑進來。
1.4–2.9 秒：在紫地毯上低頭嗅聞、繞圈。
3.5–5 秒：蹲下排便，地毯上出現一小坨大便；接著坐下，表情很自然。
5.7–7 秒：回頭嗅了一下。
7–9 秒：從畫面右邊輕快離開，大便留在地毯上。
**畫面裡沒有尿布墊，狗沒有愧疚的表情。**

```
RENDER STYLE (most important — match exactly): warm hand-drawn 2D storybook anime look. Bold, confident dark-brown/near-black ink outlines, about 3–4 px at 720p — clearly thicker on the dog's outer silhouette, medium weight on furniture — never thin hairlines. The dog has visible fine fur-texture strokes (small hair tufts on the cheeks, chest, neck and legs), soft painted gradient shading on the fur and a white catch-light in each eye — not flat vector fills. Cute storybook character design: slightly large head, big round expressive dark eyes, soft rounded muzzle, friendly face; lean body but not skinny or Doberman-like. Overall color grade: rich warm amber-honey-sepia, medium saturation, slightly deep and golden like lamplight, gently darkened warm corners (soft vignette), faint paper grain. AVOID: pastel, washed-out, pale, cool-toned, low-contrast, thin uniform lines, flat vector art.

2D hand-drawn anime-style animation, 16:9. The background room is drawn as medium-weight sepia-brown ink line art over a flat warm beige/cream wash — nearly monochrome, very low saturation, like a colored-pencil sketch. The dog is the only fully colored element, with bold dark-brown ink outlines and cel shading with soft painted gradients.
Fixed room layout: paneled wooden door with brass handle and light switch on the far left; a low mid-century sideboard with a small plant and two tiny photo frames above; a framed mountain-and-sun picture and a round wall clock on the back wall; a dome pendant lamp at the upper right casting a soft cone of warm light; a small bookshelf at the top right; a beige tufted sofa on the right with tiny ✦ marks; a wooden coffee table cropped in the right foreground; light wood plank floor; a round lavender-purple rug in the center. No pee pads anywhere.

THE DOG: a medium-sized, lean, athletic Taiwanese black-and-tan mixed-breed dog. Short, smooth, sleek coat (not fluffy). Black saddle covering the back, neck, top of the head and top of the tail; warm rust-tan on the cheeks, muzzle sides, two small tan eyebrow dots above the eyes, inner ears, legs, belly and underside of the tail; a small white V-shaped chest patch. Large erect triangular ears, slightly long muzzle, dark brown eyes, black nose. Long tail that hangs low with a gentle upward curve at the tip — NOT curled over the back. Clearly NOT a Shiba Inu.

Single locked shot, about 9 seconds, wide-medium shot.
0–1s: THE DOG trots in cheerfully from the left edge of the frame.
1–3s: It lowers its nose to the lavender rug, sniffs intently and circles once — natural pre-toileting behavior.
3–5s: It squats in profile and poops on the rug; a small, simple, tasteful cartoon brown pile appears. It then sits beside it with a calm, neutral face.
5–7s: It turns and gives the spot a brief sniff.
7–9s: It trots off lightly and exits on the right, leaving the small pile on the rug. No guilt and no awareness that anything is wrong.

SOUND EFFECTS: soft paw steps, sniffing, a quiet room tone, light, slightly comedic music. Tasteful and child-friendly. Animals behave realistically based on natural instincts, not anthropomorphized. No text or subtitles on screen. AUDIO RULES: keep it quiet and natural — only these realistic sound effects plus very soft, low-volume instrumental background music (gentle acoustic piano or ukulele, no vocals). Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no whispering, no laughing, no talking dog, no distorted, synthetic or eerie sounds. The dog makes only real dog sounds.
```

---

### ⑩ `busy-daily-care.mp4`：忙碌時寵物等待｜B 型｜約 10 秒｜同柴犬版

**柴犬版分鏡**
| 秒數 | 畫面 |
|---|---|
| 0–4 | 模式 W 辦公室夜晚：飼主側面打字，窗外是星夜和月亮，牆上掛鐘指向很晚的時間 |
| 4.3–5.7 | 全彩客廳夜晚廣角：狗獨自坐在紫地毯上，旁邊是空碗，地上散著骨頭玩具和球，吊燈亮著，窗外是夜色 |
| 6.4 | 較近：狗趴下，一臉難過 |
| 7–10 | 中近景：狗下巴貼在前腳上，眼神低垂，眉頭皺著 |

```
RENDER STYLE (most important — match exactly): warm hand-drawn 2D storybook anime look. Bold, confident dark-brown/near-black ink outlines, about 3–4 px at 720p — clearly thicker on the dog's outer silhouette, medium weight on furniture — never thin hairlines. The dog has visible fine fur-texture strokes (small hair tufts on the cheeks, chest, neck and legs), soft painted gradient shading on the fur and a white catch-light in each eye — not flat vector fills. Cute storybook character design: slightly large head, big round expressive dark eyes, soft rounded muzzle, friendly face; lean body but not skinny or Doberman-like. Overall color grade: rich warm amber-honey-sepia, medium saturation, slightly deep and golden like lamplight, gently darkened warm corners (soft vignette), faint paper grain. AVOID: pastel, washed-out, pale, cool-toned, low-contrast, thin uniform lines, flat vector art.

2D anime-style animation, 16:9, clean outlines, cel shading, warm but slightly lonely night palette. About 10 seconds, three shots joined by soft cuts; each shot uses a locked, fixed camera.

THE DOG: a medium-sized, lean, athletic Taiwanese black-and-tan mixed-breed dog. Short, smooth, sleek coat (not fluffy). Black saddle covering the back, neck, top of the head and top of the tail; warm rust-tan on the cheeks, muzzle sides, two small tan eyebrow dots above the eyes, inner ears, legs, belly and underside of the tail; a small white V-shaped chest patch. Large erect triangular ears, slightly long muzzle, dark brown eyes, black nose. Long tail that hangs low with a gentle upward curve at the tip — NOT curled over the back. Clearly NOT a Shiba Inu.
THE OWNER: a young woman in her twenties with long brown hair in a ponytail, pink crew-neck sweatshirt, blue jeans. Semi-realistic anime proportions.

Shot 1 (0–4s), office at night: The woman sits in side profile at her desk still typing at a computer full of charts; a teal mug and desk calendar beside her. Behind her, the window shows a dark starry sky with a crescent moon over lit city buildings; the round wall clock shows a very late hour. She blinks tiredly but keeps working.
Shot 2 (4–6s), wide shot of a fully colored cozy living room at night: pendant lamp glowing, a night window with a curtain, beige sofa with cushions, coffee table, wall clock, round lavender rug. THE DOG sits alone on the rug next to an empty food bowl; a bone toy and a couple of balls lie scattered on the floor. It looks toward the door, then lowers its head.
Shot 3 (6–10s), medium-close on the rug: THE DOG lies down and rests its chin on its crossed front paws, ears drooping sideways, eyes looking up sadly with slightly furrowed brows, tail lying flat. It lets out a small sigh through its nose — natural bored, lonely waiting behavior.

SOUND EFFECTS: keyboard clicks and the office hum, then a quiet house with a ticking clock, faint distant city traffic, a soft sigh from the dog. Subdued, gentle piano music. Animals behave realistically, not anthropomorphized. No text or subtitles on screen. AUDIO RULES: keep it quiet and natural — only these realistic sound effects plus very soft, low-volume instrumental background music (gentle acoustic piano or ukulele, no vocals). Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no whispering, no laughing, no talking dog, no distorted, synthetic or eerie sounds. The dog makes only real dog sounds.
```

---

### ⑪ `senior-life.mp4`：高齡生活｜B 型｜約 8–9 秒｜同柴犬版

**柴犬版分鏡**
| 秒數 | 畫面 |
|---|---|
| 0 | 全彩客廳：老狗趴在門邊的紫地毯上，門半開 |
| 0.7–1.4 | 公園：飼主牽著老狗散步，狗走得很慢，飼主表情擔心 |
| 2–3.5 | 狗走到一半停下來，後腳使不上力；飼主彎腰用雙手扶著狗的身體 |
| 4.3–5 | 中近景：狗趴在草地上喘氣，旁邊是網球，眼神疲累 |
| 5.7–8.3 | 家中：飼主跪坐在地毯上輕摸老狗的頭，老狗側躺閉眼，兩人（狗）都有點落寞 |

```
RENDER STYLE (most important — match exactly): warm hand-drawn 2D storybook anime look. Bold, confident dark-brown/near-black ink outlines, about 3–4 px at 720p — clearly thicker on the dog's outer silhouette, medium weight on furniture — never thin hairlines. The dog has visible fine fur-texture strokes (small hair tufts on the cheeks, chest, neck and legs), soft painted gradient shading on the fur and a white catch-light in each eye — not flat vector fills. Cute storybook character design: slightly large head, big round expressive dark eyes, soft rounded muzzle, friendly face; lean body but not skinny or Doberman-like. Overall color grade: rich warm amber-honey-sepia, medium saturation, slightly deep and golden like lamplight, gently darkened warm corners (soft vignette), faint paper grain. AVOID: pastel, washed-out, pale, cool-toned, low-contrast, thin uniform lines, flat vector art.

2D anime-style animation, 16:9, bold dark-brown ink outlines, cel shading with soft painted gradients, warm and gentle palette. About 8–9 seconds, four shots joined by soft dissolves; each shot uses a locked, fixed camera.

THE DOG (SENIOR): a medium-sized, lean Taiwanese black-and-tan mixed-breed dog in old age. Short, smooth coat; black saddle on the back, neck, head and top of the tail, faded to charcoal; rust-tan cheeks, eyebrow dots, legs and belly; small white chest patch; the muzzle, chin and area around the eyes are frosted with grey-white hairs. Large erect triangular ears, dark brown slightly cloudy eyes, black nose. Long tail that hangs low with a gentle upward curve at the tip — NOT curled over the back. Slightly thinner, back slightly arched. Clearly NOT a Shiba Inu.
THE OWNER: a young woman in her twenties with long brown hair in a ponytail, pink crew-neck sweatshirt, blue jeans, white sneakers. Semi-realistic anime proportions.

Shot 1 (0–1s), fully colored living room: THE DOG lies on the lavender rug near the half-open front door, head up, waiting to go out.
Shot 2 (1–3.5s), sunny park with a winding path, trees, a bench and a lamp post: The woman walks the dog on a red leash. The dog walks slowly and stiffly, then stops midway; its back legs tremble and falter. The woman immediately bends down and supports the dog's body with both hands, a worried look on her face.
Shot 3 (3.5–5.5s), medium-close on the grass: THE DOG lies down on the grass panting, a green tennis ball resting untouched beside it, eyes tired and droopy.
Shot 4 (5.5–9s), cozy living room, warm lamp light: The woman kneels on the lavender rug and gently strokes the head of the old dog, who lies on its side with eyes closed, breathing slowly. Her expression is tender and a little sad.

SOUND EFFECTS: soft birdsong, slow uneven paw steps, gentle panting, a quiet room tone, soft gentle piano music. Animals behave realistically based on natural age-related weakness, not anthropomorphized. No text or subtitles on screen. Heartwarming and gentle. AUDIO RULES: keep it quiet and natural — only these realistic sound effects plus very soft, low-volume instrumental background music (gentle acoustic piano or ukulele, no vocals). Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no whispering, no laughing, no talking dog, no distorted, synthetic or eerie sounds. The dog makes only real dog sounds.
```

---

## 五、米克斯專屬影片（3 支，依 md 與題目內容重新設計）

> 分鏡長度、畫面模式和敘事公式都照柴犬品種題（shedding、rainy-day-walk）與 sick 的做法：呈現問題 → 生活影響或飼主反應 → 情緒明確的收尾畫面。

---

### ⑫ `sick.mp4`：米克斯常見健康問題（牙周病＋外寄生蟲）｜A 型｜約 8 秒

**題目內容**（`scenarios.ts`）：{petName} 吃東西的動作遲疑、嘴巴有異味、牙齦比以前紅；偶爾在身上抓個不停，撥開毛看到小黑點。
**對應柴犬版**：模式 S 線稿客廳、一鏡到底，劇情是「不吃飯 → 抓癢或舔 → 無精打采地趴下」。只把症狀換成口腔問題和跳蚤。

| 秒數 | 畫面 |
|---|---|
| 0–2.5 | 狗走到綠色食碗前，低頭聞，咬了一下又停住，用前腳撥嘴邊、舔嘴唇，不肯吃 |
| 2.5–4 | 狗張嘴的瞬間，看得到紅腫的牙齦，嘴邊飄出一縷淡淡的異味線條 |
| 4–6.5 | 狗坐下，用後腳猛抓脖子和腹側，身上出現抓癢記號；短毛之間隱約看得到幾個小黑點 |
| 6.5–8 | 狗無精打采地側躺在紫地毯上，食物還留在碗裡 |

```
RENDER STYLE (most important — match exactly): warm hand-drawn 2D storybook anime look. Bold, confident dark-brown/near-black ink outlines, about 3–4 px at 720p — clearly thicker on the dog's outer silhouette, medium weight on furniture — never thin hairlines. The dog has visible fine fur-texture strokes (small hair tufts on the cheeks, chest, neck and legs), soft painted gradient shading on the fur and a white catch-light in each eye — not flat vector fills. Cute storybook character design: slightly large head, big round expressive dark eyes, soft rounded muzzle, friendly face; lean body but not skinny or Doberman-like. Overall color grade: rich warm amber-honey-sepia, medium saturation, slightly deep and golden like lamplight, gently darkened warm corners (soft vignette), faint paper grain. AVOID: pastel, washed-out, pale, cool-toned, low-contrast, thin uniform lines, flat vector art.

2D hand-drawn anime-style animation, 16:9. The background room is drawn as medium-weight sepia-brown ink line art over a flat warm beige/cream wash — nearly monochrome, very low saturation, like a colored-pencil sketch. The dog and its green food bowl are the only fully colored elements, with bold dark-brown ink outlines and cel shading with soft painted gradients. The dog's colors are slightly muted to suggest it feels unwell.
Fixed room layout: paneled wooden door with brass handle and light switch on the far left; a low mid-century sideboard with a few small potted plants and two tiny photo frames above; a leafy plant behind the rug; a framed mountain-and-sun picture and a round wall clock on the back wall; a dome pendant lamp at the upper right casting a soft cone of warm light; a small bookshelf at the top right; a beige tufted sofa on the right with tiny ✦ marks; a wooden coffee table cropped in the right foreground; light wood plank floor; a round lavender-purple rug in the center with a green food bowl full of kibble on it.

THE DOG: a medium-sized, lean, athletic Taiwanese black-and-tan mixed-breed dog. Short, smooth, sleek coat (not fluffy). Black saddle covering the back, neck, top of the head and top of the tail; warm rust-tan on the cheeks, muzzle sides, two small tan eyebrow dots above the eyes, inner ears, legs, belly and underside of the tail; a small white V-shaped chest patch. Large erect triangular ears, slightly long muzzle, dark brown eyes, black nose. Long tail that hangs low with a gentle upward curve at the tip — NOT curled over the back. Clearly NOT a Shiba Inu.

Single locked shot, about 8 seconds, medium shot centered on the rug.
0–2.5s: THE DOG walks slowly to the green food bowl, lowers its head and sniffs. It takes one careful bite, then stops, drops the kibble, and hesitantly paws at the side of its mouth and licks its lips — natural signs of mouth pain.
2.5–4s: As it opens its mouth, its gums are visibly swollen and reddish along the teeth, and a faint wavy cartoon "bad smell" line drifts up from its mouth. It turns its head away from the bowl.
4–6.5s: It sits down and scratches vigorously at its neck and flank with a hind leg, then twists to nibble at its side; small curved itch-lines appear around the scratching spot. A few tiny black dots (fleas) are subtly visible in its short coat.
6.5–8s: It lies down on its side on the lavender rug with low energy, eyes half-closed, while the food remains uneaten in the bowl.

SOUND EFFECTS: sniffing, a single crunch then silence, lip-licking, rapid scratching of paw on fur and jingling of a collar tag, a soft tired sigh; quiet room tone and subdued, slightly worried music. Child-friendly, no gore. Animals behave realistically based on natural discomfort responses, not anthropomorphized. No text or subtitles on screen. AUDIO RULES: keep it quiet and natural — only these realistic sound effects plus very soft, low-volume instrumental background music (gentle acoustic piano or ukulele, no vocals). Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no whispering, no laughing, no talking dog, no distorted, synthetic or eerie sounds. The dog makes only real dog sounds.
```

---

### ⑬ `breed-size.mp4`：品種考驗｜成犬體型無法從幼犬外表預測｜B 型｜約 8–10 秒

**題目內容**（`breed-challenges.ts`）：你從收容所帶回一隻三個月大的米克斯幼犬，看起來小小的很可愛。朋友說「這麼小，長大應該也不大」。
**核心知識**：米克斯的親本品種不確定，幼犬時期的體型無法預測成犬大小，空間、飼料和醫療費用都要保留彈性。
**影片目標**：讓玩家「看到」預期和實際的落差，但不直接講出答案；空間與用品不夠用，就是生活影響。

| 秒數 | 畫面 | 對應公式 |
|---|---|---|
| 0–3 | 全彩客廳：飼主坐在紫地毯上，小小的黑褐色幼犬窩在她腿上；旁邊有一張**很小的狗床**、小碗、小牽繩，是「以為牠會一直這麼小」而買的 | 呈現問題 |
| 3–5 | 同一個構圖快速溶接（像翻頁／季節變換）：狗一段一段長大，窗外的樹從綠變黃再變綠 | 時間過去 |
| 5–8 | 同一位置：狗已經長成腿長身長的成犬，**只有前腳擠得進那張小床**，身體大半在外面；小碗在牠身邊顯得超迷你。飼主張大眼睛、手捧著小牽繩，一臉驚訝 | 生活影響 |
| 8–10 | 收尾：狗毫不在意地擠在小床上、尾巴輕搖；飼主愣住，然後苦笑 | 情緒收尾 |

```
RENDER STYLE (most important — match exactly): warm hand-drawn 2D storybook anime look. Bold, confident dark-brown/near-black ink outlines, about 3–4 px at 720p — clearly thicker on the dog's outer silhouette, medium weight on furniture — never thin hairlines. The dog has visible fine fur-texture strokes (small hair tufts on the cheeks, chest, neck and legs), soft painted gradient shading on the fur and a white catch-light in each eye — not flat vector fills. Cute storybook character design: slightly large head, big round expressive dark eyes, soft rounded muzzle, friendly face; lean body but not skinny or Doberman-like. Overall color grade: rich warm amber-honey-sepia, medium saturation, slightly deep and golden like lamplight, gently darkened warm corners (soft vignette), faint paper grain. AVOID: pastel, washed-out, pale, cool-toned, low-contrast, thin uniform lines, flat vector art.

2D anime-style storybook animation, 16:9, fully colored, bold dark-brown ink outlines, cel shading with soft painted gradients, rich warm amber-honey palette. A cozy living room: warm beige walls with faint brick texture, honey wood floor, a paneled wooden door on the left, a low sideboard with a leafy plant and small framed pictures, a round wall clock, a glowing pendant lamp, a window with curtains showing a tree outside, a beige sofa with teal and mustard cushions, and a round lavender-purple rug in the center. About 9 seconds; the camera stays locked in exactly the same framing for the whole video so the size change is easy to compare.

THE OWNER: a young woman in her twenties with long brown hair in a ponytail, pink crew-neck sweatshirt, blue jeans, white sneakers. Semi-realistic anime proportions.
THE PUPPY: a 3-month-old chubby black-and-tan mixed-breed puppy — black back, tan cheeks, tan eyebrow dots and legs, tiny white chest patch, soft ears half-folded at the tips, round belly, and noticeably oversized paws.
THE ADULT DOG (the same dog grown up): a lean, long-legged, athletic Taiwanese black-and-tan mixed-breed dog, clearly bigger than expected. Short, smooth, sleek coat (not fluffy). Black saddle covering the back, neck, top of the head and top of the tail; warm rust-tan on the cheeks, muzzle sides, two small tan eyebrow dots above the eyes, inner ears, legs, belly and underside of the tail; a small white V-shaped chest patch. Large erect triangular ears, slightly long muzzle, dark brown eyes, black nose. Long tail that hangs low with a gentle upward curve at the tip — NOT curled over the back. Clearly NOT a Shiba Inu.

0–3s: The woman sits cross-legged on the lavender rug, smiling, with THE PUPPY curled up comfortably in her lap. Beside her on the rug are the tiny things she bought for it: a very small round dog bed, a tiny food bowl and a short thin leash.
3–5s: Soft page-turn dissolves in the same framing show the dog growing in steps — puppy, lanky adolescent, young adult — while the tree outside the window changes from green to golden to green again, suggesting months passing.
5–8s: Same framing. THE ADULT DOG now stands where the puppy was: tall, long-bodied and long-legged. It tries to lie in the tiny dog bed but only its front paws and chest fit; most of its body spills over the edge onto the rug. The tiny bowl looks miniature next to it. The woman, still sitting in the same spot, holds up the short little leash and stares with wide, surprised eyes and an open mouth.
8–10s: THE DOG settles contentedly half-in the tiny bed, tail wagging gently, completely unbothered. The woman blinks, then gives a small helpless smile.

SOUND EFFECTS: soft puppy whimpers and happy yips at first, gentle page-flip swooshes during the growth dissolves, a heavier "thump" as the adult dog flops into the tiny bed, a light comedic musical sting at her surprise, then warm cheerful music. Animals behave realistically, not anthropomorphized. No text or subtitles on screen. AUDIO RULES: keep it quiet and natural — only these realistic sound effects plus very soft, low-volume instrumental background music (gentle acoustic piano or ukulele, no vocals). Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no whispering, no laughing, no talking dog, no distorted, synthetic or eerie sounds. The dog makes only real dog sounds.
```

---

### ⑭ `breed-individual.mp4`：品種考驗｜米克斯的個體差異｜B 型｜約 8–10 秒

**題目內容**（`breed-challenges.ts`）：你在書上讀到某個純種犬的性格描述，很詳細。朋友說「你的米克斯不知道會什麼樣，大概就是隨便吧」。
**核心知識**：米克斯的個性因個體差異大，沒辦法從品種手冊預判，但可以透過收容所的觀察紀錄、認養前互動和日常相處，逐步了解牠。
**md 原設定**：三隻外觀不同的米克斯並排、各自有不同行為，旁邊的品種圖鑑對不到答案（問號）。
**改良**：保留 md 的「三隻不同米克斯＋圖鑑對不上」，再加上柴犬品種題都有的「飼主在家中的情境」，最後一個畫面讓飼主開始**觀察自己的狗**，但不直接演出答案。

| 秒數 | 畫面 | 對應公式 |
|---|---|---|
| 0–3 | 全彩客廳：飼主坐在沙發上翻一本厚厚的狗狗圖鑑，書頁上是各種純種犬的插圖；她抬頭看向地毯上的自家米克斯，又低頭看書，一臉困惑 | 呈現問題 |
| 3–6 | 溶接成圖鑑風格的暖米色背景：三隻外觀完全不同的米克斯並排，各自做出不同的自然反應；上方浮著一本打開的圖鑑，三頁都只有大大的「？」 | 個體差異 |
| 6–10 | 回到客廳：飼主把書放下，改坐到地毯上，安靜地看著自家米克斯；狗先嗅了嗅她的手，選了一個玩具叼到她腳邊趴下。她微笑，拿起小筆記本 | 情緒收尾，暗示「透過觀察認識牠」 |

```
RENDER STYLE (most important — match exactly): warm hand-drawn 2D storybook anime look. Bold, confident dark-brown/near-black ink outlines, about 3–4 px at 720p — clearly thicker on the dog's outer silhouette, medium weight on furniture — never thin hairlines. The dog has visible fine fur-texture strokes (small hair tufts on the cheeks, chest, neck and legs), soft painted gradient shading on the fur and a white catch-light in each eye — not flat vector fills. Cute storybook character design: slightly large head, big round expressive dark eyes, soft rounded muzzle, friendly face; lean body but not skinny or Doberman-like. Overall color grade: rich warm amber-honey-sepia, medium saturation, slightly deep and golden like lamplight, gently darkened warm corners (soft vignette), faint paper grain. AVOID: pastel, washed-out, pale, cool-toned, low-contrast, thin uniform lines, flat vector art.

2D anime-style storybook animation, 16:9, fully colored, bold dark-brown ink outlines, cel shading with soft painted gradients, rich warm amber-honey palette. About 9–10 seconds, three shots joined by soft dissolves; each shot uses a locked, fixed camera.

THE DOG (her dog): a medium-sized, lean, athletic Taiwanese black-and-tan mixed-breed dog. Short, smooth, sleek coat (not fluffy). Black saddle covering the back, neck, top of the head and top of the tail; warm rust-tan on the cheeks, muzzle sides, two small tan eyebrow dots above the eyes, inner ears, legs, belly and underside of the tail; a small white V-shaped chest patch. Large erect triangular ears, slightly long muzzle, dark brown eyes, black nose. Long tail that hangs low with a gentle upward curve at the tip — NOT curled over the back. Clearly NOT a Shiba Inu.
THE OWNER: a young woman in her twenties with long brown hair in a ponytail, pink crew-neck sweatshirt, blue jeans, white sneakers. Semi-realistic anime proportions.

Shot 1 (0–3s), cozy fully colored living room (beige walls, honey wood floor, wooden door on the left, sideboard with a plant, round wall clock, glowing pendant lamp, beige sofa with teal and mustard cushions, round lavender rug): The woman sits on the sofa flipping through a thick illustrated dog-breed book whose pages show neat drawings of different purebred dogs (no readable text). She looks up at THE DOG lying on the rug, then back down at the book, then up again, tilting her head with a puzzled look — nothing in the book matches.
Shot 2 (3–6s), dissolve to a plain warm cream storybook background: Three very different-looking mixed-breed dogs stand side by side — on the left a small dog with floppy ears and a white coat with brown spots; in the middle THE DOG (black-and-tan, erect ears); on the right a large dog with a shaggy patchy brindle coat. Each behaves differently in a natural way: the small one hangs back cautiously with its tail low; THE DOG looks around alertly with ears swiveling; the large one flops down calmly and rolls onto its side. Above them floats an open cartoon breed book whose three pages each show only a big simple "?" symbol.
Shot 3 (6–10s), back in the living room: The woman has put the book down and now sits on the lavender rug quietly watching her own dog. THE DOG sniffs her outstretched hand, walks over to a small pile of toys, picks one particular toy, brings it back and lies down at her feet with its chin on the toy, tail gently wagging. The woman smiles warmly and picks up a small notebook, as if starting to note what her dog likes.

SOUND EFFECTS: pages flipping, a curious little musical question-mark motif, soft paw steps, a squeak of the toy, warm light playful music. Animals behave realistically based on natural individual temperament, not anthropomorphized. No text or subtitles on screen other than the "?" symbols in the book. AUDIO RULES: keep it quiet and natural — only these realistic sound effects plus very soft, low-volume instrumental background music (gentle acoustic piano or ukulele, no vocals). Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no whispering, no laughing, no talking dog, no distorted, synthetic or eerie sounds. The dog makes only real dog sounds.
```

> 💡 md 原本希望圖鑑封面寫「品種圖鑑」。影片生成模型寫中文常常出現亂碼，所以這裡改成只用「？」符號。如果要加字，在 Shot 2 最後補上 `The book cover shows the Chinese title "品種圖鑑".`，並準備多生成幾次挑字正確的版本。

---

## 六、生成檢查清單

每支影片生成後，逐項確認：

- [ ] 狗是**黑色鞍背＋棕褐臉頰、眉斑、四肢＋白胸斑**，**短毛、長尾、尾巴下垂末端微翹**，不是柴犬的捲尾，也不是蓬毛
- [ ] 同一支影片裡每個鏡頭的狗花色一致（特別注意眉斑和白胸斑有沒有消失）
- [ ] 背景模式和柴犬版一致：線稿（S）或全彩（C）
- [ ] 飼主是粉紅上衣、牛仔褲、白鞋、棕色馬尾
- [ ] 沒有文字（例外：arrival 的「歡迎回家」、breed-individual 的「？」）
- [ ] 有音效和配樂
- [ ] sick、urinate 的畫面要乾淨、適合兒童

| # | 檔案 | 模式 | 類型 | 長度 | 來源 |
|---|---|---|---|---|---|
| 1 | arrival-transition | 戶外＋C | B | 10s | 同柴犬 |
| 2 | busy-day-transition | W＋C | B | 13s | 同柴犬 |
| 3 | time-passes-aging | O（棕褐） | B | 10s | 同柴犬 |
| 4 | correct-answer | S | A | 4–5s | 同柴犬 |
| 5 | correct-answer2 | C | A | 4s | 同柴犬 |
| 6 | first-day | S | A | 10s | 同柴犬 |
| 7 | barking | C | A | 7s | 同柴犬 |
| 8 | chewing-on-things | S→C | B | 8s | 同柴犬 |
| 9 | urinate-and-defecate | S | A | 9s | 同柴犬 |
| 10 | busy-daily-care | W＋C | B | 10s | 同柴犬 |
| 11 | senior-life | C＋O | B | 8–9s | 同柴犬 |
| 12 | sick | S | A | 8s | **米克斯專屬** |
| 13 | breed-size | C | B | 9s | **米克斯專屬** |
| 14 | breed-individual | C | B | 9–10s | **米克斯專屬** |

> 柴犬的 `shedding.mp4`、`rainy-day-walk.mp4` 是柴犬品種題，米克斯版不需要，由上面的 ⑬、⑭ 取代。
