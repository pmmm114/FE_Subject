export interface IGetTimeTableParams {
  isMaximum?: boolean;
}

export interface ITableItem {
  itemId: number;
  text: string;
  startTime: Date;
  endTime: Date;
}

export type TGetTimeTableResult = Array<ITableItem>;
