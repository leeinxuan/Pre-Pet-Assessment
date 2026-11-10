"use client";

// 研究事件記錄：互動遊戲的進度。
// 遊戲的進度都存在 activity 狀態物件裡，這裡比對前後差異，有欄位改變就記一筆 game_step_completed；
// 欄位名稱含 complete 且值為真（或值含 complete）時，另外記 game_completed。
// 只記遊戲進度欄位，不記任何輸入文字。
import { useEffect, useRef } from "react";
import { logEvent } from "./event-log";

function short(value: unknown): unknown {
  if (typeof value === "string") return value.slice(0, 60);
  if (typeof value === "number" || typeof value === "boolean" || value === null) return value;
  if (Array.isArray(value)) return value.slice(-8).map((item) => (typeof item === "string" ? item.slice(0, 40) : item));
  return undefined;
}

export function useGameProgressLog(game: string, state: object) {
  const previous = useRef<Record<string, string> | null>(null);
  useEffect(() => {
    logEvent("activity_intro_viewed", { game });
  }, [game]);
  useEffect(() => {
    const entries = Object.entries(state as Record<string, unknown>);
    const next: Record<string, string> = {};
    for (const [key, value] of entries) {
      const brief = short(value);
      if (brief === undefined) continue;
      next[key] = JSON.stringify(brief);
    }
    const before = previous.current;
    previous.current = next;
    if (!before) return;
    for (const key of Object.keys(next)) {
      if (before[key] === next[key]) continue;
      const value = JSON.parse(next[key]);
      logEvent("game_step_completed", { game, field: key, value });
      const text = typeof value === "string" ? value : "";
      if ((/complete/i.test(key) && value === true) || /interaction-complete|litter-complete/.test(text) || (Array.isArray(value) && value.includes("litter-complete"))) {
        logEvent("game_completed", { game, field: key });
      }
    }
  }, [game, state]);
}
