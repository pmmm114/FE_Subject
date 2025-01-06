#!/bin/bash

# 다운로드할 파일의 URL
FILE_URL="https://raw.githubusercontent.com/newren/git-filter-repo/main/git-filter-repo"

# 저장할 파일 이름
OUTPUT_FILE="git-filter-repo"

# curl을 사용하여 파일 다운로드
curl -o $OUTPUT_FILE $FILE_URL

# 위치 이동
mv git-filter-repo $(git --exec-path)

# 실행 권한 추가
chmod +x $(git --exec-path)/git-filter-repo