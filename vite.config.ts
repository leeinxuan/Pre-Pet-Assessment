import vinext from "vinext";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

/** 在建置／部署程序中固定產生台北日期，避免瀏覽者端時區造成內容日期不同。 */
function formatContentBuildDate(date: Date) {
  const parts = new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return `${value("year")} 年 ${value("month")} 月 ${value("day")} 日`;
}

const contentLastUpdated = formatContentBuildDate(new Date());

// Nitro automatically detects Vercel during CI builds and emits the
// serverless output expected by the platform.
export default defineConfig(({ command }) => ({
  // Vinext serves development itself; Nitro is only needed for deployment builds.
  plugins: [tailwindcss(), vinext(), ...(command === "build" ? [nitro()] : [])],
  define: {
    __CONTENT_LAST_UPDATED__: JSON.stringify(contentLastUpdated),
  },
}));
