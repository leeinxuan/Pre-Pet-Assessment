import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);

  return {
    metadataBase: base,
    title: "毛日子新手村｜領養前生活練習",
    description: "在真正領養前，先用情境遊戲練習準備空間、接回家、日常照顧、散步、就醫與生活變化。",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "毛日子新手村",
      description: "沿著真實時間軸，預演領養前準備、日常照顧、健康事件與生活變化。",
      type: "website",
      images: [{ url: new URL("/og.png", base), width: 1200, height: 630, alt: "準飼主與柴犬在家中安靜相處" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "毛日子新手村",
      description: "沿著真實時間軸，預演領養前準備、日常照顧、健康事件與生活變化。",
      images: [new URL("/og.png", base)],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
