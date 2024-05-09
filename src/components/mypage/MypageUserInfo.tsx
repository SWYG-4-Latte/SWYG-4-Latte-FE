'use client'

// NEXT && React
import Image from "next/image"
import Link from "next/link"
import React from 'react'
//Zustand
import useLoginStore from "@/store/loginStore"


export default function MypageUserInfo() {
  const { isLoggedIn, nickname, gender, pregnancy, caffeineIntake, allergies } = useLoginStore();

  const renderBeforeLogin = (
    <div className="flex flex-col space-y-2 justify-center">
      <div className="flex">
        <div>로그인해주세요</div>
        <Image 
          src="/svgs/svg_rightArrow.svg"
          alt="right-Arrow"
          width={16}
          height={16}
          priority
          unoptimized
        />
      </div>
      <div className="px-4 py-2 w-[186px] h-[28px] bg-orange01 text-primaryOrange rounded-md text-[10px] whitespace-nowrap">
        나에게 적절한 카페인 양을 알 수 있어요!
      </div>
    </div>
  );

  const renderAfterLogin = (
    <div className="ml-4 w-full flex items-center justify-between">
      <div className="font-semibold">이용자 <span className="text-gray08 ">님</span></div>
      <Link href='/mypage/my-profile'>
        <div className="bg-gray01 text-gray08 border-gray05 flex-all-center rounded-md w-[61px] h-[26px] border text-xs">내 프로필</div>
      </Link>
    </div>
  );



  return (
    <>
      <section className="bg-gray00 min-w-[360px] px-5 flex-all-center w-full h-[94px]">
        <div className="flex items-center w-full max-w-[360px]">
          <Link href="/home">
            <Image
              src="/svgs/svg_profile.svg"
              alt="leftArrow"
              width={56}
              height={56}
              className="mr-4"
              priority
              unoptimized
            />
          </Link>
          {/* 조건부렌더링 */}
          {/* { isLoggedIn ? renderAfterLogin : renderBeforeLogin } */}
          {renderAfterLogin}
        </div>
      </section>
      <section className="flex items-center justify-center px-5 max-w-[360px] w-full h-[156px]">
          {/* 성별 / 임신여부 / 적정 카페인량 / 알레르기 */}
          <article className="px-[26px] py-[16px] flex items-center justify-between bg-gray01 w-[320px] h-[111px] rounded-lg shadow-md border border-gray04">
            {/* ITEMS */}
            <div className="flex flex-col items-center justify-center">
              <Image 
                src='/svgs/svg_my-sex.svg'
                alt="my-sex"
                width={40}
                height={40}
                priority
                unoptimized
              />
              <p className="text-xs text-gray08 mt-[7px]">성별</p>
              <p> - </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image 
                src='/svgs/svg_my-pregnancy.svg'
                alt="my-pregnancy"
                width={40}
                height={40}
                priority
                unoptimized
              />
              <p className="text-xs text-gray08 mt-[7px]">임신 여부</p>
              <p> - </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image 
                src='/svgs/svg_my-caffeinefit.svg'
                alt="my-caffeinefit"
                width={40}
                height={40}
                priority
                unoptimized
              />
              <p className="text-xs text-gray08 mt-[7px]">적정 카페인량</p>
              <p> - </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image 
                src='/svgs/svg_my-allergy.svg'
                alt="my-allergy"
                width={40}
                height={40}
                priority
                unoptimized
              />
              <p className="text-xs text-gray08 mt-[7px]">알레르기</p>
              <p> - </p>
            </div>
          </article>
      </section>
    </>
  )
}
