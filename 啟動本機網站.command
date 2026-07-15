#!/bin/zsh

set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

if ! command -v node >/dev/null 2>&1; then
  echo "尚未安裝 Node.js，請先依照「交接與啟動說明.md」完成安裝。"
  read "?按 Enter 關閉視窗……"
  exit 1
fi

if command -v pnpm >/dev/null 2>&1; then
  PNPM=(pnpm)
elif command -v corepack >/dev/null 2>&1; then
  PNPM=(corepack pnpm)
else
  echo "找不到 pnpm，請先依照「交接與啟動說明.md」完成安裝。"
  read "?按 Enter 關閉視窗……"
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "第一次啟動：正在安裝網站所需元件……"
  "${PNPM[@]}" install
fi

(sleep 4; open "http://127.0.0.1:3000") &
echo "正在開啟飼養前評估遊戲……"
echo "網站開啟後請保留這個視窗；結束時可直接關閉視窗。"
"${PNPM[@]}" dev --hostname 127.0.0.1 --port 3000
