export interface IAuthValidationState {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  usernameError: string | null;
  setUsernameFocused: React.Dispatch<React.SetStateAction<boolean>>;
  usernameFocused: boolean;
  validateUsername: (value: string) => Promise<void>;


  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailError: string | null;
  setEmailFocused: React.Dispatch<React.SetStateAction<boolean>>;
  emailFocused: boolean;
  validateEmail: (value: string) => Promise<void>;

  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  nicknameError: string | null;
  setNicknameFocused: React.Dispatch<React.SetStateAction<boolean>>;
  nicknameFocused: boolean;
  validateNickname: (value: string) => Promise<void>;

  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>; 
  passwordError: string | null; 
  setPasswordFocused: React.Dispatch<React.SetStateAction<boolean>>;
  passwordFocused: boolean;
  validatePassword: (value: string) => void;
}