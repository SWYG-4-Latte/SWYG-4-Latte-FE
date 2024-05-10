import { ComparedMenu } from '@/types/menu/menu';
import DrinkInfo from '@/components/compareDrinks/DrinkInfo';
import ComparisonTable from '@/components/compareDrinks/ComparisonTable';
import { useDrinkComparisonStore } from '@/store/drinkComparisonStore';

const CompareContainer = ({ comparedDrinkData }: { comparedDrinkData: (ComparedMenu | null)[] }) => {
  const { deleteDrinkFromComparisonBox } = useDrinkComparisonStore();

  const handleDeleteComparisonItem = (selectedMenuNo: number) => {
    deleteDrinkFromComparisonBox(selectedMenuNo);
  };

  return (
    <div className="pt-14">
      <div className="mb-4 mt-[38px] flex pl-[67px] pr-[20px]">
        <DrinkInfo drink={comparedDrinkData[0]} onDelete={handleDeleteComparisonItem} />
        <div className="mt-2 h-16 w-px bg-gray04" />
        <DrinkInfo drink={comparedDrinkData[1]} onDelete={handleDeleteComparisonItem} />
      </div>
      <ComparisonTable drinks={comparedDrinkData} />
    </div>
  );
};

export default CompareContainer;
