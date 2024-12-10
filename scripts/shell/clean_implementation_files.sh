#!/bin/bash

set -x

# GitHub Actions 환경에서 GITHUB_WORKSPACE 사용
WORKSPACE=${GITHUB_WORKSPACE:-.}
WORKSPACE_APPS=${WORKSPACE}/apps

# 삭제할 경로 지정
DELETE_PATHS=(
  "$WORKSPACE_APPS/*/src/app/app.tsx"
  "$WORKSPACE_APPS/*/src/components/*"
)

# 삭제할 경로에서 제외할 파일
EXCLUDE_DELETE_PATHS=(
  "$WORKSPACE_APPS/*/src/components/atoms"
)

find $WORKSPACE_APPS -path "$WORKSPACE_APPS/*/src/app/app.tsx" -print

find $WORKSPACE_APPS -path "$WORKSPACE_APPS/*/src/components/*" -print

# 삭제 함수
remove_files() {
  local base_path="$1"
  local delete_patterns=("${!2}")
  local exclude_patterns=("${!3}")

  # 삭제할 파일/디렉토리 찾기
  for pattern in "${delete_patterns[@]}"; do
    find "$base_path" \( $(for exclude in "${exclude_patterns[@]}"; do echo "-path $exclude -prune -o "; done) -false \) -o -path "$pattern" -print0 | while IFS= read -r -d '' file; do
      # 제외되지 않은 경로라면 삭제
      if [ -d "$file" ]; then
        echo "Removing directory: $file"
        rm -rf "$file"
      elif [ -f "$file" ]; then
        echo "Removing file: $file"
        rm -f "$file"
      fi
    done
  done
}

# 파일 삭제
remove_files "$WORKSPACE_APPS" DELETE_PATHS[@] EXCLUDE_DELETE_PATHS[@]