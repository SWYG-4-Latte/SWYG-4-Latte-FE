// Zustand
import { create } from "zustand";
// TypeScript
import { ISignupState } from '../types/auth-signup/i-SignupState';
// API
import { signup } from "@/utils/auth-signup/isSignup";
import  checkDuplicate from '@/utils/auth-signup/isDuplicate';

const useSignupStore = create<ISignupState>((set, get)=> ({
  // Step1 - State
  username: '',
  email: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  age: '',
  gender: '',
  pregnancy: false,
  pregMonth: '',
  cupDay: '',
  symptoms: [],
  allergies: [],

  usernameError: null,
  emailError: null,
  nicknameError: null,
  passwordError: null,
  confirmPasswordError: null,
  ageError: null,
  pregMonthError: null,

  usernameFocused: false,
  emailFocused: false,
  nicknameFocused: false,
  passwordFocused: false,
  confirmPasswordFocused: false,
  ageFocused: false,
  pregMonthFocused: false,

  currentStep: 1,

  //Step2 - State
  termsAgreed: false,
  term1Agreed: false,
  term2Agreed: false,
  termsError: false,

  //Step3 - State


  // 상태 업데이트 메소드
  setUsername: (username: string) => set({ username }),
  setEmail: (email: string) => set({ email }),
  setNickname: (nickname: string) => set({ nickname }),
  setPassword: (password: string) => set({ password }),
  setConfirmPassword: (confirmPassword: string) => set({ confirmPassword }),
  setAge: (age: string) => set({ age }),
  setGender: (gender: 'M' | 'F' | '' ) => set({ gender }),
  setPregMonth: (month: string) => set({ pregMonth: month}),
  togglePregnancy: (pregnancy: boolean) => set({ pregnancy }),
  setCupDay: (cupDay) => set({ cupDay }),

  setUsernameFocused: (focused: boolean) => set({ usernameFocused: focused }),
  setEmailFocused: (focused: boolean) => set({ emailFocused: focused }),
  setNicknameFocused: (focused: boolean) => set({ nicknameFocused: focused }),
  setPasswordFocused: (focused: boolean) => set({ passwordFocused: focused }),
  setConfirmPasswordFocused: (focused: boolean) => set({ confirmPasswordFocused: focused }),
  setAgeFocused: (focused: boolean) => set({ ageFocused: focused}),
  setPregMonthFocused: (focused: boolean) => set({ pregMonthFocused: focused }),

  // 토글 메소드
  toggleTermsAgreed: () => {
    const newTermsAgreed = !get().termsAgreed;
    set({
      termsAgreed: newTermsAgreed,
      term1Agreed: newTermsAgreed,
      term2Agreed: newTermsAgreed
    });
  },
  toggleTerm1Agreed: () => {
    const newTerm1Agreed = !get().term1Agreed;
    set({ term1Agreed: newTerm1Agreed });
    set({
      termsAgreed: newTerm1Agreed && get().term2Agreed
    });
  },
  toggleTerm2Agreed: () => {
    const newTerm2Agreed = !get().term2Agreed;
    set({ term2Agreed: newTerm2Agreed });
    set({
      termsAgreed: newTerm2Agreed && get().term1Agreed
    });
  },
  toggleSymptom: (symptom) => {
    const currentSymptoms = get().symptoms;
    set({
      symptoms: currentSymptoms.includes(symptom) ? 
              currentSymptoms.filter(s => s !== symptom) :
              [...currentSymptoms, symptom] 
    })
  },
  toggleAllergy: (allergy) => {
    const currentAllergies = get().allergies;
    set({
      allergies: currentAllergies.includes(allergy) ?
                currentAllergies.filter(a => a !== allergy) :
                [...currentAllergies, allergy]
    });
  },
  // 중복 검사 메소드
  checkUsernameDuplication: async () => {
    const { username } = get();
    if (!username) {
      set({ usernameError: '아이디를 입력해주세요' });
      return;
    }
    if (!/^[A-Za-z0-9]{6,12}$/.test(username)) {
      set({ usernameError: '6-12자 이내의 숫자와 영문을 조합해주세요' });
      return;
    }
    const isNotDuplicate = await checkDuplicate('username', username);
    set({ usernameError: isNotDuplicate ? null : '이미 사용중인 아이디입니다.' });
  },

  checkEmailDuplication: async () => {
    const { email } = get();
    if (!email) {
      set({ emailError: '이메일을 입력해주세요' });
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      set({ emailError: '올바르지 않은 이메일 형식입니다' });
      return;
    }
    const isNotDuplicate = await checkDuplicate('email', email);
    set({ emailError: isNotDuplicate ? null : '이미 사용 중인 이메일입니다.' });
  },

  checkNicknameDuplication: async () => {
    const { nickname } = get();
    if (!nickname) {
      set({ nicknameError: '닉네임을 입력해주세요' });
      return;
    }
    if (!/^[A-Za-z0-9가-힣_]{2,10}$/.test(nickname)) {
      set({ nicknameError: '한글 3자 이상, 8자 이하로 입력해주세요.' });
      return;
    }
    const isNotDuplicate = await checkDuplicate('nickname', nickname);
    set({ nicknameError: isNotDuplicate ? null : '이미 사용중인 닉네임입니다.' });
  },

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
    set({ usernameError : null })
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
    set({ emailError : null })
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
    set({ nicknameError : null})
  },

  validatePassword: (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,18}$/;
    set({
      passwordError: password ? (passwordRegex.test(password) ? null : '10자 이상의 영어 소문자, 숫자, 특수문자를 조합해주세요.') : '비밀번호를 입력해주세요'
    });
  },

  validateConfirmPassword: (confirmPassword) => {
    const { password } = useSignupStore.getState();
    // confirmPassword가 비어있는 경우를 체크하여 적절한 메시지를 설정합니다.
    if (!confirmPassword) {
        set({ confirmPasswordError: '비밀번호 확인을 입력해주세요.' });
    } else {
        set({ 
            confirmPasswordError: confirmPassword === password ? null : '비밀번호가 일치하지 않습니다.'
        });
    }
},

validateAge: (age: string) => {
  if(!age) {
    set({ ageError: '만 나이를 입력해주세요.'})
  } else if (!/^\d+$/.test(age)) {
    set({ ageError: '숫자로만 입력해주세요' });
  } else { 
    set({ ageError: null })
  }   
},

validatePregMonth: (month: string) => {
  if (!month) {
    set({ pregMonthError: '임신 개월 수를 입력해주세요' });
  } else if (!/^\d+$/.test(month)) {
    set({ pregMonthError: '1-10자의 숫자를 입력해주세요' });
  } else if (parseInt(month) < 1 || parseInt(month) > 10) {
    set({ pregMonthError: '1-10 사이의 숫자를 입력해주세요' });
  } else {
    set({ pregMonthError: null });
  }
},

goToNextStep: () => {
  const { currentStep, termsAgreed } = get();
  if (currentStep === 2 && !termsAgreed) {
    set({ termsError: true });
  } else {
    set({ currentStep: currentStep >= 5 ? 1 : currentStep + 1, termsError: false });
  }
},
  goToPrevStep: () => set((state: any) => ({ 
    currentStep: state.currentStep > 1 ? state.currentStep - 1  : 1
  })),

  // 상태 초기화 함수
  resetSignupForm: () => set({
    username: '',
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    pregnancy: false,
    pregMonth: '',
    cupDay: '',
    symptoms: [],
    allergies: [],
    usernameError: null,
    emailError: null,
    nicknameError: null,
    passwordError: null,
    confirmPasswordError: null,
    ageError: null,
    pregMonthError: null,
    currentStep: 1,  // 필요에 따라 초기 단계 설정
    termsAgreed: false,
    term1Agreed: false,
    term2Agreed: false,
    termsError: false,
  }),

  submitSignupForm: async () => {
    const { username, email, nickname, password, confirmPassword, age, gender, pregnancy, pregMonth, cupDay, symptoms, allergies } = get();
    try {
      // 데이터 구조를 백엔드 요구 사항에 맞게 매핑
      const data = {
        mbrId: username, // username -> mbrId
        nickname,
        password,
        email,
        cellPhone: '', // cellPhone (현재 UI에서 입력 받지 않음, 필요시 추가 요망)
        gender,
        pregnancy,
        pregMonth,
        allergy: allergies.join(', '), // 배열을 문자열로 변환
        symptom: symptoms.join(', '), // 배열을 문자열로 변환
        age,
        cupDay
      };
  
      const result = await signup(data);
      console.log('Signup success:', result);
      return result;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  },

}))

export default useSignupStore;