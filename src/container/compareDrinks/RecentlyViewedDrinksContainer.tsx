import Link from 'next/link';
import { useEffect, useState } from 'react';

import DrinkItem from '@/components/common/drink/DrinkItem';
import { useRecentlyViewedDrinksStore } from '@/store/recentlyViewedDrinksStore';
import { Menu } from '@/types/menu/menu';
import DrinkItemSkeleton from '@/components/common/skeleton/DrinkItemSkeleton';
import apiInstance from '@/api/instance';

const RecentlyViewedDrinksContainer = () => {
  const { drinks: recentDrinkMenuNoList } = useRecentlyViewedDrinksStore();
  const [recentDrinks, setRecentDrinks] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDrinksData = async () => {
      const { data } = await apiInstance.get('/menu/recent', {
        params: {
          menus: recentDrinkMenuNoList.join(','),
        },
      });

      setRecentDrinks(data.data);
      setIsLoading(false);
    };

    getDrinksData();
  }, [recentDrinkMenuNoList]);

  return (
    <div className="bg-gray02 px-5 pb-[30px] pt-4">
      <div className="flex items-center justify-between">
        <div className="font-medium text-gray10">최근 확인한 음료</div>
        <Link
          href="/menu"
          className="flex h-[30px] items-center whitespace-nowrap rounded-md border border-gray05 px-4 py-2 text-xs text-gray08"
        >
          다른 음료 더보기
        </Link>
      </div>

      <div className="mt-3 flex justify-between">
        {isLoading && <DrinkItemSkeleton length={4} />}
        {!isLoading && (
          <>
            {recentDrinks.length !== 0 ? (
              <>
                {recentDrinks.map(({ menuNo, menuName, imageUrl }) => (
                  <DrinkItem key={menuNo} menuNo={menuNo} menuName={menuName} imageUrl={imageUrl} />
                ))}
                {Array.from({ length: 4 - recentDrinks.length }).map((_, index) => (
                  <div key={index} className="w-[68px]"></div>
                ))}
              </>
            ) : (
              <div className="mx-auto mt-7 flex h-9 items-center text-sm leading-6 text-gray06">
                최근 확인한 음료가 없어요.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecentlyViewedDrinksContainer;
