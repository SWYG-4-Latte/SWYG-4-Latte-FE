import { create } from 'zustand';
import { toast } from 'react-toastify';

import { ILoginState } from './../types/auth-login/i-LoginState';

const useLoginStore = create<ILoginState>((set) => ({
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

  setLogin: (accessToken: any, refreshToken: any) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    set({ accessToken, refreshToken, isLoggedIn: true });
    toast('로그인 되었습니다', {
      toastId: 'login-success',
    });
  },
  setLogout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ accessToken: '', refreshToken: '', isLoggedIn: false });
    toast('로그아웃 되었습니다', {
      toastId: 'logout-success',
    });
  },
  setUserInfo: (userInfo) => {
    const { nickname } = userInfo;
    set({ nickname });
    localStorage.setItem('nickname', nickname);
  },
}));

export default useLoginStore;
