'use client';

import { useState } from 'react';

import apiInstance from '@/api/instance';
import FooterGradientButton from '@/components/common/button/FooterGradientButton';
import InputCheckButton from '@/components/common/button/InputCheckButton';
import Input from '@/components/common/input/Input';
import ChangePasswordSuccessModal from '@/components/common/modal/ChangePasswordSuccessModal';
import useInput from '@/hooks/useInput';
import useTimer from '@/hooks/useTimer';
import { validateEmail, validateId, validatePassword } from '@/utils/validation';
import { INPUT_MESSAGE } from '@/constants/message';

const FindPasswordContainer = () => {
  const {
    value: idValue,
    handleInputChange: handleIdChange,
    isValid: idIsValid,
    hasError: idHasError,
  } = useInput('', validateId);

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    isValid: emailIsValid,
    hasError: emailHasError,
  } = useInput('', validateEmail);

  const {
    value: passwordValue,
    handleInputChange: handlePasswordInputChange,
    isValid: passwordIsValid,
    hasError: passwordHasError,
  } = useInput('', validatePassword);

  const [confirmPassword, setConfirmPassword] = useState('');

  const [verification, setVerification] = useState({
    inputValue: '',
    inputMsg: '',
    isValid: false,
    sent: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setTimer, stopTimer, remainingTime, formattedTime } = useTimer();

  const isPasswordSame = passwordValue.trim() !== '' && passwordValue === confirmPassword;

  const idInputErrorMessage = idHasError && (idValue.trim() === '' ? INPUT_MESSAGE.ID.EMPTY : INPUT_MESSAGE.ID.INVALID);

  const emailInputErrorMessage =
    emailHasError && (emailValue.trim() === '' ? INPUT_MESSAGE.EMAIL.EMPTY : INPUT_MESSAGE.EMAIL.INVALID);

  const passwordInputErrorMessage =
    passwordHasError && (passwordValue.trim() === '' ? INPUT_MESSAGE.PASSWORD.EMPTY : INPUT_MESSAGE.PASSWORD.INVALID);

  const handleSendEmail = async () => {
    setTimer();
    /** API 수정 요청 예정 */
    try {
      const { data } = await apiInstance.post('/auth/findPw', null, {
        params: {
          mbrId: idValue,
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

  const handleChangePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    // 인증 완료 후 mbrNo 받아오는 API 필요
    try {
      await apiInstance.post('/auth/update_pw', null, {
        params: {
          mbrNo: 1,
          password: passwordValue,
        },
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyCode = async () => {
    if (remainingTime === 0) {
      setVerification((prev) => ({
        ...prev,
        inputMsg: '입력 시간이 초과되었습니다. 다시 인증해주세요.',
        isValid: false,
      }));
      return;
    }

    // TODO: 인증번호 일치 여부. 검사 추가하기
    try {
      const data = await apiInstance.post('/auth/verifyCode', null, {
        params: {
          email: emailValue,
          code: verification.inputValue,
        },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleChangePassword}>
      <Input
        id="user-id"
        label="아이디"
        placeholder="아이디를 입력해주세요."
        value={idValue}
        onChange={handleIdChange}
        error={idInputErrorMessage}
      />
      <Input
        type="email"
        id="email"
        label="이메일"
        placeholder="ex) latte@example.com"
        value={emailValue}
        onChange={handleEmailChange}
        success={verification.sent && INPUT_MESSAGE.VERIFICATION.SENT}
        error={emailInputErrorMessage}
      >
        <InputCheckButton disabled={!emailIsValid || !idIsValid} onClick={handleSendEmail}>
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
          <span className="absolute right-[100px] text-[14px] text-gray06">{formattedTime}</span>
          <InputCheckButton disabled={!verification.inputValue || !emailIsValid} onClick={handleVerifyCode}>
            확인
          </InputCheckButton>
        </Input>
      )}

      {!verification.isValid && (
        <>
          <Input
            type="password"
            id="password"
            label="비밀번호 재설정"
            placeholder="비밀번호(8자 이상, 영어 소문자/숫자/특문) 조합"
            value={passwordValue}
            onChange={handlePasswordInputChange}
            error={passwordInputErrorMessage}
          />
          <Input
            type="password"
            id="password-confirm"
            label="비밀번호 확인"
            placeholder="다시 한번 입력해주세요."
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            error={confirmPassword.trim() !== '' && !isPasswordSame && INPUT_MESSAGE.PASSWORD.MISMATCH}
          />
        </>
      )}

      <FooterGradientButton type="submit" disabled={!isPasswordSame || !passwordIsValid}>
        비밀번호 변경하기
      </FooterGradientButton>
      {isModalOpen && <ChangePasswordSuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </form>
  );
};

export default FindPasswordContainer;
