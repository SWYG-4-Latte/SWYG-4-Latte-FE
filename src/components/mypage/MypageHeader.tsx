'use client'
// NEXT && React
import Image from "next/image"
import Link from "next/link"
import React from 'react'
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
//Zustand

export default function MypageHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const handleBackMove = () => {
    router.back()
  }

  let title = "MY"

  switch(pathname) {
    case "/mypage/agreements":
      title = "이용약관";
      break;
    case "/mypage/my-reply":
      title = "내가 쓴 댓글";
      break;
    case '/mypage/my-profile':
      title = "내 프로필"
      break;
    case '/mypage/memberinfo':
      title = "나의 카페인 추가 설정"
      break;
  }


  return (
    <section className="bg-gray00 min-w-[360px] px-5 flex-all-center w-full h-[54px]">
      <div className="flex items-center justify-between w-full max-w-[340px]">
        <Link href="/mypage">
          <Image
            onClick={handleBackMove}
            src="/svgs/svg_leftArrow.svg"
            alt="leftArrow"
            width={24}
            height={24}
            priority
            unoptimized
          />
        </Link>
        <div className="font-pretendard text-md text-gray10">{title}</div>
        <div className="w-6 h-6"/>
      </div>
    </section>
  )
}
