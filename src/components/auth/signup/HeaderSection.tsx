'use client';
// NEXT && React
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
//Zustand
import useSignupStore from '@/store/signupStore';

export default function HeaderSection() {
  const { currentStep, goToPrevStep } = useSignupStore();

  const handleBackClick = (event: any) => {
    if (currentStep > 1) {
      event.preventDefault();
      goToPrevStep();
    }
  };

  return (
    <section
      className={`fixed z-10 flex h-14 w-full max-w-[500px] items-center bg-primaryIvory px-5 ${currentStep === 5 ? 'justify-end' : 'justify-between'}`}
    >
      <Link href={currentStep === 1 ? '/auth/login' : '#'} onClick={handleBackClick}>
        <Image
          src={currentStep === 5 ? '/svgs/svg_close.svg' : '/svgs/svg_leftArrow.svg'}
          alt={currentStep === 5 ? 'Close' : 'Back'}
          width={24}
          height={24}
          priority
          unoptimized
        />
      </Link>
      {currentStep < 5 && <div className="text-md font-semibold">회원가입</div>}
      {currentStep < 5 && <div className="h-6 w-6" />}
    </section>
  );
}
