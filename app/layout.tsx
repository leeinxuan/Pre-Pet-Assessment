import type { Metadata, Viewport } from "next";
import "./globals.css";
import ViewportDebug from "./components/shared/ViewportDebug";
import BottomBleedColor from "./components/shared/BottomBleedColor";

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
  return <html lang="zh-Hant"><body><a className="skip-link" href="#main-content">跳到主要內容</a>{children}<BottomBleedColor /><ViewportDebug /></body></html>;
}
