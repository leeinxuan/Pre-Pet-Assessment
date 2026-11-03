"use client";

import { useEffect, useState } from "react";

/**
 * 手機瀏覽器高度診斷：網址加上 ?vh-debug=1 才會啟用（同一個分頁內會記住）。
 * 顯示 svh / dvh / lvh、innerHeight、安全區域等實際數值，用來判斷 iOS Safari 底部工具列造成的空白。
 */
export default function ViewportDebug() {
  const [text, setText] = useState("");

  useEffect(() => {
    let enabled = false;
    try {
      if (new URLSearchParams(window.location.search).has("vh-debug")) sessionStorage.setItem("vh-debug", "1");
      enabled = sessionStorage.getItem("vh-debug") === "1";
    } catch {
      enabled = new URLSearchParams(window.location.search).has("vh-debug");
    }
    if (!enabled) return;

    const probe = document.createElement("div");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText = "position:fixed;left:-9999px;top:0;width:1px;visibility:hidden;pointer-events:none;padding-bottom:env(safe-area-inset-bottom,0px);padding-top:env(safe-area-inset-top,0px)";
    const sizes = ["100svh", "100dvh", "100lvh"].map((unit) => {
      const el = document.createElement("div");
      el.style.height = unit;
      probe.appendChild(el);
      return el;
    });
    document.body.appendChild(probe);

    const update = () => {
      const [svh, dvh, lvh] = sizes.map((el) => Math.round(el.getBoundingClientRect().height));
      const vv = window.visualViewport;
      const cs = getComputedStyle(probe);
      const stage = document.querySelector(".stage-layout");
      setText([
        `svh ${svh} · dvh ${dvh} · lvh ${lvh} (lvh-dvh ${lvh - dvh})`,
        `innerH ${window.innerHeight} · vv ${vv ? Math.round(vv.height) : "-"} · html ${document.documentElement.clientHeight}`,
        `scrollY ${Math.round(window.scrollY)} · docH ${document.documentElement.scrollHeight} · screen ${screen.height}`,
        `safe top ${cs.paddingTop} bottom ${cs.paddingBottom}`,
        `stage-layout ${stage ? Math.round(stage.getBoundingClientRect().height) : "-"}`,
      ].join("\n"));
    };
    update();
    const timer = window.setInterval(update, 400);
    return () => {
      window.clearInterval(timer);
      probe.remove();
    };
  }, []);

  if (!text) return null;
  return (
    <pre style={{ position: "fixed", left: 6, top: 6, zIndex: 2147483647, margin: 0, padding: "6px 8px", maxWidth: "calc(100vw - 12px)", borderRadius: 8, background: "rgba(0,0,0,.78)", color: "#8f8", font: "11px/1.35 ui-monospace, Menlo, monospace", whiteSpace: "pre-wrap", pointerEvents: "none" }}>
      {text}
    </pre>
  );
}
