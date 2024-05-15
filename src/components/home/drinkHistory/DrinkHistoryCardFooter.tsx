'use client';

import LoginModal from '@/components/common/modal/LoginModal';
import useLocalStorage from '@/hooks/useLocalStorage';
import useModal from '@/hooks/useModal';
import { useRouter } from 'next/navigation';

interface DrinkHistoryCardFooterProps {
  isEmpty: boolean;
  onRecord?: () => void;
  onCompare?: () => void;
}

const DrinkHistoryCardFooter = ({ isEmpty, onCompare, onRecord }: DrinkHistoryCardFooterProps) => {
  const router = useRouter();

  const { isOpen, openModal, closeModal } = useModal();
  const isLoggedIn = !!useLocalStorage('accessToken');

  const handleRecord = () => {
    if (!isLoggedIn) {
      openModal();
      return;
    }

    if (isEmpty) {
      router.push('/menu');
      return;
    }
    if (onRecord) onRecord();
  };

  if (isEmpty) {
    return (
      <>
        <div className="flex h-9 w-full items-center justify-center">
          <button
            onClick={handleRecord}
            className="h-full w-full text-xs text-gray10 hover:bg-orange01 hover:text-primaryOrange"
          >
            카페인 기록하러 가기
          </button>
        </div>
        <LoginModal isOpen={isOpen} onClose={closeModal} />
      </>
    );
  }

  return (
    <div className="flex h-9 items-center justify-center text-xs">
      <button
        onClick={onCompare}
        className="flex h-full w-[124px] items-center justify-center px-6 py-[10px] text-gray10 hover:bg-orange01 hover:text-primaryOrange"
      >
        비교함에 담기
      </button>
      <div className="h-[21px] w-px bg-gray04" />
      <button
        onClick={handleRecord}
        className="flex h-full w-[124px] items-center justify-center px-6 py-[10px] text-orange09 hover:bg-orange01"
      >
        기록하기
      </button>
    </div>
  );
};

export default DrinkHistoryCardFooter;
