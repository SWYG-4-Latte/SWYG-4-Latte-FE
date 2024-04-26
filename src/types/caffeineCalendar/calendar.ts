type SelectedDatePiece = Date | null;

export type SelectedDate = SelectedDatePiece | [SelectedDatePiece, SelectedDatePiece];

export interface ThisMonthData {
  [key: string]: string;
}
