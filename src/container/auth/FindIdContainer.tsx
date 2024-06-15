'use client';

import { useState } from 'react';

import apiInstance from '@/api/instance';
import FooterGradientButton from '@/components/common/button/FooterGradientButton';
import InputCheckButton from '@/components/common/button/InputCheckButton';
import Input from '@/components/common/input/Input';
import useInput from '@/hooks/useInput';
import { validateEmail, validateNickname } from '@/utils/validation';
import useTimer from '@/hooks/useTimer';

const FindIdContainer = () => {
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

  const [codeValue, setCodeValue] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeInputMsg, setCodeInputMsg] = useState('');
  const [codeIsValid, setCodeIsValid] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const { setTimer, stopTimer, remainingTime, formattedTime } = useTimer();

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
      setCodeSent(true);
      setVerificationCode(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyCode = () => {
    if (remainingTime === 0) {
      setCodeInputMsg('입력 시간이 초과되었습니다. 다시 인증해주세요.');
      setCodeIsValid(false);
      return;
    }

    if (verificationCode === codeValue) {
      setCodeInputMsg('인증이 완료되었습니다.');
      setCodeIsValid(true);
      stopTimer();
    } else {
      setCodeInputMsg('인증번호가 일치하지 않습니다.');
      setCodeIsValid(false);
    }
  };

  const findIdButtonIsValid = nameIsValid && emailIsValid && codeIsValid;

  return (
    <section className="mx-5 pt-[104px]">
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
          bottomMessage={verificationCode && '인증번호가 전송되었습니다. 이메일을 확인해주세요.'}
          error={emailValue && !emailIsValid && '올바르지 않은 이메일 형식입니다.'}
        >
          <InputCheckButton disabled={!emailIsValid || !nameIsValid} onClick={handleSendEmail}>
            인증하기
          </InputCheckButton>
        </Input>

        {codeSent && (
          <Input
            inputMode="numeric"
            id="verification-number"
            label="인증번호"
            placeholder="인증번호 입력"
            disabled={!emailIsValid}
            value={codeValue}
            onChange={(e) => setCodeValue(e.target.value)}
            bottomMessage={codeIsValid && codeInputMsg}
            error={!codeIsValid && codeInputMsg}
          >
            {codeSent && <span className="absolute right-[100px] text-[14px] text-gray06">{formattedTime}</span>}
            <InputCheckButton disabled={!codeValue || !emailIsValid || !codeSent} onClick={handleVerifyCode}>
              확인
            </InputCheckButton>
          </Input>
        )}

        <FooterGradientButton disabled={!findIdButtonIsValid}>아이디 찾기</FooterGradientButton>
      </form>
    </section>
  );
};

export default FindIdContainer;
