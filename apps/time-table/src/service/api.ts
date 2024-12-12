import { API } from '@TimeTable/service/path';

import * as T from './types';

export function getTimeTable({
  isMaximum = false,
}: T.IGetTimeTableParams = {}) {
  // INFO: 쿼리 파라미터 생성
  const params = new URLSearchParams();

  if (isMaximum) {
    params.append('isMaximum', 'true');
  }

  // 쿼리 문자열을 URL에 추가
  const url = `${API.GET_TIME_TABLE}?${params.toString()}`;

  return fetch(url, {
    method: 'GET',
  });
}
