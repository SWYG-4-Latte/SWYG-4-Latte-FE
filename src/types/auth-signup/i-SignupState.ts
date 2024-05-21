import { IUserInfo } from "./i-UserInfo";
import { IUserInfoTwo } from "./i-UserInfoTwo";

export interface ISignupState {
  // 사용자 정보
  mbrNo: number | null ;
  username: string;
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;

  // 약관 동의 상태
  termsAgreed: boolean;
  term1Agreed: boolean;
  term2Agreed: boolean;
  termsError: boolean;

  usernameChecked: boolean,
  emailChecked: boolean,
  nicknameChecked: boolean,

  // 추가 사용자 정보
  age: string;
  gender: 'M' | 'F' | '';
  pregnancy: boolean;
  pregMonth: string;
  cupDay: string;
  symptoms: string[];
  allergies: string[];

  // 입력 필드 오류 메시지
  usernameError: string | null;
  emailError: string | null;
  nicknameError: string | null;
  passwordError: string | null;
  confirmPasswordError: string | null;
  ageError: string | null;
  pregMonthError: string | null;

  // 입력 필드 포커스 상태
  usernameFocused: boolean;
  emailFocused: boolean;
  nicknameFocused: boolean;
  passwordFocused: boolean;
  confirmPasswordFocused: boolean;
  ageFocused: boolean;
  pregMonthFocused: boolean;
  loadUserInfo: any;

  // 현재 폼 단계
  currentStep: number;

  // 사용자정보 상태변경
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setNickname: (nickname: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setAge: (age: string) => void;
  setGender: (gender: 'M' | 'F' | '') => void;
  setPregMonth: (month: string) => void;
  togglePregnancy: (pregnancy: boolean) => void;
  setCupDay: (cupday: string) => void;
  toggleSymptom: (symptom: string) => void;
  toggleAllergy: (allergy: string) => void;

  // 포커스상태변경
  setUsernameFocused: (focused: boolean) => void;
  setEmailFocused: (focused: boolean) => void;
  setNicknameFocused: (focused: boolean) => void;
  setPasswordFocused: (focused: boolean) => void;
  setConfirmPasswordFocused: (focused: boolean) => void;
  setAgeFocused:(focused: boolean) => void;
  setPregMonthFocused:(focused: boolean) => void;
  
  // 사용자 정보 업데이트
  updateUserInfo: (userInfo: IUserInfo) => void;
  updateUserInfoTwo: (userInfo: IUserInfoTwo) => void;


  // 유효성 검사 및 중복 검사 함수
  validateUsername: (username: string) => void;
  validateEmail: (email: string) => void;
  validateNickname: (nickname: string) => void;
  validatePassword: (password: string) => void;
  validateConfirmPassword: (confirmPassword: string) => void;
  validateAge: (age: string) => void;
  validatePregMonth: (month: string) => void; 
  checkUsernameDuplication: (username: string) => Promise<void>;
  checkNicknameDuplication: (nickname: string) => Promise<void>;
  checkEmailDuplication: (email: string) => Promise<void>;

  // 네이게이션 함수
  goToNextStep: () => void;
  goToPrevStep: () => void;

  // 약관 동의 토글
  toggleTermsAgreed: () => void;
  toggleTerm1Agreed: () => void;
  toggleTerm2Agreed: () => void;

  // 가입양식제출
  submitSignupForm: () => Promise<void>;

  // 상태초기화 함수
  resetSignupForm: () => void
}
