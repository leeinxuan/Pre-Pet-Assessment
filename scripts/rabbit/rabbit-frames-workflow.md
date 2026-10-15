# 兔子影片｜首幀鎖定流程（ChatGPT 生首幀 → Google Vids Omni 轉影片 → ffmpeg 拼接）

> 仿 `scripts/cat/cat-frames-workflow.md`（貓版已完整跑過一遍，操作細節與踩雷都以貓版為準），內容依兔子版遊戲內容（`docs/rabbit-game-planning.md`、`app/data/species/rabbit/scenarios.ts`、`journey.ts`）重新規劃。
> 目前兔子版所有情境的影片位置都還是 `placeholder`，這份文件就是「要做哪幾支、首幀怎麼生、動作怎麼寫」的清單。
>
> - **兩個場景（兔子和犬、貓不同：兔子、鸚鵡、守宮、倉鼠等要有自己的生活空間＝籠／圍欄）**
>   - **圍欄生活空間（主要場景）**：`scripts/rabbit/start-frames/rabbit-pen-master.png`（斜俯視的兔用圍欄，灰色防滑墊，內有木躲藏箱、牧草架＋牧草、水碗、便盆、墊料盆、陶板涼感墊、啃咬玩具）。兔子絕大多數的日常、情境題影片都在這裡發生。
>   - **安全房間（圍欄所在的室內）**：`public/assets/rabbit/room/rabbit-safe-room.webp`（米色牆、木地板、左側木門、窗戶、木櫃、兔子相框、置物架）；圍欄放在右側牆角（`fence-pen-in-room.webp`）。用於過場、放風、飼主進門等需要整間房的鏡頭。
> - 兔子外觀參考：`public/assets/rabbit/feeding/rabbit-happy.webp`（開心）、`rabbit-unhappy.webp`（不安）
> - 家具／物件參考：`public/assets/rabbit/room/` 內的 `hiding-box.webp`、`hay-rack.webp`、`heavy-water-bowl.webp`、`litter-box.webp`、`cooling-mat.webp`、`fence-pen-in-room.webp`、`anti-slip-mat.webp`；外出籠＝`public/assets/car/rabbit-carrier.webp`
> - 首幀存放：`scripts/rabbit/start-frames/<影片名>-s<鏡頭>.png`（1280×720）
> - Vids 片段存放：`public/assets/rabbit/pet-journey/clips/<影片名>-s<鏡頭>.mp4`
> - 成品輸出：`public/assets/rabbit/pet-journey/<影片名>.mp4`（每支 **≤ 15 秒**）
> - 接線：做完後把路徑填進 `app/data/species/rabbit/assets.ts`（新增 `videos` 區塊，格式比照 `app/data/species/cat/assets.ts`），並把各情境的 `sceneMedia` / `correctFeedbackMedia` 從 `placeholder` 改成對應影片。

---

## 統一規則

1. **畫風只有一種**：沿用兔子素材的畫風——粗深褐色輪廓線、細毛髮筆觸、柔和陰影、暖米色調（同 `rabbit-room.webp` 與 `rabbit-happy.webp`）。不要粉彩、細線、整張染黃。
2. **場景（兩個，不要混用）**
   - **圍欄內（`rabbit-pen-master.png`）**：兔子的家。first-day、summer-heat、sick、cecotropes、busy-daily-care、senior-life 都用這個當圖 1。視角固定為斜俯視，鏡頭不移動；裡面的物件（躲藏箱、牧草架、水碗、便盆、墊料盆、涼感墊、玩具）位置與大小全程不變。需要增減物件時（例如沒有牧草、換成軟墊）在【圍欄新增指令】裡明寫。
   - **安全房間（`rabbit-safe-room.webp`，木地板，不是磁磚）**：過場與放風。需要圍欄時加上 `fence-pen-in-room.webp`（右側牆角），需要外出籠時加上 `public/assets/car/rabbit-carrier.webp`。
   - 兩個場景各自第一次生成後，把滿意的版本存成 `rabbit-pen-master.png`／`rabbit-room-master.png`（`scripts/rabbit/start-frames/`），**之後所有首幀都以它們為圖 1**（貓版第二輪踩過：場景每張都不一樣會讓同一支影片前後穿幫）。
   - 戶外、收容所、車內、辦公室沿用貓版／柴犬版場景（圖 1 = 對應畫面，把動物換成兔子）。
3. **兔子固定外觀**：`a small domestic rabbit with sandy tan-beige fur, a white chest, belly and paws, a small fluffy white cotton-ball tail, long upright ears with pink inner ears, a pink nose, and thick dark-brown outlines`
4. **飼主固定外觀**：棕色馬尾、粉紅色針織毛衣、藍色牛仔褲、白襪（沿用貓版／柴犬版，no hoodie, no bag）。
5. ChatGPT 只出 3:2（1536×1024），下載後用 ffmpeg `crop=1536:864,scale=1280:720` 裁成 16:9。
6. **兔子行為要寫實，不擬人化**：兔子幾乎不發聲，不要寫 meow／bark／喊叫。可用的聲音：鼻子輕嗅、牧草被咀嚼的「喀滋喀滋」、輕輕的後腿蹬地（thump，只在受驚時）、磨牙聲（放鬆時輕柔、疼痛時大聲）、腳掌輕踏磁磚、輕微的呼吸聲。
7. **安全：影片中不要出現錯誤示範**。不要拿耳朵拎兔子、不要讓兔子腹部朝上、不要洗澡、不要餵紅蘿蔔當主食（遊戲裡這些是反面教材，用靜態圖處理，不做影片）。

## 流程（Claude in Chrome 自動化）

1. ChatGPT 每張首幀開新對話；用 `file_upload` 上傳圖 1（該鏡頭場景的 master：`rabbit-pen-master.png` 或 `rabbit-room-master.png`）、圖 2（兔子參考 `rabbit-happy.webp`）、圖 3（需要的物件／飼主參考）。
2. 貼【兔子新增指令】＋該鏡頭【額外指示】→ 送出 → 檢查（毛色是淺褐色加白色胸腹與腳、耳朵直立、輪廓粗細、沒有被染黃、場景沒變、只有一隻兔子）。
3. 下載 → ffmpeg 裁切 → 存 `scripts/rabbit/start-frames/`。
4. Vids →「製作 AI 影片」(Omni, 720p, 8 秒)：上傳首幀，提示詞以 `Use this image as the exact first frame and animate it.` 開頭，貼【動作】＋【通用結尾】＋【通用音訊結尾】。
5. 結果「插入 → 在新場景中插入」→ 檔案 → 下載 → MP4 → 回到 Downloads 改名、`ffmpeg -ss/-t` 剪出該 8 秒 → `clips/`。
6. 多鏡頭用 `python3 scripts/cat/splice.py OUT.mp4 [--xf 0.25] SRC:START:DUR ...`（腳本共用，統一 1280×720@30fps、影音交叉淡化）。

---

## 共用段落

**【兔子新增指令】（圖 1 = 房間，圖 2 = 兔子，圖 3 = 物件或飼主參考，視需要）**
```
Edit image 1, an empty rabbit-friendly living room. Add the rabbit from image 2 as described below: a small domestic rabbit with sandy tan-beige fur, a white chest, belly and paws, a small fluffy white cotton-ball tail, long upright ears with pink inner ears and a pink nose. Use image 3 only as a reference for the object or person described. Keep everything in image 1 exactly unchanged (room, door, window, cabinet, picture frames, shelf, wooden floor, framing, lighting, colors). Draw in the same illustration style as image 1 and image 2: bold dark-brown outlines, fine fur-texture strokes, soft shading, warm tone. Do not add anything not mentioned, no yellow or sepia filter. Landscape 1536x1024, important content away from the top and bottom edges. Please generate the image now.
```

**【圍欄新增指令】（圖 1 = `rabbit-pen-master.png`，圖 2 = 兔子，圖 3 = 視需要的物件參考）**
```
Edit image 1, a rabbit play-pen seen from a fixed three-quarter top-down view, with a grey anti-slip mat, a wooden hiding house, a hay rack with hay, a water bowl, a litter box, a tray of bedding, a ceramic cooling tile and chew toys. Add the rabbit from image 2 inside the pen as described below: a small domestic rabbit with sandy tan-beige fur, a white chest, belly and paws, a small fluffy white cotton-ball tail, long upright ears with pink inner ears and a pink nose. Keep everything in image 1 exactly unchanged (the pen walls, mat, every object, their positions and sizes, the wooden floor outside, framing, lighting, colors) except for the changes described below. Draw in the same illustration style as image 1 and image 2: bold dark-brown outlines, fine fur-texture strokes, soft shading, warm tone. The rabbit must be small compared with the pen (roughly the size of the water bowl or slightly bigger). Do not add anything not mentioned, no yellow or sepia filter. Landscape 1536x1024, important content away from the top and bottom edges. Please generate the image now.
```

**【Vids 通用結尾】**
```
Animate this exact image. Keep the art style, outline thickness, colors, lighting, background and the rabbit's design exactly as in the start frame for the whole clip. The rabbit keeps its sandy tan-beige fur, white chest, belly and paws, white cotton-ball tail and long upright ears. Locked static camera, no zoom, no pan, no cuts. The rabbit moves realistically like a real rabbit: small hops, nose twitching, ears swiveling, not anthropomorphized. No text appears.
```

**【Vids 通用音訊結尾】**
```
AUDIO: include the realistic sound effects and soft background music described in SOUND. Music: soft, low-volume, instrumental only (no vocals), mixed below the sound effects. Absolutely no human voices, no speech, no dialogue, no narration, no singing, no humming, no laughing, no distorted, synthetic or eerie sounds. The rabbit makes no voice sounds at all, only realistic rabbit sounds (nose sniffing, chewing, soft paw steps, a light thump when startled).
```

**幼兔額外指示（time-passes-aging 鏡頭 1）**
```
Draw the rabbit as a 3-month-old baby bunny: the same sandy tan-beige and white coloring, a very small round body, a big round head, short ears, large dark eyes and tiny paws.
```
**老兔額外指示（senior-life、time-passes-aging 鏡頭 4）**
```
Draw the rabbit as a senior: the same coloring but the tan faded and duller, a greying white muzzle, slightly cloudy eyes, a thinner body with visible shoulder bones, ears resting a little lower, and a slightly arched back.
```

---

## 聲音規則（每支都要遵守）

- **過場動畫（arrival-transition、busy-day-transition、time-passes-aging）**：**每一支動畫自己內部**的背景音樂要統一——同一支從頭到尾用同一首、不循環、不要每個鏡頭換一首。**不同動畫之間不需要用同一首**，每支各自依情緒選曲（有自然音效的鏡頭保留原音後再交叉淡化進該支的底樂，做法見最後「生成完之後」）。
- **題目動畫（first-day、summer-heat、sick、cecotropes、busy-daily-care、senior-life、correct-answer）**：背景音樂**不一定要有**（可以完全沒有，或很輕）；但**一定要有音效**：兔子的嗅聞、咀嚼、輕踏、磨牙、呼吸、環境底噪、物件聲。這裡指的是音效，**不是人聲**，所有 prompt 都要寫「no human voices, no speech」。
- 下面每支的 `SOUND:` 就是它的音效；音樂那一句在題目動畫裡是選用，不想要音樂時整句拿掉，改成 `no music`。

## A 型：一鏡到底（6 支，題目動畫）

### ① `correct-answer.mp4`（4–5 秒）
- 對應：所有答對的回饋（`correctPrimary`）
- 場景：圍欄內（圖 1 = `rabbit-pen-master.png`）
- 首幀：【圍欄新增指令】＋`The rabbit sits on the grey mat in the middle of the pen facing the camera, eyes squeezed shut happily, a tiny smile, ears relaxed and slightly tilted back.`（表情參考 `rabbit-happy.webp`）
- 動作：
```
The rabbit sits facing the camera in the pen, nose twitching softly, ears slowly swiveling, eyes closed in contentment. It gives a small happy hop in place, then settles and slowly blinks.
SOUND: very soft nose sniffing, a faint gentle teeth-purr, a soft paw landing on the mat; music (optional): a short bright ukulele-and-glockenspiel jingle.
```

### ② `correct-answer2.mp4`（4 秒）
- 對應：答對回饋的第二支（`correctSecondary`）
- 場景：圍欄內
- 首幀：【圍欄新增指令】＋`The rabbit stands on its four legs in three-quarter side view on the mat in the open area of the pen, head turned toward the camera with bright eyes, ears up.`
- 動作：
```
The rabbit does a joyful little binky inside the pen: it hops up with a small twist and lands lightly on the mat, then takes two quick steps and stops with its ears up and nose twitching.
SOUND: light soft landings on the mat, quick tiny paw steps; music (optional): a quick cheerful ukulele jingle with light hand claps.
```

### ③ `first-day.mp4`（10 秒，Vids 生成 8 秒即可）
- 對應：`rabbit-arrival-adjustment`「第一天適應新家」
- 場景：圍欄內
- 首幀：【圍欄新增指令】＋`A cream-beige pet carrier with a taupe-brown base, handle and latches and a grey wire door (image 3 = rabbit-carrier.webp; must NOT be navy) with its door open sits at the front-left edge of the pen mat; the rabbit has just stepped out and stands low and tense in the middle of the pen with its ears laid back.`
- 動作：
```
The rabbit freezes low on the mat, nose twitching fast, ears swiveling toward every small sound. After a moment it makes a quick dash across the mat and darts into the wooden hiding house at the back of the pen. It stays inside, only the tip of its nose and one ear visible at the doorway, nose quivering slightly. No people appear, nobody touches or approaches it. The pen, hiding house and all objects stay exactly where they are.
SOUND: quiet room tone, a soft clock ticking, quick paw patter on the mat, faint sniffing; music (optional): very soft, tentative solo piano.
```
- 注意：整段不可出現手伸進箱子／人把兔子抱出來的畫面（對應題目的錯誤選項）。

### ④ `summer-heat.mp4`（7 秒）
- 對應：`rabbit-heatstroke-prevention`「夏天怎麼幫牠避暑」
- 場景：圍欄內（涼感墊就是圍欄右下角那塊白色陶板）
- 首幀：【圍欄新增指令】＋`It is a hot sunny day: strong warm sunlight falls across the pen from the window side. The rabbit lies stretched out flat on the grey mat far from the white ceramic cooling tile, ears spread flat and wide, breathing a little fast. The cooling tile is lying at the right side of the pen.`
- 動作：
```
The rabbit lies flat on the warm mat with its ears spread wide, flanks rising and falling a little faster than normal. Then it lifts its head, stands, shuffles over to the white ceramic cooling tile in the pen and flops down on it; its ears slowly relax and its breathing slows.
SOUND: a quiet fan or air-conditioner hum fading in, soft paw shuffle on the mat, slow calm breathing; music (optional): soft, airy, cooling piano and light chimes.
```

### ⑤ `sick.mp4`（8 秒）
- 對應：`rabbit-health-emergency`「排便量突然減少」（消化道停滯警訊）
- 場景：圍欄內
- 首幀：【圍欄新增指令】＋`The rabbit sits hunched and still in a corner of the pen next to the hay rack, ears drooping low, eyes half-closed, looking dull. The hay rack is full and untouched, the water bowl is full, and the litter box has only a few droppings.`
- 動作：
```
The rabbit stays hunched and almost motionless, only its sides rising slowly with each breath. It lowers its head toward the hay rack, sniffs once, then turns its head away without eating. It shifts very slightly, ears drooping, nose barely moving.
SOUND: quiet room tone, a very soft clock ticking, faint slow breathing, a quiet uneasy tooth-grinding; music (optional): quiet, slightly worried solo piano.
```
- 注意：不要出現血、嘔吐等畫面；要適合兒童／學生觀看。

### ⑥ `cecotropes.mp4`（5 秒，選用）
- 對應：`rabbit-cecotropes`「牠在吃什麼？」
- 場景：圍欄內
- 首幀：【圍欄新增指令】＋`The rabbit sits curled in a relaxed loaf position on the mat in side view, head dipped low toward its own hindquarters.`
- 動作：
```
The rabbit sits calmly, bends its head down toward its hindquarters in a normal grooming-like posture for a few seconds, then lifts its head and chews slowly with a content, relaxed look. Tasteful and child-friendly, nothing graphic is shown.
SOUND: quiet room tone, soft slow chewing; music (optional): gentle, light and curious pizzicato.
```
- 這支內容敏感，Vids 可能拒絕（「這項要求似乎違反相關條款」）；被拒就改成靜態圖，不影響遊戲進行。

---

## B 型：多鏡頭（5 支）

♻️ = 沒有兔子的鏡頭，直接剪柴犬／貓原片（`public/assets/dog/pet-journey/shiba/`、`public/assets/cat/pet-journey/`），連同音效配樂一起使用。

### ⑦ `arrival-transition.mp4`（約 10–14 秒）｜過場：整支內部統一一首背景音樂
| 鏡頭 | 首幀 | 保留 | 做法 |
|---|---|---|---|
| 1 車子白天 | — | 0–1.4s | ♻️ |
| 2 收容所／繁殖場領兔 | `arrival-transition-s2.png`：參考柴犬 s2，把狗換成兔子，飼主蹲著把兔子放進外出籠 | 2s | 換兔 → Vids |
| 3 夕陽開車 | — | 3.5–5s | ♻️ |
| 4 提籠進家 | — | 5–6.5s | ♻️（籠內看不出動物才可用；兔子提籠用 `rabbit-carrier.webp` 較佳，必要時重生） |
| 5 走出籠子 | 安全房間（圖 1 = `rabbit-room-master.png`）＋【兔子新增指令】＋`the rabbit is halfway out of an open carrier on the wooden floor next to the play-pen in the right corner, body low` | 2s | 新增 → Vids |
| 6 歡迎回家 | 安全房間＋【兔子新增指令】＋兔子安靜坐在圍欄前（沒有字，不蓋住兔子） | 2–3s | 新增 → Vids，字另外疊 |

鏡頭 2：
```
The woman kneels and gently places the rabbit into the open carrier with both hands, one under its chest and one supporting its hindquarters; the rabbit stays calm, ears slightly back. The other animals in the cages stay where they are.
SOUND: quiet shelter ambience, a carrier door latch click; music: warm hopeful piano and strings.
```
鏡頭 5：
```
The rabbit slowly pokes its nose out of the carrier, sniffs, then hops out onto the wooden floor one small step at a time, body low, ears swiveling and looking around carefully.
SOUND: soft paw steps, light sniffing, a carrier door creak; music: warm hopeful piano and strings, gently rising.
```
鏡頭 6：
```
The rabbit sits calmly on the floor, nose twitching, ears slowly relaxing and eyes slowly closing and opening. Very small, quiet movement.
SOUND: quiet room tone, a very soft teeth-purr; music: the warm piano-and-strings theme resolving into a gentle, heartwarming ending.
```
- 「歡迎回家」字：貓版最後結論——**不要烤進影片的最後一幕且不要貼左邊／蓋住動物**。用 ChatGPT 綠幕圖去背（`#00FF00` 背景）→ PIL 去背成透明 PNG → ffmpeg overlay＋alpha 淡入，寬約 0.36 倍畫面寬、放在畫面左上偏中、離左邊至少 12%（網頁顯示會裁掉左右邊緣）、不蓋住兔子；音效／音樂另外處理。

### ⑧ `busy-day-transition.mp4`（約 13 秒）｜過場：整支內部統一一首背景音樂
| 鏡頭 | 首幀 | 保留 | 做法 |
|---|---|---|---|
| 1 辦公室白天→夜 | — | 0–5s | ♻️ |
| 2–3 兔子在圍欄邊等、開門迎接 | `busy-day-transition-s2.png`：安全房間＋圍欄在右側牆角，兔子在圍欄內靠房門那一側坐著，飼主還沒進門 | 4.3s | 新增 → Vids |
| 4 飼主臉部近景 | — | 9–11s | ♻️ |
| 5 摸兔 | `busy-day-transition-s5.png`：近景，飼主用一手輕撫兔子的背（不是頭頂突然壓下、不是抱起） | 2.5s | 新增 → Vids |

鏡頭 2–3：
```
The rabbit sits alone on the floor near the door, ears up, waiting. After a moment the door on the left opens and the woman steps in looking tired. The rabbit's ears perk up and it hops over slowly and stops near her feet, nose twitching.
SOUND: quiet night room tone, a clock ticking, key in the lock, a door creak, soft paw steps; music: shifts from quiet and lonely to warm and tender piano.
```
鏡頭 5：
```
The woman crouches and gently strokes the rabbit's back with one hand, slowly and calmly; the rabbit flattens slightly and its eyes slowly close in contentment. Slow, tender movement.
SOUND: soft fur rustle, a faint contented teeth-purr; music: tender, warm piano and soft strings.
```

### ⑨ `time-passes-aging.mp4`（約 10 秒）｜過場：整支內部統一一首背景音樂
| 鏡頭 | 首幀 | 保留 |
|---|---|---|
| 1 幼兔笨拙跳躍 | 圍欄內＋【圍欄新增指令】＋幼兔額外指示＋`a small wooden toy ball on the mat` | 1.5s |
| 2 青年兔 binky 跳躍 | 安全房間（放風）＋【兔子新增指令】＋`the rabbit mid-air in a joyful binky above the wooden floor` | 2s |
| 3 壯年兔快跑 | 安全房間（放風）＋【兔子新增指令】＋`the rabbit mid-run across the wooden floor, ears streaming back` | 2s |
| 4 老兔慢走 | 圍欄內＋【圍欄新增指令】＋老兔額外指示 | 4.5s |

動作：
```
S1: The tiny baby bunny hops clumsily around the toy ball, bumps into it, sniffs it, and sits down with a tiny sneeze-like nose twitch.
SOUND: very light quick paw patter, tiny sniffs; music: playful, bouncy music box melody.

S2: The young rabbit leaps into the air with a happy twisting binky, lands lightly and immediately hops again.
SOUND: light bouncy landings on the floor; music: upbeat acoustic guitar.

S3: The rabbit runs at full stride across the room, then skids slightly and stops with its ears up.
SOUND: fast paw thuds on the floor, a short skid; music: lively acoustic guitar at its most energetic.

S4: The old rabbit walks slowly across the floor with its head low, steps carefully, stops and settles down onto a soft rug.
SOUND: slow, soft uneven paw steps, quiet room tone; music: slow, nostalgic solo piano.
```

### ⑩ `busy-daily-care.mp4`（約 10 秒）
- 對應：`rabbit-busy-care`（`busyCarePresentation.sceneMedia`）
| 鏡頭 | 首幀 | 保留 | 做法 |
|---|---|---|---|
| 1 辦公室夜晚 | — | 0–4s | ♻️ |
| 2 兔子獨自等待 | 圍欄內＋【圍欄新增指令】＋`the hay rack is almost empty, the water bowl is empty, the litter box is full of uncleaned droppings; the rabbit sits next to the hay rack` | 2s | 新增 → Vids |
| 3 兔子趴下不安 | 圍欄內＋【圍欄新增指令】＋`the rabbit lies in a loaf position facing the camera, ears drooping slightly, eyes looking up` | 4s | 新增 → Vids |

鏡頭 2：
```
The rabbit sits alone beside the nearly empty hay rack and empty water bowl, sniffs the empty rack, looks toward the door, then slowly lowers its head.
SOUND: a quiet house, a wall clock ticking, faint distant city traffic; music: subdued, lonely solo piano.
```
鏡頭 3：
```
The rabbit lies in a loaf position with its ears drooping, eyes looking toward the door, then blinks slowly and lets out a small breath through its nose; its ears sink a little lower. Very slow, subtle movement.
SOUND: a soft breath through the nose, a clock ticking in the silence; music: subdued, gentle, slightly sad piano.
```

### ⑪ `senior-life.mp4`（約 8–9 秒）｜四個鏡頭都用老兔版
- 對應：`rabbit-senior-care`
| 鏡頭 | 首幀 | 保留 |
|---|---|---|
| 1 窩邊趴著 | 圍欄內＋【圍欄新增指令】＋老兔額外指示＋`lying beside the hiding house` | 0.8s |
| 2 猶豫跨便盆矮沿 | 圍欄內＋【圍欄新增指令】＋老兔額外指示，兔子站在便盆邊緣前 | 2.8s |
| 3 飼主降低出入高度、鋪軟墊 | 安全房間＋圍欄（飼主蹲在圍欄外，一手伸進去鋪軟墊）＋老兔 | 2s |
| 4 家中撫摸 | 安全房間＋圍欄，飼主蹲在圍欄旁伸手輕撫老兔的背＋老兔 | 3s |

動作：
```
S1: The old rabbit lies on the soft rug near the wall and lifts its head slightly, ears resting low.
SOUND: quiet room tone, a very soft breath; music: gentle, warm but melancholy piano.

S2: The old rabbit stands at the edge of the litter box, hesitates, then lifts one front paw and steps over the low edge slowly and stiffly.
SOUND: soft paw scuffs, slow careful steps; music: gentle, melancholy piano.

S3: The woman kneels and lays a thick soft mat beside the litter box and adjusts the low edge so it is easier to step over; the old rabbit watches calmly from beside her.
SOUND: soft fabric rustle, quiet room tone; music: gentle, warm piano.

S4: The woman kneels on the rug and slowly strokes the old rabbit's back; the rabbit lies relaxed with eyes half closed, breathing slowly.
SOUND: quiet room tone, slow calm breathing, a faint teeth-purr; music: tender, heartwarming piano and soft strings.
```

---

## 生成完之後

1. 片段放進 `public/assets/rabbit/pet-journey/clips/`，Claude 依「保留」秒數剪接、補 ♻️ 原片，用溶接輸出 1280×720 到 `public/assets/rabbit/pet-journey/<影片名>.mp4`。
2. **音樂統一**（只有**過場動畫**必須統一；題目動畫的音樂可有可無，但一定要有音效。貓版 Round 6/6b 的做法，腳本共用）：多鏡頭片段每鏡音樂不同會很突兀，所以：
   - 在 Vids →「音樂」→「生成歌曲」（Lyria，完整＋樂器伴奏）為每支影片生一首情緒對應的底樂；插入、場景靜音後匯出，`ffmpeg -vn` 取音訊。
   - `python3 scripts/cat/mix_music.py VIDEO_SRC AUDIO_SRC OUT BED_START KEEP_END [--bed X]`：保留有自然音效的鏡頭原音，之後以 0.8 秒交叉淡化接進同一段底樂；**不要循環**（循環感太明顯）；底樂放完就淡出。
   - 情緒對應建議：arrival＝溫暖希望的鋼琴＋弦樂；busy-daily-care＝前半保留原音，後半疲憊但溫柔的鋼琴；senior-life＝緩慢懷舊鋼琴＋弦樂；summer-heat＝輕盈涼爽的鋼琴與風鈴。
3. **音效**：Lyria 無法生成純音效（會被拒絕或只給音樂）。需要實際音效（例如碎裂、碰撞）時，用 `scripts/cat/sfx.py`／`add_sfx.py` 的程序合成只適合輕柔聲音；要寫實的聲音請下載 **CC0** 音效（例如 OpenGameArt 的 CC0 項目；在你的 Chrome 開網址下載，雲端環境連不上），存到 `scripts/rabbit/sfx-cc0/` 並附 `LICENSE.txt` 記錄作者與授權。
4. 檢查：`ffmpeg -vf "fps=1,scale=320:-1,tile=4x2"` 做 contact sheet 逐格目視，確認 **只有一隻兔子、毛色一致、房間不變形、物件位置不瞬移**。

## 多鏡頭影片補充規則（沿用貓版教訓）

- **同一個場景**：圍欄內的鏡頭一律以 `rabbit-pen-master.png`、房間的鏡頭一律以 `rabbit-room-master.png`（由 `rabbit-safe-room.webp` 定稿）當圖 1，確保家具位置與風格一致；同一支影片裡不要在圍欄內與房間之間來回混用視角，要切換時用溶接。
- **老兔外觀**：faded dull tan fur, greying white muzzle, slightly cloudy eyes, thin body, ears resting lower；每次都貼【老兔額外指示】。
- **飼主**：用同一張女生參考圖（棕色馬尾、粉色針織毛衣、藍色牛仔褲、白襪）。
- **回憶／時間流逝**：prompt 加 `warm faded vintage old-photo look, sepia tone, soft grain`；現在的鏡頭用正常色調。
- **模型會亂變形**（躲藏箱被打開、物件瞬移、多一隻兔子）：把動作拆成兩段短片＋溶接，或在首幀就放好最終狀態，提示詞強調「鏡頭像三腳架完全固定，家具位置與大小不變」。
- **Vids 被拒（這項要求似乎違反相關條款）**：改用較遠景、手放在背上而非「摟抱／親吻」，或換成別的鏡頭。
- **操作 lesson（直接沿用貓版）**：
  - ChatGPT 輸入框先點一下再 type；type 與 Enter 必須分開，中間截圖確認文字已進入輸入框；下載後確認檔名是新的（避免撿到舊檔）。
  - ChatGPT 圖片檢視器右上角的下載鈕：開啟檢視器前同一位置是「分享」，誤點會建立公開連結，**一定先截圖確認檢視器已開啟**。
  - Vids UI 反應慢，點擊之間等約 2 秒；不確定時先放大截圖確認座標。
  - Vids 匯出會匯出整個專案（約 64 秒），用 ffmpeg 剪需要的那 8 秒；音樂匯出前會有開頭靜音，用 `silencedetect` 找真正開始的時間。
  - 舊版或不要的影片一律 `mv -n` 到 `scripts/rabbit/_backup/`，由你自己決定何時刪除。

## 進度追蹤

| 影片 | 類型 | 對應情境 | 首幀 | Vids 片段 | 成品 |
|---|---|---|---|---|---|
| ① correct-answer | 題目 | 答對回饋 | ⬜ | ⬜ | ⬜ |
| ② correct-answer2 | 題目 | 答對回饋 | ⬜ | ⬜ | ⬜ |
| ③ first-day | 題目 | rabbit-arrival-adjustment | ⬜ | ⬜ | ⬜ |
| ④ summer-heat | 題目 | rabbit-heatstroke-prevention | ⬜ | ⬜ | ⬜ |
| ⑤ sick | 題目 | rabbit-health-emergency | ⬜ | ⬜ | ⬜ |
| ⑥ cecotropes（選用） | 題目 | rabbit-cecotropes | ⬜ | ⬜ | ⬜ |
| ⑦ arrival-transition | 過場 | 接回家過場 | ✅ | ✅ | ✅ |
| ⑧ busy-day-transition | 過場 | 忙碌過場 | ✅ | ✅ | ✅ |
| ⑨ time-passes-aging | 過場 | 老化過場 | ⬜ | ⬜ | ⬜ |
| ⑩ busy-daily-care | 題目 | rabbit-busy-care | ⬜ | ⬜ | ⬜ |
| ⑪ senior-life | 題目 | rabbit-senior-care | ⬜ | ⬜ | ⬜ |

> 不做影片、以靜態圖處理的情境：`rabbit-bath`（洗澡是反面教材）、抱兔排序（已有 5 張步驟圖）、每週美容（已有互動素材）、兔子的考驗。

---

## 補充規則（獎勵影片 correct-answer / correct-answer2）

- 獎勵影片**也要有背景音樂**（Vids 音樂 → 生成歌曲 → 30 秒 + 樂器伴奏，例：ukulele + glockenspiel 輕快 jingle，無人聲），音樂淡入淡出，必要時疊加輕柔落地音效。
- 首幀構圖：兔子置中、**約佔畫面 40% 高**（與貓咪獎勵影片相當），整隻兔子（耳朵到腳）完整、圍欄/小屋/草架/水碗/涼感板/啃咬玩具都在畫面內。ChatGPT 提示詞要寫「camera pulled back, medium-wide shot, rabbit ~40% of image height, 3:2」；原圖 1536×1024，裁 16:9 用 `crop=1536:864:0:80,scale=1280:720`。太近（80%）會被使用者退回。
- ChatGPT 生圖**一律留在同一個聊天室**（https://chatgpt.com/c/6ad0977f-af74-83ec-93ef-ad4c4fb754dd），不要每次開新對話；要調整就在同一串接著說。
- 首幀檔：`start-frames/correct-answer-s1-wide.png`（最終採用）；`-close.png`、`correct-answer-s1.png` 為太近／太遠的舊版。
- Vids：換新圖時按「清除」→ 用 file input 上傳首幀 → 貼提示詞 → 生成後按「取代」→ 匯出整個專案 MP4；音樂在匯出檔約 4.0 s 才進入，剪輯時從 4.0 s 取音訊對齊影片 2.1 s 起點。
- 最終 correct-answer.mp4：6.0 s、1280×720、平均音量約 −20 dB。圍欄必須是方形、物品要齊全：生圖時要附 rabbit-pen-master.png 作參考，並列出所有物品（小屋、墊料盤、便盆、草架、乾草堆、水碗、涼感板、啃咬玩具）。
- 進度：① correct-answer ✅（待使用者確認）。

## 補充規則 2（來自 correct-answer ① 的退件原因）

- **不要用 Veo/Vids 生成影片自帶的聲音**：① 第一版出現「詭異笑聲」（AI 原音）。做法：影片放進 Vids 專案後，點選該片段 → 音效面板 → 勾「靜音」，只保留音樂軌；音效改用自己合成（numpy 輕柔落地聲）。prompt 的 SOUND 也要寫 `No voices of any kind, no laughing, no giggling`。
- **背景音樂要從第一秒就有**：Lyria 歌曲前幾秒常是鋪陳、幾乎沒音量。把新片段放在音樂軌「已經進入主旋律」的位置（例如第二支放在專案 8 s 之後），剪輯時用 `ffmpeg -ss` 從有明顯音量處取音訊（可略早於影片起點），並用 per-0.5 s RMS 檢查開頭不是安靜的。
- 獎勵影片目標平均音量約 −20 ~ −22 dB（貓咪版 −23.8 dB）。
- ② correct-answer2：首幀 `start-frames/correct-answer2-s1.png`（四腳站立 3/4 側面），成品 6.0 s、1280×720、平均 −21.8 dB；進度 ✅（待確認）。

## 補充規則 3（姿勢）

- **兔子不會像狗一樣四腳直立站著**，也不會用後腳站著走。首幀/動作一律用兔子自然姿勢：警覺蹲姿（身體壓低成麵包形、後腳收在身下、前腳短短伸直、頭抬起耳朵豎起）、趴臥、側躺、伸展、跳躍中。生圖與 Vids prompt 都要寫 `never stands up on its hind legs`。
- ② correct-answer2 v2：首幀 `start-frames/correct-answer2-s1-crouch.png`（警覺蹲姿）→ binky（蹲姿起跳、空中小扭身、落回蹲姿、兩個小跳、回到蹲姿）；成品 6.8 s。舊版（直立站姿）備份 `_backup/_old_correct-answer2_v1-upright-stand.mp4`。

## 補充規則 4（首幀構圖與外籠）

- **外出籠 `rabbit-carrier.webp` 的真實外觀**：奶油米色外殼＋灰褐色底座／提把／扣環＋灰色金屬線門＋奶油色軟墊，**不是藏青／深灰**（舊文件曾誤寫成 grey-and-navy）。提示詞要寫 `cream-beige shell, taupe-brown base/handle/latches, grey wire door, must NOT be navy`。
- **每支影片的構圖要不同**：不要每支都用 `rabbit-pen-master.png` 同一個俯視。以 pen-master 只當「圍欄設計與物品」的參考，另外指定視角（低角度三分之四、貼近地面、特寫某個物件、從圍欄外望入等），物品仍須齊全。③ first-day 採「低角度三分之四，從左前角斜看向右後角的躲藏屋」。

---

## 踩雷與注意事項整理（⑦、⑧ 來回修改後的經驗，之後每支先照這份檢查）

### A. 首幀（ChatGPT）
1. **一次只做一張，構圖要變化**：每張首幀換不同鏡位（正面／背影／俯視／側面），畫風不變；不要連做好幾張同構圖。
2. **同一支影片出現的人物，一律用「已核可的角色圖」當參考圖上傳**（飼主＝`busy-day-transition-s4/s5.png` 那個描邊卡通版）。不要只靠文字描述，也不要讓 Vids 在中途「長出」新人物（開門進場的人會長得跟其他鏡頭不同）；人物要在首幀就畫好。
3. **沿用狗版／貓版舊素材要先比畫風**：狗版的飼主是光滑動漫風，和兔子版的描邊卡通風不同，不能直接混用。拼接前先把各來源鏡頭的人物截圖並排比對。
4. **兔子必須在圍欄／籠內**（姿勢自然、耳朵長而直立、毛色一致）；不要在圍欄外、不要出現窗外光束打在地上的不合理光影；夜晚場景要像夜晚（窗外是夜空與月亮、室內是檯燈暖光）。
5. **透視要正確**：圍欄用「單一面直的欄片」或「從兔子背後看向門」這類簡單視角，避免斜角、轉角柱子（容易出現錯誤的圍欄角落）。圍欄擋住兔子沒關係，不要刻意去掉。
6. 方形圍欄要看得到所有物件；外出籠＝奶油米色殼、棕灰底座／把手／卡扣、灰色鐵絲門。
7. **ChatGPT 輸出是 3:2（1536×1024）**，轉 16:9 前先看人物頭頂位置：頭在最上緣時用 `crop=1536:864:0:0`，不要固定用 `:0:90`（會切到頭）。
8. 送出前確認：沒有開著圖片檢視器（開著時輸入框會被吃掉）；上傳完縮圖有出現再打字；送出後等到按鈕變回「語音」圖示。

### B. Vids 影片生成
1. 提示詞第一句固定 `Use this image as the exact first frame and animate it. Locked static camera, no zoom, no pan, no cuts.`；最後加 `Only one woman and one rabbit` 與 `The fence/pen/room stay exactly the same`。
2. **要明確寫禁止事項**：手不穿過鐵絲網、手一直在欄杆上緣之上、兔子不離開圍欄、沒有手穿過外出籠。
3. 每個 prompt 結尾寫 `SOUND: … No voices, no music.`；實際成品不用 Veo 音訊（見 D）。
4. 一個專案可以連續插入多支（用「＋」加空白場景，選取空白場景後再插入）；匯出 MP4 會把整個專案匯出，檔名是「專案名」或「未命名影片 (N).mp4」，第 N 支在檔案時間軸上的位置＝前面場景長度總和，用 contact sheet 對時間。
5. **生成完成的卡片按鈕是「插入」，生成中同一個位置是「取消」**：確認按鈕文字再點，不要看到 100% 就點。Lyria 生歌曲偶爾卡在 100%＋取消，重新整理頁面後再試；仍卡住就改用本機合成音樂。
6. AI 面板送出箭頭約在 (1367,746)；時間長度彈窗（Omni・720p・10s/8s）開著時不能打字，要先關掉。
7. 生成後**一定先看 contact sheet**：兔子有沒有跑出圍欄、手有沒有穿牆、背景有沒有變形、人物是否變成另一個人；有問題先修首幀再重生，不要硬剪。

### C. 拼接與後製
1. 每鏡頭保留長度：場景鏡頭約 2–5 秒、整支 ≤ 15 秒，交叉淡化 `--xf 0.25`；挑掉生成片段開頭／結尾的怪異幀（例如嘴型怪、突然出現的手）。
2. 疊圖（歡迎回家貼圖等）：放畫面**中間偏內**、不要擋住兔子，要考慮網頁版會被裁切，所以要比直覺再小一點、再靠中間。
3. 備份舊版再覆蓋成品（`scripts/rabbit/_backup/<影片名>_vN.mp4`），預覽放 `_preview/`；使用者自己剪的 `correct-answer.mp4` 不覆蓋。

### D. 聲音
1. 成品不留 Veo 原音、沒有 AI 人聲；Vids 片段一律靜音，用 `mix_music.py … 0 0 --bed … --db N` 從第 0 秒鋪上一首統一底樂。
2. **過場動畫整支只用同一首音樂**，從第一秒就開始；不同動畫之間可以不同首。
3. 目標平均音量約 −21 dB（⑧ 用 −4.4 dB 增益，bed 平均 −16.6 dB）。
4. 我（Claude）聽不到音訊，只能用 volumedetect／silencedetect 驗證數值，所以每支交付時都要請使用者聽音樂是否合適。
5. 底樂做法優先順序：Vids Lyria（30 秒、純樂器）→ 失敗時用 `scripts/rabbit/music/make_busy_bed.py` 式的本機合成鋼琴。

### E. 交付
1. 做完用 SendUserFile 傳預覽，並附一行重點；同時更新本檔進度表。
2. 暫存檔（Downloads 內的 `*_gpt.png`、`未命名影片*.mp4`、`貓咪 (N).mp4`、`$HOME/tmpar`、`_backup` 內 `_*.png` 暫存圖）定期請使用者確認後清掉。
