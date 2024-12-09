import { HttpResponse } from 'msw';

import { MSW_HTTP_METHOD } from '@libs/shared/utils/msw/msw';

const TEST_CASE = {
  convertPath: [
    // INFO: 성공 케이스
    {
      input: '/api/v1/users/${userId}',
      expectedOutput: '*/api/v1/users/:userId',
    },
  ],
  createHandler: [
    // INFO: 성공 케이스
    {
      input: {
        method: 'GET' as keyof typeof MSW_HTTP_METHOD,
        path: '/api/v1/users/${userId}',
        handlerFunction: () => {
          return HttpResponse.json({});
        },
      },
      expectedOutput: {
        method: 'GET',
        path: '*/api/v1/users/:userId',
      },
    },
  ],
};

export { TEST_CASE };
