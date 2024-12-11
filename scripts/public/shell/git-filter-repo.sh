#!/bin/bash

# 현재 스크립트의 디렉토리 경로를 계산
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 외부 파일에서 함수 불러오기
source "$SCRIPT_DIR/../../common/git-helper.sh"

# Git 레포지토리 루트 경로 찾기
repo_root=$(get_git_repo_root)

if [ $? -ne 0 ]; then
    exit 1
fi
echo "Git repository root is: $repo_root"


# 루트 디렉토리의 블랙리스트 파일을 기준으로 필터링
if [ -f "$repo_root/.git-filter-repo-blacklist" ]; then
    echo "Applying blacklist filter for $repo_root/.git-filter-repo-blacklist..."
    git filter-repo --paths-from-file "$repo_root/.git-filter-repo-blacklist" --invert-paths --force
else
    echo "No .git-filter-repo-blacklist found in root."
fi

# apps/ 디렉토리 내의 각 프로젝트에 대해 화이트리스트 필터링
for project in "$repo_root"/apps/*; do
    if [ -d "$project" ] && [ -f "$project/.git-filter-repo-whitelist" ]; then
        project_relative_path=$(relative_path "$repo_root" "$project")
        echo "Applying whitelist filter for $project_relative_path..."
        git filter-repo --paths-from-file "$project/.git-filter-repo-whitelist" --invert-paths --force
    else
        echo "No .git-filter-repo-whitelist found in $project."
    fi
done