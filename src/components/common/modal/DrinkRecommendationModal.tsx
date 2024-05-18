'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import Modal from './Modal';
import Button from '../button/Button';
import apiInstance from '@/api/instance';
import useLocalStorage from '@/hooks/useLocalStorage';
import useModal from '@/hooks/useModal';

interface MenuInfo {
  menuNo: number;
  imageUrl: string;
  content: string;
}

const DrinkRecommendationModal = () => {
  const { isOpen, closeModal } = useModal('recommendation');
  const router = useRouter();

  const isLoggedIn = !!useLocalStorage('accessToken');

  const [menuInfo, setMenuInfo] = useState<MenuInfo | null>(null);

  const getRecommendationDrinkInfo = async () => {
    const { data } = await apiInstance.get('/menu/popup');

    setMenuInfo(data);
  };

  const handleHideModal = () => {
    localStorage.setItem('hideModal', dayjs().add(1, 'day').valueOf().toString());
    closeModal();
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    getRecommendationDrinkInfo();
  }, [isLoggedIn]);

  if (!menuInfo) return null;

  return (
    <Modal isRecommendationModal isOpen={isOpen} onClose={closeModal}>
      <button className="absolute -top-14 right-0" onClick={closeModal}>
        <Image priority src="/svgs/icon-modal-close.svg" width={32} height={32} alt="닫기" />
      </button>
      <button
        onClick={handleHideModal}
        className="absolute -bottom-14 rounded-md border border-gray00 px-4 py-2 text-xs font-semibold text-gray00"
      >
        오늘 하루 그만 보기
      </button>
      <div className="text-lg font-semibold text-primaryOrange">라떼핏의 음료 추천</div>
      <Image
        priority
        src={menuInfo.imageUrl}
        width={0}
        height={0}
        sizes="100vw"
        className="h-[140px] w-[140px] rounded-full object-cover"
        alt="추천 음료"
      />
      <div className="text-center text-sm leading-[20px] text-gray10">
        <p className="whitespace-pre-wrap">{menuInfo.content}</p>
      </div>
      <Button
        className="w-full rounded-lg py-3 font-semibold leading-[25px]"
        onClick={() => router.push(`/menu/${menuInfo.menuNo}`)}
      >
        카페인 함량 보러가기
      </Button>
    </Modal>
  );
};

export default DrinkRecommendationModal;
