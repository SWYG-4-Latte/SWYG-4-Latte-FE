'use client'
// NEXT
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
// Zustand
import useLoginStore from "@/store/loginStore"
import { Span } from "next/dist/trace"


export default function LoginContainer() {
  const { username, password, setUsername, setPassword } = useLoginStore();

  const [usernameError, setUsernameError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const usernameRegex = /^[A-Za-z0-9]{6,12}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,18}$/
  const isInputValid = usernameRegex.test(username) && passwordRegex.test(password);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const { value } = e.target;
    if ( type === 'username') {
      setUsername(value)
      setUsernameError(value ? (usernameRegex.test(value) ? null : '6-12자 이내의 숫자와 영문을 조합해주세요.') : '아이디를 입력해주세요');
    } else { 
      setPassword(value)
      setPasswordError(value ? (passwordRegex.test(value) ? null : '10자 이상의 영어 소문자, 숫자, 특수문자를 조합해주세요.') : '비밀번호를 입력해주세요');
    }
  }
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isUsernameValid = usernameRegex.test(username)
    const isPasswordValid = passwordRegex.test(password)
    
    if(!isUsernameValid) {
      setUsernameError('6-12자 이내의 숫자와 영문을 조합해주세요.')
    }

    if(!isPasswordValid) {
      setPasswordError('10자 이상의 영어 소문자, 숫자, 특수문자를 조합해주세요.')
    }

    if(isUsernameValid && isPasswordValid) {
      console.log('Login Success')
    } else {
      console.log('Invalid username or passwor')
    }
  }


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
              placeholder="아이디"
              className={`px-5 py-4 w-[320px] h-[50px] rounded-md text-[14px] bg-gray01 border ${usernameError ? 'border-primaryRed' : 'border-gray05'} placeholder:text-gray05 focus:${usernameError ? 'outline-primaryRed' : 'outline-primaryOrange'}`}
              style={usernameError ? { outline: '0.5px solid #EB5252' } : {}}
            />
            { usernameError &&  <p className="mt-2 text-xs text-primaryRed">{usernameError}</p> }
          </div>
          <div>
            <input 
              type="password"
              value={password}
              onChange={(e) => handleInputChange(e, 'password')}
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
