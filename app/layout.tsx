import type { Metadata, Viewport } from "next";
import "./globals.css";

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

// 讓頁面延伸到瀏海與底部安全區域（iOS 全螢幕呈現）；需要避開橫條的元素請用 env(safe-area-inset-*)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fffdf7",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body><a className="skip-link" href="#main-content">跳到主要內容</a>{children}</body></html>;
}
