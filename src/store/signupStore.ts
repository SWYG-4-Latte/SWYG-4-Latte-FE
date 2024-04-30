// Zustand
import { create } from "zustand";
// TypeScript
import { ISignupState } from '../types/auth-signup/i-SignupState';

const useSignupStore = create<ISignupState>((set, get)=> ({
  // 상태
  username: '',
  email: '',
  nickname: '',
  usernameError: null,
  emailError: null,
  nicknameError: null,
  usernameFocused: false,
  emailFocused: false,
  nicknameFocused: false,
  currentStep: 1,

  // 상태 업데이트 메소드
  setUsername: (username: string) => set({ username }),
  setEmail: (email: string) => set({ email }),
  setNickname: (nickname: string) => set({ nickname }),
  setUsernameFocused: (focused: boolean) => set({ usernameFocused: focused }),
  setEmailFocused: (focused: boolean) => set({ emailFocused: focused }),
  setNicknameFocused: (focused: boolean) => set({ nicknameFocused: focused }),

  // 유효성 검사 메소드
  validateUsername: (username: string) => {
    if (!username) {
      set({ usernameError: '아이디를 입력해주세요' });
      return;
    }
    if (!/^[A-Za-z0-9]{6,12}$/.test(username)) {
      set({ usernameError: '6-12자 이내의 숫자와 영문을 조합해주세요' });
      return;
    }
    // 중복 검사 로직을 바로 여기에 포함시키거나 별도의 API 호출로 구현
    set({ usernameError: null });
  },

  validateEmail: (email: string) => {
    if (!email) {
      set({ emailError: '이메일을 입력해주세요' });
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      set({ emailError: '올바르지 않은 이메일 형식입니다' });
      return;
    }
    // 중복 검사 로직을 바로 여기에 포함시키거나 별도의 API 호출로 구현
    set({ emailError: null });
  },

  validateNickname: (nickname: string) => {
    if (!nickname) {
      set({ nicknameError: '닉네임을 입력해주세요' });
      return;
    }
    if (!/^[A-Za-z0-9가-힣_]{2,10}$/.test(nickname)) {
      set({ nicknameError: '한글 3자 이상, 8자 이하로 입력해주세요.' });
      return;
    }
    // 중복 검사 로직을 바로 여기에 포함시키거나 별도의 API 호출로 구현
    set({ nicknameError: null });
  },

  goToNextStep: () => set((state: any) => ({ 
    currentStep: state.currentStep < 5 ? state.currentStep + 1 : 5
  })),
  goToPrevStep: () => set((state: any) => ({ 
    currentStep: state.currentStep > 1 ? state.currentStep - 1  : 1
  }))
}))

export default useSignupStore;