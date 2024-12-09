import { type DefaultBodyType, http } from 'msw';

import * as T from './msw.types';

/**
 * MSW http request method
 */
export const MSW_HTTP_METHOD = {
  GET: http.get,
  POST: http.post,
  PUT: http.put,
  DELETE: http.delete,
  PATCH: http.patch,
};

/**
 * 함수 결과를 의도적으로 지연
 *
 * @param timeout - 지연시간
 */
export async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

/**
 * @param path - API Endpoint URL
 *
 * msw는 https://github.com/pillarjs/path-to-regexp 와 같은 regexp를 사용하고 있기 때문에 파라미터를 :params 와 같은 형태로 재구성
 *
 * @returns path 맨앞에 *를 붙이고 {params}, ${params} 형식을 :params 로 변경해주는 함수
 */
export function convertPath(path: string) {
  return '*' + path.replace(/\$?{(.*?)}/g, ':$1');
}

/**
 *
 * @param - {@link ICreateHandlerParams}
 *
 * @returns msw handler를 반환
 */
export function createHandler<T extends DefaultBodyType>({
  method,
  path,
  handlerFunction,
}: T.ICreateHandlerParams<T>) {
  const mswMethod = MSW_HTTP_METHOD[method];
  if (!mswMethod) {
    throw new Error(`Unsupported HTTP method: ${method}`);
  }
  return mswMethod(convertPath(path), handlerFunction);
}
