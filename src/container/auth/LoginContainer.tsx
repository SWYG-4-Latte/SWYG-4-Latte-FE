'use client';

import Image from 'next/image';
import Link from 'next/link';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useLoginStore from '@/store/loginStore';
import useSignupStore from '@/store/signupStore';

import { login } from '@/utils/auth-signup/isLogin';
import Input from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';

export default function LoginContainer() {
  const router = useRouter();

  const {
    username,
    password,
    setUsername,
    setPassword,
    usernameError,
    passwordError,
    usernameFocused,
    passwordFocused,
    setUsernameFocused,
    setPasswordFocused,
    validateUsername,
    validatePassword,
    setLogin,
    setUserInfo,
    clearIdentity,
  } = useLoginStore();

  const { loadUserInfo } = useSignupStore();

  const handleBackMove = () => {
    router.push('/home');
  };

  useEffect(() => {
    clearIdentity();
  }, [clearIdentity]);

  const isInputValid = username.trim() !== '' && password.trim() !== '' && !usernameError && !passwordError;

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
        const { nickname, mbrNo } = response;
        setLogin(response.jwtToken.accessToken, response.jwtToken.refreshToken);
        setUserInfo({ nickname, mbrNo }); // 사용자 정보 설정
        loadUserInfo({ nickname, mbrNo }); // 사용자 정보 로드

        alert('로그인에 성공하였습니다.');
        router.push('/home');
      } else {
        console.error('Login Failed: ', response.message);
        alert(`로그인 실패: ${response.message}`);
      }
    } catch (error) {
      console.error('Login Error', error);
      alert(`로그인 오류: ${error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.'}`);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center px-5 text-gray10">
      <section className="flex-i-center h-[54px] w-full">
        <Image
          onClick={handleBackMove}
          className="cursor-pointer"
          src="/svgs/svg_leftArrow.svg"
          alt="letfArrow"
          width={24}
          height={24}
          priority
          unoptimized
        />
      </section>
      <section className="flex-all-center mb-4 mt-8">
        <h1 className="text-center font-medium leading-snug">
          나에게 핏한 카페인 관리 <br />
          라떼핏의 조언 한 잔으로 시작해요
        </h1>
      </section>
      <section className="flex-all-center mb-10">
        <Image src="/svgs/svg_logo.svg" alt="logo" width={360} height={80} priority unoptimized />
      </section>
      <section className="mb-6 w-full">
        <form onSubmit={handleLogin} className="flex w-full flex-col">
          <Input
            type="text"
            value={username}
            onChange={(e) => handleInputChange(e, 'username')}
            placeholder="아이디"
            error={usernameError}
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => handleInputChange(e, 'password')}
            placeholder="비밀번호"
            error={passwordError}
          />

          <Button disabled={!isInputValid} className="h-[50px] rounded-lg font-semibold">
            로그인
          </Button>
        </form>
      </section>
      <section>
        <div className="flex-all-center px-2 text-xs">
          <Link href="/auth/find/id">아이디 찾기</Link>
          <div className="mx-4 h-[12px] w-[1px] border-l border-gray06" />
          <Link href="/auth/find/password">비밀번호 찾기</Link>
          <div className="mx-4 h-[12px] w-[1px] border-l border-gray06" />
          <Link href="/auth/signup">회원가입</Link>
        </div>
      </section>
    </div>
  );
}
