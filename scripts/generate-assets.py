#!/usr/bin/env python3
"""
Pre-Pet Assessment — AI 素材生成腳本
======================================
使用 Google Gemini API 自動生成網站所需圖片素材。

使用方式：
  1. 設定 GEMINI_API_KEY 環境變數（從 https://aistudio.google.com/apikey 取得）
  2. pip install google-genai pillow
  3. python generate-assets.py --species rabbit --status needed
  4. python generate-assets.py --species all --dry-run  (只印提示詞，不實際生成)

輸出：每張圖片存到 ../public/assets/{species}/{category}/{id}.png
"""

import argparse
import base64
import json
import os
import sys
import time
from pathlib import Path

# --- 設定區 ---
MANIFEST_PATH = Path(__file__).parent / "asset-manifest.json"
PROJECT_ROOT = Path(__file__).parent.parent  # Pre-Pet-Assessment 根目錄
OUTPUT_BASE = PROJECT_ROOT / "public" / "assets"

# Gemini 圖片生成模型
IMAGE_MODEL = "gemini-2.0-flash-preview-image-generation"

# 每次呼叫 API 後等待秒數（避免超過 rate limit）
RATE_LIMIT_DELAY = 3


def load_manifest():
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def build_prompt(asset: dict, species_config: dict) -> str:
    """將素材定義的 prompt 模板填入 style，組成最終提示詞。"""
    style = species_config.get("style", "flat illustration, clean lines")
    raw_prompt = asset.get("prompt", "")
    return raw_prompt.replace("{style}", style)


def generate_image_gemini(prompt: str, output_path: Path, api_key: str) -> bool:
    """呼叫 Gemini API 生成圖片，存到 output_path。回傳是否成功。"""
    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=api_key)

        response = client.models.generate_content(
            model=IMAGE_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
            ),
        )

        # 取得圖片資料
        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                image_data = base64.b64decode(part.inline_data.data)
                output_path.parent.mkdir(parents=True, exist_ok=True)
                output_path.write_bytes(image_data)
                print(f"  ✅ 已存到 {output_path.relative_to(PROJECT_ROOT)}")
                return True

        print(f"  ⚠️  API 沒有回傳圖片內容")
        return False

    except ImportError:
        print("❌ 請先安裝：pip install google-genai")
        sys.exit(1)
    except Exception as e:
        print(f"  ❌ 生成失敗：{e}")
        return False


def process_species(species_key: str, manifest: dict, args) -> dict:
    """處理單一物種的所有素材。回傳統計資訊。"""
    species = manifest["species"].get(species_key)
    if not species:
        print(f"找不到物種：{species_key}")
        return {}

    print(f"\n{'='*50}")
    print(f"🐾 物種：{species['displayName']} ({species_key})")
    print(f"{'='*50}")

    stats = {"total": 0, "generated": 0, "skipped": 0, "failed": 0}

    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key and not args.dry_run:
        print("❌ 請設定 GEMINI_API_KEY 環境變數")
        print("   export GEMINI_API_KEY='你的金鑰'")
        sys.exit(1)

    for category, assets in species["assets"].items():
        print(f"\n📁 類別：{category}")
        for asset in assets:
            stats["total"] += 1
            asset_id = asset["id"]
            status = asset.get("status", "needed")
            output_path = PROJECT_ROOT / asset["path"]

            # 篩選條件
            if args.status and status != args.status:
                print(f"  ⏭️  {asset_id} (status={status}，略過)")
                stats["skipped"] += 1
                continue

            if status == "done" and not args.force:
                print(f"  ✅ {asset_id} 已完成，略過")
                stats["skipped"] += 1
                continue

            if output_path.exists() and not args.force:
                print(f"  📄 {asset_id} 檔案已存在，略過（加 --force 強制重新生成）")
                stats["skipped"] += 1
                continue

            prompt = build_prompt(asset, species)
            if not prompt:
                print(f"  ⚠️  {asset_id} 沒有提示詞定義，略過")
                stats["skipped"] += 1
                continue

            print(f"\n  🎨 {asset_id}")
            print(f"     提示詞：{prompt}")

            if args.dry_run:
                print(f"     輸出路徑：{output_path.relative_to(PROJECT_ROOT)}")
                stats["generated"] += 1
                continue

            success = generate_image_gemini(prompt, output_path, api_key)
            if success:
                stats["generated"] += 1
            else:
                stats["failed"] += 1

            time.sleep(RATE_LIMIT_DELAY)

    return stats


def main():
    parser = argparse.ArgumentParser(
        description="Pre-Pet Assessment AI 素材生成器"
    )
    parser.add_argument(
        "--species",
        default="all",
        help="要生成的物種（rabbit/bird/all），預設 all",
    )
    parser.add_argument(
        "--status",
        choices=["needed", "placeholder", "done"],
        help="只處理特定狀態的素材（建議用 needed 或 placeholder）",
    )
    parser.add_argument(
        "--category",
        help="只處理特定類別（room/feeding/preparation/breeds/selection）",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="只印提示詞，不實際呼叫 API（用來驗證設定）",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="強制重新生成，即使檔案已存在",
    )
    args = parser.parse_args()

    print("🚀 Pre-Pet Assessment — AI 素材生成器")
    if args.dry_run:
        print("📝 Dry-run 模式：只顯示提示詞，不呼叫 API")

    manifest = load_manifest()
    total_stats = {"total": 0, "generated": 0, "skipped": 0, "failed": 0}

    if args.species == "all":
        species_list = list(manifest["species"].keys())
    else:
        species_list = [args.species]

    for species_key in species_list:
        stats = process_species(species_key, manifest, args)
        for k in total_stats:
            total_stats[k] += stats.get(k, 0)

    print(f"\n{'='*50}")
    print(f"📊 完成統計")
    print(f"   總計：{total_stats['total']} 項")
    print(f"   生成：{total_stats['generated']} 項")
    print(f"   略過：{total_stats['skipped']} 項")
    print(f"   失敗：{total_stats['failed']} 項")


if __name__ == "__main__":
    main()
