globalThis.__nitro_main__ = import.meta.url;
import { a as toEventHandler, c as serve, i as defineLazyEventHandler, n as HTTPError, r as defineHandler, s as NodeResponse, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region node_modules/.pnpm/nitro@3.0.260610-beta_drizz_31df9aaace9c4c9df11a07b8d84c4e02/node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/file.svg": {
		"type": "image/svg+xml",
		"etag": "\"187-+zgO7/6H1QtZc4NmTAKYKWTQ0ow\"",
		"mtime": "2026-07-15T05:13:25.246Z",
		"size": 391,
		"path": "../public/file.svg"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"2c8-geBxqJCnEMLdObLLD/aK9EAfyXI\"",
		"mtime": "2026-07-15T05:13:25.239Z",
		"size": 712,
		"path": "../public/favicon.svg"
	},
	"/globe.svg": {
		"type": "image/svg+xml",
		"etag": "\"40b-LrojsBpGczu4Qj5tOOv19+lavsU\"",
		"mtime": "2026-07-15T05:13:25.251Z",
		"size": 1035,
		"path": "../public/globe.svg"
	},
	"/window.svg": {
		"type": "image/svg+xml",
		"etag": "\"181-VMSODapsqjF/4bTEGQB/2T6Ujbk\"",
		"mtime": "2026-07-15T05:13:25.278Z",
		"size": 385,
		"path": "../public/window.svg"
	},
	"/assets/index-CUqi-mzq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13b49-S+aaGj0aAQ05GqNqwm3KomdPcPU\"",
		"mtime": "2026-08-03T13:15:28.531Z",
		"size": 80713,
		"path": "../public/assets/index-CUqi-mzq.js"
	},
	"/assets/layout-segment-context-Ce5Z3XYL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"120-I4xIREmiYn83zfPAZKZ0Z5J/FpM\"",
		"mtime": "2026-08-03T13:15:28.532Z",
		"size": 288,
		"path": "../public/assets/layout-segment-context-Ce5Z3XYL.js"
	},
	"/assets/rolldown-runtime-S-ySWqyJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b6-wnqLLSlp3SaE+lbe74bKNe5Rpds\"",
		"mtime": "2026-08-03T13:15:28.533Z",
		"size": 694,
		"path": "../public/assets/rolldown-runtime-S-ySWqyJ.js"
	},
	"/assets/index-CXy_6fIs.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1c197-kXtXaEcf1pKCgHOXr6IIanj6gYE\"",
		"mtime": "2026-08-03T13:15:28.534Z",
		"size": 115095,
		"path": "../public/assets/index-CXy_6fIs.css"
	},
	"/assets/framework-CXnKph_e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e56d-yqm8KBIaXv+Y0pOthtGoU3MxBZg\"",
		"mtime": "2026-08-03T13:15:28.532Z",
		"size": 189805,
		"path": "../public/assets/framework-CXnKph_e.js"
	},
	"/car/外出籠.png": {
		"type": "image/png",
		"etag": "\"1f84f-mIQeeXVntOUQbbLtXfXxYyxqTmg\"",
		"mtime": "2026-07-21T06:21:27.988Z",
		"size": 129103,
		"path": "../public/car/外出籠.png"
	},
	"/assets/page-BT7RmOrj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15fd7-X4RPohVvYYEMKOM4ovwt21Fd0vM\"",
		"mtime": "2026-08-03T13:15:28.533Z",
		"size": 90071,
		"path": "../public/assets/page-BT7RmOrj.js"
	},
	"/car/尿墊.png": {
		"type": "image/png",
		"etag": "\"12b18-ia1a0cyNI6GqS3jBsS7ZB7q60Zc\"",
		"mtime": "2026-07-21T06:23:32.364Z",
		"size": 76568,
		"path": "../public/car/尿墊.png"
	},
	"/car/後車箱.png": {
		"type": "image/png",
		"etag": "\"698ac-uuJ/yYGkoBaM+UA71jCNbvC70+c\"",
		"mtime": "2026-07-22T05:27:00.744Z",
		"size": 432300,
		"path": "../public/car/後車箱.png"
	},
	"/car/牽繩.png": {
		"type": "image/png",
		"etag": "\"fa51-g2PVZsKoHQjoU7gz7bRBTFAvEnE\"",
		"mtime": "2026-07-21T06:23:05.878Z",
		"size": 64081,
		"path": "../public/car/牽繩.png"
	},
	"/car/玩具.png": {
		"type": "image/png",
		"etag": "\"c0f6-DH6+pQcS97ixe1LxXn1GN+L1BnI\"",
		"mtime": "2026-07-27T06:38:22.340Z",
		"size": 49398,
		"path": "../public/car/玩具.png"
	},
	"/car/文件.png": {
		"type": "image/png",
		"etag": "\"40bba-SkDdo61uaxecRjyNaUUiS0oq9/4\"",
		"mtime": "2026-07-27T06:40:50.169Z",
		"size": 265146,
		"path": "../public/car/文件.png"
	},
	"/room/小物品.png": {
		"type": "image/png",
		"etag": "\"89b3-AP7hQCMZrwJ/Kc7QBbKzEV7Uv4c\"",
		"mtime": "2026-07-21T06:25:37.438Z",
		"size": 35251,
		"path": "../public/room/小物品.png"
	},
	"/room/水.png": {
		"type": "image/png",
		"etag": "\"e813-ps/3EA5uw+CrU+9aboULvFHVge8\"",
		"mtime": "2026-07-21T06:19:26.431Z",
		"size": 59411,
		"path": "../public/room/水.png"
	},
	"/room/巧克力.png": {
		"type": "image/png",
		"etag": "\"d060-oj6hoIjmOuk0BXOgAxi5p4CAIck\"",
		"mtime": "2026-07-21T06:25:10.741Z",
		"size": 53344,
		"path": "../public/room/巧克力.png"
	},
	"/car/身分證件.png": {
		"type": "image/png",
		"etag": "\"40b7a-j+jrYl34bGXDz6NFkeEJKaR8CLw\"",
		"mtime": "2026-07-27T06:39:58.502Z",
		"size": 265082,
		"path": "../public/car/身分證件.png"
	},
	"/room/清潔劑.png": {
		"type": "image/png",
		"etag": "\"ad7f-zNgi+LgTgy998c/0xdYaJs5Srcg\"",
		"mtime": "2026-07-21T06:24:43.341Z",
		"size": 44415,
		"path": "../public/room/清潔劑.png"
	},
	"/room/尿墊.png": {
		"type": "image/png",
		"etag": "\"12b18-ia1a0cyNI6GqS3jBsS7ZB7q60Zc\"",
		"mtime": "2026-07-21T06:23:32.364Z",
		"size": 76568,
		"path": "../public/room/尿墊.png"
	},
	"/room/清潔用品.png": {
		"type": "image/png",
		"etag": "\"7fc7f-QWSEF3apbdBnGu5RWLfxm/s0IWE\"",
		"mtime": "2026-08-03T12:21:42.792Z",
		"size": 523391,
		"path": "../public/room/清潔用品.png"
	},
	"/room/牽繩.png": {
		"type": "image/png",
		"etag": "\"fa51-g2PVZsKoHQjoU7gz7bRBTFAvEnE\"",
		"mtime": "2026-07-21T06:23:05.878Z",
		"size": 64081,
		"path": "../public/room/牽繩.png"
	},
	"/room/狗碗.png": {
		"type": "image/png",
		"etag": "\"1217e-xUbGrGSJ6nM9e9GZv0rDOPXbT04\"",
		"mtime": "2026-07-21T06:19:06.443Z",
		"size": 74110,
		"path": "../public/room/狗碗.png"
	},
	"/room/玩具.png": {
		"type": "image/png",
		"etag": "\"c0f6-DH6+pQcS97ixe1LxXn1GN+L1BnI\"",
		"mtime": "2026-07-27T06:38:22.340Z",
		"size": 49398,
		"path": "../public/room/玩具.png"
	},
	"/room/睡墊.png": {
		"type": "image/png",
		"etag": "\"1f692-I+bt2gythr6t3JbYNhQk6w9Wvrk\"",
		"mtime": "2026-07-21T06:20:16.186Z",
		"size": 128658,
		"path": "../public/room/睡墊.png"
	},
	"/species/兔.png": {
		"type": "image/png",
		"etag": "\"4e3e-SL5iurh5uwbHlCaLZPk/jnHmips\"",
		"mtime": "2026-07-28T19:04:30.431Z",
		"size": 20030,
		"path": "../public/species/兔.png"
	},
	"/room/電線.png": {
		"type": "image/png",
		"etag": "\"10ee2-rpFnki9/lJcRjPzfMtAI/MC2Ao0\"",
		"mtime": "2026-07-21T06:24:12.686Z",
		"size": 69346,
		"path": "../public/room/電線.png"
	},
	"/species/爬蟲.png": {
		"type": "image/png",
		"etag": "\"66a4-My88tXVoCQpp4cW3SitrPjBzL5s\"",
		"mtime": "2026-07-28T19:05:13.812Z",
		"size": 26276,
		"path": "../public/species/爬蟲.png"
	},
	"/species/小型哺乳.png": {
		"type": "image/png",
		"etag": "\"8403-VPnALA1eu4rjbDIyOQNOGqLi/Xs\"",
		"mtime": "2026-07-28T19:05:32.748Z",
		"size": 33795,
		"path": "../public/species/小型哺乳.png"
	},
	"/species/犬.png": {
		"type": "image/png",
		"etag": "\"80a7-5Q4gj2TU1fEo3bsi094cfV7IueM\"",
		"mtime": "2026-07-28T19:03:54.510Z",
		"size": 32935,
		"path": "../public/species/犬.png"
	},
	"/species/貓.png": {
		"type": "image/png",
		"etag": "\"6c0d-kjvexoQUlLSlYxAjZ1B4nRTDfMM\"",
		"mtime": "2026-07-28T19:04:13.454Z",
		"size": 27661,
		"path": "../public/species/貓.png"
	},
	"/species/鳥.png": {
		"type": "image/png",
		"etag": "\"451f-0Td2R9efWaGzKWo/euk5Xn5OOiI\"",
		"mtime": "2026-07-28T19:04:51.759Z",
		"size": 17695,
		"path": "../public/species/鳥.png"
	},
	"/og.png": {
		"type": "image/png",
		"etag": "\"242572-VbSX8g94n6LAx27cu0Y/o5MWeEg\"",
		"mtime": "2026-07-15T05:13:25.273Z",
		"size": 2368882,
		"path": "../public/og.png"
	},
	"/walking-the-dog/拾便袋.png": {
		"type": "image/png",
		"etag": "\"abc8-w88z8sMJaOLoKmUoS5Rio9xfQV8\"",
		"mtime": "2026-08-03T11:13:56.998Z",
		"size": 43976,
		"path": "../public/walking-the-dog/拾便袋.png"
	},
	"/walking-the-dog/便便-真實.png": {
		"type": "image/png",
		"etag": "\"4f939-0YEHkWJmgVEgs+Y4pGhtt24Sc3Q\"",
		"mtime": "2026-08-03T11:14:05.908Z",
		"size": 325945,
		"path": "../public/walking-the-dog/便便-真實.png"
	},
	"/car/水.png": {
		"type": "image/png",
		"etag": "\"215e1d-Ki7p6SIILJWJMyFWnbWb+T87dWY\"",
		"mtime": "2026-07-27T20:00:13.754Z",
		"size": 2186781,
		"path": "../public/car/水.png"
	},
	"/room/飼料.png": {
		"type": "image/png",
		"etag": "\"880d7-hWiLdz/IMLPz8QA9BlW8mZ2Wz2c\"",
		"mtime": "2026-08-03T11:16:24.492Z",
		"size": 557271,
		"path": "../public/room/飼料.png"
	},
	"/room/空房間.png": {
		"type": "image/png",
		"etag": "\"f1db0-WPh64SeqYCQMxhXWcwmi8pbWMgk\"",
		"mtime": "2026-07-21T05:24:46.441Z",
		"size": 990640,
		"path": "../public/room/空房間.png"
	},
	"/assets/pet-journey/shiba-dog.png": {
		"type": "image/png",
		"etag": "\"1ac6f-n1Q4EN68v4x9IRBLuoeWxWaf5Fw\"",
		"mtime": "2026-08-03T11:18:37.585Z",
		"size": 109679,
		"path": "../public/assets/pet-journey/shiba-dog.png"
	},
	"/assets/pet-journey/waterbottle.png": {
		"type": "image/png",
		"etag": "\"3a03-FjZV6JvVaL+oUoS6Ob4fGopdTIE\"",
		"mtime": "2026-07-28T11:49:26.507Z",
		"size": 14851,
		"path": "../public/assets/pet-journey/waterbottle.png"
	},
	"/assets/pet-journey/夏威夷豆.png": {
		"type": "image/png",
		"etag": "\"10f39-0QFUN2RQyMZwmM8znYWzQy8yZdY\"",
		"mtime": "2026-08-03T11:18:26.972Z",
		"size": 69433,
		"path": "../public/assets/pet-journey/夏威夷豆.png"
	},
	"/assets/pet-journey/吃剩的骨頭.png": {
		"type": "image/png",
		"etag": "\"5a666-vo6YiJrefvLb/FxOt0G1veY5HrM\"",
		"mtime": "2026-08-03T11:18:25.491Z",
		"size": 370278,
		"path": "../public/assets/pet-journey/吃剩的骨頭.png"
	},
	"/room/門牌.png": {
		"type": "image/png",
		"etag": "\"21a69b-gYB9DL8y3ueMboYMYxOUoAkvN5g\"",
		"mtime": "2026-07-28T18:05:54.045Z",
		"size": 2205339,
		"path": "../public/room/門牌.png"
	},
	"/assets/pet-journey/柴犬不開心.png": {
		"type": "image/png",
		"etag": "\"19c36-yos9oFVdpkTQ4xkFOzlVmAgvG+E\"",
		"mtime": "2026-08-03T11:18:35.310Z",
		"size": 105526,
		"path": "../public/assets/pet-journey/柴犬不開心.png"
	},
	"/assets/pet-journey/空水碗.png": {
		"type": "image/png",
		"etag": "\"4014c-rhvx/ogi4c7cdiVC5wOu2KT1nUA\"",
		"mtime": "2026-07-28T12:18:08.045Z",
		"size": 262476,
		"path": "../public/assets/pet-journey/空水碗.png"
	},
	"/illustrations/prep-room.png": {
		"type": "image/png",
		"etag": "\"26d90f-AN+idVI+QskIM3mx2GRMCXfxWD0\"",
		"mtime": "2026-07-15T05:13:25.347Z",
		"size": 2545935,
		"path": "../public/illustrations/prep-room.png"
	},
	"/species/dog/吉娃娃.png": {
		"type": "image/png",
		"etag": "\"585b-fhyRajDLDh+rHhL7UTmQERla46U\"",
		"mtime": "2026-07-28T19:05:57.376Z",
		"size": 22619,
		"path": "../public/species/dog/吉娃娃.png"
	},
	"/assets/pet-journey/空飼料碗.png": {
		"type": "image/png",
		"etag": "\"38255-TUTK4i9nw0Wxx0kl5O1d571o5jA\"",
		"mtime": "2026-07-28T12:18:34.812Z",
		"size": 229973,
		"path": "../public/assets/pet-journey/空飼料碗.png"
	},
	"/species/dog/拉不拉多.png": {
		"type": "image/png",
		"etag": "\"7ccb-wy/iD93ZmdZtvGZlP6RGHqenrqQ\"",
		"mtime": "2026-07-28T19:07:29.498Z",
		"size": 31947,
		"path": "../public/species/dog/拉不拉多.png"
	},
	"/species/dog/柴犬.png": {
		"type": "image/png",
		"etag": "\"34fb0-ye79B46HiK1shmSLHOrtAmaZAMM\"",
		"mtime": "2026-08-03T11:07:13.763Z",
		"size": 217008,
		"path": "../public/species/dog/柴犬.png"
	},
	"/illustrations/hero-life-preview.png": {
		"type": "image/png",
		"etag": "\"22236c-9UrBu7Kj2eY1fpelO7J5gYsI2lA\"",
		"mtime": "2026-07-15T05:13:25.302Z",
		"size": 2237292,
		"path": "../public/illustrations/hero-life-preview.png"
	},
	"/assets/pet-journey/arrival-transition2.mp4": {
		"type": "video/mp4",
		"etag": "\"269969-+pm64P/+UessDBI9GcKOeldVZwY\"",
		"mtime": "2026-07-22T03:04:30.713Z",
		"size": 2529641,
		"path": "../public/assets/pet-journey/arrival-transition2.mp4"
	},
	"/illustrations/lifetime-costs.png": {
		"type": "image/png",
		"etag": "\"285acf-FnBZgMbXL3IGwSOJbWD9paB1Csc\"",
		"mtime": "2026-07-15T05:13:25.326Z",
		"size": 2644687,
		"path": "../public/illustrations/lifetime-costs.png"
	},
	"/illustrations/scenario-grid.png": {
		"type": "image/png",
		"etag": "\"28b0e3-b+LBUdrykjpn0vUDH/CYzNVUFCU\"",
		"mtime": "2026-07-15T05:13:25.372Z",
		"size": 2666723,
		"path": "../public/illustrations/scenario-grid.png"
	},
	"/assets/pet-journey/arrival-transition.mp4": {
		"type": "video/mp4",
		"etag": "\"26f4a7-5L+XuD8S/JKIgAAtUp0ic9Eyvfg\"",
		"mtime": "2026-07-27T05:23:56.420Z",
		"size": 2552999,
		"path": "../public/assets/pet-journey/arrival-transition.mp4"
	},
	"/assets/pet-journey/barking.mp4": {
		"type": "video/mp4",
		"etag": "\"254dd3-BTQNtVzKGp1wKxemlFneigWBzE4\"",
		"mtime": "2026-08-03T12:21:54.945Z",
		"size": 2444755,
		"path": "../public/assets/pet-journey/barking.mp4"
	},
	"/assets/pet-journey/correct-answer.mp4": {
		"type": "video/mp4",
		"etag": "\"1636db-5bxneMxzpYxlnS65wy7PmTnAU58\"",
		"mtime": "2026-07-28T13:35:19.459Z",
		"size": 1455835,
		"path": "../public/assets/pet-journey/correct-answer.mp4"
	},
	"/assets/pet-journey/sick.mp4": {
		"type": "video/mp4",
		"etag": "\"188c9f-fcDf1qj14gQQ0UiEXncjUG3p7j8\"",
		"mtime": "2026-07-28T13:42:15.222Z",
		"size": 1608863,
		"path": "../public/assets/pet-journey/sick.mp4"
	},
	"/assets/pet-journey/first-day.mp4": {
		"type": "video/mp4",
		"etag": "\"25f328-cLo3jI351vX1hW1q9zstC0ql05I\"",
		"mtime": "2026-07-28T05:28:42.647Z",
		"size": 2487080,
		"path": "../public/assets/pet-journey/first-day.mp4"
	},
	"/assets/pet-journey/chewing-on-things.mp4": {
		"type": "video/mp4",
		"etag": "\"26acc9-UROgwX5clzFgr7Jr6P6EaiB9T3I\"",
		"mtime": "2026-07-28T05:28:57.631Z",
		"size": 2534601,
		"path": "../public/assets/pet-journey/chewing-on-things.mp4"
	},
	"/species/dog/貴賓犬.png": {
		"type": "image/png",
		"etag": "\"6be5-s4qk06FWkeLl1ojAuUvCDjtBwOA\"",
		"mtime": "2026-07-28T19:06:19.013Z",
		"size": 27621,
		"path": "../public/species/dog/貴賓犬.png"
	},
	"/species/dog/邊境牧羊犬.png": {
		"type": "image/png",
		"etag": "\"8dab-XIGDPwOGyDQ9+ahpo0wtA59F+Cc\"",
		"mtime": "2026-07-28T19:07:07.017Z",
		"size": 36267,
		"path": "../public/species/dog/邊境牧羊犬.png"
	},
	"/assets/pet-journey/time passes_old.mp4": {
		"type": "video/mp4",
		"etag": "\"254c23-ahH75tc2EmYuSWcHUrG0qYQT26Y\"",
		"mtime": "2026-07-28T13:42:30.797Z",
		"size": 2444323,
		"path": "../public/assets/pet-journey/time passes_old.mp4"
	},
	"/assets/pet-journey/Urinate-and-defecate-at-will.mp4": {
		"type": "video/mp4",
		"etag": "\"22c546-rrzczsPWzd12AjoycKRiwLTk0/4\"",
		"mtime": "2026-08-03T12:21:56.532Z",
		"size": 2278726,
		"path": "../public/assets/pet-journey/Urinate-and-defecate-at-will.mp4"
	},
	"/assets/pet-journey/time passes.mp4": {
		"type": "video/mp4",
		"etag": "\"28704d-G2s5ro9LbSUUc/p82pN2nHaI29Q\"",
		"mtime": "2026-07-28T18:52:48.069Z",
		"size": 2650189,
		"path": "../public/assets/pet-journey/time passes.mp4"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260610-beta_drizz_31df9aaace9c4c9df11a07b8d84c4e02/node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_qfXAjA = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_qfXAjA
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260610-beta_drizz_31df9aaace9c4c9df11a07b8d84c4e02/node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260610-beta_drizz_31df9aaace9c4c9df11a07b8d84c4e02/node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260610-beta_drizz_31df9aaace9c4c9df11a07b8d84c4e02/node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260610-beta_drizz_31df9aaace9c4c9df11a07b8d84c4e02/node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
