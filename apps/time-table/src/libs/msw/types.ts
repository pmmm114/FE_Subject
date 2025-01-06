import type {
  DefaultBodyType,
  http,
  HttpResponseResolver,
  PathParams,
} from 'msw';

import { MSW_HTTP_METHOD } from '@libs/shared/utils/msw/msw';

/**
 * createHandler 함수 파라미터
 */
export interface ICreateHandlerParams<T extends DefaultBodyType> {
  method: keyof typeof MSW_HTTP_METHOD;
  path: string;
  handlerFunction: HttpResponseResolver<PathParams, DefaultBodyType, T>;
}

export type THttpGetHandler = Parameters<typeof http.get>[1];
