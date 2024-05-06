import { useEffect, useState } from 'react';
import axios from 'axios';

import DrinkItem from '@/components/common/drink/DrinkItem';
import { useRecentlyViewedDrinksStore } from '@/store/recentlyViewedDrinksStore';
import { Menu } from '@/types/home/menu';

const RecentlyViewedDrinksContainer = () => {
  const { drinks: recentDrinkMenuNoList } = useRecentlyViewedDrinksStore();
  const [recentDrinks, setRecentDrinks] = useState<Menu[]>([]);

  useEffect(() => {
    const getDrinksData = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/recent`, {
        params: {
          menus: recentDrinkMenuNoList.join(','),
        },
      });

      setRecentDrinks(response.data.data);
    };

    getDrinksData();
  }, [recentDrinkMenuNoList]);

  return (
    <div className="bg-gray02 px-5 pb-[30px] pt-4">
      <div className="flex items-center justify-between">
        <div className="font-medium text-gray10">최근 확인한 음료</div>
        <button className="flex h-[30px] items-center whitespace-nowrap rounded-md border border-gray05 px-4 py-2 text-xs text-gray08">
          다른 음료 더보기
        </button>
      </div>

      <div className="mt-3 flex justify-between">
        {recentDrinks.map(({ menuNo, menuName, imageUrl }) => (
          <DrinkItem key={menuNo} menuNo={menuNo} menuName={menuName} imageUrl={imageUrl} />
        ))}
        {Array.from({ length: 4 - recentDrinks.length }).map((_, index) => (
          <div key={index} className="w-[68px]"></div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedDrinksContainer;
