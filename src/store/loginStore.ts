// Zustand
import { create } from "zustand";
// TS
import { ILoginState } from './../types/auth-login/i-LoginState';
import { toast } from "react-toastify";

const useLoginStore = create<ILoginState>((set) => ({
  username: '',
  password: '',
  usernameError: null,
  passwordError: null,
  usernameFocused: false,
  passwordFocused: false,
  accessToken: '',
  refreshToken: '',
  isLoggedIn: false,
  loginError: null,

  nickname: '',
  gender: '',
  pregnancy: false,
  pregMonth: '', // 임신 개월 수 추가
  caffeineIntake: 0, // 적정 카페인량 추가
  allergies: [],

  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setUsernameFocused: (focused) => set({ usernameFocused: focused }),
  setPasswordFocused: (focused) => set({ passwordFocused: focused }),

  setLogin: (accessToken: any, refreshToken: any) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    set({ accessToken, refreshToken, isLoggedIn: true});
    toast('로그인 되었습니다', {
      toastId: 'login-success'
    })
  },
  setLogout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    set({ accessToken: '', refreshToken: '', isLoggedIn: false})
    toast('로그아웃 되었습니다', {
      toastId: 'logout-success'
    })
  },


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