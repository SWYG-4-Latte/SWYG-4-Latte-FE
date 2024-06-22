'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Button from '@/components/common/button/Button';
import OnboardingSwiper from '@/components/onboarding/OnboardingSwiper';
import TooltipCloseIcon from '/public/svgs/close-white.svg';
import TooltipTriangle from '/public/svgs/tooltip-triangle.svg';

export default function OnboardingPage() {
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  return (
    <section className="bg-gradient-to-b from-orange02 to-[300px]">
      <header className="z-10 flex h-14 w-full py-4 pl-5">
        <Link href="/home">
          <Image src="/svgs/arrow-left.svg" width={24} height={24} alt="뒤로 가기" />
        </Link>
      </header>

      <section className="mt-4">
        <div className="flex flex-col items-center">
          <OnboardingSwiper />
        </div>
      </section>

      <footer className="mt-14 flex flex-col items-center gap-6 px-5 pb-6">
        <div className="relative flex justify-center">
          {isTooltipOpen && (
            <div className="absolute -top-[46px] flex w-[279px] items-center gap-3 rounded-lg bg-primaryDark px-7 py-2">
              <span className="text-xs text-gray00">나에게 적절한 카페인 함량을 알 수 있어요!</span>
              <button onClick={() => setIsTooltipOpen(false)}>
                <Image src={TooltipCloseIcon} alt="툴팁 닫기" />
              </button>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <Image src={TooltipTriangle} alt="툴팁" />
              </div>
            </div>
          )}
          <p className="font-medium text-gray10">추가 회원 정보를 입력하시겠어요?</p>
        </div>
        <Link href="/mypage/my-profile" className="w-full">
          <Button className="h-[50px] w-full rounded-lg font-semibold">카페인 정보 입력하기</Button>
        </Link>

        <Link href="/home" className="w-fit rounded-md border border-gray06 px-4 py-2 text-xs text-gray06">
          그냥 둘러볼게요
        </Link>
      </footer>
    </section>
  );
}
