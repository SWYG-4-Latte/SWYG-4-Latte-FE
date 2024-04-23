import NutrientLevel from './NutrientLevel';
import { Nutrient } from '@/types/home/menu';
import { NUTRIENT_NAME } from '@/constants/menuDetail/nutrient';

const NutrientInfo = ({ nutrient }: { nutrient: Nutrient }) => {
  const nutrientList = Object.entries(nutrient);

  return (
    <div className="flex gap-5 bg-gray03 px-5 py-6">
      {nutrientList.map(([name, amount]) => (
        <div key={name} className="flex flex-col items-center justify-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primaryIvory text-xs text-gray10">
            {amount}
          </div>
          <div className="text-xs text-gray08">{NUTRIENT_NAME[name]}</div>
          <NutrientLevel level="낮음" />
        </div>
      ))}
    </div>
  );
};

export default NutrientInfo;
