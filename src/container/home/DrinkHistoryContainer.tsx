import Image from 'next/image';

import EmptyCard from '@/components/home/drinkHistory/EmptyCard';
import DrinkHistorySwiper from '@/components/home/drinkHistory/DrinkHistorySwiper';
import { Menu } from '@/types/menu/menu';
import useLocalStorage from '@/hooks/useLocalStorage';
import useModal from '@/hooks/useModal';
import { useRouter } from 'next/navigation';
import DrinkHistoryCardSkeleton from '@/components/common/skeleton/DrinkHistoryCardSkeleton';

interface DrinkHistoryContainerProps {
  drinkHistory: Menu[];
  isLoading: boolean;
}

const DrinkHistoryContainer = ({ drinkHistory, isLoading }: DrinkHistoryContainerProps) => {
  const router = useRouter();

  const isLoggedIn = !!useLocalStorage('accessToken');
  const { openModal } = useModal('login');

  const handleNavigateToComparePage = () => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    router.push('/menu/compare-drinks');
  };

  return (
    <div className="flex-col items-center bg-gray02 pt-8">
      <div className="flex items-center justify-between px-5">
        <div className="font-semibold text-gray10">최근 마신 음료</div>
        <button onClick={handleNavigateToComparePage} className="inline-flex items-center justify-center">
          <span className="text-xs text-primaryOrange">
            {drinkHistory.length === 0 ? '카페인 비교하러 가기' : '카페인 비교함으로 이동'}
          </span>
          <Image src="/svgs/arrow-orange.svg" alt="카페인 비교하러 가기" width={14} height={14} />
        </button>
      </div>
      <div className="mt-2 flex w-full items-center justify-center">
        {isLoading ? (
          <DrinkHistoryCardSkeleton />
        ) : (
          <>{drinkHistory.length === 0 ? <EmptyCard /> : <DrinkHistorySwiper slideData={drinkHistory} />} </>
        )}
      </div>
    </div>
  );
};

export default DrinkHistoryContainer;
