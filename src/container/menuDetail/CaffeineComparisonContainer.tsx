'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import ComparisonItem from '@/components/menuDetail/ComparisonItem';
import { Menu } from '@/types/home/menu';
import { useDrinkComparisonStore } from '@/store/drinkComparisonStore';

const CaffeineComparisonContainer = ({ menu }: { menu: Menu }) => {
  const router = useRouter();

  const { drinks: comparedDrinks, addDrink, isDrinkExist, deleteDrinkFromComparisonBox } = useDrinkComparisonStore();

  const handleDeleteComparisonItem = (selectedMenuNo: number) => {
    deleteDrinkFromComparisonBox(selectedMenuNo);
  };

  const handleAddComparisonItem = () => {
    if (comparedDrinks[0] && comparedDrinks[1]) {
      router.push('/menu/compare-drinks');
      return;
    }

    if (isDrinkExist(menu.menuNo)) {
      toast('이미 담은 제품이에요', { toastId: 'already-exists' });
      return;
    }

    addDrink(menu);
    toast('비교함에 담았어요', { toastId: 'successfully-added' });
  };

  return (
    <div className="bg-primaryIvory px-5 pb-6 pt-4 ">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-medium text-gray10">카페인 함량 비교하기</div>
        <button
          className="flex h-[30px] w-[97px] items-center whitespace-nowrap rounded-md border border-gray05 px-4 py-2 text-xs text-gray08"
          onClick={handleAddComparisonItem}
        >
          {comparedDrinks[0] && comparedDrinks[1] ? '비교하러 가기' : '비교함에 담기'}
        </button>
      </div>

      <div className="flex h-[120px] items-center justify-between rounded-xl border border-gray04 bg-gray02 px-10 py-5">
        <ComparisonItem drink={comparedDrinks[0]} onDelete={handleDeleteComparisonItem} />
        <div className="h-16 w-px bg-gray04" />
        <ComparisonItem drink={comparedDrinks[1]} onDelete={handleDeleteComparisonItem} />
      </div>
    </div>
  );
};

export default CaffeineComparisonContainer;
