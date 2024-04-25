'use client'
//NEXT && React
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react";
//TS
import { ISignupState } from "@/types/auth-signup/i-SignupState";
//Zustand
import useSignupStore from "@/store/signupStore"

interface IGenderState {
  gender: string;
}

export default function SignupContainer() {
  const [gender, setGender] = useState<IGenderState['gender']>('')
  const { currentStep, goToNextStep, setField } = useSignupStore();

  const handleInputChange = <T extends keyof ISignupState>(field: T, value: ISignupState[T]) => {
    setField(field, value)
  }

  const handleGenderSelect = (selectGender: IGenderState['gender']) => {
    setGender(selectGender)
  }

  const renderedHeaderSection = () => {
    switch(currentStep) {
      case 1:
      case 2:
      case 3:
      case 4:
        return(
          <section className="flex items-center justify-between w-full h-[54px]">
            <Link href="/auth/login">
              <Image
                src="/svgs/svg_leftArrow.svg"
                alt="letfArrow"
                width={24}
                height={24}
                priority
                unoptimized
              />
            </Link>
            <div className="font-pretendard text-md">회원가입</div>
            <div />
          </section>
        )
      case 5:
        return(
          <section className="flex items-center justify-end w-full h-[54px]">
            <Link href="/auth/login">
              <Image
                src="/svgs/svg_close.svg"
                alt="letfArrow"
                width={24}
                height={24}
                priority
                unoptimized
              />
            </Link>
          </section>
        )

    }

  }

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

  const renderedContentsSection = () => {
    switch(currentStep) {
      case 1:
        return(
        <section className="flex items-between justify-center w-full h-[252px] mb-[126px]"> 
          <form className="space-y-2">
            <p className="text-xs">아이디 입력</p>
            <div className="space-x-2">
              <input 
                type="text"
                placeholder="아이디(6~ 12자 이내, 숫자/영문조합)"
                className="px-5 py-4 w-[236px] h-[50px] rounded-md text-[14px] placeholder:tracking-tighter bg-gray01 border border-gray05 placeholder:text-gray05"
              />
              <button className="bg-gray04 text-gray06 w-[76px] h-[50px] rounded-md">
                중복확인
              </button>
            </div>
            <p className="text-xs">이메일</p>
            <div >
              <input 
                type="text"
                placeholder="ex) latte@example.com"
                className="px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] bg-gray01 border border-gray05 placeholder:text-gray05"
              />
            </div>
            <p className="text-xs">닉네임</p>
            <div className="space-x-2">
              <input 
                type="email"
                placeholder="한글 3자 이상, 8자 이하"
                className="px-5 py-4 w-[236px] h-[50px] rounded-md text-[14px] bg-gray01 border border-gray05 placeholder:text-gray05"
              />
              <button className="bg-gray04 text-gray06 w-[76px] h-[50px] rounded-md">
                중복확인
              </button>
            </div>
          </form>
        </section> 
      )
      case 2:
        return(
          <section className="flex flex-col justify-center items-center  ">
            <form className="space-y-2 mb-[61px]">
              <p className="text-xs">비밀번호 입력</p>
              <input 
                  type="password"
                  placeholder="비밀번호(10자 이상, 영어 소문자/숫자/특문)조합"
                  className="px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] bg-gray01 border border-gray05 placeholder:text-gray05"
              />
              <p className="mt-2 text-xs">비밀번호 확인</p>
              <input 
                  type="password"
                  placeholder="다시 한번 입력해주세요."
                  className="px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] bg-gray01 border border-gray05 placeholder:text-gray05"
              />
            </form>
            <div className="flex items-center text-md w-[320px] h-[50px] border border-gray05 border-b-0 rounded-t-lg">
              <div className="w-full flex px-5 py-4 space-x-2">
                <Image 
                  src="/svgs/svg_checkbox-off.svg"
                  alt="checkbox-off"
                  width={16}
                  height={16}
                  priority
                  />
                <p>약관 전체 동의</p>
              </div>
            </div>
            <div className="flex flex-col justify-center text-sm w-[320px] h-[91px] border border-gray05 rounded-b-lg">
              <div className="w-full flex px-5 py-2.5 mt-2 space-x-2">
                <Image 
                  src="/svgs/svg_checkbox-off.svg"
                  alt="checkbox-off"
                  width={16}
                  height={16}
                  priority
                  />
                <p>이용약관 동의 (필수)</p>
              </div>
              <div className="w-full flex px-5 py-2.5 mb-2 space-x-2">
                <Image 
                  src="/svgs/svg_checkbox-on.svg"
                  alt="checkbox-on"
                  width={16}
                  height={16}
                  priority
                  />
                <p>개인정보 수집 및 이용동의(필수)</p>
              </div>
            </div>
          </section>
        )
      case 3:
        return(
          <section className="flex flex-col items-center justify-center">
            <form className="space-y-2">
              <p className="text-xs">만 나이</p>
              <div className="flex items-center space-x-2 mb-4">
                <input 
                    type="password"
                    placeholder="만 나이를 입력해주세요."
                    className="px-5 py-4 w-[296px] h-[50px] rounded-md text-[14px] bg-gray01 border border-gray05 placeholder:text-gray05"
                    />
                <span className="text-sm">세</span>
              </div>
              <p className="text-xs">성별</p>
              <div className="flex items-center space-x-2">
                <button 
                  type="button"
                  className="flex-all-center w-[96px] h-[34px] py-2 px-4 border border-gray05 rounded-md text-gray08"
                  onClick={()=> handleGenderSelect('male')}>
                  남성
                </button>
                <button 
                  type="button"
                  className="flex-all-center w-[96px] h-[34px] py-2 px-4 border border-gray05 rounded-md text-gray08"
                  onClick={()=>handleGenderSelect('female')}>
                여성
                </button>
              </div>
              {
                gender === 'female' && (
                  <>
                    <p className="text-xs">임신여부</p>
                    <div className="flex items-center space-x-2">
                      <button className="flex-all-center w-[96px] h-[34px] py-2 px-4 border border-gray05 rounded-md text-gray08">예</button>
                      <button className="flex-all-center w-[96px] h-[34px] py-2 px-4 border border-gray05 rounded-md text-gray08">아니요</button>
                    </div>
                  </>
                )
              }
            </form>
          </section>
        )
      case 4:
        return(
          <section className="flex flex-col items-center">
            <form className="space-y-8">
              <div className="flex flex-col space-y-4 justify-center">
                <p className="text-md font-pretendard600">하루에 커피를 몇 잔 정도 마시나요?</p>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 border border-gray05 rounded-md text-sm">안 마심</button>
                  <button className="px-4 py-2 border border-gray05 rounded-md text-sm">1잔</button>
                  <button className="px-4 py-2 border border-gray05 rounded-md text-sm">2잔</button>
                  <button className="px-4 py-2 border border-gray05 rounded-md text-sm">3잔이상</button>
                </div>
              </div>
              <div className="flex flex-col space-y-4 justify-center">
                <p className="text-md font-pretendard600">커피를 마실 때 나타나는 증상을 모두 선택해주세요.</p>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 border border-gray05 rounded-md text-sm">잠이 안와요</button>
                  <button className="px-4 py-2 border border-gray05 rounded-md text-sm">심장이빨리뛰어요</button>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 border border-gray05 rounded-md text-sm">속이 메스꺼워요</button>
                  <button className="px-4 py-2 border border-gray05 rounded-md text-sm">예민해져요</button>
                </div>
                <div className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-gray05 rounded-md text-sm">별다른 증상이 없어요</button>
                </div>
              </div>
              <div className="flex flex-col space-y-4 justify-center">
                <p className="text-md font-pretendard600">음식 알레르기가 있다면 모두 선택해주세요.</p>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 border border-gray05 rounded-md text-sm">없어요</button>
                  <button className="px-4 py-2 border border-gray05 rounded-md text-sm">우유</button>
                  <button className="px-4 py-2 border border-gray05 rounded-md text-sm">대두</button>
                  <button className="px-4 py-2 border border-gray05 rounded-md text-sm">밀</button>
                </div> 
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 border border-gray05 rounded-md text-sm">땅콩</button>
                  <button className="px-4 py-2 border border-gray05 rounded-md text-sm">복숭아</button>
                </div>
              </div>
            </form>
          </section>
        )
      case 5:
        return(
          <div>
            <Image 
              src="/svgs/svg_character01.svg"
              alt="character01"
              width={320}
              height={320}
              priority
            />
          </div>
        )
      default:
        return <div>Invalid Step 😮</div>
    }
  }

  const renderedFooterSection = () => {
    switch(currentStep) {
      case 1:
      case 2:
        return(
          <section className="fixed left-0 bottom-0 w-full h-[96px] flex-all-center">

          <button 
            onClick={goToNextStep}
            className="w-[320px] h-[50px] bg-orange02 rounded-md text-gray06">
            계속하기
          </button>
          </section>
        )  
      case 3:
        return(
          <section className="fixed left-0 bottom-0 w-full h-[96px] flex-all-center">

          <div className="flex items-center space-x-2">
            <button 
              onClick={goToNextStep}
              className="w-[118px] h-[50px] bg-gray01 border border-gray05 rounded-md text-gray06">
              나중에 입력
            </button>
            <button 
              onClick={goToNextStep}
              className="w-[194px] h-[50px] bg-orange02 rounded-md text-gray06">
              마지막페이지로
            </button>
          </div>
          </section>
        )
      case 4:
        return(
          <section className="fixed left-0 bottom-0 w-full h-[96px] flex-all-center">
          <div className="flex items-center space-x-2">
            <button 
              onClick={goToNextStep}
              className="w-[118px] h-[50px] bg-gray01 border border-gray05 rounded-md text-gray06">
              나중에 입력
            </button>
            <button 
              onClick={goToNextStep}
              className="w-[194px] h-[50px] bg-orange02 rounded-md text-gray06">
              라떼핏과 함께 해요!
            </button>
          </div>
          </section>
        )
      case 5:
        return(
          <section className="fixed left-0 bottom-0 w-full h-[96px] flex-all-center">
          <button 
            onClick={goToNextStep}
            className="w-[320px] h-[50px] bg-orange02 rounded-md text-gray06">
            라떼핏 바로가기
          </button>
          </section>
        )
      default:
        return <div>Invalid Step 😮</div>
    }
  }

  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen flex flex-col relative">
        {renderedHeaderSection()}
        {/* line 들어갈 공간 2px*/}
        {renderedTitleSection()}
        {renderedContentsSection()}
        {renderedFooterSection()}
      </div>
    </div>
  )
}
