// MM.DD (요일) 형식
export const formatDate = (date: Date) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  return `${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')} (${week[date.getDay()]})`;
};

// YYYY년 MM월 DD일 오전/오후 HH:SS 형식
export const formatPopularSearchStandardDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}년 ${month}월 ${day}일 ${hours < 12 ? '오전' : '오후'} ${hours}:${minutes}`;
};

// YYYY-MM 형식
export const formatCalendarMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');

  return `${year}-${month}`;
};

export const formatLocalDateTime = (date: Date) => {
  const curDate = new Date(date);
  curDate.setHours(curDate.getHours() + 9);

  return curDate.toISOString().slice(0, -1);
};
