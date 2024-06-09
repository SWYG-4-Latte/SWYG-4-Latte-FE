'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import DrinkHistoryDetail from './DrinkHistoryDetail';
import DrinkHistoryCardFooter from './DrinkHistoryCardFooter';
import { Menu } from '@/types/menu/menu';
import useModal from '@/hooks/useModal';
import { useDrinkComparisonStore } from '@/store/drinkComparisonStore';

const DrinkHistoryCard = ({ drinkHistoryData }: { drinkHistoryData?: Menu }) => {
  const router = useRouter();

  const { addDrink, isDrinkExist, isFull } = useDrinkComparisonStore();

  const { openModal: openRecordModal } = useModal('record');

  const { openModal: openDeleteComparisonBoxModal } = useModal('deleteComparisonDrinks');

  const handleCompare = () => {
    if (!drinkHistoryData) return;

    if (isFull()) {
      openDeleteComparisonBoxModal();
      return;
    }
    if (isDrinkExist(drinkHistoryData.menuNo)) {
      toast('이미 담긴 음료입니다', { toastId: 'already-exists' });
      return;
    }

    addDrink(drinkHistoryData);
    if (isFull()) {
      router.push('/menu/compare-drinks');
    } else {
      toast('한 개 더 담아주세요', { toastId: 'successfully-added' });
    }
  };

  const handleRecord = async () => {
    if (!drinkHistoryData) return;

    const recordDrinkData = {
      menuNo: drinkHistoryData.menuNo,
      menuName: drinkHistoryData.menuName,
      menuImg: drinkHistoryData.imageUrl,
    };
    openRecordModal(recordDrinkData);
  };

  return (
    <div className="box-content h-[118px] w-[250px] overflow-hidden rounded-lg border border-gray04 bg-primaryIvory shadow-toast">
      {!drinkHistoryData ? (
        <DrinkHistoryDetail heading="마신 음료를 추가해봐요" description="빠르게 기록할 수 있어요" />
      ) : (
        <DrinkHistoryDetail drinkHistoryData={drinkHistoryData} />
      )}
      <div className="mx-auto h-px w-[234px] bg-gray04" />
      <DrinkHistoryCardFooter
        isEmpty={drinkHistoryData ? false : true}
        onRecord={handleRecord}
        onCompare={handleCompare}
      />
    </div>
  );
};

export default DrinkHistoryCard;
