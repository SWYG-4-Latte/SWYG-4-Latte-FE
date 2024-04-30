'use client'
// NEXT && React
import Image from "next/image"
import React, { useState } from "react";
// TS
import { ISignupState } from "@/types/auth-signup/i-SignupState";
import { IGenderState } from "@/types/auth-signup/i-GenderState";
// Zustand
import useSignupStore from '@/store/signupStore'
// Hook

export default function ContentsSection() {
  const [gender, setGender] = useState<IGenderState['gender']>('')

  const {
    username, setUsername, validateUsername, usernameError, usernameFocused, setUsernameFocused,
    email, setEmail, validateEmail, emailError, emailFocused, setEmailFocused,
    nickname, setNickname, validateNickname, nicknameError, nicknameFocused, setNicknameFocused,
    currentStep 
  } = useSignupStore()

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'username':
        setUsername(value);
        validateUsername(value);
        break;
      case 'email':
        setEmail(value);
        validateEmail(value);
        break;
      case 'nickname':
        setNickname(value);
        validateNickname(value);
        break;
    }
  };

  const handleFocusChange = (field: string, focused: boolean) => {
    switch (field) {
      case 'username':
        setUsernameFocused(focused);
        break;
      case 'email':
        setEmailFocused(focused);
        break;
      case 'nickname':
        setNicknameFocused(focused);
        break;
    }
  };


  const handleGenderSelect = (selectGender: IGenderState['gender']) => {
    setGender(selectGender)
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
                  value={username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  onFocus={() => handleFocusChange('username', true)}
                  onBlur={() => handleFocusChange('username', false)}
                  placeholder="아이디(6~12자 이내, 숫자/영문조합)"
                  className={`px-5 py-4 w-[236px] h-[50px] rounded-md text-[14px] placeholder:tracking-tighter bg-gray01 outline-none text-gray10
                              border ${usernameError ? 'border-primaryRed' : (usernameFocused ? 'border-primaryOrange' : 'border-gray05')} placeholder:text-gray05`}
                />
            <button
                  className={`w-[76px] h-[50px] rounded-md 
                  ${username ? "bg-gray09 text-gray00" : "bg-gray04 text-gray06"}`}
            >
                중복확인
              </button>
              { usernameError &&  <p className="mt-2 text-xs text-primaryRed">{usernameError}</p> }
            </div>
            <p className="text-xs">이메일</p>
            <div >
            <input 
                  type="email"
                  value={email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onFocus={() => handleFocusChange('email', true)}
                  onBlur={() => handleFocusChange('email', false)}
                  placeholder="ex) latte@example.com"
                  className={`px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] bg-gray01 outline-none text-gray10
                              border ${emailError ? 'border-primaryRed' : (emailFocused ? 'border-primaryOrange' : 'border-gray05')} placeholder:text-gray05`}
                />
                { emailError &&  <p className="mt-2 text-xs text-primaryRed">{emailError}</p> }
            </div>
            <p className="text-xs">닉네임</p>
            <div className="space-x-2">
            <input 
                  type="text"
                  value={nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  onFocus={() => handleFocusChange('nickname', true)}
                  onBlur={() => handleFocusChange('nickname', false)}
                  placeholder="한글 3자 이상, 8자 이하"
                  className={`px-5 py-4 w-[236px] h-[50px] rounded-md text-[14px] bg-gray01 outline-none text-gray10
                              border ${nicknameError ? 'border-primaryRed' : (nicknameFocused ? 'border-primaryOrange' : 'border-gray05')} placeholder:text-gray05`}
                />
            <button
                  className={`w-[76px] h-[50px] rounded-md 
                  ${nickname ? "bg-gray09 text-gray00" : "bg-gray04 text-gray06"}`}
            >
                중복확인
              </button>
              { nicknameError &&  <p className="mt-2 text-xs text-primaryRed">{nicknameError}</p> }
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

  return renderedContentsSection()
}
