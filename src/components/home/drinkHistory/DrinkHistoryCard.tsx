'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import DrinkHistoryDetail from './DrinkHistoryDetail';
import DrinkHistoryCardFooter from './DrinkHistoryCardFooter';
import { Menu } from '@/types/home/menu';
import useModal from '@/hooks/useModal';
import RecordCompleteModal from '@/components/common/modal/RecordCompleteModal';
import DeleteComparisonBoxModal from '@/components/common/modal/DeleteComparisonBoxModal';
import { useDrinkComparisonStore } from '@/store/drinkComparisonStore';

const DrinkHistoryCard = ({ drinkHistoryData, isEmpty }: { drinkHistoryData?: Menu; isEmpty: boolean }) => {
  const router = useRouter();

  const { addDrink, isDrinkExist, isFull } = useDrinkComparisonStore();

  const {
    isOpen: isRecordCompleteModalOpen,
    openModal: openRecordCompleteModal,
    closeModal: closeRecordCompleteModal,
  } = useModal();

  const {
    isOpen: isDeleteComparisonBoxModalOpen,
    openModal: openDeleteComparisonBoxModal,
    closeModal: closeDeleteComparisonBoxModal,
  } = useModal();

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
      router.push('compare-drinks');
    } else {
      toast('한 개 더 담아주세요', { toastId: 'successfully-added' });
    }
  };

  const handleRecord = () => {
    // 기록하기 기능 추가하기
    openRecordCompleteModal();
  };

  return (
    <div className="h-[118px] w-[229px] overflow-hidden rounded-lg border border-gray04 bg-primaryIvory shadow-toast">
      {isEmpty ? (
        <DrinkHistoryDetail heading="마신 음료를 추가해봐요" description="빠르게 기록할 수 있어요" />
      ) : (
        <DrinkHistoryDetail drinkHistoryData={drinkHistoryData} />
      )}
      <div className="mx-auto h-px w-[213px] bg-gray04" />
      <DrinkHistoryCardFooter isEmpty={isEmpty} onRecord={handleRecord} onCompare={handleCompare} />
      {drinkHistoryData && (
        <>
          <RecordCompleteModal
            isOpen={isRecordCompleteModalOpen}
            onClose={closeRecordCompleteModal}
            menuName={drinkHistoryData.menuName}
            menuImg={drinkHistoryData.imageUrl}
          />
          <DeleteComparisonBoxModal isOpen={isDeleteComparisonBoxModalOpen} onClose={closeDeleteComparisonBoxModal} />
        </>
      )}
    </div>
  );
};

export default DrinkHistoryCard;
