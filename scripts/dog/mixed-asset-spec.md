# 米克斯（混種犬）素材生成規格

> Pre-Pet Assessment — 米克斯專屬素材  
> 生成工具：Gemini（圖片）、VideoFX（影片）  
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
- **風格關鍵字**：`cartoon animation style, bold black outlines, flat colors, minimal shading, warm pastel background tones, child-friendly, smooth simple motion`
- 統一為 A 風格的動畫版本

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

**Gemini 提示詞（英文）**：
```
A medium-sized mixed-breed dog with black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, and a long slightly curled tail. The dog is sitting upright, looking forward with a happy relaxed expression, mouth slightly open with tongue out. Cartoon illustration style, bold black outlines, flat colors with minimal shading, transparent background, full body visible, square format, child-friendly, no text.
```

---

### 2. `mixed-sad.png` — 難過/生病狀態

**用途**：生病情境、第一天情境（答錯時）

**Gemini 提示詞（英文）**：
```
A medium-sized mixed-breed dog with black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, and a long slightly curled tail. The dog is sitting with droopy posture, ears slightly flattened, eyes half-closed and sad-looking, looking downward. Cartoon illustration style, bold black outlines, flat colors with minimal shading, transparent background, full body visible, square format, child-friendly, no text.
```

---

### 3. `mixed-hungry.png` — 等待/餓了狀態

**用途**：飼主忙碌時狗狗在旁等待的畫面  
**構圖**：橫向，狗俯趴在地，旁邊有空碗（參考 shiba-hungry.png 構圖）

**Gemini 提示詞（英文）**：
```
A medium-sized mixed-breed dog with black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, and a long slightly curled tail. The dog is lying down with front paws stretched forward, staring at an empty food bowl with big sad eyes. Cartoon illustration style, bold black outlines, flat colors with minimal shading, transparent background, horizontal composition, child-friendly, no text.
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

**Gemini 提示詞（英文）**：
```
A young woman with brown hair in a ponytail, wearing a pink sweatshirt, blue jeans, and white sneakers, walking a medium-sized mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) on a red leash along a sidewalk. Trees and a street in the background. Side view, full scene horizontal composition. Anime illustration style, soft watercolor background, semi-realistic proportions, warm natural colors, no text.
```

---

### 5. `off-leash-choice.png` — 無牽繩散步

**參考**：`walking/shiba/off-leash-choice.png`  
**構圖**：飼主在後方走，米克斯在前方較遠處不戴牽繩，飼主望向狗的方向，相同人行道場景

**Gemini 提示詞（英文）**：
```
A young woman with brown hair in a ponytail, wearing a pink sweatshirt, blue jeans, and white sneakers, walking along a sidewalk while a medium-sized mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) walks ahead without a leash. The woman is looking toward the dog in the distance. Trees and street in the background. Side view, full scene horizontal composition. Anime illustration style, soft watercolor background, semi-realistic proportions, warm natural colors, no text.
```

---

### 6. `walker-and-dog-poop.png` — 排泄行為（公園）

**參考**：`walking/shiba/walker-and-dog-poop.png`  
**構圖**：公園背景，米克斯剛排泄（地上有糞便），飼主在旁，有樹木公園場景，cutout 或半透明背景

**Gemini 提示詞（英文）**：
```
A young woman with brown hair in a ponytail, wearing a pink sweatshirt, blue jeans, and white sneakers, walking a medium-sized mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) in a park. The dog has just defecated (small pile visible on ground). Trees and park background. Side or three-quarter view. Anime illustration style, soft watercolor background, semi-realistic proportions, warm natural colors, no text. Tasteful depiction.
```

---

### 7. `walker-and-dog.png` — 飼主與狗同行（人物cutout）

**參考**：`walking/shiba/walker-and-dog.png`  
**構圖**：飼主與米克斯並肩同行，transparent/white 背景，人物剪影風格

**Gemini 提示詞（英文）**：
```
A young woman with brown hair in a ponytail, wearing a pink sweatshirt, blue jeans, and white sneakers, walking side by side with a medium-sized mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) on a leash. Transparent or plain white background. Cutout character style, side view, full body both characters. Anime illustration style, semi-realistic proportions, clean lines, no text.
```

---

### 8. `walker-dog-bag.png` — 飼主提糞便袋（人物cutout）

**參考**：`walking/shiba/walker-dog-bag.png`  
**構圖**：飼主左手提著綠色糞便袋，右手牽米克斯，transparent/white 背景，人物剪影風格

**Gemini 提示詞（英文）**：
```
A young woman with brown hair in a ponytail, wearing a pink sweatshirt, blue jeans, and white sneakers, holding a green poop bag in her left hand while holding a leash in her right hand. A medium-sized mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) walks beside her. Transparent or plain white background. Cutout character style, side view, full body both characters. Anime illustration style, semi-realistic proportions, clean lines, no text.
```

---

## 🎬 影片素材（14 支）

> **所有影片提示詞必須加入以下固定語句：**
> - 犬種：`a mixed-breed dog with black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, and a long slightly curled tail`
> - 鏡頭：`fixed focal length, medium shot throughout, no close-ups, no camera cuts or switches`
> - 聲音：`include realistic sound effects and background music`
> - 無文字：`no text or subtitles on screen`
> - 動物行為：`animals behave realistically based on natural instincts, not anthropomorphized`
> - 畫風：`cartoon animation style, bold black outlines, flat colors, minimal shading, warm pastel background tones, child-friendly, smooth simple motion`

---

### 過場動畫

#### `arrival-transition.mp4` — 接回家過場
**時長**：5–8 秒  
**遊戲情境**：玩家選完品種後，過場動畫播放，帶入第一天情境  
**場景描述**：飼主從收容所帶走米克斯 → 坐車回家 → 在新家放開狗 → 最後畫面出現「歡迎回家」

**VideoFX 分鏡腳本**：
```
Scene sequence — fixed medium shot throughout, no camera cuts or switches, no close-ups:

Shot 1 (2s): Indoor setting resembling an animal shelter — simple kennels or cages in the background, warm but plain interior. A young woman (brown hair in a ponytail, pink sweatshirt, blue jeans, white sneakers) kneels down near a mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail). The dog sniffs her cautiously.

Shot 2 (1-2s): The same woman and dog are seen through a car window, riding home. The dog sits in the backseat looking out the window with curious alert eyes. Natural scenery passes by outside.

Shot 3 (1-2s): Interior of a new, cozy home living room. The woman sets the dog down gently. The dog steps forward slowly, sniffing the floor and looking around cautiously at the unfamiliar space.

Final frame (1s): The screen shows the Chinese text "歡迎回家" in warm, friendly font on a soft background. This is the ONLY text in the entire video.

Cartoon animation style, bold black outlines, flat colors, minimal shading, warm pastel tones, child-friendly, smooth simple motion. Fixed focal length, medium shot throughout, no close-ups, no camera cuts. Include ambient background music and subtle sound effects (car sounds, door sound, soft paw steps). Animals behave realistically based on natural instincts, not anthropomorphized.
```

---

#### `busy-day-transition.mp4` — 忙碌生活過場（飼主視角）
**時長**：5–8 秒  
**遊戲情境**：「疲憊忙碌的日子」情境題的過場，從飼主視角帶入  
**場景描述**：早上匆忙出門、白天工作、夜晚疲憊回家；米克斯在門邊等待

**VideoFX 分鏡腳本**：
```
Scene: First-person perspective (owner's viewpoint). Fixed focal length, medium shot, no camera cuts or switches, no close-ups.

Shot 1 (2s): Hands of a young woman (pink sweatshirt visible at wrist) grabbing keys and a bag, rushing out the front door in the morning.
Shot 2 (2s): View of a desk with papers and a computer, hands typing — busy working.
Shot 3 (2-3s): Front door opens at night; a mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) is sitting by the door. The dog's tail wags once or twice, then settles — reacting naturally to the returning owner, not performing a dramatic greeting.

Cartoon animation style, bold black outlines, flat colors, warm lighting, child-friendly. Include background music and subtle sound effects (keys, door opening). No text or subtitles on screen. Animals behave realistically, not anthropomorphized.
```

---

#### `time-passes-aging.mp4` — 老化過場
**時長**：5–8 秒  
**遊戲情境**：「逐漸進入高齡」階段的過場  
**場景描述**：米克斯從活潑的成犬逐漸變成老犬，鬍鬚/眼眶周圍慢慢出現白毛，動作變慢

**VideoFX 分鏡腳本**：
```
Scene: A warm indoor room. Fixed focal length, medium shot, no camera cuts or switches, no close-ups.

A mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) is shown in two moments: first as a healthy energetic adult dog, moving around the room; then slowly transitioning (soft visual dissolve effect) to an older version of the same dog — muzzle turning grey, movement slower, resting on a cozy dog bed in a sunny corner. The dog moves naturally, no human-like behaviors.

A subtle falling leaves or page-flip visual effect to imply time passing.

Cartoon animation style, bold black outlines, flat colors, warm tones, child-friendly. Include background music that shifts from lively to gentle. No text on screen. Animals behave realistically, not anthropomorphized.
```

---

### 做的很好動畫

#### `correct-answer.mp4` — 答對反應 1
**時長**：3–5 秒  
**遊戲情境**：玩家選到正確答案時播放  
**場景描述**：米克斯開心跳起來，周圍出現星星/閃光，尾巴搖擺

**VideoFX 分鏡腳本**：
```
A mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) jumps up briefly with front paws raised — a natural excited dog behavior, not a human pose. Tail wags quickly. Sparkles and small stars burst around the dog. The dog lands and sits down calmly.

Fixed focal length, medium shot, no close-ups, no camera cuts. Cartoon animation style, bold outlines, bright cheerful colors, white or light background, child-friendly. Include upbeat sound effect. No text on screen. Animals behave realistically, not anthropomorphized.
```

---

#### `correct-answer2.mp4` — 答對反應 2
**時長**：3–5 秒  
**遊戲情境**：玩家選到正確答案時（第二種動畫）  
**場景描述**：米克斯轉一圈後坐下，表情放鬆滿足

**VideoFX 分鏡腳本**：
```
A mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) does a quick spin in place — a natural excited dog circling movement — then sits down and looks forward with a calm satisfied expression. Small hearts or stars pop around it.

Fixed focal length, medium shot, no close-ups, no camera cuts. Cartoon animation style, bold outlines, bright cheerful colors, white or light background, child-friendly. Include cheerful sound effect. No text on screen. Animals behave realistically, not anthropomorphized.
```

---

### 日常照護題目影片

#### `first-day.mp4` — 第一天適應新家
**時長**：5–8 秒  
**遊戲情境**：題目「第一天適應新家」——豆豆剛到新家，躲在外出籠旁觀察，家人很想靠近牠  
**場景描述**：米克斯縮在外出籠旁邊，四肢緊縮，眼神警覺地觀察環境；背景是陌生的客廳

**VideoFX 分鏡腳本**：
```
Scene: A cartoon living room, unfamiliar to the dog. Fixed focal length, medium shot, no close-ups, no camera cuts.

A mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) is crouched down next to a pet carrier, looking around with wide alert eyes. Its body is low to the ground, ears slightly pulled back — natural fearful body posture in an unfamiliar place. A human hand (belonging to a young woman in a pink sweatshirt) slowly reaches toward the dog from the side. The dog instinctively retreats closer to the carrier without making eye contact.

Cartoon animation style, bold outlines, flat colors, child-friendly. Include ambient indoor sounds and soft background music. No text on screen. Animals behave realistically based on natural fear response, not anthropomorphized.
```

---

#### `barking.mp4` — 吠叫行為
**時長**：5–8 秒  
**遊戲情境**：題目「牠一直吠叫，該怎麼辦？」——晚上小狗對門口吠叫，對外面的聲音有警覺反應  
**場景描述**：夜晚室內，米克斯對著門口吠叫，耳朵豎立，身體前傾，表情警覺

**VideoFX 分鏡腳本**：
```
Scene: A cartoon home interior at night, dim lighting, front door visible. Fixed focal length, medium shot, no close-ups, no camera cuts.

A mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) stands facing the front door, barking repeatedly — natural alert dog behavior triggered by sound outside. Body is tense, weight shifted forward, ears perked. The dog briefly glances back toward the interior of the room, then returns focus to the door.

Cartoon animation style, bold outlines, flat colors, child-friendly. Include barking sound effect and muffled sounds from outside. No text on screen. Animals behave realistically, not anthropomorphized.
```

---

#### `chewing-on-things.mp4` — 啃咬行為
**時長**：5–8 秒  
**遊戲情境**：題目「牠開始亂咬東西，該怎麼辦？」——發現小狗正在咬桌腳旁的物品  
**場景描述**：米克斯咬著鞋子，被人發現後轉頭，停止咬東西

**VideoFX 分鏡腳本**：
```
Scene: A cartoon living room, items scattered on the floor. Fixed focal length, medium shot, no close-ups, no camera cuts.

A mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) is chewing on a shoe near the table leg — natural teething/chewing behavior. The dog suddenly stops and looks up (reacting to a sound or presence), drops the shoe, and sits still with a cautious expression — not exaggerated guilt, just a natural pause in behavior.

Cartoon animation style, bold outlines, flat colors, child-friendly. Include chewing sound effect and then sudden quiet. No text on screen. Animals behave realistically, not anthropomorphized.
```

---

#### `urinate-and-defecate.mp4` — 在錯誤地點排泄
**時長**：5–8 秒  
**遊戲情境**：題目「牠在不適合的地方大小便，該怎麼辦？」——小狗還沒建立如廁習慣，在不適合的地方排泄  
**場景描述**：米克斯在客廳地板角落排泄，表情自然不帶惡意；旁邊沒有尿布墊

**VideoFX 分鏡腳本**：
```
Scene: A cartoon living room with no training pads visible. Fixed focal length, medium shot, no close-ups, no camera cuts.

A mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) sniffs the floor near a corner, circles once (natural pre-urination behavior), then squats and urinates on the floor — shown tastefully from the side, with a small puddle graphic. The dog's expression is neutral and natural — not guilty, not aware this is wrong. No training pad nearby.

Cartoon animation style, bold outlines, flat colors, tasteful depiction, child-friendly. Include subtle indoor ambient sound. No text on screen. Animals behave realistically based on natural instincts, not anthropomorphized.
```

---

### 生命階段（生活變化）題目影片

#### `busy-daily-care.mp4` — 忙碌時寵物等待（寵物視角）
**時長**：5–8 秒  
**遊戲情境**：題目「疲憊忙碌的日子」——飼主臨時加班未歸，狗狗一人等待；寵物視角  
**場景描述**：米克斯坐在門邊等待飼主回家，偶爾看看牆上的時鐘

**VideoFX 分鏡腳本**：
```
Scene: A cartoon home interior, front door and a clock on the wall visible. Fixed focal length, medium shot, no close-ups, no camera cuts.

A mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) is sitting or lying by the front door. It occasionally shifts its gaze to the clock. Its body posture is naturally relaxed but slightly droopy from waiting — no exaggerated human-like emotion. The dog puts its chin down on its paws. The clock hands visually indicate time passing.

Cartoon animation style, bold outlines, flat colors, quiet subdued mood, child-friendly. Include soft ambient sound (quiet room, distant city). No text on screen. Animals behave realistically, not anthropomorphized.
```

---

#### `sick.mp4` — 生病情境（米克斯：口腔/外寄生蟲問題）
**時長**：5–8 秒  
**遊戲情境**：題目「米克斯常見健康問題觀察」——發現 {petName} 吃東西動作遲疑、嘴巴有異味；身上有跳蚤、不停抓癢  
**場景描述**：米克斯靠近食碗時動作猶豫，用爪子撥嘴邊；再切到後腿不停抓肚子

**VideoFX 分鏡腳本**：
```
Scene: A cartoon home interior, food bowl on the floor. Fixed focal length, medium shot, no close-ups, no camera cuts.

A mixed-breed dog (black dorsal coat, tan/brown cheeks and legs, small white chest patch, erect triangular ears, long slightly curled tail) approaches its food bowl slowly and hesitantly — sniffs the food but does not eat. The dog uses a front paw to touch near its mouth (natural oral discomfort behavior). Then the dog pauses and scratches its belly and neck with its hind leg repeatedly (natural flea-scratching behavior). Small itch-line graphics may appear near the scratched areas.

Cartoon animation style, bold outlines, flat colors, child-friendly. Include ambient indoor sounds. No text on screen. Animals behave realistically based on natural discomfort responses, not anthropomorphized.
```

---

#### `senior-life.mp4` — 高齡生活
**時長**：5–8 秒  
**遊戲情境**：題目「高齡後的照顧準備」——小狗走路變慢，後腳偶爾使不上力，曾經輕鬆走完的路需要停下休息  
**場景描述**：老年米克斯（鬍鬚/眼周有白毛）慢慢走路，在一半時停下來，飼主溫柔陪伴牠曬太陽

**VideoFX 分鏡腳本**：
```
Scene: A sunny outdoor path or warm indoor room. Fixed focal length, medium shot, no close-ups, no camera cuts.

An older mixed-breed dog (black dorsal coat with grey around the muzzle and eyes, tan/brown cheeks and legs, small white chest patch, erect ears, long slightly curled tail) walks slowly across the scene. The dog pauses midway, back legs slightly unsteady — natural age-related gait. A hand belonging to a young woman (pink sweatshirt visible) gently pets the dog. The dog settles down on a cozy mat in a warm patch of sunlight.

Cartoon animation style, bold outlines, flat colors, warm gentle mood, child-friendly. Include soft gentle background music. No text on screen. Animals behave realistically, not anthropomorphized.
```

---

### 品種考驗題目影片

#### `breed-size.mp4` — 成犬體型無法預測
**時長**：5–8 秒  
**遊戲情境**：題目「成犬體型，無法從幼犬外表預測」——朋友說「這麼小，長大應該也不大」；實際上成犬體型無法預測  
**場景描述**：可愛的米克斯幼犬長大後，比預期的還要大，飼主看著牠

**VideoFX 分鏡腳本**：
```
Scene: A cartoon home interior. Fixed focal length, medium shot, no close-ups, no camera cuts.

Shot 1 (2-3s): A small, fluffy mixed-breed puppy (same black and tan coloring, small body) sits near a young woman (brown hair in a ponytail, pink sweatshirt, blue jeans, white sneakers). The puppy fits easily next to her feet.

Shot 2 (2-3s): A visual transition (soft fade or page flip). The same dog, now a large fully-grown adult (unexpectedly big), sits next to the same woman who looks at it with a naturally surprised, wide-eyed expression.

Both dogs have the same black-back, tan-legs coloring, just at very different sizes.

Cartoon animation style, bold outlines, flat colors, warm humorous tone, child-friendly. Include transition sound effect and light background music. No text on screen. Animals behave realistically, not anthropomorphized.
```

---

#### `breed-individual.mp4` — 米克斯個體差異
**時長**：5–8 秒  
**遊戲情境**：題目「米克斯和純種犬不一樣的地方」——每隻米克斯的個性都是獨特的，需要花時間認識牠本身  
**場景描述**：三隻外觀各異的米克斯並排，各自表現出不同的自然行為；旁邊是一本狗狗品種圖鑑，書上沒有對應說明

**VideoFX 分鏡腳本**：
```
Scene: A clean cartoon background. Fixed focal length, medium shot, no close-ups, no camera cuts.

Three different mixed-breed dogs stand side by side, each with distinctly different coat patterns, ear shapes, and sizes (one small with floppy ears, one medium with erect ears and black-tan coat, one large with patchy colors). Each dog displays different natural behavior: one stays still and cautious, one shifts and looks around, one lies down calmly. A cartoon book labeled "品種圖鑑" appears on the side with a question mark page for all three. Dogs behave according to natural temperament differences, not human-like personality acts.

Cartoon animation style, bold outlines, flat colors, playful warm mood, child-friendly. Include light background music. No text on screen except "品種圖鑑" on the book cover. Animals behave realistically, not anthropomorphized.
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

### 圖片生成（Gemini）
1. 開啟 https://gemini.google.com（或 ImageFX：https://labs.google/fx/tools/image-fx）
2. 用實驗室帳號登入
3. 依序貼上每個圖片的英文提示詞
4. 生成後確認外觀（犬種毛色、人物服裝）與畫風是否一致，不符合再重新生成
5. 下載存檔：
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
