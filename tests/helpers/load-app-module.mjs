import { createServer } from "vite";

let serverPromise;

/** 以 Vite SSR 載入 app 內的 TypeScript 模組（不讀 vite.config，不啟動網路服務）。 */
async function getServer() {
  serverPromise ??= createServer({
    configFile: false,
    root: new URL("../..", import.meta.url).pathname,
    logLevel: "error",
    appType: "custom",
    server: { middlewareMode: true, hmr: false, watch: null },
    define: { __CONTENT_LAST_UPDATED__: JSON.stringify("test") },
  });
  return serverPromise;
}

export async function loadAppModule(path) {
  const server = await getServer();
  return server.ssrLoadModule(path);
}

export async function closeAppModuleLoader() {
  if (!serverPromise) return;
  const server = await serverPromise;
  serverPromise = undefined;
  await server.close();
}
