export const formatDate = (date: Date) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  return `${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate()} (${week[date.getDay()]})`;
};
