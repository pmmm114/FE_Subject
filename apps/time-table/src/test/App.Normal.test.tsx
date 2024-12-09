import { composeStories } from '@storybook/react';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';

import { server } from '@TimeTable/libs/msw/node';

import { getTimeTableHandler } from '@TimeTable/libs/msw/handlers';
import * as MSW_TC from '@TimeTable/libs/msw/__mock__/testCase';

import * as C from './const';
import * as stories from '../app/app.stories';

const { Default } = composeStories(stories);

/**
 * 일반 난이도 통합 테스트
 */
describe('App Normal', () => {
  describe('TimeTable', () => {
    // 아이템 삭제를 누를 경우, 요소가 삭제된다.
    it('Delete schedule', async () => {
      const { findAllByTestId } = render(<Default />);
      const tableItemDeleteButtons = await findAllByTestId(
        C.TEST_ID.TABLE_ITEM_DELETE_BUTTON,
      );
      const tableItems = await findAllByTestId(C.TEST_ID.TABLE_ITEM);
      expect(tableItems).toHaveLength(2);

      // 삭제 버튼을 누른다.
      await userEvent.click(tableItemDeleteButtons[0]);
      const _deletedTableItems = await screen.findAllByTestId(
        C.TEST_ID.TABLE_ITEM,
      );
      expect(_deletedTableItems).toHaveLength(1);
    });

    // 스케쥴 추가를 누를 경우, 일정 추가 팝업
    it('Show add schedule modal', async () => {
      const { getByTestId } = render(<Default />);

      const addTableItemButton = getByTestId(C.TEST_ID.TABLE_ITEM_ADD_BUTTON);

      await userEvent.click(addTableItemButton);

      expect(
        await screen.findByTestId(C.TEST_ID.TABLE_ITEM_ADD_MODAL),
      ).toBeInTheDocument();
    });

    // 스케쥴 추가
    it('Add schedule', async () => {
      const { findAllByTestId, findByTestId, getByTestId } = render(
        <Default />,
      );

      const tableItems = await findAllByTestId(C.TEST_ID.TABLE_ITEM);
      expect(tableItems).toHaveLength(2);

      const addTableItemButton = getByTestId(C.TEST_ID.TABLE_ITEM_ADD_BUTTON);
      // INFO: "스케쥴 추가"버튼 클릭
      await userEvent.click(addTableItemButton);

      // INFO: 일정 추가 팝업이 나온다.
      await screen.findByTestId(C.TEST_ID.TABLE_ITEM_ADD_MODAL);

      // 특정 컨테이너 요소를 찾습니다.
      const _addModalContainer = await findByTestId(
        C.TEST_ID.TABLE_ITEM_ADD_MODAL,
      );

      // INFO: 시작 시간 입력
      const startTimeHoursInput = await within(_addModalContainer).findByTestId(
        C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.START_DATE.HOURS,
      );
      const startTimeMinutesInput = await within(
        _addModalContainer,
      ).findByTestId(C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.START_DATE.MINUTES);
      await userEvent.type(startTimeHoursInput, '22');
      await userEvent.type(startTimeMinutesInput, '00');

      // INFO: 종료 시간 입력
      const endTimeHoursInput = await within(_addModalContainer).findByTestId(
        C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.END_DATE.HOURS,
      );
      const endTimeMinutesInput = await within(_addModalContainer).findByTestId(
        C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.END_DATE.MINUTES,
      );
      await userEvent.type(endTimeHoursInput, '23');
      await userEvent.type(endTimeMinutesInput, '00');

      // INFO: 일정 추가 버튼 클릭
      const addDialogSubmitButton = await within(
        _addModalContainer,
      ).findByTestId(C.TEST_ID.ADD_DIALOG_SUBMIT_BUTTON);
      await userEvent.click(addDialogSubmitButton);

      const _updatedTableItems = await findAllByTestId(C.TEST_ID.TABLE_ITEM);

      expect(_updatedTableItems).toHaveLength(3);
    });

    // 스케쥴 추가 시, 스케쥴 갯수는 5개가 최대
    it('the number of schedules is limited to 5', async () => {
      server.use(getTimeTableHandler(MSW_TC.TIME_TABLE_RESULT_LIMIT_5.data));

      const { findAllByTestId, getByTestId } = render(<Default />);

      const tableItems = await findAllByTestId(C.TEST_ID.TABLE_ITEM);
      expect(tableItems).toHaveLength(5);

      const addTableItemButton = getByTestId(C.TEST_ID.TABLE_ITEM_ADD_BUTTON);
      // INFO: "스케쥴 추가"버튼 클릭
      await userEvent.click(addTableItemButton);

      // INFO: DOM에서 토스트 요소를 찾습니다.
      const _toast = await screen.findByTestId(C.TEST_ID.TOASTER);

      // 스케쥴이 이미 5개일 경우 에러 메시지가 나온다.
      expect(await within(_toast).findByText('Error')).toBeInTheDocument();
    });
  });
});
