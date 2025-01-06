#!/bin/bash

# Git 레포지토리 루트 경로 찾기 함수
get_git_repo_root() {
    local repo_root
    repo_root=$(git rev-parse --show-toplevel 2>/dev/null)

    if [ $? -ne 0 ]; then
        echo "This is not a git repository."
        return 1
    fi

    echo "$repo_root"
    return 0
}

# 두 경로 간의 상대 경로를 계산하는 함수
relative_path() {
    local from="$1"
    local to="$2"
    local path=""
    
    # 절대 경로로 변환
    from=$(cd "$from" && pwd)
    to=$(cd "$to" && pwd)
    
    # 공통 경로를 찾기
    while [ "${to#$from}" == "${to}" ]; do
        from=$(dirname "$from")
        path="../${path}"
    done
    
    # 상대 경로 계산
    echo "${path}${to#$from/}"
}