import Image from 'next/image';

import EmptyCard from '@/components/home/drinkHistory/EmptyCard';
import { DrinkHistoryData } from '@/types/home/drinkHistory';
import DrinkHistorySwiper from '@/components/home/drinkHistory/DrinkHistorySwiper';

const DrinkHistoryContainer = () => {
  const drinkHistory: DrinkHistoryData[] = [
    {
      id: 'a123',
      name: '아메리카노',
      brand: '스타벅스',
      caffeineAmount: 150,
    },
    {
      id: 'temp',
      name: '아포카토',
      brand: '스타벅스',
      caffeineAmount: 150,
    },
  ];

  return (
    <div className="flex-col items-center bg-gray03 py-4">
      <div className="flex items-center justify-between px-5">
        <div className="font-semibold text-gray10">최근 마신 음료</div>
        <div className="inline-flex items-center justify-center">
          <span className="text-xs text-primaryOrange">카페인 비교하러 가기</span>
          <Image src="/svgs/arrow-orange.svg" alt="카페인 비교하러 가기" width={14} height={14} />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-center">
        {drinkHistory.length === 0 ? <EmptyCard /> : <DrinkHistorySwiper slideData={drinkHistory} />}
      </div>
    </div>
  );
};

export default DrinkHistoryContainer;
