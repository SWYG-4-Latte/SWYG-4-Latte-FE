'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import NavigationHeader from '../common/header/NavigationHeader';

export default function MypageHeader() {
  const pathname = usePathname();

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
