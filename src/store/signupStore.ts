import { IUserInfo } from './../types/auth-signup/i-UserInfo';
import { IUserInfoTwo } from '@/types/auth-signup/i-UserInfoTwo';
// Zustand
import { create } from 'zustand';
// TypeScript
import { ISignupState } from '../types/auth-signup/i-SignupState';
// API
import { signup } from '@/utils/auth-signup/isSignup';
import checkDuplicate from '@/utils/auth-signup/isDuplicate';
import axios from 'axios';

const useSignupStore = create<ISignupState>((set, get) => ({
  // 상태
  mbrNo: null,
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

  termsAgreed: false,
  term1Agreed: false,
  term2Agreed: false,
  termsError: false,

  usernameChecked: false,
  emailChecked: false,
  nicknameChecked: false,

  // 사용자 정보 로드
  loadUserInfo: (userInfo) => set({ nickname: userInfo.nickname }),

  // 상태 업데이트 메소드
  setUsername: (username) => set({ username, usernameChecked: false }),
  setEmail: (email) => set({ email, emailChecked: false }),
  setNickname: (nickname) => set({ nickname, nicknameChecked: false }),
  setPassword: (password: string) => set({ password }),
  setConfirmPassword: (confirmPassword: string) => set({ confirmPassword }),
  setAge: (age: string) => set({ age }),
  setGender: (gender: 'M' | 'F' | '') => set({ gender }),
  setPregMonth: (month: string) => {
    const pregMonthError = month
      ? parseInt(month, 10) >= 1 && parseInt(month, 10) <= 10
        ? null
        : '1-10 사이의 숫자를 입력해주세요.'
      : '임신 개월 수를 입력해주세요';
    set({ pregMonth: month, pregMonthError });
  },
  togglePregnancy: (pregnancy: boolean) => set({ pregnancy }),
  setCupDay: (cupDay) => set({ cupDay }),

  setUsernameFocused: (focused: boolean) => set({ usernameFocused: focused }),
  setEmailFocused: (focused: boolean) => set({ emailFocused: focused }),
  setNicknameFocused: (focused: boolean) => set({ nicknameFocused: focused }),
  setPasswordFocused: (focused: boolean) => set({ passwordFocused: focused }),
  setConfirmPasswordFocused: (focused: boolean) => set({ confirmPasswordFocused: focused }),
  setAgeFocused: (focused: boolean) => set({ ageFocused: focused }),
  setPregMonthFocused: (focused: boolean) => set({ pregMonthFocused: focused }),

  // 사용자 정보 업데이트 - MemberProfileCotent
  updateUserInfo: async (userInfo: IUserInfo) => {
    const { mbrNo, email, nickname, gender, pregnancy, pregMonth } = userInfo;
    if (!mbrNo) {
      console.error('회원 번호가 필요합니다.');
      return;
    }
    try {
      const response = await axios.post(`https://latte-server.site/auth/update/${mbrNo}`, {
        email,
        nickname,
        gender,
        pregnancy,
        pregMonth,
      });
      if (response.data.message === '회원 수정에 성공했습니다.') {
        set({
          email,
          nickname,
          gender,
          pregnancy,
          pregMonth,
        });
      } else {
        console.error('업데이트 실패:', response.data.message);
      }
    } catch (error) {
      console.error('업데이트 에러:', error);
    }
  },

  // 사용자 정보 업데이트 - MemberInfoCotent
  updateUserInfoTwo: async (userInfo: IUserInfoTwo) => {
    const { mbrNo, cupDay, symptoms, allergies } = userInfo;
    if (!mbrNo) {
      console.error('회원 번호가 필요합니다.');
      return;
    }

    try {
      // 서버로 전송 전에 symptoms와 allergies를 문자열로 변환
      const postData = {
        cupDay,
        symptoms: symptoms?.join(', '), // 배열을 문자열로 변환
        allergies: allergies?.join(', '), // 배열을 문자열로 변환
      };

      const response = await axios.post(`https://latte-server.site/auth/update/${mbrNo}`, postData);

      if (response.data.message === '회원 수정에 성공했습니다.') {
        // 상태 업데이트 시에는 다시 배열로 변환
        set({
          cupDay,
          symptoms: symptoms, // 이미 배열이므로 그대로 저장
          allergies: allergies, // 이미 배열이므로 그대로 저장
        });
      } else {
        console.error('업데이트 실패:', response.data.message);
      }
    } catch (error) {
      console.error('업데이트 에러:', error);
    }
  },

  // 토글 메소드
  toggleTermsAgreed: () => {
    const newTermsAgreed = !get().termsAgreed;
    set({
      termsAgreed: newTermsAgreed,
      term1Agreed: newTermsAgreed,
      term2Agreed: newTermsAgreed,
    });
  },
  toggleTerm1Agreed: () => {
    const newTerm1Agreed = !get().term1Agreed;
    set({ term1Agreed: newTerm1Agreed });
    set({
      termsAgreed: newTerm1Agreed && get().term2Agreed,
    });
  },
  toggleTerm2Agreed: () => {
    const newTerm2Agreed = !get().term2Agreed;
    set({ term2Agreed: newTerm2Agreed });
    set({
      termsAgreed: newTerm2Agreed && get().term1Agreed,
    });
  },
  toggleSymptom: (symptom) => {
    const currentSymptoms = get().symptoms;
    if (symptom === '별다른 증상이 없어요') {
      if (currentSymptoms.includes(symptom)) {
        set({ symptoms: currentSymptoms.filter((s) => s !== symptom) });
      } else {
        set({ symptoms: [symptom] });
      }
    } else {
      set({
        symptoms: currentSymptoms.includes(symptom)
          ? currentSymptoms.filter((s) => s !== symptom)
          : [...currentSymptoms.filter((s) => s !== '별다른 증상이 없어요'), symptom],
      });
    }
  },
  toggleAllergy: (allergy) => {
    const currentAllergies = get().allergies;
    if (allergy === '없어요') {
      if (currentAllergies.includes(allergy)) {
        set({ allergies: currentAllergies.filter((a) => a !== allergy) });
      } else {
        set({ allergies: [allergy] });
      }
    } else {
      set({
        allergies: currentAllergies.includes(allergy)
          ? currentAllergies.filter((a) => a !== allergy)
          : [...currentAllergies.filter((a) => a !== '없어요'), allergy],
      });
    }
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
    set({
      usernameError: isNotDuplicate ? '사용 가능한 아이디 입니다.' : '이미 사용중인 아이디입니다.',
      usernameChecked: true,
    });
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
    set({ emailError: isNotDuplicate ? null : '이미 사용 중인 이메일입니다.', emailChecked: true });
  },

  checkNicknameDuplication: async () => {
    const { nickname } = get();
    if (!nickname) {
      set({ nicknameError: '닉네임을 입력해주세요' });
      return;
    }
    if (!/^[가-힣]{3,8}$/.test(nickname)) {
      set({ nicknameError: '닉네임은 한글만 입력 가능합니다.' });
      return;
    }
    const isNotDuplicate = await checkDuplicate('nickname', nickname);
    set({
      nicknameError: isNotDuplicate ? '사용 가능한 닉네임 입니다.' : '이미 사용중인 닉네임입니다.',
      nicknameChecked: true,
    });
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
    set({ emailError: null });
  },

  validateNickname: (nickname: string) => {
    if (!nickname) {
      set({ nicknameError: '닉네임을 입력해주세요' });
      return;
    }
    if (!/^[가-힣]{2,10}$/.test(nickname)) {
      set({ nicknameError: '한글 3자 이상, 8자 이하로 입력해주세요.' });
      return;
    }
    set({ nicknameError: null });
  },

  validatePassword: (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>~`\\/\[\]\-=_+;'])[A-Za-z\d!@#$%^&*(),.?":{}|<>~`\\/\[\]\-=_+;']{8,18}$/;
    set({
      passwordError: password
        ? passwordRegex.test(password)
          ? null
          : '8자 이상의 영어 소문자, 숫자, 특수문자를 조합해주세요.'
        : '비밀번호를 입력해주세요',
    });
  },

  validateConfirmPassword: (confirmPassword) => {
    const { password } = useSignupStore.getState();
    // confirmPassword가 비어있는 경우를 체크하여 적절한 메시지를 설정합니다.
    if (!confirmPassword) {
      set({ confirmPasswordError: '비밀번호 확인을 입력해주세요.' });
    } else {
      set({
        confirmPasswordError: confirmPassword === password ? null : '비밀번호가 일치하지 않습니다.',
      });
    }
  },

  validateAge: (age: string) => {
    if (!age) {
      set({ ageError: '만 나이를 입력해주세요.' });
    } else if (!/^\d+$/.test(age)) {
      set({ ageError: '숫자로만 입력해주세요.' });
    } else if (age.length > 2 || Number(age) < 19 || Number(age) > 98) {
      set({ ageError: '만 19 ~ 98세까지 입력가능합니다.' });
    } else {
      set({ ageError: null });
    }
  },

  validatePregMonth: (month: string) => {
    if (!month) {
      set({ pregMonthError: '임신 개월 수를 입력해주세요' });
    } else if (!/^\d+$/.test(month)) {
      set({ pregMonthError: '1-10 사이의 숫자를 입력해주세요' });
    } else if (parseInt(month) < 1 || parseInt(month) > 10) {
      set({ pregMonthError: '1-10 사이의 숫자를 입력해주세요' });
    } else {
      set({ pregMonthError: null });
    }
  },

  goToNextStep: async (forceNextStep = false) => {
    const {
      currentStep,
      termsAgreed,
      username,
      email,
      nickname,
      password,
      passwordError,
      confirmPassword,
      confirmPasswordError,
      age,
      ageError,
      gender,
      pregnancy,
      pregMonth,
      pregMonthError,
      checkEmailDuplication,
      checkNicknameDuplication,
      checkUsernameDuplication,
    } = get();

    if (!forceNextStep) {
      // Step 1에서 이메일, 아이디, 닉네임 중복 검사를 추가
      if (currentStep === 1) {
        await checkEmailDuplication(email);
        await checkUsernameDuplication(username);
        await checkNicknameDuplication(nickname);

        const { emailError, usernameError, nicknameError } = get();
        if (
          emailError === '이미 사용 중인 이메일입니다.' ||
          usernameError === '이미 사용중인 아이디입니다.' ||
          nicknameError === '이미 사용중인 닉네임입니다.' ||
          nicknameError === '닉네임은 한글만 입력 가능합니다.'
        ) {
          return;
        }
      }

      // Step 2에서 비밀번호와 비밀번호 확인이 일치하는지 확인
      if (currentStep === 2) {
        if (!termsAgreed) {
          set({ termsError: true });
          return;
        }
        if (password !== confirmPassword) {
          set({ confirmPasswordError: '비밀번호가 일치하지 않습니다.' });
          return;
        }
        if (passwordError || confirmPasswordError) {
          return;
        }
      }

      // Step 3에서 나이를 입력했는지 확인
      if (currentStep === 3) {
        if (!age || ageError) {
          set({ ageError: '만 나이를 입력해주세요.' });
          return;
        }
        if (gender === 'F' && pregnancy) {
          if (!pregMonth || pregMonthError || parseInt(pregMonth) < 1 || parseInt(pregMonth) > 10) {
            set({ pregMonthError: '1-10 사이의 숫자를 입력해주세요.' });
            return;
          }
        }
      }
    }

    set({ currentStep: currentStep >= 5 ? 1 : currentStep + 1, termsError: false });
  },
  goToPrevStep: () =>
    set((state: any) => ({
      currentStep: state.currentStep > 1 ? state.currentStep - 1 : 1,
    })),

  setCurrentStep: (step: number) => set({ currentStep: step }),

  // 상태 초기화 함수
  resetSignupForm: () =>
    set({
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
      currentStep: 1, // 필요에 따라 초기 단계 설정
      termsAgreed: false,
      term1Agreed: false,
      term2Agreed: false,
      termsError: false,
    }),

  submitSignupForm: async () => {
    const { username, email, nickname, password, age, gender, pregnancy, pregMonth, cupDay, symptoms, allergies } =
      get();
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
        cupDay,
      };

      const result = await signup(data);

      return result;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  },
}));

export default useSignupStore;
