'use client';
// NEXT && React
import React from 'react';
//Zustand
import useSignupStore from '@/store/signupStore';

export default function TitleSection() {
  const { currentStep } = useSignupStore();

  const renderedTitleSection = () => {
    switch (currentStep) {
      case 1:
      case 2:
        return (
          <section className="mb-[72px] w-full px-5 pt-14">
            <h1 className="h-15 mt-8 text-[22px] font-semibold leading-[30px] tracking-tight">
              오늘 마신 커피에 카페인이 <br /> 얼마나 있었는지 알려드릴게요.
            </h1>
          </section>
        );
      case 3:
        return (
          <section className="mb-[72px] w-full px-5 pt-14">
            <h1 className="h-15 mt-8 text-[22px] font-semibold leading-[30px] tracking-tight">
              맞춤 카페인 정보를 제공하기 위해 <br />
              나의 정보를 입력해주세요.
            </h1>
          </section>
        );
      case 4:
        return (
          <section className="mb-6 w-full px-5 pt-14">
            <h1 className="h-15 mt-8 whitespace-nowrap text-[22px] font-semibold leading-[30px]">
              마지막이에요!
              <br /> 곧 알맞은 카페인 양을 확인할 수 있어요.
            </h1>
          </section>
        );
      case 5:
        return (
          <section className="mb-[80px] mt-8 flex flex-col items-center px-5 pt-14">
            <div className="flex h-[95px] flex-col items-center justify-center space-y-4">
              <p className="font-medium text-primaryOrange">회원가입 완료</p>
              <div className="text-center text-[22px] font-semibold leading-[30px]">
                지금 마시고 있는 커피의 <br />
                카페인 함량을 알아보러 가 볼까요?
              </div>
            </div>
          </section>
        );
      default:
        return <div>Invalid Step 😮</div>;
    }
  };
  return renderedTitleSection();
}
