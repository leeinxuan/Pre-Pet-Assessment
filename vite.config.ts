import vinext from "vinext";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// Nitro automatically detects Vercel during CI builds and emits the
// serverless output expected by the platform.
export default defineConfig({
  plugins: [tailwindcss(), vinext(), nitro()],
});
