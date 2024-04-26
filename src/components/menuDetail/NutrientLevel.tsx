const NutrientLevel = ({ level }: { level: string }) => {
  let textColor = 'text-primaryOrange';
  let bgColor = 'bg-primaryOrange';

  if (level === '낮음') {
    textColor = 'text-[#6ABF9C]';
    bgColor = 'bg-[#6ABF9C]';
  } else if (level === '높음') {
    textColor = 'text-primaryRed';
    bgColor = 'bg-primaryRed';
  }

  return <div className={`w-fit rounded bg-opacity-20 px-2 py-1 text-[10px] ${textColor} ${bgColor}`}>{level}</div>;
};

export default NutrientLevel;
