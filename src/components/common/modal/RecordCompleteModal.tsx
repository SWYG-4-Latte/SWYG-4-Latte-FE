import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import Modal, { ModalProps } from './Modal';
import Button from '../button/Button';

interface RecordCompleteModalProps extends ModalProps {
  menuImg: string;
  menuName: string;
}

const RecordCompleteModal = ({ isOpen, onClose, menuImg, menuName }: RecordCompleteModalProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-lg font-semibold text-primaryOrange">오늘 마신 카페인</div>
      <Image
        src={menuImg}
        width={0}
        height={0}
        sizes="100vw"
        alt={menuName}
        className="h-20 w-20 rounded-full bg-primaryBeige"
      />
      <p className="text-center text-sm leading-[20px] text-gray10">
        카페인 기록을 완료했어요. <br /> 오늘 마신 카페인을 확인하러 갈까요?
      </p>
      <div className="flex gap-2">
        <button
          className="h-[50px] w-32 rounded-lg border border-gray05 bg-primaryIvory px-4 py-3 font-semibold leading-[25px] text-gray08 hover:border-0 hover:bg-gray06 hover:text-gray00"
          onClick={() => {
            onClose();
            if (pathname === '/home') {
              window.location.reload();
            }
          }}
        >
          닫기
        </button>
        <Button
          className="w-32 rounded-lg px-4 py-3 font-semibold leading-[25px]"
          onClick={() => router.push('/calendar/today-caffeine')}
        >
          확인하기
        </Button>
      </div>
    </Modal>
  );
};

export default RecordCompleteModal;
