export interface IIsDateOverlappingParams {
  // INFO: 비교할 일정 날짜
  scheduleDate: Date;
  // INFO: 비교할 시작 날짜
  startDate: Date;
  // INFO: 비교할 종료 날짜
  endDate: Date;
}

export enum EDateFormat {
  TIME_ONLY = 'HH:mm',
  DATE_ONLY = 'yyyy-MM-dd',
  FULL_DATE_TIME = 'yyyy-MM-dd HH:mm',
}
export interface IGetTimeStringParams {
  date: Date;
  formatString: EDateFormat;
}
