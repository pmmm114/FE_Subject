#!/bin/bash

# 기본값 설정
TYPE=""
TARGETS=()
BASE_REF=""
HEAD_REF=""

# 사용법 출력 함수
print_usage() {
    echo "Usage: $0 [OPTIONS] -t <targets...>"
    echo "Options:"
    echo "  --type <app|lib>     Project type to filter (if specified, will exclude affected projects)"
    echo "  --base <ref>         Base git ref for comparison (required)"
    echo "  --head <ref>         Head git ref for comparison (required)"
    echo "  -t, --targets       Build targets (required, space separated)"
    echo
    echo "Example:"
    echo "  $0 --type app --base origin/main --head origin/feature -t build test"
    echo "  $0 --base HEAD~1 --head HEAD -t build"
}

# 인자 파싱
while [[ $# -gt 0 ]]; do
    case $1 in
        --type)
            TYPE="$2"
            if [[ ! "$TYPE" =~ ^(app|lib)$ ]]; then
                echo "Error: type must be 'app' or 'lib'"
                exit 1
            fi
            shift 2
            ;;
        --base)
            BASE_REF="$2"
            shift 2
            ;;
        --head)
            HEAD_REF="$2"
            shift 2
            ;;
        -t|--targets)
            shift
            while [[ $# -gt 0 && ! "$1" =~ ^-- ]]; do
                TARGETS+=("$1")
                shift
            done
            ;;
        -h|--help)
            print_usage
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            print_usage
            exit 1
            ;;
    esac
done

# 필수 인자 체크
if [ ${#TARGETS[@]} -eq 0 ]; then
    echo "Error: No targets specified"
    print_usage
    exit 1
fi

if [ -z "$BASE_REF" ] || [ -z "$HEAD_REF" ]; then
    echo "Error: Both --base and --head refs are required"
    print_usage
    exit 1
fi

# 명령어 구성
CMD="yarn nx affected -t ${TARGETS[*]} --base=$BASE_REF --head=$HEAD_REF"

# type이 지정된 경우 affected 프로젝트 제외
if [ -n "$TYPE" ]; then
    EXCLUDED_PROJECTS=$(yarn nx show projects --type "$TYPE" --affected --base=$BASE_REF --head=$HEAD_REF | tr '\n' ',' | sed 's/,$//')
    if [ -n "$EXCLUDED_PROJECTS" ]; then
        CMD="$CMD --exclude=$EXCLUDED_PROJECTS"
    fi
fi

# 실행
echo "Executing: $CMD"
eval "$CMD"