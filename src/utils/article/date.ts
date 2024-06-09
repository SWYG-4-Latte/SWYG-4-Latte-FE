export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR').replace(/\. /g, '.').slice(0, -1);
};
