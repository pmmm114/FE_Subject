import type { DefaultBodyType, HttpResponseResolver, PathParams } from 'msw';

import { MSW_HTTP_METHOD } from './msw';

/**
 * createHandler 함수 파라미터
 */
export interface ICreateHandlerParams<T extends DefaultBodyType> {
  method: keyof typeof MSW_HTTP_METHOD;
  path: string;
  handlerFunction: HttpResponseResolver<PathParams, DefaultBodyType, T>;
}
