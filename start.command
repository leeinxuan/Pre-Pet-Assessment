#!/bin/zsh
set -e
cd "${0:A:h}"

# Use the Codex runtime on Macs where Node.js is not on the terminal PATH.
runtime="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies"
if ! command -v node >/dev/null 2>&1 && [[ -x "$runtime/node/bin/node" ]]; then
  export PATH="$runtime/node/bin:$PATH"
fi
if ! command -v pnpm >/dev/null 2>&1 && [[ -x "$runtime/bin/fallback/pnpm" ]]; then
  export PATH="$runtime/bin/fallback:$PATH"
fi

if ! command -v node >/dev/null 2>&1 || ! command -v pnpm >/dev/null 2>&1; then
  echo "找不到 Node.js 或 pnpm。請安裝 Node.js 22.13 以上版本及 pnpm。"
  read "?按 Enter 結束。"
  exit 1
fi

if [[ ! -d node_modules ]]; then
  pnpm install --frozen-lockfile
fi
echo "網站啟動後，請開啟終端機顯示的 localhost 網址。按 Ctrl+C 停止。"
exec pnpm dev
