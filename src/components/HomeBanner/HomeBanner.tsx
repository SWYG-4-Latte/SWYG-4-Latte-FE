'use client';

import Link from 'next/link';

import Button from '../Button/Button';
import BannerText from './BannerText';

const HomeBanner = () => {
  const isLoggedIn = true; // 로그인 여부, 추후 추가

  const buttonText = isLoggedIn ? '오늘의 카페인 기록하기' : '지금 시작하기';
  const buttonWidth = isLoggedIn ? 159 : 108;

  return (
    <div className="h-[188px] w-80 rounded-[12px] border border-primaryAmber bg-primaryBeige pl-5 pt-6">
      <BannerText isLoggedIn={isLoggedIn} />
      <Link href={isLoggedIn ? '/category' : '/login'}>
        <Button
          className={`w-[${buttonWidth}px] whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium leading-normal`}
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default HomeBanner;
