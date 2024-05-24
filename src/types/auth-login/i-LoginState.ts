export interface ILoginState {
  username: string;
  password: string;
  usernameError: string | null;
  passwordError: string | null;
  usernameFocused: boolean;
  passwordFocused: boolean;
  accessToken: string;
  refreshToken: string;
  isLoggedIn: boolean;
  loginError: string | null;

  nickname: string;
  gender: string;
  pregnancy: boolean;
  pregMonth: string;
  allergies: string[];
  caffeineIntake: number; // Backend지정값


  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setUsernameFocused: (focused: boolean) => void;
  setPasswordFocused: (focused: boolean) => void;
  validateUsername: (username: string) => void;
  validatePassword: (password: string) => void;
  setLogin: (accessToken: any, refreshToken: any) => void;
  setLogout: () => void;
  setUserInfo: (userInfo: any) => void;
  clearIdentity: () => void;
}