#!/bin/bash

# Drupal 模組批量安裝腳本
# 使用方法: ./install_modules.sh [模組清單檔案]

set -e  # 遇到錯誤時停止執行

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 預設模組清單檔案
MODULE_LIST_FILE="modules_to_install.txt"

# 如果提供了參數，使用指定的檔案
if [ $# -gt 0 ]; then
    MODULE_LIST_FILE="$1"
fi

# 檢查檔案是否存在
if [ ! -f "$MODULE_LIST_FILE" ]; then
    echo -e "${RED}錯誤: 找不到模組清單檔案 '$MODULE_LIST_FILE'${NC}"
    echo "請建立模組清單檔案，或指定正確的檔案路徑"
    echo "使用方法: $0 [模組清單檔案]"
    exit 1
fi

# 檢查是否在 Drupal 專案目錄中
if [ ! -f "composer.json" ]; then
    echo -e "${RED}錯誤: 請在 Drupal 專案根目錄中執行此腳本${NC}"
    exit 1
fi

echo -e "${BLUE}=== Drupal 模組批量安裝工具 ===${NC}"
echo -e "${YELLOW}使用模組清單: $MODULE_LIST_FILE${NC}"
echo ""

# 讀取模組清單並過濾掉註解和空行
modules=()
while IFS= read -r line; do
    # 跳過空行和註解行
    if [[ -n "$line" && ! "$line" =~ ^[[:space:]]*# ]]; then
        modules+=("$line")
    fi
done < "$MODULE_LIST_FILE"

if [ ${#modules[@]} -eq 0 ]; then
    echo -e "${YELLOW}警告: 沒有找到要安裝的模組${NC}"
    exit 0
fi

echo -e "${BLUE}找到 ${#modules[@]} 個模組要安裝:${NC}"
for module in "${modules[@]}"; do
    echo "  - $module"
done
echo ""

# 詢問使用者確認
read -p "是否要繼續安裝這些模組? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}安裝已取消${NC}"
    exit 0
fi

echo ""
echo -e "${BLUE}開始安裝模組...${NC}"

# 安裝成功和失敗的計數器
success_count=0
fail_count=0
failed_modules=()

# 逐個安裝模組
for module in "${modules[@]}"; do
    echo -e "${YELLOW}正在安裝: $module${NC}"

    if composer require "$module" --no-interaction; then
        echo -e "${GREEN}✓ 成功安裝: $module${NC}"
        ((success_count++))
    else
        echo -e "${RED}✗ 安裝失敗: $module${NC}"
        ((fail_count++))
        failed_modules+=("$module")
    fi
    echo ""
done

# 顯示安裝結果
echo -e "${BLUE}=== 安裝結果 ===${NC}"
echo -e "${GREEN}成功安裝: $success_count 個模組${NC}"
echo -e "${RED}安裝失敗: $fail_count 個模組${NC}"

if [ $fail_count -gt 0 ]; then
    echo ""
    echo -e "${RED}失敗的模組:${NC}"
    for module in "${failed_modules[@]}"; do
        echo "  - $module"
    done
    echo ""
    echo -e "${YELLOW}建議檢查失敗的模組名稱和版本是否正確${NC}"
fi

echo ""
echo -e "${BLUE}安裝完成！${NC}"

# 如果安裝成功，建議執行 Drupal 更新
if [ $success_count -gt 0 ]; then
    echo ""
    echo -e "${YELLOW}建議執行以下命令來完成 Drupal 設定:${NC}"
    echo "  drush updatedb"
    echo "  drush cache:rebuild"
fi
