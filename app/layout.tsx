import type { Metadata, Viewport } from "next";
import "./globals.css";
import ViewportDebug from "./components/shared/ViewportDebug";
import BottomBleedColor from "./components/shared/BottomBleedColor";
import SiteEntryIntro from "./components/shared/SiteEntryIntro";

export const metadata: Metadata = {
  // 本機開發時不設定 metadataBase，圖示與分享圖才會指向 localhost 而不是線上網址
  ...(process.env.NODE_ENV === "production" ? { metadataBase: new URL("https://pre-pet-assessment.vercel.app") } : {}),
  title: "伴日子新手村｜飼養前生活練習",
  description: "在真正領養前，先用情境遊戲練習準備空間、接回家、日常照顧、散步、就醫與生活變化。",
  icons: { icon: { url: "/logo.svg?v=2", type: "image/svg+xml" }, shortcut: "/logo.svg?v=2" },
  openGraph: {
    title: "伴日子新手村",
    description: "沿著真實時間軸，預演領養前準備、日常照顧、健康事件與生活變化。",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "飼主與寵物未來的生活空間" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "伴日子新手村",
    description: "沿著真實時間軸，預演領養前準備、日常照顧、健康事件與生活變化。",
    images: ["/og.png"],
  },
};

// 注意：不使用 viewport-fit=cover（vinext 的 viewport 輸出不支援，且會讓內容延伸到狀態列下方）。
export const viewport: Viewport = {
  themeColor: "#fffdf7",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const entryIntroBootstrap = `
    (function () {
      try {
        var forcePreview = new URLSearchParams(location.search).get("intro") === "1";
        var seen = sessionStorage.getItem("pre-pet-entry-intro-v2");
        var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!forcePreview && (seen || reduced)) {
          document.documentElement.dataset.skipEntryIntro = "true";
        } else {
          delete document.documentElement.dataset.skipEntryIntro;
        }
      } catch (error) {}
    })();
  `;

  // Microsoft Clarity：只用來抽樣核對操作錄影。本機開發不載入，避免測試資料混進正式錄影。
  // 受測者編號由網址 ?pid=A03 帶入，存在 localStorage，重新體驗時不會被清掉。
  const clarityBootstrap = `
    (function () {
      var host = location.hostname;
      if (host === "localhost" || host === "127.0.0.1" || host === "[::1]" || /\\.localhost$/.test(host)) return;
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", "zb83oslrv0");
      try {
        var pid = new URLSearchParams(location.search).get("pid");
        if (pid) localStorage.setItem("pre-pet-pid", pid);
        pid = localStorage.getItem("pre-pet-pid");
        if (pid) {
          window.clarity("identify", pid);
          window.clarity("set", "pid", pid);
        }
      } catch (error) {}
      // 所有輸入欄位一律遮蔽（協助者名稱、生活條件等），錄影看得到有沒有填，看不到填了什麼。
      var maskInputs = function () {
        document.querySelectorAll("input, textarea").forEach(function (el) {
          if (el.getAttribute("data-clarity-mask") !== "True") el.setAttribute("data-clarity-mask", "True");
        });
      };
      document.addEventListener("DOMContentLoaded", function () {
        maskInputs();
        new MutationObserver(maskInputs).observe(document.documentElement, { childList: true, subtree: true });
      });
    })();
  `;

  // Google Analytics 4：整體流量參考。本機開發不載入。受測者編號沿用 Clarity 存下來的 pre-pet-pid。
  const gaBootstrap = `
    (function () {
      var host = location.hostname;
      if (host === "localhost" || host === "127.0.0.1" || host === "[::1]" || /\\.localhost$/.test(host)) return;
      var gaId = "G-EMPZW20EY7";
      var tag = document.createElement("script");
      tag.async = true;
      tag.src = "https://www.googletagmanager.com/gtag/js?id=" + gaId;
      document.head.appendChild(tag);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      var pid = null;
      try {
        pid = new URLSearchParams(location.search).get("pid");
        if (pid) localStorage.setItem("pre-pet-pid", pid);
        pid = localStorage.getItem("pre-pet-pid");
      } catch (error) {}
      var config = pid ? { user_id: pid } : {};
      window.gtag("config", gaId, config);
      if (pid) window.gtag("set", "user_properties", { pid: pid });
    })();
  `;

  return (
    <html lang="zh-Hant">
      <head>
        <script dangerouslySetInnerHTML={{ __html: entryIntroBootstrap }} />
        <script dangerouslySetInnerHTML={{ __html: clarityBootstrap }} />
        <script dangerouslySetInnerHTML={{ __html: gaBootstrap }} />
      </head>
      <body>
        <SiteEntryIntro />
        <a className="skip-link" href="#main-content">跳到主要內容</a>
        {children}
        <BottomBleedColor />
        <ViewportDebug />
      </body>
    </html>
  );
}
