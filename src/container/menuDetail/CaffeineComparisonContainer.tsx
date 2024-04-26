'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

import ComparisonItem from '@/components/menuDetail/ComparisonItem';
import { Menu } from '@/types/home/menu';

const CaffeineComparisonContainer = ({ menu }: { menu: Menu }) => {
  // TODO: 비교함에 넣은 음료 가져오기, zustand로 상태 관리 예정 (localStorage에 저장)
  const [comparedDrinks, setComparedDrinks] = useState<(Menu | null)[]>([
    {
      menuNo: 1,
      menuName: '초코쿠키 쉐이크',
      imageUrl: 'https://www.ediya.com/files/menu/IMG_1647322366389.png',
    },
    {
      menuNo: 34,
      menuName: 'ICE 쿠키초코라떼',
      imageUrl: 'https://composecoffee.com/files/thumbnails/730/038/384x530.crop.jpg?t=1705464297',
    },
  ]);

  const handleDeleteComparisonItem = (selectedMenuNo: number) => {
    const maintainedDrinkIdx = comparedDrinks.findIndex((drink) => drink?.menuNo !== selectedMenuNo);
    setComparedDrinks([comparedDrinks[maintainedDrinkIdx], null]);
  };

  const handleAddComparisonItem = () => {
    if (comparedDrinks[0] && comparedDrinks[1]) return;

    const contains = comparedDrinks.some((drink) => drink?.menuNo === menu.menuNo);
    if (contains) {
      toast('이미 담은 제품이에요', { toastId: 'already-exists' });
      return;
    }

    // 비어 있는 자리에 현재 음료 추가
    const addIndex = comparedDrinks.indexOf(null);
    setComparedDrinks((prev) => {
      return prev.map((drink, idx) => (idx === addIndex ? menu : drink));
    });
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
        <ComparisonItem drink={comparedDrinks[0]} onDelete={comparedDrinks[0] ? handleDeleteComparisonItem : null} />
        <div className="h-16 w-px bg-gray04" />
        <ComparisonItem drink={comparedDrinks[1]} onDelete={comparedDrinks[1] ? handleDeleteComparisonItem : null} />
      </div>
    </div>
  );
};

export default CaffeineComparisonContainer;
