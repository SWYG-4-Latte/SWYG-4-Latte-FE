type SelectedDatePiece = Date | null;

export type SelectedDate = SelectedDatePiece | [SelectedDatePiece, SelectedDatePiece];

export type SelectDateHandler = (date: SelectedDate) => void;

export interface ThisMonthData {
  [key: string]: string;
}

export interface SelectedDateInfoType {
  status: string;
  caffeine: string | null;
}
