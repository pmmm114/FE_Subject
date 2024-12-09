import { ITableItem } from "@TimeTable/components/organisms/Table/TimeTable/TimeTable.types";

export interface IGetTimeTableParams {
  isMaximum?: boolean;
}

export type TGetTimeTableResult = Array<ITableItem>;
