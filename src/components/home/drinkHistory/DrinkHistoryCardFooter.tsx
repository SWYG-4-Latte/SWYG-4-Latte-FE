import DeleteComparisonBoxModal from '@/components/common/modal/DeleteComparisonBoxModal';
import useModal from '@/hooks/useModal';

const DrinkHistoryCardFooter = ({ isEmpty }: { isEmpty: boolean }) => {
  const { isOpen, openModal, closeModal } = useModal();

  if (isEmpty) {
    return (
      <div className=" flex h-[37px] w-full items-center justify-center">
        <button className="h-full w-full text-xs text-gray10 hover:bg-orange01 hover:text-primaryOrange">
          카페인 기록하러 가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-[37px] items-center text-xs">
      <button className="h-[37px] w-[114px] text-gray10 hover:bg-orange01 hover:text-primaryOrange" onClick={openModal}>
        비교하기
      </button>
      <div className="h-[21px] w-px bg-gray04" />
      <button className="h-[37px] w-[114px] text-orange09 hover:bg-orange01">기록하기</button>
      <DeleteComparisonBoxModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default DrinkHistoryCardFooter;
