import type { InputHTMLAttributes, KeyboardEvent } from 'react';

export type TTimePickerType = 'minutes' | 'seconds' | 'hours' | '12hours';
export type TPeriod = 'AM' | 'PM';

export interface TimePickerInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  picker: TTimePickerType;
  date: Date | undefined;
  setDate?: (date: Date | undefined) => void;
  period?: TPeriod;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}

export type THandleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => void;
