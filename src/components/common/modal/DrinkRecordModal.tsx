import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import Modal from './Modal';
import Button from '../button/Button';
import useModal from '@/hooks/useModal';
import apiInstance from '@/api/instance';

export interface DrinkRecordModalProps {
  menuNo: number;
  menuImg: string;
  menuName: string;
}

const DrinkRecordModal = ({ menuNo, menuImg, menuName }: DrinkRecordModalProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { isOpen, closeModal } = useModal('record');

  const [isConfirmModal, setIsConfirmModal] = useState(true);

  const handleRecord = async () => {
    try {
      await apiInstance.post('/drink/date/menu', {
        menuNo,
      });
      setIsConfirmModal(false);
    } catch (error) {
      toast('마신 메뉴 등록에 실패했습니다.');
    }
  };

  let modalContent = (
    <>
      <p className="text-center text-sm leading-5 text-gray10">
        이 음료를 오늘 마신 카페인으로 기록할까요? <br /> 한 번 기록하면 취소할 수 없어요.
      </p>
      <div className="flex gap-2">
        <button
          className="h-[50px] w-32 rounded-lg border border-gray05 bg-primaryIvory px-4 py-3 font-semibold leading-[25px] text-gray08 hover:border-0 hover:bg-gray06 hover:text-gray00"
          onClick={() => {
            closeModal();
          }}
        >
          아니요
        </button>
        <Button className="w-32 rounded-lg px-4 py-3 font-semibold leading-[25px]" onClick={handleRecord}>
          기록하기
        </Button>
      </div>
    </>
  );

  if (!isConfirmModal) {
    modalContent = (
      <>
        <div className="text-lg font-semibold text-primaryOrange">오늘 마신 카페인</div>
        <Image
          priority
          src={menuImg}
          width={0}
          height={0}
          sizes="100vw"
          alt={menuName}
          className="h-20 w-20 rounded-full object-cover"
        />
        <p className="text-center text-sm leading-[20px] text-gray10">
          카페인 기록을 완료했어요. <br /> 오늘 마신 카페인을 확인하러 갈까요?
        </p>
        <div className="flex gap-2">
          <button
            className="h-[50px] w-32 rounded-lg border border-gray05 bg-primaryIvory px-4 py-3 font-semibold leading-[25px] text-gray08 hover:border-0 hover:bg-gray06 hover:text-gray00"
            onClick={() => {
              closeModal();
              if (pathname === '/home') {
                window.location.reload();
              }
            }}
          >
            닫기
          </button>
          <Button
            className="w-32 rounded-lg px-4 py-3 font-semibold leading-[25px]"
            onClick={() => {
              closeModal();
              router.push('/calendar/today-caffeine');
            }}
          >
            확인하기
          </Button>
        </div>
      </>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {modalContent}
    </Modal>
  );
};

export default DrinkRecordModal;
