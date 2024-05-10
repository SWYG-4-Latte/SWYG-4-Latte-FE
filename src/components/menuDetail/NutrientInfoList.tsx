import NutrientLevelBadge from './NutrientLevelBadge';
import { Entries, Nutrient, NutrientLevel } from '@/types/menu/menu';
import { NUTRIENT_NAME } from '@/constants/menuDetail/nutrient';

interface NutrientInfoListProps {
  nutrientDetail: Nutrient;
  nutrientLevel: NutrientLevel;
}

const NutrientInfoList = ({ nutrientDetail, nutrientLevel }: NutrientInfoListProps) => {
  const nutrientList = Object.entries(nutrientDetail) as Entries<Nutrient>;
  const nutrientLevelList = Object.entries(nutrientLevel) as Entries<NutrientLevel>;

  return (
    <div className="flex  justify-between bg-gray03 px-5 py-6">
      {nutrientList.map(([name, amount], idx) => (
        <div key={name} className="flex flex-col items-center justify-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primaryIvory text-xs text-gray10">
            {amount}
          </div>
          <div className="text-xs text-gray08">{NUTRIENT_NAME[name]}</div>
          <NutrientLevelBadge level={nutrientLevelList[idx][1]} />
        </div>
      ))}
    </div>
  );
};

export default NutrientInfoList;
