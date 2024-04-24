'use client'
//NEXT
import Image from "next/image"
import Link from "next/link"
//TS
import { ISignupState } from "@/types/member-signup/i-SignupState";
//Zustand
import useSignupStore from "@/store/signupStore"


export default function SignupContainer() {
  const { currentStep, goToNextStep, setField } = useSignupStore();

  const handleInputChange = <T extends keyof ISignupState>(field: T, value: ISignupState[T]) => {
    setField(field, value)
  }

  const renderedSectionStep = () => {
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
          <div>Section2</div>
        )
      case 3:
        return(
          <div>Section3</div>
        )
      case 4:
        return(
          <div>Section4</div>
        )
      default:
        return <div>Invalid Step 😮</div>
    }
  }

  return (
    <div className="w-full h-screen px-5 ">
      <div className="w-full h-screen flex flex-col relative">
        <section className="flex items-center justify-between w-full h-[54px]">
          <Link href="/member/login">
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
        {/* line 들어갈 공간 2px*/}
        <section className="mt-8 mb-[72px]">
          <h1 className="w-[261px] h-15 font-pretendard600 text-[22px] leading-[30px] tracking-tight">
            오늘 마신 커피에 카페인이 <br/> 얼마나 있었는지 알려드릴게요.
          </h1>
        </section>
        {/* Section State 01-04 */}
        {/* {renderedSectionStep()} */}
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
        <section className="fixed left-0 bottom-0 w-full h-[96px] flex-all-center">
          <button 
            onClick={goToNextStep}
            className="w-[320px] h-[50px] bg-orange02 rounded-md text-gray06">
            계속하기
          </button>
        </section>
      </div>
    </div>
  )
}
