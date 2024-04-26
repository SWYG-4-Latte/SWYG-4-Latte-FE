const MonthComparisonMessage = ({ status }: { status: '없음' | '같음' | '감소' | '증가' }) => {
  let message = '';

  if (status === '없음') message = '지난 달의 데이터가 없어요';
  else if (status === '같음') message = '지난 달과 카페인 섭취량이 같아요';
  else message = '지난 달보다 카페인 섭취량이 ';

  return (
    <div className="absolute top-8 my-2 flex w-fit items-center rounded bg-gray03 px-2 py-1">
      <span className="text-xs font-medium text-gray08">
        {message}
        {(status === '증가' || status === '감소') && (
          <>
            <span className={`${status === '증가' ? 'text-primaryRed' : 'text-[#6ABF9C]'}`}>{status}</span>
            했어요
          </>
        )}
      </span>
    </div>
  );
};

export default MonthComparisonMessage;
