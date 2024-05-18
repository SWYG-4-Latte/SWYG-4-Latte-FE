import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useModal from '@/hooks/useModal';
import Modal from './Modal';
import Button from '../button/Button';

const LoginModal = () => {
  const { isOpen, closeModal } = useModal('login');

  const router = useRouter();

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Image priority src="/svgs/icon-login-modal.svg" width={48} height={48} alt="login icon" />
      <div className="text-lg font-semibold text-primaryOrange">로그인이 필요한 서비스입니다</div>
      <p className="text-center text-sm leading-[20px] text-gray10">
        지금 라떼핏을 시작해보세요! <br /> 더 다양한 서비스를 이용할 수 있어요.
      </p>
      <div className="flex gap-2">
        <button
          className="h-[50px] w-32 rounded-lg border border-gray05 bg-primaryIvory px-4 py-3 font-semibold leading-[25px] text-gray08 hover:border-0 hover:bg-gray06 hover:text-gray00"
          onClick={closeModal}
        >
          나중에 할게요
        </button>
        <Button
          className="w-32 rounded-lg px-4 py-3 font-semibold leading-[25px]"
          onClick={() => {
            closeModal();
            router.push('/auth/login');
          }}
        >
          지금 시작하기
        </Button>
      </div>
    </Modal>
  );
};

export default LoginModal;
