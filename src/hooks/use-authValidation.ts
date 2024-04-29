import { useState } from "react";
import checkDuplicate from '@/utils/auth-signup/check-duplicate'
//TS
import { IAuthValidationState } from './../types/auth-signup/i-AuthValidationState';
import useSignupStore from "@/store/signupStore";


export default function useAuthValidation(enableDuplicateCheck = false): IAuthValidationState {
  const { setField, setValidity } = useSignupStore();

  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [usernameError, setUsernameError] = useState<string | null>('');
  const [passwordError, setPasswordError] = useState<string | null>('');
  const [nicknameError, setNicknameError] = useState<string | null>('');
  const [emailError, setEmailError] = useState<string | null>('');

  const [usernameFocused, setUsernameFocused] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  const [nicknameFocused, setNicknameFocused] = useState<boolean>(false);
  const [emailFocused, setEmailFocused] = useState<boolean>(false);

  const validateUsername = async (value: string) => {
    const usernameRegex = /^[A-Za-z0-9]{6,12}$/;
    let error = null;

    if (!value) {
        error = '아이디를 입력해주세요';
    } else if (!usernameRegex.test(value)) {
        error = '6-12자 이내의 숫자와 영문을 조합해주세요';
    } else if (enableDuplicateCheck) {
        const isDuplicate = await checkDuplicate('username', value);
        error = isDuplicate ? '이미 사용 중인 아이디입니다' : null;
    }

    setUsernameError(error); // 로컬 상태 업데이트
    setField('username', value);
    setValidity('usernameValid', !error); // 에러가 없으면 유효하다고 상태 업데이트
  }

  const validatePassword = (value: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,18}$/;
    setPasswordError(value ? (passwordRegex.test(value) ? null : '10자 이상의 영어 소문자, 숫자, 특수문자를 조합해주세요.') : '비밀번호를 입력해주세요');
  };

  const validateNickname = async (value: string) => {
    setNickname(value);
    const nicknameRegex = /^[A-Za-z0-9가-힣_]{2,10}$/;
    let error = null;

    if (!value) {
        error = '닉네임을 입력해주세요';
    } else if (!nicknameRegex.test(value)) {
        error = '한글 3자 이상, 8자 이하로 입력해주세요.';
    } else if (enableDuplicateCheck) {
        const isDuplicate = await checkDuplicate('nickname', value);
        error = isDuplicate ? '이미 존재하는 닉네임입니다' : null;
    }

    setNicknameError(error);
    setField('nickname', value);
    setValidity('nicknameValid', !error);
};

  const validateEmail = async (value: string) => {
    setEmail(value);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let error = null;

    if (!value) {
        error = '이메일을 입력해주세요';
    } else if (!emailRegex.test(value)) {
        error = '올바르지 않은 이메일 형식입니다';
    } else if (enableDuplicateCheck) {
        const isDuplicate = await checkDuplicate('email', value);
        error = isDuplicate ? '이미 사용 중인 이메일입니다' : null;
    }

    setEmailError(error);
    setField('email', value);
    setValidity('emailValid', !error);
};

  return {
    username, setUsername, usernameError, setUsernameFocused, usernameFocused, validateUsername,
    password, setPassword, passwordError, setPasswordFocused, passwordFocused, validatePassword,
    nickname, setNickname, nicknameError, setNicknameFocused, nicknameFocused, validateNickname,
    email, setEmail, emailError, setEmailFocused, emailFocused, validateEmail
  };
}

