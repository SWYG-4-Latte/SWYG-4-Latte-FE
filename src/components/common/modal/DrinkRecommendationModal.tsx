'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Modal, { ModalProps } from './Modal';
import Button from '../button/Button';

interface DrinkRecommendationModalProps extends ModalProps {
  menuNo: number;
  menuImg: string;
  description: string;
}

const DrinkRecommendationModal = ({ isOpen, onClose, menuNo, menuImg, description }: DrinkRecommendationModalProps) => {
  const router = useRouter();

  return (
    <Modal isRecommendationModal isOpen={isOpen} onClose={onClose}>
      <button className="absolute -top-14 right-0" onClick={onClose}>
        <Image src="/svgs/icon-modal-close.svg" width={32} height={32} alt="닫기" />
      </button>
      <button className="absolute -bottom-14 rounded-md border border-gray00 px-4 py-2 text-xs font-semibold text-gray00">
        오늘 하루 그만 보기
      </button>
      <div className="text-lg font-semibold text-primaryOrange">라떼핏의 음료 추천</div>
      <Image
        src={menuImg}
        width={0}
        height={0}
        sizes="100vw"
        className="h-[140px] w-[140px] rounded-full bg-primaryBeige"
        alt="추천 음료"
      />
      <div className="text-center text-sm leading-[20px] text-gray10">
        <p className="whitespace-pre-wrap">{description}</p>
      </div>
      <Button
        className="w-full rounded-lg py-3 font-semibold leading-[25px]"
        onClick={() => router.push(`/menu/${menuNo}`)}
      >
        카페인 함량 보러가기
      </Button>
    </Modal>
  );
};

export default DrinkRecommendationModal;
