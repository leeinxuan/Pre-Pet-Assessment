// 研究用行為事件記錄：把事件批次送到 Google Apps Script（寫入 Google 試算表）。
// - 只有網址帶過 ?pid=（或 localStorage 已存編號）的受測者才會記錄，一般訪客不會送出任何資料。
// - 本機開發（localhost）不送出，只在 console 顯示。
// - 不記錄任何輸入欄位的內容；事件只帶選項代號、結果、次數等。

const ENDPOINT = "https://script.google.com/macros/s/AKfycbx7ULt6vDCd1Iblm3YENBnbkL_me5qBA0Ph-wqtgenyary45CMiN0QGOJJ54pZj3FKLwA/exec";
// 與 Apps Script 的 EVENT_SECRET 相同。只是擋一般亂送的門檻，不是機密。
const SECRET = "eXTYp_m7_6DXF2IiT3hd2OaC";

const PID_KEY = "pre-pet-pid";
const SESSION_KEY = "pre-pet-session";
const FLUSH_MS = 5000;
const FLUSH_SIZE = 10;

type EventRow = {
  pid: string;
  species: string;
  device: string;
  session: string;
  event: string;
  stage: string;
  page: string;
  ts: number;
  props?: Record<string, unknown>;
};

const context = { species: "", stage: "", page: "" };
let queue: EventRow[] = [];
let timer: number | null = null;
let started = false;
let pidCache: string | null = null;
let sessionCache: string | null = null;
// 最近一次作答的題目代號：回饋事件（答錯說明／完整回饋）沒有自己的題目資訊，由這裡補上
let lastScenarioId = "";
// 每次作答只對應一筆回饋；換頁回訪已完成題目時元件重新掛載，不重複記錄
let feedbackPending = false;

function isLocal() {
  const host = location.hostname;
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host.endsWith(".localhost");
}

function readPid(): string {
  if (pidCache !== null) return pidCache;
  let pid = "";
  try {
    const fromUrl = new URLSearchParams(location.search).get("pid");
    if (fromUrl) localStorage.setItem(PID_KEY, fromUrl);
    pid = localStorage.getItem(PID_KEY) ?? "";
  } catch {
    pid = new URLSearchParams(location.search).get("pid") ?? "";
  }
  pidCache = pid;
  return pid;
}

function readSession(): string {
  if (sessionCache) return sessionCache;
  let id = "";
  try {
    id = sessionStorage.getItem(SESSION_KEY) ?? "";
    if (!id) {
      id = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      sessionStorage.setItem(SESSION_KEY, id);
    }
  } catch {
    id = Math.random().toString(36).slice(2, 10);
  }
  sessionCache = id;
  return id;
}

function deviceType(): string {
  const ua = navigator.userAgent;
  if (/iPad|Tablet/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return "tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  return "desktop";
}

export function setEventContext(next: Partial<typeof context>) {
  Object.assign(context, next);
}

// override：離開事件要帶「離開的那一頁」的階段，不能用已經切到下一階段的 context
export function logEvent(event: string, props?: Record<string, unknown>, override?: { stage?: string; page?: string }) {
  if (typeof window === "undefined") return;
  const pid = readPid();
  if (!pid) return;
  if (event === "mcq_attempt" && typeof props?.scenarioId === "string") { lastScenarioId = props.scenarioId; feedbackPending = true; }
  if (event === "mcq_error_feedback" || event === "mcq_full_feedback") {
    if (!feedbackPending) return;
    feedbackPending = false;
    if (!props) props = { scenarioId: lastScenarioId };
  }
  const row: EventRow = {
    pid,
    species: context.species,
    device: deviceType(),
    session: readSession(),
    event,
    stage: override?.stage ?? context.stage,
    page: override?.page || context.page || location.pathname,
    ts: Date.now(),
    props,
  };
  if (isLocal()) {
    console.debug("[event-log]", row);
    return;
  }
  queue.push(row);
  if (queue.length >= FLUSH_SIZE) {
    flush();
  } else if (timer === null) {
    timer = window.setTimeout(flush, FLUSH_MS);
  }
}

export function flush() {
  if (timer !== null) {
    window.clearTimeout(timer);
    timer = null;
  }
  if (!queue.length) return;
  const events = queue;
  queue = [];
  try {
    // text/plain + no-cors：不會觸發跨網域預檢，Apps Script 也能收到
    void fetch(ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret: SECRET, events }),
    }).catch(() => undefined);
  } catch {
    // 記錄失敗不能影響受測者操作
  }
}

// ---- 無效點擊（dead click）：點到沒有互動功能的地方 ----
// 只記標籤、class 與次數，不記文字內容與座標；1 秒內連點同一處合併成一筆（count）。
const INTERACTIVE_SELECTOR = 'a[href], button, input, select, textarea, label, summary, [role="button"], [role="tab"], [role="link"], [role="checkbox"], [role="radio"], [role="option"], [role="menuitem"], [role="switch"], [contenteditable="true"]';
const DEAD_MERGE_MS = 1000;
let deadPending: { key: string; props: Record<string, unknown>; count: number; last: number; stage: string; page: string } | null = null;
let deadTimer: number | null = null;

function describeTarget(el: Element): { key: string; props: Record<string, unknown> } {
  const tag = el.tagName.toLowerCase();
  const cls = (typeof el.className === "string" ? el.className : "").trim().split(/\s+/).filter(Boolean).slice(0, 3).join(".").slice(0, 80);
  const itemId = el.closest("[data-room-item-id]")?.getAttribute("data-room-item-id") ?? undefined;
  const props: Record<string, unknown> = { tag, cls };
  if (itemId) props.itemId = itemId;
  return { key: `${tag}|${cls}|${itemId ?? ""}`, props };
}

function isDeadClick(el: Element): boolean {
  const interactive = el.closest(INTERACTIVE_SELECTOR);
  if (interactive) {
    // 點到停用（disabled）的按鈕也算「點了沒反應」
    return interactive.matches(":disabled, [aria-disabled='true']");
  }
  // React 的 onClick 不會出現在屬性上，用游標樣式（pointer）判斷是否為可點擊區域
  try {
    return getComputedStyle(el).cursor !== "pointer";
  } catch {
    return false;
  }
}

function flushDeadClick() {
  if (deadTimer !== null) {
    window.clearTimeout(deadTimer);
    deadTimer = null;
  }
  if (!deadPending) return;
  const { props, count, stage, page } = deadPending;
  deadPending = null;
  logEvent("dead_click", { ...props, count }, { stage, page });
}

function handleDeadClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (!isDeadClick(target)) return;
  const now = Date.now();
  const { key, props } = describeTarget(target);
  if (deadPending && deadPending.key === key && now - deadPending.last < DEAD_MERGE_MS) {
    deadPending.count += 1;
    deadPending.last = now;
  } else {
    flushDeadClick();
    deadPending = { key, props, count: 1, last: now, stage: context.stage, page: context.page || location.pathname };
  }
  if (deadTimer !== null) window.clearTimeout(deadTimer);
  deadTimer = window.setTimeout(flushDeadClick, DEAD_MERGE_MS);
}

// 只需呼叫一次：開始監聽分頁隱藏／回來，並在離開頁面時送出剩餘事件。
export function startEventLog() {
  if (typeof window === "undefined" || started) return;
  started = true;
  document.addEventListener("click", handleDeadClick, true);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      flushDeadClick();
      logEvent("tab_hidden");
      flush();
    } else {
      logEvent("tab_visible");
    }
  });
  window.addEventListener("pagehide", () => { flushDeadClick(); flush(); });
  logEvent("session_start", { width: window.innerWidth, height: window.innerHeight });
}
