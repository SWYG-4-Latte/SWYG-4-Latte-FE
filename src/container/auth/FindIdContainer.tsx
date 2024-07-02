'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import apiInstance from '@/api/instance';
import FooterGradientButton from '@/components/common/button/FooterGradientButton';
import InputCheckButton from '@/components/common/button/InputCheckButton';
import Input from '@/components/common/input/Input';
import useInput from '@/hooks/useInput';
import { validateEmail } from '@/utils/validation';
import { INPUT_MESSAGE } from '@/constants/message';

const FindIdContainer = () => {
  const router = useRouter();

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    isValid: emailIsValid,
    hasError: emailHasError,
  } = useInput('', validateEmail);

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendEmail = async () => {
    try {
      await apiInstance.post('/auth/findId', null, {
        params: {
          email: emailValue,
        },
      });

      setIsEmailSent(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        setErrorMessage(message);
      }
    }
  };

  useEffect(() => {
    if (emailHasError) {
      setErrorMessage(emailValue.trim() === '' ? INPUT_MESSAGE.EMAIL.EMPTY : INPUT_MESSAGE.EMAIL.INVALID);
    } else {
      setErrorMessage('');
    }
  }, [emailHasError, emailValue]);

  return (
    <form>
      <Input
        type="email"
        id="email"
        label="이메일"
        placeholder="ex) latte@example.com"
        value={emailValue}
        onChange={handleEmailChange}
        success={isEmailSent && INPUT_MESSAGE.ID.SENT}
        error={errorMessage}
      >
        <InputCheckButton disabled={!emailIsValid} onClick={handleSendEmail}>
          전송하기
        </InputCheckButton>
      </Input>

      <FooterGradientButton
        type="button"
        disabled={!isEmailSent || emailHasError}
        onClick={() => router.push('/auth/login')}
      >
        로그인 하러가기
      </FooterGradientButton>
    </form>
  );
};

export default FindIdContainer;
