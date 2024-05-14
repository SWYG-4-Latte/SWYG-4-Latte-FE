import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '../common/button/Button';
import useLocalStorage from '@/hooks/useLocalStorage';
import useModal from '@/hooks/useModal';
import LoginModal from '../common/modal/LoginModal';

const EmptyHistory = () => {
  const router = useRouter();

  const isLoggedIn = !!useLocalStorage('accessToken');
  const { isOpen, openModal, closeModal } = useModal();

  const navigateToCategory = () => {
    if (!isLoggedIn) {
      openModal();
      return;
    }

    router.push('/menu');
  };

  return (
    <div className="flex h-[calc(100dvh-56px)] flex-col items-center justify-center overflow-hidden">
      <Image
        src="/svgs/empty-caffeine.svg"
        alt="empty caffeine"
        priority
        sizes="100vw"
        width={0}
        height={0}
        className="h-auto w-auto"
      />
      <div className="my-6 flex flex-col items-center gap-2 text-gray08">
        <p>오늘 마신 카페인이 없어요</p>
        <p className="text-sm">마신 카페인을 기록해보세요.</p>
      </div>
      <Button onClick={navigateToCategory} className="rounded-md px-4 py-2 text-sm font-medium text-gray00">
        카페인 기록하러 가기
      </Button>
      <LoginModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default EmptyHistory;
