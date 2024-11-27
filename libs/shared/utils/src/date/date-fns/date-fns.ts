import { isWithinInterval, format } from 'date-fns';

import * as T from './types';

/**
 * @param {IIsDateOverlappingParams} params 날짜 비교에 필요한 매개변수 객체
 * @see {@link IIsDateOverlappingParams}
 *
 * @returns {boolean} 날짜가 겹치는지 여부
 *
 */
export const isDateOverlapping = ({
  scheduleDate,
  startDate,
  endDate,
}: T.IIsDateOverlappingParams): boolean => {
  return isWithinInterval(scheduleDate, { start: startDate, end: endDate });
};

export const getTimeString = ({
  date,
  formatString,
}: T.IGetTimeStringParams): string => {
  return format(date, formatString);
};
