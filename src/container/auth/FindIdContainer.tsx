'use client';

import { useState } from 'react';

import apiInstance from '@/api/instance';
import FooterGradientButton from '@/components/common/button/FooterGradientButton';
import InputCheckButton from '@/components/common/button/InputCheckButton';
import Input from '@/components/common/input/Input';
import useInput from '@/hooks/useInput';
import { validateEmail } from '@/utils/validation';
import useTimer from '@/hooks/useTimer';
import FindIdResultContainer from './FindIdResultContainer';
import { INPUT_MESSAGE } from '@/constants/message';

const FindIdContainer = () => {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    isValid: emailIsValid,
    hasError: emailHasError,
  } = useInput('', validateEmail);

  const { setTimer, stopTimer, remainingTime, formattedTime } = useTimer();

  const [verification, setVerification] = useState({
    inputValue: '',
    inputMsg: '',
    isValid: false,
    sent: false,
  });
  const [userId, setUserId] = useState('');
  const [hasResult, setHasResult] = useState(false);

  const emailErrorMessage =
    emailHasError && (emailValue.trim() === '' ? INPUT_MESSAGE.EMAIL.EMPTY : INPUT_MESSAGE.EMAIL.INVALID);

  const findIdButtonIsValid = !emailHasError && verification.isValid;

  const handleSendEmail = async () => {
    setTimer();
    /** API 수정 요청 예정 */
    try {
      const { data } = await apiInstance.post('/auth/findId', null, {
        params: {
          email: emailValue,
        },
      });
      setVerification((prev) => ({
        ...prev,
        sent: true,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyCode = () => {
    if (remainingTime === 0) {
      setVerification((prev) => ({
        ...prev,
        inputMsg: '입력 시간이 초과되었습니다. 다시 인증해주세요.',
        isValid: false,
      }));
      return;
    }

    // TODO: 인증번호 일치 여부. 검사 추가하기
  };

  const handleFindId = (event: React.MouseEvent) => {
    event.preventDefault();
    setHasResult(true);
  };

  if (hasResult) {
    return <FindIdResultContainer id={userId} />;
  }

  return (
    <form>
      <Input
        type="email"
        id="email"
        label="이메일"
        placeholder="ex) latte@example.com"
        value={emailValue}
        onChange={handleEmailChange}
        success={verification.sent && '인증번호가 전송되었습니다. 이메일을 확인해주세요.'}
        error={emailErrorMessage}
      >
        <InputCheckButton disabled={!emailIsValid} onClick={handleSendEmail}>
          인증하기
        </InputCheckButton>
      </Input>

      {verification.sent && (
        <Input
          inputMode="numeric"
          id="verification-number"
          label="인증번호"
          placeholder="인증번호 입력"
          disabled={!emailIsValid}
          value={verification.inputValue}
          onChange={(e) =>
            setVerification((prev) => ({
              ...prev,
              inputValue: e.target.value,
            }))
          }
          success={verification.isValid && verification.inputMsg}
          error={!verification.isValid && verification.inputMsg}
        >
          {verification.sent && <span className="absolute right-[100px] text-[14px] text-gray06">{formattedTime}</span>}
          <InputCheckButton disabled={!verification.inputValue || !emailIsValid} onClick={handleVerifyCode}>
            확인
          </InputCheckButton>
        </Input>
      )}

      <FooterGradientButton disabled={!findIdButtonIsValid} onClick={handleFindId}>
        아이디 찾기
      </FooterGradientButton>
    </form>
  );
};

export default FindIdContainer;
