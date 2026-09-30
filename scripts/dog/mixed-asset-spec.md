# 米克斯（混種犬）素材生成規格

> Pre-Pet Assessment — 米克斯專屬素材  
> 生成工具：ChatGPT（圖片）、Google Flow（影片）｜影片起始畫面流程見 `mixed-frames-workflow.md`  
> 生成方式：Computer Use — 使用 Claude 內建瀏覽器操作網頁介面

---

## 視覺基準

### 米克斯外觀（必須一致）
參考圖：`public/assets/dog/selection/mixed-breed.png`

- **毛色**：背部黑色，臉頰/眼眶上方/腿部/腹側為棕褐色（tan），胸口有小塊白毛
- **體型**：中型犬，身形修長有力
- **耳型**：豎立三角耳
- **尾巴**：長且微微上捲
- **毛長**：短毛至中短毛

**每支影片/圖片的犬種描述固定用語**：
> `a mixed-breed dog with black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, and a long slightly curled tail`

---

### 飼主外觀（必須一致）
參考圖：用戶提供的兩張參考圖（辦公室場景、收容所場景）

- **年齡**：年輕女性（20 幾歲）
- **髮型**：棕色長髮，綁成馬尾
- **上衣**：粉紅色帽T（sweatshirt）
- **下身**：藍色牛仔褲
- **鞋子**：白色運動鞋（sneakers）
- **畫風**：日式動漫插畫風，比例寫實（非Q版），人物常從側面或背面呈現

**每次出現飼主的影片/圖片固定用語**：
> `a young woman with brown hair in a ponytail, wearing a pink sweatshirt, blue jeans, and white sneakers, anime illustration style`

---

### 畫風分類

#### A. 寵物靜態圖片風格（pet-journey/mixed/*.png）
參考圖：`public/assets/dog/pet-journey/shiba/shiba-dog.png`

- **風格關鍵字**：`cartoon illustration, bold black outlines, flat colors, minimal shading, clean lines`
- 色彩以平塗為主，幾乎無漸層
- 黑色粗輪廓線勾勒全身
- 透明背景（PNG）
- 表情誇張清晰，情緒一眼可辨
- 適合兒童友善的可愛風格

#### B. 散步互動圖片風格（walking/mixed/*.png）
參考圖：`public/assets/dog/walking/shiba/leash-choice.png`（及同資料夾其他圖）

- **風格關鍵字**：`anime illustration style, soft watercolor background, semi-realistic proportions, warm natural colors`
- 比 A 風格更細緻，接近手繪水彩感
- 人物比例寫實（非Q版卡通）
- 場景背景有細節（人行道、樹木、公園）
- 人物常從側面或背面呈現
- 使用透明背景（cutout）或完整場景背景視情況而定

#### C. 影片動畫風格（*.mp4）
- **風格關鍵字**：`Anime-style 2D animation, clean line art, cel-shaded with distinct flat shadow blocks, soft warm muted color palette (beige, cream, tan, warm brown), low saturation, cozy slice-of-life atmosphere, warm ambient lighting, child-friendly`
- 角色有柔和漸層陰影（cel-shading），非完全平塗、非寫實 3D
- 室內場景：溫暖米色牆壁、淺木色地板、圓形地毯、mid-century 家具、琥珀色燈光

---

## ⚠️ 影片全域要求（所有 MP4 均適用）

> 以下規則必須加入**每一支**影片的提示詞：

1. **鏡頭**：定焦鏡頭，固定中景拍攝（`fixed focal length, medium shot throughout, no close-ups, no camera cuts or switches`）
2. **聲音**：包含音效與背景配樂（`include sound effects and background music`）
3. **無文字**：不出現任何文字或字幕（`no text or subtitles on screen`）— 唯一例外：`arrival-transition.mp4` 結尾的「歡迎回家」
4. **動物行為**：按照真實動物的反應，不擬人化（`animals behave realistically based on natural animal instincts, not anthropomorphized`）

---

## 存檔路徑

| 素材類型 | 存放路徑 |
|---------|---------|
| 寵物靜態圖片 | `public/assets/dog/pet-journey/mixed/` |
| 影片動畫 | `public/assets/dog/pet-journey/mixed/` |
| 散步互動圖片 | `public/assets/dog/walking/mixed/` |

---

## 🖼️ 圖片素材 A：寵物靜態圖（3 張）

> **路徑**：`public/assets/dog/pet-journey/mixed/`  
> **格式**：PNG，透明背景，正方形構圖  
> **畫風**：A 風格（粗黑輪廓卡通）

---

### 1. `mixed-dog.png` — 正常/開心狀態

**用途**：第一餐完成後出現的狗、時光流逝過場、高齡階段的狗

**ChatGPT 提示詞（英文）**：
```
A medium-sized mixed-breed dog with black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, and a long slightly curled tail. The dog is sitting upright, looking forward with a happy relaxed expression, mouth slightly open with tongue out. Cartoon illustration style, bold black outlines, flat colors with minimal shading. Transparent background (PNG with alpha channel), full body visible, square format, child-friendly, no text, no background scenery.
```

---

### 2. `mixed-sad.png` — 難過/生病狀態

**用途**：生病情境、第一天情境（答錯時）

**ChatGPT 提示詞（英文）**：
```
A medium-sized mixed-breed dog with black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, and a long slightly curled tail. The dog is sitting with droopy posture, ears slightly flattened, eyes half-closed and sad-looking, looking downward. Cartoon illustration style, bold black outlines, flat colors with minimal shading. Transparent background (PNG with alpha channel), full body visible, square format, child-friendly, no text, no background scenery.
```

---

### 3. `mixed-hungry.png` — 等待/餓了狀態

**用途**：飼主忙碌時狗狗在旁等待的畫面  
**構圖**：橫向，狗俯趴在地，旁邊有空碗（參考 shiba-hungry.png 構圖）

**ChatGPT 提示詞（英文）**：
```
A medium-sized mixed-breed dog with black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, and a long slightly curled tail. The dog is lying down with front paws stretched forward, staring at an empty food bowl with big sad eyes. Cartoon illustration style, bold black outlines, flat colors with minimal shading. Transparent background (PNG with alpha channel), horizontal composition, full body visible, child-friendly, no text, no background scenery.
```

---

## 🖼️ 圖片素材 B：散步互動圖（5 張）

> **路徑**：`public/assets/dog/walking/mixed/`  
> **格式**：PNG（部分透明背景，部分完整場景背景，與 shiba 版本一致）  
> **畫風**：B 風格（動漫水彩半寫實）  
> **原則**：與 `public/assets/dog/walking/shiba/` 同款圖構圖完全一致，僅將柴犬換成米克斯

---

### 4. `leash-choice.png` — 牽繩散步

**參考**：`walking/shiba/leash-choice.png`  
**構圖**：飼主牽著米克斯沿人行道散步，側面視角，有樹木/街道背景，完整場景

**ChatGPT 提示詞（英文）**：
```
A young woman with brown hair in a ponytail, wearing a pink sweatshirt, blue jeans, and white sneakers, walking a medium-sized mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) on a red leash along a sidewalk. Trees and a street in the background. Side view, full scene horizontal composition. Anime illustration style, clean line art, semi-realistic proportions, warm natural colors. Transparent background (PNG with alpha channel), full body both characters visible, no background scenery, no text.
```

---

### 5. `off-leash-choice.png` — 無牽繩散步

**參考**：`walking/shiba/off-leash-choice.png`  
**構圖**：飼主在後方走，米克斯在前方較遠處不戴牽繩，飼主望向狗的方向，相同人行道場景

**ChatGPT 提示詞（英文）**：
```
A young woman with brown hair in a ponytail, wearing a pink sweatshirt, blue jeans, and white sneakers, walking along a sidewalk while a medium-sized mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) walks ahead without a leash. The woman is looking toward the dog in the distance. Trees and street in the background. Side view, full scene horizontal composition. Anime illustration style, clean line art, semi-realistic proportions, warm natural colors. Transparent background (PNG with alpha channel), full body both characters visible, no background scenery, no text.
```

---

### 6. `walker-and-dog-poop.png` — 排泄行為（公園）

**參考**：`walking/shiba/walker-and-dog-poop.png`  
**構圖**：公園背景，米克斯剛排泄（地上有糞便），飼主在旁，有樹木公園場景，cutout 或半透明背景

**ChatGPT 提示詞（英文）**：
```
A young woman with brown hair in a ponytail, wearing a pink sweatshirt, blue jeans, and white sneakers, walking a medium-sized mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) in a park. The dog has just defecated (small pile visible on ground). Trees and park background. Side or three-quarter view. Anime illustration style, clean line art, semi-realistic proportions, warm natural colors. Transparent background (PNG with alpha channel), full body both characters visible, no background scenery, no text. Tasteful depiction.
```

---

### 7. `walker-and-dog.png` — 飼主與狗同行（人物cutout）

**參考**：`walking/shiba/walker-and-dog.png`  
**構圖**：飼主與米克斯並肩同行，transparent/white 背景，人物剪影風格

**ChatGPT 提示詞（英文）**：
```
A young woman with brown hair in a ponytail, wearing a pink sweatshirt, blue jeans, and white sneakers, walking side by side with a medium-sized mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) on a leash. Transparent background (PNG with alpha channel). Cutout character style, side view, full body both characters visible, no background scenery. Anime illustration style, semi-realistic proportions, clean lines, no text.
```

---

### 8. `walker-dog-bag.png` — 飼主提糞便袋（人物cutout）

**參考**：`walking/shiba/walker-dog-bag.png`  
**構圖**：飼主左手提著綠色糞便袋，右手牽米克斯，transparent/white 背景，人物剪影風格

**ChatGPT 提示詞（英文）**：
```
A young woman with brown hair in a ponytail, wearing a pink sweatshirt, blue jeans, and white sneakers, holding a green poop bag in her left hand while holding a leash in her right hand. A medium-sized mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) walks beside her. Transparent background (PNG with alpha channel). Cutout character style, side view, full body both characters visible, no background scenery. Anime illustration style, semi-realistic proportions, clean lines, no text.
```

---

## 🎬 影片素材（14 支）

> **所有影片提示詞必須加入以下固定語句：**
> - 犬種：`a mixed-breed dog with black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, and a long slightly curled tail`
> - 鏡頭：`fixed focal length, medium shot throughout, no close-ups, no camera cuts or switches`
> - 聲音：`include realistic sound effects and background music`
> - 無文字：`no text or subtitles on screen`
> - 動物行為：`animals behave realistically based on natural instincts, not anthropomorphized`
> - 畫風：`Anime-style 2D animation, clean line art, cel-shaded with distinct flat shadow blocks, soft warm muted color palette (beige, cream, tan, warm brown), low saturation, cozy slice-of-life atmosphere, warm ambient lighting, child-friendly`

---

### 過場動畫

#### `arrival-transition.mp4` — 接回家過場
**時長**：8–10 秒  
**遊戲情境**：玩家選完品種後，過場動畫播放，帶入第一天情境  
**場景描述**：6 個分鏡依序呈現——車子開往收容所、飼主帶走米克斯、開車回家、到家開籠、米克斯走出來、歡迎回家文字

**Google Flow 提示詞**：
```
Anime-style 2D animation, clean line art, cel-shaded. Warm, heartwarming, cozy slice-of-life style.

Six-scene sequence with smooth dissolve transitions, fixed focal length, medium shot throughout, no close-ups, no hard camera cuts:

Scene 1: A small round blue vintage car drives left to right along a quiet two-lane countryside road. A young woman with brown hair in a ponytail, wearing a pink sweatshirt, is clearly visible as the driver through the side window. Soft rolling green hills, fluffy white clouds, and a clear blue sky in the background. Bright morning light.

Scene 2: Interior of a warm animal shelter — cream walls, rows of kennels with other dogs visible in the background. The young woman (pink sweatshirt, blue jeans, white sneakers) kneels gently on the floor and guides a mixed-breed dog (black dorsal coat, tan cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) into an open blue pet carrier.

Scene 3: The same round blue car drives along a tree-lined road under a warm golden sunset sky. The young woman is visible as the driver. The closed blue pet carrier sits in the backseat.

Scene 4: Cozy living room interior — warm beige walls, light wooden floor, large wooden bookshelf with books and potted plants including a Monstera, beige couch with patterned cushions, small table with a warm ambient lamp, framed pictures on the walls. The young woman kneels on a round cream rug and opens the blue pet carrier door.

Scene 5: The mixed-breed dog (black dorsal coat, tan cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) cautiously steps out of the open carrier onto the round rug, looking around with wide alert eyes — natural hesitant first-step behavior in a new space.

Scene 6: The dog sits calmly on the round rug in the warm living room. Large warm-colored Chinese text "歡迎回家" appears prominently — light yellow with soft glowing edges, children's book title card style. This is the only text in the entire video.

Include soft background music and gentle sound effects (car engine, shelter ambience, door opening, soft paw steps). Animals behave realistically, not anthropomorphized. High detailed and heartwarming.
```
---

#### `busy-day-transition.mp4` — 忙碌生活過場（飼主視角）
**時長**：5–8 秒  
**遊戲情境**：「疲憊忙碌的日子」情境題的過場，從飼主視角帶入  
**場景描述**：早上匆忙出門、白天工作、夜晚疲憊回家；米克斯在門邊等待

**VideoFX 分鏡腳本**：
```
Anime-style 2D animation, clean line art, cel-shaded. Warm, cozy slice-of-life style.

First-person perspective (owner's viewpoint). Fixed focal length, medium shot, no camera cuts, no close-ups.

Shot 1: Hands of a young woman (pink sweatshirt cuffs visible) grabbing keys and a tote bag from a hook near the front door — bright morning light streaming in.
Shot 2: The same hands typing at a cluttered desk with papers and a laptop — warm afternoon indoor light.
Shot 3: Front door opens at night. Warm amber lamp light fills the cozy hallway. A mixed-breed dog (black dorsal coat, tan cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) sits quietly near the door. The dog's tail wags once calmly, then settles — a natural low-key greeting, not excited jumping.

Cozy home interior with warm beige walls, wooden floor, small table with a warm ambient lamp. Background music shifts from upbeat morning to quiet evening. Include sound effects (keys jingling, door opening). No text on screen. Animals behave realistically, not anthropomorphized.
```

---

#### `time-passes-aging.mp4` — 老化過場
**時長**：5–8 秒  
**遊戲情境**：「逐漸進入高齡」階段的過場  
**場景描述**：米克斯從活潑的成犬逐漸變成老犬，鬍鬚/眼眶周圍慢慢出現白毛，動作變慢

**VideoFX 分鏡腳本**：
```
Anime-style 2D animation, clean line art, cel-shaded. Warm, heartwarming, cozy slice-of-life style.

A mixed-breed dog (black dorsal coat, tan cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) in a cozy living room — warm beige walls, light wooden floor, round cream rug, large wooden bookshelf with books and potted plants including a Monstera, beige couch with patterned cushions. Fixed focal length, medium shot, no close-ups, no camera cuts.

The dog is first shown as a healthy adult, walking and sniffing around the room energetically. A soft dissolve transition — with a gentle falling-leaf visual effect — transitions to the same dog as a senior: grey around the muzzle and eyes, movement slower, settling onto a cozy dog bed in a sunny corner near the window.

Background music shifts from lively to gentle and soft. No text on screen. Animals behave realistically, not anthropomorphized. Heartwarming.
```

---

### 做的很好動畫

#### `correct-answer.mp4` — 答對反應 1
**時長**：3–5 秒  
**遊戲情境**：玩家選到正確答案時播放  
**場景描述**：米克斯開心跳起來，周圍出現星星/閃光，尾巴搖擺

**VideoFX 分鏡腳本**：
```
Anime-style 2D animation, clean line art, cel-shaded. Cheerful and child-friendly. Duration: 3–5 seconds.

A mixed-breed dog (black dorsal coat, tan cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) on a warm cream background. The dog wags its tail happily and quickly — a natural joyful dog behavior. The tail sweeps back and forth with energy. The dog's expression is relaxed and happy, mouth slightly open in a natural panting smile.

Fixed focal length, medium shot, no close-ups, no camera cuts. No sparkles or special effects. Include a short upbeat background music clip. No text on screen. Animals behave realistically, not anthropomorphized.
```

---

#### `correct-answer2.mp4` — 答對反應 2
**時長**：3–5 秒  
**遊戲情境**：玩家選到正確答案時（第二種動畫）  
**場景描述**：米克斯轉一圈後坐下，表情放鬆滿足

**VideoFX 分鏡腳本**：
```
Anime-style 2D animation, clean line art, cel-shaded. Cheerful and child-friendly. Duration: 3–5 seconds.

A mixed-breed dog (black dorsal coat, tan cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) on a warm cream background. The dog wags its tail happily and energetically — a natural excited dog behavior. It shifts its weight slightly from side to side as its tail sweeps back and forth. The dog sits and looks forward with a calm satisfied expression, tail still gently wagging.

Fixed focal length, medium shot, no close-ups, no camera cuts. No sparkles or special effects. Include a cheerful upbeat background music clip. No text on screen. Animals behave realistically, not anthropomorphized.
```

---

### 日常照護題目影片

#### `first-day.mp4` — 第一天適應新家
**時長**：5–8 秒  
**遊戲情境**：題目「第一天適應新家」——豆豆剛到新家，躲在外出籠旁觀察，家人很想靠近牠  
**場景描述**：米克斯縮在外出籠旁邊，四肢緊縮，眼神警覺地觀察環境；背景是陌生的客廳

**VideoFX 分鏡腳本**：
```
Anime-style 2D animation, clean line art, cel-shaded. Warm, heartwarming, cozy slice-of-life style.

A mixed-breed dog (black dorsal coat, tan cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) huddles close to a blue pet carrier in an unfamiliar cozy living room — warm beige walls, light wooden floor, round cream rug, large wooden bookshelf with books and potted Monstera, beige couch with patterned cushions, small table with warm ambient lamp. Fixed focal length, medium shot, no close-ups, no camera cuts.

The dog's body is low to the ground, ears slightly pulled back, wide alert eyes scanning the unfamiliar space — natural fearful posture. A young woman's hand (pink sweatshirt sleeve visible) slowly and gently extends toward the dog from the right side of the frame. The dog instinctively leans back closer to the carrier without breaking its cautious gaze.

Include soft ambient indoor sounds and gentle background music. No text on screen. Animals behave realistically based on natural fear response, not anthropomorphized.
```

---

#### `barking.mp4` — 吠叫行為
**時長**：5–8 秒  
**遊戲情境**：題目「牠一直吠叫，該怎麼辦？」——晚上小狗對門口吠叫，對外面的聲音有警覺反應  
**場景描述**：夜晚室內，米克斯對著門口吠叫，耳朵豎立，身體前傾，表情警覺

**VideoFX 分鏡腳本**：
```
Anime-style 2D animation, clean line art, cel-shaded. Cozy slice-of-life style.

A cozy living room at night — warm beige walls, round cream rug, small table with a warm amber lamp glowing softly, front door visible in the background. Fixed focal length, medium shot, no close-ups, no camera cuts.

A mixed-breed dog (black dorsal coat, tan cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) stands on the rug facing the front door, barking repeatedly. Its body leans forward with weight on its front paws, ears fully erect — natural alert territorial behavior triggered by sounds outside. The dog briefly glances back over its shoulder, then refocuses on the door.

Include barking sound effects and muffled sounds from outside. No text on screen. Animals behave realistically, not anthropomorphized.
```

---

#### `chewing-on-things.mp4` — 啃咬行為
**時長**：5–8 秒  
**遊戲情境**：題目「牠開始亂咬東西，該怎麼辦？」——發現小狗正在咬桌腳旁的物品  
**場景描述**：米克斯咬著鞋子，被人發現後轉頭，停止咬東西

**VideoFX 分鏡腳本**：
```
Anime-style 2D animation, clean line art, cel-shaded. Cozy slice-of-life style.

A cozy living room in daytime — warm beige walls, light wooden floor, items near the table base. Fixed focal length, medium shot, no close-ups, no camera cuts.

A mixed-breed dog (black dorsal coat, tan cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) chews on a sneaker near the base of a table — natural teething behavior. The dog suddenly freezes and looks up toward the camera, drops the shoe, and sits still with a cautious alert expression — not exaggerated guilt, just a natural pause when startled.

Include a chewing sound effect followed by sudden quiet. No text on screen. Animals behave realistically, not anthropomorphized.
```

---

#### `urinate-and-defecate.mp4` — 在錯誤地點排泄
**時長**：5–8 秒  
**遊戲情境**：題目「牠在不適合的地方大小便，該怎麼辦？」——小狗還沒建立如廁習慣，在不適合的地方排泄  
**場景描述**：米克斯在客廳地板角落排泄，表情自然不帶惡意；旁邊沒有尿布墊

**VideoFX 分鏡腳本**：
```
Anime-style 2D animation, clean line art, cel-shaded. Tasteful and child-friendly.

A cozy living room — warm beige walls, light wooden floor, no training pads visible anywhere. Fixed focal length, medium shot, no close-ups, no camera cuts.

A mixed-breed dog (black dorsal coat, tan cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) sniffs along the floor near a corner of the room. The dog circles once — natural pre-urination behavior — then squats and urinates on the floor, shown tastefully from the side with a small puddle graphic. The dog's expression is neutral and calm — no guilt, no awareness this is wrong.

Include quiet ambient indoor sounds. No text on screen. Animals behave realistically based on natural instincts, not anthropomorphized.
```

---

### 生命階段（生活變化）題目影片

#### `busy-daily-care.mp4` — 忙碌時寵物等待（寵物視角）
**時長**：5–8 秒  
**遊戲情境**：題目「疲憊忙碌的日子」——飼主臨時加班未歸，狗狗一人等待；寵物視角  
**場景描述**：米克斯坐在門邊等待飼主回家，偶爾看看牆上的時鐘

**VideoFX 分鏡腳本**：
```
Anime-style 2D animation, clean line art, cel-shaded. Warm, heartwarming, cozy slice-of-life style.

A cozy home interior — warm beige walls, light wooden floor, round cream rug, a round wall clock clearly visible on the wall, front door in the background, small table with a warm ambient lamp. Fixed focal length, medium shot, no close-ups, no camera cuts.

A mixed-breed dog (black dorsal coat, tan cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) lies near the front door with its chin resting on its front paws. The dog occasionally shifts its gaze to the round wall clock on the wall, then back to the door — natural waiting behavior. Its posture is relaxed but slightly droopy from long waiting. The clock hands visually suggest time has passed.

Include quiet ambient room sounds and soft distant city noise. Subdued gentle background music. No text on screen. Animals behave realistically, not anthropomorphized.
```

---

#### `sick.mp4` — 生病情境（米克斯：口腔/外寄生蟲問題）
**時長**：5–8 秒  
**遊戲情境**：題目「米克斯常見健康問題觀察」——發現 {petName} 吃東西動作遲疑、嘴巴有異味；身上有跳蚤、不停抓癢  
**場景描述**：米克斯靠近食碗時動作猶豫，用爪子撥嘴邊；再切到後腿不停抓肚子

**VideoFX 分鏡腳本**：
```
Anime-style 2D animation, clean line art, cel-shaded. Warm, child-friendly style.

A cozy living room — warm beige walls, light wooden floor, food bowl on the floor. Fixed focal length, medium shot, no close-ups, no camera cuts.

A mixed-breed dog (black dorsal coat, tan cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) approaches its food bowl slowly and hesitantly. The dog sniffs the food but does not eat — it gently paws near its mouth, showing natural oral discomfort. Then the dog pauses and repeatedly scratches its belly and neck area with its hind leg — natural flea-related itching behavior. Small itch-line graphic marks appear near the scratching area.

Color palette slightly more muted and desaturated to convey illness. Include soft ambient indoor sounds. No text on screen. Animals behave realistically based on natural discomfort responses, not anthropomorphized.
```

---

#### `senior-life.mp4` — 高齡生活
**時長**：5–8 秒  
**遊戲情境**：題目「高齡後的照顧準備」——小狗走路變慢，後腳偶爾使不上力，曾經輕鬆走完的路需要停下休息  
**場景描述**：老年米克斯（鬍鬚/眼周有白毛）慢慢走路，在一半時停下來，飼主溫柔陪伴牠曬太陽

**VideoFX 分鏡腳本**：
```
Anime-style 2D animation, clean line art, cel-shaded. Warm, heartwarming, cozy slice-of-life style.

A cozy living room — warm beige walls, light wooden floor, soft golden sunlight streaming through a curtained window. Fixed focal length, medium shot, no close-ups, no camera cuts.

An older mixed-breed dog (black dorsal coat with grey around the muzzle and eyes, tan cheeks and legs, small white chest patch, erect ears, long slightly curled tail) walks slowly across the living room. The dog pauses midway, back legs slightly unsteady — natural age-related gait. A young woman's hand (pink sweatshirt sleeve visible) gently strokes the dog's back. The dog settles down onto a cozy dog bed in a warm patch of sunlight near the window.

Soft gentle background music. Include ambient indoor sounds. No text on screen. Animals behave realistically, not anthropomorphized. High detailed and heartwarming.
```

---

### 品種考驗題目影片

#### `breed-size.mp4` — 成犬體型無法預測
**時長**：5–8 秒  
**遊戲情境**：題目「成犬體型，無法從幼犬外表預測」——朋友說「這麼小，長大應該也不大」；實際上成犬體型無法預測  
**場景描述**：可愛的米克斯幼犬長大後，比預期的還要大，飼主看著牠

**VideoFX 分鏡腳本**：
```
Anime-style 2D animation, clean line art, cel-shaded. Warm, heartwarming, cozy slice-of-life style.

A cozy living room — warm beige walls, light wooden floor, large wooden bookshelf with books and potted plants, beige couch with patterned cushions, small table with a warm ambient lamp. Fixed focal length, medium shot, no close-ups, no camera cuts.

Shot 1: A young woman (brown hair in a ponytail, pink sweatshirt, blue jeans, white sneakers) sits on a round cream rug. A small fluffy mixed-breed puppy (black and tan coloring, compact little body) sits comfortably beside her feet.

Soft page-flip visual transition.

Shot 2: The same woman sits in the same spot — but the dog beside her has grown into a large, unexpectedly big adult dog (same black-back, tan-legs coloring, but much taller and broader). The woman's expression shows genuine wide-eyed surprise.

Include a gentle transition sound effect and light background music. No text on screen. Animals behave realistically, not anthropomorphized.
```

---

#### `breed-individual.mp4` — 米克斯個體差異
**時長**：5–8 秒  
**遊戲情境**：題目「米克斯和純種犬不一樣的地方」——每隻米克斯的個性都是獨特的，需要花時間認識牠本身  
**場景描述**：三隻外觀各異的米克斯並排，各自表現出不同的自然行為；旁邊是一本狗狗品種圖鑑，書上沒有對應說明

**VideoFX 分鏡腳本**：
```
Anime-style 2D animation, clean line art, cel-shaded. Warm, child-friendly style.

A clean warm cream background. Fixed focal length, medium shot, no close-ups, no camera cuts.

Three different mixed-breed dogs stand side by side: one small dog with floppy ears and a spotted coat; one medium dog with erect ears and a black-and-tan coat; one large dog with a patchy multi-colored coat. Each dog displays naturally different behavior: the small one stays still and cautious, the medium one shifts and looks around alertly, the large one lies down calmly. A cartoon book with the title "品種圖鑑" appears beside them, showing a question mark for all three entries.

Include light playful background music. The only visible text is "品種圖鑑" on the book cover. Animals behave realistically based on natural temperament, not anthropomorphized.
```

---

## 🗂️ 完整素材清單（快速對照）

### pet-journey/mixed/（17 個）

| # | 檔案名稱 | 類型 | 時長 | 對應遊戲情境 |
|---|---------|------|------|------------|
| 1 | `mixed-dog.png` | 圖片 | — | 開心狀態（多處使用） |
| 2 | `mixed-sad.png` | 圖片 | — | 難過/生病狀態 |
| 3 | `mixed-hungry.png` | 圖片 | — | 等待/餓了 |
| 4 | `arrival-transition.mp4` | 影片 | 5-8s | 接回家過場（收容所→車→新家→歡迎回家）|
| 5 | `busy-day-transition.mp4` | 影片 | 5-8s | 忙碌生活過場（飼主視角）|
| 6 | `time-passes-aging.mp4` | 影片 | 5-8s | 老化過場 |
| 7 | `correct-answer.mp4` | 影片 | 3-5s | 答對反應 1 |
| 8 | `correct-answer2.mp4` | 影片 | 3-5s | 答對反應 2 |
| 9 | `first-day.mp4` | 影片 | 5-8s | 第一天適應新家 |
| 10 | `barking.mp4` | 影片 | 5-8s | 吠叫行為 |
| 11 | `chewing-on-things.mp4` | 影片 | 5-8s | 啃咬行為 |
| 12 | `urinate-and-defecate.mp4` | 影片 | 5-8s | 在錯誤地點排泄 |
| 13 | `busy-daily-care.mp4` | 影片 | 5-8s | 忙碌時寵物等待（寵物視角）|
| 14 | `sick.mp4` | 影片 | 5-8s | 生病（口腔/外寄生蟲）|
| 15 | `senior-life.mp4` | 影片 | 5-8s | 高齡生活 |
| 16 | `breed-size.mp4` | 影片 | 5-8s | 品種考驗：成犬體型無法預測 |
| 17 | `breed-individual.mp4` | 影片 | 5-8s | 品種考驗：米克斯個體差異 |

### walking/mixed/（5 個）

| # | 檔案名稱 | 類型 | 對應參考圖 |
|---|---------|------|----------|
| 18 | `leash-choice.png` | 圖片 | `walking/shiba/leash-choice.png` |
| 19 | `off-leash-choice.png` | 圖片 | `walking/shiba/off-leash-choice.png` |
| 20 | `walker-and-dog-poop.png` | 圖片 | `walking/shiba/walker-and-dog-poop.png` |
| 21 | `walker-and-dog.png` | 圖片 | `walking/shiba/walker-and-dog.png` |
| 22 | `walker-dog-bag.png` | 圖片 | `walking/shiba/walker-dog-bag.png` |

**共計：8 張圖片 + 14 支影片 = 22 個素材**

---

## ⚙️ 生成流程（Computer Use）

### 圖片生成（ChatGPT，Claude 以 Computer Use 操作 Chrome）
1. 在 Chrome 開啟 https://chatgpt.com（請先自行登入；Claude 不會輸入密碼）
2. 每張圖開一個新對話，選「建立圖片」
3. 貼上該圖的英文提示詞；有參考圖的（散步圖對應 `walking/shiba/` 同名圖）一併上傳
4. 透明背景的圖在提示詞最後加上 `Transparent background.`，並確認下載的檔案是透明 PNG
5. 生成後確認外觀（犬種毛色、人物服裝）與畫風是否一致，不符合就在同一個對話請它修正，或重新生成
6. 下載存檔（每次下載前 Claude 會先徵求同意）：
   - 靜態圖片 → `public/assets/dog/pet-journey/mixed/`
   - 散步圖片 → `public/assets/dog/walking/mixed/`

### 影片生成（VideoFX）
1. 開啟 https://labs.google/fx/tools/video-fx（VideoFX）
2. 用實驗室帳號登入
3. 依序貼上每個影片的 VideoFX 分鏡腳本
4. 生成後確認：
   - 犬種外觀（黑背棕腿白胸）在整支影片保持一致
   - 鏡頭為固定中景，沒有特寫或切換
   - 有音效與配樂
   - 畫面上沒有文字（除 arrival-transition 結尾的「歡迎回家」）
5. 下載存檔 → `public/assets/dog/pet-journey/mixed/`

### 生成完成後
更新 `app/components/life/LifeJourneyComponents.tsx`，讓程式碼根據選擇的品種切換素材子資料夾路徑（`shiba/` 或 `mixed/`）。
