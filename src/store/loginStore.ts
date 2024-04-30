// Zustand
import { create } from "zustand";
// TS
import { ILoginState } from './../types/auth-login/i-LoginState';

const useLoginStore = create<ILoginState>((set) => ({
  username: '',
  password: '',
  usernameError: null,
  passwordError: null,
  usernameFocused: false,
  passwordFocused: false,

  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setUsernameFocused: (focused) => set({ usernameFocused: focused }),
  setPasswordFocused: (focused) => set({ passwordFocused: focused }),

  validateUsername: (username) => {
    const usernameRegex = /^[A-Za-z0-9]{6,12}$/;
    let error = null;
    if (!username) {
      error = '아이디를 입력해주세요';
    } else if (!usernameRegex.test(username)) {
      error = '6-12자 이내의 숫자와 영문을 조합해주세요';
    }
    set({ usernameError: error });
  },
  validatePassword: (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,18}$/;
    let error = null;
    if (!password) {
      error = '비밀번호를 입력해주세요';
    } else if (!passwordRegex.test(password)) {
      error = '10자 이상의 영어 소문자, 숫자, 특수문자를 조합해주세요.';
    }
    set({ passwordError: error });
  }
}));

export default useLoginStore