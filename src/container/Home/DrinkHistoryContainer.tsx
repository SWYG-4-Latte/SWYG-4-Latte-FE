import DrinkHistoryCard from '@/components/DrinkHistory/DrinkHistoryCard';
import EmptyCard from '@/components/DrinkHistory/EmptyCard';
import Image from 'next/image';

const DrinkHistoryContainer = () => {
  const drinkHistory = {};

  return (
    <div className="flex-col items-center bg-gray03 py-4">
      <div className="flex items-center justify-between px-5">
        <div className="font-semibold text-gray10">최근 마신 음료</div>
        <div className="inline-flex items-center justify-center">
          <span className="text-xs text-primaryOrange">카페인 비교하러 가기</span>
          <Image src="/svgs/arrow-orange.svg" alt="카페인 비교하러 가기" width={14} height={14} />
        </div>
      </div>
      <div className="flex items-center justify-center">
        {/* {Swiper 추가} */}
        <DrinkHistoryCard />
      </div>
    </div>
  );
};

export default DrinkHistoryContainer;
