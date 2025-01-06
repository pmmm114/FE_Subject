#!/bin/bash

# 현재 스크립트의 디렉토리 경로를 계산
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 외부 파일에서 함수 불러오기
source "$SCRIPT_DIR/../../common/git-helper.sh"

# 블랙리스트 필터 적용
apply_blacklist_filter() {
    local repo_root=$1
    local blacklist_file="$repo_root/.git-filter-repo-blacklist"

    if [ -f "$blacklist_file" ]; then
        echo "Applying blacklist filter from $blacklist_file..."
        git filter-repo --paths-from-file "$blacklist_file" --invert-paths --force
    else
        echo "No .git-filter-repo-blacklist found in root."
    fi
}

# 화이트리스트 필터 적용
apply_whitelist_filter() {
    local project=$1
    local whitelist_file="$project/.git-filter-repo-whitelist"
    
    echo "Applying whitelist filter from $whitelist_file..."
    git filter-repo --paths-from-file "$whitelist_file" --invert-paths --force
}

# 리플레이스 필터 적용
apply_replace_filter() {
    local project=$1
    local project_relative_path=$2
    local replace_file="$project/.git-filter-repo-replace"

    if [ -f "$replace_file" ]; then
        echo "Applying replace filter for $project_relative_path..."
        git filter-repo --paths-from-file "$replace_file" --force
    else
        echo "No .git-filter-repo-replace found in $project_relative_path"
    fi
}

# 프로젝트별 필터 적용
process_project() {
    local repo_root=$1
    local project=$2
    
    if [ -d "$project" ] && [ -f "$project/.git-filter-repo-whitelist" ]; then
        local project_relative_path=$(relative_path "$repo_root" "$project")
        
        apply_whitelist_filter "$project"
        apply_replace_filter "$project" "$project_relative_path"
    else
        echo "No .git-filter-repo-whitelist found in $project."
    fi
}

main() {
    # Git 레포지토리 루트 경로 찾기
    local repo_root=$(get_git_repo_root)
    if [ $? -ne 0 ]; then
        exit 1
    fi
    echo "Git repository root is: $repo_root"

    # 루트 레벨 블랙리스트 필터 적용
    apply_blacklist_filter "$repo_root"

    # apps/ 디렉토리 내의 각 프로젝트 처리
    for project in "$repo_root"/apps/*; do
        process_project "$repo_root" "$project"
    done
}

# 스크립트 실행
main