import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import Modal from './Modal';
import Button from '../button/Button';
import useModal from '@/hooks/useModal';

export interface RecordCompleteModalData {
  menuImg: string;
  menuName: string;
}

const RecordCompleteModal = ({ menuImg, menuName }: RecordCompleteModalData) => {
  const { isOpen, closeModal } = useModal('recordComplete');

  const router = useRouter();
  const pathname = usePathname();

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
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
            router.refresh();
          }}
        >
          확인하기
        </Button>
      </div>
    </Modal>
  );
};

export default RecordCompleteModal;
