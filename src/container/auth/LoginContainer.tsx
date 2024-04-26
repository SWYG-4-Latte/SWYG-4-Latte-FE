'use client'
// NEXT
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
// Zustand
import useLoginStore from "@/store/loginStore"
// Hook
import useAuthValidation from "@/hooks/use-authValidation"


export default function LoginContainer() {
  const { username, password, setUsername, setPassword } = useLoginStore();
  const { usernameError, passwordError, validateUsername, validatePassword, usernameFocused, setUsernameFocused, passwordFocused, setPasswordFocused } = useAuthValidation();
  const isInputValid = !usernameError && !passwordError;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const { value } = e.target;
    if (type === 'username') {
      setUsername(value);
      validateUsername(value);
    } else {
      setPassword(value);
      validatePassword(value);
    }
  };

  const handleFocusChange = (type: string, focused: boolean) => {
    if (type === 'username') {
      setUsernameFocused(focused);
    } else {
      setPasswordFocused(focused);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isInputValid ? 'Login Success' : 'Invalid username or password');
  };

  return (
    <div className="w-full h-screen">
      <section className="flex-i-center w-full h-[54px]">
        <Image
          src="/svgs/svg_leftArrow.svg"
          alt="letfArrow"
          width={24}
          height={24}
          priority
          unoptimized
        />
      </section>
      <section className="mt-8 mb-6 flex-all-center">
        <Image 
          src="/svgs/svg_logo.svg"
          alt="logo"
          width={155}
          height={64}
          priority
          unoptimized
        />
      </section>
      <section className="mb-8 flex-all-center">
        <h1 className="font-pretendard">카페인 관리를 위한 조언 한 잔</h1>
      </section>
      <section className="mb-6">
        <form
          onSubmit={handleLogin} 
          className="space-y-4">
          <div>
            <input 
              type="text"
              value={username}
              onChange={(e) => handleInputChange(e, 'username')}
              onFocus={() => handleFocusChange('username', true)}
              onBlur={() => handleFocusChange('username', false)}
              placeholder="아이디"
              className={`px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] bg-gray01 border ${usernameError ? 'border-primaryRed' : 'border-gray05'} placeholder:text-gray05 focus:${usernameError ? 'outline-primaryRed' : 'outline-primaryOrange'}`}
              style={usernameError && usernameFocused ? { outline: '0.5px solid #EB5252' } : {}}
            />
            { usernameError &&  <p className="mt-2 text-xs text-primaryRed">{usernameError}</p> }
          </div>
          <div>
            <input 
              type="password"
              value={password}
              onChange={(e) => handleInputChange(e, 'password')}
              onFocus={() => handleFocusChange('password', true)}
              onBlur={() => handleFocusChange('password', false)}
              placeholder="비밀번호"
              className={`px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] bg-gray01 border ${passwordError ? 'border-primaryRed' : 'border-gray05'} placeholder:text-gray05 focus:${passwordError ? 'outline-primaryRed' : 'outline-primaryOrange'}`}
              style={passwordError ? { outline: '0.5px solid #EB5252' } : {}}
            />
            { passwordError && <span className="mt-2 text-xs text-primaryRed">{passwordError}</span>}
          </div>
          <button className={`w-[320px] h-[50px] rounded-md text-gray06 ${isInputValid ? 'bg-primaryOrange text-gray10 ': 'bg-orange02 text-gray06'}`}>로그인</button>
        </form>
      </section>
      <section>
        <div className="flex-all-center text-xs px-2">
          <div >아이디찾기</div>
          <div className="mx-4 w-[1px] h-[12px] border-l border-gray06"/>
          <div >비밀번호찾기</div>
          <div className="mx-4 w-[1px] h-[12px] border-l border-gray06"/>
          <div >
            <Link href="/auth/signup">
              회원가입
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
