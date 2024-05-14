import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import { toast } from 'react-toastify';

import { Menu } from '@/types/menu/menu';
import useModal from '@/hooks/useModal';
import RecordCompleteModal from '@/components/common/modal/RecordCompleteModal';
import apiInstance from '@/api/instance';
import useLocalStorage from '@/hooks/useLocalStorage';
import LoginModal from '@/components/common/modal/LoginModal';

const RankingListItem = ({
  menuNo,
  menuName,
  brand,
  caffeine,
  imageUrl,
  ranking,
  menuSize,
}: Menu & {
  ranking: number;
}) => {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: isLoginModalOpen, openModal: openLoginModal, closeModal: closeLoginModal } = useModal();
  const isLoggedIn = !!useLocalStorage('accessToken');

  const handleRecordCaffeine = async (e: MouseEvent) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    try {
      await apiInstance.post('/drink/date/menu', {
        menuNo,
      });
      openModal();
    } catch (error) {
      toast('마신 메뉴 등록에 실패했습니다.');
    }
  };

  return (
    <>
      <li
        className="flex cursor-pointer items-center border-b border-gray04 bg-gray02 px-5 py-6 last:border-none even:bg-gray01"
        onClick={() => {
          router.push(`/menu/${menuNo}`);
        }}
      >
        <span className="w-[11px] text-base font-semibold text-primaryOrange">{ranking}</span>
        <div className="mx-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
          <Image src={imageUrl} alt={menuName} width={0} height={0} sizes="100vw" className="h-auto w-full" />
        </div>
        <div className="flex flex-col justify-center gap-2 pr-4">
          <div className="line-clamp-1 text-sm font-medium text-gray10">{menuName}</div>
          <div className="flex items-center text-xs text-gray08">
            <div>{brand}</div>
            <div className="mx-2 h-3 w-px bg-gray06" />
            <div>{caffeine}</div>
            <div className="mx-2 h-3 w-px bg-gray06" />
            <div>{menuSize}</div>
          </div>
        </div>
        <div className="ml-auto">
          <button onClick={handleRecordCaffeine}>
            <Image src="/svgs/plus.svg" width={32} height={32} alt="카페인 기록하기 버튼" />
          </button>
        </div>
      </li>
      <RecordCompleteModal isOpen={isOpen} onClose={closeModal} menuImg={imageUrl} menuName={menuName} />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default RankingListItem;
