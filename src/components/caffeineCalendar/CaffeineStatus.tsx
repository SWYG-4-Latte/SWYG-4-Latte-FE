const CaffeineStatus = ({ status, locatedInCalendar }: { status: string; locatedInCalendar: boolean }) => {
  let textColor = 'text-primaryOrange';
  let bgColor = locatedInCalendar ? 'bg-orange02' : 'bg-primaryOrange';
  const lineHeight = locatedInCalendar ? 'leading-normal' : 'leading-6';

  if (status === '낮음') {
    textColor = 'text-[#6ABF9C]';
    bgColor = locatedInCalendar ? 'bg-[#DBEAE2]' : 'bg-[#6ABF9C]';
  } else if (status === '높음') {
    textColor = 'text-primaryRed';
    bgColor = locatedInCalendar ? 'bg-[#F5D4D3]' : 'bg-error';
  }

  let style = 'rounded px-2 py-[2px] text-[10px]';
  if (!locatedInCalendar) style = 'bg-opacity-20 rounded-[4.364px] px-[8.73px] py-[4.36px] text-sm';

  style += ` ${textColor} ${bgColor} ${lineHeight}`;

  return <div className={`w-fit font-medium ${style}`}>{status}</div>;
};

export default CaffeineStatus;
