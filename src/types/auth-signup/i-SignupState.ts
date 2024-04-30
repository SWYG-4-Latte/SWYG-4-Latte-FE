export interface ISignupState {
  username: string;
  email: string;
  nickname: string;
  usernameError: string | null;
  emailError: string | null;
  nicknameError: string | null;
  usernameFocused: boolean;
  emailFocused: boolean;
  nicknameFocused: boolean;
  currentStep: number;

  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setNickname: (nickname: string) => void;
  setUsernameFocused: (focused: boolean) => void;
  setEmailFocused: (focused: boolean) => void;
  setNicknameFocused: (focused: boolean) => void;
  validateUsername: (username: string) => void;
  validateEmail: (email: string) => void;
  validateNickname: (nickname: string) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}