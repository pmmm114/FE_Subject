import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';

import * as C from './const';
import * as stories from '../app/app.stories';

const { Default } = composeStories(stories);

/**
 * 쉬운 난이도 통합 테스트
 */
describe('App Easy', () => {
  describe('TimeTable', () => {
    // 렌더링 테스트
    it('Render Successfully', async () => {
      const { baseElement } = render(<Default />);
      expect(baseElement).toBeTruthy();
    });

    // 테이블 타이틀 확인
    it('Should has table title', async () => {
      const { getByTestId } = render(<Default />);
      const tableTitle = await getByTestId(C.TEST_ID.TABLE_TITLE);
      expect(tableTitle).toBeInTheDocument();
    });

    // table 에서 노출되는 아이템은 항상 5개
    it('Show 5 table rows', async () => {
      const { getAllByTestId } = render(<Default />);
      const tableItems = await getAllByTestId(C.TEST_ID.TABLE_ROW);

      expect(tableItems).toHaveLength(5);
    });
  });
});
