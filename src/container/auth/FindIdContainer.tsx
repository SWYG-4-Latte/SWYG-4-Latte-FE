'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import apiInstance from '@/api/instance';
import FooterGradientButton from '@/components/common/button/FooterGradientButton';
import InputCheckButton from '@/components/common/button/InputCheckButton';
import Input from '@/components/common/input/Input';
import useInput from '@/hooks/useInput';
import { validateEmail, validateNickname } from '@/utils/validation';
import useTimer from '@/hooks/useTimer';
import FindIdResultContainer from './FindIdResultContainer';

const FindIdContainer = () => {
  const router = useRouter();

  const {
    value: nameValue,
    handleInputChange: handleNameChange,
    isValid: nameIsValid,
  } = useInput('', validateNickname);

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    isValid: emailIsValid,
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

  const handleSendEmail = async () => {
    setTimer();
    /** API 수정 요청 예정 */
    try {
      const { data } = await apiInstance.post('/auth/findId', null, {
        params: {
          email: emailValue,
          nickname: nameValue,
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

  const findIdButtonIsValid = nameIsValid && emailIsValid && verification.isValid;

  if (hasResult) {
    return <FindIdResultContainer id={userId} />;
  }

  return (
    <>
      <form>
        <Input
          id="name"
          label="이름"
          placeholder="이름을 입력해주세요."
          value={nameValue}
          onChange={handleNameChange}
          error={nameValue && !nameIsValid && '올바른 이름을 입력해주세요.'}
        />

        <Input
          type="email"
          id="email"
          label="이메일"
          placeholder="ex) latte@example.com"
          value={emailValue}
          onChange={handleEmailChange}
          bottomMessage={verification.sent && '인증번호가 전송되었습니다. 이메일을 확인해주세요.'}
          error={emailValue && !emailIsValid && '올바르지 않은 이메일 형식입니다.'}
        >
          <InputCheckButton disabled={!emailIsValid || !nameIsValid} onClick={handleSendEmail}>
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
            bottomMessage={verification.isValid && verification.inputMsg}
            error={!verification.isValid && verification.inputMsg}
          >
            {verification.sent && (
              <span className="absolute right-[100px] text-[14px] text-gray06">{formattedTime}</span>
            )}
            <InputCheckButton disabled={!verification.inputValue || !emailIsValid} onClick={handleVerifyCode}>
              확인
            </InputCheckButton>
          </Input>
        )}

        <FooterGradientButton disabled={!findIdButtonIsValid} onClick={handleFindId}>
          아이디 찾기
        </FooterGradientButton>
      </form>
    </>
  );
};

export default FindIdContainer;
