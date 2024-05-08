import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

// MM.DD (요일) 형식
export const formatDate = (date: Dayjs) => {
  return date.format('MM.DD (dd)');
};
