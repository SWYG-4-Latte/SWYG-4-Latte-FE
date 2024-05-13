'use client'
// NEXT
import Image from "next/image"
import Link from "next/link"
//Libary
import React, { } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
// Zustand
import useLoginStore from "@/store/loginStore"
// Hook
import { login } from "@/utils/auth-signup/isLogin"


export default function LoginContainer() {
  const router = useRouter();

  const {
    username, password, setUsername, setPassword,
    usernameError, passwordError, usernameFocused, passwordFocused,
    setUsernameFocused, setPasswordFocused, validateUsername, validatePassword,
    setLogin, isLoggedIn
  } = useLoginStore();

  const handleBackMove = () => {
    router.back()
  }
  
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
    if (!username.trim() || !password.trim()) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
  
    try {
      const response = await login(username, password);
  
      if (response.jwtToken && response.jwtToken.accessToken) {
        // JWT 토큰을 로컬 스토리지에 저장
        // localStorage.setItem('accessToken', response.jwtToken.accessToken);
        // localStorage.setItem('refreshToken', response.jwtToken.refreshToken);
        setLogin(response.jwtToken.accessToken, response.jwtToken.refreshToken)
        console.log("Login Success");
        alert("로그인에 성공하였습니다.");
        router.push('/home');
      }
      else {
        console.error("Login Failed: ", response.message);
        alert(`로그인 실패: ${response.message}`);
      }
    } catch (error) {
      console.error("Login Error", error);
      alert(`로그인 오류: ${error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.'}`);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen text-gray10 px-5">
      <section className="max-w-[360px] flex-i-center w-full h-[54px]">
        <Image
          onClick={handleBackMove}
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
          <div className="flex flex-col justify-center">
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
          <div className="flex flex-col justify-center">
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
