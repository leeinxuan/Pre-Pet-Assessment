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
    title: "慢慢來，先想想｜飼養前生活預演",
    description: "一場不評分、不貼標籤的飼養前生活預演，幫助準飼主把衝動變成可以討論的準備。",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "慢慢來，先想想",
      description: "飼養前生活預演：把衝動變成可以討論的準備。",
      type: "website",
      images: [{ url: new URL("/og.png", base), width: 1200, height: 630, alt: "準飼主與柴犬在家中安靜相處" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "慢慢來，先想想",
      description: "飼養前生活預演：把衝動變成可以討論的準備。",
      images: [new URL("/og.png", base)],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
