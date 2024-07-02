'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import useLoginStore from '@/store/loginStore';

import { login } from '@/utils/auth-signup/isLogin';
import Input from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import { validateId, validatePassword } from '@/utils/validation';
import { INPUT_MESSAGE } from '@/constants/message';
import useInput from '@/hooks/useInput';

export default function LoginContainer() {
  const router = useRouter();

  const { setLogin, setUserInfo } = useLoginStore();

  const { value: id, hasError: idHasError, handleInputChange: handleIdChange } = useInput('', validateId);
  const {
    value: password,
    hasError: passwordHasError,
    handleInputChange: handlePasswordChange,
  } = useInput('', validatePassword);

  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const handleBackMove = () => {
    router.push('/home');
  };

  const isInputValid = id.trim() !== '' && password.trim() !== '' && !idHasError && !passwordHasError;

  const passwordErrorMessage =
    passwordHasError && (password.trim() === '' ? INPUT_MESSAGE.PASSWORD.EMPTY : INPUT_MESSAGE.PASSWORD.INVALID);
  const idErrorMessage = idHasError && (id.trim() === '' ? INPUT_MESSAGE.ID.EMPTY : INPUT_MESSAGE.ID.INVALID);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'user-id') {
      handleIdChange(e);
    } else {
      handlePasswordChange(e);
    }

    if (loginErrorMessage !== '') {
      setLoginErrorMessage('');
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data, message } = await login(id, password);

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
            id="user-id"
            type="text"
            value={id}
            onChange={handleInputChange}
            placeholder="아이디"
            error={idErrorMessage}
          />

          <Input
            id="password"
            type="password"
            value={password}
            onChange={handleInputChange}
            placeholder="비밀번호"
            error={passwordErrorMessage || loginErrorMessage}
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
