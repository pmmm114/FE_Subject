import { HttpResponse } from 'msw';

import { createHandler } from '@libs/shared/utils/msw/msw';

import { API } from '@TimeTable/service/path';
import * as API_T from '@TimeTable/service/types';

import * as TC from './__mock__/testCase';

import * as T from './types';

export function handlers() {
  return [
    getTimeTableHandler(TC.TIME_TABLE_RESULT.data)
  ];
}


export const getTimeTableHandler = (defaultResult: API_T.TGetTimeTableResult) => {
  return createHandler({
    method: 'GET',
    path: API.GET_TIME_TABLE,
    handlerFunction: getTimeTableFactory(defaultResult),
  })
}

/**
 * 시간표 조회 API 팩토리
 * 
 * @param defaultResult 기본 반환 결과
 * @returns 핸들러 함수
 */
export const getTimeTableFactory = (defaultResult: API_T.TGetTimeTableResult = TC.TIME_TABLE_RESULT.data): T.THttpGetHandler => {
  return ({ request, ...rest }) => {
    const url = new URL(request.url);
    const isMaximum = url.searchParams.get('isMaximum');

    if (isMaximum === 'true') {
      return HttpResponse.json(TC.TIME_TABLE_RESULT_LIMIT_5.data);
    }

    return HttpResponse.json(defaultResult);
  };
};