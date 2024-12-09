import { composeStories } from '@storybook/react';
import { render, waitFor, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as C from './const';
import * as stories from '../app/app.stories';

const { Default } = composeStories(stories);

/**
 * 어려움 난이도 통합 테스트
 */
describe('App Hard', () => {
  describe('TimeTable', () => {
    describe('Add schedule Exceptions', () => {
      // INFO: 종료사긴이 시작시간보다 작을 경우, button 비활성화
      it('Disable button if the termination length is less than the start time', async () => {
        const { findByTestId, getByTestId } = render(<Default />);

        const addTableItemButton = getByTestId(C.TEST_ID.TABLE_ITEM_ADD_BUTTON);
        // INFO: "스케쥴 추가"버튼 클릭
        await userEvent.click(addTableItemButton);

        // INFO: 일정 추가 팝업이 나온다.
        await findByTestId(C.TEST_ID.TABLE_ITEM_ADD_MODAL);

        // INFO: 특정 컨테이너 요소를 찾습니다.
        const _addModalContainer = await findByTestId(
          C.TEST_ID.TABLE_ITEM_ADD_MODAL,
        );

        // INFO: 시작 시간 입력
        const startTimeHoursInput = await within(
          _addModalContainer,
        ).findByTestId(C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.START_DATE.HOURS);
        const startTimeMinutesInput = await within(
          _addModalContainer,
        ).findByTestId(C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.START_DATE.MINUTES);
        await userEvent.type(startTimeHoursInput, '10');
        await userEvent.type(startTimeMinutesInput, '00');

        // INFO: 종료 시간 입력
        const endTimeHoursInput = await within(_addModalContainer).findByTestId(
          C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.END_DATE.HOURS,
        );
        const endTimeMinutesInput = await within(
          _addModalContainer,
        ).findByTestId(C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.END_DATE.MINUTES);
        await userEvent.type(endTimeHoursInput, '09');
        await userEvent.type(endTimeMinutesInput, '00');

        // INFO: 일정 추가 버튼
        const addDialogSubmitButton = await within(
          _addModalContainer,
        ).findByTestId(C.TEST_ID.ADD_DIALOG_SUBMIT_BUTTON);

        expect(addDialogSubmitButton).toBeDisabled();
      });

      // INFO: 등록할 날짜가 현재 등록이 불가능한 시간대를 고지
      it('Notify the currently unavailable time slots', async () => {
        const { findByTestId, getByTestId } = render(<Default />);

        const addTableItemButton = getByTestId(C.TEST_ID.TABLE_ITEM_ADD_BUTTON);
        // INFO: "스케쥴 추가"버튼 클릭
        await userEvent.click(addTableItemButton);

        // INFO: 일정 추가 팝업이 나온다.
        await findByTestId(C.TEST_ID.TABLE_ITEM_ADD_MODAL);

        // INFO: 특정 컨테이너 요소를 찾습니다.
        const _addModalContainer = await findByTestId(
          C.TEST_ID.TABLE_ITEM_ADD_MODAL,
        );

        // INFO: 시작 시간 입력
        const startTimeHoursInput = await within(
          _addModalContainer,
        ).findByTestId(C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.START_DATE.HOURS);
        const startTimeMinutesInput = await within(
          _addModalContainer,
        ).findByTestId(C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.START_DATE.MINUTES);
        await userEvent.type(startTimeHoursInput, '09');
        await userEvent.type(startTimeMinutesInput, '30');

        // INFO: 상태 변화에 따른 UI 업데이트를 기다림
        await waitFor(() => {
          expect(startTimeHoursInput).toHaveValue('09');
          expect(startTimeMinutesInput).toHaveValue('30');
        });

        // INFO: 종료 시간 입력
        const endTimeHoursInput = await within(_addModalContainer).findByTestId(
          C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.END_DATE.HOURS,
        );
        const endTimeMinutesInput = await within(
          _addModalContainer,
        ).findByTestId(C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.END_DATE.MINUTES);
        await userEvent.type(endTimeHoursInput, '10');
        await userEvent.type(endTimeMinutesInput, '30');

        // INFO: 상태 변화에 따른 UI 업데이트를 기다림
        await waitFor(() => {
          expect(endTimeHoursInput).toHaveValue('10');
          expect(endTimeMinutesInput).toHaveValue('30');
        });

        // INFO: 일정 추가 버튼 클릭
        const addDialogSubmitButton = await within(
          _addModalContainer,
        ).findByTestId(C.TEST_ID.ADD_DIALOG_SUBMIT_BUTTON);
        await userEvent.click(addDialogSubmitButton);

        // INFO: DOM에서 토스트 요소를 찾습니다.
        const _toast = await screen.findByTestId(C.TEST_ID.TOASTER);

        // INFO: 에러 토스트 메시지가 나온다.
        expect(await within(_toast).findByText('Error')).toBeInTheDocument();
      });
    });

    // INFO: 스케쥴 삽입 시, 자동 재정렬
    it('Auto-sort when inserting a schedule', async () => {
      const { findByTestId, getByTestId, findAllByTestId } = render(
        <Default />,
      );

      const addTableItemButton = getByTestId(C.TEST_ID.TABLE_ITEM_ADD_BUTTON);
      // INFO: "스케쥴 추가"버튼 클릭
      await userEvent.click(addTableItemButton);

      // INFO: 일정 추가 팝업이 나온다.
      await findByTestId(C.TEST_ID.TABLE_ITEM_ADD_MODAL);

      // INFO: 특정 컨테이너 요소를 찾습니다.
      const _addModalContainer = await findByTestId(
        C.TEST_ID.TABLE_ITEM_ADD_MODAL,
      );

      // INFO: 시작 시간 입력
      // 방금 추가한 항목의 시간 값
      const newItemStartTime = '06';
      const newItemStartMinutes = '00';
      const newItemEndTime = '07';
      const newItemEndMinutes = '00';
      const startTimeHoursInput = await within(_addModalContainer).findByTestId(
        C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.START_DATE.HOURS,
      );
      const startTimeMinutesInput = await within(
        _addModalContainer,
      ).findByTestId(C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.START_DATE.MINUTES);
      await userEvent.type(startTimeHoursInput, newItemStartTime);
      await userEvent.type(startTimeMinutesInput, newItemStartMinutes);

      // INFO: 상태 변화에 따른 UI 업데이트를 기다림
      await waitFor(() => {
        expect(startTimeHoursInput).toHaveValue(newItemStartTime);
        expect(startTimeMinutesInput).toHaveValue(newItemStartMinutes);
      });

      // INFO: 종료 시간 입력
      const endTimeHoursInput = await within(_addModalContainer).findByTestId(
        C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.END_DATE.HOURS,
      );
      const endTimeMinutesInput = await within(_addModalContainer).findByTestId(
        C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.END_DATE.MINUTES,
      );
      await userEvent.type(endTimeHoursInput, newItemEndTime);
      await userEvent.type(endTimeMinutesInput, newItemEndMinutes);

      // INFO: 상태 변화에 따른 UI 업데이트를 기다림
      await waitFor(() => {
        expect(endTimeHoursInput).toHaveValue(newItemEndTime);
        expect(endTimeMinutesInput).toHaveValue(newItemEndMinutes);
      });

      // INFO: 일정 추가 버튼 클릭
      const addDialogSubmitButton = await within(
        _addModalContainer,
      ).findByTestId(C.TEST_ID.ADD_DIALOG_SUBMIT_BUTTON);
      await userEvent.click(addDialogSubmitButton);

      const tableItems = await findAllByTestId(C.TEST_ID.TABLE_ITEM);

      // 추가된 항목의 인덱스를 찾습니다.
      const newItemIndex = await Promise.all(
        tableItems.map(async (item, index) => {
          const itemStartTime = (await within(item).findByTestId(
            C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.START_DATE.HOURS,
          )) as HTMLInputElement;
          const itemStartMinutes = (await within(item).findByTestId(
            C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.START_DATE.MINUTES,
          )) as HTMLInputElement;
          const itemEndTime = (await within(item).findByTestId(
            C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.END_DATE.HOURS,
          )) as HTMLInputElement;
          const itemEndMinutes = (await within(item).findByTestId(
            C.TEST_ID.TABLE_ITEM_ADD_TIME_PICKER.END_DATE.MINUTES,
          )) as HTMLInputElement;

          if (
            itemStartTime.value === newItemStartTime &&
            itemStartMinutes.value === newItemStartMinutes &&
            itemEndTime.value === newItemEndTime &&
            itemEndMinutes.value === newItemEndMinutes
          ) {
            return index;
          }
          return -1;
        }),
      ).then((indices) => indices.find((index) => index !== -1));

      expect(newItemIndex).toBe(0);
      expect(tableItems).toHaveLength(3);
    });
  });
});
