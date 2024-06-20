'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useLoginStore from '@/store/loginStore';

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

  const [loginErrorMessage, setLoginErrorMessage] = useState('');

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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data, message } = await login(username, password);

      if (data.jwtToken && data.jwtToken.accessToken) {
        const { nickname, mbrNo } = data;
        setLogin(data.jwtToken.accessToken, data.jwtToken.refreshToken);
        setUserInfo({ nickname, mbrNo }); // 사용자 정보 설정

        router.push('/home');
      } else {
        setLoginErrorMessage(message);
      }
    } catch (error) {
      console.error('Login Error', error);
    }
  };

  useEffect(() => {
    setLoginErrorMessage('');
  }, [password, username]);

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
            error={passwordError || loginErrorMessage}
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
