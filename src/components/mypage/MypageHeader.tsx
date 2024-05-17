'use client';
// NEXT && React
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import NavigationHeader from '../common/header/NavigationHeader';
//Zustand

export default function MypageHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const handleBackMove = () => {
    router.back();
  };

  let title = 'MY';

  switch (pathname) {
    case '/mypage/agreements':
      title = '이용약관';
      break;
    case '/mypage/my-reply':
      title = '내가 쓴 댓글';
      break;
    case '/mypage/my-profile':
      title = '내 프로필';
      break;
    case '/mypage/memberinfo':
      title = '나의 카페인 추가 설정';
      break;
  }

  return <NavigationHeader title={title} />;
}
