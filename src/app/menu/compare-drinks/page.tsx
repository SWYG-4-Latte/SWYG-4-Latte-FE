'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getCompareInfo } from '@/api/drinks';
import NavigationHeader from '@/components/common/header/NavigationHeader';
import CompareContainer from '@/container/compareDrinks/CompareContainer';
import RecentlyViewedDrinksContainer from '@/container/compareDrinks/RecentlyViewedDrinksContainer';
import { useDrinkComparisonStore } from '@/store/drinkComparisonStore';
import { ComparedMenu } from '@/types/menu/menu';

export default function CompareDrinksPage() {
  const router = useRouter();

  const { drinks } = useDrinkComparisonStore();

  const [comparedDrinkData, setComparedDrinkData] = useState<(ComparedMenu | null)[]>([null, null]);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      router.replace('/auth/login');
    }

    const getDrinksData = async () => {
      const comparedDrinkInfo = await getCompareInfo(drinks[0], drinks[1]);
      setComparedDrinkData(comparedDrinkInfo);
    };

    getDrinksData();
  }, [drinks]);

  return (
    <main>
      <NavigationHeader title="음료별 카페인 비교하기" />
      <CompareContainer comparedDrinkData={comparedDrinkData} />
      <RecentlyViewedDrinksContainer />
    </main>
  );
}
