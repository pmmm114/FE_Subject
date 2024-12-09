import {
  Children,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
/**
 * ReactElement 체크를 위한 사용자 정의 타입 가드
 */
export const isReactElement = (item: unknown): item is ReactElement => {
  // tem이 object이며, 'type' 속성을 가지고 있는지 확인합니다.
  // 여기서 'as' 키워드를 사용하여 타입 단언을 합니다.
  return (
    typeof item === 'object' && item !== null && 'type' in (item as object)
  );
};
/**
 *
 * Composition Component에서 필터링을 위한 함수
 *
 * @param - {@link PropsWithChildren}
 * @param ComponentType - {@link ReactElement.type}
 *
 * @returns children 중에 type에 맞는 component만 filter
 */
export const getComponentTypeCheck = <T>(
  { children }: PropsWithChildren<T>,
  ComponentType: ReactElement['type'],
): ReactElement[] => {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child): child is ReactElement => {
    if (isValidElement(child)) {
      return (
        (child.type as typeof child.type & { name: string }).name ===
        ComponentType
      );
    }
    return false;
  });
};
