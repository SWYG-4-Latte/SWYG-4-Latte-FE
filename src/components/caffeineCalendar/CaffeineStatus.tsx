const CaffeineStatus = ({ status }: { status: string }) => {
  let textColor = 'text-primaryOrange';
  let bgColor = 'bg-orange02';

  if (status === '낮음') {
    textColor = 'text-[#6ABF9C]';
    bgColor = 'bg-[#DBEAE2]';
  } else if (status === '높음') {
    textColor = 'text-primaryRed';
    bgColor = 'bg-[#F5D4D3]';
  }

  return (
    <div className={`w-fit rounded px-2 py-[2px] text-[10px] font-medium leading-normal ${textColor} ${bgColor}`}>
      {status}
    </div>
  );
};

export default CaffeineStatus;
