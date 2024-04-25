'use client'
// NEXT && React
import React from 'react'
//Zustand
import useSignupStore from "@/store/signupStore"


export default function TitleSection() {
    const { currentStep } = useSignupStore();

    const renderedTitleSection = () => {
      switch(currentStep) {
        case 1:
        case 2:
          return(
            <section className="mt-8 mb-[72px]">
              <h1 className="w-[261px] h-15 font-pretendard600 text-[22px] leading-[30px] tracking-tight">
                오늘 마신 커피에 카페인이 <br/> 얼마나 있었는지 알려드릴게요.
              </h1>
            </section>
          )
        case 3: 
          return(
            <section className="mt-8 mb-6">
              <h1 className="w-[284px] h-15 font-pretendard600 text-[22px] leading-[30px] tracking-tight">
                맞춤 카페인 정보를 제공하기 위해 <br/>
                나의 정보를 입력해주세요
              </h1>
            </section>
          )
        case 4:
          return(
            <section className="mt-8 mb-6">
              <h1 className="w-[300px] h-15 font-pretendard600 text-[22px] leading-[30px] tracking-tighter whitespace-nowrap">
              마지막이에요!<br/> 곧 알맞은 카페인 양을 확인할 수 있어요.
              </h1>
          </section>
          )
        case 5:
          return(
            <section className="flex flex-col items-center mt-8 mb-[80px]">
              <div className="flex flex-col items-center justify-center w-[295px] h-[95px] space-y-4">
                <p className="text-primaryOrange">회원가입 완료</p>
                <div className="text-[22px] text-center font-pretendard600 leading-[30px] tracking-tight">지금 마시고 있는 커피의 <br />카페인 함량을 알아보러 가 볼까요?</div>
              </div>
            </section>
          )
        default:
          return <div>Invalid Step 😮</div>
      }
    }
  return renderedTitleSection();
}
