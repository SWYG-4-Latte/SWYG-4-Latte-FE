import { useRouter } from 'next/navigation';

import Button from '../button/Button';
import Modal, { ModalProps } from './Modal';
import Portal from './Portal';

const ChangePasswordSuccessModal = ({ isOpen, onClose }: ModalProps) => {
  const router = useRouter();

  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose} disableOutsideClick>
        <h1 className="text-lg font-semibold text-primaryOrange">비밀번호가 변경되었습니다.</h1>
        <p className="text-[14px] leading-5 text-gray10">변경된 비밀번호로 로그인해주세요.</p>
        <Button onClick={() => router.push('/auth/login')} className="h-[50px] w-full rounded-lg font-semibold">
          로그인
        </Button>
      </Modal>
    </Portal>
  );
};

export default ChangePasswordSuccessModal;
