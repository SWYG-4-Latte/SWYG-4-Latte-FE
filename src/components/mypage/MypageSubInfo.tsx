'use client';

//NEXT
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
// Modal
import Modal, { ModalProps } from '../common/modal/Modal';
import Button from '../common/button/Button';
import useModal from '@/hooks/useModal';
//Constants
import { subInfos } from '@/constants/mypage/subInfos';
import { useState } from 'react';

export default function MypageSubInfo() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAccessToken(localStorage.getItem('accessToken'));
    }
  }, []);

  const handleCheckToken = (link: string) => {
    if (!accessToken && link === '/mypage/my-reply') {
      openModal();
    } else {
      router.push(link);
    }
  };

  const renderNeedLoginModal = (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="text-lg font-semibold text-primaryOrange">로그인이 필요한 서비스입니다</div>
      <p className="w-[200px] text-center text-sm leading-[20px] text-gray10">
        지금 라떼핏을 시작해보세요! <br /> 더 다양한 서비스를 이용할 수 있어요.
      </p>
      <div className="flex gap-2">
        <button
          className="h-[50px] w-32 rounded-lg border border-gray05 bg-primaryIvory px-4 py-3 font-semibold leading-[25px] text-gray08 hover:border-0 hover:bg-gray06 hover:text-gray00"
          onClick={closeModal}
        >
          나중에 할게요
        </button>
        <Link href="/auth/login">
          <Button onClick={closeModal} className="w-32 rounded-lg px-4 py-3 font-semibold leading-[25px]">
            지금 시작하기
          </Button>
        </Link>
      </div>
    </Modal>
  );

  const renderedSubInfos = subInfos.map((info, index) => {
    return (
      <aside
        key={index}
        onClick={() => handleCheckToken(info.link)}
        className={`h-[66px] w-full cursor-pointer px-5 py-2 ${index === subInfos.length - 1 ? '' : 'border-b border-gray04'}`}
      >
        <div className="flex h-[50px] w-full items-center justify-between">
          <p>{info.name}</p>
          <Image src="/svgs/svg_rightArrow.svg" alt="rightArrow" width={16} height={16} priority unoptimized />
        </div>
      </aside>
    );
  });

  return (
    <section className="w-full">
      {renderedSubInfos}
      {isOpen && renderNeedLoginModal}
    </section>
  );
}
