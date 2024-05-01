export interface ISignupState {
  username: string;
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;

  termsAgreed: boolean;
  term1Agreed: boolean;
  term2Agreed: boolean;
  termsError: boolean;

  age: string;
  gender: 'M' | 'F' | '';
  pregnancy: boolean;
  pregMonth: string;

  cupDay: string,
  symptoms: string[],
  allergies: string[],


  usernameError: string | null;
  emailError: string | null;
  nicknameError: string | null;
  passwordError: string | null;
  confirmPasswordError: string | null;
  ageError: string | null;
  pregMonthError: string | null;


  usernameFocused: boolean;
  emailFocused: boolean;
  nicknameFocused: boolean;
  passwordFocused: boolean;
  confirmPasswordFocused: boolean;
  ageFocused: boolean;
  pregMonthFocused: boolean;


  currentStep: number;


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




  setUsernameFocused: (focused: boolean) => void;
  setEmailFocused: (focused: boolean) => void;
  setNicknameFocused: (focused: boolean) => void;
  setPasswordFocused: (focused: boolean) => void;
  setConfirmPasswordFocused: (focused: boolean) => void;
  setAgeFocused:(focused: boolean) => void;
  setPregMonthFocused:(focused: boolean) => void;


  validateUsername: (username: string) => void;
  validateEmail: (email: string) => void;
  validateNickname: (nickname: string) => void;
  validatePassword: (password: string) => void;
  validateConfirmPassword: (confirmPassword: string) => void;
  validateAge: (age: string) => void;
  validatePregMonth: (month: string) => void; 
  

  goToNextStep: () => void;
  goToPrevStep: () => void;

  toggleTermsAgreed: () => void;
  toggleTerm1Agreed: () => void;
  toggleTerm2Agreed: () => void;

}