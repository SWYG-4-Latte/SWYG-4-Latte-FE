'use client';

import { useState } from 'react';

import { ComparedMenu } from '@/types/home/menu';
import DrinkInfo from '@/components/compareDrinks/DrinkInfo';
import ComparisonTable from '@/components/compareDrinks/ComparisonTable';

const CompareContainer = () => {
  const [comparedDrinks, setComparedDrinks] = useState<(ComparedMenu | null)[]>([
    {
      menuNo: 234,
      brand: '이디야',
      menuName: '초코쿠키 쉐이크',
      caffeine: '0mg',
      price: '4900원',
      allergy: '우유, 대두, 밀',
      kcal: '449kcal',
      imageUrl: 'https://www.ediya.com/files/menu/IMG_1647322366389.png',
    },
    null,
  ]);

  // 이 부분은 상세 페이지의 비교함과 중복되는 로직이어서 zustand store 생성 후 수정 예정
  const handleDeleteComparisonItem = (selectedMenuNo: number) => {
    const maintainedDrinkIdx = comparedDrinks.findIndex((drink) => drink?.menuNo !== selectedMenuNo);
    setComparedDrinks([comparedDrinks[maintainedDrinkIdx], null]);
  };

  return (
    <div className="pt-14">
      <div className="mb-5 mt-[38px] flex justify-evenly pl-[93px] pr-[37px]">
        <DrinkInfo drink={comparedDrinks[0]} onDelete={handleDeleteComparisonItem} />
        <div className="mx-5 mt-2 h-16 w-px bg-gray04" />
        <DrinkInfo drink={comparedDrinks[1]} onDelete={handleDeleteComparisonItem} />
      </div>
      <ComparisonTable drinks={comparedDrinks} />
    </div>
  );
};

export default CompareContainer;
