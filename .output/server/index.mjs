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
	"/globe.svg": {
		"type": "image/svg+xml",
		"etag": "\"40b-LrojsBpGczu4Qj5tOOv19+lavsU\"",
		"mtime": "2026-07-15T05:13:25.251Z",
		"size": 1035,
		"path": "../public/globe.svg"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"2c8-geBxqJCnEMLdObLLD/aK9EAfyXI\"",
		"mtime": "2026-07-15T05:13:25.239Z",
		"size": 712,
		"path": "../public/favicon.svg"
	},
	"/assets/framework-CXnKph_e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e56d-yqm8KBIaXv+Y0pOthtGoU3MxBZg\"",
		"mtime": "2026-08-21T13:22:21.612Z",
		"size": 189805,
		"path": "../public/assets/framework-CXnKph_e.js"
	},
	"/assets/layout-segment-context-CVpqx3Up.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"120-hrZpInig/qsqVHdc0D6raFBhRZc\"",
		"mtime": "2026-08-21T13:22:21.613Z",
		"size": 288,
		"path": "../public/assets/layout-segment-context-CVpqx3Up.js"
	},
	"/assets/index-Ds1aD3QM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13cd5-o4kDk5lRYb5/h3Ct6A2IWAuWf28\"",
		"mtime": "2026-08-21T13:22:21.611Z",
		"size": 81109,
		"path": "../public/assets/index-Ds1aD3QM.js"
	},
	"/assets/page-V1978g30.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ec5-h/z3gpdtoNT08qJ41rZgERUPTrA\"",
		"mtime": "2026-08-21T13:22:21.614Z",
		"size": 16069,
		"path": "../public/assets/page-V1978g30.js"
	},
	"/assets/query-BbOc3VB2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"61c-p7L/4X+NUVucLmRLkWmMCsa1mVM\"",
		"mtime": "2026-08-21T13:22:21.615Z",
		"size": 1564,
		"path": "../public/assets/query-BbOc3VB2.js"
	},
	"/assets/rolldown-runtime-S-ySWqyJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b6-wnqLLSlp3SaE+lbe74bKNe5Rpds\"",
		"mtime": "2026-08-21T13:22:21.615Z",
		"size": 694,
		"path": "../public/assets/rolldown-runtime-S-ySWqyJ.js"
	},
	"/window.svg": {
		"type": "image/svg+xml",
		"etag": "\"181-VMSODapsqjF/4bTEGQB/2T6Ujbk\"",
		"mtime": "2026-07-15T05:13:25.278Z",
		"size": 385,
		"path": "../public/window.svg"
	},
	"/assets/router-B3rLJX7B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2369-VqGCqkEkeG9CKRGsanFx7Z7pzUQ\"",
		"mtime": "2026-08-21T13:22:21.616Z",
		"size": 9065,
		"path": "../public/assets/router-B3rLJX7B.js"
	},
	"/assets/index-fd5C2Lrn.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"37d12-T7ka2wej5cNl9T2fvQ829Hs+rsA\"",
		"mtime": "2026-08-21T13:22:21.617Z",
		"size": 228626,
		"path": "../public/assets/index-fd5C2Lrn.css"
	},
	"/assets/acquisition/paws-life-village.jpg": {
		"type": "image/jpeg",
		"etag": "\"1be5-VnluD61e9nq9locLZ872cvn+RAE\"",
		"mtime": "2026-08-14T03:34:18.907Z",
		"size": 7141,
		"path": "../public/assets/acquisition/paws-life-village.jpg"
	},
	"/assets/page-BQWJfVw2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29b5a-MvhazWD+Z865PpMXwdEFO6D5g1g\"",
		"mtime": "2026-08-21T13:22:21.613Z",
		"size": 170842,
		"path": "../public/assets/page-BQWJfVw2.js"
	},
	"/assets/pet-journey/empty-food-bowl.png": {
		"type": "image/png",
		"etag": "\"38255-TUTK4i9nw0Wxx0kl5O1d571o5jA\"",
		"mtime": "2026-07-28T12:18:34.812Z",
		"size": 229973,
		"path": "../public/assets/pet-journey/empty-food-bowl.png"
	},
	"/assets/pet-journey/empty-water-bowl.png": {
		"type": "image/png",
		"etag": "\"4014c-rhvx/ogi4c7cdiVC5wOu2KT1nUA\"",
		"mtime": "2026-07-28T12:18:08.045Z",
		"size": 262476,
		"path": "../public/assets/pet-journey/empty-water-bowl.png"
	},
	"/assets/pet-journey/correct-answer2.mp4": {
		"type": "video/mp4",
		"etag": "\"f974c-nTEpExPWNCJXfsKpMmgwUtMX+5o\"",
		"mtime": "2026-08-10T02:41:18.101Z",
		"size": 1021772,
		"path": "../public/assets/pet-journey/correct-answer2.mp4"
	},
	"/assets/pet-journey/leftover-bones.png": {
		"type": "image/png",
		"etag": "\"5a666-vo6YiJrefvLb/FxOt0G1veY5HrM\"",
		"mtime": "2026-08-03T11:18:25.491Z",
		"size": 370278,
		"path": "../public/assets/pet-journey/leftover-bones.png"
	},
	"/assets/pet-journey/macadamia-nuts.png": {
		"type": "image/png",
		"etag": "\"10f39-0QFUN2RQyMZwmM8znYWzQy8yZdY\"",
		"mtime": "2026-08-03T11:18:26.972Z",
		"size": 69433,
		"path": "../public/assets/pet-journey/macadamia-nuts.png"
	},
	"/assets/pet-journey/shiba-dog.png": {
		"type": "image/png",
		"etag": "\"16652-XM95ekIQ/im3FUL/5ywmgNlbhHo\"",
		"mtime": "2026-08-12T02:14:16.647Z",
		"size": 91730,
		"path": "../public/assets/pet-journey/shiba-dog.png"
	},
	"/assets/pet-journey/shiba-hungry.png": {
		"type": "image/png",
		"etag": "\"6e9a5-GxoO2eK6WgmQ8tWwT7yJNoN7kB0\"",
		"mtime": "2026-08-03T16:37:35.234Z",
		"size": 453029,
		"path": "../public/assets/pet-journey/shiba-hungry.png"
	},
	"/assets/pet-journey/shiba-sad.png": {
		"type": "image/png",
		"etag": "\"19c36-yos9oFVdpkTQ4xkFOzlVmAgvG+E\"",
		"mtime": "2026-08-03T11:18:35.310Z",
		"size": 105526,
		"path": "../public/assets/pet-journey/shiba-sad.png"
	},
	"/assets/pet-journey/waterbottle.png": {
		"type": "image/png",
		"etag": "\"3a03-FjZV6JvVaL+oUoS6Ob4fGopdTIE\"",
		"mtime": "2026-07-28T11:49:26.507Z",
		"size": 14851,
		"path": "../public/assets/pet-journey/waterbottle.png"
	},
	"/assets/car/car-trunk.png": {
		"type": "image/png",
		"etag": "\"698ac-uuJ/yYGkoBaM+UA71jCNbvC70+c\"",
		"mtime": "2026-07-22T05:27:00.744Z",
		"size": 432300,
		"path": "../public/assets/car/car-trunk.png"
	},
	"/assets/car/carrier.png": {
		"type": "image/png",
		"etag": "\"1f84f-mIQeeXVntOUQbbLtXfXxYyxqTmg\"",
		"mtime": "2026-07-21T06:21:27.988Z",
		"size": 129103,
		"path": "../public/assets/car/carrier.png"
	},
	"/assets/car/adoption-documents.png": {
		"type": "image/png",
		"etag": "\"40bba-SkDdo61uaxecRjyNaUUiS0oq9/4\"",
		"mtime": "2026-07-27T06:40:50.169Z",
		"size": 265146,
		"path": "../public/assets/car/adoption-documents.png"
	},
	"/og.png": {
		"type": "image/png",
		"etag": "\"242572-VbSX8g94n6LAx27cu0Y/o5MWeEg\"",
		"mtime": "2026-07-15T05:13:25.273Z",
		"size": 2368882,
		"path": "../public/og.png"
	},
	"/assets/pet-journey/barking.mp4": {
		"type": "video/mp4",
		"etag": "\"25f7c1-54rt3u0Nx504HbmxW4onFc4aZGs\"",
		"mtime": "2026-08-03T16:32:42.503Z",
		"size": 2488257,
		"path": "../public/assets/pet-journey/barking.mp4"
	},
	"/assets/pet-journey/busy-daily-care.mp4": {
		"type": "video/mp4",
		"etag": "\"272f32-zAclzXDYPbRGc0qKBS/IXiPnGw4\"",
		"mtime": "2026-08-17T01:15:54.995Z",
		"size": 2567986,
		"path": "../public/assets/pet-journey/busy-daily-care.mp4"
	},
	"/assets/pet-journey/correct-answer.mp4": {
		"type": "video/mp4",
		"etag": "\"2571df-kc9x7OxMYo0l6TtmAzfpzZARaDs\"",
		"mtime": "2026-08-03T16:34:12.827Z",
		"size": 2453983,
		"path": "../public/assets/pet-journey/correct-answer.mp4"
	},
	"/assets/car/id-card.png": {
		"type": "image/png",
		"etag": "\"40b7a-j+jrYl34bGXDz6NFkeEJKaR8CLw\"",
		"mtime": "2026-07-27T06:39:58.502Z",
		"size": 265082,
		"path": "../public/assets/car/id-card.png"
	},
	"/assets/pet-journey/chewing-on-things.mp4": {
		"type": "video/mp4",
		"etag": "\"254dd3-BTQNtVzKGp1wKxemlFneigWBzE4\"",
		"mtime": "2026-08-03T12:21:54.945Z",
		"size": 2444755,
		"path": "../public/assets/pet-journey/chewing-on-things.mp4"
	},
	"/assets/car/leash.png": {
		"type": "image/png",
		"etag": "\"fa51-g2PVZsKoHQjoU7gz7bRBTFAvEnE\"",
		"mtime": "2026-07-21T06:23:05.878Z",
		"size": 64081,
		"path": "../public/assets/car/leash.png"
	},
	"/assets/car/pee-pad.png": {
		"type": "image/png",
		"etag": "\"12b18-ia1a0cyNI6GqS3jBsS7ZB7q60Zc\"",
		"mtime": "2026-07-21T06:23:32.364Z",
		"size": 76568,
		"path": "../public/assets/car/pee-pad.png"
	},
	"/assets/car/toy.png": {
		"type": "image/png",
		"etag": "\"c0f6-DH6+pQcS97ixe1LxXn1GN+L1BnI\"",
		"mtime": "2026-07-27T06:38:22.340Z",
		"size": 49398,
		"path": "../public/assets/car/toy.png"
	},
	"/assets/pet-journey/first-day.mp4": {
		"type": "video/mp4",
		"etag": "\"27798a-iBjqROuEIbyja+wPexZ2/9NX9g0\"",
		"mtime": "2026-08-03T16:31:09.061Z",
		"size": 2587018,
		"path": "../public/assets/pet-journey/first-day.mp4"
	},
	"/assets/room/chocolate.png": {
		"type": "image/png",
		"etag": "\"ce3f-xzBNplRsBhWp4IIJBmRKj7Hk++A\"",
		"mtime": "2026-08-11T02:52:18.712Z",
		"size": 52799,
		"path": "../public/assets/room/chocolate.png"
	},
	"/assets/room/cleaner.png": {
		"type": "image/png",
		"etag": "\"7fc7f-QWSEF3apbdBnGu5RWLfxm/s0IWE\"",
		"mtime": "2026-08-03T12:21:42.792Z",
		"size": 523391,
		"path": "../public/assets/room/cleaner.png"
	},
	"/assets/room/detergent.png": {
		"type": "image/png",
		"etag": "\"abfb-h7NWlRvhCoDbTDPD0Lb2c3DZF8c\"",
		"mtime": "2026-08-11T02:52:29.141Z",
		"size": 44027,
		"path": "../public/assets/room/detergent.png"
	},
	"/assets/room/food-bowl.png": {
		"type": "image/png",
		"etag": "\"123b8-6iVRcMQ5oRrBj8xCZI7gWTEqVPs\"",
		"mtime": "2026-08-12T02:04:33.846Z",
		"size": 74680,
		"path": "../public/assets/room/food-bowl.png"
	},
	"/assets/room/leash.png": {
		"type": "image/png",
		"etag": "\"fa51-g2PVZsKoHQjoU7gz7bRBTFAvEnE\"",
		"mtime": "2026-07-21T06:23:05.878Z",
		"size": 64081,
		"path": "../public/assets/room/leash.png"
	},
	"/assets/pet-journey/urinate-and-defecate.mp4": {
		"type": "video/mp4",
		"etag": "\"22c546-rrzczsPWzd12AjoycKRiwLTk0/4\"",
		"mtime": "2026-08-03T12:21:56.532Z",
		"size": 2278726,
		"path": "../public/assets/pet-journey/urinate-and-defecate.mp4"
	},
	"/assets/room/pee-pad.png": {
		"type": "image/png",
		"etag": "\"12b18-ia1a0cyNI6GqS3jBsS7ZB7q60Zc\"",
		"mtime": "2026-07-21T06:23:32.364Z",
		"size": 76568,
		"path": "../public/assets/room/pee-pad.png"
	},
	"/assets/room/empty-room-mobile.png": {
		"type": "image/png",
		"etag": "\"c4e12-ZAr2CzEPIeJsaknQNPgLCDk5urA\"",
		"mtime": "2026-08-16T10:26:02.281Z",
		"size": 806418,
		"path": "../public/assets/room/empty-room-mobile.png"
	},
	"/assets/pet-journey/shedding.mp4": {
		"type": "video/mp4",
		"etag": "\"297a0b-sq1bUUHOpFCJZUAXNdjAfIFCBfg\"",
		"mtime": "2026-08-17T01:21:22.047Z",
		"size": 2718219,
		"path": "../public/assets/pet-journey/shedding.mp4"
	},
	"/assets/room/pet-bed.png": {
		"type": "image/png",
		"etag": "\"1f692-I+bt2gythr6t3JbYNhQk6w9Wvrk\"",
		"mtime": "2026-07-21T06:20:16.186Z",
		"size": 128658,
		"path": "../public/assets/room/pet-bed.png"
	},
	"/assets/room/food.png": {
		"type": "image/png",
		"etag": "\"880d7-hWiLdz/IMLPz8QA9BlW8mZ2Wz2c\"",
		"mtime": "2026-08-03T11:16:24.492Z",
		"size": 557271,
		"path": "../public/assets/room/food.png"
	},
	"/assets/room/small-items.png": {
		"type": "image/png",
		"etag": "\"88e8-CSgOlUxOWckz9YZZbV87Bo7ONjo\"",
		"mtime": "2026-08-11T02:52:51.464Z",
		"size": 35048,
		"path": "../public/assets/room/small-items.png"
	},
	"/assets/room/empty-room.png": {
		"type": "image/png",
		"etag": "\"f1db0-WPh64SeqYCQMxhXWcwmi8pbWMgk\"",
		"mtime": "2026-07-21T05:24:46.441Z",
		"size": 990640,
		"path": "../public/assets/room/empty-room.png"
	},
	"/assets/room/toy.png": {
		"type": "image/png",
		"etag": "\"c0f6-DH6+pQcS97ixe1LxXn1GN+L1BnI\"",
		"mtime": "2026-07-27T06:38:22.340Z",
		"size": 49398,
		"path": "../public/assets/room/toy.png"
	},
	"/assets/room/water-bowl.png": {
		"type": "image/png",
		"etag": "\"de1e-PzmmMYesETJTmTMthz6rR4VkFMA\"",
		"mtime": "2026-08-12T02:15:27.596Z",
		"size": 56862,
		"path": "../public/assets/room/water-bowl.png"
	},
	"/assets/room/wire.png": {
		"type": "image/png",
		"etag": "\"109ff-0IvnVUCzXc0W6iZW30YRMd916Uk\"",
		"mtime": "2026-08-11T02:49:07.633Z",
		"size": 68095,
		"path": "../public/assets/room/wire.png"
	},
	"/assets/species/bird.png": {
		"type": "image/png",
		"etag": "\"451f-0Td2R9efWaGzKWo/euk5Xn5OOiI\"",
		"mtime": "2026-07-28T19:04:51.759Z",
		"size": 17695,
		"path": "../public/assets/species/bird.png"
	},
	"/assets/species/cat.png": {
		"type": "image/png",
		"etag": "\"6c0d-kjvexoQUlLSlYxAjZ1B4nRTDfMM\"",
		"mtime": "2026-07-28T19:04:13.454Z",
		"size": 27661,
		"path": "../public/assets/species/cat.png"
	},
	"/assets/species/dog.png": {
		"type": "image/png",
		"etag": "\"80a7-5Q4gj2TU1fEo3bsi094cfV7IueM\"",
		"mtime": "2026-07-28T19:03:54.510Z",
		"size": 32935,
		"path": "../public/assets/species/dog.png"
	},
	"/assets/species/rabbit.png": {
		"type": "image/png",
		"etag": "\"4e3e-SL5iurh5uwbHlCaLZPk/jnHmips\"",
		"mtime": "2026-07-28T19:04:30.431Z",
		"size": 20030,
		"path": "../public/assets/species/rabbit.png"
	},
	"/assets/car/water-bottle.png": {
		"type": "image/png",
		"etag": "\"215e1d-Ki7p6SIILJWJMyFWnbWb+T87dWY\"",
		"mtime": "2026-07-27T20:00:13.754Z",
		"size": 2186781,
		"path": "../public/assets/car/water-bottle.png"
	},
	"/assets/species/reptile.png": {
		"type": "image/png",
		"etag": "\"66a4-My88tXVoCQpp4cW3SitrPjBzL5s\"",
		"mtime": "2026-07-28T19:05:13.812Z",
		"size": 26276,
		"path": "../public/assets/species/reptile.png"
	},
	"/assets/species/small-mammal.png": {
		"type": "image/png",
		"etag": "\"8403-VPnALA1eu4rjbDIyOQNOGqLi/Xs\"",
		"mtime": "2026-07-28T19:05:32.748Z",
		"size": 33795,
		"path": "../public/assets/species/small-mammal.png"
	},
	"/assets/room/nameplate.png": {
		"type": "image/png",
		"etag": "\"21a69b-gYB9DL8y3ueMboYMYxOUoAkvN5g\"",
		"mtime": "2026-07-28T18:05:54.045Z",
		"size": 2205339,
		"path": "../public/assets/room/nameplate.png"
	},
	"/assets/walking/poop-bag-1.png": {
		"type": "image/png",
		"etag": "\"183dc-IaEOus8IAOcQ/dhHhnBXmTzkhEU\"",
		"mtime": "2026-08-14T14:48:47.568Z",
		"size": 99292,
		"path": "../public/assets/walking/poop-bag-1.png"
	},
	"/assets/pet-journey/sick.mp4": {
		"type": "video/mp4",
		"etag": "\"4e4be1-c7dRlR8mpi2x9v6uc2bCYBwBEJs\"",
		"mtime": "2026-08-12T06:03:13.799Z",
		"size": 5131233,
		"path": "../public/assets/pet-journey/sick.mp4"
	},
	"/assets/walking/poop-bag.png": {
		"type": "image/png",
		"etag": "\"abc8-w88z8sMJaOLoKmUoS5Rio9xfQV8\"",
		"mtime": "2026-08-03T11:13:56.998Z",
		"size": 43976,
		"path": "../public/assets/walking/poop-bag.png"
	},
	"/assets/walking/poop.png": {
		"type": "image/png",
		"etag": "\"4f939-0YEHkWJmgVEgs+Y4pGhtt24Sc3Q\"",
		"mtime": "2026-08-03T11:14:05.908Z",
		"size": 325945,
		"path": "../public/assets/walking/poop.png"
	},
	"/assets/walking/door-to-sidewalk.jpg": {
		"type": "image/jpeg",
		"etag": "\"b1cb5-jE35lfquID5RFSGDBa9U5EjwvOY\"",
		"mtime": "2026-08-04T16:19:51.941Z",
		"size": 728245,
		"path": "../public/assets/walking/door-to-sidewalk.jpg"
	},
	"/assets/walking/sidewalk-to-home.jpg": {
		"type": "image/jpeg",
		"etag": "\"b866d-PfcnfqTeNBKalzHRQ5akk1i7DGo\"",
		"mtime": "2026-08-04T16:19:57.037Z",
		"size": 755309,
		"path": "../public/assets/walking/sidewalk-to-home.jpg"
	},
	"/assets/walking/park.png": {
		"type": "image/png",
		"etag": "\"176e8e-K/LGcTO0ubu8RZcaIfZTt2fl1xY\"",
		"mtime": "2026-08-04T16:19:55.611Z",
		"size": 1535630,
		"path": "../public/assets/walking/park.png"
	},
	"/assets/walking/walker-dog-bag-original.png": {
		"type": "image/png",
		"etag": "\"7dfd5-MeuCCU3V2QGXuKaDYuNF0CR4qqU\"",
		"mtime": "2026-08-14T14:35:23.517Z",
		"size": 516053,
		"path": "../public/assets/walking/walker-dog-bag-original.png"
	},
	"/assets/walking/door-to-sidewalk-mobile.jpg": {
		"type": "image/jpeg",
		"etag": "\"1d7959-+k8M5YSu4yT2g7VpPlRNL514e3w\"",
		"mtime": "2026-08-18T03:00:49.974Z",
		"size": 1931609,
		"path": "../public/assets/walking/door-to-sidewalk-mobile.jpg"
	},
	"/assets/walking/walker-dog-bag.png": {
		"type": "image/png",
		"etag": "\"663bd-m/f2Wb5oRG41LoVvDtc42XN0Fs8\"",
		"mtime": "2026-08-14T15:28:00.579Z",
		"size": 418749,
		"path": "../public/assets/walking/walker-dog-bag.png"
	},
	"/assets/walking/walker-and-dog-poop.png": {
		"type": "image/png",
		"etag": "\"e06f6-/h+/YVd1gxFfTfrMEkyPlxskHio\"",
		"mtime": "2026-08-04T16:20:08.975Z",
		"size": 919286,
		"path": "../public/assets/walking/walker-and-dog-poop.png"
	},
	"/assets/pet-journey/arrival-transition.mp4": {
		"type": "video/mp4",
		"etag": "\"7b23a2-H0H2es+D5x1gLjJaTH6VklOZlKY\"",
		"mtime": "2026-08-03T16:42:25.570Z",
		"size": 8070050,
		"path": "../public/assets/pet-journey/arrival-transition.mp4"
	},
	"/assets/walking/park-mobile.jpg": {
		"type": "image/jpeg",
		"etag": "\"1a7939-dnv/W48GV6h4+xB0skLO2kXCSb4\"",
		"mtime": "2026-08-18T02:52:43.708Z",
		"size": 1734969,
		"path": "../public/assets/walking/park-mobile.jpg"
	},
	"/assets/walking/park-poop-event.png": {
		"type": "image/png",
		"etag": "\"1dbdce-5brOwT4FeLsr0uQEI0/zEwBb9KU\"",
		"mtime": "2026-08-04T16:19:54.742Z",
		"size": 1949134,
		"path": "../public/assets/walking/park-poop-event.png"
	},
	"/assets/pet-journey/senior-life.mp4": {
		"type": "video/mp4",
		"etag": "\"64f8da-x4J5MHFcx6IdK40zsN2r6w1wDSQ\"",
		"mtime": "2026-08-10T02:41:27.429Z",
		"size": 6617306,
		"path": "../public/assets/pet-journey/senior-life.mp4"
	},
	"/assets/walking/walker-and-dog.png": {
		"type": "image/png",
		"etag": "\"9b4d4-YwzaSvMoejMt4hkKHuAgqb5XldI\"",
		"mtime": "2026-08-04T16:20:17.079Z",
		"size": 636116,
		"path": "../public/assets/walking/walker-and-dog.png"
	},
	"/assets/walking/leash-choice.png": {
		"type": "image/png",
		"etag": "\"26d60c-KtO1iW58lZeEIJ13u8CVesT1UdU\"",
		"mtime": "2026-08-16T03:12:59.966Z",
		"size": 2545164,
		"path": "../public/assets/walking/leash-choice.png"
	},
	"/assets/walking/off-leash-choice.png": {
		"type": "image/png",
		"etag": "\"24a387-YmrnLRh4K1rH9jEt7PZm1alojd4\"",
		"mtime": "2026-08-16T03:12:59.990Z",
		"size": 2401159,
		"path": "../public/assets/walking/off-leash-choice.png"
	},
	"/assets/species/dog/border-collie.png": {
		"type": "image/png",
		"etag": "\"8dab-XIGDPwOGyDQ9+ahpo0wtA59F+Cc\"",
		"mtime": "2026-07-28T19:07:07.017Z",
		"size": 36267,
		"path": "../public/assets/species/dog/border-collie.png"
	},
	"/assets/walking/park-poop-event-mobile.jpg": {
		"type": "image/jpeg",
		"etag": "\"222b88-03fPvcUAL+GvuoRdQhKQaXcw6rc\"",
		"mtime": "2026-08-18T02:53:19.986Z",
		"size": 2239368,
		"path": "../public/assets/walking/park-poop-event-mobile.jpg"
	},
	"/assets/species/dog/chihuahua.png": {
		"type": "image/png",
		"etag": "\"585b-fhyRajDLDh+rHhL7UTmQERla46U\"",
		"mtime": "2026-07-28T19:05:57.376Z",
		"size": 22619,
		"path": "../public/assets/species/dog/chihuahua.png"
	},
	"/assets/species/dog/doberman.png": {
		"type": "image/png",
		"etag": "\"75bd-XNqy1mEB6lecZDG+a0ImSKP5gwA\"",
		"mtime": "2026-08-20T16:27:38.459Z",
		"size": 30141,
		"path": "../public/assets/species/dog/doberman.png"
	},
	"/assets/walking/sidewalk-to-home-mobile.jpg": {
		"type": "image/jpeg",
		"etag": "\"24f160-YDC4/sIU+vUc27TP8m3khLBlt3w\"",
		"mtime": "2026-08-18T02:53:52.473Z",
		"size": 2421088,
		"path": "../public/assets/walking/sidewalk-to-home-mobile.jpg"
	},
	"/assets/species/dog/labrador.png": {
		"type": "image/png",
		"etag": "\"7ccb-wy/iD93ZmdZtvGZlP6RGHqenrqQ\"",
		"mtime": "2026-07-28T19:07:29.498Z",
		"size": 31947,
		"path": "../public/assets/species/dog/labrador.png"
	},
	"/assets/pet-journey/rainy-day-walk.mp4": {
		"type": "video/mp4",
		"etag": "\"70b509-AT916JnqVoGHFSB1AqGbCT9RxEQ\"",
		"mtime": "2026-08-17T01:21:22.112Z",
		"size": 7386377,
		"path": "../public/assets/pet-journey/rainy-day-walk.mp4"
	},
	"/assets/species/dog/mixed-breed.png": {
		"type": "image/png",
		"etag": "\"9210-iS8JHj7CO5V6BLsKc3G6ygosoWA\"",
		"mtime": "2026-08-20T16:24:35.330Z",
		"size": 37392,
		"path": "../public/assets/species/dog/mixed-breed.png"
	},
	"/assets/species/dog/poodle.png": {
		"type": "image/png",
		"etag": "\"6be5-s4qk06FWkeLl1ojAuUvCDjtBwOA\"",
		"mtime": "2026-07-28T19:06:19.013Z",
		"size": 27621,
		"path": "../public/assets/species/dog/poodle.png"
	},
	"/assets/species/dog/shiba.png": {
		"type": "image/png",
		"etag": "\"34fb0-ye79B46HiK1shmSLHOrtAmaZAMM\"",
		"mtime": "2026-08-03T11:07:13.763Z",
		"size": 217008,
		"path": "../public/assets/species/dog/shiba.png"
	},
	"/assets/welcome/hero-life-preview.png": {
		"type": "image/png",
		"etag": "\"22236c-9UrBu7Kj2eY1fpelO7J5gYsI2lA\"",
		"mtime": "2026-07-15T05:13:25.302Z",
		"size": 2237292,
		"path": "../public/assets/welcome/hero-life-preview.png"
	},
	"/assets/welcome/lifetime-costs.png": {
		"type": "image/png",
		"etag": "\"285acf-FnBZgMbXL3IGwSOJbWD9paB1Csc\"",
		"mtime": "2026-07-15T05:13:25.326Z",
		"size": 2644687,
		"path": "../public/assets/welcome/lifetime-costs.png"
	},
	"/assets/welcome/prep-room.png": {
		"type": "image/png",
		"etag": "\"26d90f-AN+idVI+QskIM3mx2GRMCXfxWD0\"",
		"mtime": "2026-07-15T05:13:25.347Z",
		"size": 2545935,
		"path": "../public/assets/welcome/prep-room.png"
	},
	"/assets/welcome/scenario-grid.png": {
		"type": "image/png",
		"etag": "\"28b0e3-b+LBUdrykjpn0vUDH/CYzNVUFCU\"",
		"mtime": "2026-07-15T05:13:25.372Z",
		"size": 2666723,
		"path": "../public/assets/welcome/scenario-grid.png"
	},
	"/assets/pet-journey/time-passes-aging.mp4": {
		"type": "video/mp4",
		"etag": "\"be0ff4-WYiPARf2qusYgcQzkiEWBd5tjNo\"",
		"mtime": "2026-08-10T02:41:17.872Z",
		"size": 12455924,
		"path": "../public/assets/pet-journey/time-passes-aging.mp4"
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
