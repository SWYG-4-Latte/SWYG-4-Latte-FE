'use client';

//NEXT
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
// Modal
import useModal from '@/hooks/useModal';
//Constants
import { subInfos } from '@/constants/mypage/subInfos';
import { useState } from 'react';

export default function MypageSubInfo() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const router = useRouter();
  const { openModal } = useModal('login');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAccessToken(localStorage.getItem('accessToken'));
    }
  }, []);

  const handleCheckToken = (link: string) => {
    if (!accessToken && link === '/mypage/my-reply') {
      openModal();
    } else if (link.startsWith('http')) {
      window.open(link);
    } else {
      router.push(link);
    }
  };

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

  return <section className="w-full">{renderedSubInfos}</section>;
}
