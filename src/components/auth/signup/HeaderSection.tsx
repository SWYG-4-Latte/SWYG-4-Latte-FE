'use client'
// NEXT && React
import Image from "next/image"
import Link from "next/link"
import React from 'react'
//Zustand
import useSignupStore from "@/store/signupStore"

export default function HeaderSection() {
  const { currentStep } = useSignupStore()

  return (
    <section className={`flex items-center ${currentStep === 5 ? 'justify-end' : 'justify-between'} w-full h-[54px]`}>
      <Link href="/auth/login">
        <Image
          src={currentStep === 5 ? "/svgs/svg_close.svg" : "/svgs/svg_leftArrow.svg"}
          alt={currentStep === 5 ? "Close" : "Back"}
          width={24}
          height={24}
          priority
          unoptimized
        />
      </Link>
      {currentStep < 5 && <div className="font-pretendard text-md">회원가입</div>}
      {currentStep < 5 && <div />} 
    </section>
  )
}
