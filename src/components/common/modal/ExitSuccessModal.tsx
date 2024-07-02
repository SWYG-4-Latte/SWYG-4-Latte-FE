import { useRouter } from 'next/navigation';

import Portal from './Portal';
import Modal, { ModalProps } from './Modal';
import Button from '../button/Button';

const ExitSuccessModal = ({ isOpen, onClose }: ModalProps) => {
  const router = useRouter();

  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose} disableOutsideClick>
        <div className="text-lg font-semibold text-primaryOrange">탈퇴가 완료되었습니다</div>
        <p className="w-[182px] text-center text-sm leading-[20px] text-gray10">
          언제든 돌아오시길 기다릴게요! <br /> 더 좋은 서비스로 보답하겠습니다.
        </p>
        <Button
          onClick={() => {
            onClose();
            router.push('/home');
          }}
          className="w-full rounded-lg px-4 py-3 font-semibold leading-[25px]"
        >
          홈으로 돌아가기
        </Button>
      </Modal>
    </Portal>
  );
};

export default ExitSuccessModal;
