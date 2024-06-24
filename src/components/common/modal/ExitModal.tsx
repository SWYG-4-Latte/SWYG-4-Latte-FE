import Image from 'next/image';

import Portal from './Portal';
import Modal, { ModalProps } from './Modal';
import ModalIcon from '/public/svgs/icon-login-modal.svg';
import Button from '../button/Button';
import { deleteUser } from '@/utils/auth-signup/isDelete';
import useMemberStore from '@/store/memberStore';

const ExitModal = ({ isOpen, onClose, openSuccessModal }: ModalProps & { openSuccessModal: () => void }) => {
  const { memberInfo } = useMemberStore();

  const handleConfirmExit = async () => {
    try {
      await deleteUser(memberInfo.mbrNo);
      onClose();
      openSuccessModal();
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.error('회원 탈퇴 처리 중 오류 발생:', error);
    }
  };

  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Image src={ModalIcon} alt="탈퇴하기 모달 아이콘" />
        <div className="text-lg font-semibold text-primaryOrange">정말 탈퇴하시겠어요?</div>
        <p className="w-[161px] text-center text-sm leading-[20px] text-gray10">
          지금 탈퇴하면 그동안 기록한 카페인 섭취량을 볼 수 없어요.
        </p>
        <div className="flex gap-2">
          <button
            className="h-[50px] w-32 rounded-lg border border-gray05 bg-primaryIvory px-4 py-3 font-semibold leading-[25px] text-gray08 hover:border-0 hover:bg-gray06 hover:text-gray00"
            onClick={onClose}
          >
            아니요
          </button>
          <Button onClick={handleConfirmExit} className="w-32 rounded-lg px-4 py-3 font-semibold leading-[25px]">
            탈퇴하기
          </Button>
        </div>
      </Modal>
    </Portal>
  );
};

export default ExitModal;
