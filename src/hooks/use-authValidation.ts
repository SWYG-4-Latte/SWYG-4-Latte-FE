import { useState } from "react";

export default function useAuthValidation() {
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [usernameFocused, setUsernameFocused] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);

  const validateUsername = (value: string) => {
    const usernameRegex = /^[A-Za-z0-9]{6,12}$/;
    setUsernameError(value ? (usernameRegex.test(value) ? null : '6-12자 이내의 숫자와 영문을 조합해주세요.') : '아이디를 입력해주세요');
  };

  const validatePassword = (value: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,18}$/;
    setPasswordError(value ? (passwordRegex.test(value) ? null : '10자 이상의 영어 소문자, 숫자, 특수문자를 조합해주세요.') : '비밀번호를 입력해주세요');
  };

  return { usernameError, passwordError, validateUsername, validatePassword, usernameFocused, setUsernameFocused, passwordFocused, setPasswordFocused };
}

