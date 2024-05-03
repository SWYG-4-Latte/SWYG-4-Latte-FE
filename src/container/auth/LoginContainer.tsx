'use client'
// NEXT
import Image from "next/image"
import Link from "next/link"
//Libary
import React, { } from "react"
import axios from "axios"
// Zustand
import useLoginStore from "@/store/loginStore"
// Hook
import { login } from "@/utils/auth-signup/isLogin"


export default function LoginContainer() {
  const {
    username, password, setUsername, setPassword,
    usernameError, passwordError, usernameFocused, passwordFocused,
    setUsernameFocused, setPasswordFocused, validateUsername, validatePassword,
    setToken
  } = useLoginStore();

  
  const isInputValid = username.trim() !== '' && password.trim() !== '';

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


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      console.log(response.data.jwtToken)
      console.log(response.data.jwtToken.accessToken)

      if (response.data.jwtToken && response.data.jwtToken.accessToken) {
        setToken(response.data.jwtToken.accessToken);
        console.log("Login Success");
        alert("로그인에 성공하였습니다.")
      } else {
        console.error("Login Failed: ", response.data.message);
        alert("로그인에 실패하였습니다.")
      }
    } catch (error) {
      console.error("Login Error", error);
    }
  };

  return (
    <div className="w-full h-screen text-gray10 px-5">
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
              className={`px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] text-gray10 bg-gray01 placeholder:text-gray05 outline-none
                          border ${usernameError ? 'border-primaryRed' : (usernameFocused ? 'border-primaryOrange' : 'border-gray05')}
                        `}
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
              className={`px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] text-gray10 bg-gray01 placeholder:text-gray05 outline-none
                          border ${passwordError ? 'border-primaryRed' : (passwordFocused ? 'border-primaryOrange' : 'border-gray05')}
            `}
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